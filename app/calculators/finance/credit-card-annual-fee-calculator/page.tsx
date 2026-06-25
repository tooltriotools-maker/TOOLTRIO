import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Credit Card Annual Fee Calculator USA 2026 — Is It Worth It? | ToolTrio',
  description: "Calculate whether a premium credit card's annual fee is worth it based on rewards earned, spending level, and comparison to no-fee alternatives.",
  slug: 'credit-card-annual-fee-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['credit card annual fee calculator', 'is credit card annual fee worth it', 'premium credit card ROI calculator USA', 'rewards vs annual fee calculator', 'Chase Sapphire Amex annual fee calculator'],
})
const faqs = [
  {
    question: 'How do I calculate if a credit card annual fee is worth it?',
    answer: 'Net value = (Annual spend × fee card rate × redemption value) - annual fee - (Annual spend × no-fee card rate). If positive, the fee card wins. Break-even monthly spend = Annual fee / ((fee rate - no-fee rate) × 12 × redemption value). For a $695 card with 3% rewards vs 1.5% no-fee: break-even = $695 / (0.015 × 12 × 1.5¢) = $2,573/month. If you spend more, the fee card wins.',
  },
  {
    question: 'What premium credit cards are worth the annual fee in 2026?',
    answer: "High-value premium cards: Chase Sapphire Reserve ($550 fee, but $300 travel credit + lounge access effectively reduces to $250 net). Amex Platinum ($695 fee, $200 hotel credit + $200 airline credit + $189 Clear + Centurion lounge = substantial offsets). Capital One Venture X ($395 fee, $300 travel credit = $95 effective fee). The key: actually using all the perks, not just the points. Many people overpay for benefits they don't use.",
  },
  {
    question: 'What redemption value should I use for travel points?',
    answer: 'Point valuations vary significantly: airline miles in economy: 1-1.2 cents. Hotel points: 0.5-0.8 cents. Chase Ultimate Rewards (through portal): 1.5 cents. Chase transferred to partners: 1.5-2.5 cents. Amex Membership Rewards: 1.0-2.0 cents depending on transfer. The highest value always comes from transferring to airline/hotel partners and booking premium cabin international flights (business/first class can yield 5-15+ cents per point).',
  }
]
const relatedCalculators = [
  { name: 'Cost of Debt Calculator', href: '/calculators/finance/cost-of-debt-calculator', icon: '💳', desc: 'Cost of Debt Calculator' },
  { name: 'Budget Planner Calculator', href: '/calculators/finance/budget-planner-calculator', icon: '📊', desc: 'Budget Planner Calculator' },
  { name: 'Net Salary Calculator', href: '/calculators/finance/net-salary-calculator', icon: '💰', desc: 'Net Salary Calculator' },
  { name: 'Paycheck Calculator', href: '/calculators/finance/paycheck-calculator', icon: '💵', desc: 'Paycheck Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
