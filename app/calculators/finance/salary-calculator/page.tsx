import { CalculatorBatch53DeepDive } from '@/components/ui/CalculatorBatch53DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  
  loading: () => (
    <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
  )
})

export const metadata: Metadata = generateCalculatorMetadata({
 title: 'Salary Calculator India FY 2026-27 | ToolTrio',
 description: 'Salary calculator for India FY 2026-27. Convert CTC to estimated monthly in-hand salary using basic pay, HRA, PF, professional tax and the modeled new tax regime.',
 slug: 'salary-calculator',
 category: 'finance',
 region: 'india',
 keywords: [
    'salary calculator 2026',
    'salary calculator',
    'free salary calculator',
    'salary calculator online',
    'salary calculator India FY 2026-27',
    'salary calculator ',
    'accurate salary calculator',
    'how to calculate salary',
    'tooltrio.com',
  ],
})

const faqs = [
 { question: 'How accurate are the calculations?', answer: 'This calculator uses the salary components and assumptions shown on the page. It is a simplified India CTC-to-in-hand estimate, not an official payroll or income-tax computation. Actual payroll can differ by employer policy, state professional tax, PF treatment, exemptions, and the applicable tax regime.' },
 { question: 'Should I consult a financial advisor?', answer: 'For major financial decisions (retirement planning, large investments, tax strategy, estate planning), considering advice from a qualified financial professional (CFP) or CPA is strongly recommended. This Salary Calculator provides a calculation based on the inputs and assumptions shown, but a licensed professional can account for your complete financial picture, tax situation, and long-term goals in ways a calculator cannot.' },
 { question: 'Does this account for inflation?', answer: 'Where applicable, this Salary Calculator uses nominal values (current dollars) by default. For long-term projections, always consider that inflation varies by country and period; use an assumption appropriate to your planning horizon. To get inflation-adjusted (real) returns, account for inflation only when an inflation assumption is explicitly provided from the nominal return rate. For example, if your investment earns 8% and inflation is 3%, your real return is approximately 5%.' },
 { question: 'What are the limitations of financial calculators?', answer: 'Financial calculators, including this Salary Calculator, assume consistent contribution rates, steady returns, and tax assumptions shown on this page - which never perfectly match reality. Markets fluctuate, tax laws change, and life circumstances evolve. Use projections as directional guides rather than precise predictions. The most valuable insight is understanding the relationship between variables (rate, time, amount) not the exact output number.' },
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
          <CalculatorBatch53DeepDive slug="salary-calculator" />
</>)
}
