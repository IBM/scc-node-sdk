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
 * IBM OpenAPI SDK Code Generator Version: 3.76.0-ad3e6f96-20230724-172814
 */

/* eslint-disable max-classes-per-file */
/* eslint-disable no-await-in-loop */

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import {
  Authenticator,
  BaseService,
  getAuthenticatorFromEnvironment,
  validateParams,
  UserOptions,
} from 'ibm-cloud-sdk-core';
import { constructServiceUrl } from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';
import { getQueryParam } from 'ibm-cloud-sdk-core';

/**
 * Security and Compliance Center API
 *
 * API Version: 4.0.0
 */

class SecurityAndComplianceCenterApiV3 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://us-south.compliance.cloud.ibm.com/instances/instance_id/v3';

  static DEFAULT_SERVICE_NAME: string = 'security_and_compliance_center_api';

  static PARAMETERIZED_SERVICE_URL: string = 'https://{region}.cloud.ibm.com/instances/{instance_id}/v3';

  private static defaultUrlVariables = new Map([
    ['region', 'us-south.compliance'],
    ['instance_id', 'instance_id'],
  ]);

  /**
   * Constructs a service URL by formatting the parameterized service URL.
   *
   * The parameterized service URL is:
   * 'https://{region}.cloud.ibm.com/instances/{instance_id}/v3'
   *
   * The default variable values are:
   * - 'region': 'us-south.compliance'
   * - 'instance_id': 'instance_id'
   *
   * @param {Map<string, string>} | null providedUrlVariables Map from variable names to desired values.
   *  If a variable is not provided in this map,
   *  the default variable value will be used instead.
   * @returns {string} The formatted URL with all variable placeholders replaced by values.
   */
  static constructServiceUrl(providedUrlVariables: Map<string, string> | null): string {
    return constructServiceUrl(
      SecurityAndComplianceCenterApiV3.PARAMETERIZED_SERVICE_URL, 
      SecurityAndComplianceCenterApiV3.defaultUrlVariables, 
      providedUrlVariables
    );
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
   * @param {string} [options.serviceUrl] - The URL for the service
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
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service. The base url may differ between IBM Cloud regions.
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
   * settings
   ************************/

  /**
   * Get settings.
   *
   * Retrieve the settings of your service instance.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request,
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.xRequestId] - The supplied or generated value of this header is logged for a request, and
   * repeated in a response header  for the corresponding response.  The same value is not used for downstream requests
   * and retries of those requests.  If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Settings>>}
   */
  public getSettings(
    params?: SecurityAndComplianceCenterApiV3.GetSettingsParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Settings>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['xCorrelationId', 'xRequestId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(
      SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME,
      'v3',
      'getSettings'
    );

    const parameters = {
      options: {
        url: '/settings',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-Id': _params.xCorrelationId,
            'X-Request-Id': _params.xRequestId,
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
   * @param {Object} [params] - The parameters to send to the service.
   * @param {EventNotifications} [params.eventNotifications] - The Event Notifications settings.
   * @param {ObjectStorage} [params.objectStorage] - The Cloud Object Storage settings.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request,
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.xRequestId] - The supplied or generated value of this header is logged for a request, and
   * repeated in a response header  for the corresponding response.  The same value is not used for downstream requests
   * and retries of those requests.  If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Settings>>}
   */
  public updateSettings(
    params?: SecurityAndComplianceCenterApiV3.UpdateSettingsParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Settings>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['eventNotifications', 'objectStorage', 'xCorrelationId', 'xRequestId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'event_notifications': _params.eventNotifications,
      'object_storage': _params.objectStorage,
    };

    const sdkHeaders = getSdkHeaders(
      SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME,
      'v3',
      'updateSettings'
    );

    const parameters = {
      options: {
        url: '/settings',
        method: 'PATCH',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Correlation-Id': _params.xCorrelationId,
            'X-Request-Id': _params.xRequestId,
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
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request,
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.xRequestId] - The supplied or generated value of this header is logged for a request, and
   * repeated in a response header  for the corresponding response.  The same value is not used for downstream requests
   * and retries of those requests.  If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.TestEvent>>}
   */
  public postTestEvent(
    params?: SecurityAndComplianceCenterApiV3.PostTestEventParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.TestEvent>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['xCorrelationId', 'xRequestId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(
      SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME,
      'v3',
      'postTestEvent'
    );

    const parameters = {
      options: {
        url: '/test_event',
        method: 'POST',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-Id': _params.xCorrelationId,
            'X-Request-Id': _params.xRequestId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * controlLibraries
   ************************/

  /**
   * Get control libraries.
   *
   * Retrieve all of the control libraries that are available in your account, including predefined, and custom
   * libraries.
   *
   * With Security and Compliance Center, you can create a custom control library that is specific to your
   * organization's needs.  You define the controls and specifications before you map previously created assessments.
   * Each control has several specifications  and assessments that are mapped to it. A specification is a defined
   * requirement that is specific to a component. An assessment, or several,  are mapped to each specification with a
   * detailed evaluation that is done to check whether the specification is compliant. For more information, see
   * [Creating custom libraries](/docs/security-compliance?topic=security-compliance-custom-library).
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.xRequestId] - The supplied or generated value of this header is logged for a request and
   * repeated in a response header for the corresponding response. The same value is not used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {number} [params.limit] - The field that indicates how many resources to return, unless the response is the
   * last page of resources.
   * @param {string} [params.controlLibraryType] - The field that indicate how you want the resources to be filtered by.
   * @param {string} [params.start] - Determine what resource to start the page on or after.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ControlLibraryCollection>>}
   */
  public listControlLibraries(
    params?: SecurityAndComplianceCenterApiV3.ListControlLibrariesParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ControlLibraryCollection>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['xCorrelationId', 'xRequestId', 'limit', 'controlLibraryType', 'start', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'limit': _params.limit,
      'control_library_type': _params.controlLibraryType,
      'start': _params.start,
    };

    const sdkHeaders = getSdkHeaders(
      SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME,
      'v3',
      'listControlLibraries'
    );

    const parameters = {
      options: {
        url: '/control_libraries',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
            'X-Request-ID': _params.xRequestId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create a custom control library.
   *
   * Create a custom control library that is specific to your organization's needs.
   *
   * With Security and Compliance Center, you can create a custom control library that is specific to your
   * organization's needs.  You define the controls and specifications before you map previously created assessments.
   * Each control has several specifications  and assessments that are mapped to it. A specification is a defined
   * requirement that is specific to a component. An assessment, or several,  are mapped to each specification with a
   * detailed evaluation that is done to check whether the specification is compliant. For more information, see
   * [Creating custom libraries](/docs/security-compliance?topic=security-compliance-custom-library).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.controlLibraryName - The control library name.
   * @param {string} params.controlLibraryDescription - The control library description.
   * @param {string} params.controlLibraryType - The control library type.
   * @param {ControlsInControlLib[]} params.controls - The controls.
   * @param {string} [params.versionGroupLabel] - The version group label.
   * @param {string} [params.controlLibraryVersion] - The control library version.
   * @param {boolean} [params.latest] - The latest control library version.
   * @param {number} [params.controlsCount] - The number of controls.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.xRequestId] - The supplied or generated value of this header is logged for a request and
   * repeated in a response header for the corresponding response. The same value is not used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ControlLibrary>>}
   */
  public createCustomControlLibrary(
    params: SecurityAndComplianceCenterApiV3.CreateCustomControlLibraryParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ControlLibrary>> {
    const _params = { ...params };
    const _requiredParams = ['controlLibraryName', 'controlLibraryDescription', 'controlLibraryType', 'controls'];
    const _validParams = ['controlLibraryName', 'controlLibraryDescription', 'controlLibraryType', 'controls', 'versionGroupLabel', 'controlLibraryVersion', 'latest', 'controlsCount', 'xCorrelationId', 'xRequestId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'control_library_name': _params.controlLibraryName,
      'control_library_description': _params.controlLibraryDescription,
      'control_library_type': _params.controlLibraryType,
      'controls': _params.controls,
      'version_group_label': _params.versionGroupLabel,
      'control_library_version': _params.controlLibraryVersion,
      'latest': _params.latest,
      'controls_count': _params.controlsCount,
    };

    const sdkHeaders = getSdkHeaders(
      SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME,
      'v3',
      'createCustomControlLibrary'
    );

    const parameters = {
      options: {
        url: '/control_libraries',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
            'X-Request-ID': _params.xRequestId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a control library.
   *
   * Delete a custom control library by providing the control library ID.  You can find this ID by looking in the
   * Security and Compliance Center UI.
   *
   * With Security and Compliance Center, you can manage a custom control library  that is specific to your
   * organization's needs. Each control has several specifications  and assessments that are mapped to it.  For more
   * information, see [Creating custom libraries](/docs/security-compliance?topic=security-compliance-custom-library).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.controlLibrariesId - The control library ID.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.xRequestId] - The supplied or generated value of this header is logged for a request and
   * repeated in a response header for the corresponding response. The same value is not used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ControlLibraryDelete>>}
   */
  public deleteCustomControlLibrary(
    params: SecurityAndComplianceCenterApiV3.DeleteCustomControlLibraryParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ControlLibraryDelete>> {
    const _params = { ...params };
    const _requiredParams = ['controlLibrariesId'];
    const _validParams = ['controlLibrariesId', 'xCorrelationId', 'xRequestId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'control_libraries_id': _params.controlLibrariesId,
    };

    const sdkHeaders = getSdkHeaders(
      SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME,
      'v3',
      'deleteCustomControlLibrary'
    );

    const parameters = {
      options: {
        url: '/control_libraries/{control_libraries_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
            'X-Request-ID': _params.xRequestId,
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
   * organization's needs.  You define the controls and specifications before you map previously created assessments.
   * Each control has several specifications  and assessments that are mapped to it. A specification is a defined
   * requirement that is specific to a component. An assessment, or several,  are mapped to each specification with a
   * detailed evaluation that is done to check whether the specification is compliant. For more information, see
   * [Creating custom libraries](/docs/security-compliance?topic=security-compliance-custom-library).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.controlLibrariesId - The control library ID.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.xRequestId] - The supplied or generated value of this header is logged for a request and
   * repeated in a response header for the corresponding response. The same value is not used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ControlLibrary>>}
   */
  public getControlLibrary(
    params: SecurityAndComplianceCenterApiV3.GetControlLibraryParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ControlLibrary>> {
    const _params = { ...params };
    const _requiredParams = ['controlLibrariesId'];
    const _validParams = ['controlLibrariesId', 'xCorrelationId', 'xRequestId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'control_libraries_id': _params.controlLibrariesId,
    };

    const sdkHeaders = getSdkHeaders(
      SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME,
      'v3',
      'getControlLibrary'
    );

    const parameters = {
      options: {
        url: '/control_libraries/{control_libraries_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
            'X-Request-ID': _params.xRequestId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update a control library.
   *
   * Update a custom control library by providing the control library ID. You can find this ID in the Security and
   * Compliance Center UI.
   *
   * With Security and Compliance Center, you can create and update a custom control library that is specific to your
   * organization's needs.  You define the controls and specifications before you map previously created assessments.
   * Each control has several specifications  and assessments that are mapped to it. For more information, see [Creating
   * custom libraries](/docs/security-compliance?topic=security-compliance-custom-library).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.controlLibrariesId - The control library ID.
   * @param {string} [params.id] - The control library ID.
   * @param {string} [params.accountId] - The account ID.
   * @param {string} [params.controlLibraryName] - The control library name.
   * @param {string} [params.controlLibraryDescription] - The control library description.
   * @param {string} [params.controlLibraryType] - The control library type.
   * @param {string} [params.versionGroupLabel] - The version group label.
   * @param {string} [params.controlLibraryVersion] - The control library version.
   * @param {string} [params.createdOn] - The date when the control library was created.
   * @param {string} [params.createdBy] - The user who created the control library.
   * @param {string} [params.updatedOn] - The date when the control library was updated.
   * @param {string} [params.updatedBy] - The user who updated the control library.
   * @param {boolean} [params.latest] - The latest version of the control library.
   * @param {boolean} [params.hierarchyEnabled] - The indication of whether hierarchy is enabled for the control
   * library.
   * @param {number} [params.controlsCount] - The number of controls.
   * @param {number} [params.controlParentsCount] - The number of parent controls in the control library.
   * @param {ControlsInControlLib[]} [params.controls] - The list of controls in a control library.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.xRequestId] - The supplied or generated value of this header is logged for a request and
   * repeated in a response header for the corresponding response. The same value is not used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ControlLibrary>>}
   */
  public replaceCustomControlLibrary(
    params: SecurityAndComplianceCenterApiV3.ReplaceCustomControlLibraryParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ControlLibrary>> {
    const _params = { ...params };
    const _requiredParams = ['controlLibrariesId'];
    const _validParams = ['controlLibrariesId', 'id', 'accountId', 'controlLibraryName', 'controlLibraryDescription', 'controlLibraryType', 'versionGroupLabel', 'controlLibraryVersion', 'createdOn', 'createdBy', 'updatedOn', 'updatedBy', 'latest', 'hierarchyEnabled', 'controlsCount', 'controlParentsCount', 'controls', 'xCorrelationId', 'xRequestId', 'headers'];
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
      'created_on': _params.createdOn,
      'created_by': _params.createdBy,
      'updated_on': _params.updatedOn,
      'updated_by': _params.updatedBy,
      'latest': _params.latest,
      'hierarchy_enabled': _params.hierarchyEnabled,
      'controls_count': _params.controlsCount,
      'control_parents_count': _params.controlParentsCount,
      'controls': _params.controls,
    };

    const path = {
      'control_libraries_id': _params.controlLibrariesId,
    };

    const sdkHeaders = getSdkHeaders(
      SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME,
      'v3',
      'replaceCustomControlLibrary'
    );

    const parameters = {
      options: {
        url: '/control_libraries/{control_libraries_id}',
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
            'X-Correlation-ID': _params.xCorrelationId,
            'X-Request-ID': _params.xRequestId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * profiles
   ************************/

  /**
   * Get all profiles.
   *
   * View all of the predefined and custom profiles that are available in your account.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request,
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests,
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.xRequestId] - The supplied or generated value of this header is logged for a request and
   * repeated in a response header for the corresponding response. The same value is not used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {number} [params.limit] - The indication of how many resources to return, unless the response is the last
   * page of resources.
   * @param {string} [params.profileType] - The field that indicate how you want the resources to be filtered by.
   * @param {string} [params.start] - Determine what resource to start the page on or after.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProfileCollection>>}
   */
  public listProfiles(
    params?: SecurityAndComplianceCenterApiV3.ListProfilesParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProfileCollection>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['xCorrelationId', 'xRequestId', 'limit', 'profileType', 'start', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'limit': _params.limit,
      'profile_type': _params.profileType,
      'start': _params.start,
    };

    const sdkHeaders = getSdkHeaders(
      SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME,
      'v3',
      'listProfiles'
    );

    const parameters = {
      options: {
        url: '/profiles',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
            'X-Request-ID': _params.xRequestId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create a custom profile.
   *
   * Create a custom profile that is specific to your usecase, by using an existing library as a starting point.  For
   * more information, see [Building custom
   * profiles](https://test.cloud.ibm.com/docs/security-compliance?topic=security-compliance-build-custom-profiles&interface=api).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.profileName - The name of the profile.
   * @param {string} params.profileDescription - The description of the profile.
   * @param {string} params.profileType - The profile type.
   * @param {ProfileControlsPrototype[]} params.controls - The controls that are in the profile.
   * @param {DefaultParametersPrototype[]} params.defaultParameters - The default parameters of the profile.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request,
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests,
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.xRequestId] - The supplied or generated value of this header is logged for a request and
   * repeated in a response header for the corresponding response. The same value is not used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Profile>>}
   */
  public createProfile(
    params: SecurityAndComplianceCenterApiV3.CreateProfileParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Profile>> {
    const _params = { ...params };
    const _requiredParams = ['profileName', 'profileDescription', 'profileType', 'controls', 'defaultParameters'];
    const _validParams = ['profileName', 'profileDescription', 'profileType', 'controls', 'defaultParameters', 'xCorrelationId', 'xRequestId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'profile_name': _params.profileName,
      'profile_description': _params.profileDescription,
      'profile_type': _params.profileType,
      'controls': _params.controls,
      'default_parameters': _params.defaultParameters,
    };

    const sdkHeaders = getSdkHeaders(
      SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME,
      'v3',
      'createProfile'
    );

    const parameters = {
      options: {
        url: '/profiles',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
            'X-Request-ID': _params.xRequestId,
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
   * Delete a custom profile by providing the profile ID.  You can find the ID in the Security and Compliance Center UI.
   * For more information about managing your custom profiles, see [Building custom
   * profiles](https://test.cloud.ibm.com/docs/security-compliance?topic=security-compliance-build-custom-profiles&interface=api).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.profilesId - The profile ID.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.xRequestId] - The supplied or generated value of this header is logged for a request and
   * repeated in a response header for the corresponding response. The same value is not used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Profile>>}
   */
  public deleteCustomProfile(
    params: SecurityAndComplianceCenterApiV3.DeleteCustomProfileParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Profile>> {
    const _params = { ...params };
    const _requiredParams = ['profilesId'];
    const _validParams = ['profilesId', 'xCorrelationId', 'xRequestId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'profiles_id': _params.profilesId,
    };

    const sdkHeaders = getSdkHeaders(
      SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME,
      'v3',
      'deleteCustomProfile'
    );

    const parameters = {
      options: {
        url: '/profiles/{profiles_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
            'X-Request-ID': _params.xRequestId,
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
   * View the details of a profile by providing the profile ID.  You can find the profile ID in the Security and
   * Compliance Center UI. For more information, see [Building custom
   * profiles](https://test.cloud.ibm.com/docs/security-compliance?topic=security-compliance-build-custom-profiles&interface=api).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.profilesId - The profile ID.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.xRequestId] - The supplied or generated value of this header is logged for a request and
   * repeated in a response header for the corresponding response. The same value is not used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Profile>>}
   */
  public getProfile(
    params: SecurityAndComplianceCenterApiV3.GetProfileParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Profile>> {
    const _params = { ...params };
    const _requiredParams = ['profilesId'];
    const _validParams = ['profilesId', 'xCorrelationId', 'xRequestId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'profiles_id': _params.profilesId,
    };

    const sdkHeaders = getSdkHeaders(
      SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME,
      'v3',
      'getProfile'
    );

    const parameters = {
      options: {
        url: '/profiles/{profiles_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
            'X-Request-ID': _params.xRequestId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update a profile.
   *
   * Update the details of a custom profile. With Security and Compliance Center, you can manage  a profile that is
   * specific to your usecase, by using an existing library as a starting point.  For more information, see [Building
   * custom
   * profiles](https://test.cloud.ibm.com/docs/security-compliance?topic=security-compliance-build-custom-profiles&interface=api).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.profilesId - The profile ID.
   * @param {string} params.profileName - The name of the profile.
   * @param {string} params.profileDescription - The description of the profile.
   * @param {string} params.profileType - The profile type.
   * @param {ProfileControlsPrototype[]} params.controls - The controls that are in the profile.
   * @param {DefaultParametersPrototype[]} params.defaultParameters - The default parameters of the profile.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.xRequestId] - The supplied or generated value of this header is logged for a request and
   * repeated in a response header for the corresponding response. The same value is not used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Profile>>}
   */
  public replaceProfile(
    params: SecurityAndComplianceCenterApiV3.ReplaceProfileParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Profile>> {
    const _params = { ...params };
    const _requiredParams = ['profilesId', 'profileName', 'profileDescription', 'profileType', 'controls', 'defaultParameters'];
    const _validParams = ['profilesId', 'profileName', 'profileDescription', 'profileType', 'controls', 'defaultParameters', 'xCorrelationId', 'xRequestId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'profile_name': _params.profileName,
      'profile_description': _params.profileDescription,
      'profile_type': _params.profileType,
      'controls': _params.controls,
      'default_parameters': _params.defaultParameters,
    };

    const path = {
      'profiles_id': _params.profilesId,
    };

    const sdkHeaders = getSdkHeaders(
      SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME,
      'v3',
      'replaceProfile'
    );

    const parameters = {
      options: {
        url: '/profiles/{profiles_id}',
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
            'X-Correlation-ID': _params.xCorrelationId,
            'X-Request-ID': _params.xRequestId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * rules
   ************************/

  /**
   * List all rules.
   *
   * Retrieve all the rules that you use to target the exact configuration properties  that you need to ensure are
   * compliant. For more information, see [Defining custom
   * rules](https://test.cloud.ibm.com/docs/security-compliance?topic=security-compliance-rules-define).
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.xRequestId] - The supplied or generated value of this header is logged for a request and
   * repeated in a response header  for the corresponding response.  The same value is not used for downstream requests
   * and retries of those requests.  If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.type] - The list of only user-defined, or system-defined rules.
   * @param {string} [params.search] - The indication of whether to search for rules with a specific string string in
   * the name, description, or labels.
   * @param {string} [params.serviceName] - Searches for rules targeting corresponding service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.RulesPageBase>>}
   */
  public listRules(
    params?: SecurityAndComplianceCenterApiV3.ListRulesParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.RulesPageBase>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['xCorrelationId', 'xRequestId', 'type', 'search', 'serviceName', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'type': _params.type,
      'search': _params.search,
      'service_name': _params.serviceName,
    };

    const sdkHeaders = getSdkHeaders(
      SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME,
      'v3',
      'listRules'
    );

    const parameters = {
      options: {
        url: '/rules',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-Id': _params.xCorrelationId,
            'X-Request-Id': _params.xRequestId,
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
   * rules](https://test.cloud.ibm.com/docs/security-compliance?topic=security-compliance-rules-define).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.description - The rule description.
   * @param {Target} params.target - The rule target.
   * @param {RequiredConfig} params.requiredConfig - The required configurations.
   * @param {string} [params.type] - The rule type (user_defined or system_defined).
   * @param {string} [params.version] - The rule version number.
   * @param {Import} [params._import] - The collection of import parameters.
   * @param {string[]} [params.labels] - The list of labels that correspond to a rule.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.xRequestId] - The supplied or generated value of this header is logged for a request and
   * repeated in a response header  for the corresponding response.  The same value is not used for downstream requests
   * and retries of those requests.  If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Rule>>}
   */
  public createRule(
    params: SecurityAndComplianceCenterApiV3.CreateRuleParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Rule>> {
    const _params = { ...params };
    const _requiredParams = ['description', 'target', 'requiredConfig'];
    const _validParams = ['description', 'target', 'requiredConfig', 'type', 'version', '_import', 'labels', 'xCorrelationId', 'xRequestId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'description': _params.description,
      'target': _params.target,
      'required_config': _params.requiredConfig,
      'type': _params.type,
      'version': _params.version,
      'import': _params._import,
      'labels': _params.labels,
    };

    const sdkHeaders = getSdkHeaders(
      SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME,
      'v3',
      'createRule'
    );

    const parameters = {
      options: {
        url: '/rules',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Correlation-Id': _params.xCorrelationId,
            'X-Request-Id': _params.xRequestId,
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
   * custom rules](https://test.cloud.ibm.com/docs/security-compliance?topic=security-compliance-rules-define).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.ruleId - The ID of the corresponding rule.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.xRequestId] - The supplied or generated value of this header is logged for a request and
   * repeated in a response header  for the corresponding response.  The same value is not used for downstream requests
   * and retries of those requests.  If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.EmptyObject>>}
   */
  public deleteRule(
    params: SecurityAndComplianceCenterApiV3.DeleteRuleParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['ruleId'];
    const _validParams = ['ruleId', 'xCorrelationId', 'xRequestId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'rule_id': _params.ruleId,
    };

    const sdkHeaders = getSdkHeaders(
      SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME,
      'v3',
      'deleteRule'
    );

    const parameters = {
      options: {
        url: '/rules/{rule_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'X-Correlation-Id': _params.xCorrelationId,
            'X-Request-Id': _params.xRequestId,
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
   * rules](https://test.cloud.ibm.com/docs/security-compliance?topic=security-compliance-rules-define).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.ruleId - The ID of the corresponding rule.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.xRequestId] - The supplied or generated value of this header is logged for a request and
   * repeated in a response header  for the corresponding response.  The same value is not used for downstream requests
   * and retries of those requests.  If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Rule>>}
   */
  public getRule(
    params: SecurityAndComplianceCenterApiV3.GetRuleParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Rule>> {
    const _params = { ...params };
    const _requiredParams = ['ruleId'];
    const _validParams = ['ruleId', 'xCorrelationId', 'xRequestId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'rule_id': _params.ruleId,
    };

    const sdkHeaders = getSdkHeaders(
      SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME,
      'v3',
      'getRule'
    );

    const parameters = {
      options: {
        url: '/rules/{rule_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-Id': _params.xCorrelationId,
            'X-Request-Id': _params.xRequestId,
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
   * rules](https://test.cloud.ibm.com/docs/security-compliance?topic=security-compliance-rules-define).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.ruleId - The ID of the corresponding rule.
   * @param {string} params.ifMatch - This field compares a supplied `Etag` value with the version that is stored for
   * the requested resource. If the values match, the server allows the request method to continue.
   *
   * To find the `Etag` value, run a GET request on the resource that you want to modify, and check the response
   * headers.
   * @param {string} params.description - The rule description.
   * @param {Target} params.target - The rule target.
   * @param {RequiredConfig} params.requiredConfig - The required configurations.
   * @param {string} [params.type] - The rule type (user_defined or system_defined).
   * @param {string} [params.version] - The rule version number.
   * @param {Import} [params._import] - The collection of import parameters.
   * @param {string[]} [params.labels] - The list of labels that correspond to a rule.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.xRequestId] - The supplied or generated value of this header is logged for a request and
   * repeated in a response header  for the corresponding response.  The same value is not used for downstream requests
   * and retries of those requests.  If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Rule>>}
   */
  public replaceRule(
    params: SecurityAndComplianceCenterApiV3.ReplaceRuleParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Rule>> {
    const _params = { ...params };
    const _requiredParams = ['ruleId', 'ifMatch', 'description', 'target', 'requiredConfig'];
    const _validParams = ['ruleId', 'ifMatch', 'description', 'target', 'requiredConfig', 'type', 'version', '_import', 'labels', 'xCorrelationId', 'xRequestId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'description': _params.description,
      'target': _params.target,
      'required_config': _params.requiredConfig,
      'type': _params.type,
      'version': _params.version,
      'import': _params._import,
      'labels': _params.labels,
    };

    const path = {
      'rule_id': _params.ruleId,
    };

    const sdkHeaders = getSdkHeaders(
      SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME,
      'v3',
      'replaceRule'
    );

    const parameters = {
      options: {
        url: '/rules/{rule_id}',
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
            'X-Correlation-Id': _params.xCorrelationId,
            'X-Request-Id': _params.xRequestId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * attachments
   ************************/

  /**
   * Get all attachments linked to a specific profile.
   *
   * View all of the attachments that are linked to a specific profile.  An attachment is the association between the
   * set of resources that you want to evaluate  and a profile that contains the specific controls that you want to use.
   * For more information, see [Running an evaluation for IBM
   * Cloud](https://test.cloud.ibm.com/docs/security-compliance?topic=security-compliance-scan-resources).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.profilesId - The profile ID.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.xRequestId] - The supplied or generated value of this header is logged for a request and
   * repeated in a response header for the corresponding response. The same value is not used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {number} [params.limit] - The indication of how many resources to return, unless the response is the last
   * page of resources.
   * @param {string} [params.start] - Determine what resource to start the page on or after.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.AttachmentCollection>>}
   */
  public listAttachments(
    params: SecurityAndComplianceCenterApiV3.ListAttachmentsParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.AttachmentCollection>> {
    const _params = { ...params };
    const _requiredParams = ['profilesId'];
    const _validParams = ['profilesId', 'xCorrelationId', 'xRequestId', 'limit', 'start', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'limit': _params.limit,
      'start': _params.start,
    };

    const path = {
      'profiles_id': _params.profilesId,
    };

    const sdkHeaders = getSdkHeaders(
      SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME,
      'v3',
      'listAttachments'
    );

    const parameters = {
      options: {
        url: '/profiles/{profiles_id}/attachments',
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
            'X-Correlation-ID': _params.xCorrelationId,
            'X-Request-ID': _params.xRequestId,
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
   * Create an attachment to link to a profile to schedule evaluations  of your resources on a recurring schedule, or
   * on-demand. For more information, see [Running an evaluation for IBM
   * Cloud](https://test.cloud.ibm.com/docs/security-compliance?topic=security-compliance-scan-resources).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.profilesId - The profile ID.
   * @param {AttachmentsPrototype[]} params.attachments - The array that displays all of the available attachments.
   * @param {string} [params.profileId] - The ID of the profile that is specified in the attachment.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.xRequestId] - The supplied or generated value of this header is logged for a request and
   * repeated in a response header for the corresponding response. The same value is not used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.AttachmentPrototype>>}
   */
  public createAttachment(
    params: SecurityAndComplianceCenterApiV3.CreateAttachmentParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.AttachmentPrototype>> {
    const _params = { ...params };
    const _requiredParams = ['profilesId', 'attachments'];
    const _validParams = ['profilesId', 'attachments', 'profileId', 'xCorrelationId', 'xRequestId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'attachments': _params.attachments,
      'profile_id': _params.profileId,
    };

    const path = {
      'profiles_id': _params.profilesId,
    };

    const sdkHeaders = getSdkHeaders(
      SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME,
      'v3',
      'createAttachment'
    );

    const parameters = {
      options: {
        url: '/profiles/{profiles_id}/attachments',
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
            'X-Correlation-ID': _params.xCorrelationId,
            'X-Request-ID': _params.xRequestId,
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
   * Delete an attachment. Alternatively, if you think that you might need  this configuration in the future, you can
   * pause an attachment to stop being charged. For more information, see [Running an evaluation for IBM
   * Cloud](https://test.cloud.ibm.com/docs/security-compliance?topic=security-compliance-scan-resources).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.attachmentId - The attachment ID.
   * @param {string} params.profilesId - The profile ID.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.xRequestId] - The supplied or generated value of this header is logged for a request and
   * repeated in a response header for the corresponding response. The same value is not used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.AttachmentItem>>}
   */
  public deleteProfileAttachment(
    params: SecurityAndComplianceCenterApiV3.DeleteProfileAttachmentParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.AttachmentItem>> {
    const _params = { ...params };
    const _requiredParams = ['attachmentId', 'profilesId'];
    const _validParams = ['attachmentId', 'profilesId', 'xCorrelationId', 'xRequestId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'attachment_id': _params.attachmentId,
      'profiles_id': _params.profilesId,
    };

    const sdkHeaders = getSdkHeaders(
      SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME,
      'v3',
      'deleteProfileAttachment'
    );

    const parameters = {
      options: {
        url: '/profiles/{profiles_id}/attachments/{attachment_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
            'X-Request-ID': _params.xRequestId,
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
   * View the details of an attachment a profile by providing the attachment ID.  You can find this value in the
   * Security and Compliance Center UI. For more information, see [Running an evaluation for IBM
   * Cloud](https://test.cloud.ibm.com/docs/security-compliance?topic=security-compliance-scan-resources).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.attachmentId - The attachment ID.
   * @param {string} params.profilesId - The profile ID.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.xRequestId] - The supplied or generated value of this header is logged for a request and
   * repeated in a response header for the corresponding response. The same value is not used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.AttachmentItem>>}
   */
  public getProfileAttachment(
    params: SecurityAndComplianceCenterApiV3.GetProfileAttachmentParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.AttachmentItem>> {
    const _params = { ...params };
    const _requiredParams = ['attachmentId', 'profilesId'];
    const _validParams = ['attachmentId', 'profilesId', 'xCorrelationId', 'xRequestId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'attachment_id': _params.attachmentId,
      'profiles_id': _params.profilesId,
    };

    const sdkHeaders = getSdkHeaders(
      SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME,
      'v3',
      'getProfileAttachment'
    );

    const parameters = {
      options: {
        url: '/profiles/{profiles_id}/attachments/{attachment_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
            'X-Request-ID': _params.xRequestId,
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
   * Update an attachment that is linked to a profile to evaluate your resources  on a recurring schedule, or on-demand.
   * For more information, see [Running an evaluation for IBM
   * Cloud](https://test.cloud.ibm.com/docs/security-compliance?topic=security-compliance-scan-resources).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.attachmentId - The attachment ID.
   * @param {string} params.profilesId - The profile ID.
   * @param {string} [params.id] - The ID of the attachment.
   * @param {string} [params.profileId] - The ID of the profile that is specified in the attachment.
   * @param {string} [params.accountId] - The account ID that is associated to the attachment.
   * @param {string} [params.instanceId] - The instance ID of the account that is associated to the attachment.
   * @param {MultiCloudScope[]} [params.scope] - The scope payload for the multi cloud feature.
   * @param {string} [params.createdOn] - The date when the attachment was created.
   * @param {string} [params.createdBy] - The user who created the attachment.
   * @param {string} [params.updatedOn] - The date when the attachment was updated.
   * @param {string} [params.updatedBy] - The user who updated the attachment.
   * @param {string} [params.status] - The status of an attachment evaluation.
   * @param {string} [params.schedule] - The schedule of an attachment evaluation.
   * @param {AttachmentsNotificationsPrototype} [params.notifications] - The request payload of the attachment
   * notifications.
   * @param {AttachmentParameterPrototype[]} [params.attachmentParameters] - The profile parameters for the attachment.
   * @param {LastScan} [params.lastScan] - The details of the last scan of an attachment.
   * @param {string} [params.nextScanTime] - The start time of the next scan.
   * @param {string} [params.name] - The name of the attachment.
   * @param {string} [params.description] - The description for the attachment.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.xRequestId] - The supplied or generated value of this header is logged for a request and
   * repeated in a response header for the corresponding response. The same value is not used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.AttachmentItem>>}
   */
  public replaceProfileAttachment(
    params: SecurityAndComplianceCenterApiV3.ReplaceProfileAttachmentParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.AttachmentItem>> {
    const _params = { ...params };
    const _requiredParams = ['attachmentId', 'profilesId'];
    const _validParams = ['attachmentId', 'profilesId', 'id', 'profileId', 'accountId', 'instanceId', 'scope', 'createdOn', 'createdBy', 'updatedOn', 'updatedBy', 'status', 'schedule', 'notifications', 'attachmentParameters', 'lastScan', 'nextScanTime', 'name', 'description', 'xCorrelationId', 'xRequestId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'id': _params.id,
      'profile_id': _params.profileId,
      'account_id': _params.accountId,
      'instance_id': _params.instanceId,
      'scope': _params.scope,
      'created_on': _params.createdOn,
      'created_by': _params.createdBy,
      'updated_on': _params.updatedOn,
      'updated_by': _params.updatedBy,
      'status': _params.status,
      'schedule': _params.schedule,
      'notifications': _params.notifications,
      'attachment_parameters': _params.attachmentParameters,
      'last_scan': _params.lastScan,
      'next_scan_time': _params.nextScanTime,
      'name': _params.name,
      'description': _params.description,
    };

    const path = {
      'attachment_id': _params.attachmentId,
      'profiles_id': _params.profilesId,
    };

    const sdkHeaders = getSdkHeaders(
      SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME,
      'v3',
      'replaceProfileAttachment'
    );

    const parameters = {
      options: {
        url: '/profiles/{profiles_id}/attachments/{attachment_id}',
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
            'X-Correlation-ID': _params.xCorrelationId,
            'X-Request-ID': _params.xRequestId,
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
   * Create a scan to evaluate your resources on a recurring basis or on demand.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.attachmentId - The attachment ID of a profile.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.xRequestId] - The supplied or generated value of this header is logged for a request and
   * repeated in a response header for the corresponding response. The same value is not used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Scan>>}
   */
  public createScan(
    params: SecurityAndComplianceCenterApiV3.CreateScanParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Scan>> {
    const _params = { ...params };
    const _requiredParams = ['attachmentId'];
    const _validParams = ['attachmentId', 'xCorrelationId', 'xRequestId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'attachment_id': _params.attachmentId,
    };

    const sdkHeaders = getSdkHeaders(
      SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME,
      'v3',
      'createScan'
    );

    const parameters = {
      options: {
        url: '/scans',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
            'X-Request-ID': _params.xRequestId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get all attachments in an instance.
   *
   * View all of the attachments that are linked to an account. An attachment is the association between the set of
   * resources that you want to evaluate  and a profile that contains the specific controls that you want to use. For
   * more information, see [Running an evaluation for IBM
   * Cloud](https://test.cloud.ibm.com/docs/security-compliance?topic=security-compliance-scan-resources).
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.xRequestId] - The supplied or generated value of this header is logged for a request and
   * repeated in a response header for the corresponding response. The same value is not used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {number} [params.limit] - The indication of how many resources to return, unless the response is the last
   * page of resources.
   * @param {string} [params.start] - Determine what resource to start the page on or after.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.AttachmentCollection>>}
   */
  public listAttachmentsAccount(
    params?: SecurityAndComplianceCenterApiV3.ListAttachmentsAccountParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.AttachmentCollection>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['xCorrelationId', 'xRequestId', 'limit', 'start', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'limit': _params.limit,
      'start': _params.start,
    };

    const sdkHeaders = getSdkHeaders(
      SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME,
      'v3',
      'listAttachmentsAccount'
    );

    const parameters = {
      options: {
        url: '/attachments',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
            'X-Request-ID': _params.xRequestId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * reports
   ************************/

  /**
   * Get the latest reports.
   *
   * Retrieve the latest reports, which are grouped by profile ID, scope ID, and attachment ID. For more information,
   * see [Viewing results](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-results).
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.xRequestId] - The supplied or generated value of this header is logged for a request and
   * repeated in a response header  for the corresponding response.  The same value is not used for downstream requests
   * and retries of those requests.  If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.sort] - This field sorts results by using a valid sort field. To learn more, see
   * [Sorting](https://cloud.ibm.com/docs/api-handbook?topic=api-handbook-sorting).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ReportLatest>>}
   */
  public getLatestReports(
    params?: SecurityAndComplianceCenterApiV3.GetLatestReportsParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ReportLatest>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['xCorrelationId', 'xRequestId', 'sort', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'sort': _params.sort,
    };

    const sdkHeaders = getSdkHeaders(
      SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME,
      'v3',
      'getLatestReports'
    );

    const parameters = {
      options: {
        url: '/reports/latest',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
            'X-Request-ID': _params.xRequestId,
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
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.xRequestId] - The supplied or generated value of this header is logged for a request and
   * repeated in a response header  for the corresponding response.  The same value is not used for downstream requests
   * and retries of those requests.  If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.attachmentId] - The ID of the attachment.
   * @param {string} [params.groupId] - The report group ID.
   * @param {string} [params.profileId] - The ID of the profile.
   * @param {string} [params.type] - The type of the scan.
   * @param {string} [params.start] - The indication of what resource to start the page on.
   * @param {number} [params.limit] - The indication of many resources to return, unless the response is  the last page
   * of resources.
   * @param {string} [params.sort] - This field sorts results by using a valid sort field. To learn more, see
   * [Sorting](https://cloud.ibm.com/docs/api-handbook?topic=api-handbook-sorting).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ReportPage>>}
   */
  public listReports(
    params?: SecurityAndComplianceCenterApiV3.ListReportsParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ReportPage>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['xCorrelationId', 'xRequestId', 'attachmentId', 'groupId', 'profileId', 'type', 'start', 'limit', 'sort', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'attachment_id': _params.attachmentId,
      'group_id': _params.groupId,
      'profile_id': _params.profileId,
      'type': _params.type,
      'start': _params.start,
      'limit': _params.limit,
      'sort': _params.sort,
    };

    const sdkHeaders = getSdkHeaders(
      SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME,
      'v3',
      'listReports'
    );

    const parameters = {
      options: {
        url: '/reports',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
            'X-Request-ID': _params.xRequestId,
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
   * Retrieve a report by specifying its ID. For more information, see [Viewing
   * results](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-results).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.reportId - The ID of the scan that is associated with a report.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.xRequestId] - The supplied or generated value of this header is logged for a request and
   * repeated in a response header  for the corresponding response.  The same value is not used for downstream requests
   * and retries of those requests.  If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Report>>}
   */
  public getReport(
    params: SecurityAndComplianceCenterApiV3.GetReportParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.Report>> {
    const _params = { ...params };
    const _requiredParams = ['reportId'];
    const _validParams = ['reportId', 'xCorrelationId', 'xRequestId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'report_id': _params.reportId,
    };

    const sdkHeaders = getSdkHeaders(
      SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME,
      'v3',
      'getReport'
    );

    const parameters = {
      options: {
        url: '/reports/{report_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
            'X-Request-ID': _params.xRequestId,
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
   * @param {string} params.reportId - The ID of the scan that is associated with a report.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.xRequestId] - The supplied or generated value of this header is logged for a request and
   * repeated in a response header  for the corresponding response.  The same value is not used for downstream requests
   * and retries of those requests.  If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ReportSummary>>}
   */
  public getReportSummary(
    params: SecurityAndComplianceCenterApiV3.GetReportSummaryParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ReportSummary>> {
    const _params = { ...params };
    const _requiredParams = ['reportId'];
    const _validParams = ['reportId', 'xCorrelationId', 'xRequestId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'report_id': _params.reportId,
    };

    const sdkHeaders = getSdkHeaders(
      SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME,
      'v3',
      'getReportSummary'
    );

    const parameters = {
      options: {
        url: '/reports/{report_id}/summary',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
            'X-Request-ID': _params.xRequestId,
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
   * Retrieve the evaluation details of a report by specifying the report ID. For more information, see [Viewing
   * results](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-results).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.reportId - The ID of the scan that is associated with a report.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.xRequestId] - The supplied or generated value of this header is logged for a request and
   * repeated in a response header  for the corresponding response.  The same value is not used for downstream requests
   * and retries of those requests.  If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {boolean} [params.excludeSummary] - The indication of whether report summary metadata must be excluded.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<NodeJS.ReadableStream>>}
   */
  public getReportEvaluation(
    params: SecurityAndComplianceCenterApiV3.GetReportEvaluationParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<NodeJS.ReadableStream>> {
    const _params = { ...params };
    const _requiredParams = ['reportId'];
    const _validParams = ['reportId', 'xCorrelationId', 'xRequestId', 'excludeSummary', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'exclude_summary': _params.excludeSummary,
    };

    const path = {
      'report_id': _params.reportId,
    };

    const sdkHeaders = getSdkHeaders(
      SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME,
      'v3',
      'getReportEvaluation'
    );

    const parameters = {
      options: {
        url: '/reports/{report_id}/download',
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
            'Accept': 'application/csv',
            'X-Correlation-ID': _params.xCorrelationId,
            'X-Request-ID': _params.xRequestId,
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
   * @param {string} params.reportId - The ID of the scan that is associated with a report.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.xRequestId] - The supplied or generated value of this header is logged for a request and
   * repeated in a response header  for the corresponding response.  The same value is not used for downstream requests
   * and retries of those requests.  If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.controlId] - The ID of the control.
   * @param {string} [params.controlName] - The name of the control.
   * @param {string} [params.controlDescription] - The description of the control.
   * @param {string} [params.controlCategory] - A control category value.
   * @param {string} [params.status] - The compliance status value.
   * @param {string} [params.sort] - This field sorts controls by using a valid sort field. To learn more, see
   * [Sorting](https://cloud.ibm.com/docs/api-handbook?topic=api-handbook-sorting).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ReportControls>>}
   */
  public getReportControls(
    params: SecurityAndComplianceCenterApiV3.GetReportControlsParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ReportControls>> {
    const _params = { ...params };
    const _requiredParams = ['reportId'];
    const _validParams = ['reportId', 'xCorrelationId', 'xRequestId', 'controlId', 'controlName', 'controlDescription', 'controlCategory', 'status', 'sort', 'headers'];
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
    };

    const path = {
      'report_id': _params.reportId,
    };

    const sdkHeaders = getSdkHeaders(
      SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME,
      'v3',
      'getReportControls'
    );

    const parameters = {
      options: {
        url: '/reports/{report_id}/controls',
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
            'X-Correlation-ID': _params.xCorrelationId,
            'X-Request-ID': _params.xRequestId,
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
   * @param {string} params.reportId - The ID of the scan that is associated with a report.
   * @param {string} params.ruleId - The ID of a rule in a report.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.xRequestId] - The supplied or generated value of this header is logged for a request and
   * repeated in a response header  for the corresponding response.  The same value is not used for downstream requests
   * and retries of those requests.  If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.RuleInfo>>}
   */
  public getReportRule(
    params: SecurityAndComplianceCenterApiV3.GetReportRuleParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.RuleInfo>> {
    const _params = { ...params };
    const _requiredParams = ['reportId', 'ruleId'];
    const _validParams = ['reportId', 'ruleId', 'xCorrelationId', 'xRequestId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'report_id': _params.reportId,
      'rule_id': _params.ruleId,
    };

    const sdkHeaders = getSdkHeaders(
      SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME,
      'v3',
      'getReportRule'
    );

    const parameters = {
      options: {
        url: '/reports/{report_id}/rules/{rule_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
            'X-Request-ID': _params.xRequestId,
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
   * @param {string} params.reportId - The ID of the scan that is associated with a report.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.xRequestId] - The supplied or generated value of this header is logged for a request and
   * repeated in a response header  for the corresponding response.  The same value is not used for downstream requests
   * and retries of those requests.  If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.assessmentId] - The ID of the assessment.
   * @param {string} [params.componentId] - The ID of component.
   * @param {string} [params.targetId] - The ID of the evaluation target.
   * @param {string} [params.targetName] - The name of the evaluation target.
   * @param {string} [params.status] - The evaluation status value.
   * @param {string} [params.start] - The indication of what resource to start the page on.
   * @param {number} [params.limit] - The indication of many resources to return, unless the response is  the last page
   * of resources.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.EvaluationPage>>}
   */
  public listReportEvaluations(
    params: SecurityAndComplianceCenterApiV3.ListReportEvaluationsParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.EvaluationPage>> {
    const _params = { ...params };
    const _requiredParams = ['reportId'];
    const _validParams = ['reportId', 'xCorrelationId', 'xRequestId', 'assessmentId', 'componentId', 'targetId', 'targetName', 'status', 'start', 'limit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'assessment_id': _params.assessmentId,
      'component_id': _params.componentId,
      'target_id': _params.targetId,
      'target_name': _params.targetName,
      'status': _params.status,
      'start': _params.start,
      'limit': _params.limit,
    };

    const path = {
      'report_id': _params.reportId,
    };

    const sdkHeaders = getSdkHeaders(
      SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME,
      'v3',
      'listReportEvaluations'
    );

    const parameters = {
      options: {
        url: '/reports/{report_id}/evaluations',
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
            'X-Correlation-ID': _params.xCorrelationId,
            'X-Request-ID': _params.xRequestId,
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
   * @param {string} params.reportId - The ID of the scan that is associated with a report.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.xRequestId] - The supplied or generated value of this header is logged for a request and
   * repeated in a response header  for the corresponding response.  The same value is not used for downstream requests
   * and retries of those requests.  If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.id] - The ID of the resource.
   * @param {string} [params.resourceName] - The name of the resource.
   * @param {string} [params.accountId] - The ID of the account owning a resource.
   * @param {string} [params.componentId] - The ID of component.
   * @param {string} [params.status] - The compliance status value.
   * @param {string} [params.sort] - This field sorts resources by using a valid sort field. To learn more, see
   * [Sorting](https://cloud.ibm.com/docs/api-handbook?topic=api-handbook-sorting).
   * @param {string} [params.start] - The indication of what resource to start the page on.
   * @param {number} [params.limit] - The indication of many resources to return, unless the response is  the last page
   * of resources.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ResourcePage>>}
   */
  public listReportResources(
    params: SecurityAndComplianceCenterApiV3.ListReportResourcesParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ResourcePage>> {
    const _params = { ...params };
    const _requiredParams = ['reportId'];
    const _validParams = ['reportId', 'xCorrelationId', 'xRequestId', 'id', 'resourceName', 'accountId', 'componentId', 'status', 'sort', 'start', 'limit', 'headers'];
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
    };

    const path = {
      'report_id': _params.reportId,
    };

    const sdkHeaders = getSdkHeaders(
      SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME,
      'v3',
      'listReportResources'
    );

    const parameters = {
      options: {
        url: '/reports/{report_id}/resources',
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
            'X-Correlation-ID': _params.xCorrelationId,
            'X-Request-ID': _params.xRequestId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get report tags.
   *
   * Retrieve a list of tags for the specified report. For more information, see [Viewing
   * results](https://cloud.ibm.com/docs/security-compliance?topic=security-compliance-results).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.reportId - The ID of the scan that is associated with a report.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.xRequestId] - The supplied or generated value of this header is logged for a request and
   * repeated in a response header  for the corresponding response.  The same value is not used for downstream requests
   * and retries of those requests.  If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ReportTags>>}
   */
  public getReportTags(
    params: SecurityAndComplianceCenterApiV3.GetReportTagsParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ReportTags>> {
    const _params = { ...params };
    const _requiredParams = ['reportId'];
    const _validParams = ['reportId', 'xCorrelationId', 'xRequestId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'report_id': _params.reportId,
    };

    const sdkHeaders = getSdkHeaders(
      SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME,
      'v3',
      'getReportTags'
    );

    const parameters = {
      options: {
        url: '/reports/{report_id}/tags',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
            'X-Request-ID': _params.xRequestId,
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
   * @param {string} params.reportId - The ID of the scan that is associated with a report.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.xRequestId] - The supplied or generated value of this header is logged for a request and
   * repeated in a response header  for the corresponding response.  The same value is not used for downstream requests
   * and retries of those requests.  If a value of this header is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {number} [params.scanTimeDuration] - The duration of the `scan_time` timestamp in number of days.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ReportViolationsDrift>>}
   */
  public getReportViolationsDrift(
    params: SecurityAndComplianceCenterApiV3.GetReportViolationsDriftParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ReportViolationsDrift>> {
    const _params = { ...params };
    const _requiredParams = ['reportId'];
    const _validParams = ['reportId', 'xCorrelationId', 'xRequestId', 'scanTimeDuration', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'scan_time_duration': _params.scanTimeDuration,
    };

    const path = {
      'report_id': _params.reportId,
    };

    const sdkHeaders = getSdkHeaders(
      SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME,
      'v3',
      'getReportViolationsDrift'
    );

    const parameters = {
      options: {
        url: '/reports/{report_id}/violations_drift',
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
            'X-Correlation-ID': _params.xCorrelationId,
            'X-Request-ID': _params.xRequestId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * providerTypes
   ************************/

  /**
   * List all provider types.
   *
   * List all the registered provider types. For more information about connecting Workload Protection with the Security
   * and Compliance Center, see [Connecting Workload
   * Protection](/docs/security-compliance?topic=security-compliance-setup-workload-protection&interface=api#wp-register).
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this headers is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.xRequestId] - The supplied or generated value of this header is logged for a request and
   * repeated in a response header  for the corresponding response.  The same value is not used for downstream requests
   * and retries of those requests.  If a value of this headers is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProviderTypesCollection>>}
   */
  public listProviderTypes(
    params?: SecurityAndComplianceCenterApiV3.ListProviderTypesParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProviderTypesCollection>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['xCorrelationId', 'xRequestId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(
      SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME,
      'v3',
      'listProviderTypes'
    );

    const parameters = {
      options: {
        url: '/provider_types',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
            'X-Request-ID': _params.xRequestId,
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
   * Protection](https://test.cloud.ibm.com/docs/security-compliance?topic=security-compliance-setup-workload-protection).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.providerTypeId - The provider type ID.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this headers is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.xRequestId] - The supplied or generated value of this header is logged for a request and
   * repeated in a response header  for the corresponding response.  The same value is not used for downstream requests
   * and retries of those requests.  If a value of this headers is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProviderTypeItem>>}
   */
  public getProviderTypeById(
    params: SecurityAndComplianceCenterApiV3.GetProviderTypeByIdParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProviderTypeItem>> {
    const _params = { ...params };
    const _requiredParams = ['providerTypeId'];
    const _validParams = ['providerTypeId', 'xCorrelationId', 'xRequestId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'provider_type_id': _params.providerTypeId,
    };

    const sdkHeaders = getSdkHeaders(
      SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME,
      'v3',
      'getProviderTypeById'
    );

    const parameters = {
      options: {
        url: '/provider_types/{provider_type_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
            'X-Request-ID': _params.xRequestId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * providerTypeInstances
   ************************/

  /**
   * List all provider type instances.
   *
   * Retrieve all instances of provider type. For more information about integrations, see [Connecting Workload
   * Protection](https://test.cloud.ibm.com/docs/security-compliance?topic=security-compliance-setup-workload-protection).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.providerTypeId - The provider type ID.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this headers is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.xRequestId] - The supplied or generated value of this header is logged for a request and
   * repeated in a response header  for the corresponding response.  The same value is not used for downstream requests
   * and retries of those requests.  If a value of this headers is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProviderTypeInstancesResponse>>}
   */
  public listProviderTypeInstances(
    params: SecurityAndComplianceCenterApiV3.ListProviderTypeInstancesParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProviderTypeInstancesResponse>> {
    const _params = { ...params };
    const _requiredParams = ['providerTypeId'];
    const _validParams = ['providerTypeId', 'xCorrelationId', 'xRequestId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'provider_type_id': _params.providerTypeId,
    };

    const sdkHeaders = getSdkHeaders(
      SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME,
      'v3',
      'listProviderTypeInstances'
    );

    const parameters = {
      options: {
        url: '/provider_types/{provider_type_id}/provider_type_instances',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
            'X-Request-ID': _params.xRequestId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create a provider type instance.
   *
   * Create an instance of a provider type. For more information about integrations, see [Connecting Workload
   * Protection](https://test.cloud.ibm.com/docs/security-compliance?topic=security-compliance-setup-workload-protection).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.providerTypeId - The provider type ID.
   * @param {string} [params.name] - The provider type instance name.
   * @param {JsonObject} [params.attributes] - The attributes for connecting to the provider type instance.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this headers is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.xRequestId] - The supplied or generated value of this header is logged for a request and
   * repeated in a response header  for the corresponding response.  The same value is not used for downstream requests
   * and retries of those requests.  If a value of this headers is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProviderTypeInstanceItem>>}
   */
  public createProviderTypeInstance(
    params: SecurityAndComplianceCenterApiV3.CreateProviderTypeInstanceParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProviderTypeInstanceItem>> {
    const _params = { ...params };
    const _requiredParams = ['providerTypeId'];
    const _validParams = ['providerTypeId', 'name', 'attributes', 'xCorrelationId', 'xRequestId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'attributes': _params.attributes,
    };

    const path = {
      'provider_type_id': _params.providerTypeId,
    };

    const sdkHeaders = getSdkHeaders(
      SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME,
      'v3',
      'createProviderTypeInstance'
    );

    const parameters = {
      options: {
        url: '/provider_types/{provider_type_id}/provider_type_instances',
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
            'X-Correlation-ID': _params.xCorrelationId,
            'X-Request-ID': _params.xRequestId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Remove a specific instance of a provider type.
   *
   * Remove a specific instance of a provider type.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.providerTypeId - The provider type ID.
   * @param {string} params.providerTypeInstanceId - The provider type instance ID.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this headers is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.xRequestId] - The supplied or generated value of this header is logged for a request and
   * repeated in a response header  for the corresponding response.  The same value is not used for downstream requests
   * and retries of those requests.  If a value of this headers is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.EmptyObject>>}
   */
  public deleteProviderTypeInstance(
    params: SecurityAndComplianceCenterApiV3.DeleteProviderTypeInstanceParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['providerTypeId', 'providerTypeInstanceId'];
    const _validParams = ['providerTypeId', 'providerTypeInstanceId', 'xCorrelationId', 'xRequestId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'provider_type_id': _params.providerTypeId,
      'provider_type_instance_id': _params.providerTypeInstanceId,
    };

    const sdkHeaders = getSdkHeaders(
      SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME,
      'v3',
      'deleteProviderTypeInstance'
    );

    const parameters = {
      options: {
        url: '/provider_types/{provider_type_id}/provider_type_instances/{provider_type_instance_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'X-Correlation-ID': _params.xCorrelationId,
            'X-Request-ID': _params.xRequestId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List a provider type instance.
   *
   * Retrieve a provider type instance by specifying the provider type ID, and Security and Compliance Center instance
   * ID. For more information about integrations, see [Connecting Workload
   * Protection](https://test.cloud.ibm.com/docs/security-compliance?topic=security-compliance-setup-workload-protection).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.providerTypeId - The provider type ID.
   * @param {string} params.providerTypeInstanceId - The provider type instance ID.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this headers is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.xRequestId] - The supplied or generated value of this header is logged for a request and
   * repeated in a response header  for the corresponding response.  The same value is not used for downstream requests
   * and retries of those requests.  If a value of this headers is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProviderTypeInstanceItem>>}
   */
  public getProviderTypeInstance(
    params: SecurityAndComplianceCenterApiV3.GetProviderTypeInstanceParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProviderTypeInstanceItem>> {
    const _params = { ...params };
    const _requiredParams = ['providerTypeId', 'providerTypeInstanceId'];
    const _validParams = ['providerTypeId', 'providerTypeInstanceId', 'xCorrelationId', 'xRequestId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'provider_type_id': _params.providerTypeId,
      'provider_type_instance_id': _params.providerTypeInstanceId,
    };

    const sdkHeaders = getSdkHeaders(
      SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME,
      'v3',
      'getProviderTypeInstance'
    );

    const parameters = {
      options: {
        url: '/provider_types/{provider_type_id}/provider_type_instances/{provider_type_instance_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
            'X-Request-ID': _params.xRequestId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Patch a specific instance of a provider type.
   *
   * Patch a specific instance of a provider type.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.providerTypeId - The provider type ID.
   * @param {string} params.providerTypeInstanceId - The provider type instance ID.
   * @param {string} [params.name] - The provider type instance name.
   * @param {JsonObject} [params.attributes] - The attributes for connecting to the provider type instance.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this headers is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.xRequestId] - The supplied or generated value of this header is logged for a request and
   * repeated in a response header  for the corresponding response.  The same value is not used for downstream requests
   * and retries of those requests.  If a value of this headers is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProviderTypeInstanceItem>>}
   */
  public updateProviderTypeInstance(
    params: SecurityAndComplianceCenterApiV3.UpdateProviderTypeInstanceParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProviderTypeInstanceItem>> {
    const _params = { ...params };
    const _requiredParams = ['providerTypeId', 'providerTypeInstanceId'];
    const _validParams = ['providerTypeId', 'providerTypeInstanceId', 'name', 'attributes', 'xCorrelationId', 'xRequestId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'attributes': _params.attributes,
    };

    const path = {
      'provider_type_id': _params.providerTypeId,
      'provider_type_instance_id': _params.providerTypeInstanceId,
    };

    const sdkHeaders = getSdkHeaders(
      SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME,
      'v3',
      'updateProviderTypeInstance'
    );

    const parameters = {
      options: {
        url: '/provider_types/{provider_type_id}/provider_type_instances/{provider_type_instance_id}',
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
            'X-Correlation-ID': _params.xCorrelationId,
            'X-Request-ID': _params.xRequestId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a list of instances for all provider types.
   *
   * Get a list of instances for all provider types.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this headers is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.xRequestId] - The supplied or generated value of this header is logged for a request and
   * repeated in a response header  for the corresponding response.  The same value is not used for downstream requests
   * and retries of those requests.  If a value of this headers is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProviderTypesInstancesResponse>>}
   */
  public getProviderTypesInstances(
    params?: SecurityAndComplianceCenterApiV3.GetProviderTypesInstancesParams
  ): Promise<SecurityAndComplianceCenterApiV3.Response<SecurityAndComplianceCenterApiV3.ProviderTypesInstancesResponse>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['xCorrelationId', 'xRequestId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(
      SecurityAndComplianceCenterApiV3.DEFAULT_SERVICE_NAME,
      'v3',
      'getProviderTypesInstances'
    );

    const parameters = {
      options: {
        url: '/provider_types_instances',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
            'X-Request-ID': _params.xRequestId,
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
    /** The supplied or generated value of this header is logged for a request, and repeated in a response header
     *  for the corresponding response. The same value is used for downstream requests and retries of those requests. If
     *  a value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The supplied or generated value of this header is logged for a request, and repeated in a response header
     *  for the corresponding response.  The same value is not used for downstream requests and retries of those
     *  requests.  If a value of this header is not supplied in a request, the service generates a random (version 4)
     *  UUID.
     */
    xRequestId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateSettings` operation. */
  export interface UpdateSettingsParams {
    /** The Event Notifications settings. */
    eventNotifications?: EventNotifications;
    /** The Cloud Object Storage settings. */
    objectStorage?: ObjectStorage;
    /** The supplied or generated value of this header is logged for a request, and repeated in a response header
     *  for the corresponding response. The same value is used for downstream requests and retries of those requests. If
     *  a value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The supplied or generated value of this header is logged for a request, and repeated in a response header
     *  for the corresponding response.  The same value is not used for downstream requests and retries of those
     *  requests.  If a value of this header is not supplied in a request, the service generates a random (version 4)
     *  UUID.
     */
    xRequestId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `postTestEvent` operation. */
  export interface PostTestEventParams {
    /** The supplied or generated value of this header is logged for a request, and repeated in a response header
     *  for the corresponding response. The same value is used for downstream requests and retries of those requests. If
     *  a value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The supplied or generated value of this header is logged for a request, and repeated in a response header
     *  for the corresponding response.  The same value is not used for downstream requests and retries of those
     *  requests.  If a value of this header is not supplied in a request, the service generates a random (version 4)
     *  UUID.
     */
    xRequestId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listControlLibraries` operation. */
  export interface ListControlLibrariesParams {
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is not used for downstream requests and retries of those requests. If
     *  a value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xRequestId?: string;
    /** The field that indicates how many resources to return, unless the response is the last page of resources. */
    limit?: number;
    /** The field that indicate how you want the resources to be filtered by. */
    controlLibraryType?: string;
    /** Determine what resource to start the page on or after. */
    start?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createCustomControlLibrary` operation. */
  export interface CreateCustomControlLibraryParams {
    /** The control library name. */
    controlLibraryName: string;
    /** The control library description. */
    controlLibraryDescription: string;
    /** The control library type. */
    controlLibraryType: CreateCustomControlLibraryConstants.ControlLibraryType | string;
    /** The controls. */
    controls: ControlsInControlLib[];
    /** The version group label. */
    versionGroupLabel?: string;
    /** The control library version. */
    controlLibraryVersion?: string;
    /** The latest control library version. */
    latest?: boolean;
    /** The number of controls. */
    controlsCount?: number;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is not used for downstream requests and retries of those requests. If
     *  a value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xRequestId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createCustomControlLibrary` operation. */
  export namespace CreateCustomControlLibraryConstants {
    /** The control library type. */
    export enum ControlLibraryType {
      PREDEFINED = 'predefined',
      CUSTOM = 'custom',
    }
  }

  /** Parameters for the `deleteCustomControlLibrary` operation. */
  export interface DeleteCustomControlLibraryParams {
    /** The control library ID. */
    controlLibrariesId: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is not used for downstream requests and retries of those requests. If
     *  a value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xRequestId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getControlLibrary` operation. */
  export interface GetControlLibraryParams {
    /** The control library ID. */
    controlLibrariesId: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is not used for downstream requests and retries of those requests. If
     *  a value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xRequestId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `replaceCustomControlLibrary` operation. */
  export interface ReplaceCustomControlLibraryParams {
    /** The control library ID. */
    controlLibrariesId: string;
    /** The control library ID. */
    id?: string;
    /** The account ID. */
    accountId?: string;
    /** The control library name. */
    controlLibraryName?: string;
    /** The control library description. */
    controlLibraryDescription?: string;
    /** The control library type. */
    controlLibraryType?: ReplaceCustomControlLibraryConstants.ControlLibraryType | string;
    /** The version group label. */
    versionGroupLabel?: string;
    /** The control library version. */
    controlLibraryVersion?: string;
    /** The date when the control library was created. */
    createdOn?: string;
    /** The user who created the control library. */
    createdBy?: string;
    /** The date when the control library was updated. */
    updatedOn?: string;
    /** The user who updated the control library. */
    updatedBy?: string;
    /** The latest version of the control library. */
    latest?: boolean;
    /** The indication of whether hierarchy is enabled for the control library. */
    hierarchyEnabled?: boolean;
    /** The number of controls. */
    controlsCount?: number;
    /** The number of parent controls in the control library. */
    controlParentsCount?: number;
    /** The list of controls in a control library. */
    controls?: ControlsInControlLib[];
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is not used for downstream requests and retries of those requests. If
     *  a value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xRequestId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `replaceCustomControlLibrary` operation. */
  export namespace ReplaceCustomControlLibraryConstants {
    /** The control library type. */
    export enum ControlLibraryType {
      PREDEFINED = 'predefined',
      CUSTOM = 'custom',
    }
  }

  /** Parameters for the `listProfiles` operation. */
  export interface ListProfilesParams {
    /** The supplied or generated value of this header is logged for a request, and repeated in a response header
     *  for the corresponding response. The same value is used for downstream requests, and retries of those requests.
     *  If a value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is not used for downstream requests and retries of those requests. If
     *  a value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xRequestId?: string;
    /** The indication of how many resources to return, unless the response is the last page of resources. */
    limit?: number;
    /** The field that indicate how you want the resources to be filtered by. */
    profileType?: string;
    /** Determine what resource to start the page on or after. */
    start?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createProfile` operation. */
  export interface CreateProfileParams {
    /** The name of the profile. */
    profileName: string;
    /** The description of the profile. */
    profileDescription: string;
    /** The profile type. */
    profileType: CreateProfileConstants.ProfileType | string;
    /** The controls that are in the profile. */
    controls: ProfileControlsPrototype[];
    /** The default parameters of the profile. */
    defaultParameters: DefaultParametersPrototype[];
    /** The supplied or generated value of this header is logged for a request, and repeated in a response header
     *  for the corresponding response. The same value is used for downstream requests, and retries of those requests.
     *  If a value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is not used for downstream requests and retries of those requests. If
     *  a value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xRequestId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createProfile` operation. */
  export namespace CreateProfileConstants {
    /** The profile type. */
    export enum ProfileType {
      PREDEFINED = 'predefined',
      CUSTOM = 'custom',
    }
  }

  /** Parameters for the `deleteCustomProfile` operation. */
  export interface DeleteCustomProfileParams {
    /** The profile ID. */
    profilesId: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is not used for downstream requests and retries of those requests. If
     *  a value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xRequestId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getProfile` operation. */
  export interface GetProfileParams {
    /** The profile ID. */
    profilesId: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is not used for downstream requests and retries of those requests. If
     *  a value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xRequestId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `replaceProfile` operation. */
  export interface ReplaceProfileParams {
    /** The profile ID. */
    profilesId: string;
    /** The name of the profile. */
    profileName: string;
    /** The description of the profile. */
    profileDescription: string;
    /** The profile type. */
    profileType: ReplaceProfileConstants.ProfileType | string;
    /** The controls that are in the profile. */
    controls: ProfileControlsPrototype[];
    /** The default parameters of the profile. */
    defaultParameters: DefaultParametersPrototype[];
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is not used for downstream requests and retries of those requests. If
     *  a value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xRequestId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `replaceProfile` operation. */
  export namespace ReplaceProfileConstants {
    /** The profile type. */
    export enum ProfileType {
      PREDEFINED = 'predefined',
      CUSTOM = 'custom',
    }
  }

  /** Parameters for the `listRules` operation. */
  export interface ListRulesParams {
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header
     *  for the corresponding response.  The same value is not used for downstream requests and retries of those
     *  requests.  If a value of this header is not supplied in a request, the service generates a random (version 4)
     *  UUID.
     */
    xRequestId?: string;
    /** The list of only user-defined, or system-defined rules. */
    type?: string;
    /** The indication of whether to search for rules with a specific string string in the name, description, or
     *  labels.
     */
    search?: string;
    /** Searches for rules targeting corresponding service. */
    serviceName?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createRule` operation. */
  export interface CreateRuleParams {
    /** The rule description. */
    description: string;
    /** The rule target. */
    target: Target;
    /** The required configurations. */
    requiredConfig: RequiredConfig;
    /** The rule type (user_defined or system_defined). */
    type?: CreateRuleConstants.Type | string;
    /** The rule version number. */
    version?: string;
    /** The collection of import parameters. */
    _import?: Import;
    /** The list of labels that correspond to a rule. */
    labels?: string[];
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header
     *  for the corresponding response.  The same value is not used for downstream requests and retries of those
     *  requests.  If a value of this header is not supplied in a request, the service generates a random (version 4)
     *  UUID.
     */
    xRequestId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createRule` operation. */
  export namespace CreateRuleConstants {
    /** The rule type (user_defined or system_defined). */
    export enum Type {
      USER_DEFINED = 'user_defined',
      SYSTEM_DEFINED = 'system_defined',
    }
  }

  /** Parameters for the `deleteRule` operation. */
  export interface DeleteRuleParams {
    /** The ID of the corresponding rule. */
    ruleId: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header
     *  for the corresponding response.  The same value is not used for downstream requests and retries of those
     *  requests.  If a value of this header is not supplied in a request, the service generates a random (version 4)
     *  UUID.
     */
    xRequestId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getRule` operation. */
  export interface GetRuleParams {
    /** The ID of the corresponding rule. */
    ruleId: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header
     *  for the corresponding response.  The same value is not used for downstream requests and retries of those
     *  requests.  If a value of this header is not supplied in a request, the service generates a random (version 4)
     *  UUID.
     */
    xRequestId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `replaceRule` operation. */
  export interface ReplaceRuleParams {
    /** The ID of the corresponding rule. */
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
    target: Target;
    /** The required configurations. */
    requiredConfig: RequiredConfig;
    /** The rule type (user_defined or system_defined). */
    type?: ReplaceRuleConstants.Type | string;
    /** The rule version number. */
    version?: string;
    /** The collection of import parameters. */
    _import?: Import;
    /** The list of labels that correspond to a rule. */
    labels?: string[];
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header
     *  for the corresponding response.  The same value is not used for downstream requests and retries of those
     *  requests.  If a value of this header is not supplied in a request, the service generates a random (version 4)
     *  UUID.
     */
    xRequestId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `replaceRule` operation. */
  export namespace ReplaceRuleConstants {
    /** The rule type (user_defined or system_defined). */
    export enum Type {
      USER_DEFINED = 'user_defined',
      SYSTEM_DEFINED = 'system_defined',
    }
  }

  /** Parameters for the `listAttachments` operation. */
  export interface ListAttachmentsParams {
    /** The profile ID. */
    profilesId: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is not used for downstream requests and retries of those requests. If
     *  a value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xRequestId?: string;
    /** The indication of how many resources to return, unless the response is the last page of resources. */
    limit?: number;
    /** Determine what resource to start the page on or after. */
    start?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createAttachment` operation. */
  export interface CreateAttachmentParams {
    /** The profile ID. */
    profilesId: string;
    /** The array that displays all of the available attachments. */
    attachments: AttachmentsPrototype[];
    /** The ID of the profile that is specified in the attachment. */
    profileId?: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is not used for downstream requests and retries of those requests. If
     *  a value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xRequestId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteProfileAttachment` operation. */
  export interface DeleteProfileAttachmentParams {
    /** The attachment ID. */
    attachmentId: string;
    /** The profile ID. */
    profilesId: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is not used for downstream requests and retries of those requests. If
     *  a value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xRequestId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getProfileAttachment` operation. */
  export interface GetProfileAttachmentParams {
    /** The attachment ID. */
    attachmentId: string;
    /** The profile ID. */
    profilesId: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is not used for downstream requests and retries of those requests. If
     *  a value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xRequestId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `replaceProfileAttachment` operation. */
  export interface ReplaceProfileAttachmentParams {
    /** The attachment ID. */
    attachmentId: string;
    /** The profile ID. */
    profilesId: string;
    /** The ID of the attachment. */
    id?: string;
    /** The ID of the profile that is specified in the attachment. */
    profileId?: string;
    /** The account ID that is associated to the attachment. */
    accountId?: string;
    /** The instance ID of the account that is associated to the attachment. */
    instanceId?: string;
    /** The scope payload for the multi cloud feature. */
    scope?: MultiCloudScope[];
    /** The date when the attachment was created. */
    createdOn?: string;
    /** The user who created the attachment. */
    createdBy?: string;
    /** The date when the attachment was updated. */
    updatedOn?: string;
    /** The user who updated the attachment. */
    updatedBy?: string;
    /** The status of an attachment evaluation. */
    status?: ReplaceProfileAttachmentConstants.Status | string;
    /** The schedule of an attachment evaluation. */
    schedule?: ReplaceProfileAttachmentConstants.Schedule | string;
    /** The request payload of the attachment notifications. */
    notifications?: AttachmentsNotificationsPrototype;
    /** The profile parameters for the attachment. */
    attachmentParameters?: AttachmentParameterPrototype[];
    /** The details of the last scan of an attachment. */
    lastScan?: LastScan;
    /** The start time of the next scan. */
    nextScanTime?: string;
    /** The name of the attachment. */
    name?: string;
    /** The description for the attachment. */
    description?: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is not used for downstream requests and retries of those requests. If
     *  a value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xRequestId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `replaceProfileAttachment` operation. */
  export namespace ReplaceProfileAttachmentConstants {
    /** The status of an attachment evaluation. */
    export enum Status {
      ENABLED = 'enabled',
      DISABLED = 'disabled',
    }
    /** The schedule of an attachment evaluation. */
    export enum Schedule {
      DAILY = 'daily',
      EVERY_7_DAYS = 'every_7_days',
      EVERY_30_DAYS = 'every_30_days',
    }
  }

  /** Parameters for the `createScan` operation. */
  export interface CreateScanParams {
    /** The attachment ID of a profile. */
    attachmentId: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is not used for downstream requests and retries of those requests. If
     *  a value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xRequestId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listAttachmentsAccount` operation. */
  export interface ListAttachmentsAccountParams {
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is not used for downstream requests and retries of those requests. If
     *  a value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xRequestId?: string;
    /** The indication of how many resources to return, unless the response is the last page of resources. */
    limit?: number;
    /** Determine what resource to start the page on or after. */
    start?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getLatestReports` operation. */
  export interface GetLatestReportsParams {
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header
     *  for the corresponding response.  The same value is not used for downstream requests and retries of those
     *  requests.  If a value of this header is not supplied in a request, the service generates a random (version 4)
     *  UUID.
     */
    xRequestId?: string;
    /** This field sorts results by using a valid sort field. To learn more, see
     *  [Sorting](https://cloud.ibm.com/docs/api-handbook?topic=api-handbook-sorting).
     */
    sort?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listReports` operation. */
  export interface ListReportsParams {
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header
     *  for the corresponding response.  The same value is not used for downstream requests and retries of those
     *  requests.  If a value of this header is not supplied in a request, the service generates a random (version 4)
     *  UUID.
     */
    xRequestId?: string;
    /** The ID of the attachment. */
    attachmentId?: string;
    /** The report group ID. */
    groupId?: string;
    /** The ID of the profile. */
    profileId?: string;
    /** The type of the scan. */
    type?: ListReportsConstants.Type | string;
    /** The indication of what resource to start the page on. */
    start?: string;
    /** The indication of many resources to return, unless the response is  the last page of resources. */
    limit?: number;
    /** This field sorts results by using a valid sort field. To learn more, see
     *  [Sorting](https://cloud.ibm.com/docs/api-handbook?topic=api-handbook-sorting).
     */
    sort?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listReports` operation. */
  export namespace ListReportsConstants {
    /** The type of the scan. */
    export enum Type {
      ONDEMAND = 'ondemand',
      SCHEDULED = 'scheduled',
    }
  }

  /** Parameters for the `getReport` operation. */
  export interface GetReportParams {
    /** The ID of the scan that is associated with a report. */
    reportId: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header
     *  for the corresponding response.  The same value is not used for downstream requests and retries of those
     *  requests.  If a value of this header is not supplied in a request, the service generates a random (version 4)
     *  UUID.
     */
    xRequestId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getReportSummary` operation. */
  export interface GetReportSummaryParams {
    /** The ID of the scan that is associated with a report. */
    reportId: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header
     *  for the corresponding response.  The same value is not used for downstream requests and retries of those
     *  requests.  If a value of this header is not supplied in a request, the service generates a random (version 4)
     *  UUID.
     */
    xRequestId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getReportEvaluation` operation. */
  export interface GetReportEvaluationParams {
    /** The ID of the scan that is associated with a report. */
    reportId: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header
     *  for the corresponding response.  The same value is not used for downstream requests and retries of those
     *  requests.  If a value of this header is not supplied in a request, the service generates a random (version 4)
     *  UUID.
     */
    xRequestId?: string;
    /** The indication of whether report summary metadata must be excluded. */
    excludeSummary?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getReportControls` operation. */
  export interface GetReportControlsParams {
    /** The ID of the scan that is associated with a report. */
    reportId: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header
     *  for the corresponding response.  The same value is not used for downstream requests and retries of those
     *  requests.  If a value of this header is not supplied in a request, the service generates a random (version 4)
     *  UUID.
     */
    xRequestId?: string;
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
    /** The ID of the scan that is associated with a report. */
    reportId: string;
    /** The ID of a rule in a report. */
    ruleId: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header
     *  for the corresponding response.  The same value is not used for downstream requests and retries of those
     *  requests.  If a value of this header is not supplied in a request, the service generates a random (version 4)
     *  UUID.
     */
    xRequestId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listReportEvaluations` operation. */
  export interface ListReportEvaluationsParams {
    /** The ID of the scan that is associated with a report. */
    reportId: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header
     *  for the corresponding response.  The same value is not used for downstream requests and retries of those
     *  requests.  If a value of this header is not supplied in a request, the service generates a random (version 4)
     *  UUID.
     */
    xRequestId?: string;
    /** The ID of the assessment. */
    assessmentId?: string;
    /** The ID of component. */
    componentId?: string;
    /** The ID of the evaluation target. */
    targetId?: string;
    /** The name of the evaluation target. */
    targetName?: string;
    /** The evaluation status value. */
    status?: ListReportEvaluationsConstants.Status | string;
    /** The indication of what resource to start the page on. */
    start?: string;
    /** The indication of many resources to return, unless the response is  the last page of resources. */
    limit?: number;
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
  }

  /** Parameters for the `listReportResources` operation. */
  export interface ListReportResourcesParams {
    /** The ID of the scan that is associated with a report. */
    reportId: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header
     *  for the corresponding response.  The same value is not used for downstream requests and retries of those
     *  requests.  If a value of this header is not supplied in a request, the service generates a random (version 4)
     *  UUID.
     */
    xRequestId?: string;
    /** The ID of the resource. */
    id?: string;
    /** The name of the resource. */
    resourceName?: string;
    /** The ID of the account owning a resource. */
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
    /** The indication of many resources to return, unless the response is  the last page of resources. */
    limit?: number;
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
    /** The ID of the scan that is associated with a report. */
    reportId: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header
     *  for the corresponding response.  The same value is not used for downstream requests and retries of those
     *  requests.  If a value of this header is not supplied in a request, the service generates a random (version 4)
     *  UUID.
     */
    xRequestId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getReportViolationsDrift` operation. */
  export interface GetReportViolationsDriftParams {
    /** The ID of the scan that is associated with a report. */
    reportId: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this header is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header
     *  for the corresponding response.  The same value is not used for downstream requests and retries of those
     *  requests.  If a value of this header is not supplied in a request, the service generates a random (version 4)
     *  UUID.
     */
    xRequestId?: string;
    /** The duration of the `scan_time` timestamp in number of days. */
    scanTimeDuration?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listProviderTypes` operation. */
  export interface ListProviderTypesParams {
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this headers is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header
     *  for the corresponding response.  The same value is not used for downstream requests and retries of those
     *  requests.  If a value of this headers is not supplied in a request, the service generates a random (version 4)
     *  UUID.
     */
    xRequestId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getProviderTypeById` operation. */
  export interface GetProviderTypeByIdParams {
    /** The provider type ID. */
    providerTypeId: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this headers is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header
     *  for the corresponding response.  The same value is not used for downstream requests and retries of those
     *  requests.  If a value of this headers is not supplied in a request, the service generates a random (version 4)
     *  UUID.
     */
    xRequestId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listProviderTypeInstances` operation. */
  export interface ListProviderTypeInstancesParams {
    /** The provider type ID. */
    providerTypeId: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this headers is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header
     *  for the corresponding response.  The same value is not used for downstream requests and retries of those
     *  requests.  If a value of this headers is not supplied in a request, the service generates a random (version 4)
     *  UUID.
     */
    xRequestId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createProviderTypeInstance` operation. */
  export interface CreateProviderTypeInstanceParams {
    /** The provider type ID. */
    providerTypeId: string;
    /** The provider type instance name. */
    name?: string;
    /** The attributes for connecting to the provider type instance. */
    attributes?: JsonObject;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this headers is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header
     *  for the corresponding response.  The same value is not used for downstream requests and retries of those
     *  requests.  If a value of this headers is not supplied in a request, the service generates a random (version 4)
     *  UUID.
     */
    xRequestId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteProviderTypeInstance` operation. */
  export interface DeleteProviderTypeInstanceParams {
    /** The provider type ID. */
    providerTypeId: string;
    /** The provider type instance ID. */
    providerTypeInstanceId: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this headers is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header
     *  for the corresponding response.  The same value is not used for downstream requests and retries of those
     *  requests.  If a value of this headers is not supplied in a request, the service generates a random (version 4)
     *  UUID.
     */
    xRequestId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getProviderTypeInstance` operation. */
  export interface GetProviderTypeInstanceParams {
    /** The provider type ID. */
    providerTypeId: string;
    /** The provider type instance ID. */
    providerTypeInstanceId: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this headers is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header
     *  for the corresponding response.  The same value is not used for downstream requests and retries of those
     *  requests.  If a value of this headers is not supplied in a request, the service generates a random (version 4)
     *  UUID.
     */
    xRequestId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateProviderTypeInstance` operation. */
  export interface UpdateProviderTypeInstanceParams {
    /** The provider type ID. */
    providerTypeId: string;
    /** The provider type instance ID. */
    providerTypeInstanceId: string;
    /** The provider type instance name. */
    name?: string;
    /** The attributes for connecting to the provider type instance. */
    attributes?: JsonObject;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this headers is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header
     *  for the corresponding response.  The same value is not used for downstream requests and retries of those
     *  requests.  If a value of this headers is not supplied in a request, the service generates a random (version 4)
     *  UUID.
     */
    xRequestId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getProviderTypesInstances` operation. */
  export interface GetProviderTypesInstancesParams {
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this headers is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header
     *  for the corresponding response.  The same value is not used for downstream requests and retries of those
     *  requests.  If a value of this headers is not supplied in a request, the service generates a random (version 4)
     *  UUID.
     */
    xRequestId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** The account that is associated with a report. */
  export interface Account {
    /** The account ID. */
    id?: string;
    /** The account name. */
    name?: string;
    /** The account type. */
    type?: string;
  }

  /** AdditionalProperty. */
  export interface AdditionalProperty {
    /** An additional property that indicates the type of the attribute in various formats (text, url, secret,
     *  label, masked).
     */
    type: string;
    /** The name of the attribute that is displayed in the UI. */
    display_name: string;
  }

  /** The additional target attribute of the service. */
  export interface AdditionalTargetAttribute {
    /** The additional target attribute name. */
    name?: string;
    /** The operator. */
    operator?: string;
    /** The value. */
    value?: string;
  }

  /** The control specification assessment. */
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
    parameters?: ParameterInfo[];
  }

  /** The attachment that is associated with a report. */
  export interface Attachment {
    /** The attachment ID. */
    id?: string;
    /** The name of the attachment. */
    name?: string;
    /** The description of the attachment. */
    description?: string;
    /** The attachment schedule. */
    schedule?: string;
    /** The scope of the attachment. */
    scope?: AttachmentScope[];
  }

  /** The response body of an attachment. */
  export interface AttachmentCollection {
    /** The number of attachments. */
    total_count: number;
    /** The limit of attachments per request. */
    limit: number;
    /** The reference to the first page of entries. */
    first: PaginatedCollectionFirst;
    /** The reference URL for the next few entries. */
    next: PaginatedCollectionNext;
    /** The list of attachments. */
    attachments: AttachmentItem[];
  }

  /** The request payload of the attachments parameter. */
  export interface AttachmentItem {
    /** The ID of the attachment. */
    id?: string;
    /** The ID of the profile that is specified in the attachment. */
    profile_id?: string;
    /** The account ID that is associated to the attachment. */
    account_id?: string;
    /** The instance ID of the account that is associated to the attachment. */
    instance_id?: string;
    /** The scope payload for the multi cloud feature. */
    scope?: MultiCloudScope[];
    /** The date when the attachment was created. */
    created_on?: string;
    /** The user who created the attachment. */
    created_by?: string;
    /** The date when the attachment was updated. */
    updated_on?: string;
    /** The user who updated the attachment. */
    updated_by?: string;
    /** The status of an attachment evaluation. */
    status?: string;
    /** The schedule of an attachment evaluation. */
    schedule?: string;
    /** The request payload of the attachment notifications. */
    notifications?: AttachmentsNotificationsPrototype;
    /** The profile parameters for the attachment. */
    attachment_parameters?: AttachmentParameterPrototype[];
    /** The details of the last scan of an attachment. */
    last_scan?: LastScan;
    /** The start time of the next scan. */
    next_scan_time?: string;
    /** The name of the attachment. */
    name?: string;
    /** The description for the attachment. */
    description?: string;
  }

  /** The parameters related to the Attachment. */
  export interface AttachmentParameterPrototype {
    /** The type of the implementation. */
    assessment_type?: string;
    /** The implementation ID of the parameter. */
    assessment_id?: string;
    /** The parameter name. */
    parameter_name?: string;
    /** The value of the parameter. */
    parameter_value?: string;
    /** The parameter display name. */
    parameter_display_name?: string;
    /** The parameter type. */
    parameter_type?: string;
  }

  /** The request body of getting an attachment that is associated with your account. */
  export interface AttachmentPrototype {
    /** The ID of the profile that is specified in the attachment. */
    profile_id?: string;
    /** The array that displays all of the available attachments. */
    attachments: AttachmentsPrototype[];
  }

  /** A scope of the attachment. */
  export interface AttachmentScope {
    /** The unique identifier for this scope. */
    id?: string;
    /** The environment that relates to this scope. */
    environment?: string;
    /** The properties that are supported for scoping by this environment. */
    properties?: ScopeProperty[];
  }

  /** The request payload of the attachment notifications. */
  export interface AttachmentsNotificationsPrototype {
    /** enabled notifications. */
    enabled: boolean;
    /** The failed controls. */
    controls: FailedControls;
  }

  /** The request payload of getting all of the attachments that are associated with the account. */
  export interface AttachmentsPrototype {
    /** The id that is generated from the scope type and ID. */
    id?: string;
    /** The name that is generated from the scope type and ID. */
    name: string;
    /** The description for the attachment. */
    description?: string;
    /** The scope payload for the multi cloud feature. */
    scope: MultiCloudScope[];
    /** The status of the scan of an attachment. */
    status: string;
    /** The schedule of an attachment evaluation. */
    schedule: string;
    /** The request payload of the attachment notifications. */
    notifications?: AttachmentsNotificationsPrototype;
    /** The profile parameters for the attachment. */
    attachment_parameters: AttachmentParameterPrototype[];
  }

  /** The compliance score. */
  export interface ComplianceScore {
    /** The number of successful evaluations. */
    passed?: number;
    /** The total number of evaluations. */
    total_count?: number;
    /** The percentage of successful evaluations. */
    percent?: number;
  }

  /** The compliance stats. */
  export interface ComplianceStats {
    /** The allowed values of an aggregated status for controls, specifications, assessments, and resources. */
    status?: string;
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
  }

  /** The control documentation. */
  export interface ControlDocs {
    /** The ID of the control documentation. */
    control_docs_id?: string;
    /** The type of control documentation. */
    control_docs_type?: string;
  }

  /** The request payload of the control library. */
  export interface ControlLibrary {
    /** The control library ID. */
    id?: string;
    /** The account ID. */
    account_id?: string;
    /** The control library name. */
    control_library_name?: string;
    /** The control library description. */
    control_library_description?: string;
    /** The control library type. */
    control_library_type?: string;
    /** The version group label. */
    version_group_label?: string;
    /** The control library version. */
    control_library_version?: string;
    /** The date when the control library was created. */
    created_on?: string;
    /** The user who created the control library. */
    created_by?: string;
    /** The date when the control library was updated. */
    updated_on?: string;
    /** The user who updated the control library. */
    updated_by?: string;
    /** The latest version of the control library. */
    latest?: boolean;
    /** The indication of whether hierarchy is enabled for the control library. */
    hierarchy_enabled?: boolean;
    /** The number of controls. */
    controls_count?: number;
    /** The number of parent controls in the control library. */
    control_parents_count?: number;
    /** The list of controls in a control library. */
    controls?: ControlsInControlLib[];
  }

  /** The response body of control libraries. */
  export interface ControlLibraryCollection {
    /** The number of control libraries. */
    total_count: number;
    /** limit. */
    limit: number;
    /** The reference to the first page of entries. */
    first: PaginatedCollectionFirst;
    /** The reference URL for the next few entries. */
    next: PaginatedCollectionNext;
    /** The control libraries. */
    control_libraries: ControlLibraryItem[];
  }

  /** The response body of deleting of a control library. */
  export interface ControlLibraryDelete {
    /** The delete message of a control library. */
    deleted?: string;
  }

  /** ControlLibraryItem. */
  export interface ControlLibraryItem {
    /** The ID of the control library. */
    id?: string;
    /** The Account ID. */
    account_id?: string;
    /** The control library name. */
    control_library_name?: string;
    /** The control library description. */
    control_library_description?: string;
    /** The control library type. */
    control_library_type?: string;
    /** The date when the control library was created. */
    created_on?: string;
    /** The user who created the control library. */
    created_by?: string;
    /** The date when the control library was updated. */
    updated_on?: string;
    /** The use who updated the control library. */
    updated_by?: string;
    /** The version group label. */
    version_group_label?: string;
    /** The control library version. */
    control_library_version?: string;
    /** The latest control library version. */
    latest?: boolean;
    /** The number of controls. */
    controls_count?: number;
  }

  /** The control specification with compliance stats. */
  export interface ControlSpecificationWithStats {
    /** The control specification ID. */
    control_specification_id?: string;
    /** The component ID. */
    component_id?: string;
    /** The component description. */
    control_specification_description?: string;
    /** The environment. */
    environment?: string;
    /** The responsibility for managing control specifications. */
    responsibility?: string;
    /** The list of assessments. */
    assessments?: Assessment[];
    /** The allowed values of an aggregated status for controls, specifications, assessments, and resources. */
    status?: string;
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
  }

  /** The control specifications of a control library. */
  export interface ControlSpecifications {
    /** The control specification ID. */
    control_specification_id?: string;
    /** The responsibility for managing the control. */
    responsibility?: string;
    /** The component ID. */
    component_id?: string;
    /** The component name. */
    componenet_name?: string;
    /** The control specifications environment. */
    environment?: string;
    /** The control specifications description. */
    control_specification_description?: string;
    /** The number of assessments. */
    assessments_count?: number;
    /** The assessments. */
    assessments?: Implementation[];
  }

  /** The control with compliance stats. */
  export interface ControlWithStats {
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
    /** The control path. */
    control_path?: string;
    /** The list of specifications that are on the page. */
    control_specifications?: ControlSpecificationWithStats[];
    /** The allowed values of an aggregated status for controls, specifications, assessments, and resources. */
    status?: string;
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
  }

  /** The control details of a control library. */
  export interface ControlsInControlLib {
    /** The ID of the control library that contains the profile. */
    control_name?: string;
    /** The control name. */
    control_id?: string;
    /** The control description. */
    control_description?: string;
    /** The control category. */
    control_category?: string;
    /** The parent control. */
    control_parent?: string;
    /** The control tags. */
    control_tags?: string[];
    /** The control specifications. */
    control_specifications?: ControlSpecifications[];
    /** The control documentation. */
    control_docs?: ControlDocs;
    /** Is this a control that can be automated or manually evaluated. */
    control_requirement?: boolean;
    /** The control status. */
    status?: string;
  }

  /** The control details of a profile. */
  export interface DefaultParametersPrototype {
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

  /** The evaluation details. */
  export interface EvalDetails {
    /** The evaluation properties. */
    properties?: Property[];
  }

  /** The evaluation stats. */
  export interface EvalStats {
    /** The allowed values of an aggregated status for controls, specifications, assessments, and resources. */
    status?: string;
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

  /** The evaluation of a control specification assessment. */
  export interface Evaluation {
    /** The ID of the home account. */
    home_account_id?: string;
    /** The ID of the report that is associated to the evaluation. */
    report_id?: string;
    /** The control ID. */
    control_id?: string;
    /** The component ID. */
    component_id?: string;
    /** The control specification assessment. */
    assessment?: Assessment;
    /** The time when the evaluation was made. */
    evaluate_time?: string;
    /** The evaluation target. */
    target?: TargetInfo;
    /** The allowed values of an evaluation status. */
    status?: string;
    /** The reason for the evaluation failure. */
    reason?: string;
    /** The evaluation details. */
    details?: EvalDetails;
  }

  /** The page of assessment evaluations. */
  export interface EvaluationPage {
    /** The total number of resources that are in the collection. */
    total_count: number;
    /** The requested page limi.t. */
    limit: number;
    /** The token of the next page, when it's present. */
    start?: string;
    /** The page reference. */
    first: PageHRef;
    /** The page reference. */
    next?: PageHRef;
    /** The ID of the home account. */
    home_account_id?: string;
    /** The ID of the report. */
    report_id?: string;
    /** The list of evaluations that are on the page. */
    evaluations?: Evaluation[];
  }

  /** The Event Notifications settings. */
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

  /** The failed controls. */
  export interface FailedControls {
    /** The threshold limit. */
    threshold_limit?: number;
    /** The failed control IDs. */
    failed_control_ids?: string[];
  }

  /** The implementation details of a control library. */
  export interface Implementation {
    /** The assessment ID. */
    assessment_id?: string;
    /** The assessment method. */
    assessment_method?: string;
    /** The assessment type. */
    assessment_type?: string;
    /** The assessment description. */
    assessment_description?: string;
    /** The parameter count. */
    parameter_count?: number;
    /** The parameters. */
    parameters?: ParameterInfo[];
  }

  /** The collection of import parameters. */
  export interface Import {
    /** The list of import parameters. */
    parameters?: Parameter[];
  }

  /** The label that is associated with the provider type. */
  export interface LabelType {
    /** The text of the label. */
    text?: string;
    /** The text to be shown when user hover overs the label. */
    tip?: string;
  }

  /** The details of the last scan of an attachment. */
  export interface LastScan {
    /** The ID of the last scan of an attachment. */
    id?: string;
    /** The status of the last scan of an attachment. */
    status?: string;
    /** The time when the last scan started. */
    time?: string;
  }

  /** The scope payload for the multi cloud feature. */
  export interface MultiCloudScope {
    /** The environment that relates to this scope. */
    environment: string;
    /** The properties supported for scoping by this environment. */
    properties: PropertyItem[];
  }

  /** The Cloud Object Storage settings. */
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

  /** The page reference. */
  export interface PageHRef {
    /** The URL for the first and next page. */
    href: string;
  }

  /** A page reference. */
  export interface PageHRefFirst {
    /** A URL for the first and next page. */
    href: string;
  }

  /** A page reference. */
  export interface PageHRefNext {
    /** A URL for the first and next page. */
    href: string;
    /** The token of the next page when present. */
    start?: string;
  }

  /** The reference to the first page of entries. */
  export interface PaginatedCollectionFirst {
    /** The reference URL for the first few entries. */
    href?: string;
  }

  /** The reference URL for the next few entries. */
  export interface PaginatedCollectionNext {
    /** The reference URL for the entries. */
    href?: string;
    /** The reference to the start of the list of entries. */
    start?: string;
  }

  /** The rule import parameter. */
  export interface Parameter {
    /** The import parameter name. */
    name?: string;
    /** The display name of the property. */
    display_name?: string;
    /** The propery description. */
    description?: string;
    /** The property type. */
    type?: string;
  }

  /** The parameter details. */
  export interface ParameterInfo {
    /** The parameter name. */
    parameter_name?: string;
    /** The parameter display name. */
    parameter_display_name?: string;
    /** The parameter type. */
    parameter_type?: string;
    /** The property value. */
    parameter_value?: any;
  }

  /** The response body of the profile. */
  export interface Profile {
    /** The unique ID of the profile. */
    id?: string;
    /** The profile name. */
    profile_name?: string;
    /** The profile description. */
    profile_description?: string;
    /** The profile type, such as custom or predefined. */
    profile_type?: string;
    /** The version status of the profile. */
    profile_version?: string;
    /** The version group label of the profile. */
    version_group_label?: string;
    /** The instance ID. */
    instance_id?: string;
    /** The latest version of the profile. */
    latest?: boolean;
    /** The indication of whether hierarchy is enabled for the profile. */
    hierarchy_enabled?: boolean;
    /** The user who created the profile. */
    created_by?: string;
    /** The date when the profile was created. */
    created_on?: string;
    /** The user who updated the profile. */
    updated_by?: string;
    /** The date when the profile was updated. */
    updated_on?: string;
    /** The number of controls for the profile. */
    controls_count?: number;
    /** The number of parent controls for the profile. */
    control_parents_count?: number;
    /** The number of attachments related to this profile. */
    attachments_count?: number;
    /** The array of controls that are used to create the profile. */
    controls?: ProfileControls[];
    /** The default parameters of the profile. */
    default_parameters?: DefaultParametersPrototype[];
  }

  /** The response body to get all profiles that are linked to your account. */
  export interface ProfileCollection {
    /** The number of profiles. */
    total_count: number;
    /** The limit of profiles that can be created. */
    limit: number;
    /** The reference to the first page of entries. */
    first: PaginatedCollectionFirst;
    /** The reference URL for the next few entries. */
    next: PaginatedCollectionNext;
    /** The profiles. */
    profiles: ProfileItem[];
  }

  /** The control details for the profile. */
  export interface ProfileControls {
    /** The ID of the control library that contains the profile. */
    control_library_id?: string;
    /** The unique ID of the control library that contains the profile. */
    control_id?: string;
    /** The most recent version of the control library. */
    control_library_version?: string;
    /** The control name. */
    control_name?: string;
    /** The control description. */
    control_description?: string;
    /** The control category. */
    control_category?: string;
    /** The parent control. */
    control_parent?: string;
    /** Is this a control that can be automated or manually evaluated. */
    control_requirement?: boolean;
    /** The control documentation. */
    control_docs?: ControlDocs;
    /** The number of control specifications. */
    control_specifications_count?: number;
    /** The control specifications. */
    control_specifications?: ControlSpecifications[];
  }

  /** The control details of a profile. */
  export interface ProfileControlsPrototype {
    /** The ID of the control library that contains the profile. */
    control_library_id?: string;
    /** The control ID. */
    control_id?: string;
  }

  /** The profile information. */
  export interface ProfileInfo {
    /** The profile ID. */
    id?: string;
    /** The profile name. */
    name?: string;
    /** The profile version. */
    version?: string;
  }

  /** ProfileItem. */
  export interface ProfileItem {
    /** The profile ID. */
    id?: string;
    /** The profile name. */
    profile_name?: string;
    /** The profile description. */
    profile_description?: string;
    /** The profile type. */
    profile_type?: string;
    /** The profile version. */
    profile_version?: string;
    /** The version group label. */
    version_group_label?: string;
    /** The latest profile. */
    latest?: boolean;
    /** The user who created the profile. */
    created_by?: string;
    /** The date when the profile was created. */
    created_on?: string;
    /** The user who updated the profile. */
    updated_by?: string;
    /** The date when the profile was updated. */
    updated_on?: string;
    /** The number of controls. */
    controls_count?: number;
    /** The number of attachments. */
    attachments_count?: number;
  }

  /** The property. */
  export interface Property {
    /** The property name. */
    property?: string;
    /** The property description. */
    property_description?: string;
    /** The property operator. */
    operator?: string;
    /** The property value. */
    expected_value?: any;
    /** The property value. */
    found_value?: any;
  }

  /** The properties supported for scoping by this environment. */
  export interface PropertyItem {
    /** The name of the property. */
    name?: string;
    /** The value of the property. */
    value?: string;
  }

  /** A provider type instance. */
  export interface ProviderTypeInstanceItem {
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

  /** Provider type instances response. */
  export interface ProviderTypeInstancesResponse {
    /** The array of instances for a provider type. */
    provider_type_instances?: ProviderTypeInstanceItem[];
  }

  /** The provider type item. */
  export interface ProviderTypeItem {
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

  /** The provider types collection. */
  export interface ProviderTypesCollection {
    /** The array of provder type. */
    provider_types?: ProviderTypeItem[];
  }

  /** Provider types instances response. */
  export interface ProviderTypesInstancesResponse {
    /** The array of instances for all provider types. */
    provider_types_instances?: ProviderTypeInstanceItem[];
  }

  /** The report. */
  export interface Report {
    /** The ID of the report. */
    id?: string;
    /** The group ID that is associated with the report. The group ID combines profile, scope, and attachment IDs. */
    group_id?: string;
    /** The date when the report was created. */
    created_on?: string;
    /** The date when the scan was run. */
    scan_time?: string;
    /** The type of the scan. */
    type?: string;
    /** The Cloud Object Storage object that is associated with the report. */
    cos_object?: string;
    /** Instance ID. */
    instance_id?: string;
    /** The account that is associated with a report. */
    account?: Account;
    /** The profile information. */
    profile?: ProfileInfo;
    /** The attachment that is associated with a report. */
    attachment?: Attachment;
  }

  /** The list of controls. */
  export interface ReportControls {
    /** The allowed values of an aggregated status for controls, specifications, assessments, and resources. */
    status?: string;
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
    /** The ID of the home account. */
    home_account_id?: string;
    /** The ID of the report. */
    report_id?: string;
    /** The list of controls that are in the report. */
    controls?: ControlWithStats[];
  }

  /** The response body of the `get_latest_reports` operation. */
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

  /** The page of reports. */
  export interface ReportPage {
    /** The total number of resources that are in the collection. */
    total_count: number;
    /** The requested page limi.t. */
    limit: number;
    /** The token of the next page, when it's present. */
    start?: string;
    /** The page reference. */
    first: PageHRef;
    /** The page reference. */
    next?: PageHRef;
    /** The ID of the home account. */
    home_account_id?: string;
    /** The list of reports that are on the page. */
    reports?: Report[];
  }

  /** The report summary. */
  export interface ReportSummary {
    /** The ID of the report. */
    report_id?: string;
    /** Instance ID. */
    isntance_id?: string;
    /** The account that is associated with a report. */
    account?: Account;
    /** The compliance score. */
    score?: ComplianceScore;
    /** The compliance stats. */
    controls?: ComplianceStats;
    /** The evaluation stats. */
    evaluations?: EvalStats;
    /** The resource summary. */
    resources?: ResourceSummary;
  }

  /** The response body of the `get_tags` operation. */
  export interface ReportTags {
    /** The ID of the report. */
    report_id?: string;
    /** The collection of different types of tags. */
    tags?: Tags;
  }

  /** The report violation data point. */
  export interface ReportViolationDataPoint {
    /** The ID of the report. */
    report_id?: string;
    /** The group ID that is associated with the report. The group ID combines profile, scope, and attachment IDs. */
    report_group_id?: string;
    /** The date when the scan was run. */
    scan_time?: string;
    /** The compliance stats. */
    controls?: ComplianceStats;
  }

  /** The response body of the `get_report_violations_drift` operation. */
  export interface ReportViolationsDrift {
    /** The ID of the home account. */
    home_account_id?: string;
    /** The ID of the report. */
    report_id?: string;
    /** The list of report violations data points. */
    data_points?: ReportViolationDataPoint[];
  }

  /** The required configurations. */
  export interface RequiredConfig {
  }

  /** RequiredConfigItems. */
  export interface RequiredConfigItems {
  }

  /** The resource. */
  export interface Resource {
    /** The ID of the report. */
    report_id?: string;
    /** The resource CRN. */
    id?: string;
    /** The resource name. */
    resource_name?: string;
    /** The ID of the component. */
    component_id?: string;
    /** The environment. */
    environment?: string;
    /** The account that is associated with a report. */
    account?: Account;
    /** The allowed values of an aggregated status for controls, specifications, assessments, and resources. */
    status?: string;
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

  /** The page of resource evaluation summaries. */
  export interface ResourcePage {
    /** The total number of resources that are in the collection. */
    total_count: number;
    /** The requested page limi.t. */
    limit: number;
    /** The token of the next page, when it's present. */
    start?: string;
    /** The page reference. */
    first: PageHRef;
    /** The page reference. */
    next?: PageHRef;
    /** The ID of the home account. */
    home_account_id?: string;
    /** The ID of the report. */
    report_id?: string;
    /** The list of resource evaluation summaries that are on the page. */
    resources?: Resource[];
  }

  /** The resource summary. */
  export interface ResourceSummary {
    /** The allowed values of an aggregated status for controls, specifications, assessments, and resources. */
    status?: string;
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
    /** The top 10 resources that have the most failures. */
    top_failed?: ResourceSummaryItem[];
  }

  /** The resource summary item. */
  export interface ResourceSummaryItem {
    /** The resource name. */
    name?: string;
    /** The resource ID. */
    id?: string;
    /** The service that is managing the resource. */
    service?: string;
    /** The collection of different types of tags. */
    tags?: Tags;
    /** The account that owns the resource. */
    account?: string;
    /** The allowed values of an aggregated status for controls, specifications, assessments, and resources. */
    status?: string;
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

  /** The rule response that corresponds to an account instance. */
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
    type: string;
    /** The version number of a rule. */
    version: string;
    /** The collection of import parameters. */
    import?: Import;
    /** The rule target. */
    target: Target;
    /** The required configurations. */
    required_config: RequiredConfig;
    /** The list of labels. */
    labels: string[];
  }

  /** The rule. */
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

  /** Page common fields. */
  export interface RulesPageBase {
    /** The requested page limit. */
    limit: number;
    /** The total number of resources in the collection. */
    total_count: number;
    /** A page reference. */
    first: PageHRefFirst;
    /** A page reference. */
    next?: PageHRefNext;
    /** The collection of rules that correspond to an account instance. Maximum of 100/500 custom rules per
     *  stand-alone/enterprise account.
     */
    rules?: Rule[];
  }

  /** The response schema for creating a scan. */
  export interface Scan {
    /** The scan ID. */
    id?: string;
    /** The account ID. */
    account_id?: string;
    /** The attachment ID of a profile. */
    attachment_id?: string;
    /** The report ID. */
    report_id?: string;
    /** The status of the scan. */
    status?: string;
    /** The last scan time. */
    last_scan_time?: string;
    /** The next scan time. */
    next_scan_time?: string;
    /** The type of scan. */
    scan_type?: string;
    /** The occurrence of the scan. */
    occurence?: number;
  }

  /** The properties that are supported for scoping by this attachment. */
  export interface ScopeProperty {
    /** The property name. */
    name?: string;
    /** The property value. */
    value?: string;
  }

  /** The settings. */
  export interface Settings {
    /** The Event Notifications settings. */
    event_notifications?: EventNotifications;
    /** The Cloud Object Storage settings. */
    object_storage?: ObjectStorage;
  }

  /** The collection of different types of tags. */
  export interface Tags {
    /** The collection of user tags. */
    user?: string[];
    /** The collection of access tags. */
    access?: string[];
    /** The collection of service tags. */
    service?: string[];
  }

  /** The rule target. */
  export interface Target {
    /** The target service name. */
    service_name: string;
    /** The display name of the target service. */
    service_display_name?: string;
    /** The target resource kind. */
    resource_kind: string;
    /** The list of targets supported properties. */
    additional_target_attributes?: AdditionalTargetAttribute[];
  }

  /** The evaluation target. */
  export interface TargetInfo {
    /** The target ID. */
    id?: string;
    /** The target account ID. */
    account_id?: string;
    /** The target resource CRN. */
    resource_crn?: string;
    /** The target resource name. */
    resource_name?: string;
    /** The target service name. */
    service_name?: string;
  }

  /** The details of a test event response. */
  export interface TestEvent {
    /** The indication of whether the event was received by Event Notifications. */
    success: boolean;
  }

  /** RequiredConfigItemsRequiredConfigAnd. */
  export interface RequiredConfigItemsRequiredConfigAnd extends RequiredConfigItems {
    /** The required config description. */
    description?: string;
    /** The `AND` required configurations. */
    and?: RequiredConfigItems[];
  }

  /** The required configuration base object. */
  export interface RequiredConfigItemsRequiredConfigBase extends RequiredConfigItems {
    /** The required config description. */
    description?: string;
    /** The property. */
    property: string;
    /** The operator. */
    operator: string;
    /** Schema for any JSON type. */
    value?: any;
  }

  /** The `OR` required configurations. */
  export interface RequiredConfigItemsRequiredConfigOr extends RequiredConfigItems {
    /** The required config description. */
    description?: string;
    /** The `OR` required configurations. */
    or?: RequiredConfigItems[];
  }

  /** RequiredConfigRequiredConfigAnd. */
  export interface RequiredConfigRequiredConfigAnd extends RequiredConfig {
    /** The required config description. */
    description?: string;
    /** The `AND` required configurations. */
    and?: RequiredConfigItems[];
  }

  /** The required configuration base object. */
  export interface RequiredConfigRequiredConfigBase extends RequiredConfig {
    /** The required config description. */
    description?: string;
    /** The property. */
    property: string;
    /** The operator. */
    operator: string;
    /** Schema for any JSON type. */
    value?: any;
  }

  /** The `OR` required configurations. */
  export interface RequiredConfigRequiredConfigOr extends RequiredConfig {
    /** The required config description. */
    description?: string;
    /** The `OR` required configurations. */
    or?: RequiredConfigItems[];
  }

  /*************************
   * pager classes
   ************************/

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
     * @param {Object} [params] - The parameters to be passed to listControlLibraries()
     * @constructor
     * @returns {ControlLibrariesPager}
     */
    constructor(
      client: SecurityAndComplianceCenterApiV3,
      params?: SecurityAndComplianceCenterApiV3.ListControlLibrariesParams
    ) {
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
     * @returns {Promise<SecurityAndComplianceCenterApiV3.ControlLibraryItem[]>}
     */
    public async getNext(): Promise<SecurityAndComplianceCenterApiV3.ControlLibraryItem[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listControlLibraries(this.params);
      const { result } = response;

      let next = null;
      if (result && result.next) {
        next = result.next.start
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.control_libraries;
    }

    /**
     * Returns all results by invoking listControlLibraries() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<SecurityAndComplianceCenterApiV3.ControlLibraryItem[]>}
     */
    public async getAll(): Promise<SecurityAndComplianceCenterApiV3.ControlLibraryItem[]> {
      const results: ControlLibraryItem[] = [];
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
     * @param {Object} [params] - The parameters to be passed to listProfiles()
     * @constructor
     * @returns {ProfilesPager}
     */
    constructor(
      client: SecurityAndComplianceCenterApiV3,
      params?: SecurityAndComplianceCenterApiV3.ListProfilesParams
    ) {
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
     * @returns {Promise<SecurityAndComplianceCenterApiV3.ProfileItem[]>}
     */
    public async getNext(): Promise<SecurityAndComplianceCenterApiV3.ProfileItem[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listProfiles(this.params);
      const { result } = response;

      let next = null;
      if (result && result.next) {
        next = result.next.start
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.profiles;
    }

    /**
     * Returns all results by invoking listProfiles() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<SecurityAndComplianceCenterApiV3.ProfileItem[]>}
     */
    public async getAll(): Promise<SecurityAndComplianceCenterApiV3.ProfileItem[]> {
      const results: ProfileItem[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * AttachmentsPager can be used to simplify the use of listAttachments().
   */
  export class AttachmentsPager {
    protected _hasNext: boolean;
    protected pageContext: any;

    protected client: SecurityAndComplianceCenterApiV3;

    protected params: SecurityAndComplianceCenterApiV3.ListAttachmentsParams;

    /**
     * Construct a AttachmentsPager object.
     *
     * @param {SecurityAndComplianceCenterApiV3}  client - The service client instance used to invoke listAttachments()
     * @param {Object} params - The parameters to be passed to listAttachments()
     * @constructor
     * @returns {AttachmentsPager}
     */
    constructor(
      client: SecurityAndComplianceCenterApiV3,
      params: SecurityAndComplianceCenterApiV3.ListAttachmentsParams
    ) {
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
     * Returns the next page of results by invoking listAttachments().
     * @returns {Promise<SecurityAndComplianceCenterApiV3.AttachmentItem[]>}
     */
    public async getNext(): Promise<SecurityAndComplianceCenterApiV3.AttachmentItem[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listAttachments(this.params);
      const { result } = response;

      let next = null;
      if (result && result.next) {
        next = result.next.start
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.attachments;
    }

    /**
     * Returns all results by invoking listAttachments() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<SecurityAndComplianceCenterApiV3.AttachmentItem[]>}
     */
    public async getAll(): Promise<SecurityAndComplianceCenterApiV3.AttachmentItem[]> {
      const results: AttachmentItem[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * AttachmentsAccountPager can be used to simplify the use of listAttachmentsAccount().
   */
  export class AttachmentsAccountPager {
    protected _hasNext: boolean;
    protected pageContext: any;

    protected client: SecurityAndComplianceCenterApiV3;

    protected params: SecurityAndComplianceCenterApiV3.ListAttachmentsAccountParams;

    /**
     * Construct a AttachmentsAccountPager object.
     *
     * @param {SecurityAndComplianceCenterApiV3}  client - The service client instance used to invoke listAttachmentsAccount()
     * @param {Object} [params] - The parameters to be passed to listAttachmentsAccount()
     * @constructor
     * @returns {AttachmentsAccountPager}
     */
    constructor(
      client: SecurityAndComplianceCenterApiV3,
      params?: SecurityAndComplianceCenterApiV3.ListAttachmentsAccountParams
    ) {
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
     * Returns the next page of results by invoking listAttachmentsAccount().
     * @returns {Promise<SecurityAndComplianceCenterApiV3.AttachmentItem[]>}
     */
    public async getNext(): Promise<SecurityAndComplianceCenterApiV3.AttachmentItem[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listAttachmentsAccount(this.params);
      const { result } = response;

      let next = null;
      if (result && result.next) {
        next = result.next.start
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.attachments;
    }

    /**
     * Returns all results by invoking listAttachmentsAccount() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<SecurityAndComplianceCenterApiV3.AttachmentItem[]>}
     */
    public async getAll(): Promise<SecurityAndComplianceCenterApiV3.AttachmentItem[]> {
      const results: AttachmentItem[] = [];
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
     * @param {Object} [params] - The parameters to be passed to listReports()
     * @constructor
     * @returns {ReportsPager}
     */
    constructor(
      client: SecurityAndComplianceCenterApiV3,
      params?: SecurityAndComplianceCenterApiV3.ListReportsParams
    ) {
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

      let next = null;
      if (result && result.next) {
        if (result.next.href) {
          next = getQueryParam(result.next.href, 'start');
        }
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
    constructor(
      client: SecurityAndComplianceCenterApiV3,
      params: SecurityAndComplianceCenterApiV3.ListReportEvaluationsParams
    ) {
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

      let next = null;
      if (result && result.next) {
        if (result.next.href) {
          next = getQueryParam(result.next.href, 'start');
        }
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
    constructor(
      client: SecurityAndComplianceCenterApiV3,
      params: SecurityAndComplianceCenterApiV3.ListReportResourcesParams
    ) {
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

      let next = null;
      if (result && result.next) {
        if (result.next.href) {
          next = getQueryParam(result.next.href, 'start');
        }
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
}

export = SecurityAndComplianceCenterApiV3;
