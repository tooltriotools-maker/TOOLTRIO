# Build Fix — Stock Option Tax + Whole Calculator Type Audit

## Fixed Vercel error

`stock-option-tax-calculator/CalculatorClient.tsx` used `result.ficaTax` after an `in` check, but TypeScript still inferred `number | undefined`. It now uses a nullish fallback:

`fmt('ficaTax' in result ? (result.ficaTax ?? 0) : 0)`

## Additional real type issues found and fixed

- `wedding-budget-calculator`: corrected `calculateWeddingBudget` argument order and constrained region to its literal union.
- `genetic-height-calculator`: returned `heightPercentileEst` because the page consumes it.
- `hydration-exercise-calculator`: returned `sportsDrinkTip` because the page consumes it.
- `pregnancy-calculator`: switched UI from nonexistent `currentWeek/currentDay/weeksRemaining` to the calculation's actual `gestationalWeeks/gestationalDays/daysLeft` fields.
- `ovulation-calculator`: switched UI from nonexistent `fertileWindowStart/fertileWindowEnd/nextPeriodDate` to `fertileStart/fertileEnd/nextPeriod` and removed the unnecessary `as any` cast.
- `CalculatorLayout`: narrowed the YMYL trust panel call to Finance/Health before passing its restricted category type.

## New build protection

Added `scripts/check-calculator-result-props-all.mjs` and included it in `prebuild`. It checks Finance and Health calculator result-property usage against actual calculation return shapes and catches union-only properties that can remain undefined.

## Validation

- 360 calculation functions: PASS
- 360 calculation signature audit: PASS, 0 mismatches
- 360 result-shape audit: PASS, 0 failures
- 1,652 source files syntax audit: PASS
- SEO undefined titles: 0
- hardcoded global TypeScript paths: 0
- 381 structured-data prop usages: PASS
- 1,377 chart-data checks: PASS
- Finance registry safety: PASS
- 562 Finance/Health strict YMYL routes: PASS, 0 failures
- 286 blog articles: PASS
- 286 blog catalog entries: PASS
- 726 tool catalog entries: PASS
- broken blog links: 0
- broken calculator links: 0

## Production build limitation

A complete `npm run build` cannot be executed in this environment because `npm ci` is blocked by the environment's npm mirror returning 404 for the existing locked `yocto-queue@0.1.0` package. Therefore the final Next.js/Vercel compilation remains to be verified in Vercel after dependency installation.
