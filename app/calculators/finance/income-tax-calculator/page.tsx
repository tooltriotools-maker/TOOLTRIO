import { CalculatorBatch56DeepDive } from '@/components/ui/CalculatorBatch56DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  
  loading: () => (
    <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
  )
})

export const metadata: Metadata = generateCalculatorMetadata({
 title: 'Income Tax Calculator India FY 2026-27 | ToolTrio',
 description: 'Free India income tax calculator for FY 2026-27. Compare the new and old tax regimes, estimate tax, cess, surcharge, and take-home income.',
 slug: 'income-tax-calculator',
 category: 'finance',
 region: 'india',
 keywords: [
    'income tax calculator India FY 2026-27',
    'income tax calculator India',
    'free India income tax calculator',
    'India income tax calculator online',
    'India income tax calculator FY 2026-27',
    'India tax calculator ',
    'India tax regime calculator',
    'how to calculate income tax in India',
    'tooltrio.com',
  ],
})

const faqs = [
  { question: 'Which tax year does this calculator use?', answer: 'This calculator models India FY 2026-27 (AY 2027-28) using the new- and old-regime assumptions implemented in the calculator. Tax rules can change and the result is a planning estimate, not a tax-return filing calculation.' },
  { question: 'What is the new-regime slab structure for FY 2026-27?', answer: 'The implemented new-regime slabs are nil up to ₹4 lakh, 5% from ₹4–8 lakh, 10% from ₹8–12 lakh, 15% from ₹12–16 lakh, 20% from ₹16–20 lakh, 25% from ₹20–24 lakh, and 30% above ₹24 lakh. The Income Tax Department also states that the section 87A rebate is increased to ₹60,000 for eligible taxpayers with total income up to ₹12 lakh for AY 2026-27.' },
  { question: 'Does this calculator replace an ITR calculation?', answer: 'No. It is a planning estimate. Actual tax can depend on the precise income heads, exemptions, deductions, capital gains, special-rate income, surcharge rules, marginal relief, rebate eligibility, and other facts in the return.' },
  { question: 'Can I compare the old and new regimes?', answer: 'Yes. The calculator shows both scenarios using the deductions entered for the old-regime model. The actual regime choice should be checked against your complete eligible deductions and income sources.' },
  { question: 'Why does the result use rupees?', answer: 'This calculator is specifically for Indian income-tax planning and uses INR/₹ throughout.' }
]

const relatedCalculators = [
 { name: 'Compound Interest', href: '/calculators/finance/compound-interest-calculator', icon: '💰', desc: 'Power of compounding' },
 { name: 'Retirement Calculator', href: '/calculators/finance/retirement-calculator', icon: '🌅', desc: 'Retirement planning' },
 { name: 'FIRE Calculator', href: '/calculators/finance/fire-calculator', icon: '🔥', desc: 'Financial independence' },
 { name: 'Net Worth Calculator', href: '/calculators/finance/net-worth-calculator', icon: '💎', desc: 'Track net worth' },
 { name: 'Savings Goal Calculator', href: '/calculators/finance/savings-goal-calculator', icon: '🎯', desc: 'Goal-based savings' },
 { name: 'ROI Calculator', href: '/calculators/finance/roi-calculator', icon: '📐', desc: 'Return on investment' },
]

const structuredData = [generateFAQStructuredData(faqs)]

export default function Page() {
 return (
 <>
      {structuredData.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <CalculatorClient
 faqs={faqs}
 relatedCalculators={relatedCalculators}
 blogSlug="sip-calculator-guide-how-to-grow-wealth-with-systematic-investment"
 />
          <CalculatorBatch56DeepDive slug="income-tax-calculator" />
</>)
}
