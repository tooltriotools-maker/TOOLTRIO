# P0 Build Status

## Current state

The application build is intentionally **not** being bypassed. `ignoreBuildErrors` and `ignoreDuringBuilds` are disabled.

The current blocker is dependency installation in the execution environment. The configured npm mirror returns HTTP 404 for `yocto-queue@0.1.0`, which prevents `node_modules` from being populated.

## Required sequence

```text
npm ci --legacy-peer-deps
        ↓
npm run p0:dependency:check
        ↓
npm run typecheck
        ↓
npm run lint
        ↓
npm run build
```

Do not modify `package-lock.json` merely to work around the mirror. Do not add fake type declarations, disable TypeScript checking, or re-enable Next.js build suppression.

## Expected environment recovery

Once the npm registry mirror can provide the locked packages, run:

```bash
npm ci --legacy-peer-deps
npm run verify:build
```

`verify:build` now stops early with a clear dependency error instead of producing misleading cascaded TypeScript errors when core dependencies are absent.
