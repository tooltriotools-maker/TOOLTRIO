import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'ACA Health Insurance Subsidy Calculator USA 2026 — Marketplace Tax Credit | ToolTrio',
  description: 'Calculate your Affordable Care Act (ACA) premium tax credit subsidy based on household income, size, age, and state. Find your net monthly premium after subsidy.',
  slug: 'health-insurance-subsidy-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['ACA subsidy calculator 2026', 'health insurance marketplace subsidy', 'premium tax credit calculator USA', 'Obamacare subsidy calculator', 'healthcare.gov subsidy estimate 2026'],
})
const faqs = [
  {
    question: 'How is the ACA subsidy calculated?',
    answer: "The Advanced Premium Tax Credit (APTC) equals the benchmark plan premium (second-lowest-cost Silver plan) minus the maximum amount you're expected to pay. Your max payment percentage ranges from 0% (income 100-150% FPL) to 8.5% (income 300-400%+ FPL). For a household at 250% FPL, max self-pay is 4% of income. If the benchmark premium exceeds that, the difference is your subsidy — applied monthly to reduce your premium.",
  },
  {
    question: 'What income qualifies for ACA subsidies in 2026?',
    answer: "Subsidies are available to households with income between 100% and 400% of the Federal Poverty Level (FPL) who don't have affordable employer coverage or Medicaid. 100% FPL for 2 people: $20,440. 400% FPL: $81,760. American Rescue Plan expanded subsidies beyond 400% FPL through 2025 — check healthcare.gov for current rules. If your income changes during the year, update your marketplace application immediately to avoid owing back subsidies.",
  },
  {
    question: 'What is cost-sharing reduction (CSR)?',
    answer: "CSR is a separate benefit from the premium subsidy, available to households with income between 100-250% FPL. CSR reduces deductibles, copays, and out-of-pocket maximums on Silver plans — you get enhanced Silver coverage at Silver prices. A standard Silver plan might have a $4,500 deductible; CSR drops it to $700-$800 for households under 200% FPL. To get CSR, you must enroll in a Silver plan specifically — Gold/Bronze/Platinum plans don't qualify for CSR.",
  }
]
const relatedCalculators = [
  { name: 'Health Insurance Deductible', href: '/calculators/finance/health-insurance-deductible-calculator', icon: '💊', desc: 'Health Insurance Deductible' },
  { name: 'HDHP vs Traditional', href: '/calculators/finance/hdhp-vs-traditional-insurance-calculator', icon: '⚕️', desc: 'HDHP vs Traditional' },
  { name: 'Retirement Healthcare Cost', href: '/calculators/finance/retirement-healthcare-cost-calculator', icon: '🏥', desc: 'Retirement Healthcare Cost' },
  { name: 'FSA Calculator', href: '/calculators/finance/fsa-calculator', icon: '🏥', desc: 'FSA Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
