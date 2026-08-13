import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const lockPath = path.join(root, 'package-lock.json');
const pkgPath = path.join(root, 'package.json');

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const lock = JSON.parse(fs.readFileSync(lockPath, 'utf8'));

const errors = [];
const warnings = [];

const nextVersion = String(pkg.dependencies?.next || '');
const nextMajor = Number(nextVersion.replace(/^[^0-9]*/, '').split('.')[0]);
if (Number.isFinite(nextMajor) && nextMajor < 15) {
  errors.push(`Next.js ${nextVersion} is unsupported; upgrade to a supported maintenance release before production.`);
}

function command(name, args) {
  try { return execFileSync(name, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim(); }
  catch { return null; }
}

const nodeVersion = process.version;
const npmVersion = command('npm', ['--version']);
const registry = command('npm', ['config', 'get', 'registry']);

if (!fs.existsSync(lockPath)) errors.push('package-lock.json is missing');
if (!pkg.scripts?.build?.includes('next build')) errors.push('build script does not execute next build');
if (pkg.compilerOptions?.ignoreBuildErrors) errors.push('ignoreBuildErrors is enabled');

const nextConfigCandidates = ['next.config.js', 'next.config.mjs', 'next.config.ts'];
for (const file of nextConfigCandidates) {
  const p = path.join(root, file);
  if (!fs.existsSync(p)) continue;
  const text = fs.readFileSync(p, 'utf8');
  if (/ignoreBuildErrors\s*:\s*true/.test(text)) errors.push(`${file}: ignoreBuildErrors=true`);
  if (/ignoreDuringBuilds\s*:\s*true/.test(text)) errors.push(`${file}: ignoreDuringBuilds=true`);
}

const lockPackages = lock.packages ?? {};
const yocto = lockPackages['node_modules/yocto-queue'];
if (yocto?.resolved?.includes('registry.npmjs.org/yocto-queue/-/yocto-queue-0.1.0.tgz')) {
  warnings.push('Lockfile requires yocto-queue@0.1.0; current execution environment returned HTTP 404 for that tarball through its configured registry mirror.');
}

const resolvedHosts = new Map();
for (const [name, entry] of Object.entries(lockPackages)) {
  if (!entry?.resolved) continue;
  try {
    const host = new URL(entry.resolved).host;
    resolvedHosts.set(host, (resolvedHosts.get(host) ?? 0) + 1);
  } catch {}
}

const missingCore = ['next', 'react', 'react-dom'].filter((name) => !fs.existsSync(path.join(root, 'node_modules', name)));
if (missingCore.length) warnings.push(`Core dependencies are not installed: ${missingCore.join(', ')}`);

console.log(JSON.stringify({
  nodeVersion,
  npmVersion,
  configuredRegistry: registry,
  packageManagerReady: missingCore.length === 0,
  missingCoreDependencies: missingCore,
  lockfilePackages: Object.keys(lockPackages).length,
  resolvedHosts: Object.fromEntries(resolvedHosts),
  errors,
  warnings,
}, null, 2));

if (missingCore.length) process.exit(2);
if (errors.length) process.exit(1);
