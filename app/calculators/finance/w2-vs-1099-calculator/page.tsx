import { CalculatorBatch8DeepDive } from '@/components/ui/CalculatorBatch8DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" /> })

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'W-2 vs 1099 Calculator USA 2026 | ToolTrio',
  description: 'Compare W-2 employee vs 1099 independent contractor taxes USA 2026. Calculate self-employment tax, QBI deduction, and true take-home pay.',
  slug: 'w2-vs-1099-calculator',
  category: 'finance',
  keywords: ['w2 vs 1099 calculator','self employment tax calculator 2026','1099 contractor tax calculator USA','w2 employee vs contractor comparison','self employed tax burden USA'],
})

const faqs = [
  { question: 'How much more tax does a 1099 contractor pay vs W-2?', answer: '1099 contractors pay the full 15.3% self-employment (SE) tax, while W-2 employees split this 7.65% each with their employer. On $100,000, that\'s $7,650 more in SE tax for a 1099 worker. However, contractors can deduct business expenses and half of SE tax, plus the 20% QBI deduction, which can close the gap significantly.' },
  { question: 'What is the QBI deduction for 1099 workers?', answer: 'The Qualified Business Income (QBI) deduction allows most self-employed individuals to deduct up to 20% of net business income from taxable income. On $100,000 net income, this could save $4,400+ in federal taxes at the 22% bracket. Income limits and phase-outs apply for certain service businesses above $197,300 (single) in 2026.' },
  { question: 'Should I ask for a higher rate as a 1099 contractor?', answer: 'Yes — a rule of thumb is to add 20-30% to your desired W-2 equivalent salary to account for SE tax (7.65%), no employer benefits, no paid time off, and the need to fund your own retirement. If a W-2 job pays $80,000, you need roughly $96,000-$104,000 as a 1099 contractor just to break even after taxes.' },
]

const relatedCalculators = [
  { name: 'Self-Employment Tax', href: '/calculators/finance/self-employment-tax-calculator', icon: '💼', desc: 'SE tax details' },
  { name: 'Freelancer Quarterly Tax', href: '/calculators/finance/freelancer-quarterly-tax-calculator', icon: '📅', desc: 'Quarterly estimates' },
  { name: 'QBI Deduction Calculator', href: '/calculators/finance/qbi-deduction-calculator', icon: '🧾', desc: 'QBI deduction' },
  { name: 'Income Tax Calculator', href: '/calculators/finance/income-tax-calculator', icon: '📋', desc: 'Federal income tax' },
]

const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>{structuredData.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}<CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />      <CalculatorBatch8DeepDive slug="w2-vs-1099-calculator" />
</>
}
