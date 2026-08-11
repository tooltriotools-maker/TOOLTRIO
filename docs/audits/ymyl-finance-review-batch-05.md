# YMYL Finance Review — Batch 05

Date: 2026-08-11

## Pages reviewed

1. home-affordability-calculator
2. home-equity-loan-calculator
3. home-equity-vs-personal-loan
4. home-loan-calculator
5. home-office-deduction-calculator
6. house-flip-calculator
7. house-hacking-roi-calculator
8. hra-calculator
9. hsa-investment-calculator
10. hsa-projection-calculator

## Review outcome

10/10 pages reviewed and promoted to `reviewed` status.

## Key corrections

- Home affordability now solves the 28/36 planning constraints including modeled property tax and insurance instead of calculating loan capacity first and adding those costs afterward.
- Home-equity loan amortization handles zero-rate cases and labels 85% CLTV as a screening assumption, not approval.
- Home-equity vs personal-loan comparison no longer treats a tax deduction as automatic in the headline comparison.
- Home-loan long-form content was corrected to remove mixed India/US claims and unsupported mortgage-tax statements.
- Home-office deduction now uses the IRS $5/sq-ft simplified method cap and does not invent a 32% tax-savings result; internet is entered as an annual business-use amount.
- House-flip content now labels the 70% rule as a heuristic rather than a profitability rule.
- HRA was corrected to mean Indian House Rent Allowance, with old/new tax-regime handling. HRA exemption is disabled under the new regime.
- HSA investment projection now supports self-only/family 2026 limits and age-55 catch-up.
- HSA projection now supports self-only/family limits and reports income-tax savings without assuming a universal 7.65% payroll-tax benefit.

## Validation

- Batch profile audit: PASS (10/10 present)
- TypeScript calculation file check with global `tsc --noEmit`: PASS
- Parentheses/braces balance: PASS for changed TS files
- Legacy mixed HRA/US phrases scan: PASS

## Authoritative references used

- CFPB Loan Estimate and home-equity guidance
- FHFA 2026 conforming-loan-limit release
- IRS simplified home-office deduction guidance
- IRS 2026 HSA inflation adjustments (Rev. Proc. 2025-19)
- IRS Publication 15-B HSA guidance
- India Income Tax Department old/new regime guidance and AY 2026-27 ITR validation rules
- HUD FHA mortgage resources
