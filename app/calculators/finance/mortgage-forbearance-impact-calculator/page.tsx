import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Mortgage Forbearance Impact Calculator USA 2026 | ToolTrio',
  description: 'Calculate the true cost of mortgage forbearance including interest accrual during the pause and the long-term impact on total loan cost.',
  slug: 'mortgage-forbearance-impact-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['mortgage forbearance calculator','forbearance cost calculator','how forbearance affects mortgage','mortgage payment pause impact'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'Does interest still accrue during mortgage forbearance?', answer: 'Yes — forbearance pauses your required monthly payment, but interest generally continues to accrue on the outstanding balance during that period unless your specific program states otherwise. That accrued interest gets added back through a repayment plan, loan modification, or deferral once forbearance ends.' },
  { question: 'How does forbearance get repaid after it ends?', answer: 'Common repayment options include a lump-sum payment, a repayment plan that adds a portion of the missed payments on top of your regular payment for a set period, or a loan modification/deferral that moves the missed amount to the end of the loan term — the option available depends on your servicer and loan type.' },
  { question: 'Does forbearance hurt my credit score?', answer: 'If your loan servicer correctly reports the forbearance per federal guidance (as agreed and current, not delinquent) while you\'re enrolled, it generally should not directly damage your credit score — but confirm with your servicer, since reporting errors do happen and can affect your credit unfairly.' },
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
  </>
}
