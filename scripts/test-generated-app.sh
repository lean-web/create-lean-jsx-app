#!/bin/sh

rm -rf myapp
./index.js myapp -n "myapp" -d "A lean-jsx-powered app"
cd myapp
npm install
npm run build
ls -la
npx eslint .
cd ..
rm -rf myapp