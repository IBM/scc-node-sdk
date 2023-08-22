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
/* eslint-disable no-await-in-loop */

const SecurityAndComplianceCenterApiV3 = require('../dist/security-and-compliance-center-api/v3');
// eslint-disable-next-line node/no-unpublished-require
const authHelper = require('../test/resources/auth-helper.js');
// You can use the readExternalSources method to access additional configuration values
// const { readExternalSources } = require('ibm-cloud-sdk-core');

//
// This file provides an example of how to use the Security and Compliance Center API service.
//
// The following configuration properties are assumed to be defined:
// SECURITY_AND_COMPLIANCE_CENTER_API_URL=<service base url>
// SECURITY_AND_COMPLIANCE_CENTER_API_AUTH_TYPE=iam
// SECURITY_AND_COMPLIANCE_CENTER_API_APIKEY=<IAM apikey>
// SECURITY_AND_COMPLIANCE_CENTER_API_AUTH_URL=<IAM token service base URL - omit this if using the production environment>
//
// These configuration properties can be exported as environment variables, or stored
// in a configuration file and then:
// export IBM_CREDENTIALS_FILE=<name of configuration file>
//
const configFile = 'security_and_compliance_center_api_v3.env';

const describe = authHelper.prepareTests(configFile);

// Save original console.log
const originalLog = console.log;
const originalWarn = console.warn;

// Mocks for console.log and console.warn
const consoleLogMock = jest.spyOn(console, 'log');
const consoleWarnMock = jest.spyOn(console, 'warn');

describe('SecurityAndComplianceCenterApiV3', () => {
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

  // To access additional configuration values, uncomment this line and extract the values from config
  // const config = readExternalSources(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME);

  test('Initialize service', async () => {
    // begin-common

    securityAndComplianceCenterApiService = SecurityAndComplianceCenterApiV3.newInstance();

    // end-common
  });

  test('getSettings request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getSettings() result:');
    // begin-get_settings

    const params = {
      xCorrelationId: '1a2b3c4d-5e6f-4a7b-8c9d-e0f1a2b3c4d5',
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.getSettings(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_settings
    const responseBody = res.result;
    eventNotificationsCrnForUpdateSettingsLink = responseBody.event_notifications.instance_crn;
    objectStorageCrnForUpdateSettingsLink = responseBody.object_storage.instance_crn;
    objectStorageBucketForUpdateSettingsLink = responseBody.object_storage.bucket;
    objectStorageLocationForUpdateSettingsLink = responseBody.object_storage.bucket_location;
  });

  test('createRule request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createRule() result:');
    // begin-create_rule

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
      resource_kind: 'bucket',
      additional_target_attributes: [additionalTargetAttributeModel],
    };

    // RequiredConfigItemsRequiredConfigBase
    const requiredConfigItemsModel = {
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
      version: '1.0.0',
      _import: importModel,
      labels: [],
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.createRule(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_rule
    const responseBody = res.result;
    ruleIdLink = responseBody.id;
  });

  test('getRule request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getRule() result:');
    // begin-get_rule

    const params = {
      ruleId: ruleIdLink,
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.getRule(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_rule
    const responseBody = res.result;
    eTagLink = res.headers['etag'];
  });

  test('getLatestReports request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getLatestReports() result:');
    // begin-get_latest_reports

    const params = {
      sort: 'profile_name',
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.getLatestReports(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_latest_reports
    const responseBody = res.result;
    accountIdForReportLink = responseBody.reports[0].account.id;
    reportIdForReportLink = responseBody.reports[0].id;
    attachmentIdForReportLink = responseBody.reports[0].attachment.id;
    groupIdForReportLink = responseBody.reports[0].group_id;
    profileIdForReportLink = responseBody.reports[0].profile.id;
    typeForReportLink = responseBody.reports[0].type;
  });

  test('updateSettings request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateSettings() result:');
    // begin-update_settings

    // Request models needed by this operation.

    // EventNotifications
    const eventNotificationsModel = {
      instance_crn: eventNotificationsCrnForUpdateSettingsLink,
      source_description: 'This source is used for integration with IBM Cloud Security and Compliance Center.',
      source_name: 'compliance',
    };

    // ObjectStorage
    const objectStorageModel = {
      instance_crn: objectStorageCrnForUpdateSettingsLink,
      bucket: objectStorageBucketForUpdateSettingsLink,
      bucket_location: objectStorageLocationForUpdateSettingsLink,
    };

    const params = {
      eventNotifications: eventNotificationsModel,
      objectStorage: objectStorageModel,
      xCorrelationId: '1a2b3c4d-5e6f-4a7b-8c9d-e0f1a2b3c4d5',
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.updateSettings(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_settings
  });

  test('postTestEvent request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('postTestEvent() result:');
    // begin-post_test_event

    const params = {
      xCorrelationId: '1a2b3c4d-5e6f-4a7b-8c9d-e0f1a2b3c4d5',
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.postTestEvent(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-post_test_event
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

    // Request models needed by this operation.

    // ParameterInfo
    const parameterInfoModel = {
      parameter_name: 'session_invalidation_in_seconds',
      parameter_display_name: 'Sign out due to inactivity in seconds',
      parameter_type: 'numeric',
    };

    // Implementation
    const implementationModel = {
      assessment_id: 'rule-a637949b-7e51-46c4-afd4-b96619001bf1',
      assessment_method: 'ibm-cloud-rule',
      assessment_type: 'automated',
      assessment_description: 'Check that there is an Activity Tracker event route defined to collect global events generated by IBM Cloud services',
      parameters: [parameterInfoModel],
    };

    // ControlSpecifications
    const controlSpecificationsModel = {
      control_specification_id: '5c7d6f88-a92f-4734-9b49-bd22b0900184',
      component_id: 'iam-identity',
      environment: 'ibm-cloud',
      control_specification_description: 'IBM cloud',
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
    };

    const params = {
      controlLibraryName: 'IBM Cloud for Financial Services',
      controlLibraryDescription: 'IBM Cloud for Financial Services',
      controlLibraryType: 'custom',
      controls: [controlsInControlLibModel],
      versionGroupLabel: '33fc7b80-0fa5-4f16-bbba-1f293f660f0d',
      controlLibraryVersion: '1.0.0',
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.createCustomControlLibrary(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_custom_control_library
    const responseBody = res.result;
    controlLibraryIdLink = responseBody.id;
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
      xCorrelationId: 'testString',
      xRequestId: 'testString',
      limit: 50,
      controlLibraryType: 'custom',
    };

    const allResults = [];
    try {
      const pager = new SecurityAndComplianceCenterApiV3.ControlLibrariesPager(securityAndComplianceCenterApiService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_control_libraries
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
      controlLibrariesId: controlLibraryIdLink,
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.getControlLibrary(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_control_library
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

    // Request models needed by this operation.

    // ParameterInfo
    const parameterInfoModel = {
      parameter_name: 'session_invalidation_in_seconds',
      parameter_display_name: 'Sign out due to inactivity in seconds',
      parameter_type: 'numeric',
    };

    // Implementation
    const implementationModel = {
      assessment_id: 'rule-a637949b-7e51-46c4-afd4-b96619001bf1',
      assessment_method: 'ibm-cloud-rule',
      assessment_type: 'automated',
      assessment_description: 'Check that there is an Activity Tracker event route defined to collect global events generated by IBM Cloud services',
      parameters: [parameterInfoModel],
    };

    // ControlSpecifications
    const controlSpecificationsModel = {
      control_specification_id: '5c7d6f88-a92f-4734-9b49-bd22b0900184',
      responsibility: 'user',
      component_id: 'iam-identity',
      environment: 'ibm-cloud',
      control_specification_description: 'IBM cloud',
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
    };

    const params = {
      controlLibrariesId: controlLibraryIdLink,
      controlLibraryName: 'IBM Cloud for Financial Services',
      controlLibraryDescription: 'IBM Cloud for Financial Services',
      controlLibraryType: 'custom',
      controlLibraryVersion: '1.1.0',
      controls: [controlsInControlLibModel],
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.replaceCustomControlLibrary(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-replace_custom_control_library
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
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.createProfile(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_profile
    const responseBody = res.result;
    profileIdLink = responseBody.id;
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
      xCorrelationId: 'testString',
      xRequestId: 'testString',
      limit: 10,
      profileType: 'custom',
    };

    const allResults = [];
    try {
      const pager = new SecurityAndComplianceCenterApiV3.ProfilesPager(securityAndComplianceCenterApiService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_profiles
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
      profilesId: profileIdLink,
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.getProfile(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_profile
  });

  test('replaceProfile request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('replaceProfile() result:');
    // begin-replace_profile

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
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.replaceProfile(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-replace_profile
  });

  test('listRules request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listRules() result:');
    // begin-list_rules

    const params = {
      type: 'system_defined',
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.listRules(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_rules
  });

  test('replaceRule request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('replaceRule() result:');
    // begin-replace_rule

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
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.replaceRule(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-replace_rule
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
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.createAttachment(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_attachment
    const responseBody = res.result;
    attachmentIdLink = responseBody.attachments[0].id;
  });

  test('listAttachments request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listAttachments() result:');
    // begin-list_attachments

    const params = {
      profilesId: profileIdLink,
      xCorrelationId: 'testString',
      xRequestId: 'testString',
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new SecurityAndComplianceCenterApiV3.AttachmentsPager(securityAndComplianceCenterApiService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_attachments
  });

  test('getProfileAttachment request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getProfileAttachment() result:');
    // begin-get_profile_attachment

    const params = {
      attachmentId: attachmentIdLink,
      profilesId: profileIdLink,
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.getProfileAttachment(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_profile_attachment
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

    const params = {
      attachmentId: attachmentIdLink,
      profilesId: profileIdLink,
      scope: [multiCloudScopeModel],
      status: 'enabled',
      schedule: 'every_30_days',
      notifications: attachmentsNotificationsPrototypeModel,
      attachmentParameters: [attachmentParameterPrototypeModel],
      name: 'account-0d8c3805dfea40aa8ad02265a18eb12b',
      description: 'Test description',
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.replaceProfileAttachment(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-replace_profile_attachment
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
      attachmentId: attachmentIdLink,
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.createScan(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_scan
  });

  test('listAttachmentsAccount request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listAttachmentsAccount() result:');
    // begin-list_attachments_account

    const params = {
      xCorrelationId: 'testString',
      xRequestId: 'testString',
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new SecurityAndComplianceCenterApiV3.AttachmentsAccountPager(securityAndComplianceCenterApiService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_attachments_account
  });

  test('listReports request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listReports() result:');
    // begin-list_reports

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
    try {
      const pager = new SecurityAndComplianceCenterApiV3.ReportsPager(securityAndComplianceCenterApiService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_reports
  });

  test('getReport request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getReport() result:');
    // begin-get_report

    const params = {
      reportId: reportIdForReportLink,
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.getReport(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_report
  });

  test('getReportSummary request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getReportSummary() result:');
    // begin-get_report_summary

    const params = {
      reportId: reportIdForReportLink,
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.getReportSummary(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_report_summary
  });

  test('getReportEvaluation request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getReportEvaluation() result:');
    // begin-get_report_evaluation

    const params = {
      reportId: reportIdForReportLink,
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.getReportEvaluation(params);
      // response is binary
      // fs.writeFileSync('result.out', res.result);
    } catch (err) {
      console.warn(err);
    }

    // end-get_report_evaluation
  });

  test('getReportControls request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getReportControls() result:');
    // begin-get_report_controls

    const params = {
      reportId: reportIdForReportLink,
      status: 'compliant',
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.getReportControls(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_report_controls
  });

  test('getReportRule request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getReportRule() result:');
    // begin-get_report_rule

    const params = {
      reportId: reportIdForReportLink,
      ruleId: 'rule-8d444f8c-fd1d-48de-bcaa-f43732568761',
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.getReportRule(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_report_rule
  });

  test('listReportEvaluations request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listReportEvaluations() result:');
    // begin-list_report_evaluations

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
    try {
      const pager = new SecurityAndComplianceCenterApiV3.ReportEvaluationsPager(securityAndComplianceCenterApiService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_report_evaluations
  });

  test('listReportResources request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listReportResources() result:');
    // begin-list_report_resources

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
    try {
      const pager = new SecurityAndComplianceCenterApiV3.ReportResourcesPager(securityAndComplianceCenterApiService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_report_resources
  });

  test('getReportTags request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getReportTags() result:');
    // begin-get_report_tags

    const params = {
      reportId: reportIdForReportLink,
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.getReportTags(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_report_tags
  });

  test('getReportViolationsDrift request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getReportViolationsDrift() result:');
    // begin-get_report_violations_drift

    const params = {
      reportId: reportIdForReportLink,
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.getReportViolationsDrift(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_report_violations_drift
  });

  test('listProviderTypes request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listProviderTypes() result:');
    // begin-list_provider_types

    let res;
    try {
      res = await securityAndComplianceCenterApiService.listProviderTypes({});
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_provider_types
    const responseBody = res.result;
    providerTypeIdLink = responseBody.provider_types[0].id;
  });

  test('getProviderTypeById request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getProviderTypeById() result:');
    // begin-get_provider_type_by_id

    const params = {
      providerTypeId: providerTypeIdLink,
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.getProviderTypeById(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_provider_type_by_id
  });

  test('listProviderTypeInstances request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listProviderTypeInstances() result:');
    // begin-list_provider_type_instances

    const params = {
      providerTypeId: providerTypeIdLink,
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.listProviderTypeInstances(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_provider_type_instances
  });

  test('createProviderTypeInstance request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createProviderTypeInstance() result:');
    // begin-create_provider_type_instance

    const params = {
      providerTypeId: providerTypeIdLink,
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.createProviderTypeInstance(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_provider_type_instance
    const responseBody = res.result;
    providerTypeInstanceIdLink = responseBody.id;
  });

  test('getProviderTypeInstance request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getProviderTypeInstance() result:');
    // begin-get_provider_type_instance

    const params = {
      providerTypeId: providerTypeIdLink,
      providerTypeInstanceId: providerTypeInstanceIdLink,
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.getProviderTypeInstance(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_provider_type_instance
  });

  test('updateProviderTypeInstance request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateProviderTypeInstance() result:');
    // begin-update_provider_type_instance

    const params = {
      providerTypeId: providerTypeIdLink,
      providerTypeInstanceId: providerTypeInstanceIdLink,
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.updateProviderTypeInstance(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_provider_type_instance
  });

  test('getProviderTypesInstances request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getProviderTypesInstances() result:');
    // begin-get_provider_types_instances

    let res;
    try {
      res = await securityAndComplianceCenterApiService.getProviderTypesInstances({});
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_provider_types_instances
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
      profilesId: profileIdLink,
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.deleteCustomProfile(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-delete_custom_profile
  });

  test('deleteCustomControlLibrary request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('deleteCustomControlLibrary() result:');
    // begin-delete_custom_control_library

    const params = {
      controlLibrariesId: controlLibraryIdLink,
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.deleteCustomControlLibrary(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-delete_custom_control_library
  });

  test('deleteRule request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_rule

    const params = {
      ruleId: ruleIdLink,
    };

    try {
      await securityAndComplianceCenterApiService.deleteRule(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_rule
  });

  test('deleteProfileAttachment request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('deleteProfileAttachment() result:');
    // begin-delete_profile_attachment

    const params = {
      attachmentId: attachmentIdLink,
      profilesId: profileIdLink,
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.deleteProfileAttachment(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-delete_profile_attachment
  });

  test('deleteProviderTypeInstance request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_provider_type_instance

    const params = {
      providerTypeId: providerTypeIdLink,
      providerTypeInstanceId: providerTypeInstanceIdLink,
    };

    try {
      await securityAndComplianceCenterApiService.deleteProviderTypeInstance(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_provider_type_instance
  });
});
