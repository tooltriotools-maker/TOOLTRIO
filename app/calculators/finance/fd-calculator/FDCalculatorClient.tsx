'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { calculateFD } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { DollarSign, TrendingUp, Percent, Calendar } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

const FREQ_OPTIONS = [
  { value: '1', label: 'Annually' },
  { value: '2', label: 'Semi-Annually' },
  { value: '4', label: 'Quarterly' },
  { value: '12', label: 'Monthly' },
]

export default function FDCalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, currency } = useCurrency()
  const [principal, setPrincipal] = useState(100000)
  const [rate, setRate] = useState(7)
  const [years, setYears] = useState(5)
  const [freq, setFreq] = useState('4')

  const result = useMemo(() => calculateFD(principal, rate, years, Number(freq)), [principal, rate, years, freq])
  const r = result as any

  const pie = [
    { name: 'Principal', value: principal, color: '#93c5fd' },
    { name: 'Interest Earned', value: r.interest || 0, color: '#16a34a' },
  ]

  return (
    <CalculatorLayout title="CD Fixed Deposit Calculator USA 2026" description="Calculate interest earned, maturity value, and effective annual yield for any certificate of deposit." icon="🏛️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">FD / CD Details</h2>
          <div className="space-y-5">
            <InputField label="Principal Amount" value={principal} onChange={setPrincipal} min={1000} max={10000000} step={1000} prefix={currency.symbol} />
            <InputField label="Annual Interest Rate" value={rate} onChange={setRate} min={1} max={20} step={0.1} suffix="%" />
            <InputField label="Tenure (Years)" value={years} onChange={setYears} min={1} max={30} step={1} suffix="Yr" />
            <SelectField label="Compounding Frequency" value={freq} onChange={setFreq} options={FREQ_OPTIONS} />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-center">
              <p className="text-xs text-green-600 font-semibold mb-1">Maturity</p>
              <p className="text-lg font-black text-green-700">{fmt(r.maturityAmount || 0, true)}</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-center">
              <p className="text-xs text-blue-600 font-semibold mb-1">Interest</p>
              <p className="text-lg font-black text-blue-700">{fmt(r.interest || 0, true)}</p>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Maturity Amount" value={fmt(r.maturityAmount || 0)} highlight icon={<DollarSign className="w-4 h-4" />} />
            <ResultCard label="Total Interest" value={fmt(r.interest || 0)} icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="Effective Rate" value={`${r.effectiveRate?.toFixed(2) || rate}%`} icon={<Percent className="w-4 h-4" />} />
            <ResultCard label="Tenure" value={`${years} Yr`} icon={<Calendar className="w-4 h-4" />} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-3">Growth Over Time</h3>
              <div style={{ height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={r.yearlyData || []} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="fdG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#16a34a" stopOpacity={0.15} /><stop offset="95%" stopColor="#16a34a" stopOpacity={0} /></linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                    <XAxis dataKey="year" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v, true)} width={60} />
                    <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number) => [fmt(v), '']} labelFormatter={y => `Year ${y}`} />
                    <Area type="monotone" dataKey="total" name="Total Value" stroke="#16a34a" fill="url(#fdG)" strokeWidth={2.5} dot={false} />
                    <Area type="monotone" dataKey="invested" name="Principal" stroke="#93c5fd" fill="none" strokeDasharray="5 4" strokeWidth={1.5} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-3">Principal vs Interest</h3>
              <div style={{ height: 180 }} className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pie} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" paddingAngle={3}>
                      {pie.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number) => fmt(v)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 mt-2">
                {pie.map(e => (
                  <div key={e.name} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: e.color }} />
                    <span className="text-xs text-gray-600 font-medium">{e.name}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {r.yearlyData?.length > 0 && (
            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-3">Year-wise Breakdown</h3>
              <div className="overflow-x-auto max-h-52 overflow-y-auto">
                <table className="calc-table">
                  <thead><tr><th>Year</th><th>Principal</th><th>Interest</th><th>Total Value</th></tr></thead>
                  <tbody>{r.yearlyData.map((row: any) => (
                    <tr key={row.year}><td className="text-gray-500">{row.year}</td><td>{fmt(row.invested)}</td><td className="text-green-600">{fmt(row.returns)}</td><td className="font-bold text-gray-900">{fmt(row.total)}</td></tr>
                  ))}</tbody>
                </table>
              </div>
            </Card>
          )}
        </div>
      </div>
      <div className="mt-8">
      {/* 600-word SEO section */}
      <div className="mt-10">
        <Card>
          <h2 className="text-xl font-black text-gray-900 mb-4">FD Calculator - Everything You Need to Know About Fixed Deposits 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">How FD Interest is Calculated in the US</h3>
              <p>Fixed Deposit interest in the US is typically compounded quarterly. The maturity formula: A = P x (1 + r/4)^(4t), where P = principal, r = annual rate (decimal), t = years. Example: $5 thousands at 7.5% for 3 years. A = 5,00,000 x (1 + 0.075/4)^(4x3) = 5,00,000 x (1.01875)^12 = $6,24,447. Interest earned = $1,24,447. Monthly interest FDs (interest paid monthly without compounding) yield slightly less than the quarterly compounded rate. Cumulative FDs (reinvest interest) earn more than non-cumulative (regular payout) FDs. Always choose cumulative FDs for wealth building; non-cumulative only if you need regular income (retired investors).</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Best FD Interest Rates USA 2026 - How to Find Them</h3>
              <p>FD rates in 2026 by institution type: Public sector banks (SBI, BoB, Union Bank): 6.5-7.25% for general public, 7-7.75% for senior citizens. Private banks (HDFC, ICICI, Axis, Kotak): 7-7.75% general, 7.5-8.25% senior. Small Finance Banks (AU, Jana, Suryoday SFB): 8-9.5% - highest rates, FDIC insured up to $5L. Corporate FDs (SoFi, Shriram): 7.5-9.5% - not FDIC covered, check credit rating. Post Office Time Deposits: 6.9-7.5% for 1-5 year FDs - full government guarantee. For amounts under $5 thousand: explore Small Finance Bank FDs for best rates. For amounts over $5 thousand: spread across multiple institutions to stay within FDIC insurance coverage.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Tax Planning for FD Investors</h3>
              <p>FD interest is taxable at your income tax income tax bracket. Banks deduct federal withholding at 10% when annual interest from a single bank exceeds $40,000 ($50,000 for senior citizens). At 37% federal tax bracket: after-tax FD return at 7.5% = 7.5% x (1 - 0.30) = 5.25% - barely beating inflation! Tax-saver FDs (5-year lock-in): Deposits qualify for 80C deduction (up to $1.5L) but interest is still taxable. Net after 30% tax on both deduction benefit and interest: effectively neutral. At lower tax brackets (5-20%), FDs are more competitive. High-income investors (30% bracket) should seriously consider debt mutual funds (indexation benefit pre-2023) or tax-free bonds for better post-tax returns.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">FD vs RD vs SIP - Which is Best for You?</h3>
              <p>Choosing between FD, RD, and SIP depends on your timeline and risk tolerance. For goals under 1 year: FD or liquid mutual fund wins - higher rate than savings account with safety. For goals 1-3 years: FD (lump sum available) or RD (building corpus monthly) - both safe, predictable. For goals 3-5 years: Conservative hybrid funds or debt mutual funds for better post-tax returns vs FDs. For goals 5+ years: Equity mutual funds (SIP) dramatically outperform FDs. $5,000/month for 10 years: RD at 7% = $8.69L. SIP at 12% = $11.6L. SIP at 15% = $13.9L. The FD/RD safety premium is real but extremely costly over long horizons - equity's higher returns compensate for short-term volatility when time is on your side.</p>
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
          { name: "SIP Calculator", href: "/calculators/finance/sip-calculator", icon: "📈", desc: "Free calculator" },          { name: "PPF Calculator", href: "/calculators/finance/ppf-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "NPS Calculator", href: "/calculators/finance/nps-calculator", icon: "📊", desc: "Free calculator" },          { name: "Rd Calculator", href: "/calculators/finance/rd-calculator", icon: "📊", desc: "Free calculator" },          { name: "Lumpsum Calculator", href: "/calculators/finance/lumpsum-calculator", icon: "💰", desc: "Free calculator" },          { name: "Step Up SIP Calculator", href: "/calculators/finance/step-up-sip-calculator", icon: "📊", desc: "Free calculator" },          { name: "SIP vs Fd Calculator", href: "/calculators/finance/sip-vs-fd-calculator", icon: "📊", desc: "Free calculator" },          { name: "SIP vs PPF Calculator", href: "/calculators/finance/sip-vs-ppf-calculator", icon: "📊", desc: "Free calculator" },          { name: "SIP vs NPS Calculator", href: "/calculators/finance/sip-vs-nps-calculator", icon: "📊", desc: "Free calculator" },          { name: "Mutual Fund Calculator", href: "/calculators/finance/mutual-fund-calculator", icon: "📊", desc: "Free calculator" },          { name: "Mutual Fund Return Calculator", href: "/calculators/finance/mutual-fund-return-calculator", icon: "📊", desc: "Free calculator" },          { name: "PPF vs Fd Calculator", href: "/calculators/finance/ppf-vs-fd-calculator", icon: "📊", desc: "Free calculator" },
          ]}
        />
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          FD Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this FD USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          CD Fixed Deposit Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, depositing $40,000 in a 2-year CD at 5.0%, your CD fixed deposit calculator USA 2026 shows total interest earned of $4,100 and a maturity value of $44,100.
        </p>
      </Card>

            <SEOContent
        title="CD Fixed Deposit Calculator USA – How Much Will Your Deposit Earn in 2026?"
        category="finance"
        intro={`Fixed deposits (called CDs in the US, term deposits in Australia, and FDs in India) are the original risk-free savings instrument — and in a high-interest-rate environment, they become genuinely competitive with investment alternatives for capital preservation. The mathematics of FD compounding is simple, but the details of interest crediting (simple vs compound), interest payout frequency, and TDS (in India) or early withdrawal penalties significantly affect actual returns.

In India, FD rates in 2024-2026 ranged from 6.5% to 7.5% for major banks, and small finance banks offered 8-9% for similar terms. This is a meaningfully different environment than the near-zero FD rates of 2020-2021. For senior citizens, most banks offer an additional 0.25-0.50% over standard rates — one of the few direct financial benefits of age.

The compounding frequency matters for FDs: quarterly compounding produces more return than annual compounding at the same stated rate. A 7% FD compounded quarterly = 7.19% effective annual yield. Most Indian bank FDs compound quarterly, but understanding this difference lets you accurately compare FDs at different banks with different compounding schedules.`}
        howItWorks={`Simple interest FD: Maturity amount = Principal × (1 + Rate × Time/100). For ₹1,00,000 at 7% for 3 years: ₹1,21,000.

Compound interest FD (quarterly compounding): Maturity amount = P × (1 + r/4)^(4t), where r is annual rate (decimal) and t is years. For ₹1,00,000 at 7% compounded quarterly for 3 years: ₹1,00,000 × (1.0175)^12 = ₹1,23,145 — ₹2,145 more than simple interest.

Effective yield (EAR): (1 + r/n)^n - 1, where n is compounding periods per year. For 7% compounded quarterly: (1.0175)^4 - 1 = 7.186% effective annual rate. This is the true yield for comparison purposes.`}
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
        tipsSection={`For large FD amounts, spread deposits across multiple banks to stay within DICGC (Deposit Insurance and Credit Guarantee Corporation) coverage — up to ₹5 lakh per depositor per bank. Senior citizens with large FD holdings should verify that their aggregate exposure at any single bank is within insurance limits.

TDS is deducted at 10% (or 20% without PAN) when FD interest exceeds ₹40,000 per financial year per bank (₹50,000 for senior citizens). If your total income is below the taxable threshold, file Form 15G (15H for seniors) at the start of the year to avoid TDS deduction.

Compare FD rates at NBFC versus bank FDs. NBFC FDs (like Bajaj Finance) often offer 0.5-1.0% higher rates than equivalent bank FDs — but carry higher credit risk. NBFC deposits aren't covered by DICGC insurance, only by NBFC credit ratings. Assess the risk trade-off accordingly.`}
        conclusion={`FDs are the correct vehicle for capital that must be preserved: emergency funds (though liquid FDs or sweep accounts are better for emergency portions), savings for specific near-term goals, and the defensive portion of a retirement portfolio. For long-term wealth building, FDs typically underperform equity by a substantial margin after inflation and taxes.

For senior citizens dependent on FD interest for income, the Senior Citizen Savings Scheme (SCSS) and PM Vaya Vandana Yojana (PMVVY) offer higher guaranteed rates with government backing — often superior to even the best bank FD rates. Compare with [our Senior Citizen Savings vs FD Calculator](/calculators/finance/senior-citizen-savings-vs-fd-calculator).`}

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
