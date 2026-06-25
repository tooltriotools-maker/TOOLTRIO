import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Long-Term Care Insurance Calculator USA 2026 | ToolTrio',
  description: 'Calculate LTC insurance premiums, coverage gap vs nursing home costs, total benefit value, and whether insurance or self-funding makes sense.',
  slug: 'long-term-care-insurance-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['long term care insurance calculator', 'LTC insurance cost 2026', 'nursing home cost calculator USA', 'long term care planning calculator', 'LTC vs self-funding calculator'],
})
const faqs = [
  {
    question: 'How much does long-term care cost in 2026?',
    answer: '2026 national averages: Nursing home (private room): $350/day ($127,750/year). Assisted living: $5,100/month ($61,200/year). Home health aide: $30-40/hour. Memory care: $6,800/month ($81,600/year). Costs vary dramatically by state — New York nursing homes average $430/day; Mississippi averages $195/day. Medicare covers only short-term skilled nursing; Medicaid requires spending down to near $2,000 in assets.',
  },
  {
    question: 'At what age should I buy LTC insurance?',
    answer: 'The optimal window is 55-65: premiums are significantly lower than at 70+, but not so many years of premium payments as buying at 45. Buying at 55 vs 65 roughly halves annual premiums. However, 50% of applicants over 70 are declined for medical reasons vs 15% under 60. Most financial planners suggest evaluating at 55-60 and purchasing if affordable.',
  },
  {
    question: 'LTC insurance vs self-funding?',
    answer: 'With $2M+ in liquid assets, self-funding is viable — set aside $250,000-$400,000 in conservative investments for potential LTC needs. Below that threshold, insurance protects against catastrophic LTC costs depleting assets intended for a surviving spouse or heirs. Hybrid life/LTC policies (paying death benefit if LTC not needed) have grown popular as an alternative to pure LTC insurance.',
  }
]
const relatedCalculators = [
  { name: 'Medicare Premium Calculator', href: '/calculators/finance/medicare-premium-calculator', icon: '💊', desc: 'Medicare Premium Calculator' },
  { name: 'Retirement Calculator', href: '/calculators/finance/retirement-calculator', icon: '🏦', desc: 'Retirement Calculator' },
  { name: 'Life Insurance Needs Calculator', href: '/calculators/finance/life-insurance-needs-calculator', icon: '🛡️', desc: 'Life Insurance Needs Calculator' },
  { name: 'Net Worth Calculator', href: '/calculators/finance/net-worth-calculator', icon: '💎', desc: 'Net Worth Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
