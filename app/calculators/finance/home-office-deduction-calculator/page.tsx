import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Home Office Deduction Calculator USA 2026 — Actual vs Simplified | ToolTrio',
  description: 'Calculate your home office deduction using actual expense method vs $5/sq ft simplified method. Find which saves more for self-employed workers.',
  slug: 'home-office-deduction-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['home office deduction calculator 2026', 'home office tax deduction USA', 'simplified home office deduction', 'actual expense method home office', 'Form 8829 calculator USA'],
})
const faqs = [
  {
    question: 'Who qualifies for the home office deduction?',
    answer: 'Self-employed individuals and independent contractors who use part of their home exclusively and regularly for business. Two tests: (1) Regular and exclusive use — a dedicated workspace used only for business, not a kitchen table or guest room. (2) Principal place of business — your primary business location or where you meet clients. W-2 employees cannot take this deduction under current law (TCJA suspended it through 2025+).',
  },
  {
    question: 'Actual method vs simplified method — which is better?',
    answer: 'Simplified: $5 per square foot up to 300 sq ft = max $1,500 deduction. Easy to calculate, no depreciation recapture on home sale. Actual: percentage of all home expenses (rent, mortgage interest, utilities, insurance, repairs, depreciation) based on office square footage. Usually produces a larger deduction for homeowners (due to depreciation) or those in high-cost areas. Runs through Form 8829.',
  },
  {
    question: 'What expenses can I deduct with the actual method?',
    answer: "Direct expenses (100%): repairs/painting only in the office, dedicated phone line. Indirect expenses (% of home): mortgage interest or rent, utilities, homeowner's insurance, general repairs, HOA fees, home depreciation. Depreciation claimed can trigger depreciation recapture (taxed at 25%) when you sell the home — a hidden cost to factor in. The simplified method avoids this entirely.",
  }
]
const relatedCalculators = [
  { name: 'Self-Employment Tax', href: '/calculators/finance/self-employment-tax-calculator', icon: '💼', desc: 'Self-Employment Tax' },
  { name: 'QBI Deduction', href: '/calculators/finance/qbi-deduction-calculator', icon: '📋', desc: 'QBI Deduction' },
  { name: 'Tax Bracket Calculator', href: '/calculators/finance/tax-bracket-calculator', icon: '🧾', desc: 'Tax Bracket Calculator' },
  { name: 'Business Valuation', href: '/calculators/finance/business-valuation-calculator', icon: '🏢', desc: 'Business Valuation' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
