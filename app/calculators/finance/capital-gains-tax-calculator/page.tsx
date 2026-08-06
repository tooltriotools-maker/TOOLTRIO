import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Capital Gains Tax Calculator USA 2026 | ToolTrio',
  description: 'Calculate federal capital gains tax, NIIT, and effective rate on stocks, real estate, crypto, and other assets.',
  slug: 'capital-gains-tax-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['capital gains tax calculator 2026', 'long term capital gains calculator USA', 'capital gains tax rate 2026', 'short vs long term capital gains', 'NIIT net investment income tax calculator'],
})

const faqs = [
  { question: "What are the 2026 long-term capital-gain thresholds for a single filer?", answer: "For 2026, the maximum 0% rate amount for other individuals is $49,450 and the maximum 15% rate amount is $545,500; amounts above that can enter the 20% maximum-rate band." },
  { question: "Does holding an asset exactly one year make it long term?", answer: "The tax holding-period rules are more precise than this calculator’s years input. The model treats one year or more as long term." },
  { question: "Does the calculator net my capital losses?", answer: "No. It models one gain from purchase and sale price and does not perform a full Schedule D netting calculation." },
  { question: "When can the 3.8% NIIT apply?", answer: "NIIT can apply to the lesser of net investment income or modified AGI above statutory thresholds, including $200,000 for single/head-of-household and $250,000 for married filing jointly." },
  { question: "Does the result include state capital-gains tax?", answer: "No. State taxation is not included." }
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
