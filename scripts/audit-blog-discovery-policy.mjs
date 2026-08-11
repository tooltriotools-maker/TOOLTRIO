// Source-level audit for the 22-blog public discovery policy.
// This script intentionally avoids importing TypeScript so it can run in a plain Node environment.
import fs from 'node:fs';
const text = fs.readFileSync(new URL('../lib/catalog/blog.ts', import.meta.url), 'utf8');
const hrefs = [...text.matchAll(/href:\s*[\'\"]([^\'\"]+)[\'\"]/g)].map(m => m[1]);
const allowed = new Set(["/blog/can-a-zip-code-cross-county-lines", "/blog/can-a-zip-code-cross-state-lines", "/blog/can-two-cities-have-the-same-zip-code", "/blog/dev-tools-calculator-guide-json-meta-tags-hash-unix-timestamp", "/blog/how-are-zip-codes-assigned", "/blog/how-far-apart-are-two-zip-codes", "/blog/how-many-zip-codes-are-in-the-united-states", "/blog/how-to-find-a-county-from-a-zip-code", "/blog/how-to-find-a-time-zone-from-a-zip-code", "/blog/how-to-find-a-zip-code-from-an-address", "/blog/how-to-find-latitude-and-longitude-from-zip-code", "/blog/how-to-find-the-population-of-a-zip-code", "/blog/how-to-find-zip-codes-within-a-radius", "/blog/how-to-validate-a-zip-code", "/blog/what-do-the-5-digits-in-a-zip-code-mean", "/blog/what-is-a-usps-zip-code", "/blog/what-is-a-valid-us-zip-code-format", "/blog/what-is-a-zip-code-prefix", "/blog/what-is-a-zip-plus-4-code", "/blog/which-state-has-the-fewest-zip-codes", "/blog/which-state-has-the-most-zip-codes", "/blog/zip-code-vs-postal-code"]);
const publicCount = hrefs.filter(h => allowed.has(h)).length;
const restrictedCount = hrefs.filter(h => !allowed.has(h)).length;
const missing = [...allowed].filter(h => !hrefs.includes(h));
console.log(JSON.stringify({total: hrefs.length, publicCount, restrictedCount, missing}, null, 2));
if (publicCount !== 22 || restrictedCount !== hrefs.length - 22 || missing.length) process.exit(1);
