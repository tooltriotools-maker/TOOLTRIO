# ToolTrio YMYL Finance Review — Batch 15

Date: 2026-08-11

## Scope

Ten Finance calculators were remediated from `tax_rule_review` to `reviewed` after code, content, source and formula checks.

1. alternative-minimum-tax-calculator
2. annual-bonus-tax-calculator
3. backdoor-roth-ira-calculator
4. bonds-vs-cds-usa-calculator
5. bonus-depreciation-calculator
6. epf-vs-nps-calculator
7. income-tax-estimator
8. inherited-ira-calculator
9. investment-property-depreciation-calculator
10. irs-installment-agreement-calculator

## Code-level changes

- AMT: replaced the flat 24% regular-tax proxy with the project's progressive 2026 federal tax helper; inputs are clamped and the UI remains limited to single/MFJ.
- Annual bonus: unknown state rates no longer silently fall back to 5%; copy now describes a limited state-assumption model and supplemental-wage withholding rather than final tax liability.
- Backdoor Roth: removed incorrect income-based eligibility; retained the pro-rata scenario and clarified direct-Roth income limitation is separate from backdoor mechanics.
- Bonds vs CDs: removed categorical “Better Investment” wording and added Treasury/FDIC sources; comparison is explicitly modeled value.
- Bonus depreciation: constrained bonus percentage and residual basis; first-year residual depreciation is explicitly a simplified estimate because MACRS convention/property class can differ.
- EPF vs NPS: removed stale “guaranteed 8.15%”/“fully tax-free” claims and changed the EPF scenario to the statutory ₹15,000 wage-ceiling model unless higher-wage contributions are separately supported by employer/EPFO rules.
- Income tax estimator: validated current 2026 progressive brackets and existing limitation language.
- Inherited IRA: changed “annual required withdrawal” to an illustrative annual distribution; actual RMD timing depends on beneficiary category and owner death/RMD status.
- Investment-property depreciation: retained 27.5/39-year building-only model and removed any fixed cost-segregation percentage from the user-facing methodology.
- IRS installment agreement: replaced the single 8% lump-sum interest estimate with a monthly amortization scenario using a 7% Q3-2026 planning rate, monthly penalty assumption, zero-balance/under-amortization guards, and removed the invented Offer-in-Compromise estimate.

## Validation

- Batch audit: **10/10 PASS**
- Modified TS/TSX transpilation: **11/11 PASS**
- Finance registry: **389 unique slugs, 0 duplicates**
- Google-facing internal YMYL audit: **0 failures**
- Strict YMYL audit: **562 routes, 0 failures, 0 warnings**

The repository-wide source-syntax audit still reports 15 pre-existing syntax failures outside the modified Batch 15 files; the modified files themselves transpile successfully. A full Next.js typecheck/build is not claimed because the supplied archive does not include installed project dependencies.

## Source basis

Primary references used for this batch include IRS Topic 556 and 2026 tax adjustments for AMT, IRS Publication 15 for supplemental wages/FICA, IRS Publication 590-B for inherited IRAs, IRS Publication 946 and Notice 2026-11 for depreciation, and TreasuryDirect/FDIC materials for Treasury securities and deposit insurance. UK sources were not required for this batch.

## Completion

**Batch 15: 10/10 PASS.**
