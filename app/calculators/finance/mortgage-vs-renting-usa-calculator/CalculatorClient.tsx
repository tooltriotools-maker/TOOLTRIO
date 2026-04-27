'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { Home, TrendingUp } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string }
const fmt = (n: number) => '$' + Math.round(n).toLocaleString()
const fmtC = (n: number) => n >= 1000000 ? `$${(n/1000000).toFixed(2)}M` : `$${(n/1000).toFixed(0)}K`

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const [homePrice, setHomePrice] = useState(450000)
  const [downPct, setDownPct] = useState(20)
  const [mortgageRate, setMortgageRate] = useState(7)
  const [loanYears, setLoanYears] = useState(30)
  const [monthlyRent, setMonthlyRent] = useState(2500)
  const [rentIncrease, setRentIncrease] = useState(3)
  const [homeAppreciation, setHomeAppreciation] = useState(4)
  const [investReturn, setInvestReturn] = useState(10)
  const [propertyTaxPct, setPropertyTaxPct] = useState(1.2)
  const [years, setYears] = useState(10)

  const result = useMemo(() => {
    const months = years * 12
    const downPayment = homePrice * (downPct / 100)
    const loanAmount = homePrice - downPayment
    const mr = mortgageRate / 100 / 12
    const emi = loanAmount * mr * Math.pow(1 + mr, loanYears * 12) / (Math.pow(1 + mr, loanYears * 12) - 1)
    const monthlyPropertyTax = homePrice * (propertyTaxPct / 100) / 12
    const monthlyMaintenance = homePrice * 0.01 / 12
    const monthlyInsurance = homePrice * 0.005 / 12
    const totalMonthlyBuy = emi + monthlyPropertyTax + monthlyMaintenance + monthlyInsurance

    const totalBuyCost = totalMonthlyBuy * months + downPayment
    const homeValueFinal = homePrice * Math.pow(1 + homeAppreciation / 100, years)

    let remainingLoan = loanAmount
    for (let m = 0; m < months; m++) {
      const interest = remainingLoan * mr
      remainingLoan -= (emi - interest)
    }
    const equity = homeValueFinal - Math.max(0, remainingLoan)
    const buyNetCost = totalBuyCost - equity

    // Renting: total rent paid + invest down payment
    let totalRentPaid = 0; let rent = monthlyRent
    for (let y = 0; y < years; y++) {
      totalRentPaid += rent * 12
      rent *= (1 + rentIncrease / 100)
    }
    const downPaymentInvested = downPayment * Math.pow(1 + investReturn / 100, years)
    const rentSavings = (totalMonthlyBuy - monthlyRent) * months
    const rentSavingsInvested = rentSavings > 0 ? rentSavings / 12 * ((Math.pow(1 + investReturn / 100 / 12, months) - 1) / (investReturn / 100 / 12)) * (1 + investReturn / 100 / 12) : 0
    const rentNetCost = totalRentPaid - downPaymentInvested - rentSavingsInvested

    const barData = [
      { name: 'Total Payments', buy: Math.round(totalBuyCost), rent: Math.round(totalRentPaid) },
      { name: 'Final Wealth', buy: Math.round(equity), rent: Math.round(downPaymentInvested + rentSavingsInvested) },
    ]

    return {
      emi: Math.round(emi), totalMonthlyBuy: Math.round(totalMonthlyBuy), downPayment: Math.round(downPayment),
      totalBuyCost: Math.round(totalBuyCost), homeValueFinal: Math.round(homeValueFinal), equity: Math.round(equity),
      totalRentPaid: Math.round(totalRentPaid), downPaymentInvested: Math.round(downPaymentInvested),
      rentSavingsInvested: Math.round(rentSavingsInvested),
      buyNetCost: Math.round(buyNetCost), rentNetCost: Math.round(rentNetCost),
      buyBetter: equity - totalBuyCost > downPaymentInvested + rentSavingsInvested - totalRentPaid,
      barData,
    }
  }, [homePrice, downPct, mortgageRate, loanYears, monthlyRent, rentIncrease, homeAppreciation, investReturn, propertyTaxPct, years])

  return (
    <CalculatorLayout title="Rent vs Buy Calculator USA 2026" description="Compare the 10-year true cost of renting vs buying including appreciation and opportunity cost." icon="🏡" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-4">Details</h2>
          <div className="space-y-3">
            <p className="text-xs font-bold text-blue-400 uppercase">Buying</p>
            <InputField label="Home Price" value={homePrice} onChange={setHomePrice} min={100000} max={3000000} step={10000} prefix="$" />
            <InputField label="Down Payment %" value={downPct} onChange={setDownPct} min={3} max={100} step={1} suffix="%" />
            <InputField label="Mortgage Rate" value={mortgageRate} onChange={setMortgageRate} min={3} max={12} step={0.25} suffix="%" />
            <InputField label="Loan Term" value={loanYears} onChange={setLoanYears} min={10} max={30} step={5} suffix="Yrs" />
            <InputField label="Property Tax Rate" value={propertyTaxPct} onChange={setPropertyTaxPct} min={0.3} max={3} step={0.1} suffix="%" />
            <InputField label="Home Appreciation" value={homeAppreciation} onChange={setHomeAppreciation} min={1} max={10} step={0.5} suffix="%" />
            <p className="text-xs font-bold text-green-500 uppercase mt-1">Renting</p>
            <InputField label="Monthly Rent" value={monthlyRent} onChange={setMonthlyRent} min={500} max={10000} step={100} prefix="$" />
            <InputField label="Annual Rent Increase" value={rentIncrease} onChange={setRentIncrease} min={0} max={8} step={0.5} suffix="%" />
            <InputField label="Investment Return" value={investReturn} onChange={setInvestReturn} min={5} max={15} step={0.5} suffix="%" />
            <InputField label="Comparison Period" value={years} onChange={setYears} min={3} max={30} step={1} suffix="Yrs" />
          </div>
          <div className={`mt-4 p-3 rounded-xl border-2 text-center ${result.buyBetter ? 'bg-blue-50 border-blue-300' : 'bg-green-50 border-green-300'}`}>
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Better Financial Choice</p>
            <p className="text-xl font-black" style={{ color: result.buyBetter ? '#3b82f6' : '#10b981' }}>{result.buyBetter ? 'Buy 🏠' : 'Rent 📈'} Wins</p>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Monthly Mortgage" value={fmtC(result.totalMonthlyBuy)} subValue={`EMI: ${fmtC(result.emi)}`} icon={<Home className="w-4 h-4" />} highlight={result.buyBetter} />
            <ResultCard label="Home Equity" value={fmtC(result.equity)} subValue={`Home val: ${fmtC(result.homeValueFinal)}`} highlight={result.buyBetter} />
            <ResultCard label="Rent Investment" value={fmtC(result.downPaymentInvested + result.rentSavingsInvested)} subValue="Down payment invested" highlight={!result.buyBetter} icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="Down Payment" value={fmtC(result.downPayment)} subValue={`${downPct}% of price`} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Buy vs Rent - {years} Year Comparison</h3>
            <div style={{ height: 230 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={result.barData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={70} tickFormatter={v => v >= 1000000 ? `$${(v/1000000).toFixed(1)}M` : `$${(v/1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8 }} formatter={(v: number, n) => [fmt(v), n]} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="rent" name="Renting" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="buy" name="Buying" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
            <div className="mt-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-6">Mortgage vs Renting Usa: Complete Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-base">What is Mortgage?</h3>
              <p>Mortgage is a USA investment or financial product that offers distinct advantages depending on your goals, tax situation, and time horizon. Understanding how it works is key to making the most of your money.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">What is Renting Usa?</h3>
              <p>Renting Usa takes a different approach to growing or protecting your wealth. Each has its own risk profile, liquidity characteristics, and tax treatment that makes it suited to specific financial situations.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">Key Differences</h3>
              <p>The most important distinction between Mortgage and Renting Usa is how returns are generated and taxed. Mortgage typically suits growth-oriented investors while Renting Usa may appeal to those prioritizing stability or specific tax advantages.</p>
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
            <p className="text-sm text-green-700 leading-relaxed">Most financial advisors recommend not putting all your money in one option. A diversified approach - splitting between Mortgage and Renting Usa based on your specific goals - often provides better risk-adjusted returns than going all-in on either. Use this calculator to find your optimal split.</p>
          </div>
        </div>
      </div>

            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Mortgage Vs Renting USA Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          A $350,000 mortgage at 6.5% over 30 years results in a monthly payment of approximately <strong>$2,212</strong> with total interest paid of $446,320.
        </p>
        <p className="text-sm text-gray-600">
          Use this Mortgage Vs Renting USA USA 2026 tool to compare different loan amounts, interest rates, and terms to find your best option.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Rent vs Buy Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, comparing renting at $2,500/month vs buying a $450,000 home in your area, your rent vs buy calculator USA 2026 shows the 10-year financial outcome of each path with full assumptions.
        </p>
      </Card>

            <SEOContent
        title="Rent vs Buy Calculator USA – Is It Smarter to Rent or Buy a Home in 2026?"
        category="finance"
        intro={`Rent vs buy is the most consequential financial decision most Americans make, and the answer depends critically on local market conditions, how long you'll stay, and where you are in a housing cycle. The 30-year financial press narrative that buying always builds wealth while renting is 'throwing money away' is both oversimplified and demonstrably wrong in some markets and time periods.

The key insight that most rent vs buy comparisons miss: renters can invest the difference between their total housing cost and a homeowner's total housing cost. A $400,000 home with 20% down at 7% has a PITI of approximately $2,800/month. The same apartment might rent for $2,200/month. The renter's $600/month difference, invested in index funds at 8% for 10 years, produces approximately $110,000 — which partially or fully offsets the equity the buyer built.

The true comparison calculates total wealth after 10 years under each scenario: home equity (value minus remaining mortgage balance) for the buyer, versus investment portfolio plus any rent savings for the renter. In high price-to-rent ratio markets (San Francisco, New York, Boston), the renter often builds comparable or greater wealth. In low price-to-rent markets (Cleveland, Detroit, Buffalo), buying typically wins clearly.`}
        howItWorks={`Buyer total cost: Down payment + closing costs + (mortgage payments × months) + property taxes + insurance + maintenance (1-2% of value annually) + HOA (if applicable) - mortgage interest tax deduction - principal paydown + appreciation. Net equity = home value - remaining balance.

Renter total cost: Monthly rent (growing at 3-4% annually) × months + renter's insurance. Renter investment: (down payment equivalent + monthly cost difference) × investment return rate.

Price-to-rent ratio: A market P/R above 20 generally favors renting; below 15 generally favors buying. P/R = median home price ÷ (annual median rent). San Francisco P/R: ~40. Charlotte: ~15. This ratio provides a first-pass indication of which strategy is likely to favor wealth-building in a specific market.`}
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
        tipsSection={`Model the specific years you expect to stay, not theoretical long runs. Transaction costs of buying and selling (typically 7-10% of home value round-trip) require several years of appreciation just to break even. A buyer who sells after 2-3 years almost always loses money relative to renting — the home must appreciate enough to cover closing costs on both sides.

Factor in opportunity cost of the down payment. $80,000 down on a $400,000 home invested in index funds at 8% for 10 years grows to $172,717. This $92,717 in foregone investment gains is part of the true cost of homeownership that most comparisons ignore.

Run the analysis at different appreciation scenarios: 3%, 5%, and 7% annual appreciation. The home buying decision is essentially a leveraged real estate investment — and whether you're compensated for the leverage and illiquidity depends on local market dynamics.`}
        conclusion={`Homeownership creates non-financial value — stability, customization, community roots, and the psychological satisfaction of ownership — that no calculator fully captures. For many families, these factors justify buying even when the pure financial comparison is close or slightly favors renting.

The right question isn't 'buy or rent forever' — it's 'is buying the right financial decision for this specific home, at this price, in this market, at this stage of my life?' Answering that question with actual numbers rather than cultural defaults leads to better decisions. See [our Home Affordability Calculator](/calculators/finance/home-affordability-calculator) for the complementary question of what mortgage amount your income can support.`}

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
            { name: "Down Payment Calculator", href: "/calculators/finance/down-payment-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Rent vs Buy Calculator", href: "/calculators/finance/rent-vs-buy-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Mortgage Refinance Calculator", href: "/calculators/finance/mortgage-refinance-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Home Affordability Calculator", href: "/calculators/finance/home-affordability-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "ROI Calculator", href: "/calculators/finance/roi-calculator", icon: "🔗", desc: "Related financial planning" },
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
          { name: "401k vs Roth IRA Calculator", href: "/calculators/finance/401k-vs-roth-ira-calculator", icon: "📊", desc: "Free calculator" },          { name: "401k vs Taxable Account Calculator", href: "/calculators/finance/401k-vs-taxable-account-calculator", icon: "📊", desc: "Free calculator" },          { name: "401k vs Pension Calculator", href: "/calculators/finance/401k-vs-pension-calculator", icon: "📊", desc: "Free calculator" },          { name: "Roth IRA vs Traditional IRA Calculator", href: "/calculators/finance/roth-ira-vs-traditional-ira-calculator", icon: "📊", desc: "Free calculator" },          { name: "Roth IRA vs 401k Employer Match Calculator", href: "/calculators/finance/roth-ira-vs-401k-employer-match-calculator", icon: "📊", desc: "Free calculator" },          { name: "Roth IRA vs HSA Calculator", href: "/calculators/finance/roth-ira-vs-hsa-calculator", icon: "📊", desc: "Free calculator" },          { name: "HSA vs FSA Calculator", href: "/calculators/finance/hsa-vs-fsa-calculator", icon: "🏥", desc: "Free calculator" },          { name: "Sep IRA vs Solo 401k Calculator", href: "/calculators/finance/sep-ira-vs-solo-401k-calculator", icon: "💼", desc: "Free calculator" },          { name: "Bonds vs Cds USA Calculator", href: "/calculators/finance/bonds-vs-cds-usa-calculator", icon: "📋", desc: "Free calculator" },          { name: "Cd vs HYSA Calculator", href: "/calculators/finance/cd-vs-hysa-calculator", icon: "💰", desc: "Free calculator" },          { name: "I Bonds vs Tips Calculator", href: "/calculators/finance/i-bonds-vs-tips-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "S&P500 vs Bonds Calculator", href: "/calculators/finance/sp500-vs-bonds-calculator", icon: "📊", desc: "Free calculator" },
          ]}
        />

    </CalculatorLayout>
  )
}
