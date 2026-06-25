import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Inherited IRA Calculator USA 2026 — 10-Year Rule & RMDs | ToolTrio',
  description: 'Calculate annual required withdrawals from an inherited IRA, total tax burden under the 10-year rule, and optimal distribution strategy.',
  slug: 'inherited-ira-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['inherited IRA calculator 2026', '10 year rule inherited IRA', 'inherited IRA distribution calculator', 'non-spouse inherited IRA USA', 'inherited IRA tax calculator'],
})
const faqs = [
  {
    question: 'What is the 10-year rule for inherited IRAs?',
    answer: 'Non-spouse beneficiaries who inherit a Traditional IRA from someone who died after 2019 must withdraw the entire balance within 10 years. There are no annual required minimums under many scenarios — you can take $0 for 9 years and everything in year 10, or spread it out. The key: strategic timing to minimize bracket spikes. If the decedent was already taking RMDs, annual withdrawals may be required each year within the 10-year window.',
  },
  {
    question: 'Who is exempt from the 10-year rule?',
    answer: 'Eligible Designated Beneficiaries can use the old stretch IRA rules: (1) Surviving spouses, (2) Disabled or chronically ill individuals, (3) Beneficiaries not more than 10 years younger than the decedent, (4) Minor children (until age of majority, then 10-year rule kicks in). Everyone else — adult children, siblings, friends — must comply with the 10-year rule.',
  },
  {
    question: 'What is the best strategy for the 10-year rule?',
    answer: 'Maximize low-bracket years. If your income varies (sabbatical, early retirement, job transition), front-load larger distributions in lower-income years. Key insight: a $350,000 inherited IRA withdrawn equally ($35,000/year) costs less total tax than withdrawing $350,000 in year 10. Roth conversions of your own money during the 10 years can be complicated by the inherited IRA income — plan carefully.',
  }
]
const relatedCalculators = [
  { name: 'RMD Calculator', href: '/calculators/finance/required-minimum-distribution-calculator', icon: '📋', desc: 'RMD Calculator' },
  { name: 'Tax Bracket Calculator', href: '/calculators/finance/tax-bracket-calculator', icon: '🧾', desc: 'Tax Bracket Calculator' },
  { name: 'Roth Conversion Ladder', href: '/calculators/finance/roth-conversion-ladder-calculator', icon: '🪜', desc: 'Roth Conversion Ladder' },
  { name: 'Roth IRA Calculator', href: '/calculators/finance/roth-ira-calculator', icon: '🛡️', desc: 'Roth IRA Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
