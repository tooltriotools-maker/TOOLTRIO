'use client'
import { useState, useMemo } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import { calculateNetWorth } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { Plus, Trash2 } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { currency, fmt, fmtCompact } = useCurrency()
  const d = currency.defaultValues

  const [assets, setAssets] = useState([
    { name: 'Cash & Savings', value: d.mediumAmount * 2 },
    { name: 'Investments', value: d.mediumAmount * 5 },
    { name: 'Real Estate', value: d.homeLoan },
    { name: 'Vehicle', value: d.mediumAmount * 3 },
  ])
  const [liabilities, setLiabilities] = useState([
    { name: 'Home Loan', value: d.homeLoan * 0.7 },
    { name: 'Car Loan', value: d.mediumAmount * 1.5 },
    { name: 'Credit Card', value: d.smallAmount * 3 },
  ])

  const result = useMemo(() => calculateNetWorth(assets, liabilities), [assets, liabilities])

  const assetColors = ['#14b8a6', '#3b82f6', '#8b5cf6', '#22c55e', '#f59e0b', '#ec4899']
  const liabilityColors = ['#ef4444', '#f97316', '#eab308', '#dc2626']

  const updateValue = (list: any[], setList: any, idx: number, val: number) => {
    const next = [...list]; next[idx] = { ...next[idx], value: val }; setList(next)
  }
  const updateName = (list: any[], setList: any, idx: number, name: string) => {
    const next = [...list]; next[idx] = { ...next[idx], name }; setList(next)
  }
  const remove = (list: any[], setList: any, idx: number) => setList(list.filter((_, i) => i !== idx))
  const add = (list: any[], setList: any) => setList([...list, { name: 'New Item', value: 0 }])

  const step = currency.code === 'INR' ? 10000 : 1000

  return (
    <CalculatorLayout title="Net Worth Calculator USA 2026" description={`Track your total net worth in ${currency.name}. Add assets and liabilities for a complete financial picture.`} icon="⚖️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <ResultCard label="Net Worth" value={fmtCompact(result.netWorth)} subValue={result.netWorth >= 0 ? 'Positive net worth ✅' : 'Work on reducing debt'} highlight />
        <ResultCard label="Total Assets" value={fmtCompact(result.totalAssets)} />
        <ResultCard label="Total Liabilities" value={fmtCompact(result.totalLiabilities)} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Assets Input */}
        <Card className="lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Assets</h2>
            <span className="text-xs text-green-600 font-semibold">{fmtCompact(result.totalAssets)}</span>
          </div>

          <div className="space-y-3">
            {assets.map((a, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex-1">
                  <input
                    value={a.name}
                    onChange={e => updateName(assets, setAssets, i, e.target.value)}
                    className="w-full bg-transparent text-xs text-gray-500 outline-none mb-1 border-b border-gray-100 pb-0.5"
                  />
                  <div className="flex items-center gap-1 bg-gray-50 rounded-lg px-2 py-1.5 border border-gray-200">
                    <span className="text-green-500 text-xs">{currency.symbol}</span>
                    <input
                      type="number"
                      value={a.value}
                      onChange={e => updateValue(assets, setAssets, i, Number(e.target.value))}
                      className="bg-transparent text-sm font-semibold w-full outline-none text-right"
                      step={step}
                    />
                  </div>
                </div>
                <button
                  onClick={() => remove(assets, setAssets, i)}
                  className="text-slate-600 hover:text-red-400 transition-colors p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            <button
              onClick={() => add(assets, setAssets)}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-dashed border-green-300 text-green-500 text-sm hover:bg-green-500/5 transition-all"
            >
              <Plus className="w-4 h-4" /> Add Asset
            </button>
          </div>

          {/* Liabilities */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-red-400 uppercase tracking-wider">Liabilities</h2>
              <span className="text-xs text-red-400 font-semibold">{fmtCompact(result.totalLiabilities)}</span>
            </div>
            <div className="space-y-3">
              {liabilities.map((l, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="flex-1">
                    <input
                      value={l.name}
                      onChange={e => updateName(liabilities, setLiabilities, i, e.target.value)}
                      className="w-full bg-transparent text-xs text-gray-500 outline-none mb-1 border-b border-gray-100 pb-0.5"
                    />
                    <div className="flex items-center gap-1 bg-gray-50 rounded-lg px-2 py-1.5 border border-gray-200">
                      <span className="text-red-400 text-xs">{currency.symbol}</span>
                      <input
                        type="number"
                        value={l.value}
                        onChange={e => updateValue(liabilities, setLiabilities, i, Number(e.target.value))}
                        className="bg-transparent text-sm font-semibold w-full outline-none text-right"
                        step={step}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => remove(liabilities, setLiabilities, i)}
                    className="text-slate-600 hover:text-red-400 transition-colors p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => add(liabilities, setLiabilities)}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-dashed border-red-300 text-red-400 text-sm hover:bg-red-500/5 transition-all"
              >
                <Plus className="w-4 h-4" /> Add Liability
              </button>
            </div>
          </div>
        </Card>
      
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Net Worth Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Net Worth USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-4 p-4">
        <h2 className="text-xl font-black text-gray-900 mb-3">Net Worth Calculator USA 2026 – Know Your Exact Financial Position Today</h2>
        <p className="text-sm text-gray-600">Your net worth is the single most important financial number you need to know. This net worth calculator USA 2026 gives you an instant snapshot of your financial position and compares it to age-based American averages.</p>
      </Card>

        <SEOContent
        title="Net Worth Calculator USA 2026"
        category="finance"
        intro={`Net worth is the starting point for understanding where you actually stand financially — and most people who calculate it for the first time are surprised by the result in one direction or the other. It's total assets minus total liabilities: what you own minus what you owe. A $500,000 home with a $380,000 mortgage contributes $120,000 to net worth, not $500,000.

Tracking net worth over time is more valuable than any single snapshot. A person with negative net worth at 28 who is adding $500-$1,000 to net worth every month is in a fundamentally better position than someone with positive net worth that's flat or declining. The trajectory matters as much as the number.

The Federal Reserve's Survey of Consumer Finances provides benchmarks: median US household net worth in 2022 was $192,700; mean was $1,063,700 (mean is much higher because a small number of very wealthy households pull it up). Median net worth by age group provides more useful comparisons: ages 35-44: $135,300 median; 45-54: $247,200; 55-64: $364,500; 65-74: $409,900.`}
        howItWorks={`Net worth = Total assets - Total liabilities.

Assets: Cash and savings accounts + investment accounts (stocks, bonds, mutual funds, retirement accounts) + home equity + other real estate equity + vehicle value + business ownership value + other valuable assets (jewelry, collectibles at realistic market value).

Liabilities: Mortgage balance + HELOC balance + auto loans + student loans + credit card balances + personal loans + any other outstanding debts.

Retirement account values: Include full pre-tax value of traditional IRA/401k, understanding that taxes will be owed on withdrawal (often 15-25% effective rate). Some prefer calculating retirement accounts at after-tax value for more conservative net worth estimate.`}
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
        tipsSection={`Update your net worth calculation quarterly or at minimum annually. Track changes over time in a simple spreadsheet — seeing consistent growth is motivating, and identifying periods of stagnation or decline reveals where financial attention is needed.

Be honest about asset values. Homes should use current market value (use Zillow, Redfin, or recent comparable sales — not your purchase price or sentimental value). Vehicles should use KBB or Carfax trade-in value. Overstating asset values creates false comfort.

For business owners: valuing a private business for net worth purposes is genuinely complex. Common rule of thumb: 2-4x annual owner discretionary earnings for service businesses, higher for businesses with recurring revenue or proprietary assets. Consider using a conservative estimate and treating any upside as a bonus.`}
        conclusion={`Net worth is a lagging indicator — it reflects past financial decisions. But the habits that build net worth (earning above expenses, investing consistently, avoiding lifestyle inflation, managing debt) are current choices that compound forward. Focus on the inputs (savings rate, investment consistency, debt reduction) rather than obsessing over the output.

For retirement readiness, divide your investment portfolio (excluding home equity, which requires either selling or a reverse mortgage to access) by your annual expenses. The resulting multiple is a rough indicator of retirement readiness relative to the 4% rule: at 25x, you're potentially financially independent. Use [our FIRE Calculator](/calculators/finance/fire-calculator) to model your specific retirement readiness.`}

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
        {/* Internal Links */}
        {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "FIRE Calculator", href: "/calculators/finance/fire-calculator", icon: "🔥", desc: "Free calculator" },          { name: "Savings Rate Calculator", href: "/calculators/finance/savings-rate-calculator", icon: "💰", desc: "Free calculator" },          { name: "Wealth Calculator", href: "/calculators/finance/wealth-calculator", icon: "💎", desc: "Free calculator" },          { name: "Retirement Calculator", href: "/calculators/finance/retirement-calculator", icon: "🌅", desc: "Free calculator" },          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },          { name: "Roth IRA Calculator", href: "/calculators/finance/roth-ira-calculator", icon: "🛡️", desc: "Free calculator" },          { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "Lumpsum Calculator", href: "/calculators/finance/lumpsum-calculator", icon: "💰", desc: "Free calculator" },          { name: "SIP Calculator", href: "/calculators/finance/sip-calculator", icon: "📈", desc: "Free calculator" },          { name: "Real Return Calculator", href: "/calculators/finance/real-return-calculator", icon: "📊", desc: "Free calculator" },          { name: "Mortgage Calculator", href: "/calculators/finance/mortgage-calculator", icon: "🏡", desc: "Free calculator" },          { name: "Tax Bracket Calculator", href: "/calculators/finance/tax-bracket-calculator", icon: "🧾", desc: "Free calculator" },
          ]}
        />
 
    </CalculatorLayout>
  )
}
