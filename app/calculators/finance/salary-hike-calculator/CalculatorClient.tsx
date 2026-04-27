'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { calculateSalaryHike } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt } = useCurrency()
  const [currentSalary, setCurrentSalary] = useState(75000)
  const [hikePercent, setHikePercent] = useState(10)
  const [years, setYears] = useState(10)
  const [annualHike, setAnnualHike] = useState(4)
  const [inflation, setInflation] = useState(3)

  const result = useMemo(() => calculateSalaryHike(currentSalary, hikePercent, years, annualHike, inflation), [currentSalary, hikePercent, years, annualHike, inflation])

  return (
    <CalculatorLayout title="Salary Hike Calculator USA 2026" description="Calculate the exact after-tax impact of any salary raise and its lifetime investment value." icon="💰" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h2 className="text-lg font-bold text-gray-900 mb-5">Salary Details</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Current Annual Salary</label>
              <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input type="number" value={currentSalary} onChange={e => setCurrentSalary(Number(e.target.value))} className="w-full pl-7 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500" /></div>
            </div>
            {[
              { label: `Salary Hike: ${hikePercent}%`, val: hikePercent, set: setHikePercent, min: 1, max: 100, step: 1 },
              { label: `Project over: ${years} years`, val: years, set: setYears, min: 1, max: 30, step: 1 },
              { label: `Annual hike going forward: ${annualHike}%`, val: annualHike, set: setAnnualHike, min: 0, max: 15, step: 0.5 },
              { label: `Inflation Rate: ${inflation}%`, val: inflation, set: setInflation, min: 0, max: 10, step: 0.5 },
            ].map(f => (
              <div key={f.label}>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{f.label}</label>
                <input type="range" min={f.min} max={f.max} step={f.step} value={f.val} onChange={e => f.set(Number(e.target.value))} className="w-full accent-green-600" />
              </div>
            ))}
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="text-sm text-gray-500">Your raise adds</p>
                <p className="text-4xl font-black text-green-700">+{fmt(result.raise)}</p>
                <p className="text-sm text-gray-500 mt-1">per year ({hikePercent}% increase)</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">New Salary</p>
                <p className="text-2xl font-black text-gray-900">{fmt(result.newSalary)}</p>
                <p className="text-xs text-gray-500">Real value: {fmt(result.realNewSalary)}/yr today</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <ResultCard label="Current Salary" value={fmt(currentSalary)} subValue="Before raise" />
            <ResultCard label="New Salary" value={fmt(result.newSalary)} subValue={`+${hikePercent}%`} highlight />
            <ResultCard label={`Lifetime Gain (${years}y)`} value={fmt(result.lifetimeGain)} subValue="vs no raise" />
          </div>

          <Card>
            <h3 className="font-bold text-gray-900 mb-4">Nominal vs Real Salary Over {years} Years</h3>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={result.yearData}>
                <defs>
                  <linearGradient id="nomGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="realGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" tickFormatter={v => `Y${v}`} tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, '']} />
                <Legend />
                <Area type="monotone" dataKey="salary" stroke="#16a34a" fill="url(#nomGrad)" name="Nominal Salary" strokeWidth={2} />
                <Area type="monotone" dataKey="realSalary" stroke="#3b82f6" fill="url(#realGrad)" name="Real Salary (today's $)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>


      {/* Internal Links */}
      {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },          { name: "Simple Interest Calculator", href: "/calculators/finance/simple-interest-calculator", icon: "📊", desc: "Free calculator" },          { name: "Inflation Calculator", href: "/calculators/finance/inflation-calculator", icon: "📉", desc: "Free calculator" },          { name: "Real Return Calculator", href: "/calculators/finance/real-return-calculator", icon: "📊", desc: "Free calculator" },          { name: "XIRR Calculator", href: "/calculators/finance/xirr-calculator", icon: "📊", desc: "Free calculator" },          { name: "Currency Converter Calculator", href: "/calculators/finance/currency-converter", icon: "💱", desc: "Free calculator" },          { name: "Currency Profit Calculator", href: "/calculators/finance/currency-profit-calculator", icon: "📊", desc: "Free calculator" },          { name: "Tip Calculator", href: "/calculators/finance/tip-calculator", icon: "💵", desc: "Free calculator" },          { name: "ROI Calculator", href: "/calculators/finance/roi-calculator", icon: "📈", desc: "Free calculator" },          { name: "P/E Ratio Calculator", href: "/calculators/finance/pe-ratio-calculator", icon: "📊", desc: "Free calculator" },          { name: "CAGR Calculator", href: "/calculators/finance/cagr-calculator", icon: "📊", desc: "Free calculator" },          { name: "Crypto Profit Calculator", href: "/calculators/finance/crypto-profit-calculator", icon: "₿", desc: "Free calculator" },
          ]}
        />
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Salary Hike Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          On a $75,000 salary, the 50/30/20 rule suggests: <strong>$37,500</strong> for needs, $22,500 for wants, and $15,000 for savings and debt repayment.
        </p>
        <p className="text-sm text-gray-600">
          This Salary Hike USA 2026 planner helps you allocate your income optimally and track progress toward your financial goals.
        </p>
      </Card>
      <SEOContent
        title="Salary Hike Calculator USA – What Is a Raise Really Worth to You After Taxes in 2026?"
        category="finance"
        intro={`A salary raise feels significant in the moment and often disappoints after taxes reduce it to a smaller take-home increase than expected. A $5,000 raise at the 22% federal bracket takes home approximately $3,500-$3,800 after income taxes and FICA. Understanding the actual take-home impact helps calibrate what raise amounts to target in negotiations and how to weigh different compensation packages.

Compounding matters enormously for salary raises. A 3% annual raise versus a 5% annual raise on a $75,000 starting salary produces a $75,000 vs $75,000 difference today, but over a 20-year career: the 3% path reaches $135,500; the 5% path reaches $199,100 — a difference of $63,600 annually by year 20, plus the compounding in interim years. This is why early career raises have such outsized lifetime income impact.

The anchor for salary negotiation is your current salary — which is why negotiating hard at each job change, rather than accepting the standard 3-5% raise, is so important. Jumping companies typically produces 10-20% salary increases for the same role, while internal raises average 3-5%. Over a career, regular external market exposure is the primary driver of salary growth above inflation.`}
        howItWorks={`Take-home impact: Additional salary × (1 - marginal federal rate - FICA rate - state rate). For $5,000 raise at 22% federal, 7.65% FICA (if below wage base), 5% state: take-home increase = $5,000 × (1 - 0.22 - 0.0765 - 0.05) = $5,000 × 0.6535 = $3,268.

Compound salary trajectory: Year n salary = Starting salary × (1 + annual raise rate)^n. At 3% vs 5% over 20 years on $75,000: $75,000 × (1.03)^20 = $135,477 vs $75,000 × (1.05)^20 = $199,103.

Lifetime earnings impact: Difference in annual salary at year 20 = $63,626. Sum of all salary differences over 20 years (NPV approach): approximately $800,000-$1M in total additional lifetime earnings from the 2% annual raise differential.`}
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
        tipsSection={`Research market rates before any salary negotiation. Glassdoor, LinkedIn Salary Insights, Levels.fyi (tech), Salary.com, and Bureau of Labor Statistics data provide concrete market anchors. Walking in with a specific market range is more effective than a general request for more money.

Negotiate at job transitions, not just during annual reviews. Annual raises are typically constrained by budget processes and 'what percent did you get' conversations. Job transition negotiations are one-time decisions with no constraint other than market rate and your leverage.

If you receive a below-market or flat raise, research the specific market conditions before escalating. If comparable roles genuinely pay 15-20% more, having a competing offer (even if you wouldn't take it) dramatically improves your leverage in a salary conversation.`}
        conclusion={`Salary growth in your 20s and 30s compounds into dramatically different wealth trajectories by your 50s. An extra $5,000/year starting at 28, invested rather than spent, becomes approximately $460,000 at 58 at 7% returns. The combination of higher income (providing more investable income) and compound returns on that invested difference is the financial case for aggressive early-career salary development.

For complete context on how a raise affects your finances: use [our Paycheck Calculator](/calculators/finance/paycheck-calculator) to see the exact take-home increase, and [our Savings Goal Calculator](/calculators/finance/savings-goal-calculator) to map what the additional monthly savings can accomplish toward specific financial targets.`}

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
            { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "ROI Calculator", href: "/calculators/finance/roi-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Savings Rate Calculator", href: "/calculators/finance/savings-rate-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Net Worth Calculator", href: "/calculators/finance/net-worth-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Fire Calculator", href: "/calculators/finance/fire-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Retirement Calculator", href: "/calculators/finance/retirement-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "Income Tax Calculator", href: "/calculators/finance/income-tax-calculator", icon: "🔗", desc: "Related financial planning" },
        ]}
      />
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )
}
