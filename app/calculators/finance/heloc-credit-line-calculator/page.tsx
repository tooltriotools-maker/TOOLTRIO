import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
  )
})

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'HELOC Calculator USA 2026 — Home Equity Line of Credit | ToolTrio',
  description: 'Calculate HELOC payments, draw period interest, repayment costs and compare against cash-out refinance.',
  slug: 'heloc-credit-line-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['HELOC calculator', 'home equity line of credit calculator USA', 'HELOC payment calculator 2026', 'draw period HELOC', 'HELOC vs cash out refinance'],
})

const faqs = [
  {
    question: 'What is the HELOC limit in 2026?',
    answer: 'Most lenders allow up to 85% combined LTV (CLTV), meaning your mortgage plus HELOC cannot exceed 85% of your home value. With a $450,000 home and $250,000 mortgage, the max HELOC is $132,500. Rates in 2026 are tied to the Prime Rate; the average HELOC rate is approximately 8.5–9.5% APR.',
  },
  {
    question: 'How does a HELOC draw period work?',
    answer: 'During the draw period (typically 10 years), you can borrow up to your credit limit and pay interest-only on the amount drawn. After the draw period, you enter the repayment period (typically 10–20 years) where you pay principal + interest on the outstanding balance.',
  },
  {
    question: 'HELOC vs cash-out refinance — which is better?',
    answer: 'HELOC: flexible, lower closing costs (~$500–$1,500), variable rate. Cash-out refi: fixed rate, replaces entire mortgage, higher closing costs (2–5% of loan). Choose HELOC for short-term or flexible needs; cash-out refi for large stable amounts or when current mortgage rate is higher than new rates.',
  }
]

const relatedCalculators = [
  { name: 'Mortgage Calculator', href: '/calculators/finance/mortgage-calculator', icon: '🏡', desc: 'Mortgage Calculator' },
  { name: 'Cash-Out Refinance vs HELOC', href: '/calculators/finance/cash-out-refinance-vs-heloc-calculator', icon: '🔄', desc: 'Cash-Out Refinance vs HELOC' },
  { name: 'Home Affordability', href: '/calculators/finance/home-affordability-calculator', icon: '🏠', desc: 'Home Affordability' },
  { name: 'Closing Cost Calculator', href: '/calculators/finance/closing-cost-calculator', icon: '💵', desc: 'Closing Cost Calculator' }
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
