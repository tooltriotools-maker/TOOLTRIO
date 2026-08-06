import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Rental Property Investment Calculator USA 2026 | ToolTrio',
  description: 'Calculate cap rate, cash-on-cash return, NOI, monthly cash flow, and total return on US rental property investments.',
  slug: 'rental-property-investment-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['rental property calculator 2026', 'cash on cash return calculator', 'cap rate calculator USA', 'NOI rental property calculator', 'rental investment ROI calculator'],
})
const faqs = [
 {question:'How is NOI calculated?',answer:'The model reduces monthly rent for the entered vacancy rate, subtracts operating expenses modeled as a percentage of purchase price, and annualizes the result. Mortgage payments are excluded from NOI.'},
 {question:'How is cash-on-cash return calculated?',answer:'Annual cash flow after the modeled mortgage payment is divided by the down payment. Closing costs, rehab costs and reserves are not included in the cash invested denominator.'},
 {question:'What appreciation rate does the calculator use?',answer:'The current page passes a fixed 3.5% annual appreciation assumption into the calculation. It is a scenario assumption, not a forecast for any property or market.'},
 {question:'What does total return include?',answer:'The code combines modeled sale equity, the original down payment and repeated annual cash flow over the hold period. It does not deduct selling costs, capital-gains tax or depreciation recapture.'},
 {question:'What expenses should I consider beyond this model?',answer:'Property tax, insurance, maintenance, management, utilities, HOA dues and reserves should be reflected in a realistic expense estimate. Financing fees, closing costs and major capital expenditures can also materially change returns.'}
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
