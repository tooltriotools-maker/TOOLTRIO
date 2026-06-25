import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Rent Increase Calculator USA 2026 — Stay or Move? | ToolTrio',
  description: 'Calculate whether to accept a rent increase or move. Compare total cost of staying vs moving, break-even months, and market rent comparison.',
  slug: 'rent-increase-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['rent increase calculator', 'should I move or stay rent increase', 'rent increase vs moving costs calculator', 'rent vs market rate comparison', 'lease renewal calculator USA 2026'],
})
const faqs = [
  {
    question: 'How do I decide whether to accept a rent increase?',
    answer: 'Calculate total cost to stay (new rent × 12) vs total cost to move (new place rent × 12 + moving costs). If staying costs less over 12 months, stay. If moving saves money within a reasonable timeframe (12-24 months), move. Also factor in: how below market is the new rent, lease flexibility, and non-financial factors like commute and quality of life.',
  },
  {
    question: 'What is a typical rent increase in 2026?',
    answer: 'Rent increases vary significantly by market. Sun Belt cities (Phoenix, Austin, Nashville) experienced 20-30% increases in 2021-2022 but have since moderated to 3-6%. Coastal cities (NYC, LA, SF) average 4-8% annually. Check local market conditions and your lease terms — most states have no rent control, so landlords can increase to market rate between leases.',
  },
  {
    question: 'Can my landlord increase rent by any amount?',
    answer: 'It depends on your state. States with rent control or rent stabilization (California (most cities), New York, Oregon) limit increases to specific percentages tied to CPI or a fixed amount. Most other states have no limit on rent increases — landlords can set any rate at lease renewal. Mid-lease increases require proper notice (30-60 days depending on state).',
  }
]
const relatedCalculators = [
  { name: 'Rent vs Buy Calculator', href: '/calculators/finance/rent-vs-buy-calculator', icon: '⚖️', desc: 'Rent vs Buy Calculator' },
  { name: 'Budget Planner Calculator', href: '/calculators/finance/budget-planner-calculator', icon: '📊', desc: 'Budget Planner Calculator' },
  { name: 'Mortgage Calculator', href: '/calculators/finance/mortgage-calculator', icon: '🏠', desc: 'Mortgage Calculator' },
  { name: 'Home Affordability Calculator', href: '/calculators/finance/home-affordability-calculator', icon: '🏡', desc: 'Home Affordability Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
