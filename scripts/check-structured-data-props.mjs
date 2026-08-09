import fs from 'node:fs';
import path from 'node:path';

const root = path.join(process.cwd(), 'app', 'calculators');
const failures = [];
let checked = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name === 'page.tsx') checkPage(full);
  }
}

function checkPage(pagePath) {
  const page = fs.readFileSync(pagePath, 'utf8');
  if (!page.includes('structuredData=')) return;
  if (!/<CalculatorClient\b[\s\S]*?structuredData\s*=/.test(page)) return;

  const clientPath = path.join(path.dirname(pagePath), 'CalculatorClient.tsx');
  if (!fs.existsSync(clientPath)) {
    failures.push(`${pagePath}: CalculatorClient.tsx not found`);
    return;
  }

  checked++;
  const client = fs.readFileSync(clientPath, 'utf8');
  const propsStart = client.search(/(?:interface|type)\s+Props\s*[\{=]/);
  const propsBlock = propsStart >= 0 ? client.slice(propsStart, client.indexOf('export default', propsStart) >= 0 ? client.indexOf('export default', propsStart) : propsStart + 3000) : '';
  if (!/structuredData\??\s*:/.test(propsBlock)) {
    failures.push(`${pagePath}: CalculatorClient Props does not accept structuredData`);
  }
}

walk(root);

if (failures.length) {
  console.error(`Structured-data prop audit failed: ${failures.length} issue(s).`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Structured-data prop audit passed: ${checked} CalculatorClient usages checked.`);
