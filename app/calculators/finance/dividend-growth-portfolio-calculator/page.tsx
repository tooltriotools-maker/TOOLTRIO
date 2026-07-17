import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Dividend Growth Portfolio Calculator USA 2026 | ToolTrio',
  description: 'Model a dividend growth investing strategy — showing how yield on cost compounds as dividends grow faster than price over time.',
  slug: 'dividend-growth-portfolio-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['dividend growth calculator','yield on cost calculator','dividend growth investing 2026','dividend reinvestment projection'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'What is \'yield on cost\' in dividend investing?', answer: 'Yield on cost is your current annual dividend income divided by your original purchase price, not today\'s market price. As a company grows its dividend year after year, your yield on cost rises even if the stock\'s current dividend yield (based on today\'s price) stays flat.' },
  { question: 'How does dividend growth compare to dividend yield alone?', answer: 'A high current yield can be a value trap if the company isn\'t growing its payout, while a lower starting yield with strong consistent dividend growth (historically the strategy behind \'Dividend Aristocrats\') often produces a larger income stream over 15-25+ years due to compounding growth.' },
  { question: 'Are reinvested dividends taxed even if I don\'t take the cash?', answer: 'Yes — in a taxable brokerage account, dividends are taxable income in the year they\'re paid whether you reinvest them or take the cash. Qualified dividends get preferential long-term capital gains tax rates; holding dividend growth stocks in a Roth IRA or 401k avoids this annual tax drag entirely.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Dividend Calculator', href: '/calculators/finance/dividend-calculator', icon: '💰', desc: 'Dividend' },
  { name: 'Dividend Growth vs Growth Stocks', href: '/calculators/finance/dividend-growth-vs-growth-stocks-calculator', icon: '📈', desc: 'Dividend Growth vs Growth Stocks' },
  { name: 'Qualified Dividend Tax', href: '/calculators/finance/qualified-dividend-tax-calculator', icon: '💰', desc: 'Qualified Dividend Tax' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
