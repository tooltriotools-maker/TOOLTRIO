import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Cap Rate Calculator USA 2026 — Real Estate Investment | ToolTrio',
  description: 'Calculate capitalization rate, NOI, gross rent multiplier, and break-even occupancy for any investment property.',
  slug: 'cap-rate-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['cap rate calculator 2026', 'capitalization rate calculator USA', 'NOI calculator real estate', 'gross rent multiplier calculator', 'real estate cap rate 2026'],
})
const faqs = [
  {
    question: 'What is a good cap rate in 2026?',
    answer: 'Cap rate benchmarks vary by market and property type. Single-family residential: 4-6% in major metros, 6-9% in secondary markets. Multifamily: 4-5.5% in gateway cities, 5.5-7.5% in secondary markets. Commercial: 5-8%. Industrial/warehouse: 4.5-6%. A good cap rate must be evaluated relative to local market conditions and your cost of capital — if borrowing at 7.5%, you need a cap rate above that to generate positive leverage.',
  },
  {
    question: "Cap rate vs cash-on-cash return — what's the difference?",
    answer: "Cap rate ignores financing: NOI / Property Value. It measures the property's return as if purchased all-cash. Cash-on-cash return accounts for your actual financing: annual cash flow after mortgage / cash invested (down payment + costs). Both metrics are necessary. Cap rate tells you how the property performs relative to market; cash-on-cash tells you your actual return on your invested dollars.",
  },
  {
    question: 'What expenses count in NOI calculation?',
    answer: 'NOI = Effective Gross Income - Operating Expenses. Operating expenses include: property taxes, insurance, property management (8-10% of rent), maintenance and repairs, utilities (if landlord-paid), HOA fees, landscaping, pest control, vacancy allowance. NOI does NOT include mortgage payments, depreciation, or income taxes — those come out after NOI in your personal return calculation.',
  }
]
const relatedCalculators = [
  { name: 'Rental Property Calculator', href: '/calculators/finance/rental-property-investment-calculator', icon: '🏘️', desc: 'Rental Property Calculator' },
  { name: 'Real Estate ROI', href: '/calculators/finance/real-estate-roi-calculator', icon: '📊', desc: 'Real Estate ROI' },
  { name: 'House Flip Calculator', href: '/calculators/finance/house-flip-calculator', icon: '🏗️', desc: 'House Flip Calculator' },
  { name: 'Mortgage Calculator', href: '/calculators/finance/mortgage-calculator', icon: '🏠', desc: 'Mortgage Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
