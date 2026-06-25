import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Tax Bracket Optimizer USA 2026 — Minimize Your Tax Bill | ToolTrio',
  description: 'See your full tax bracket breakdown, identify room in your current bracket, and get personalized strategies to reduce your 2026 federal income tax.',
  slug: 'tax-bracket-optimizer',
  category: 'finance',
  region: 'usa',
  keywords: ['tax bracket optimizer 2026', 'tax bracket calculator USA', 'how to reduce tax bracket USA', 'fill tax bracket strategy', 'income tax minimization calculator 2026'],
})
const faqs = [
  {
    question: 'How do US tax brackets work in 2026?',
    answer: "US income tax uses a progressive system — only income within each bracket is taxed at that rate. 2026 single brackets: 10% on first $11,600, 12% on $11,601-$47,150, 22% on $47,151-$100,525, 24% on $100,526-$191,950, 32% on $191,951-$243,725, 35% on $243,726-$609,350, 37% above $609,350. Earning $135,000 doesn't mean all income is taxed at 22% — only the portion in that bracket.",
  },
  {
    question: "What does 'room in your bracket' mean?",
    answer: "If your taxable income is $120,000 (22% bracket) and the 22% bracket ends at $100,525, you have no room — you're in the 24% bracket. But if you're at $85,000 taxable income, you have $15,525 of 'room' in the 22% bracket before crossing to 24%. This room is valuable for: Roth conversions (pay 22% now vs 24%+ later), realizing capital gains (potentially at 0% or 15%), or taking retirement distributions strategically.",
  },
  {
    question: 'What are the most effective ways to reduce taxable income?',
    answer: 'In order of typical impact: (1) 401k/403b contribution — up to $23,500 reduces taxable income dollar-for-dollar. (2) HSA contribution — $4,300 individual. (3) Traditional IRA — up to $7,000 if deductible. (4) Self-employed retirement (SEP-IRA, Solo 401k) — up to $70,000. (5) FSA — $3,300 medical, $5,000 dependent care. (6) Business deductions for self-employed. (7) Charitable deductions (if itemizing). (8) Loss harvesting to offset capital gains.',
  }
]
const relatedCalculators = [
  { name: 'Tax Bracket Calculator', href: '/calculators/finance/tax-bracket-calculator', icon: '🧾', desc: 'Tax Bracket Calculator' },
  { name: 'Roth Conversion Tax', href: '/calculators/finance/roth-conversion-tax-calculator', icon: '🔄', desc: 'Roth Conversion Tax' },
  { name: 'Net Salary Calculator', href: '/calculators/finance/net-salary-calculator', icon: '💰', desc: 'Net Salary Calculator' },
  { name: 'Income Tax Calculator', href: '/calculators/finance/income-tax-calculator', icon: '💰', desc: 'Income Tax Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
