import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
 title: 'College Cost Calculator USA 2026 – 529 Plan, Tuition & Monthly Savings Needed',
 description: 'Free college cost calculator USA 2026. Calculate future tuition costs with inflation, 529 plan growth, and monthly savings needed. Real examples for in-state, out-of-state, and private universities.',
 slug: 'college-cost-calculator',
 category: 'finance',
 keywords: [
 'college cost calculator 2026',
 
 'college cost calculator',
 'free college cost calculator',
 'college cost calculator online',
 'best college cost calculator 2026',
 'college cost calculator no signup',
 'accurate college cost calculator',
 'how to calculate college cost',
 'how does college cost calculator work',
 'what is college cost calculator',
 'calculate college cost free',
 'college cost calculator 2026',
 'college cost calculator 2026',
 'online college cost tool free',
 'college cost estimator online',
 'college cost formula calculator',
 'use college cost calculator now',
 'try college cost calculator free',
 'calculate my college cost',
 'check my college cost online',
 'find my college cost free',
 'instant college cost calculator',
 'quick college cost calculator',
 'college cost calculator app',
 'college cost calculator mobile',
 'college cost tool no login',
 'how to use college cost calculator',
 'what is a good college cost',
 'what is the formula for college cost',
 'how is college cost calculated',
 'when to use college cost calculator',
 'which college cost calculator is best',
 'how accurate is college cost calculator',
 'college cost calculator USA',
 'college cost financial calculator free',
 'college cost investment calculator',
 'college cost calculator with chart',
 'college cost returns calculator',
 'college cost calculator monthly',
 'college cost calculator yearly',
 'US college cost calculator',
 'American college cost calculator',
 'college cost calculator UK',
 'college cost calculator India',
 'college cost before after tax',
 'free finance calculator',
 'personal finance college cost',
 'college cost calculator no ads',
 'free financial calculator USA 2026',
 'investment calculator no signup',
 'retirement planning calculator free',
 'compound interest calculator USA',
 'mortgage calculator USA',
 'IRS tax calculator 2026',
 'tooltrio.com',
 'free calculator no signup',
 'calculator no data stored',
 'instant calculator results',
 'free calculator USA UK India'
 ],
})

const faqs = [
  { question: 'What will college actually cost for a child born today when they turn 18?', answer: 'Using 5% annual education cost inflation on 2025 averages: public 4-year in-state currently averages $27,000/year total (tuition, room, board, fees). At 5% annual increase over 18 years: $27,000 × (1.05)^18 = $64,800/year. Four-year total = approximately $259,000. Private university currently averages $60,000/year total; at 5%: $60,000 × (1.05)^18 = $144,000/year. Four-year total = approximately $576,000. These are sticker prices — actual family costs are lower after grants and scholarships. But as planning anchors, a parent today should plan for $260,000-$575,000 depending on school type, in today\'s dollar terms.' },
  { question: 'How much should I save per month to fully fund a 4-year public university?', answer: 'For a newborn today targeting a public 4-year university: estimated future total cost ≈ $260,000 (18 years at 5% inflation). Investing in a 529 at 7% annual return over 18 years, the required monthly contribution: approximately $680/month. Starting at age 5 instead of birth: required monthly jumps to $1,100 because you\'ve lost 5 years of compounding. Starting at age 10: $2,100/month. This math explains why early savings matter so much — the same total college cost requires dramatically larger monthly contributions the later you start. Even $200-300/month starting at birth grows significantly — it won\'t cover the full cost, but it meaningfully reduces future loans.' },
  { question: 'What is the actual net price I\'ll pay for college after financial aid?', answer: 'The sticker price is fiction for most families. Every accredited college must publish a Net Price Calculator on its website — use it. It estimates your likely actual cost based on income, assets, and other factors. National data: at private 4-year colleges, students receiving any aid pay an average net price of $19,000-$22,000/year, versus the $65,000+ sticker price. The gap is massive. Selective private colleges (especially those with large endowments like Yale, MIT, Swarthmore) often meet 100% of demonstrated financial need — meaning families with under $75,000 income sometimes pay less than state university tuition. Income below $150,000 at many elite schools means substantial grant aid.' },
  { question: 'What is the income threshold where a family gets very little need-based aid?', answer: 'The rough cutoff for federal Pell Grant eligibility is approximately $60,000-$70,000 household income. Above this, the Expected Family Contribution (now called Student Aid Index) rises sharply. By $100,000-$130,000 household income, most families expect minimal federal need-based aid. Institutional need-based aid (from the college itself) uses different formulas — selective private colleges often extend meaningful aid to families up to $150,000-$200,000, particularly if they have multiple children in college simultaneously or unusual circumstances. The CSS Profile (used by 400+ private colleges) allows colleges to consider medical expenses, unusual debts, and business losses in aid calculations.' },
  { question: 'How do I evaluate whether a specific college is worth the price?', answer: 'Three metrics matter most: (1) Net price versus peer schools — compare the college\'s Net Price Calculator output to similar quality institutions. A difference of $10,000+/year in net price for comparable academic quality is worth seriously considering. (2) Graduate earnings versus debt — the Department of Education\'s College Scorecard shows median earnings 1 and 10 years after graduation by college and field. If a program\'s median 10-year earnings are close to the typical student debt load, that is a problematic return on investment. (3) Graduation rate — a college with a 45% 6-year graduation rate poses real risk. Student loan debt and no degree is the worst financial outcome in the college equation.' },
  { question: 'Can my child attend community college for 2 years to reduce overall cost?', answer: 'Yes, and community college transfer is an increasingly smart strategy. Two years at a community college (average $3,900/year) followed by two years at a public 4-year university (average $27,000/year including room and board) reduces total costs to approximately $61,800 versus $108,000 for all four years at the university. The savings: nearly $46,000. The risk: transfer acceptance rates and requirements vary significantly. Some states have formal transfer agreements guaranteeing admission to public university systems with a certain GPA. Research these agreements before enrolling. The degree awarded at graduation is from the 4-year institution, not the community college — career perceptions are similar to traditional students.' }
]

const relatedCalculators = [
 { name: '401k Calculator', href: '/calculators/finance/401k-calculator', icon: '🏦', desc: '401k retirement balance' },
 { name: 'Roth IRA Calculator', href: '/calculators/finance/roth-ira-calculator', icon: '🛡️', desc: 'Roth IRA growth' },
 { name: '401k vs Roth IRA', href: '/calculators/finance/401k-vs-roth-ira-calculator', icon: '🇺🇸', desc: 'Compare retirement accounts' },
 { name: 'S&amp;P 500 vs Bonds', href: '/calculators/finance/sp500-vs-bonds-calculator', icon: '📊', desc: 'Stocks vs bonds' },
 { name: 'FIRE Calculator', href: '/calculators/finance/fire-calculator', icon: '🔥', desc: 'Financial independence' },
 { name: 'Paycheck Calculator', href: '/calculators/finance/paycheck-calculator', icon: '💵', desc: 'Take-home pay' },
]

const structuredData = [generateFAQStructuredData(faqs)]

export default function Page() {
 return <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug="savings-goal-guide-emergency-fund-down-payment-usa" />
}
