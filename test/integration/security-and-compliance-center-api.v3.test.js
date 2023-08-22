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
/* eslint-disable no-await-in-loop */

const SecurityAndComplianceCenterApiV3 = require('../../dist/security-and-compliance-center-api/v3');
const { readExternalSources } = require('ibm-cloud-sdk-core');
const authHelper = require('../resources/auth-helper.js');

// testcase timeout value (200s).
const timeout = 200000;

// Location of our config file.
const configFile = 'security_and_compliance_center_api_v3.env';

const describe = authHelper.prepareTests(configFile);

describe('SecurityAndComplianceCenterApiV3_integration', () => {
  jest.setTimeout(timeout);

  // Service instance
  let securityAndComplianceCenterApiService;

  // Variables to hold link values
  let accountIdForReportLink;
  let attachmentIdForReportLink;
  let attachmentIdLink;
  let controlLibraryIdLink;
  let eTagLink;
  let eventNotificationsCrnForUpdateSettingsLink;
  let groupIdForReportLink;
  let objectStorageBucketForUpdateSettingsLink;
  let objectStorageCrnForUpdateSettingsLink;
  let objectStorageLocationForUpdateSettingsLink;
  let profileIdForReportLink;
  let profileIdLink;
  let providerTypeIdLink;
  let providerTypeInstanceIdLink;
  let reportIdForReportLink;
  let ruleIdLink;
  let typeForReportLink;

  test('Initialize service', async () => {
    securityAndComplianceCenterApiService = SecurityAndComplianceCenterApiV3.newInstance();

    expect(securityAndComplianceCenterApiService).not.toBeNull();

    const config = readExternalSources(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME);
    expect(config).not.toBeNull();
  
    securityAndComplianceCenterApiService.enableRetries();
  });

  test('getSettings()', async () => {
    const params = {
      xCorrelationId: '1a2b3c4d-5e6f-4a7b-8c9d-e0f1a2b3c4d5',
      xRequestId: 'testString',
    };

    const res = await securityAndComplianceCenterApiService.getSettings(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
    eventNotificationsCrnForUpdateSettingsLink = res.result.event_notifications.instance_crn;
    objectStorageCrnForUpdateSettingsLink = res.result.object_storage.instance_crn;
    objectStorageBucketForUpdateSettingsLink = res.result.object_storage.bucket;
    objectStorageLocationForUpdateSettingsLink = res.result.object_storage.bucket_location;
  });

  test('createRule()', async () => {
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

    const params = {
      description: 'Example rule',
      target: targetModel,
      requiredConfig: requiredConfigModel,
      type: 'user_defined',
      version: '1.0.0',
      _import: importModel,
      labels: [],
      xCorrelationId: 'testString',
      xRequestId: 'testString',
    };

    const res = await securityAndComplianceCenterApiService.createRule(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    ruleIdLink = res.result.id;
  });

  test('getRule()', async () => {
    const params = {
      ruleId: ruleIdLink,
      xCorrelationId: 'testString',
      xRequestId: 'testString',
    };

    const res = await securityAndComplianceCenterApiService.getRule(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
    eTagLink = res.headers['etag'];
  });

  test('getLatestReports()', async () => {
    const params = {
      xCorrelationId: 'testString',
      xRequestId: 'testString',
      sort: 'profile_name',
    };

    const res = await securityAndComplianceCenterApiService.getLatestReports(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
    accountIdForReportLink = res.result.reports[0].account.id;
    reportIdForReportLink = res.result.reports[0].id;
    attachmentIdForReportLink = res.result.reports[0].attachment.id;
    groupIdForReportLink = res.result.reports[0].group_id;
    profileIdForReportLink = res.result.reports[0].profile.id;
    typeForReportLink = res.result.reports[0].type;
  });

  test('updateSettings()', async () => {
    // Request models needed by this operation.

    // EventNotifications
    const eventNotificationsModel = {
      instance_crn: eventNotificationsCrnForUpdateSettingsLink,
      updated_on: '2019-01-01T12:00:00.000Z',
      source_id: 'crn:v1:staging:public:event-notifications:us-south:a/ff88f007f9ff4622aac4fbc0eda36255:b8b07245-0bbe-4478-b11c-0dce523105fd::',
      source_description: 'This source is used for integration with IBM Cloud Security and Compliance Center.',
      source_name: 'compliance',
    };

    // ObjectStorage
    const objectStorageModel = {
      instance_crn: objectStorageCrnForUpdateSettingsLink,
      bucket: objectStorageBucketForUpdateSettingsLink,
      bucket_location: objectStorageLocationForUpdateSettingsLink,
      bucket_endpoint: 'testString',
      updated_on: '2019-01-01T12:00:00.000Z',
    };

    const params = {
      eventNotifications: eventNotificationsModel,
      objectStorage: objectStorageModel,
      xCorrelationId: '1a2b3c4d-5e6f-4a7b-8c9d-e0f1a2b3c4d5',
      xRequestId: 'testString',
    };

    const res = await securityAndComplianceCenterApiService.updateSettings(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('postTestEvent()', async () => {
    const params = {
      xCorrelationId: '1a2b3c4d-5e6f-4a7b-8c9d-e0f1a2b3c4d5',
      xRequestId: 'testString',
    };

    const res = await securityAndComplianceCenterApiService.postTestEvent(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('createCustomControlLibrary()', async () => {
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

    const params = {
      controlLibraryName: 'IBM Cloud for Financial Services',
      controlLibraryDescription: 'IBM Cloud for Financial Services',
      controlLibraryType: 'custom',
      controls: [controlsInControlLibModel],
      versionGroupLabel: '33fc7b80-0fa5-4f16-bbba-1f293f660f0d',
      controlLibraryVersion: '1.0.0',
      latest: true,
      controlsCount: 38,
      xCorrelationId: 'testString',
      xRequestId: 'testString',
    };

    const res = await securityAndComplianceCenterApiService.createCustomControlLibrary(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    controlLibraryIdLink = res.result.id;
  });

  test('listControlLibraries()', async () => {
    const params = {
      xCorrelationId: 'testString',
      xRequestId: 'testString',
      limit: 50,
      controlLibraryType: 'custom',
      start: 'testString',
    };

    const res = await securityAndComplianceCenterApiService.listControlLibraries(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listControlLibraries() via ControlLibrariesPager', async () => {
    const params = {
      xCorrelationId: 'testString',
      xRequestId: 'testString',
      limit: 50,
      controlLibraryType: 'custom',
    };

    const allResults = [];

    // Test getNext().
    let pager = new SecurityAndComplianceCenterApiV3.ControlLibrariesPager(securityAndComplianceCenterApiService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new SecurityAndComplianceCenterApiV3.ControlLibrariesPager(securityAndComplianceCenterApiService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('getControlLibrary()', async () => {
    const params = {
      controlLibrariesId: controlLibraryIdLink,
      xCorrelationId: 'testString',
      xRequestId: 'testString',
    };

    const res = await securityAndComplianceCenterApiService.getControlLibrary(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('replaceCustomControlLibrary()', async () => {
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

    const params = {
      controlLibrariesId: controlLibraryIdLink,
      id: 'testString',
      accountId: 'testString',
      controlLibraryName: 'IBM Cloud for Financial Services',
      controlLibraryDescription: 'IBM Cloud for Financial Services',
      controlLibraryType: 'custom',
      versionGroupLabel: 'testString',
      controlLibraryVersion: '1.1.0',
      createdOn: '2019-01-01T12:00:00.000Z',
      createdBy: 'testString',
      updatedOn: '2019-01-01T12:00:00.000Z',
      updatedBy: 'testString',
      latest: true,
      hierarchyEnabled: true,
      controlsCount: 38,
      controlParentsCount: 38,
      controls: [controlsInControlLibModel],
      xCorrelationId: 'testString',
      xRequestId: 'testString',
    };

    const res = await securityAndComplianceCenterApiService.replaceCustomControlLibrary(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createProfile()', async () => {
    // Request models needed by this operation.

    // ProfileControlsPrototype
    const profileControlsPrototypeModel = {
      control_library_id: controlLibraryIdLink,
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

    const params = {
      profileName: 'test_profile1',
      profileDescription: 'test_description1',
      profileType: 'custom',
      controls: [profileControlsPrototypeModel],
      defaultParameters: [defaultParametersPrototypeModel],
      xCorrelationId: 'testString',
      xRequestId: 'testString',
    };

    const res = await securityAndComplianceCenterApiService.createProfile(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    profileIdLink = res.result.id;
  });

  test('listProfiles()', async () => {
    const params = {
      xCorrelationId: 'testString',
      xRequestId: 'testString',
      limit: 50,
      profileType: 'custom',
      start: 'testString',
    };

    const res = await securityAndComplianceCenterApiService.listProfiles(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listProfiles() via ProfilesPager', async () => {
    const params = {
      xCorrelationId: 'testString',
      xRequestId: 'testString',
      limit: 10,
      profileType: 'custom',
    };

    const allResults = [];

    // Test getNext().
    let pager = new SecurityAndComplianceCenterApiV3.ProfilesPager(securityAndComplianceCenterApiService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new SecurityAndComplianceCenterApiV3.ProfilesPager(securityAndComplianceCenterApiService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('getProfile()', async () => {
    const params = {
      profilesId: profileIdLink,
      xCorrelationId: 'testString',
      xRequestId: 'testString',
    };

    const res = await securityAndComplianceCenterApiService.getProfile(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('replaceProfile()', async () => {
    // Request models needed by this operation.

    // ProfileControlsPrototype
    const profileControlsPrototypeModel = {
      control_library_id: controlLibraryIdLink,
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

    const params = {
      profilesId: profileIdLink,
      profileName: 'test_profile1',
      profileDescription: 'test_description1',
      profileType: 'custom',
      controls: [profileControlsPrototypeModel],
      defaultParameters: [defaultParametersPrototypeModel],
      xCorrelationId: 'testString',
      xRequestId: 'testString',
    };

    const res = await securityAndComplianceCenterApiService.replaceProfile(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listRules()', async () => {
    const params = {
      xCorrelationId: 'testString',
      xRequestId: 'testString',
      type: 'system_defined',
      search: 'testString',
      serviceName: 'testString',
    };

    const res = await securityAndComplianceCenterApiService.listRules(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('replaceRule()', async () => {
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

    const params = {
      ruleId: ruleIdLink,
      ifMatch: eTagLink,
      description: 'Example rule',
      target: targetModel,
      requiredConfig: requiredConfigModel,
      type: 'user_defined',
      version: '1.0.1',
      _import: importModel,
      labels: [],
      xCorrelationId: 'testString',
      xRequestId: 'testString',
    };

    const res = await securityAndComplianceCenterApiService.replaceRule(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createAttachment()', async () => {
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

    const params = {
      profilesId: profileIdLink,
      attachments: [attachmentsPrototypeModel],
      profileId: profileIdLink,
      xCorrelationId: 'testString',
      xRequestId: 'testString',
    };

    const res = await securityAndComplianceCenterApiService.createAttachment(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    attachmentIdLink = res.result.attachments[0].id;
  });

  test('listAttachments()', async () => {
    const params = {
      profilesId: profileIdLink,
      xCorrelationId: 'testString',
      xRequestId: 'testString',
      limit: 50,
      start: 'testString',
    };

    const res = await securityAndComplianceCenterApiService.listAttachments(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listAttachments() via AttachmentsPager', async () => {
    const params = {
      profilesId: profileIdLink,
      xCorrelationId: 'testString',
      xRequestId: 'testString',
      limit: 10,
    };

    const allResults = [];

    // Test getNext().
    let pager = new SecurityAndComplianceCenterApiV3.AttachmentsPager(securityAndComplianceCenterApiService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new SecurityAndComplianceCenterApiV3.AttachmentsPager(securityAndComplianceCenterApiService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('getProfileAttachment()', async () => {
    const params = {
      attachmentId: attachmentIdLink,
      profilesId: profileIdLink,
      xCorrelationId: 'testString',
      xRequestId: 'testString',
    };

    const res = await securityAndComplianceCenterApiService.getProfileAttachment(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('replaceProfileAttachment()', async () => {
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

    const params = {
      attachmentId: attachmentIdLink,
      profilesId: profileIdLink,
      id: 'testString',
      profileId: profileIdLink,
      accountId: 'testString',
      instanceId: 'testString',
      scope: [multiCloudScopeModel],
      createdOn: '2019-01-01T12:00:00.000Z',
      createdBy: 'testString',
      updatedOn: '2019-01-01T12:00:00.000Z',
      updatedBy: 'testString',
      status: 'enabled',
      schedule: 'every_30_days',
      notifications: attachmentsNotificationsPrototypeModel,
      attachmentParameters: [attachmentParameterPrototypeModel],
      lastScan: lastScanModel,
      nextScanTime: '2019-01-01T12:00:00.000Z',
      name: 'account-0d8c3805dfea40aa8ad02265a18eb12b',
      description: 'Test description',
      xCorrelationId: 'testString',
      xRequestId: 'testString',
    };

    const res = await securityAndComplianceCenterApiService.replaceProfileAttachment(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createScan()', async () => {
    const params = {
      attachmentId: attachmentIdLink,
      xCorrelationId: 'testString',
      xRequestId: 'testString',
    };

    const res = await securityAndComplianceCenterApiService.createScan(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('listAttachmentsAccount()', async () => {
    const params = {
      xCorrelationId: 'testString',
      xRequestId: 'testString',
      limit: 50,
      start: 'testString',
    };

    const res = await securityAndComplianceCenterApiService.listAttachmentsAccount(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listAttachmentsAccount() via AttachmentsAccountPager', async () => {
    const params = {
      xCorrelationId: 'testString',
      xRequestId: 'testString',
      limit: 10,
    };

    const allResults = [];

    // Test getNext().
    let pager = new SecurityAndComplianceCenterApiV3.AttachmentsAccountPager(securityAndComplianceCenterApiService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new SecurityAndComplianceCenterApiV3.AttachmentsAccountPager(securityAndComplianceCenterApiService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('listReports()', async () => {
    const params = {
      xCorrelationId: 'testString',
      xRequestId: 'testString',
      attachmentId: attachmentIdForReportLink,
      groupId: groupIdForReportLink,
      profileId: profileIdForReportLink,
      type: typeForReportLink,
      start: 'testString',
      limit: 50,
      sort: 'profile_name',
    };

    const res = await securityAndComplianceCenterApiService.listReports(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listReports() via ReportsPager', async () => {
    const params = {
      xCorrelationId: 'testString',
      xRequestId: 'testString',
      attachmentId: attachmentIdForReportLink,
      groupId: groupIdForReportLink,
      profileId: profileIdForReportLink,
      type: typeForReportLink,
      limit: 10,
      sort: 'profile_name',
    };

    const allResults = [];

    // Test getNext().
    let pager = new SecurityAndComplianceCenterApiV3.ReportsPager(securityAndComplianceCenterApiService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new SecurityAndComplianceCenterApiV3.ReportsPager(securityAndComplianceCenterApiService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('getReport()', async () => {
    const params = {
      reportId: reportIdForReportLink,
      xCorrelationId: 'testString',
      xRequestId: 'testString',
    };

    const res = await securityAndComplianceCenterApiService.getReport(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getReportSummary()', async () => {
    const params = {
      reportId: reportIdForReportLink,
      xCorrelationId: 'testString',
      xRequestId: 'testString',
    };

    const res = await securityAndComplianceCenterApiService.getReportSummary(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getReportEvaluation()', async () => {
    const params = {
      reportId: reportIdForReportLink,
      xCorrelationId: 'testString',
      xRequestId: 'testString',
      excludeSummary: true,
    };

    const res = await securityAndComplianceCenterApiService.getReportEvaluation(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getReportControls()', async () => {
    const params = {
      reportId: reportIdForReportLink,
      xCorrelationId: 'testString',
      xRequestId: 'testString',
      controlId: 'testString',
      controlName: 'testString',
      controlDescription: 'testString',
      controlCategory: 'testString',
      status: 'compliant',
      sort: 'control_name',
    };

    const res = await securityAndComplianceCenterApiService.getReportControls(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getReportRule()', async () => {
    const params = {
      reportId: reportIdForReportLink,
      ruleId: 'rule-8d444f8c-fd1d-48de-bcaa-f43732568761',
      xCorrelationId: 'testString',
      xRequestId: 'testString',
    };

    const res = await securityAndComplianceCenterApiService.getReportRule(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listReportEvaluations()', async () => {
    const params = {
      reportId: reportIdForReportLink,
      xCorrelationId: 'testString',
      xRequestId: 'testString',
      assessmentId: 'testString',
      componentId: 'testString',
      targetId: 'testString',
      targetName: 'testString',
      status: 'failure',
      start: 'testString',
      limit: 50,
    };

    const res = await securityAndComplianceCenterApiService.listReportEvaluations(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listReportEvaluations() via ReportEvaluationsPager', async () => {
    const params = {
      reportId: reportIdForReportLink,
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

    // Test getNext().
    let pager = new SecurityAndComplianceCenterApiV3.ReportEvaluationsPager(securityAndComplianceCenterApiService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new SecurityAndComplianceCenterApiV3.ReportEvaluationsPager(securityAndComplianceCenterApiService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('listReportResources()', async () => {
    const params = {
      reportId: reportIdForReportLink,
      xCorrelationId: 'testString',
      xRequestId: 'testString',
      id: 'testString',
      resourceName: 'testString',
      accountId: accountIdForReportLink,
      componentId: 'testString',
      status: 'compliant',
      sort: 'account_id',
      start: 'testString',
      limit: 50,
    };

    const res = await securityAndComplianceCenterApiService.listReportResources(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listReportResources() via ReportResourcesPager', async () => {
    const params = {
      reportId: reportIdForReportLink,
      xCorrelationId: 'testString',
      xRequestId: 'testString',
      id: 'testString',
      resourceName: 'testString',
      accountId: accountIdForReportLink,
      componentId: 'testString',
      status: 'compliant',
      sort: 'account_id',
      limit: 10,
    };

    const allResults = [];

    // Test getNext().
    let pager = new SecurityAndComplianceCenterApiV3.ReportResourcesPager(securityAndComplianceCenterApiService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new SecurityAndComplianceCenterApiV3.ReportResourcesPager(securityAndComplianceCenterApiService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('getReportTags()', async () => {
    const params = {
      reportId: reportIdForReportLink,
      xCorrelationId: 'testString',
      xRequestId: 'testString',
    };

    const res = await securityAndComplianceCenterApiService.getReportTags(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getReportViolationsDrift()', async () => {
    const params = {
      reportId: reportIdForReportLink,
      xCorrelationId: 'testString',
      xRequestId: 'testString',
      scanTimeDuration: 0,
    };

    const res = await securityAndComplianceCenterApiService.getReportViolationsDrift(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listProviderTypes()', async () => {
    const params = {
      xCorrelationId: 'testString',
      xRequestId: 'testString',
    };

    const res = await securityAndComplianceCenterApiService.listProviderTypes(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
    providerTypeIdLink = res.result.provider_types[0].id;
  });

  test('getProviderTypeById()', async () => {
    const params = {
      providerTypeId: providerTypeIdLink,
      xCorrelationId: 'testString',
      xRequestId: 'testString',
    };

    const res = await securityAndComplianceCenterApiService.getProviderTypeById(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listProviderTypeInstances()', async () => {
    const params = {
      providerTypeId: providerTypeIdLink,
      xCorrelationId: 'testString',
      xRequestId: 'testString',
    };

    const res = await securityAndComplianceCenterApiService.listProviderTypeInstances(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createProviderTypeInstance()', async () => {
    const params = {
      providerTypeId: providerTypeIdLink,
      name: 'workload-protection-instance-1',
      attributes: { wp_crn: 'crn:v1:staging:public:sysdig-secure:eu-gb:a/14q5SEnVIbwxzvP4AWPCjr2dJg5BAvPb:d1461d1ae-df1eee12fa81812e0-12-aa259::' },
      xCorrelationId: 'testString',
      xRequestId: 'testString',
    };

    const res = await securityAndComplianceCenterApiService.createProviderTypeInstance(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    providerTypeInstanceIdLink = res.result.id;
  });

  test('getProviderTypeInstance()', async () => {
    const params = {
      providerTypeId: providerTypeIdLink,
      providerTypeInstanceId: providerTypeInstanceIdLink,
      xCorrelationId: 'testString',
      xRequestId: 'testString',
    };

    const res = await securityAndComplianceCenterApiService.getProviderTypeInstance(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('updateProviderTypeInstance()', async () => {
    const params = {
      providerTypeId: providerTypeIdLink,
      providerTypeInstanceId: providerTypeInstanceIdLink,
      name: 'workload-protection-instance-1',
      attributes: { wp_crn: 'crn:v1:staging:public:sysdig-secure:eu-gb:a/14q5SEnVIbwxzvP4AWPCjr2dJg5BAvPb:d1461d1ae-df1eee12fa81812e0-12-aa259::' },
      xCorrelationId: 'testString',
      xRequestId: 'testString',
    };

    const res = await securityAndComplianceCenterApiService.updateProviderTypeInstance(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getProviderTypesInstances()', async () => {
    const params = {
      xCorrelationId: 'testString',
      xRequestId: 'testString',
    };

    const res = await securityAndComplianceCenterApiService.getProviderTypesInstances(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('deleteCustomProfile()', async () => {
    const params = {
      profilesId: profileIdLink,
      xCorrelationId: 'testString',
      xRequestId: 'testString',
    };

    const res = await securityAndComplianceCenterApiService.deleteCustomProfile(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('deleteCustomControlLibrary()', async () => {
    const params = {
      controlLibrariesId: controlLibraryIdLink,
      xCorrelationId: 'testString',
      xRequestId: 'testString',
    };

    const res = await securityAndComplianceCenterApiService.deleteCustomControlLibrary(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('deleteRule()', async () => {
    const params = {
      ruleId: ruleIdLink,
      xCorrelationId: 'testString',
      xRequestId: 'testString',
    };

    const res = await securityAndComplianceCenterApiService.deleteRule(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test('deleteProfileAttachment()', async () => {
    const params = {
      attachmentId: attachmentIdLink,
      profilesId: profileIdLink,
      xCorrelationId: 'testString',
      xRequestId: 'testString',
    };

    const res = await securityAndComplianceCenterApiService.deleteProfileAttachment(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('deleteProviderTypeInstance()', async () => {
    const params = {
      providerTypeId: providerTypeIdLink,
      providerTypeInstanceId: providerTypeInstanceIdLink,
      xCorrelationId: 'testString',
      xRequestId: 'testString',
    };

    const res = await securityAndComplianceCenterApiService.deleteProviderTypeInstance(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });
});
