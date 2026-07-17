import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Tax-Loss Harvesting Portfolio Calculator USA 2026 | ToolTrio',
  description: 'Calculate tax savings from harvesting investment losses — offset gains, deduct up to $3,000 against ordinary income, and carry forward the rest.',
  slug: 'tax-loss-harvesting-portfolio-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['tax loss harvesting calculator','harvest investment losses tax savings','capital loss carryforward calculator','tax loss harvesting $3000 limit'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'How much can tax-loss harvesting save on my tax bill?', answer: 'Realized losses first offset any realized capital gains dollar-for-dollar, and up to $3,000 of any remaining net loss can offset ordinary income each year — any loss beyond that carries forward indefinitely to offset gains or income in future years, so the benefit compounds the more gains you have to offset.' },
  { question: 'What is the wash sale rule and how does it limit tax-loss harvesting?', answer: 'The wash sale rule disallows your loss deduction if you buy the same or a \'substantially identical\' security within 30 days before or after the sale — to stay invested while harvesting a loss, many investors buy a similar (but not identical) fund or asset to maintain market exposure without triggering the wash sale rule.' },
  { question: 'Does tax-loss harvesting make sense in a down market?', answer: 'Yes — a down market creates more opportunities to realize losses on positions worth less than you paid, which is precisely when harvesting is most valuable, since you can bank those losses to offset gains realized in the same year or carry them forward to offset future taxable gains.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Tax-Loss Harvesting Calculator', href: '/calculators/finance/tax-loss-harvesting-calculator', icon: '🌿', desc: 'Tax-Loss Harvesting' },
  { name: 'Wash Sale Calculator', href: '/calculators/finance/wash-sale-calculator', icon: '🔄', desc: 'Wash Sale' },
  { name: 'Capital Gains Harvesting', href: '/calculators/finance/capital-gains-harvesting-calculator', icon: '🌱', desc: 'Capital Gains Harvesting' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
