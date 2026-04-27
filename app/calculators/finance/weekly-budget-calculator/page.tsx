import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateCalculatorRatingSchema } from '@/lib/seo/metadata'
import WeeklyBudgetCalculatorClient from './WeeklyBudgetCalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
 title: 'Weekly Budget Calculator USA 2026 – Plan Your Weekly Spending and Savings',
 description: 'Free weekly budget calculator USA 2026. Plan your weekly budget, track spending categories, and calculate weekly savings rate. Ideal for hourly and weekly-paid workers. Real examples for $500-$2,000 weekly income.',
 slug: 'weekly-budget-calculator',
 category: 'finance',
 region: 'usa',
 keywords: [
 'weekly budget calculator 2026',
 
 'weekly budget calculator', 'weekly spending calculator', 'budget tracker weekly',
 'weekly expense tracker', 'weekly budget planner', 'how much should I spend per week',
 'weekly grocery budget calculator', 'weekly money tracker', 'free weekly budget',
 'weekly savings calculator', 'weekly income budget', 'personal finance weekly budget',
 ],
})

const faqs = [
 { question: 'How much should I spend per week?', answer: 'A general guideline based on the 50/30/20 rule: on a $60,000 salary ($1,154/week after taxes): Needs (50%) = $577/week, Wants (30%) = $346/week, Savings (20%) = $231/week. Your specific weekly budget depends on fixed costs (rent, car payment) which are monthly. Convert these to weekly by multiplying monthly amounts by 12 and dividing by 52.' },
 { question: 'What is a good weekly grocery budget?', answer: 'USDA 2026 food cost guidelines by plan type: Thrifty: $52/week (individual adult), Moderate: $75/week, Liberal: $93/week. For a family of 4: Thrifty: $180/week, Moderate: $257/week. Factors that affect your grocery budget: store choice (Aldi vs Whole Foods = 30-50% difference), meal planning (reduces waste by 20-30%), and how often you buy prepared/convenience foods.' },
 { question: 'Why budget weekly instead of monthly?', answer: 'Weekly budgeting works better for many people because: (1) It\'s easier to track spending in a shorter timeframe, (2) Weekly check-ins catch overspending before it compounds, (3) Variable expenses like groceries and gas feel more natural to track weekly, (4) Payday cycles are often weekly or biweekly. Convert your monthly budget by multiplying by 12 and dividing by 52, or use both (monthly for bills, weekly for discretionary spending).' },
]

const relatedCalculators = [
 { name: 'Budget Planner', href: '/calculators/finance/budget-planner-calculator', icon: '📊', desc: '50/30/20 monthly budget' },
 { name: 'Savings Rate', href: '/calculators/finance/savings-rate-calculator', icon: '💰', desc: 'Savings rate & FIRE' },
 { name: 'Grocery Budget', href: '/calculators/finance/budget-calculator', icon: '🛒', desc: 'Full budget calculator' },
 { name: 'Emergency Fund', href: '/calculators/finance/emergency-fund-calculator', icon: '🛡️', desc: 'Emergency fund target' },
]

const structuredData = [
 generateFAQStructuredData(faqs),
 generateCalculatorRatingSchema({ name: 'Free Weekly Budget Calculator -- Track 8 Spending Categories', description: 'Track weekly spending by category and calculate your weekly savings rate.', url: 'https://tooltrio.com/calculators/finance/weekly-budget-calculator' }),
]

export default function WeeklyBudgetPage() {
 return <WeeklyBudgetCalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators}
 blogSlug="budget-50-30-20-rule-usa-real-examples-2026" />
}
