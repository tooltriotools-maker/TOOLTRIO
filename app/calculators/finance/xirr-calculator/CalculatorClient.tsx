'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { calculateXIRR } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Plus, Trash2, Percent, TrendingUp } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }
interface CashflowEntry { date: string; amount: number; id: number }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt } = useCurrency()
  const [entries, setEntries] = useState<CashflowEntry[]>([
    { id: 1, date: '2021-01-01', amount: -100000 },
    { id: 2, date: '2022-01-01', amount: -50000 },
    { id: 3, date: '2023-01-01', amount: -50000 },
    { id: 4, date: '2024-06-01', amount: 280000 },
  ])
  const [nextId, setNextId] = useState(5)

  const xirr = useMemo(() => {
    try {
      const cashflows = entries.map(e => ({ date: new Date(e.date), amount: e.amount }))
      return calculateXIRR(cashflows) as any
    } catch { return { xirr: null, error: 'Need at least one positive and one negative cashflow' } }
  }, [entries])

  const addEntry = () => {
    const lastDate = entries[entries.length - 1]?.date || '2024-01-01'
    const d = new Date(lastDate); d.setFullYear(d.getFullYear() + 1)
    setEntries([...entries, { id: nextId, date: d.toISOString().split('T')[0], amount: 0 }])
    setNextId(nextId + 1)
  }
  const removeEntry = (id: number) => setEntries(entries.filter(e => e.id !== id))
  const updateEntry = (id: number, field: 'date' | 'amount', value: string | number) =>
    setEntries(entries.map(e => e.id === id ? { ...e, [field]: value } : e))

  const totalInvested = entries.filter(e => e.amount < 0).reduce((s, e) => s + Math.abs(e.amount), 0)
  const totalReturned = entries.filter(e => e.amount > 0).reduce((s, e) => s + e.amount, 0)
  const chartData = entries.map(e => ({
    label: new Date(e.date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
    amount: e.amount,
  }))

  return (
    <CalculatorLayout title="XIRR Calculator USA 2026" description="Calculate the true annualized return for investment portfolios with multiple irregular cash flows." icon="📐" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h2 className="text-base font-bold text-gray-900 mb-4">Cashflow Entries</h2>
          <p className="text-xs text-gray-500 mb-4 bg-amber-50 p-2 rounded-lg border border-amber-200">Use <strong>negative</strong> for investments/outflows and <strong>positive</strong> for returns/redemptions.</p>
          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {entries.map(e => (
              <div key={e.id} className="flex items-center gap-2 p-2 rounded-xl bg-gray-50 border border-gray-100">
                <input type="date" value={e.date} onChange={ev => updateEntry(e.id, 'date', ev.target.value)}
                  className="flex-1 text-xs bg-white border border-gray-200 rounded-lg px-2 py-1.5 outline-none focus:border-green-500 min-w-0" />
                <input type="number" value={e.amount} onChange={ev => updateEntry(e.id, 'amount', Number(ev.target.value))}
                  className={`w-28 text-xs bg-white border rounded-lg px-2 py-1.5 outline-none focus:border-green-500 text-right font-bold ${e.amount < 0 ? 'text-red-600 border-red-200' : 'text-green-600 border-green-200'}`} />
                <button onClick={() => removeEntry(e.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
          <button onClick={addEntry} className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-dashed border-green-300 text-green-600 text-sm font-bold hover:bg-green-50 transition-colors">
            <Plus className="w-4 h-4" /> Add Cashflow
          </button>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-center">
              <p className="text-xs text-red-600 font-semibold">Total Invested</p>
              <p className="text-sm font-black text-red-700 mt-0.5">{fmt(totalInvested, true)}</p>
            </div>
            <div className="p-3 rounded-xl bg-green-50 border border-green-100 text-center">
              <p className="text-xs text-green-600 font-semibold">Total Returns</p>
              <p className="text-sm font-black text-green-700 mt-0.5">{fmt(totalReturned, true)}</p>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <ResultCard label="XIRR (Annual Return)" value={xirr.xirr != null ? `${(xirr.xirr * 100).toFixed(2)}%` : 'N/A'} highlight icon={<Percent className="w-4 h-4" />} />
            <ResultCard label="Absolute Gain/Loss" value={fmt(totalReturned - totalInvested)} icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="Total Return %" value={totalInvested > 0 ? `${((totalReturned - totalInvested) / totalInvested * 100).toFixed(1)}%` : '-'} icon={<TrendingUp className="w-4 h-4" />} />
          </div>

          {xirr.error && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
              <p className="text-sm text-amber-700 font-semibold">⚠️ {xirr.error}</p>
            </div>
          )}

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-4">Cashflow Visualization</h3>
            <div style={{ height: 240 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="label" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => fmt(Math.abs(v), true)} width={65} />
                  <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number) => [fmt(Math.abs(v)), v < 0 ? '🔴 Investment' : '🟢 Return']} />
                  <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, i) => <Cell key={i} fill={entry.amount < 0 ? '#fca5a5' : '#16a34a'} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-2">
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-300" /><span className="text-xs text-gray-600">Investment (outflow)</span></div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-green-600" /><span className="text-xs text-gray-600">Return (inflow)</span></div>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-3">XIRR vs CAGR: What's the Difference?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                <p className="font-bold text-blue-700 text-sm mb-1">CAGR</p>
                <p className="text-xs text-blue-600 leading-relaxed">Single lump-sum investment, fixed start and end date. Simple compound growth calculation.</p>
              </div>
              <div className="p-4 rounded-xl bg-green-50 border border-green-200">
                <p className="font-bold text-green-700 text-sm mb-1">XIRR (recommended)</p>
                <p className="text-xs text-green-600 leading-relaxed">Multiple cashflows on different dates. The correct way to measure SIP and portfolio returns.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8">
      {/* 600-word SEO explanation */}
      <div className="mt-10">
        <Card>
          <h2 className="text-xl font-black text-gray-900 mb-4">XIRR Calculator - True Annualized Return for Your SIP Investments USA 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">What is XIRR and How is it Different from CAGR?</h3>
              <p>XIRR (Extended Internal Rate of Return) calculates the annualized return for a series of cash flows that occur on different dates. It\'s the most accurate return metric for SIP investments because SIPs involve multiple investments on different dates, which simple CAGR cannot handle. CAGR works only for a single lump sum invested at one point in time. XIRR solves the problem: if you invested $5,000 on 12 different dates over a year and the portfolio is now worth $65,000, what was your annualized return? XIRR answers this precisely, accounting for the exact timing of each investment. US mutual fund / ETFs, PMS providers, and SEC / FINRA all report SIP returns as XIRR.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">How XIRR is Calculated?</h3>
              <p>XIRR finds the discount rate that makes the Net Present Value (NPV) of all cash flows equal to zero. Cash flows are negative for investments (money out) and positive for the current value (money in when redeemed). The calculation uses iterative numerical methods and cannot be done by hand - but Excel\'s =XIRR() function and our calculator handle it instantly. Input format: dates of each SIP investment (negative amounts), current portfolio value as a positive amount on today\'s date. The XIRR function finds the rate r such that: Sum of [Cash Flow / (1+r)^(Days/365)] = 0. This time-weighted rate is the true annualized return on your SIP.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Typical XIRR for SIPs in the USn Mutual Funds</h3>
              <p>Real-world XIRR benchmarks for Indian index fund DCAs (10-year periods as of 2026): S&amp;P 500 index funds: 11-13% XIRR. Large-cap active funds: 10-13% XIRR. Flexi-cap/multi-cap funds: 12-15% XIRR. Mid-cap funds: 14-18% XIRR. Small-cap funds: 15-22% XIRR (high variance - some periods much lower). Debt mutual funds: 6-8% XIRR. Note: XIRR varies significantly based on the start date of SIP - starting during a market high vs a market low can differ by 5-8% XIRR over 10 years. Longer SIP tenures (10+ years) tend to normalize XIRR regardless of start date.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">When XIRR Can Be Misleading</h3>
              <p>XIRR has limitations to understand: (1) Recent performance bias - if markets rose sharply in the last 6 months, XIRR looks great even if 4 years were flat. (2) Doesn\'t account for risk - a 15% XIRR small-cap fund carried much more volatility than a 12% XIRR large-cap fund. (3) Requires consistent inputs - missing SIP dates or incorrect amounts distort results. (4) Short-period XIRR is highly volatile - 1-year XIRR can swing from -30% to +60% depending on market timing. Always evaluate XIRR over at least 5-7 year periods for meaningful comparison. Use XIRR alongside other metrics: standard deviation, Sharpe ratio, and benchmark comparison for complete fund evaluation.</p>
            </div>
          </div>
        </Card>
      </div>


      {/* Internal Links */}
      {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },          { name: "Simple Interest Calculator", href: "/calculators/finance/simple-interest-calculator", icon: "📊", desc: "Free calculator" },          { name: "Inflation Calculator", href: "/calculators/finance/inflation-calculator", icon: "📉", desc: "Free calculator" },          { name: "Real Return Calculator", href: "/calculators/finance/real-return-calculator", icon: "📊", desc: "Free calculator" },          { name: "Currency Converter Calculator", href: "/calculators/finance/currency-converter", icon: "💱", desc: "Free calculator" },          { name: "Currency Profit Calculator", href: "/calculators/finance/currency-profit-calculator", icon: "📊", desc: "Free calculator" },          { name: "Tip Calculator", href: "/calculators/finance/tip-calculator", icon: "💵", desc: "Free calculator" },          { name: "ROI Calculator", href: "/calculators/finance/roi-calculator", icon: "📈", desc: "Free calculator" },          { name: "P/E Ratio Calculator", href: "/calculators/finance/pe-ratio-calculator", icon: "📊", desc: "Free calculator" },          { name: "CAGR Calculator", href: "/calculators/finance/cagr-calculator", icon: "📊", desc: "Free calculator" },          { name: "Crypto Profit Calculator", href: "/calculators/finance/crypto-profit-calculator", icon: "₿", desc: "Free calculator" },          { name: "Stock Profit Calculator", href: "/calculators/finance/stock-profit-calculator", icon: "💹", desc: "Free calculator" },
          ]}
        />
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          XIRR Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this XIRR USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      <SEOContent
        title="XIRR Calculator USA – Calculate the True Annualized Return on Any Investment with Irregular Cash Flows"
        category="finance"
        intro={`XIRR (Extended Internal Rate of Return) is the correct tool for measuring returns on investments with irregular cash flows — the situation that every real investor actually faces. Standard CAGR or simple percentage return calculations assume either a single lump sum investment or perfectly equal periodic investments. Real portfolios have uneven contributions, withdrawals at different times, and income reinvested at market prices. XIRR handles all of this correctly.

The most common scenario where XIRR matters: evaluating your SIP mutual fund investment where you've contributed different amounts in different months, had some months with no contribution, and want to know what annual return rate you've actually earned on your total cash deployed. A fund's stated CAGR and your personal XIRR will differ — often significantly — based on when you were most heavily invested during the fund's performance history.

XIRR also correctly handles mixed cash flows in real estate investments (purchase price, rental income, improvement costs, refinancing proceeds, and eventual sale price all at different dates), corporate bond investments with coupon payments at irregular intervals, and private equity investments with capital calls and distributions over time.`}
        howItWorks={`XIRR calculation: Finds the rate r that solves: Sum of [Cash Flow_i / (1+r)^(days_i/365)] = 0, where cash flows include all outflows (contributions, purchase prices) as negative numbers and all inflows (withdrawals, dividends, sale proceeds, current market value) as positive numbers, with the time measured in days from a reference date.

Excel/Sheets implementation: =XIRR(cash_flows_range, dates_range). Cash flows: each contribution as negative (-10000), each withdrawal as positive. The final 'inflow' is the current portfolio market value — this converts the open investment to a comparable exit.

Vs CAGR: CAGR assumes one investment at the start growing to one value at the end. XIRR handles multiple cash flows at multiple dates. Example: invested £1,000 at start, £1,000 one year later, now worth £2,800 after 2 years. CAGR on total invested (£2,000 → £2,800) = 18.3%. XIRR accurately reflects that the second £1,000 had only 1 year to grow and is approximately 20.0% — a more useful representation.`}
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
        tipsSection={`When calculating XIRR for ongoing investments, include the current portfolio market value as the final cash inflow dated today. This 'marks to market' the investment as if you sold at today's price and converts an open investment into a comparable return calculation.

For SIP mutual fund performance: use the actual dates and amounts of each SIP installment as negative cash flows, and the current total portfolio value as the final positive cash flow. This XIRR tells you your actual personal return — which may differ substantially from the fund's published returns depending on how your contribution timing aligned with the fund's NAV history.

For buy-to-let property XIRR: include deposit payment, stamp duty, any renovation costs, and legal fees as initial negative outflows; monthly rental income net of costs as positive inflows throughout; and the projected or actual sale proceeds net of agent fees and CGT as the final positive inflow. This complete picture is the true ROI.`}
        conclusion={`XIRR is particularly revealing for investors who've been investing for 5-10+ years through multiple market cycles. Many investors believe they've earned the market's historical return but have actually significantly under- or over-performed it depending on when they were most heavily invested. Running your actual cash flows through XIRR against the same period's index XIRR shows whether your timing, fund selection, or contribution pattern has helped or hurt your personal returns.

For financial modeling where XIRR is needed: Microsoft Excel's XIRR function, Google Sheets XIRR, and Python's numpy_financial.xirr all implement the same algorithm. When the XIRR function fails to converge (common with unusual cash flow patterns), provide a 'guess' starting value of 0.1 (10%) to help the solver find the solution.`}

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
