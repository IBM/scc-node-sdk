/**
 * (C) Copyright IBM Corp. 2025.
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

/* eslint-disable no-await-in-loop */

const nock = require('nock');

// need to import the whole package to mock getAuthenticatorFromEnvironment
const sdkCorePackage = require('ibm-cloud-sdk-core');

const { NoAuthAuthenticator } = sdkCorePackage;
const SecurityAndComplianceCenterApiV3 = require('../../dist/security-and-compliance-center-api/v3');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
  checkForSuccessfulExecution,
} = require('@ibm-cloud/sdk-test-utilities');

const securityAndComplianceCenterApiServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://us-south.compliance.cloud.ibm.com',
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

  describe('getServiceUrlForRegion', () => {
    test('should return undefined for invalid region', () => {
      expect(SecurityAndComplianceCenterApiV3.getServiceUrlForRegion('INVALID_REGION')).toBeFalsy();
    });
    test('should return valid service url', () => {
      expect(SecurityAndComplianceCenterApiV3.getServiceUrlForRegion('us-south')).toBe('https://us-south.compliance.cloud.ibm.com');      
      expect(SecurityAndComplianceCenterApiV3.getServiceUrlForRegion('eu-de')).toBe('https://eu-de.compliance.cloud.ibm.com');      
      expect(SecurityAndComplianceCenterApiV3.getServiceUrlForRegion('eu-fr2')).toBe('https://eu-fr2.compliance.cloud.ibm.com');      
      expect(SecurityAndComplianceCenterApiV3.getServiceUrlForRegion('ca-tor')).toBe('https://ca-tor.compliance.cloud.ibm.com');      
      expect(SecurityAndComplianceCenterApiV3.getServiceUrlForRegion('au-syd')).toBe('https://au-syd.compliance.cloud.ibm.com');      
      expect(SecurityAndComplianceCenterApiV3.getServiceUrlForRegion('eu-es')).toBe('https://eu-es.compliance.cloud.ibm.com');      
    });
  });

  describe('getSettings', () => {
    describe('positive tests', () => {
      function __getSettingsTest() {
        // Construct the params object for operation getSettings
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const getSettingsParams = {
          instanceId,
        };

        const getSettingsResult = securityAndComplianceCenterApiService.getSettings(getSettingsParams);

        // all methods should return a Promise
        expectToBePromise(getSettingsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/settings', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getSettingsParams = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.getSettings(getSettingsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.getSettings({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.getSettings();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateSettings', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ObjectStoragePrototype
      const objectStoragePrototypeModel = {
        bucket: 'px-scan-results',
        instance_crn: 'crn:v1:staging:public:cloud-object-storage:global:a/ff88f007f9ff4622aac4fbc0eda36255:7199ae60-a214-4dd8-9bf7-ce571de49d01::',
      };

      // EventNotificationsPrototype
      const eventNotificationsPrototypeModel = {
        instance_crn: 'crn:v1:staging:public:event-notifications:us-south:a/ff88f007f9ff4622aac4fbc0eda36255:b8b07245-0bbe-4478-b11c-0dce523105fd::',
        source_description: 'This source is used for integration with IBM Cloud Security and Compliance Center.',
        source_name: 'scc-sdk-integration',
      };

      function __updateSettingsTest() {
        // Construct the params object for operation updateSettings
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const objectStorage = objectStoragePrototypeModel;
        const eventNotifications = eventNotificationsPrototypeModel;
        const updateSettingsParams = {
          instanceId,
          objectStorage,
          eventNotifications,
        };

        const updateSettingsResult = securityAndComplianceCenterApiService.updateSettings(updateSettingsParams);

        // all methods should return a Promise
        expectToBePromise(updateSettingsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/settings', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.object_storage).toEqual(objectStorage);
        expect(mockRequestOptions.body.event_notifications).toEqual(eventNotifications);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateSettingsParams = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.updateSettings(updateSettingsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.updateSettings({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.updateSettings();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('postTestEvent', () => {
    describe('positive tests', () => {
      function __postTestEventTest() {
        // Construct the params object for operation postTestEvent
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const postTestEventParams = {
          instanceId,
        };

        const postTestEventResult = securityAndComplianceCenterApiService.postTestEvent(postTestEventParams);

        // all methods should return a Promise
        expectToBePromise(postTestEventResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/test_event', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const postTestEventParams = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.postTestEvent(postTestEventParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.postTestEvent({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.postTestEvent();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listInstanceAttachments', () => {
    describe('positive tests', () => {
      function __listInstanceAttachmentsTest() {
        // Construct the params object for operation listInstanceAttachments
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const accountId = 'testString';
        const versionGroupLabel = '6702d85a-6437-4d6f-8701-c0146648787b';
        const limit = 25;
        const sort = 'created_on';
        const direction = 'desc';
        const start = 'testString';
        const listInstanceAttachmentsParams = {
          instanceId,
          accountId,
          versionGroupLabel,
          limit,
          sort,
          direction,
          start,
        };

        const listInstanceAttachmentsResult = securityAndComplianceCenterApiService.listInstanceAttachments(listInstanceAttachmentsParams);

        // all methods should return a Promise
        expectToBePromise(listInstanceAttachmentsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/attachments', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.qs.version_group_label).toEqual(versionGroupLabel);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.qs.direction).toEqual(direction);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listInstanceAttachmentsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __listInstanceAttachmentsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __listInstanceAttachmentsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listInstanceAttachmentsParams = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.listInstanceAttachments(listInstanceAttachmentsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.listInstanceAttachments({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.listInstanceAttachments();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('InstanceAttachmentsPager tests', () => {
      const serviceUrl = securityAndComplianceCenterApiServiceOptions.url;
      const path = '/instances/acd7032c-15a3-484f-bf5b-67d41534d940/v3/attachments';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"attachments":[{"attachment_parameters":[{"assessment_type":"assessment_type","assessment_id":"assessment_id","parameter_name":"location","parameter_display_name":"Location","parameter_type":"string","parameter_value":"anyValue"}],"description":"description","name":"name","notifications":{"enabled":false,"controls":{"threshold_limit":15,"failed_control_ids":["failed_control_ids"]}},"schedule":"daily","scope":[{"id":"id"}],"status":"enabled","data_selection_range":{"start_date":"2025-02-28T05:42:58.000Z","end_date":"2025-02-28T05:42:58.000Z"},"account_id":"account_id","created_by":"created_by","created_on":"2019-01-01T12:00:00.000Z","id":"id","instance_id":"instance_id","last_scan":{"id":"id","status":"status","time":"2019-01-01T12:00:00.000Z"},"next_scan_time":"2019-01-01T12:00:00.000Z","profile_id":"profile_id","updated_by":"updated_by","updated_on":"2019-01-01T12:00:00.000Z"}],"total_count":2,"limit":1}';
      const mockPagerResponse2 =
        '{"attachments":[{"attachment_parameters":[{"assessment_type":"assessment_type","assessment_id":"assessment_id","parameter_name":"location","parameter_display_name":"Location","parameter_type":"string","parameter_value":"anyValue"}],"description":"description","name":"name","notifications":{"enabled":false,"controls":{"threshold_limit":15,"failed_control_ids":["failed_control_ids"]}},"schedule":"daily","scope":[{"id":"id"}],"status":"enabled","data_selection_range":{"start_date":"2025-02-28T05:42:58.000Z","end_date":"2025-02-28T05:42:58.000Z"},"account_id":"account_id","created_by":"created_by","created_on":"2019-01-01T12:00:00.000Z","id":"id","instance_id":"instance_id","last_scan":{"id":"id","status":"status","time":"2019-01-01T12:00:00.000Z"},"next_scan_time":"2019-01-01T12:00:00.000Z","profile_id":"profile_id","updated_by":"updated_by","updated_on":"2019-01-01T12:00:00.000Z"}],"total_count":2,"limit":1}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
          accountId: 'testString',
          versionGroupLabel: '6702d85a-6437-4d6f-8701-c0146648787b',
          limit: 10,
          sort: 'created_on',
          direction: 'desc',
        };
        const allResults = [];
        const pager = new SecurityAndComplianceCenterApiV3.InstanceAttachmentsPager(securityAndComplianceCenterApiService, params);
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
          instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
          accountId: 'testString',
          versionGroupLabel: '6702d85a-6437-4d6f-8701-c0146648787b',
          limit: 10,
          sort: 'created_on',
          direction: 'desc',
        };
        const pager = new SecurityAndComplianceCenterApiV3.InstanceAttachmentsPager(securityAndComplianceCenterApiService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('createProfileAttachment', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Parameter
      const parameterModel = {
        assessment_type: 'automated',
        assessment_id: 'rule-e16fcfea-fe21-4d30-a721-423611481fea',
        parameter_name: 'tls_version',
        parameter_display_name: 'IBM Cloud Internet Services TLS version',
        parameter_type: 'string_list',
        parameter_value: '["1.2", "1.3"]',
      };

      // AttachmentNotificationsControls
      const attachmentNotificationsControlsModel = {
        threshold_limit: 15,
        failed_control_ids: [],
      };

      // AttachmentNotifications
      const attachmentNotificationsModel = {
        enabled: true,
        controls: attachmentNotificationsControlsModel,
      };

      // MultiCloudScopePayloadById
      const multiCloudScopePayloadModel = {
        id: '8baad3b5-2e69-4027-9967-efac19508e1c',
      };

      // DateRange
      const dateRangeModel = {
        start_date: '2025-02-28T05:42:58.000Z',
        end_date: '2025-02-28T05:42:58.000Z',
      };

      // ProfileAttachmentBase
      const profileAttachmentBaseModel = {
        attachment_parameters: [parameterModel],
        description: 'This is a profile attachment targeting IBM CIS Foundation using a SDK',
        name: 'Profile Attachment for IBM CIS Foundation SDK test',
        notifications: attachmentNotificationsModel,
        schedule: 'daily',
        scope: [multiCloudScopePayloadModel],
        status: 'disabled',
        data_selection_range: dateRangeModel,
      };

      function __createProfileAttachmentTest() {
        // Construct the params object for operation createProfileAttachment
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const profileId = '9c265b4a-4cdf-47f1-acd3-17b5808f7f3f';
        const newAttachments = [profileAttachmentBaseModel];
        const newProfileId = '9c265b4a-4cdf-47f1-acd3-17b5808f7f3';
        const accountId = 'testString';
        const createProfileAttachmentParams = {
          instanceId,
          profileId,
          newAttachments,
          newProfileId,
          accountId,
        };

        const createProfileAttachmentResult = securityAndComplianceCenterApiService.createProfileAttachment(createProfileAttachmentParams);

        // all methods should return a Promise
        expectToBePromise(createProfileAttachmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/profiles/{profile_id}/attachments', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.attachments).toEqual(newAttachments);
        expect(mockRequestOptions.body.profile_id).toEqual(newProfileId);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.profile_id).toEqual(profileId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createProfileAttachmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __createProfileAttachmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __createProfileAttachmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const profileId = '9c265b4a-4cdf-47f1-acd3-17b5808f7f3f';
        const newAttachments = [profileAttachmentBaseModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createProfileAttachmentParams = {
          instanceId,
          profileId,
          newAttachments,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.createProfileAttachment(createProfileAttachmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.createProfileAttachment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.createProfileAttachment();
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const profileId = '9c265b4a-4cdf-47f1-acd3-17b5808f7f3f';
        const attachmentId = 'testString';
        const accountId = 'testString';
        const getProfileAttachmentParams = {
          instanceId,
          profileId,
          attachmentId,
          accountId,
        };

        const getProfileAttachmentResult = securityAndComplianceCenterApiService.getProfileAttachment(getProfileAttachmentParams);

        // all methods should return a Promise
        expectToBePromise(getProfileAttachmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/profiles/{profile_id}/attachments/{attachment_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.profile_id).toEqual(profileId);
        expect(mockRequestOptions.path.attachment_id).toEqual(attachmentId);
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const profileId = '9c265b4a-4cdf-47f1-acd3-17b5808f7f3f';
        const attachmentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getProfileAttachmentParams = {
          instanceId,
          profileId,
          attachmentId,
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

      // Parameter
      const parameterModel = {
        assessment_type: 'testString',
        assessment_id: 'testString',
        parameter_name: 'location',
        parameter_display_name: 'Location',
        parameter_type: 'string',
        parameter_value: 'testString',
      };

      // AttachmentNotificationsControls
      const attachmentNotificationsControlsModel = {
        threshold_limit: 15,
        failed_control_ids: ['testString'],
      };

      // AttachmentNotifications
      const attachmentNotificationsModel = {
        enabled: true,
        controls: attachmentNotificationsControlsModel,
      };

      // MultiCloudScopePayloadById
      const multiCloudScopePayloadModel = {
        id: 'testString',
      };

      // DateRange
      const dateRangeModel = {
        start_date: '2025-02-28T05:42:58.000Z',
        end_date: '2025-02-28T05:42:58.000Z',
      };

      function __replaceProfileAttachmentTest() {
        // Construct the params object for operation replaceProfileAttachment
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const profileId = '9c265b4a-4cdf-47f1-acd3-17b5808f7f3f';
        const attachmentId = 'testString';
        const attachmentParameters = [parameterModel];
        const description = 'testString';
        const name = 'testString';
        const notifications = attachmentNotificationsModel;
        const schedule = 'daily';
        const scope = [multiCloudScopePayloadModel];
        const status = 'enabled';
        const dataSelectionRange = dateRangeModel;
        const accountId = 'testString';
        const replaceProfileAttachmentParams = {
          instanceId,
          profileId,
          attachmentId,
          attachmentParameters,
          description,
          name,
          notifications,
          schedule,
          scope,
          status,
          dataSelectionRange,
          accountId,
        };

        const replaceProfileAttachmentResult = securityAndComplianceCenterApiService.replaceProfileAttachment(replaceProfileAttachmentParams);

        // all methods should return a Promise
        expectToBePromise(replaceProfileAttachmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/profiles/{profile_id}/attachments/{attachment_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.attachment_parameters).toEqual(attachmentParameters);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.notifications).toEqual(notifications);
        expect(mockRequestOptions.body.schedule).toEqual(schedule);
        expect(mockRequestOptions.body.scope).toEqual(scope);
        expect(mockRequestOptions.body.status).toEqual(status);
        expect(mockRequestOptions.body.data_selection_range).toEqual(dataSelectionRange);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.profile_id).toEqual(profileId);
        expect(mockRequestOptions.path.attachment_id).toEqual(attachmentId);
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const profileId = '9c265b4a-4cdf-47f1-acd3-17b5808f7f3f';
        const attachmentId = 'testString';
        const attachmentParameters = [parameterModel];
        const description = 'testString';
        const name = 'testString';
        const notifications = attachmentNotificationsModel;
        const schedule = 'daily';
        const scope = [multiCloudScopePayloadModel];
        const status = 'enabled';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceProfileAttachmentParams = {
          instanceId,
          profileId,
          attachmentId,
          attachmentParameters,
          description,
          name,
          notifications,
          schedule,
          scope,
          status,
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

  describe('deleteProfileAttachment', () => {
    describe('positive tests', () => {
      function __deleteProfileAttachmentTest() {
        // Construct the params object for operation deleteProfileAttachment
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const profileId = '9c265b4a-4cdf-47f1-acd3-17b5808f7f3f';
        const attachmentId = 'testString';
        const accountId = 'testString';
        const deleteProfileAttachmentParams = {
          instanceId,
          profileId,
          attachmentId,
          accountId,
        };

        const deleteProfileAttachmentResult = securityAndComplianceCenterApiService.deleteProfileAttachment(deleteProfileAttachmentParams);

        // all methods should return a Promise
        expectToBePromise(deleteProfileAttachmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/profiles/{profile_id}/attachments/{attachment_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.profile_id).toEqual(profileId);
        expect(mockRequestOptions.path.attachment_id).toEqual(attachmentId);
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const profileId = '9c265b4a-4cdf-47f1-acd3-17b5808f7f3f';
        const attachmentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteProfileAttachmentParams = {
          instanceId,
          profileId,
          attachmentId,
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

  describe('upgradeAttachment', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Parameter
      const parameterModel = {
        assessment_type: 'testString',
        assessment_id: 'testString',
        parameter_name: 'location',
        parameter_display_name: 'Location',
        parameter_type: 'string',
        parameter_value: 'testString',
      };

      function __upgradeAttachmentTest() {
        // Construct the params object for operation upgradeAttachment
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const profileId = '9c265b4a-4cdf-47f1-acd3-17b5808f7f3f';
        const attachmentId = 'testString';
        const attachmentParameters = [parameterModel];
        const accountId = 'testString';
        const upgradeAttachmentParams = {
          instanceId,
          profileId,
          attachmentId,
          attachmentParameters,
          accountId,
        };

        const upgradeAttachmentResult = securityAndComplianceCenterApiService.upgradeAttachment(upgradeAttachmentParams);

        // all methods should return a Promise
        expectToBePromise(upgradeAttachmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/profiles/{profile_id}/attachments/{attachment_id}/upgrade', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.attachment_parameters).toEqual(attachmentParameters);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.profile_id).toEqual(profileId);
        expect(mockRequestOptions.path.attachment_id).toEqual(attachmentId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __upgradeAttachmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __upgradeAttachmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __upgradeAttachmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const profileId = '9c265b4a-4cdf-47f1-acd3-17b5808f7f3f';
        const attachmentId = 'testString';
        const attachmentParameters = [parameterModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const upgradeAttachmentParams = {
          instanceId,
          profileId,
          attachmentId,
          attachmentParameters,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.upgradeAttachment(upgradeAttachmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.upgradeAttachment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.upgradeAttachment();
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const attachmentId = '4deb572c-9f37-4126-9cc0-d550672533cb';
        const accountId = 'testString';
        const createScanParams = {
          instanceId,
          attachmentId,
          accountId,
        };

        const createScanResult = securityAndComplianceCenterApiService.createScan(createScanParams);

        // all methods should return a Promise
        expectToBePromise(createScanResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/scans', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.attachment_id).toEqual(attachmentId);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createScanParams = {
          instanceId,
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

  describe('createControlLibrary', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // AssessmentPrototype
      const assessmentPrototypeModel = {
        assessment_id: 'rule-d1bd9f3f-bee1-46c5-9533-da8bba9eed4e',
        assessment_description: 'This rule will check on regulation',
      };

      // ControlSpecificationPrototype
      const controlSpecificationPrototypeModel = {
        component_id: 'apprapp',
        environment: 'ibm-cloud',
        control_specification_id: 'testString',
        control_specification_description: 'This field is used to describe a control specification',
        assessments: [assessmentPrototypeModel],
      };

      // ControlDoc
      const controlDocModel = {
        control_docs_id: 'testString',
        control_docs_type: 'testString',
      };

      // ControlPrototype
      const controlPrototypeModel = {
        control_name: 'security',
        control_description: 'This is a description of a control',
        control_category: 'test-control',
        control_requirement: true,
        control_parent: 'testString',
        control_specifications: [controlSpecificationPrototypeModel],
        control_docs: controlDocModel,
        status: 'disabled',
      };

      function __createControlLibraryTest() {
        // Construct the params object for operation createControlLibrary
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const controlLibraryName = 'custom control library from SDK';
        const controlLibraryDescription = 'This is a custom control library made from the SDK test framework';
        const controlLibraryType = 'custom';
        const controlLibraryVersion = '0.0.1';
        const controls = [controlPrototypeModel];
        const accountId = 'testString';
        const createControlLibraryParams = {
          instanceId,
          controlLibraryName,
          controlLibraryDescription,
          controlLibraryType,
          controlLibraryVersion,
          controls,
          accountId,
        };

        const createControlLibraryResult = securityAndComplianceCenterApiService.createControlLibrary(createControlLibraryParams);

        // all methods should return a Promise
        expectToBePromise(createControlLibraryResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/control_libraries', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.control_library_name).toEqual(controlLibraryName);
        expect(mockRequestOptions.body.control_library_description).toEqual(controlLibraryDescription);
        expect(mockRequestOptions.body.control_library_type).toEqual(controlLibraryType);
        expect(mockRequestOptions.body.control_library_version).toEqual(controlLibraryVersion);
        expect(mockRequestOptions.body.controls).toEqual(controls);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createControlLibraryTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __createControlLibraryTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __createControlLibraryTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const controlLibraryName = 'custom control library from SDK';
        const controlLibraryDescription = 'This is a custom control library made from the SDK test framework';
        const controlLibraryType = 'custom';
        const controlLibraryVersion = '0.0.1';
        const controls = [controlPrototypeModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createControlLibraryParams = {
          instanceId,
          controlLibraryName,
          controlLibraryDescription,
          controlLibraryType,
          controlLibraryVersion,
          controls,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.createControlLibrary(createControlLibraryParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.createControlLibrary({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.createControlLibrary();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listControlLibraries', () => {
    describe('positive tests', () => {
      function __listControlLibrariesTest() {
        // Construct the params object for operation listControlLibraries
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const accountId = 'testString';
        const limit = 50;
        const start = 'testString';
        const listControlLibrariesParams = {
          instanceId,
          accountId,
          limit,
          start,
        };

        const listControlLibrariesResult = securityAndComplianceCenterApiService.listControlLibraries(listControlLibrariesParams);

        // all methods should return a Promise
        expectToBePromise(listControlLibrariesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/control_libraries', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listControlLibrariesParams = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.listControlLibraries(listControlLibrariesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.listControlLibraries({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.listControlLibraries();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('ControlLibrariesPager tests', () => {
      const serviceUrl = securityAndComplianceCenterApiServiceOptions.url;
      const path = '/instances/acd7032c-15a3-484f-bf5b-67d41534d940/v3/control_libraries';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"control_libraries":[{"control_library_name":"control_library_name","control_library_description":"control_library_description","control_library_type":"custom","control_library_version":"control_library_version","controls":[{"control_name":"control_name","control_id":"control_id","control_description":"control_description","control_category":"control_category","control_parent":"control_parent","control_severity":"control_severity","control_tags":["control_tags"],"control_specifications":[{"id":"id","responsibility":"responsibility","component_id":"component_id","component_name":"component_name","component_type":"component_type","environment":"environment","description":"description","assessments_count":17,"assessments":[{"assessment_id":"382c2b06-e6b2-43ee-b189-c1c7743b67ee","assessment_type":"ibm-cloud-rule","assessment_method":"ibm-cloud-rule","assessment_description":"Check whether Cloud Object Storage is accessible only by using private endpoints","parameter_count":1,"parameters":[{"assessment_type":"assessment_type","assessment_id":"assessment_id","parameter_name":"location","parameter_display_name":"Location","parameter_type":"string","parameter_value":"anyValue"}]}]}],"control_docs":{"control_docs_id":"control_docs_id","control_docs_type":"control_docs_type"},"status":"status"}],"id":"id","account_id":"account_id","version_group_label":"version_group_label","latest":true,"created_by":"created_by","created_on":"2019-01-01T12:00:00.000Z","updated_by":"updated_by","updated_on":"2019-01-01T12:00:00.000Z","hierarchy_enabled":false,"controls_count":14,"control_parents_count":21}],"total_count":2,"limit":1}';
      const mockPagerResponse2 =
        '{"control_libraries":[{"control_library_name":"control_library_name","control_library_description":"control_library_description","control_library_type":"custom","control_library_version":"control_library_version","controls":[{"control_name":"control_name","control_id":"control_id","control_description":"control_description","control_category":"control_category","control_parent":"control_parent","control_severity":"control_severity","control_tags":["control_tags"],"control_specifications":[{"id":"id","responsibility":"responsibility","component_id":"component_id","component_name":"component_name","component_type":"component_type","environment":"environment","description":"description","assessments_count":17,"assessments":[{"assessment_id":"382c2b06-e6b2-43ee-b189-c1c7743b67ee","assessment_type":"ibm-cloud-rule","assessment_method":"ibm-cloud-rule","assessment_description":"Check whether Cloud Object Storage is accessible only by using private endpoints","parameter_count":1,"parameters":[{"assessment_type":"assessment_type","assessment_id":"assessment_id","parameter_name":"location","parameter_display_name":"Location","parameter_type":"string","parameter_value":"anyValue"}]}]}],"control_docs":{"control_docs_id":"control_docs_id","control_docs_type":"control_docs_type"},"status":"status"}],"id":"id","account_id":"account_id","version_group_label":"version_group_label","latest":true,"created_by":"created_by","created_on":"2019-01-01T12:00:00.000Z","updated_by":"updated_by","updated_on":"2019-01-01T12:00:00.000Z","hierarchy_enabled":false,"controls_count":14,"control_parents_count":21}],"total_count":2,"limit":1}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
          accountId: 'testString',
          limit: 10,
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
          instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
          accountId: 'testString',
          limit: 10,
        };
        const pager = new SecurityAndComplianceCenterApiV3.ControlLibrariesPager(securityAndComplianceCenterApiService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('replaceCustomControlLibrary', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // AssessmentPrototype
      const assessmentPrototypeModel = {
        assessment_id: 'rule-d1bd9f3f-bee1-46c5-9533-da8bba9eed4e',
        assessment_description: 'This rule will check on regulation',
      };

      // ControlSpecificationPrototype
      const controlSpecificationPrototypeModel = {
        component_id: 'apprapp',
        environment: 'ibm-cloud',
        control_specification_id: 'testString',
        control_specification_description: 'This field is used to describe a control specification',
        assessments: [assessmentPrototypeModel],
      };

      // ControlDoc
      const controlDocModel = {
        control_docs_id: 'testString',
        control_docs_type: 'testString',
      };

      // ControlPrototype
      const controlPrototypeModel = {
        control_name: 'security',
        control_description: 'This is a description of a control',
        control_category: 'test-control',
        control_requirement: true,
        control_parent: 'testString',
        control_specifications: [controlSpecificationPrototypeModel],
        control_docs: controlDocModel,
        status: 'disabled',
      };

      function __replaceCustomControlLibraryTest() {
        // Construct the params object for operation replaceCustomControlLibrary
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const controlLibraryId = 'testString';
        const controlLibraryName = 'custom control library from SDK';
        const controlLibraryDescription = 'This is a custom control library made from the SDK test framework';
        const controlLibraryType = 'custom';
        const controlLibraryVersion = '0.0.2';
        const controls = [controlPrototypeModel];
        const bssAccount = 'testString';
        const replaceCustomControlLibraryParams = {
          instanceId,
          controlLibraryId,
          controlLibraryName,
          controlLibraryDescription,
          controlLibraryType,
          controlLibraryVersion,
          controls,
          bssAccount,
        };

        const replaceCustomControlLibraryResult = securityAndComplianceCenterApiService.replaceCustomControlLibrary(replaceCustomControlLibraryParams);

        // all methods should return a Promise
        expectToBePromise(replaceCustomControlLibraryResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/control_libraries/{control_library_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.control_library_name).toEqual(controlLibraryName);
        expect(mockRequestOptions.body.control_library_description).toEqual(controlLibraryDescription);
        expect(mockRequestOptions.body.control_library_type).toEqual(controlLibraryType);
        expect(mockRequestOptions.body.control_library_version).toEqual(controlLibraryVersion);
        expect(mockRequestOptions.body.controls).toEqual(controls);
        expect(mockRequestOptions.qs.bss_account).toEqual(bssAccount);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.control_library_id).toEqual(controlLibraryId);
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const controlLibraryId = 'testString';
        const controlLibraryName = 'custom control library from SDK';
        const controlLibraryDescription = 'This is a custom control library made from the SDK test framework';
        const controlLibraryType = 'custom';
        const controlLibraryVersion = '0.0.2';
        const controls = [controlPrototypeModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceCustomControlLibraryParams = {
          instanceId,
          controlLibraryId,
          controlLibraryName,
          controlLibraryDescription,
          controlLibraryType,
          controlLibraryVersion,
          controls,
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

  describe('getControlLibrary', () => {
    describe('positive tests', () => {
      function __getControlLibraryTest() {
        // Construct the params object for operation getControlLibrary
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const controlLibraryId = 'testString';
        const accountId = 'testString';
        const getControlLibraryParams = {
          instanceId,
          controlLibraryId,
          accountId,
        };

        const getControlLibraryResult = securityAndComplianceCenterApiService.getControlLibrary(getControlLibraryParams);

        // all methods should return a Promise
        expectToBePromise(getControlLibraryResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/control_libraries/{control_library_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.control_library_id).toEqual(controlLibraryId);
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const controlLibraryId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getControlLibraryParams = {
          instanceId,
          controlLibraryId,
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

  describe('deleteCustomControlLibrary', () => {
    describe('positive tests', () => {
      function __deleteCustomControlLibraryTest() {
        // Construct the params object for operation deleteCustomControlLibrary
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const controlLibraryId = 'testString';
        const accountId = 'testString';
        const deleteCustomControlLibraryParams = {
          instanceId,
          controlLibraryId,
          accountId,
        };

        const deleteCustomControlLibraryResult = securityAndComplianceCenterApiService.deleteCustomControlLibrary(deleteCustomControlLibraryParams);

        // all methods should return a Promise
        expectToBePromise(deleteCustomControlLibraryResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/control_libraries/{control_library_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.control_library_id).toEqual(controlLibraryId);
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const controlLibraryId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteCustomControlLibraryParams = {
          instanceId,
          controlLibraryId,
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

  describe('createProfile', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ProfileControlsPrototype
      const profileControlsPrototypeModel = {
        control_library_id: 'a046fb6b-aba5-4646-b190-a2c76241e7af',
        control_id: '60dae3b5-6104-4b3e-bac7-26cc7b741aca',
      };

      // DefaultParameters
      const defaultParametersModel = {
        assessment_type: 'automated',
        assessment_id: 'rule-e16fcfea-fe21-4d30-a721-423611481fea',
        parameter_name: 'tls_version',
        parameter_default_value: '["1.2","1.3"]',
        parameter_display_name: 'IBM Cloud Internet Services TLS version',
        parameter_type: 'string_list',
      };

      function __createProfileTest() {
        // Construct the params object for operation createProfile
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const profileName = 'Example Profile';
        const profileVersion = '0.0.1';
        const controls = [profileControlsPrototypeModel];
        const defaultParameters = [defaultParametersModel];
        const profileDescription = 'This profile is created as an example of the SDK gen';
        const latest = true;
        const versionGroupLabel = 'testString';
        const accountId = 'testString';
        const createProfileParams = {
          instanceId,
          profileName,
          profileVersion,
          controls,
          defaultParameters,
          profileDescription,
          latest,
          versionGroupLabel,
          accountId,
        };

        const createProfileResult = securityAndComplianceCenterApiService.createProfile(createProfileParams);

        // all methods should return a Promise
        expectToBePromise(createProfileResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/profiles', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.profile_name).toEqual(profileName);
        expect(mockRequestOptions.body.profile_version).toEqual(profileVersion);
        expect(mockRequestOptions.body.controls).toEqual(controls);
        expect(mockRequestOptions.body.default_parameters).toEqual(defaultParameters);
        expect(mockRequestOptions.body.profile_description).toEqual(profileDescription);
        expect(mockRequestOptions.body.latest).toEqual(latest);
        expect(mockRequestOptions.body.version_group_label).toEqual(versionGroupLabel);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const profileName = 'Example Profile';
        const profileVersion = '0.0.1';
        const controls = [profileControlsPrototypeModel];
        const defaultParameters = [defaultParametersModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createProfileParams = {
          instanceId,
          profileName,
          profileVersion,
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

  describe('listProfiles', () => {
    describe('positive tests', () => {
      function __listProfilesTest() {
        // Construct the params object for operation listProfiles
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const accountId = 'testString';
        const limit = 50;
        const start = 'testString';
        const listProfilesParams = {
          instanceId,
          accountId,
          limit,
          start,
        };

        const listProfilesResult = securityAndComplianceCenterApiService.listProfiles(listProfilesParams);

        // all methods should return a Promise
        expectToBePromise(listProfilesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/profiles', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listProfilesParams = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.listProfiles(listProfilesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.listProfiles({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.listProfiles();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('ProfilesPager tests', () => {
      const serviceUrl = securityAndComplianceCenterApiServiceOptions.url;
      const path = '/instances/acd7032c-15a3-484f-bf5b-67d41534d940/v3/profiles';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"total_count":2,"limit":1,"profiles":[{"id":"id","profile_name":"profile_name","instance_id":"instance_id","hierarchy_enabled":false,"profile_description":"profile_description","profile_type":"custom","profile_version":"profile_version","version_group_label":"version_group_label","latest":true,"created_by":"created_by","created_on":"2019-01-01T12:00:00.000Z","updated_by":"updated_by","updated_on":"2019-01-01T12:00:00.000Z","controls_count":14,"attachments_count":17,"controls":[{"control_requirement":false,"control_library_id":"control_library_id","control_id":"control_id","control_library_version":"control_library_version","control_name":"control_name","control_description":"control_description","control_severity":"control_severity","control_category":"control_category","control_parent":"control_parent","control_docs":{"control_docs_id":"control_docs_id","control_docs_type":"control_docs_type"},"control_specifications":[{"id":"id","responsibility":"responsibility","component_id":"component_id","component_name":"component_name","component_type":"component_type","environment":"environment","description":"description","assessments_count":17,"assessments":[{"assessment_id":"382c2b06-e6b2-43ee-b189-c1c7743b67ee","assessment_type":"ibm-cloud-rule","assessment_method":"ibm-cloud-rule","assessment_description":"Check whether Cloud Object Storage is accessible only by using private endpoints","parameter_count":1,"parameters":[{"assessment_type":"assessment_type","assessment_id":"assessment_id","parameter_name":"location","parameter_display_name":"Location","parameter_type":"string","parameter_value":"anyValue"}]}]}]}],"default_parameters":[{"assessment_type":"assessment_type","assessment_id":"assessment_id","parameter_name":"parameter_name","parameter_default_value":"parameter_default_value","parameter_display_name":"parameter_display_name","parameter_type":"parameter_type"}]}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"profiles":[{"id":"id","profile_name":"profile_name","instance_id":"instance_id","hierarchy_enabled":false,"profile_description":"profile_description","profile_type":"custom","profile_version":"profile_version","version_group_label":"version_group_label","latest":true,"created_by":"created_by","created_on":"2019-01-01T12:00:00.000Z","updated_by":"updated_by","updated_on":"2019-01-01T12:00:00.000Z","controls_count":14,"attachments_count":17,"controls":[{"control_requirement":false,"control_library_id":"control_library_id","control_id":"control_id","control_library_version":"control_library_version","control_name":"control_name","control_description":"control_description","control_severity":"control_severity","control_category":"control_category","control_parent":"control_parent","control_docs":{"control_docs_id":"control_docs_id","control_docs_type":"control_docs_type"},"control_specifications":[{"id":"id","responsibility":"responsibility","component_id":"component_id","component_name":"component_name","component_type":"component_type","environment":"environment","description":"description","assessments_count":17,"assessments":[{"assessment_id":"382c2b06-e6b2-43ee-b189-c1c7743b67ee","assessment_type":"ibm-cloud-rule","assessment_method":"ibm-cloud-rule","assessment_description":"Check whether Cloud Object Storage is accessible only by using private endpoints","parameter_count":1,"parameters":[{"assessment_type":"assessment_type","assessment_id":"assessment_id","parameter_name":"location","parameter_display_name":"Location","parameter_type":"string","parameter_value":"anyValue"}]}]}]}],"default_parameters":[{"assessment_type":"assessment_type","assessment_id":"assessment_id","parameter_name":"parameter_name","parameter_default_value":"parameter_default_value","parameter_display_name":"parameter_display_name","parameter_type":"parameter_type"}]}]}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
          accountId: 'testString',
          limit: 10,
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
          instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
          accountId: 'testString',
          limit: 10,
        };
        const pager = new SecurityAndComplianceCenterApiV3.ProfilesPager(securityAndComplianceCenterApiService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('replaceProfile', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ControlDoc
      const controlDocModel = {
        control_docs_id: 'testString',
        control_docs_type: 'testString',
      };

      // Parameter
      const parameterModel = {
        assessment_type: 'testString',
        assessment_id: 'testString',
        parameter_name: 'location',
        parameter_display_name: 'Location',
        parameter_type: 'string',
        parameter_value: 'testString',
      };

      // Assessment
      const assessmentModel = {
        assessment_id: '382c2b06-e6b2-43ee-b189-c1c7743b67ee',
        assessment_type: 'ibm-cloud-rule',
        assessment_method: 'ibm-cloud-rule',
        assessment_description: 'Check whether Cloud Object Storage is accessible only by using private endpoints',
        parameter_count: 1,
        parameters: [parameterModel],
      };

      // ControlSpecification
      const controlSpecificationModel = {
        id: 'testString',
        responsibility: 'testString',
        component_id: 'testString',
        component_name: 'testString',
        component_type: 'testString',
        environment: 'testString',
        description: 'testString',
        assessments_count: 38,
        assessments: [assessmentModel],
      };

      // ProfileControls
      const profileControlsModel = {
        control_requirement: true,
        control_library_id: 'a046fb6b-aba5-4646-b190-a2c76241e7af',
        control_id: '60dae3b5-6104-4b3e-bac7-26cc7b741aca',
        control_library_version: 'testString',
        control_name: 'testString',
        control_description: 'testString',
        control_severity: 'testString',
        control_category: 'testString',
        control_parent: 'testString',
        control_docs: controlDocModel,
        control_specifications: [controlSpecificationModel],
      };

      // DefaultParameters
      const defaultParametersModel = {
        assessment_type: 'automated',
        assessment_id: 'rule-e16fcfea-fe21-4d30-a721-423611481fea',
        parameter_name: 'tls_version',
        parameter_default_value: '["1.2","1.3"]',
        parameter_display_name: 'IBM Cloud Internet Services TLS version',
        parameter_type: 'string_list',
      };

      function __replaceProfileTest() {
        // Construct the params object for operation replaceProfile
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const profileId = 'testString';
        const newProfileType = 'custom';
        const newControls = [profileControlsModel];
        const newDefaultParameters = [defaultParametersModel];
        const newId = 'testString';
        const newProfileName = 'Example Profile Updated';
        const newInstanceId = 'testString';
        const newHierarchyEnabled = true;
        const newProfileDescription = 'This profile has been updated';
        const newProfileVersion = '0.0.2';
        const newVersionGroupLabel = 'testString';
        const newLatest = true;
        const newCreatedBy = 'testString';
        const newCreatedOn = '2019-01-01T12:00:00.000Z';
        const newUpdatedBy = 'testString';
        const newUpdatedOn = '2019-01-01T12:00:00.000Z';
        const newControlsCount = 38;
        const newAttachmentsCount = 38;
        const accountId = 'testString';
        const replaceProfileParams = {
          instanceId,
          profileId,
          newProfileType,
          newControls,
          newDefaultParameters,
          newId,
          newProfileName,
          newInstanceId,
          newHierarchyEnabled,
          newProfileDescription,
          newProfileVersion,
          newVersionGroupLabel,
          newLatest,
          newCreatedBy,
          newCreatedOn,
          newUpdatedBy,
          newUpdatedOn,
          newControlsCount,
          newAttachmentsCount,
          accountId,
        };

        const replaceProfileResult = securityAndComplianceCenterApiService.replaceProfile(replaceProfileParams);

        // all methods should return a Promise
        expectToBePromise(replaceProfileResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/profiles/{profile_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.profile_type).toEqual(newProfileType);
        expect(mockRequestOptions.body.controls).toEqual(newControls);
        expect(mockRequestOptions.body.default_parameters).toEqual(newDefaultParameters);
        expect(mockRequestOptions.body.id).toEqual(newId);
        expect(mockRequestOptions.body.profile_name).toEqual(newProfileName);
        expect(mockRequestOptions.body.instance_id).toEqual(newInstanceId);
        expect(mockRequestOptions.body.hierarchy_enabled).toEqual(newHierarchyEnabled);
        expect(mockRequestOptions.body.profile_description).toEqual(newProfileDescription);
        expect(mockRequestOptions.body.profile_version).toEqual(newProfileVersion);
        expect(mockRequestOptions.body.version_group_label).toEqual(newVersionGroupLabel);
        expect(mockRequestOptions.body.latest).toEqual(newLatest);
        expect(mockRequestOptions.body.created_by).toEqual(newCreatedBy);
        expect(mockRequestOptions.body.created_on).toEqual(newCreatedOn);
        expect(mockRequestOptions.body.updated_by).toEqual(newUpdatedBy);
        expect(mockRequestOptions.body.updated_on).toEqual(newUpdatedOn);
        expect(mockRequestOptions.body.controls_count).toEqual(newControlsCount);
        expect(mockRequestOptions.body.attachments_count).toEqual(newAttachmentsCount);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.profile_id).toEqual(profileId);
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const profileId = 'testString';
        const newProfileType = 'custom';
        const newControls = [profileControlsModel];
        const newDefaultParameters = [defaultParametersModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceProfileParams = {
          instanceId,
          profileId,
          newProfileType,
          newControls,
          newDefaultParameters,
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

  describe('getProfile', () => {
    describe('positive tests', () => {
      function __getProfileTest() {
        // Construct the params object for operation getProfile
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const profileId = 'testString';
        const accountId = 'testString';
        const getProfileParams = {
          instanceId,
          profileId,
          accountId,
        };

        const getProfileResult = securityAndComplianceCenterApiService.getProfile(getProfileParams);

        // all methods should return a Promise
        expectToBePromise(getProfileResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/profiles/{profile_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.profile_id).toEqual(profileId);
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const profileId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getProfileParams = {
          instanceId,
          profileId,
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

  describe('deleteCustomProfile', () => {
    describe('positive tests', () => {
      function __deleteCustomProfileTest() {
        // Construct the params object for operation deleteCustomProfile
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const profileId = 'testString';
        const accountId = 'testString';
        const deleteCustomProfileParams = {
          instanceId,
          profileId,
          accountId,
        };

        const deleteCustomProfileResult = securityAndComplianceCenterApiService.deleteCustomProfile(deleteCustomProfileParams);

        // all methods should return a Promise
        expectToBePromise(deleteCustomProfileResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/profiles/{profile_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.profile_id).toEqual(profileId);
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const profileId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteCustomProfileParams = {
          instanceId,
          profileId,
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

  describe('replaceProfileParameters', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // DefaultParameters
      const defaultParametersModel = {
        assessment_type: 'testString',
        assessment_id: 'testString',
        parameter_name: 'testString',
        parameter_default_value: 'testString',
        parameter_display_name: 'testString',
        parameter_type: 'testString',
      };

      function __replaceProfileParametersTest() {
        // Construct the params object for operation replaceProfileParameters
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const profileId = 'testString';
        const defaultParameters = [defaultParametersModel];
        const id = 'testString';
        const accountId = 'testString';
        const replaceProfileParametersParams = {
          instanceId,
          profileId,
          defaultParameters,
          id,
          accountId,
        };

        const replaceProfileParametersResult = securityAndComplianceCenterApiService.replaceProfileParameters(replaceProfileParametersParams);

        // all methods should return a Promise
        expectToBePromise(replaceProfileParametersResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/profiles/{profile_id}/parameters', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.default_parameters).toEqual(defaultParameters);
        expect(mockRequestOptions.body.id).toEqual(id);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.profile_id).toEqual(profileId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replaceProfileParametersTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __replaceProfileParametersTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __replaceProfileParametersTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const profileId = 'testString';
        const defaultParameters = [defaultParametersModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceProfileParametersParams = {
          instanceId,
          profileId,
          defaultParameters,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.replaceProfileParameters(replaceProfileParametersParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.replaceProfileParameters({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.replaceProfileParameters();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listProfileParameters', () => {
    describe('positive tests', () => {
      function __listProfileParametersTest() {
        // Construct the params object for operation listProfileParameters
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const profileId = 'testString';
        const listProfileParametersParams = {
          instanceId,
          profileId,
        };

        const listProfileParametersResult = securityAndComplianceCenterApiService.listProfileParameters(listProfileParametersParams);

        // all methods should return a Promise
        expectToBePromise(listProfileParametersResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/profiles/{profile_id}/parameters', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.profile_id).toEqual(profileId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listProfileParametersTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __listProfileParametersTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __listProfileParametersTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const profileId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listProfileParametersParams = {
          instanceId,
          profileId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.listProfileParameters(listProfileParametersParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.listProfileParameters({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.listProfileParameters();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('compareProfiles', () => {
    describe('positive tests', () => {
      function __compareProfilesTest() {
        // Construct the params object for operation compareProfiles
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const profileId = '2f598907-970d-4d52-9071-5cc95912f55e';
        const accountId = 'testString';
        const compareProfilesParams = {
          instanceId,
          profileId,
          accountId,
        };

        const compareProfilesResult = securityAndComplianceCenterApiService.compareProfiles(compareProfilesParams);

        // all methods should return a Promise
        expectToBePromise(compareProfilesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/profiles/{profile_id}/compare', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.profile_id).toEqual(profileId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __compareProfilesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __compareProfilesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __compareProfilesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const profileId = '2f598907-970d-4d52-9071-5cc95912f55e';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const compareProfilesParams = {
          instanceId,
          profileId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.compareProfiles(compareProfilesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.compareProfiles({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.compareProfiles();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listProfileAttachments', () => {
    describe('positive tests', () => {
      function __listProfileAttachmentsTest() {
        // Construct the params object for operation listProfileAttachments
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const profileId = '9c265b4a-4cdf-47f1-acd3-17b5808f7f3f';
        const accountId = 'testString';
        const listProfileAttachmentsParams = {
          instanceId,
          profileId,
          accountId,
        };

        const listProfileAttachmentsResult = securityAndComplianceCenterApiService.listProfileAttachments(listProfileAttachmentsParams);

        // all methods should return a Promise
        expectToBePromise(listProfileAttachmentsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/profiles/{profile_id}/attachments', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.profile_id).toEqual(profileId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listProfileAttachmentsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __listProfileAttachmentsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __listProfileAttachmentsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const profileId = '9c265b4a-4cdf-47f1-acd3-17b5808f7f3f';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listProfileAttachmentsParams = {
          instanceId,
          profileId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.listProfileAttachments(listProfileAttachmentsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.listProfileAttachments({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.listProfileAttachments();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createScope', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ScopePropertyScopeAny
      const scopePropertyModel = {
        name: 'scope_id',
        value: 'ff88f007f9ff4622aac4fbc0eda36255',
      };

      function __createScopeTest() {
        // Construct the params object for operation createScope
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const name = 'ibm scope';
        const description = 'The scope that is defined for IBM resources.';
        const environment = 'ibm-cloud';
        const properties = [scopePropertyModel];
        const createScopeParams = {
          instanceId,
          name,
          description,
          environment,
          properties,
        };

        const createScopeResult = securityAndComplianceCenterApiService.createScope(createScopeParams);

        // all methods should return a Promise
        expectToBePromise(createScopeResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/scopes', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.environment).toEqual(environment);
        expect(mockRequestOptions.body.properties).toEqual(properties);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createScopeTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __createScopeTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __createScopeTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createScopeParams = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.createScope(createScopeParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.createScope({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.createScope();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listScopes', () => {
    describe('positive tests', () => {
      function __listScopesTest() {
        // Construct the params object for operation listScopes
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const limit = 50;
        const start = 'testString';
        const name = 'testString';
        const description = 'testString';
        const environment = 'testString';
        const listScopesParams = {
          instanceId,
          limit,
          start,
          name,
          description,
          environment,
        };

        const listScopesResult = securityAndComplianceCenterApiService.listScopes(listScopesParams);

        // all methods should return a Promise
        expectToBePromise(listScopesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/scopes', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.name).toEqual(name);
        expect(mockRequestOptions.qs.description).toEqual(description);
        expect(mockRequestOptions.qs.environment).toEqual(environment);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listScopesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __listScopesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __listScopesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listScopesParams = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.listScopes(listScopesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.listScopes({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.listScopes();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('ScopesPager tests', () => {
      const serviceUrl = securityAndComplianceCenterApiServiceOptions.url;
      const path = '/instances/acd7032c-15a3-484f-bf5b-67d41534d940/v3/scopes';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"total_count":2,"limit":1,"scopes":[{"id":"id","name":"name","description":"description","environment":"environment","properties":[{"name":"name","value":"anyValue"}],"account_id":"account_id","instance_id":"instance_id","created_by":"created_by","created_on":"2019-01-01T12:00:00.000Z","updated_by":"updated_by","updated_on":"2019-01-01T12:00:00.000Z","attachment_count":16}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"scopes":[{"id":"id","name":"name","description":"description","environment":"environment","properties":[{"name":"name","value":"anyValue"}],"account_id":"account_id","instance_id":"instance_id","created_by":"created_by","created_on":"2019-01-01T12:00:00.000Z","updated_by":"updated_by","updated_on":"2019-01-01T12:00:00.000Z","attachment_count":16}]}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
          limit: 10,
          name: 'testString',
          description: 'testString',
          environment: 'testString',
        };
        const allResults = [];
        const pager = new SecurityAndComplianceCenterApiV3.ScopesPager(securityAndComplianceCenterApiService, params);
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
          instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
          limit: 10,
          name: 'testString',
          description: 'testString',
          environment: 'testString',
        };
        const pager = new SecurityAndComplianceCenterApiV3.ScopesPager(securityAndComplianceCenterApiService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('updateScope', () => {
    describe('positive tests', () => {
      function __updateScopeTest() {
        // Construct the params object for operation updateScope
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const scopeId = 'testString';
        const name = 'updated name of scope';
        const description = 'updated scope description';
        const updateScopeParams = {
          instanceId,
          scopeId,
          name,
          description,
        };

        const updateScopeResult = securityAndComplianceCenterApiService.updateScope(updateScopeParams);

        // all methods should return a Promise
        expectToBePromise(updateScopeResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/scopes/{scope_id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.scope_id).toEqual(scopeId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateScopeTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __updateScopeTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __updateScopeTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const scopeId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateScopeParams = {
          instanceId,
          scopeId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.updateScope(updateScopeParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.updateScope({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.updateScope();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getScope', () => {
    describe('positive tests', () => {
      function __getScopeTest() {
        // Construct the params object for operation getScope
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const scopeId = 'testString';
        const getScopeParams = {
          instanceId,
          scopeId,
        };

        const getScopeResult = securityAndComplianceCenterApiService.getScope(getScopeParams);

        // all methods should return a Promise
        expectToBePromise(getScopeResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/scopes/{scope_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.scope_id).toEqual(scopeId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getScopeTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __getScopeTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __getScopeTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const scopeId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getScopeParams = {
          instanceId,
          scopeId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.getScope(getScopeParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.getScope({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.getScope();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteScope', () => {
    describe('positive tests', () => {
      function __deleteScopeTest() {
        // Construct the params object for operation deleteScope
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const scopeId = 'testString';
        const deleteScopeParams = {
          instanceId,
          scopeId,
        };

        const deleteScopeResult = securityAndComplianceCenterApiService.deleteScope(deleteScopeParams);

        // all methods should return a Promise
        expectToBePromise(deleteScopeResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/scopes/{scope_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.scope_id).toEqual(scopeId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteScopeTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __deleteScopeTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __deleteScopeTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const scopeId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteScopeParams = {
          instanceId,
          scopeId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.deleteScope(deleteScopeParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.deleteScope({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.deleteScope();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createSubscope', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ScopePropertyScopeAny
      const scopePropertyModel = {
        name: 'scope_id',
        value: '1f689f08ec9b47b885c2659c17029581',
      };

      // ScopePrototype
      const scopePrototypeModel = {
        name: 'ibm subscope update',
        description: 'The subscope that is defined for IBM resources.',
        environment: 'ibm-cloud',
        properties: [scopePropertyModel],
      };

      function __createSubscopeTest() {
        // Construct the params object for operation createSubscope
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const scopeId = 'testString';
        const subscopes = [scopePrototypeModel];
        const createSubscopeParams = {
          instanceId,
          scopeId,
          subscopes,
        };

        const createSubscopeResult = securityAndComplianceCenterApiService.createSubscope(createSubscopeParams);

        // all methods should return a Promise
        expectToBePromise(createSubscopeResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/scopes/{scope_id}/subscopes', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.subscopes).toEqual(subscopes);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.scope_id).toEqual(scopeId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createSubscopeTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __createSubscopeTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __createSubscopeTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const scopeId = 'testString';
        const subscopes = [scopePrototypeModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createSubscopeParams = {
          instanceId,
          scopeId,
          subscopes,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.createSubscope(createSubscopeParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.createSubscope({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.createSubscope();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listSubscopes', () => {
    describe('positive tests', () => {
      function __listSubscopesTest() {
        // Construct the params object for operation listSubscopes
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const scopeId = 'testString';
        const limit = 50;
        const start = 'testString';
        const name = 'testString';
        const description = 'testString';
        const environment = 'testString';
        const listSubscopesParams = {
          instanceId,
          scopeId,
          limit,
          start,
          name,
          description,
          environment,
        };

        const listSubscopesResult = securityAndComplianceCenterApiService.listSubscopes(listSubscopesParams);

        // all methods should return a Promise
        expectToBePromise(listSubscopesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/scopes/{scope_id}/subscopes', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.name).toEqual(name);
        expect(mockRequestOptions.qs.description).toEqual(description);
        expect(mockRequestOptions.qs.environment).toEqual(environment);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.scope_id).toEqual(scopeId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listSubscopesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __listSubscopesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __listSubscopesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const scopeId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listSubscopesParams = {
          instanceId,
          scopeId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.listSubscopes(listSubscopesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.listSubscopes({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.listSubscopes();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('SubscopesPager tests', () => {
      const serviceUrl = securityAndComplianceCenterApiServiceOptions.url;
      const path = '/instances/acd7032c-15a3-484f-bf5b-67d41534d940/v3/scopes/testString/subscopes';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"subscopes":[{"id":"id","name":"name","description":"description","environment":"environment","properties":[{"name":"name","value":"anyValue"}]}],"total_count":2,"limit":1}';
      const mockPagerResponse2 =
        '{"subscopes":[{"id":"id","name":"name","description":"description","environment":"environment","properties":[{"name":"name","value":"anyValue"}]}],"total_count":2,"limit":1}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
          scopeId: 'testString',
          limit: 10,
          name: 'testString',
          description: 'testString',
          environment: 'testString',
        };
        const allResults = [];
        const pager = new SecurityAndComplianceCenterApiV3.SubscopesPager(securityAndComplianceCenterApiService, params);
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
          instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
          scopeId: 'testString',
          limit: 10,
          name: 'testString',
          description: 'testString',
          environment: 'testString',
        };
        const pager = new SecurityAndComplianceCenterApiV3.SubscopesPager(securityAndComplianceCenterApiService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('getSubscope', () => {
    describe('positive tests', () => {
      function __getSubscopeTest() {
        // Construct the params object for operation getSubscope
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const scopeId = 'testString';
        const subscopeId = 'testString';
        const getSubscopeParams = {
          instanceId,
          scopeId,
          subscopeId,
        };

        const getSubscopeResult = securityAndComplianceCenterApiService.getSubscope(getSubscopeParams);

        // all methods should return a Promise
        expectToBePromise(getSubscopeResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/scopes/{scope_id}/subscopes/{subscope_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.scope_id).toEqual(scopeId);
        expect(mockRequestOptions.path.subscope_id).toEqual(subscopeId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getSubscopeTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __getSubscopeTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __getSubscopeTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const scopeId = 'testString';
        const subscopeId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getSubscopeParams = {
          instanceId,
          scopeId,
          subscopeId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.getSubscope(getSubscopeParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.getSubscope({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.getSubscope();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateSubscope', () => {
    describe('positive tests', () => {
      function __updateSubscopeTest() {
        // Construct the params object for operation updateSubscope
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const scopeId = 'testString';
        const subscopeId = 'testString';
        const name = 'updated name of scope';
        const description = 'updated scope description';
        const updateSubscopeParams = {
          instanceId,
          scopeId,
          subscopeId,
          name,
          description,
        };

        const updateSubscopeResult = securityAndComplianceCenterApiService.updateSubscope(updateSubscopeParams);

        // all methods should return a Promise
        expectToBePromise(updateSubscopeResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/scopes/{scope_id}/subscopes/{subscope_id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.scope_id).toEqual(scopeId);
        expect(mockRequestOptions.path.subscope_id).toEqual(subscopeId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateSubscopeTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __updateSubscopeTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __updateSubscopeTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const scopeId = 'testString';
        const subscopeId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateSubscopeParams = {
          instanceId,
          scopeId,
          subscopeId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.updateSubscope(updateSubscopeParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.updateSubscope({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.updateSubscope();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteSubscope', () => {
    describe('positive tests', () => {
      function __deleteSubscopeTest() {
        // Construct the params object for operation deleteSubscope
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const scopeId = 'testString';
        const subscopeId = 'testString';
        const deleteSubscopeParams = {
          instanceId,
          scopeId,
          subscopeId,
        };

        const deleteSubscopeResult = securityAndComplianceCenterApiService.deleteSubscope(deleteSubscopeParams);

        // all methods should return a Promise
        expectToBePromise(deleteSubscopeResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/scopes/{scope_id}/subscopes/{subscope_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.scope_id).toEqual(scopeId);
        expect(mockRequestOptions.path.subscope_id).toEqual(subscopeId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteSubscopeTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __deleteSubscopeTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __deleteSubscopeTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const scopeId = 'testString';
        const subscopeId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteSubscopeParams = {
          instanceId,
          scopeId,
          subscopeId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.deleteSubscope(deleteSubscopeParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.deleteSubscope({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.deleteSubscope();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createTarget', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Account
      const accountModel = {
        id: '531fc3e28bfc43c5a2cea07786d93f5c',
        name: 'NIST',
        type: 'account_type',
      };

      // Tags
      const tagsModel = {
        user: ['testString'],
        access: ['testString'],
        service: ['testString'],
      };

      // Resource
      const resourceModel = {
        report_id: '30b434b3-cb08-4845-af10-7a8fc682b6a8',
        home_account_id: '2411ffdc16844b07b42521c3443f456d',
        id: 'crn:v1:bluemix:public:kms:us-south:a/5af747ca19a8a278b1b6e4eec20df507:03502a50-4ea9-463c-80e5-e27ed838cdb6::',
        resource_name: 'jeff\'s key',
        account: accountModel,
        component_id: 'cloud-object_storage',
        component_name: 'cloud-object_storage',
        environment: 'ibm cloud',
        tags: tagsModel,
        status: 'compliant',
        total_count: 140,
        pass_count: 123,
        failure_count: 12,
        error_count: 5,
        skipped_count: 7,
        completed_count: 135,
        service_name: 'pm-20',
        instance_crn: 'testString',
      };

      // Credential
      const credentialModel = {
        secret_crn: 'testString',
        resources: [resourceModel],
      };

      function __createTargetTest() {
        // Construct the params object for operation createTarget
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const accountId = '62ecf99b240144dea9125666249edfcb';
        const trustedProfileId = 'Profile-cb2c1829-9a8d-4218-b9cd-9f83fc814e54';
        const name = 'Target for IBM account';
        const credentials = [credentialModel];
        const createTargetParams = {
          instanceId,
          accountId,
          trustedProfileId,
          name,
          credentials,
        };

        const createTargetResult = securityAndComplianceCenterApiService.createTarget(createTargetParams);

        // all methods should return a Promise
        expectToBePromise(createTargetResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/targets', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.account_id).toEqual(accountId);
        expect(mockRequestOptions.body.trusted_profile_id).toEqual(trustedProfileId);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.credentials).toEqual(credentials);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createTargetTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __createTargetTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __createTargetTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const accountId = '62ecf99b240144dea9125666249edfcb';
        const trustedProfileId = 'Profile-cb2c1829-9a8d-4218-b9cd-9f83fc814e54';
        const name = 'Target for IBM account';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createTargetParams = {
          instanceId,
          accountId,
          trustedProfileId,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.createTarget(createTargetParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.createTarget({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.createTarget();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listTargets', () => {
    describe('positive tests', () => {
      function __listTargetsTest() {
        // Construct the params object for operation listTargets
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const listTargetsParams = {
          instanceId,
        };

        const listTargetsResult = securityAndComplianceCenterApiService.listTargets(listTargetsParams);

        // all methods should return a Promise
        expectToBePromise(listTargetsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/targets', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listTargetsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __listTargetsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __listTargetsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listTargetsParams = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.listTargets(listTargetsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.listTargets({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.listTargets();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getTarget', () => {
    describe('positive tests', () => {
      function __getTargetTest() {
        // Construct the params object for operation getTarget
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const targetId = 'testString';
        const getTargetParams = {
          instanceId,
          targetId,
        };

        const getTargetResult = securityAndComplianceCenterApiService.getTarget(getTargetParams);

        // all methods should return a Promise
        expectToBePromise(getTargetResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/targets/{target_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.target_id).toEqual(targetId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getTargetTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __getTargetTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __getTargetTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const targetId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getTargetParams = {
          instanceId,
          targetId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.getTarget(getTargetParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.getTarget({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.getTarget();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('replaceTarget', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Account
      const accountModel = {
        id: '531fc3e28bfc43c5a2cea07786d93f5c',
        name: 'NIST',
        type: 'account_type',
      };

      // Tags
      const tagsModel = {
        user: ['testString'],
        access: ['testString'],
        service: ['testString'],
      };

      // Resource
      const resourceModel = {
        report_id: '30b434b3-cb08-4845-af10-7a8fc682b6a8',
        home_account_id: '2411ffdc16844b07b42521c3443f456d',
        id: 'crn:v1:bluemix:public:kms:us-south:a/5af747ca19a8a278b1b6e4eec20df507:03502a50-4ea9-463c-80e5-e27ed838cdb6::',
        resource_name: 'jeff\'s key',
        account: accountModel,
        component_id: 'cloud-object_storage',
        component_name: 'cloud-object_storage',
        environment: 'ibm cloud',
        tags: tagsModel,
        status: 'compliant',
        total_count: 140,
        pass_count: 123,
        failure_count: 12,
        error_count: 5,
        skipped_count: 7,
        completed_count: 135,
        service_name: 'pm-20',
        instance_crn: 'testString',
      };

      // Credential
      const credentialModel = {
        secret_crn: 'dummy',
        resources: [resourceModel],
      };

      function __replaceTargetTest() {
        // Construct the params object for operation replaceTarget
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const targetId = 'testString';
        const accountId = 'be200c80cabc456e91139e4152327823';
        const trustedProfileId = 'Profile-a0a4c149-4fed-47ff-bfb2-680bcfaa64d3';
        const name = 'Sample Target Name';
        const credentials = [credentialModel];
        const replaceTargetParams = {
          instanceId,
          targetId,
          accountId,
          trustedProfileId,
          name,
          credentials,
        };

        const replaceTargetResult = securityAndComplianceCenterApiService.replaceTarget(replaceTargetParams);

        // all methods should return a Promise
        expectToBePromise(replaceTargetResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/targets/{target_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.account_id).toEqual(accountId);
        expect(mockRequestOptions.body.trusted_profile_id).toEqual(trustedProfileId);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.credentials).toEqual(credentials);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.target_id).toEqual(targetId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replaceTargetTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __replaceTargetTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __replaceTargetTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const targetId = 'testString';
        const accountId = 'be200c80cabc456e91139e4152327823';
        const trustedProfileId = 'Profile-a0a4c149-4fed-47ff-bfb2-680bcfaa64d3';
        const name = 'Sample Target Name';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceTargetParams = {
          instanceId,
          targetId,
          accountId,
          trustedProfileId,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.replaceTarget(replaceTargetParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.replaceTarget({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.replaceTarget();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteTarget', () => {
    describe('positive tests', () => {
      function __deleteTargetTest() {
        // Construct the params object for operation deleteTarget
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const targetId = 'testString';
        const deleteTargetParams = {
          instanceId,
          targetId,
        };

        const deleteTargetResult = securityAndComplianceCenterApiService.deleteTarget(deleteTargetParams);

        // all methods should return a Promise
        expectToBePromise(deleteTargetResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/targets/{target_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.target_id).toEqual(targetId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteTargetTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __deleteTargetTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __deleteTargetTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const targetId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteTargetParams = {
          instanceId,
          targetId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.deleteTarget(deleteTargetParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.deleteTarget({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.deleteTarget();
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const providerTypeId = '3e25966275dccfa2c3a34786919c5af7';
        const name = 'workload-protection-instance-1';
        const attributes = { wp_crn: 'crn:v1:staging:public:sysdig-secure:eu-gb:a/14q5SEnVIbwxzvP4AWPCjr2dJg5BAvPb:d1461d1ae-df1eee12fa81812e0-12-aa259::' };
        const createProviderTypeInstanceParams = {
          instanceId,
          providerTypeId,
          name,
          attributes,
        };

        const createProviderTypeInstanceResult = securityAndComplianceCenterApiService.createProviderTypeInstance(createProviderTypeInstanceParams);

        // all methods should return a Promise
        expectToBePromise(createProviderTypeInstanceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/provider_types/{provider_type_id}/provider_type_instances', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.attributes).toEqual(attributes);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const providerTypeId = '3e25966275dccfa2c3a34786919c5af7';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createProviderTypeInstanceParams = {
          instanceId,
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

  describe('listProviderTypeInstances', () => {
    describe('positive tests', () => {
      function __listProviderTypeInstancesTest() {
        // Construct the params object for operation listProviderTypeInstances
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const providerTypeId = '3e25966275dccfa2c3a34786919c5af7';
        const listProviderTypeInstancesParams = {
          instanceId,
          providerTypeId,
        };

        const listProviderTypeInstancesResult = securityAndComplianceCenterApiService.listProviderTypeInstances(listProviderTypeInstancesParams);

        // all methods should return a Promise
        expectToBePromise(listProviderTypeInstancesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/provider_types/{provider_type_id}/provider_type_instances', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const providerTypeId = '3e25966275dccfa2c3a34786919c5af7';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listProviderTypeInstancesParams = {
          instanceId,
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

  describe('getProviderTypeInstance', () => {
    describe('positive tests', () => {
      function __getProviderTypeInstanceTest() {
        // Construct the params object for operation getProviderTypeInstance
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const providerTypeId = '3e25966275dccfa2c3a34786919c5af7';
        const providerTypeInstanceId = 'testString';
        const getProviderTypeInstanceParams = {
          instanceId,
          providerTypeId,
          providerTypeInstanceId,
        };

        const getProviderTypeInstanceResult = securityAndComplianceCenterApiService.getProviderTypeInstance(getProviderTypeInstanceParams);

        // all methods should return a Promise
        expectToBePromise(getProviderTypeInstanceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/provider_types/{provider_type_id}/provider_type_instances/{provider_type_instance_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const providerTypeId = '3e25966275dccfa2c3a34786919c5af7';
        const providerTypeInstanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getProviderTypeInstanceParams = {
          instanceId,
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const providerTypeId = '3e25966275dccfa2c3a34786919c5af7';
        const providerTypeInstanceId = 'testString';
        const name = 'workload-protection-instance-1';
        const attributes = { wp_crn: 'crn:v1:staging:public:sysdig-secure:eu-gb:a/14q5SEnVIbwxzvP4AWPCjr2dJg5BAvPb:d1461d1ae-df1eee12fa81812e0-12-aa259::' };
        const updateProviderTypeInstanceParams = {
          instanceId,
          providerTypeId,
          providerTypeInstanceId,
          name,
          attributes,
        };

        const updateProviderTypeInstanceResult = securityAndComplianceCenterApiService.updateProviderTypeInstance(updateProviderTypeInstanceParams);

        // all methods should return a Promise
        expectToBePromise(updateProviderTypeInstanceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/provider_types/{provider_type_id}/provider_type_instances/{provider_type_instance_id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.attributes).toEqual(attributes);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const providerTypeId = '3e25966275dccfa2c3a34786919c5af7';
        const providerTypeInstanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateProviderTypeInstanceParams = {
          instanceId,
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

  describe('deleteProviderTypeInstance', () => {
    describe('positive tests', () => {
      function __deleteProviderTypeInstanceTest() {
        // Construct the params object for operation deleteProviderTypeInstance
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const providerTypeId = '3e25966275dccfa2c3a34786919c5af7';
        const providerTypeInstanceId = 'testString';
        const deleteProviderTypeInstanceParams = {
          instanceId,
          providerTypeId,
          providerTypeInstanceId,
        };

        const deleteProviderTypeInstanceResult = securityAndComplianceCenterApiService.deleteProviderTypeInstance(deleteProviderTypeInstanceParams);

        // all methods should return a Promise
        expectToBePromise(deleteProviderTypeInstanceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/provider_types/{provider_type_id}/provider_type_instances/{provider_type_instance_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const providerTypeId = '3e25966275dccfa2c3a34786919c5af7';
        const providerTypeInstanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteProviderTypeInstanceParams = {
          instanceId,
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

  describe('listProviderTypes', () => {
    describe('positive tests', () => {
      function __listProviderTypesTest() {
        // Construct the params object for operation listProviderTypes
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const listProviderTypesParams = {
          instanceId,
        };

        const listProviderTypesResult = securityAndComplianceCenterApiService.listProviderTypes(listProviderTypesParams);

        // all methods should return a Promise
        expectToBePromise(listProviderTypesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/provider_types', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listProviderTypesParams = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.listProviderTypes(listProviderTypesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.listProviderTypes({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.listProviderTypes();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getProviderTypeById', () => {
    describe('positive tests', () => {
      function __getProviderTypeByIdTest() {
        // Construct the params object for operation getProviderTypeById
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const providerTypeId = '3e25966275dccfa2c3a34786919c5af7';
        const getProviderTypeByIdParams = {
          instanceId,
          providerTypeId,
        };

        const getProviderTypeByIdResult = securityAndComplianceCenterApiService.getProviderTypeById(getProviderTypeByIdParams);

        // all methods should return a Promise
        expectToBePromise(getProviderTypeByIdResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/provider_types/{provider_type_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const providerTypeId = '3e25966275dccfa2c3a34786919c5af7';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getProviderTypeByIdParams = {
          instanceId,
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

  describe('getLatestReports', () => {
    describe('positive tests', () => {
      function __getLatestReportsTest() {
        // Construct the params object for operation getLatestReports
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const sort = 'profile_name';
        const getLatestReportsParams = {
          instanceId,
          sort,
        };

        const getLatestReportsResult = securityAndComplianceCenterApiService.getLatestReports(getLatestReportsParams);

        // all methods should return a Promise
        expectToBePromise(getLatestReportsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/reports/latest', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getLatestReportsParams = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.getLatestReports(getLatestReportsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.getLatestReports({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.getLatestReports();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listReports', () => {
    describe('positive tests', () => {
      function __listReportsTest() {
        // Construct the params object for operation listReports
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const reportAttachmentId = 'testString';
        const groupId = 'testString';
        const reportProfileId = 'testString';
        const type = 'scheduled';
        const start = 'testString';
        const limit = 50;
        const sort = 'profile_name';
        const listReportsParams = {
          instanceId,
          reportAttachmentId,
          groupId,
          reportProfileId,
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

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/reports', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.report_attachment_id).toEqual(reportAttachmentId);
        expect(mockRequestOptions.qs.group_id).toEqual(groupId);
        expect(mockRequestOptions.qs.report_profile_id).toEqual(reportProfileId);
        expect(mockRequestOptions.qs.type).toEqual(type);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listReportsParams = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.listReports(listReportsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.listReports({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.listReports();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('ReportsPager tests', () => {
      const serviceUrl = securityAndComplianceCenterApiServiceOptions.url;
      const path = '/instances/acd7032c-15a3-484f-bf5b-67d41534d940/v3/reports';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"reports":[{"id":"44a5-a292-32114fa73558","type":"scheduled","group_id":"55b6-b3A4-432250b84669","created_on":"2022-08-15T12:30:01Z","scan_time":"2022-08-15T12:30:01Z","cos_object":"crn:v1:bluemix:public:cloud-object-storage:global:a/531fc3e28bfc43c5a2cea07786d93f5c:1a0ec336-f391-4091-a6fb-5e084a4c56f4:bucket:b1a8f3da-49d2-4966-ae83-a8d02bc2aac7","instance_id":"instance_id","account":{"id":"531fc3e28bfc43c5a2cea07786d93f5c","name":"NIST","type":"account_type"},"profile":{"id":"44a5-a292-32114fa73558","name":"IBM FS Cloud","version":"0.1"},"scope":{"id":"2411ffdc16844b07b42521c3443f456d","type":"account"},"attachment":{"id":"531fc3e28bfc43c5a2cea07786d93f5c","name":"resource group - Default","description":"Scoped to the Default resource group","schedule":"daily","scope":"anyValue","scopes":[{"id":"id","name":"name","description":"description","environment":"environment","properties":[{"name":"name","value":"anyValue"}],"account_id":"account_id","instance_id":"instance_id","created_by":"created_by","created_on":"2019-01-01T12:00:00.000Z","updated_by":"updated_by","updated_on":"2019-01-01T12:00:00.000Z","attachment_count":16}],"notifications":{"enabled":false,"controls":{"threshold_limit":15,"failed_control_ids":["failed_control_ids"]}}},"controls_summary":{"status":"compliant","total_count":150,"compliant_count":130,"not_compliant_count":5,"unable_to_perform_count":5,"user_evaluation_required_count":10,"not_applicable_count":7,"not_compliant_controls":[{"id":"382c2b06-e6b2-43ee-b189-c1c7743b67ee","control_name":"ibm-cloud-rule","control_description":"Ensure security questions are registered by the account owner"}]},"evaluations_summary":{"status":"compliant","total_count":140,"pass_count":123,"failure_count":12,"error_count":5,"skipped_count":7,"completed_count":135},"tags":{"user":["user"],"access":["access"],"service":["service"]},"scopes":[{"id":"id","name":"name","href":"href","environment":"environment"}],"additional_details":{"created_by":"Security and Compliance Center","labels":["labels"],"links":[{"description":"description","href":"href"}]}}],"total_count":2,"limit":1}';
      const mockPagerResponse2 =
        '{"reports":[{"id":"44a5-a292-32114fa73558","type":"scheduled","group_id":"55b6-b3A4-432250b84669","created_on":"2022-08-15T12:30:01Z","scan_time":"2022-08-15T12:30:01Z","cos_object":"crn:v1:bluemix:public:cloud-object-storage:global:a/531fc3e28bfc43c5a2cea07786d93f5c:1a0ec336-f391-4091-a6fb-5e084a4c56f4:bucket:b1a8f3da-49d2-4966-ae83-a8d02bc2aac7","instance_id":"instance_id","account":{"id":"531fc3e28bfc43c5a2cea07786d93f5c","name":"NIST","type":"account_type"},"profile":{"id":"44a5-a292-32114fa73558","name":"IBM FS Cloud","version":"0.1"},"scope":{"id":"2411ffdc16844b07b42521c3443f456d","type":"account"},"attachment":{"id":"531fc3e28bfc43c5a2cea07786d93f5c","name":"resource group - Default","description":"Scoped to the Default resource group","schedule":"daily","scope":"anyValue","scopes":[{"id":"id","name":"name","description":"description","environment":"environment","properties":[{"name":"name","value":"anyValue"}],"account_id":"account_id","instance_id":"instance_id","created_by":"created_by","created_on":"2019-01-01T12:00:00.000Z","updated_by":"updated_by","updated_on":"2019-01-01T12:00:00.000Z","attachment_count":16}],"notifications":{"enabled":false,"controls":{"threshold_limit":15,"failed_control_ids":["failed_control_ids"]}}},"controls_summary":{"status":"compliant","total_count":150,"compliant_count":130,"not_compliant_count":5,"unable_to_perform_count":5,"user_evaluation_required_count":10,"not_applicable_count":7,"not_compliant_controls":[{"id":"382c2b06-e6b2-43ee-b189-c1c7743b67ee","control_name":"ibm-cloud-rule","control_description":"Ensure security questions are registered by the account owner"}]},"evaluations_summary":{"status":"compliant","total_count":140,"pass_count":123,"failure_count":12,"error_count":5,"skipped_count":7,"completed_count":135},"tags":{"user":["user"],"access":["access"],"service":["service"]},"scopes":[{"id":"id","name":"name","href":"href","environment":"environment"}],"additional_details":{"created_by":"Security and Compliance Center","labels":["labels"],"links":[{"description":"description","href":"href"}]}}],"total_count":2,"limit":1}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
          reportAttachmentId: 'testString',
          groupId: 'testString',
          reportProfileId: 'testString',
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
          instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
          reportAttachmentId: 'testString',
          groupId: 'testString',
          reportProfileId: 'testString',
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const scopeId = 'testString';
        const subscopeId = 'testString';
        const getReportParams = {
          reportId,
          instanceId,
          scopeId,
          subscopeId,
        };

        const getReportResult = securityAndComplianceCenterApiService.getReport(getReportParams);

        // all methods should return a Promise
        expectToBePromise(getReportResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/reports/{report_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.scope_id).toEqual(scopeId);
        expect(mockRequestOptions.qs.subscope_id).toEqual(subscopeId);
        expect(mockRequestOptions.path.report_id).toEqual(reportId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getReportParams = {
          reportId,
          instanceId,
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const reportId = 'testString';
        const getReportSummaryParams = {
          instanceId,
          reportId,
        };

        const getReportSummaryResult = securityAndComplianceCenterApiService.getReportSummary(getReportSummaryParams);

        // all methods should return a Promise
        expectToBePromise(getReportSummaryResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/reports/{report_id}/summary', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const reportId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getReportSummaryParams = {
          instanceId,
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

  describe('getReportDownloadFile', () => {
    describe('positive tests', () => {
      function __getReportDownloadFileTest() {
        // Construct the params object for operation getReportDownloadFile
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const reportId = 'testString';
        const accept = 'application/csv';
        const excludeSummary = true;
        const getReportDownloadFileParams = {
          instanceId,
          reportId,
          accept,
          excludeSummary,
        };

        const getReportDownloadFileResult = securityAndComplianceCenterApiService.getReportDownloadFile(getReportDownloadFileParams);

        // all methods should return a Promise
        expectToBePromise(getReportDownloadFileResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/reports/{report_id}/download', 'GET');
        const expectedAccept = accept;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept', accept);
        expect(mockRequestOptions.qs.exclude_summary).toEqual(excludeSummary);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.report_id).toEqual(reportId);
        expect(mockRequestOptions.responseType).toBe('stream');
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getReportDownloadFileTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __getReportDownloadFileTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __getReportDownloadFileTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const reportId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getReportDownloadFileParams = {
          instanceId,
          reportId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.getReportDownloadFile(getReportDownloadFileParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.getReportDownloadFile({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.getReportDownloadFile();
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const reportId = 'testString';
        const controlId = 'testString';
        const controlName = 'testString';
        const controlDescription = 'testString';
        const controlCategory = 'testString';
        const status = 'compliant';
        const sort = 'control_name';
        const scopeId = 'testString';
        const subscopeId = 'testString';
        const getReportControlsParams = {
          instanceId,
          reportId,
          controlId,
          controlName,
          controlDescription,
          controlCategory,
          status,
          sort,
          scopeId,
          subscopeId,
        };

        const getReportControlsResult = securityAndComplianceCenterApiService.getReportControls(getReportControlsParams);

        // all methods should return a Promise
        expectToBePromise(getReportControlsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/reports/{report_id}/controls', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.control_id).toEqual(controlId);
        expect(mockRequestOptions.qs.control_name).toEqual(controlName);
        expect(mockRequestOptions.qs.control_description).toEqual(controlDescription);
        expect(mockRequestOptions.qs.control_category).toEqual(controlCategory);
        expect(mockRequestOptions.qs.status).toEqual(status);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.qs.scope_id).toEqual(scopeId);
        expect(mockRequestOptions.qs.subscope_id).toEqual(subscopeId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const reportId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getReportControlsParams = {
          instanceId,
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const reportId = 'testString';
        const ruleId = 'rule-61fa114a-2bb9-43fd-8068-b873b48bdf79';
        const getReportRuleParams = {
          instanceId,
          reportId,
          ruleId,
        };

        const getReportRuleResult = securityAndComplianceCenterApiService.getReportRule(getReportRuleParams);

        // all methods should return a Promise
        expectToBePromise(getReportRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/reports/{report_id}/rules/{rule_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const reportId = 'testString';
        const ruleId = 'rule-61fa114a-2bb9-43fd-8068-b873b48bdf79';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getReportRuleParams = {
          instanceId,
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const reportId = 'testString';
        const assessmentId = 'testString';
        const assessmentMethod = 'testString';
        const componentId = 'testString';
        const targetId = 'testString';
        const targetEnv = 'testString';
        const targetName = 'testString';
        const status = 'failure';
        const start = 'testString';
        const limit = 50;
        const sort = 'assessment_id';
        const scopeId = 'testString';
        const subscopeId = 'testString';
        const listReportEvaluationsParams = {
          instanceId,
          reportId,
          assessmentId,
          assessmentMethod,
          componentId,
          targetId,
          targetEnv,
          targetName,
          status,
          start,
          limit,
          sort,
          scopeId,
          subscopeId,
        };

        const listReportEvaluationsResult = securityAndComplianceCenterApiService.listReportEvaluations(listReportEvaluationsParams);

        // all methods should return a Promise
        expectToBePromise(listReportEvaluationsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/reports/{report_id}/evaluations', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.assessment_id).toEqual(assessmentId);
        expect(mockRequestOptions.qs.assessment_method).toEqual(assessmentMethod);
        expect(mockRequestOptions.qs.component_id).toEqual(componentId);
        expect(mockRequestOptions.qs.target_id).toEqual(targetId);
        expect(mockRequestOptions.qs.target_env).toEqual(targetEnv);
        expect(mockRequestOptions.qs.target_name).toEqual(targetName);
        expect(mockRequestOptions.qs.status).toEqual(status);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.qs.scope_id).toEqual(scopeId);
        expect(mockRequestOptions.qs.subscope_id).toEqual(subscopeId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const reportId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listReportEvaluationsParams = {
          instanceId,
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
      const path = '/instances/acd7032c-15a3-484f-bf5b-67d41534d940/v3/reports/testString/evaluations';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"evaluations":[{"report_id":"report_id","home_account_id":"be200c80cabc456e91139e4152327456","component_id":"cloud-object_storage","component_name":"cloud-object_storage","assessment":{"assessment_id":"382c2b06-e6b2-43ee-b189-c1c7743b67ee","assessment_type":"ibm-cloud-rule","assessment_method":"ibm-cloud-rule","assessment_description":"Check whether Cloud Object Storage is accessible only by using private endpoints","parameter_count":1,"parameters":[{"assessment_type":"assessment_type","assessment_id":"assessment_id","parameter_name":"location","parameter_display_name":"Location","parameter_type":"string","parameter_value":"anyValue"}]},"evaluate_time":"2022-06-30T11:03:44.630150782Z","target":{"id":"crn:v1:bluemix:public:cloud-object-storage:global:a/59bcbfa6ea2f006b4ed7094c1a08dcdd:1a0ec336-f391-4091-a6fb-5e084a4c56f4:bucket:mybucket","account_id":"59bcbfa6ea2f006b4ed7094c1a08dcdd","service_name":"cloud-object-storage","service_display_name":"cloud-object-storage","resource_crn":"crn:v1:bluemix:public:cloud-object-storage:global:a/59bcbfa6ea2f006b4ed7094c1a08dcdd:1a0ec336-f391-4091-a6fb-5e084a4c56f4:bucket:mybucket","resource_name":"mybucket","tags":{"user":["user"],"access":["access"],"service":["service"]}},"status":"failure","reason":"One or more conditions in rule rule-7b0560a4-df94-4629-bb76-680f3155ddda were not met","details":{"properties":[{"property":"property","property_description":"property_description","operator":"string_equals","expected_value":"anyValue","found_value":"anyValue"}],"provider_info":{"provider_type":"provider_type"}},"evaluated_by":"abc@ibm.com"}],"total_count":2,"limit":1}';
      const mockPagerResponse2 =
        '{"evaluations":[{"report_id":"report_id","home_account_id":"be200c80cabc456e91139e4152327456","component_id":"cloud-object_storage","component_name":"cloud-object_storage","assessment":{"assessment_id":"382c2b06-e6b2-43ee-b189-c1c7743b67ee","assessment_type":"ibm-cloud-rule","assessment_method":"ibm-cloud-rule","assessment_description":"Check whether Cloud Object Storage is accessible only by using private endpoints","parameter_count":1,"parameters":[{"assessment_type":"assessment_type","assessment_id":"assessment_id","parameter_name":"location","parameter_display_name":"Location","parameter_type":"string","parameter_value":"anyValue"}]},"evaluate_time":"2022-06-30T11:03:44.630150782Z","target":{"id":"crn:v1:bluemix:public:cloud-object-storage:global:a/59bcbfa6ea2f006b4ed7094c1a08dcdd:1a0ec336-f391-4091-a6fb-5e084a4c56f4:bucket:mybucket","account_id":"59bcbfa6ea2f006b4ed7094c1a08dcdd","service_name":"cloud-object-storage","service_display_name":"cloud-object-storage","resource_crn":"crn:v1:bluemix:public:cloud-object-storage:global:a/59bcbfa6ea2f006b4ed7094c1a08dcdd:1a0ec336-f391-4091-a6fb-5e084a4c56f4:bucket:mybucket","resource_name":"mybucket","tags":{"user":["user"],"access":["access"],"service":["service"]}},"status":"failure","reason":"One or more conditions in rule rule-7b0560a4-df94-4629-bb76-680f3155ddda were not met","details":{"properties":[{"property":"property","property_description":"property_description","operator":"string_equals","expected_value":"anyValue","found_value":"anyValue"}],"provider_info":{"provider_type":"provider_type"}},"evaluated_by":"abc@ibm.com"}],"total_count":2,"limit":1}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
          reportId: 'testString',
          assessmentId: 'testString',
          assessmentMethod: 'testString',
          componentId: 'testString',
          targetId: 'testString',
          targetEnv: 'testString',
          targetName: 'testString',
          status: 'failure',
          limit: 10,
          sort: 'assessment_id',
          scopeId: 'testString',
          subscopeId: 'testString',
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
          instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
          reportId: 'testString',
          assessmentId: 'testString',
          assessmentMethod: 'testString',
          componentId: 'testString',
          targetId: 'testString',
          targetEnv: 'testString',
          targetName: 'testString',
          status: 'failure',
          limit: 10,
          sort: 'assessment_id',
          scopeId: 'testString',
          subscopeId: 'testString',
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const reportId = 'testString';
        const id = 'testString';
        const resourceName = 'testString';
        const accountId = 'testString';
        const componentId = 'testString';
        const status = 'compliant';
        const sort = 'account_id';
        const start = 'testString';
        const limit = 50;
        const scopeId = 'testString';
        const subscopeId = 'testString';
        const listReportResourcesParams = {
          instanceId,
          reportId,
          id,
          resourceName,
          accountId,
          componentId,
          status,
          sort,
          start,
          limit,
          scopeId,
          subscopeId,
        };

        const listReportResourcesResult = securityAndComplianceCenterApiService.listReportResources(listReportResourcesParams);

        // all methods should return a Promise
        expectToBePromise(listReportResourcesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/reports/{report_id}/resources', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.id).toEqual(id);
        expect(mockRequestOptions.qs.resource_name).toEqual(resourceName);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.qs.component_id).toEqual(componentId);
        expect(mockRequestOptions.qs.status).toEqual(status);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.scope_id).toEqual(scopeId);
        expect(mockRequestOptions.qs.subscope_id).toEqual(subscopeId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const reportId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listReportResourcesParams = {
          instanceId,
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
      const path = '/instances/acd7032c-15a3-484f-bf5b-67d41534d940/v3/reports/testString/resources';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"total_count":2,"limit":1,"resources":[{"report_id":"30b434b3-cb08-4845-af10-7a8fc682b6a8","home_account_id":"2411ffdc16844b07b42521c3443f456d","id":"crn:v1:bluemix:public:kms:us-south:a/5af747ca19a8a278b1b6e4eec20df507:03502a50-4ea9-463c-80e5-e27ed838cdb6::","resource_name":"jeff\'s key","account":{"id":"531fc3e28bfc43c5a2cea07786d93f5c","name":"NIST","type":"account_type"},"component_id":"cloud-object_storage","component_name":"cloud-object_storage","environment":"ibm cloud","tags":{"user":["user"],"access":["access"],"service":["service"]},"status":"compliant","total_count":140,"pass_count":123,"failure_count":12,"error_count":5,"skipped_count":7,"completed_count":135,"service_name":"pm-20","instance_crn":"instance_crn"}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"resources":[{"report_id":"30b434b3-cb08-4845-af10-7a8fc682b6a8","home_account_id":"2411ffdc16844b07b42521c3443f456d","id":"crn:v1:bluemix:public:kms:us-south:a/5af747ca19a8a278b1b6e4eec20df507:03502a50-4ea9-463c-80e5-e27ed838cdb6::","resource_name":"jeff\'s key","account":{"id":"531fc3e28bfc43c5a2cea07786d93f5c","name":"NIST","type":"account_type"},"component_id":"cloud-object_storage","component_name":"cloud-object_storage","environment":"ibm cloud","tags":{"user":["user"],"access":["access"],"service":["service"]},"status":"compliant","total_count":140,"pass_count":123,"failure_count":12,"error_count":5,"skipped_count":7,"completed_count":135,"service_name":"pm-20","instance_crn":"instance_crn"}]}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
          reportId: 'testString',
          id: 'testString',
          resourceName: 'testString',
          accountId: 'testString',
          componentId: 'testString',
          status: 'compliant',
          sort: 'account_id',
          limit: 10,
          scopeId: 'testString',
          subscopeId: 'testString',
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
          instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
          reportId: 'testString',
          id: 'testString',
          resourceName: 'testString',
          accountId: 'testString',
          componentId: 'testString',
          status: 'compliant',
          sort: 'account_id',
          limit: 10,
          scopeId: 'testString',
          subscopeId: 'testString',
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const reportId = 'testString';
        const getReportTagsParams = {
          instanceId,
          reportId,
        };

        const getReportTagsResult = securityAndComplianceCenterApiService.getReportTags(getReportTagsParams);

        // all methods should return a Promise
        expectToBePromise(getReportTagsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/reports/{report_id}/tags', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const reportId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getReportTagsParams = {
          instanceId,
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const reportId = 'testString';
        const scanTimeDuration = 0;
        const scopeId = 'testString';
        const subscopeId = 'testString';
        const getReportViolationsDriftParams = {
          instanceId,
          reportId,
          scanTimeDuration,
          scopeId,
          subscopeId,
        };

        const getReportViolationsDriftResult = securityAndComplianceCenterApiService.getReportViolationsDrift(getReportViolationsDriftParams);

        // all methods should return a Promise
        expectToBePromise(getReportViolationsDriftResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/reports/{report_id}/violations_drift', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.scan_time_duration).toEqual(scanTimeDuration);
        expect(mockRequestOptions.qs.scope_id).toEqual(scopeId);
        expect(mockRequestOptions.qs.subscope_id).toEqual(subscopeId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const reportId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getReportViolationsDriftParams = {
          instanceId,
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

  describe('listScanReports', () => {
    describe('positive tests', () => {
      function __listScanReportsTest() {
        // Construct the params object for operation listScanReports
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const reportId = 'testString';
        const scopeId = 'testString';
        const subscopeId = 'testString';
        const sort = 'status';
        const listScanReportsParams = {
          instanceId,
          reportId,
          scopeId,
          subscopeId,
          sort,
        };

        const listScanReportsResult = securityAndComplianceCenterApiService.listScanReports(listScanReportsParams);

        // all methods should return a Promise
        expectToBePromise(listScanReportsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/reports/{report_id}/scan_reports', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.scope_id).toEqual(scopeId);
        expect(mockRequestOptions.qs.subscope_id).toEqual(subscopeId);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.report_id).toEqual(reportId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listScanReportsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __listScanReportsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __listScanReportsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const reportId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listScanReportsParams = {
          instanceId,
          reportId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.listScanReports(listScanReportsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.listScanReports({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.listScanReports();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createScanReport', () => {
    describe('positive tests', () => {
      function __createScanReportTest() {
        // Construct the params object for operation createScanReport
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const reportId = 'testString';
        const format = 'csv';
        const scopeId = '132009ff-b982-412e-a110-ad8797e10f84';
        const subscopeId = 'c7ddcbcc-6a43-4ab3-b6a7-b2d8f65cd54a';
        const createScanReportParams = {
          instanceId,
          reportId,
          format,
          scopeId,
          subscopeId,
        };

        const createScanReportResult = securityAndComplianceCenterApiService.createScanReport(createScanReportParams);

        // all methods should return a Promise
        expectToBePromise(createScanReportResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/reports/{report_id}/scan_reports', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.format).toEqual(format);
        expect(mockRequestOptions.body.scope_id).toEqual(scopeId);
        expect(mockRequestOptions.body.subscope_id).toEqual(subscopeId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.report_id).toEqual(reportId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createScanReportTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __createScanReportTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __createScanReportTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const reportId = 'testString';
        const format = 'csv';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createScanReportParams = {
          instanceId,
          reportId,
          format,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.createScanReport(createScanReportParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.createScanReport({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.createScanReport();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getScanReport', () => {
    describe('positive tests', () => {
      function __getScanReportTest() {
        // Construct the params object for operation getScanReport
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const reportId = 'testString';
        const jobId = 'testString';
        const getScanReportParams = {
          instanceId,
          reportId,
          jobId,
        };

        const getScanReportResult = securityAndComplianceCenterApiService.getScanReport(getScanReportParams);

        // all methods should return a Promise
        expectToBePromise(getScanReportResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/reports/{report_id}/scan_reports/{job_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.report_id).toEqual(reportId);
        expect(mockRequestOptions.path.job_id).toEqual(jobId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getScanReportTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __getScanReportTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __getScanReportTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const reportId = 'testString';
        const jobId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getScanReportParams = {
          instanceId,
          reportId,
          jobId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.getScanReport(getScanReportParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.getScanReport({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.getScanReport();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getScanReportDownloadFile', () => {
    describe('positive tests', () => {
      function __getScanReportDownloadFileTest() {
        // Construct the params object for operation getScanReportDownloadFile
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const reportId = 'testString';
        const jobId = 'testString';
        const accept = 'application/csv';
        const getScanReportDownloadFileParams = {
          instanceId,
          reportId,
          jobId,
          accept,
        };

        const getScanReportDownloadFileResult = securityAndComplianceCenterApiService.getScanReportDownloadFile(getScanReportDownloadFileParams);

        // all methods should return a Promise
        expectToBePromise(getScanReportDownloadFileResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/reports/{report_id}/scan_reports/{job_id}/download', 'GET');
        const expectedAccept = accept;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept', accept);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.report_id).toEqual(reportId);
        expect(mockRequestOptions.path.job_id).toEqual(jobId);
        expect(mockRequestOptions.responseType).toBe('stream');
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getScanReportDownloadFileTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __getScanReportDownloadFileTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __getScanReportDownloadFileTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const reportId = 'testString';
        const jobId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getScanReportDownloadFileParams = {
          instanceId,
          reportId,
          jobId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.getScanReportDownloadFile(getScanReportDownloadFileParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.getScanReportDownloadFile({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.getScanReportDownloadFile();
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const limit = 50;
        const start = 'testString';
        const type = 'system_defined';
        const search = 'testString';
        const serviceName = 'testString';
        const sort = 'updated_on';
        const listRulesParams = {
          instanceId,
          limit,
          start,
          type,
          search,
          serviceName,
          sort,
        };

        const listRulesResult = securityAndComplianceCenterApiService.listRules(listRulesParams);

        // all methods should return a Promise
        expectToBePromise(listRulesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/rules', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.type).toEqual(type);
        expect(mockRequestOptions.qs.search).toEqual(search);
        expect(mockRequestOptions.qs.service_name).toEqual(serviceName);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listRulesParams = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.listRules(listRulesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.listRules({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.listRules();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('RulesPager tests', () => {
      const serviceUrl = securityAndComplianceCenterApiServiceOptions.url;
      const path = '/instances/acd7032c-15a3-484f-bf5b-67d41534d940/v3/rules';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"total_count":2,"limit":1,"rules":[{"created_on":"2019-01-01T12:00:00.000Z","created_by":"created_by","updated_on":"2019-01-01T12:00:00.000Z","updated_by":"updated_by","id":"id","account_id":"account_id","description":"description","type":"user_defined","version":"version","import":{"parameters":[{"name":"name","display_name":"display_name","description":"description","type":"string"}]},"target":{"service_name":"service_name","service_display_name":"service_display_name","resource_kind":"resource_kind","additional_target_attributes":[{"name":"name","operator":"string_equals","value":"anyValue"}],"ref":"ref"},"required_config":{"description":"description","property":"property","operator":"string_equals","value":"anyValue"},"labels":["labels"]}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"rules":[{"created_on":"2019-01-01T12:00:00.000Z","created_by":"created_by","updated_on":"2019-01-01T12:00:00.000Z","updated_by":"updated_by","id":"id","account_id":"account_id","description":"description","type":"user_defined","version":"version","import":{"parameters":[{"name":"name","display_name":"display_name","description":"description","type":"string"}]},"target":{"service_name":"service_name","service_display_name":"service_display_name","resource_kind":"resource_kind","additional_target_attributes":[{"name":"name","operator":"string_equals","value":"anyValue"}],"ref":"ref"},"required_config":{"description":"description","property":"property","operator":"string_equals","value":"anyValue"},"labels":["labels"]}]}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
          limit: 10,
          type: 'system_defined',
          search: 'testString',
          serviceName: 'testString',
          sort: 'updated_on',
        };
        const allResults = [];
        const pager = new SecurityAndComplianceCenterApiV3.RulesPager(securityAndComplianceCenterApiService, params);
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
          instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
          limit: 10,
          type: 'system_defined',
          search: 'testString',
          serviceName: 'testString',
          sort: 'updated_on',
        };
        const pager = new SecurityAndComplianceCenterApiV3.RulesPager(securityAndComplianceCenterApiService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
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

      // RuleTargetPrototype
      const ruleTargetPrototypeModel = {
        service_name: 'cloud-object-storage',
        resource_kind: 'bucket',
        additional_target_attributes: [additionalTargetAttributeModel],
      };

      // RequiredConfigConditionBase
      const requiredConfigModel = {
        description: 'The Cloud Object Storage rule.',
        property: 'testString',
        operator: 'string_equals',
        value: 'testString',
      };

      // RuleParameter
      const ruleParameterModel = {
        name: 'hard_quota',
        display_name: 'The Cloud Object Storage bucket quota.',
        description: 'The maximum bytes that are allocated to the Cloud Object Storage bucket.',
        type: 'numeric',
      };

      // Import
      const importModel = {
        parameters: [ruleParameterModel],
      };

      function __createRuleTest() {
        // Construct the params object for operation createRule
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const description = 'Example rule';
        const target = ruleTargetPrototypeModel;
        const requiredConfig = requiredConfigModel;
        const version = '1.0.0';
        const _import = importModel;
        const labels = [];
        const createRuleParams = {
          instanceId,
          description,
          target,
          requiredConfig,
          version,
          _import,
          labels,
        };

        const createRuleResult = securityAndComplianceCenterApiService.createRule(createRuleParams);

        // all methods should return a Promise
        expectToBePromise(createRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/rules', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.target).toEqual(target);
        expect(mockRequestOptions.body.required_config).toEqual(requiredConfig);
        expect(mockRequestOptions.body.version).toEqual(version);
        expect(mockRequestOptions.body.import).toEqual(_import);
        expect(mockRequestOptions.body.labels).toEqual(labels);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const description = 'Example rule';
        const target = ruleTargetPrototypeModel;
        const requiredConfig = requiredConfigModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createRuleParams = {
          instanceId,
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

  describe('getRule', () => {
    describe('positive tests', () => {
      function __getRuleTest() {
        // Construct the params object for operation getRule
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const ruleId = 'testString';
        const getRuleParams = {
          instanceId,
          ruleId,
        };

        const getRuleResult = securityAndComplianceCenterApiService.getRule(getRuleParams);

        // all methods should return a Promise
        expectToBePromise(getRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/rules/{rule_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const ruleId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getRuleParams = {
          instanceId,
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

      // RuleTargetPrototype
      const ruleTargetPrototypeModel = {
        service_name: 'cloud-object-storage',
        resource_kind: 'bucket',
        additional_target_attributes: [additionalTargetAttributeModel],
      };

      // RequiredConfigConditionBase
      const requiredConfigModel = {
        description: 'The Cloud Object Storage rule.',
        property: 'testString',
        operator: 'string_equals',
        value: 'testString',
      };

      // RuleParameter
      const ruleParameterModel = {
        name: 'hard_quota',
        display_name: 'The Cloud Object Storage bucket quota.',
        description: 'The maximum bytes that are allocated to the Cloud Object Storage bucket.',
        type: 'numeric',
      };

      // Import
      const importModel = {
        parameters: [ruleParameterModel],
      };

      function __replaceRuleTest() {
        // Construct the params object for operation replaceRule
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const ruleId = 'testString';
        const ifMatch = 'testString';
        const description = 'Example rule';
        const target = ruleTargetPrototypeModel;
        const requiredConfig = requiredConfigModel;
        const version = '1.0.1';
        const _import = importModel;
        const labels = [];
        const replaceRuleParams = {
          instanceId,
          ruleId,
          ifMatch,
          description,
          target,
          requiredConfig,
          version,
          _import,
          labels,
        };

        const replaceRuleResult = securityAndComplianceCenterApiService.replaceRule(replaceRuleParams);

        // all methods should return a Promise
        expectToBePromise(replaceRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/rules/{rule_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.target).toEqual(target);
        expect(mockRequestOptions.body.required_config).toEqual(requiredConfig);
        expect(mockRequestOptions.body.version).toEqual(version);
        expect(mockRequestOptions.body.import).toEqual(_import);
        expect(mockRequestOptions.body.labels).toEqual(labels);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const ruleId = 'testString';
        const ifMatch = 'testString';
        const description = 'Example rule';
        const target = ruleTargetPrototypeModel;
        const requiredConfig = requiredConfigModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceRuleParams = {
          instanceId,
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

  describe('deleteRule', () => {
    describe('positive tests', () => {
      function __deleteRuleTest() {
        // Construct the params object for operation deleteRule
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const ruleId = 'testString';
        const deleteRuleParams = {
          instanceId,
          ruleId,
        };

        const deleteRuleResult = securityAndComplianceCenterApiService.deleteRule(deleteRuleParams);

        // all methods should return a Promise
        expectToBePromise(deleteRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/rules/{rule_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
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
        const instanceId = 'acd7032c-15a3-484f-bf5b-67d41534d940';
        const ruleId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteRuleParams = {
          instanceId,
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

  describe('listServices', () => {
    describe('positive tests', () => {
      function __listServicesTest() {
        // Construct the params object for operation listServices
        const listServicesParams = {};

        const listServicesResult = securityAndComplianceCenterApiService.listServices(listServicesParams);

        // all methods should return a Promise
        expectToBePromise(listServicesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v3/services', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listServicesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __listServicesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __listServicesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listServicesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.listServices(listServicesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        securityAndComplianceCenterApiService.listServices({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getService', () => {
    describe('positive tests', () => {
      function __getServiceTest() {
        // Construct the params object for operation getService
        const servicesName = 'cloud-object-storage';
        const getServiceParams = {
          servicesName,
        };

        const getServiceResult = securityAndComplianceCenterApiService.getService(getServiceParams);

        // all methods should return a Promise
        expectToBePromise(getServiceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v3/services/{services_name}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.services_name).toEqual(servicesName);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getServiceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.enableRetries();
        __getServiceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        securityAndComplianceCenterApiService.disableRetries();
        __getServiceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const servicesName = 'cloud-object-storage';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getServiceParams = {
          servicesName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        securityAndComplianceCenterApiService.getService(getServiceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.getService({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await securityAndComplianceCenterApiService.getService();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
