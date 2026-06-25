import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Social Security Benefits Tax Calculator USA 2026 | ToolTrio',
  description: 'Calculate how much of your Social Security is taxable based on combined income. Find the income thresholds and strategies to reduce SS taxation.',
  slug: 'social-security-tax-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['social security tax calculator', 'is social security taxable 2026', 'social security provisional income calculator', 'how much SS is taxable USA', 'social security combined income calculator'],
})
const faqs = [
  {
    question: 'When is Social Security taxable?',
    answer: "Up to 85% of SS benefits are taxable for higher earners. Thresholds based on 'combined income' (AGI + non-taxable interest + 50% of SS): Below $25,000 (single) / $32,000 (married): 0% taxable. $25,000-$34,000 (single) / $32,000-$44,000 (married): up to 50% taxable. Above $34,000 (single) / $44,000 (married): up to 85% taxable. These thresholds have never been inflation-adjusted since 1983/1993, meaning more retirees hit them each year.",
  },
  {
    question: 'How can I reduce Social Security taxation?',
    answer: "Key strategies: (1) Roth IRA withdrawals don't count as income for SS taxation — convert pre-retirement to reduce future combined income. (2) Qualified charitable distributions (QCDs) after 70½ don't count as income. (3) Manage capital gains and IRA withdrawal timing to stay below thresholds. (4) Health Savings Account (HSA) withdrawals for medical expenses are tax-free and don't count. (5) Municipal bond interest is tax-exempt but DOES count toward combined income — a common trap.",
  },
  {
    question: 'Is Social Security taxed at the state level?',
    answer: "37 states don't tax Social Security at all (as of 2026). States that do tax SS income: Minnesota, Utah, Connecticut, Colorado, Kansas, Missouri, Montana, Nebraska, New Mexico, Rhode Island, Vermont, West Virginia — though most offer partial exemptions or phaseouts. Moving from a high-tax SS state (MN at 9.85% top rate) to no-SS-tax state (FL, TX, WA) can save thousands annually in retirement.",
  }
]
const relatedCalculators = [
  { name: 'Social Security Breakeven', href: '/calculators/finance/social-security-breakeven-calculator', icon: '🏛️', desc: 'Social Security Breakeven' },
  { name: 'Social Security Spousal', href: '/calculators/finance/social-security-spousal-calculator', icon: '👫', desc: 'Social Security Spousal' },
  { name: 'Roth Conversion Ladder', href: '/calculators/finance/roth-conversion-ladder-calculator', icon: '🪜', desc: 'Roth Conversion Ladder' },
  { name: 'Medicare Premium Calculator', href: '/calculators/finance/medicare-premium-calculator', icon: '💊', desc: 'Medicare Premium Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
