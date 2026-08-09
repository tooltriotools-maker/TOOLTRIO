# Finance Batch 04 Audit

Date: 2026-08-09

## Scope
25 canonical Finance routes, alphabetically following `dependent-care-fsa-calculator`:

- disability-insurance-calculator
- dividend-calculator
- dividend-growth-portfolio-calculator
- dividend-growth-vs-growth-stocks-calculator
- dollar-cost-averaging-vs-lumpsum-usa-calculator
- donor-advised-fund-calculator
- down-payment-calculator
- drip-calculator
- early-mortgage-payoff-calculator
- early-retirement-calculator
- education-goal-calculator
- elder-care-cost-calculator
- elss-vs-nps-calculator
- elss-vs-ppf-calculator
- emergency-fund-calculator
- emergency-fund-hysa-calculator
- emi-calculator
- emi-vs-sip-calculator
- epf-vs-nps-calculator
- equity-compensation-calculator
- equity-indexed-annuity-calculator
- esop-value-calculator
- estate-liquidity-calculator
- estate-planning-checklist-calculator
- estate-probate-calculator

## Quality classifications
- reviewed: 4
- custom_estimate: 13
- tax_rule_review: 6
- formula_review: 0
- needs_manual_review: 1
- critical logic issues found in source review: none requiring a silent formula rewrite in this batch

## Targeted corrections
- Dividend qualified-dividend holding-period language corrected to the applicable 121-day window rather than a simplistic `61+ days` statement.
- Estate probate copy narrowed so California statutory fees are not presented as a nationwide proxy.
- India-specific ELSS/NPS/PPF/EPF calculators are explicitly marked India-specific and source-linked instead of being treated as generic US finance tools.
- RSU/equity compensation is explicitly treated as a simplified vesting-value/tax scenario, not a complete ISO/NSO tax engine.

## URL policy
No canonical Finance URLs were changed.
