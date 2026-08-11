'use client'
import { useMemo, useState } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'

interface Props {
  faqs: { question: string; answer: string }[]
  structuredData?: object[]
  blogSlug?: string
  relatedCalculators?: any[]
}

const money = (n:number) => '$' + Math.round(n).toLocaleString()

export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [amount, setAmount] = useState(25000)
  const [taxRate, setTaxRate] = useState(22)
  const [penaltyRate, setPenaltyRate] = useState(10)
  const [loanRate, setLoanRate] = useState(7)
  const [investmentReturn, setInvestmentReturn] = useState(7)
  const [years, setYears] = useState(10)

  const result = useMemo(() => {
    const principal = Math.max(0, amount)
    const tax = Math.max(0, Math.min(100, taxRate)) / 100
    const penalty = Math.max(0, Math.min(100, penaltyRate)) / 100
    const loanR = Math.max(0, loanRate) / 100 / 12
    const months = Math.max(1, Math.floor(years * 12))
    const annualReturn = Math.max(-99, investmentReturn) / 100
    const withdrawalTax = principal * tax
    const withdrawalPenalty = principal * penalty
    const withdrawalCash = Math.max(0, principal - withdrawalTax - withdrawalPenalty)
    const lostGrowth = principal * Math.pow(1 + annualReturn, Math.max(0, years)) - principal
    const loanPayment = loanR === 0 ? principal / months : principal * loanR * Math.pow(1 + loanR, months) / (Math.pow(1 + loanR, months) - 1)
    const totalLoanPayments = loanPayment * months
    const loanInterest = Math.max(0, totalLoanPayments - principal)
    const loanNetCashCost = totalLoanPayments
    const withdrawalModeledRetirementCost = principal + lostGrowth
    return {
      withdrawalTax, withdrawalPenalty, withdrawalCash, lostGrowth,
      loanPayment, totalLoanPayments, loanInterest, loanNetCashCost,
      withdrawalModeledRetirementCost,
      loanVsWithdrawalCost: loanNetCashCost - withdrawalCash,
      years
    }
  }, [amount, taxRate, penaltyRate, loanRate, investmentReturn, years])

  return (
    <CalculatorLayout
      title="401(k) Early Withdrawal vs Loan Calculator USA 2026"
      description="Compare the immediate tax/penalty cost of a modeled 401(k) distribution with the repayment cost of a modeled 401(k) loan. Plan rules and tax exceptions vary."
      icon="💸" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="401k-early-withdrawal-vs-loan-calculator"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-4">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Scenario Inputs</h2>
          <InputField label="Amount Needed" value={amount} onChange={setAmount} min={100} max={1000000} step={500} prefix="$" />
          <InputField label="Federal Income-Tax Assumption" value={taxRate} onChange={setTaxRate} min={0} max={50} step={1} suffix="%" />
          <InputField label="Early-Distribution Penalty Assumption" value={penaltyRate} onChange={setPenaltyRate} min={0} max={20} step={1} suffix="%" />
          <InputField label="401(k) Loan Rate" value={loanRate} onChange={setLoanRate} min={0} max={20} step={0.25} suffix="%" />
          <InputField label="Expected Investment Return" value={investmentReturn} onChange={setInvestmentReturn} min={-20} max={20} step={0.5} suffix="%" />
          <InputField label="Remaining Investment Period" value={years} onChange={setYears} min={1} max={40} step={1} suffix="yrs" />
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Withdrawal Cash Received" value={money(result.withdrawalCash)} highlight />
            <ResultCard label="Immediate Tax" value={money(result.withdrawalTax)} />
            <ResultCard label="Penalty" value={money(result.withdrawalPenalty)} />
            <ResultCard label="Loan Interest" value={money(result.loanInterest)} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <h3 className="font-bold text-gray-900 mb-3">Modeled Early Distribution</h3>
              <p className="text-sm text-gray-600">Cash received after the entered tax and penalty assumptions: <b>{money(result.withdrawalCash)}</b>.</p>
              <p className="text-sm text-gray-600 mt-2">Illustrative retirement opportunity cost over {years} years at {investmentReturn}%: <b>{money(result.lostGrowth)}</b> of foregone growth.</p>
            </Card>
            <Card>
              <h3 className="font-bold text-gray-900 mb-3">Modeled 401(k) Loan</h3>
              <p className="text-sm text-gray-600">Monthly repayment: <b>{money(result.loanPayment)}</b>.</p>
              <p className="text-sm text-gray-600 mt-2">Total modeled repayments: <b>{money(result.totalLoanPayments)}</b>, including <b>{money(result.loanInterest)}</b> of interest.</p>
            </Card>
          </div>
          <Card className="bg-amber-50 border border-amber-200">
            <p className="text-sm text-amber-900"><b>Important:</b> This is a scenario comparison, not a determination of whether you qualify for a plan loan or whether a 10% additional tax applies. Exceptions, plan limits, vesting, separation from service and loan-default rules can materially change the result.</p>
          </Card>
        </div>
      </div>
      <div className="mt-8">
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
