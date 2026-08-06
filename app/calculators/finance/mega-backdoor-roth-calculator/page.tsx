import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Mega Backdoor Roth Calculator USA 2026 | ToolTrio',
  description: 'Calculate how much extra after-tax you can contribute to your 401k and convert to Roth under the $70,000 2026 limit.',
  slug: 'mega-backdoor-roth-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['mega backdoor roth calculator 2026', 'after-tax 401k contribution', 'in-plan roth conversion', '401k limit 70000 2026', 'mega backdoor roth strategy'],
})

const faqs = [
  { question: "What makes a mega backdoor Roth possible?", answer: "The employer plan generally must allow after-tax employee contributions beyond regular elective deferrals and permit an in-plan Roth conversion or eligible rollover process." },
  { question: "What is the 2026 employee 401(k) deferral limit?", answer: "The general elective-deferral limit is $24,500 for 2026, before applicable catch-up contributions." },
  { question: "What is the 2026 total defined-contribution limit?", answer: "The general annual-additions limit is $72,000 in 2026, subject to compensation and catch-up rules." },
  { question: "Does employer match reduce after-tax contribution room?", answer: "Yes. Employer contributions generally count toward annual additions, so they reduce room below the overall limit." },
  { question: "Does this calculator prove my plan allows the strategy?", answer: "No. Plan design controls whether after-tax contributions and Roth conversion or rollover features are available." }
]

const relatedCalculators = [
  { name: '401k Calculator', href: '/calculators/finance/401k-calculator', icon: '🏦', desc: '401k Calculator' },
  { name: 'Backdoor Roth IRA Calculator', href: '/calculators/finance/backdoor-roth-ira-calculator', icon: '🚪', desc: 'Backdoor Roth IRA Calculator' },
  { name: 'Roth IRA Calculator', href: '/calculators/finance/roth-ira-calculator', icon: '🛡️', desc: 'Roth IRA Calculator' },
  { name: 'SEP-IRA vs Solo 401k', href: '/calculators/finance/sep-ira-vs-solo-401k-calculator', icon: '💼', desc: 'SEP-IRA vs Solo 401k' }
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
