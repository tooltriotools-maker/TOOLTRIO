import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Solo 401k Calculator USA 2026 — Self-Employed Maximum Contribution | ToolTrio',
  description: 'Calculate maximum Solo 401k contributions as both employee and employer, super catch-up for ages 60-63, tax savings, and 30-year growth.',
  slug: 'solo-401k-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['solo 401k calculator 2026', 'self employed 401k contribution limit', 'solo 401k vs SEP IRA', 'individual 401k calculator USA', 'solo 401k super catch-up 2026'],
})
const faqs = [
  {
    question: 'What is the Solo 401k limit for 2026?',
    answer: '$70,000 total ($77,500 if age 50+, $81,250 if ages 60-63 with SECURE 2.0 super catch-up). As an employee: contribute up to $23,500 in salary deferrals ($31,000 if 50+, $34,750 if 60-63). As the employer: contribute up to 25% of net self-employment income. These combine up to the annual limit. Solo 401k beats SEP-IRA on lower incomes because of the large flat employee deferral.',
  },
  {
    question: 'Solo 401k vs SEP-IRA — which is better?',
    answer: "At $50,000 income: Solo 401k allows ~$33,293 (employee deferral + 20% employer = $23,500 + $9,793) vs SEP-IRA's ~$9,293. Solo 401k wins at almost all income levels. SEP-IRA only wins for simplicity — no annual filing for balances under $250,000. At high incomes ($200,000+) both hit the $70,000 cap via different routes.",
  },
  {
    question: 'What is the SECURE 2.0 Super Catch-Up?',
    answer: "Ages 60, 61, 62, and 63 can make a 'super catch-up' contribution of $11,250 in 2026 (vs $7,500 for other 50+ savers). This brings the employee deferral to $34,750 for those ages. After age 63, the catch-up reverts to the standard $7,500. This window — 4 years of super contributions — can meaningfully accelerate retirement savings.",
  }
]
const relatedCalculators = [
  { name: 'SEP-IRA Calculator', href: '/calculators/finance/sep-ira-calculator', icon: '💼', desc: 'SEP-IRA Calculator' },
  { name: 'SEP-IRA vs Solo 401k', href: '/calculators/finance/sep-ira-vs-solo-401k-calculator', icon: '⚖️', desc: 'SEP-IRA vs Solo 401k' },
  { name: 'Self-Employment Tax', href: '/calculators/finance/self-employment-tax-calculator', icon: '📋', desc: 'Self-Employment Tax' },
  { name: 'QBI Deduction', href: '/calculators/finance/qbi-deduction-calculator', icon: '📊', desc: 'QBI Deduction' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
