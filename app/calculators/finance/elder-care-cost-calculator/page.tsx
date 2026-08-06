import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Elder Care Cost Calculator | Home Care vs Facility | ToolTrio',
  description: 'Compare modeled in-home elder care and facility costs using care hours, hourly rates and a facility quote, with annual and five-year budgeting totals.',
  slug: 'elder-care-cost-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['elder care cost calculator','cost of in-home caregiver','assisted living cost calculator 2026','long-term care cost estimate'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'What does the home-care estimate include?', answer: 'It multiplies monthly paid-care hours by the entered hourly rate and, on this page, applies the calculation function’s California multiplier. It does not separately add supplies, transportation, home modifications, overtime, or unpaid family care.' },
  { question: 'Why can the facility result appear even when I enter $0?', answer: 'The calculation uses a built-in assisted-living monthly estimate when the facility field is zero, then applies the same California factor. Enter a real facility quote when comparing actual options.' },
  { question: 'Does Medicare generally pay for ongoing custodial long-term care?', answer: 'This calculator should not be used to assume Medicare coverage for ongoing custodial care. Coverage depends on the service and circumstances; verify benefits directly with Medicare and the care provider.' },
  { question: 'Can Medicaid help with long-term services and supports?', answer: 'Medicaid is a major payer of long-term services and supports, including institutional and home/community services, but eligibility and covered programs vary by state.' },
  { question: 'What does the five-year estimate assume?', answer: 'The code multiplies the annual amount by five and then by 1.04. It is a simple planning uplift, not five separate years of compounded care-cost inflation.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Estate Liquidity', href: '/calculators/finance/estate-liquidity-calculator', icon: '⚖️', desc: 'Estate Liquidity' },
  { name: 'Insurance by Life Stage', href: '/calculators/finance/insurance-by-life-stage-calculator', icon: '🛡️', desc: 'Insurance by Life Stage' },
  { name: 'Estate Planning Checklist', href: '/calculators/finance/estate-planning-checklist-calculator', icon: '📋', desc: 'Estate Planning Checklist' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
