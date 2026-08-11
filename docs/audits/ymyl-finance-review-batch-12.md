# ToolTrio YMYL Finance Remediation — Batch 12

Date: 2026-08-11

## Scope

Ten Finance YMYL routes were reviewed and moved from `tax_rule_review` to `reviewed` after source, formula, wording, and route checks:

1. 401k-calculator
2. 401k-early-withdrawal-vs-loan-calculator
3. 401k-vs-pension-calculator
4. 401k-vs-roth-ira-calculator
5. 529-to-roth-rollover-calculator
6. 529-vs-roth-ira-education-calculator
7. 529-vs-utma-calculator
8. 72t-sepp-calculator
9. alimony-calculator
10. alimony-tax-calculator

## Key remediation

- 2026 retirement contribution references were aligned with the IRS: $24,500 elective deferral limit for 401(k)-type plans and $7,500 IRA contribution limit; catch-up rules are not silently assumed by the calculators.
- 401(k) early-withdrawal-vs-loan was rebuilt as an explicit scenario model with separate amount, tax, penalty, loan-rate, return and time inputs. It no longer claims to include taxes/penalties while hiding those assumptions.
- 72(t) calculation now handles zero-rate and invalid-input edge cases. The page explicitly states that the simplified life-expectancy shortcut is not an IRS table. Current IRS guidance requires the applicable life-expectancy/mortality tables and constrains the interest rate.
- 529-to-Roth rollover calculation now guards the $35,000 lifetime cap and zero annual-limit edge case. Eligibility remains explicitly subject to the 15-year account-age rule, annual Roth limit, pre-5-year contribution rule, beneficiary and earned-income requirements.
- 529 comparison pages use scenario language rather than universal recommendations.
- Alimony support inputs are sanitized and the page is explicitly a state-law planning estimate.
- Federal alimony tax treatment remains date-sensitive: generally deductible/includible for qualifying pre-2019 instruments and neither deductible nor includible for post-2018 instruments, subject to modification rules.

## Validation

### Batch audit

`Batch 12 YMYL review audit PASSED: 10/10 routes reviewed and validated.`

### Finance calculation engine

`tsc --noEmit ... lib/calculations/finance.ts` — PASS

### Changed TSX syntax checks

10/10 changed CalculatorClient.tsx files — no TypeScript/JSX syntax diagnostics detected.

### Strict YMYL audit

562 Finance + Health routes

Failures: 0
Warnings: 0
PASS

### Google-facing internal YMYL audit

Finance: 389/389
Health: 173/173
Methodology coverage: 562/562
Limitations coverage: 562/562
Source coverage: 562/562
Suspicious phrases: 0
Failures: 0
PASS

## Source verification

Primary references checked for this batch include IRS 2026 retirement limits, IRS Topic 313 for 529 plans, IRS substantially-equal-periodic-payment guidance, and IRS Topic 452 for alimony.
