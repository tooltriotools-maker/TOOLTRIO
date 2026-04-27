'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { calculateBiweeklyMortgage } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { ChartWrapper } from '@/components/ui/ChartWrapper'
import { SEOContent } from '@/components/ui/SEOContent'
import { biweeklyMortgageSEOContent } from '@/lib/seo/calculator-seo-content'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function BiweeklyMortgageClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { currency, fmt, fmtCompact } = useCurrency()

  const [loanAmount, setLoanAmount] = useState(currency.code === 'INR' ? 5000000 : 350000)
  const [rate, setRate]             = useState(7.0)
  const [years, setYears]           = useState(30)

  const result = useMemo(() => calculateBiweeklyMortgage(loanAmount, rate, years), [loanAmount, rate, years])

  const comparisonData = [
    { name: 'Monthly Payments', interest: result.totalMonthlyInterest, years: years },
    { name: 'Biweekly Payments', interest: result.totalBiweeklyInterest, years: result.yearsToPayoff },
  ]

  return (
    <CalculatorLayout title="Biweekly Mortgage Calculator USA 2026" description="See how paying every two weeks cuts years off your mortgage and saves thousands in interest." icon="📅" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="biweekly-mortgage-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-5">Mortgage Details</h2>
          <div className="space-y-5">
            <InputField label={`Loan Amount (${currency.symbol})`} value={loanAmount} onChange={setLoanAmount} min={50000} max={5000000} step={10000} prefix={currency.symbol} />
            <InputField label="Annual Interest Rate" value={rate} onChange={setRate} min={1} max={15} step={0.05} suffix="%" />
            <InputField label="Loan Term" value={years} onChange={setYears} min={10} max={30} step={5} suffix="Yrs" />
          </div>
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
            <p className="text-xs font-bold text-green-700 mb-2">How biweekly works:</p>
            <p className="text-xs text-green-800 leading-relaxed">Instead of 12 monthly payments, you make 26 half-payments per year -- equal to 13 full payments. That extra payment each year chips away at principal faster.</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Interest Saved" value={fmtCompact(result.interestSaved)} subValue="Total savings" highlight />
            <ResultCard label="Years Saved" value={`${result.yearsSaved} yrs`} subValue="Pay off sooner" />
            <ResultCard label="Biweekly Payment" value={fmt(result.biweeklyPayment)} subValue="Every 2 weeks" />
            <ResultCard label="Payoff In" value={`${result.yearsToPayoff} yrs`} subValue={`vs ${years} yrs`} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Monthly vs Biweekly</h3>
              <div className="space-y-3 text-sm">
                {[
                  ['Monthly payment', fmt(result.monthlyPayment)],
                  ['Biweekly payment', fmt(result.biweeklyPayment)],
                  ['Monthly total interest', fmtCompact(result.totalMonthlyInterest)],
                  ['Biweekly total interest', fmtCompact(result.totalBiweeklyInterest)],
                  ['Interest saved', fmtCompact(result.interestSaved)],
                  ['Years to payoff (monthly)', `${years} years`],
                  ['Years to payoff (biweekly)', `${result.yearsToPayoff} years`],
                  ['Years saved', `${result.yearsSaved} years`],
                ].map(([l, v]) => (
                  <div key={l} className="flex justify-between border-b border-gray-100 pb-1.5 last:border-0">
                    <span className="text-gray-500">{l}</span>
                    <span className="font-semibold">{v}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Total Interest Comparison</h3>
              <ChartWrapper height={200}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} width={70} tickFormatter={(v) => `${currency.symbol}${(v / 1000).toFixed(0)}K`} />
                    <Tooltip formatter={(v: number) => fmt(v)} />
                    <Bar dataKey="interest" name="Total Interest" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartWrapper>
              <div className="mt-3 p-3 bg-green-50 rounded-xl text-center">
                <p className="text-xs text-gray-600">Biweekly saves you</p>
                <p className="text-2xl font-black text-green-600">{fmtCompact(result.interestSaved)}</p>
                <p className="text-xs text-gray-500">in total interest</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <div className="mt-8">

        {/* Internal Links */}
        {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "Mortgage Calculator", href: "/calculators/finance/mortgage-calculator", icon: "🏡", desc: "Free calculator" },          { name: "Home Loan Calculator", href: "/calculators/finance/home-loan-calculator", icon: "🏠", desc: "Free calculator" },          { name: "Down Payment Calculator", href: "/calculators/finance/down-payment-calculator", icon: "💵", desc: "Free calculator" },          { name: "Closing Cost Calculator", href: "/calculators/finance/closing-cost-calculator", icon: "📋", desc: "Free calculator" },          { name: "Mortgage Refinance Calculator", href: "/calculators/finance/mortgage-refinance-calculator", icon: "🔄", desc: "Free calculator" },          { name: "Home Affordability Calculator", href: "/calculators/finance/home-affordability-calculator", icon: "💰", desc: "Free calculator" },          { name: "HELOC Calculator", href: "/calculators/finance/heloc-calculator", icon: "🏘️", desc: "Free calculator" },          { name: "Rent vs Buy Calculator", href: "/calculators/finance/rent-vs-buy-calculator", icon: "🔄", desc: "Free calculator" },          { name: "Cash Out Refinance vs HELOC Calculator", href: "/calculators/finance/cash-out-refinance-vs-heloc-calculator", icon: "📊", desc: "Free calculator" },          { name: "Mortgage vs Renting USA Calculator", href: "/calculators/finance/mortgage-vs-renting-usa-calculator", icon: "📊", desc: "Free calculator" },          { name: "Pay Off Mortgage vs Invest Calculator", href: "/calculators/finance/pay-off-mortgage-vs-invest-calculator", icon: "📊", desc: "Free calculator" },          { name: "Loan Prepayment Calculator", href: "/calculators/finance/loan-prepayment-calculator", icon: "⚡", desc: "Free calculator" },
          ]}
        />
        
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Biweekly Mortgage Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          A $350,000 mortgage at 6.5% over 30 years results in a monthly payment of approximately <strong>$2,212</strong> with total interest paid of $446,320.
        </p>
        <p className="text-sm text-gray-600">
          Use this Biweekly Mortgage USA 2026 tool to compare different loan amounts, interest rates, and terms to find your best option.
        </p>
      </Card>
      
      <Card className="mt-4 p-4">
        <h2 className="text-xl font-black text-gray-900 mb-3">Biweekly Mortgage Calculator USA 2026 – Pay Off Your Home Years Earlier</h2>
        <p className="text-sm text-gray-600">Biweekly mortgage payments are one of the most powerful zero-cost strategies to build home equity faster. This biweekly mortgage calculator USA 2026 shows exactly how many years earlier you will pay off your mortgage and how much interest you will save.</p>
      </Card>

        <SEOContent {...biweeklyMortgageSEOContent} category="finance" />
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
