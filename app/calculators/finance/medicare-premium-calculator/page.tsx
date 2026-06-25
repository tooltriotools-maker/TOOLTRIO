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
  title: 'Medicare Premium Calculator USA 2026 — IRMAA Surcharge | ToolTrio',
  description: 'Calculate your 2026 Medicare Part B and Part D premiums including IRMAA income-related surcharges based on your income.',
  slug: 'medicare-premium-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['medicare premium calculator 2026', 'IRMAA calculator 2026', 'Medicare Part B premium income', 'Medicare surcharge calculator USA', 'Medicare cost by income 2026'],
})

const faqs = [
  {
    question: 'What is IRMAA?',
    answer: "IRMAA (Income-Related Monthly Adjustment Amount) is a surcharge on Medicare Part B and Part D premiums for higher-income beneficiaries. It's based on your income from 2 years prior. In 2026, IRMAA kicks in above $106,000 (single) or $212,000 (married). At the highest tier ($500,000+ single), Part B costs $628.90/month vs the standard $185.00.",
  },
  {
    question: 'How can I reduce Medicare IRMAA?',
    answer: 'IRMAA is based on your MAGI from 2 years ago, so planning matters. Strategies: (1) Roth conversions should be done before age 63 to avoid impacting Medicare at 65. (2) Consider qualified charitable distributions (QCDs) after 73 to reduce MAGI. (3) Harvest capital losses to offset gains. (4) Time large IRA withdrawals carefully. (5) Appeal IRMAA if income dropped due to a life-changing event.',
  },
  {
    question: 'When does Medicare IRMAA kick in for 2026?',
    answer: 'Part B standard premium: $185.00/month (income under $106,000 single / $212,000 married). First IRMAA tier starts at $106,000+ single: Part B jumps to $259.00/month — a $74/month increase or $888/year. The highest IRMAA tier ($500,000+ single) pays $628.90/month for Part B plus $85.80/month Part D surcharge.',
  }
]

const relatedCalculators = [
  { name: 'Social Security Breakeven', href: '/calculators/finance/social-security-breakeven-calculator', icon: '🏛️', desc: 'Social Security Breakeven' },
  { name: 'HSA Investment Calculator', href: '/calculators/finance/hsa-investment-calculator', icon: '💊', desc: 'HSA Investment Calculator' },
  { name: 'Retirement Calculator', href: '/calculators/finance/retirement-calculator', icon: '🏦', desc: 'Retirement Calculator' },
  { name: 'Tax Bracket Calculator', href: '/calculators/finance/tax-bracket-calculator', icon: '🧾', desc: 'Tax Bracket Calculator' }
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
