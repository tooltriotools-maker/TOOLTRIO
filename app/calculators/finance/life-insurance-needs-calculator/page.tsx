import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Life Insurance Needs Calculator USA 2026 | ToolTrio',
  description: 'Calculate exactly how much life insurance you need based on income replacement, debts, childcare costs, and existing coverage.',
  slug: 'life-insurance-needs-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['life insurance needs calculator', 'how much life insurance do I need USA', 'life insurance calculator 2026', 'income replacement life insurance', 'term life vs whole life calculator'],
})
const faqs = [
  {
    question: 'How much life insurance do I need?',
    answer: 'Common rule of thumb: 10-12x your annual income. A more precise calculation: income replacement (PV of income stream at safe rate) + debts + final expenses + child care costs - existing assets and coverage. For a $85,000 income earner with $180,000 debt and 2 children, total need is typically $1.2-1.8M.',
  },
  {
    question: 'Term vs whole life insurance?',
    answer: 'Term life: pure death benefit for a fixed period (10, 20, 30 years), low cost. $1M 20-year term for a healthy 35-year-old costs roughly $50-80/month. Whole life: permanent coverage with a cash value component, 10-15x more expensive. Most financial planners recommend term + invest the difference unless you have a specific estate planning or tax strategy requiring permanent insurance.',
  },
  {
    question: 'What is the right life insurance term length?',
    answer: "Choose a term that covers your longest financial obligation. With young children, that's typically until the youngest child is financially independent (18-22 years). With a mortgage, it's the mortgage term. Rule: buy coverage through your expected retirement date, when your portfolio should cover income replacement needs.",
  }
]
const relatedCalculators = [
  { name: 'Term vs Whole Life', href: '/calculators/finance/term-vs-whole-life-calculator', icon: '🛡️', desc: 'Term vs Whole Life' },
  { name: 'Retirement Calculator', href: '/calculators/finance/retirement-calculator', icon: '🏦', desc: 'Retirement Calculator' },
  { name: 'Net Worth Calculator', href: '/calculators/finance/net-worth-calculator', icon: '💎', desc: 'Net Worth Calculator' },
  { name: 'FIRE Calculator', href: '/calculators/finance/fire-calculator', icon: '🔥', desc: 'FIRE Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
