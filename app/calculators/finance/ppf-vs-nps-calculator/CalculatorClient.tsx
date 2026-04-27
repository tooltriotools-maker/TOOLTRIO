'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Shield, Target } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, fmtCompact } = useCurrency()
  const [yearlyAmount, setYearlyAmount] = useState(150000)
  const [ppfRate, setPpfRate] = useState(7.1)
  const [npsRate, setNpsRate] = useState(10)
  const [years, setYears] = useState(20)
  const [annuityRate, setAnnuityRate] = useState(6)

  const result = useMemo(() => {
    const months = years * 12
    const monthly = yearlyAmount / 12

    // PPF - annual compounding, EEE tax-free
    let ppfFV = 0
    for (let y = 1; y <= years; y++) ppfFV += yearlyAmount * Math.pow(1 + ppfRate / 100, years - y + 1)
    const ppfInvested = yearlyAmount * years
    const ppfGain = ppfFV - ppfInvested

    // NPS - monthly compounding
    const npsMR = npsRate / 100 / 12
    const npsFV = monthly * ((Math.pow(1 + npsMR, months) - 1) / npsMR) * (1 + npsMR)
    const npsLumpsum = npsFV * 0.60 // 60% tax-free
    const npsAnnuityCorpus = npsFV * 0.40
    const monthlyPension = (npsAnnuityCorpus * annuityRate / 100) / 12
    const npsGain = npsFV - ppfInvested

    // Extra NPS tax saving via 80CCD(1B)
    const extraNPSTaxSaving = 50000 * 0.30 * years

    const yearlyData = Array.from({ length: years }, (_, i) => {
      const y = i + 1; const m = y * 12
      let pFV = 0; for (let yr = 1; yr <= y; yr++) pFV += yearlyAmount * Math.pow(1 + ppfRate / 100, y - yr + 1)
      const nFV = monthly * ((Math.pow(1 + npsMR, m) - 1) / npsMR) * (1 + npsMR)
      return { year: y, ppf: Math.round(pFV), nps: Math.round(nFV), invested: yearlyAmount * y }
    })

    return {
      ppfFV: Math.round(ppfFV), ppfGain: Math.round(ppfGain), ppfInvested: Math.round(ppfInvested),
      npsFV: Math.round(npsFV), npsLumpsum: Math.round(npsLumpsum),
      npsAnnuityCorpus: Math.round(npsAnnuityCorpus), monthlyPension: Math.round(monthlyPension),
      npsGain: Math.round(npsGain), extraNPSTaxSaving: Math.round(extraNPSTaxSaving),
      ppfBetter: ppfFV > npsLumpsum, // comparing PPF (full access) vs NPS lumpsum (60%)
      npsTotalValue: Math.round(npsFV),
      difference: Math.round(Math.abs(ppfFV - npsFV)),
      yearlyData,
    }
  }, [yearlyAmount, ppfRate, npsRate, years, annuityRate])

  return (
    <CalculatorLayout title="PPF vs NPS Calculator India 2026" description="Compare PPF guaranteed tax-free returns vs NPS market-linked pension for retirement savings." icon="⚖️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4" /> Investment Details
          </h2>
          <div className="space-y-4">
            <InputField label="Annual Investment" value={yearlyAmount} onChange={setYearlyAmount} min={1000} max={500000} step={5000} prefix="₹" />
            <InputField label="PPF Interest Rate" value={ppfRate} onChange={setPpfRate} min={6} max={9} step={0.05} suffix="%" />
            <InputField label="NPS Expected Return" value={npsRate} onChange={setNpsRate} min={7} max={15} step={0.5} suffix="%" />
            <InputField label="Investment Period" value={years} onChange={setYears} min={15} max={40} step={5} suffix="Yrs" />
            <InputField label="Annuity Rate (NPS)" value={annuityRate} onChange={setAnnuityRate} min={4} max={10} step={0.25} suffix="%" />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 bg-purple-900/20 rounded-lg text-center">
              <p className="text-purple-400 font-bold">PPF</p>
              <p className="text-gray-400">15yr lock-in</p>
              <p className="text-green-400 font-bold">EEE tax-free</p>
            </div>
            <div className="p-2 bg-blue-900/20 rounded-lg text-center">
              <p className="text-blue-400 font-bold">NPS</p>
              <p className="text-gray-400">Till age 60</p>
              <p className="text-green-400 font-bold">Extra 80CCD</p>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="PPF Corpus" value={fmtCompact(result.ppfFV)} subValue="100% accessible, tax-free" highlight={result.ppfBetter} icon={<Shield className="w-4 h-4" />} />
            <ResultCard label="NPS Total Corpus" value={fmtCompact(result.npsTotalValue)} subValue={`60% lumpsum + pension`} highlight={!result.ppfBetter} icon={<Target className="w-4 h-4" />} />
            <ResultCard label="NPS Monthly Pension" value={fmtCompact(result.monthlyPension)} subValue="From 40% annuity" />
            <ResultCard label="NPS Extra Tax Save" value={fmtCompact(result.extraNPSTaxSaving)} subValue="80CCD(1B) benefit" />
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">PPF vs NPS Corpus Growth Over {years} Years</h3>
            <div style={{ height: 240 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.yearlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gPpfNps" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} /><stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gNpsPpf" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} /><stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gInvPpfNps" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3} /><stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={68}
                    tickFormatter={v => v >= 10000000 ? `₹${(v/10000000).toFixed(1)}Cr` : v >= 100000 ? `₹${(v/100000).toFixed(0)}L` : `₹${(v/1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} formatter={(v: number, name) => [fmt(v), name]} labelFormatter={y => `Year ${y}`} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="invested" name="Invested" stroke="#94a3b8" fill="url(#gInvPpfNps)" strokeWidth={1.5} strokeDasharray="4 2" />
                  <Area type="monotone" dataKey="ppf" name="PPF Corpus" stroke="#8b5cf6" fill="url(#gPpfNps)" strokeWidth={2} />
                  <Area type="monotone" dataKey="nps" name="NPS Corpus" stroke="#3b82f6" fill="url(#gNpsPpf)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <Card>
              <h3 className="text-sm font-semibold text-purple-400 mb-2">🏛️ PPF Best For</h3>
              <ul className="text-xs text-gray-400 space-y-1.5">
                <li>v Medium-term goals (15-20 years)</li>
                <li>v Full liquidity at maturity</li>
                <li>v Conservative risk profile</li>
                <li>v Emergency loan facility (yr 3+)</li>
                <li>v Creditor-proof savings</li>
              </ul>
            </Card>
            <Card>
              <h3 className="text-sm font-semibold text-blue-400 mb-2">🎯 NPS Best For</h3>
              <ul className="text-xs text-gray-400 space-y-1.5">
                <li>v Pure retirement planning</li>
                <li>v Extra ₹50K tax deduction</li>
                <li>v Higher returns (equity mix)</li>
                <li>v Guaranteed pension income</li>
                <li>v Very low expense ratio (0.01%)</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
            <div className="mt-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-6">Ppf vs Nps: Complete Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-base">What is Ppf?</h3>
              <p>Ppf is a India investment or financial product that offers distinct advantages depending on your goals, tax situation, and time horizon. Understanding how it works is key to making the most of your money.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">What is Nps?</h3>
              <p>Nps takes a different approach to growing or protecting your wealth. Each has its own risk profile, liquidity characteristics, and tax treatment that makes it suited to specific financial situations.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">Key Differences</h3>
              <p>The most important distinction between Ppf and Nps is how returns are generated and taxed. Ppf typically suits growth-oriented investors while Nps may appeal to those prioritizing stability or specific tax advantages.</p>
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
            <p className="text-sm text-green-700 leading-relaxed">Most financial advisors recommend not putting all your money in one option. A diversified approach - splitting between Ppf and Nps based on your specific goals - often provides better risk-adjusted returns than going all-in on either. Use this calculator to find your optimal split.</p>
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
          PPF Vs NPS Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this PPF Vs NPS USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          PPF vs NPS Calculator Example (India 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, with INR 1.5 lakh/year to invest for 30 years, your PPF vs NPS calculator India 2026 shows total wealth and retirement income from each — letting you choose based on your risk tolerance and income needs.
        </p>
      </Card>

            <SEOContent
        title="PPF vs NPS Calculator India – Guaranteed PPF or Market-Linked NPS for Retirement in 2026?"
        category="finance"
        intro={`Both PPF and NPS offer Section 80C tax benefits and long-term wealth accumulation, but they serve different philosophies: PPF is guaranteed, risk-free, and fully flexible at maturity. NPS is market-linked, potentially higher-returning, but has the constraint of mandatory annuity purchase at retirement.

The additional Section 80CCD(1B) deduction of ₹50,000 for NPS contributions beyond the 80C limit is the most compelling argument for NPS over PPF for high-income earners. This effectively allows ₹2 lakh of total tax-deductible retirement savings (₹1.5 lakh under 80C plus ₹50,000 under 80CCD(1B)) — if you're filling both buckets, the comparison isn't either/or but how to allocate between them.

For the 80C bucket specifically: PPF's guaranteed tax-free return at 7.1% is extremely competitive against NPS's equity-linked option when risk-adjusted. NPS equity (E tier) has historically returned 10-13% CAGR — but with equity market risk. PPF's effective pre-tax equivalent return for a 30% taxpayer (7.1% / 0.7 = 10.14%) nearly matches NPS equity's historical mean on a risk-adjusted basis.`}
        howItWorks={`PPF vs NPS return comparison: PPF at 7.1% tax-free vs NPS equity at 11% (historical approximate) with tax on the 40% annuity portion. The comparison requires modeling the entire retirement trajectory: accumulation phase returns, annuity conversion rate, and tax treatment of distributions.

NPS tax at maturity: 60% lump sum is completely tax-free. 40% must be annuitized; annuity income is taxable as ordinary income. At modest annuity rates (6-7%), the 40% annuity corpus generates approximately 2.4-2.8% of the total corpus as annual taxable pension income.

PPF at maturity: 100% of accumulated corpus is tax-free, with no portion mandatorily annuitized. Complete withdrawal flexibility gives superior post-retirement financial planning optionality.`}
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
        tipsSection={`The optimal approach for most investors: maximize PPF contribution (₹1.5 lakh) for the guaranteed, risk-free, 100%-tax-free corpus — this is the bedrock of retirement savings. Separately, contribute ₹50,000 annually to NPS Tier I specifically to capture the unique 80CCD(1B) deduction that's unavailable in PPF.

For aggressive equity-linked retirement savings beyond these amounts, direct equity mutual funds (particularly index funds) offer similar market exposure to NPS equity with better liquidity, no annuity requirement, and no lock-in. NPS's advantage over direct equity mutual funds is primarily the additional tax deduction.

PPF loans (available from year 3-6) and partial withdrawals (from year 7) provide liquidity that NPS doesn't. For investors concerned about future liquidity needs, PPF's partial access advantages NPS significantly.`}
        conclusion={`The NPS vs PPF comparison is ultimately about risk tolerance and the value you place on liquidity. PPF offers guaranteed returns, complete tax-free accumulation, and no mandatory annuity — at the cost of being capped at ₹1.5 lakh per year and offering a modest 7.1% guaranteed return. NPS offers higher potential returns and additional tax deduction space but with market risk, lock-in until 60, and mandatory annuity purchase.

Most financial advisors recommend treating PPF and NPS as complementary rather than competing: PPF as the guaranteed foundation, NPS for the additional tax deduction, and equity mutual funds for the growth-oriented component of retirement savings. Use [our NPS Calculator](/calculators/finance/nps-calculator) for detailed NPS corpus and annuity projections.`}

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
