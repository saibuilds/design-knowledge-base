#!/usr/bin/env bash
set -e

cd "C:/Users/Admin/Downloads/design-knowledge-base"

echo "=== Installing playwright ==="
npm install playwright

echo "=== Installing chromium browser binary ==="
npx playwright install chromium

echo "=== Running screenshot script ==="
node scripts/screenshot-reference-sites.mjs

echo "=== Git commit ==="
git add screenshots/reference-sites/
git commit -m "Add reference site screenshots: real estate, renovation, hotels, agencies"
git push origin master

echo "=== All done ==="
