import { CalculatorBatch9DeepDive } from '@/components/ui/CalculatorBatch9DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({ title: 'Defined Benefit Pension Calculator USA 2026 | ToolTrio', description: 'Calculate your defined benefit pension monthly income, replacement rate, and lifetime benefit value. Compare early vs normal retirement options.', slug: 'defined-benefit-pension-calculator', category: 'finance', region: 'usa', keywords: ['defined benefit pension calculator USA', 'pension benefit formula calculator', 'db pension monthly income calculator', 'pension early retirement reduction'] })
const faqs = [
  { question: 'What formula does this pension calculator use?', answer: 'Annual pension equals years of service multiplied by the entered benefit multiplier and final average salary. That is a common plan design, but your plan document controls.' },
  { question: 'How is early retirement reduced?', answer: 'ToolTrio assumes a 5% reduction for each year before the entered normal retirement age. Your plan may use a different reduction schedule or subsidized early-retirement factors.' },
  { question: 'What does lifetime value mean here?', answer: 'It is simply the full annual benefit multiplied by years from the entered normal retirement age to age 85. It ignores mortality probabilities, COLAs, discount rates and survivor benefits.' },
  { question: 'Is the lump-sum equivalent an actuarial present value?', answer: 'No. The calculator labels 75% of its simple lifetime total as a lump-sum equivalent. A real plan lump sum uses plan terms and applicable actuarial assumptions.' },
  { question: 'What should I verify before choosing a pension option?', answer: "Check the plan's final-average-pay definition, credited service, vesting, early-retirement rules, COLA, survivor options, tax treatment and any actual lump-sum quote." }
]
const relatedCalculators = [{'name': 'Retirement Calculator', 'href': '/calculators/finance/retirement-calculator', 'icon': '🌅', 'desc': 'Retirement planning'}, {'name': '401k vs Pension', 'href': '/calculators/finance/401k-vs-pension-calculator', 'icon': '⚖️', 'desc': 'Pension vs 401k'}, {'name': 'Social Security Calculator', 'href': '/calculators/finance/social-security-calculator', 'icon': '🏛️', 'desc': 'SS benefits'}]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() { return <>{structuredData.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}<CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />      <CalculatorBatch9DeepDive slug="defined-benefit-pension-calculator" />
</> }
