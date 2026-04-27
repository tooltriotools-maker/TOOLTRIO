'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar } from 'recharts'
import { calculateISA } from '@/lib/calculations/finance'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

type ISAType = 'stocks' | 'cash' | 'lifetime'

const ISA_TYPES: { value: ISAType; label: string; icon: string; desc: string; defaultReturn: number; limit: number }[] = [
  { value: 'stocks', label: 'Stocks &amp; Shares ISA', icon: '📈', desc: 'Invest in funds, shares, ETFs', defaultReturn: 8, limit: 20000 },
  { value: 'cash', label: 'Cash ISA', icon: '💷', desc: 'Guaranteed savings rate', defaultReturn: 4.5, limit: 20000 },
  { value: 'lifetime', label: 'Lifetime ISA (LISA)', icon: '🏠', desc: '+25% govt bonus up to £4k/yr', defaultReturn: 7, limit: 4000 },
]

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const [isaType, setIsaType] = useState<ISAType>('stocks')
  const [currentBalance, setCurrentBalance] = useState(5000)
  const [annualContrib, setAnnualContrib] = useState(12000)
  const [annualReturn, setAnnualReturn] = useState(8)
  const [years, setYears] = useState(20)

  const typeConfig = ISA_TYPES.find(t => t.value === isaType)!
  const cappedContrib = Math.min(annualContrib, typeConfig.limit)

  const result = useMemo(() => calculateISA(currentBalance, annualContrib, annualReturn, years, isaType),
    [currentBalance, annualContrib, annualReturn, years, isaType])

  const handleTypeChange = (t: ISAType) => {
    setIsaType(t)
    setAnnualReturn(ISA_TYPES.find(x => x.value === t)!.defaultReturn)
    if (t === 'lifetime') setAnnualContrib(Math.min(annualContrib, 4000))
  }

  const fmt = (v: number) => `£${Math.round(v).toLocaleString()}`
  const fmtK = (v: number) => v >= 1000000 ? `£${(v / 1000000).toFixed(2)}M` : `£${(v / 1000).toFixed(0)}k`

  // Compare all ISA types
  const comparison = ISA_TYPES.map(t => {
    const r = calculateISA(currentBalance, Math.min(annualContrib, t.limit), ISA_TYPES.find(x => x.value === t.value)!.defaultReturn, years, t.value)
    return { name: t.label.replace(' ISA', '').replace(' (LISA)', ''), balance: r.finalBalance, growth: r.growth, bonus: r.totalBonus }
  })

  return (
    <CalculatorLayout title="ISA Calculator UK 2026" description="Calculate tax-free growth in Stocks and Shares ISA with the 2026 GBP 20,000 annual allowance." icon="💷" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-4">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">ISA Settings</h2>

          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-600">ISA Type</label>
            {ISA_TYPES.map(t => (
              <button key={t.value} onClick={() => handleTypeChange(t.value)}
                className={`w-full text-left p-3 rounded-xl border transition-all ${isaType === t.value ? 'bg-green-600 border-green-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'}`}>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{t.icon}</span>
                  <div>
                    <p className="text-sm font-semibold">{t.label}</p>
                    <p className={`text-xs ${isaType === t.value ? 'text-green-100' : 'text-gray-400'}`}>{t.desc} - limit: £{t.limit.toLocaleString()}/yr</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Current ISA Balance</label>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
              <span className="text-green-600 font-bold text-sm">£</span>
              <input type="number" value={currentBalance} onChange={e => setCurrentBalance(Number(e.target.value))} step={500}
                className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <label className="text-xs font-medium text-gray-600">Annual Contribution</label>
              <span className={`text-xs font-bold ${cappedContrib >= typeConfig.limit ? 'text-green-600' : 'text-amber-600'}`}>
                {cappedContrib >= typeConfig.limit ? 'v Maxed' : `Max £${typeConfig.limit.toLocaleString()}`}
              </span>
            </div>
            <input type="range" min={0} max={typeConfig.limit} step={500} value={Math.min(annualContrib, typeConfig.limit)}
              onChange={e => setAnnualContrib(Number(e.target.value))} className="w-full accent-green-500" />
            <div className="flex justify-between text-xs text-gray-400">
              <span>£0</span>
              <span className="font-bold text-gray-700">£{Math.min(annualContrib, typeConfig.limit).toLocaleString()}/yr</span>
              <span>£{typeConfig.limit.toLocaleString()}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">Annual Return</label>
              <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                <input type="number" value={annualReturn} onChange={e => setAnnualReturn(Number(e.target.value))} step={0.5}
                  className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right text-sm" />
                <span className="text-gray-400 text-xs">%</span>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">Years</label>
              <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                <input type="number" value={years} onChange={e => setYears(Number(e.target.value))} step={5} min={1} max={50}
                  className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right text-sm" />
                <span className="text-gray-400 text-xs">yr</span>
              </div>
            </div>
          </div>

          {isaType === 'lifetime' && (
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 text-center">
              <p className="text-xs text-purple-600 font-semibold">Government Bonus</p>
              <p className="text-xl font-black text-purple-700">+{fmt(result.totalBonus)}</p>
              <p className="text-xs text-purple-500">25% on contributions over {years} years</p>
            </div>
          )}
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="ISA Balance" value={fmtK(result.finalBalance)} highlight />
            <ResultCard label="Tax-Free Growth" value={fmtK(result.growth)} subValue="never taxed" />
            <ResultCard label="Total Contributed" value={fmtK(result.totalContributed)} />
            {isaType === 'lifetime'
              ? <ResultCard label="Govt Bonus" value={fmt(result.totalBonus)} subValue="25% top-up" />
              : <ResultCard label="Tax Saving Est." value={fmt(result.taxSaving)} subValue="vs taxable account" />}
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Tax-Free ISA Growth</h3>
            <div style={{ height: 230 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.yearData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="isaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="cGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} label={{ value: 'Years', position: 'insideBottomRight', fill: '#94a3b8', fontSize: 10 }} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={65} tickFormatter={v => `£${v >= 1000000 ? (v / 1000000).toFixed(1) + 'M' : (v / 1000).toFixed(0) + 'k'}`} />
                  <Tooltip formatter={(v: number) => fmtK(v)} contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="balance" name="ISA Balance (Tax-Free)" stroke="#22c55e" strokeWidth={2.5} fill="url(#isaGrad)" />
                  <Area type="monotone" dataKey="contributed" name="Amount Contributed" stroke="#3b82f6" strokeWidth={1.5} fill="url(#cGrad)" strokeDasharray="5 3" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">ISA Type Comparison after {years} Years</h3>
            <div style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparison} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={65} tickFormatter={v => `£${(v / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v: number) => fmtK(v)} contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="balance" name="Total Balance" fill="#22c55e" radius={[4, 4, 0, 0]} stackId="a" />
                  <Bar dataKey="bonus" name="Govt Bonus" fill="#8b5cf6" radius={[4, 4, 0, 0]} stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <Card>
          <h2 className="text-xl font-black text-gray-900 mb-4">ISA Calculator - Maximise Your UK Tax-Free Savings in 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">The ISA Allowance and How to Use It</h3>
              <p>Every UK adult receives a £20,000 annual ISA allowance - tax-free savings and investment wrapper that shelters gains and income from HMRC forever. Unlike pensions, there is no tax relief on ISA contributions, but all growth is completely exempt from Capital Gains Tax and Income Tax, including when you withdraw funds. The allowance resets each tax year on 6 April - unused allowance cannot be carried forward. Couples can shelter £40,000 per year combined. A couple maximising ISA allowances for 20 years could accumulate £1.5-2M+ completely tax-free.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Best Stocks and Shares ISA Strategies 2026</h3>
              <p>The most cost-effective S&S ISA approach: use a low-cost platform (Vanguard, Trading 212, InvestEngine) and invest in global index tracker funds. Vanguard FTSE All-World (VWRL) or similar global ETF provides diversification across 3,000+ companies at 0.22% annual charge. Avoid expensive actively managed funds (1-2% charges) which rarely outperform index funds over the long term. Drip-feed investments monthly rather than investing a lump sum to reduce timing risk. Keep 6 months emergency fund in Cash ISA before investing in S&S ISA.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Lifetime ISA: Free Money for First Homes</h3>
              <p>The LISA offers a 25% government bonus on up to £4,000 per year - effectively £1,000 of free money annually if you maximise it. Over 10 years at age 18-28, that is £10,000 in government bonuses plus investment growth. For first-time buyers, the LISA is one of the best savings tools available as the bonus is immediately added to your pot. Restriction: property must be under £450,000 (unchanged since 2017, increasingly tight in London/South East). The 25% withdrawal penalty for non-qualifying withdrawals means the LISA is only suitable for people committed to first home purchase or retirement after 60.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">ISA vs Pension: Which to Prioritise?</h3>
              <p>Pension: 20-45% immediate tax relief on contributions (government adds 25-82% to your contribution depending on rate), grows tax-free, but cannot access before age 57 (rising to 58 in 2028). ISA: no upfront relief, but completely flexible access and fully tax-free forever. Recommended order: (1) Contribute enough to workplace pension for full employer match - instant 50-100% return. (2) Max ISA for flexibility and tax-free access before retirement. (3) Additional pension contributions to use higher-rate tax relief. (4) Non-registered accounts if still have surplus to invest.</p>
            </div>
          </div>
        </Card>
  

      {/* Internal Links */}
      {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "UK Income Tax Calculator", href: "/calculators/finance/uk-income-tax-calculator", icon: "🇬🇧", desc: "Free calculator" },          { name: "UK Pension Calculator", href: "/calculators/finance/uk-pension-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "UK Stamp Duty Calculator", href: "/calculators/finance/uk-stamp-duty-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Buy To Let vs Stocks Calculator", href: "/calculators/finance/uk-buy-to-let-vs-stocks-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Help To Buy vs LISA Calculator", href: "/calculators/finance/uk-help-to-buy-vs-lisa-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Lifetime ISA vs SIPp Calculator", href: "/calculators/finance/uk-lifetime-isa-vs-sipp-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Premium Bonds vs Cash ISA Calculator", href: "/calculators/finance/uk-premium-bonds-vs-cash-isa-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Pension vs ISA Calculator", href: "/calculators/finance/uk-pension-vs-isa-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Fixed Rate vs Tracker Mortgage Calculator", href: "/calculators/finance/uk-fixed-rate-vs-tracker-mortgage-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Stocks vs Bonds Calculator", href: "/calculators/finance/uk-stocks-vs-bonds-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Pension Drawdown vs Annuity Calculator", href: "/calculators/finance/uk-pension-drawdown-vs-annuity-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Remortgage vs Invest Calculator", href: "/calculators/finance/uk-remortgage-vs-invest-calculator", icon: "📊", desc: "Free calculator" },
          ]}
        />
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          ISA Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this ISA USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          ISA Calculator Example (UK 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, investing GBP 10,000/year in a Stocks and Shares ISA, your ISA calculator UK 2026 shows your projected tax-free portfolio value at any age — and the tax you avoid vs investing outside an ISA.
        </p>
      </Card>

            <SEOContent
        title="ISA Calculator UK – How Much Will Your ISA Grow Tax-Free by Retirement in 2026?"
        category="finance"
        intro={`The UK's Individual Savings Account (ISA) is one of the most generous tax-advantaged investment structures in the developed world — and it's chronically underused. You can invest up to £20,000 per tax year into ISAs, and all growth, dividends, and interest within the wrapper are completely tax-free with no limit on how much the account can grow over time. A £20,000/year contribution at 7% annual return for 30 years produces a pot of approximately £1.89 million — entirely tax-free on withdrawal.

The four main ISA types serve different needs: Cash ISA for risk-free savings with tax-free interest; Stocks and Shares ISA for equity and bond investment with no capital gains or dividend tax; Innovative Finance ISA for P2P lending (higher risk); and Lifetime ISA (LISA) for first-home purchase or retirement savings with a 25% government bonus on contributions up to £4,000/year.

The UK pension (SIPP) provides a different tax structure: contributions get upfront tax relief (immediate return of 20-45% depending on your rate), but withdrawals are taxed as income. ISA contributions come from post-tax income but withdrawals are completely tax-free. The optimal strategy typically involves contributing to both — ISA for flexible savings and SIPP for retirement-specific accumulation with tax relief.`}
        howItWorks={`ISA compound growth: Annual contribution × [(1+r)^n - 1] / r = future value. For £20,000/year at 7% for 30 years: £20,000 × [(1.07)^30 - 1] / 0.07 = £1,889,234.

Tax saving estimate: The after-tax value compared to an equivalent taxable account. UK capital gains tax at 18-24% on investment gains above the CGT annual allowance (£3,000 from April 2024) and dividend tax at 8.75-39.35% depending on income level. In a Stocks & Shares ISA, all these taxes are permanently avoided.

Lifetime ISA bonus: Contributions up to £4,000/year attract a 25% government bonus (£1,000/year maximum). For first-time buyers, the LISA is particularly valuable — the bonus effectively reduces the cost of your house deposit by 20%.`}
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
        tipsSection={`Front-loading annual ISA contributions at the start of the tax year (April 6) rather than the end gives your money more time to compound. On a £20,000 contribution at 7% annual return, investing on April 6 versus April 5 (next year) makes approximately £1,400 difference after 30 years. The academic evidence on early vs. late contribution supports front-loading.

For S&S ISA investment: Vanguard, Fidelity, and iWeb offer low-cost platforms with broad index fund choices. Total platform + fund costs below 0.5% annually is achievable. Minimizing fees in a tax-free wrapper is essential — every pound of fee directly reduces tax-free return.

Review your ISA provider's fee structure annually. Platforms charging percentage fees (good for small balances) become expensive for large portfolios. A platform charging 0.35% on £500,000 costs £1,750/year. Platforms with fixed annual fees (like Interactive Brokers at ~£36/year or Vanguard's flat fee tiers) become more economical above certain portfolio sizes.`}
        conclusion={`The ISA's unlimited accumulation without tax consequences is its defining advantage over US tax-advantaged accounts, which cap annual contributions. A UK investor who diligently maxes their ISA from age 25 can accumulate over £2 million by retirement — entirely tax-free in and out. This is genuinely extraordinary compared to most other countries' investment tax regimes.

For younger UK investors, the Lifetime ISA (LISA) for first home purchase combines the ISA tax benefits with a 25% government bonus — effectively giving you an instant 25% return on contributions before any investment growth. For first-time buyers saving for a deposit, LISA contributions up to £4,000/year should be maximized before other ISA contributions.`}

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
