#!/usr/bin/env bash
set -e
cd "C:/Users/Admin/Downloads/design-knowledge-base"
node scripts/screenshot-more-sites.mjs
git add screenshots/reference-sites/
git commit -m "Add more reference site screenshots: luxury hotels, agencies, kitchen design, real estate"
git push origin master
