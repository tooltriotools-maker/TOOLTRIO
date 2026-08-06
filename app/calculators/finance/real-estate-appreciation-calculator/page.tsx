import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Real Estate Appreciation Calculator USA 2026 | ToolTrio',
  description: 'Calculate how much your home or investment property has appreciated using location and property type specific historical appreciation rates.',
  slug: 'real-estate-appreciation-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['real estate appreciation calculator USA 2026', 'home value appreciation calculator', 'property value growth calculator', 'real estate CAGR calculator', 'home appreciation by location USA'],
})
const faqs = [
  {
    question: 'What is the average home appreciation rate in the USA?',
    answer: 'National average single-family home appreciation: ~4.5-5.0% annually (urban: 5.2%, suburban: 4.5%, rural: 3.0%). The Case-Shiller National Home Price Index shows homes roughly doubling every 14-16 years. However, this varies enormously by metro: Austin and Miami saw 20-30% annual appreciation in 2020-2022, while some Midwest markets have averaged 2-3% for decades.',
  },
  {
    question: 'Does real estate beat inflation?',
    answer: "Over long periods, real estate modestly outpaces inflation (real return ~1-2% annually above CPI). The leverage benefit — buying a $350,000 property with $70,000 down and it appreciates 4.5% = $15,750 gain on $70,000 invested = 22.5% cash return — dramatically amplifies the nominal appreciation into real estate's true investment return. Without leverage, real estate barely outpaces inflation.",
  },
  {
    question: "How do I find my home's appreciation rate?",
    answer: "Tools: Zillow Home Value Index by zip code, Redfin market data, Federal Housing Finance Agency (FHFA) House Price Index by metro area. For a more precise estimate, compare your neighborhood's median sale prices from when you bought vs today using Zillow, Redfin, or your county assessor's historical records.",
  },
  { question: 'Are the appreciation rates live market forecasts?', answer: 'No. They are built-in ToolTrio scenario assumptions by location and property type, not live FHFA or local-market forecasts.' },
  { question: 'Does projected value include renovations or selling costs?', answer: 'No. Improvements, transaction costs, maintenance, taxes, financing and property condition are outside this compounding model.' },
]
const relatedCalculators = [
  { name: 'Real Estate ROI', href: '/calculators/finance/real-estate-roi-calculator', icon: '📊', desc: 'Real Estate ROI' },
  { name: 'Rental Property Calculator', href: '/calculators/finance/rental-property-investment-calculator', icon: '🏘️', desc: 'Rental Property Calculator' },
  { name: 'Real Estate Cost Basis', href: '/calculators/finance/real-estate-cost-basis-calculator', icon: '🏘️', desc: 'Real Estate Cost Basis' },
  { name: 'Mortgage vs Rent', href: '/calculators/finance/mortgage-vs-rent-calculator', icon: '⚖️', desc: 'Mortgage vs Rent' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
