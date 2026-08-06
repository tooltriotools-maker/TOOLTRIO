import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Debt-to-Income Optimizer USA 2026 — Maximize Mortgage Eligibility | ToolTrio',
  description: 'Calculate your current DTI ratio, maximum mortgage you qualify for, and optimal debt payoff order to improve mortgage eligibility.',
  slug: 'debt-to-income-optimizer',
  category: 'finance',
  region: 'usa',
  keywords: ['debt to income ratio calculator USA 2026', 'DTI calculator mortgage qualification', 'how to improve DTI ratio', 'debt payoff mortgage eligibility', 'maximum mortgage DTI calculator 2026'],
})
const faqs = [
  {
    question: 'What DTI do I need to qualify for a mortgage?',
    answer: 'Conventional loan: back-end DTI (all debts including new mortgage) under 43-45%. Front-end DTI (housing only) under 28%. FHA loan: allows up to 57% back-end DTI with compensating factors. VA loan: 41% guideline but flexible. Jumbo loans: stricter, typically 38-43% maximum. A lower DTI also qualifies you for better rates — below 36% gets the best pricing.',
  },
  {
    question: 'How do I quickly improve my DTI?',
    answer: "Fastest options: (1) Pay off small balances — a $150/month credit card min payment at $3,000 balance can be eliminated quickly, immediately improving DTI. (2) Increase income — side income counts if you can document 2 years of history. (3) Pay down revolving debt to reduce required minimums. (4) Avoid taking on any new debt. (5) Don't co-sign — co-signed debt appears on your DTI.",
  },
  {
    question: 'Does student loan deferment improve DTI?',
    answer: "Temporarily, yes — but lenders for conventional loans are required to count 1% of your student loan balance as a monthly payment if your loans are deferred. On $38,000 in student loans, that's $380/month added to DTI regardless of actual payment or deferment status. FHA uses 1% or actual payment. This is why IDR enrollment (even at $0 payment) is better than deferment for mortgage qualification.",
  }
]
const relatedCalculators = [
  { name: 'Mortgage Affordability', href: '/calculators/finance/mortgage-affordability-calculator', icon: '🏡', desc: 'Mortgage Affordability' },
  { name: 'Cost of Debt Calculator', href: '/calculators/finance/cost-of-debt-calculator', icon: '💳', desc: 'Cost of Debt Calculator' },
  { name: 'Credit Card Payoff', href: '/calculators/finance/credit-card-payoff-calculator', icon: '💳', desc: 'Credit Card Payoff' },
  { name: 'Debt Payoff Calculator', href: '/calculators/finance/debt-payoff-calculator', icon: '🔓', desc: 'Debt Payoff Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
