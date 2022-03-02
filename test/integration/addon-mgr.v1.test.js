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

const AddonMgrV1 = require('../../dist/addon-mgr/v1');
const { readExternalSources } = require('ibm-cloud-sdk-core');
const authHelper = require('../resources/auth-helper.js');

// testcase timeout value (200s).
const timeout = 200000;

// Location of our config file.
const configFile = 'addon_mgr_v1.env';

const describe = authHelper.prepareTests(configFile);

describe('AddonMgrV1_integration', () => {
  jest.setTimeout(timeout);

  // Service instance
  let addonMgrService;

  test('Initialise service', async () => {
    addonMgrService = AddonMgrV1.newInstance({
      accountId: 'testString',
    });

    expect(addonMgrService).not.toBeNull();

    const config = readExternalSources(AddonMgrV1.DEFAULT_SERVICE_NAME);
    expect(config).not.toBeNull();

    addonMgrService.enableRetries();
  });

  test('addNetworkInsightsCosDetailsV2()', async () => {
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

    const res = await addonMgrService.addNetworkInsightsCosDetailsV2(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('addActivityInsightsCosDetailsV2()', async () => {
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

    const res = await addonMgrService.addActivityInsightsCosDetailsV2(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('disableInsightsV2()', async () => {
    const params = {
      regionId: 'testString',
      networkInsights: true,
      activityInsights: true,

    };

    const res = await addonMgrService.disableInsightsV2(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('enableInsightsV2()', async () => {
    const params = {
      regionId: 'testString',
      networkInsights: true,
      activityInsights: true,

    };

    const res = await addonMgrService.enableInsightsV2(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('getSupportedInsightsV2()', async () => {
    const params = {

    };

    const res = await addonMgrService.getSupportedInsightsV2(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('testAiFindingsV2()', async () => {
    const params = {
      regionId: 'testString',
    };

    const res = await addonMgrService.testAiFindingsV2(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('deleteNetworkInsightsCosDetailsV2()', async () => {
    const params = {
      ids: ['testString'],

    };

    const res = await addonMgrService.deleteNetworkInsightsCosDetailsV2(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('deleteActivityInsightsCosDetailsV2()', async () => {
    const params = {
      ids: ['testString'],

    };

    const res = await addonMgrService.deleteActivityInsightsCosDetailsV2(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
});
