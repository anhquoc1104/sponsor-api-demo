#!/bin/bash
SHELL=/bin/bash
PATH=$PATH:$HOME/bin:/root/.nvm/versions/node/v18.20.4/bin

echo "START SPONSOR - API"

node -v;

# cd /app/sponsor-api

echo "PULL CODE"

git branch;

git pull;

echo "YARN INSTALL"

yarn;

echo "BEGIN BUILD SOURCE CODE"

npm run build:client-service;
wait
npm run build:admin-service;
wait
npm run build:publisher-service;
wait
npm run build:scheduler-service ;
wait

rm -rf ./build-bk;

cp -R ./build ./build-bk;

rm -rf ./build;

cp -R ./dist ./build;

echo "END BUILD SOURCE CODE"

echo "START SERVICE"

pm2 restart appsystem.config.js;

pm2 save;

echo "END SPONSOR - API"
