import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Spin-Off Tax Basis Calculator USA 2026 | ToolTrio',
  description: 'Calculate adjusted cost basis allocation between parent company and spin-off shares for tax purposes, based on relative fair market value.',
  slug: 'spin-off-tax-basis-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['spin-off tax basis calculator','stock spin-off cost basis allocation','how to allocate basis after spin-off','corporate spin-off tax rules'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'How is cost basis allocated after a corporate spin-off?', answer: 'Under IRS rules for a qualifying tax-free spin-off, your original cost basis in the parent company is allocated between the parent stock and the new spin-off stock based on their relative fair market values on the first trading day after the spin-off — no gain or loss is recognized at the time of the spin-off itself.' },
  { question: 'Is a spin-off a taxable event?', answer: 'A properly structured spin-off that qualifies under IRC Section 355 is generally tax-free to shareholders at the time of the distribution — you don\'t owe tax simply for receiving the new shares; instead, your existing basis is divided between the two stocks, and tax is only triggered when you eventually sell.' },
  { question: 'What if I don\'t reallocate my cost basis after a spin-off?', answer: 'Failing to properly split your basis can lead to overpaying or underpaying capital gains tax when you eventually sell either stock — companies typically publish an IRS Form 8937 with the official basis allocation percentages shortly after a spin-off, which you should use to update your records.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Stock Split Calculator', href: '/calculators/finance/stock-split-calculator', icon: '📊', desc: 'Stock Split' },
  { name: 'Wash Sale Calculator', href: '/calculators/finance/wash-sale-calculator', icon: '🔄', desc: 'Wash Sale' },
  { name: 'Capital Gains Tax', href: '/calculators/finance/capital-gains-tax-calculator', icon: '📈', desc: 'Capital Gains Tax' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
