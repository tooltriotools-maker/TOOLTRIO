# YMYL Remediation Batch 06

10 finance routes manually remediated for 2026 tax/retirement/savings-bond rules and calculation-model transparency.

## Routes
1. hsa-triple-tax-growth-calculator — reviewed
2. hsa-vs-401k-priority-calculator — reviewed
3. hsa-vs-fsa-calculator — reviewed
4. i-bond-ladder-calculator — reviewed
5. i-bonds-calculator — reviewed
6. i-bonds-vs-tips-calculator — reviewed
7. paycheck-contribution-optimizer — reviewed
8. tax-loss-harvesting-portfolio-calculator — reviewed
9. tax-withholding-w4-calculator — reviewed
10. taxable-vs-roth-vs-traditional-calculator — reviewed

## Validation
- All 10 canonical routes exist.
- All 10 are marked reviewed in the quality registry.
- Stale high-risk wording checks passed.
- lib/calculations/finance.ts compiles standalone with TypeScript 5.8.3.
- Full Next.js typecheck is environment-blocked because the ZIP does not include node_modules.

## Key source anchors
- IRS 2026 retirement contribution limits
- IRS 2026 IRA limits
- IRS 2026 standard deductions and brackets
- TreasuryDirect Series I rate/redemption rules
- IRS Publication 550 / wash-sale and capital-loss rules
