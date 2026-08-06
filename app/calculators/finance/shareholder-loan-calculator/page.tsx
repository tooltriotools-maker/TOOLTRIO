import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Shareholder Loan Calculator USA 2026 — S-Corp & C-Corp | ToolTrio',
  description: 'Calculate the tax implications of shareholder loans from closely-held S-corps and C-corps vs dividend distributions, using IRS Applicable Federal Rates.',
  slug: 'shareholder-loan-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['shareholder loan calculator','S-corp shareholder loan tax','AFR shareholder loan calculator','corporate loan vs dividend tax'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'Why do closely-held corporations need to charge interest on shareholder loans?', answer: 'The IRS requires loans between a corporation and its shareholders to charge at least the Applicable Federal Rate (AFR), published monthly by the IRS — if a loan charges below-market interest, the IRS can impute additional taxable interest income (and potentially treat the shortfall as a dividend) even though no extra cash actually changed hands.' },
  { question: 'Is a shareholder loan taxed differently than a dividend distribution?', answer: 'A properly documented loan is not taxable income to the shareholder (it must eventually be repaid), while a dividend distribution from a C-corp is taxable to the shareholder and, for C-corps, has already been taxed once at the corporate level — creating the classic \'double taxation\' that loans can help shareholders manage, if structured legitimately.' },
  { question: 'What happens if the IRS decides a shareholder loan isn\'t a real loan?', answer: 'If a loan lacks the hallmarks of a genuine loan (no written note, no set repayment schedule, no interest, or a shareholder who never intends or is unable to repay it), the IRS can recharacterize it as a taxable dividend or compensation, triggering back taxes and penalties on what was reported as a nontaxable loan.' },
  { question: 'Which AFR should I enter?', answer: "Use the IRS Applicable Federal Rate relevant to the loan's month and term. AFRs are published monthly and differ for short-, mid- and long-term instruments." },
  { question: 'Does charging AFR automatically make an advance a valid loan?', answer: 'No. Interest rate is only one factor. Documentation, repayment terms, actual payments, intent and the surrounding facts can affect whether an advance is respected as debt.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Federal Contractor Tax', href: '/calculators/finance/federal-contractor-tax-calculator', icon: '🏛️', desc: 'Federal Contractor Tax' },
  { name: 'Profit Sharing Plan', href: '/calculators/finance/profit-sharing-plan-calculator', icon: '💼', desc: 'Profit Sharing Plan' },
  { name: 'Business Startup Calculator', href: '/calculators/finance/business-startup-calculator', icon: '🏢', desc: 'Business Startup' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
