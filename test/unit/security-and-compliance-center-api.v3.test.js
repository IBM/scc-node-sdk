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

// need to import the whole package to mock getAuthenticatorFromEnvironment
const sdkCorePackage = require('ibm-cloud-sdk-core');

const { NoAuthAuthenticator, unitTestUtils } = sdkCorePackage;

const SecurityAndComplianceCenterApiV3 = require('../../dist/security-and-compliance-center-api/v3');
const nock = require('nock');

/* eslint-disable no-await-in-loop */

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
  checkForSuccessfulExecution,
} = unitTestUtils;

const securityAndComplianceCenterApiServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://us-south.compliance.cloud.ibm.com/instances/instance_id/v3',
};

const securityAndComplianceCenterApiService = new SecurityAndComplianceCenterApiV3(securityAndComplianceCenterApiServiceOptions);

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(securityAndComplianceCenterApiService, 'createRequest');
    createRequestMock.mockImplementation(() => Promise.resolve());
  }
}
function unmock_createRequest() {
  if (createRequestMock) {
    createRequestMock.mockRestore();
    createRequestMock = null;
  }
}

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(sdkCorePackage, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

describe('SecurityAndComplianceCenterApiV3', () => {

  beforeEach(() => {
    mock_createRequest();
  });

  afterEach(() => {
    if (createRequestMock) {
      createRequestMock.mockClear();
    }
    getAuthenticatorMock.mockClear();
  });
  
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = SecurityAndComplianceCenterApiV3.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(SecurityAndComplianceCenterApiV3);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = SecurityAndComplianceCenterApiV3.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(SecurityAndComplianceCenterApiV3);
    });
  });

  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new SecurityAndComplianceCenterApiV3(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new SecurityAndComplianceCenterApiV3(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_URL);
    });
  });

  describe('constructServiceUrl', () => {
    describe('positive tests', () => {
      test('should use all default variable values if null is passed', () => {
        const defaultFormattedUrl = 'https://us-south.compliance.cloud.ibm.com/instances/instance_id/v3';
        const formattedUrl = SecurityAndComplianceCenterApiV3.constructServiceUrl(null);

        expect(formattedUrl).toStrictEqual(defaultFormattedUrl);
      });
    });

    describe('negative tests', () => {
      test('should fail if an invalid variable name is provided', () => {
        expect(() => {
          const providedUrlVariables = new Map([['invalid_variable_name', 'value']]);
          SecurityAndComplianceCenterApiV3.constructServiceUrl(providedUrlVariables);
        }).toThrow();
      });
    });
  });

  describe('getSettings', () => {
    describe('positive tests', () => {
      function __getSettingsTest() {
        // Construct the params object for operation getSettings
        const xCorrelationId = '1a2b3c4d-5e6f-4a7b-8c9d-e0f1a2b3c4d5';
        const xRequestId = 'testString';
        const getSettingsParams = {
          xCorrelationId,
          xRequestId,
        };

        const getSettingsResult = securityAndComplianceCenterApiService.getSettings(getSettingsParams);

        // all methods should return a Promise
        expectToBePromise(getSettingsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/settings', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-Id', xCorrelationId);
        checkUserHeader(createRequestMock, 'X-Request-Id', xRequestId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getSettingsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __getSettingsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __getSettingsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getSettingsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.getSettings(getSettingsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        securityAndComplianceCenterApiService.getSettings({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('updateSettings', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // EventNotifications
      const eventNotificationsModel = {
        instance_crn: 'crn:v1:staging:public:event-notifications:us-south:a/ff88f007f9ff4622aac4fbc0eda36255:7199ae60-a214-4dd8-9bf7-ce571de49d01::',
        updated_on: '2019-01-01T12:00:00.000Z',
        source_id: 'crn:v1:staging:public:event-notifications:us-south:a/ff88f007f9ff4622aac4fbc0eda36255:b8b07245-0bbe-4478-b11c-0dce523105fd::',
        source_description: 'This source is used for integration with IBM Cloud Security and Compliance Center.',
        source_name: 'compliance',
      };

      // ObjectStorage
      const objectStorageModel = {
        instance_crn: 'crn:v1:staging:public:cloud-object-storage:global:a/ff88f007f9ff4622aac4fbc0eda36255:7199ae60-a214-4dd8-9bf7-ce571de49d01::',
        bucket: 'px-scan-results',
        bucket_location: 'us-south',
        bucket_endpoint: 'testString',
        updated_on: '2019-01-01T12:00:00.000Z',
      };

      function __updateSettingsTest() {
        // Construct the params object for operation updateSettings
        const eventNotifications = eventNotificationsModel;
        const objectStorage = objectStorageModel;
        const xCorrelationId = '1a2b3c4d-5e6f-4a7b-8c9d-e0f1a2b3c4d5';
        const xRequestId = 'testString';
        const updateSettingsParams = {
          eventNotifications,
          objectStorage,
          xCorrelationId,
          xRequestId,
        };

        const updateSettingsResult = securityAndComplianceCenterApiService.updateSettings(updateSettingsParams);

        // all methods should return a Promise
        expectToBePromise(updateSettingsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/settings', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-Id', xCorrelationId);
        checkUserHeader(createRequestMock, 'X-Request-Id', xRequestId);
        expect(mockRequestOptions.body.event_notifications).toEqual(eventNotifications);
        expect(mockRequestOptions.body.object_storage).toEqual(objectStorage);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateSettingsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __updateSettingsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __updateSettingsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateSettingsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.updateSettings(updateSettingsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        securityAndComplianceCenterApiService.updateSettings({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('postTestEvent', () => {
    describe('positive tests', () => {
      function __postTestEventTest() {
        // Construct the params object for operation postTestEvent
        const xCorrelationId = '1a2b3c4d-5e6f-4a7b-8c9d-e0f1a2b3c4d5';
        const xRequestId = 'testString';
        const postTestEventParams = {
          xCorrelationId,
          xRequestId,
        };

        const postTestEventResult = securityAndComplianceCenterApiService.postTestEvent(postTestEventParams);

        // all methods should return a Promise
        expectToBePromise(postTestEventResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/test_event', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-Id', xCorrelationId);
        checkUserHeader(createRequestMock, 'X-Request-Id', xRequestId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __postTestEventTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __postTestEventTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __postTestEventTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const postTestEventParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.postTestEvent(postTestEventParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        securityAndComplianceCenterApiService.postTestEvent({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('listControlLibraries', () => {
    describe('positive tests', () => {
      function __listControlLibrariesTest() {
        // Construct the params object for operation listControlLibraries
        const xCorrelationId = 'testString';
        const xRequestId = 'testString';
        const limit = 50;
        const controlLibraryType = 'custom';
        const start = 'testString';
        const listControlLibrariesParams = {
          xCorrelationId,
          xRequestId,
          limit,
          controlLibraryType,
          start,
        };

        const listControlLibrariesResult = securityAndComplianceCenterApiService.listControlLibraries(listControlLibrariesParams);

        // all methods should return a Promise
        expectToBePromise(listControlLibrariesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/control_libraries', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        checkUserHeader(createRequestMock, 'X-Request-ID', xRequestId);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.control_library_type).toEqual(controlLibraryType);
        expect(mockRequestOptions.qs.start).toEqual(start);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listControlLibrariesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __listControlLibrariesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __listControlLibrariesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listControlLibrariesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.listControlLibraries(listControlLibrariesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        securityAndComplianceCenterApiService.listControlLibraries({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });

    describe('ControlLibrariesPager tests', () => {
      const serviceUrl = securityAndComplianceCenterApiServiceOptions.url;
      const path = '/control_libraries';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"control_libraries":[{"id":"id","account_id":"account_id","control_library_name":"control_library_name","control_library_description":"control_library_description","control_library_type":"control_library_type","created_on":"2019-01-01T12:00:00.000Z","created_by":"created_by","updated_on":"2019-01-01T12:00:00.000Z","updated_by":"updated_by","version_group_label":"version_group_label","control_library_version":"control_library_version","latest":true,"controls_count":14}],"total_count":2,"limit":1}';
      const mockPagerResponse2 =
        '{"control_libraries":[{"id":"id","account_id":"account_id","control_library_name":"control_library_name","control_library_description":"control_library_description","control_library_type":"control_library_type","created_on":"2019-01-01T12:00:00.000Z","created_by":"created_by","updated_on":"2019-01-01T12:00:00.000Z","updated_by":"updated_by","version_group_label":"version_group_label","control_library_version":"control_library_version","latest":true,"controls_count":14}],"total_count":2,"limit":1}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get(uri => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get(uri => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          xCorrelationId: 'testString',
          xRequestId: 'testString',
          limit: 50,
          controlLibraryType: 'custom',
        };
        const allResults = [];
        const pager = new SecurityAndComplianceCenterApiV3.ControlLibrariesPager(securityAndComplianceCenterApiService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          xCorrelationId: 'testString',
          xRequestId: 'testString',
          limit: 50,
          controlLibraryType: 'custom',
        };
        const pager = new SecurityAndComplianceCenterApiV3.ControlLibrariesPager(securityAndComplianceCenterApiService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('createCustomControlLibrary', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ParameterInfo
      const parameterInfoModel = {
        parameter_name: 'session_invalidation_in_seconds',
        parameter_display_name: 'Sign out due to inactivity in seconds',
        parameter_type: 'numeric',
        parameter_value: 'public',
      };

      // Implementation
      const implementationModel = {
        assessment_id: 'rule-a637949b-7e51-46c4-afd4-b96619001bf1',
        assessment_method: 'ibm-cloud-rule',
        assessment_type: 'automated',
        assessment_description: 'Check that there is an Activity Tracker event route defined to collect global events generated by IBM Cloud services',
        parameter_count: 38,
        parameters: [parameterInfoModel],
      };

      // ControlSpecifications
      const controlSpecificationsModel = {
        control_specification_id: '5c7d6f88-a92f-4734-9b49-bd22b0900184',
        responsibility: 'user',
        component_id: 'iam-identity',
        componenet_name: 'testString',
        environment: 'ibm-cloud',
        control_specification_description: 'IBM cloud',
        assessments_count: 38,
        assessments: [implementationModel],
      };

      // ControlDocs
      const controlDocsModel = {
        control_docs_id: 'sc-7',
        control_docs_type: 'ibm-cloud',
      };

      // ControlsInControlLib
      const controlsInControlLibModel = {
        control_name: 'SC-7',
        control_id: '1fa45e17-9322-4e6c-bbd6-1c51db08e790',
        control_description: 'Boundary Protection',
        control_category: 'System and Communications Protection',
        control_parent: 'testString',
        control_tags: ['1fa45e17-9322-4e6c-bbd6-1c51db08e790'],
        control_specifications: [controlSpecificationsModel],
        control_docs: controlDocsModel,
        control_requirement: true,
        status: 'enabled',
      };

      function __createCustomControlLibraryTest() {
        // Construct the params object for operation createCustomControlLibrary
        const controlLibraryName = 'IBM Cloud for Financial Services';
        const controlLibraryDescription = 'IBM Cloud for Financial Services';
        const controlLibraryType = 'custom';
        const controls = [controlsInControlLibModel];
        const versionGroupLabel = '33fc7b80-0fa5-4f16-bbba-1f293f660f0d';
        const controlLibraryVersion = '1.0.0';
        const latest = true;
        const controlsCount = 38;
        const xCorrelationId = 'testString';
        const xRequestId = 'testString';
        const createCustomControlLibraryParams = {
          controlLibraryName,
          controlLibraryDescription,
          controlLibraryType,
          controls,
          versionGroupLabel,
          controlLibraryVersion,
          latest,
          controlsCount,
          xCorrelationId,
          xRequestId,
        };

        const createCustomControlLibraryResult = securityAndComplianceCenterApiService.createCustomControlLibrary(createCustomControlLibraryParams);

        // all methods should return a Promise
        expectToBePromise(createCustomControlLibraryResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/control_libraries', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        checkUserHeader(createRequestMock, 'X-Request-ID', xRequestId);
        expect(mockRequestOptions.body.control_library_name).toEqual(controlLibraryName);
        expect(mockRequestOptions.body.control_library_description).toEqual(controlLibraryDescription);
        expect(mockRequestOptions.body.control_library_type).toEqual(controlLibraryType);
        expect(mockRequestOptions.body.controls).toEqual(controls);
        expect(mockRequestOptions.body.version_group_label).toEqual(versionGroupLabel);
        expect(mockRequestOptions.body.control_library_version).toEqual(controlLibraryVersion);
        expect(mockRequestOptions.body.latest).toEqual(latest);
        expect(mockRequestOptions.body.controls_count).toEqual(controlsCount);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createCustomControlLibraryTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __createCustomControlLibraryTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __createCustomControlLibraryTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const controlLibraryName = 'IBM Cloud for Financial Services';
        const controlLibraryDescription = 'IBM Cloud for Financial Services';
        const controlLibraryType = 'custom';
        const controls = [controlsInControlLibModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createCustomControlLibraryParams = {
          controlLibraryName,
          controlLibraryDescription,
          controlLibraryType,
          controls,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.createCustomControlLibrary(createCustomControlLibraryParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.createCustomControlLibrary({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.createCustomControlLibrary();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteCustomControlLibrary', () => {
    describe('positive tests', () => {
      function __deleteCustomControlLibraryTest() {
        // Construct the params object for operation deleteCustomControlLibrary
        const controlLibrariesId = 'testString';
        const xCorrelationId = 'testString';
        const xRequestId = 'testString';
        const deleteCustomControlLibraryParams = {
          controlLibrariesId,
          xCorrelationId,
          xRequestId,
        };

        const deleteCustomControlLibraryResult = securityAndComplianceCenterApiService.deleteCustomControlLibrary(deleteCustomControlLibraryParams);

        // all methods should return a Promise
        expectToBePromise(deleteCustomControlLibraryResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/control_libraries/{control_libraries_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        checkUserHeader(createRequestMock, 'X-Request-ID', xRequestId);
        expect(mockRequestOptions.path.control_libraries_id).toEqual(controlLibrariesId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteCustomControlLibraryTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __deleteCustomControlLibraryTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __deleteCustomControlLibraryTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const controlLibrariesId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteCustomControlLibraryParams = {
          controlLibrariesId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.deleteCustomControlLibrary(deleteCustomControlLibraryParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.deleteCustomControlLibrary({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.deleteCustomControlLibrary();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getControlLibrary', () => {
    describe('positive tests', () => {
      function __getControlLibraryTest() {
        // Construct the params object for operation getControlLibrary
        const controlLibrariesId = 'testString';
        const xCorrelationId = 'testString';
        const xRequestId = 'testString';
        const getControlLibraryParams = {
          controlLibrariesId,
          xCorrelationId,
          xRequestId,
        };

        const getControlLibraryResult = securityAndComplianceCenterApiService.getControlLibrary(getControlLibraryParams);

        // all methods should return a Promise
        expectToBePromise(getControlLibraryResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/control_libraries/{control_libraries_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        checkUserHeader(createRequestMock, 'X-Request-ID', xRequestId);
        expect(mockRequestOptions.path.control_libraries_id).toEqual(controlLibrariesId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getControlLibraryTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __getControlLibraryTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __getControlLibraryTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const controlLibrariesId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getControlLibraryParams = {
          controlLibrariesId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.getControlLibrary(getControlLibraryParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.getControlLibrary({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.getControlLibrary();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('replaceCustomControlLibrary', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ParameterInfo
      const parameterInfoModel = {
        parameter_name: 'session_invalidation_in_seconds',
        parameter_display_name: 'Sign out due to inactivity in seconds',
        parameter_type: 'numeric',
        parameter_value: 'public',
      };

      // Implementation
      const implementationModel = {
        assessment_id: 'rule-a637949b-7e51-46c4-afd4-b96619001bf1',
        assessment_method: 'ibm-cloud-rule',
        assessment_type: 'automated',
        assessment_description: 'Check that there is an Activity Tracker event route defined to collect global events generated by IBM Cloud services',
        parameter_count: 38,
        parameters: [parameterInfoModel],
      };

      // ControlSpecifications
      const controlSpecificationsModel = {
        control_specification_id: '5c7d6f88-a92f-4734-9b49-bd22b0900184',
        responsibility: 'user',
        component_id: 'iam-identity',
        componenet_name: 'testString',
        environment: 'ibm-cloud',
        control_specification_description: 'IBM cloud',
        assessments_count: 38,
        assessments: [implementationModel],
      };

      // ControlDocs
      const controlDocsModel = {
        control_docs_id: 'sc-7',
        control_docs_type: 'ibm-cloud',
      };

      // ControlsInControlLib
      const controlsInControlLibModel = {
        control_name: 'SC-7',
        control_id: '1fa45e17-9322-4e6c-bbd6-1c51db08e790',
        control_description: 'Boundary Protection',
        control_category: 'System and Communications Protection',
        control_parent: 'testString',
        control_tags: ['1fa45e17-9322-4e6c-bbd6-1c51db08e790'],
        control_specifications: [controlSpecificationsModel],
        control_docs: controlDocsModel,
        control_requirement: true,
        status: 'enabled',
      };

      function __replaceCustomControlLibraryTest() {
        // Construct the params object for operation replaceCustomControlLibrary
        const controlLibrariesId = 'testString';
        const id = 'testString';
        const accountId = 'testString';
        const controlLibraryName = 'IBM Cloud for Financial Services';
        const controlLibraryDescription = 'IBM Cloud for Financial Services';
        const controlLibraryType = 'custom';
        const versionGroupLabel = 'testString';
        const controlLibraryVersion = '1.1.0';
        const createdOn = '2019-01-01T12:00:00.000Z';
        const createdBy = 'testString';
        const updatedOn = '2019-01-01T12:00:00.000Z';
        const updatedBy = 'testString';
        const latest = true;
        const hierarchyEnabled = true;
        const controlsCount = 38;
        const controlParentsCount = 38;
        const controls = [controlsInControlLibModel];
        const xCorrelationId = 'testString';
        const xRequestId = 'testString';
        const replaceCustomControlLibraryParams = {
          controlLibrariesId,
          id,
          accountId,
          controlLibraryName,
          controlLibraryDescription,
          controlLibraryType,
          versionGroupLabel,
          controlLibraryVersion,
          createdOn,
          createdBy,
          updatedOn,
          updatedBy,
          latest,
          hierarchyEnabled,
          controlsCount,
          controlParentsCount,
          controls,
          xCorrelationId,
          xRequestId,
        };

        const replaceCustomControlLibraryResult = securityAndComplianceCenterApiService.replaceCustomControlLibrary(replaceCustomControlLibraryParams);

        // all methods should return a Promise
        expectToBePromise(replaceCustomControlLibraryResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/control_libraries/{control_libraries_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        checkUserHeader(createRequestMock, 'X-Request-ID', xRequestId);
        expect(mockRequestOptions.body.id).toEqual(id);
        expect(mockRequestOptions.body.account_id).toEqual(accountId);
        expect(mockRequestOptions.body.control_library_name).toEqual(controlLibraryName);
        expect(mockRequestOptions.body.control_library_description).toEqual(controlLibraryDescription);
        expect(mockRequestOptions.body.control_library_type).toEqual(controlLibraryType);
        expect(mockRequestOptions.body.version_group_label).toEqual(versionGroupLabel);
        expect(mockRequestOptions.body.control_library_version).toEqual(controlLibraryVersion);
        expect(mockRequestOptions.body.created_on).toEqual(createdOn);
        expect(mockRequestOptions.body.created_by).toEqual(createdBy);
        expect(mockRequestOptions.body.updated_on).toEqual(updatedOn);
        expect(mockRequestOptions.body.updated_by).toEqual(updatedBy);
        expect(mockRequestOptions.body.latest).toEqual(latest);
        expect(mockRequestOptions.body.hierarchy_enabled).toEqual(hierarchyEnabled);
        expect(mockRequestOptions.body.controls_count).toEqual(controlsCount);
        expect(mockRequestOptions.body.control_parents_count).toEqual(controlParentsCount);
        expect(mockRequestOptions.body.controls).toEqual(controls);
        expect(mockRequestOptions.path.control_libraries_id).toEqual(controlLibrariesId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replaceCustomControlLibraryTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __replaceCustomControlLibraryTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __replaceCustomControlLibraryTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const controlLibrariesId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceCustomControlLibraryParams = {
          controlLibrariesId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.replaceCustomControlLibrary(replaceCustomControlLibraryParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.replaceCustomControlLibrary({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.replaceCustomControlLibrary();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listProfiles', () => {
    describe('positive tests', () => {
      function __listProfilesTest() {
        // Construct the params object for operation listProfiles
        const xCorrelationId = 'testString';
        const xRequestId = 'testString';
        const limit = 50;
        const profileType = 'custom';
        const start = 'testString';
        const listProfilesParams = {
          xCorrelationId,
          xRequestId,
          limit,
          profileType,
          start,
        };

        const listProfilesResult = securityAndComplianceCenterApiService.listProfiles(listProfilesParams);

        // all methods should return a Promise
        expectToBePromise(listProfilesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/profiles', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        checkUserHeader(createRequestMock, 'X-Request-ID', xRequestId);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.profile_type).toEqual(profileType);
        expect(mockRequestOptions.qs.start).toEqual(start);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listProfilesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __listProfilesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __listProfilesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listProfilesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.listProfiles(listProfilesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        securityAndComplianceCenterApiService.listProfiles({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });

    describe('ProfilesPager tests', () => {
      const serviceUrl = securityAndComplianceCenterApiServiceOptions.url;
      const path = '/profiles';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"total_count":2,"limit":1,"profiles":[{"id":"id","profile_name":"profile_name","profile_description":"profile_description","profile_type":"profile_type","profile_version":"profile_version","version_group_label":"version_group_label","latest":true,"created_by":"created_by","created_on":"2019-01-01T12:00:00.000Z","updated_by":"updated_by","updated_on":"2019-01-01T12:00:00.000Z","controls_count":14,"attachments_count":17}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"profiles":[{"id":"id","profile_name":"profile_name","profile_description":"profile_description","profile_type":"profile_type","profile_version":"profile_version","version_group_label":"version_group_label","latest":true,"created_by":"created_by","created_on":"2019-01-01T12:00:00.000Z","updated_by":"updated_by","updated_on":"2019-01-01T12:00:00.000Z","controls_count":14,"attachments_count":17}]}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get(uri => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get(uri => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          xCorrelationId: 'testString',
          xRequestId: 'testString',
          limit: 10,
          profileType: 'custom',
        };
        const allResults = [];
        const pager = new SecurityAndComplianceCenterApiV3.ProfilesPager(securityAndComplianceCenterApiService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          xCorrelationId: 'testString',
          xRequestId: 'testString',
          limit: 10,
          profileType: 'custom',
        };
        const pager = new SecurityAndComplianceCenterApiV3.ProfilesPager(securityAndComplianceCenterApiService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('createProfile', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ProfileControlsPrototype
      const profileControlsPrototypeModel = {
        control_library_id: 'e98a56ff-dc24-41d4-9875-1e188e2da6cd',
        control_id: '1fa45e17-9322-4e6c-bbd6-1c51db08e790',
      };

      // DefaultParametersPrototype
      const defaultParametersPrototypeModel = {
        assessment_type: 'Automated',
        assessment_id: 'rule-a637949b-7e51-46c4-afd4-b96619001bf1',
        parameter_name: 'session_invalidation_in_seconds',
        parameter_default_value: '120',
        parameter_display_name: 'Sign out due to inactivity in seconds',
        parameter_type: 'numeric',
      };

      function __createProfileTest() {
        // Construct the params object for operation createProfile
        const profileName = 'test_profile1';
        const profileDescription = 'test_description1';
        const profileType = 'custom';
        const controls = [profileControlsPrototypeModel];
        const defaultParameters = [defaultParametersPrototypeModel];
        const xCorrelationId = 'testString';
        const xRequestId = 'testString';
        const createProfileParams = {
          profileName,
          profileDescription,
          profileType,
          controls,
          defaultParameters,
          xCorrelationId,
          xRequestId,
        };

        const createProfileResult = securityAndComplianceCenterApiService.createProfile(createProfileParams);

        // all methods should return a Promise
        expectToBePromise(createProfileResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/profiles', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        checkUserHeader(createRequestMock, 'X-Request-ID', xRequestId);
        expect(mockRequestOptions.body.profile_name).toEqual(profileName);
        expect(mockRequestOptions.body.profile_description).toEqual(profileDescription);
        expect(mockRequestOptions.body.profile_type).toEqual(profileType);
        expect(mockRequestOptions.body.controls).toEqual(controls);
        expect(mockRequestOptions.body.default_parameters).toEqual(defaultParameters);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createProfileTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __createProfileTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __createProfileTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const profileName = 'test_profile1';
        const profileDescription = 'test_description1';
        const profileType = 'custom';
        const controls = [profileControlsPrototypeModel];
        const defaultParameters = [defaultParametersPrototypeModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createProfileParams = {
          profileName,
          profileDescription,
          profileType,
          controls,
          defaultParameters,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.createProfile(createProfileParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.createProfile({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.createProfile();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteCustomProfile', () => {
    describe('positive tests', () => {
      function __deleteCustomProfileTest() {
        // Construct the params object for operation deleteCustomProfile
        const profilesId = 'testString';
        const xCorrelationId = 'testString';
        const xRequestId = 'testString';
        const deleteCustomProfileParams = {
          profilesId,
          xCorrelationId,
          xRequestId,
        };

        const deleteCustomProfileResult = securityAndComplianceCenterApiService.deleteCustomProfile(deleteCustomProfileParams);

        // all methods should return a Promise
        expectToBePromise(deleteCustomProfileResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/profiles/{profiles_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        checkUserHeader(createRequestMock, 'X-Request-ID', xRequestId);
        expect(mockRequestOptions.path.profiles_id).toEqual(profilesId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteCustomProfileTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __deleteCustomProfileTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __deleteCustomProfileTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const profilesId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteCustomProfileParams = {
          profilesId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.deleteCustomProfile(deleteCustomProfileParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.deleteCustomProfile({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.deleteCustomProfile();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getProfile', () => {
    describe('positive tests', () => {
      function __getProfileTest() {
        // Construct the params object for operation getProfile
        const profilesId = 'testString';
        const xCorrelationId = 'testString';
        const xRequestId = 'testString';
        const getProfileParams = {
          profilesId,
          xCorrelationId,
          xRequestId,
        };

        const getProfileResult = securityAndComplianceCenterApiService.getProfile(getProfileParams);

        // all methods should return a Promise
        expectToBePromise(getProfileResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/profiles/{profiles_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        checkUserHeader(createRequestMock, 'X-Request-ID', xRequestId);
        expect(mockRequestOptions.path.profiles_id).toEqual(profilesId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getProfileTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __getProfileTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __getProfileTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const profilesId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getProfileParams = {
          profilesId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.getProfile(getProfileParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.getProfile({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.getProfile();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('replaceProfile', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ProfileControlsPrototype
      const profileControlsPrototypeModel = {
        control_library_id: 'e98a56ff-dc24-41d4-9875-1e188e2da6cd',
        control_id: '1fa45e17-9322-4e6c-bbd6-1c51db08e790',
      };

      // DefaultParametersPrototype
      const defaultParametersPrototypeModel = {
        assessment_type: 'Automated',
        assessment_id: 'rule-a637949b-7e51-46c4-afd4-b96619001bf1',
        parameter_name: 'session_invalidation_in_seconds',
        parameter_default_value: '120',
        parameter_display_name: 'Sign out due to inactivity in seconds',
        parameter_type: 'numeric',
      };

      function __replaceProfileTest() {
        // Construct the params object for operation replaceProfile
        const profilesId = 'testString';
        const profileName = 'test_profile1';
        const profileDescription = 'test_description1';
        const profileType = 'custom';
        const controls = [profileControlsPrototypeModel];
        const defaultParameters = [defaultParametersPrototypeModel];
        const xCorrelationId = 'testString';
        const xRequestId = 'testString';
        const replaceProfileParams = {
          profilesId,
          profileName,
          profileDescription,
          profileType,
          controls,
          defaultParameters,
          xCorrelationId,
          xRequestId,
        };

        const replaceProfileResult = securityAndComplianceCenterApiService.replaceProfile(replaceProfileParams);

        // all methods should return a Promise
        expectToBePromise(replaceProfileResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/profiles/{profiles_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        checkUserHeader(createRequestMock, 'X-Request-ID', xRequestId);
        expect(mockRequestOptions.body.profile_name).toEqual(profileName);
        expect(mockRequestOptions.body.profile_description).toEqual(profileDescription);
        expect(mockRequestOptions.body.profile_type).toEqual(profileType);
        expect(mockRequestOptions.body.controls).toEqual(controls);
        expect(mockRequestOptions.body.default_parameters).toEqual(defaultParameters);
        expect(mockRequestOptions.path.profiles_id).toEqual(profilesId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replaceProfileTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __replaceProfileTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __replaceProfileTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const profilesId = 'testString';
        const profileName = 'test_profile1';
        const profileDescription = 'test_description1';
        const profileType = 'custom';
        const controls = [profileControlsPrototypeModel];
        const defaultParameters = [defaultParametersPrototypeModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceProfileParams = {
          profilesId,
          profileName,
          profileDescription,
          profileType,
          controls,
          defaultParameters,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.replaceProfile(replaceProfileParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.replaceProfile({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.replaceProfile();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listRules', () => {
    describe('positive tests', () => {
      function __listRulesTest() {
        // Construct the params object for operation listRules
        const xCorrelationId = 'testString';
        const xRequestId = 'testString';
        const type = 'system_defined';
        const search = 'testString';
        const serviceName = 'testString';
        const listRulesParams = {
          xCorrelationId,
          xRequestId,
          type,
          search,
          serviceName,
        };

        const listRulesResult = securityAndComplianceCenterApiService.listRules(listRulesParams);

        // all methods should return a Promise
        expectToBePromise(listRulesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/rules', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-Id', xCorrelationId);
        checkUserHeader(createRequestMock, 'X-Request-Id', xRequestId);
        expect(mockRequestOptions.qs.type).toEqual(type);
        expect(mockRequestOptions.qs.search).toEqual(search);
        expect(mockRequestOptions.qs.service_name).toEqual(serviceName);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listRulesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __listRulesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __listRulesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listRulesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.listRules(listRulesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        securityAndComplianceCenterApiService.listRules({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('createRule', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // AdditionalTargetAttribute
      const additionalTargetAttributeModel = {
        name: 'location',
        operator: 'string_equals',
        value: 'us-east',
      };

      // Target
      const targetModel = {
        service_name: 'cloud-object-storage',
        service_display_name: 'testString',
        resource_kind: 'bucket',
        additional_target_attributes: [additionalTargetAttributeModel],
      };

      // RequiredConfigItemsRequiredConfigBase
      const requiredConfigItemsModel = {
        description: 'testString',
        property: 'hard_quota',
        operator: 'num_equals',
        value: '${hard_quota}',
      };

      // RequiredConfigRequiredConfigAnd
      const requiredConfigModel = {
        description: 'The Cloud Object Storage rule.',
        and: [requiredConfigItemsModel],
      };

      // Parameter
      const parameterModel = {
        name: 'hard_quota',
        display_name: 'The Cloud Object Storage bucket quota.',
        description: 'The maximum bytes that are allocated to the Cloud Object Storage bucket.',
        type: 'numeric',
      };

      // Import
      const importModel = {
        parameters: [parameterModel],
      };

      function __createRuleTest() {
        // Construct the params object for operation createRule
        const description = 'Example rule';
        const target = targetModel;
        const requiredConfig = requiredConfigModel;
        const type = 'user_defined';
        const version = '1.0.0';
        const _import = importModel;
        const labels = [];
        const xCorrelationId = 'testString';
        const xRequestId = 'testString';
        const createRuleParams = {
          description,
          target,
          requiredConfig,
          type,
          version,
          _import,
          labels,
          xCorrelationId,
          xRequestId,
        };

        const createRuleResult = securityAndComplianceCenterApiService.createRule(createRuleParams);

        // all methods should return a Promise
        expectToBePromise(createRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/rules', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-Id', xCorrelationId);
        checkUserHeader(createRequestMock, 'X-Request-Id', xRequestId);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.target).toEqual(target);
        expect(mockRequestOptions.body.required_config).toEqual(requiredConfig);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.version).toEqual(version);
        expect(mockRequestOptions.body.import).toEqual(_import);
        expect(mockRequestOptions.body.labels).toEqual(labels);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __createRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __createRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const description = 'Example rule';
        const target = targetModel;
        const requiredConfig = requiredConfigModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createRuleParams = {
          description,
          target,
          requiredConfig,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.createRule(createRuleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.createRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.createRule();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteRule', () => {
    describe('positive tests', () => {
      function __deleteRuleTest() {
        // Construct the params object for operation deleteRule
        const ruleId = 'testString';
        const xCorrelationId = 'testString';
        const xRequestId = 'testString';
        const deleteRuleParams = {
          ruleId,
          xCorrelationId,
          xRequestId,
        };

        const deleteRuleResult = securityAndComplianceCenterApiService.deleteRule(deleteRuleParams);

        // all methods should return a Promise
        expectToBePromise(deleteRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/rules/{rule_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-Id', xCorrelationId);
        checkUserHeader(createRequestMock, 'X-Request-Id', xRequestId);
        expect(mockRequestOptions.path.rule_id).toEqual(ruleId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __deleteRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __deleteRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const ruleId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteRuleParams = {
          ruleId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.deleteRule(deleteRuleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.deleteRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.deleteRule();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getRule', () => {
    describe('positive tests', () => {
      function __getRuleTest() {
        // Construct the params object for operation getRule
        const ruleId = 'testString';
        const xCorrelationId = 'testString';
        const xRequestId = 'testString';
        const getRuleParams = {
          ruleId,
          xCorrelationId,
          xRequestId,
        };

        const getRuleResult = securityAndComplianceCenterApiService.getRule(getRuleParams);

        // all methods should return a Promise
        expectToBePromise(getRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/rules/{rule_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-Id', xCorrelationId);
        checkUserHeader(createRequestMock, 'X-Request-Id', xRequestId);
        expect(mockRequestOptions.path.rule_id).toEqual(ruleId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __getRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __getRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const ruleId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getRuleParams = {
          ruleId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.getRule(getRuleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.getRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.getRule();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('replaceRule', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // AdditionalTargetAttribute
      const additionalTargetAttributeModel = {
        name: 'location',
        operator: 'string_equals',
        value: 'us-south',
      };

      // Target
      const targetModel = {
        service_name: 'cloud-object-storage',
        service_display_name: 'Cloud Object Storage',
        resource_kind: 'bucket',
        additional_target_attributes: [additionalTargetAttributeModel],
      };

      // RequiredConfigItemsRequiredConfigBase
      const requiredConfigItemsModel = {
        description: 'testString',
        property: 'hard_quota',
        operator: 'num_equals',
        value: '${hard_quota}',
      };

      // RequiredConfigRequiredConfigAnd
      const requiredConfigModel = {
        description: 'The Cloud Object Storage rule.',
        and: [requiredConfigItemsModel],
      };

      // Parameter
      const parameterModel = {
        name: 'hard_quota',
        display_name: 'The Cloud Object Storage bucket quota.',
        description: 'The maximum bytes that are allocated to the Cloud Object Storage bucket.',
        type: 'numeric',
      };

      // Import
      const importModel = {
        parameters: [parameterModel],
      };

      function __replaceRuleTest() {
        // Construct the params object for operation replaceRule
        const ruleId = 'testString';
        const ifMatch = 'testString';
        const description = 'Example rule';
        const target = targetModel;
        const requiredConfig = requiredConfigModel;
        const type = 'user_defined';
        const version = '1.0.1';
        const _import = importModel;
        const labels = [];
        const xCorrelationId = 'testString';
        const xRequestId = 'testString';
        const replaceRuleParams = {
          ruleId,
          ifMatch,
          description,
          target,
          requiredConfig,
          type,
          version,
          _import,
          labels,
          xCorrelationId,
          xRequestId,
        };

        const replaceRuleResult = securityAndComplianceCenterApiService.replaceRule(replaceRuleParams);

        // all methods should return a Promise
        expectToBePromise(replaceRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/rules/{rule_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        checkUserHeader(createRequestMock, 'X-Correlation-Id', xCorrelationId);
        checkUserHeader(createRequestMock, 'X-Request-Id', xRequestId);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.target).toEqual(target);
        expect(mockRequestOptions.body.required_config).toEqual(requiredConfig);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.version).toEqual(version);
        expect(mockRequestOptions.body.import).toEqual(_import);
        expect(mockRequestOptions.body.labels).toEqual(labels);
        expect(mockRequestOptions.path.rule_id).toEqual(ruleId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replaceRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __replaceRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __replaceRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const ruleId = 'testString';
        const ifMatch = 'testString';
        const description = 'Example rule';
        const target = targetModel;
        const requiredConfig = requiredConfigModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceRuleParams = {
          ruleId,
          ifMatch,
          description,
          target,
          requiredConfig,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.replaceRule(replaceRuleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.replaceRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.replaceRule();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listAttachments', () => {
    describe('positive tests', () => {
      function __listAttachmentsTest() {
        // Construct the params object for operation listAttachments
        const profilesId = 'testString';
        const xCorrelationId = 'testString';
        const xRequestId = 'testString';
        const limit = 50;
        const start = 'testString';
        const listAttachmentsParams = {
          profilesId,
          xCorrelationId,
          xRequestId,
          limit,
          start,
        };

        const listAttachmentsResult = securityAndComplianceCenterApiService.listAttachments(listAttachmentsParams);

        // all methods should return a Promise
        expectToBePromise(listAttachmentsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/profiles/{profiles_id}/attachments', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        checkUserHeader(createRequestMock, 'X-Request-ID', xRequestId);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.path.profiles_id).toEqual(profilesId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listAttachmentsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __listAttachmentsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __listAttachmentsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const profilesId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listAttachmentsParams = {
          profilesId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.listAttachments(listAttachmentsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.listAttachments({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.listAttachments();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('AttachmentsPager tests', () => {
      const serviceUrl = securityAndComplianceCenterApiServiceOptions.url;
      const path = '/profiles/testString/attachments';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"attachments":[{"id":"130003ea8bfa43c5aacea07a86da3000","profile_id":"7ec45986-54fc-4b66-a303-d9577b078c65","account_id":"130003ea8bfa43c5aacea07a86da3000","instance_id":"edf9524f-406c-412c-acbb-ee371a5cabda","scope":[{"environment":"environment","properties":[{"name":"name","value":"value"}]}],"created_on":"2019-01-01T12:00:00.000Z","created_by":"created_by","updated_on":"2019-01-01T12:00:00.000Z","updated_by":"updated_by","status":"enabled","schedule":"daily","notifications":{"enabled":false,"controls":{"threshold_limit":15,"failed_control_ids":["5C453578-E9A1-421E-AD0F-C6AFCDD67CCF"]}},"attachment_parameters":[{"assessment_type":"assessment_type","assessment_id":"assessment_id","parameter_name":"parameter_name","parameter_value":"parameter_value","parameter_display_name":"parameter_display_name","parameter_type":"string"}],"last_scan":{"id":"e8a39d25-0051-4328-8462-988ad321f49a","status":"in_progress","time":"2019-01-01T12:00:00.000Z"},"next_scan_time":"2019-01-01T12:00:00.000Z","name":"account-130003ea8bfa43c5aacea07a86da3000","description":"Test description"}],"total_count":2,"limit":1}';
      const mockPagerResponse2 =
        '{"attachments":[{"id":"130003ea8bfa43c5aacea07a86da3000","profile_id":"7ec45986-54fc-4b66-a303-d9577b078c65","account_id":"130003ea8bfa43c5aacea07a86da3000","instance_id":"edf9524f-406c-412c-acbb-ee371a5cabda","scope":[{"environment":"environment","properties":[{"name":"name","value":"value"}]}],"created_on":"2019-01-01T12:00:00.000Z","created_by":"created_by","updated_on":"2019-01-01T12:00:00.000Z","updated_by":"updated_by","status":"enabled","schedule":"daily","notifications":{"enabled":false,"controls":{"threshold_limit":15,"failed_control_ids":["5C453578-E9A1-421E-AD0F-C6AFCDD67CCF"]}},"attachment_parameters":[{"assessment_type":"assessment_type","assessment_id":"assessment_id","parameter_name":"parameter_name","parameter_value":"parameter_value","parameter_display_name":"parameter_display_name","parameter_type":"string"}],"last_scan":{"id":"e8a39d25-0051-4328-8462-988ad321f49a","status":"in_progress","time":"2019-01-01T12:00:00.000Z"},"next_scan_time":"2019-01-01T12:00:00.000Z","name":"account-130003ea8bfa43c5aacea07a86da3000","description":"Test description"}],"total_count":2,"limit":1}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get(uri => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get(uri => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          profilesId: 'testString',
          xCorrelationId: 'testString',
          xRequestId: 'testString',
          limit: 10,
        };
        const allResults = [];
        const pager = new SecurityAndComplianceCenterApiV3.AttachmentsPager(securityAndComplianceCenterApiService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          profilesId: 'testString',
          xCorrelationId: 'testString',
          xRequestId: 'testString',
          limit: 10,
        };
        const pager = new SecurityAndComplianceCenterApiV3.AttachmentsPager(securityAndComplianceCenterApiService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('createAttachment', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // PropertyItem
      const propertyItemModel = {
        name: 'scope_id',
        value: 'cg3335893hh1428692d6747cf300yeb5',
      };

      // MultiCloudScope
      const multiCloudScopeModel = {
        environment: 'ibm-cloud',
        properties: [propertyItemModel],
      };

      // FailedControls
      const failedControlsModel = {
        threshold_limit: 15,
        failed_control_ids: [],
      };

      // AttachmentsNotificationsPrototype
      const attachmentsNotificationsPrototypeModel = {
        enabled: false,
        controls: failedControlsModel,
      };

      // AttachmentParameterPrototype
      const attachmentParameterPrototypeModel = {
        assessment_type: 'Automated',
        assessment_id: 'rule-a637949b-7e51-46c4-afd4-b96619001bf1',
        parameter_name: 'session_invalidation_in_seconds',
        parameter_value: '120',
        parameter_display_name: 'Sign out due to inactivity in seconds',
        parameter_type: 'numeric',
      };

      // AttachmentsPrototype
      const attachmentsPrototypeModel = {
        id: '130003ea8bfa43c5aacea07a86da3000',
        name: 'account-0d8c3805dfea40aa8ad02265a18eb12b',
        description: 'Test description',
        scope: [multiCloudScopeModel],
        status: 'enabled',
        schedule: 'every_30_days',
        notifications: attachmentsNotificationsPrototypeModel,
        attachment_parameters: [attachmentParameterPrototypeModel],
      };

      function __createAttachmentTest() {
        // Construct the params object for operation createAttachment
        const profilesId = 'testString';
        const attachments = [attachmentsPrototypeModel];
        const profileId = 'testString';
        const xCorrelationId = 'testString';
        const xRequestId = 'testString';
        const createAttachmentParams = {
          profilesId,
          attachments,
          profileId,
          xCorrelationId,
          xRequestId,
        };

        const createAttachmentResult = securityAndComplianceCenterApiService.createAttachment(createAttachmentParams);

        // all methods should return a Promise
        expectToBePromise(createAttachmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/profiles/{profiles_id}/attachments', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        checkUserHeader(createRequestMock, 'X-Request-ID', xRequestId);
        expect(mockRequestOptions.body.attachments).toEqual(attachments);
        expect(mockRequestOptions.body.profile_id).toEqual(profileId);
        expect(mockRequestOptions.path.profiles_id).toEqual(profilesId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createAttachmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __createAttachmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __createAttachmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const profilesId = 'testString';
        const attachments = [attachmentsPrototypeModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createAttachmentParams = {
          profilesId,
          attachments,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.createAttachment(createAttachmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.createAttachment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.createAttachment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteProfileAttachment', () => {
    describe('positive tests', () => {
      function __deleteProfileAttachmentTest() {
        // Construct the params object for operation deleteProfileAttachment
        const attachmentId = 'testString';
        const profilesId = 'testString';
        const xCorrelationId = 'testString';
        const xRequestId = 'testString';
        const deleteProfileAttachmentParams = {
          attachmentId,
          profilesId,
          xCorrelationId,
          xRequestId,
        };

        const deleteProfileAttachmentResult = securityAndComplianceCenterApiService.deleteProfileAttachment(deleteProfileAttachmentParams);

        // all methods should return a Promise
        expectToBePromise(deleteProfileAttachmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/profiles/{profiles_id}/attachments/{attachment_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        checkUserHeader(createRequestMock, 'X-Request-ID', xRequestId);
        expect(mockRequestOptions.path.attachment_id).toEqual(attachmentId);
        expect(mockRequestOptions.path.profiles_id).toEqual(profilesId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteProfileAttachmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __deleteProfileAttachmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __deleteProfileAttachmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const attachmentId = 'testString';
        const profilesId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteProfileAttachmentParams = {
          attachmentId,
          profilesId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.deleteProfileAttachment(deleteProfileAttachmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.deleteProfileAttachment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.deleteProfileAttachment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getProfileAttachment', () => {
    describe('positive tests', () => {
      function __getProfileAttachmentTest() {
        // Construct the params object for operation getProfileAttachment
        const attachmentId = 'testString';
        const profilesId = 'testString';
        const xCorrelationId = 'testString';
        const xRequestId = 'testString';
        const getProfileAttachmentParams = {
          attachmentId,
          profilesId,
          xCorrelationId,
          xRequestId,
        };

        const getProfileAttachmentResult = securityAndComplianceCenterApiService.getProfileAttachment(getProfileAttachmentParams);

        // all methods should return a Promise
        expectToBePromise(getProfileAttachmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/profiles/{profiles_id}/attachments/{attachment_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        checkUserHeader(createRequestMock, 'X-Request-ID', xRequestId);
        expect(mockRequestOptions.path.attachment_id).toEqual(attachmentId);
        expect(mockRequestOptions.path.profiles_id).toEqual(profilesId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getProfileAttachmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __getProfileAttachmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __getProfileAttachmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const attachmentId = 'testString';
        const profilesId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getProfileAttachmentParams = {
          attachmentId,
          profilesId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.getProfileAttachment(getProfileAttachmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.getProfileAttachment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.getProfileAttachment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('replaceProfileAttachment', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // PropertyItem
      const propertyItemModel = {
        name: 'scope_id',
        value: 'cg3335893hh1428692d6747cf300yeb5',
      };

      // MultiCloudScope
      const multiCloudScopeModel = {
        environment: 'ibm-cloud',
        properties: [propertyItemModel],
      };

      // FailedControls
      const failedControlsModel = {
        threshold_limit: 15,
        failed_control_ids: [],
      };

      // AttachmentsNotificationsPrototype
      const attachmentsNotificationsPrototypeModel = {
        enabled: false,
        controls: failedControlsModel,
      };

      // AttachmentParameterPrototype
      const attachmentParameterPrototypeModel = {
        assessment_type: 'Automated',
        assessment_id: 'rule-a637949b-7e51-46c4-afd4-b96619001bf1',
        parameter_name: 'session_invalidation_in_seconds',
        parameter_value: '120',
        parameter_display_name: 'Sign out due to inactivity in seconds',
        parameter_type: 'numeric',
      };

      // LastScan
      const lastScanModel = {
        id: 'e8a39d25-0051-4328-8462-988ad321f49a',
        status: 'in_progress',
        time: '2019-01-01T12:00:00.000Z',
      };

      function __replaceProfileAttachmentTest() {
        // Construct the params object for operation replaceProfileAttachment
        const attachmentId = 'testString';
        const profilesId = 'testString';
        const id = 'testString';
        const profileId = 'testString';
        const accountId = 'testString';
        const instanceId = 'testString';
        const scope = [multiCloudScopeModel];
        const createdOn = '2019-01-01T12:00:00.000Z';
        const createdBy = 'testString';
        const updatedOn = '2019-01-01T12:00:00.000Z';
        const updatedBy = 'testString';
        const status = 'enabled';
        const schedule = 'every_30_days';
        const notifications = attachmentsNotificationsPrototypeModel;
        const attachmentParameters = [attachmentParameterPrototypeModel];
        const lastScan = lastScanModel;
        const nextScanTime = '2019-01-01T12:00:00.000Z';
        const name = 'account-0d8c3805dfea40aa8ad02265a18eb12b';
        const description = 'Test description';
        const xCorrelationId = 'testString';
        const xRequestId = 'testString';
        const replaceProfileAttachmentParams = {
          attachmentId,
          profilesId,
          id,
          profileId,
          accountId,
          instanceId,
          scope,
          createdOn,
          createdBy,
          updatedOn,
          updatedBy,
          status,
          schedule,
          notifications,
          attachmentParameters,
          lastScan,
          nextScanTime,
          name,
          description,
          xCorrelationId,
          xRequestId,
        };

        const replaceProfileAttachmentResult = securityAndComplianceCenterApiService.replaceProfileAttachment(replaceProfileAttachmentParams);

        // all methods should return a Promise
        expectToBePromise(replaceProfileAttachmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/profiles/{profiles_id}/attachments/{attachment_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        checkUserHeader(createRequestMock, 'X-Request-ID', xRequestId);
        expect(mockRequestOptions.body.id).toEqual(id);
        expect(mockRequestOptions.body.profile_id).toEqual(profileId);
        expect(mockRequestOptions.body.account_id).toEqual(accountId);
        expect(mockRequestOptions.body.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.body.scope).toEqual(scope);
        expect(mockRequestOptions.body.created_on).toEqual(createdOn);
        expect(mockRequestOptions.body.created_by).toEqual(createdBy);
        expect(mockRequestOptions.body.updated_on).toEqual(updatedOn);
        expect(mockRequestOptions.body.updated_by).toEqual(updatedBy);
        expect(mockRequestOptions.body.status).toEqual(status);
        expect(mockRequestOptions.body.schedule).toEqual(schedule);
        expect(mockRequestOptions.body.notifications).toEqual(notifications);
        expect(mockRequestOptions.body.attachment_parameters).toEqual(attachmentParameters);
        expect(mockRequestOptions.body.last_scan).toEqual(lastScan);
        expect(mockRequestOptions.body.next_scan_time).toEqual(nextScanTime);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.path.attachment_id).toEqual(attachmentId);
        expect(mockRequestOptions.path.profiles_id).toEqual(profilesId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replaceProfileAttachmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __replaceProfileAttachmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __replaceProfileAttachmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const attachmentId = 'testString';
        const profilesId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceProfileAttachmentParams = {
          attachmentId,
          profilesId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.replaceProfileAttachment(replaceProfileAttachmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.replaceProfileAttachment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.replaceProfileAttachment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createScan', () => {
    describe('positive tests', () => {
      function __createScanTest() {
        // Construct the params object for operation createScan
        const attachmentId = 'testString';
        const xCorrelationId = 'testString';
        const xRequestId = 'testString';
        const createScanParams = {
          attachmentId,
          xCorrelationId,
          xRequestId,
        };

        const createScanResult = securityAndComplianceCenterApiService.createScan(createScanParams);

        // all methods should return a Promise
        expectToBePromise(createScanResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/scans', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        checkUserHeader(createRequestMock, 'X-Request-ID', xRequestId);
        expect(mockRequestOptions.body.attachment_id).toEqual(attachmentId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createScanTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __createScanTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __createScanTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const attachmentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createScanParams = {
          attachmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.createScan(createScanParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.createScan({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.createScan();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listAttachmentsAccount', () => {
    describe('positive tests', () => {
      function __listAttachmentsAccountTest() {
        // Construct the params object for operation listAttachmentsAccount
        const xCorrelationId = 'testString';
        const xRequestId = 'testString';
        const limit = 50;
        const start = 'testString';
        const listAttachmentsAccountParams = {
          xCorrelationId,
          xRequestId,
          limit,
          start,
        };

        const listAttachmentsAccountResult = securityAndComplianceCenterApiService.listAttachmentsAccount(listAttachmentsAccountParams);

        // all methods should return a Promise
        expectToBePromise(listAttachmentsAccountResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/attachments', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        checkUserHeader(createRequestMock, 'X-Request-ID', xRequestId);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listAttachmentsAccountTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __listAttachmentsAccountTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __listAttachmentsAccountTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listAttachmentsAccountParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.listAttachmentsAccount(listAttachmentsAccountParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        securityAndComplianceCenterApiService.listAttachmentsAccount({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });

    describe('AttachmentsAccountPager tests', () => {
      const serviceUrl = securityAndComplianceCenterApiServiceOptions.url;
      const path = '/attachments';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"attachments":[{"id":"130003ea8bfa43c5aacea07a86da3000","profile_id":"7ec45986-54fc-4b66-a303-d9577b078c65","account_id":"130003ea8bfa43c5aacea07a86da3000","instance_id":"edf9524f-406c-412c-acbb-ee371a5cabda","scope":[{"environment":"environment","properties":[{"name":"name","value":"value"}]}],"created_on":"2019-01-01T12:00:00.000Z","created_by":"created_by","updated_on":"2019-01-01T12:00:00.000Z","updated_by":"updated_by","status":"enabled","schedule":"daily","notifications":{"enabled":false,"controls":{"threshold_limit":15,"failed_control_ids":["5C453578-E9A1-421E-AD0F-C6AFCDD67CCF"]}},"attachment_parameters":[{"assessment_type":"assessment_type","assessment_id":"assessment_id","parameter_name":"parameter_name","parameter_value":"parameter_value","parameter_display_name":"parameter_display_name","parameter_type":"string"}],"last_scan":{"id":"e8a39d25-0051-4328-8462-988ad321f49a","status":"in_progress","time":"2019-01-01T12:00:00.000Z"},"next_scan_time":"2019-01-01T12:00:00.000Z","name":"account-130003ea8bfa43c5aacea07a86da3000","description":"Test description"}],"total_count":2,"limit":1}';
      const mockPagerResponse2 =
        '{"attachments":[{"id":"130003ea8bfa43c5aacea07a86da3000","profile_id":"7ec45986-54fc-4b66-a303-d9577b078c65","account_id":"130003ea8bfa43c5aacea07a86da3000","instance_id":"edf9524f-406c-412c-acbb-ee371a5cabda","scope":[{"environment":"environment","properties":[{"name":"name","value":"value"}]}],"created_on":"2019-01-01T12:00:00.000Z","created_by":"created_by","updated_on":"2019-01-01T12:00:00.000Z","updated_by":"updated_by","status":"enabled","schedule":"daily","notifications":{"enabled":false,"controls":{"threshold_limit":15,"failed_control_ids":["5C453578-E9A1-421E-AD0F-C6AFCDD67CCF"]}},"attachment_parameters":[{"assessment_type":"assessment_type","assessment_id":"assessment_id","parameter_name":"parameter_name","parameter_value":"parameter_value","parameter_display_name":"parameter_display_name","parameter_type":"string"}],"last_scan":{"id":"e8a39d25-0051-4328-8462-988ad321f49a","status":"in_progress","time":"2019-01-01T12:00:00.000Z"},"next_scan_time":"2019-01-01T12:00:00.000Z","name":"account-130003ea8bfa43c5aacea07a86da3000","description":"Test description"}],"total_count":2,"limit":1}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get(uri => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get(uri => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          xCorrelationId: 'testString',
          xRequestId: 'testString',
          limit: 10,
        };
        const allResults = [];
        const pager = new SecurityAndComplianceCenterApiV3.AttachmentsAccountPager(securityAndComplianceCenterApiService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          xCorrelationId: 'testString',
          xRequestId: 'testString',
          limit: 10,
        };
        const pager = new SecurityAndComplianceCenterApiV3.AttachmentsAccountPager(securityAndComplianceCenterApiService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('getLatestReports', () => {
    describe('positive tests', () => {
      function __getLatestReportsTest() {
        // Construct the params object for operation getLatestReports
        const xCorrelationId = 'testString';
        const xRequestId = 'testString';
        const sort = 'profile_name';
        const getLatestReportsParams = {
          xCorrelationId,
          xRequestId,
          sort,
        };

        const getLatestReportsResult = securityAndComplianceCenterApiService.getLatestReports(getLatestReportsParams);

        // all methods should return a Promise
        expectToBePromise(getLatestReportsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/reports/latest', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        checkUserHeader(createRequestMock, 'X-Request-ID', xRequestId);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getLatestReportsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __getLatestReportsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __getLatestReportsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getLatestReportsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.getLatestReports(getLatestReportsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        securityAndComplianceCenterApiService.getLatestReports({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('listReports', () => {
    describe('positive tests', () => {
      function __listReportsTest() {
        // Construct the params object for operation listReports
        const xCorrelationId = 'testString';
        const xRequestId = 'testString';
        const attachmentId = 'testString';
        const groupId = 'testString';
        const profileId = 'testString';
        const type = 'scheduled';
        const start = 'testString';
        const limit = 50;
        const sort = 'profile_name';
        const listReportsParams = {
          xCorrelationId,
          xRequestId,
          attachmentId,
          groupId,
          profileId,
          type,
          start,
          limit,
          sort,
        };

        const listReportsResult = securityAndComplianceCenterApiService.listReports(listReportsParams);

        // all methods should return a Promise
        expectToBePromise(listReportsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/reports', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        checkUserHeader(createRequestMock, 'X-Request-ID', xRequestId);
        expect(mockRequestOptions.qs.attachment_id).toEqual(attachmentId);
        expect(mockRequestOptions.qs.group_id).toEqual(groupId);
        expect(mockRequestOptions.qs.profile_id).toEqual(profileId);
        expect(mockRequestOptions.qs.type).toEqual(type);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listReportsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __listReportsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __listReportsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listReportsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.listReports(listReportsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        securityAndComplianceCenterApiService.listReports({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });

    describe('ReportsPager tests', () => {
      const serviceUrl = securityAndComplianceCenterApiServiceOptions.url;
      const path = '/reports';
      const mockPagerResponse1 =
        '{"next":{"href":"https://myhost.com/somePath?start=1"},"reports":[{"id":"44a5-a292-32114fa73558","group_id":"55b6-b3A4-432250b84669","created_on":"2022-08-15T12:30:01Z","scan_time":"2022-08-15T12:30:01Z","type":"scheduled","cos_object":"crn:v1:bluemix:public:cloud-object-storage:global:a/531fc3e28bfc43c5a2cea07786d93f5c:1a0ec336-f391-4091-a6fb-5e084a4c56f4:bucket:b1a8f3da-49d2-4966-ae83-a8d02bc2aac7","instance_id":"84644a08-31b6-4988-b504-49a46ca69ccd","account":{"id":"531fc3e28bfc43c5a2cea07786d93f5c","name":"NIST","type":"account_type"},"profile":{"id":"44a5-a292-32114fa73558","name":"IBM FS Cloud","version":"0.1"},"attachment":{"id":"531fc3e28bfc43c5a2cea07786d93f5c","name":"resource group - Default","description":"Scoped to the Default resource group","schedule":"daily","scope":[{"id":"ca0941aa-b7e2-43a3-9794-1b3d322474d9","environment":"ibm-cloud","properties":[{"name":"scope_id","value":"18d32a4430e54c81a6668952609763b2"}]}]}}],"total_count":2,"limit":1}';
      const mockPagerResponse2 =
        '{"reports":[{"id":"44a5-a292-32114fa73558","group_id":"55b6-b3A4-432250b84669","created_on":"2022-08-15T12:30:01Z","scan_time":"2022-08-15T12:30:01Z","type":"scheduled","cos_object":"crn:v1:bluemix:public:cloud-object-storage:global:a/531fc3e28bfc43c5a2cea07786d93f5c:1a0ec336-f391-4091-a6fb-5e084a4c56f4:bucket:b1a8f3da-49d2-4966-ae83-a8d02bc2aac7","instance_id":"84644a08-31b6-4988-b504-49a46ca69ccd","account":{"id":"531fc3e28bfc43c5a2cea07786d93f5c","name":"NIST","type":"account_type"},"profile":{"id":"44a5-a292-32114fa73558","name":"IBM FS Cloud","version":"0.1"},"attachment":{"id":"531fc3e28bfc43c5a2cea07786d93f5c","name":"resource group - Default","description":"Scoped to the Default resource group","schedule":"daily","scope":[{"id":"ca0941aa-b7e2-43a3-9794-1b3d322474d9","environment":"ibm-cloud","properties":[{"name":"scope_id","value":"18d32a4430e54c81a6668952609763b2"}]}]}}],"total_count":2,"limit":1}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get(uri => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get(uri => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          xCorrelationId: 'testString',
          xRequestId: 'testString',
          attachmentId: 'testString',
          groupId: 'testString',
          profileId: 'testString',
          type: 'scheduled',
          limit: 10,
          sort: 'profile_name',
        };
        const allResults = [];
        const pager = new SecurityAndComplianceCenterApiV3.ReportsPager(securityAndComplianceCenterApiService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          xCorrelationId: 'testString',
          xRequestId: 'testString',
          attachmentId: 'testString',
          groupId: 'testString',
          profileId: 'testString',
          type: 'scheduled',
          limit: 10,
          sort: 'profile_name',
        };
        const pager = new SecurityAndComplianceCenterApiV3.ReportsPager(securityAndComplianceCenterApiService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('getReport', () => {
    describe('positive tests', () => {
      function __getReportTest() {
        // Construct the params object for operation getReport
        const reportId = 'testString';
        const xCorrelationId = 'testString';
        const xRequestId = 'testString';
        const getReportParams = {
          reportId,
          xCorrelationId,
          xRequestId,
        };

        const getReportResult = securityAndComplianceCenterApiService.getReport(getReportParams);

        // all methods should return a Promise
        expectToBePromise(getReportResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/reports/{report_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        checkUserHeader(createRequestMock, 'X-Request-ID', xRequestId);
        expect(mockRequestOptions.path.report_id).toEqual(reportId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getReportTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __getReportTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __getReportTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const reportId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getReportParams = {
          reportId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.getReport(getReportParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.getReport({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.getReport();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getReportSummary', () => {
    describe('positive tests', () => {
      function __getReportSummaryTest() {
        // Construct the params object for operation getReportSummary
        const reportId = 'testString';
        const xCorrelationId = 'testString';
        const xRequestId = 'testString';
        const getReportSummaryParams = {
          reportId,
          xCorrelationId,
          xRequestId,
        };

        const getReportSummaryResult = securityAndComplianceCenterApiService.getReportSummary(getReportSummaryParams);

        // all methods should return a Promise
        expectToBePromise(getReportSummaryResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/reports/{report_id}/summary', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        checkUserHeader(createRequestMock, 'X-Request-ID', xRequestId);
        expect(mockRequestOptions.path.report_id).toEqual(reportId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getReportSummaryTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __getReportSummaryTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __getReportSummaryTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const reportId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getReportSummaryParams = {
          reportId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.getReportSummary(getReportSummaryParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.getReportSummary({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.getReportSummary();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getReportEvaluation', () => {
    describe('positive tests', () => {
      function __getReportEvaluationTest() {
        // Construct the params object for operation getReportEvaluation
        const reportId = 'testString';
        const xCorrelationId = 'testString';
        const xRequestId = 'testString';
        const excludeSummary = true;
        const getReportEvaluationParams = {
          reportId,
          xCorrelationId,
          xRequestId,
          excludeSummary,
        };

        const getReportEvaluationResult = securityAndComplianceCenterApiService.getReportEvaluation(getReportEvaluationParams);

        // all methods should return a Promise
        expectToBePromise(getReportEvaluationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/reports/{report_id}/download', 'GET');
        const expectedAccept = 'application/csv';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        checkUserHeader(createRequestMock, 'X-Request-ID', xRequestId);
        expect(mockRequestOptions.qs.exclude_summary).toEqual(excludeSummary);
        expect(mockRequestOptions.path.report_id).toEqual(reportId);
        expect(mockRequestOptions.responseType).toBe('stream');
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getReportEvaluationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __getReportEvaluationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __getReportEvaluationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const reportId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getReportEvaluationParams = {
          reportId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.getReportEvaluation(getReportEvaluationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.getReportEvaluation({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.getReportEvaluation();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getReportControls', () => {
    describe('positive tests', () => {
      function __getReportControlsTest() {
        // Construct the params object for operation getReportControls
        const reportId = 'testString';
        const xCorrelationId = 'testString';
        const xRequestId = 'testString';
        const controlId = 'testString';
        const controlName = 'testString';
        const controlDescription = 'testString';
        const controlCategory = 'testString';
        const status = 'compliant';
        const sort = 'control_name';
        const getReportControlsParams = {
          reportId,
          xCorrelationId,
          xRequestId,
          controlId,
          controlName,
          controlDescription,
          controlCategory,
          status,
          sort,
        };

        const getReportControlsResult = securityAndComplianceCenterApiService.getReportControls(getReportControlsParams);

        // all methods should return a Promise
        expectToBePromise(getReportControlsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/reports/{report_id}/controls', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        checkUserHeader(createRequestMock, 'X-Request-ID', xRequestId);
        expect(mockRequestOptions.qs.control_id).toEqual(controlId);
        expect(mockRequestOptions.qs.control_name).toEqual(controlName);
        expect(mockRequestOptions.qs.control_description).toEqual(controlDescription);
        expect(mockRequestOptions.qs.control_category).toEqual(controlCategory);
        expect(mockRequestOptions.qs.status).toEqual(status);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.path.report_id).toEqual(reportId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getReportControlsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __getReportControlsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __getReportControlsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const reportId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getReportControlsParams = {
          reportId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.getReportControls(getReportControlsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.getReportControls({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.getReportControls();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getReportRule', () => {
    describe('positive tests', () => {
      function __getReportRuleTest() {
        // Construct the params object for operation getReportRule
        const reportId = 'testString';
        const ruleId = 'rule-8d444f8c-fd1d-48de-bcaa-f43732568761';
        const xCorrelationId = 'testString';
        const xRequestId = 'testString';
        const getReportRuleParams = {
          reportId,
          ruleId,
          xCorrelationId,
          xRequestId,
        };

        const getReportRuleResult = securityAndComplianceCenterApiService.getReportRule(getReportRuleParams);

        // all methods should return a Promise
        expectToBePromise(getReportRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/reports/{report_id}/rules/{rule_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        checkUserHeader(createRequestMock, 'X-Request-ID', xRequestId);
        expect(mockRequestOptions.path.report_id).toEqual(reportId);
        expect(mockRequestOptions.path.rule_id).toEqual(ruleId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getReportRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __getReportRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __getReportRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const reportId = 'testString';
        const ruleId = 'rule-8d444f8c-fd1d-48de-bcaa-f43732568761';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getReportRuleParams = {
          reportId,
          ruleId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.getReportRule(getReportRuleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.getReportRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.getReportRule();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listReportEvaluations', () => {
    describe('positive tests', () => {
      function __listReportEvaluationsTest() {
        // Construct the params object for operation listReportEvaluations
        const reportId = 'testString';
        const xCorrelationId = 'testString';
        const xRequestId = 'testString';
        const assessmentId = 'testString';
        const componentId = 'testString';
        const targetId = 'testString';
        const targetName = 'testString';
        const status = 'failure';
        const start = 'testString';
        const limit = 50;
        const listReportEvaluationsParams = {
          reportId,
          xCorrelationId,
          xRequestId,
          assessmentId,
          componentId,
          targetId,
          targetName,
          status,
          start,
          limit,
        };

        const listReportEvaluationsResult = securityAndComplianceCenterApiService.listReportEvaluations(listReportEvaluationsParams);

        // all methods should return a Promise
        expectToBePromise(listReportEvaluationsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/reports/{report_id}/evaluations', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        checkUserHeader(createRequestMock, 'X-Request-ID', xRequestId);
        expect(mockRequestOptions.qs.assessment_id).toEqual(assessmentId);
        expect(mockRequestOptions.qs.component_id).toEqual(componentId);
        expect(mockRequestOptions.qs.target_id).toEqual(targetId);
        expect(mockRequestOptions.qs.target_name).toEqual(targetName);
        expect(mockRequestOptions.qs.status).toEqual(status);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.path.report_id).toEqual(reportId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listReportEvaluationsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __listReportEvaluationsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __listReportEvaluationsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const reportId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listReportEvaluationsParams = {
          reportId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.listReportEvaluations(listReportEvaluationsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.listReportEvaluations({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.listReportEvaluations();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('ReportEvaluationsPager tests', () => {
      const serviceUrl = securityAndComplianceCenterApiServiceOptions.url;
      const path = '/reports/testString/evaluations';
      const mockPagerResponse1 =
        '{"next":{"href":"https://myhost.com/somePath?start=1"},"evaluations":[{"home_account_id":"be200c80cabc456e91139e4152327456","report_id":"44a5-a292-32114fa73558","control_id":"28016c95-b389-447f-8a05-eabe1ad7fd24","component_id":"cloud-object_storage","assessment":{"assessment_id":"382c2b06-e6b2-43ee-b189-c1c7743b67ee","assessment_type":"ibm-cloud-rule","assessment_method":"ibm-cloud-rule","assessment_description":"Check whether Cloud Object Storage is accessible only by using private endpoints","parameter_count":1,"parameters":[{"parameter_name":"location","parameter_display_name":"Location","parameter_type":"string","parameter_value":"anyValue"}]},"evaluate_time":"2022-06-30T11:03:44.630150782Z","target":{"id":"crn:v1:bluemix:public:cloud-object-storage:global:a/59bcbfa6ea2f006b4ed7094c1a08dcdd:1a0ec336-f391-4091-a6fb-5e084a4c56f4:bucket:mybucket","account_id":"59bcbfa6ea2f006b4ed7094c1a08dcdd","resource_crn":"crn:v1:bluemix:public:cloud-object-storage:global:a/59bcbfa6ea2f006b4ed7094c1a08dcdd:1a0ec336-f391-4091-a6fb-5e084a4c56f4:bucket:mybucket","resource_name":"mybucket","service_name":"cloud-object-storage"},"status":"failure","reason":"One or more conditions in rule rule-7b0560a4-df94-4629-bb76-680f3155ddda were not met","details":{"properties":[{"property":"allowed_network","property_description":"A description for this property","operator":"string_equals","expected_value":"anyValue","found_value":"anyValue"}]}}],"total_count":2,"limit":1}';
      const mockPagerResponse2 =
        '{"evaluations":[{"home_account_id":"be200c80cabc456e91139e4152327456","report_id":"44a5-a292-32114fa73558","control_id":"28016c95-b389-447f-8a05-eabe1ad7fd24","component_id":"cloud-object_storage","assessment":{"assessment_id":"382c2b06-e6b2-43ee-b189-c1c7743b67ee","assessment_type":"ibm-cloud-rule","assessment_method":"ibm-cloud-rule","assessment_description":"Check whether Cloud Object Storage is accessible only by using private endpoints","parameter_count":1,"parameters":[{"parameter_name":"location","parameter_display_name":"Location","parameter_type":"string","parameter_value":"anyValue"}]},"evaluate_time":"2022-06-30T11:03:44.630150782Z","target":{"id":"crn:v1:bluemix:public:cloud-object-storage:global:a/59bcbfa6ea2f006b4ed7094c1a08dcdd:1a0ec336-f391-4091-a6fb-5e084a4c56f4:bucket:mybucket","account_id":"59bcbfa6ea2f006b4ed7094c1a08dcdd","resource_crn":"crn:v1:bluemix:public:cloud-object-storage:global:a/59bcbfa6ea2f006b4ed7094c1a08dcdd:1a0ec336-f391-4091-a6fb-5e084a4c56f4:bucket:mybucket","resource_name":"mybucket","service_name":"cloud-object-storage"},"status":"failure","reason":"One or more conditions in rule rule-7b0560a4-df94-4629-bb76-680f3155ddda were not met","details":{"properties":[{"property":"allowed_network","property_description":"A description for this property","operator":"string_equals","expected_value":"anyValue","found_value":"anyValue"}]}}],"total_count":2,"limit":1}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get(uri => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get(uri => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          reportId: 'testString',
          xCorrelationId: 'testString',
          xRequestId: 'testString',
          assessmentId: 'testString',
          componentId: 'testString',
          targetId: 'testString',
          targetName: 'testString',
          status: 'failure',
          limit: 10,
        };
        const allResults = [];
        const pager = new SecurityAndComplianceCenterApiV3.ReportEvaluationsPager(securityAndComplianceCenterApiService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          reportId: 'testString',
          xCorrelationId: 'testString',
          xRequestId: 'testString',
          assessmentId: 'testString',
          componentId: 'testString',
          targetId: 'testString',
          targetName: 'testString',
          status: 'failure',
          limit: 10,
        };
        const pager = new SecurityAndComplianceCenterApiV3.ReportEvaluationsPager(securityAndComplianceCenterApiService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('listReportResources', () => {
    describe('positive tests', () => {
      function __listReportResourcesTest() {
        // Construct the params object for operation listReportResources
        const reportId = 'testString';
        const xCorrelationId = 'testString';
        const xRequestId = 'testString';
        const id = 'testString';
        const resourceName = 'testString';
        const accountId = 'testString';
        const componentId = 'testString';
        const status = 'compliant';
        const sort = 'account_id';
        const start = 'testString';
        const limit = 50;
        const listReportResourcesParams = {
          reportId,
          xCorrelationId,
          xRequestId,
          id,
          resourceName,
          accountId,
          componentId,
          status,
          sort,
          start,
          limit,
        };

        const listReportResourcesResult = securityAndComplianceCenterApiService.listReportResources(listReportResourcesParams);

        // all methods should return a Promise
        expectToBePromise(listReportResourcesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/reports/{report_id}/resources', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        checkUserHeader(createRequestMock, 'X-Request-ID', xRequestId);
        expect(mockRequestOptions.qs.id).toEqual(id);
        expect(mockRequestOptions.qs.resource_name).toEqual(resourceName);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.qs.component_id).toEqual(componentId);
        expect(mockRequestOptions.qs.status).toEqual(status);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.path.report_id).toEqual(reportId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listReportResourcesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __listReportResourcesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __listReportResourcesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const reportId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listReportResourcesParams = {
          reportId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.listReportResources(listReportResourcesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.listReportResources({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.listReportResources();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('ReportResourcesPager tests', () => {
      const serviceUrl = securityAndComplianceCenterApiServiceOptions.url;
      const path = '/reports/testString/resources';
      const mockPagerResponse1 =
        '{"next":{"href":"https://myhost.com/somePath?start=1"},"total_count":2,"limit":1,"resources":[{"report_id":"30b434b3-cb08-4845-af10-7a8fc682b6a8","id":"crn:v1:bluemix:public:kms:us-south:a/5af747ca19a8a278b1b6e4eec20df507:03502a50-4ea9-463c-80e5-e27ed838cdb6::","resource_name":"jeff\'s key","component_id":"cloud-object_storage","environment":"ibm cloud","account":{"id":"531fc3e28bfc43c5a2cea07786d93f5c","name":"NIST","type":"account_type"},"status":"compliant","total_count":140,"pass_count":123,"failure_count":12,"error_count":5,"completed_count":135}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"resources":[{"report_id":"30b434b3-cb08-4845-af10-7a8fc682b6a8","id":"crn:v1:bluemix:public:kms:us-south:a/5af747ca19a8a278b1b6e4eec20df507:03502a50-4ea9-463c-80e5-e27ed838cdb6::","resource_name":"jeff\'s key","component_id":"cloud-object_storage","environment":"ibm cloud","account":{"id":"531fc3e28bfc43c5a2cea07786d93f5c","name":"NIST","type":"account_type"},"status":"compliant","total_count":140,"pass_count":123,"failure_count":12,"error_count":5,"completed_count":135}]}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get(uri => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get(uri => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          reportId: 'testString',
          xCorrelationId: 'testString',
          xRequestId: 'testString',
          id: 'testString',
          resourceName: 'testString',
          accountId: 'testString',
          componentId: 'testString',
          status: 'compliant',
          sort: 'account_id',
          limit: 10,
        };
        const allResults = [];
        const pager = new SecurityAndComplianceCenterApiV3.ReportResourcesPager(securityAndComplianceCenterApiService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          reportId: 'testString',
          xCorrelationId: 'testString',
          xRequestId: 'testString',
          id: 'testString',
          resourceName: 'testString',
          accountId: 'testString',
          componentId: 'testString',
          status: 'compliant',
          sort: 'account_id',
          limit: 10,
        };
        const pager = new SecurityAndComplianceCenterApiV3.ReportResourcesPager(securityAndComplianceCenterApiService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('getReportTags', () => {
    describe('positive tests', () => {
      function __getReportTagsTest() {
        // Construct the params object for operation getReportTags
        const reportId = 'testString';
        const xCorrelationId = 'testString';
        const xRequestId = 'testString';
        const getReportTagsParams = {
          reportId,
          xCorrelationId,
          xRequestId,
        };

        const getReportTagsResult = securityAndComplianceCenterApiService.getReportTags(getReportTagsParams);

        // all methods should return a Promise
        expectToBePromise(getReportTagsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/reports/{report_id}/tags', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        checkUserHeader(createRequestMock, 'X-Request-ID', xRequestId);
        expect(mockRequestOptions.path.report_id).toEqual(reportId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getReportTagsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __getReportTagsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __getReportTagsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const reportId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getReportTagsParams = {
          reportId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.getReportTags(getReportTagsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.getReportTags({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.getReportTags();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getReportViolationsDrift', () => {
    describe('positive tests', () => {
      function __getReportViolationsDriftTest() {
        // Construct the params object for operation getReportViolationsDrift
        const reportId = 'testString';
        const xCorrelationId = 'testString';
        const xRequestId = 'testString';
        const scanTimeDuration = 0;
        const getReportViolationsDriftParams = {
          reportId,
          xCorrelationId,
          xRequestId,
          scanTimeDuration,
        };

        const getReportViolationsDriftResult = securityAndComplianceCenterApiService.getReportViolationsDrift(getReportViolationsDriftParams);

        // all methods should return a Promise
        expectToBePromise(getReportViolationsDriftResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/reports/{report_id}/violations_drift', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        checkUserHeader(createRequestMock, 'X-Request-ID', xRequestId);
        expect(mockRequestOptions.qs.scan_time_duration).toEqual(scanTimeDuration);
        expect(mockRequestOptions.path.report_id).toEqual(reportId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getReportViolationsDriftTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __getReportViolationsDriftTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __getReportViolationsDriftTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const reportId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getReportViolationsDriftParams = {
          reportId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.getReportViolationsDrift(getReportViolationsDriftParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.getReportViolationsDrift({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.getReportViolationsDrift();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listProviderTypes', () => {
    describe('positive tests', () => {
      function __listProviderTypesTest() {
        // Construct the params object for operation listProviderTypes
        const xCorrelationId = 'testString';
        const xRequestId = 'testString';
        const listProviderTypesParams = {
          xCorrelationId,
          xRequestId,
        };

        const listProviderTypesResult = securityAndComplianceCenterApiService.listProviderTypes(listProviderTypesParams);

        // all methods should return a Promise
        expectToBePromise(listProviderTypesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/provider_types', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        checkUserHeader(createRequestMock, 'X-Request-ID', xRequestId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listProviderTypesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __listProviderTypesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __listProviderTypesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listProviderTypesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.listProviderTypes(listProviderTypesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        securityAndComplianceCenterApiService.listProviderTypes({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getProviderTypeById', () => {
    describe('positive tests', () => {
      function __getProviderTypeByIdTest() {
        // Construct the params object for operation getProviderTypeById
        const providerTypeId = 'testString';
        const xCorrelationId = 'testString';
        const xRequestId = 'testString';
        const getProviderTypeByIdParams = {
          providerTypeId,
          xCorrelationId,
          xRequestId,
        };

        const getProviderTypeByIdResult = securityAndComplianceCenterApiService.getProviderTypeById(getProviderTypeByIdParams);

        // all methods should return a Promise
        expectToBePromise(getProviderTypeByIdResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/provider_types/{provider_type_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        checkUserHeader(createRequestMock, 'X-Request-ID', xRequestId);
        expect(mockRequestOptions.path.provider_type_id).toEqual(providerTypeId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getProviderTypeByIdTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __getProviderTypeByIdTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __getProviderTypeByIdTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const providerTypeId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getProviderTypeByIdParams = {
          providerTypeId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.getProviderTypeById(getProviderTypeByIdParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.getProviderTypeById({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.getProviderTypeById();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listProviderTypeInstances', () => {
    describe('positive tests', () => {
      function __listProviderTypeInstancesTest() {
        // Construct the params object for operation listProviderTypeInstances
        const providerTypeId = 'testString';
        const xCorrelationId = 'testString';
        const xRequestId = 'testString';
        const listProviderTypeInstancesParams = {
          providerTypeId,
          xCorrelationId,
          xRequestId,
        };

        const listProviderTypeInstancesResult = securityAndComplianceCenterApiService.listProviderTypeInstances(listProviderTypeInstancesParams);

        // all methods should return a Promise
        expectToBePromise(listProviderTypeInstancesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/provider_types/{provider_type_id}/provider_type_instances', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        checkUserHeader(createRequestMock, 'X-Request-ID', xRequestId);
        expect(mockRequestOptions.path.provider_type_id).toEqual(providerTypeId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listProviderTypeInstancesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __listProviderTypeInstancesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __listProviderTypeInstancesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const providerTypeId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listProviderTypeInstancesParams = {
          providerTypeId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.listProviderTypeInstances(listProviderTypeInstancesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.listProviderTypeInstances({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.listProviderTypeInstances();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createProviderTypeInstance', () => {
    describe('positive tests', () => {
      function __createProviderTypeInstanceTest() {
        // Construct the params object for operation createProviderTypeInstance
        const providerTypeId = 'testString';
        const name = 'workload-protection-instance-1';
        const attributes = { anyKey: 'anyValue' };
        const xCorrelationId = 'testString';
        const xRequestId = 'testString';
        const createProviderTypeInstanceParams = {
          providerTypeId,
          name,
          attributes,
          xCorrelationId,
          xRequestId,
        };

        const createProviderTypeInstanceResult = securityAndComplianceCenterApiService.createProviderTypeInstance(createProviderTypeInstanceParams);

        // all methods should return a Promise
        expectToBePromise(createProviderTypeInstanceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/provider_types/{provider_type_id}/provider_type_instances', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        checkUserHeader(createRequestMock, 'X-Request-ID', xRequestId);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.attributes).toEqual(attributes);
        expect(mockRequestOptions.path.provider_type_id).toEqual(providerTypeId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createProviderTypeInstanceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __createProviderTypeInstanceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __createProviderTypeInstanceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const providerTypeId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createProviderTypeInstanceParams = {
          providerTypeId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.createProviderTypeInstance(createProviderTypeInstanceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.createProviderTypeInstance({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.createProviderTypeInstance();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteProviderTypeInstance', () => {
    describe('positive tests', () => {
      function __deleteProviderTypeInstanceTest() {
        // Construct the params object for operation deleteProviderTypeInstance
        const providerTypeId = 'testString';
        const providerTypeInstanceId = 'testString';
        const xCorrelationId = 'testString';
        const xRequestId = 'testString';
        const deleteProviderTypeInstanceParams = {
          providerTypeId,
          providerTypeInstanceId,
          xCorrelationId,
          xRequestId,
        };

        const deleteProviderTypeInstanceResult = securityAndComplianceCenterApiService.deleteProviderTypeInstance(deleteProviderTypeInstanceParams);

        // all methods should return a Promise
        expectToBePromise(deleteProviderTypeInstanceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/provider_types/{provider_type_id}/provider_type_instances/{provider_type_instance_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        checkUserHeader(createRequestMock, 'X-Request-ID', xRequestId);
        expect(mockRequestOptions.path.provider_type_id).toEqual(providerTypeId);
        expect(mockRequestOptions.path.provider_type_instance_id).toEqual(providerTypeInstanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteProviderTypeInstanceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __deleteProviderTypeInstanceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __deleteProviderTypeInstanceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const providerTypeId = 'testString';
        const providerTypeInstanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteProviderTypeInstanceParams = {
          providerTypeId,
          providerTypeInstanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.deleteProviderTypeInstance(deleteProviderTypeInstanceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.deleteProviderTypeInstance({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.deleteProviderTypeInstance();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getProviderTypeInstance', () => {
    describe('positive tests', () => {
      function __getProviderTypeInstanceTest() {
        // Construct the params object for operation getProviderTypeInstance
        const providerTypeId = 'testString';
        const providerTypeInstanceId = 'testString';
        const xCorrelationId = 'testString';
        const xRequestId = 'testString';
        const getProviderTypeInstanceParams = {
          providerTypeId,
          providerTypeInstanceId,
          xCorrelationId,
          xRequestId,
        };

        const getProviderTypeInstanceResult = securityAndComplianceCenterApiService.getProviderTypeInstance(getProviderTypeInstanceParams);

        // all methods should return a Promise
        expectToBePromise(getProviderTypeInstanceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/provider_types/{provider_type_id}/provider_type_instances/{provider_type_instance_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        checkUserHeader(createRequestMock, 'X-Request-ID', xRequestId);
        expect(mockRequestOptions.path.provider_type_id).toEqual(providerTypeId);
        expect(mockRequestOptions.path.provider_type_instance_id).toEqual(providerTypeInstanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getProviderTypeInstanceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __getProviderTypeInstanceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __getProviderTypeInstanceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const providerTypeId = 'testString';
        const providerTypeInstanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getProviderTypeInstanceParams = {
          providerTypeId,
          providerTypeInstanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.getProviderTypeInstance(getProviderTypeInstanceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.getProviderTypeInstance({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.getProviderTypeInstance();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateProviderTypeInstance', () => {
    describe('positive tests', () => {
      function __updateProviderTypeInstanceTest() {
        // Construct the params object for operation updateProviderTypeInstance
        const providerTypeId = 'testString';
        const providerTypeInstanceId = 'testString';
        const name = 'workload-protection-instance-1';
        const attributes = { anyKey: 'anyValue' };
        const xCorrelationId = 'testString';
        const xRequestId = 'testString';
        const updateProviderTypeInstanceParams = {
          providerTypeId,
          providerTypeInstanceId,
          name,
          attributes,
          xCorrelationId,
          xRequestId,
        };

        const updateProviderTypeInstanceResult = securityAndComplianceCenterApiService.updateProviderTypeInstance(updateProviderTypeInstanceParams);

        // all methods should return a Promise
        expectToBePromise(updateProviderTypeInstanceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/provider_types/{provider_type_id}/provider_type_instances/{provider_type_instance_id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        checkUserHeader(createRequestMock, 'X-Request-ID', xRequestId);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.attributes).toEqual(attributes);
        expect(mockRequestOptions.path.provider_type_id).toEqual(providerTypeId);
        expect(mockRequestOptions.path.provider_type_instance_id).toEqual(providerTypeInstanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateProviderTypeInstanceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __updateProviderTypeInstanceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __updateProviderTypeInstanceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const providerTypeId = 'testString';
        const providerTypeInstanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateProviderTypeInstanceParams = {
          providerTypeId,
          providerTypeInstanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.updateProviderTypeInstance(updateProviderTypeInstanceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.updateProviderTypeInstance({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.updateProviderTypeInstance();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getProviderTypesInstances', () => {
    describe('positive tests', () => {
      function __getProviderTypesInstancesTest() {
        // Construct the params object for operation getProviderTypesInstances
        const xCorrelationId = 'testString';
        const xRequestId = 'testString';
        const getProviderTypesInstancesParams = {
          xCorrelationId,
          xRequestId,
        };

        const getProviderTypesInstancesResult = securityAndComplianceCenterApiService.getProviderTypesInstances(getProviderTypesInstancesParams);

        // all methods should return a Promise
        expectToBePromise(getProviderTypesInstancesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/provider_types_instances', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        checkUserHeader(createRequestMock, 'X-Request-ID', xRequestId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getProviderTypesInstancesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __getProviderTypesInstancesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __getProviderTypesInstancesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getProviderTypesInstancesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.getProviderTypesInstances(getProviderTypesInstancesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        securityAndComplianceCenterApiService.getProviderTypesInstances({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
});
