# Finance Batch 10 Audit

Date: 2026-08-09

## Scope

25 canonical Finance routes:

- pension-vs-lump-sum-calculator
- personal-finance-score-calculator
- personal-loan-calculator
- pmi-calculator
- portfolio-rebalancing-calculator
- ppf-calculator
- ppf-vs-fd-calculator
- ppf-vs-nps-calculator
- prenup-asset-protection-calculator
- prepaid-vs-savings-529-calculator
- profit-sharing-plan-calculator
- property-tax-calculator
- qbi-deduction-calculator
- qsbs-calculator
- qualified-dividend-tax-calculator
- rd-calculator
- real-estate-appreciation-calculator
- real-estate-cost-basis-calculator
- real-estate-crowdfunding-calculator
- real-estate-roi-calculator
- real-estate-syndication-calculator
- real-return-calculator
- real-wage-growth-calculator
- refinance-vs-invest-calculator
- reit-vs-direct-property-usa-calculator

## Key fixes

- Updated QBI 2026 threshold/phase-in values in the calculation layer.
- QBI tax-rate input now affects displayed tax-savings output.
- Added a QSBS acquisition-date regime selector for stock issued after July 4, 2025.
- Added the newer QSBS $75M asset threshold / 3-4-5 year exclusion schedule / $15M-or-10x cap model while preserving the legacy regime option.
- Removed US boilerplate from India PPF, PPF-vs-FD, PPF-vs-NPS and RD pages.
- Removed unsupported universal personal-loan APR bands and credit-score effects.
- Removed unsupported portfolio-rebalancing superiority claim.
- Removed stale national property-tax rankings and appeal-success claims.
- Reframed real-estate, pension, refinancing and REIT comparisons as scenario models.
- Added source/limitation profiles to the Finance quality registry.

## Validation

- `npm run finance:audit:batch-10` — PASS
- `npm run verify:config` — PASS
- `npm run catalog:check` — PASS: 726 unique active tools

The full Next.js production build remains unverified until project dependencies can be installed successfully in the build environment.

Canonical URLs were not changed.
