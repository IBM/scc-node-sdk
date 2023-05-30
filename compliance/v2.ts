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

/**
 * IBM OpenAPI SDK Code Generator Version: 3.72.0-5d70f2bb-20230511-203609
 */

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import {
  Authenticator,
  BaseService,
  getAuthenticatorFromEnvironment,
  validateParams,
  UserOptions,
} from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * The SCC Phoenix Compliance APIs.
 *
 * API Version: 2.0.0
 */

class ComplianceV2 extends BaseService {
  static DEFAULT_SERVICE_NAME: string = 'compliance';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of ComplianceV2 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {ComplianceV2}
   */

  public static newInstance(options: UserOptions): ComplianceV2 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new ComplianceV2(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /**
   * Construct a ComplianceV2 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service. The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {ComplianceV2}
   */
  constructor(options: UserOptions) {
    options = options || {};

    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    }
  }

  /*************************
   * profileAPIs
   ************************/

  /**
   * Create a custom profile.
   *
   * Create a user-defined custom profile.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - Instance id.
   * @param {string} [params.profileName] - Name of the Profile.
   * @param {string} [params.profileDescription] - Description of the profile.
   * @param {string} [params.profileType] - Type of the profile.
   * @param {string} [params.profileVersion] - Version of the profile.
   * @param {boolean} [params.latest] - If Latest is enabled or not.
   * @param {string} [params.versionGroupLabel] - The version group label of the profile.
   * @param {ProfileControlsInRequest[]} [params.controls] - Controls in the profile.
   * @param {DefaultParameters[]} [params.defaultParameters] - default parameters of the profile.
   * @param {string} [params.transactionId] - The transaction ID for the request in UUID v4 format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ComplianceV2.Response<ComplianceV2.ProfileResponse>>}
   */
  public createProfile(
    params: ComplianceV2.CreateProfileParams
  ): Promise<ComplianceV2.Response<ComplianceV2.ProfileResponse>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId'];
    const _validParams = ['instanceId', 'profileName', 'profileDescription', 'profileType', 'profileVersion', 'latest', 'versionGroupLabel', 'controls', 'defaultParameters', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'profile_name': _params.profileName,
      'profile_description': _params.profileDescription,
      'profile_type': _params.profileType,
      'profile_version': _params.profileVersion,
      'latest': _params.latest,
      'version_group_label': _params.versionGroupLabel,
      'controls': _params.controls,
      'default_parameters': _params.defaultParameters,
    };

    const path = {
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(
      ComplianceV2.DEFAULT_SERVICE_NAME,
      'v2',
      'createProfile'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/profiles',
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
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get all predefined and user's custom profiles.
   *
   * Get all predefined and user's custom profiles.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - Instance id.
   * @param {string} [params.transactionId] - The transaction ID for the request in UUID v4 format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ComplianceV2.Response<ComplianceV2.GetAllProfilesRespBody>>}
   */
  public listProfiles(
    params: ComplianceV2.ListProfilesParams
  ): Promise<ComplianceV2.Response<ComplianceV2.GetAllProfilesRespBody>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId'];
    const _validParams = ['instanceId', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(
      ComplianceV2.DEFAULT_SERVICE_NAME,
      'v2',
      'listProfiles'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/profiles',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Transaction-Id': _params.transactionId,
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
   * Update a user-defined custom profile.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.profilesId - The profile ID.
   * @param {string} params.instanceId - Instance id.
   * @param {string} [params.profileName] - Name of the Profile.
   * @param {string} [params.profileDescription] - Description of the profile.
   * @param {string} [params.profileType] - Type of the profile.
   * @param {string} [params.profileVersion] - Version of the profile.
   * @param {boolean} [params.latest] - If Latest is enabled or not.
   * @param {string} [params.versionGroupLabel] - The version group label of the profile.
   * @param {ProfileControlsInRequest[]} [params.controls] - Controls in the profile.
   * @param {DefaultParameters[]} [params.defaultParameters] - default parameters of the profile.
   * @param {string} [params.transactionId] - The transaction ID for the request in UUID v4 format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ComplianceV2.Response<ComplianceV2.ProfileResponse>>}
   */
  public addProfile(
    params: ComplianceV2.AddProfileParams
  ): Promise<ComplianceV2.Response<ComplianceV2.ProfileResponse>> {
    const _params = { ...params };
    const _requiredParams = ['profilesId', 'instanceId'];
    const _validParams = ['profilesId', 'instanceId', 'profileName', 'profileDescription', 'profileType', 'profileVersion', 'latest', 'versionGroupLabel', 'controls', 'defaultParameters', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'profile_name': _params.profileName,
      'profile_description': _params.profileDescription,
      'profile_type': _params.profileType,
      'profile_version': _params.profileVersion,
      'latest': _params.latest,
      'version_group_label': _params.versionGroupLabel,
      'controls': _params.controls,
      'default_parameters': _params.defaultParameters,
    };

    const path = {
      'profiles_id': _params.profilesId,
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(
      ComplianceV2.DEFAULT_SERVICE_NAME,
      'v2',
      'addProfile'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/profiles/{profiles_id}',
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
            'Transaction-Id': _params.transactionId,
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
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.profilesId - The profile ID.
   * @param {string} params.instanceId - Instance id.
   * @param {string} [params.transactionId] - The transaction ID for the request in UUID v4 format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ComplianceV2.Response<ComplianceV2.ProfileResponse>>}
   */
  public getProfile(
    params: ComplianceV2.GetProfileParams
  ): Promise<ComplianceV2.Response<ComplianceV2.ProfileResponse>> {
    const _params = { ...params };
    const _requiredParams = ['profilesId', 'instanceId'];
    const _validParams = ['profilesId', 'instanceId', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'profiles_id': _params.profilesId,
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(
      ComplianceV2.DEFAULT_SERVICE_NAME,
      'v2',
      'getProfile'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/profiles/{profiles_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Transaction-Id': _params.transactionId,
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
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.profilesId - The profile ID.
   * @param {string} params.instanceId - Instance id.
   * @param {string} [params.transactionId] - The transaction ID for the request in UUID v4 format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ComplianceV2.Response<ComplianceV2.ProfileResponse>>}
   */
  public deleteCustomProfile(
    params: ComplianceV2.DeleteCustomProfileParams
  ): Promise<ComplianceV2.Response<ComplianceV2.ProfileResponse>> {
    const _params = { ...params };
    const _requiredParams = ['profilesId', 'instanceId'];
    const _validParams = ['profilesId', 'instanceId', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'profiles_id': _params.profilesId,
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(
      ComplianceV2.DEFAULT_SERVICE_NAME,
      'v2',
      'deleteCustomProfile'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/profiles/{profiles_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Transaction-Id': _params.transactionId,
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
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.profilesId - The profile ID.
   * @param {string} params.instanceId - Instance id.
   * @param {string} [params.id] - id of parameter.
   * @param {DefaultParameters[]} [params.defaultParameters] - default parameters.
   * @param {string} [params.transactionId] - The transaction ID for the request in UUID v4 format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ComplianceV2.Response<ComplianceV2.ProfileDefaultParametersResponse>>}
   */
  public replaceProfileParameters(
    params: ComplianceV2.ReplaceProfileParametersParams
  ): Promise<ComplianceV2.Response<ComplianceV2.ProfileDefaultParametersResponse>> {
    const _params = { ...params };
    const _requiredParams = ['profilesId', 'instanceId'];
    const _validParams = ['profilesId', 'instanceId', 'id', 'defaultParameters', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'id': _params.id,
      'default_parameters': _params.defaultParameters,
    };

    const path = {
      'profiles_id': _params.profilesId,
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(
      ComplianceV2.DEFAULT_SERVICE_NAME,
      'v2',
      'replaceProfileParameters'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/profiles/{profiles_id}/parameters',
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
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * attachmentAPIs
   ************************/

  /**
   * Create an attachment.
   *
   * Create an attachment to link to a profile.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.profilesId - The profile ID.
   * @param {string} params.instanceId - Instance id.
   * @param {AttachmentPayload[]} [params.attachments] - the attachments of a profile.
   * @param {string} [params.transactionId] - The transaction ID for the request in UUID v4 format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ComplianceV2.Response<ComplianceV2.AttachmentProfileResponse>>}
   */
  public createAttachment(
    params: ComplianceV2.CreateAttachmentParams
  ): Promise<ComplianceV2.Response<ComplianceV2.AttachmentProfileResponse>> {
    const _params = { ...params };
    const _requiredParams = ['profilesId', 'instanceId'];
    const _validParams = ['profilesId', 'instanceId', 'attachments', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'attachments': _params.attachments,
    };

    const path = {
      'profiles_id': _params.profilesId,
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(
      ComplianceV2.DEFAULT_SERVICE_NAME,
      'v2',
      'createAttachment'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/profiles/{profiles_id}/attachments',
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
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get all attachments.
   *
   * Retrieve all attachments that are linked to a profile.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.profilesId - The profile ID.
   * @param {string} params.instanceId - Instance id.
   * @param {string} [params.transactionId] - The transaction ID for the request in UUID v4 format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ComplianceV2.Response<ComplianceV2.GetAllAttachmnetsForProfileRespBody>>}
   */
  public checkProfileAttachmnets(
    params: ComplianceV2.CheckProfileAttachmnetsParams
  ): Promise<ComplianceV2.Response<ComplianceV2.GetAllAttachmnetsForProfileRespBody>> {
    const _params = { ...params };
    const _requiredParams = ['profilesId', 'instanceId'];
    const _validParams = ['profilesId', 'instanceId', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'profiles_id': _params.profilesId,
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(
      ComplianceV2.DEFAULT_SERVICE_NAME,
      'v2',
      'checkProfileAttachmnets'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/profiles/{profiles_id}/attachments',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get an attachment for a profile.
   *
   * Retrieve an attachment that is linked to a profile by specifying the attachment ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.profilesId - The profile ID.
   * @param {string} params.attachmentId - The attachment ID.
   * @param {string} params.instanceId - Instance id.
   * @param {string} [params.transactionId] - The transaction ID for the request in UUID v4 format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ComplianceV2.Response<ComplianceV2.AttachmentPayload>>}
   */
  public getProfileAttachmnet(
    params: ComplianceV2.GetProfileAttachmnetParams
  ): Promise<ComplianceV2.Response<ComplianceV2.AttachmentPayload>> {
    const _params = { ...params };
    const _requiredParams = ['profilesId', 'attachmentId', 'instanceId'];
    const _validParams = ['profilesId', 'attachmentId', 'instanceId', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'profiles_id': _params.profilesId,
      'attachment_id': _params.attachmentId,
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(
      ComplianceV2.DEFAULT_SERVICE_NAME,
      'v2',
      'getProfileAttachmnet'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/profiles/{profiles_id}/attachments/{attachment_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Transaction-Id': _params.transactionId,
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
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.profilesId - The profile ID.
   * @param {string} params.attachmentId - The attachment ID.
   * @param {string} params.instanceId - Instance id.
   * @param {string} [params.id] - attachment id.
   * @param {string} [params.accountId] - account id.
   * @param {ScopePayload} [params.includedScope] - scope payload.
   * @param {ScopePayload[]} [params.exclusions] - exclusions.
   * @param {string} [params.createdBy] - created by.
   * @param {string} [params.createdOn] - created on.
   * @param {string} [params.updatedBy] - updated by.
   * @param {string} [params.updatedOn] - updated on.
   * @param {string} [params.status] - status.
   * @param {ParameterDetails[]} [params.attachmentParameters] - attachment parameters.
   * @param {AttachmentsNotificationsPayload} [params.attachmentNotifications] - payload of the attachments
   * notifications.
   * @param {string} [params.transactionId] - The transaction ID for the request in UUID v4 format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ComplianceV2.Response<ComplianceV2.AttachmentPayload>>}
   */
  public replaceProfileAttachment(
    params: ComplianceV2.ReplaceProfileAttachmentParams
  ): Promise<ComplianceV2.Response<ComplianceV2.AttachmentPayload>> {
    const _params = { ...params };
    const _requiredParams = ['profilesId', 'attachmentId', 'instanceId'];
    const _validParams = ['profilesId', 'attachmentId', 'instanceId', 'id', 'accountId', 'includedScope', 'exclusions', 'createdBy', 'createdOn', 'updatedBy', 'updatedOn', 'status', 'attachmentParameters', 'attachmentNotifications', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'id': _params.id,
      'account_id': _params.accountId,
      'included_scope': _params.includedScope,
      'exclusions': _params.exclusions,
      'created_by': _params.createdBy,
      'created_on': _params.createdOn,
      'updated_by': _params.updatedBy,
      'updated_on': _params.updatedOn,
      'status': _params.status,
      'attachment_parameters': _params.attachmentParameters,
      'attachment_notifications': _params.attachmentNotifications,
    };

    const path = {
      'profiles_id': _params.profilesId,
      'attachment_id': _params.attachmentId,
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(
      ComplianceV2.DEFAULT_SERVICE_NAME,
      'v2',
      'replaceProfileAttachment'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/profiles/{profiles_id}/attachments/{attachment_id}',
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
            'Transaction-Id': _params.transactionId,
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
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.profilesId - The profile ID.
   * @param {string} params.attachmentId - The attachment ID.
   * @param {string} params.instanceId - Instance id.
   * @param {string} [params.transactionId] - The transaction ID for the request in UUID v4 format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ComplianceV2.Response<ComplianceV2.AttachmentPayload>>}
   */
  public deleteProfileAttachmnet(
    params: ComplianceV2.DeleteProfileAttachmnetParams
  ): Promise<ComplianceV2.Response<ComplianceV2.AttachmentPayload>> {
    const _params = { ...params };
    const _requiredParams = ['profilesId', 'attachmentId', 'instanceId'];
    const _validParams = ['profilesId', 'attachmentId', 'instanceId', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'profiles_id': _params.profilesId,
      'attachment_id': _params.attachmentId,
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(
      ComplianceV2.DEFAULT_SERVICE_NAME,
      'v2',
      'deleteProfileAttachmnet'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/profiles/{profiles_id}/attachments/{attachment_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get attachment's parameters.
   *
   * Get attachment's parameters.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.profilesId - The profile ID.
   * @param {string} params.attachmentId - The attachment ID.
   * @param {string} params.instanceId - Instance id.
   * @param {string} [params.transactionId] - The transaction ID for the request in UUID v4 format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ComplianceV2.Response<ComplianceV2.ParameterDetails>>}
   */
  public listAttachmentParameters(
    params: ComplianceV2.ListAttachmentParametersParams
  ): Promise<ComplianceV2.Response<ComplianceV2.ParameterDetails>> {
    const _params = { ...params };
    const _requiredParams = ['profilesId', 'attachmentId', 'instanceId'];
    const _validParams = ['profilesId', 'attachmentId', 'instanceId', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'profiles_id': _params.profilesId,
      'attachment_id': _params.attachmentId,
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(
      ComplianceV2.DEFAULT_SERVICE_NAME,
      'v2',
      'listAttachmentParameters'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/profiles/{profiles_id}/attachments/{attachment_id}/parameters',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update parameters for an attachment.
   *
   * Update parameters for an attachment.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.profilesId - The profile ID.
   * @param {string} params.attachmentId - The attachment ID.
   * @param {string} params.instanceId - Instance id.
   * @param {string} [params.parameterName] - The name of the parameter.
   * @param {string} [params.parameterDisplayName] - The display name of the parameter.
   * @param {string} [params.parameterType] - the type of the parameter.
   * @param {string} [params.parameterValue] - The value of the parameter.
   * @param {string} [params.assessmentType] - The assessment type of the parameter.
   * @param {string} [params.assessmentId] - The Assessment ID of the parameter.
   * @param {ParameterInfo[]} [params.parameters] - Parameters.
   * @param {string} [params.transactionId] - The transaction ID for the request in UUID v4 format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ComplianceV2.Response<ComplianceV2.ParameterDetails>>}
   */
  public replaceAttachment(
    params: ComplianceV2.ReplaceAttachmentParams
  ): Promise<ComplianceV2.Response<ComplianceV2.ParameterDetails>> {
    const _params = { ...params };
    const _requiredParams = ['profilesId', 'attachmentId', 'instanceId'];
    const _validParams = ['profilesId', 'attachmentId', 'instanceId', 'parameterName', 'parameterDisplayName', 'parameterType', 'parameterValue', 'assessmentType', 'assessmentId', 'parameters', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'parameter_name': _params.parameterName,
      'parameter_display_name': _params.parameterDisplayName,
      'parameter_type': _params.parameterType,
      'parameter_value': _params.parameterValue,
      'assessment_type': _params.assessmentType,
      'assessment_id': _params.assessmentId,
      'parameters': _params.parameters,
    };

    const path = {
      'profiles_id': _params.profilesId,
      'attachment_id': _params.attachmentId,
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(
      ComplianceV2.DEFAULT_SERVICE_NAME,
      'v2',
      'replaceAttachment'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/profiles/{profiles_id}/attachments/{attachment_id}/parameters',
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
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get parameters by name.
   *
   * Get parametes by name.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.profilesId - The profile ID.
   * @param {string} params.attachmentId - The attachment ID.
   * @param {string} params.parameterName - The parameter name.
   * @param {string} params.instanceId - Instance id.
   * @param {string} [params.transactionId] - The transaction ID for the request in UUID v4 format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ComplianceV2.Response<ComplianceV2.ParameterDetails>>}
   */
  public getParametersByName(
    params: ComplianceV2.GetParametersByNameParams
  ): Promise<ComplianceV2.Response<ComplianceV2.ParameterDetails>> {
    const _params = { ...params };
    const _requiredParams = ['profilesId', 'attachmentId', 'parameterName', 'instanceId'];
    const _validParams = ['profilesId', 'attachmentId', 'parameterName', 'instanceId', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'profiles_id': _params.profilesId,
      'attachment_id': _params.attachmentId,
      'parameter_name': _params.parameterName,
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(
      ComplianceV2.DEFAULT_SERVICE_NAME,
      'v2',
      'getParametersByName'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/profiles/{profiles_id}/attachments/{attachment_id}/parameters/{parameter_name}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update parameter by name.
   *
   * Update parameter by name.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.profilesId - The profile ID.
   * @param {string} params.attachmentId - The attachment ID.
   * @param {string} params.parameterName - The parameter name.
   * @param {string} params.instanceId - Instance id.
   * @param {string} [params.newParameterName] - The name of the parameter.
   * @param {string} [params.newParameterDisplayName] - The display name of the parameter.
   * @param {string} [params.newParameterType] - the type of the parameter.
   * @param {string} [params.newParameterValue] - The value of the parameter.
   * @param {string} [params.newAssessmentType] - The assessment type of the parameter.
   * @param {string} [params.newAssessmentId] - The Assessment ID of the parameter.
   * @param {ParameterInfo[]} [params.newParameters] - Parameters.
   * @param {string} [params.transactionId] - The transaction ID for the request in UUID v4 format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ComplianceV2.Response<ComplianceV2.ParameterDetails>>}
   */
  public replaceAttachmnetParametersByName(
    params: ComplianceV2.ReplaceAttachmnetParametersByNameParams
  ): Promise<ComplianceV2.Response<ComplianceV2.ParameterDetails>> {
    const _params = { ...params };
    const _requiredParams = ['profilesId', 'attachmentId', 'parameterName', 'instanceId'];
    const _validParams = ['profilesId', 'attachmentId', 'parameterName', 'instanceId', 'newParameterName', 'newParameterDisplayName', 'newParameterType', 'newParameterValue', 'newAssessmentType', 'newAssessmentId', 'newParameters', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'parameter_name': _params.newParameterName,
      'parameter_display_name': _params.newParameterDisplayName,
      'parameter_type': _params.newParameterType,
      'parameter_value': _params.newParameterValue,
      'assessment_type': _params.newAssessmentType,
      'assessment_id': _params.newAssessmentId,
      'parameters': _params.newParameters,
    };

    const path = {
      'profiles_id': _params.profilesId,
      'attachment_id': _params.attachmentId,
      'parameter_name': _params.parameterName,
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(
      ComplianceV2.DEFAULT_SERVICE_NAME,
      'v2',
      'replaceAttachmnetParametersByName'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/profiles/{profiles_id}/attachments/{attachment_id}/parameters/{parameter_name}',
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
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * controlLibraryAPIs
   ************************/

  /**
   * Create a custom control library.
   *
   * Create a custom control library.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - Instance id.
   * @param {string} [params.id] - Control Library ID.
   * @param {string} [params.accountId] - Account ID.
   * @param {string} [params.controlLibraryName] - Control Library name.
   * @param {string} [params.controlLibraryDescription] - Control Library Description.
   * @param {string} [params.controlLibraryType] - Control Library Type.
   * @param {string} [params.versionGroupLabel] - Version group label.
   * @param {string} [params.controlLibraryVersion] - Control Library Version.
   * @param {boolean} [params.latest] - Latest.
   * @param {number} [params.controlsCount] - Number of controls.
   * @param {ControlsInControlLibRequestPayload[]} [params.controls] - Controls.
   * @param {string} [params.transactionId] - The transaction ID for the request in UUID v4 format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ComplianceV2.Response<ComplianceV2.ControlLibraryRequest>>}
   */
  public createCustomControlLibrary(
    params: ComplianceV2.CreateCustomControlLibraryParams
  ): Promise<ComplianceV2.Response<ComplianceV2.ControlLibraryRequest>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId'];
    const _validParams = ['instanceId', 'id', 'accountId', 'controlLibraryName', 'controlLibraryDescription', 'controlLibraryType', 'versionGroupLabel', 'controlLibraryVersion', 'latest', 'controlsCount', 'controls', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'id': _params.id,
      'account_id': _params.accountId,
      'control_library_name': _params.controlLibraryName,
      'control_library_description': _params.controlLibraryDescription,
      'control_library_type': _params.controlLibraryType,
      'version_group_label': _params.versionGroupLabel,
      'control_library_version': _params.controlLibraryVersion,
      'latest': _params.latest,
      'controls_count': _params.controlsCount,
      'controls': _params.controls,
    };

    const path = {
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(
      ComplianceV2.DEFAULT_SERVICE_NAME,
      'v2',
      'createCustomControlLibrary'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/control_libraries',
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
            'Transaction-Id': _params.transactionId,
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
   * Retrieve all the control libraries, including predefined and custom libraries.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - Instance id.
   * @param {string} [params.transactionId] - The transaction ID for the request in UUID v4 format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ComplianceV2.Response<ComplianceV2.GetAllControlLibrariesRespBody>>}
   */
  public listControlLibraries(
    params: ComplianceV2.ListControlLibrariesParams
  ): Promise<ComplianceV2.Response<ComplianceV2.GetAllControlLibrariesRespBody>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId'];
    const _validParams = ['instanceId', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(
      ComplianceV2.DEFAULT_SERVICE_NAME,
      'v2',
      'listControlLibraries'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/control_libraries',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update custom control library.
   *
   * Update a custom control library by specifying the control library ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.controlLibrariesId - The control library ID.
   * @param {string} params.instanceId - Instance id.
   * @param {string} [params.id] - Control Library ID.
   * @param {string} [params.accountId] - Account ID.
   * @param {string} [params.controlLibraryName] - Control Library name.
   * @param {string} [params.controlLibraryDescription] - Control Library Description.
   * @param {string} [params.controlLibraryType] - Control Library Type.
   * @param {string} [params.versionGroupLabel] - Version group label.
   * @param {string} [params.controlLibraryVersion] - Control Library Version.
   * @param {boolean} [params.latest] - Latest.
   * @param {number} [params.controlsCount] - Number of controls.
   * @param {ControlsInControlLibRequestPayload[]} [params.controls] - Controls.
   * @param {string} [params.transactionId] - The transaction ID for the request in UUID v4 format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ComplianceV2.Response<ComplianceV2.ControlLibraryRequest>>}
   */
  public replaceCustomControlLibrary(
    params: ComplianceV2.ReplaceCustomControlLibraryParams
  ): Promise<ComplianceV2.Response<ComplianceV2.ControlLibraryRequest>> {
    const _params = { ...params };
    const _requiredParams = ['controlLibrariesId', 'instanceId'];
    const _validParams = ['controlLibrariesId', 'instanceId', 'id', 'accountId', 'controlLibraryName', 'controlLibraryDescription', 'controlLibraryType', 'versionGroupLabel', 'controlLibraryVersion', 'latest', 'controlsCount', 'controls', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'id': _params.id,
      'account_id': _params.accountId,
      'control_library_name': _params.controlLibraryName,
      'control_library_description': _params.controlLibraryDescription,
      'control_library_type': _params.controlLibraryType,
      'version_group_label': _params.versionGroupLabel,
      'control_library_version': _params.controlLibraryVersion,
      'latest': _params.latest,
      'controls_count': _params.controlsCount,
      'controls': _params.controls,
    };

    const path = {
      'control_libraries_id': _params.controlLibrariesId,
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(
      ComplianceV2.DEFAULT_SERVICE_NAME,
      'v2',
      'replaceCustomControlLibrary'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/control_libraries/{control_libraries_id}',
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
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get control library by id.
   *
   * Get control library by id.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.controlLibrariesId - The control library ID.
   * @param {string} params.instanceId - Instance id.
   * @param {string} [params.transactionId] - The transaction ID for the request in UUID v4 format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ComplianceV2.Response<ComplianceV2.ControlLibraryRequest>>}
   */
  public getControlLibrary(
    params: ComplianceV2.GetControlLibraryParams
  ): Promise<ComplianceV2.Response<ComplianceV2.ControlLibraryRequest>> {
    const _params = { ...params };
    const _requiredParams = ['controlLibrariesId', 'instanceId'];
    const _validParams = ['controlLibrariesId', 'instanceId', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'control_libraries_id': _params.controlLibrariesId,
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(
      ComplianceV2.DEFAULT_SERVICE_NAME,
      'v2',
      'getControlLibrary'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/control_libraries/{control_libraries_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete custom control library.
   *
   * Delete custom control library.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.controlLibrariesId - The control library ID.
   * @param {string} params.instanceId - Instance id.
   * @param {string} [params.transactionId] - The transaction ID for the request in UUID v4 format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ComplianceV2.Response<ComplianceV2.ControlLibraryRequest>>}
   */
  public deleteCustomControllibrary(
    params: ComplianceV2.DeleteCustomControllibraryParams
  ): Promise<ComplianceV2.Response<ComplianceV2.ControlLibraryRequest>> {
    const _params = { ...params };
    const _requiredParams = ['controlLibrariesId', 'instanceId'];
    const _validParams = ['controlLibrariesId', 'instanceId', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'control_libraries_id': _params.controlLibrariesId,
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(
      ComplianceV2.DEFAULT_SERVICE_NAME,
      'v2',
      'deleteCustomControllibrary'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/control_libraries/{control_libraries_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * scanAPI
   ************************/

  /**
   * Create a scan.
   *
   * Create a scan.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - Instance id.
   * @param {string} [params.attachmentId] - Attachment ID.
   * @param {string} [params.transactionId] - The transaction ID for the request in UUID v4 format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ComplianceV2.Response<ComplianceV2.CreateScanResponse>>}
   */
  public createScan(
    params: ComplianceV2.CreateScanParams
  ): Promise<ComplianceV2.Response<ComplianceV2.CreateScanResponse>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId'];
    const _validParams = ['instanceId', 'attachmentId', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'attachment_id': _params.attachmentId,
    };

    const path = {
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(
      ComplianceV2.DEFAULT_SERVICE_NAME,
      'v2',
      'createScan'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/v3/scans',
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
            'Transaction-Id': _params.transactionId,
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

namespace ComplianceV2 {
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

  /** Parameters for the `createProfile` operation. */
  export interface CreateProfileParams {
    /** Instance id. */
    instanceId: string;
    /** Name of the Profile. */
    profileName?: string;
    /** Description of the profile. */
    profileDescription?: string;
    /** Type of the profile. */
    profileType?: CreateProfileConstants.ProfileType | string;
    /** Version of the profile. */
    profileVersion?: string;
    /** If Latest is enabled or not. */
    latest?: boolean;
    /** The version group label of the profile. */
    versionGroupLabel?: string;
    /** Controls in the profile. */
    controls?: ProfileControlsInRequest[];
    /** default parameters of the profile. */
    defaultParameters?: DefaultParameters[];
    /** The transaction ID for the request in UUID v4 format. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createProfile` operation. */
  export namespace CreateProfileConstants {
    /** Type of the profile. */
    export enum ProfileType {
      PREDEFINED = 'predefined',
      CUSTOM = 'custom',
    }
  }

  /** Parameters for the `listProfiles` operation. */
  export interface ListProfilesParams {
    /** Instance id. */
    instanceId: string;
    /** The transaction ID for the request in UUID v4 format. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `addProfile` operation. */
  export interface AddProfileParams {
    /** The profile ID. */
    profilesId: string;
    /** Instance id. */
    instanceId: string;
    /** Name of the Profile. */
    profileName?: string;
    /** Description of the profile. */
    profileDescription?: string;
    /** Type of the profile. */
    profileType?: AddProfileConstants.ProfileType | string;
    /** Version of the profile. */
    profileVersion?: string;
    /** If Latest is enabled or not. */
    latest?: boolean;
    /** The version group label of the profile. */
    versionGroupLabel?: string;
    /** Controls in the profile. */
    controls?: ProfileControlsInRequest[];
    /** default parameters of the profile. */
    defaultParameters?: DefaultParameters[];
    /** The transaction ID for the request in UUID v4 format. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `addProfile` operation. */
  export namespace AddProfileConstants {
    /** Type of the profile. */
    export enum ProfileType {
      PREDEFINED = 'predefined',
      CUSTOM = 'custom',
    }
  }

  /** Parameters for the `getProfile` operation. */
  export interface GetProfileParams {
    /** The profile ID. */
    profilesId: string;
    /** Instance id. */
    instanceId: string;
    /** The transaction ID for the request in UUID v4 format. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteCustomProfile` operation. */
  export interface DeleteCustomProfileParams {
    /** The profile ID. */
    profilesId: string;
    /** Instance id. */
    instanceId: string;
    /** The transaction ID for the request in UUID v4 format. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `replaceProfileParameters` operation. */
  export interface ReplaceProfileParametersParams {
    /** The profile ID. */
    profilesId: string;
    /** Instance id. */
    instanceId: string;
    /** id of parameter. */
    id?: string;
    /** default parameters. */
    defaultParameters?: DefaultParameters[];
    /** The transaction ID for the request in UUID v4 format. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createAttachment` operation. */
  export interface CreateAttachmentParams {
    /** The profile ID. */
    profilesId: string;
    /** Instance id. */
    instanceId: string;
    /** the attachments of a profile. */
    attachments?: AttachmentPayload[];
    /** The transaction ID for the request in UUID v4 format. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `checkProfileAttachmnets` operation. */
  export interface CheckProfileAttachmnetsParams {
    /** The profile ID. */
    profilesId: string;
    /** Instance id. */
    instanceId: string;
    /** The transaction ID for the request in UUID v4 format. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getProfileAttachmnet` operation. */
  export interface GetProfileAttachmnetParams {
    /** The profile ID. */
    profilesId: string;
    /** The attachment ID. */
    attachmentId: string;
    /** Instance id. */
    instanceId: string;
    /** The transaction ID for the request in UUID v4 format. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `replaceProfileAttachment` operation. */
  export interface ReplaceProfileAttachmentParams {
    /** The profile ID. */
    profilesId: string;
    /** The attachment ID. */
    attachmentId: string;
    /** Instance id. */
    instanceId: string;
    /** attachment id. */
    id?: string;
    /** account id. */
    accountId?: string;
    /** scope payload. */
    includedScope?: ScopePayload;
    /** exclusions. */
    exclusions?: ScopePayload[];
    /** created by. */
    createdBy?: string;
    /** created on. */
    createdOn?: string;
    /** updated by. */
    updatedBy?: string;
    /** updated on. */
    updatedOn?: string;
    /** status. */
    status?: ReplaceProfileAttachmentConstants.Status | string;
    /** attachment parameters. */
    attachmentParameters?: ParameterDetails[];
    /** payload of the attachments notifications. */
    attachmentNotifications?: AttachmentsNotificationsPayload;
    /** The transaction ID for the request in UUID v4 format. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `replaceProfileAttachment` operation. */
  export namespace ReplaceProfileAttachmentConstants {
    /** status. */
    export enum Status {
      ENABLED = 'enabled',
      DISABLED = 'disabled',
    }
  }

  /** Parameters for the `deleteProfileAttachmnet` operation. */
  export interface DeleteProfileAttachmnetParams {
    /** The profile ID. */
    profilesId: string;
    /** The attachment ID. */
    attachmentId: string;
    /** Instance id. */
    instanceId: string;
    /** The transaction ID for the request in UUID v4 format. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listAttachmentParameters` operation. */
  export interface ListAttachmentParametersParams {
    /** The profile ID. */
    profilesId: string;
    /** The attachment ID. */
    attachmentId: string;
    /** Instance id. */
    instanceId: string;
    /** The transaction ID for the request in UUID v4 format. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `replaceAttachment` operation. */
  export interface ReplaceAttachmentParams {
    /** The profile ID. */
    profilesId: string;
    /** The attachment ID. */
    attachmentId: string;
    /** Instance id. */
    instanceId: string;
    /** The name of the parameter. */
    parameterName?: string;
    /** The display name of the parameter. */
    parameterDisplayName?: string;
    /** the type of the parameter. */
    parameterType?: ReplaceAttachmentConstants.ParameterType | string;
    /** The value of the parameter. */
    parameterValue?: string;
    /** The assessment type of the parameter. */
    assessmentType?: string;
    /** The Assessment ID of the parameter. */
    assessmentId?: string;
    /** Parameters. */
    parameters?: ParameterInfo[];
    /** The transaction ID for the request in UUID v4 format. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `replaceAttachment` operation. */
  export namespace ReplaceAttachmentConstants {
    /** the type of the parameter. */
    export enum ParameterType {
      NUMERIC = 'numeric',
      STRING_LIST = 'string_list',
    }
  }

  /** Parameters for the `getParametersByName` operation. */
  export interface GetParametersByNameParams {
    /** The profile ID. */
    profilesId: string;
    /** The attachment ID. */
    attachmentId: string;
    /** The parameter name. */
    parameterName: string;
    /** Instance id. */
    instanceId: string;
    /** The transaction ID for the request in UUID v4 format. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `replaceAttachmnetParametersByName` operation. */
  export interface ReplaceAttachmnetParametersByNameParams {
    /** The profile ID. */
    profilesId: string;
    /** The attachment ID. */
    attachmentId: string;
    /** The parameter name. */
    parameterName: string;
    /** Instance id. */
    instanceId: string;
    /** The name of the parameter. */
    newParameterName?: string;
    /** The display name of the parameter. */
    newParameterDisplayName?: string;
    /** the type of the parameter. */
    newParameterType?: ReplaceAttachmnetParametersByNameConstants.ParameterType | string;
    /** The value of the parameter. */
    newParameterValue?: string;
    /** The assessment type of the parameter. */
    newAssessmentType?: string;
    /** The Assessment ID of the parameter. */
    newAssessmentId?: string;
    /** Parameters. */
    newParameters?: ParameterInfo[];
    /** The transaction ID for the request in UUID v4 format. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `replaceAttachmnetParametersByName` operation. */
  export namespace ReplaceAttachmnetParametersByNameConstants {
    /** the type of the parameter. */
    export enum ParameterType {
      NUMERIC = 'numeric',
      STRING_LIST = 'string_list',
    }
  }

  /** Parameters for the `createCustomControlLibrary` operation. */
  export interface CreateCustomControlLibraryParams {
    /** Instance id. */
    instanceId: string;
    /** Control Library ID. */
    id?: string;
    /** Account ID. */
    accountId?: string;
    /** Control Library name. */
    controlLibraryName?: string;
    /** Control Library Description. */
    controlLibraryDescription?: string;
    /** Control Library Type. */
    controlLibraryType?: CreateCustomControlLibraryConstants.ControlLibraryType | string;
    /** Version group label. */
    versionGroupLabel?: string;
    /** Control Library Version. */
    controlLibraryVersion?: string;
    /** Latest. */
    latest?: boolean;
    /** Number of controls. */
    controlsCount?: number;
    /** Controls. */
    controls?: ControlsInControlLibRequestPayload[];
    /** The transaction ID for the request in UUID v4 format. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createCustomControlLibrary` operation. */
  export namespace CreateCustomControlLibraryConstants {
    /** Control Library Type. */
    export enum ControlLibraryType {
      PREDEFINED = 'predefined',
      CUSTOM = 'custom',
    }
  }

  /** Parameters for the `listControlLibraries` operation. */
  export interface ListControlLibrariesParams {
    /** Instance id. */
    instanceId: string;
    /** The transaction ID for the request in UUID v4 format. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `replaceCustomControlLibrary` operation. */
  export interface ReplaceCustomControlLibraryParams {
    /** The control library ID. */
    controlLibrariesId: string;
    /** Instance id. */
    instanceId: string;
    /** Control Library ID. */
    id?: string;
    /** Account ID. */
    accountId?: string;
    /** Control Library name. */
    controlLibraryName?: string;
    /** Control Library Description. */
    controlLibraryDescription?: string;
    /** Control Library Type. */
    controlLibraryType?: ReplaceCustomControlLibraryConstants.ControlLibraryType | string;
    /** Version group label. */
    versionGroupLabel?: string;
    /** Control Library Version. */
    controlLibraryVersion?: string;
    /** Latest. */
    latest?: boolean;
    /** Number of controls. */
    controlsCount?: number;
    /** Controls. */
    controls?: ControlsInControlLibRequestPayload[];
    /** The transaction ID for the request in UUID v4 format. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `replaceCustomControlLibrary` operation. */
  export namespace ReplaceCustomControlLibraryConstants {
    /** Control Library Type. */
    export enum ControlLibraryType {
      PREDEFINED = 'predefined',
      CUSTOM = 'custom',
    }
  }

  /** Parameters for the `getControlLibrary` operation. */
  export interface GetControlLibraryParams {
    /** The control library ID. */
    controlLibrariesId: string;
    /** Instance id. */
    instanceId: string;
    /** The transaction ID for the request in UUID v4 format. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteCustomControllibrary` operation. */
  export interface DeleteCustomControllibraryParams {
    /** The control library ID. */
    controlLibrariesId: string;
    /** Instance id. */
    instanceId: string;
    /** The transaction ID for the request in UUID v4 format. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createScan` operation. */
  export interface CreateScanParams {
    /** Instance id. */
    instanceId: string;
    /** Attachment ID. */
    attachmentId?: string;
    /** The transaction ID for the request in UUID v4 format. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** The attachment details of a profile. */
  export interface AttachmentPayload {
    /** attachment id. */
    id?: string;
    /** account id. */
    account_id?: string;
    /** scope payload. */
    included_scope?: ScopePayload;
    /** exclusions. */
    exclusions?: ScopePayload[];
    /** created by. */
    created_by?: string;
    /** created on. */
    created_on?: string;
    /** updated by. */
    updated_by?: string;
    /** updated on. */
    updated_on?: string;
    /** status. */
    status?: string;
    /** attachment parameters. */
    attachment_parameters?: ParameterDetails[];
    /** payload of the attachments notifications. */
    attachment_notifications?: AttachmentsNotificationsPayload;
  }

  /** request body of attachments of a profile. */
  export interface AttachmentProfileRequest {
    /** the attachments of a profile. */
    attachments?: AttachmentPayload[];
  }

  /** Response body for attachment profile. */
  export interface AttachmentProfileResponse {
    /** Profile id. */
    profile_id?: string;
    /** List of attachments. */
    attachments?: AttachmentResponse[];
  }

  /** attachment details for profile. */
  export interface AttachmentResponse {
    /** Attachment id. */
    id?: string;
    /** Account id. */
    account_id?: string;
    /** scope payload. */
    included_scope?: ScopePayload;
    /** Excluded scopes. */
    exclusions?: ScopePayload[];
    /** Created by. */
    created_by?: string;
    /** Created on. */
    created_on?: string;
    /** Updated by. */
    updated_by?: string;
    /** Updated on. */
    updated_on?: string;
    /** Status. */
    status?: string;
    /** Attachment parameters. */
    attachment_parameters?: ParameterDetails[];
    /** Last scan id. */
    last_scan?: string;
    /** Last scan status. */
    last_scan_status?: string;
    /** Last scan time. */
    last_scan_time?: string;
  }

  /** Control Docs. */
  export interface ControlDocs {
    /** ID of Control Docs. */
    control_docs_id?: string;
    /** Type of Control Docs. */
    control_docs_type?: string;
  }

  /** ControlLibraryListResponse. */
  export interface ControlLibraryListResponse {
    /** The ID of the control library. */
    id?: string;
    /** Account ID. */
    account_id?: string;
    /** The Control Library Name. */
    control_library_name?: string;
    /** Control Library Description. */
    control_library_description?: string;
    /** Control Library Type. */
    control_library_type?: string;
    /** Created On. */
    created_on?: string;
    /** Created By. */
    created_by?: string;
    /** Updated ON. */
    updated_on?: string;
    /** Updated By. */
    updated_by?: string;
    /** Version Group Label. */
    version_group_label?: string;
    /** Control Library Version. */
    control_library_version?: string;
    /** Latest. */
    latest?: boolean;
    /** Number of controls. */
    controls_count?: number;
  }

  /** Request payload of the Control Library. */
  export interface ControlLibraryRequest {
    /** Control Library ID. */
    id?: string;
    /** Account ID. */
    account_id?: string;
    /** Control Library name. */
    control_library_name?: string;
    /** Control Library Description. */
    control_library_description?: string;
    /** Control Library Type. */
    control_library_type?: string;
    /** Version group label. */
    version_group_label?: string;
    /** Control Library Version. */
    control_library_version?: string;
    /** Latest. */
    latest?: boolean;
    /** Number of controls. */
    controls_count?: number;
    /** Controls. */
    controls?: ControlsInControlLibRequestPayload[];
  }

  /** The control specifications for a control library. */
  export interface ControlSpecifications {
    /** Control Specification ID. */
    id?: string;
    /** Responsibility. */
    responsibility?: string;
    /** Component ID. */
    component_id?: string;
    /** Environment of control specifications. */
    environment?: string;
    /** Description of control specifications. */
    description?: string;
    /** Number of Assessment. */
    assessments_count?: number;
    /** Assessments. */
    assessments?: ImplementationPayload[];
  }

  /** The control details of a control library. */
  export interface ControlsInControlLibRequestPayload {
    /** The ID of the control library that contains the profile. */
    control_name?: string;
    /** The control name. */
    control_id?: string;
    /** The control description. */
    control_description?: string;
    /** control category. */
    control_category?: string;
    /** control parent. */
    control_parent?: string;
    /** Control severity. */
    control_severity?: string;
    /** Control Tags. */
    control_tags?: string[];
    /** control specifications. */
    control_specifications?: ControlSpecifications[];
    /** Control Docs. */
    control_docs?: ControlDocs;
    /** Status. */
    status?: string;
  }

  /** Response schema for creating a scan. */
  export interface CreateScanResponse {
    /** Scan ID. */
    id?: string;
    /** Account ID. */
    account_id?: string;
    /** Attachment ID. */
    attachment_id?: string;
    /** Report ID. */
    report_id?: string;
    /** Status. */
    status?: string;
    /** Last Scan Time. */
    last_scan_time?: string;
    /** Next Scan Time. */
    next_scan_time?: string;
    /** Type of Scan. */
    scan_type?: string;
    /** Occurance of Scan. */
    occurence?: number;
  }

  /** The control details of a profile. */
  export interface DefaultParameters {
    /** The type of the implementation. */
    assessment_type?: string;
    /** The implementation ID of the parameter. */
    assessment_id?: string;
    /** The parameter name. */
    parameter_name?: string;
    /** The default value of the parameter. */
    parameter_default_value?: string;
    /** The parameter display name. */
    parameter_display_name?: string;
    /** The parameter type. */
    parameter_type?: string;
  }

  /** The implementation details of a control library. */
  export interface ImplementationPayload {
    /** Assessment ID. */
    assessment_id?: string;
    /** Method of Assessment. */
    assessment_method?: string;
    /** Type of Assessment. */
    assessment_type?: string;
    /** Description of Assessment. */
    assessment_description?: string;
    /** Parameter Count. */
    parameter_count?: number;
    /** Parameters. */
    parameters?: ParameterInfo[];
  }

  /** Reference page first. */
  export interface PageRefFirst {
    /** Reference URL. */
    href?: string;
  }

  /** Reference page next. */
  export interface PageRefNext {
    /** Reference URL. */
    href?: string;
    /** Reference start. */
    start?: string;
  }

  /** The details of the parameter. */
  export interface ParameterDetails {
    /** The name of the parameter. */
    parameter_name?: string;
    /** The display name of the parameter. */
    parameter_display_name?: string;
    /** the type of the parameter. */
    parameter_type?: string;
    /** The value of the parameter. */
    parameter_value?: string;
    /** The assessment type of the parameter. */
    assessment_type?: string;
    /** The Assessment ID of the parameter. */
    assessment_id?: string;
    /** Parameters. */
    parameters?: ParameterInfo[];
  }

  /** The parameters details. */
  export interface ParameterInfo {
    /** Parameter Name. */
    parameter_name?: string;
    /** Parameter Display Name. */
    parameter_display_name?: string;
    /** Parameter Type. */
    parameter_type?: string;
  }

  /** The control details of a profile. */
  export interface ProfileControlsInRequest {
    /** The ID of the control library that contains the profile. */
    control_library_id?: string;
    /** The control ID. */
    control_id?: string;
  }

  /** The control details for a profile. */
  export interface ProfileControlsInResponse {
    /** The ID of the control library that contains a profile. */
    control_library_id?: string;
    /** control id. */
    control_id?: string;
    /** control library version. */
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
    /** Control Docs. */
    control_docs?: ControlDocs;
    /** control specifications. */
    control_specifications?: ControlSpecifications[];
  }

  /** The default parameters of a profile. */
  export interface ProfileDefaultParametersResponse {
    /** id of parameter. */
    id?: string;
    /** default parameters. */
    default_parameters?: DefaultParameters[];
  }

  /** Response body of the Profile. */
  export interface ProfileResponse {
    /** Profile ID. */
    id?: string;
    /** Profile name. */
    profile_name?: string;
    /** Profile Description. */
    profile_description?: string;
    /** Profile Type. */
    profile_type?: string;
    /** Profile Version. */
    profile_version?: string;
    /** Version Group Label. */
    version_group_label?: string;
    /** Latest. */
    latest?: boolean;
    /** Created By. */
    created_by?: string;
    /** Created On. */
    created_on?: string;
    /** Updated by. */
    updated_by?: string;
    /** Updated On. */
    updated_on?: string;
    /** Number of Controls. */
    controls_count?: number;
    /** Number of attachments. */
    attachments_count?: number;
    /** Control IDs. */
    controls?: ProfileControlsInResponse[];
    /** The default parameters of a profile. */
    default_parameters?: DefaultParameters[];
  }

  /** scope payload. */
  export interface ScopePayload {
    /** scope id. */
    scope_id?: string;
    /** Scope type. */
    scope_type?: string;
  }

  /** payload of the attachments notifications. */
  export interface AttachmentsNotificationsPayload {
    /** enabled notifications. */
    enabled?: boolean;
    /** failed controls. */
    controls?: FailedControls;
  }

  /** failed controls. */
  export interface FailedControls {
    /** threshold limit. */
    threshold_limit?: number;
    /** failed control ids. */
    failed_control_ids?: string[];
  }

  /** All the attachments present in a profile. */
  export interface GetAllAttachmnetsForProfileRespBody {
    /** Number of attachments. */
    total_count?: number;
    /** Limit on Attachments. */
    limit?: number;
    /** Reference page first. */
    first?: PageRefFirst;
    /** Reference page next. */
    next?: PageRefNext;
    /** Profile ID. */
    profile_id?: string;
    /** Account ID. */
    account_id?: string;
    /** The Control Library ID. */
    control_libraries?: ControlLibraryListResponse[];
    /** the attachments of a profile. */
    attachments?: AttachmentProfileRequest[];
  }

  /** response body of control libraries. */
  export interface GetAllControlLibrariesRespBody {
    /** number of control libraries. */
    total_count?: number;
    /** limit. */
    limit?: number;
    /** Reference page first. */
    first?: PageRefFirst;
    /** Reference page next. */
    next?: PageRefNext;
    /** control libraries. */
    control_libraries?: ControlLibraryListResponse[];
  }

  /** Response body of get All profiles. */
  export interface GetAllProfilesRespBody {
    /** Number of profiles. */
    total_count?: number;
    /** limit. */
    limit?: number;
    /** Reference page first. */
    first?: PageRefFirst;
    /** Reference page next. */
    next?: PageRefNext;
    /** Profiles. */
    profiles?: ListProfilesResponseStructure[];
  }

  /** ListProfilesResponseStructure. */
  export interface ListProfilesResponseStructure {
    /** id of the profile. */
    id?: string;
    /** name of the profile. */
    profile_name?: string;
    /** description of the profile. */
    profile_description?: string;
    /** type of the profile. */
    profile_type?: string;
    /** version of the profile. */
    profile_version?: string;
    /** version group label. */
    version_group_label?: string;
    /** latest. */
    latest?: boolean;
    /** created by. */
    created_by?: string;
    /** created on. */
    created_on?: string;
    /** updated by. */
    updated_by?: string;
    /** updated on. */
    updated_on?: string;
    /** No of controls. */
    controls_count?: number;
    /** No of attachments. */
    attachments_count?: number;
  }
}

export = ComplianceV2;
