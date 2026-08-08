import { CalculatorBatch38DeepDive } from '@/components/ui/CalculatorBatch38DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'HSA Balance Projection Calculator USA 2026 | ToolTrio',
  description: 'Project your Health Savings Account balance at retirement based on annual contributions, investment growth, and ongoing medical expense withdrawals.',
  slug: 'hsa-projection-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['HSA projection calculator','HSA balance at retirement calculator','HSA growth calculator 2026','health savings account investment projection'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'Why is an HSA called \'triple tax-advantaged\'?', answer: 'Contributions are tax-deductible (or pre-tax through payroll), the balance grows tax-free while invested, and qualified medical withdrawals are also tax-free — no other account type offers all three tax benefits simultaneously, which is why many planners treat a fully-invested HSA as a stealth retirement account.' },
  { question: 'What happens to my HSA after age 65?', answer: 'After 65, you can withdraw HSA funds for any purpose without the 20% penalty that applies to non-medical withdrawals before then — non-medical withdrawals are simply taxed as ordinary income (like a Traditional IRA), while medical withdrawals remain completely tax-free at any age.' },
  { question: 'Should I invest my HSA balance instead of keeping it as cash?', answer: 'If you can afford to pay current medical expenses out of pocket, investing your HSA balance (many providers offer mutual fund or brokerage options once you hit a minimum cash threshold) lets the triple tax advantage compound over decades, similar to a 401k or IRA, rather than sitting idle as low-yield cash.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'HSA Triple Tax Growth', href: '/calculators/finance/hsa-triple-tax-growth-calculator', icon: '🏥', desc: 'HSA Triple Tax Growth' },
  { name: 'HSA vs 401k Priority', href: '/calculators/finance/hsa-vs-401k-priority-calculator', icon: '🏥', desc: 'HSA vs 401k Priority' },
  { name: 'HSA vs FSA', href: '/calculators/finance/hsa-vs-fsa-calculator', icon: '🏥', desc: 'HSA vs FSA' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
        <CalculatorBatch38DeepDive slug="hsa-projection-calculator" />
</>
}
