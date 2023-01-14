// build.sh
#!/usr/bin/env bash
# exit on error
set -o errexit

yarn
npm i -g tsc
yarn build
yarn typeorm migration:run -d dist/src/data-source