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

/**
 * IBM OpenAPI SDK Code Generator Version: 3.33.0-caf29bd0-20210603-225214
 */


import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import { Authenticator, BaseService, getAuthenticatorFromEnvironment, getMissingParams, UserOptions } from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * API specification for the Findings service.
 */

class FindingsV1 extends BaseService {

  static DEFAULT_SERVICE_URL: string = 'https://us-south.secadvisor.cloud.ibm.com/findings';
  static DEFAULT_SERVICE_NAME: string = 'findings';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of FindingsV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {FindingsV1}
   */

  public static newInstance(options: UserOptions): FindingsV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new FindingsV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }


  /** Account ID. */
  accountId: string;

  /**
   * Construct a FindingsV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.accountId - Account ID.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service. The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {FindingsV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    const requiredParams = ['accountId'];
    const missingParams = getMissingParams(options, requiredParams);
    if (missingParams) {
      throw missingParams;
    }
    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(FindingsV1.DEFAULT_SERVICE_URL);
    }
    this.accountId = options.accountId;
  }

  /*************************
   * findingsGraph
   ************************/

  /**
   * query findings.
   *
   * query findings.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string|NodeJS.ReadableStream|Buffer} params.body - Body for query findings.
   * @param {string} [params.contentType] - The type of the input.
   * @param {string} [params.transactionId] - The transaction id for the request in uuid v4 format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<FindingsV1.Response<FindingsV1.Empty>>}
   */
  public postGraph(params: FindingsV1.PostGraphParams): Promise<FindingsV1.Response<FindingsV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['body'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = _params.body;
    const path = {
      'account_id': this.accountId
    };

    const sdkHeaders = getSdkHeaders(FindingsV1.DEFAULT_SERVICE_NAME, 'v1', 'postGraph');

    const parameters = {
      options: {
        url: '/v1/{account_id}/graph',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': _params.contentType,
          'Transaction-Id': _params.transactionId
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /*************************
   * findingsNotes
   ************************/

  /**
   * Creates a new `Note`.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.providerId - Part of `parent`. This field contains the provider_id for example:
   * providers/{provider_id}.
   * @param {string} params.shortDescription - A one sentence description of this `Note`.
   * @param {string} params.longDescription - A detailed description of this `Note`.
   * @param {string} params.kind - This must be 1&#58;1 with members of our oneofs, it can be used for filtering Note
   * and Occurrence on their kind.
   *  - FINDING&#58; The note and occurrence represent a finding.
   *  - KPI&#58; The note and occurrence represent a KPI value.
   *  - CARD&#58; The note represents a card showing findings and related metric values.
   *  - CARD_CONFIGURED&#58; The note represents a card configured for a user account.
   *  - SECTION&#58; The note represents a section in a dashboard.
   * @param {string} params.id - The id of the note.
   * @param {Reporter} params.reportedBy - The entity reporting a note.
   * @param {ApiNoteRelatedUrl[]} [params.relatedUrl] - URLs associated with this note.
   * @param {string} [params.expirationTime] - Time of expiration for this note, null if note does not expire.
   * @param {boolean} [params.shared] - True if this `Note` can be shared by multiple accounts.
   * @param {FindingType} [params.finding] - FindingType provides details about a finding note.
   * @param {KpiType} [params.kpi] - KpiType provides details about a KPI note.
   * @param {Card} [params.card] - Card provides details about a card kind of note.
   * @param {Section} [params.section] - Card provides details about a card kind of note.
   * @param {string} [params.transactionId] - The transaction id for the request in uuid v4 format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<FindingsV1.Response<FindingsV1.ApiNote>>}
   */
  public createNote(params: FindingsV1.CreateNoteParams): Promise<FindingsV1.Response<FindingsV1.ApiNote>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['providerId', 'shortDescription', 'longDescription', 'kind', 'id', 'reportedBy'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'short_description': _params.shortDescription,
      'long_description': _params.longDescription,
      'kind': _params.kind,
      'id': _params.id,
      'reported_by': _params.reportedBy,
      'related_url': _params.relatedUrl,
      'expiration_time': _params.expirationTime,
      'shared': _params.shared,
      'finding': _params.finding,
      'kpi': _params.kpi,
      'card': _params.card,
      'section': _params.section
    };

    const path = {
      'account_id': this.accountId,
      'provider_id': _params.providerId
    };

    const sdkHeaders = getSdkHeaders(FindingsV1.DEFAULT_SERVICE_NAME, 'v1', 'createNote');

    const parameters = {
      options: {
        url: '/v1/{account_id}/providers/{provider_id}/notes',
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

    return this.createRequest(parameters);
  };

  /**
   * Lists all `Notes` for a given provider.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.providerId - Part of `parent`. This field contains the provider_id for example:
   * providers/{provider_id}.
   * @param {string} [params.transactionId] - The transaction id for the request in uuid v4 format.
   * @param {number} [params.pageSize] - Number of notes to return in the list.
   * @param {string} [params.pageToken] - Token to provide to skip to a particular spot in the list.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<FindingsV1.Response<FindingsV1.ApiListNotesResponse>>}
   */
  public listNotes(params: FindingsV1.ListNotesParams): Promise<FindingsV1.Response<FindingsV1.ApiListNotesResponse>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['providerId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'page_size': _params.pageSize,
      'page_token': _params.pageToken
    };

    const path = {
      'account_id': this.accountId,
      'provider_id': _params.providerId
    };

    const sdkHeaders = getSdkHeaders(FindingsV1.DEFAULT_SERVICE_NAME, 'v1', 'listNotes');

    const parameters = {
      options: {
        url: '/v1/{account_id}/providers/{provider_id}/notes',
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

    return this.createRequest(parameters);
  };

  /**
   * Returns the requested `Note`.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.providerId - First part of note `name`: providers/{provider_id}/notes/{note_id}.
   * @param {string} params.noteId - Second part of note `name`: providers/{provider_id}/notes/{note_id}.
   * @param {string} [params.transactionId] - The transaction id for the request in uuid v4 format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<FindingsV1.Response<FindingsV1.ApiNote>>}
   */
  public getNote(params: FindingsV1.GetNoteParams): Promise<FindingsV1.Response<FindingsV1.ApiNote>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['providerId', 'noteId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'account_id': this.accountId,
      'provider_id': _params.providerId,
      'note_id': _params.noteId
    };

    const sdkHeaders = getSdkHeaders(FindingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getNote');

    const parameters = {
      options: {
        url: '/v1/{account_id}/providers/{provider_id}/notes/{note_id}',
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

    return this.createRequest(parameters);
  };

  /**
   * Updates an existing `Note`.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.providerId - First part of note `name`: providers/{provider_id}/notes/{note_id}.
   * @param {string} params.noteId - Second part of note `name`: providers/{provider_id}/notes/{note_id}.
   * @param {string} params.shortDescription - A one sentence description of this `Note`.
   * @param {string} params.longDescription - A detailed description of this `Note`.
   * @param {string} params.kind - This must be 1&#58;1 with members of our oneofs, it can be used for filtering Note
   * and Occurrence on their kind.
   *  - FINDING&#58; The note and occurrence represent a finding.
   *  - KPI&#58; The note and occurrence represent a KPI value.
   *  - CARD&#58; The note represents a card showing findings and related metric values.
   *  - CARD_CONFIGURED&#58; The note represents a card configured for a user account.
   *  - SECTION&#58; The note represents a section in a dashboard.
   * @param {string} params.id - The id of the note.
   * @param {Reporter} params.reportedBy - The entity reporting a note.
   * @param {ApiNoteRelatedUrl[]} [params.relatedUrl] - URLs associated with this note.
   * @param {string} [params.expirationTime] - Time of expiration for this note, null if note does not expire.
   * @param {boolean} [params.shared] - True if this `Note` can be shared by multiple accounts.
   * @param {FindingType} [params.finding] - FindingType provides details about a finding note.
   * @param {KpiType} [params.kpi] - KpiType provides details about a KPI note.
   * @param {Card} [params.card] - Card provides details about a card kind of note.
   * @param {Section} [params.section] - Card provides details about a card kind of note.
   * @param {string} [params.transactionId] - The transaction id for the request in uuid v4 format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<FindingsV1.Response<FindingsV1.ApiNote>>}
   */
  public updateNote(params: FindingsV1.UpdateNoteParams): Promise<FindingsV1.Response<FindingsV1.ApiNote>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['providerId', 'noteId', 'shortDescription', 'longDescription', 'kind', 'id', 'reportedBy'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'short_description': _params.shortDescription,
      'long_description': _params.longDescription,
      'kind': _params.kind,
      'id': _params.id,
      'reported_by': _params.reportedBy,
      'related_url': _params.relatedUrl,
      'expiration_time': _params.expirationTime,
      'shared': _params.shared,
      'finding': _params.finding,
      'kpi': _params.kpi,
      'card': _params.card,
      'section': _params.section
    };

    const path = {
      'account_id': this.accountId,
      'provider_id': _params.providerId,
      'note_id': _params.noteId
    };

    const sdkHeaders = getSdkHeaders(FindingsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateNote');

    const parameters = {
      options: {
        url: '/v1/{account_id}/providers/{provider_id}/notes/{note_id}',
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

    return this.createRequest(parameters);
  };

  /**
   * Deletes the given `Note` from the system.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.providerId - First part of note `name`: providers/{provider_id}/notes/{note_id}.
   * @param {string} params.noteId - Second part of note `name`: providers/{provider_id}/notes/{note_id}.
   * @param {string} [params.transactionId] - The transaction id for the request in uuid v4 format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<FindingsV1.Response<FindingsV1.Empty>>}
   */
  public deleteNote(params: FindingsV1.DeleteNoteParams): Promise<FindingsV1.Response<FindingsV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['providerId', 'noteId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'account_id': this.accountId,
      'provider_id': _params.providerId,
      'note_id': _params.noteId
    };

    const sdkHeaders = getSdkHeaders(FindingsV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteNote');

    const parameters = {
      options: {
        url: '/v1/{account_id}/providers/{provider_id}/notes/{note_id}',
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

    return this.createRequest(parameters);
  };

  /**
   * Gets the `Note` attached to the given `Occurrence`.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.providerId - First part of occurrence `name`:
   * providers/{provider_id}/occurrences/{occurrence_id}.
   * @param {string} params.occurrenceId - Second part of occurrence `name`:
   * providers/{provider_id}/occurrences/{occurrence_id}.
   * @param {string} [params.transactionId] - The transaction id for the request in uuid v4 format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<FindingsV1.Response<FindingsV1.ApiNote>>}
   */
  public getOccurrenceNote(params: FindingsV1.GetOccurrenceNoteParams): Promise<FindingsV1.Response<FindingsV1.ApiNote>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['providerId', 'occurrenceId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'account_id': this.accountId,
      'provider_id': _params.providerId,
      'occurrence_id': _params.occurrenceId
    };

    const sdkHeaders = getSdkHeaders(FindingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getOccurrenceNote');

    const parameters = {
      options: {
        url: '/v1/{account_id}/providers/{provider_id}/occurrences/{occurrence_id}/note',
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

    return this.createRequest(parameters);
  };

  /*************************
   * findingsOccurrences
   ************************/

  /**
   * Creates a new `Occurrence`. Use this method to create `Occurrences` for a resource.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.providerId - Part of `parent`. This contains the provider_id for example:
   * providers/{provider_id}.
   * @param {string} params.noteName - An analysis note associated with this image, in the form
   * "{account_id}/providers/{provider_id}/notes/{note_id}" This field can be used as a filter in list requests.
   * @param {string} params.kind - This must be 1&#58;1 with members of our oneofs, it can be used for filtering Note
   * and Occurrence on their kind.
   *  - FINDING&#58; The note and occurrence represent a finding.
   *  - KPI&#58; The note and occurrence represent a KPI value.
   *  - CARD&#58; The note represents a card showing findings and related metric values.
   *  - CARD_CONFIGURED&#58; The note represents a card configured for a user account.
   *  - SECTION&#58; The note represents a section in a dashboard.
   * @param {string} params.id - The id of the occurrence.
   * @param {string} [params.resourceUrl] - The unique URL of the resource, image or the container, for which the
   * `Occurrence` applies. For example, https://gcr.io/provider/image@sha256:foo. This field can be used as a filter in
   * list requests.
   * @param {string} [params.remediation] - A description of actions that can be taken to remedy the `Note`.
   * @param {Context} [params.context] -
   * @param {Finding} [params.finding] - Finding provides details about a finding occurrence.
   * @param {Kpi} [params.kpi] - Kpi provides details about a KPI occurrence.
   * @param {JsonObject} [params.referenceData] - Additional data for the finding, like AT event etc.
   * @param {boolean} [params.replaceIfExists] - It allows replacing an existing occurrence when set to true.
   * @param {string} [params.transactionId] - The transaction id for the request in uuid v4 format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<FindingsV1.Response<FindingsV1.ApiOccurrence>>}
   */
  public createOccurrence(params: FindingsV1.CreateOccurrenceParams): Promise<FindingsV1.Response<FindingsV1.ApiOccurrence>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['providerId', 'noteName', 'kind', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'note_name': _params.noteName,
      'kind': _params.kind,
      'id': _params.id,
      'resource_url': _params.resourceUrl,
      'remediation': _params.remediation,
      'context': _params.context,
      'finding': _params.finding,
      'kpi': _params.kpi,
      'reference_data': _params.referenceData
    };

    const path = {
      'account_id': this.accountId,
      'provider_id': _params.providerId
    };

    const sdkHeaders = getSdkHeaders(FindingsV1.DEFAULT_SERVICE_NAME, 'v1', 'createOccurrence');

    const parameters = {
      options: {
        url: '/v1/{account_id}/providers/{provider_id}/occurrences',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Replace-If-Exists': _params.replaceIfExists,
          'Transaction-Id': _params.transactionId
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Lists active `Occurrences` for a given provider matching the filters.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.providerId - Part of `parent`. This contains the provider_id for example:
   * providers/{provider_id}.
   * @param {string} [params.transactionId] - The transaction id for the request in uuid v4 format.
   * @param {number} [params.pageSize] - Number of occurrences to return in the list.
   * @param {string} [params.pageToken] - Token to provide to skip to a particular spot in the list.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<FindingsV1.Response<FindingsV1.ApiListOccurrencesResponse>>}
   */
  public listOccurrences(params: FindingsV1.ListOccurrencesParams): Promise<FindingsV1.Response<FindingsV1.ApiListOccurrencesResponse>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['providerId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'page_size': _params.pageSize,
      'page_token': _params.pageToken
    };

    const path = {
      'account_id': this.accountId,
      'provider_id': _params.providerId
    };

    const sdkHeaders = getSdkHeaders(FindingsV1.DEFAULT_SERVICE_NAME, 'v1', 'listOccurrences');

    const parameters = {
      options: {
        url: '/v1/{account_id}/providers/{provider_id}/occurrences',
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

    return this.createRequest(parameters);
  };

  /**
   * Lists `Occurrences` referencing the specified `Note`. Use this method to get all occurrences referencing your `Note` across all your customer providers.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.providerId - First part of note `name`: providers/{provider_id}/notes/{note_id}.
   * @param {string} params.noteId - Second part of note `name`: providers/{provider_id}/notes/{note_id}.
   * @param {string} [params.transactionId] - The transaction id for the request in uuid v4 format.
   * @param {number} [params.pageSize] - Number of notes to return in the list.
   * @param {string} [params.pageToken] - Token to provide to skip to a particular spot in the list.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<FindingsV1.Response<FindingsV1.ApiListNoteOccurrencesResponse>>}
   */
  public listNoteOccurrences(params: FindingsV1.ListNoteOccurrencesParams): Promise<FindingsV1.Response<FindingsV1.ApiListNoteOccurrencesResponse>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['providerId', 'noteId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'page_size': _params.pageSize,
      'page_token': _params.pageToken
    };

    const path = {
      'account_id': this.accountId,
      'provider_id': _params.providerId,
      'note_id': _params.noteId
    };

    const sdkHeaders = getSdkHeaders(FindingsV1.DEFAULT_SERVICE_NAME, 'v1', 'listNoteOccurrences');

    const parameters = {
      options: {
        url: '/v1/{account_id}/providers/{provider_id}/notes/{note_id}/occurrences',
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

    return this.createRequest(parameters);
  };

  /**
   * Returns the requested `Occurrence`.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.providerId - First part of occurrence `name`:
   * providers/{provider_id}/occurrences/{occurrence_id}.
   * @param {string} params.occurrenceId - Second part of occurrence `name`:
   * providers/{provider_id}/occurrences/{occurrence_id}.
   * @param {string} [params.transactionId] - The transaction id for the request in uuid v4 format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<FindingsV1.Response<FindingsV1.ApiListOccurrencesResponse>>}
   */
  public getOccurrence(params: FindingsV1.GetOccurrenceParams): Promise<FindingsV1.Response<FindingsV1.ApiListOccurrencesResponse>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['providerId', 'occurrenceId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'account_id': this.accountId,
      'provider_id': _params.providerId,
      'occurrence_id': _params.occurrenceId
    };

    const sdkHeaders = getSdkHeaders(FindingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getOccurrence');

    const parameters = {
      options: {
        url: '/v1/{account_id}/providers/{provider_id}/occurrences/{occurrence_id}',
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

    return this.createRequest(parameters);
  };

  /**
   * Updates an existing `Occurrence`.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.providerId - First part of occurrence `name`:
   * providers/{provider_id}/occurrences/{occurrence_id}.
   * @param {string} params.occurrenceId - Second part of occurrence `name`:
   * providers/{provider_id}/occurrences/{occurrence_id}.
   * @param {string} params.noteName - An analysis note associated with this image, in the form
   * "{account_id}/providers/{provider_id}/notes/{note_id}" This field can be used as a filter in list requests.
   * @param {string} params.kind - This must be 1&#58;1 with members of our oneofs, it can be used for filtering Note
   * and Occurrence on their kind.
   *  - FINDING&#58; The note and occurrence represent a finding.
   *  - KPI&#58; The note and occurrence represent a KPI value.
   *  - CARD&#58; The note represents a card showing findings and related metric values.
   *  - CARD_CONFIGURED&#58; The note represents a card configured for a user account.
   *  - SECTION&#58; The note represents a section in a dashboard.
   * @param {string} params.id - The id of the occurrence.
   * @param {string} [params.resourceUrl] - The unique URL of the resource, image or the container, for which the
   * `Occurrence` applies. For example, https://gcr.io/provider/image@sha256:foo. This field can be used as a filter in
   * list requests.
   * @param {string} [params.remediation] - A description of actions that can be taken to remedy the `Note`.
   * @param {Context} [params.context] -
   * @param {Finding} [params.finding] - Finding provides details about a finding occurrence.
   * @param {Kpi} [params.kpi] - Kpi provides details about a KPI occurrence.
   * @param {JsonObject} [params.referenceData] - Additional data for the finding, like AT event etc.
   * @param {string} [params.transactionId] - The transaction id for the request in uuid v4 format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<FindingsV1.Response<FindingsV1.ApiOccurrence>>}
   */
  public updateOccurrence(params: FindingsV1.UpdateOccurrenceParams): Promise<FindingsV1.Response<FindingsV1.ApiOccurrence>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['providerId', 'occurrenceId', 'noteName', 'kind', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'note_name': _params.noteName,
      'kind': _params.kind,
      'id': _params.id,
      'resource_url': _params.resourceUrl,
      'remediation': _params.remediation,
      'context': _params.context,
      'finding': _params.finding,
      'kpi': _params.kpi,
      'reference_data': _params.referenceData
    };

    const path = {
      'account_id': this.accountId,
      'provider_id': _params.providerId,
      'occurrence_id': _params.occurrenceId
    };

    const sdkHeaders = getSdkHeaders(FindingsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateOccurrence');

    const parameters = {
      options: {
        url: '/v1/{account_id}/providers/{provider_id}/occurrences/{occurrence_id}',
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

    return this.createRequest(parameters);
  };

  /**
   * Deletes the given `Occurrence` from the system.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.providerId - First part of occurrence `name`: providers/{provider_id}/notes/{occurrence_id}.
   * @param {string} params.occurrenceId - Second part of occurrence `name`:
   * providers/{provider_id}/notes/{occurrence_id}.
   * @param {string} [params.transactionId] - The transaction id for the request in uuid v4 format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<FindingsV1.Response<FindingsV1.Empty>>}
   */
  public deleteOccurrence(params: FindingsV1.DeleteOccurrenceParams): Promise<FindingsV1.Response<FindingsV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['providerId', 'occurrenceId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'account_id': this.accountId,
      'provider_id': _params.providerId,
      'occurrence_id': _params.occurrenceId
    };

    const sdkHeaders = getSdkHeaders(FindingsV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteOccurrence');

    const parameters = {
      options: {
        url: '/v1/{account_id}/providers/{provider_id}/occurrences/{occurrence_id}',
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

    return this.createRequest(parameters);
  };

  /*************************
   * findingsProviders
   ************************/

  /**
   * Lists all `Providers` for a given account id.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.transactionId] - The transaction id for the request in uuid v4 format.
   * @param {number} [params.limit] - Limit the number of the returned documents to the specified number.
   * @param {number} [params.skip] - The offset is the index of the item from which you want to start returning data
   * from. Default is 0.
   * @param {string} [params.startProviderId] - The first provider_id to include in the result (sorted in ascending
   * order). Ignored if not provided.
   * @param {string} [params.endProviderId] - The last provider_id to include in the result (sorted in ascending order).
   * Ignored if not provided.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<FindingsV1.Response<FindingsV1.ApiListProvidersResponse>>}
   */
  public listProviders(params?: FindingsV1.ListProvidersParams): Promise<FindingsV1.Response<FindingsV1.ApiListProvidersResponse>> {
    const _params = Object.assign({}, params);

    const query = {
      'limit': _params.limit,
      'skip': _params.skip,
      'start_provider_id': _params.startProviderId,
      'end_provider_id': _params.endProviderId
    };

    const path = {
      'account_id': this.accountId
    };

    const sdkHeaders = getSdkHeaders(FindingsV1.DEFAULT_SERVICE_NAME, 'v1', 'listProviders');

    const parameters = {
      options: {
        url: '/v1/{account_id}/providers',
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

    return this.createRequest(parameters);
  };

}

/*************************
 * interfaces
 ************************/

namespace FindingsV1 {

  /** Options for the `FindingsV1` constructor. */
  export interface Options extends UserOptions {

    /** Account ID. */
    accountId: string;
  }

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

  /** Parameters for the `postGraph` operation. */
  export interface PostGraphParams {
    /** Body for query findings. */
    body: string|NodeJS.ReadableStream|Buffer;
    /** The type of the input. */
    contentType?: PostGraphConstants.ContentType | string;
    /** The transaction id for the request in uuid v4 format. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `postGraph` operation. */
  export namespace PostGraphConstants {
    /** The type of the input. */
    export enum ContentType {
      APPLICATION_JSON = 'application/json',
      APPLICATION_GRAPHQL = 'application/graphql',
    }
  }

  /** Parameters for the `createNote` operation. */
  export interface CreateNoteParams {
    /** Part of `parent`. This field contains the provider_id for example: providers/{provider_id}. */
    providerId: string;
    /** A one sentence description of this `Note`. */
    shortDescription: string;
    /** A detailed description of this `Note`. */
    longDescription: string;
    /** This must be 1&#58;1 with members of our oneofs, it can be used for filtering Note and Occurrence on their
     *  kind.
     *   - FINDING&#58; The note and occurrence represent a finding.
     *   - KPI&#58; The note and occurrence represent a KPI value.
     *   - CARD&#58; The note represents a card showing findings and related metric values.
     *   - CARD_CONFIGURED&#58; The note represents a card configured for a user account.
     *   - SECTION&#58; The note represents a section in a dashboard.
     */
    kind: CreateNoteConstants.Kind | string;
    /** The id of the note. */
    id: string;
    /** The entity reporting a note. */
    reportedBy: Reporter;
    /** URLs associated with this note. */
    relatedUrl?: ApiNoteRelatedUrl[];
    /** Time of expiration for this note, null if note does not expire. */
    expirationTime?: string;
    /** True if this `Note` can be shared by multiple accounts. */
    shared?: boolean;
    /** FindingType provides details about a finding note. */
    finding?: FindingType;
    /** KpiType provides details about a KPI note. */
    kpi?: KpiType;
    /** Card provides details about a card kind of note. */
    card?: Card;
    /** Card provides details about a card kind of note. */
    section?: Section;
    /** The transaction id for the request in uuid v4 format. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createNote` operation. */
  export namespace CreateNoteConstants {
    /** This must be 1&#58;1 with members of our oneofs, it can be used for filtering Note and Occurrence on their kind. - FINDING&#58; The note and occurrence represent a finding. - KPI&#58; The note and occurrence represent a KPI value. - CARD&#58; The note represents a card showing findings and related metric values. - CARD_CONFIGURED&#58; The note represents a card configured for a user account. - SECTION&#58; The note represents a section in a dashboard. */
    export enum Kind {
      FINDING = 'FINDING',
      KPI = 'KPI',
      CARD = 'CARD',
      CARD_CONFIGURED = 'CARD_CONFIGURED',
      SECTION = 'SECTION',
    }
  }

  /** Parameters for the `listNotes` operation. */
  export interface ListNotesParams {
    /** Part of `parent`. This field contains the provider_id for example: providers/{provider_id}. */
    providerId: string;
    /** The transaction id for the request in uuid v4 format. */
    transactionId?: string;
    /** Number of notes to return in the list. */
    pageSize?: number;
    /** Token to provide to skip to a particular spot in the list. */
    pageToken?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getNote` operation. */
  export interface GetNoteParams {
    /** First part of note `name`: providers/{provider_id}/notes/{note_id}. */
    providerId: string;
    /** Second part of note `name`: providers/{provider_id}/notes/{note_id}. */
    noteId: string;
    /** The transaction id for the request in uuid v4 format. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateNote` operation. */
  export interface UpdateNoteParams {
    /** First part of note `name`: providers/{provider_id}/notes/{note_id}. */
    providerId: string;
    /** Second part of note `name`: providers/{provider_id}/notes/{note_id}. */
    noteId: string;
    /** A one sentence description of this `Note`. */
    shortDescription: string;
    /** A detailed description of this `Note`. */
    longDescription: string;
    /** This must be 1&#58;1 with members of our oneofs, it can be used for filtering Note and Occurrence on their
     *  kind.
     *   - FINDING&#58; The note and occurrence represent a finding.
     *   - KPI&#58; The note and occurrence represent a KPI value.
     *   - CARD&#58; The note represents a card showing findings and related metric values.
     *   - CARD_CONFIGURED&#58; The note represents a card configured for a user account.
     *   - SECTION&#58; The note represents a section in a dashboard.
     */
    kind: UpdateNoteConstants.Kind | string;
    /** The id of the note. */
    id: string;
    /** The entity reporting a note. */
    reportedBy: Reporter;
    /** URLs associated with this note. */
    relatedUrl?: ApiNoteRelatedUrl[];
    /** Time of expiration for this note, null if note does not expire. */
    expirationTime?: string;
    /** True if this `Note` can be shared by multiple accounts. */
    shared?: boolean;
    /** FindingType provides details about a finding note. */
    finding?: FindingType;
    /** KpiType provides details about a KPI note. */
    kpi?: KpiType;
    /** Card provides details about a card kind of note. */
    card?: Card;
    /** Card provides details about a card kind of note. */
    section?: Section;
    /** The transaction id for the request in uuid v4 format. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateNote` operation. */
  export namespace UpdateNoteConstants {
    /** This must be 1&#58;1 with members of our oneofs, it can be used for filtering Note and Occurrence on their kind. - FINDING&#58; The note and occurrence represent a finding. - KPI&#58; The note and occurrence represent a KPI value. - CARD&#58; The note represents a card showing findings and related metric values. - CARD_CONFIGURED&#58; The note represents a card configured for a user account. - SECTION&#58; The note represents a section in a dashboard. */
    export enum Kind {
      FINDING = 'FINDING',
      KPI = 'KPI',
      CARD = 'CARD',
      CARD_CONFIGURED = 'CARD_CONFIGURED',
      SECTION = 'SECTION',
    }
  }

  /** Parameters for the `deleteNote` operation. */
  export interface DeleteNoteParams {
    /** First part of note `name`: providers/{provider_id}/notes/{note_id}. */
    providerId: string;
    /** Second part of note `name`: providers/{provider_id}/notes/{note_id}. */
    noteId: string;
    /** The transaction id for the request in uuid v4 format. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getOccurrenceNote` operation. */
  export interface GetOccurrenceNoteParams {
    /** First part of occurrence `name`: providers/{provider_id}/occurrences/{occurrence_id}. */
    providerId: string;
    /** Second part of occurrence `name`: providers/{provider_id}/occurrences/{occurrence_id}. */
    occurrenceId: string;
    /** The transaction id for the request in uuid v4 format. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createOccurrence` operation. */
  export interface CreateOccurrenceParams {
    /** Part of `parent`. This contains the provider_id for example: providers/{provider_id}. */
    providerId: string;
    /** An analysis note associated with this image, in the form
     *  "{account_id}/providers/{provider_id}/notes/{note_id}" This field can be used as a filter in list requests.
     */
    noteName: string;
    /** This must be 1&#58;1 with members of our oneofs, it can be used for filtering Note and Occurrence on their
     *  kind.
     *   - FINDING&#58; The note and occurrence represent a finding.
     *   - KPI&#58; The note and occurrence represent a KPI value.
     *   - CARD&#58; The note represents a card showing findings and related metric values.
     *   - CARD_CONFIGURED&#58; The note represents a card configured for a user account.
     *   - SECTION&#58; The note represents a section in a dashboard.
     */
    kind: CreateOccurrenceConstants.Kind | string;
    /** The id of the occurrence. */
    id: string;
    /** The unique URL of the resource, image or the container, for which the `Occurrence` applies. For example,
     *  https://gcr.io/provider/image@sha256:foo. This field can be used as a filter in list requests.
     */
    resourceUrl?: string;
    /** A description of actions that can be taken to remedy the `Note`. */
    remediation?: string;
    context?: Context;
    /** Finding provides details about a finding occurrence. */
    finding?: Finding;
    /** Kpi provides details about a KPI occurrence. */
    kpi?: Kpi;
    /** Additional data for the finding, like AT event etc. */
    referenceData?: JsonObject;
    /** It allows replacing an existing occurrence when set to true. */
    replaceIfExists?: boolean;
    /** The transaction id for the request in uuid v4 format. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createOccurrence` operation. */
  export namespace CreateOccurrenceConstants {
    /** This must be 1&#58;1 with members of our oneofs, it can be used for filtering Note and Occurrence on their kind. - FINDING&#58; The note and occurrence represent a finding. - KPI&#58; The note and occurrence represent a KPI value. - CARD&#58; The note represents a card showing findings and related metric values. - CARD_CONFIGURED&#58; The note represents a card configured for a user account. - SECTION&#58; The note represents a section in a dashboard. */
    export enum Kind {
      FINDING = 'FINDING',
      KPI = 'KPI',
      CARD = 'CARD',
      CARD_CONFIGURED = 'CARD_CONFIGURED',
      SECTION = 'SECTION',
    }
  }

  /** Parameters for the `listOccurrences` operation. */
  export interface ListOccurrencesParams {
    /** Part of `parent`. This contains the provider_id for example: providers/{provider_id}. */
    providerId: string;
    /** The transaction id for the request in uuid v4 format. */
    transactionId?: string;
    /** Number of occurrences to return in the list. */
    pageSize?: number;
    /** Token to provide to skip to a particular spot in the list. */
    pageToken?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listNoteOccurrences` operation. */
  export interface ListNoteOccurrencesParams {
    /** First part of note `name`: providers/{provider_id}/notes/{note_id}. */
    providerId: string;
    /** Second part of note `name`: providers/{provider_id}/notes/{note_id}. */
    noteId: string;
    /** The transaction id for the request in uuid v4 format. */
    transactionId?: string;
    /** Number of notes to return in the list. */
    pageSize?: number;
    /** Token to provide to skip to a particular spot in the list. */
    pageToken?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getOccurrence` operation. */
  export interface GetOccurrenceParams {
    /** First part of occurrence `name`: providers/{provider_id}/occurrences/{occurrence_id}. */
    providerId: string;
    /** Second part of occurrence `name`: providers/{provider_id}/occurrences/{occurrence_id}. */
    occurrenceId: string;
    /** The transaction id for the request in uuid v4 format. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateOccurrence` operation. */
  export interface UpdateOccurrenceParams {
    /** First part of occurrence `name`: providers/{provider_id}/occurrences/{occurrence_id}. */
    providerId: string;
    /** Second part of occurrence `name`: providers/{provider_id}/occurrences/{occurrence_id}. */
    occurrenceId: string;
    /** An analysis note associated with this image, in the form
     *  "{account_id}/providers/{provider_id}/notes/{note_id}" This field can be used as a filter in list requests.
     */
    noteName: string;
    /** This must be 1&#58;1 with members of our oneofs, it can be used for filtering Note and Occurrence on their
     *  kind.
     *   - FINDING&#58; The note and occurrence represent a finding.
     *   - KPI&#58; The note and occurrence represent a KPI value.
     *   - CARD&#58; The note represents a card showing findings and related metric values.
     *   - CARD_CONFIGURED&#58; The note represents a card configured for a user account.
     *   - SECTION&#58; The note represents a section in a dashboard.
     */
    kind: UpdateOccurrenceConstants.Kind | string;
    /** The id of the occurrence. */
    id: string;
    /** The unique URL of the resource, image or the container, for which the `Occurrence` applies. For example,
     *  https://gcr.io/provider/image@sha256:foo. This field can be used as a filter in list requests.
     */
    resourceUrl?: string;
    /** A description of actions that can be taken to remedy the `Note`. */
    remediation?: string;
    context?: Context;
    /** Finding provides details about a finding occurrence. */
    finding?: Finding;
    /** Kpi provides details about a KPI occurrence. */
    kpi?: Kpi;
    /** Additional data for the finding, like AT event etc. */
    referenceData?: JsonObject;
    /** The transaction id for the request in uuid v4 format. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateOccurrence` operation. */
  export namespace UpdateOccurrenceConstants {
    /** This must be 1&#58;1 with members of our oneofs, it can be used for filtering Note and Occurrence on their kind. - FINDING&#58; The note and occurrence represent a finding. - KPI&#58; The note and occurrence represent a KPI value. - CARD&#58; The note represents a card showing findings and related metric values. - CARD_CONFIGURED&#58; The note represents a card configured for a user account. - SECTION&#58; The note represents a section in a dashboard. */
    export enum Kind {
      FINDING = 'FINDING',
      KPI = 'KPI',
      CARD = 'CARD',
      CARD_CONFIGURED = 'CARD_CONFIGURED',
      SECTION = 'SECTION',
    }
  }

  /** Parameters for the `deleteOccurrence` operation. */
  export interface DeleteOccurrenceParams {
    /** First part of occurrence `name`: providers/{provider_id}/notes/{occurrence_id}. */
    providerId: string;
    /** Second part of occurrence `name`: providers/{provider_id}/notes/{occurrence_id}. */
    occurrenceId: string;
    /** The transaction id for the request in uuid v4 format. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listProviders` operation. */
  export interface ListProvidersParams {
    /** The transaction id for the request in uuid v4 format. */
    transactionId?: string;
    /** Limit the number of the returned documents to the specified number. */
    limit?: number;
    /** The offset is the index of the item from which you want to start returning data from. Default is 0. */
    skip?: number;
    /** The first provider_id to include in the result (sorted in ascending order). Ignored if not provided. */
    startProviderId?: string;
    /** The last provider_id to include in the result (sorted in ascending order). Ignored if not provided. */
    endProviderId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** Card provides details about a card kind of note. */
  export interface Card {
    /** The section this card belongs to. */
    section: string;
    /** The title of this card. */
    title: string;
    /** The subtitle of this card. */
    subtitle: string;
    /** The order of the card in which it will appear on SA dashboard in the mentioned section. */
    order?: number;
    /** The finding note names associated to this card. */
    finding_note_names: string[];
    requires_configuration?: boolean;
    /** The text associated to the card's badge. */
    badge_text?: string;
    /** The base64 content of the image associated to the card's badge. */
    badge_image?: string;
    /** The elements of this card. */
    elements: CardElement[];
  }

  /** CardElement provides details about the elements of a Card. */
  export interface CardElement {
  }

  /** Context. */
  export interface Context {
    /** The IBM Cloud region. */
    region?: string;
    /** The resource CRN (e.g. certificate CRN, image CRN). */
    resource_crn?: string;
    /** The resource ID, in case the CRN is not available. */
    resource_id?: string;
    /** The user-friendly resource name. */
    resource_name?: string;
    /** The resource type name (e.g. Pod, Cluster, Certificate, Image). */
    resource_type?: string;
    /** The service CRN (e.g. CertMgr Instance CRN). */
    service_crn?: string;
    /** The service name (e.g. CertMgr). */
    service_name?: string;
    /** The name of the environment the occurrence applies to. */
    environment_name?: string;
    /** The name of the component the occurrence applies to. */
    component_name?: string;
    /** The id of the toolchain the occurrence applies to. */
    toolchain_id?: string;
  }

  /** It provides details about data transferred between clients and servers. */
  export interface DataTransferred {
    /** The number of client bytes transferred. */
    client_bytes?: number;
    /** The number of server bytes transferred. */
    server_bytes?: number;
    /** The number of client packets transferred. */
    client_packets?: number;
    /** The number of server packets transferred. */
    server_packets?: number;
  }

  /** Finding provides details about a finding occurrence. */
  export interface Finding {
    /** Note provider-assigned severity/impact ranking
     *  - LOW&#58; Low Impact
     *  - MEDIUM&#58; Medium Impact
     *  - HIGH&#58; High Impact
     *  - CRITICAL&#58; Critical Impact.
     */
    severity?: string;
    /** Note provider-assigned confidence on the validity of an occurrence
     *  - LOW&#58; Low Certainty
     *  - MEDIUM&#58; Medium Certainty
     *  - HIGH&#58; High Certainty.
     */
    certainty?: string;
    /** Remediation steps for the issues reported in this finding. They override the note's next steps. */
    next_steps?: RemediationStep[];
    /** It provides details about a network connection. */
    network_connection?: NetworkConnection;
    /** It provides details about data transferred between clients and servers. */
    data_transferred?: DataTransferred;
  }

  /** FindingType provides details about a finding note. */
  export interface FindingType {
    /** Note provider-assigned severity/impact ranking
     *  - LOW&#58; Low Impact
     *  - MEDIUM&#58; Medium Impact
     *  - HIGH&#58; High Impact
     *  - CRITICAL&#58; Critical Impact.
     */
    severity: string;
    /** Common remediation steps for the finding of this type. */
    next_steps?: RemediationStep[];
  }

  /** Kpi provides details about a KPI occurrence. */
  export interface Kpi {
    /** The value of this KPI. */
    value: number;
    /** The total value of this KPI. */
    total?: number;
  }

  /** KpiType provides details about a KPI note. */
  export interface KpiType {
    /** The aggregation type of the KPI values. - SUM&#58; A single-value metrics aggregation type that sums up
     *  numeric values
     *    that are extracted from KPI occurrences.
     */
    aggregation_type: string;
  }

  /** It provides details about a network connection. */
  export interface NetworkConnection {
    /** The direction of this network connection. */
    direction?: string;
    /** The protocol of this network connection. */
    protocol?: string;
    /** It provides details about a socket address. */
    client?: SocketAddress;
    /** It provides details about a socket address. */
    server?: SocketAddress;
  }

  /** A remediation step description and associated URL. */
  export interface RemediationStep {
    /** Title of this next step. */
    title?: string;
    /** The URL associated to this next steps. */
    url?: string;
  }

  /** The entity reporting a note. */
  export interface Reporter {
    /** The id of this reporter. */
    id: string;
    /** The title of this reporter. */
    title: string;
    /** The url of this reporter. */
    url?: string;
  }

  /** Card provides details about a card kind of note. */
  export interface Section {
    /** The title of this section. */
    title: string;
    /** The image of this section. */
    image: string;
  }

  /** It provides details about a socket address. */
  export interface SocketAddress {
    /** The IP address of this socket address. */
    address: string;
    /** The port number of this socket address. */
    port?: number;
  }

  /** the value type of a card element. */
  export interface ValueType {
  }

  /** Response including listed occurrences for a note. */
  export interface ApiListNoteOccurrencesResponse {
    /** The occurrences attached to the specified note. */
    occurrences?: ApiOccurrence[];
    /** Token to receive the next page of notes. */
    next_page_token?: string;
  }

  /** Response including listed notes. */
  export interface ApiListNotesResponse {
    /** The occurrences requested. */
    notes?: ApiNote[];
    /** The next pagination token in the list response. It should be used as page_token for the following request.
     *  An empty value means no more result.
     */
    next_page_token?: string;
  }

  /** Response including listed active occurrences. */
  export interface ApiListOccurrencesResponse {
    /** The occurrences requested. */
    occurrences?: ApiOccurrence[];
    /** The next pagination token in the list response. It should be used as
     *  `page_token` for the following request. An empty value means no more results.
     */
    next_page_token?: string;
  }

  /** Response including listed providers. */
  export interface ApiListProvidersResponse {
    /** The providers requested. */
    providers?: ApiProvider[];
    /** The number of elements returned in the current instance. Default is 200. */
    limit?: number;
    /** The offset is the index of the item from which you want to start returning data from. Default is 0. */
    skip?: number;
    /** The total number of providers available. */
    total_count?: number;
  }

  /** Provides a detailed description of a `Note`. */
  export interface ApiNote {
    /** A one sentence description of this `Note`. */
    short_description: string;
    /** A detailed description of this `Note`. */
    long_description: string;
    /** This must be 1&#58;1 with members of our oneofs, it can be used for filtering Note and Occurrence on their
     *  kind.
     *   - FINDING&#58; The note and occurrence represent a finding.
     *   - KPI&#58; The note and occurrence represent a KPI value.
     *   - CARD&#58; The note represents a card showing findings and related metric values.
     *   - CARD_CONFIGURED&#58; The note represents a card configured for a user account.
     *   - SECTION&#58; The note represents a section in a dashboard.
     */
    kind: string;
    /** URLs associated with this note. */
    related_url?: ApiNoteRelatedUrl[];
    /** Time of expiration for this note, null if note does not expire. */
    expiration_time?: string;
    /** Output only. The time this note was created. This field can be used as a filter in list requests. */
    create_time?: string;
    /** Output only. The time this note was last updated. This field can be used as a filter in list requests. */
    update_time?: string;
    /** The id of the note. */
    id: string;
    /** True if this `Note` can be shared by multiple accounts. */
    shared?: boolean;
    /** The entity reporting a note. */
    reported_by: Reporter;
    /** FindingType provides details about a finding note. */
    finding?: FindingType;
    /** KpiType provides details about a KPI note. */
    kpi?: KpiType;
    /** Card provides details about a card kind of note. */
    card?: Card;
    /** Card provides details about a card kind of note. */
    section?: Section;
  }

  /** Metadata for any related URL information. */
  export interface ApiNoteRelatedUrl {
    /** Label to describe usage of the URL. */
    label: string;
    /** Specific URL to associate with the note. */
    url: string;
  }

  /** `Occurrence` includes information about analysis occurrences for an image. */
  export interface ApiOccurrence {
    /** The unique URL of the resource, image or the container, for which the `Occurrence` applies. For example,
     *  https://gcr.io/provider/image@sha256:foo. This field can be used as a filter in list requests.
     */
    resource_url?: string;
    /** An analysis note associated with this image, in the form
     *  "{account_id}/providers/{provider_id}/notes/{note_id}" This field can be used as a filter in list requests.
     */
    note_name: string;
    /** This must be 1&#58;1 with members of our oneofs, it can be used for filtering Note and Occurrence on their
     *  kind.
     *   - FINDING&#58; The note and occurrence represent a finding.
     *   - KPI&#58; The note and occurrence represent a KPI value.
     *   - CARD&#58; The note represents a card showing findings and related metric values.
     *   - CARD_CONFIGURED&#58; The note represents a card configured for a user account.
     *   - SECTION&#58; The note represents a section in a dashboard.
     */
    kind: string;
    /** A description of actions that can be taken to remedy the `Note`. */
    remediation?: string;
    /** Output only. The time this `Occurrence` was created. */
    create_time?: string;
    /** Output only. The time this `Occurrence` was last updated. */
    update_time?: string;
    /** The id of the occurrence. */
    id: string;
    context?: Context;
    /** Finding provides details about a finding occurrence. */
    finding?: Finding;
    /** Kpi provides details about a KPI occurrence. */
    kpi?: Kpi;
    /** Additional data for the finding, like AT event etc. */
    reference_data?: JsonObject;
  }

  /** Provides a detailed description of a `Provider`. */
  export interface ApiProvider {
    /** The name of the provider in the form "{account_id}/providers/{provider_id}". */
    name: string;
    /** The id of the provider. */
    id: string;
  }

  /** A card element with a breakdown of values. */
  export interface CardElementBreakdownCardElement extends CardElement {
    /** The text of this card element. */
    text: string;
    /** Kind of element
     *  - NUMERIC&#58; Single numeric value
     *  - BREAKDOWN&#58; Breakdown of numeric values
     *  - TIME_SERIES&#58; Time-series of numeric values.
     */
    kind: string;
    /** The default time range of this card element. */
    default_time_range?: string;
    /** the value types associated to this card element. */
    value_types: ValueType[];
  }

  /** A card element with a single numeric value". */
  export interface CardElementNumericCardElement extends CardElement {
    /** The text of this card element. */
    text: string;
    /** Kind of element
     *  - NUMERIC&#58; Single numeric value
     *  - BREAKDOWN&#58; Breakdown of numeric values
     *  - TIME_SERIES&#58; Time-series of numeric values.
     */
    kind: string;
    /** The default time range of this card element. */
    default_time_range?: string;
    value_type: NumericCardElementValueType;
  }

  /** A card element with a time series chart. */
  export interface CardElementTimeSeriesCardElement extends CardElement {
    /** The text of this card element. */
    text: string;
    /** The default interval of the time series. */
    default_interval?: string;
    /** Kind of element
     *  - NUMERIC&#58; Single numeric value
     *  - BREAKDOWN&#58; Breakdown of numeric values
     *  - TIME_SERIES&#58; Time-series of numeric values.
     */
    kind: string;
    /** The default time range of this card element. */
    default_time_range?: string;
    /** the value types associated to this card element. */
    value_types: ValueType[];
  }

  /** NumericCardElementValueType. */
  export interface NumericCardElementValueType extends ValueType {
  }

  /** ValueTypeFindingCountValueType. */
  export interface ValueTypeFindingCountValueType extends ValueType {
    /** Kind of element - FINDING_COUNT&#58; Kind of value derived from a count of finding occurrences. */
    kind: string;
    /** the names of the finding note associated that act as filters for counting the occurrences. */
    finding_note_names: string[];
    /** The text of this element type. */
    text: string;
  }

  /** ValueTypeKpiValueType. */
  export interface ValueTypeKpiValueType extends ValueType {
    /** Kind of element - KPI&#58; Kind of value derived from a KPI occurrence. */
    kind: string;
    /** The name of the kpi note associated to the occurrence with the value for this card element value type. */
    kpi_note_name: string;
    /** The text of this element type. */
    text: string;
  }

}

export = FindingsV1;
