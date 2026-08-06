import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'I-Bonds Calculator USA 2026 — Inflation-Protected Savings | ToolTrio',
  description: 'Estimate Series I savings bond value using the Treasury composite-rate formula, holding period, and early-redemption penalty. Defaults reflect May–October 2026 rates.',
  slug: 'i-bonds-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['I bonds calculator 2026', 'Series I savings bonds calculator', 'I bond value calculator USA', 'I bond composite rate 2026', 'I bonds vs HYSA vs CD'],
})

const faqs = [
  {
    question: 'What is the I Bond rate for May–October 2026?',
    answer: 'TreasuryDirect lists a 4.26% composite rate for I bonds issued May 1 through October 31, 2026. It combines a 0.90% fixed rate with a 1.67% semiannual inflation rate.',
  },
  {
    question: 'What is the annual I Bond purchase limit?',
    answer: 'TreasuryDirect states that an individual can buy up to $10,000 of electronic Series I savings bonds per calendar year. The former option to buy additional paper I bonds with a federal tax refund has ended.',
  },
  {
    question: 'When can I redeem an I Bond?',
    answer: 'An I bond cannot be redeemed during its first 12 months. If you redeem before five years, Treasury deducts the last three months of interest; after five years that early-redemption penalty no longer applies.',
  },
  {
    question: 'Why can the future value differ from this projection?',
    answer: 'The inflation component resets every six months. This calculator holds the entered composite-rate inputs constant for projection purposes, so a multi-year estimate will differ when future inflation rates reset.',
  },
  {
    question: 'How is the composite rate calculated?',
    answer: 'The Treasury formula combines the fixed rate with twice the semiannual inflation rate plus the product of the fixed and semiannual inflation rates. The fixed rate remains with the bond while the inflation component resets every six months.',
  },
]

const relatedCalculators = [
  { name: 'CD vs HYSA Calculator', href: '/calculators/finance/cd-vs-hysa-calculator', icon: '💰', desc: 'CD vs HYSA Calculator' },
  { name: 'Inflation Calculator', href: '/calculators/finance/inflation-calculator', icon: '📈', desc: 'Inflation Calculator' },
  { name: 'Bonds vs CDs USA', href: '/calculators/finance/bonds-vs-cds-usa-calculator', icon: '🏦', desc: 'Bonds vs CDs USA' },
  { name: 'I-Bonds vs TIPS', href: '/calculators/finance/i-bonds-vs-tips-calculator', icon: '⚖️', desc: 'I-Bonds vs TIPS' }
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
