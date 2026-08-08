import { CalculatorBatch26DeepDive } from '@/components/ui/CalculatorBatch26DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Emergency Fund & HYSA Calculator USA 2026 | ToolTrio',
  description: 'Calculate your ideal emergency fund size, HYSA interest earnings, real return after inflation, and optimal allocation between liquid and semi-liquid savings.',
  slug: 'emergency-fund-hysa-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['emergency fund calculator 2026', 'HYSA calculator USA', 'high yield savings account calculator', 'how much emergency fund calculator', 'emergency fund interest calculator 2026'],
})
const faqs = [
  {
    question: 'How much emergency fund do I need?',
    answer: '3-6 months of essential living expenses is the standard recommendation. Adjustments: single income household or variable income → 6-9 months. Dual income, stable employment → 3-4 months. Self-employed or freelancer → 9-12 months. Business owner → 12+ months. Essential expenses include rent/mortgage, utilities, food, insurance, minimum debt payments — not full discretionary spending.',
  },
  {
    question: 'What HYSA rates are available in 2026?',
    answer: 'High-yield savings accounts at online banks (Ally, Marcus, SoFi, Discover, Capital One 360) typically pay 4.5-5.5% APY as of 2026 — approximately 10-15x the national average savings rate of 0.48%. Rates fluctuate with the Federal Funds Rate. Money market funds (SPAXX, VMFXX) often yield 5%+ and provide slightly more flexibility for larger balances.',
  },
  {
    question: 'Emergency fund vs investing — what order?',
    answer: 'Financial planning order of operations: (1) Build $1,000-$2,000 mini emergency fund first. (2) Get full employer 401k match (instant 50-100% return). (3) Pay off high-rate debt (8%+). (4) Complete 3-6 month emergency fund. (5) Max HSA. (6) Max 401k and IRA. (7) Invest in taxable account. Never invest emergency fund money — liquidity and principal preservation are the only goals here.',
  }
]
const relatedCalculators = [
  { name: 'Budget Planner', href: '/calculators/finance/budget-planner-calculator', icon: '📊', desc: 'Budget Planner' },
  { name: 'HYSA vs CD', href: '/calculators/finance/cd-vs-hysa-calculator', icon: '💰', desc: 'HYSA vs CD' },
  { name: 'Net Worth Calculator', href: '/calculators/finance/net-worth-calculator', icon: '💎', desc: 'Net Worth Calculator' },
  { name: 'Savings Goal Calculator', href: '/calculators/finance/savings-goal-calculator', icon: '🎯', desc: 'Savings Goal Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
        <CalculatorBatch26DeepDive slug="emergency-fund-hysa-calculator" />
</>
}
