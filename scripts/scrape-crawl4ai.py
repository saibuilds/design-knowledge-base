"""
crawl4ai scraper — faster, smarter scraping for component sites that block Playwright
Install: pip install crawl4ai
Usage:   python scripts/scrape-crawl4ai.py

Good for: sites with auth walls, JS-heavy SPAs, rate-limited sites
"""

import asyncio
import json
import os
from pathlib import Path

OUT_DIR = Path(__file__).parent.parent / "md" / "components"
OUT_DIR.mkdir(parents=True, exist_ok=True)

TARGETS = [
    {
        "name": "skiper",
        "url": "https://ui.skiper.dev",
        "component_pattern": "/components/",
        "output": OUT_DIR / "skiper-full.md",
    },
    {
        "name": "cult-ui",
        "url": "https://cult-ui.com",
        "component_pattern": "/components",
        "output": OUT_DIR / "cultui-full.md",
    },
    {
        "name": "watermelon",
        "url": "https://ui.watermelon.sh",
        "component_pattern": "/",
        "output": OUT_DIR / "watermelon-full.md",
    },
    {
        "name": "origin-ui",
        "url": "https://originui.com",
        "component_pattern": "/components/",
        "output": OUT_DIR / "originui-crawl4ai.md",
    },
    {
        "name": "hover-dev",
        "url": "https://hover.dev/components",
        "component_pattern": "/components/",
        "output": OUT_DIR / "hoverdev-crawl4ai.md",
    },
]


async def scrape_site(target: dict):
    try:
        from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig
        from crawl4ai.extraction_strategy import JsonCssExtractionStrategy
    except ImportError:
        print("crawl4ai not installed. Run: pip install crawl4ai")
        return

    print(f"\n=== Scraping {target['name']} with crawl4ai ===")

    browser_cfg = BrowserConfig(headless=False, verbose=False)
    run_cfg = CrawlerRunConfig(
        word_count_threshold=10,
        excluded_tags=["nav", "footer", "header"],
        exclude_external_links=True,
    )

    scraped = []

    async with AsyncWebCrawler(config=browser_cfg) as crawler:
        # Get component list
        result = await crawler.arun(url=target["url"], config=run_cfg)

        if not result.success:
            print(f"  Failed to load {target['url']}: {result.error_message}")
            return

        # Find component links from internal links
        links = [
            l["href"] for l in (result.links.get("internal", []))
            if target["component_pattern"] in l.get("href", "")
            and l["href"] != target["url"]
        ]
        links = list(dict.fromkeys(links))  # dedupe
        print(f"  Found {len(links)} component links")

        for url in links[:80]:  # cap at 80 per site
            print(f"  Scraping: {url}")
            try:
                r = await crawler.arun(url=url, config=run_cfg)
                if not r.success:
                    continue

                # Extract code blocks from markdown
                md = r.markdown or ""
                code_blocks = []
                in_block = False
                current = []
                for line in md.split("\n"):
                    if line.startswith("```"):
                        if in_block:
                            code = "\n".join(current).strip()
                            if len(code) > 80:
                                code_blocks.append(code)
                            current = []
                            in_block = False
                        else:
                            in_block = True
                    elif in_block:
                        current.append(line)

                if code_blocks:
                    best = max(code_blocks, key=len)
                    deps = []
                    for line in best.split("\n"):
                        if line.startswith("import ") and "from '" in line:
                            m = line.split("from '")
                            if len(m) > 1:
                                pkg = m[1].rstrip("'\"")
                                if not pkg.startswith(".") and not pkg.startswith("@/") and not pkg.startswith("react"):
                                    deps.append(pkg)
                    scraped.append({
                        "name": f"{target['name']}: {url.split('/')[-1]}",
                        "url": url,
                        "code": best,
                        "deps": list(dict.fromkeys(deps)),
                    })
                    print(f"    ✓ {len(best)} chars")
                else:
                    print(f"    ✗ No code")

            except Exception as e:
                print(f"    ✗ {str(e)[:80]}")

    # Write output
    md_out = f"# {target['name']} — Component Source Code (crawl4ai)\n\n"
    md_out += f"> Scraped: {__import__('datetime').datetime.now().isoformat()}\n"
    md_out += f"> Total: {len(scraped)}\n\n---\n\n"
    for c in scraped:
        md_out += f"## {c['name']}\n> Source: {c['url']}\n"
        if c["deps"]:
            md_out += f"> Dependencies: {', '.join(c['deps'])}\n"
        md_out += f"\n```tsx\n{c['code']}\n```\n\n---\n\n"

    target["output"].write_text(md_out, encoding="utf-8")
    print(f"\n✓ Done: {len(scraped)} components → {target['output']}")


async def main():
    for target in TARGETS:
        await scrape_site(target)


if __name__ == "__main__":
    asyncio.run(main())
