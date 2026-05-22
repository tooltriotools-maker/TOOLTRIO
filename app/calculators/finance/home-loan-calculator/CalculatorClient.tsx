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

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { currency, fmt, fmtCompact } = useCurrency()
  const d = currency.defaultValues

  const [homeValue, setHomeValue] = useState(d.homeLoan)
  const [downPayPct, setDownPayPct] = useState(20)
  const [rate, setRate] = useState(6.5)
  const [years, setYears] = useState(30)

  const downPayment = Math.round(homeValue * downPayPct / 100)
  const loanAmount = homeValue - downPayment
  const result = useMemo(() => calculateEMI(loanAmount, rate, years * 12), [loanAmount, rate, years])

  const pieData = [
    { name: 'Down Payment', value: downPayment, color: '#22c55e' },
    { name: 'Principal', value: loanAmount, color: '#3b82f6' },
    { name: 'Total Interest', value: result.totalInterest, color: '#f59e0b' },
  ]

  const yearlyData = []
  for (let y = 1; y <= years; y++) {
    const slice = result.schedule.slice((y - 1) * 12, y * 12)
    yearlyData.push({
      year: `Y${y}`,
      principal: Math.round(slice.reduce((s, m) => s + m.principal, 0)),
      interest: Math.round(slice.reduce((s, m) => s + m.interest, 0)),
      balance: slice[slice.length - 1]?.balance ?? 0,
    })
  }

  const tickFmt = (v: number) => {
    if (currency.code === 'INR') return v >= 10000000 ? `₹${(v / 10000000).toFixed(1)}Cr` : v >= 100000 ? `₹${(v / 100000).toFixed(0)}L` : `₹${(v / 1000).toFixed(0)}K`
    return v >= 1000000 ? `${currency.symbol}${(v / 1000000).toFixed(1)}M` : `${currency.symbol}${(v / 1000).toFixed(0)}K`
  }

  return (
    <CalculatorLayout title="Home Loan Calculator USA 2026" description={`Calculate your home loan EMI, amortization, and total interest in ${currency.name}.`} icon="🏠" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-5">Property &amp; Loan</h2>
          <div className="space-y-5">
            <InputField label={`Property Value (${currency.symbol})`} value={homeValue} onChange={setHomeValue}
              min={currency.code === 'INR' ? 1000000 : 50000}
              max={currency.code === 'INR' ? 100000000 : 5000000}
              step={currency.code === 'INR' ? 100000 : 10000}
              prefix={currency.symbol}
            />
            <InputField label="Down Payment" value={downPayPct} onChange={setDownPayPct} min={5} max={50} step={1} suffix="%" />
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 text-sm space-y-1.5">
              <div className="flex justify-between"><span className="text-gray-500">Down Payment</span><span className="text-green-400 font-semibold">{fmt(downPayment)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Loan Amount</span><span className="text-blue-400 font-semibold">{fmt(loanAmount)}</span></div>
            </div>
            <InputField label="Interest Rate" value={rate} onChange={setRate} min={2} max={20} step={0.1} suffix="%" />
            <InputField label="Loan Tenure" value={years} onChange={setYears} min={5} max={30} step={1} suffix="Yrs" />
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Monthly EMI" value={fmt(result.emi)} highlight />
            <ResultCard label="Total Interest" value={fmtCompact(result.totalInterest)} subValue={`${((result.totalInterest / loanAmount) * 100).toFixed(1)}% of loan`} />
            <ResultCard label="Total Cost" value={fmtCompact(homeValue + result.totalInterest)} subValue="Property + interest" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Cost Breakdown</h3>
              <div style={{ height: 210 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={82} paddingAngle={3} dataKey="value">
                      {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number, name) => [fmt(v), name]} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Remaining Balance</h3>
              <div style={{ height: 210 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={yearlyData.filter((_, i) => i % 2 === 0 || i === yearlyData.length - 1)} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={72} tickFormatter={tickFmt} />
                    <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number, name) => [fmt(v), name]} />
                    <Line type="monotone" dataKey="balance" name="Remaining Balance" stroke="#ec4899" strokeWidth={2.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Yearly Payment Breakdown</h3>
            <div style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={yearlyData.filter((_, i) => i % 3 === 0 || i === yearlyData.length - 1)} margin={{ top: 0, right: 5, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={72} tickFormatter={tickFmt} />
                  <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number, name) => [fmt(v), name]} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="principal" name="Principal" fill="#3b82f6" stackId="a" />
                  <Bar dataKey="interest" name="Interest" fill="#f59e0b" stackId="a" radius={[4, 4, 0, 0]} />
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
          <h2 className="text-xl font-black text-gray-900 mb-4">Home Loan Calculator - Complete Guide to Mortgage Planning in the US USA 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">How Home Loans Work in the US</h3>
              <p>A home loan is a secured loan where the property being purchased serves as collateral. Indian banks offer home loans for up to 80-90% of property value (LTV ratio), with tenures ranging from 5 to 30 years. Interest rates can be floating (linked to Federal Reserve repo rate via EBLR/MCLR) or fixed (unchanged for 2-5 years then floating). As of 2026, home loan rates range from 8.35-9.5% for most banks. The US mortgage (linked to EBLR) is the most popular benchmark. Home loans in the US are eligible for significant tax benefits under Section 24(b) and IRA deduction / 401k contribution.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Tax Benefits on Home Loans</h3>
              <p>Home loans offer dual tax benefits: (1) Section 24(b): Interest paid on home loan is deductible up to $2 thousand per year for self-occupied property (no limit for let-out property, but set-off limit against other income is $2 thousand). (2) IRA deduction / 401k contribution: Principal repayment is deductible up to $1.5 thousand per year (within the overall 80C limit). For first-time home buyers, additional deduction of $50,000 under Section 80EE (subject to loan and property value conditions). These benefits significantly reduce the effective interest cost, especially in the early years.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Home Loan Prepayment - Save Lakhs in Interest</h3>
              <p>Home loan prepayment is one of the most impactful financial decisions you can make. Even small prepayments dramatically reduce total interest. Example: $50 thousand home loan at 8.5% for 20 years. Total interest without prepayment = $60.2 thousands. Making $1 thousand prepayment every year from Year 2: saves $18.4 thousands in interest and reduces tenure by 6 years! Federal Reserve mandates that floating-rate home loans have no prepayment penalty. Fixed-rate loans may charge 2-3% on the prepaid amount. Our Loan Prepayment Calculator helps quantify exact savings.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">How to Choose the Right Home Loan</h3>
              <p>Key factors when choosing a home loan: (1) Interest rate type: Floating rates are currently lower and benefit from Federal Reserve rate cuts. Fixed rates offer certainty but are typically 1-2% higher. (2) Processing fees: Typically 0.25-1% of loan amount. Negotiate - many banks waive this. (3) Prepayment penalty: Choose floating rate to avoid penalties. (4) EBLR vs MCLR: EBLR (External Benchmark-linked Rate) adjusts faster to Federal Reserve rate changes. (5) Loan amount vs income: Banks typically allow EMI-to-income ratio of 40-50%. Keep EMI under 35% of take-home pay for financial comfort.</p>
            </div>
          </div>
        </Card>
      </div>

            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Home Loan Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          A $25,000 loan at 8% APR over 5 years results in monthly payments of approximately <strong>$507</strong> with total interest of $4,420.
        </p>
        <p className="text-sm text-gray-600">
          Use this Home Loan USA 2026 tool to compare different loan scenarios and find the fastest, cheapest path to debt freedom.
        </p>
      </Card>
      <SEOContent
        title="Home Loan Calculator USA – What Is Your Monthly Mortgage Payment in 2026?"
        category="finance"
        intro={`A home loan in the Indian context involves several specific features not present in US mortgages: floating rates linked to MCLR or repo rate (most Indian home loans are floating, not fixed), tax benefits under Section 24 and Section 80C, and the practical reality that most Indian borrowers will prepay or partially prepay their loan over the tenure.

India's home loan rates in 2024-2026 ranged from approximately 8.5% to 10.5% for most borrowers, significantly higher than the historical lows of 6.5-7% during COVID. At 9.5%, a ₹50 lakh, 20-year loan costs approximately ₹46,620/month and ₹61.9 lakh in total interest — more than the loan principal. This front-loading is why many Indian borrowers strategically prepay in the first 5-10 years.

Income tax benefits change the true net cost of a home loan: Section 24 allows deduction of up to ₹2 lakh per year in home loan interest (for self-occupied property), and Section 80C allows deduction of principal repayment up to ₹1.5 lakh. At 30% tax bracket, these combined deductions can save ₹1.05 lakh annually — effectively reducing your net interest rate.`}
        howItWorks={`EMI calculation: Same as standard amortization formula. EMI = P × r(1+r)^n / [(1+r)^n - 1], where r = monthly rate = annual rate/12. For ₹50,00,000 at 9.5% for 20 years: r = 0.7917%, n = 240. EMI ≈ ₹46,607.

Total interest: (EMI × n) - Principal = ₹46,607 × 240 - ₹50,00,000 = ₹61,85,680 — more than the loan amount.

Tax benefit calculation: Annual interest paid (from amortization schedule, front-loaded in early years) × tax bracket rate, up to Section 24 limit of ₹2,00,000. Plus principal repayment × tax bracket, up to ₹1,50,000 Section 80C limit. Net loan cost = Total interest - Tax savings over loan tenure.`}
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
        tipsSection={`Prepayment is the most powerful tool for reducing total home loan cost. On a ₹50 lakh loan at 9.5% for 20 years, prepaying ₹5 lakh in year 3 saves approximately ₹18-20 lakh in interest and reduces tenure by 3-4 years. Most Indian banks allow partial prepayments on floating rate loans without penalty.

Check whether your bank is passing on RBI repo rate cuts to your home loan. Under the RLLR (Repo-Linked Lending Rate) regime, rate cuts should transmit within 3 months. If you have an older MCLR-linked loan, consider switching to RLLR for faster transmission of rate changes.

Compare home loan offers using the annual percentage rate (APR) that includes processing fees, legal charges, and other upfront costs, not just the stated interest rate. A loan at 8.9% with ₹50,000 in processing fees may cost more than a 9.0% loan with minimal fees on shorter tenures.`}
        conclusion={`For first-time homebuyers in India, Pradhan Mantri Awas Yojana (PMAY) provides interest subsidies of up to ₹2.67 lakh for eligible borrowers based on income category (EWS/LIG/MIG). Check eligibility before choosing your loan structure.

The rent vs buy decision for Indian metros deserves careful analysis at current prices. In Mumbai and Delhi NCR, rental yields are 2-3% while home loan costs are 9-10% — creating a significant negative carry for buyers. This doesn't mean renting is always better, but it means the financial case for buying versus renting is weaker than cultural norms suggest. Use [our EMI vs SIP Calculator](/calculators/finance/emi-vs-sip-calculator) to model the full comparison.`}

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
            { name: "Debt Payoff Calculator", href: "/calculators/finance/debt-payoff-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Credit Card Payoff Calculator", href: "/calculators/finance/credit-card-payoff-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Paycheck Calculator", href: "/calculators/finance/paycheck-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Emergency Fund Calculator", href: "/calculators/finance/emergency-fund-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "ROI Calculator", href: "/calculators/finance/roi-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "Savings Rate Calculator", href: "/calculators/finance/savings-rate-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "Net Worth Calculator", href: "/calculators/finance/net-worth-calculator", icon: "🔗", desc: "Related financial planning" },
        ]}
      />
      <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
