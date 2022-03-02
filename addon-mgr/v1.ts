/**
 * (C) Copyright IBM Corp. 2022.
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
 * IBM OpenAPI SDK Code Generator Version: 3.46.0-a4e29da0-20220224-210428
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
 * The Addon Manager API
 *
 * API Version: 1.0.0
 */

class AddonMgrV1 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://us-south.secadvisor.cloud.ibm.com/addonmgr';

  static DEFAULT_SERVICE_NAME: string = 'addon_mgr';

  private static _regionalEndpoints = new Map([
    ['us-south', 'https://us-south.secadvisor.cloud.ibm.com/addonmgr'],
    ['us-east', 'https://us-south.secadvisor.cloud.ibm.com/addonmgr'],
    ['eu-gb', 'https://eu-gb.secadvisor.cloud.ibm.com/addonmgr'],
    ['eu-de', 'https://eu.compliance.cloud.ibm.com/si/addonmgr'],
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
   * Constructs an instance of AddonMgrV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {AddonMgrV1}
   */

  public static newInstance(options: UserOptions): AddonMgrV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new AddonMgrV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /** Account ID. */
  accountId: string;

  /**
   * Construct a AddonMgrV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.accountId - Account ID.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service. The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {AddonMgrV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    const _requiredParams = ['accountId'];
    const _validationErrors = validateParams(options, _requiredParams, null);
    if (_validationErrors) {
      throw _validationErrors;
    }
    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(AddonMgrV1.DEFAULT_SERVICE_URL);
    }
    this.accountId = options.accountId;
  }

  /*************************
   * addonManagerCos
   ************************/

  /**
   * Add cos details.
   *
   * Addcos details.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.regionId - Region for example - us-south, eu-gb.
   * @param {CosDetailsV2CosDetailsItem[]} params.cosDetails -
   * @param {string} [params.transactionId] - The transaction id for the request in uuid v4 format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AddonMgrV1.Response<AddonMgrV1.Empty>>}
   */
  public addNetworkInsightsCosDetailsV2(
    params: AddonMgrV1.AddNetworkInsightsCosDetailsV2Params
  ): Promise<AddonMgrV1.Response<AddonMgrV1.Empty>> {
    const _params = { ...params };
    const _requiredParams = ['regionId', 'cosDetails'];
    const _validParams = ['regionId', 'cosDetails', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'region_id': _params.regionId,
      'cos_details': _params.cosDetails,
    };

    const path = {
      'account_id': this.accountId,
    };

    const sdkHeaders = getSdkHeaders(
      AddonMgrV1.DEFAULT_SERVICE_NAME,
      'v1',
      'addNetworkInsightsCosDetailsV2'
    );

    const parameters = {
      options: {
        url: '/v2/addons/{account_id}/network-insights/cos',
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
   * Delete cos details.
   *
   * Delete NA cos details.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string[]} [params.ids] - Array of Ids of COS entries.
   * @param {string} [params.transactionId] - The transaction id for the request in uuid v4 format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AddonMgrV1.Response<AddonMgrV1.Empty>>}
   */
  public deleteNetworkInsightsCosDetailsV2(
    params?: AddonMgrV1.DeleteNetworkInsightsCosDetailsV2Params
  ): Promise<AddonMgrV1.Response<AddonMgrV1.Empty>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['ids', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'ids': _params.ids,
    };

    const path = {
      'account_id': this.accountId,
    };

    const sdkHeaders = getSdkHeaders(
      AddonMgrV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteNetworkInsightsCosDetailsV2'
    );

    const parameters = {
      options: {
        url: '/v2/addons/{account_id}/network-insights/cos',
        method: 'DELETE',
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
   * Add cos details.
   *
   * Addcos details.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.regionId - Region for example - us-south, eu-gb.
   * @param {CosDetailsV2CosDetailsItem[]} params.cosDetails -
   * @param {string} [params.transactionId] - The transaction id for the request in uuid v4 format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AddonMgrV1.Response<AddonMgrV1.Empty>>}
   */
  public addActivityInsightsCosDetailsV2(
    params: AddonMgrV1.AddActivityInsightsCosDetailsV2Params
  ): Promise<AddonMgrV1.Response<AddonMgrV1.Empty>> {
    const _params = { ...params };
    const _requiredParams = ['regionId', 'cosDetails'];
    const _validParams = ['regionId', 'cosDetails', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'region_id': _params.regionId,
      'cos_details': _params.cosDetails,
    };

    const path = {
      'account_id': this.accountId,
    };

    const sdkHeaders = getSdkHeaders(
      AddonMgrV1.DEFAULT_SERVICE_NAME,
      'v1',
      'addActivityInsightsCosDetailsV2'
    );

    const parameters = {
      options: {
        url: '/v2/addons/{account_id}/activity-insights/cos',
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
   * Delete cos details.
   *
   * Delete AT cos details.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string[]} [params.ids] - Array of Ids of COS entries.
   * @param {string} [params.transactionId] - The transaction id for the request in uuid v4 format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AddonMgrV1.Response<AddonMgrV1.Empty>>}
   */
  public deleteActivityInsightsCosDetailsV2(
    params?: AddonMgrV1.DeleteActivityInsightsCosDetailsV2Params
  ): Promise<AddonMgrV1.Response<AddonMgrV1.Empty>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['ids', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'ids': _params.ids,
    };

    const path = {
      'account_id': this.accountId,
    };

    const sdkHeaders = getSdkHeaders(
      AddonMgrV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteActivityInsightsCosDetailsV2'
    );

    const parameters = {
      options: {
        url: '/v2/addons/{account_id}/activity-insights/cos',
        method: 'DELETE',
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
   * addonManagerDisable
   ************************/

  /**
   * Disable add-on.
   *
   * Disable add-on.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.regionId - Region id for example - us.
   * @param {boolean} [params.networkInsights] -
   * @param {boolean} [params.activityInsights] -
   * @param {string} [params.transactionId] - The transaction id for the request in uuid v4 format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AddonMgrV1.Response<AddonMgrV1.Empty>>}
   */
  public disableInsightsV2(
    params: AddonMgrV1.DisableInsightsV2Params
  ): Promise<AddonMgrV1.Response<AddonMgrV1.Empty>> {
    const _params = { ...params };
    const _requiredParams = ['regionId'];
    const _validParams = ['regionId', 'networkInsights', 'activityInsights', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'region_id': _params.regionId,
      'network-insights': _params.networkInsights,
      'activity-insights': _params.activityInsights,
    };

    const path = {
      'account_id': this.accountId,
    };

    const sdkHeaders = getSdkHeaders(
      AddonMgrV1.DEFAULT_SERVICE_NAME,
      'v1',
      'disableInsightsV2'
    );

    const parameters = {
      options: {
        url: '/v2/addons/{account_id}/disable',
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
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * addonManagerEnable
   ************************/

  /**
   * Enable add-on.
   *
   * Enable add-on.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.regionId - Region id for example - us.
   * @param {boolean} [params.networkInsights] -
   * @param {boolean} [params.activityInsights] -
   * @param {string} [params.transactionId] - The transaction id for the request in uuid v4 format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AddonMgrV1.Response<AddonMgrV1.Empty>>}
   */
  public enableInsightsV2(
    params: AddonMgrV1.EnableInsightsV2Params
  ): Promise<AddonMgrV1.Response<AddonMgrV1.Empty>> {
    const _params = { ...params };
    const _requiredParams = ['regionId'];
    const _validParams = ['regionId', 'networkInsights', 'activityInsights', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'region_id': _params.regionId,
      'network-insights': _params.networkInsights,
      'activity-insights': _params.activityInsights,
    };

    const path = {
      'account_id': this.accountId,
    };

    const sdkHeaders = getSdkHeaders(
      AddonMgrV1.DEFAULT_SERVICE_NAME,
      'v1',
      'enableInsightsV2'
    );

    const parameters = {
      options: {
        url: '/v2/addons/{account_id}/enable',
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
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * addonManagerInsights
   ************************/

  /**
   * Fetch supported insights.
   *
   * Retrieve insights details.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.transactionId] - The transaction id for the request in uuid v4 format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AddonMgrV1.Response<AddonMgrV1.AllInsights>>}
   */
  public getSupportedInsightsV2(
    params?: AddonMgrV1.GetSupportedInsightsV2Params
  ): Promise<AddonMgrV1.Response<AddonMgrV1.AllInsights>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'account_id': this.accountId,
    };

    const sdkHeaders = getSdkHeaders(
      AddonMgrV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getSupportedInsightsV2'
    );

    const parameters = {
      options: {
        url: '/v2/addons/{account_id}/insights',
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
  /*************************
   * addonManagerTestFindings
   ************************/

  /**
   * test findings for activity-insights.
   *
   * Test findings for activity-insights.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.regionId - Region for example - us-south, eu-gb.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AddonMgrV1.Response<AddonMgrV1.Empty>>}
   */
  public testAiFindingsV2(
    params: AddonMgrV1.TestAiFindingsV2Params
  ): Promise<AddonMgrV1.Response<AddonMgrV1.Empty>> {
    const _params = { ...params };
    const _requiredParams = ['regionId'];
    const _validParams = ['regionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'region_id': _params.regionId,
    };

    const path = {
      'account_id': this.accountId,
    };

    const sdkHeaders = getSdkHeaders(
      AddonMgrV1.DEFAULT_SERVICE_NAME,
      'v1',
      'testAiFindingsV2'
    );

    const parameters = {
      options: {
        url: '/v2/addons/{account_id}/activity-insights/test-ai-findings',
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
}

/*************************
 * interfaces
 ************************/

namespace AddonMgrV1 {
  /** Options for the `AddonMgrV1` constructor. */
  export interface Options extends UserOptions {
    /** Account ID. */
    accountId: string;
  }

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
  export interface Empty {}

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `addNetworkInsightsCosDetailsV2` operation. */
  export interface AddNetworkInsightsCosDetailsV2Params {
    /** Region for example - us-south, eu-gb. */
    regionId: string;
    cosDetails: CosDetailsV2CosDetailsItem[];
    /** The transaction id for the request in uuid v4 format. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteNetworkInsightsCosDetailsV2` operation. */
  export interface DeleteNetworkInsightsCosDetailsV2Params {
    /** Array of Ids of COS entries. */
    ids?: string[];
    /** The transaction id for the request in uuid v4 format. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `addActivityInsightsCosDetailsV2` operation. */
  export interface AddActivityInsightsCosDetailsV2Params {
    /** Region for example - us-south, eu-gb. */
    regionId: string;
    cosDetails: CosDetailsV2CosDetailsItem[];
    /** The transaction id for the request in uuid v4 format. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteActivityInsightsCosDetailsV2` operation. */
  export interface DeleteActivityInsightsCosDetailsV2Params {
    /** Array of Ids of COS entries. */
    ids?: string[];
    /** The transaction id for the request in uuid v4 format. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `disableInsightsV2` operation. */
  export interface DisableInsightsV2Params {
    /** Region id for example - us. */
    regionId: string;
    networkInsights?: boolean;
    activityInsights?: boolean;
    /** The transaction id for the request in uuid v4 format. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `enableInsightsV2` operation. */
  export interface EnableInsightsV2Params {
    /** Region id for example - us. */
    regionId: string;
    networkInsights?: boolean;
    activityInsights?: boolean;
    /** The transaction id for the request in uuid v4 format. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getSupportedInsightsV2` operation. */
  export interface GetSupportedInsightsV2Params {
    /** The transaction id for the request in uuid v4 format. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `testAiFindingsV2` operation. */
  export interface TestAiFindingsV2Params {
    /** Region for example - us-south, eu-gb. */
    regionId: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** AllInsights. */
  export interface AllInsights {
    type?: string[];
  }

  /** CosDetailsV2CosDetailsItem. */
  export interface CosDetailsV2CosDetailsItem {
    cos_instance: string;
    bucket_name: string;
    description: string;
    /** Insights type. */
    type: string;
    /** cos bucket url. */
    cos_bucket_url: string;
  }
}

export = AddonMgrV1;
