import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'CD vs HYSA vs Money Market Fund Calculator USA 2026 | ToolTrio',
  description: 'Compare Certificate of Deposit, High-Yield Savings Account, and Money Market Fund after-tax returns. Find the best home for your short-term savings.',
  slug: 'cd-vs-hysa-vs-money-market-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['CD vs HYSA calculator 2026', 'money market vs HYSA calculator', 'best short term savings USA', 'certificate of deposit calculator', 'CD vs savings account 2026'],
})
const faqs = [
  {
    question: 'What is the difference between CD, HYSA, and Money Market?',
    answer: 'CD: locked rate for fixed term, early withdrawal penalty, highest FDIC security. HYSA: variable rate, no penalty, FDIC insured, full liquidity. Money Market Fund (MMF): invested in short-term Treasury/agency securities, not FDIC insured but extremely safe, often highest yield, same-day liquidity. MMFs like Fidelity SPAXX and Vanguard VMFXX regularly yield 0.1-0.3% above HYSA rates.',
  },
  {
    question: 'Are money market funds safe?',
    answer: "Money market funds invest in US Treasury bills, agency securities, and top-rated commercial paper. They've maintained a $1/share NAV ('breaking the buck') in all but two rare historical incidents (2008 financial crisis, 2020 March). Government MMFs (investing only in Treasuries/agencies) have never broken a dollar. They're not FDIC insured but considered extremely safe for short-term savings.",
  },
  {
    question: 'When should I choose a CD over HYSA?',
    answer: "Choose a CD when: (1) Rates are expected to fall — locking in today's rate makes sense. (2) You won't need the money for the full term. (3) The CD rate meaningfully exceeds HYSA (0.25%+ after accounting for liquidity loss). (4) You want penalty-enforced savings discipline. Choose HYSA when you may need access to the money, rates may rise, or the CD premium is minimal.",
  }
]
const relatedCalculators = [
  { name: 'I-Bonds Calculator', href: '/calculators/finance/i-bonds-calculator', icon: '🏛️', desc: 'I-Bonds Calculator' },
  { name: 'Emergency Fund HYSA', href: '/calculators/finance/emergency-fund-hysa-calculator', icon: '🏦', desc: 'Emergency Fund HYSA' },
  { name: 'Bond Ladder Calculator', href: '/calculators/finance/bond-ladder-calculator', icon: '📊', desc: 'Bond Ladder Calculator' },
  { name: 'Savings Goal Calculator', href: '/calculators/finance/savings-goal-calculator', icon: '🎯', desc: 'Savings Goal Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
