import { CalculatorBatch11DeepDive } from '@/components/ui/CalculatorBatch11DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'IRS Installment Agreement Calculator USA 2026 | ToolTrio',
  description: 'Calculate IRS installment agreement monthly payments, penalty and interest costs, and total amount owed under a payment plan.',
  slug: 'irs-installment-agreement-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['IRS installment agreement calculator','IRS payment plan calculator','IRS penalty and interest calculator','how to pay IRS in installments'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'How does an IRS installment agreement work?', answer: 'An installment agreement lets you pay back taxes owed over time in monthly payments instead of one lump sum. The IRS continues charging interest (based on the federal short-term rate plus 3%) and a reduced failure-to-pay penalty (0.25% per month instead of 0.5%) on the remaining balance until it\'s paid off.' },
  { question: 'What\'s the setup fee for an IRS payment plan?', answer: 'Setup fees vary by application method and payment type — online applications with direct debit are typically the cheapest option, while phone/mail applications or non-direct-debit plans cost more. Low-income taxpayers may qualify for reduced or waived fees.' },
  { question: 'Does an installment agreement stop IRS collection actions?', answer: 'Once an installment agreement is approved and you stay current on payments, the IRS generally won\'t pursue more aggressive collection like liens or levies, though a Notice of Federal Tax Lien may still be filed for larger balances depending on the agreement type.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Income Tax Estimator', href: '/calculators/finance/income-tax-estimator', icon: '🧾', desc: 'Income Tax Estimator' },
  { name: 'Wage Garnishment Calculator', href: '/calculators/finance/wage-garnishment-calculator', icon: '📋', desc: 'Wage Garnishment' },
  { name: 'Net Operating Loss', href: '/calculators/finance/net-operating-loss-calculator', icon: '📋', desc: 'Net Operating Loss' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
        <CalculatorBatch11DeepDive slug="irs-installment-agreement-calculator" />
</>
}
