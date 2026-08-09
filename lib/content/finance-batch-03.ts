export type FinanceBatch03Status =
  | 'reviewed'
  | 'formula_review'
  | 'tax_rule_review'
  | 'custom_estimate'
  | 'needs_manual_review'

export interface FinanceBatch03Profile {
  slug: string
  status: FinanceBatch03Status
  methodology: string
  limitations: string[]
  sources: Array<{ title: string; url: string; accessed?: string }>
  currentYear: number
}

const IRS = 'https://www.irs.gov'
const FHFA = 'https://www.fhfa.gov'
const ED = 'https://www.ed.gov'
const CB = 'https://research.collegeboard.org'

const collegeSources = [
  { title: 'College Board Trends in Higher Education', url: `${CB}/trends/college-pricing` },
]

export const FINANCE_BATCH_03: FinanceBatch03Profile[] = [
  { slug: 'collectibles-investment-calculator', status: 'custom_estimate', methodology: 'Scenario model for collectible appreciation, carrying costs, selling costs and a separate simplified collectibles-tax estimate.', limitations: ['Category appreciation assumptions are scenarios, not forecasts.', 'Collectibles tax treatment depends on the actual asset, holding period and taxpayer circumstances.'], sources: [{ title: 'IRS Topic 409 — Capital gains and losses', url: `${IRS}/taxtopics/tc409` }], currentYear: 2026 },
  { slug: 'college-cost-calculator', status: 'custom_estimate', methodology: 'College-cost projection using current planning assumptions, inflation and savings growth.', limitations: ['Published college prices vary substantially by institution and state.', 'Net price after grants can differ materially from sticker price.', 'The calculator is a planning scenario, not a forecast.'], sources: collegeSources, currentYear: 2026 },
  { slug: 'college-debt-burden-calculator', status: 'tax_rule_review', methodology: 'Student-debt affordability scenario using debt, expected income and payment assumptions.', limitations: ['The former SAVE plan ended in March 2026.', 'Current federal repayment-plan eligibility must be checked using current StudentAid.gov rules.', 'Income-based affordability is not a lender or government eligibility determination.'], sources: [{ title: 'U.S. Department of Education — SAVE/repayment changes', url: `${ED}/about/news/press-release/us-department-education-announces-next-steps-borrowers-enrolled-unlawful-save-plan` }], currentYear: 2026 },
  { slug: 'college-financial-aid-strategies-calculator', status: 'tax_rule_review', methodology: 'Simplified FAFSA/financial-aid planning scenarios rather than an official Student Aid Index computation.', limitations: ['Does not reproduce the complete FAFSA federal formula.', 'Institutional aid and CSS Profile methodologies can differ from FAFSA.', 'Strategies must not be interpreted as guaranteed aid outcomes.'], sources: collegeSources, currentYear: 2026 },
  { slug: 'college-roi-calculator', status: 'custom_estimate', methodology: 'Present-value comparison using user-entered education cost, earnings and discount-rate assumptions.', limitations: ['Career earnings, completion probability, taxes and financing costs create substantial uncertainty.'], sources: [{ title: 'College Board Education Pays', url: `${CB}/trends/education-pays` }], currentYear: 2026 },
  { slug: 'college-savings-529-calculator', status: 'tax_rule_review', methodology: '529 accumulation projection using user-entered contributions, return and time horizon.', limitations: ['State tax benefits vary.', 'Qualified-distribution and 529-to-Roth rules have eligibility requirements.'], sources: [{ title: 'IRS Topic 313 — Qualified tuition programs', url: `${IRS}/taxtopics/tc313` }], currentYear: 2026 },
  { slug: 'college-savings-goal-calculator', status: 'custom_estimate', methodology: 'Future college-cost and required-savings projection.', limitations: ['Inflation and investment returns are assumptions, not guarantees.', 'Actual college net price may differ from projected sticker price.'], sources: collegeSources, currentYear: 2026 },
  { slug: 'compound-interest-calculator', status: 'reviewed', methodology: 'Standard compound-growth calculation using principal, contribution, rate, compounding frequency and time.', limitations: ['Investment returns are hypothetical and do not account for all taxes, fees or volatility unless entered.'], sources: [], currentYear: 2026 },
  { slug: 'conforming-loan-limit-calculator', status: 'tax_rule_review', methodology: 'Mortgage amount and payment scenario compared with the 2026 FHFA baseline conforming limit.', limitations: ['The 2026 one-unit baseline is $832,750; county-specific high-cost limits can be higher.', 'PMI, MIP, VA funding fee and underwriting outputs are simplified estimates.'], sources: [{ title: 'FHFA 2026 Conforming Loan Limits', url: `${FHFA}/news/news-release/fhfa-announces-conforming-loan-limit-values-for-2026` }], currentYear: 2026 },
  { slug: 'cost-of-debt-calculator', status: 'reviewed', methodology: 'After-tax cost-of-debt estimate from interest rate, tax rate and debt terms.', limitations: ['Tax deductibility depends on debt type and use.'], sources: [], currentYear: 2026 },
  { slug: 'cost-segregation-study-calculator', status: 'tax_rule_review', methodology: 'Illustrative depreciation comparison using recovery-period assumptions.', limitations: ['Actual cost segregation requires asset classification, placed-in-service details and applicable tax rules.', 'Not a tax-return-ready depreciation schedule.'], sources: [{ title: 'IRS Publication 946', url: `${IRS}/publications/p946` }], currentYear: 2026 },
  { slug: 'covered-call-calculator', status: 'custom_estimate', methodology: 'Scenario model for option premium, share price and covered-call outcome.', limitations: ['Options involve assignment risk, opportunity cost and market volatility.', 'The model is not an options-pricing engine.'], sources: [], currentYear: 2026 },
  { slug: 'credit-card-annual-fee-calculator', status: 'reviewed', methodology: 'Net annual card value from rewards, benefits, fees and user-entered spending.', limitations: ['Rewards values depend on redemption behavior and issuer terms.'], sources: [], currentYear: 2026 },
  { slug: 'credit-card-payoff-calculator', status: 'reviewed', methodology: 'Amortization/payoff calculation from balance, APR and payment assumptions.', limitations: ['Actual minimum-payment rules, fees, variable APRs and new charges can change payoff time.'], sources: [], currentYear: 2026 },
  { slug: 'crypto-dca-calculator', status: 'custom_estimate', methodology: 'Dollar-cost-averaging scenario using user-entered purchase schedule and price assumptions.', limitations: ['Historical or assumed crypto returns do not predict future performance.'], sources: [], currentYear: 2026 },
  { slug: 'crypto-profit-calculator', status: 'custom_estimate', methodology: 'Digital-asset profit/loss arithmetic from purchase cost and sale value.', limitations: ['Does not determine tax liability, basis-lot selection or state tax.'], sources: [], currentYear: 2026 },
  { slug: 'crypto-profit-loss-tracker', status: 'custom_estimate', methodology: 'Scenario aggregation of digital-asset gains and losses.', limitations: ['A complete tax record requires transaction-level lots, basis and holding periods.'], sources: [{ title: 'IRS digital asset FAQs', url: `${IRS}/individuals/international-taxpayers/frequently-asked-questions-on-digital-asset-transactions` }], currentYear: 2026 },
  { slug: 'crypto-staking-calculator', status: 'custom_estimate', methodology: 'Staking-reward projection using entered balance, yield and token-price assumptions.', limitations: ['Token prices, validator rewards, lockups, fees and tax treatment vary.'], sources: [], currentYear: 2026 },
  { slug: 'crypto-tax-calculator', status: 'tax_rule_review', methodology: 'Simplified federal digital-asset capital-gain estimate for an entered transaction.', limitations: ['Does not reproduce Form 8949/Schedule D, full lot selection, basis reporting, loss netting or state tax.', 'Form 1099-DA reporting rules now apply to digital-asset broker transactions; reporting and basis coverage vary by transaction and asset.'], sources: [{ title: 'IRS Form 1099-DA instructions', url: `${IRS}/instructions/i1099da` }, { title: 'IRS digital asset FAQs', url: `${IRS}/individuals/international-taxpayers/frequently-asked-questions-on-digital-asset-transactions` }], currentYear: 2026 },
  { slug: 'currency-converter', status: 'custom_estimate', methodology: 'Currency conversion using the selected exchange-rate source.', limitations: ['Displayed rates can differ from bank/card rates and transaction spreads.'], sources: [], currentYear: 2026 },
  { slug: 'currency-profit-calculator', status: 'custom_estimate', methodology: 'Foreign-currency gain/loss scenario from entered acquisition and disposition rates.', limitations: ['Actual tax and accounting treatment depends on transaction purpose and jurisdiction.'], sources: [], currentYear: 2026 },
  { slug: 'debt-payoff-calculator', status: 'reviewed', methodology: 'Debt amortization and payoff comparison using balance, APR and payment assumptions.', limitations: ['Fees, variable rates and new borrowing can change actual payoff results.'], sources: [], currentYear: 2026 },
  { slug: 'debt-to-income-optimizer', status: 'formula_review', methodology: 'Debt-to-income scenario model using current debt payments and target mortgage assumptions.', limitations: ['Lender DTI rules vary by loan program, lender, compensating factors and documentation.', 'The result is not a mortgage approval or eligibility determination.'], sources: [], currentYear: 2026 },
  { slug: 'defined-benefit-pension-calculator', status: 'custom_estimate', methodology: 'Defined-benefit pension projection using plan-specific service, salary and multiplier inputs.', limitations: ['Actual early-retirement factors, COLAs, survivor benefits and lump-sum values are plan-specific.'], sources: [], currentYear: 2026 },
  { slug: 'dependent-care-fsa-calculator', status: 'tax_rule_review', methodology: 'Simplified comparison of dependent-care assistance tax savings with a simplified Child and Dependent Care Credit estimate.', limitations: ['The UI assumes one qualifying person and a 20% credit rate.', 'It does not reproduce Form 2441 or verify all earned-income, provider, dependent and filing-status rules.'], sources: [{ title: 'IRS Publication 505', url: `${IRS}/publications/p505` }, { title: 'IRS Topic 602 — Child and Dependent Care Credit', url: `${IRS}/taxtopics/tc602` }], currentYear: 2026 },
]

export const FINANCE_BATCH_03_SLUGS = FINANCE_BATCH_03.map((profile) => profile.slug)
