# Finance Batch 01

Date: 2026-08-08

Scope: first 25 canonical finance calculator routes in lexical route order.

## Quality architecture

- Registry: `lib/content/finance-quality.ts`
- Audit command: `npm run finance:audit:batch-01`
- Canonical URLs preserved.
- Tax-sensitive pages carry explicit `tax_rule_review` status instead of blanket validation claims.

## 2026-sensitive corrections

- 401(k) basic elective deferral: `$24,500` for 2026; age-based catch-up rules are separate.
- IRA contribution limit: `$7,500` for 2026; catch-up is `$1,100` for age 50+.
- Roth IRA 2026 phaseout: `$153,000–$168,000` single/head of household and `$242,000–$252,000` married filing jointly.
- HSA 2026 limits: `$4,400` self-only / `$8,750` family.
- PBGC age-65 maximum straight-life guarantee for 2026: `$7,789.77/month` for eligible single-employer plans.
- 2026 AMT exemption: `$90,100` single / `$140,200` married filing jointly, with phaseouts at `$500,000` / `$1,000,000`.
- 2026 Section 179 limit: `$2,560,000`, with phaseout beginning above `$4,090,000`.
- 100% additional first-year depreciation applies to qualifying property acquired after January 19, 2025, subject to eligibility rules.

## Deliberate non-fixes

Some calculators are projections rather than tax-return engines. The audit therefore does not silently hard-code tax law into generic growth formulas where doing so could produce misleading results. Instead, the page explains the limitation and the applicable rule source.
