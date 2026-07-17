import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Real Estate Syndication K-1 Tax Calculator USA 2026 | ToolTrio',
  description: 'Calculate after-tax returns from a real estate syndication K-1 including depreciation shelter, recapture, and capital gains at sale.',
  slug: 'syndication-k1-tax-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['real estate syndication K-1 calculator','syndication tax benefits calculator','depreciation shelter syndication','K-1 real estate investment tax'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'What tax benefit does a real estate syndication K-1 typically provide?', answer: 'Passive real estate syndication investments often generate a K-1 showing a paper tax loss (driven mostly by depreciation, including accelerated depreciation from cost segregation) even while you receive positive cash distributions — this can shelter some or all of your distribution income from current tax.' },
  { question: 'What happens to depreciation when the syndication property is sold?', answer: 'At sale, accumulated depreciation is generally \'recaptured\' and taxed at a maximum 25% federal rate, in addition to standard capital gains tax on any appreciation — the syndication\'s K-1 in the year of sale typically reflects both of these tax consequences alongside your share of sale proceeds.' },
  { question: 'Are syndication K-1 losses subject to passive activity loss limits?', answer: 'Yes — as a limited partner or passive investor in most syndications, any losses are generally passive losses that can only offset passive income unless you qualify as a real estate professional, meaning K-1 losses often carry forward rather than immediately offsetting your W-2 or other active income.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'K-1 Passive Loss', href: '/calculators/finance/k1-passive-loss-calculator', icon: '📋', desc: 'K-1 Passive Loss' },
  { name: 'Real Estate Crowdfunding', href: '/calculators/finance/real-estate-crowdfunding-calculator', icon: '🏢', desc: 'Real Estate Crowdfunding' },
  { name: 'Cost Segregation Study', href: '/calculators/finance/cost-segregation-study-calculator', icon: '🏗️', desc: 'Cost Segregation Study' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
