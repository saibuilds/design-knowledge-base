import { chromium } from 'playwright';
const b = await chromium.launch({ headless: false });
const p = await b.newPage();
await p.goto('https://21st.dev', { waitUntil: 'domcontentloaded', timeout: 30000 });
await new Promise(r => setTimeout(r, 4000));
// scroll to load more
for (let i = 0; i < 8; i++) { await p.keyboard.press('End'); await new Promise(r=>setTimeout(r,1500)); }
const links = await p.$$eval('a[href]', els => [...new Set(els.map(e=>e.href))].filter(h=>h.includes('21st.dev') && !h.endsWith('21st.dev/')));
console.log('TOTAL LINKS:', links.length);
links.slice(0,80).forEach(l => console.log(l));
await b.close();
