import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Wealth Building Comparison Calculator USA 2026 — 5 Strategies | ToolTrio',
  description: 'Compare five wealth-building strategies side by side: index fund investing, real estate, business ownership, bonds, and savings accounts over 10-30 years.',
  slug: 'wealth-building-comparison-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['wealth building calculator USA 2026', 'best investment strategy calculator', 'index fund vs real estate calculator', 'wealth comparison calculator', 'investment strategy comparison USA'],
})
const faqs = [
  {
    question: 'What is the best investment for building wealth?',
    answer: 'Historical data: US stocks (S&P 500) average 10-11% annual return over long periods. Real estate (with leverage) averages 8-12% total return. Small business ownership has the highest potential return but also highest risk. Bonds currently yield 4-5%. HYSA yields 4.5-5% short-term. For most people with long time horizons, low-cost index funds in tax-advantaged accounts produce the best risk-adjusted, after-tax wealth accumulation.',
  },
  {
    question: 'Real estate vs stocks — which builds more wealth?',
    answer: 'Both can work well. Real estate: leverage amplifies returns (20% down on a $400K property means 5x leverage on appreciation), tax benefits (depreciation, 1031 exchanges), rental income. Stocks: higher liquidity, easier diversification, lower maintenance, automatic reinvestment. Studies show comparable long-term returns when leverage and transaction costs are properly accounted for. The best answer is diversification across both.',
  },
  {
    question: 'How does business ownership compare?',
    answer: 'Business owners who successfully build and sell businesses often achieve 10-20x or higher returns on invested capital — far exceeding passive investments. But the risk is also far higher: most small businesses fail within 5 years. The wealth distribution for business owners is bimodal: a few achieve extraordinary wealth, many lose their investment. Index funds provide average market returns with near-zero risk of total loss.',
  }
]
const relatedCalculators = [
  { name: 'Index Fund Fee Calculator', href: '/calculators/finance/index-fund-fee-calculator', icon: '📉', desc: 'Index Fund Fee Calculator' },
  { name: 'Rental Property Calculator', href: '/calculators/finance/rental-property-investment-calculator', icon: '🏘️', desc: 'Rental Property Calculator' },
  { name: 'FIRE Calculator', href: '/calculators/finance/fire-calculator', icon: '🔥', desc: 'FIRE Calculator' },
  { name: 'Net Worth Calculator', href: '/calculators/finance/net-worth-calculator', icon: '💎', desc: 'Net Worth Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
