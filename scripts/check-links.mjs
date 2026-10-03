// Usage: npm run check-links
// Checks every external URL referenced in the site source. Run it before deploying.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const files = [...walk('src'), 'index.html'].filter((f) => /\.(tsx?|html)$/.test(f));
const urls = new Set();
for (const f of files) {
  for (const m of readFileSync(f, 'utf8').matchAll(/https?:\/\/[^\s"'`)<>\\]+/g)) {
    const u = m[0].replace(/[.,;]+$/, '');
    if (!/w3\.org|fonts\.(googleapis|gstatic)\.com/.test(u)) urls.add(u);
  }
}

// LinkedIn blocks automated requests (status 999), so it must be checked by hand.
const MANUAL = /linkedin\.com/;
let failed = 0;

for (const url of [...urls].sort()) {
  if (MANUAL.test(url)) {
    console.log(`MANUAL  ${url}  (open it in a browser)`);
    continue;
  }
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: AbortSignal.timeout(15000),
      headers: { 'User-Agent': 'Mozilla/5.0 (link-check)' },
    });
    const ok = res.status < 400;
    if (!ok) failed++;
    console.log(`${ok ? 'OK    ' : 'FAIL  '} ${res.status}  ${url}`);
  } catch (err) {
    failed++;
    console.log(`FAIL    ERR  ${url}  (${err.message})`);
  }
}

console.log(failed ? `\n${failed} link(s) need attention.` : '\nAll automatic checks passed.');
process.exit(failed ? 1 : 0);
