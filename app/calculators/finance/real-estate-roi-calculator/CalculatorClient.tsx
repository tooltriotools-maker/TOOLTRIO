'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { calculateRealEstateROI } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt } = useCurrency()
  const [purchasePrice, setPurchasePrice] = useState(300000)
  const [downPct, setDownPct] = useState(25)
  const [mortgageRate, setMortgageRate] = useState(6.5)
  const [mortgageTerm, setMortgageTerm] = useState(30)
  const [monthlyRent, setMonthlyRent] = useState(2000)
  const [vacancy, setVacancy] = useState(5)
  const [propertyTax, setPropertyTax] = useState(1.2)
  const [insurance, setInsurance] = useState(0.5)
  const [maintenance, setMaintenance] = useState(1)
  const [management, setManagement] = useState(8)
  const [appreciation, setAppreciation] = useState(4)
  const [yearsHeld, setYearsHeld] = useState(10)

  const result = useMemo(() => calculateRealEstateROI(purchasePrice, downPct, mortgageRate, mortgageTerm, monthlyRent, vacancy, propertyTax, insurance, maintenance, management, appreciation, yearsHeld), [purchasePrice, downPct, mortgageRate, mortgageTerm, monthlyRent, vacancy, propertyTax, insurance, maintenance, management, appreciation, yearsHeld])

  const metrics = [
    { name: 'Cap Rate', value: result.capRate, suffix: '%', good: result.capRate >= 6 },
    { name: 'Cash-on-Cash', value: result.cashOnCash, suffix: '%', good: result.cashOnCash >= 5 },
    { name: 'Annual ROI', value: result.annualizedROI, suffix: '%', good: result.annualizedROI >= 8 },
  ]

  const chartData = [
    { name: 'Down Payment', amount: result.downPayment },
    { name: 'Annual Cashflow', amount: result.annualCashflow },
    { name: `Sale Proceeds (${yearsHeld}y)`, amount: result.netSaleProceeds },
  ]

  return (
    <CalculatorLayout title="Real Estate ROI Calculator USA 2026" description="Calculate cap rate, cash-on-cash return, net operating income, and total ROI for any rental property." icon="🏘️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Property Details</h2>
          <div className="space-y-4">
            {[
              { label: 'Purchase Price', val: purchasePrice, set: setPurchasePrice, isInput: true },
              { label: 'Monthly Rent', val: monthlyRent, set: setMonthlyRent, isInput: true },
            ].map(f => (
              <div key={f.label}>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{f.label}</label>
                <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                  <input type="number" value={f.val} onChange={e => f.set(Number(e.target.value))} className="w-full pl-7 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500" /></div>
              </div>
            ))}
            {[
              { label: `Down Payment: ${downPct}%`, val: downPct, set: setDownPct, min: 5, max: 100, step: 5 },
              { label: `Mortgage Rate: ${mortgageRate}%`, val: mortgageRate, set: setMortgageRate, min: 1, max: 12, step: 0.25 },
              { label: `Vacancy Rate: ${vacancy}%`, val: vacancy, set: setVacancy, min: 0, max: 20, step: 1 },
              { label: `Property Tax: ${propertyTax}%`, val: propertyTax, set: setPropertyTax, min: 0, max: 3, step: 0.1 },
              { label: `Maintenance: ${maintenance}%`, val: maintenance, set: setMaintenance, min: 0, max: 5, step: 0.5 },
              { label: `Management Fee: ${management}%`, val: management, set: setManagement, min: 0, max: 15, step: 1 },
              { label: `Appreciation: ${appreciation}%/yr`, val: appreciation, set: setAppreciation, min: 0, max: 10, step: 0.5 },
              { label: `Hold Period: ${yearsHeld} years`, val: yearsHeld, set: setYearsHeld, min: 1, max: 30, step: 1 },
            ].map(f => (
              <div key={f.label}>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{f.label}</label>
                <input type="range" min={f.min} max={f.max} step={f.step} value={f.val} onChange={e => f.set(Number(e.target.value))} className="w-full accent-green-600" />
              </div>
            ))}
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          {/* Key metrics */}
          <div className="grid grid-cols-3 gap-3">
            {metrics.map(m => (
              <div key={m.name} className={`rounded-2xl border p-4 text-center ${m.good ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}`}>
                <p className="text-xs text-gray-500 mb-1">{m.name}</p>
                <p className={`text-2xl font-black ${m.good ? 'text-green-700' : 'text-orange-600'}`}>{m.value}%</p>
                <p className="text-xs mt-1">{m.good ? '✅ Strong' : '⚠️ Weak'}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Monthly Cashflow" value={fmt(result.monthlyCashflow)} subValue={result.isPositiveCashflow ? '✅ Positive' : '⚠️ Negative'} highlight={result.isPositiveCashflow} />
            <ResultCard label="Annual NOI" value={fmt(result.noi)} subValue="Net operating income" />
            <ResultCard label="Sale Price" value={fmt(result.salePrice)} subValue={`After ${yearsHeld} years`} />
            <ResultCard label="Total ROI" value={`${result.totalROI}%`} subValue={`Over ${yearsHeld} years`} />
          </div>

          <Card>
            <h3 className="font-bold text-gray-900 mb-4">Investment Return Breakdown</h3>
            <div className="space-y-2">
              {[
                { label: 'Effective Monthly Rent', val: fmt(result.effectiveMonthlyRent), sub: `After ${vacancy}% vacancy` },
                { label: 'Monthly Mortgage Payment', val: fmt(result.monthlyMortgage), sub: 'Principal + Interest' },
                { label: 'Annual Expenses', val: fmt(result.annualExpenses), sub: 'Tax + Insurance + Maintenance + Management' },
                { label: 'Annual Cash Flow', val: fmt(result.annualCashflow), sub: result.isPositiveCashflow ? '✅ Positive cashflow' : '⚠️ Negative cashflow', bold: true },
                { label: 'Net Sale Proceeds', val: fmt(result.netSaleProceeds), sub: `After loan payoff + ${6}% selling costs` },
                { label: 'Total Return', val: fmt(result.totalReturn), sub: 'Cashflow + Appreciation + Equity', bold: true },
              ].map(row => (
                <div key={row.label} className="flex justify-between items-center py-2 border-b border-gray-50">
                  <div><p className={`text-sm ${row.bold ? 'font-bold text-gray-900' : 'text-gray-600'}`}>{row.label}</p><p className="text-xs text-gray-400">{row.sub}</p></div>
                  <span className={`font-bold ${row.bold ? 'text-green-700' : 'text-gray-900'}`}>{row.val}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Real Estate Roi Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          A home purchased for $400,000 with 20% down at 6.5% over 30 years builds <strong>$250,000+</strong> in equity while appreciating at the historical 3.5% annual rate.
        </p>
        <p className="text-sm text-gray-600">
          Use this Real Estate Roi USA 2026 tool to compare buying vs renting, estimate ROI, and make data-driven real estate decisions.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Real Estate ROI Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, analyzing a $400,000 duplex with $3,200/month combined rent, your real estate ROI calculator USA 2026 shows cap rate, cash-on-cash return, and whether the numbers make it worth buying vs investing in REITs.
        </p>
      </Card>

            <SEOContent
        title="Real Estate ROI Calculator USA – Is Your Rental Property a Good Investment in 2026?"
        category="finance"
        intro={`Real estate investment returns are multidimensional in ways that make simple comparisons to other assets genuinely complex. A rental property generates current income (rental yield), builds equity through mortgage paydown and appreciation, creates tax benefits (depreciation deductions, interest deductibility), and provides leverage that amplifies returns — all simultaneously. Calculating the true ROI requires capturing all these dimensions.

The three primary return metrics for rental property: cap rate (net operating income ÷ property value, independent of financing), cash-on-cash return (annual cash flow ÷ cash invested, including financing effects), and total return (combining all sources of return including appreciation and equity buildup). These tell different stories — a highly leveraged property might show excellent cash-on-cash return while having modest cap rate.

Vacancy, maintenance, and management costs are systematically underestimated by first-time investors. Rule of thumb: budget 1% of property value annually for maintenance and capital expenditures, 5-8% for vacancy, and 8-10% for property management if you use a manager. Net operating income after these costs is typically 30-40% lower than gross rent.`}
        howItWorks={`Cap rate: NOI / Property value. NOI = Annual gross rent × (1 - vacancy rate) - operating expenses (property tax, insurance, maintenance, management). Cap rate represents the return assuming no debt financing.

Cash-on-cash return: Annual cash flow after debt service / Total cash invested. Cash flow = NOI - annual mortgage payments. Cash invested = down payment + closing costs + initial repairs. This is the actual return on the money you physically deployed.

Total return: (NOI - mortgage payments + equity buildup from loan paydown + appreciation) / total cash invested. More comprehensive but requires appreciation assumptions. Internal Rate of Return (IRR) is the precise calculation when cash flows are uneven across years.`}
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
        tipsSection={`The 1% rule (monthly rent should be at least 1% of purchase price) is a quick sanity check for cash flow potential, not an investment decision rule. In major coastal cities (NYC, SF, LA), 1% properties are essentially nonexistent — average gross yields of 3-4% reflect appreciation-driven markets. In Midwest or Sun Belt markets, 1%+ properties exist and provide stronger cash-on-cash returns but potentially lower appreciation.

Factor in landlord work time as a cost. Self-managed properties save management fees but cost time — estimate 5-10 hours/month for a single unit. If your time is worth $100/hour, self-management of one property costs $6,000-$12,000 annually in opportunity cost that doesn't appear in financial calculations.

Model your exit: understand how the investment performs at your expected holding period, the transaction costs of selling (commissions, transfer taxes, repair-to-sell costs), and your capital gains tax exposure at disposition.`}
        conclusion={`Real estate returns are highly location-dependent in ways that make national averages nearly useless for investment decisions. The property you're evaluating in a specific neighborhood with specific rent rates, property taxes, and appreciation trajectory needs to be modeled on its own merits — not based on generic ROI benchmarks.

For most retail investors, REITs provide real estate exposure with better liquidity, diversification, and lower management burden than direct rental property ownership. The superior returns from direct real estate come primarily from leverage (amplifying appreciation) and the value you add through active management — advantages that don't translate to passive REIT investment. Use [our REIT vs Direct Property Calculator](/calculators/finance/reit-vs-direct-property-usa-calculator) to compare both structures.`}

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
            { name: "Mortgage Calculator", href: "/calculators/finance/mortgage-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Rental Yield Calculator", href: "/calculators/finance/rental-yield-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "ROI Calculator", href: "/calculators/finance/roi-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Down Payment Calculator", href: "/calculators/finance/down-payment-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Rent vs Buy Calculator", href: "/calculators/finance/rent-vs-buy-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "Savings Rate Calculator", href: "/calculators/finance/savings-rate-calculator", icon: "🔗", desc: "Related financial planning" },
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
          { name: "Rental Yield Calculator", href: "/calculators/finance/rental-yield-calculator", icon: "🏘️", desc: "Free calculator" },          { name: "REIT vs Direct Property USA Calculator", href: "/calculators/finance/reit-vs-direct-property-usa-calculator", icon: "🏢", desc: "Free calculator" },          { name: "S&P500 vs Real Estate USA Calculator", href: "/calculators/finance/sp500-vs-real-estate-usa-calculator", icon: "📊", desc: "Free calculator" },          { name: "Mortgage Calculator", href: "/calculators/finance/mortgage-calculator", icon: "🏡", desc: "Free calculator" },          { name: "Home Affordability Calculator", href: "/calculators/finance/home-affordability-calculator", icon: "💰", desc: "Free calculator" },          { name: "Rent vs Buy Calculator", href: "/calculators/finance/rent-vs-buy-calculator", icon: "🔄", desc: "Free calculator" },          { name: "HELOC Calculator", href: "/calculators/finance/heloc-calculator", icon: "🏘️", desc: "Free calculator" },          { name: "Down Payment Calculator", href: "/calculators/finance/down-payment-calculator", icon: "💵", desc: "Free calculator" },          { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "Tax Bracket Calculator", href: "/calculators/finance/tax-bracket-calculator", icon: "🧾", desc: "Free calculator" },          { name: "Budget Planner Calculator", href: "/calculators/finance/budget-planner-calculator", icon: "📊", desc: "Free calculator" },          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },
          ]}
        />

    </CalculatorLayout>
  )
}
