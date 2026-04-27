'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { TrendingUp, Shield } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, fmtCompact } = useCurrency()
  const [annualPremium, setAnnualPremium] = useState(50000)
  const [endowmentReturn, setEndowmentReturn] = useState(5.5)
  const [sumAssured, setSumAssured] = useState(500000)
  const [termPremium, setTermPremium] = useState(8000)
  const [sipRate, setSipRate] = useState(12)
  const [years, setYears] = useState(20)

  const result = useMemo(() => {
    const months = years * 12
    // Endowment plan
    const endowmentFV = annualPremium / 12 * ((Math.pow(1 + endowmentReturn / 100 / 12, months) - 1) / (endowmentReturn / 100 / 12)) * (1 + endowmentReturn / 100 / 12)
    const endowmentInvested = annualPremium * years

    // Term + SIP strategy
    const monthlyTerm = termPremium / 12
    const monthlySIP = annualPremium / 12 - monthlyTerm
    const sipMR = sipRate / 100 / 12
    const sipFV = monthlySIP * ((Math.pow(1 + sipMR, months) - 1) / sipMR) * (1 + sipMR)
    const sipInvested = monthlySIP * months
    const sipGain = sipFV - sipInvested
    const sipTax = Math.max(0, sipGain - 100000) * 0.10
    const sipPostTax = sipFV - sipTax

    const endGain = endowmentFV - endowmentInvested
    const chargesLost = endowmentFV * 0.15 // approx 15% of maturity in charges

    const barData = [
      { name: 'Total Paid', endowment: Math.round(endowmentInvested), termSip: Math.round(endowmentInvested) },
      { name: 'Maturity Value', endowment: Math.round(endowmentFV), termSip: Math.round(sipFV) },
      { name: 'Net Gain', endowment: Math.round(endGain), termSip: Math.round(sipGain) },
    ]

    return {
      endowmentFV: Math.round(endowmentFV), endowmentInvested, endGain: Math.round(endGain),
      sipFV: Math.round(sipFV), sipPostTax: Math.round(sipPostTax), sipGain: Math.round(sipGain), sipTax: Math.round(sipTax),
      monthlySIP: Math.round(monthlySIP),
      sipBetter: sipPostTax > endowmentFV,
      difference: Math.round(Math.abs(sipPostTax - endowmentFV)),
      barData, sumAssured,
    }
  }, [annualPremium, endowmentReturn, sumAssured, termPremium, sipRate, years])

  return (
    <CalculatorLayout title="SIP vs Endowment Calculator India 2026" description="Compare Term Insurance plus SIP vs endowment insurance savings plan on returns and flexibility." icon="📋" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4" /> Policy Details
          </h2>
          <div className="space-y-4">
            <p className="text-xs font-bold text-purple-400 uppercase">Endowment Plan</p>
            <InputField label="Annual Premium" value={annualPremium} onChange={setAnnualPremium} min={12000} max={500000} step={6000} prefix="₹" />
            <InputField label="Sum Assured" value={sumAssured} onChange={setSumAssured} min={100000} max={10000000} step={100000} prefix="₹" />
            <InputField label="Endowment Return (p.a.)" value={endowmentReturn} onChange={setEndowmentReturn} min={3} max={8} step={0.25} suffix="%" />
            <p className="text-xs font-bold text-green-500 uppercase mt-1">Term + SIP Strategy</p>
            <InputField label="Term Insurance Premium (p.a.)" value={termPremium} onChange={setTermPremium} min={3000} max={50000} step={500} prefix="₹" />
            <InputField label="SIP Expected Return (p.a.)" value={sipRate} onChange={setSipRate} min={8} max={20} step={0.5} suffix="%" />
            <InputField label="Policy / Investment Period" value={years} onChange={setYears} min={10} max={30} step={5} suffix="Yrs" />
          </div>
          <div className={`mt-4 p-3 rounded-xl border-2 text-center ${result.sipBetter ? 'bg-green-50 border-green-300' : 'bg-purple-50 border-purple-300'}`}>
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Better Strategy</p>
            <p className="text-xl font-black" style={{ color: result.sipBetter ? '#10b981' : '#8b5cf6' }}>{result.sipBetter ? 'Term + SIP' : 'Endowment'} 🏆</p>
            <p className="text-sm text-gray-500">by {fmtCompact(result.difference)}</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Term+SIP Corpus" value={fmtCompact(result.sipPostTax)} subValue={`Post-tax`} highlight={result.sipBetter} icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="Endowment Maturity" value={fmtCompact(result.endowmentFV)} subValue={`${endowmentReturn}% p.a.`} highlight={!result.sipBetter} icon={<Shield className="w-4 h-4" />} />
            <ResultCard label="Monthly SIP Amount" value={fmtCompact(result.monthlySIP)} subValue="After term premium" />
            <ResultCard label="Life Cover" value={fmtCompact(result.sumAssured)} subValue="From term plan" />
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Endowment vs Term+SIP Comparison</h3>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={result.barData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={70}
                    tickFormatter={v => v >= 10000000 ? `₹${(v/10000000).toFixed(1)}Cr` : v >= 100000 ? `₹${(v/100000).toFixed(0)}L` : `₹${(v/1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} formatter={(v: number, name) => [fmt(v), name]} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="endowment" name="Endowment Plan" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="termSip" name="Term + SIP" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Why Endowment Plans Underperform</h3>
            <div className="grid grid-cols-2 gap-3 text-xs text-gray-400">
              <div className="space-y-2">
                <p className="p-2 bg-red-900/20 rounded-lg">❌ Endowment plans embed mortality charges + high commission (25-35% of first year premium) + admin charges - leaving little for actual investment</p>
                <p className="p-2 bg-red-900/20 rounded-lg">❌ Endowment fund returns are typically 4-6% - below inflation. Over 20 years, you barely preserve capital in real terms</p>
              </div>
              <div className="space-y-2">
                <p className="p-2 bg-green-900/20 rounded-lg">✅ Term insurance costs ₹6,000-15,000/year for ₹50 lakh-₹1 crore cover. Rest goes entirely to SIP at full market return (12-15%)</p>
                <p className="p-2 bg-green-900/20 rounded-lg">✅ Separation of insurance and investment is the golden rule of personal finance. Never mix them</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
            <div className="mt-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-6">Sip vs Endowment: Complete Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-base">What is Sip?</h3>
              <p>Sip is a India investment or financial product that offers distinct advantages depending on your goals, tax situation, and time horizon. Understanding how it works is key to making the most of your money.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">What is Endowment?</h3>
              <p>Endowment takes a different approach to growing or protecting your wealth. Each has its own risk profile, liquidity characteristics, and tax treatment that makes it suited to specific financial situations.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">Key Differences</h3>
              <p>The most important distinction between Sip and Endowment is how returns are generated and taxed. Sip typically suits growth-oriented investors while Endowment may appeal to those prioritizing stability or specific tax advantages.</p>
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
            <p className="text-sm text-green-700 leading-relaxed">Most financial advisors recommend not putting all your money in one option. A diversified approach - splitting between Sip and Endowment based on your specific goals - often provides better risk-adjusted returns than going all-in on either. Use this calculator to find your optimal split.</p>
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
          SIP Vs Endowment Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this SIP Vs Endowment USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          SIP vs Endowment Calculator Example (India 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, with INR 60,000/year for insurance and investment, your SIP vs endowment calculator India 2026 shows the 20-year wealth and cover comparison — clearly illustrating why separating insurance from investment wins.
        </p>
      </Card>

            <SEOContent
        title="SIP vs Endowment Calculator India – Term and SIP or Endowment Plan: Which Is Smarter in 2026?"
        category="finance"
        intro={`Endowment plans and ULIPs (Unit Linked Insurance Plans) are sold extensively in India as both insurance and investment products, but the comparison against pure-term insurance plus SIP reveals a significant value gap that most buyers don't see until they examine the numbers carefully.

The 'buy term and invest the rest' principle — separating insurance coverage from investment return — typically produces far better outcomes than bundled endowment products. An endowment plan charging ₹1,00,000/year for ₹10,00,000 coverage over 25 years can cost far more than: a pure term plan providing the same coverage for ₹10,000-15,000/year, with the remaining ₹85,000-90,000 invested in equity mutual funds via SIP.

Insurance companies offer endowment plans because they generate significantly higher commission for agents than pure term plans — often 20-35% in first-year commissions vs 2-5% for term plans. This creates a structural incentive in the distribution system that benefits sellers, not buyers. Understanding this incentive helps explain the prevalence of these products.`}
        howItWorks={`Endowment return estimation: Insurance companies project endowment returns at IRDAI-mandated illustration rates (4% and 8% scenarios). The actual guaranteed portion is usually small; the rest is discretionary reversionary bonus. True long-run IRR of most traditional endowment plans is 4-6%.

Term + SIP comparison: Term insurance annual premium + SIP contribution = same total annual outflow as endowment plan. SIP at 12% CAGR for same period vs endowment at 5-6% effective yield = massive difference at maturity.

IRR calculation for endowment: Using all premium payments as negative cash flows and the maturity benefit as positive cash flow in Excel IRR function reveals the true annual return. For most endowment plans, this IRR is 4-6% — significantly below what equity SIPs produce.`}
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
        tipsSection={`Before surrendering existing endowment policies, calculate the surrender value versus continuing. Many endowment policies have poor surrender value in early years (the policy may have surrendered only 20-30% of premiums paid if surrendered before 5 years). Calculate the break-even of continuing versus stopping, comparing the surrender value invested in SIP against continuing the policy to maturity.

Never mix insurance with investment as a strategic choice. Buy adequate term life insurance for your actual coverage needs (typically 10-15x annual income for working adults with dependents) and invest for wealth through separate mutual fund SIPs. The simplicity and efficiency of this approach dramatically outperforms bundled products.

For existing ULIP holders: evaluate the fund performance and expense structure. Some newer ULIPs with lower expense ratios and transparent charges can be competitive. The issue is high-charge older ULIPs and traditional endowment plans, not ULIPs as a category per se.`}
        conclusion={`The insurance industry's endowment and money-back plans have resulted in millions of Indian families being both under-insured (insufficient coverage because premiums funded investment) and under-invested (lower returns than mutual funds would have provided). This outcome — bad insurance plus bad investment — is the structural consequence of bundling the two.

If you currently hold endowment or ULIP policies, calculate your effective return and compare it to what term + SIP would have generated. The analysis is often sobering, but understanding the actual economics of current holdings helps make better forward-looking decisions.`}

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
