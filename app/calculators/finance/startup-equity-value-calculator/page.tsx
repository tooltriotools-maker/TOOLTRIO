import { CalculatorBatch28DeepDive } from '@/components/ui/CalculatorBatch28DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Startup Equity Value Calculator USA 2026 | ToolTrio',
  description: 'Model startup equity after financing dilution, a hypothetical exit valuation and your own probability of exit; compare paper, exit and expected value.',
  slug: 'startup-equity-value-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['startup equity value calculator','startup stock options value calculator','equity dilution calculator startup','startup exit value estimator'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'How does the calculator compound dilution across rounds?', answer: 'It multiplies the current ownership percentage by (1 − dilution rate) once for each modeled financing round. For example, three 15% dilution rounds multiply ownership by 0.85 × 0.85 × 0.85 rather than subtracting 45 percentage points.' },
  { question: 'What is current paper value?', answer: 'The calculator multiplies your current ownership percentage by the current company valuation. That is a scenario value, not necessarily the cash value of common shares or options because private-company securities can be illiquid and subject to grant terms.' },
  { question: 'What does expected value mean on this page?', answer: 'Expected value is the diluted exit ownership value multiplied by the exit probability you enter. The probability is your assumption, not a ToolTrio forecast of startup success.' },
  { question: 'What important equity terms are not modeled?', answer: 'The calculation does not model vesting, option strike price, exercise cost, liquidation preferences, preferred-versus-common rights, secondary-sale discounts, tax qualification or future refresh grants.' },
  { question: 'Why can company value rise while my ownership percentage falls?', answer: 'New financing can increase the company’s total valuation while issuing additional shares. Existing holders may therefore own a smaller percentage of a larger company; the economic outcome depends on both effects.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Stock Option Vesting', href: '/calculators/finance/stock-option-vesting-calculator', icon: '📈', desc: 'Stock Option Vesting' },
  { name: 'QSBS Calculator', href: '/calculators/finance/qsbs-calculator', icon: '🚀', desc: 'QSBS' },
  { name: 'ESOP Value Calculator', href: '/calculators/finance/esop-value-calculator', icon: '📈', desc: 'ESOP Value' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
        <CalculatorBatch28DeepDive slug="startup-equity-value-calculator" />
</>
}
