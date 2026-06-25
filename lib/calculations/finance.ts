// ============================================================
// FINANCE CALCULATION LIBRARY
// ============================================================

/** SIP Calculator */
export function calculateSIP(monthlyAmount: number, annualRate: number, years: number) {
  const r = annualRate / 100 / 12
  const n = years * 12
  const totalInvested = monthlyAmount * n
  const maturityAmount = monthlyAmount * ((Math.pow(1 + r, n) - 1) / r) * (1 + r)
  const totalReturns = maturityAmount - totalInvested

  const yearlyData = []
  for (let y = 1; y <= years; y++) {
    const months = y * 12
    const val = monthlyAmount * ((Math.pow(1 + r, months) - 1) / r) * (1 + r)
    yearlyData.push({ year: y, invested: monthlyAmount * months, returns: val - monthlyAmount * months, total: Math.round(val) })
  }
  return { totalInvested: Math.round(totalInvested), estimatedReturns: Math.round(totalReturns), totalValue: Math.round(maturityAmount), yearlyData }
}

/** EMI Calculator */
export function calculateEMI(principal: number, annualRate: number, tenureMonths: number) {
  const r = annualRate / 100 / 12
  const emi = principal * r * Math.pow(1 + r, tenureMonths) / (Math.pow(1 + r, tenureMonths) - 1)
  const totalPayment = emi * tenureMonths
  const totalInterest = totalPayment - principal

  const schedule = []
  let balance = principal
  for (let m = 1; m <= tenureMonths; m++) {
    const interest = balance * r
    const principalPaid = emi - interest
    balance -= principalPaid
    schedule.push({ month: m, emi: Math.round(emi), principal: Math.round(principalPaid), interest: Math.round(interest), balance: Math.max(0, Math.round(balance)) })
  }
  return { emi: Math.round(emi), totalPayment: Math.round(totalPayment), totalInterest: Math.round(totalInterest), schedule }
}

/** Compound Interest Calculator */
export function calculateCompoundInterest(principal: number, annualRate: number, years: number, frequency: number) {
  const r = annualRate / 100
  const maturityAmount = principal * Math.pow(1 + r / frequency, frequency * years)
  const totalInterest = maturityAmount - principal

  const yearlyData = []
  for (let y = 1; y <= years; y++) {
    const val = principal * Math.pow(1 + r / frequency, frequency * y)
    yearlyData.push({ year: y, invested: principal, returns: Math.round(val - principal), total: Math.round(val) })
  }
  return { principal, maturityAmount: Math.round(maturityAmount), totalInterest: Math.round(totalInterest), yearlyData }
}

/** FD Calculator */
export function calculateFD(principal: number, annualRate: number, years: number, compoundFreq: number = 4) {
  const r = annualRate / 100
  const maturityAmount = principal * Math.pow(1 + r / compoundFreq, compoundFreq * years)
  const totalInterest = maturityAmount - principal

  const yearlyData = []
  for (let y = 1; y <= years; y++) {
    const val = principal * Math.pow(1 + r / compoundFreq, compoundFreq * y)
    yearlyData.push({ year: y, invested: principal, returns: Math.round(val - principal), total: Math.round(val) })
  }
  return { invested: principal, maturityAmount: Math.round(maturityAmount), totalInterest: Math.round(totalInterest), yearlyData }
}

/** RD Calculator */
export function calculateRD(monthlyDeposit: number, annualRate: number, months: number) {
  const r = annualRate / 100 / 4
  let maturityAmount = 0
  for (let m = 1; m <= months; m++) {
    const n = Math.ceil(m / 3)
    maturityAmount += monthlyDeposit * Math.pow(1 + r, n)
  }
  const totalInvested = monthlyDeposit * months
  const totalInterest = maturityAmount - totalInvested

  const yearlyData = []
  for (let q = 1; q <= Math.ceil(months / 3); q++) {
    const mEnd = Math.min(q * 3, months)
    let val = 0
    for (let m = 1; m <= mEnd; m++) {
      const n = Math.ceil(m / 3)
      val += monthlyDeposit * Math.pow(1 + r, q - n + 1)
    }
    const year = Math.ceil(q / 4)
    if (q % 4 === 0 || q === Math.ceil(months / 3)) {
      yearlyData.push({ year, invested: monthlyDeposit * mEnd, returns: Math.round(val - monthlyDeposit * mEnd), total: Math.round(val) })
    }
  }
  return { totalInvested: Math.round(totalInvested), maturityAmount: Math.round(maturityAmount), totalInterest: Math.round(totalInterest), yearlyData }
}

/** Inflation Calculator */
export function calculateInflation(currentAmount: number, inflationRate: number, years: number) {
  const futureValue = currentAmount * Math.pow(1 + inflationRate / 100, years)
  const purchasingPower = currentAmount / Math.pow(1 + inflationRate / 100, years)

  const yearlyData = []
  for (let y = 1; y <= years; y++) {
    const fv = currentAmount * Math.pow(1 + inflationRate / 100, y)
    const pp = currentAmount / Math.pow(1 + inflationRate / 100, y)
    yearlyData.push({ year: y, invested: currentAmount, returns: Math.round(fv - currentAmount), total: Math.round(fv), purchasingPower: Math.round(pp) })
  }
  return { currentAmount, futureValue: Math.round(futureValue), purchasingPower: Math.round(purchasingPower), yearlyData }
}

/** Retirement Calculator */
export function calculateRetirement(currentAge: number, retirementAge: number, monthlyExpense: number, currentSavings: number, expectedReturn: number, inflationRate: number) {
  const yearsToRetirement = retirementAge - currentAge
  const retirementDuration = 25
  const inflationAdjustedExpense = monthlyExpense * Math.pow(1 + inflationRate / 100, yearsToRetirement)
  const annualExpenseAtRetirement = inflationAdjustedExpense * 12
  const realReturn = (expectedReturn - inflationRate) / 100
  const corpusRequired = annualExpenseAtRetirement * ((1 - Math.pow(1 + realReturn, -retirementDuration)) / realReturn)
  const currentSavingsGrown = currentSavings * Math.pow(1 + expectedReturn / 100, yearsToRetirement)
  const additionalRequired = Math.max(0, corpusRequired - currentSavingsGrown)
  const monthlyRate = expectedReturn / 100 / 12
  const months = yearsToRetirement * 12
  const monthlySIPRequired = additionalRequired * monthlyRate / (Math.pow(1 + monthlyRate, months) - 1)

  const yearlyData = []
  for (let y = 1; y <= yearsToRetirement; y++) {
    const savings = currentSavings * Math.pow(1 + expectedReturn / 100, y)
    yearlyData.push({ year: currentAge + y, invested: Math.round(savings * 0.6), returns: Math.round(savings * 0.4), total: Math.round(savings) })
  }
  return { corpusRequired: Math.round(corpusRequired), currentSavingsGrown: Math.round(currentSavingsGrown), additionalRequired: Math.round(additionalRequired), monthlySIPRequired: Math.round(monthlySIPRequired), yearlyData }
}

/** Lumpsum Calculator */
export function calculateLumpsum(principal: number, annualRate: number, years: number) {
  const maturityAmount = principal * Math.pow(1 + annualRate / 100, years)
  const totalReturns = maturityAmount - principal

  const yearlyData = []
  for (let y = 1; y <= years; y++) {
    const val = principal * Math.pow(1 + annualRate / 100, y)
    yearlyData.push({ year: y, invested: principal, returns: Math.round(val - principal), total: Math.round(val) })
  }
  return { principal, maturityAmount: Math.round(maturityAmount), totalReturns: Math.round(totalReturns), yearlyData }
}

/** CAGR Calculator */
export function calculateCAGR(initialValue: number, finalValue: number, years: number) {
  const cagr = (Math.pow(finalValue / initialValue, 1 / years) - 1) * 100
  const absoluteReturn = ((finalValue - initialValue) / initialValue) * 100

  const yearlyData = []
  for (let y = 0; y <= years; y++) {
    const val = initialValue * Math.pow(1 + cagr / 100, y)
    yearlyData.push({ year: y, invested: initialValue, returns: Math.round(val - initialValue), total: Math.round(val) })
  }
  return { cagr: parseFloat(cagr.toFixed(2)), absoluteReturn: parseFloat(absoluteReturn.toFixed(2)), initialValue, finalValue, yearlyData }
}

/** XIRR (approximation using Newton-Raphson) */
export function calculateXIRR(cashflows: { date: Date; amount: number }[]) {
  let rate = 0.1
  for (let i = 0; i < 100; i++) {
    let npv = 0
    let dnpv = 0
    const t0 = cashflows[0].date.getTime()
    for (const cf of cashflows) {
      const t = (cf.date.getTime() - t0) / (365.25 * 24 * 3600 * 1000)
      npv += cf.amount / Math.pow(1 + rate, t)
      dnpv -= t * cf.amount / Math.pow(1 + rate, t + 1)
    }
    const newRate = rate - npv / dnpv
    if (Math.abs(newRate - rate) < 1e-10) break
    rate = newRate
  }
  return { xirr: parseFloat((rate * 100).toFixed(2)) }
}

/** Loan Prepayment Calculator */
export function calculateLoanPrepayment(principal: number, annualRate: number, tenureMonths: number, prepaymentAmount: number, prepaymentAfterMonth: number) {
  const r = annualRate / 100 / 12
  const emi = principal * r * Math.pow(1 + r, tenureMonths) / (Math.pow(1 + r, tenureMonths) - 1)

  let balance = principal
  let totalInterest = 0
  let monthsPaid = 0
  for (let m = 1; m <= tenureMonths; m++) {
    const interest = balance * r
    const principalPaid = emi - interest
    balance -= principalPaid
    totalInterest += interest
    monthsPaid++
    if (m === prepaymentAfterMonth && prepaymentAmount > 0) balance = Math.max(0, balance - prepaymentAmount)
    if (balance <= 0) break
  }

  const originalInterest = emi * tenureMonths - principal
  const interestSaved = originalInterest - totalInterest
  const monthsSaved = tenureMonths - monthsPaid

  return { originalInterest: Math.round(originalInterest), reducedInterest: Math.round(totalInterest), interestSaved: Math.round(interestSaved), monthsSaved, newTenure: monthsPaid }
}

/** Savings Goal Calculator */
export function calculateSavingsGoal(goalAmount: number, currentSavings: number, annualRate: number, years: number) {
  const r = annualRate / 100 / 12
  const months = years * 12
  const currentSavingsGrown = currentSavings * Math.pow(1 + r, months)
  const remaining = Math.max(0, goalAmount - currentSavingsGrown)
  const monthlySIP = remaining * r / (Math.pow(1 + r, months) - 1)

  const yearlyData = []
  for (let y = 1; y <= years; y++) {
    const m = y * 12
    const savings = currentSavings * Math.pow(1 + r, m) + monthlySIP * ((Math.pow(1 + r, m) - 1) / r) * (1 + r)
    yearlyData.push({ year: y, invested: Math.round(currentSavings + monthlySIP * m), returns: Math.round(savings - currentSavings - monthlySIP * m), total: Math.round(savings) })
  }
  return { goalAmount, currentSavings, monthlySIPRequired: Math.round(monthlySIP), currentSavingsGrown: Math.round(currentSavingsGrown), yearlyData }
}

/** SWP (Systematic Withdrawal Plan) Calculator */
export function calculateSWP(investmentAmount: number, monthlyWithdrawal: number, annualReturn: number, years: number) {
  const r = annualReturn / 100 / 12
  const months = years * 12
  let balance = investmentAmount
  const monthlyData = []
  let totalWithdrawn = 0

  for (let m = 1; m <= months; m++) {
    const returns = balance * r
    balance = balance + returns - monthlyWithdrawal
    totalWithdrawn += monthlyWithdrawal
    if (m % 12 === 0 || m === months) {
      monthlyData.push({ year: Math.ceil(m / 12), invested: investmentAmount, returns: Math.round(totalWithdrawn), total: Math.max(0, Math.round(balance)) })
    }
    if (balance <= 0) break
  }
  return { investmentAmount, totalWithdrawn: Math.round(totalWithdrawn), finalBalance: Math.max(0, Math.round(balance)), yearlyData: monthlyData }
}

/** Step-Up SIP Calculator */
export function calculateStepUpSIP(initialMonthly: number, annualStepUp: number, annualReturn: number, years: number) {
  const r = annualReturn / 100 / 12
  let totalInvested = 0
  let corpus = 0
  const yearlyData = []

  for (let y = 1; y <= years; y++) {
    const monthly = initialMonthly * Math.pow(1 + annualStepUp / 100, y - 1)
    for (let m = 1; m <= 12; m++) {
      corpus = (corpus + monthly) * (1 + r)
      totalInvested += monthly
    }
    yearlyData.push({ year: y, invested: Math.round(totalInvested), returns: Math.round(corpus - totalInvested), total: Math.round(corpus) })
  }
  return { totalInvested: Math.round(totalInvested), estimatedReturns: Math.round(corpus - totalInvested), totalValue: Math.round(corpus), yearlyData }
}

/** Debt Payoff Calculator (Avalanche/Snowball) */
export function calculateDebtPayoff(debts: { name: string; balance: number; rate: number; minPayment: number }[], extraPayment: number, method: 'avalanche' | 'snowball') {
  const sorted = [...debts].sort((a, b) => method === 'avalanche' ? b.rate - a.rate : a.balance - b.balance)
  let totalMonths = 0
  let totalInterest = 0

  const results = sorted.map(debt => {
    const r = debt.rate / 100 / 12
    let balance = debt.balance
    let months = 0
    let interest = 0
    const payment = debt.minPayment + extraPayment / sorted.length
    while (balance > 0) {
      const monthInterest = balance * r
      interest += monthInterest
      balance = balance + monthInterest - payment
      months++
      if (months > 600) break
    }
    totalMonths = Math.max(totalMonths, months)
    totalInterest += interest
    return { ...debt, months, totalInterest: Math.round(interest) }
  })

  return { debts: results, totalMonths, totalInterest: Math.round(totalInterest) }
}

/** Net Worth Calculator */
export function calculateNetWorth(assets: { name: string; value: number }[], liabilities: { name: string; value: number }[]) {
  const totalAssets = assets.reduce((s, a) => s + a.value, 0)
  const totalLiabilities = liabilities.reduce((s, l) => s + l.value, 0)
  const netWorth = totalAssets - totalLiabilities
  return { totalAssets, totalLiabilities, netWorth, debtToAssetRatio: totalAssets > 0 ? parseFloat((totalLiabilities / totalAssets * 100).toFixed(1)) : 0 }
}

/** Mutual Fund Return Calculator */
export function calculateMutualFundReturn(investmentAmount: number, expectedReturn: number, years: number, expenseRatio: number) {
  const netReturn = expectedReturn - expenseRatio
  const grossMaturity = investmentAmount * Math.pow(1 + expectedReturn / 100, years)
  const netMaturity = investmentAmount * Math.pow(1 + netReturn / 100, years)
  const expenseImpact = grossMaturity - netMaturity

  const yearlyData = []
  for (let y = 1; y <= years; y++) {
    const val = investmentAmount * Math.pow(1 + netReturn / 100, y)
    yearlyData.push({ year: y, invested: investmentAmount, returns: Math.round(val - investmentAmount), total: Math.round(val) })
  }
  return { investmentAmount, netMaturity: Math.round(netMaturity), grossMaturity: Math.round(grossMaturity), expenseImpact: Math.round(expenseImpact), yearlyData }
}

export const formatCurrency = (amount: number, compact = false): string => {
  if (compact && amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)}Cr`
  if (compact && amount >= 100000) return `₹${(amount / 100000).toFixed(2)}L`
  if (compact && amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)
}

export const formatNumber = (n: number): string => new Intl.NumberFormat('en-IN').format(Math.round(n))

/** -- NEW CALCULATORS -- **/

/** GST Calculator */
export function calculateGST(amount: number, gstRate: number, type: 'exclusive' | 'inclusive') {
  if (type === 'exclusive') {
    const gstAmount = (amount * gstRate) / 100
    const totalAmount = amount + gstAmount
    const cgst = gstAmount / 2
    const sgst = gstAmount / 2
    return { originalAmount: Math.round(amount), gstAmount: Math.round(gstAmount), totalAmount: Math.round(totalAmount), cgst: Math.round(cgst), sgst: Math.round(sgst), igst: Math.round(gstAmount), gstRate }
  } else {
    const originalAmount = (amount * 100) / (100 + gstRate)
    const gstAmount = amount - originalAmount
    const cgst = gstAmount / 2
    const sgst = gstAmount / 2
    return { originalAmount: Math.round(originalAmount), gstAmount: Math.round(gstAmount), totalAmount: Math.round(amount), cgst: Math.round(cgst), sgst: Math.round(sgst), igst: Math.round(gstAmount), gstRate }
  }
}

/** PPF (Public Provident Fund) Calculator */
export function calculatePPF(yearlyDeposit: number, years: number, interestRate: number = 7.1) {
  const r = interestRate / 100
  let balance = 0
  const yearlyData = []
  let totalDeposited = 0
  for (let y = 1; y <= years; y++) {
    const openingBalance = balance
    balance += yearlyDeposit
    const interest = balance * r
    balance += interest
    totalDeposited += yearlyDeposit
    yearlyData.push({ year: y, deposit: yearlyDeposit, interest: Math.round(interest), balance: Math.round(balance), totalDeposited })
  }
  const totalInterest = balance - totalDeposited
  return { maturityAmount: Math.round(balance), totalDeposited: Math.round(totalDeposited), totalInterest: Math.round(totalInterest), yearlyData }
}

/** NPS (National Pension System) Calculator */
export function calculateNPS(monthlyContribution: number, years: number, expectedReturn: number, annuityRate: number, annuityPercent: number) {
  const r = expectedReturn / 100 / 12
  const n = years * 12
  const totalContributed = monthlyContribution * n
  const maturityAmount = monthlyContribution * ((Math.pow(1 + r, n) - 1) / r) * (1 + r)
  const lumpsum = maturityAmount * (1 - annuityPercent / 100)
  const annuityCorpus = maturityAmount * (annuityPercent / 100)
  const monthlyPension = (annuityCorpus * annuityRate) / 100 / 12
  const yearlyData = []
  for (let y = 1; y <= years; y++) {
    const months = y * 12
    const val = monthlyContribution * ((Math.pow(1 + r, months) - 1) / r) * (1 + r)
    yearlyData.push({ year: y, contributed: monthlyContribution * months, total: Math.round(val), returns: Math.round(val - monthlyContribution * months) })
  }
  return { maturityAmount: Math.round(maturityAmount), totalContributed: Math.round(totalContributed), totalReturns: Math.round(maturityAmount - totalContributed), lumpsum: Math.round(lumpsum), annuityCorpus: Math.round(annuityCorpus), monthlyPension: Math.round(monthlyPension), yearlyData }
}

/** Gratuity Calculator */
export function calculateGratuity(lastSalary: number, yearsOfService: number, type: 'covered' | 'uncovered') {
  let gratuity = 0
  if (type === 'covered') {
    // Covered under Gratuity Act: (Last Salary x 15/26 x Years of Service)
    gratuity = (lastSalary * 15 * yearsOfService) / 26
  } else {
    // Not covered: (Last Salary x 15/30 x Years of Service)
    gratuity = (lastSalary * 15 * yearsOfService) / 30
  }
  const taxFreeLimit = 2000000 // ₹20 lakhs tax-free
  const taxableGratuity = Math.max(0, gratuity - taxFreeLimit)
  return { gratuity: Math.round(gratuity), taxFreeAmount: Math.round(Math.min(gratuity, taxFreeLimit)), taxableGratuity: Math.round(taxableGratuity), perYearGratuity: Math.round(gratuity / Math.max(1, yearsOfService)) }
}

/** HRA (House Rent Allowance) Exemption Calculator */
export function calculateHRA(basicSalary: number, hra: number, actualRentPaid: number, isMetro: boolean) {
  const metroPercent = isMetro ? 0.5 : 0.4
  const condition1 = hra // Actual HRA received
  const condition2 = actualRentPaid - basicSalary * 0.1 // Rent paid minus 10% of basic
  const condition3 = basicSalary * metroPercent // 50% or 40% of basic
  const hraExemption = Math.max(0, Math.min(condition1, condition2, condition3))
  const taxableHRA = Math.max(0, hra - hraExemption)
  return { hraExemption: Math.round(hraExemption), taxableHRA: Math.round(taxableHRA), condition1: Math.round(condition1), condition2: Math.round(Math.max(0, condition2)), condition3: Math.round(condition3) }
}

/** Simple Interest Calculator */
export function calculateSimpleInterest(principal: number, rate: number, years: number) {
  const simpleInterest = (principal * rate * years) / 100
  const totalAmount = principal + simpleInterest
  const yearlyData = []
  for (let y = 1; y <= years; y++) {
    const interest = (principal * rate * y) / 100
    yearlyData.push({ year: y, interest: Math.round(interest), total: Math.round(principal + interest) })
  }
  return { principal, simpleInterest: Math.round(simpleInterest), totalAmount: Math.round(totalAmount), yearlyData }
}

/** Income Tax Calculator (India FY 2026-27) */
export function calculateIncomeTax(grossIncome: number, regime: 'old' | 'new', deductions: { sec80C: number; sec80D: number; hra: number; lta: number; stdDeduction: number }) {
  const stdDeduction = regime === 'new' ? 75000 : deductions.stdDeduction || 50000
  let taxableIncome = grossIncome - stdDeduction
  if (regime === 'old') {
    taxableIncome -= Math.min(deductions.sec80C, 150000)
    taxableIncome -= Math.min(deductions.sec80D, 25000)
    taxableIncome -= deductions.hra
    taxableIncome -= deductions.lta
  }
  taxableIncome = Math.max(0, taxableIncome)

  let tax = 0
  let breakdown: { slab: string; rate: string; taxAmount: number }[] = []
  if (regime === 'new') {
    // New regime FY2026-27
    const slabs = [[400000, 0], [400000, 5], [400000, 10], [400000, 15], [400000, 20], [Infinity, 30]] as [number, number][]
    let remaining = taxableIncome
    let from = 0
    for (const [limit, rate] of slabs) {
      const taxable = Math.min(remaining, limit)
      const slabTax = (taxable * rate) / 100
      if (taxable > 0) breakdown.push({ slab: `₹${(from/100000).toFixed(0)}L - ₹${limit === Infinity ? 'infinity' : ((from + limit)/100000).toFixed(0)}L`, rate: `${rate}%`, taxAmount: Math.round(slabTax) })
      tax += slabTax
      remaining -= taxable
      from += limit
      if (remaining <= 0) break
    }
  } else {
    // Old regime
    const slabs = [[250000, 0], [250000, 5], [500000, 20], [Infinity, 30]] as [number, number][]
    let remaining = taxableIncome
    let from = 0
    for (const [limit, rate] of slabs) {
      const taxable = Math.min(remaining, limit)
      const slabTax = (taxable * rate) / 100
      if (taxable > 0) breakdown.push({ slab: `₹${(from/100000).toFixed(0)}L - ₹${limit === Infinity ? 'infinity' : ((from + limit)/100000).toFixed(0)}L`, rate: `${rate}%`, taxAmount: Math.round(slabTax) })
      tax += slabTax
      remaining -= taxable
      from += limit
      if (remaining <= 0) break
    }
  }
  const surcharge = taxableIncome > 5000000 ? tax * (taxableIncome > 10000000 ? 0.15 : 0.10) : 0
  const cess = (tax + surcharge) * 0.04
  const totalTax = tax + surcharge + cess
  const effectiveRate = grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0
  return { taxableIncome: Math.round(taxableIncome), incomeTax: Math.round(tax), surcharge: Math.round(surcharge), cess: Math.round(cess), totalTax: Math.round(totalTax), effectiveRate: Math.round(effectiveRate * 100) / 100, breakdown, netIncome: Math.round(grossIncome - totalTax) }
}

/** Currency Converter (static base rates, updated values) */
export function convertCurrency(amount: number, from: string, to: string) {
  // Base rates vs USD (approximate 2026 rates)
  const rates: Record<string, number> = {
    USD: 1, INR: 84.5, EUR: 0.92, GBP: 0.79, JPY: 150.2, CAD: 1.36,
    AUD: 1.54, CHF: 0.89, CNY: 7.24, SGD: 1.34, AED: 3.67, MYR: 4.72,
    THB: 35.1, HKD: 7.82, SEK: 10.45, NOK: 10.72, NZD: 1.63, ZAR: 18.6, BRL: 4.97, MXN: 17.2
  }
  const fromRate = rates[from] || 1
  const toRate = rates[to] || 1
  const inUSD = amount / fromRate
  const converted = inUSD * toRate
  const exchangeRate = toRate / fromRate
  return { converted: Math.round(converted * 10000) / 10000, exchangeRate: Math.round(exchangeRate * 100000) / 100000, inUSD: Math.round(inUSD * 10000) / 10000, from, to }
}

/** Salary (CTC to In-Hand) Calculator */
export function calculateSalary(ctc: number, basicPercent: number, hraPercent: number, specialAllowancePercent: number) {
  const basic = (ctc * basicPercent) / 100 / 12
  const hra = (basic * hraPercent) / 100
  const specialAllowance = (ctc * specialAllowancePercent) / 100 / 12
  const employerPF = Math.min(basic * 0.12, 1800)
  const employeePF = Math.min(basic * 0.12, 1800)
  const professionalTax = 200
  const monthlyCTC = ctc / 12
  // Rough tax (new regime, no deductions)
  const annualTaxable = Math.max(0, ctc - 75000 - employeePF * 12)
  const annualTax = calculateIncomeTax(ctc, 'new', { sec80C: 0, sec80D: 0, hra: 0, lta: 0, stdDeduction: 75000 }).totalTax
  const monthlyTax = annualTax / 12
  const grossMonthly = basic + hra + specialAllowance
  const inHandMonthly = grossMonthly - employeePF - professionalTax - monthlyTax
  const annualInHand = inHandMonthly * 12
  return {
    ctc, annualCTC: ctc, monthly: { grossMonthly: Math.round(grossMonthly), basic: Math.round(basic), hra: Math.round(hra), specialAllowance: Math.round(specialAllowance), employeePF: Math.round(employeePF), professionalTax, tds: Math.round(monthlyTax), inHand: Math.round(inHandMonthly) },
    annual: { grossAnnual: Math.round(grossMonthly * 12), employerPF: Math.round(employerPF * 12), employeePF: Math.round(employeePF * 12), incomeTax: Math.round(annualTax), inHand: Math.round(annualInHand) },
    takeHomePercent: Math.round((inHandMonthly / monthlyCTC) * 100)
  }
}

/** Break-Even Analysis Calculator */
export function calculateBreakEven(fixedCosts: number, variableCostPerUnit: number, sellingPricePerUnit: number) {
  if (sellingPricePerUnit <= variableCostPerUnit) return { breakEvenUnits: Infinity, breakEvenRevenue: Infinity, contributionMargin: 0, contributionMarginRatio: 0, profitAtScenarios: [] }
  const contributionMargin = sellingPricePerUnit - variableCostPerUnit
  const contributionMarginRatio = (contributionMargin / sellingPricePerUnit) * 100
  const breakEvenUnits = Math.ceil(fixedCosts / contributionMargin)
  const breakEvenRevenue = breakEvenUnits * sellingPricePerUnit
  const profitAtScenarios = [0.5, 0.75, 1, 1.25, 1.5, 2, 3].map(mult => {
    const units = Math.round(breakEvenUnits * mult)
    const revenue = units * sellingPricePerUnit
    const totalCost = fixedCosts + units * variableCostPerUnit
    const profit = revenue - totalCost
    return { units, revenue: Math.round(revenue), totalCost: Math.round(totalCost), profit: Math.round(profit), label: `${Math.round(mult * 100)}% BEP` }
  })
  return { breakEvenUnits, breakEvenRevenue: Math.round(breakEvenRevenue), contributionMargin: Math.round(contributionMargin), contributionMarginRatio: Math.round(contributionMarginRatio * 100) / 100, profitAtScenarios }
}

/** ROI (Return on Investment) Calculator */
export function calculateROI(initialInvestment: number, finalValue: number, years: number, additionalCosts: number = 0) {
  const totalCost = initialInvestment + additionalCosts
  const netProfit = finalValue - totalCost
  const roi = totalCost > 0 ? (netProfit / totalCost) * 100 : 0
  const annualizedROI = years > 0 ? (Math.pow(finalValue / totalCost, 1 / years) - 1) * 100 : roi
  const multiplier = totalCost > 0 ? finalValue / totalCost : 0
  return {
    roi: Math.round(roi * 100) / 100,
    annualizedROI: Math.round(annualizedROI * 100) / 100,
    netProfit: Math.round(netProfit),
    totalCost: Math.round(totalCost),
    multiplier: Math.round(multiplier * 100) / 100,
    finalValue: Math.round(finalValue),
  }
}

/** Tip Calculator */
export function calculateTip(billAmount: number, tipPercent: number, numPeople: number) {
  const tipAmount = (billAmount * tipPercent) / 100
  const totalAmount = billAmount + tipAmount
  const perPerson = totalAmount / Math.max(1, numPeople)
  const tipPerPerson = tipAmount / Math.max(1, numPeople)
  const billPerPerson = billAmount / Math.max(1, numPeople)
  const commonTips = [10, 15, 18, 20, 25].map(pct => ({
    pct,
    tip: Math.round((billAmount * pct) / 100 * 100) / 100,
    total: Math.round((billAmount * (1 + pct / 100)) * 100) / 100,
    perPerson: Math.round((billAmount * (1 + pct / 100)) / Math.max(1, numPeople) * 100) / 100,
  }))
  return { tipAmount: Math.round(tipAmount * 100) / 100, totalAmount: Math.round(totalAmount * 100) / 100, perPerson: Math.round(perPerson * 100) / 100, tipPerPerson: Math.round(tipPerPerson * 100) / 100, billPerPerson: Math.round(billPerPerson * 100) / 100, commonTips }
}

/** FD Comparison Calculator - compare up to 4 FDs side by side */
export function compareFDs(fds: { name: string; principal: number; rate: number; years: number; freq: number }[]) {
  return fds.map(fd => {
    const { name, principal, rate, years, freq } = fd
    const amount = principal * Math.pow(1 + rate / 100 / freq, freq * years)
    const interest = amount - principal
    const effectiveRate = (Math.pow(1 + rate / 100 / freq, freq) - 1) * 100
    return {
      name,
      principal: Math.round(principal),
      rate,
      years,
      freq,
      maturityAmount: Math.round(amount),
      interestEarned: Math.round(interest),
      effectiveRate: Math.round(effectiveRate * 100) / 100,
    }
  })
}

/** Education / Goal SIP Calculator */
export function calculateEducationGoal(
  goalAmount: number,
  years: number,
  inflationRate: number,
  expectedReturn: number,
  currentSavings: number
) {
  // Future value of goal (inflation-adjusted)
  const inflationAdjustedGoal = goalAmount * Math.pow(1 + inflationRate / 100, years)
  // Future value of current savings
  const fvCurrentSavings = currentSavings * Math.pow(1 + expectedReturn / 100, years)
  // Remaining amount needed
  const remainingGoal = Math.max(0, inflationAdjustedGoal - fvCurrentSavings)
  // Monthly SIP needed
  const r = expectedReturn / 100 / 12
  const n = years * 12
  const monthlySIP = r > 0 ? remainingGoal * r / (Math.pow(1 + r, n) - 1) : remainingGoal / n
  // Yearly milestones
  const yearlyData = []
  let sipAccumulated = 0
  for (let y = 1; y <= years; y++) {
    const months = y * 12
    const sipValue = monthlySIP * ((Math.pow(1 + r, months) - 1) / r) * (1 + r)
    const savingsValue = currentSavings * Math.pow(1 + expectedReturn / 100, y)
    const goalAtYear = goalAmount * Math.pow(1 + inflationRate / 100, y)
    sipAccumulated = monthlySIP * months
    yearlyData.push({
      year: y,
      sipCorpus: Math.round(sipValue + savingsValue),
      goalValue: Math.round(goalAtYear),
      sipInvested: Math.round(sipAccumulated + currentSavings),
    })
  }
  return {
    goalAmount: Math.round(goalAmount),
    inflationAdjustedGoal: Math.round(inflationAdjustedGoal),
    fvCurrentSavings: Math.round(fvCurrentSavings),
    remainingGoal: Math.round(remainingGoal),
    monthlySIP: Math.round(monthlySIP),
    totalSIPInvestment: Math.round(monthlySIP * n),
    returnsEarned: Math.round(remainingGoal - monthlySIP * n),
    yearlyData,
  }
}

/** Lease vs Buy Calculator */
export function calculateLeaseVsBuy(
  vehiclePrice: number,
  downPayment: number,
  loanRate: number,
  loanYears: number,
  leaseMonthly: number,
  leaseYears: number,
  residualValue: number,
  insuranceDiff: number,
  maintenanceDiff: number
) {
  // BUY scenario
  const loanAmount = vehiclePrice - downPayment
  const r = loanRate / 100 / 12
  const n = loanYears * 12
  const monthlyEMI = r > 0 ? loanAmount * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1) : loanAmount / n
  const totalLoanPayment = monthlyEMI * n
  const totalInterest = totalLoanPayment - loanAmount
  const totalBuyCost = downPayment + totalLoanPayment + (insuranceDiff + maintenanceDiff) * loanYears * 12
  const buyNetCost = totalBuyCost - residualValue // subtract resale value

  // LEASE scenario
  const totalLeaseCost = leaseMonthly * leaseYears * 12
  const leaseTotalCost = totalLeaseCost // no residual value at end

  const saving = buyNetCost - leaseTotalCost
  const betterOption = saving > 0 ? 'lease' : 'buy'

  // Monthly comparison
  const buyMonthly = (buyNetCost) / (loanYears * 12)
  const leaseMonthlyEffective = leaseTotalCost / (leaseYears * 12)

  const yearlyData = []
  for (let y = 1; y <= Math.max(loanYears, leaseYears); y++) {
    const buyTotal = downPayment + Math.min(y * 12, n) * monthlyEMI + (insuranceDiff + maintenanceDiff) * Math.min(y, loanYears) * 12
    const leaseTotal = leaseMonthly * Math.min(y * 12, leaseYears * 12)
    yearlyData.push({ year: y, buyCumulative: Math.round(buyTotal), leaseCumulative: Math.round(leaseTotal) })
  }

  return {
    buy: { monthlyEMI: Math.round(monthlyEMI), totalLoanPayment: Math.round(totalLoanPayment), totalInterest: Math.round(totalInterest), totalCost: Math.round(totalBuyCost), netCost: Math.round(buyNetCost), effectiveMonthly: Math.round(buyMonthly) },
    lease: { monthlyPayment: leaseMonthly, totalCost: Math.round(leaseTotalCost), effectiveMonthly: Math.round(leaseMonthlyEffective) },
    saving: Math.round(Math.abs(saving)),
    betterOption,
    yearlyData,
  }
}

/** Mutual Fund NAV-based Return Calculator */
export function calculateMFNavReturn(units: number, buyNav: number, currentNav: number, years: number) {
  const investedAmount = units * buyNav
  const currentValue = units * currentNav
  const absoluteReturn = currentValue - investedAmount
  const absoluteReturnPct = investedAmount > 0 ? (absoluteReturn / investedAmount) * 100 : 0
  const cagr = years > 0 && investedAmount > 0 ? (Math.pow(currentValue / investedAmount, 1 / years) - 1) * 100 : 0
  return {
    units,
    buyNav,
    currentNav,
    investedAmount: Math.round(investedAmount),
    currentValue: Math.round(currentValue),
    absoluteReturn: Math.round(absoluteReturn),
    absoluteReturnPct: Math.round(absoluteReturnPct * 100) / 100,
    cagr: Math.round(cagr * 100) / 100,
    navGain: currentNav - buyNav,
  }
}

// --- NEW CALCULATOR FUNCTIONS -------------------------------------------------

export function calculateBudget(income: number, categories: { name: string; planned: number; actual: number }[]) {
  const totalPlanned = categories.reduce((s, c) => s + c.planned, 0)
  const totalActual = categories.reduce((s, c) => s + c.actual, 0)
  const surplus = income - totalActual
  const savingsRate = income > 0 ? ((income - totalActual) / income) * 100 : 0
  return {
    totalPlanned,
    totalActual,
    surplus,
    savingsRate,
    categories: categories.map(c => ({
      ...c,
      variance: c.planned - c.actual,
      percentOfIncome: income > 0 ? (c.actual / income) * 100 : 0,
    }))
  }
}

export function calculateStockProfit(
  buyPrice: number, sellPrice: number, quantity: number,
  buyBrokerage: number = 0, sellBrokerage: number = 0, taxRate: number = 15
) {
  const investedAmount = buyPrice * quantity + buyBrokerage
  const saleAmount = sellPrice * quantity - sellBrokerage
  const grossProfit = saleAmount - investedAmount
  const taxAmount = grossProfit > 0 ? (grossProfit * taxRate) / 100 : 0
  const netProfit = grossProfit - taxAmount
  const roi = investedAmount > 0 ? (netProfit / investedAmount) * 100 : 0
  return { investedAmount, saleAmount, grossProfit, taxAmount, netProfit, roi }
}

export function calculateHomeAffordability(
  monthlyIncome: number, monthlyDebts: number, downPayment: number,
  interestRate: number, loanTermYears: number, propertyTaxRate: number = 1.2,
  insuranceRate: number = 0.5
) {
  const maxHousingPayment = monthlyIncome * 0.28
  const maxTotalDebt = monthlyIncome * 0.36
  const maxDebtBasedPayment = maxTotalDebt - monthlyDebts
  const maxPayment = Math.min(maxHousingPayment, maxDebtBasedPayment)
  const r = interestRate / 100 / 12
  const n = loanTermYears * 12
  const maxLoan = r > 0 ? maxPayment / (r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)) : maxPayment * n
  const monthlyTaxInsurance = 0
  const maxHomePrice = maxLoan + downPayment
  const actualMonthlyPayment = r > 0 ? maxLoan * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1) : maxLoan / n
  const monthlyPropertyTax = (maxHomePrice * propertyTaxRate / 100) / 12
  const monthlyInsurance = (maxHomePrice * insuranceRate / 100) / 12
  const totalMonthlyPayment = actualMonthlyPayment + monthlyPropertyTax + monthlyInsurance
  return {
    maxHomePrice: Math.round(maxHomePrice),
    maxLoanAmount: Math.round(maxLoan),
    maxMonthlyPayment: Math.round(maxPayment),
    actualMonthlyPayment: Math.round(actualMonthlyPayment),
    monthlyPropertyTax: Math.round(monthlyPropertyTax),
    monthlyInsurance: Math.round(monthlyInsurance),
    totalMonthlyPayment: Math.round(totalMonthlyPayment),
    frontEndRatio: Math.round((totalMonthlyPayment / monthlyIncome) * 100),
    backEndRatio: Math.round(((totalMonthlyPayment + monthlyDebts) / monthlyIncome) * 100),
  }
}

export function calculateFIRE(
  currentAge: number, targetAge: number, monthlyExpenses: number,
  currentSavings: number, monthlySavings: number, expectedReturn: number,
  safeWithdrawalRate: number = 4
) {
  const annualExpenses = monthlyExpenses * 12
  const fireNumber = (annualExpenses / safeWithdrawalRate) * 100
  const years = targetAge - currentAge
  const r = expectedReturn / 100 / 12
  const n = years * 12
  const futureValueSavings = currentSavings * Math.pow(1 + r, n)
  const futureValueMonthly = r > 0 ? monthlySavings * (Math.pow(1 + r, n) - 1) / r : monthlySavings * n
  const projectedCorpus = futureValueSavings + futureValueMonthly
  const gap = fireNumber - projectedCorpus
  const requiredMonthlySavings = r > 0
    ? (fireNumber - currentSavings * Math.pow(1 + r, n)) * r / (Math.pow(1 + r, n) - 1)
    : (fireNumber - currentSavings) / n
  const yearData = Array.from({ length: Math.min(years, 40) }, (_, i) => {
    const y = i + 1
    const months = y * 12
    const corpus = currentSavings * Math.pow(1 + r, months) + (r > 0 ? monthlySavings * (Math.pow(1 + r, months) - 1) / r : monthlySavings * months)
    return { year: currentAge + y, corpus: Math.round(corpus), target: Math.round(fireNumber) }
  })
  return {
    fireNumber: Math.round(fireNumber),
    projectedCorpus: Math.round(projectedCorpus),
    gap: Math.round(gap),
    isAchievable: projectedCorpus >= fireNumber,
    requiredMonthlySavings: Math.max(0, Math.round(requiredMonthlySavings)),
    annualExpenses: Math.round(annualExpenses),
    yearData,
  }
}

export function calculateCurrencyExchangeProfit(
  investmentAmount: number, buyRate: number, sellRate: number, charges: number = 0
) {
  const foreignCurrency = investmentAmount / buyRate
  const returnAmount = foreignCurrency * sellRate - charges
  const profit = returnAmount - investmentAmount
  const roi = (profit / investmentAmount) * 100
  return { foreignCurrency, returnAmount: Math.round(returnAmount), profit: Math.round(profit), roi }
}

// --- 10 NEW USA CALCULATORS ---------------------------------------------------

export function calculate401k(
  currentAge: number, retirementAge: number, currentBalance: number,
  annualSalary: number, employeeContribPct: number, employerMatchPct: number,
  employerMatchLimit: number, annualReturn: number, annualSalaryIncrease: number = 2
) {
  const years = retirementAge - currentAge
  const r = annualReturn / 100
  const g = annualSalaryIncrease / 100
  let balance = currentBalance
  let totalEmployee = 0, totalEmployer = 0
  const yearData = []
  let salary = annualSalary
  for (let y = 1; y <= years; y++) {
    const empContrib = salary * (employeeContribPct / 100)
    const empMatch = salary * Math.min(employeeContribPct, employerMatchLimit) / 100 * (employerMatchPct / 100)
    balance = balance * (1 + r) + empContrib + empMatch
    totalEmployee += empContrib
    totalEmployer += empMatch
    salary = salary * (1 + g)
    if (y % 5 === 0 || y === years) yearData.push({ year: currentAge + y, balance: Math.round(balance), totalEmployee: Math.round(totalEmployee), totalEmployer: Math.round(totalEmployer) })
  }
  const monthlyIncome = (balance * 0.04) / 12
  return { finalBalance: Math.round(balance), totalEmployee: Math.round(totalEmployee), totalEmployer: Math.round(totalEmployer), totalGrowth: Math.round(balance - totalEmployee - totalEmployer - currentBalance), monthlyIncome: Math.round(monthlyIncome), yearData }
}

export function calculateSocialSecurity(
  currentAge: number, startAge: number, monthlyBenefit62: number
) {
  // Benefit adjustments: 62 = 70%, 66 = 100% (FRA), 70 = 124%
  const fra = 67
  const adjustmentPerYear = startAge < fra ? -6.67 : 8
  const yearsFromFRA = startAge - fra
  const adjustmentPct = 100 + yearsFromFRA * adjustmentPerYear
  const adjustedMonthly = (monthlyBenefit62 / 0.70) * (adjustmentPct / 100)
  const lifeExpectancy = 85
  const totalBenefit = adjustedMonthly * 12 * Math.max(0, lifeExpectancy - startAge)
  const scenarios = [62, 64, 65, 66, 67, 68, 70].map(age => {
    const yrs = age - fra
    const pct = 100 + yrs * (age < fra ? -6.67 : 8)
    const monthly = (monthlyBenefit62 / 0.70) * (pct / 100)
    const total = monthly * 12 * Math.max(0, lifeExpectancy - age)
    return { age, monthly: Math.round(monthly), total: Math.round(total), pct: Math.round(pct) }
  })
  const breakEvenAge62 = Math.round(62 + (adjustedMonthly * (startAge - 62) * 12) / ((adjustedMonthly - (monthlyBenefit62)) * 12))
  return { adjustedMonthly: Math.round(adjustedMonthly), totalBenefit: Math.round(totalBenefit), adjustmentPct: Math.round(adjustmentPct), scenarios, breakEvenAge62 }
}

export function calculateCDLadder(
  totalInvestment: number, numRungs: number, baseRate: number, rateIncrement: number = 0.3
) {
  const perRung = totalInvestment / numRungs
  const rungs = Array.from({ length: numRungs }, (_, i) => {
    const years = i + 1
    const rate = baseRate + i * rateIncrement
    const maturity = perRung * Math.pow(1 + rate / 100, years)
    const interest = maturity - perRung
    return { rung: i + 1, years, rate: parseFloat(rate.toFixed(2)), principal: Math.round(perRung), maturityValue: Math.round(maturity), interest: Math.round(interest) }
  })
  const totalMaturity = rungs.reduce((s, r) => s + r.maturityValue, 0)
  const totalInterest = rungs.reduce((s, r) => s + r.interest, 0)
  const blendedRate = ((totalMaturity / totalInvestment) - 1) / (numRungs / 2) * 100
  return { rungs, totalMaturity: Math.round(totalMaturity), totalInterest: Math.round(totalInterest), blendedRate: parseFloat(blendedRate.toFixed(3)) }
}

export function calculateStudentLoan(
  loanBalance: number, interestRate: number, monthlyPayment: number, extraPayment: number = 0
) {
  const r = interestRate / 100 / 12
  const totalPayment = monthlyPayment + extraPayment
  let balance = loanBalance
  let months = 0
  let totalInterest = 0
  const yearData = []
  while (balance > 0 && months < 360) {
    const interest = balance * r
    const principal = Math.min(totalPayment - interest, balance)
    balance -= principal
    totalInterest += interest
    months++
    if (months % 12 === 0) yearData.push({ year: Math.floor(months / 12), balance: Math.round(Math.max(0, balance)), totalInterest: Math.round(totalInterest) })
  }
  const standardMonths = Math.ceil(-Math.log(1 - r * loanBalance / monthlyPayment) / Math.log(1 + r))
  const monthsSaved = standardMonths - months
  const interestSaved = (monthlyPayment * standardMonths - loanBalance) - totalInterest
  return { months, years: Math.floor(months / 12), remainingMonths: months % 12, totalInterest: Math.round(totalInterest), totalPaid: Math.round(months * totalPayment), monthsSaved: Math.max(0, monthsSaved), interestSaved: Math.max(0, Math.round(interestSaved)), yearData }
}

export function calculateHELOC(
  homeValue: number, mortgageBalance: number, creditLinePct: number = 85,
  drawAmount: number, interestRate: number, repaymentYears: number
) {
  const equity = homeValue - mortgageBalance
  const ltv = mortgageBalance / homeValue
  const maxCreditLine = homeValue * (creditLinePct / 100) - mortgageBalance
  const availableCredit = Math.max(0, maxCreditLine)
  const r = interestRate / 100 / 12
  const n = repaymentYears * 12
  const monthlyPayment = drawAmount * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)
  const totalInterest = monthlyPayment * n - drawAmount
  const interestOnlyPayment = drawAmount * r
  return {
    equity: Math.round(equity),
    maxCreditLine: Math.round(maxCreditLine),
    availableCredit: Math.round(availableCredit),
    ltv: parseFloat((ltv * 100).toFixed(1)),
    monthlyPayment: Math.round(monthlyPayment),
    interestOnlyPayment: Math.round(interestOnlyPayment),
    totalInterest: Math.round(totalInterest),
    totalCost: Math.round(drawAmount + totalInterest),
  }
}

export function calculateRothIRA(
  currentAge: number, retirementAge: number, currentBalance: number,
  annualContribution: number, annualReturn: number, taxRate: number
) {
  const years = retirementAge - currentAge
  const r = annualReturn / 100
  let balance = currentBalance
  const yearData = []
  let totalContributed = currentBalance
  for (let y = 1; y <= years; y++) {
    balance = (balance + annualContribution) * (1 + r)
    totalContributed += annualContribution
    if (y % 5 === 0 || y === years) yearData.push({ year: currentAge + y, balance: Math.round(balance), contributed: Math.round(totalContributed) })
  }
  const taxableEquivalent = balance / (1 - taxRate / 100)
  const taxSavings = taxableEquivalent - balance
  const growth = balance - totalContributed
  return { finalBalance: Math.round(balance), totalContributed: Math.round(totalContributed), growth: Math.round(growth), taxSavings: Math.round(taxSavings), taxableEquivalent: Math.round(taxableEquivalent), monthlyIncome: Math.round((balance * 0.04) / 12), yearData }
}

export function calculatePaycheck(
  annualSalary: number, payPeriod: 'weekly' | 'biweekly' | 'semimonthly' | 'monthly',
  filingStatus: 'single' | 'married' | 'hoh', allowances: number,
  stateRate: number, retirement401k: number, healthInsurance: number, hsa: number
) {
  const periods = { weekly: 52, biweekly: 26, semimonthly: 24, monthly: 12 }
  const periodsPerYear = periods[payPeriod]
  const grossPerPeriod = annualSalary / periodsPerYear
  const pretax401k = (retirement401k / 100) * grossPerPeriod
  const pretaxHSA = hsa / periodsPerYear
  const pretaxHealth = healthInsurance / periodsPerYear
  const federalTaxableIncome = annualSalary - (retirement401k / 100 * annualSalary) - hsa - healthInsurance
  const standardDeductions: Record<string, number> = { single: 14600, married: 29200, hoh: 21900 }
  const taxableAfterDeduction = Math.max(0, federalTaxableIncome - standardDeductions[filingStatus])
  // 2026 Federal tax brackets (approximate)
  let federalTaxAnnual = 0
  const brackets = filingStatus === 'married'
    ? [[23200, 0.10], [94300, 0.12], [201050, 0.22], [383900, 0.24], [487450, 0.32], [731200, 0.35], [Infinity, 0.37]]
    : [[11600, 0.10], [47150, 0.12], [100525, 0.22], [191950, 0.24], [243725, 0.32], [609350, 0.35], [Infinity, 0.37]]
  let prev = 0
  for (const [limit, rate] of brackets as [number, number][]) {
    if (taxableAfterDeduction <= prev) break
    federalTaxAnnual += (Math.min(taxableAfterDeduction, limit as number) - prev) * rate
    prev = limit as number
  }
  const federalTaxPerPeriod = federalTaxAnnual / periodsPerYear
  const ssPerPeriod = Math.min(grossPerPeriod, 160200 / periodsPerYear) * 0.062
  const medicarePerPeriod = grossPerPeriod * 0.0145
  const stateTaxPerPeriod = grossPerPeriod * (stateRate / 100)
  const totalDeductions = pretax401k + pretaxHSA + pretaxHealth + federalTaxPerPeriod + ssPerPeriod + medicarePerPeriod + stateTaxPerPeriod
  const netPay = grossPerPeriod - totalDeductions
  const effectiveFederalRate = (federalTaxAnnual / annualSalary) * 100
  return {
    grossPerPeriod: Math.round(grossPerPeriod),
    netPay: Math.round(netPay),
    federalTax: Math.round(federalTaxPerPeriod),
    stateTax: Math.round(stateTaxPerPeriod),
    socialSecurity: Math.round(ssPerPeriod),
    medicare: Math.round(medicarePerPeriod),
    retirement401k: Math.round(pretax401k),
    healthInsurance: Math.round(pretaxHealth),
    hsa: Math.round(pretaxHSA),
    effectiveFederalRate: parseFloat(effectiveFederalRate.toFixed(1)),
    annualNet: Math.round(netPay * periodsPerYear),
  }
}

export function calculateCarDepreciation(
  purchasePrice: number, age: number, makeType: 'luxury' | 'standard' | 'economy' | 'truck',
  mileagePerYear: number
) {
  const firstYearDep: Record<string, number> = { luxury: 0.25, standard: 0.20, economy: 0.15, truck: 0.15 }
  const annualDep: Record<string, number> = { luxury: 0.18, standard: 0.15, economy: 0.12, truck: 0.10 }
  const mileagePenalty = Math.max(0, (mileagePerYear - 15000) / 1000) * 0.005
  const yearData = []
  let value = purchasePrice
  for (let y = 1; y <= Math.max(age, 10); y++) {
    const rate = y === 1 ? firstYearDep[makeType] : annualDep[makeType] + mileagePenalty
    value = value * (1 - rate)
    yearData.push({ year: y, value: Math.round(Math.max(value, purchasePrice * 0.05)), depreciation: Math.round(purchasePrice - value) })
  }
  const currentValue = yearData[age - 1]?.value || Math.round(purchasePrice * 0.05)
  const totalDepreciation = purchasePrice - currentValue
  const costPerMile = (totalDepreciation / (age * mileagePerYear)) 
  return { currentValue, totalDepreciation: Math.round(totalDepreciation), retainedPct: Math.round((currentValue / purchasePrice) * 100), costPerMile: parseFloat(costPerMile.toFixed(3)), yearData }
}

export function calculateDividendIncome(
  investmentAmount: number, dividendYield: number, sharePrice: number,
  annualDividendGrowth: number, years: number, reinvest: boolean
) {
  const shares = investmentAmount / sharePrice
  let totalShares = shares
  let price = sharePrice
  let annualDividend = (dividendYield / 100) * sharePrice
  let totalDividends = 0
  const yearData = []
  for (let y = 1; y <= years; y++) {
    annualDividend = annualDividend * (1 + annualDividendGrowth / 100)
    price = price * (1 + annualDividendGrowth / 100)
    const dividendReceived = totalShares * annualDividend
    if (reinvest) totalShares += dividendReceived / price
    totalDividends += dividendReceived
    yearData.push({ year: y, annualIncome: Math.round(dividendReceived), totalDividends: Math.round(totalDividends), portfolioValue: Math.round(totalShares * price) })
  }
  const finalPortfolioValue = totalShares * price
  const forwardYield = (annualDividend / price) * 100
  return { finalPortfolioValue: Math.round(finalPortfolioValue), totalDividends: Math.round(totalDividends), monthlyIncome: Math.round((totalShares * annualDividend) / 12), forwardYield: parseFloat(forwardYield.toFixed(2)), totalReturn: Math.round(finalPortfolioValue + totalDividends - investmentAmount), yearData }
}

export function calculateCollegeCost(
  childAge: number, collegeType: 'public_instate' | 'public_outstate' | 'private' | 'community',
  years: number, currentSavings: number, monthlySavings: number,
  investmentReturn: number, inflationRate: number = 6
) {
  const yearsUntilCollege = 18 - childAge
  const baseCosts: Record<string, number> = { public_instate: 28000, public_outstate: 45000, private: 62000, community: 12000 }
  const baseCost = baseCosts[collegeType]
  const futureCostPerYear = baseCost * Math.pow(1 + inflationRate / 100, yearsUntilCollege)
  const totalFutureCost = futureCostPerYear * years
  const r = investmentReturn / 100 / 12
  const n = yearsUntilCollege * 12
  const futureValueCurrent = currentSavings * Math.pow(1 + r, n)
  const futureValueMonthly = r > 0 ? monthlySavings * (Math.pow(1 + r, n) - 1) / r : monthlySavings * n
  const projectedSavings = futureValueCurrent + futureValueMonthly
  const gap = totalFutureCost - projectedSavings
  const requiredMonthly = r > 0 && n > 0 ? (totalFutureCost - futureValueCurrent) * r / (Math.pow(1 + r, n) - 1) : (totalFutureCost - currentSavings) / n
  return { totalFutureCost: Math.round(totalFutureCost), futureCostPerYear: Math.round(futureCostPerYear), projectedSavings: Math.round(projectedSavings), gap: Math.round(gap), requiredMonthly: Math.max(0, Math.round(requiredMonthly)), isFunded: projectedSavings >= totalFutureCost, currentCostPerYear: baseCost }
}

// --- 10 EUROPE-BASED CALCULATORS ---------------------------------------------

export function calculateVAT(
  amount: number, vatRate: number, type: 'exclusive' | 'inclusive'
) {
  if (type === 'exclusive') {
    const vatAmount = amount * (vatRate / 100)
    return { netAmount: amount, vatAmount, grossAmount: amount + vatAmount, vatRate }
  } else {
    const netAmount = amount / (1 + vatRate / 100)
    const vatAmount = amount - netAmount
    return { netAmount, vatAmount, grossAmount: amount, vatRate }
  }
}

export function calculateUKStampDuty(
  propertyPrice: number,
  buyerType: 'firstTime' | 'standard' | 'additionalProperty',
  isEnglandWales: boolean = true
) {
  let tax = 0
  let brackets: { limit: number; rate: number }[] = []

  if (buyerType === 'additionalProperty') {
    // Standard + 3% surcharge
    brackets = [
      { limit: 250000, rate: 0.05 },
      { limit: 925000, rate: 0.10 },
      { limit: 1500000, rate: 0.13 },
      { limit: Infinity, rate: 0.18 },
    ]
  } else if (buyerType === 'firstTime') {
    // First time buyer relief: 0% up to £425k, 5% £425k-£625k, no relief above £625k
    if (propertyPrice <= 425000) {
      brackets = [{ limit: 425000, rate: 0 }, { limit: Infinity, rate: 0.05 }]
    } else if (propertyPrice <= 625000) {
      brackets = [{ limit: 425000, rate: 0 }, { limit: 625000, rate: 0.05 }, { limit: Infinity, rate: 0.05 }]
    } else {
      brackets = [
        { limit: 250000, rate: 0 },
        { limit: 925000, rate: 0.05 },
        { limit: 1500000, rate: 0.10 },
        { limit: Infinity, rate: 0.12 },
      ]
    }
  } else {
    brackets = [
      { limit: 250000, rate: 0 },
      { limit: 925000, rate: 0.05 },
      { limit: 1500000, rate: 0.10 },
      { limit: Infinity, rate: 0.12 },
    ]
  }

  let prev = 0
  for (const { limit, rate } of brackets) {
    if (propertyPrice <= prev) break
    tax += (Math.min(propertyPrice, limit) - prev) * rate
    prev = limit
  }

  const effectiveRate = (tax / propertyPrice) * 100
  const totalCost = propertyPrice + tax
  return { stampDuty: Math.round(tax), effectiveRate: parseFloat(effectiveRate.toFixed(2)), totalCost: Math.round(totalCost), propertyPrice }
}

export function calculateEuropeanMortgage(
  propertyPrice: number, depositPct: number,
  annualRate: number, termYears: number,
  country: string = 'UK'
) {
  const deposit = propertyPrice * (depositPct / 100)
  const loanAmount = propertyPrice - deposit
  const r = annualRate / 100 / 12
  const n = termYears * 12
  const monthlyPayment = r > 0 ? loanAmount * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1) : loanAmount / n
  const totalPaid = monthlyPayment * n
  const totalInterest = totalPaid - loanAmount
  const ltv = (loanAmount / propertyPrice) * 100

  const yearData = []
  let balance = loanAmount
  for (let y = 1; y <= Math.min(termYears, 30); y++) {
    let yearInterest = 0, yearPrincipal = 0
    for (let m = 0; m < 12; m++) {
      const interest = balance * r
      const principal = monthlyPayment - interest
      yearInterest += interest
      yearPrincipal += principal
      balance = Math.max(0, balance - principal)
    }
    yearData.push({ year: y, balance: Math.round(balance), yearInterest: Math.round(yearInterest), yearPrincipal: Math.round(yearPrincipal) })
  }

  return { loanAmount: Math.round(loanAmount), deposit: Math.round(deposit), monthlyPayment: Math.round(monthlyPayment), totalPaid: Math.round(totalPaid), totalInterest: Math.round(totalInterest), ltv: parseFloat(ltv.toFixed(1)), yearData }
}

export function calculateISA(
  currentBalance: number, annualContribution: number,
  annualReturn: number, years: number,
  isaType: 'stocks' | 'cash' | 'lifetime'
) {
  const limit2026 = isaType === 'lifetime' ? 4000 : 20000
  const contribution = Math.min(annualContribution, limit2026)
  const bonusPct = isaType === 'lifetime' ? 0.25 : 0
  const annualBonus = contribution * bonusPct
  const totalAnnualIn = contribution + annualBonus
  const r = annualReturn / 100
  let balance = currentBalance
  let totalContributed = currentBalance
  let totalBonus = 0
  const yearData = []
  for (let y = 1; y <= years; y++) {
    balance = (balance + totalAnnualIn) * (1 + r)
    totalContributed += contribution
    totalBonus += annualBonus
    if (y % 5 === 0 || y === years) yearData.push({ year: y, balance: Math.round(balance), contributed: Math.round(totalContributed) })
  }
  const growth = balance - totalContributed - totalBonus
  return { finalBalance: Math.round(balance), totalContributed: Math.round(totalContributed), growth: Math.round(growth), totalBonus: Math.round(totalBonus), taxSaving: Math.round(growth * 0.2), yearData, limit: limit2026 }
}

export function calculateUKPension(
  currentAge: number, retirementAge: number,
  annualSalary: number, employeeContribPct: number,
  employerContribPct: number, currentPot: number,
  annualReturn: number, includeStatePension: boolean = true
) {
  const years = retirementAge - currentAge
  const r = annualReturn / 100
  const annualEmployee = annualSalary * (employeeContribPct / 100)
  const annualEmployer = annualSalary * (employerContribPct / 100)
  const totalAnnual = annualEmployee + annualEmployer
  let balance = currentPot
  let totalEmployee = 0, totalEmployer = 0
  const yearData = []
  for (let y = 1; y <= years; y++) {
    balance = (balance + totalAnnual) * (1 + r)
    totalEmployee += annualEmployee
    totalEmployer += annualEmployer
    if (y % 5 === 0 || y === years) yearData.push({ year: currentAge + y, balance: Math.round(balance), totalEmployee: Math.round(totalEmployee), totalEmployer: Math.round(totalEmployer) })
  }
  const statePension = includeStatePension ? 11502 : 0 // 2026/27 full new state pension
  const annualDrawdown = balance * 0.04
  const totalAnnualIncome = annualDrawdown + statePension
  return { finalPot: Math.round(balance), totalEmployee: Math.round(totalEmployee), totalEmployer: Math.round(totalEmployer), growth: Math.round(balance - totalEmployee - totalEmployer - currentPot), monthlyIncome: Math.round(totalAnnualIncome / 12), statePension, annualDrawdown: Math.round(annualDrawdown), yearData }
}

export function calculateGovernmentBond(
  faceValue: number, couponRate: number, yearsToMaturity: number,
  marketPrice: number, country: string = 'UK'
) {
  const annualCoupon = faceValue * (couponRate / 100)
  // Yield to Maturity approximation
  const ytm = (annualCoupon + (faceValue - marketPrice) / yearsToMaturity) / ((faceValue + marketPrice) / 2) * 100
  const totalCoupons = annualCoupon * yearsToMaturity
  const capitalGainLoss = faceValue - marketPrice
  const totalReturn = totalCoupons + capitalGainLoss
  const totalReturnPct = (totalReturn / marketPrice) * 100
  // Duration (Macaulay)
  let duration = 0
  let pv = 0
  for (let t = 1; t <= yearsToMaturity; t++) {
    const cashflow = t === yearsToMaturity ? annualCoupon + faceValue : annualCoupon
    const pvCashflow = cashflow / Math.pow(1 + ytm / 100, t)
    duration += t * pvCashflow
    pv += pvCashflow
  }
  const macaulayDuration = pv > 0 ? duration / pv : yearsToMaturity
  const yearData = Array.from({ length: yearsToMaturity }, (_, i) => ({
    year: i + 1,
    coupon: Math.round(annualCoupon),
    cumulative: Math.round(annualCoupon * (i + 1)),
  }))
  return { ytm: parseFloat(ytm.toFixed(3)), totalReturn: Math.round(totalReturn), totalReturnPct: parseFloat(totalReturnPct.toFixed(2)), annualCoupon: Math.round(annualCoupon), macaulayDuration: parseFloat(macaulayDuration.toFixed(2)), capitalGainLoss: Math.round(capitalGainLoss), yearData }
}

export function calculateUKIncomeTax(
  grossIncome: number, pensionContrib: number = 0,
  taxYear: string = '2025/26'
) {
  // 2025/26 UK tax rates
  const personalAllowance = 12570
  const basicRateLimit = 50270
  const higherRateLimit = 125140
  // NI thresholds
  const niPrimaryThreshold = 12570
  const niUpperEarnings = 50270

  const adjustedIncome = grossIncome - pensionContrib
  // PA tapers above £100k
  const taperThreshold = 100000
  const effectivePa = adjustedIncome > taperThreshold
    ? Math.max(0, personalAllowance - (adjustedIncome - taperThreshold) / 2)
    : personalAllowance
  const taxableIncome = Math.max(0, adjustedIncome - effectivePa)

  let incomeTax = 0
  if (taxableIncome > 0) {
    incomeTax += Math.min(taxableIncome, basicRateLimit - effectivePa) * 0.20
    if (taxableIncome > basicRateLimit - effectivePa) {
      incomeTax += Math.min(taxableIncome - (basicRateLimit - effectivePa), higherRateLimit - basicRateLimit) * 0.40
    }
    if (taxableIncome > higherRateLimit - effectivePa) {
      incomeTax += (taxableIncome - (higherRateLimit - effectivePa)) * 0.45
    }
  }

  // National Insurance (Class 1 employee)
  let nationalInsurance = 0
  if (adjustedIncome > niPrimaryThreshold) {
    nationalInsurance += (Math.min(adjustedIncome, niUpperEarnings) - niPrimaryThreshold) * 0.08
    if (adjustedIncome > niUpperEarnings) {
      nationalInsurance += (adjustedIncome - niUpperEarnings) * 0.02
    }
  }

  const totalDeductions = incomeTax + nationalInsurance + pensionContrib
  const netIncome = grossIncome - totalDeductions
  const effectiveTaxRate = (incomeTax / grossIncome) * 100
  const totalDeductionRate = (totalDeductions / grossIncome) * 100

  return {
    grossIncome,
    incomeTax: Math.round(incomeTax),
    nationalInsurance: Math.round(nationalInsurance),
    pensionContrib: Math.round(pensionContrib),
    netIncome: Math.round(netIncome),
    effectiveTaxRate: parseFloat(effectiveTaxRate.toFixed(1)),
    totalDeductionRate: parseFloat(totalDeductionRate.toFixed(1)),
    effectivePa: Math.round(effectivePa),
    monthlyNet: Math.round(netIncome / 12),
  }
}

export function calculateRentalYield(
  propertyValue: number, monthlyRent: number,
  annualCosts: number, mortgagePayment: number = 0,
  vacancyRate: number = 5
) {
  const annualRent = monthlyRent * 12
  const effectiveRent = annualRent * (1 - vacancyRate / 100)
  const grossYield = (annualRent / propertyValue) * 100
  const netYield = ((effectiveRent - annualCosts) / propertyValue) * 100
  const annualMortgage = mortgagePayment * 12
  const cashflow = effectiveRent - annualCosts - annualMortgage
  const monthlyCashflow = cashflow / 12
  const roi = mortgagePayment > 0 ? (cashflow / (propertyValue * 0.25)) * 100 : netYield
  return {
    grossYield: parseFloat(grossYield.toFixed(2)),
    netYield: parseFloat(netYield.toFixed(2)),
    annualRent: Math.round(annualRent),
    effectiveRent: Math.round(effectiveRent),
    annualCashflow: Math.round(cashflow),
    monthlyCashflow: Math.round(monthlyCashflow),
    roi: parseFloat(roi.toFixed(2)),
  }
}

export function calculateEuroAutoLoan(
  vehiclePrice: number, depositPct: number,
  annualRate: number, termMonths: number,
  balloonPaymentPct: number = 0
) {
  const deposit = vehiclePrice * (depositPct / 100)
  const balloon = vehiclePrice * (balloonPaymentPct / 100)
  const loanAmount = vehiclePrice - deposit - balloon / Math.pow(1 + annualRate / 100 / 12, termMonths)
  const r = annualRate / 100 / 12
  const monthlyPayment = r > 0
    ? (loanAmount - balloon / Math.pow(1 + r, termMonths)) * r * Math.pow(1 + r, termMonths) / (Math.pow(1 + r, termMonths) - 1)
    : loanAmount / termMonths
  const totalPaid = monthlyPayment * termMonths + balloon + deposit
  const totalInterest = totalPaid - vehiclePrice
  return { loanAmount: Math.round(loanAmount), deposit: Math.round(deposit), monthlyPayment: Math.round(monthlyPayment), totalPaid: Math.round(totalPaid), totalInterest: Math.round(totalInterest), balloon: Math.round(balloon) }
}

export function calculateFIREEurope(
  monthlyExpenses: number, currentSavings: number,
  monthlySavings: number, annualReturn: number,
  currentAge: number, targetAge: number,
  swr: number = 3.5, country: string = 'Germany'
) {
  const annualExpenses = monthlyExpenses * 12
  const fireNumber = (annualExpenses / swr) * 100
  const years = targetAge - currentAge
  const r = annualReturn / 100 / 12
  const n = years * 12
  const fvCurrent = currentSavings * Math.pow(1 + r, n)
  const fvMonthly = r > 0 ? monthlySavings * (Math.pow(1 + r, n) - 1) / r : monthlySavings * n
  const projectedCorpus = fvCurrent + fvMonthly
  const gap = fireNumber - projectedCorpus
  const requiredMonthly = r > 0 ? (fireNumber - fvCurrent) * r / (Math.pow(1 + r, n) - 1) : (fireNumber - currentSavings) / n
  const yearData = Array.from({ length: Math.min(years, 40) }, (_, i) => {
    const months = (i + 1) * 12
    const corpus = currentSavings * Math.pow(1 + r, months) + (r > 0 ? monthlySavings * (Math.pow(1 + r, months) - 1) / r : monthlySavings * months)
    return { year: currentAge + i + 1, corpus: Math.round(corpus), target: Math.round(fireNumber) }
  })
  return { fireNumber: Math.round(fireNumber), projectedCorpus: Math.round(projectedCorpus), gap: Math.round(gap), isAchievable: projectedCorpus >= fireNumber, requiredMonthly: Math.max(0, Math.round(requiredMonthly)), annualExpenses: Math.round(annualExpenses), yearData }
}

// --- v12: 10 new finance calculators -----------------------------------------

export function calculatePERatio(
  stockPrice: number, eps: number, growthRate: number, years: number = 5
) {
  const peRatio = eps > 0 ? stockPrice / eps : 0
  const pegRatio = peRatio > 0 && growthRate > 0 ? peRatio / growthRate : 0
  const fairValueDCF = growthRate > 0 ? eps * Math.pow(1 + growthRate / 100, years) * (1 / (0.1 - growthRate / 100 > 0 ? 0.1 - growthRate / 100 : 0.05)) : eps * 15
  const upside = fairValueDCF > 0 ? ((fairValueDCF - stockPrice) / stockPrice) * 100 : 0
  const projectedPrices = Array.from({ length: years }, (_, i) => ({
    year: i + 1,
    projectedEPS: parseFloat((eps * Math.pow(1 + growthRate / 100, i + 1)).toFixed(2)),
    projectedPrice: Math.round(eps * Math.pow(1 + growthRate / 100, i + 1) * peRatio),
  }))
  return {
    peRatio: parseFloat(peRatio.toFixed(2)),
    pegRatio: parseFloat(pegRatio.toFixed(2)),
    fairValueDCF: Math.round(fairValueDCF),
    upside: parseFloat(upside.toFixed(2)),
    overvalued: stockPrice > fairValueDCF,
    projectedPrices,
    valuation: peRatio < 15 ? 'Undervalued' : peRatio < 25 ? 'Fair Value' : peRatio < 40 ? 'Overvalued' : 'Highly Overvalued',
  }
}

export function calculateCryptoProfit(
  buyPrice: number, sellPrice: number, quantity: number,
  buyFeePercent: number = 0.1, sellFeePercent: number = 0.1,
  holdingMonths: number = 12
) {
  const buyTotal = buyPrice * quantity
  const buyFee = buyTotal * (buyFeePercent / 100)
  const totalCost = buyTotal + buyFee
  const sellTotal = sellPrice * quantity
  const sellFee = sellTotal * (sellFeePercent / 100)
  const netProceeds = sellTotal - sellFee
  const profit = netProceeds - totalCost
  const roi = totalCost > 0 ? (profit / totalCost) * 100 : 0
  const annualizedROI = holdingMonths > 0 ? (Math.pow(1 + roi / 100, 12 / holdingMonths) - 1) * 100 : roi
  const breakEvenPrice = totalCost / quantity / (1 - sellFeePercent / 100)
  return {
    buyTotal: Math.round(buyTotal),
    buyFee: parseFloat(buyFee.toFixed(2)),
    totalCost: parseFloat(totalCost.toFixed(2)),
    sellTotal: Math.round(sellTotal),
    sellFee: parseFloat(sellFee.toFixed(2)),
    netProceeds: parseFloat(netProceeds.toFixed(2)),
    profit: parseFloat(profit.toFixed(2)),
    roi: parseFloat(roi.toFixed(2)),
    annualizedROI: parseFloat(annualizedROI.toFixed(2)),
    breakEvenPrice: parseFloat(breakEvenPrice.toFixed(4)),
    isProfit: profit > 0,
  }
}

export function calculateEmergencyFund(
  monthlyExpenses: number, targetMonths: number,
  currentSavings: number, monthlySavings: number,
  savingsRate: number = 4.5
) {
  const targetFund = monthlyExpenses * targetMonths
  const gap = Math.max(0, targetFund - currentSavings)
  const monthsToGoal = monthlySavings > 0 ? Math.ceil(gap / monthlySavings) : Infinity
  const r = savingsRate / 100 / 12
  const interestEarned = currentSavings > 0 || monthlySavings > 0
    ? currentSavings * Math.pow(1 + r, monthsToGoal) + (r > 0 ? monthlySavings * (Math.pow(1 + r, monthsToGoal) - 1) / r : monthlySavings * monthsToGoal) - currentSavings - monthlySavings * monthsToGoal
    : 0
  const categories = [
    { name: 'Housing (rent/mortgage)', percent: 35, amount: Math.round(monthlyExpenses * 0.35) },
    { name: 'Food & Groceries', percent: 15, amount: Math.round(monthlyExpenses * 0.15) },
    { name: 'Transport', percent: 12, amount: Math.round(monthlyExpenses * 0.12) },
    { name: 'Utilities & Bills', percent: 10, amount: Math.round(monthlyExpenses * 0.10) },
    { name: 'Insurance', percent: 8, amount: Math.round(monthlyExpenses * 0.08) },
    { name: 'Other essentials', percent: 20, amount: Math.round(monthlyExpenses * 0.20) },
  ]
  return {
    targetFund: Math.round(targetFund),
    currentSavings: Math.round(currentSavings),
    gap: Math.round(gap),
    isFunded: currentSavings >= targetFund,
    fundedPercent: Math.min(100, Math.round((currentSavings / targetFund) * 100)),
    monthsToGoal: isFinite(monthsToGoal) ? monthsToGoal : null,
    interestEarned: Math.round(interestEarned),
    categories,
  }
}

export function calculateRentVsBuy(
  homePrice: number, downPaymentPct: number, mortgageRate: number,
  mortgageYears: number, monthlyRent: number, annualRentIncrease: number,
  annualHomeAppreciation: number, propertyTaxPct: number = 1.2,
  maintenancePct: number = 1, years: number = 10
) {
  const downPayment = homePrice * (downPaymentPct / 100)
  const loanAmount = homePrice - downPayment
  const r = mortgageRate / 100 / 12
  const n = mortgageYears * 12
  const monthlyMortgage = r > 0 ? loanAmount * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1) : loanAmount / n
  const monthlyPropertyTax = homePrice * (propertyTaxPct / 100) / 12
  const monthlyMaintenance = homePrice * (maintenancePct / 100) / 12
  const totalMonthlyBuy = monthlyMortgage + monthlyPropertyTax + monthlyMaintenance

  const yearData = Array.from({ length: years }, (_, i) => {
    const yr = i + 1
    // Buy costs
    const homeValue = homePrice * Math.pow(1 + annualHomeAppreciation / 100, yr)
    const remainingLoan = loanAmount * (Math.pow(1 + r, yr * 12) - Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) > 0
      ? loanAmount * (Math.pow(1 + r, n) - Math.pow(1 + r, yr * 12)) / (Math.pow(1 + r, n) - 1)
      : 0
    const equity = homeValue - Math.max(0, remainingLoan)
    const totalBuyCost = downPayment + totalMonthlyBuy * yr * 12
    // Rent costs
    const annualRent = monthlyRent * 12 * ((Math.pow(1 + annualRentIncrease / 100, yr) - 1) / (annualRentIncrease / 100 || 0.001))
    const totalRentCost = annualRent
    const netBuyCost = totalBuyCost - equity
    return { year: yr, homeValue: Math.round(homeValue), equity: Math.round(equity), totalBuyCost: Math.round(totalBuyCost), totalRentCost: Math.round(totalRentCost), netBuyCost: Math.round(netBuyCost) }
  })

  const finalYear = yearData[years - 1]
  return {
    monthlyMortgage: Math.round(monthlyMortgage),
    monthlyPropertyTax: Math.round(monthlyPropertyTax),
    monthlyMaintenance: Math.round(monthlyMaintenance),
    totalMonthlyBuy: Math.round(totalMonthlyBuy),
    downPayment: Math.round(downPayment),
    loanAmount: Math.round(loanAmount),
    buyBetter: finalYear.equity > finalYear.totalRentCost,
    yearData,
  }
}

export function calculateSalaryHike(
  currentSalary: number, hikePercent: number, years: number,
  annualHikePercent: number = 0, inflationRate: number = 3
) {
  const newSalary = currentSalary * (1 + hikePercent / 100)
  const raise = newSalary - currentSalary
  const yearData = Array.from({ length: years }, (_, i) => {
    const yr = i + 1
    const nominal = newSalary * Math.pow(1 + annualHikePercent / 100, yr)
    const real = nominal / Math.pow(1 + inflationRate / 100, yr)
    const cumulative = nominal - currentSalary
    return { year: yr, salary: Math.round(nominal), realSalary: Math.round(real), raise: Math.round(cumulative) }
  })
  const lifetimeEarnings = yearData.reduce((s, y) => s + y.salary, 0)
  const lifetimeWithoutRaise = Array.from({ length: years }, (_, i) => currentSalary * Math.pow(1 + annualHikePercent / 100, i + 1)).reduce((a, b) => a + b, 0)
  return {
    currentSalary: Math.round(currentSalary),
    newSalary: Math.round(newSalary),
    raise: Math.round(raise),
    hikePercent: parseFloat(hikePercent.toFixed(2)),
    lifetimeEarnings: Math.round(lifetimeEarnings),
    lifetimeGain: Math.round(lifetimeEarnings - lifetimeWithoutRaise),
    realNewSalary: Math.round(newSalary / Math.pow(1 + inflationRate / 100, 1)),
    yearData,
  }
}

export function calculateCreditCardPayoff(
  balance: number, annualRate: number, minimumPayment: number,
  extraPayment: number = 0
) {
  const r = annualRate / 100 / 12
  // Minimum payment only
  let bal = balance, months = 0, totalInterestMin = 0
  while (bal > 0 && months < 600) {
    const interest = bal * r
    const payment = Math.max(minimumPayment, bal * 0.02)
    totalInterestMin += interest
    bal = bal + interest - payment
    months++
  }
  const minMonths = months
  const minTotalInterest = Math.round(totalInterestMin)

  // With extra payment
  bal = balance; months = 0
  let totalInterestExtra = 0
  const monthlyData: { month: number; balance: number; interest: number; payment: number }[] = []
  while (bal > 0 && months < 600) {
    const interest = bal * r
    const payment = Math.min(bal + interest, Math.max(minimumPayment, bal * 0.02) + extraPayment)
    totalInterestExtra += interest
    bal = Math.max(0, bal + interest - payment)
    months++
    if (months <= 60) monthlyData.push({ month: months, balance: Math.round(bal), interest: Math.round(interest), payment: Math.round(payment) })
  }

  return {
    balance: Math.round(balance),
    minMonths,
    minTotalInterest,
    minTotalPaid: Math.round(balance + minTotalInterest),
    extraMonths: months,
    extraTotalInterest: Math.round(totalInterestExtra),
    extraTotalPaid: Math.round(balance + totalInterestExtra),
    interestSaved: Math.round(minTotalInterest - totalInterestExtra),
    monthsSaved: minMonths - months,
    monthlyData,
  }
}

export function calculateRealReturn(
  nominalReturn: number, inflationRate: number,
  investmentAmount: number, years: number
) {
  const realReturnRate = ((1 + nominalReturn / 100) / (1 + inflationRate / 100) - 1) * 100
  const nominalFV = investmentAmount * Math.pow(1 + nominalReturn / 100, years)
  const realFV = investmentAmount * Math.pow(1 + realReturnRate / 100, years)
  const inflationImpact = nominalFV - realFV
  const yearData = Array.from({ length: Math.min(years, 30) }, (_, i) => ({
    year: i + 1,
    nominal: Math.round(investmentAmount * Math.pow(1 + nominalReturn / 100, i + 1)),
    real: Math.round(investmentAmount * Math.pow(1 + realReturnRate / 100, i + 1)),
    inflationCost: Math.round(investmentAmount * Math.pow(1 + nominalReturn / 100, i + 1) - investmentAmount * Math.pow(1 + realReturnRate / 100, i + 1)),
  }))
  return {
    nominalReturn: parseFloat(nominalReturn.toFixed(2)),
    inflationRate: parseFloat(inflationRate.toFixed(2)),
    realReturnRate: parseFloat(realReturnRate.toFixed(2)),
    nominalFV: Math.round(nominalFV),
    realFV: Math.round(realFV),
    inflationImpact: Math.round(inflationImpact),
    purchasingPowerLoss: parseFloat(((1 - realFV / nominalFV) * 100).toFixed(2)),
    yearData,
  }
}

export function calculateRealEstateROI(
  purchasePrice: number, downPaymentPct: number,
  mortgageRate: number, mortgageTerm: number,
  monthlyRent: number, vacancyRatePercent: number,
  propertyTaxPct: number, insurancePct: number,
  maintenancePct: number, managementFeePercent: number,
  annualAppreciation: number, yearsHeld: number,
  sellingCostPercent: number = 6
) {
  const downPayment = purchasePrice * (downPaymentPct / 100)
  const loanAmount = purchasePrice - downPayment
  const r = mortgageRate / 100 / 12
  const n = mortgageTerm * 12
  const monthlyMortgage = r > 0 ? loanAmount * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1) : loanAmount / n
  const effectiveRent = monthlyRent * (1 - vacancyRatePercent / 100)
  const annualRent = effectiveRent * 12
  const annualExpenses = purchasePrice * (propertyTaxPct + insurancePct + maintenancePct) / 100 + monthlyRent * 12 * (managementFeePercent / 100)
  const annualMortgage = monthlyMortgage * 12
  const noi = annualRent - annualExpenses
  const cashflow = noi - annualMortgage
  const capRate = (noi / purchasePrice) * 100
  const cashOnCash = downPayment > 0 ? (cashflow / downPayment) * 100 : 0
  const salePrice = purchasePrice * Math.pow(1 + annualAppreciation / 100, yearsHeld)
  const remainingLoan = loanAmount * (Math.pow(1 + r, n) - Math.pow(1 + r, yearsHeld * 12)) / (Math.pow(1 + r, n) - 1)
  const sellingCosts = salePrice * (sellingCostPercent / 100)
  const netSaleProceeds = salePrice - Math.max(0, remainingLoan) - sellingCosts
  const totalCashflowYears = cashflow * yearsHeld
  const totalReturn = netSaleProceeds - downPayment + totalCashflowYears
  const totalROI = downPayment > 0 ? (totalReturn / downPayment) * 100 : 0
  const annualizedROI = downPayment > 0 ? (Math.pow(1 + totalROI / 100, 1 / yearsHeld) - 1) * 100 : 0
  return {
    downPayment: Math.round(downPayment),
    monthlyMortgage: Math.round(monthlyMortgage),
    effectiveMonthlyRent: Math.round(effectiveRent),
    annualExpenses: Math.round(annualExpenses),
    noi: Math.round(noi),
    annualCashflow: Math.round(cashflow),
    monthlyCashflow: Math.round(cashflow / 12),
    capRate: parseFloat(capRate.toFixed(2)),
    cashOnCash: parseFloat(cashOnCash.toFixed(2)),
    salePrice: Math.round(salePrice),
    netSaleProceeds: Math.round(netSaleProceeds),
    totalReturn: Math.round(totalReturn),
    totalROI: parseFloat(totalROI.toFixed(2)),
    annualizedROI: parseFloat(annualizedROI.toFixed(2)),
    isPositiveCashflow: cashflow > 0,
  }
}

export function calculateLumpSumVsSIP(
  totalAmount: number, annualReturn: number, years: number
) {
  const r = annualReturn / 100
  const lumpSumFV = totalAmount * Math.pow(1 + r, years)
  const monthlyAmount = totalAmount / (years * 12)
  const rMonthly = annualReturn / 100 / 12
  const n = years * 12
  const sipFV = rMonthly > 0 ? monthlyAmount * (Math.pow(1 + rMonthly, n) - 1) / rMonthly * (1 + rMonthly) : monthlyAmount * n
  const yearData = Array.from({ length: years }, (_, i) => {
    const yr = i + 1
    const lsVal = totalAmount * Math.pow(1 + r, yr)
    const sipMonths = yr * 12
    const sipVal = rMonthly > 0 ? monthlyAmount * (Math.pow(1 + rMonthly, sipMonths) - 1) / rMonthly * (1 + rMonthly) : monthlyAmount * sipMonths
    return { year: yr, lumpSum: Math.round(lsVal), sip: Math.round(sipVal) }
  })
  return {
    totalAmount: Math.round(totalAmount),
    monthlyAmount: parseFloat(monthlyAmount.toFixed(2)),
    lumpSumFV: Math.round(lumpSumFV),
    sipFV: Math.round(sipFV),
    lumpSumGain: Math.round(lumpSumFV - totalAmount),
    sipGain: Math.round(sipFV - totalAmount),
    lumpSumBetter: lumpSumFV > sipFV,
    difference: Math.abs(Math.round(lumpSumFV - sipFV)),
    yearData,
  }
}

export function calculateMortgageRefinance(
  currentBalance: number, currentRate: number, remainingMonths: number,
  newRate: number, newTermMonths: number, closingCosts: number
) {
  const rOld = currentRate / 100 / 12
  const currentPayment = rOld > 0 ? currentBalance * rOld * Math.pow(1 + rOld, remainingMonths) / (Math.pow(1 + rOld, remainingMonths) - 1) : currentBalance / remainingMonths
  const totalCurrentCost = currentPayment * remainingMonths

  const rNew = newRate / 100 / 12
  const newPayment = rNew > 0 ? currentBalance * rNew * Math.pow(1 + rNew, newTermMonths) / (Math.pow(1 + rNew, newTermMonths) - 1) : currentBalance / newTermMonths
  const totalNewCost = newPayment * newTermMonths + closingCosts
  const monthlySavings = currentPayment - newPayment
  const breakEvenMonths = monthlySavings > 0 ? Math.ceil(closingCosts / monthlySavings) : null
  const netSavings = totalCurrentCost - totalNewCost
  return {
    currentPayment: Math.round(currentPayment),
    newPayment: Math.round(newPayment),
    monthlySavings: Math.round(monthlySavings),
    totalCurrentCost: Math.round(totalCurrentCost),
    totalNewCost: Math.round(totalNewCost),
    netSavings: Math.round(netSavings),
    breakEvenMonths,
    worthRefinancing: netSavings > 0,
    interestSavedCurrent: Math.round(totalCurrentCost - currentBalance),
    interestSavedNew: Math.round(totalNewCost - currentBalance - closingCosts),
  }
}

/** Auto Loan Calculator (with trade-in, sales tax, fees) */
export function calculateAutoLoan(vehiclePrice: number, downPayment: number, tradeIn: number, salesTaxRate: number, fees: number, annualRate: number, months: number) {
  const taxAmount = vehiclePrice * salesTaxRate / 100
  const principal = vehiclePrice - downPayment - tradeIn + taxAmount + fees
  const r = annualRate / 100 / 12
  const emi = r > 0 ? principal * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1) : principal / months
  const totalPayment = emi * months
  const totalInterest = totalPayment - principal
  const schedule = []
  let balance = principal
  for (let m = 1; m <= months; m++) {
    const interest = balance * r
    const principalPaid = emi - interest
    balance = Math.max(0, balance - principalPaid)
    schedule.push({ month: m, payment: Math.round(emi), principal: Math.round(principalPaid), interest: Math.round(interest), balance: Math.round(balance) })
  }
  return { principal: Math.round(principal), emi: Math.round(emi), totalPayment: Math.round(totalPayment), totalInterest: Math.round(totalInterest), taxAmount: Math.round(taxAmount), schedule }
}

/** Biweekly Mortgage Calculator */
export function calculateBiweeklyMortgage(loanAmount: number, annualRate: number, termYears: number) {
  const r = annualRate / 100 / 12
  const n = termYears * 12
  const monthlyPayment = r > 0 ? loanAmount * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1) : loanAmount / n
  const biweeklyPayment = monthlyPayment / 2
  const rBi = annualRate / 100 / 26
  const biweeklyPayments = Math.log(biweeklyPayment / (biweeklyPayment - loanAmount * rBi)) / Math.log(1 + rBi)
  const yearsToPayoff = biweeklyPayments / 26
  const totalBiweekly = biweeklyPayment * biweeklyPayments
  const totalMonthly = monthlyPayment * n
  const interestSaved = totalMonthly - totalBiweekly
  const yearsSaved = termYears - yearsToPayoff
  return {
    monthlyPayment: Math.round(monthlyPayment),
    biweeklyPayment: Math.round(biweeklyPayment),
    totalMonthlyInterest: Math.round(totalMonthly - loanAmount),
    totalBiweeklyInterest: Math.round(totalBiweekly - loanAmount),
    interestSaved: Math.round(interestSaved),
    yearsSaved: Math.round(yearsSaved * 10) / 10,
    yearsToPayoff: Math.round(yearsToPayoff * 10) / 10,
    biweeklyPaymentsCount: Math.round(biweeklyPayments),
  }
}

/** Down Payment Calculator */
export function calculateDownPayment(homePrice: number, downPct: number, annualRate: number, termYears: number, propTaxRate: number, annualInsurance: number) {
  const downPayment = homePrice * downPct / 100
  const loanAmount = homePrice - downPayment
  const r = annualRate / 100 / 12
  const n = termYears * 12
  const emi = r > 0 ? loanAmount * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1) : loanAmount / n
  const pmi = downPct < 20 ? loanAmount * 0.008 / 12 : 0
  const monthlyTax = homePrice * propTaxRate / 100 / 12
  const monthlyIns = annualInsurance / 12
  const totalMonthly = emi + pmi + monthlyTax + monthlyIns
  const pmiMonths = downPct < 20 ? Math.ceil(Math.log(0.8) / Math.log(1 - r)) : 0
  const totalPMI = pmi * pmiMonths
  const scenarios = [5, 10, 15, 20, 25].map(pct => {
    const dp = homePrice * pct / 100
    const loan = homePrice - dp
    const payment = r > 0 ? loan * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1) : loan / n
    const needsPMI = pct < 20
    const pmiAmt = needsPMI ? loan * 0.008 / 12 : 0
    return { pct, downPayment: Math.round(dp), loanAmount: Math.round(loan), emi: Math.round(payment), pmi: Math.round(pmiAmt), totalMonthly: Math.round(payment + pmiAmt + monthlyTax + monthlyIns) }
  })
  return { downPayment: Math.round(downPayment), loanAmount: Math.round(loanAmount), emi: Math.round(emi), pmi: Math.round(pmi), totalMonthly: Math.round(totalMonthly), totalPMI: Math.round(totalPMI), scenarios }
}

/** Closing Cost Calculator */
export function calculateClosingCosts(homePrice: number, loanAmount: number, state: string) {
  const lenderFees = loanAmount * 0.01
  const appraisal = 500
  const inspection = 400
  const titleInsurance = homePrice * 0.005
  const titleSearch = 300
  const attorney = 1000
  const escrow = loanAmount * 0.002
  const prepaidInterest = loanAmount * 0.07 / 12 * 15 / 30
  const propertyTax = homePrice * 0.012 / 12 * 3
  const homeownersIns = 1400 / 12 * 2
  const recordingFees = 125
  const transferTax = homePrice * 0.001
  const total = lenderFees + appraisal + inspection + titleInsurance + titleSearch + attorney + escrow + prepaidInterest + propertyTax + homeownersIns + recordingFees + transferTax
  const breakdown = [
    { name: 'Lender Origination Fee (1%)', amount: Math.round(lenderFees), type: 'lender' },
    { name: 'Appraisal Fee', amount: appraisal, type: 'lender' },
    { name: 'Home Inspection', amount: inspection, type: 'lender' },
    { name: 'Title Insurance', amount: Math.round(titleInsurance), type: 'title' },
    { name: 'Title Search', amount: titleSearch, type: 'title' },
    { name: 'Attorney Fee', amount: attorney, type: 'title' },
    { name: 'Escrow Fee', amount: Math.round(escrow), type: 'title' },
    { name: 'Prepaid Interest (15 days)', amount: Math.round(prepaidInterest), type: 'prepaid' },
    { name: 'Property Tax Reserve (3 mo)', amount: Math.round(propertyTax), type: 'prepaid' },
    { name: "Homeowner's Ins Reserve (2 mo)", amount: Math.round(homeownersIns), type: 'prepaid' },
    { name: 'Recording Fees', amount: recordingFees, type: 'govt' },
    { name: 'Transfer Tax', amount: Math.round(transferTax), type: 'govt' },
  ]
  return { total: Math.round(total), percentage: Math.round(total / homePrice * 1000) / 10, breakdown }
}

/** Loan Payoff Date Calculator */
export function calculatePayoffDate(balance: number, annualRate: number, monthlyPayment: number, extraPayment: number) {
  const r = annualRate / 100 / 12
  const totalPayment = monthlyPayment + extraPayment
  let bal = balance
  let months = 0
  let totalInterest = 0
  while (bal > 0 && months < 600) {
    const interest = bal * r
    totalInterest += interest
    bal = bal + interest - totalPayment
    months++
    if (bal < 0) bal = 0
  }
  const minPayment = r > 0 ? balance * r * Math.pow(1 + r, 360) / (Math.pow(1 + r, 360) - 1) : balance / 360
  let monthsMin = 0; let intMin = 0; let balMin = balance
  while (balMin > 0 && monthsMin < 600) {
    const interest = balMin * r; intMin += interest; balMin = Math.max(0, balMin + interest - monthlyPayment); monthsMin++
  }
  const payoffDate = new Date()
  payoffDate.setMonth(payoffDate.getMonth() + months)
  return {
    months,
    years: Math.floor(months / 12),
    remainingMonths: months % 12,
    totalInterest: Math.round(totalInterest),
    totalPaid: Math.round(balance + totalInterest),
    payoffDate: payoffDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    monthsSaved: monthsMin - months,
    interestSaved: Math.round(intMin - totalInterest),
    minPayment: Math.round(minPayment),
  }
}

/** Budget Planner (50/30/20 rule) */
export function calculateBudgetPlan(monthlyIncome: number, expenses: { name: string; amount: number; category: 'needs' | 'wants' | 'savings' }[]) {
  const totalNeeds = expenses.filter(e => e.category === 'needs').reduce((s, e) => s + e.amount, 0)
  const totalWants = expenses.filter(e => e.category === 'wants').reduce((s, e) => s + e.amount, 0)
  const totalSavings = expenses.filter(e => e.category === 'savings').reduce((s, e) => s + e.amount, 0)
  const totalExpenses = totalNeeds + totalWants + totalSavings
  const surplus = monthlyIncome - totalExpenses
  const idealNeeds = monthlyIncome * 0.5
  const idealWants = monthlyIncome * 0.3
  const idealSavings = monthlyIncome * 0.2
  return {
    totalNeeds, totalWants, totalSavings, totalExpenses, surplus,
    needsPct: Math.round(totalNeeds / monthlyIncome * 100),
    wantsPct: Math.round(totalWants / monthlyIncome * 100),
    savingsPct: Math.round(totalSavings / monthlyIncome * 100),
    idealNeeds: Math.round(idealNeeds), idealWants: Math.round(idealWants), idealSavings: Math.round(idealSavings),
    needsOver: Math.round(totalNeeds - idealNeeds), wantsOver: Math.round(totalWants - idealWants), savingsUnder: Math.round(idealSavings - totalSavings),
  }
}

/** Savings Rate Calculator */
export function calculateSavingsRate(monthlyIncome: number, monthlyExpenses: number, retirementContrib: number, otherSavings: number) {
  const totalSavings = retirementContrib + otherSavings
  const savingsRate = totalSavings / monthlyIncome * 100
  const yearsToFIRE: Record<number, number> = {}
  for (const rate of [10, 20, 30, 40, 50, 60, 70]) {
    const sr = rate / 100
    const annualExpenses = monthlyExpenses * 12
    const annualSavings = monthlyIncome * 12 * sr
    if (sr < 1) {
      const r = 0.07
      const years = Math.log(25 * annualExpenses / (annualSavings || 1)) / Math.log(1 + r)
      yearsToFIRE[rate] = Math.max(1, Math.round(years))
    }
  }
  return {
    totalSavings,
    savingsRate: Math.round(savingsRate * 10) / 10,
    monthsToFIRE: Math.round(Math.log(25 * monthlyExpenses / (totalSavings || 1)) / Math.log(1.07 / 12 + 1)),
    yearsToFIRE: Math.round(Math.log(25 * monthlyExpenses * 12 / (totalSavings * 12 || 1)) / Math.log(1.07)),
    yearsToFIRETable: yearsToFIRE,
    annualIncome: monthlyIncome * 12,
    annualSavings: totalSavings * 12,
    annualExpenses: monthlyExpenses * 12,
  }
}

/** Interest Rate Calculator (find rate from payment) */
export function findInterestRate(principal: number, monthlyPayment: number, months: number) {
  let low = 0, high = 1, mid = 0
  for (let i = 0; i < 100; i++) {
    mid = (low + high) / 2
    const r = mid / 12
    const payment = r > 0 ? principal * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1) : principal / months
    if (payment < monthlyPayment) low = mid
    else high = mid
  }
  const apr = mid * 100
  const totalPaid = monthlyPayment * months
  const totalInterest = totalPaid - principal
  return { apr: Math.round(apr * 100) / 100, monthlyRate: Math.round(apr / 12 * 1000) / 1000, totalInterest: Math.round(totalInterest), totalPaid: Math.round(totalPaid) }
}

/** Loan Comparison Calculator */
export function compareLoanOptions(loans: { name: string; principal: number; rate: number; months: number; fees: number }[]) {
  return loans.map(loan => {
    const r = loan.rate / 100 / 12
    const emi = r > 0 ? loan.principal * r * Math.pow(1 + r, loan.months) / (Math.pow(1 + r, loan.months) - 1) : loan.principal / loan.months
    const totalPayment = emi * loan.months + loan.fees
    const totalInterest = totalPayment - loan.principal
    const apr = loan.rate + (loan.fees / loan.principal / (loan.months / 12)) * 100
    return { name: loan.name, principal: loan.principal, emi: Math.round(emi), totalInterest: Math.round(totalInterest), totalPayment: Math.round(totalPayment), apr: Math.round(apr * 100) / 100, bestValue: false }
  }).map((loan, _, arr) => ({ ...loan, bestValue: loan.totalPayment === Math.min(...arr.map(l => l.totalPayment)) }))
}

/** Annual Income Calculator */
export function calculateAnnualIncome(hourlyRate: number, hoursPerWeek: number, weeksPerYear: number, overtimeHours: number, overtimeMultiplier: number) {
  const regularHours = hoursPerWeek * weeksPerYear
  const regularPay = hourlyRate * regularHours
  const overtimePay = hourlyRate * overtimeMultiplier * overtimeHours * weeksPerYear
  const grossAnnual = regularPay + overtimePay
  const grossMonthly = grossAnnual / 12
  const grossBiweekly = grossAnnual / 26
  const grossWeekly = grossAnnual / 52
  const federalTax = grossAnnual * 0.22
  const fica = grossAnnual * 0.0765
  const stateTax = grossAnnual * 0.05
  const netAnnual = grossAnnual - federalTax - fica - stateTax
  return { grossAnnual: Math.round(grossAnnual), grossMonthly: Math.round(grossMonthly), grossBiweekly: Math.round(grossBiweekly), grossWeekly: Math.round(grossWeekly), regularPay: Math.round(regularPay), overtimePay: Math.round(overtimePay), netAnnual: Math.round(netAnnual), netMonthly: Math.round(netAnnual / 12), effectiveTaxRate: Math.round((federalTax + fica + stateTax) / grossAnnual * 100) }
}

// ─── 25 NEW USA FINANCE CALCULATORS ─────────────────────────────────────────

export function calculateHELOCCreditLine(homeValue: number, mortgageBalance: number, creditLimit: number, drawAmount: number, apr: number, drawPeriodYears: number, repayPeriodYears: number) {
  const equity = homeValue - mortgageBalance
  const maxCredit = homeValue * creditLimit / 100 - mortgageBalance
  const monthlyRate = apr / 100 / 12
  const drawMonths = drawPeriodYears * 12
  const repayMonths = repayPeriodYears * 12
  const interestOnlyPayment = drawAmount * monthlyRate
  const repayPayment = drawAmount * (monthlyRate * Math.pow(1 + monthlyRate, repayMonths)) / (Math.pow(1 + monthlyRate, repayMonths) - 1)
  const totalInterestDraw = interestOnlyPayment * drawMonths
  const totalInterestRepay = repayPayment * repayMonths - drawAmount
  const totalCost = totalInterestDraw + totalInterestRepay
  return { equity, maxCredit: Math.max(0, maxCredit), interestOnlyPayment, repayPayment, totalInterestDraw, totalInterestRepay, totalCost, ltv: (mortgageBalance / homeValue) * 100 }
}

export function calculateSSBenefit(currentAge: number, claimAge: number, estimatedBenefit: number) {
  const FRA = 67
  let adjustedBenefit = estimatedBenefit
  if (claimAge < FRA) {
    const monthsEarly = (FRA - claimAge) * 12
    const reduction = monthsEarly <= 36 ? monthsEarly * (5 / 9) / 100 : 36 * (5 / 9) / 100 + (monthsEarly - 36) * (5 / 12) / 100
    adjustedBenefit = estimatedBenefit * (1 - reduction)
  } else if (claimAge > FRA) {
    const monthsLate = (claimAge - FRA) * 12
    adjustedBenefit = estimatedBenefit * (1 + monthsLate * (8 / 12) / 100)
  }
  const yearsCollecting = 90 - claimAge
  const lifetimeBenefit = adjustedBenefit * 12 * yearsCollecting
  const yearData = Array.from({ length: Math.max(0, 90 - currentAge) }, (_, i) => {
    const age = currentAge + i
    const collecting = age >= claimAge
    return { age, cumulative: collecting ? adjustedBenefit * 12 * (age - claimAge + 1) : 0 }
  })
  return { adjustedBenefit, monthlyAtFRA: estimatedBenefit, lifetimeBenefit, breakEvenAge: claimAge < FRA ? Math.round(FRA + (FRA - claimAge) * 2.5) : Math.round(FRA + (claimAge - FRA) * 1.5), yearData }
}

export function calculateRMD(accountBalance: number, age: number, accountType: 'traditional-ira' | '401k' | 'inherited-ira') {
  const IRS_FACTORS: Record<number, number> = {
    73: 26.5, 74: 25.5, 75: 24.6, 76: 23.7, 77: 22.9, 78: 22.0, 79: 21.1,
    80: 20.2, 81: 19.4, 82: 18.5, 83: 17.7, 84: 16.8, 85: 16.0, 86: 15.2,
    87: 14.4, 88: 13.7, 89: 12.9, 90: 12.2, 91: 11.5, 92: 10.8, 93: 10.1,
    94: 9.5, 95: 8.9, 96: 8.4, 97: 7.8, 98: 7.3, 99: 6.8, 100: 6.4,
  }
  const factor = IRS_FACTORS[Math.min(Math.max(age, 73), 100)] || 26.5
  const rmd = accountBalance / factor
  const penalty = age < 73 ? 0 : 0
  const yearlyProjection = Array.from({ length: 20 }, (_, i) => {
    const yr = i + 1
    const f = IRS_FACTORS[Math.min(age + i, 100)] || 6.4
    const bal = accountBalance * Math.pow(0.95, i)
    return { year: yr, age: age + i, rmd: Math.round(bal / f), balance: Math.round(bal) }
  })
  return { rmd, factor, penaltyIfMissed: rmd * 0.25, yearlyProjection }
}

export function calculateBackdoorRoth(income: number, filingStatus: 'single' | 'married', conversionAmount: number, nonDeductibleBasis: number, totalIRABalance: number, taxRate: number) {
  const rothLimit2026 = filingStatus === 'single' ? 150000 : 236000
  const proRataRatio = totalIRABalance > 0 ? nonDeductibleBasis / totalIRABalance : 1
  const taxableConversion = conversionAmount * (1 - proRataRatio)
  const taxDue = taxableConversion * (taxRate / 100)
  const taxFreeGrowth = conversionAmount
  const eligible = income > rothLimit2026
  return { eligible, proRataRatio, taxableConversion, taxFreeConversion: conversionAmount - taxableConversion, taxDue, annualSavings: taxFreeGrowth * 0.07 * 30 * (taxRate / 100), strategy: proRataRatio < 0.1 ? 'Clean — minimal tax impact' : proRataRatio < 0.5 ? 'Moderate pro-rata issue — consider aggregation rules' : 'High pro-rata — roll pre-tax IRA to 401k first' }
}

export function calculateMegaBackdoorRoth(salary: number, regularContrib: number, employerMatch: number, afterTaxContrib: number, taxRate: number) {
  const limit2026Total = 70000
  const employeeLimit = 23500
  const afterTaxMax = limit2026Total - Math.min(regularContrib, employeeLimit) - employerMatch * salary / 100
  const inPlanConversion = Math.min(afterTaxContrib, Math.max(0, afterTaxMax))
  const taxOnConversion = inPlanConversion * 0.01
  const taxFreeGrowth30yr = inPlanConversion * Math.pow(1.07, 30)
  const taxSavings30yr = (taxFreeGrowth30yr - inPlanConversion) * (taxRate / 100)
  return { afterTaxMax: Math.round(Math.max(0, afterTaxMax)), inPlanConversion: Math.round(inPlanConversion), taxOnConversion: Math.round(taxOnConversion), taxFreeGrowth30yr: Math.round(taxFreeGrowth30yr), taxSavings30yr: Math.round(taxSavings30yr), totalContrib: Math.round(Math.min(regularContrib, employeeLimit) + inPlanConversion + (employerMatch * salary / 100)) }
}

export function calculateSEP_IRA(selfEmploymentIncome: number, businessType: 'sole-proprietor' | 'scorp' | 'partnership', age: number) {
  const limit2026 = 70000
  const net = businessType === 'sole-proprietor' ? selfEmploymentIncome * 0.9235 : selfEmploymentIncome
  const maxContrib = Math.min(net * 0.25, limit2026)
  const taxSavings = maxContrib * 0.37
  const catchUp = age >= 50 ? 0 : 0 // SEP has no catch-up
  const growth30 = maxContrib * Math.pow(1.07, 30)
  return { maxContrib: Math.round(maxContrib), taxSavings: Math.round(taxSavings), netCostAfterTax: Math.round(maxContrib - taxSavings), projectedGrowth30yr: Math.round(growth30), vsEmployee401k: Math.round(maxContrib - 23500) }
}

export function calculateCapitalGainsTax(purchasePrice: number, salePrice: number, yearsHeld: number, filingStatus: 'single' | 'married' | 'hoh', income: number, isQOZ: boolean = false) {
  const gain = salePrice - purchasePrice
  const isLongTerm = yearsHeld >= 1
  let rate = 0
  if (isLongTerm) {
    const thresholds = filingStatus === 'married' ? [96700, 600050] : filingStatus === 'hoh' ? [64750, 566450] : [48350, 533400]
    if (income + gain > thresholds[1]) rate = 0.20
    else if (income + gain > thresholds[0]) rate = 0.15
    else rate = 0
  } else {
    rate = income < 47150 ? 0.10 : income < 100525 ? 0.12 : income < 191950 ? 0.22 : income < 243725 ? 0.24 : income < 609350 ? 0.32 : 0.37
  }
  const niit = income + gain > (filingStatus === 'married' ? 250000 : 200000) && isLongTerm ? gain * 0.038 : 0
  const totalTax = gain > 0 ? gain * rate + niit : 0
  const qozDeferral = isQOZ ? totalTax * 0.10 : 0
  return { gain, isLongTerm, rate, federalTax: Math.round(gain > 0 ? gain * rate : 0), niit: Math.round(niit), totalTax: Math.round(totalTax), netProceeds: Math.round(salePrice - totalTax), effectiveRate: gain > 0 ? ((totalTax / gain) * 100).toFixed(1) : '0', qozSavings: Math.round(qozDeferral) }
}

export function calculateRealEstateCostBasis(purchasePrice: number, closingCosts: number, improvements: number, depreciation: number, salePrice: number, sellingCosts: number, yearsHeld: number) {
  const adjustedBasis = purchasePrice + closingCosts + improvements - depreciation
  const realizedGain = salePrice - sellingCosts - adjustedBasis
  const section121Exclusion = Math.min(Math.max(0, realizedGain), 250000) // $500k married
  const taxableGain = Math.max(0, realizedGain - section121Exclusion)
  const deprecRecapture = Math.min(depreciation, realizedGain) * 0.25
  const capitalGain = Math.max(0, taxableGain - depreciation) * 0.15
  const totalTax = deprecRecapture + capitalGain
  return { adjustedBasis: Math.round(adjustedBasis), realizedGain: Math.round(realizedGain), section121Exclusion: Math.round(section121Exclusion), taxableGain: Math.round(taxableGain), deprecRecapture: Math.round(deprecRecapture), capitalGainTax: Math.round(capitalGain), totalTax: Math.round(totalTax), netProfit: Math.round(salePrice - sellingCosts - purchasePrice - improvements + closingCosts - totalTax) }
}

export function calculateI_Bonds(purchaseAmount: number, months: number, fixedRate: number = 1.3, inflationRate: number = 3.11) {
  const compositeRate = fixedRate + 2 * inflationRate + (fixedRate * inflationRate) / 100
  const annualRate = compositeRate / 100
  const penaltyMonths = months < 60 ? 3 : 0
  const effectiveMonths = Math.max(0, months - penaltyMonths)
  const value = purchaseAmount * Math.pow(1 + annualRate / 2, effectiveMonths / 6)
  const interest = value - purchaseAmount
  const annualLimit = 10000
  const yearData = Array.from({ length: Math.min(Math.ceil(months / 12) + 1, 31) }, (_, i) => ({
    year: i, value: Math.round(purchaseAmount * Math.pow(1 + annualRate / 2, i * 2))
  }))
  return { compositeRate: compositeRate.toFixed(2), value: Math.round(value), interest: Math.round(interest), effectiveYield: ((value / purchaseAmount - 1) / (months / 12) * 100).toFixed(2), penaltyMonths, annualLimit, yearData }
}

export function calculateHSAGrowth(annualContrib: number, age: number, retirementAge: number, currentBalance: number, growthRate: number, taxRate: number, familyCoverage: boolean) {
  const limit2026 = familyCoverage ? 8550 : 4300
  const catchUp = age >= 55 ? 1000 : 0
  const maxContrib = Math.min(annualContrib, limit2026 + catchUp)
  const years = retirementAge - age
  let balance = currentBalance
  const yearData = []
  for (let i = 0; i <= years; i++) {
    balance = balance * (1 + growthRate / 100) + (i < years ? maxContrib : 0)
    yearData.push({ year: i, age: age + i, balance: Math.round(balance) })
  }
  const finalBalance = yearData[yearData.length - 1]?.balance || 0
  const taxEquivalentValue = finalBalance / (1 - taxRate / 100)
  return { maxContrib, finalBalance, totalContribs: Math.round(maxContrib * years + currentBalance), taxEquivalentValue: Math.round(taxEquivalentValue), medicalCoverageYears: Math.round(finalBalance / 6000), yearData }
}

export function calculateMedicarePremium(income: number, filingStatus: 'single' | 'married', year: number = 2026) {
  const IRMAA_SINGLE = [106000, 133000, 167000, 200000, 500000]
  const IRMAA_MARRIED = [212000, 266000, 334000, 400000, 750000]
  const PART_B = [185.0, 259.0, 369.0, 479.0, 589.0, 628.90]
  const PART_D_SURCHARGE = [0, 13.70, 35.30, 57.00, 78.60, 85.80]
  const thresholds = filingStatus === 'married' ? IRMAA_MARRIED : IRMAA_SINGLE
  let tier = 0
  for (let i = 0; i < thresholds.length; i++) { if (income > thresholds[i]) tier = i + 1 }
  const partBPremium = PART_B[Math.min(tier, 5)]
  const partDSurcharge = PART_D_SURCHARGE[Math.min(tier, 5)]
  const monthlyTotal = partBPremium + partDSurcharge + 174.70 // Part A + D base
  return { tier, partBPremium, partDSurcharge, monthlyTotal: Math.round(monthlyTotal * 100) / 100, annualTotal: Math.round(monthlyTotal * 12 * 100) / 100, irmaaApplies: tier > 0, savingsIfLowerIncome: tier > 0 ? Math.round((partBPremium - 185) * 12) : 0 }
}

export function calculateEstateTax(grossEstate: number, debts: number, charitableDeductions: number, spouseTransfer: number, filingStatus: 'single' | 'married') {
  const exemption2026 = filingStatus === 'married' ? 27220000 : 13610000
  const adjustedEstate = grossEstate - debts - charitableDeductions - spouseTransfer
  const taxableEstate = Math.max(0, adjustedEstate - exemption2026)
  let tax = 0
  if (taxableEstate > 0) {
    const brackets = [[10000,18],[20000,20],[40000,22],[60000,24],[80000,26],[100000,28],[250000,30],[500000,32],[750000,34],[1000000,37],[1250000,39],[1500000,41],[2000000,43],[2500000,45],[3000000,49],[Infinity,40]]
    let remaining = taxableEstate
    for (const [limit, rate] of brackets) {
      const taxable = Math.min(remaining, Number(limit))
      tax += taxable * (Number(rate) / 100)
      remaining -= taxable
      if (remaining <= 0) break
    }
  }
  return { adjustedEstate: Math.round(adjustedEstate), taxableEstate: Math.round(taxableEstate), exemption: exemption2026, federalEstateTax: Math.round(tax), effectiveRate: adjustedEstate > 0 ? ((tax / adjustedEstate) * 100).toFixed(1) : '0', portability: filingStatus === 'married' ? Math.round(exemption2026 / 2) : 0, sunsetRisk: 'Exemption may revert to ~$7M in 2026 if TCJA not extended' }
}

export function calculateGiftTax(giftAmount: number, gifteeCount: number, priorTaxableGifts: number, filingStatus: 'single' | 'married') {
  const annualExclusion2026 = 18000
  const lifetimeExemption = 13610000
  const totalExclusion = annualExclusion2026 * gifteeCount * (filingStatus === 'married' ? 2 : 1)
  const taxableGift = Math.max(0, giftAmount - totalExclusion)
  const remainingLifetime = Math.max(0, lifetimeExemption - priorTaxableGifts)
  const giftTaxOwed = taxableGift > remainingLifetime ? (taxableGift - remainingLifetime) * 0.40 : 0
  const remaining529Superfund = 90000 * gifteeCount
  return { annualExclusion: totalExclusion, taxableGift: Math.round(taxableGift), giftTaxOwed: Math.round(giftTaxOwed), remainingLifetime: Math.round(remainingLifetime), newRemainingLifetime: Math.round(Math.max(0, remainingLifetime - taxableGift)), formRequired: taxableGift > 0, superfundingOption: remaining529Superfund }
}

export function calculateQBIDeduction(qbiIncome: number, filingStatus: 'single' | 'married', businessType: 'sstb' | 'non-sstb', wagesAndProperty: number) {
  const threshold = filingStatus === 'married' ? 394600 : 197300
  const phaseoutEnd = filingStatus === 'married' ? 494600 : 247300
  const basicDeduction = Math.min(qbiIncome * 0.20, 0.20 * (qbiIncome - 0))
  let limitedDeduction = basicDeduction
  if (qbiIncome > threshold) {
    const wageLimit = wagesAndProperty * 0.50
    const wagePropertyLimit = wagesAndProperty * 0.25 + qbiIncome * 0.025
    const wageBasedLimit = Math.max(wageLimit, wagePropertyLimit)
    if (businessType === 'sstb' && qbiIncome > phaseoutEnd) {
      limitedDeduction = 0
    } else {
      const phaseoutRatio = Math.min(1, (qbiIncome - threshold) / (phaseoutEnd - threshold))
      limitedDeduction = basicDeduction - (basicDeduction - wageBasedLimit) * phaseoutRatio
    }
  }
  const taxSavings = Math.max(0, limitedDeduction) * 0.37
  return { basicDeduction: Math.round(Math.max(0, basicDeduction)), finalDeduction: Math.round(Math.max(0, limitedDeduction)), taxSavings: Math.round(taxSavings), effectiveRate: qbiIncome > 0 ? ((1 - limitedDeduction / qbiIncome) * 37).toFixed(1) : '37.0', aboveThreshold: qbiIncome > threshold }
}

export function calculateHospitalCosts(procedure: string, uninsuredCost: number, deductible: number, oopMax: number, coinsurance: number, premium: number) {
  const deductiblePaid = Math.min(uninsuredCost, deductible)
  const afterDeductible = Math.max(0, uninsuredCost - deductible)
  const coinsurancePaid = Math.min(afterDeductible * (coinsurance / 100), oopMax - deductiblePaid)
  const totalOOP = deductiblePaid + coinsurancePaid
  const annualPremium = premium * 12
  const totalCostWithInsurance = totalOOP + annualPremium
  const savings = uninsuredCost - totalCostWithInsurance
  return { deductiblePaid: Math.round(deductiblePaid), coinsurancePaid: Math.round(coinsurancePaid), totalOOP: Math.round(totalOOP), annualPremium: Math.round(annualPremium), totalCostWithInsurance: Math.round(totalCostWithInsurance), savings: Math.round(savings), oopMaxReached: totalOOP >= oopMax }
}

export function calculateAlimonyTax(alimonyPaid: number, filingStatus: 'payer' | 'recipient', agreementDate: string, taxRate: number) {
  const preTraca = new Date(agreementDate) < new Date('2019-01-01')
  const taxImpact = preTraca
    ? filingStatus === 'payer' ? -alimonyPaid * (taxRate / 100) : alimonyPaid * (taxRate / 100)
    : 0
  return { preTraca, deductible: preTraca && filingStatus === 'payer', taxable: preTraca && filingStatus === 'recipient', taxImpact: Math.round(Math.abs(taxImpact)), netAlimony: Math.round(filingStatus === 'recipient' ? alimonyPaid - (preTraca ? alimonyPaid * taxRate / 100 : 0) : alimonyPaid - Math.abs(taxImpact)), rule: preTraca ? 'Pre-TCJA: Deductible by payer, taxable to recipient' : 'Post-2018: No deduction for payer, not taxable to recipient' }
}

export function calculateFSA(annualContrib: number, marginalRate: number, ficaRate: number = 7.65, expectedMedical: number, gracePeriod: boolean) {
  const limit2026 = 3300
  const contribCapped = Math.min(annualContrib, limit2026)
  const taxSavings = contribCapped * (marginalRate + ficaRate) / 100
  const netCost = contribCapped - taxSavings
  const forfeitRisk = Math.max(0, contribCapped - expectedMedical - (gracePeriod ? 610 : 0))
  return { contribCapped, taxSavings: Math.round(taxSavings), netCost: Math.round(netCost), effectiveDiscount: Math.round((taxSavings / contribCapped) * 100), forfeitRisk: Math.round(forfeitRisk), recommended: Math.min(Math.ceil(expectedMedical * 1.05), limit2026) }
}

export function calculateDCFSA(annualContrib: number, marginalRate: number, ficaRate: number = 7.65, dependentCareCost: number, filingStatus: 'single' | 'married') {
  const limit2026 = filingStatus === 'married' ? 5000 : 5000
  const contribCapped = Math.min(annualContrib, limit2026)
  const taxSavings = contribCapped * (marginalRate + ficaRate) / 100
  const childTaxCreditValue = Math.min(dependentCareCost, 3000) * 0.20
  const fsaBetter = taxSavings > childTaxCreditValue
  return { contribCapped, taxSavings: Math.round(taxSavings), childTaxCreditValue: Math.round(childTaxCreditValue), netSavings: Math.round(fsaBetter ? taxSavings : childTaxCreditValue), recommendation: fsaBetter ? 'DC-FSA saves more for your income' : 'Child & Dependent Care Credit may be better — compare carefully', effectiveDiscount: Math.round((taxSavings / Math.max(1, contribCapped)) * 100) }
}

export function calculateStudentLoanForgiveness(balance: number, paymentPlan: 'standard' | 'ibr' | 'save' | 'pslf', income: number, familySize: number, yearsInProgram: number) {
  const povertyLine = 15060 + (familySize - 1) * 5380
  const discretionaryIncome = Math.max(0, income - povertyLine * 1.5)
  const monthlyPayment = paymentPlan === 'standard' ? balance * 0.01 :
    paymentPlan === 'ibr' ? discretionaryIncome * 0.10 / 12 :
    paymentPlan === 'save' ? discretionaryIncome * 0.05 / 12 : 0
  const forgivenessTerm = paymentPlan === 'pslf' ? 10 : 20
  const totalPaid = monthlyPayment * 12 * Math.min(yearsInProgram, forgivenessTerm)
  const remainingBalance = Math.max(0, balance - totalPaid * 0.4)
  const taxOnForgiveness = paymentPlan === 'pslf' ? 0 : remainingBalance * 0.22
  return { monthlyPayment: Math.round(monthlyPayment), totalPaid: Math.round(totalPaid), remainingBalance: Math.round(remainingBalance), forgivenessTerm, taxOnForgiveness: Math.round(taxOnForgiveness), netForgivenessBenefit: Math.round(Math.max(0, remainingBalance - taxOnForgiveness)), pslf: paymentPlan === 'pslf' }
}

export function calculateAMT(regularTaxIncome: number, isoOptions: number, preferenceItems: number, filingStatus: 'single' | 'married') {
  const exemption = filingStatus === 'married' ? 137000 : 88100
  const phaseoutThreshold = filingStatus === 'married' ? 1232600 : 616300
  const amtIncome = regularTaxIncome + isoOptions + preferenceItems
  const phaseoutReduction = Math.max(0, (amtIncome - phaseoutThreshold) * 0.25)
  const effectiveExemption = Math.max(0, exemption - phaseoutReduction)
  const tentativeMinTax = Math.max(0, amtIncome - effectiveExemption) * (amtIncome < 232600 ? 0.26 : 0.28)
  const regularTax = regularTaxIncome * 0.24
  const amtOwed = Math.max(0, tentativeMinTax - regularTax)
  return { amtIncome: Math.round(amtIncome), effectiveExemption: Math.round(effectiveExemption), tentativeMinTax: Math.round(tentativeMinTax), regularTax: Math.round(regularTax), amtOwed: Math.round(amtOwed), amtApplies: amtOwed > 0, isoThreshold: Math.round(exemption + phaseoutThreshold - regularTaxIncome) }
}

export function calculateSelfEmploymentTax(netSelfEmploymentIncome: number, hasW2Income: number = 0) {
  const seIncome = netSelfEmploymentIncome * 0.9235
  const ssTaxableMax = 176100
  const ssTaxable = Math.max(0, Math.min(seIncome, ssTaxableMax - hasW2Income))
  const ssTax = ssTaxable * 0.124
  const medicareTax = seIncome * 0.029
  const additionalMedicare = Math.max(0, seIncome - 200000) * 0.009
  const totalSETax = ssTax + medicareTax + additionalMedicare
  const deduction = totalSETax / 2
  const qbiDeduction = seIncome * 0.20
  const effectiveRate = seIncome > 0 ? (totalSETax / seIncome * 100).toFixed(1) : '0'
  return { seIncome: Math.round(seIncome), ssTax: Math.round(ssTax), medicareTax: Math.round(medicareTax), additionalMedicare: Math.round(additionalMedicare), totalSETax: Math.round(totalSETax), deduction: Math.round(deduction), qbiDeduction: Math.round(qbiDeduction), effectiveRate, quarterlyEstimate: Math.round((totalSETax + seIncome * 0.22) / 4) }
}

export function calculateEquityCompensation(type: 'iso' | 'nso' | 'rsu', shares: number, strikePrice: number, fmv: number, vestingYears: number, taxRate: number) {
  const spread = Math.max(0, fmv - strikePrice)
  const totalValue = shares * fmv
  const exerciseCost = type !== 'rsu' ? shares * strikePrice : 0
  const ordinaryIncome = type === 'nso' ? spread * shares : type === 'rsu' ? totalValue : 0
  const amtPreference = type === 'iso' ? spread * shares : 0
  const capitalGainIfHeld = type === 'iso' ? totalValue - shares * fmv : 0
  const taxOnExercise = ordinaryIncome * (taxRate / 100)
  const netValue = totalValue - exerciseCost - taxOnExercise
  const annualVest = shares / vestingYears
  const annualTax = type === 'rsu' ? (annualVest * fmv) * (taxRate / 100) : 0
  return { totalValue: Math.round(totalValue), exerciseCost: Math.round(exerciseCost), ordinaryIncome: Math.round(ordinaryIncome), amtPreference: Math.round(amtPreference), taxOnExercise: Math.round(taxOnExercise), netValue: Math.round(netValue), annualVest: Math.round(annualVest), annualTax: Math.round(annualTax), strategy: type === 'iso' ? 'Consider early exercise + 83(b) election to start capital gains clock' : type === 'nso' ? 'Exercise when spread is small to minimize ordinary income' : 'Diversify RSUs upon vest — concentration risk is real' }
}

export function calculateNetInvestmentIncomeTax(wages: number, investmentIncome: number, filingStatus: 'single' | 'married') {
  const threshold = filingStatus === 'married' ? 250000 : 200000
  const totalIncome = wages + investmentIncome
  const niitBase = Math.min(investmentIncome, Math.max(0, totalIncome - threshold))
  const niitOwed = niitBase * 0.038
  const strategies = []
  if (niitOwed > 0) {
    strategies.push('Max 401k/IRA contributions to reduce MAGI')
    strategies.push('Harvest tax losses to offset investment gains')
    strategies.push('Invest in municipal bonds (exempt from NIIT)')
    strategies.push('Consider Opportunity Zone investments for deferral')
  }
  return { totalIncome: Math.round(totalIncome), niitBase: Math.round(niitBase), niitOwed: Math.round(niitOwed), threshold, strategies }
}

export function calculateCryptoTax(saleAmount: number, costBasis: number, yearsHeld: number, otherIncome: number, filingStatus: 'single' | 'married') {
  const gain = saleAmount - costBasis
  const isLongTerm = yearsHeld >= 1
  const totalIncome = otherIncome + Math.max(0, gain)
  const ltThresholds = filingStatus === 'married' ? [96700, 600050] : [48350, 533400]
  const ltRate = totalIncome > ltThresholds[1] ? 0.20 : totalIncome > ltThresholds[0] ? 0.15 : 0
  const stRate = totalIncome < 47150 ? 0.10 : totalIncome < 100525 ? 0.12 : totalIncome < 191950 ? 0.22 : totalIncome < 243725 ? 0.24 : 0.32
  const taxRate = isLongTerm ? ltRate : stRate
  const federalTax = gain > 0 ? gain * taxRate : 0
  const niit = totalIncome > (filingStatus === 'married' ? 250000 : 200000) && isLongTerm ? gain * 0.038 : 0
  const taxSavingsByWaiting = gain > 0 && !isLongTerm ? gain * (stRate - ltRate) : 0
  return { gain: Math.round(gain), isLongTerm, taxRate: (taxRate * 100).toFixed(0), federalTax: Math.round(federalTax), niit: Math.round(niit), totalTax: Math.round(federalTax + niit), netProceeds: Math.round(saleAmount - federalTax - niit), taxSavingsByWaiting: Math.round(taxSavingsByWaiting), washSaleNote: 'Crypto is NOT subject to wash sale rules (unlike stocks)' }
}

export function calculateCollegeSavings529(childAge: number, collegeStartAge: number, currentBalance: number, monthlyContrib: number, annualCost: number, costInflation: number, returnRate: number) {
  const years = collegeStartAge - childAge
  let balance = currentBalance
  for (let i = 0; i < years; i++) {
    balance = balance * (1 + returnRate / 100) + monthlyContrib * 12
  }
  const totalCost = [0,1,2,3].reduce((sum, yr) => sum + annualCost * Math.pow(1 + costInflation / 100, years + yr), 0)
  const gap = Math.max(0, totalCost - balance)
  const requiredMonthly = gap > 0 ? gap / ((Math.pow(1 + returnRate / 100 / 12, years * 12) - 1) / (returnRate / 100 / 12)) : 0
  const stateDeduction = Math.min(monthlyContrib * 12, 10000) * 0.05
  const yearData = Array.from({ length: years + 1 }, (_, i) => {
    let bal = currentBalance
    for (let j = 0; j < i; j++) bal = bal * (1 + returnRate / 100) + monthlyContrib * 12
    return { year: i, age: childAge + i, balance: Math.round(bal) }
  })
  return { projectedBalance: Math.round(balance), totalCollegeCost: Math.round(totalCost), gap: Math.round(gap), coveragePercent: Math.round((balance / totalCost) * 100), requiredMonthly: Math.round(requiredMonthly), stateDeductionEst: Math.round(stateDeduction), yearData }
}

export function calculateAnnualBonus(baseSalary: number, bonusPercent: number, filingStatus: 'single' | 'married', ytdIncome: number, state: string = 'CA') {
  const bonus = baseSalary * (bonusPercent / 100)
  const federalWithholding = bonus <= 1000000 ? bonus * 0.22 : (1000000 * 0.22) + (bonus - 1000000) * 0.37
  const stateRates: Record<string, number> = { CA: 0.1023, NY: 0.109, TX: 0, FL: 0, WA: 0, IL: 0.0495, GA: 0.055, NC: 0.0499, MA: 0.09, NJ: 0.1075 }
  const stateRate = stateRates[state] || 0.05
  const stateWithholding = bonus * stateRate
  const fica = Math.min(bonus, Math.max(0, 176100 - ytdIncome)) * 0.0765
  const totalWithholding = federalWithholding + stateWithholding + fica
  const netBonus = bonus - totalWithholding
  return { bonus: Math.round(bonus), federalWithholding: Math.round(federalWithholding), stateWithholding: Math.round(stateWithholding), fica: Math.round(fica), totalWithholding: Math.round(totalWithholding), netBonus: Math.round(netBonus), effectiveRate: Math.round((totalWithholding / bonus) * 100), strategyTip: ytdIncome + bonus > 500000 ? 'Consider deferring to next year if possible — may be in lower bracket' : 'Max 401k before year-end to reduce taxable income' }
}

// ─── BATCH 2: 25 MORE USA FINANCE CALCULATORS ────────────────────────────────

export function calculatePayrollTax(grossWages: number, filingStatus: 'single'|'married', allowances: number, state: string, payPeriod: 'weekly'|'biweekly'|'semimonthly'|'monthly') {
  const periods: Record<string,number> = { weekly:52, biweekly:26, semimonthly:24, monthly:12 }
  const n = periods[payPeriod]
  const annual = grossWages * n
  // Federal income tax withholding (2026 tables simplified)
  const stdDed = filingStatus==='married' ? 30000 : 15000
  const taxable = Math.max(0, annual - stdDed - allowances*5300)
  const brackets = filingStatus==='married'
    ? [[23200,0.10],[94300,0.12],[201050,0.22],[383900,0.24],[487450,0.32],[731200,0.35],[Infinity,0.37]]
    : [[11600,0.10],[47150,0.12],[100525,0.22],[191950,0.24],[243725,0.32],[609350,0.35],[Infinity,0.37]]
  let fedTax=0, rem=taxable
  let prev=0
  for(const [limit,rate] of brackets){
    const slice=Math.min(rem, Number(limit)-prev)
    fedTax+=slice*Number(rate)
    rem-=slice; prev=Number(limit)
    if(rem<=0) break
  }
  const ssTax = Math.min(grossWages*n, 176100)*0.062/n
  const medicareTax = grossWages*0.0145
  const addlMedicare = Math.max(0, grossWages*n - 200000)*0.009/n
  const stateRates:Record<string,number>={CA:0.093,NY:0.0685,TX:0,FL:0,WA:0,IL:0.0495,GA:0.055,NC:0.0499,MA:0.05,NJ:0.0637,OH:0.04,PA:0.0307,MI:0.0425,VA:0.0575,CO:0.044}
  const stateTax = grossWages*(stateRates[state]||0.05)
  const totalWithholding = fedTax/n + ssTax + medicareTax + addlMedicare + stateTax
  const netPay = grossWages - totalWithholding
  return { grossWages, fedWithholding:Math.round(fedTax/n*100)/100, ssTax:Math.round(ssTax*100)/100, medicareTax:Math.round((medicareTax+addlMedicare)*100)/100, stateTax:Math.round(stateTax*100)/100, totalWithholding:Math.round(totalWithholding*100)/100, netPay:Math.round(netPay*100)/100, effectiveRate:Math.round((totalWithholding/grossWages)*1000)/10 }
}

export function calculateWealthTransfer(assets: number, annualGrowth: number, yearsToTransfer: number, annualGifts: number, trustType: 'grat'|'slat'|'ilit'|'direct') {
  const futureValue = assets * Math.pow(1+annualGrowth/100, yearsToTransfer)
  const giftedOutside = annualGifts * yearsToTransfer
  const inEstate = futureValue - giftedOutside
  const exemption2026 = 13610000
  const taxableEstate = Math.max(0, inEstate - exemption2026)
  const estateTax = taxableEstate * 0.40
  const withTrust = trustType!=='direct' ? inEstate * 0.35 : inEstate // trust strategies ~35% savings
  const trustSavings = estateTax - withTrust*0.40
  return { futureValue:Math.round(futureValue), inEstate:Math.round(inEstate), taxableEstate:Math.round(taxableEstate), estateTax:Math.round(estateTax), giftedOutside:Math.round(giftedOutside), trustSavings:Math.round(Math.max(0,trustSavings)), netToHeirs:Math.round(inEstate-estateTax), netWithTrust:Math.round(inEstate-Math.max(0,withTrust*0.40)) }
}

export function calculatePayOffStudentLoanVsInvest(loanBalance: number, loanRate: number, monthlyExtra: number, investReturn: number, years: number) {
  // Option A: pay off loan faster
  const monthlyRateL = loanRate/100/12
  const minPayment = loanBalance*monthlyRateL/(1-Math.pow(1+monthlyRateL,-years*12))
  const totalPayment = monthlyExtra + minPayment
  // Find payoff months with extra
  let balA=loanBalance, monthsA=0, interestA=0
  while(balA>0 && monthsA<years*12){
    const int=balA*monthlyRateL; interestA+=int
    balA=Math.max(0,balA+int-totalPayment); monthsA++
  }
  const savedInterest = (loanBalance*monthlyRateL/(1-Math.pow(1+monthlyRateL,-years*12)))*years*12 - loanBalance - interestA
  // Option B: invest extra, pay minimum
  const monthlyRateI = investReturn/100/12
  const investedValue = monthlyExtra*((Math.pow(1+monthlyRateI,years*12)-1)/monthlyRateI)
  const loanInterestPaid = minPayment*years*12-loanBalance
  const netInvestBenefit = investedValue - loanInterestPaid
  return { minPayment:Math.round(minPayment), payoffMonthsWithExtra:monthsA, interestSavedByPaying:Math.round(Math.max(0,savedInterest)), investedValueInstead:Math.round(investedValue), netInvestBenefit:Math.round(netInvestBenefit), betterOption: investReturn > loanRate ? 'invest' : 'payoff', difference:Math.round(Math.abs(investedValue-savedInterest)) }
}

export function calculateSocialSecuritySpouse(worker1Benefit: number, worker2Benefit: number, worker1Age: number, worker2Age: number, worker1ClaimAge: number, worker2ClaimAge: number) {
  const FRA=67
  const adj=(claimAge:number,fra:number)=>{
    if(claimAge<fra){ const m=(fra-claimAge)*12; return 1-(m<=36?m*5/9/100:36*5/9/100+(m-36)*5/12/100) }
    return 1+(claimAge-fra)*12*(8/12/100)
  }
  const w1Adj=worker1Benefit*adj(worker1ClaimAge,FRA)
  const w2Adj=worker2Benefit*adj(worker2ClaimAge,FRA)
  // Spousal benefit: 50% of higher earner's PIA if own benefit is less
  const spousalBenefit=Math.max(w2Adj, w1Adj*0.5)
  const combinedMonthly=w1Adj+spousalBenefit
  const combinedAnnual=combinedMonthly*12
  const survivorBenefit=Math.max(w1Adj,w2Adj) // survivor gets higher of two
  return { worker1Monthly:Math.round(w1Adj), worker2Monthly:Math.round(w2Adj), spousalBoost:Math.round(Math.max(0,spousalBenefit-w2Adj)), combinedMonthly:Math.round(combinedMonthly), combinedAnnual:Math.round(combinedAnnual), survivorBenefit:Math.round(survivorBenefit), lifetime30yr:Math.round(combinedAnnual*30) }
}

export function calculateHomeEquityLoan(homeValue:number, mortgageBalance:number, loanAmount:number, apr:number, termYears:number) {
  const equity=homeValue-mortgageBalance
  const cltv=(mortgageBalance+loanAmount)/homeValue*100
  const monthlyRate=apr/100/12
  const months=termYears*12
  const payment=loanAmount*(monthlyRate*Math.pow(1+monthlyRate,months))/(Math.pow(1+monthlyRate,months)-1)
  const totalPaid=payment*months
  const totalInterest=totalPaid-loanAmount
  const yearData=Array.from({length:termYears+1},(_,i)=>({year:i,balance:Math.round(loanAmount*Math.pow(1+monthlyRate,i*12)-(payment*((Math.pow(1+monthlyRate,i*12)-1)/monthlyRate)))}))
  return { equity:Math.round(equity), cltv:Math.round(cltv*10)/10, payment:Math.round(payment*100)/100, totalPaid:Math.round(totalPaid), totalInterest:Math.round(totalInterest), maxLoan:Math.round(Math.max(0,homeValue*0.85-mortgageBalance)), approved:cltv<=85, yearData }
}

export function calculateRealEstateInvestment(purchasePrice:number, downPercent:number, mortgageRate:number, mortgageTerm:number, monthlyRent:number, vacancyRate:number, expenses:number, appreciationRate:number, holdYears:number) {
  const down=purchasePrice*downPercent/100
  const loan=purchasePrice-down
  const monthlyRate=mortgageRate/100/12
  const months=mortgageTerm*12
  const mortgage=loan*(monthlyRate*Math.pow(1+monthlyRate,months))/(Math.pow(1+monthlyRate,months)-1)
  const effectiveRent=monthlyRent*(1-vacancyRate/100)
  const monthlyExpenses=purchasePrice*expenses/100/12
  const noi=(effectiveRent-monthlyExpenses)*12
  const cashFlow=(effectiveRent-monthlyExpenses-mortgage)*12
  const capRate=noi/purchasePrice*100
  const cashOnCash=cashFlow/down*100
  const salePrice=purchasePrice*Math.pow(1+appreciationRate/100,holdYears)
  const remainingBalance=loan*Math.pow(1+monthlyRate,holdYears*12)-mortgage*((Math.pow(1+monthlyRate,holdYears*12)-1)/monthlyRate)
  const equity=salePrice-Math.max(0,remainingBalance)
  const totalReturn=(equity-down+cashFlow*holdYears)/down*100
  return { downPayment:Math.round(down), mortgage:Math.round(mortgage*100)/100, effectiveRent:Math.round(effectiveRent), monthlyExpenses:Math.round(monthlyExpenses), noi:Math.round(noi), cashFlow:Math.round(cashFlow), capRate:Math.round(capRate*100)/100, cashOnCash:Math.round(cashOnCash*100)/100, salePrice:Math.round(salePrice), equity:Math.round(equity), totalReturn:Math.round(totalReturn*100)/100 }
}

export function calculateTaxLossHarvesting(gains:number, lossesToHarvest:number, taxRate:number, reinvestReturn:number, years:number) {
  const taxSavingsNow=Math.min(gains,lossesToHarvest)*taxRate/100
  const reinvestedGrowth=taxSavingsNow*Math.pow(1+reinvestReturn/100,years)
  const deferredTaxBill=reinvestedGrowth*0.15 // LT cap gains on growth
  const netBenefit=reinvestedGrowth-deferredTaxBill-taxSavingsNow
  const breakEvenYears=Math.log(taxSavingsNow/(taxSavingsNow-(taxSavingsNow*0.15)))/Math.log(1+reinvestReturn/100)
  return { taxSavingsNow:Math.round(taxSavingsNow), reinvestedGrowth:Math.round(reinvestedGrowth), deferredTaxBill:Math.round(deferredTaxBill), netBenefit:Math.round(netBenefit), worthIt:netBenefit>0, breakEvenYears:Math.round(breakEvenYears*10)/10, annualizedBenefit:Math.round(netBenefit/years) }
}

export function calculateDividendReinvestment(initialShares:number, pricePerShare:number, annualDividend:number, dividendGrowth:number, priceGrowth:number, years:number, drip:boolean) {
  let shares=initialShares, price=pricePerShare, totalDividends=0
  const yearData=[]
  for(let i=0;i<=years;i++){
    const divPerShare=annualDividend*Math.pow(1+dividendGrowth/100,i)
    const annDiv=shares*divPerShare
    totalDividends+=annDiv
    if(drip && i<years) shares+=annDiv/price
    price*=(1+priceGrowth/100)
    yearData.push({year:i,shares:Math.round(shares*100)/100,price:Math.round(price*100)/100,value:Math.round(shares*price),dividends:Math.round(annDiv)})
  }
  const finalValue=shares*price
  const withoutDrip=initialShares*price
  const dripBenefit=finalValue-withoutDrip
  return { finalValue:Math.round(finalValue), withoutDrip:Math.round(withoutDrip), dripBenefit:Math.round(dripBenefit), totalDividends:Math.round(totalDividends), finalShares:Math.round(shares*100)/100, totalReturn:Math.round((finalValue/(initialShares*pricePerShare)-1)*10000)/100, yearData }
}

export function calculateLifeInsuranceNeeds(annualIncome:number, yearsToReplace:number, existingDebts:number, finalExpenses:number, existingCoverage:number, spouseIncome:number, childrenCount:number, investReturn:number) {
  const pvFactor=(1-Math.pow(1+investReturn/100,-yearsToReplace))/(investReturn/100)
  const incomeReplacement=(annualIncome-spouseIncome)*pvFactor
  const childCare=childrenCount*15000*pvFactor
  const totalNeed=incomeReplacement+existingDebts+finalExpenses+childCare
  const coverageNeeded=Math.max(0,totalNeed-existingCoverage)
  const term20Premium=Math.round(coverageNeeded/1000*0.18) // rough $0.18/$1000 for 40yr
  const wholePremium=Math.round(coverageNeeded/1000*3.50) // rough $3.50/$1000
  return { incomeReplacement:Math.round(incomeReplacement), childCare:Math.round(childCare), totalNeed:Math.round(totalNeed), coverageNeeded:Math.round(coverageNeeded), term20Monthly:term20Premium, wholeLifeMonthly:wholePremium, termSavings:Math.round((wholePremium-term20Premium)*12*20), recommendation: coverageNeeded>500000?'Consider a 20-year level term policy':'20-year term or permanent life based on your estate goals' }
}

export function calculateRothConversionLadder(iraBalance:number, currentAge:number, retirementAge:number, currentTaxRate:number, retirementTaxRate:number, annualConversion:number, returnRate:number) {
  const years=retirementAge-currentAge
  const taxOnConversion=annualConversion*currentTaxRate/100
  const conversions=Math.min(years,Math.ceil(iraBalance/annualConversion))
  const totalConverted=Math.min(conversions*annualConversion,iraBalance)
  const taxPaidNow=totalConverted*currentTaxRate/100
  const remainingPretax=iraBalance-totalConverted
  const rothedGrowth=totalConverted*Math.pow(1+returnRate/100,years)
  const pretaxGrowth=remainingPretax*Math.pow(1+returnRate/100,years)
  const taxIfNeverConverted=iraBalance*Math.pow(1+returnRate/100,years)*retirementTaxRate/100
  const taxWithConversion=taxPaidNow+pretaxGrowth*retirementTaxRate/100
  const savings=taxIfNeverConverted-taxWithConversion
  const yearData=Array.from({length:Math.min(years+1,31)},(_,i)=>({year:i,age:currentAge+i,rothBalance:Math.round(Math.min(i*annualConversion,totalConverted)*Math.pow(1+returnRate/100,i)),tradBalance:Math.round((iraBalance-Math.min(i*annualConversion,totalConverted))*Math.pow(1+returnRate/100,i))}))
  return { totalConverted:Math.round(totalConverted), taxPaidNow:Math.round(taxPaidNow), conversionYears:conversions, rothGrowth:Math.round(rothedGrowth), pretaxGrowth:Math.round(pretaxGrowth), taxSavings:Math.round(savings), worthIt:savings>0, yearData }
}

export function calculateInflationImpact(currentAmount:number, inflationRate:number, years:number, investmentReturn:number) {
  const futureValue=currentAmount*Math.pow(1+inflationRate/100,years)
  const purchasingPowerLoss=futureValue-currentAmount
  const investedValue=currentAmount*Math.pow(1+investmentReturn/100,years)
  const realReturn=((1+investmentReturn/100)/(1+inflationRate/100)-1)*100
  const realValue=currentAmount*Math.pow(1+realReturn/100,years)
  const yearData=Array.from({length:Math.min(years+1,51)},(_,i)=>({year:i,nominal:Math.round(currentAmount*Math.pow(1+investmentReturn/100,i)),real:Math.round(currentAmount*Math.pow(1+realReturn/100,i)),inflationCost:Math.round(currentAmount*Math.pow(1+inflationRate/100,i))}))
  return { futureValue:Math.round(futureValue), purchasingPowerLoss:Math.round(purchasingPowerLoss), investedValue:Math.round(investedValue), realReturn:Math.round(realReturn*100)/100, realValue:Math.round(realValue), yearData }
}

export function calculateRentIncrease(currentRent:number, leaseMonths:number, annualIncrease:number, marketRent:number, moveOutCosts:number, newPlaceRent:number) {
  const newRent=currentRent*(1+annualIncrease/100)
  const increaseAmount=newRent-currentRent
  const annualExtra=increaseAmount*12
  const vsMarket=newRent-marketRent
  const monthsToBreakEven=moveOutCosts/(Math.abs(newRent-newPlaceRent))
  const yearlyCostToStay=newRent*12
  const yearlyCostToMove=newPlaceRent*12+moveOutCosts
  const betterOption=yearlyCostToStay<yearlyCostToMove?'stay':'move'
  return { currentRent, newRent:Math.round(newRent*100)/100, increaseAmount:Math.round(increaseAmount*100)/100, annualExtra:Math.round(annualExtra), vsMarket:Math.round(vsMarket*100)/100, belowMarket:vsMarket<0, monthsToBreakEven:Math.round(monthsToBreakEven), yearlyCostToStay:Math.round(yearlyCostToStay), yearlyCostToMove:Math.round(yearlyCostToMove), betterOption }
}

export function calculateMortgagePoints(loanAmount:number, interestRate:number, loanTermYears:number, pointsCost:number, pointsCount:number, rateReduction:number) {
  const totalPointsCost=loanAmount*pointsCount/100
  const origRate=interestRate/100/12
  const newRate=(interestRate-rateReduction)/100/12
  const months=loanTermYears*12
  const origPayment=loanAmount*(origRate*Math.pow(1+origRate,months))/(Math.pow(1+origRate,months)-1)
  const newPayment=loanAmount*(newRate*Math.pow(1+newRate,months))/(Math.pow(1+newRate,months)-1)
  const monthlySavings=origPayment-newPayment
  const breakEvenMonths=Math.round(totalPointsCost/monthlySavings)
  const lifetimeSavings=monthlySavings*months-totalPointsCost
  return { totalPointsCost:Math.round(totalPointsCost), origPayment:Math.round(origPayment*100)/100, newPayment:Math.round(newPayment*100)/100, monthlySavings:Math.round(monthlySavings*100)/100, breakEvenMonths, breakEvenYears:Math.round(breakEvenMonths/12*10)/10, lifetimeSavings:Math.round(lifetimeSavings), worthIt:breakEvenMonths<loanTermYears*12*0.5 }
}

export function calculateSalaryNegotiation(currentSalary:number, offerSalary:number, bonusPercent:number, equityValue:number, benefits401k:number, healthBenefitValue:number, pto:number, costOfLivingDiff:number) {
  const totalCurrent=currentSalary*(1+bonusPercent/100)+benefits401k+healthBenefitValue+pto*currentSalary/260
  const totalOffer=offerSalary*(1+bonusPercent/100)+equityValue/4+offerSalary*benefits401k/100+healthBenefitValue+pto*offerSalary/260
  const adjustedOffer=totalOffer*(1-costOfLivingDiff/100)
  const difference=adjustedOffer-totalCurrent
  const percentIncrease=(adjustedOffer/totalCurrent-1)*100
  const counterOffer=Math.round(currentSalary*(1+Math.max(0.10,percentIncrease/100+0.05)))
  return { totalCurrent:Math.round(totalCurrent), totalOffer:Math.round(totalOffer), adjustedOffer:Math.round(adjustedOffer), difference:Math.round(difference), percentIncrease:Math.round(percentIncrease*10)/10, worthTaking:difference>0, counterOffer, tenYearDifference:Math.round(difference*12.58) /* 10yr compound */ }
}

export function calculateChildTaxCredit(numChildren:number, childrenUnder6:number, agi:number, filingStatus:'single'|'married', earned:number) {
  const maxCredit2026=2000*numChildren
  const phaseoutThreshold=filingStatus==='married'?400000:200000
  const phaseout=Math.max(0,Math.ceil((agi-phaseoutThreshold)/1000))*50*numChildren
  const creditAfterPhaseout=Math.max(0,maxCredit2026-phaseout)
  // Refundable portion (ACTC) = 15% of earned income above $2500, up to $1700/child
  const refundable=Math.min(Math.max(0,(earned-2500)*0.15), 1700*numChildren)
  const nonRefundable=Math.max(0,creditAfterPhaseout-refundable)
  // Child & Dependent Care Credit (separate)
  const careExpenses=Math.min(numChildren>=2?6000:3000, numChildren*4000)
  const careCredit=careExpenses*0.20
  return { maxCredit:maxCredit2026, phaseoutReduction:Math.round(phaseout), netCredit:Math.round(creditAfterPhaseout), refundablePortion:Math.round(refundable), nonRefundablePortion:Math.round(nonRefundable), childCareCredit:Math.round(careCredit), totalCredits:Math.round(creditAfterPhaseout+careCredit), abovePhaseout:agi>phaseoutThreshold }
}

export function calculateAnnuityIncome(premium:number, annuityType:'immediate'|'deferred'|'variable', age:number, deferralYears:number, annualReturn:number, payoutPeriod:'lifetime'|'period-certain', periodYears:number) {
  const accumulatedValue=annuityType==='deferred'?premium*Math.pow(1+annualReturn/100,deferralYears):premium
  const annuitizationAge=annuityType==='deferred'?age+deferralYears:age
  // Payout rates based on age and type
  const payoutRate=annuityType==='variable'?0.05:payoutPeriod==='lifetime'?(annuitizationAge<65?0.055:annuitizationAge<70?0.061:annuitizationAge<75?0.068:0.077):1/(periodYears*0.95)
  const monthlyIncome=accumulatedValue*payoutRate/12
  const taxablePortion=annuityType==='deferred'?(accumulatedValue-premium)/accumulatedValue:0
  const taxOnIncome=monthlyIncome*taxablePortion*0.24
  const netMonthly=monthlyIncome-taxOnIncome
  return { accumulatedValue:Math.round(accumulatedValue), monthlyIncome:Math.round(monthlyIncome*100)/100, netMonthly:Math.round(netMonthly*100)/100, annualIncome:Math.round(monthlyIncome*12), taxablePercent:Math.round(taxablePortion*100), breakEvenYears:Math.round(premium/(monthlyIncome*12)), lifetimeIncome:Math.round(monthlyIncome*12*Math.max(periodYears,90-annuitizationAge)) }
}

export function calculateEarlyRetirement(currentAge:number, targetRetirementAge:number, currentSavings:number, annualSavings:number, annualExpenses:number, investReturn:number, inflationRate:number) {
  const yearsToRetirement=targetRetirementAge-currentAge
  const realReturn=((1+investReturn/100)/(1+inflationRate/100)-1)*100
  // Accumulation phase
  let portfolio=currentSavings
  const yearData=[]
  for(let i=0;i<=yearsToRetirement;i++){
    portfolio=portfolio*(1+investReturn/100)+(i<yearsToRetirement?annualSavings:0)
    yearData.push({year:i,age:currentAge+i,portfolio:Math.round(portfolio)})
  }
  // Safe withdrawal rate (4% rule adjusted for long horizon)
  const safeWithdrawalRate=targetRetirementAge<50?0.035:targetRetirementAge<55?0.038:0.04
  const sustainableIncome=portfolio*safeWithdrawalRate
  const inflationAdjExpenses=annualExpenses*Math.pow(1+inflationRate/100,yearsToRetirement)
  const fiNumber=inflationAdjExpenses/safeWithdrawalRate
  const shortfall=Math.max(0,fiNumber-portfolio)
  const yearsOfFunding=portfolio>0?Math.log(1-(portfolio*realReturn/100)/inflationAdjExpenses)/Math.log(1+realReturn/100)*-1:0
  return { portfolio:Math.round(portfolio), fiNumber:Math.round(fiNumber), sustainableIncome:Math.round(sustainableIncome), inflationAdjExpenses:Math.round(inflationAdjExpenses), shortfall:Math.round(shortfall), onTrack:portfolio>=fiNumber, yearsOfFunding:Math.round(yearsOfFunding), safeWithdrawalRate:safeWithdrawalRate*100, yearData }
}

export function calculateHealthSavingsAccountHDHP(hdhdpPremium:number, traditionalPremium:number, hdhpDeductible:number, tradDeductible:number, expectedMedical:number, hsaContrib:number, taxRate:number) {
  const hdhdpTotalPremium=hdhdpPremium*12
  const tradTotalPremium=traditionalPremium*12
  const hdhdpOOP=Math.min(expectedMedical,hdhpDeductible)+Math.max(0,expectedMedical-hdhpDeductible)*0.20
  const tradOOP=Math.min(expectedMedical,tradDeductible)+Math.max(0,expectedMedical-tradDeductible)*0.20
  const hsaTaxSavings=hsaContrib*(taxRate+7.65)/100
  const hdhdpTotalCost=hdhdpTotalPremium+hdhdpOOP-hsaTaxSavings
  const tradTotalCost=tradTotalPremium+tradOOP
  const hdhpSavings=tradTotalCost-hdhdpTotalCost
  return { hdhdpTotalPremium:Math.round(hdhdpTotalPremium), tradTotalPremium:Math.round(tradTotalPremium), hdhdpOOP:Math.round(hdhdpOOP), tradOOP:Math.round(tradOOP), hsaTaxSavings:Math.round(hsaTaxSavings), hdhdpTotalCost:Math.round(hdhdpTotalCost), tradTotalCost:Math.round(tradTotalCost), hdhpSavings:Math.round(hdhpSavings), betterPlan:hdhpSavings>0?'HDHP + HSA':'Traditional', recommendation:hdhpSavings>500?'HDHP clearly better — significant savings':'Close call — consider your expected medical needs' }
}

export function calculateCostOfDebt(debts:{name:string,balance:number,rate:number,minPayment:number}[], extraPayment:number) {
  const totalBalance=debts.reduce((s,d)=>s+d.balance,0)
  const weightedRate=debts.reduce((s,d)=>s+d.rate*d.balance,0)/totalBalance
  const monthlyInterest=debts.reduce((s,d)=>s+d.balance*d.rate/100/12,0)
  const annualCost=monthlyInterest*12
  const totalMinPayments=debts.reduce((s,d)=>s+d.minPayment,0)
  // Avalanche: pay off highest rate first
  const sorted=[...debts].sort((a,b)=>b.rate-a.rate)
  let monthsAvalanche=0, interestAvalanche=0
  const balances=sorted.map(d=>d.balance)
  const payments=sorted.map(d=>d.minPayment)
  let extra=extraPayment
  while(balances.some(b=>b>0)&&monthsAvalanche<600){
    monthsAvalanche++
    for(let i=0;i<balances.length;i++){
      if(balances[i]<=0) continue
      const int=balances[i]*sorted[i].rate/100/12
      interestAvalanche+=int
      const pay=i===0?payments[i]+extra:payments[i]
      balances[i]=Math.max(0,balances[i]+int-pay)
      if(balances[i]===0&&i<balances.length-1) extra+=payments[i]
    }
  }
  return { totalBalance:Math.round(totalBalance), weightedRate:Math.round(weightedRate*100)/100, monthlyInterest:Math.round(monthlyInterest), annualCost:Math.round(annualCost), totalMinPayments:Math.round(totalMinPayments), payoffMonthsAvalanche:monthsAvalanche, interestPaidAvalanche:Math.round(interestAvalanche), interestSavedByExtra:Math.round(annualCost*(monthsAvalanche/12)-interestAvalanche) }
}

export function calculateNetSalaryAfterTax(grossSalary:number, state:string, filingStatus:'single'|'married', retirement401k:number, hsaContrib:number, fsa:number) {
  const stateRates:Record<string,number>={CA:0.093,NY:0.0685,TX:0,FL:0,WA:0,IL:0.0495,GA:0.055,NC:0.0499,MA:0.05,NJ:0.0637,OH:0.04,PA:0.0307,MI:0.0425,VA:0.0575,CO:0.044,AZ:0.025,NV:0,TN:0,WY:0,SD:0,MT:0.059,ID:0.058,OR:0.099,MN:0.0985}
  const preTaxDeductions=retirement401k+hsaContrib+fsa
  const federalTaxable=grossSalary-preTaxDeductions-(filingStatus==='married'?30000:15000)
  const brackets=filingStatus==='married'?[[23200,0.10],[94300,0.12],[201050,0.22],[383900,0.24],[487450,0.32],[731200,0.35],[Infinity,0.37]]:[[11600,0.10],[47150,0.12],[100525,0.22],[191950,0.24],[243725,0.32],[609350,0.35],[Infinity,0.37]]
  let fedTax=0,rem=Math.max(0,federalTaxable),prev=0
  for(const[limit,rate]of brackets){const s=Math.min(rem,Number(limit)-prev);fedTax+=s*Number(rate);rem-=s;prev=Number(limit);if(rem<=0)break}
  const fica=Math.min(grossSalary,176100)*0.0765+Math.max(0,grossSalary-200000)*0.009
  const stateTax=grossSalary*(stateRates[state]||0.05)
  const totalTax=fedTax+fica+stateTax
  const netSalary=grossSalary-totalTax-preTaxDeductions
  return { grossSalary, preTaxDeductions:Math.round(preTaxDeductions), federalTax:Math.round(fedTax), fica:Math.round(fica), stateTax:Math.round(stateTax), totalTax:Math.round(totalTax), netSalary:Math.round(netSalary), effectiveRate:Math.round(totalTax/grossSalary*1000)/10, monthlyTakeHome:Math.round(netSalary/12) }
}

export function calculateBusinessValuation(annualRevenue:number, ebitda:number, industryMultiple:number, growthRate:number, debtOutstanding:number, cash:number, valuationMethod:'ebitda'|'revenue'|'dcf') {
  const ebitdaValue=ebitda*industryMultiple
  const revenueValue=annualRevenue*(industryMultiple*0.3)
  const dcfValue=ebitda*((1-Math.pow(1+growthRate/100,-10))/(growthRate/100))
  const primaryValue=valuationMethod==='ebitda'?ebitdaValue:valuationMethod==='revenue'?revenueValue:dcfValue
  const enterpriseValue=primaryValue
  const equityValue=enterpriseValue-debtOutstanding+cash
  const priceToEarnings=equityValue/Math.max(1,ebitda*0.6)
  return { ebitdaValue:Math.round(ebitdaValue), revenueValue:Math.round(revenueValue), dcfValue:Math.round(dcfValue), enterpriseValue:Math.round(enterpriseValue), equityValue:Math.round(equityValue), priceToEarnings:Math.round(priceToEarnings*100)/100, sellerProceeds:Math.round(equityValue*0.85) /* after fees */ }
}

export function calculateFIRENumber(annualExpenses:number, currentAge:number, retirementAge:number, currentPortfolio:number, annualSavings:number, expectedReturn:number, safeWithdrawal:number, inflationRate:number) {
  const yearsToFIRE=retirementAge-currentAge
  const inflationAdjExpenses=annualExpenses*Math.pow(1+inflationRate/100,yearsToFIRE)
  const fireNumber=inflationAdjExpenses/(safeWithdrawal/100)
  let portfolio=currentPortfolio
  const yearData=[]
  for(let i=0;i<=yearsToFIRE;i++){
    portfolio=portfolio*(1+expectedReturn/100)+annualSavings
    const progress=Math.min(100,Math.round(portfolio/fireNumber*100))
    yearData.push({year:i,age:currentAge+i,portfolio:Math.round(portfolio),progress,fireNumber:Math.round(fireNumber)})
    if(portfolio>=fireNumber&&yearData.length===i+1) yearData[i].fireReached=true
  }
  const monthlyToFIRE=Math.max(0,(fireNumber-currentPortfolio)/((Math.pow(1+expectedReturn/100/12,yearsToFIRE*12)-1)/(expectedReturn/100/12)))
  return { fireNumber:Math.round(fireNumber), currentPortfolio, shortfall:Math.round(Math.max(0,fireNumber-currentPortfolio)), onTrack:portfolio>=fireNumber, inflationAdjExpenses:Math.round(inflationAdjExpenses), projectedPortfolio:Math.round(portfolio), coveragePercent:Math.round(portfolio/fireNumber*100), monthlyToFIRE:Math.round(monthlyToFIRE/12), yearData }
}

export function calculateEstatePlanning529(contributions:number[], ages:number[], growthRate:number, taxRate:number) {
  const yearData=Array.from({length:31},(_,i)=>({year:i,value:Math.round(contributions.reduce((s,c)=>s,0)*Math.pow(1+growthRate/100,i))}))
  const totalContrib=contributions.reduce((s,c)=>s+c,0)
  const value30=totalContrib*Math.pow(1+growthRate/100,30)
  const taxSavings=totalContrib*taxRate/100
  const rothRolloverLimit=35000 // per SECURE 2.0
  return { totalContrib:Math.round(totalContrib), value30:Math.round(value30), taxSavings:Math.round(taxSavings), rothRolloverLimit, yearData }
}

export function calculatePropertyTax(homeValue:number, state:string, county:string, exemptions:number) {
  const rates:Record<string,number>={CA:0.0073,TX:0.0181,FL:0.0086,NY:0.0151,IL:0.0227,NJ:0.0247,PA:0.0153,OH:0.0157,GA:0.0092,NC:0.0085,MI:0.0143,VA:0.0082,WA:0.0094,AZ:0.0063,CO:0.0051,MA:0.0118,TN:0.0064,MO:0.0119,WI:0.0162,MN:0.0111}
  const rate=rates[state]||0.0110
  const assessedValue=homeValue*0.85 // typical assessment ratio
  const taxableValue=Math.max(0,assessedValue-exemptions)
  const annualTax=taxableValue*rate
  const monthlyEscrow=annualTax/12
  const effectiveRate=annualTax/homeValue*100
  // Appeal potential
  const appealSavings=annualTax*0.15
  return { assessedValue:Math.round(assessedValue), taxableValue:Math.round(taxableValue), annualTax:Math.round(annualTax), monthlyEscrow:Math.round(monthlyEscrow*100)/100, effectiveRate:Math.round(effectiveRate*1000)/1000, state, homesteadExemption:exemptions, appealPotentialSavings:Math.round(appealSavings), appealWorthy:homeValue>300000 }
}

export function calculateRetirementWithdrawal(portfolioBalance:number, annualWithdrawal:number, investReturn:number, inflationRate:number, startAge:number) {
  const realReturn=((1+investReturn/100)/(1+inflationRate/100)-1)*100
  let balance=portfolioBalance
  const yearData=[]
  let depleted=false
  for(let i=0;i<=40;i++){
    const withdrawal=annualWithdrawal*Math.pow(1+inflationRate/100,i)
    balance=balance*(1+investReturn/100)-withdrawal
    yearData.push({year:i,age:startAge+i,balance:Math.round(Math.max(0,balance)),withdrawal:Math.round(withdrawal)})
    if(balance<=0&&!depleted){depleted=true;break}
  }
  const sustainableRate=portfolioBalance>0?annualWithdrawal/portfolioBalance*100:0
  const safeAmount=portfolioBalance*0.04
  return { portfolioBalance, annualWithdrawal, sustainableRate:Math.round(sustainableRate*100)/100, safeWithdrawal:Math.round(safeAmount), yearData, depletes:depleted, depletionAge:depleted?yearData[yearData.length-1].age:null, surplus:!depleted?Math.round(yearData[yearData.length-1].balance):0 }
}

export function calculateLongTermCareInsurance(age:number, dailyBenefit:number, benefitPeriod:number, eliminationPeriod:number, inflationProtection:boolean) {
  const avgDailyCost2026=350 // national average nursing home
  const coverageGap=Math.max(0,avgDailyCost2026-dailyBenefit)
  const annualPremium=age<55?2400:age<60?3200:age<65?4800:age<70?7200:11000
  const totalPremiumPaid=annualPremium*(65-Math.min(age,64))
  const totalBenefitValue=dailyBenefit*365*benefitPeriod*(inflationProtection?1.5:1)
  const breakEven=Math.round(totalPremiumPaid/(dailyBenefit*365))
  const medicaidThreshold=2000 // asset threshold for Medicaid LTC
  return { avgDailyCost:avgDailyCost2026, coverageGap:Math.round(coverageGap), annualPremium:Math.round(annualPremium), monthlyPremium:Math.round(annualPremium/12), totalPremiumPaid:Math.round(totalPremiumPaid), totalBenefitValue:Math.round(totalBenefitValue), breakEvenYears:breakEven, eliminationPeriodCost:Math.round(avgDailyCost2026*eliminationPeriod), recommendation:age<60?'Buy now — premiums double by 65':'Consider purchasing soon to lock in current rates' }
}

export function calculateScholarship(collegeType:'public'|'private'|'community', inState:boolean, aidYear:number, efc:number, merit:number) {
  const costs:Record<string,number>={public:22000,private:55000,community:4000}
  const baseCost=costs[collegeType]*(inState?1:1.35)
  const pellGrant=Math.min(Math.max(0,7395-(efc*0.3)),7395) // 2026 max
  const needBased=Math.max(0,(baseCost-efc)*0.6)
  const totalAid=pellGrant+needBased+merit
  const netCost=Math.max(0,baseCost-totalAid)
  const loanNeeded=Math.max(0,netCost-efc)
  const subsidizedLimit=3500 // freshman year
  const unsubsidized=Math.max(0,loanNeeded-subsidizedLimit)
  return { baseCost:Math.round(baseCost), pellGrant:Math.round(pellGrant), needBasedAid:Math.round(needBased), meritAid:merit, totalAid:Math.round(totalAid), netCost:Math.round(netCost), loanNeeded:Math.round(loanNeeded), subsidizedLoan:Math.min(subsidizedLimit,loanNeeded), unsubsidizedLoan:Math.round(unsubsidized), fourYearCost:Math.round(netCost*4), fourYearDebt:Math.round(loanNeeded*4) }
}

// ─── BATCH 3: 25 MORE UNIQUE USA FINANCE CALCULATORS ─────────────────────────

export function calculateSolo401k(selfEmploymentIncome: number, age: number, includeDefinedBenefit: boolean) {
  const netSE = selfEmploymentIncome * 0.9235
  const employeeContrib = Math.min(23500, netSE) + (age >= 50 ? 7500 : 0) + (age >= 60 && age <= 63 ? 3750 : 0) // SECURE 2.0 super catch-up
  const employerContrib = Math.min(netSE * 0.25, 70000 - Math.min(employeeContrib, 23500))
  const totalContrib = Math.min(employeeContrib + employerContrib, 70000 + (age >= 50 ? 7500 : 0))
  const taxSavings = totalContrib * 0.37
  const netCost = totalContrib - taxSavings
  const growth30 = totalContrib * Math.pow(1.07, 30)
  const vsTraditional401k = totalContrib - 23500
  return {
    netSE: Math.round(netSE),
    employeeContrib: Math.round(employeeContrib),
    employerContrib: Math.round(employerContrib),
    totalContrib: Math.round(totalContrib),
    taxSavings: Math.round(taxSavings),
    netCost: Math.round(netCost),
    growth30: Math.round(growth30),
    vsTraditional401k: Math.round(vsTraditional401k),
    catchUpEligible: age >= 50,
    superCatchUp: age >= 60 && age <= 63,
    yearData: Array.from({ length: 31 }, (_, i) => ({ year: i, value: Math.round(totalContrib * Math.pow(1.07, i)) }))
  }
}

export function calculateInheritedIRA(inheritedBalance: number, relationshipType: 'spouse' | 'non-spouse' | 'minor' | 'disabled', decedentAge: number, beneficiaryAge: number, currentTaxRate: number) {
  const isSpouse = relationshipType === 'spouse'
  const tenYearRule = !isSpouse && relationshipType !== 'disabled' && relationshipType !== 'minor'
  const annualRequired = tenYearRule ? inheritedBalance / 10 : inheritedBalance / Math.max(1, 90 - beneficiaryAge)
  const taxPerWithdrawal = annualRequired * (currentTaxRate / 100)
  const netPerWithdrawal = annualRequired - taxPerWithdrawal
  const totalTaxBurden = taxPerWithdrawal * (tenYearRule ? 10 : 30)
  const strategies = tenYearRule
    ? ['Spread withdrawals over 10 years to avoid bracket spikes', 'Withdraw more in low-income years (job loss, early retirement)', 'Consider qualified charitable distributions if 70½+', 'Roth conversion in low-income years reduces future RMD burden']
    : ['Spouse can roll into own IRA and delay RMDs to age 73', 'Take distributions based on your own life expectancy', 'Consider delaying distributions to maximize tax-deferred growth']
  return {
    inheritedBalance,
    tenYearRule,
    annualRequired: Math.round(annualRequired),
    taxPerWithdrawal: Math.round(taxPerWithdrawal),
    netPerWithdrawal: Math.round(netPerWithdrawal),
    totalTaxBurden: Math.round(totalTaxBurden),
    optimalStrategy: strategies[0],
    strategies,
    yearData: Array.from({ length: tenYearRule ? 11 : 31 }, (_, i) => ({ year: i, balance: Math.round(Math.max(0, inheritedBalance - annualRequired * i) * Math.pow(1.06, i)) }))
  }
}

export function calculateTrusteeeFee(trustAssets: number, trustType: 'revocable' | 'irrevocable' | 'charitable', annualAdminHours: number, stateProbateCost: number) {
  const professionalFeeRate = trustAssets < 1000000 ? 0.015 : trustAssets < 5000000 ? 0.012 : 0.009
  const annualFee = trustAssets * professionalFeeRate
  const hourlyFee = annualAdminHours * 250
  const totalAnnualCost = Math.min(annualFee, hourlyFee * 3)
  const probateSavings = stateProbateCost * trustAssets / 100
  const netBenefit10yr = probateSavings - totalAnnualCost * 10
  const setupCost = trustType === 'revocable' ? 2500 : trustType === 'irrevocable' ? 5000 : 8000
  return {
    annualFee: Math.round(annualFee),
    hourlyFee: Math.round(hourlyFee),
    totalAnnualCost: Math.round(totalAnnualCost),
    probateSavings: Math.round(probateSavings),
    netBenefit10yr: Math.round(netBenefit10yr),
    setupCost,
    breakEvenYears: Math.round(setupCost / Math.max(1, probateSavings / 10 - totalAnnualCost)),
    worthIt: netBenefit10yr > 0
  }
}

export function calculateMortgageAffordability(grossIncome: number, monthlyDebts: number, downPayment: number, rate: number, termYears: number, propertyTaxRate: number, insuranceMonthly: number) {
  const maxDTI = 0.43
  const frontEndMax = 0.28
  const maxHousingPayment = grossIncome / 12 * frontEndMax
  const maxTotalDebt = grossIncome / 12 * maxDTI
  const maxMortgageByBackEnd = maxTotalDebt - monthlyDebts - insuranceMonthly
  const monthlyRate = rate / 100 / 12
  const months = termYears * 12
  const maxLoanFront = maxHousingPayment * (1 - Math.pow(1 + monthlyRate, -months)) / monthlyRate
  const maxLoanBack = maxMortgageByBackEnd * (1 - Math.pow(1 + monthlyRate, -months)) / monthlyRate
  const maxLoan = Math.min(maxLoanFront, maxLoanBack)
  const maxPrice = maxLoan + downPayment
  const monthlyPayment = maxLoan * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
  const propTax = maxPrice * propertyTaxRate / 100 / 12
  const totalHousingCost = monthlyPayment + propTax + insuranceMonthly
  return {
    maxPrice: Math.round(maxPrice),
    maxLoan: Math.round(maxLoan),
    monthlyPayment: Math.round(monthlyPayment),
    propTax: Math.round(propTax),
    totalHousingCost: Math.round(totalHousingCost),
    dtiRatio: Math.round((totalHousingCost + monthlyDebts) / (grossIncome / 12) * 100),
    frontEndRatio: Math.round(totalHousingCost / (grossIncome / 12) * 100),
    downPaymentPercent: Math.round(downPayment / maxPrice * 100)
  }
}

export function calculateCollegeROI(degreeCost: number, yearsToComplete: number, salaryWithDegree: number, salaryWithout: number, loanRate: number, workYears: number) {
  const opportunityCost = salaryWithout * yearsToComplete
  const totalInvestment = degreeCost + opportunityCost
  const annualPremium = salaryWithDegree - salaryWithout
  const lifetimePremium = annualPremium * workYears
  const loanPayment = degreeCost * (loanRate / 100 / 12) / (1 - Math.pow(1 + loanRate / 100 / 12, -120))
  const totalLoanCost = loanPayment * 120
  const roi = ((lifetimePremium - totalInvestment) / totalInvestment) * 100
  const paybackYears = totalInvestment / Math.max(1, annualPremium)
  const npv = Array.from({ length: workYears }, (_, i) => annualPremium / Math.pow(1.05, i + yearsToComplete)).reduce((s, v) => s + v, 0) - degreeCost
  return {
    totalInvestment: Math.round(totalInvestment),
    lifetimePremium: Math.round(lifetimePremium),
    roi: Math.round(roi),
    paybackYears: Math.round(paybackYears * 10) / 10,
    npv: Math.round(npv),
    monthlyLoanPayment: Math.round(loanPayment),
    totalLoanCost: Math.round(totalLoanCost),
    worthIt: npv > 0,
    yearData: Array.from({ length: Math.min(workYears + yearsToComplete, 41) }, (_, i) => ({
      year: i,
      cumPremium: Math.round(Math.max(0, i - yearsToComplete) * annualPremium),
      cumCost: Math.round(Math.min(i, yearsToComplete) * (degreeCost / yearsToComplete))
    }))
  }
}

export function calculateRealEstateFlip(purchasePrice: number, rehabCost: number, holdingMonths: number, arvSalePrice: number, agentCommission: number, loanRate: number, downPercent: number) {
  const downPayment = purchasePrice * downPercent / 100
  const loanAmount = purchasePrice - downPayment
  const monthlyInterest = loanAmount * (loanRate / 100 / 12)
  const holdingCosts = monthlyInterest * holdingMonths + purchasePrice * 0.015 * holdingMonths / 12
  const sellingCosts = arvSalePrice * agentCommission / 100 + arvSalePrice * 0.02
  const totalCost = purchasePrice + rehabCost + holdingCosts + sellingCosts
  const grossProfit = arvSalePrice - totalCost
  const roi = (grossProfit / (downPayment + rehabCost)) * 100
  const annualizedROI = roi / (holdingMonths / 12)
  const the70Rule = arvSalePrice * 0.70 - rehabCost
  return {
    totalCost: Math.round(totalCost),
    holdingCosts: Math.round(holdingCosts),
    sellingCosts: Math.round(sellingCosts),
    grossProfit: Math.round(grossProfit),
    cashInvested: Math.round(downPayment + rehabCost),
    roi: Math.round(roi * 10) / 10,
    annualizedROI: Math.round(annualizedROI * 10) / 10,
    the70Rule: Math.round(the70Rule),
    withinRule: purchasePrice <= the70Rule,
    worthFlipping: grossProfit > 25000 && roi > 15
  }
}

export function calculateSocialSecurityTaxability(ssBenefit: number, otherIncome: number, filingStatus: 'single' | 'married') {
  const combinedIncome = otherIncome + ssBenefit * 0.5
  const threshold1 = filingStatus === 'married' ? 32000 : 25000
  const threshold2 = filingStatus === 'married' ? 44000 : 34000
  let taxablePercent = 0
  if (combinedIncome > threshold2) taxablePercent = 85
  else if (combinedIncome > threshold1) taxablePercent = 50
  const taxableSS = ssBenefit * taxablePercent / 100
  const taxOnSS = taxableSS * 0.22
  const strategies = []
  if (taxablePercent > 0) {
    strategies.push('Roth IRA withdrawals do NOT count as income for SS taxability')
    strategies.push('Consider Roth conversions before claiming SS to reduce future provisional income')
    strategies.push('Municipal bond interest is tax-exempt but still counts toward SS combined income threshold')
    strategies.push('Delaying RMDs through QCDs reduces provisional income dollar-for-dollar')
  }
  return {
    annualSSBenefit: Math.round(ssBenefit),
    combinedIncome: Math.round(combinedIncome),
    taxablePercent,
    taxableSSIncome: Math.round(taxableSS),
    estimatedTaxOnSS: Math.round(taxOnSS),
    netSSBenefit: Math.round(ssBenefit - taxOnSS),
    threshold1,
    threshold2,
    strategies,
    aboveThreshold: combinedIncome > threshold1
  }
}

export function calculateHomeOfficeDeduction(officeSquareFt: number, homeTotalSqFt: number, annualRent: number, utilities: number, internet: number, businessType: 'self-employed' | 'employee') {
  if (businessType === 'employee') return { deduction: 0, note: 'W-2 employees cannot deduct home office expenses under current law (TCJA suspended this through 2025+). Only self-employed and independent contractors qualify.', simplified: 0, actual: 0 }
  const percentage = officeSquareFt / homeTotalSqFt
  const actualDeduction = (annualRent + utilities) * percentage + internet * 0.5
  const simplifiedDeduction = Math.min(officeSquareFt, 300) * 5
  const betterMethod = actualDeduction > simplifiedDeduction ? 'actual' : 'simplified'
  const taxSavings = Math.max(actualDeduction, simplifiedDeduction) * 0.32
  return {
    percentage: Math.round(percentage * 1000) / 10,
    actualDeduction: Math.round(actualDeduction),
    simplifiedDeduction: Math.round(simplifiedDeduction),
    betterMethod,
    optimalDeduction: Math.round(Math.max(actualDeduction, simplifiedDeduction)),
    taxSavings: Math.round(taxSavings),
    note: `Use ${betterMethod} method — saves $${Math.round(taxSavings)} more in taxes`
  }
}

export function calculateMunicipalBondTEY(couponRate: number, federalTaxRate: number, stateTaxRate: number, stateExempt: boolean) {
  const combinedRate = federalTaxRate + (stateExempt ? stateTaxRate : 0)
  const tey = couponRate / (1 - combinedRate / 100)
  const afterTaxMuni = couponRate
  const afterTaxTreasury = (tey * (1 - federalTaxRate / 100)).toFixed(2)
  const breakEvenRate = tey
  return {
    couponRate,
    taxEquivalentYield: Math.round(tey * 100) / 100,
    combinedTaxRate: Math.round(combinedRate * 10) / 10,
    afterTaxMuni: Math.round(afterTaxMuni * 100) / 100,
    breakEvenRate: Math.round(breakEvenRate * 100) / 100,
    muniAdvantage: tey > couponRate,
    recommendation: tey > 5.5 ? 'Strong case for municipal bonds at your tax rate' : tey > 4.5 ? 'Munis competitive vs comparable taxable bonds' : 'Taxable bonds likely better at this income level'
  }
}

export function calculateCoveredCall(sharesOwned: number, currentPrice: number, strikePrice: number, premium: number, daysToExpiry: number) {
  const totalPremiumReceived = premium * 100 * Math.floor(sharesOwned / 100)
  const annualizedYield = (premium / currentPrice) * (365 / daysToExpiry) * 100
  const maxProfit = (strikePrice - currentPrice + premium) * 100 * Math.floor(sharesOwned / 100)
  const breakEven = currentPrice - premium
  const assignmentProceeds = strikePrice * 100 * Math.floor(sharesOwned / 100)
  const currentValue = currentPrice * sharesOwned
  const capitalGain = (strikePrice - currentPrice) * sharesOwned
  return {
    totalPremiumReceived: Math.round(totalPremiumReceived),
    annualizedYield: Math.round(annualizedYield * 100) / 100,
    maxProfit: Math.round(maxProfit),
    maxProfitPercent: Math.round((maxProfit / currentValue) * 100 * 10) / 10,
    breakEven: Math.round(breakEven * 100) / 100,
    assignmentProceeds: Math.round(assignmentProceeds),
    capitalGain: Math.round(capitalGain),
    incomePerShare: premium,
    contractsWritable: Math.floor(sharesOwned / 100)
  }
}

export function calculateTSPvs401k(salary: number, tspContrib: number, matchPercent: number, yearsService: number, retirementSystem: 'FERS' | 'CSRS', age: number) {
  const annualMatch = salary * Math.min(matchPercent, 5) / 100
  const totalAnnualContrib = tspContrib + annualMatch
  const growth30 = totalAnnualContrib * Math.pow(1.07, Math.max(0, 30 - yearsService))
  // FERS pension: 1% × years × high-3 salary (1.1% if retire at 62+ with 20+ yrs)
  const fersPensionRate = (age >= 62 && yearsService >= 20) ? 0.011 : 0.01
  const fersPension = retirementSystem === 'FERS' ? salary * fersPensionRate * yearsService : salary * 0.015 * yearsService
  const annualPension = fersPension
  const pensionPV = annualPension / 0.04
  const totalRetirementValue = growth30 + pensionPV
  return {
    annualMatch: Math.round(annualMatch),
    totalAnnualContrib: Math.round(totalAnnualContrib),
    tspGrowth30yr: Math.round(growth30),
    annualPension: Math.round(annualPension),
    pensionPresentValue: Math.round(pensionPV),
    totalRetirementValue: Math.round(totalRetirementValue),
    fersSupplementAge: 62,
    catchUpLimit: age >= 50 ? 31000 : 23500,
    yearData: Array.from({ length: 31 }, (_, i) => ({ year: i, tsp: Math.round(totalAnnualContrib * Math.pow(1.07, i)), pension: Math.round(annualPension * (i + 1)) }))
  }
}

export function calculateOptionsPremium(stockPrice: number, strikePrice: number, daysToExpiry: number, impliedVolatility: number, riskFreeRate: number, optionType: 'call' | 'put') {
  // Black-Scholes simplified
  const T = daysToExpiry / 365
  const sigma = impliedVolatility / 100
  const r = riskFreeRate / 100
  const S = stockPrice, K = strikePrice
  const d1 = (Math.log(S / K) + (r + sigma * sigma / 2) * T) / (sigma * Math.sqrt(T))
  const d2 = d1 - sigma * Math.sqrt(T)
  const Nd1 = 0.5 * (1 + Math.sign(d1) * (1 - Math.exp(-0.5 * d1 * d1) / Math.sqrt(2 * Math.PI) * (0.319381530 * Math.abs(d1) - 0.356563782 * d1 * d1 + 1.781477937 * Math.pow(Math.abs(d1), 3) - 1.821255978 * Math.pow(d1, 4) + 1.330274429 * Math.pow(Math.abs(d1), 5))))
  const Nd2 = 0.5 * (1 + Math.sign(d2) * (1 - Math.exp(-0.5 * d2 * d2) / Math.sqrt(2 * Math.PI) * (0.319381530 * Math.abs(d2) - 0.356563782 * d2 * d2 + 1.781477937 * Math.pow(Math.abs(d2), 3) - 1.821255978 * Math.pow(d2, 4) + 1.330274429 * Math.pow(Math.abs(d2), 5))))
  const callPrice = S * Nd1 - K * Math.exp(-r * T) * Nd2
  const putPrice = callPrice - S + K * Math.exp(-r * T)
  const price = optionType === 'call' ? callPrice : putPrice
  const intrinsic = optionType === 'call' ? Math.max(0, S - K) : Math.max(0, K - S)
  const timeValue = price - intrinsic
  const delta = optionType === 'call' ? Nd1 : Nd1 - 1
  const theta = -(S * sigma * Math.exp(-d1 * d1 / 2)) / (2 * Math.sqrt(T) * Math.sqrt(2 * Math.PI)) / 365
  return {
    price: Math.round(price * 100) / 100,
    intrinsicValue: Math.round(intrinsic * 100) / 100,
    timeValue: Math.round(timeValue * 100) / 100,
    delta: Math.round(delta * 1000) / 1000,
    theta: Math.round(theta * 1000) / 1000,
    contractValue: Math.round(price * 100),
    impliedMove: Math.round(stockPrice * impliedVolatility / 100 * Math.sqrt(daysToExpiry / 365) * 10) / 10,
    breakEven: optionType === 'call' ? Math.round((strikePrice + price) * 100) / 100 : Math.round((strikePrice - price) * 100) / 100
  }
}

export function calculateEstateProbate(estateValue: number, state: string, hasWill: boolean, hasTrust: boolean) {
  const probateRates: Record<string, number> = { CA: 4, NY: 2.5, FL: 3, TX: 2, IL: 2.5, OH: 2, PA: 3, GA: 2.5, NC: 2, MI: 2 }
  const rate = probateRates[state] || 3
  const probateCost = hasTrust ? 0 : estateValue * rate / 100 + (hasWill ? 5000 : 15000)
  const timeCost = hasTrust ? 0 : 18 // months
  const trustSetupCost = hasTrust ? 3500 : 0
  const netSavings = probateCost - trustSetupCost
  const privacyValue = 'Wills become public record; trusts maintain privacy'
  return {
    estateValue,
    probateCost: Math.round(probateCost),
    probatePercent: rate,
    timeCost,
    trustSetupCost,
    netSavings: Math.round(netSavings),
    worthAvoiding: probateCost > 10000,
    strategies: [
      hasTrust ? '✅ Revocable living trust avoids probate' : '⚠️ Consider a revocable living trust to bypass probate',
      'Beneficiary designations on IRA, 401k, life insurance pass outside probate',
      'Joint tenancy with right of survivorship transfers automatically at death',
      'Payable-on-death (POD) and transfer-on-death (TOD) accounts bypass probate',
    ],
    privacyNote: privacyValue
  }
}

export function calculateTaxableVsRoth(contribution: number, yearsToRetirement: number, currentTaxRate: number, retirementTaxRate: number, expectedReturn: number) {
  // Taxable account
  const afterTaxContrib = contribution * (1 - currentTaxRate / 100)
  const taxableGrowth = afterTaxContrib * Math.pow(1 + expectedReturn / 100 * 0.85, yearsToRetirement) // 15% drag for annual taxes
  const capitalGainsTax = (taxableGrowth - afterTaxContrib) * 0.15
  const taxableNetValue = taxableGrowth - capitalGainsTax

  // Roth IRA
  const rothContrib = afterTaxContrib // same after-tax dollars
  const rothGrowth = rothContrib * Math.pow(1 + expectedReturn / 100, yearsToRetirement)
  const rothNetValue = rothGrowth // 100% tax-free

  // Traditional IRA (pre-tax)
  const traditionalGrowth = contribution * Math.pow(1 + expectedReturn / 100, yearsToRetirement)
  const traditionalNetValue = traditionalGrowth * (1 - retirementTaxRate / 100)

  const rothAdvantagVsTaxable = rothNetValue - taxableNetValue
  const rothAdvantageVsTraditional = rothNetValue - traditionalNetValue

  return {
    taxableNetValue: Math.round(taxableNetValue),
    rothNetValue: Math.round(rothNetValue),
    traditionalNetValue: Math.round(traditionalNetValue),
    rothAdvantagVsTaxable: Math.round(rothAdvantagVsTaxable),
    rothAdvantageVsTraditional: Math.round(rothAdvantageVsTraditional),
    bestOption: rothNetValue >= Math.max(taxableNetValue, traditionalNetValue) ? 'Roth IRA' : traditionalNetValue >= Math.max(taxableNetValue, rothNetValue) ? 'Traditional IRA' : 'Taxable Account',
    yearData: Array.from({ length: Math.min(yearsToRetirement + 1, 41) }, (_, i) => ({
      year: i,
      roth: Math.round(rothContrib * Math.pow(1 + expectedReturn / 100, i)),
      traditional: Math.round(contribution * Math.pow(1 + expectedReturn / 100, i) * (1 - retirementTaxRate / 100)),
      taxable: Math.round(afterTaxContrib * Math.pow(1 + expectedReturn / 100 * 0.85, i))
    }))
  }
}

export function calculateCashValueLifeInsurance(annualPremium: number, deathBenefit: number, age: number, yearsHeld: number, policyType: 'whole' | 'universal' | 'variable') {
  const termCost = deathBenefit * 0.0002 * (age / 40) // rough term equivalent
  const termSavings = (annualPremium - termCost * 12) * yearsHeld
  const csvGrowthRate = policyType === 'variable' ? 0.07 : policyType === 'universal' ? 0.045 : 0.035
  const loadedPremium = annualPremium * 0.7 // ~30% goes to fees/COI
  const cashValue = loadedPremium * ((Math.pow(1 + csvGrowthRate, yearsHeld) - 1) / csvGrowthRate)
  const termAndInvest = termSavings * Math.pow(1.07, yearsHeld / 2) // rough compound
  const opportunity = termAndInvest - cashValue
  return {
    annualPremium,
    termEquivalentCost: Math.round(termCost * 12),
    annualSurplus: Math.round(annualPremium - termCost * 12),
    cashValue: Math.round(cashValue),
    termAndInvestValue: Math.round(termAndInvest),
    opportunityCost: Math.round(opportunity),
    policyIRR: Math.round(csvGrowthRate * 100 * 10) / 10,
    recommendation: opportunity > 50000 ? '"Buy term and invest the difference" likely better for wealth building' : 'Cash value policy may make sense for estate planning or max-funded LIRP strategy',
    loanCapacity: Math.round(cashValue * 0.90)
  }
}

export function calculateStateIncomeTax(grossIncome: number, fromState: string, toState: string, deductions: number) {
  const brackets: Record<string, Array<[number, number]>> = {
    CA: [[10412, 0.01], [24684, 0.02], [38959, 0.04], [54081, 0.06], [68350, 0.08], [349137, 0.093], [418961, 0.103], [698274, 0.113], [Infinity, 0.123]],
    NY: [[17150, 0.04], [23600, 0.045], [27900, 0.0525], [161550, 0.0585], [323200, 0.0625], [2155350, 0.0685], [5000000, 0.0965], [25000000, 0.103], [Infinity, 0.109]],
    TX: [[Infinity, 0]],
    FL: [[Infinity, 0]],
    WA: [[Infinity, 0]],
    IL: [[Infinity, 0.0495]],
    GA: [[Infinity, 0.055]],
    NC: [[Infinity, 0.0499]],
    MA: [[Infinity, 0.05]],
    NJ: [[20000, 0.014], [35000, 0.0175], [40000, 0.035], [75000, 0.05525], [500000, 0.0637], [1000000, 0.0897], [Infinity, 0.1075]],
    CO: [[Infinity, 0.044]],
    AZ: [[Infinity, 0.025]],
    OR: [[17400, 0.0475], [250000, 0.0675], [Infinity, 0.099]],
    MN: [[32570, 0.0535], [107020, 0.068], [193840, 0.0785], [Infinity, 0.0985]],
    WI: [[14320, 0.035], [28640, 0.044], [315310, 0.053], [Infinity, 0.0765]],
    VA: [[3000, 0.02], [5000, 0.03], [17000, 0.05], [Infinity, 0.0575]],
    OH: [[Infinity, 0.04]],
    PA: [[Infinity, 0.0307]],
    MI: [[Infinity, 0.0425]],
  }
  const calcTax = (income: number, state: string) => {
    const b = brackets[state] || [[Infinity, 0.05]]
    const taxable = Math.max(0, income - deductions)
    let tax = 0, prev = 0
    for (const [limit, rate] of b) {
      const slice = Math.min(Math.max(0, taxable - prev), Number(limit) - prev)
      tax += slice * rate
      prev = Number(limit)
      if (taxable <= Number(limit)) break
    }
    return tax
  }
  const fromTax = calcTax(grossIncome, fromState)
  const toTax = calcTax(grossIncome, toState)
  const savings = fromTax - toTax
  return {
    grossIncome,
    fromStateTax: Math.round(fromTax),
    toStateTax: Math.round(toTax),
    annualSavings: Math.round(savings),
    tenYearSavings: Math.round(savings * 10),
    fromRate: Math.round(fromTax / grossIncome * 1000) / 10,
    toRate: Math.round(toTax / grossIncome * 1000) / 10,
    worthMoving: savings > 10000,
    moveCost: 15000 // rough estimate
  }
}

export function calculateEmergencyFundInHYSA(monthlyExpenses: number, monthsCoverage: number, currentBalance: number, hysa_rate: number, inflationRate: number) {
  const targetFund = monthlyExpenses * monthsCoverage
  const gap = Math.max(0, targetFund - currentBalance)
  const annualInterest = currentBalance * hysa_rate / 100
  const monthlyInterest = annualInterest / 12
  const realRate = hysa_rate - inflationRate
  const timeToFund = gap > 0 ? Math.ceil(gap / (monthlyExpenses * 0.15 + monthlyInterest)) : 0
  const opportunityCost = targetFund * 0.07 - targetFund * hysa_rate / 100 // vs stock market
  return {
    targetFund: Math.round(targetFund),
    currentBalance,
    gap: Math.round(gap),
    funded: currentBalance >= targetFund,
    annualInterest: Math.round(annualInterest),
    monthlyInterest: Math.round(monthlyInterest),
    realRate: Math.round(realRate * 10) / 10,
    timeToFundMonths: timeToFund,
    opportunityCost: Math.round(opportunityCost),
    allocation: [
      { label: 'Month 1-3 (liquid)', amount: Math.round(monthlyExpenses * 3), where: 'HYSA' },
      { label: 'Month 4-6 (accessible)', amount: Math.round(monthlyExpenses * 3), where: 'Money Market Fund' },
    ]
  }
}

export function calculateStudentLoanRefinance(currentBalance: number, currentRate: number, currentTerm: number, newRate: number, newTerm: number, isPrivate: boolean) {
  const mr1 = currentRate / 100 / 12, mr2 = newRate / 100 / 12
  const pmt1 = currentBalance * mr1 / (1 - Math.pow(1 + mr1, -currentTerm * 12))
  const pmt2 = currentBalance * mr2 / (1 - Math.pow(1 + mr2, -newTerm * 12))
  const totalOld = pmt1 * currentTerm * 12
  const totalNew = pmt2 * newTerm * 12
  const interestSaved = totalOld - totalNew
  const breakEven = 3 // months (refi closing cost ~$0 typically)
  return {
    currentPayment: Math.round(pmt1),
    newPayment: Math.round(pmt2),
    monthlySavings: Math.round(pmt1 - pmt2),
    totalInterestOld: Math.round(totalOld - currentBalance),
    totalInterestNew: Math.round(totalNew - currentBalance),
    interestSaved: Math.round(interestSaved),
    worthRefinancing: interestSaved > 1000,
    federalBenefitsLost: !isPrivate ? 'Refinancing federal loans to private loses IDR plans, PSLF eligibility, and forbearance rights' : 'Private loan — no federal benefits to lose',
    breakEvenMonths: breakEven,
    yearData: Array.from({ length: Math.max(currentTerm, newTerm) + 1 }, (_, i) => ({
      year: i,
      oldBalance: Math.round(Math.max(0, currentBalance * Math.pow(1 + mr1, i * 12) - pmt1 * ((Math.pow(1 + mr1, i * 12) - 1) / mr1))),
      newBalance: Math.round(Math.max(0, currentBalance * Math.pow(1 + mr2, i * 12) - pmt2 * ((Math.pow(1 + mr2, i * 12) - 1) / mr2)))
    }))
  }
}

export function calculateNetUnrealizedAppreciation(nua: number, costBasis: number, otherIncome: number, age: number) {
  const nuaTax = nua * 0.15 // LT cap gains on NUA
  const ordinaryIncomeTax = costBasis * 0.22 // ordinary income on basis
  const totalNUATax = nuaTax + ordinaryIncomeTax
  const rolloverGrowth = (nua + costBasis) * Math.pow(1.07, Math.max(0, 60 - age))
  const rolloverTax = rolloverGrowth * 0.22
  const nuaNetValue = (nua + costBasis) - totalNUATax
  const rolloverNetValue = rolloverGrowth - rolloverTax
  const nuaAdvantage = nuaNetValue - (nua + costBasis) * (1 - 0.22)
  return {
    totalStock: Math.round(nua + costBasis),
    nuaAmount: Math.round(nua),
    costBasis: Math.round(costBasis),
    nuaTaxRate: 15,
    nuaTax: Math.round(nuaTax),
    basisTax: Math.round(ordinaryIncomeTax),
    totalNUATax: Math.round(totalNUATax),
    nuaNetValue: Math.round(nuaNetValue),
    rolloverNetValue: Math.round(rolloverNetValue),
    nuaAdvantage: Math.round(nuaAdvantage),
    worthUsing: nuaAdvantage > 10000,
    eligibility: 'Must be employer stock in a 401k/profit-sharing plan; triggered by qualifying distribution event'
  }
}

export function calculateTaxFreeMuniBond(faceValue: number, couponRate: number, yearsToMaturity: number, marketRate: number, federalTaxRate: number, stateTaxRate: number, stateExempt: boolean) {
  const annualInterest = faceValue * couponRate / 100
  const discountFactor = Math.pow(1 + marketRate / 100, -yearsToMaturity)
  const pvCoupons = (annualInterest / (marketRate / 100)) * (1 - discountFactor)
  const pvFace = faceValue * discountFactor
  const price = pvCoupons + pvFace
  const currentYield = annualInterest / price * 100
  const combinedTaxRate = federalTaxRate + (stateExempt ? stateTaxRate : 0)
  const tey = couponRate / (1 - combinedTaxRate / 100)
  const afterTaxIncome = annualInterest // munis are tax-exempt
  const taxableEquivalent = annualInterest / (1 - combinedTaxRate / 100)
  return {
    price: Math.round(price * 100) / 100,
    premium: Math.round((price - faceValue) * 100) / 100,
    annualInterest: Math.round(annualInterest),
    currentYield: Math.round(currentYield * 100) / 100,
    taxEquivalentYield: Math.round(tey * 100) / 100,
    afterTaxIncome: Math.round(afterTaxIncome),
    taxableEquivalentIncome: Math.round(taxableEquivalent),
    taxSavings: Math.round(taxableEquivalent - afterTaxIncome),
    totalTaxFreeIncome: Math.round(annualInterest * yearsToMaturity),
    combinedTaxRate: Math.round(combinedTaxRate * 10) / 10
  }
}

export function calculateIBond2026(monthlyPurchase: number, startMonth: number, years: number) {
  const annualLimit = 10000
  const fixedRate = 1.30
  const inflationRate = 3.11
  const compositeRate = fixedRate + 2 * inflationRate + (fixedRate * inflationRate) / 100
  const months = years * 12
  let totalValue = 0
  const purchases: number[] = []
  for (let m = 0; m < months; m++) {
    const monthlyAmount = Math.min(monthlyPurchase, annualLimit / 12)
    const monthsHeld = months - m
    const penalty = monthsHeld < 60 ? 3 : 0
    const effectiveMonths = Math.max(0, monthsHeld - penalty)
    totalValue += monthlyAmount * Math.pow(1 + compositeRate / 100 / 2, effectiveMonths / 6)
    purchases.push(monthlyAmount)
  }
  const totalPurchased = Math.min(monthlyPurchase * 12, annualLimit) * years
  const totalInterest = totalValue - totalPurchased
  return {
    compositeRate: Math.round(compositeRate * 100) / 100,
    totalPurchased: Math.round(totalPurchased),
    totalValue: Math.round(totalValue),
    totalInterest: Math.round(totalInterest),
    effectiveAnnualYield: Math.round((Math.pow(totalValue / totalPurchased, 1 / years) - 1) * 10000) / 100,
    annualLimit,
    bestFor: 'Emergency fund tier 2, short-term inflation hedge, or complement to TIPS',
    yearData: Array.from({ length: years + 1 }, (_, i) => ({ year: i, value: Math.round(Math.min(monthlyPurchase * 12, annualLimit) * i * Math.pow(1 + compositeRate / 100, i)) }))
  }
}

export function calculateCryptoDCAvsLumpSum(totalAmount: number, dcaMonths: number, startPrice: number, endPrice: number, volatility: number) {
  // DCA simulation
  const monthlyBuy = totalAmount / dcaMonths
  const priceStep = (endPrice - startPrice) / dcaMonths
  let dcaShares = 0, dcaCost = 0
  const dcaData = []
  for (let m = 0; m < dcaMonths; m++) {
    const price = startPrice + priceStep * m + (Math.sin(m * 0.8) * startPrice * volatility / 100)
    const shares = monthlyBuy / price
    dcaShares += shares
    dcaCost += monthlyBuy
    dcaData.push({ month: m + 1, price: Math.round(price), shares: Math.round(dcaShares * 1000) / 1000, value: Math.round(dcaShares * endPrice) })
  }
  const dcaValue = dcaShares * endPrice
  const dcaAvgPrice = dcaCost / dcaShares

  // Lump sum
  const lsShares = totalAmount / startPrice
  const lsValue = lsShares * endPrice

  const dcaROI = (dcaValue / totalAmount - 1) * 100
  const lsROI = (lsValue / totalAmount - 1) * 100

  return {
    totalAmount,
    dcaMonthlyBuy: Math.round(monthlyBuy),
    dcaShares: Math.round(dcaShares * 100) / 100,
    dcaAvgPrice: Math.round(dcaAvgPrice * 100) / 100,
    dcaValue: Math.round(dcaValue),
    dcaROI: Math.round(dcaROI * 100) / 100,
    lsShares: Math.round(lsShares * 100) / 100,
    lsValue: Math.round(lsValue),
    lsROI: Math.round(lsROI * 100) / 100,
    winner: dcaValue > lsValue ? 'DCA' : 'Lump Sum',
    difference: Math.round(Math.abs(dcaValue - lsValue)),
    yearData: dcaData
  }
}

export function calculatePensionVsLumpSum(monthlyPension: number, lumpSum: number, age: number, lifeExpectancy: number, discountRate: number, colaPercent: number) {
  const years = lifeExpectancy - age
  let pensionPV = 0
  const yearData = []
  let cumPension = 0, cumLumpSum = lumpSum
  for (let i = 0; i < years; i++) {
    const annualPension = monthlyPension * 12 * Math.pow(1 + colaPercent / 100, i)
    pensionPV += annualPension / Math.pow(1 + discountRate / 100, i + 1)
    cumPension += annualPension
    cumLumpSum = cumLumpSum * (1 + discountRate / 100) - annualPension
    yearData.push({ year: i + 1, age: age + i + 1, cumPension: Math.round(cumPension), lumpSumBalance: Math.round(Math.max(0, cumLumpSum)) })
  }
  const breakEvenYear = yearData.find(d => d.cumPension >= lumpSum)
  return {
    monthlyPension,
    lumpSum,
    pensionPV: Math.round(pensionPV),
    pensionBetter: pensionPV > lumpSum,
    difference: Math.round(Math.abs(pensionPV - lumpSum)),
    breakEvenAge: breakEvenYear ? breakEvenYear.age : lifeExpectancy + 5,
    totalPension: Math.round(monthlyPension * 12 * years),
    impliedReturn: Math.round((monthlyPension * 12 / lumpSum) * 100 * 10) / 10,
    colaValue: Math.round(monthlyPension * 12 * years * colaPercent / 100 * years / 2),
    yearData
  }
}

export function calculateIndexFundFees(initialAmount: number, annualContrib: number, grossReturn: number, expenseRatio1: number, expenseRatio2: number, years: number) {
  const net1 = grossReturn - expenseRatio1
  const net2 = grossReturn - expenseRatio2
  let bal1 = initialAmount, bal2 = initialAmount
  const yearData = []
  for (let i = 0; i < years; i++) {
    bal1 = bal1 * (1 + net1 / 100) + annualContrib
    bal2 = bal2 * (1 + net2 / 100) + annualContrib
    yearData.push({ year: i + 1, lowFee: Math.round(bal1), highFee: Math.round(bal2), difference: Math.round(bal1 - bal2) })
  }
  return {
    lowFeeBalance: Math.round(bal1),
    highFeeBalance: Math.round(bal2),
    feeDifference: Math.round(bal1 - bal2),
    feeDragPercent: Math.round((bal1 - bal2) / bal1 * 100 * 10) / 10,
    annualFeeCost1: Math.round(bal1 * expenseRatio1 / 100),
    annualFeeCost2: Math.round(bal2 * expenseRatio2 / 100),
    totalFeesPaid1: Math.round((grossReturn - net1) / 100 * initialAmount * years),
    totalFeesPaid2: Math.round((grossReturn - net2) / 100 * initialAmount * years),
    recommendation: expenseRatio1 < 0.10 ? '✅ Excellent — Vanguard/Fidelity index fund level' : expenseRatio1 < 0.50 ? '👍 Good — below average actively managed fund' : '⚠️ High — consider switching to lower-cost index fund',
    yearData
  }
}

export function calculateBondLadder(totalAmount: number, rungs: number, startYield: number, yieldStep: number, reinvest: boolean) {
  const amountPerRung = totalAmount / rungs
  const yearData = []
  let totalInterest = 0
  const ladder = Array.from({ length: rungs }, (_, i) => {
    const maturityYear = i + 1
    const yield_ = startYield + yieldStep * i
    const interest = amountPerRung * yield_ / 100 * maturityYear
    totalInterest += interest
    return { rung: i + 1, maturityYear, yield: yield_, amount: Math.round(amountPerRung), interest: Math.round(interest), totalAtMaturity: Math.round(amountPerRung + interest) }
  })
  const avgYield = ladder.reduce((s, r) => s + r.yield, 0) / rungs
  const reinvestedValue = reinvest ? totalAmount * Math.pow(1 + avgYield / 100, rungs) : totalAmount + totalInterest
  return {
    totalAmount,
    rungs,
    amountPerRung: Math.round(amountPerRung),
    avgYield: Math.round(avgYield * 100) / 100,
    totalInterest: Math.round(totalInterest),
    reinvestedValue: Math.round(reinvestedValue),
    annualLiquidityYear: Array.from({ length: rungs }, (_, i) => ({ year: i + 1, available: Math.round(amountPerRung + amountPerRung * (startYield + yieldStep * i) / 100 * (i + 1)) })),
    ladder
  }
}

export function calculateWealthComparison(initialAmount: number, annualContrib: number, years: number, taxRate: number) {
  const calc = (rate: number, taxDrag: number = 0) => {
    let bal = initialAmount
    for (let i = 0; i < years; i++) bal = bal * (1 + (rate - taxDrag) / 100) + annualContrib
    return Math.round(bal)
  }
  const indexFund = calc(10, taxRate * 0.15 / 100) // ~15% of gains taxed annually
  const realEstate = calc(9, 0) // leverage + appreciation + rent, tax-deferred
  const business = calc(14, taxRate * 0.2 / 100) // higher return, higher tax
  const bonds = calc(4.5, taxRate / 100 * 4.5 * 0.3) // interest taxed annually
  const hysa = calc(4.85, taxRate / 100 * 4.85) // fully taxed annually
  const vals = [indexFund, realEstate, business, bonds, hysa]
  const names = ['Index Fund', 'Real Estate', 'Business', 'Bonds', 'HYSA']
  const best = names[vals.indexOf(Math.max(...vals))]
  const yearData = Array.from({ length: years + 1 }, (_, i) => {
    const g = (rate: number, drag: number) => { let b = initialAmount; for(let j=0;j<i;j++) b=b*(1+(rate-drag)/100)+annualContrib; return Math.round(b) }
    return { year: i, indexFund: g(10,taxRate*0.15/100), realEstate: g(9,0), bonds: g(4.5,taxRate/100*4.5*0.3), hysa: g(4.85,taxRate/100*4.85) }
  })
  return { indexFund, realEstate, business, bonds, hysa, best, yearData }
}

export function calculateW4Withholding(annualSalary: number, spouseIncome: number, otherIncome: number, retirement401k: number, itemizedDeductions: number, taxCredits: number) {
  const totalIncome = annualSalary + spouseIncome + otherIncome - retirement401k
  const stdDeduction = spouseIncome > 0 ? 30000 : 15000
  const deduction = Math.max(stdDeduction, itemizedDeductions)
  const taxable = Math.max(0, totalIncome - deduction)
  const brackets: [number,number][] = [[23200,0.10],[94300,0.12],[201050,0.22],[383900,0.24],[487450,0.32],[731200,0.35],[Infinity,0.37]]
  let tax = 0, rem = taxable, prev = 0
  for(const [lim,rate] of brackets){const s=Math.min(rem,lim-prev);tax+=s*rate;rem-=s;prev=lim;if(rem<=0)break}
  const taxLiability = Math.max(0, tax - taxCredits)
  const currentWithholding = annualSalary * 0.22 // rough flat withholding estimate
  const refundOrOwe = currentWithholding - taxLiability
  const suggestedDeduction = deduction > stdDeduction ? deduction - stdDeduction : 0
  const monthlyAdjustment = Math.round((currentWithholding - taxLiability) / 12)
  return {
    taxLiability: Math.round(taxLiability),
    currentWithholding: Math.round(currentWithholding),
    refundOrOwe: Math.round(refundOrOwe),
    suggestedDeduction: Math.round(suggestedDeduction),
    monthlyAdjustment,
    status: refundOrOwe > 1000 ? 'Over-withheld — adjust W-4 to keep more each paycheck' : refundOrOwe < -1000 ? 'Under-withheld — increase withholding to avoid penalty' : '✅ Well calibrated — within $1,000 target range'
  }
}

// ─── BATCH 4: 25 MORE UNIQUE USA FINANCE CALCULATORS ─────────────────────────

export function calculateCDvsHYSAvsMoneyMarket(amount: number, cdRate: number, cdTermMonths: number, hysaRate: number, mmfRate: number, taxRate: number) {
  const cdValue = amount * Math.pow(1 + cdRate / 100 / 12, cdTermMonths)
  const hysaValue = amount * Math.pow(1 + hysaRate / 100 / 12, cdTermMonths)
  const mmfValue = amount * Math.pow(1 + mmfRate / 100 / 12, cdTermMonths)
  const cdInterest = cdValue - amount
  const hysaInterest = hysaValue - amount
  const mmfInterest = mmfValue - amount
  const cdAfterTax = cdValue - cdInterest * taxRate / 100
  const hysaAfterTax = hysaValue - hysaInterest * taxRate / 100
  const mmfAfterTax = mmfValue - mmfInterest * taxRate / 100
  const best = cdAfterTax >= hysaAfterTax && cdAfterTax >= mmfAfterTax ? 'CD' : hysaAfterTax >= mmfAfterTax ? 'HYSA' : 'Money Market Fund'
  const earlyWithdrawalPenalty = amount * cdRate / 100 / 12 * 3
  return {
    cdValue: Math.round(cdValue), hysaValue: Math.round(hysaValue), mmfValue: Math.round(mmfValue),
    cdInterest: Math.round(cdInterest), hysaInterest: Math.round(hysaInterest), mmfInterest: Math.round(mmfInterest),
    cdAfterTax: Math.round(cdAfterTax), hysaAfterTax: Math.round(hysaAfterTax), mmfAfterTax: Math.round(mmfAfterTax),
    best, earlyWithdrawalPenalty: Math.round(earlyWithdrawalPenalty),
    cdLiquidityNote: 'CD locks funds for term; early withdrawal penalty typically = 3 months interest',
    mmfLiquidityNote: 'Money market funds offer same-day liquidity and no penalty',
    yearData: Array.from({ length: Math.ceil(cdTermMonths / 12) + 1 }, (_, i) => ({
      year: i,
      cd: Math.round(amount * Math.pow(1 + cdRate / 100 / 12, i * 12)),
      hysa: Math.round(amount * Math.pow(1 + hysaRate / 100 / 12, i * 12)),
      mmf: Math.round(amount * Math.pow(1 + mmfRate / 100 / 12, i * 12))
    }))
  }
}

export function calculateCarAffordability(grossMonthlyIncome: number, monthlyDebts: number, downPayment: number, tradeInValue: number, loanRate: number, loanTermMonths: number, insuranceMonthly: number) {
  const maxDTI = 0.15 // 15% of gross income for car
  const maxPayment = grossMonthlyIncome * maxDTI - insuranceMonthly
  const maxLoan = maxPayment * (1 - Math.pow(1 + loanRate / 100 / 12, -loanTermMonths)) / (loanRate / 100 / 12)
  const maxCarPrice = maxLoan + downPayment + tradeInValue
  const actualMonthlyRate = loanRate / 100 / 12
  const actualPayment = maxLoan * (actualMonthlyRate * Math.pow(1 + actualMonthlyRate, loanTermMonths)) / (Math.pow(1 + actualMonthlyRate, loanTermMonths) - 1)
  const totalCostOfOwnership = actualPayment * loanTermMonths + insuranceMonthly * loanTermMonths + maxCarPrice * 0.015 * loanTermMonths / 12
  const totalInterest = actualPayment * loanTermMonths - maxLoan
  return {
    maxCarPrice: Math.round(maxCarPrice), maxLoan: Math.round(maxLoan),
    monthlyPayment: Math.round(actualPayment), insuranceMonthly,
    totalMonthly: Math.round(actualPayment + insuranceMonthly),
    totalInterest: Math.round(totalInterest), totalCostOfOwnership: Math.round(totalCostOfOwnership),
    percentOfIncome: Math.round((actualPayment + insuranceMonthly) / grossMonthlyIncome * 100),
    recommendation: maxCarPrice < 15000 ? 'Consider certified pre-owned' : maxCarPrice > 60000 ? 'Luxury segment — ensure this aligns with full financial picture' : 'Moderate range — standard financing available'
  }
}

export function calculateRealEstateCapRate(annualGrossRent: number, vacancyRate: number, operatingExpenses: number, propertyValue: number, mortgagePayment: number) {
  const effectiveGrossIncome = annualGrossRent * (1 - vacancyRate / 100)
  const noi = effectiveGrossIncome - operatingExpenses
  const capRate = noi / propertyValue * 100
  const cashFlow = noi - mortgagePayment * 12
  const grossRentMultiplier = propertyValue / annualGrossRent
  const expenseRatio = operatingExpenses / effectiveGrossIncome * 100
  const breakEvenOccupancy = (operatingExpenses + mortgagePayment * 12) / annualGrossRent * 100
  return {
    effectiveGrossIncome: Math.round(effectiveGrossIncome),
    noi: Math.round(noi), capRate: Math.round(capRate * 100) / 100,
    cashFlow: Math.round(cashFlow), grossRentMultiplier: Math.round(grossRentMultiplier * 100) / 100,
    expenseRatio: Math.round(expenseRatio * 10) / 10,
    breakEvenOccupancy: Math.round(breakEvenOccupancy * 10) / 10,
    isGoodInvestment: capRate > 5 && cashFlow > 0,
    impliedValue: Math.round(noi / 0.06)
  }
}

export function calculateSavingsRateToFIRE(annualIncome: number, annualExpenses: number, currentSavings: number, returnRate: number) {
  const savingsAmount = annualIncome - annualExpenses
  const savingsRate = savingsAmount / annualIncome * 100
  const fireNumber = annualExpenses / 0.04
  const monthlyRate = returnRate / 100 / 12
  const monthsToFIRE = Math.log((fireNumber * monthlyRate + savingsAmount / 12) / (currentSavings * monthlyRate + savingsAmount / 12)) / Math.log(1 + monthlyRate)
  const yearsToFIRE = monthsToFIRE / 12
  // What if savings rate changes
  const scenarios = [10, 20, 30, 40, 50, 60, 70].map(rate => {
    const save = annualIncome * rate / 100
    const spend = annualIncome - save
    const fn = spend / 0.04
    const mr = returnRate / 100 / 12
    const m = Math.log((fn * mr + save / 12) / (currentSavings * mr + save / 12)) / Math.log(1 + mr)
    return { savingsRate: rate, yearsToFIRE: Math.round(m / 12 * 10) / 10, fireNumber: Math.round(fn) }
  })
  return {
    savingsAmount: Math.round(savingsAmount), savingsRate: Math.round(savingsRate * 10) / 10,
    fireNumber: Math.round(fireNumber), yearsToFIRE: Math.round(yearsToFIRE * 10) / 10,
    currentCoverage: Math.round(currentSavings / fireNumber * 100),
    scenarios
  }
}

export function calculateSocialSecurityOptimizer(yourBenefit: number, yourAge: number, spouseBenefit: number, spouseAge: number, healthRating: 'poor' | 'average' | 'excellent') {
  const lifeExpectancy = healthRating === 'poor' ? 79 : healthRating === 'average' ? 84 : 89
  const spouseLE = lifeExpectancy - 2
  const FRA = 67
  const scenarios = [62, 64, 66, 67, 68, 70].map(claimAge => {
    const reduction = claimAge < FRA ? (FRA - claimAge) * 12 <= 36 ? (FRA - claimAge) * 12 * 5 / 9 / 100 : 36 * 5 / 9 / 100 + ((FRA - claimAge) * 12 - 36) * 5 / 12 / 100 : 0
    const increase = claimAge > FRA ? (claimAge - FRA) * 0.08 : 0
    const monthly = yourBenefit * (1 - reduction + increase)
    const years = Math.max(0, lifeExpectancy - claimAge)
    const lifetime = monthly * 12 * years
    return { claimAge, monthly: Math.round(monthly), lifetime: Math.round(lifetime), years }
  })
  const optimal = scenarios.reduce((best, s) => s.lifetime > best.lifetime ? s : best)
  const spousalMonthly = Math.max(spouseBenefit, yourBenefit * 0.5) * (1 + (spouseAge < 67 ? 0 : (67 - spouseAge) * -0.08))
  return {
    scenarios, optimal,
    spousalMonthly: Math.round(spousalMonthly),
    combinedMonthly: Math.round(optimal.monthly + spousalMonthly),
    combinedLifetime: Math.round((optimal.monthly + spousalMonthly) * 12 * (lifeExpectancy - optimal.claimAge)),
    lifeExpectancy
  }
}

export function calculateMortgageRecast(currentBalance: number, currentRate: number, remainingMonths: number, lumpSumPayment: number) {
  const monthlyRate = currentRate / 100 / 12
  const currentPayment = currentBalance * (monthlyRate * Math.pow(1 + monthlyRate, remainingMonths)) / (Math.pow(1 + monthlyRate, remainingMonths) - 1)
  const newBalance = currentBalance - lumpSumPayment
  const recastPayment = newBalance * (monthlyRate * Math.pow(1 + monthlyRate, remainingMonths)) / (Math.pow(1 + monthlyRate, remainingMonths) - 1)
  const monthlySavings = currentPayment - recastPayment
  const totalInterestCurrent = currentPayment * remainingMonths - currentBalance
  const totalInterestRecast = recastPayment * remainingMonths - newBalance
  const interestSaved = totalInterestCurrent - totalInterestRecast
  const recastFee = 250
  const netBenefit = interestSaved - recastFee
  return {
    currentPayment: Math.round(currentPayment * 100) / 100,
    recastPayment: Math.round(recastPayment * 100) / 100,
    monthlySavings: Math.round(monthlySavings * 100) / 100,
    totalInterestSaved: Math.round(interestSaved),
    recastFee, netBenefit: Math.round(netBenefit),
    paybackMonths: Math.round(recastFee / monthlySavings),
    vsExtraPayments: 'Recast keeps same term but lowers payment; extra payments keep same payment but shorten term'
  }
}

export function calculateRothIRAConversionTax(conversionAmount: number, currentAGI: number, filingStatus: 'single' | 'married', state: string, year: number) {
  const totalIncome = currentAGI + conversionAmount
  const stateRates: Record<string, number> = { CA: 0.093, NY: 0.0685, TX: 0, FL: 0, WA: 0, IL: 0.0495, GA: 0.055, NC: 0.0499, MA: 0.05, NJ: 0.0637, CO: 0.044, AZ: 0.025, OR: 0.099, MN: 0.0985 }
  const stdDed = filingStatus === 'married' ? 30000 : 15000
  const fedBrackets: [number, number][] = filingStatus === 'married'
    ? [[23200, 0.10], [94300, 0.12], [201050, 0.22], [383900, 0.24], [487450, 0.32], [731200, 0.35], [Infinity, 0.37]]
    : [[11600, 0.10], [47150, 0.12], [100525, 0.22], [191950, 0.24], [243725, 0.32], [609350, 0.35], [Infinity, 0.37]]
  const calcFed = (income: number) => {
    const taxable = Math.max(0, income - stdDed); let tax = 0, rem = taxable, prev = 0
    for (const [lim, rate] of fedBrackets) { const s = Math.min(rem, Number(lim) - prev); tax += s * rate; rem -= s; prev = Number(lim); if (rem <= 0) break }
    return tax
  }
  const fedOnConversion = calcFed(totalIncome) - calcFed(currentAGI)
  const stateRate = stateRates[state] || 0.05
  const stateOnConversion = conversionAmount * stateRate
  const totalTax = fedOnConversion + stateOnConversion
  const effectiveRate = totalTax / conversionAmount * 100
  const growth30 = conversionAmount * Math.pow(1.07, 30)
  const taxFreeGrowth = growth30 - conversionAmount
  const savedRetirementTax = taxFreeGrowth * 0.24
  const netBenefit = savedRetirementTax - totalTax
  return {
    conversionAmount, fedOnConversion: Math.round(fedOnConversion),
    stateOnConversion: Math.round(stateOnConversion), totalTax: Math.round(totalTax),
    effectiveRate: Math.round(effectiveRate * 10) / 10,
    growth30: Math.round(growth30), taxFreeGrowth: Math.round(taxFreeGrowth),
    savedRetirementTax: Math.round(savedRetirementTax), netBenefit: Math.round(netBenefit),
    worthConverting: netBenefit > 0,
    optimalConversionAmount: Math.round(Math.max(0, (filingStatus === 'married' ? 94300 : 47150) - currentAGI + stdDed))
  }
}

export function calculateSSvsPrivatePension(ssMonthly: number, pensionMonthly: number, age: number, pensionContribYears: number, totalContribPaid: number) {
  const ssLifetime = ssMonthly * 12 * Math.max(0, 85 - age)
  const pensionLifetime = pensionMonthly * 12 * Math.max(0, 85 - age)
  const ssCOLA = ssMonthly * 12 * ((Math.pow(1.025, Math.max(0, 85 - age)) - 1) / 0.025)
  const pensionCOLA = pensionMonthly * 12 * Math.max(0, 85 - age) * 1.0
  const roi = ((ssLifetime - totalContribPaid) / totalContribPaid) * 100
  const breakEven = totalContribPaid / (ssMonthly * 12)
  return {
    ssMonthly, pensionMonthly, ssLifetime: Math.round(ssLifetime),
    pensionLifetime: Math.round(pensionLifetime),
    ssBetter: ssLifetime > pensionLifetime,
    ssCOLAAdjusted: Math.round(ssCOLA), breakEvenYears: Math.round(breakEven * 10) / 10,
    roi: Math.round(roi), totalContribPaid,
    ssStrengths: ['Inflation-adjusted (COLA)', 'Survivor benefits for spouse', 'Disability protection (SSDI)', 'Cannot be depleted'],
    privateStrengths: ['Predictable fixed amount', 'May offer lump-sum option', 'Not dependent on Congress', 'May have cash value component']
  }
}

export function calculateFHLMCConformingLoan(homePrice: number, downPayment: number, loanType: 'conventional' | 'fha' | 'va' | 'usda', creditScore: number, rate: number) {
  const conformingLimit2026 = 806500
  const fhaLimit = 498257
  const loanAmount = homePrice - downPayment
  const isJumbo = loanAmount > conformingLimit2026
  const downPercent = downPayment / homePrice * 100
  const pmi = loanType === 'conventional' && downPercent < 20 ? loanAmount * (creditScore > 760 ? 0.003 : creditScore > 720 ? 0.005 : creditScore > 680 ? 0.008 : 0.012) / 12 : 0
  const mip = loanType === 'fha' ? loanAmount * 0.0055 / 12 : 0
  const vaFundingFee = loanType === 'va' ? loanAmount * (downPercent >= 10 ? 0.014 : downPercent >= 5 ? 0.015 : 0.023) : 0
  const monthlyRate = rate / 100 / 12
  const months = 360
  const piPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
  const totalMonthly = piPayment + pmi + mip
  return {
    loanAmount: Math.round(loanAmount), isJumbo, conformingLimit: conformingLimit2026,
    piPayment: Math.round(piPayment * 100) / 100, pmi: Math.round(pmi * 100) / 100,
    mip: Math.round(mip * 100) / 100, vaFundingFee: Math.round(vaFundingFee),
    totalMonthly: Math.round(totalMonthly * 100) / 100,
    downPercent: Math.round(downPercent * 10) / 10,
    pmiRemovalMonth: downPercent < 20 ? Math.round((homePrice * 0.80 - loanAmount) / (piPayment - loanAmount * monthlyRate) * -1) : 0,
    totalInterest: Math.round(piPayment * months - loanAmount)
  }
}

export function calculateRealEstateSyndicationROI(investmentAmount: number, preferredReturn: number, promoterSplit: number, holdYears: number, projectedIRR: number, annualCashYield: number) {
  const annualCashFlow = investmentAmount * annualCashYield / 100
  const totalCashDistributions = annualCashFlow * holdYears
  const preferredAmount = investmentAmount * preferredReturn / 100 * holdYears
  const abovePref = Math.max(0, totalCashDistributions - preferredAmount)
  const investorShare = preferredAmount + abovePref * (1 - promoterSplit / 100)
  const exitValue = investmentAmount * Math.pow(1 + projectedIRR / 100, holdYears)
  const exitProceeds = (exitValue - investmentAmount) * (1 - promoterSplit / 100) + investmentAmount
  const totalReturn = investorShare + exitProceeds - investmentAmount
  const equityMultiple = (investorShare + exitProceeds) / investmentAmount
  const actualIRR = (Math.pow((investorShare + exitProceeds) / investmentAmount, 1 / holdYears) - 1) * 100
  return {
    investmentAmount, annualCashFlow: Math.round(annualCashFlow),
    totalCashDistributions: Math.round(totalCashDistributions),
    investorShare: Math.round(investorShare), exitProceeds: Math.round(exitProceeds),
    totalReturn: Math.round(totalReturn), equityMultiple: Math.round(equityMultiple * 100) / 100,
    actualIRR: Math.round(actualIRR * 100) / 100,
    depreciation: Math.round(investmentAmount * 0.27 * holdYears / 39),
    accreditedOnly: investmentAmount >= 25000
  }
}

export function calculateMortgageVsRent(homePrice: number, downPayment: number, mortgageRate: number, monthlyRent: number, appreciationRate: number, rentInflation: number, years: number, taxRate: number) {
  const loanAmount = homePrice - downPayment
  const monthlyRate = mortgageRate / 100 / 12
  const months = 360
  const payment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
  const propTax = homePrice * 0.011 / 12
  const insurance = homePrice * 0.005 / 12
  const maintenance = homePrice * 0.01 / 12
  const totalOwningCost = payment + propTax + insurance + maintenance
  const mortgageInterestDeduction = loanAmount * mortgageRate / 100 * taxRate / 100 / 12 * 0.3 // rough deduction benefit
  const netOwningCost = totalOwningCost - mortgageInterestDeduction
  let cumulativeRent = 0, cumulativeBuy = downPayment
  for (let i = 0; i < years * 12; i++) {
    cumulativeRent += monthlyRent * Math.pow(1 + rentInflation / 100 / 12, i)
    cumulativeBuy += netOwningCost
  }
  const homeValueAtEnd = homePrice * Math.pow(1 + appreciationRate / 100, years)
  const equityAtEnd = homeValueAtEnd - (loanAmount * Math.pow(1 + monthlyRate, years * 12) - payment * ((Math.pow(1 + monthlyRate, years * 12) - 1) / monthlyRate))
  const buyNetCost = cumulativeBuy - equityAtEnd
  return {
    monthlyMortgage: Math.round(payment), totalOwningCost: Math.round(totalOwningCost),
    netOwningCost: Math.round(netOwningCost), monthlyRent,
    homeValueAtEnd: Math.round(homeValueAtEnd), equityAtEnd: Math.round(equityAtEnd),
    cumulativeRentPaid: Math.round(cumulativeRent), buyNetCost: Math.round(buyNetCost),
    rentWins: cumulativeRent < buyNetCost,
    breakEvenYear: Math.round(years * (buyNetCost / (buyNetCost + cumulativeRent))),
    appreciation: Math.round(homeValueAtEnd - homePrice)
  }
}

export function calculateSocialSecurityDelayROI(monthlyBenefit: number, fullRetirementAge: number, currentAge: number) {
  const FRA = fullRetirementAge
  const results = [62, 63, 64, 65, 66, 67, 68, 69, 70].map(claimAge => {
    const mEarly = (FRA - claimAge) * 12
    const mLate = (claimAge - FRA) * 12
    const reduction = claimAge < FRA ? (mEarly <= 36 ? mEarly * 5 / 9 / 100 : 36 * 5 / 9 / 100 + (mEarly - 36) * 5 / 12 / 100) : 0
    const increase = claimAge > FRA ? mLate * 8 / 12 / 100 : 0
    const adjBenefit = monthlyBenefit * (1 - reduction + increase)
    const lifetimeTo85 = adjBenefit * 12 * Math.max(0, 85 - claimAge)
    const lifetimeTo90 = adjBenefit * 12 * Math.max(0, 90 - claimAge)
    return { claimAge, adjBenefit: Math.round(adjBenefit), lifetimeTo85: Math.round(lifetimeTo85), lifetimeTo90: Math.round(lifetimeTo90) }
  })
  const optimal85 = results.reduce((b, r) => r.lifetimeTo85 > b.lifetimeTo85 ? r : b)
  const optimal90 = results.reduce((b, r) => r.lifetimeTo90 > b.lifetimeTo90 ? r : b)
  return { results, optimal85, optimal90, benefitAt62: results[0].adjBenefit, benefitAt67: results.find(r => r.claimAge === 67)?.adjBenefit || monthlyBenefit, benefitAt70: results[results.length - 1].adjBenefit, delayROI: Math.round((results[results.length - 1].adjBenefit / results[0].adjBenefit - 1) * 100) }
}

export function calculateEarlyMortgagePayoff(balance: number, rate: number, remainingYears: number, extraMonthly: number, extraAnnual: number) {
  const monthlyRate = rate / 100 / 12
  const months = remainingYears * 12
  const minPayment = balance * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
  const totalInterestMin = minPayment * months - balance
  let bal = balance, monthsPaid = 0, interestPaidExtra = 0
  const yearData = [{ year: 0, balance: Math.round(bal) }]
  while (bal > 0 && monthsPaid < months) {
    const int = bal * monthlyRate; interestPaidExtra += int
    const payment = minPayment + extraMonthly + (monthsPaid % 12 === 11 ? extraAnnual : 0)
    bal = Math.max(0, bal + int - payment); monthsPaid++
    if (monthsPaid % 12 === 0) yearData.push({ year: monthsPaid / 12, balance: Math.round(bal) })
  }
  const interestSaved = totalInterestMin - interestPaidExtra
  const yearsSaved = (months - monthsPaid) / 12
  return {
    minPayment: Math.round(minPayment * 100) / 100,
    totalInterestMin: Math.round(totalInterestMin),
    monthsPaidWithExtra: monthsPaid, interestPaidExtra: Math.round(interestPaidExtra),
    interestSaved: Math.round(interestSaved), yearsSaved: Math.round(yearsSaved * 10) / 10,
    payoffAge: Math.round(remainingYears - yearsSaved + 35),
    extraMonthlyROI: Math.round(interestSaved / (extraMonthly * monthsPaid + extraAnnual * Math.floor(monthsPaid / 12)) * 100),
    yearData
  }
}

export function calculateAnnualFeeVsNoFeeCard(annualFee: number, rewardsRate: number, noFeeRewardsRate: number, monthlySpend: number, redemptionValue: number) {
  const annualSpend = monthlySpend * 12
  const feeCardRewards = annualSpend * rewardsRate / 100 * redemptionValue
  const noFeeCardRewards = annualSpend * noFeeRewardsRate / 100
  const feeCardNet = feeCardRewards - annualFee
  const difference = feeCardNet - noFeeCardRewards
  const breakEvenSpend = annualFee / ((rewardsRate - noFeeRewardsRate) / 100 * redemptionValue)
  const breakEvenMonthly = breakEvenSpend / 12
  return {
    annualSpend, feeCardRewards: Math.round(feeCardRewards),
    feeCardNet: Math.round(feeCardNet), noFeeCardRewards: Math.round(noFeeCardRewards),
    difference: Math.round(difference), worthAnnualFee: difference > 0,
    breakEvenMonthlySpend: Math.round(breakEvenMonthly),
    breakEvenAnnualSpend: Math.round(breakEvenSpend),
    currentSpendAboveBreakEven: monthlySpend > breakEvenMonthly
  }
}

export function calculateForbearanceVsRepayment(balance: number, rate: number, forbearanceMonths: number, resumePayment: number) {
  const monthlyRate = rate / 100 / 12
  const interestAccrued = balance * monthlyRate * forbearanceMonths
  const newBalance = balance + interestAccrued
  const originalPayment = balance * (monthlyRate * Math.pow(1 + monthlyRate, 360)) / (Math.pow(1 + monthlyRate, 360) - 1)
  const newPayment = newBalance * (monthlyRate * Math.pow(1 + monthlyRate, 360 - forbearanceMonths)) / (Math.pow(1 + monthlyRate, 360 - forbearanceMonths) - 1)
  const totalInterestOriginal = originalPayment * 360 - balance
  const totalInterestNew = newPayment * (360 - forbearanceMonths) - newBalance
  const totalCostForbearance = interestAccrued + totalInterestNew - totalInterestOriginal
  return {
    originalPayment: Math.round(originalPayment * 100) / 100,
    interestAccrued: Math.round(interestAccrued),
    newBalance: Math.round(newBalance),
    newPayment: Math.round(newPayment * 100) / 100,
    paymentIncrease: Math.round((newPayment - originalPayment) * 100) / 100,
    totalCostForbearance: Math.round(totalCostForbearance),
    alternatives: ['Deferment (interest may not accrue on subsidized loans)', 'Income-driven repayment plan', 'Extended repayment term', 'Graduated repayment plan'],
    recommendation: totalCostForbearance > 5000 ? 'Explore IDR plan instead — may cost less long-term' : 'Forbearance manageable if truly temporary hardship'
  }
}

export function calculateGoldVsStocks(goldAmount: number, stockAmount: number, goldAllocation: number, years: number) {
  const stockAllocation = 100 - goldAllocation
  const totalAmount = goldAmount + stockAmount
  const goldReturn = 1.06, stockReturn = 1.10
  const portfolioReturn = (goldAllocation / 100 * goldReturn) + (stockAllocation / 100 * stockReturn)
  const goldFinalValue = totalAmount * (goldAllocation / 100) * Math.pow(goldReturn, years)
  const stockFinalValue = totalAmount * (stockAllocation / 100) * Math.pow(stockReturn, years)
  const blendedFinal = goldFinalValue + stockFinalValue
  const allStockFinal = totalAmount * Math.pow(stockReturn, years)
  const allGoldFinal = totalAmount * Math.pow(goldReturn, years)
  const hedgeValue = blendedFinal * (1 - 0.15) // 15% crash protection from gold hedge
  return {
    goldFinalValue: Math.round(goldFinalValue), stockFinalValue: Math.round(stockFinalValue),
    blendedFinal: Math.round(blendedFinal), allStockFinal: Math.round(allStockFinal),
    allGoldFinal: Math.round(allGoldFinal), hedgeValue: Math.round(hedgeValue),
    annualizedReturn: Math.round((portfolioReturn - 1) * 1000) / 10,
    diversificationBenefit: Math.round(hedgeValue - allStockFinal),
    yearData: Array.from({ length: years + 1 }, (_, i) => ({
      year: i, blended: Math.round(totalAmount * Math.pow(portfolioReturn, i)),
      allStock: Math.round(totalAmount * Math.pow(stockReturn, i)),
      allGold: Math.round(totalAmount * Math.pow(goldReturn, i))
    }))
  }
}

export function calculateRentersInsurance(personalPropertyValue: number, liabilityLimit: number, deductible: number, state: string, zipCode: string) {
  const stateMultipliers: Record<string, number> = { LA: 1.4, FL: 1.35, TX: 1.25, OK: 1.2, MS: 1.15, CA: 1.1, NY: 1.05, WA: 0.95, OR: 0.92, MN: 0.90, WI: 0.88 }
  const baseRate = 0.004 // 0.4% of personal property value annually
  const stateMultiplier = stateMultipliers[state] || 1.0
  const deductibleDiscount = deductible > 500 ? 0.10 : deductible > 1000 ? 0.20 : 0
  const liabilityAdd = liabilityLimit > 100000 ? (liabilityLimit - 100000) / 100000 * 10 : 0
  const annualPremium = personalPropertyValue * baseRate * stateMultiplier * (1 - deductibleDiscount) + liabilityAdd
  const monthlyPremium = annualPremium / 12
  const coveragePerDollar = personalPropertyValue / annualPremium
  return {
    annualPremium: Math.round(annualPremium), monthlyPremium: Math.round(monthlyPremium * 100) / 100,
    personalPropertyCoverage: personalPropertyValue, liabilityLimit, deductible,
    coveragePerDollar: Math.round(coveragePerDollar),
    replacementCostAdd: Math.round(annualPremium * 0.10),
    bundleDiscount: 'Save 5-15% by bundling with auto insurance',
    averageClaimAmount: 6500,
    worthIt: annualPremium < personalPropertyValue * 0.01
  }
}

export function calculateBuyVsLeaseVehicle(vehiclePrice: number, downPayment: number, loanRate: number, loanTermMonths: number, leasePayment: number, leaseTermMonths: number, leaseDownPayment: number, milesPerYear: number, residualValue: number) {
  const loanAmount = vehiclePrice - downPayment
  const monthlyRate = loanRate / 100 / 12
  const loanPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths)) / (Math.pow(1 + monthlyRate, loanTermMonths) - 1)
  const totalBuyCost = downPayment + loanPayment * loanTermMonths
  const totalLeaseCost = leaseDownPayment + leasePayment * leaseTermMonths
  const vehicleValueAtEnd = vehiclePrice * Math.pow(0.85, loanTermMonths / 12)
  const buyNetCost = totalBuyCost - vehicleValueAtEnd
  const overMileageFee = Math.max(0, milesPerYear - 12000) * 0.25 * leaseTermMonths / 12
  const leaseNetCost = totalLeaseCost + overMileageFee
  return {
    loanPayment: Math.round(loanPayment * 100) / 100,
    totalBuyCost: Math.round(totalBuyCost), totalLeaseCost: Math.round(totalLeaseCost),
    vehicleValueAtEnd: Math.round(vehicleValueAtEnd),
    buyNetCost: Math.round(buyNetCost), leaseNetCost: Math.round(leaseNetCost),
    overMileageFee: Math.round(overMileageFee),
    buyWins: buyNetCost < leaseNetCost,
    difference: Math.round(Math.abs(buyNetCost - leaseNetCost)),
    recommendation: milesPerYear > 15000 ? 'Buy — high mileage makes leasing expensive' : leasePayment * leaseTermMonths < loanPayment * loanTermMonths * 0.7 ? 'Lease — significantly lower monthly cost' : 'Buy — better long-term value if keeping vehicle 5+ years'
  }
}

export function calculateFreelanceIncome(hourlyRate: number, billableHours: number, selfEmploymentTaxRate: number, businessExpenses: number, healthInsurance: number, retirementContrib: number) {
  const grossRevenue = hourlyRate * billableHours
  const netSEIncome = grossRevenue - businessExpenses - healthInsurance
  const seTax = netSEIncome * 0.9235 * 0.153
  const seDeduction = seTax / 2
  const qbiDeduction = (netSEIncome - seDeduction) * 0.20
  const federalTaxable = Math.max(0, netSEIncome - seDeduction - qbiDeduction - retirementContrib - 15000)
  const federalTax = federalTaxable * selfEmploymentTaxRate / 100
  const totalTax = seTax + federalTax
  const netTakeHome = grossRevenue - businessExpenses - healthInsurance - seTax - federalTax - retirementContrib
  const effectiveHourlyRate = netTakeHome / billableHours
  const equivalentSalary = netTakeHome * (1 / (1 - 0.30))
  return {
    grossRevenue: Math.round(grossRevenue), netSEIncome: Math.round(netSEIncome),
    seTax: Math.round(seTax), seDeduction: Math.round(seDeduction),
    qbiDeduction: Math.round(qbiDeduction), federalTax: Math.round(federalTax),
    totalTax: Math.round(totalTax), netTakeHome: Math.round(netTakeHome),
    effectiveHourlyRate: Math.round(effectiveHourlyRate * 100) / 100,
    equivalentSalary: Math.round(equivalentSalary),
    quarterly: Math.round(totalTax / 4)
  }
}

export function calculateCryptoProfitLossTracking(entries: Array<{ date: string; type: 'buy' | 'sell'; amount: number; price: number }>) {
  const safe = entries || [{ date: '2024-01-01', type: 'buy' as const, amount: 0.5, price: 42000 }, { date: '2024-06-01', type: 'sell' as const, amount: 0.3, price: 65000 }]
  let totalBought = 0, totalCostBasis = 0, totalSold = 0, totalProceeds = 0, realizedGain = 0
  const avgCost: number[] = []
  safe.forEach(e => {
    if (e.type === 'buy') { totalBought += e.amount; totalCostBasis += e.amount * e.price; avgCost.push(e.price) }
    else { totalSold += e.amount; totalProceeds += e.amount * e.price; const avg = totalCostBasis / Math.max(totalBought, 0.001); realizedGain += e.amount * (e.price - avg) }
  })
  const avgCostBasis = totalBought > 0 ? totalCostBasis / totalBought : 0
  const remainingShares = totalBought - totalSold
  return {
    totalBought: Math.round(totalBought * 10000) / 10000, totalCostBasis: Math.round(totalCostBasis),
    avgCostBasis: Math.round(avgCostBasis), totalSold: Math.round(totalSold * 10000) / 10000,
    totalProceeds: Math.round(totalProceeds), realizedGain: Math.round(realizedGain),
    remainingShares: Math.round(remainingShares * 10000) / 10000,
    taxAtLTCG: Math.round(Math.max(0, realizedGain) * 0.15),
    taxAtSTCG: Math.round(Math.max(0, realizedGain) * 0.32),
    washSaleNote: 'Crypto is NOT subject to wash sale rules — losses can be harvested and immediately repurchased'
  }
}

export function calculateVestingScheduleValue(totalGrant: number, vestingSchedule: '4yr-cliff' | '3yr-monthly' | '4yr-monthly' | 'immediate', currentPrice: number, projectedGrowth: number, taxRate: number) {
  const schedules: Record<string, number[]> = {
    '4yr-cliff': [0, 0, 0, 0.25, 0.0625, 0.0625, 0.0625, 0.0625, 0.0625, 0.0625, 0.0625, 0.0625, 0.0625, 0.0625, 0.0625, 0.0625],
    '4yr-monthly': Array.from({ length: 48 }, () => 1 / 48),
    '3yr-monthly': Array.from({ length: 36 }, () => 1 / 36),
    'immediate': [1]
  }
  const schedule = schedules[vestingSchedule] || schedules['4yr-monthly']
  let cumVested = 0, cumValue = 0, cumTax = 0
  const yearData = schedule.reduce((acc: Record<number, number>, pct, i) => {
    const yr = Math.floor(i / 12)
    acc[yr] = (acc[yr] || 0) + pct
    return acc
  }, {})
  const annualVesting = Object.entries(yearData).map(([yr, pct]) => {
    const shares = totalGrant * pct
    const price = currentPrice * Math.pow(1 + projectedGrowth / 100, Number(yr))
    const value = shares * price
    const tax = value * taxRate / 100
    cumVested += shares; cumValue += value; cumTax += tax
    return { year: Number(yr), sharesVested: Math.round(shares), price: Math.round(price), vestValue: Math.round(value), tax: Math.round(tax), netValue: Math.round(value - tax), cumVested: Math.round(cumVested), cumValue: Math.round(cumValue) }
  })
  return {
    totalGrant, totalCurrentValue: Math.round(totalGrant * currentPrice),
    projectedTotalValue: Math.round(cumValue), totalTax: Math.round(cumTax),
    netValue: Math.round(cumValue - cumTax), annualVesting,
    yearData: annualVesting.map(a => ({ year: a.year, value: a.cumValue }))
  }
}

export function calculateSPYvsBTC(initialAmount: number, years: number, spyAllocation: number, btcAllocation: number, cashAllocation: number) {
  const spyReturn = 0.10, btcReturn = 0.45, cashReturn = 0.048 // historical/projected
  const btcVolatility = 0.80 // 80% annual std dev
  const spyFinal = initialAmount * (spyAllocation / 100) * Math.pow(1 + spyReturn, years)
  const btcFinal = initialAmount * (btcAllocation / 100) * Math.pow(1 + btcReturn, years)
  const cashFinal = initialAmount * (cashAllocation / 100) * Math.pow(1 + cashReturn, years)
  const portfolioFinal = spyFinal + btcFinal + cashFinal
  const allSpyFinal = initialAmount * Math.pow(1 + spyReturn, years)
  const allBtcFinal = initialAmount * Math.pow(1 + btcReturn, years)
  const worstCase = initialAmount * (spyAllocation / 100) * Math.pow(1 + spyReturn * 0.5, years) + initialAmount * (btcAllocation / 100) * Math.pow(1 - 0.75, years) + cashFinal
  return {
    spyFinal: Math.round(spyFinal), btcFinal: Math.round(btcFinal),
    cashFinal: Math.round(cashFinal), portfolioFinal: Math.round(portfolioFinal),
    allSpyFinal: Math.round(allSpyFinal), allBtcFinal: Math.round(allBtcFinal),
    worstCase: Math.round(worstCase),
    portfolioCAGR: Math.round((Math.pow(portfolioFinal / initialAmount, 1 / years) - 1) * 1000) / 10,
    btcContribution: Math.round((btcFinal - initialAmount * btcAllocation / 100) / (portfolioFinal - initialAmount) * 100),
    riskNote: `Bitcoin historically loses 70-80% in bear markets — ${btcAllocation}% allocation could drop portfolio by ${Math.round(btcAllocation * 0.75)}% in a crash`,
    yearData: Array.from({ length: years + 1 }, (_, i) => ({
      year: i,
      portfolio: Math.round(initialAmount * ((spyAllocation / 100) * Math.pow(1 + spyReturn, i) + (btcAllocation / 100) * Math.pow(1 + btcReturn, i) + (cashAllocation / 100) * Math.pow(1 + cashReturn, i))),
      allSpy: Math.round(initialAmount * Math.pow(1 + spyReturn, i))
    }))
  }
}

export function calculatePaycheckContributionOptimizer(grossPay: number, payFrequency: number, current401k: number, currentHSA: number, currentFSA: number, taxRate: number) {
  const annualGross = grossPay * payFrequency
  const limit401k = 23500, limitHSA = 4300, limitFSA = 3300
  const opt401k = Math.min(limit401k / payFrequency, grossPay * 0.50)
  const optHSA = limitHSA / payFrequency
  const optFSA = Math.min(limitFSA / payFrequency, 275)
  const currentPreTax = current401k + currentHSA + currentFSA
  const optimalPreTax = opt401k + optHSA + optFSA
  const currentTaxSavings = currentPreTax * payFrequency * taxRate / 100
  const optimalTaxSavings = optimalPreTax * payFrequency * taxRate / 100
  const additionalSavings = optimalTaxSavings - currentTaxSavings
  const netPayCurrent = grossPay - currentPreTax - (grossPay - currentPreTax) * taxRate / 100
  const netPayOptimal = grossPay - optimalPreTax - (grossPay - optimalPreTax) * taxRate / 100
  return {
    grossPay, payFrequency, annualGross,
    current401k, currentHSA, currentFSA,
    opt401k: Math.round(opt401k * 100) / 100,
    optHSA: Math.round(optHSA * 100) / 100,
    optFSA: Math.round(optFSA * 100) / 100,
    currentTaxSavings: Math.round(currentTaxSavings),
    optimalTaxSavings: Math.round(optimalTaxSavings),
    additionalSavings: Math.round(additionalSavings),
    netPayCurrent: Math.round(netPayCurrent * 100) / 100,
    netPayOptimal: Math.round(netPayOptimal * 100) / 100,
    netPayChange: Math.round((netPayOptimal - netPayCurrent) * 100) / 100
  }
}

export function calculateLoanOriginationFee(loanAmount: number, originationFeePercent: number, interestRate: number, loanTermYears: number, alternativeRate: number) {
  const originationFee = loanAmount * originationFeePercent / 100
  const monthlyRate1 = interestRate / 100 / 12
  const monthlyRate2 = alternativeRate / 100 / 12
  const months = loanTermYears * 12
  const payment1 = loanAmount * (monthlyRate1 * Math.pow(1 + monthlyRate1, months)) / (Math.pow(1 + monthlyRate1, months) - 1)
  const payment2 = loanAmount * (monthlyRate2 * Math.pow(1 + monthlyRate2, months)) / (Math.pow(1 + monthlyRate2, months) - 1)
  const totalCost1 = payment1 * months + originationFee
  const totalCost2 = payment2 * months
  const apr = interestRate + originationFeePercent / loanTermYears
  const monthlySavingsNoFee = payment2 - payment1
  const breakEvenMonths = monthlySavingsNoFee > 0 ? Math.round(originationFee / monthlySavingsNoFee) : 999
  return {
    originationFee: Math.round(originationFee),
    monthlyPayment: Math.round(payment1 * 100) / 100,
    totalCostWithFee: Math.round(totalCost1),
    totalCostNoFee: Math.round(totalCost2),
    effectiveAPR: Math.round(apr * 100) / 100,
    breakEvenMonths,
    worthPaying: totalCost1 < totalCost2,
    totalInterest: Math.round(payment1 * months - loanAmount),
    recommendation: originationFeePercent > 1.5 ? 'High fee — negotiate down or shop other lenders' : originationFeePercent > 0.5 ? 'Moderate fee — compare APR across lenders' : 'Low fee — acceptable if rate is competitive'
  }
}

export function calculatePersonalFinanceScore(monthlyIncome: number, monthlyExpenses: number, emergencyFund: number, totalDebt: number, retirementSaved: number, creditScore: number, age: number) {
  const savingsRate = Math.max(0, (monthlyIncome - monthlyExpenses) / monthlyIncome * 100)
  const emergencyMonths = emergencyFund / Math.max(1, monthlyExpenses)
  const debtToIncome = totalDebt / (monthlyIncome * 12) * 100
  const retirementBenchmark = monthlyIncome * 12 * (age / 10)
  const retirementRatio = retirementSaved / Math.max(1, retirementBenchmark) * 100
  // Score each category 0-20
  const savingsScore = Math.min(20, savingsRate / 20 * 20)
  const emergencyScore = Math.min(20, emergencyMonths / 6 * 20)
  const debtScore = Math.min(20, Math.max(0, 20 - debtToIncome / 5))
  const retirementScore = Math.min(20, retirementRatio / 100 * 20)
  const creditScorePoints = Math.min(20, (creditScore - 580) / (850 - 580) * 20)
  const totalScore = Math.round(savingsScore + emergencyScore + debtScore + retirementScore + creditScorePoints)
  const grade = totalScore >= 85 ? 'A' : totalScore >= 70 ? 'B' : totalScore >= 55 ? 'C' : totalScore >= 40 ? 'D' : 'F'
  return {
    totalScore, grade,
    savingsScore: Math.round(savingsScore), emergencyScore: Math.round(emergencyScore),
    debtScore: Math.round(debtScore), retirementScore: Math.round(retirementScore),
    creditScorePoints: Math.round(creditScorePoints),
    savingsRate: Math.round(savingsRate * 10) / 10,
    emergencyMonths: Math.round(emergencyMonths * 10) / 10,
    debtToIncome: Math.round(debtToIncome * 10) / 10,
    retirementRatio: Math.round(retirementRatio),
    topPriority: savingsScore < 10 ? 'Increase savings rate to 15%+' : emergencyScore < 10 ? 'Build emergency fund to 3-6 months' : debtScore < 10 ? 'Reduce debt-to-income ratio below 20%' : retirementScore < 10 ? 'Increase retirement contributions' : 'Maintain current strong financial habits'
  }
}

export function calculateSavingsGoalPlanner(goalAmount: number, currentSavings: number, monthlySavings: number, annualReturn: number, targetYears: number) {
  const monthlyRate = annualReturn / 100 / 12
  const months = targetYears * 12
  const futureValue = currentSavings * Math.pow(1 + monthlyRate, months) + monthlySavings * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
  const gap = Math.max(0, goalAmount - futureValue)
  const requiredMonthly = gap > 0 ? gap / ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) + monthlySavings : monthlySavings
  const monthsRequired = Math.log((goalAmount * monthlyRate / monthlySavings + 1)) / Math.log(1 + monthlyRate)
  const onTrack = futureValue >= goalAmount
  const coveragePercent = Math.min(999, Math.round(futureValue / goalAmount * 100))
  const yearData = Array.from({ length: targetYears + 1 }, (_, i) => ({
    year: i,
    savings: Math.round(currentSavings * Math.pow(1 + monthlyRate, i * 12) + monthlySavings * ((Math.pow(1 + monthlyRate, i * 12) - 1) / monthlyRate)),
    goal: Math.round(goalAmount)
  }))
  return {
    futureValue: Math.round(futureValue), goalAmount, gap: Math.round(gap),
    onTrack, coveragePercent, requiredMonthly: Math.round(requiredMonthly),
    monthsRequired: Math.round(monthsRequired),
    totalContributions: Math.round(monthlySavings * months + currentSavings),
    interestEarned: Math.round(futureValue - monthlySavings * months - currentSavings),
    yearData
  }
}

export function calculateTaxBracketOptimizer(ordinaryIncome: number, capitalGains: number, qualifiedDividends: number, filingStatus: 'single'|'married', deductions: number, credits: number) {
  const stdDed = filingStatus==='married' ? 30000 : 15000
  const totalDed = Math.max(stdDed, deductions)
  const taxableOrdinary = Math.max(0, ordinaryIncome - totalDed)
  const brackets: [number,number][] = filingStatus==='married'
    ? [[23200,0.10],[94300,0.12],[201050,0.22],[383900,0.24],[487450,0.32],[731200,0.35],[Infinity,0.37]]
    : [[11600,0.10],[47150,0.12],[100525,0.22],[191950,0.24],[243725,0.32],[609350,0.35],[Infinity,0.37]]
  let ordTax=0, rem=taxableOrdinary, prev=0
  const bracketBreakdown: {bracket:string,rate:number,taxable:number,tax:number}[] = []
  for(const [lim,rate] of brackets){
    const s=Math.min(rem,Number(lim)-prev)
    if(s>0){ ordTax+=s*rate; bracketBreakdown.push({bracket:`$${prev.toLocaleString()}–$${Number(lim)===Infinity?'∞':Number(lim).toLocaleString()}`,rate:rate*100,taxable:Math.round(s),tax:Math.round(s*rate)}) }
    rem-=s; prev=Number(lim); if(rem<=0) break
  }
  const lgThresh = filingStatus==='married' ? [[96700,0],[600050,0.15],[Infinity,0.20]] : [[48350,0],[533400,0.15],[Infinity,0.20]]
  const totalIncome = ordinaryIncome + capitalGains + qualifiedDividends
  let lgTax=0, lgRem=capitalGains+qualifiedDividends, lgPrev=0
  for(const [lim,rate] of lgThresh){ const s=Math.min(lgRem,Number(lim)-lgPrev); lgTax+=s*Number(rate); lgRem-=s; lgPrev=Number(lim); if(lgRem<=0) break }
  const totalTax = Math.max(0, ordTax + lgTax - credits)
  const effectiveRate = totalIncome>0 ? totalTax/totalIncome*100 : 0
  const marginalRate = bracketBreakdown[bracketBreakdown.length-1]?.rate || 10
  const roomInBracket = bracketBreakdown.length>0 ? Math.round(Number(brackets[bracketBreakdown.length-1][0]) - taxableOrdinary) : 0
  return {
    taxableOrdinary:Math.round(taxableOrdinary), ordinaryTax:Math.round(ordTax),
    capitalGainsTax:Math.round(lgTax), totalTax:Math.round(totalTax),
    effectiveRate:Math.round(effectiveRate*10)/10, marginalRate,
    roomInCurrentBracket:Math.max(0,roomInBracket),
    bracketBreakdown, afterTaxIncome:Math.round(totalIncome-totalTax),
    optimizations:['Max 401k/IRA to reduce taxable ordinary income','Harvest capital losses to offset gains','Convert to Roth IRA in low-income years','Consider QCDs after age 70½ to reduce AGI']
  }
}

export function calculateNetWorthSnapshot(assets:{cash:number,investments:number,retirement:number,realEstate:number,vehicles:number,other:number}, liabilities:{mortgage:number,studentLoans:number,carLoans:number,creditCards:number,otherDebt:number}) {
  const totalAssets = Object.values(assets).reduce((s,v)=>s+v,0)
  const totalLiabilities = Object.values(liabilities).reduce((s,v)=>s+v,0)
  const netWorth = totalAssets - totalLiabilities
  const liquidAssets = assets.cash + assets.investments
  const illiquidAssets = assets.retirement + assets.realEstate + assets.vehicles + assets.other
  const debtToAsset = totalAssets>0 ? totalLiabilities/totalAssets*100 : 0
  const liquidityRatio = totalLiabilities>0 ? liquidAssets/totalLiabilities : 999
  const medianUSNetWorth2026 = 192700
  const percentileEst = netWorth < 0 ? 10 : netWorth < 50000 ? 25 : netWorth < 192700 ? 50 : netWorth < 500000 ? 70 : netWorth < 1000000 ? 85 : netWorth < 3000000 ? 95 : 99
  return {
    totalAssets:Math.round(totalAssets), totalLiabilities:Math.round(totalLiabilities),
    netWorth:Math.round(netWorth), liquidAssets:Math.round(liquidAssets),
    illiquidAssets:Math.round(illiquidAssets), debtToAsset:Math.round(debtToAsset*10)/10,
    liquidityRatio:Math.round(liquidityRatio*100)/100,
    percentileEst, medianUSNetWorth:medianUSNetWorth2026,
    vsMedian:Math.round(netWorth-medianUSNetWorth2026),
    assetAllocation:{cash:Math.round(assets.cash/totalAssets*100),investments:Math.round(assets.investments/totalAssets*100),retirement:Math.round(assets.retirement/totalAssets*100),realEstate:Math.round(assets.realEstate/totalAssets*100)},
    health: netWorth<0?'Negative net worth — focus on debt reduction':netWorth<50000?'Building phase — increase savings rate':netWorth<500000?'Growth phase — optimize investments':netWorth<1000000?'Accumulation phase — tax optimization matters':'Wealth phase — estate planning and asset protection'
  }
}

export function calculateDCAvsLumpSum(totalAmount: number, dcaMonths: number, startPrice: number, endPrice: number, assetType: 'stock'|'index'|'crypto') {
  const priceStep = (endPrice-startPrice)/dcaMonths
  const volatilityFactor = assetType==='crypto' ? 0.20 : assetType==='stock' ? 0.05 : 0.03
  let dcaShares=0, dcaCost=0
  const monthlyBuy = totalAmount/dcaMonths
  const dcaData = []
  for(let m=0;m<dcaMonths;m++){
    const noise = Math.sin(m*1.3+assetType.length)*startPrice*volatilityFactor
    const price = Math.max(1, startPrice+priceStep*m+noise)
    dcaShares += monthlyBuy/price
    dcaCost += monthlyBuy
    dcaData.push({month:m+1, price:Math.round(price*100)/100, dcaValue:Math.round(dcaShares*endPrice), lsValue:Math.round(totalAmount/startPrice*endPrice)})
  }
  const dcaValue = dcaShares*endPrice
  const lsValue = totalAmount/startPrice*endPrice
  const dcaAvgPrice = dcaCost/dcaShares
  return {
    totalAmount, dcaMonthlyBuy:Math.round(monthlyBuy),
    dcaShares:Math.round(dcaShares*10000)/10000,
    dcaAvgPrice:Math.round(dcaAvgPrice*100)/100,
    dcaValue:Math.round(dcaValue), dcaROI:Math.round((dcaValue/totalAmount-1)*10000)/100,
    lsShares:Math.round(totalAmount/startPrice*10000)/10000,
    lsValue:Math.round(lsValue), lsROI:Math.round((lsValue/totalAmount-1)*10000)/100,
    winner: dcaValue>lsValue?'DCA':'Lump Sum',
    difference:Math.round(Math.abs(dcaValue-lsValue)),
    yearData:dcaData
  }
}
