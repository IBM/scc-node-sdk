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

const { readExternalSources } = require('ibm-cloud-sdk-core');
const NotificationsV1 = require('../../dist/notifications/v1');
const authHelper = require('../resources/auth-helper.js');

const accountId = process.env.ACCOUNT_ID;
const testString = 'testString';
const identifier = process.env.TRAVIS_JOB_ID || Date.now();
let channelId = '';
console.log(identifier);

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

  afterAll(async () => {
    console.log(`cleaning up account: ${accountId}\n`);
    const params = {
      accountId,
    };

    const res = await notificationsService.listAllChannels(params);
    res.result.channels.forEach(async channel => {
      if (channel.channel_id === channelId) {
        const params = {
          accountId,
          channelId,
        };
        await notificationsService.deleteNotificationChannel(params);
      }
    });
    console.log(`cleanup was successful\n`);
  });

  test('listAllChannels()', async () => {
    const params = {
      accountId,
    };

    const res = await notificationsService.listAllChannels(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('createNotificationChannel()', async () => {
    // Request models needed by this operation.

    // NotificationChannelAlertSourceItem
    const notificationChannelAlertSourceItemModel = {
      provider_name: 'VA',
      finding_types: ['image_with_vulnerabilities'],
    };

    const params = {
      accountId,
      name: `testString-${identifier}`,
      type: 'Webhook',
      endpoint: 'https://webhook.site/136fe1e2-3c3f-4bff-925f-391fbb202546',
      description: testString,
      severity: ['low'],
      enabled: true,
      alertSource: [notificationChannelAlertSourceItemModel],
    };

    const res = await notificationsService.createNotificationChannel(params);
    channelId = res.result.channel_id;
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('getNotificationChannel()', async () => {
    const params = {
      accountId,
      channelId,
    };

    const res = await notificationsService.getNotificationChannel(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('updateNotificationChannel()', async () => {
    // Request models needed by this operation.

    // NotificationChannelAlertSourceItem
    const notificationChannelAlertSourceItemModel = {
      provider_name: 'VA',
      finding_types: ['image_with_vulnerabilities'],
    };

    const params = {
      accountId,
      channelId,
      name: `testString-${identifier}`,
      type: 'Webhook',
      endpoint: 'https://webhook.site/136fe1e2-3c3f-4bff-925f-391fbb202546',
      description: testString,
      severity: ['low'],
      enabled: true,
      alertSource: [notificationChannelAlertSourceItemModel],
    };

    const res = await notificationsService.updateNotificationChannel(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('testNotificationChannel()', async () => {
    const params = {
      accountId,
      channelId,
    };

    const res = await notificationsService.testNotificationChannel(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('getPublicKey()', async () => {
    const params = {
      accountId,
    };

    const res = await notificationsService.getPublicKey(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('deleteNotificationChannel()', async () => {
    const params = {
      accountId,
      channelId,
    };

    const res = await notificationsService.deleteNotificationChannel(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('deleteNotificationChannels()', async () => {
    const notificationChannelAlertSourceItemModel = {
      provider_name: 'VA',
      finding_types: ['image_with_vulnerabilities'],
    };

    const createChannelParams = {
      accountId,
      name: testString,
      type: 'Webhook',
      endpoint: 'https://webhook.site/136fe1e2-3c3f-4bff-925f-391fbb202546',
      description: testString,
      severity: ['low'],
      enabled: true,
      alertSource: [notificationChannelAlertSourceItemModel],
    };

    const createChannelRes = await notificationsService.createNotificationChannel(
      createChannelParams
    );
    const channelId = createChannelRes.result.channel_id;

    const deleteChannelsParams = {
      accountId,
      requestBody: [channelId],
    };

    const deleteChannelsRes = await notificationsService.deleteNotificationChannels(
      deleteChannelsParams
    );
    expect(deleteChannelsRes).toBeDefined();
    expect(deleteChannelsRes.result).toBeDefined();
  });
});
