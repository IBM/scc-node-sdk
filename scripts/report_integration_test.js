/* eslint 'array-callback-return': 'off' */

const fs = require('fs');
const path = require('path');
const axios = require('axios');

const testOutput = fs.readFileSync(path.resolve('test-output.log'), { encoding: 'utf8' });
const testOutputJson = JSON.parse(testOutput);
const ansiRegex = new RegExp(
  [
    '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
    '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))',
  ].join('|'),
  'g'
);

const failedSuits = testOutputJson.testResults.filter(suite => suite.status === 'failed');

const errors = {
  service: [],
  test: [],
};

failedSuits.map(suite => {
  const failedTests = suite.assertionResults.filter(test => test.status === 'failed');
  const errorSuite = {
    name: suite.name.split('node-sdk/test')[1],
    service: [],
    test: [],
  };

  failedTests.map(result => {
    const messageClean = result.failureMessages.join('\n').replace(ansiRegex, '');
    errorSuite[messageClean.indexOf(/^Received: 5/m) > 0 ? 'service' : 'test'].push(
      `${result.fullName}\n${messageClean}`
    );
  });

  errors.service.push(`${errorSuite.name}\n${errorSuite.service.join('\n')}`);
  errors.test.push(`${errorSuite.name}\n${errorSuite.test.join('\n')}`);
});

let body = '';
if (errors.service.length > 0) {
  body = `${body}## Service Failures\n${errors.service.join('\n')}\n`;
}

if (errors.test.length > 0) {
  body = `${body}## Possible Test Failures\n${errors.test.join('\n')}\n`;
}

if (process.env.TRAVIS_PULL_REQUEST && process.env.TRAVIS_PULL_REQUEST !== 'false') {
  // Send the result to the pull request if it is a pull request.
  axios
    .post(
      `https://api.github.com/repos/${process.env.TRAVIS_REPO_SLUG}/issues/${process.env.TRAVIS_PULL_REQUEST}/comments`,
      {
        body,
      },
      {
        headers: {
          'User-Agent': 'service_name-github-bot',
          Authorization: `token ${process.env.GH_TOKEN}`,
        },
      }
    )
    .catch(error => {
      console.error(error); // eslint-disable-line
    })
    .then(() => {
      if (errors.test.length > 0) {
        process.exit(1); // eslint-disable-line
      }
    });
} else {
  // Write to stdout
  console.log(body); // eslint-disable-line

  if (errors.test.length > 0) {
    process.exit(1); // eslint-disable-line
  }
}
