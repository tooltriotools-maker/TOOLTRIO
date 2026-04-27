'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts'
import { calculateCAGR } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { TrendingUp, Percent, Calendar, DollarSign } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt } = useCurrency()
  const [initialValue, setInitialValue] = useState(100000)
  const [finalValue, setFinalValue] = useState(350000)
  const [years, setYears] = useState(7)

  const result = useMemo(() => calculateCAGR(initialValue, finalValue, years), [initialValue, finalValue, years])
  const r = result as any

  const ruleOf72 = r.cagr > 0 ? (72 / r.cagr).toFixed(1) : '-'

  // Comparison: what if different CAGRs
  const comparison = [6, 8, 10, 12, 15].map(rate => ({
    rate: `${rate}%`,
    value: Math.round(initialValue * Math.pow(1 + rate / 100, years))
  }))

  return (
    <CalculatorLayout title="CAGR Calculator USA 2026" description="Calculate compound annual growth rate for stocks, real estate, and business revenue over any period." icon="📈" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Investment Details</h2>
          <div className="space-y-5">
            <InputField label="Initial Investment" value={initialValue} onChange={setInitialValue} min={1000} max={10000000} step={1000} prefix="$" />
            <InputField label="Final Value" value={finalValue} onChange={setFinalValue} min={1000} max={100000000} step={1000} prefix="$" />
            <InputField label="Investment Period (Years)" value={years} onChange={setYears} min={1} max={50} step={1} suffix="Yr" />
          </div>
          <div className="mt-5 p-4 rounded-xl bg-green-50 border border-green-200">
            <p className="text-xs text-green-700 font-bold mb-1">Rule of 72</p>
            <p className="text-2xl font-black text-green-700">{ruleOf72} years</p>
            <p className="text-xs text-green-600 mt-0.5">to double at this CAGR</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="CAGR" value={`${r.cagr?.toFixed(2) || 0}%`} highlight icon={<Percent className="w-4 h-4" />} />
            <ResultCard label="Total Gain" value={fmt(r.absoluteReturn || 0)} icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="Return %" value={`${r.percentReturn?.toFixed(1) || 0}%`} icon={<Percent className="w-4 h-4" />} />
            <ResultCard label="Time Period" value={`${years} Years`} icon={<Calendar className="w-4 h-4" />} />
          </div>

          {r.yearlyData?.length > 0 && (
            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-4">Growth Trajectory</h3>
              <div style={{ height: 240 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={r.yearlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="cG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#16a34a" stopOpacity={0.15} /><stop offset="95%" stopColor="#16a34a" stopOpacity={0} /></linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                    <XAxis dataKey="year" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} label={{ value: 'Year', position: 'insideBottom', offset: -2, fill: '#9ca3af', fontSize: 11 }} />
                    <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v, true)} width={70} />
                    <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number) => [fmt(v), '']} labelFormatter={y => `Year ${y}`} />
                    <Area type="monotone" dataKey="total" name="Portfolio Value" stroke="#16a34a" fill="url(#cG)" strokeWidth={2.5} dot={false} />
                    <Area type="monotone" dataKey="invested" name="Initial Investment" stroke="#93c5fd" fill="none" strokeWidth={1.5} strokeDasharray="5 4" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          )}

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-4">Rate Comparison - {years}-Year Horizon</h3>
            <div style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparison} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="rate" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v, true)} width={70} />
                  <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number) => [fmt(v), 'Value']} />
                  <Bar dataKey="value" name="Final Value" fill="#16a34a" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8">
      {/* 600-word SEO explanation */}
      <div className="mt-10">
        <Card>
          <h2 className="text-xl font-black text-gray-900 mb-4">CAGR Calculator - Master Compound Annual Growth Rate USA 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">What is CAGR and Why It's the Gold Standard for Returns?</h3>
              <p>CAGR (Compound Annual Growth Rate) is the steady rate at which an investment would have grown each year if it grew at a consistent rate. Unlike absolute return (total percentage gain), CAGR accounts for time - making it the ideal metric for comparing investments held over different periods. Formula: CAGR = (Final Value / Initial Value)^(1/Years) - 1. Example: $1 thousand grew to $2.5 thousands in 7 years. CAGR = (2.5)^(1/7) - 1 = 13.97%. This means the investment grew as if it earned exactly 13.97% every single year, even though actual year-by-year returns varied. CAGR smooths out volatility to reveal the true annualized performance.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">CAGR Benchmarks for Indian Investments</h3>
              <p>Understanding CAGR benchmarks helps evaluate your investments: S&amp;P 500 index: ~12% CAGR over 20 years. Sensex: ~13% CAGR since inception (1979). Large-cap mutual funds: 10-13% CAGR (10-year). Mid-cap funds: 14-18% CAGR (10-year). Small-cap funds: 15-20% CAGR (10-year, high volatility). Roth IRA: 7.1% CAGR (government guaranteed). FD: 6.5-7.75% CAGR. Gold: ~8% CAGR in rupee terms (20 years). Real estate (major US cities): 8-12% CAGR. Any investment delivering CAGR significantly above its category benchmark deserves scrutiny - unsustainably high returns are often a red flag.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">CAGR vs Absolute Return vs XIRR - Key Differences</h3>
              <p>Three return metrics serve different purposes: Absolute Return = (Final-Initial)/Initial x 100. Simple but ignores time. Best for: comparing returns within the same time period. CAGR = annualized return for a single lump-sum investment. Best for: comparing lump-sum investments across different time horizons. XIRR = Extended Internal Rate of Return = handles multiple cash flows (SIPs, partial withdrawals) on different dates. Best for: evaluating SIP investments or portfolios with irregular cash flows. For mutual fund fact sheets, the returns shown for 1Y, 3Y, 5Y periods are CAGR figures (assuming lump-sum investment).</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">The Rule of 72 - CAGR\'s Best Friend</h3>
              <p>The Rule of 72 works hand-in-hand with CAGR: Years to double = 72 / CAGR%. At 6% CAGR: doubles in 12 years. At 9% CAGR: doubles in 8 years. At 12% CAGR: doubles in 6 years. At 15% CAGR: doubles in 4.8 years. At 18% CAGR: doubles in 4 years. This powerful rule shows why even small improvements in CAGR dramatically accelerate wealth creation. Improving your portfolio CAGR from 10% to 14% cuts your wealth-doubling time from 7.2 years to 5.1 years - meaning you can achieve the same financial goal more than 2 years sooner.</p>
            </div>
          </div>
        </Card>
      </div>

            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          CAGR Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this CAGR USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          CAGR Calculator Example (USA Investment 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, if your portfolio grew from $50,000 to $185,000 in 12 years, your CAGR calculator USA 2026 shows an annualized return of 11.4% — validating your long-term investment strategy.
        </p>
      </Card>

            <SEOContent
        title="CAGR Calculator USA – What Is the True Annual Growth Rate of Your Investment in 2026?"
        category="finance"
        intro={`Compound annual growth rate is the single most useful number for comparing investments that grew at irregular rates over time. A $10,000 investment that's worth $24,500 after 9 years grew at a CAGR of 10.5% — meaning if it had grown at exactly 10.5% every year, you'd have reached the same endpoint. The actual year-by-year performance doesn't matter for the CAGR calculation; only the start value, end value, and time period.

Where CAGR is most useful: comparing two investments over the same period when one had steady growth and the other had volatile returns. CAGR smooths out the volatility to give you the equivalent annual rate. It's also essential for evaluating marketing claims about investment products — an investment that 'grew 143%' sounds impressive until you realize it took 15 years, which is only a 6% CAGR.

CAGR's limitation is that it hides volatility entirely. An investment with a 10% CAGR might have lost 40% in year 3 and gained 80% in year 4. CAGR tells you nothing about the ride — only the destination.`}
        howItWorks={`CAGR formula: CAGR = (Ending Value / Beginning Value)^(1/n) - 1, where n is the number of years. Example: $10,000 growing to $24,500 over 9 years = (24,500/10,000)^(1/9) - 1 = 2.45^0.111 - 1 = 0.1048 = 10.48% CAGR.

Present to future value: FV = PV × (1 + CAGR)^n. This lets you project what a given CAGR produces over different time periods, or solve for how much your investment needs to grow annually to reach a future target.

Rule of 72: Divide 72 by the CAGR to estimate how many years it takes to double your money. At 8% CAGR, your money doubles every 9 years. At 12% CAGR, every 6 years. This quick mental math helps contextualize CAGR claims instantly.`}
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
        tipsSection={`Always specify the time period when citing or comparing CAGR figures. A 10% CAGR from 2009-2019 includes the recovery from the 2008-2009 market crash — starting periods matter enormously. Compare investments over the same periods to make meaningful comparisons.

For investment accounts with contributions, CAGR isn't the right metric — you want XIRR (Extended Internal Rate of Return) which accounts for the timing and size of each contribution and withdrawal. Use the [XIRR Calculator](/calculators/finance/xirr-calculator) for portfolios with irregular cash flows.

For business planning, use CAGR to model revenue growth targets. If your revenue was $500,000 last year and you need $1,500,000 in 5 years, that's a 24.6% CAGR — evaluate whether that growth rate is realistic in your market.`}
        conclusion={`The S&P 500's historical CAGR is approximately 10% nominal (7% real, after inflation) since 1957. Warren Buffett's Berkshire Hathaway achieved roughly 20% CAGR from 1965-2022. The difference between these rates over 50+ years is the difference between ordinary wealth and extraordinary wealth — which illustrates why small differences in long-run returns compound into enormous differences in outcomes.

Use CAGR alongside the [Real Return Calculator](/calculators/finance/real-return-calculator) to understand your inflation-adjusted performance — the number that actually matters for purchasing power.`}

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
