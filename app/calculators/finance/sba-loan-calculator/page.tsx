import { CalculatorBatch32DeepDive } from '@/components/ui/CalculatorBatch32DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'SBA Loan Calculator USA 2026 — 7(a) and 504 Loans | ToolTrio',
  description: 'Calculate SBA loan monthly payment, DSCR eligibility, total interest cost, and maximum loan amount based on your business financials.',
  slug: 'sba-loan-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['SBA loan calculator 2026', 'SBA 7a loan calculator', 'SBA 504 loan calculator USA', 'business loan DSCR calculator', 'SBA loan eligibility calculator 2026'],
})
const faqs = [
 {question:'How is the monthly SBA loan payment calculated?',answer:'The calculator uses standard fixed-payment amortization from the entered loan amount, annual rate and term. Actual SBA financing can include variable rates, fees and lender-specific structures.'},
 {question:'How is DSCR calculated here?',answer:'The displayed DSCR is entered annual net profit divided by annual modeled loan payments. Existing debt is passed as zero by the current UI, so the ratio does not include other debt service.'},
 {question:'Does a 1.25 DSCR guarantee SBA approval?',answer:'No. The code uses 1.25 as its internal adequacy threshold. SBA eligibility and lender underwriting also consider program rules, repayment ability, business history, collateral where applicable and other factors.'},
 {question:'Is the displayed SBA program an eligibility determination?',answer:'No. It is a simplified classification based mainly on requested loan amount. Actual 7(a), 504 and Express eligibility depends on use of proceeds and current SBA program requirements.'},
 {question:'Does the estimated SBA fee match the current guaranty fee?',answer:'Not necessarily. The function applies a flat 3.5% assumption. Actual SBA guaranty fees can vary by program, guaranteed portion, maturity and fiscal-year rules, so verify the current SBA fee schedule.'}
]
const relatedCalculators = [
  { name: 'Business Valuation Calculator', href: '/calculators/finance/business-valuation-calculator', icon: '🏢', desc: 'Business Valuation Calculator' },
  { name: 'Break-Even Calculator', href: '/calculators/finance/break-even-calculator', icon: '📊', desc: 'Break-Even Calculator' },
  { name: 'ROI Calculator', href: '/calculators/finance/roi-calculator', icon: '📈', desc: 'ROI Calculator' },
  { name: 'Business Loan Calculator', href: '/calculators/finance/business-loan-calculator', icon: '💼', desc: 'Business Loan Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
        <CalculatorBatch32DeepDive slug="sba-loan-calculator" />
</>
}
