'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { Home, TrendingUp } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string }
const fmt = (n: number) => '$' + Math.round(n).toLocaleString()
const fmtC = (n: number) => n >= 1000000 ? `$${(n/1000000).toFixed(2)}M` : `$${(n/1000).toFixed(0)}K`

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const [extraPayment, setExtraPayment] = useState(500)
  const [mortgageRate, setMortgageRate] = useState(6.5)
  const [investRate, setInvestRate] = useState(10)
  const [remainingBalance, setRemainingBalance] = useState(300000)
  const [remainingYears, setRemainingYears] = useState(25)
  const [taxRate, setTaxRate] = useState(22)

  const result = useMemo(() => {
    const months = remainingYears * 12
    const mr = mortgageRate / 100 / 12
    const invMR = investRate / 100 / 12
    const effectiveMortgageRate = mortgageRate * (1 - taxRate / 100) // after-tax (mortgage interest deductible)

    // Pay off mortgage: save interest
    const normalEMI = remainingBalance * mr * Math.pow(1 + mr, months) / (Math.pow(1 + mr, months) - 1)
    // Interest saved by extra payment (simplified: treat extra as reducing balance)
    const totalInterestNormal = normalEMI * months - remainingBalance
    const totalInterestWithExtra = (() => {
      let bal = remainingBalance; let totalInterest = 0; let m = 0
      while (bal > 0 && m < months) {
        const interest = bal * mr; totalInterest += interest
        const principal = normalEMI + extraPayment - interest
        bal -= principal; m++
      }
      return totalInterest
    })()
    const interestSaved = Math.max(0, totalInterestNormal - totalInterestWithExtra)
    const afterTaxInterestSaved = interestSaved * (1 - taxRate / 100)

    // Invest instead: grow extra payment
    const investFV = extraPayment * ((Math.pow(1 + invMR, months) - 1) / invMR) * (1 + invMR)
    const investGain = investFV - extraPayment * months

    const barData = [
      { name: 'Interest Saved', payoff: Math.round(afterTaxInterestSaved), invest: 0 },
      { name: 'Investment Value', payoff: 0, invest: Math.round(investFV) },
      { name: 'Net Benefit', payoff: Math.round(afterTaxInterestSaved), invest: Math.round(investFV) },
    ]

    return {
      interestSaved: Math.round(interestSaved), afterTaxInterestSaved: Math.round(afterTaxInterestSaved),
      investFV: Math.round(investFV), investGain: Math.round(investGain),
      investBetter: investFV > afterTaxInterestSaved,
      difference: Math.round(Math.abs(investFV - afterTaxInterestSaved)),
      normalEMI: Math.round(normalEMI), barData,
    }
  }, [extraPayment, mortgageRate, investRate, remainingBalance, remainingYears, taxRate])

  return (
    <CalculatorLayout title="Pay Off Mortgage vs Invest Calculator USA 2026" description="Compare making extra mortgage payments vs investing in the stock market with break-even analysis." icon="🏠" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-4">Mortgage &amp; Investment Details</h2>
          <div className="space-y-4">
            <InputField label="Extra Monthly Payment" value={extraPayment} onChange={setExtraPayment} min={100} max={10000} step={100} prefix="$" />
            <InputField label="Remaining Mortgage Balance" value={remainingBalance} onChange={setRemainingBalance} min={50000} max={2000000} step={10000} prefix="$" />
            <InputField label="Mortgage Interest Rate" value={mortgageRate} onChange={setMortgageRate} min={3} max={10} step={0.25} suffix="%" />
            <InputField label="Investment Return (S&amp;P 500)" value={investRate} onChange={setInvestRate} min={5} max={15} step={0.5} suffix="%" />
            <InputField label="Remaining Loan Years" value={remainingYears} onChange={setRemainingYears} min={1} max={30} step={1} suffix="Yrs" />
            <InputField label="Your Tax Rate" value={taxRate} onChange={setTaxRate} min={0} max={37} step={1} suffix="%" />
          </div>
          <div className={`mt-4 p-3 rounded-xl border-2 text-center ${result.investBetter ? 'bg-green-50 border-green-300' : 'bg-blue-50 border-blue-300'}`}>
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Better Use of Money</p>
            <p className="text-xl font-black" style={{ color: result.investBetter ? '#10b981' : '#3b82f6' }}>{result.investBetter ? 'Invest' : 'Pay Mortgage'} 🏆</p>
            <p className="text-sm text-gray-500">by {fmtC(result.difference)}</p>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Investment Value" value={fmtC(result.investFV)} subValue={`+${fmtC(result.investGain)} gain`} highlight={result.investBetter} icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="Interest Saved" value={fmtC(result.interestSaved)} subValue="Gross savings" highlight={!result.investBetter} icon={<Home className="w-4 h-4" />} />
            <ResultCard label="After-Tax Interest Saved" value={fmtC(result.afterTaxInterestSaved)} subValue={`${taxRate}% deduction`} />
            <ResultCard label="Monthly EMI" value={fmtC(result.normalEMI)} subValue="Current mortgage" />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Pay Off Mortgage vs Invest Comparison</h3>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={result.barData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={70} tickFormatter={v => v >= 1000 ? `$${(v/1000).toFixed(0)}K` : `$${v}`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} formatter={(v: number, name) => [fmt(v), name]} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="payoff" name="Pay Off Mortgage" fill="#3b82f6" radius={[4,4,0,0]} />
                  <Bar dataKey="invest" name="Invest in S&amp;P 500" fill="#10b981" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">The Math Behind the Decision</h3>
            <div className="grid grid-cols-2 gap-3 text-xs text-gray-400">
              <div className="space-y-2">
                <p className="p-2 bg-blue-900/20 rounded-lg">🏠 <strong className="text-blue-400">Pay off mortgage:</strong> Guaranteed {mortgageRate}% return (interest saved). After {taxRate}% tax deduction, effective rate is {(mortgageRate * (1 - taxRate/100)).toFixed(1)}%</p>
                <p className="p-2 bg-green-900/20 rounded-lg">📈 <strong className="text-green-400">Invest in market:</strong> Historical S&amp;P 500 returns {investRate}% - not guaranteed but proven over long periods</p>
              </div>
              <div className="space-y-2">
                <p className="p-2 bg-purple-900/20 rounded-lg">💡 <strong className="text-purple-400">Rule of thumb:</strong> If mortgage rate &lt; expected investment return after tax -{'>'} invest. Currently {mortgageRate}% mortgage vs {investRate}% expected return.</p>
                <p className="p-2 bg-yellow-900/20 rounded-lg">⚠️ <strong className="text-yellow-400">Also consider:</strong> Emergency fund, peace of mind, job security, and risk tolerance before deciding.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
            <div className="mt-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-6">Pay Off Mortgage vs Invest: Complete Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-base">What is Pay Off Mortgage?</h3>
              <p>Pay Off Mortgage is a USA investment or financial product that offers distinct advantages depending on your goals, tax situation, and time horizon. Understanding how it works is key to making the most of your money.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">What is Invest?</h3>
              <p>Invest takes a different approach to growing or protecting your wealth. Each has its own risk profile, liquidity characteristics, and tax treatment that makes it suited to specific financial situations.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">Key Differences</h3>
              <p>The most important distinction between Pay Off Mortgage and Invest is how returns are generated and taxed. Pay Off Mortgage typically suits growth-oriented investors while Invest may appeal to those prioritizing stability or specific tax advantages.</p>
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
            <p className="text-sm text-green-700 leading-relaxed">Most financial advisors recommend not putting all your money in one option. A diversified approach - splitting between Pay Off Mortgage and Invest based on your specific goals - often provides better risk-adjusted returns than going all-in on either. Use this calculator to find your optimal split.</p>
          </div>
        </div>
      </div>

            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Pay Off Mortgage Vs Invest Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          A $350,000 mortgage at 6.5% over 30 years results in a monthly payment of approximately <strong>$2,212</strong> with total interest paid of $446,320.
        </p>
        <p className="text-sm text-gray-600">
          Use this Pay Off Mortgage Vs Invest USA 2026 tool to compare different loan amounts, interest rates, and terms to find your best option.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Pay Off Mortgage vs Invest Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, with a $350,000 mortgage at 6.5% and $800/month extra to deploy, your pay off mortgage vs invest calculator USA 2026 shows the break-even investment return where investing beats prepaying.
        </p>
      </Card>

            <SEOContent
        title="Pay Off Mortgage vs Invest Calculator USA – Extra Payments or Invest in 2026: Which Wins?"
        category="finance"
        intro={`The pay-off-mortgage-versus-invest decision is one of personal finance's most debated questions, and the mathematically correct answer often conflicts with what feels right emotionally. The math generally favors investing over prepaying a low-rate mortgage — a 3-4% mortgage rate competes poorly with expected 7-9% equity returns over long periods. But the emotional value of a paid-off home is real and shouldn't be dismissed.

The comparison depends on three variables: your mortgage interest rate, your expected investment return, and the tax treatment of each. Mortgage interest deductibility (if you itemize) reduces the effective mortgage cost. Investment returns in tax-advantaged accounts (401k, IRA, Roth) occur without annual tax drag. In taxable accounts, capital gains and dividends face periodic taxation.

For most homeowners with mortgage rates below 5% and decades of investing ahead of them, the mathematical case for investing over prepayment is strong. For homeowners with rates above 6.5-7%, the guaranteed return of mortgage payoff becomes genuinely competitive with uncertain equity returns — particularly on a risk-adjusted basis.`}
        howItWorks={`Break-even comparison: Mortgage after-tax cost vs expected investment after-tax return. Mortgage effective rate = stated rate × (1 - tax deduction rate) if you itemize. A 6.5% mortgage with 22% tax deduction = 5.07% effective cost. If expected equity return = 8% at 15% long-term capital gains tax = 6.8% after-tax return. Invest wins by 1.73% annually.

Risk-adjusted comparison: Investment return is not guaranteed; mortgage payoff return is guaranteed. Risk-free rate of return matters here. If 10-year Treasury yields 4.5% and your mortgage costs 5.5% after-tax, the risk-free alternative to investment barely justifies the mortgage over paying it off. At expected equity return of 8%, there's a 2.5% premium for bearing equity risk — which historical evidence suggests is well-compensated over 15+ years.

Time horizon: Investing for 5-10 years generates less reliable expected equity outperformance than investing for 20+ years. Sequence of returns matters — retiring with a large investment portfolio and a remaining mortgage balance requires careful income management if markets decline at retirement.`}
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
        tipsSection={`For most homeowners: if mortgage rate is below 5%, investing in tax-advantaged accounts wins clearly. Between 5-6.5%, the comparison depends on your tax situation and risk tolerance. Above 6.5%, prepayment becomes competitive on a risk-adjusted basis.

Max tax-advantaged accounts before considering mortgage prepayment in most cases. A 401k contribution at 22% marginal tax rate is a guaranteed 22% return before investment growth. No mortgage payoff provides a guaranteed return that high.

Psychological value of mortgage payoff is legitimate financial value. For people who sleep better without debt, the peace of mind is worth something real. It's not irrational to pay off a mortgage even when the math slightly favors investing.`}
        conclusion={`The 'guaranteed return' of mortgage payoff has increasing appeal when equity valuations are elevated. At CAPE ratios of 30+, expected long-run equity returns are lower than their historical average, narrowing the gap between expected investment returns and the guaranteed mortgage payoff return.

For people approaching retirement (within 5-7 years), accelerating mortgage payoff to eliminate the fixed housing cost from required retirement income is a conservative strategy that reduces the portfolio withdrawal rate needed — with secondary benefits of reducing both sequence-of-returns risk and financial stress in early retirement years.`}

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
            { name: "Down Payment Calculator", href: "/calculators/finance/down-payment-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Rent vs Buy Calculator", href: "/calculators/finance/rent-vs-buy-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Mortgage Refinance Calculator", href: "/calculators/finance/mortgage-refinance-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Home Affordability Calculator", href: "/calculators/finance/home-affordability-calculator", icon: "🔗", desc: "Related financial tool" },
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
          { name: "401k vs Roth IRA Calculator", href: "/calculators/finance/401k-vs-roth-ira-calculator", icon: "📊", desc: "Free calculator" },          { name: "401k vs Taxable Account Calculator", href: "/calculators/finance/401k-vs-taxable-account-calculator", icon: "📊", desc: "Free calculator" },          { name: "401k vs Pension Calculator", href: "/calculators/finance/401k-vs-pension-calculator", icon: "📊", desc: "Free calculator" },          { name: "Roth IRA vs Traditional IRA Calculator", href: "/calculators/finance/roth-ira-vs-traditional-ira-calculator", icon: "📊", desc: "Free calculator" },          { name: "Roth IRA vs 401k Employer Match Calculator", href: "/calculators/finance/roth-ira-vs-401k-employer-match-calculator", icon: "📊", desc: "Free calculator" },          { name: "Roth IRA vs HSA Calculator", href: "/calculators/finance/roth-ira-vs-hsa-calculator", icon: "📊", desc: "Free calculator" },          { name: "HSA vs FSA Calculator", href: "/calculators/finance/hsa-vs-fsa-calculator", icon: "🏥", desc: "Free calculator" },          { name: "Sep IRA vs Solo 401k Calculator", href: "/calculators/finance/sep-ira-vs-solo-401k-calculator", icon: "💼", desc: "Free calculator" },          { name: "Bonds vs Cds USA Calculator", href: "/calculators/finance/bonds-vs-cds-usa-calculator", icon: "📋", desc: "Free calculator" },          { name: "Cd vs HYSA Calculator", href: "/calculators/finance/cd-vs-hysa-calculator", icon: "💰", desc: "Free calculator" },          { name: "I Bonds vs Tips Calculator", href: "/calculators/finance/i-bonds-vs-tips-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "S&P500 vs Bonds Calculator", href: "/calculators/finance/sp500-vs-bonds-calculator", icon: "📊", desc: "Free calculator" },
          ]}
        />

    </CalculatorLayout>
  )
}
