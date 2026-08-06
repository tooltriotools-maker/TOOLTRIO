import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: '2026 Income Tax Estimator USA — All Income Sources | ToolTrio',
  description: 'Estimate your complete 2026 federal income tax from all sources — wages, self-employment, investments — and see your refund or amount owed.',
  slug: 'income-tax-estimator',
  category: 'finance',
  region: 'usa',
  keywords: ['income tax estimator 2026','federal tax calculator all income','tax refund estimator USA','self-employment income tax estimate'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'What income sources does this estimator combine?', answer: 'A complete tax estimate combines W-2 wages, self-employment/1099 income (which also owes self-employment tax), and other income like interest, dividends, or side income, netted against deductions and credits to arrive at your total federal tax liability for the year.' },
  { question: 'Why might I owe money even though tax was withheld from my paycheck?', answer: 'If you have significant self-employment or investment income with no withholding, or claimed too many allowances on your W-4, your withholding may fall short of your total tax liability — this estimator helps flag a projected shortfall before tax season so you can adjust withholding or make an estimated payment.' },
  { question: 'What\'s the difference between deductions and credits?', answer: 'A deduction reduces your taxable income before tax is calculated (worth your marginal tax rate times the deduction amount), while a credit reduces your tax bill dollar-for-dollar after tax is calculated — credits are generally more valuable per dollar than deductions.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Self-Employment Tax', href: '/calculators/finance/self-employment-tax-calculator', icon: '🧾', desc: 'Self-Employment Tax' },
  { name: 'Paycheck Calculator', href: '/calculators/finance/paycheck-calculator', icon: '💵', desc: 'Paycheck' },
  { name: 'Tax-Free Savings Optimizer', href: '/calculators/finance/tax-free-savings-optimizer', icon: '💡', desc: 'Tax-Free Savings Optimizer' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
