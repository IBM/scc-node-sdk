/* eslint-disable no-console */
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
const NotificationsV1 = require('../../dist/notifications/v1');
const { readExternalSources } = require('ibm-cloud-sdk-core');
const authHelper = require('../resources/auth-helper.js');

// testcase timeout value (200s).
const timeout = 200000;

// Location of our config file.
const configFile = 'notifications_v1.env';

const describe = authHelper.prepareTests(configFile);

describe('NotificationsV1_integration', () => {
  const notificationsService = NotificationsV1.newInstance({});

  expect(notificationsService).not.toBeNull();

  const config = readExternalSources(NotificationsV1.DEFAULT_SERVICE_NAME);
  expect(config).not.toBeNull();

  jest.setTimeout(timeout);

  test('listAllChannels()', async () => {
    const params = {
      accountId: 'testString',
      transactionId: 'testString',
      limit: 38,
      skip: 38,
    };

    const res = await notificationsService.listAllChannels(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('createNotificationChannel()', async () => {
    // Request models needed by this operation.

    // NotificationChannelAlertSourceItem
    const notificationChannelAlertSourceItemModel = {
      provider_name: 'testString',
      finding_types: ['testString'],
    };

    const params = {
      accountId: 'testString',
      name: 'testString',
      type: 'Webhook',
      endpoint: 'testString',
      description: 'testString',
      severity: ['low'],
      enabled: true,
      alertSource: [notificationChannelAlertSourceItemModel],
      transactionId: 'testString',
    };

    const res = await notificationsService.createNotificationChannel(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('getNotificationChannel()', async () => {
    const params = {
      accountId: 'testString',
      channelId: 'testString',
      transactionId: 'testString',
    };

    const res = await notificationsService.getNotificationChannel(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('updateNotificationChannel()', async () => {
    // Request models needed by this operation.

    // NotificationChannelAlertSourceItem
    const notificationChannelAlertSourceItemModel = {
      provider_name: 'testString',
      finding_types: ['testString'],
    };

    const params = {
      accountId: 'testString',
      channelId: 'testString',
      name: 'testString',
      type: 'Webhook',
      endpoint: 'testString',
      description: 'testString',
      severity: ['low'],
      enabled: true,
      alertSource: [notificationChannelAlertSourceItemModel],
      transactionId: 'testString',
    };

    const res = await notificationsService.updateNotificationChannel(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('testNotificationChannel()', async () => {
    const params = {
      accountId: 'testString',
      channelId: 'testString',
      transactionId: 'testString',
    };

    const res = await notificationsService.testNotificationChannel(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('getPublicKey()', async () => {
    const params = {
      accountId: 'testString',
      transactionId: 'testString',
    };

    const res = await notificationsService.getPublicKey(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('deleteNotificationChannels()', async () => {
    const params = {
      accountId: 'testString',
      requestBody: ['testString'],
      transactionId: 'testString',
    };

    const res = await notificationsService.deleteNotificationChannels(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('deleteNotificationChannel()', async () => {
    const params = {
      accountId: 'testString',
      channelId: 'testString',
      transactionId: 'testString',
    };

    const res = await notificationsService.deleteNotificationChannel(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
});
