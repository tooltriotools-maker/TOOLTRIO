import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Merit Raise vs Job Change Calculator USA 2026 | ToolTrio',
  description: 'Compare the lifetime financial impact of staying for annual merit raises versus taking a higher-paying job offer elsewhere, factoring in job change risk.',
  slug: 'merit-raise-vs-job-change-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['merit raise vs job change calculator','should I switch jobs for more pay','job hopping salary growth','internal raise vs new job offer'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'Do employees who switch jobs earn more than those who stay?', answer: 'Studies and wage data have repeatedly shown that job switchers often see meaningfully larger pay increases than employees who stay and rely on annual merit raises, which frequently trail inflation or are capped by internal salary bands — though this varies by industry, role, and individual negotiation.' },
  { question: 'What risks should I weigh against a higher job offer?', answer: 'A new role carries risks a raise at your current job doesn\'t — onboarding uncertainty, potential culture mismatch, loss of tenure-based benefits (vesting schedules, accrued PTO), and a real (if often overestimated) chance the new job doesn\'t work out. This calculator factors in a \'job change risk\' discount to reflect that uncertainty.' },
  { question: 'How much does starting salary compound over a career?', answer: 'Because future raises are typically calculated as a percentage of current salary, a higher starting point compounds every single year afterward — even a modest gap at the time of a job change can turn into a substantial cumulative difference by retirement, which is why lifetime impact, not just next year\'s paycheck, matters for this decision.' },
  { question: 'Does the switch path use my merit raise rate?', answer: 'No. The current calculation assumes a fixed 3% annual raise after the job change, while the stay path uses the merit-raise percentage you enter. That difference is an explicit modeling assumption.' },
  { question: 'What compensation is excluded?', answer: 'Bonuses, commissions, equity, retirement match, insurance, paid leave, commuting costs and taxes are excluded, so compare total compensation separately.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Career Lifetime Earnings', href: '/calculators/finance/career-earnings-calculator', icon: '💼', desc: 'Career Lifetime Earnings' },
  { name: 'Salary Negotiation Impact', href: '/calculators/finance/salary-negotiation-lifetime-calculator', icon: '💼', desc: 'Salary Negotiation Impact' },
  { name: 'Paycheck Calculator', href: '/calculators/finance/paycheck-calculator', icon: '💵', desc: 'Paycheck' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
