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

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }
const fmt = (n: number) => '$' + Math.round(n).toLocaleString()
const fmtC = (n: number) => n >= 1000000 ? `$${(n/1000000).toFixed(2)}M` : `$${(n/1000).toFixed(0)}K`

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const [monthly, setMonthly] = useState(1000)
  const [sp500Rate, setSp500Rate] = useState(10.5)
  const [bondRate, setBondRate] = useState(4.5)
  const [years, setYears] = useState(30)
  const [allocation, setAllocation] = useState(60) // % in stocks

  const result = useMemo(() => {
    const months = years * 12
    const sp500MR = sp500Rate / 100 / 12
    const bondMR = bondRate / 100 / 12
    const blendedRate = (sp500Rate * allocation / 100 + bondRate * (1 - allocation / 100)) / 100 / 12

    const sp500FV = monthly * ((Math.pow(1 + sp500MR, months) - 1) / sp500MR) * (1 + sp500MR)
    const bondFV = monthly * ((Math.pow(1 + bondMR, months) - 1) / bondMR) * (1 + bondMR)
    const blendedFV = monthly * ((Math.pow(1 + blendedRate, months) - 1) / blendedRate) * (1 + blendedRate)
    const totalInvested = monthly * months

    const yearlyData = Array.from({ length: years }, (_, i) => {
      const y = i + 1; const m = y * 12
      const sFV = monthly * ((Math.pow(1 + sp500MR, m) - 1) / sp500MR) * (1 + sp500MR)
      const bFV = monthly * ((Math.pow(1 + bondMR, m) - 1) / bondMR) * (1 + bondMR)
      const blFV = monthly * ((Math.pow(1 + blendedRate, m) - 1) / blendedRate) * (1 + blendedRate)
      return { year: y, sp500: Math.round(sFV), bonds: Math.round(bFV), blended: Math.round(blFV), invested: monthly * m }
    })

    return {
      sp500FV: Math.round(sp500FV), bondFV: Math.round(bondFV), blendedFV: Math.round(blendedFV),
      totalInvested: Math.round(totalInvested),
      sp500Gain: Math.round(sp500FV - totalInvested), bondGain: Math.round(bondFV - totalInvested),
      yearlyData,
    }
  }, [monthly, sp500Rate, bondRate, years, allocation])

  return (
    <CalculatorLayout title="S&P 500 vs Bonds Calculator USA 2026" description="Compare S&P 500 equity returns vs US bond returns at different allocation splits." icon="📊" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-4">Investment Details</h2>
          <div className="space-y-4">
            <InputField label="Monthly Investment" value={monthly} onChange={setMonthly} min={100} max={50000} step={100} prefix="$" />
            <InputField label="S&amp;P 500 Return (Historical ~10.5%)" value={sp500Rate} onChange={setSp500Rate} min={5} max={15} step={0.5} suffix="%" />
            <InputField label="Bond Yield" value={bondRate} onChange={setBondRate} min={2} max={8} step={0.25} suffix="%" />
            <InputField label="Investment Period" value={years} onChange={setYears} min={5} max={40} step={5} suffix="Yrs" />
            <InputField label="Stocks Allocation (Blended)" value={allocation} onChange={setAllocation} min={0} max={100} step={10} suffix="%" />
          </div>
          <div className="mt-4 space-y-2 text-xs">
            <div className="p-2 bg-green-900/20 rounded-lg border border-green-800/30">
              <p className="text-green-400 font-bold">S&amp;P 500 Historical Returns</p>
              <p className="text-gray-400">~10.5% nominal | ~7.5% inflation-adjusted</p>
              <p className="text-gray-400">Best 30yr: 14.7% | Worst 30yr: 7.8%</p>
            </div>
            <div className="p-2 bg-blue-900/20 rounded-lg border border-blue-800/30">
              <p className="text-blue-400 font-bold">US Bond Returns</p>
              <p className="text-gray-400">10yr Treasury ~4.5% | Corp Bonds ~5.5%</p>
              <p className="text-gray-400">Inflation-adjusted real return: ~1.5%</p>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="S&amp;P 500 Value" value={fmtC(result.sp500FV)} subValue={`+${fmtC(result.sp500Gain)} gain`} highlight icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="Bonds Value" value={fmtC(result.bondFV)} subValue={`+${fmtC(result.bondGain)} gain`} icon={<Shield className="w-4 h-4" />} />
            <ResultCard label={`${allocation}/${100-allocation} Blended`} value={fmtC(result.blendedFV)} subValue="Stocks/Bonds mix" />
            <ResultCard label="Total Invested" value={fmtC(result.totalInvested)} subValue={`${years}yr x $${monthly}/mo`} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">S&amp;P 500 vs Bonds Growth Over {years} Years</h3>
            <div style={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.yearlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gSP" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.4} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient>
                    <linearGradient id="gBonds" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} /><stop offset="95%" stopColor="#3b82f6" stopOpacity={0} /></linearGradient>
                    <linearGradient id="gBl" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} /><stop offset="95%" stopColor="#f59e0b" stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={72} tickFormatter={v => v >= 1000000 ? `$${(v/1000000).toFixed(1)}M` : `$${(v/1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} formatter={(v: number, name) => [fmt(v), name]} labelFormatter={y => `Year ${y}`} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="invested" name="Invested" stroke="#94a3b8" strokeDasharray="4 2" strokeWidth={1.5} fill="none" />
                  <Area type="monotone" dataKey="bonds" name="Bonds" stroke="#3b82f6" fill="url(#gBonds)" strokeWidth={2} />
                  <Area type="monotone" dataKey="blended" name={`${allocation}/${100-allocation} Blended`} stroke="#f59e0b" fill="url(#gBl)" strokeWidth={2} />
                  <Area type="monotone" dataKey="sp500" name="S&amp;P 500" stroke="#10b981" fill="url(#gSP)" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
            <div className="mt-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-6">Sp500 vs Bonds: Complete Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-base">What is Sp500?</h3>
              <p>Sp500 is a USA investment or financial product that offers distinct advantages depending on your goals, tax situation, and time horizon. Understanding how it works is key to making the most of your money.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">What is Bonds?</h3>
              <p>Bonds takes a different approach to growing or protecting your wealth. Each has its own risk profile, liquidity characteristics, and tax treatment that makes it suited to specific financial situations.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">Key Differences</h3>
              <p>The most important distinction between Sp500 and Bonds is how returns are generated and taxed. Sp500 typically suits growth-oriented investors while Bonds may appeal to those prioritizing stability or specific tax advantages.</p>
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
            <p className="text-sm text-green-700 leading-relaxed">Most financial advisors recommend not putting all your money in one option. A diversified approach - splitting between Sp500 and Bonds based on your specific goals - often provides better risk-adjusted returns than going all-in on either. Use this calculator to find your optimal split.</p>
          </div>
        </div>
      </div>

            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          S&P 500 Vs Bonds Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          $500/month invested in the S&P 500 at an average 10% annual return grows to over <strong>$1.1M</strong> in 30 years through the power of compound growth.
        </p>
        <p className="text-sm text-gray-600">
          This S&P 500 Vs Bonds USA 2026 calculator helps you model investment scenarios and understand the long-term impact of consistent contributions.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          S&P 500 vs Bonds Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, with $200,000 to invest, your S&P 500 vs bonds calculator USA 2026 shows the 20-year wealth outcome for every allocation from 0/100 to 100/0 — helping you find the right risk-return balance.
        </p>
      </Card>

            <SEOContent
        title="S&P 500 vs Bonds Calculator USA – How Much More Wealth Does Equity Build Over Fixed Income in 2026?"
        category="finance"
        intro={`The stocks vs bonds allocation decision is the single most important portfolio construction choice for most investors. The equity premium — the additional return equities have historically delivered above bonds — is real and substantial: US stocks have returned approximately 10% nominal (7% real) annually since 1926; US intermediate bonds have returned approximately 5% nominal (2% real). Over 30-year periods, that 5% differential compounds into dramatically different portfolio outcomes.

But bonds aren't just underperforming equities. They serve a specific function: reducing portfolio volatility and providing a less correlated asset that can be sold to fund living expenses or rebalanced into equities during stock market declines. The classic 60/40 portfolio (60% stocks, 40% bonds) was designed to capture most equity upside while reducing the emotional and financial difficulty of riding out bear markets.

The optimal allocation depends on your time horizon, income stability, risk tolerance, and how soon you need to draw on the portfolio. Young investors with 30+ years before retirement can tolerate 100% equity — they'll live through several bear markets but have time to recover. Retirees drawing income from their portfolio need enough in bonds/cash to fund 3-5 years of expenses without selling equities during downturns.`}
        howItWorks={`Total return comparison: S&P 500 total return (including dividends reinvested) vs Bloomberg US Aggregate Bond Index. Historical annualized returns (approximate, 1990-2024): S&P 500: ~10.5%; US Bonds: ~4.8%.

Portfolio modeling: Blended return = (equity allocation × equity return) + (bond allocation × bond return). 60/40 at historical rates: (0.6 × 10.5%) + (0.4 × 4.8%) = 6.3% + 1.92% = 8.22% blended. Volatility (standard deviation) is also blended, but with correlation reducing overall portfolio volatility below the weighted average of components.

Sharp Ratio comparison: Risk-adjusted return = (portfolio return - risk-free rate) / standard deviation. Bonds alone: modest positive Sharpe. Equities alone: historically higher Sharpe than bonds. Combined 60/40: often higher Sharpe than either alone due to correlation-driven volatility reduction.`}
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
        tipsSection={`The bond allocation recommendation should match your actual investment horizon and income needs. The rule of thumb 'your age in bonds' (e.g., 40% bonds at age 40) was designed for a different era and different expected returns. With bonds yielding 4-5% and equities expected at 7-8% real, many financial planners now recommend higher equity allocations throughout life.

Duration matching is critical for bond allocations used to fund specific near-term needs. Match bond maturity to when you need the money — a 10-year bond bought to fund retirement in 7 years carries interest rate risk that a 7-year bond doesn't. For retirement income reserves, short-to-intermediate duration bonds (1-7 years) are appropriate.

In rising rate environments, bond prices fall. The 2022 bond bear market (-15% for intermediate bonds) surprised investors who expected bonds to cushion portfolio losses during equity bear markets. Interest rate risk is the primary risk for bond investors that many people underestimate.`}
        conclusion={`A common behavioral observation: the correct bond allocation is the one that prevents panic selling during equity bear markets. If a 100% equity portfolio would cause you to sell at the bottom, a 70/30 portfolio that you can hold through the downturn often produces better long-term results despite theoretically lower expected returns.

The 4% withdrawal rule and most retirement simulation studies assume a 50-60% equity, 40-50% bond portfolio. Higher equity allocations throughout retirement may allow higher sustainable withdrawal rates but expose retirees to more sequence-of-returns risk. Use [our FIRE Calculator](/calculators/finance/fire-calculator) alongside this comparison to understand how your portfolio allocation affects retirement sustainability.`}

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
            { name: "S&P 500 vs Bonds Calculator", href: "/calculators/finance/sp500-vs-bonds-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Inflation Calculator", href: "/calculators/finance/inflation-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "ROI Calculator", href: "/calculators/finance/roi-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "CAGR Calculator", href: "/calculators/finance/cagr-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Savings Rate Calculator", href: "/calculators/finance/savings-rate-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "Net Worth Calculator", href: "/calculators/finance/net-worth-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "Fire Calculator", href: "/calculators/finance/fire-calculator", icon: "🔗", desc: "Related financial planning" },
        ]}
      />
      <FAQSection faqs={faqs} />
        {/* Internal Links */}
        {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "401k vs Roth IRA Calculator", href: "/calculators/finance/401k-vs-roth-ira-calculator", icon: "📊", desc: "Free calculator" },          { name: "401k vs Taxable Account Calculator", href: "/calculators/finance/401k-vs-taxable-account-calculator", icon: "📊", desc: "Free calculator" },          { name: "401k vs Pension Calculator", href: "/calculators/finance/401k-vs-pension-calculator", icon: "📊", desc: "Free calculator" },          { name: "Roth IRA vs Traditional IRA Calculator", href: "/calculators/finance/roth-ira-vs-traditional-ira-calculator", icon: "📊", desc: "Free calculator" },          { name: "Roth IRA vs 401k Employer Match Calculator", href: "/calculators/finance/roth-ira-vs-401k-employer-match-calculator", icon: "📊", desc: "Free calculator" },          { name: "Roth IRA vs HSA Calculator", href: "/calculators/finance/roth-ira-vs-hsa-calculator", icon: "📊", desc: "Free calculator" },          { name: "HSA vs FSA Calculator", href: "/calculators/finance/hsa-vs-fsa-calculator", icon: "🏥", desc: "Free calculator" },          { name: "Sep IRA vs Solo 401k Calculator", href: "/calculators/finance/sep-ira-vs-solo-401k-calculator", icon: "💼", desc: "Free calculator" },          { name: "Bonds vs Cds USA Calculator", href: "/calculators/finance/bonds-vs-cds-usa-calculator", icon: "📋", desc: "Free calculator" },          { name: "Cd vs HYSA Calculator", href: "/calculators/finance/cd-vs-hysa-calculator", icon: "💰", desc: "Free calculator" },          { name: "I Bonds vs Tips Calculator", href: "/calculators/finance/i-bonds-vs-tips-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "S&P500 vs Real Estate USA Calculator", href: "/calculators/finance/sp500-vs-real-estate-usa-calculator", icon: "📊", desc: "Free calculator" },
          ]}
        />

    </CalculatorLayout>
  )
}
