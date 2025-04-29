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

/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */

const { readExternalSources } = require('ibm-cloud-sdk-core');
const SecurityAndComplianceCenterApiV3 = require('../../dist/security-and-compliance-center-api/v3');
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
  let providerTypeInstanceIdLink;
  let reportIdForReportLink;
  let ruleIdLink;
  let scanIdForScanReportLink;
  let scopeIdLink;
  let subScopeIdLink;
  let targetIdLink;
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
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
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

  test('updateSettings()', async () => {
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

    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      objectStorage: objectStoragePrototypeModel,
      eventNotifications: eventNotificationsPrototypeModel,
    };

    const res = await securityAndComplianceCenterApiService.updateSettings(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test('postTestEvent()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
    };

    const res = await securityAndComplianceCenterApiService.postTestEvent(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('listInstanceAttachments()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      accountId: accountIdForReportLink,
      versionGroupLabel: '6702d85a-6437-4d6f-8701-c0146648787b',
      limit: 25,
      sort: 'created_on',
      direction: 'desc',
    };

    const res = await securityAndComplianceCenterApiService.listInstanceAttachments(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listInstanceAttachments() via InstanceAttachmentsPager', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      accountId: accountIdForReportLink,
      versionGroupLabel: '6702d85a-6437-4d6f-8701-c0146648787b',
      limit: 10,
      sort: 'created_on',
      direction: 'desc',
    };

    const allResults = [];

    // Test getNext().
    let pager = new SecurityAndComplianceCenterApiV3.InstanceAttachmentsPager(securityAndComplianceCenterApiService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new SecurityAndComplianceCenterApiV3.InstanceAttachmentsPager(securityAndComplianceCenterApiService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('createProfileAttachment()', async () => {
    // Request models needed by this operation.

    // Parameter
    const parameterModels= [
      {
        assessment_id: 'rule-e16fcfea-fe21-4d30-a721-423611481fea',
        parameter_name: 'tls_version',
        parameter_display_name: 'IBM Cloud Internet Services TLS version',
        parameter_type: 'string_list',
        parameter_value: '["1.2", "1.3"]',
      },
      {
        assessment_id: 'rule-f9137be8-2490-4afb-8cd5-a201cb167eb2',
        parameter_name: 'ssh_port',
        parameter_display_name: 'Network ACL rule for allowed IPs to SSH port',
        parameter_type: 'numeric',
        parameter_value: '22',
      },
      {
        assessment_id: 'rule-9653d2c7-6290-4128-a5a3-65487ba40370',
        parameter_name: 'rdp_port',
        parameter_display_name: 'Security group rule RDP allow port number',
        parameter_type: 'numeric',
        parameter_value: '22',
      },
      {
        assessment_id: 'rule-7c5f6385-67e4-4edf-bec8-c722558b2dec',
        parameter_name: 'ssh_port',
        parameter_display_name: 'Security group rule SSH allow port number',
        parameter_type: 'numeric',
        parameter_value: '22',
      },
      {
        assessment_id: 'rule-f1e80ee7-88d5-4bf2-b42f-c863bb24601c',
        parameter_name: 'rdp_port',
        parameter_display_name: 'Disallowed IPs for ingress to RDP port',
        parameter_type: 'numeric',
        parameter_value: '3389',
      },
      {
        assessment_id: 'rule-96527f89-1867-4581-b923-1400e04661e0',
        parameter_name: 'exclude_default_security_groups',
        parameter_display_name: 'Exclude the default security groups',
        parameter_type: 'string_list',
        parameter_value: '["Default"]',
      },
    ];

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
    const endDate = new Date(Date.now()).toISOString();
    const dateRangeModel = {
      start_date: '2025-02-28T05:42:58.000Z',
      end_date: endDate,
    };

    // ProfileAttachmentBase
    const profileAttachmentBaseModel = {
      attachment_parameters: parameterModels,
      description: 'This is a profile attachment targeting IBM CIS Foundation using a SDK',
      name: 'Profile Attachment for IBM CIS Foundation SDK test',
      notifications: attachmentNotificationsModel,
      schedule: 'daily',
      scope: [multiCloudScopePayloadModel],
      status: 'disabled',
      data_selection_range: dateRangeModel,
    };

    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      profileId: '9c265b4a-4cdf-47f1-acd3-17b5808f7f3f',
      newAttachments: [profileAttachmentBaseModel],
      newProfileId: '9c265b4a-4cdf-47f1-acd3-17b5808f7f3',
      accountId: accountIdForReportLink,
    };

    const res = await securityAndComplianceCenterApiService.createProfileAttachment(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    attachmentIdLink = res.result.attachments[0].id;
  });

  test('getProfileAttachment()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      profileId: '9c265b4a-4cdf-47f1-acd3-17b5808f7f3f',
      attachmentId: attachmentIdLink,
      accountId: accountIdForReportLink,
    };

    const res = await securityAndComplianceCenterApiService.getProfileAttachment(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('replaceProfileAttachment()', async () => {
    // Request models needed by this operation.

    // Parameter
    const parameterModels = [
      {
        assessment_id: 'rule-e16fcfea-fe21-4d30-a721-423611481fea',
        parameter_name: 'tls_version',
        parameter_display_name: 'IBM Cloud Internet Services TLS version',
        parameter_type: 'string_list',
        parameter_value: '["1.2", "1.3"]',
      },
      {
        assessment_id: 'rule-f9137be8-2490-4afb-8cd5-a201cb167eb2',
        parameter_name: 'ssh_port',
        parameter_display_name: 'Network ACL rule for allowed IPs to SSH port',
        parameter_type: 'numeric',
        parameter_value: '22',
      },
      {
        assessment_id: 'rule-9653d2c7-6290-4128-a5a3-65487ba40370',
        parameter_name: 'rdp_port',
        parameter_display_name: 'Security group rule RDP allow port number',
        parameter_type: 'numeric',
        parameter_value: '22',
      },
      {
        assessment_id: 'rule-7c5f6385-67e4-4edf-bec8-c722558b2dec',
        parameter_name: 'ssh_port',
        parameter_display_name: 'Security group rule SSH allow port number',
        parameter_type: 'numeric',
        parameter_value: '22',
      },
      {
        assessment_id: 'rule-f1e80ee7-88d5-4bf2-b42f-c863bb24601c',
        parameter_name: 'rdp_port',
        parameter_display_name: 'Disallowed IPs for ingress to RDP port',
        parameter_type: 'numeric',
        parameter_value: '3389',
      },
      {
        assessment_id: 'rule-96527f89-1867-4581-b923-1400e04661e0',
        parameter_name: 'exclude_default_security_groups',
        parameter_display_name: 'Exclude the default security groups',
        parameter_type: 'string_list',
        parameter_value: '["Default"]',
      },
    ];

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
    const endDate = new Date(Date.now()).toISOString();
    const dateRangeModel = {
      start_date: '2025-02-28T05:42:58.000Z',
      end_date: endDate,
    };

    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      profileId: '9c265b4a-4cdf-47f1-acd3-17b5808f7f3f',
      attachmentId: attachmentIdLink,
      attachmentParameters: parameterModels,
      description: 'New Profile Attachment Update',
      name: 'SDK Updated Test',
      notifications: attachmentNotificationsModel,
      schedule: 'daily',
      scope: [multiCloudScopePayloadModel],
      status: 'disabled',
      dataSelectionRange: dateRangeModel,
      accountId: accountIdForReportLink,
    };

    const res = await securityAndComplianceCenterApiService.replaceProfileAttachment(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('upgradeAttachment()', async () => {
    // Request models needed by this operation.

    // Parameter
    const parameterModels = [
      {
        assessment_id: 'rule-e16fcfea-fe21-4d30-a721-423611481fea',
        parameter_name: 'tls_version',
        parameter_display_name: 'IBM Cloud Internet Services TLS version',
        parameter_type: 'string_list',
        parameter_value: '["1.2", "1.3"]',
      },
      {
        assessment_id: 'rule-f9137be8-2490-4afb-8cd5-a201cb167eb2',
        parameter_name: 'ssh_port',
        parameter_display_name: 'Network ACL rule for allowed IPs to SSH port',
        parameter_type: 'numeric',
        parameter_value: '22',
      },
      {
        assessment_id: 'rule-9653d2c7-6290-4128-a5a3-65487ba40370',
        parameter_name: 'rdp_port',
        parameter_display_name: 'Security group rule RDP allow port number',
        parameter_type: 'numeric',
        parameter_value: '22',
      },
      {
        assessment_id: 'rule-7c5f6385-67e4-4edf-bec8-c722558b2dec',
        parameter_name: 'ssh_port',
        parameter_display_name: 'Security group rule SSH allow port number',
        parameter_type: 'numeric',
        parameter_value: '22',
      },
      {
        assessment_id: 'rule-f1e80ee7-88d5-4bf2-b42f-c863bb24601c',
        parameter_name: 'rdp_port',
        parameter_display_name: 'Disallowed IPs for ingress to RDP port',
        parameter_type: 'numeric',
        parameter_value: '3389',
      },
      {
        assessment_id: 'rule-96527f89-1867-4581-b923-1400e04661e0',
        parameter_name: 'exclude_default_security_groups',
        parameter_display_name: 'Exclude the default security groups',
        parameter_type: 'string_list',
        parameter_value: '["Default"]',
      },
    ];

    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      profileId: '9c265b4a-4cdf-47f1-acd3-17b5808f7f3f',
      attachmentId: attachmentIdLink,
      attachmentParameters: parameterModels,
      accountId: accountIdForReportLink,
    };

    const res = await securityAndComplianceCenterApiService.upgradeAttachment(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createScan()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      attachmentId: '4deb572c-9f37-4126-9cc0-d550672533cb',
      accountId: accountIdForReportLink,
    };

    const res = await securityAndComplianceCenterApiService.createScan(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('createControlLibrary()', async () => {
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
      control_specification_description: 'This field is used to describe a control specification',
      assessments: [assessmentPrototypeModel],
    };

    // ControlPrototype
    const controlPrototypeModel = {
      control_name: 'security',
      control_description: 'This is a description of a control',
      control_category: 'test-control',
      control_requirement: true,
      control_specifications: [controlSpecificationPrototypeModel],
      status: 'disabled',
    };

    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      controlLibraryName: 'custom control library from SDK',
      controlLibraryDescription: 'This is a custom control library made from the SDK test framework',
      controlLibraryType: 'custom',
      controlLibraryVersion: '0.0.1',
      controls: [controlPrototypeModel],
      accountId: accountIdForReportLink,
    };

    const res = await securityAndComplianceCenterApiService.createControlLibrary(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    controlLibraryIdLink = res.result.id;
  });

  test('listControlLibraries()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      accountId: accountIdForReportLink,
      limit: 25,
    };

    const res = await securityAndComplianceCenterApiService.listControlLibraries(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listControlLibraries() via ControlLibrariesPager', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      accountId: accountIdForReportLink,
      limit: 10,
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

  test('replaceCustomControlLibrary()', async () => {
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
      control_parent: '',
      control_specifications: [controlSpecificationPrototypeModel],
      control_docs: controlDocModel,
      status: 'enabled',
    };

    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      controlLibraryId: controlLibraryIdLink,
      controlLibraryName: 'custom control library from SDK',
      controlLibraryDescription: 'This is a custom control library made from the SDK test framework',
      controlLibraryType: 'custom',
      controlLibraryVersion: '0.0.2',
      controls: [controlPrototypeModel],
    };

    const res = await securityAndComplianceCenterApiService.replaceCustomControlLibrary(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getControlLibrary()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      controlLibraryId: controlLibraryIdLink,
      accountId: accountIdForReportLink,
    };

    const res = await securityAndComplianceCenterApiService.getControlLibrary(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createProfile()', async () => {
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

    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      profileName: 'Example Profile',
      profileVersion: '0.0.1',
      controls: [profileControlsPrototypeModel],
      defaultParameters: [defaultParametersModel],
      profileDescription: 'This profile is created as an example of the SDK gen',
      latest: true,
      versionGroupLabel: 'testString',
      accountId: accountIdForReportLink,
    };

    const res = await securityAndComplianceCenterApiService.createProfile(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    profileIdLink = res.result.id;
  });

  test('listProfiles()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      accountId: accountIdForReportLink,
      limit: 50,
    };

    const res = await securityAndComplianceCenterApiService.listProfiles(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listProfiles() via ProfilesPager', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      accountId: accountIdForReportLink,
      limit: 10,
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

  test('replaceProfile()', async () => {
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

    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      profileId: profileIdLink,
      newProfileType: 'custom',
      newControls: [profileControlsModel],
      newDefaultParameters: [defaultParametersModel],
      newId: 'testString',
      newProfileName: 'Example Profile Updated',
      newInstanceId: 'testString',
      newHierarchyEnabled: true,
      newProfileDescription: 'This profile has been updated',
      newProfileVersion: '0.0.2',
      newVersionGroupLabel: 'testString',
      newLatest: true,
      newCreatedBy: 'testString',
      newCreatedOn: '2019-01-01T12:00:00.000Z',
      newUpdatedBy: 'testString',
      newUpdatedOn: '2019-01-01T12:00:00.000Z',
      newControlsCount: 38,
      newAttachmentsCount: 38,
      accountId: accountIdForReportLink,
    };

    const res = await securityAndComplianceCenterApiService.replaceProfile(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getProfile()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      profileId: profileIdLink,
      accountId: accountIdForReportLink,
    };

    const res = await securityAndComplianceCenterApiService.getProfile(params);
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
      parameter_type: 'testString',
    };

    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      profileId: profileIdLink,
      defaultParameters: [defaultParametersModel],
      id: 'testString',
      accountId: accountIdForReportLink,
    };

    const res = await securityAndComplianceCenterApiService.replaceProfileParameters(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listProfileParameters()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      profileId: profileIdLink,
    };

    const res = await securityAndComplianceCenterApiService.listProfileParameters(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('compareProfiles()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      profileId: '2f598907-970d-4d52-9071-5cc95912f55e',
      accountId: accountIdForReportLink,
    };

    const res = await securityAndComplianceCenterApiService.compareProfiles(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listProfileAttachments()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      profileId: '9c265b4a-4cdf-47f1-acd3-17b5808f7f3f',
      accountId: accountIdForReportLink,
    };

    const res = await securityAndComplianceCenterApiService.listProfileAttachments(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createScope()', async () => {
    // Request models needed by this operation.

    // ScopePropertyScopeAny
    const scopePropertyModels = [
      {
        name: 'scope_id',
        value: 'ff88f007f9ff4622aac4fbc0eda36255',
      },
      {
        name: 'scope_type',
        value: 'account',
      },
    ];

    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      name: 'ibm scope',
      description: 'The scope that is defined for IBM resources.',
      environment: 'ibm-cloud',
      properties: scopePropertyModels,
    };

    const res = await securityAndComplianceCenterApiService.createScope(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    scopeIdLink = res.result.id;
  });

  test('listScopes()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      limit: 50,
      start: 'testString',
      name: 'testString',
      description: 'testString',
      environment: 'testString',
    };

    const res = await securityAndComplianceCenterApiService.listScopes(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listScopes() via ScopesPager', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      limit: 10,
      name: 'testString',
      description: 'testString',
      environment: 'testString',
    };

    const allResults = [];

    // Test getNext().
    let pager = new SecurityAndComplianceCenterApiV3.ScopesPager(securityAndComplianceCenterApiService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new SecurityAndComplianceCenterApiV3.ScopesPager(securityAndComplianceCenterApiService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('updateScope()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      scopeId: scopeIdLink,
      name: 'updated name of scope',
      description: 'updated scope description',
    };

    const res = await securityAndComplianceCenterApiService.updateScope(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getScope()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      scopeId: scopeIdLink,
    };

    const res = await securityAndComplianceCenterApiService.getScope(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createSubscope()', async () => {
    // Request models needed by this operation.

    // ScopePropertyScopeAny
    const scopePropertyModels = [
      {
        name: 'scope_id',
        value: '1f689f08ec9b47b885c2659c17029581',
      },
      {
        name: 'scope_type',
        value: 'account.resource_group',
      },
    ];

    // ScopePrototype
    const scopePrototypeModel = {
      name: 'ibm subscope update',
      description: 'The subscope that is defined for IBM resources.',
      environment: 'ibm-cloud',
      properties: scopePropertyModels,
    };

    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      scopeId: scopeIdLink,
      subscopes: [scopePrototypeModel],
    };

    const res = await securityAndComplianceCenterApiService.createSubscope(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    subScopeIdLink = res.result.subscopes[0].id;
  });

  test('listSubscopes()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      scopeId: scopeIdLink,
      limit: 50,
    };

    const res = await securityAndComplianceCenterApiService.listSubscopes(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listSubscopes() via SubscopesPager', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      scopeId: scopeIdLink,
      limit: 10,
      name: 'testString',
      description: 'testString',
      environment: 'testString',
    };

    const allResults = [];

    // Test getNext().
    let pager = new SecurityAndComplianceCenterApiV3.SubscopesPager(securityAndComplianceCenterApiService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new SecurityAndComplianceCenterApiV3.SubscopesPager(securityAndComplianceCenterApiService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('getSubscope()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      scopeId: scopeIdLink,
      subscopeId: subScopeIdLink,
    };

    const res = await securityAndComplianceCenterApiService.getSubscope(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('updateSubscope()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      scopeId: scopeIdLink,
      subscopeId: subScopeIdLink,
      name: 'updated name of scope',
      description: 'updated scope description',
    };

    const res = await securityAndComplianceCenterApiService.updateSubscope(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createTarget()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      accountId: '62ecf99b240144dea9125666249edfcb',
      trustedProfileId: 'Profile-cb2c1829-9a8d-4218-b9cd-9f83fc814e54',
      name: 'Target for IBM account',
    };

    const res = await securityAndComplianceCenterApiService.createTarget(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    targetIdLink = res.result.id;
  });

  test('listTargets()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
    };

    const res = await securityAndComplianceCenterApiService.listTargets(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getTarget()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      targetId: targetIdLink,
    };

    const res = await securityAndComplianceCenterApiService.getTarget(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('replaceTarget()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      targetId: targetIdLink,
      accountId: '62ecf99b240144dea9125666249edfcb',
      trustedProfileId: 'Profile-cb2c1829-9a8d-4218-b9cd-9f83fc814e54',
      name: 'Updated SDK target',
    };

    const res = await securityAndComplianceCenterApiService.replaceTarget(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createProviderTypeInstance()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      providerTypeId: '3e25966275dccfa2c3a34786919c5af7',
      name: 'Caveonix-instance-1',
      attributes: {},
    };

    const res = await securityAndComplianceCenterApiService.createProviderTypeInstance(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    providerTypeInstanceIdLink = res.result.id;
  });

  test('listProviderTypeInstances()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      providerTypeId: '3e25966275dccfa2c3a34786919c5af7',
    };

    const res = await securityAndComplianceCenterApiService.listProviderTypeInstances(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getProviderTypeInstance()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      providerTypeId: '3e25966275dccfa2c3a34786919c5af7',
      providerTypeInstanceId: providerTypeInstanceIdLink,
    };

    const res = await securityAndComplianceCenterApiService.getProviderTypeInstance(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('updateProviderTypeInstance()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      providerTypeId: '3e25966275dccfa2c3a34786919c5af7',
      providerTypeInstanceId: providerTypeInstanceIdLink,
      name: 'Caveonix-instance-1',
      attributes: {},
    };

    const res = await securityAndComplianceCenterApiService.updateProviderTypeInstance(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listProviderTypes()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
    };

    const res = await securityAndComplianceCenterApiService.listProviderTypes(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getProviderTypeById()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      providerTypeId: '3e25966275dccfa2c3a34786919c5af7',
    };

    const res = await securityAndComplianceCenterApiService.getProviderTypeById(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getLatestReports()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
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

  test('listReports()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      reportAttachmentId: attachmentIdForReportLink,
      groupId: groupIdForReportLink,
      reportProfileId: profileIdForReportLink,
      type: typeForReportLink,
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
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      reportAttachmentId: attachmentIdForReportLink,
      groupId: groupIdForReportLink,
      reportProfileId: profileIdForReportLink,
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
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
    };

    const res = await securityAndComplianceCenterApiService.getReport(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getReportSummary()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      reportId: reportIdForReportLink,
    };

    const res = await securityAndComplianceCenterApiService.getReportSummary(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getReportDownloadFile()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      reportId: reportIdForReportLink,
      accept: 'application/csv',
      excludeSummary: true,
    };

    const res = await securityAndComplianceCenterApiService.getReportDownloadFile(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getReportControls()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      reportId: reportIdForReportLink,
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
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      reportId: reportIdForReportLink,
      ruleId: 'rule-61fa114a-2bb9-43fd-8068-b873b48bdf79',
    };

    const res = await securityAndComplianceCenterApiService.getReportRule(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listReportEvaluations()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      reportId: reportIdForReportLink,
      assessmentId: 'testString',
      assessmentMethod: 'testString',
      componentId: 'testString',
      targetId: 'testString',
      targetEnv: 'testString',
      targetName: 'testString',
      status: 'failure',
      start: 'testString',
      limit: 50,
      sort: 'assessment_id',
      scopeId: 'testString',
      subscopeId: 'testString',
    };

    const res = await securityAndComplianceCenterApiService.listReportEvaluations(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listReportEvaluations() via ReportEvaluationsPager', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      reportId: reportIdForReportLink,
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
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      reportId: reportIdForReportLink,
      id: 'testString',
      resourceName: 'testString',
      accountId: accountIdForReportLink,
      componentId: 'testString',
      status: 'compliant',
      sort: 'account_id',
      start: 'testString',
      limit: 50,
      scopeId: 'testString',
      subscopeId: 'testString',
    };

    const res = await securityAndComplianceCenterApiService.listReportResources(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listReportResources() via ReportResourcesPager', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      reportId: reportIdForReportLink,
      id: 'testString',
      resourceName: 'testString',
      accountId: accountIdForReportLink,
      componentId: 'testString',
      status: 'compliant',
      sort: 'account_id',
      limit: 10,
      scopeId: 'testString',
      subscopeId: 'testString',
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
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      reportId: reportIdForReportLink,
    };

    const res = await securityAndComplianceCenterApiService.getReportTags(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getReportViolationsDrift()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      reportId: reportIdForReportLink,
      scanTimeDuration: 0,
      scopeId: 'testString',
      subscopeId: 'testString',
    };

    const res = await securityAndComplianceCenterApiService.getReportViolationsDrift(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listScanReports()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      reportId: reportIdForReportLink,
      scopeId: 'testString',
      subscopeId: 'testString',
      sort: 'status',
    };

    const res = await securityAndComplianceCenterApiService.listScanReports(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
    scanIdForScanReportLink = res.result.scan_reports[0].id;
  });

  test('createScanReport()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      reportId: reportIdForReportLink,
      format: 'csv',
      scopeId: '132009ff-b982-412e-a110-ad8797e10f84',
      subscopeId: 'c7ddcbcc-6a43-4ab3-b6a7-b2d8f65cd54a',
    };

    const res = await securityAndComplianceCenterApiService.createScanReport(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('getScanReport()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      reportId: reportIdForReportLink,
      jobId: scanIdForScanReportLink,
    };

    const res = await securityAndComplianceCenterApiService.getScanReport(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getScanReportDownloadFile()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      reportId: reportIdForReportLink,
      jobId: scanIdForScanReportLink,
      accept: 'application/csv',
    };

    const res = await securityAndComplianceCenterApiService.getScanReportDownloadFile(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listRules()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      limit: 50,
      start: 'testString',
      type: 'system_defined',
      search: 'testString',
      serviceName: 'testString',
      sort: 'updated_on',
    };

    const res = await securityAndComplianceCenterApiService.listRules(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listRules() via RulesPager', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      limit: 10,
      type: 'system_defined',
      search: 'testString',
      serviceName: 'testString',
      sort: 'updated_on',
    };

    const allResults = [];

    // Test getNext().
    let pager = new SecurityAndComplianceCenterApiV3.RulesPager(securityAndComplianceCenterApiService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new SecurityAndComplianceCenterApiV3.RulesPager(securityAndComplianceCenterApiService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('createRule()', async () => {
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

    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      description: 'Example rule',
      target: ruleTargetPrototypeModel,
      requiredConfig: requiredConfigModel,
      version: '1.0.0',
      _import: importModel,
      labels: [],
    };

    const res = await securityAndComplianceCenterApiService.createRule(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    ruleIdLink = res.result.id;
  });

  test('getRule()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      ruleId: ruleIdLink,
    };

    const res = await securityAndComplianceCenterApiService.getRule(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
    eTagLink = res.headers['etag'];
  });

  test('replaceRule()', async () => {
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

    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      ruleId: ruleIdLink,
      ifMatch: eTagLink,
      description: 'Example rule',
      target: ruleTargetPrototypeModel,
      requiredConfig: requiredConfigModel,
      version: '1.0.1',
      _import: importModel,
      labels: [],
    };

    const res = await securityAndComplianceCenterApiService.replaceRule(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listServices()', async () => {
    const res = await securityAndComplianceCenterApiService.listServices();
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getService()', async () => {
    const params = {
      servicesName: 'cloud-object-storage',
    };

    const res = await securityAndComplianceCenterApiService.getService(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('deleteProfileAttachment()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      profileId: '9c265b4a-4cdf-47f1-acd3-17b5808f7f3f',
      attachmentId: attachmentIdLink,
      accountId: accountIdForReportLink,
    };

    const res = await securityAndComplianceCenterApiService.deleteProfileAttachment(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('deleteCustomControlLibrary()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      controlLibraryId: controlLibraryIdLink,
      accountId: accountIdForReportLink,
    };

    const res = await securityAndComplianceCenterApiService.deleteCustomControlLibrary(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('deleteCustomProfile()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      profileId: profileIdLink,
      accountId: accountIdForReportLink,
    };

    const res = await securityAndComplianceCenterApiService.deleteCustomProfile(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('deleteSubscope()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      scopeId: scopeIdLink,
      subscopeId: subScopeIdLink,
    };

    const res = await securityAndComplianceCenterApiService.deleteSubscope(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test('deleteScope()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      scopeId: scopeIdLink,
    };

    const res = await securityAndComplianceCenterApiService.deleteScope(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test('deleteTarget()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      targetId: targetIdLink,
    };

    const res = await securityAndComplianceCenterApiService.deleteTarget(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test('deleteProviderTypeInstance()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      providerTypeId: '3e25966275dccfa2c3a34786919c5af7',
      providerTypeInstanceId: providerTypeInstanceIdLink,
    };

    const res = await securityAndComplianceCenterApiService.deleteProviderTypeInstance(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test('deleteRule()', async () => {
    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      ruleId: ruleIdLink,
    };

    const res = await securityAndComplianceCenterApiService.deleteRule(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });
});
