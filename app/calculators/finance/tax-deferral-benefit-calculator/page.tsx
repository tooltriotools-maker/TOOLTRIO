import { CalculatorBatch24DeepDive } from '@/components/ui/CalculatorBatch24DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Tax Deferral Benefit Calculator — Traditional vs Roth vs Taxable | ToolTrio',
  description: 'Compare simplified after-tax ending values for Traditional, Roth and taxable savings paths using a common contribution budget and return assumption.',
  slug: 'tax-deferral-benefit-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['tax deferral benefit calculator','traditional vs Roth vs taxable account','tax deferred growth calculator','compound growth tax comparison'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'Why is the Roth contribution smaller than the Traditional contribution in this model?', answer: 'The model starts with the same pre-tax budget and reduces Roth and taxable contributions by the entered tax rate, while the Traditional account receives the full amount.' },
  { question: 'How is the Traditional ending value taxed?', answer: 'After compounding the full annual contribution, the calculator applies the same entered tax rate to the entire ending Traditional balance. It does not model a different retirement tax bracket.' },
  { question: 'How does the taxable-account tax drag work?', answer: 'Instead of calculating dividends and realized gains, the model simply multiplies the expected return by 85%. That 15% haircut is a modeling assumption, not a statutory tax rate.' },
  { question: 'Does the calculator enforce IRA contribution limits?', answer: 'No. For 2026, IRS says the combined Traditional/Roth IRA contribution limit is $7,500, or $8,600 for age 50 or older, subject to compensation and other rules. Larger inputs should be treated as hypothetical or as another account type.' },
  { question: 'Does the highest ending balance identify the best account for me?', answer: 'No. Eligibility, employer matches, deductions, withdrawal rules, RMDs, tax rates, investment choices and liquidity needs are not fully modeled.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Roth vs Traditional 401k', href: '/calculators/finance/roth-vs-traditional-401k-calculator', icon: '🔄', desc: 'Roth vs Traditional 401k' },
  { name: '401k vs Taxable Account', href: '/calculators/finance/401k-vs-taxable-account-calculator', icon: '💰', desc: '401k vs Taxable Account' },
  { name: 'Tax-Efficient Withdrawal', href: '/calculators/finance/tax-efficient-withdrawal-calculator', icon: '💰', desc: 'Tax-Efficient Withdrawal' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
        <CalculatorBatch24DeepDive slug="tax-deferral-benefit-calculator" />
</>
}
