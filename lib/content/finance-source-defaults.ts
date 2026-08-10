export type YMYLSource = { title: string; url: string }

const SOURCES: Record<string, YMYLSource[]> = {
  tax: [{ title: 'IRS — Tax Information for Individuals', url: 'https://www.irs.gov/individuals' }],
  retirement: [{ title: 'IRS — Retirement Plans', url: 'https://www.irs.gov/retirement-plans' }, { title: 'U.S. Department of Labor — Retirement Plans', url: 'https://www.dol.gov/general/topic/retirement' }],
  mortgage: [{ title: 'CFPB — Mortgages', url: 'https://www.consumerfinance.gov/consumer-tools/mortgages/' }],
  debt: [{ title: 'CFPB — Consumer Credit', url: 'https://www.consumerfinance.gov/consumer-tools/credit-reports-and-scores/' }],
  student: [{ title: 'Federal Student Aid — Managing Your Loans', url: 'https://studentaid.gov/manage-loans' }],
  socialSecurity: [{ title: 'Social Security Administration — Retirement Benefits', url: 'https://www.ssa.gov/retirement' }],
  medicare: [{ title: 'Medicare.gov — Medicare Costs and Coverage', url: 'https://www.medicare.gov/' }],
  investing: [{ title: 'Investor.gov — Investing', url: 'https://www.investor.gov/introduction-investing' }, { title: 'FINRA — Investing', url: 'https://www.finra.org/investors' }],
  treasury: [{ title: 'U.S. Treasury — Treasury Securities', url: 'https://www.treasurydirect.gov/marketable-securities/' }],
  insurance: [{ title: 'NAIC — Insurance Consumer Resources', url: 'https://content.naic.org/consumer' }],
  housing: [{ title: 'HUD — Housing Resources', url: 'https://www.hud.gov/' }],
  business: [{ title: 'U.S. Small Business Administration — Manage Your Business', url: 'https://www.sba.gov/business-guide/manage-your-business' }],
  general: [{ title: 'Consumer Financial Protection Bureau — Consumer Tools', url: 'https://www.consumerfinance.gov/consumer-tools/' }],
}

export function getFinanceYMYLSourceDefaults(slug: string): YMYLSource[] {
  const s = slug.toLowerCase()
  if (/(tax|taxable|taxation|gst|vat|income-tax|capital-gains|withholding|deduction|irs|fica|paycheck)/.test(s)) return SOURCES.tax
  if (/(401k|403b|ira|roth|retirement|pension|fire|annuity|rmd|sepp|social-security)/.test(s)) return s.includes('social-security') ? SOURCES.socialSecurity : SOURCES.retirement
  if (/(mortgage|home-loan|heloc|refinance|closing-cost|property-loan)/.test(s)) return SOURCES.mortgage
  if (/(real-estate|property|rent-vs-buy|home-value|housing)/.test(s)) return SOURCES.housing
  if (/(student-loan|student-debt|education-loan)/.test(s)) return SOURCES.student
  if (/(credit-card|credit-score|debt|loan|apr|interest|auto-loan|car-loan|personal-loan)/.test(s)) return SOURCES.debt
  if (/(medicare|healthcare|health-insurance|hsa|fsa)/.test(s)) return SOURCES.medicare
  if (/(social-security|ssa)/.test(s)) return SOURCES.socialSecurity
  if (/(treasury|t-bill|t-bond|t-note|government-bond)/.test(s)) return SOURCES.treasury
  if (/(stock|stocks|etf|mutual|fund|bond|invest|portfolio|dividend|capital-asset|roi|return|compound|npv|irr|valuation|crypto|bitcoin)/.test(s)) return SOURCES.investing
  if (/(insurance|premium|deductible|copay|coverage)/.test(s)) return SOURCES.insurance
  if (/(business|startup|cash-flow|break-even|profit|revenue|payroll)/.test(s)) return SOURCES.business
  return SOURCES.general
}
