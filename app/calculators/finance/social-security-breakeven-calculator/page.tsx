import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  
  loading: () => (
    <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
  )
})

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Social Security Breakeven Calculator USA 2026 | ToolTrio',
  description: 'Find the exact age to claim Social Security for maximum lifetime benefit. Compare claiming at 62, 67, or 70.',
  slug: 'social-security-breakeven-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['social security breakeven calculator', 'when to claim social security 2026', 'social security age 62 vs 70 calculator', 'social security benefits calculator USA', 'SS FRA breakeven age'],
})

const faqs = [
  { question: "Does this calculator get my benefit from SSA?", answer: "No. Enter the benefit from your Social Security statement. The calculator only adjusts the number you provide for claiming age." },
  { question: "How does claiming before 67 affect the model?", answer: "It applies the SSA-style monthly early-retirement reduction: 5/9 of 1% for each of the first 36 months early and 5/12 of 1% for additional months." },
  { question: "How does delaying after 67 affect the model?", answer: "It models delayed retirement credits at 8% per year through age 70. Claiming later than 70 does not earn additional delayed retirement credits under Social Security rules." },
  { question: "Is the displayed break-even age exact?", answer: "No. The current function uses a heuristic break-even formula rather than solving the cumulative crossover between two selected claiming ages." },
  { question: "What important factors are excluded?", answer: "COLAs, taxes, earnings-test effects, survivor and spouse benefits, Medicare interactions and individual longevity are not fully modeled." },
]

const relatedCalculators = [
  { name: 'Retirement Calculator', href: '/calculators/finance/retirement-calculator', icon: '🏦', desc: 'Retirement Calculator' },
  { name: 'Medicare Premium Calculator', href: '/calculators/finance/medicare-premium-calculator', icon: '🏥', desc: 'Medicare Premium Calculator' },
  { name: 'Social Security vs Pension', href: '/calculators/finance/social-security-vs-private-pension-calculator', icon: '📊', desc: 'Social Security vs Pension' },
  { name: 'FIRE Calculator', href: '/calculators/finance/fire-calculator', icon: '🔥', desc: 'FIRE Calculator' }
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
