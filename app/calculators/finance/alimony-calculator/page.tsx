import { CalculatorBatch12DeepDive } from '@/components/ui/CalculatorBatch12DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Alimony & Spousal Support Calculator USA 2026 | ToolTrio',
  description: 'Estimate potential spousal support based on income gap and marriage length using common state guideline formulas — for planning purposes, not a substitute for legal advice.',
  slug: 'alimony-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['alimony calculator 2026','spousal support calculator USA','alimony formula by state','how alimony is calculated'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'How is alimony typically calculated?', answer: 'Most states don\'t have a fixed formula; judges weigh income gap, marriage length, standard of living, age, and earning capacity. Some states (like New York and Texas) publish advisory guideline formulas based on the income difference between spouses, which this calculator approximates.' },
  { question: 'Does marriage length affect alimony duration?', answer: 'Yes. Many states use marriage length as a rough guide for duration — for example, roughly half the marriage length for a mid-length marriage, with longer or indefinite support more likely after 20+ years. Short marriages (under 5 years) often result in little or no alimony.' },
  { question: 'Is alimony taxable in 2026?', answer: 'For divorce agreements executed after December 31, 2018 (the TCJA rule, still in effect in 2026), alimony is not deductible by the payer and not taxable income to the recipient. Agreements finalized before 2019 still follow the old pre-TCJA tax rules unless modified.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Alimony Tax Calculator', href: '/calculators/finance/alimony-tax-calculator', icon: '⚖️', desc: 'Alimony Tax' },
  { name: 'Prenup Asset Protection', href: '/calculators/finance/prenup-asset-protection-calculator', icon: '📋', desc: 'Prenup Asset Protection' },
  { name: 'Net Worth Calculator', href: '/calculators/finance/net-worth-calculator', icon: '💰', desc: 'Net Worth' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
        <CalculatorBatch12DeepDive slug="alimony-calculator" />
</>
}
