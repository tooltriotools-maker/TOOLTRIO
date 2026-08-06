import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Annuity Income Calculator USA 2026 — Lifetime Income | ToolTrio',
  description: 'Calculate monthly annuity income, break-even age, tax treatment, and compare immediate vs deferred vs variable annuities.',
  slug: 'annuity-income-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['annuity calculator 2026', 'lifetime income annuity calculator USA', 'immediate annuity payout calculator', 'deferred annuity calculator', 'annuity vs 401k withdrawal calculator'],
})
const faqs = [
  {
    question: 'What monthly income does an annuity provide?',
    answer: 'A $300,000 immediate annuity for a 65-year-old generates approximately $1,500-$2,000/month for life depending on the insurer, current interest rates, and type. In 2026 with elevated interest rates, annuity payout rates are near 10-year highs. The older you are at annuitization, the higher the monthly payment because the insurer expects fewer payments.',
  },
  {
    question: 'Should I choose an annuity or invest myself?',
    answer: "Annuities provide longevity insurance — guaranteed income you can't outlive. Self-investing provides flexibility and potentially higher returns but no guarantee against outliving your money. Rule of thumb: annuitize a portion (covering basic living expenses beyond Social Security), invest the rest for growth. Avoid annuities with high surrender charges, complex riders, or fees above 1%.",
  },
  {
    question: 'How is annuity income taxed?',
    answer: 'For non-qualified annuities (purchased with after-tax money): each payment is partly return of principal (not taxed) and partly earnings (taxed as ordinary income). For qualified annuities (purchased with pre-tax IRA/401k money): 100% of each payment is taxable ordinary income. Annuities are NOT eligible for the lower long-term capital gains rates — another factor vs direct investment.',
  }
]
const relatedCalculators = [
  { name: 'Annuity vs Lump Sum', href: '/calculators/finance/annuity-vs-lumpsum-calculator', icon: '⚖️', desc: 'Annuity vs Lump Sum' },
  { name: 'Retirement Calculator', href: '/calculators/finance/retirement-calculator', icon: '🏦', desc: 'Retirement Calculator' },
  { name: 'Social Security Breakeven', href: '/calculators/finance/social-security-breakeven-calculator', icon: '🏛️', desc: 'Social Security Breakeven' },
  { name: 'RMD Calculator', href: '/calculators/finance/required-minimum-distribution-calculator', icon: '📋', desc: 'RMD Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
