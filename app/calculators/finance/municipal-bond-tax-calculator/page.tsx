import { CalculatorBatch22DeepDive } from '@/components/ui/CalculatorBatch22DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Municipal Bond Tax-Equivalent Yield Calculator USA 2026 | ToolTrio',
  description: 'Calculate the tax-equivalent yield of municipal bonds vs taxable bonds. Find out if munis make sense at your federal and state tax rates.',
  slug: 'municipal-bond-tax-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['municipal bond tax equivalent yield calculator', 'muni bond calculator USA 2026', 'tax exempt bond yield calculator', 'muni vs treasury yield comparison', 'municipal bond after tax return'],
})
const faqs = [
  {
    question: 'How do you calculate tax-equivalent yield?',
    answer: "TEY = Municipal yield / (1 - combined tax rate). For a 4% muni at 32% federal + 9.3% state (CA): TEY = 4% / (1 - 0.413) = 6.81%. This means you'd need a taxable bond yielding 6.81% to equal the after-tax income of a 4% muni. At this spread, munis are compelling for high-bracket investors in high-tax states.",
  },
  {
    question: 'Who benefits most from municipal bonds?',
    answer: 'Municipal bonds are most valuable in the 32%+ federal tax bracket — especially in high-tax states like CA (13.3%), NY (10.9%), NJ (10.75%), and OR (9.9%). At 37% federal + 13.3% CA = 50.3% combined rate, a 4% muni has a TEY of 8.05% — far above typical corporate or Treasury yields. At lower brackets (10-22%), the TEY advantage disappears and taxable bonds often win.',
  },
  {
    question: 'Are municipal bonds safe?',
    answer: 'General obligation (GO) bonds are backed by the full taxing power of the municipality and have extremely low default rates historically. Revenue bonds (backed by specific project revenue) carry more risk. The 2013 Detroit bankruptcy and 2016 Puerto Rico default are notable exceptions. Rating matters: AAA-rated munis have 30-year default rates below 0.1%. For most high-income investors, high-grade munis via a diversified fund are an appropriate fixed-income core.',
  }
]
const relatedCalculators = [
  { name: 'Bond Ladder Calculator', href: '/calculators/finance/bond-ladder-calculator', icon: '📊', desc: 'Bond Ladder Calculator' },
  { name: 'I-Bonds Calculator', href: '/calculators/finance/i-bonds-calculator', icon: '🏛️', desc: 'I-Bonds Calculator' },
  { name: 'Net Investment Income Tax', href: '/calculators/finance/net-investment-income-tax-calculator', icon: '💹', desc: 'Net Investment Income Tax' },
  { name: 'Tax-Loss Harvesting', href: '/calculators/finance/tax-loss-harvesting-calculator', icon: '🌿', desc: 'Tax-Loss Harvesting' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
        <CalculatorBatch22DeepDive slug="municipal-bond-tax-calculator" />
</>
}
