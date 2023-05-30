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

const ComplianceV2 = require('../../compliance/v2');
const { IamAuthenticator,readExternalSources } = require('ibm-cloud-sdk-core');
const authHelper = require('../resources/auth-helper.js');

// testcase timeout value (200s).
const timeout = 200000;

// Location of our config file.
const configFile = 'compliance_v2.env';

const describe = authHelper.prepareTests(configFile);

describe('ComplianceV2_integration', () => {
  jest.setTimeout(timeout);

  // Service instance
  let complianceService;

  test('Initialize service', async () => {

    const authenticator = new IamAuthenticator({
      apikey: 'testString',
      url: 'testString',
      authtype: 'testString'
    });

    options = {
      serviceName: 'testString',
      serviceUrl: 'testString',
      authenticator: authenticator
    }

    complianceService = ComplianceV2.newInstance(options);

    expect(complianceService).not.toBeNull();

    const config = readExternalSources(ComplianceV2.DEFAULT_SERVICE_NAME);
    expect(config).not.toBeNull();
  
    complianceService.enableRetries();
  });

  test('createProfile()', async () => {
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

    const params = {
      instanceId: 'testString',
      profileName: 'testString',
      profileDescription: 'testString',
      profileType: 'predefined',
      profileVersion: 'testString',
      latest: true,
      versionGroupLabel: 'testString',
      controls: [profileControlsInRequestModel],
      defaultParameters: [defaultParametersModel],
      transactionId: 'testString',
    };

    const res = await complianceService.createProfile(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listProfiles()', async () => {
    const params = {
      instanceId: 'testString',
      transactionId: 'testString',
    };

    const res = await complianceService.listProfiles(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('addProfile()', async () => {
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

    const params = {
      profilesId: 'testString',
      instanceId: 'testString',
      profileName: 'testString',
      profileDescription: 'testString',
      profileType: 'predefined',
      profileVersion: 'testString',
      latest: true,
      versionGroupLabel: 'testString',
      controls: [profileControlsInRequestModel],
      defaultParameters: [defaultParametersModel],
      transactionId: 'testString',
    };

    const res = await complianceService.addProfile(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getProfile()', async () => {
    const params = {
      profilesId: 'testString',
      instanceId: 'testString',
      transactionId: 'testString',
    };

    const res = await complianceService.getProfile(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('replaceProfileParameters()', async () => {
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

    const params = {
      profilesId: 'testString',
      instanceId: 'testString',
      id: 'testString',
      defaultParameters: [defaultParametersModel],
      transactionId: 'testString',
    };

    const res = await complianceService.replaceProfileParameters(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createAttachment()', async () => {
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

    const params = {
      profilesId: 'testString',
      instanceId: 'testString',
      attachments: [attachmentPayloadModel],
      transactionId: 'testString',
    };

    const res = await complianceService.createAttachment(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('checkProfileAttachmnets()', async () => {
    const params = {
      profilesId: 'testString',
      instanceId: 'testString',
      transactionId: 'testString',
    };

    const res = await complianceService.checkProfileAttachmnets(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getProfileAttachmnet()', async () => {
    const params = {
      profilesId: 'testString',
      attachmentId: 'testString',
      instanceId: 'testString',
      transactionId: 'testString',
    };

    const res = await complianceService.getProfileAttachmnet(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('replaceProfileAttachment()', async () => {
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

    const params = {
      profilesId: 'testString',
      attachmentId: 'testString',
      instanceId: 'testString',
      id: 'testString',
      accountId: 'testString',
      includedScope: scopePayloadModel,
      exclusions: [scopePayloadModel],
      createdBy: 'testString',
      createdOn: 'testString',
      updatedBy: 'testString',
      updatedOn: 'testString',
      status: 'enabled',
      attachmentParameters: [parameterDetailsModel],
      attachmentNotifications: attachmentsNotificationsPayloadModel,
      transactionId: 'testString',
    };

    const res = await complianceService.replaceProfileAttachment(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listAttachmentParameters()', async () => {
    const params = {
      profilesId: 'testString',
      attachmentId: 'testString',
      instanceId: 'testString',
      transactionId: 'testString',
    };

    const res = await complianceService.listAttachmentParameters(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('replaceAttachment()', async () => {
    // Request models needed by this operation.

    // ParameterInfo
    const parameterInfoModel = {
      parameter_name: 'testString',
      parameter_display_name: 'testString',
      parameter_type: 'numeric',
    };

    const params = {
      profilesId: 'testString',
      attachmentId: 'testString',
      instanceId: 'testString',
      parameterName: 'testString',
      parameterDisplayName: 'testString',
      parameterType: 'numeric',
      parameterValue: 'testString',
      assessmentType: 'testString',
      assessmentId: 'testString',
      parameters: [parameterInfoModel],
      transactionId: 'testString',
    };

    const res = await complianceService.replaceAttachment(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getParametersByName()', async () => {
    const params = {
      profilesId: 'testString',
      attachmentId: 'testString',
      parameterName: 'testString',
      instanceId: 'testString',
      transactionId: 'testString',
    };

    const res = await complianceService.getParametersByName(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('replaceAttachmnetParametersByName()', async () => {
    // Request models needed by this operation.

    // ParameterInfo
    const parameterInfoModel = {
      parameter_name: 'testString',
      parameter_display_name: 'testString',
      parameter_type: 'numeric',
    };

    const params = {
      profilesId: 'testString',
      attachmentId: 'testString',
      parameterName: 'testString',
      instanceId: 'testString',
      newParameterName: 'testString',
      newParameterDisplayName: 'testString',
      newParameterType: 'numeric',
      newParameterValue: 'testString',
      newAssessmentType: 'testString',
      newAssessmentId: 'testString',
      newParameters: [parameterInfoModel],
      transactionId: 'testString',
    };

    const res = await complianceService.replaceAttachmnetParametersByName(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createCustomControlLibrary()', async () => {
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

    const params = {
      instanceId: 'testString',
      id: 'testString',
      accountId: 'testString',
      controlLibraryName: 'testString',
      controlLibraryDescription: 'testString',
      controlLibraryType: 'predefined',
      versionGroupLabel: 'testString',
      controlLibraryVersion: 'testString',
      latest: true,
      controlsCount: 38,
      controls: [controlsInControlLibRequestPayloadModel],
      transactionId: 'testString',
    };

    const res = await complianceService.createCustomControlLibrary(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listControlLibraries()', async () => {
    const params = {
      instanceId: 'testString',
      transactionId: 'testString',
    };

    const res = await complianceService.listControlLibraries(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('replaceCustomControlLibrary()', async () => {
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

    const params = {
      controlLibrariesId: 'testString',
      instanceId: 'testString',
      id: 'testString',
      accountId: 'testString',
      controlLibraryName: 'testString',
      controlLibraryDescription: 'testString',
      controlLibraryType: 'predefined',
      versionGroupLabel: 'testString',
      controlLibraryVersion: 'testString',
      latest: true,
      controlsCount: 38,
      controls: [controlsInControlLibRequestPayloadModel],
      transactionId: 'testString',
    };

    const res = await complianceService.replaceCustomControlLibrary(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getControlLibrary()', async () => {
    const params = {
      controlLibrariesId: 'testString',
      instanceId: 'testString',
      transactionId: 'testString',
    };

    const res = await complianceService.getControlLibrary(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createScan()', async () => {
    const params = {
      instanceId: 'testString',
      attachmentId: 'testString',
      transactionId: 'testString',
    };

    const res = await complianceService.createScan(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('deleteCustomProfile()', async () => {
    const params = {
      profilesId: 'testString',
      instanceId: 'testString',
      transactionId: 'testString',
    };

    const res = await complianceService.deleteCustomProfile(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('deleteProfileAttachmnet()', async () => {
    const params = {
      profilesId: 'testString',
      attachmentId: 'testString',
      instanceId: 'testString',
      transactionId: 'testString',
    };

    const res = await complianceService.deleteProfileAttachmnet(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('deleteCustomControllibrary()', async () => {
    const params = {
      controlLibrariesId: 'testString',
      instanceId: 'testString',
      transactionId: 'testString',
    };

    const res = await complianceService.deleteCustomControllibrary(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
});
