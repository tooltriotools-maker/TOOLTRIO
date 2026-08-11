export type FinanceQualityStatus =
  | 'reviewed'
  | 'formula_review'
  | 'tax_rule_review'
  | 'custom_estimate'
  | 'needs_manual_review'

export interface FinanceQualityProfile {
  slug: string
  status: FinanceQualityStatus
  methodology: string
  limitations: string[]
  sources: Array<{ title: string; url: string; accessed?: string }>
  currentYear?: number
}

const IRS = 'https://www.irs.gov'
const PBGC = 'https://www.pbgc.gov'

export const FINANCE_BATCH_01: FinanceQualityProfile[] = [
  {
    slug: '401k-calculator',
    status: 'reviewed',
    methodology: 'Compound-growth projection using user-entered salary, contribution rate, employer match, salary growth, and investment return. Tax-law limits are displayed separately and are not silently imposed on the projection.',
    limitations: ['Employer plan rules vary.', 'The projection is not a tax-return calculation.', '2026 contribution limits differ by age and plan type.'],
    sources: [{ title: 'IRS 401(k) contribution limits', url: `${IRS}/retirement-plans/plan-participant-employee/retirement-topics-401k-and-profit-sharing-plan-contribution-limits` }],
    currentYear: 2026,
  },
  {
    slug: '401k-early-withdrawal-vs-loan-calculator', status: 'reviewed',
    methodology: 'Scenario comparison of modeled early-distribution cash received and modeled 401(k)-loan repayment cost using explicit user-entered tax, penalty, rate, return and time assumptions.',
    limitations: ['Plan terms vary.', 'Tax and penalty exceptions can change the result.', 'Loan treatment after separation from service depends on plan and applicable law.'],
    sources: [{ title: 'IRS retirement plan distributions', url: `${IRS}/retirement-plans` }], currentYear: 2026,
  },
  {
    slug: '401k-vs-pension-calculator', status: 'reviewed',
    methodology: 'Retirement-income comparison between a defined-contribution projection and a defined-benefit pension assumption.',
    limitations: ['PBGC guarantees apply only to eligible private defined-benefit plans and are subject to statutory limits.', 'Government pensions have different protection rules.'],
    sources: [{ title: 'PBGC maximum guarantee tables', url: `${PBGC}/workers-retirees/learn/guaranteed-benefits/monthly-maximum` }], currentYear: 2026,
  },
  {
    slug: '401k-vs-roth-ira-calculator', status: 'reviewed',
    methodology: 'After-tax retirement comparison using contribution limits, tax assumptions, and projected growth.',
    limitations: ['Roth eligibility depends on filing status and modified AGI.', 'Traditional-versus-Roth outcomes depend on current and future tax rates.'],
    sources: [{ title: 'IRS 2026 retirement contribution adjustments', url: `${IRS}/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500` }], currentYear: 2026,
  },
  {
    slug: '401k-vs-taxable-account-calculator', status: 'custom_estimate',
    methodology: 'Scenario comparison of tax-advantaged retirement investing and taxable investing under user-entered return, tax, and fee assumptions.',
    limitations: ['Actual fund expenses, turnover, capital gains timing, and tax treatment vary.', 'Not a personalized investment recommendation.'],
    sources: [{ title: 'IRS retirement plans', url: `${IRS}/retirement-plans` }], currentYear: 2026,
  },
  {
    slug: '529-to-roth-rollover-calculator', status: 'reviewed',
    methodology: 'Eligibility and projection estimate for the special 529-to-Roth IRA rollover pathway.',
    limitations: ['The $35,000 lifetime limit and annual Roth contribution limit apply.', 'Account-age, contribution-history, earned-income and beneficiary rules must be satisfied.'],
    sources: [{ title: 'IRS Topic 313 — Qualified tuition programs', url: `${IRS}/taxtopics/tc313` }], currentYear: 2026,
  },
  {
    slug: '529-vs-roth-ira-education-calculator', status: 'reviewed',
    methodology: 'Education-funding scenario comparison using user-entered growth, contribution, and tax assumptions.',
    limitations: ['FAFSA treatment depends on ownership and current federal student-aid rules.', 'Tax treatment can differ by state.'],
    sources: [{ title: 'IRS Topic 313 — Qualified tuition programs', url: `${IRS}/taxtopics/tc313` }], currentYear: 2026,
  },
  {
    slug: '529-vs-utma-calculator', status: 'reviewed',
    methodology: 'After-tax education/investment comparison using user-entered assumptions.',
    limitations: ['UTMA tax treatment depends on the child, parent, investment income, and applicable kiddie-tax rules.', 'State 529 benefits vary.'],
    sources: [{ title: 'IRS Topic 313 — Qualified tuition programs', url: `${IRS}/taxtopics/tc313` }], currentYear: 2026,
  },
  {
    slug: '72t-sepp-calculator', status: 'reviewed',
    methodology: 'Illustrative substantially-equal-periodic-payment scenarios using user-entered assumptions.',
    limitations: ['SEPP calculations are governed by specific IRS rules and can create tax consequences if modified improperly.', 'This is not tax advice.'],
    sources: [{ title: 'IRS retirement plans', url: `${IRS}/retirement-plans` }], currentYear: 2026,
  },
  {
    slug: 'alimony-calculator', status: 'reviewed',
    methodology: 'Cash-flow calculation based on user-entered alimony terms and duration.',
    limitations: ['Tax treatment depends on the date and terms of the divorce or separation instrument.', 'State family-law rules vary.'],
    sources: [{ title: 'IRS Topic 452 — Alimony', url: `${IRS}/taxtopics/tc452` }], currentYear: 2026,
  },
  {
    slug: 'alimony-tax-calculator', status: 'reviewed',
    methodology: 'Federal tax-treatment estimate based on the execution/modification date of the divorce or separation instrument.',
    limitations: ['The federal rule differs for instruments executed after 2018 versus earlier instruments.', 'State tax treatment may differ.'],
    sources: [{ title: 'IRS Topic 452 — Alimony', url: `${IRS}/taxtopics/tc452` }], currentYear: 2026,
  },
  {
    slug: 'alternative-minimum-tax-calculator', status: 'reviewed',
    methodology: 'Simplified AMT estimate using 2026 exemption and phase-out assumptions.',
    limitations: ['Actual AMT liability requires Form 6251 computations and additional preference/adjustment rules.', 'This calculator is an estimate.'],
    sources: [{ title: 'IRS Topic 556 — Alternative Minimum Tax', url: `${IRS}/taxtopics/tc556` }, { title: 'IRS — 2026 Tax Inflation Adjustments', url: `${IRS}/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill` }], currentYear: 2026,
  },
  {
    slug: 'annual-bonus-tax-calculator', status: 'reviewed',
    methodology: 'Illustrative federal/state withholding estimate for a bonus payment.',
    limitations: ['Withholding is not the same as final tax liability.', 'State and local withholding rules vary.', 'Supplemental-wage methods and employer payroll settings affect actual withholding.'],
    sources: [{ title: 'IRS Publication 15', url: `${IRS}/publications/p15` }], currentYear: 2026,
  },
  {
    slug: 'annual-income-calculator', status: 'reviewed',
    methodology: 'Annualizes user-entered pay using the selected pay frequency.',
    limitations: ['Does not account for variable hours, bonuses, commissions, or unpaid time unless entered.'],
    sources: [], currentYear: 2026,
  },
  {
    slug: 'annuity-certain-vs-lifetime-calculator', status: 'custom_estimate',
    methodology: 'Present-value and income comparison using user-entered premium, return, payout period, and longevity assumptions.',
    limitations: ['Actual annuity pricing depends on insurer, contract terms, mortality assumptions, interest rates, and optional benefits.'],
    sources: [], currentYear: 2026,
  },
  {
    slug: 'annuity-income-calculator', status: 'custom_estimate',
    methodology: 'Illustrative annuity accumulation and payout estimate based on user-entered assumptions.',
    limitations: ['Actual payout rates are contract-specific and should not be inferred from a generic percentage.'],
    sources: [], currentYear: 2026,
  },
  {
    slug: 'annuity-vs-lumpsum-calculator', status: 'custom_estimate',
    methodology: 'Scenario comparison between guaranteed-style income and an invested lump sum.',
    limitations: ['Longevity, investment returns, inflation, taxes, fees, and insurer guarantees materially affect outcomes.'],
    sources: [], currentYear: 2026,
  },
  {
    slug: 'auto-loan-calculator', status: 'reviewed',
    methodology: 'Standard amortizing-loan payment calculation with user-entered amount, APR, term, and optional fees/down payment.',
    limitations: ['Actual lender APR, taxes, fees, and prepayment rules vary.'],
    sources: [], currentYear: 2026,
  },
  {
    slug: 'backdoor-roth-ira-calculator', status: 'reviewed',
    methodology: 'Illustrative non-deductible traditional IRA contribution and Roth conversion scenario including the pro-rata concept.',
    limitations: ['The pro-rata rule aggregates applicable traditional, SEP and SIMPLE IRA balances.', 'Tax consequences depend on the taxpayer’s full return.'],
    sources: [{ title: 'IRS Publication 590-A', url: `${IRS}/publications/p590a` }], currentYear: 2026,
  },
  {
    slug: 'background-check-roi-calculator', status: 'custom_estimate',
    methodology: 'Business ROI estimate from user-entered hiring volume, screening cost, turnover, and avoided-loss assumptions.',
    limitations: ['Avoided-loss assumptions are user estimates, not measured causal effects.'],
    sources: [], currentYear: 2026,
  },
  {
    slug: 'barista-fire-calculator', status: 'custom_estimate',
    methodology: 'Financial-independence projection using work income, spending, savings, investment return, and transition assumptions.',
    limitations: ['Market returns, taxes, inflation, healthcare, and part-time income are uncertain.'],
    sources: [], currentYear: 2026,
  },
  {
    slug: 'biweekly-mortgage-calculator', status: 'reviewed',
    methodology: 'Amortization comparison between conventional monthly payments and an accelerated biweekly schedule.',
    limitations: ['Servicers may process biweekly payments differently; some programs charge fees or hold partial payments.'],
    sources: [], currentYear: 2026,
  },
  {
    slug: 'bond-ladder-calculator', status: 'custom_estimate',
    methodology: 'Ladder projection using user-entered rung count, investment, rates, and maturities.',
    limitations: ['Actual bond/CD yields, reinvestment rates, taxes, call features, and liquidity vary.'],
    sources: [], currentYear: 2026,
  },
  {
    slug: 'bonds-vs-cds-usa-calculator', status: 'reviewed',
    methodology: 'Illustrative after-tax yield comparison using user-entered federal/state tax assumptions and product yields.',
    limitations: ['Treasury and CD tax treatment, insurance, liquidity, and reinvestment risk differ.', 'Rates are time-sensitive.', 'Treasury securities are backed by the U.S. government; CDs may be FDIC-insured only within applicable coverage limits and ownership categories.'],
    sources: [{ title: 'U.S. Treasury — Treasury securities', url: 'https://www.treasurydirect.gov/marketable-securities/' }, { title: 'FDIC — Deposit Insurance', url: 'https://www.fdic.gov/resources/deposit-insurance/' }], currentYear: 2026,
  },
  {
    slug: 'bonus-depreciation-calculator', status: 'reviewed',
    methodology: 'Illustrative Section 179 and additional first-year depreciation comparison under current federal rules.',
    limitations: ['Eligibility, placed-in-service date, business use, recovery period, conventions, and taxable-income limitations can change the deduction.', 'Not tax-return-ready.'],
    sources: [{ title: 'IRS Publication 946 — How To Depreciate Property', url: `${IRS}/publications/p946` }], currentYear: 2026,
  },
]

export const FINANCE_BATCH_01_SLUGS = FINANCE_BATCH_01.map((profile) => profile.slug)
