import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Stock Split Calculator USA 2026 | ToolTrio',
  description: 'Calculate your new share count and price after any stock split ratio, including reverse splits and adjusted cost basis per share.',
  slug: 'stock-split-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['stock split calculator','reverse stock split calculator','stock split cost basis calculator','how do stock splits work'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'Does a stock split change the total value of my investment?', answer: 'No — a stock split only changes the number of shares and the price per share, not your total position value. A 2-for-1 split doubles your share count while halving the price per share, leaving your total dollar investment unchanged at the moment of the split.' },
  { question: 'How does a stock split affect my cost basis?', answer: 'Your total cost basis stays the same, but it\'s spread across more (or, in a reverse split, fewer) shares — for a 2-for-1 split, your original per-share cost basis is simply cut in half and applied to your now-doubled share count.' },
  { question: 'Why do companies do reverse stock splits?', answer: 'Reverse splits (combining shares to raise the per-share price) are often used to meet a stock exchange\'s minimum price listing requirement, or to make the stock appear more attractive to certain institutional investors — they don\'t change the underlying value of the company, only the share structure.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Spin-Off Tax Basis', href: '/calculators/finance/spin-off-tax-basis-calculator', icon: '📈', desc: 'Spin-Off Tax Basis' },
  { name: 'Dividend Calculator', href: '/calculators/finance/dividend-calculator', icon: '💰', desc: 'Dividend' },
  { name: 'Capital Gains Tax', href: '/calculators/finance/capital-gains-tax-calculator', icon: '📈', desc: 'Capital Gains Tax' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
