import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Roth IRA Conversion Tax Calculator USA 2026 | ToolTrio',
  description: 'Calculate exact federal and state taxes on a Roth IRA conversion, find the optimal conversion amount to fill your current bracket, and model 30-year tax-free growth.',
  slug: 'roth-conversion-tax-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['roth conversion tax calculator 2026', 'roth IRA conversion cost calculator', 'how much tax on roth conversion USA', 'roth conversion bracket filling', 'roth conversion optimal amount calculator'],
})
const faqs = [
  {
    question: 'How much tax do I pay on a Roth conversion?',
    answer: 'Roth conversions are taxed as ordinary income in the year of conversion — added to your AGI. If your AGI is $75,000 and you convert $40,000, your total income becomes $115,000. The marginal rate on the conversion depends on which bracket the added income falls in. In this example, $23,200 of the conversion falls in the 22% bracket and the rest in the 24% bracket — a blended rate of approximately 22-23%.',
  },
  {
    question: 'What is bracket-filling Roth conversion?',
    answer: "Bracket-filling means converting only enough to 'fill up' your current bracket without spilling into the next. In 2026, the 22% bracket ends at $100,525 (single). If your AGI is $75,000, you have $25,525 of room in the 22% bracket. Converting $25,525 keeps you entirely in the 22% bracket; converting more pushes you to 24%. Optimal conversions target the lowest available brackets — often done during early retirement before Social Security and RMDs begin.",
  },
  {
    question: 'When is the best time to do a Roth conversion?',
    answer: 'Best times: (1) Years with unusually low income (between jobs, early retirement, year of large deductions). (2) Before age 73 when RMDs force taxable withdrawals. (3) Before Social Security begins at rates that raise provisional income. (4) After a market downturn — converting shares worth less means less tax for the same number of shares, and all the recovery happens tax-free in the Roth.',
  }
]
const relatedCalculators = [
  { name: 'Roth Conversion Ladder', href: '/calculators/finance/roth-conversion-ladder-calculator', icon: '🪜', desc: 'Roth Conversion Ladder' },
  { name: 'Backdoor Roth IRA', href: '/calculators/finance/backdoor-roth-ira-calculator', icon: '🚪', desc: 'Backdoor Roth IRA' },
  { name: 'Tax Bracket Calculator', href: '/calculators/finance/tax-bracket-calculator', icon: '🧾', desc: 'Tax Bracket Calculator' },
  { name: 'Taxable vs Roth vs Traditional', href: '/calculators/finance/taxable-vs-roth-vs-traditional-calculator', icon: '📊', desc: 'Taxable vs Roth vs Traditional' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
