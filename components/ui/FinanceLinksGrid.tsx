import Link from 'next/link'

interface CalcLink {
  name: string
  href: string
  icon: string
  cat: string
}

const ALL_FINANCE_CALCS: CalcLink[] = [
  // Core US Finance
  { name: 'Mortgage Calculator', href: '/calculators/finance/mortgage-calculator', icon: '🏡', cat: 'Mortgage' },
  { name: 'Home Loan Calculator', href: '/calculators/finance/home-loan-calculator', icon: '🏠', cat: 'Mortgage' },
  { name: 'Biweekly Mortgage', href: '/calculators/finance/biweekly-mortgage-calculator', icon: '📅', cat: 'Mortgage' },
  { name: 'Down Payment Calculator', href: '/calculators/finance/down-payment-calculator', icon: '💵', cat: 'Mortgage' },
  { name: 'Closing Cost Calculator', href: '/calculators/finance/closing-cost-calculator', icon: '📋', cat: 'Mortgage' },
  { name: 'Mortgage Refinance', href: '/calculators/finance/mortgage-refinance-calculator', icon: '🔄', cat: 'Mortgage' },
  { name: 'Home Affordability', href: '/calculators/finance/home-affordability-calculator', icon: '💰', cat: 'Mortgage' },
  { name: 'HELOC Calculator', href: '/calculators/finance/heloc-calculator', icon: '🏘️', cat: 'Mortgage' },
  { name: 'Rent vs Buy', href: '/calculators/finance/rent-vs-buy-calculator', icon: '🔄', cat: 'Mortgage' },
  { name: 'Cash-Out Refi vs HELOC', href: '/calculators/finance/cash-out-refinance-vs-heloc-calculator', icon: '💱', cat: 'Mortgage' },
  // Loans
  { name: 'Auto Loan Calculator', href: '/calculators/finance/auto-loan-calculator', icon: '🚗', cat: 'Loans' },
  { name: 'Car Loan Calculator', href: '/calculators/finance/car-loan-calculator', icon: '🚙', cat: 'Loans' },
  { name: 'Personal Loan Calculator', href: '/calculators/finance/personal-loan-calculator', icon: '💳', cat: 'Loans' },
  { name: 'Student Loan Calculator', href: '/calculators/finance/student-loan-calculator', icon: '🎓', cat: 'Loans' },
  { name: 'Business Loan Calculator', href: '/calculators/finance/business-loan-calculator', icon: '🏢', cat: 'Loans' },
  { name: 'EMI Calculator', href: '/calculators/finance/emi-calculator', icon: '🏦', cat: 'Loans' },
  { name: 'Loan Comparison', href: '/calculators/finance/loan-comparison-calculator', icon: '⚖️', cat: 'Loans' },
  { name: 'Interest Rate Calculator', href: '/calculators/finance/interest-rate-calculator', icon: '📈', cat: 'Loans' },
  { name: 'Loan Prepayment', href: '/calculators/finance/loan-prepayment-calculator', icon: '⚡', cat: 'Loans' },
  { name: 'Payoff Date Calculator', href: '/calculators/finance/payoff-date-calculator', icon: '📅', cat: 'Loans' },
  { name: 'Car Depreciation', href: '/calculators/finance/car-depreciation-calculator', icon: '📉', cat: 'Loans' },
  { name: 'Lease vs Buy', href: '/calculators/finance/lease-vs-buy-calculator', icon: '🔑', cat: 'Loans' },
  // Retirement
  { name: '401k Calculator', href: '/calculators/finance/401k-calculator', icon: '🏛️', cat: 'Retirement' },
  { name: 'Roth IRA Calculator', href: '/calculators/finance/roth-ira-calculator', icon: '🛡️', cat: 'Retirement' },
  { name: 'Retirement Calculator', href: '/calculators/finance/retirement-calculator', icon: '🌅', cat: 'Retirement' },
  { name: 'Social Security', href: '/calculators/finance/social-security-calculator', icon: '🏛️', cat: 'Retirement' },
  { name: 'FIRE Calculator', href: '/calculators/finance/fire-calculator', icon: '🔥', cat: 'Retirement' },
  { name: 'Roth Conversion', href: '/calculators/finance/roth-conversion-calculator', icon: '🔄', cat: 'Retirement' },
  { name: '401k vs Roth IRA', href: '/calculators/finance/401k-vs-roth-ira-calculator', icon: '⚖️', cat: 'Retirement' },
  { name: 'HSA Calculator', href: '/calculators/finance/hsa-calculator', icon: '🏥', cat: 'Retirement' },
  { name: 'Savings Rate Calculator', href: '/calculators/finance/savings-rate-calculator', icon: '💰', cat: 'Retirement' },
  { name: 'Annuity vs Lumpsum', href: '/calculators/finance/annuity-vs-lumpsum-calculator', icon: '📊', cat: 'Retirement' },
  { name: 'SEP IRA vs Solo 401k', href: '/calculators/finance/sep-ira-vs-solo-401k-calculator', icon: '💼', cat: 'Retirement' },
  // Tax
  { name: 'Tax Bracket Calculator', href: '/calculators/finance/tax-bracket-calculator', icon: '🧾', cat: 'Tax' },
  { name: 'Income Tax Calculator', href: '/calculators/finance/income-tax-calculator', icon: '📋', cat: 'Tax' },
  { name: 'Paycheck Calculator', href: '/calculators/finance/paycheck-calculator', icon: '💵', cat: 'Tax' },
  { name: 'Annual Income Calculator', href: '/calculators/finance/annual-income-calculator', icon: '💰', cat: 'Tax' },
  { name: 'Salary Calculator', href: '/calculators/finance/salary-calculator', icon: '💼', cat: 'Tax' },
  // Budget & Savings
  { name: 'Budget Planner', href: '/calculators/finance/budget-planner-calculator', icon: '📊', cat: 'Budget' },
  { name: 'Budget Calculator', href: '/calculators/finance/budget-calculator', icon: '📋', cat: 'Budget' },
  { name: 'Weekly Budget', href: '/calculators/finance/weekly-budget-calculator', icon: '📆', cat: 'Budget' },
  { name: 'Emergency Fund', href: '/calculators/finance/emergency-fund-calculator', icon: '🛡️', cat: 'Budget' },
  { name: 'Savings Goal', href: '/calculators/finance/savings-goal-calculator', icon: '🎯', cat: 'Budget' },
  { name: 'Wealth Calculator', href: '/calculators/finance/wealth-calculator', icon: '💎', cat: 'Budget' },
  { name: 'Net Worth Calculator', href: '/calculators/finance/net-worth-calculator', icon: '⚖️', cat: 'Budget' },
  // Debt
  { name: 'Debt Payoff Calculator', href: '/calculators/finance/debt-payoff-calculator', icon: '🔓', cat: 'Debt' },
  { name: 'Credit Card Payoff', href: '/calculators/finance/credit-card-payoff-calculator', icon: '💳', cat: 'Debt' },
  // Investment
  { name: 'Compound Interest', href: '/calculators/finance/compound-interest-calculator', icon: '📈', cat: 'Investing' },
  { name: 'CAGR Calculator', href: '/calculators/finance/cagr-calculator', icon: '📊', cat: 'Investing' },
  { name: 'Stock Profit Calculator', href: '/calculators/finance/stock-profit-calculator', icon: '💹', cat: 'Investing' },
  { name: 'Dividend Calculator', href: '/calculators/finance/dividend-calculator', icon: '💰', cat: 'Investing' },
  { name: 'Inflation Calculator', href: '/calculators/finance/inflation-calculator', icon: '📉', cat: 'Investing' },
  { name: 'Real Return Calculator', href: '/calculators/finance/real-return-calculator', icon: '📊', cat: 'Investing' },
  { name: 'ROI Calculator', href: '/calculators/finance/roi-calculator', icon: '📈', cat: 'Investing' },
  { name: 'Lumpsum Calculator', href: '/calculators/finance/lumpsum-calculator', icon: '💰', cat: 'Investing' },
  { name: 'Dollar Cost Averaging', href: '/calculators/finance/dollar-cost-averaging-vs-lumpsum-usa-calculator', icon: '📊', cat: 'Investing' },
  { name: 'Index Fund vs ETF', href: '/calculators/finance/index-fund-vs-etf-calculator', icon: '📈', cat: 'Investing' },
  { name: 'S&P500 vs Bonds', href: '/calculators/finance/sp500-vs-bonds-calculator', icon: '📊', cat: 'Investing' },
  { name: 'S&P500 vs Real Estate', href: '/calculators/finance/sp500-vs-real-estate-usa-calculator', icon: '🏠', cat: 'Investing' },
  { name: 'Bonds vs CDs USA', href: '/calculators/finance/bonds-vs-cds-usa-calculator', icon: '🏦', cat: 'Investing' },
  { name: 'I-Bonds vs TIPS', href: '/calculators/finance/i-bonds-vs-tips-calculator', icon: '🏛️', cat: 'Investing' },
  { name: 'Government Bond', href: '/calculators/finance/government-bond-calculator', icon: '📋', cat: 'Investing' },
  { name: 'CD Ladder Calculator', href: '/calculators/finance/cd-ladder-calculator', icon: '🏦', cat: 'Investing' },
  { name: 'CD vs HYSA', href: '/calculators/finance/cd-vs-hysa-calculator', icon: '💰', cat: 'Investing' },
  { name: 'Crypto Profit', href: '/calculators/finance/crypto-profit-calculator', icon: '₿', cat: 'Investing' },
  { name: 'P/E Ratio Calculator', href: '/calculators/finance/pe-ratio-calculator', icon: '📊', cat: 'Investing' },
  // Real Estate
  { name: 'Real Estate ROI', href: '/calculators/finance/real-estate-roi-calculator', icon: '🏠', cat: 'Real Estate' },
  { name: 'Rental Yield', href: '/calculators/finance/rental-yield-calculator', icon: '🏘️', cat: 'Real Estate' },
  { name: 'REIT vs Property', href: '/calculators/finance/reit-vs-direct-property-usa-calculator', icon: '🏢', cat: 'Real Estate' },
  { name: 'Mortgage vs Renting', href: '/calculators/finance/mortgage-vs-renting-usa-calculator', icon: '🔄', cat: 'Real Estate' },
  // College & Kids
  { name: 'College Cost Calculator', href: '/calculators/finance/college-cost-calculator', icon: '🎓', cat: 'College' },
  { name: '529 vs Roth IRA', href: '/calculators/finance/529-vs-roth-ira-education-calculator', icon: '📚', cat: 'College' },
  { name: 'Education Goal', href: '/calculators/finance/education-goal-calculator', icon: '🎯', cat: 'College' },
  // Business
  { name: 'Break-Even Calculator', href: '/calculators/finance/break-even-calculator', icon: '⚖️', cat: 'Business' },
  { name: 'Invoice Calculator', href: '/calculators/finance/invoice-calculator', icon: '🧾', cat: 'Business' },
  { name: 'Pay Off Mortgage vs Invest', href: '/calculators/finance/pay-off-mortgage-vs-invest-calculator', icon: '💡', cat: 'Business' },
  { name: 'Refinance vs Invest', href: '/calculators/finance/refinance-vs-invest-calculator', icon: '🔄', cat: 'Business' },
]

const CATEGORIES = ['Mortgage', 'Loans', 'Retirement', 'Tax', 'Budget', 'Debt', 'Investing', 'Real Estate', 'College', 'Business']

interface FinanceLinksGridProps {
  title?: string
  excludeHref?: string
  showCategories?: boolean
}

export function FinanceLinksGrid({
  title = '🔗 All Finance Calculators',
  excludeHref,
  showCategories = true,
}: FinanceLinksGridProps) {
  const calcs = excludeHref
    ? ALL_FINANCE_CALCS.filter(c => c.href !== excludeHref)
    : ALL_FINANCE_CALCS

  if (!showCategories) {
    return (
      <div className="my-8 p-5 bg-gray-50 border border-gray-200 rounded-2xl">
        <h3 className="text-base font-bold text-gray-800 mb-4">{title}</h3>
        <div className="flex flex-wrap gap-2">
          {calcs.map(c => (
            <Link key={c.href} href={c.href}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:border-green-300 hover:text-green-700 hover:bg-green-50 transition-all">
              <span>{c.icon}</span>{c.name}
            </Link>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-3">{calcs.length} free calculators -- no signup required</p>
      </div>
    )
  }

  return (
    <div className="my-8">
      <h3 className="text-lg font-bold text-gray-900 mb-5">{title}</h3>
      {CATEGORIES.map(cat => {
        const catCalcs = calcs.filter(c => c.cat === cat)
        if (!catCalcs.length) return null
        return (
          <div key={cat} className="mb-5">
            <h4 className="text-xs font-bold text-green-700 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-4 h-px bg-green-300 inline-block" />{cat}
            </h4>
            <div className="flex flex-wrap gap-2">
              {catCalcs.map(c => (
                <Link key={c.href} href={c.href}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-100 rounded-lg text-xs font-semibold text-gray-700 hover:border-green-300 hover:text-green-700 hover:bg-green-50 transition-all shadow-sm">
                  <span>{c.icon}</span>{c.name}
                </Link>
              ))}
            </div>
          </div>
        )
      })}
      <p className="text-xs text-gray-400 mt-2">{calcs.length} free finance calculators -- updated 2026</p>
    </div>
  )
}
