'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line } from 'recharts'
import { calculateEMI } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function EMICalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { currency, fmt, fmtCompact } = useCurrency()
  const d = currency.defaultValues

  const [principal, setPrincipal] = useState(d.loanAmount)
  const [rate, setRate] = useState(7.5)
  const [tenure, setTenure] = useState(5)
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years')

  const tenureMonths = tenureType === 'years' ? tenure * 12 : tenure
  const result = useMemo(() => calculateEMI(principal, rate, tenureMonths), [principal, rate, tenureMonths])

  const pieData = [
    { name: 'Principal', value: principal, color: '#3b82f6' },
    { name: 'Total Interest', value: result.totalInterest, color: '#f59e0b' },
  ]

  const yearlyData = []
  for (let y = 1; y <= Math.ceil(tenureMonths / 12); y++) {
    const slice = result.schedule.slice((y - 1) * 12, y * 12)
    yearlyData.push({
      year: `Y${y}`,
      principal: Math.round(slice.reduce((s, m) => s + m.principal, 0)),
      interest: Math.round(slice.reduce((s, m) => s + m.interest, 0)),
      balance: slice[slice.length - 1]?.balance ?? 0,
    })
  }

  return (
    <CalculatorLayout title="Loan EMI Calculator USA 2026" description={`Calculate monthly loan EMI, total interest, and amortization schedule in ${currency.name} (${currency.symbol}).`} icon="🏦" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-5">Loan Details</h2>
          <div className="space-y-5">
            <InputField label={`Loan Amount (${currency.symbol})`} value={principal} onChange={setPrincipal}
              min={currency.code === 'INR' ? 10000 : 1000}
              max={currency.code === 'INR' ? 50000000 : 2000000}
              step={currency.code === 'INR' ? 10000 : 1000}
              prefix={currency.symbol}
            />
            <InputField label="Annual Interest Rate" value={rate} onChange={setRate} min={1} max={30} step={0.1} suffix="%" />
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Loan Tenure</label>
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                  <input type="number" value={tenure} onChange={e => setTenure(Number(e.target.value))}
                    className="w-full bg-transparent text-gray-900 font-semibold outline-none text-right" min={1} max={tenureType === 'years' ? 30 : 360} />
                </div>
                <div className="flex rounded-xl overflow-hidden border border-gray-200">
                  {(['years', 'months'] as const).map(t => (
                    <button key={t} onClick={() => setTenureType(t)}
                      className={`px-3 py-2 text-xs font-semibold transition-all capitalize ${tenureType === t ? 'bg-green-600 text-white' : 'bg-gray-50 text-gray-500 hover:text-white'}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <input type="range" value={tenure} onChange={e => setTenure(Number(e.target.value))} min={1} max={tenureType === 'years' ? 30 : 360} className="w-full"
                style={{ background: `linear-gradient(to right,#14b8a6 0%,#14b8a6 ${((tenure - 1) / (tenureType === 'years' ? 29 : 359)) * 100}%,#1e293b ${((tenure - 1) / (tenureType === 'years' ? 29 : 359)) * 100}%,#1e293b 100%)` }} />
            </div>
          </div>

          <div className="mt-5 p-4 rounded-xl bg-amber-50 border border-amber-200">
            <p className="text-xs text-gray-500 mb-2 font-medium">Loan Summary</p>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Loan Amount</span><span className="text-gray-900 font-semibold">{fmt(principal)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Rate (monthly)</span><span className="text-gray-900 font-semibold">{(rate / 12).toFixed(3)}%</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Tenure</span><span className="text-gray-900 font-semibold">{tenureMonths} months</span></div>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Monthly EMI" value={fmt(result.emi)} subValue="Fixed monthly payment" highlight />
            <ResultCard label="Total Interest" value={fmtCompact(result.totalInterest)} subValue={`${((result.totalInterest / principal) * 100).toFixed(1)}% of principal`} />
            <ResultCard label="Total Payment" value={fmtCompact(result.totalPayment)} subValue={`Over ${tenureMonths} months`} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Principal vs Interest</h3>
              <div style={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value">
                      {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number, name) => [fmt(v), name]} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Yearly Principal vs Interest</h3>
              <div style={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={yearlyData.slice(0, 15)} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false}
                      tickFormatter={v => v >= 1000000 ? `${currency.symbol}${(v / 1000000).toFixed(0)}M` : `${currency.symbol}${(v / 1000).toFixed(0)}K`} />
                    <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number, name) => [fmt(v), name]} />
                    <Bar dataKey="principal" name="Principal" fill="#3b82f6" stackId="a" />
                    <Bar dataKey="interest" name="Interest" fill="#f59e0b" stackId="a" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Outstanding Balance Chart */}
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Outstanding Balance Over Time</h3>
            <div style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={yearlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} width={72}
                    tickFormatter={v => v >= 1000000 ? `${currency.symbol}${(v / 1000000).toFixed(1)}M` : `${currency.symbol}${(v / 1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number, name) => [fmt(v), name]} />
                  <Line type="monotone" dataKey="balance" name="Outstanding Balance" stroke="#ec4899" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Amortization Schedule (Every 3rd Month)</h3>
            <div className="overflow-y-auto max-h-64">
              <table className="calc-table">
                <thead><tr><th>Month</th><th>EMI</th><th>Principal</th><th>Interest</th><th>Balance</th></tr></thead>
                <tbody>
                  {result.schedule.filter((_, i) => i % 3 === 0 || i === result.schedule.length - 1).map(row => (
                    <tr key={row.month}>
                      <td className="text-gray-500">{row.month}</td>
                      <td>{fmt(row.emi)}</td>
                      <td className="text-green-600">{fmt(row.principal)}</td>
                      <td className="text-amber-400">{fmt(row.interest)}</td>
                      <td className="font-medium text-white">{fmt(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        <Card>
          <h2 className="text-xl font-bold font-display text-white mb-4">EMI Formula Explained</h2>
          <div className="bg-gray-50 rounded-xl p-4 font-mono text-sm text-gray-700 border border-gray-100">
            EMI = P x r x (1+r)n / ( (1+r)n - 1 )
            <div className="mt-3 space-y-1 text-xs text-gray-400 font-sans">
              <p><span className="text-green-600">P</span> = {fmt(principal)}, <span className="text-green-600">r</span> = {(rate / 12).toFixed(4)}% / month, <span className="text-green-600">n</span> = {tenureMonths} months</p>
              <p className="text-white mt-2">-{'>'} EMI = <span className="text-green-700 font-bold">{fmt(result.emi)}</span> / month</p>
            </div>
          </div>
        </Card>
        
      {/* 600-word SEO section */}
      <div className="mt-10">
        <Card>
          <h2 className="text-xl font-black text-gray-900 mb-4">EMI Calculator - Mastering Loan Repayment 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">How EMI Calculation Works</h3>
              <p>EMI (Equated Monthly Installment) is your fixed monthly loan repayment, calculated using: EMI = P x r x (1+r)^n / [(1+r)^n - 1], where P = Principal, r = monthly interest rate (annual rate / 12 / 100), n = tenure in months. This formula ensures the loan is fully paid off at tenure end, with each EMI split between interest and principal. Crucially, in early months, most of the EMI goes to interest (due to high outstanding principal), and only a small portion reduces principal. As principal reduces, the interest portion shrinks and principal repayment accelerates - this is the amortization effect. Our EMI calculator shows the full month-wise schedule so you can visualize this exactly.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Tenure vs EMI - The Interest Cost Trap</h3>
              <p>Longer tenures lower EMI but dramatically increase total interest. For a $30 thousand home loan at 8.75%: 10-year tenure: EMI = $37,684; total interest = $15.2 thousands. 20-year tenure: EMI = $26,648; total interest = $33.95 thousands. 30-year tenure: EMI = $23,606; total interest = $55 thousands. The 30-year loan pays 3.6x more interest than the 10-year loan for the same $30 thousand borrowed! Banks love longer tenures because they earn more interest. Borrowers should choose the shortest tenure their cash flow allows, not the longest tenure to minimize EMI. Every year reduction in tenure saves roughly $1.5-2.5 thousands on a typical home loan.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Reducing Balance vs Flat Rate - Know the Difference</h3>
              <p>All major bank loans in the US use reducing balance interest calculation - interest is charged only on the outstanding principal, which reduces with each EMI payment. Some NBFCs and informal lenders quote 'flat rate' interest - calculated on the original principal throughout the tenure. A 10% flat rate equals approximately 18-20% effective reducing balance rate! Always ask for the Annual Percentage Rate (APR) or reducing balance rate when comparing loan offers. The EMI might seem similar, but the true cost of a flat-rate loan is far higher. Our calculator uses the industry-standard reducing balance method used by all Federal Reserve-regulated banks.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Smart EMI Strategies - Save Lakhs Without Paying More</h3>
              <p>Three powerful strategies to reduce total interest without changing your EMI: (1) Prepayment: Pay extra principal whenever possible - even $10,000 extra once a year on a home loan can save $2-3 thousands in interest over 20 years. (2) Increase EMI with salary hike: If your salary increases 10%, increase your EMI by 5% - reduces tenure by 3-4 years on a 20-year loan. (3) Balance transfer: If rates fall significantly (0.5%+ difference), transfer loan to lower-rate lender - saves substantially over remaining tenure. For home loans specifically, note that floating-rate loans adjust with Federal Reserve rate changes - consider part-fixed/part-floating structures to balance stability and benefit from rate cuts.</p>
            </div>
          </div>
        </Card>
      </div>

            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          EMI Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this EMI USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Loan EMI Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, on a $75,000 loan at 7% for 7 years, your loan EMI calculator USA 2026 shows a monthly payment of $1,130 and total interest of $19,920 over the full loan term.
        </p>
      </Card>

            <SEOContent
        title="Loan EMI Calculator USA – Calculate Your Exact Monthly Loan Payment in 2026"
        category="finance"
        intro={`EMI (Equated Monthly Installment) is the fixed monthly payment on any loan — home loan, auto loan, personal loan, or business loan. Understanding how your EMI is calculated, how much goes to interest versus principal each month, and how different terms and rates affect total cost is essential to evaluating any lending product.

The math that most borrowers miss: at the beginning of any loan, the vast majority of each EMI payment goes toward interest, not principal. On a ₹50 lakh home loan at 8.5% for 20 years, the first EMI of approximately ₹43,400 includes ₹35,417 in interest and only ₹7,983 in principal reduction. In the first year alone, you pay over ₹4.24 lakh in interest while reducing your principal by less than ₹96,000.

This front-loading of interest explains why prepaying a loan in the early years has a dramatically larger impact than prepaying in later years. The same ₹1 lakh prepayment in year 2 saves far more total interest than the same prepayment in year 15.`}
        howItWorks={`EMI formula: EMI = P × r × (1+r)^n / [(1+r)^n - 1], where P = principal loan amount, r = monthly interest rate (annual rate ÷ 12), n = total number of EMIs (loan tenure in months). For P = ₹50,00,000, r = 8.5%/12 = 0.7083%, n = 240: EMI = ₹43,391.

Total interest: (EMI × n) - Principal = total interest paid. For the above: (₹43,391 × 240) - ₹50,00,000 = ₹54,13,840 total interest — more than the original loan amount.

Balance outstanding: After m payments, remaining balance = P × [(1+r)^n - (1+r)^m] / [(1+r)^n - 1]. This formula lets you calculate exactly how much you still owe at any point in the loan tenure.`}
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
        tipsSection={`Compare the total cost of different loan tenures, not just the monthly EMI. A ₹30 lakh home loan at 8.5%: 15-year tenure = EMI ₹29,562, total interest ₹23.2 lakh. 20-year tenure = EMI ₹26,035, total interest ₹32.5 lakh. The 20-year tenure costs ₹3,527 less per month but ₹9.3 lakh more in total — a significant long-term cost for short-term payment relief.

For home loans, check the impact of a 0.25-0.5% rate reduction through MCLR or repo rate cuts. On a ₹50 lakh loan over 20 years, a 0.5% rate reduction saves approximately ₹5.8 lakh in total interest. Always request benefit pass-through from your lender when repo rates fall.

Prepayment strategy: Model the interest saved by making one additional EMI payment per year. Paying one extra EMI annually on a 20-year home loan reduces the tenure by approximately 3-4 years and saves substantial interest.`}
        conclusion={`The EMI-to-income ratio is a key lending health metric. Banks typically cap home loan EMIs at 40-50% of gross monthly income, but the financial planning recommendation is to keep total EMIs (all loans combined) below 35-40% of net (take-home) income. Exceeding this threshold leaves insufficient margin for emergencies and savings.

For Indian borrowers comparing floating vs fixed rate loans: floating rate EMIs change with RBI repo rate movements, while fixed rate loans provide certainty but typically start higher. In a falling rate environment, floating rate loans benefit borrowers; in a rising rate cycle, fixed rates provide protection. Use [our Home Loan Calculator](/calculators/finance/home-loan-calculator) for detailed home loan amortization analysis.`}

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
          { name: "Personal Loan Calculator", href: "/calculators/finance/personal-loan-calculator", icon: "💳", desc: "Free calculator" },          { name: "Loan Comparison Calculator", href: "/calculators/finance/loan-comparison-calculator", icon: "⚖️", desc: "Free calculator" },          { name: "Debt Payoff Calculator", href: "/calculators/finance/debt-payoff-calculator", icon: "🔓", desc: "Free calculator" },          { name: "Credit Card Payoff Calculator", href: "/calculators/finance/credit-card-payoff-calculator", icon: "💳", desc: "Free calculator" },          { name: "Payoff Date Calculator", href: "/calculators/finance/payoff-date-calculator", icon: "📅", desc: "Free calculator" },          { name: "Interest Rate Calculator", href: "/calculators/finance/interest-rate-calculator", icon: "📈", desc: "Free calculator" },          { name: "Student Loan Calculator", href: "/calculators/finance/student-loan-calculator", icon: "🎓", desc: "Free calculator" },          { name: "Loan Prepayment Calculator", href: "/calculators/finance/loan-prepayment-calculator", icon: "⚡", desc: "Free calculator" },          { name: "Budget Planner Calculator", href: "/calculators/finance/budget-planner-calculator", icon: "📊", desc: "Free calculator" },          { name: "Mortgage Calculator", href: "/calculators/finance/mortgage-calculator", icon: "🏡", desc: "Free calculator" },          { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "Tax Bracket Calculator", href: "/calculators/finance/tax-bracket-calculator", icon: "🧾", desc: "Free calculator" },
          ]}
        />

    </CalculatorLayout>
  )
}
