'use client'
import { useState, useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts'
import { calculateBreakEven } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { Target, TrendingUp, DollarSign, Percent } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, currency } = useCurrency()
  const [fixedCosts, setFixedCosts] = useState(100000)
  const [variableCost, setVariableCost] = useState(150)
  const [sellingPrice, setSellingPrice] = useState(250)

  const r = useMemo(() => calculateBreakEven(fixedCosts, variableCost, sellingPrice), [fixedCosts, variableCost, sellingPrice])

  const isValid = sellingPrice > variableCost

  const chartData = isValid ? Array.from({ length: 11 }, (_, i) => {
    const units = Math.round((r.breakEvenUnits * i * 2) / 10)
    return {
      units,
      revenue: units * sellingPrice,
      totalCost: fixedCosts + units * variableCost,
      profit: units * sellingPrice - (fixedCosts + units * variableCost),
    }
  }) : []

  return (
    <CalculatorLayout title="Break-Even Calculator USA 2026" description="Calculate your break-even point in units and revenue — essential for business planning and pricing." icon="⚖️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Business Costs</h2>
          <div className="space-y-5">
            <InputField label="Total Fixed Costs" value={fixedCosts} onChange={setFixedCosts} min={0} max={100000000} step={1000} prefix={currency.symbol} />
            <InputField label="Variable Cost per Unit" value={variableCost} onChange={setVariableCost} min={0} max={1000000} step={10} prefix={currency.symbol} />
            <InputField label="Selling Price per Unit" value={sellingPrice} onChange={setSellingPrice} min={1} max={1000000} step={10} prefix={currency.symbol} />
          </div>
          {!isValid && (
            <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
              ⚠️ Selling price must be higher than variable cost per unit.
            </div>
          )}
          {isValid && (
            <div className="mt-5 space-y-2">
              <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-center">
                <p className="text-xs text-green-600 font-semibold">Break-Even Units</p>
                <p className="text-2xl font-black text-green-700">{r.breakEvenUnits.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-center">
                <p className="text-xs text-blue-600 font-semibold">Break-Even Revenue</p>
                <p className="text-xl font-black text-blue-700">{fmt(r.breakEvenRevenue)}</p>
              </div>
            </div>
          )}
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Break-Even Units" value={isValid ? r.breakEvenUnits.toLocaleString() : '-'} highlight icon={<Target className="w-4 h-4" />} />
            <ResultCard label="Break-Even Revenue" value={isValid ? fmt(r.breakEvenRevenue) : '-'} icon={<DollarSign className="w-4 h-4" />} />
            <ResultCard label="Contribution Margin" value={isValid ? fmt(r.contributionMargin) : '-'} icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="Margin Ratio" value={isValid ? `${r.contributionMarginRatio}%` : '-'} icon={<Percent className="w-4 h-4" />} />
          </div>

          {isValid && (
            <>
              <Card>
                <h3 className="text-sm font-bold text-gray-800 mb-4">Revenue vs Cost - Break-Even Analysis</h3>
                <div style={{ height: 230 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                      <XAxis dataKey="units" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => v.toLocaleString()} />
                      <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v, true)} width={70} />
                      <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number) => [fmt(v), '']} labelFormatter={u => `${u.toLocaleString()} units`} />
                      <Legend wrapperStyle={{ fontSize: 12, color: '#374151' }} />
                      <ReferenceLine x={r.breakEvenUnits} stroke="#16a34a" strokeDasharray="4 4" label={{ value: 'BEP', position: 'top', fill: '#16a34a', fontSize: 12 }} />
                      <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#3b82f6" strokeWidth={2.5} dot={false} />
                      <Line type="monotone" dataKey="totalCost" name="Total Cost" stroke="#f87171" strokeWidth={2.5} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card>
                <h3 className="text-sm font-bold text-gray-800 mb-3">Profit at Different Sales Levels</h3>
                <div className="max-h-56 overflow-y-auto">
                  <table className="calc-table">
                    <thead><tr><th>Sales Level</th><th>Units</th><th>Revenue</th><th>Total Cost</th><th>Profit / Loss</th></tr></thead>
                    <tbody>{r.profitAtScenarios.map((row, i) => (
                      <tr key={i}>
                        <td className="text-gray-500 font-semibold">{row.label}</td>
                        <td>{row.units.toLocaleString()}</td>
                        <td>{fmt(row.revenue)}</td>
                        <td>{fmt(row.totalCost)}</td>
                        <td className={row.profit >= 0 ? 'text-green-600 font-bold' : 'text-red-500 font-bold'}>{row.profit >= 0 ? '+' : ''}{fmt(row.profit)}</td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
      <div className="mt-8">
      {/* 600-word SEO explanation */}
      <div className="mt-10">
        <Card>
          <h2 className="text-xl font-black text-gray-900 mb-4">Break-Even Analysis - Complete Business Planning Guide USA 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Break-Even Analysis - Foundation of Business Viability</h3>
              <p>Break-even analysis determines the minimum sales volume required to cover all costs - the point where total revenue equals total costs (zero profit or loss). It's one of the most fundamental tools in business planning, pricing strategy, and investment decisions. The break-even formula: Break-Even Units = Fixed Costs / Contribution Margin per Unit, where Contribution Margin = Selling Price - Variable Cost per Unit. Contribution Margin represents how much each unit sold contributes toward covering fixed costs and generating profit. Once you\'ve sold enough units to cover all fixed costs, every additional unit sold generates pure profit equal to the contribution margin.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Fixed Costs vs Variable Costs - Classification Guide</h3>
              <p>Correctly classifying costs is critical for accurate break-even analysis. Fixed Costs (don\'t change with production volume): Factory rent, equipment depreciation, management salaries, insurance, annual software subscriptions, regulatory compliance costs, marketing overhead. Variable Costs (change directly with production): Raw materials, direct labor (piece-rate), packaging, shipping costs, sales commissions, payment processing fees. Semi-variable costs (both fixed and variable components): Utility bills (base charge + usage), overtime labor. For break-even analysis, treat semi-variable costs by splitting: fixed portion goes to fixed costs, variable portion to variable cost per unit.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Break-Even Analysis in Real Business Scenarios</h3>
              <p>Practical applications of break-even analysis: Restaurant: Fixed costs (rent $2L, salaries $3L, utilities $50K) = $5.5L/month. Average spending per cover: $800. Variable cost per cover (ingredients, disposables): $300. Contribution margin: $500/cover. Break-even covers = $5.5L / $500 = 1,100 covers/month. With 30 days, need ~37 covers/day minimum. E-commerce store: Fixed costs (warehousing, platform fees, permanent staff) = $3L/month. Average order value $1,200. Variable cost (product + shipping + returns) = $700. CM = $500/order. Break-even = 600 orders/month. Below this, the business loses money regardless of how much it sells.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Limitations of Break-Even Analysis and How to Use It Well</h3>
              <p>Break-even analysis has important limitations to acknowledge: (1) Assumes linear cost behavior - in reality, variable costs may decrease with scale (bulk purchasing) or increase with overtime. (2) Doesn\'t account for multiple products with different margins - use weighted average contribution margin for product mix. (3) Ignores time value of money and cash flow timing - a business might be technically profitable above break-even but still run short of cash. (4) Static analysis - real business has changing fixed costs (rent increases) and variable costs (commodity price fluctuations). Best practice: Use break-even as a minimum viability threshold, not a profit target. Aim for 150-200% of break-even volume as your operating target to build a safety margin and generate meaningful profit.</p>
            </div>
          </div>
        </Card>
      </div>

            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Break Even Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Break Even USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Break-Even Calculator Example (USA Business 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, with $15,000 fixed monthly costs and a $30 contribution margin per unit, your break-even calculator USA 2026 shows you need 500 unit sales before making any profit.
        </p>
      </Card>

            <SEOContent
        title="Break-Even Calculator USA – How Many Units Do You Need to Sell to Break Even in 2026?"
        category="finance"
        intro={`Break-even analysis is one of the most useful tools for any business decision, and most people have a rough intuition for it that the math can sharpen considerably. The break-even point is the revenue level at which you cover all costs — fixed and variable — with nothing left over. Below break-even you're losing money; above it, every additional unit sold contributes directly to profit.

Fixed costs don't change with volume: rent, salaries, insurance, software subscriptions. Variable costs scale with production or sales: materials, payment processing fees, shipping. Understanding which costs fall into which category reveals how your profit margin changes as you scale — and whether your business model is viable at different sales levels.

The contribution margin per unit — selling price minus variable cost per unit — is the key metric. A business with a high contribution margin reaches break-even quickly with relatively few sales. A business with thin margins needs enormous volume to cover fixed costs, leaving it vulnerable to any sales slowdown.`}
        howItWorks={`Break-even formula: Break-Even Units = Fixed Costs ÷ (Price per Unit - Variable Cost per Unit). Break-Even Revenue = Fixed Costs ÷ Contribution Margin Ratio, where Contribution Margin Ratio = (Price - Variable Cost) / Price.

Example: A product with $100,000 fixed costs, $50 selling price, and $30 variable cost per unit has a contribution margin of $20/unit. Break-even = $100,000 ÷ $20 = 5,000 units. As revenue, that's 5,000 × $50 = $250,000.

Margin of safety: Once you know break-even, you can calculate your margin of safety — how far actual sales can fall before you start losing money. If you sell 8,000 units and break-even is 5,000, your margin of safety is 3,000 units (37.5%) — a useful indicator of business resilience.`}
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
        tipsSection={`Model your worst case, base case, and best case scenarios by varying the number of units sold. This shows you not just when you break even, but how quickly losses accumulate if sales underperform expectations.

Break-even analysis assumes all units produced are sold and costs are truly fixed or truly variable — real businesses have semi-fixed costs (step costs that increase in chunks). Treat staff additions and equipment purchases as step-fixed costs that change your break-even at capacity thresholds.

Price sensitivity analysis: Model what happens if you reduce price by 10-20% to compete on price. The contribution margin drops sharply, requiring significantly more volume to achieve the same break-even. This often reveals that price cutting is more dangerous to profitability than people intuitively expect.`}
        conclusion={`The break-even point is a floor, not a goal. Profitable businesses aim for revenue well above break-even — the question is how quickly you can reach your target profit level, not just the zero-profit threshold.

For service businesses, break-even analysis looks slightly different: instead of units sold, you think in terms of billable hours, client contracts, or project revenue. The same contribution margin logic applies — each client or project needs to cover its variable costs and contribute to fixed overhead. Use this calculator to understand your minimum viable client load before your next hire, lease expansion, or major investment.`}

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
