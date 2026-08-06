import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Stock Option Vesting Calculator USA 2026 — ISO vs NSO | ToolTrio',
  description: 'Calculate the value of vesting stock options year-by-year, tax impact of ISO vs NSO exercise, AMT risk, and optimal exercise strategy.',
  slug: 'stock-option-vesting-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['stock option vesting calculator USA 2026', 'ISO NSO vesting calculator', 'stock options tax calculator', 'employee stock options value calculator', 'when to exercise stock options USA'],
})
const faqs = [
 {question:'Does this page currently calculate ISOs and NSOs?',answer:'The current UI calls the calculation as an NSO scenario. The function supports ISO logic internally, but there is no ISO/NSO selector on this page, so the displayed tax estimate is the NSO branch.'},
 {question:'How is vesting modeled?',answer:'Shares are divided equally across the selected vesting years. Each year’s assumed fair market value grows from today’s FMV by the entered annual growth rate.'},
 {question:'How is NSO tax estimated?',answer:'For each vesting year the model computes positive spread as FMV minus strike price times shares vesting, then applies the entered tax rate to that spread. Actual NSO taxation generally depends on exercise, not merely vesting.'},
 {question:'Does the model include capital gains after exercise?',answer:'No. It estimates option spread and a simplified NSO tax amount. It does not model a later sale price, holding period, payroll withholding, state tax or capital gains after exercise.'},
 {question:'Why is projected stock growth especially uncertain?',answer:'Private-company and public-company share prices can change sharply and options can expire worthless. The growth rate is a scenario input, not a forecast or valuation opinion.'}
]
const relatedCalculators = [
  { name: 'Equity Compensation Calculator', href: '/calculators/finance/equity-compensation-calculator', icon: '📊', desc: 'Equity Compensation Calculator' },
  { name: 'Alternative Minimum Tax', href: '/calculators/finance/alternative-minimum-tax-calculator', icon: '⚠️', desc: 'Alternative Minimum Tax' },
  { name: 'RSU Vesting Schedule', href: '/calculators/finance/vesting-schedule-calculator', icon: '📅', desc: 'RSU Vesting Schedule' },
  { name: 'Net Unrealized Appreciation', href: '/calculators/finance/net-unrealized-appreciation-calculator', icon: '📈', desc: 'Net Unrealized Appreciation' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
