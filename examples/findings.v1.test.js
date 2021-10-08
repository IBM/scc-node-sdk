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

const FindingsV1 = require('../dist/findings/v1');
// eslint-disable-next-line node/no-unpublished-require
const authHelper = require('../test/resources/auth-helper.js');
// You can use the readExternalSources method to access additional configuration values
// const { readExternalSources } = require('ibm-cloud-sdk-core');

//
// This file provides an example of how to use the Findings service.
//
// The following configuration properties are assumed to be defined:
// FINDINGS_URL=<service base url>
// FINDINGS_AUTH_TYPE=iam
// FINDINGS_APIKEY=<IAM apikey>
// FINDINGS_AUTH_URL=<IAM token service base URL - omit this if using the production environment>
//
// These configuration properties can be exported as environment variables, or stored
// in a configuration file and then:
// export IBM_CREDENTIALS_FILE=<name of configuration file>
//
const configFile = 'findings_v1.env';

const describe = authHelper.prepareTests(configFile);

// Save original console.log
const originalLog = console.log;

// Mocks for console.log and console.warn
const consoleLogMock = jest.spyOn(console, 'log');
const consoleWarnMock = jest.spyOn(console, 'warn');

describe('FindingsV1', () => {
  // begin-common

  const findingsService = FindingsV1.newInstance({
    accountId: 'testString',
  });

  // end-common

  // To access additional configuration values, uncomment this line and extract the values from config
  // const config = readExternalSources(FindingsV1.DEFAULT_SERVICE_NAME);

  test('postGraph request example', (done) => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation((output) => {
      done(output);
    });

    // begin-postGraph

    const params = {
      body: 'testString',
    };

    findingsService
      .postGraph(params)
      .then((res) => {
        done();
      })
      .catch((err) => {
        console.warn(err);
      });

    // end-postGraph
  });
  test('listProviders request example', (done) => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation((output) => {
      done(output);
    });

    originalLog('listProviders() result:');
    // begin-listProviders

    findingsService
      .listProviders({})
      .then((res) => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch((err) => {
        console.warn(err);
      });

    // end-listProviders
  });
  test('createNote request example', (done) => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation((output) => {
      done(output);
    });

    originalLog('createNote() result:');
    // begin-createNote

    // Request models needed by this operation.

    // Reporter
    const reporterModel = {
      id: 'testString',
      title: 'testString',
    };

    const params = {
      providerId: 'testString',
      shortDescription: 'testString',
      longDescription: 'testString',
      kind: 'FINDING',
      id: 'testString',
      reportedBy: reporterModel,
    };

    findingsService
      .createNote(params)
      .then((res) => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch((err) => {
        console.warn(err);
      });

    // end-createNote
  });
  test('listNotes request example', (done) => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation((output) => {
      done(output);
    });

    originalLog('listNotes() result:');
    // begin-listNotes

    const params = {
      providerId: 'testString',
    };

    findingsService
      .listNotes(params)
      .then((res) => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch((err) => {
        console.warn(err);
      });

    // end-listNotes
  });
  test('getNote request example', (done) => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation((output) => {
      done(output);
    });

    originalLog('getNote() result:');
    // begin-getNote

    const params = {
      providerId: 'testString',
      noteId: 'testString',
    };

    findingsService
      .getNote(params)
      .then((res) => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch((err) => {
        console.warn(err);
      });

    // end-getNote
  });
  test('updateNote request example', (done) => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation((output) => {
      done(output);
    });

    originalLog('updateNote() result:');
    // begin-updateNote

    // Request models needed by this operation.

    // Reporter
    const reporterModel = {
      id: 'testString',
      title: 'testString',
    };

    const params = {
      providerId: 'testString',
      noteId: 'testString',
      shortDescription: 'testString',
      longDescription: 'testString',
      kind: 'FINDING',
      id: 'testString',
      reportedBy: reporterModel,
    };

    findingsService
      .updateNote(params)
      .then((res) => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch((err) => {
        console.warn(err);
      });

    // end-updateNote
  });
  test('getOccurrenceNote request example', (done) => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation((output) => {
      done(output);
    });

    originalLog('getOccurrenceNote() result:');
    // begin-getOccurrenceNote

    const params = {
      providerId: 'testString',
      occurrenceId: 'testString',
    };

    findingsService
      .getOccurrenceNote(params)
      .then((res) => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch((err) => {
        console.warn(err);
      });

    // end-getOccurrenceNote
  });
  test('createOccurrence request example', (done) => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation((output) => {
      done(output);
    });

    originalLog('createOccurrence() result:');
    // begin-createOccurrence

    const params = {
      providerId: 'testString',
      noteName: 'testString',
      kind: 'FINDING',
      id: 'testString',
    };

    findingsService
      .createOccurrence(params)
      .then((res) => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch((err) => {
        console.warn(err);
      });

    // end-createOccurrence
  });
  test('listOccurrences request example', (done) => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation((output) => {
      done(output);
    });

    originalLog('listOccurrences() result:');
    // begin-listOccurrences

    const params = {
      providerId: 'testString',
    };

    findingsService
      .listOccurrences(params)
      .then((res) => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch((err) => {
        console.warn(err);
      });

    // end-listOccurrences
  });
  test('listNoteOccurrences request example', (done) => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation((output) => {
      done(output);
    });

    originalLog('listNoteOccurrences() result:');
    // begin-listNoteOccurrences

    const params = {
      providerId: 'testString',
      noteId: 'testString',
    };

    findingsService
      .listNoteOccurrences(params)
      .then((res) => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch((err) => {
        console.warn(err);
      });

    // end-listNoteOccurrences
  });
  test('getOccurrence request example', (done) => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation((output) => {
      done(output);
    });

    originalLog('getOccurrence() result:');
    // begin-getOccurrence

    const params = {
      providerId: 'testString',
      occurrenceId: 'testString',
    };

    findingsService
      .getOccurrence(params)
      .then((res) => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch((err) => {
        console.warn(err);
      });

    // end-getOccurrence
  });
  test('updateOccurrence request example', (done) => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation((output) => {
      done(output);
    });

    originalLog('updateOccurrence() result:');
    // begin-updateOccurrence

    const params = {
      providerId: 'testString',
      occurrenceId: 'testString',
      noteName: 'testString',
      kind: 'FINDING',
      id: 'testString',
    };

    findingsService
      .updateOccurrence(params)
      .then((res) => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch((err) => {
        console.warn(err);
      });

    // end-updateOccurrence
  });
  test('deleteOccurrence request example', (done) => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation((output) => {
      done(output);
    });

    // begin-deleteOccurrence

    const params = {
      providerId: 'testString',
      occurrenceId: 'testString',
    };

    findingsService
      .deleteOccurrence(params)
      .then((res) => {
        done();
      })
      .catch((err) => {
        console.warn(err);
      });

    // end-deleteOccurrence
  });
  test('deleteNote request example', (done) => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation((output) => {
      done(output);
    });

    // begin-deleteNote

    const params = {
      providerId: 'testString',
      noteId: 'testString',
    };

    findingsService
      .deleteNote(params)
      .then((res) => {
        done();
      })
      .catch((err) => {
        console.warn(err);
      });

    // end-deleteNote
  });
});
