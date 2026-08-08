import { CalculatorBatch47DeepDive } from '@/components/ui/CalculatorBatch47DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({ title: 'Charitable Giving Tax Calculator USA 2026 | ToolTrio', description: 'Calculate the true after-tax cost of charitable donations. Compare cash vs appreciated stock donations, Donor Advised Funds, and maximize your charitable tax deduction.', slug: 'charitable-giving-tax-calculator', category: 'finance', keywords: ['charitable giving tax calculator USA', 'appreciated stock donation tax savings', 'donor advised fund calculator', 'charitable deduction 2026'] })
const faqs = [
  { question: 'Does donating appreciated stock always avoid capital-gain tax?', answer: 'A direct donation of qualifying appreciated property to a qualified charity can avoid the sale that would otherwise realize gain, but deduction amount and limits depend on the property, holding period and recipient organization.' },
  { question: 'What changes for charitable deductions in 2026?', answer: 'Beginning in 2026, itemized charitable deductions generally face a 0.5%-of-AGI floor. A limited deduction for qualifying cash contributions is also available to eligible non-itemizers. This calculator does not fully implement those new rules.' },
  { question: 'Why does the calculator use 20% for avoided capital-gain tax?', answer: 'That is a ToolTrio modeling assumption. Your actual federal long-term capital-gain rate may be 0%, 15% or 20%, and NIIT or state tax may also apply.' },
  { question: 'What are the AGI percentage limits shown by the calculator?', answer: 'The model caps cash at 60% of AGI and appreciated stock at 30% of AGI. Actual percentage limits depend on the contribution and organization, and carryover rules can apply.' },
  { question: 'Is a donor-advised fund always more tax-efficient?', answer: "No. A DAF can help with timing and administration, but it does not automatically produce a larger deduction. Fees, grant restrictions, contribution type and the donor's tax situation matter." }
]
const relatedCalculators = [{'name': 'Estate Tax Calculator', 'href': '/calculators/finance/estate-tax-calculator', 'icon': '🏛️', 'desc': 'Estate planning'}, {'name': 'Tax Bracket Calculator', 'href': '/calculators/finance/tax-bracket-calculator', 'icon': '🧾', 'desc': 'Your tax bracket'}, {'name': 'Income Tax Calculator', 'href': '/calculators/finance/income-tax-calculator', 'icon': '📋', 'desc': 'Federal tax'}]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() { return <>{structuredData.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}<CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />      <CalculatorBatch47DeepDive slug="charitable-giving-tax-calculator" />
</> }
