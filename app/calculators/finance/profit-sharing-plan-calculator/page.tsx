import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Profit Sharing Plan Calculator USA 2026 | ToolTrio',
  description: 'Calculate profit sharing plan contributions, tax savings, and long-term growth for business owners and employees.',
  slug: 'profit-sharing-plan-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['profit sharing plan calculator','business profit sharing tax savings','employer profit sharing contribution limit','profit sharing 401k calculator'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'How much can an employer contribute to a profit sharing plan?', answer: 'Profit sharing contributions are discretionary and employer-funded, subject to the overall IRS combined defined contribution limit across all employer and employee contributions for the year — business owners often use profit sharing to contribute significantly more than employee deferral limits alone would allow, especially in a Solo 401k with a profit-sharing component.' },
  { question: 'Are profit sharing contributions tax-deductible for the business?', answer: 'Yes — employer profit sharing contributions are generally a deductible business expense, reducing the company\'s taxable income in the year contributed, while the funds grow tax-deferred inside employees\' retirement accounts until withdrawal.' },
  { question: 'Can profit sharing contributions vary from year to year?', answer: 'Yes — unlike a fixed pension obligation, profit sharing contributions are discretionary and can be adjusted (including skipped entirely) each year based on the company\'s actual profitability, giving business owners flexibility that isn\'t available with some other retirement plan types.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Self-Employed Retirement Plans', href: '/calculators/finance/self-employed-retirement-plan-comparison', icon: '💼', desc: 'Self-Employed Retirement Plans' },
  { name: 'Solo 401k Calculator', href: '/calculators/finance/solo-401k-calculator', icon: '💼', desc: 'Solo 401k' },
  { name: 'SEP IRA Calculator', href: '/calculators/finance/sep-ira-calculator', icon: '💼', desc: 'SEP IRA' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
