import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Wedding Budget Calculator USA 2026 — True Cost by Region | ToolTrio',
  description: 'Create a complete wedding budget breakdown by category including venue, catering, photography, flowers, and more — with regional cost adjustments.',
  slug: 'wedding-budget-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['wedding budget calculator USA 2026', 'how much does a wedding cost USA', 'wedding cost calculator by state', 'wedding planning budget breakdown', 'average wedding cost 2026 USA'],
})
const faqs = [
  {
    question: 'What is the average wedding cost in the USA in 2026?',
    answer: 'The Knot annual survey: average US wedding cost $35,000 in 2026. Regional variation: Northeast ($45,000-$75,000+), West Coast ($40,000-$60,000), South ($28,000-$40,000), Midwest ($25,000-$38,000). New York City weddings average $80,000+. Destination weddings average $32,000. These averages are heavily skewed by a minority of very expensive weddings — median is typically 30-40% lower than mean.',
  },
  {
    question: 'How do I reduce wedding costs without sacrificing quality?',
    answer: 'Highest-impact savings: (1) Guest list — cost scales directly with headcount. Cut 20 guests, save $1,700+ in catering alone. (2) Off-peak timing: Fridays/Sundays save 20-40% on venue and vendors. January/February weddings cost 25-35% less than June/September. (3) Shorter reception: 4-hour vs 6-hour venue rental saves significantly. (4) Brunch or lunch reception vs dinner cuts catering cost 40-50%. (5) Flowers: seasonal and locally-grown cut flower budgets by 30-40%.',
  },
  {
    question: 'How should I allocate a wedding budget?',
    answer: 'Traditional allocation: Venue/catering: 45-50%, Photography/video: 8-12%, Flowers/décor: 8-10%, Music/DJ/band: 5-8%, Attire/rings: 8-12%, Stationery/transport/cake/officiant/favors: 10-15%, Buffer: 5-10%. The venue and catering typically consume the largest share — choosing the venue first with capacity constraints often forces other budget decisions naturally.',
  }
]
const relatedCalculators = [
  { name: 'Family Budget Calculator', href: '/calculators/finance/family-budget-calculator', icon: '📊', desc: 'Family Budget Calculator' },
  { name: 'Savings Goal Calculator', href: '/calculators/finance/savings-goal-calculator', icon: '🎯', desc: 'Savings Goal Calculator' },
  { name: 'Personal Loan Calculator', href: '/calculators/finance/personal-loan-calculator', icon: '💳', desc: 'Personal Loan Calculator' },
  { name: 'Budget Planner Calculator', href: '/calculators/finance/budget-planner-calculator', icon: '📊', desc: 'Budget Planner Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
