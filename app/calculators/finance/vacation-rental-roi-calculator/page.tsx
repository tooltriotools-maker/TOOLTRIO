import { CalculatorBatch19DeepDive } from '@/components/ui/CalculatorBatch19DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Vacation Rental ROI Calculator USA 2026 — Airbnb VRBO | ToolTrio',
  description: 'Calculate cap rate, cash flow, and total return on short-term rental properties. Compare Airbnb/VRBO income against long-term rental and break-even occupancy.',
  slug: 'vacation-rental-roi-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['vacation rental ROI calculator USA 2026', 'Airbnb investment calculator', 'short term rental ROI calculator', 'VRBO property calculator', 'STR cap rate calculator USA 2026'],
})
const faqs = [
  { question: 'How is effective vacation-rental revenue calculated?', answer: 'Potential annual rental revenue is multiplied by occupancy and then reduced by the entered platform-fee percentage.' },
  { question: 'What is the difference between NOI and cash flow here?', answer: 'NOI subtracts annual operating expenses from effective revenue. Cash flow then subtracts twelve mortgage payments.' },
  { question: 'How is cash-on-cash return calculated?', answer: 'The function divides annual cash flow by an assumed cash investment equal to 25% of property value.' },
  { question: 'What is break-even occupancy?', answer: 'It is the occupancy percentage needed for after-platform-fee revenue to cover annual expenses plus twelve mortgage payments under the model.' },
  { question: 'Does the calculator account for local short-term-rental rules?', answer: 'No. Zoning, permits, lodging taxes and HOA restrictions vary by location and must be checked separately before relying on a rental scenario.' },
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
        <CalculatorBatch19DeepDive slug="vacation-rental-roi-calculator" />
</>
}
