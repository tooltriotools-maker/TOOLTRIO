import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Business Valuation Calculator USA 2026 — EBITDA & DCF | ToolTrio',
  description: 'Calculate business value using EBITDA multiples, revenue multiples, and DCF. Find enterprise value, equity value, and seller net proceeds.',
  slug: 'business-valuation-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['business valuation calculator USA 2026', 'EBITDA multiple calculator', 'business worth calculator', 'enterprise value calculator', 'how much is my business worth USA'],
})
const faqs = [
  {
    question: 'What EBITDA multiple should I use?',
    answer: 'Industry EBITDA multiples (2026 ranges): SaaS software 6-12x, Professional services 3-5x, Manufacturing 4-6x, Healthcare 6-10x, Retail 3-5x, E-commerce 4-8x, Construction 2-4x. Higher multiples for faster-growing, recurring-revenue, or highly scalable businesses. Lower for capital-intensive, commoditized, or owner-dependent operations.',
  },
  {
    question: 'What is the difference between enterprise value and equity value?',
    answer: 'Enterprise Value (EV) = what someone pays for the entire business including debt. Equity Value = what shareholders receive = EV - Debt + Cash. If EV is $2M, debt is $200K, and cash is $50K, equity value is $1.85M. M&A deals price on enterprise value; sellers care about equity value (what they take home).',
  },
  {
    question: 'How do I increase my business valuation?',
    answer: 'Key value drivers: (1) Recurring revenue (subscriptions vs one-time), (2) Customer concentration (no single customer >20%), (3) Management team (not owner-dependent), (4) Clean financials (3 years of audited P&L), (5) EBITDA margins (higher is better), (6) Growth rate (accelerating > stable > declining). Preparing 2-3 years before sale maximizes valuation.',
  }
]
const relatedCalculators = [
  { name: 'Break-Even Calculator', href: '/calculators/finance/break-even-calculator', icon: '📊', desc: 'Break-Even Calculator' },
  { name: 'ROI Calculator', href: '/calculators/finance/roi-calculator', icon: '📈', desc: 'ROI Calculator' },
  { name: 'Business Loan Calculator', href: '/calculators/finance/business-loan-calculator', icon: '💼', desc: 'Business Loan Calculator' },
  { name: 'Net Worth Calculator', href: '/calculators/finance/net-worth-calculator', icon: '💎', desc: 'Net Worth Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
