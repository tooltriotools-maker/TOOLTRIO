import type { Metadata } from 'next'
import Link from 'next/link'
import CalcFilterBar from '@/components/ui/CalcFilterBar'
import { FinanceYMYLPolicy } from './ymyl-policy'
import { FINANCE_QUALITY_REGISTRY } from '@/lib/content/finance-quality-registry'

// Inline SVG icons — no external package needed in server components
function ArrowRight({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg> }
function Calculator({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="10" y2="10"/><line x1="8" y1="14" x2="10" y2="14"/><line x1="8" y1="18" x2="10" y2="18"/><line x1="14" y1="10" x2="16" y2="10"/><line x1="14" y1="14" x2="16" y2="14"/><line x1="14" y1="18" x2="16" y2="18"/></svg> }
function ChevronRight({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><polyline points="9 18 15 12 9 6"/></svg> }
function Home({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> }
function Target({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg> }
function TrendingUp({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> }
function X({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> }


export const metadata: Metadata = {
  title: 'Finance Calculators — Mortgage, SIP, 401(k), Tax & More | ToolTrio',
  description: 'Finance calculators for USA, UK, India and Europe with transparent assumptions, methodology, limitations and source references. Mortgage, retirement, tax, investing and budgeting tools.',
  keywords: [
    'finance calculators 2026',
    'SIP calculator India',
    'EMI calculator',
    '401k calculator USA',
    'UK income tax calculator 2026',
    'ISA calculator UK',
    'stamp duty calculator',
    'mortgage calculator',
  ],
  alternates: { canonical: 'https://tooltrio.com/calculators/finance' },
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
  openGraph: {
    title: 'Finance Calculators — Mortgage, SIP, 401(k), Tax & More | ToolTrio',
    description: 'Finance calculators with route-level methodology, assumptions, limitations and source references where available.',
    url: 'https://tooltrio.com/calculators/finance',
    siteName: 'ToolTrio',
    type: 'website',
    images: [{ url: 'https://tooltrio.com/og-image.png', width: 1200, height: 630, alt: 'ToolTrio' }],
  },
}

const FINANCE_COUNT = FINANCE_QUALITY_REGISTRY.length

const calculators = [
  // Investment
  { name: 'SIP Calculator', desc: 'Monthly SIP returns with year-wise growth charts', href: '/calculators/finance/sip-calculator', icon: '📈', tag: 'Investment', popular: true },
  { name: 'Lumpsum Calculator', desc: 'One-time investment growth projections', href: '/calculators/finance/lumpsum-calculator', icon: '💼', tag: 'Investment', popular: false },
  { name: 'CAGR Calculator', desc: 'Compound annual growth rate with Rule of 72', href: '/calculators/finance/cagr-calculator', icon: '📉', tag: 'Investment', popular: false },
  { name: 'XIRR Calculator', desc: 'True annualized returns for SIP cashflows', href: '/calculators/finance/xirr-calculator', icon: '📐', tag: 'Advanced', popular: false },
  { name: 'Step-Up SIP', desc: 'SIP with annual increment - build far more wealth', href: '/calculators/finance/step-up-sip-calculator', icon: '🚀', tag: 'Investment', popular: false },
  { name: 'Mutual Fund Returns', desc: 'MF returns adjusted for expense ratio', href: '/calculators/finance/mutual-fund-calculator', icon: '📊', tag: 'Investment', popular: false },
  { name: 'ROI Calculator', desc: 'Return on investment, annualized ROI & multiplier', href: '/calculators/finance/roi-calculator', icon: '📈', tag: 'Investment', popular: false },
  // Loans
  { name: 'Mortgage Calculator', desc: 'Full PITI -- principal, interest, taxes, insurance & PMI', href: '/calculators/finance/mortgage-calculator', icon: '🏡', tag: 'Loan', popular: true },
  { name: 'EMI Calculator', desc: 'Loan EMI & full amortization schedule', href: '/calculators/finance/emi-calculator', icon: '🏦', tag: 'Loan', popular: true },
  { name: 'Home Loan Calculator', desc: 'Mortgage EMI with amortization schedule', href: '/calculators/finance/home-loan-calculator', icon: '🏠', tag: 'Loan', popular: true },
  { name: 'Auto Loan Calculator', desc: 'Car loan with sales tax, trade-in & fees', href: '/calculators/finance/auto-loan-calculator', icon: '🚗', tag: 'Loan', popular: true },
  { name: 'Personal Loan Calculator', desc: 'Personal loan true cost & amortization', href: '/calculators/finance/personal-loan-calculator', icon: '💳', tag: 'Loan', popular: true },
  { name: 'Business Loan Calculator', desc: 'SBA loans, DSCR & business financing', href: '/calculators/finance/business-loan-calculator', icon: '🏢', tag: 'Loan', popular: false },
  { name: 'Car Loan Calculator', desc: 'Auto loan EMI, total interest & schedule', href: '/calculators/finance/car-loan-calculator', icon: '🚗', tag: 'Loan', popular: false },
  { name: 'Loan Comparison Calculator', desc: 'Compare up to 3 loan offers side by side', href: '/calculators/finance/loan-comparison-calculator', icon: '⚖️', tag: 'Loan', popular: true },
  { name: 'Interest Rate Calculator', desc: 'Find APR from loan amount & payment', href: '/calculators/finance/interest-rate-calculator', icon: '📈', tag: 'Loan', popular: false },
  { name: 'Biweekly Mortgage Calculator', desc: 'Save years & interest with biweekly payments', href: '/calculators/finance/biweekly-mortgage-calculator', icon: '📅', tag: 'Loan', popular: true },
  { name: 'Down Payment Calculator', desc: 'Compare 5-20% down -- PMI & monthly payment', href: '/calculators/finance/down-payment-calculator', icon: '💵', tag: 'Loan', popular: true },
  { name: 'Closing Cost Calculator', desc: 'Estimate all 12 types of closing costs', href: '/calculators/finance/closing-cost-calculator', icon: '📋', tag: 'Loan', popular: true },
  { name: 'Payoff Date Calculator', desc: 'When will your loan be paid off?', href: '/calculators/finance/payoff-date-calculator', icon: '🗓️', tag: 'Loan', popular: true },
  { name: 'Loan Prepayment', desc: 'Interest saved & tenure cut by prepaying', href: '/calculators/finance/loan-prepayment-calculator', icon: '⚡', tag: 'Loan', popular: false },
  // Savings
  { name: 'FD / CD Calculator', desc: 'Fixed deposit maturity & interest earned', href: '/calculators/finance/fd-calculator', icon: '🏛️', tag: 'Savings', popular: false },
  { name: 'RD Calculator', desc: 'Recurring deposit maturity & interest', href: '/calculators/finance/rd-calculator', icon: '🏧', tag: 'Savings', popular: false },
  { name: 'PPF Calculator', desc: 'Public Provident Fund with EEE tax benefits', href: '/calculators/finance/ppf-calculator', icon: '🏛️', tag: 'Savings', popular: false },
  { name: 'Savings Goal', desc: 'Monthly savings needed to hit your goal', href: '/calculators/finance/savings-goal-calculator', icon: '🎯', tag: 'Planning', popular: false },
  // Interest
  { name: 'Compound Interest', desc: 'Daily, monthly, quarterly or annual compounding', href: '/calculators/finance/compound-interest-calculator', icon: '💰', tag: 'Interest', popular: false },
  { name: 'Simple Interest', desc: 'SI formula with SI vs CI comparison', href: '/calculators/finance/simple-interest-calculator', icon: '📐', tag: 'Interest', popular: false },
  // Retirement & Planning
  { name: 'Retirement Calculator', desc: 'Corpus needed for a comfortable retirement', href: '/calculators/finance/retirement-calculator', icon: '🌅', tag: 'Planning', popular: true },
  { name: 'NPS Calculator', desc: 'National Pension System corpus & monthly pension', href: '/calculators/finance/nps-calculator', icon: '👴', tag: 'Retirement', popular: false },
  { name: 'SWP Calculator', desc: 'Systematic withdrawal plan for retirement', href: '/calculators/finance/swp-calculator', icon: '💸', tag: 'Retirement', popular: false },
  { name: 'Inflation Calculator', desc: 'Future purchasing power of money', href: '/calculators/finance/inflation-calculator', icon: '📊', tag: 'Planning', popular: false },
  // Tax & Salary
  { name: 'Tax Bracket Calculator 2026', desc: '2026 IRS brackets, marginal vs effective rate, FICA', href: '/calculators/finance/tax-bracket-calculator', icon: '🧾', tag: 'Tax', popular: true },
  { name: 'Roth Conversion Calculator', desc: 'Is Roth conversion worth it? Tax comparison', href: '/calculators/finance/roth-conversion-calculator', icon: '🔄', tag: 'Tax', popular: true },
  { name: 'Income Tax Calculator', desc: 'New vs Old regime tax comparison FY 2026-27', href: '/calculators/finance/income-tax-calculator', icon: '🏛️', tag: 'Tax', popular: true },
  { name: 'GST Calculator', desc: 'CGST, SGST, IGST for all GST rates', href: '/calculators/finance/gst-calculator', icon: '🧾', tag: 'Tax', popular: false },
  { name: 'HRA Calculator', desc: 'House rent allowance tax exemption', href: '/calculators/finance/hra-calculator', icon: '🏠', tag: 'Tax', popular: false },
  { name: 'Salary Calculator', desc: 'CTC to in-hand salary breakdown India', href: '/calculators/finance/salary-calculator', icon: '💼', tag: 'Salary', popular: false },
  { name: 'Gratuity Calculator', desc: 'Gratuity for 5, 10, 15, 20+ years service', href: '/calculators/finance/gratuity-calculator', icon: '🤝', tag: 'Salary', popular: false },
  // Debt & Business
  { name: 'Budget Planner Calculator', desc: '50/30/20 rule -- needs, wants & savings', href: '/calculators/finance/budget-planner-calculator', icon: '📊', tag: 'Planning', popular: true },
  { name: 'Savings Rate Calculator', desc: 'Your savings rate & years to FIRE', href: '/calculators/finance/savings-rate-calculator', icon: '💰', tag: 'Planning', popular: true },
  { name: 'Wealth Calculator', desc: 'Net worth + US benchmarks + growth projection', href: '/calculators/finance/wealth-calculator', icon: '💎', tag: 'Planning', popular: true },
  { name: 'Annual Income Calculator', desc: 'Hourly to annual salary with tax estimate', href: '/calculators/finance/annual-income-calculator', icon: '💵', tag: 'Planning', popular: true },
  { name: 'Weekly Budget Calculator', desc: 'Track 8 spending categories weekly', href: '/calculators/finance/weekly-budget-calculator', icon: '📆', tag: 'Planning', popular: false },
  { name: 'Invoice Calculator', desc: 'Line items, tax, discount & late fees', href: '/calculators/finance/invoice-calculator', icon: '🧾', tag: 'Planning', popular: false },
  { name: 'Net Worth Calculator', desc: 'Assets minus liabilities - your snapshot', href: '/calculators/finance/net-worth-calculator', icon: '⚖️', tag: 'Tracking', popular: false },
  { name: 'Debt Payoff Calculator', desc: 'Avalanche & snowball debt elimination', href: '/calculators/finance/debt-payoff-calculator', icon: '🔓', tag: 'Debt', popular: false },
  { name: 'Break-Even Calculator', desc: 'Break-even units, revenue & profit analysis', href: '/calculators/finance/break-even-calculator', icon: '⚖️', tag: 'Business', popular: false },
  // Utility
  { name: 'Currency Converter', desc: 'Convert between 20+ world currencies', href: '/calculators/finance/currency-converter', icon: '💱', tag: 'Utility', popular: false },
  { name: 'Tip Calculator', desc: 'Tip amount and bill split per person', href: '/calculators/finance/tip-calculator', icon: '🍽️', tag: 'Utility', popular: false },
  { name: 'Budget Calculator', desc: 'Monthly budget planner with 50/30/20 rule', href: '/calculators/finance/budget-calculator', icon: '💰', tag: 'Planning', popular: true },
  { name: 'Stock Profit Calculator', desc: 'Stock trade profit after tax and brokerage', href: '/calculators/finance/stock-profit-calculator', icon: '📈', tag: 'Investment', popular: false },
  { name: 'Home Affordability', desc: 'How much house can you afford? 28/36 rule', href: '/calculators/finance/home-affordability-calculator', icon: '🏡', tag: 'Loans', popular: true },
  { name: 'FIRE Calculator', desc: 'Financial Independence Retire Early number & timeline', href: '/calculators/finance/fire-calculator', icon: '🔥', tag: 'Retirement', popular: true },
  { name: 'Forex Profit Calculator', desc: 'Currency exchange trade profit, pip value and ROI', href: '/calculators/finance/currency-profit-calculator', icon: '💱', tag: 'Utility', popular: false },
  { name: '401k Calculator', desc: 'Employer match, contribution limits, retirement growth', href: '/calculators/finance/401k-calculator', icon: '🏦', tag: 'Retirement', popular: true },
  { name: 'Roth IRA Calculator', desc: 'Tax-free retirement growth and lifetime tax savings', href: '/calculators/finance/roth-ira-calculator', icon: '🛡️', tag: 'Retirement', popular: true },
  { name: 'Social Security Calculator', desc: 'Best age to claim SSA benefits, break-even analysis', href: '/calculators/finance/social-security-calculator', icon: '🏛️', tag: 'Retirement', popular: true },
  { name: 'Paycheck Calculator', desc: 'Take-home pay after federal, state tax, 401k, FICA', href: '/calculators/finance/paycheck-calculator', icon: '💵', tag: 'Salary', popular: true },
  { name: 'Student Loan Calculator', desc: 'Payoff time, interest cost, extra payment savings', href: '/calculators/finance/student-loan-calculator', icon: '🎓', tag: 'Loans', popular: true },
  { name: 'HELOC Calculator', desc: 'Home equity line of credit, LTV and monthly payment', href: '/calculators/finance/heloc-calculator', icon: '🏠', tag: 'Loans', popular: false },
  { name: 'CD Ladder Calculator', desc: 'Certificate of deposit laddering strategy, blended yield', href: '/calculators/finance/cd-ladder-calculator', icon: '🏗️', tag: 'Savings', popular: false },
  { name: 'Dividend Calculator', desc: 'DRIP reinvestment, annual income, portfolio growth', href: '/calculators/finance/dividend-calculator', icon: '💰', tag: 'Investment', popular: false },
  { name: 'Car Depreciation Calculator', desc: 'Vehicle value loss, resale value, cost per mile', href: '/calculators/finance/car-depreciation-calculator', icon: '🚗', tag: 'Utility', popular: false },
  { name: 'College Cost Calculator', desc: '529 plan savings, tuition inflation, monthly needed', href: '/calculators/finance/college-cost-calculator', icon: '🎓', tag: 'Planning', popular: true },
  { name: 'VAT Calculator Europe', desc: 'UK, Germany, France, EU VAT rates - add or remove VAT', href: '/calculators/finance/vat-calculator-europe', icon: '🏷️', tag: 'Europe', popular: true },
  { name: 'UK Stamp Duty Calculator', desc: 'SDLT for England and Wales - first-time buyer, BTL, standard', href: '/calculators/finance/uk-stamp-duty-calculator', icon: '🏠', tag: 'Europe', popular: true },
  { name: 'European Mortgage Calculator', desc: 'UK, German, French mortgage monthly payments and amortisation', href: '/calculators/finance/european-mortgage-calculator', icon: '🏡', tag: 'Europe', popular: true },
  { name: 'ISA Calculator UK', desc: 'Stocks & Shares, Cash and Lifetime ISA tax-free growth', href: '/calculators/finance/isa-calculator', icon: '💷', tag: 'Europe', popular: true },
  { name: 'UK Pension Calculator', desc: 'Workplace pension, auto-enrolment, state pension projection', href: '/calculators/finance/uk-pension-calculator', icon: '🏦', tag: 'Europe', popular: false },
  { name: 'Government Bond Calculator', desc: 'UK Gilts, German Bunds, French OATs - yield to maturity', href: '/calculators/finance/government-bond-calculator', icon: '🏛️', tag: 'Europe', popular: false },
  { name: 'UK Income Tax Calculator', desc: 'PAYE, National Insurance and take-home pay 2026/26', href: '/calculators/finance/uk-income-tax-calculator', icon: '📋', tag: 'Europe', popular: true },
  { name: 'Rental Yield Calculator', desc: 'Gross and net yield, cashflow for UK and EU buy-to-let', href: '/calculators/finance/rental-yield-calculator', icon: '🏘️', tag: 'Europe', popular: false },
  { name: 'Euro Car Finance Calculator', desc: 'PCP, HP and personal loan car finance for UK and Europe', href: '/calculators/finance/euro-auto-loan-calculator', icon: '🚗', tag: 'Europe', popular: false },
  { name: 'FIRE Europe Calculator', desc: 'Financial independence number using European SWR rates', href: '/calculators/finance/fire-europe-calculator', icon: '🔥', tag: 'Europe', popular: true },
  // v12 - 10 new calculators
  { name: 'P/E Ratio Calculator', desc: 'Stock valuation, PEG ratio & fair value estimate', href: '/calculators/finance/pe-ratio-calculator', icon: '📊', tag: 'Investment', popular: true },
  { name: 'Crypto Profit Calculator', desc: 'Crypto buy/sell P&L, ROI & break-even price', href: '/calculators/finance/crypto-profit-calculator', icon: '₿', tag: 'Investment', popular: true },
  { name: 'Emergency Fund Calculator', desc: 'Target fund size & time to build financial safety net', href: '/calculators/finance/emergency-fund-calculator', icon: '🛡️', tag: 'Planning', popular: true },
  { name: 'Rent vs Buy Calculator', desc: 'True total cost: renting vs buying over 10+ years', href: '/calculators/finance/rent-vs-buy-calculator', icon: '🏠', tag: 'Planning', popular: true },
  { name: 'Salary Hike Calculator', desc: 'Raise impact on lifetime earnings & real purchasing power', href: '/calculators/finance/salary-hike-calculator', icon: '💰', tag: 'Salary', popular: false },
  { name: 'Credit Card Payoff', desc: 'Minimum vs accelerated payoff - interest saved & payoff date', href: '/calculators/finance/credit-card-payoff-calculator', icon: '💳', tag: 'Debt', popular: true },
  { name: 'Real Return Calculator', desc: 'Inflation-adjusted real return vs nominal return', href: '/calculators/finance/real-return-calculator', icon: '📉', tag: 'Investment', popular: false },
  { name: 'Real Estate ROI Calculator', desc: 'Cap rate, cash-on-cash & total ROI for rental property', href: '/calculators/finance/real-estate-roi-calculator', icon: '🏘️', tag: 'Investment', popular: true },
  { name: 'Lump Sum vs SIP', desc: 'Which strategy builds more wealth: all-at-once or monthly?', href: '/calculators/finance/lumpsum-vs-sip-calculator', icon: '⚖️', tag: 'Investment', popular: false },
  { name: 'Mortgage Refinance', desc: 'Break-even, monthly savings & net benefit of refinancing', href: '/calculators/finance/mortgage-refinance-calculator', icon: '🔄', tag: 'Loan', popular: false },
  // v13 - 20 India VS calculators
  { name: 'SIP vs FD', desc: 'Monthly SIP mutual fund returns vs Fixed Deposit comparison', href: '/calculators/finance/sip-vs-fd-calculator', icon: '⚖️', tag: 'VS', popular: true },
  { name: 'SIP vs Real Estate', desc: 'Equity SIP vs property investment including rental income', href: '/calculators/finance/sip-vs-real-estate-calculator', icon: '🏠', tag: 'VS', popular: true },
  { name: 'SIP vs Gold', desc: 'SIP vs Gold (SGB, ETF, Physical) post-tax returns', href: '/calculators/finance/sip-vs-gold-calculator', icon: '🥇', tag: 'VS', popular: true },
  { name: 'SIP vs PPF', desc: 'SIP vs PPF with EEE tax status - post-tax comparison', href: '/calculators/finance/sip-vs-ppf-calculator', icon: '🏛️', tag: 'VS', popular: true },
  { name: 'SIP vs NPS', desc: 'SIP vs NPS for retirement - corpus & pension comparison', href: '/calculators/finance/sip-vs-nps-calculator', icon: '🎯', tag: 'VS', popular: true },
  { name: 'SIP vs RD', desc: 'Monthly SIP vs Recurring Deposit returns over time', href: '/calculators/finance/sip-vs-rd-calculator', icon: '📊', tag: 'VS', popular: false },
  { name: 'SIP vs Stocks', desc: 'SIP mutual fund vs direct stock market investing', href: '/calculators/finance/sip-vs-stocks-calculator', icon: '📉', tag: 'VS', popular: false },
  { name: 'SIP vs Crypto', desc: 'SIP vs crypto returns after India 30% flat tax', href: '/calculators/finance/sip-vs-crypto-calculator', icon: '₿', tag: 'VS', popular: false },
  { name: 'SIP vs Bonds', desc: 'SIP vs Government & Corporate Bonds post-tax', href: '/calculators/finance/sip-vs-bonds-calculator', icon: '📜', tag: 'VS', popular: false },
  { name: 'SIP vs Savings Account', desc: 'Opportunity cost of idle money in savings account', href: '/calculators/finance/sip-vs-savings-account-calculator', icon: '🏧', tag: 'VS', popular: true },
  { name: 'EPF vs NPS', desc: 'Employee Provident Fund vs National Pension System', href: '/calculators/finance/epf-vs-nps-calculator', icon: '💼', tag: 'VS', popular: true },
  { name: 'Term vs ULIP', desc: 'Buy Term + Invest vs ULIP - which wins?', href: '/calculators/finance/term-vs-ulip-calculator', icon: '🛡️', tag: 'VS', popular: true },
  { name: 'Mutual Fund vs FD', desc: 'Lumpsum mutual fund vs FD post-tax returns', href: '/calculators/finance/mutual-fund-vs-fd-calculator', icon: '🏦', tag: 'VS', popular: false },
  { name: 'Lumpsum vs Gold', desc: 'One-time mutual fund investment vs Gold (SGB/ETF)', href: '/calculators/finance/lumpsum-vs-gold-calculator', icon: '🥇', tag: 'VS', popular: false },
  { name: 'PPF vs FD', desc: 'PPF EEE tax-free returns vs Fixed Deposit after tax', href: '/calculators/finance/ppf-vs-fd-calculator', icon: '🏛️', tag: 'VS', popular: false },
  { name: 'PPF vs NPS', desc: 'PPF vs NPS for long-term retirement savings', href: '/calculators/finance/ppf-vs-nps-calculator', icon: '⚖️', tag: 'VS', popular: false },
  { name: 'ELSS vs PPF', desc: 'Best 80C tax-saving: ELSS fund vs PPF comparison', href: '/calculators/finance/elss-vs-ppf-calculator', icon: '📈', tag: 'VS', popular: true },
  { name: 'NSC vs FD', desc: 'Post Office NSC vs Bank Fixed Deposit after tax', href: '/calculators/finance/nsc-vs-fd-calculator', icon: '📮', tag: 'VS', popular: false },
  { name: 'EMI vs SIP', desc: 'Home loan EMI vs investing same amount in SIP', href: '/calculators/finance/emi-vs-sip-calculator', icon: '🏡', tag: 'VS', popular: true },
  { name: 'SIP vs Endowment Plan', desc: 'Term + SIP vs Endowment insurance plan returns', href: '/calculators/finance/sip-vs-endowment-calculator', icon: '📋', tag: 'VS', popular: false },
  // v14 - 10 USA VS calculators
  { name: '401k vs Roth IRA', desc: 'Pre-tax 401k vs after-tax Roth IRA - which wins after retirement taxes?', href: '/calculators/finance/401k-vs-roth-ira-calculator', icon: '🇺🇸', tag: 'USA', popular: true },
  { name: 'Roth vs Traditional IRA', desc: 'Roth IRA vs Traditional IRA after-tax retirement wealth', href: '/calculators/finance/roth-ira-vs-traditional-ira-calculator', icon: '💰', tag: 'USA', popular: true },
  { name: 'HSA vs FSA', desc: 'HSA triple tax advantage vs FSA use-it-or-lose-it', href: '/calculators/finance/hsa-vs-fsa-calculator', icon: '🏥', tag: 'USA', popular: true },
  { name: 'S&P 500 vs Bonds', desc: 'S&P 500 index fund vs US bonds long-term wealth comparison', href: '/calculators/finance/sp500-vs-bonds-calculator', icon: '📊', tag: 'USA', popular: true },
  { name: 'Pay Off Mortgage vs Invest', desc: 'Extra mortgage payments vs S&P 500 index fund investing', href: '/calculators/finance/pay-off-mortgage-vs-invest-calculator', icon: '🏠', tag: 'USA', popular: true },
  { name: 'Term vs Whole Life Insurance', desc: 'Buy term + invest the rest vs whole life insurance USA', href: '/calculators/finance/term-vs-whole-life-calculator', icon: '🛡️', tag: 'USA', popular: true },
  { name: 'Index Fund vs ETF', desc: 'Mutual index fund vs ETF costs, returns & tax efficiency', href: '/calculators/finance/index-fund-vs-etf-calculator', icon: '📈', tag: 'USA', popular: false },
  { name: 'Mortgage vs Renting USA', desc: 'True cost of buying vs renting - US real estate market', href: '/calculators/finance/mortgage-vs-renting-usa-calculator', icon: '🏡', tag: 'USA', popular: true },
  { name: 'Refinance vs Invest', desc: 'Mortgage refinance savings vs investing closing costs', href: '/calculators/finance/refinance-vs-invest-calculator', icon: '🔄', tag: 'USA', popular: false },
  { name: '401k vs Pension', desc: 'Self-directed 401k vs defined benefit pension plan comparison', href: '/calculators/finance/401k-vs-pension-calculator', icon: '🏦', tag: 'USA', popular: false },
  // v15 - 10 brand new calculators
  { name: 'Regular vs Direct MF Plan', desc: 'How much expense ratio costs you - Regular vs Direct Plan SIP', href: '/calculators/finance/sip-vs-mutual-fund-direct-plan-calculator', icon: '📊', tag: 'VS', popular: true },
  { name: 'NSC vs PPF', desc: 'Post Office NSC vs PPF - both government-backed savings', href: '/calculators/finance/nsc-vs-ppf-calculator', icon: '📮', tag: 'VS', popular: false },
  { name: 'SCSS vs FD', desc: 'Senior Citizen Savings Scheme vs Fixed Deposit comparison', href: '/calculators/finance/senior-citizen-savings-vs-fd-calculator', icon: '👴', tag: 'VS', popular: true },
  { name: 'ELSS vs NPS', desc: 'ELSS tax-saving fund vs NPS for retirement corpus India', href: '/calculators/finance/elss-vs-nps-calculator', icon: '📈', tag: 'VS', popular: false },
  { name: 'SSY vs PPF', desc: 'Sukanya Samriddhi Yojana vs PPF for girl child savings', href: '/calculators/finance/sukanya-samriddhi-vs-ppf-calculator', icon: '👧', tag: 'VS', popular: true },
  { name: 'Annuity vs Lumpsum', desc: 'Pension annuity vs reinvesting lumpsum in mutual funds', href: '/calculators/finance/annuity-vs-lumpsum-calculator', icon: '💰', tag: 'VS', popular: false },
  { name: 'Roth IRA vs HSA', desc: 'Roth IRA vs HSA as retirement vehicles - triple tax advantage', href: '/calculators/finance/roth-ira-vs-hsa-calculator', icon: '🏥', tag: 'USA', popular: true },
  { name: 'S&P 500 vs Real Estate USA', desc: 'Index fund vs US real estate with rental income comparison', href: '/calculators/finance/sp500-vs-real-estate-usa-calculator', icon: '🏠', tag: 'USA', popular: true },
  { name: 'CD vs High-Yield Savings', desc: 'Certificate of Deposit vs HYSA - fixed rate vs flexibility', href: '/calculators/finance/cd-vs-hysa-calculator', icon: '🏦', tag: 'USA', popular: true },
  { name: '401k vs Taxable Account', desc: 'Tax-deferred 401k vs taxable brokerage - when each wins', href: '/calculators/finance/401k-vs-taxable-account-calculator', icon: '📉', tag: 'USA', popular: false },
  // v16 - 20 new USA + Europe VS calculators
  { name: '529 vs Roth IRA Education', desc: '529 college savings plan vs Roth IRA for education funding', href: '/calculators/finance/529-vs-roth-ira-education-calculator', icon: '🎓', tag: 'USA', popular: true },
  { name: 'Roth IRA vs 401k + Match', desc: 'How employer match changes the Roth vs Traditional 401k decision', href: '/calculators/finance/roth-ira-vs-401k-employer-match-calculator', icon: '🏦', tag: 'USA', popular: true },
  { name: 'Medicare vs Private Insurance', desc: 'Medicare Part A/B/D costs vs private health insurance retirement', href: '/calculators/finance/medicare-vs-private-insurance-calculator', icon: '🏥', tag: 'USA', popular: true },
  { name: 'Social Security vs Pension', desc: 'Social Security income vs private pension - lifetime comparison', href: '/calculators/finance/social-security-vs-private-pension-calculator', icon: '🏛️', tag: 'USA', popular: true },
  { name: 'Bonds vs CDs USA', desc: 'US Treasury bonds vs bank CDs - yield, tax, liquidity compared', href: '/calculators/finance/bonds-vs-cds-usa-calculator', icon: '📜', tag: 'USA', popular: false },
  { name: 'Vanguard vs Fidelity ETF', desc: 'VOO vs FXAIX - expense ratio impact over 10, 20, 30 years', href: '/calculators/finance/vanguard-vs-fidelity-etf-calculator', icon: '📊', tag: 'USA', popular: true },
  { name: 'REIT vs Rental Property USA', desc: 'VNQ REIT ETF vs direct rental property returns compared', href: '/calculators/finance/reit-vs-direct-property-usa-calculator', icon: '🏢', tag: 'USA', popular: false },
  { name: 'DCA vs Lump Sum USA', desc: 'Dollar cost averaging monthly vs investing lump sum S&P 500', href: '/calculators/finance/dollar-cost-averaging-vs-lumpsum-usa-calculator', icon: '💰', tag: 'USA', popular: true },
  { name: 'Traditional IRA vs Taxable', desc: 'IRA tax deduction vs taxable brokerage - after-tax wealth', href: '/calculators/finance/traditional-ira-vs-taxable-account-calculator', icon: '📉', tag: 'USA', popular: false },
  { name: 'ISA vs SIPP UK', desc: 'UK ISA flexible access vs SIPP pension with 20-45% tax relief', href: '/calculators/finance/isa-vs-sipp-uk-calculator', icon: '🇬🇧', tag: 'Europe', popular: true },
  { name: 'UK Pension vs ISA', desc: 'Workplace pension employer match vs Stocks and Shares ISA', href: '/calculators/finance/uk-pension-vs-isa-calculator', icon: '💷', tag: 'Europe', popular: true },
  { name: 'Offset Mortgage vs Savings UK', desc: 'UK offset mortgage interest saved vs HYSA returns', href: '/calculators/finance/offset-mortgage-vs-savings-uk-calculator', icon: '🏠', tag: 'Europe', popular: false },
  { name: 'Stocks ISA vs Cash ISA UK', desc: 'UK Stocks and Shares ISA (8-10%) vs Cash ISA (4.5%) comparison', href: '/calculators/finance/stocks-shares-isa-vs-cash-isa-calculator', icon: '📈', tag: 'Europe', popular: true },
  { name: 'UK Buy-to-Let vs Stocks', desc: 'UK rental property returns vs FTSE All-Share index investing', href: '/calculators/finance/uk-buy-to-let-vs-stocks-calculator', icon: '🏘️', tag: 'Europe', popular: true },
  { name: 'Germany ETF vs Tagesgeld', desc: 'German MSCI World ETF vs Tagesgeld/Festgeld savings returns', href: '/calculators/finance/germany-etf-vs-tagesgeld-calculator', icon: '🇩🇪', tag: 'Europe', popular: true },
  { name: 'France PEA vs Assurance-Vie', desc: 'French PEA stock market vs Assurance-vie tax-advantaged investing', href: '/calculators/finance/france-pea-vs-assurance-vie-calculator', icon: '🇫🇷', tag: 'Europe', popular: false },
  { name: 'Europe ETF vs Property', desc: 'EU/UK index ETF vs European real estate total return', href: '/calculators/finance/europe-etf-vs-property-calculator', icon: '🇪🇺', tag: 'Europe', popular: true },
  { name: 'UK Remortgage vs Invest', desc: 'UK mortgage remortgage savings vs FTSE index fund investing', href: '/calculators/finance/uk-remortgage-vs-invest-calculator', icon: '🔄', tag: 'Europe', popular: false },
  { name: 'Euro Bonds vs ETF', desc: 'European government bonds (Bunds/OATs) vs MSCI Europe ETF', href: '/calculators/finance/euro-bonds-vs-etf-calculator', icon: '📜', tag: 'Europe', popular: false },
  { name: 'UK Stocks vs Bonds', desc: 'FTSE All-Share vs UK Gilts - historical returns and 60/40 portfolio', href: '/calculators/finance/uk-stocks-vs-bonds-calculator', icon: '📊', tag: 'Europe', popular: true },
  // v17 - 20 more USA + Europe VS calculators
  { name: '401k Early Withdrawal vs Loan', desc: '401k early withdrawal (10% penalty) vs 401k loan true cost', href: '/calculators/finance/401k-early-withdrawal-vs-loan-calculator', icon: '💸', tag: 'USA', popular: true },
  { name: 'SEP IRA vs Solo 401k', desc: 'SEP IRA vs Solo 401k for self-employed - contribution limits', href: '/calculators/finance/sep-ira-vs-solo-401k-calculator', icon: '👔', tag: 'USA', popular: true },
  { name: 'I Bonds vs TIPS', desc: 'Series I Savings Bonds vs TIPS - best inflation hedge USA', href: '/calculators/finance/i-bonds-vs-tips-calculator', icon: '🛡️', tag: 'USA', popular: false },
  { name: 'Muni Bonds vs Corp Bonds', desc: 'Tax-free municipal bonds vs corporate bonds after-tax yield', href: '/calculators/finance/municipal-bonds-vs-corporate-bonds-calculator', icon: '📜', tag: 'USA', popular: false },
  { name: 'Total Market vs S&P 500', desc: 'VTI total market vs VOO S&P 500 long-term returns', href: '/calculators/finance/whole-market-vs-sp500-calculator', icon: '📊', tag: 'USA', popular: true },
  { name: 'Dividend vs Growth Stocks', desc: 'SCHD dividend growth vs QQQ growth stocks total return', href: '/calculators/finance/dividend-growth-vs-growth-stocks-calculator', icon: '💵', tag: 'USA', popular: true },
  { name: 'US Real Estate vs REITs', desc: 'Direct rental property vs REIT ETF (VNQ) returns USA', href: '/calculators/finance/us-real-estate-vs-reits-calculator', icon: '🏢', tag: 'USA', popular: true },
  { name: '529 vs UTMA Account', desc: '529 college savings vs UTMA custodial account', href: '/calculators/finance/529-vs-utma-calculator', icon: '🎓', tag: 'USA', popular: false },
  { name: 'TIPS vs Stocks USA', desc: 'Inflation-protected TIPS vs S&P 500 equities', href: '/calculators/finance/inflation-protected-bonds-vs-stocks-calculator', icon: '📈', tag: 'USA', popular: false },
  { name: 'Cash-Out Refi vs HELOC', desc: 'Cash-out refinance vs HELOC for home equity access', href: '/calculators/finance/cash-out-refinance-vs-heloc-calculator', icon: '🏠', tag: 'USA', popular: true },
  { name: 'UK Lifetime ISA vs SIPP', desc: 'UK LISA 25% bonus vs SIPP 20-45% tax relief', href: '/calculators/finance/uk-lifetime-isa-vs-sipp-calculator', icon: '🇬🇧', tag: 'Europe', popular: true },
  { name: 'UK Pension Drawdown vs Annuity', desc: 'UK pension drawdown flexible vs annuity guaranteed', href: '/calculators/finance/uk-pension-drawdown-vs-annuity-calculator', icon: '💷', tag: 'Europe', popular: true },
  { name: 'UK Fixed vs Tracker Mortgage', desc: 'UK fixed-rate vs Bank of England tracker mortgage', href: '/calculators/finance/uk-fixed-rate-vs-tracker-mortgage-calculator', icon: '🏠', tag: 'Europe', popular: true },
  { name: 'MSCI World vs S&P 500 EU', desc: 'MSCI World (IWDA) vs S&P 500 for European investors', href: '/calculators/finance/europe-msci-world-vs-sp500-calculator', icon: '🌍', tag: 'Europe', popular: true },
  { name: 'UK Premium Bonds vs Cash ISA', desc: 'NS&I Premium Bonds vs best Cash ISA rates UK', href: '/calculators/finance/uk-premium-bonds-vs-cash-isa-calculator', icon: '🎟️', tag: 'Europe', popular: true },
  { name: 'Netherlands AOW vs Pension', desc: 'Dutch AOW state pension vs private pension planning', href: '/calculators/finance/netherlands-aow-vs-private-pension-calculator', icon: '🇳🇱', tag: 'Europe', popular: false },
  { name: 'Spain Pension vs ETF', desc: 'Spanish plan de pensiones vs index ETF investing', href: '/calculators/finance/spain-pension-vs-etf-calculator', icon: '🇪🇸', tag: 'Europe', popular: false },
  { name: 'Europe Property vs REIT', desc: 'European direct property vs EU REIT ETF returns', href: '/calculators/finance/europe-property-vs-reit-calculator', icon: '🏘️', tag: 'Europe', popular: false },
  { name: 'UK Help to Buy vs LISA', desc: 'UK Help to Buy ISA vs Lifetime ISA first home savings', href: '/calculators/finance/uk-help-to-buy-vs-lisa-calculator', icon: '🏡', tag: 'Europe', popular: true },
  { name: 'Europe Growth vs Value ETF', desc: 'European growth ETF vs value ETF long-term returns', href: '/calculators/finance/europe-growth-vs-value-etf-calculator', icon: '📊', tag: 'Europe', popular: false },
  { name: 'Education Goal Calculator', desc: 'Save for child education with inflation-adjusted targets', href: '/calculators/finance/education-goal-calculator', icon: '🎓', tag: 'Global', popular: false },
  { name: 'FD Comparison Calculator', desc: 'Compare multiple fixed deposit options side by side', href: '/calculators/finance/fd-comparison-calculator', icon: '🏦', tag: 'India', popular: false },
  { name: 'Lease vs Buy Calculator', desc: 'Car lease vs purchase - true cost comparison', href: '/calculators/finance/lease-vs-buy-calculator', icon: '🔑', tag: 'USA', popular: false },
  { name: 'Mutual Fund Return Calculator', desc: 'Calculate CAGR and absolute returns on mutual funds', href: '/calculators/finance/mutual-fund-return-calculator', icon: '📈', tag: 'India', popular: false },
  // ── New 25 USA Finance Calculators 2026 ──
  { name: 'HELOC Calculator', desc: 'Home equity line of credit payment, draw period, and total interest cost', href: '/calculators/finance/heloc-credit-line-calculator', icon: '🏡', tag: 'USA', popular: false },
  { name: 'Social Security Breakeven Calculator', desc: 'Find the optimal age to claim Social Security for maximum lifetime benefit', href: '/calculators/finance/social-security-breakeven-calculator', icon: '🏛️', tag: 'Retirement', popular: true },
  { name: 'RMD Calculator', desc: 'Required Minimum Distribution from IRA or 401k using 2026 IRS tables', href: '/calculators/finance/required-minimum-distribution-calculator', icon: '📋', tag: 'Retirement', popular: false },
  { name: 'Backdoor Roth IRA Calculator', desc: 'Tax impact and pro-rata rule for high-income Roth conversions', href: '/calculators/finance/backdoor-roth-ira-calculator', icon: '🚪', tag: 'Retirement', popular: true },
  { name: 'Mega Backdoor Roth Calculator', desc: 'After-tax 401k contributions and in-plan Roth conversion up to $70,000', href: '/calculators/finance/mega-backdoor-roth-calculator', icon: '💪', tag: 'Retirement', popular: false },
  { name: 'SEP-IRA Calculator', desc: 'Max SEP-IRA contribution, tax savings, and growth for self-employed', href: '/calculators/finance/sep-ira-calculator', icon: '💼', tag: 'Retirement', popular: false },
  { name: 'Capital Gains Tax Calculator', desc: 'Federal tax on stock, real estate, and asset sales — short and long-term rates', href: '/calculators/finance/capital-gains-tax-calculator', icon: '📈', tag: 'Tax', popular: true },
  { name: 'Real Estate Cost Basis Calculator', desc: 'Adjusted basis, Section 121 exclusion, depreciation recapture, and net profit on home sale', href: '/calculators/finance/real-estate-cost-basis-calculator', icon: '🏘️', tag: 'Tax', popular: false },
  { name: 'I-Bonds Calculator', desc: 'Series I savings bond value, composite rate, and effective yield vs CDs', href: '/calculators/finance/i-bonds-calculator', icon: '🏛️', tag: 'Savings', popular: false },
  { name: 'HSA Investment Calculator', desc: 'Triple tax advantage growth — invest your HSA for retirement medical costs', href: '/calculators/finance/hsa-investment-calculator', icon: '🏥', tag: 'Tax', popular: true },
  { name: 'Medicare Premium Calculator', desc: 'Part B, Part D, and IRMAA surcharge based on your income — 2026', href: '/calculators/finance/medicare-premium-calculator', icon: '💊', tag: 'Retirement', popular: false },
  { name: 'Estate Tax Calculator', desc: 'Federal estate tax, exemption amounts, and marital deduction planning', href: '/calculators/finance/estate-tax-calculator', icon: '⚖️', tag: 'Tax', popular: false },
  { name: 'Gift Tax Calculator', desc: 'Annual exclusion, taxable gifts, and remaining lifetime exemption', href: '/calculators/finance/gift-tax-calculator', icon: '🎁', tag: 'Tax', popular: false },
  { name: 'QBI Deduction Calculator', desc: 'Section 199A 20% pass-through deduction for self-employed and small business', href: '/calculators/finance/qbi-deduction-calculator', icon: '📋', tag: 'Tax', popular: false },
  { name: 'Health Insurance Deductible Calculator', desc: 'Actual out-of-pocket costs after deductible, coinsurance, and OOP max', href: '/calculators/finance/health-insurance-deductible-calculator', icon: '💊', tag: 'USA', popular: false },
  { name: 'FSA Calculator', desc: 'FSA tax savings, effective discount, and optimal contribution to avoid forfeiture', href: '/calculators/finance/fsa-calculator', icon: '🏥', tag: 'Tax', popular: false },
  { name: 'Dependent Care FSA Calculator', desc: 'DC-FSA vs Child Care Credit — compare childcare tax strategy', href: '/calculators/finance/dependent-care-fsa-calculator', icon: '👶', tag: 'Tax', popular: false },
  { name: 'Student Loan Forgiveness Calculator', desc: 'SAVE, IBR, and PSLF payments, total cost, and forgiveness benefit', href: '/calculators/finance/student-loan-forgiveness-calculator', icon: '🎓', tag: 'Debt', popular: true },
  { name: 'AMT Calculator', desc: 'Alternative Minimum Tax from ISO options and preference items', href: '/calculators/finance/alternative-minimum-tax-calculator', icon: '⚠️', tag: 'Tax', popular: false },
  { name: 'Self-Employment Tax Calculator', desc: 'SE tax, deductible half, QBI deduction, and quarterly estimates for freelancers', href: '/calculators/finance/self-employment-tax-calculator', icon: '💼', tag: 'Tax', popular: true },
  { name: 'Equity Compensation Calculator', desc: 'RSU, ISO, and NSO tax impact — ordinary income, AMT, and capital gains', href: '/calculators/finance/equity-compensation-calculator', icon: '📊', tag: 'Tax', popular: false },
  { name: 'Net Investment Income Tax Calculator', desc: '3.8% NIIT on dividends, capital gains, and passive income above threshold', href: '/calculators/finance/net-investment-income-tax-calculator', icon: '💹', tag: 'Tax', popular: false },
  { name: 'Crypto Tax Calculator', desc: 'Bitcoin and altcoin capital gains — short vs long-term rates and NIIT', href: '/calculators/finance/crypto-tax-calculator', icon: '₿', tag: 'Tax', popular: true },
  { name: 'College Savings 529 Calculator', desc: '529 plan growth, funding gap, and monthly contribution to cover 4 years of college', href: '/calculators/finance/college-savings-529-calculator', icon: '🎓', tag: 'Savings', popular: true },
  { name: 'Annual Bonus Tax Calculator', desc: 'Federal, state, and FICA withholding on your work bonus — net take-home', href: '/calculators/finance/annual-bonus-tax-calculator', icon: '💵', tag: 'Tax', popular: true },

  // ── Batch 2: 25 more USA Finance Calculators ──
  { name: 'Payroll Tax Calculator', desc: 'Payroll Tax Calculator', href: '/calculators/finance/payroll-tax-calculator', icon: '💵', tag: 'USA', popular: false },
  { name: 'Wealth Transfer Calculator', desc: 'Wealth Transfer Calculator', href: '/calculators/finance/wealth-transfer-calculator', icon: '👨‍👩‍👧', tag: 'USA', popular: false },
  { name: 'Student Loan vs Invest Calculator', desc: 'Student Loan vs Invest Calculator', href: '/calculators/finance/student-loan-vs-invest-calculator', icon: '⚖️', tag: 'USA', popular: false },
  { name: 'Social Security Spousal Benefits Calculator', desc: 'Social Security Spousal Benefits Calculator', href: '/calculators/finance/social-security-spousal-calculator', icon: '👫', tag: 'USA', popular: false },
  { name: 'Home Equity Loan Calculator', desc: 'Home Equity Loan Calculator', href: '/calculators/finance/home-equity-loan-calculator', icon: '🏠', tag: 'USA', popular: false },
  { name: 'Rental Property Investment Calculator', desc: 'Rental Property Investment Calculator', href: '/calculators/finance/rental-property-investment-calculator', icon: '🏘️', tag: 'USA', popular: false },
  { name: 'Tax-Loss Harvesting Calculator', desc: 'Tax-Loss Harvesting Calculator', href: '/calculators/finance/tax-loss-harvesting-calculator', icon: '🌿', tag: 'USA', popular: false },
  { name: 'DRIP Dividend Reinvestment Calculator', desc: 'DRIP Dividend Reinvestment Calculator', href: '/calculators/finance/drip-calculator', icon: '💧', tag: 'USA', popular: false },
  { name: 'Life Insurance Needs Calculator', desc: 'Life Insurance Needs Calculator', href: '/calculators/finance/life-insurance-needs-calculator', icon: '🛡️', tag: 'USA', popular: false },
  { name: 'Roth Conversion Ladder Calculator', desc: 'Roth Conversion Ladder Calculator', href: '/calculators/finance/roth-conversion-ladder-calculator', icon: '🪜', tag: 'USA', popular: false },
  { name: 'Inflation Impact Calculator', desc: 'Inflation Impact Calculator', href: '/calculators/finance/inflation-impact-calculator', icon: '📉', tag: 'USA', popular: false },
  { name: 'Rent Increase Calculator', desc: 'Rent Increase Calculator', href: '/calculators/finance/rent-increase-calculator', icon: '🏠', tag: 'USA', popular: false },
  { name: 'Mortgage Points Calculator', desc: 'Mortgage Points Calculator', href: '/calculators/finance/mortgage-points-calculator', icon: '📐', tag: 'USA', popular: false },
  { name: 'Salary Negotiation Calculator', desc: 'Salary Negotiation Calculator', href: '/calculators/finance/salary-negotiation-calculator', icon: '🤝', tag: 'USA', popular: false },
  { name: 'Child Tax Credit Calculator', desc: 'Child Tax Credit Calculator', href: '/calculators/finance/child-tax-credit-calculator', icon: '👶', tag: 'USA', popular: false },
  { name: 'Annuity Income Calculator', desc: 'Annuity Income Calculator', href: '/calculators/finance/annuity-income-calculator', icon: '📅', tag: 'USA', popular: false },
  { name: 'Early Retirement Calculator', desc: 'Early Retirement Calculator', href: '/calculators/finance/early-retirement-calculator', icon: '🌅', tag: 'USA', popular: false },
  { name: 'HDHP vs Traditional Insurance Calculator', desc: 'HDHP vs Traditional Insurance Calculator', href: '/calculators/finance/hdhp-vs-traditional-insurance-calculator', icon: '⚕️', tag: 'USA', popular: false },
  { name: 'Cost of Debt Calculator', desc: 'Cost of Debt Calculator', href: '/calculators/finance/cost-of-debt-calculator', icon: '💳', tag: 'USA', popular: false },
  { name: 'Net Salary Calculator', desc: 'Net Salary Calculator', href: '/calculators/finance/net-salary-calculator', icon: '💰', tag: 'USA', popular: false },
  { name: 'Business Valuation Calculator', desc: 'Business Valuation Calculator', href: '/calculators/finance/business-valuation-calculator', icon: '🏢', tag: 'USA', popular: false },
  { name: 'FIRE Number Calculator', desc: 'FIRE Number Calculator', href: '/calculators/finance/fire-number-calculator', icon: '🔥', tag: 'USA', popular: false },
  { name: 'Property Tax Calculator', desc: 'Property Tax Calculator', href: '/calculators/finance/property-tax-calculator', icon: '🏛️', tag: 'USA', popular: false },
  { name: 'Retirement Withdrawal Calculator', desc: 'Retirement Withdrawal Calculator', href: '/calculators/finance/retirement-withdrawal-calculator', icon: '💰', tag: 'USA', popular: false },
  { name: 'Long-Term Care Insurance Calculator', desc: 'Long-Term Care Insurance Calculator', href: '/calculators/finance/long-term-care-insurance-calculator', icon: '🏥', tag: 'USA', popular: false },
  { name: 'Scholarship & Financial Aid Calculator', desc: 'Scholarship & Financial Aid Calculator', href: '/calculators/finance/scholarship-financial-aid-calculator', icon: '🎓', tag: 'USA', popular: false },
  // Batch 3
  { name: 'Solo 401k Calculator', desc: 'Solo 401k Calculator', href: '/calculators/finance/solo-401k-calculator', icon: '💼', tag: 'USA', popular: false },
  { name: 'Inherited IRA Calculator', desc: 'Inherited IRA Calculator', href: '/calculators/finance/inherited-ira-calculator', icon: '📋', tag: 'USA', popular: false },
  { name: 'Mortgage Affordability Calculator', desc: 'Mortgage Affordability Calculator', href: '/calculators/finance/mortgage-affordability-calculator', icon: '🏡', tag: 'USA', popular: false },
  { name: 'College ROI Calculator', desc: 'College ROI Calculator', href: '/calculators/finance/college-roi-calculator', icon: '🎓', tag: 'USA', popular: false },
  { name: 'House Flip Calculator', desc: 'House Flip Calculator', href: '/calculators/finance/house-flip-calculator', icon: '🏗️', tag: 'USA', popular: false },
  { name: 'Social Security Tax Calculator', desc: 'Social Security Tax Calculator', href: '/calculators/finance/social-security-tax-calculator', icon: '🏛️', tag: 'USA', popular: false },
  { name: 'Home Office Deduction Calculator', desc: 'Home Office Deduction Calculator', href: '/calculators/finance/home-office-deduction-calculator', icon: '🏠', tag: 'USA', popular: false },
  { name: 'Municipal Bond Tax-Equivalent Yield Calculator', desc: 'Municipal Bond Tax-Equivalent Yield Calculator', href: '/calculators/finance/municipal-bond-tax-calculator', icon: '🏛️', tag: 'USA', popular: false },
  { name: 'Covered Call Calculator', desc: 'Covered Call Calculator', href: '/calculators/finance/covered-call-calculator', icon: '📊', tag: 'USA', popular: false },
  { name: 'TSP vs 401k Calculator', desc: 'TSP vs 401k Calculator', href: '/calculators/finance/tsp-vs-401k-calculator', icon: '🏛️', tag: 'USA', popular: false },
  { name: 'Options Pricing Calculator', desc: 'Options Pricing Calculator', href: '/calculators/finance/options-pricing-calculator', icon: '📈', tag: 'USA', popular: false },
  { name: 'Estate Probate Cost Calculator', desc: 'Estate Probate Cost Calculator', href: '/calculators/finance/estate-probate-calculator', icon: '⚖️', tag: 'USA', popular: false },
  { name: 'Taxable vs Roth vs Traditional Calculator', desc: 'Taxable vs Roth vs Traditional Calculator', href: '/calculators/finance/taxable-vs-roth-vs-traditional-calculator', icon: '📊', tag: 'USA', popular: false },
  { name: 'Cash Value Life Insurance Calculator', desc: 'Cash Value Life Insurance Calculator', href: '/calculators/finance/cash-value-life-insurance-calculator', icon: '🛡️', tag: 'USA', popular: false },
  { name: 'State Tax Relocation Calculator', desc: 'State Tax Relocation Calculator', href: '/calculators/finance/state-tax-relocation-calculator', icon: '🗺️', tag: 'USA', popular: false },
  { name: 'Emergency Fund HYSA Calculator', desc: 'Emergency Fund HYSA Calculator', href: '/calculators/finance/emergency-fund-hysa-calculator', icon: '🏦', tag: 'USA', popular: false },
  { name: 'Student Loan Refinance Calculator', desc: 'Student Loan Refinance Calculator', href: '/calculators/finance/student-loan-refinance-calculator', icon: '🎓', tag: 'USA', popular: false },
  { name: 'Net Unrealized Appreciation Calculator', desc: 'Net Unrealized Appreciation Calculator', href: '/calculators/finance/net-unrealized-appreciation-calculator', icon: '📈', tag: 'USA', popular: false },
  { name: 'Bond Ladder Calculator', desc: 'Bond Ladder Calculator', href: '/calculators/finance/bond-ladder-calculator', icon: '📊', tag: 'USA', popular: false },
  { name: 'Crypto DCA vs Lump Sum Calculator', desc: 'Crypto DCA vs Lump Sum Calculator', href: '/calculators/finance/crypto-dca-calculator', icon: '₿', tag: 'USA', popular: false },
  { name: 'Pension vs Lump Sum Calculator', desc: 'Pension vs Lump Sum Calculator', href: '/calculators/finance/pension-vs-lump-sum-calculator', icon: '📅', tag: 'USA', popular: false },
  { name: 'Index Fund Fee Calculator', desc: 'Index Fund Fee Calculator', href: '/calculators/finance/index-fund-fee-calculator', icon: '📉', tag: 'USA', popular: false },
  { name: 'I-Bond Ladder Calculator', desc: 'I-Bond Ladder Calculator', href: '/calculators/finance/i-bond-ladder-calculator', icon: '🏛️', tag: 'USA', popular: false },
  { name: 'Wealth Building Comparison Calculator', desc: 'Wealth Building Comparison Calculator', href: '/calculators/finance/wealth-building-comparison-calculator', icon: '💎', tag: 'USA', popular: false },
  { name: 'Tax Withholding W-4 Calculator', desc: 'Tax Withholding W-4 Calculator', href: '/calculators/finance/tax-withholding-w4-calculator', icon: '📋', tag: 'USA', popular: false },
  // Batch 4
  { name: 'CD vs HYSA vs Money Market Calculator', desc: 'CD vs HYSA vs Money Market Calculator', href: '/calculators/finance/cd-vs-hysa-vs-money-market-calculator', icon: '🏦', tag: 'USA', popular: false },
  { name: 'Car Affordability Calculator', desc: 'Car Affordability Calculator', href: '/calculators/finance/car-affordability-calculator', icon: '🚗', tag: 'USA', popular: false },
  { name: 'Cap Rate Calculator', desc: 'Cap Rate Calculator', href: '/calculators/finance/cap-rate-calculator', icon: '🏘️', tag: 'USA', popular: false },
  { name: 'Savings Rate to FIRE Calculator', desc: 'Savings Rate to FIRE Calculator', href: '/calculators/finance/savings-rate-fire-calculator', icon: '💹', tag: 'USA', popular: false },
  { name: 'Social Security Timing Optimizer', desc: 'Social Security Timing Optimizer', href: '/calculators/finance/social-security-timing-optimizer', icon: '🏛️', tag: 'USA', popular: false },
  { name: 'Mortgage Recast Calculator', desc: 'Mortgage Recast Calculator', href: '/calculators/finance/mortgage-recast-calculator', icon: '🏠', tag: 'USA', popular: false },
  { name: 'Roth Conversion Tax Calculator', desc: 'Roth Conversion Tax Calculator', href: '/calculators/finance/roth-conversion-tax-calculator', icon: '🔄', tag: 'USA', popular: false },
  { name: 'SS vs Private Pension Calculator', desc: 'SS vs Private Pension Calculator', href: '/calculators/finance/ss-vs-private-pension-calculator', icon: '📊', tag: 'USA', popular: false },
  { name: 'Conforming vs Jumbo Loan Calculator', desc: 'Conforming vs Jumbo Loan Calculator', href: '/calculators/finance/conforming-loan-limit-calculator', icon: '🏠', tag: 'USA', popular: false },
  { name: 'Real Estate Syndication ROI Calculator', desc: 'Real Estate Syndication ROI Calculator', href: '/calculators/finance/real-estate-syndication-calculator', icon: '🏢', tag: 'USA', popular: false },
  { name: 'Mortgage vs Rent Calculator', desc: 'Mortgage vs Rent Calculator', href: '/calculators/finance/mortgage-vs-rent-calculator', icon: '⚖️', tag: 'USA', popular: false },
  { name: 'Early Mortgage Payoff Calculator', desc: 'Early Mortgage Payoff Calculator', href: '/calculators/finance/early-mortgage-payoff-calculator', icon: '🏡', tag: 'USA', popular: false },
  { name: 'Credit Card Annual Fee Calculator', desc: 'Credit Card Annual Fee Calculator', href: '/calculators/finance/credit-card-annual-fee-calculator', icon: '💳', tag: 'USA', popular: false },
  { name: 'Gold vs Stocks Portfolio Calculator', desc: 'Gold vs Stocks Portfolio Calculator', href: '/calculators/finance/gold-vs-stocks-calculator', icon: '🥇', tag: 'USA', popular: false },
  { name: 'Renters Insurance Calculator', desc: 'Renters Insurance Calculator', href: '/calculators/finance/renters-insurance-calculator', icon: '🏠', tag: 'USA', popular: false },
  { name: 'Buy vs Lease Vehicle Calculator', desc: 'Buy vs Lease Vehicle Calculator', href: '/calculators/finance/buy-vs-lease-vehicle-calculator', icon: '🚗', tag: 'USA', popular: false },
  { name: 'Freelance Income Tax Calculator', desc: 'Freelance Income Tax Calculator', href: '/calculators/finance/freelance-income-tax-calculator', icon: '💻', tag: 'USA', popular: false },
  { name: 'RSU Vesting Schedule Calculator', desc: 'RSU Vesting Schedule Calculator', href: '/calculators/finance/vesting-schedule-calculator', icon: '📅', tag: 'USA', popular: false },
  { name: 'S&P 500 vs Bitcoin Portfolio Calculator', desc: 'S&P 500 vs Bitcoin Portfolio Calculator', href: '/calculators/finance/spy-vs-bitcoin-portfolio-calculator', icon: '₿', tag: 'USA', popular: false },
  { name: 'Paycheck Contribution Optimizer', desc: 'Paycheck Contribution Optimizer', href: '/calculators/finance/paycheck-contribution-optimizer', icon: '💵', tag: 'USA', popular: false },
  { name: 'Student Loan Forbearance Calculator', desc: 'Student Loan Forbearance Calculator', href: '/calculators/finance/student-loan-forbearance-calculator', icon: '🎓', tag: 'USA', popular: false },
  { name: 'Crypto Profit Loss Tracker', desc: 'Crypto Profit Loss Tracker', href: '/calculators/finance/crypto-profit-loss-tracker', icon: '₿', tag: 'USA', popular: false },
  { name: 'Tax Bracket Optimizer', desc: 'Tax Bracket Optimizer', href: '/calculators/finance/tax-bracket-optimizer', icon: '🧾', tag: 'USA', popular: false },
  { name: 'Net Worth Calculator', desc: 'Net Worth Calculator', href: '/calculators/finance/net-worth-tracker', icon: '💎', tag: 'USA', popular: false },
  { name: 'Dollar Cost Averaging vs Lump Sum Calculator', desc: 'Dollar Cost Averaging vs Lump Sum Calculator', href: '/calculators/finance/dollar-cost-averaging-vs-lumpsum-usa-calculator', icon: '📊', tag: 'USA', popular: false },
  // ── Merged from V7/V10 — previously missing from category listing ──────────
  // Savings
  { name: '529 to Roth IRA Rollover Calculator', desc: 'Calculate how much of an unused 529 college savings balance can roll i', href: '/calculators/finance/529-to-roth-rollover-calculator', icon: '🎓', tag: 'Savings', popular: false },
  { name: 'College Financial Aid Strategy Calculator', desc: 'Calculate your FAFSA Student Aid Index and strategies to legally reduc', href: '/calculators/finance/college-financial-aid-strategies-calculator', icon: '🎓', tag: 'Savings', popular: false },
  { name: 'College Savings Goal Calculator', desc: 'Calculate exactly how much to save monthly for college given your chil', href: '/calculators/finance/college-savings-goal-calculator', icon: '🎓', tag: 'Savings', popular: false },
  { name: 'Family Budget Planner Calculator', desc: 'Create a complete family monthly budget with 50/30/20 breakdown analys', href: '/calculators/finance/family-budget-planner-calculator', icon: '👨‍👩‍👧', tag: 'Savings', popular: false },
  { name: 'HSA Balance Projection Calculator', desc: 'Project your Health Savings Account balance at retirement based on ann', href: '/calculators/finance/hsa-projection-calculator', icon: '🏥', tag: 'Savings', popular: false },
  { name: '529 Prepaid vs Savings Plan Calculator', desc: 'Compare 529 prepaid tuition plan vs 529 savings plan', href: '/calculators/finance/prepaid-vs-savings-529-calculator', icon: '🎓', tag: 'Savings', popular: false },
  { name: 'Savings Goal Planner Calculator', desc: 'Calculate how long to reach any savings goal, required monthly savings', href: '/calculators/finance/savings-goal-planner-calculator', icon: '🎯', tag: 'Savings', popular: false },
  // Retirement
  { name: 'Rule 72(t) SEPP Calculator', desc: 'Calculate Substantially Equal Periodic Payments (SEPP) for penalty-fre', href: '/calculators/finance/72t-sepp-calculator', icon: '🔓', tag: 'Retirement', popular: false },
  { name: 'Period Certain vs Lifetime Annuity Calculator', desc: 'Compare period certain annuity vs lifetime annuity payouts to find the', href: '/calculators/finance/annuity-certain-vs-lifetime-calculator', icon: '📅', tag: 'Retirement', popular: false },
  { name: 'Barista FIRE Calculator', desc: 'Calculate how part-time work reduces your FIRE number and accelerates', href: '/calculators/finance/barista-fire-calculator', icon: '☕', tag: 'Retirement', popular: false },
  { name: 'Defined Benefit Pension Calculator', desc: 'Calculate your defined benefit pension monthly income, replacement rat', href: '/calculators/finance/defined-benefit-pension-calculator', icon: '🏛️', tag: 'Retirement', popular: false },
  { name: 'Equity Indexed Annuity Calculator', desc: 'Calculate how an equity-indexed annuity performs with participation ra', href: '/calculators/finance/equity-indexed-annuity-calculator', icon: '📅', tag: 'Retirement', popular: false },
  { name: 'HSA vs 401k Contribution Priority Calculator', desc: 'Find the optimal order to fund your HSA and 401k based on your employe', href: '/calculators/finance/hsa-vs-401k-priority-calculator', icon: '🏥', tag: 'Retirement', popular: false },
  { name: 'Income Replacement Ratio Calculator', desc: 'Calculate your retirement income replacement ratio from all sources —', href: '/calculators/finance/income-replacement-ratio-calculator', icon: '📊', tag: 'Retirement', popular: false },
  { name: 'Retirement Bucket Strategy Calculator', desc: 'Model a three-bucket retirement income strategy — cash, bonds, and sto', href: '/calculators/finance/retirement-bucket-strategy-calculator', icon: '🪣', tag: 'Retirement', popular: false },
  { name: 'Retirement Healthcare Bridge Calculator', desc: 'Calculate the total cost of healthcare coverage between early retireme', href: '/calculators/finance/retirement-healthcare-bridge-calculator', icon: '🏥', tag: 'Retirement', popular: false },
  { name: 'Retirement Healthcare Cost Calculator', desc: 'Estimate total healthcare costs in retirement including pre-Medicare b', href: '/calculators/finance/retirement-healthcare-cost-calculator', icon: '🏥', tag: 'Retirement', popular: false },
  { name: 'Roth vs Traditional 401k Calculator', desc: 'Compare Roth 401k vs Traditional 401k after-tax wealth — the right cho', href: '/calculators/finance/roth-vs-traditional-401k-calculator', icon: '🔄', tag: 'Retirement', popular: false },
  { name: 'Safe Harbor 401(k) Calculator', desc: 'Calculate Safe Harbor 401k employer contributions for small businesses', href: '/calculators/finance/safe-harbor-401k-calculator', icon: '🛡️', tag: 'Retirement', popular: false },
  { name: 'Self-Employed Retirement Plan Comparison', desc: 'Compare Solo 401k vs SEP-IRA vs SIMPLE IRA contribution limits and tax', href: '/calculators/finance/self-employed-retirement-plan-comparison', icon: '💼', tag: 'Retirement', popular: false },
  { name: 'Social Security COLA Impact Calculator', desc: 'Calculate how Social Security Cost of Living Adjustments compound your', href: '/calculators/finance/social-security-cola-calculator', icon: '📈', tag: 'Retirement', popular: false },
  { name: 'Social Security Couples Optimization Calculator', desc: 'Find the Social Security claiming strategy that maximizes lifetime ben', href: '/calculators/finance/social-security-couples-optimizer', icon: '👫', tag: 'Retirement', popular: false },
  { name: 'Social Security WEP Calculator', desc: 'Calculate the Windfall Elimination Provision (WEP) reduction to your S', href: '/calculators/finance/social-security-wep-calculator', icon: '🏛️', tag: 'Retirement', popular: false },
  { name: 'Social Security Disability (SSDI) Calculator', desc: 'Estimate your monthly SSDI benefit using the Social Security Primary I', href: '/calculators/finance/ssdi-benefit-calculator', icon: '🦽', tag: 'Retirement', popular: false },
  { name: 'Variable Annuity Fee Impact Calculator', desc: 'Calculate how mortality & expense, administration, and rider fees erod', href: '/calculators/finance/variable-annuity-fee-calculator', icon: '📅', tag: 'Retirement', popular: false },
  // Planning
  { name: 'Alimony & Spousal Support Calculator', desc: 'Estimate potential spousal support based on income gap and marriage le', href: '/calculators/finance/alimony-calculator', icon: '⚖️', tag: 'Planning', popular: false },
  { name: 'COBRA vs ACA Marketplace Calculator', desc: 'Compare COBRA health insurance cost vs ACA Marketplace plan with subsi', href: '/calculators/finance/cobra-vs-marketplace-calculator', icon: '🏥', tag: 'Planning', popular: false },
  { name: 'Disability Insurance Needs Calculator', desc: 'Calculate how much long-term disability insurance coverage you need ba', href: '/calculators/finance/disability-insurance-calculator', icon: '🦽', tag: 'Planning', popular: false },
  { name: 'Elder Care Cost Calculator', desc: 'Calculate the monthly and annual cost of in-home elder care or assiste', href: '/calculators/finance/elder-care-cost-calculator', icon: '👵', tag: 'Planning', popular: false },
  { name: 'Estate Liquidity Needs Calculator', desc: 'Calculate whether an estate has sufficient liquid assets to pay taxes', href: '/calculators/finance/estate-liquidity-calculator', icon: '⚖️', tag: 'Planning', popular: false },
  { name: 'Estate Planning Readiness Score Calculator', desc: 'Get a personalized estate planning readiness score based on your age', href: '/calculators/finance/estate-planning-checklist-calculator', icon: '📋', tag: 'Planning', popular: false },
  { name: 'ACA Health Insurance Subsidy Calculator', desc: 'Calculate your Affordable Care Act (ACA) premium tax credit subsidy ba', href: '/calculators/finance/health-insurance-subsidy-calculator', icon: '💊', tag: 'Planning', popular: false },
  { name: 'Insurance Needs by Life Stage Calculator', desc: 'Get a comprehensive insurance needs assessment based on your life stag', href: '/calculators/finance/insurance-by-life-stage-calculator', icon: '🛡️', tag: 'Planning', popular: false },
  { name: 'Medicare Part D Drug Cost Calculator', desc: 'Calculate total 2026 Medicare Part D costs including premiums, deducti', href: '/calculators/finance/medicare-part-d-calculator', icon: '💊', tag: 'Planning', popular: false },
  { name: 'Prenup Asset Protection Calculator', desc: 'Estimate how much separate property and business value a prenuptial ag', href: '/calculators/finance/prenup-asset-protection-calculator', icon: '📋', tag: 'Planning', popular: false },
  { name: 'Real Estate Appreciation Calculator', desc: 'Calculate how much your home or investment property has appreciated us', href: '/calculators/finance/real-estate-appreciation-calculator', icon: '📈', tag: 'Planning', popular: false },
  { name: 'Real Estate Crowdfunding Calculator', desc: 'Calculate real estate crowdfunding returns including dividends, apprec', href: '/calculators/finance/real-estate-crowdfunding-calculator', icon: '🏢', tag: 'Planning', popular: false },
  { name: 'Trust Fund Growth Calculator', desc: 'Project how a trust fund will grow from initial funding through a bene', href: '/calculators/finance/trust-fund-growth-calculator', icon: '💰', tag: 'Planning', popular: false },
  { name: 'Umbrella Insurance Calculator', desc: 'Calculate how much umbrella liability insurance you may need based on', href: '/calculators/finance/umbrella-insurance-calculator', icon: '☂️', tag: 'Planning', popular: false },
  // Tax
  { name: 'Alimony Tax Calculator', desc: 'Calculate the tax impact of alimony payments for both payer and recipi', href: '/calculators/finance/alimony-tax-calculator', icon: '⚖️', tag: 'Tax', popular: false },
  { name: 'Capital Gains Harvesting Calculator', desc: 'Calculate capital gains tax harvesting opportunities', href: '/calculators/finance/capital-gains-harvesting-calculator', icon: '🌱', tag: 'Tax', popular: false },
  { name: 'Charitable Bunching Strategy Calculator', desc: 'Calculate the extra tax savings from bunching several years of charita', href: '/calculators/finance/charitable-bunching-calculator', icon: '🎁', tag: 'Tax', popular: false },
  { name: 'Charitable Giving Tax Calculator', desc: 'Calculate the true after-tax cost of charitable donations', href: '/calculators/finance/charitable-giving-tax-calculator', icon: '❤️', tag: 'Tax', popular: false },
  { name: 'Donor-Advised Fund Calculator', desc: 'Calculate the tax savings from contributing appreciated stock to a don', href: '/calculators/finance/donor-advised-fund-calculator', icon: '🎁', tag: 'Tax', popular: false },
  { name: 'Federal Contractor Tax Calculator', desc: 'Calculate net take-home pay for federal contractors as W-2, 1099, or C', href: '/calculators/finance/federal-contractor-tax-calculator', icon: '🏛️', tag: 'Tax', popular: false },
  { name: 'FICA Tax Calculator', desc: 'Calculate FICA taxes: Social Security and Medicare tax for employees a', href: '/calculators/finance/fica-tax-calculator', icon: '🏛️', tag: 'Tax', popular: false },
  { name: 'Freelancer Quarterly Tax Calculator', desc: 'Calculate quarterly estimated tax payments for freelancers and self-em', href: '/calculators/finance/freelancer-quarterly-tax-calculator', icon: '📅', tag: 'Tax', popular: false },
  { name: 'Gig Economy Tax Calculator', desc: 'Calculate net take-home pay from gig work after SE tax, federal income', href: '/calculators/finance/gig-economy-tax-calculator', icon: '🚗', tag: 'Tax', popular: false },
  { name: 'HSA Triple Tax Growth Calculator', desc: 'Calculate the triple tax advantage of your HSA account: tax-free contr', href: '/calculators/finance/hsa-triple-tax-growth-calculator', icon: '🏥', tag: 'Tax', popular: false },
  { name: '', desc: 'Estimate your complete 2026 federal income tax from all sources — wage', href: '/calculators/finance/income-tax-estimator', icon: '🧾', tag: 'Tax', popular: false },
  { name: 'IRS Installment Agreement Calculator', desc: 'Calculate IRS installment agreement monthly payments, penalty and inte', href: '/calculators/finance/irs-installment-agreement-calculator', icon: '📋', tag: 'Tax', popular: false },
  { name: 'K-1 Income Tax Calculator', desc: 'Calculate federal tax on Schedule K-1 income from partnerships, S-corp', href: '/calculators/finance/k1-income-tax-calculator', icon: '📋', tag: 'Tax', popular: false },
  { name: 'Nanny Tax Calculator', desc: 'Calculate household employer \\', href: '/calculators/finance/nanny-tax-calculator', icon: '👶', tag: 'Tax', popular: false },
  { name: 'Net Operating Loss (NOL) Calculator', desc: 'Calculate your Net Operating Loss, immediate tax offset, carry-forward', href: '/calculators/finance/net-operating-loss-calculator', icon: '📋', tag: 'Tax', popular: false },
  { name: 'QSBS Section 1202 Calculator', desc: 'Calculate the potential federal capital gains tax exclusion on Qualifi', href: '/calculators/finance/qsbs-calculator', icon: '🚀', tag: 'Tax', popular: false },
  { name: 'Qualified Dividend Tax Calculator', desc: 'Calculate tax on qualified dividends vs ordinary dividends in USA 2026', href: '/calculators/finance/qualified-dividend-tax-calculator', icon: '💰', tag: 'Tax', popular: false },
  { name: 'Rental Property Tax Strategy Calculator', desc: 'Calculate after-tax rental property cash flow by combining rental inco', href: '/calculators/finance/rental-property-tax-strategy-calculator', icon: '🏘️', tag: 'Tax', popular: false },
  { name: 'Spin-Off Tax Basis Calculator', desc: 'Calculate adjusted cost basis allocation between parent company and sp', href: '/calculators/finance/spin-off-tax-basis-calculator', icon: '📈', tag: 'Tax', popular: false },
  { name: 'State Estate Tax Calculator', desc: 'Calculate combined federal and state estate tax — several states plus', href: '/calculators/finance/state-estate-tax-calculator', icon: '⚖️', tag: 'Tax', popular: false },
  { name: 'Stock Option Tax Calculator', desc: 'Calculate taxes on ISO (Incentive Stock Options) and NSO (Non-Qualifie', href: '/calculators/finance/stock-option-tax-calculator', icon: '💎', tag: 'Tax', popular: false },
  { name: 'Real Estate Syndication K-1 Tax Calculator', desc: 'Calculate after-tax returns from a real estate syndication K-1 includi', href: '/calculators/finance/syndication-k1-tax-calculator', icon: '📋', tag: 'Tax', popular: false },
  { name: 'Tax Deferral Benefit Calculator', desc: 'Compare after-tax wealth accumulation from a Traditional IRA, Roth IRA', href: '/calculators/finance/tax-deferral-benefit-calculator', icon: '📊', tag: 'Tax', popular: false },
  { name: 'Tax-Efficient Retirement Withdrawal Calculator', desc: 'Optimize which retirement accounts to withdraw from first — minimizing', href: '/calculators/finance/tax-efficient-withdrawal-calculator', icon: '💰', tag: 'Tax', popular: false },
  { name: 'Tax-Exempt vs Taxable Bond Comparison Calculator', desc: 'Compare after-tax yields on municipal bonds vs corporate bonds vs US T', href: '/calculators/finance/tax-exempt-bond-comparison-calculator', icon: '📊', tag: 'Tax', popular: false },
  { name: 'Tax-Free Savings Optimizer', desc: 'Find every tax-free and tax-deferred savings account available to you', href: '/calculators/finance/tax-free-savings-optimizer', icon: '💡', tag: 'Tax', popular: false },
  { name: 'Tax-Loss Harvesting Portfolio Calculator', desc: 'Calculate tax savings from harvesting investment losses — offset gains', href: '/calculators/finance/tax-loss-harvesting-portfolio-calculator', icon: '🌿', tag: 'Tax', popular: false },
  { name: 'W-2 vs 1099 Calculator', desc: 'Compare W-2 employee vs 1099 independent contractor taxes USA 2026', href: '/calculators/finance/w2-vs-1099-calculator', icon: '⚖️', tag: 'Tax', popular: false },
  { name: 'Wash Sale Rule Calculator', desc: 'Calculate wash sale rule impact on your tax-loss harvesting', href: '/calculators/finance/wash-sale-calculator', icon: '🔄', tag: 'Tax', popular: false },
  // Business
  { name: 'Background Check ROI Calculator', desc: 'Calculate the return on investment from pre-employment background scre', href: '/calculators/finance/background-check-roi-calculator', icon: '🔍', tag: 'Business', popular: false },
  { name: 'Business Startup Cost & Break-Even Calculator', desc: 'Calculate business startup break-even timeline, monthly cash flow, and', href: '/calculators/finance/business-startup-calculator', icon: '🏢', tag: 'Business', popular: false },
  { name: 'ESOP Value Calculator', desc: 'Estimate the vested value of your Employee Stock Ownership Plan (ESOP)', href: '/calculators/finance/esop-value-calculator', icon: '📈', tag: 'Business', popular: false },
  { name: 'Profit Sharing Plan Calculator', desc: 'Calculate profit sharing plan contributions, tax savings, and long-ter', href: '/calculators/finance/profit-sharing-plan-calculator', icon: '💼', tag: 'Business', popular: false },
  { name: 'Side Hustle Break-Even Calculator', desc: 'Calculate exactly how many units or hours your side hustle needs to se', href: '/calculators/finance/side-hustle-breakeven-calculator', icon: '💡', tag: 'Business', popular: false },
  { name: 'Startup Equity Value Calculator', desc: 'Estimate the potential exit value of your startup equity grant, accoun', href: '/calculators/finance/startup-equity-value-calculator', icon: '🚀', tag: 'Business', popular: false },
  // Investment
  { name: 'Section 179 & Bonus Depreciation Calculator', desc: 'Calculate Section 179 and bonus depreciation deductions for business a', href: '/calculators/finance/bonus-depreciation-calculator', icon: '🏗️', tag: 'Investment', popular: false },
  { name: 'Collectibles Investment Calculator', desc: 'Calculate the true net return on collectibles investing after insuranc', href: '/calculators/finance/collectibles-investment-calculator', icon: '🎨', tag: 'Investment', popular: false },
  { name: 'Cost Segregation Study Calculator', desc: 'Calculate the first-year tax savings from a cost segregation study — a', href: '/calculators/finance/cost-segregation-study-calculator', icon: '🏗️', tag: 'Investment', popular: false },
  { name: 'Crypto Staking Rewards Calculator', desc: 'Calculate crypto staking rewards with compounding, effective APY vs no', href: '/calculators/finance/crypto-staking-calculator', icon: '₿', tag: 'Investment', popular: false },
  { name: 'Dividend Growth Portfolio Calculator', desc: 'Model a dividend growth investing strategy — showing how yield on cost', href: '/calculators/finance/dividend-growth-portfolio-calculator', icon: '💰', tag: 'Investment', popular: false },
  { name: 'House Hacking ROI Calculator', desc: 'Calculate how much house hacking reduces your effective mortgage payme', href: '/calculators/finance/house-hacking-roi-calculator', icon: '🏘️', tag: 'Investment', popular: false },
  { name: 'Investment Fee Drag Calculator', desc: 'Calculate the compounding wealth destruction from investment fees', href: '/calculators/finance/investment-fee-drag-calculator', icon: '📉', tag: 'Investment', popular: false },
  { name: 'Investment Property Depreciation Calculator', desc: 'Calculate annual depreciation deductions on a rental property using th', href: '/calculators/finance/investment-property-depreciation-calculator', icon: '🏘️', tag: 'Investment', popular: false },
  { name: 'Investment Property Leverage Calculator', desc: 'Compare leveraged vs unleveraged returns on investment property — show', href: '/calculators/finance/investment-property-leverage-calculator', icon: '🏘️', tag: 'Investment', popular: false },
  { name: 'K-1 Passive Activity Loss Calculator', desc: 'Calculate how much of your K-1 passive activity loss is deductible now', href: '/calculators/finance/k1-passive-loss-calculator', icon: '📋', tag: 'Investment', popular: false },
  { name: 'Leveraged ETF Volatility Decay Calculator', desc: 'Model how volatility decay erodes leveraged ETF returns over time — sh', href: '/calculators/finance/leveraged-etf-decay-calculator', icon: '📉', tag: 'Investment', popular: false },
  { name: 'Margin Trading Calculator', desc: 'Calculate margin trading returns, interest costs, break-even rates, an', href: '/calculators/finance/margin-trading-calculator', icon: '📉', tag: 'Investment', popular: false },
  { name: 'Municipal Bond Ladder Calculator', desc: 'Build a staggered municipal bond ladder for tax-free income with regul', href: '/calculators/finance/municipal-bond-ladder-calculator', icon: '🏛️', tag: 'Investment', popular: false },
  { name: 'Opportunity Zone Investment Calculator', desc: 'Calculate tax benefits of Opportunity Zone investments — defer capital', href: '/calculators/finance/opportunity-zone-calculator', icon: '🏙️', tag: 'Investment', popular: false },
  { name: 'Options Greeks Calculator', desc: 'Calculate option fair value and the Greeks (delta, gamma, theta, vega)', href: '/calculators/finance/options-greeks-calculator', icon: '📈', tag: 'Investment', popular: false },
  { name: 'Passive Income Portfolio Calculator', desc: 'Calculate how large your dividend, rental, and bond portfolio needs to', href: '/calculators/finance/passive-income-portfolio-calculator', icon: '💰', tag: 'Investment', popular: false },
  { name: 'Peer-to-Peer Lending Returns Calculator', desc: 'Calculate net peer-to-peer lending returns after accounting for expect', href: '/calculators/finance/peer-to-peer-lending-calculator', icon: '🤝', tag: 'Investment', popular: false },
  { name: 'Portfolio Rebalancing Calculator', desc: 'Calculate exactly what to buy and sell to rebalance your portfolio to', href: '/calculators/finance/portfolio-rebalancing-calculator', icon: '⚖️', tag: 'Investment', popular: false },
  { name: 'Rental Property Depreciation Calculator', desc: 'Calculate residential and commercial rental property depreciation sche', href: '/calculators/finance/rental-property-depreciation-calculator', icon: '🏘️', tag: 'Investment', popular: false },
  { name: 'Series EE Savings Bond Calculator', desc: 'Calculate Series EE savings bond current value, guaranteed doubling at', href: '/calculators/finance/series-ee-bond-calculator', icon: '🏛️', tag: 'Investment', popular: false },
  { name: 'Stock Option Vesting Calculator', desc: 'Calculate the value of vesting stock options year-by-year, tax impact', href: '/calculators/finance/stock-option-vesting-calculator', icon: '📊', tag: 'Investment', popular: false },
  { name: 'Stock Split Calculator', desc: 'Calculate your new share count and price after any stock split ratio', href: '/calculators/finance/stock-split-calculator', icon: '📊', tag: 'Investment', popular: false },
  { name: 'TIPS vs Nominal Bonds Calculator', desc: 'Compare TIPS (inflation-protected bonds) vs nominal bonds after tax, a', href: '/calculators/finance/tips-vs-nominal-bonds-calculator', icon: '📊', tag: 'Investment', popular: false },
  { name: 'Treasury Bill (T-Bill) Calculator', desc: 'Calculate Treasury Bill returns, bond equivalent yield, annualized ret', href: '/calculators/finance/treasury-bill-calculator', icon: '🏦', tag: 'Investment', popular: false },
  { name: 'Vacation Rental ROI Calculator', desc: 'Calculate cap rate, cash flow, and total return on short-term rental p', href: '/calculators/finance/vacation-rental-roi-calculator', icon: '🏖️', tag: 'Investment', popular: false },
  // Loan
  { name: 'Bridge Loan Calculator', desc: 'Calculate bridge loan interest costs and total expense for financing a', href: '/calculators/finance/bridge-loan-calculator', icon: '🌉', tag: 'Loan', popular: false },
  { name: 'FHA vs Conventional Mortgage Calculator', desc: 'Compare FHA loan vs conventional mortgage total costs, monthly payment', href: '/calculators/finance/fha-vs-conventional-calculator', icon: '🏡', tag: 'Loan', popular: false },
  { name: 'Mortgage Forbearance Cost Calculator', desc: 'Calculate the true long-term cost of taking mortgage forbearance — int', href: '/calculators/finance/forbearance-cost-calculator', icon: '🏠', tag: 'Loan', popular: false },
  { name: 'Home Equity Loan vs Personal Loan Calculator', desc: 'Compare total interest cost between a home equity loan and an unsecure', href: '/calculators/finance/home-equity-vs-personal-loan', icon: '⚖️', tag: 'Loan', popular: false },
  { name: 'Loan Origination Fee Calculator', desc: 'Calculate the true cost of loan origination fees, effective APR, and b', href: '/calculators/finance/loan-origination-fee-calculator', icon: '💵', tag: 'Loan', popular: false },
  { name: 'Mortgage Forbearance Impact Calculator', desc: 'Calculate the true cost of mortgage forbearance including interest acc', href: '/calculators/finance/mortgage-forbearance-impact-calculator', icon: '🏠', tag: 'Loan', popular: false },
  { name: 'Mortgage Refinance Break-Even Calculator', desc: 'Calculate exactly how many months to break even on refinancing closing', href: '/calculators/finance/mortgage-refinance-breakeven-calculator', icon: '🔄', tag: 'Loan', popular: false },
  { name: 'PMI Calculator', desc: 'Calculate monthly PMI cost, how long until PMI is removed at 80% loan-', href: '/calculators/finance/pmi-calculator', icon: '🏠', tag: 'Loan', popular: false },
  { name: 'Relocation Mortgage & Cost of Living Calculator', desc: 'Compare your current mortgage against a new mortgage after relocating', href: '/calculators/finance/relocation-mortgage-calculator', icon: '🗺️', tag: 'Loan', popular: false },
  { name: 'Reverse Mortgage Calculator', desc: 'Estimate how much cash a reverse mortgage (HECM) could provide based o', href: '/calculators/finance/reverse-mortgage-calculator', icon: '🏠', tag: 'Loan', popular: false },
  { name: 'SBA Loan Calculator', desc: 'Calculate SBA loan monthly payment, DSCR eligibility, total interest c', href: '/calculators/finance/sba-loan-calculator', icon: '🏢', tag: 'Loan', popular: false },
  { name: 'Shareholder Loan Calculator', desc: 'Calculate the tax implications of shareholder loans from closely-held', href: '/calculators/finance/shareholder-loan-calculator', icon: '📋', tag: 'Loan', popular: false },
  // Salary
  { name: 'Career Lifetime Earnings Calculator', desc: 'Project your total lifetime career earnings based on starting salary', href: '/calculators/finance/career-earnings-calculator', icon: '💹', tag: 'Salary', popular: false },
  { name: 'Merit Raise vs Job Change Calculator', desc: 'Compare the lifetime financial impact of staying for annual merit rais', href: '/calculators/finance/merit-raise-vs-job-change-calculator', icon: '💼', tag: 'Salary', popular: false },
  { name: 'Real Wage Growth Calculator', desc: 'Calculate whether your salary raises have kept pace with inflation', href: '/calculators/finance/real-wage-growth-calculator', icon: '💹', tag: 'Salary', popular: false },
  { name: 'Salary Negotiation Lifetime Impact Calculator', desc: 'Calculate the true lifetime financial impact of a salary negotiation —', href: '/calculators/finance/salary-negotiation-lifetime-calculator', icon: '💼', tag: 'Salary', popular: false },
  // Debt
  { name: 'College Debt Burden Calculator', desc: 'Calculate whether your student loan burden is manageable relative to e', href: '/calculators/finance/college-debt-burden-calculator', icon: '🎓', tag: 'Debt', popular: false },
  { name: 'Debt-to-Income Optimizer', desc: 'Calculate your current DTI ratio, maximum mortgage you qualify for, an', href: '/calculators/finance/debt-to-income-optimizer', icon: '📋', tag: 'Debt', popular: false },
  { name: 'Wage Garnishment Calculator', desc: 'Calculate the maximum amount that can legally be garnished from your p', href: '/calculators/finance/wage-garnishment-calculator', icon: '📋', tag: 'Debt', popular: false },
  // Utility
  { name: 'Personal Finance Score Calculator', desc: 'Get a comprehensive 0-100 financial health score across savings rate', href: '/calculators/finance/personal-finance-score-calculator', icon: '📊', tag: 'Utility', popular: false },
  { name: 'RV Annual Cost Calculator', desc: 'Calculate the true annual cost of RV ownership including loan payment', href: '/calculators/finance/rv-annual-cost-calculator', icon: '🚌', tag: 'Utility', popular: false },
  { name: 'Wedding Budget Calculator', desc: 'Create a complete wedding budget breakdown by category including venue', href: '/calculators/finance/wedding-budget-calculator', icon: '💍', tag: 'Utility', popular: false },
]
const tagColors: Record<string, string> = {
  Investment: 'bg-emerald-100 text-emerald-700', Loan: 'bg-blue-100 text-blue-700',
  Savings: 'bg-cyan-100 text-cyan-700', Planning: 'bg-violet-100 text-violet-700',
  Retirement: 'bg-amber-100 text-amber-700', Advanced: 'bg-rose-100 text-rose-700',
  Tracking: 'bg-indigo-100 text-indigo-700', Debt: 'bg-orange-100 text-orange-700',
  Tax: 'bg-red-100 text-red-700', Salary: 'bg-pink-100 text-pink-700',
  Interest: 'bg-teal-100 text-teal-700', Business: 'bg-purple-100 text-purple-700',
  Utility: 'bg-gray-100 text-gray-700', USA: 'bg-blue-100 text-blue-800',
  Europe: 'bg-sky-100 text-sky-700', VS: 'bg-rose-100 text-rose-700',
}

const structured = {
  '@context': 'https://schema.org', '@type': 'ItemList',
  name: 'Finance Calculators',
  url: 'https://tooltrio.com/calculators/finance',
  numberOfItems: calculators.length,
  itemListElement: calculators.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, description: c.desc, url: `https://tooltrio.com${c.href}` })),
}

export default function FinancePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured) }} />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <nav className="flex items-center gap-2 mb-6 text-sm">
            <Link href="/" className="text-gray-500 hover:text-green-600">Home</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-semibold">Finance Calculators</span>
          </nav>

          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-green-600 flex items-center justify-center shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-gray-900" style={{fontFamily:"'Inter', system-ui, sans-serif"}}>Finance Calculators</h1>
                <p className="text-green-600 font-semibold text-sm mt-0.5">Tools for planning and calculation · No account required</p>
              </div>
            </div>
            <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
              Finance calculators for <strong>SIP</strong>, <strong>EMI</strong>, <strong>GST</strong>, <strong>Income Tax</strong>, <strong>PPF</strong>, <strong>NPS</strong>, <strong>Gratuity</strong>, <strong>HRA</strong>, <strong>Currency</strong>, <strong>ROI</strong> and more. Publicly available; no account is required to run the calculation.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              {[{ label: 'Finance tools', icon: '🧮' }, { label: 'Live Charts', icon: '📊' }, { label: 'Multi-Currency', icon: '💱' }, { label: 'No account required', icon: '✅' }].map(s => (
                <div key={s.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-green-200 shadow-sm text-sm font-semibold text-gray-700">
                  <span>{s.icon}</span> {s.label}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Finance calculator directory</h2>
            <CalcFilterBar calculators={calculators} tagColors={tagColors} />
          </div>

          <div className="mt-12 p-8 rounded-3xl bg-white border border-gray-100 shadow-sm">
            <h2 className="text-xl font-black text-gray-900 mb-4">About Our Finance Calculators</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-gray-600 leading-relaxed">
              <div><h3 className="font-bold text-gray-800 mb-2">Tax Calculators</h3><p>Our <strong>income tax calculator</strong> compares New vs Old regime for FY 2026-27. The <strong>GST calculator</strong> handles all rates (5%, 12%, 18%, 28%) with CGST/SGST/IGST breakdown. The <strong>HRA calculator</strong> finds your maximum tax exemption.</p></div>
              <div><h3 className="font-bold text-gray-800 mb-2">Salary & Employee Benefits</h3><p>The <strong>salary/CTC calculator</strong> breaks down your in-hand pay from CTC with PF, TDS, and professional tax. The <strong>gratuity calculator</strong> calculates your payout after 5+ years. The <strong>NPS calculator</strong> estimates retirement corpus and monthly pension.</p></div>
              <div><h3 className="font-bold text-gray-800 mb-2">Investment Calculators</h3><p>Our <strong>PPF calculator</strong> models the tax treatment and contribution assumptions documented on its page. The <strong>ROI calculator</strong> measures your investment return against benchmarks like Nifty 50 and S&P 500. The <strong>XIRR calculator</strong> gives true annualized returns for SIPs.</p></div>
            </div>
          </div>
          <FinanceYMYLPolicy />
        </div>
      </div>

    </>
  )
}