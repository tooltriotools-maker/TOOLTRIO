import { CalculatorBatch52DeepDive } from '@/components/ui/CalculatorBatch52DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  
  loading: () => (
    <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
  )
})

export const metadata: Metadata = generateCalculatorMetadata({
 title: 'Net Worth Calculator USA 2026 | ToolTrio',
 description: 'Free net worth calculator USA 2026. Calculate your total net worth by adding all assets and subtracting all liabilities. See how you compare to US.',
 slug: 'net-worth-calculator',
 category: 'finance',
 region: 'usa',
 keywords: [
    'net worth calculator 2026',
    'net worth calculator',
    'free net worth calculator',
    'net worth calculator online',
    'best net worth calculator 2026',
    'net worth calculator ',
    'accurate net worth calculator',
    'how to calculate net worth',
    'tooltrio.com',
  ],
})

const relatedCalculators = [
 { name: 'Compound Interest', href: '/calculators/finance/compound-interest-calculator', icon: '💰', desc: 'Power of compounding' },
 { name: 'Retirement Calculator', href: '/calculators/finance/retirement-calculator', icon: '🌅', desc: 'Retirement planning' },
 { name: 'FIRE Calculator', href: '/calculators/finance/fire-calculator', icon: '🔥', desc: 'Financial independence' },
 { name: 'Savings Goal Calculator', href: '/calculators/finance/savings-goal-calculator', icon: '🎯', desc: 'Goal-based savings' },
 { name: 'ROI Calculator', href: '/calculators/finance/roi-calculator', icon: '📐', desc: 'Return on investment' },
 { name: 'Inflation Calculator', href: '/calculators/finance/inflation-calculator', icon: '📉', desc: 'Purchasing power' },
]

const faqs = [
  { question: 'What is a good net worth by age in the United States?', answer: 'Federal Reserve Survey of Consumer Finances (2022) median net worth by age: Under 35: $39,040; 35-44: $135,300; 45-54: $247,200; 55-64: $364,500; 65-74: $409,900; 75+: $335,600. Mean net worth is much higher in each bracket because wealthy households pull the average up. For a personal milestone framework: at 30, a net worth equal to your annual income is a solid start. At 40, two times annual income. At 50, four times. At 60, six times. These are targets, not minimums — higher is always better. The most useful metric isn\'t absolute net worth but your net worth trajectory: are you consistently adding?' },
  { question: 'What should and shouldn\'t be included in net worth calculations?', answer: 'Include: bank accounts, brokerage and retirement accounts at market value (traditional IRA and 401k at pre-tax value, or reduced by your expected effective withdrawal tax rate for a conservative view), home equity (current market value minus mortgage balance), vehicle equity (current value minus loan balance), business ownership value, and other significant assets at realistic market value. Exclude: depreciating personal property (furniture, electronics, clothing) unless collectibles with real market value, expected Social Security (not a personal asset), and speculative assets without current market value. The goal is a realistic balance sheet, not one inflated by possessions that can\'t be liquidated.' },
  { question: 'How often should I calculate my net worth?', answer: 'Quarterly tracking is the right frequency for most people — frequent enough to see meaningful trends, not so frequent that you\'re reacting to noise. Annual calculation works for people who don\'t want to check quarterly but still want a directional picture. Weekly or daily checking is counterproductive because short-term fluctuations in investment values don\'t represent real wealth changes and can cause anxiety without actionable insight. Set a calendar reminder for the same date each quarter, spend 20 minutes updating your accounts, and track the trend in a simple spreadsheet. The trend over 2-3 years is the meaningful signal; any single month\'s number is mostly noise.' },
  { question: 'How does home equity count in net worth for financial independence planning?', answer: 'Home equity counts as net worth on a balance sheet, but for financial independence planning it has a critical limitation: you can\'t spend it without either selling your home or taking a reverse mortgage/HELOC. For FIRE and retirement planning, financial planners often distinguish between liquid net worth (investable assets in accessible accounts) and illiquid net worth (home equity, business equity). Your FIRE number should be achievable with liquid assets alone — home equity is a backup or legacy asset, not a primary retirement funding source. Downsizing in retirement can convert home equity to investable assets, but that requires a plan and willingness to move.' },
  { question: 'What is the fastest way to increase my net worth?', answer: 'The three levers by impact: (1) Income growth — the ceiling on savings is your income minus fixed costs. A $20,000 salary increase adds $12,000-$15,000 to annual savings capacity and is the highest single-year lever available to most people. (2) Expense reduction — every dollar of reduced spending both adds to net worth directly and reduces your FIRE target. (3) Investment returns optimization — maximizing tax-advantaged accounts (employer match capture, maxing HSA and IRA), minimizing fees (index funds over active management), and maintaining equity exposure appropriate to your time horizon. Debt elimination of high-interest liabilities improves net worth dollar-for-dollar with a stated return under the applicable terms equal to the interest rate.' }
]

export default function Page() {
  const _faqSchema = generateFAQStructuredData(faqs)
 return <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_faqSchema) }} />
       <CalculatorClient
 faqs={faqs}
 structuredData={[generateFAQStructuredData(faqs)]}
 relatedCalculators={relatedCalculators}
 blogSlug='net-worth-guide-how-to-calculate-and-grow-your-wealth'
 />
          <CalculatorBatch52DeepDive slug="net-worth-calculator" />
</>
}
