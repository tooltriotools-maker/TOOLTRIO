import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'State Estate Tax Calculator USA 2026 | ToolTrio',
  description: 'Estimate federal and Massachusetts estate-tax exposure from a gross estate value using a simplified threshold model; includes the 2026 federal exclusion.',
  slug: 'state-estate-tax-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['state estate tax calculator 2026','which states have estate tax','state estate tax exemption by state','combined federal and state estate tax'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'What federal estate-tax exclusion does this calculator use for 2026?', answer: 'It uses a $15,000,000 federal basic exclusion amount for 2026, matching current IRS guidance. The federal result is still simplified because the tool does not model adjusted taxable gifts, deductions, portability, credits or the full Form 706 computation.' },
  { question: 'Which state does the current calculator actually model?', answer: 'The current page sends Massachusetts (MA) to the calculation function. Although the underlying code contains assumptions for several states, this UI should be read as a Massachusetts scenario until a state selector and state-specific graduated schedules are implemented.' },
  { question: 'Can an estate owe state estate tax but no federal estate tax?', answer: 'Yes. A state can apply its own estate-tax threshold even when an estate is below the federal filing threshold. This is why the calculator shows federal and state estimates separately.' },
  { question: 'Is the displayed Massachusetts tax an exact return calculation?', answer: 'No. The current model applies a simplified threshold and rate rather than reproducing the full Massachusetts estate-tax return. Use it as a screening estimate and verify the actual liability with current Massachusetts Department of Revenue rules.' },
  { question: 'What does gross estate value mean here?', answer: 'Enter the total estate value you want to test before this calculator applies its modeled exemptions. Real estate-tax filings can require valuation rules, deductions, prior taxable gifts and other adjustments that are outside this one-input tool.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Estate Tax Calculator', href: '/calculators/finance/estate-tax-calculator', icon: '⚖️', desc: 'Estate Tax' },
  { name: 'Estate Liquidity', href: '/calculators/finance/estate-liquidity-calculator', icon: '⚖️', desc: 'Estate Liquidity' },
  { name: 'Trust Fund Growth', href: '/calculators/finance/trust-fund-growth-calculator', icon: '💰', desc: 'Trust Fund Growth' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
