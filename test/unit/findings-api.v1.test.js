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
'use strict';

// need to import the whole package to mock getAuthenticatorFromEnvironment
const core = require('ibm-cloud-sdk-core');
const { NoAuthAuthenticator, unitTestUtils } = core;

const FindingsApiV1 = require('../../dist/findings-api/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
} = unitTestUtils;

const service = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://findings-api.cloud.ibm.com/findings',
};

const findingsApiService = new FindingsApiV1(service);

// dont actually create a request
const createRequestMock = jest.spyOn(findingsApiService, 'createRequest');
createRequestMock.mockImplementation(() => Promise.resolve());

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

afterEach(() => {
  createRequestMock.mockClear();
  getAuthenticatorMock.mockClear();
});

describe('FindingsApiV1', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = FindingsApiV1.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(FindingsApiV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(FindingsApiV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(FindingsApiV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = FindingsApiV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(FindingsApiV1);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new FindingsApiV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new FindingsApiV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(FindingsApiV1.DEFAULT_SERVICE_URL);
    });
  });
  describe('postGraph', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation postGraph
        const accountId = 'testString';
        const body = 'testString';
        const contentType = 'application/json';
        const transactionId = 'testString';
        const params = {
          accountId: accountId,
          body: body,
          contentType: contentType,
          transactionId: transactionId,
        };

        const postGraphResult = findingsApiService.postGraph(params);

        // all methods should return a Promise
        expectToBePromise(postGraphResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{account_id}/graph', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = contentType;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Content-Type', contentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(options.body).toEqual(body);
        expect(options.path['account_id']).toEqual(accountId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const body = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          accountId,
          body,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        findingsApiService.postGraph(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await findingsApiService.postGraph({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const postGraphPromise = findingsApiService.postGraph();
        expectToBePromise(postGraphPromise);

        postGraphPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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
        aggregation_type: 'SUM',
      };

      // ValueTypeFindingCountValueType
      const valueTypeModel = {
        kind: 'FINDING_COUNT',
        finding_note_names: ['testString'],
        text: 'testString',
      };

      // CardElementTimeSeriesCardElement
      const cardElementModel = {
        text: 'testString',
        default_interval: 'testString',
        kind: 'TIME_SERIES',
        default_time_range: '1d',
        value_types: [valueTypeModel],
      };

      // Card
      const cardModel = {
        section: 'testString',
        title: 'testString',
        subtitle: 'testString',
        order: 1,
        finding_note_names: ['testString'],
        requires_configuration: true,
        badge_text: 'testString',
        badge_image: 'testString',
        elements: [cardElementModel],
      };

      // Section
      const sectionModel = {
        title: 'testString',
        image: 'testString',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createNote
        const accountId = 'testString';
        const providerId = 'testString';
        const shortDescription = 'testString';
        const longDescription = 'testString';
        const kind = 'FINDING';
        const id = 'testString';
        const reportedBy = reporterModel;
        const relatedUrl = [apiNoteRelatedUrlModel];
        const expirationTime = '2019-01-01T12:00:00.000Z';
        const createTime = '2019-01-01T12:00:00.000Z';
        const updateTime = '2019-01-01T12:00:00.000Z';
        const shared = true;
        const finding = findingTypeModel;
        const kpi = kpiTypeModel;
        const card = cardModel;
        const section = sectionModel;
        const transactionId = 'testString';
        const params = {
          accountId: accountId,
          providerId: providerId,
          shortDescription: shortDescription,
          longDescription: longDescription,
          kind: kind,
          id: id,
          reportedBy: reportedBy,
          relatedUrl: relatedUrl,
          expirationTime: expirationTime,
          createTime: createTime,
          updateTime: updateTime,
          shared: shared,
          finding: finding,
          kpi: kpi,
          card: card,
          section: section,
          transactionId: transactionId,
        };

        const createNoteResult = findingsApiService.createNote(params);

        // all methods should return a Promise
        expectToBePromise(createNoteResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{account_id}/providers/{provider_id}/notes', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(options.body['short_description']).toEqual(shortDescription);
        expect(options.body['long_description']).toEqual(longDescription);
        expect(options.body['kind']).toEqual(kind);
        expect(options.body['id']).toEqual(id);
        expect(options.body['reported_by']).toEqual(reportedBy);
        expect(options.body['related_url']).toEqual(relatedUrl);
        expect(options.body['expiration_time']).toEqual(expirationTime);
        expect(options.body['create_time']).toEqual(createTime);
        expect(options.body['update_time']).toEqual(updateTime);
        expect(options.body['shared']).toEqual(shared);
        expect(options.body['finding']).toEqual(finding);
        expect(options.body['kpi']).toEqual(kpi);
        expect(options.body['card']).toEqual(card);
        expect(options.body['section']).toEqual(section);
        expect(options.path['account_id']).toEqual(accountId);
        expect(options.path['provider_id']).toEqual(providerId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const providerId = 'testString';
        const shortDescription = 'testString';
        const longDescription = 'testString';
        const kind = 'FINDING';
        const id = 'testString';
        const reportedBy = reporterModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          accountId,
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

        findingsApiService.createNote(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await findingsApiService.createNote({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createNotePromise = findingsApiService.createNote();
        expectToBePromise(createNotePromise);

        createNotePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listNotes', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listNotes
        const accountId = 'testString';
        const providerId = 'testString';
        const transactionId = 'testString';
        const pageSize = 2;
        const pageToken = 'testString';
        const params = {
          accountId: accountId,
          providerId: providerId,
          transactionId: transactionId,
          pageSize: pageSize,
          pageToken: pageToken,
        };

        const listNotesResult = findingsApiService.listNotes(params);

        // all methods should return a Promise
        expectToBePromise(listNotesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{account_id}/providers/{provider_id}/notes', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(options.qs['page_size']).toEqual(pageSize);
        expect(options.qs['page_token']).toEqual(pageToken);
        expect(options.path['account_id']).toEqual(accountId);
        expect(options.path['provider_id']).toEqual(providerId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const providerId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          accountId,
          providerId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        findingsApiService.listNotes(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await findingsApiService.listNotes({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listNotesPromise = findingsApiService.listNotes();
        expectToBePromise(listNotesPromise);

        listNotesPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getNote', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getNote
        const accountId = 'testString';
        const providerId = 'testString';
        const noteId = 'testString';
        const transactionId = 'testString';
        const params = {
          accountId: accountId,
          providerId: providerId,
          noteId: noteId,
          transactionId: transactionId,
        };

        const getNoteResult = findingsApiService.getNote(params);

        // all methods should return a Promise
        expectToBePromise(getNoteResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{account_id}/providers/{provider_id}/notes/{note_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(options.path['account_id']).toEqual(accountId);
        expect(options.path['provider_id']).toEqual(providerId);
        expect(options.path['note_id']).toEqual(noteId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const providerId = 'testString';
        const noteId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          accountId,
          providerId,
          noteId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        findingsApiService.getNote(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await findingsApiService.getNote({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getNotePromise = findingsApiService.getNote();
        expectToBePromise(getNotePromise);

        getNotePromise.catch(err => {
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
        aggregation_type: 'SUM',
      };

      // ValueTypeFindingCountValueType
      const valueTypeModel = {
        kind: 'FINDING_COUNT',
        finding_note_names: ['testString'],
        text: 'testString',
      };

      // CardElementTimeSeriesCardElement
      const cardElementModel = {
        text: 'testString',
        default_interval: 'testString',
        kind: 'TIME_SERIES',
        default_time_range: '1d',
        value_types: [valueTypeModel],
      };

      // Card
      const cardModel = {
        section: 'testString',
        title: 'testString',
        subtitle: 'testString',
        order: 1,
        finding_note_names: ['testString'],
        requires_configuration: true,
        badge_text: 'testString',
        badge_image: 'testString',
        elements: [cardElementModel],
      };

      // Section
      const sectionModel = {
        title: 'testString',
        image: 'testString',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateNote
        const accountId = 'testString';
        const providerId = 'testString';
        const noteId = 'testString';
        const shortDescription = 'testString';
        const longDescription = 'testString';
        const kind = 'FINDING';
        const id = 'testString';
        const reportedBy = reporterModel;
        const relatedUrl = [apiNoteRelatedUrlModel];
        const expirationTime = '2019-01-01T12:00:00.000Z';
        const createTime = '2019-01-01T12:00:00.000Z';
        const updateTime = '2019-01-01T12:00:00.000Z';
        const shared = true;
        const finding = findingTypeModel;
        const kpi = kpiTypeModel;
        const card = cardModel;
        const section = sectionModel;
        const transactionId = 'testString';
        const params = {
          accountId: accountId,
          providerId: providerId,
          noteId: noteId,
          shortDescription: shortDescription,
          longDescription: longDescription,
          kind: kind,
          id: id,
          reportedBy: reportedBy,
          relatedUrl: relatedUrl,
          expirationTime: expirationTime,
          createTime: createTime,
          updateTime: updateTime,
          shared: shared,
          finding: finding,
          kpi: kpi,
          card: card,
          section: section,
          transactionId: transactionId,
        };

        const updateNoteResult = findingsApiService.updateNote(params);

        // all methods should return a Promise
        expectToBePromise(updateNoteResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{account_id}/providers/{provider_id}/notes/{note_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(options.body['short_description']).toEqual(shortDescription);
        expect(options.body['long_description']).toEqual(longDescription);
        expect(options.body['kind']).toEqual(kind);
        expect(options.body['id']).toEqual(id);
        expect(options.body['reported_by']).toEqual(reportedBy);
        expect(options.body['related_url']).toEqual(relatedUrl);
        expect(options.body['expiration_time']).toEqual(expirationTime);
        expect(options.body['create_time']).toEqual(createTime);
        expect(options.body['update_time']).toEqual(updateTime);
        expect(options.body['shared']).toEqual(shared);
        expect(options.body['finding']).toEqual(finding);
        expect(options.body['kpi']).toEqual(kpi);
        expect(options.body['card']).toEqual(card);
        expect(options.body['section']).toEqual(section);
        expect(options.path['account_id']).toEqual(accountId);
        expect(options.path['provider_id']).toEqual(providerId);
        expect(options.path['note_id']).toEqual(noteId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
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
          accountId,
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

        findingsApiService.updateNote(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await findingsApiService.updateNote({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateNotePromise = findingsApiService.updateNote();
        expectToBePromise(updateNotePromise);

        updateNotePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteNote', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteNote
        const accountId = 'testString';
        const providerId = 'testString';
        const noteId = 'testString';
        const transactionId = 'testString';
        const params = {
          accountId: accountId,
          providerId: providerId,
          noteId: noteId,
          transactionId: transactionId,
        };

        const deleteNoteResult = findingsApiService.deleteNote(params);

        // all methods should return a Promise
        expectToBePromise(deleteNoteResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{account_id}/providers/{provider_id}/notes/{note_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(options.path['account_id']).toEqual(accountId);
        expect(options.path['provider_id']).toEqual(providerId);
        expect(options.path['note_id']).toEqual(noteId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const providerId = 'testString';
        const noteId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          accountId,
          providerId,
          noteId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        findingsApiService.deleteNote(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await findingsApiService.deleteNote({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteNotePromise = findingsApiService.deleteNote();
        expectToBePromise(deleteNotePromise);

        deleteNotePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getOccurrenceNote', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getOccurrenceNote
        const accountId = 'testString';
        const providerId = 'testString';
        const occurrenceId = 'testString';
        const transactionId = 'testString';
        const params = {
          accountId: accountId,
          providerId: providerId,
          occurrenceId: occurrenceId,
          transactionId: transactionId,
        };

        const getOccurrenceNoteResult = findingsApiService.getOccurrenceNote(params);

        // all methods should return a Promise
        expectToBePromise(getOccurrenceNoteResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{account_id}/providers/{provider_id}/occurrences/{occurrence_id}/note', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(options.path['account_id']).toEqual(accountId);
        expect(options.path['provider_id']).toEqual(providerId);
        expect(options.path['occurrence_id']).toEqual(occurrenceId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const providerId = 'testString';
        const occurrenceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          accountId,
          providerId,
          occurrenceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        findingsApiService.getOccurrenceNote(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await findingsApiService.getOccurrenceNote({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getOccurrenceNotePromise = findingsApiService.getOccurrenceNote();
        expectToBePromise(getOccurrenceNotePromise);

        getOccurrenceNotePromise.catch(err => {
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

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createOccurrence
        const accountId = 'testString';
        const providerId = 'testString';
        const noteName = 'testString';
        const kind = 'FINDING';
        const id = 'testString';
        const resourceUrl = 'testString';
        const remediation = 'testString';
        const createTime = '2019-01-01T12:00:00.000Z';
        const updateTime = '2019-01-01T12:00:00.000Z';
        const context = contextModel;
        const finding = findingModel;
        const kpi = kpiModel;
        const referenceData = { foo: 'bar' };
        const replaceIfExists = true;
        const transactionId = 'testString';
        const params = {
          accountId: accountId,
          providerId: providerId,
          noteName: noteName,
          kind: kind,
          id: id,
          resourceUrl: resourceUrl,
          remediation: remediation,
          createTime: createTime,
          updateTime: updateTime,
          context: context,
          finding: finding,
          kpi: kpi,
          referenceData: referenceData,
          replaceIfExists: replaceIfExists,
          transactionId: transactionId,
        };

        const createOccurrenceResult = findingsApiService.createOccurrence(params);

        // all methods should return a Promise
        expectToBePromise(createOccurrenceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{account_id}/providers/{provider_id}/occurrences', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Replace-If-Exists', replaceIfExists);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(options.body['note_name']).toEqual(noteName);
        expect(options.body['kind']).toEqual(kind);
        expect(options.body['id']).toEqual(id);
        expect(options.body['resource_url']).toEqual(resourceUrl);
        expect(options.body['remediation']).toEqual(remediation);
        expect(options.body['create_time']).toEqual(createTime);
        expect(options.body['update_time']).toEqual(updateTime);
        expect(options.body['context']).toEqual(context);
        expect(options.body['finding']).toEqual(finding);
        expect(options.body['kpi']).toEqual(kpi);
        expect(options.body['reference_data']).toEqual(referenceData);
        expect(options.path['account_id']).toEqual(accountId);
        expect(options.path['provider_id']).toEqual(providerId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const providerId = 'testString';
        const noteName = 'testString';
        const kind = 'FINDING';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          accountId,
          providerId,
          noteName,
          kind,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        findingsApiService.createOccurrence(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await findingsApiService.createOccurrence({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createOccurrencePromise = findingsApiService.createOccurrence();
        expectToBePromise(createOccurrencePromise);

        createOccurrencePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listOccurrences', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listOccurrences
        const accountId = 'testString';
        const providerId = 'testString';
        const transactionId = 'testString';
        const pageSize = 2;
        const pageToken = 'testString';
        const params = {
          accountId: accountId,
          providerId: providerId,
          transactionId: transactionId,
          pageSize: pageSize,
          pageToken: pageToken,
        };

        const listOccurrencesResult = findingsApiService.listOccurrences(params);

        // all methods should return a Promise
        expectToBePromise(listOccurrencesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{account_id}/providers/{provider_id}/occurrences', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(options.qs['page_size']).toEqual(pageSize);
        expect(options.qs['page_token']).toEqual(pageToken);
        expect(options.path['account_id']).toEqual(accountId);
        expect(options.path['provider_id']).toEqual(providerId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const providerId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          accountId,
          providerId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        findingsApiService.listOccurrences(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await findingsApiService.listOccurrences({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listOccurrencesPromise = findingsApiService.listOccurrences();
        expectToBePromise(listOccurrencesPromise);

        listOccurrencesPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listNoteOccurrences', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listNoteOccurrences
        const accountId = 'testString';
        const providerId = 'testString';
        const noteId = 'testString';
        const transactionId = 'testString';
        const pageSize = 2;
        const pageToken = 'testString';
        const params = {
          accountId: accountId,
          providerId: providerId,
          noteId: noteId,
          transactionId: transactionId,
          pageSize: pageSize,
          pageToken: pageToken,
        };

        const listNoteOccurrencesResult = findingsApiService.listNoteOccurrences(params);

        // all methods should return a Promise
        expectToBePromise(listNoteOccurrencesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{account_id}/providers/{provider_id}/notes/{note_id}/occurrences', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(options.qs['page_size']).toEqual(pageSize);
        expect(options.qs['page_token']).toEqual(pageToken);
        expect(options.path['account_id']).toEqual(accountId);
        expect(options.path['provider_id']).toEqual(providerId);
        expect(options.path['note_id']).toEqual(noteId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const providerId = 'testString';
        const noteId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          accountId,
          providerId,
          noteId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        findingsApiService.listNoteOccurrences(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await findingsApiService.listNoteOccurrences({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listNoteOccurrencesPromise = findingsApiService.listNoteOccurrences();
        expectToBePromise(listNoteOccurrencesPromise);

        listNoteOccurrencesPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getOccurrence', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getOccurrence
        const accountId = 'testString';
        const providerId = 'testString';
        const occurrenceId = 'testString';
        const transactionId = 'testString';
        const params = {
          accountId: accountId,
          providerId: providerId,
          occurrenceId: occurrenceId,
          transactionId: transactionId,
        };

        const getOccurrenceResult = findingsApiService.getOccurrence(params);

        // all methods should return a Promise
        expectToBePromise(getOccurrenceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{account_id}/providers/{provider_id}/occurrences/{occurrence_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(options.path['account_id']).toEqual(accountId);
        expect(options.path['provider_id']).toEqual(providerId);
        expect(options.path['occurrence_id']).toEqual(occurrenceId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const providerId = 'testString';
        const occurrenceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          accountId,
          providerId,
          occurrenceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        findingsApiService.getOccurrence(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await findingsApiService.getOccurrence({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getOccurrencePromise = findingsApiService.getOccurrence();
        expectToBePromise(getOccurrencePromise);

        getOccurrencePromise.catch(err => {
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

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateOccurrence
        const accountId = 'testString';
        const providerId = 'testString';
        const occurrenceId = 'testString';
        const noteName = 'testString';
        const kind = 'FINDING';
        const id = 'testString';
        const resourceUrl = 'testString';
        const remediation = 'testString';
        const createTime = '2019-01-01T12:00:00.000Z';
        const updateTime = '2019-01-01T12:00:00.000Z';
        const context = contextModel;
        const finding = findingModel;
        const kpi = kpiModel;
        const referenceData = { foo: 'bar' };
        const transactionId = 'testString';
        const params = {
          accountId: accountId,
          providerId: providerId,
          occurrenceId: occurrenceId,
          noteName: noteName,
          kind: kind,
          id: id,
          resourceUrl: resourceUrl,
          remediation: remediation,
          createTime: createTime,
          updateTime: updateTime,
          context: context,
          finding: finding,
          kpi: kpi,
          referenceData: referenceData,
          transactionId: transactionId,
        };

        const updateOccurrenceResult = findingsApiService.updateOccurrence(params);

        // all methods should return a Promise
        expectToBePromise(updateOccurrenceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{account_id}/providers/{provider_id}/occurrences/{occurrence_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(options.body['note_name']).toEqual(noteName);
        expect(options.body['kind']).toEqual(kind);
        expect(options.body['id']).toEqual(id);
        expect(options.body['resource_url']).toEqual(resourceUrl);
        expect(options.body['remediation']).toEqual(remediation);
        expect(options.body['create_time']).toEqual(createTime);
        expect(options.body['update_time']).toEqual(updateTime);
        expect(options.body['context']).toEqual(context);
        expect(options.body['finding']).toEqual(finding);
        expect(options.body['kpi']).toEqual(kpi);
        expect(options.body['reference_data']).toEqual(referenceData);
        expect(options.path['account_id']).toEqual(accountId);
        expect(options.path['provider_id']).toEqual(providerId);
        expect(options.path['occurrence_id']).toEqual(occurrenceId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const providerId = 'testString';
        const occurrenceId = 'testString';
        const noteName = 'testString';
        const kind = 'FINDING';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          accountId,
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

        findingsApiService.updateOccurrence(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await findingsApiService.updateOccurrence({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateOccurrencePromise = findingsApiService.updateOccurrence();
        expectToBePromise(updateOccurrencePromise);

        updateOccurrencePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteOccurrence', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteOccurrence
        const accountId = 'testString';
        const providerId = 'testString';
        const occurrenceId = 'testString';
        const transactionId = 'testString';
        const params = {
          accountId: accountId,
          providerId: providerId,
          occurrenceId: occurrenceId,
          transactionId: transactionId,
        };

        const deleteOccurrenceResult = findingsApiService.deleteOccurrence(params);

        // all methods should return a Promise
        expectToBePromise(deleteOccurrenceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{account_id}/providers/{provider_id}/occurrences/{occurrence_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(options.path['account_id']).toEqual(accountId);
        expect(options.path['provider_id']).toEqual(providerId);
        expect(options.path['occurrence_id']).toEqual(occurrenceId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const providerId = 'testString';
        const occurrenceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          accountId,
          providerId,
          occurrenceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        findingsApiService.deleteOccurrence(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await findingsApiService.deleteOccurrence({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteOccurrencePromise = findingsApiService.deleteOccurrence();
        expectToBePromise(deleteOccurrencePromise);

        deleteOccurrencePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listProviders', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listProviders
        const accountId = 'testString';
        const transactionId = 'testString';
        const limit = 2;
        const skip = 38;
        const startProviderId = 'testString';
        const endProviderId = 'testString';
        const params = {
          accountId: accountId,
          transactionId: transactionId,
          limit: limit,
          skip: skip,
          startProviderId: startProviderId,
          endProviderId: endProviderId,
        };

        const listProvidersResult = findingsApiService.listProviders(params);

        // all methods should return a Promise
        expectToBePromise(listProvidersResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{account_id}/providers', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(options.qs['limit']).toEqual(limit);
        expect(options.qs['skip']).toEqual(skip);
        expect(options.qs['start_provider_id']).toEqual(startProviderId);
        expect(options.qs['end_provider_id']).toEqual(endProviderId);
        expect(options.path['account_id']).toEqual(accountId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          accountId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        findingsApiService.listProviders(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await findingsApiService.listProviders({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listProvidersPromise = findingsApiService.listProviders();
        expectToBePromise(listProvidersPromise);

        listProvidersPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
