'use strict';

/*
export the following variables before running this example in a terminal
export apikey=
export account_id=

This would create a card in the given account with name SampleCard and a KPI called My sample KPI with value 10
Visit https://cloud.ibm.com/security-advisor#/dashboard to view them
*/

let channels = require('./resources/channels');

const NotificationsApiV1 = require('scc-node-sdk/notifications-api/v1');
const { IamAuthenticator } = require('scc-node-sdk/auth');

const client = new NotificationsApiV1({
  authenticator: new IamAuthenticator({ apikey: process.env.apikey }),
  serviceUrl: 'https://us-south.secadvisor.cloud.ibm.com/notifications',
});

let listChannels = async () => {
  try {
    let response = await client.listAllChannels({
      accountId: process.env.account_id
    });
    console.log('List of Channels');
    console.log(JSON.stringify(response.result, null, 2));
  } catch (err) {
    console.log(err);
  }
};

let fetchChannel = async (id) => {
  try {
    let response = await client.getNotificationChannel({
      accountId: process.env.account_id,
      channelId: id
    });
    console.log('Fetching the channel info');
    console.log(JSON.stringify(response.result, null, 2));
  } catch (err) {
    console.log(err);
  }
};

let createChannels = async () => {
  await Promise.all(
    channels.map(async c => {

      try {
        console.log('Creating channel', c.name);
        let resp = await client.createNotificationChannel(
          Object.assign({ accountId: process.env.account_id }, c)
        );
        console.log('Created channel', resp.result.channel_id);
      } catch (err) {
        console.log(err)
        console.log('Channel creation failed for', c.name);
        if (err.status == 409) {
          console.log("here")
          let channel_id = JSON.parse(err.body).channel_details.id
          try {
            console.log('Trying to update channel with id', channel_id);
            let resp = await client.updateNotificationChannel(
              Object.assign(
                { accountId: process.env.account_id, channelId: channel_id },
                c
              )
            );
            console.log('Successfully updated channel with name', c.name);
          } catch (err) {
            console.log('Channel update failed for', c.name, err.message);
          }
        }
      }
    })
  );
};

let deleteChannel = async channelId => {
  try {
    await client.deleteNotificationChannel({
      accountId: process.env.account_id,
      channelId: channelId
    });
    console.log(`Deleted channel ${channelId}`);
  } catch (err) {
    console.log(err);
  }
};

let deleteChannels = async channelIds => {
  try {
    let resp = await client.deleteNotificationChannels({
      accountId: process.env.account_id,
      body: channelIds
    });
    console.log("Deleted channels: ", channelIds)
    console.log(resp.result)
  } catch (err) {
    console.log("Failed to delete channels: ", err.body);
  }
};

let updateNotificationChannel = async (channelId) => {
  let c = channels[0]
  c.endpoint = "https://webhook.site/2a982a9b-9468-4a7e-9fc6-1c035b763967"
  try {
    console.log('Trying to update channel with id', channelId);
    let resp = await client.updateNotificationChannel(
      Object.assign(
        { 
          accountId: process.env.account_id, 
          channelId: channelId
        },
        c
      )
    );
    console.log("Successfully updated channel: ", resp.result);
  } catch (err) {
    console.log(err)
    console.log("Failed to update channel: ", err.body)
  }
}

let getNotificationChannel = async (channelId) => {
  try {
    console.log("Fetching channel with id: ", channelId)
    let resp = await client.getNotificationChannel({
      accountId: process.env.account_id,
      channelId: channelId
    });
    console.log("Fetched channel:")
    console.log(resp.result)
  } catch (err) {
    console.log("Failed to fetch channel: ", err.body);
  }
}

let getPublicKey = async () => {
  try {
    console.log("Fetching public key")
    let resp = await client.getPublicKey({
      accountId: process.env.account_id,
    });
    console.log("Fetched public key:")
    console.log(resp.result)
  } catch (err) {
    console.log("Failed to fetch public key: ", err.body);
  }
}

let testNotificationChannel = async (channelId) => {
  try {
    console.log("Testing webhook for: ", channelId)
    let resp = await client.testNotificationChannel({
      accountId: process.env.account_id,
      channelId: channelId
    });
    console.log(resp.result)
  } catch (err) {
    console.log("Failed to test weebhook: ", err.body);
  }
}


//pass
let driver = async seq => {
  if (seq) {
    await getPublicKey()
    await testNotificationChannel("channelid")
    await listChannels();
    await fetchChannel("id");
    await createChannels();
    await deleteChannels(["channelid1", "channelid2"]);
    await deleteChannel("channelid")
    await updateNotificationChannel("channelid")
    await getNotificationChannel("channelid")
  } else {
    Promise.all([listChannels(), fetchChannel("id"), createChannels()]);
  }
};

driver(true);

