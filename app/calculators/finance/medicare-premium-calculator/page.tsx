import { CalculatorBatch29DeepDive } from '@/components/ui/CalculatorBatch29DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

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
    answer: "IRMAA (Income-Related Monthly Adjustment Amount) is a surcharge on Medicare Part B and Part D premiums for higher-income beneficiaries. It's based on your income from 2 years prior. In 2026, For 2026, the first IRMAA tier begins above $109,000 for single filers or $218,000 for married filing jointly. The standard Part B premium is $202.90/month, and the highest single-filer tier has a $689.90 total Part B premium.",
  },
  {
    question: 'How can I reduce Medicare IRMAA?',
    answer: 'IRMAA is based on your MAGI from 2 years ago, so planning matters. Strategies: (1) Roth conversions should be done before age 63 to avoid impacting Medicare at 65. (2) Consider qualified charitable distributions (QCDs) after 73 to reduce MAGI. (3) Harvest capital losses to offset gains. (4) Time large IRA withdrawals carefully. (5) Appeal IRMAA if income dropped due to a life-changing event.',
  },
  {
    question: 'When does Medicare IRMAA kick in for 2026?',
    answer: 'For 2026, the standard Part B premium is $202.90/month. The first single-filer IRMAA tier applies above $109,000 MAGI and the highest tier starts at $500,000; the corresponding total Part B premium is $689.90/month.',
  },
  { question: 'Does the total include my Part D plan premium?', answer: 'No. It adds the 2026 Part B premium and Part D IRMAA surcharge only; your Part D plan premium varies by plan.' },
  { question: 'What income thresholds does the current UI use?', answer: 'The UI models a single filer: 2026 IRMAA tiers begin above $109,000, $137,000, $171,000, $205,000 and at $500,000 of MAGI.' },
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
        <CalculatorBatch29DeepDive slug="medicare-premium-calculator" />
</>
}
