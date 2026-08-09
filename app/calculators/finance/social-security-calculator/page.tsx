import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  
  loading: () => (
    <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
  )
})

export const metadata: Metadata = generateCalculatorMetadata({
 title: 'Social Security Calculator USA 2026 | ToolTrio',
 description: 'Free Social Security calculator USA 2026. Estimate your monthly Social Security benefit based on earnings history, claiming age (62–70), and break-even.',
 slug: 'social-security-calculator',
 category: 'finance',
 region: 'usa',
 keywords: [
    'social security calculator 2026',
    'social security calculator',
    'free social security calculator',
    'social security calculator online',
    'best social security calculator 2026',
    'social security calculator no signup',
    'accurate social security calculator',
    'how to calculate social security',
    'tooltrio.com',
  ],
})

const faqs = [
  { question: 'At what age should I start claiming Social Security benefits?', answer: 'The optimal claiming age depends on your life expectancy and financial situation. Claiming at 62 gives 70% of your full retirement age (FRA) benefit — permanently. Claiming at your FRA (67 for those born 1960+) gives 100%. Claiming at 70 gives 124%. Each year of delay after FRA adds 8%. The break-even age for delaying from 62 to 67: approximately 78-79. For delaying 67 to 70: approximately 82-83. Given that a 65-year-old has average life expectancy of 83-86, delaying to 70 is statistically favorable for most healthy individuals. For married couples, the higher earner should almost always delay to 70 to maximize the potential survivor benefit.' },
  { question: 'How is my Social Security benefit calculated?', answer: 'Your benefit is based on your 35 highest-earning years, indexed for wage inflation. The formula applies a progressive benefit calculation to your Average Indexed Monthly Earnings (AIME): 90% of the first $1,174/month, 32% of the next $5,904/month, and 15% of earnings above that (2026 bend points). This replaces a higher percentage of lower earners\' pre-retirement income and a lower percentage of higher earners\'. Check your projected benefit at SSA.gov — your annual Social Security statement shows estimated benefits at 62, 67, and 70.' },
  { question: 'Can my spouse claim Social Security benefits on my record?', answer: 'Yes. A spouse who earned less (or nothing) can claim up to 50% of their partner\'s full retirement age benefit, if that spousal benefit exceeds their own earned benefit. Spousal benefit is maximized by claiming at FRA — no additional benefit from delaying past FRA for spousal claims. Divorced spouses married at least 10 years also qualify for spousal benefits without affecting the ex-spouse\'s benefit. Survivor benefits (after spouse\'s death) equal 100% of the deceased spouse\'s benefit, which is why the higher earner delaying to 70 is so valuable — it maximizes the survivor\'s income for potentially decades.' },
  { question: 'How much of Social Security is taxable?', answer: 'For individuals with combined income (adjusted gross income + nontaxable interest + half of Social Security) below $25,000, Social Security is not taxable. Between $25,000-$34,000 (single), up to 50% is taxable. Above $34,000, up to 85% is taxable. For married filing jointly, the thresholds are $32,000 and $44,000. Thirteen states also tax Social Security benefits. Strategic implication: in the years between retirement and Social Security claiming, doing Roth conversions at low tax rates can reduce traditional IRA balances that would otherwise cause higher Social Security taxability when combined with future required minimum distributions.' },
  { question: 'What happens to Social Security if I work while collecting benefits before FRA?', answer: 'If you collect Social Security before your full retirement age while still working, there is an earnings test: in 2026, you lose $1 in benefits for every $2 earned above approximately $22,320. The withheld benefits are not permanently lost — they increase your monthly benefit once you reach FRA. In the year you reach FRA, the test is $1 for every $3 earned above approximately $59,520. After FRA, there is no earnings test — you can earn any amount and collect full benefits. Working while collecting before FRA also continues adding to your earnings record, which can increase your future benefit if those are among your 35 highest-earning years.' }
]

const relatedCalculators = [
 { name: '401k Calculator', href: '/calculators/finance/401k-calculator', icon: '🏦', desc: '401k retirement balance' },
 { name: 'Roth IRA Calculator', href: '/calculators/finance/roth-ira-calculator', icon: '🛡️', desc: 'Roth IRA growth' },
 { name: '401k vs Roth IRA', href: '/calculators/finance/401k-vs-roth-ira-calculator', icon: '🇺🇸', desc: 'Compare retirement accounts' },
 { name: 'S&P 500 vs Bonds', href: '/calculators/finance/sp500-vs-bonds-calculator', icon: '📊', desc: 'Stocks vs bonds' },
 { name: 'FIRE Calculator', href: '/calculators/finance/fire-calculator', icon: '🔥', desc: 'Financial independence' },
 { name: 'Paycheck Calculator', href: '/calculators/finance/paycheck-calculator', icon: '💵', desc: 'Take-home pay' },
]

const structuredData = [generateFAQStructuredData(faqs)]

export default function Page() {
 return <>
      {structuredData.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} blogSlug="retirement-planning-guide-how-much-do-you-need-to-retire" />
    </>
}
