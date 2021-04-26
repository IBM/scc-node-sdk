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
const FindingsV1 = require('../../dist/findings/v1');
const { readExternalSources } = require('ibm-cloud-sdk-core');
const authHelper = require('../resources/auth-helper.js');

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

  test('postGraph()', async () => {
    const params = {
      accountId: 'testString',
      body: 'testString',
      contentType: 'application/json',
      transactionId: 'testString',
    };

    const res = await findingsService.postGraph(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('createNote()', async () => {
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

    const params = {
      accountId: 'testString',
      providerId: 'testString',
      shortDescription: 'testString',
      longDescription: 'testString',
      kind: 'FINDING',
      id: 'testString',
      reportedBy: reporterModel,
      relatedUrl: [apiNoteRelatedUrlModel],
      expirationTime: '2019-01-01T12:00:00.000Z',
      createTime: '2019-01-01T12:00:00.000Z',
      updateTime: '2019-01-01T12:00:00.000Z',
      shared: true,
      finding: findingTypeModel,
      kpi: kpiTypeModel,
      card: cardModel,
      section: sectionModel,
      transactionId: 'testString',
    };

    const res = await findingsService.createNote(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('listNotes()', async () => {
    const params = {
      accountId: 'testString',
      providerId: 'testString',
      transactionId: 'testString',
      pageSize: 2,
      pageToken: 'testString',
    };

    const res = await findingsService.listNotes(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('getNote()', async () => {
    const params = {
      accountId: 'testString',
      providerId: 'testString',
      noteId: 'testString',
      transactionId: 'testString',
    };

    const res = await findingsService.getNote(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('updateNote()', async () => {
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

    const params = {
      accountId: 'testString',
      providerId: 'testString',
      noteId: 'testString',
      shortDescription: 'testString',
      longDescription: 'testString',
      kind: 'FINDING',
      id: 'testString',
      reportedBy: reporterModel,
      relatedUrl: [apiNoteRelatedUrlModel],
      expirationTime: '2019-01-01T12:00:00.000Z',
      createTime: '2019-01-01T12:00:00.000Z',
      updateTime: '2019-01-01T12:00:00.000Z',
      shared: true,
      finding: findingTypeModel,
      kpi: kpiTypeModel,
      card: cardModel,
      section: sectionModel,
      transactionId: 'testString',
    };

    const res = await findingsService.updateNote(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('getOccurrenceNote()', async () => {
    const params = {
      accountId: 'testString',
      providerId: 'testString',
      occurrenceId: 'testString',
      transactionId: 'testString',
    };

    const res = await findingsService.getOccurrenceNote(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('createOccurrence()', async () => {
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

    const params = {
      accountId: 'testString',
      providerId: 'testString',
      noteName: 'testString',
      kind: 'FINDING',
      id: 'testString',
      resourceUrl: 'testString',
      remediation: 'testString',
      createTime: '2019-01-01T12:00:00.000Z',
      updateTime: '2019-01-01T12:00:00.000Z',
      context: contextModel,
      finding: findingModel,
      kpi: kpiModel,
      referenceData: { foo: 'bar' },
      replaceIfExists: true,
      transactionId: 'testString',
    };

    const res = await findingsService.createOccurrence(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('listOccurrences()', async () => {
    const params = {
      accountId: 'testString',
      providerId: 'testString',
      transactionId: 'testString',
      pageSize: 2,
      pageToken: 'testString',
    };

    const res = await findingsService.listOccurrences(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('listNoteOccurrences()', async () => {
    const params = {
      accountId: 'testString',
      providerId: 'testString',
      noteId: 'testString',
      transactionId: 'testString',
      pageSize: 2,
      pageToken: 'testString',
    };

    const res = await findingsService.listNoteOccurrences(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('getOccurrence()', async () => {
    const params = {
      accountId: 'testString',
      providerId: 'testString',
      occurrenceId: 'testString',
      transactionId: 'testString',
    };

    const res = await findingsService.getOccurrence(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('updateOccurrence()', async () => {
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

    const params = {
      accountId: 'testString',
      providerId: 'testString',
      occurrenceId: 'testString',
      noteName: 'testString',
      kind: 'FINDING',
      id: 'testString',
      resourceUrl: 'testString',
      remediation: 'testString',
      createTime: '2019-01-01T12:00:00.000Z',
      updateTime: '2019-01-01T12:00:00.000Z',
      context: contextModel,
      finding: findingModel,
      kpi: kpiModel,
      referenceData: { foo: 'bar' },
      transactionId: 'testString',
    };

    const res = await findingsService.updateOccurrence(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('listProviders()', async () => {
    const params = {
      accountId: 'testString',
      transactionId: 'testString',
      limit: 2,
      skip: 38,
      startProviderId: 'testString',
      endProviderId: 'testString',
    };

    const res = await findingsService.listProviders(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('deleteOccurrence()', async () => {
    const params = {
      accountId: 'testString',
      providerId: 'testString',
      occurrenceId: 'testString',
      transactionId: 'testString',
    };

    const res = await findingsService.deleteOccurrence(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('deleteNote()', async () => {
    const params = {
      accountId: 'testString',
      providerId: 'testString',
      noteId: 'testString',
      transactionId: 'testString',
    };

    const res = await findingsService.deleteNote(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
});
