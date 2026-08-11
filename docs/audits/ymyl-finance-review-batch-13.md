# ToolTrio YMYL Finance Review — Batch 13

Date: 2026-08-11

## Scope

Ten Finance calculators with `tax_rule_review` status were reviewed against the current 2026 federal tax framework and the calculator implementation was corrected where needed.

1. capital-gains-harvesting-calculator
2. capital-gains-tax-calculator
3. charitable-bunching-calculator
4. charitable-giving-tax-calculator
5. child-tax-credit-calculator
6. cobra-vs-marketplace-calculator
7. equity-compensation-calculator
8. estate-liquidity-calculator
9. estate-tax-calculator
10. net-investment-income-tax-calculator

## Key remediation

- Capital gains: holding period now requires more than one year for long-term treatment; NIIT uses the lesser-of rule with a simplified MAGI proxy; QOZ treatment is explicitly not modeled.
- Capital-loss harvesting: loss netting and the $3,000 ordinary-income deduction are modeled separately instead of subtracting $3,000 from ordinary income regardless of net gains/losses.
- Charitable giving: added the 2026 0.5% AGI floor to the simplified deduction model and made the capital-gains avoidance rate explicitly illustrative.
- Child Tax Credit: verified the $2,200 CTC maximum, $1,700 ACTC maximum, $200,000/$400,000 phaseout thresholds and 2026 child/dependent-care credit treatment.
- COBRA vs Marketplace: retained the simplified 2026 PTC scenario and made the premium-only limitation explicit.
- Equity compensation: removed misleading future capital-gain output and corrected strategy wording around ISO/83(b) and RSU/NSO taxation.
- Estate liquidity: removed the automatic ILIT recommendation and labeled the 0.4% insurance premium as an illustrative assumption rather than a quote.
- Estate tax: verified the 2026 $15 million individual basic exclusion and retained the Form 706/portability limitations.
- NIIT: retained the simplified MAGI proxy but explicitly states it does not reproduce Form 8960 and applies the lesser-of rule.

## Validation

- `lib/calculations/finance.ts` TypeScript compilation: PASS
- 10 targeted calculation sanity tests: PASS
- `audit-ymyl-google.mjs`: PASS — 389 Finance + 173 Health profiles/routes, zero failures
- `audit-ymyl-strict.mjs`: PASS — 562 YMYL routes, zero failures/warnings
- `audit-ymyl-pages.mjs`: PASS — 562 routes, zero failures

## Authoritative references checked

- IRS 2026 tax inflation adjustments and retirement limits
- IRS Topic 409 — capital gains and losses
- IRS Topic 559 — Net Investment Income Tax
- IRS Topic 506 / Publication 505 — charitable contributions and 2026 charitable rules
- IRS Child Tax Credit / Schedule 8812 guidance
- U.S. Department of Labor COBRA FAQ

## Result

Batch 13: **10/10 PASS**

These are ToolTrio's internal YMYL review gates, not a Google certification or Google YMYL score.
