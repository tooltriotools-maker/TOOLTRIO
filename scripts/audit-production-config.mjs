import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const errors = [];
const warnings = [];

const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

const pkg = JSON.parse(read('package.json'));
const vercel = JSON.parse(read('vercel.json'));
const envExample = read('.env.local.example');

if (vercel.installCommand !== 'npm ci') {
  errors.push(`vercel.json installCommand must be "npm ci"; found ${JSON.stringify(vercel.installCommand)}`);
}
if (pkg.scripts?.build !== 'node -e "const fs=require(\'fs\');try{fs.rmSync(\'.next\',{recursive:true,force:true})}catch(e){}" && next build') {
  warnings.push('Build script differs from the audited expected command; verify intentionally before release.');
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
