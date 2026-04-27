'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
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
  const [yearlyAmount, setYearlyAmount] = useState(150000)
  const [elssRate, setElssRate] = useState(13)
  const [ppfRate, setPpfRate] = useState(7.1)
  const [years, setYears] = useState(15)
  const [taxSlab, setTaxSlab] = useState(30)

  const result = useMemo(() => {
    const ppfAR = ppfRate / 100
    let ppfFV = 0
    for (let y = 1; y <= years; y++) ppfFV += yearlyAmount * Math.pow(1 + ppfAR, years - y + 1)
    const ppfInvested = yearlyAmount * years

    // ELSS: 3-year lock-in, LTCG 10% above 1L, annual SIP
    const elssMR = elssRate / 100 / 12
    const monthly = yearlyAmount / 12
    const months = years * 12
    const elssFV = monthly * ((Math.pow(1 + elssMR, months) - 1) / elssMR) * (1 + elssMR)
    const elssGain = elssFV - ppfInvested
    const elssTax = Math.max(0, elssGain - 100000) * 0.10
    const elssPostTax = elssFV - elssTax

    const taxSavedBoth = yearlyAmount * (taxSlab / 100) * years // both qualify 80C

    const yearlyData = Array.from({ length: years }, (_, i) => {
      const y = i + 1
      let pFV = 0; for (let yr = 1; yr <= y; yr++) pFV += yearlyAmount * Math.pow(1 + ppfAR, y - yr + 1)
      const m = y * 12
      const eFV = monthly * ((Math.pow(1 + elssMR, m) - 1) / elssMR) * (1 + elssMR)
      return { year: y, ppf: Math.round(pFV), elss: Math.round(eFV), invested: yearlyAmount * y }
    })

    return {
      ppfFV: Math.round(ppfFV), ppfInvested: Math.round(ppfInvested), ppfGain: Math.round(ppfFV - ppfInvested),
      elssFV: Math.round(elssFV), elssPostTax: Math.round(elssPostTax), elssTax: Math.round(elssTax), elssGain: Math.round(elssGain),
      taxSavedBoth: Math.round(taxSavedBoth),
      elssBetter: elssPostTax > ppfFV,
      difference: Math.round(Math.abs(elssPostTax - ppfFV)),
      yearlyData,
    }
  }, [yearlyAmount, elssRate, ppfRate, years, taxSlab])

  return (
    <CalculatorLayout title="ELSS vs PPF Calculator India 2026" description="Compare ELSS mutual fund vs PPF for Section 80C tax savings, returns, and lock-in period." icon="⚖️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" /> Tax Saving Details
          </h2>
          <div className="space-y-4">
            <InputField label="Annual 80C Investment" value={yearlyAmount} onChange={setYearlyAmount} min={500} max={150000} step={5000} prefix="₹" />
            <InputField label="ELSS Expected Return (p.a.)" value={elssRate} onChange={setElssRate} min={8} max={20} step={0.5} suffix="%" />
            <InputField label="PPF Interest Rate" value={ppfRate} onChange={setPpfRate} min={6} max={9} step={0.05} suffix="%" />
            <InputField label="Investment Period" value={years} onChange={setYears} min={3} max={30} step={1} suffix="Yrs" />
            <div>
              <p className="text-xs font-semibold text-gray-600 mb-2">Your Tax Slab</p>
              <div className="grid grid-cols-4 gap-1">
                {[0, 5, 20, 30].map(t => (
                  <button key={t} onClick={() => setTaxSlab(t)}
                    className={`py-1.5 rounded-lg text-xs font-bold border-2 transition-all ${taxSlab === t ? 'bg-green-100 border-green-400 text-green-700' : 'bg-gray-50 border-gray-200 text-gray-500'}`}>
                    {t}%
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 bg-green-900/20 rounded-lg border border-green-800/30 text-center">
              <p className="text-green-400 font-bold">ELSS Lock-in</p>
              <p className="text-white font-bold text-lg">3 Years</p>
            </div>
            <div className="p-2 bg-purple-900/20 rounded-lg border border-purple-800/30 text-center">
              <p className="text-purple-400 font-bold">PPF Lock-in</p>
              <p className="text-white font-bold text-lg">15 Years</p>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="ELSS Post-Tax" value={fmtCompact(result.elssPostTax)} subValue={`LTCG tax: ${fmtCompact(result.elssTax)}`} highlight={result.elssBetter} icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="PPF Maturity" value={fmtCompact(result.ppfFV)} subValue="Tax-free (EEE)" highlight={!result.elssBetter} icon={<Shield className="w-4 h-4" />} />
            <ResultCard label="ELSS Gain" value={fmtCompact(result.elssGain)} subValue="Before LTCG" />
            <ResultCard label="80C Tax Saved" value={fmtCompact(result.taxSavedBoth)} subValue="Same for both" />
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">ELSS vs PPF Growth Over {years} Years</h3>
            <div style={{ height: 240 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.yearlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gElss" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gPpfElss" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} /><stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gInvElss" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3} /><stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={68}
                    tickFormatter={v => v >= 10000000 ? `₹${(v/10000000).toFixed(1)}Cr` : v >= 100000 ? `₹${(v/100000).toFixed(0)}L` : `₹${(v/1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} formatter={(v: number, name) => [fmt(v), name]} labelFormatter={y => `Year ${y}`} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="invested" name="Invested" stroke="#94a3b8" fill="url(#gInvElss)" strokeWidth={1.5} strokeDasharray="4 2" />
                  <Area type="monotone" dataKey="ppf" name="PPF Value" stroke="#8b5cf6" fill="url(#gPpfElss)" strokeWidth={2} />
                  <Area type="monotone" dataKey="elss" name="ELSS Value" stroke="#10b981" fill="url(#gElss)" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
            <div className="mt-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-6">Elss vs Ppf: Complete Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-base">What is Elss?</h3>
              <p>Elss is a India investment or financial product that offers distinct advantages depending on your goals, tax situation, and time horizon. Understanding how it works is key to making the most of your money.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">What is Ppf?</h3>
              <p>Ppf takes a different approach to growing or protecting your wealth. Each has its own risk profile, liquidity characteristics, and tax treatment that makes it suited to specific financial situations.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">Key Differences</h3>
              <p>The most important distinction between Elss and Ppf is how returns are generated and taxed. Elss typically suits growth-oriented investors while Ppf may appeal to those prioritizing stability or specific tax advantages.</p>
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
            <p className="text-sm text-green-700 leading-relaxed">Most financial advisors recommend not putting all your money in one option. A diversified approach - splitting between Elss and Ppf based on your specific goals - often provides better risk-adjusted returns than going all-in on either. Use this calculator to find your optimal split.</p>
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
          Elss Vs PPF Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Elss Vs PPF USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          ELSS vs PPF Calculator Example (India 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, investing INR 1 lakh annually for 15 years, your ELSS vs PPF calculator India 2026 shows ELSS generates approximately INR 55 lakh vs PPF's INR 30 lakh — a INR 25 lakh difference.
        </p>
      </Card>

            <SEOContent
        title="ELSS vs PPF Calculator India – Which 80C Investment Builds More Wealth in 2026?"
        category="finance"
        intro={`ELSS and PPF serve different investor needs and risk profiles, which is why comparing them is ultimately about your personal risk tolerance and time horizon rather than one being objectively better. PPF offers guaranteed returns (currently 7.1%) with complete capital safety and Section 80C deduction. ELSS offers potentially much higher returns through equity market exposure, with the same Section 80C deduction but with real market risk and a shorter 3-year lock-in versus PPF's 15-year tenure.

The historical return comparison favors ELSS significantly: top-performing ELSS funds have delivered 14-18% CAGR over 10-15 year periods, while PPF's return has ranged from 7-8% over the same periods. At 15% CAGR vs 7.1% compounded over 15 years, ₹1 lakh grows to ₹8.14 lakh in ELSS vs ₹2.82 lakh in PPF — a 3x wealth difference. But those returns are not guaranteed, and a significant market downturn during your investment period could close that gap substantially.

PPF's tax treatment is actually superior in one dimension: the interest earned is completely tax-free without any threshold, whereas ELSS LTCG is taxed at 10% above ₹1 lakh. For very large investments, this matters.`}
        howItWorks={`PPF calculation: Annual contribution compounds at current PPF rate (7.1% in 2024). Interest is calculated on the minimum balance between 5th and last day of each month — contributions made before the 5th earn interest for that month. The maturity value after 15 years of ₹1.5 lakh/year at 7.1% = approximately ₹39.8 lakh.

ELSS SIP calculation: Monthly SIP × [(1+r/12)^180 - 1] / (r/12), where r is expected monthly return. At 12% CAGR, ₹12,500/month for 15 years grows to approximately ₹62 lakh — outperforming PPF significantly if returns are achieved.

Risk adjustment: ELSS return projections carry standard equity market uncertainty. A base case of 12% CAGR, conservative case of 8% (near PPF rate), and optimistic case of 16% gives a realistic return range to consider.`}
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
        tipsSection={`Use PPF for the risk-free portion of your Section 80C investments — particularly money you cannot afford to lose. The guaranteed returns and capital safety make PPF the right choice for investors with low risk tolerance, near-term financial goals, or who are already heavily invested in equity through other accounts.

ELSS is appropriate for the equity portion of your tax-saving portfolio. Over 10+ year horizons, equity has historically outperformed PPF in India. The 3-year lock-in (versus PPF's 15-year tenure) also provides more flexibility if your needs change.

A common approach: split Section 80C investments between both instruments — PPF for capital safety and guaranteed returns, ELSS for growth potential. The ratio depends on your age (younger = more ELSS) and risk tolerance.`}
        conclusion={`PPF's 15-year lock-in with restricted partial withdrawals makes it most suitable as a retirement savings vehicle rather than a medium-term savings tool. Treating it as untouchable retirement money — not as accessible savings with a lock-in — is the mindset that leads to the best outcomes.

For investors in the 30% tax bracket, both instruments save ₹45,000 in tax per ₹1.5 lakh invested. The tax savings are equal; the difference is entirely in expected returns and risk. Use [our PPF Calculator](/calculators/finance/ppf-calculator) for detailed PPF maturity projections.`}

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
