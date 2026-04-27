'use client'
import { useState, useMemo } from 'react'
import { calculateTip } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { Users, DollarSign, Percent, Receipt } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, currency } = useCurrency()
  const [bill, setBill] = useState(1200)
  const [tipPct, setTipPct] = useState(15)
  const [people, setPeople] = useState(4)

  const r = useMemo(() => calculateTip(bill, tipPct, people), [bill, tipPct, people])

  const quickTips = [10, 15, 18, 20, 25]

  return (
    <CalculatorLayout title="Tip Calculator USA 2026" description="Calculate restaurant tip amounts and split bills between any number of people instantly." icon="🍽️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Bill Details</h2>
          <div className="space-y-5">
            <InputField label="Bill Amount" value={bill} onChange={setBill} min={1} max={100000} step={10} prefix={currency.symbol} />
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Tip Percentage</label>
              <div className="flex gap-2 flex-wrap mb-2">
                {quickTips.map(pct => (
                  <button key={pct} onClick={() => setTipPct(pct)}
                    className={`px-3 py-1.5 rounded-xl text-sm font-bold border-2 transition-all ${tipPct === pct ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                    {pct}%
                  </button>
                ))}
              </div>
              <InputField label="" value={tipPct} onChange={setTipPct} min={0} max={100} step={1} suffix="%" />
            </div>
            <InputField label="Number of People" value={people} onChange={setPeople} min={1} max={50} step={1} suffix="ppl" />
          </div>

          <div className="mt-5 p-4 rounded-2xl bg-green-600 text-white text-center">
            <p className="text-sm opacity-80">Per Person Total</p>
            <p className="text-4xl font-black mt-1">{fmt(r.perPerson)}</p>
            <p className="text-sm opacity-80 mt-1">Including {fmt(r.tipPerPerson)} tip each</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Tip Amount" value={fmt(r.tipAmount)} highlight icon={<Percent className="w-4 h-4" />} />
            <ResultCard label="Total Bill" value={fmt(r.totalAmount)} icon={<DollarSign className="w-4 h-4" />} />
            <ResultCard label="Per Person" value={fmt(r.perPerson)} icon={<Users className="w-4 h-4" />} />
            <ResultCard label="Tip Per Person" value={fmt(r.tipPerPerson)} icon={<Receipt className="w-4 h-4" />} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-4">Bill Summary</h3>
        </Card>
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Tip Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Tip USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      <SEOContent
        title="Tip Calculator USA – Calculate Restaurant Tip and Split the Bill Instantly in 2026"
        category="finance"
        intro={`Restaurant tipping in the US has become both more complicated and more psychologically loaded over the past decade. The emergence of tablet-based point-of-sale systems has introduced tip prompts at counter service and takeout contexts where tipping wasn't previously standard — and the suggested percentages displayed have crept upward, with many prompts now suggesting 20%, 25%, and 30% as the baseline options.

The traditional guideline of 15-20% for full table service at a sit-down restaurant remains appropriate for most contexts. Exceptional service at a higher price point, large parties requiring significant coordination, or tipping in particularly high cost-of-living areas may justify 20-25%. Counter service at coffee shops and fast-casual restaurants — where you order at the counter and food is brought or you pick it up — is where tipping norms are genuinely evolving and less clearly defined.

Bill splitting calculations are a common source of friction and occasional awkwardness. Whether you split evenly, split by what each person ordered, or handle specific situations (one person not drinking, one person ordering appetizers) is a practical calculation this tool handles cleanly.`}
        howItWorks={`Tip calculation: Tip amount = Bill × tip percentage. Total per person for even split: (Bill × (1 + tip rate)) / number of people.

For uneven splits: each person's share = their items total × (1 + tip rate). Or split the tip proportionally: each person pays tip proportional to what they ordered. This avoids the light eater / heavy drinker problem in group settings.

Rounding for easy payment: Round total per person to nearest dollar or round the total bill to nearest 10 before calculating tip for cleaner mental math. A $47 bill with 20% tip = $56.40; rounding to $57 total covers 21.3% tip — acceptable for most situations.`}
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
        tipsSection={`Tip on pre-tax amount: The IRS considers tips personal and doesn't regulate whether you tip on pre-tax or post-tax amount — but tipping on the pre-tax bill is the original and still common guideline. On a $80 bill with $6 tax: tipping 20% on $80 = $16 vs on $86 = $17.20. The $1.20 difference is minor; tip on whichever feels natural.

For larger parties (6+), many restaurants automatically add 18-20% gratuity to the bill. Check before adding an additional tip. If the service has been genuinely exceptional, you can add extra on top of the auto-gratuity — but you're not obligated to.

For delivery apps: the tip goes directly to the driver, not the restaurant. 15-20% is appropriate for standard delivery; more for large orders, difficult conditions (rain, heat), long distances, or particularly prompt delivery.`}
        conclusion={`The tip prompt creep at counter service has created genuine uncertainty about when tipping is socially expected versus optional. The practical answer: tip at table service restaurants (where servers depend on tips for wages) at 18-20% minimum; tip at coffee shops and counter service at your discretion; don't feel obligated to tip at fast food locations without table service.

For large groups: splitting the bill evenly only works well when orders are roughly similar in cost. For groups with wide price variation (some people ordering steak, others ordering salads; some drinking, others not), proportional splitting is fairer and worth the extra minute of calculation it requires.`}

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
            { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "ROI Calculator", href: "/calculators/finance/roi-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Savings Rate Calculator", href: "/calculators/finance/savings-rate-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Net Worth Calculator", href: "/calculators/finance/net-worth-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Fire Calculator", href: "/calculators/finance/fire-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Retirement Calculator", href: "/calculators/finance/retirement-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "Income Tax Calculator", href: "/calculators/finance/income-tax-calculator", icon: "🔗", desc: "Related financial planning" },
        ]}
      />
      <FAQSection faqs={faqs} />
      </div>
        {/* Internal Links */}
        {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },          { name: "Simple Interest Calculator", href: "/calculators/finance/simple-interest-calculator", icon: "📊", desc: "Free calculator" },          { name: "Inflation Calculator", href: "/calculators/finance/inflation-calculator", icon: "📉", desc: "Free calculator" },          { name: "Real Return Calculator", href: "/calculators/finance/real-return-calculator", icon: "📊", desc: "Free calculator" },          { name: "XIRR Calculator", href: "/calculators/finance/xirr-calculator", icon: "📊", desc: "Free calculator" },          { name: "Currency Converter Calculator", href: "/calculators/finance/currency-converter", icon: "💱", desc: "Free calculator" },          { name: "Currency Profit Calculator", href: "/calculators/finance/currency-profit-calculator", icon: "📊", desc: "Free calculator" },          { name: "ROI Calculator", href: "/calculators/finance/roi-calculator", icon: "📈", desc: "Free calculator" },          { name: "P/E Ratio Calculator", href: "/calculators/finance/pe-ratio-calculator", icon: "📊", desc: "Free calculator" },          { name: "CAGR Calculator", href: "/calculators/finance/cagr-calculator", icon: "📊", desc: "Free calculator" },          { name: "Crypto Profit Calculator", href: "/calculators/finance/crypto-profit-calculator", icon: "₿", desc: "Free calculator" },          { name: "Stock Profit Calculator", href: "/calculators/finance/stock-profit-calculator", icon: "💹", desc: "Free calculator" },
          ]}
        />
      </div>
      </div>
    </CalculatorLayout>
  )
}
