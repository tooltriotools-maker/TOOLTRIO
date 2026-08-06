import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Prenup Asset Protection Calculator USA 2026 | ToolTrio',
  description: 'Estimate how much separate property and business value a prenuptial agreement could protect from division in a future divorce, based on your state and marriage length.',
  slug: 'prenup-asset-protection-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['prenup asset protection calculator','prenuptial agreement calculator','separate property protection divorce','business owner prenup calculator'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'What can a prenuptial agreement actually protect?', answer: 'A prenup can define which assets remain separate property (not subject to division) in a divorce — commonly used to protect business ownership, inheritance, pre-marital savings, and future appreciation of separate assets that might otherwise become commingled with marital property over the course of a marriage.' },
  { question: 'Does a prenup only make sense for wealthy people?', answer: 'No — prenups are increasingly common for protecting a business, clarifying debt responsibility, defining inheritance rights for children from a prior relationship, or simply creating clarity and reducing conflict, regardless of net worth.' },
  { question: 'Can a prenup be challenged or thrown out in court?', answer: 'Yes, if it wasn\'t properly executed — courts commonly invalidate prenups that lack full financial disclosure from both parties, were signed under pressure or without adequate time to review, or lack independent legal counsel for each spouse. Working with a qualified family law attorney is essential for an enforceable agreement.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Alimony Calculator', href: '/calculators/finance/alimony-calculator', icon: '⚖️', desc: 'Alimony' },
  { name: 'Estate Planning Checklist', href: '/calculators/finance/estate-planning-checklist-calculator', icon: '📋', desc: 'Estate Planning Checklist' },
  { name: 'Net Worth Calculator', href: '/calculators/finance/net-worth-calculator', icon: '💰', desc: 'Net Worth' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
