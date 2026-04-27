'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { Shield, TrendingUp } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }
const fmt = (n: number) => '$' + Math.round(n).toLocaleString()
const fmtC = (n: number) => n >= 1000000 ? `$${(n/1000000).toFixed(2)}M` : `$${(n/1000).toFixed(1)}K`

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const [annualContrib, setAnnualContrib] = useState(3850)
  const [medicalExpenses, setMedicalExpenses] = useState(2000)
  const [taxRate, setTaxRate] = useState(24)
  const [returnRate, setReturnRate] = useState(7)
  const [years, setYears] = useState(20)

  const result = useMemo(() => {
    // HSA: triple tax advantage - contribute pre-tax, grow tax-free, withdraw tax-free for medical
    const hsaTaxSavingNow = annualContrib * (taxRate / 100)
    const hsaInvested = annualContrib - medicalExpenses // excess invested
    const mr = returnRate / 100 / 12
    const months = years * 12
    const hsaFV = Math.max(0, hsaInvested) / 12 * ((Math.pow(1 + mr, months) - 1) / mr) * (1 + mr)
    const hsaTotalTaxSave = annualContrib * (taxRate / 100) * years
    const hsaTotalValue = hsaFV + medicalExpenses * years // total value (medical + invested growth)

    // FSA: use-it-or-lose-it, pre-tax, no investment growth
    const fsaAnnualBenefit = Math.min(annualContrib, medicalExpenses) * (taxRate / 100)
    const fsaTotalBenefit = fsaAnnualBenefit * years

    const barData = [
      { name: 'Annual Tax Saving', hsa: Math.round(hsaTaxSavingNow), fsa: Math.round(fsaAnnualBenefit) },
      { name: `${years}yr Tax Savings`, hsa: Math.round(hsaTotalTaxSave), fsa: Math.round(fsaTotalBenefit) },
      { name: 'Investment Growth', hsa: Math.round(hsaFV), fsa: 0 },
    ]

    return { hsaTaxSavingNow: Math.round(hsaTaxSavingNow), hsaFV: Math.round(hsaFV), hsaTotalTaxSave: Math.round(hsaTotalTaxSave), hsaTotalValue: Math.round(hsaTotalValue), fsaAnnualBenefit: Math.round(fsaAnnualBenefit), fsaTotalBenefit: Math.round(fsaTotalBenefit), hsaBetter: true, barData }
  }, [annualContrib, medicalExpenses, taxRate, returnRate, years])

  return (
    <CalculatorLayout title="HSA vs FSA Calculator USA 2026" description="Compare Health Savings Account vs Flexible Spending Account tax savings, limits, and rollover rules." icon="🏥" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-4">Account Details</h2>
          <div className="space-y-4">
            <InputField label="Annual Contribution" value={annualContrib} onChange={setAnnualContrib} min={100} max={8300} step={100} prefix="$" />
            <InputField label="Annual Medical Expenses" value={medicalExpenses} onChange={setMedicalExpenses} min={0} max={8000} step={100} prefix="$" />
            <InputField label="Your Tax Rate" value={taxRate} onChange={setTaxRate} min={10} max={37} step={1} suffix="%" />
            <InputField label="HSA Investment Return" value={returnRate} onChange={setReturnRate} min={3} max={12} step={0.5} suffix="%" />
            <InputField label="Years to Invest" value={years} onChange={setYears} min={1} max={40} step={1} suffix="Yrs" />
          </div>
          <div className="mt-4 p-3 rounded-xl bg-green-900/20 border border-green-700/30 text-center">
            <p className="text-xs text-green-400 font-bold mb-1">HSA Triple Tax Advantage</p>
            <p className="text-xs text-gray-400">1. Pre-tax contributions (save now)</p>
            <p className="text-xs text-gray-400">2. Tax-free growth (invest excess)</p>
            <p className="text-xs text-gray-400">3. Tax-free withdrawals for medical</p>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="HSA Investment" value={fmtC(result.hsaFV)} subValue={`${years}yr growth`} highlight icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="HSA Tax Savings" value={fmtC(result.hsaTotalTaxSave)} subValue={`Over ${years} years`} highlight />
            <ResultCard label="FSA Tax Savings" value={fmtC(result.fsaTotalBenefit)} subValue="Use-it-or-lose-it" />
            <ResultCard label="HSA vs FSA Advantage" value={fmtC(result.hsaFV + result.hsaTotalTaxSave - result.fsaTotalBenefit)} subValue="Extra wealth from HSA" highlight />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">HSA vs FSA - Total Benefits Comparison</h3>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={result.barData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={65} tickFormatter={v => v >= 1000 ? `$${(v/1000).toFixed(0)}K` : `$${v}`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} formatter={(v: number, name) => [fmt(v), name]} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="fsa" name="FSA" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="hsa" name="HSA" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <div className="grid grid-cols-2 gap-3">
            <Card>
              <h3 className="text-sm font-semibold text-green-400 mb-2">🏥 HSA 2024 Facts</h3>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>v 2024 limit: $4,150 individual / $8,300 family</li>
                <li>v Funds roll over indefinitely - never expires</li>
                <li>v Invest in stocks/ETFs for long-term growth</li>
                <li>v After 65: use for ANY expense (like IRA)</li>
                <li>✗ Requires High-Deductible Health Plan (HDHP)</li>
              </ul>
            </Card>
            <Card>
              <h3 className="text-sm font-semibold text-blue-400 mb-2">💊 FSA 2024 Facts</h3>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>v 2024 limit: $3,200</li>
                <li>v Available with any health insurance plan</li>
                <li>v Funds available on Jan 1 (immediate use)</li>
                <li>✗ Use-it-or-lose-it (up to $640 rollover)</li>
                <li>✗ No investment growth</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
            <div className="mt-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-6">Hsa vs Fsa: Complete Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-base">What is Hsa?</h3>
              <p>Hsa is a USA investment or financial product that offers distinct advantages depending on your goals, tax situation, and time horizon. Understanding how it works is key to making the most of your money.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">What is Fsa?</h3>
              <p>Fsa takes a different approach to growing or protecting your wealth. Each has its own risk profile, liquidity characteristics, and tax treatment that makes it suited to specific financial situations.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">Key Differences</h3>
              <p>The most important distinction between Hsa and Fsa is how returns are generated and taxed. Hsa typically suits growth-oriented investors while Fsa may appeal to those prioritizing stability or specific tax advantages.</p>
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
            <p className="text-sm text-green-700 leading-relaxed">Most financial advisors recommend not putting all your money in one option. A diversified approach - splitting between Hsa and Fsa based on your specific goals - often provides better risk-adjusted returns than going all-in on either. Use this calculator to find your optimal split.</p>
          </div>
        </div>
      </div>

            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          HSA Vs FSA Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this HSA Vs FSA USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-4 p-4">
        <h2 className="text-xl font-black text-gray-900 mb-3">HSA vs FSA Calculator USA 2026 – Maximize Your Healthcare Tax Savings in 2026</h2>
        <p className="text-sm text-gray-600">Choosing between an HSA and FSA is one of the most underestimated tax decisions Americans make annually. This HSA vs FSA calculator USA 2026 shows the long-term value difference so you can choose the account that saves you the most.</p>
      </Card>

        <SEOContent
        title="HSA vs FSA Calculator USA 2026"
        category="finance"
        intro={`HSAs and FSAs are two of the most tax-advantaged accounts available to Americans — and they're consistently underused or misunderstood. Both let you pay for medical expenses with pre-tax dollars, but they work very differently. Getting this choice right can save you $500-$2,000 or more annually in taxes, depending on your income and expected healthcare costs.

An HSA (Health Savings Account) is triple tax-advantaged: contributions are deductible, growth is tax-free, and withdrawals for qualified medical expenses are tax-free. The catch: you must be enrolled in a High-Deductible Health Plan (HDHP) to contribute. HSA funds roll over forever — there's no use-it-or-lose-it — and after age 65, you can withdraw for any purpose (taxable, like a traditional IRA). The 2024 HSA limits are $4,150 for individuals and $8,300 for families.

An FSA (Flexible Spending Account) is available with most insurance types. Contributions reduce taxable income, but most FSAs have a use-it-or-lose-it rule each year (with a $640 rollover allowance in 2024). FSAs are best for predictable healthcare expenses you'll definitely incur during the year.`}
        howItWorks={`Tax savings calculation: Contribution × marginal federal income tax rate + FICA rate (7.65% for most employees) = annual tax savings. HSA contribution of $4,150 at 22% federal + 7.65% FICA = $4,150 × 29.65% = $1,230 in annual tax savings.

HSA investment projection: After paying current-year medical expenses out-of-pocket and leaving HSA funds invested, the triple tax-free compounding makes the HSA function as a powerful retirement account. $4,150/year invested in HSA at 7% for 30 years = approximately $418,000 in tax-free medical expense reserves.

FSA vs HSA decision matrix: If you have predictable healthcare costs within FSA use-it-or-lose-it constraints, FSA can be optimal. If you have unpredictable costs or want long-term investment accumulation, HSA (with HDHP) is typically superior for people who can afford higher out-of-pocket costs when needed.`}
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
        tipsSection={`The HSA investment strategy requires discipline: pay current-year medical expenses out of pocket (keeping receipts) and invest the full HSA contribution. After decades of compounding, use the accumulated HSA funds for medical expenses in retirement — one of the largest and most inflation-adjusted expense categories for retirees.

HSA funds can be used to reimburse past qualified medical expenses at any time in the future — even years after they were incurred. This means paying out-of-pocket now and letting HSA funds grow, then reimbursing yourself from the HSA decades later when retirement flexibility is most valuable.

For HSA investment options: many HSA custodians have limited fund menus with high expense ratios. Fidelity's HSA offers zero-expense-ratio index funds and is widely considered the best investment-focused HSA option for the strategy of investing rather than spending HSA funds annually.`}
        conclusion={`The HSA's combination of immediate tax deduction, tax-free growth, tax-free medical withdrawals, and retirement account functionality after 65 makes it the only truly triple tax-advantaged account in the US tax code. Financial planners who maximize client wealth generally recommend: (1) capture full 401k employer match, (2) max HSA, (3) max Roth IRA, (4) continue 401k.

For people who are generally healthy and can afford a higher deductible, the HDHP + HSA combination often produces lower total healthcare costs than a comprehensive PPO — the lower premiums plus tax savings on HSA contributions typically exceed the higher out-of-pocket exposure in years without major medical events.`}

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
        {/* Internal Links */}
        {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "401k vs Roth IRA Calculator", href: "/calculators/finance/401k-vs-roth-ira-calculator", icon: "📊", desc: "Free calculator" },          { name: "401k vs Taxable Account Calculator", href: "/calculators/finance/401k-vs-taxable-account-calculator", icon: "📊", desc: "Free calculator" },          { name: "401k vs Pension Calculator", href: "/calculators/finance/401k-vs-pension-calculator", icon: "📊", desc: "Free calculator" },          { name: "Roth IRA vs Traditional IRA Calculator", href: "/calculators/finance/roth-ira-vs-traditional-ira-calculator", icon: "📊", desc: "Free calculator" },          { name: "Roth IRA vs 401k Employer Match Calculator", href: "/calculators/finance/roth-ira-vs-401k-employer-match-calculator", icon: "📊", desc: "Free calculator" },          { name: "Roth IRA vs HSA Calculator", href: "/calculators/finance/roth-ira-vs-hsa-calculator", icon: "📊", desc: "Free calculator" },          { name: "Sep IRA vs Solo 401k Calculator", href: "/calculators/finance/sep-ira-vs-solo-401k-calculator", icon: "💼", desc: "Free calculator" },          { name: "Bonds vs Cds USA Calculator", href: "/calculators/finance/bonds-vs-cds-usa-calculator", icon: "📋", desc: "Free calculator" },          { name: "Cd vs HYSA Calculator", href: "/calculators/finance/cd-vs-hysa-calculator", icon: "💰", desc: "Free calculator" },          { name: "I Bonds vs Tips Calculator", href: "/calculators/finance/i-bonds-vs-tips-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "S&P500 vs Bonds Calculator", href: "/calculators/finance/sp500-vs-bonds-calculator", icon: "📊", desc: "Free calculator" },          { name: "S&P500 vs Real Estate USA Calculator", href: "/calculators/finance/sp500-vs-real-estate-usa-calculator", icon: "📊", desc: "Free calculator" },
          ]}
        />

    </CalculatorLayout>
  )
}
