# ToolTrio Finance YMYL Review — Batch 03

Date: 2026-08-11

## Scope

Ten finance calculators were remediated from `formula_review` / `needs_manual_review` to `reviewed`:

1. student-loan-refinance-calculator
2. estate-probate-calculator
3. income-tax-calculator
4. netherlands-aow-vs-private-pension-calculator
5. prenup-asset-protection-calculator
6. scholarship-financial-aid-calculator
7. social-security-wep-calculator
8. spain-pension-vs-etf-calculator
9. state-estate-tax-calculator
10. student-loan-calculator

## Review standard

A page is only marked `reviewed` when the implementation has been checked for:

- formula/algorithm correctness for the scope claimed by the UI;
- invalid-input behavior and obvious divide-by-zero/amortization failures;
- YMYL claim boundaries and removal of unsupported certainty;
- current authoritative source coverage where rules are time-sensitive;
- methodology/limitations disclosure;
- consistency between displayed labels and the actual calculation.

## Major remediation

- India FY 2026-27 income tax: corrected new-regime slabs, ₹75,000 standard deduction, 87A rebate assumptions, surcharge and 4% cess; removed dollar-denominated Indian tax copy.
- California probate: replaced the arbitrary flat-rate model with the statutory California tiered ordinary compensation schedule and removed will-based invented fees.
- Student-loan refinance: added explicit refinance fees and calculated break-even from fee/monthly savings instead of a fixed three-month placeholder.
- Student-loan amortization: added a guard when payment does not cover interest and increased the amortization horizon to avoid silent truncation.
- Social Security WEP/GPO: removed the obsolete current-benefit reduction formula; current benefits payable January 2024+ are modeled with zero WEP/GPO reduction after the Social Security Fairness Act.
- Netherlands AOW: replaced the false “AOW investment return” model with a gross-income comparison using user-entered AOW and private-pension amounts.
- Prenup: removed invented 35%/50% judicial exposure and 6% business-growth assumptions; the page now reports an asset-value scenario without predicting a court award.
- Scholarship aid: removed the false claim that the calculator determines Pell/FAFSA eligibility; federal grant amount is explicitly user-entered for planning.
- Spain pension vs ETF: removed unsupported historical-return and hard-coded tax claims; the page is now explicitly assumption-based.
- Massachusetts estate tax: retained a screening model and clearly separates it from the real Form M-706 computation.

## Verification

- `lib/calculations/finance.ts` compiles with TypeScript 5.8.3 using `tsc --noEmit --target ES2020 --module ESNext --skipLibCheck`.
- The ten changed calculator pages were checked with TypeScript/JSX parsing; no syntax diagnostics were found (dependency-resolution diagnostics are expected because this audit ZIP intentionally has no `node_modules`).
- The batch audit script verifies all ten registry statuses, page methodology/limitation presence, and required calculation exports.

## External authoritative references used during review

- IRS 2026 tax inflation adjustments and 2026 tax brackets.
- India Income Tax Department AY 2026-27 slab and section 87A guidance.
- California Probate Code §10810 and California Rules of Court Rule 7.705.
- SSA Social Security Fairness Act / WEP-GPO repeal guidance.
- Federal Student Aid refinance and student-loan guidance.
- SVB 2026 AOW amounts and living-situation rules.
- Spanish Social Security 2026 maximum pension amounts.
- IRS 2026 federal estate-tax exclusion and Massachusetts DOR 2026 estate-tax guidance.

## Result

**Batch 03: 10/10 reviewed.**

Finance YMYL pages still requiring review after this batch: **62**.

Health YMYL pages still requiring review: **29**.

Total original queue remaining: **91 / 111**.
