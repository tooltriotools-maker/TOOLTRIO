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
  title: 'Social Security Breakeven Calculator USA 2026 | ToolTrio',
  description: 'Find the exact age to claim Social Security for maximum lifetime benefit. Compare claiming at 62, 67, or 70.',
  slug: 'social-security-breakeven-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['social security breakeven calculator', 'when to claim social security 2026', 'social security age 62 vs 70 calculator', 'social security benefits calculator USA', 'SS FRA breakeven age'],
})

const faqs = [
  {
    question: 'What is the Social Security breakeven age?',
    answer: 'The breakeven age is when cumulative lifetime benefits from claiming later equal the total you would have collected by claiming earlier. Claiming at 62 vs 67 (FRA): breakeven is approximately age 78–79. Claiming at 70 vs 67: breakeven is approximately age 82–83. If you expect to live past 83, waiting until 70 maximizes lifetime benefits.',
  },
  {
    question: 'How much is Social Security reduced at 62?',
    answer: 'Claiming at 62 permanently reduces your benefit by up to 30% vs FRA (age 67 for those born 1960+). The reduction is 5/9 of 1% per month for the first 36 months early, plus 5/12 of 1% for additional months. On a $2,200/month FRA benefit, claiming at 62 gives approximately $1,540/month — a $660/month permanent reduction.',
  },
  {
    question: 'Does Social Security increase after FRA?',
    answer: 'Yes — every month you delay past FRA earns an 8% annual Delayed Retirement Credit, up to age 70. On a $2,200 FRA benefit, waiting until 70 provides $2,728/month — a 24% permanent increase that also applies to survivor benefits your spouse receives.',
  }
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
