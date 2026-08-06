import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Insurance Needs by Life Stage Calculator USA 2026 | ToolTrio',
  description: 'Get a comprehensive insurance needs assessment based on your life stage — covering life, disability, umbrella, and long-term care priorities.',
  slug: 'insurance-by-life-stage-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['insurance needs by life stage','how much insurance do I need calculator','life stage insurance planning','insurance checklist by age'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'How do insurance priorities change with age and family situation?', answer: 'Young singles typically prioritize disability insurance (protecting their income) over life insurance. Once you have a spouse, dependents, or a mortgage, life insurance to replace lost income and cover debts becomes critical. Later in life, priorities often shift toward umbrella liability coverage and long-term care planning as net worth grows.' },
  { question: 'How much life insurance coverage is generally recommended?', answer: 'A common guideline is 10-15 times your annual income, adjusted for outstanding debts (like a mortgage), years until children are financially independent, and existing savings — though the right amount depends heavily on your specific family\'s income replacement needs.' },
  { question: 'When should I consider umbrella insurance?', answer: 'Umbrella liability coverage becomes more important as your net worth grows beyond what your auto and homeowners liability limits would cover in a lawsuit — protecting assets you\'ve worked to build from being seized in a large liability judgment, typically for a relatively low annual premium.' },
  { question: 'Are the coverage amounts insurer quotes?', answer: 'No. They are ToolTrio planning heuristics based on fixed life-stage multipliers and savings thresholds, not underwriting or premium quotes.' },
  { question: 'Why does long-term-care consideration start after 50?', answer: 'That is a simple trigger built into this calculator, not an eligibility rule or recommendation about the best age to buy coverage.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Life Insurance Needs', href: '/calculators/finance/life-insurance-needs-calculator', icon: '🛡️', desc: 'Life Insurance Needs' },
  { name: 'Disability Insurance', href: '/calculators/finance/disability-insurance-calculator', icon: '🦽', desc: 'Disability Insurance' },
  { name: 'Umbrella Insurance', href: '/calculators/finance/umbrella-insurance-calculator', icon: '☂️', desc: 'Umbrella Insurance' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
