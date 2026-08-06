import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Social Security Disability (SSDI) Calculator USA 2026 | ToolTrio',
  description: 'Estimate your monthly SSDI benefit using the Social Security Primary Insurance Amount formula and work credit eligibility requirements.',
  slug: 'ssdi-benefit-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['SSDI calculator 2026','social security disability benefit estimate','SSDI eligibility work credits','how much does SSDI pay'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'Which 2026 PIA bend points does this calculator use?', answer: 'For a worker first eligible in 2026, it uses $1,286 and $7,749, with the statutory 90%, 32%, and 15% PIA factors.' },
  { question: 'Is average monthly earnings the same as SSA AIME?', answer: 'Not necessarily. SSA calculates Average Indexed Monthly Earnings from the worker’s covered earnings history. The input here is an AIME-like shortcut, so an official SSA estimate can differ.' },
  { question: 'Does meeting the calculator’s work-credit test guarantee SSDI eligibility?', answer: 'No. The code uses a simplified age-based credit check. SSA also applies insured-status and recent-work rules and separately determines whether the medical disability standard is met.' },
  { question: 'Why is there a five-month waiting period in the result?', answer: 'The model displays a five-month SSDI waiting period. Actual entitlement dates and exceptions should be confirmed with SSA for the individual claim.' },
  { question: 'Will SSDI always equal the PIA shown here?', answer: 'No. The page is an estimate and does not model every SSA computation, family maximum, offset, rounding, or claim-specific rule.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Social Security Calculator', href: '/calculators/finance/social-security-calculator', icon: '🏛️', desc: 'Social Security' },
  { name: 'Disability Insurance', href: '/calculators/finance/disability-insurance-calculator', icon: '🦽', desc: 'Disability Insurance' },
  { name: 'Social Security WEP', href: '/calculators/finance/social-security-wep-calculator', icon: '⚖️', desc: 'Social Security WEP' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
