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

interface Props { faqs: any[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string }
const fmt = (n: number) => '$' + Math.round(n).toLocaleString()
const fmtC = (n: number) => n >= 1000000 ? `$${(n/1000000).toFixed(2)}M` : `$${(n/1000).toFixed(0)}K`

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const [balance, setBalance] = useState(350000)
  const [currentRate, setCurrentRate] = useState(7.5)
  const [newRate, setNewRate] = useState(6.5)
  const [remainingYears, setRemainingYears] = useState(25)
  const [closingCosts, setClosingCosts] = useState(8000)
  const [investReturn, setInvestReturn] = useState(10)

  const result = useMemo(() => {
    const months = remainingYears * 12
    const currentMR = currentRate / 100 / 12
    const newMR = newRate / 100 / 12
    const invMR = investReturn / 100 / 12

    const currentEMI = balance * currentMR * Math.pow(1 + currentMR, months) / (Math.pow(1 + currentMR, months) - 1)
    const newEMI = balance * newMR * Math.pow(1 + newMR, months) / (Math.pow(1 + newMR, months) - 1)
    const monthlySavings = currentEMI - newEMI
    const breakEvenMonths = monthlySavings > 0 ? Math.ceil(closingCosts / monthlySavings) : 9999

    // Refinance: save monthly, but pay closing costs upfront
    const totalSavings = monthlySavings * months - closingCosts

    // Invest closing costs instead: close costs grow in market
    const closingCostsFV = closingCosts * Math.pow(1 + investReturn / 100, remainingYears)
    // Monthly savings also investable after refinance
    const monthlySavingsFV = monthlySavings > 0 ? monthlySavings * ((Math.pow(1 + invMR, months) - 1) / invMR) * (1 + invMR) : 0

    const refiNetBenefit = monthlySavingsFV - closingCostsFV
    const refiWorthIt = refiNetBenefit > 0

    const barData = [
      { name: 'Closing Costs', refi: Math.round(closingCosts), invest: Math.round(closingCostsFV) },
      { name: 'Total Monthly Savings', refi: Math.round(monthlySavings * months), invest: 0 },
      { name: 'Net Benefit', refi: Math.round(totalSavings), invest: Math.round(monthlySavingsFV - closingCostsFV) },
    ]

    return {
      currentEMI: Math.round(currentEMI), newEMI: Math.round(newEMI),
      monthlySavings: Math.round(monthlySavings), breakEvenMonths,
      totalSavings: Math.round(totalSavings), monthlySavingsFV: Math.round(monthlySavingsFV),
      closingCostsFV: Math.round(closingCostsFV), refiNetBenefit: Math.round(refiNetBenefit),
      refiWorthIt, barData,
    }
  }, [balance, currentRate, newRate, remainingYears, closingCosts, investReturn])

  return (
    <CalculatorLayout title="Mortgage Refinance vs Invest Calculator USA 2026" description="Compare using closing cost cash to refinance vs investing it in the stock market." icon="🔄" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-4">Refinance Details</h2>
          <div className="space-y-4">
            <InputField label="Current Loan Balance" value={balance} onChange={setBalance} min={50000} max={2000000} step={10000} prefix="$" />
            <InputField label="Current Rate" value={currentRate} onChange={setCurrentRate} min={3} max={12} step={0.25} suffix="%" />
            <InputField label="New Rate (Refi)" value={newRate} onChange={setNewRate} min={3} max={12} step={0.25} suffix="%" />
            <InputField label="Remaining Loan Years" value={remainingYears} onChange={setRemainingYears} min={5} max={30} step={1} suffix="Yrs" />
            <InputField label="Closing Costs" value={closingCosts} onChange={setClosingCosts} min={1000} max={30000} step={500} prefix="$" />
            <InputField label="Investment Return (S&amp;P 500)" value={investReturn} onChange={setInvestReturn} min={5} max={15} step={0.5} suffix="%" />
          </div>
          <div className={`mt-4 p-3 rounded-xl border-2 text-center ${result.refiWorthIt ? 'bg-blue-50 border-blue-300' : 'bg-green-50 border-green-300'}`}>
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Better Decision</p>
            <p className="text-xl font-black" style={{ color: result.refiWorthIt ? '#3b82f6' : '#10b981' }}>{result.refiWorthIt ? 'Refinance 🔄' : 'Invest 📈'}</p>
            <p className="text-sm text-gray-500">Break-even: {result.breakEvenMonths < 9999 ? `${result.breakEvenMonths} months` : 'Never'}</p>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Current Payment" value={fmtC(result.currentEMI)} subValue={`${currentRate}% rate`} icon={<Home className="w-4 h-4" />} />
            <ResultCard label="New Payment" value={fmtC(result.newEMI)} subValue={`${newRate}% rate`} highlight={result.refiWorthIt} />
            <ResultCard label="Monthly Savings" value={fmtC(result.monthlySavings)} subValue="After refinancing" highlight={result.refiWorthIt} />
            <ResultCard label="Refi Net Benefit" value={fmtC(result.refiNetBenefit)} subValue="vs investing costs" highlight={result.refiWorthIt} icon={<TrendingUp className="w-4 h-4" />} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Refinance vs Investing Closing Costs</h3>
            <div style={{ height: 230 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={result.barData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={70} tickFormatter={v => v >= 1000000 ? `$${(v/1000000).toFixed(1)}M` : `$${(v/1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8 }} formatter={(v: number, n) => [fmt(v), n]} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="invest" name="Invest Costs" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="refi" name="Refinance" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
            <div className="mt-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-6">Refinance vs Invest: Complete Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-base">What is Refinance?</h3>
              <p>Refinance is a USA investment or financial product that offers distinct advantages depending on your goals, tax situation, and time horizon. Understanding how it works is key to making the most of your money.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">What is Invest?</h3>
              <p>Invest takes a different approach to growing or protecting your wealth. Each has its own risk profile, liquidity characteristics, and tax treatment that makes it suited to specific financial situations.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">Key Differences</h3>
              <p>The most important distinction between Refinance and Invest is how returns are generated and taxed. Refinance typically suits growth-oriented investors while Invest may appeal to those prioritizing stability or specific tax advantages.</p>
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
            <p className="text-sm text-green-700 leading-relaxed">Most financial advisors recommend not putting all your money in one option. A diversified approach - splitting between Refinance and Invest based on your specific goals - often provides better risk-adjusted returns than going all-in on either. Use this calculator to find your optimal split.</p>
          </div>
        </div>
      </div>

            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Refinance Vs Invest Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          $500/month invested in the S&P 500 at an average 10% annual return grows to over <strong>$1.1M</strong> in 30 years through the power of compound growth.
        </p>
        <p className="text-sm text-gray-600">
          This Refinance Vs Invest USA 2026 calculator helps you model investment scenarios and understand the long-term impact of consistent contributions.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Mortgage Refinance vs Invest Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, with $8,000 in refinance closing costs and a $400,000 mortgage at 7.8% vs 7.0%, your mortgage refinance vs invest calculator USA 2026 shows which path builds more wealth based on your exact numbers.
        </p>
      </Card>

            <SEOContent
        title="Mortgage Refinance vs Invest Calculator USA – Refinance or Invest the Money in 2026?"
        category="finance"
        intro={`Receiving a windfall, completing a paydown of other debt, or seeing interest rates change creates the same question in different forms: should I apply this money to my mortgage (refinance or prepay) or invest it? The math is clear in extreme cases and genuinely ambiguous in the middle — which is where most people actually are.

The mathematical framework: your mortgage interest rate (after the tax deduction benefit if you itemize) is your guaranteed return on prepayment. Your expected investment return is your expected return on investing — subject to risk. When the mortgage rate exceeds the risk-free investment return, prepayment is clearly superior. When expected investment returns substantially exceed the mortgage rate, investing is superior. In the 5-7% mortgage range that many borrowers hold in 2024-2026, the comparison is genuinely close.

But risk matters. A 6.5% mortgage prepayment delivers a guaranteed 6.5% return. The stock market's expected return is higher but uncertain — in any given 5-year period, equity returns range from deeply negative to spectacularly positive. The appropriate comparison is not 6.5% vs 8% expected equity return but 6.5% guaranteed vs 8% with full volatility attached.`}
        howItWorks={`Mortgage effective rate: If you itemize deductions and your marginal federal rate is 22%: effective mortgage cost = 6.5% × (1 - 0.22) = 5.07%. If you take the standard deduction (most people do post-TCJA), effective rate = full 6.5%.

Investment comparison: Expected return on equity investment = historical average approximately 8-10% nominal. After capital gains tax (if taxable account) at 15-20% LTCG: 7-8.5% after-tax long-run expected return. In tax-advantaged accounts: full pre-tax return compounds, tax paid only at withdrawal.

Break-even return threshold: The investment return needed to match the guaranteed mortgage prepayment. At 6.5% mortgage with 22% deductibility: threshold = 5.07%. At 6.5% with no deduction: threshold = 6.5%. When risk-free investments (Treasuries, CDs) yield above these thresholds, the risk-free investment beats prepayment.`}
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
        tipsSection={`Max tax-advantaged accounts before considering mortgage prepayment. A 401k contribution at 22% marginal rate is a guaranteed 22% return on the contribution — unmatched. An IRA contribution (Roth or traditional) provides similar structural tax benefits. Mortgage prepayment competes only with taxable investment, where the comparison is closer.

For high-rate mortgages (above 7%), the guaranteed prepayment return becomes increasingly competitive with risk-adjusted equity expectations. Above 8%, prepayment is likely the better choice for most risk-averse investors.

As retirement approaches, the case for mortgage payoff strengthens: eliminating a fixed monthly obligation reduces the income your portfolio must generate, lowering required withdrawal rates and sequence-of-returns risk.`}
        conclusion={`The emotional dimension of mortgage payoff is real and legitimate. For many people, being completely debt-free provides a sense of security and freedom that has real value beyond the financial calculation. If you're choosing between a 6.5% guaranteed return (mortgage payoff) and an 8% uncertain equity return, the certainty premium may be worth more to you than the expected value difference.

A practical middle path: maintain any employer-matched retirement contributions (guaranteed 50-100% return), build a 6-12 month emergency fund, then split remaining discretionary funds 50/50 between mortgage prepayment and taxable investment. This approach captures both the certainty of debt reduction and the growth potential of investment without having to precisely optimize the uncertain comparison.`}

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
            { name: "Stock Profit Calculator", href: "/calculators/finance/stock-profit-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Fire Calculator", href: "/calculators/finance/fire-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Net Worth Calculator", href: "/calculators/finance/net-worth-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Savings Rate Calculator", href: "/calculators/finance/savings-rate-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "Retirement Calculator", href: "/calculators/finance/retirement-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🔗", desc: "Related financial planning" },
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
