# ToolTrio YMYL Finance Review — Batch 16

Date: 2026-08-11

## Scope

10 Finance calculators were remediated at implementation, content-profile, and audit levels.

1. `401k-vs-taxable-account-calculator`
2. `annuity-certain-vs-lifetime-calculator`
3. `annuity-income-calculator`
4. `annuity-vs-lumpsum-calculator`
5. `background-check-roi-calculator`
6. `barista-fire-calculator`
7. `bond-ladder-calculator`
8. `bridge-loan-calculator`
9. `budget-calculator`
10. `budget-planner-calculator`

## Key remediation

- 401(k) vs taxable: added current-tax, retirement-tax and taxable-account tax-drag assumptions and changed the result to an after-tax scenario comparison.
- Annuity pages: removed unconditional guarantee/recommendation wording; made payout assumptions explicit and added insurer/contract limitations.
- Annuity certain vs lifetime: added explicit discount-rate handling and safe zero-rate present-value math.
- Annuity vs lump sum: changed the calculation to a transparent principal + annuity-payout-rate vs lump-sum-growth scenario.
- Background-check ROI: protected zero screening spend and clarified that avoided-loss assumptions are organization-specific.
- Barista FIRE: protected zero-return and invalid logarithm cases and explicitly labels the 4% rule as a planning assumption.
- Bond ladder: documented yield/reinvestment/credit/liquidity limitations and removed live-quote implications.
- Bridge loan: added explicit modeled equity advance and origination-fee assumptions and limited the loan amount to the modeled equity advance / purchase need.
- Budget tools: promoted only after documenting 50/30/20 as an optional benchmark and adding zero-income safety.

## Validation

- Batch-specific audit: 10/10 reviewed, 0 failures.
- Strict YMYL audit: 562 routes, 0 failures, 0 warnings.
- Google-facing internal YMYL audit: Finance 389/389; Health 173/173; methodology/limitations/source coverage 562/562; suspicious phrases 0.
- Finance quality registry: 389 unique slugs, 0 duplicate slugs.
- Source syntax audit: 1,653 files, 0 syntax failures.
- Calculation-function audit: 360 functions, 712 executions, 0 failures.

## Environment limitation

The uploaded repository does not contain installed React/Next dependencies. Targeted TypeScript parsing therefore reports only missing `react/jsx-runtime` dependency errors for TSX files; no syntax errors were reported by the source-syntax audit. A complete Next.js production build was not claimed.
