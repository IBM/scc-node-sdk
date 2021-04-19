const FindingsApiV1 = require('../../dist/findings-api/v1');
const { IamAuthenticator } = require('../../dist/auth');
const authHelper = require('../resources/auth-helper.js');
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)

describe('FindingsApiV1 service setup', () => {
  test('should use constructor to setup service with custom url', () => {
    const client = new FindingsApiV1({
      authenticator: new IamAuthenticator({ apikey: 'apikey', url: 'https://iam_url.com' }),
      serviceUrl: process.env.findingsServiceUrl,
    });

    expect(client.baseOptions.serviceUrl).toBe(process.env.findingsServiceUrl);
  });

  test('should use constructor to setup service with default url', () => {
    const client = new FindingsApiV1({
      authenticator: new IamAuthenticator({ apikey: 'apikey', url: 'https://iam_url.com' }),
    });

    expect(client.baseOptions.serviceUrl).toBe(
      'https://us-south.secadvisor.cloud.ibm.com/findings'
    );
  });

  test('should use setup service using newInstance', () => {
    const client = FindingsApiV1.newInstance({
      authenticator: new IamAuthenticator({ apikey: 'apikey', url: 'https://iam_url.com' }),
      serviceUrl: process.env.findingsServiceUrl,
    });

    expect(client).toBeInstanceOf(FindingsApiV1);
    expect(client.baseOptions.serviceUrl).toBe(process.env.findingsServiceUrl);
  });

  test('should use setup service using newInstance and authenticator from env', () => {
    process.env.FINDINGS_API_AUTH_TYPE = 'iam';
    process.env.FINDINGS_API_APIKEY = 'apikey';
    const client = FindingsApiV1.newInstance({
      serviceName: 'findings_api',
    });

    expect(client).toBeInstanceOf(FindingsApiV1);
  });
});

describe('FindingsApiV1 postGraph', () => {
  const client = new FindingsApiV1({
    authenticator: new IamAuthenticator({ apikey: process.env.apikey, url: process.env.iamUrl }),
    serviceUrl: process.env.findingsServiceUrl,
  });
  const accountId = process.env.accountId;

  test('should postGraph query successfully', async done => {
    jest.setTimeout(30000);
    try {
      const resp = await client.postGraph({
        accountId: accountId,
        body: `query { findingCount: occurrenceCount(kind: "FINDING") }`,
        contentType: 'application/graphql',
      });
      expect(resp.status).toBe(200);
      expect(resp.result.data.findingCount).toBeGreaterThanOrEqual(0);
      done();
    } catch (err) {
      done(err);
    }
  });

  test('should fail to postGraph query with missing parama', async done => {
    jest.setTimeout(30000);
    try {
      await client.postGraph({
        accountId: accountId,
      });
    } catch (err) {
      expect(err.toString()).toEqual('Error: Missing required parameters: body');
      done();
    }
  });
});

describe('FindingsApiV1 listProviders', () => {
  const client = new FindingsApiV1({
    authenticator: new IamAuthenticator({ apikey: process.env.apikey, url: process.env.iamUrl }),
    serviceUrl: process.env.findingsServiceUrl,
  });
  const accountId = process.env.accountId;

  test('should listProviders query successfully', async done => {
    jest.setTimeout(10000);
    try {
      const resp = await client.listProviders({
        accountId: accountId,
      });
      expect(resp.status).toBe(200);
      expect(resp.result.providers.length).toBeGreaterThanOrEqual(0);
      done();
    } catch (err) {
      done(err);
    }
  });

  test('should fail to listProviders query with missing params', async done => {
    jest.setTimeout(10000);
    try {
      await client.listProviders();
    } catch (err) {
      expect(err.toString()).toEqual('Error: Missing required parameters: accountId');
      done();
    }
  });
});

describe('FindingsApiV1 createNote', () => {
  const client = new FindingsApiV1({
    authenticator: new IamAuthenticator({ apikey: process.env.apikey, url: process.env.iamUrl }),
    serviceUrl: process.env.findingsServiceUrl,
  });
  const accountId = process.env.accountId;

  test('should createNote query successfully', async done => {
    jest.setTimeout(10000);
    try {
      const ts = Date.now();
      const resp = await client.createNote({
        accountId: accountId,
        providerId: 'provider_' + ts,
        shortDescription: 'test',
        longDescription: 'long test',
        kind: 'FINDING',
        id: 'create_note_' + ts,
        reportedBy: {
          id: 'reporter_id',
          title: 'title',
          url: 'https://ss.ss',
        },
        finding: {
          severity: 'CRITICAL',
          next_steps: [
            {
              title: 'Fix this.',
            },
            {
              title: 'Fix that.',
            },
          ],
        },
      });
      expect(resp.status).toBe(200);

      const deleteResp = await client.deleteNote({
        accountId: accountId,
        providerId: 'provider_' + ts,
        noteId: 'create_note_' + ts,
      });
      expect(deleteResp.status).toBe(200);

      done();
    } catch (err) {
      done(err);
    }
  });

  test('should fail to createNote query with missing params', async done => {
    jest.setTimeout(10000);
    try {
      await client.createNote({
        accountId: accountId,
      });
    } catch (err) {
      expect(err.toString()).toEqual(
        'Error: Missing required parameters: providerId, shortDescription, longDescription, kind, id, reportedBy'
      );
      done();
    }
  });
});

describe('FindingsApiV1 listNotes', () => {
  const client = new FindingsApiV1({
    authenticator: new IamAuthenticator({ apikey: process.env.apikey, url: process.env.iamUrl }),
    serviceUrl: process.env.findingsServiceUrl,
  });
  const accountId = process.env.accountId;

  test('should listNotes query successfully', async done => {
    jest.setTimeout(30000);
    try {
      const ts = Date.now();
      const createResp = await client.createNote({
        accountId: accountId,
        providerId: 'provider_' + ts,
        shortDescription: 'test',
        longDescription: 'long test',
        kind: 'FINDING',
        id: 'create_note_' + ts,
        reportedBy: {
          id: 'reporter_id',
          title: 'title',
          url: 'https://ss.ss',
        },
        finding: {
          severity: 'CRITICAL',
          next_steps: [
            {
              title: 'Fix this.',
            },
            {
              title: 'Fix that.',
            },
          ],
        },
      });
      expect(createResp.status).toBe(200);

      const resp = await client.listNotes({
        accountId: accountId,
        providerId: 'provider_' + ts,
      });
      expect(resp.status).toBe(200);
      expect(resp.result.notes.length).toBe(1);

      const deleteResp = await client.deleteNote({
        accountId: accountId,
        providerId: 'provider_' + ts,
        noteId: 'create_note_' + ts,
      });
      expect(deleteResp.status).toBe(200);

      done();
    } catch (err) {
      done(err);
    }
  });

  test('should fail to createNote query with missing params', async done => {
    jest.setTimeout(10000);
    try {
      await client.listNotes();
    } catch (err) {
      expect(err.toString()).toEqual('Error: Missing required parameters: accountId, providerId');
      done();
    }
  });
});

describe('FindingsApiV1 getOccurrenceNote', () => {
  const client = new FindingsApiV1({
    authenticator: new IamAuthenticator({ apikey: process.env.apikey, url: process.env.iamUrl }),
    serviceUrl: process.env.findingsServiceUrl,
  });
  const accountId = process.env.accountId;

  test('should getOccurrenceNote query successfully', async done => {
    jest.setTimeout(30000);
    const ts = Date.now();
    try {
      const createResp = await client.createNote({
        accountId: accountId,
        providerId: 'provider_' + ts,
        shortDescription: 'test',
        longDescription: 'long test',
        kind: 'FINDING',
        id: 'create_note_' + ts,
        reportedBy: {
          id: 'reporter_id',
          title: 'title',
          url: 'https://ss.ss',
        },
        finding: {
          severity: 'CRITICAL',
          next_steps: [
            {
              title: 'Fix this.',
            },
            {
              title: 'Fix that.',
            },
          ],
        },
      });
      expect(createResp.status).toBe(200);

      await client.getOccurrenceNote({
        accountId: accountId,
        providerId: 'provider_' + ts,
        occurrenceId: 'mustnotexist',
      });
    } catch (err) {
      expect(err.status).toBe(404);
      const deleteResp = await client.deleteNote({
        accountId: accountId,
        providerId: 'provider_' + ts,
        noteId: 'create_note_' + ts,
      });
      expect(deleteResp.status).toBe(200);
      done();
    }
  });

  test('should fail to getOccurrenceNote query with missing params', async done => {
    jest.setTimeout(10000);
    try {
      await client.getOccurrenceNote();
    } catch (err) {
      expect(err.toString()).toEqual(
        'Error: Missing required parameters: accountId, providerId, occurrenceId'
      );
      done();
    }
  });
});

describe('FindingsApiV1 getNote', () => {
  const client = new FindingsApiV1({
    authenticator: new IamAuthenticator({ apikey: process.env.apikey, url: process.env.iamUrl }),
    serviceUrl: process.env.findingsServiceUrl,
  });
  const accountId = process.env.accountId;

  test('should getNote query successfully', async done => {
    jest.setTimeout(30000);
    try {
      const ts = Date.now();
      const createResp = await client.createNote({
        accountId: accountId,
        providerId: 'provider_' + ts,
        shortDescription: 'test',
        longDescription: 'long test',
        kind: 'FINDING',
        id: 'create_note_' + ts,
        reportedBy: {
          id: 'reporter_id',
          title: 'title',
          url: 'https://ss.ss',
        },
        finding: {
          severity: 'CRITICAL',
          next_steps: [
            {
              title: 'Fix this.',
            },
            {
              title: 'Fix that.',
            },
          ],
        },
      });
      expect(createResp.status).toBe(200);

      const resp = await client.getNote({
        accountId: accountId,
        providerId: 'provider_' + ts,
        noteId: 'create_note_' + ts,
      });
      expect(resp.status).toBe(200);
      expect(resp.result.id).toBe('create_note_' + ts);

      const deleteResp = await client.deleteNote({
        accountId: accountId,
        providerId: 'provider_' + ts,
        noteId: 'create_note_' + ts,
      });
      expect(deleteResp.status).toBe(200);

      done();
    } catch (err) {
      done(err);
    }
  });

  test('should fail to getNote query with missing params', async done => {
    jest.setTimeout(10000);
    try {
      await client.getNote();
    } catch (err) {
      expect(err.toString()).toEqual(
        'Error: Missing required parameters: accountId, providerId, noteId'
      );
      done();
    }
  });
});

describe('FindingsApiV1 updateNote', () => {
  const client = new FindingsApiV1({
    authenticator: new IamAuthenticator({ apikey: process.env.apikey, url: process.env.iamUrl }),
    serviceUrl: process.env.findingsServiceUrl,
  });
  const accountId = process.env.accountId;

  test('should updateNote query successfully', async done => {
    jest.setTimeout(30000);
    try {
      const ts = Date.now();
      const createResp = await client.createNote({
        accountId: accountId,
        providerId: 'provider_' + ts,
        shortDescription: 'test',
        longDescription: 'long test',
        kind: 'FINDING',
        id: 'create_note_' + ts,
        reportedBy: {
          id: 'reporter_id',
          title: 'title',
          url: 'https://ss.ss',
        },
        finding: {
          severity: 'CRITICAL',
          next_steps: [
            {
              title: 'Fix this.',
            },
            {
              title: 'Fix that.',
            },
          ],
        },
      });
      expect(createResp.status).toBe(200);

      const resp = await client.updateNote({
        accountId: accountId,
        providerId: 'provider_' + ts,
        noteId: 'create_note_' + ts,
        shortDescription: 'updated short description',
        longDescription: 'updated long test',
        kind: 'FINDING',
        id: 'create_note_' + ts,
        reportedBy: {
          id: 'reporter_id',
          title: 'title',
          url: 'https://ss.ss',
        },
        finding: {
          severity: 'HIGH',
          next_steps: [
            {
              title: 'Fix this.',
            },
            {
              title: 'Fix that.',
            },
          ],
        },
      });
      expect(resp.status).toBe(200);
      expect(resp.result.finding.severity).toBe('HIGH');
      expect(resp.result.long_description).toBe('updated long test');

      const deleteResp = await client.deleteNote({
        accountId: accountId,
        providerId: 'provider_' + ts,
        noteId: 'create_note_' + ts,
      });
      expect(deleteResp.status).toBe(200);

      done();
    } catch (err) {
      done(err);
    }
  });

  test('should fail to updateNote query with missing params', async done => {
    jest.setTimeout(10000);
    try {
      await client.updateNote();
    } catch (err) {
      expect(err.toString()).toEqual(
        'Error: Missing required parameters: accountId, providerId, noteId, shortDescription, longDescription, kind, id, reportedBy'
      );
      done();
    }
  });
});

describe('FindingsApiV1 deleteNote', () => {
  const client = new FindingsApiV1({
    authenticator: new IamAuthenticator({ apikey: process.env.apikey, url: process.env.iamUrl }),
    serviceUrl: process.env.findingsServiceUrl,
  });
  const accountId = process.env.accountId;

  test('should deleteNote query successfully', async done => {
    jest.setTimeout(30000);
    try {
      const ts = Date.now();
      const createResp = await client.createNote({
        accountId: accountId,
        providerId: 'provider_' + ts,
        shortDescription: 'test',
        longDescription: 'long test',
        kind: 'FINDING',
        id: 'create_note_' + ts,
        reportedBy: {
          id: 'reporter_id',
          title: 'title',
          url: 'https://ss.ss',
        },
        finding: {
          severity: 'CRITICAL',
          next_steps: [
            {
              title: 'Fix this.',
            },
            {
              title: 'Fix that.',
            },
          ],
        },
      });
      expect(createResp.status).toBe(200);

      const deleteResp = await client.deleteNote({
        accountId: accountId,
        providerId: 'provider_' + ts,
        noteId: 'create_note_' + ts,
      });
      expect(deleteResp.status).toBe(200);

      done();
    } catch (err) {
      done(err);
    }
  });

  test('should fail to deleteNote query with missing params', async done => {
    jest.setTimeout(10000);
    try {
      await client.deleteNote();
    } catch (err) {
      expect(err.toString()).toEqual(
        'Error: Missing required parameters: accountId, providerId, noteId'
      );
      done();
    }
  });
});

describe('FindingsApiV1 Occurrence tests', () => {
  const client = new FindingsApiV1({
    authenticator: new IamAuthenticator({ apikey: process.env.apikey, url: process.env.iamUrl }),
    serviceUrl: process.env.findingsServiceUrl,
  });
  const accountId = process.env.accountId;
  const ts = Date.now();

  beforeAll(async () => {
    jest.setTimeout(30000);
    await client.createNote({
      accountId: accountId,
      providerId: 'provider_' + ts,
      shortDescription: 'test',
      longDescription: 'long test',
      kind: 'FINDING',
      id: 'create_note_' + ts,
      reportedBy: {
        id: 'reporter_id',
        title: 'title',
        url: 'https://ss.ss',
      },
      finding: {
        severity: 'CRITICAL',
        next_steps: [
          {
            title: 'Fix this.',
          },
          {
            title: 'Fix that.',
          },
        ],
      },
    });
    console.log('Successfully created note');
  });

  afterAll(async () => {
    jest.setTimeout(30000);
    await client.deleteNote({
      accountId: accountId,
      providerId: 'provider_' + ts,
      noteId: 'create_note_' + ts,
    });
    console.log('Successfully deleted note');
  });

  describe('FindingsApiV1 createOccurrence', () => {
    test('should create FIDNING Occurrence successfully', async done => {
      jest.setTimeout(30000);
      try {
        const resp = await client.createOccurrence({
          accountId: accountId,
          providerId: 'provider_' + ts,
          name: 'occurence1',
          resourceUrl: 'string',
          noteName: `${accountId}/providers/provider_${ts}/notes/create_note_${ts}`,
          kind: 'FINDING',
          id: 'create_occ_' + ts,
          context: {
            resource_name: 'myresource',
          },
          finding: {
            severity: 'LOW',
            certainty: 'LOW',
            next_steps: [
              {
                title: 'next_step_title',
                url: 'https://example.com',
              },
            ],
          },
        });
        expect(resp.status).toBe(200);

        const deleteResp = await client.deleteOccurrence({
          accountId: accountId,
          providerId: 'provider_' + ts,
          occurrenceId: 'create_occ_' + ts,
        });
        expect(deleteResp.status).toBe(200);

        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to createOccurrence query with missing params', async done => {
      jest.setTimeout(10000);
      try {
        await client.createOccurrence();
      } catch (err) {
        expect(err.toString()).toEqual(
          'Error: Missing required parameters: accountId, providerId, noteName, kind, id'
        );
        done();
      }
    });
  });

  describe('FindingsApiV1 listNoteOccurrences', () => {
    test('should create FIDNING Occurrence successfully', async done => {
      jest.setTimeout(30000);
      try {
        const createResp = await client.createOccurrence({
          accountId: accountId,
          providerId: 'provider_' + ts,
          name: 'occurence1',
          resourceUrl: 'string',
          noteName: `${accountId}/providers/provider_${ts}/notes/create_note_${ts}`,
          kind: 'FINDING',
          id: 'create_occ_' + ts,
          context: {
            resource_name: 'myresource',
          },
          finding: {
            severity: 'LOW',
            certainty: 'LOW',
            next_steps: [
              {
                title: 'next_step_title',
                url: 'https://example.com',
              },
            ],
          },
        });
        expect(createResp.status).toBe(200);

        const resp = await client.listNoteOccurrences({
          accountId: accountId,
          providerId: 'provider_' + ts,
          noteId: 'create_note_' + ts,
        });

        expect(resp.status).toBe(200);
        expect(resp.result.occurrences.length).toBe(1);

        const deleteResp = await client.deleteOccurrence({
          accountId: accountId,
          providerId: 'provider_' + ts,
          occurrenceId: 'create_occ_' + ts,
        });
        expect(deleteResp.status).toBe(200);

        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to listNoteOccurrences query with missing params', async done => {
      jest.setTimeout(10000);
      try {
        await client.listNoteOccurrences();
      } catch (err) {
        expect(err.toString()).toEqual(
          'Error: Missing required parameters: accountId, providerId, noteId'
        );
        done();
      }
    });
  });

  describe('FindingsApiV1 getOccurrence', () => {
    test('should FIDNING getOccurrence successfully', async done => {
      jest.setTimeout(30000);
      try {
        const createResp = await client.createOccurrence({
          accountId: accountId,
          providerId: 'provider_' + ts,
          name: 'occurence1',
          resourceUrl: 'string',
          noteName: `${accountId}/providers/provider_${ts}/notes/create_note_${ts}`,
          kind: 'FINDING',
          id: 'create_occ_' + ts,
          context: {
            resource_name: 'myresource',
          },
          finding: {
            severity: 'LOW',
            certainty: 'LOW',
            next_steps: [
              {
                title: 'next_step_title',
                url: 'https://example.com',
              },
            ],
          },
        });
        expect(createResp.status).toBe(200);

        const resp = await client.getOccurrence({
          accountId: accountId,
          providerId: 'provider_' + ts,
          occurrenceId: 'create_occ_' + ts,
        });
        expect(resp.status).toBe(200);
        expect(resp.result.id).toBe('create_occ_' + ts);

        const deleteResp = await client.deleteOccurrence({
          accountId: accountId,
          providerId: 'provider_' + ts,
          occurrenceId: 'create_occ_' + ts,
        });
        expect(deleteResp.status).toBe(200);

        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to getOccurrence query with missing params', async done => {
      jest.setTimeout(10000);
      try {
        await client.getOccurrence();
      } catch (err) {
        expect(err.toString()).toEqual(
          'Error: Missing required parameters: accountId, providerId, occurrenceId'
        );
        done();
      }
    });
  });

  describe('FindingsApiV1 listOccurrences', () => {
    test('should listOccurrences successfully', async done => {
      jest.setTimeout(30000);
      try {
        const createResp = await client.createOccurrence({
          accountId: accountId,
          providerId: 'provider_' + ts,
          name: 'occurence1',
          resourceUrl: 'string',
          noteName: `${accountId}/providers/provider_${ts}/notes/create_note_${ts}`,
          kind: 'FINDING',
          id: 'create_occ_' + ts,
          context: {
            resource_name: 'myresource',
          },
          finding: {
            severity: 'LOW',
            certainty: 'LOW',
            next_steps: [
              {
                title: 'next_step_title',
                url: 'https://example.com',
              },
            ],
          },
        });
        expect(createResp.status).toBe(200);

        const resp = await client.listOccurrences({
          accountId: accountId,
          providerId: 'provider_' + ts,
        });
        expect(resp.status).toBe(200);
        expect(resp.result.occurrences.length).toBe(1);

        const deleteResp = await client.deleteOccurrence({
          accountId: accountId,
          providerId: 'provider_' + ts,
          occurrenceId: 'create_occ_' + ts,
        });
        expect(deleteResp.status).toBe(200);

        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to listOccurrences query with missing params', async done => {
      jest.setTimeout(10000);
      try {
        await client.listOccurrences();
      } catch (err) {
        expect(err.toString()).toEqual('Error: Missing required parameters: accountId, providerId');
        done();
      }
    });
  });

  describe('FindingsApiV1 updateOccurrence', () => {
    test('should updateOccurrence successfully', async done => {
      jest.setTimeout(30000);
      try {
        const createResp = await client.createOccurrence({
          accountId: accountId,
          providerId: 'provider_' + ts,
          name: 'occurence1',
          resourceUrl: 'string',
          noteName: `${accountId}/providers/provider_${ts}/notes/create_note_${ts}`,
          kind: 'FINDING',
          id: 'create_occ_' + ts,
          context: {
            resource_name: 'myresource',
          },
          finding: {
            severity: 'LOW',
            certainty: 'LOW',
            next_steps: [
              {
                title: 'next_step_title',
                url: 'https://example.com',
              },
            ],
          },
        });
        expect(createResp.status).toBe(200);

        const resp = await client.updateOccurrence({
          accountId: accountId,
          providerId: 'provider_' + ts,
          occurrenceId: 'create_occ_' + ts,
          name: 'occurence1',
          resourceUrl: 'string',
          noteName: `${accountId}/providers/provider_${ts}/notes/create_note_${ts}`,
          kind: 'FINDING',
          id: 'create_occ_' + ts,
          context: {
            resource_name: 'myresource',
          },
          finding: {
            severity: 'HIGH',
            certainty: 'HIGH',
            next_steps: [
              {
                title: 'next_step_title',
                url: 'https://example.com',
              },
            ],
          },
        });
        expect(resp.result.finding.certainty).toBe('HIGH');
        expect(resp.result.finding.severity).toBe('HIGH');

        const deleteResp = await client.deleteOccurrence({
          accountId: accountId,
          providerId: 'provider_' + ts,
          occurrenceId: 'create_occ_' + ts,
        });
        expect(deleteResp.status).toBe(200);

        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to updateOccurrence query with missing params', async done => {
      jest.setTimeout(10000);
      try {
        await client.updateOccurrence();
      } catch (err) {
        expect(err.toString()).toEqual(
          'Error: Missing required parameters: accountId, providerId, occurrenceId, noteName, kind, id'
        );
        done();
      }
    });
  });

  describe('FindingsApiV1 deleteOccurrence', () => {
    test('should deleteOccurrence successfully', async done => {
      jest.setTimeout(30000);
      try {
        const createResp = await client.createOccurrence({
          accountId: accountId,
          providerId: 'provider_' + ts,
          name: 'occurence1',
          resourceUrl: 'string',
          noteName: `${accountId}/providers/provider_${ts}/notes/create_note_${ts}`,
          kind: 'FINDING',
          id: 'create_occ_' + ts,
          context: {
            resource_name: 'myresource',
          },
          finding: {
            severity: 'LOW',
            certainty: 'LOW',
            next_steps: [
              {
                title: 'next_step_title',
                url: 'https://example.com',
              },
            ],
          },
        });
        expect(createResp.status).toBe(200);

        const resp = await client.deleteOccurrence({
          accountId: accountId,
          providerId: 'provider_' + ts,
          occurrenceId: 'create_occ_' + ts,
        });
        expect(resp.status).toBe(200);

        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to deleteOccurrence query with missing params', async done => {
      jest.setTimeout(10000);
      try {
        await client.deleteOccurrence();
      } catch (err) {
        expect(err.toString()).toEqual(
          'Error: Missing required parameters: accountId, providerId, occurrenceId'
        );
        done();
      }
    });
  });
});
