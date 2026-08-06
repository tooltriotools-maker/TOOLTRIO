import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Social Security COLA Impact Calculator USA 2026 | ToolTrio',
  description: 'Calculate how Social Security Cost of Living Adjustments compound your benefits over 20-30 years of retirement and the true lifetime value of COLA protection.',
  slug: 'social-security-cola-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['social security COLA calculator', 'SS cost of living adjustment calculator USA', 'social security inflation adjustment lifetime value', 'COLA benefit calculator 2026', 'social security lifetime benefit with COLA'],
})
const faqs = [
  { question: 'What is the Social Security COLA for benefits paid in 2026?', answer: 'SSA announced a 2.8% COLA for 2026, first reflected in Social Security benefits payable in January 2026.' },
  { question: 'Does this calculator predict future COLAs?', answer: 'No. It repeats the rate you enter for every projection year. Actual COLAs are determined annually from CPI-W data and can be higher, lower or zero.' },
  { question: 'How is the projected monthly benefit calculated?', answer: 'For each year, the starting monthly benefit is multiplied by (1 + entered COLA rate) raised to the number of years elapsed.' },
  { question: 'Does COLA guarantee that every retiree keeps the same purchasing power?', answer: 'No. COLA follows a statutory CPI-W formula. A household’s own spending pattern can differ from that index, and Medicare premiums or taxes can affect net income.' },
  { question: 'Are Medicare premiums subtracted in this projection?', answer: 'No. The displayed cumulative benefit is a gross-benefit projection and does not subtract Medicare premiums or income taxes.' }
]
const relatedCalculators = [
  { name: 'Social Security Timing Optimizer', href: '/calculators/finance/social-security-timing-optimizer', icon: '🏛️', desc: 'Social Security Timing Optimizer' },
  { name: 'Social Security Breakeven', href: '/calculators/finance/social-security-breakeven-calculator', icon: '🏛️', desc: 'Social Security Breakeven' },
  { name: 'Inflation Impact Calculator', href: '/calculators/finance/inflation-impact-calculator', icon: '📉', desc: 'Inflation Impact Calculator' },
  { name: 'Retirement Withdrawal Calculator', href: '/calculators/finance/retirement-withdrawal-calculator', icon: '💰', desc: 'Retirement Withdrawal Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
