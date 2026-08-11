# ToolTrio YMYL Finance Review — Batch 08

Date: 2026-08-11

## Scope

1. federal-contractor-tax-calculator
2. fica-tax-calculator
3. france-pea-vs-assurance-vie-calculator
4. freelance-income-tax-calculator
5. freelancer-quarterly-tax-calculator
6. fsa-calculator
7. gift-tax-calculator
8. gig-economy-tax-calculator
9. vat-calculator-europe
10. w2-vs-1099-calculator

## Result

**10/10 PASS** for the internal Batch 08 review gate.

The review did not merely change registry status. It checked the calculation implementation, current-year assumptions, jurisdiction-specific wording, limitations and stale claims.

## Key remediation

- Federal contractor: replaced the flat 22% federal calculation with the project's progressive federal estimate and made retirement contribution a cash-flow deduction from take-home; Virginia remains a fixed state scenario.
- FICA: corrected the 2026 Social Security wage base to $184,500, corrected self-employment earnings to the 92.35% basis, corrected year-to-date coordination and added filing-status handling for Additional Medicare Tax.
- France PEA vs Assurance-Vie: reframed the output as a pre-tax growth scenario rather than claiming to calculate French post-tax outcomes; removed unsupported historical-return and universal-allocation claims and added French tax-authority sources.
- Freelance income: health insurance no longer reduces self-employment-tax profit; federal tax uses the project's progressive 2026 estimate rather than a user-entered flat rate.
- Freelancer quarterly tax: corrected 92.35% self-employment-tax basis, 2026 standard deduction values and installment dates; safe-harbor result remains explicitly a simplified planning amount.
- FSA: 2026 $3,400 limit retained; carryover is now an explicit plan input rather than being silently assumed.
- Gift tax: donor filing status is now an explicit input; the model states its equal-recipient/present-interest assumption.
- Gig economy: mileage is split Jan-Jun and Jul-Dec to apply 72.5¢ and 76¢ respectively; home-office and phone deductions now use explicit entered expenses/business-use percentages.
- VAT Europe: retained arithmetic-only VAT calculation and jurisdiction selector; page clearly states that rate classification and registration obligations are not determined by the calculator.
- W-2 vs 1099: corrected standard-deduction treatment, self-employment tax basis, QBI application and comparison wording; no longer presents worker classification or benefits as determined by the calculator.

## Validation

- Batch 08 review audit: **PASS**
- Strict YMYL audit: **562 routes, 0 failures, 0 warnings**
- Google-facing internal YMYL audit: **562 routes, 0 failures**
- Source syntax audit: **1,653 files, 0 syntax failures**
- Calculation-function audit: **360 functions, 712 executions, 0 failures**
- `finance.ts` TypeScript compilation: **PASS**

## Primary current sources

- IRS Topic 751 — https://www.irs.gov/taxtopics/tc751
- IRS Publication 15 (2026) — https://www.irs.gov/publications/p15
- IRS Publication 505 (2026) — https://www.irs.gov/publications/p505
- IRS Topic 554 — https://www.irs.gov/taxtopics/tc554
- IRS 2026 mileage rates — https://www.irs.gov/tax-professionals/standard-mileage-rates
- IRS Gift Tax FAQs — https://www.irs.gov/businesses/small-businesses-self-employed/frequently-asked-questions-on-gift-taxes
- IRS 2026 transfer-tax rules — https://www.irs.gov/irb/2026-29_irb
- IRS Gig Economy Tax Center — https://www.irs.gov/businesses/gig-economy-tax-center
- impots.gouv.fr — https://www.impots.gouv.fr/particulier/lassurance-vie-et-le-pea-0
- European Commission VAT rates — https://taxation-customs.ec.europa.eu/taxation/vat/vat-rates_en
- GOV.UK VAT rates — https://www.gov.uk/vat-rates

## Important limitation

This is an internal quality review. A PASS means the implementation and content met the project's current YMYL review criteria. It is not a Google certification or a guarantee of ranking, legal compliance in every individual circumstance, or individualized tax advice.
