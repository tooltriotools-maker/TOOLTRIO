import type { Metadata } from 'next'
import Link from 'next/link'
import CalcFilterBar from '@/components/ui/CalcFilterBar'

// Inline SVG icons — no external package needed in server components
function ArrowRight({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg> }
function Calculator({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="10" y2="10"/><line x1="8" y1="14" x2="10" y2="14"/><line x1="8" y1="18" x2="10" y2="18"/><line x1="14" y1="10" x2="16" y2="10"/><line x1="14" y1="14" x2="16" y2="14"/><line x1="14" y1="18" x2="16" y2="18"/></svg> }
function ChevronRight({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><polyline points="9 18 15 12 9 6"/></svg> }
function Home({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> }
function Target({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg> }
function TrendingUp({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> }
function X({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> }


export const metadata: Metadata = {
  title: 'Free Finance Calculators – Mortgage, SIP, 401k & More | ToolTrio',
  description: '167 free finance calculators for USA, UK, India & Europe. Mortgage calculator with PITI, 401k calculator with employer match, budget planner, wealth.',
  keywords: [
    'free finance calculators 2026',
    'SIP calculator India',
    'EMI calculator',
    '401k calculator USA',
    'UK income tax calculator 2026',
    'ISA calculator UK',
    'stamp duty calculator',
    'mortgage calculator',
  ],
  alternates: { canonical: 'https://tooltrio.com/calculators/finance' },
  openGraph: {
    title: 'Free Finance Calculators – Mortgage, SIP, 401k & More | ToolTrio',
    description: '167 free finance calculators: mortgage, SIP, 401k, EMI, Roth IRA, UK tax, ISA, FIRE, compound interest and more. No signup required.',
    url: 'https://tooltrio.com/calculators/finance',
    siteName: 'ToolTrio',
    type: 'website',
    images: [{ url: 'https://tooltrio.com/og-image.png', width: 1200, height: 630, alt: 'ToolTrio' }],
  },
}

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
  { name: 'Dependent Care FSA Calculator', desc: 'DC-FSA vs Child Care Credit — find the best childcare tax strategy', href: '/calculators/finance/dependent-care-fsa-calculator', icon: '👶', tag: 'Tax', popular: false },
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
  name: 'Finance Calculators - 151 Free Tools',
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
                <h1 className="text-3xl md:text-4xl font-black text-gray-900" style={{fontFamily:"'Playfair Display', serif"}}>Finance Calculators</h1>
                <p className="text-green-600 font-semibold text-sm mt-0.5">151 Free Tools . No Signup . Instant Results</p>
              </div>
            </div>
            <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
              151 free finance calculators for <strong>SIP</strong>, <strong>EMI</strong>, <strong>GST</strong>, <strong>Income Tax</strong>, <strong>PPF</strong>, <strong>NPS</strong>, <strong>Gratuity</strong>, <strong>HRA</strong>, <strong>Currency</strong>, <strong>ROI</strong> and more. All free, no login.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              {[{ label: '151 Calculators', icon: '🧮' }, { label: 'Live Charts', icon: '📊' }, { label: 'Multi-Currency', icon: '💱' }, { label: '100% Free', icon: '✅' }].map(s => (
                <div key={s.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-green-200 shadow-sm text-sm font-semibold text-gray-700">
                  <span>{s.icon}</span> {s.label}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">⭐ Most Popular</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {calculators.filter(c => c.popular).map(calc => (
                <Link key={calc.href} href={calc.href} className="flex items-center gap-3 p-4 rounded-2xl bg-white border-2 border-green-200 hover:border-green-500 hover:shadow-lg transition-all group shadow-sm">
                  <span className="text-2xl">{calc.icon}</span>
                  <span>
                    <p className="font-bold text-sm text-gray-900 group-hover:text-green-700">{calc.name}</p>
                    <p className="text-xs text-green-600 font-semibold flex items-center gap-0.5 mt-0.5">Open <ArrowRight className="w-3 h-3" /></p>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">All 151 Finance Calculators</h2>
            <CalcFilterBar calculators={calculators} tagColors={tagColors} />
          </div>

          <div className="mt-12 p-8 rounded-3xl bg-white border border-gray-100 shadow-sm">
            <h2 className="text-xl font-black text-gray-900 mb-4">About Our 30 Finance Calculators</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-gray-600 leading-relaxed">
              <div><h3 className="font-bold text-gray-800 mb-2">Tax Calculators</h3><p>Our <strong>income tax calculator</strong> compares New vs Old regime for FY 2026-27. The <strong>GST calculator</strong> handles all rates (5%, 12%, 18%, 28%) with CGST/SGST/IGST breakdown. The <strong>HRA calculator</strong> finds your maximum tax exemption.</p></div>
              <div><h3 className="font-bold text-gray-800 mb-2">Salary & Employee Benefits</h3><p>The <strong>salary/CTC calculator</strong> breaks down your in-hand pay from CTC with PF, TDS, and professional tax. The <strong>gratuity calculator</strong> calculates your payout after 5+ years. The <strong>NPS calculator</strong> estimates retirement corpus and monthly pension.</p></div>
              <div><h3 className="font-bold text-gray-800 mb-2">Investment Calculators</h3><p>Our <strong>PPF calculator</strong> shows EEE (triple tax-free) returns at 7.1%. The <strong>ROI calculator</strong> measures your investment return against benchmarks like Nifty 50 and S&P 500. The <strong>XIRR calculator</strong> gives true annualized returns for SIPs.</p></div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}