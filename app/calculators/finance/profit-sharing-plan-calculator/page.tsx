import { CalculatorBatch14DeepDive } from '@/components/ui/CalculatorBatch14DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Profit Sharing Plan Calculator USA 2026 | ToolTrio',
  description: 'Calculate profit sharing plan contributions, tax savings, and long-term growth for business owners and employees.',
  slug: 'profit-sharing-plan-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['profit sharing plan calculator','business profit sharing tax savings','employer profit sharing contribution limit','profit sharing 401k calculator'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'What 2026 contribution ceiling does the calculator use?', answer: 'The code uses the 2026 $72,000 defined-contribution annual-additions limit. That ceiling generally includes employer contributions plus other annual additions, so it is not automatically available entirely for profit sharing.' },
  { question: 'How is the owner contribution estimated?', answer: 'It multiplies annual compensation by the selected profit-sharing percentage and caps the result at $72,000.' },
  { question: 'How is the total plan contribution estimated?', answer: 'It multiplies business profit by the same percentage, then caps the pool at $72,000 times the number of employees. Real plans allocate contributions under plan terms rather than this simple formula.' },
  { question: 'Is the displayed tax savings my actual business deduction?', answer: 'No. The code applies a fixed 37% rate to the owner contribution. IRS deduction limits and the business’s actual tax treatment can produce a different result.' },
  { question: 'Does the calculator include 401(k) employee deferrals?', answer: 'No. It focuses on the modeled profit-sharing amount. If a plan also has elective deferrals, those amounts interact with annual-additions and catch-up rules.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Self-Employed Retirement Plans', href: '/calculators/finance/self-employed-retirement-plan-comparison', icon: '💼', desc: 'Self-Employed Retirement Plans' },
  { name: 'Solo 401k Calculator', href: '/calculators/finance/solo-401k-calculator', icon: '💼', desc: 'Solo 401k' },
  { name: 'SEP IRA Calculator', href: '/calculators/finance/sep-ira-calculator', icon: '💼', desc: 'SEP IRA' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
        <CalculatorBatch14DeepDive slug="profit-sharing-plan-calculator" />
</>
}
