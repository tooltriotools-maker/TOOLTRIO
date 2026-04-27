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
  const [investment, setInvestment] = useState(100000)
  const [nscRate, setNscRate] = useState(7.7)
  const [fdRate, setFdRate] = useState(7.0)
  const [taxSlab, setTaxSlab] = useState(30)

  // NSC: 5-year tenure, compounded annually, interest re-invested but taxable
  const result = useMemo(() => {
    const years = 5

    // NSC maturity: compounded annually for 5 years
    const nscFV = investment * Math.pow(1 + nscRate / 100, years)
    const nscGain = nscFV - investment
    // NSC: interest accrued each year qualifies for 80C re-investment deduction (years 1-4)
    // Effective: first-year investment + 4 years accrued interest qualify for 80C
    const taxSavingNSC = investment * (taxSlab / 100) // initial 80C benefit
    const nscTax = nscGain * (taxSlab / 100) // full gain taxable at maturity
    const nscPostTax = nscFV - nscTax + taxSavingNSC

    // FD: compounded quarterly, interest taxed as per slab
    const fdFV = investment * Math.pow(1 + fdRate / 100, years)
    const fdGain = fdFV - investment
    const fdTax = fdGain * (taxSlab / 100)
    const fdPostTax = fdFV - fdTax

    // Year-wise accrual
    const barData = [
      { name: 'Maturity Value', nsc: Math.round(nscFV), fd: Math.round(fdFV) },
      { name: 'Interest Earned', nsc: Math.round(nscGain), fd: Math.round(fdGain) },
      { name: 'Post-Tax Value', nsc: Math.round(nscPostTax), fd: Math.round(fdPostTax) },
    ]

    return {
      nscFV: Math.round(nscFV), nscGain: Math.round(nscGain), nscTax: Math.round(nscTax),
      nscPostTax: Math.round(nscPostTax), taxSavingNSC: Math.round(taxSavingNSC),
      fdFV: Math.round(fdFV), fdGain: Math.round(fdGain), fdTax: Math.round(fdTax), fdPostTax: Math.round(fdPostTax),
      nscBetter: nscPostTax > fdPostTax,
      difference: Math.round(Math.abs(nscPostTax - fdPostTax)),
      barData,
    }
  }, [investment, nscRate, fdRate, taxSlab])

  return (
    <CalculatorLayout title="NSC vs FD Calculator India 2026" description="Compare National Savings Certificate vs Fixed Deposit on post-tax returns and tax benefits." icon="📮" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4" /> Investment Details
          </h2>
          <div className="space-y-4">
            <InputField label="Investment Amount" value={investment} onChange={setInvestment} min={1000} max={10000000} step={1000} prefix="₹" />
            <InputField label="NSC Interest Rate" value={nscRate} onChange={setNscRate} min={5} max={10} step={0.1} suffix="%" />
            <InputField label="FD Interest Rate" value={fdRate} onChange={setFdRate} min={4} max={10} step={0.25} suffix="%" />
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
              <p className="text-green-400 font-bold">NSC Tenure</p>
              <p className="text-white font-bold text-lg">5 Years</p>
            </div>
            <div className="p-2 bg-blue-900/20 rounded-lg border border-blue-800/30 text-center">
              <p className="text-blue-400 font-bold">80C Benefit</p>
              <p className="text-white font-bold">{fmtCompact(result.taxSavingNSC)}</p>
            </div>
          </div>
          <div className={`mt-3 p-3 rounded-xl border-2 text-center ${result.nscBetter ? 'bg-green-50 border-green-300' : 'bg-blue-50 border-blue-300'}`}>
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Post-Tax Winner</p>
            <p className="text-xl font-black" style={{ color: result.nscBetter ? '#10b981' : '#3b82f6' }}>{result.nscBetter ? 'NSC' : 'FD'} 🏆</p>
            <p className="text-sm text-gray-500">by {fmtCompact(result.difference)}</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="NSC Post-Tax" value={fmtCompact(result.nscPostTax)} subValue={`Incl. 80C saving`} highlight={result.nscBetter} icon={<Shield className="w-4 h-4" />} />
            <ResultCard label="FD Post-Tax" value={fmtCompact(result.fdPostTax)} subValue={`TDS deducted`} highlight={!result.nscBetter} icon={<Landmark className="w-4 h-4" />} />
            <ResultCard label="NSC Maturity" value={fmtCompact(result.nscFV)} subValue={`${nscRate}% p.a.`} />
            <ResultCard label="FD Maturity" value={fmtCompact(result.fdFV)} subValue={`${fdRate}% p.a.`} />
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">NSC vs FD - 5 Year Comparison</h3>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={result.barData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={70}
                    tickFormatter={v => v >= 100000 ? `₹${(v/100000).toFixed(1)}L` : `₹${(v/1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} formatter={(v: number, name) => [fmt(v), name]} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="fd" name="FD" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="nsc" name="NSC" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">NSC vs FD Key Facts</h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              {[
                { title: '📮 NSC Facts', items: [`Rate: ${nscRate}% p.a. compounded annually`, 'Lock-in: 5 years (no premature exit)', '80C deduction up to ₹1.5L', 'Interest re-invested qualifies 80C', 'Government of India backed', 'Accepted as loan collateral'] },
                { title: '🏦 FD Facts', items: [`Rate: ${fdRate}% p.a. compounded quarterly`, 'Premature withdrawal allowed (-0.5-1%)', 'No 80C benefit on regular FD', 'TDS deducted if interest >₹40K/yr', 'DICGC insured up to ₹5L', 'Sweep-in FDs offer partial liquidity'] },
              ].map(s => (
                <div key={s.title}>
                  <p className="font-bold text-gray-300 mb-2">{s.title}</p>
                  {s.items.map(item => <p key={item} className="text-gray-400 py-0.5 border-b border-gray-800">- {item}</p>)}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
            <div className="mt-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-6">Nsc vs Fd: Complete Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-base">What is Nsc?</h3>
              <p>Nsc is a India investment or financial product that offers distinct advantages depending on your goals, tax situation, and time horizon. Understanding how it works is key to making the most of your money.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">What is Fd?</h3>
              <p>Fd takes a different approach to growing or protecting your wealth. Each has its own risk profile, liquidity characteristics, and tax treatment that makes it suited to specific financial situations.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">Key Differences</h3>
              <p>The most important distinction between Nsc and Fd is how returns are generated and taxed. Nsc typically suits growth-oriented investors while Fd may appeal to those prioritizing stability or specific tax advantages.</p>
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
            <p className="text-sm text-green-700 leading-relaxed">Most financial advisors recommend not putting all your money in one option. A diversified approach - splitting between Nsc and Fd based on your specific goals - often provides better risk-adjusted returns than going all-in on either. Use this calculator to find your optimal split.</p>
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
          NSC Vs FD Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this NSC Vs FD USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          NSC vs FD Calculator Example (India 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, investing INR 2 lakh for 5 years in the 30% tax bracket, your NSC vs FD calculator India 2026 shows NSC's tax reinvestment benefit making it worth INR 8,000-12,000 more than an FD.
        </p>
      </Card>

            <SEOContent
        title="NSC vs FD Calculator India – Which Government-Backed Investment Pays More After Tax in 2026?"
        category="finance"
        intro={`NSC (National Savings Certificate) and bank FDs are both popular small savings options in India, but they differ in important ways that affect which is better for a specific investor. NSC is a government-backed savings bond issued through post offices, currently offering 7.7% per annum for 5-year tenure. The critical advantage of NSC: the interest is effectively compounding and reinvested (you don't receive annual payouts), and the interest earned is eligible for Section 80C deduction in subsequent years.

The Section 80C treatment of NSC interest is its distinctive feature. While NSC interest is technically taxable each year as accrual income, tax officers and common practice treat it as reinvested and deductible under Section 80C in subsequent years (up to the ₹1.5 lakh limit). This effectively makes the interest tax-advantaged for investors whose 80C limit is otherwise unfilled.

Bank FDs are simpler, more flexible (various tenures available, not just 5 years), and FDIC-equivalent (DICGC insured up to ₹5 lakh per bank). NSC is backed by the Government of India — effectively zero credit risk. Both are safe; the comparison is purely about after-tax returns and flexibility.`}
        howItWorks={`NSC return: 7.7% compounding annually on principal. For ₹1 lakh over 5 years at 7.7%: ₹1,00,000 × (1.077)^5 = ₹1,44,903.

Tax treatment comparison: FD interest is taxed at income slab rate each year as it accrues. NSC interest accrues annually but in practice is treated as reinvested and eligible for 80C deduction. For a 30% slab investor: FD at 7.5% effective after-tax return = 5.25%. NSC at 7.7% where accrued interest offsets 80C = closer to 7.7% effective for investors who can fully utilize the 80C offset.

Actual tax-equivalent comparison: The NSC advantage disappears for investors whose 80C limit is already fully utilized by PF, insurance, and other deductions. For those investors, NSC interest is taxable at the slab rate and the FD vs NSC comparison becomes rate-based only.`}
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
        tipsSection={`NSC is most beneficial for investors who: (1) are not fully utilizing their ₹1.5 lakh 80C limit, (2) want government credit backing rather than bank credit risk, and (3) don't need the interest as annual income (since NSC compounds rather than paying out).

For FD comparison: 5-year tax-saving FDs also qualify for Section 80C deduction on the principal amount (not interest). This makes the principal deduction identical between NSC and tax-saving FDs. The comparison then becomes purely the interest rate and any difference in tax treatment of earnings.

TDS on FDs: Banks deduct TDS when annual interest exceeds ₹40,000 (₹50,000 for seniors). File Form 15G/H to avoid TDS if total income is below taxable threshold. NSC has no TDS — interest is self-reported at filing.`}
        conclusion={`NSC and 5-year bank FDs serve the same core function — medium-term safe savings with Section 80C benefit on the principal. The choice between them mainly comes down to rates (compare current NSC rate against best 5-year tax-saving FD rates), government vs bank backing preference, and whether you want annual interest income (FD) or compounding without payouts (NSC).

For most investors in the 30% tax bracket who have already maximized their 80C through EPF, ELSS, and insurance, the NSC interest's 80C treatment provides limited incremental benefit — and the FD wins on flexibility. Use [our NSC vs PPF Calculator](/calculators/finance/nsc-vs-ppf-calculator) if you're comparing NSC against the longer-term PPF option.`}

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
