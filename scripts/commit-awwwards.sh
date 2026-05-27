#!/usr/bin/env bash
# Run from the repo root: bash scripts/commit-awwwards.sh
cd "$(dirname "$0")/.." || exit 1

git add md/reference-sites/awwwards/

git commit -m "Add Awwwards pattern breakdowns: SOTD winners, 3D sites, agency portfolios, scroll experiences"

git push origin master
