import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Renters Insurance Calculator USA 2026 — Coverage & Cost | ToolTrio',
  description: 'Estimate renters insurance premium by state, calculate coverage needed for personal property, and see how deductible choices affect your annual cost.',
  slug: 'renters-insurance-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['renters insurance calculator 2026', 'how much renters insurance do I need USA', 'renters insurance cost by state', 'renters insurance personal property calculator', 'apartment insurance calculator USA'],
})
const faqs = [
  {
    question: 'How much does renters insurance cost in 2026?',
    answer: 'Average renters insurance cost: $15-25/month nationally. Ranges: California $15-20/month, Texas $20-30/month, Florida $25-40/month (hurricane risk), New York $15-25/month, Mississippi/Louisiana $30-50/month (highest risk states). Your specific premium depends on: personal property value, location, deductible, coverage type (actual cash value vs replacement cost), and credit score (in most states).',
  },
  {
    question: 'What does renters insurance cover?',
    answer: "Standard renters insurance covers: (1) Personal property — theft, fire, vandalism, certain water damage (not flooding). (2) Liability — someone injured in your apartment sues you (default $100,000 limit). (3) Loss of use — hotel and living expenses if apartment becomes uninhabitable. Does NOT cover: flooding (requires separate flood insurance), earthquakes (separate policy in CA/WA), roommate's property, high-value items above scheduled limits (jewelry, art, electronics above $1,500-$2,500 typically need a rider).",
  },
  {
    question: 'What is replacement cost vs actual cash value coverage?',
    answer: 'Actual cash value (ACV): pays what your property is worth today after depreciation. 3-year-old laptop worth $1,200 new might only pay $400 ACV. Replacement cost value (RCV): pays what it costs to replace the item today. That same laptop gets $1,200 to buy a new equivalent. RCV coverage typically costs 10-15% more in premium but provides dramatically better protection. Always choose replacement cost for electronics, furniture, and clothing.',
  }
]
const relatedCalculators = [
  { name: 'Emergency Fund HYSA', href: '/calculators/finance/emergency-fund-hysa-calculator', icon: '🏦', desc: 'Emergency Fund HYSA' },
  { name: 'Budget Planner Calculator', href: '/calculators/finance/budget-planner-calculator', icon: '📊', desc: 'Budget Planner Calculator' },
  { name: 'Net Worth Calculator', href: '/calculators/finance/net-worth-calculator', icon: '💎', desc: 'Net Worth Calculator' },
  { name: 'Life Insurance Needs', href: '/calculators/finance/life-insurance-needs-calculator', icon: '🛡️', desc: 'Life Insurance Needs' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
