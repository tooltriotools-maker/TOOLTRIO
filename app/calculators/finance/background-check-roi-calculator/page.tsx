import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Background Check ROI Calculator USA 2026 | ToolTrio',
  description: 'Calculate the return on investment from pre-employment background screening by comparing screening costs against the reduced cost and rate of bad hires.',
  slug: 'background-check-roi-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['background check ROI calculator','cost of a bad hire','employee screening ROI','HR background check savings'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'How much does a bad hire actually cost a company?', answer: 'Estimates vary widely by role and industry, but a commonly cited range is 30% of the employee\'s first-year salary at minimum, and can run into tens of thousands of dollars when recruiting, training, lost productivity, and severance are included.' },
  { question: 'How is background check ROI calculated?', answer: 'ROI compares the total screening cost (per-hire fee × hires per year) against the savings from a lower bad-hire rate — screening programs typically reduce bad-hire incidence, and even a modest reduction can save far more than the screening cost itself across a full year of hiring.' },
  { question: 'Is background screening required by law?', answer: 'It depends on industry and role — healthcare, childcare, financial services, and government contractors often have legal screening requirements. Even where not legally required, the Fair Credit Reporting Act (FCRA) governs how screening must be conducted and disclosed.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Business Startup Calculator', href: '/calculators/finance/business-startup-calculator', icon: '🏢', desc: 'Business Startup' },
  { name: 'Salary Negotiation Impact', href: '/calculators/finance/salary-negotiation-lifetime-calculator', icon: '💼', desc: 'Salary Negotiation Impact' },
  { name: 'Profit Sharing Plan', href: '/calculators/finance/profit-sharing-plan-calculator', icon: '💼', desc: 'Profit Sharing Plan' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
