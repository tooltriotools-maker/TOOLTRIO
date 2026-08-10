import { CalculatorBatch29DeepDive } from '@/components/ui/CalculatorBatch29DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Early Mortgage Payoff Calculator USA 2026 — Extra Payment Savings | ToolTrio',
  description: 'Calculate how much interest you save and how many years you shave off by making extra monthly or annual mortgage payments.',
  slug: 'early-mortgage-payoff-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['early mortgage payoff calculator', 'extra mortgage payment calculator USA 2026', 'mortgage payoff accelerator', 'biweekly mortgage savings calculator', 'how to pay off mortgage early'],
})
const faqs = [
  { question: 'How are extra payments applied in this calculator?', answer: 'The monthly extra is added to every scheduled payment, while the annual extra is applied every twelfth month. Both reduce principal in the accelerated schedule.' },
  { question: 'Why do extra principal payments reduce interest?', answer: 'Mortgage interest is calculated from the outstanding balance. Reducing principal earlier lowers the balance on which later interest is calculated.' },
  { question: 'Is paying extra equivalent to earning the mortgage rate?', answer: 'Not exactly. It avoids future interest at the loan rate, but liquidity, taxes, mortgage deductions and alternative investments make the economic comparison different from an investment-return equivalent.' },
  { question: 'Does the model include prepayment penalties?', answer: 'No. Check your loan documents and servicer rules for any restrictions and confirm extra payments are applied to principal.' },
  { question: 'Does this work for adjustable-rate mortgages?', answer: 'The calculation assumes the entered rate remains fixed for the remaining term, so it does not model future ARM rate resets.' },
]
const relatedCalculators = [
  { name: 'Mortgage Calculator', href: '/calculators/finance/mortgage-calculator', icon: '🏠', desc: 'Mortgage Calculator' },
  { name: 'Mortgage Recast Calculator', href: '/calculators/finance/mortgage-recast-calculator', icon: '🏠', desc: 'Mortgage Recast Calculator' },
  { name: 'Mortgage Points Calculator', href: '/calculators/finance/mortgage-points-calculator', icon: '📐', desc: 'Mortgage Points Calculator' },
  { name: 'Refinance vs Invest', href: '/calculators/finance/refinance-vs-invest-calculator', icon: '📊', desc: 'Refinance vs Invest' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
        <CalculatorBatch29DeepDive slug="early-mortgage-payoff-calculator" />
</>
}
