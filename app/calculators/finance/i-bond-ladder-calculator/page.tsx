import { CalculatorBatch28DeepDive } from '@/components/ui/CalculatorBatch28DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'I-Bond Ladder Calculator USA 2026 — Monthly Purchase Strategy | ToolTrio',
  description: 'Calculate total I-Bond value from monthly purchases, effective yield, and optimal ladder strategy to maximize the $10,000 annual limit.',
  slug: 'i-bond-ladder-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['I bond ladder calculator 2026', 'monthly I bond purchase strategy', 'I bond annual limit calculator', 'series I savings bond ladder', 'I bond vs HYSA 2026'],
})
const faqs = [
  {
    question: 'What is the I-Bond annual purchase limit?',
    answer: '$10,000 per person or eligible entity per calendar year in electronic I bonds through TreasuryDirect. The former option to buy up to $5,000 of paper I bonds with a federal income-tax refund has ended, so this calculator uses the current $10,000 electronic annual limit.',
  },
  {
    question: 'How does a monthly I-Bond purchase strategy work?',
    answer: "Instead of buying $10,000 on January 1, spreading purchases across the year (e.g., $833/month) creates a 'ladder' of bonds with different purchase dates — staggering the 5-year penalty-free window and providing more flexible access to funds. Each purchase is independently tracked with its own 12-month lockup and 5-year penalty window.",
  },
  {
    question: 'When is the best month to buy I-Bonds?',
    answer: 'I-Bond rates reset May 1 and November 1. Buying just before a rate reset (late April or late October) locks in 6 months of the current rate before switching. A bond keeps its composite rate for six months from its issue date before moving to the next announced rate. Rate-reset timing can matter, but future inflation components are unknown, so this calculator should not be used to predict which purchase month will deliver the best return.',
  }
]
const relatedCalculators = [
  { name: 'I-Bonds Calculator', href: '/calculators/finance/i-bonds-calculator', icon: '🏛️', desc: 'I-Bonds Calculator' },
  { name: 'Bond Ladder Calculator', href: '/calculators/finance/bond-ladder-calculator', icon: '📊', desc: 'Bond Ladder Calculator' },
  { name: 'Emergency Fund HYSA', href: '/calculators/finance/emergency-fund-hysa-calculator', icon: '🏦', desc: 'Emergency Fund HYSA' },
  { name: 'Municipal Bond Calculator', href: '/calculators/finance/municipal-bond-tax-calculator', icon: '🏛️', desc: 'Municipal Bond Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
        <CalculatorBatch28DeepDive slug="i-bond-ladder-calculator" />
</>
}
