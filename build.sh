// build.sh
#!/usr/bin/env bash
# exit on error
set -o errexit

sudo npm install typescript@latest -g

yarn
npx tsc
yarn typeorm migration:run -d dist/src/data-source