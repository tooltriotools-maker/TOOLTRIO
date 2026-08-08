import { CalculatorBatch17DeepDive } from '@/components/ui/CalculatorBatch17DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Salary Negotiation Lifetime Impact Calculator | ToolTrio',
  description: 'See how a negotiated starting-salary increase can compound through future raises and change modeled 10-year and career earnings.',
  slug: 'salary-negotiation-lifetime-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['salary negotiation calculator','lifetime impact of salary negotiation','how much does negotiating salary matter','compounding raises over career'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'Why can a $10,000 raise create more than $10,000 of annual impact later?', answer: 'The calculator assumes both salary paths receive the same percentage raises, so the initial salary gap itself grows at the entered raise rate.' },
  { question: 'What is included in lifetime extra earnings?', answer: 'It sums the compounded salary difference for each year through the selected retirement horizon. It does not include bonuses, equity, taxes, inflation, unemployment, or job changes.' },
  { question: 'How is the retirement benefit calculated?', answer: 'It is simply the salary difference multiplied by the retirement-savings multiple you enter. It is not a pension formula or an investment-growth projection.' },
  { question: 'Does the calculator include Social Security in total lifetime value?', answer: 'The function computes a rough Social Security field internally, but the displayed total lifetime value does not add that field; it adds modeled extra earnings and the retirement-benefit amount.' },
  { question: 'Should I use the same annual raise rate for both paths?', answer: 'That is the calculator’s controlled-comparison assumption. If the jobs have different promotion or raise trajectories, the model will not capture that difference.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Career Lifetime Earnings', href: '/calculators/finance/career-earnings-calculator', icon: '💼', desc: 'Career Lifetime Earnings' },
  { name: 'Merit Raise vs Job Change', href: '/calculators/finance/merit-raise-vs-job-change-calculator', icon: '💼', desc: 'Merit Raise vs Job Change' },
  { name: 'Paycheck Calculator', href: '/calculators/finance/paycheck-calculator', icon: '💵', desc: 'Paycheck' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
        <CalculatorBatch17DeepDive slug="salary-negotiation-lifetime-calculator" />
</>
}
