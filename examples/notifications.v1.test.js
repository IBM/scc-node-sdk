/**
 * @jest-environment node
 */
/**
 * (C) Copyright IBM Corp. 2021.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable no-console */

const NotificationsV1 = require('../dist/notifications/v1');
// eslint-disable-next-line node/no-unpublished-require
const authHelper = require('../test/resources/auth-helper.js');
// You can use the readExternalSources method to access additional configuration values
// const { readExternalSources } = require('ibm-cloud-sdk-core');

//
// This file provides an example of how to use the Notifications service.
//
// The following configuration properties are assumed to be defined:
// NOTIFICATIONS_URL=<service base url>
// NOTIFICATIONS_AUTH_TYPE=iam
// NOTIFICATIONS_APIKEY=<IAM apikey>
// NOTIFICATIONS_AUTH_URL=<IAM token service base URL - omit this if using the production environment>
//
// These configuration properties can be exported as environment variables, or stored
// in a configuration file and then:
// export IBM_CREDENTIALS_FILE=<name of configuration file>
//
const configFile = 'notifications_v1.env';

const describe = authHelper.prepareTests(configFile);

// Save original console.log
const originalLog = console.log;

// Mocks for console.log and console.warn
const consoleLogMock = jest.spyOn(console, 'log');
const consoleWarnMock = jest.spyOn(console, 'warn');

describe('NotificationsV1', () => {
  // begin-common

  const notificationsService = NotificationsV1.newInstance({});

  // end-common

  // To access additional configuration values, uncomment this line and extract the values from config
  // const config = readExternalSources(NotificationsV1.DEFAULT_SERVICE_NAME);

  test('listAllChannels request example', done => {
    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('listAllChannels() result:');
    // begin-listAllChannels

    const params = {
      accountId: 'testString',
    };

    notificationsService
      .listAllChannels(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err);
      });

    // end-listAllChannels
  });
  test('createNotificationChannel request example', done => {
    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('createNotificationChannel() result:');
    // begin-createNotificationChannel

    const params = {
      accountId: 'testString',
      name: 'testString',
      type: 'Webhook',
      endpoint: 'testString',
    };

    notificationsService
      .createNotificationChannel(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err);
      });

    // end-createNotificationChannel
  });
  test('getNotificationChannel request example', done => {
    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('getNotificationChannel() result:');
    // begin-getNotificationChannel

    const params = {
      accountId: 'testString',
      channelId: 'testString',
    };

    notificationsService
      .getNotificationChannel(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err);
      });

    // end-getNotificationChannel
  });
  test('updateNotificationChannel request example', done => {
    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('updateNotificationChannel() result:');
    // begin-updateNotificationChannel

    const params = {
      accountId: 'testString',
      channelId: 'testString',
      name: 'testString',
      type: 'Webhook',
      endpoint: 'testString',
    };

    notificationsService
      .updateNotificationChannel(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err);
      });

    // end-updateNotificationChannel
  });
  test('testNotificationChannel request example', done => {
    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('testNotificationChannel() result:');
    // begin-testNotificationChannel

    const params = {
      accountId: 'testString',
      channelId: 'testString',
    };

    notificationsService
      .testNotificationChannel(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err);
      });

    // end-testNotificationChannel
  });
  test('getPublicKey request example', done => {
    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('getPublicKey() result:');
    // begin-getPublicKey

    const params = {
      accountId: 'testString',
    };

    notificationsService
      .getPublicKey(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err);
      });

    // end-getPublicKey
  });
  test('deleteNotificationChannels request example', done => {
    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('deleteNotificationChannels() result:');
    // begin-deleteNotificationChannels

    const params = {
      accountId: 'testString',
      requestBody: ['testString'],
    };

    notificationsService
      .deleteNotificationChannels(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err);
      });

    // end-deleteNotificationChannels
  });
  test('deleteNotificationChannel request example', done => {
    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('deleteNotificationChannel() result:');
    // begin-deleteNotificationChannel

    const params = {
      accountId: 'testString',
      channelId: 'testString',
    };

    notificationsService
      .deleteNotificationChannel(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err);
      });

    // end-deleteNotificationChannel
  });
});
