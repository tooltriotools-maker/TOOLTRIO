import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
 title: '401k Calculator USA 2026 – Employer Match, Growth & Retirement Value',
 description: 'Free 401k calculator USA 2026. Calculate how much your 401k will be worth at retirement with employer match, salary growth, and compound interest. Includes real examples for $50k–$100k salary.',
 slug: '401k-calculator',
 category: 'finance',
 keywords: [
 '401k calculator 2026',
 
 '401k calculator with employer match 2026 USA',
 'how much will my 401k be worth at retirement calculator',
 '401k calculator monthly contribution growth with chart',
 '401k contribution limit 2026 calculator USA',
 
 '401k calculator before and after tax USA',

 '401k calculator USA',
 '401k calculator with employer match',
 '401k calculator 2026',
 'retirement 401k calculator USA',
 '401k investment calculator',
 '401k growth calculator',
 '401k calculator monthly contribution',
 '401k returns calculator',
 '401k calculator with chart',
 '401k before and after tax calculator',

 '401k calculator',
 '401k retirement calculator',
 '401k contribution calculator'
 ],
})

const faqs = [
 {
 question: "What is a 401k calculator example with a $50,000 salary in the USA?",
 answer: "If you earn $50,000 per year and contribute 10% ($5,000 annually) to your 401k, with a 5% employer match and a 7% annual return, your retirement savings could grow to over $700,000 in 30 years. Increasing contributions or employer match can significantly boost your final balance. A 401k calculator helps you visualize this growth instantly."
},
{
 question: "How much will my 401k be worth with a $50,000 salary and employer match?",
 answer: "If you earn $50,000 and contribute 10% annually with a 5% employer match and 7% average return, your 401k could grow to $600,000–$800,000 over 25–30 years. Increasing contributions or starting earlier can significantly increase your final retirement balance."
},

 { question: 'What is the 401k contribution limit for 2026?', answer: 'The 2026 401k contribution limit is $23,500 for employees under age 50. Employees age 50 and older can contribute an additional $7,500 (catch-up contribution), for a total of $31,000. The combined employee + employer total cannot exceed $70,000 in 2026 (IRS Publication 560). Always confirm current limits at IRS.gov.' },
 { question: 'How does employer 401k matching work?', answer: 'Common match formulas: "100% of first 3%" means your employer matches every dollar up to 3% of salary. "50% of first 6%" means they add 50 cents per dollar up to 6% of salary. Example: $80,000 salary with "100% match on first 4%" -- contribute $3,200, employer adds $3,200 free. Over 30 years at 7%: that $3,200/year in free money alone compounds to $321,000.' },
 { question: 'How much should I contribute to my 401k?', answer: 'At minimum, contribute enough to capture your full employer match -- this is a 100% instant return. Most employers match 3-6% of salary. Beyond that, financial planners typically recommend 10-15% of gross income total (employee + employer). If budget allows, max your contribution ($23,500 in 2026 under 50, $31,000 if 50+).' },
 { question: 'What is the difference between Traditional 401k and Roth 401k?', answer: 'Traditional 401k: contributions are pre-tax (reduce taxable income now), grow tax-deferred, withdrawals in retirement are taxed as ordinary income. Best if you expect lower taxes in retirement. Roth 401k: contributions are after-tax (no deduction now), grow tax-free, qualified withdrawals are completely tax-free. Best if you are early in your career or expect higher taxes in retirement.' },
 { question: 'How much will my 401k be worth when I retire?', answer: 'It depends on your starting balance, contributions, employer match, rate of return, and years until retirement. Rule of thumb: $500/month at 7% for 30 years = $607,000. Our 401k calculator shows your personalized projection including employer match and 2026 IRS limits. Starting at 25 vs 35 at $500/month = $1,322,164 vs $606,438 -- a $715,726 difference from 10 extra years.' },
 { question: 'Can I have both a 401k and a Roth IRA?', answer: 'Yes -- and this is the optimal strategy for most Americans. You can contribute to both in the same year as long as your income is under the Roth IRA limit ($150,000 single, $236,000 married in 2026). Recommended order: (1) 401k up to full employer match, (2) max Roth IRA ($7,000), (3) return to max 401k ($23,500). This maximizes both employer free money and tax-free growth.' },
 { question: 'What happens to my 401k if I change jobs?', answer: 'You have 4 options: (1) Leave it with your former employer (allowed if balance over $5,000), (2) Roll it into your new employer\'s 401k, (3) Roll it into an IRA (most flexible option, broadest investment choices), (4) Cash it out (not recommended -- triggers ordinary income tax + 10% early withdrawal penalty if under 591/2). A direct rollover to IRA or new 401k avoids all taxes and penalties.' },
 { question: 'When can I withdraw from my 401k without penalty?', answer: 'You can withdraw penalty-free from a 401k at age 591/2. Required Minimum Distributions (RMDs) begin at age 73 (SECURE 2.0 Act). Exceptions to the 10% early withdrawal penalty include: disability, certain medical expenses, Rule of 55 (separated from service in or after age 55), Rule 72(t) (substantially equal periodic payments), and first-time home purchase (for IRAs, not 401ks).' },
]

const relatedCalculators = [
 { name: 'Roth IRA Calculator', href: '/calculators/finance/roth-ira-calculator', icon: '🛡️', desc: 'Roth IRA growth' },
 { name: 'S&amp;P 500 vs Bonds', href: '/calculators/finance/sp500-vs-bonds-calculator', icon: '📊', desc: 'Stocks vs bonds' },
 { name: 'FIRE Calculator', href: '/calculators/finance/fire-calculator', icon: '🔥', desc: 'Financial independence' },
 { name: 'Paycheck Calculator', href: '/calculators/finance/paycheck-calculator', icon: '💵', desc: 'Take-home pay' },
 { name: 'HSA vs FSA', href: '/calculators/finance/hsa-vs-fsa-calculator', icon: '🏥', desc: 'Health savings accounts' },
 { name: 'Compound Interest', href: '/calculators/finance/compound-interest-calculator', icon: '💰', desc: 'Compounding' },
]

const structuredData = [generateFAQStructuredData(faqs)]

export default function Page() {
 return <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug="retirement-planning-guide-how-much-do-you-need-to-retire" />
}
