import { CalculatorBatch48DeepDive } from '@/components/ui/CalculatorBatch48DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Estate Planning Readiness Score Calculator USA 2026 | ToolTrio',
  description: 'Get a personalized estate planning readiness score based on your age, net worth, and whether you have a will, trust, power of attorney, and adequate life insurance.',
  slug: 'estate-planning-checklist-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['estate planning checklist calculator','estate planning readiness score','do I need a trust calculator','estate planning documents checklist'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'Do I need a will if I don\'t have a large estate?', answer: 'Yes — a will isn\'t just for the wealthy. Without one, state intestacy laws decide who inherits your assets and who becomes guardian of minor children, which may not match your wishes regardless of your net worth.' },
  { question: 'At what net worth should I consider a living trust instead of just a will?', answer: 'There\'s no fixed threshold, but a revocable living trust becomes increasingly valuable as you accumulate real estate or significant assets, since it avoids probate (which can be costly and public) and keeps your estate plan private — many planners suggest considering one once you own a home plus meaningful investment assets.' },
  { question: 'What is a power of attorney and why does everyone need one?', answer: 'A financial power of attorney (POA) lets a trusted person manage your finances if you become incapacitated, and a healthcare POA lets someone make medical decisions on your behalf. Without these documents, your family may need to petition a court for guardianship — an expensive, slow process — even for a spouse.' },
  { question: "Does a high score mean my estate plan is legally complete?", answer: "No. The score only tracks five checklist items. Legal validity, titling, state law, guardianship, tax planning and coordination among documents are outside the score." },
  { question: "Is a living trust required above $500,000 net worth?", answer: "No. The $500,000 threshold is only a ToolTrio scoring heuristic. Whether a trust is useful depends on state law, asset ownership, probate goals, privacy and other planning needs." },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Estate Tax Calculator', href: '/calculators/finance/estate-tax-calculator', icon: '⚖️', desc: 'Estate Tax' },
  { name: 'Estate Liquidity', href: '/calculators/finance/estate-liquidity-calculator', icon: '⚖️', desc: 'Estate Liquidity' },
  { name: 'Life Insurance Needs', href: '/calculators/finance/life-insurance-needs-calculator', icon: '🛡️', desc: 'Life Insurance Needs' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
        <CalculatorBatch48DeepDive slug="estate-planning-checklist-calculator" />
</>
}
