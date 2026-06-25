import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Salary Negotiation Calculator USA 2026 — Total Compensation | ToolTrio',
  description: 'Calculate the full value of a job offer including base, bonus, equity, 401k match, benefits, and PTO. Compare total comp and find your counter-offer.',
  slug: 'salary-negotiation-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['salary negotiation calculator', 'total compensation calculator USA 2026', 'job offer comparison calculator', 'counter offer calculator', 'equity value calculator job offer'],
})
const faqs = [
  {
    question: 'How do I calculate total compensation?',
    answer: 'Total comp = base salary + expected bonus + equity (annualized) + 401k employer match + health insurance value (typically $6,000-$25,000/year) + PTO value (daily rate × days). Two offers with the same base salary can differ by $30,000+ in total value when equity, benefits, and PTO are included. Always compare total comp, not just base.',
  },
  {
    question: 'How much should I counter offer?',
    answer: 'A counter-offer of 10-20% above the initial offer is typical and expected. Research salary data on Levels.fyi, Glassdoor, LinkedIn Salary, and Payscale for your specific role and market. If your total comp calculation shows the offer is below market, your counter has data backing. Most offers have 5-15% flexibility before equity and benefits.',
  },
  {
    question: 'When is equity worth more than salary?',
    answer: 'Equity (RSUs, options) is worth more when: the company has strong growth trajectory, you have long vesting periods, and the value is calculated conservatively. At pre-IPO companies, apply a 70-90% discount to the theoretical equity value. At public companies, RSU value is more certain but subject to price fluctuations. Always count equity at current market value, not hoped-for future value.',
  }
]
const relatedCalculators = [
  { name: 'Paycheck Calculator', href: '/calculators/finance/paycheck-calculator', icon: '💵', desc: 'Paycheck Calculator' },
  { name: 'Annual Income Calculator', href: '/calculators/finance/annual-income-calculator', icon: '📊', desc: 'Annual Income Calculator' },
  { name: 'Tax Bracket Calculator', href: '/calculators/finance/tax-bracket-calculator', icon: '🧾', desc: 'Tax Bracket Calculator' },
  { name: 'Net Worth Calculator', href: '/calculators/finance/net-worth-calculator', icon: '💎', desc: 'Net Worth Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
