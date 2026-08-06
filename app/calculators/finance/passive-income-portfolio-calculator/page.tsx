import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Passive Income Portfolio Calculator USA 2026 | ToolTrio',
  description: 'Calculate how large your dividend, rental, and bond portfolio needs to be to generate any target monthly passive income. Model the path to financial independence.',
  slug: 'passive-income-portfolio-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['passive income portfolio calculator USA 2026', 'how much to invest for passive income', 'dividend income calculator', 'rental income portfolio calculator', 'financial independence passive income USA'],
})
const faqs = [
  {
    question: 'How much money do I need to live off dividends?',
    answer: "At 3.5% dividend yield, you need $1,714,286 to generate $60,000/year in dividends ($5,000/month). At 5% yield, you need $1,200,000. The S&P 500's dividend yield is approximately 1.4% — too low for most dividend income strategies without combining with dividend-focused ETFs (SCHD yields 3.4%, VYM yields 2.8%, DGRO yields 2.3%). High-yield dividend stocks/ETFs (5-7% yield) often sacrifice growth for income.",
  },
  {
    question: 'Is rental income better than dividend income?',
    answer: 'Rental yields (5-8% NOI) typically exceed dividend yields (2-4%) — but require active management, capital concentration, and carry more risk per dollar. Dividends offer complete passivity and liquidity at the cost of lower yield. Most passive income portfolios blend both: dividend ETFs for base income, real estate for yield enhancement, and bonds for stability. The optimal mix depends on your involvement tolerance and risk profile.',
  },
  {
    question: 'How does passive income get taxed?',
    answer: 'Qualified dividends: 0%, 15%, or 20% (same as long-term capital gains). Rental income: ordinary income rates (10-37%), but depreciation deductions offset much of the taxable income. Bond interest: ordinary income rates. REITs: most distributions taxed as ordinary income (less favorable than qualified dividends). Structuring for tax efficiency — municipal bonds in taxable accounts, REITs in tax-advantaged accounts — meaningfully improves net passive income.',
  }
]
const relatedCalculators = [
  { name: 'DRIP Calculator', href: '/calculators/finance/drip-calculator', icon: '💧', desc: 'DRIP Calculator' },
  { name: 'Rental Property Calculator', href: '/calculators/finance/rental-property-investment-calculator', icon: '🏘️', desc: 'Rental Property Calculator' },
  { name: 'FIRE Number Calculator', href: '/calculators/finance/fire-number-calculator', icon: '🔥', desc: 'FIRE Number Calculator' },
  { name: 'Dividend Calculator', href: '/calculators/finance/dividend-calculator', icon: '💰', desc: 'Dividend Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
