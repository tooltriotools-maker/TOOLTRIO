import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Self-Employed Retirement Plan Comparison USA 2026 | ToolTrio',
  description: 'Compare Solo 401k vs SEP-IRA vs SIMPLE IRA contribution limits and tax savings for self-employed individuals and small business owners.',
  slug: 'self-employed-retirement-plan-comparison',
  category: 'finance',
  region: 'usa',
  keywords: ['self-employed retirement plan comparison','Solo 401k vs SEP IRA calculator','SIMPLE IRA vs Solo 401k','best retirement plan self-employed 2026'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'What\'s the main difference between a Solo 401k and SEP-IRA?', answer: 'A Solo 401k allows both an employee salary deferral and an employer profit-sharing contribution, which often allows a higher total contribution than a SEP-IRA (employer contribution only) at the same income level — especially valuable for self-employed individuals with more modest net self-employment income.' },
  { question: 'Can I have employees with a Solo 401k?', answer: 'No — a Solo 401k is specifically designed for business owners with no full-time employees other than a spouse. If you have (or plan to hire) employees, a SEP-IRA or SIMPLE IRA, which have their own eligibility and contribution rules for staff, are typically the appropriate options instead.' },
  { question: 'Which plan has the simplest administration?', answer: 'SEP-IRAs are generally the simplest to set up and maintain, with minimal paperwork and no annual filing requirement in most cases. Solo 401k plans require more setup and, once assets exceed $250,000, an annual Form 5500-EZ filing — the added complexity can be worth it for the higher contribution potential.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Solo 401k Calculator', href: '/calculators/finance/solo-401k-calculator', icon: '💼', desc: 'Solo 401k' },
  { name: 'SEP IRA Calculator', href: '/calculators/finance/sep-ira-calculator', icon: '💼', desc: 'SEP IRA' },
  { name: 'SEP IRA vs Solo 401k', href: '/calculators/finance/sep-ira-vs-solo-401k-calculator', icon: '💼', desc: 'SEP IRA vs Solo 401k' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
