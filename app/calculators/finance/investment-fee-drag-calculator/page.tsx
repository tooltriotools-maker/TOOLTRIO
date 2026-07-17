import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Investment Fee Drag Calculator USA 2026 — How Fees Destroy Wealth | ToolTrio',
  description: 'Calculate the compounding wealth destruction from investment fees. Compare 0.03% index funds vs 1%+ actively managed funds over 10-40 years.',
  slug: 'investment-fee-drag-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['investment fee drag calculator USA 2026', 'expense ratio cost calculator', 'how much do investment fees cost', 'index fund vs active fund fees', 'mutual fund fee impact calculator'],
})
const faqs = [
  {
    question: 'How much do investment fees actually cost over 30 years?',
    answer: 'On a $100,000 portfolio growing at 8% with $10,000 annual contributions: 0.03% index fund grows to $1,387,000 vs 1.5% active fund at $1,090,000 — a $297,000 difference. The fee drag compounds because every dollar paid in fees loses its future growth potential. This is why Warren Buffett bet $1 million that S&P 500 index funds would outperform a basket of hedge funds over 10 years — and won easily.',
  },
  {
    question: 'What is a reasonable investment fee?',
    answer: 'Benchmark: 0.03-0.10% — Excellent (Vanguard VTI, Fidelity FSKAX, Schwab SCHB). 0.10-0.25% — Good (many ETFs, some target-date funds). 0.25-0.65% — Acceptable for specialty/international. 0.65-1.0% — High — difficult to justify vs index alternatives. 1.0%+ — Very high, requires demonstrable alpha. Above 2% (including advisor fee + fund fee) — extremely difficult to overcome through returns alone.',
  },
  {
    question: "How do I calculate the true cost of my advisor's fee?",
    answer: "A 1% AUM (assets under management) fee on a $500,000 portfolio = $5,000/year. But with 7% gross return and 1% fee, net return is 6%. The compounding loss: $500,000 at 7% for 20 years = $1,934,000; at 6% = $1,603,000. The advisor fee costs $331,000 over 20 years — far more than the nominal $5,000/year it appears. Evaluate whether the advisor's tax planning, behavioral coaching, and planning services justify this long-term cost.",
  }
]
const relatedCalculators = [
  { name: 'Index Fund Fee Calculator', href: '/calculators/finance/index-fund-fee-calculator', icon: '📉', desc: 'Index Fund Fee Calculator' },
  { name: 'DRIP Calculator', href: '/calculators/finance/drip-calculator', icon: '💧', desc: 'DRIP Calculator' },
  { name: 'Compound Interest Calculator', href: '/calculators/finance/compound-interest-calculator', icon: '📈', desc: 'Compound Interest Calculator' },
  { name: 'Wealth Building Comparison', href: '/calculators/finance/wealth-building-comparison-calculator', icon: '💎', desc: 'Wealth Building Comparison' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
