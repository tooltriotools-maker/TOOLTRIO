import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Buy vs Lease Vehicle Calculator USA 2026 | ToolTrio',
  description: 'Calculate and compare total cost of buying vs leasing a vehicle including financing, depreciation, over-mileage fees, and residual value.',
  slug: 'buy-vs-lease-vehicle-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['buy vs lease car calculator USA 2026', 'car lease vs buy comparison', 'auto lease vs finance calculator', 'is leasing a car worth it 2026', 'vehicle lease buyout calculator USA'],
})
const faqs = [
  {
    question: 'When is leasing a car better than buying?',
    answer: 'Leasing wins when: (1) You want a new car every 2-3 years. (2) You drive under the mileage allowance (typically 10,000-15,000 miles/year). (3) The business use percentage allows you to deduct lease payments. (4) Manufacturer lease incentives make the effective cost very low. (5) You prefer lower monthly payments. Buying wins when: you drive high mileage, plan to keep the vehicle 6+ years, or want to build equity in an asset.',
  },
  {
    question: 'What are the hidden costs of leasing?',
    answer: "Common lease traps: (1) Over-mileage fees: $0.15-$0.35/mile over the allowance. At 3,000 extra miles × $0.25 = $750. (2) Excess wear and tear charges at lease return. (3) Disposition fee: $300-$500 at end of lease if you don't buy or lease again. (4) Early termination: typically you owe all remaining payments. (5) Gap insurance: recommended but often not included by default. (6) Money factor (interest rate) — convert to APR by multiplying by 2,400.",
  },
  {
    question: 'How do I evaluate a lease deal?',
    answer: 'Key metrics: (1) Residual value % — higher is better for lessee (lower depreciation to cover). (2) Money factor — multiply × 2,400 to get APR. (3) Cap cost reduction needed (down payment). (4) Acquisition fee (usually $895-$995). (5) Subsidized vs non-subsidized — manufacturer sometimes subsidizes both rate and residual, making leases much more attractive than buying in that period. Compare effective monthly cost per mile for apples-to-apples comparison.',
  }
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
  </>
}
