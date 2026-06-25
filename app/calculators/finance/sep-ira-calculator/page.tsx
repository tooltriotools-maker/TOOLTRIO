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
  title: 'SEP-IRA Calculator USA 2026 — Self-Employed Retirement | ToolTrio',
  description: 'Calculate maximum SEP-IRA contributions, tax savings, and 30-year growth for sole proprietors, freelancers, and S-corp owners.',
  slug: 'sep-ira-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['SEP IRA calculator 2026', 'self employed retirement calculator', 'SEP IRA contribution limit 2026', 'freelancer retirement calculator USA', 'sole proprietor SEP IRA'],
})

const faqs = [
  {
    question: 'What is the SEP-IRA limit for 2026?',
    answer: 'The 2026 SEP-IRA contribution limit is the lesser of 25% of compensation or $70,000. For sole proprietors, the IRS calculation reduces this slightly to ~20% of net self-employment income (after deducting half of SE tax). On $150,000 net income, the max contribution is approximately $27,714.',
  },
  {
    question: 'SEP-IRA vs Solo 401k — which is better?',
    answer: 'Solo 401k allows contributions as both employee ($23,500 + catch-up if 50+) AND employer (25% of W-2 or 20% of net SE income), reaching $70,000 on lower incomes. SEP-IRA is simpler (no annual filing), but Solo 401k typically allows much higher contributions at lower income levels. At $50,000 income: SEP-IRA max ~$9,293 vs Solo 401k ~$33,293.',
  },
  {
    question: 'Can I have both a SEP-IRA and an employer 401k?',
    answer: "If you have W-2 employment with a 401k AND self-employment income, you can contribute to both — but the combined employer contributions cannot exceed $70,000. The employee deferral limit ($23,500) is shared across all plans, but each employer's contribution is calculated separately.",
  }
]

const relatedCalculators = [
  { name: 'SEP-IRA vs Solo 401k', href: '/calculators/finance/sep-ira-vs-solo-401k-calculator', icon: '⚖️', desc: 'SEP-IRA vs Solo 401k' },
  { name: 'Self-Employment Tax Calculator', href: '/calculators/finance/self-employment-tax-calculator', icon: '📋', desc: 'Self-Employment Tax Calculator' },
  { name: 'QBI Deduction Calculator', href: '/calculators/finance/qbi-deduction-calculator', icon: '💰', desc: 'QBI Deduction Calculator' },
  { name: 'Retirement Calculator', href: '/calculators/finance/retirement-calculator', icon: '🏦', desc: 'Retirement Calculator' }
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
