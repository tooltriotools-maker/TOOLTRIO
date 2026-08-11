# ToolTrio YMYL Finance Review — Batch 09

Date: 2026-08-11

## Scope

10 Finance calculators were remediated from the original YMYL review queue:

1. term-vs-ulip-calculator
2. term-vs-whole-life-calculator
3. tip-calculator
4. tips-vs-nominal-bonds-calculator
5. traditional-ira-vs-taxable-account-calculator
6. treasury-bill-calculator
7. trust-fund-growth-calculator
8. tsp-vs-401k-calculator
9. uk-buy-to-let-vs-stocks-calculator
10. uk-fixed-rate-vs-tracker-mortgage-calculator

## Remediation

- ULIP comparison: added zero-rate safety, prevented negative investable surplus, removed categorical 'better strategy' framing, and documented that actual policy charges/benefits come from the policy illustration.
- Whole life comparison: removed the unsupported hard-coded 65% cash-value assumption; the cash-value percentage is now an explicit user planning assumption.
- TIPS vs nominal bonds: replaced the double-counted inflation/principal formula with a transparent annual scenario model; TIPS inflation accretion is included in the taxable scenario; output is presented as a scenario, not a market forecast.
- Traditional IRA vs taxable: changed from a pre-tax compound-growth comparison to an explicit after-tax scenario using current tax rate, retirement tax rate, and taxable-account tax-drag assumptions.
- T-Bill: preserved Treasury discount-rate/B.E.Y. mathematics, added input guards, and removed the hard-coded 22%/5% tax comparison.
- TSP vs 401(k): corrected the simplified FERS agency contribution model to 1% automatic + 100% match on the first 3% + 50% on the next 2%, rather than paying a flat 5% match regardless of employee contribution.
- UK buy-to-let vs stocks: removed 'after-tax' and 'better investment' claims; the page now clearly describes a user-assumption scenario rather than a property cash-flow/tax-return model.
- UK fixed vs tracker: replaced the investment future-value calculation with mortgage amortization/payment comparison using the entered mortgage balance, rate and term; removed forecast-like language about future Bank Rate.
- Trust fund: clarified assumption labels for growth and trustee fees.
- Tip calculator: retained as pure arithmetic and kept jurisdiction/service-charge limitations explicit.

## Current-source checks

- IRS 2026 standard deduction and tax adjustments: official IRS 2026 guidance.
- IRS 2026 IRA contribution limit: $7,500, with $8,600 age-50+ catch-up.
- IRS 2026 401(k)/TSP employee deferral limit: $24,500; catch-up rules separately apply.
- TreasuryDirect: TIPS principal is inflation-adjusted, interest is paid semiannually, and federal tax can apply to interest and inflation adjustments while state/local tax is exempt.
- TreasuryDirect: T-Bill discount rates use a 360-day basis; B.E.Y. uses price-based annualization.
- GOV.UK: 2026/27 Personal Allowance is £12,570 and England/Wales/NI basic-rate limit is £37,700; Scottish non-savings/non-dividend rates differ.
- GOV.UK/HMRC: residential landlord finance-cost relief is restricted to a basic-rate tax reduction for individuals.
- Bank of England: tracker products are linked to Bank Rate/lender equivalent and fixed-term variable products have different structures.
- IRDAI: ULIP charges and product features are governed through insurance-product rules and policy disclosures.

## Automated validation

- TypeScript transpile check: 11/11 files passed (finance.ts + 10 calculator clients).
- Calculation sanity checks: PASS.
- Registry status: 10/10 profiles set to `reviewed`.
- No node_modules were present in the supplied project, so a full Next.js dependency build was not claimed.

## Status

**BATCH 09: PASS — 10/10**
