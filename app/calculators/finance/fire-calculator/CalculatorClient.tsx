'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { calculateFIRE } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { currency, fmt, fmtCompact } = useCurrency()
  const scale = currency.code === 'INR' ? 80 : 1

  const [currentAge, setCurrentAge] = useState(30)
  const [targetAge, setTargetAge] = useState(50)
  const [monthlyExpenses, setMonthlyExpenses] = useState(Math.round(4000 * scale))
  const [currentSavings, setCurrentSavings] = useState(Math.round(50000 * scale))
  const [monthlySavings, setMonthlySavings] = useState(Math.round(2000 * scale))
  const [expectedReturn, setExpectedReturn] = useState(8)
  const [swr, setSwr] = useState(4)
  const step = currency.code === 'INR' ? 5000 : 500

  const result = useMemo(() => calculateFIRE(currentAge, targetAge, monthlyExpenses, currentSavings, monthlySavings, expectedReturn, swr),
    [currentAge, targetAge, monthlyExpenses, currentSavings, monthlySavings, expectedReturn, swr])

  const progress = result.fireNumber > 0 ? Math.min((currentSavings / result.fireNumber) * 100, 100) : 0
  const fireReachYear = result.yearData.find(y => y.corpus >= result.fireNumber)

  const InputRow = ({ label, value, onChange, step: s = 1, suffix = '', prefix = '' }: any) => (
    <div className="space-y-1">
      <label className="text-xs font-medium text-gray-600">{label}</label>
      <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
        {prefix && <span className="text-green-600 text-sm">{prefix}</span>}
        <input type="number" value={value} onChange={e => onChange(Number(e.target.value))} step={s}
          className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
        {suffix && <span className="text-gray-500 text-sm">{suffix}</span>}
      </div>
    </div>
  )

  return (
    <CalculatorLayout title="FIRE Calculator USA 2026" description={`Calculate your Financial Independence number and timeline in ${currency.name}.`} icon="🔥" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Your FIRE Plan</h2>

          <div className="grid grid-cols-2 gap-3">
            <InputRow label="Current Age" value={currentAge} onChange={setCurrentAge} s={1} />
            <InputRow label="Target FIRE Age" value={targetAge} onChange={(v: number) => setTargetAge(Math.max(currentAge + 1, v))} s={1} />
          </div>
          <InputRow label="Monthly Expenses" value={monthlyExpenses} onChange={setMonthlyExpenses} s={step} prefix={currency.symbol} />
          <InputRow label="Current Savings / Portfolio" value={currentSavings} onChange={setCurrentSavings} s={step * 10} prefix={currency.symbol} />
          <InputRow label="Monthly Savings / Investment" value={monthlySavings} onChange={setMonthlySavings} s={step} prefix={currency.symbol} />
          <InputRow label="Expected Annual Return" value={expectedReturn} onChange={setExpectedReturn} s={0.5} suffix="%" />

          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-600">Safe Withdrawal Rate</label>
            <div className="grid grid-cols-4 gap-1.5">
              {[3, 3.5, 4, 4.5].map(r => (
                <button key={r} onClick={() => setSwr(r)}
                  className={`py-2 rounded-xl text-xs font-semibold transition-all ${swr === r ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                  {r}%
                </button>
              ))}
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          {/* FIRE number & status */}
          <div className={`p-5 rounded-2xl border-2 ${result.isAchievable ? 'bg-green-50 border-green-300' : 'bg-amber-50 border-amber-300'}`}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">FIRE Number</p>
                <p className="text-xl font-black text-gray-900">{fmtCompact(result.fireNumber)}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">Projected Corpus</p>
                <p className={`text-xl font-black ${result.isAchievable ? 'text-green-700' : 'text-amber-600'}`}>{fmtCompact(result.projectedCorpus)}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">Gap / Surplus</p>
                <p className={`text-xl font-black ${result.gap <= 0 ? 'text-green-700' : 'text-red-600'}`}>{result.gap <= 0 ? '+' : ''}{fmtCompact(-result.gap)}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">Status</p>
                <p className={`text-xl font-black ${result.isAchievable ? 'text-green-700' : 'text-amber-600'}`}>{result.isAchievable ? 'On Track!' : 'Needs Work'}</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Current: {fmtCompact(currentSavings)}</span>
                <span>{progress.toFixed(1)}% of FIRE</span>
                <span>Target: {fmtCompact(result.fireNumber)}</span>
              </div>
              <div className="bg-gray-200 rounded-full h-3">
                <div className="h-3 rounded-full bg-green-500 transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {!result.isAchievable && (
              <p className="text-xs text-amber-700 mt-3 bg-amber-100 p-2 rounded-lg">
                Need {fmt(result.requiredMonthlySavings)}/month to reach FIRE by age {targetAge}. Try extending target age or increasing savings.
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Annual Expenses" value={fmtCompact(result.annualExpenses)} />
            <ResultCard label="Monthly Withdrawal" value={fmtCompact(result.annualExpenses / 12)} subValue="in retirement" />
            <ResultCard label="FIRE Reached" value={fireReachYear ? `Age ${fireReachYear.year}` : 'After 40yrs'} subValue={fireReachYear ? `${fireReachYear.year - currentAge} years` : ''} highlight />
            <ResultCard label="Needed Monthly" value={fmt(result.requiredMonthlySavings)} subValue="to hit target" />
          </div>

          {/* Corpus growth chart */}
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Portfolio Growth vs FIRE Target</h3>
            <div style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.yearData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="corpusGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={60}
                    tickFormatter={v => `${currency.symbol}${v >= 1000000 ? (v/1000000).toFixed(1)+'M' : v >= 1000 ? (v/1000).toFixed(0)+'k' : v}`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }}
                    formatter={(v: number) => fmtCompact(v)} />
                  <ReferenceLine y={result.fireNumber} stroke="#f59e0b" strokeDasharray="6 3" label={{ value: 'FIRE Target', fill: '#f59e0b', fontSize: 10 }} />
                  <Area type="monotone" dataKey="corpus" stroke="#22c55e" strokeWidth={2.5} fill="url(#corpusGrad)" name="Portfolio" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <Card>
          <h2 className="text-xl font-black text-gray-900 mb-4">FIRE Calculator -- Your Path to Financial Independence USA 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">The 4% Rule and FIRE Math</h3>
              <p>The FIRE number -- the portfolio size needed to retire -- is calculated as Annual Expenses divided by your Safe Withdrawal Rate. With the standard 4% SWR, you need 25 times your annual expenses. Spend $60,000/year: FIRE number = $1.5M. Spend $40,000/year: $1M. Spend $100,000/year: $2.5M. The 4% rule comes from the Trinity Study, which analyzed historical US stock and bond market data and found a 4% annual withdrawal has historically lasted 30+ years in virtually all scenarios, including the Great Depression and 2008 crash.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Savings Rate: The Fastest Path to FIRE</h3>
              <p>The savings rate is the most powerful variable. On a $80,000 income: 10% savings rate (~45 years to FI), 25% savings rate (~32 years), 50% savings rate (~17 years), 70% savings rate (~8.5 years). Increasing income while keeping expenses flat is the ultimate FIRE accelerator -- each additional dollar saved compounds at your portfolio return rate, not just sits in a savings account.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">FIRE Variants: Lean, Fat, Barista, Coast</h3>
              <p>Lean FIRE targets minimal annual expenses (under $40,000) requiring a $1M portfolio at 4% SWR. Fat FIRE requires $100,000+ annually in retirement -- often $2.5-3M+ -- maintaining a high standard of living. Barista FIRE involves semi-retirement where part-time work covers some expenses, allowing earlier retirement with a smaller portfolio. Coast FIRE means you have accumulated enough that compound growth alone will reach your FIRE number by traditional retirement age without further contributions -- you stop the race and coast.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">FIRE Investment Strategy</h3>
              <p>Most FIRE practitioners invest in low-cost broad market index funds: Vanguard Total Stock Market (VTI), S&amp;P 500 ETF (VOO), and Total International (VXUS). The three-fund portfolio (US stocks + International stocks + bonds) provides diversification at minimal cost (0.03-0.08% expense ratios). Tax-advantaged accounts (401k, Roth IRA, HSA) are maximized first, then taxable brokerage. The Roth IRA is especially valuable for FIRE due to tax-free growth and the ability to withdraw contributions (not earnings) before age 59.5.</p>
            </div>
          </div>
        </Card>
  
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          FIRE Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          If your annual expenses are $60,000, your FIRE number is <strong>$1.5M</strong> (25× rule). With a 50% savings rate, you could reach financial independence in under 17 years.
        </p>
        <p className="text-sm text-gray-600">
          This FIRE USA 2026 calculator shows exactly when you can retire early based on your income, expenses, and investment returns.
        </p>
      </Card>
      <SEOContent
        title="Fire Calculator USA 2026"
        category="finance"
        intro={`Financial Independence Retire Early (FIRE) is built on one deceptively simple insight: if your invested assets are large enough to generate sustainable withdrawals equal to your annual expenses, you no longer need to work to fund your life. The 4% rule, derived from the Trinity Study's analysis of historical US portfolio performance, suggests that a portfolio of 60-70% stocks can support 30-year withdrawals at 4% of initial portfolio value with a historically high success rate.

The FIRE number is your annual expenses ÷ your withdrawal rate. At 4%, that's annual expenses × 25. Someone spending $60,000/year needs $1,500,000 in investments. Someone spending $40,000/year needs $1,000,000. The most powerful lever for reaching FIRE faster isn't earning more (though that helps) — it's reducing expenses, which simultaneously reduces your FIRE number AND increases your savings rate.

Modern FIRE variants — Lean FIRE (very low expense levels), Fat FIRE (comfortable expenses), Coast FIRE (enough invested to reach your number without additional contributions if left to grow), and Barista FIRE (part-time work reduces withdrawal rate) — reflect the spectrum of how people approach financial independence.`}
        howItWorks={`FIRE number: Annual expenses / withdrawal rate = portfolio target. At 3.5% withdrawal rate (more conservative for early retirement): $50,000 annual expenses × (1/0.035) = $1,428,571. At 4%: $50,000 × 25 = $1,250,000.

Years to FIRE: Using compound growth formula with current portfolio, monthly savings rate, and expected investment return. A $200,000 portfolio growing at 7% with $3,000/month contributions reaches $1,000,000 in approximately 9-10 years.

Coast FIRE number: The portfolio size today that, left untouched and compounding at expected rate, will grow to your FIRE number by traditional retirement age. Coast Number = FIRE Number / (1 + r)^(years to traditional retirement). If FIRE number is $1,250,000 and you have 25 years at 7% return: Coast Number = $1,250,000 / (1.07)^25 = $231,000. If you have $231,000 invested today, you can stop additional contributions and still reach FIRE number by 65.`}
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
        tipsSection={`Model multiple scenarios: what does your FIRE timeline look like at 3.5%, 4%, and 4.5% withdrawal rates? What happens to your number if your expenses drop 20% in early retirement? The 4% rule was designed for 30-year retirements; people retiring at 40 often use 3.25-3.5% to account for the possibility of a 50-60 year portfolio horizon.

Don't forget healthcare costs in FIRE calculations, especially for US residents who lose employer-sponsored health insurance. ACA marketplace premiums for a family can run $800-$2,000/month depending on income level. Model healthcare as a separate line item, not as part of general expenses.

Consider sequence of returns risk — retiring into a bear market in the first 5 years has a disproportionately negative effect on long-term success, as you're selling depressed shares to fund expenses. Building a 1-2 year cash buffer and remaining flexible (reducing spending in down markets) significantly improves portfolio survival rates.`}
        conclusion={`FIRE is a goal that requires a decade or more of intentional saving and investing for most people. The math is straightforward; the execution requires sustained discipline, reduced lifestyle inflation, and willingness to delay gratification. The people who actually achieve FIRE aren't necessarily high earners — many have modest incomes and extraordinary savings rates.

For most people, some version of partial FIRE or financial independence with optional work is more realistic than full early retirement at 35. Reaching a point where you have enough invested to cover essential expenses and work becomes truly optional — rather than mandatory — changes your relationship with money and career in profound ways. Use [our Savings Goal Calculator](/calculators/finance/savings-goal-calculator) to map the contribution path to your specific FIRE number.`}

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
        {/* Internal Links */}
        {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "Savings Rate Calculator", href: "/calculators/finance/savings-rate-calculator", icon: "💰", desc: "Free calculator" },          { name: "Wealth Calculator", href: "/calculators/finance/wealth-calculator", icon: "💎", desc: "Free calculator" },          { name: "Net Worth Calculator", href: "/calculators/finance/net-worth-calculator", icon: "⚖️", desc: "Free calculator" },          { name: "Retirement Calculator", href: "/calculators/finance/retirement-calculator", icon: "🌅", desc: "Free calculator" },          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },          { name: "Roth IRA Calculator", href: "/calculators/finance/roth-ira-calculator", icon: "🛡️", desc: "Free calculator" },          { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "Lumpsum Calculator", href: "/calculators/finance/lumpsum-calculator", icon: "💰", desc: "Free calculator" },          { name: "SIP Calculator", href: "/calculators/finance/sip-calculator", icon: "📈", desc: "Free calculator" },          { name: "Real Return Calculator", href: "/calculators/finance/real-return-calculator", icon: "📊", desc: "Free calculator" },          { name: "Mortgage Calculator", href: "/calculators/finance/mortgage-calculator", icon: "🏡", desc: "Free calculator" },          { name: "Tax Bracket Calculator", href: "/calculators/finance/tax-bracket-calculator", icon: "🧾", desc: "Free calculator" },
          ]}
        />
      
    </CalculatorLayout>
  )
}
