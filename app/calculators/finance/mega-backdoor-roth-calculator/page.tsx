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
  title: 'Mega Backdoor Roth Calculator USA 2026 | ToolTrio',
  description: 'Calculate how much extra after-tax you can contribute to your 401k and convert to Roth under the $70,000 2026 limit.',
  slug: 'mega-backdoor-roth-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['mega backdoor roth calculator 2026', 'after-tax 401k contribution', 'in-plan roth conversion', '401k limit 70000 2026', 'mega backdoor roth strategy'],
})

const faqs = [
  {
    question: 'What is the mega backdoor Roth?',
    answer: 'The mega backdoor Roth lets you contribute up to $46,500 in after-tax money to your 401k (on top of the $23,500 pre-tax limit), then convert it to Roth — giving you up to $70,000 total in Roth-eligible contributions in 2026. Not all 401k plans allow after-tax contributions, so check your plan documents first.',
  },
  {
    question: 'Does my 401k plan allow mega backdoor Roth?',
    answer: 'Plans must explicitly allow: (1) after-tax contributions above the elective deferral limit, and (2) in-plan Roth conversions or in-service withdrawals to a Roth IRA. Large employer plans (Google, Amazon, Microsoft, Fidelity) commonly allow this. Ask your benefits team or check your Summary Plan Description (SPD).',
  },
  {
    question: "What's the 2026 total 401k limit?",
    answer: '$70,000 combined employee + employer contributions ($77,500 if age 50+). With the $23,500 employee pre-tax limit and a 4% match on $120,000 ($4,800), you have $41,700 in remaining space for after-tax contributions that can be converted to Roth.',
  }
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
