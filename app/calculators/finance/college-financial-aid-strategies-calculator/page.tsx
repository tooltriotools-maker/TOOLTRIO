import { CalculatorBatch46DeepDive } from '@/components/ui/CalculatorBatch46DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'College Financial Aid Strategy Calculator USA 2026 | ToolTrio',
  description: 'Explore a simplified college-aid planning model. It is not an official FAFSA Student Aid Index calculator and does not determine aid eligibility.',
  slug: 'college-financial-aid-strategies-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['FAFSA Student Aid Index calculator','college financial aid strategy','reduce EFC for college aid','FAFSA asset planning'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'What is the Student Aid Index (SAI)?', answer: 'The SAI replaced the old Expected Family Contribution (EFC) starting with the 2024-25 FAFSA cycle. It\'s a number (which can even be negative) used by colleges to determine need-based aid eligibility, calculated from parent and student income, assets, family size, and number in college.' },
  { question: 'How can I plan for college aid without misrepresenting information?', answer: 'Use accurate information and review the current FAFSA instructions. Asset treatment varies by category, and institutional methodologies can differ. Do not move assets or change income solely to chase a modeled SAI result without checking tax and financial consequences.' },
  { question: 'Does home equity count against financial aid?', answer: 'For the federal FAFSA, primary home equity is not counted at all. However, many private colleges use the CSS Profile, which does count home equity — so strategies differ depending on whether a school uses FAFSA-only or also requires the CSS Profile.' },
  { question: "Is this my official FAFSA Student Aid Index?", answer: "No. It is a simplified ToolTrio scenario formula and omits many inputs and allowances used in the statutory federal SAI calculation." },
  { question: "Does FAFSA count primary-home equity as a parent investment asset?", answer: "Primary-home equity is not reported as an investment asset on the FAFSA. Some institutions using other aid methodologies can ask for additional asset information." },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'College Savings Goal', href: '/calculators/finance/college-savings-goal-calculator', icon: '🎓', desc: 'College Savings Goal' },
  { name: 'College Cost Calculator', href: '/calculators/finance/college-cost-calculator', icon: '🎓', desc: 'College Cost' },
  { name: '529 vs Roth IRA', href: '/calculators/finance/529-vs-roth-ira-education-calculator', icon: '📚', desc: '529 vs Roth IRA' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
        <CalculatorBatch46DeepDive slug="college-financial-aid-strategies-calculator" />
</>
}
