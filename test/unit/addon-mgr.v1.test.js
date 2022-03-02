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

// need to import the whole package to mock getAuthenticatorFromEnvironment
const core = require('ibm-cloud-sdk-core');

const { NoAuthAuthenticator, unitTestUtils } = core;

const AddonMgrV1 = require('../../dist/addon-mgr/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
  checkForSuccessfulExecution,
} = unitTestUtils;

const addonMgrServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://us-south.secadvisor.cloud.ibm.com/addonmgr',
  accountId: 'testString',
};

const addonMgrService = new AddonMgrV1(addonMgrServiceOptions);

// dont actually create a request
const createRequestMock = jest.spyOn(addonMgrService, 'createRequest');
createRequestMock.mockImplementation(() => Promise.resolve());

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

afterEach(() => {
  createRequestMock.mockClear();
  getAuthenticatorMock.mockClear();
});

// used for the service construction tests
let requiredGlobals;
beforeEach(() => {
  // these are changed when passed into the factory/constructor, so re-init
  requiredGlobals = {
    accountId: 'testString',
  };
});

describe('AddonMgrV1', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = AddonMgrV1.newInstance(requiredGlobals);

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(AddonMgrV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(AddonMgrV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(AddonMgrV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = AddonMgrV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(AddonMgrV1);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new AddonMgrV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new AddonMgrV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(AddonMgrV1.DEFAULT_SERVICE_URL);
    });
  });
  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new AddonMgrV1(addonMgrServiceOptions);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.accountId).toEqual(addonMgrServiceOptions.accountId);
      });
    });
  });
  describe('getServiceUrlForRegion', () => {
    test('should return undefined for invalid region', () => {
      expect(AddonMgrV1.getServiceUrlForRegion('INVALID_REGION')).toBeFalsy();
    });
    test('should return valid service url', () => {
      expect(AddonMgrV1.getServiceUrlForRegion('us-south')).toBe('https://us-south.secadvisor.cloud.ibm.com/addonmgr');      
      expect(AddonMgrV1.getServiceUrlForRegion('us-east')).toBe('https://us-south.secadvisor.cloud.ibm.com/addonmgr');      
      expect(AddonMgrV1.getServiceUrlForRegion('eu-gb')).toBe('https://eu-gb.secadvisor.cloud.ibm.com/addonmgr');      
      expect(AddonMgrV1.getServiceUrlForRegion('eu-de')).toBe('https://eu.compliance.cloud.ibm.com/si/addonmgr');      
    });
  });
  describe('addNetworkInsightsCosDetailsV2', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // CosDetailsV2CosDetailsItem
      const cosDetailsV2CosDetailsItemModel = {
        cos_instance: 'testString',
        bucket_name: 'testString',
        description: 'testString',
        type: 'network-insights',
        cos_bucket_url: 'testString',
      };

      function __addNetworkInsightsCosDetailsV2Test() {
        // Construct the params object for operation addNetworkInsightsCosDetailsV2
        const regionId = 'testString';
        const cosDetails = [cosDetailsV2CosDetailsItemModel];
        const transactionId = 'testString';
        const addNetworkInsightsCosDetailsV2Params = {
          regionId: regionId,
          cosDetails: cosDetails,
          transactionId: transactionId,
        };

        const addNetworkInsightsCosDetailsV2Result = addonMgrService.addNetworkInsightsCosDetailsV2(addNetworkInsightsCosDetailsV2Params);

        // all methods should return a Promise
        expectToBePromise(addNetworkInsightsCosDetailsV2Result);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/addons/{account_id}/network-insights/cos', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.body.region_id).toEqual(regionId);
        expect(mockRequestOptions.body.cos_details).toEqual(cosDetails);
        expect(mockRequestOptions.path.account_id).toEqual(addonMgrServiceOptions.accountId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __addNetworkInsightsCosDetailsV2Test();

        // enable retries and test again
        createRequestMock.mockClear();
        addonMgrService.enableRetries();
        __addNetworkInsightsCosDetailsV2Test();

        // disable retries and test again
        createRequestMock.mockClear();
        addonMgrService.disableRetries();
        __addNetworkInsightsCosDetailsV2Test();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const regionId = 'testString';
        const cosDetails = [cosDetailsV2CosDetailsItemModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const addNetworkInsightsCosDetailsV2Params = {
          regionId,
          cosDetails,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        addonMgrService.addNetworkInsightsCosDetailsV2(addNetworkInsightsCosDetailsV2Params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await addonMgrService.addNetworkInsightsCosDetailsV2({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await addonMgrService.addNetworkInsightsCosDetailsV2();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteNetworkInsightsCosDetailsV2', () => {
    describe('positive tests', () => {
      function __deleteNetworkInsightsCosDetailsV2Test() {
        // Construct the params object for operation deleteNetworkInsightsCosDetailsV2
        const ids = ['testString'];
        const transactionId = 'testString';
        const deleteNetworkInsightsCosDetailsV2Params = {
          ids: ids,
          transactionId: transactionId,
        };

        const deleteNetworkInsightsCosDetailsV2Result = addonMgrService.deleteNetworkInsightsCosDetailsV2(deleteNetworkInsightsCosDetailsV2Params);

        // all methods should return a Promise
        expectToBePromise(deleteNetworkInsightsCosDetailsV2Result);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/addons/{account_id}/network-insights/cos', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.body.ids).toEqual(ids);
        expect(mockRequestOptions.path.account_id).toEqual(addonMgrServiceOptions.accountId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteNetworkInsightsCosDetailsV2Test();

        // enable retries and test again
        createRequestMock.mockClear();
        addonMgrService.enableRetries();
        __deleteNetworkInsightsCosDetailsV2Test();

        // disable retries and test again
        createRequestMock.mockClear();
        addonMgrService.disableRetries();
        __deleteNetworkInsightsCosDetailsV2Test();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteNetworkInsightsCosDetailsV2Params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        addonMgrService.deleteNetworkInsightsCosDetailsV2(deleteNetworkInsightsCosDetailsV2Params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        addonMgrService.deleteNetworkInsightsCosDetailsV2({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('addActivityInsightsCosDetailsV2', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // CosDetailsV2CosDetailsItem
      const cosDetailsV2CosDetailsItemModel = {
        cos_instance: 'testString',
        bucket_name: 'testString',
        description: 'testString',
        type: 'network-insights',
        cos_bucket_url: 'testString',
      };

      function __addActivityInsightsCosDetailsV2Test() {
        // Construct the params object for operation addActivityInsightsCosDetailsV2
        const regionId = 'testString';
        const cosDetails = [cosDetailsV2CosDetailsItemModel];
        const transactionId = 'testString';
        const addActivityInsightsCosDetailsV2Params = {
          regionId: regionId,
          cosDetails: cosDetails,
          transactionId: transactionId,
        };

        const addActivityInsightsCosDetailsV2Result = addonMgrService.addActivityInsightsCosDetailsV2(addActivityInsightsCosDetailsV2Params);

        // all methods should return a Promise
        expectToBePromise(addActivityInsightsCosDetailsV2Result);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/addons/{account_id}/activity-insights/cos', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.body.region_id).toEqual(regionId);
        expect(mockRequestOptions.body.cos_details).toEqual(cosDetails);
        expect(mockRequestOptions.path.account_id).toEqual(addonMgrServiceOptions.accountId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __addActivityInsightsCosDetailsV2Test();

        // enable retries and test again
        createRequestMock.mockClear();
        addonMgrService.enableRetries();
        __addActivityInsightsCosDetailsV2Test();

        // disable retries and test again
        createRequestMock.mockClear();
        addonMgrService.disableRetries();
        __addActivityInsightsCosDetailsV2Test();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const regionId = 'testString';
        const cosDetails = [cosDetailsV2CosDetailsItemModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const addActivityInsightsCosDetailsV2Params = {
          regionId,
          cosDetails,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        addonMgrService.addActivityInsightsCosDetailsV2(addActivityInsightsCosDetailsV2Params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await addonMgrService.addActivityInsightsCosDetailsV2({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await addonMgrService.addActivityInsightsCosDetailsV2();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteActivityInsightsCosDetailsV2', () => {
    describe('positive tests', () => {
      function __deleteActivityInsightsCosDetailsV2Test() {
        // Construct the params object for operation deleteActivityInsightsCosDetailsV2
        const ids = ['testString'];
        const transactionId = 'testString';
        const deleteActivityInsightsCosDetailsV2Params = {
          ids: ids,
          transactionId: transactionId,
        };

        const deleteActivityInsightsCosDetailsV2Result = addonMgrService.deleteActivityInsightsCosDetailsV2(deleteActivityInsightsCosDetailsV2Params);

        // all methods should return a Promise
        expectToBePromise(deleteActivityInsightsCosDetailsV2Result);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/addons/{account_id}/activity-insights/cos', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.body.ids).toEqual(ids);
        expect(mockRequestOptions.path.account_id).toEqual(addonMgrServiceOptions.accountId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteActivityInsightsCosDetailsV2Test();

        // enable retries and test again
        createRequestMock.mockClear();
        addonMgrService.enableRetries();
        __deleteActivityInsightsCosDetailsV2Test();

        // disable retries and test again
        createRequestMock.mockClear();
        addonMgrService.disableRetries();
        __deleteActivityInsightsCosDetailsV2Test();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteActivityInsightsCosDetailsV2Params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        addonMgrService.deleteActivityInsightsCosDetailsV2(deleteActivityInsightsCosDetailsV2Params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        addonMgrService.deleteActivityInsightsCosDetailsV2({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('disableInsightsV2', () => {
    describe('positive tests', () => {
      function __disableInsightsV2Test() {
        // Construct the params object for operation disableInsightsV2
        const regionId = 'testString';
        const networkInsights = true;
        const activityInsights = true;
        const transactionId = 'testString';
        const disableInsightsV2Params = {
          regionId: regionId,
          networkInsights: networkInsights,
          activityInsights: activityInsights,
          transactionId: transactionId,
        };

        const disableInsightsV2Result = addonMgrService.disableInsightsV2(disableInsightsV2Params);

        // all methods should return a Promise
        expectToBePromise(disableInsightsV2Result);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/addons/{account_id}/disable', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.body.region_id).toEqual(regionId);
        expect(mockRequestOptions.body['network-insights']).toEqual(networkInsights);
        expect(mockRequestOptions.body['activity-insights']).toEqual(activityInsights);
        expect(mockRequestOptions.path.account_id).toEqual(addonMgrServiceOptions.accountId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __disableInsightsV2Test();

        // enable retries and test again
        createRequestMock.mockClear();
        addonMgrService.enableRetries();
        __disableInsightsV2Test();

        // disable retries and test again
        createRequestMock.mockClear();
        addonMgrService.disableRetries();
        __disableInsightsV2Test();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const regionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const disableInsightsV2Params = {
          regionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        addonMgrService.disableInsightsV2(disableInsightsV2Params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await addonMgrService.disableInsightsV2({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await addonMgrService.disableInsightsV2();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('enableInsightsV2', () => {
    describe('positive tests', () => {
      function __enableInsightsV2Test() {
        // Construct the params object for operation enableInsightsV2
        const regionId = 'testString';
        const networkInsights = true;
        const activityInsights = true;
        const transactionId = 'testString';
        const enableInsightsV2Params = {
          regionId: regionId,
          networkInsights: networkInsights,
          activityInsights: activityInsights,
          transactionId: transactionId,
        };

        const enableInsightsV2Result = addonMgrService.enableInsightsV2(enableInsightsV2Params);

        // all methods should return a Promise
        expectToBePromise(enableInsightsV2Result);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/addons/{account_id}/enable', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.body.region_id).toEqual(regionId);
        expect(mockRequestOptions.body['network-insights']).toEqual(networkInsights);
        expect(mockRequestOptions.body['activity-insights']).toEqual(activityInsights);
        expect(mockRequestOptions.path.account_id).toEqual(addonMgrServiceOptions.accountId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __enableInsightsV2Test();

        // enable retries and test again
        createRequestMock.mockClear();
        addonMgrService.enableRetries();
        __enableInsightsV2Test();

        // disable retries and test again
        createRequestMock.mockClear();
        addonMgrService.disableRetries();
        __enableInsightsV2Test();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const regionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const enableInsightsV2Params = {
          regionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        addonMgrService.enableInsightsV2(enableInsightsV2Params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await addonMgrService.enableInsightsV2({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await addonMgrService.enableInsightsV2();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getSupportedInsightsV2', () => {
    describe('positive tests', () => {
      function __getSupportedInsightsV2Test() {
        // Construct the params object for operation getSupportedInsightsV2
        const transactionId = 'testString';
        const getSupportedInsightsV2Params = {
          transactionId: transactionId,
        };

        const getSupportedInsightsV2Result = addonMgrService.getSupportedInsightsV2(getSupportedInsightsV2Params);

        // all methods should return a Promise
        expectToBePromise(getSupportedInsightsV2Result);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/addons/{account_id}/insights', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.path.account_id).toEqual(addonMgrServiceOptions.accountId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getSupportedInsightsV2Test();

        // enable retries and test again
        createRequestMock.mockClear();
        addonMgrService.enableRetries();
        __getSupportedInsightsV2Test();

        // disable retries and test again
        createRequestMock.mockClear();
        addonMgrService.disableRetries();
        __getSupportedInsightsV2Test();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getSupportedInsightsV2Params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        addonMgrService.getSupportedInsightsV2(getSupportedInsightsV2Params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        addonMgrService.getSupportedInsightsV2({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('testAiFindingsV2', () => {
    describe('positive tests', () => {
      function __testAiFindingsV2Test() {
        // Construct the params object for operation testAiFindingsV2
        const regionId = 'testString';
        const testAiFindingsV2Params = {
          regionId: regionId,
        };

        const testAiFindingsV2Result = addonMgrService.testAiFindingsV2(testAiFindingsV2Params);

        // all methods should return a Promise
        expectToBePromise(testAiFindingsV2Result);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/addons/{account_id}/activity-insights/test-ai-findings', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.region_id).toEqual(regionId);
        expect(mockRequestOptions.path.account_id).toEqual(addonMgrServiceOptions.accountId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __testAiFindingsV2Test();

        // enable retries and test again
        createRequestMock.mockClear();
        addonMgrService.enableRetries();
        __testAiFindingsV2Test();

        // disable retries and test again
        createRequestMock.mockClear();
        addonMgrService.disableRetries();
        __testAiFindingsV2Test();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const regionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const testAiFindingsV2Params = {
          regionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        addonMgrService.testAiFindingsV2(testAiFindingsV2Params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await addonMgrService.testAiFindingsV2({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await addonMgrService.testAiFindingsV2();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
