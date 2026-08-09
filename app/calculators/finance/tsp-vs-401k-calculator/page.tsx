import { CalculatorBatch29DeepDive } from '@/components/ui/CalculatorBatch29DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'TSP vs 401(k) Calculator USA 2026 — Federal Employee Retirement | ToolTrio',
  description: 'Compare Thrift Savings Plan (TSP) vs private sector 401k. Calculate FERS pension value, TSP matching, and total federal employee retirement package.',
  slug: 'tsp-vs-401k-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['TSP calculator 2026', 'thrift savings plan calculator', 'federal employee retirement calculator', 'FERS pension calculator', 'TSP vs 401k comparison USA'],
})
const faqs = [
  { question: 'Does this calculator model a full TSP contribution history?', answer: 'No. The current function grows the entered annual contribution plus a modeled 5% match as a single amount for a period based on years of service; it does not add a new contribution every future year.' },
  { question: 'How is the FERS pension estimated?', answer: 'The model uses salary × service years × 1%, or 1.1% when age is at least 62 and service is at least 20 years. Actual FERS computation generally uses high-3 average salary and can include other rules.' },
  { question: 'What is the 2026 TSP elective-deferral limit?', answer: 'The 2026 elective-deferral limit is $24,500. The general age-50 catch-up is $8,000, while ages 60 through 63 can have an $11,250 catch-up if eligible.' },
  { question: 'How is pension present value calculated here?', answer: 'The calculator divides its estimated annual pension by 4%. That is a capitalization shortcut used for comparison, not an official OPM lump-sum value.' },
  { question: 'Does this include Social Security and FEHB?', answer: 'No. The displayed total does not value Social Security, FEHB, taxes, survivor elections or many other federal retirement features.' },
]
const relatedCalculators = [
  { name: '401k Calculator', href: '/calculators/finance/401k-calculator', icon: '🏦', desc: '401k Calculator' },
  { name: 'Social Security Breakeven', href: '/calculators/finance/social-security-breakeven-calculator', icon: '🏛️', desc: 'Social Security Breakeven' },
  { name: 'Retirement Calculator', href: '/calculators/finance/retirement-calculator', icon: '🎯', desc: 'Retirement Calculator' },
  { name: 'Medicare Premium Calculator', href: '/calculators/finance/medicare-premium-calculator', icon: '💊', desc: 'Medicare Premium Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
        <CalculatorBatch29DeepDive slug="tsp-vs-401k-calculator" />
</>
}
