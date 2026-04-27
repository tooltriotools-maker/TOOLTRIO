'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts'
import { calculateStepUpSIP, calculateSIP } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { TrendingUp, DollarSign, ArrowUpRight, Percent } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, currency } = useCurrency()
  const [initialSIP, setInitialSIP] = useState(5000)
  const [stepUp, setStepUp] = useState(10)
  const [returnRate, setReturnRate] = useState(12)
  const [years, setYears] = useState(20)

  const result = useMemo(() => calculateStepUpSIP(initialSIP, stepUp, returnRate, years), [initialSIP, stepUp, returnRate, years])
  const r = result as any

  // Compare with flat SIP
  const flatSIP = useMemo(() => calculateSIP(initialSIP, returnRate, years), [initialSIP, returnRate, years])
  const f = flatSIP as any

  const extraWealth = (r.maturityAmount || 0) - (f.totalValue || 0)

  // Year-wise comparison
  const comparison = r.yearlyData?.map((row: any, i: number) => {
    const flatY = f.yearlyData?.[i] || {}
    return { year: row.year, stepUp: row.total, flat: flatY.total || 0 }
  }) || []

  return (
    <CalculatorLayout title="Step-Up SIP Calculator India 2026" description="Calculate how increasing your SIP by 10–15% annually accelerates wealth vs a flat SIP." icon="🚀" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Step-Up SIP Details</h2>
          <div className="space-y-5">
            <InputField label="Initial Monthly SIP" value={initialSIP} onChange={setInitialSIP} min={500} max={500000} step={500} prefix={currency.symbol} />
            <InputField label="Annual Step-Up %" value={stepUp} onChange={setStepUp} min={1} max={50} step={1} suffix="%" />
            <InputField label="Expected Annual Return" value={returnRate} onChange={setReturnRate} min={1} max={30} step={0.5} suffix="%" />
            <InputField label="Investment Period" value={years} onChange={setYears} min={1} max={40} step={1} suffix="Yr" />
          </div>
          <div className="mt-5 p-4 rounded-xl bg-green-50 border border-green-200">
            <p className="text-xs text-green-700 font-bold mb-1">🚀 Extra Wealth vs Flat SIP</p>
            <p className="text-2xl font-black text-green-700">{fmt(extraWealth, true)}</p>
            <p className="text-xs text-green-600 mt-0.5">by stepping up {stepUp}% annually</p>
          </div>
          <div className="mt-2 p-3 rounded-xl bg-gray-50 border border-gray-100 text-sm">
            <p className="text-gray-500">Year {years} SIP amount:</p>
            <p className="font-black text-gray-900">{fmt(Math.round(initialSIP * Math.pow(1 + stepUp / 100, years - 1)))}/mo</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Step-Up Corpus" value={fmt(r.maturityAmount || 0)} highlight icon={<DollarSign className="w-4 h-4" />} />
            <ResultCard label="Flat SIP Corpus" value={fmt(f.totalValue || 0)} icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="Extra Wealth" value={fmt(extraWealth)} icon={<ArrowUpRight className="w-4 h-4" />} />
            <ResultCard label="Total Invested" value={fmt(r.totalInvested || 0)} icon={<Percent className="w-4 h-4" />} />
          </div>

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-4">Step-Up SIP vs Flat SIP</h3>
            <div style={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={comparison} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="suG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#16a34a" stopOpacity={0.2} /><stop offset="95%" stopColor="#16a34a" stopOpacity={0} /></linearGradient>
                    <linearGradient id="fG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#93c5fd" stopOpacity={0.2} /><stop offset="95%" stopColor="#93c5fd" stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="year" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v, true)} width={70} />
                  <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number) => [fmt(v), '']} labelFormatter={y => `Year ${y}`} />
                  <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
                  <Area type="monotone" dataKey="stepUp" name="Step-Up SIP" stroke="#16a34a" fill="url(#suG)" strokeWidth={2.5} dot={false} />
                  <Area type="monotone" dataKey="flat" name="Flat SIP" stroke="#93c5fd" fill="url(#fG)" strokeWidth={1.5} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {r.yearlyData?.length > 0 && (
            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-3">Year-wise Step-Up Breakdown</h3>
              <div className="overflow-x-auto max-h-52 overflow-y-auto">
                <table className="calc-table">
                  <thead><tr><th>Year</th><th>Monthly SIP</th><th>Total Invested</th><th>Returns</th><th>Total Value</th></tr></thead>
                  <tbody>{r.yearlyData.map((row: any) => (
                    <tr key={row.year}>
                      <td className="text-gray-500">{row.year}</td>
                      <td>{fmt(Math.round(initialSIP * Math.pow(1 + stepUp / 100, row.year - 1)))}</td>
                      <td>{fmt(row.invested)}</td>
                      <td className="text-green-600">{fmt(row.returns)}</td>
                      <td className="font-bold text-gray-900">{fmt(row.total)}</td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </Card>
          )}
        </div>
      </div>
      <div className="mt-8">
      {/* 600-word SEO explanation */}
      <div className="mt-10">
        <Card>
          <h2 className="text-xl font-black text-gray-900 mb-4">Step-Up SIP Calculator - How Annual Increases Multiply Wealth 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">What is Step-Up SIP?</h3>
              <p>Step-Up SIP (also called Top-Up SIP) is a SIP variant where you automatically increase your monthly investment amount by a fixed percentage every year. As your salary grows through increments and promotions, your SIP grows with it - ensuring your investment keeps pace with your income growth. Most mutual fund platforms and AMCs allow you to set up automatic step-up: select your base SIP amount, the step-up percentage (typically 5-15% annually), and the step-up frequency (usually annual). The SIP amount increases automatically without manual intervention each year.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Step-Up SIP vs Regular SIP - The Wealth Difference</h3>
              <p>The wealth difference between step-up and regular SIP is staggering. Base: $10,000/month SIP for 20 years at 12% return. Regular SIP: Final corpus = $99.9 thousands. Total invested = $24 thousands. Step-Up SIP at 10% annual increase: Final corpus = $2.36 millions (2.4x more!). Total invested = $68.7 thousands. Step-Up SIP at 15% increase: Final corpus = $3.64 millions. Total invested = $1.06 millions. The returns-to-investment ratio is remarkable: at 10% step-up, returns ($1.67 millions) are 2.4x the amount invested ($68.7 thousands). This is the magic of combining step-up with compounding.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">How to Set Up Step-Up SIP</h3>
              <p>Setting up a step-up SIP is straightforward on major Indian platforms: On Groww: Choose SIP -{'>'} Enable 'SIP Top-Up' -{'>'} Select increment amount or percentage. On Zerodha Coin: Standard SIPs only; manually increase each year. On Paytm Money: SIP Top-Up available during setup. On AMC websites (HDFC MF, ICICI MF, etc.): 'SIP with trigger' or 'Top-up SIP' options. Recommended step-up percentage: Use your expected annual salary increment minus 5%. If you expect 12% salary hike, set 7% step-up (keeping 5% for lifestyle improvement). Most financial advisors recommend 10% annual step-up as a balanced choice.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Optimal Step-Up Strategy by Life Stage</h3>
              <p>Your ideal step-up strategy evolves through life stages. 20s (high growth phase): 15-20% step-up. Income growing rapidly, minimal expenses, single. Maximize compounding years. 30s (family building): 10-15% step-up. Marriage, home purchase, child expenses increase. Still prioritize investment growth. 40s (peak earning): 10% step-up. Near-peak income, education expenses begin, maintain investment discipline. 50s (pre-retirement): 5% step-up or switch to stable large-cap/balanced funds. Begin reducing risk as retirement approaches. The ideal is to never decrease the SIP amount - even in tough financial years, find ways to maintain at minimum the previous year's SIP amount. Investment discipline across market cycles is the single most predictable driver of long-term wealth.</p>
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
          { name: "SIP Calculator", href: "/calculators/finance/sip-calculator", icon: "📈", desc: "Free calculator" },          { name: "PPF Calculator", href: "/calculators/finance/ppf-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "NPS Calculator", href: "/calculators/finance/nps-calculator", icon: "📊", desc: "Free calculator" },          { name: "Fd Calculator", href: "/calculators/finance/fd-calculator", icon: "🏦", desc: "Free calculator" },          { name: "Rd Calculator", href: "/calculators/finance/rd-calculator", icon: "📊", desc: "Free calculator" },          { name: "Lumpsum Calculator", href: "/calculators/finance/lumpsum-calculator", icon: "💰", desc: "Free calculator" },          { name: "SIP vs Fd Calculator", href: "/calculators/finance/sip-vs-fd-calculator", icon: "📊", desc: "Free calculator" },          { name: "SIP vs PPF Calculator", href: "/calculators/finance/sip-vs-ppf-calculator", icon: "📊", desc: "Free calculator" },          { name: "SIP vs NPS Calculator", href: "/calculators/finance/sip-vs-nps-calculator", icon: "📊", desc: "Free calculator" },          { name: "Mutual Fund Calculator", href: "/calculators/finance/mutual-fund-calculator", icon: "📊", desc: "Free calculator" },          { name: "Mutual Fund Return Calculator", href: "/calculators/finance/mutual-fund-return-calculator", icon: "📊", desc: "Free calculator" },          { name: "PPF vs Fd Calculator", href: "/calculators/finance/ppf-vs-fd-calculator", icon: "📊", desc: "Free calculator" },
          ]}
        />
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Step Up SIP Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Step Up SIP USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Step-Up SIP Calculator Example (India 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, starting INR 8,000/month with a 12% annual step-up, your step-up SIP calculator India 2026 shows you building INR 1.4 crore in 20 years vs just INR 79.9 lakh with a flat SIP — a difference of INR 60 lakh.
        </p>
      </Card>

            <SEOContent
        title="Step-Up SIP Calculator India – How Much More Wealth Does Increasing Your SIP Build in 2026?"
        category="finance"
        intro={`A step-up or top-up SIP automatically increases your monthly investment by a fixed percentage or amount each year — and it's one of the highest-leverage changes you can make to your long-term wealth building. The mathematics are compelling: a ₹10,000/month SIP at 12% CAGR for 20 years builds ₹99.9 lakh. The same SIP with 10% annual step-up builds approximately ₹180 lakh — ₹80 lakh more, from an investment that starts identically.

The case for step-up SIP is both mathematical and behavioral. Most people earn more as their career progresses — 5-10% salary increases compounding over decades. A step-up SIP automatically channels a portion of those raises into investments rather than lifestyle inflation. It prevents the wealth-destroying cycle of earning more while not saving proportionally more.

The step-up also captures a key insight about SIP returns: money invested in earlier years has more time to compound and therefore contributes most to final wealth. Step-up SIP means you're investing more each year while retaining the compounding benefit of starting early — a powerful combination.`}
        howItWorks={`Step-up SIP projection: Each year's SIP amount is greater than the previous year's by the step-up percentage. Year 1: PMT. Year 2: PMT × (1 + step-up rate). Year n: PMT × (1 + step-up rate)^(n-1).

Future value calculation: Sum across all years of [Annual SIP amount × future value factor for monthly investments in that year]. This requires calculating the future value contribution from each year's monthly installments at the applicable step-up amount.

Example: ₹10,000/month with 10% annual step-up at 12% CAGR for 20 years:
- Year 1: ₹10,000/month
- Year 5: ₹14,641/month
- Year 10: ₹23,579/month
- Year 15: ₹37,975/month
- Year 20: ₹61,159/month
Total corpus ≈ ₹1.80 crore vs ₹99.9 lakh for flat SIP.`}
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
        tipsSection={`Even a 5% annual step-up significantly outperforms a flat SIP. On ₹10,000/month at 12% CAGR: 5% step-up = ₹1.32 crore at 20 years vs ₹99.9 lakh flat — 32% more corpus from a modest annual increase. At 10% step-up: ₹1.80 crore — 80% more. The incremental effort of increasing your SIP annually by 5-10% produces disproportionate long-term results.

Set up step-up SIP with a specific annual review date tied to your salary review. When you receive an annual raise, immediately increase your SIP by at least 50% of the raise amount. This channels salary growth into wealth building automatically while still allowing lifestyle improvement.

For AMC platforms: most online AMC portals and mutual fund apps (Groww, Zerodha Coin, Kuvera, direct AMC websites) allow step-up SIP mandates that automatically increase the monthly debit amount annually. This removes the need for manual intervention each year.`}
        conclusion={`The step-up SIP concept applies beyond Indian mutual funds — any systematic investment plan in any country benefits from annual increases that pace with income growth. US investors who increase their 401k contribution percentage by 1-2% annually after raises follow the same principle: automatic, behavioral, compounding investment increases that build wealth without requiring monthly willpower.

For investors worried about affordability: start with a step-up SIP that begins at a comfortable amount and increases slowly. ₹5,000/month with 5% step-up for 20 years at 12% produces approximately ₹72 lakh — meaningful wealth from a very accessible starting point. Use [our SIP Calculator](/calculators/finance/sip-calculator) for comparison of flat vs step-up projections.`}

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
      </div>
    </CalculatorLayout>
  )
}
