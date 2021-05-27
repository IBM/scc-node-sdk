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

const NotificationsV1 = require('../../dist/notifications/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
} = unitTestUtils;

const service = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://us-south.secadvisor.cloud.ibm.com/notifications',
};

const notificationsService = new NotificationsV1(service);

// dont actually create a request
const createRequestMock = jest.spyOn(notificationsService, 'createRequest');
createRequestMock.mockImplementation(() => Promise.resolve());

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

afterEach(() => {
  createRequestMock.mockClear();
  getAuthenticatorMock.mockClear();
});

describe('NotificationsV1', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = NotificationsV1.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(NotificationsV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(NotificationsV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(NotificationsV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = NotificationsV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(NotificationsV1);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new NotificationsV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new NotificationsV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(NotificationsV1.DEFAULT_SERVICE_URL);
    });
  });
  describe('listAllChannels', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listAllChannels
        const accountId = 'testString';
        const transactionId = 'testString';
        const limit = 38;
        const skip = 38;
        const params = {
          accountId,
          transactionId,
          limit,
          skip,
        };

        const listAllChannelsResult = notificationsService.listAllChannels(params);

        // all methods should return a Promise
        expectToBePromise(listAllChannelsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{account_id}/notifications/channels', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(options.qs.limit).toEqual(limit);
        expect(options.qs.skip).toEqual(skip);
        expect(options.path.account_id).toEqual(accountId);
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

        notificationsService.listAllChannels(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await notificationsService.listAllChannels({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listAllChannelsPromise = notificationsService.listAllChannels();
        expectToBePromise(listAllChannelsPromise);

        listAllChannelsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createNotificationChannel', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // NotificationChannelAlertSourceItem
      const notificationChannelAlertSourceItemModel = {
        provider_name: 'testString',
        finding_types: ['testString'],
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createNotificationChannel
        const accountId = 'testString';
        const name = 'testString';
        const type = 'Webhook';
        const endpoint = 'testString';
        const description = 'testString';
        const severity = ['low'];
        const enabled = true;
        const alertSource = [notificationChannelAlertSourceItemModel];
        const transactionId = 'testString';
        const params = {
          accountId,
          name,
          type,
          endpoint,
          description,
          severity,
          enabled,
          alertSource,
          transactionId,
        };

        const createNotificationChannelResult = notificationsService.createNotificationChannel(
          params
        );

        // all methods should return a Promise
        expectToBePromise(createNotificationChannelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{account_id}/notifications/channels', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(options.body.name).toEqual(name);
        expect(options.body.type).toEqual(type);
        expect(options.body.endpoint).toEqual(endpoint);
        expect(options.body.description).toEqual(description);
        expect(options.body.severity).toEqual(severity);
        expect(options.body.enabled).toEqual(enabled);
        expect(options.body.alert_source).toEqual(alertSource);
        expect(options.path.account_id).toEqual(accountId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const name = 'testString';
        const type = 'Webhook';
        const endpoint = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          accountId,
          name,
          type,
          endpoint,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        notificationsService.createNotificationChannel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await notificationsService.createNotificationChannel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createNotificationChannelPromise = notificationsService.createNotificationChannel();
        expectToBePromise(createNotificationChannelPromise);

        createNotificationChannelPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteNotificationChannels', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteNotificationChannels
        const accountId = 'testString';
        const requestBody = ['testString'];
        const transactionId = 'testString';
        const params = {
          accountId,
          requestBody,
          transactionId,
        };

        const deleteNotificationChannelsResult = notificationsService.deleteNotificationChannels(
          params
        );

        // all methods should return a Promise
        expectToBePromise(deleteNotificationChannelsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{account_id}/notifications/channels', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(options.body).toEqual(requestBody);
        expect(options.path.account_id).toEqual(accountId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const requestBody = ['testString'];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          accountId,
          requestBody,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        notificationsService.deleteNotificationChannels(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await notificationsService.deleteNotificationChannels({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteNotificationChannelsPromise = notificationsService.deleteNotificationChannels();
        expectToBePromise(deleteNotificationChannelsPromise);

        deleteNotificationChannelsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteNotificationChannel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteNotificationChannel
        const accountId = 'testString';
        const channelId = 'testString';
        const transactionId = 'testString';
        const params = {
          accountId,
          channelId,
          transactionId,
        };

        const deleteNotificationChannelResult = notificationsService.deleteNotificationChannel(
          params
        );

        // all methods should return a Promise
        expectToBePromise(deleteNotificationChannelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{account_id}/notifications/channels/{channel_id}',
          'DELETE'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(options.path.account_id).toEqual(accountId);
        expect(options.path.channel_id).toEqual(channelId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const channelId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          accountId,
          channelId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        notificationsService.deleteNotificationChannel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await notificationsService.deleteNotificationChannel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteNotificationChannelPromise = notificationsService.deleteNotificationChannel();
        expectToBePromise(deleteNotificationChannelPromise);

        deleteNotificationChannelPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getNotificationChannel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getNotificationChannel
        const accountId = 'testString';
        const channelId = 'testString';
        const transactionId = 'testString';
        const params = {
          accountId,
          channelId,
          transactionId,
        };

        const getNotificationChannelResult = notificationsService.getNotificationChannel(params);

        // all methods should return a Promise
        expectToBePromise(getNotificationChannelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{account_id}/notifications/channels/{channel_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(options.path.account_id).toEqual(accountId);
        expect(options.path.channel_id).toEqual(channelId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const channelId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          accountId,
          channelId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        notificationsService.getNotificationChannel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await notificationsService.getNotificationChannel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getNotificationChannelPromise = notificationsService.getNotificationChannel();
        expectToBePromise(getNotificationChannelPromise);

        getNotificationChannelPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateNotificationChannel', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // NotificationChannelAlertSourceItem
      const notificationChannelAlertSourceItemModel = {
        provider_name: 'testString',
        finding_types: ['testString'],
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateNotificationChannel
        const accountId = 'testString';
        const channelId = 'testString';
        const name = 'testString';
        const type = 'Webhook';
        const endpoint = 'testString';
        const description = 'testString';
        const severity = ['low'];
        const enabled = true;
        const alertSource = [notificationChannelAlertSourceItemModel];
        const transactionId = 'testString';
        const params = {
          accountId,
          channelId,
          name,
          type,
          endpoint,
          description,
          severity,
          enabled,
          alertSource,
          transactionId,
        };

        const updateNotificationChannelResult = notificationsService.updateNotificationChannel(
          params
        );

        // all methods should return a Promise
        expectToBePromise(updateNotificationChannelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{account_id}/notifications/channels/{channel_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(options.body.name).toEqual(name);
        expect(options.body.type).toEqual(type);
        expect(options.body.endpoint).toEqual(endpoint);
        expect(options.body.description).toEqual(description);
        expect(options.body.severity).toEqual(severity);
        expect(options.body.enabled).toEqual(enabled);
        expect(options.body.alert_source).toEqual(alertSource);
        expect(options.path.account_id).toEqual(accountId);
        expect(options.path.channel_id).toEqual(channelId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const channelId = 'testString';
        const name = 'testString';
        const type = 'Webhook';
        const endpoint = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          accountId,
          channelId,
          name,
          type,
          endpoint,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        notificationsService.updateNotificationChannel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await notificationsService.updateNotificationChannel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateNotificationChannelPromise = notificationsService.updateNotificationChannel();
        expectToBePromise(updateNotificationChannelPromise);

        updateNotificationChannelPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('testNotificationChannel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation testNotificationChannel
        const accountId = 'testString';
        const channelId = 'testString';
        const transactionId = 'testString';
        const params = {
          accountId,
          channelId,
          transactionId,
        };

        const testNotificationChannelResult = notificationsService.testNotificationChannel(params);

        // all methods should return a Promise
        expectToBePromise(testNotificationChannelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{account_id}/notifications/channels/{channel_id}/test',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(options.path.account_id).toEqual(accountId);
        expect(options.path.channel_id).toEqual(channelId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const channelId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          accountId,
          channelId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        notificationsService.testNotificationChannel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await notificationsService.testNotificationChannel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const testNotificationChannelPromise = notificationsService.testNotificationChannel();
        expectToBePromise(testNotificationChannelPromise);

        testNotificationChannelPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getPublicKey', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getPublicKey
        const accountId = 'testString';
        const transactionId = 'testString';
        const params = {
          accountId,
          transactionId,
        };

        const getPublicKeyResult = notificationsService.getPublicKey(params);

        // all methods should return a Promise
        expectToBePromise(getPublicKeyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{account_id}/notifications/public_key', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(options.path.account_id).toEqual(accountId);
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

        notificationsService.getPublicKey(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await notificationsService.getPublicKey({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getPublicKeyPromise = notificationsService.getPublicKey();
        expectToBePromise(getPublicKeyPromise);

        getPublicKeyPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
