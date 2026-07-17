import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Collectibles Investment Calculator USA 2026 | ToolTrio',
  description: 'Calculate the true net return on collectibles investing after insurance, storage costs, and the 28% IRS collectibles capital gains tax rate.',
  slug: 'collectibles-investment-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['collectibles investment calculator','collectibles capital gains tax','art wine coin investment returns','28% collectibles tax rate'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'How are collectibles taxed differently from stocks?', answer: 'Long-term gains on collectibles (art, wine, coins, precious metals, trading cards, etc. held over one year) are taxed at a maximum federal rate of 28% under IRC Section 408(m) and 1(h), instead of the standard 0/15/20% long-term capital gains rates that apply to stocks and most other investments.' },
  { question: 'What ongoing costs eat into collectibles returns?', answer: 'Beyond the purchase price, collectors typically pay for insurance (often 1-2% of value annually), secure storage or safe deposit boxes, authentication/appraisal fees, and auction house commissions when selling (which can run 10-25% combined buyer\'s and seller\'s premium).' },
  { question: 'Are collectibles a good long-term investment?', answer: 'Returns are highly asset-specific and illiquid compared to stocks or bonds — some categories (like blue-chip art or rare coins) have historically appreciated, but collectibles generate no income, carry real carrying costs, and require specialized expertise to buy and sell well. Most advisors suggest treating them as a small satellite allocation, not a core holding.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Portfolio Rebalancing', href: '/calculators/finance/portfolio-rebalancing-calculator', icon: '🪙', desc: 'Portfolio Rebalancing' },
  { name: 'Net Worth Calculator', href: '/calculators/finance/net-worth-calculator', icon: '💰', desc: 'Net Worth' },
  { name: 'Capital Gains Tax', href: '/calculators/finance/capital-gains-tax-calculator', icon: '📈', desc: 'Capital Gains Tax' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
