'use client'
import { useState, useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { calculateLumpSumVsSIP } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt } = useCurrency()
  const [totalAmount, setTotalAmount] = useState(120000)
  const [annualReturn, setAnnualReturn] = useState(12)
  const [years, setYears] = useState(10)

  const result = useMemo(() => calculateLumpSumVsSIP(totalAmount, annualReturn, years), [totalAmount, annualReturn, years])

  const winner = result.lumpSumBetter ? 'Lump Sum' : 'SIP'
  const winnerFV = result.lumpSumBetter ? result.lumpSumFV : result.sipFV
  const loserFV = result.lumpSumBetter ? result.sipFV : result.lumpSumFV

  return (
    <CalculatorLayout title="Lump Sum vs SIP Calculator India 2026" description="Compare investing all at once vs systematic investment plan monthly contributions." icon="⚖️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h2 className="text-lg font-bold text-gray-900 mb-5">Investment Details</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Total Investment Amount</label>
              <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input type="number" value={totalAmount} onChange={e => setTotalAmount(Number(e.target.value))} className="w-full pl-7 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500" /></div>
              <p className="text-xs text-gray-400 mt-1">SIP equivalent: {fmt(result.monthlyAmount)}/month for {years} years</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Expected Annual Return: <span className="text-green-600">{annualReturn}%</span></label>
              <input type="range" min="1" max="25" step="0.5" value={annualReturn} onChange={e => setAnnualReturn(Number(e.target.value))} className="w-full accent-green-600" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Investment Period: <span className="text-green-600">{years} years</span></label>
              <input type="range" min="1" max="30" value={years} onChange={e => setYears(Number(e.target.value))} className="w-full accent-green-600" />
            </div>
          </div>

          <div className="mt-5 space-y-2 text-sm">
            <div className="p-3 bg-green-50 rounded-xl border border-green-200">
              <p className="font-bold text-green-800">Lump Sum Strategy</p>
              <p className="text-gray-600">Invest {fmt(totalAmount)} on Day 1</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
              <p className="font-bold text-blue-800">SIP / DCA Strategy</p>
              <p className="text-gray-600">Invest {fmt(result.monthlyAmount)}/month for {years} years</p>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          {/* Verdict */}
          <div className={`rounded-2xl border p-5 ${result.lumpSumBetter ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'}`}>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="text-sm text-gray-500">Winner after {years} years</p>
                <p className={`text-3xl font-black ${result.lumpSumBetter ? 'text-green-700' : 'text-blue-700'}`}>🏆 {winner}</p>
                <p className="text-sm text-gray-500 mt-1">by {fmt(result.difference)} more</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Difference</p>
                <p className="text-2xl font-black text-gray-900">{fmt(result.difference)}</p>
                <p className="text-xs text-gray-500">({((result.difference / loserFV) * 100).toFixed(1)}% more than loser)</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className={`rounded-2xl border p-4 ${result.lumpSumBetter ? 'bg-green-50 border-green-300' : 'bg-white border-gray-200'}`}>
              <p className="text-xs font-bold text-green-600 mb-1">💰 LUMP SUM</p>
              <p className="text-2xl font-black text-gray-900">{fmt(result.lumpSumFV)}</p>
              <p className="text-sm text-gray-500">Gain: {fmt(result.lumpSumGain)}</p>
            </div>
            <div className={`rounded-2xl border p-4 ${!result.lumpSumBetter ? 'bg-blue-50 border-blue-300' : 'bg-white border-gray-200'}`}>
              <p className="text-xs font-bold text-blue-600 mb-1">📅 SIP / DCA</p>
              <p className="text-2xl font-black text-gray-900">{fmt(result.sipFV)}</p>
              <p className="text-sm text-gray-500">Gain: {fmt(result.sipGain)}</p>
            </div>
          </div>

          <Card>
            <h3 className="font-bold text-gray-900 mb-4">Growth Comparison Over {years} Years</h3>
            <ResponsiveContainer width="100%" height={230}>
              <LineChart data={result.yearData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" tickFormatter={v => `Y${v}`} tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, '']} />
                <Legend />
                <Line type="monotone" dataKey="lumpSum" stroke="#16a34a" strokeWidth={2.5} name="Lump Sum" dot={false} />
                <Line type="monotone" dataKey="sip" stroke="#3b82f6" strokeWidth={2.5} name="SIP / DCA" dot={false} strokeDasharray="6 2" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
            <div className="mt-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-6">Lumpsum vs Sip: Complete Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-base">What is Lumpsum?</h3>
              <p>Lumpsum is a India investment or financial product that offers distinct advantages depending on your goals, tax situation, and time horizon. Understanding how it works is key to making the most of your money.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">What is Sip?</h3>
              <p>Sip takes a different approach to growing or protecting your wealth. Each has its own risk profile, liquidity characteristics, and tax treatment that makes it suited to specific financial situations.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">Key Differences</h3>
              <p>The most important distinction between Lumpsum and Sip is how returns are generated and taxed. Lumpsum typically suits growth-oriented investors while Sip may appeal to those prioritizing stability or specific tax advantages.</p>
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
            <p className="text-sm text-green-700 leading-relaxed">Most financial advisors recommend not putting all your money in one option. A diversified approach - splitting between Lumpsum and Sip based on your specific goals - often provides better risk-adjusted returns than going all-in on either. Use this calculator to find your optimal split.</p>
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
          Lumpsum Vs SIP Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Lumpsum Vs SIP USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Lump Sum vs SIP Calculator Example (India 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, with INR 5 lakh available today vs INR 8,333/month SIP for 5 years, your lump sum vs SIP calculator India 2026 shows which strategy builds more wealth based on current market conditions.
        </p>
      </Card>

            <SEOContent
        title="Lump Sum vs SIP Calculator India – One-Time Investment or Monthly SIP: Which Wins in 2026?"
        category="finance"
        intro={`The lump sum versus SIP (Systematic Investment Plan) debate in the Indian context mirrors the global DCA vs lump sum question, but with specific nuances relevant to Indian equity markets and investor behavior. The mathematical answer: lump sum investment typically outperforms SIP when markets trend upward, which they do most of the time. But SIP reduces timing risk and suits the behavioral reality of most investors.

Nifty 50 data confirms the global pattern: investors who started a lump sum investment in 2013 and held through 2023 earned approximately 14% CAGR. Investors who used a monthly SIP over the same period earned approximately 12-13% CAGR — slightly less, but more predictably. The SIP investor who invested during the COVID crash months automatically bought more units at low prices, smoothing volatility.

For salaried investors who receive monthly income, SIP is the natural structure — you invest from regular income as it arrives. The lump sum decision arises when you have a one-time large sum: a bonus, FD maturity, property sale proceeds, or inheritance. For these situations, deploying all at once into an index fund has historically been better than spreading over 12 months.`}
        howItWorks={`Lump sum projection: P × (1 + r)^n where r is monthly or annual return rate. At 12% annual return, ₹10 lakh invested today for 10 years = ₹10 × (1.12)^10 = ₹31.06 lakh.

SIP projection: PMT × [(1 + r/12)^n - 1] / (r/12) where PMT is monthly contribution and n is months. At 12% annual return, ₹10,000/month for 120 months = ₹23.23 lakh. The SIP equivalent for ₹10 lakh (₹83,333/month over 12 months) invested in same period grows to approximately ₹28 lakh — less than the lump sum's ₹31 lakh in a rising market, because the last installments have less time to compound.

Break-even market scenario: SIP outperforms lump sum only if markets fall significantly during the SIP period. A lump sum invested on a day when the market subsequently falls 20% and recovers over the following year still typically matches or beats a 12-month SIP because the lump sum participates in the recovery from the start.`}
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
        tipsSection={`For lump sum deployment in Indian markets, Nifty PE ratio provides a valuation context: when Nifty is trading above 25x PE, markets are historically expensive; below 20x, relatively cheap. A lump sum investor comfortable with market valuations can invest immediately; one concerned about valuation can use a 3-6 month SIP for the large amount.

For regular income-based SIP, increase your SIP amount annually by 10-15% to capture salary growth (step-up SIP). A ₹10,000/month SIP with 10% annual increase grows significantly more over 20 years than a flat SIP at the same initial amount.

For tax efficiency in Indian mutual funds: equity funds held more than 1 year qualify for long-term capital gains at 10% (above ₹1 lakh) vs short-term at 15%. Structure lump sum redemptions to maximize the LTCG benefit.`}
        conclusion={`The most important variable in lump sum vs SIP performance isn't the strategy — it's whether you stay invested. An SIP investor who pauses during market crashes typically underperforms a lump sum investor who just holds through the same period. The discipline of automatic regular investment has real behavioral value that partly explains why SIP works well in practice despite sometimes underperforming lump sum mathematically.

For large lump sums in Indian markets: consider direct plan mutual funds (lower expense ratio vs regular plans) and index funds tracking Nifty 50, Nifty 500, or MSCI India for the core allocation. Use [our Step-Up SIP Calculator](/calculators/finance/step-up-sip-calculator) to model the long-term effect of increasing your SIP amount annually.`}

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
