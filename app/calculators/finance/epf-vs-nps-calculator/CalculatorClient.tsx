'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Briefcase, Target } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, fmtCompact } = useCurrency()
  const [basicSalary, setBasicSalary] = useState(50000)
  const [currentAge, setCurrentAge] = useState(28)
  const [retirementAge, setRetirementAge] = useState(60)
  const [epfRate, setEpfRate] = useState(8.15)
  const [npsRate, setNpsRate] = useState(10)
  const [voluntaryNps, setVoluntaryNps] = useState(5000)

  const result = useMemo(() => {
    const years = Math.max(1, retirementAge - currentAge)
    const months = years * 12

    // EPF: 12% of basic from employee + 12% employer (3.67% to EPF, 8.33% to EPS capped at ₹1250)
    const employeeEPF = basicSalary * 0.12
    const employerEPF = Math.min(basicSalary * 0.0367, basicSalary * 0.0367) // simplified: 3.67% to EPF
    const totalMonthlyEPF = employeeEPF + employerEPF
    const epfMR = epfRate / 100 / 12
    const epfFV = totalMonthlyEPF * ((Math.pow(1 + epfMR, months) - 1) / epfMR) * (1 + epfMR)

    // NPS: employee can contribute any amount, employer contributes 10% of basic (NPS Tier-1)
    const employerNPS = basicSalary * 0.10
    const totalMonthlyNPS = voluntaryNps + employerNPS
    const npsMR = npsRate / 100 / 12
    const npsFV = totalMonthlyNPS * ((Math.pow(1 + npsMR, months) - 1) / npsMR) * (1 + npsMR)
    const npsLumpsum = npsFV * 0.60
    const npsAnnuityCorpus = npsFV * 0.40
    const monthlyPension = (npsAnnuityCorpus * 0.06) / 12

    const epfInvested = totalMonthlyEPF * months
    const npsInvested = totalMonthlyNPS * months

    const yearlyData = Array.from({ length: years }, (_, i) => {
      const y = i + 1; const m = y * 12
      const eFV = totalMonthlyEPF * ((Math.pow(1 + epfMR, m) - 1) / epfMR) * (1 + epfMR)
      const nFV = totalMonthlyNPS * ((Math.pow(1 + npsMR, m) - 1) / npsMR) * (1 + npsMR)
      return { year: y, epf: Math.round(eFV), nps: Math.round(nFV), epfInvested: Math.round(totalMonthlyEPF * m), npsInvested: Math.round(totalMonthlyNPS * m) }
    })

    return {
      epfFV: Math.round(epfFV), epfInvested: Math.round(epfInvested),
      epfGain: Math.round(epfFV - epfInvested),
      totalMonthlyEPF: Math.round(totalMonthlyEPF), employeeEPF: Math.round(employeeEPF), employerEPF: Math.round(employerEPF),
      npsFV: Math.round(npsFV), npsInvested: Math.round(npsInvested),
      npsLumpsum: Math.round(npsLumpsum), npsAnnuityCorpus: Math.round(npsAnnuityCorpus),
      monthlyPension: Math.round(monthlyPension),
      totalMonthlyNPS: Math.round(totalMonthlyNPS), employerNPS: Math.round(employerNPS),
      epfBetter: epfFV > npsFV, years,
      difference: Math.round(Math.abs(epfFV - npsFV)),
      yearlyData,
    }
  }, [basicSalary, currentAge, retirementAge, epfRate, npsRate, voluntaryNps])

  return (
    <CalculatorLayout title="EPF vs NPS Calculator India 2026" description="Compare EPF guaranteed 8.15% returns vs NPS market-linked 10–12% for retirement planning." icon="💼" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Briefcase className="w-4 h-4" /> Employee Details
          </h2>
          <div className="space-y-4">
            <InputField label="Basic Salary (Monthly)" value={basicSalary} onChange={setBasicSalary} min={10000} max={500000} step={1000} prefix="₹" />
            <InputField label="Current Age" value={currentAge} onChange={setCurrentAge} min={18} max={55} step={1} suffix="Yrs" />
            <InputField label="Retirement Age" value={retirementAge} onChange={setRetirementAge} min={50} max={70} step={1} suffix="Yrs" />
            <InputField label="EPF Interest Rate" value={epfRate} onChange={setEpfRate} min={7} max={10} step={0.05} suffix="%" />
            <InputField label="NPS Expected Return" value={npsRate} onChange={setNpsRate} min={7} max={15} step={0.5} suffix="%" />
            <InputField label="Voluntary NPS (Monthly)" value={voluntaryNps} onChange={setVoluntaryNps} min={0} max={100000} step={500} prefix="₹" />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 bg-blue-900/20 rounded-lg border border-blue-800/30">
              <p className="text-blue-400 font-bold mb-1">EPF Contributions</p>
              <p className="text-gray-400">You: {fmtCompact(result.employeeEPF)}/mo</p>
              <p className="text-gray-400">Employer: {fmtCompact(result.employerEPF)}/mo</p>
              <p className="text-green-400 font-semibold">Total: {fmtCompact(result.totalMonthlyEPF)}/mo</p>
            </div>
            <div className="p-2 bg-purple-900/20 rounded-lg border border-purple-800/30">
              <p className="text-purple-400 font-bold mb-1">NPS Contributions</p>
              <p className="text-gray-400">You: {fmtCompact(voluntaryNps)}/mo</p>
              <p className="text-gray-400">Employer: {fmtCompact(result.employerNPS)}/mo</p>
              <p className="text-green-400 font-semibold">Total: {fmtCompact(result.totalMonthlyNPS)}/mo</p>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="EPF Corpus" value={fmtCompact(result.epfFV)} subValue={`Fully tax-free`} highlight={result.epfBetter} icon={<Briefcase className="w-4 h-4" />} />
            <ResultCard label="NPS Corpus" value={fmtCompact(result.npsFV)} subValue={`60% tax-free`} highlight={!result.epfBetter} icon={<Target className="w-4 h-4" />} />
            <ResultCard label="NPS Lumpsum" value={fmtCompact(result.npsLumpsum)} subValue="Tax-free 60%" />
            <ResultCard label="Monthly Pension" value={fmtCompact(result.monthlyPension)} subValue="From NPS annuity" />
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">EPF vs NPS Corpus Growth Over {result.years} Years</h3>
            <div style={{ height: 240 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.yearlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gEpf" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} /><stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gNpsEpf" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} /><stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={68}
                    tickFormatter={v => v >= 10000000 ? `₹${(v/10000000).toFixed(1)}Cr` : v >= 100000 ? `₹${(v/100000).toFixed(0)}L` : `₹${(v/1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} formatter={(v: number, name) => [fmt(v), name]} labelFormatter={y => `Year ${y}`} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="epf" name="EPF Corpus" stroke="#3b82f6" fill="url(#gEpf)" strokeWidth={2} />
                  <Area type="monotone" dataKey="nps" name="NPS Corpus" stroke="#8b5cf6" fill="url(#gNpsEpf)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <Card>
              <h3 className="text-sm font-semibold text-blue-400 mb-2">🏦 EPF Facts</h3>
              <ul className="text-xs text-gray-400 space-y-1.5">
                <li>v Guaranteed 8.15% interest (FY24)</li>
                <li>v Fully tax-free at retirement (EEE)</li>
                <li>v Partial withdrawal for emergencies</li>
                <li>v Insurance (EDLI) benefit included</li>
                <li>✗ No choice of investment mix</li>
                <li>✗ Lower returns than NPS equity</li>
              </ul>
            </Card>
            <Card>
              <h3 className="text-sm font-semibold text-purple-400 mb-2">🎯 NPS Facts</h3>
              <ul className="text-xs text-gray-400 space-y-1.5">
                <li>v Choose equity/debt/govt mix</li>
                <li>v Higher potential returns (10-12%)</li>
                <li>v Extra ₹50K tax deduction (80CCD1B)</li>
                <li>v Lowest fund expense (0.01%)</li>
                <li>✗ 40% compulsory annuity at exit</li>
                <li>✗ Lock-in till 60 years</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
            <div className="mt-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-6">Epf vs Nps: Complete Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-base">What is Epf?</h3>
              <p>Epf is a India investment or financial product that offers distinct advantages depending on your goals, tax situation, and time horizon. Understanding how it works is key to making the most of your money.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">What is Nps?</h3>
              <p>Nps takes a different approach to growing or protecting your wealth. Each has its own risk profile, liquidity characteristics, and tax treatment that makes it suited to specific financial situations.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">Key Differences</h3>
              <p>The most important distinction between Epf and Nps is how returns are generated and taxed. Epf typically suits growth-oriented investors while Nps may appeal to those prioritizing stability or specific tax advantages.</p>
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
            <p className="text-sm text-green-700 leading-relaxed">Most financial advisors recommend not putting all your money in one option. A diversified approach - splitting between Epf and Nps based on your specific goals - often provides better risk-adjusted returns than going all-in on either. Use this calculator to find your optimal split.</p>
          </div>
        </div>
      </div>


      {/* Internal Links */}
      {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "SIP Calculator", href: "/calculators/finance/sip-calculator", icon: "📈", desc: "Free calculator" },          { name: "PPF Calculator", href: "/calculators/finance/ppf-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "NPS Calculator", href: "/calculators/finance/nps-calculator", icon: "📊", desc: "Free calculator" },          { name: "Fd Calculator", href: "/calculators/finance/fd-calculator", icon: "🏦", desc: "Free calculator" },          { name: "Rd Calculator", href: "/calculators/finance/rd-calculator", icon: "📊", desc: "Free calculator" },          { name: "Lumpsum Calculator", href: "/calculators/finance/lumpsum-calculator", icon: "💰", desc: "Free calculator" },          { name: "Step Up SIP Calculator", href: "/calculators/finance/step-up-sip-calculator", icon: "📊", desc: "Free calculator" },          { name: "SIP vs Fd Calculator", href: "/calculators/finance/sip-vs-fd-calculator", icon: "📊", desc: "Free calculator" },          { name: "SIP vs PPF Calculator", href: "/calculators/finance/sip-vs-ppf-calculator", icon: "📊", desc: "Free calculator" },          { name: "SIP vs NPS Calculator", href: "/calculators/finance/sip-vs-nps-calculator", icon: "📊", desc: "Free calculator" },          { name: "Mutual Fund Calculator", href: "/calculators/finance/mutual-fund-calculator", icon: "📊", desc: "Free calculator" },          { name: "Mutual Fund Return Calculator", href: "/calculators/finance/mutual-fund-return-calculator", icon: "📊", desc: "Free calculator" },
          ]}
        />
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          EPF Vs NPS Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this EPF Vs NPS USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          EPF vs NPS Calculator Example (India 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, with INR 15,000/month to invest for 25 years, your EPF vs NPS calculator India 2026 shows the wealth gap between guaranteed EPF and market-linked NPS returns.
        </p>
      </Card>

            <SEOContent
        title="EPF vs NPS Calculator India – Which Retirement Account Builds More Wealth in 2026?"
        category="finance"
        intro={`Both EPF (Employees Provident Fund) and NPS (National Pension System) are mandatory or semi-mandatory retirement savings vehicles in India, but they work very differently. EPF offers a fixed, government-declared interest rate (currently 8.15%) with complete capital safety. NPS offers market-linked returns based on your allocation between equity (E), corporate bonds (C), and government securities (G), with historically higher long-term returns but meaningful market risk.

For most salaried employees, EPF is mandatory and automatic. The question is whether to make voluntary contributions beyond the mandatory amount (VPF — Voluntary Provident Fund) or to direct additional retirement savings toward NPS. EPF VPF contributions are subject to the same Section 80C limit, while NPS contributions qualify for both the Section 80C limit and the additional ₹50,000 under Section 80CCD(1B).

EPF interest is completely tax-free for contributions up to ₹2.5 lakh per year (higher threshold for non-government employees). This tax-free compounding at 8%+ makes EPF an exceptionally strong retirement vehicle that is often underappreciated compared to market-linked products.`}
        howItWorks={`EPF projection: Annual contribution × compounding at current EPF rate, with the understanding that the rate is declared annually and has historically ranged from 8.1-8.65% over the past decade. The calculator uses the current rate as a steady-state estimate.

NPS Tier I comparison: Asset allocation between E (equity), C (corporate bonds), G (government securities) at user-specified percentages, compounded at historical or expected rates for each asset class. Typical blended return for aggressive allocation (75% E, 25% C) has been approximately 10-12% CAGR historically.

Tax advantage comparison: EPF interest on contributions up to ₹2.5 lakh/year = fully tax-exempt. NPS: contributions deductible under 80C + 80CCD(1B); at maturity, 60% withdrawal is tax-free; 40% annuity purchase is mandatory and pension income is taxable.`}
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
        tipsSection={`Maximize mandatory EPF contributions and ensure your employer is depositing accurately — check your EPFO passbook online. Many employers deposit the minimum required; voluntary contributions (VPF) allow you to increase EPF allocation up to 100% of basic salary.

For NPS, the asset allocation decision matters significantly. The default auto choice (lifecycle fund) gradually shifts from equity to debt as you approach retirement. Active choice allows you to maintain higher equity allocation for longer — generally recommended for investors more than 15 years from retirement.

The NPS ₹50,000 additional deduction under 80CCD(1B) is most valuable for those in the 30% tax bracket (saves ₹15,000 in taxes annually). Even if EPF meets your 80C limit, NPS contributions up to ₹50,000 in the 80CCD(1B) bucket provide additional tax savings.`}
        conclusion={`EPF's guaranteed return and tax-free status make it one of the best-risk-adjusted investment options available to salaried employees. The mandatory nature of EPF contributions ensures retirement savings discipline that voluntary schemes don't.

The optimal strategy for most salaried employees is not EPF vs NPS but EPF and NPS: maximize EPF (including VPF if desired for the guaranteed tax-free rate), plus contribute ₹50,000/year to NPS to capture the additional tax deduction, plus invest additional retirement savings in equity mutual funds via SIP for long-term growth potential.`}

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
