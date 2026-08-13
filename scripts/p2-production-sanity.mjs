import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const errors = [];
const warnings = [];

const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const nextVersion = String(pkg.dependencies?.next || '');
const major = Number(nextVersion.replace(/^[^0-9]*/, '').split('.')[0]);
if (major < 15) errors.push(`Next.js ${nextVersion} is unsupported; upgrade before production.`);

const config = fs.readFileSync(path.join(root, 'next.config.mjs'), 'utf8');
for (const header of ['X-Content-Type-Options', 'Strict-Transport-Security', 'Content-Security-Policy']) {
  if (!config.includes(header)) errors.push(`Missing security header: ${header}`);
}
if (config.includes('X-XSS-Protection')) warnings.push('Obsolete X-XSS-Protection header is still configured.');

const uiFooter = path.join(root, 'components/ui/Footer.tsx');
if (fs.existsSync(uiFooter)) errors.push('Unused duplicate components/ui/Footer.tsx still exists.');

const duplicateZipData = path.join(root, 'lib/data/us-zip-data.ts');
if (fs.existsSync(duplicateZipData)) warnings.push('Duplicate lib/data/us-zip-data.ts still exists.');

for (const file of ['app/api/zip/search/route.ts', 'app/api/zip/nearby/route.ts', 'app/api/zip/address/route.ts']) {
  if (!fs.existsSync(path.join(root, file))) errors.push(`Expected API file missing: ${file}`);
}

console.log(JSON.stringify({ nextVersion, errors, warnings }, null, 2));
if (errors.length) process.exit(1);
