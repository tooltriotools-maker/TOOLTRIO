import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Trust Fund Growth Calculator USA 2026 | ToolTrio',
  description: 'Project how a trust fund will grow from initial funding through a beneficiary\'s distribution age, accounting for contributions, growth, and trustee fees.',
  slug: 'trust-fund-growth-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['trust fund growth calculator','trust fund projection calculator','irrevocable trust growth calculator','trust distribution age planning'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'How do trustee fees affect trust fund growth over time?', answer: 'Trustee fees (commonly a percentage of assets under management annually) compound as a drag on returns just like any investment fee — even a seemingly modest 1% annual fee can meaningfully reduce the final trust balance over a beneficiary\'s childhood and young adulthood due to lost compounding.' },
  { question: 'Why do trusts often set a distribution age well past 18?', answer: 'Many trust creators intentionally delay full distribution (common ages include 25, 30, or even staggered distributions at multiple ages) to ensure the beneficiary has more life experience and financial maturity before receiving full control of potentially significant assets, rather than an 18-year-old receiving a lump sum.' },
  { question: 'Is trust income taxed differently than personal income?', answer: 'Trusts have their own, much more compressed tax brackets — a trust can reach the top federal tax bracket at a far lower income level than an individual would, which is why trustees often distribute income to beneficiaries (who are typically taxed at their own lower individual rate) rather than letting it accumulate and get taxed inside the trust.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Estate Tax Calculator', href: '/calculators/finance/estate-tax-calculator', icon: '⚖️', desc: 'Estate Tax' },
  { name: 'Estate Liquidity', href: '/calculators/finance/estate-liquidity-calculator', icon: '⚖️', desc: 'Estate Liquidity' },
  { name: '529 vs UTMA', href: '/calculators/finance/529-vs-utma-calculator', icon: '👶', desc: '529 vs UTMA' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
