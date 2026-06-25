import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'RSU Vesting Schedule Calculator USA 2026 — Equity Value Over Time | ToolTrio',
  description: 'Calculate the value of your RSU or stock option vesting schedule year by year, including taxes at each vest event and cumulative wealth building.',
  slug: 'vesting-schedule-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['RSU vesting calculator 2026', 'equity vesting schedule calculator USA', 'stock vesting calculator', 'RSU tax at vest calculator', 'equity compensation timeline USA'],
})
const faqs = [
  {
    question: 'How are RSUs taxed when they vest?',
    answer: "RSUs are taxed as ordinary income at vest — the FMV of shares on the vest date is added to your W-2 income. Your employer withholds taxes, typically via 'sell-to-cover' (automatically selling enough shares to cover withholding) or 'net settlement' (receiving fewer shares). Federal withholding on supplemental income is 22% (up to $1M) or 37% (above $1M) — but your actual marginal rate may be higher, creating an underpayment at tax time.",
  },
  {
    question: 'What is the 4-year cliff vesting schedule?',
    answer: "Standard tech company vesting: 1-year cliff (nothing vests for year 1), then 1/48th of the grant vests each month for years 2-4. This means: 0% at month 11, 25% at month 12 (cliff), then ~2.08% monthly thereafter. The cliff protects companies from employees leaving immediately. After full vesting (4 years), you've received 100% of the grant.",
  },
  {
    question: 'Should I sell RSUs when they vest?',
    answer: "Conventional financial planning advice: sell RSUs as they vest and diversify. Holding RSUs after vest means you have both your human capital (salary) AND financial capital concentrated in one company. If the company underperforms, both suffer simultaneously. The exception: if you have high conviction in company growth and can afford the concentration risk. The tax treatment is identical whether you sell immediately or hold — you've already paid ordinary income tax at vest.",
  }
]
const relatedCalculators = [
  { name: 'Equity Compensation Calculator', href: '/calculators/finance/equity-compensation-calculator', icon: '📊', desc: 'Equity Compensation Calculator' },
  { name: 'Alternative Minimum Tax', href: '/calculators/finance/alternative-minimum-tax-calculator', icon: '⚠️', desc: 'Alternative Minimum Tax' },
  { name: 'Salary Negotiation Calculator', href: '/calculators/finance/salary-negotiation-calculator', icon: '🤝', desc: 'Salary Negotiation Calculator' },
  { name: 'Net Unrealized Appreciation', href: '/calculators/finance/net-unrealized-appreciation-calculator', icon: '📈', desc: 'Net Unrealized Appreciation' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
