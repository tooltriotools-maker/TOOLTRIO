import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Disability Insurance Needs Calculator USA 2026 | ToolTrio',
  description: 'Calculate how much long-term disability insurance coverage you need based on income, expenses, and any existing employer short-term disability coverage.',
  slug: 'disability-insurance-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['disability insurance calculator','how much disability insurance do I need','long-term disability coverage calculator','LTD income replacement'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'How much disability insurance coverage do I need?', answer: 'Most financial planners recommend enough long-term disability coverage to replace 60-70% of your gross income, since benefits from individual policies are typically tax-free. Compare that target against your existing employer-provided short-term and long-term coverage to find any gap.' },
  { question: 'Is employer-provided disability insurance enough?', answer: 'Often not fully — many employer group plans cap benefits at a modest dollar amount or only cover a portion of salary, and coverage typically ends if you leave the job. Supplemental individual disability insurance can fill the gap and is portable if you change employers.' },
  { question: 'What\'s the difference between short-term and long-term disability insurance?', answer: 'Short-term disability (STD) typically covers a few weeks to 6 months after a brief waiting period, for temporary conditions like recovery from surgery. Long-term disability (LTD) kicks in after STD ends (or a longer elimination period) and can pay benefits for years or until retirement age for more serious, lasting conditions.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Life Insurance Needs', href: '/calculators/finance/life-insurance-needs-calculator', icon: '🛡️', desc: 'Life Insurance Needs' },
  { name: 'Umbrella Insurance', href: '/calculators/finance/umbrella-insurance-calculator', icon: '☂️', desc: 'Umbrella Insurance' },
  { name: 'Insurance by Life Stage', href: '/calculators/finance/insurance-by-life-stage-calculator', icon: '🛡️', desc: 'Insurance by Life Stage' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
