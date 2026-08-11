# ToolTrio YMYL Finance Review — Batch 04

Date: 2026-08-11

## Routes completed

1. wage-garnishment-calculator
2. gold-vs-stocks-calculator
3. government-bond-calculator
4. gratuity-calculator
5. gst-calculator
6. hdhp-vs-traditional-insurance-calculator
7. health-insurance-deductible-calculator
8. health-insurance-subsidy-calculator
9. heloc-calculator
10. heloc-credit-line-calculator

## Review standard

Each route was reviewed for:

- calculation inputs and edge cases
- formula/model assumptions
- current-year YMYL rules where applicable
- authoritative source coverage
- methodology disclosure
- limitations and educational/scenario framing
- stale or unsupported claims
- route quality-profile status

## Key corrections

- Wage garnishment now uses entered disposable weekly earnings instead of inventing disposable income as 78% of gross pay. Federal ordinary-debt CCPA ceiling is modeled separately from student-loan, child-support and IRS levy rules.
- Gold-vs-stocks now uses user-entered return assumptions and no longer reports an artificial guaranteed crash-protection/hedge value.
- Government bond YTM is numerically solved instead of using a rough approximation; duration is calculated from discounted cash flows.
- India gratuity now applies completed years/part-over-six-months logic and clearly distinguishes the notified ceiling from a tax determination.
- GST is explicitly arithmetic-only; the tool does not determine HSN/SAC classification or legally applicable rate.
- HDHP comparison uses the 2026 self-only HSA contribution ceiling of $4,400 and documents simplified cost-sharing assumptions.
- Health insurance deductible scenario uses allowed/negotiated charges and caps modeled cost sharing at the entered OOP maximum.
- ACA subsidy model uses the 2025 FPL figures for the 2026 Marketplace PTC calculation, the IRS 2026 applicable-percentage table, and an entered benchmark Silver premium rather than an internally invented premium.
- HELOC models cap requested draws at the modeled credit line and safely handle zero-rate scenarios.

## Validation

- Batch 04 review audit: PASS — 10/10 profiles reviewed.
- Required calculation exports: PASS — 9/9 shared finance calculation exports; health-insurance-deductible uses an intentionally inlined page calculation.
- TypeScript calculation module: PASS — `tsc --noEmit`.
- All 10 changed TSX calculator clients: PASS — TypeScript transpilation/syntax diagnostics.
- Strict internal YMYL gate: PASS — 562 Finance/Health routes, 0 failures, 0 warnings.
- Google-facing internal YMYL gate: PASS — Finance 389/389 and Health 173/173, 0 failures.

## Important interpretation

This is ToolTrio's internal YMYL quality gate. Google does not publish a binary YMYL pass/fail score or certify individual calculators. The goal of this review is to make the pages genuinely review-ready with transparent methodology, authoritative sources, defensible formulas and explicit limitations.
