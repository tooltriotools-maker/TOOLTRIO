import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
  )
})

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Capital Gains Tax Calculator USA 2026 | ToolTrio',
  description: 'Calculate federal capital gains tax, NIIT, and effective rate on stocks, real estate, crypto, and other assets.',
  slug: 'capital-gains-tax-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['capital gains tax calculator 2026', 'long term capital gains calculator USA', 'capital gains tax rate 2026', 'short vs long term capital gains', 'NIIT net investment income tax calculator'],
})

const faqs = [
  {
    question: 'What are the 2026 capital gains tax rates?',
    answer: 'Long-term rates (assets held 1+ year): 0% for taxable income up to $48,350 (single) or $96,700 (married); 15% up to $533,400 (single) or $600,050 (married); 20% above those thresholds. Short-term gains are taxed as ordinary income (10–37%). High earners may also owe 3.8% NIIT on investment income above $200,000 (single) or $250,000 (married).',
  },
  {
    question: 'How do I reduce capital gains tax?',
    answer: 'Strategies: (1) Hold assets 12+ months for long-term rates. (2) Tax-loss harvesting — sell losing positions to offset gains. (3) Opportunity Zone investment — defer and partially exclude gains. (4) Donate appreciated stock to charity (deduct FMV, avoid gains). (5) Qualified Small Business Stock (QSBS) Section 1202 — up to $10M exclusion. (6) 1031 exchange for real estate.',
  },
  {
    question: 'What is the Net Investment Income Tax?',
    answer: 'The 3.8% NIIT applies to investment income (dividends, capital gains, rental income, interest) for individuals with modified AGI above $200,000 (single) or $250,000 (married). It applies to the LESSER of net investment income or the excess of MAGI over the threshold. This is in addition to the regular capital gains rate.',
  }
]

const relatedCalculators = [
  { name: 'Crypto Tax Calculator', href: '/calculators/finance/crypto-tax-calculator', icon: '₿', desc: 'Crypto Tax Calculator' },
  { name: 'Real Estate ROI Calculator', href: '/calculators/finance/real-estate-roi-calculator', icon: '🏠', desc: 'Real Estate ROI Calculator' },
  { name: 'Tax Bracket Calculator', href: '/calculators/finance/tax-bracket-calculator', icon: '🧾', desc: 'Tax Bracket Calculator' },
  { name: 'Stock Profit Calculator', href: '/calculators/finance/stock-profit-calculator', icon: '📊', desc: 'Stock Profit Calculator' }
]

const structuredData = [generateFAQStructuredData(faqs)]

export default function Page() {
  return <>
    {structuredData.map((s, i) => (
      <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
    ))}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
