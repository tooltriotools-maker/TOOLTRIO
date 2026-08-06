import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Wealth Transfer Calculator USA 2026 — Estate & Gift Strategy | ToolTrio',
  description: 'Calculate future estate value, estate tax liability, and savings from trust strategies vs direct gifting.',
  slug: 'wealth-transfer-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['wealth transfer calculator', 'estate planning calculator USA 2026', 'GRAT calculator', 'SLAT calculator', 'wealth transfer tax savings'],
})
const faqs = [
  {
    question: 'What is a GRAT?',
    answer: 'A Grantor Retained Annuity Trust (GRAT) lets you transfer appreciating assets to heirs with minimal gift tax. You put assets in the trust and take annuity payments for a term. If assets appreciate above the IRS 7520 rate, the excess passes to heirs estate-tax-free. Zero-out GRATs set the annuity to return the full principal — if the grantor dies during the term, assets return to the estate; if not, heirs get all appreciation tax-free.',
  },
  {
    question: 'What is a SLAT?',
    answer: "A Spousal Lifetime Access Trust (SLAT) is an irrevocable trust where one spouse gifts assets for the other spouse's benefit. Assets leave the taxable estate of the grantor spouse while still being accessible to the family through the beneficiary spouse. SLATs lock in the current high exemption before a potential TCJA sunset.",
  },
  {
    question: 'What happens to the estate tax exemption in 2026?',
    answer: 'The TCJA doubled the estate tax exemption from ~$5.5M to $15M per person (2026). This provision sunsets after December 31, 2025 unless Congress acts — potentially reverting to approximately $7M adjusted for inflation. Creating structures NOW to lock in the high exemption is a primary planning strategy for high-net-worth families.',
  }
]
const relatedCalculators = [
  { name: 'Estate Tax Calculator', href: '/calculators/finance/estate-tax-calculator', icon: '⚖️', desc: 'Estate Tax Calculator' },
  { name: 'Gift Tax Calculator', href: '/calculators/finance/gift-tax-calculator', icon: '🎁', desc: 'Gift Tax Calculator' },
  { name: 'College Savings 529', href: '/calculators/finance/college-savings-529-calculator', icon: '🎓', desc: 'College Savings 529' },
  { name: 'Net Worth Calculator', href: '/calculators/finance/net-worth-calculator', icon: '💎', desc: 'Net Worth Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
