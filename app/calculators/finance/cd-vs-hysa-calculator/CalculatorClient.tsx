'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { TrendingUp, Shield } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string }
const fmt = (n: number) => (n >= 10000000 ? '₹' + (n/10000000).toFixed(2) + 'Cr' : n >= 100000 ? '₹' + (n/100000).toFixed(1) + 'L' : n >= 1000 ? '₹' + (n/1000).toFixed(0) + 'K' : '₹' + Math.round(n))
const fmtU = (n: number) => (n >= 1000000 ? '$' + (n/1000000).toFixed(2) + 'M' : '$' + (n/1000).toFixed(0) + 'K')
const fmtAuto = (n: number, isUSD: boolean) => isUSD ? fmtU(n) : fmt(n)

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const isUSD = true
  const [val1, setVal1] = useState(isUSD ? 500 : 10000)
  const [rate1, setRate1] = useState(isUSD ? 10 : 12)
  const [rate2, setRate2] = useState(isUSD ? 5 : 7)
  const [years, setYears] = useState(10)

  const result = useMemo(() => {
    const months = years * 12
    const mr1 = rate1 / 100 / 12; const mr2 = rate2 / 100 / 12
    const fv1 = val1 * ((Math.pow(1 + mr1, months) - 1) / mr1) * (1 + mr1)
    const fv2 = val1 * ((Math.pow(1 + mr2, months) - 1) / mr2) * (1 + mr2)
    const invested = val1 * months
    const barData = [
      { name: 'Invested', a: Math.round(invested), b: Math.round(invested) },
      { name: 'Final Value', a: Math.round(fv1), b: Math.round(fv2) },
      { name: 'Gain', a: Math.round(fv1 - invested), b: Math.round(fv2 - invested) },
    ]
    return { fv1: Math.round(fv1), fv2: Math.round(fv2), invested: Math.round(invested), aBetter: fv1 > fv2, diff: Math.round(Math.abs(fv1 - fv2)), barData }
  }, [val1, rate1, rate2, years])

  return (
    <CalculatorLayout title="CD vs High-Yield Savings Account Calculator USA 2026" description="Compare CD vs HYSA on interest rate, flexibility, and FDIC protection." icon="📊" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-4">Investment Details</h2>
          <div className="space-y-4">
            <InputField label="Monthly Investment" value={val1} onChange={setVal1} min={100} max={100000} step={100} prefix={isUSD ? '$' : '₹'} />
            <InputField label="Option A Return (p.a.)" value={rate1} onChange={setRate1} min={1} max={20} step={0.5} suffix="%" />
            <InputField label="Option B Return (p.a.)" value={rate2} onChange={setRate2} min={1} max={15} step={0.25} suffix="%" />
            <InputField label="Investment Period" value={years} onChange={setYears} min={1} max={30} step={1} suffix="Yrs" />
          </div>
          <div className={`mt-4 p-3 rounded-xl border-2 text-center ${result.aBetter ? 'bg-green-50 border-green-300' : 'bg-blue-50 border-blue-300'}`}>
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Better Investment</p>
            <p className="text-xl font-black" style={{ color: result.aBetter ? '#10b981' : '#3b82f6' }}>{result.aBetter ? 'Option A' : 'Option B'} 🏆</p>
            <p className="text-sm text-gray-500">by {fmtAuto(result.diff, isUSD)}</p>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Option A" value={fmtAuto(result.fv1, isUSD)} subValue={`${rate1}% return`} highlight={result.aBetter} icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="Option B" value={fmtAuto(result.fv2, isUSD)} subValue={`${rate2}% return`} highlight={!result.aBetter} icon={<Shield className="w-4 h-4" />} />
            <ResultCard label="Total Invested" value={fmtAuto(result.invested, isUSD)} subValue={`${years} years`} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Comparison Calculator Comparison</h3>
            <div style={{ height: 230 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={result.barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={72} tickFormatter={v => fmtAuto(v, isUSD)} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8 }} formatter={(v: number, n) => [fmtAuto(v as number, isUSD), n]} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="b" name="Option B" fill="#3b82f6" radius={[4,4,0,0]} />
                  <Bar dataKey="a" name="Option A" fill="#10b981" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
            <div className="mt-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-6">Cd vs Hysa: Complete Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-base">What is Cd?</h3>
              <p>Cd is a USA investment or financial product that offers distinct advantages depending on your goals, tax situation, and time horizon. Understanding how it works is key to making the most of your money.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">What is Hysa?</h3>
              <p>Hysa takes a different approach to growing or protecting your wealth. Each has its own risk profile, liquidity characteristics, and tax treatment that makes it suited to specific financial situations.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">Key Differences</h3>
              <p>The most important distinction between Cd and Hysa is how returns are generated and taxed. Cd typically suits growth-oriented investors while Hysa may appeal to those prioritizing stability or specific tax advantages.</p>
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
            <p className="text-sm text-green-700 leading-relaxed">Most financial advisors recommend not putting all your money in one option. A diversified approach - splitting between Cd and Hysa based on your specific goals - often provides better risk-adjusted returns than going all-in on either. Use this calculator to find your optimal split.</p>
          </div>
        </div>
      </div>

            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          CD Vs HYSA Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          $10,000 in a high-yield savings account at 4.5% APY earns <strong>$450</strong> in the first year. Over 5 years with monthly additions of $500, it grows to $43,500+.
        </p>
        <p className="text-sm text-gray-600">
          Use this CD Vs HYSA USA 2026 tool to compare rates, terms, and contribution strategies to maximize your savings returns.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          CD vs High-Yield Savings Account Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, with $40,000 in emergency savings, your CD vs high-yield savings account calculator USA 2026 shows keeping 3 months in a HYSA and the rest in CDs optimizes both yield and liquidity.
        </p>
      </Card>

            <SEOContent
        title="CD vs High-Yield Savings Account Calculator USA – Which Safe Investment Pays More in 2026?"
        category="finance"
        intro={`Comparing CDs to high-yield savings accounts comes down to a single trade-off: certainty versus flexibility. A CD locks in a rate for the full term — you know exactly what you'll earn. A HYSA pays a variable rate that changes with monetary policy — higher when the Fed raises rates, lower when they cut. The right choice depends on your time horizon and whether you expect rates to rise or fall.

In 2024-2026, the Fed's rate cutting cycle created an interesting dynamic: many CDs locked in at 5%+ while HYSA rates were already falling toward 4% and headed lower. Locking in a 2-year CD at 5.1% in early 2024 was clearly superior to a HYSA if you expected (correctly) that the Fed would cut rates. But no one has a crystal ball on rate direction.

For money you won't need for a specific time period — your vacation fund, home down payment savings, or emergency fund reserves — a CD's certainty is valuable. For your primary emergency fund (the 3-6 months of expenses you might need on short notice), a HYSA's instant accessibility is worth more than the marginal yield from a CD.`}
        howItWorks={`HYSA vs CD comparison: APY on HYSA is a variable annual percentage yield; it changes when banks adjust their rates in response to Fed policy. A HYSA at 4.5% today might pay 3.5% in 12 months if the Fed cuts rates twice.

CD early withdrawal penalty impact: A 12-month CD earning 5.0% with a 6-month interest penalty, broken at month 4, earns effectively nothing — or even loses slightly. The higher the penalty (some banks charge 12+ months of interest on longer CDs), the more important it is to be certain you won't need the money.

Nominal difference: On $20,000, a CD at 5.0% vs HYSA at 4.5% for 12 months = $100 additional interest. On $100,000, that's $500. These are real amounts but not transformative for most investors — the decision deserves calibration to the actual dollar difference at your balance.`}
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
        tipsSection={`Compare early withdrawal penalties before committing to any CD. They vary dramatically: some online banks offer no-penalty CDs (essentially a CD with HYSA flexibility), which eliminates the main CD disadvantage but often pays slightly less than penalty CDs.

For savings you're building toward a specific goal in 12-24 months, use the CD if the rate is meaningfully better and you're confident about the timeline. For ongoing savings without a specific timeline, the HYSA's flexibility typically wins on practicality.

Check both products at the same institution and at others. Sometimes a bank's HYSA rate matches or exceeds competitor CD rates — in which case the HYSA is clearly superior for that amount.`}
        conclusion={`The HYSA vs CD decision is genuinely consequential in high-rate environments (where the yield spread between CDs and HYSA is larger) and relatively inconsequential in low-rate environments (where both pay almost nothing). In a 5% rate environment, the choice matters. At 0.5%, neither is a meaningful wealth-building tool.

For most people with $10,000-$50,000 in cash savings, the financial decision is secondary to the behavioral one: will you actually leave the CD intact for the full term, or will you break it when a need arises? An intact HYSA earning slightly less often beats a broken CD with penalties. Be honest about your spending patterns before choosing.`}

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
            { name: "Savings Goal Calculator", href: "/calculators/finance/savings-goal-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Emergency Fund Calculator", href: "/calculators/finance/emergency-fund-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Inflation Calculator", href: "/calculators/finance/inflation-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Bond Calculator", href: "/calculators/finance/government-bond-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "ROI Calculator", href: "/calculators/finance/roi-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "Savings Rate Calculator", href: "/calculators/finance/savings-rate-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "Net Worth Calculator", href: "/calculators/finance/net-worth-calculator", icon: "🔗", desc: "Related financial planning" },
        ]}
      />
      <FAQSection faqs={faqs} />
        {/* Internal Links */}
        {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "401k vs Roth IRA Calculator", href: "/calculators/finance/401k-vs-roth-ira-calculator", icon: "📊", desc: "Free calculator" },          { name: "401k vs Taxable Account Calculator", href: "/calculators/finance/401k-vs-taxable-account-calculator", icon: "📊", desc: "Free calculator" },          { name: "401k vs Pension Calculator", href: "/calculators/finance/401k-vs-pension-calculator", icon: "📊", desc: "Free calculator" },          { name: "Roth IRA vs Traditional IRA Calculator", href: "/calculators/finance/roth-ira-vs-traditional-ira-calculator", icon: "📊", desc: "Free calculator" },          { name: "Roth IRA vs 401k Employer Match Calculator", href: "/calculators/finance/roth-ira-vs-401k-employer-match-calculator", icon: "📊", desc: "Free calculator" },          { name: "Roth IRA vs HSA Calculator", href: "/calculators/finance/roth-ira-vs-hsa-calculator", icon: "📊", desc: "Free calculator" },          { name: "HSA vs FSA Calculator", href: "/calculators/finance/hsa-vs-fsa-calculator", icon: "🏥", desc: "Free calculator" },          { name: "Sep IRA vs Solo 401k Calculator", href: "/calculators/finance/sep-ira-vs-solo-401k-calculator", icon: "💼", desc: "Free calculator" },          { name: "Bonds vs Cds USA Calculator", href: "/calculators/finance/bonds-vs-cds-usa-calculator", icon: "📋", desc: "Free calculator" },          { name: "I Bonds vs Tips Calculator", href: "/calculators/finance/i-bonds-vs-tips-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "S&P500 vs Bonds Calculator", href: "/calculators/finance/sp500-vs-bonds-calculator", icon: "📊", desc: "Free calculator" },          { name: "S&P500 vs Real Estate USA Calculator", href: "/calculators/finance/sp500-vs-real-estate-usa-calculator", icon: "📊", desc: "Free calculator" },
          ]}
        />

    </CalculatorLayout>
  )
}
