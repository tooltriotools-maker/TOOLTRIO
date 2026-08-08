import { CalculatorBatch12DeepDive } from '@/components/ui/CalculatorBatch12DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Mortgage Forbearance Impact Calculator | ToolTrio',
  description: 'Estimate missed payments, simple accrued interest and modeled lump-sum, deferral or modification outcomes after mortgage forbearance.',
  slug: 'mortgage-forbearance-impact-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['mortgage forbearance calculator','forbearance cost calculator','how forbearance affects mortgage','mortgage payment pause impact'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'Does mortgage forbearance erase missed payments?', answer: 'No. CFPB explains that forbearance temporarily pauses or reduces payments; the unpaid amount is still owed and must be resolved afterward.' },
  { question: 'Will I always have to repay everything in one lump sum?', answer: 'No. Depending on the loan and servicer, options can include a repayment plan, deferral or partial claim, loan modification, or reinstatement. For many government-backed loans a lump sum cannot be required as the only option.' },
  { question: 'How does this calculator estimate interest during forbearance?', answer: 'It uses simple interest on the original balance: balance × annual rate ÷ 12 × forbearance months. Your servicer’s actual accounting may differ.' },
  { question: 'What does the modification scenario do?', answer: 'The model adds its calculated accrued interest to the balance and computes a new 30-year payment at the entered rate. It does not preserve the actual remaining term or model a specific agency modification program.' },
  { question: 'Are escrow shortages included?', answer: 'No. Property taxes and insurance can affect the payment after forbearance, and CFPB notes escrow shortages may cause payments to rise. This model does not calculate that shortage.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Mortgage Calculator', href: '/calculators/finance/mortgage-calculator', icon: '🏡', desc: 'Mortgage' },
  { name: 'Mortgage Refinance Break-Even', href: '/calculators/finance/mortgage-refinance-breakeven-calculator', icon: '🏠', desc: 'Mortgage Refinance Break-Even' },
  { name: 'Debt-to-Income Optimizer', href: '/calculators/finance/debt-to-income-optimizer', icon: '⚖️', desc: 'Debt-to-Income Optimizer' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
        <CalculatorBatch12DeepDive slug="mortgage-forbearance-impact-calculator" />
</>
}
