/**
 * (C) Copyright IBM Corp. 2021.
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

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import { Authenticator, BaseService, getAuthenticatorFromEnvironment, getMissingParams, UserOptions } from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * notifications-api
 */

class NotificationsApiV1 extends BaseService {

  static DEFAULT_SERVICE_URL: string = 'https://notifications-api.cloud.ibm.com/notifications';
  static DEFAULT_SERVICE_NAME: string = 'notifications_api';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of NotificationsApiV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {NotificationsApiV1}
   */

  public static newInstance(options: UserOptions): NotificationsApiV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new NotificationsApiV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }


  /**
   * Construct a NotificationsApiV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net/notifications'). The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {NotificationsApiV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(NotificationsApiV1.DEFAULT_SERVICE_URL);
    }
  }

  /*************************
   * notificationChannel
   ************************/

  /**
   * list all channels.
   *
   * list all channels under this account.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - Account ID.
   * @param {string} [params.transactionId] - The transaction id for the request in uuid v4 format.
   * @param {number} [params.limit] - Limit the number of the returned documents to the specified number.
   * @param {number} [params.skip] - The offset is the index of the item from which you want to start returning data
   * from. Default is 0.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<NotificationsApiV1.Response<NotificationsApiV1.ListChannelsResponse>>}
   */
  public listAllChannels(params: NotificationsApiV1.ListAllChannelsParams): Promise<NotificationsApiV1.Response<NotificationsApiV1.ListChannelsResponse>> {
    const _params = extend({}, params);
    const requiredParams = ['accountId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        return reject(missingParams);
      }

      const query = {
        'limit': _params.limit,
        'skip': _params.skip
      };

      const path = {
        'account_id': _params.accountId
      };

      const sdkHeaders = getSdkHeaders(NotificationsApiV1.DEFAULT_SERVICE_NAME, 'v1', 'listAllChannels');

      const parameters = {
        options: {
          url: '/v1/{account_id}/notifications/channels',
          method: 'GET',
          qs: query,
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
            'Transaction-Id': _params.transactionId
          }, _params.headers),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  };

  /**
   * create notification channel.
   *
   * create notification channel.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - Account ID.
   * @param {string} params.name -
   * @param {string} params.type - Type of callback URL.
   * @param {string} params.endpoint - The callback URL which receives the notification.
   * @param {string} [params.description] - A one sentence description of this `Channel`.
   * @param {string[]} [params.severity] - Severity of the notification to be received.
   * @param {boolean} [params.enabled] - Channel is enabled or not. Default is disabled.
   * @param {NotificationChannelAlertSourceItem[]} [params.alertSource] -
   * @param {string} [params.transactionId] - The transaction id for the request in uuid v4 format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<NotificationsApiV1.Response<NotificationsApiV1.CreateChannelsResponse>>}
   */
  public createNotificationChannel(params: NotificationsApiV1.CreateNotificationChannelParams): Promise<NotificationsApiV1.Response<NotificationsApiV1.CreateChannelsResponse>> {
    const _params = extend({}, params);
    const requiredParams = ['accountId', 'name', 'type', 'endpoint'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        return reject(missingParams);
      }

      const body = {
        'name': _params.name,
        'type': _params.type,
        'endpoint': _params.endpoint,
        'description': _params.description,
        'severity': _params.severity,
        'enabled': _params.enabled,
        'alert_source': _params.alertSource
      };

      const path = {
        'account_id': _params.accountId
      };

      const sdkHeaders = getSdkHeaders(NotificationsApiV1.DEFAULT_SERVICE_NAME, 'v1', 'createNotificationChannel');

      const parameters = {
        options: {
          url: '/v1/{account_id}/notifications/channels',
          method: 'POST',
          body,
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Transaction-Id': _params.transactionId
          }, _params.headers),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  };

  /**
   * bulk delete of channels.
   *
   * bulk delete of channels.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - Account ID.
   * @param {string[]} params.requestBody - Body for bulk delete notification channels.
   * @param {string} [params.transactionId] - The transaction id for the request in uuid v4 format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<NotificationsApiV1.Response<NotificationsApiV1.BulkDeleteChannelsResponse>>}
   */
  public deleteNotificationChannels(params: NotificationsApiV1.DeleteNotificationChannelsParams): Promise<NotificationsApiV1.Response<NotificationsApiV1.BulkDeleteChannelsResponse>> {
    const _params = extend({}, params);
    const requiredParams = ['accountId', 'requestBody'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        return reject(missingParams);
      }

      const body = _params.requestBody;
      const path = {
        'account_id': _params.accountId
      };

      const sdkHeaders = getSdkHeaders(NotificationsApiV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteNotificationChannels');

      const parameters = {
        options: {
          url: '/v1/{account_id}/notifications/channels',
          method: 'DELETE',
          body,
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Transaction-Id': _params.transactionId
          }, _params.headers),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  };

  /**
   * delete the details of a specific channel.
   *
   * delete the details of a specific channel.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - Account ID.
   * @param {string} params.channelId - Channel ID.
   * @param {string} [params.transactionId] - The transaction id for the request in uuid v4 format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<NotificationsApiV1.Response<NotificationsApiV1.DeleteChannelResponse>>}
   */
  public deleteNotificationChannel(params: NotificationsApiV1.DeleteNotificationChannelParams): Promise<NotificationsApiV1.Response<NotificationsApiV1.DeleteChannelResponse>> {
    const _params = extend({}, params);
    const requiredParams = ['accountId', 'channelId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        return reject(missingParams);
      }

      const path = {
        'account_id': _params.accountId,
        'channel_id': _params.channelId
      };

      const sdkHeaders = getSdkHeaders(NotificationsApiV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteNotificationChannel');

      const parameters = {
        options: {
          url: '/v1/{account_id}/notifications/channels/{channel_id}',
          method: 'DELETE',
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
            'Transaction-Id': _params.transactionId
          }, _params.headers),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  };

  /**
   * get the details of a specific channel.
   *
   * get the details of a specific channel.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - Account ID.
   * @param {string} params.channelId - Channel ID.
   * @param {string} [params.transactionId] - The transaction id for the request in uuid v4 format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<NotificationsApiV1.Response<NotificationsApiV1.GetChannelResponse>>}
   */
  public getNotificationChannel(params: NotificationsApiV1.GetNotificationChannelParams): Promise<NotificationsApiV1.Response<NotificationsApiV1.GetChannelResponse>> {
    const _params = extend({}, params);
    const requiredParams = ['accountId', 'channelId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        return reject(missingParams);
      }

      const path = {
        'account_id': _params.accountId,
        'channel_id': _params.channelId
      };

      const sdkHeaders = getSdkHeaders(NotificationsApiV1.DEFAULT_SERVICE_NAME, 'v1', 'getNotificationChannel');

      const parameters = {
        options: {
          url: '/v1/{account_id}/notifications/channels/{channel_id}',
          method: 'GET',
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
            'Transaction-Id': _params.transactionId
          }, _params.headers),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  };

  /**
   * update notification channel.
   *
   * update notification channel.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - Account ID.
   * @param {string} params.channelId - Channel ID.
   * @param {string} params.name -
   * @param {string} params.type - Type of callback URL.
   * @param {string} params.endpoint - The callback URL which receives the notification.
   * @param {string} [params.description] - A one sentence description of this `Channel`.
   * @param {string[]} [params.severity] - Severity of the notification to be received.
   * @param {boolean} [params.enabled] - Channel is enabled or not. Default is disabled.
   * @param {NotificationChannelAlertSourceItem[]} [params.alertSource] -
   * @param {string} [params.transactionId] - The transaction id for the request in uuid v4 format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<NotificationsApiV1.Response<NotificationsApiV1.UpdateChannelResponse>>}
   */
  public updateNotificationChannel(params: NotificationsApiV1.UpdateNotificationChannelParams): Promise<NotificationsApiV1.Response<NotificationsApiV1.UpdateChannelResponse>> {
    const _params = extend({}, params);
    const requiredParams = ['accountId', 'channelId', 'name', 'type', 'endpoint'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        return reject(missingParams);
      }

      const body = {
        'name': _params.name,
        'type': _params.type,
        'endpoint': _params.endpoint,
        'description': _params.description,
        'severity': _params.severity,
        'enabled': _params.enabled,
        'alert_source': _params.alertSource
      };

      const path = {
        'account_id': _params.accountId,
        'channel_id': _params.channelId
      };

      const sdkHeaders = getSdkHeaders(NotificationsApiV1.DEFAULT_SERVICE_NAME, 'v1', 'updateNotificationChannel');

      const parameters = {
        options: {
          url: '/v1/{account_id}/notifications/channels/{channel_id}',
          method: 'PUT',
          body,
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Transaction-Id': _params.transactionId
          }, _params.headers),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  };

  /**
   * test notification channel.
   *
   * test a nofication channel under this account.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - Account ID.
   * @param {string} params.channelId - Channel ID.
   * @param {string} [params.transactionId] - The transaction id for the request in uuid v4 format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<NotificationsApiV1.Response<NotificationsApiV1.TestChannelResponse>>}
   */
  public testNotificationChannel(params: NotificationsApiV1.TestNotificationChannelParams): Promise<NotificationsApiV1.Response<NotificationsApiV1.TestChannelResponse>> {
    const _params = extend({}, params);
    const requiredParams = ['accountId', 'channelId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        return reject(missingParams);
      }

      const path = {
        'account_id': _params.accountId,
        'channel_id': _params.channelId
      };

      const sdkHeaders = getSdkHeaders(NotificationsApiV1.DEFAULT_SERVICE_NAME, 'v1', 'testNotificationChannel');

      const parameters = {
        options: {
          url: '/v1/{account_id}/notifications/channels/{channel_id}/test',
          method: 'GET',
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
            'Transaction-Id': _params.transactionId
          }, _params.headers),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  };

  /**
   * fetch notifications public key.
   *
   * fetch public key to decrypt messages in notification payload.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - Account ID.
   * @param {string} [params.transactionId] - The transaction id for the request in uuid v4 format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<NotificationsApiV1.Response<NotificationsApiV1.PublicKeyResponse>>}
   */
  public getPublicKey(params: NotificationsApiV1.GetPublicKeyParams): Promise<NotificationsApiV1.Response<NotificationsApiV1.PublicKeyResponse>> {
    const _params = extend({}, params);
    const requiredParams = ['accountId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        return reject(missingParams);
      }

      const path = {
        'account_id': _params.accountId
      };

      const sdkHeaders = getSdkHeaders(NotificationsApiV1.DEFAULT_SERVICE_NAME, 'v1', 'getPublicKey');

      const parameters = {
        options: {
          url: '/v1/{account_id}/notifications/public_key',
          method: 'GET',
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
            'Transaction-Id': _params.transactionId
          }, _params.headers),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  };

}

/*************************
 * interfaces
 ************************/

namespace NotificationsApiV1 {

  /** An operation response. */
  export interface Response<T = any>  {
    result: T;
    status: number;
    statusText: string;
    headers: IncomingHttpHeaders;
  }

  /** The callback for a service request. */
  export type Callback<T> = (error: any, response?: Response<T>) => void;

  /** The body of a service request that returns no response data. */
  export interface Empty { }

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `listAllChannels` operation. */
  export interface ListAllChannelsParams {
    /** Account ID. */
    accountId: string;
    /** The transaction id for the request in uuid v4 format. */
    transactionId?: string;
    /** Limit the number of the returned documents to the specified number. */
    limit?: number;
    /** The offset is the index of the item from which you want to start returning data from. Default is 0. */
    skip?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createNotificationChannel` operation. */
  export interface CreateNotificationChannelParams {
    /** Account ID. */
    accountId: string;
    name: string;
    /** Type of callback URL. */
    type: CreateNotificationChannelConstants.Type | string;
    /** The callback URL which receives the notification. */
    endpoint: string;
    /** A one sentence description of this `Channel`. */
    description?: string;
    /** Severity of the notification to be received. */
    severity?: CreateNotificationChannelConstants.Severity | string[];
    /** Channel is enabled or not. Default is disabled. */
    enabled?: boolean;
    alertSource?: NotificationChannelAlertSourceItem[];
    /** The transaction id for the request in uuid v4 format. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createNotificationChannel` operation. */
  export namespace CreateNotificationChannelConstants {
    /** Type of callback URL. */
    export enum Type {
      WEBHOOK = 'Webhook',
    }
    /** Severity */
    export enum Severity {
      LOW = 'low',
      MEDIUM = 'medium',
      HIGH = 'high',
      CRITICAL = 'critical',
    }
  }

  /** Parameters for the `deleteNotificationChannels` operation. */
  export interface DeleteNotificationChannelsParams {
    /** Account ID. */
    accountId: string;
    /** Body for bulk delete notification channels. */
    requestBody: string[];
    /** The transaction id for the request in uuid v4 format. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteNotificationChannel` operation. */
  export interface DeleteNotificationChannelParams {
    /** Account ID. */
    accountId: string;
    /** Channel ID. */
    channelId: string;
    /** The transaction id for the request in uuid v4 format. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getNotificationChannel` operation. */
  export interface GetNotificationChannelParams {
    /** Account ID. */
    accountId: string;
    /** Channel ID. */
    channelId: string;
    /** The transaction id for the request in uuid v4 format. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateNotificationChannel` operation. */
  export interface UpdateNotificationChannelParams {
    /** Account ID. */
    accountId: string;
    /** Channel ID. */
    channelId: string;
    name: string;
    /** Type of callback URL. */
    type: UpdateNotificationChannelConstants.Type | string;
    /** The callback URL which receives the notification. */
    endpoint: string;
    /** A one sentence description of this `Channel`. */
    description?: string;
    /** Severity of the notification to be received. */
    severity?: UpdateNotificationChannelConstants.Severity | string[];
    /** Channel is enabled or not. Default is disabled. */
    enabled?: boolean;
    alertSource?: NotificationChannelAlertSourceItem[];
    /** The transaction id for the request in uuid v4 format. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateNotificationChannel` operation. */
  export namespace UpdateNotificationChannelConstants {
    /** Type of callback URL. */
    export enum Type {
      WEBHOOK = 'Webhook',
    }
    /** Severity */
    export enum Severity {
      LOW = 'low',
      MEDIUM = 'medium',
      HIGH = 'high',
      CRITICAL = 'critical',
    }
  }

  /** Parameters for the `testNotificationChannel` operation. */
  export interface TestNotificationChannelParams {
    /** Account ID. */
    accountId: string;
    /** Channel ID. */
    channelId: string;
    /** The transaction id for the request in uuid v4 format. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getPublicKey` operation. */
  export interface GetPublicKeyParams {
    /** Account ID. */
    accountId: string;
    /** The transaction id for the request in uuid v4 format. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** The alert sources. They identify the providers and their finding types which makes the findings available to Security Advisor. */
  export interface ChannelResponseDefinitionAlertSourceItem {
    /** Below is a list of builtin providers that you can select in addition to the ones you obtain by calling
     *  Findings API /v1/{account_id}/providers :
     *   | provider_name | The source they represent |
     *   |-----|-----|
     *   | VA  | Vulnerable image findings|
     *   | NA  | Network Insights findings|
     *   | ATA | Activity Insights findings|
     *   | CERT | Certificate Manager findings|
     *   | ALL | Special provider name to represent all the providers. Its mutually exclusive with other providers
     *  meaning either you choose ALL or you don't|.
     */
    provider_name?: string;
    /** An array of the finding types of the provider_name or "ALL" to specify all finding types under that provider
     *  Below is a list of supported finding types for each built in providers
     *  | provider_name | Supported finding types |
     *  |-----|-----|
     *  | VA  | "image_with_vulnerabilities", "image_with_config_issues"|
     *  | NA  | "anonym_server", "malware_server", "bot_server", "miner_server", "server_suspected_ratio",
     *  "server_response", "data_extrusion", "server_weaponized_total"|
     *  | ATA | "appid", "cos", "iks", "iam", "kms", "cert", "account", "app"|
     *  | CERT | "expired_cert", "expiring_1day_cert", "expiring_10day_cert", "expiring_30day_cert",
     *  "expiring_60day_cert", "expiring_90day_cert"|
     *  | ALL | "ALL"|.
     */
    finding_types?: string[];
  }

  /** Severity of the notification. */
  export interface ChannelResponseDefinitionSeverity {
    /** Critical Severity. */
    critical?: boolean;
    /** High Severity. */
    high?: boolean;
    /** Medium Severity. */
    medium?: boolean;
    /** Low Severity. */
    low?: boolean;
  }

  /** The alert sources. They identify the providers and their finding types which makes the findings available to Security Advisor. */
  export interface NotificationChannelAlertSourceItem {
    /** Below is a list of builtin providers that you can select in addition to the ones you obtain by calling
     *  Findings API /v1/{account_id}/providers :
     *   | provider_name | The source they represent |
     *   |-----|-----|
     *   | VA  | Vulnerable image findings|
     *   | NA  | Network Insights findings|
     *   | ATA | Activity Insights findings|
     *   | CERT | Certificate Manager findings|
     *   | ALL | Special provider name to represent all the providers. Its mutually exclusive with other providers
     *  meaning either you choose ALL or you don't|.
     */
    provider_name: string;
    /** An array of the finding types of the provider_name or "ALL" to specify all finding types under that provider
     *  Below is a list of supported finding types for each built in providers
     *  | provider_name | Supported finding types |
     *  |-----|-----|
     *  | VA  | "image_with_vulnerabilities", "image_with_config_issues"|
     *  | NA  | "anonym_server", "malware_server", "bot_server", "miner_server", "server_suspected_ratio",
     *  "server_response", "data_extrusion", "server_weaponized_total"|
     *  | ATA | "appid", "cos", "iks", "iam", "kms", "cert", "account", "app"|
     *  | CERT | "expired_cert", "expiring_1day_cert", "expiring_10day_cert", "expiring_30day_cert",
     *  "expiring_60day_cert", "expiring_90day_cert"|
     *  | ALL | "ALL"|.
     */
    finding_types?: string[];
  }

  /** Response of all deleted channels. */
  export interface BulkDeleteChannelsResponse {
    /** response message. */
    message?: string;
  }

  /** Response including channels. */
  export interface ChannelResponseDefinition {
    /** unique id of the channel. */
    channel_id?: string;
    name?: string;
    /** A one sentence description of this `Channel`. */
    description?: string;
    /** Type of callback URL. */
    type?: string;
    /** Severity of the notification. */
    severity?: ChannelResponseDefinitionSeverity;
    /** The callback URL which receives the notification. */
    endpoint?: string;
    /** Channel is enabled or not. Default is disabled. */
    enabled?: boolean;
    alert_source?: ChannelResponseDefinitionAlertSourceItem[];
    frequency?: string;
  }

  /** Response of created channel. */
  export interface CreateChannelsResponse {
    /** id of the created channel. */
    channel_id?: string;
    /** response code. */
    status_code?: number;
  }

  /** Response of deleted channel. */
  export interface DeleteChannelResponse {
    /** id of the created channel. */
    channel_id?: string;
    /** response message. */
    message?: string;
  }

  /** Response of get channel. */
  export interface GetChannelResponse {
    /** Response including channels. */
    channel?: ChannelResponseDefinition;
  }

  /** Response including channels. */
  export interface ListChannelsResponse {
    channels?: ChannelResponseDefinition[];
  }

  /** PublicKeyResponse. */
  export interface PublicKeyResponse {
    public_key: string;
  }

  /** Response of deleted channel. */
  export interface TestChannelResponse {
    /** response status. */
    test?: string;
  }

  /** Response of updated channel. */
  export interface UpdateChannelResponse {
    /** id of the updated channel. */
    channel_id?: string;
    /** response code. */
    status_code?: number;
  }

}

export = NotificationsApiV1;
