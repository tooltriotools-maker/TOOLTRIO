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
  title: 'Crypto Tax Calculator USA 2026 — Bitcoin, Ethereum & Altcoins | ToolTrio',
  description: 'Calculate federal capital gains tax on cryptocurrency sales, short vs long-term rates, NIIT, and tax-saving strategies.',
  slug: 'crypto-tax-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['crypto tax calculator 2026', 'bitcoin capital gains calculator USA', 'cryptocurrency tax calculator', 'short term vs long term crypto tax', 'crypto tax rate 2026 USA'],
})

const faqs = [
  {
    question: 'How is crypto taxed in the USA?',
    answer: 'The IRS treats cryptocurrency as property, not currency. Every sale, swap, or use of crypto is a taxable event. Short-term gains (held < 1 year) are taxed as ordinary income (10–37%). Long-term gains (held 1+ year) are taxed at 0%, 15%, or 20% plus potential 3.8% NIIT. Crypto staking rewards, mining income, and airdrops are taxed as ordinary income at receipt.',
  },
  {
    question: 'What is the crypto wash sale rule?',
    answer: "Unlike stocks, crypto is NOT currently subject to the wash sale rule. This means you can sell crypto at a loss, immediately repurchase, and still claim the tax loss. This 'crypto tax-loss harvesting' window may close if legislation treats crypto as securities — a change that has been proposed multiple times in Congress.",
  },
  {
    question: 'Do I need to report crypto on my taxes?',
    answer: "Yes — the IRS requires reporting of all crypto transactions on Form 1040 Schedule D and Form 8949. You must also answer 'Yes' to the crypto question on Form 1040. Failure to report is tax evasion. Exchanges report to the IRS on Form 1099-DA starting in 2025. Keep records of every transaction, including blockchain transactions without a 1099.",
  }
]

const relatedCalculators = [
  { name: 'Capital Gains Tax Calculator', href: '/calculators/finance/capital-gains-tax-calculator', icon: '📈', desc: 'Capital Gains Tax Calculator' },
  { name: 'Tax Bracket Calculator', href: '/calculators/finance/tax-bracket-calculator', icon: '🧾', desc: 'Tax Bracket Calculator' },
  { name: 'Net Investment Income Tax', href: '/calculators/finance/net-investment-income-tax-calculator', icon: '💹', desc: 'Net Investment Income Tax' },
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
