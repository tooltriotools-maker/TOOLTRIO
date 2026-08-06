import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Net Operating Loss (NOL) Calculator USA 2026 | ToolTrio',
  description: 'Calculate your Net Operating Loss, immediate tax offset, carry-forward amount, and present value of future income shielding.',
  slug: 'net-operating-loss-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['net operating loss calculator','NOL carryforward calculator','business loss tax deduction','NOL 80% income limitation'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'What is a Net Operating Loss (NOL) for tax purposes?', answer: 'An NOL occurs when your allowable tax deductions exceed your taxable income for the year — typically from a business loss. Rather than that loss simply disappearing, current law lets you carry it forward to offset taxable income in future profitable years.' },
  { question: 'Can I still carry an NOL back to a prior year?', answer: 'Under current law (post-TCJA), most NOLs generated after 2020 can only be carried forward, not back, to prior tax years (with limited exceptions for certain farming losses and insurance companies) — unlike pre-2018 rules that allowed a 2-year carryback.' },
  { question: 'Is there a limit on how much NOL I can use in one year?', answer: 'Yes — an NOL carried forward can generally offset only up to 80% of taxable income in the year it\'s used (before the NOL deduction itself), meaning even a large NOL can\'t fully eliminate your tax liability in a single high-income year; the unused portion continues carrying forward indefinitely.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Income Tax Estimator', href: '/calculators/finance/income-tax-estimator', icon: '🧾', desc: 'Income Tax Estimator' },
  { name: 'K-1 Passive Loss', href: '/calculators/finance/k1-passive-loss-calculator', icon: '📋', desc: 'K-1 Passive Loss' },
  { name: 'Self-Employment Tax', href: '/calculators/finance/self-employment-tax-calculator', icon: '🧾', desc: 'Self-Employment Tax' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
