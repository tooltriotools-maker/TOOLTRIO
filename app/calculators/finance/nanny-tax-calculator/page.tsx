import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Nanny Tax Calculator USA 2026 | ToolTrio',
  description: 'Calculate household employer \'nanny tax\' obligations including Social Security, Medicare, and unemployment tax once wages cross the annual IRS threshold.',
  slug: 'nanny-tax-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['nanny tax calculator 2026','household employer tax calculator','nanny tax threshold IRS','paying a nanny legally taxes'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'What is the \'nanny tax\' and when does it apply?', answer: 'If you pay a household employee (nanny, senior caregiver, housekeeper) cash wages of $2,700 or more in a calendar year (2026 threshold, adjusted periodically by the IRS), you\'re required to withhold and pay Social Security and Medicare (FICA) taxes, and may owe federal and state unemployment tax as well.' },
  { question: 'Who pays the nanny tax — me or my employee?', answer: 'FICA tax (15.3% combined) is typically split — you as the employer owe 7.65% and can either withhold the employee\'s matching 7.65% from their pay or choose to pay it yourself as an added benefit. Federal and state unemployment taxes are generally paid by the employer alone, not withheld from the employee.' },
  { question: 'How do I report and pay the nanny tax?', answer: 'Household employment taxes are reported annually on Schedule H, filed with your personal Form 1040, rather than the quarterly payroll filings businesses use — though you should still make quarterly estimated tax payments throughout the year to avoid an underpayment penalty at tax time.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Elder Care Cost', href: '/calculators/finance/elder-care-cost-calculator', icon: '👵', desc: 'Elder Care Cost' },
  { name: 'Self-Employment Tax', href: '/calculators/finance/self-employment-tax-calculator', icon: '🧾', desc: 'Self-Employment Tax' },
  { name: 'Wage Garnishment Calculator', href: '/calculators/finance/wage-garnishment-calculator', icon: '📋', desc: 'Wage Garnishment' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
