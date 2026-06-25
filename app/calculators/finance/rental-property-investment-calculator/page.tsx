import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Rental Property Investment Calculator USA 2026 | ToolTrio',
  description: 'Calculate cap rate, cash-on-cash return, NOI, monthly cash flow, and total return on US rental property investments.',
  slug: 'rental-property-investment-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['rental property calculator 2026', 'cash on cash return calculator', 'cap rate calculator USA', 'NOI rental property calculator', 'rental investment ROI calculator'],
})
const faqs = [
  {
    question: 'What is a good cap rate for rental property in 2026?',
    answer: "Cap rate (NOI / Purchase Price) benchmarks vary by market: 3-4% in high-cost cities (NYC, SF, LA), 5-7% in mid-tier markets, 8-10%+ in smaller markets. Higher cap rates suggest higher return potential but often higher risk. A cap rate below your mortgage rate creates negative leverage — the property doesn't generate enough income to cover financing costs.",
  },
  {
    question: 'What is cash-on-cash return?',
    answer: "Cash-on-cash return measures annual pre-tax cash flow against your actual cash invested (down payment + closing costs). Unlike cap rate, it accounts for financing. A property with 5% cap rate and 7.5% mortgage rate likely has negative cash-on-cash — you're paying more in mortgage than you receive in rent minus expenses. Experienced investors target 6-10% cash-on-cash in 2026.",
  },
  {
    question: 'What expenses should I budget for rental property?',
    answer: 'Typical annual expenses: property tax (1-2% of value), insurance (0.5-1%), maintenance/repairs (1-2%), property management (8-10% of rent), vacancy (5-10%), capital expenditures reserve (1%). Total: roughly 35-50% of gross rent. Using only mortgage vs rent in your calculation dramatically overstates profitability.',
  }
]
const relatedCalculators = [
  { name: 'Real Estate ROI Calculator', href: '/calculators/finance/real-estate-roi-calculator', icon: '📊', desc: 'Real Estate ROI Calculator' },
  { name: 'Rent vs Buy Calculator', href: '/calculators/finance/rent-vs-buy-calculator', icon: '⚖️', desc: 'Rent vs Buy Calculator' },
  { name: 'Mortgage Calculator', href: '/calculators/finance/mortgage-calculator', icon: '🏠', desc: 'Mortgage Calculator' },
  { name: 'REIT vs Direct Property', href: '/calculators/finance/reit-vs-direct-property-usa-calculator', icon: '🏢', desc: 'REIT vs Direct Property' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
