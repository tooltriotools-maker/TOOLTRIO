import { CalculatorBatch41DeepDive } from '@/components/ui/CalculatorBatch41DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Career Lifetime Earnings Calculator USA 2026 | ToolTrio',
  description: 'Project your total lifetime career earnings based on starting salary, annual raises, and periodic promotions through retirement.',
  slug: 'career-earnings-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['lifetime earnings calculator','career salary projection','total career earnings USA','promotion salary growth calculator'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'How much difference do annual raises make over a career?', answer: 'Compounding matters enormously — a salary growing 3.5% annually roughly doubles every 20 years even without promotions. Over a 35-year career, the gap between a 2% and 4% average annual raise can amount to hundreds of thousands of dollars in cumulative earnings.' },
  { question: 'How often should I expect a promotion-level raise?', answer: 'Promotion cadence varies by field, but every 4-6 years with a meaningful raise (10-20%) is a common benchmark for steady career progression. Actively negotiating and changing employers periodically tend to accelerate this compared to relying on internal promotions alone.' },
  { question: 'Why does this calculator show pre-tax and after-tax totals?', answer: 'Lifetime earnings figures are usually quoted gross (pre-tax), but your actual take-home accumulation is meaningfully lower after federal, state, and payroll taxes — seeing both numbers gives a more realistic picture for long-term financial planning.' },

  { question: 'Are earnings adjusted for inflation?', answer: 'No. Results are nominal dollars; compare a separate inflation scenario if you want purchasing-power context.' },
  { question: 'Does the tax result use progressive brackets?', answer: "No. The model applies the flat tax percentage you enter to each year's modeled salary." },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Salary Negotiation Impact', href: '/calculators/finance/salary-negotiation-lifetime-calculator', icon: '💼', desc: 'Salary Negotiation Impact' },
  { name: 'Merit Raise vs Job Change', href: '/calculators/finance/merit-raise-vs-job-change-calculator', icon: '💼', desc: 'Merit Raise vs Job Change' },
  { name: 'Paycheck Calculator', href: '/calculators/finance/paycheck-calculator', icon: '💵', desc: 'Paycheck' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
        <CalculatorBatch41DeepDive slug="career-earnings-calculator" />
</>
}
