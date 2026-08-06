import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'ESOP Value Calculator USA 2026 | ToolTrio',
  description: 'Estimate the vested value of your Employee Stock Ownership Plan (ESOP) shares based on current valuation, vesting schedule, and years to distribution.',
  slug: 'esop-value-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['ESOP calculator','employee stock ownership plan value','ESOP vesting calculator','ESOP retirement distribution'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'How does ESOP vesting work?', answer: 'Most ESOPs vest on either a graded schedule (a percentage each year, fully vested after 6 years is common) or a cliff schedule (0% until a certain year, then 100%). Only your vested shares belong to you if you leave the company before the vesting schedule completes.' },
  { question: 'How is ESOP stock valued if the company isn\'t publicly traded?', answer: 'Private company ESOPs are legally required to get an independent, annual appraisal to determine fair market value per share — this valuation, not a public stock price, determines the value of your account and any distribution.' },
  { question: 'When and how do I receive my ESOP distribution?', answer: 'Distributions typically occur after you leave the company, retire, become disabled, or die, often with a required waiting period (commonly up to 5-6 years for reasons other than retirement/death/disability) and can be paid as a lump sum or installments depending on your plan\'s rules.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Startup Equity Value', href: '/calculators/finance/startup-equity-value-calculator', icon: '🚀', desc: 'Startup Equity Value' },
  { name: 'Stock Option Vesting', href: '/calculators/finance/stock-option-vesting-calculator', icon: '📈', desc: 'Stock Option Vesting' },
  { name: 'Profit Sharing Plan', href: '/calculators/finance/profit-sharing-plan-calculator', icon: '💼', desc: 'Profit Sharing Plan' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
