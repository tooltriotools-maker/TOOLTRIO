import { CalculatorBatch36DeepDive } from '@/components/ui/CalculatorBatch36DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Cost of Debt Calculator USA 2026 — True Interest Burden | ToolTrio',
  description: 'Calculate your true cost of debt — weighted average interest rate, annual interest burden, optimal payoff strategy, and interest saved by extra payments.',
  slug: 'cost-of-debt-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['cost of debt calculator', 'weighted average interest rate calculator USA', 'debt burden calculator', 'avalanche method calculator', 'total interest paid calculator 2026'],
})
const faqs = [
  {
    question: 'What is the avalanche debt payoff method?',
    answer: 'The avalanche method directs extra payments to the highest-interest debt first, minimizing total interest paid. After the first debt is paid off, its payment rolls into the next highest-rate debt — a snowball of payments with mathematically optimal results. Compared to the snowball method (smallest balance first), avalanche saves more in interest, though the snowball method provides faster psychological wins.',
  },
  {
    question: 'What is a weighted average cost of debt?',
    answer: 'The weighted average cost of debt is the blended interest rate across all your debts, weighted by balance. Example: $8,500 at 24% and $15,000 at 7.5% = ($8,500×24% + $15,000×7.5%) / ($8,500+$15,000) = 13.9% weighted rate. This tells you the average cost of your entire debt portfolio.',
  },
  {
    question: 'Should I invest or pay off debt first?',
    answer: "Any debt above 6-7% should generally be paid off before investing in taxable accounts — it's a guaranteed risk-free return at that rate. Always maximize employer 401k match first (instant 50-100% return). Then pay off high-rate debt. Then invest. The exception: very low-rate debt (2-4% mortgage or subsidized student loans) where expected investment returns exceed the rate.",
  }
]
const relatedCalculators = [
  { name: 'Debt Payoff Calculator', href: '/calculators/finance/debt-payoff-calculator', icon: '🔓', desc: 'Debt Payoff Calculator' },
  { name: 'Credit Card Payoff Calculator', href: '/calculators/finance/credit-card-payoff-calculator', icon: '💳', desc: 'Credit Card Payoff Calculator' },
  { name: 'Student Loan vs Invest', href: '/calculators/finance/student-loan-vs-invest-calculator', icon: '⚖️', desc: 'Student Loan vs Invest' },
  { name: 'Budget Planner Calculator', href: '/calculators/finance/budget-planner-calculator', icon: '📊', desc: 'Budget Planner Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
        <CalculatorBatch36DeepDive slug="cost-of-debt-calculator" />
</>
}
