# ToolTrio YMYL Finance Review — Batch 14

Date: 2026-08-11

## Scope

10 Finance YMYL calculators reviewed from the persisted project queue:

1. sip-vs-nps-calculator
2. sip-vs-ppf-calculator
3. social-security-tax-calculator
4. solo-401k-calculator
5. spin-off-tax-basis-calculator
6. 401k-calculator
7. 401k-early-withdrawal-vs-loan-calculator
8. 401k-vs-roth-ira-calculator
9. 529-to-roth-rollover-calculator
10. 529-vs-roth-ira-education-calculator

## Remediation performed

- Updated India SIP tax scenario to the current ₹1.25 lakh equity LTCG threshold and 12.5% simplified rate; results remain explicitly scenario-based.
- Clarified SIP-vs-PPF tax-saving output as an illustrative 80C benefit and removed guaranteed-return wording.
- Kept Social Security benefit taxation as a single-filer threshold screen and relabeled the flat tax result as illustrative rather than a tax-return calculation.
- Corrected stale Solo 401(k) 2026 prose and retained current IRS contribution limits.
- Changed spin-off tax-basis language so Section 355 tax-free treatment is conditional; added zero-share guards.
- Capped the core 401(k) annual employee contribution projection at the 2026 $24,500 elective-deferral limit when no catch-up input is modeled.
- Updated 401(k)-vs-Roth IRA defaults to 2026 limits and capped modeled Roth IRA contributions at $7,500.
- Added age-safe growth handling and safe lifetime-limit handling to the 529-to-Roth rollover calculation.
- Capped modeled Roth IRA contributions at the 2026 $7,500 IRA limit in the 529-vs-Roth education comparison and removed the arbitrary 50% earnings-tax factor.
- Added zero-return safeguards to the 529-vs-Roth projection.

## Source basis

Current 2026 IRS materials confirm the $24,500 401(k)/403(b)/governmental 457/TSP employee-deferral limit and $7,500 IRA limit. See IRS IR-2025-111 and current Retirement Topics pages.

## Validation

- `node scripts/audit-finance-batch-14.mjs` — PASS (25 routes)
- `node scripts/audit-finance-batch-16.mjs` — PASS (25 routes)
- `node scripts/check-finance-quality-registry.mjs` — PASS (389 unique slugs, 0 duplicates)
- Standalone TypeScript parsing of `lib/calculations/finance.ts` — PASS after remediation; repository-wide `tsc` cannot be considered a clean build because the supplied ZIP has no `node_modules`/Next.js type dependencies.

## Status

All 10 Batch 14 target profiles are set to `reviewed`.
