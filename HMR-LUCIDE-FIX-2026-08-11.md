# ToolTrio — Next.js HMR / lucide-react Error Fix

## Error fixed

`lucide-react/dist/esm/icons/trending-up.js ... module factory is not available. It might have been deleted in an HMR update.`

## Root cause

The stack trace was coming from a stale `.next`/Turbopack HMR graph. The current `components/ui/GlobalSearch.tsx` does not import `TrendingUp`, while the stale compiled chunk still referenced it. This is a cache/module-graph problem, not a missing `TrendingUp` export.

## Changes

1. Added `scripts/clean-next-cache.mjs` to remove `.next` and `.turbo` before development.
2. Changed `npm run dev` to use stable Next.js development mode (`next dev`) instead of Turbopack by default.
3. Added `npm run dev:turbo` as an opt-in Turbopack command with the same cache cleanup.
4. Added `start-clean-dev.cmd` for Windows users.
5. Removed `lucide-react` from `experimental.optimizePackageImports` to avoid optimized-icon HMR module graph issues. Webpack still tree-shakes named Lucide imports.
6. Fixed 5 pre-existing calculator result-contract audit failures:
   - annuity-income: added `netMonthly`, `breakEvenYears`, `lifetimeIncome` modeled outputs.
   - SBA loan: added `qualifies`, `eligibleProgram` modeled outputs.
7. Fixed one structured-data prop mismatch in `401k-early-withdrawal-vs-loan-calculator`.

## Required local restart

If the old error is currently visible, stop the running Next.js process first. Then run:

```text
npm install
npm run dev
```

Or double-click `start-clean-dev.cmd` on Windows.

Do not keep the old `next dev --turbo` process running while testing the fixed build.

## Validation performed

- Source syntax audit: PASS — 1,656 files, 0 syntax failures.
- Catalog check: PASS — 726 unique tools.
- Blog catalog check: PASS — 286 slugs.
- Master registry: PASS — 726 active routes.
- Calculator result-props audit: PASS — 360 calculation functions, 0 failures.
- Structured-data prop audit: PASS — 381 usages checked.
- Chart-data audit: PASS — 1,377 calculator source files checked.
- Dynamic-index audit: PASS — 1,652 files, 0 failures.

A full Next.js production build was not run in this audit environment because the supplied ZIP does not contain `node_modules`.
