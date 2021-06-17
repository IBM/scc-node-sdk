/* eslint-disable no-console */
/**
 * (C) Copyright IBM Corp. 2021.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const {
  readExternalSources
} = require('ibm-cloud-sdk-core');
const ConfigurationGovernanceV1 = require('../../dist/configuration-governance/v1');
const authHelper = require('../resources/auth-helper.js');

const accountID = process.env.ACCOUNT_ID;
const ruleLabel = process.env.RULE_LABEL || 'sdk-it';
const testString = 'testString';
const resourceGroupID = process.env.RESOURCE_GROUP_ID;
const identifier = `js-${Date.now().toString().substring(0,10)}`;

var ruleETag = '';
var ruleAttachmentETag = '';

// testcase timeout value (200s).
const timeout = 200000;

// Location of our config file.
const configFile = 'configuration_governance_v1.env';

const describe = authHelper.prepareTests(configFile);

describe('ConfigurationGovernanceV1_integration', () => {
  const configurationGovernanceService = ConfigurationGovernanceV1.newInstance({});

  expect(configurationGovernanceService).not.toBeNull();

  const config = readExternalSources(ConfigurationGovernanceV1.DEFAULT_SERVICE_NAME);
  expect(config).not.toBeNull();

  jest.setTimeout(timeout);

  afterAll(async () => {
    console.log(`cleaning up account: ${accountId} with rules labelled ${ruleLabel}\n`);
    const listRulesOpts = {
      accountID,
      labels: `${ruleLabel}-${identifier}`
    };

    const listRulesRes = await configurationGovernanceService.listRules(listRulesOpts);
    listRulesRes.result.rules.forEach(async rule => {
      const deleteRuleOpts = {
        ruleId: rule.ruleId
      };
      await configurationGovernanceService.deleteRule(deleteRuleOpts);
    });

    console.log(`cleanup was successful\n`);
  });

  // Globlal variables to hold link values
  let ruleAttachmentIdLink;
  let ruleIdLink;

  test('createRules()', async () => {
    // Request models needed by this operation.

    // TargetResourceAdditionalTargetAttributesItem
    const targetResourceAdditionalTargetAttributesItemModel = {
      name: 'resource_id',
      value: '81f3db5e-f9db-4c46-9de3-a4a76e66adbf',
      operator: 'string_equals',
    };

    // TargetResource
    const targetResourceModel = {
      service_name: 'cloud-object-storage',
      resource_kind: 'bucket',
      additional_target_attributes: [targetResourceAdditionalTargetAttributesItemModel],
    };

    // RuleRequiredConfigSingleProperty
    const ruleRequiredConfigModel = {
      description: testString,
      property: 'location',
      operator: 'string_equals',
      value: 'us-south',
    };

    // EnforcementAction
    const enforcementActionModel = {
      action: 'disallow',
    };

    // RuleRequest
    const ruleRequestModel = {
      account_id: accountID,
      name: 'Disable public access',
      description: 'Ensure that public access to account resources is disabled.',
      rule_type: 'user_defined',
      target: targetResourceModel,
      required_config: ruleRequiredConfigModel,
      enforcement_actions: [enforcementActionModel],
      labels: [`${ruleLabel}-${identifier}`],
    };

    // CreateRuleRequest
    const createRuleRequestModel = {
      request_id: '3cebc877-58e7-44a5-a292-32114fa73558',
      rule: ruleRequestModel,
    };

    const params = {
      rules: [createRuleRequestModel],
      transactionId: testString,
    };

    const res = await configurationGovernanceService.createRules(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
    ruleIdLink = res.result.rules[0].rule.rule_id;
  });
  test('createRuleAttachments()', async () => {
    // Request models needed by this operation.

    // RuleScope
    const ruleScopeModel = {
      note: 'My account',
      scope_id: accountID,
      scope_type: 'account',
    };

    const excludeScopeModel = {
      note: 'My account resource group',
      scope_id: resourceGroupID,
      scope_type: 'account.resource_group',
    }

    // RuleAttachmentRequest
    const ruleAttachmentRequestModel = {
      account_id: accountID,
      included_scope: ruleScopeModel,
      excluded_scopes: [excludeScopeModel],
    };

    const params = {
      ruleId: ruleIdLink,
      attachments: [ruleAttachmentRequestModel],
      transactionId: testString,
    };

    const res = await configurationGovernanceService.createRuleAttachments(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
    ruleAttachmentIdLink = res.result.attachments[0].attachment_id;
  });
  test('listRules()', async () => {
    const params = {
      accountId: accountID,
      transactionId: testString,
      attached: true,
      labels: `${ruleLabel}-${identifier}`,
      scopes: 'scope_id',
      limit: 1000,
      offset: 38,
    };

    const res = await configurationGovernanceService.listRules(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('getRule()', async () => {
    const params = {
      ruleId: ruleIdLink,
      transactionId: testString,
    };

    const res = await configurationGovernanceService.getRule(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();

    ruleETag = res.headers.etag;
  });
  test('updateRule()', async () => {
    // Request models needed by this operation.

    // TargetResource
    const targetResourceModel = {
      service_name: 'cloud-object-storage',
      resource_kind: 'bucket',
    };

    // RuleRequiredConfigSingleProperty
    const ruleRequiredConfigModel = {
      description: testString,
      property: 'location',
      operator: 'string_equals',
      value: 'eu-gb',
    };

    // EnforcementAction
    const enforcementActionModel = {
      action: 'audit_log',
    };

    const params = {
      ruleId: ruleIdLink,
      ifMatch: ruleETag,
      name: 'Disable public access',
      description: 'Ensure that public access to account resources is disabled.',
      target: targetResourceModel,
      requiredConfig: ruleRequiredConfigModel,
      enforcementActions: [enforcementActionModel],
      accountId: accountID,
      ruleType: 'user_defined',
      labels: [`${ruleLabel}-${identifier}`],
      transactionId: testString,
    };

    const res = await configurationGovernanceService.updateRule(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('listRuleAttachments()', async () => {
    const params = {
      ruleId: ruleIdLink,
      transactionId: testString,
      limit: 1000,
      offset: 38,
    };

    const res = await configurationGovernanceService.listRuleAttachments(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('getRuleAttachment()', async () => {
    const params = {
      ruleId: ruleIdLink,
      attachmentId: ruleAttachmentIdLink,
      transactionId: testString,
    };

    const res = await configurationGovernanceService.getRuleAttachment(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();

    ruleAttachmentETag = res.headers.etag;
  });
  test('updateRuleAttachment()', async () => {
    // Request models needed by this operation.

    // RuleScope
    const ruleScopeModel = {
      note: 'My account',
      scope_id: accountID,
      scope_type: 'account',
    };

    const excludedScopeModel = {
      note: 'My account resource group',
      scope_id: resourceGroupID,
      scope_type: 'account.resource_group',
    }

    const params = {
      ruleId: ruleIdLink,
      attachmentId: ruleAttachmentIdLink,
      ifMatch: ruleAttachmentETag,
      accountId: accountID,
      includedScope: ruleScopeModel,
      excludedScopes: [excludedScopeModel],
      transactionId: testString,
    };

    const res = await configurationGovernanceService.updateRuleAttachment(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('deleteRuleAttachment()', async () => {
    const params = {
      ruleId: ruleIdLink,
      attachmentId: ruleAttachmentIdLink,
      transactionId: testString,
    };

    const res = await configurationGovernanceService.deleteRuleAttachment(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('deleteRule()', async () => {
    const params = {
      ruleId: ruleIdLink,
      transactionId: testString,
    };

    const res = await configurationGovernanceService.deleteRule(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
});