'use strict';

/*
export the following variables before running this example in a terminal
export apikey=
export accountId=

This would create a card in the given account with name SampleCard and a KPI called My sample KPI with value 10
Visit https://cloud.ibm.com/security-advisor#/dashboard to view them
*/

let notes = require('./resources/notes');
let occurrences = require('./resources/occurrences');

const FindingsAPI = require('scc-node-sdk/findings/v1');
const { IamAuthenticator } = require('scc-node-sdk/auth');

const findingsAPIClient = new FindingsAPI({
  authenticator: new IamAuthenticator({ apikey: process.env.apikey }),
  serviceUrl: 'https://us-south.secadvisor.cloud.ibm.com/findings',
});

let listNotes = async () => {
  try {
    let response = await findingsAPIClient.listNotes({
      accountId: process.env.accountId,
      providerId: 'security-advisor',
    });
    console.log('List of notes');
    console.log(JSON.stringify(response.result, null, 2));
  } catch (err) {
    console.log(err);
  }
};

let listOccurrences = async () => {
  try {
    let response = await findingsAPIClient.listOccurrences({
      accountId: process.env.accountId,
      providerId: 'security-advisor',
    });
    console.log('List of occurrences');
    console.log(JSON.stringify(response.result, null, 2));
  } catch (err) {
    console.log(err);
  }
};

let createNotes = async () => {
  await Promise.all(
    notes.map(async n => {
      try {
        console.log('Creating note with id', n.id);
        await findingsAPIClient.createNote(
          Object.assign({ accountId: process.env.accountId, providerId: 'security-advisor' }, n)
        );
        console.log('Created note with id', n.id);
      } catch (err) {
        console.log('Note creation failed for id', n.id, err.message);
        if (err.status == 409) {
          try {
            console.log('Trying to update note with id', n.id);
            await findingsAPIClient.updateNote(
              Object.assign(
                { accountId: process.env.accountId, noteId: n.id, providerId: 'security-advisor' },
                n
              )
            );
            console.log('Successfully updated note with id', n.id);
          } catch (err) {
            console.log('Note update failed for id', n.id, err.message);
          }
        }
      }
    })
  );
};

let createOccurrences = async () => {
  await Promise.all(
    occurrences.map(async o => {
      try {
        console.log('Creating occurence with id', o.id);
        await findingsAPIClient.createOccurrence(
          Object.assign({ accountId: process.env.accountId, providerId: 'security-advisor' }, o)
        );
        console.log('Created occurence with id', o.id);
      } catch (err) {
        console.log('Occurence creation failed for id', o.id, err.message);
        if (err.status == 409) {
          try {
            console.log('Trying to update occurence with id', o.id);
            await findingsAPIClient.updateOccurrence(
              Object.assign(
                {
                  accountId: process.env.accountId,
                  providerId: 'security-advisor',
                  occurrenceId: o.id,
                },
                o
              )
            );
            console.log('Successfully updated occurence with id', o.id);
          } catch (err) {
            console.log('Note update failed for id', o.id, err.message);
          }
        }
      }
    })
  );
};

let deleteNote = async noteId => {
  try {
    await findingsAPIClient.deleteNote({
      accountId: process.env.accountId,
      providerId: 'security-advisor',
      noteId,
    });
    console.log(`Deleted note ${noteId}`);
  } catch (err) {
    console.log(err);
  }
};

let deleteOccurrence = async occurrenceId => {
  try {
    await findingsAPIClient.deleteOccurrence({
      accountId: process.env.accountId,
      providerId: 'security-advisor',
      occurrenceId,
    });
    console.log(`Deleted occurence ${occurrenceId}`);
  } catch (err) {
    console.log(err);
  }
};

//pass
let driver = async seq => {
  if (seq) {
    await listNotes();
    await createNotes();
    await createOccurrences();
    await listOccurrences();
  } else {
    Promise.all([listNotes(), createNotes(), createOccurrences(), listOccurrences()]);
  }
};

driver(true);

//Uncomment below and re-run to see the card is gone from the dashboard
// deleteNote("mycard")
// deleteOccurrence("occurence2")
