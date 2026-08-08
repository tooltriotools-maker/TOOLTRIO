import { CalculatorBatch16DeepDive } from '@/components/ui/CalculatorBatch16DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Federal Contractor Tax Calculator USA 2026 | ToolTrio',
  description: 'Estimate take-home pay for a Virginia 1099 federal contractor after business expenses, self-employment tax, retirement contributions and simplified income tax.',
  slug: 'federal-contractor-tax-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['federal contractor tax calculator','1099 vs W-2 vs corp-to-corp','government contractor take-home pay','self-employment tax federal contractor'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'What contractor setup does this page currently calculate?', answer: 'The current UI is configured for a 1099 independent contractor in Virginia. The underlying function can accept other contract types and states, but this page does not currently expose those selectors.' },
  { question: 'How is 2026 self-employment tax estimated?', answer: 'The model multiplies net self-employment income by 92.35%, applies the 12.4% Social Security component up to the 2026 $184,500 wage base, and applies the 2.9% Medicare component without that wage cap. It does not currently model Additional Medicare Tax.' },
  { question: 'Does the federal tax result use the full 2026 tax brackets?', answer: 'No. After modeled deductions, the calculator applies a simplified flat 22% federal income-tax rate. Actual federal income tax uses progressive brackets and depends on filing status, other income, deductions and credits.' },
  { question: 'How does the retirement contribution affect the estimate?', answer: 'The entered retirement contribution reduces the calculator’s modeled federal taxable income. Actual deductibility and contribution limits depend on the retirement plan, compensation and tax situation.' },
  { question: 'Is the quarterly estimate the amount I must pay each IRS due date?', answer: 'Not necessarily. The page divides its annual modeled tax by four for budgeting. IRS estimated-tax requirements depend on expected tax, withholding, credits and safe-harbor rules; many taxpayers use Form 1040-ES or Publication 505 to calculate required installments.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Self-Employment Tax', href: '/calculators/finance/self-employment-tax-calculator', icon: '🧾', desc: 'Self-Employment Tax' },
  { name: 'W-2 vs 1099', href: '/calculators/finance/w2-vs-1099-calculator', icon: '⚖️', desc: 'W-2 vs 1099' },
  { name: 'Freelancer Quarterly Tax', href: '/calculators/finance/freelancer-quarterly-tax-calculator', icon: '📅', desc: 'Freelancer Quarterly Tax' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
        <CalculatorBatch16DeepDive slug="federal-contractor-tax-calculator" />
</>
}
