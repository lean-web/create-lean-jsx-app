#!/bin/sh

rsync -avzh ../../app/.build ../generators/app/templates/
rsync -avzh ../../app/build.cjs ../generators/app/templates/build.cjs
rsync -avzh ../../app/sxl.d.ts ../generators/app/templates/sxl.d.ts
rsync -avzh ../../app/tsconfig.json ../generators/app/templates/tsconfig.json
