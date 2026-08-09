import { CalculatorBatch27DeepDive } from '@/components/ui/CalculatorBatch27DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Child Tax Credit Calculator USA 2026 — CTC & ACTC | ToolTrio',
  description: 'Calculate Child Tax Credit, Additional Child Tax Credit refundable portion, and Child & Dependent Care Credit for your family.',
  slug: 'child-tax-credit-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['child tax credit calculator 2026', 'CTC calculator USA', 'additional child tax credit ACTC', 'child dependent care credit calculator', 'how much child tax credit 2026'],
})
const faqs = [
  {
    question: 'What is the Child Tax Credit for 2026?',
    answer: '$2,200 per qualifying child under 17 in 2026, with up to $1,700 refundable as the Additional Child Tax Credit (ACTC). The credit phases out at $200,000 AGI (single) or $400,000 (married) — reducing by $50 for every $1,000 over the threshold. For families under these limits, the full $2,200 per child is available.',
  },
  {
    question: 'What is the Additional Child Tax Credit (ACTC)?',
    answer: 'The ACTC is the refundable portion of the Child Tax Credit — meaning you get this money even if you owe no tax. In 2026, up to $1,700 per child is refundable. The ACTC equals 15% of earned income over $2,500, up to the refundable limit. Families with 3+ children may use an alternative calculation.',
  },
  {
    question: 'What is the Child and Dependent Care Credit?',
    answer: 'Separate from the CTC, the 2026 Child & Dependent Care Credit can use up to $3,000 of qualifying expenses for one qualifying person or $6,000 for two or more. The maximum percentage is 50% and phases down based on AGI, with a 20% floor. The credit is nonrefundable, and dependent-care benefits can reduce the expenses available for the credit. This calculator models the percentage and expense cap but does not reproduce Form 2441.',
  }
]
const relatedCalculators = [
  { name: 'Dependent Care FSA Calculator', href: '/calculators/finance/dependent-care-fsa-calculator', icon: '👶', desc: 'Dependent Care FSA Calculator' },
  { name: 'Tax Bracket Calculator', href: '/calculators/finance/tax-bracket-calculator', icon: '🧾', desc: 'Tax Bracket Calculator' },
  { name: 'Income Tax Calculator', href: '/calculators/finance/income-tax-calculator', icon: '💰', desc: 'Income Tax Calculator' },
  { name: 'Budget Planner Calculator', href: '/calculators/finance/budget-planner-calculator', icon: '📊', desc: 'Budget Planner Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
        <CalculatorBatch27DeepDive slug="child-tax-credit-calculator" />
</>
}
