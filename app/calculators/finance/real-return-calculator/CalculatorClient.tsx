'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { calculateRealReturn } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt } = useCurrency()
  const [nominalReturn, setNominalReturn] = useState(10)
  const [inflationRate, setInflationRate] = useState(3)
  const [amount, setAmount] = useState(10000)
  const [years, setYears] = useState(20)

  const result = useMemo(() => calculateRealReturn(nominalReturn, inflationRate, amount, years), [nominalReturn, inflationRate, amount, years])

  return (
    <CalculatorLayout title="Real Return Calculator USA 2026" description="Calculate your inflation-adjusted real return vs nominal return for any investment." icon="📉" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h2 className="text-lg font-bold text-gray-900 mb-5">Investment Details</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Investment Amount</label>
              <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} className="w-full pl-7 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500" /></div>
            </div>
            {[
              { label: `Nominal Return: ${nominalReturn}%`, val: nominalReturn, set: setNominalReturn, min: 0, max: 20, step: 0.5, color: 'text-green-600', accent: 'accent-green-600' },
              { label: `Inflation Rate: ${inflationRate}%`, val: inflationRate, set: setInflationRate, min: 0, max: 12, step: 0.5, color: 'text-red-500', accent: 'accent-red-500' },
              { label: `Time Horizon: ${years} years`, val: years, set: setYears, min: 1, max: 40, step: 1, color: 'text-blue-600', accent: 'accent-blue-600' },
            ].map(f => (
              <div key={f.label}>
                <label className="block text-sm font-semibold text-gray-700 mb-1"><span className={f.color}>{f.label}</span></label>
                <input type="range" min={f.min} max={f.max} step={f.step} value={f.val} onChange={e => f.set(Number(e.target.value))} className={`w-full ${f.accent}`} />
              </div>
            ))}
          </div>

          {/* Fisher equation */}
          <div className="mt-5 p-3 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-xs text-gray-500 font-medium mb-1">Fisher Equation</p>
            <p className="text-sm font-mono text-gray-800">Real = ({nominalReturn}% - {inflationRate}%) / (1 + {inflationRate/100})</p>
            <p className="text-lg font-black text-blue-600 mt-1">= {result.realReturnRate.toFixed(2)}% real</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-red-50 border border-gray-200 rounded-2xl p-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Nominal Value (in {years}y)</p>
                <p className="text-2xl font-black text-gray-900">{fmt(result.nominalFV)}</p>
                <p className="text-xs text-gray-400 mt-0.5">At {nominalReturn}% nominal</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Real Value (today's purchasing power)</p>
                <p className="text-2xl font-black text-blue-700">{fmt(result.realFV)}</p>
                <p className="text-xs text-red-500 mt-0.5">-{fmt(result.inflationImpact)} eaten by inflation</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Real Return Rate" value={`${result.realReturnRate.toFixed(2)}%`} subValue="After inflation" highlight />
            <ResultCard label="Inflation Impact" value={fmt(result.inflationImpact)} subValue="Purchasing power lost" />
            <ResultCard label="Purchasing Power Loss" value={`${result.purchasingPowerLoss}%`} subValue={`Of nominal gains`} />
          </div>

          <Card>
            <h3 className="font-bold text-gray-900 mb-4">Nominal vs Real Growth Over {years} Years</h3>
            <ResponsiveContainer width="100%" height={230}>
              <AreaChart data={result.yearData}>
                <defs>
                  <linearGradient id="nominalGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="realGrad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" tickFormatter={v => `Y${v}`} tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, '']} />
                <Legend />
                <Area type="monotone" dataKey="nominal" stroke="#16a34a" fill="url(#nominalGrad)" name="Nominal Value" strokeWidth={2} />
                <Area type="monotone" dataKey="real" stroke="#3b82f6" fill="url(#realGrad2)" name="Real Value (today\'s $)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>

            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Real Return Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Real Return USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      <SEOContent
        title="Real Return Calculator USA – What Is Your Investment's True Return After Inflation in 2026?"
        category="finance"
        intro={`Nominal returns are what your broker reports. Real returns — adjusted for inflation — are what actually matter for your purchasing power and retirement security. A 10% annual return in a year with 4% inflation is really a 5.77% real return. A 7% return with 2% inflation is 4.9% real. Over 30 years, the difference between these numbers is the difference between comfortable retirement and financial stress.

The historical real return of the S&P 500 has been approximately 6.5-7% annually since 1926 — after subtracting historical average inflation of about 3%. But this average hides significant periods where inflation outpaced equity returns: the 1970s saw equities deliver negative real returns for much of the decade as inflation ran at 7-9% annually. Understanding when and how inflation has defeated equities is as important as the long-run average.

For fixed income investors — holding bonds, CDs, or savings accounts — the real return question is even more pressing. A 5% CD in a 6% inflation year destroys purchasing power even while paying nominal interest. In 2022, when US inflation peaked at 9.1%, virtually every bond and savings instrument was generating deeply negative real returns.`}
        howItWorks={`Real return formula: r_real = (1 + r_nominal) / (1 + r_inflation) - 1. Simplified: r_real ≈ r_nominal - r_inflation (approximation works well for low rates). For 8% nominal and 2.5% inflation: real return = (1.08/1.025) - 1 = 5.37%, or approximately 8% - 2.5% = 5.5% (approximation).

Historical real returns (approximate US annualized, 1926-2024): US large-cap equities: 6.8% real. Intermediate-term government bonds: 2.3% real. Treasury bills: 0.4% real. Gold: 1.0-1.5% real. Cash under mattress: -3.1% real (inflation only).

Inflation adjustment to portfolio: Current portfolio value in today's purchasing power = Portfolio value / (1 + cumulative inflation). A $1,000,000 portfolio when CPI was 200, and today CPI is 260: real value = $1,000,000 × (200/260) = $769,231 in original purchasing power terms.`}
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
        tipsSection={`Always run both nominal and real return projections for long-term financial goals. Retirement calculations that use nominal returns without inflation adjustment significantly overstate what your money will actually buy when you need it.

For comparing investments across different time periods, use real returns. Comparing a 15% nominal return in 1980 (with 13% inflation) to a 9% return in 2015 (with 1% inflation) without inflation adjustment gives a completely misleading picture of which was the better investment result.

For spending-based goals in retirement, model your required real return: if you need your portfolio to maintain purchasing power and fund 4% withdrawals annually, your real return must be 4%+ after fees. This determines your required asset allocation.`}
        conclusion={`The most overlooked inflation risk is in near-retirement portfolios that shift heavily to bonds and CDs. A portfolio generating 4% nominal return with 3% inflation earns only 1% real return — not enough to sustain 4% withdrawals without portfolio depletion. Inflation forces retirees to maintain some equity exposure throughout retirement, not just during accumulation.

For the inflation-hedging portion of a portfolio, I Bonds, TIPS, real estate, and commodity exposure (through diversified funds) have varying but meaningful inflation correlations. Use [our Inflation Calculator](/calculators/finance/inflation-calculator) alongside this to understand how specific inflation scenarios affect your specific financial goals.`}

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
        {/* Internal Links */}
        {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },          { name: "Simple Interest Calculator", href: "/calculators/finance/simple-interest-calculator", icon: "📊", desc: "Free calculator" },          { name: "Inflation Calculator", href: "/calculators/finance/inflation-calculator", icon: "📉", desc: "Free calculator" },          { name: "XIRR Calculator", href: "/calculators/finance/xirr-calculator", icon: "📊", desc: "Free calculator" },          { name: "Currency Converter Calculator", href: "/calculators/finance/currency-converter", icon: "💱", desc: "Free calculator" },          { name: "Currency Profit Calculator", href: "/calculators/finance/currency-profit-calculator", icon: "📊", desc: "Free calculator" },          { name: "Tip Calculator", href: "/calculators/finance/tip-calculator", icon: "💵", desc: "Free calculator" },          { name: "ROI Calculator", href: "/calculators/finance/roi-calculator", icon: "📈", desc: "Free calculator" },          { name: "P/E Ratio Calculator", href: "/calculators/finance/pe-ratio-calculator", icon: "📊", desc: "Free calculator" },          { name: "CAGR Calculator", href: "/calculators/finance/cagr-calculator", icon: "📊", desc: "Free calculator" },          { name: "Crypto Profit Calculator", href: "/calculators/finance/crypto-profit-calculator", icon: "₿", desc: "Free calculator" },          { name: "Stock Profit Calculator", href: "/calculators/finance/stock-profit-calculator", icon: "💹", desc: "Free calculator" },
          ]}
        />

    </CalculatorLayout>
  )
}
