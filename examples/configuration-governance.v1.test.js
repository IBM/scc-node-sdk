/**
 * @jest-environment node
 */
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

/* eslint-disable no-console */

const ConfigurationGovernanceV1 = require('../dist/configuration-governance/v1');
// eslint-disable-next-line node/no-unpublished-require
const authHelper = require('../test/resources/auth-helper.js');
// You can use the readExternalSources method to access additional configuration values
// const { readExternalSources } = require('ibm-cloud-sdk-core');

//
// This file provides an example of how to use the Configuration Governance service.
//
// The following configuration properties are assumed to be defined:
// CONFIGURATION_GOVERNANCE_URL=<service base url>
// CONFIGURATION_GOVERNANCE_AUTH_TYPE=iam
// CONFIGURATION_GOVERNANCE_APIKEY=<IAM apikey>
// CONFIGURATION_GOVERNANCE_AUTH_URL=<IAM token service base URL - omit this if using the production environment>
//
// These configuration properties can be exported as environment variables, or stored
// in a configuration file and then:
// export IBM_CREDENTIALS_FILE=<name of configuration file>
//
const configFile = 'configuration_governance_v1.env';

const describe = authHelper.prepareTests(configFile);

// Save original console.log
const originalLog = console.log;

// Mocks for console.log and console.warn
const consoleLogMock = jest.spyOn(console, 'log');
const consoleWarnMock = jest.spyOn(console, 'warn');

describe('ConfigurationGovernanceV1', () => {
  // begin-common

  const configurationGovernanceService = ConfigurationGovernanceV1.newInstance({});

  // end-common

  // To access additional configuration values, uncomment this line and extract the values from config
  // const config = readExternalSources(ConfigurationGovernanceV1.DEFAULT_SERVICE_NAME);

  // Globlal variables to hold link values
  let ruleAttachmentIdLink;
  let ruleIdLink;

  test('createRules request example', done => {
    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      const responseBody = JSON.parse(output);
      ruleIdLink = responseBody.rules[0].rule.rule_id;
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('createRules() result:');
    // begin-create_rules

    const params = {
      rules: [
        {
          request_id: '3cebc877-58e7-44a5-a292-32114fa73558',
          rule: {
            account_id: '531fc3e28bfc43c5a2cea07786d93f5c',
            name: 'Disable public access',
            description: 'Ensure that public access to account resources is disabled.',
            labels: ['Access', 'IAM'],
            target: { service_name: 'iam-groups', resource_kind: 'service' },
            required_config: {
              description: 'Public access check',
              and: [{ property: 'public_access_enabled', operator: 'is_false' }],
            },
            enforcement_actions: [{ action: 'disallow' }, { action: 'audit_log' }],
          },
        },
      ],
    };

    configurationGovernanceService
      .createRules(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err);
      });

    // end-create_rules
  });
  test('createRuleAttachments request example', done => {
    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      const responseBody = JSON.parse(output);
      ruleAttachmentIdLink = responseBody.attachments[0].attachment_id;
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('createRuleAttachments() result:');
    // begin-create_rule_attachments

    const params = {
      ruleId: ruleIdLink,
      attachments: [
        {
          attachment_id: 'attachment-4301178a-8028-4220-9cb6-dfb86f09da99',
          account_id: '531fc3e28bfc43c5a2cea07786d93f5c',
          rule_id: 'rule-702d1db7-ca4a-414b-8464-2b517a065c14',
          included_scope: {
            note: 'My enterprise',
            scope_id: '282cf433ac91493ba860480d92519990',
            scope_type: 'enterprise',
          },
          excluded_scopes: [
            {
              note: 'Development account',
              scope_id: '0142f84c2d7e4987b63fe8f98543d59f',
              scope_type: 'enterprise.account',
            },
          ],
        },
      ],
    };

    configurationGovernanceService
      .createRuleAttachments(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err);
      });

    // end-create_rule_attachments
  });
  test('listRules request example', done => {
    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('listRules() result:');
    // begin-list_rules

    const params = {
      accountId: '531fc3e28bfc43c5a2cea07786d93f5c',
      attached: true,
      labels: 'SOC2,ITCS300',
      scopes: 'scope_id',
    };

    configurationGovernanceService
      .listRules(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err);
      });

    // end-list_rules
  });
  test('getRule request example', done => {
    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('getRule() result:');
    // begin-get_rule

    const params = {
      ruleId: ruleIdLink,
    };

    configurationGovernanceService
      .getRule(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err);
      });

    // end-get_rule
  });
  test('updateRule request example', done => {
    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('updateRule() result:');
    // begin-update_rule

    const params = {
      ruleId: ruleIdLink,
      ifMatch: 'testString',
      name: 'Disable public access',
      description: 'Ensure that public access to account resources is disabled.',
      target: {
        'service_name': 'iam-groups',
        'resource_kind': 'service',
        'additional_target_attributes': [],
      },
      requiredConfig: { property: 'public_access_enabled', operator: 'is_false' },
      enforcementActions: [{ action: 'audit_log' }, { action: 'disallow' }],
      accountId: '531fc3e28bfc43c5a2cea07786d93f5c',
      ruleType: 'user_defined',
      labels: ['SOC2', 'ITCS300'],
    };

    configurationGovernanceService
      .updateRule(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err);
      });

    // end-update_rule
  });
  test('listRuleAttachments request example', done => {
    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('listRuleAttachments() result:');
    // begin-list_rule_attachments

    const params = {
      ruleId: ruleIdLink,
    };

    configurationGovernanceService
      .listRuleAttachments(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err);
      });

    // end-list_rule_attachments
  });
  test('getRuleAttachment request example', done => {
    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('getRuleAttachment() result:');
    // begin-get_rule_attachment

    const params = {
      ruleId: ruleIdLink,
      attachmentId: ruleAttachmentIdLink,
    };

    configurationGovernanceService
      .getRuleAttachment(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err);
      });

    // end-get_rule_attachment
  });
  test('updateRuleAttachment request example', done => {
    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('updateRuleAttachment() result:');
    // begin-update_rule_attachment

    const params = {
      ruleId: ruleIdLink,
      attachmentId: ruleAttachmentIdLink,
      ifMatch: 'testString',
      accountId: '531fc3e28bfc43c5a2cea07786d93f5c',
      includedScope: {
        note: 'My enterprise',
        scope_id: '282cf433ac91493ba860480d92519990',
        scope_type: 'enterprise',
      },
      excludedScopes: [
        {
          note: 'Development account',
          scope_id: '0142f84c2d7e4987b63fe8f98543d59f',
          scope_type: 'enterprise.account',
        },
      ],
    };

    configurationGovernanceService
      .updateRuleAttachment(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err);
      });

    // end-update_rule_attachment
  });
  test('deleteRuleAttachment request example', done => {
    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-delete_rule_attachment

    const params = {
      ruleId: ruleIdLink,
      attachmentId: ruleAttachmentIdLink,
    };

    configurationGovernanceService
      .deleteRuleAttachment(params)
      .then(() => {
        done();
      })
      .catch(err => {
        console.warn(err);
      });

    // end-delete_rule_attachment
  });
  test('deleteRule request example', done => {
    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-delete_rule

    const params = {
      ruleId: ruleIdLink,
    };

    configurationGovernanceService
      .deleteRule(params)
      .then(() => {
        done();
      })
      .catch(err => {
        console.warn(err);
      });

    // end-delete_rule
  });
});
