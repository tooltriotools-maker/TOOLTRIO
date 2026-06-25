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
  title: 'Backdoor Roth IRA Calculator USA 2026 | ToolTrio',
  description: 'Calculate taxes owed on backdoor Roth conversions, pro-rata rule impact, and 30-year tax-free growth. For high-income earners above Roth IRA limits.',
  slug: 'backdoor-roth-ira-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['backdoor roth IRA calculator', 'backdoor roth conversion 2026', 'pro rata rule calculator', 'high income roth IRA', 'roth IRA income limit 2026'],
})

const faqs = [
  {
    question: 'Who should do a backdoor Roth IRA?',
    answer: 'High-income earners above the Roth IRA income limits ($150,000 single / $236,000 married in 2026) who want tax-free growth. The backdoor strategy: contribute $7,000 to a non-deductible Traditional IRA (no income limit), then immediately convert to Roth. If you have no other pre-tax IRA balances, the conversion is nearly tax-free.',
  },
  {
    question: 'What is the pro-rata rule?',
    answer: "The pro-rata rule requires you to treat all your Traditional IRA balances as one pool when converting. If you have $93,000 in pre-tax IRAs and $7,000 non-deductible, only 7% (7,000/100,000) of your conversion is tax-free. The fix: roll pre-tax IRA money into your employer's 401k before December 31, leaving only the non-deductible basis.",
  },
  {
    question: 'Is the backdoor Roth still legal in 2026?',
    answer: 'Yes — the backdoor Roth IRA remains legal. Congress has periodically considered eliminating it, but as of 2026 it remains a valid strategy. The $7,000 contribution limit ($8,000 if 50+) applies to the non-deductible Traditional IRA contribution.',
  }
]

const relatedCalculators = [
  { name: 'Roth IRA Calculator', href: '/calculators/finance/roth-ira-calculator', icon: '🛡️', desc: 'Roth IRA Calculator' },
  { name: 'Roth Conversion Calculator', href: '/calculators/finance/roth-conversion-calculator', icon: '🔄', desc: 'Roth Conversion Calculator' },
  { name: '401k Calculator', href: '/calculators/finance/401k-calculator', icon: '🏦', desc: '401k Calculator' },
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
