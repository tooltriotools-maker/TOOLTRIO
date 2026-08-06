import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  
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
  { question: "Does every non-spouse inherited IRA require equal withdrawals for 10 years?", answer: "No. The calculator uses equal one-tenth withdrawals as a planning assumption. The 10-year rule generally requires the account to be emptied by the end of year 10, and annual RMD requirements can also apply in some cases." },
  { question: "Who can be an eligible designated beneficiary?", answer: "IRS rules include a surviving spouse, the owner’s minor child, a disabled or chronically ill individual, and certain beneficiaries not more than 10 years younger than the owner." },
  { question: "Why does the calculator assume the decedent was age 75?", answer: "That value is currently hard-coded in the UI call. Because the underlying simplified function does not use it to calculate a life-expectancy RMD, the output should not be treated as an official inherited-IRA RMD." },
  { question: "Are inherited Traditional IRA withdrawals taxable?", answer: "Taxable distributions from an inherited Traditional IRA generally enter gross income, subject to basis and other tax rules." },
  { question: "Can a spouse have different options?", answer: "Yes. A surviving spouse can have options unavailable to a non-spouse beneficiary, including in some circumstances treating or rolling the IRA into their own IRA." },
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
