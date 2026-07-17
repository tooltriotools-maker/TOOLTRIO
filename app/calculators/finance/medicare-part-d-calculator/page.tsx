import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Medicare Part D Drug Cost Calculator USA 2026 | ToolTrio',
  description: 'Calculate total 2026 Medicare Part D costs including premiums, deductible, copays, and the $2,000 annual out-of-pocket cap.',
  slug: 'medicare-part-d-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['Medicare Part D calculator 2026','Medicare drug cost calculator','Part D out of pocket cap','Medicare prescription drug plan cost'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'What is the Medicare Part D $2,000 out-of-pocket cap?', answer: 'Starting in 2025 under the Inflation Reduction Act, Medicare Part D enrollees have an annual hard cap on out-of-pocket prescription drug costs (indexed for inflation each year). Once you hit the cap, Medicare and the plan sponsor cover 100% of covered drug costs for the rest of the calendar year.' },
  { question: 'How does the Medicare Part D deductible work?', answer: 'Most Part D plans have an annual deductible you pay in full before the plan starts sharing drug costs with you — the exact deductible amount varies by plan, up to a maximum set by Medicare each year, after which you typically pay a copay or coinsurance until reaching the annual out-of-pocket cap.' },
  { question: 'Should I choose a plan based on premium or total annual cost?', answer: 'The lowest-premium plan isn\'t always cheapest overall — plans differ in deductible, copay tiers, and which specific drugs they cover on their formulary. If you take expensive brand-name medications regularly, a higher-premium plan with better drug coverage often costs less in total than a bargain-premium plan with poor formulary coverage.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Elder Care Cost', href: '/calculators/finance/elder-care-cost-calculator', icon: '👵', desc: 'Elder Care Cost' },
  { name: 'HSA Projection', href: '/calculators/finance/hsa-projection-calculator', icon: '🏥', desc: 'HSA Projection' },
  { name: 'Retirement Healthcare Cost', href: '/calculators/finance/retirement-healthcare-cost-calculator', icon: '🏥', desc: 'Retirement Healthcare Cost' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
