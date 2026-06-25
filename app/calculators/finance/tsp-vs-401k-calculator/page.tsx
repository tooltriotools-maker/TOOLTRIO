import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'TSP vs 401k Calculator USA 2026 — Federal Employee Retirement | ToolTrio',
  description: 'Compare Thrift Savings Plan (TSP) vs private sector 401k. Calculate FERS pension value, TSP matching, and total federal employee retirement package.',
  slug: 'tsp-vs-401k-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['TSP calculator 2026', 'thrift savings plan calculator', 'federal employee retirement calculator', 'FERS pension calculator', 'TSP vs 401k comparison USA'],
})
const faqs = [
  {
    question: 'How does FERS work with TSP?',
    answer: 'FERS has three components: (1) Basic FERS pension: 1% × years of service × high-3 average salary (1.1% if you retire at 62+ with 20+ years). (2) Social Security — federal employees are covered. (3) TSP (Thrift Savings Plan): government matches 1% automatically, then matches up to 4% of employee contributions (effectively 5% match). Contributing at least 5% to TSP captures the full match — a mandatory 100% return on that 5%.',
  },
  {
    question: 'What are the TSP fund options?',
    answer: 'TSP offers: G Fund (government securities, never loses value), F Fund (bond index), C Fund (S&P 500 equivalent), S Fund (small/mid cap), I Fund (international), and L Funds (lifecycle/target date). The C Fund has historically performed similarly to S&P 500 index funds with expense ratios of ~0.043% — among the lowest in the world. Many advisors recommend C+S+I allocation for growth phase, shifting to G+F near retirement.',
  },
  {
    question: 'Is FERS pension valuable compared to private sector?',
    answer: 'The FERS pension is enormously valuable. At 30 years of service on a $95,000 salary: annual pension = $95,000 × 1% × 30 = $28,500/year (or $31,350 at 1.1% for age 62+). Present value at 4% discount rate = ~$712,500. Most private sector employees have no defined benefit pension — their TSP equivalent (401k) must be entirely self-funded. Federal employees get pension + TSP + Social Security + FEHB health insurance.',
  }
]
const relatedCalculators = [
  { name: '401k Calculator', href: '/calculators/finance/401k-calculator', icon: '🏦', desc: '401k Calculator' },
  { name: 'Social Security Breakeven', href: '/calculators/finance/social-security-breakeven-calculator', icon: '🏛️', desc: 'Social Security Breakeven' },
  { name: 'Retirement Calculator', href: '/calculators/finance/retirement-calculator', icon: '🎯', desc: 'Retirement Calculator' },
  { name: 'Medicare Premium Calculator', href: '/calculators/finance/medicare-premium-calculator', icon: '💊', desc: 'Medicare Premium Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
