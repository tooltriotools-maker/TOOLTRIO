'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts'
import { calculateMutualFundReturn } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { DollarSign, TrendingUp, Percent, Info } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, currency } = useCurrency()
  const [amount, setAmount] = useState(500000)
  const [returnRate, setReturnRate] = useState(12)
  const [years, setYears] = useState(10)
  const [expenseRatio, setExpenseRatio] = useState(1.5)

  const result = useMemo(() => calculateMutualFundReturn(amount, returnRate, years, expenseRatio), [amount, returnRate, years, expenseRatio])
  const r = result as any

  // Compare expense ratios
  const expenseComparison = [0.1, 0.5, 1.0, 1.5, 2.0, 2.5].map(er => {
    const res = calculateMutualFundReturn(amount, returnRate, years, er) as any
    return { er: `${er}%`, value: res.finalValue || 0, cost: res.expenseCost || 0 }
  })

  return (
    <CalculatorLayout title="Mutual Fund Calculator USA 2026" description="See how expense ratios and fees erode long-term returns compared to low-cost index funds." icon="📊" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Fund Details</h2>
          <div className="space-y-5">
            <InputField label="Investment Amount" value={amount} onChange={setAmount} min={1000} max={100000000} step={1000} prefix={currency.symbol} />
            <InputField label="Expected Annual Return" value={returnRate} onChange={setReturnRate} min={1} max={30} step={0.5} suffix="%" />
            <InputField label="Investment Period" value={years} onChange={setYears} min={1} max={40} step={1} suffix="Yr" />
            <InputField label="Expense Ratio" value={expenseRatio} onChange={setExpenseRatio} min={0.1} max={3} step={0.1} suffix="%" />
          </div>
          <div className="mt-5 p-4 rounded-xl bg-red-50 border border-red-200">
            <p className="text-xs text-red-700 font-bold mb-1">💸 Expense Ratio Cost</p>
            <p className="text-xl font-black text-red-700">{fmt(r.expenseCost || 0, true)}</p>
            <p className="text-xs text-red-600 mt-0.5">lost to expense ratio over {years} years</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Net Final Value" value={fmt(r.finalValue || 0)} highlight icon={<DollarSign className="w-4 h-4" />} />
            <ResultCard label="Gross Return" value={fmt(r.grossReturn || 0)} icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="Expense Cost" value={fmt(r.expenseCost || 0)} icon={<Percent className="w-4 h-4" />} />
            <ResultCard label="Net Return %" value={`${(returnRate - expenseRatio).toFixed(1)}%`} icon={<Percent className="w-4 h-4" />} />
          </div>

          {r.yearlyData?.length > 0 && (
            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-4">Gross vs Net Value Over Time</h3>
              <div style={{ height: 240 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={r.yearlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="mfG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#16a34a" stopOpacity={0.15} /><stop offset="95%" stopColor="#16a34a" stopOpacity={0} /></linearGradient>
                      <linearGradient id="mfGross" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#93c5fd" stopOpacity={0.15} /><stop offset="95%" stopColor="#93c5fd" stopOpacity={0} /></linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                    <XAxis dataKey="year" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v, true)} width={70} />
                    <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number) => [fmt(v), '']} labelFormatter={y => `Year ${y}`} />
                    <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
                    <Area type="monotone" dataKey="grossValue" name="Gross Value (no expense)" stroke="#93c5fd" fill="url(#mfGross)" strokeWidth={1.5} dot={false} />
                    <Area type="monotone" dataKey="netValue" name="Net Value (after expense)" stroke="#16a34a" fill="url(#mfG)" strokeWidth={2.5} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          )}

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
              Expense Ratio Impact Comparison
              <span className="text-xs text-gray-400 font-normal flex items-center gap-1"><Info className="w-3 h-3" /> Lower is always better</span>
            </h3>
            <div style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={expenseComparison} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="er" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v, true)} width={70} />
                  <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number) => [fmt(v), '']} />
                  <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
                  <Bar dataKey="value" name="Final Value" fill="#16a34a" radius={[4, 4, 0, 0]} stackId="a" />
                  <Bar dataKey="cost" name="Lost to Expense" fill="#fca5a5" radius={[4, 4, 0, 0]} stackId="a" />
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
          <h2 className="text-xl font-black text-gray-900 mb-4">Mutual Fund Returns Calculator - Impact of Expense Ratio on Wealth 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">How Expense Ratio Impacts Long-Term Mutual Fund Returns</h3>
              <p>The expense ratio is the annual fee charged by an AMC to manage your mutual fund investment, expressed as a percentage of assets under management (AUM). Typical expense ratios: Direct plan index funds: 0.05-0.2%. Direct plan active large-cap: 0.5-1%. Direct plan active mid/small-cap: 1-1.5%. Regular plan (via distributor): Add 0.5-1% to above. SEC mandates maximum expense ratios: 2.25% for equity funds above $500 million AUM. While 1% seems small, its long-term impact is enormous due to compounding. Our calculator shows exactly how much less you accumulate by paying higher expenses.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Direct vs Regular Plan - The Expense Ratio Difference</h3>
              <p>Direct plans have lower expense ratios than regular plans because they eliminate distributor commission. For the same mutual fund: Regular plan: 1.5-2% expense ratio. Direct plan: 0.5-1% expense ratio. Difference: ~1% per year. On $10 thousands invested for 20 years at 12% gross return: Regular plan (at 11%): $80.6 thousands. Direct plan (at 12%): $96.5 thousands. Difference: $15.9 thousands on just $10 thousand investment! Always invest in direct plans if you're a self-directed investor. If you need advice, pay a fee-only financial advisor ($5,000-20,000 per plan) rather than paying 1% annually through regular plans.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Active vs Passive Funds - Expense Ratio Context</h3>
              <p>The active vs passive debate centers on whether active fund managers can outperform index funds after expenses. Studies show: Over 10-year periods, 60-70% of active large-cap funds in the US underperform the S&amp;P 500 after expenses. For mid-cap and small-cap, active funds have had more success historically (65-70% outperform). The expense ratio differential matters hugely here: Index fund at 0.1% expense ratio needs to beat an active fund at 1.5% by only 1.4% to match net returns. When evaluating active funds, always check performance vs benchmark net of expense ratio over 5-10 year periods, not just raw returns.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">SEC / FINRA Data - Key Mutual Fund Industry Facts India</h3>
              <p>India\'s mutual fund industry facts (SEC / FINRA data, 2026): Total AUM: $60+ trillion (one of the fastest-growing MF markets). Total folios: 18+ million (individual accounts). SIP accounts: 9+ million active SIPs. Monthly SIP flows: $25,000+ million. Equity fund inflows: Consistently positive through market volatility, showing growing investor maturity. Top fund categories by AUM: Flexi-cap, Large & Mid-cap, tax-advantaged mutual fund. The Indian MF market is growing at 15-20% CAGR, driven by financialization of savings, digital platforms, and increasing financial literacy. Understanding expense ratios helps you participate efficiently in this growth.</p>
            </div>
          </div>
        </Card>
      </div>

            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Mutual Fund Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Mutual Fund USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      <SEOContent
        title="Mutual Fund Calculator USA – How Much Do Fund Fees Cost You Over 20-30 Years in 2026?"
        category="finance"
        intro={`Mutual funds are the primary investment vehicle for most Indian retail investors, and the explosion of SIP adoption over the past decade has fundamentally changed how middle-class Indians build wealth. The math of mutual fund compounding is straightforward; the factors that actually determine outcomes — fund selection, regular investing, low expense ratios, and staying invested through volatility — are behavioral as much as mathematical.

The expense ratio difference between regular plans (distributed through brokers) and direct plans (purchased directly from AMC or through direct platforms) is typically 0.5-1.5% annually. On a ₹10 lakh investment at 12% gross return over 20 years, the difference between a 0.3% expense ratio (direct plan) and a 1.5% expense ratio (regular plan) compounds to approximately ₹28 lakh in additional wealth — entirely from lower fees. This is not a small number.

Historical returns for diversified equity funds in India have been strong: Nifty 50 index funds have returned approximately 12-14% CAGR over 10-20 year periods. Actively managed large-cap funds have struggled to consistently beat this benchmark after expenses, which is why index fund adoption has accelerated globally and increasingly in India.`}
        howItWorks={`Mutual fund growth calculation: For lump sum: FV = P × (1 + r)^n. For SIP: FV = PMT × [(1+r/12)^n - 1] / (r/12). The expense ratio reduces the net return: effective return = fund's gross return - expense ratio - other costs. A fund earning 13% gross with 1.5% expense = 11.5% net return.

CAGR of existing investment: If you invested ₹5 lakh 8 years ago and it's now worth ₹14 lakh, CAGR = (14/5)^(1/8) - 1 = 13.7%. This calculation helps evaluate how your existing funds have actually performed versus benchmark.

Absolute return vs CAGR: Absolute return = (Current NAV - Purchase NAV) / Purchase NAV × 100. If NAV was ₹20 at purchase and is ₹46 now: 130% absolute return over 8 years = 13.7% CAGR. CAGR is more useful for comparing investments held for different periods.`}
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
        tipsSection={`Use direct plans for all mutual fund investments. The expense ratio difference between regular and direct plans is pure cost with no benefit to you — regular plan commissions go to the distributor, not to better performance or advice. Platforms like Coin by Zerodha, Groww, and Paytm Money facilitate direct plan investing at no additional cost.

For goal-based investing, match fund type to investment horizon: liquid or ultra-short funds for money needed within 1 year, short/medium duration debt funds for 1-3 years, hybrid funds for 3-5 years, and equity funds for 5+ year goals. Time horizon is the most important factor in fund category selection.

Review your mutual fund portfolio annually: check if funds are consistently underperforming their benchmark over 3-5 years (not 1 year — short-term underperformance is normal), verify expense ratios haven't changed, and rebalance to target allocation if equity/debt split has drifted significantly.`}
        conclusion={`The single most important mutual fund decision for most investors is simply to start and then stay invested consistently. Market timing — waiting for 'the right moment' to invest — has been shown repeatedly to hurt investor returns relative to simple SIP investing. The best time to start a SIP was yesterday; the second-best time is today.

For long-term wealth building, Nifty 50 or Nifty 500 index funds represent a low-cost, low-effort core strategy that beats most actively managed alternatives after fees over long periods. Adding a small/mid-cap index fund for higher growth potential and an international index fund for diversification is a complete portfolio strategy for most investors. Use [our SIP Calculator](/calculators/finance/sip-calculator) for detailed SIP return projections.`}

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
