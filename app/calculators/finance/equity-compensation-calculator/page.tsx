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
  title: 'Equity Compensation Calculator USA 2026 — RSU, ISO, NSO | ToolTrio',
  description: 'Calculate tax on RSUs, ISO and NSO stock options including ordinary income, AMT exposure, and long-term capital gains strategies.',
  slug: 'equity-compensation-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['RSU tax calculator 2026', 'ISO NSO stock options calculator USA', 'equity compensation tax calculator', 'stock options ordinary income AMT', 'RSU vesting tax calculator USA'],
})

const faqs = [
  {
    question: 'How are RSUs taxed?',
    answer: 'RSUs are taxed as ordinary income at vesting, based on the FMV of shares on the vest date. Your employer withholds taxes (typically at 22% federal for supplemental income, or 37% for amounts above $1M). Shares are usually sell-to-cover or net-share-settle. After vesting, any additional gain or loss when you sell is a capital gain/loss (long-term if held 12+ months).',
  },
  {
    question: "ISOs vs NSOs — what's the tax difference?",
    answer: 'ISO: no regular income tax at exercise; AMT preference item equal to spread; long-term capital gains if held 1 year after exercise AND 2 years after grant. NSO: ordinary income tax at exercise on the full spread; employer withholds taxes; no AMT preference; additional gain taxed as capital gain when sold. ISOs are more tax-efficient but require careful planning around AMT.',
  },
  {
    question: 'What is the 83(b) election for restricted stock?',
    answer: "An 83(b) election allows you to pay income tax on restricted stock NOW at its current (low) value, rather than when it vests (potentially much higher value). File within 30 days of grant — no exceptions. If the stock goes up, your future gains are all capital gains (15-20%) instead of ordinary income (up to 37%). If the company fails, you've paid tax on worthless stock — the election is not reversible.",
  }
]

const relatedCalculators = [
  { name: 'Alternative Minimum Tax Calculator', href: '/calculators/finance/alternative-minimum-tax-calculator', icon: '⚠️', desc: 'Alternative Minimum Tax Calculator' },
  { name: 'Capital Gains Tax Calculator', href: '/calculators/finance/capital-gains-tax-calculator', icon: '📈', desc: 'Capital Gains Tax Calculator' },
  { name: 'Tax Bracket Calculator', href: '/calculators/finance/tax-bracket-calculator', icon: '🧾', desc: 'Tax Bracket Calculator' },
  { name: 'Net Worth Calculator', href: '/calculators/finance/net-worth-calculator', icon: '💎', desc: 'Net Worth Calculator' }
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
