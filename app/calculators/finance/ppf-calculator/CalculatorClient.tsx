'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { calculatePPF } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Shield, TrendingUp, Calendar, DollarSign } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, currency } = useCurrency()
  const [yearlyDeposit, setYearlyDeposit] = useState(150000)
  const [years, setYears] = useState(15)
  const [interestRate, setInterestRate] = useState(7.1)

  const r = useMemo(() => calculatePPF(yearlyDeposit, years, interestRate), [yearlyDeposit, years, interestRate])

  const pie = [
    { name: 'Total Deposited', value: r.totalDeposited, color: '#93c5fd' },
    { name: 'Interest Earned', value: r.totalInterest, color: '#16a34a' },
  ]

  return (
    <CalculatorLayout title="PPF Calculator India 2026" description="Calculate PPF maturity value, year-by-year growth, and tax-free returns at 7.1% current rate." icon="🏛️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">PPF Details</h2>
          <div className="space-y-5">
            <InputField label="Yearly Deposit" value={yearlyDeposit} onChange={setYearlyDeposit} min={500} max={150000} step={500} prefix={currency.symbol} />
            <InputField label="Investment Period (Years)" value={years} onChange={setYears} min={15} max={50} step={1} suffix="Yr" />
            <InputField label="Interest Rate" value={interestRate} onChange={setInterestRate} min={6} max={10} step={0.1} suffix="%" />
          </div>
          <div className="mt-5 p-3 rounded-xl bg-blue-50 border border-blue-200 text-sm">
            <p className="font-bold text-blue-700 mb-1">🛡️ PPF Tax Benefits</p>
            <ul className="text-xs text-blue-600 space-y-0.5">
              <li>- Deposit: Deductible under 80C</li>
              <li>- Interest: Tax-free</li>
              <li>- Maturity: Tax-free (EEE status)</li>
              <li>- Annual contribution limit applies</li>
            </ul>
          </div>
          <div className="mt-3 p-3 rounded-xl bg-green-50 border border-green-200 text-center">
            <p className="text-xs text-green-700 font-bold mb-1">💰 Maturity Amount</p>
            <p className="text-xl font-black text-green-700">{fmt(r.maturityAmount, true)}</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Maturity Amount" value={fmt(r.maturityAmount)} highlight icon={<DollarSign className="w-4 h-4" />} />
            <ResultCard label="Total Deposited" value={fmt(r.totalDeposited)} icon={<Shield className="w-4 h-4" />} />
            <ResultCard label="Interest Earned" value={fmt(r.totalInterest)} icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="Investment Period" value={`${years} Years`} icon={<Calendar className="w-4 h-4" />} />
          </div>

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-4">PPF Growth Over {years} Years</h3>
            <div style={{ height: 240 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={r.yearlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="ppfT" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#16a34a" stopOpacity={0.15} /><stop offset="95%" stopColor="#16a34a" stopOpacity={0} /></linearGradient>
                    <linearGradient id="ppfD" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#93c5fd" stopOpacity={0.2} /><stop offset="95%" stopColor="#93c5fd" stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="year" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v, true)} width={70} />
                  <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number) => [fmt(v), '']} labelFormatter={y => `Year ${y}`} />
                  <Area type="monotone" dataKey="totalDeposited" name="Total Deposited" stroke="#93c5fd" fill="url(#ppfD)" strokeWidth={1.5} dot={false} />
                  <Area type="monotone" dataKey="balance" name="Total Balance" stroke="#16a34a" fill="url(#ppfT)" strokeWidth={2.5} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-3">Deposit vs Interest</h3>
              <div style={{ height: 170 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pie} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={3}>
                      {pie.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number) => fmt(v)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4">
                {pie.map(e => <div key={e.name} className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{ background: e.color }} /><span className="text-xs text-gray-600">{e.name}</span></div>)}
              </div>
            </Card>
            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-3">Year-wise Interest</h3>
              <div className="max-h-52 overflow-y-auto">
                <table className="calc-table">
                  <thead><tr><th>Year</th><th>Deposit</th><th>Interest</th><th>Balance</th></tr></thead>
                  <tbody>{r.yearlyData.map((row: any) => (
                    <tr key={row.year}><td className="text-gray-500">{row.year}</td><td>{fmt(row.deposit)}</td><td className="text-green-600">{fmt(row.interest)}</td><td className="font-bold text-gray-900">{fmt(row.balance)}</td></tr>
                  ))}</tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <div className="mt-8">
      {/* 600-word SEO explanation */}
      <div className="mt-10">
        <Card>
          <h2 className="text-xl font-black text-gray-900 mb-4">Roth IRA Calculator - Complete Guide to Public 401(k) Investment 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Roth IRA - Why It's Called the Safest Investment in the US</h3>
              <p>Public 401(k) (Roth IRA) is a government-backed long-term savings scheme introduced in 1968, offering guaranteed returns with complete capital safety. The Roth IRA account can be opened at any post office or major nationalized/private banks (SBI, PNB, HDFC, ICICI, etc.). The current interest rate is 7.1% per annum, compounded annually, reviewed quarterly by the government. Roth IRA offers the unique 'EEE' (Exempt-Exempt-Exempt) tax status in the US: deposits qualify for IRA deduction / 401k contribution deduction, interest earned is tax-free, and the maturity amount is fully tax-free. This triple tax advantage makes Roth IRA unmatched for risk-free, tax-efficient long-term wealth creation.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Roth IRA Rules - Lock-in, Withdrawal, and Extension</h3>
              <p>Key Roth IRA rules every investor must know: Minimum tenure: 15 years (extendable in 5-year blocks). Annual deposit: Minimum $500, maximum $1.5 thousand (in max 12 installments). Premature closure: Allowed after 5 years for specific reasons (critical illness, higher education) with 1% interest penalty. Partial withdrawal: Allowed from Year 7 - up to 50% of balance at end of 4th preceding year. Loan against Roth IRA: Available from Year 3 to Year 6 - up to 25% of balance. Account extension: After 15 years, you can extend in 5-year blocks. With deposits: continues earning 7.1% on growing corpus. Without deposits: existing corpus earns interest, partial withdrawals allowed annually.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Roth IRA vs FD vs tax-advantaged mutual fund - Tax-Adjusted Returns Comparison</h3>
              <p>Comparing post-tax returns for an investor in the 37% federal tax bracket (15-year horizon): Roth IRA: 7.1% gross = 7.1% post-tax (Roth IRA tax-free status). FD at 7.5%: Post-tax return = 7.5% x (1-0.30) = 5.25%. tax-advantaged mutual fund equity fund at 13% CAGR: LTCG at 12.5% on gains above $1.25L: Post-tax ~= 11.5-12%. tax-advantaged mutual fund clearly wins on returns, but Roth IRA wins on zero risk. The right strategy for a 30% bracket investor: Max out Roth IRA ($1.5L/year for 80C deduction and guaranteed return) + invest additional savings in tax-advantaged mutual fund/equity funds for superior long-term growth. This combination balances safety, tax efficiency, and wealth creation.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">How to Maximize Roth IRA Returns - Advanced Strategies</h3>
              <p>Most Roth IRA investors miss these return-maximizing strategies: (1) Deposit before 5th of each month - Roth IRA interest is calculated on the minimum balance between the 5th and last day of the month. Depositing on April 1st (or by 5th April) earns interest for the full year, while depositing on April 6th loses one full month of interest. (2) Maximize deposits in April: Depositing the full $1.5 thousand at the start of the financial year (April) earns interest for 12 months vs depositing in March (only 1 month). Over 15 years, early April deposits can add $1-2 thousands extra to the maturity amount. (3) Open Roth IRA for minor children: Each minor child can have a Roth IRA account with the parent as guardian, combined deposit limit $1.5L across all accounts.</p>
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
          { name: "SIP Calculator", href: "/calculators/finance/sip-calculator", icon: "📈", desc: "Free calculator" },          { name: "NPS Calculator", href: "/calculators/finance/nps-calculator", icon: "📊", desc: "Free calculator" },          { name: "Fd Calculator", href: "/calculators/finance/fd-calculator", icon: "🏦", desc: "Free calculator" },          { name: "Rd Calculator", href: "/calculators/finance/rd-calculator", icon: "📊", desc: "Free calculator" },          { name: "Lumpsum Calculator", href: "/calculators/finance/lumpsum-calculator", icon: "💰", desc: "Free calculator" },          { name: "Step Up SIP Calculator", href: "/calculators/finance/step-up-sip-calculator", icon: "📊", desc: "Free calculator" },          { name: "SIP vs Fd Calculator", href: "/calculators/finance/sip-vs-fd-calculator", icon: "📊", desc: "Free calculator" },          { name: "SIP vs PPF Calculator", href: "/calculators/finance/sip-vs-ppf-calculator", icon: "📊", desc: "Free calculator" },          { name: "SIP vs NPS Calculator", href: "/calculators/finance/sip-vs-nps-calculator", icon: "📊", desc: "Free calculator" },          { name: "Mutual Fund Calculator", href: "/calculators/finance/mutual-fund-calculator", icon: "📊", desc: "Free calculator" },          { name: "Mutual Fund Return Calculator", href: "/calculators/finance/mutual-fund-return-calculator", icon: "📊", desc: "Free calculator" },          { name: "PPF vs Fd Calculator", href: "/calculators/finance/ppf-vs-fd-calculator", icon: "📊", desc: "Free calculator" },
          ]}
        />
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          PPF Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this PPF USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          PPF Calculator Example (India 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, depositing INR 1 lakh/year in PPF starting today, your PPF calculator India 2026 shows your year-by-year balance, total deposits, total interest earned, and maturity value after 15 years.
        </p>
      </Card>

            <SEOContent
        title="PPF Calculator India – How Much Will Your PPF Account Be Worth at Maturity in 2026?"
        category="finance"
        intro={`The Public Provident Fund is arguably India's best investment product for the patient middle-class investor: 7.1% guaranteed by the Government of India, compounded annually, completely tax-free (interest, maturity proceeds, and the principal deduction under 80C all qualify for EEE tax treatment). No other safe investment in India comes close to this combination of safety, guaranteed return, and tax exemption.

The PPF account can only be opened at a post office or designated bank (SBI, PNB, and others). The minimum annual contribution is ₹500 and the maximum is ₹1.5 lakh per year. Interest is calculated on the minimum monthly balance between the 5th and last day of each month — which means contributions deposited before the 5th of any month earn interest for that month. Contributions after the 5th miss that month's interest calculation.

PPF's 15-year lock-in is both its limitation and its strength. The lock-in forces discipline — you can't impulsively withdraw it during a financial panic or lifestyle upgrade. The account can be extended in 5-year blocks indefinitely after the initial 15 years, continuing to earn tax-free interest and allowing continued contributions.`}
        howItWorks={`PPF maturity value: For equal annual contributions C at rate r for n years: FV = C × [(1+r)^n - 1] / r × (1+r). For ₹1.5 lakh annually at 7.1% for 15 years: ₹1,50,000 × [(1.071)^15 - 1] / 0.071 × 1.071 = approximately ₹40.68 lakh.

Interest calculation: PPF interest is calculated monthly on minimum balance between 5th and last day of the month. Annual interest = sum of 12 monthly calculations. Interest is credited to the account on March 31 each year.

Tax saving: Each year's ₹1.5 lakh PPF contribution saves taxes at the marginal rate under Section 80C. Over 15 years at 30% slab: total principal = ₹22.5 lakh, total tax saving on contributions = ₹6.75 lakh. Plus all interest earnings are tax-free.`}
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
        tipsSection={`Make your annual PPF contribution before April 5 to earn interest for April, the first month of the financial year. Depositing on April 5 vs April 7 costs you one month of interest — on ₹1.5 lakh, that's approximately ₹886. This small timing difference compounds significantly over 15 years.

For partial withdrawals: available from year 7 onward, up to 50% of the balance at the end of year 4 or the previous year's balance, whichever is lower. Use this feature strategically for planned large expenses without disrupting long-term growth.

For PPF loans: available in year 3-6 at 1% above PPF rate (8.1% in 2024). Loans are limited to 25% of balance at end of 2nd preceding year and must be repaid within 36 months. Better than most personal loan rates for short-term needs.`}
        conclusion={`PPF is not just a tax-saving instrument — it's a foundational wealth-building vehicle. A household that consistently contributes ₹1.5 lakh annually to PPF from age 30 to 45 and then extends the account for two more 5-year terms will accumulate approximately ₹1.2-1.5 crore by age 55, completely tax-free. This is a life-changing sum for middle-income families.

For investors who exceed their PPF contribution and want additional safe, government-backed instruments, Sovereign Gold Bonds (2.5% interest + gold appreciation, tax-free at maturity), NSC, and SCSS complement PPF effectively. Use [our PPF vs FD Calculator](/calculators/finance/ppf-vs-fd-calculator) or [our PPF vs NPS Calculator](/calculators/finance/ppf-vs-nps-calculator) for specific comparative analysis.`}

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
