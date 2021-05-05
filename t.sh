#!/usr/bin/env bash

node ./r.js
npm run transpile
npm publish --access public

cd ../lt-react-label-value
npm install --save lt-react-dropdown

cd ../hawthorn/platform
npm install --save lt-react-dropdown
