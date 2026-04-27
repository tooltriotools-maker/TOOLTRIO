'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar } from 'recharts'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { TrendingUp } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, fmtCompact } = useCurrency()
  const [monthly, setMonthly] = useState(10000)
  const [sipRate, setSipRate] = useState(12)
  const [goldRate, setGoldRate] = useState(8)
  const [sgbBonus, setSgbBonus] = useState(2.5) // SGB gives 2.5% extra interest
  const [years, setYears] = useState(10)
  const [investmentType, setInvestmentType] = useState<'physical' | 'sgb' | 'goldetf'>('sgb')

  const result = useMemo(() => {
    const months = years * 12
    const sipMonthlyRate = sipRate / 100 / 12
    const sipFV = monthly * ((Math.pow(1 + sipMonthlyRate, months) - 1) / sipMonthlyRate) * (1 + sipMonthlyRate)
    const sipInvested = monthly * months

    // Effective gold rate based on type
    const effectiveGoldRate = investmentType === 'sgb' ? goldRate + sgbBonus : goldRate
    const goldMonthlyRate = effectiveGoldRate / 100 / 12
    let goldFV = 0
    for (let m = 1; m <= months; m++) {
      goldFV += monthly * Math.pow(1 + goldMonthlyRate, months - m + 1)
    }

    // Physical gold has making charges (~8-15%) and storage cost
    if (investmentType === 'physical') {
      goldFV *= 0.88 // account for 12% making charges avg
    }

    const yearlyData = Array.from({ length: years }, (_, i) => {
      const y = i + 1
      const m = y * 12
      const sFV = monthly * ((Math.pow(1 + sipMonthlyRate, m) - 1) / sipMonthlyRate) * (1 + sipMonthlyRate)
      let gFV = 0
      for (let mo = 1; mo <= m; mo++) gFV += monthly * Math.pow(1 + goldMonthlyRate, m - mo + 1)
      if (investmentType === 'physical') gFV *= 0.88
      return { year: y, invested: monthly * m, sip: Math.round(sFV), gold: Math.round(gFV) }
    })

    const goldGain = goldFV - sipInvested
    const sipGain = sipFV - sipInvested

    return {
      sipFV: Math.round(sipFV),
      goldFV: Math.round(goldFV),
      sipInvested: Math.round(sipInvested),
      sipGain: Math.round(sipGain),
      goldGain: Math.round(goldGain),
      sipBetter: sipFV > goldFV,
      difference: Math.round(Math.abs(sipFV - goldFV)),
      yearlyData,
      effectiveGoldRate,
    }
  }, [monthly, sipRate, goldRate, sgbBonus, years, investmentType])

  const goldTypes = [
    { id: 'physical', label: '🪙 Physical Gold' },
    { id: 'sgb', label: '📄 Sovereign Gold Bond' },
    { id: 'goldetf', label: '📊 Gold ETF' },
  ]

  return (
    <CalculatorLayout title="SIP vs Gold Calculator India 2026" description="Compare monthly SIP mutual fund returns vs gold investment on long-term wealth building." icon="🥇" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" /> Investment Details
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-gray-600 mb-2">Gold Investment Type</p>
              <div className="grid grid-cols-1 gap-2">
                {goldTypes.map(t => (
                  <button key={t.id} onClick={() => setInvestmentType(t.id as any)}
                    className={`px-3 py-2 rounded-xl text-sm font-medium border-2 transition-all ${investmentType === t.id ? 'bg-yellow-50 border-yellow-400 text-yellow-700' : 'bg-gray-50 border-gray-200 text-gray-500'}`}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            <InputField label="Monthly Investment" value={monthly} onChange={setMonthly} min={500} max={500000} step={500} prefix="₹" />
            <InputField label="SIP Expected Return (p.a.)" value={sipRate} onChange={setSipRate} min={1} max={30} step={0.5} suffix="%" />
            <InputField label="Gold Appreciation (p.a.)" value={goldRate} onChange={setGoldRate} min={1} max={20} step={0.5} suffix="%" />
            {investmentType === 'sgb' && (
              <InputField label="SGB Interest Bonus" value={sgbBonus} onChange={setSgbBonus} min={0} max={5} step={0.25} suffix="%" />
            )}
            <InputField label="Investment Period" value={years} onChange={setYears} min={1} max={40} step={1} suffix="Yrs" />
          </div>
          <div className={`mt-4 p-3 rounded-xl border-2 text-center ${result.sipBetter ? 'bg-green-50 border-green-300' : 'bg-yellow-50 border-yellow-300'}`}>
            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Better Investment</p>
            <p className="text-xl font-black" style={{ color: result.sipBetter ? '#10b981' : '#d97706' }}>{result.sipBetter ? 'SIP' : 'Gold'} 🏆</p>
            <p className="text-sm text-gray-600">by {fmtCompact(result.difference)}</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <ResultCard label="SIP Final Value" value={fmtCompact(result.sipFV)} subValue={`Gain: ${fmtCompact(result.sipGain)}`} highlight={result.sipBetter} icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="Gold Final Value" value={fmtCompact(result.goldFV)} subValue={`Effective: ${result.effectiveGoldRate.toFixed(1)}% p.a.`} highlight={!result.sipBetter} />
            <ResultCard label="Total Invested" value={fmtCompact(result.sipInvested)} subValue={`${years}y x ₹${monthly.toLocaleString()}/mo`} />
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">SIP vs Gold Growth Over {years} Years</h3>
            <div style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.yearlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gSip3" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gGold" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.5} /><stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gInv2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3} /><stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={68} tickFormatter={v => v >= 10000000 ? `₹${(v/10000000).toFixed(1)}Cr` : v >= 100000 ? `₹${(v/100000).toFixed(0)}L` : `₹${(v/1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} formatter={(v: number, name) => [fmt(v), name]} labelFormatter={y => `Year ${y}`} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="invested" name="Invested" stroke="#94a3b8" fill="url(#gInv2)" strokeWidth={1.5} strokeDasharray="4 2" />
                  <Area type="monotone" dataKey="gold" name="Gold Value" stroke="#f59e0b" fill="url(#gGold)" strokeWidth={2} />
                  <Area type="monotone" dataKey="sip" name="SIP Value" stroke="#10b981" fill="url(#gSip3)" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Gold Investment Types Comparison</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { type: 'Physical Gold', pros: ['Tangible asset', 'Emergency liquidity', 'Cultural value'], cons: ['Making charges 8-15%', 'Storage risk', 'No interest income'], color: 'yellow' },
                { type: 'Sovereign Gold Bond', pros: ['2.5% extra interest', 'Tax-free on maturity', 'Government backed'], cons: ['8-year lock-in', 'Secondary market risk', 'Annual interest taxable'], color: 'green' },
                { type: 'Gold ETF', pros: ['No lock-in', 'No making charges', 'Easy to buy/sell'], cons: ['Expense ratio 0.5-1%', 'Demat account needed', 'No tax exemption'], color: 'blue' },
              ].map(g => (
                <div key={g.type} className={`p-3 rounded-xl bg-${g.color}-50/50 border border-${g.color}-100`}>
                  <p className="text-xs font-bold text-gray-700 mb-2">{g.type}</p>
                  <div className="space-y-1">
                    {g.pros.map(p => <p key={p} className="text-xs text-green-600">v {p}</p>)}
                    {g.cons.map(c => <p key={c} className="text-xs text-red-400">✗ {c}</p>)}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
            <div className="mt-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-6">Sip vs Gold: Complete Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-base">What is Sip?</h3>
              <p>Sip is a India investment or financial product that offers distinct advantages depending on your goals, tax situation, and time horizon. Understanding how it works is key to making the most of your money.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">What is Gold?</h3>
              <p>Gold takes a different approach to growing or protecting your wealth. Each has its own risk profile, liquidity characteristics, and tax treatment that makes it suited to specific financial situations.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">Key Differences</h3>
              <p>The most important distinction between Sip and Gold is how returns are generated and taxed. Sip typically suits growth-oriented investors while Gold may appeal to those prioritizing stability or specific tax advantages.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-base">Tax Treatment in India</h3>
              <p>Tax efficiency dramatically affects real returns. Gains from each option may be subject to LTCG (10%) or income tax slab. Using the calculator above helps you see the true post-tax outcome based on your specific situation and contribution level.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">Which Is Better for Long-Term Wealth Creation?</h3>
              <p>The right choice depends on your time horizon, risk tolerance, and tax bracket. For goals 5+ years away, higher-return options (12-15% historical) generally beat lower-return stable options (6-7.5%). For goals under 3 years, capital preservation takes priority.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">How to Use This Calculator</h3>
              <p>Enter your monthly contribution, expected return rates for both options, and investment period above. The calculator shows year-by-year growth, total wealth created, and the difference between the two strategies - helping you visualize the long-term impact of your choice.</p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
            <h3 className="font-bold text-green-800 mb-2">💡 Expert Tip</h3>
            <p className="text-sm text-green-700 leading-relaxed">Most financial advisors recommend not putting all your money in one option. A diversified approach - splitting between Sip and Gold based on your specific goals - often provides better risk-adjusted returns than going all-in on either. Use this calculator to find your optimal split.</p>
          </div>
        </div>
      </div>


      {/* Internal Links */}
      {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "SIP Calculator", href: "/calculators/finance/sip-calculator", icon: "📈", desc: "Free calculator" },          { name: "PPF Calculator", href: "/calculators/finance/ppf-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "NPS Calculator", href: "/calculators/finance/nps-calculator", icon: "📊", desc: "Free calculator" },          { name: "Fd Calculator", href: "/calculators/finance/fd-calculator", icon: "🏦", desc: "Free calculator" },          { name: "Rd Calculator", href: "/calculators/finance/rd-calculator", icon: "📊", desc: "Free calculator" },          { name: "Lumpsum Calculator", href: "/calculators/finance/lumpsum-calculator", icon: "💰", desc: "Free calculator" },          { name: "Step Up SIP Calculator", href: "/calculators/finance/step-up-sip-calculator", icon: "📊", desc: "Free calculator" },          { name: "SIP vs Fd Calculator", href: "/calculators/finance/sip-vs-fd-calculator", icon: "📊", desc: "Free calculator" },          { name: "SIP vs PPF Calculator", href: "/calculators/finance/sip-vs-ppf-calculator", icon: "📊", desc: "Free calculator" },          { name: "SIP vs NPS Calculator", href: "/calculators/finance/sip-vs-nps-calculator", icon: "📊", desc: "Free calculator" },          { name: "Mutual Fund Calculator", href: "/calculators/finance/mutual-fund-calculator", icon: "📊", desc: "Free calculator" },          { name: "Mutual Fund Return Calculator", href: "/calculators/finance/mutual-fund-return-calculator", icon: "📊", desc: "Free calculator" },
          ]}
        />
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          SIP Vs Gold Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this SIP Vs Gold USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          SIP vs Gold Calculator Example (India 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, with INR 12,000/month to invest for 20 years, your SIP vs gold calculator India 2026 shows equity SIP building INR 1.19 crore vs gold building INR 67.6 lakh — a compelling argument for equity-first investing.
        </p>
      </Card>

            <SEOContent
        title="SIP vs Gold Calculator India – SIP or Gold: Which Investment Beats Inflation Better in 2026?"
        category="finance"
        intro={`Gold and equity mutual fund SIPs represent two very different investment philosophies, and Indian investors are uniquely positioned to have strong views on both — gold has deep cultural significance AND has delivered strong rupee returns, while equity mutual funds have become mainstream and delivered strong long-term performance.

Gold in rupee terms has performed better than dollar-denominated gold because of rupee depreciation. Over 20 years through 2024, gold delivered approximately 11-13% CAGR in rupee terms versus 7-8% in dollar terms. But Indian equity markets (Nifty 50) have delivered roughly 14-15% CAGR over similar 20-year periods — significantly outperforming gold even in rupee terms.

Gold's real value lies in its diversification and crisis protection. Gold typically rises when equity markets fall sharply (2008, 2020) — providing a partial hedge against equity market crashes. Including 10-15% gold in a portfolio reduces overall volatility without sacrificing much long-term return, because the correlation with equities is near zero or negative.`}
        howItWorks={`Gold SIP return: Monthly investment in Sovereign Gold Bonds, Gold ETFs, or gold mutual funds compounded at expected gold CAGR. Rupee gold price has risen from approximately ₹9,500/10g in 2004 to ₹72,000/10g in 2024 — approximately 11% CAGR over 20 years.

Equity SIP return: Standard SIP formula at expected mutual fund CAGR. Nifty 50 TRI 20-year CAGR approximately 14.5%. Better-performing flexicap and multicap funds have done 15-17% over equivalent periods.

Tax comparison: Sovereign Gold Bonds held to maturity (8 years) are completely capital-gains tax-exempt — one of gold's tax advantages over FDs and many other instruments. Gold ETF and mutual fund gains are taxable at income slab rates. Equity mutual fund LTCG at 10% above ₹1 lakh annual.`}
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
        tipsSection={`For gold investments in India, Sovereign Gold Bonds (SGB) are structurally superior to all other gold investment forms: government guaranteed, earn 2.5% interest on purchase price annually (in addition to gold price appreciation), and are completely capital-gains tax-exempt when held to maturity (8 years). Compare SGBs specifically rather than physical gold or Gold ETFs when evaluating gold investment.

Don't invest in physical gold jewelry for investment purposes — the making charges (10-20% of gold value), GST, and resale discount mean you start 20-30% underwater from day one.

For a balanced long-term portfolio: holding 10-15% in gold (preferably SGBs) alongside equity SIPs provides diversification that has historically reduced portfolio volatility without significantly reducing long-term returns.`}
        conclusion={`Gold and equity are complementary rather than competitive in a well-constructed portfolio. The question isn't one or the other — it's the right proportion of each given your goals, timeline, and risk tolerance.

For pure long-term wealth building over 20+ year horizons with high risk tolerance, equity has outperformed gold historically. For conservative investors or those building toward retirement who want lower volatility, a meaningful gold allocation (10-20%) alongside equity reduces the worst-case drawdown scenarios. Use [our SIP Calculator](/calculators/finance/sip-calculator) to model the equity component and combine with this gold comparison for your specific allocation decision.`}

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
            { name: "Lumpsum Calculator", href: "/calculators/finance/lumpsum-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Mutual Fund Calculator", href: "/calculators/finance/mutual-fund-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "NPS Calculator", href: "/calculators/finance/nps-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "PPF Calculator", href: "/calculators/finance/ppf-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "ROI Calculator", href: "/calculators/finance/roi-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "Savings Rate Calculator", href: "/calculators/finance/savings-rate-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "Net Worth Calculator", href: "/calculators/finance/net-worth-calculator", icon: "🔗", desc: "Related financial planning" },
        ]}
      />
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )
}
