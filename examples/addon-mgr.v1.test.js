/**
 * @jest-environment node
 */
/**
 * (C) Copyright IBM Corp. 2022.
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

const AddonMgrV1 = require('../dist/addon-mgr/v1');
// eslint-disable-next-line node/no-unpublished-require
const authHelper = require('../test/resources/auth-helper.js');
// You can use the readExternalSources method to access additional configuration values
// const { readExternalSources } = require('ibm-cloud-sdk-core');

//
// This file provides an example of how to use the AddonMgr service.
//
// The following configuration properties are assumed to be defined:
// ADDON_MGR_URL=<service base url>
// ADDON_MGR_AUTH_TYPE=iam
// ADDON_MGR_APIKEY=<IAM apikey>
// ADDON_MGR_AUTH_URL=<IAM token service base URL - omit this if using the production environment>
//
// These configuration properties can be exported as environment variables, or stored
// in a configuration file and then:
// export IBM_CREDENTIALS_FILE=<name of configuration file>
//
const configFile = 'addon_mgr_v1.env';

const describe = authHelper.prepareTests(configFile);

// Save original console.log
const originalLog = console.log;
const originalWarn = console.warn;    

// Mocks for console.log and console.warn
const consoleLogMock = jest.spyOn(console, 'log');
const consoleWarnMock = jest.spyOn(console, 'warn');

describe('AddonMgrV1', () => {
  // Service instance
  let addonMgrService;

  // To access additional configuration values, uncomment this line and extract the values from config
  // const config = readExternalSources(AddonMgrV1.DEFAULT_SERVICE_NAME);

  test('Initialize services', async () => {
  // begin-common

    addonMgrService = AddonMgrV1.newInstance({
    accountId: 'testString',
    });

  // end-common
  });
  

  test('addNetworkInsightsCosDetailsV2 request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-addNetworkInsightsCosDetailsV2

    // Request models needed by this operation.

    // CosDetailsV2CosDetailsItem
    const cosDetailsV2CosDetailsItemModel = {
      cos_instance: 'testString',
      bucket_name: 'testString',
      description: 'testString',
      type: 'network-insights',
      cos_bucket_url: 'testString',
    };

    const params = {
      regionId: 'testString',
      cosDetails: [cosDetailsV2CosDetailsItemModel],
    };

    try {
      await addonMgrService.addNetworkInsightsCosDetailsV2(params);
    } catch (err) {
      console.warn(err);
    }

    // end-addNetworkInsightsCosDetailsV2
  });

  test('addActivityInsightsCosDetailsV2 request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-addActivityInsightsCosDetailsV2

    // Request models needed by this operation.

    // CosDetailsV2CosDetailsItem
    const cosDetailsV2CosDetailsItemModel = {
      cos_instance: 'testString',
      bucket_name: 'testString',
      description: 'testString',
      type: 'network-insights',
      cos_bucket_url: 'testString',
    };

    const params = {
      regionId: 'testString',
      cosDetails: [cosDetailsV2CosDetailsItemModel],
    };

    try {
      await addonMgrService.addActivityInsightsCosDetailsV2(params);
    } catch (err) {
      console.warn(err);
    }

    // end-addActivityInsightsCosDetailsV2
  });

  test('disableInsightsV2 request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-disableInsightsV2

    const params = {
      regionId: 'testString',
    };

    try {
      await addonMgrService.disableInsightsV2(params);
    } catch (err) {
      console.warn(err);
    }

    // end-disableInsightsV2
  });

  test('enableInsightsV2 request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-enableInsightsV2

    const params = {
      regionId: 'testString',
    };

    try {
      await addonMgrService.enableInsightsV2(params);
    } catch (err) {
      console.warn(err);
    }

    // end-enableInsightsV2
  });

  test('getSupportedInsightsV2 request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getSupportedInsightsV2() result:');
    // begin-getSupportedInsightsV2

    let res;
    try {
      res = await addonMgrService.getSupportedInsightsV2({});
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-getSupportedInsightsV2
  });

  test('testAiFindingsV2 request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-testAIFindingsV2

    const params = {
      regionId: 'testString',
    };

    try {
      await addonMgrService.testAiFindingsV2(params);
    } catch (err) {
      console.warn(err);
    }

    // end-testAIFindingsV2
  });

  test('deleteNetworkInsightsCosDetailsV2 request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-deleteNetworkInsightsCosDetailsV2

    const params = {
    };

    try {
      await addonMgrService.deleteNetworkInsightsCosDetailsV2(params);
    } catch (err) {
      console.warn(err);
    }

    // end-deleteNetworkInsightsCosDetailsV2
  });

  test('deleteActivityInsightsCosDetailsV2 request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-deleteActivityInsightsCosDetailsV2

    const params = {
    };

    try {
      await addonMgrService.deleteActivityInsightsCosDetailsV2(params);
    } catch (err) {
      console.warn(err);
    }

    // end-deleteActivityInsightsCosDetailsV2
  });
});
