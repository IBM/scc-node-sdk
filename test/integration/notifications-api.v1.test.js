const NotificationsApiV1 = require('../../dist/notifications-api/v1');
const { IamAuthenticator } = require('../../dist/auth');
const authHelper = require('../resources/auth-helper.js');
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)

describe('NotificationsApiV1 service setup', () => {
  test('should use constructor to setup service with custom url', () => {
    const client = new NotificationsApiV1({
      authenticator: new IamAuthenticator({ apikey: 'apikey', url: 'https://iam_url.com' }),
      serviceUrl: process.env.notificationsServiceUrl,
    });

    expect(client.baseOptions.serviceUrl).toBe(process.env.notificationsServiceUrl);
  });

  test('should use constructor to setup service with default url', () => {
    const client = new NotificationsApiV1({
      authenticator: new IamAuthenticator({ apikey: 'apikey', url: 'https://iam_url.com' }),
    });

    expect(client.baseOptions.serviceUrl).toBe(
      'https://us-south.secadvisor.cloud.ibm.com/notifications'
    );
  });

  test('should use setup service using newInstance', () => {
    const client = NotificationsApiV1.newInstance({
      authenticator: new IamAuthenticator({ apikey: 'apikey', url: 'https://iam_url.com' }),
      serviceUrl: process.env.notificationsServiceUrl,
    });

    expect(client).toBeInstanceOf(NotificationsApiV1);
    expect(client.baseOptions.serviceUrl).toBe(process.env.notificationsServiceUrl);
  });

  test('should use setup service using newInstance and authenticator from env', () => {
    process.env.NOTIFICATIONS_API_AUTH_TYPE = 'iam';
    process.env.NOTIFICATIONS_API_APIKEY = 'apikey';
    const client = NotificationsApiV1.newInstance({
      serviceName: 'notifications_api',
    });

    expect(client).toBeInstanceOf(NotificationsApiV1);
  });
});

describe('NotificationsApiV1 listChannels', () => {
  const client = new NotificationsApiV1({
    authenticator: new IamAuthenticator({ apikey: process.env.apikey, url: process.env.iamUrl }),
    serviceUrl: process.env.notificationsServiceUrl,
  });
  const accountId = process.env.accountId;

  test('should listchannels successfully without skip and limit', async done => {
    jest.setTimeout(10000);
    try {
      const resp = await client.listAllChannels({
        accountId: accountId,
      });
      expect(resp.status).toBe(200);
      expect(resp.result.channels.length).toBeGreaterThanOrEqual(0);
      done();
    } catch (err) {
      done(err);
    }
  });

  test('should listchannels successfully with skip and limit', async done => {
    jest.setTimeout(10000);
    try {
      const resp = await client.listAllChannels({
        accountId: accountId,
        skip: 5,
        limit: 1,
      });
      expect(resp.status).toBe(200);
      expect(resp.result.channels.length).toBeGreaterThanOrEqual(0);
      done();
    } catch (err) {
      done(err);
    }
  });

  test('should fail to listchannels with forbidden error', async done => {
    jest.setTimeout(10000);
    try {
      await client.listAllChannels({
        accountId: 'accountId',
      });
    } catch (err) {
      expect(err.status).toBe(403);
      done();
    }
  });

  test('should fail to listchannels with missing mandatory param', async done => {
    jest.setTimeout(10000);
    try {
      await client.listAllChannels({});
    } catch (err) {
      expect(err.toString()).toEqual('Error: Missing required parameters: accountId');
      done();
    }
  });
});

describe('NotificationsApiV1 createChannels', () => {
  const client = new NotificationsApiV1({
    authenticator: new IamAuthenticator({ apikey: process.env.apikey, url: process.env.iamUrl }),
    serviceUrl: process.env.notificationsServiceUrl,
  });
  const accountId = process.env.accountId;

  test('should fail to createChannels with missing mandatory param', async done => {
    jest.setTimeout(10000);
    try {
      await client.createNotificationChannel({});
    } catch (err) {
      expect(err.toString()).toEqual(
        'Error: Missing required parameters: accountId, name, type, endpoint'
      );
      done();
    }
  });

  test('should successfuly createChannel with mandatory param', async done => {
    jest.setTimeout(30000);
    try {
      const resp = await client.createNotificationChannel({
        accountId: accountId,
        name: 'create_' + Date.now(),
        endpoint: 'https://ss.ss',
        type: 'Webhook',
      });
      expect(resp.status).toBe(200);
      console.log('Successfully created channel with mandatory param');

      const deleteResp = await client.deleteNotificationChannel({
        accountId: accountId,
        channelId: resp.result.channel_id,
      });
      expect(deleteResp.status).toBe(200);
      console.log('Successfully deleted channel');

      done();
    } catch (err) {
      done(err);
    }
  });

  test('should successfuly createChannel with all param', async done => {
    jest.setTimeout(30000);
    try {
      const resp = await client.createNotificationChannel({
        accountId: accountId,
        name: 'create_' + Date.now(),
        endpoint: 'https://ss.ss',
        type: 'Webhook',
        alertSource: [{ provider_name: 'VA', finding_types: ['ALL'] }],
        description: 'desc',
        enabled: true,
        severity: ['high'],
      });
      expect(resp.status).toBe(200);
      console.log('Successfully created channel with all param');

      const getResp = await client.getNotificationChannel({
        accountId: accountId,
        channelId: resp.result.channel_id,
      });
      const channel = getResp.result.channel;
      console.log(channel)
      expect(channel.alert_source).toEqual([{ provider_name: 'VA', finding_types: ['ALL'] }]);

      const deleteResp = await client.deleteNotificationChannel({
        accountId: accountId,
        channelId: resp.result.channel_id,
      });
      expect(deleteResp.status).toBe(200);
      console.log('Successfully deleted channel');

      done();
    } catch (err) {
      done(err);
    }
  });
});

describe('NotificationsApiV1 updateChannel', () => {
  const client = new NotificationsApiV1({
    authenticator: new IamAuthenticator({ apikey: process.env.apikey, url: process.env.iamUrl }),
    serviceUrl: process.env.notificationsServiceUrl,
  });
  const accountId = process.env.accountId;

  test('should fail to updateChannel with missing mandatory param', async done => {
    jest.setTimeout(10000);
    try {
      await client.updateNotificationChannel({});
    } catch (err) {
      expect(err.toString()).toEqual(
        'Error: Missing required parameters: accountId, channelId, name, type, endpoint'
      );
      done();
    }
  });

  test('should fail to updateChannel with mandatory param', async done => {
    jest.setTimeout(40000);
    try {
      const resp = await client.createNotificationChannel({
        accountId: accountId,
        name: 'update_' + Date.now(),
        endpoint: 'https://ss.ss',
        type: 'Webhook',
      });
      expect(resp.status).toBe(200);
      console.log('Successfully created channel');

      const updateResp = await client.updateNotificationChannel({
        accountId: accountId,
        channelId: resp.result.channel_id,
        name: 'test_' + Date.now(),
        endpoint: 'https://ss.ss',
        type: 'Webhook',
        alertSource: [{ provider_name: 'VA', finding_types: ['ALL'] }],
        severity: ['high'],
      });
      expect(updateResp.status).toBe(200);
      console.log('Successfully updated channel');

      const getResp = await client.getNotificationChannel({
        accountId: accountId,
        channelId: resp.result.channel_id,
      });
      const channel = getResp.result.channel;
      expect(channel.alert_source).toEqual([{ provider_name: 'VA', finding_types: ['ALL'] }]);

      const deleteResp = await client.deleteNotificationChannel({
        accountId: accountId,
        channelId: resp.result.channel_id,
      });
      expect(deleteResp.status).toBe(200);
      console.log('Successfully deleted channel');

      done();
    } catch (err) {
      done(err);
    }
  });
});

describe('NotificationsApiV1 getChannel', () => {
  const client = new NotificationsApiV1({
    authenticator: new IamAuthenticator({ apikey: process.env.apikey, url: process.env.iamUrl }),
    serviceUrl: process.env.notificationsServiceUrl,
  });
  const accountId = process.env.accountId;

  test('should fail to getChannel with missing mandatory param', async done => {
    jest.setTimeout(10000);
    try {
      await client.getNotificationChannel({});
    } catch (err) {
      expect(err.toString()).toEqual('Error: Missing required parameters: accountId, channelId');
      done();
    }
  });

  test('should successfully getChannel', async done => {
    jest.setTimeout(30000);
    try {
      const ts = Date.now();
      const resp = await client.createNotificationChannel({
        accountId: accountId,
        name: 'get_ch_' + ts,
        endpoint: 'https://ss.ss',
        type: 'Webhook',
      });
      expect(resp.status).toBe(200);
      console.log('Successfully created channel');

      const getResp = await client.getNotificationChannel({
        accountId: accountId,
        channelId: resp.result.channel_id,
      });
      expect(getResp.status).toBe(200);
      expect(getResp.result.channel.name).toBe('get_ch_' + ts);
      console.log('Successfully fetched channel');

      const deleteResp = await client.deleteNotificationChannel({
        accountId: accountId,
        channelId: resp.result.channel_id,
      });
      expect(deleteResp.status).toBe(200);
      console.log('Successfully deleted channel');

      done();
    } catch (err) {
      done(err);
    }
  });
});

describe('NotificationsApiV1 deleteChannel', () => {
  const client = new NotificationsApiV1({
    authenticator: new IamAuthenticator({ apikey: process.env.apikey, url: process.env.iamUrl }),
    serviceUrl: process.env.notificationsServiceUrl,
  });
  const accountId = process.env.accountId;

  test('should fail to deleteChannel with missing mandatory param', async done => {
    jest.setTimeout(10000);
    try {
      await client.deleteNotificationChannel({});
    } catch (err) {
      expect(err.toString()).toEqual('Error: Missing required parameters: accountId, channelId');
      done();
    }
  });

  test('should successfully deleteChannel', async done => {
    jest.setTimeout(30000);
    try {
      const resp = await client.createNotificationChannel({
        accountId: accountId,
        name: 'delete_' + Date.now(),
        endpoint: 'https://ss.ss',
        type: 'Webhook',
      });
      expect(resp.status).toBe(200);
      console.log('Successfully created channel');

      const delResp = await client.deleteNotificationChannel({
        accountId: accountId,
        channelId: resp.result.channel_id,
      });
      expect(delResp.status).toBe(200);
      console.log('Successfully deleted channel');

      done();
    } catch (err) {
      done(err);
    }
  });
});

describe('NotificationsApiV1 deleteChannels', () => {
  const client = new NotificationsApiV1({
    authenticator: new IamAuthenticator({ apikey: process.env.apikey, url: process.env.iamUrl }),
    serviceUrl: process.env.notificationsServiceUrl,
  });
  const accountId = process.env.accountId;

  test('should fail to deleteChannels with missing mandatory param', async done => {
    jest.setTimeout(10000);
    try {
      await client.deleteNotificationChannels({});
    } catch (err) {
      expect(err.toString()).toEqual('Error: Missing required parameters: accountId, requestBody');
      done();
    }
  });

  test('should successfully deleteChannels', async done => {
    jest.setTimeout(30000);
    try {
      const resp1 = await client.createNotificationChannel({
        accountId: accountId,
        name: 'delete_' + Date.now(),
        endpoint: 'https://ss.ss',
        type: 'Webhook',
      });
      const resp2 = await client.createNotificationChannel({
        accountId: accountId,
        name: 'delete_' + Date.now(),
        endpoint: 'https://ss.ss',
        type: 'Webhook',
      });
      expect(resp1.status).toBe(200);
      expect(resp2.status).toBe(200);
      console.log('Successfully created channels');

      const getResp = await client.deleteNotificationChannels({
        accountId: accountId,
        requestBody: [resp1.result.channel_id, resp2.result.channel_id],
      });
      expect(getResp.status).toBe(200);
      console.log('Successfully deleted channel');

      done();
    } catch (err) {
      done(err);
    }
  });
});

describe('NotificationsApiV1 getChannel', () => {
  const client = new NotificationsApiV1({
    authenticator: new IamAuthenticator({ apikey: process.env.apikey, url: process.env.iamUrl }),
    serviceUrl: process.env.notificationsServiceUrl,
  });
  const accountId = process.env.accountId;

  test('should fail to getChannel with missing mandatory param', async done => {
    jest.setTimeout(10000);
    try {
      await client.getNotificationChannel({});
    } catch (err) {
      expect(err.toString()).toEqual('Error: Missing required parameters: accountId, channelId');
      done();
    }
  });
});

describe('NotificationsApiV1 getPublicKey', () => {
  const client = new NotificationsApiV1({
    authenticator: new IamAuthenticator({ apikey: process.env.apikey, url: process.env.iamUrl }),
    serviceUrl: process.env.notificationsServiceUrl,
  });
  const accountId = process.env.accountId;

  test('should fail to getChannel with missing mandatory param', async done => {
    jest.setTimeout(10000);
    try {
      await client.getPublicKey({});
    } catch (err) {
      expect(err.toString()).toEqual('Error: Missing required parameters: accountId');
      done();
    }
  });

  test('should successfully getPublicKey', async done => {
    jest.setTimeout(10000);
    try {
      const resp = await client.getPublicKey({
        accountId: accountId,
      });
      expect(resp.result.publicKey).not.toBeNull();
      done();
    } catch (err) {
      done(err);
    }
  });
});

describe('NotificationsApiV1 testNotificationChannel', () => {
  const client = new NotificationsApiV1({
    authenticator: new IamAuthenticator({ apikey: process.env.apikey, url: process.env.iamUrl }),
    serviceUrl: process.env.notificationsServiceUrl,
  });
  const accountId = process.env.accountId;

  test('should fail to testNotificationChannel with missing mandatory param', async done => {
    jest.setTimeout(10000);
    try {
      await client.testNotificationChannel({});
    } catch (err) {
      expect(err.toString()).toEqual('Error: Missing required parameters: accountId, channelId');
      done();
    }
  });

  test('should successfully testNotificationChannel', async done => {
    jest.setTimeout(10000);
    try {
      const resp = await client.createNotificationChannel({
        accountId: accountId,
        name: 'delete_' + Date.now(),
        endpoint: 'https://dev.requestcatcher.com/',
        type: 'Webhook',
      });
      expect(resp.status).toBe(200);
      console.log('Successfully created channel');

      const testResp = await client.testNotificationChannel({
        accountId: accountId,
        channelId: resp.result.channel_id,
      });
      expect(testResp.status).toBe(200);
      done();
    } catch (err) {
      console.log(err);
      done(err);
    }
  });
});
