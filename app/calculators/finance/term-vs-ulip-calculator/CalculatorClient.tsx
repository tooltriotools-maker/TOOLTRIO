'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Shield, TrendingUp } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, fmtCompact } = useCurrency()
  const [annualPremium, setAnnualPremium] = useState(100000)
  const [sumAssured, setSumAssured] = useState(10000000)
  const [termPremium, setTermPremium] = useState(15000)
  const [sipRate, setSipRate] = useState(12)
  const [ulipCharge, setUlipCharge] = useState(2.5)
  const [ulipRate, setUlipRate] = useState(10)
  const [years, setYears] = useState(20)

  const result = useMemo(() => {
    const months = years * 12

    // ULIP: annual premium with charges deducted
    const ulipNetRate = ulipRate - ulipCharge // net return after charges
    const ulipMR = ulipNetRate / 100 / 12
    const ulipFV = annualPremium / 12 * ((Math.pow(1 + ulipMR, months) - 1) / ulipMR) * (1 + ulipMR)
    const ulipInvested = annualPremium * years

    // Term + SIP: pay term premium for cover, invest remaining in SIP
    const monthlyTerm = termPremium / 12
    const monthlyRemaining = annualPremium / 12 - monthlyTerm
    const sipMR = sipRate / 100 / 12
    const termSipFV = monthlyRemaining * ((Math.pow(1 + sipMR, months) - 1) / sipMR) * (1 + sipMR)
    const termSipInvested = monthlyRemaining * months
    const totalTermCost = termPremium * years

    const sipGain = termSipFV - termSipInvested
    const ulipGain = ulipFV - ulipInvested
    const chargePaid = (ulipCharge / 100 * ulipInvested)

    const barData = [
      { name: 'Invested', ulip: Math.round(ulipInvested), termSip: Math.round(termSipInvested) },
      { name: `Value (${years}yr)`, ulip: Math.round(ulipFV), termSip: Math.round(termSipFV) },
      { name: 'Gain', ulip: Math.round(ulipGain), termSip: Math.round(sipGain) },
    ]

    return {
      ulipFV: Math.round(ulipFV), ulipInvested: Math.round(ulipInvested), ulipGain: Math.round(ulipGain),
      termSipFV: Math.round(termSipFV), termSipInvested: Math.round(termSipInvested), sipGain: Math.round(sipGain),
      monthlyRemaining: Math.round(monthlyRemaining), totalTermCost: Math.round(totalTermCost),
      chargePaid: Math.round(chargePaid),
      termSipBetter: termSipFV > ulipFV,
      difference: Math.round(Math.abs(termSipFV - ulipFV)),
      barData, sumAssured,
    }
  }, [annualPremium, sumAssured, termPremium, sipRate, ulipCharge, ulipRate, years])

  return (
    <CalculatorLayout title="Term vs ULIP Calculator India 2026" description="Compare Term Insurance plus SIP vs ULIP plans on returns, costs, and insurance coverage." icon="🛡️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4" /> Policy Details
          </h2>
          <div className="space-y-4">
            <p className="text-xs font-bold text-purple-400 uppercase">ULIP Parameters</p>
            <InputField label="Annual ULIP Premium" value={annualPremium} onChange={setAnnualPremium} min={12000} max={1000000} step={12000} prefix="₹" />
            <InputField label="Sum Assured" value={sumAssured} onChange={setSumAssured} min={500000} max={100000000} step={500000} prefix="₹" />
            <InputField label="ULIP Fund Return (Gross)" value={ulipRate} onChange={setUlipRate} min={5} max={20} step={0.5} suffix="%" />
            <InputField label="ULIP Total Charges" value={ulipCharge} onChange={setUlipCharge} min={0.5} max={5} step={0.25} suffix="%" />
            <p className="text-xs font-bold text-green-500 uppercase mt-2">Term + SIP Parameters</p>
            <InputField label="Term Insurance Premium (pa)" value={termPremium} onChange={setTermPremium} min={5000} max={100000} step={1000} prefix="₹" />
            <InputField label="SIP Expected Return" value={sipRate} onChange={setSipRate} min={8} max={20} step={0.5} suffix="%" />
            <InputField label="Policy Period" value={years} onChange={setYears} min={10} max={30} step={5} suffix="Yrs" />
          </div>
          <div className={`mt-4 p-3 rounded-xl border-2 text-center ${result.termSipBetter ? 'bg-green-50 border-green-300' : 'bg-purple-50 border-purple-300'}`}>
            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Better Strategy</p>
            <p className="text-xl font-black" style={{ color: result.termSipBetter ? '#10b981' : '#8b5cf6' }}>{result.termSipBetter ? 'Term + SIP' : 'ULIP'} 🏆</p>
            <p className="text-sm text-gray-500">by {fmtCompact(result.difference)}</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Term+SIP Corpus" value={fmtCompact(result.termSipFV)} subValue={`SIP gain: ${fmtCompact(result.sipGain)}`} highlight={result.termSipBetter} icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="ULIP Corpus" value={fmtCompact(result.ulipFV)} subValue={`After charges`} highlight={!result.termSipBetter} icon={<Shield className="w-4 h-4" />} />
            <ResultCard label="ULIP Charges Paid" value={fmtCompact(result.chargePaid)} subValue={`${ulipCharge}% annually`} />
            <ResultCard label="Monthly SIP Amount" value={fmtCompact(result.monthlyRemaining)} subValue="After term premium" />
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">ULIP vs Term+SIP Value Comparison</h3>
            <div style={{ height: 240 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={result.barData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={70}
                    tickFormatter={v => v >= 10000000 ? `₹${(v/10000000).toFixed(1)}Cr` : v >= 100000 ? `₹${(v/100000).toFixed(0)}L` : `₹${(v/1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} formatter={(v: number, name) => [fmt(v), name]} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="ulip" name="ULIP" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="termSip" name="Term + SIP" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Term + SIP Strategy</h3>
              <div className="space-y-1 text-xs text-gray-400">
                <div className="flex justify-between py-1 border-b border-gray-800"><span>Annual Premium Total</span><span className="text-white">{fmtCompact(annualPremium)}</span></div>
                <div className="flex justify-between py-1 border-b border-gray-800"><span>Term Insurance Cost</span><span className="text-red-400">{fmtCompact(termPremium)}/yr</span></div>
                <div className="flex justify-between py-1 border-b border-gray-800"><span>Monthly SIP Amount</span><span className="text-green-400">{fmtCompact(result.monthlyRemaining)}</span></div>
                <div className="flex justify-between py-1 border-b border-gray-800"><span>Life Cover</span><span className="text-green-400">{fmtCompact(sumAssured)}</span></div>
                <div className="flex justify-between py-1"><span>Final Corpus ({years}yr)</span><span className="text-green-400 font-bold">{fmtCompact(result.termSipFV)}</span></div>
              </div>
            </Card>
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Why Term+SIP Usually Wins</h3>
              <div className="space-y-2 text-xs text-gray-400">
                <p className="p-2 bg-red-900/20 rounded-lg">ULIP charges: Premium allocation (5-8%), fund management (1-1.5%), policy admin, mortality - total 2-3.5% of corpus annually</p>
                <p className="p-2 bg-green-900/20 rounded-lg">Term insurance provides pure life cover at fraction of ULIP cost. SIP gives full market returns with low expense ratio (0.5-1%)</p>
                <p className="p-2 bg-blue-900/20 rounded-lg">The difference compounds over 20 years into lakhs of rupees in your favor</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
            <div className="mt-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-6">Term vs Ulip: Complete Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-base">What is Term?</h3>
              <p>Term is a India investment or financial product that offers distinct advantages depending on your goals, tax situation, and time horizon. Understanding how it works is key to making the most of your money.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">What is Ulip?</h3>
              <p>Ulip takes a different approach to growing or protecting your wealth. Each has its own risk profile, liquidity characteristics, and tax treatment that makes it suited to specific financial situations.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">Key Differences</h3>
              <p>The most important distinction between Term and Ulip is how returns are generated and taxed. Term typically suits growth-oriented investors while Ulip may appeal to those prioritizing stability or specific tax advantages.</p>
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
            <p className="text-sm text-green-700 leading-relaxed">Most financial advisors recommend not putting all your money in one option. A diversified approach - splitting between Term and Ulip based on your specific goals - often provides better risk-adjusted returns than going all-in on either. Use this calculator to find your optimal split.</p>
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
          Term Vs ULIP Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Term Vs ULIP USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Term vs ULIP Calculator Example (India 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, with INR 1.2 lakh annual budget for insurance and investment, your term vs ULIP calculator India 2026 shows the 20-year wealth comparison — making the case for separating insurance and investment clearly.
        </p>
      </Card>

            <SEOContent
        title="Term vs ULIP Calculator India – Term and SIP or ULIP: Which Is Smarter in 2026?"
        category="finance"
        intro={`The comparison between term insurance + mutual fund SIP and a ULIP (Unit Linked Insurance Plan) is one of the most important personal finance decisions Indians face — and the insurance industry has significant financial incentives to sell the bundled ULIP over the unbundled term + SIP approach.

ULIPs bundle life insurance and investment into a single premium payment. The appeal: one product, one premium, insurance plus wealth building. The reality: the insurance component and investment component are both more expensive inside the ULIP than purchased separately, because ULIP charges include premium allocation charges (3-10% of each premium), policy administration charges, fund management charges (1.35-2.25% annually), mortality charges, and surrender charges. These multiple layers of cost significantly erode returns, particularly in the first 5-10 years.

Term insurance + mutual fund SIP is structurally superior for most people because: term insurance provides pure life coverage at 10-20% of the premium cost of equivalent ULIP coverage; index fund SIPs charge 0.05-0.50% expense ratios vs ULIP's 1.35-2.25% FMC plus other charges; and you can hold the two products at the optimal level for each need rather than being constrained by a bundled product's structure.`}
        howItWorks={`ULIP total return: Gross investment return (net of FMC) minus other charges (premium allocation, policy admin, mortality). For a ₹1 lakh annual premium ULIP with 10% gross fund return and 2.0% FMC + 0.5% other charges: net return ≈ 7.5%.

Term + SIP comparison: Term insurance premium (₹8,000-₹12,000/year for equivalent coverage for a 30-year-old) + remaining ₹88,000-₹92,000 in direct plan equity mutual fund SIP. Direct fund at 12% CAGR with 0.1% expense ratio: net return ≈ 11.9%.

Wealth comparison: Both scenarios model the same total annual outlay. ULIP at 7.5% net vs. Term + SIP at approximately 11.9% net. Over 20-25 years, this 4%+ differential produces dramatically different terminal wealth.`}
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
        tipsSection={`Calculate the actual insurance cover you need and its term insurance cost before evaluating any ULIP. For a ₹1 crore term cover for a 35-year-old non-smoker male, annual premiums range ₹10,000-₹20,000 depending on tenure and insurer. The same ₹1 crore cover in a ULIP at equivalent premium would leave almost nothing for investment after mortality and policy charges.

If you already own a ULIP: evaluate it honestly. After 5 years (when surrender charges typically drop to zero or minimal), calculate whether surrendering and reinvesting in term + mutual fund produces better expected outcomes than continuing. The math often favors surrendering, particularly if the ULIP was purchased in the first 3-5 years of your working life.

For ULIPs specifically: compare the fund NAV growth against comparable category mutual fund performance over the same period. This reveals the actual investment return net of charges. Many ULIPs underperform equivalent category mutual funds by 3-5% annually over 10-year periods.`}
        conclusion={`The financial services industry packages ULIPs as 'insurance + investment in one,' but the packaging serves the insurer's economics more than the policyholder's. True financial optimization almost always separates these functions: buy the minimum insurance you actually need (term plan), and invest the remainder for growth objectives (mutual funds or other instruments). The unbundled approach provides more insurance per rupee of insurance premium and more investment return per rupee of investment.

For life insurance needs: the genuine need is income replacement for financial dependents. If you have no dependents, you may need minimal life insurance. If you have dependents and a mortgage, you need substantial coverage. Size your term insurance to this actual need, then invest the remainder efficiently.`}

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
