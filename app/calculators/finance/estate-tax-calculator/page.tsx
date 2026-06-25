import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
  )
})

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Federal Estate Tax Calculator USA 2026 | ToolTrio',
  description: 'Calculate federal estate tax liability, exemption amounts, and marital deduction. Plan for the potential TCJA sunset reducing exemptions.',
  slug: 'estate-tax-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['estate tax calculator 2026', 'federal estate tax exemption 2026', 'estate planning calculator USA', 'TCJA estate tax sunset', 'estate tax rate calculator'],
})

const faqs = [
  {
    question: 'What is the 2026 federal estate tax exemption?',
    answer: "$13,610,000 per person ($27,220,000 for married couples using portability). Assets above this threshold are taxed at rates from 18% to 40%. However, the TCJA doubled exemption is scheduled to sunset on December 31, 2025 — potentially reverting to approximately $7 million per person in 2026 (inflation-adjusted) if Congress doesn't act. This makes 2024-2025 critical for large estate planning transfers.",
  },
  {
    question: 'What is estate tax portability?',
    answer: "Portability allows a surviving spouse to use any unused portion of the deceased spouse's estate tax exemption. If the first spouse to die uses only $5 million of their $13.61 million exemption, the surviving spouse can add the unused $8.61 million to their own exemption — for a total of $22.22 million. This must be elected on the estate tax return (Form 706) within 5 years of death.",
  },
  {
    question: 'How do I reduce federal estate taxes?',
    answer: 'Key strategies: (1) Annual gifting — $18,000/year per recipient ($36,000 married) transfers wealth tax-free. (2) Irrevocable Life Insurance Trust (ILIT) — removes life insurance from estate. (3) Charitable Remainder Trust (CRT) — income stream + charitable deduction. (4) GRATs (Grantor Retained Annuity Trusts) — transfer appreciation. (5) 529 superfunding — $90,000 per child in one year. (6) Qualified Opportunity Zone investments.',
  }
]

const relatedCalculators = [
  { name: 'Gift Tax Calculator', href: '/calculators/finance/gift-tax-calculator', icon: '🎁', desc: 'Gift Tax Calculator' },
  { name: 'Net Worth Calculator', href: '/calculators/finance/net-worth-calculator', icon: '💰', desc: 'Net Worth Calculator' },
  { name: 'College Savings 529', href: '/calculators/finance/college-savings-529-calculator', icon: '🎓', desc: 'College Savings 529' },
  { name: 'Retirement Calculator', href: '/calculators/finance/retirement-calculator', icon: '🏦', desc: 'Retirement Calculator' }
]

const structuredData = [generateFAQStructuredData(faqs)]

export default function Page() {
  return <>
    {structuredData.map((s, i) => (
      <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
    ))}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
