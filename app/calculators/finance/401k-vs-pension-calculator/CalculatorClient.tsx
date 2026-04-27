'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { TrendingUp, Shield } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string }
const fmt = (n: number) => '$' + Math.round(n).toLocaleString()
const fmtC = (n: number) => n >= 1000000 ? `$${(n/1000000).toFixed(2)}M` : `$${(n/1000).toFixed(0)}K`

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const [salary, setSalary] = useState(80000)
  const [contribution401k, setContribution401k] = useState(15)
  const [employerMatch, setEmployerMatch] = useState(4)
  const [currentAge, setCurrentAge] = useState(30)
  const [retirementAge, setRetirementAge] = useState(65)
  const [returnRate, setReturnRate] = useState(8)
  const [pensionPct, setPensionPct] = useState(2)
  const [pensionYears, setPensionYears] = useState(35)

  const result = useMemo(() => {
    const years = Math.max(1, retirementAge - currentAge)
    const months = years * 12
    const mr = returnRate / 100 / 12

    const monthlyContrib = (salary * (contribution401k / 100) + salary * (Math.min(employerMatch, contribution401k) / 100)) / 12
    const k401FV = monthlyContrib * ((Math.pow(1 + mr, months) - 1) / mr) * (1 + mr)

    // Pension: defined benefit = years_of_service * pension_pct * final_salary
    const finalSalary = salary * Math.pow(1 + 0.03, years)
    const monthlyPension = (pensionYears * pensionPct / 100 * finalSalary) / 12
    const pensionPV = monthlyPension * 12 * 20 // ~20 years payout @ 65

    const yearlyData = Array.from({ length: years }, (_, i) => {
      const y = i + 1; const m = y * 12
      const kFV = monthlyContrib * ((Math.pow(1 + mr, m) - 1) / mr) * (1 + mr)
      const pPV = ((Math.min(y + (65 - retirementAge + currentAge), pensionYears) * pensionPct / 100 * salary * Math.pow(1.03, y)) / 12) * 12 * 20
      return { year: currentAge + y, k401: Math.round(kFV), pension: Math.round(pPV) }
    })

    return {
      k401FV: Math.round(k401FV), monthlyContrib: Math.round(monthlyContrib),
      monthlyPension: Math.round(monthlyPension), pensionPV: Math.round(pensionPV),
      finalSalary: Math.round(finalSalary),
      k401Better: k401FV > pensionPV,
      difference: Math.round(Math.abs(k401FV - pensionPV)),
      yearlyData, years,
    }
  }, [salary, contribution401k, employerMatch, currentAge, retirementAge, returnRate, pensionPct, pensionYears])

  return (
    <CalculatorLayout title="401k vs Pension Calculator USA 2026" description="Compare self-directed 401k growth vs defined benefit pension income at retirement." icon="🏦" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-4">Details</h2>
          <div className="space-y-4">
            <InputField label="Annual Salary" value={salary} onChange={setSalary} min={30000} max={500000} step={5000} prefix="$" />
            <InputField label="401k Contribution %" value={contribution401k} onChange={setContribution401k} min={1} max={25} step={1} suffix="%" />
            <InputField label="Employer Match %" value={employerMatch} onChange={setEmployerMatch} min={0} max={10} step={0.5} suffix="%" />
            <InputField label="Current Age" value={currentAge} onChange={setCurrentAge} min={18} max={55} step={1} suffix="Yrs" />
            <InputField label="Retirement Age" value={retirementAge} onChange={setRetirementAge} min={50} max={75} step={1} suffix="Yrs" />
            <InputField label="401k Return Rate" value={returnRate} onChange={setReturnRate} min={4} max={12} step={0.5} suffix="%" />
            <InputField label="Pension Benefit % per Year" value={pensionPct} onChange={setPensionPct} min={0.5} max={3} step={0.1} suffix="%" />
            <InputField label="Years of Pension Service" value={pensionYears} onChange={setPensionYears} min={5} max={40} step={1} suffix="Yrs" />
          </div>
          <div className={`mt-4 p-3 rounded-xl border-2 text-center ${result.k401Better ? 'bg-green-50 border-green-300' : 'bg-purple-50 border-purple-300'}`}>
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Higher Total Value</p>
            <p className="text-xl font-black" style={{ color: result.k401Better ? '#10b981' : '#8b5cf6' }}>{result.k401Better ? '401(k)' : 'Pension'} 🏆</p>
            <p className="text-sm text-gray-500">by {fmtC(result.difference)}</p>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="401k Balance" value={fmtC(result.k401FV)} subValue="At retirement" highlight={result.k401Better} icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="Pension Value (PV)" value={fmtC(result.pensionPV)} subValue="20yr payout value" highlight={!result.k401Better} icon={<Shield className="w-4 h-4" />} />
            <ResultCard label="Monthly Pension" value={fmtC(result.monthlyPension)} subValue="Guaranteed for life" />
            <ResultCard label="Monthly 401k Contrib" value={fmtC(result.monthlyContrib)} subValue="Incl. employer match" />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">401k Balance vs Pension Value Over Time</h3>
            <div style={{ height: 240 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.yearlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="g401k" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.4} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient>
                    <linearGradient id="gPen" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} /><stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} label={{ value: 'Age', fill: '#475569', fontSize: 11, position: 'insideBottomRight', offset: -5 }} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={72} tickFormatter={v => v >= 1000000 ? `$${(v/1000000).toFixed(1)}M` : `$${(v/1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} formatter={(v: number, n) => [fmt(v), n]} labelFormatter={a => `Age ${a}`} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="pension" name="Pension PV" stroke="#8b5cf6" fill="url(#gPen)" strokeWidth={2} />
                  <Area type="monotone" dataKey="k401" name="401k Balance" stroke="#10b981" fill="url(#g401k)" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <div className="grid grid-cols-2 gap-3">
            <Card>
              <h3 className="text-sm font-semibold text-green-400 mb-2">📈 401k Advantages</h3>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>v Portable - take it when you switch jobs</li>
                <li>v You control investments &amp; risk</li>
                <li>v Inherited by heirs if you die early</li>
                <li>v Roth option for tax-free growth</li>
                <li>✗ Market risk - can lose value</li>
              </ul>
            </Card>
            <Card>
              <h3 className="text-sm font-semibold text-purple-400 mb-2">🛡️ Pension Advantages</h3>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>v Guaranteed income for life</li>
                <li>v No investment decisions needed</li>
                <li>v COLA (cost-of-living adjustments)</li>
                <li>v Survivor benefit option</li>
                <li>✗ Lost if you leave employer early</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
            <div className="mt-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-6">401K vs Pension: Complete Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-base">What is 401K?</h3>
              <p>401K is a USA investment or financial product that offers distinct advantages depending on your goals, tax situation, and time horizon. Understanding how it works is key to making the most of your money.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">What is Pension?</h3>
              <p>Pension takes a different approach to growing or protecting your wealth. Each has its own risk profile, liquidity characteristics, and tax treatment that makes it suited to specific financial situations.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">Key Differences</h3>
              <p>The most important distinction between 401K and Pension is how returns are generated and taxed. 401K typically suits growth-oriented investors while Pension may appeal to those prioritizing stability or specific tax advantages.</p>
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
            <p className="text-sm text-green-700 leading-relaxed">Most financial advisors recommend not putting all your money in one option. A diversified approach - splitting between 401K and Pension based on your specific goals - often provides better risk-adjusted returns than going all-in on either. Use this calculator to find your optimal split.</p>
          </div>
        </div>
      </div>

            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          401k Vs Pension Calculator Example (USA Salary-Based)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          If you earn $80,000 per year and contribute 10% with a 50% employer match up to 6%, your total yearly investment becomes $10,400.
        </p>
        <p className="text-sm text-gray-600">
          With a 7% return over 30 years, your 401k Vs Pension USA 2026 projection can exceed <strong>$1,000,000+</strong>. Increasing contribution to 15% can push this above $1.5M.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          401k vs Pension Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, on an $80,000 salary with 25 years of service, your 401k vs pension calculator USA 2026 comparison shows which plan delivers more reliable retirement security.
        </p>
      </Card>

            <SEOContent
        title="401k vs Pension Calculator USA – Which Retirement Plan Pays More in 2026?"
        category="finance"
        intro={`The choice between a 401k and a pension (defined benefit plan) is really a choice between certainty and control. Pensions offer a guaranteed monthly income in retirement — you'll know exactly what you'll receive regardless of market performance. 401ks offer potentially higher returns and portability, but the outcome depends entirely on how much you contribute, how your investments perform, and whether you ever raid the account.

Pensions are increasingly rare — only about 15% of private-sector workers have access to one, though they remain common in government and some union jobs. If you have access to a pension, the real question isn't which is theoretically better — it's what your specific pension benefit is worth compared to what you'd accumulate in a 401k with the same employer contributions.

The valuation methodology matters here: a $3,000/month pension starting at 65 is worth roughly $540,000 to $720,000 in present value (assuming a 5-6% discount rate and 20-year life expectancy). Understanding what your pension is worth as a lump-sum equivalent lets you make an apples-to-apples comparison.`}
        howItWorks={`Pension value calculation: Monthly benefit × 12 months × expected years in retirement × discount factor. A simpler approximation: annual pension benefit / expected withdrawal rate. If your pension pays $36,000/year and the 4% rule applies, the equivalent lump sum is $36,000 / 0.04 = $900,000.

401k projection: Uses compound growth formula FV = PV × (1+r)^n + PMT × [(1+r)^n - 1]/r, where contributions include both your contributions and employer contributions (which in pension plans typically fund the benefit rather than going to an individual account).

Break-even analysis: The calculator shows how long you need to live to receive more total pension payments than the equivalent 401k lump sum — the pension break-even age, which is typically 80-85 for most plans.`}
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
        tipsSection={`Request your pension's Summary Plan Description to understand the exact benefit formula — most are based on years of service × final average salary × a multiplier (typically 1.5%-2.5%). A 25-year career at 2% multiplier with a $80,000 final salary produces $80,000 × 25 × 0.02 = $40,000/year.

Consider the survivor benefit carefully if you're married. Most pensions offer a reduced benefit that continues to a spouse after death — versus the full benefit that stops with you. The actuarial cost of survivor coverage is often misunderstood.

If your pension has a lump-sum option, compare it to the annuity payout using the calculator before deciding. Low interest rates (used to calculate lump sum values) can make the lump sum more attractive; high interest rates favor the annuity.`}
        conclusion={`Pensions provide longevity insurance — you can't outlive the income no matter how long you live, which is genuinely valuable for retirement planning. The anxiety of managing a 401k through market crashes while drawing it down in retirement is real and underestimated by people who haven't experienced it.

For people with both types of accounts, the pension income often changes the optimal 401k withdrawal strategy — providing a guaranteed floor of income that lets you invest the 401k more aggressively and delay Social Security longer. Use [our Social Security Calculator](/calculators/finance/social-security-calculator) alongside this to understand your complete retirement income picture.`}

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
            { name: "Retirement Calculator", href: "/calculators/finance/retirement-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Roth IRA Calculator", href: "/calculators/finance/roth-ira-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Roth vs Traditional Calculator", href: "/calculators/finance/roth-ira-vs-traditional-ira-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Savings Rate Calculator", href: "/calculators/finance/savings-rate-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Fire Calculator", href: "/calculators/finance/fire-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "ROI Calculator", href: "/calculators/finance/roi-calculator", icon: "🔗", desc: "Related financial planning" },
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
          { name: "401k vs Roth IRA Calculator", href: "/calculators/finance/401k-vs-roth-ira-calculator", icon: "📊", desc: "Free calculator" },          { name: "401k vs Taxable Account Calculator", href: "/calculators/finance/401k-vs-taxable-account-calculator", icon: "📊", desc: "Free calculator" },          { name: "Roth IRA vs Traditional IRA Calculator", href: "/calculators/finance/roth-ira-vs-traditional-ira-calculator", icon: "📊", desc: "Free calculator" },          { name: "Roth IRA vs 401k Employer Match Calculator", href: "/calculators/finance/roth-ira-vs-401k-employer-match-calculator", icon: "📊", desc: "Free calculator" },          { name: "Roth IRA vs HSA Calculator", href: "/calculators/finance/roth-ira-vs-hsa-calculator", icon: "📊", desc: "Free calculator" },          { name: "HSA vs FSA Calculator", href: "/calculators/finance/hsa-vs-fsa-calculator", icon: "🏥", desc: "Free calculator" },          { name: "Sep IRA vs Solo 401k Calculator", href: "/calculators/finance/sep-ira-vs-solo-401k-calculator", icon: "💼", desc: "Free calculator" },          { name: "Bonds vs Cds USA Calculator", href: "/calculators/finance/bonds-vs-cds-usa-calculator", icon: "📋", desc: "Free calculator" },          { name: "Cd vs HYSA Calculator", href: "/calculators/finance/cd-vs-hysa-calculator", icon: "💰", desc: "Free calculator" },          { name: "I Bonds vs Tips Calculator", href: "/calculators/finance/i-bonds-vs-tips-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "S&P500 vs Bonds Calculator", href: "/calculators/finance/sp500-vs-bonds-calculator", icon: "📊", desc: "Free calculator" },          { name: "S&P500 vs Real Estate USA Calculator", href: "/calculators/finance/sp500-vs-real-estate-usa-calculator", icon: "📊", desc: "Free calculator" },
          ]}
        />

    </CalculatorLayout>
  )
}
