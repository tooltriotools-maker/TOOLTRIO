import { CalculatorBatch16DeepDive } from '@/components/ui/CalculatorBatch16DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Tax-Loss Harvesting Portfolio Calculator USA 2026 | ToolTrio',
  description: 'Estimate how modeled portfolio losses offset capital gains, use the federal capital-loss deduction and create a carryforward for later tax years.',
  slug: 'tax-loss-harvesting-portfolio-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['tax loss harvesting calculator','harvest investment losses tax savings','capital loss carryforward calculator','tax loss harvesting $3000 limit'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'How are losses applied in this calculator?', answer: 'The model totals the sample portfolio losses, applies them against the capital gains you enter, then allows up to $3,000 of remaining net loss against ordinary income and carries any additional modeled loss forward.' },
  { question: 'What is the $3,000 capital-loss deduction limit?', answer: 'IRS Publication 550 states that when capital losses exceed capital gains, the annual capital-loss deduction is generally limited to $3,000, or $1,500 if married filing separately; this calculator models the $3,000 case only. Unused net capital loss can carry to later years.' },
  { question: 'How can the wash-sale rule affect a harvested loss?', answer: 'A loss on stock or securities can be disallowed currently if substantially identical stock or securities are acquired within the wash-sale period around the loss sale. The disallowed loss generally affects basis rather than simply disappearing, so transaction tracking matters.' },
  { question: 'Does this calculator distinguish short-term and long-term gains?', answer: 'No. The current model uses one capital-gains amount and one user-entered tax rate. Actual Schedule D netting distinguishes short-term and long-term items, which can produce different tax rates and ordering.' },
  { question: 'Does an unrealized market loss count for this calculation?', answer: 'No. A decline in market value by itself is not a realized capital loss. Tax-loss harvesting generally requires a taxable sale or disposition, subject to basis, holding-period and wash-sale rules.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Tax-Loss Harvesting Calculator', href: '/calculators/finance/tax-loss-harvesting-calculator', icon: '🌿', desc: 'Tax-Loss Harvesting' },
  { name: 'Wash Sale Calculator', href: '/calculators/finance/wash-sale-calculator', icon: '🔄', desc: 'Wash Sale' },
  { name: 'Capital Gains Harvesting', href: '/calculators/finance/capital-gains-harvesting-calculator', icon: '🌱', desc: 'Capital Gains Harvesting' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
        <CalculatorBatch16DeepDive slug="tax-loss-harvesting-portfolio-calculator" />
</>
}
