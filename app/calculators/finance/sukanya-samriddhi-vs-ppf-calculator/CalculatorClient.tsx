'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { TrendingUp, Shield } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string }
const fmt = (n: number) => (n >= 10000000 ? '₹' + (n/10000000).toFixed(2) + 'Cr' : n >= 100000 ? '₹' + (n/100000).toFixed(1) + 'L' : n >= 1000 ? '₹' + (n/1000).toFixed(0) + 'K' : '₹' + Math.round(n))
const fmtU = (n: number) => (n >= 1000000 ? '$' + (n/1000000).toFixed(2) + 'M' : '$' + (n/1000).toFixed(0) + 'K')
const fmtAuto = (n: number, isUSD: boolean) => isUSD ? fmtU(n) : fmt(n)

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const isUSD = true
  const [val1, setVal1] = useState(isUSD ? 500 : 10000)
  const [rate1, setRate1] = useState(isUSD ? 10 : 12)
  const [rate2, setRate2] = useState(isUSD ? 5 : 7)
  const [years, setYears] = useState(10)

  const result = useMemo(() => {
    const months = years * 12
    const mr1 = rate1 / 100 / 12; const mr2 = rate2 / 100 / 12
    const fv1 = val1 * ((Math.pow(1 + mr1, months) - 1) / mr1) * (1 + mr1)
    const fv2 = val1 * ((Math.pow(1 + mr2, months) - 1) / mr2) * (1 + mr2)
    const invested = val1 * months
    const barData = [
      { name: 'Invested', a: Math.round(invested), b: Math.round(invested) },
      { name: 'Final Value', a: Math.round(fv1), b: Math.round(fv2) },
      { name: 'Gain', a: Math.round(fv1 - invested), b: Math.round(fv2 - invested) },
    ]
    return { fv1: Math.round(fv1), fv2: Math.round(fv2), invested: Math.round(invested), aBetter: fv1 > fv2, diff: Math.round(Math.abs(fv1 - fv2)), barData }
  }, [val1, rate1, rate2, years])

  return (
    <CalculatorLayout title="Sukanya Samriddhi vs PPF Calculator India 2026" description="Compare SSY at 8.2% vs PPF at 7.1% for girl child education and marriage fund savings." icon="📊" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-4">Investment Details</h2>
          <div className="space-y-4">
            <InputField label="Monthly Investment" value={val1} onChange={setVal1} min={100} max={100000} step={100} prefix={isUSD ? '$' : '₹'} />
            <InputField label="Option A Return (p.a.)" value={rate1} onChange={setRate1} min={1} max={20} step={0.5} suffix="%" />
            <InputField label="Option B Return (p.a.)" value={rate2} onChange={setRate2} min={1} max={15} step={0.25} suffix="%" />
            <InputField label="Investment Period" value={years} onChange={setYears} min={1} max={30} step={1} suffix="Yrs" />
          </div>
          <div className={`mt-4 p-3 rounded-xl border-2 text-center ${result.aBetter ? 'bg-green-50 border-green-300' : 'bg-blue-50 border-blue-300'}`}>
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Better Investment</p>
            <p className="text-xl font-black" style={{ color: result.aBetter ? '#10b981' : '#3b82f6' }}>{result.aBetter ? 'Option A' : 'Option B'} 🏆</p>
            <p className="text-sm text-gray-500">by {fmtAuto(result.diff, isUSD)}</p>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Option A" value={fmtAuto(result.fv1, isUSD)} subValue={`${rate1}% return`} highlight={result.aBetter} icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="Option B" value={fmtAuto(result.fv2, isUSD)} subValue={`${rate2}% return`} highlight={!result.aBetter} icon={<Shield className="w-4 h-4" />} />
            <ResultCard label="Total Invested" value={fmtAuto(result.invested, isUSD)} subValue={`${years} years`} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Comparison Calculator Comparison</h3>
            <div style={{ height: 230 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={result.barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={72} tickFormatter={v => fmtAuto(v, isUSD)} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8 }} formatter={(v: number, n) => [fmtAuto(v as number, isUSD), n]} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="b" name="Option B" fill="#3b82f6" radius={[4,4,0,0]} />
                  <Bar dataKey="a" name="Option A" fill="#10b981" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
            <div className="mt-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-6">Sukanya Samriddhi vs Ppf: Complete Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-base">What is Sukanya Samriddhi?</h3>
              <p>Sukanya Samriddhi is a India investment or financial product that offers distinct advantages depending on your goals, tax situation, and time horizon. Understanding how it works is key to making the most of your money.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">What is Ppf?</h3>
              <p>Ppf takes a different approach to growing or protecting your wealth. Each has its own risk profile, liquidity characteristics, and tax treatment that makes it suited to specific financial situations.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">Key Differences</h3>
              <p>The most important distinction between Sukanya Samriddhi and Ppf is how returns are generated and taxed. Sukanya Samriddhi typically suits growth-oriented investors while Ppf may appeal to those prioritizing stability or specific tax advantages.</p>
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
            <p className="text-sm text-green-700 leading-relaxed">Most financial advisors recommend not putting all your money in one option. A diversified approach - splitting between Sukanya Samriddhi and Ppf based on your specific goals - often provides better risk-adjusted returns than going all-in on either. Use this calculator to find your optimal split.</p>
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
          Sukanya Samriddhi Vs PPF Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Sukanya Samriddhi Vs PPF USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Sukanya Samriddhi vs PPF Calculator Example (India 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, depositing INR 10,000/month in SSY from your daughter's birth, your Sukanya Samriddhi vs PPF calculator India 2026 shows the maturity corpus at age 21 and how it compares to PPF with the same contributions.
        </p>
      </Card>

            <SEOContent
        title="Sukanya Samriddhi vs PPF Calculator India – SSY or PPF: Best Savings for Your Daughter in 2026?"
        category="finance"
        intro={`Sukanya Samriddhi Yojana (SSY) and PPF are India's two best small savings schemes for long-term, tax-free wealth accumulation — and SSY has a specific edge for parents of daughters: it offers a higher interest rate (8.2% vs 7.1%) and the same EEE (Exempt-Exempt-Exempt) tax status. The trade-off is SSY's purpose-specificity: it's designed for a girl child's education and marriage, with specific withdrawal rules tied to age milestones.

SSY accounts can be opened for girls below age 10, at post offices or designated banks. The maximum annual contribution is ₹1.5 lakh (same as PPF), eligible for Section 80C deduction. The account matures when the girl turns 21, or at her marriage after age 18. Partial withdrawal (up to 50% of balance) is allowed after the girl turns 18 for education expenses.

The 1.1% higher interest rate of SSY vs PPF compounds significantly over the tenure. ₹1.5 lakh annually invested for 15 years at 8.2% vs 7.1%: the SSY account grows to approximately ₹47.3 lakh vs PPF's ₹40.7 lakh — ₹6.6 lakh more, entirely from the rate differential.`}
        howItWorks={`SSY maturity value: ₹1.5 lakh annually at 8.2% compounded annually for 15 years of contributions (account runs for 21 years total; contributions for 15 years from opening).

FV calculation: Annual contributions for 15 years: ₹1,50,000 × [(1.082)^15 - 1] / 0.082 × 1.082 ≈ ₹47.3 lakh (plus the last 6 years of compounding with no additional contributions brings the 21-year final value higher).

Comparison at actual maturity age: The 21-year SSY vs 15-year PPF comparison requires accounting for the additional 6 years of compounding on the SSY balance after contributions stop. Final SSY maturity ≈ ₹47.3 lakh × (1.082)^6 ≈ ₹75-80 lakh (depending on exact contribution dates).`}
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
        tipsSection={`Open SSY accounts as early as possible — ideally within the first few years of a daughter's life — to maximize the compounding period. A parent who opens SSY for a newborn daughter gets 21 years of compounding; waiting until age 8 reduces the period significantly.

For families with daughters who plan to attend college or professional programs, SSY's partial withdrawal for education expenses provides structured, tax-free funding for education — equivalent to a 529 plan in the US but with government-guaranteed rates.

If you have Section 80C space beyond SSY (up to ₹1.5 lakh for the girl child's account), PPF for the parent or other family members complements SSY effectively — giving the family multiple government-guaranteed, tax-free savings streams.`}
        conclusion={`SSY is the right vehicle when the savings are genuinely earmarked for the girl child's future. The purpose-specificity and age restrictions on withdrawal enforce discipline — you can't easily divert these funds for other purposes. For parents building a dedicated education and marriage fund for daughters, SSY's higher rate and EEE status make it the optimal vehicle.

For parents who want flexibility in how accumulated savings are deployed (potentially for other purposes beyond the daughter's education or marriage), PPF remains relevant alongside SSY. Running both at the maximum annual limit captures the best of both government schemes.`}

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
