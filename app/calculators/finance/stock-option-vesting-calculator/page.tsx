import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Stock Option Vesting Calculator USA 2026 — ISO vs NSO | ToolTrio',
  description: 'Calculate the value of vesting stock options year-by-year, tax impact of ISO vs NSO exercise, AMT risk, and optimal exercise strategy.',
  slug: 'stock-option-vesting-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['stock option vesting calculator USA 2026', 'ISO NSO vesting calculator', 'stock options tax calculator', 'employee stock options value calculator', 'when to exercise stock options USA'],
})
const faqs = [
  {
    question: 'What is the difference between ISO and NSO stock options?',
    answer: 'ISO (Incentive Stock Options): No tax at exercise; spread is AMT preference item; qualifies for long-term capital gains if held 1 year post-exercise AND 2 years post-grant. NSO (Non-Qualified Stock Options): Ordinary income tax at exercise on the full spread; no AMT preference; any subsequent gain is capital gain. ISOs are more tax-favorable but come with AMT risk on large grants.',
  },
  {
    question: 'When should I exercise stock options?',
    answer: 'Key factors: (1) Company trajectory — if stock likely to appreciate, exercise early to start capital gains clock. (2) Tax situation — exercise in lower-income years. (3) Diversification — concentrated stock risk. (4) AMT threshold for ISOs. Rule of thumb for ISOs: exercise early after vesting if the spread is small, to minimize ordinary income at eventual sale. For NSOs: exercise when the spread is manageable and you can afford the tax.',
  },
  {
    question: 'What is the 83(b) election and when is it used?',
    answer: "An 83(b) election applies to restricted stock (not options) and must be filed within 30 days of grant. It allows you to pay income tax now on the current value (often near zero) rather than at vesting (potentially much higher). This starts the long-term capital gains clock immediately. Once filed, it's irrevocable — if the company fails, you've paid tax on worthless stock with no refund.",
  }
]
const relatedCalculators = [
  { name: 'Equity Compensation Calculator', href: '/calculators/finance/equity-compensation-calculator', icon: '📊', desc: 'Equity Compensation Calculator' },
  { name: 'Alternative Minimum Tax', href: '/calculators/finance/alternative-minimum-tax-calculator', icon: '⚠️', desc: 'Alternative Minimum Tax' },
  { name: 'RSU Vesting Schedule', href: '/calculators/finance/vesting-schedule-calculator', icon: '📅', desc: 'RSU Vesting Schedule' },
  { name: 'Net Unrealized Appreciation', href: '/calculators/finance/net-unrealized-appreciation-calculator', icon: '📈', desc: 'Net Unrealized Appreciation' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
