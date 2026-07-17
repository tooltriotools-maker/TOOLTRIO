import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Vacation Rental ROI Calculator USA 2026 — Airbnb VRBO | ToolTrio',
  description: 'Calculate cap rate, cash flow, and total return on short-term rental properties. Compare Airbnb/VRBO income against long-term rental and break-even occupancy.',
  slug: 'vacation-rental-roi-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['vacation rental ROI calculator USA 2026', 'Airbnb investment calculator', 'short term rental ROI calculator', 'VRBO property calculator', 'STR cap rate calculator USA 2026'],
})
const faqs = [
  {
    question: 'What is a good return on an Airbnb investment?',
    answer: 'STR benchmarks: cap rate above 6% in most markets, cash-on-cash above 8% on your down payment, and gross yield (annual revenue/price) above 12-15%. AirDNA data shows top-performing STR markets average 45-65% occupancy at $150-$350 average daily rate. Markets like Gatlinburg TN, Smoky Mountains, Scottsdale AZ, and Gulf Coast Florida show strong STR returns; high-cost coastal cities (SF, NYC) rarely produce positive cash flow at current purchase prices.',
  },
  {
    question: 'How do I estimate vacation rental revenue?',
    answer: 'Best tools: AirDNA ($25-$100/month) — shows actual revenue data by market and property type. Rabbu.com (free estimates), AllTheRooms, Mashvisor. Ask: What do comparable properties earn on Airbnb/VRBO in this specific market? Look at actual listings, their calendars (to estimate occupancy), and pricing. Never rely on seller-provided projections without independent verification. Occupancy rates and ADR vary enormously by season, market, and property quality.',
  },
  {
    question: 'What STR regulations should I know?',
    answer: 'Short-term rental regulations vary dramatically: San Francisco, New York City, and Santa Monica have near-prohibitive STR rules (owner must be present, limited nights per year). Palm Springs, Scottsdale, and Nashville are STR-friendly. HOAs often prohibit STRs entirely. Always verify: city/county permit requirements, HOA rules, zoning regulations, and tax obligations (transient occupancy tax in most jurisdictions). Buy first, research STR feasibility after — is a common and costly mistake.',
  }
]
const relatedCalculators = [
  { name: 'Rental Property Calculator', href: '/calculators/finance/rental-property-investment-calculator', icon: '🏘️', desc: 'Rental Property Calculator' },
  { name: 'Cap Rate Calculator', href: '/calculators/finance/cap-rate-calculator', icon: '📈', desc: 'Cap Rate Calculator' },
  { name: 'Real Estate ROI', href: '/calculators/finance/real-estate-roi-calculator', icon: '📊', desc: 'Real Estate ROI' },
  { name: 'Real Estate Syndication', href: '/calculators/finance/real-estate-syndication-calculator', icon: '🏢', desc: 'Real Estate Syndication' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
