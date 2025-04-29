/**
 * @jest-environment node
 */
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
const timeout = 200000;

describe('SecurityAndComplianceCenterApiV3', () => {
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
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
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
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
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

  test('listInstanceAttachments request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listInstanceAttachments() result:');
    // begin-list_instance_attachments

    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      accountId: accountIdForReportLink,
      versionGroupLabel: '6702d85a-6437-4d6f-8701-c0146648787b',
      limit: 10,
      sort: 'created_on',
      direction: 'desc',
    };

    const allResults = [];
    try {
      const pager = new SecurityAndComplianceCenterApiV3.InstanceAttachmentsPager(securityAndComplianceCenterApiService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_instance_attachments
  });

  test('createProfileAttachment request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createProfileAttachment() result:');
    // begin-create_profile_attachment

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

    // ProfileAttachmentBase
    const profileAttachmentBaseModel = {
      attachment_parameters: parameterModels,
      description: 'This is a profile attachment targeting IBM CIS Foundation using a SDK',
      name: 'Profile Attachment for IBM CIS Foundation SDK test',
      notifications: attachmentNotificationsModel,
      schedule: 'daily',
      scope: [multiCloudScopePayloadModel],
      status: 'disabled',
    };

    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      profileId: '9c265b4a-4cdf-47f1-acd3-17b5808f7f3f',
      newAttachments: [profileAttachmentBaseModel],
      newProfileId: '9c265b4a-4cdf-47f1-acd3-17b5808f7f3',
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.createProfileAttachment(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_profile_attachment
    const responseBody = res.result;
    attachmentIdLink = responseBody.attachments[0].id;
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
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      profileId: '9c265b4a-4cdf-47f1-acd3-17b5808f7f3f',
      attachmentId: attachmentIdLink,
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
      status: 'enabled',
      accountId: accountIdForReportLink
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

  test('upgradeAttachment request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('upgradeAttachment() result:');
    // begin-upgrade_attachment

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

    let res;
    try {
      res = await securityAndComplianceCenterApiService.upgradeAttachment(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-upgrade_attachment
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
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      attachmentId: '4deb572c-9f37-4126-9cc0-d550672533cb',
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

  test('createControlLibrary request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createControlLibrary() result:');
    // begin-create_control_library

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

    let res;
    try {
      res = await securityAndComplianceCenterApiService.createControlLibrary(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_control_library
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
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      accountId: accountIdForReportLink,
      limit: 10,
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
      control_parent: '',
      control_specifications: [controlSpecificationPrototypeModel],
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

    let res;
    try {
      res = await securityAndComplianceCenterApiService.replaceCustomControlLibrary(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-replace_custom_control_library
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
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      controlLibraryId: controlLibraryIdLink,
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
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      accountId: accountIdForReportLink,
      limit: 10,
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

    // Parameter
    const parameterModel = {
    };

    // Assessment
    const assessmentModel = {
      parameters: [parameterModel],
    };

    // ControlSpecification
    const controlSpecificationModel = {
      assessments: [assessmentModel],
    };

    // ProfileControls
    const profileControlsModel = {
      control_library_id: 'a046fb6b-aba5-4646-b190-a2c76241e7af',
      control_id: '60dae3b5-6104-4b3e-bac7-26cc7b741aca',
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
      newProfileName: 'Example Profile Updated',
      newProfileDescription: 'This profile has been updated',
      newProfileVersion: '0.0.2',
      newLatest: true,
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
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      profileId: profileIdLink,
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

  test('replaceProfileParameters request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('replaceProfileParameters() result:');
    // begin-replace_profile_parameters

    // Request models needed by this operation.

    // DefaultParameters
    const defaultParametersModel = {
    };

    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      profileId: profileIdLink,
      defaultParameters: [defaultParametersModel],
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.replaceProfileParameters(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-replace_profile_parameters
  });

  test('listProfileParameters request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listProfileParameters() result:');
    // begin-list_profile_parameters

    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      profileId: profileIdLink,
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.listProfileParameters(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_profile_parameters
  });

  test('compareProfiles request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('compareProfiles() result:');
    // begin-compare_profiles

    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      profileId: '2f598907-970d-4d52-9071-5cc95912f55e',
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.compareProfiles(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-compare_profiles
  });

  test('listProfileAttachments request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listProfileAttachments() result:');
    // begin-list_profile_attachments

    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      profileId: '9c265b4a-4cdf-47f1-acd3-17b5808f7f3f',
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.listProfileAttachments(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_profile_attachments
  });

  test('createScope request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createScope() result:');
    // begin-create_scope

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

    let res;
    try {
      res = await securityAndComplianceCenterApiService.createScope(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_scope
    const responseBody = res.result;
    scopeIdLink = responseBody.id;
  });

  test('listScopes request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listScopes() result:');
    // begin-list_scopes

    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      limit: 10,
      name: 'testString',
      description: 'testString',
      environment: 'testString',
    };

    const allResults = [];
    try {
      const pager = new SecurityAndComplianceCenterApiV3.ScopesPager(securityAndComplianceCenterApiService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_scopes
  });

  test('updateScope request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateScope() result:');
    // begin-update_scope

    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      scopeId: scopeIdLink,
      name: 'updated name of scope',
      description: 'updated scope description',
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.updateScope(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_scope
  });

  test('getScope request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getScope() result:');
    // begin-get_scope

    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      scopeId: scopeIdLink,
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.getScope(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_scope
  });

  test('createSubscope request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createSubscope() result:');
    // begin-create_subscope

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

    let res;
    try {
      res = await securityAndComplianceCenterApiService.createSubscope(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_subscope
    const responseBody = res.result;
    subScopeIdLink = responseBody.subscopes[0].id;
  });

  test('listSubscopes request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listSubscopes() result:');
    // begin-list_subscopes

    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      scopeId: scopeIdLink,
      limit: 10,
      name: 'testString',
      description: 'testString',
      environment: 'testString',
    };

    const allResults = [];
    try {
      const pager = new SecurityAndComplianceCenterApiV3.SubscopesPager(securityAndComplianceCenterApiService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_subscopes
  });

  test('getSubscope request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getSubscope() result:');
    // begin-get_subscope

    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      scopeId: scopeIdLink,
      subscopeId: subScopeIdLink,
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.getSubscope(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_subscope
  });

  test('updateSubscope request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateSubscope() result:');
    // begin-update_subscope

    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      scopeId: scopeIdLink,
      subscopeId: subScopeIdLink,
      name: 'updated name of scope',
      description: 'updated scope description',
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.updateSubscope(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_subscope
  });

  test('createTarget request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createTarget() result:');
    // begin-create_target

    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      accountId: '62ecf99b240144dea9125666249edfcb',
      trustedProfileId: 'Profile-cb2c1829-9a8d-4218-b9cd-9f83fc814e54',
      name: 'Target for IBM account',
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.createTarget(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_target
    const responseBody = res.result;
    targetIdLink = responseBody.id;
  });

  test('listTargets request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listTargets() result:');
    // begin-list_targets

    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.listTargets(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_targets
  });

  test('getTarget request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getTarget() result:');
    // begin-get_target

    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      targetId: targetIdLink,
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.getTarget(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_target
  });

  test('replaceTarget request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('replaceTarget() result:');
    // begin-replace_target

    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      targetId: targetIdLink,
      accountId: '62ecf99b240144dea9125666249edfcb',
      trustedProfileId: 'Profile-cb2c1829-9a8d-4218-b9cd-9f83fc814e54',
      name: 'Updated SDK target',
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.replaceTarget(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-replace_target
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
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      providerTypeId: '3e25966275dccfa2c3a34786919c5af7',
      name: 'Caveonix-instance-1',
      attributes: {},
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
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      providerTypeId: '3e25966275dccfa2c3a34786919c5af7',
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
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      providerTypeId: '3e25966275dccfa2c3a34786919c5af7',
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
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      providerTypeId: '3e25966275dccfa2c3a34786919c5af7',
      providerTypeInstanceId: providerTypeInstanceIdLink,
      name: 'Caveonix-instance-1',
      attributes: {},
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

    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.listProviderTypes(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_provider_types
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
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      providerTypeId: '3e25966275dccfa2c3a34786919c5af7',
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
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
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
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      reportAttachmentId: attachmentIdForReportLink,
      groupId: groupIdForReportLink,
      reportProfileId: profileIdForReportLink,
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
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
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
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
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

  test('getReportDownloadFile request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getReportDownloadFile() result:');
    // begin-get_report_download_file

    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      reportId: reportIdForReportLink,
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.getReportDownloadFile(params);
      // response is binary
      // fs.writeFileSync('result.out', res.result);
    } catch (err) {
      console.warn(err);
    }

    // end-get_report_download_file
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
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
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
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      reportId: reportIdForReportLink,
      ruleId: 'rule-61fa114a-2bb9-43fd-8068-b873b48bdf79',
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
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
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
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
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

  test('listScanReports request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listScanReports() result:');
    // begin-list_scan_reports

    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      reportId: reportIdForReportLink,
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.listScanReports(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_scan_reports
    const responseBody = res.result;
    scanIdForScanReportLink = responseBody.scan_reports[0].id;
  });

  test('createScanReport request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createScanReport() result:');
    // begin-create_scan_report

    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      reportId: reportIdForReportLink,
      format: 'csv',
      scopeId: '132009ff-b982-412e-a110-ad8797e10f84',
      subscopeId: 'c7ddcbcc-6a43-4ab3-b6a7-b2d8f65cd54a',
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.createScanReport(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_scan_report
  });

  test('getScanReport request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getScanReport() result:');
    // begin-get_scan_report

    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      reportId: reportIdForReportLink,
      jobId: scanIdForScanReportLink,
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.getScanReport(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_scan_report
  });

  test('getScanReportDownloadFile request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getScanReportDownloadFile() result:');
    // begin-get_scan_report_download_file

    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      reportId: reportIdForReportLink,
      jobId: scanIdForScanReportLink,
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.getScanReportDownloadFile(params);
      // response is binary
      // fs.writeFileSync('result.out', res.result);
    } catch (err) {
      console.warn(err);
    }

    // end-get_scan_report_download_file
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
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      limit: 10,
      type: 'system_defined',
      search: 'testString',
      serviceName: 'testString',
      sort: 'updated_on',
    };

    const allResults = [];
    try {
      const pager = new SecurityAndComplianceCenterApiV3.RulesPager(securityAndComplianceCenterApiService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_rules
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
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
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

    let res;
    try {
      res = await securityAndComplianceCenterApiService.replaceRule(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-replace_rule
  });

  test('listServices request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listServices() result:');
    // begin-list_services

    let res;
    try {
      res = await securityAndComplianceCenterApiService.listServices({});
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_services
  });

  test('getService request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getService() result:');
    // begin-get_service

    const params = {
      servicesName: 'cloud-object-storage',
    };

    let res;
    try {
      res = await securityAndComplianceCenterApiService.getService(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_service
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
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      profileId: '9c265b4a-4cdf-47f1-acd3-17b5808f7f3f',
      attachmentId: attachmentIdLink,
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
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      controlLibraryId: controlLibraryIdLink,
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
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      profileId: profileIdLink,
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

  test('deleteSubscope request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_subscope

    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      scopeId: scopeIdLink,
      subscopeId: subScopeIdLink,
    };

    try {
      await securityAndComplianceCenterApiService.deleteSubscope(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_subscope
  });

  test('deleteScope request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_scope

    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      scopeId: scopeIdLink,
    };

    try {
      await securityAndComplianceCenterApiService.deleteScope(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_scope
  });

  test('deleteTarget request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_target

    const params = {
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      targetId: targetIdLink,
    };

    try {
      await securityAndComplianceCenterApiService.deleteTarget(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_target
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
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      providerTypeId: '3e25966275dccfa2c3a34786919c5af7',
      providerTypeInstanceId: providerTypeInstanceIdLink,
    };

    try {
      await securityAndComplianceCenterApiService.deleteProviderTypeInstance(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_provider_type_instance
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
      instanceId: 'acd7032c-15a3-484f-bf5b-67d41534d940',
      ruleId: ruleIdLink,
    };

    try {
      await securityAndComplianceCenterApiService.deleteRule(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_rule
  });
});
