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
const FindingsV1 = require('../../dist/findings/v1');
const authHelper = require('../resources/auth-helper.js');

const accountId = process.env.ACCOUNT_ID;
const providerId = process.env.PROVIDER_ID || 'sdk-it';
const testString = 'testString';
const identifier = process.env.TRAVIS_JOB_ID || Date.now();

// testcase timeout value (200s).
const timeout = 200000;

// Location of our config file.
const configFile = 'findings_v1.env';

const describe = authHelper.prepareTests(configFile);

describe('FindingsV1_integration', () => {
  const findingsService = FindingsV1.newInstance({});

  expect(findingsService).not.toBeNull();

  const config = readExternalSources(FindingsV1.DEFAULT_SERVICE_NAME);
  expect(config).not.toBeNull();

  jest.setTimeout(timeout);

  afterAll(async () => {
    console.log(`cleaning up account: ${accountId} with provider ${providerId}\n`);
    const listNotesParams = {
      accountId,
      providerId,
    };

    const listNotesRes = await findingsService.listNotes(listNotesParams);
    listNotesRes.result.notes.forEach(async note => {
      const deleteNoteParams = {
        accountId,
        providerId,
        noteId: note.id,
      };
      console.log(`deleting ${note.id}`);
      await findingsService.deleteNote(deleteNoteParams);
    });

    const listOccurrencesParams = {
      accountId,
      providerId,
    };

    const listOccurrencesRes = await findingsService.listOccurrences(listOccurrencesParams);
    listOccurrencesRes.result.occurrences.forEach(async occurrence => {
      const deleteOccurrenceParams = {
        accountId,
        providerId,
        occurrenceId: occurrence.id,
      };
      console.log(`deleting ${occurrence.id}`);
      await findingsService.deleteOccurrence(deleteOccurrenceParams);
    });
    console.log(`cleanup was successful\n`);

    setTimeout(() => {
      console.log(`waiting`);
    }, timeout);

    const listProvidersParams = {
      accountId,
    };
    const listProvidersRes = await findingsService.listProviders(listProvidersParams);
    listProvidersRes.result.providers.forEach(async provider => {
      if (provider.id === providerId) {
        console.log(`
        seems like account has some resources left even after a successful cleanup, please consider manual cleanup for account: ${accountId} and provider: ${providerId}\n
        `);
      }
    });
  });

  test('postGraph()', async () => {
    const params = {
      accountId,
      body: '{notes{id}}',
      contentType: 'application/graphql',
    };
    console.log(`querying postGraph ${params.body}`);
    const res = await findingsService.postGraph(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('createNoteFinding()', async () => {
    // Request models needed by this operation.

    // Reporter
    const reporterModel = {
      id: testString,
      title: testString,
      url: testString,
    };

    // ApiNoteRelatedUrl
    const apiNoteRelatedUrlModel = {
      label: testString,
      url: testString,
    };

    // RemediationStep
    const remediationStepModel = {
      title: testString,
      url: testString,
    };

    // FindingType
    const findingTypeModel = {
      severity: 'LOW',
      next_steps: [remediationStepModel],
    };

    const params = {
      accountId,
      providerId,
      shortDescription: testString,
      longDescription: testString,
      kind: 'FINDING',
      id: `finding-note-${identifier}`,
      reportedBy: reporterModel,
      relatedUrl: [apiNoteRelatedUrlModel],
      expirationTime: '2019-01-01T12:00:00.000Z',
      shared: true,
      finding: findingTypeModel,
    };
    console.log(`creating ${params.id}`);
    const res = await findingsService.createNote(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('createNoteKpi()', async () => {
    // Request models needed by this operation.

    // Reporter
    const reporterModel = {
      id: testString,
      title: testString,
      url: testString,
    };

    // KpiType
    const kpiTypeModel = {
      aggregation_type: 'SUM',
    };

    const params = {
      accountId,
      providerId,
      shortDescription: testString,
      longDescription: testString,
      kind: 'KPI',
      id: `kpi-note-${identifier}`,
      reportedBy: reporterModel,
      expirationTime: '2019-01-01T12:00:00.000Z',
      shared: true,
      kpi: kpiTypeModel,
    };
    console.log(`creating ${params.id}`);
    const res = await findingsService.createNote(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('createNoteCard()', async () => {
    // Request models needed by this operation.

    // Reporter
    const reporterModel = {
      id: testString,
      title: testString,
      url: testString,
    };

    // ValueTypeFindingCountValueType
    const valueTypeModel = {
      kind: 'FINDING_COUNT',
      finding_note_names: [testString],
      text: testString,
    };

    // CardElementTimeSeriesCardElement
    const cardElementModel = {
      text: testString,
      default_interval: testString,
      kind: 'TIME_SERIES',
      default_time_range: '1d',
      value_types: [valueTypeModel],
    };

    // Card
    const cardModel = {
      section: testString,
      title: testString,
      subtitle: testString,
      finding_note_names: [testString],
      requires_configuration: true,
      badge_text: testString,
      badge_image: testString,
      elements: [cardElementModel],
    };

    const params = {
      accountId,
      providerId,
      shortDescription: testString,
      longDescription: testString,
      kind: 'CARD',
      id: `card-note-${identifier}`,
      reportedBy: reporterModel,
      expirationTime: '2019-01-01T12:00:00.000Z',
      shared: true,
      card: cardModel,
    };
    console.log(`creating ${params.id}`);
    const res = await findingsService.createNote(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('createNoteSection()', async () => {
    // Request models needed by this operation.

    // Reporter
    const reporterModel = {
      id: testString,
      title: testString,
      url: testString,
    };

    // Section
    const sectionModel = {
      title: testString,
      image: testString,
    };

    const params = {
      accountId,
      providerId,
      shortDescription: testString,
      longDescription: testString,
      kind: 'SECTION',
      id: `section-note-${identifier}`,
      reportedBy: reporterModel,
      expirationTime: '2019-01-01T12:00:00.000Z',
      shared: true,
      section: sectionModel,
    };
    console.log(`creating ${params.id}`);
    const res = await findingsService.createNote(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('listNotes()', async () => {
    const params = {
      accountId,
      providerId,
    };
    console.log(`listing notes`);
    const res = await findingsService.listNotes(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('getNote()', async () => {
    const params = {
      accountId,
      providerId,
      noteId: `section-note-${identifier}`,
    };
    console.log(`getting ${params.noteId}`);
    const res = await findingsService.getNote(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('updateNoteFinding()', async () => {
    // Request models needed by this operation.

    // Reporter
    const reporterModel = {
      id: testString,
      title: testString,
      url: testString,
    };

    // ApiNoteRelatedUrl
    const apiNoteRelatedUrlModel = {
      label: testString,
      url: testString,
    };

    // RemediationStep
    const remediationStepModel = {
      title: testString,
      url: testString,
    };

    // FindingType
    const findingTypeModel = {
      severity: 'LOW',
      next_steps: [remediationStepModel],
    };

    const params = {
      accountId,
      providerId,
      noteId: `finding-note-${identifier}`,
      shortDescription: testString,
      longDescription: testString,
      kind: 'FINDING',
      id: `finding-note-${identifier}`,
      reportedBy: reporterModel,
      relatedUrl: [apiNoteRelatedUrlModel],
      expirationTime: '2019-01-01T12:00:00.000Z',
      shared: true,
      finding: findingTypeModel,
    };
    console.log(`updating ${params.id}`);
    const res = await findingsService.updateNote(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('updateNoteKpi()', async () => {
    // Request models needed by this operation.

    // Reporter
    const reporterModel = {
      id: testString,
      title: testString,
      url: testString,
    };

    // KpiType
    const kpiTypeModel = {
      aggregation_type: 'SUM',
    };

    const params = {
      accountId,
      providerId,
      noteId: `kpi-note-${identifier}`,
      shortDescription: testString,
      longDescription: testString,
      kind: 'KPI',
      id: `kpi-note-${identifier}`,
      reportedBy: reporterModel,
      expirationTime: '2019-01-01T12:00:00.000Z',
      shared: true,
      kpi: kpiTypeModel,
    };
    console.log(`updating ${params.id}`);
    const res = await findingsService.updateNote(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('updateNoteCard()', async () => {
    // Request models needed by this operation.

    // Reporter
    const reporterModel = {
      id: testString,
      title: testString,
      url: testString,
    };

    // ValueTypeFindingCountValueType
    const valueTypeModel = {
      kind: 'FINDING_COUNT',
      finding_note_names: [testString],
      text: testString,
    };

    // CardElementTimeSeriesCardElement
    const cardElementModel = {
      text: testString,
      default_interval: testString,
      kind: 'TIME_SERIES',
      default_time_range: '1d',
      value_types: [valueTypeModel],
    };

    // Card
    const cardModel = {
      section: testString,
      title: testString,
      subtitle: testString,
      finding_note_names: [testString],
      requires_configuration: true,
      badge_text: testString,
      badge_image: testString,
      elements: [cardElementModel],
    };

    const params = {
      accountId,
      providerId,
      noteId: `card-note-${identifier}`,
      shortDescription: testString,
      longDescription: testString,
      kind: 'CARD',
      id: `card-note-${identifier}`,
      reportedBy: reporterModel,
      expirationTime: '2019-01-01T12:00:00.000Z',
      shared: true,
      card: cardModel,
    };
    console.log(`updating ${params.id}`);
    const res = await findingsService.updateNote(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('updateNoteSection()', async () => {
    // Request models needed by this operation.

    // Reporter
    const reporterModel = {
      id: testString,
      title: testString,
      url: testString,
    };

    // Section
    const sectionModel = {
      title: testString,
      image: testString,
    };

    const params = {
      accountId,
      providerId,
      noteId: `section-note-${identifier}`,
      shortDescription: testString,
      longDescription: testString,
      kind: 'SECTION',
      id: `section-note-${identifier}`,
      reportedBy: reporterModel,
      expirationTime: '2019-01-01T12:00:00.000Z',
      shared: true,
      section: sectionModel,
    };
    console.log(`updating ${params.id}`);
    const res = await findingsService.updateNote(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('createOccurrenceFinding()', async () => {
    // Request models needed by this operation.

    // Context
    const contextModel = {
      region: testString,
      resource_crn: testString,
      resource_id: testString,
      resource_name: testString,
      resource_type: testString,
      service_crn: testString,
      service_name: testString,
      environment_name: testString,
      component_name: testString,
      toolchain_id: testString,
    };

    // RemediationStep
    const remediationStepModel = {
      title: testString,
      url: testString,
    };

    // SocketAddress
    const socketAddressModel = {
      address: testString,
      port: 38,
    };

    // NetworkConnection
    const networkConnectionModel = {
      direction: testString,
      protocol: testString,
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

    const params = {
      accountId,
      providerId,
      noteName: `${accountId}/providers/${providerId}/notes/finding-note-${identifier}`,
      kind: 'FINDING',
      id: `finding-occurrence-${identifier}`,
      resourceUrl: testString,
      remediation: testString,
      context: contextModel,
      finding: findingModel,
      replaceIfExists: true,
    };
    console.log(`creating ${params.id}`);
    const res = await findingsService.createOccurrence(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('createOccurrenceKpi()', async () => {
    // Request models needed by this operation.

    // Kpi
    const kpiModel = {
      value: 72.5,
      total: 72.5,
    };

    const params = {
      accountId,
      providerId,
      noteName: `${accountId}/providers/${providerId}/notes/kpi-note-${identifier}`,
      kind: 'KPI',
      id: `kpi-occurrence-${identifier}`,
      resourceUrl: testString,
      remediation: testString,
      kpi: kpiModel,
      replaceIfExists: true,
    };
    console.log(`creating ${params.id}`);
    const res = await findingsService.createOccurrence(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('getOccurrenceNote()', async () => {
    const params = {
      accountId,
      providerId,
      occurrenceId: `finding-occurrence-${identifier}`,
    };
    console.log(`getting occurrence note ${params.occurrenceId}`);
    const res = await findingsService.getOccurrenceNote(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('listOccurrences()', async () => {
    const params = {
      accountId,
      providerId,
    };
    console.log(`listing occurrences`);
    const res = await findingsService.listOccurrences(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('listNoteOccurrences()', async () => {
    const params = {
      accountId,
      providerId,
      noteId: `finding-note-${identifier}`,
    };
    console.log(`listing note occurrences ${params.noteId}`);
    const res = await findingsService.listNoteOccurrences(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('getOccurrence()', async () => {
    const params = {
      accountId,
      providerId,
      occurrenceId: `finding-occurrence-${identifier}`,
    };
    console.log(`getting occurrence ${params.occurrenceId}`);
    const res = await findingsService.getOccurrence(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('updateOccurrenceFinding()', async () => {
    // Request models needed by this operation.

    // Context
    const contextModel = {
      region: testString,
      resource_crn: testString,
      resource_id: testString,
      resource_name: testString,
      resource_type: testString,
      service_crn: testString,
      service_name: testString,
      environment_name: testString,
      component_name: testString,
      toolchain_id: testString,
    };

    // RemediationStep
    const remediationStepModel = {
      title: testString,
      url: testString,
    };

    // SocketAddress
    const socketAddressModel = {
      address: testString,
      port: 38,
    };

    // NetworkConnection
    const networkConnectionModel = {
      direction: testString,
      protocol: testString,
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

    const params = {
      accountId,
      providerId,
      occurrenceId: `finding-occurrence-${identifier}`,
      noteName: `${accountId}/providers/${providerId}/notes/finding-note-${identifier}`,
      kind: 'FINDING',
      id: `finding-occurrence-${identifier}`,
      resourceUrl: testString,
      remediation: testString,
      context: contextModel,
      finding: findingModel,
    };
    console.log(`updating ${params.id}`);
    const res = await findingsService.updateOccurrence(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('updateOccurrenceKpi()', async () => {
    // Request models needed by this operation.

    // Kpi
    const kpiModel = {
      value: 72.5,
      total: 72.5,
    };

    const params = {
      accountId,
      providerId,
      occurrenceId: `kpi-occurrence-${identifier}`,
      noteName: `${accountId}/providers/${providerId}/notes/kpi-note-${identifier}`,
      kind: 'KPI',
      id: `kpi-occurrence-${identifier}`,
      resourceUrl: testString,
      remediation: testString,
      kpi: kpiModel,
    };
    console.log(`updating ${params.id}`);
    const res = await findingsService.updateOccurrence(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('listProviders()', async () => {
    const params = {
      accountId,
    };
    console.log(`listing providers`);
    const res = await findingsService.listProviders(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('deleteOccurrence()', async () => {
    const params = {
      accountId,
      providerId,
      occurrenceId: `kpi-occurrence-${identifier}`,
    };
    console.log(`deletin ${params.occurrenceId}`);
    const res = await findingsService.deleteOccurrence(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('deleteNote()', async () => {
    const params = {
      accountId,
      providerId,
      noteId: `section-note-${identifier}`,
    };
    console.log(`deletin ${params.noteId}`);
    const res = await findingsService.deleteNote(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
});
