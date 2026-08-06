import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'State Tax Relocation Calculator USA 2026 — Save by Moving | ToolTrio',
  description: 'Calculate annual state income tax savings from relocating between any two US states. See 10-year savings and break-even on moving costs.',
  slug: 'state-tax-relocation-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['state tax relocation calculator', 'move to no income tax state calculator USA', 'state income tax comparison calculator 2026', 'how much save moving to Texas Florida', 'state tax savings relocation'],
})
const faqs = [
  {
    question: 'How much can I save by moving from California to Texas?',
    answer: "At $200,000 income: California income tax ≈ $17,000-$19,000/year; Texas = $0. That's $17,000+/year in savings, or $170,000+ over 10 years. California's top rate reaches 13.3% above $1M. High earners in CA routinely save $50,000-$200,000+ annually by establishing domicile in no-income-tax states like Texas, Florida, Nevada, Washington, or Wyoming.",
  },
  {
    question: 'What does it take to change state domicile?',
    answer: "States with no income tax (especially FL and TX) are aggressive about auditing former residents who try to claim they've moved while still working/living substantially in a high-tax state. Requirements vary, but generally: (1) Spend more than 183 days per year in the new state, (2) Establish physical presence (home, voter registration, driver's license, car registration, bank accounts), (3) Sever ties with old state (no property, business, or frequent visits). California is particularly aggressive with residency audits.",
  },
  {
    question: 'Which states have no income tax in 2026?',
    answer: 'No state income tax: Alaska, Florida, Nevada, South Dakota, Tennessee (eliminated income tax on interest/dividends in 2022), Texas, Washington, Wyoming. New Hampshire taxes only interest and dividends (at reduced rate, being phased out). Note: Washington state implemented a 7% capital gains tax in 2022 on gains above $250,000 — technically not an income tax but a relevant consideration for investors.',
  }
]
const relatedCalculators = [
  { name: 'Net Salary Calculator', href: '/calculators/finance/net-salary-calculator', icon: '💰', desc: 'Net Salary Calculator' },
  { name: 'Tax Bracket Calculator', href: '/calculators/finance/tax-bracket-calculator', icon: '🧾', desc: 'Tax Bracket Calculator' },
  { name: 'Capital Gains Tax', href: '/calculators/finance/capital-gains-tax-calculator', icon: '📈', desc: 'Capital Gains Tax' },
  { name: 'Income Tax Calculator', href: '/calculators/finance/income-tax-calculator', icon: '💰', desc: 'Income Tax Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
