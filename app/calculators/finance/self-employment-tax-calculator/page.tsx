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
  title: 'Self-Employment Tax Calculator USA 2026 — SE Tax + QBI | ToolTrio',
  description: 'Calculate self-employment tax (Social Security + Medicare), deductible half, QBI deduction, and quarterly estimated tax payments.',
  slug: 'self-employment-tax-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['self employment tax calculator 2026', 'SE tax calculator USA', 'freelancer tax calculator', 'quarterly estimated tax calculator', 'Schedule SE calculator 2026'],
})

const faqs = [
  {
    question: 'How is self-employment tax calculated?',
    answer: "SE tax = 15.3% of 92.35% of net self-employment income. The 92.35% adjustment accounts for the employer's share. Of the 15.3%: 12.4% goes to Social Security (up to $176,100 wage base in 2026) and 2.9% to Medicare (no limit). An additional 0.9% Medicare surtax applies above $200,000 (single) or $250,000 (married). Half of SE tax is deductible from your AGI.",
  },
  {
    question: 'When are quarterly estimated taxes due?',
    answer: "2026 estimated tax payment dates: April 15 (Q1: Jan–Mar), June 16 (Q2: Apr–May), September 15 (Q3: Jun–Aug), January 15, 2027 (Q4: Sep–Dec). Underpayment penalty applies if you owe more than $1,000 at filing and didn't pay 90% of current year tax or 100% of prior year tax (110% if AGI > $150,000).",
  },
  {
    question: 'Can self-employed people reduce SE tax?',
    answer: 'Yes — several strategies: (1) S-corp election: pay yourself a reasonable salary (SE tax only on wages), take remaining profits as distributions (no SE tax). At $100,000+ net income, S-corp savings often exceed formation and compliance costs. (2) Solo 401k contributions reduce net SE income. (3) Maximize deductible business expenses. (4) QBI deduction reduces income tax (not SE tax).',
  }
]

const relatedCalculators = [
  { name: 'QBI Deduction Calculator', href: '/calculators/finance/qbi-deduction-calculator', icon: '📋', desc: 'QBI Deduction Calculator' },
  { name: 'SEP-IRA Calculator', href: '/calculators/finance/sep-ira-calculator', icon: '💼', desc: 'SEP-IRA Calculator' },
  { name: 'Tax Bracket Calculator', href: '/calculators/finance/tax-bracket-calculator', icon: '🧾', desc: 'Tax Bracket Calculator' },
  { name: 'Income Tax Calculator', href: '/calculators/finance/income-tax-calculator', icon: '💰', desc: 'Income Tax Calculator' }
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
