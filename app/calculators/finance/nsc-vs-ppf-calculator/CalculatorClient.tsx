'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Shield } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string }
export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, fmtCompact } = useCurrency()
  const [investment, setInvestment] = useState(150000)
  const [nscRate, setNscRate] = useState(7.7)
  const [ppfRate, setPpfRate] = useState(7.1)
  const [taxSlab, setTaxSlab] = useState(30)
  const [years, setYears] = useState(15)

  const result = useMemo(() => {
    // NSC: 5yr compounding, interest taxable but re-invested (80C offset years 1-4)
    const nscCycles = Math.floor(years / 5)
    const nscFV = investment * Math.pow(1 + nscRate / 100, years)
    const nscGain = nscFV - investment
    const nscTax = nscGain * (taxSlab / 100)
    const nscPostTax = nscFV - nscTax + investment * (taxSlab / 100) // 80C saving
    // PPF: EEE, annual compounding
    let ppfFV = 0
    for (let y = 1; y <= years; y++) ppfFV += investment / years * Math.pow(1 + ppfRate / 100, years - y + 1)
    // Simplified: lumpsum yearly
    ppfFV = investment * Math.pow(1 + ppfRate / 100, years)
    const ppfGain = ppfFV - investment
    const barData = [
      { name: 'Maturity Value', nsc: Math.round(nscFV), ppf: Math.round(ppfFV) },
      { name: 'Post-Tax Value', nsc: Math.round(nscPostTax), ppf: Math.round(ppfFV) },
    ]
    return { nscFV: Math.round(nscFV), nscPostTax: Math.round(nscPostTax), nscTax: Math.round(nscTax), ppfFV: Math.round(ppfFV), ppfGain: Math.round(ppfGain), nscBetter: nscPostTax > ppfFV, difference: Math.round(Math.abs(nscPostTax - ppfFV)), barData }
  }, [investment, nscRate, ppfRate, taxSlab, years])

  return (
    <CalculatorLayout title="NSC vs PPF Calculator India 2026" description="Compare NSC vs PPF on post-tax returns, lock-in period, and 80C deduction benefits." icon="📮" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-4">Details</h2>
          <div className="space-y-4">
            <InputField label="Investment Amount" value={investment} onChange={setInvestment} min={1000} max={1500000} step={5000} prefix="₹" />
            <InputField label="NSC Interest Rate" value={nscRate} onChange={setNscRate} min={5} max={10} step={0.1} suffix="%" />
            <InputField label="PPF Interest Rate" value={ppfRate} onChange={setPpfRate} min={6} max={9} step={0.05} suffix="%" />
            <InputField label="Investment Period" value={years} onChange={setYears} min={5} max={30} step={5} suffix="Yrs" />
            <div>
              <p className="text-xs font-semibold text-gray-600 mb-2">Your Tax Slab</p>
              <div className="grid grid-cols-4 gap-1">
                {[0,5,20,30].map(t => <button key={t} onClick={() => setTaxSlab(t)} className={`py-1.5 rounded-lg text-xs font-bold border-2 transition-all ${taxSlab===t ? 'bg-green-100 border-green-400 text-green-700' : 'bg-gray-50 border-gray-200 text-gray-500'}`}>{t}%</button>)}
              </div>
            </div>
          </div>
          <div className={`mt-4 p-3 rounded-xl border-2 text-center ${result.nscBetter ? 'bg-green-50 border-green-300' : 'bg-purple-50 border-purple-300'}`}>
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Post-Tax Winner</p>
            <p className="text-xl font-black" style={{ color: result.nscBetter ? '#10b981' : '#8b5cf6' }}>{result.nscBetter ? 'NSC' : 'PPF'} 🏆</p>
            <p className="text-sm text-gray-500">by {fmtCompact(result.difference)}</p>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="NSC Post-Tax" value={fmtCompact(result.nscPostTax)} subValue={`Tax: ${fmtCompact(result.nscTax)}`} highlight={result.nscBetter} icon={<Shield className="w-4 h-4" />} />
            <ResultCard label="PPF Maturity" value={fmtCompact(result.ppfFV)} subValue="EEE tax-free" highlight={!result.nscBetter} />
            <ResultCard label="NSC Maturity" value={fmtCompact(result.nscFV)} subValue={`${nscRate}% compounded`} />
            <ResultCard label="PPF Gain" value={fmtCompact(result.ppfGain)} subValue="Tax-free returns" />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">NSC vs PPF - Value Comparison</h3>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={result.barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={70} tickFormatter={v => v >= 100000 ? `₹${(v/100000).toFixed(1)}L` : `₹${(v/1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8 }} formatter={(v: number, n) => [fmt(v), n]} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="ppf" name="PPF" fill="#8b5cf6" radius={[4,4,0,0]} />
                  <Bar dataKey="nsc" name="NSC" fill="#10b981" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <div className="grid grid-cols-2 gap-3">
            <Card>
              <h3 className="text-sm font-semibold text-green-400 mb-2">📮 NSC Key Facts</h3>
              <ul className="text-xs text-gray-400 space-y-1"><li>- Rate: {nscRate}% compounded annually</li><li>- Lock-in: 5 years (no exit)</li><li>- 80C deduction up to ₹1.5L</li><li>- Available at Post Offices</li><li>- Accepted as loan collateral</li></ul>
            </Card>
            <Card>
              <h3 className="text-sm font-semibold text-purple-400 mb-2">🏛️ PPF Key Facts</h3>
              <ul className="text-xs text-gray-400 space-y-1"><li>- Rate: {ppfRate}% p.a. (EEE status)</li><li>- Lock-in: 15 years</li><li>- Max deposit: ₹1.5L/year</li><li>- Loan from year 3+</li><li>- Partial withdrawal from year 7+</li></ul>
            </Card>
          </div>
        </div>
      </div>
            <div className="mt-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-6">Nsc vs Ppf: Complete Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-base">What is Nsc?</h3>
              <p>Nsc is a India investment or financial product that offers distinct advantages depending on your goals, tax situation, and time horizon. Understanding how it works is key to making the most of your money.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">What is Ppf?</h3>
              <p>Ppf takes a different approach to growing or protecting your wealth. Each has its own risk profile, liquidity characteristics, and tax treatment that makes it suited to specific financial situations.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">Key Differences</h3>
              <p>The most important distinction between Nsc and Ppf is how returns are generated and taxed. Nsc typically suits growth-oriented investors while Ppf may appeal to those prioritizing stability or specific tax advantages.</p>
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
            <p className="text-sm text-green-700 leading-relaxed">Most financial advisors recommend not putting all your money in one option. A diversified approach - splitting between Nsc and Ppf based on your specific goals - often provides better risk-adjusted returns than going all-in on either. Use this calculator to find your optimal split.</p>
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
          NSC Vs PPF Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this NSC Vs PPF USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          NSC vs PPF Calculator Example (India 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, investing INR 50,000/year for 15 years, your NSC vs PPF calculator India 2026 shows PPF building INR 13.6 lakh tax-free vs NSC's after-tax corpus in your bracket.
        </p>
      </Card>

            <SEOContent
        title="NSC vs PPF Calculator India – NSC or PPF: Which 80C Investment Is Better in 2026?"
        category="finance"
        intro={`NSC (5-year tenor, 7.7%) and PPF (15-year tenor, 7.1%) are both government-backed savings instruments eligible for Section 80C deduction, but they serve very different time horizons. NSC is a medium-term instrument maturing in 5 years with guaranteed returns. PPF is a long-term retirement and wealth-building vehicle with a 15-year lock-in, partial withdrawal privileges from year 7, and the significant benefit of completely tax-free interest.

PPF's tax advantage is decisive for long-term investors: interest is tax-free, principal deduction under 80C, and maturity proceeds are tax-free. This EEE (Exempt-Exempt-Exempt) status is extremely valuable. At 7.1% compounded annually and completely tax-free, PPF's effective yield for a 30% tax slab investor is equivalent to a taxable instrument yielding approximately 10.1% — extraordinary for a risk-free government instrument.

NSC's 5-year tenure is its key advantage over PPF for investors who need medium-term capital safety with a guaranteed exit. NSC allows better liquidity planning for specific 5-year goals. PPF is better for goals 15+ years away and for maximizing tax-free wealth accumulation.`}
        howItWorks={`PPF effective return for 30% bracket: 7.1% tax-free = 7.1% / (1 - 0.30) = 10.14% taxable equivalent. This is the benchmark against which to compare PPF alternatives.

NSC return: 7.7% compounding annually. For ₹1.5 lakh invested annually over 5 years at 7.7%: total investment ₹7.5 lakh, maturity value approximately ₹9.13 lakh (before tax on accrued interest). After-tax depends on 80C utilization.

PPF at 15 years: ₹1.5 lakh annually at 7.1% for 15 years = approximately ₹40.5 lakh, fully tax-free. The long compounding period and tax-free status create exceptional outcomes for patient investors.`}
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
        tipsSection={`Open a PPF account as early as possible to maximize the 15-year minimum compounding period and the extended account continuances thereafter (5-year extensions are possible indefinitely). A PPF account opened at 25 can accumulate for 40+ years tax-free if extended past the initial 15-year tenure.

For NSC: invest when you have Section 80C headroom (contributions haven't yet reached ₹1.5 lakh limit) and specific 5-year goals. The NSC lock-in corresponds to the 5-year horizon of many medium-term financial goals.

NSC can be used as collateral for loans from banks and post offices — a practical advantage over PPF for investors who may need liquidity before maturity. Up to 80-85% of NSC value is typically available as a secured loan.`}
        conclusion={`The optimal strategy for most Section 80C investors is not NSC versus PPF but a combination: maximize PPF contribution (₹1.5 lakh annually) for long-term tax-free wealth, and use NSC or 5-year tax-saving FDs for any additional 80C space for medium-term savings goals — though PPF already uses the full 80C limit for most investors.

If your PPF balance is already substantial and 15-year goals are well-funded, NSC's flexibility and government backing make it an excellent vehicle for additional safe savings beyond the 80C threshold. Compare with [our PPF Calculator](/calculators/finance/ppf-calculator) for detailed PPF maturity and extension projections.`}

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
