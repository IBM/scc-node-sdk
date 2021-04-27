[![Build Status](https://travis-ci.com/github/ibm-cloud-security/scc-node-sdk)](https://travis-ci.com/github/ibm-cloud-security/scc-node-sdk)
[![Release](https://img.shields.io/github/v/release/ibm-cloud-security/scc-node-sdk)](https://img.shields.io/github/v/release/ibm-cloud-security/scc-node-sdk)
[![npm](https://img.shields.io/npm/v/ibm-scc)](https://www.npmjs.com/package/ibm-scc)
![npm](https://img.shields.io/npm/dm/ibm-scc)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)


# IBM Cloud Security & Compliance Center Node.js SDK

Node.js client library to interact with various 
[IBM Cloud Security & Compliance Center APIs](https://cloud.ibm.com/apidocs/security-and-compliance-center).

## Table of Contents

<!--
  The TOC below is generated using the `markdown-toc` node package.

      https://github.com/jonschlinkert/markdown-toc

  You should regenerate the TOC after making changes to this file.

      npx markdown-toc -i README.md
  -->

<!-- toc -->

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Using the SDK](#using-the-sdk)
- [Questions](#questions)
- [Issues](#issues)
- [Open source @ IBM](#open-source--ibm)
- [Contributing](#contributing)
- [License](#license)

<!-- tocstop -->

<!-- --------------------------------------------------------------- -->
## Overview

The IBM Cloud Security & Compliance Center Node.js SDK allows developers to programmatically interact with the following 
IBM Cloud services:


Service Name | Import Path
--- | ---
[Findings](https://cloud.ibm.com/apidocs/security-and-compliance-center/findings) | ibm-scc/findings/v1
[Notifications](https://cloud.ibm.com/apidocs/security-and-compliance-center/notifications) | ibm-scc/notifications/v1
[Configuration Governance](https://cloud.ibm.com/apidocs/security-and-compliance-center/configuration-governance) | ibm-scc/configuration-governance/v1

## Prerequisites
* You need an [IBM Cloud][ibm-cloud-onboarding] account.
* **Node.js >=10**: This SDK is tested with Node.js versions 10 and up. It may work on previous versions but this is not officially supported.

[ibm-cloud-onboarding]: http://cloud.ibm.com/registration

## Installation

```sh
npm install ibm-scc
```

## Using the SDK
For general SDK usage information, please see [this link](https://github.com/IBM/ibm-cloud-sdk-common/blob/main/README.md)

## Questions

If you are having difficulties using this SDK or have a question about the IBM Cloud services,
please ask a question at
[Stack Overflow](http://stackoverflow.com/questions/ask?tags=ibm-cloud).

## Issues
If you encounter an issue with the SDK, you are welcome to submit
a [bug report](https://github.com/ibm-cloud-security/scc-node-sdk/issues).
Before that, please search for similar issues. It's possible someone has
already encountered this issue.

## Open source @ IBM
Find more open source projects on the [IBM Github Page](http://ibm.github.io/)

## Contributing
See [CONTRIBUTING](CONTRIBUTING.md).

## License

The IBM Cloud Security & Compliance Center Node.js SDK is released under the Apache 2.0 license.
The license's full text can be found in
[LICENSE](LICENSE).
