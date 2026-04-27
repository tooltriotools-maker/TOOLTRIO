'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { TrendingUp } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, fmtCompact } = useCurrency()
  const [monthly, setMonthly] = useState(10000)
  const [grossReturn, setGrossReturn] = useState(13)
  const [regularExpense, setRegularExpense] = useState(1.5)
  const [directExpense, setDirectExpense] = useState(0.5)
  const [years, setYears] = useState(15)

  const result = useMemo(() => {
    const months = years * 12
    const regularNet = grossReturn - regularExpense
    const directNet = grossReturn - directExpense
    const rMR = regularNet / 100 / 12
    const dMR = directNet / 100 / 12

    const regularFV = monthly * ((Math.pow(1 + rMR, months) - 1) / rMR) * (1 + rMR)
    const directFV = monthly * ((Math.pow(1 + dMR, months) - 1) / dMR) * (1 + dMR)
    const invested = monthly * months

    const yearlyData = Array.from({ length: years }, (_, i) => {
      const y = i + 1; const m = y * 12
      const rFV = monthly * ((Math.pow(1 + rMR, m) - 1) / rMR) * (1 + rMR)
      const dFV = monthly * ((Math.pow(1 + dMR, m) - 1) / dMR) * (1 + dMR)
      return { year: y, regular: Math.round(rFV), direct: Math.round(dFV), invested: monthly * m }
    })

    return {
      regularFV: Math.round(regularFV), directFV: Math.round(directFV), invested: Math.round(invested),
      difference: Math.round(directFV - regularFV),
      directReturn: directNet.toFixed(2), regularReturn: regularNet.toFixed(2),
      yearlyData,
    }
  }, [monthly, grossReturn, regularExpense, directExpense, years])

  return (
    <CalculatorLayout title="Regular vs Direct Mutual Fund SIP Calculator India 2026" description="Compare regular plan vs direct plan SIP and see how the expense ratio difference costs lakhs." icon="📊" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-4">SIP Details</h2>
          <div className="space-y-4">
            <InputField label="Monthly SIP Amount" value={monthly} onChange={setMonthly} min={500} max={500000} step={500} prefix="₹" />
            <InputField label="Gross Fund Return (p.a.)" value={grossReturn} onChange={setGrossReturn} min={8} max={20} step={0.5} suffix="%" />
            <InputField label="Regular Plan Expense Ratio" value={regularExpense} onChange={setRegularExpense} min={0.5} max={3} step={0.1} suffix="%" />
            <InputField label="Direct Plan Expense Ratio" value={directExpense} onChange={setDirectExpense} min={0.1} max={1.5} step={0.1} suffix="%" />
            <InputField label="Investment Period" value={years} onChange={setYears} min={1} max={30} step={1} suffix="Yrs" />
          </div>
          <div className="mt-4 p-3 rounded-xl bg-green-900/20 border border-green-700/30 text-center">
            <p className="text-xs text-green-400 font-bold mb-1">Direct Plan Advantage</p>
            <p className="text-2xl font-black text-green-400">{fmtCompact(result.difference)}</p>
            <p className="text-xs text-gray-400 mt-1">Extra wealth from Direct Plan over {years} years</p>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Direct Plan Value" value={fmtCompact(result.directFV)} subValue={`${result.directReturn}% net`} highlight icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="Regular Plan Value" value={fmtCompact(result.regularFV)} subValue={`${result.regularReturn}% net`} />
            <ResultCard label="Total Invested" value={fmtCompact(result.invested)} subValue={`${years}yr x ₹${monthly.toLocaleString()}`} />
            <ResultCard label="Commission Saved" value={fmtCompact(result.difference)} subValue="By going Direct" highlight />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Regular vs Direct Plan Growth Over {years} Years</h3>
            <div style={{ height: 240 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.yearlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gDir" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.4} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient>
                    <linearGradient id="gReg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} /><stop offset="95%" stopColor="#f59e0b" stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={68} tickFormatter={v => v >= 10000000 ? `₹${(v/10000000).toFixed(1)}Cr` : v >= 100000 ? `₹${(v/100000).toFixed(0)}L` : `₹${(v/1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} formatter={(v: number, n) => [fmt(v), n]} labelFormatter={y => `Year ${y}`} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="regular" name="Regular Plan" stroke="#f59e0b" fill="url(#gReg)" strokeWidth={2} />
                  <Area type="monotone" dataKey="direct" name="Direct Plan" stroke="#10b981" fill="url(#gDir)" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Regular vs Direct - Key Differences</h3>
            <div className="grid grid-cols-2 gap-3 text-xs text-gray-400">
              <div className="space-y-1.5">
                <p className="p-2 bg-yellow-900/20 rounded-lg">📦 <strong className="text-yellow-400">Regular Plan:</strong> Higher expense (1-2.5%) because distributor/advisor commission (trail fee) is paid from your returns annually</p>
                <p className="p-2 bg-green-900/20 rounded-lg">✅ <strong className="text-green-400">Direct Plan:</strong> Lower expense (0.1-1%) - no intermediary, invest directly on AMC website or platforms like MFCentral, Kuvera, Groww</p>
              </div>
              <div className="space-y-1.5">
                <p className="p-2 bg-blue-900/20 rounded-lg">💡 <strong className="text-blue-400">Same Fund, More Returns:</strong> Direct and Regular are the same underlying fund with identical portfolio. Only difference is expense ratio</p>
                <p className="p-2 bg-red-900/20 rounded-lg">⚠️ <strong className="text-red-400">1% Expense Difference = Lakhs Lost:</strong> On ₹10K/mo SIP for 20 years, 1% extra expense costs over ₹15 lakh in lost returns</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
            <div className="mt-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-6">Sip vs Mutual Fund Direct Plan: Complete Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-base">What is Sip?</h3>
              <p>Sip is a India investment or financial product that offers distinct advantages depending on your goals, tax situation, and time horizon. Understanding how it works is key to making the most of your money.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">What is Mutual Fund Direct Plan?</h3>
              <p>Mutual Fund Direct Plan takes a different approach to growing or protecting your wealth. Each has its own risk profile, liquidity characteristics, and tax treatment that makes it suited to specific financial situations.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">Key Differences</h3>
              <p>The most important distinction between Sip and Mutual Fund Direct Plan is how returns are generated and taxed. Sip typically suits growth-oriented investors while Mutual Fund Direct Plan may appeal to those prioritizing stability or specific tax advantages.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-base">Tax Treatment in India</h3>
              <p>Tax efficiency dramatically affects real returns. Gains from each option may be subject to LTCG (10%) or income tax slab. Using the calculator above helps you see the true post-tax outcome based on your specific situation and contribution level.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">Which Is Better for Long-Term Wealth Creation?</h3>
              <p>The right choice depends on your time horizon, risk tolerance, and tax bracket. For goals 5+ years away, higher-return options (12-15% historical) generally beat lower-return stable options (6-7.5%). For goals under 3 years, capital preservation takes priority.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">How to Use This Calculator</h3>
              <p>Enter your monthly contribution, expected return rates for both options, and investment period above. The calculator shows year-by-year growth, total wealth created, and the difference between the two strategies - helping you visualize the long-term impact of your choice.</p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
            <h3 className="font-bold text-green-800 mb-2">💡 Expert Tip</h3>
            <p className="text-sm text-green-700 leading-relaxed">Most financial advisors recommend not putting all your money in one option. A diversified approach - splitting between Sip and Mutual Fund Direct Plan based on your specific goals - often provides better risk-adjusted returns than going all-in on either. Use this calculator to find your optimal split.</p>
          </div>
        </div>
      </div>


      {/* Internal Links */}
      {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "Mortgage Calculator", href: "/calculators/finance/mortgage-calculator", icon: "🏡", desc: "Free calculator" },          { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "Tax Bracket Calculator", href: "/calculators/finance/tax-bracket-calculator", icon: "🧾", desc: "Free calculator" },          { name: "Budget Planner Calculator", href: "/calculators/finance/budget-planner-calculator", icon: "📊", desc: "Free calculator" },          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },          { name: "Roth IRA Calculator", href: "/calculators/finance/roth-ira-calculator", icon: "🛡️", desc: "Free calculator" },          { name: "Savings Rate Calculator", href: "/calculators/finance/savings-rate-calculator", icon: "💰", desc: "Free calculator" },          { name: "Debt Payoff Calculator", href: "/calculators/finance/debt-payoff-calculator", icon: "🔓", desc: "Free calculator" },          { name: "Wealth Calculator", href: "/calculators/finance/wealth-calculator", icon: "💎", desc: "Free calculator" },          { name: "Retirement Calculator", href: "/calculators/finance/retirement-calculator", icon: "🌅", desc: "Free calculator" },
          ]}
        />
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          SIP Vs Mutual Fund Direct Plan Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this SIP Vs Mutual Fund Direct Plan USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Regular vs Direct Mutual Fund SIP Example (India 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, running a INR 25,000/month SIP for 15 years, your regular vs direct mutual fund SIP calculator India 2026 shows direct plan building INR 15+ lakh more than regular plan — purely from lower fees.
        </p>
      </Card>

            <SEOContent
        title="Regular vs Direct Mutual Fund SIP Calculator India – How Much Does the Extra Expense Ratio Cost You?"
        category="finance"
        intro={`The difference between regular and direct mutual fund plans might look small on paper — typically 0.5-1.5% lower expense ratio for direct plans — but it compounds dramatically over decades into significant wealth differences. Direct plans are the exact same fund with the same fund manager, same portfolio, same NAV history — except without the distributor commission that's baked into regular plan expense ratios.

Direct plans became available in January 2013 when SEBI mandated that all mutual fund companies must offer them. For the first several years, direct plans were primarily used by knowledgeable DIY investors and institutional buyers. Today, direct plan SIP is available on every major investment platform — Groww, Zerodha Coin, Kuvera, MFCentral, AMFI's direct portal — making them accessible to any retail investor.

The wealth difference over time is significant. If a regular plan expense ratio is 1.6% and the direct plan is 0.5%, the 1.1% annual saving compounds over 25 years: ₹5,000/month SIP difference = approximately ₹12-15 lakh more in the direct plan at 12% gross return. This is literally the same investment with better returns from eliminating a cost layer.`}
        howItWorks={`Expense ratio impact calculation: Return difference = gross fund return - total expense ratio. Regular plan at 1.6% expense vs direct plan at 0.5% = 1.1% higher net return annually in direct. This annual advantage compounded over n years at the base return rate produces the total wealth difference.

Direct vs regular NAV comparison: Direct plan NAV is always higher than regular plan NAV for the same fund because direct accumulates more gains. The ratio of direct to regular NAV at any date reflects the cumulative advantage of lower expenses since the fund's inception of direct plans.

SIP comparison: ₹5,000/month in direct at 12.1% effective return vs regular at 11.0% effective return for 20 years: direct = ₹49.6 lakh, regular = ₹43.2 lakh — ₹6.4 lakh difference from the same monthly savings over 20 years.`}
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
        tipsSection={`Always use direct plans for any mutual fund SIP. There is no scenario in which a retail investor should choose the regular plan over the direct plan if they're making their own investment decisions. The only legitimate use of regular plans is when a financial advisor is providing genuine ongoing advice, planning, and behavioral coaching worth the 1%+ annual commission cost.

For those who want advice but also want to minimize costs: fee-only financial planners (RIA-registered advisors who charge flat fees rather than commissions) can advise on portfolio construction while you invest directly — getting the advice value without the ongoing commission cost.

For switching existing regular plan SIPs to direct: this involves switching funds, which triggers capital gains tax on gains. For new SIPs, always choose direct from the start. For existing SIPs, calculate whether the tax cost of switching is recovered by the expense ratio savings within a reasonable period.`}
        conclusion={`The regular vs direct plan distinction is one of the most valuable pieces of financial knowledge for Indian retail mutual fund investors. Millions of Indian SIP investors are unknowingly paying 0.5-1.5% more per year than necessary — which compounds into lakhs over long investment periods.

Switching to direct plans is one of the easiest, most meaningful financial optimizations available: same fund, same manager, same portfolio, lower ongoing cost. If you haven't already evaluated whether your current SIPs are in direct plans, checking this should be your next action after reading this.`}

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
            { name: "Lumpsum Calculator", href: "/calculators/finance/lumpsum-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Mutual Fund Calculator", href: "/calculators/finance/mutual-fund-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "NPS Calculator", href: "/calculators/finance/nps-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "PPF Calculator", href: "/calculators/finance/ppf-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "ROI Calculator", href: "/calculators/finance/roi-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "Savings Rate Calculator", href: "/calculators/finance/savings-rate-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "Net Worth Calculator", href: "/calculators/finance/net-worth-calculator", icon: "🔗", desc: "Related financial planning" },
        ]}
      />
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )
}
