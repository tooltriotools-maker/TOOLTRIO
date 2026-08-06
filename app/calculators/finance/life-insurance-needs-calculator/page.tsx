import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Life Insurance Needs Calculator USA 2026 | ToolTrio',
  description: 'Calculate exactly how much life insurance you need based on income replacement, debts, childcare costs, and existing coverage.',
  slug: 'life-insurance-needs-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['life insurance needs calculator', 'how much life insurance do I need USA', 'life insurance calculator 2026', 'income replacement life insurance', 'term life vs whole life calculator'],
})
const faqs = [
 {question:'How does the calculator estimate income replacement?',answer:'It discounts the annual income gap between the insured and spouse over the selected replacement period using the entered investment-return rate, then adds debts, final expenses and modeled childcare.'},
 {question:'How is childcare estimated?',answer:'The model assumes $15,000 per child per year and applies the same present-value factor used for income replacement. Actual childcare needs vary substantially by age, location and family arrangement.'},
 {question:'How does existing coverage affect the result?',answer:'Existing life-insurance coverage is subtracted from the modeled total need. Other liquid assets are not separately entered, so include them only if you intentionally want to treat them as available protection.'},
 {question:'Are the displayed term and whole-life premiums quotes?',answer:'No. They are rough internal estimates based on fixed dollars per $1,000 of coverage. Real premiums depend on age, health, underwriting, term, riders, insurer and policy design.'},
 {question:'Should the result determine how much insurance I buy?',answer:'It is a planning estimate, not insurance advice. Employer coverage, survivor benefits, education goals, taxes, estate needs and the duration of each obligation can materially change an appropriate coverage amount.'}
]
const relatedCalculators = [
  { name: 'Term vs Whole Life', href: '/calculators/finance/term-vs-whole-life-calculator', icon: '🛡️', desc: 'Term vs Whole Life' },
  { name: 'Retirement Calculator', href: '/calculators/finance/retirement-calculator', icon: '🏦', desc: 'Retirement Calculator' },
  { name: 'Net Worth Calculator', href: '/calculators/finance/net-worth-calculator', icon: '💎', desc: 'Net Worth Calculator' },
  { name: 'FIRE Calculator', href: '/calculators/finance/fire-calculator', icon: '🔥', desc: 'FIRE Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
