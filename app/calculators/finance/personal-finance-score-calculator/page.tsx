import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Personal Finance Score Calculator USA 2026 — Rate Your Financial Health | ToolTrio',
  description: 'Get a comprehensive 0-100 financial health score across savings rate, emergency fund, debt-to-income, retirement savings, and credit score.',
  slug: 'personal-finance-score-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['personal finance score calculator USA 2026', 'financial health score calculator', 'money management score', 'financial wellness calculator', 'how financially healthy am I USA'],
})
const faqs = [
  { question: "Is this the same as a credit score?", answer: "No. It is a ToolTrio planning score made from five household-finance inputs. It is not produced by a credit bureau or lender." },
  { question: "How are the 100 points divided?", answer: "Savings, emergency reserves, debt, retirement savings and credit score can each contribute up to 20 points." },
  { question: "Why does age affect the retirement component?", answer: "The calculator uses annual income multiplied by age/10 as its internal retirement-savings benchmark. That is a heuristic, not an official retirement rule." },
  { question: "Can a high score mean I am financially secure?", answer: "Not necessarily. The model omits insurance, asset allocation, housing costs, dependents, taxes and many other household risks." },
  { question: "What should I use the score for?", answer: "Use the component breakdown to see which modeled area changes most when you adjust your inputs." }
]
const relatedCalculators = [
  { name: 'FIRE Number Calculator', href: '/calculators/finance/fire-number-calculator', icon: '🔥', desc: 'FIRE Number Calculator' },
  { name: 'Net Worth Calculator', href: '/calculators/finance/net-worth-calculator', icon: '💎', desc: 'Net Worth Calculator' },
  { name: 'Savings Rate FIRE', href: '/calculators/finance/savings-rate-fire-calculator', icon: '💹', desc: 'Savings Rate FIRE' },
  { name: 'Budget Planner Calculator', href: '/calculators/finance/budget-planner-calculator', icon: '📊', desc: 'Budget Planner Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
