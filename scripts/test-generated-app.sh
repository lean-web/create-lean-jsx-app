#!/bin/sh

./index.js --name "myapp" -d "A lean-jsx-powered app"
cd myapp
npm install
npm run build
npx eslint .
cd ..
rm -rf myapp