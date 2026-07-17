import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Elder Care Cost Calculator USA 2026 | ToolTrio',
  description: 'Calculate the monthly and annual cost of in-home elder care or assisted living facility care based on hours needed and local rates.',
  slug: 'elder-care-cost-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['elder care cost calculator','cost of in-home caregiver','assisted living cost calculator 2026','long-term care cost estimate'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'How much does in-home elder care typically cost?', answer: 'Hourly rates for non-medical in-home care commonly range from roughly $25-$40/hour depending on region, with costs adding up quickly for round-the-clock or extensive weekly care — a modest 20 hours/week at $30/hour already totals over $31,000 per year.' },
  { question: 'Does Medicare pay for long-term elder care?', answer: 'Generally no — Medicare covers short-term skilled nursing or rehab care after a hospital stay, but not ongoing custodial care (help with bathing, dressing, meals) that most long-term elder care involves. Medicaid can cover long-term care but typically requires the recipient to spend down most assets first.' },
  { question: 'Should I choose in-home care or a facility?', answer: 'It depends on the level of care needed and cost comparison in your area — in-home care preserves independence and is often cheaper for lower care-hour needs, while assisted living or memory care facilities can become more cost-effective (and appropriate) once around-the-clock supervision or medical care is required.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Estate Liquidity', href: '/calculators/finance/estate-liquidity-calculator', icon: '⚖️', desc: 'Estate Liquidity' },
  { name: 'Insurance by Life Stage', href: '/calculators/finance/insurance-by-life-stage-calculator', icon: '🛡️', desc: 'Insurance by Life Stage' },
  { name: 'Estate Planning Checklist', href: '/calculators/finance/estate-planning-checklist-calculator', icon: '📋', desc: 'Estate Planning Checklist' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
