import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateCalculatorRatingSchema } from '@/lib/seo/metadata'
import SavingsRateCalculatorClient from './SavingsRateCalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
 title: 'Savings Rate Calculator USA 2026 – How Much of Your Income Are You Actually Saving?',
 description: 'Free savings rate calculator USA 2026. Calculate your personal savings rate, time to financial independence, and how each 1% increase in savings rate accelerates your FIRE date. Real examples for $40k-$150k income levels.',
 slug: 'savings-rate-calculator',
 category: 'finance',
 region: 'usa',
 keywords: [
 'savings rate calculator 2026',
 
 'savings rate calculator', 'personal savings rate calculator', 'how much should I save calculator',
 'savings rate FIRE calculator', 'financial independence savings rate',
 'years to retire by savings rate', 'savings percentage calculator',
 'how to calculate savings rate', 'optimal savings rate calculator',
 'savings rate and retirement calculator', '50 30 20 savings calculator',
 ],
})

const faqs = [
 { question: 'What savings rate do I need to retire early?', answer: 'Years to financial independence by savings rate (assuming 7% investment return, spending 25x annual expenses): 10% savings -> 43 years. 20% -> 34 years. 30% -> 28 years. 40% -> 22 years. 50% -> 17 years. 65% -> 11 years. 75% -> 7 years. The math works because a higher savings rate simultaneously builds wealth faster AND means you need less to retire (lower expenses).' },
 { question: 'How do you calculate savings rate?', answer: 'Savings Rate = (Total Monthly Savings / Total Monthly Income) x 100. Total savings includes: 401k contributions, IRA contributions, employer match (some people include this), emergency fund contributions, and any other invested savings. Use take-home (after-tax) income for the denominator. Example: $5,000 take-home, $500 to 401k, $200 to savings account = ($700 / $5,000) x 100 = 14% savings rate.' },
 { question: 'Is a 20% savings rate good?', answer: 'Yes -- 20% is the standard target from the 50/30/20 budgeting rule and aligns with most financial planning guidelines. Fidelity recommends saving 15% of pre-tax income for retirement (which is roughly 18-20% of take-home for most people). At 20%, you reach traditional retirement age (65) with a comfortable nest egg. To retire before 65, aim for 30%+.' },
]

const relatedCalculators = [
 { name: 'Budget Planner', href: '/calculators/finance/budget-planner-calculator', icon: '📊', desc: '50/30/20 budget plan' },
 { name: 'FIRE Calculator', href: '/calculators/finance/fire-calculator', icon: '🔥', desc: 'Financial independence number' },
 { name: 'Compound Interest', href: '/calculators/finance/compound-interest-calculator', icon: '💰', desc: 'Savings growth over time' },
 { name: 'Emergency Fund', href: '/calculators/finance/emergency-fund-calculator', icon: '🛡️', desc: 'Emergency fund target' },
]

const structuredData = [
 generateFAQStructuredData(faqs),
 generateCalculatorRatingSchema({ name: 'Free Savings Rate Calculator -- Years to FIRE', description: 'Calculate your savings rate and see how many years until financial independence.', url: 'https://tooltrio.com/calculators/finance/savings-rate-calculator' }),
]

export default function SavingsRatePage() {
 return <SavingsRateCalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators}
 blogSlug="how-much-to-save-for-retirement-by-age-usa" />
}
