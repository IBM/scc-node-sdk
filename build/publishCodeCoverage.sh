#!/bin/bash

# This script will publish code coverage info for a build of the master branch
# or a tagged release.


printf ">>>>> Publishing code coverage info\n"
./cc-test-reporter format-coverage --prefix "github.com/IBM/scc-node-sdk/" --input-type lcov --output coverage.json -d
./cc-test-reporter upload-coverage --input coverage.json -d