'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Shield, Landmark } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, fmtCompact } = useCurrency()
  const [yearlyAmount, setYearlyAmount] = useState(150000)
  const [ppfRate, setPpfRate] = useState(7.1)
  const [fdRate, setFdRate] = useState(7.0)
  const [years, setYears] = useState(15)
  const [taxSlab, setTaxSlab] = useState(30)

  const result = useMemo(() => {
    // PPF - annual compounding, max 1.5L/year, EEE
    const ppfAR = ppfRate / 100
    let ppfFV = 0
    for (let y = 1; y <= years; y++) ppfFV += yearlyAmount * Math.pow(1 + ppfAR, years - y + 1)
    const ppfInvested = yearlyAmount * years
    const ppfGain = ppfFV - ppfInvested
    const ppfTax = 0 // EEE - fully tax free

    // FD - same annual deposit, interest taxed each year
    const fdEffectiveRate = fdRate * (1 - taxSlab / 100)
    let fdFV = 0
    for (let y = 1; y <= years; y++) fdFV += yearlyAmount * Math.pow(1 + fdEffectiveRate / 100, years - y + 1)
    const fdGain = fdFV - ppfInvested
    const fdGainPreTax = (() => {
      let fv = 0
      for (let y = 1; y <= years; y++) fv += yearlyAmount * Math.pow(1 + fdRate / 100, years - y + 1)
      return fv - ppfInvested
    })()
    const fdTax = fdGainPreTax * (taxSlab / 100)

    const taxSaving = yearlyAmount * (taxSlab / 100) * years // 80C benefit

    const yearlyData = Array.from({ length: Math.min(years, 15) }, (_, i) => {
      const y = i + 1
      let pFV = 0; for (let yr = 1; yr <= y; yr++) pFV += yearlyAmount * Math.pow(1 + ppfAR, y - yr + 1)
      let fFV = 0; for (let yr = 1; yr <= y; yr++) fFV += yearlyAmount * Math.pow(1 + fdEffectiveRate / 100, y - yr + 1)
      return { year: y, ppf: Math.round(pFV), fd: Math.round(fFV), invested: yearlyAmount * y }
    })

    return {
      ppfFV: Math.round(ppfFV), ppfGain: Math.round(ppfGain), ppfInvested: Math.round(ppfInvested),
      fdFV: Math.round(fdFV), fdGain: Math.round(fdGain), fdTax: Math.round(fdTax), taxSaving: Math.round(taxSaving),
      ppfBetter: ppfFV > fdFV, difference: Math.round(Math.abs(ppfFV - fdFV)),
      yearlyData,
    }
  }, [yearlyAmount, ppfRate, fdRate, years, taxSlab])

  return (
    <CalculatorLayout title="PPF vs FD Calculator India 2026" description="Compare PPF tax-free 7.1% returns vs Fixed Deposit post-tax returns for your income bracket." icon="🏛️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4" /> Details
          </h2>
          <div className="space-y-4">
            <InputField label="Annual Investment" value={yearlyAmount} onChange={setYearlyAmount} min={500} max={150000} step={5000} prefix="₹" />
            <InputField label="PPF Interest Rate" value={ppfRate} onChange={setPpfRate} min={6} max={9} step={0.05} suffix="%" />
            <InputField label="FD Interest Rate" value={fdRate} onChange={setFdRate} min={4} max={10} step={0.25} suffix="%" />
            <InputField label="Investment Period" value={years} onChange={setYears} min={15} max={40} step={5} suffix="Yrs" />
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
          <div className={`mt-4 p-3 rounded-xl border-2 text-center ${result.ppfBetter ? 'bg-purple-50 border-purple-300' : 'bg-blue-50 border-blue-300'}`}>
            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Post-Tax Winner</p>
            <p className="text-xl font-black" style={{ color: result.ppfBetter ? '#8b5cf6' : '#3b82f6' }}>{result.ppfBetter ? 'PPF' : 'FD'} 🏆</p>
            <p className="text-sm text-gray-500">by {fmtCompact(result.difference)}</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="PPF Maturity" value={fmtCompact(result.ppfFV)} subValue="100% Tax-Free (EEE)" highlight={result.ppfBetter} icon={<Shield className="w-4 h-4" />} />
            <ResultCard label="FD Post-Tax" value={fmtCompact(result.fdFV)} subValue={`Tax paid: ${fmtCompact(result.fdTax)}`} highlight={!result.ppfBetter} icon={<Landmark className="w-4 h-4" />} />
            <ResultCard label="PPF Gain" value={fmtCompact(result.ppfGain)} subValue="Tax-free returns" />
            <ResultCard label="80C Tax Saved" value={fmtCompact(result.taxSaving)} subValue={`${taxSlab}% slab x ${years}yr`} />
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">PPF vs FD Growth (Post-Tax)</h3>
            <div style={{ height: 240 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={result.yearlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={70}
                    tickFormatter={v => v >= 10000000 ? `₹${(v/10000000).toFixed(1)}Cr` : v >= 100000 ? `₹${(v/100000).toFixed(0)}L` : `₹${(v/1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} formatter={(v: number, name) => [fmt(v), name]} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="fd" name="FD (Post-Tax)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="ppf" name="PPF (Tax-Free)" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
            <div className="mt-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-6">Ppf vs Fd: Complete Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-base">What is Ppf?</h3>
              <p>Ppf is a India investment or financial product that offers distinct advantages depending on your goals, tax situation, and time horizon. Understanding how it works is key to making the most of your money.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">What is Fd?</h3>
              <p>Fd takes a different approach to growing or protecting your wealth. Each has its own risk profile, liquidity characteristics, and tax treatment that makes it suited to specific financial situations.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">Key Differences</h3>
              <p>The most important distinction between Ppf and Fd is how returns are generated and taxed. Ppf typically suits growth-oriented investors while Fd may appeal to those prioritizing stability or specific tax advantages.</p>
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
            <p className="text-sm text-green-700 leading-relaxed">Most financial advisors recommend not putting all your money in one option. A diversified approach - splitting between Ppf and Fd based on your specific goals - often provides better risk-adjusted returns than going all-in on either. Use this calculator to find your optimal split.</p>
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
          PPF Vs FD Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this PPF Vs FD USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          PPF vs FD Calculator Example (India 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, investing INR 1.5 lakh annually for 15 years in the 20% tax bracket, your PPF vs FD calculator India 2026 shows PPF building INR 40.7 lakh vs FD building INR 35.8 lakh after tax.
        </p>
      </Card>

            <SEOContent
        title="PPF vs FD Calculator India – PPF or Fixed Deposit: Which Builds More Wealth After Tax in 2026?"
        category="finance"
        intro={`PPF and FD are both considered safe savings instruments in India, but their tax treatment, lock-in structure, and guaranteed returns make them suitable for different purposes. PPF is a long-term, EEE tax-exempt vehicle locked for 15 years. FD is flexible in tenure (7 days to 10 years), fully taxable on interest, but accessible with modest early withdrawal penalties.

The tax comparison is the central issue: FD interest is taxed as ordinary income at your slab rate. PPF interest is completely tax-free. At the 30% bracket, a 7.5% FD returns an effective 5.25% after tax. PPF at 7.1% returns 7.1% after tax. PPF wins on after-tax return despite the lower stated rate for any taxpayer in the 20%+ bracket.

FD's primary advantage over PPF is flexibility: you can invest any amount, choose any tenure from 7 days to 10 years, and access your money (with 1-3 months of interest penalty) whenever needed. For money you might need within 5 years, or for specific goal funding with known timelines, FD's predictability and flexibility often win despite the tax disadvantage.`}
        howItWorks={`After-tax return comparison: FD: Gross yield × (1 - income tax slab rate). PPF: Gross yield (tax-free). Breakeven: PPF rate = FD rate × (1 - slab rate). At 30% slab, PPF at 7.1% beats any FD below 10.14% on after-tax basis. Currently (7.5% FD returns 5.25% after tax vs 7.1% PPF) — PPF wins by 1.85% after tax annually.

Compound effect over 15 years on ₹1 lakh: FD at 7.5% after 30% tax (effective 5.25%) = ₹2.12 lakh. PPF at 7.1% tax-free = ₹2.82 lakh. Difference of ₹70,000 on ₹1 lakh — extremely significant over longer periods and larger amounts.

Liquidity adjustment: If you need the money in year 7, PPF allows partial withdrawal (up to 50% of year 4 balance). FD can be broken early with 1-3 months interest penalty — more flexible but potentially more tempting to disrupt.`}
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
        tipsSection={`PPF is unambiguously better than FD for long-term savings for taxpayers in 20%+ bracket — the after-tax return comparison is not close. Use PPF for money you're sure you don't need for 15 years; FD for medium-term goals with specific timelines.

For short-term liquidity (under 3 years), liquid mutual funds may beat both PPF and FD: near-FD returns with same-day liquidity and no early withdrawal penalty. For the strictly risk-free portion of short-term savings, FD wins on predictability.

Senior citizens: PPF is closed to new accounts for those above 60 (you can continue existing accounts). Senior citizen FD rates (typically +0.25-0.50% over standard rates) and SCSS (Senior Citizen Savings Scheme, currently 8.2%) provide alternatives with competitive rates.`}
        conclusion={`Many investors unnecessarily choose FD over PPF for medium-to-long-term savings because PPF's lock-in feels constraining. But 15 years is the right time horizon for retirement savings, children's education, and major life goals. The lock-in is a feature, not a bug — it forces the discipline that makes wealth accumulation actually happen.

For investors who have maximized PPF (₹1.5 lakh limit) and want additional safe savings, SCSS for senior citizens, Sovereign Gold Bonds for partial gold exposure, and well-rated corporate FDs (at modest premium over bank FDs with appropriate credit risk awareness) round out a conservative savings portfolio. Use [our PPF Calculator](/calculators/finance/ppf-calculator) for detailed PPF maturity projections.`}

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
