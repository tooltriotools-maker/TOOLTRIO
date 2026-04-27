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
