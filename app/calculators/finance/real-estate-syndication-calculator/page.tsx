import { CalculatorBatch43DeepDive } from '@/components/ui/CalculatorBatch43DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Real Estate Syndication ROI Calculator USA 2026 | ToolTrio',
  description: 'Calculate your investor return from a real estate syndication including preferred return, promote split, equity multiple, and IRR on passive investments.',
  slug: 'real-estate-syndication-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['real estate syndication calculator', 'passive real estate investment calculator USA', 'preferred return calculator syndication', 'equity multiple IRR calculator', 'real estate crowdfunding ROI calculator'],
})
const faqs = [
  {
    question: 'How does a real estate syndication work?',
    answer: 'A syndicator (sponsor/operator) identifies a property, raises capital from passive investors (LPs), and manages the deal. Investors receive: (1) Preferred return — usually 6-8% annually on invested capital before the sponsor takes profit. (2) Equity split — remaining profits divided per the operating agreement (e.g., 70/30 LP/GP above preferred). (3) Capital return at exit when property is sold. Most syndicators charge acquisition fees (1-2%), asset management fees (1-2%/yr), and disposition fees.',
  },
  {
    question: 'What is a good equity multiple for a syndication?',
    answer: 'Equity multiples (total returned / total invested): 1.5-1.7x over 5 years = modest. 1.8-2.2x = good. 2.5x+ = excellent. A 2.0x equity multiple over 5 years equals approximately 15% IRR. Conservative deals targeting 7-9% preferred return + 1.5x equity multiple are more reliable than aggressive projections of 20%+ IRR — underwriting assumptions matter enormously. Always stress-test the deal at lower rents and higher cap rates.',
  },
  {
    question: 'What is the difference between IRR and equity multiple?',
    answer: 'IRR (Internal Rate of Return) accounts for the time value of money — higher IRR means faster return of capital. Equity multiple measures total return regardless of time. A deal returning 2x over 2 years has a much higher IRR than 2x over 10 years, but the same equity multiple. Both matter: IRR indicates efficiency of capital deployment; equity multiple shows absolute wealth creation. Real estate syndicators typically target 14-18% IRR and 1.8-2.5x equity multiple.',
  }
]
const relatedCalculators = [
  { name: 'Rental Property Calculator', href: '/calculators/finance/rental-property-investment-calculator', icon: '🏘️', desc: 'Rental Property Calculator' },
  { name: 'Real Estate ROI', href: '/calculators/finance/real-estate-roi-calculator', icon: '📊', desc: 'Real Estate ROI' },
  { name: 'REIT vs Direct Property', href: '/calculators/finance/reit-vs-direct-property-usa-calculator', icon: '🏢', desc: 'REIT vs Direct Property' },
  { name: 'Cap Rate Calculator', href: '/calculators/finance/cap-rate-calculator', icon: '📈', desc: 'Cap Rate Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
        <CalculatorBatch43DeepDive slug="real-estate-syndication-calculator" />
</>
}
