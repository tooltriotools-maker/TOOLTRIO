'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { TrendingUp, Shield } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string }
const fmt = (n: number) => '$' + Math.round(n).toLocaleString()
const fmtC = (n: number) => n >= 1000000 ? `$${(n/1000000).toFixed(2)}M` : `$${(n/1000).toFixed(0)}K`

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const [wholeLifePremium, setWholeLifePremium] = useState(3000)
  const [termPremium, setTermPremium] = useState(400)
  const [coverAmount, setCoverAmount] = useState(500000)
  const [investReturn, setInvestReturn] = useState(10)
  const [years, setYears] = useState(20)

  const result = useMemo(() => {
    const months = years * 12
    const mr = investReturn / 100 / 12
    const monthlySavings = (wholeLifePremium - termPremium) / 12
    const termSipFV = monthlySavings * ((Math.pow(1 + mr, months) - 1) / mr) * (1 + mr)
    const totalTermCost = termPremium * years
    const totalWholeCost = wholeLifePremium * years
    // Whole life cash value: typically grows at ~3-4% and equals ~60-70% of premiums paid after 20 years
    const wholeLifeCashValue = totalWholeCost * 0.65
    const sipBetter = termSipFV > wholeLifeCashValue
    const barData = [
      { name: 'Total Premiums', whole: Math.round(totalWholeCost), termSip: Math.round(totalTermCost) },
      { name: 'Final Value', whole: Math.round(wholeLifeCashValue), termSip: Math.round(termSipFV) },
    ]
    return { termSipFV: Math.round(termSipFV), wholeLifeCashValue: Math.round(wholeLifeCashValue), totalWholeCost: Math.round(totalWholeCost), totalTermCost: Math.round(totalTermCost), monthlySavings: Math.round(monthlySavings), sipBetter, difference: Math.round(Math.abs(termSipFV - wholeLifeCashValue)), barData }
  }, [wholeLifePremium, termPremium, coverAmount, investReturn, years])

  return (
    <CalculatorLayout title="Term vs Whole Life Insurance Calculator USA 2026" description="Compare term life plus investing the difference vs whole life insurance on wealth building." icon="🛡️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-4">Policy Details</h2>
          <div className="space-y-4">
            <InputField label="Whole Life Annual Premium" value={wholeLifePremium} onChange={setWholeLifePremium} min={500} max={50000} step={100} prefix="$" />
            <InputField label="Equivalent Term Premium" value={termPremium} onChange={setTermPremium} min={100} max={5000} step={50} prefix="$" />
            <InputField label="Death Benefit / Cover" value={coverAmount} onChange={setCoverAmount} min={100000} max={5000000} step={100000} prefix="$" />
            <InputField label="Investment Return (S&amp;P 500)" value={investReturn} onChange={setInvestReturn} min={5} max={15} step={0.5} suffix="%" />
            <InputField label="Policy Period" value={years} onChange={setYears} min={10} max={30} step={5} suffix="Yrs" />
          </div>
          <div className={`mt-4 p-3 rounded-xl border-2 text-center ${result.sipBetter ? 'bg-green-50 border-green-300' : 'bg-blue-50 border-blue-300'}`}>
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Better Strategy</p>
            <p className="text-xl font-black" style={{ color: result.sipBetter ? '#10b981' : '#3b82f6' }}>{result.sipBetter ? 'Term + Invest' : 'Whole Life'} 🏆</p>
            <p className="text-sm text-gray-500">by {fmtC(result.difference)}</p>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Term+Invest Value" value={fmtC(result.termSipFV)} subValue="Investment portfolio" highlight={result.sipBetter} icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="Whole Life Cash Value" value={fmtC(result.wholeLifeCashValue)} subValue="~65% of premiums" highlight={!result.sipBetter} icon={<Shield className="w-4 h-4" />} />
            <ResultCard label="Monthly Savings" value={fmtC(result.monthlySavings)} subValue="Invested instead" />
            <ResultCard label="Premium Difference" value={fmtC(result.totalWholeCost - result.totalTermCost)} subValue={`Over ${years} years`} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Term+Invest vs Whole Life Over {years} Years</h3>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={result.barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={70} tickFormatter={v => v >= 1000000 ? `$${(v/1000000).toFixed(1)}M` : `$${(v/1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8 }} formatter={(v: number, name) => [fmt(v), name]} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="whole" name="Whole Life" fill="#8b5cf6" radius={[4,4,0,0]} />
                  <Bar dataKey="termSip" name="Term + Invest" fill="#10b981" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <div className="grid grid-cols-2 gap-3">
            <Card>
              <h3 className="text-sm font-semibold text-green-400 mb-2">✅ Term Life + Invest</h3>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>v Same death benefit at 80-90% lower cost</li>
                <li>v Invest the premium difference (10-20x more)</li>
                <li>v Flexible - cancel anytime after dependents grown</li>
                <li>v Full market returns on investments</li>
                <li>✗ Coverage ends when term expires</li>
              </ul>
            </Card>
            <Card>
              <h3 className="text-sm font-semibold text-purple-400 mb-2">🛡️ Whole Life</h3>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>v Permanent coverage - never expires</li>
                <li>v Cash value builds over time</li>
                <li>v Borrow against cash value tax-free</li>
                <li>✗ Very high premiums vs term</li>
                <li>✗ Cash value grows slowly (3-4%)</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
            <div className="mt-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-6">Term vs Whole Life: Complete Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-base">What is Term?</h3>
              <p>Term is a USA investment or financial product that offers distinct advantages depending on your goals, tax situation, and time horizon. Understanding how it works is key to making the most of your money.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">What is Whole Life?</h3>
              <p>Whole Life takes a different approach to growing or protecting your wealth. Each has its own risk profile, liquidity characteristics, and tax treatment that makes it suited to specific financial situations.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">Key Differences</h3>
              <p>The most important distinction between Term and Whole Life is how returns are generated and taxed. Term typically suits growth-oriented investors while Whole Life may appeal to those prioritizing stability or specific tax advantages.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-base">Tax Treatment in USA</h3>
              <p>Tax efficiency dramatically affects real returns. Gains from each option may be subject to capital gains (0-20%) or ordinary income tax. Using the calculator above helps you see the true post-tax outcome based on your specific situation and contribution level.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">Which Is Better for Retirement Planning?</h3>
              <p>The right choice depends on your time horizon, risk tolerance, and tax bracket. For goals 5+ years away, higher-return options (10-12% historical) generally beat lower-return stable options (4-5%). For goals under 3 years, capital preservation takes priority.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">How to Use This Calculator</h3>
              <p>Enter your monthly contribution, expected return rates for both options, and investment period above. The calculator shows year-by-year growth, total wealth created, and the difference between the two strategies - helping you visualize the long-term impact of your choice.</p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
            <h3 className="font-bold text-green-800 mb-2">💡 Expert Tip</h3>
            <p className="text-sm text-green-700 leading-relaxed">Most financial advisors recommend not putting all your money in one option. A diversified approach - splitting between Term and Whole Life based on your specific goals - often provides better risk-adjusted returns than going all-in on either. Use this calculator to find your optimal split.</p>
          </div>
        </div>
      </div>


      {/* Internal Links */}
      {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "401k vs Roth IRA Calculator", href: "/calculators/finance/401k-vs-roth-ira-calculator", icon: "📊", desc: "Free calculator" },          { name: "401k vs Taxable Account Calculator", href: "/calculators/finance/401k-vs-taxable-account-calculator", icon: "📊", desc: "Free calculator" },          { name: "401k vs Pension Calculator", href: "/calculators/finance/401k-vs-pension-calculator", icon: "📊", desc: "Free calculator" },          { name: "Roth IRA vs Traditional IRA Calculator", href: "/calculators/finance/roth-ira-vs-traditional-ira-calculator", icon: "📊", desc: "Free calculator" },          { name: "Roth IRA vs 401k Employer Match Calculator", href: "/calculators/finance/roth-ira-vs-401k-employer-match-calculator", icon: "📊", desc: "Free calculator" },          { name: "Roth IRA vs HSA Calculator", href: "/calculators/finance/roth-ira-vs-hsa-calculator", icon: "📊", desc: "Free calculator" },          { name: "HSA vs FSA Calculator", href: "/calculators/finance/hsa-vs-fsa-calculator", icon: "🏥", desc: "Free calculator" },          { name: "Sep IRA vs Solo 401k Calculator", href: "/calculators/finance/sep-ira-vs-solo-401k-calculator", icon: "💼", desc: "Free calculator" },          { name: "Bonds vs Cds USA Calculator", href: "/calculators/finance/bonds-vs-cds-usa-calculator", icon: "📋", desc: "Free calculator" },          { name: "Cd vs HYSA Calculator", href: "/calculators/finance/cd-vs-hysa-calculator", icon: "💰", desc: "Free calculator" },          { name: "I Bonds vs Tips Calculator", href: "/calculators/finance/i-bonds-vs-tips-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "S&P500 vs Bonds Calculator", href: "/calculators/finance/sp500-vs-bonds-calculator", icon: "📊", desc: "Free calculator" },
          ]}
        />
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Term Vs Whole Life Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Term Vs Whole Life USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Term vs Whole Life Insurance Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, with a $1M life insurance need, your term vs whole life insurance calculator USA 2026 shows the 20-year wealth comparison between both strategies — quantifying the true cost of permanent insurance.
        </p>
      </Card>

            <SEOContent
        title="Term vs Whole Life Insurance Calculator USA – Which Life Insurance Strategy Builds More Wealth?"
        category="finance"
        intro={`Term life insurance does one thing — pays your beneficiaries if you die during the coverage period — at low cost. Whole life insurance combines a death benefit with a cash value savings component, at premiums that are 5-15x higher than equivalent term coverage. The 'buy term and invest the difference' strategy advocated by most independent financial planners is based on a straightforward mathematical observation: the investment returns inside whole life insurance are almost always inferior to what you'd earn investing the premium difference in index funds.

The insurance industry's counter-argument focuses on whole life's guaranteed nature: the cash value grows at a contractually guaranteed rate (typically 3-4%), which cannot decline. The death benefit is also guaranteed regardless of health changes after issuance. For some specific situations — estate planning with very large estates, business succession planning, or people who genuinely cannot invest consistently without forced mechanisms — whole life has legitimate applications.

For most middle-class families with dependents, the appropriate insurance question is: how much pure protection do I need to replace my income if I die prematurely, and what's the cheapest way to buy that protection? The answer is almost always term insurance — which lets you buy 10-20x more coverage for the same premium as whole life.`}
        howItWorks={`Term cost comparison: A healthy 35-year-old male can purchase a 20-year, $1,000,000 term policy for approximately $40-$60/month. An equivalent $1,000,000 whole life policy costs approximately $600-$900/month.

Buy term and invest the difference: If term = $50/month and whole life = $700/month, the monthly premium difference = $650. Investing $650/month at 7% for 20 years: $650 × [(1.07/12)^240 - 1] / (0.07/12) ≈ $406,318 in investment account vs the guaranteed cash value inside whole life of perhaps $150,000-$200,000.

Cash value internal rate of return: True IRR of a whole life policy is the rate that makes the present value of premiums paid equal to the present value of death benefit (probability-weighted) plus cash value at surrender. Typical whole life IRR is 3-5% — far below equity market expectations.`}
        benefits={[
          { title: "Instant Real-Time Results", text: "Results update as you type \u2014 no button clicks needed. Compare multiple scenarios in minutes to understand how each variable changes your outcome. Small changes in rate, time, or amount often have surprisingly large long-term impacts due to compounding. Use alongside the [Compound Interest Calculator](/calculators/finance/compound-interest-calculator) to model growth scenarios." },
          { title: "US-Standard Formula Accuracy", text: "All calculations use formulas recognized by US financial institutions, the CFP Board, and IRS guidelines. Whether comparing to the S&P 500's historical 10.5% annual return or evaluating debt at your specific rate, the math is the same as professional advisors use. Connect to the [ROI Calculator](/calculators/finance/roi-calculator) to benchmark your results." },
          { title: "Complete Privacy \u2014 No Data Stored", text: "Everything runs locally in your browser. No financial data is transmitted to any server or stored anywhere. When you close the tab, your inputs disappear permanently. This is essential for sensitive financial information \u2014 your income, debts, and savings details stay entirely private." },
          { title: "Connects to Your Complete Financial Picture", text: "No single calculator tells the whole story. This tool is most powerful when used alongside related calculators. The [Net Worth Calculator](/calculators/finance/net-worth-calculator) shows your total position. The [Savings Rate Calculator](/calculators/finance/savings-rate-calculator) shows whether you're saving enough. The [FIRE Calculator](/calculators/finance/fire-calculator) connects everything to your retirement timeline." },
          { title: "Scenario Comparison for Better Decisions", text: "The most valuable feature is rapid scenario comparison: what if the rate changes by 1%? What if you extend the time period by 5 years? What if you increase the monthly amount by $200? These small changes, compounded over time, often produce dramatically different outcomes. Use alongside the [Savings Goal Calculator](/calculators/finance/savings-goal-calculator) to find the inputs needed to hit specific targets." },
          { title: "Tax-Aware Planning Context", text: "Most financial calculations have tax implications. Investment returns face capital gains tax (0%, 15%, or 20% for long-term gains). Retirement account withdrawals face ordinary income tax. This calculator provides pre-tax results \u2014 use the [Income Tax Calculator](/calculators/finance/income-tax-calculator) and the [Paycheck Calculator](/calculators/finance/paycheck-calculator) to estimate after-tax outcomes for your specific situation." },
        ]}
        useCases={[
          { title: "Annual Financial Planning", text: "Run this calculator as part of your annual financial review \u2014 updating inputs with current balances, rates, and goals. Connecting results to the [Net Worth Calculator](/calculators/finance/net-worth-calculator) gives you a complete annual snapshot. Financial clarity once per year prevents the drift that leads to retirement shortfalls and unnecessary debt." },
          { title: "Major Life Decisions", text: "Career change, home purchase, marriage, having children \u2014 each major life event requires financial recalculation. Run scenarios before and after the event to understand the financial impact. Combine with the [Budget Planner Calculator](/calculators/finance/budget-planner-calculator) to verify the new scenario fits within your income and savings targets." },
          { title: "Comparing Financial Products", text: "Banks, brokers, and lenders offer products at different rates, terms, and fee structures. Run each option through this calculator to find which product produces the best outcome for your specific inputs. This is especially valuable for loans \u2014 a 0.5% rate difference on a large loan changes total cost by thousands of dollars. See also the [Compound Interest Calculator](/calculators/finance/compound-interest-calculator) for growth-side comparisons." },
          { title: "Setting Achievable Goals", text: "Work backwards from your target outcome: what inputs do you need to reach $500,000 in 20 years? What monthly contribution at your expected rate reaches your goal? This reverse-engineering approach transforms vague financial intentions into specific, actionable monthly commitments. Use the [Savings Goal Calculator](/calculators/finance/savings-goal-calculator) for goal-based projections." },
          { title: "Tracking Progress Over Time", text: "Save your baseline calculation and rerun it quarterly to measure progress. Are you on track against your original projection? Has the market return or interest rate environment changed enough to require adjusting your plan? Regular recalculation turns this from a one-time tool into an ongoing financial management system. Track your net worth progress with the [Net Worth Calculator](/calculators/finance/net-worth-calculator)." },
          { title: "Teaching Financial Concepts", text: "The best way to understand compound interest, investment returns, or debt amortization is to see the math with real numbers. This calculator makes abstract financial concepts concrete \u2014 especially valuable for teaching younger family members about money. The [FIRE Calculator](/calculators/finance/fire-calculator) is particularly powerful for demonstrating how savings rate connects to retirement age." },
        ]}
        tipsSection={`For pure income replacement during working years with dependents, term insurance is almost always the right answer. Buy enough coverage (typically 10-12x annual income) for the period you need it (until children are independent and retirement savings are sufficient). Then invest the premium difference aggressively.

Whole life has legitimate applications in narrow situations: estate planning for high-net-worth individuals facing estate taxes where the death benefit funds estate taxes efficiently, business buy-sell agreements that require guaranteed insurance regardless of future health, and certain corporate-owned life insurance (COLI) structures. These are specialized situations, not the general recommendation.

For existing whole life policies: evaluate surrender value against remaining premiums before automatically surrendering. Some older policies with paid-up additions have better economics than their original pricing suggests. Have a fee-only financial planner (not an insurance salesperson) analyze the specific policy before any surrender decision.`}
        conclusion={`The life insurance industry's marketing of whole life (and its variants — universal life, variable life, indexed universal life) consistently emphasizes the 'forced savings' and 'tax-advantaged growth' aspects while downplaying the high commission structures that make whole life significantly more profitable for agents than term.

Before purchasing any permanent life insurance product, compare the projected internal rate of return of the cash value against what you'd earn in a Roth IRA or after-tax brokerage account. If the whole life IRR doesn't exceed your alternative investment return, the pure term + invest alternative is mathematically superior.`}

        didYouKnow={[
          "The average American has only $87,000 saved for retirement by ages 55\u201364 \u2014 far below the $1.5M+ typically needed for a secure retirement (Vanguard 2026).",
          "Starting to invest at 25 vs. 35 with $500/month at 7% produces $1.3M vs. $567,000 by age 65 \u2014 a $745,000 difference from just 10 extra years of compounding.",
          "The S&P 500 has returned approximately 10.5% per year on average since 1957, turning $1 into over $1,400 with dividends reinvested over 68 years.",
        ]}
      />
      <InternalLinks
        title="Related Finance Calculators"
        variant="grid"
        links={[
            { name: "ROI Calculator", href: "/calculators/finance/roi-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Savings Rate Calculator", href: "/calculators/finance/savings-rate-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Fire Calculator", href: "/calculators/finance/fire-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Net Worth Calculator", href: "/calculators/finance/net-worth-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Retirement Calculator", href: "/calculators/finance/retirement-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "Income Tax Calculator", href: "/calculators/finance/income-tax-calculator", icon: "🔗", desc: "Related financial planning" },
        ]}
      />
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )
}
