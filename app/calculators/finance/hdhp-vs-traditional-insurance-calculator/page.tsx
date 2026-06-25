import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'HDHP vs Traditional Health Insurance Calculator USA 2026 | ToolTrio',
  description: 'Compare total annual cost of High-Deductible Health Plan + HSA vs traditional PPO/HMO including premiums, out-of-pocket, and HSA tax savings.',
  slug: 'hdhp-vs-traditional-insurance-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['HDHP vs PPO calculator', 'HDHP vs traditional insurance calculator USA 2026', 'HSA vs PPO calculator', 'high deductible health plan comparison', 'health insurance comparison calculator 2026'],
})
const faqs = [
  {
    question: 'When is an HDHP + HSA better than a PPO?',
    answer: "An HDHP + HSA is typically better when: (1) you're generally healthy with moderate expected medical expenses, (2) the premium savings exceed the additional out-of-pocket risk, or (3) the HSA tax savings make the effective cost lower. The crossover point depends on your specific plan's numbers — this calculator shows you exactly where that is for your situation.",
  },
  {
    question: 'What qualifies as an HDHP in 2026?',
    answer: "IRS definition for 2026: minimum deductible of $1,650 (self-only) or $3,300 (family), and maximum out-of-pocket of $8,300 (self-only) or $16,600 (family). If your plan doesn't meet these minimums, you cannot contribute to an HSA — even if your employer calls it a 'high-deductible' plan.",
  },
  {
    question: "Can I have an HDHP if I'm enrolled in Medicare?",
    answer: 'No — Medicare enrollment disqualifies you from HSA contributions, even for the months before Medicare starts. You can use existing HSA funds but cannot contribute more. Plan accordingly: stop HSA contributions 6 months before Medicare enrollment (since Medicare Part A can be retroactive 6 months).',
  }
]
const relatedCalculators = [
  { name: 'HSA Investment Calculator', href: '/calculators/finance/hsa-investment-calculator', icon: '🏥', desc: 'HSA Investment Calculator' },
  { name: 'HSA vs FSA Calculator', href: '/calculators/finance/hsa-vs-fsa-calculator', icon: '⚖️', desc: 'HSA vs FSA Calculator' },
  { name: 'Health Insurance Deductible Calculator', href: '/calculators/finance/health-insurance-deductible-calculator', icon: '💊', desc: 'Health Insurance Deductible Calculator' },
  { name: 'Medicare Premium Calculator', href: '/calculators/finance/medicare-premium-calculator', icon: '🏛️', desc: 'Medicare Premium Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
