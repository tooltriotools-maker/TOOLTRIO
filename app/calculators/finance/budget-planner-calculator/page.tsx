import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateCalculatorRatingSchema } from '@/lib/seo/metadata'
import BudgetPlannerCalculatorClient from './BudgetPlannerCalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
 title: 'Budget Planner Calculator USA 2026 – Monthly Budget with 50/30/20 Rule',
 description: 'Free budget planner calculator USA 2026. Build a detailed monthly budget using the 50/30/20 rule. Track income, expenses, savings rate, and spending gaps. Real examples for $40k-$120k household income.',
 slug: 'budget-planner-calculator',
 category: 'finance',
 region: 'usa',
 keywords: [
 'budget planner calculator 2026',
 
 'budget planner calculator', 'monthly budget calculator', 'budget calculator',
 '50 30 20 rule calculator', 'personal budget calculator', 'household budget calculator',
 'budget planner free', 'monthly budget planner', 'budget worksheet calculator',
 'how to budget calculator', 'income expense calculator', 'budget tracker calculator',
 'free budget planner USA', 'budget planning tool', 'where does my money go calculator',
 ],
})

const faqs = [
 { question: 'What is the 50/30/20 budgeting rule?', answer: 'The 50/30/20 rule (popularized by Senator Elizabeth Warren in "All Your Worth") divides your after-tax income into three categories: 50% for needs (rent, groceries, utilities, insurance, minimum debt payments), 30% for wants (dining, entertainment, hobbies, subscriptions), and 20% for savings and debt payoff. On a $5,000/month take-home: $2,500 needs, $1,500 wants, $1,000 savings.' },
 { question: 'How do I create a monthly budget?', answer: 'Step 1: Calculate your after-tax monthly income. Step 2: List all monthly expenses and categorize them (needs vs wants vs savings). Step 3: Apply the 50/30/20 rule as a target. Step 4: Find categories where you\'re overspending. Step 5: Adjust until savings >= 20% of income. Our budget planner does all of this automatically -- enter your numbers and it shows you exactly where you stand.' },
 { question: 'What is a good savings rate?', answer: 'General guidelines: 20% is the 50/30/20 rule target. 15% is the minimum recommended by Fidelity for retirement. 25-30% gets you to retirement significantly earlier. 50%+ is the FIRE (Financial Independence) fast track. At a 50% savings rate, you reach financial independence in about 17 years; at 10%, it takes about 40 years. Even small increases matter enormously.' },
 { question: 'How much should I spend on housing?', answer: 'The traditional guideline: housing costs should not exceed 30% of gross income. The 50/30/20 rule targets housing + all other needs at 50% of take-home pay. If housing exceeds 30% of gross income (or 40% of take-home), it significantly limits your ability to save and build wealth. In high-cost cities (NYC, SF, LA), many people spend 35-45% on housing -- budget other categories accordingly.' },
]

const relatedCalculators = [
 { name: 'Savings Rate Calculator', href: '/calculators/finance/savings-rate-calculator', icon: '💰', desc: 'Years to FIRE by savings rate' },
 { name: 'Emergency Fund', href: '/calculators/finance/emergency-fund-calculator', icon: '🛡️', desc: 'Emergency fund target' },
 { name: 'Net Worth Calculator', href: '/calculators/finance/net-worth-calculator', icon: '⚖️', desc: 'Track your net worth' },
 { name: 'FIRE Calculator', href: '/calculators/finance/fire-calculator', icon: '🔥', desc: 'Financial independence' },
]

const structuredData = [
 generateFAQStructuredData(faqs),
 generateCalculatorRatingSchema({ name: 'Free Budget Planner Calculator -- 50/30/20 Rule', description: 'Plan your monthly budget with the 50/30/20 rule. See exactly where your money goes.', url: 'https://tooltrio.com/calculators/finance/budget-planner-calculator' }),
]

export default function BudgetPlannerPage() {
 return <BudgetPlannerCalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators}
 blogSlug="budget-50-30-20-rule-usa-real-examples-2026" />
}
