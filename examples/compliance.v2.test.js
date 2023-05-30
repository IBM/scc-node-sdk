/**
 * @jest-environment node
 */
/**
 * (C) Copyright IBM Corp. 2023.
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

const ComplianceV2 = require('../compliance/v2');
// eslint-disable-next-line node/no-unpublished-require
const authHelper = require('../test/resources/auth-helper.js');
// You can use the readExternalSources method to access additional configuration values
// const { readExternalSources } = require('ibm-cloud-sdk-core');

//
// This file provides an example of how to use the Compliance service.
//
// The following configuration properties are assumed to be defined:
// COMPLIANCE_URL=<service base url>
// COMPLIANCE_AUTH_TYPE=iam
// COMPLIANCE_APIKEY=<IAM apikey>
// COMPLIANCE_AUTH_URL=<IAM token service base URL - omit this if using the production environment>
//
// These configuration properties can be exported as environment variables, or stored
// in a configuration file and then:
// export IBM_CREDENTIALS_FILE=<name of configuration file>
//
const configFile = 'compliance_v2.env';

const describe = authHelper.prepareTests(configFile);

// Save original console.log
const originalLog = console.log;
const originalWarn = console.warn;

// Mocks for console.log and console.warn
const consoleLogMock = jest.spyOn(console, 'log');
const consoleWarnMock = jest.spyOn(console, 'warn');

describe('ComplianceV2', () => {
  // Service instance
  let complianceService;

  // To access additional configuration values, uncomment this line and extract the values from config
  // const config = readExternalSources(ComplianceV2.DEFAULT_SERVICE_NAME);

  test('Initialize service', async () => {
    // begin-common

    complianceService = ComplianceV2.newInstance();

    // end-common
  });

  test('createProfile request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createProfile() result:');
    // begin-create_profile

    const params = {
      instanceId: 'testString',
    };

    let res;
    try {
      res = await complianceService.createProfile(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_profile
  });

  test('listProfiles request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listProfiles() result:');
    // begin-list_profiles

    const params = {
      instanceId: 'testString',
    };

    let res;
    try {
      res = await complianceService.listProfiles(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_profiles
  });

  test('addProfile request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('addProfile() result:');
    // begin-add_profile

    const params = {
      profilesId: 'testString',
      instanceId: 'testString',
    };

    let res;
    try {
      res = await complianceService.addProfile(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-add_profile
  });

  test('getProfile request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getProfile() result:');
    // begin-get_profile

    const params = {
      profilesId: 'testString',
      instanceId: 'testString',
    };

    let res;
    try {
      res = await complianceService.getProfile(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_profile
  });

  test('replaceProfileParameters request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('replaceProfileParameters() result:');
    // begin-replace_profile_parameters

    const params = {
      profilesId: 'testString',
      instanceId: 'testString',
    };

    let res;
    try {
      res = await complianceService.replaceProfileParameters(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-replace_profile_parameters
  });

  test('createAttachment request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createAttachment() result:');
    // begin-create_attachment

    const params = {
      profilesId: 'testString',
      instanceId: 'testString',
    };

    let res;
    try {
      res = await complianceService.createAttachment(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_attachment
  });

  test('checkProfileAttachmnets request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('checkProfileAttachmnets() result:');
    // begin-check_profile_attachmnets

    const params = {
      profilesId: 'testString',
      instanceId: 'testString',
    };

    let res;
    try {
      res = await complianceService.checkProfileAttachmnets(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-check_profile_attachmnets
  });

  test('getProfileAttachmnet request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getProfileAttachmnet() result:');
    // begin-get_profile_attachmnet

    const params = {
      profilesId: 'testString',
      attachmentId: 'testString',
      instanceId: 'testString',
    };

    let res;
    try {
      res = await complianceService.getProfileAttachmnet(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_profile_attachmnet
  });

  test('replaceProfileAttachment request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('replaceProfileAttachment() result:');
    // begin-replace_profile_attachment

    const params = {
      profilesId: 'testString',
      attachmentId: 'testString',
      instanceId: 'testString',
    };

    let res;
    try {
      res = await complianceService.replaceProfileAttachment(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-replace_profile_attachment
  });

  test('listAttachmentParameters request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listAttachmentParameters() result:');
    // begin-list_attachment_parameters

    const params = {
      profilesId: 'testString',
      attachmentId: 'testString',
      instanceId: 'testString',
    };

    let res;
    try {
      res = await complianceService.listAttachmentParameters(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_attachment_parameters
  });

  test('replaceAttachment request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('replaceAttachment() result:');
    // begin-replace_attachment

    const params = {
      profilesId: 'testString',
      attachmentId: 'testString',
      instanceId: 'testString',
    };

    let res;
    try {
      res = await complianceService.replaceAttachment(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-replace_attachment
  });

  test('getParametersByName request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getParametersByName() result:');
    // begin-get_parameters_by_name

    const params = {
      profilesId: 'testString',
      attachmentId: 'testString',
      parameterName: 'testString',
      instanceId: 'testString',
    };

    let res;
    try {
      res = await complianceService.getParametersByName(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_parameters_by_name
  });

  test('replaceAttachmnetParametersByName request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('replaceAttachmnetParametersByName() result:');
    // begin-replace_attachmnet_parameters_by_name

    const params = {
      profilesId: 'testString',
      attachmentId: 'testString',
      parameterName: 'testString',
      instanceId: 'testString',
    };

    let res;
    try {
      res = await complianceService.replaceAttachmnetParametersByName(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-replace_attachmnet_parameters_by_name
  });

  test('createCustomControlLibrary request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createCustomControlLibrary() result:');
    // begin-create_custom_control_library

    const params = {
      instanceId: 'testString',
    };

    let res;
    try {
      res = await complianceService.createCustomControlLibrary(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_custom_control_library
  });

  test('listControlLibraries request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listControlLibraries() result:');
    // begin-list_control_libraries

    const params = {
      instanceId: 'testString',
    };

    let res;
    try {
      res = await complianceService.listControlLibraries(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_control_libraries
  });

  test('replaceCustomControlLibrary request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('replaceCustomControlLibrary() result:');
    // begin-replace_custom_control_library

    const params = {
      controlLibrariesId: 'testString',
      instanceId: 'testString',
    };

    let res;
    try {
      res = await complianceService.replaceCustomControlLibrary(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-replace_custom_control_library
  });

  test('getControlLibrary request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getControlLibrary() result:');
    // begin-get_control_library

    const params = {
      controlLibrariesId: 'testString',
      instanceId: 'testString',
    };

    let res;
    try {
      res = await complianceService.getControlLibrary(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_control_library
  });

  test('createScan request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createScan() result:');
    // begin-create_scan

    const params = {
      instanceId: 'testString',
    };

    let res;
    try {
      res = await complianceService.createScan(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_scan
  });

  test('deleteCustomProfile request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('deleteCustomProfile() result:');
    // begin-delete_custom_profile

    const params = {
      profilesId: 'testString',
      instanceId: 'testString',
    };

    let res;
    try {
      res = await complianceService.deleteCustomProfile(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-delete_custom_profile
  });

  test('deleteProfileAttachmnet request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('deleteProfileAttachmnet() result:');
    // begin-delete_profile_attachmnet

    const params = {
      profilesId: 'testString',
      attachmentId: 'testString',
      instanceId: 'testString',
    };

    let res;
    try {
      res = await complianceService.deleteProfileAttachmnet(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-delete_profile_attachmnet
  });

  test('deleteCustomControllibrary request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('deleteCustomControllibrary() result:');
    // begin-delete_custom_controllibrary

    const params = {
      controlLibrariesId: 'testString',
      instanceId: 'testString',
    };

    let res;
    try {
      res = await complianceService.deleteCustomControllibrary(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-delete_custom_controllibrary
  });
});
