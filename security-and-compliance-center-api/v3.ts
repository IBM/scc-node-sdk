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

/**
 * IBM OpenAPI SDK Code Generator Version: 3.98.0-8be2046a-20241205-162752
 */

/* eslint-disable max-classes-per-file */
/* eslint-disable no-await-in-loop */

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import {
  Authenticator,
  BaseService,
  UserOptions,
  getAuthenticatorFromEnvironment,
  validateParams,
} from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * The Security and Compliance Center API reference.
 *
 */

class SecurityAndComplianceCenterApiV3 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://us-south.compliance.cloud.ibm.com';

  static DEFAULT_SERVICE_NAME: string = 'security_and_compliance_center_api';

  private static _regionalEndpoints = new Map([
    ['us-south', 'https://us-south.compliance.cloud.ibm.com'], // Dallas region
    ['eu-de', 'https://eu-de.compliance.cloud.ibm.com'], // Frankfurt region
    ['eu-fr2', 'https://eu-fr2.compliance.cloud.ibm.com'], // Frankfurt region(Restricted)
    ['ca-tor', 'https://ca-tor.compliance.cloud.ibm.com'], // Toronto region
    ['au-syd', 'https://au-syd.compliance.cloud.ibm.com'], // Sydney region
    ['eu-es', 'https://eu-es.compliance.cloud.ibm.com'], // Madrid region
  ]);

  /**
   * Returns the service URL associated with the specified region.
   * @param region a string representing the region
   * @returns the service URL associated with the specified region or undefined
   * if no mapping for the region exists
   */
  public static getServiceUrlForRegion(region: string): string {
    return this._regionalEndpoints.get(region)
  }

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of SecurityAndComplianceCenterApiV3 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The base URL for the service
   * @returns {SecurityAndComplianceCenterApiV3}
   */

  public static newInstance(options: UserOptions): SecurityAndComplianceCenterApiV3 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new SecurityAndComplianceCenterApiV3(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /**
   * Construct a SecurityAndComplianceCenterApiV3 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.serviceUrl] - The base URL for the service
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {SecurityAndComplianceCenterApiV3}
   */
  constructor(options: UserOptions) {
    options = options || {};

    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_URL);
    }
  }

  /*************************
   * setting
   ************************/

  /**
   * List settings.
   *
   * Retrieve the settings of your service instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Settings>>}
   */
  public getSettings(
    params: SecurityAndComplianceCenterApiV3.GetSettingsParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Settings>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId'];
    const _validParams = ['instanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'getSettings');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/settings',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update settings.
   *
   * Update the settings of your service instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {ObjectStoragePrototype} [params.objectStorage] - The payload to connect a Cloud Object Storage instance to
   * an Security and Compliance Center instance.
   * @param {EventNotificationsPrototype} [params.eventNotifications] - The payload to connect an Event Notification
   * instance with a Security and Compliance Center instance.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Settings>>}
   */
  public updateSettings(
    params: SecurityAndComplianceCenterApiV3.UpdateSettingsParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Settings>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId'];
    const _validParams = ['instanceId', 'objectStorage', 'eventNotifications', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'object_storage': _params.objectStorage,
      'event_notifications': _params.eventNotifications,
    };

    const path = {
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'updateSettings');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/settings',
        method: 'PATCH',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create a test event.
   *
   * Send a test event to your Event Notifications instance to ensure that the events that are generated  by Security
   * and Compliance Center are being forwarded to Event Notifications. For more information, see [Enabling event
   * notifications](/docs/security-compliance?topic=security-compliance-event-notifications#event-notifications-test-api).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.TestEvent>>}
   */
  public postTestEvent(
    params: SecurityAndComplianceCenterApiV3.PostTestEventParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.TestEvent>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId'];
    const _validParams = ['instanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'postTestEvent');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/test_event',
        method: 'POST',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * attachment
   ************************/

  /**
   * Get all instance attachments.
   *
   * Retrieve all instance attachments.
   *
   * With Security and Compliance Center, you can evaluate your resources on a recurring schedule or you can initiate a
   * scan at any time. To evaluate your resources, you create an attachment. An attachment is the association between
   * the set of resources that you want to evaluate and a profile that contains the specific controls that you want to
   * use. For more information, see [Running an evaluation for IBM
   * Cloud](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-scan-resources).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} [params.accountId] - The user account ID.
   * @param {string} [params.versionGroupLabel] - The profile version group label.
   * @param {number} [params.limit] - The number of items that are retrieved in a collection.
   * @param {string} [params.sort] - The sorted collection of attachments. The available values are `created_on` and
   * `scope_type`.
   * @param {string} [params.direction] - The collection of attachments that is sorted in ascending order. To sort the
   * collection in descending order, use the `DESC` schema.
   * @param {string} [params.start] - The reference to the first item in the results page. Take the value from the
   * `next` field that is in the response from the previous page.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProfileAttachmentCollection>>}
   */
  public listInstanceAttachments(
    params: SecurityAndComplianceCenterApiV3.ListInstanceAttachmentsParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProfileAttachmentCollection>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId'];
    const _validParams = ['instanceId', 'accountId', 'versionGroupLabel', 'limit', 'sort', 'direction', 'start', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account_id': _params.accountId,
      'version_group_label': _params.versionGroupLabel,
      'limit': _params.limit,
      'sort': _params.sort,
      'direction': _params.direction,
      'start': _params.start,
    };

    const path = {
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'listInstanceAttachments');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/attachments',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create an attachment.
   *
   * Create an attachment to link to a profile.
   *
   * With Security and Compliance Center, you can evaluate your resources on a recurring schedule or you can initiate a
   * scan at any time. To evaluate your resources, you create an attachment. An attachment is the association between
   * the set of resources that you want to evaluate and a profile that contains the specific controls that you want to
   * use. For more information, see [Running an evaluation for IBM
   * Cloud](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-scan-resources).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.profileId - The profile ID.
   * @param {ProfileAttachmentBase[]} params.newAttachments - The Prototype to create a profile attachment.
   * @param {string} [params.newProfileId] - The profile ID to target against.
   * @param {string} [params.accountId] - The user account ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProfileAttachmentResponse>>}
   */
  public createProfileAttachment(
    params: SecurityAndComplianceCenterApiV3.CreateProfileAttachmentParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProfileAttachmentResponse>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'profileId', 'newAttachments'];
    const _validParams = ['instanceId', 'profileId', 'newAttachments', 'newProfileId', 'accountId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'attachments': _params.newAttachments,
      'profile_id': _params.newProfileId,
    };

    const query = {
      'account_id': _params.accountId,
    };

    const path = {
      'instance_id': _params.instanceId,
      'profile_id': _params.profileId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'createProfileAttachment');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/profiles/{profile_id}/attachments',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get an attachment.
   *
   * Retrieve an attachment that is linked to a profile by specifying the attachment ID.
   *
   * With Security and Compliance Center, you can evaluate your resources on a recurring schedule or you can initiate a
   * scan at any time. To evaluate your resources, you create an attachment. An attachment is the association between
   * the set of resources that you want to evaluate and a profile that contains the specific controls that you want to
   * use. For more information, see [Running an evaluation for IBM
   * Cloud](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-scan-resources).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.profileId - The profile ID.
   * @param {string} params.attachmentId - The attachment ID.
   * @param {string} [params.accountId] - The user account ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProfileAttachment>>}
   */
  public getProfileAttachment(
    params: SecurityAndComplianceCenterApiV3.GetProfileAttachmentParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProfileAttachment>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'profileId', 'attachmentId'];
    const _validParams = ['instanceId', 'profileId', 'attachmentId', 'accountId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account_id': _params.accountId,
    };

    const path = {
      'instance_id': _params.instanceId,
      'profile_id': _params.profileId,
      'attachment_id': _params.attachmentId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'getProfileAttachment');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/profiles/{profile_id}/attachments/{attachment_id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update an attachment.
   *
   * Update an attachment that is linked to a profile.
   *
   * With Security and Compliance Center, you can evaluate your resources on a recurring schedule or you can initiate a
   * scan at any time. To evaluate your resources, you create an attachment. An attachment is the association between
   * the set of resources that you want to evaluate and a profile that contains the specific controls that you want to
   * use. For more information, see [Running an evaluation for IBM
   * Cloud](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-scan-resources).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.profileId - The profile ID.
   * @param {string} params.attachmentId - The attachment ID.
   * @param {Parameter[]} params.attachmentParameters - The parameters associated with the profile attachment.
   * @param {string} params.description - The details to describe the profile attachment.
   * @param {string} params.name - The name of the Profile Attachment.
   * @param {AttachmentNotifications} params.notifications - The notification configuration of the attachment.
   * @param {string} params.schedule - Details how often a scan from a profile attachment is ran.
   * @param {MultiCloudScopePayload[]} params.scope - A list of scopes associated with a profile attachment.
   * @param {string} params.status - Details the state of a profile attachment.
   * @param {DateRange} [params.dataSelectionRange] - Date range.
   * @param {string} [params.accountId] - The user account ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProfileAttachment>>}
   */
  public replaceProfileAttachment(
    params: SecurityAndComplianceCenterApiV3.ReplaceProfileAttachmentParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProfileAttachment>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'profileId', 'attachmentId', 'attachmentParameters', 'description', 'name', 'notifications', 'schedule', 'scope', 'status'];
    const _validParams = ['instanceId', 'profileId', 'attachmentId', 'attachmentParameters', 'description', 'name', 'notifications', 'schedule', 'scope', 'status', 'dataSelectionRange', 'accountId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'attachment_parameters': _params.attachmentParameters,
      'description': _params.description,
      'name': _params.name,
      'notifications': _params.notifications,
      'schedule': _params.schedule,
      'scope': _params.scope,
      'status': _params.status,
      'data_selection_range': _params.dataSelectionRange,
    };

    const query = {
      'account_id': _params.accountId,
    };

    const path = {
      'instance_id': _params.instanceId,
      'profile_id': _params.profileId,
      'attachment_id': _params.attachmentId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'replaceProfileAttachment');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/profiles/{profile_id}/attachments/{attachment_id}',
        method: 'PUT',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete an attachment.
   *
   * Delete an attachment that is linked to a profile.
   *
   * With Security and Compliance Center, you can evaluate your resources on a recurring schedule or you can initiate a
   * scan at any time. To evaluate your resources, you create an attachment. An attachment is the association between
   * the set of resources that you want to evaluate and a profile that contains the specific controls that you want to
   * use. For more information, see [Running an evaluation for IBM
   * Cloud](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-scan-resources).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.profileId - The profile ID.
   * @param {string} params.attachmentId - The attachment ID.
   * @param {string} [params.accountId] - The user account ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProfileAttachment>>}
   */
  public deleteProfileAttachment(
    params: SecurityAndComplianceCenterApiV3.DeleteProfileAttachmentParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProfileAttachment>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'profileId', 'attachmentId'];
    const _validParams = ['instanceId', 'profileId', 'attachmentId', 'accountId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account_id': _params.accountId,
    };

    const path = {
      'instance_id': _params.instanceId,
      'profile_id': _params.profileId,
      'attachment_id': _params.attachmentId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'deleteProfileAttachment');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/profiles/{profile_id}/attachments/{attachment_id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Upgrade an attachment.
   *
   * Upgrade an attachment to the latest version of a profile.
   *
   * With Security and Compliance Center, you can evaluate your resources on a recurring schedule or you can initiate a
   * scan at any time. To evaluate your resources, you create an attachment. An attachment is the association between
   * the set of resources that you want to evaluate and a profile that contains the specific controls that you want to
   * use. For more information, see [Running an evaluation for IBM
   * Cloud](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-scan-resources).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.profileId - The profile ID.
   * @param {string} params.attachmentId - The attachment ID.
   * @param {Parameter[]} params.attachmentParameters - The attachment_parameters to set for a Profile Attachment.
   * @param {string} [params.accountId] - The user account ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProfileAttachment>>}
   */
  public upgradeAttachment(
    params: SecurityAndComplianceCenterApiV3.UpgradeAttachmentParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProfileAttachment>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'profileId', 'attachmentId', 'attachmentParameters'];
    const _validParams = ['instanceId', 'profileId', 'attachmentId', 'attachmentParameters', 'accountId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'attachment_parameters': _params.attachmentParameters,
    };

    const query = {
      'account_id': _params.accountId,
    };

    const path = {
      'instance_id': _params.instanceId,
      'profile_id': _params.profileId,
      'attachment_id': _params.attachmentId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'upgradeAttachment');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/profiles/{profile_id}/attachments/{attachment_id}/upgrade',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create a scan.
   *
   * Create a scan to evaluate your resources.
   *
   * With Security and Compliance Center, you can evaluate your resources on a recurring schedule. If your attachment
   * exists, but you don't want to wait for the next scan to see your posture, you can initiate an on-demand scan. For
   * more information, see [Running a scan on
   * demand](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-scan-resources#scan-ondemand-api).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} [params.attachmentId] - The ID of the profile attachment.
   * @param {string} [params.accountId] - The user account ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.CreateScanResponse>>}
   */
  public createScan(
    params: SecurityAndComplianceCenterApiV3.CreateScanParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.CreateScanResponse>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId'];
    const _validParams = ['instanceId', 'attachmentId', 'accountId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'attachment_id': _params.attachmentId,
    };

    const query = {
      'account_id': _params.accountId,
    };

    const path = {
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'createScan');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/scans',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * controlLibrary
   ************************/

  /**
   * Create a custom control library.
   *
   * Create a custom control library that is specific to your organization's needs.
   *
   * With Security and Compliance Center, you can create a custom control library that is specific to your
   * organization's needs. You define the controls and specifications before you map previously created assessments.
   * Each control has several specifications and assessments that are mapped to it. A specification is a defined
   * requirement that is specific to a component. An assessment, or several, are mapped to each specification with a
   * detailed evaluation that is done to check whether the specification is compliant. For more information, see
   * [Creating custom
   * libraries](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-custom-library).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.controlLibraryName - The name of the control library.
   * @param {string} params.controlLibraryDescription - Details of the control library.
   * @param {string} params.controlLibraryType - Details that the control library is a user made(custom) or Security
   * Compliance Center(predefined).
   * @param {string} params.controlLibraryVersion - The revision number of the control library.
   * @param {ControlPrototype[]} params.controls - The list of rules that the control library attempts to adhere to.
   * @param {string} [params.accountId] - The user account ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ControlLibrary>>}
   */
  public createControlLibrary(
    params: SecurityAndComplianceCenterApiV3.CreateControlLibraryParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ControlLibrary>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'controlLibraryName', 'controlLibraryDescription', 'controlLibraryType', 'controlLibraryVersion', 'controls'];
    const _validParams = ['instanceId', 'controlLibraryName', 'controlLibraryDescription', 'controlLibraryType', 'controlLibraryVersion', 'controls', 'accountId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'control_library_name': _params.controlLibraryName,
      'control_library_description': _params.controlLibraryDescription,
      'control_library_type': _params.controlLibraryType,
      'control_library_version': _params.controlLibraryVersion,
      'controls': _params.controls,
    };

    const query = {
      'account_id': _params.accountId,
    };

    const path = {
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'createControlLibrary');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/control_libraries',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get all control libraries.
   *
   * Retrieve all the control libraries, including predefined, and custom libraries.
   *
   * With Security and Compliance Center, you can create a custom control library that is specific to your
   * organization's needs. You define the controls and specifications before you map previously created assessments.
   * Each control has several specifications and assessments that are mapped to it. A specification is a defined
   * requirement that is specific to a component. An assessment, or several, are mapped to each specification with a
   * detailed evaluation that is done to check whether the specification is compliant. For more information, see
   * [Creating custom
   * libraries](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-custom-library).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} [params.accountId] - The user account ID.
   * @param {number} [params.limit] - The indication of how many resources to return, unless the response is the last
   * page of resources.
   * @param {string} [params.start] - Determine what resource to start the page on or after.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ControlLibraryCollection>>}
   */
  public listControlLibraries(
    params: SecurityAndComplianceCenterApiV3.ListControlLibrariesParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ControlLibraryCollection>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId'];
    const _validParams = ['instanceId', 'accountId', 'limit', 'start', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account_id': _params.accountId,
      'limit': _params.limit,
      'start': _params.start,
    };

    const path = {
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'listControlLibraries');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/control_libraries',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update a custom control library.
   *
   * Update a custom control library by specifying its ID.
   *
   * With Security and Compliance Center, you can create a custom control library that is specific to your
   * organization's needs. You define the controls and specifications before you map previously created assessments.
   * Each control has several specifications and assessments that are mapped to it. A specification is a defined
   * requirement that is specific to a component. An assessment, or several, are mapped to each specification with a
   * detailed evaluation that is done to check whether the specification is compliant. For more information, see
   * [Creating custom
   * libraries](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-custom-library).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.controlLibraryId - The control library ID.
   * @param {string} params.controlLibraryName - The name of the control library.
   * @param {string} params.controlLibraryDescription - Details of the control library.
   * @param {string} params.controlLibraryType - Details that the control library is a user made(custom) or Security
   * Compliance Center(predefined).
   * @param {string} params.controlLibraryVersion - The revision number of the control library.
   * @param {ControlPrototype[]} params.controls - The list of rules that the control library attempts to adhere to.
   * @param {string} [params.bssAccount] - The account id tied to billing.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ControlLibrary>>}
   */
  public replaceCustomControlLibrary(
    params: SecurityAndComplianceCenterApiV3.ReplaceCustomControlLibraryParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ControlLibrary>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'controlLibraryId', 'controlLibraryName', 'controlLibraryDescription', 'controlLibraryType', 'controlLibraryVersion', 'controls'];
    const _validParams = ['instanceId', 'controlLibraryId', 'controlLibraryName', 'controlLibraryDescription', 'controlLibraryType', 'controlLibraryVersion', 'controls', 'bssAccount', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'control_library_name': _params.controlLibraryName,
      'control_library_description': _params.controlLibraryDescription,
      'control_library_type': _params.controlLibraryType,
      'control_library_version': _params.controlLibraryVersion,
      'controls': _params.controls,
    };

    const query = {
      'bss_account': _params.bssAccount,
    };

    const path = {
      'instance_id': _params.instanceId,
      'control_library_id': _params.controlLibraryId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'replaceCustomControlLibrary');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/control_libraries/{control_library_id}',
        method: 'PUT',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a control library.
   *
   * View the details of a control library by specifying its ID.
   *
   * With Security and Compliance Center, you can create a custom control library that is specific to your
   * organization's needs. You define the controls and specifications before you map previously created assessments.
   * Each control has several specifications and assessments that are mapped to it. A specification is a defined
   * requirement that is specific to a component. An assessment, or several, are mapped to each specification with a
   * detailed evaluation that is done to check whether the specification is compliant. For more information, see
   * [Creating custom
   * libraries](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-custom-library).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.controlLibraryId - The control library ID.
   * @param {string} [params.accountId] - The user account ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ControlLibrary>>}
   */
  public getControlLibrary(
    params: SecurityAndComplianceCenterApiV3.GetControlLibraryParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ControlLibrary>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'controlLibraryId'];
    const _validParams = ['instanceId', 'controlLibraryId', 'accountId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account_id': _params.accountId,
    };

    const path = {
      'instance_id': _params.instanceId,
      'control_library_id': _params.controlLibraryId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'getControlLibrary');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/control_libraries/{control_library_id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a custom control library.
   *
   * Delete a custom control library by specifying its ID.
   *
   * With Security and Compliance Center, you can create a custom control library that is specific to your
   * organization's needs. You define the controls and specifications before you map previously created assessments.
   * Each control has several specifications and assessments that are mapped to it. A specification is a defined
   * requirement that is specific to a component. An assessment, or several, are mapped to each specification with a
   * detailed evaluation that is done to check whether the specification is compliant. For more information, see
   * [Creating custom
   * libraries](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-custom-library).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.controlLibraryId - The control library ID.
   * @param {string} [params.accountId] - The user account ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ControlLibrary>>}
   */
  public deleteCustomControlLibrary(
    params: SecurityAndComplianceCenterApiV3.DeleteCustomControlLibraryParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ControlLibrary>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'controlLibraryId'];
    const _validParams = ['instanceId', 'controlLibraryId', 'accountId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account_id': _params.accountId,
    };

    const path = {
      'instance_id': _params.instanceId,
      'control_library_id': _params.controlLibraryId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'deleteCustomControlLibrary');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/control_libraries/{control_library_id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * profile
   ************************/

  /**
   * Create a custom profile.
   *
   * Create a user-defined custom profile.
   *
   * With Security and Compliance Center, you can create a profile that is specific to your usecase, by using an
   * existing library as a starting point. For more information, see [Building custom
   * profiles](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-build-custom-profiles&interface=api).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.profileName - The name of the profile.
   * @param {string} params.profileVersion - The version of the profile.
   * @param {ProfileControlsPrototype[]} params.controls - List of controls associated with the profile.
   * @param {DefaultParameters[]} params.defaultParameters - The default values when using the profile.
   * @param {string} [params.profileDescription] - A description of what the profile should represent.
   * @param {boolean} [params.latest] - Determines if the profile is up to date with the latest revisions.
   * @param {string} [params.versionGroupLabel] - The unique identifier of the revision.
   * @param {string} [params.accountId] - The user account ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Profile>>}
   */
  public createProfile(
    params: SecurityAndComplianceCenterApiV3.CreateProfileParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Profile>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'profileName', 'profileVersion', 'controls', 'defaultParameters'];
    const _validParams = ['instanceId', 'profileName', 'profileVersion', 'controls', 'defaultParameters', 'profileDescription', 'latest', 'versionGroupLabel', 'accountId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'profile_name': _params.profileName,
      'profile_version': _params.profileVersion,
      'controls': _params.controls,
      'default_parameters': _params.defaultParameters,
      'profile_description': _params.profileDescription,
      'latest': _params.latest,
      'version_group_label': _params.versionGroupLabel,
    };

    const query = {
      'account_id': _params.accountId,
    };

    const path = {
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'createProfile');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/profiles',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get all profiles.
   *
   * Retrieve all profiles, including predefined and custom profiles.
   *
   * With Security and Compliance Center, you can take advantage of predefined profiles that are curated based on
   * industry standards. Or you can choose to create one that is specific to your usecase by using an existing library
   * as a starting point. For more information, see [Building custom
   * profiles](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-build-custom-profiles&interface=api).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} [params.accountId] - The user account ID.
   * @param {number} [params.limit] - The indication of how many resources to return, unless the response is the last
   * page of resources.
   * @param {string} [params.start] - Determine what resource to start the page on or after.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProfileCollection>>}
   */
  public listProfiles(
    params: SecurityAndComplianceCenterApiV3.ListProfilesParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProfileCollection>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId'];
    const _validParams = ['instanceId', 'accountId', 'limit', 'start', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account_id': _params.accountId,
      'limit': _params.limit,
      'start': _params.start,
    };

    const path = {
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'listProfiles');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/profiles',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update a custom profile.
   *
   * Update the details of a user-defined profile.
   *
   * With Security and Compliance Center, you can create a profile that is specific to your usecase, by using an
   * existing library as a starting point. For more information, see [Building custom
   * profiles](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-build-custom-profiles&interface=api).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.profileId - The profile ID.
   * @param {string} params.newProfileType - The type of profile, either predefined or custom.
   * @param {ProfileControls[]} params.newControls - The list of controls.
   * @param {DefaultParameters[]} params.newDefaultParameters - The default parameters of the profile.
   * @param {string} [params.newId] - The ID of the profile.
   * @param {string} [params.newProfileName] - The name of the profile.
   * @param {string} [params.newInstanceId] - The ID of the Security and Compliance Center instance who owns the
   * profile.
   * @param {boolean} [params.newHierarchyEnabled] - Determines if the profile can be set to a hierarchy.
   * @param {string} [params.newProfileDescription] - A description of what the profile should represent.
   * @param {string} [params.newProfileVersion] - The version of the profile.
   * @param {string} [params.newVersionGroupLabel] - The unique identifier of the revision.
   * @param {boolean} [params.newLatest] - Determines if the profile is up to date with the latest revisions.
   * @param {string} [params.newCreatedBy] - User who created the profile.
   * @param {string} [params.newCreatedOn] - The date when the profile was created, in date-time format.
   * @param {string} [params.newUpdatedBy] - User who made the latest changes to the profile.
   * @param {string} [params.newUpdatedOn] - The date when the profile was last updated, in date-time format.
   * @param {number} [params.newControlsCount] - The number of controls contained in the profile.
   * @param {number} [params.newAttachmentsCount] - The number of attachments associated with the profile.
   * @param {string} [params.accountId] - The user account ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Profile>>}
   */
  public replaceProfile(
    params: SecurityAndComplianceCenterApiV3.ReplaceProfileParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Profile>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'profileId', 'newProfileType', 'newControls', 'newDefaultParameters'];
    const _validParams = ['instanceId', 'profileId', 'newProfileType', 'newControls', 'newDefaultParameters', 'newId', 'newProfileName', 'newInstanceId', 'newHierarchyEnabled', 'newProfileDescription', 'newProfileVersion', 'newVersionGroupLabel', 'newLatest', 'newCreatedBy', 'newCreatedOn', 'newUpdatedBy', 'newUpdatedOn', 'newControlsCount', 'newAttachmentsCount', 'accountId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'profile_type': _params.newProfileType,
      'controls': _params.newControls,
      'default_parameters': _params.newDefaultParameters,
      'id': _params.newId,
      'profile_name': _params.newProfileName,
      'instance_id': _params.newInstanceId,
      'hierarchy_enabled': _params.newHierarchyEnabled,
      'profile_description': _params.newProfileDescription,
      'profile_version': _params.newProfileVersion,
      'version_group_label': _params.newVersionGroupLabel,
      'latest': _params.newLatest,
      'created_by': _params.newCreatedBy,
      'created_on': _params.newCreatedOn,
      'updated_by': _params.newUpdatedBy,
      'updated_on': _params.newUpdatedOn,
      'controls_count': _params.newControlsCount,
      'attachments_count': _params.newAttachmentsCount,
    };

    const query = {
      'account_id': _params.accountId,
    };

    const path = {
      'instance_id': _params.instanceId,
      'profile_id': _params.profileId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'replaceProfile');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/profiles/{profile_id}',
        method: 'PUT',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a profile.
   *
   * Retrieve a profile by specifying the profile ID.
   *
   * With Security and Compliance Center, you can utilize predefined profiles that are curated based on industry
   * standards. Or you can choose to create one that is specific to your usecase, by using an existing library as a
   * starting point. For more information, see [Building custom
   * profiles](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-build-custom-profiles&interface=api).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.profileId - The profile ID.
   * @param {string} [params.accountId] - The user account ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Profile>>}
   */
  public getProfile(
    params: SecurityAndComplianceCenterApiV3.GetProfileParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Profile>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'profileId'];
    const _validParams = ['instanceId', 'profileId', 'accountId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account_id': _params.accountId,
    };

    const path = {
      'instance_id': _params.instanceId,
      'profile_id': _params.profileId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'getProfile');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/profiles/{profile_id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a custom profile.
   *
   * Delete a custom profile by specifying the profile ID.
   *
   * With Security and Compliance Center, you can utilize predefined profiles that are curated based on industry
   * standards. Or you can choose to create one that is specific to your usecase, by using an existing library as a
   * starting point. For more information, see [Building custom
   * profiles](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-build-custom-profiles&interface=api).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.profileId - The profile ID.
   * @param {string} [params.accountId] - The user account ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Profile>>}
   */
  public deleteCustomProfile(
    params: SecurityAndComplianceCenterApiV3.DeleteCustomProfileParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Profile>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'profileId'];
    const _validParams = ['instanceId', 'profileId', 'accountId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account_id': _params.accountId,
    };

    const path = {
      'instance_id': _params.instanceId,
      'profile_id': _params.profileId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'deleteCustomProfile');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/profiles/{profile_id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update custom profile parameters.
   *
   * Update the parameters of a custom profile.
   *
   * With Security and Compliance Center, you can utilize predefined profiles that are curated based on industry
   * standards. Or you can choose to create one that is specific to your usecase, by using an existing library as a
   * starting point. For more information, see [Building custom
   * profiles](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-build-custom-profiles&interface=api).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.profileId - The profile ID.
   * @param {DefaultParameters[]} params.defaultParameters - list of parameters given by default.
   * @param {string} [params.id] - The ID of the Profile.
   * @param {string} [params.accountId] - The user account ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProfileDefaultParametersResponse>>}
   */
  public replaceProfileParameters(
    params: SecurityAndComplianceCenterApiV3.ReplaceProfileParametersParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProfileDefaultParametersResponse>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'profileId', 'defaultParameters'];
    const _validParams = ['instanceId', 'profileId', 'defaultParameters', 'id', 'accountId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'default_parameters': _params.defaultParameters,
      'id': _params.id,
    };

    const query = {
      'account_id': _params.accountId,
    };

    const path = {
      'instance_id': _params.instanceId,
      'profile_id': _params.profileId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'replaceProfileParameters');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/profiles/{profile_id}/parameters',
        method: 'PUT',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List profile parameters for a given profile.
   *
   * List the parameters used in the Profile.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.profileId - The profile ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProfileDefaultParametersResponse>>}
   */
  public listProfileParameters(
    params: SecurityAndComplianceCenterApiV3.ListProfileParametersParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProfileDefaultParametersResponse>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'profileId'];
    const _validParams = ['instanceId', 'profileId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'profile_id': _params.profileId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'listProfileParameters');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/profiles/{profile_id}/parameters',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Compare profiles.
   *
   * Compare the version of the profile that you're currently using with your attachment to the most recent profile
   * version. By comparing them, you can view what controls were added, removed, or modified. For more information, see
   * [Building custom
   * profiles](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-build-custom-profiles&interface=api).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.profileId - The profile ID to compare.
   * @param {string} [params.accountId] - The user account ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ComparePredefinedProfilesResponse>>}
   */
  public compareProfiles(
    params: SecurityAndComplianceCenterApiV3.CompareProfilesParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ComparePredefinedProfilesResponse>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'profileId'];
    const _validParams = ['instanceId', 'profileId', 'accountId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account_id': _params.accountId,
    };

    const path = {
      'instance_id': _params.instanceId,
      'profile_id': _params.profileId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'compareProfiles');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/profiles/{profile_id}/compare',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get all attachments linked to a specific profile.
   *
   * Retrieve all attachments that are linked to a profile.
   *
   * With Security and Compliance Center, you can evaluate your resources on a recurring schedule or you can initiate a
   * scan at any time. To evaluate your resources, you create an attachment. An attachment is the association between
   * the set of resources that you want to evaluate and a profile that contains the specific controls that you want to
   * use. For more information, see [Running an evaluation for IBM
   * Cloud](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-scan-resources).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.profileId - The profile ID.
   * @param {string} [params.accountId] - The user account ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProfileAttachmentCollection>>}
   */
  public listProfileAttachments(
    params: SecurityAndComplianceCenterApiV3.ListProfileAttachmentsParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProfileAttachmentCollection>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'profileId'];
    const _validParams = ['instanceId', 'profileId', 'accountId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account_id': _params.accountId,
    };

    const path = {
      'instance_id': _params.instanceId,
      'profile_id': _params.profileId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'listProfileAttachments');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/profiles/{profile_id}/attachments',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * scope
   ************************/

  /**
   * Create a scope.
   *
   * Create a scope.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} [params.name] - The scope name.
   * @param {string} [params.description] - The scope description.
   * @param {string} [params.environment] - The scope environment.
   * @param {ScopeProperty[]} [params.properties] - The properties that are supported for scoping by this environment.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Scope>>}
   */
  public createScope(
    params: SecurityAndComplianceCenterApiV3.CreateScopeParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Scope>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId'];
    const _validParams = ['instanceId', 'name', 'description', 'environment', 'properties', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'description': _params.description,
      'environment': _params.environment,
      'properties': _params.properties,
    };

    const path = {
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'createScope');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/scopes',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get all scopes.
   *
   * Get all scopes.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {number} [params.limit] - The indication of how many resources to return, unless the response is the last
   * page of resources.
   * @param {string} [params.start] - Determine what resource to start the page on or after.
   * @param {string} [params.name] - determine name of scope returned in response.
   * @param {string} [params.description] - determine descriptions of scope returned in response.
   * @param {string} [params.environment] - determine environment of scopes returned in response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ScopeCollection>>}
   */
  public listScopes(
    params: SecurityAndComplianceCenterApiV3.ListScopesParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ScopeCollection>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId'];
    const _validParams = ['instanceId', 'limit', 'start', 'name', 'description', 'environment', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'limit': _params.limit,
      'start': _params.start,
      'name': _params.name,
      'description': _params.description,
      'environment': _params.environment,
    };

    const path = {
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'listScopes');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/scopes',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update a scope.
   *
   * Update the details of a scope.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.scopeId - The ID of the scope being targeted.
   * @param {string} [params.name] - The scope name.
   * @param {string} [params.description] - The scope description.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Scope>>}
   */
  public updateScope(
    params: SecurityAndComplianceCenterApiV3.UpdateScopeParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Scope>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'scopeId'];
    const _validParams = ['instanceId', 'scopeId', 'name', 'description', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'description': _params.description,
    };

    const path = {
      'instance_id': _params.instanceId,
      'scope_id': _params.scopeId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'updateScope');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/scopes/{scope_id}',
        method: 'PATCH',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a scope.
   *
   * Get a scope by specifying the scope ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.scopeId - The ID of the scope being targeted.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Scope>>}
   */
  public getScope(
    params: SecurityAndComplianceCenterApiV3.GetScopeParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Scope>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'scopeId'];
    const _validParams = ['instanceId', 'scopeId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'scope_id': _params.scopeId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'getScope');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/scopes/{scope_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a scope.
   *
   * Delete a scope by specifying the scope ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.scopeId - The ID of the scope being targeted.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.EmptyObject>>}
   */
  public deleteScope(
    params: SecurityAndComplianceCenterApiV3.DeleteScopeParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'scopeId'];
    const _validParams = ['instanceId', 'scopeId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'scope_id': _params.scopeId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'deleteScope');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/scopes/{scope_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create a subscope.
   *
   * Create a subscope.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.scopeId - The ID of the scope being targeted.
   * @param {ScopePrototype[]} params.subscopes - The array of subscopes.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.SubScopeResponse>>}
   */
  public createSubscope(
    params: SecurityAndComplianceCenterApiV3.CreateSubscopeParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.SubScopeResponse>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'scopeId', 'subscopes'];
    const _validParams = ['instanceId', 'scopeId', 'subscopes', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'subscopes': _params.subscopes,
    };

    const path = {
      'instance_id': _params.instanceId,
      'scope_id': _params.scopeId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'createSubscope');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/scopes/{scope_id}/subscopes',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get all subscopes.
   *
   * Get all subscopes.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.scopeId - The ID of the scope being targeted.
   * @param {number} [params.limit] - The indication of how many resources to return, unless the response is the last
   * page of resources.
   * @param {string} [params.start] - Determine what resource to start the page on or after.
   * @param {string} [params.name] - determine name of subscope returned in response.
   * @param {string} [params.description] - determine descriptions of subscopes returned in response.
   * @param {string} [params.environment] - determine environment of subscopes returned in response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.SubScopeCollection>>}
   */
  public listSubscopes(
    params: SecurityAndComplianceCenterApiV3.ListSubscopesParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.SubScopeCollection>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'scopeId'];
    const _validParams = ['instanceId', 'scopeId', 'limit', 'start', 'name', 'description', 'environment', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'limit': _params.limit,
      'start': _params.start,
      'name': _params.name,
      'description': _params.description,
      'environment': _params.environment,
    };

    const path = {
      'instance_id': _params.instanceId,
      'scope_id': _params.scopeId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'listSubscopes');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/scopes/{scope_id}/subscopes',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a subscope.
   *
   * Get the subscope details.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.scopeId - The ID of the scope being targeted.
   * @param {string} params.subscopeId - The ID of the scope being targeted.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.SubScope>>}
   */
  public getSubscope(
    params: SecurityAndComplianceCenterApiV3.GetSubscopeParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.SubScope>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'scopeId', 'subscopeId'];
    const _validParams = ['instanceId', 'scopeId', 'subscopeId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'scope_id': _params.scopeId,
      'subscope_id': _params.subscopeId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'getSubscope');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/scopes/{scope_id}/subscopes/{subscope_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update a subscope.
   *
   * Update the subscope details.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.scopeId - The ID of the scope being targeted.
   * @param {string} params.subscopeId - The ID of the scope being targeted.
   * @param {string} [params.name] - The scope name.
   * @param {string} [params.description] - The scope description.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.SubScope>>}
   */
  public updateSubscope(
    params: SecurityAndComplianceCenterApiV3.UpdateSubscopeParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.SubScope>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'scopeId', 'subscopeId'];
    const _validParams = ['instanceId', 'scopeId', 'subscopeId', 'name', 'description', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'description': _params.description,
    };

    const path = {
      'instance_id': _params.instanceId,
      'scope_id': _params.scopeId,
      'subscope_id': _params.subscopeId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'updateSubscope');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/scopes/{scope_id}/subscopes/{subscope_id}',
        method: 'PATCH',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a subscope.
   *
   * Delete the subscope by specifying the subscope ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.scopeId - The ID of the scope being targeted.
   * @param {string} params.subscopeId - The ID of the scope being targeted.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.EmptyObject>>}
   */
  public deleteSubscope(
    params: SecurityAndComplianceCenterApiV3.DeleteSubscopeParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'scopeId', 'subscopeId'];
    const _validParams = ['instanceId', 'scopeId', 'subscopeId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'scope_id': _params.scopeId,
      'subscope_id': _params.subscopeId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'deleteSubscope');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/scopes/{scope_id}/subscopes/{subscope_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * target
   ************************/

  /**
   * Create a target.
   *
   * Creates a target to scan against.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.accountId - The target account ID.
   * @param {string} params.trustedProfileId - The trusted profile ID.
   * @param {string} params.name - The target name.
   * @param {Credential[]} [params.credentials] - Customer credential to access for a specific service to scan.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Target>>}
   */
  public createTarget(
    params: SecurityAndComplianceCenterApiV3.CreateTargetParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Target>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'accountId', 'trustedProfileId', 'name'];
    const _validParams = ['instanceId', 'accountId', 'trustedProfileId', 'name', 'credentials', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'account_id': _params.accountId,
      'trusted_profile_id': _params.trustedProfileId,
      'name': _params.name,
      'credentials': _params.credentials,
    };

    const path = {
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'createTarget');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/targets',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a list of targets with pagination.
   *
   * Returns a list of targets.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.TargetCollection>>}
   */
  public listTargets(
    params: SecurityAndComplianceCenterApiV3.ListTargetsParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.TargetCollection>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId'];
    const _validParams = ['instanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'listTargets');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/targets',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a target by ID.
   *
   * Retrieves a target by its ID association.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.targetId - The target ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Target>>}
   */
  public getTarget(
    params: SecurityAndComplianceCenterApiV3.GetTargetParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Target>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'targetId'];
    const _validParams = ['instanceId', 'targetId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'target_id': _params.targetId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'getTarget');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/targets/{target_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * replace a target by ID.
   *
   * Updates a target by its ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.targetId - The target ID.
   * @param {string} params.accountId - The target account ID.
   * @param {string} params.trustedProfileId - The trusted profile ID.
   * @param {string} params.name - The target name.
   * @param {Credential[]} [params.credentials] - Customer credential to access for a specific service to scan.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Target>>}
   */
  public replaceTarget(
    params: SecurityAndComplianceCenterApiV3.ReplaceTargetParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Target>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'targetId', 'accountId', 'trustedProfileId', 'name'];
    const _validParams = ['instanceId', 'targetId', 'accountId', 'trustedProfileId', 'name', 'credentials', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'account_id': _params.accountId,
      'trusted_profile_id': _params.trustedProfileId,
      'name': _params.name,
      'credentials': _params.credentials,
    };

    const path = {
      'instance_id': _params.instanceId,
      'target_id': _params.targetId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'replaceTarget');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/targets/{target_id}',
        method: 'PUT',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a target by ID.
   *
   * Deletes a target by the ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.targetId - The target ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.EmptyObject>>}
   */
  public deleteTarget(
    params: SecurityAndComplianceCenterApiV3.DeleteTargetParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'targetId'];
    const _validParams = ['instanceId', 'targetId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'target_id': _params.targetId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'deleteTarget');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/targets/{target_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * providerTypeInstance
   ************************/

  /**
   * Create a provider type instance.
   *
   * Create an instance of a provider type. For more information about integrations, see [Connecting Workload
   * Protection](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-setup-workload-protection).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.providerTypeId - The provider type ID.
   * @param {string} [params.name] - The provider type instance name.
   * @param {JsonObject} [params.attributes] - The attributes for connecting to the provider type instance.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProviderTypeInstance>>}
   */
  public createProviderTypeInstance(
    params: SecurityAndComplianceCenterApiV3.CreateProviderTypeInstanceParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProviderTypeInstance>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'providerTypeId'];
    const _validParams = ['instanceId', 'providerTypeId', 'name', 'attributes', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'attributes': _params.attributes,
    };

    const path = {
      'instance_id': _params.instanceId,
      'provider_type_id': _params.providerTypeId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'createProviderTypeInstance');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/provider_types/{provider_type_id}/provider_type_instances',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List instances of a specific provider type.
   *
   * Retrieve all instances of a provider type. For more information about integrations, see [Connecting Workload
   * Protection](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-setup-workload-protection).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.providerTypeId - The provider type ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProviderTypeInstanceCollection>>}
   */
  public listProviderTypeInstances(
    params: SecurityAndComplianceCenterApiV3.ListProviderTypeInstancesParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProviderTypeInstanceCollection>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'providerTypeId'];
    const _validParams = ['instanceId', 'providerTypeId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'provider_type_id': _params.providerTypeId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'listProviderTypeInstances');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/provider_types/{provider_type_id}/provider_type_instances',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a provider type instance.
   *
   * Retrieve a provider type instance by specifying the provider type ID, and Security and Compliance Center instance
   * ID. For more information about integrations, see [Connecting Workload
   * Protection](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-setup-workload-protection).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.providerTypeId - The provider type ID.
   * @param {string} params.providerTypeInstanceId - The provider type instance ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProviderTypeInstance>>}
   */
  public getProviderTypeInstance(
    params: SecurityAndComplianceCenterApiV3.GetProviderTypeInstanceParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProviderTypeInstance>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'providerTypeId', 'providerTypeInstanceId'];
    const _validParams = ['instanceId', 'providerTypeId', 'providerTypeInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'provider_type_id': _params.providerTypeId,
      'provider_type_instance_id': _params.providerTypeInstanceId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'getProviderTypeInstance');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/provider_types/{provider_type_id}/provider_type_instances/{provider_type_instance_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update a provider type instance.
   *
   * Update a provider type instance. For more information about integrations, see [Connecting Workload
   * Protection](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-setup-workload-protection).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.providerTypeId - The provider type ID.
   * @param {string} params.providerTypeInstanceId - The provider type instance ID.
   * @param {string} [params.name] - The provider type instance name.
   * @param {JsonObject} [params.attributes] - The attributes for connecting to the provider type instance.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProviderTypeInstance>>}
   */
  public updateProviderTypeInstance(
    params: SecurityAndComplianceCenterApiV3.UpdateProviderTypeInstanceParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProviderTypeInstance>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'providerTypeId', 'providerTypeInstanceId'];
    const _validParams = ['instanceId', 'providerTypeId', 'providerTypeInstanceId', 'name', 'attributes', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'attributes': _params.attributes,
    };

    const path = {
      'instance_id': _params.instanceId,
      'provider_type_id': _params.providerTypeId,
      'provider_type_instance_id': _params.providerTypeInstanceId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'updateProviderTypeInstance');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/provider_types/{provider_type_id}/provider_type_instances/{provider_type_instance_id}',
        method: 'PATCH',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a provider type instance.
   *
   * Remove a provider type instance. For more information about integrations, see [Connecting Workload
   * Protection](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-setup-workload-protection).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.providerTypeId - The provider type ID.
   * @param {string} params.providerTypeInstanceId - The provider type instance ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.EmptyObject>>}
   */
  public deleteProviderTypeInstance(
    params: SecurityAndComplianceCenterApiV3.DeleteProviderTypeInstanceParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'providerTypeId', 'providerTypeInstanceId'];
    const _validParams = ['instanceId', 'providerTypeId', 'providerTypeInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'provider_type_id': _params.providerTypeId,
      'provider_type_instance_id': _params.providerTypeInstanceId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'deleteProviderTypeInstance');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/provider_types/{provider_type_id}/provider_type_instances/{provider_type_instance_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * providerType
   ************************/

  /**
   * List provider types.
   *
   * List all the registered provider types or integrations such as Workload Protection available to connect to Security
   * and Compliance Center.  For more information about connecting Workload Protection with the Security and Compliance
   * Center, see [Connecting Workload
   * Protection](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-setup-workload-protection).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProviderTypeCollection>>}
   */
  public listProviderTypes(
    params: SecurityAndComplianceCenterApiV3.ListProviderTypesParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProviderTypeCollection>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId'];
    const _validParams = ['instanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'listProviderTypes');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/provider_types',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a provider type.
   *
   * Retrieve a provider type by specifying its ID. For more information about integrations, see [Connecting Workload
   * Protection](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-setup-workload-protection).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.providerTypeId - The provider type ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProviderType>>}
   */
  public getProviderTypeById(
    params: SecurityAndComplianceCenterApiV3.GetProviderTypeByIdParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProviderType>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'providerTypeId'];
    const _validParams = ['instanceId', 'providerTypeId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'provider_type_id': _params.providerTypeId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'getProviderTypeById');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/provider_types/{provider_type_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * report
   ************************/

  /**
   * List latest reports.
   *
   * Retrieve the latest reports, which are grouped by profile ID, scope ID, and attachment ID. For more information,
   * see [Viewing results](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-results).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} [params.sort] - This field sorts controls by using a valid sort field. To learn more, see
   * [Sorting](https://cloud.ibm.com/docs/api-handbook?topic=api-handbook-sorting).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ReportLatest>>}
   */
  public getLatestReports(
    params: SecurityAndComplianceCenterApiV3.GetLatestReportsParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ReportLatest>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId'];
    const _validParams = ['instanceId', 'sort', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'sort': _params.sort,
    };

    const path = {
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'getLatestReports');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/reports/latest',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List reports.
   *
   * Retrieve a page of reports that are filtered by the specified parameters. For more information, see [Viewing
   * results](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-results).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} [params.reportAttachmentId] - The ID of the attachment.
   * @param {string} [params.groupId] - The report group ID.
   * @param {string} [params.reportProfileId] - The ID of the profile.
   * @param {string} [params.type] - The type of the scan.
   * @param {string} [params.start] - The indication of what resource to start the page on.
   * @param {number} [params.limit] - The indication of many resources to return, unless the response is the last page
   * of resources.
   * @param {string} [params.sort] - This field sorts results by using a valid sort field.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ReportCollection>>}
   */
  public listReports(
    params: SecurityAndComplianceCenterApiV3.ListReportsParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ReportCollection>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId'];
    const _validParams = ['instanceId', 'reportAttachmentId', 'groupId', 'reportProfileId', 'type', 'start', 'limit', 'sort', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'report_attachment_id': _params.reportAttachmentId,
      'group_id': _params.groupId,
      'report_profile_id': _params.reportProfileId,
      'type': _params.type,
      'start': _params.start,
      'limit': _params.limit,
      'sort': _params.sort,
    };

    const path = {
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'listReports');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/reports',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a report.
   *
   * Retrieve a specified report and filter the report details by the specified scope ID and/or subscope ID. For more
   * information, see [Viewing
   * results](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-results).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.reportId - The ID of the scan that is associated with a report.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} [params.scopeId] - The ID of the scope.
   * @param {string} [params.subscopeId] - The ID of the subscope.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Report>>}
   */
  public getReport(
    params: SecurityAndComplianceCenterApiV3.GetReportParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Report>> {
    const _params = { ...params };
    const _requiredParams = ['reportId', 'instanceId'];
    const _validParams = ['reportId', 'instanceId', 'scopeId', 'subscopeId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'scope_id': _params.scopeId,
      'subscope_id': _params.subscopeId,
    };

    const path = {
      'report_id': _params.reportId,
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'getReport');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/reports/{report_id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a report summary.
   *
   * Retrieve the complete summarized information for a report. For more information, see [Viewing
   * results](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-results).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.reportId - The ID of the scan that is associated with a report.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ReportSummary>>}
   */
  public getReportSummary(
    params: SecurityAndComplianceCenterApiV3.GetReportSummaryParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ReportSummary>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'reportId'];
    const _validParams = ['instanceId', 'reportId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'report_id': _params.reportId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'getReportSummary');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/reports/{report_id}/summary',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get report evaluation details.
   *
   * Download a .csv file to inspect the evaluation details of a specified report. For more information, see [Viewing
   * results](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-results).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.reportId - The ID of the scan that is associated with a report.
   * @param {string} [params.accept] - The type of the response: application/csv or application/pdf.
   * @param {boolean} [params.excludeSummary] - The indication of whether report summary metadata must be excluded.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<NodeJS.ReadableStream>>}
   */
  public getReportDownloadFile(
    params: SecurityAndComplianceCenterApiV3.GetReportDownloadFileParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<NodeJS.ReadableStream>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'reportId'];
    const _validParams = ['instanceId', 'reportId', 'accept', 'excludeSummary', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'exclude_summary': _params.excludeSummary,
    };

    const path = {
      'instance_id': _params.instanceId,
      'report_id': _params.reportId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'getReportDownloadFile');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/reports/{report_id}/download',
        method: 'GET',
        qs: query,
        path,
        responseType: 'stream',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': _params.accept,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get report controls.
   *
   * Retrieve a sorted and filtered list of controls for the specified report. For more information, see [Viewing
   * results](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-results).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.reportId - The ID of the scan that is associated with a report.
   * @param {string} [params.controlId] - The ID of the control.
   * @param {string} [params.controlName] - The name of the control.
   * @param {string} [params.controlDescription] - The description of the control.
   * @param {string} [params.controlCategory] - A control category value.
   * @param {string} [params.status] - The compliance status value.
   * @param {string} [params.sort] - This field sorts controls by using a valid sort field. To learn more, see
   * [Sorting](https://cloud.ibm.com/docs/api-handbook?topic=api-handbook-sorting).
   * @param {string} [params.scopeId] - The ID of the scope.
   * @param {string} [params.subscopeId] - The ID of the subscope.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ReportControls>>}
   */
  public getReportControls(
    params: SecurityAndComplianceCenterApiV3.GetReportControlsParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ReportControls>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'reportId'];
    const _validParams = ['instanceId', 'reportId', 'controlId', 'controlName', 'controlDescription', 'controlCategory', 'status', 'sort', 'scopeId', 'subscopeId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'control_id': _params.controlId,
      'control_name': _params.controlName,
      'control_description': _params.controlDescription,
      'control_category': _params.controlCategory,
      'status': _params.status,
      'sort': _params.sort,
      'scope_id': _params.scopeId,
      'subscope_id': _params.subscopeId,
    };

    const path = {
      'instance_id': _params.instanceId,
      'report_id': _params.reportId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'getReportControls');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/reports/{report_id}/controls',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a report rule.
   *
   * Retrieve the rule by specifying the report ID and rule ID. For more information, see [Viewing
   * results](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-results).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.reportId - The ID of the scan that is associated with a report.
   * @param {string} params.ruleId - The ID of the rule within a report.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.RuleInfo>>}
   */
  public getReportRule(
    params: SecurityAndComplianceCenterApiV3.GetReportRuleParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.RuleInfo>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'reportId', 'ruleId'];
    const _validParams = ['instanceId', 'reportId', 'ruleId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'report_id': _params.reportId,
      'rule_id': _params.ruleId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'getReportRule');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/reports/{report_id}/rules/{rule_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List report evaluations.
   *
   * Get a paginated list of evaluations for the specified report. For more information, see [Viewing
   * results](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-results).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.reportId - The ID of the scan that is associated with a report.
   * @param {string} [params.assessmentId] - The ID of the assessment.
   * @param {string} [params.assessmentMethod] - The assessment method.
   * @param {string} [params.componentId] - The ID of component.
   * @param {string} [params.targetId] - The ID of the evaluation target.
   * @param {string} [params.targetEnv] - The environment of the evaluation target.
   * @param {string} [params.targetName] - The name of the evaluation target.
   * @param {string} [params.status] - The evaluation status value.
   * @param {string} [params.start] - The indication of what resource to start the page on.
   * @param {number} [params.limit] - The indication of many resources to return, unless the response is the last page
   * of resources.
   * @param {string} [params.sort] - This field sorts resources by using a valid sort field. To learn more, see
   * [Sorting](https://cloud.ibm.com/docs/api-handbook?topic=api-handbook-sorting).
   * @param {string} [params.scopeId] - The ID of the scope.
   * @param {string} [params.subscopeId] - The ID of the subscope.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.EvaluationPage>>}
   */
  public listReportEvaluations(
    params: SecurityAndComplianceCenterApiV3.ListReportEvaluationsParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.EvaluationPage>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'reportId'];
    const _validParams = ['instanceId', 'reportId', 'assessmentId', 'assessmentMethod', 'componentId', 'targetId', 'targetEnv', 'targetName', 'status', 'start', 'limit', 'sort', 'scopeId', 'subscopeId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'assessment_id': _params.assessmentId,
      'assessment_method': _params.assessmentMethod,
      'component_id': _params.componentId,
      'target_id': _params.targetId,
      'target_env': _params.targetEnv,
      'target_name': _params.targetName,
      'status': _params.status,
      'start': _params.start,
      'limit': _params.limit,
      'sort': _params.sort,
      'scope_id': _params.scopeId,
      'subscope_id': _params.subscopeId,
    };

    const path = {
      'instance_id': _params.instanceId,
      'report_id': _params.reportId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'listReportEvaluations');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/reports/{report_id}/evaluations',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List report resources.
   *
   * Get a paginated list of resources for the specified report. For more information, see [Viewing
   * results](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-results).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.reportId - The ID of the scan that is associated with a report.
   * @param {string} [params.id] - The ID of the resource.
   * @param {string} [params.resourceName] - The name of the resource.
   * @param {string} [params.accountId] - The user account ID.
   * @param {string} [params.componentId] - The ID of component.
   * @param {string} [params.status] - The compliance status value.
   * @param {string} [params.sort] - This field sorts resources by using a valid sort field. To learn more, see
   * [Sorting](https://cloud.ibm.com/docs/api-handbook?topic=api-handbook-sorting).
   * @param {string} [params.start] - The indication of what resource to start the page on.
   * @param {number} [params.limit] - The indication of many resources to return, unless the response is the last page
   * of resources.
   * @param {string} [params.scopeId] - The ID of the scope.
   * @param {string} [params.subscopeId] - The ID of the subscope.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ResourcePage>>}
   */
  public listReportResources(
    params: SecurityAndComplianceCenterApiV3.ListReportResourcesParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ResourcePage>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'reportId'];
    const _validParams = ['instanceId', 'reportId', 'id', 'resourceName', 'accountId', 'componentId', 'status', 'sort', 'start', 'limit', 'scopeId', 'subscopeId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'id': _params.id,
      'resource_name': _params.resourceName,
      'account_id': _params.accountId,
      'component_id': _params.componentId,
      'status': _params.status,
      'sort': _params.sort,
      'start': _params.start,
      'limit': _params.limit,
      'scope_id': _params.scopeId,
      'subscope_id': _params.subscopeId,
    };

    const path = {
      'instance_id': _params.instanceId,
      'report_id': _params.reportId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'listReportResources');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/reports/{report_id}/resources',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List report tags.
   *
   * Retrieve a list of tags for the specified report. For more information, see [Viewing
   * results](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-results).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.reportId - The ID of the scan that is associated with a report.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ReportTags>>}
   */
  public getReportTags(
    params: SecurityAndComplianceCenterApiV3.GetReportTagsParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ReportTags>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'reportId'];
    const _validParams = ['instanceId', 'reportId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'report_id': _params.reportId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'getReportTags');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/reports/{report_id}/tags',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get report violations drift.
   *
   * Get a list of report violation data points for the specified report and time frame. For more information, see
   * [Viewing results](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-results).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.reportId - The ID of the scan that is associated with a report.
   * @param {number} [params.scanTimeDuration] - The duration of the `scan_time` timestamp in number of days.
   * @param {string} [params.scopeId] - The ID of the scope.
   * @param {string} [params.subscopeId] - The ID of the subscope.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ReportViolationsDrift>>}
   */
  public getReportViolationsDrift(
    params: SecurityAndComplianceCenterApiV3.GetReportViolationsDriftParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ReportViolationsDrift>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'reportId'];
    const _validParams = ['instanceId', 'reportId', 'scanTimeDuration', 'scopeId', 'subscopeId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'scan_time_duration': _params.scanTimeDuration,
      'scope_id': _params.scopeId,
      'subscope_id': _params.subscopeId,
    };

    const path = {
      'instance_id': _params.instanceId,
      'report_id': _params.reportId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'getReportViolationsDrift');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/reports/{report_id}/violations_drift',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List scan reports.
   *
   * Get a list of scan reports and view the status of report generation in progress. For more information, see [Viewing
   * results](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-results).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.reportId - The ID of the scan that is associated with a report.
   * @param {string} [params.scopeId] - The ID of the scope.
   * @param {string} [params.subscopeId] - The ID of the subscope.
   * @param {string} [params.sort] - This field sorts results by using a valid sort field.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ScanReportCollection>>}
   */
  public listScanReports(
    params: SecurityAndComplianceCenterApiV3.ListScanReportsParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ScanReportCollection>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'reportId'];
    const _validParams = ['instanceId', 'reportId', 'scopeId', 'subscopeId', 'sort', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'scope_id': _params.scopeId,
      'subscope_id': _params.subscopeId,
      'sort': _params.sort,
    };

    const path = {
      'instance_id': _params.instanceId,
      'report_id': _params.reportId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'listScanReports');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/reports/{report_id}/scan_reports',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create a scan report.
   *
   * Create a scan report for a specific scope or sub-scope. For more information, see [Defining custom
   * rules](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-rules-define).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.reportId - The ID of the scan that is associated with a report.
   * @param {string} params.format - The enum of different report format types.
   * @param {string} [params.scopeId] - The ID of the scope.
   * @param {string} [params.subscopeId] - The ID of the sub-scope.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.CreateScanReport>>}
   */
  public createScanReport(
    params: SecurityAndComplianceCenterApiV3.CreateScanReportParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.CreateScanReport>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'reportId', 'format'];
    const _validParams = ['instanceId', 'reportId', 'format', 'scopeId', 'subscopeId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'format': _params.format,
      'scope_id': _params.scopeId,
      'subscope_id': _params.subscopeId,
    };

    const path = {
      'instance_id': _params.instanceId,
      'report_id': _params.reportId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'createScanReport');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/reports/{report_id}/scan_reports',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a scan report.
   *
   * Retrieve the scan report by specifying the ID. For more information, see [Viewing
   * results](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-results).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.reportId - The ID of the scan that is associated with a report.
   * @param {string} params.jobId - The ID of the scan_result.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ScanReport>>}
   */
  public getScanReport(
    params: SecurityAndComplianceCenterApiV3.GetScanReportParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ScanReport>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'reportId', 'jobId'];
    const _validParams = ['instanceId', 'reportId', 'jobId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'report_id': _params.reportId,
      'job_id': _params.jobId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'getScanReport');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/reports/{report_id}/scan_reports/{job_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a scan report details.
   *
   * Download the scan report with evaluation details for the specified ID. For more information, see [Viewing
   * results](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-results).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.reportId - The ID of the scan that is associated with a report.
   * @param {string} params.jobId - The ID of the scan_result.
   * @param {string} [params.accept] - The type of the response: application/csv or application/pdf.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<NodeJS.ReadableStream>>}
   */
  public getScanReportDownloadFile(
    params: SecurityAndComplianceCenterApiV3.GetScanReportDownloadFileParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<NodeJS.ReadableStream>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'reportId', 'jobId'];
    const _validParams = ['instanceId', 'reportId', 'jobId', 'accept', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'report_id': _params.reportId,
      'job_id': _params.jobId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'getScanReportDownloadFile');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/reports/{report_id}/scan_reports/{job_id}/download',
        method: 'GET',
        path,
        responseType: 'stream',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': _params.accept,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * rule
   ************************/

  /**
   * Get all rules.
   *
   * Retrieve all the rules that you use to target the exact configuration properties  that you need to ensure are
   * compliant. For more information, see [Defining custom
   * rules](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-rules-define).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {number} [params.limit] - The indication of how many resources to return, unless the response is the last
   * page of resources.
   * @param {string} [params.start] - Determine what resource to start the page on or after.
   * @param {string} [params.type] - The list of only user-defined, or system-defined rules.
   * @param {string} [params.search] - The indication of whether to search for rules with a specific string string in
   * the name, description, or labels.
   * @param {string} [params.serviceName] - Searches for rules targeting corresponding service.
   * @param {string} [params.sort] - Field used to sort rules. Rules can be sorted in ascending or descending order.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.RuleCollection>>}
   */
  public listRules(
    params: SecurityAndComplianceCenterApiV3.ListRulesParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.RuleCollection>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId'];
    const _validParams = ['instanceId', 'limit', 'start', 'type', 'search', 'serviceName', 'sort', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'limit': _params.limit,
      'start': _params.start,
      'type': _params.type,
      'search': _params.search,
      'service_name': _params.serviceName,
      'sort': _params.sort,
    };

    const path = {
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'listRules');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/rules',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create a custom rule.
   *
   * Create a custom rule to to target the exact configuration properties  that you need to evaluate your resources for
   * compliance. For more information, see [Defining custom
   * rules](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-rules-define).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.description - The rule description.
   * @param {RuleTargetPrototype} params.target - The rule target.
   * @param {RequiredConfig} params.requiredConfig - The required configurations for a Rule.
   * @param {string} [params.version] - The rule version number.
   * @param {Import} [params._import] - The collection of import parameters.
   * @param {string[]} [params.labels] - The list of labels that correspond to a rule.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Rule>>}
   */
  public createRule(
    params: SecurityAndComplianceCenterApiV3.CreateRuleParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Rule>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'description', 'target', 'requiredConfig'];
    const _validParams = ['instanceId', 'description', 'target', 'requiredConfig', 'version', '_import', 'labels', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'description': _params.description,
      'target': _params.target,
      'required_config': _params.requiredConfig,
      'version': _params.version,
      'import': _params._import,
      'labels': _params.labels,
    };

    const path = {
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'createRule');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/rules',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a custom rule.
   *
   * Retrieve a rule that you created to evaluate your resources.  For more information, see [Defining custom
   * rules](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-rules-define).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.ruleId - The ID of a rule/assessment.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Rule>>}
   */
  public getRule(
    params: SecurityAndComplianceCenterApiV3.GetRuleParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Rule>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'ruleId'];
    const _validParams = ['instanceId', 'ruleId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'rule_id': _params.ruleId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'getRule');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/rules/{rule_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update a custom rule.
   *
   * Update a custom rule that you use to target the exact configuration properties  that you need to evaluate your
   * resources for compliance. For more information, see [Defining custom
   * rules](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-rules-define).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.ruleId - The ID of a rule/assessment.
   * @param {string} params.ifMatch - This field compares a supplied `Etag` value with the version that is stored for
   * the requested resource. If the values match, the server allows the request method to continue.
   *
   * To find the `Etag` value, run a GET request on the resource that you want to modify, and check the response
   * headers.
   * @param {string} params.description - The rule description.
   * @param {RuleTargetPrototype} params.target - The rule target.
   * @param {RequiredConfig} params.requiredConfig - The required configurations for a Rule.
   * @param {string} [params.version] - The rule version number.
   * @param {Import} [params._import] - The collection of import parameters.
   * @param {string[]} [params.labels] - The list of labels that correspond to a rule.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Rule>>}
   */
  public replaceRule(
    params: SecurityAndComplianceCenterApiV3.ReplaceRuleParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Rule>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'ruleId', 'ifMatch', 'description', 'target', 'requiredConfig'];
    const _validParams = ['instanceId', 'ruleId', 'ifMatch', 'description', 'target', 'requiredConfig', 'version', '_import', 'labels', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'description': _params.description,
      'target': _params.target,
      'required_config': _params.requiredConfig,
      'version': _params.version,
      'import': _params._import,
      'labels': _params.labels,
    };

    const path = {
      'instance_id': _params.instanceId,
      'rule_id': _params.ruleId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'replaceRule');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/rules/{rule_id}',
        method: 'PUT',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'If-Match': _params.ifMatch,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a custom rule.
   *
   * Delete a custom rule that you no longer require to evaluate your resources. For more information, see [Defining
   * custom rules](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-rules-define).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The ID of the Security and Compliance Center instance.
   * @param {string} params.ruleId - The ID of a rule/assessment.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.EmptyObject>>}
   */
  public deleteRule(
    params: SecurityAndComplianceCenterApiV3.DeleteRuleParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'ruleId'];
    const _validParams = ['instanceId', 'ruleId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'rule_id': _params.ruleId,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'deleteRule');

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/rules/{rule_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * service
   ************************/

  /**
   * List services.
   *
   * List all the services that you use to evaluate the configuration of your resources for security and compliance.
   * [Learn more](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-scannable-components).
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ServiceCollection>>}
   */
  public listServices(
    params?: SecurityAndComplianceCenterApiV3.ListServicesParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ServiceCollection>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'listServices');

    const parameters = {
      options: {
        url: '/v3/services',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a service.
   *
   * Retrieve a service configuration that you monitor. [Learn
   * more](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-scannable-components).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.servicesName - The name of the corresponding service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Service>>}
   */
  public getService(
    params: SecurityAndComplianceCenterApiV3.GetServiceParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Service>> {
    const _params = { ...params };
    const _requiredParams = ['servicesName'];
    const _validParams = ['servicesName', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'services_name': _params.servicesName,
    };

    const sdkHeaders = getSdkHeaders(SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME, 'v3', 'getService');

    const parameters = {
      options: {
        url: '/v3/services/{services_name}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
}

/*************************
 * interfaces
 ************************/

namespace SecurityAndComplianceCenterApiV3 {
  /** An operation response. */
  export interface Response<T = any> {
    result: T;
    status: number;
    statusText: string;
    headers: IncomingHttpHeaders;
  }

  /** The callback for a service request. */
  export type Callback<T> = (error: any, response?: Response<T>) => void;

  /** The body of a service request that returns no response data. */
  export interface EmptyObject {}

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `getSettings` operation. */
  export interface GetSettingsParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateSettings` operation. */
  export interface UpdateSettingsParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The payload to connect a Cloud Object Storage instance to an Security and Compliance Center instance. */
    objectStorage?: ObjectStoragePrototype;
    /** The payload to connect an Event Notification instance with a Security and Compliance Center instance. */
    eventNotifications?: EventNotificationsPrototype;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `postTestEvent` operation. */
  export interface PostTestEventParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listInstanceAttachments` operation. */
  export interface ListInstanceAttachmentsParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The user account ID. */
    accountId?: string;
    /** The profile version group label. */
    versionGroupLabel?: string;
    /** The number of items that are retrieved in a collection. */
    limit?: number;
    /** The sorted collection of attachments. The available values are `created_on` and `scope_type`. */
    sort?: ListInstanceAttachmentsConstants.Sort | string;
    /** The collection of attachments that is sorted in ascending order. To sort the collection in descending order,
     *  use the `DESC` schema.
     */
    direction?: ListInstanceAttachmentsConstants.Direction | string;
    /** The reference to the first item in the results page. Take the value from the `next` field that is in the
     *  response from the previous page.
     */
    start?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listInstanceAttachments` operation. */
  export namespace ListInstanceAttachmentsConstants {
    /** The sorted collection of attachments. The available values are `created_on` and `scope_type`. */
    export enum Sort {
      CREATED_ON = 'created_on',
      SCOPE_TYPE = 'scope_type',
    }
    /** The collection of attachments that is sorted in ascending order. To sort the collection in descending order, use the `DESC` schema. */
    export enum Direction {
      DESC = 'desc',
      ASC = 'asc',
    }
  }

  /** Parameters for the `createProfileAttachment` operation. */
  export interface CreateProfileAttachmentParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The profile ID. */
    profileId: string;
    /** The Prototype to create a profile attachment. */
    newAttachments: ProfileAttachmentBase[];
    /** The profile ID to target against. */
    newProfileId?: string;
    /** The user account ID. */
    accountId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getProfileAttachment` operation. */
  export interface GetProfileAttachmentParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The profile ID. */
    profileId: string;
    /** The attachment ID. */
    attachmentId: string;
    /** The user account ID. */
    accountId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `replaceProfileAttachment` operation. */
  export interface ReplaceProfileAttachmentParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The profile ID. */
    profileId: string;
    /** The attachment ID. */
    attachmentId: string;
    /** The parameters associated with the profile attachment. */
    attachmentParameters: Parameter[];
    /** The details to describe the profile attachment. */
    description: string;
    /** The name of the Profile Attachment. */
    name: string;
    /** The notification configuration of the attachment. */
    notifications: AttachmentNotifications;
    /** Details how often a scan from a profile attachment is ran. */
    schedule: ReplaceProfileAttachmentConstants.Schedule | string;
    /** A list of scopes associated with a profile attachment. */
    scope: MultiCloudScopePayload[];
    /** Details the state of a profile attachment. */
    status: ReplaceProfileAttachmentConstants.Status | string;
    /** Date range. */
    dataSelectionRange?: DateRange;
    /** The user account ID. */
    accountId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `replaceProfileAttachment` operation. */
  export namespace ReplaceProfileAttachmentConstants {
    /** Details how often a scan from a profile attachment is ran. */
    export enum Schedule {
      DAILY = 'daily',
      EVERY_7_DAYS = 'every_7_days',
      EVERY_30_DAYS = 'every_30_days',
    }
    /** Details the state of a profile attachment. */
    export enum Status {
      ENABLED = 'enabled',
      DISABLED = 'disabled',
    }
  }

  /** Parameters for the `deleteProfileAttachment` operation. */
  export interface DeleteProfileAttachmentParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The profile ID. */
    profileId: string;
    /** The attachment ID. */
    attachmentId: string;
    /** The user account ID. */
    accountId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `upgradeAttachment` operation. */
  export interface UpgradeAttachmentParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The profile ID. */
    profileId: string;
    /** The attachment ID. */
    attachmentId: string;
    /** The attachment_parameters to set for a Profile Attachment. */
    attachmentParameters: Parameter[];
    /** The user account ID. */
    accountId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createScan` operation. */
  export interface CreateScanParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The ID of the profile attachment. */
    attachmentId?: string;
    /** The user account ID. */
    accountId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createControlLibrary` operation. */
  export interface CreateControlLibraryParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The name of the control library. */
    controlLibraryName: string;
    /** Details of the control library. */
    controlLibraryDescription: string;
    /** Details that the control library is a user made(custom) or Security Compliance Center(predefined). */
    controlLibraryType: CreateControlLibraryConstants.ControlLibraryType | string;
    /** The revision number of the control library. */
    controlLibraryVersion: string;
    /** The list of rules that the control library attempts to adhere to. */
    controls: ControlPrototype[];
    /** The user account ID. */
    accountId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createControlLibrary` operation. */
  export namespace CreateControlLibraryConstants {
    /** Details that the control library is a user made(custom) or Security Compliance Center(predefined). */
    export enum ControlLibraryType {
      CUSTOM = 'custom',
    }
  }

  /** Parameters for the `listControlLibraries` operation. */
  export interface ListControlLibrariesParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The user account ID. */
    accountId?: string;
    /** The indication of how many resources to return, unless the response is the last page of resources. */
    limit?: number;
    /** Determine what resource to start the page on or after. */
    start?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `replaceCustomControlLibrary` operation. */
  export interface ReplaceCustomControlLibraryParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The control library ID. */
    controlLibraryId: string;
    /** The name of the control library. */
    controlLibraryName: string;
    /** Details of the control library. */
    controlLibraryDescription: string;
    /** Details that the control library is a user made(custom) or Security Compliance Center(predefined). */
    controlLibraryType: ReplaceCustomControlLibraryConstants.ControlLibraryType | string;
    /** The revision number of the control library. */
    controlLibraryVersion: string;
    /** The list of rules that the control library attempts to adhere to. */
    controls: ControlPrototype[];
    /** The account id tied to billing. */
    bssAccount?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `replaceCustomControlLibrary` operation. */
  export namespace ReplaceCustomControlLibraryConstants {
    /** Details that the control library is a user made(custom) or Security Compliance Center(predefined). */
    export enum ControlLibraryType {
      CUSTOM = 'custom',
    }
  }

  /** Parameters for the `getControlLibrary` operation. */
  export interface GetControlLibraryParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The control library ID. */
    controlLibraryId: string;
    /** The user account ID. */
    accountId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteCustomControlLibrary` operation. */
  export interface DeleteCustomControlLibraryParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The control library ID. */
    controlLibraryId: string;
    /** The user account ID. */
    accountId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createProfile` operation. */
  export interface CreateProfileParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The name of the profile. */
    profileName: string;
    /** The version of the profile. */
    profileVersion: string;
    /** List of controls associated with the profile. */
    controls: ProfileControlsPrototype[];
    /** The default values when using the profile. */
    defaultParameters: DefaultParameters[];
    /** A description of what the profile should represent. */
    profileDescription?: string;
    /** Determines if the profile is up to date with the latest revisions. */
    latest?: boolean;
    /** The unique identifier of the revision. */
    versionGroupLabel?: string;
    /** The user account ID. */
    accountId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listProfiles` operation. */
  export interface ListProfilesParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The user account ID. */
    accountId?: string;
    /** The indication of how many resources to return, unless the response is the last page of resources. */
    limit?: number;
    /** Determine what resource to start the page on or after. */
    start?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `replaceProfile` operation. */
  export interface ReplaceProfileParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The profile ID. */
    profileId: string;
    /** The type of profile, either predefined or custom. */
    newProfileType: ReplaceProfileConstants.ProfileType | string;
    /** The list of controls. */
    newControls: ProfileControls[];
    /** The default parameters of the profile. */
    newDefaultParameters: DefaultParameters[];
    /** The ID of the profile. */
    newId?: string;
    /** The name of the profile. */
    newProfileName?: string;
    /** The ID of the Security and Compliance Center instance who owns the profile. */
    newInstanceId?: string;
    /** Determines if the profile can be set to a hierarchy. */
    newHierarchyEnabled?: boolean;
    /** A description of what the profile should represent. */
    newProfileDescription?: string;
    /** The version of the profile. */
    newProfileVersion?: string;
    /** The unique identifier of the revision. */
    newVersionGroupLabel?: string;
    /** Determines if the profile is up to date with the latest revisions. */
    newLatest?: boolean;
    /** User who created the profile. */
    newCreatedBy?: string;
    /** The date when the profile was created, in date-time format. */
    newCreatedOn?: string;
    /** User who made the latest changes to the profile. */
    newUpdatedBy?: string;
    /** The date when the profile was last updated, in date-time format. */
    newUpdatedOn?: string;
    /** The number of controls contained in the profile. */
    newControlsCount?: number;
    /** The number of attachments associated with the profile. */
    newAttachmentsCount?: number;
    /** The user account ID. */
    accountId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `replaceProfile` operation. */
  export namespace ReplaceProfileConstants {
    /** The type of profile, either predefined or custom. */
    export enum ProfileType {
      CUSTOM = 'custom',
      PREDEFINED = 'predefined',
    }
  }

  /** Parameters for the `getProfile` operation. */
  export interface GetProfileParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The profile ID. */
    profileId: string;
    /** The user account ID. */
    accountId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteCustomProfile` operation. */
  export interface DeleteCustomProfileParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The profile ID. */
    profileId: string;
    /** The user account ID. */
    accountId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `replaceProfileParameters` operation. */
  export interface ReplaceProfileParametersParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The profile ID. */
    profileId: string;
    /** list of parameters given by default. */
    defaultParameters: DefaultParameters[];
    /** The ID of the Profile. */
    id?: string;
    /** The user account ID. */
    accountId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listProfileParameters` operation. */
  export interface ListProfileParametersParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The profile ID. */
    profileId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `compareProfiles` operation. */
  export interface CompareProfilesParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The profile ID to compare. */
    profileId: string;
    /** The user account ID. */
    accountId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listProfileAttachments` operation. */
  export interface ListProfileAttachmentsParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The profile ID. */
    profileId: string;
    /** The user account ID. */
    accountId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createScope` operation. */
  export interface CreateScopeParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The scope name. */
    name?: string;
    /** The scope description. */
    description?: string;
    /** The scope environment. */
    environment?: string;
    /** The properties that are supported for scoping by this environment. */
    properties?: ScopeProperty[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listScopes` operation. */
  export interface ListScopesParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The indication of how many resources to return, unless the response is the last page of resources. */
    limit?: number;
    /** Determine what resource to start the page on or after. */
    start?: string;
    /** determine name of scope returned in response. */
    name?: string;
    /** determine descriptions of scope returned in response. */
    description?: string;
    /** determine environment of scopes returned in response. */
    environment?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateScope` operation. */
  export interface UpdateScopeParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The ID of the scope being targeted. */
    scopeId: string;
    /** The scope name. */
    name?: string;
    /** The scope description. */
    description?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getScope` operation. */
  export interface GetScopeParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The ID of the scope being targeted. */
    scopeId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteScope` operation. */
  export interface DeleteScopeParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The ID of the scope being targeted. */
    scopeId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createSubscope` operation. */
  export interface CreateSubscopeParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The ID of the scope being targeted. */
    scopeId: string;
    /** The array of subscopes. */
    subscopes: ScopePrototype[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listSubscopes` operation. */
  export interface ListSubscopesParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The ID of the scope being targeted. */
    scopeId: string;
    /** The indication of how many resources to return, unless the response is the last page of resources. */
    limit?: number;
    /** Determine what resource to start the page on or after. */
    start?: string;
    /** determine name of subscope returned in response. */
    name?: string;
    /** determine descriptions of subscopes returned in response. */
    description?: string;
    /** determine environment of subscopes returned in response. */
    environment?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getSubscope` operation. */
  export interface GetSubscopeParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The ID of the scope being targeted. */
    scopeId: string;
    /** The ID of the scope being targeted. */
    subscopeId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateSubscope` operation. */
  export interface UpdateSubscopeParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The ID of the scope being targeted. */
    scopeId: string;
    /** The ID of the scope being targeted. */
    subscopeId: string;
    /** The scope name. */
    name?: string;
    /** The scope description. */
    description?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteSubscope` operation. */
  export interface DeleteSubscopeParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The ID of the scope being targeted. */
    scopeId: string;
    /** The ID of the scope being targeted. */
    subscopeId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createTarget` operation. */
  export interface CreateTargetParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The target account ID. */
    accountId: string;
    /** The trusted profile ID. */
    trustedProfileId: string;
    /** The target name. */
    name: string;
    /** Customer credential to access for a specific service to scan. */
    credentials?: Credential[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listTargets` operation. */
  export interface ListTargetsParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getTarget` operation. */
  export interface GetTargetParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The target ID. */
    targetId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `replaceTarget` operation. */
  export interface ReplaceTargetParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The target ID. */
    targetId: string;
    /** The target account ID. */
    accountId: string;
    /** The trusted profile ID. */
    trustedProfileId: string;
    /** The target name. */
    name: string;
    /** Customer credential to access for a specific service to scan. */
    credentials?: Credential[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteTarget` operation. */
  export interface DeleteTargetParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The target ID. */
    targetId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createProviderTypeInstance` operation. */
  export interface CreateProviderTypeInstanceParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The provider type ID. */
    providerTypeId: string;
    /** The provider type instance name. */
    name?: string;
    /** The attributes for connecting to the provider type instance. */
    attributes?: JsonObject;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listProviderTypeInstances` operation. */
  export interface ListProviderTypeInstancesParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The provider type ID. */
    providerTypeId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getProviderTypeInstance` operation. */
  export interface GetProviderTypeInstanceParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The provider type ID. */
    providerTypeId: string;
    /** The provider type instance ID. */
    providerTypeInstanceId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateProviderTypeInstance` operation. */
  export interface UpdateProviderTypeInstanceParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The provider type ID. */
    providerTypeId: string;
    /** The provider type instance ID. */
    providerTypeInstanceId: string;
    /** The provider type instance name. */
    name?: string;
    /** The attributes for connecting to the provider type instance. */
    attributes?: JsonObject;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteProviderTypeInstance` operation. */
  export interface DeleteProviderTypeInstanceParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The provider type ID. */
    providerTypeId: string;
    /** The provider type instance ID. */
    providerTypeInstanceId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listProviderTypes` operation. */
  export interface ListProviderTypesParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getProviderTypeById` operation. */
  export interface GetProviderTypeByIdParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The provider type ID. */
    providerTypeId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getLatestReports` operation. */
  export interface GetLatestReportsParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** This field sorts controls by using a valid sort field. To learn more, see
     *  [Sorting](https://cloud.ibm.com/docs/api-handbook?topic=api-handbook-sorting).
     */
    sort?: GetLatestReportsConstants.Sort | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `getLatestReports` operation. */
  export namespace GetLatestReportsConstants {
    /** This field sorts controls by using a valid sort field. To learn more, see [Sorting](https://cloud.ibm.com/docs/api-handbook?topic=api-handbook-sorting). */
    export enum Sort {
      PROFILE_NAME = 'profile_name',
      SCOPE_ID = 'scope_id',
      CREATED_ON = 'created_on',
    }
  }

  /** Parameters for the `listReports` operation. */
  export interface ListReportsParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The ID of the attachment. */
    reportAttachmentId?: string;
    /** The report group ID. */
    groupId?: string;
    /** The ID of the profile. */
    reportProfileId?: string;
    /** The type of the scan. */
    type?: ListReportsConstants.Type | string;
    /** The indication of what resource to start the page on. */
    start?: string;
    /** The indication of many resources to return, unless the response is the last page of resources. */
    limit?: number;
    /** This field sorts results by using a valid sort field. */
    sort?: ListReportsConstants.Sort | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listReports` operation. */
  export namespace ListReportsConstants {
    /** The type of the scan. */
    export enum Type {
      ONDEMAND = 'ondemand',
      SCHEDULED = 'scheduled',
    }
    /** This field sorts results by using a valid sort field. */
    export enum Sort {
      PROFILE_NAME = 'profile_name',
      SCOPE_ID = 'scope_id',
      GROUP_ID = 'group_id',
      CREATED_ON = 'created_on',
      TYPE = 'type',
    }
  }

  /** Parameters for the `getReport` operation. */
  export interface GetReportParams {
    /** The ID of the scan that is associated with a report. */
    reportId: string;
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The ID of the scope. */
    scopeId?: string;
    /** The ID of the subscope. */
    subscopeId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getReportSummary` operation. */
  export interface GetReportSummaryParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The ID of the scan that is associated with a report. */
    reportId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getReportDownloadFile` operation. */
  export interface GetReportDownloadFileParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The ID of the scan that is associated with a report. */
    reportId: string;
    /** The type of the response: application/csv or application/pdf. */
    accept?: GetReportDownloadFileConstants.Accept | string;
    /** The indication of whether report summary metadata must be excluded. */
    excludeSummary?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `getReportDownloadFile` operation. */
  export namespace GetReportDownloadFileConstants {
    /** The type of the response: application/csv or application/pdf. */
    export enum Accept {
      APPLICATION_CSV = 'application/csv',
      APPLICATION_PDF = 'application/pdf',
    }
  }

  /** Parameters for the `getReportControls` operation. */
  export interface GetReportControlsParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The ID of the scan that is associated with a report. */
    reportId: string;
    /** The ID of the control. */
    controlId?: string;
    /** The name of the control. */
    controlName?: string;
    /** The description of the control. */
    controlDescription?: string;
    /** A control category value. */
    controlCategory?: string;
    /** The compliance status value. */
    status?: GetReportControlsConstants.Status | string;
    /** This field sorts controls by using a valid sort field. To learn more, see
     *  [Sorting](https://cloud.ibm.com/docs/api-handbook?topic=api-handbook-sorting).
     */
    sort?: GetReportControlsConstants.Sort | string;
    /** The ID of the scope. */
    scopeId?: string;
    /** The ID of the subscope. */
    subscopeId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `getReportControls` operation. */
  export namespace GetReportControlsConstants {
    /** The compliance status value. */
    export enum Status {
      COMPLIANT = 'compliant',
      NOT_COMPLIANT = 'not_compliant',
      UNABLE_TO_PERFORM = 'unable_to_perform',
      USER_EVALUATION_REQUIRED = 'user_evaluation_required',
      NOT_APPLICABLE = 'not_applicable',
    }
    /** This field sorts controls by using a valid sort field. To learn more, see [Sorting](https://cloud.ibm.com/docs/api-handbook?topic=api-handbook-sorting). */
    export enum Sort {
      CONTROL_NAME = 'control_name',
      CONTROL_CATEGORY = 'control_category',
      STATUS = 'status',
    }
  }

  /** Parameters for the `getReportRule` operation. */
  export interface GetReportRuleParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The ID of the scan that is associated with a report. */
    reportId: string;
    /** The ID of the rule within a report. */
    ruleId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listReportEvaluations` operation. */
  export interface ListReportEvaluationsParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The ID of the scan that is associated with a report. */
    reportId: string;
    /** The ID of the assessment. */
    assessmentId?: string;
    /** The assessment method. */
    assessmentMethod?: string;
    /** The ID of component. */
    componentId?: string;
    /** The ID of the evaluation target. */
    targetId?: string;
    /** The environment of the evaluation target. */
    targetEnv?: string;
    /** The name of the evaluation target. */
    targetName?: string;
    /** The evaluation status value. */
    status?: ListReportEvaluationsConstants.Status | string;
    /** The indication of what resource to start the page on. */
    start?: string;
    /** The indication of many resources to return, unless the response is the last page of resources. */
    limit?: number;
    /** This field sorts resources by using a valid sort field. To learn more, see
     *  [Sorting](https://cloud.ibm.com/docs/api-handbook?topic=api-handbook-sorting).
     */
    sort?: ListReportEvaluationsConstants.Sort | string;
    /** The ID of the scope. */
    scopeId?: string;
    /** The ID of the subscope. */
    subscopeId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listReportEvaluations` operation. */
  export namespace ListReportEvaluationsConstants {
    /** The evaluation status value. */
    export enum Status {
      PASS = 'pass',
      FAILURE = 'failure',
      ERROR = 'error',
      SKIPPED = 'skipped',
    }
    /** This field sorts resources by using a valid sort field. To learn more, see [Sorting](https://cloud.ibm.com/docs/api-handbook?topic=api-handbook-sorting). */
    export enum Sort {
      ASSESSMENT_ID = 'assessment_id',
      TARGET_ID = 'target_id',
      TARGET_NAME = 'target_name',
      STATUS = 'status',
    }
  }

  /** Parameters for the `listReportResources` operation. */
  export interface ListReportResourcesParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The ID of the scan that is associated with a report. */
    reportId: string;
    /** The ID of the resource. */
    id?: string;
    /** The name of the resource. */
    resourceName?: string;
    /** The user account ID. */
    accountId?: string;
    /** The ID of component. */
    componentId?: string;
    /** The compliance status value. */
    status?: ListReportResourcesConstants.Status | string;
    /** This field sorts resources by using a valid sort field. To learn more, see
     *  [Sorting](https://cloud.ibm.com/docs/api-handbook?topic=api-handbook-sorting).
     */
    sort?: ListReportResourcesConstants.Sort | string;
    /** The indication of what resource to start the page on. */
    start?: string;
    /** The indication of many resources to return, unless the response is the last page of resources. */
    limit?: number;
    /** The ID of the scope. */
    scopeId?: string;
    /** The ID of the subscope. */
    subscopeId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listReportResources` operation. */
  export namespace ListReportResourcesConstants {
    /** The compliance status value. */
    export enum Status {
      COMPLIANT = 'compliant',
      NOT_COMPLIANT = 'not_compliant',
      UNABLE_TO_PERFORM = 'unable_to_perform',
      USER_EVALUATION_REQUIRED = 'user_evaluation_required',
      NOT_APPLICABLE = 'not_applicable',
    }
    /** This field sorts resources by using a valid sort field. To learn more, see [Sorting](https://cloud.ibm.com/docs/api-handbook?topic=api-handbook-sorting). */
    export enum Sort {
      ACCOUNT_ID = 'account_id',
      COMPONENT_ID = 'component_id',
      RESOURCE_NAME = 'resource_name',
      STATUS = 'status',
    }
  }

  /** Parameters for the `getReportTags` operation. */
  export interface GetReportTagsParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The ID of the scan that is associated with a report. */
    reportId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getReportViolationsDrift` operation. */
  export interface GetReportViolationsDriftParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The ID of the scan that is associated with a report. */
    reportId: string;
    /** The duration of the `scan_time` timestamp in number of days. */
    scanTimeDuration?: number;
    /** The ID of the scope. */
    scopeId?: string;
    /** The ID of the subscope. */
    subscopeId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listScanReports` operation. */
  export interface ListScanReportsParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The ID of the scan that is associated with a report. */
    reportId: string;
    /** The ID of the scope. */
    scopeId?: string;
    /** The ID of the subscope. */
    subscopeId?: string;
    /** This field sorts results by using a valid sort field. */
    sort?: ListScanReportsConstants.Sort | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listScanReports` operation. */
  export namespace ListScanReportsConstants {
    /** This field sorts results by using a valid sort field. */
    export enum Sort {
      STATUS = 'status',
      SCOPE_ID = 'scope_id',
      SUBSCOPE_ID = 'subscope_id',
      CREATED_ON = 'created_on',
    }
  }

  /** Parameters for the `createScanReport` operation. */
  export interface CreateScanReportParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The ID of the scan that is associated with a report. */
    reportId: string;
    /** The enum of different report format types. */
    format: CreateScanReportConstants.Format | string;
    /** The ID of the scope. */
    scopeId?: string;
    /** The ID of the sub-scope. */
    subscopeId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createScanReport` operation. */
  export namespace CreateScanReportConstants {
    /** The enum of different report format types. */
    export enum Format {
      CSV = 'csv',
      PDF = 'pdf',
    }
  }

  /** Parameters for the `getScanReport` operation. */
  export interface GetScanReportParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The ID of the scan that is associated with a report. */
    reportId: string;
    /** The ID of the scan_result. */
    jobId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getScanReportDownloadFile` operation. */
  export interface GetScanReportDownloadFileParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The ID of the scan that is associated with a report. */
    reportId: string;
    /** The ID of the scan_result. */
    jobId: string;
    /** The type of the response: application/csv or application/pdf. */
    accept?: GetScanReportDownloadFileConstants.Accept | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `getScanReportDownloadFile` operation. */
  export namespace GetScanReportDownloadFileConstants {
    /** The type of the response: application/csv or application/pdf. */
    export enum Accept {
      APPLICATION_CSV = 'application/csv',
      APPLICATION_PDF = 'application/pdf',
    }
  }

  /** Parameters for the `listRules` operation. */
  export interface ListRulesParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The indication of how many resources to return, unless the response is the last page of resources. */
    limit?: number;
    /** Determine what resource to start the page on or after. */
    start?: string;
    /** The list of only user-defined, or system-defined rules. */
    type?: ListRulesConstants.Type | string;
    /** The indication of whether to search for rules with a specific string string in the name, description, or
     *  labels.
     */
    search?: string;
    /** Searches for rules targeting corresponding service. */
    serviceName?: string;
    /** Field used to sort rules. Rules can be sorted in ascending or descending order. */
    sort?: ListRulesConstants.Sort | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listRules` operation. */
  export namespace ListRulesConstants {
    /** The list of only user-defined, or system-defined rules. */
    export enum Type {
      USER_DEFINED = 'user_defined',
      SYSTEM_DEFINED = 'system_defined',
    }
    /** Field used to sort rules. Rules can be sorted in ascending or descending order. */
    export enum Sort {
      DESCRIPTION = 'description',
      SERVICE_DISPLAY_NAME = 'service_display_name',
      TYPE = 'type',
      UPDATED_ON = 'updated_on',
    }
  }

  /** Parameters for the `createRule` operation. */
  export interface CreateRuleParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The rule description. */
    description: string;
    /** The rule target. */
    target: RuleTargetPrototype;
    /** The required configurations for a Rule. */
    requiredConfig: RequiredConfig;
    /** The rule version number. */
    version?: string;
    /** The collection of import parameters. */
    _import?: Import;
    /** The list of labels that correspond to a rule. */
    labels?: string[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getRule` operation. */
  export interface GetRuleParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The ID of a rule/assessment. */
    ruleId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `replaceRule` operation. */
  export interface ReplaceRuleParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The ID of a rule/assessment. */
    ruleId: string;
    /** This field compares a supplied `Etag` value with the version that is stored for the requested resource. If
     *  the values match, the server allows the request method to continue.
     *
     *  To find the `Etag` value, run a GET request on the resource that you want to modify, and check the response
     *  headers.
     */
    ifMatch: string;
    /** The rule description. */
    description: string;
    /** The rule target. */
    target: RuleTargetPrototype;
    /** The required configurations for a Rule. */
    requiredConfig: RequiredConfig;
    /** The rule version number. */
    version?: string;
    /** The collection of import parameters. */
    _import?: Import;
    /** The list of labels that correspond to a rule. */
    labels?: string[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteRule` operation. */
  export interface DeleteRuleParams {
    /** The ID of the Security and Compliance Center instance. */
    instanceId: string;
    /** The ID of a rule/assessment. */
    ruleId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listServices` operation. */
  export interface ListServicesParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getService` operation. */
  export interface GetServiceParams {
    /** The name of the corresponding service. */
    servicesName: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /**
   * The account that is associated with a report.
   */
  export interface Account {
    /** The account ID. */
    id?: string;
    /** The account name. */
    name?: string;
    /** The account type. */
    type?: string;
  }

  /**
   * Extended information for a report.
   */
  export interface AdditionalDetails {
    /** Identifies which entity created a report. */
    created_by?: string;
    /** Classification for a report. */
    labels?: string[];
    /** URL. */
    links?: Link[];
  }

  /**
   * AdditionalProperty.
   */
  export interface AdditionalProperty {
    /** An additional property that indicates the type of the attribute in various formats (text, url, secret,
     *  label, masked).
     */
    type: AdditionalProperty.Constants.Type | string;
    /** The name of the attribute that is displayed in the UI. */
    display_name: string;
  }
  export namespace AdditionalProperty {
    export namespace Constants {
      /** An additional property that indicates the type of the attribute in various formats (text, url, secret, label, masked). */
      export enum Type {
        SECRET = 'secret',
        LABEL = 'label',
        URL = 'url',
        TEXT = 'text',
        MASKED = 'masked',
      }
    }
  }

  /**
   * The additional target attribute of the service.
   */
  export interface AdditionalTargetAttribute {
    /** The additional target attribute name. */
    name?: string;
    /** The operator. */
    operator: AdditionalTargetAttribute.Constants.Operator | string;
    /** The value can be of any type. */
    value?: any;
  }
  export namespace AdditionalTargetAttribute {
    export namespace Constants {
      /** The operator. */
      export enum Operator {
        STRING_EQUALS = 'string_equals',
        STRING_NOT_EQUALS = 'string_not_equals',
        STRING_MATCH = 'string_match',
        STRING_NOT_MATCH = 'string_not_match',
        STRING_CONTAINS = 'string_contains',
        STRING_NOT_CONTAINS = 'string_not_contains',
        NUM_EQUALS = 'num_equals',
        NUM_NOT_EQUALS = 'num_not_equals',
        NUM_LESS_THAN = 'num_less_than',
        NUM_LESS_THAN_EQUALS = 'num_less_than_equals',
        NUM_GREATER_THAN = 'num_greater_than',
        NUM_GREATER_THAN_EQUALS = 'num_greater_than_equals',
        IS_EMPTY = 'is_empty',
        IS_NOT_EMPTY = 'is_not_empty',
        IS_TRUE = 'is_true',
        IS_FALSE = 'is_false',
        STRINGS_IN_LIST = 'strings_in_list',
        STRINGS_ALLOWED = 'strings_allowed',
        STRINGS_REQUIRED = 'strings_required',
        IPS_IN_RANGE = 'ips_in_range',
        IPS_EQUALS = 'ips_equals',
        IPS_NOT_EQUALS = 'ips_not_equals',
        DAYS_LESS_THAN = 'days_less_than',
      }
    }
  }

  /**
   * The control specification assessment.
   */
  export interface Assessment {
    /** The assessment ID. */
    assessment_id?: string;
    /** The assessment type. */
    assessment_type?: string;
    /** The assessment method. */
    assessment_method?: string;
    /** The assessment description. */
    assessment_description?: string;
    /** The number of parameters of this assessment. */
    parameter_count?: number;
    /** The list of parameters of this assessment. */
    parameters: Parameter[];
  }

  /**
   * The necessary fields to include a rule/assessment.
   */
  export interface AssessmentPrototype {
    /** The ID of the rule to target. A list of rules can be obtained from the list_rules method. */
    assessment_id?: string;
    /** Details on the intent of the rule for an assessment. */
    assessment_description?: string;
  }

  /**
   * The control specification assessment.
   */
  export interface AssessmentWithStats {
    /** The assessment ID. */
    assessment_id?: string;
    /** The assessment type. */
    assessment_type?: string;
    /** The assessment method. */
    assessment_method?: string;
    /** The assessment description. */
    assessment_description?: string;
    /** The number of parameters of this assessment. */
    parameter_count?: number;
    /** The list of parameters of this assessment. */
    parameters?: Parameter[];
    /** The total number of evaluations. */
    total_count?: number;
    /** The number of passed evaluations. */
    pass_count?: number;
    /** The number of failed evaluations. */
    failure_count?: number;
    /** The number of evaluations that started, but did not finish, and ended with errors. */
    error_count?: number;
    /** The total number of completed evaluations. */
    completed_count?: number;
  }

  /**
   * The attachment that is associated with a report.
   */
  export interface Attachment {
    /** The attachment ID. */
    id?: string;
    /** The name of the attachment. */
    name?: string;
    /** The description of the attachment. */
    description?: string;
    /** The attachment schedule. */
    schedule?: string;
    /** Deprecated: (deprecated) The scope associated with the report. */
    scope?: any;
    /** The report's scopes based on the caller's access permissions. */
    scopes?: Scope[];
    /** The notification configuration of the attachment. */
    notifications?: AttachmentNotifications;
  }

  /**
   * The notification configuration of the attachment.
   */
  export interface AttachmentNotifications {
    /** Shows if the notification is enabled or disabled. */
    enabled?: boolean;
    /** The controls associated with an AttachmentNotification. */
    controls?: AttachmentNotificationsControls;
  }

  /**
   * The controls associated with an AttachmentNotification.
   */
  export interface AttachmentNotificationsControls {
    /** The maximum number of not compliant controls before a notification is triggered. */
    threshold_limit?: number;
    /** List of controls that triggers a notification should a scan fail. */
    failed_control_ids: string[];
  }

  /**
   * The predefined profile comparison response.
   */
  export interface ComparePredefinedProfilesResponse {
    /** Shows a change in the Profile. */
    current_predefined_version?: CompareProfileResponse;
    /** Shows a change in the Profile. */
    latest_predefined_version?: CompareProfileResponse;
    /** Shows details of the controls that were changed. */
    controls_changes?: ControlChanges;
    /** Shows details of the parameters that were changed. */
    default_parameters_changes?: DefaultParametersChanges;
  }

  /**
   * Shows a change in the Profile.
   */
  export interface CompareProfileResponse {
    /** The ID of the profile. */
    id?: string;
    /** The name of the profile. */
    profile_name?: string;
    /** A description of what the profile should represent. */
    profile_description?: string;
    /** The type of profile, either predefined or custom. */
    profile_type: CompareProfileResponse.Constants.ProfileType | string;
    /** The version of the profile. */
    profile_version?: string;
    /** The unique identifier of the profile revision. */
    version_group_label?: string;
    /** Determines if the profile is up to date with the latest revisions. */
    latest?: boolean;
    /** User who created the profile. */
    created_by?: string;
    /** The date when the profile was created, in date-time format. */
    created_on?: string;
    /** User who made the latest changes to the profile. */
    updated_by?: string;
    /** The date when the profile was last updated, in date-time format. */
    updated_on?: string;
    /** Number of controls in the profile. */
    controls_count?: number;
  }
  export namespace CompareProfileResponse {
    export namespace Constants {
      /** The type of profile, either predefined or custom. */
      export enum ProfileType {
        CUSTOM = 'custom',
        PREDEFINED = 'predefined',
      }
    }
  }

  /**
   * The compliance score.
   */
  export interface ComplianceScore {
    /** The number of successful evaluations. */
    passed?: number;
    /** The total number of evaluations. */
    total_count?: number;
    /** The percentage of successful evaluations. */
    percent?: number;
  }

  /**
   * The compliance stats.
   */
  export interface ComplianceStats {
    /** The allowed values of an aggregated status for controls, specifications, assessments, and resources. */
    status: ComplianceStats.Constants.Status | string;
    /** The total number of checks. */
    total_count?: number;
    /** The number of compliant checks. */
    compliant_count?: number;
    /** The number of checks that are not compliant. */
    not_compliant_count?: number;
    /** The number of checks that are unable to perform. */
    unable_to_perform_count?: number;
    /** The number of checks that require a user evaluation. */
    user_evaluation_required_count?: number;
    /** The number of not applicable (with no evaluations) checks. */
    not_applicable_count?: number;
  }
  export namespace ComplianceStats {
    export namespace Constants {
      /** The allowed values of an aggregated status for controls, specifications, assessments, and resources. */
      export enum Status {
        COMPLIANT = 'compliant',
        NOT_COMPLIANT = 'not_compliant',
        UNABLE_TO_PERFORM = 'unable_to_perform',
        USER_EVALUATION_REQUIRED = 'user_evaluation_required',
        NOT_APPLICABLE = 'not_applicable',
      }
    }
  }

  /**
   * The compliance stats.
   */
  export interface ComplianceStatsWithNonCompliant {
    /** The allowed values of an aggregated status for controls, specifications, assessments, and resources. */
    status: ComplianceStatsWithNonCompliant.Constants.Status | string;
    /** The total number of checks. */
    total_count?: number;
    /** The number of compliant checks. */
    compliant_count?: number;
    /** The number of checks that are not compliant. */
    not_compliant_count?: number;
    /** The number of checks that are unable to perform. */
    unable_to_perform_count?: number;
    /** The number of checks that require a user evaluation. */
    user_evaluation_required_count?: number;
    /** The number of not applicable (with no evaluations) checks. */
    not_applicable_count?: number;
    /** The list of non compliant controls. */
    not_compliant_controls?: ControlSummary[];
  }
  export namespace ComplianceStatsWithNonCompliant {
    export namespace Constants {
      /** The allowed values of an aggregated status for controls, specifications, assessments, and resources. */
      export enum Status {
        COMPLIANT = 'compliant',
        NOT_COMPLIANT = 'not_compliant',
        UNABLE_TO_PERFORM = 'unable_to_perform',
        USER_EVALUATION_REQUIRED = 'user_evaluation_required',
        NOT_APPLICABLE = 'not_applicable',
      }
    }
  }

  /**
   * ConditionItem.
   */
  export interface ConditionItem {
  }

  /**
   * The service configuration information.
   */
  export interface ConfigurationInformationPoints {
    /** The information type. */
    type?: string;
    /** The service configurations endpoints. */
    endpoints?: Endpoint[];
  }

  /**
   * A technical, administrative, or physical safeguard designed to meet a set of defined security and privacy
   * requirements.
   */
  export interface Control {
    /** The ID of the control library that contains the profile. */
    control_name?: string;
    /** The control name. */
    control_id?: string;
    /** The control description. */
    control_description?: string;
    /** The association of the control. */
    control_category?: string;
    /** The ID of the parent control. */
    control_parent?: string;
    /** Details how important a control is should it fail. */
    control_severity?: string;
    /** tags associated with a control. */
    control_tags: string[];
    /** List of control specifications associated with the control. */
    control_specifications: ControlSpecification[];
    /** References to a control documentation. */
    control_docs?: ControlDoc;
    /** Determines if a control will be evaluated or not. */
    status?: string;
  }

  /**
   * Shows details of the controls that were changed.
   */
  export interface ControlChanges {
    /** How many controls were added. */
    total_added?: number;
    /** How many controls were removed. */
    total_removed?: number;
    /** How many controls were updated. */
    total_updated?: number;
    /** A list of controls that were added. */
    added: ProfileControls[];
    /** A list of controls that were removed. */
    removed: ProfileControls[];
    /** A list of controls that were updated. */
    updated: ControlChangesUpdated[];
  }

  /**
   * Shows the difference in the Controls.
   */
  export interface ControlChangesUpdated {
    /** The control details for a profile. */
    current?: ProfileControls;
    /** The control details for a profile. */
    latest?: ProfileControls;
  }

  /**
   * References to a control documentation.
   */
  export interface ControlDoc {
    /** The ID of the control doc. */
    control_docs_id?: string;
    /** The type of the control doc. */
    control_docs_type?: string;
  }

  /**
   * A Control Library.
   */
  export interface ControlLibrary {
    /** The name of the control library. */
    control_library_name?: string;
    /** Details of the control library. */
    control_library_description?: string;
    /** Details that the control library is a user made(custom) or Security Compliance Center(predefined). */
    control_library_type: ControlLibrary.Constants.ControlLibraryType | string;
    /** The revision number of the control library. */
    control_library_version?: string;
    /** The list of rules that the control library attempts to adhere to. */
    controls: Control[];
    /** The ID of the control library. */
    id?: string;
    /** The ID of the account associated with the creation of the control library. */
    account_id?: string;
    /** The ETag or version of the Control Library. */
    version_group_label?: string;
    /** Shows if the Control Library is the latest. */
    latest?: boolean;
    /** The ID of the creator of the Control Library. */
    created_by?: string;
    /** The date-time of the creation. */
    created_on?: string;
    /** The ID of the user who made the last update. */
    updated_by?: string;
    /** The date-time of the update. */
    updated_on?: string;
    /** Determines if the control library has any hierarchy. */
    hierarchy_enabled?: boolean;
    /** The count of controls tied to the control library. */
    controls_count?: number;
    /** THe count of control parents in the control library. */
    control_parents_count?: number;
  }
  export namespace ControlLibrary {
    export namespace Constants {
      /** Details that the control library is a user made(custom) or Security Compliance Center(predefined). */
      export enum ControlLibraryType {
        CUSTOM = 'custom',
        PREDEFINED = 'predefined',
      }
    }
  }

  /**
   * A list of ControlLibrary.
   */
  export interface ControlLibraryCollection {
    /** The requested page limit. */
    limit: number;
    /** The total number of resources that are in the collection. */
    total_count: number;
    /** A page reference. */
    first?: PageHRefFirst;
    /** A page reference. */
    next?: PageHRefNext;
    /** The list of control libraries. */
    control_libraries: ControlLibrary[];
  }

  /**
   * The payload to instantiate a control.
   */
  export interface ControlPrototype {
    /** The ID of the control library that contains the profile. */
    control_name: string;
    /** The control description. */
    control_description: string;
    /** The association of the control. */
    control_category: string;
    /** true if the control can be automated, false if the control cannot. */
    control_requirement: boolean;
    /** The ID of the parent control. */
    control_parent?: string;
    /** List of control specifications associated with the control. */
    control_specifications: ControlSpecificationPrototype[];
    /** References to a control documentation. */
    control_docs?: ControlDoc;
    /** Details if a control library can be used or not. */
    status?: string;
  }

  /**
   * A statement that defines a security/privacy requirement for a Control.
   */
  export interface ControlSpecification {
    /** The ID of the control. */
    id?: string;
    /** Details which party is responsible for the implementation of a specification. */
    responsibility?: string;
    /** The ID of the component. */
    component_id?: string;
    /** The name of the component. */
    component_name?: string;
    /** The type of component that will use the specification. */
    component_type?: string;
    /** The cloud provider the specification is targeting. */
    environment?: string;
    /** Information about the Control Specification. */
    description?: string;
    /** The number of rules tied to the specification. */
    assessments_count?: number;
    /** The detailed list of rules associated with the Specification. */
    assessments: Assessment[];
  }

  /**
   * The necessary fields to instantiate a Control Specification.
   */
  export interface ControlSpecificationPrototype {
    /** The ID of the component. The component_id can be found from the 'service_name' using the Get Services
     *  method.
     */
    component_id?: string;
    /** The cloud provider the specification is targeting. */
    environment?: ControlSpecificationPrototype.Constants.Environment | string;
    /** The ID of the control specification to give when creating the control_specification. */
    control_specification_id?: string;
    /** Information about the Control Specification. */
    control_specification_description?: string;
    /** The detailed list of rules associated with the Specification. */
    assessments?: AssessmentPrototype[];
  }
  export namespace ControlSpecificationPrototype {
    export namespace Constants {
      /** The cloud provider the specification is targeting. */
      export enum Environment {
        IBM_CLOUD = 'ibm-cloud',
      }
    }
  }

  /**
   * The control specification with compliance stats.
   */
  export interface ControlSpecificationWithStats {
    /** The control specification ID. */
    control_specification_id?: string;
    /** The component description. */
    control_specification_description?: string;
    /** The component ID. */
    component_id?: string;
    /** The components name. */
    component_name?: string;
    /** The environment. */
    environment?: string;
    /** The responsibility for managing control specifications. */
    responsibility?: string;
    /** The list of assessments. */
    assessments?: AssessmentWithStats[];
    /** The allowed values of an aggregated status for controls, specifications, assessments, and resources. */
    status: ControlSpecificationWithStats.Constants.Status | string;
    /** The total number of checks. */
    total_count?: number;
    /** The number of compliant checks. */
    compliant_count?: number;
    /** The number of checks that are not compliant. */
    not_compliant_count?: number;
    /** The number of checks that are unable to perform. */
    unable_to_perform_count?: number;
    /** The number of checks that require a user evaluation. */
    user_evaluation_required_count?: number;
    /** The number of not applicable (with no evaluations) checks. */
    not_applicable_count?: number;
  }
  export namespace ControlSpecificationWithStats {
    export namespace Constants {
      /** The allowed values of an aggregated status for controls, specifications, assessments, and resources. */
      export enum Status {
        COMPLIANT = 'compliant',
        NOT_COMPLIANT = 'not_compliant',
        UNABLE_TO_PERFORM = 'unable_to_perform',
        USER_EVALUATION_REQUIRED = 'user_evaluation_required',
        NOT_APPLICABLE = 'not_applicable',
      }
    }
  }

  /**
   * The summary of the control.
   */
  export interface ControlSummary {
    /** The controls ID. */
    id?: string;
    /** The controls name. */
    control_name?: string;
    /** The controls description. */
    control_description?: string;
  }

  /**
   * The control with compliance stats.
   */
  export interface ControlWithStats {
    /** The report ID. */
    report_id?: string;
    /** The home account ID. */
    home_account_id?: string;
    /** The control ID. */
    id?: string;
    /** The control library ID. */
    control_library_id?: string;
    /** The control library version. */
    control_library_version?: string;
    /** The control name. */
    control_name?: string;
    /** The control description. */
    control_description?: string;
    /** The control category. */
    control_category?: string;
    /** The list of specifications that are on the page. */
    control_specifications?: ControlSpecificationWithStats[];
    /** The collection of different types of tags. */
    resource_tags?: Tags;
    /** The allowed values of an aggregated status for controls, specifications, assessments, and resources. */
    status: ControlWithStats.Constants.Status | string;
    /** The total number of checks. */
    total_count?: number;
    /** The number of compliant checks. */
    compliant_count?: number;
    /** The number of checks that are not compliant. */
    not_compliant_count?: number;
    /** The number of checks that are unable to perform. */
    unable_to_perform_count?: number;
    /** The number of checks that require a user evaluation. */
    user_evaluation_required_count?: number;
    /** The number of not applicable (with no evaluations) checks. */
    not_applicable_count?: number;
  }
  export namespace ControlWithStats {
    export namespace Constants {
      /** The allowed values of an aggregated status for controls, specifications, assessments, and resources. */
      export enum Status {
        COMPLIANT = 'compliant',
        NOT_COMPLIANT = 'not_compliant',
        UNABLE_TO_PERFORM = 'unable_to_perform',
        USER_EVALUATION_REQUIRED = 'user_evaluation_required',
        NOT_APPLICABLE = 'not_applicable',
      }
    }
  }

  /**
   * The scan report ID.
   */
  export interface CreateScanReport {
    /** The scan report ID. */
    id?: string;
  }

  /**
   * The response that details the whether starting a scan was successful.
   */
  export interface CreateScanResponse {
    /** The ID of the scan generated. */
    id?: string;
    /** The ID of the account associated with the scan. */
    account_id?: string;
    /** The ID of the profile attachment associated with the scan. */
    attachment_id?: string;
    /** The ID of the report associated with the scan. */
    report_id?: string;
    /** Details the state of a scan. */
    status?: string;
    /** The last time a scan was performed. */
    last_scan_time?: string;
    /** The next time a scan will be triggered. */
    next_scan_time?: string;
    /** Shows how a scan gets triggered. */
    scan_type?: string;
    /** The number of times the scan appeared. */
    occurence?: number;
  }

  /**
   * Credential.
   */
  export interface Credential {
    /** The CRN of the secret. */
    secret_crn: string;
    /** Credential having service name and instance crn. */
    resources: Resource[];
  }

  /**
   * CredentialResponse.
   */
  export interface CredentialResponse {
    /** The type of the credential. */
    type: string;
    /** The CRN of the secret. */
    secret_crn: string;
    /** The name of the secret. */
    secret_name?: string;
    /** Credential having service name and instance crn. */
    resources: Resource[];
  }

  /**
   * Date range.
   */
  export interface DateRange {
    /** date/time for the start of the range. */
    start_date: string;
    /** date/time for the end of the range. */
    end_date: string;
  }

  /**
   * The parameters of the profile that are inherently set by the profile.
   */
  export interface DefaultParameters {
    /** The type of the implementation. */
    assessment_type?: string;
    /** The implementation ID of the parameter. */
    assessment_id?: string;
    /** The parameter's name. */
    parameter_name?: string;
    /** The default value of the parameter. */
    parameter_default_value?: string;
    /** The parameter display name. */
    parameter_display_name?: string;
    /** The parameter type. */
    parameter_type?: string;
  }

  /**
   * Shows details of the parameters that were changed.
   */
  export interface DefaultParametersChanges {
    /** Number of parameters added. */
    total_added?: number;
    /** Number of parameters removed. */
    total_removed?: number;
    /** Number of parameters updated. */
    total_updated?: number;
    /** List of parameters added. */
    added: DefaultParameters[];
    /** List of parameters removed. */
    removed: DefaultParameters[];
    /** List of parameters updated. */
    updated: DefaultParametersDifference[];
  }

  /**
   * Details the difference between the current parameters compared to the latest.
   */
  export interface DefaultParametersDifference {
    /** The parameters of the profile that are inherently set by the profile. */
    current?: DefaultParameters;
    /** The parameters of the profile that are inherently set by the profile. */
    latest?: DefaultParameters;
  }

  /**
   * The service configurations endpoint.
   */
  export interface Endpoint {
    /** The endpoint host. */
    host?: string;
    /** The endpoint path. */
    path?: string;
    /** The endpoint region. */
    region?: string;
    /** The endpoints advisory call limit. */
    advisory_call_limit?: number;
  }

  /**
   * The evaluation stats.
   */
  export interface EvalStats {
    /** The allowed values of an aggregated status for controls, specifications, assessments, and resources. */
    status: EvalStats.Constants.Status | string;
    /** The total number of evaluations. */
    total_count?: number;
    /** The number of passed evaluations. */
    pass_count?: number;
    /** The number of failed evaluations. */
    failure_count?: number;
    /** The number of evaluations that started, but did not finish, and ended with errors. */
    error_count?: number;
    /** The number of assessments with no corresponding evaluations. */
    skipped_count?: number;
    /** The total number of completed evaluations. */
    completed_count?: number;
  }
  export namespace EvalStats {
    export namespace Constants {
      /** The allowed values of an aggregated status for controls, specifications, assessments, and resources. */
      export enum Status {
        COMPLIANT = 'compliant',
        NOT_COMPLIANT = 'not_compliant',
        UNABLE_TO_PERFORM = 'unable_to_perform',
        USER_EVALUATION_REQUIRED = 'user_evaluation_required',
        NOT_APPLICABLE = 'not_applicable',
      }
    }
  }

  /**
   * The evaluation of a control specification assessment.
   */
  export interface Evaluation {
    /** The ID of the report that is associated to the evaluation. */
    report_id?: string;
    /** The ID of the home account. */
    home_account_id?: string;
    /** The component ID. */
    component_id?: string;
    /** The components name. */
    component_name?: string;
    /** The control specification assessment. */
    assessment?: Assessment;
    /** The time when the evaluation was made. */
    evaluate_time?: string;
    /** The evaluation target. */
    target?: TargetInfo;
    /** The allowed values of an evaluation status. */
    status: Evaluation.Constants.Status | string;
    /** The reason for the evaluation failure. */
    reason?: string;
    /** A list of details related to the Evaluation. */
    details?: EvaluationDetails;
    /** By whom the evaluation was made for erictree results. */
    evaluated_by?: string;
  }
  export namespace Evaluation {
    export namespace Constants {
      /** The allowed values of an evaluation status. */
      export enum Status {
        PASS = 'pass',
        FAILURE = 'failure',
        ERROR = 'error',
        SKIPPED = 'skipped',
      }
    }
  }

  /**
   * A list of details related to the Evaluation.
   */
  export interface EvaluationDetails {
    /** Details the evaluations that were incorrect. */
    properties?: EvaluationProperty[];
    /** The source provider of the evaluation. */
    provider_info?: EvaluationProviderInfo;
  }

  /**
   * The page of assessment evaluations.
   */
  export interface EvaluationPage {
    /** The requested page limit. */
    limit: number;
    /** The total number of resources that are in the collection. */
    total_count: number;
    /** A page reference. */
    first?: PageHRefFirst;
    /** A page reference. */
    next?: PageHRefNext;
    /** The ID of the report. */
    report_id?: string;
    /** The ID of the home account. */
    home_account_id?: string;
    /** The list of evaluations that are on the page. */
    evaluations?: Evaluation[];
  }

  /**
   * An aspect of the evaluation.
   */
  export interface EvaluationProperty {
    /** The attribute of the resource. */
    property?: string;
    /** An explanation of the resourcer. */
    property_description?: string;
    /** The operator used during the evaluation. */
    operator: EvaluationProperty.Constants.Operator | string;
    /** The value can be of any type. */
    expected_value?: any;
    /** The value can be of any type. */
    found_value?: any;
  }
  export namespace EvaluationProperty {
    export namespace Constants {
      /** The operator used during the evaluation. */
      export enum Operator {
        STRING_EQUALS = 'string_equals',
        STRING_NOT_EQUALS = 'string_not_equals',
        STRING_MATCH = 'string_match',
        STRING_NOT_MATCH = 'string_not_match',
        STRING_CONTAINS = 'string_contains',
        STRING_NOT_CONTAINS = 'string_not_contains',
        NUM_EQUALS = 'num_equals',
        NUM_NOT_EQUALS = 'num_not_equals',
        NUM_LESS_THAN = 'num_less_than',
        NUM_LESS_THAN_EQUALS = 'num_less_than_equals',
        NUM_GREATER_THAN = 'num_greater_than',
        NUM_GREATER_THAN_EQUALS = 'num_greater_than_equals',
        IS_EMPTY = 'is_empty',
        IS_NOT_EMPTY = 'is_not_empty',
        IS_TRUE = 'is_true',
        IS_FALSE = 'is_false',
        STRINGS_IN_LIST = 'strings_in_list',
        STRINGS_ALLOWED = 'strings_allowed',
        STRINGS_REQUIRED = 'strings_required',
        IPS_IN_RANGE = 'ips_in_range',
        IPS_EQUALS = 'ips_equals',
        IPS_NOT_EQUALS = 'ips_not_equals',
        DAYS_LESS_THAN = 'days_less_than',
      }
    }
  }

  /**
   * The source provider of the evaluation.
   */
  export interface EvaluationProviderInfo {
    /** Details the source of the evaluation. */
    provider_type?: string;
  }

  /**
   * The Event Notifications settings.
   */
  export interface EventNotifications {
    /** The Event Notifications instance CRN. */
    instance_crn?: string;
    /** The date when the Event Notifications connection was updated. */
    updated_on?: string;
    /** The connected Security and Compliance Center instance CRN. */
    source_id?: string;
    /** The description of the source of the Event Notifications. */
    source_description?: string;
    /** The name of the source of the Event Notifications. */
    source_name?: string;
  }

  /**
   * The payload to connect an Event Notification instance with a Security and Compliance Center instance.
   */
  export interface EventNotificationsPrototype {
    /** The CRN of the Event Notification instance to connect. */
    instance_crn?: string;
    /** The description of the source of the Event Notifications. */
    source_description?: string;
    /** The name of the source of the Event Notifications. */
    source_name?: string;
  }

  /**
   * The collection of import parameters.
   */
  export interface Import {
    /** The list of import parameters. */
    parameters?: RuleParameter[];
  }

  /**
   * The label that is associated with the provider type.
   */
  export interface LabelType {
    /** The text of the label. */
    text?: string;
    /** The text to be shown when user hover overs the label. */
    tip?: string;
  }

  /**
   * The last scan performed on a profile attachment.
   */
  export interface LastScan {
    /** The ID of the last scan. */
    id?: string;
    /** Details the state of the last scan. */
    status?: string;
    /** The last time the scan ran. */
    time?: string;
  }

  /**
   * Link.
   */
  export interface Link {
    description?: string;
    /** URL. */
    href?: string;
  }

  /**
   * MultiCloudScopePayload.
   */
  export interface MultiCloudScopePayload {
  }

  /**
   * The Cloud Object Storage settings.
   */
  export interface ObjectStorage {
    /** The connected Cloud Object Storage instance CRN. */
    instance_crn?: string;
    /** The connected Cloud Object Storage bucket name. */
    bucket?: string;
    /** The connected Cloud Object Storage bucket location. */
    bucket_location?: string;
    /** The connected Cloud Object Storage bucket endpoint. */
    bucket_endpoint?: string;
    /** The date when the bucket connection was updated. */
    updated_on?: string;
  }

  /**
   * The payload to connect a Cloud Object Storage instance to an Security and Compliance Center instance.
   */
  export interface ObjectStoragePrototype {
    /** The connected Cloud Object Storage bucket name. */
    bucket?: string;
    /** The connected Cloud Object Storage instance CRN. */
    instance_crn?: string;
  }

  /**
   * A page reference.
   */
  export interface PageHRefFirst {
    /** The URL for the first page. */
    href: string;
  }

  /**
   * A page reference.
   */
  export interface PageHRefNext {
    /** The URL for the next page. */
    href: string;
    /** The token of the next page, when it's present. */
    start?: string;
  }

  /**
   * The details of a parameter used during an assessment.
   */
  export interface Parameter {
    /** The type of evaluation. */
    assessment_type?: string;
    /** The ID of the assessment. */
    assessment_id?: string;
    /** The parameter name. */
    parameter_name?: string;
    /** The parameter display name. */
    parameter_display_name?: string;
    /** The parameter type. */
    parameter_type?: string;
    /** The value can be of any type. */
    parameter_value?: any;
  }

  /**
   * A group of controls that are related to a compliance objective.
   */
  export interface Profile {
    /** The ID of the profile. */
    id?: string;
    /** The name of the profile. */
    profile_name?: string;
    /** The ID of the Security and Compliance Center instance who owns the profile. */
    instance_id?: string;
    /** Determines if the profile can be set to a hierarchy. */
    hierarchy_enabled?: boolean;
    /** A description of what the profile should represent. */
    profile_description?: string;
    /** The type of profile, either predefined or custom. */
    profile_type: Profile.Constants.ProfileType | string;
    /** The version of the profile. */
    profile_version?: string;
    /** The unique identifier of the revision. */
    version_group_label?: string;
    /** Determines if the profile is up to date with the latest revisions. */
    latest?: boolean;
    /** User who created the profile. */
    created_by?: string;
    /** The date when the profile was created, in date-time format. */
    created_on?: string;
    /** User who made the latest changes to the profile. */
    updated_by?: string;
    /** The date when the profile was last updated, in date-time format. */
    updated_on?: string;
    /** The number of controls contained in the profile. */
    controls_count?: number;
    /** The number of attachments associated with the profile. */
    attachments_count?: number;
    /** The list of controls. */
    controls: ProfileControls[];
    /** The default parameters of the profile. */
    default_parameters: DefaultParameters[];
  }
  export namespace Profile {
    export namespace Constants {
      /** The type of profile, either predefined or custom. */
      export enum ProfileType {
        CUSTOM = 'custom',
        PREDEFINED = 'predefined',
      }
    }
  }

  /**
   * The configuration set when starting a scan against a profile.
   */
  export interface ProfileAttachment {
    /** The parameters associated with the profile attachment. */
    attachment_parameters: Parameter[];
    /** The details to describe the profile attachment. */
    description: string;
    /** The name of the Profile Attachment. */
    name: string;
    /** The notification configuration of the attachment. */
    notifications: AttachmentNotifications;
    /** Details how often a scan from a profile attachment is ran. */
    schedule: ProfileAttachment.Constants.Schedule | string;
    /** A list of scopes associated with a profile attachment. */
    scope: MultiCloudScopePayload[];
    /** Details the state of a profile attachment. */
    status: ProfileAttachment.Constants.Status | string;
    /** Date range. */
    data_selection_range?: DateRange;
    /** The ID of the account. */
    account_id?: string;
    /** User who created the profile attachment. */
    created_by?: string;
    /** The date-time that the profile attachment was created. */
    created_on?: string;
    /** The ID of the profile attachment. */
    id?: string;
    /** The ID of the associated Security and Compliance Center instance. */
    instance_id?: string;
    /** The last scan performed on a profile attachment. */
    last_scan?: LastScan;
    /** The date-time for next scan. */
    next_scan_time?: string;
    /** The ID of the profile. */
    profile_id?: string;
    /** User who made the latest changes to the profile attachment. */
    updated_by?: string;
    /** The date when the profile was last updated, in date-time format. */
    updated_on?: string;
  }
  export namespace ProfileAttachment {
    export namespace Constants {
      /** Details how often a scan from a profile attachment is ran. */
      export enum Schedule {
        DAILY = 'daily',
        EVERY_7_DAYS = 'every_7_days',
        EVERY_30_DAYS = 'every_30_days',
      }
      /** Details the state of a profile attachment. */
      export enum Status {
        ENABLED = 'enabled',
        DISABLED = 'disabled',
      }
    }
  }

  /**
   * The prototype for creating a Profile attachment.
   */
  export interface ProfileAttachmentBase {
    /** The parameters associated with the profile attachment. */
    attachment_parameters: Parameter[];
    /** The details to describe the profile attachment. */
    description: string;
    /** The name of the Profile Attachment. */
    name: string;
    /** The notification configuration of the attachment. */
    notifications: AttachmentNotifications;
    /** Details how often a scan from a profile attachment is ran. */
    schedule: ProfileAttachmentBase.Constants.Schedule | string;
    /** A list of scopes associated with a profile attachment. */
    scope: MultiCloudScopePayload[];
    /** Details the state of a profile attachment. */
    status: ProfileAttachmentBase.Constants.Status | string;
    /** Date range. */
    data_selection_range?: DateRange;
  }
  export namespace ProfileAttachmentBase {
    export namespace Constants {
      /** Details how often a scan from a profile attachment is ran. */
      export enum Schedule {
        DAILY = 'daily',
        EVERY_7_DAYS = 'every_7_days',
        EVERY_30_DAYS = 'every_30_days',
      }
      /** Details the state of a profile attachment. */
      export enum Status {
        ENABLED = 'enabled',
        DISABLED = 'disabled',
      }
    }
  }

  /**
   * A list of ProfileAttachment tied to a profile or instance.
   */
  export interface ProfileAttachmentCollection {
    /** The requested page limit. */
    limit: number;
    /** The total number of resources that are in the collection. */
    total_count: number;
    /** A page reference. */
    first?: PageHRefFirst;
    /** A page reference. */
    next?: PageHRefNext;
    /** List of attachments. */
    attachments: ProfileAttachment[];
  }

  /**
   * ProfileAttachmentResponse.
   */
  export interface ProfileAttachmentResponse {
    /** The ID of the profile. */
    profile_id?: string;
    /** List of profile attachments associated with profile. */
    attachments: ProfileAttachment[];
  }

  /**
   * A list of Profiles.
   */
  export interface ProfileCollection {
    /** The requested page limit. */
    limit: number;
    /** The total number of resources that are in the collection. */
    total_count: number;
    /** A page reference. */
    first?: PageHRefFirst;
    /** A page reference. */
    next?: PageHRefNext;
    /** A list of profiles associated with the scope. */
    profiles: Profile[];
  }

  /**
   * The control details for a profile.
   */
  export interface ProfileControls {
    /** Determines if the control needs to pass during evaluation. */
    control_requirement?: boolean;
    /** The ID of the control library that contains a profile. */
    control_library_id?: string;
    /** The control ID. */
    control_id?: string;
    /** The control library version. */
    control_library_version?: string;
    /** The control name. */
    control_name?: string;
    /** The control description. */
    control_description?: string;
    /** The control severity. */
    control_severity?: string;
    /** The control category. */
    control_category?: string;
    /** The control parent. */
    control_parent?: string;
    /** References to a control documentation. */
    control_docs?: ControlDoc;
    /** List of control specifications in a profile. */
    control_specifications: ControlSpecification[];
  }

  /**
   * The control details of a profile.
   */
  export interface ProfileControlsPrototype {
    /** The ID of the control library that contains the profile. */
    control_library_id?: string;
    /** The control ID. */
    control_id?: string;
  }

  /**
   * The default parameters of a profile.
   */
  export interface ProfileDefaultParametersResponse {
    /** The ID of the Profile. */
    id?: string;
    /** list of parameters given by default. */
    default_parameters: DefaultParameters[];
  }

  /**
   * The profile information.
   */
  export interface ProfileInfo {
    /** The profile ID. */
    id?: string;
    /** The profile name. */
    name?: string;
    /** The profile version. */
    version?: string;
  }

  /**
   * The provider type item.
   */
  export interface ProviderType {
    /** The unique identifier of the provider type. */
    id: string;
    /** The type of the provider type. */
    type: string;
    /** The name of the provider type. */
    name: string;
    /** The provider type description. */
    description: string;
    /** A boolean that indicates whether the provider type is s2s-enabled. */
    s2s_enabled: boolean;
    /** The maximum number of instances that can be created for the provider type. */
    instance_limit: number;
    /** The mode that is used to get results from provider (`PUSH` or `PULL`). */
    mode: string;
    /** The format of the results that a provider supports. */
    data_type: string;
    /** The icon of a provider in .svg format that is encoded as a base64 string. */
    icon: string;
    /** The label that is associated with the provider type. */
    label?: LabelType;
    /** The attributes that are required when you're creating an instance of a provider type. The attributes field
     *  can have multiple  keys in its value. Each of those keys has a value  object that includes the type, and display
     *  name as keys. For example, `{type:"", display_name:""}`.
     *  **NOTE;** If the provider type is s2s-enabled, which means that if the `s2s_enabled` field is set to `true`,
     *  then a CRN field of type text is required in the attributes value object.
     */
    attributes: JsonObject;
    /** Time at which resource was created. */
    created_at?: string;
    /** Time at which resource was updated. */
    updated_at?: string;
  }

  /**
   * The provider types collection.
   */
  export interface ProviderTypeCollection {
    /** The array of provder type. */
    provider_types?: ProviderType[];
  }

  /**
   * A provider type instance.
   */
  export interface ProviderTypeInstance {
    /** The unique identifier of the provider type instance. */
    id?: string;
    /** The type of the provider type. */
    type?: string;
    /** The name of the provider type instance. */
    name?: string;
    /** The attributes for connecting to the provider type instance. */
    attributes?: JsonObject;
    /** Time at which resource was created. */
    created_at?: string;
    /** Time at which resource was updated. */
    updated_at?: string;
  }

  /**
   * Provider types instances response.
   */
  export interface ProviderTypeInstanceCollection {
    /** The array of instances for all provider types. */
    provider_type_instances?: ProviderTypeInstance[];
  }

  /**
   * The report.
   */
  export interface Report {
    /** The ID of the report. */
    id: string;
    /** The type of the scan. */
    type: string;
    /** The group ID that is associated with the report. The group ID combines profile, scope, and attachment IDs. */
    group_id: string;
    /** The date when the report was created. */
    created_on: string;
    /** The date when the scan was run. */
    scan_time: string;
    /** The Cloud Object Storage object that is associated with the report. */
    cos_object: string;
    /** The ID of the Security and Compliance Center instance. */
    instance_id: string;
    /** The account that is associated with a report. */
    account: Account;
    /** The profile information. */
    profile: ProfileInfo;
    /** The scope ID that is associated with a report. Attributes for this object will be blank if the report has
     *  multiple scopes tied to the report.
     */
    scope: ScopeID;
    /** The attachment that is associated with a report. */
    attachment: Attachment;
    /** The compliance stats. */
    controls_summary: ComplianceStatsWithNonCompliant;
    /** The evaluation stats. */
    evaluations_summary: EvalStats;
    /** The collection of different types of tags. */
    tags: Tags;
    /** The scopes used in the report. */
    scopes: ReportScope[];
    /** Extended information for a report. */
    additional_details: AdditionalDetails;
  }

  /**
   * The page of reports.
   */
  export interface ReportCollection {
    /** The requested page limit. */
    limit: number;
    /** The total number of resources that are in the collection. */
    total_count: number;
    /** A page reference. */
    first?: PageHRefFirst;
    /** A page reference. */
    next?: PageHRefNext;
    /** The ID of the home account. */
    home_account_id?: string;
    /** The list of reports that are on the page. */
    reports?: Report[];
  }

  /**
   * The list of controls.
   */
  export interface ReportControls {
    /** The ID of the report. */
    report_id?: string;
    /** The ID of the home account. */
    home_account_id?: string;
    /** The list of controls that are in the report. */
    controls?: ControlWithStats[];
  }

  /**
   * The response body of the `get_latest_reports` operation.
   */
  export interface ReportLatest {
    /** The ID of the home account. */
    home_account_id?: string;
    /** The compliance stats. */
    controls_summary?: ComplianceStats;
    /** The evaluation stats. */
    evaluations_summary?: EvalStats;
    /** The compliance score. */
    score?: ComplianceScore;
    /** The list of reports. */
    reports?: Report[];
  }

  /**
   * The scopes used in the report.
   */
  export interface ReportScope {
    /** The ID of the scope used. */
    id: string;
    /** The name of the scope used. */
    name: string;
    /** The url to a report concerning the specified scope. */
    href: string;
    /** The cloud provider that the scope is targeting. */
    environment?: string;
  }

  /**
   * The report summary.
   */
  export interface ReportSummary {
    /** The ID of the report. */
    report_id?: string;
    /** Instance ID. */
    instance_id?: string;
    /** The account that is associated with a report. */
    account?: Account;
    /** The compliance score. */
    score?: ComplianceScore;
    /** The evaluation stats. */
    evaluations?: EvalStats;
    /** The compliance stats. */
    controls?: ComplianceStats;
    /** The resource summary. */
    resources?: ResourceSummary;
  }

  /**
   * The response body of the `get_tags` operation.
   */
  export interface ReportTags {
    /** The ID of the report. */
    report_id?: string;
    /** The collection of different types of tags. */
    tags?: Tags;
  }

  /**
   * The report violation data point.
   */
  export interface ReportViolationDataPoint {
    /** The ID of the report. */
    report_id?: string;
    /** The group ID that is associated with the report. The group ID combines profile, scope, and attachment IDs. */
    report_group_id?: string;
    /** The date when the scan was run. */
    scan_time?: string;
    /** The compliance stats. */
    controls_summary?: ComplianceStats;
  }

  /**
   * The response body of the `get_report_violations_drift` operation.
   */
  export interface ReportViolationsDrift {
    /** The ID of the home account. */
    home_account_id?: string;
    /** The ID of the report group. */
    report_group_id?: string;
    /** The list of report violations data points. */
    data_points?: ReportViolationDataPoint[];
  }

  /**
   * The required configurations for a Rule.
   */
  export interface RequiredConfig {
  }

  /**
   * The resource.
   */
  export interface Resource {
    /** The ID of the report. */
    report_id?: string;
    /** The ID of the home account. */
    home_account_id?: string;
    /** The resource CRN. */
    id?: string;
    /** The resource name. */
    resource_name?: string;
    /** The account that is associated with a report. */
    account?: Account;
    /** The ID of the component. */
    component_id?: string;
    /** The name of the component. */
    component_name?: string;
    /** The environment. */
    environment?: string;
    /** The collection of different types of tags. */
    tags?: Tags;
    /** The allowed values of an aggregated status for controls, specifications, assessments, and resources. */
    status: Resource.Constants.Status | string;
    /** The total number of evaluations. */
    total_count?: number;
    /** The number of passed evaluations. */
    pass_count?: number;
    /** The number of failed evaluations. */
    failure_count?: number;
    /** The number of evaluations that started, but did not finish, and ended with errors. */
    error_count?: number;
    /** The number of assessments with no corresponding evaluations. */
    skipped_count?: number;
    /** The total number of completed evaluations. */
    completed_count?: number;
    /** The name of the service. */
    service_name?: string;
    /** The instance CRN. */
    instance_crn?: string;
  }
  export namespace Resource {
    export namespace Constants {
      /** The allowed values of an aggregated status for controls, specifications, assessments, and resources. */
      export enum Status {
        COMPLIANT = 'compliant',
        NOT_COMPLIANT = 'not_compliant',
        UNABLE_TO_PERFORM = 'unable_to_perform',
        USER_EVALUATION_REQUIRED = 'user_evaluation_required',
        NOT_APPLICABLE = 'not_applicable',
      }
    }
  }

  /**
   * The page of resource evaluation summaries.
   */
  export interface ResourcePage {
    /** The requested page limit. */
    limit: number;
    /** The total number of resources that are in the collection. */
    total_count: number;
    /** A page reference. */
    first?: PageHRefFirst;
    /** A page reference. */
    next?: PageHRefNext;
    /** The ID of the report. */
    report_id?: string;
    /** The ID of the home account. */
    home_account_id?: string;
    /** The list of resource evaluation summaries that are on the page. */
    resources?: Resource[];
  }

  /**
   * The resource summary.
   */
  export interface ResourceSummary {
    /** The allowed values of an aggregated status for controls, specifications, assessments, and resources. */
    status: ResourceSummary.Constants.Status | string;
    /** The total number of checks. */
    total_count?: number;
    /** The number of compliant checks. */
    compliant_count?: number;
    /** The number of checks that are not compliant. */
    not_compliant_count?: number;
    /** The number of checks that are unable to perform. */
    unable_to_perform_count?: number;
    /** The number of checks that require a user evaluation. */
    user_evaluation_required_count?: number;
    /** The number of not applicable (with no evaluations) checks. */
    not_applicable_count?: number;
    /** The top 10 resources that have the most failures. */
    top_failed?: ResourceSummaryItem[];
  }
  export namespace ResourceSummary {
    export namespace Constants {
      /** The allowed values of an aggregated status for controls, specifications, assessments, and resources. */
      export enum Status {
        COMPLIANT = 'compliant',
        NOT_COMPLIANT = 'not_compliant',
        UNABLE_TO_PERFORM = 'unable_to_perform',
        USER_EVALUATION_REQUIRED = 'user_evaluation_required',
        NOT_APPLICABLE = 'not_applicable',
      }
    }
  }

  /**
   * The resource summary item.
   */
  export interface ResourceSummaryItem {
    /** The resource ID. */
    id?: string;
    /** The resource name. */
    name?: string;
    /** The account that owns the resource. */
    account?: string;
    /** The service that is managing the resource. */
    service?: string;
    /** The services display name that is managing the resource. */
    service_display_name?: string;
    /** The collection of different types of tags. */
    tags?: Tags;
    /** The allowed values of an aggregated status for controls, specifications, assessments, and resources. */
    status: ResourceSummaryItem.Constants.Status | string;
    /** The total number of evaluations. */
    total_count?: number;
    /** The number of passed evaluations. */
    pass_count?: number;
    /** The number of failed evaluations. */
    failure_count?: number;
    /** The number of evaluations that started, but did not finish, and ended with errors. */
    error_count?: number;
    /** The number of assessments with no corresponding evaluations. */
    skipped_count?: number;
    /** The total number of completed evaluations. */
    completed_count?: number;
  }
  export namespace ResourceSummaryItem {
    export namespace Constants {
      /** The allowed values of an aggregated status for controls, specifications, assessments, and resources. */
      export enum Status {
        COMPLIANT = 'compliant',
        NOT_COMPLIANT = 'not_compliant',
        UNABLE_TO_PERFORM = 'unable_to_perform',
        USER_EVALUATION_REQUIRED = 'user_evaluation_required',
        NOT_APPLICABLE = 'not_applicable',
      }
    }
  }

  /**
   * The rule response that corresponds to an account instance.
   */
  export interface Rule {
    /** The date when the rule was created. */
    created_on: string;
    /** The user who created the rule. */
    created_by: string;
    /** The date when the rule was modified. */
    updated_on: string;
    /** The user who modified the rule. */
    updated_by: string;
    /** The rule ID. */
    id: string;
    /** The account ID. */
    account_id: string;
    /** The details of a rule's response. */
    description: string;
    /** The rule type (allowable values are `user_defined` or `system_defined`). */
    type: Rule.Constants.Type | string;
    /** The version number of a rule. */
    version: string;
    /** The collection of import parameters. */
    import?: Import;
    /** The rule target. */
    target: RuleTarget;
    /** The required configurations for a Rule. */
    required_config: RequiredConfig;
    /** The list of labels. */
    labels: string[];
  }
  export namespace Rule {
    export namespace Constants {
      /** The rule type (allowable values are `user_defined` or `system_defined`). */
      export enum Type {
        USER_DEFINED = 'user_defined',
        SYSTEM_DEFINED = 'system_defined',
      }
    }
  }

  /**
   * The page of rules.
   */
  export interface RuleCollection {
    /** The requested page limit. */
    limit: number;
    /** The total number of resources that are in the collection. */
    total_count: number;
    /** A page reference. */
    first?: PageHRefFirst;
    /** A page reference. */
    next?: PageHRefNext;
    /** The collection of rules that correspond to an account instance. Maximum of 100/500 custom rules per
     *  stand-alone/enterprise account.
     */
    rules?: Rule[];
  }

  /**
   * The rule.
   */
  export interface RuleInfo {
    /** The rule ID. */
    id?: string;
    /** The rule type. */
    type?: string;
    /** The rule description. */
    description?: string;
    /** The rule version. */
    version?: string;
    /** The rule account ID. */
    account_id?: string;
    /** The date when the rule was created. */
    created_on?: string;
    /** The ID of the user who created the rule. */
    created_by?: string;
    /** The date when the rule was updated. */
    updated_on?: string;
    /** The ID of the user who updated the rule. */
    updated_by?: string;
    /** The rule labels. */
    labels?: string[];
  }

  /**
   * The rule import parameter.
   */
  export interface RuleParameter {
    /** The import parameter name. */
    name?: string;
    /** The display name of the property. */
    display_name?: string;
    /** The propery description. */
    description?: string;
    /** The property type. */
    type: RuleParameter.Constants.Type | string;
  }
  export namespace RuleParameter {
    export namespace Constants {
      /** The property type. */
      export enum Type {
        STRING = 'string',
        NUMERIC = 'numeric',
        GENERAL = 'general',
        BOOLEAN = 'boolean',
        STRING_LIST = 'string_list',
        IP_LIST = 'ip_list',
        TIMESTAMP = 'timestamp',
      }
    }
  }

  /**
   * The supported config property.
   */
  export interface RuleProperty {
    /** The property name. */
    name?: string;
    /** The property description. */
    description?: string;
    /** The operator kind used when evaluating a property. */
    type: RuleProperty.Constants.Type | string;
  }
  export namespace RuleProperty {
    export namespace Constants {
      /** The operator kind used when evaluating a property. */
      export enum Type {
        STRING = 'string',
        NUMERIC = 'numeric',
        GENERAL = 'general',
        BOOLEAN = 'boolean',
        STRING_LIST = 'string_list',
        IP_LIST = 'ip_list',
        TIMESTAMP = 'timestamp',
      }
    }
  }

  /**
   * The rule target.
   */
  export interface RuleTarget {
    /** The target service name. */
    service_name: string;
    /** The display name of the target service. */
    service_display_name?: string;
    /** The target resource kind. */
    resource_kind: string;
    /** The additional target attributes used to filter to a subset of resources. */
    additional_target_attributes?: AdditionalTargetAttribute[];
    /** The name of target when used in a rule. */
    ref?: string;
  }

  /**
   * The rule target.
   */
  export interface RuleTargetPrototype {
    /** The target service name. */
    service_name: string;
    /** The target resource kind. */
    resource_kind: string;
    /** The additional target attributes used to filter to a subset of resources. */
    additional_target_attributes?: AdditionalTargetAttribute[];
  }

  /**
   * A report detailing the evaluations related to a specific control.
   */
  export interface ScanReport {
    /** The ID of the scan report. */
    id?: string;
    /** The ID of the scan. */
    scan_id?: string;
    /** The ID of the Security and Compliance Center instance. */
    instance_id?: string;
    /** The ID of the scope. */
    scope_id?: string;
    /** The ID of the sub-scope. */
    subscope_id?: string;
    /** The enum of different scan report status. */
    status: ScanReport.Constants.Status | string;
    /** The date when the report was created. */
    created_on?: string;
    /** The file type of the report. */
    format: ScanReport.Constants.Format | string;
    /** The URL of the scan report. */
    href?: string;
  }
  export namespace ScanReport {
    export namespace Constants {
      /** The enum of different scan report status. */
      export enum Status {
        PENDING = 'pending',
        IN_PROGRESS = 'in_progress',
        ERROR = 'error',
        COMPLETED = 'completed',
        DELETED = 'deleted',
      }
      /** The file type of the report. */
      export enum Format {
        CSV = 'csv',
        PDF = 'pdf',
      }
    }
  }

  /**
   * The page of scan reports.
   */
  export interface ScanReportCollection {
    /** The requested page limit. */
    limit: number;
    /** The total number of resources that are in the collection. */
    total_count: number;
    /** A page reference. */
    first?: PageHRefFirst;
    /** A page reference. */
    next?: PageHRefNext;
    /** The id of the requested scope. */
    scope_id?: string;
    /** The id of the requested subscope. */
    subscope_id?: string;
    /** The list of scan reports. */
    scan_reports?: ScanReport[];
  }

  /**
   * The group of resources that you want to evaluate. In the new API-based architecture, a scope can be an Enterprise,
   * Account group, Account, or Resource group.
   */
  export interface Scope {
    /** The ID of the scope. */
    id: string;
    /** The scope name. */
    name: string;
    /** The scope description. */
    description: string;
    /** The scope environment. This value details what cloud provider the scope targets. */
    environment: string;
    /** The properties that are supported for scoping by this environment. */
    properties: ScopeProperty[];
    /** The ID of the account associated with the scope. */
    account_id: string;
    /** The ID of the instance associated with the scope. */
    instance_id: string;
    /** The identifier of the account or service ID who created the scope. */
    created_by: string;
    /** The date when the scope was created. */
    created_on: string;
    /** The ID of the user or service ID who updated the scope. */
    updated_by: string;
    /** The date when the scope was updated. */
    updated_on: string;
    /** The number of attachments tied to the scope. */
    attachment_count: number;
  }

  /**
   * A list of scopes.
   */
  export interface ScopeCollection {
    /** The requested page limit. */
    limit: number;
    /** The total number of resources that are in the collection. */
    total_count: number;
    /** A page reference. */
    first?: PageHRefFirst;
    /** A page reference. */
    next?: PageHRefNext;
    /** The array of scopes. */
    scopes: Scope[];
  }

  /**
   * The scope ID that is associated with a report. Attributes for this object will be blank if the report has multiple
   * scopes tied to the report.
   */
  export interface ScopeID {
    /** The scope ID. */
    id?: string;
    /** The scope type. */
    type?: string;
  }

  /**
   * ScopeProperty.
   */
  export interface ScopeProperty {
  }

  /**
   * Any exclusion to be defined in the scope.
   */
  export interface ScopePropertyExclusionItem {
    scope_id?: string;
    /** The type of scope it targets
     *
     *  The scope values are as followed:
     *  - enterprise: The scope targets an enterprise account
     *  - enterprise.account_group: The scope targets an account group within an enterprise
     *  - enterprise.account: The scope targets an account within an enterprise
     *  - account: The scope targets an account not tied to an enterprise
     *  - account.resource_group: The scope targets a resource group within an account.
     */
    scope_type: ScopePropertyExclusionItem.Constants.ScopeType | string;
  }
  export namespace ScopePropertyExclusionItem {
    export namespace Constants {
      /** The type of scope it targets The scope values are as followed: - enterprise: The scope targets an enterprise account - enterprise.account_group: The scope targets an account group within an enterprise - enterprise.account: The scope targets an account within an enterprise - account: The scope targets an account not tied to an enterprise - account.resource_group: The scope targets a resource group within an account. */
      export enum ScopeType {
        ENTERPRISE = 'enterprise',
        ENTERPRISE_ACCOUNT_GROUP = 'enterprise.account_group',
        ENTERPRISE_ACCOUNT = 'enterprise.account',
        ACCOUNT = 'account',
        ACCOUNT_RESOURCE_GROUP = 'account.resource_group',
      }
    }
  }

  /**
   * The request body to make a Scope.
   */
  export interface ScopePrototype {
    /** The scope name. */
    name?: string;
    /** The scope description. */
    description?: string;
    /** The scope environment. */
    environment?: string;
    /** The properties that are supported for scoping by this environment. */
    properties?: ScopeProperty[];
  }

  /**
   * The response body for creating a service instance.
   */
  export interface Service {
    /** The service creation date. */
    created_on: string;
    /** The service author. */
    created_by: string;
    /** The date when the service was modified. */
    updated_on: string;
    /** The user who modified the service. */
    updated_by: string;
    /** The service name. */
    service_name: string;
    /** The display name of the service. */
    service_display_name?: string;
    /** The service description. */
    description: string;
    /** The indication of whether monitoring is enabled. */
    monitoring_enabled: boolean;
    /** The indication of whether enforcement is enabled. */
    enforcement_enabled: boolean;
    /** The indication of whether service listing is enabled. */
    service_listing_enabled: boolean;
    /** The service configuration information. */
    config_information_point: ConfigurationInformationPoints;
    /** The supported configurations. */
    supported_configs: SupportedConfigs[];
  }

  /**
   * The services.
   */
  export interface ServiceCollection {
    /** The list of services. */
    services?: Service[];
  }

  /**
   * The settings.
   */
  export interface Settings {
    /** The Event Notifications settings. */
    event_notifications?: EventNotifications;
    /** The Cloud Object Storage settings. */
    object_storage?: ObjectStorage;
  }

  /**
   * A rule within a rule used in the requiredConfig.
   */
  export interface SubRule {
    /** The rule target. */
    target?: RuleTarget;
    /** The required configurations for a Rule. */
    required_config?: RequiredConfig;
  }

  /**
   * A segment of a scope. Subscopes are used to ensure that the members of your teams who review results only have
   * access to the information regarding the instances that they have access to.
   */
  export interface SubScope {
    /** The Subscope ID. */
    id?: string;
    /** The name of the Subscope. */
    name?: string;
    /** Text to describe the Subscope. */
    description?: string;
    /** The virtual space where applications can be deployed and managed. */
    environment?: string;
    /** Additional attributes that are supported for scoping by this environment. */
    properties: ScopeProperty[];
  }

  /**
   * The response body of the subscopes.
   */
  export interface SubScopeCollection {
    /** The requested page limit. */
    limit: number;
    /** The total number of resources that are in the collection. */
    total_count: number;
    /** A page reference. */
    first?: PageHRefFirst;
    /** A page reference. */
    next?: PageHRefNext;
    /** The array of subscopes. */
    subscopes: SubScope[];
  }

  /**
   * The response body of the subscope.
   */
  export interface SubScopeResponse {
    /** The array of subscopes. */
    subscopes: SubScope[];
  }

  /**
   * The location information of supported configurations.
   */
  export interface SupportedConfigs {
    /** The supported config resource kind. */
    resource_kind?: string;
    /** The supported config list of additional target attributes. */
    additional_target_attributes?: AdditionalTargetAttribute[];
    /** The supported config list properties. */
    properties?: RuleProperty[];
    /** The supported config description. */
    description?: string;
    /** The indication of whether the configuration information point (CIP) requires a service instance. */
    cip_requires_service_instance?: boolean;
    /** The supported config resource group support. */
    resource_group_support?: boolean;
    /** The supported config tagging support. */
    tagging_support?: boolean;
    /** The supported config inherited tags. */
    inherit_tags?: boolean;
  }

  /**
   * The collection of different types of tags.
   */
  export interface Tags {
    /** The collection of user tags. */
    user?: string[];
    /** The collection of access tags. */
    access?: string[];
    /** The collection of service tags. */
    service?: string[];
  }

  /**
   * The details of the target account.
   */
  export interface Target {
    /** The UUID of the target. */
    id: string;
    /** The target account ID. */
    account_id: string;
    /** The trusted profile ID. */
    trusted_profile_id: string;
    /** The target name. */
    name: string;
    /** List of credentials. */
    credentials: CredentialResponse[];
    /** The user ID who created the target. */
    created_by?: string;
    /** The time when the target was created. */
    created_on?: string;
    /** The user ID who updated the target. */
    updated_by?: string;
    /** The time when the target was updated. */
    updated_on?: string;
  }

  /**
   * The target list collection.
   */
  export interface TargetCollection {
    /** The requested page limit. */
    limit: number;
    /** The total number of resources that are in the collection. */
    total_count: number;
    /** A page reference. */
    first?: PageHRefFirst;
    /** A page reference. */
    next?: PageHRefNext;
    /** The details of the target account. */
    targets: Target[];
  }

  /**
   * The evaluation target.
   */
  export interface TargetInfo {
    /** The target ID. */
    id?: string;
    /** The target account ID. */
    account_id?: string;
    /** The target service name. */
    service_name?: string;
    /** The target service display name. */
    service_display_name?: string;
    /** The target resource CRN. */
    resource_crn?: string;
    /** The target resource name. */
    resource_name?: string;
    /** The collection of different types of tags. */
    tags?: Tags;
  }

  /**
   * The details of a test event response.
   */
  export interface TestEvent {
    /** The indication of whether the event was received by Event Notifications. */
    success: boolean;
  }

  /**
   * The required configuration base object.
   */
  export interface ConditionItemConditionBase extends ConditionItem {
    /** The required config description. */
    description?: string;
    /** The property. */
    property: string;
    /** The operator. */
    operator: ConditionItemConditionBase.Constants.Operator | string;
    /** The value can be of any type. */
    value?: any;
  }
  export namespace ConditionItemConditionBase {
    export namespace Constants {
      /** The operator. */
      export enum Operator {
        STRING_EQUALS = 'string_equals',
        STRING_NOT_EQUALS = 'string_not_equals',
        STRING_MATCH = 'string_match',
        STRING_NOT_MATCH = 'string_not_match',
        STRING_CONTAINS = 'string_contains',
        STRING_NOT_CONTAINS = 'string_not_contains',
        NUM_EQUALS = 'num_equals',
        NUM_NOT_EQUALS = 'num_not_equals',
        NUM_LESS_THAN = 'num_less_than',
        NUM_LESS_THAN_EQUALS = 'num_less_than_equals',
        NUM_GREATER_THAN = 'num_greater_than',
        NUM_GREATER_THAN_EQUALS = 'num_greater_than_equals',
        IS_EMPTY = 'is_empty',
        IS_NOT_EMPTY = 'is_not_empty',
        IS_TRUE = 'is_true',
        IS_FALSE = 'is_false',
        STRINGS_IN_LIST = 'strings_in_list',
        STRINGS_ALLOWED = 'strings_allowed',
        STRINGS_REQUIRED = 'strings_required',
        IPS_IN_RANGE = 'ips_in_range',
        IPS_EQUALS = 'ips_equals',
        IPS_NOT_EQUALS = 'ips_not_equals',
        DAYS_LESS_THAN = 'days_less_than',
      }
    }
  }

  /**
   * A list of required configurations.
   */
  export interface ConditionItemConditionList extends ConditionItem {
  }

  /**
   * ConditionItemConditionSubRule.
   */
  export interface ConditionItemConditionSubRule extends ConditionItem {
  }

  /**
   * The payload to reference a previously made scope object.
   */
  export interface MultiCloudScopePayloadById extends MultiCloudScopePayload {
    /** The UUID of the scope made. */
    id?: string;
  }

  /**
   * The payload to create a new Scope from a Profile Attachment.
   */
  export interface MultiCloudScopePayloadByProperties extends MultiCloudScopePayload {
    /** The details of a newly created scope. */
    description?: string;
    /** The environment that relates to this scope. */
    environment?: string;
    /** The properties supported for scoping by this environment. */
    properties: ScopeProperty[];
  }

  /**
   * The required configuration base object.
   */
  export interface RequiredConfigConditionBase extends RequiredConfig {
    /** The required config description. */
    description?: string;
    /** The property. */
    property: string;
    /** The operator. */
    operator: RequiredConfigConditionBase.Constants.Operator | string;
    /** The value can be of any type. */
    value?: any;
  }
  export namespace RequiredConfigConditionBase {
    export namespace Constants {
      /** The operator. */
      export enum Operator {
        STRING_EQUALS = 'string_equals',
        STRING_NOT_EQUALS = 'string_not_equals',
        STRING_MATCH = 'string_match',
        STRING_NOT_MATCH = 'string_not_match',
        STRING_CONTAINS = 'string_contains',
        STRING_NOT_CONTAINS = 'string_not_contains',
        NUM_EQUALS = 'num_equals',
        NUM_NOT_EQUALS = 'num_not_equals',
        NUM_LESS_THAN = 'num_less_than',
        NUM_LESS_THAN_EQUALS = 'num_less_than_equals',
        NUM_GREATER_THAN = 'num_greater_than',
        NUM_GREATER_THAN_EQUALS = 'num_greater_than_equals',
        IS_EMPTY = 'is_empty',
        IS_NOT_EMPTY = 'is_not_empty',
        IS_TRUE = 'is_true',
        IS_FALSE = 'is_false',
        STRINGS_IN_LIST = 'strings_in_list',
        STRINGS_ALLOWED = 'strings_allowed',
        STRINGS_REQUIRED = 'strings_required',
        IPS_IN_RANGE = 'ips_in_range',
        IPS_EQUALS = 'ips_equals',
        IPS_NOT_EQUALS = 'ips_not_equals',
        DAYS_LESS_THAN = 'days_less_than',
      }
    }
  }

  /**
   * A list of required configurations.
   */
  export interface RequiredConfigConditionList extends RequiredConfig {
  }

  /**
   * RequiredConfigConditionSubRule.
   */
  export interface RequiredConfigConditionSubRule extends RequiredConfig {
  }

  /**
   * Any exclusions or resources that should not be part of the scope. Has to be the same type as the one specified.
   */
  export interface ScopePropertyExclusions extends ScopeProperty {
    /** The key that denotes the user is declaring the exclusions. */
    name: ScopePropertyExclusions.Constants.Name | string;
    value: ScopePropertyExclusionItem[];
  }
  export namespace ScopePropertyExclusions {
    export namespace Constants {
      /** The key that denotes the user is declaring the exclusions. */
      export enum Name {
        EXCLUSIONS = 'exclusions',
      }
    }
  }

  /**
   * Attribute that details what kind of type of scope.
   */
  export interface ScopePropertyScopeAny extends ScopeProperty {
    /** key to say the attribute targets the scope type. */
    name: string;
    /** The value can be a string or a string list. */
    value: any;
  }

  /**
   * The value of the identifier that correlates to scope type. If ScopePropertyScopeType schema uses the value
   * enterprise.account_group, the value should be the identifier or ID of the account_group within the enterprise.
   */
  export interface ScopePropertyScopeId extends ScopeProperty {
    /** The key for the scope property. */
    name: ScopePropertyScopeId.Constants.Name | string;
    /** The identifier for the scope_type specified. */
    value: string;
  }
  export namespace ScopePropertyScopeId {
    export namespace Constants {
      /** The key for the scope property. */
      export enum Name {
        SCOPE_ID = 'scope_id',
      }
    }
  }

  /**
   * Attribute that details what kind of type of scope.
   */
  export interface ScopePropertyScopeType extends ScopeProperty {
    /** key to say the attribute targets the scope type. */
    name: ScopePropertyScopeType.Constants.Name | string;
    /** The type of scope it targets
     *
     *  The scope values are as followed:
     *  - enterprise: The scope targets an enterprise account
     *  - enterprise.account_group: The scope targets an account group within an enterprise
     *  - enterprise.account: The scope targets an account within an enterprise
     *  - account: The scope targets an account not tied to an enterprise
     *  - account.resource_group: The scope targets a resource group within an account.
     */
    value: ScopePropertyScopeType.Constants.Value | string;
  }
  export namespace ScopePropertyScopeType {
    export namespace Constants {
      /** key to say the attribute targets the scope type. */
      export enum Name {
        SCOPE_TYPE = 'scope_type',
      }
      /** The type of scope it targets The scope values are as followed: - enterprise: The scope targets an enterprise account - enterprise.account_group: The scope targets an account group within an enterprise - enterprise.account: The scope targets an account within an enterprise - account: The scope targets an account not tied to an enterprise - account.resource_group: The scope targets a resource group within an account. */
      export enum Value {
        ACCOUNT = 'account',
        ACCOUNT_RESOURCE_GROUP = 'account.resource_group',
        ENTERPRISE = 'enterprise',
        ENTERPRISE_ACCOUNT_GROUP = 'enterprise.account_group',
        ENTERPRISE_ACCOUNT = 'enterprise.account',
      }
    }
  }

  /**
   * ConditionItemConditionListConditionListConditionAnd.
   */
  export interface ConditionItemConditionListConditionListConditionAnd extends ConditionItemConditionList {
    /** The required config description. */
    description?: string;
    /** A list of required configurations where all items should evaluate to true. */
    and?: ConditionItem[];
  }

  /**
   * The `OR` required configurations.
   */
  export interface ConditionItemConditionListConditionListConditionOr extends ConditionItemConditionList {
    /** The required config description. */
    description?: string;
    /** A list of required configurations where one item should evaluate to true. */
    or?: ConditionItem[];
  }

  /**
   * A subrule using the 'all' operator.
   */
  export interface ConditionItemConditionSubRuleConditionSubRuleConditionAll extends ConditionItemConditionSubRule {
    /** A rule within a rule used in the requiredConfig. */
    all?: SubRule;
  }

  /**
   * A subrule using the 'all_ifexists' operator.
   */
  export interface ConditionItemConditionSubRuleConditionSubRuleConditionAllIf extends ConditionItemConditionSubRule {
    /** A rule within a rule used in the requiredConfig. */
    all_ifexists?: SubRule;
  }

  /**
   * A subrule using the 'any' operator.
   */
  export interface ConditionItemConditionSubRuleConditionSubRuleConditionAny extends ConditionItemConditionSubRule {
    /** A rule within a rule used in the requiredConfig. */
    any?: SubRule;
  }

  /**
   * A subrule using the 'any_ifexists' operator.
   */
  export interface ConditionItemConditionSubRuleConditionSubRuleConditionAnyIf extends ConditionItemConditionSubRule {
    /** A rule within a rule used in the requiredConfig. */
    any_ifexists?: SubRule;
  }

  /**
   * RequiredConfigConditionListConditionListConditionAnd.
   */
  export interface RequiredConfigConditionListConditionListConditionAnd extends RequiredConfigConditionList {
    /** The required config description. */
    description?: string;
    /** A list of required configurations where all items should evaluate to true. */
    and?: ConditionItem[];
  }

  /**
   * The `OR` required configurations.
   */
  export interface RequiredConfigConditionListConditionListConditionOr extends RequiredConfigConditionList {
    /** The required config description. */
    description?: string;
    /** A list of required configurations where one item should evaluate to true. */
    or?: ConditionItem[];
  }

  /**
   * A subrule using the 'all' operator.
   */
  export interface RequiredConfigConditionSubRuleConditionSubRuleConditionAll extends RequiredConfigConditionSubRule {
    /** A rule within a rule used in the requiredConfig. */
    all?: SubRule;
  }

  /**
   * A subrule using the 'all_ifexists' operator.
   */
  export interface RequiredConfigConditionSubRuleConditionSubRuleConditionAllIf extends RequiredConfigConditionSubRule {
    /** A rule within a rule used in the requiredConfig. */
    all_ifexists?: SubRule;
  }

  /**
   * A subrule using the 'any' operator.
   */
  export interface RequiredConfigConditionSubRuleConditionSubRuleConditionAny extends RequiredConfigConditionSubRule {
    /** A rule within a rule used in the requiredConfig. */
    any?: SubRule;
  }

  /**
   * A subrule using the 'any_ifexists' operator.
   */
  export interface RequiredConfigConditionSubRuleConditionSubRuleConditionAnyIf extends RequiredConfigConditionSubRule {
    /** A rule within a rule used in the requiredConfig. */
    any_ifexists?: SubRule;
  }

  /*************************
   * pager classes
   ************************/

  /**
   * InstanceAttachmentsPager can be used to simplify the use of listInstanceAttachments().
   */
  export class InstanceAttachmentsPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: SecurityAndComplianceCenterApiV3;

    protected params: SecurityAndComplianceCenterApiV3.ListInstanceAttachmentsParams;

    /**
     * Construct a InstanceAttachmentsPager object.
     *
     * @param {SecurityAndComplianceCenterApiV3}  client - The service client instance used to invoke listInstanceAttachments()
     * @param {Object} params - The parameters to be passed to listInstanceAttachments()
     * @constructor
     * @returns {InstanceAttachmentsPager}
     */
    constructor(client: SecurityAndComplianceCenterApiV3, params: SecurityAndComplianceCenterApiV3.ListInstanceAttachmentsParams) {
      if (params && params.start) {
        throw new Error(`the params.start field should not be set`);
      }

      this._hasNext = true;
      this.pageContext = { next: undefined };
      this.client = client;
      this.params = JSON.parse(JSON.stringify(params || {}));
    }

    /**
     * Returns true if there are potentially more results to be retrieved by invoking getNext().
     * @returns {boolean}
     */
    public hasNext(): boolean {
      return this._hasNext;
    }

    /**
     * Returns the next page of results by invoking listInstanceAttachments().
     * @returns {Promise<SecurityAndComplianceCenterApiV3.ProfileAttachment[]>}
     */
    public async getNext(): Promise<SecurityAndComplianceCenterApiV3.ProfileAttachment[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listInstanceAttachments(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.attachments;
    }

    /**
     * Returns all results by invoking listInstanceAttachments() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<SecurityAndComplianceCenterApiV3.ProfileAttachment[]>}
     */
    public async getAll(): Promise<SecurityAndComplianceCenterApiV3.ProfileAttachment[]> {
      const results: ProfileAttachment[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * ControlLibrariesPager can be used to simplify the use of listControlLibraries().
   */
  export class ControlLibrariesPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: SecurityAndComplianceCenterApiV3;

    protected params: SecurityAndComplianceCenterApiV3.ListControlLibrariesParams;

    /**
     * Construct a ControlLibrariesPager object.
     *
     * @param {SecurityAndComplianceCenterApiV3}  client - The service client instance used to invoke listControlLibraries()
     * @param {Object} params - The parameters to be passed to listControlLibraries()
     * @constructor
     * @returns {ControlLibrariesPager}
     */
    constructor(client: SecurityAndComplianceCenterApiV3, params: SecurityAndComplianceCenterApiV3.ListControlLibrariesParams) {
      if (params && params.start) {
        throw new Error(`the params.start field should not be set`);
      }

      this._hasNext = true;
      this.pageContext = { next: undefined };
      this.client = client;
      this.params = JSON.parse(JSON.stringify(params || {}));
    }

    /**
     * Returns true if there are potentially more results to be retrieved by invoking getNext().
     * @returns {boolean}
     */
    public hasNext(): boolean {
      return this._hasNext;
    }

    /**
     * Returns the next page of results by invoking listControlLibraries().
     * @returns {Promise<SecurityAndComplianceCenterApiV3.ControlLibrary[]>}
     */
    public async getNext(): Promise<SecurityAndComplianceCenterApiV3.ControlLibrary[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listControlLibraries(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.control_libraries;
    }

    /**
     * Returns all results by invoking listControlLibraries() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<SecurityAndComplianceCenterApiV3.ControlLibrary[]>}
     */
    public async getAll(): Promise<SecurityAndComplianceCenterApiV3.ControlLibrary[]> {
      const results: ControlLibrary[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * ProfilesPager can be used to simplify the use of listProfiles().
   */
  export class ProfilesPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: SecurityAndComplianceCenterApiV3;

    protected params: SecurityAndComplianceCenterApiV3.ListProfilesParams;

    /**
     * Construct a ProfilesPager object.
     *
     * @param {SecurityAndComplianceCenterApiV3}  client - The service client instance used to invoke listProfiles()
     * @param {Object} params - The parameters to be passed to listProfiles()
     * @constructor
     * @returns {ProfilesPager}
     */
    constructor(client: SecurityAndComplianceCenterApiV3, params: SecurityAndComplianceCenterApiV3.ListProfilesParams) {
      if (params && params.start) {
        throw new Error(`the params.start field should not be set`);
      }

      this._hasNext = true;
      this.pageContext = { next: undefined };
      this.client = client;
      this.params = JSON.parse(JSON.stringify(params || {}));
    }

    /**
     * Returns true if there are potentially more results to be retrieved by invoking getNext().
     * @returns {boolean}
     */
    public hasNext(): boolean {
      return this._hasNext;
    }

    /**
     * Returns the next page of results by invoking listProfiles().
     * @returns {Promise<SecurityAndComplianceCenterApiV3.Profile[]>}
     */
    public async getNext(): Promise<SecurityAndComplianceCenterApiV3.Profile[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listProfiles(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.profiles;
    }

    /**
     * Returns all results by invoking listProfiles() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<SecurityAndComplianceCenterApiV3.Profile[]>}
     */
    public async getAll(): Promise<SecurityAndComplianceCenterApiV3.Profile[]> {
      const results: Profile[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * ScopesPager can be used to simplify the use of listScopes().
   */
  export class ScopesPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: SecurityAndComplianceCenterApiV3;

    protected params: SecurityAndComplianceCenterApiV3.ListScopesParams;

    /**
     * Construct a ScopesPager object.
     *
     * @param {SecurityAndComplianceCenterApiV3}  client - The service client instance used to invoke listScopes()
     * @param {Object} params - The parameters to be passed to listScopes()
     * @constructor
     * @returns {ScopesPager}
     */
    constructor(client: SecurityAndComplianceCenterApiV3, params: SecurityAndComplianceCenterApiV3.ListScopesParams) {
      if (params && params.start) {
        throw new Error(`the params.start field should not be set`);
      }

      this._hasNext = true;
      this.pageContext = { next: undefined };
      this.client = client;
      this.params = JSON.parse(JSON.stringify(params || {}));
    }

    /**
     * Returns true if there are potentially more results to be retrieved by invoking getNext().
     * @returns {boolean}
     */
    public hasNext(): boolean {
      return this._hasNext;
    }

    /**
     * Returns the next page of results by invoking listScopes().
     * @returns {Promise<SecurityAndComplianceCenterApiV3.Scope[]>}
     */
    public async getNext(): Promise<SecurityAndComplianceCenterApiV3.Scope[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listScopes(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.scopes;
    }

    /**
     * Returns all results by invoking listScopes() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<SecurityAndComplianceCenterApiV3.Scope[]>}
     */
    public async getAll(): Promise<SecurityAndComplianceCenterApiV3.Scope[]> {
      const results: Scope[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * SubscopesPager can be used to simplify the use of listSubscopes().
   */
  export class SubscopesPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: SecurityAndComplianceCenterApiV3;

    protected params: SecurityAndComplianceCenterApiV3.ListSubscopesParams;

    /**
     * Construct a SubscopesPager object.
     *
     * @param {SecurityAndComplianceCenterApiV3}  client - The service client instance used to invoke listSubscopes()
     * @param {Object} params - The parameters to be passed to listSubscopes()
     * @constructor
     * @returns {SubscopesPager}
     */
    constructor(client: SecurityAndComplianceCenterApiV3, params: SecurityAndComplianceCenterApiV3.ListSubscopesParams) {
      if (params && params.start) {
        throw new Error(`the params.start field should not be set`);
      }

      this._hasNext = true;
      this.pageContext = { next: undefined };
      this.client = client;
      this.params = JSON.parse(JSON.stringify(params || {}));
    }

    /**
     * Returns true if there are potentially more results to be retrieved by invoking getNext().
     * @returns {boolean}
     */
    public hasNext(): boolean {
      return this._hasNext;
    }

    /**
     * Returns the next page of results by invoking listSubscopes().
     * @returns {Promise<SecurityAndComplianceCenterApiV3.SubScope[]>}
     */
    public async getNext(): Promise<SecurityAndComplianceCenterApiV3.SubScope[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listSubscopes(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.subscopes;
    }

    /**
     * Returns all results by invoking listSubscopes() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<SecurityAndComplianceCenterApiV3.SubScope[]>}
     */
    public async getAll(): Promise<SecurityAndComplianceCenterApiV3.SubScope[]> {
      const results: SubScope[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * ReportsPager can be used to simplify the use of listReports().
   */
  export class ReportsPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: SecurityAndComplianceCenterApiV3;

    protected params: SecurityAndComplianceCenterApiV3.ListReportsParams;

    /**
     * Construct a ReportsPager object.
     *
     * @param {SecurityAndComplianceCenterApiV3}  client - The service client instance used to invoke listReports()
     * @param {Object} params - The parameters to be passed to listReports()
     * @constructor
     * @returns {ReportsPager}
     */
    constructor(client: SecurityAndComplianceCenterApiV3, params: SecurityAndComplianceCenterApiV3.ListReportsParams) {
      if (params && params.start) {
        throw new Error(`the params.start field should not be set`);
      }

      this._hasNext = true;
      this.pageContext = { next: undefined };
      this.client = client;
      this.params = JSON.parse(JSON.stringify(params || {}));
    }

    /**
     * Returns true if there are potentially more results to be retrieved by invoking getNext().
     * @returns {boolean}
     */
    public hasNext(): boolean {
      return this._hasNext;
    }

    /**
     * Returns the next page of results by invoking listReports().
     * @returns {Promise<SecurityAndComplianceCenterApiV3.Report[]>}
     */
    public async getNext(): Promise<SecurityAndComplianceCenterApiV3.Report[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listReports(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.reports;
    }

    /**
     * Returns all results by invoking listReports() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<SecurityAndComplianceCenterApiV3.Report[]>}
     */
    public async getAll(): Promise<SecurityAndComplianceCenterApiV3.Report[]> {
      const results: Report[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * ReportEvaluationsPager can be used to simplify the use of listReportEvaluations().
   */
  export class ReportEvaluationsPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: SecurityAndComplianceCenterApiV3;

    protected params: SecurityAndComplianceCenterApiV3.ListReportEvaluationsParams;

    /**
     * Construct a ReportEvaluationsPager object.
     *
     * @param {SecurityAndComplianceCenterApiV3}  client - The service client instance used to invoke listReportEvaluations()
     * @param {Object} params - The parameters to be passed to listReportEvaluations()
     * @constructor
     * @returns {ReportEvaluationsPager}
     */
    constructor(client: SecurityAndComplianceCenterApiV3, params: SecurityAndComplianceCenterApiV3.ListReportEvaluationsParams) {
      if (params && params.start) {
        throw new Error(`the params.start field should not be set`);
      }

      this._hasNext = true;
      this.pageContext = { next: undefined };
      this.client = client;
      this.params = JSON.parse(JSON.stringify(params || {}));
    }

    /**
     * Returns true if there are potentially more results to be retrieved by invoking getNext().
     * @returns {boolean}
     */
    public hasNext(): boolean {
      return this._hasNext;
    }

    /**
     * Returns the next page of results by invoking listReportEvaluations().
     * @returns {Promise<SecurityAndComplianceCenterApiV3.Evaluation[]>}
     */
    public async getNext(): Promise<SecurityAndComplianceCenterApiV3.Evaluation[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listReportEvaluations(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.evaluations;
    }

    /**
     * Returns all results by invoking listReportEvaluations() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<SecurityAndComplianceCenterApiV3.Evaluation[]>}
     */
    public async getAll(): Promise<SecurityAndComplianceCenterApiV3.Evaluation[]> {
      const results: Evaluation[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * ReportResourcesPager can be used to simplify the use of listReportResources().
   */
  export class ReportResourcesPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: SecurityAndComplianceCenterApiV3;

    protected params: SecurityAndComplianceCenterApiV3.ListReportResourcesParams;

    /**
     * Construct a ReportResourcesPager object.
     *
     * @param {SecurityAndComplianceCenterApiV3}  client - The service client instance used to invoke listReportResources()
     * @param {Object} params - The parameters to be passed to listReportResources()
     * @constructor
     * @returns {ReportResourcesPager}
     */
    constructor(client: SecurityAndComplianceCenterApiV3, params: SecurityAndComplianceCenterApiV3.ListReportResourcesParams) {
      if (params && params.start) {
        throw new Error(`the params.start field should not be set`);
      }

      this._hasNext = true;
      this.pageContext = { next: undefined };
      this.client = client;
      this.params = JSON.parse(JSON.stringify(params || {}));
    }

    /**
     * Returns true if there are potentially more results to be retrieved by invoking getNext().
     * @returns {boolean}
     */
    public hasNext(): boolean {
      return this._hasNext;
    }

    /**
     * Returns the next page of results by invoking listReportResources().
     * @returns {Promise<SecurityAndComplianceCenterApiV3.Resource[]>}
     */
    public async getNext(): Promise<SecurityAndComplianceCenterApiV3.Resource[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listReportResources(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.resources;
    }

    /**
     * Returns all results by invoking listReportResources() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<SecurityAndComplianceCenterApiV3.Resource[]>}
     */
    public async getAll(): Promise<SecurityAndComplianceCenterApiV3.Resource[]> {
      const results: Resource[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * RulesPager can be used to simplify the use of listRules().
   */
  export class RulesPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: SecurityAndComplianceCenterApiV3;

    protected params: SecurityAndComplianceCenterApiV3.ListRulesParams;

    /**
     * Construct a RulesPager object.
     *
     * @param {SecurityAndComplianceCenterApiV3}  client - The service client instance used to invoke listRules()
     * @param {Object} params - The parameters to be passed to listRules()
     * @constructor
     * @returns {RulesPager}
     */
    constructor(client: SecurityAndComplianceCenterApiV3, params: SecurityAndComplianceCenterApiV3.ListRulesParams) {
      if (params && params.start) {
        throw new Error(`the params.start field should not be set`);
      }

      this._hasNext = true;
      this.pageContext = { next: undefined };
      this.client = client;
      this.params = JSON.parse(JSON.stringify(params || {}));
    }

    /**
     * Returns true if there are potentially more results to be retrieved by invoking getNext().
     * @returns {boolean}
     */
    public hasNext(): boolean {
      return this._hasNext;
    }

    /**
     * Returns the next page of results by invoking listRules().
     * @returns {Promise<SecurityAndComplianceCenterApiV3.Rule[]>}
     */
    public async getNext(): Promise<SecurityAndComplianceCenterApiV3.Rule[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listRules(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.rules;
    }

    /**
     * Returns all results by invoking listRules() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<SecurityAndComplianceCenterApiV3.Rule[]>}
     */
    public async getAll(): Promise<SecurityAndComplianceCenterApiV3.Rule[]> {
      const results: Rule[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }
}

export = SecurityAndComplianceCenterApiV3;
