# Vercel deployment fix

The project was upgraded to Next.js 15 / React 19 / Recharts 3, but the previous
deployment configuration forced `npm ci` while the upgraded archive intentionally
did not contain the old lockfile.

`vercel.json` now uses `npm install`, which generates a dependency lock during the
Vercel build and allows the upgraded dependency graph to be installed.

The project still contains `.npmrc` with `legacy-peer-deps=true`, matching the
previous dependency-install behavior.

Recommended after deployment succeeds:
1. Run `npm install` locally.
2. Commit the generated `package-lock.json`.
3. Change `vercel.json` back to `npm ci` for reproducible deployments.
