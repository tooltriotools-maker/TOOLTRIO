import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'HSA vs 401k Contribution Priority Calculator USA 2026 | ToolTrio',
  description: 'Find the optimal order to fund your HSA and 401k based on your employer match, tax rate, and the HSA\'s unique triple tax advantage.',
  slug: 'hsa-vs-401k-priority-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['HSA vs 401k priority calculator','contribution priority order retirement','HSA vs 401k which first','optimal savings account order 2026'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'Should I max my HSA before my 401k?', answer: 'A common priority order is: (1) contribute enough to your 401k to get the full employer match — that\'s an instant 50-100% return, (2) max out your HSA for its unique triple tax advantage, (3) return to maxing your 401k. Skipping the employer match to fund the HSA first usually leaves free money on the table.' },
  { question: 'Why is the HSA prioritized above a Roth IRA or extra 401k contributions?', answer: 'The HSA is the only account offering a tax deduction going in, tax-free growth, and tax-free withdrawals for medical expenses — a Roth IRA and 401k each only get two of those three benefits, which is why many financial planners rank a fully-funded HSA above additional retirement contributions once the employer match is captured.' },
  { question: 'What if I don\'t have a high-deductible health plan?', answer: 'You can only contribute to an HSA if you\'re enrolled in an HSA-eligible high-deductible health plan (HDHP) — if your employer only offers a standard PPO or HMO plan, this strategy doesn\'t apply and you\'d prioritize 401k and IRA contributions instead.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'HSA Projection', href: '/calculators/finance/hsa-projection-calculator', icon: '🏥', desc: 'HSA Projection' },
  { name: 'HSA Triple Tax Growth', href: '/calculators/finance/hsa-triple-tax-growth-calculator', icon: '🏥', desc: 'HSA Triple Tax Growth' },
  { name: '401k Calculator', href: '/calculators/finance/401k-calculator', icon: '💰', desc: '401k' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
