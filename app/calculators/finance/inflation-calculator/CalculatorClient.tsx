'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Line, Bar } from 'recharts'
import { calculateInflation } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { currency, fmt, fmtCompact } = useCurrency()
  const d = currency.defaultValues

  const [amount, setAmount] = useState(d.mediumAmount)
  const [inflationRate, setInflationRate] = useState(3.5)
  const [years, setYears] = useState(10)

  const result = useMemo(() => calculateInflation(amount, inflationRate, years), [amount, inflationRate, years])

  const inflationData = result.yearlyData.map((r: any) => ({
    year: r.year,
    futureValue: r.total,
    purchasingPower: Math.round(amount / Math.pow(1 + inflationRate / 100, r.year)),
  }))

  const tickFmt = (v: number) => {
    if (currency.code === 'INR') return v >= 100000 ? `₹${(v / 100000).toFixed(0)}L` : `₹${(v / 1000).toFixed(0)}K`
    return v >= 1000000 ? `${currency.symbol}${(v / 1000000).toFixed(1)}M` : `${currency.symbol}${(v / 1000).toFixed(0)}K`
  }

  const purchasingPowerLoss = ((amount - result.purchasingPower) / amount * 100).toFixed(1)

  return (
    <CalculatorLayout title="Inflation Calculator USA 2026" description={`See how inflation erodes purchasing power in ${currency.name}. Plan your savings to beat inflation.`} icon="📊" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-5">Inputs</h2>
          <div className="space-y-5">
            <InputField label={`Current Amount (${currency.symbol})`} value={amount} onChange={setAmount}
              min={currency.code === 'INR' ? 1000 : 100}
              max={currency.code === 'INR' ? 10000000 : 1000000}
              step={currency.code === 'INR' ? 1000 : 100}
              prefix={currency.symbol}
            />
            <InputField label="Inflation Rate" value={inflationRate} onChange={setInflationRate} min={0.5} max={20} step={0.5} suffix="%" />
            <InputField label="Time Period" value={years} onChange={setYears} min={1} max={50} step={1} suffix="Yrs" />
          </div>
          <div className="mt-5 space-y-3">
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
              <p className="text-xs text-gray-500 mb-1">Purchasing Power Loss</p>
              <p className="text-2xl font-bold font-display text-red-400">{purchasingPowerLoss}%</p>
              <p className="text-xs text-gray-400 mt-1">Your {fmt(amount)} will feel like {fmt(result.purchasingPower)} today</p>
            </div>
            <div className="p-4 rounded-xl bg-green-100 border border-green-200">
              <p className="text-xs text-gray-500 mb-1">Future Cost of {fmt(amount)} today</p>
              <p className="text-2xl font-bold font-display text-green-700">{fmtCompact(result.futureValue)}</p>
              <p className="text-xs text-gray-400 mt-1">In {years} years at {inflationRate}% inflation</p>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Future Cost" value={fmtCompact(result.futureValue)} subValue={`In ${years} years`} highlight />
            <ResultCard label="Purchasing Power" value={fmtCompact(result.purchasingPower)} subValue="Real value today" />
            <ResultCard label="Investment Needed" value={fmtCompact(result.futureValue)} subValue="To maintain value" />
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Future Value vs Purchasing Power</h3>
            <div style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={inflationData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="infFv" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} /><stop offset="95%" stopColor="#f59e0b" stopOpacity={0} /></linearGradient>
                    <linearGradient id="infPp" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} /><stop offset="95%" stopColor="#3b82f6" stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} width={76} tickFormatter={tickFmt} />
                  <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number, name) => [fmt(v), name]} labelFormatter={y => `Year ${y}`} />
                  <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
                  <Area type="monotone" dataKey="futureValue" name="Future Cost" stroke="#f59e0b" fill="url(#infFv)" strokeWidth={2} />
                  <Area type="monotone" dataKey="purchasingPower" name="Purchasing Power" stroke="#3b82f6" fill="url(#infPp)" strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Year-wise Inflation Impact</h3>
            <div className="overflow-y-auto max-h-56">
              <table className="calc-table">
                <thead><tr><th>Year</th><th>Future Cost</th><th>Purchasing Power</th><th>Value Lost</th></tr></thead>
                <tbody>
                  {inflationData.map((row, i) => (
                    <tr key={i}>
                      <td className="text-gray-500">{row.year}</td>
                      <td className="text-amber-400">{fmtCompact(row.futureValue)}</td>
                      <td className="text-blue-400">{fmtCompact(row.purchasingPower)}</td>
                      <td className="text-red-400">{fmtCompact(amount - row.purchasingPower)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8">
      {/* 600-word SEO explanation */}
      <div className="mt-10">
        <Card>
          <h2 className="text-xl font-black text-gray-900 mb-4">Inflation Calculator - Understand the True Cost of Rising Prices USA 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">What is Inflation and How Does It Erode Wealth?</h3>
              <p>Inflation is the rate at which the general price level of goods and services rises over time, which correspondingly decreases purchasing power. In simple terms: if inflation is 6%, the same basket of goods that cost $1,00,000 today will cost $1,06,000 next year. For savers keeping money in a savings account at 3-4%, real returns are actually negative when inflation is 6%. The Reserve Bank of India (Federal Reserve) targets 4% CPI inflation (Consumer Price Index), though food inflation and education/medical inflation often run significantly higher at 8-12%. Understanding inflation is essential for accurate financial planning.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">How Inflation Affects Different Expenses</h3>
              <p>Not all expenses inflate equally. Education inflation: 8-12% annually - the fastest growing expense category. Medical/healthcare inflation: 10-15% annually. Food inflation: 5-8%. Housing (rent) inflation: 5-8%. General goods: 4-6% (tracked by CPI). This means planning for a child's education or your own healthcare in retirement requires using higher inflation rates than the headline CPI. Our inflation calculator lets you set a custom inflation rate to accurately model your specific expense category, rather than using a single general rate.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Real Returns - What Matters After Inflation</h3>
              <p>The real return is your investment return minus inflation. Real Return ~= Nominal Return - Inflation Rate. Examples: Savings account at 3.5%, inflation 6%: Real return = -2.5% (losing purchasing power!). FD at 7%, inflation 6%: Real return = +1%. tax-advantaged mutual fund mutual fund at 14%, inflation 6%: Real return = +8%. This is why equity investments are essential for long-term goals - they\'re the only asset class in the US that consistently delivers positive real returns of 6-10% over long periods. Our calculator shows not just future value but also the purchasing power equivalent in today\'s money.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Inflation-Proofing Your Financial Plan</h3>
              <p>Four strategies to protect against inflation: (1) Equity investments - S&amp;P 500 has historically returned ~12% CAGR vs 6% inflation = ~6% real return. (2) Real estate - property prices typically appreciate at or above inflation in major US cities. (3) Inflation-indexed instruments - Federal Reserve\'s Sovereign Gold Bonds (SGBs) and some government securities are partially inflation-linked. (4) Increasing income - ensure salary/income grows faster than inflation (negotiate 8%+ increments in high-inflation periods). Review your financial plan every year to account for actual inflation vs projected inflation, and adjust your investment amounts accordingly.</p>
            </div>
          </div>
        </Card>
      </div>

            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Inflation Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Inflation USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      <SEOContent
        title="Inflation Calculator USA 2026"
        category="finance"
        intro={`Inflation is the invisible tax on savings that doesn't appear on any bank statement but compounds relentlessly. A dollar in 2000 buys what roughly 57 cents bought in 2024 — meaning inflation destroyed 43% of purchasing power over 24 years. For financial planning, understanding inflation's compound erosion effect is as important as understanding compound investment growth.

The US Federal Reserve's target inflation rate is 2% annually — which sounds modest until you run the math. At 2% inflation, purchasing power halves every 35 years. Prices double in 35 years. For a 30-year-old planning for a 65-year retirement, that means your fixed retirement income in 2055 buys roughly half what it would buy today, and 2085 income buys a quarter.

The inflation rate that matters for your specific situation isn't necessarily CPI. Healthcare costs have inflated at 4-6% annually. College tuition at 5-7%. Housing in major metros at 5-10%. If your expenses are concentrated in these categories, your personal inflation rate substantially exceeds headline CPI.`}
        howItWorks={`Purchasing power calculation: Future purchasing power = Present value / (1 + inflation rate)^years. $100,000 in 30 years at 2.5% inflation is worth $100,000 / (1.025)^30 = $47,674 in today's purchasing power.

Inflation-adjusted return (Real return): The Fisher equation: (1 + real return) = (1 + nominal return) / (1 + inflation rate). At 8% nominal return and 3% inflation: real return = (1.08/1.03) - 1 = 4.85%. Simplified approximation: real return ≈ nominal return - inflation rate.

Historical US CPI data from the BLS allows calculation of how much any past dollar amount corresponds to in today's terms, or project forward assuming historical average inflation rates. The average CPI inflation since 1913 is approximately 3.1% annually.`}
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
        tipsSection={`Model your personal inflation rate, not just headline CPI. If you spend heavily on healthcare, education, or urban real estate, your cost of living likely inflates faster than the general price level. This matters especially for retirement planning — a retiree spending heavily on healthcare faces a different inflation challenge than one with modest fixed expenses.

For retirement income planning: Social Security benefits automatically adjust for CPI inflation, making it one of the most valuable inflation-protected income sources available. Private pensions and annuities typically don't adjust for inflation — meaning their real purchasing power declines each year. This difference in inflation protection is a major reason to delay Social Security.

I Bonds and TIPS provide direct inflation protection in investment portfolios. Standard bonds and CDs don't — their fixed interest payments lose real value as inflation rises. Understanding which assets protect against inflation helps design a portfolio that maintains purchasing power.`}
        conclusion={`The most common inflation planning mistake: assuming retirement income needs in today's dollars when calculating whether you have enough. If you need $60,000/year today, you'll need approximately $109,000/year in 30 years at 2% inflation and $162,000/year at 3.3% inflation. Failing to inflation-adjust your retirement income target leads to serious under-saving.

Conversely, investments that compound above inflation — primarily equities over long periods — are the primary tool for maintaining and growing real wealth. Cash and bonds provide safety but typically don't grow real wealth over multi-decade periods. Use [our Real Return Calculator](/calculators/finance/real-return-calculator) to evaluate your investments on an inflation-adjusted basis.`}

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
      </div>
    </CalculatorLayout>
  )
}
