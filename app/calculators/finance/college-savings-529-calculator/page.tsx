import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: '529 College Savings Calculator USA 2026 | ToolTrio',
  description: 'Calculate 529 plan growth, coverage of future college costs, required monthly contributions, and state tax deduction estimates.',
  slug: 'college-savings-529-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['529 calculator 2026', 'college savings calculator USA', '529 plan growth calculator', 'how much to save for college calculator', '529 vs Roth IRA education calculator'],
})

const faqs = [
  {
    question: 'What is the 529 contribution limit for 2026?',
    answer: '529 plans have no annual contribution limit set by the IRS, but contributions above $18,000/year (the annual gift tax exclusion) require a Form 709 filing or use of lifetime exemption. The superfunding strategy allows front-loading 5 years of exclusions ($90,000 per child, $180,000 married) at once. Total plan balances are limited by each state, typically $300,000–$550,000.',
  },
  {
    question: 'What can 529 funds be used for?',
    answer: "Qualified expenses: tuition, room and board (up to the school's published allowance), books, fees, computers required for school. Recent expansions: K-12 tuition (up to $10,000/year), student loan repayment (up to $10,000 lifetime per beneficiary), and apprenticeship programs. Starting in 2024, unused 529 funds can be rolled to a Roth IRA (up to $35,000 lifetime, with restrictions).",
  },
  {
    question: '529 vs Roth IRA for college savings?',
    answer: "529: state tax deductions (in most states), no income limit, penalties for non-qualified withdrawals. Roth IRA: contributions can be withdrawn tax/penalty-free, earnings are penalty-free for qualified education, more flexible if child doesn't attend college. Rule of thumb: prioritize Roth IRA up to limit first (for flexibility), then max 529 for remaining education savings.",
  }
]

const relatedCalculators = [
  { name: '529 vs Roth IRA Education', href: '/calculators/finance/529-vs-roth-ira-education-calculator', icon: '📚', desc: '529 vs Roth IRA Education' },
  { name: 'Gift Tax Calculator', href: '/calculators/finance/gift-tax-calculator', icon: '🎁', desc: 'Gift Tax Calculator' },
  { name: 'Roth IRA Calculator', href: '/calculators/finance/roth-ira-calculator', icon: '🛡️', desc: 'Roth IRA Calculator' },
  { name: 'Education Goal Calculator', href: '/calculators/finance/education-goal-calculator', icon: '🏫', desc: 'Education Goal Calculator' }
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
