import { CalculatorBatch40DeepDive } from '@/components/ui/CalculatorBatch40DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Real Wage Growth Calculator USA 2026 — Salary vs Inflation | ToolTrio',
  description: 'Calculate whether your salary raises have kept pace with inflation. See your real vs nominal salary growth and purchasing power gain or loss over your career.',
  slug: 'real-wage-growth-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['real wage growth calculator USA 2026', 'salary vs inflation calculator', 'purchasing power salary calculator', 'real vs nominal salary growth', 'inflation adjusted wage calculator USA'],
})
const faqs = [
  {
    question: 'What is real wage growth?',
    answer: "Real wage growth = nominal salary increase minus inflation. If your salary went from $52,000 to $85,000 over 8 years (63.5% nominal growth) but inflation averaged 3.5% (32.8% cumulative), your real salary only grew about 23%. In dollar terms, you'd need $69,000 today just to have the same purchasing power as $52,000 eight years ago — so your real raise is only $16,000, not $33,000.",
  },
  {
    question: 'Have US wages kept up with inflation historically?',
    answer: 'BLS data shows US wages have largely kept pace with inflation over long periods, but with significant variation. Real wage gains were positive in 2018-2019, turned negative in 2021-2022 (highest inflation in 40 years with wages lagging), then recovered in 2023-2024. High earners have seen stronger real wage growth than median workers over the past 30 years. Wage growth varies dramatically by industry, education, and geography.',
  },
  {
    question: 'How much should I ask for in a salary negotiation?',
    answer: 'Rule of thumb: inflation rate (3-4%) plus productivity/merit premium (1-3%) = 4-7% annual raise target. Simply matching inflation keeps purchasing power flat. Any raise below inflation is effectively a pay cut. Research your market rate on Levels.fyi, LinkedIn Salary, Glassdoor, and industry surveys — then negotiate for market rate, not just an inflation adjustment.',
  }
]
const relatedCalculators = [
  { name: 'Salary Negotiation Calculator', href: '/calculators/finance/salary-negotiation-calculator', icon: '🤝', desc: 'Salary Negotiation Calculator' },
  { name: 'Inflation Impact Calculator', href: '/calculators/finance/inflation-impact-calculator', icon: '📉', desc: 'Inflation Impact Calculator' },
  { name: 'Net Salary Calculator', href: '/calculators/finance/net-salary-calculator', icon: '💰', desc: 'Net Salary Calculator' },
  { name: 'Annual Income Calculator', href: '/calculators/finance/annual-income-calculator', icon: '📊', desc: 'Annual Income Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
        <CalculatorBatch40DeepDive slug="real-wage-growth-calculator" />
</>
}
