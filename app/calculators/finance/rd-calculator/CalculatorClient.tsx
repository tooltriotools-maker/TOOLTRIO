'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { calculateRD } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { DollarSign, TrendingUp, Calendar, Percent } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, currency } = useCurrency()
  const [monthlyDeposit, setMonthlyDeposit] = useState(5000)
  const [rate, setRate] = useState(6.5)
  const [months, setMonths] = useState(24)

  const result = useMemo(() => calculateRD(monthlyDeposit, rate, months), [monthlyDeposit, rate, months])
  const r = result as any

  // Quarterly data for chart
  const chartData = []
  for (let m = 3; m <= months; m += 3) {
    const partial = calculateRD(monthlyDeposit, rate, m) as any
    chartData.push({ month: m, invested: monthlyDeposit * m, interest: partial.interest || 0, total: partial.maturityAmount || 0 })
  }

  return (
    <CalculatorLayout title="Recurring Deposit Calculator India 2026" description="Calculate RD maturity value, total interest earned, and month-by-month growth." icon="🏧" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">RD Details</h2>
          <div className="space-y-5">
            <InputField label="Monthly Deposit" value={monthlyDeposit} onChange={setMonthlyDeposit} min={100} max={500000} step={100} prefix={currency.symbol} />
            <InputField label="Annual Interest Rate" value={rate} onChange={setRate} min={1} max={15} step={0.1} suffix="%" />
            <InputField label="Tenure (Months)" value={months} onChange={setMonths} min={6} max={120} step={1} suffix="Mo" />
          </div>
          <div className="mt-5 space-y-2">
            <div className="p-3 rounded-xl bg-green-50 border border-green-200 flex justify-between items-center">
              <span className="text-xs text-green-700 font-semibold">Maturity Amount</span>
              <span className="text-base font-black text-green-700">{fmt(r.maturityAmount || 0, true)}</span>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 flex justify-between items-center">
              <span className="text-xs text-blue-700 font-semibold">Total Invested</span>
              <span className="text-base font-black text-blue-700">{fmt(monthlyDeposit * months, true)}</span>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Maturity Amount" value={fmt(r.maturityAmount || 0)} highlight icon={<DollarSign className="w-4 h-4" />} />
            <ResultCard label="Interest Earned" value={fmt(r.interest || 0)} icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="Total Invested" value={fmt(monthlyDeposit * months)} icon={<Percent className="w-4 h-4" />} />
            <ResultCard label="Tenure" value={`${months} Mo`} icon={<Calendar className="w-4 h-4" />} />
          </div>

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-4">Quarterly Growth Tracker</h3>
            <div style={{ height: 240 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="rdT" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#16a34a" stopOpacity={0.15} /><stop offset="95%" stopColor="#16a34a" stopOpacity={0} /></linearGradient>
                    <linearGradient id="rdI" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#93c5fd" stopOpacity={0.2} /><stop offset="95%" stopColor="#93c5fd" stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} label={{ value: 'Months', position: 'insideBottom', offset: -2, fill: '#9ca3af', fontSize: 10 }} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v, true)} width={65} />
                  <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number) => [fmt(v), '']} labelFormatter={m => `Month ${m}`} />
                  <Area type="monotone" dataKey="invested" name="Invested" stroke="#93c5fd" fill="url(#rdI)" strokeWidth={1.5} dot={false} />
                  <Area type="monotone" dataKey="total" name="Total Value" stroke="#16a34a" fill="url(#rdT)" strokeWidth={2.5} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-3">Interest Accumulation by Quarter</h3>
            <div style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v, true)} width={60} />
                  <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number) => [fmt(v), 'Interest']} />
                  <Bar dataKey="interest" name="Interest Earned" fill="#16a34a" radius={[4, 4, 0, 0]} />
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
          <h2 className="text-xl font-black text-gray-900 mb-4">RD Calculator - Recurring Deposit Complete Guide 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">How Recurring Deposits Work</h3>
              <p>A Recurring Deposit (RD) is a savings instrument offered by banks and post offices where you deposit a fixed amount every month for a predetermined period, earning interest on accumulated deposits. At maturity, you receive the total deposit amount plus interest. RD combines the discipline of regular saving with the safety of a bank deposit. Banks calculate RD interest using quarterly compounding in the US: Maturity Amount = P x (1+r/4)^(4n), where compound growth applies to each monthly deposit for its remaining tenure. RDs are ideal for goal-based savings when you want to build a corpus through monthly contributions rather than a lump sum.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">RD vs SIP - Which Is Better for Regular Savings?</h3>
              <p>Both RD and SIP involve regular monthly investments, but with crucial differences. RD: Fixed return (6-8.5%), capital guaranteed, fully safe, quarterly compounding, ideal for short-medium goals (1-5 years), interest taxable at income tax bracket. SIP in equity MF: Market-linked return (historically 12-15% CAGR for equity), no capital guarantee, ideal for 5+ year goals, LTCG tax at 12.5% (for equity held 12+ months). Decision rule: goals under 3 years -{'>'} RD (or FD). Goals 3-5 years -{'>'} balanced hybrid funds. Goals 5+ years -{'>'} equity SIP. The return difference over long periods is enormous - $5,000/month for 10 years: RD at 7% = $8.69 thousands; SIP at 12% = $11.6 thousands; SIP at 15% = $13.9 thousands.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Post Office RD vs Bank RD</h3>
              <p>Post Office RD (currently 6.7% p.a. quarterly compounding, 5-year tenure) is backed by the Government of India - making it the safest option. Bank RDs offer higher rates (7-8.5% depending on tenure and bank) with quarterly compounding and tenures from 6 months to 10 years. FDIC insurance up to $5 thousand covers bank RDs. For amounts under $5 thousand: bank RD with highest rate is optimal. For amounts over $5 thousand: split across multiple banks or use Post Office RD for amounts exceeding bank insurance limit. Senior citizens should specifically check senior citizen RD rates which are 0.25-0.5% higher.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Premature RD Closure and Loan Against RD</h3>
              <p>Premature RD closure is allowed at most banks with a penalty (typically 0.5-1% reduction in interest rate). Post Office RD allows premature closure after 3 years. Loan against RD: You can get 90-95% of RD maturity value as a loan at roughly 1-2% above RD rate - useful for short-term cash needs without breaking the RD and losing interest. This is far cheaper than a personal loan (10-24% interest). If you need emergency funds, explore loan against RD (or FD) before breaking the deposit. The interest arbitrage is minimal and you preserve the investment's continuity.</p>
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
          { name: "SIP Calculator", href: "/calculators/finance/sip-calculator", icon: "📈", desc: "Free calculator" },          { name: "PPF Calculator", href: "/calculators/finance/ppf-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "NPS Calculator", href: "/calculators/finance/nps-calculator", icon: "📊", desc: "Free calculator" },          { name: "Fd Calculator", href: "/calculators/finance/fd-calculator", icon: "🏦", desc: "Free calculator" },          { name: "Lumpsum Calculator", href: "/calculators/finance/lumpsum-calculator", icon: "💰", desc: "Free calculator" },          { name: "Step Up SIP Calculator", href: "/calculators/finance/step-up-sip-calculator", icon: "📊", desc: "Free calculator" },          { name: "SIP vs Fd Calculator", href: "/calculators/finance/sip-vs-fd-calculator", icon: "📊", desc: "Free calculator" },          { name: "SIP vs PPF Calculator", href: "/calculators/finance/sip-vs-ppf-calculator", icon: "📊", desc: "Free calculator" },          { name: "SIP vs NPS Calculator", href: "/calculators/finance/sip-vs-nps-calculator", icon: "📊", desc: "Free calculator" },          { name: "Mutual Fund Calculator", href: "/calculators/finance/mutual-fund-calculator", icon: "📊", desc: "Free calculator" },          { name: "Mutual Fund Return Calculator", href: "/calculators/finance/mutual-fund-return-calculator", icon: "📊", desc: "Free calculator" },          { name: "PPF vs Fd Calculator", href: "/calculators/finance/ppf-vs-fd-calculator", icon: "📊", desc: "Free calculator" },
          ]}
        />
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          RD Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this RD USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Recurring Deposit Calculator Example (India 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, depositing INR 5,000/month in an RD at 6.8% for 3 years, your recurring deposit calculator India 2026 shows a maturity value of INR 1.99 lakh with INR 19,000 in interest earned.
        </p>
      </Card>

            <SEOContent
        title="Recurring Deposit Calculator India – How Much Will Your Monthly RD Build at Maturity in 2026?"
        category="finance"
        intro={`A Recurring Deposit (RD) is India's bank-offered systematic savings product — it's essentially an FD built through equal monthly installments rather than a lump sum. Banks and post offices offer RDs for tenures from 6 months to 10 years, with interest rates slightly lower than equivalent-tenure FDs (typically 0.25-0.50% lower) because the bank receives money gradually rather than upfront.

RDs are suited for savers who don't have a large lump sum but want to build toward a specific future goal: a car purchase, vacation, home down payment, or any known future expense. The structured monthly commitment prevents the money from being spent on other things — a discipline benefit similar to SIP in mutual funds.

Post Office Recurring Deposit (PORD) is backed by the Government of India with the same safety level as National Savings Certificates. Current PORD rate is 6.7% for a 5-year term. Bank RD rates vary by institution and tenure, generally ranging from 5.5-7.5% depending on the bank and current rate environment.`}
        howItWorks={`RD maturity value: M = R × [(1+r/4)^(4n) - 1] / (1 - (1+r/4)^(-1/3)), where R is monthly installment, r is annual interest rate, n is tenure in years. Simplified quarterly compounding formula used by most Indian banks.

Alternatively: Maturity = Sum of [Each monthly deposit × (1+r/4)^(4 × remaining months/12)] for each deposit across the entire tenure. The first deposit earns interest for the full tenure; the last deposit earns interest for one month.

TDS: Banks deduct TDS on RD interest when aggregate interest across all accounts at the bank exceeds ₹40,000 per financial year. File Form 15G (15H for seniors) if total income is below taxable limit to avoid TDS.`}
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
        tipsSection={`Compare RD rates across banks before opening — they vary meaningfully. Online banks and small finance banks consistently offer higher RD rates than public sector banks. A 0.5% rate difference on ₹10,000/month over 5 years is approximately ₹8,000 in additional interest — worth the 15 minutes of comparison shopping.

For goal-specific savings, model the exact RD amount needed to reach your target: use the calculator to work backwards from the target amount to the required monthly contribution. Having a specific goal and monthly commitment makes RD more effective than generic savings.

RDs can be prematurely withdrawn at most banks for a 1% penalty on the applicable interest rate. Keep this option in mind for genuine emergencies — it's significantly more efficient than a personal loan or credit card debt.`}
        conclusion={`RDs are excellent entry-level wealth-building products for people new to systematic saving. The discipline of a fixed monthly commitment, even at modest amounts, builds financial habits that compound into significant wealth over years.

For higher returns on the same systematic savings principle, SIP in liquid mutual funds currently offers comparable returns to RD with better liquidity (instant redemption vs premature withdrawal penalties). For medium-to-long-term goals where equity returns are acceptable, equity mutual fund SIPs dramatically outperform RDs on expected returns, though with market risk. Use [our SIP vs RD Calculator](/calculators/finance/sip-vs-rd-calculator) for direct comparison of expected returns across both vehicles.`}

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
