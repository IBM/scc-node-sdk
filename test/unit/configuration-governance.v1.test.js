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

// need to import the whole package to mock getAuthenticatorFromEnvironment
const core = require('ibm-cloud-sdk-core');

const { NoAuthAuthenticator, unitTestUtils } = core;

const ConfigurationGovernanceV1 = require('../../dist/configuration-governance/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
} = unitTestUtils;

const service = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://us.compliance.cloud.ibm.com',
};

const configurationGovernanceService = new ConfigurationGovernanceV1(service);

// dont actually create a request
const createRequestMock = jest.spyOn(configurationGovernanceService, 'createRequest');
createRequestMock.mockImplementation(() => Promise.resolve());

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

afterEach(() => {
  createRequestMock.mockClear();
  getAuthenticatorMock.mockClear();
});

describe('ConfigurationGovernanceV1', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = ConfigurationGovernanceV1.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(
        ConfigurationGovernanceV1.DEFAULT_SERVICE_NAME
      );
      expect(testInstance.baseOptions.serviceUrl).toBe(
        ConfigurationGovernanceV1.DEFAULT_SERVICE_URL
      );
      expect(testInstance).toBeInstanceOf(ConfigurationGovernanceV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = ConfigurationGovernanceV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(ConfigurationGovernanceV1);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new ConfigurationGovernanceV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new ConfigurationGovernanceV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(
        ConfigurationGovernanceV1.DEFAULT_SERVICE_URL
      );
    });
  });
  describe('createRules', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // TargetResourceAdditionalTargetAttributesItem
      const targetResourceAdditionalTargetAttributesItemModel = {
        name: 'resource_id',
        value: '81f3db5e-f9db-4c46-9de3-a4a76e66adbf',
        operator: 'string_equals',
      };

      // TargetResource
      const targetResourceModel = {
        service_name: 'iam-groups',
        resource_kind: 'service',
        additional_target_attributes: [targetResourceAdditionalTargetAttributesItemModel],
      };

      // RuleRequiredConfigSingleProperty
      const ruleRequiredConfigModel = {
        description: 'Public access check',
        property: 'public_access_enabled',
        operator: 'is_true',
        value: 'testString',
      };

      // EnforcementAction
      const enforcementActionModel = {
        action: 'disallow',
      };

      // RuleRequest
      const ruleRequestModel = {
        account_id: '531fc3e28bfc43c5a2cea07786d93f5c',
        name: 'Disable public access',
        description: 'Ensure that public access to account resources is disabled.',
        rule_type: 'user_defined',
        target: targetResourceModel,
        required_config: ruleRequiredConfigModel,
        enforcement_actions: [enforcementActionModel],
        labels: ['Access', 'IAM'],
      };

      // CreateRuleRequest
      const createRuleRequestModel = {
        request_id: '3cebc877-58e7-44a5-a292-32114fa73558',
        rule: ruleRequestModel,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createRules
        const rules = [createRuleRequestModel];
        const transactionId = 'testString';
        const params = {
          rules,
          transactionId,
        };

        const createRulesResult = configurationGovernanceService.createRules(params);

        // all methods should return a Promise
        expectToBePromise(createRulesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/config/v1/rules', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(options.body.rules).toEqual(rules);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const rules = [createRuleRequestModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          rules,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        configurationGovernanceService.createRules(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await configurationGovernanceService.createRules({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createRulesPromise = configurationGovernanceService.createRules();
        expectToBePromise(createRulesPromise);

        createRulesPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listRules', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listRules
        const accountId = '531fc3e28bfc43c5a2cea07786d93f5c';
        const transactionId = 'testString';
        const attached = true;
        const labels = 'SOC2,ITCS300';
        const scopes = 'scope_id';
        const limit = 1000;
        const offset = 38;
        const params = {
          accountId,
          transactionId,
          attached,
          labels,
          scopes,
          limit,
          offset,
        };

        const listRulesResult = configurationGovernanceService.listRules(params);

        // all methods should return a Promise
        expectToBePromise(listRulesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/config/v1/rules', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(options.qs.account_id).toEqual(accountId);
        expect(options.qs.attached).toEqual(attached);
        expect(options.qs.labels).toEqual(labels);
        expect(options.qs.scopes).toEqual(scopes);
        expect(options.qs.limit).toEqual(limit);
        expect(options.qs.offset).toEqual(offset);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = '531fc3e28bfc43c5a2cea07786d93f5c';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          accountId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        configurationGovernanceService.listRules(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await configurationGovernanceService.listRules({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listRulesPromise = configurationGovernanceService.listRules();
        expectToBePromise(listRulesPromise);

        listRulesPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getRule', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getRule
        const ruleId = 'testString';
        const transactionId = 'testString';
        const params = {
          ruleId,
          transactionId,
        };

        const getRuleResult = configurationGovernanceService.getRule(params);

        // all methods should return a Promise
        expectToBePromise(getRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/config/v1/rules/{rule_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(options.path.rule_id).toEqual(ruleId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const ruleId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          ruleId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        configurationGovernanceService.getRule(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await configurationGovernanceService.getRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getRulePromise = configurationGovernanceService.getRule();
        expectToBePromise(getRulePromise);

        getRulePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateRule', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // TargetResourceAdditionalTargetAttributesItem
      const targetResourceAdditionalTargetAttributesItemModel = {
        name: 'testString',
        value: 'testString',
        operator: 'string_equals',
      };

      // TargetResource
      const targetResourceModel = {
        service_name: 'iam-groups',
        resource_kind: 'service',
        additional_target_attributes: [targetResourceAdditionalTargetAttributesItemModel],
      };

      // RuleRequiredConfigSingleProperty
      const ruleRequiredConfigModel = {
        description: 'testString',
        property: 'public_access_enabled',
        operator: 'is_false',
        value: 'testString',
      };

      // EnforcementAction
      const enforcementActionModel = {
        action: 'audit_log',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateRule
        const ruleId = 'testString';
        const ifMatch = 'testString';
        const name = 'Disable public access';
        const description = 'Ensure that public access to account resources is disabled.';
        const target = targetResourceModel;
        const requiredConfig = ruleRequiredConfigModel;
        const enforcementActions = [enforcementActionModel];
        const accountId = '531fc3e28bfc43c5a2cea07786d93f5c';
        const ruleType = 'user_defined';
        const labels = ['SOC2', 'ITCS300'];
        const transactionId = 'testString';
        const params = {
          ruleId,
          ifMatch,
          name,
          description,
          target,
          requiredConfig,
          enforcementActions,
          accountId,
          ruleType,
          labels,
          transactionId,
        };

        const updateRuleResult = configurationGovernanceService.updateRule(params);

        // all methods should return a Promise
        expectToBePromise(updateRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/config/v1/rules/{rule_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(options.body.name).toEqual(name);
        expect(options.body.description).toEqual(description);
        expect(options.body.target).toEqual(target);
        expect(options.body.required_config).toEqual(requiredConfig);
        expect(options.body.enforcement_actions).toEqual(enforcementActions);
        expect(options.body.account_id).toEqual(accountId);
        expect(options.body.rule_type).toEqual(ruleType);
        expect(options.body.labels).toEqual(labels);
        expect(options.path.rule_id).toEqual(ruleId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const ruleId = 'testString';
        const ifMatch = 'testString';
        const name = 'Disable public access';
        const description = 'Ensure that public access to account resources is disabled.';
        const target = targetResourceModel;
        const requiredConfig = ruleRequiredConfigModel;
        const enforcementActions = [enforcementActionModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          ruleId,
          ifMatch,
          name,
          description,
          target,
          requiredConfig,
          enforcementActions,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        configurationGovernanceService.updateRule(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await configurationGovernanceService.updateRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateRulePromise = configurationGovernanceService.updateRule();
        expectToBePromise(updateRulePromise);

        updateRulePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteRule', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteRule
        const ruleId = 'testString';
        const transactionId = 'testString';
        const params = {
          ruleId,
          transactionId,
        };

        const deleteRuleResult = configurationGovernanceService.deleteRule(params);

        // all methods should return a Promise
        expectToBePromise(deleteRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/config/v1/rules/{rule_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(options.path.rule_id).toEqual(ruleId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const ruleId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          ruleId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        configurationGovernanceService.deleteRule(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await configurationGovernanceService.deleteRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteRulePromise = configurationGovernanceService.deleteRule();
        expectToBePromise(deleteRulePromise);

        deleteRulePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createRuleAttachments', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // RuleScope
      const ruleScopeModel = {
        note: 'My enterprise',
        scope_id: '282cf433ac91493ba860480d92519990',
        scope_type: 'enterprise',
      };

      // RuleAttachmentRequest
      const ruleAttachmentRequestModel = {
        account_id: '531fc3e28bfc43c5a2cea07786d93f5c',
        included_scope: ruleScopeModel,
        excluded_scopes: [ruleScopeModel],
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createRuleAttachments
        const ruleId = 'testString';
        const attachments = [ruleAttachmentRequestModel];
        const transactionId = 'testString';
        const params = {
          ruleId,
          attachments,
          transactionId,
        };

        const createRuleAttachmentsResult = configurationGovernanceService.createRuleAttachments(
          params
        );

        // all methods should return a Promise
        expectToBePromise(createRuleAttachmentsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/config/v1/rules/{rule_id}/attachments', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(options.body.attachments).toEqual(attachments);
        expect(options.path.rule_id).toEqual(ruleId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const ruleId = 'testString';
        const attachments = [ruleAttachmentRequestModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          ruleId,
          attachments,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        configurationGovernanceService.createRuleAttachments(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await configurationGovernanceService.createRuleAttachments({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createRuleAttachmentsPromise = configurationGovernanceService.createRuleAttachments();
        expectToBePromise(createRuleAttachmentsPromise);

        createRuleAttachmentsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listRuleAttachments', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listRuleAttachments
        const ruleId = 'testString';
        const transactionId = 'testString';
        const limit = 1000;
        const offset = 38;
        const params = {
          ruleId,
          transactionId,
          limit,
          offset,
        };

        const listRuleAttachmentsResult = configurationGovernanceService.listRuleAttachments(
          params
        );

        // all methods should return a Promise
        expectToBePromise(listRuleAttachmentsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/config/v1/rules/{rule_id}/attachments', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(options.qs.limit).toEqual(limit);
        expect(options.qs.offset).toEqual(offset);
        expect(options.path.rule_id).toEqual(ruleId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const ruleId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          ruleId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        configurationGovernanceService.listRuleAttachments(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await configurationGovernanceService.listRuleAttachments({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listRuleAttachmentsPromise = configurationGovernanceService.listRuleAttachments();
        expectToBePromise(listRuleAttachmentsPromise);

        listRuleAttachmentsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getRuleAttachment', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getRuleAttachment
        const ruleId = 'testString';
        const attachmentId = 'testString';
        const transactionId = 'testString';
        const params = {
          ruleId,
          attachmentId,
          transactionId,
        };

        const getRuleAttachmentResult = configurationGovernanceService.getRuleAttachment(params);

        // all methods should return a Promise
        expectToBePromise(getRuleAttachmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/config/v1/rules/{rule_id}/attachments/{attachment_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(options.path.rule_id).toEqual(ruleId);
        expect(options.path.attachment_id).toEqual(attachmentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const ruleId = 'testString';
        const attachmentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          ruleId,
          attachmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        configurationGovernanceService.getRuleAttachment(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await configurationGovernanceService.getRuleAttachment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getRuleAttachmentPromise = configurationGovernanceService.getRuleAttachment();
        expectToBePromise(getRuleAttachmentPromise);

        getRuleAttachmentPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateRuleAttachment', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // RuleScope
      const ruleScopeModel = {
        note: 'My enterprise',
        scope_id: '282cf433ac91493ba860480d92519990',
        scope_type: 'enterprise',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateRuleAttachment
        const ruleId = 'testString';
        const attachmentId = 'testString';
        const ifMatch = 'testString';
        const accountId = '531fc3e28bfc43c5a2cea07786d93f5c';
        const includedScope = ruleScopeModel;
        const excludedScopes = [ruleScopeModel];
        const transactionId = 'testString';
        const params = {
          ruleId,
          attachmentId,
          ifMatch,
          accountId,
          includedScope,
          excludedScopes,
          transactionId,
        };

        const updateRuleAttachmentResult = configurationGovernanceService.updateRuleAttachment(
          params
        );

        // all methods should return a Promise
        expectToBePromise(updateRuleAttachmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/config/v1/rules/{rule_id}/attachments/{attachment_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(options.body.account_id).toEqual(accountId);
        expect(options.body.included_scope).toEqual(includedScope);
        expect(options.body.excluded_scopes).toEqual(excludedScopes);
        expect(options.path.rule_id).toEqual(ruleId);
        expect(options.path.attachment_id).toEqual(attachmentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const ruleId = 'testString';
        const attachmentId = 'testString';
        const ifMatch = 'testString';
        const accountId = '531fc3e28bfc43c5a2cea07786d93f5c';
        const includedScope = ruleScopeModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          ruleId,
          attachmentId,
          ifMatch,
          accountId,
          includedScope,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        configurationGovernanceService.updateRuleAttachment(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await configurationGovernanceService.updateRuleAttachment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateRuleAttachmentPromise = configurationGovernanceService.updateRuleAttachment();
        expectToBePromise(updateRuleAttachmentPromise);

        updateRuleAttachmentPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteRuleAttachment', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteRuleAttachment
        const ruleId = 'testString';
        const attachmentId = 'testString';
        const transactionId = 'testString';
        const params = {
          ruleId,
          attachmentId,
          transactionId,
        };

        const deleteRuleAttachmentResult = configurationGovernanceService.deleteRuleAttachment(
          params
        );

        // all methods should return a Promise
        expectToBePromise(deleteRuleAttachmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/config/v1/rules/{rule_id}/attachments/{attachment_id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(options.path.rule_id).toEqual(ruleId);
        expect(options.path.attachment_id).toEqual(attachmentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const ruleId = 'testString';
        const attachmentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          ruleId,
          attachmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        configurationGovernanceService.deleteRuleAttachment(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await configurationGovernanceService.deleteRuleAttachment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteRuleAttachmentPromise = configurationGovernanceService.deleteRuleAttachment();
        expectToBePromise(deleteRuleAttachmentPromise);

        deleteRuleAttachmentPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
