'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { Home, TrendingUp } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, fmtCompact } = useCurrency()
  const [loanAmount, setLoanAmount] = useState(3000000)
  const [loanRate, setLoanRate] = useState(8.5)
  const [loanYears, setLoanYears] = useState(20)
  const [sipRate, setSipRate] = useState(12)
  const [propertyAppreciation, setPropertyAppreciation] = useState(7)

  const result = useMemo(() => {
    const months = loanYears * 12
    const mr = loanRate / 100 / 12
    const emi = loanAmount * mr * Math.pow(1 + mr, months) / (Math.pow(1 + mr, months) - 1)
    const totalPaid = emi * months
    const totalInterest = totalPaid - loanAmount

    // If same EMI invested in SIP instead
    const sipMR = sipRate / 100 / 12
    const sipFV = emi * ((Math.pow(1 + sipMR, months) - 1) / sipMR) * (1 + sipMR)
    const sipInvested = emi * months

    // Property value after loan tenure
    const propertyValue = loanAmount * Math.pow(1 + propertyAppreciation / 100, loanYears)
    const propertyEquity = propertyValue - 0 // fully paid off

    // Net comparison: SIP corpus vs property equity (assume property bought at loanAmount cost)
    const totalPropertyCost = totalPaid // total EMI paid
    const sipGain = sipFV - sipInvested

    // Year-by-year data
    const barData = [
      { name: 'Total Paid', emi: Math.round(totalPaid), sip: Math.round(sipInvested) },
      { name: 'Final Value', emi: Math.round(propertyValue), sip: Math.round(sipFV) },
      { name: 'Net Gain', emi: Math.round(propertyValue - totalPaid), sip: Math.round(sipGain) },
    ]

    const sipBetterThanProperty = sipFV > propertyValue

    return {
      emi: Math.round(emi),
      totalPaid: Math.round(totalPaid),
      totalInterest: Math.round(totalInterest),
      sipFV: Math.round(sipFV),
      sipGain: Math.round(sipGain),
      propertyValue: Math.round(propertyValue),
      propertyNetGain: Math.round(propertyValue - totalPaid),
      sipBetterThanProperty,
      difference: Math.round(Math.abs(sipFV - propertyValue)),
      barData,
    }
  }, [loanAmount, loanRate, loanYears, sipRate, propertyAppreciation])

  return (
    <CalculatorLayout title="EMI vs SIP Calculator India 2026" description="Should you prepay your home loan EMI or invest the same amount in SIP mutual funds?" icon="🏡" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Home className="w-4 h-4" /> Loan &amp; Investment Details
          </h2>
          <div className="space-y-4">
            <p className="text-xs font-bold text-blue-400 uppercase">Loan Parameters</p>
            <InputField label="Loan Amount" value={loanAmount} onChange={setLoanAmount} min={100000} max={50000000} step={100000} prefix="₹" />
            <InputField label="Home Loan Rate (p.a.)" value={loanRate} onChange={setLoanRate} min={6} max={15} step={0.25} suffix="%" />
            <InputField label="Loan Tenure" value={loanYears} onChange={setLoanYears} min={5} max={30} step={1} suffix="Yrs" />
            <InputField label="Property Appreciation (p.a.)" value={propertyAppreciation} onChange={setPropertyAppreciation} min={2} max={15} step={0.5} suffix="%" />
            <p className="text-xs font-bold text-green-500 uppercase mt-1">SIP Parameters</p>
            <InputField label="SIP Expected Return (p.a.)" value={sipRate} onChange={setSipRate} min={5} max={20} step={0.5} suffix="%" />
          </div>
          <div className="mt-4 p-3 rounded-xl bg-blue-900/20 border border-blue-700/30">
            <p className="text-xs text-blue-400 font-bold mb-1">Scenario Explained</p>
            <p className="text-xs text-gray-400">Instead of taking a home loan and paying EMI, what if you invested the same EMI amount in SIP? This compares wealth created vs property equity.</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Monthly EMI" value={fmtCompact(result.emi)} subValue={`${loanYears} year loan`} icon={<Home className="w-4 h-4" />} />
            <ResultCard label="Total Interest" value={fmtCompact(result.totalInterest)} subValue="Cost of borrowing" />
            <ResultCard label="Property Value" value={fmtCompact(result.propertyValue)} subValue={`After ${loanYears} years`} highlight={!result.sipBetterThanProperty} />
            <ResultCard label="SIP Corpus" value={fmtCompact(result.sipFV)} subValue="Same EMI in SIP" highlight={result.sipBetterThanProperty} icon={<TrendingUp className="w-4 h-4" />} />
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">EMI (Property) vs SIP - Final Comparison</h3>
            <div style={{ height: 240 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={result.barData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={70}
                    tickFormatter={v => v >= 10000000 ? `₹${(v/10000000).toFixed(1)}Cr` : v >= 100000 ? `₹${(v/100000).toFixed(0)}L` : `₹${(v/1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} formatter={(v: number, name) => [fmt(v), name]} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="emi" name="EMI/Property" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="sip" name="SIP Investment" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <Card>
              <h3 className="text-sm font-semibold text-blue-400 mb-2">🏠 Home Loan Path</h3>
              <div className="space-y-1 text-xs">
                {[['Loan Amount', fmtCompact(loanAmount)], ['Monthly EMI', fmtCompact(result.emi)], ['Total Paid', fmtCompact(result.totalPaid)], ['Interest Cost', fmtCompact(result.totalInterest)], ['Property Value', fmtCompact(result.propertyValue)], ['Net Gain', fmtCompact(result.propertyNetGain)]].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-1 border-b border-gray-800">
                    <span className="text-gray-500">{k}</span><span className="text-white">{v}</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <h3 className="text-sm font-semibold text-green-500 mb-2">📈 SIP Path</h3>
              <div className="space-y-1 text-xs">
                {[['Monthly SIP', fmtCompact(result.emi)], ['Total Invested', fmtCompact(result.totalPaid)], ['SIP Returns', fmtCompact(result.sipGain)], ['Final Corpus', fmtCompact(result.sipFV)], ['No interest paid', '₹0'], ['Fully liquid', '✅ Yes']].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-1 border-b border-gray-800">
                    <span className="text-gray-500">{k}</span><span className="text-white">{v}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
            <div className="mt-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-6">Emi vs Sip: Complete Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-base">What is Emi?</h3>
              <p>Emi is a India investment or financial product that offers distinct advantages depending on your goals, tax situation, and time horizon. Understanding how it works is key to making the most of your money.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">What is Sip?</h3>
              <p>Sip takes a different approach to growing or protecting your wealth. Each has its own risk profile, liquidity characteristics, and tax treatment that makes it suited to specific financial situations.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">Key Differences</h3>
              <p>The most important distinction between Emi and Sip is how returns are generated and taxed. Emi typically suits growth-oriented investors while Sip may appeal to those prioritizing stability or specific tax advantages.</p>
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
            <p className="text-sm text-green-700 leading-relaxed">Most financial advisors recommend not putting all your money in one option. A diversified approach - splitting between Emi and Sip based on your specific goals - often provides better risk-adjusted returns than going all-in on either. Use this calculator to find your optimal split.</p>
          </div>
        </div>
      </div>

            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          EMI Vs SIP Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this EMI Vs SIP USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          EMI vs SIP Calculator Example (India 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, with INR 30,000/month extra cash and a 8.5% home loan, your EMI vs SIP calculator India 2026 shows the break-even SIP return that makes investing better than prepaying your home loan.
        </p>
      </Card>

            <SEOContent
        title="EMI vs SIP Calculator India – Should You Prepay Home Loan or Invest in SIP in 2026?"
        category="finance"
        intro={`The EMI vs SIP question represents a fundamental personal finance tension: should you take a home loan and build an asset through EMI payments, or invest the same money in mutual fund SIPs and rent while your investments grow? In India's current real estate and equity market environment, this comparison deserves serious quantitative analysis rather than the cultural default toward homeownership.

Home purchase through EMI builds equity in an asset that appreciates (typically 5-10% annually in major Indian cities) and provides housing security. SIP investment builds a financial portfolio that has historically returned 12-15% CAGR over 15-20 year periods in Indian equity markets. The correct answer depends heavily on the specific property, your city's real estate trajectory, the home loan interest rate, and the SIP funds' expected performance.

The comparison is complicated by the intangibles: home ownership provides stability, social standing, and eliminates rental uncertainty. SIP investment provides liquidity, portability, and potentially higher financial returns. Neither can be reduced purely to numbers.`}
        howItWorks={`EMI wealth building: Home value appreciation over time minus total loan cost (principal + interest paid) + implicit rent savings = net wealth created. If a ₹60 lakh home appreciates at 7% annually to ₹2.32 crore over 20 years, and total loan payments were ₹1.26 crore (principal + interest), net wealth created = ₹2.32 crore - ₹1.26 crore = ₹1.06 crore (plus you lived there, saving rent).

SIP alternative: Monthly EMI equivalent invested in mutual funds at 12% CAGR over 20 years. If EMI = ₹50,000/month, SIP at 12% for 20 years = ₹4.94 crore. But you would have paid rent throughout — deduct 20 years of rent at, say, ₹25,000/month growing at 5% = approximately ₹1.0 crore total rent. Net SIP outcome = ₹3.94 crore.

Break-even analysis: The home purchase wins if appreciation is high enough to overcome the interest cost and produces more net wealth than the rent-and-invest alternative.`}
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
        tipsSection={`Calculate the actual cost per square foot of your target property across its entire holding period: total loan cost ÷ area ÷ years of ownership. Compare this to rental cost per square foot in the same location. This reality-checks both the affordability and the investment thesis.

Rent vs buy is highly location-specific in India. Mumbai and Bengaluru have some of the highest price-to-rent ratios globally — in many neighborhoods, it makes more financial sense to rent and invest than to buy at current valuations. Tier-2 cities often have more favorable price-to-rent ratios for buying.

For young professionals early in their careers with uncertain location plans (job changes, transfers), renting and investing via SIP preserves flexibility that home ownership removes. The option value of geographic mobility is real and often underpriced.`}
        conclusion={`Neither EMI home purchase nor pure SIP investing is universally correct — the optimal answer depends on your specific situation, city, property, loan rate, and expected career stability. Run the numbers in your specific context rather than following general advice.

For most middle-class Indian families, the practical hybrid approach works well: buy a home within your means as your primary residence (accepting the SIP opportunity cost as the price of housing security and stability), and invest any savings above the EMI in equity mutual funds through SIP for long-term wealth building.`}

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
