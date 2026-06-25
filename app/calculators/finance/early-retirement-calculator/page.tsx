import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Early Retirement Calculator USA 2026 — Retire Before 60 | ToolTrio',
  description: 'Calculate your FIRE number, portfolio sustainability, safe withdrawal rate, and years to early retirement with real investment return modeling.',
  slug: 'early-retirement-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['early retirement calculator', 'retire early calculator USA 2026', 'FIRE number calculator', 'retire before 60 calculator', 'portfolio sustainability calculator'],
})
const faqs = [
  {
    question: 'What is the FIRE number?',
    answer: 'Your FIRE number is the portfolio size at which you can retire safely: Annual Expenses ÷ Safe Withdrawal Rate. At 3.5% SWR and $60,000/year expenses, FIRE number = $60,000 / 0.035 = $1,714,286. The 4% rule is standard for 30-year retirements; early retirees (40+ year horizon) should use 3-3.5% to reduce sequence-of-returns risk.',
  },
  {
    question: 'Can I access retirement accounts before 59½?',
    answer: 'Yes — several strategies: (1) Roth conversion ladder: convert Traditional IRA to Roth, access converted amounts after 5 years penalty-free. (2) 72(t)/SEPP: substantially equal periodic payments from IRA — penalty-free but must continue for 5 years or until 59½, whichever is longer. (3) Rule of 55: 401k penalty-free if you leave employer at 55+. (4) Roth contributions (not earnings) always accessible penalty-free.',
  },
  {
    question: 'What is a safe withdrawal rate for early retirement?',
    answer: "The classic '4% rule' (Bengen, 1994) covers 30-year retirements with 95%+ success. For 40-50 year retirements (retiring at 40-50), most research suggests 3-3.5%. At 3.5% SWR, a $2M portfolio supports $70,000/year inflation-adjusted withdrawals with high historical success rates across market cycles including the Great Depression and 1970s stagflation.",
  }
]
const relatedCalculators = [
  { name: 'FIRE Calculator', href: '/calculators/finance/fire-calculator', icon: '🔥', desc: 'FIRE Calculator' },
  { name: 'Roth Conversion Ladder', href: '/calculators/finance/roth-conversion-ladder-calculator', icon: '🪜', desc: 'Roth Conversion Ladder' },
  { name: 'Retirement Withdrawal Calculator', href: '/calculators/finance/retirement-withdrawal-calculator', icon: '💰', desc: 'Retirement Withdrawal Calculator' },
  { name: 'Savings Rate Calculator', href: '/calculators/finance/savings-rate-calculator', icon: '💹', desc: 'Savings Rate Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
