import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Period Certain vs Lifetime Annuity Calculator USA 2026 | ToolTrio',
  description: 'Compare period certain annuity vs lifetime annuity payouts to find the break-even age where one option pays more, based on your life expectancy.',
  slug: 'annuity-certain-vs-lifetime-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['period certain vs lifetime annuity','annuity break-even calculator','annuity payout comparison','lifetime income annuity'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'What\'s the difference between a period certain and a lifetime annuity?', answer: 'A lifetime annuity pays for as long as you live but stops at death (no payments to heirs). A period certain annuity pays for a fixed number of years regardless of whether you\'re alive, and continues to a beneficiary if you die early — but usually offers a lower monthly payment for the same premium.' },
  { question: 'How do I know which annuity option is better for me?', answer: 'It comes down to your health and family situation: lifetime annuities are better if you expect to live longer than average or have no one to leave money to; period certain is better if you want a guaranteed payout to heirs or have a shorter life expectancy. The break-even age shows when lifetime income overtakes period-certain total payouts.' },
  { question: 'Can I combine both annuity types?', answer: 'Yes — many insurers offer a \'life with period certain\' hybrid that pays for life but guarantees a minimum number of years of payments to a beneficiary if you die early, blending the security of both approaches for a modestly lower monthly payment.' },
  { question: 'What does break-even age mean here?', answer: 'It is the age at which cumulative lifetime payments equal the modeled total period-certain payments, based on the two monthly quotes entered.' },
  { question: 'Does the calculator value survivor benefits?', answer: 'Only indirectly through the period-certain payment stream. It does not price joint-life, refund, COLA or other contract riders.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Equity-Indexed Annuity', href: '/calculators/finance/equity-indexed-annuity-calculator', icon: '📈', desc: 'Equity-Indexed Annuity' },
  { name: 'Variable Annuity Fees', href: '/calculators/finance/variable-annuity-fee-calculator', icon: '💰', desc: 'Variable Annuity Fees' },
  { name: 'Social Security Calculator', href: '/calculators/finance/social-security-calculator', icon: '🏛️', desc: 'Social Security' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
