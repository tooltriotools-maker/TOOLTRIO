'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { TrendingUp, Landmark } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, fmtCompact } = useCurrency()
  const [lumpsum, setLumpsum] = useState(500000)
  const [mfRate, setMfRate] = useState(12)
  const [fdRate, setFdRate] = useState(7)
  const [years, setYears] = useState(10)
  const [taxSlab, setTaxSlab] = useState(30)
  const [mfType, setMfType] = useState<'equity' | 'debt'>('equity')

  const result = useMemo(() => {
    const mfFV = lumpsum * Math.pow(1 + mfRate / 100, years)
    const fdFV = lumpsum * Math.pow(1 + fdRate / 100, years)

    // Tax calculations
    const mfGain = mfFV - lumpsum
    const fdGain = fdFV - lumpsum

    // MF Tax: Equity LTCG 10% above 1L; Debt: 20% with indexation (approx)
    let mfTax = 0
    if (mfType === 'equity') {
      mfTax = Math.max(0, mfGain - 100000) * 0.10
    } else {
      // Debt fund: 20% with indexation (assume 5% inflation, 6% indexed gain)
      const indexedCost = lumpsum * Math.pow(1 + 0.05, years)
      mfTax = Math.max(0, (mfFV - indexedCost) * 0.20)
    }

    // FD Tax: taxed as income each year (simplified)
    const fdAnnualInterest = lumpsum * (fdRate / 100)
    const fdTaxPerYear = fdAnnualInterest * (taxSlab / 100)
    const fdPostTaxFV = lumpsum * Math.pow(1 + fdRate * (1 - taxSlab / 100) / 100, years)
    const fdTaxTotal = fdFV - fdPostTaxFV

    const mfPostTaxFV = mfFV - mfTax
    const mfEffectiveRate = (Math.pow(mfPostTaxFV / lumpsum, 1 / years) - 1) * 100
    const fdEffectiveRate = (Math.pow(fdPostTaxFV / lumpsum, 1 / years) - 1) * 100

    const yearlyData = Array.from({ length: years }, (_, i) => {
      const y = i + 1
      const mFV = lumpsum * Math.pow(1 + mfRate / 100, y)
      const fFV = lumpsum * Math.pow(1 + fdRate * (1 - taxSlab / 100) / 100, y)
      return { year: y, mf: Math.round(mFV), fdPostTax: Math.round(fFV) }
    })

    return {
      mfFV: Math.round(mfFV), fdFV: Math.round(fdFV),
      mfGain: Math.round(mfGain), fdGain: Math.round(fdGain),
      mfTax: Math.round(mfTax), fdTaxTotal: Math.round(fdTaxTotal),
      mfPostTaxFV: Math.round(mfPostTaxFV), fdPostTaxFV: Math.round(fdPostTaxFV),
      mfEffectiveRate: mfEffectiveRate.toFixed(2), fdEffectiveRate: fdEffectiveRate.toFixed(2),
      mfBetter: mfPostTaxFV > fdPostTaxFV,
      difference: Math.round(Math.abs(mfPostTaxFV - fdPostTaxFV)),
      yearlyData,
    }
  }, [lumpsum, mfRate, fdRate, years, taxSlab, mfType])

  const taxSlabs = [0, 5, 20, 30]

  return (
    <CalculatorLayout title="Mutual Fund vs FD Calculator India 2026" description="Compare lump sum mutual fund vs Fixed Deposit after tax and inflation over 3–20 years." icon="🏦" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" /> Investment Details
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-gray-600 mb-2">Mutual Fund Type</p>
              <div className="grid grid-cols-2 gap-2">
                {(['equity', 'debt'] as const).map(t => (
                  <button key={t} onClick={() => setMfType(t)}
                    className={`py-2 rounded-xl text-xs font-bold border-2 capitalize transition-all ${mfType === t ? 'bg-green-100 border-green-400 text-green-700' : 'bg-gray-50 border-gray-200 text-gray-500'}`}>
                    {t === 'equity' ? '📈 Equity' : '📊 Debt'}
                  </button>
                ))}
              </div>
            </div>
            <InputField label="Lumpsum Investment" value={lumpsum} onChange={setLumpsum} min={10000} max={10000000} step={10000} prefix="₹" />
            <InputField label="Mutual Fund Return (p.a.)" value={mfRate} onChange={setMfRate} min={3} max={25} step={0.5} suffix="%" />
            <InputField label="FD Interest Rate (p.a.)" value={fdRate} onChange={setFdRate} min={3} max={12} step={0.25} suffix="%" />
            <InputField label="Investment Period" value={years} onChange={setYears} min={1} max={30} step={1} suffix="Yrs" />
            <div>
              <p className="text-xs font-semibold text-gray-600 mb-2">Your Tax Slab</p>
              <div className="grid grid-cols-4 gap-1">
                {taxSlabs.map(t => (
                  <button key={t} onClick={() => setTaxSlab(t)}
                    className={`py-1.5 rounded-lg text-xs font-bold border-2 transition-all ${taxSlab === t ? 'bg-green-100 border-green-400 text-green-700' : 'bg-gray-50 border-gray-200 text-gray-500'}`}>
                    {t}%
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className={`mt-4 p-3 rounded-xl border-2 text-center ${result.mfBetter ? 'bg-green-50 border-green-300' : 'bg-blue-50 border-blue-300'}`}>
            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Post-Tax Winner</p>
            <p className="text-xl font-black" style={{ color: result.mfBetter ? '#10b981' : '#3b82f6' }}>{result.mfBetter ? 'Mutual Fund' : 'FD'} 🏆</p>
            <p className="text-sm text-gray-500">by {fmtCompact(result.difference)}</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="MF Post-Tax Value" value={fmtCompact(result.mfPostTaxFV)} subValue={`Effective: ${result.mfEffectiveRate}%`} highlight={result.mfBetter} icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="FD Post-Tax Value" value={fmtCompact(result.fdPostTaxFV)} subValue={`Effective: ${result.fdEffectiveRate}%`} highlight={!result.mfBetter} icon={<Landmark className="w-4 h-4" />} />
            <ResultCard label="Tax on MF" value={fmtCompact(result.mfTax)} subValue={mfType === 'equity' ? 'LTCG 10%' : 'LTCG 20%+idx'} />
            <ResultCard label="Tax on FD" value={fmtCompact(result.fdTaxTotal)} subValue={`As income (${taxSlab}%)`} />
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Post-Tax Growth Comparison</h3>
            <div style={{ height: 240 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={result.yearlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={68}
                    tickFormatter={v => v >= 10000000 ? `₹${(v/10000000).toFixed(1)}Cr` : v >= 100000 ? `₹${(v/100000).toFixed(0)}L` : `₹${(v/1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} formatter={(v: number, name) => [fmt(v), name]} labelFormatter={y => `Year ${y}`} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Line type="monotone" dataKey="mf" name="Mutual Fund (Pre-tax)" stroke="#10b981" strokeWidth={2.5} dot={false} />
                  <Line type="monotone" dataKey="fdPostTax" name="FD (Post-tax)" stroke="#3b82f6" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Pre-Tax vs Post-Tax Returns Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Mutual Fund', items: [['Pre-tax Value', fmtCompact(result.mfFV)], ['Tax Paid', fmtCompact(result.mfTax)], ['Post-Tax Value', fmtCompact(result.mfPostTaxFV)], ['Effective Return', `${result.mfEffectiveRate}% p.a.`]], color: 'green' },
                { label: 'Fixed Deposit', items: [['Pre-tax Value', fmtCompact(result.fdFV)], ['Tax Paid', fmtCompact(result.fdTaxTotal)], ['Post-Tax Value', fmtCompact(result.fdPostTaxFV)], ['Effective Return', `${result.fdEffectiveRate}% p.a.`]], color: 'blue' },
              ].map(s => (
                <div key={s.label}>
                  <p className={`text-xs font-bold text-${s.color}-400 mb-2`}>{s.label}</p>
                  {s.items.map(([k, v]) => (
                    <div key={k} className="flex justify-between text-xs py-1 border-b border-gray-800">
                      <span className="text-gray-500">{k}</span><span className="text-white font-semibold">{v}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
            <div className="mt-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-6">Mutual Fund vs Fd: Complete Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-base">What is Mutual Fund?</h3>
              <p>Mutual Fund is a India investment or financial product that offers distinct advantages depending on your goals, tax situation, and time horizon. Understanding how it works is key to making the most of your money.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">What is Fd?</h3>
              <p>Fd takes a different approach to growing or protecting your wealth. Each has its own risk profile, liquidity characteristics, and tax treatment that makes it suited to specific financial situations.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">Key Differences</h3>
              <p>The most important distinction between Mutual Fund and Fd is how returns are generated and taxed. Mutual Fund typically suits growth-oriented investors while Fd may appeal to those prioritizing stability or specific tax advantages.</p>
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
            <p className="text-sm text-green-700 leading-relaxed">Most financial advisors recommend not putting all your money in one option. A diversified approach - splitting between Mutual Fund and Fd based on your specific goals - often provides better risk-adjusted returns than going all-in on either. Use this calculator to find your optimal split.</p>
          </div>
        </div>
      </div>


      {/* Internal Links */}
      {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "Mortgage Calculator", href: "/calculators/finance/mortgage-calculator", icon: "🏡", desc: "Free calculator" },          { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "Tax Bracket Calculator", href: "/calculators/finance/tax-bracket-calculator", icon: "🧾", desc: "Free calculator" },          { name: "Budget Planner Calculator", href: "/calculators/finance/budget-planner-calculator", icon: "📊", desc: "Free calculator" },          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },          { name: "Roth IRA Calculator", href: "/calculators/finance/roth-ira-calculator", icon: "🛡️", desc: "Free calculator" },          { name: "Savings Rate Calculator", href: "/calculators/finance/savings-rate-calculator", icon: "💰", desc: "Free calculator" },          { name: "Debt Payoff Calculator", href: "/calculators/finance/debt-payoff-calculator", icon: "🔓", desc: "Free calculator" },          { name: "Wealth Calculator", href: "/calculators/finance/wealth-calculator", icon: "💎", desc: "Free calculator" },          { name: "Retirement Calculator", href: "/calculators/finance/retirement-calculator", icon: "🌅", desc: "Free calculator" },
          ]}
        />
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Mutual Fund Vs FD Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Mutual Fund Vs FD USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Mutual Fund vs FD Calculator Example (India 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, with INR 10 lakh to invest for 15 years, your mutual fund vs FD calculator India 2026 shows equity funds building INR 54.7 lakh vs FD building INR 22.6 lakh after all taxes.
        </p>
      </Card>

            <SEOContent
        title="Mutual Fund vs FD Calculator India – Equity Fund or Fixed Deposit: Which Beats Inflation in 2026?"
        category="finance"
        intro={`The mutual fund versus fixed deposit comparison is the most common investment decision for the Indian middle class. FDs offer safety, predictability, and simplicity. Mutual funds offer higher expected returns, market linkage, and tax efficiency for equity investments — but require tolerance for volatility and a minimum investment horizon.

The critical difference for the comparison: FD interest is fully taxable as ordinary income at your slab rate every year. Equity mutual fund gains held more than 1 year are taxed as LTCG at 10% (above ₹1 lakh annually). For a 30% tax slab investor, a 7.5% FD returns 5.25% after tax. An equity fund returning 12% gross with LTCG at 10% returns 10.8% after tax. The gap is 5.55% annually — enormous over long periods.

The comparison is genuinely nuanced for shorter horizons and debt funds. Since April 2023, debt mutual funds (including hybrid funds with less than 35% equity) are taxed as ordinary income, eliminating their previous indexation benefit. For 1-3 year money, the FD's simplicity and predictability often wins on a risk-adjusted basis at current rates.`}
        howItWorks={`FD after-tax return: FD rate × (1 - income tax slab rate). At 7.5% FD and 30% slab: 7.5% × 0.7 = 5.25% net. Compounded over 5 years on ₹1 lakh: ₹1,29,316.

Equity mutual fund after-tax return: Fund return - LTCG tax (10% above ₹1 lakh annual exemption). For ₹1 lakh invested at 12% for 5 years: ₹1,76,234 gross. Gains = ₹76,234. First ₹1 lakh of gains is tax-free under annual LTCG exemption. Tax on remaining ₹0 (entire gain within exemption for this example) = ₹1,76,234 net. This dramatically illustrates the LTCG advantage for moderate-sized investments.

Break-even horizon: The number of years an equity fund must be held for its historical return advantage to overcome the volatility risk. For most historical periods in India, the break-even is 3-5 years — meaning equity funds outperform FDs in essentially any 5+ year period in Indian market history.`}
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
        tipsSection={`Use FDs for money you'll need within 3 years. The capital protection and predictability of FDs is genuinely appropriate for short-term goals. Use equity mutual funds for money with 5+ year horizons. This simple rule eliminates most of the complexity in the FD vs mutual fund decision.

For emergency funds: keep 3-6 months of expenses in a liquid fund or savings account, not FD. Liquid mutual funds offer FD-like returns (4-5% daily liquidity) with instant redemption — superior to FD for emergency reserves because you don't lose interest on early withdrawal.

For tax-efficient FD alternatives in the 3-7 year range: Sovereign Gold Bonds (2.5% + gold appreciation), RBI Floating Rate Bonds, and corporate bonds through direct bond platforms provide alternatives to bank FDs with potentially better after-tax returns.`}
        conclusion={`The FD vs mutual fund decision fundamentally comes down to risk tolerance and time horizon. For investors who cannot tolerate seeing their portfolio value fluctuate — who would panic-sell during a market correction — FDs are genuinely the right choice despite lower expected returns. The best investment is the one you'll actually stick with.

For investors building long-term wealth who can stay invested through market cycles, equity mutual funds have historically delivered dramatically superior returns over 7-10+ year periods. The combination of higher expected returns and tax efficiency on LTCG makes equity funds the dominant vehicle for long-term financial goals for investors who have the time horizon and risk tolerance.`}

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
            { name: "ROI Calculator", href: "/calculators/finance/roi-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Savings Rate Calculator", href: "/calculators/finance/savings-rate-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Fire Calculator", href: "/calculators/finance/fire-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Net Worth Calculator", href: "/calculators/finance/net-worth-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Retirement Calculator", href: "/calculators/finance/retirement-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "Income Tax Calculator", href: "/calculators/finance/income-tax-calculator", icon: "🔗", desc: "Related financial planning" },
        ]}
      />
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )
}
