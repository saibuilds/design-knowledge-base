#!/bin/bash
# Run from repo root: bash run-seo-git.sh
cd "C:/Users/Admin/Downloads/design-knowledge-base"

git add md/seo/

git commit -m "Add SEO strategy files: renovation, garden suites, real estate, technical checklist, content templates"

git push origin master 2>/dev/null || git push origin main 2>/dev/null || echo "No remote configured — commit complete, push skipped"
