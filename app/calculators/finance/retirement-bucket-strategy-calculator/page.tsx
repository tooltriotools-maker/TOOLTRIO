import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Retirement Bucket Strategy Calculator USA 2026 | ToolTrio',
  description: 'Model a three-bucket retirement income strategy — cash, bonds, and stocks — designed to protect against sequence-of-returns risk in early retirement.',
  slug: 'retirement-bucket-strategy-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['retirement bucket strategy calculator','bucket strategy retirement income','sequence of returns risk calculator','cash bucket retirement planning'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'What is the retirement bucket strategy?', answer: 'The bucket strategy divides your portfolio into three segments: a cash bucket covering 1-3 years of expenses (for immediate spending), a bond bucket covering the next several years (refilling the cash bucket over time), and a stock bucket for long-term growth — the structure lets you avoid selling stocks during a market downturn to fund near-term spending.' },
  { question: 'Why does \'sequence of returns risk\' matter more in early retirement?', answer: 'A market downturn in the first few years of retirement, combined with ongoing withdrawals, can permanently damage a portfolio\'s ability to recover — even if average returns over the full retirement are fine, poor early returns plus withdrawals compound the damage in a way that the same poor returns later in retirement wouldn\'t.' },
  { question: 'How often should I refill the cash bucket?', answer: 'Many retirees refill the cash bucket annually — during years the stock market performs well, selling some stock gains to replenish cash and bonds; during down years, drawing only from the cash and bond buckets and leaving the stock bucket untouched to recover.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'FIRE Calculator', href: '/calculators/finance/fire-calculator', icon: '🔥', desc: 'FIRE' },
  { name: 'Tax-Efficient Withdrawal', href: '/calculators/finance/tax-efficient-withdrawal-calculator', icon: '💰', desc: 'Tax-Efficient Withdrawal' },
  { name: 'Social Security Calculator', href: '/calculators/finance/social-security-calculator', icon: '🏛️', desc: 'Social Security' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
