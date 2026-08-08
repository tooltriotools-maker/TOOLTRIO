import { CalculatorBatch43DeepDive } from '@/components/ui/CalculatorBatch43DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Buy vs Lease Vehicle Calculator USA 2026 | ToolTrio',
  description: 'Calculate and compare total cost of buying vs leasing a vehicle including financing, depreciation, over-mileage fees, and residual value.',
  slug: 'buy-vs-lease-vehicle-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['buy vs lease car calculator USA 2026', 'car lease vs buy comparison', 'auto lease vs finance calculator', 'is leasing a car worth it 2026', 'vehicle lease buyout calculator USA'],
})
const faqs = [
 {question:'How does the calculator compare buying and leasing?',answer:'Buying is modeled with an amortizing auto loan and estimated resale value. Leasing adds lease payments and modeled excess-mileage charges. The lower modeled net cost is shown as the winner.'},
 {question:'What depreciation does the buy calculation assume?',answer:'The code assumes the vehicle retains 85% of its prior-year value each year. That is a modeling assumption, not a vehicle-specific appraisal or used-car forecast.'},
 {question:'How are excess lease miles priced?',answer:'The model allows 12,000 miles per year and charges $0.25 for each mile above that amount. Your actual lease contract can use a different allowance and per-mile charge.'},
 {question:'Does the lease calculation include money factor and residual?',answer:'No. You enter the lease payment directly. The calculator does not reconstruct the lease from money factor, acquisition fee, taxes, disposition fee or negotiated residual.'},
 {question:'What costs are missing from the comparison?',answer:'Sales tax, registration, maintenance, repairs, insurance, lease fees and financing fees are not comprehensively modeled. Compare the result with the actual purchase and lease worksheets before deciding.'}
]
const relatedCalculators = [
  { name: 'Car Affordability Calculator', href: '/calculators/finance/car-affordability-calculator', icon: '🚗', desc: 'Car Affordability Calculator' },
  { name: 'Personal Loan Calculator', href: '/calculators/finance/personal-loan-calculator', icon: '💳', desc: 'Personal Loan Calculator' },
  { name: 'Budget Planner Calculator', href: '/calculators/finance/budget-planner-calculator', icon: '📊', desc: 'Budget Planner Calculator' },
  { name: 'Depreciation Calculator', href: '/calculators/finance/depreciation-calculator', icon: '📉', desc: 'Depreciation Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
        <CalculatorBatch43DeepDive slug="buy-vs-lease-vehicle-calculator" />
</>
}
