import { CalculatorBatch34DeepDive } from '@/components/ui/CalculatorBatch34DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'HELOC Calculator USA 2026 — Home Equity Line of Credit | ToolTrio',
  description: 'Calculate HELOC payments, draw period interest, repayment costs and compare against cash-out refinance.',
  slug: 'heloc-credit-line-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['HELOC calculator', 'home equity line of credit calculator USA', 'HELOC payment calculator 2026', 'draw period HELOC', 'HELOC vs cash out refinance'],
})

const faqs = [
  { question: 'How does this calculator estimate available HELOC credit?', answer: 'It multiplies home value by your entered credit-limit percentage and subtracts the current mortgage balance. Lenders can use different combined-LTV limits and underwriting rules.' },
  { question: 'Why is the draw-period payment interest-only?', answer: 'The model assumes the drawn balance only pays monthly interest during the draw period: draw amount × APR ÷ 12.' },
  { question: 'What happens when the repayment period starts?', answer: 'The calculator amortizes the entered draw amount over the repayment years, so the modeled payment includes principal and interest and is usually higher than the interest-only payment.' },
  { question: 'Does the model handle a variable HELOC rate?', answer: 'No. It holds your entered APR constant. CFPB notes HELOCs usually have variable rates, so real payments can change.' },
  { question: 'What is the main risk of a HELOC?', answer: 'A HELOC is secured by your home. If payments become unaffordable and the debt is not repaid, the home can be at risk.' },
]
const relatedCalculators = [
  { name: 'Mortgage Calculator', href: '/calculators/finance/mortgage-calculator', icon: '🏡', desc: 'Mortgage Calculator' },
  { name: 'Cash-Out Refinance vs HELOC', href: '/calculators/finance/cash-out-refinance-vs-heloc-calculator', icon: '🔄', desc: 'Cash-Out Refinance vs HELOC' },
  { name: 'Home Affordability', href: '/calculators/finance/home-affordability-calculator', icon: '🏠', desc: 'Home Affordability' },
  { name: 'Closing Cost Calculator', href: '/calculators/finance/closing-cost-calculator', icon: '💵', desc: 'Closing Cost Calculator' }
]

const structuredData = [generateFAQStructuredData(faqs)]

export default function Page() {
  return <>
    {structuredData.map((s, i) => (
      <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
    ))}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
        <CalculatorBatch34DeepDive slug="heloc-credit-line-calculator" />
</>
}
