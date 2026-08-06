import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Investment Fee Drag Calculator USA 2026 — How Fees Destroy Wealth | ToolTrio',
  description: 'Calculate the compounding wealth destruction from investment fees. Compare 0.03% index funds vs 1%+ actively managed funds over 10-40 years.',
  slug: 'investment-fee-drag-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['investment fee drag calculator USA 2026', 'expense ratio cost calculator', 'how much do investment fees cost', 'index fund vs active fund fees', 'mutual fund fee impact calculator'],
})
const faqs = [
  { question: "What does fee drag mean?", answer: "Fee drag is the reduction in ending wealth caused by fees lowering the return that remains invested and compounds over time." },
  { question: "Does a 1% fee cost only 1% once?", answer: "No. An annual percentage fee reduces the portfolio repeatedly, and the removed dollars also lose their future compounding." },
  { question: "Does the calculator include trading costs or taxes?", answer: "No. It isolates annual percentage fees from the gross return. Taxes, spreads, commissions and account-specific charges are not separately modeled." },
  { question: "Can a higher-fee investment still outperform?", answer: "Yes. The calculator holds gross return constant so it can isolate fee impact; it does not predict relative investment performance." },
  { question: "Where can I find a fund expense ratio?", answer: "Check the fund prospectus and official fund documents. Advisory and retirement-plan fees may be separate from the fund expense ratio." }
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
