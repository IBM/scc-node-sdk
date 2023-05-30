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

const ComplianceV2 = require('../../compliance/v2');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
} = unitTestUtils;

const complianceServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'ibm.com/123456',
};

const complianceService = new ComplianceV2(complianceServiceOptions);

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(complianceService, 'createRequest');
    createRequestMock.mockImplementation(() => Promise.resolve());
  }
}

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(sdkCorePackage, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

describe('ComplianceV2', () => {

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
      const testInstance = ComplianceV2.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(ComplianceV2.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(ComplianceV2.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(ComplianceV2);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = ComplianceV2.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(ComplianceV2);
    });
  });

  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new ComplianceV2(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new ComplianceV2(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(ComplianceV2.DEFAULT_SERVICE_URL);
    });
  });

  describe('createProfile', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ProfileControlsInRequest
      const profileControlsInRequestModel = {
        control_library_id: 'testString',
        control_id: 'testString',
      };

      // DefaultParameters
      const defaultParametersModel = {
        assessment_type: 'testString',
        assessment_id: 'testString',
        parameter_name: 'testString',
        parameter_default_value: 'testString',
        parameter_display_name: 'testString',
        parameter_type: 'numeric',
      };

      function __createProfileTest() {
        // Construct the params object for operation createProfile
        const instanceId = 'testString';
        const profileName = 'testString';
        const profileDescription = 'testString';
        const profileType = 'predefined';
        const profileVersion = 'testString';
        const latest = true;
        const versionGroupLabel = 'testString';
        const controls = [profileControlsInRequestModel];
        const defaultParameters = [defaultParametersModel];
        const transactionId = 'testString';
        const createProfileParams = {
          instanceId,
          profileName,
          profileDescription,
          profileType,
          profileVersion,
          latest,
          versionGroupLabel,
          controls,
          defaultParameters,
          transactionId,
        };

        const createProfileResult = complianceService.createProfile(createProfileParams);

        // all methods should return a Promise
        expectToBePromise(createProfileResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/profiles', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.body.profile_name).toEqual(profileName);
        expect(mockRequestOptions.body.profile_description).toEqual(profileDescription);
        expect(mockRequestOptions.body.profile_type).toEqual(profileType);
        expect(mockRequestOptions.body.profile_version).toEqual(profileVersion);
        expect(mockRequestOptions.body.latest).toEqual(latest);
        expect(mockRequestOptions.body.version_group_label).toEqual(versionGroupLabel);
        expect(mockRequestOptions.body.controls).toEqual(controls);
        expect(mockRequestOptions.body.default_parameters).toEqual(defaultParameters);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createProfileTest();

        // enable retries and test again
        createRequestMock.mockClear();
        complianceService.enableRetries();
        __createProfileTest();

        // disable retries and test again
        createRequestMock.mockClear();
        complianceService.disableRetries();
        __createProfileTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createProfileParams = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        complianceService.createProfile(createProfileParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await complianceService.createProfile({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await complianceService.createProfile();
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
        const instanceId = 'testString';
        const transactionId = 'testString';
        const listProfilesParams = {
          instanceId,
          transactionId,
        };

        const listProfilesResult = complianceService.listProfiles(listProfilesParams);

        // all methods should return a Promise
        expectToBePromise(listProfilesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/profiles', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listProfilesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        complianceService.enableRetries();
        __listProfilesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        complianceService.disableRetries();
        __listProfilesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listProfilesParams = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        complianceService.listProfiles(listProfilesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await complianceService.listProfiles({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await complianceService.listProfiles();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('addProfile', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ProfileControlsInRequest
      const profileControlsInRequestModel = {
        control_library_id: 'testString',
        control_id: 'testString',
      };

      // DefaultParameters
      const defaultParametersModel = {
        assessment_type: 'testString',
        assessment_id: 'testString',
        parameter_name: 'testString',
        parameter_default_value: 'testString',
        parameter_display_name: 'testString',
        parameter_type: 'numeric',
      };

      function __addProfileTest() {
        // Construct the params object for operation addProfile
        const profilesId = 'testString';
        const instanceId = 'testString';
        const profileName = 'testString';
        const profileDescription = 'testString';
        const profileType = 'predefined';
        const profileVersion = 'testString';
        const latest = true;
        const versionGroupLabel = 'testString';
        const controls = [profileControlsInRequestModel];
        const defaultParameters = [defaultParametersModel];
        const transactionId = 'testString';
        const addProfileParams = {
          profilesId,
          instanceId,
          profileName,
          profileDescription,
          profileType,
          profileVersion,
          latest,
          versionGroupLabel,
          controls,
          defaultParameters,
          transactionId,
        };

        const addProfileResult = complianceService.addProfile(addProfileParams);

        // all methods should return a Promise
        expectToBePromise(addProfileResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/profiles/{profiles_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.body.profile_name).toEqual(profileName);
        expect(mockRequestOptions.body.profile_description).toEqual(profileDescription);
        expect(mockRequestOptions.body.profile_type).toEqual(profileType);
        expect(mockRequestOptions.body.profile_version).toEqual(profileVersion);
        expect(mockRequestOptions.body.latest).toEqual(latest);
        expect(mockRequestOptions.body.version_group_label).toEqual(versionGroupLabel);
        expect(mockRequestOptions.body.controls).toEqual(controls);
        expect(mockRequestOptions.body.default_parameters).toEqual(defaultParameters);
        expect(mockRequestOptions.path.profiles_id).toEqual(profilesId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __addProfileTest();

        // enable retries and test again
        createRequestMock.mockClear();
        complianceService.enableRetries();
        __addProfileTest();

        // disable retries and test again
        createRequestMock.mockClear();
        complianceService.disableRetries();
        __addProfileTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const profilesId = 'testString';
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const addProfileParams = {
          profilesId,
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        complianceService.addProfile(addProfileParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await complianceService.addProfile({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await complianceService.addProfile();
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
        const instanceId = 'testString';
        const transactionId = 'testString';
        const getProfileParams = {
          profilesId,
          instanceId,
          transactionId,
        };

        const getProfileResult = complianceService.getProfile(getProfileParams);

        // all methods should return a Promise
        expectToBePromise(getProfileResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/profiles/{profiles_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.path.profiles_id).toEqual(profilesId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getProfileTest();

        // enable retries and test again
        createRequestMock.mockClear();
        complianceService.enableRetries();
        __getProfileTest();

        // disable retries and test again
        createRequestMock.mockClear();
        complianceService.disableRetries();
        __getProfileTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const profilesId = 'testString';
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getProfileParams = {
          profilesId,
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        complianceService.getProfile(getProfileParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await complianceService.getProfile({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await complianceService.getProfile();
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
        const instanceId = 'testString';
        const transactionId = 'testString';
        const deleteCustomProfileParams = {
          profilesId,
          instanceId,
          transactionId,
        };

        const deleteCustomProfileResult = complianceService.deleteCustomProfile(deleteCustomProfileParams);

        // all methods should return a Promise
        expectToBePromise(deleteCustomProfileResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/profiles/{profiles_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.path.profiles_id).toEqual(profilesId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteCustomProfileTest();

        // enable retries and test again
        createRequestMock.mockClear();
        complianceService.enableRetries();
        __deleteCustomProfileTest();

        // disable retries and test again
        createRequestMock.mockClear();
        complianceService.disableRetries();
        __deleteCustomProfileTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const profilesId = 'testString';
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteCustomProfileParams = {
          profilesId,
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        complianceService.deleteCustomProfile(deleteCustomProfileParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await complianceService.deleteCustomProfile({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await complianceService.deleteCustomProfile();
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
        parameter_type: 'numeric',
      };

      function __replaceProfileParametersTest() {
        // Construct the params object for operation replaceProfileParameters
        const profilesId = 'testString';
        const instanceId = 'testString';
        const id = 'testString';
        const defaultParameters = [defaultParametersModel];
        const transactionId = 'testString';
        const replaceProfileParametersParams = {
          profilesId,
          instanceId,
          id,
          defaultParameters,
          transactionId,
        };

        const replaceProfileParametersResult = complianceService.replaceProfileParameters(replaceProfileParametersParams);

        // all methods should return a Promise
        expectToBePromise(replaceProfileParametersResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/profiles/{profiles_id}/parameters', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.body.id).toEqual(id);
        expect(mockRequestOptions.body.default_parameters).toEqual(defaultParameters);
        expect(mockRequestOptions.path.profiles_id).toEqual(profilesId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replaceProfileParametersTest();

        // enable retries and test again
        createRequestMock.mockClear();
        complianceService.enableRetries();
        __replaceProfileParametersTest();

        // disable retries and test again
        createRequestMock.mockClear();
        complianceService.disableRetries();
        __replaceProfileParametersTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const profilesId = 'testString';
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceProfileParametersParams = {
          profilesId,
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        complianceService.replaceProfileParameters(replaceProfileParametersParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await complianceService.replaceProfileParameters({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await complianceService.replaceProfileParameters();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createAttachment', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ScopePayload
      const scopePayloadModel = {
        scope_id: 'testString',
        scope_type: 'testString',
      };

      // ParameterInfo
      const parameterInfoModel = {
        parameter_name: 'testString',
        parameter_display_name: 'testString',
        parameter_type: 'numeric',
      };

      // ParameterDetails
      const parameterDetailsModel = {
        parameter_name: 'testString',
        parameter_display_name: 'testString',
        parameter_type: 'numeric',
        parameter_value: 'testString',
        assessment_type: 'testString',
        assessment_id: 'testString',
        parameters: [parameterInfoModel],
      };

      // FailedControls
      const failedControlsModel = {
        threshold_limit: 38,
        failed_control_ids: ['testString'],
      };

      // AttachmentsNotificationsPayload
      const attachmentsNotificationsPayloadModel = {
        enabled: true,
        controls: failedControlsModel,
      };

      // AttachmentPayload
      const attachmentPayloadModel = {
        id: 'testString',
        account_id: 'testString',
        included_scope: scopePayloadModel,
        exclusions: [scopePayloadModel],
        created_by: 'testString',
        created_on: 'testString',
        updated_by: 'testString',
        updated_on: 'testString',
        status: 'enabled',
        attachment_parameters: [parameterDetailsModel],
        attachment_notifications: attachmentsNotificationsPayloadModel,
      };

      function __createAttachmentTest() {
        // Construct the params object for operation createAttachment
        const profilesId = 'testString';
        const instanceId = 'testString';
        const attachments = [attachmentPayloadModel];
        const transactionId = 'testString';
        const createAttachmentParams = {
          profilesId,
          instanceId,
          attachments,
          transactionId,
        };

        const createAttachmentResult = complianceService.createAttachment(createAttachmentParams);

        // all methods should return a Promise
        expectToBePromise(createAttachmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/profiles/{profiles_id}/attachments', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.body.attachments).toEqual(attachments);
        expect(mockRequestOptions.path.profiles_id).toEqual(profilesId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createAttachmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        complianceService.enableRetries();
        __createAttachmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        complianceService.disableRetries();
        __createAttachmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const profilesId = 'testString';
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createAttachmentParams = {
          profilesId,
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        complianceService.createAttachment(createAttachmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await complianceService.createAttachment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await complianceService.createAttachment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('checkProfileAttachmnets', () => {
    describe('positive tests', () => {
      function __checkProfileAttachmnetsTest() {
        // Construct the params object for operation checkProfileAttachmnets
        const profilesId = 'testString';
        const instanceId = 'testString';
        const transactionId = 'testString';
        const checkProfileAttachmnetsParams = {
          profilesId,
          instanceId,
          transactionId,
        };

        const checkProfileAttachmnetsResult = complianceService.checkProfileAttachmnets(checkProfileAttachmnetsParams);

        // all methods should return a Promise
        expectToBePromise(checkProfileAttachmnetsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/profiles/{profiles_id}/attachments', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.path.profiles_id).toEqual(profilesId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __checkProfileAttachmnetsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        complianceService.enableRetries();
        __checkProfileAttachmnetsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        complianceService.disableRetries();
        __checkProfileAttachmnetsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const profilesId = 'testString';
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const checkProfileAttachmnetsParams = {
          profilesId,
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        complianceService.checkProfileAttachmnets(checkProfileAttachmnetsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await complianceService.checkProfileAttachmnets({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await complianceService.checkProfileAttachmnets();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getProfileAttachmnet', () => {
    describe('positive tests', () => {
      function __getProfileAttachmnetTest() {
        // Construct the params object for operation getProfileAttachmnet
        const profilesId = 'testString';
        const attachmentId = 'testString';
        const instanceId = 'testString';
        const transactionId = 'testString';
        const getProfileAttachmnetParams = {
          profilesId,
          attachmentId,
          instanceId,
          transactionId,
        };

        const getProfileAttachmnetResult = complianceService.getProfileAttachmnet(getProfileAttachmnetParams);

        // all methods should return a Promise
        expectToBePromise(getProfileAttachmnetResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/profiles/{profiles_id}/attachments/{attachment_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.path.profiles_id).toEqual(profilesId);
        expect(mockRequestOptions.path.attachment_id).toEqual(attachmentId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getProfileAttachmnetTest();

        // enable retries and test again
        createRequestMock.mockClear();
        complianceService.enableRetries();
        __getProfileAttachmnetTest();

        // disable retries and test again
        createRequestMock.mockClear();
        complianceService.disableRetries();
        __getProfileAttachmnetTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const profilesId = 'testString';
        const attachmentId = 'testString';
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getProfileAttachmnetParams = {
          profilesId,
          attachmentId,
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        complianceService.getProfileAttachmnet(getProfileAttachmnetParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await complianceService.getProfileAttachmnet({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await complianceService.getProfileAttachmnet();
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

      // ScopePayload
      const scopePayloadModel = {
        scope_id: 'testString',
        scope_type: 'testString',
      };

      // ParameterInfo
      const parameterInfoModel = {
        parameter_name: 'testString',
        parameter_display_name: 'testString',
        parameter_type: 'numeric',
      };

      // ParameterDetails
      const parameterDetailsModel = {
        parameter_name: 'testString',
        parameter_display_name: 'testString',
        parameter_type: 'numeric',
        parameter_value: 'testString',
        assessment_type: 'testString',
        assessment_id: 'testString',
        parameters: [parameterInfoModel],
      };

      // FailedControls
      const failedControlsModel = {
        threshold_limit: 38,
        failed_control_ids: ['testString'],
      };

      // AttachmentsNotificationsPayload
      const attachmentsNotificationsPayloadModel = {
        enabled: true,
        controls: failedControlsModel,
      };

      function __replaceProfileAttachmentTest() {
        // Construct the params object for operation replaceProfileAttachment
        const profilesId = 'testString';
        const attachmentId = 'testString';
        const instanceId = 'testString';
        const id = 'testString';
        const accountId = 'testString';
        const includedScope = scopePayloadModel;
        const exclusions = [scopePayloadModel];
        const createdBy = 'testString';
        const createdOn = 'testString';
        const updatedBy = 'testString';
        const updatedOn = 'testString';
        const status = 'enabled';
        const attachmentParameters = [parameterDetailsModel];
        const attachmentNotifications = attachmentsNotificationsPayloadModel;
        const transactionId = 'testString';
        const replaceProfileAttachmentParams = {
          profilesId,
          attachmentId,
          instanceId,
          id,
          accountId,
          includedScope,
          exclusions,
          createdBy,
          createdOn,
          updatedBy,
          updatedOn,
          status,
          attachmentParameters,
          attachmentNotifications,
          transactionId,
        };

        const replaceProfileAttachmentResult = complianceService.replaceProfileAttachment(replaceProfileAttachmentParams);

        // all methods should return a Promise
        expectToBePromise(replaceProfileAttachmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/profiles/{profiles_id}/attachments/{attachment_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.body.id).toEqual(id);
        expect(mockRequestOptions.body.account_id).toEqual(accountId);
        expect(mockRequestOptions.body.included_scope).toEqual(includedScope);
        expect(mockRequestOptions.body.exclusions).toEqual(exclusions);
        expect(mockRequestOptions.body.created_by).toEqual(createdBy);
        expect(mockRequestOptions.body.created_on).toEqual(createdOn);
        expect(mockRequestOptions.body.updated_by).toEqual(updatedBy);
        expect(mockRequestOptions.body.updated_on).toEqual(updatedOn);
        expect(mockRequestOptions.body.status).toEqual(status);
        expect(mockRequestOptions.body.attachment_parameters).toEqual(attachmentParameters);
        expect(mockRequestOptions.body.attachment_notifications).toEqual(attachmentNotifications);
        expect(mockRequestOptions.path.profiles_id).toEqual(profilesId);
        expect(mockRequestOptions.path.attachment_id).toEqual(attachmentId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replaceProfileAttachmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        complianceService.enableRetries();
        __replaceProfileAttachmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        complianceService.disableRetries();
        __replaceProfileAttachmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const profilesId = 'testString';
        const attachmentId = 'testString';
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceProfileAttachmentParams = {
          profilesId,
          attachmentId,
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        complianceService.replaceProfileAttachment(replaceProfileAttachmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await complianceService.replaceProfileAttachment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await complianceService.replaceProfileAttachment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteProfileAttachmnet', () => {
    describe('positive tests', () => {
      function __deleteProfileAttachmnetTest() {
        // Construct the params object for operation deleteProfileAttachmnet
        const profilesId = 'testString';
        const attachmentId = 'testString';
        const instanceId = 'testString';
        const transactionId = 'testString';
        const deleteProfileAttachmnetParams = {
          profilesId,
          attachmentId,
          instanceId,
          transactionId,
        };

        const deleteProfileAttachmnetResult = complianceService.deleteProfileAttachmnet(deleteProfileAttachmnetParams);

        // all methods should return a Promise
        expectToBePromise(deleteProfileAttachmnetResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/profiles/{profiles_id}/attachments/{attachment_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.path.profiles_id).toEqual(profilesId);
        expect(mockRequestOptions.path.attachment_id).toEqual(attachmentId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteProfileAttachmnetTest();

        // enable retries and test again
        createRequestMock.mockClear();
        complianceService.enableRetries();
        __deleteProfileAttachmnetTest();

        // disable retries and test again
        createRequestMock.mockClear();
        complianceService.disableRetries();
        __deleteProfileAttachmnetTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const profilesId = 'testString';
        const attachmentId = 'testString';
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteProfileAttachmnetParams = {
          profilesId,
          attachmentId,
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        complianceService.deleteProfileAttachmnet(deleteProfileAttachmnetParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await complianceService.deleteProfileAttachmnet({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await complianceService.deleteProfileAttachmnet();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listAttachmentParameters', () => {
    describe('positive tests', () => {
      function __listAttachmentParametersTest() {
        // Construct the params object for operation listAttachmentParameters
        const profilesId = 'testString';
        const attachmentId = 'testString';
        const instanceId = 'testString';
        const transactionId = 'testString';
        const listAttachmentParametersParams = {
          profilesId,
          attachmentId,
          instanceId,
          transactionId,
        };

        const listAttachmentParametersResult = complianceService.listAttachmentParameters(listAttachmentParametersParams);

        // all methods should return a Promise
        expectToBePromise(listAttachmentParametersResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/profiles/{profiles_id}/attachments/{attachment_id}/parameters', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.path.profiles_id).toEqual(profilesId);
        expect(mockRequestOptions.path.attachment_id).toEqual(attachmentId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listAttachmentParametersTest();

        // enable retries and test again
        createRequestMock.mockClear();
        complianceService.enableRetries();
        __listAttachmentParametersTest();

        // disable retries and test again
        createRequestMock.mockClear();
        complianceService.disableRetries();
        __listAttachmentParametersTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const profilesId = 'testString';
        const attachmentId = 'testString';
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listAttachmentParametersParams = {
          profilesId,
          attachmentId,
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        complianceService.listAttachmentParameters(listAttachmentParametersParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await complianceService.listAttachmentParameters({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await complianceService.listAttachmentParameters();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('replaceAttachment', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ParameterInfo
      const parameterInfoModel = {
        parameter_name: 'testString',
        parameter_display_name: 'testString',
        parameter_type: 'numeric',
      };

      function __replaceAttachmentTest() {
        // Construct the params object for operation replaceAttachment
        const profilesId = 'testString';
        const attachmentId = 'testString';
        const instanceId = 'testString';
        const parameterName = 'testString';
        const parameterDisplayName = 'testString';
        const parameterType = 'numeric';
        const parameterValue = 'testString';
        const assessmentType = 'testString';
        const assessmentId = 'testString';
        const parameters = [parameterInfoModel];
        const transactionId = 'testString';
        const replaceAttachmentParams = {
          profilesId,
          attachmentId,
          instanceId,
          parameterName,
          parameterDisplayName,
          parameterType,
          parameterValue,
          assessmentType,
          assessmentId,
          parameters,
          transactionId,
        };

        const replaceAttachmentResult = complianceService.replaceAttachment(replaceAttachmentParams);

        // all methods should return a Promise
        expectToBePromise(replaceAttachmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/profiles/{profiles_id}/attachments/{attachment_id}/parameters', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.body.parameter_name).toEqual(parameterName);
        expect(mockRequestOptions.body.parameter_display_name).toEqual(parameterDisplayName);
        expect(mockRequestOptions.body.parameter_type).toEqual(parameterType);
        expect(mockRequestOptions.body.parameter_value).toEqual(parameterValue);
        expect(mockRequestOptions.body.assessment_type).toEqual(assessmentType);
        expect(mockRequestOptions.body.assessment_id).toEqual(assessmentId);
        expect(mockRequestOptions.body.parameters).toEqual(parameters);
        expect(mockRequestOptions.path.profiles_id).toEqual(profilesId);
        expect(mockRequestOptions.path.attachment_id).toEqual(attachmentId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replaceAttachmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        complianceService.enableRetries();
        __replaceAttachmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        complianceService.disableRetries();
        __replaceAttachmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const profilesId = 'testString';
        const attachmentId = 'testString';
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceAttachmentParams = {
          profilesId,
          attachmentId,
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        complianceService.replaceAttachment(replaceAttachmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await complianceService.replaceAttachment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await complianceService.replaceAttachment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getParametersByName', () => {
    describe('positive tests', () => {
      function __getParametersByNameTest() {
        // Construct the params object for operation getParametersByName
        const profilesId = 'testString';
        const attachmentId = 'testString';
        const parameterName = 'testString';
        const instanceId = 'testString';
        const transactionId = 'testString';
        const getParametersByNameParams = {
          profilesId,
          attachmentId,
          parameterName,
          instanceId,
          transactionId,
        };

        const getParametersByNameResult = complianceService.getParametersByName(getParametersByNameParams);

        // all methods should return a Promise
        expectToBePromise(getParametersByNameResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/profiles/{profiles_id}/attachments/{attachment_id}/parameters/{parameter_name}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.path.profiles_id).toEqual(profilesId);
        expect(mockRequestOptions.path.attachment_id).toEqual(attachmentId);
        expect(mockRequestOptions.path.parameter_name).toEqual(parameterName);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getParametersByNameTest();

        // enable retries and test again
        createRequestMock.mockClear();
        complianceService.enableRetries();
        __getParametersByNameTest();

        // disable retries and test again
        createRequestMock.mockClear();
        complianceService.disableRetries();
        __getParametersByNameTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const profilesId = 'testString';
        const attachmentId = 'testString';
        const parameterName = 'testString';
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getParametersByNameParams = {
          profilesId,
          attachmentId,
          parameterName,
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        complianceService.getParametersByName(getParametersByNameParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await complianceService.getParametersByName({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await complianceService.getParametersByName();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('replaceAttachmnetParametersByName', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ParameterInfo
      const parameterInfoModel = {
        parameter_name: 'testString',
        parameter_display_name: 'testString',
        parameter_type: 'numeric',
      };

      function __replaceAttachmnetParametersByNameTest() {
        // Construct the params object for operation replaceAttachmnetParametersByName
        const profilesId = 'testString';
        const attachmentId = 'testString';
        const parameterName = 'testString';
        const instanceId = 'testString';
        const newParameterName = 'testString';
        const newParameterDisplayName = 'testString';
        const newParameterType = 'numeric';
        const newParameterValue = 'testString';
        const newAssessmentType = 'testString';
        const newAssessmentId = 'testString';
        const newParameters = [parameterInfoModel];
        const transactionId = 'testString';
        const replaceAttachmnetParametersByNameParams = {
          profilesId,
          attachmentId,
          parameterName,
          instanceId,
          newParameterName,
          newParameterDisplayName,
          newParameterType,
          newParameterValue,
          newAssessmentType,
          newAssessmentId,
          newParameters,
          transactionId,
        };

        const replaceAttachmnetParametersByNameResult = complianceService.replaceAttachmnetParametersByName(replaceAttachmnetParametersByNameParams);

        // all methods should return a Promise
        expectToBePromise(replaceAttachmnetParametersByNameResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/profiles/{profiles_id}/attachments/{attachment_id}/parameters/{parameter_name}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.body.parameter_name).toEqual(newParameterName);
        expect(mockRequestOptions.body.parameter_display_name).toEqual(newParameterDisplayName);
        expect(mockRequestOptions.body.parameter_type).toEqual(newParameterType);
        expect(mockRequestOptions.body.parameter_value).toEqual(newParameterValue);
        expect(mockRequestOptions.body.assessment_type).toEqual(newAssessmentType);
        expect(mockRequestOptions.body.assessment_id).toEqual(newAssessmentId);
        expect(mockRequestOptions.body.parameters).toEqual(newParameters);
        expect(mockRequestOptions.path.profiles_id).toEqual(profilesId);
        expect(mockRequestOptions.path.attachment_id).toEqual(attachmentId);
        expect(mockRequestOptions.path.parameter_name).toEqual(parameterName);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replaceAttachmnetParametersByNameTest();

        // enable retries and test again
        createRequestMock.mockClear();
        complianceService.enableRetries();
        __replaceAttachmnetParametersByNameTest();

        // disable retries and test again
        createRequestMock.mockClear();
        complianceService.disableRetries();
        __replaceAttachmnetParametersByNameTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const profilesId = 'testString';
        const attachmentId = 'testString';
        const parameterName = 'testString';
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceAttachmnetParametersByNameParams = {
          profilesId,
          attachmentId,
          parameterName,
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        complianceService.replaceAttachmnetParametersByName(replaceAttachmnetParametersByNameParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await complianceService.replaceAttachmnetParametersByName({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await complianceService.replaceAttachmnetParametersByName();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createCustomControlLibrary', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ParameterInfo
      const parameterInfoModel = {
        parameter_name: 'testString',
        parameter_display_name: 'testString',
        parameter_type: 'numeric',
      };

      // ImplementationPayload
      const implementationPayloadModel = {
        assessment_id: 'testString',
        assessment_method: 'testString',
        assessment_type: 'testString',
        assessment_description: 'testString',
        parameter_count: 38,
        parameters: [parameterInfoModel],
      };

      // ControlSpecifications
      const controlSpecificationsModel = {
        id: 'testString',
        responsibility: 'user',
        component_id: 'testString',
        environment: 'testString',
        description: 'testString',
        assessments_count: 38,
        assessments: [implementationPayloadModel],
      };

      // ControlDocs
      const controlDocsModel = {
        control_docs_id: 'testString',
        control_docs_type: 'testString',
      };

      // ControlsInControlLibRequestPayload
      const controlsInControlLibRequestPayloadModel = {
        control_name: 'testString',
        control_id: 'testString',
        control_description: 'testString',
        control_category: 'testString',
        control_parent: 'testString',
        control_severity: 'testString',
        control_tags: ['testString'],
        control_specifications: [controlSpecificationsModel],
        control_docs: controlDocsModel,
        status: 'enabled',
      };

      function __createCustomControlLibraryTest() {
        // Construct the params object for operation createCustomControlLibrary
        const instanceId = 'testString';
        const id = 'testString';
        const accountId = 'testString';
        const controlLibraryName = 'testString';
        const controlLibraryDescription = 'testString';
        const controlLibraryType = 'predefined';
        const versionGroupLabel = 'testString';
        const controlLibraryVersion = 'testString';
        const latest = true;
        const controlsCount = 38;
        const controls = [controlsInControlLibRequestPayloadModel];
        const transactionId = 'testString';
        const createCustomControlLibraryParams = {
          instanceId,
          id,
          accountId,
          controlLibraryName,
          controlLibraryDescription,
          controlLibraryType,
          versionGroupLabel,
          controlLibraryVersion,
          latest,
          controlsCount,
          controls,
          transactionId,
        };

        const createCustomControlLibraryResult = complianceService.createCustomControlLibrary(createCustomControlLibraryParams);

        // all methods should return a Promise
        expectToBePromise(createCustomControlLibraryResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/control_libraries', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.body.id).toEqual(id);
        expect(mockRequestOptions.body.account_id).toEqual(accountId);
        expect(mockRequestOptions.body.control_library_name).toEqual(controlLibraryName);
        expect(mockRequestOptions.body.control_library_description).toEqual(controlLibraryDescription);
        expect(mockRequestOptions.body.control_library_type).toEqual(controlLibraryType);
        expect(mockRequestOptions.body.version_group_label).toEqual(versionGroupLabel);
        expect(mockRequestOptions.body.control_library_version).toEqual(controlLibraryVersion);
        expect(mockRequestOptions.body.latest).toEqual(latest);
        expect(mockRequestOptions.body.controls_count).toEqual(controlsCount);
        expect(mockRequestOptions.body.controls).toEqual(controls);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createCustomControlLibraryTest();

        // enable retries and test again
        createRequestMock.mockClear();
        complianceService.enableRetries();
        __createCustomControlLibraryTest();

        // disable retries and test again
        createRequestMock.mockClear();
        complianceService.disableRetries();
        __createCustomControlLibraryTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createCustomControlLibraryParams = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        complianceService.createCustomControlLibrary(createCustomControlLibraryParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await complianceService.createCustomControlLibrary({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await complianceService.createCustomControlLibrary();
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
        const instanceId = 'testString';
        const transactionId = 'testString';
        const listControlLibrariesParams = {
          instanceId,
          transactionId,
        };

        const listControlLibrariesResult = complianceService.listControlLibraries(listControlLibrariesParams);

        // all methods should return a Promise
        expectToBePromise(listControlLibrariesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/control_libraries', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listControlLibrariesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        complianceService.enableRetries();
        __listControlLibrariesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        complianceService.disableRetries();
        __listControlLibrariesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listControlLibrariesParams = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        complianceService.listControlLibraries(listControlLibrariesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await complianceService.listControlLibraries({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await complianceService.listControlLibraries();
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
        parameter_name: 'testString',
        parameter_display_name: 'testString',
        parameter_type: 'numeric',
      };

      // ImplementationPayload
      const implementationPayloadModel = {
        assessment_id: 'testString',
        assessment_method: 'testString',
        assessment_type: 'testString',
        assessment_description: 'testString',
        parameter_count: 38,
        parameters: [parameterInfoModel],
      };

      // ControlSpecifications
      const controlSpecificationsModel = {
        id: 'testString',
        responsibility: 'user',
        component_id: 'testString',
        environment: 'testString',
        description: 'testString',
        assessments_count: 38,
        assessments: [implementationPayloadModel],
      };

      // ControlDocs
      const controlDocsModel = {
        control_docs_id: 'testString',
        control_docs_type: 'testString',
      };

      // ControlsInControlLibRequestPayload
      const controlsInControlLibRequestPayloadModel = {
        control_name: 'testString',
        control_id: 'testString',
        control_description: 'testString',
        control_category: 'testString',
        control_parent: 'testString',
        control_severity: 'testString',
        control_tags: ['testString'],
        control_specifications: [controlSpecificationsModel],
        control_docs: controlDocsModel,
        status: 'enabled',
      };

      function __replaceCustomControlLibraryTest() {
        // Construct the params object for operation replaceCustomControlLibrary
        const controlLibrariesId = 'testString';
        const instanceId = 'testString';
        const id = 'testString';
        const accountId = 'testString';
        const controlLibraryName = 'testString';
        const controlLibraryDescription = 'testString';
        const controlLibraryType = 'predefined';
        const versionGroupLabel = 'testString';
        const controlLibraryVersion = 'testString';
        const latest = true;
        const controlsCount = 38;
        const controls = [controlsInControlLibRequestPayloadModel];
        const transactionId = 'testString';
        const replaceCustomControlLibraryParams = {
          controlLibrariesId,
          instanceId,
          id,
          accountId,
          controlLibraryName,
          controlLibraryDescription,
          controlLibraryType,
          versionGroupLabel,
          controlLibraryVersion,
          latest,
          controlsCount,
          controls,
          transactionId,
        };

        const replaceCustomControlLibraryResult = complianceService.replaceCustomControlLibrary(replaceCustomControlLibraryParams);

        // all methods should return a Promise
        expectToBePromise(replaceCustomControlLibraryResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/control_libraries/{control_libraries_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.body.id).toEqual(id);
        expect(mockRequestOptions.body.account_id).toEqual(accountId);
        expect(mockRequestOptions.body.control_library_name).toEqual(controlLibraryName);
        expect(mockRequestOptions.body.control_library_description).toEqual(controlLibraryDescription);
        expect(mockRequestOptions.body.control_library_type).toEqual(controlLibraryType);
        expect(mockRequestOptions.body.version_group_label).toEqual(versionGroupLabel);
        expect(mockRequestOptions.body.control_library_version).toEqual(controlLibraryVersion);
        expect(mockRequestOptions.body.latest).toEqual(latest);
        expect(mockRequestOptions.body.controls_count).toEqual(controlsCount);
        expect(mockRequestOptions.body.controls).toEqual(controls);
        expect(mockRequestOptions.path.control_libraries_id).toEqual(controlLibrariesId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replaceCustomControlLibraryTest();

        // enable retries and test again
        createRequestMock.mockClear();
        complianceService.enableRetries();
        __replaceCustomControlLibraryTest();

        // disable retries and test again
        createRequestMock.mockClear();
        complianceService.disableRetries();
        __replaceCustomControlLibraryTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const controlLibrariesId = 'testString';
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceCustomControlLibraryParams = {
          controlLibrariesId,
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        complianceService.replaceCustomControlLibrary(replaceCustomControlLibraryParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await complianceService.replaceCustomControlLibrary({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await complianceService.replaceCustomControlLibrary();
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
        const instanceId = 'testString';
        const transactionId = 'testString';
        const getControlLibraryParams = {
          controlLibrariesId,
          instanceId,
          transactionId,
        };

        const getControlLibraryResult = complianceService.getControlLibrary(getControlLibraryParams);

        // all methods should return a Promise
        expectToBePromise(getControlLibraryResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/control_libraries/{control_libraries_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.path.control_libraries_id).toEqual(controlLibrariesId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getControlLibraryTest();

        // enable retries and test again
        createRequestMock.mockClear();
        complianceService.enableRetries();
        __getControlLibraryTest();

        // disable retries and test again
        createRequestMock.mockClear();
        complianceService.disableRetries();
        __getControlLibraryTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const controlLibrariesId = 'testString';
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getControlLibraryParams = {
          controlLibrariesId,
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        complianceService.getControlLibrary(getControlLibraryParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await complianceService.getControlLibrary({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await complianceService.getControlLibrary();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteCustomControllibrary', () => {
    describe('positive tests', () => {
      function __deleteCustomControllibraryTest() {
        // Construct the params object for operation deleteCustomControllibrary
        const controlLibrariesId = 'testString';
        const instanceId = 'testString';
        const transactionId = 'testString';
        const deleteCustomControllibraryParams = {
          controlLibrariesId,
          instanceId,
          transactionId,
        };

        const deleteCustomControllibraryResult = complianceService.deleteCustomControllibrary(deleteCustomControllibraryParams);

        // all methods should return a Promise
        expectToBePromise(deleteCustomControllibraryResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/control_libraries/{control_libraries_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.path.control_libraries_id).toEqual(controlLibrariesId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteCustomControllibraryTest();

        // enable retries and test again
        createRequestMock.mockClear();
        complianceService.enableRetries();
        __deleteCustomControllibraryTest();

        // disable retries and test again
        createRequestMock.mockClear();
        complianceService.disableRetries();
        __deleteCustomControllibraryTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const controlLibrariesId = 'testString';
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteCustomControllibraryParams = {
          controlLibrariesId,
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        complianceService.deleteCustomControllibrary(deleteCustomControllibraryParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await complianceService.deleteCustomControllibrary({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await complianceService.deleteCustomControllibrary();
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
        const instanceId = 'testString';
        const attachmentId = 'testString';
        const transactionId = 'testString';
        const createScanParams = {
          instanceId,
          attachmentId,
          transactionId,
        };

        const createScanResult = complianceService.createScan(createScanParams);

        // all methods should return a Promise
        expectToBePromise(createScanResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/v3/scans', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.body.attachment_id).toEqual(attachmentId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createScanTest();

        // enable retries and test again
        createRequestMock.mockClear();
        complianceService.enableRetries();
        __createScanTest();

        // disable retries and test again
        createRequestMock.mockClear();
        complianceService.disableRetries();
        __createScanTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createScanParams = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        complianceService.createScan(createScanParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await complianceService.createScan({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await complianceService.createScan();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
