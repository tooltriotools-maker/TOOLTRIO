import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'RV Annual Cost Calculator USA 2026 — Is It Worth It? | ToolTrio',
  description: 'Calculate the true annual cost of RV ownership including loan payment, insurance, fuel, maintenance, storage, and campsite fees vs equivalent hotel stays.',
  slug: 'rv-annual-cost-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['RV cost calculator USA 2026', 'is owning an RV worth it calculator', 'RV annual expenses calculator', 'RV vs hotel cost comparison', 'motorhome cost calculator USA'],
})
const faqs = [
  {
    question: 'What does an RV actually cost per year?',
    answer: "Full breakdown for an $85,000 Class C RV: Loan payment ($500/month × 12 = $6,000), Insurance ($2,400), Maintenance/repairs ($1,275 at 1.5%), Fuel ($855 at 9 MPG, 45 trips × 250 miles × $3.80), Storage ($2,400), Campsite fees (45 nights × $45 = $2,025). Total: ~$14,955/year. At 45 nights, that's $332/night — more than many hotel rooms. Break-even vs hotels requires 75+ nights/year of use.",
  },
  {
    question: 'How many days do RV owners actually use their RV?',
    answer: 'RVIA surveys show average RV usage of 23-28 days per year for RV owners. Full-timers (5-10% of owners) obviously use them daily. Part-timers average 3-4 weeks annually. At 25 nights/year, cost-per-night jumps dramatically. The typical RV makes financial sense for: (1) Full-timers, (2) Extended road trip families using 60+ nights/year, (3) Those who replace expensive resort vacations with RV travel.',
  },
  {
    question: "Class A vs Class C vs Travel Trailer — what's cheapest to own?",
    answer: 'Travel trailers (towable): $25,000-$60,000 purchase, no engine maintenance, need a suitable tow vehicle. Cheapest to insure and maintain but requires tow vehicle costs. Class C motorhome: $80,000-$150,000, mid-range fuel economy (8-12 MPG), moderate maintenance. Class A motorhome: $150,000-$500,000+, 6-10 MPG, highest maintenance but most comfortable for full-timing. For occasional use, a travel trailer is almost always the most cost-effective option.',
  }
]
const relatedCalculators = [
  { name: 'Car Affordability Calculator', href: '/calculators/finance/car-affordability-calculator', icon: '🚗', desc: 'Car Affordability Calculator' },
  { name: 'Buy vs Lease Vehicle', href: '/calculators/finance/buy-vs-lease-vehicle-calculator', icon: '🚗', desc: 'Buy vs Lease Vehicle' },
  { name: 'Budget Planner Calculator', href: '/calculators/finance/budget-planner-calculator', icon: '📊', desc: 'Budget Planner Calculator' },
  { name: 'Vacation Cost Calculator', href: '/calculators/finance/vacation-cost-calculator', icon: '✈️', desc: 'Vacation Cost Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
