# ToolTrio Build Fix — Stock Option Tax + Whole-Build Recheck

## Reported Vercel failure

`app/calculators/finance/stock-option-tax-calculator/CalculatorClient.tsx`

The NSO branch accessed `result.ficaTax` directly even though `calculateStockOptionTax()` returns different object shapes for ISO and NSO. TypeScript correctly reported:

`Type 'number | undefined' is not assignable to type 'number'`.

## Fix

The page now narrows the union before reading `ficaTax`:

`'ficaTax' in result ? result.ficaTax : 0`

The calculator also now protects `effectiveRate` from division by zero when the option spread is zero.

## Additional union-shape fixes

The Finance calculation layer was reviewed for result-shape mismatches. The following functions were normalized where their consumers require a stable result shape:

- `calculateFederalContractorTax` — W-2 branch now exposes `totalTax`.
- `calculateHomeOfficeDeduction` — employee branch now exposes the same result fields used by the page and uses safe informational wording.
- `calculateStockOptionTax` — safe union narrowing + zero-spread effective-rate handling.

## Build protection added

`check-calculator-result-props.mjs` now checks both:

1. result properties exist in the calculator return shape;
2. union-only properties are either safely narrowed with `'<property>' in result` or the calculation function returns a normalized shape.

This check is included in `prebuild`.

`prebuild` also includes structured-data, chart-data, and finance-registry safety checks.

## Validation

- TypeScript/TSX source syntax: 1,652 files, 0 failures
- Calculation signatures: 360 functions, 0 mismatches
- Calculation runtime safety: 360 functions / 720 executions, 0 failures
- Calculator result properties: PASS
- Structured-data properties: 381 usages, PASS
- Chart-data properties: 1,377 source files, PASS
- Finance registry safety: PASS
- YMYL strict audit: 562 Finance/Health routes, 0 failures
- YMYL Google-facing internal audit: 389 Finance + 173 Health, 0 failures/warnings
- Health sources: 173/173 profiles
- Health claims: PASS
- Blog: 286/286, 0 broken links, 0 thin, 0 duplicate slugs
- Catalog: 726 tools / 286 blog slugs, PASS
- Related tools: 726 routes, PASS

## Production-build limitation

A dependency-backed `npm run build` cannot be executed in this analysis environment because the configured npm mirror currently returns HTTP 404 for `yocto-queue@0.1.0`. This report therefore does not falsely claim that Next.js production compilation was executed here.

The reported Vercel TypeScript failure has been fixed at source, and the new result-shape audit is now part of `prebuild` so the same class of error is detected before Next.js compilation.
