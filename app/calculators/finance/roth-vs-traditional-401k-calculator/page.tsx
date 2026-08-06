import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Roth vs Traditional 401k Calculator USA 2026 | ToolTrio',
  description: 'Compare Roth 401k vs Traditional 401k after-tax wealth — the right choice depends on whether your tax rate is higher now or in retirement.',
  slug: 'roth-vs-traditional-401k-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['Roth vs Traditional 401k calculator','Roth 401k comparison calculator','which 401k is better calculator','401k tax bracket comparison'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'What\'s the core tradeoff between Roth and Traditional 401k?', answer: 'Traditional 401k contributions reduce your taxable income now but are taxed as ordinary income when withdrawn in retirement. Roth 401k contributions are made with after-tax dollars now but grow and withdraw completely tax-free in retirement — the better choice largely depends on whether your tax rate today is higher or lower than your expected tax rate in retirement.' },
  { question: 'If my tax rate is the same now and in retirement, does it matter which I choose?', answer: 'Mathematically, if your tax rate is identical at contribution and withdrawal, the after-tax result is equivalent — but Roth still has practical advantages: no Required Minimum Distributions during your lifetime, and diversifying your future tax exposure by holding both account types gives flexibility to manage taxable income in retirement.' },
  { question: 'Can I contribute to both Roth and Traditional 401k in the same year?', answer: 'Yes — many employer plans allow splitting contributions between Roth and Traditional in the same plan year, up to the combined IRS employee deferral limit. This lets you hedge against future tax rate uncertainty rather than betting entirely on one type.' },

  { question: 'Does the contribution repeat every year?', answer: 'No. The current function grows one entered contribution for the selected years; it is not a recurring payroll-contribution model.' },
  { question: 'Why is the Roth starting amount smaller?', answer: "The model reduces it by today's tax rate to approximate an equal current out-of-pocket cost versus the pre-tax Traditional contribution." },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: '401k Calculator', href: '/calculators/finance/401k-calculator', icon: '💰', desc: '401k' },
  { name: '401k vs Roth IRA', href: '/calculators/finance/401k-vs-roth-ira-calculator', icon: '🔄', desc: '401k vs Roth IRA' },
  { name: 'Tax Deferral Benefit', href: '/calculators/finance/tax-deferral-benefit-calculator', icon: '📊', desc: 'Tax Deferral Benefit' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
