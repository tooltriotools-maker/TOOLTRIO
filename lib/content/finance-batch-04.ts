export type FinanceBatch04Status =
  | 'reviewed'
  | 'formula_review'
  | 'tax_rule_review'
  | 'custom_estimate'
  | 'needs_manual_review'

export interface FinanceBatch04Profile {
  slug: string
  status: FinanceBatch04Status
  methodology: string
  limitations: string[]
  sources: Array<{ title: string; url: string; accessed?: string }>
  currentYear: number
}

const IRS = 'https://www.irs.gov'
const SSA = 'https://www.ssa.gov'
const DOL = 'https://www.dol.gov'
const CFPB = 'https://www.consumerfinance.gov'
const INVESTOR = 'https://www.investor.gov'
const FINRA = 'https://www.finra.org'
const TREASURY = 'https://www.treasurydirect.gov'
const ED = 'https://studentaid.gov'
const GOVUK = 'https://www.gov.uk'
const INDIA_INCOME_TAX = 'https://www.incometax.gov.in'

export const FINANCE_BATCH_04: FinanceBatch04Profile[] = [
  {
    slug: 'disability-insurance-calculator', status: 'custom_estimate',
    methodology: 'Income-replacement gap scenario using earnings, existing coverage, waiting period and benefit assumptions.',
    limitations: ['A 60–70% replacement target is a planning heuristic, not a universal coverage requirement.', 'Whether benefits are taxable depends in part on who paid the premiums and the policy terms.', 'SSDI eligibility and benefit amounts are separate from private disability insurance.'],
    sources: [{ title: 'SSA — Disability Benefits', url: `${SSA}/disability` }], currentYear: 2026,
  },
  {
    slug: 'dividend-calculator', status: 'custom_estimate',
    methodology: 'Dividend-income and reinvestment projection from share count, dividend yield/growth and contribution assumptions.',
    limitations: ['Dividend growth and stock returns are not guaranteed.', 'Qualified-dividend treatment depends on the dividend and holding-period rules.', 'Tax results are simplified and do not replace Form 1040/Schedule B calculations.'],
    sources: [{ title: 'IRS Topic 404 — Dividends', url: `${IRS}/taxtopics/tc404` }], currentYear: 2026,
  },
  {
    slug: 'dividend-growth-portfolio-calculator', status: 'custom_estimate',
    methodology: 'Dividend-growth scenario using starting yield, dividend-growth assumptions, contributions and reinvestment.',
    limitations: ['Yield-on-cost is a descriptive metric, not a measure of current investment value or expected return.', 'Dividend cuts and share-price changes are not predictable from the model.'],
    sources: [{ title: 'Investor.gov — Dividends', url: `${INVESTOR}/introduction-investing/investing-basics/glossary/dividend` }], currentYear: 2026,
  },
  {
    slug: 'dividend-growth-vs-growth-stocks-calculator', status: 'custom_estimate',
    methodology: 'Scenario comparison of total-return assumptions for dividend-oriented and growth-oriented portfolios.',
    limitations: ['The comparison is assumption-driven and is not a forecast for SCHD, VYM, QQQ, VUG or any individual security.', 'Taxes, fees, volatility and valuation changes can materially alter outcomes.'],
    sources: [{ title: 'Investor.gov — Investing Basics', url: `${INVESTOR}/introduction-investing` }], currentYear: 2026,
  },
  {
    slug: 'dollar-cost-averaging-vs-lumpsum-usa-calculator', status: 'custom_estimate',
    methodology: 'Historical-style scenario comparison between scheduled contributions and immediate investment using user-entered return assumptions.',
    limitations: ['The model cannot predict which strategy will outperform in the future.', 'Cash drag, taxes and actual contribution timing can change results.'],
    sources: [{ title: 'FINRA — Dollar-Cost Averaging', url: `${FINRA}/investors/investing/investing-basics/dollar-cost-averaging` }], currentYear: 2026,
  },
  {
    slug: 'donor-advised-fund-calculator', status: 'tax_rule_review',
    methodology: 'Charitable-giving scenario comparing a donor-advised-fund contribution with a simplified cash/property-giving alternative.',
    limitations: ['Deductibility depends on asset type, holding period, substantiation and AGI limitations.', 'A donor-advised fund sponsor controls the charitable assets after contribution subject to its governing rules.'],
    sources: [{ title: 'IRS Publication 526 — Charitable Contributions', url: `${IRS}/publications/p526` }], currentYear: 2026,
  },
  {
    slug: 'down-payment-calculator', status: 'reviewed',
    methodology: 'Mortgage down-payment and cash-to-close scenario using home price, target percentage and user-entered closing-cost assumptions.',
    limitations: ['Actual closing costs, lender requirements, mortgage insurance and assistance programs vary by transaction.', 'A down-payment percentage does not by itself determine mortgage approval.'],
    sources: [{ title: 'CFPB — Buying a House', url: `${CFPB}/buy-a-house/` }], currentYear: 2026,
  },
  {
    slug: 'drip-calculator', status: 'custom_estimate',
    methodology: 'Dividend-reinvestment projection using starting shares, dividend yield, growth and reinvestment assumptions.',
    limitations: ['Dividends and prices can change or be cut.', 'Taxable-account reinvestment can create taxable dividend income even when no cash is withdrawn.'],
    sources: [{ title: 'IRS Topic 404 — Dividends', url: `${IRS}/taxtopics/tc404` }], currentYear: 2026,
  },
  {
    slug: 'early-mortgage-payoff-calculator', status: 'reviewed',
    methodology: 'Amortization comparison between scheduled mortgage payments and an accelerated-payment scenario.',
    limitations: ['Actual servicer treatment of extra payments varies.', 'Prepayment penalties or loan-specific restrictions can affect savings.'],
    sources: [{ title: 'CFPB — Mortgage Help', url: `${CFPB}/consumer-tools/mortgages/` }], currentYear: 2026,
  },
  {
    slug: 'early-retirement-calculator', status: 'custom_estimate',
    methodology: 'Financial-independence projection using savings, spending, portfolio return, inflation and retirement-horizon assumptions.',
    limitations: ['Sequence-of-returns risk, taxes, healthcare costs and changing spending are not fully modeled.', 'A safe withdrawal rate is a planning assumption, not a guarantee.'],
    sources: [{ title: 'Investor.gov — Saving and Investing', url: `${INVESTOR}/introduction-saving-and-investing` }], currentYear: 2026,
  },
  {
    slug: 'education-goal-calculator', status: 'custom_estimate',
    methodology: 'Future-value and required-savings projection for an education goal.',
    limitations: ['Education inflation and investment returns are assumptions.', 'Financial-aid eligibility and net price are not modeled unless explicitly entered.'],
    sources: [{ title: 'Federal Student Aid — Paying for College', url: `${ED}/pay-for-college` }], currentYear: 2026,
  },
  {
    slug: 'elder-care-cost-calculator', status: 'custom_estimate',
    methodology: 'Long-term-care cash-flow scenario based on care setting, duration, inflation and funding assumptions.',
    limitations: ['Actual costs vary by location, care level, provider and insurance coverage.', 'The model does not determine Medicaid eligibility.'],
    sources: [{ title: 'U.S. Department of Health and Human Services — Long-Term Care', url: 'https://acl.gov/ltc' }], currentYear: 2026,
  },
  {
    slug: 'elss-vs-nps-calculator', status: 'tax_rule_review',
    methodology: 'India-specific scenario comparison of ELSS and NPS contributions, growth, liquidity and modeled tax effects.',
    limitations: ['Tax treatment depends on the taxpayer’s regime and current Indian tax rules.', 'NPS withdrawal and annuity rules are product/regulation dependent.', 'Historical return assumptions are not forecasts.'],
    sources: [{ title: 'Income Tax Department — India', url: INDIA_INCOME_TAX }], currentYear: 2026,
  },
  {
    slug: 'elss-vs-ppf-calculator', status: 'tax_rule_review',
    methodology: 'India-specific scenario comparison of ELSS and PPF using contribution, return, lock-in and tax assumptions.',
    limitations: ['PPF rates and rules are notified by the Government of India and can change.', 'ELSS returns are market-linked and not guaranteed.', 'Tax treatment depends on the applicable tax regime.'],
    sources: [{ title: 'Income Tax Department — India', url: INDIA_INCOME_TAX }], currentYear: 2026,
  },
  {
    slug: 'emergency-fund-calculator', status: 'reviewed',
    methodology: 'Emergency-reserve target based on essential monthly expenses and selected months of coverage.',
    limitations: ['There is no universal correct number of months; job stability, dependents, insurance and access to credit affect the appropriate target.'],
    sources: [{ title: 'CFPB — Emergency Savings', url: `${CFPB}/consumer-tools/saving/` }], currentYear: 2026,
  },
  {
    slug: 'emergency-fund-hysa-calculator', status: 'custom_estimate',
    methodology: 'Emergency-fund growth scenario comparing a cash reserve with a high-yield savings rate.',
    limitations: ['Savings APYs can change.', 'Deposit insurance and account terms vary by institution; the calculator does not verify FDIC coverage for a specific account.'],
    sources: [{ title: 'FDIC — Deposit Insurance', url: 'https://www.fdic.gov/resources/deposit-insurance/' }], currentYear: 2026,
  },
  {
    slug: 'emi-calculator', status: 'reviewed',
    methodology: 'Standard reducing-balance EMI/amortization calculation from principal, annual interest rate and tenure.',
    limitations: ['Processing fees, insurance, taxes, floating-rate changes and lender-specific charges are outside the core EMI formula.'],
    sources: [], currentYear: 2026,
  },
  {
    slug: 'emi-vs-sip-calculator', status: 'custom_estimate',
    methodology: 'India-oriented scenario comparing loan EMI cash flow with a SIP investment scenario.',
    limitations: ['SIP returns are market-linked assumptions, not guarantees.', 'Loan rate, taxes and investment taxation vary by product and borrower.'],
    sources: [{ title: 'SEBI — Investor Education', url: 'https://investor.sebi.gov.in/' }], currentYear: 2026,
  },
  {
    slug: 'epf-vs-nps-calculator', status: 'tax_rule_review',
    methodology: 'India-specific retirement comparison using EPF and NPS contribution, growth and tax assumptions.',
    limitations: ['EPF interest and NPS returns/rules can change.', 'Withdrawal, annuity and tax treatment must be checked against current rules and the user’s employment status.'],
    sources: [{ title: 'EPFO — Employees Provident Fund Organisation', url: 'https://www.epfindia.gov.in/' }, { title: 'PFRDA — National Pension System', url: 'https://www.pfrda.org.in/' }], currentYear: 2026,
  },
  {
    slug: 'equity-compensation-calculator', status: 'tax_rule_review',
    methodology: 'RSU vesting-value scenario using shares, vesting schedule, assumed fair-market value and user-entered tax rate.',
    limitations: ['RSU taxation generally occurs at vesting based on fair market value, but actual withholding and final tax can differ.', 'The calculator does not implement ISO/NSO option taxation or state/local tax rules.'],
    sources: [{ title: 'IRS — Restricted Property', url: `${IRS}/pub/irs-pdf/p525.pdf` }], currentYear: 2026,
  },
  {
    slug: 'equity-indexed-annuity-calculator', status: 'custom_estimate',
    methodology: 'Scenario crediting model using index return, participation rate, cap and floor assumptions.',
    limitations: ['Actual indexed-annuity contracts differ materially in crediting method, spreads, fees, surrender charges, riders and participation terms.', 'A floor on indexed interest crediting does not mean the contract has no fees or loss exposure.'],
    sources: [{ title: 'FINRA — Annuities', url: `${FINRA}/investors/investing/investment-products/insurance/annuities` }], currentYear: 2026,
  },
  {
    slug: 'esop-value-calculator', status: 'custom_estimate',
    methodology: 'Employee-stock-ownership scenario using shares/units, valuation assumptions and ownership changes.',
    limitations: ['Actual ESOP value, distributions, diversification rights and tax treatment depend on the plan and company valuation.', 'Private-company valuations are not continuously observable market prices.'],
    sources: [{ title: 'U.S. Department of Labor — ESOPs', url: `${DOL}/agencies/ebsa/about-ebsa/our-activities/resource-center/faqs/employee-stock-ownership-plans` }], currentYear: 2026,
  },
  {
    slug: 'estate-liquidity-calculator', status: 'tax_rule_review',
    methodology: 'Estate cash-needs scenario for taxes, debts, administration expenses and other liquidity requirements.',
    limitations: ['Federal and state estate-tax exposure depends on the estate, jurisdiction, ownership structure and applicable exemptions.', 'Life-insurance ownership and estate inclusion can be complex.'],
    sources: [{ title: 'IRS — Estate Tax', url: `${IRS}/businesses/small-businesses-self-employed/estate-tax` }], currentYear: 2026,
  },
  {
    slug: 'estate-planning-checklist-calculator', status: 'custom_estimate',
    methodology: 'Checklist-based estate-planning readiness score.',
    limitations: ['A checklist score cannot establish legal validity, document coordination, tax compliance or state-law sufficiency.'],
    sources: [{ title: 'Consumer Financial Protection Bureau — Planning for later life', url: `${CFPB}/consumer-tools/` }], currentYear: 2026,
  },
  {
    slug: 'estate-probate-calculator', status: 'needs_manual_review',
    methodology: 'State-specific probate-cost scenario using user-entered estate value and simplified fee assumptions.',
    limitations: ['Probate fees and procedures vary materially by state and estate complexity.', 'California statutory fees are not a universal proxy for probate costs nationwide.', 'Attorney and executor compensation can be governed by different rules and arrangements.'],
    sources: [{ title: 'California Courts — Probate', url: 'https://selfhelp.courts.ca.gov/probate' }], currentYear: 2026,
  },
]

export const FINANCE_BATCH_04_SLUGS = FINANCE_BATCH_04.map((profile) => profile.slug)
