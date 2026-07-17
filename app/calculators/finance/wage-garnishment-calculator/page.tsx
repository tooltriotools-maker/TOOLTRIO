import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Wage Garnishment Calculator USA 2026 | ToolTrio',
  description: 'Calculate the maximum amount that can legally be garnished from your paycheck under federal limits for credit card debt, student loans, and child support.',
  slug: 'wage-garnishment-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['wage garnishment calculator 2026','how much can be garnished from paycheck','federal wage garnishment limits','child support garnishment calculator'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'How much of my paycheck can legally be garnished?', answer: 'Under the federal Consumer Credit Protection Act, most creditor garnishments (like credit card debt) are capped at the lesser of 25% of disposable earnings or the amount by which weekly disposable earnings exceed 30 times the federal minimum wage — whichever is less, to protect a baseline income.' },
  { question: 'Are child support and student loan garnishment limits different?', answer: 'Yes — child support garnishment limits are higher (up to 50-65% of disposable earnings depending on other dependents and arrears), and federal student loan defaults have their own separate administrative garnishment rules (commonly up to 15% of disposable pay), both distinct from the standard creditor garnishment limits.' },
  { question: 'Can my employer fire me for having wages garnished?', answer: 'Federal law protects employees from being fired due to a single wage garnishment order — however, this protection generally doesn\'t extend to multiple garnishments for different debts, so it\'s important to address debt issues before they escalate into repeated garnishment actions.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'IRS Installment Agreement', href: '/calculators/finance/irs-installment-agreement-calculator', icon: '📋', desc: 'IRS Installment Agreement' },
  { name: 'Debt-to-Income Optimizer', href: '/calculators/finance/debt-to-income-optimizer', icon: '⚖️', desc: 'Debt-to-Income Optimizer' },
  { name: 'Nanny Tax Calculator', href: '/calculators/finance/nanny-tax-calculator', icon: '👶', desc: 'Nanny Tax' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
