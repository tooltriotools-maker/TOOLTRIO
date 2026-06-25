import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Cash Value Life Insurance Calculator USA 2026 — Buy Term or Whole Life? | ToolTrio',
  description: 'Compare whole life, universal life, and variable life insurance cash value growth against buy-term-and-invest strategy. Calculate opportunity cost.',
  slug: 'cash-value-life-insurance-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['whole life insurance calculator', 'cash value life insurance calculator USA 2026', 'buy term invest difference calculator', 'whole life vs term calculator', 'universal life insurance calculator'],
})
const faqs = [
  {
    question: 'Is whole life insurance a good investment?',
    answer: "For most people, no — the internal rate of return on cash value is typically 2-4% after all fees and mortality charges, far below equity market returns. The classic financial planning advice: 'buy term and invest the difference.' A $500,000 30-year term for a healthy 40-year-old costs roughly $1,200/year vs $8,400/year for whole life — the $7,200 annual difference invested at 7% grows to over $700,000 in 30 years.",
  },
  {
    question: 'When does whole life insurance make sense?',
    answer: "Specific situations where permanent insurance adds value: (1) Estate planning for estates above the exemption — life insurance death benefits are not included in the taxable estate if held in an ILIT (Irrevocable Life Insurance Trust). (2) Business succession — key-man insurance, buy-sell agreements. (3) Max-funded LIRP (Life Insurance Retirement Plan) for high earners who've maxed all other tax-advantaged accounts and need more tax-free growth. (4) Medicaid planning for long-term care.",
  },
  {
    question: 'What is the policy loan feature?',
    answer: "Whole and universal life allow tax-free loans against cash value — you're borrowing your own money without triggering a taxable event. This is the mechanism used in 'Infinite Banking' strategies. Interest accrues on the loan, and unpaid loans reduce the death benefit. If the policy lapses with a loan outstanding, the entire loan amount becomes taxable income. Use policy loans cautiously and with a clear repayment plan.",
  }
]
const relatedCalculators = [
  { name: 'Life Insurance Needs', href: '/calculators/finance/life-insurance-needs-calculator', icon: '🛡️', desc: 'Life Insurance Needs' },
  { name: 'Term vs Whole Life', href: '/calculators/finance/term-vs-whole-life-calculator', icon: '⚖️', desc: 'Term vs Whole Life' },
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
