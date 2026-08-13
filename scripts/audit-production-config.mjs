import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const errors = [];
const warnings = [];

const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

const pkg = JSON.parse(read('package.json'));
const vercel = JSON.parse(read('vercel.json'));
const envExamplePath = path.join(root, '.env.local.example');
const envExample = fs.existsSync(envExamplePath) ? read('.env.local.example') : '';
const sourceForEnvCheck = ['app', 'components', 'lib', 'middleware.ts', 'next.config.mjs']
  .filter((p) => fs.existsSync(path.join(root, p)))
  .map((p) => {
    const full = path.join(root, p);
    if (fs.statSync(full).isFile()) return fs.readFileSync(full, 'utf8');
    return fs.readdirSync(full, { recursive: true })
      .filter((rel) => /\.(ts|tsx|js|mjs|cjs)$/.test(String(rel)))
      .map((rel) => fs.readFileSync(path.join(full, String(rel)), 'utf8')).join('\n');
  }).join('\n');
if (!fs.existsSync(envExamplePath) && /process\.env(?:\.|\[)/.test(sourceForEnvCheck)) {
  warnings.push('.env.local.example is missing even though source reads environment variables.');
}

if (vercel.installCommand !== 'npm ci') {
  errors.push(`vercel.json installCommand must be "npm ci"; found ${JSON.stringify(vercel.installCommand)}`);
}
if (!String(pkg.scripts?.build || '').includes('next build')) {
  errors.push('Build script must execute next build.');
}
if (/sk-[A-Za-z0-9_-]{8,}/.test(envExample)) {
  errors.push('.env.local.example appears to contain a credential-like value; examples should contain placeholders or blank values.');
}
if (!fs.existsSync(path.join(root, '.gitignore'))) {
  errors.push('.gitignore is missing.');
} else {
  const gi = read('.gitignore');
  for (const required of ['node_modules', '.next', '.env', '.env*.local']) {
    if (!gi.includes(required)) warnings.push(`.gitignore should explicitly cover ${required}`);
  }
}

console.log(JSON.stringify({
  vercelInstallCommand: vercel.installCommand,
  envExampleHasCredentialLikeValue: /sk-[A-Za-z0-9_-]{8,}/.test(envExample),
  errors,
  warnings,
  status: errors.length ? 'FAIL' : 'PASS'
}, null, 2));

if (errors.length) process.exit(2);
