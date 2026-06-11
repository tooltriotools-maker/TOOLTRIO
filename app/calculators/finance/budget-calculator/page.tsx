import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
  )
})

export const metadata: Metadata = generateCalculatorMetadata({
 title: 'Monthly Budget Calculator USA 2026 | ToolTrio',
 description: 'Free budget calculator USA 2026. Create a complete monthly budget, track income vs expenses, and see your savings rate instantly. Follows the 50/30/20.',
 slug: 'budget-calculator',
 category: 'finance',
 keywords: [
    'budget calculator 2026',
    'budget calculator',
    'free budget calculator',
    'budget calculator online',
    'best budget calculator 2026',
    'budget calculator no signup',
    'accurate budget calculator',
    'how to calculate budget',
    'tooltrio.com',
  ],
})

const faqs = [
  { question: 'What is the 50/30/20 rule and does it actually work in 2026?', answer: 'The 50/30/20 framework allocates 50% of after-tax income to needs (housing, utilities, groceries, minimum debt payments, transportation, insurance), 30% to wants (dining out, subscriptions, entertainment, clothing), and 20% to savings and debt payoff. In 2026 major metro areas, housing costs alone often consume 35-40% of take-home pay, forcing many people into a modified 60/20/20 or 70/10/20 reality. The framework is more useful as a diagnostic tool than a prescription: compare your actual percentages against the 50/30/20 ideal to identify where your spending deviates from what you\'d choose if you were being intentional.' },
  { question: 'What monthly expenses do most people consistently underestimate in their budget?', answer: 'Four categories chronically underestimated: (1) Food — people track groceries but forget lunch purchases, coffee, alcohol, and spontaneous food runs. The real number is typically 30-50% higher than the grocery estimate. (2) Annual expenses divided by 12 — car registration, insurance deductibles, holiday gifts, annual subscriptions, and home maintenance are real but invisible until they hit. Budget $200-500/month for these depending on your life stage. (3) Subscriptions — the average American household has 12+ subscriptions, most autopaying. (4) Vehicle costs — the monthly car payment is visible; fuel, insurance, maintenance, and eventual replacement add 50-100% more to true vehicle cost.' },
  { question: 'How much should rent or mortgage be as a percentage of income?', answer: 'Traditional financial guidance is 28-30% of gross income for housing (PITI for owners, rent plus renters insurance for renters). But gross income is a misleading denominator — after taxes and retirement contributions, net take-home may be 30% lower. A better rule: housing should be under 35-40% of take-home pay, leaving enough for other expenses without stress. In 2026, the national median rent represents nearly 40% of median household income in most metro areas, which is why housing affordability has become a structural problem rather than a personal finance problem that budgeting can solve.' },
  { question: 'What is zero-based budgeting and is it worth the effort?', answer: 'Zero-based budgeting assigns every dollar of income to a specific category so that income minus all category allocations equals zero. You\'re not \'spending\' the whole paycheck — the zero means every dollar has a purpose: some go to expenses, some to savings, some to investments. The value is intentionality: you actively decide where each dollar goes rather than spending and then seeing what\'s left. The cost is time — maintaining a zero-based budget requires 1-2 hours per week of tracking. Apps like YNAB (You Need A Budget) automate much of this. Research suggests zero-based budgeters save significantly more than people using other tracking methods.' },
  { question: 'How do I create a budget that I will actually follow for more than 30 days?', answer: 'Three evidence-based principles: (1) Start with actual spending data, not aspirational targets. Pull 3 months of bank and credit card statements and categorize everything before setting any targets. Budgets built on fantasy assumptions fail immediately. (2) Build in a flexible \'personal spending\' allocation — a weekly cash or debit amount you can spend on anything without tracking individual items. Rigid category budgets create psychological resistance. (3) Automate savings and bills first — transfer savings the same day as your paycheck arrives, before discretionary spending has a chance to absorb it. A budget that requires constant manual decision-making will always lose to the path of least resistance.' },
  { question: 'What budget percentage should go toward paying off debt vs investing?', answer: 'It depends on debt interest rate: (1) High-interest debt (credit cards, 15%+ APR) — pay aggressively, prioritize over investing beyond employer match. (2) Medium debt (personal loans, student loans 7-10%) — split between extra debt payoff and investing; the guaranteed debt return competes with uncertain investment returns. (3) Low debt (mortgage under 4%, subsidized student loans under 5%) — prioritize investing in tax-advantaged accounts; the after-tax investment return likely exceeds the debt cost. Always capture 100% of employer 401k match before paying extra debt — that match is a guaranteed 50-100% return that beats any debt payoff.' }
]

const relatedCalculators = [
 { name: 'Compound Interest', href: '/calculators/finance/compound-interest-calculator', icon: '💰', desc: 'Power of compounding' },
 { name: 'Retirement Calculator', href: '/calculators/finance/retirement-calculator', icon: '🌅', desc: 'Retirement planning' },
 { name: 'FIRE Calculator', href: '/calculators/finance/fire-calculator', icon: '🔥', desc: 'Financial independence' },
 { name: 'Net Worth Calculator', href: '/calculators/finance/net-worth-calculator', icon: '💎', desc: 'Track net worth' },
 { name: 'Savings Goal Calculator', href: '/calculators/finance/savings-goal-calculator', icon: '🎯', desc: 'Goal-based savings' },
 { name: 'ROI Calculator', href: '/calculators/finance/roi-calculator', icon: '📐', desc: 'Return on investment' },
]

const structuredData = [generateFAQStructuredData(faqs)]

export default function Page() {
 return <>
      {structuredData.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug="net-worth-guide-how-to-calculate-and-grow-your-wealth" />
    </>
}
