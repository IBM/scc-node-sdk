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

// need to import the whole package to mock getAuthenticatorFromEnvironment
const core = require('ibm-cloud-sdk-core');

const { NoAuthAuthenticator, unitTestUtils } = core;

const FindingsV1 = require('../../dist/findings/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
  checkForSuccessfulExecution,
} = unitTestUtils;

const findingsServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://us-south.secadvisor.cloud.ibm.com/findings',
  accountId: 'testString',
};

const findingsService = new FindingsV1(findingsServiceOptions);

// dont actually create a request
const createRequestMock = jest.spyOn(findingsService, 'createRequest');
createRequestMock.mockImplementation(() => Promise.resolve());

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

afterEach(() => {
  createRequestMock.mockClear();
  getAuthenticatorMock.mockClear();
});

// used for the service construction tests
let requiredGlobals;
beforeEach(() => {
  // these are changed when passed into the factory/constructor, so re-init
  requiredGlobals = {
    accountId: 'testString',
  };
});

describe('FindingsV1', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = FindingsV1.newInstance(requiredGlobals);

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(FindingsV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(FindingsV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(FindingsV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = FindingsV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(FindingsV1);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new FindingsV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new FindingsV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(FindingsV1.DEFAULT_SERVICE_URL);
    });
  });
  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new FindingsV1(findingsServiceOptions);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.accountId).toEqual(findingsServiceOptions.accountId);
      });
    });
  });
  describe('postGraph', () => {
    describe('positive tests', () => {
      function __postGraphTest() {
        // Construct the params object for operation postGraph
        const body = 'testString';
        const contentType = 'application/json';
        const transactionId = 'testString';
        const params = {
          body: body,
          contentType: contentType,
          transactionId: transactionId,
        };

        const postGraphResult = findingsService.postGraph(params);

        // all methods should return a Promise
        expectToBePromise(postGraphResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{account_id}/graph', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = contentType;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Content-Type', contentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.body).toEqual(body);
        expect(mockRequestOptions.path.account_id).toEqual(findingsServiceOptions.accountId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __postGraphTest();

        // enable retries and test again
        createRequestMock.mockClear();
        findingsService.enableRetries();
        __postGraphTest();

        // disable retries and test again
        createRequestMock.mockClear();
        findingsService.disableRetries();
        __postGraphTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const body = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          body,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        findingsService.postGraph(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await findingsService.postGraph({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const postGraphPromise = findingsService.postGraph();
        expectToBePromise(postGraphPromise);

        postGraphPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listProviders', () => {
    describe('positive tests', () => {
      function __listProvidersTest() {
        // Construct the params object for operation listProviders
        const transactionId = 'testString';
        const limit = 2;
        const skip = 38;
        const startProviderId = 'testString';
        const endProviderId = 'testString';
        const params = {
          transactionId: transactionId,
          limit: limit,
          skip: skip,
          startProviderId: startProviderId,
          endProviderId: endProviderId,
        };

        const listProvidersResult = findingsService.listProviders(params);

        // all methods should return a Promise
        expectToBePromise(listProvidersResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{account_id}/providers', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.skip).toEqual(skip);
        expect(mockRequestOptions.qs.start_provider_id).toEqual(startProviderId);
        expect(mockRequestOptions.qs.end_provider_id).toEqual(endProviderId);
        expect(mockRequestOptions.path.account_id).toEqual(findingsServiceOptions.accountId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listProvidersTest();

        // enable retries and test again
        createRequestMock.mockClear();
        findingsService.enableRetries();
        __listProvidersTest();

        // disable retries and test again
        createRequestMock.mockClear();
        findingsService.disableRetries();
        __listProvidersTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        findingsService.listProviders(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        findingsService.listProviders({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createNote', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Reporter
      const reporterModel = {
        id: 'testString',
        title: 'testString',
        url: 'testString',
      };

      // ApiNoteRelatedUrl
      const apiNoteRelatedUrlModel = {
        label: 'testString',
        url: 'testString',
      };

      // RemediationStep
      const remediationStepModel = {
        title: 'testString',
        url: 'testString',
      };

      // FindingType
      const findingTypeModel = {
        severity: 'LOW',
        next_steps: [remediationStepModel],
      };

      // KpiType
      const kpiTypeModel = {
        Severity: 'MEDIUM',
        aggregation_type: 'SUM',
      };

      // ValueTypeFindingCountValueType
      const valueTypeModel = {
        kind: 'FINDING_COUNT',
        finding_note_names: ['testString'],
        text: 'label',
      };

      // CardElementTimeSeriesCardElement
      const cardElementModel = {
        text: 'testString',
        default_interval: 'd',
        kind: 'TIME_SERIES',
        default_time_range: '4d',
        value_types: [valueTypeModel],
      };

      // Card
      const cardModel = {
        section: 'testString',
        title: 'testString',
        subtitle: 'testString',
        order: 1,
        finding_note_names: ['testString'],
        requires_configuration: false,
        badge_text: 'testString',
        badge_image: 'testString',
        elements: [cardElementModel],
      };

      // Section
      const sectionModel = {
        title: 'testString',
        image: 'testString',
      };

      function __createNoteTest() {
        // Construct the params object for operation createNote
        const providerId = 'testString';
        const shortDescription = 'testString';
        const longDescription = 'testString';
        const kind = 'FINDING';
        const id = 'testString';
        const reportedBy = reporterModel;
        const relatedUrl = [apiNoteRelatedUrlModel];
        const createTime = '2019-01-01T12:00:00.000Z';
        const updateTime = '2019-01-01T12:00:00.000Z';
        const shared = true;
        const finding = findingTypeModel;
        const kpi = kpiTypeModel;
        const card = cardModel;
        const section = sectionModel;
        const transactionId = 'testString';
        const params = {
          providerId: providerId,
          shortDescription: shortDescription,
          longDescription: longDescription,
          kind: kind,
          id: id,
          reportedBy: reportedBy,
          relatedUrl: relatedUrl,
          createTime: createTime,
          updateTime: updateTime,
          shared: shared,
          finding: finding,
          kpi: kpi,
          card: card,
          section: section,
          transactionId: transactionId,
        };

        const createNoteResult = findingsService.createNote(params);

        // all methods should return a Promise
        expectToBePromise(createNoteResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{account_id}/providers/{provider_id}/notes', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.body.short_description).toEqual(shortDescription);
        expect(mockRequestOptions.body.long_description).toEqual(longDescription);
        expect(mockRequestOptions.body.kind).toEqual(kind);
        expect(mockRequestOptions.body.id).toEqual(id);
        expect(mockRequestOptions.body.reported_by).toEqual(reportedBy);
        expect(mockRequestOptions.body.related_url).toEqual(relatedUrl);
        expect(mockRequestOptions.body.create_time).toEqual(createTime);
        expect(mockRequestOptions.body.update_time).toEqual(updateTime);
        expect(mockRequestOptions.body.shared).toEqual(shared);
        expect(mockRequestOptions.body.finding).toEqual(finding);
        expect(mockRequestOptions.body.kpi).toEqual(kpi);
        expect(mockRequestOptions.body.card).toEqual(card);
        expect(mockRequestOptions.body.section).toEqual(section);
        expect(mockRequestOptions.path.account_id).toEqual(findingsServiceOptions.accountId);
        expect(mockRequestOptions.path.provider_id).toEqual(providerId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createNoteTest();

        // enable retries and test again
        createRequestMock.mockClear();
        findingsService.enableRetries();
        __createNoteTest();

        // disable retries and test again
        createRequestMock.mockClear();
        findingsService.disableRetries();
        __createNoteTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const providerId = 'testString';
        const shortDescription = 'testString';
        const longDescription = 'testString';
        const kind = 'FINDING';
        const id = 'testString';
        const reportedBy = reporterModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          providerId,
          shortDescription,
          longDescription,
          kind,
          id,
          reportedBy,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        findingsService.createNote(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await findingsService.createNote({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const createNotePromise = findingsService.createNote();
        expectToBePromise(createNotePromise);

        createNotePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listNotes', () => {
    describe('positive tests', () => {
      function __listNotesTest() {
        // Construct the params object for operation listNotes
        const providerId = 'testString';
        const transactionId = 'testString';
        const pageSize = 2;
        const pageToken = 'testString';
        const params = {
          providerId: providerId,
          transactionId: transactionId,
          pageSize: pageSize,
          pageToken: pageToken,
        };

        const listNotesResult = findingsService.listNotes(params);

        // all methods should return a Promise
        expectToBePromise(listNotesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{account_id}/providers/{provider_id}/notes', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.qs.page_size).toEqual(pageSize);
        expect(mockRequestOptions.qs.page_token).toEqual(pageToken);
        expect(mockRequestOptions.path.account_id).toEqual(findingsServiceOptions.accountId);
        expect(mockRequestOptions.path.provider_id).toEqual(providerId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listNotesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        findingsService.enableRetries();
        __listNotesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        findingsService.disableRetries();
        __listNotesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const providerId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          providerId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        findingsService.listNotes(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await findingsService.listNotes({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const listNotesPromise = findingsService.listNotes();
        expectToBePromise(listNotesPromise);

        listNotesPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getNote', () => {
    describe('positive tests', () => {
      function __getNoteTest() {
        // Construct the params object for operation getNote
        const providerId = 'testString';
        const noteId = 'testString';
        const transactionId = 'testString';
        const params = {
          providerId: providerId,
          noteId: noteId,
          transactionId: transactionId,
        };

        const getNoteResult = findingsService.getNote(params);

        // all methods should return a Promise
        expectToBePromise(getNoteResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{account_id}/providers/{provider_id}/notes/{note_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.path.account_id).toEqual(findingsServiceOptions.accountId);
        expect(mockRequestOptions.path.provider_id).toEqual(providerId);
        expect(mockRequestOptions.path.note_id).toEqual(noteId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getNoteTest();

        // enable retries and test again
        createRequestMock.mockClear();
        findingsService.enableRetries();
        __getNoteTest();

        // disable retries and test again
        createRequestMock.mockClear();
        findingsService.disableRetries();
        __getNoteTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const providerId = 'testString';
        const noteId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          providerId,
          noteId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        findingsService.getNote(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await findingsService.getNote({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getNotePromise = findingsService.getNote();
        expectToBePromise(getNotePromise);

        getNotePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateNote', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Reporter
      const reporterModel = {
        id: 'testString',
        title: 'testString',
        url: 'testString',
      };

      // ApiNoteRelatedUrl
      const apiNoteRelatedUrlModel = {
        label: 'testString',
        url: 'testString',
      };

      // RemediationStep
      const remediationStepModel = {
        title: 'testString',
        url: 'testString',
      };

      // FindingType
      const findingTypeModel = {
        severity: 'LOW',
        next_steps: [remediationStepModel],
      };

      // KpiType
      const kpiTypeModel = {
        Severity: 'MEDIUM',
        aggregation_type: 'SUM',
      };

      // ValueTypeFindingCountValueType
      const valueTypeModel = {
        kind: 'FINDING_COUNT',
        finding_note_names: ['testString'],
        text: 'label',
      };

      // CardElementTimeSeriesCardElement
      const cardElementModel = {
        text: 'testString',
        default_interval: 'd',
        kind: 'TIME_SERIES',
        default_time_range: '4d',
        value_types: [valueTypeModel],
      };

      // Card
      const cardModel = {
        section: 'testString',
        title: 'testString',
        subtitle: 'testString',
        order: 1,
        finding_note_names: ['testString'],
        requires_configuration: false,
        badge_text: 'testString',
        badge_image: 'testString',
        elements: [cardElementModel],
      };

      // Section
      const sectionModel = {
        title: 'testString',
        image: 'testString',
      };

      function __updateNoteTest() {
        // Construct the params object for operation updateNote
        const providerId = 'testString';
        const noteId = 'testString';
        const shortDescription = 'testString';
        const longDescription = 'testString';
        const kind = 'FINDING';
        const id = 'testString';
        const reportedBy = reporterModel;
        const relatedUrl = [apiNoteRelatedUrlModel];
        const createTime = '2019-01-01T12:00:00.000Z';
        const updateTime = '2019-01-01T12:00:00.000Z';
        const shared = true;
        const finding = findingTypeModel;
        const kpi = kpiTypeModel;
        const card = cardModel;
        const section = sectionModel;
        const transactionId = 'testString';
        const params = {
          providerId: providerId,
          noteId: noteId,
          shortDescription: shortDescription,
          longDescription: longDescription,
          kind: kind,
          id: id,
          reportedBy: reportedBy,
          relatedUrl: relatedUrl,
          createTime: createTime,
          updateTime: updateTime,
          shared: shared,
          finding: finding,
          kpi: kpi,
          card: card,
          section: section,
          transactionId: transactionId,
        };

        const updateNoteResult = findingsService.updateNote(params);

        // all methods should return a Promise
        expectToBePromise(updateNoteResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{account_id}/providers/{provider_id}/notes/{note_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.body.short_description).toEqual(shortDescription);
        expect(mockRequestOptions.body.long_description).toEqual(longDescription);
        expect(mockRequestOptions.body.kind).toEqual(kind);
        expect(mockRequestOptions.body.id).toEqual(id);
        expect(mockRequestOptions.body.reported_by).toEqual(reportedBy);
        expect(mockRequestOptions.body.related_url).toEqual(relatedUrl);
        expect(mockRequestOptions.body.create_time).toEqual(createTime);
        expect(mockRequestOptions.body.update_time).toEqual(updateTime);
        expect(mockRequestOptions.body.shared).toEqual(shared);
        expect(mockRequestOptions.body.finding).toEqual(finding);
        expect(mockRequestOptions.body.kpi).toEqual(kpi);
        expect(mockRequestOptions.body.card).toEqual(card);
        expect(mockRequestOptions.body.section).toEqual(section);
        expect(mockRequestOptions.path.account_id).toEqual(findingsServiceOptions.accountId);
        expect(mockRequestOptions.path.provider_id).toEqual(providerId);
        expect(mockRequestOptions.path.note_id).toEqual(noteId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateNoteTest();

        // enable retries and test again
        createRequestMock.mockClear();
        findingsService.enableRetries();
        __updateNoteTest();

        // disable retries and test again
        createRequestMock.mockClear();
        findingsService.disableRetries();
        __updateNoteTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const providerId = 'testString';
        const noteId = 'testString';
        const shortDescription = 'testString';
        const longDescription = 'testString';
        const kind = 'FINDING';
        const id = 'testString';
        const reportedBy = reporterModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          providerId,
          noteId,
          shortDescription,
          longDescription,
          kind,
          id,
          reportedBy,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        findingsService.updateNote(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await findingsService.updateNote({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const updateNotePromise = findingsService.updateNote();
        expectToBePromise(updateNotePromise);

        updateNotePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteNote', () => {
    describe('positive tests', () => {
      function __deleteNoteTest() {
        // Construct the params object for operation deleteNote
        const providerId = 'testString';
        const noteId = 'testString';
        const transactionId = 'testString';
        const params = {
          providerId: providerId,
          noteId: noteId,
          transactionId: transactionId,
        };

        const deleteNoteResult = findingsService.deleteNote(params);

        // all methods should return a Promise
        expectToBePromise(deleteNoteResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{account_id}/providers/{provider_id}/notes/{note_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.path.account_id).toEqual(findingsServiceOptions.accountId);
        expect(mockRequestOptions.path.provider_id).toEqual(providerId);
        expect(mockRequestOptions.path.note_id).toEqual(noteId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteNoteTest();

        // enable retries and test again
        createRequestMock.mockClear();
        findingsService.enableRetries();
        __deleteNoteTest();

        // disable retries and test again
        createRequestMock.mockClear();
        findingsService.disableRetries();
        __deleteNoteTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const providerId = 'testString';
        const noteId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          providerId,
          noteId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        findingsService.deleteNote(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await findingsService.deleteNote({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteNotePromise = findingsService.deleteNote();
        expectToBePromise(deleteNotePromise);

        deleteNotePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getOccurrenceNote', () => {
    describe('positive tests', () => {
      function __getOccurrenceNoteTest() {
        // Construct the params object for operation getOccurrenceNote
        const providerId = 'testString';
        const occurrenceId = 'testString';
        const transactionId = 'testString';
        const params = {
          providerId: providerId,
          occurrenceId: occurrenceId,
          transactionId: transactionId,
        };

        const getOccurrenceNoteResult = findingsService.getOccurrenceNote(params);

        // all methods should return a Promise
        expectToBePromise(getOccurrenceNoteResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{account_id}/providers/{provider_id}/occurrences/{occurrence_id}/note', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.path.account_id).toEqual(findingsServiceOptions.accountId);
        expect(mockRequestOptions.path.provider_id).toEqual(providerId);
        expect(mockRequestOptions.path.occurrence_id).toEqual(occurrenceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getOccurrenceNoteTest();

        // enable retries and test again
        createRequestMock.mockClear();
        findingsService.enableRetries();
        __getOccurrenceNoteTest();

        // disable retries and test again
        createRequestMock.mockClear();
        findingsService.disableRetries();
        __getOccurrenceNoteTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const providerId = 'testString';
        const occurrenceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          providerId,
          occurrenceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        findingsService.getOccurrenceNote(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await findingsService.getOccurrenceNote({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getOccurrenceNotePromise = findingsService.getOccurrenceNote();
        expectToBePromise(getOccurrenceNotePromise);

        getOccurrenceNotePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createOccurrence', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Context
      const contextModel = {
        region: 'testString',
        resource_crn: 'testString',
        resource_id: 'testString',
        resource_name: 'testString',
        resource_type: 'testString',
        service_crn: 'testString',
        service_name: 'testString',
        environment_name: 'testString',
        component_name: 'testString',
        toolchain_id: 'testString',
      };

      // RemediationStep
      const remediationStepModel = {
        title: 'testString',
        url: 'testString',
      };

      // SocketAddress
      const socketAddressModel = {
        address: 'testString',
        port: 38,
      };

      // NetworkConnection
      const networkConnectionModel = {
        direction: 'testString',
        protocol: 'testString',
        client: socketAddressModel,
        server: socketAddressModel,
      };

      // DataTransferred
      const dataTransferredModel = {
        client_bytes: 38,
        server_bytes: 38,
        client_packets: 38,
        server_packets: 38,
      };

      // Finding
      const findingModel = {
        severity: 'LOW',
        certainty: 'LOW',
        next_steps: [remediationStepModel],
        network_connection: networkConnectionModel,
        data_transferred: dataTransferredModel,
      };

      // Kpi
      const kpiModel = {
        value: 72.5,
        total: 72.5,
      };

      function __createOccurrenceTest() {
        // Construct the params object for operation createOccurrence
        const providerId = 'testString';
        const noteName = 'testString';
        const kind = 'FINDING';
        const id = 'testString';
        const resourceUrl = 'testString';
        const remediation = 'testString';
        const context = contextModel;
        const finding = findingModel;
        const kpi = kpiModel;
        const referenceData = { foo: 'bar' };
        const transactionId = 'testString';
        const replaceIfExists = true;
        const params = {
          providerId: providerId,
          noteName: noteName,
          kind: kind,
          id: id,
          resourceUrl: resourceUrl,
          remediation: remediation,
          context: context,
          finding: finding,
          kpi: kpi,
          referenceData: referenceData,
          transactionId: transactionId,
          replaceIfExists: replaceIfExists,
        };

        const createOccurrenceResult = findingsService.createOccurrence(params);

        // all methods should return a Promise
        expectToBePromise(createOccurrenceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{account_id}/providers/{provider_id}/occurrences', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        checkUserHeader(createRequestMock, 'Replace-If-Exists', replaceIfExists);
        expect(mockRequestOptions.body.note_name).toEqual(noteName);
        expect(mockRequestOptions.body.kind).toEqual(kind);
        expect(mockRequestOptions.body.id).toEqual(id);
        expect(mockRequestOptions.body.resource_url).toEqual(resourceUrl);
        expect(mockRequestOptions.body.remediation).toEqual(remediation);
        expect(mockRequestOptions.body.context).toEqual(context);
        expect(mockRequestOptions.body.finding).toEqual(finding);
        expect(mockRequestOptions.body.kpi).toEqual(kpi);
        expect(mockRequestOptions.body.reference_data).toEqual(referenceData);
        expect(mockRequestOptions.path.account_id).toEqual(findingsServiceOptions.accountId);
        expect(mockRequestOptions.path.provider_id).toEqual(providerId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createOccurrenceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        findingsService.enableRetries();
        __createOccurrenceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        findingsService.disableRetries();
        __createOccurrenceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const providerId = 'testString';
        const noteName = 'testString';
        const kind = 'FINDING';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          providerId,
          noteName,
          kind,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        findingsService.createOccurrence(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await findingsService.createOccurrence({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const createOccurrencePromise = findingsService.createOccurrence();
        expectToBePromise(createOccurrencePromise);

        createOccurrencePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listOccurrences', () => {
    describe('positive tests', () => {
      function __listOccurrencesTest() {
        // Construct the params object for operation listOccurrences
        const providerId = 'testString';
        const transactionId = 'testString';
        const pageSize = 2;
        const pageToken = 'testString';
        const params = {
          providerId: providerId,
          transactionId: transactionId,
          pageSize: pageSize,
          pageToken: pageToken,
        };

        const listOccurrencesResult = findingsService.listOccurrences(params);

        // all methods should return a Promise
        expectToBePromise(listOccurrencesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{account_id}/providers/{provider_id}/occurrences', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.qs.page_size).toEqual(pageSize);
        expect(mockRequestOptions.qs.page_token).toEqual(pageToken);
        expect(mockRequestOptions.path.account_id).toEqual(findingsServiceOptions.accountId);
        expect(mockRequestOptions.path.provider_id).toEqual(providerId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listOccurrencesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        findingsService.enableRetries();
        __listOccurrencesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        findingsService.disableRetries();
        __listOccurrencesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const providerId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          providerId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        findingsService.listOccurrences(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await findingsService.listOccurrences({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const listOccurrencesPromise = findingsService.listOccurrences();
        expectToBePromise(listOccurrencesPromise);

        listOccurrencesPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listNoteOccurrences', () => {
    describe('positive tests', () => {
      function __listNoteOccurrencesTest() {
        // Construct the params object for operation listNoteOccurrences
        const providerId = 'testString';
        const noteId = 'testString';
        const transactionId = 'testString';
        const pageSize = 2;
        const pageToken = 'testString';
        const params = {
          providerId: providerId,
          noteId: noteId,
          transactionId: transactionId,
          pageSize: pageSize,
          pageToken: pageToken,
        };

        const listNoteOccurrencesResult = findingsService.listNoteOccurrences(params);

        // all methods should return a Promise
        expectToBePromise(listNoteOccurrencesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{account_id}/providers/{provider_id}/notes/{note_id}/occurrences', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.qs.page_size).toEqual(pageSize);
        expect(mockRequestOptions.qs.page_token).toEqual(pageToken);
        expect(mockRequestOptions.path.account_id).toEqual(findingsServiceOptions.accountId);
        expect(mockRequestOptions.path.provider_id).toEqual(providerId);
        expect(mockRequestOptions.path.note_id).toEqual(noteId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listNoteOccurrencesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        findingsService.enableRetries();
        __listNoteOccurrencesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        findingsService.disableRetries();
        __listNoteOccurrencesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const providerId = 'testString';
        const noteId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          providerId,
          noteId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        findingsService.listNoteOccurrences(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await findingsService.listNoteOccurrences({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const listNoteOccurrencesPromise = findingsService.listNoteOccurrences();
        expectToBePromise(listNoteOccurrencesPromise);

        listNoteOccurrencesPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getOccurrence', () => {
    describe('positive tests', () => {
      function __getOccurrenceTest() {
        // Construct the params object for operation getOccurrence
        const providerId = 'testString';
        const occurrenceId = 'testString';
        const transactionId = 'testString';
        const params = {
          providerId: providerId,
          occurrenceId: occurrenceId,
          transactionId: transactionId,
        };

        const getOccurrenceResult = findingsService.getOccurrence(params);

        // all methods should return a Promise
        expectToBePromise(getOccurrenceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{account_id}/providers/{provider_id}/occurrences/{occurrence_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.path.account_id).toEqual(findingsServiceOptions.accountId);
        expect(mockRequestOptions.path.provider_id).toEqual(providerId);
        expect(mockRequestOptions.path.occurrence_id).toEqual(occurrenceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getOccurrenceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        findingsService.enableRetries();
        __getOccurrenceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        findingsService.disableRetries();
        __getOccurrenceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const providerId = 'testString';
        const occurrenceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          providerId,
          occurrenceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        findingsService.getOccurrence(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await findingsService.getOccurrence({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getOccurrencePromise = findingsService.getOccurrence();
        expectToBePromise(getOccurrencePromise);

        getOccurrencePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateOccurrence', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Context
      const contextModel = {
        region: 'testString',
        resource_crn: 'testString',
        resource_id: 'testString',
        resource_name: 'testString',
        resource_type: 'testString',
        service_crn: 'testString',
        service_name: 'testString',
        environment_name: 'testString',
        component_name: 'testString',
        toolchain_id: 'testString',
      };

      // RemediationStep
      const remediationStepModel = {
        title: 'testString',
        url: 'testString',
      };

      // SocketAddress
      const socketAddressModel = {
        address: 'testString',
        port: 38,
      };

      // NetworkConnection
      const networkConnectionModel = {
        direction: 'testString',
        protocol: 'testString',
        client: socketAddressModel,
        server: socketAddressModel,
      };

      // DataTransferred
      const dataTransferredModel = {
        client_bytes: 38,
        server_bytes: 38,
        client_packets: 38,
        server_packets: 38,
      };

      // Finding
      const findingModel = {
        severity: 'LOW',
        certainty: 'LOW',
        next_steps: [remediationStepModel],
        network_connection: networkConnectionModel,
        data_transferred: dataTransferredModel,
      };

      // Kpi
      const kpiModel = {
        value: 72.5,
        total: 72.5,
      };

      function __updateOccurrenceTest() {
        // Construct the params object for operation updateOccurrence
        const providerId = 'testString';
        const occurrenceId = 'testString';
        const noteName = 'testString';
        const kind = 'FINDING';
        const id = 'testString';
        const resourceUrl = 'testString';
        const remediation = 'testString';
        const context = contextModel;
        const finding = findingModel;
        const kpi = kpiModel;
        const referenceData = { foo: 'bar' };
        const transactionId = 'testString';
        const params = {
          providerId: providerId,
          occurrenceId: occurrenceId,
          noteName: noteName,
          kind: kind,
          id: id,
          resourceUrl: resourceUrl,
          remediation: remediation,
          context: context,
          finding: finding,
          kpi: kpi,
          referenceData: referenceData,
          transactionId: transactionId,
        };

        const updateOccurrenceResult = findingsService.updateOccurrence(params);

        // all methods should return a Promise
        expectToBePromise(updateOccurrenceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{account_id}/providers/{provider_id}/occurrences/{occurrence_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.body.note_name).toEqual(noteName);
        expect(mockRequestOptions.body.kind).toEqual(kind);
        expect(mockRequestOptions.body.id).toEqual(id);
        expect(mockRequestOptions.body.resource_url).toEqual(resourceUrl);
        expect(mockRequestOptions.body.remediation).toEqual(remediation);
        expect(mockRequestOptions.body.context).toEqual(context);
        expect(mockRequestOptions.body.finding).toEqual(finding);
        expect(mockRequestOptions.body.kpi).toEqual(kpi);
        expect(mockRequestOptions.body.reference_data).toEqual(referenceData);
        expect(mockRequestOptions.path.account_id).toEqual(findingsServiceOptions.accountId);
        expect(mockRequestOptions.path.provider_id).toEqual(providerId);
        expect(mockRequestOptions.path.occurrence_id).toEqual(occurrenceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateOccurrenceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        findingsService.enableRetries();
        __updateOccurrenceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        findingsService.disableRetries();
        __updateOccurrenceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const providerId = 'testString';
        const occurrenceId = 'testString';
        const noteName = 'testString';
        const kind = 'FINDING';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          providerId,
          occurrenceId,
          noteName,
          kind,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        findingsService.updateOccurrence(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await findingsService.updateOccurrence({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const updateOccurrencePromise = findingsService.updateOccurrence();
        expectToBePromise(updateOccurrencePromise);

        updateOccurrencePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteOccurrence', () => {
    describe('positive tests', () => {
      function __deleteOccurrenceTest() {
        // Construct the params object for operation deleteOccurrence
        const providerId = 'testString';
        const occurrenceId = 'testString';
        const transactionId = 'testString';
        const params = {
          providerId: providerId,
          occurrenceId: occurrenceId,
          transactionId: transactionId,
        };

        const deleteOccurrenceResult = findingsService.deleteOccurrence(params);

        // all methods should return a Promise
        expectToBePromise(deleteOccurrenceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{account_id}/providers/{provider_id}/occurrences/{occurrence_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.path.account_id).toEqual(findingsServiceOptions.accountId);
        expect(mockRequestOptions.path.provider_id).toEqual(providerId);
        expect(mockRequestOptions.path.occurrence_id).toEqual(occurrenceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteOccurrenceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        findingsService.enableRetries();
        __deleteOccurrenceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        findingsService.disableRetries();
        __deleteOccurrenceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const providerId = 'testString';
        const occurrenceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          providerId,
          occurrenceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        findingsService.deleteOccurrence(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await findingsService.deleteOccurrence({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteOccurrencePromise = findingsService.deleteOccurrence();
        expectToBePromise(deleteOccurrencePromise);

        deleteOccurrencePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
