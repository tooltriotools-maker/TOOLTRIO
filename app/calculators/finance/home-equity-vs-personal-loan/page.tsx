import { CalculatorBatch43DeepDive } from '@/components/ui/CalculatorBatch43DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Home Equity Loan vs Personal Loan Calculator USA 2026 | ToolTrio',
  description: 'Compare total interest cost between a home equity loan and an unsecured personal loan, including the effect of mortgage interest deductibility.',
  slug: 'home-equity-vs-personal-loan',
  category: 'finance',
  region: 'usa',
  keywords: ['home equity vs personal loan calculator','HELOC vs personal loan','secured vs unsecured loan comparison','home equity loan interest deduction'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'Why do home equity loans usually have lower rates than personal loans?', answer: 'Home equity loans are secured by your house, giving the lender collateral to recover if you default — this lower risk typically translates to meaningfully lower interest rates than unsecured personal loans, which lenders price higher because there\'s no asset backing the debt.' },
  { question: 'Is home equity loan interest tax-deductible?', answer: 'Under current law (through the TCJA rules in effect for 2026), home equity loan interest is only deductible if the funds are used to \'buy, build, or substantially improve\' the home securing the loan — using it for debt consolidation, tuition, or other purposes is not deductible.' },
  { question: 'What\'s the risk of using a home equity loan instead of a personal loan?', answer: 'Because a home equity loan is secured by your house, defaulting puts your home at risk of foreclosure — a personal loan, while more expensive, only risks your credit score and unsecured lender collection efforts, not your home, if you\'re unable to repay.' },
  { question: 'What is CLTV in this comparison?', answer: 'Combined loan-to-value is the existing mortgage plus the new home-equity borrowing divided by home value. It helps show how much of the property value would be encumbered by mortgage debt.' },
  { question: 'Does this calculator include loan fees?', answer: 'No. Origination charges, appraisal costs, closing costs, prepayment terms and lender-specific fees are not included, so compare actual loan disclosures in addition to interest.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Home Equity Loan Calculator', href: '/calculators/finance/home-equity-loan-calculator', icon: '🏠', desc: 'Home Equity Loan' },
  { name: 'Personal Loan Calculator', href: '/calculators/finance/personal-loan-calculator', icon: '💵', desc: 'Personal Loan' },
  { name: 'Debt-to-Income Optimizer', href: '/calculators/finance/debt-to-income-optimizer', icon: '⚖️', desc: 'Debt-to-Income Optimizer' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
        <CalculatorBatch43DeepDive slug="home-equity-vs-personal-loan" />
</>
}
