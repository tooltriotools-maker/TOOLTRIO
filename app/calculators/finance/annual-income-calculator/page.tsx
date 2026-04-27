import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateCalculatorRatingSchema } from '@/lib/seo/metadata'
import AnnualIncomeCalculatorClient from './AnnualIncomeCalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
 title: 'Annual Income Calculator USA 2026 – Hourly to Yearly Salary Converter',
 description: 'Free annual income calculator USA 2026. Convert hourly wage to annual salary, weekly to monthly pay, and see your complete compensation breakdown. Real examples for $15-$75/hr and $30k-$200k salaries.',
 slug: 'annual-income-calculator',
 category: 'finance',
 region: 'usa',
 keywords: [
 'annual income calculator 2026',
 
 'annual income calculator', 'hourly to annual salary calculator', 'hourly wage to annual salary',
 'how much do I make a year calculator', 'annual salary calculator',
 'hourly rate to yearly salary', 'income calculator per year',
 '$25 an hour is how much a year', 'yearly income calculator',
 'gross annual income calculator', 'take home pay calculator hourly',
 'biweekly pay calculator', 'salary converter calculator', 'wage calculator USA',
 ],
})

const faqs = [
 { question: 'How much is $25/hour annually?', answer: '$25/hour x 40 hours/week x 52 weeks = $52,000 gross annual salary. After estimated taxes (federal ~22%, FICA 7.65%, state ~5% = 34.65% total): net take-home ~= $34,000/year, or $2,833/month. Note: your actual tax rate depends on your filing status, deductions, state, and other income. Use the IRS withholding estimator for exact calculations.' },
 { question: 'How do you convert hourly pay to annual salary?', answer: 'Simple formula: Hourly Rate x Hours per Week x Weeks per Year = Annual Gross. Most full-time employees: hourly x 40 x 52 = hourly x 2,080. Examples: $15/hr = $31,200/yr. $20/hr = $41,600/yr. $25/hr = $52,000/yr. $30/hr = $62,400/yr. $50/hr = $104,000/yr. Part-time (20 hrs): multiply by 1,040 instead.' },
 { question: 'What is the difference between gross and net income?', answer: 'Gross income is your total pay before any deductions. Net income (take-home pay) is what hits your bank account after: federal income tax (10-37% depending on bracket), FICA (Social Security 6.2% + Medicare 1.45% = 7.65%), state income tax (0-13% depending on state), and any pre-tax deductions (401k, health insurance, HSA). The average American pays about 25-30% in combined taxes.' },
 { question: 'How do I calculate my annual income if I work different hours?', answer: 'Multiply your hourly rate by the actual hours worked. If you work 45 hours/week for 50 weeks: 45 x 50 = 2,250 hours x hourly rate. If you have overtime (1.5x rate for hours over 40): Regular hours (40 x weeks) x rate + Overtime hours x (1.5 x rate). Our calculator handles all of this automatically -- just enter your hours and it does the math.' },
]

const relatedCalculators = [
 { name: 'Paycheck Calculator', href: '/calculators/finance/paycheck-calculator', icon: '💵', desc: 'Exact withholding' },
 { name: 'Salary Calculator', href: '/calculators/finance/salary-calculator', icon: '💼', desc: 'Full salary breakdown' },
 { name: 'Budget Planner', href: '/calculators/finance/budget-planner-calculator', icon: '📊', desc: '50/30/20 budget' },
 { name: 'Savings Rate', href: '/calculators/finance/savings-rate-calculator', icon: '💰', desc: 'Are you saving enough' },
]

const structuredData = [
 generateFAQStructuredData(faqs),
 generateCalculatorRatingSchema({ name: 'Free Annual Income Calculator -- Hourly to Yearly Salary', description: 'Convert hourly wage to annual salary with take-home pay estimate after taxes.', url: 'https://tooltrio.com/calculators/finance/annual-income-calculator' }),
]

export default function AnnualIncomePage() {
 return <AnnualIncomeCalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators}
 blogSlug="annual-salary-by-hourly-rate-usa-2026" />
}
