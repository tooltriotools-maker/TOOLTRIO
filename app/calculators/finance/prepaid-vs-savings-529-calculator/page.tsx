import { CalculatorBatch30DeepDive } from '@/components/ui/CalculatorBatch30DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" /> })
export const metadata: Metadata = generateCalculatorMetadata({ title: '529 Prepaid vs Savings Plan Calculator USA 2026 | ToolTrio', description: "Compare 529 prepaid tuition plan vs 529 savings plan. Calculate future tuition costs, projected savings, and which option covers more of your child's college expenses.", slug: 'prepaid-vs-savings-529-calculator', category: 'finance', keywords: ['529 prepaid vs savings calculator', 'prepaid tuition plan calculator USA', 'college savings 529 plan comparison', '529 plan calculator 2026'] })
const faqs = [
  { question: 'Should I choose a 529 prepaid or savings plan?', answer: "Prepaid plans lock in today's tuition prices — if tuition inflation outpaces investment returns, prepaid wins. Savings plans offer more flexibility (can be used for room/board, K-12 tuition, student loans) and potentially higher returns but carry market risk. Prepaid plans are only available for in-state public tuition — if your child attends private or out-of-state schools, you get a partial credit only." },
  { question: 'What are the 2026 529 contribution limits?', answer: '529 plans have no annual contribution limit, but contributions are considered gifts. You can contribute up to $19,000 per year (2026 annual gift exclusion) without gift tax implications. The superfunding provision allows up to 5 years of gifts at once ($95,000 per donor in 2026), a popular estate planning tool. Account balances over $570,000 (limit varies by state) typically cannot receive additional contributions.' },
]
const relatedCalculators = [{ name: 'College Cost Calculator', href: '/calculators/finance/college-cost-calculator', icon: '🎓', desc: 'Future college costs' }, { name: '529 vs Roth IRA', href: '/calculators/finance/529-vs-roth-ira-education-calculator', icon: '📚', desc: '529 vs Roth' }, { name: '529 vs UTMA', href: '/calculators/finance/529-vs-utma-calculator', icon: '👶', desc: '529 vs UTMA' }]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() { return <>{structuredData.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}<CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />      <CalculatorBatch30DeepDive slug="prepaid-vs-savings-529-calculator" />
</> }
