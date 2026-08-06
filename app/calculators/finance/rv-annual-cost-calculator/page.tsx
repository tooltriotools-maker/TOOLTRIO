import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'RV Annual Cost Calculator USA 2026 — Is It Worth It? | ToolTrio',
  description: 'Calculate the true annual cost of RV ownership including loan payment, insurance, fuel, maintenance, storage, and campsite fees vs equivalent hotel stays.',
  slug: 'rv-annual-cost-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['RV cost calculator USA 2026', 'is owning an RV worth it calculator', 'RV annual expenses calculator', 'RV vs hotel cost comparison', 'motorhome cost calculator USA'],
})
const faqs = [
  { question: 'Which RV costs are included in the annual total?', answer: 'The function includes annual loan payments, $3,600 insurance, maintenance at 1.5% of RV price, modeled fuel, $2,400 storage and $45 per camping night for campsites.' },
  { question: 'Is depreciation included in total annual cost?', answer: 'No. The function calculates a 15% first-year depreciation amount internally but does not add it to the displayed total annual cash cost.' },
  { question: 'How is fuel cost estimated?', answer: 'Fuel uses camping nights × 250 miles ÷ entered MPG × $3.80 per gallon. Those fixed mileage and fuel-price assumptions should be compared with your actual travel plans.' },
  { question: 'How is RV break-even usage calculated?', answer: 'Break-even nights equal modeled annual RV cash cost divided by a fixed $200-per-night hotel comparison.' },
  { question: 'What other costs can make RV ownership more expensive?', answer: 'Registration, taxes, major repairs, tires, towing vehicle costs, financing fees and resale losses can materially increase ownership cost and are not fully modeled.' },
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
