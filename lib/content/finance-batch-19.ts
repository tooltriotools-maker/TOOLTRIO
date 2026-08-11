import type { FinanceQualityProfile } from './finance-quality'

const IRS = 'https://www.irs.gov'
const GOVUK = 'https://www.gov.uk'
const TREASURY = 'https://www.treasurydirect.gov'

const profiles: FinanceQualityProfile[] = [
  {
    slug: 'us-real-estate-vs-reits-calculator', status: 'custom_estimate',
    methodology: 'US scenario comparison of direct real-estate and REIT investment using user-entered price, financing, income, costs, appreciation and return assumptions.',
    limitations: ['Property taxes, depreciation, REIT distributions, financing, transaction costs and state taxes are simplified.', 'Historical market returns are not forecasts or recommendations.'],
    sources: [{ title: 'IRS — Rental income and expenses', url: `${IRS}/businesses/small-businesses-self-employed/rental-income-and-expenses-real-estate-tax-tips` }], currentYear: 2026,
  },
  {
    slug: 'vacation-rental-roi-calculator', status: 'custom_estimate',
    methodology: 'Short-term-rental ROI scenario using occupancy, nightly rate, operating costs, financing and property assumptions.',
    limitations: ['Local lodging taxes, permits, platform fees, seasonality, occupancy and deductible expenses vary materially.', 'This is a planning model, not an investment recommendation.'],
    sources: [], currentYear: 2026,
  },
  {
    slug: 'vanguard-vs-fidelity-etf-calculator', status: 'custom_estimate',
    methodology: 'Investment-cost comparison using user-entered fund expense ratios, returns, contributions and time horizon.',
    limitations: ['Vanguard and Fidelity offer different fund structures; ticker selection, tracking difference, taxes and account availability can change the outcome.', 'Past returns are not forecasts.'],
    sources: [], currentYear: 2026,
  },
  {
    slug: 'variable-annuity-fee-calculator', status: 'custom_estimate',
    methodology: 'Scenario comparison of variable-annuity fee drag against a lower-cost investment alternative using user-entered charges and returns.',
    limitations: ['Actual M&E, administrative, rider, surrender, fund and contract charges vary by product.', 'Guarantees and tax treatment are contract-specific.'],
    sources: [], currentYear: 2026,
  },
  {
    slug: 'vat-calculator-europe', status: 'reviewed',
    methodology: 'Forward and reverse VAT arithmetic using the selected jurisdiction and rate.',
    limitations: ['VAT rates, exemptions, reduced rates, place-of-supply rules and registration obligations vary by country and transaction.', 'The calculator does not determine legal VAT classification.'],
    sources: [{ title: 'European Commission — VAT rates', url: 'https://taxation-customs.ec.europa.eu/taxation/vat/vat-rates_en' }, { title: 'GOV.UK — VAT rates', url: `${GOVUK}/vat-rates` }], currentYear: 2026,
  },
  {
    slug: 'vesting-schedule-calculator', status: 'custom_estimate',
    methodology: 'Equity or employer-benefit vesting projection from grant date, vesting period, cliff and periodic vesting assumptions.',
    limitations: ['Actual vesting is governed by the plan or award agreement; acceleration, forfeiture and termination rules can differ.'],
    sources: [], currentYear: 2026,
  },
  {
    slug: 'w2-vs-1099-calculator', status: 'reviewed',
    methodology: 'Simplified worker-classification financial comparison of employee compensation versus independent-contractor income and associated taxes/benefits.',
    limitations: ['Worker classification is determined by applicable facts and law, not by the parties simply choosing W-2 or 1099.', 'Benefits, deductions, state taxes and business expenses are simplified.'],
    sources: [{ title: 'IRS — Independent contractor or employee', url: `${IRS}/businesses/small-businesses-self-employed/independent-contractor-defined` }], currentYear: 2026,
  },
  {
    slug: 'wage-garnishment-calculator',
    status: 'reviewed',
    methodology: 'Federal CCPA ordinary-debt ceiling from disposable weekly earnings; the calculator does not infer disposable income from gross pay and does not model IRS levies as a percentage.',
    limitations: ['State law can be more protective than federal law.', 'Child support, tax levies, bankruptcy and student-loan collections have different rules.', 'Actual disposable earnings must be determined from the applicable pay-period rules.'],
    sources: [{ title: 'U.S. Department of Labor — CCPA wage garnishment limits', url: 'https://www.dol.gov/agencies/whd/fact-sheets/30-cppa' },{ title: 'IRS Publication 1494 — 2026 wage levy tables', url: 'https://www.irs.gov/pub/irs-pdf/p1494.pdf' }],
    currentYear: 2026,
  },
  {
    slug: 'wash-sale-calculator', status: 'tax_rule_review',
    methodology: 'Simplified capital-loss wash-sale scenario based on sale date, replacement purchase window and loss amount.',
    limitations: ['Actual wash-sale treatment can involve substantially identical securities, spouse/IRA transactions and basis adjustments; the calculator is not Form 8949 logic.'],
    sources: [{ title: 'IRS — Publication 550', url: `${IRS}/publications/p550` }], currentYear: 2026,
  },
  {
    slug: 'wealth-building-comparison-calculator', status: 'custom_estimate',
    methodology: 'Long-term wealth scenario comparing user-entered savings, investment returns, debt and time-horizon assumptions.',
    limitations: ['Return, inflation, tax, debt and savings assumptions are hypothetical; the result is not a guaranteed wealth outcome.'],
    sources: [], currentYear: 2026,
  },
  {
    slug: 'wealth-calculator', status: 'custom_estimate',
    methodology: 'Net-worth and wealth projection from user-entered assets, liabilities, savings, returns and time horizon.',
    limitations: ['Investment returns, inflation, taxes, liabilities and asset values are assumptions; the result is a planning estimate.'],
    sources: [], currentYear: 2026,
  },
  {
    slug: 'wealth-transfer-calculator', status: 'tax_rule_review',
    methodology: 'Simplified estate and gift planning scenario using asset growth, gifts and a modeled federal estate-tax exclusion.',
    limitations: ['Trust structures, valuation, lifetime gifts, portability, state estate taxes and applicable deductions can materially change actual liability.', 'This is not a Form 706 or legal trust-planning determination.'],
    sources: [{ title: 'IRS — Estate tax', url: `${IRS}/businesses/small-businesses-self-employed/estate-tax` }, { title: 'IRS — Gift tax', url: `${IRS}/businesses/small-businesses-self-employed/gift-tax` }], currentYear: 2026,
  },
  {
    slug: 'wedding-budget-calculator', status: 'custom_estimate',
    methodology: 'Wedding budget allocation from user-entered guest count, total budget and category assumptions.',
    limitations: ['Vendor prices vary substantially by location, season, guest count and service level; category percentages are planning assumptions, not market quotes.'],
    sources: [], currentYear: 2026,
  },
  {
    slug: 'weekly-budget-calculator', status: 'custom_estimate',
    methodology: 'Weekly cash-flow and spending-plan model that converts user-entered income and expenses into weekly targets.',
    limitations: ['Food, housing, transportation and discretionary spending vary by household and location; benchmark amounts are not required spending levels.'],
    sources: [], currentYear: 2026,
  },
  {
    slug: 'whole-market-vs-sp500-calculator', status: 'custom_estimate',
    methodology: 'US equity scenario comparison between a total-market portfolio and an S&P 500 portfolio using user-entered return, fee, contribution and horizon assumptions.',
    limitations: ['Historical performance is not predictive; concentration, valuation, taxes, fees and fund-specific tracking differences are simplified.'],
    sources: [], currentYear: 2026,
  },
  {
    slug: 'xirr-calculator', status: 'reviewed',
    methodology: 'Annualized internal-rate-of-return calculation for irregularly dated cash flows using actual dates and signed cash-flow amounts.',
    limitations: ['XIRR can have multiple roots or fail to converge for some cash-flow patterns; the result is a mathematical return measure, not a tax or investment recommendation.'],
    sources: [], currentYear: 2026,
  },
]

export const FINANCE_BATCH_19 = profiles
export const FINANCE_BATCH_19_SLUGS = profiles.map(p => p.slug)
