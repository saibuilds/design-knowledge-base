# Scraper Reference — How to Run Everything

## Setup (one-time)
```bash
# Install Node scrapers (Playwright)
npm install
npx playwright install chromium

# Install Python scrapers (Scrapling)
python -m venv .venv
.venv/Scripts/pip install scrapling beautifulsoup4 lxml httpx requests pydantic playwright
```

## Playwright Scrapers (JS — best for auth-required sites)
```bash
node scripts/scrape-aceternity-live.mjs     # → md/components/aceternity-full.md (71 components)
node scripts/scrape-magicui-live.mjs        # → md/components/magicui-full.md (48 components)
node scripts/scrape-21stdev-live.mjs        # → md/components/21stdev-full.md (1625 components)
node scripts/scrape-skiper-live.mjs         # → md/components/skiper-full.md (login required)
node scripts/scrape-cultui-live.mjs         # → md/components/cultui-full.md
node scripts/scrape-watermelon-live.mjs     # → md/components/watermelon-full.md
```

## Scrapling Scrapers (Python — faster, no browser needed)
```bash
.venv/Scripts/python.exe scripts/scrape-scrapling.py
# Scrapes: Skiper UI, Origin UI, Hover.dev
# Output: md/components/*-scrapling.md
```

## crawl4ai (Python — NOTE: requires Python 3.10/3.11, not 3.14)
```bash
# Install on Python 3.11:
py -3.11 -m pip install crawl4ai
py -3.11 scripts/scrape-crawl4ai.py
```

## All Scraped Output Files
| File | Source | Components |
|------|--------|-----------|
| `21stdev-full.md` | 21st.dev | 1,625 |
| `aceternity-full.md` | Aceternity UI | 71 |
| `magicui-full.md` | MagicUI | 48 |
| `cultui-full.md` | Cult UI | scraped |
| `watermelon-full.md` | Watermelon UI | scraped |
| `skiper-scrapling.md` | Skiper UI | scraped |
| `originui-scrapling.md` | Origin UI | scraped |
| `hoverdev-scrapling.md` | Hover.dev | scraped |

## Remotion (video animations)
```bash
cd remotion-animations
npm install
npm run dev    # preview at localhost:3000
npm run build  # render MP4
```
