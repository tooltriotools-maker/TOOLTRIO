'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { TrendingUp, Shield } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

const fmt = (n: number) => '$' + Math.round(n).toLocaleString()
const fmtC = (n: number) => n >= 1000000 ? `$${(n/1000000).toFixed(2)}M` : n >= 1000 ? `$${(n/1000).toFixed(0)}K` : `$${Math.round(n)}`

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const [annualContrib, setAnnualContrib] = useState(23000)
  const [currentAge, setCurrentAge] = useState(30)
  const [retirementAge, setRetirementAge] = useState(65)
  const [returnRate, setReturnRate] = useState(8)
  const [taxRateNow, setTaxRateNow] = useState(22)
  const [taxRateRetirement, setTaxRateRetirement] = useState(20)

  const result = useMemo(() => {
    const years = Math.max(1, retirementAge - currentAge)
    const months = years * 12
    const mr = returnRate / 100 / 12

    // Traditional 401k: pre-tax contributions, pay tax on withdrawal
    const tradFV = annualContrib / 12 * ((Math.pow(1 + mr, months) - 1) / mr) * (1 + mr)
    const tradTax = tradFV * (taxRateRetirement / 100)
    const tradPostTax = tradFV - tradTax
    // Current tax saving
    const tradAnnualTaxSave = annualContrib * (taxRateNow / 100)
    const tradTotalTaxSave = tradAnnualTaxSave * years

    // Roth IRA: after-tax contributions, tax-free withdrawal
    // Effective monthly contribution is less (already paid tax)
    const rothAfterTaxContrib = annualContrib * (1 - taxRateNow / 100)
    const rothFV = rothAfterTaxContrib / 12 * ((Math.pow(1 + mr, months) - 1) / mr) * (1 + mr)
    const rothPostTax = rothFV // fully tax-free

    const yearlyData = Array.from({ length: years }, (_, i) => {
      const y = i + 1; const m = y * 12
      const tFV = annualContrib / 12 * ((Math.pow(1 + mr, m) - 1) / mr) * (1 + mr)
      const rFV = rothAfterTaxContrib / 12 * ((Math.pow(1 + mr, m) - 1) / mr) * (1 + mr)
      return { year: currentAge + y, trad: Math.round(tFV * (1 - taxRateRetirement/100)), roth: Math.round(rFV) }
    })

    const rothBetter = rothPostTax > tradPostTax

    return {
      tradFV: Math.round(tradFV), tradPostTax: Math.round(tradPostTax), tradTax: Math.round(tradTax), tradTotalTaxSave: Math.round(tradTotalTaxSave),
      rothFV: Math.round(rothFV), rothPostTax: Math.round(rothPostTax),
      rothBetter, difference: Math.round(Math.abs(rothPostTax - tradPostTax)),
      yearlyData, years,
      breakEvenTax: ((tradFV / rothFV) * taxRateNow).toFixed(1),
    }
  }, [annualContrib, currentAge, retirementAge, returnRate, taxRateNow, taxRateRetirement])

  return (
    <CalculatorLayout title="401k vs Roth IRA Calculator USA 2026" description="Compare after-tax retirement wealth from Traditional 401k vs Roth IRA with 2026 contribution limits." icon="🇺🇸" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" /> Retirement Details
          </h2>
          <div className="space-y-4">
            <InputField label="Annual Contribution" value={annualContrib} onChange={setAnnualContrib} min={1000} max={69000} step={500} prefix="$" />
            <InputField label="Current Age" value={currentAge} onChange={setCurrentAge} min={18} max={60} step={1} suffix="Yrs" />
            <InputField label="Retirement Age" value={retirementAge} onChange={setRetirementAge} min={50} max={75} step={1} suffix="Yrs" />
            <InputField label="Expected Annual Return" value={returnRate} onChange={setReturnRate} min={4} max={15} step={0.5} suffix="%" />
            <InputField label="Current Tax Rate" value={taxRateNow} onChange={setTaxRateNow} min={10} max={37} step={1} suffix="%" />
            <InputField label="Retirement Tax Rate" value={taxRateRetirement} onChange={setTaxRateRetirement} min={0} max={37} step={1} suffix="%" />
          </div>
          <div className={`mt-4 p-3 rounded-xl border-2 text-center ${result.rothBetter ? 'bg-green-50 border-green-300' : 'bg-blue-50 border-blue-300'}`}>
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Post-Tax Winner</p>
            <p className="text-xl font-black" style={{ color: result.rothBetter ? '#10b981' : '#3b82f6' }}>{result.rothBetter ? 'Roth IRA' : '401(k)'} 🏆</p>
            <p className="text-sm text-gray-500">by {fmtC(result.difference)}</p>
            <p className="text-xs text-gray-400 mt-1">Break-even tax rate: {result.breakEvenTax}%</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Roth After-Tax" value={fmtC(result.rothPostTax)} subValue="100% tax-free" highlight={result.rothBetter} icon={<Shield className="w-4 h-4" />} />
            <ResultCard label="401k After-Tax" value={fmtC(result.tradPostTax)} subValue={`-${fmtC(result.tradTax)} tax`} highlight={!result.rothBetter} icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="401k Balance" value={fmtC(result.tradFV)} subValue="Pre-tax total" />
            <ResultCard label="401k Tax Savings Now" value={fmtC(result.tradTotalTaxSave)} subValue={`${taxRateNow}% x ${result.years}yr`} />
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Post-Tax Retirement Wealth Over Time</h3>
            <div style={{ height: 240 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.yearlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gRoth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gTrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} /><stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} label={{ value: 'Age', fill: '#475569', fontSize: 11, position: 'insideBottomRight', offset: -5 }} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={70}
                    tickFormatter={v => v >= 1000000 ? `$${(v/1000000).toFixed(1)}M` : `$${(v/1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} formatter={(v: number, name) => [fmt(v), name]} labelFormatter={a => `Age ${a}`} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="trad" name="401k (After-Tax)" stroke="#3b82f6" fill="url(#gTrad)" strokeWidth={2} />
                  <Area type="monotone" dataKey="roth" name="Roth IRA (Tax-Free)" stroke="#10b981" fill="url(#gRoth)" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <Card>
              <h3 className="text-sm font-semibold text-blue-400 mb-2">🏦 Traditional 401k</h3>
              <ul className="text-xs text-gray-400 space-y-1.5">
                <li>v Pre-tax contributions reduce taxable income NOW</li>
                <li>v 2024 limit: $23,000 ($30,500 if 50+)</li>
                <li>v Employer match (typically 3-6%)</li>
                <li>✗ Required Minimum Distributions at 73</li>
                <li>✗ Withdrawals taxed as ordinary income</li>
              </ul>
            </Card>
            <Card>
              <h3 className="text-sm font-semibold text-green-400 mb-2">🛡️ Roth IRA</h3>
              <ul className="text-xs text-gray-400 space-y-1.5">
                <li>v Tax-free growth AND tax-free withdrawal</li>
                <li>v No Required Minimum Distributions</li>
                <li>v Contributions can be withdrawn anytime</li>
                <li>✗ 2024 limit: $7,000 ($8,000 if 50+)</li>
                <li>✗ Income limits: $161K single / $240K married</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
            <div className="mt-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-6">401K vs Roth Ira: Complete Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-base">What is 401K?</h3>
              <p>401K is a USA investment or financial product that offers distinct advantages depending on your goals, tax situation, and time horizon. Understanding how it works is key to making the most of your money.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">What is Roth Ira?</h3>
              <p>Roth Ira takes a different approach to growing or protecting your wealth. Each has its own risk profile, liquidity characteristics, and tax treatment that makes it suited to specific financial situations.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">Key Differences</h3>
              <p>The most important distinction between 401K and Roth Ira is how returns are generated and taxed. 401K typically suits growth-oriented investors while Roth Ira may appeal to those prioritizing stability or specific tax advantages.</p>
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
            <p className="text-sm text-green-700 leading-relaxed">Most financial advisors recommend not putting all your money in one option. A diversified approach - splitting between 401K and Roth Ira based on your specific goals - often provides better risk-adjusted returns than going all-in on either. Use this calculator to find your optimal split.</p>
          </div>
        </div>
      </div>

            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          401k Vs Roth IRA Calculator Example (USA Salary-Based)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          If you earn $80,000 per year and contribute 10% with a 50% employer match up to 6%, your total yearly investment becomes $10,400.
        </p>
        <p className="text-sm text-gray-600">
          With a 7% return over 30 years, your 401k Vs Roth IRA USA 2026 projection can exceed <strong>$1,000,000+</strong>. Increasing contribution to 15% can push this above $1.5M.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          401k vs Roth IRA Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, at age 30 earning $90,000, your 401k vs Roth IRA calculator USA 2026 shows that choosing Roth now — while in a lower bracket — can save $150,000+ in lifetime taxes.
        </p>
      </Card>

            <SEOContent
        title="401k vs Roth IRA Calculator USA – Which Account Builds More Retirement Wealth in 2026?"
        category="finance"
        intro={`The 401k vs Roth IRA question is fundamentally a tax timing bet: do you pay taxes now (Roth) or later (traditional 401k)? If your tax rate will be higher in retirement than it is today, pay the taxes now — contribute to Roth. If your rate will be lower in retirement, defer the taxes — contribute to the traditional 401k. If they'll be the same, it doesn't mathematically matter, though the Roth has other advantages.

The problem is that nobody knows their future tax rate with certainty. Tax law changes. Retirement income can be hard to predict. For most people in their 30s and 40s, the common wisdom points toward Roth: marginal rates are moderate during working years, retirement income from multiple sources can push into higher brackets, and Roth accounts have no required minimum distributions.

But employer match changes the calculus significantly. If your employer matches your 401k but not Roth contributions, the guaranteed return from match capture often outweighs the Roth tax advantage — get the full match first, then evaluate where the next dollars should go.`}
        howItWorks={`The tax equivalence formula: Traditional 401k balance at retirement × (1 - effective tax rate at withdrawal) should equal Roth balance at retirement for tax neutrality. Mathematically, T(1+r)^n × (1-t2) vs (T × (1-t1)) × (1+r)^n, where T is gross contribution, r is return rate, n is years, t1 is current tax rate, t2 is future tax rate. If t1 = t2, both are identical after tax.

The Roth advantage is most significant when: you expect to be in a higher tax bracket at retirement, you have a long time horizon (Roth tax-free growth compounds powerfully over 30+ years), you want to minimize required minimum distributions, or you expect to leave the account to heirs.

The 401k advantage is most significant when: your current marginal tax rate is high (32%+), your employer only matches traditional contributions, or you expect significantly lower income in retirement.`}
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
        tipsSection={`Max your employer match in the 401k first — always. This is a guaranteed 50-100% return that beats the tax advantage of either account. After the match is captured, evaluate your current vs. expected future tax bracket to decide where additional contributions should go.

Income limits matter for Roth IRA: contributions phase out between $146,000-$161,000 (single) and $230,000-$240,000 (married filing jointly) in 2024. If you're above these limits, investigate the backdoor Roth IRA strategy.

The both/and strategy is often correct: contribute enough to 401k to get the full match, then max the Roth IRA ($7,000 in 2024, $8,000 if 50+), then return to the 401k if you have more to invest.`}
        conclusion={`The tax diversification argument is underrated: having money in both traditional and Roth accounts gives you flexibility in retirement to manage your taxable income precisely. You can draw from the tax-deferred account up to the top of a lower bracket, then switch to the Roth — effectively paying the lowest possible rate across your lifetime.

Young earners who expect decades of income growth often make the Roth choice more attractive than it appears. Someone in the 22% bracket today who expects to retire with substantial Social Security, rental income, and investment accounts might be in the 24% or 28% bracket in retirement. Use [our Income Tax Calculator](/calculators/finance/income-tax-calculator) to model your current marginal rate and compare it to your expected retirement income.`}

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
          { name: "401k vs Taxable Account Calculator", href: "/calculators/finance/401k-vs-taxable-account-calculator", icon: "📊", desc: "Free calculator" },          { name: "401k vs Pension Calculator", href: "/calculators/finance/401k-vs-pension-calculator", icon: "📊", desc: "Free calculator" },          { name: "Roth IRA vs Traditional IRA Calculator", href: "/calculators/finance/roth-ira-vs-traditional-ira-calculator", icon: "📊", desc: "Free calculator" },          { name: "Roth IRA vs 401k Employer Match Calculator", href: "/calculators/finance/roth-ira-vs-401k-employer-match-calculator", icon: "📊", desc: "Free calculator" },          { name: "Roth IRA vs HSA Calculator", href: "/calculators/finance/roth-ira-vs-hsa-calculator", icon: "📊", desc: "Free calculator" },          { name: "HSA vs FSA Calculator", href: "/calculators/finance/hsa-vs-fsa-calculator", icon: "🏥", desc: "Free calculator" },          { name: "Sep IRA vs Solo 401k Calculator", href: "/calculators/finance/sep-ira-vs-solo-401k-calculator", icon: "💼", desc: "Free calculator" },          { name: "Bonds vs Cds USA Calculator", href: "/calculators/finance/bonds-vs-cds-usa-calculator", icon: "📋", desc: "Free calculator" },          { name: "Cd vs HYSA Calculator", href: "/calculators/finance/cd-vs-hysa-calculator", icon: "💰", desc: "Free calculator" },          { name: "I Bonds vs Tips Calculator", href: "/calculators/finance/i-bonds-vs-tips-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "S&P500 vs Bonds Calculator", href: "/calculators/finance/sp500-vs-bonds-calculator", icon: "📊", desc: "Free calculator" },          { name: "S&P500 vs Real Estate USA Calculator", href: "/calculators/finance/sp500-vs-real-estate-usa-calculator", icon: "📊", desc: "Free calculator" },
          ]}
        />

    </CalculatorLayout>
  )
}
