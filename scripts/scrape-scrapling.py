"""
Scrapling-based scraper — faster, smarter than Playwright for static/SSR sites
Venv:  .venv/Scripts/python.exe scripts/scrape-scrapling.py
Good for: Skiper UI, Origin UI, Hover.dev, any site that SSR renders code

Scrapling auto-adapts to site changes, handles JS-rendered content,
and is much faster than full browser automation.
"""

import asyncio
import re
from pathlib import Path
from datetime import datetime

from scrapling import AsyncFetcher

OUT_DIR = Path(__file__).parent.parent / "md" / "components"
OUT_DIR.mkdir(parents=True, exist_ok=True)

TARGETS = [
    {
        "name": "origin-ui",
        "list_url": "https://originui.com/components",
        "output": OUT_DIR / "originui-scrapling.md",
        "link_pattern": r"/components/",
    },
    {
        "name": "hover-dev",
        "list_url": "https://hover.dev/components",
        "output": OUT_DIR / "hoverdev-scrapling.md",
        "link_pattern": r"/components/",
    },
]


def extract_code(html: str) -> str | None:
    """Extract the longest code block from HTML."""
    from bs4 import BeautifulSoup
    soup = BeautifulSoup(html, "lxml")
    blocks = []
    for tag in soup.find_all(["pre", "code"]):
        text = tag.get_text()
        if text and len(text.strip()) > 80:
            blocks.append(text.strip())
    if not blocks:
        return None
    return max(blocks, key=len)


def extract_deps(code: str) -> list[str]:
    deps = []
    for line in code.split("\n"):
        m = re.search(r"from ['\"]([^'\"]+)['\"]", line)
        if m:
            pkg = m.group(1)
            if not pkg.startswith(".") and not pkg.startswith("@/") and not pkg.startswith("react"):
                deps.append(pkg)
    return list(dict.fromkeys(deps))


async def scrape_site(target: dict):
    print(f"\n=== Scraping {target['name']} with Scrapling ===")
    scraped = []

    try:
        fetcher = AsyncFetcher(auto_match=False)

        # Get component list
        page = await fetcher.get(target["list_url"], timeout=30)
        links = []
        for a in page.css("a[href]"):
            href = a.attrib.get("href", "")
            if target["link_pattern"] in href:
                full = href if href.startswith("http") else target["list_url"].rstrip("/") + href
                links.append({"href": full, "text": a.text.strip()})

        links = list({l["href"]: l for l in links}.values())
        print(f"  Found {len(links)} component links")

        for link in links[:60]:
            print(f"  Scraping: {link['text'] or link['href']}")
            try:
                comp_page = await fetcher.get(link["href"], timeout=20)
                code = extract_code(str(comp_page.html_content))
                if code:
                    deps = extract_deps(code)
                    scraped.append({
                        "name": f"{target['name']}: {link['text'] or link['href'].split('/')[-1]}",
                        "url": link["href"],
                        "code": code,
                        "deps": deps,
                    })
                    print(f"    OK {len(code)} chars")
                else:
                    print(f"    NO code")
            except Exception as e:
                print(f"    ✗ {str(e)[:80]}")

    except Exception as e:
        print(f"  Error: {e}")

    # Write output
    md = f"# {target['name']} — Components (Scrapling)\n\n"
    md += f"> Scraped: {datetime.now().isoformat()}\n> Total: {len(scraped)}\n\n---\n\n"
    for c in scraped:
        md += f"## {c['name']}\n> Source: {c['url']}\n"
        if c["deps"]:
            md += f"> Dependencies: {', '.join(c['deps'])}\n"
        md += f"\n```tsx\n{c['code']}\n```\n\n---\n\n"

    target["output"].write_text(md, encoding="utf-8")
    print(f"Done: {len(scraped)} -> {target['output']}")
    return len(scraped)


async def main():
    for target in TARGETS:
        await scrape_site(target)

if __name__ == "__main__":
    asyncio.run(main())
