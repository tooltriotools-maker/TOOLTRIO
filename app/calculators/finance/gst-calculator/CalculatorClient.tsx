'use client'
import { useState, useMemo } from 'react'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { calculateGST } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Receipt, Percent, DollarSign, ArrowUpDown } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

const GST_RATES = [{ value: '5', label: '5% - Essential goods' }, { value: '12', label: '12% - Standard goods' }, { value: '18', label: '18% - Most services' }, { value: '28', label: '28% - Luxury goods' }, { value: '3', label: '3% - Gold & jewellery' }, { value: '0.25', label: '0.25% - Rough diamonds' }]

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, currency } = useCurrency()
  const [amount, setAmount] = useState(10000)
  const [gstRate, setGstRate] = useState('18')
  const [type, setType] = useState<'exclusive' | 'inclusive'>('exclusive')

  const r = useMemo(() => calculateGST(amount, Number(gstRate), type), [amount, gstRate, type])

  const pie = [
    { name: 'Base Amount', value: r.originalAmount, color: '#93c5fd' },
    { name: 'GST Amount', value: r.gstAmount, color: '#16a34a' },
  ]

  const rateComparison = [5, 12, 18, 28].map(rate => {
    const res = calculateGST(amount, rate, type)
    return { rate: `${rate}%`, gst: res.gstAmount, total: res.totalAmount }
  })

  return (
    <CalculatorLayout title="Sales Tax GST Calculator USA 2026" description="Calculate tax-inclusive and tax-exclusive amounts, and reverse-calculate pre-tax price for any rate." icon="🧾" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">GST Details</h2>
          <div className="space-y-5">
            <InputField label="Amount" value={amount} onChange={setAmount} min={1} max={100000000} step={100} prefix={currency.symbol} />
            <SelectField label="GST Rate" value={gstRate} onChange={setGstRate} options={GST_RATES} />
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Calculation Type</label>
              <div className="grid grid-cols-2 gap-2">
                {(['exclusive', 'inclusive'] as const).map(t => (
                  <button key={t} onClick={() => setType(t)}
                    className={`py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${type === t ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                    {t === 'exclusive' ? '+ Add GST' : 'GST Included'}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">{type === 'exclusive' ? 'GST added on top of amount entered' : 'Amount entered already includes GST'}</p>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-center">
              <p className="text-xs text-blue-600 font-semibold">Base Amount</p>
              <p className="text-sm font-black text-blue-700 mt-0.5">{fmt(r.originalAmount)}</p>
            </div>
            <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-center">
              <p className="text-xs text-green-600 font-semibold">Total Amount</p>
              <p className="text-sm font-black text-green-700 mt-0.5">{fmt(r.totalAmount)}</p>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Total (with GST)" value={fmt(r.totalAmount)} highlight icon={<DollarSign className="w-4 h-4" />} />
            <ResultCard label="GST Amount" value={fmt(r.gstAmount)} icon={<Percent className="w-4 h-4" />} />
            <ResultCard label="CGST (50%)" value={fmt(r.cgst)} icon={<Receipt className="w-4 h-4" />} />
            <ResultCard label="SGST (50%)" value={fmt(r.sgst)} icon={<Receipt className="w-4 h-4" />} />
          </div>

          {/* IGST vs CGST+SGST Info */}
          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-4">GST Breakdown</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 font-semibold mb-3">Intra-State (CGST + SGST)</p>
                <div className="space-y-2">
                  {[{ label: 'Base Amount', value: r.originalAmount, color: 'text-blue-700 bg-blue-50 border-blue-200' }, { label: `CGST @ ${Number(gstRate) / 2}%`, value: r.cgst, color: 'text-green-700 bg-green-50 border-green-200' }, { label: `SGST @ ${Number(gstRate) / 2}%`, value: r.sgst, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' }, { label: 'Total Amount', value: r.totalAmount, color: 'text-gray-900 bg-gray-50 border-gray-300 font-black' }].map(row => (
                    <div key={row.label} className={`flex items-center justify-between p-3 rounded-xl border ${row.color}`}>
                      <span className="text-sm font-semibold">{row.label}</span>
                      <span className="text-sm font-bold">{fmt(row.value)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold mb-3">Inter-State (IGST)</p>
                <div className="space-y-2">
                  {[{ label: 'Base Amount', value: r.originalAmount, color: 'text-blue-700 bg-blue-50 border-blue-200' }, { label: `IGST @ ${gstRate}%`, value: r.igst, color: 'text-purple-700 bg-purple-50 border-purple-200' }, { label: 'Total Amount', value: r.totalAmount, color: 'text-gray-900 bg-gray-50 border-gray-300 font-black' }].map(row => (
                    <div key={row.label} className={`flex items-center justify-between p-3 rounded-xl border ${row.color}`}>
                      <span className="text-sm font-semibold">{row.label}</span>
                      <span className="text-sm font-bold">{fmt(row.value)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <p className="text-xs text-gray-500 leading-relaxed">IGST is applicable for inter-state transactions. CGST+SGST is for intra-state. Both result in the same total tax burden.</p>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-3">Base vs GST</h3>
              <div style={{ height: 180 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pie} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={3}>
                      {pie.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number) => fmt(v)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 mt-1">
                {pie.map(e => <div key={e.name} className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{ background: e.color }} /><span className="text-xs text-gray-600">{e.name}</span></div>)}
              </div>
            </Card>
            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-3">GST by Rate - Same Amount</h3>
              <div style={{ height: 180 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={rateComparison} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                    <XAxis dataKey="rate" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v, true)} width={55} />
                    <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8 }} formatter={(v: number) => [fmt(v), '']} />
                    <Bar dataKey="gst" name="GST Amount" fill="#16a34a" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <div className="mt-8">
      {/* 600-word SEO explanation */}
      <div className="mt-10">
        <Card>
          <h2 className="text-xl font-black text-gray-900 mb-4">GST Calculator - Complete Guide to India's Goods and Services Tax 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Understanding US sales tax / VAT Structure</h3>
              <p>GST (Goods and Services Tax), introduced on July 1, 2017, replaced over 17 central and state taxes including VAT, service tax, excise duty, CST, and octroi. It\'s a destination-based, multi-stage tax collected at every stage of the supply chain. India uses a 4-tier GST rate structure: 0% (essential items: unbranded food, healthcare, education), 5% (basic necessities: branded food, transport services), 12% (standard goods: processed foods, medicines), 18% (most services, electronics, financial services), and 28% (luxury goods: cars, tobacco, aerated drinks). A special 3% rate applies to gold and jewellery, and 0.25% for rough diamonds.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">CGST vs SGST vs IGST - When Each Applies</h3>
              <p>GST splits into two types based on transaction geography. Intra-state transactions (buyer and seller in same state): CGST (Central GST) = half the GST rate paid to Centre. SGST (State GST) = half the GST rate paid to State government. Inter-state transactions (different states): IGST (Integrated GST) = full GST rate paid to Centre, which then transfers the state\'s share. Example: 18% GST on a Delhi-to-Delhi transaction = 9% CGST + 9% SGST. Same 18% GST on Delhi-to-Mumbai = 18% IGST. The total tax burden is identical in both cases - only the collection and distribution mechanism differs.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">GST Input Tax Credit - How Businesses Benefit</h3>
              <p>GST\'s biggest reform for businesses is Input Tax Credit (ITC). Businesses registered under GST can claim credit for GST paid on purchases (inputs) against GST collected on sales (output). This eliminates the 'cascading tax' or 'tax on tax' problem that existed under VAT/Service Tax. Example: Manufacturer buys raw materials ($1,000 + 18% GST = $180 paid). Sells finished product ($2,000 + 18% GST = $360 collected). ITC = $180. Net GST payable = $360 - $180 = $180. Without ITC, the manufacturer would pay $360 even after paying $180 at purchase - that\'s the cascading problem GST solved.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">GST Compliance - Returns, Filing, and Penalties</h3>
              <p>GST-registered businesses must file regular returns: Form 1099-1 (sales details) filed monthly or quarterly. Form 1099-3B (monthly summary with tax payment) filed monthly. Form 1099-9 (annual return) filed yearly. For smaller businesses (turnover under $2 million): Form 1099-4 quarterly. Late filing penalties: $50/day for Form 1099-1 and Form 1099-3B, $200/day for annual returns, subject to a maximum cap. Interest at 18% p.a. on late tax payments. Composition scheme: Businesses with turnover under $1.5 million can opt for a simplified flat-rate tax (1-6%) with fewer compliance requirements. Understanding GST helps businesses and individuals alike accurately calculate prices, quotations, invoices, and tax obligations.</p>
            </div>
          </div>
        </Card>
      </div>


      {/* Internal Links */}
      {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },          { name: "Simple Interest Calculator", href: "/calculators/finance/simple-interest-calculator", icon: "📊", desc: "Free calculator" },          { name: "Inflation Calculator", href: "/calculators/finance/inflation-calculator", icon: "📉", desc: "Free calculator" },          { name: "Real Return Calculator", href: "/calculators/finance/real-return-calculator", icon: "📊", desc: "Free calculator" },          { name: "XIRR Calculator", href: "/calculators/finance/xirr-calculator", icon: "📊", desc: "Free calculator" },          { name: "Currency Converter Calculator", href: "/calculators/finance/currency-converter", icon: "💱", desc: "Free calculator" },          { name: "Currency Profit Calculator", href: "/calculators/finance/currency-profit-calculator", icon: "📊", desc: "Free calculator" },          { name: "Tip Calculator", href: "/calculators/finance/tip-calculator", icon: "💵", desc: "Free calculator" },          { name: "ROI Calculator", href: "/calculators/finance/roi-calculator", icon: "📈", desc: "Free calculator" },          { name: "P/E Ratio Calculator", href: "/calculators/finance/pe-ratio-calculator", icon: "📊", desc: "Free calculator" },          { name: "CAGR Calculator", href: "/calculators/finance/cagr-calculator", icon: "📊", desc: "Free calculator" },          { name: "Crypto Profit Calculator", href: "/calculators/finance/crypto-profit-calculator", icon: "₿", desc: "Free calculator" },
          ]}
        />
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          GST Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this GST USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Sales Tax GST Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, on a $2,000 business purchase in Texas (8.25% rate), your sales tax GST calculator USA 2026 instantly shows $165 in tax, a $2,165 total, and the pre-tax amount for any tax-inclusive price.
        </p>
      </Card>

            <SEOContent
        title="Sales Tax GST Calculator USA – Calculate Exact Tax on Any Purchase in 2026"
        category="finance"
        intro={`India's GST (Goods and Services Tax) replaced the complex web of central and state taxes in 2017, creating a unified national sales tax system across four primary rate slabs: 0%, 5%, 12%, 18%, and 28%. For US readers, this calculator also handles US sales tax calculations — different states, counties, and cities have different sales tax rates, and this tool helps you quickly compute tax-inclusive or tax-exclusive prices.

The most common business use of this calculator: verifying invoice amounts. When a vendor sends an invoice and you want to confirm that the GST amounts and totals are correctly computed, or when you need to quickly determine the pre-tax price from a tax-inclusive total. Working backward from a GST-inclusive price is a simple algebraic operation but is repeatedly done wrong by people who don't know the exact formula.

For Indian businesses, understanding which GST slab applies to your goods or services matters enormously: luxury goods face 28%, most services fall at 18%, essential goods often qualify for 5% or 0%. Input tax credit (ITC) — the ability to offset GST paid on inputs against GST collected on outputs — is the mechanism that prevents cascading taxation across the supply chain.`}
        howItWorks={`Tax-exclusive to tax-inclusive: Final price = Original price × (1 + GST rate/100). At 18% GST: ₹1,000 + 18% = ₹1,180.

Tax-inclusive to tax-exclusive: Original price = Inclusive price / (1 + GST rate/100). A ₹1,180 GST-inclusive price at 18% GST: ₹1,180 / 1.18 = ₹1,000 original. GST amount = ₹1,180 - ₹1,000 = ₹180.

For US sales tax, the same formulas apply with state-specific rates. California's base sales tax is 7.25%, but county and city additions bring many California locations to 9.5-10.25%. New York City sales tax is 8.875%. The calculator lets you input any rate for any jurisdiction.`}
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
        tipsSection={`For Indian B2B transactions, GST is split into CGST (Central GST) and SGST (State GST) for intrastate transactions, or IGST (Integrated GST) for interstate transactions. Each component is typically half the total rate for intrastate: 18% GST = 9% CGST + 9% SGST.

For US retailers or service providers operating across multiple states, be aware that economic nexus rules (South Dakota v. Wayfair, 2018) require sales tax collection from remote sellers above threshold volumes in many states even without physical presence. This has significantly complicated multi-state sales tax compliance for online businesses.

If you frequently deal with GST calculations in India, the GST portal (gst.gov.in) provides official HSN/SAC code lookups for determining the correct rate for specific goods and services.`}
        conclusion={`GST calculation errors on invoices are common and occasionally costly. Using this calculator to verify vendor invoices before payment catches errors before they become disputes. Running your own sales invoices through the calculator before sending prevents embarrassing corrections.

For businesses, quarterly or monthly GST return preparation requires accurate accumulation of all input tax credits and output tax. Professional accounting software handles this automatically, but understanding the underlying calculations helps you identify when figures look wrong. For smaller businesses handling GST manually, this calculator supports quick verification.`}

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
      
    </CalculatorLayout>
  )
}
