
# For each service belonging to your project, add a command like the commented out example below.
# Replace "service-name/v1.ts" with the source directory name and version for the service.
#./node_modules/.bin/typedoc --mode file --theme ./scripts/typedoc/theme --excludeExternals \
#    --out ./service-name/v1.ts --target "ES5"

# List the commands for each service here:

./node_modules/.bin/typedoc --mode file --theme ./scripts/typedoc/theme --excludeExternals --excludePrivate --excludeProtected \
    --out ./doc \
    ./findings/v1.ts \
    ./notifications/v1.ts \
    ./configuration-governance/v1.ts \
    --target "ES5"
