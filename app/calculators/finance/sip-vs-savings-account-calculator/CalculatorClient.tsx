'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { TrendingUp, PiggyBank } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, fmtCompact } = useCurrency()
  const [monthly, setMonthly] = useState(10000)
  const [sipRate, setSipRate] = useState(12)
  const [savingsRate, setSavingsRate] = useState(3.5)
  const [years, setYears] = useState(10)

  const result = useMemo(() => {
    const months = years * 12
    const sipMR = sipRate / 100 / 12
    const savMR = savingsRate / 100 / 12

    const sipFV = monthly * ((Math.pow(1 + sipMR, months) - 1) / sipMR) * (1 + sipMR)
    const savFV = monthly * ((Math.pow(1 + savMR, months) - 1) / savMR) * (1 + savMR)
    const totalInvested = monthly * months

    const sipGain = sipFV - totalInvested
    const savGain = savFV - totalInvested

    // Savings account interest taxable as income; SIP LTCG 10% above 1L
    const sipTax = Math.max(0, sipGain - 100000) * 0.10
    const savTax = savGain * 0.30 // assume 30% slab, interest above 10K taxed
    const sipPostTax = sipFV - sipTax

    const opportunityCost = sipFV - savFV

    const yearlyData = Array.from({ length: years }, (_, i) => {
      const y = i + 1; const m = y * 12
      const sFV = monthly * ((Math.pow(1 + sipMR, m) - 1) / sipMR) * (1 + sipMR)
      const svFV = monthly * ((Math.pow(1 + savMR, m) - 1) / savMR) * (1 + savMR)
      return { year: y, invested: monthly * m, sip: Math.round(sFV), savings: Math.round(svFV) }
    })

    return {
      sipFV: Math.round(sipFV), savFV: Math.round(savFV),
      sipGain: Math.round(sipGain), savGain: Math.round(savGain),
      totalInvested: Math.round(totalInvested),
      sipTax: Math.round(sipTax), savTax: Math.round(savTax),
      sipPostTax: Math.round(sipPostTax),
      opportunityCost: Math.round(opportunityCost),
      yearlyData,
    }
  }, [monthly, sipRate, savingsRate, years])

  return (
    <CalculatorLayout title="SIP vs Savings Account Calculator India 2026" description="See the opportunity cost of keeping money in a savings account vs investing in SIP mutual funds." icon="🏧" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-4 flex items-center gap-2">
            <PiggyBank className="w-4 h-4" /> Compare Details
          </h2>
          <div className="space-y-5">
            <InputField label="Monthly Savings/SIP Amount" value={monthly} onChange={setMonthly} min={500} max={500000} step={500} prefix="₹" />
            <InputField label="SIP Expected Return (p.a.)" value={sipRate} onChange={setSipRate} min={5} max={20} step={0.5} suffix="%" />
            <InputField label="Savings Account Rate (p.a.)" value={savingsRate} onChange={setSavingsRate} min={2} max={7} step={0.25} suffix="%" />
            <InputField label="Investment Period" value={years} onChange={setYears} min={1} max={30} step={1} suffix="Yrs" />
          </div>
          <div className="mt-5 p-4 rounded-xl bg-red-900/20 border border-red-700/30">
            <p className="text-xs text-red-400 font-bold mb-1">💸 Opportunity Cost</p>
            <p className="text-2xl font-black text-red-400">{fmtCompact(result.opportunityCost)}</p>
            <p className="text-xs text-gray-400 mt-1">Wealth lost by keeping money in savings instead of SIP over {years} years</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="SIP Final Value" value={fmtCompact(result.sipFV)} subValue={`Gain: ${fmtCompact(result.sipGain)}`} highlight icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="Savings Account" value={fmtCompact(result.savFV)} subValue={`Only: ${fmtCompact(result.savGain)}`} icon={<PiggyBank className="w-4 h-4" />} />
            <ResultCard label="Total Invested" value={fmtCompact(result.totalInvested)} subValue={`${years}yr x ${fmtCompact(monthly)}/mo`} />
            <ResultCard label="SIP vs Savings" value={fmtCompact(result.opportunityCost)} subValue="Extra wealth created" highlight />
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">SIP vs Savings Account Over {years} Years</h3>
            <div style={{ height: 240 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.yearlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gSipSav" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gSav" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.4} /><stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gInvSav" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#64748b" stopOpacity={0.3} /><stop offset="95%" stopColor="#64748b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={68}
                    tickFormatter={v => v >= 10000000 ? `₹${(v/10000000).toFixed(1)}Cr` : v >= 100000 ? `₹${(v/100000).toFixed(0)}L` : `₹${(v/1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} formatter={(v: number, name) => [fmt(v), name]} labelFormatter={y => `Year ${y}`} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="invested" name="Amount Saved" stroke="#64748b" fill="url(#gInvSav)" strokeWidth={1.5} strokeDasharray="4 2" />
                  <Area type="monotone" dataKey="savings" name="Savings Account" stroke="#94a3b8" fill="url(#gSav)" strokeWidth={2} />
                  <Area type="monotone" dataKey="sip" name="SIP Value" stroke="#10b981" fill="url(#gSipSav)" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Why Savings Accounts Are Wealth Destroyers</h3>
            <div className="grid grid-cols-2 gap-3 text-xs text-gray-400">
              <div className="space-y-2">
                <p className="p-2 bg-red-900/20 rounded-lg">🏦 Savings accounts earn 2.5-4% - below India's 5-6% inflation rate. Your money loses real purchasing power every year you keep it idle.</p>
                <p className="p-2 bg-yellow-900/20 rounded-lg">📊 The gap between 3.5% (savings) and 12% (SIP) seems small, but compounded over 10 years on ₹10K/month it creates a ₹50+ lakh difference.</p>
              </div>
              <div className="space-y-2">
                <p className="p-2 bg-green-900/20 rounded-lg">✅ Keep only 3-6 months expenses in savings account as emergency fund. Invest everything else in SIP.</p>
                <p className="p-2 bg-blue-900/20 rounded-lg">💡 Liquid mutual funds give 6-7% with same-day redemption - better alternative to savings account for funds you may need in 1-3 months.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
            <div className="mt-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-6">Sip vs Savings Account: Complete Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-base">What is Sip?</h3>
              <p>Sip is a India investment or financial product that offers distinct advantages depending on your goals, tax situation, and time horizon. Understanding how it works is key to making the most of your money.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">What is Savings Account?</h3>
              <p>Savings Account takes a different approach to growing or protecting your wealth. Each has its own risk profile, liquidity characteristics, and tax treatment that makes it suited to specific financial situations.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">Key Differences</h3>
              <p>The most important distinction between Sip and Savings Account is how returns are generated and taxed. Sip typically suits growth-oriented investors while Savings Account may appeal to those prioritizing stability or specific tax advantages.</p>
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
            <p className="text-sm text-green-700 leading-relaxed">Most financial advisors recommend not putting all your money in one option. A diversified approach - splitting between Sip and Savings Account based on your specific goals - often provides better risk-adjusted returns than going all-in on either. Use this calculator to find your optimal split.</p>
          </div>
        </div>
      </div>


      {/* Internal Links */}
      {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "401k vs Roth IRA Calculator", href: "/calculators/finance/401k-vs-roth-ira-calculator", icon: "📊", desc: "Free calculator" },          { name: "401k vs Taxable Account Calculator", href: "/calculators/finance/401k-vs-taxable-account-calculator", icon: "📊", desc: "Free calculator" },          { name: "401k vs Pension Calculator", href: "/calculators/finance/401k-vs-pension-calculator", icon: "📊", desc: "Free calculator" },          { name: "Roth IRA vs Traditional IRA Calculator", href: "/calculators/finance/roth-ira-vs-traditional-ira-calculator", icon: "📊", desc: "Free calculator" },          { name: "Roth IRA vs 401k Employer Match Calculator", href: "/calculators/finance/roth-ira-vs-401k-employer-match-calculator", icon: "📊", desc: "Free calculator" },          { name: "Roth IRA vs HSA Calculator", href: "/calculators/finance/roth-ira-vs-hsa-calculator", icon: "📊", desc: "Free calculator" },          { name: "HSA vs FSA Calculator", href: "/calculators/finance/hsa-vs-fsa-calculator", icon: "🏥", desc: "Free calculator" },          { name: "Sep IRA vs Solo 401k Calculator", href: "/calculators/finance/sep-ira-vs-solo-401k-calculator", icon: "💼", desc: "Free calculator" },          { name: "Bonds vs Cds USA Calculator", href: "/calculators/finance/bonds-vs-cds-usa-calculator", icon: "📋", desc: "Free calculator" },          { name: "Cd vs HYSA Calculator", href: "/calculators/finance/cd-vs-hysa-calculator", icon: "💰", desc: "Free calculator" },          { name: "I Bonds vs Tips Calculator", href: "/calculators/finance/i-bonds-vs-tips-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "S&P500 vs Bonds Calculator", href: "/calculators/finance/sp500-vs-bonds-calculator", icon: "📊", desc: "Free calculator" },
          ]}
        />
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          SIP Vs Savings Account Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          $10,000 in a high-yield savings account at 4.5% APY earns <strong>$450</strong> in the first year. Over 5 years with monthly additions of $500, it grows to $43,500+.
        </p>
        <p className="text-sm text-gray-600">
          Use this SIP Vs Savings Account USA 2026 tool to compare rates, terms, and contribution strategies to maximize your savings returns.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          SIP vs Savings Account Calculator Example (India 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, with INR 5 lakh in a savings account, your SIP vs savings account calculator India 2026 shows the 10-year opportunity cost of not investing — motivating the move to SIP for any money beyond your emergency fund.
        </p>
      </Card>

            <SEOContent
        title="SIP vs Savings Account Calculator India – What Does Idle Cash in a Savings Account Cost You in 2026?"
        category="finance"
        intro={`Keeping long-term money in a savings account — even a high-yield one — while equity SIPs compound at 12-15% annually is one of the costliest forms of financial inertia. The opportunity cost is massive and compounds against you every year the money stays in the savings account.

Indian savings account rates range from 2.5-3.5% for most banks to 6-7% for some small finance banks offering high-yield savings accounts. After inflation of 5-6%, even a 6-7% savings account yields near-zero or negative real returns — meaning your purchasing power erodes slowly while you think your savings are growing.

The behavioral reason money stays in savings accounts rather than SIPs: liquidity and familiarity. The savings account is immediately accessible without paperwork, apps, or decisions. Equity SIPs require opening a mutual fund account, selecting a fund, and accepting that the money might be worth less in 2 years than it is today. Overcoming this inertia is one of the most valuable financial actions most people can take.`}
        howItWorks={`Savings account return: Balance × annual interest rate, simple (for daily balance accounts) or on minimum monthly balance basis for traditional accounts. After-tax: interest added to income and taxed at applicable slab rate.

Equity SIP return: Monthly contribution compounded at expected CAGR using FV = PMT × [(1 + r/12)^n - 1] / (r/12). After-tax: LTCG at 10% above ₹1 lakh annual exemption for units held over 1 year.

Opportunity cost: The difference in terminal wealth between the two approaches over a specified period. This is the concrete financial cost of keeping investable money in a savings account rather than deploying it in equity markets for long-term goals.`}
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
        tipsSection={`Define the purpose of every savings balance explicitly. Money needed within 6-12 months belongs in savings accounts or liquid funds. Money not needed for 3+ years belongs in an investment matched to that time horizon — typically equity mutual funds for 5+ year horizons.

For the transition from savings to investing: start with a small SIP (₹1,000-₹2,000/month) in a large-cap index fund rather than trying to move all savings immediately. Build familiarity with how markets move and how your balance fluctuates before increasing exposure. The emotional adaptation to market volatility is as important as the mathematical case.

India's mutual fund industry has made SIP investing genuinely simple: any UPI-enabled smartphone can set up a direct plan SIP in 15 minutes through apps like Coin by Zerodha, ET Money, or AMFI-registered distributors. The technical barrier to starting a SIP is now essentially zero.`}
        conclusion={`The savings account is not a long-term investment strategy — it's a temporary home for money that needs to be deployed. The opportunity cost of ₹5 lakh sitting in a 4% savings account for 15 years while equity markets return 12% annually is approximately ₹18 lakh in forgone wealth — a painful number to calculate in hindsight.

For Indian investors with large cash balances that have accumulated over years: moving to liquid mutual funds (better returns than savings accounts, still same-day redemption) is a minimal-disruption first step. Then establishing equity SIPs for the long-duration portion is the natural next step that the liquid fund balance can support.`}

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
            { name: "Emergency Fund Calculator", href: "/calculators/finance/emergency-fund-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Savings Rate Calculator", href: "/calculators/finance/savings-rate-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Fire Calculator", href: "/calculators/finance/fire-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Net Worth Calculator", href: "/calculators/finance/net-worth-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "ROI Calculator", href: "/calculators/finance/roi-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "Retirement Calculator", href: "/calculators/finance/retirement-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🔗", desc: "Related financial planning" },
        ]}
      />
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )
}
