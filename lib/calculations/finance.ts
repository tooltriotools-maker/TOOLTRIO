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
  // Simplified FRA-67 model. SSA benefit estimates should come from the claimant's
  // earnings record; this function is an educational claiming-age comparison only.
  const fra = 67
  const benefitAt62 = monthlyBenefit62
  const pia = benefitAt62 / 0.70

  const benefitAtAge = (age: number) => {
    const monthsEarly = Math.max(0, Math.round((fra - age) * 12))
    const monthsLate = Math.max(0, Math.round((age - fra) * 12))
    let factor = 1
    if (monthsEarly > 0) {
      const first36 = Math.min(monthsEarly, 36)
      const remaining = Math.max(0, monthsEarly - 36)
      factor -= first36 * (5 / 9 / 100) + remaining * (5 / 12 / 100)
    } else if (monthsLate > 0) {
      factor += monthsLate * (8 / 12 / 100)
    }
    return pia * factor
  }

  const adjustedMonthly = benefitAtAge(startAge)
  const lifeExpectancy = 85
  const totalBenefit = adjustedMonthly * 12 * Math.max(0, lifeExpectancy - startAge)
  const scenarios = [62, 64, 65, 66, 67, 68, 70].map(age => {
    const monthly = benefitAtAge(age)
    const total = monthly * 12 * Math.max(0, lifeExpectancy - age)
    return { age, monthly: Math.round(monthly), total: Math.round(total), pct: Math.round((monthly / pia) * 100) }
  })

  const laterMonthly = adjustedMonthly
  const monthsForegone = Math.max(0, startAge - 62) * 12
  const foregoneBenefits = benefitAt62 * monthsForegone
  const monthlyGain = laterMonthly - benefitAt62
  const breakEvenAge62 = monthlyGain > 0
    ? Math.round((startAge + foregoneBenefits / (monthlyGain * 12)) * 10) / 10
    : null

  return { adjustedMonthly: Math.round(adjustedMonthly), totalBenefit: Math.round(totalBenefit), adjustmentPct: Math.round((adjustedMonthly / pia) * 100), scenarios, breakEvenAge62, fra, currentAge }
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
  const standardDeductions: Record<string, number> = { single: 16100, married: 32200, hoh: 24150 }
  const taxableAfterDeduction = Math.max(0, federalTaxableIncome - standardDeductions[filingStatus])
  // 2026 Federal tax brackets (approximate)
  let federalTaxAnnual = 0
  const brackets = filingStatus === 'married'
    ? [[24800, 0.10], [100800, 0.12], [211400, 0.22], [403550, 0.24], [512450, 0.32], [768700, 0.35], [Infinity, 0.37]]
    : filingStatus === 'hoh'
      ? [[17700, 0.10], [67450, 0.12], [105700, 0.22], [201750, 0.24], [256200, 0.32], [640600, 0.35], [Infinity, 0.37]]
      : [[12400, 0.10], [50400, 0.12], [105700, 0.22], [201775, 0.24], [256225, 0.32], [640600, 0.35], [Infinity, 0.37]]
  let prev = 0
  for (const [limit, rate] of brackets as [number, number][]) {
    if (taxableAfterDeduction <= prev) break
    federalTaxAnnual += (Math.min(taxableAfterDeduction, limit as number) - prev) * rate
    prev = limit as number
  }
  const federalTaxPerPeriod = federalTaxAnnual / periodsPerYear
  const ssPerPeriod = Math.min(grossPerPeriod, 184500 / periodsPerYear) * 0.062
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
  // England/Northern Ireland residential SDLT rates from 1 April 2025.
  // Scotland/Wales use different devolved taxes and are not modelled here.
  let brackets: { limit: number; rate: number }[]

  if (buyerType === 'additionalProperty') {
    brackets = [
      { limit: 125000, rate: 0.05 },
      { limit: 250000, rate: 0.07 },
      { limit: 925000, rate: 0.10 },
      { limit: 1500000, rate: 0.15 },
      { limit: Infinity, rate: 0.17 },
    ]
  } else if (buyerType === 'firstTime' && propertyPrice <= 500000) {
    brackets = [
      { limit: 300000, rate: 0 },
      { limit: 500000, rate: 0.05 },
      { limit: Infinity, rate: 0.05 },
    ]
  } else {
    brackets = [
      { limit: 125000, rate: 0 },
      { limit: 250000, rate: 0.02 },
      { limit: 925000, rate: 0.05 },
      { limit: 1500000, rate: 0.10 },
      { limit: Infinity, rate: 0.12 },
    ]
  }

  let tax = 0
  let prev = 0
  for (const { limit, rate } of brackets) {
    if (propertyPrice <= prev) break
    tax += (Math.min(propertyPrice, limit) - prev) * rate
    prev = limit
  }

  const effectiveRate = propertyPrice > 0 ? (tax / propertyPrice) * 100 : 0
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
  const rothLimit2026 = filingStatus === 'single' ? 168000 : 252000
  const proRataRatio = totalIRABalance > 0 ? nonDeductibleBasis / totalIRABalance : 1
  const taxableConversion = conversionAmount * (1 - proRataRatio)
  const taxDue = taxableConversion * (taxRate / 100)
  const taxFreeGrowth = conversionAmount
  const eligible = income > rothLimit2026
  return { eligible, proRataRatio, taxableConversion, taxFreeConversion: conversionAmount - taxableConversion, taxDue, annualSavings: taxFreeGrowth * 0.07 * 30 * (taxRate / 100), strategy: proRataRatio < 0.1 ? 'Clean — minimal tax impact' : proRataRatio < 0.5 ? 'Moderate pro-rata issue — consider aggregation rules' : 'High pro-rata — roll pre-tax IRA to 401k first' }
}

export function calculateMegaBackdoorRoth(salary: number, regularContrib: number, employerMatch: number, afterTaxContrib: number, taxRate: number) {
  const limit2026Total = 72000
  const employeeLimit = 24500
  const afterTaxMax = limit2026Total - Math.min(regularContrib, employeeLimit) - employerMatch * salary / 100
  const inPlanConversion = Math.min(afterTaxContrib, Math.max(0, afterTaxMax))
  const taxOnConversion = inPlanConversion * 0.01
  const taxFreeGrowth30yr = inPlanConversion * Math.pow(1.07, 30)
  const taxSavings30yr = (taxFreeGrowth30yr - inPlanConversion) * (taxRate / 100)
  return { afterTaxMax: Math.round(Math.max(0, afterTaxMax)), inPlanConversion: Math.round(inPlanConversion), taxOnConversion: Math.round(taxOnConversion), taxFreeGrowth30yr: Math.round(taxFreeGrowth30yr), taxSavings30yr: Math.round(taxSavings30yr), totalContrib: Math.round(Math.min(regularContrib, employeeLimit) + inPlanConversion + (employerMatch * salary / 100)) }
}

export function calculateSEP_IRA(selfEmploymentIncome: number, businessType: 'sole-proprietor' | 'scorp' | 'partnership', age: number, taxRate: number = 32) {
  const limit2026 = 72000
  // For a sole proprietor, the effective SEP contribution rate is approximately
  // 20% of net earnings from self-employment after the SE-tax adjustment.
  // This is still a planning estimate; Publication 560 has the full worksheet.
  const net = businessType === 'sole-proprietor' ? selfEmploymentIncome * 0.9235 : selfEmploymentIncome
  const contributionRate = businessType === 'sole-proprietor' ? 0.20 : 0.25
  const maxContrib = Math.min(net * contributionRate, limit2026)
  const effectiveTaxRate = Math.max(0, Math.min(100, taxRate)) / 100
  const taxSavings = maxContrib * effectiveTaxRate
  const growth30 = maxContrib * Math.pow(1.07, 30)
  return {
    maxContrib: Math.round(maxContrib),
    taxSavings: Math.round(taxSavings),
    netCostAfterTax: Math.round(maxContrib - taxSavings),
    projectedGrowth30yr: Math.round(growth30),
    vsEmployee401k: Math.round(maxContrib - 24500),
    contributionRate: contributionRate * 100,
    age,
    yearData: Array.from({ length: 31 }, (_, year) => ({ year, balance: Math.round(maxContrib * Math.pow(1.07, year)) })),
  }
}

export function calculateCapitalGainsTax(purchasePrice: number, salePrice: number, yearsHeld: number, filingStatus: 'single' | 'married' | 'hoh', income: number, isQOZ: boolean = false) {
  const gain = salePrice - purchasePrice
  const isLongTerm = yearsHeld >= 1
  let rate = 0
  if (isLongTerm) {
    const thresholds = filingStatus === 'married' ? [98900, 613700] : filingStatus === 'hoh' ? [66200, 579600] : [49450, 545500]
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

export function calculateI_Bonds(purchaseAmount: number, months: number, fixedRate: number = 0.90, inflationRate: number = 1.67) {
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
  const limit2026 = familyCoverage ? 8750 : 4400
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
  // 2026 CMS IRMAA thresholds and published monthly amounts.
  const IRMAA_SINGLE = [109000, 137000, 171000, 205000, 500000]
  const IRMAA_MARRIED = [218000, 274000, 342000, 410000, 750000]
  const PART_B = [202.90, 284.10, 405.80, 527.50, 649.20, 689.90]
  const PART_D_SURCHARGE = [0, 14.50, 37.50, 60.40, 83.30, 91.00]
  const thresholds = filingStatus === 'married' ? IRMAA_MARRIED : IRMAA_SINGLE
  let tier = 0
  for (let i = 0; i < thresholds.length; i++) { if (income > thresholds[i]) tier = i + 1 }
  const partBPremium = PART_B[Math.min(tier, 5)]
  const partDSurcharge = PART_D_SURCHARGE[Math.min(tier, 5)]
  // Part D plan premiums vary by plan, so monthlyTotal excludes the plan's own premium.
  const monthlyTotal = partBPremium + partDSurcharge
  return { tier, partBPremium, partDSurcharge, monthlyTotal: Math.round(monthlyTotal * 100) / 100, annualTotal: Math.round(monthlyTotal * 12 * 100) / 100, irmaaApplies: tier > 0, savingsIfLowerIncome: tier > 0 ? Math.round((partBPremium - 202.90) * 12) : 0 }
}

export function calculateEstateTax(grossEstate: number, debts: number, charitableDeductions: number, spouseTransfer: number, filingStatus: 'single' | 'married') {
  const exemption2026 = filingStatus === 'married' ? 30000000 : 15000000
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
  return { adjustedEstate: Math.round(adjustedEstate), taxableEstate: Math.round(taxableEstate), exemption: exemption2026, federalEstateTax: Math.round(tax), effectiveRate: adjustedEstate > 0 ? ((tax / adjustedEstate) * 100).toFixed(1) : '0', portability: filingStatus === 'married' ? Math.round(exemption2026 / 2) : 0, sunsetRisk: '2026 basic exclusion is $15M per individual; portability requires a timely Form 706 election' }
}

export function calculateGiftTax(giftAmount: number, gifteeCount: number, priorTaxableGifts: number, filingStatus: 'single' | 'married') {
  const annualExclusion2026 = 19000
  const lifetimeExemption = 15000000
  const totalExclusion = annualExclusion2026 * gifteeCount * (filingStatus === 'married' ? 2 : 1)
  const taxableGift = Math.max(0, giftAmount - totalExclusion)
  const remainingLifetime = Math.max(0, lifetimeExemption - priorTaxableGifts)
  const giftTaxOwed = taxableGift > remainingLifetime ? (taxableGift - remainingLifetime) * 0.40 : 0
  const remaining529Superfund = 95000 * gifteeCount
  return { annualExclusion: totalExclusion, taxableGift: Math.round(taxableGift), giftTaxOwed: Math.round(giftTaxOwed), remainingLifetime: Math.round(remainingLifetime), newRemainingLifetime: Math.round(Math.max(0, remainingLifetime - taxableGift)), formRequired: taxableGift > 0, superfundingOption: remaining529Superfund }
}

export function calculateQBIDeduction(qbiIncome: number, filingStatus: 'single' | 'married', businessType: 'sstb' | 'non-sstb', wagesAndProperty: number, taxRate: number = 37) {
  // 2026 §199A threshold and phase-in amounts (Rev. Proc. 2025-45).
  const threshold = filingStatus === 'married' ? 403500 : 201750
  const phaseoutEnd = filingStatus === 'married' ? 553500 : 276750
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
  const normalizedTaxRate = Math.min(100, Math.max(0, taxRate)) / 100
  const taxSavings = Math.max(0, limitedDeduction) * normalizedTaxRate
  return { basicDeduction: Math.round(Math.max(0, basicDeduction)), finalDeduction: Math.round(Math.max(0, limitedDeduction)), taxSavings: Math.round(taxSavings), effectiveRate: qbiIncome > 0 ? ((1 - limitedDeduction / qbiIncome) * normalizedTaxRate * 100).toFixed(1) : '0.0', aboveThreshold: qbiIncome > threshold }
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
  const limit2026 = 3400
  const contribCapped = Math.min(annualContrib, limit2026)
  const taxSavings = contribCapped * (marginalRate + ficaRate) / 100
  const netCost = contribCapped - taxSavings
  const forfeitRisk = Math.max(0, contribCapped - expectedMedical - (gracePeriod ? 680 : 0))
  return { contribCapped, taxSavings: Math.round(taxSavings), netCost: Math.round(netCost), effectiveDiscount: Math.round((taxSavings / contribCapped) * 100), forfeitRisk: Math.round(forfeitRisk), recommended: Math.min(Math.ceil(expectedMedical * 1.05), limit2026) }
}

export function calculateDCFSA(annualContrib: number, marginalRate: number, ficaRate: number = 7.65, dependentCareCost: number, filingStatus: 'single' | 'married') {
  const limit2026 = filingStatus === 'married' ? 7500 : 7500
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
  const exemption = filingStatus === 'married' ? 140200 : 90100
  const phaseoutThreshold = filingStatus === 'married' ? 1000000 : 500000
  const amtIncome = regularTaxIncome + isoOptions + preferenceItems
  const phaseoutReduction = Math.max(0, (amtIncome - phaseoutThreshold) * 0.25)
  const effectiveExemption = Math.max(0, exemption - phaseoutReduction)
  const tentativeMinTax = Math.max(0, amtIncome - effectiveExemption) * (Math.max(0, amtIncome - effectiveExemption) <= 244500 ? 0.26 : 0.28)
  const regularTax = regularTaxIncome * 0.24
  const amtOwed = Math.max(0, tentativeMinTax - regularTax)
  return { amtIncome: Math.round(amtIncome), effectiveExemption: Math.round(effectiveExemption), tentativeMinTax: Math.round(tentativeMinTax), regularTax: Math.round(regularTax), amtOwed: Math.round(amtOwed), amtApplies: amtOwed > 0, isoThreshold: Math.round(exemption + phaseoutThreshold - regularTaxIncome) }
}

export function calculateSelfEmploymentTax(netSelfEmploymentIncome: number, hasW2Income: number = 0) {
  const seIncome = netSelfEmploymentIncome * 0.9235
  const ssTaxableMax = 184500
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
  const fica = Math.min(bonus, Math.max(0, 184500 - ytdIncome)) * 0.0765
  const totalWithholding = federalWithholding + stateWithholding + fica
  const netBonus = bonus - totalWithholding
  return { bonus: Math.round(bonus), federalWithholding: Math.round(federalWithholding), stateWithholding: Math.round(stateWithholding), fica: Math.round(fica), totalWithholding: Math.round(totalWithholding), netBonus: Math.round(netBonus), effectiveRate: Math.round((totalWithholding / bonus) * 100), strategyTip: ytdIncome + bonus > 500000 ? 'Consider deferring to next year if possible — may be in lower bracket' : 'Max 401k before year-end to reduce taxable income' }
}

// Shared simplified 2026 federal income-tax helper used by several calculators.
function calculateSimpleFederalTax(taxableIncome: number, filingStatus: 'single' | 'married'): number {
  const income = Math.max(0, taxableIncome)
  const brackets: Array<[number, number]> = filingStatus === 'married'
    ? [[24800, 0.10], [100800, 0.12], [211400, 0.22], [403550, 0.24], [512450, 0.32], [768700, 0.35], [Infinity, 0.37]]
    : [[12400, 0.10], [50400, 0.12], [105700, 0.22], [201775, 0.24], [256225, 0.32], [640600, 0.35], [Infinity, 0.37]]

  let tax = 0
  let previousLimit = 0
  for (const [limit, rate] of brackets) {
    if (income <= previousLimit) break
    const amountInBracket = Math.min(income, limit) - previousLimit
    tax += amountInBracket * rate
    previousLimit = limit
  }
  return tax
}

// ─── BATCH 2: 25 MORE USA FINANCE CALCULATORS ────────────────────────────────

export function calculatePayrollTax(grossWages: number, filingStatus: 'single'|'married', allowances: number, state: string, payPeriod: 'weekly'|'biweekly'|'semimonthly'|'monthly') {
  const periods: Record<string,number> = { weekly:52, biweekly:26, semimonthly:24, monthly:12 }
  const n = periods[payPeriod]
  const annual = grossWages * n
  // Federal income tax withholding (2026 tables simplified)
  const stdDed = filingStatus==='married' ? 32200 : 16100
  const taxable = Math.max(0, annual - stdDed - allowances*5300)
  const brackets = filingStatus==='married'
    ? [[24800,0.10],[100800,0.12],[211400,0.22],[403550,0.24],[512450,0.32],[768700,0.35],[Infinity,0.37]]
    : [[12400,0.10],[50400,0.12],[105700,0.22],[201775,0.24],[256225,0.32],[640600,0.35],[Infinity,0.37]]
  let fedTax=0, rem=taxable
  let prev=0
  for(const [limit,rate] of brackets){
    const slice=Math.min(rem, Number(limit)-prev)
    fedTax+=slice*Number(rate)
    rem-=slice; prev=Number(limit)
    if(rem<=0) break
  }
  const ssTax = Math.min(grossWages*n, 184500)*0.062/n
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
  const exemption2026 = 15000000
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

export function calculateChildTaxCredit(
  numChildren:number,
  childrenUnder6:number,
  agi:number,
  filingStatus:'single'|'married',
  earned:number,
  qualifyingCarePersons:number = 0,
  qualifyingCareExpenses:number = 0,
) {
  const maxCredit2026=2200*numChildren
  const phaseoutThreshold=filingStatus==='married'?400000:200000
  const phaseout=Math.max(0,Math.ceil((agi-phaseoutThreshold)/1000))*50*numChildren
  const creditAfterPhaseout=Math.max(0,maxCredit2026-phaseout)
  // Refundable portion (ACTC) = 15% of earned income above $2,500, up to $1,700/child.
  const refundable=Math.min(Math.max(0,(earned-2500)*0.15), 1700*numChildren)
  const nonRefundable=Math.max(0,creditAfterPhaseout-refundable)

  // 2026 Child & Dependent Care Credit. Expense limits remain $3,000 for one
  // qualifying person and $6,000 for two or more. The applicable percentage
  // starts at 50%, phases down to 35%, then to a 20% floor. This calculator
  // intentionally models only the AGI percentage and expense cap; it does not
  // reproduce Form 2441's earned-income, provider, or dependent-care-benefit rules.
  const careCap = qualifyingCarePersons >= 2 ? 6000 : qualifyingCarePersons === 1 ? 3000 : 0
  const careExpenses = Math.min(Math.max(0, qualifyingCareExpenses), careCap)
  const careRate = get2026ChildDependentCareRate(agi, filingStatus)
  const careCredit = careExpenses * careRate

  return {
    maxCredit:maxCredit2026, phaseoutReduction:Math.round(phaseout),
    netCredit:Math.round(creditAfterPhaseout), refundablePortion:Math.round(refundable),
    nonRefundablePortion:Math.round(nonRefundable), childCareCredit:Math.round(careCredit),
    childCareRate:careRate, qualifyingCareExpenses:Math.round(careExpenses),
    totalCredits:Math.round(creditAfterPhaseout+careCredit), abovePhaseout:agi>phaseoutThreshold
  }
}

function get2026ChildDependentCareRate(agi:number, filingStatus:'single'|'married') {
  const firstThreshold = filingStatus === 'married' ? 30000 : 15000
  const secondThreshold = filingStatus === 'married' ? 150000 : 75000
  const secondStep = filingStatus === 'married' ? 4000 : 2000

  if (agi <= firstThreshold) return 0.50

  const firstStepRate = Math.max(0.35, 0.50 - Math.ceil((agi - firstThreshold) / 2000) * 0.01)
  if (agi <= secondThreshold) return firstStepRate

  return Math.max(0.20, 0.35 - Math.ceil((agi - secondThreshold) / secondStep) * 0.01)
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
  return { portfolio:Math.round(portfolio), projectedPortfolio:Math.round(portfolio), fiNumber:Math.round(fiNumber), sustainableIncome:Math.round(sustainableIncome), inflationAdjExpenses:Math.round(inflationAdjExpenses), shortfall:Math.round(shortfall), onTrack:portfolio>=fiNumber, yearsOfFunding:Math.round(yearsOfFunding), safeWithdrawalRate:safeWithdrawalRate*100, yearData }
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
  const federalTaxable=grossSalary-preTaxDeductions-(filingStatus==='married'?32200:16100)
  const brackets=filingStatus==='married'?[[24800,0.10],[100800,0.12],[211400,0.22],[403550,0.24],[512450,0.32],[768700,0.35],[Infinity,0.37]]:[[12400,0.10],[50400,0.12],[105700,0.22],[201775,0.24],[256225,0.32],[640600,0.35],[Infinity,0.37]]
  let fedTax=0,rem=Math.max(0,federalTaxable),prev=0
  for(const[limit,rate]of brackets){const s=Math.min(rem,Number(limit)-prev);fedTax+=s*Number(rate);rem-=s;prev=Number(limit);if(rem<=0)break}
  const fica=Math.min(grossSalary,184500)*0.0765+Math.max(0,grossSalary-200000)*0.009
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
  const yearData: Array<{year:number; age:number; portfolio:number; progress:number; fireNumber:number; fireReached?:boolean}> = []
  for(let i=0;i<=yearsToFIRE;i++){
    portfolio=portfolio*(1+expectedReturn/100)+annualSavings
    const progress=Math.min(100,Math.round(portfolio/fireNumber*100))
    yearData.push({year:i,age:currentAge+i,portfolio:Math.round(portfolio),progress,fireNumber:Math.round(fireNumber)})
    if(portfolio>=fireNumber&&yearData.length===i+1) yearData[i].fireReached=true
  }
  const monthlyToFIRE=Math.max(0,(fireNumber-currentPortfolio)/((Math.pow(1+expectedReturn/100/12,yearsToFIRE*12)-1)/(expectedReturn/100/12)))
  return { fireNumber:Math.round(fireNumber), currentPortfolio, shortfall:Math.round(Math.max(0,fireNumber-currentPortfolio)), onTrack:portfolio>=fireNumber, inflationAdjExpenses:Math.round(inflationAdjExpenses), projectedPortfolio:Math.round(portfolio), sustainableIncome:Math.round(portfolio * safeWithdrawal / 100), coveragePercent:Math.round(portfolio/fireNumber*100), monthlyToFIRE:Math.round(monthlyToFIRE/12), yearData }
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

export function calculateSolo401k(selfEmploymentIncome: number, age: number, includeDefinedBenefit: boolean, marginalTaxRate = 37) {
  const netSE = selfEmploymentIncome * 0.9235
  const employeeContrib = Math.min(24500, netSE) + (age >= 50 ? 8000 : 0) + (age >= 60 && age <= 63 ? 3250 : 0) // SECURE 2.0 super catch-up
  const employerContrib = Math.min(netSE * 0.25, 72000 - Math.min(employeeContrib, 24500))
  const totalContrib = Math.min(employeeContrib + employerContrib, 72000 + (age >= 50 ? (age >= 60 && age <= 63 ? 11250 : 8000) : 0))
  const taxSavings = totalContrib * (marginalTaxRate / 100)
  const netCost = totalContrib - taxSavings
  const growth30 = totalContrib * Math.pow(1.07, 30)
  const vsTraditional401k = totalContrib - 24500
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
    contractsWritable: Math.floor(sharesOwned / 100),
    contractValue: Math.round(currentPrice * 100)
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
    catchUpLimit: age >= 60 && age <= 63 ? 35750 : age >= 50 ? 32500 : 24500,
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
  const fixedRate = 0.90
  // May 1-Oct 31, 2026 Treasury composite rate. Kept explicit so the page does not imply a live rate feed.
  const compositeRate = 4.26
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
  const stdDeduction = spouseIncome > 0 ? 32200 : 16100
  const deduction = Math.max(stdDeduction, itemizedDeductions)
  const taxable = Math.max(0, totalIncome - deduction)
  const brackets: [number,number][] = spouseIncome > 0 ? [[24800,0.10],[100800,0.12],[211400,0.22],[403550,0.24],[512450,0.32],[768700,0.35],[Infinity,0.37]] : [[12400,0.10],[50400,0.12],[105700,0.22],[201775,0.24],[256225,0.32],[640600,0.35],[Infinity,0.37]]
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
  const stdDed = filingStatus === 'married' ? 32200 : 16100
  const fedBrackets: [number, number][] = filingStatus === 'married'
    ? [[24800, 0.10], [100800, 0.12], [211400, 0.22], [403550, 0.24], [512450, 0.32], [768700, 0.35], [Infinity, 0.37]]
    : [[12400, 0.10], [50400, 0.12], [105700, 0.22], [201775, 0.24], [256225, 0.32], [640600, 0.35], [Infinity, 0.37]]
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
  const conformingLimit2026 = 832750
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
  const federalTaxable = Math.max(0, netSEIncome - seDeduction - qbiDeduction - retirementContrib - 16100)
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
  const limit401k = 24500, limitHSA = 4400, limitFSA = 3400
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
  const stdDed = filingStatus==='married' ? 32200 : 16100
  const totalDed = Math.max(stdDed, deductions)
  const taxableOrdinary = Math.max(0, ordinaryIncome - totalDed)
  const brackets: [number,number][] = filingStatus==='married'
    ? [[24800,0.10],[100800,0.12],[211400,0.22],[403550,0.24],[512450,0.32],[768700,0.35],[Infinity,0.37]]
    : [[12400,0.10],[50400,0.12],[105700,0.22],[201775,0.24],[256225,0.32],[640600,0.35],[Infinity,0.37]]
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
  const medianUSNetWorth2022 = 192900
  const percentileEst = netWorth < 0 ? 10 : netWorth < 50000 ? 25 : netWorth < 192900 ? 50 : netWorth < 500000 ? 70 : netWorth < 1000000 ? 85 : netWorth < 3000000 ? 95 : 99
  return {
    totalAssets:Math.round(totalAssets), totalLiabilities:Math.round(totalLiabilities),
    netWorth:Math.round(netWorth), liquidAssets:Math.round(liquidAssets),
    illiquidAssets:Math.round(illiquidAssets), debtToAsset:Math.round(debtToAsset*10)/10,
    liquidityRatio:Math.round(liquidityRatio*100)/100,
    percentileEst, medianUSNetWorth:medianUSNetWorth2022,
    vsMedian:Math.round(netWorth-medianUSNetWorth2022),
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

// ═══════════════════════════════════════════════════════════════════════════
// V7 MERGE — New calculators added from V7 branch (21 new finance tools)
// Note: calculateAlimonyTaxImpact was renamed from V7's `calculateAlimonyTax`
// to avoid colliding with the pre-existing (unused) calculateAlimonyTax above.
// ═══════════════════════════════════════════════════════════════════════════

export function calculate72TSEPP(accountBalance: number, age: number, method: 'rmd' | 'amortization' | 'annuity', interestRate: number = 5) {
  const lifeExpectancy = 90 - age
  const rmdPayment = accountBalance / lifeExpectancy
  const r = interestRate / 100
  const amortPayment = accountBalance * r / (1 - Math.pow(1 + r, -lifeExpectancy))
  const annuityFactor = (1 - Math.pow(1 + r, -lifeExpectancy)) / r
  const annuityPayment = accountBalance / annuityFactor
  const selectedPayment = method === 'rmd' ? rmdPayment : method === 'amortization' ? amortPayment : annuityPayment
  const annualPayment = Math.round(selectedPayment)
  const monthlyPayment = Math.round(annualPayment / 12)
  const modificationAge = Math.max(59.5, age + 5)
  const penalty10Pct = annualPayment * 0.10
  return {
    rmdPayment: Math.round(rmdPayment), amortizationPayment: Math.round(amortPayment), annuityPayment: Math.round(annuityPayment),
    selectedMethod: method, annualPayment, monthlyPayment, modificationAge,
    earlyExitPenalty: Math.round(penalty10Pct), yearsUntilModification: Math.round(modificationAge - age),
    totalDistributions: Math.round(annualPayment * Math.round(modificationAge - age))
  }
}

export function calculateBonusDepreciation(assetCost: number, assetLife: number, bonusDepreciationPct: number, taxRate: number, placedInServiceYear: number = 2026) {
  // 2026 current-law planning constants: permanent 100% bonus depreciation applies to
  // eligible property acquired after Jan. 19, 2025; Section 179 is inflation-adjusted.
  const sec179Limit2026 = 2560000
  const sec179PhaseOut = 4090000
  const sec179Available = Math.max(0, sec179Limit2026 - Math.max(0, assetCost - sec179PhaseOut))
  const sec179Deduction = Math.min(assetCost, sec179Available)
  const bonusDeduction = (assetCost - sec179Deduction) * (bonusDepreciationPct / 100)
  const macrsBase = assetCost - sec179Deduction - bonusDeduction
  const macrsYear1 = macrsBase / assetLife * 1.5 // 150% DB first year approx
  const totalYear1Deduction = sec179Deduction + bonusDeduction + macrsYear1
  const taxSavingsYear1 = totalYear1Deduction * (taxRate / 100)
  const straightLineDeduction = assetCost / assetLife
  const straightLineTax = straightLineDeduction * (taxRate / 100)
  return {
    assetCost, sec179Deduction: Math.round(sec179Deduction), bonusDepreciation: Math.round(bonusDeduction),
    macrsYear1: Math.round(macrsYear1), totalYear1Deduction: Math.round(totalYear1Deduction),
    taxSavingsYear1: Math.round(taxSavingsYear1), straightLineAnnual: Math.round(straightLineDeduction),
    accelerationBenefit: Math.round(taxSavingsYear1 - straightLineTax),
    remainingBasis: Math.round(macrsBase - macrsYear1)
  }
}

export function calculateCOBRAvsMarketplace(cobraMonthlyPremium: number, marketplacePremium: number, annualIncome: number, householdSize: number, subsidyEligible: boolean) {
  // 2026 PTC uses the prior-year (2025) HHS poverty guideline for the 48 states/DC.
  // Alaska/Hawaii and full Form 8962 eligibility are outside this simplified model.
  const poverty2025: Record<number, number> = {1:15650,2:21150,3:26650,4:32150,5:37650,6:43150}
  const fpl = poverty2025[Math.min(Math.max(householdSize, 1), 6)] || 32150
  const incomeAsFPL = annualIncome / fpl * 100
  const pct = (fplPct: number) => {
    if (fplPct < 100 || fplPct > 400) return 0
    if (fplPct < 133) return 2.10
    if (fplPct < 150) return 3.14 + (fplPct - 133) / 17 * (4.19 - 3.14)
    if (fplPct < 200) return 4.19 + (fplPct - 150) / 50 * (6.60 - 4.19)
    if (fplPct < 250) return 6.60 + (fplPct - 200) / 50 * (8.44 - 6.60)
    if (fplPct < 300) return 8.44 + (fplPct - 250) / 50 * (9.96 - 8.44)
    return 9.96
  }
  const applicablePct = pct(incomeAsFPL)
  const eligibleByIncome = incomeAsFPL >= 100 && incomeAsFPL <= 400
  const maxAnnualPremium = annualIncome * (applicablePct / 100)
  const annualSubsidy = subsidyEligible && eligibleByIncome ? Math.max(0, marketplacePremium * 12 - maxAnnualPremium) : 0
  const netMarketplaceMonthly = marketplacePremium - annualSubsidy / 12
  const cobraAnnual = cobraMonthlyPremium * 12
  const marketplaceAnnual = netMarketplaceMonthly * 12
  const savings = cobraAnnual - marketplaceAnnual
  return {
    cobraMonthly: Math.round(cobraMonthlyPremium), cobraAnnual: Math.round(cobraAnnual),
    marketplaceMonthly: Math.round(marketplacePremium), annualSubsidy: Math.round(annualSubsidy),
    netMarketplaceMonthly: Math.round(netMarketplaceMonthly), marketplaceAnnual: Math.round(marketplaceAnnual),
    annualSavings: Math.round(savings), fplPct: Math.round(incomeAsFPL),
    recommendation: savings > 0 ? 'Marketplace is cheaper in this premium-only model' : 'COBRA may cost less in this premium-only model'
  }
}

export function calculateCapitalGainsHarvesting(portfolioValue: number, unrealizedGains: number, unrealizedLosses: number, ordinaryIncome: number, filingStatus: 'single' | 'married') {
  const ltcg0Threshold = filingStatus === 'married' ? 98900 : 49450
  const ltcg15Threshold = filingStatus === 'married' ? 613700 : 545500
  const incomeAfterLosses = ordinaryIncome - Math.min(unrealizedLosses, 3000)
  const availableSpace0pct = Math.max(0, ltcg0Threshold - incomeAfterLosses)
  const taxableGains = Math.max(0, unrealizedGains - unrealizedLosses)
  const gainsIn0Bucket = Math.min(unrealizedGains, availableSpace0pct)
  const gainsIn15Bucket = Math.min(Math.max(0, unrealizedGains - gainsIn0Bucket), ltcg15Threshold - Math.max(incomeAfterLosses, ltcg0Threshold))
  const gainsIn20Bucket = Math.max(0, unrealizedGains - gainsIn0Bucket - Math.max(0, gainsIn15Bucket))
  const taxDue = gainsIn15Bucket * 0.15 + gainsIn20Bucket * 0.20
  const harvestingSavings = unrealizedLosses * 0.20
  return {
    portfolioValue: Math.round(portfolioValue), unrealizedGains: Math.round(unrealizedGains), unrealizedLosses: Math.round(unrealizedLosses),
    netGains: Math.round(taxableGains), availableSpace0pct: Math.round(availableSpace0pct),
    breakdown: { at0pct: Math.round(gainsIn0Bucket), at15pct: Math.round(Math.max(0,gainsIn15Bucket)), at20pct: Math.round(gainsIn20Bucket) },
    estimatedTax: Math.round(taxDue), harvestingSavings: Math.round(harvestingSavings),
    strategy: unrealizedLosses > 0 ? `Harvest ${Math.round(unrealizedLosses).toLocaleString()} in losses to offset gains` : availableSpace0pct > 0 ? `You have $${Math.round(availableSpace0pct).toLocaleString()} of 0% LTCG space` : 'Consider deferring gains to next year'
  }
}

export function calculateCharitableGiving(cashDonation: number, appreciatedStockFMV: number, stockCostBasis: number, agiIncome: number, taxRate: number) {
  const cashDeduction = Math.min(cashDonation, agiIncome * 0.60)
  const stockDeduction = Math.min(appreciatedStockFMV, agiIncome * 0.30)
  const capitalGainsTaxAvoided = (appreciatedStockFMV - stockCostBasis) * 0.20
  const cashTaxSavings = cashDeduction * (taxRate / 100)
  const stockTaxSavings = stockDeduction * (taxRate / 100) + capitalGainsTaxAvoided
  const totalTaxBenefit = cashTaxSavings + stockTaxSavings
  const donorAdvisedFundBenefit = (cashDonation + appreciatedStockFMV) * (taxRate / 100)
  return {
    cashDonation: Math.round(cashDonation), cashDeduction: Math.round(cashDeduction), cashTaxSavings: Math.round(cashTaxSavings),
    stockFMV: Math.round(appreciatedStockFMV), stockDeduction: Math.round(stockDeduction), capitalGainsTaxAvoided: Math.round(capitalGainsTaxAvoided),
    stockTaxSavings: Math.round(stockTaxSavings), totalTaxBenefit: Math.round(totalTaxBenefit),
    effectiveCostToDonate: Math.round(cashDonation + appreciatedStockFMV - totalTaxBenefit),
    donorAdvisedFundTip: donorAdvisedFundBenefit > totalTaxBenefit ? 'Consider a Donor Advised Fund for larger deductions' : 'Direct giving is efficient for your situation'
  }
}

export function calculateDefinedBenefitPension(yearsOfService: number, finalSalary: number, multiplier: number, retirementAge: number, earlyRetirementAge: number = 55) {
  const fullBenefit = yearsOfService * multiplier / 100 * finalSalary
  const earlyReductionPct = Math.max(0, (retirementAge - earlyRetirementAge) * 5)
  const earlyBenefit = fullBenefit * (1 - earlyReductionPct / 100)
  const annualBenefitFull = fullBenefit
  const monthlyBenefitFull = fullBenefit / 12
  const lifeExpectancy = 85
  const totalLifetimeBenefit = annualBenefitFull * (lifeExpectancy - retirementAge)
  const lumpSumEquivalent = totalLifetimeBenefit * 0.75 // approximate
  return {
    annualBenefit: Math.round(annualBenefitFull), monthlyBenefit: Math.round(monthlyBenefitFull),
    earlyRetirementBenefit: Math.round(earlyBenefit), earlyReductionPct: Math.round(earlyReductionPct),
    totalLifetimeBenefit: Math.round(totalLifetimeBenefit), lumpSumEquivalent: Math.round(lumpSumEquivalent),
    replacementRate: Math.round((annualBenefitFull / finalSalary) * 100),
    breakEvenAge: Math.round(retirementAge + 10)
  }
}

export function calculateFHAvsConventional(purchasePrice: number, downPaymentPct: number, creditScore: number, loanTermYears: number = 30) {
  const downPayment = purchasePrice * (downPaymentPct / 100)
  const loanAmount = purchasePrice - downPayment
  const fhaRate = 0.065 + (creditScore < 620 ? 0.02 : creditScore < 680 ? 0.005 : 0)
  const convRate = 0.063 + (creditScore < 620 ? 0.04 : creditScore < 680 ? 0.015 : creditScore < 740 ? 0.005 : 0)
  const fhaMIP_upfront = loanAmount * 0.0175
  const fhaMIP_annual = loanAmount * 0.0085 / 12
  const convPMI = downPaymentPct < 20 ? loanAmount * 0.008 / 12 : 0
  const calcMonthly = (principal: number, rate: number) => {
    const r = rate / 12
    return principal * r * Math.pow(1+r, loanTermYears*12) / (Math.pow(1+r, loanTermYears*12) - 1)
  }
  const fhaMonthly = calcMonthly(loanAmount + fhaMIP_upfront, fhaRate) + fhaMIP_annual
  const convMonthly = calcMonthly(loanAmount, convRate) + convPMI
  const fhaTotalCost = fhaMonthly * loanTermYears * 12 + downPayment + fhaMIP_upfront
  const convTotalCost = convMonthly * loanTermYears * 12 + downPayment
  return {
    loanAmount: Math.round(loanAmount), downPayment: Math.round(downPayment),
    fha: { rate: Math.round(fhaRate*1000)/10, monthly: Math.round(fhaMonthly), mipUpfront: Math.round(fhaMIP_upfront), mipMonthly: Math.round(fhaMIP_annual), totalCost: Math.round(fhaTotalCost) },
    conventional: { rate: Math.round(convRate*1000)/10, monthly: Math.round(convMonthly), pmi: Math.round(convPMI), totalCost: Math.round(convTotalCost) },
    totalSavings: Math.round(fhaTotalCost - convTotalCost), recommendation: convTotalCost < fhaTotalCost ? 'Conventional is cheaper overall' : 'FHA may be better for your credit profile'
  }
}

export function calculateFICA(grossWages: number, ytdWages: number, selfEmployed: boolean) {
  const sswageCap2026 = 184500
  const ssRate = selfEmployed ? 0.124 : 0.062
  const medicareRate = selfEmployed ? 0.029 : 0.0145
  const additionalMedicareThreshold = 200000
  const taxableSSWages = Math.max(0, Math.min(grossWages, sswageCap2026) - Math.min(ytdWages, sswageCap2026))
  const ssTax = taxableSSWages * ssRate
  const medicareTax = grossWages * medicareRate
  const additionalMedicare = Math.max(0, (grossWages + ytdWages - additionalMedicareThreshold)) * 0.009
  const totalFICA = ssTax + medicareTax + additionalMedicare
  const employerMatch = selfEmployed ? 0 : ssTax + medicareTax
  return {
    ssTax: Math.round(ssTax), medicareTax: Math.round(medicareTax), additionalMedicare: Math.round(additionalMedicare),
    totalFICA: Math.round(totalFICA), employerMatch: Math.round(employerMatch), totalCost: Math.round(totalFICA + employerMatch),
    ssWageCap: sswageCap2026, taxableSSWages: Math.round(taxableSSWages), annualizedFICA: Math.round(totalFICA * (grossWages / (grossWages + ytdWages || 1)))
  }
}

export function calculateFreelancerQuarterlyTax(annualIncome: number, businessExpenses: number, retirementContribs: number, filingStatus: 'single' | 'married', priorYearTax: number) {
  const netIncome = annualIncome - businessExpenses
  const seTax = netIncome * 0.1530
  const seDeduction = seTax * 0.5
  const qbiDeduction = Math.min(netIncome * 0.20, (netIncome - seDeduction) * 0.20)
  const taxableIncome = Math.max(0, netIncome - seDeduction - retirementContribs - qbiDeduction)
  const stdDeduction = filingStatus === 'married' ? 30000 : 15000
  const federalTaxable = Math.max(0, taxableIncome - stdDeduction)
  const federalTax = calculateSimpleFederalTax(federalTaxable, filingStatus)
  const totalAnnualTax = federalTax + seTax
  const safeHarbor = Math.min(totalAnnualTax, priorYearTax * 1.10)
  const quarterlyPayment = Math.round(safeHarbor / 4)
  const dueDates = ['April 15', 'June 16', 'September 15', 'January 15']
  return {
    grossIncome: Math.round(annualIncome), netIncome: Math.round(netIncome), seTax: Math.round(seTax),
    seDeduction: Math.round(seDeduction), qbiDeduction: Math.round(qbiDeduction), federalTax: Math.round(federalTax),
    totalAnnualTax: Math.round(totalAnnualTax), effectiveRate: Math.round(totalAnnualTax / annualIncome * 100 * 10) / 10,
    quarterlyPayment, safeHarborAmount: Math.round(safeHarbor),
    paymentSchedule: dueDates.map((d, i) => ({ quarter: `Q${i+1}`, dueDate: d, amount: quarterlyPayment }))
  }
}

export function calculateHSATripleTax(annualContribution: number, years: number, investmentReturn: number, taxRate: number, familyCoverage: boolean) {
  const limit2026 = familyCoverage ? 8750 : 4400
  const catchUp = 1000 // age 55+
  const actualContrib = Math.min(annualContribution, limit2026)
  const taxDeduction = actualContrib * (taxRate / 100)
  let balance = 0
  const yearData = []
  for (let y = 1; y <= years; y++) {
    balance = (balance + actualContrib) * (1 + investmentReturn / 100)
    if (y % 5 === 0 || y === years) yearData.push({ year: y, balance: Math.round(balance) })
  }
  const taxIfRegularAccount = balance * (taxRate / 100)
  const tripleTaxBenefit = taxDeduction * years + taxIfRegularAccount
  return {
    annualContrib: Math.round(actualContrib), limit2026, taxDeductionAnnual: Math.round(taxDeduction),
    finalBalance: Math.round(balance), taxFreeGrowth: Math.round(balance - actualContrib * years),
    tripleTaxBenefit: Math.round(tripleTaxBenefit), yearData,
    tripleAdvantage: ['1. Pre-tax contributions (immediate deduction)', '2. Tax-free growth', '3. Tax-free withdrawals for medical expenses']
  }
}

export function calculateMarginTrading(accountEquity: number, marginLoan: number, investmentReturn: number, marginInterestRate: number, holdingPeriodMonths: number) {
  const totalInvested = accountEquity + marginLoan
  const grossReturn = totalInvested * (investmentReturn / 100) * (holdingPeriodMonths / 12)
  const interestCost = marginLoan * (marginInterestRate / 100) * (holdingPeriodMonths / 12)
  const netReturn = grossReturn - interestCost
  const leveragedReturnPct = (netReturn / accountEquity) * 100
  const unleveragedReturnPct = (accountEquity * (investmentReturn / 100) * (holdingPeriodMonths / 12)) / accountEquity * 100
  const marginCallPrice = accountEquity / totalInvested * 100 * (1 / 0.25) // 25% maintenance margin
  const breakEvenReturn = (marginInterestRate * marginLoan / totalInvested) * (12 / holdingPeriodMonths)
  return {
    totalInvested: Math.round(totalInvested), marginLoan: Math.round(marginLoan), leverage: Math.round(totalInvested / accountEquity * 10) / 10,
    grossReturn: Math.round(grossReturn), interestCost: Math.round(interestCost), netReturn: Math.round(netReturn),
    leveragedReturnPct: Math.round(leveragedReturnPct * 10) / 10, unleveragedReturnPct: Math.round(unleveragedReturnPct * 10) / 10,
    returnAmplification: Math.round((leveragedReturnPct / unleveragedReturnPct) * 10) / 10,
    breakEvenReturnPct: Math.round(breakEvenReturn * 10) / 10, risk: marginLoan > accountEquity ? 'High — margin call risk' : 'Moderate'
  }
}

export function calculateNUA(costBasis: number, currentFMV: number, ordinaryIncomeTax: number, capitalGainsTax: number) {
  const nua = currentFMV - costBasis
  // Traditional rollover: all tax deferred, pay ordinary income later
  const traditionalTaxAtWithdrawal = currentFMV * (ordinaryIncomeTax / 100)
  // NUA strategy: pay ordinary tax on cost basis now, LTCG on appreciation
  const nuaTaxOnBasis = costBasis * (ordinaryIncomeTax / 100)
  const nuaTaxOnGrowth = nua * (capitalGainsTax / 100)
  const totalNUATax = nuaTaxOnBasis + nuaTaxOnGrowth
  const savings = traditionalTaxAtWithdrawal - totalNUATax
  const effectiveNUARate = (totalNUATax / currentFMV) * 100
  return {
    nua: Math.round(nua), costBasis, currentFMV,
    traditionalTax: Math.round(traditionalTaxAtWithdrawal),
    nuaStrategy: { taxOnBasis: Math.round(nuaTaxOnBasis), taxOnNUA: Math.round(nuaTaxOnGrowth), totalTax: Math.round(totalNUATax) },
    taxSavings: Math.round(savings), effectiveRate: Math.round(effectiveNUARate * 10) / 10,
    recommendation: savings > 0 ? 'NUA strategy saves taxes' : 'Traditional rollover preferred'
  }
}

export function calculatePrepaidVsSavings529(childAge: number, collegeStartAge: number, statePlanCost: number, statePlanGrowthRate: number, savingsPlanContrib: number, savingsPlanReturn: number) {
  const yearsToCollege = Math.max(0, collegeStartAge - childAge)
  const currentTuitionAvg = 11610 // 4yr public 2026
  const tuitionInflation = 0.04
  const futureTuitionYear1 = currentTuitionAvg * Math.pow(1 + tuitionInflation, yearsToCollege)
  const prepaidBenefit = futureTuitionYear1 * 4 // locked rate
  const prepaidCost = statePlanCost * 4
  const prepaidROI = ((prepaidBenefit - prepaidCost) / prepaidCost) * 100
  let savingsBalance = 0
  for (let y = 0; y < yearsToCollege; y++) {
    savingsBalance = (savingsBalance + savingsPlanContrib * 12) * (1 + savingsPlanReturn / 100)
  }
  const totalCollegeCost = futureTuitionYear1 * 4
  const savingsCoverage = Math.min(100, (savingsBalance / totalCollegeCost) * 100)
  return {
    yearsToCollege, futureTuitionYear1: Math.round(futureTuitionYear1), totalFutureTuition: Math.round(totalCollegeCost),
    prepaid: { cost: Math.round(prepaidCost), benefit: Math.round(prepaidBenefit), roi: Math.round(prepaidROI) },
    savings: { balance: Math.round(savingsBalance), coveragePct: Math.round(savingsCoverage), shortfall: Math.round(Math.max(0, totalCollegeCost - savingsBalance)) },
    recommendation: savingsBalance > prepaidBenefit ? '529 Savings Plan offers more flexibility and potential' : 'Prepaid locks in tuition rate — good if prices rise faster than markets'
  }
}

export function calculateQualifiedDividendTax(ordinaryDividends: number, qualifiedDividends: number, otherIncome: number, filingStatus: 'single' | 'married') {
  const taxableIncome = ordinaryDividends + otherIncome
  const ordinaryDivTax = calculateSimpleFederalTax(taxableIncome, filingStatus) - calculateSimpleFederalTax(taxableIncome - (ordinaryDividends - qualifiedDividends), filingStatus)
  // LTCG brackets 2026
  const ltcg0Threshold = filingStatus === 'married' ? 98900 : 49450
  const ltcg15Threshold = filingStatus === 'married' ? 613700 : 545500
  let qualifiedTax = 0
  const baseForQual = otherIncome
  const in0Bucket = Math.max(0, Math.min(qualifiedDividends, ltcg0Threshold - baseForQual))
  const in15Bucket = Math.min(qualifiedDividends - in0Bucket, ltcg15Threshold - Math.max(baseForQual, ltcg0Threshold))
  const in20Bucket = Math.max(0, qualifiedDividends - in0Bucket - Math.max(0, in15Bucket))
  qualifiedTax = in15Bucket * 0.15 + in20Bucket * 0.20
  const niit = otherIncome + ordinaryDividends > (filingStatus === 'married' ? 250000 : 200000) ? qualifiedDividends * 0.038 : 0
  const totalTaxOnDividends = ordinaryDivTax + qualifiedTax + niit
  return {
    ordinaryDividendTax: Math.round(ordinaryDivTax), qualifiedDividendTax: Math.round(qualifiedTax), niit: Math.round(niit),
    totalTax: Math.round(totalTaxOnDividends), savings: Math.round(ordinaryDivTax - qualifiedTax),
    effectiveRate: Math.round((qualifiedTax / qualifiedDividends) * 1000) / 10,
    breakdown: { at0pct: Math.round(in0Bucket), at15pct: Math.round(Math.max(0,in15Bucket)), at20pct: Math.round(in20Bucket) }
  }
}

export function calculateRentalDepreciation(propertyValue: number, landValue: number, improvements: number, residentialOrCommercial: 'residential' | 'commercial', yearAcquired: number) {
  const depreciableBase = propertyValue - landValue + improvements
  const lifeYears = residentialOrCommercial === 'residential' ? 27.5 : 39
  const annualDepreciation = depreciableBase / lifeYears
  const years = []
  for (let y = 1; y <= 10; y++) {
    const cumulativeDepreciation = Math.min(annualDepreciation * y, depreciableBase)
    const bookValue = depreciableBase - cumulativeDepreciation + landValue
    const taxSavings = annualDepreciation * 0.37
    years.push({ year: yearAcquired + y - 1, depreciation: Math.round(annualDepreciation), cumulative: Math.round(cumulativeDepreciation), bookValue: Math.round(bookValue), taxSavings: Math.round(taxSavings) })
  }
  const totalDepreciationLife = depreciableBase
  return {
    depreciableBase: Math.round(depreciableBase), annualDepreciation: Math.round(annualDepreciation),
    lifeYears, totalDepreciationLife: Math.round(totalDepreciationLife),
    annualTaxSavings: Math.round(annualDepreciation * 0.24),
    years, deprecreciationRecapture: Math.round(totalDepreciationLife * 0.25)
  }
}

export function calculateSafeHarbor401k(annualSalary: number, employeeContrib: number, matchType: 'basic' | 'enhanced' | 'nonelective') {
  const basicMatch = Math.min(employeeContrib, 3) / 100 * annualSalary + Math.max(0, Math.min(employeeContrib, 5) - 3) / 100 * annualSalary * 0.5
  const enhancedMatch = Math.min(employeeContrib, 4) / 100 * annualSalary
  const nonelectiveMatch = annualSalary * 0.03
  const employerContrib = matchType === 'basic' ? basicMatch : matchType === 'enhanced' ? enhancedMatch : nonelectiveMatch
  const totalContrib = annualSalary * (employeeContrib / 100) + employerContrib
  const limit2026 = 72000
  const taxSavings = (annualSalary * (employeeContrib / 100)) * 0.24 // assume 24% bracket
  return {
    employeeDeferral: Math.round(annualSalary * (employeeContrib / 100)),
    employerContrib: Math.round(employerContrib), totalContrib: Math.round(totalContrib),
    matchType, isWithinLimit: totalContrib <= limit2026, annualLimit: limit2026,
    taxSavings: Math.round(taxSavings), effectiveMatchRate: Math.round((employerContrib / (annualSalary * employeeContrib / 100)) * 100),
    vestingSchedule: 'Immediate — Safe Harbor contributions vest 100% immediately'
  }
}

export function calculateSeriesEEBond(faceValue: number, purchaseYear: number, currentYear: number, holdUntilMaturity: boolean, federalTaxRate: number = 22) {
  // EE bonds issued today are purchased at their stated purchase price; the
  // historical half-face-value convention is not appropriate for new electronic EE bonds.
  // This calculator is a simplified model and uses the current May-Oct 2026 fixed rate
  // as an illustrative rate for a newly issued bond. Historical bonds require their
  // actual issue-date rate history for an exact redemption value.
  const purchasePrice = Math.max(0, faceValue)
  const currentRate = 0.024 // May-Oct 2026 fixed rate
  const yearsHeld = Math.max(0, currentYear - purchaseYear)
  const guaranteedDoubleYear = 20
  const accruedValue = purchasePrice * Math.pow(1 + currentRate, yearsHeld)
  const currentValue = holdUntilMaturity && yearsHeld >= guaranteedDoubleYear
    ? Math.max(faceValue, accruedValue)
    : accruedValue
  const interestEarned = Math.max(0, currentValue - purchasePrice)
  const effectiveRate = yearsHeld > 0 ? (Math.pow(currentValue / purchasePrice, 1 / yearsHeld) - 1) * 100 : 0
  const federalTax = interestEarned * Math.max(0, Math.min(100, federalTaxRate)) / 100
  return {
    purchasePrice: Math.round(purchasePrice), faceValue, yearsHeld, currentValue: Math.round(currentValue),
    interestEarned: Math.round(interestEarned), effectiveAnnualRate: Math.round(effectiveRate * 10) / 10,
    federalTaxDue: Math.round(federalTax), educationTaxExclusion: 0,
    maturityDate: purchaseYear + 30, doubleDate: purchaseYear + 20,
    tip: 'EE Bonds are exempt from state and local income tax; federal income tax on interest is generally deferred until redemption.'
  }
}

export function calculateSocialSecurityWEP(regularBenefit: number, nonCoveredPension: number, yearsSubstantialEarnings: number) {
  const maxWEPReduction2026 = 621
  const wepFactor = yearsSubstantialEarnings >= 30 ? 0 : yearsSubstantialEarnings >= 21 ? (30 - yearsSubstantialEarnings) / 10 : 0.50
  const wepReduction = Math.min(maxWEPReduction2026, nonCoveredPension * 0.5, regularBenefit * wepFactor)
  const reducedBenefit = Math.round(regularBenefit - wepReduction)
  const gpoReduction = nonCoveredPension * 2/3 // Government Pension Offset
  return {
    regularBenefit: Math.round(regularBenefit), wepReduction: Math.round(wepReduction), reducedBenefit,
    nonCoveredPension: Math.round(nonCoveredPension), gpoReduction: Math.round(gpoReduction),
    yearsSubstantialEarnings, wepFactor: Math.round(wepFactor * 100),
    maxReduction: maxWEPReduction2026, lifetimeImpact: Math.round(wepReduction * 12 * (85 - 67))
  }
}

export function calculateStockOptionTax(optionType: 'iso' | 'nso', grantPrice: number, currentFMV: number, shares: number, ordinaryTaxRate: number, capitalGainsTaxRate: number, heldOver1Year: boolean) {
  const spread = (currentFMV - grantPrice) * shares
  const exerciseCost = grantPrice * shares
  if (optionType === 'nso') {
    const ordinaryTax = spread * (ordinaryTaxRate / 100)
    const ficaTax = Math.min(spread, 184500) * 0.0765
    const totalTax = ordinaryTax + ficaTax
    return { optionType, spread: Math.round(spread), exerciseCost: Math.round(exerciseCost), ordinaryIncomeTax: Math.round(ordinaryTax), ficaTax: Math.round(ficaTax), capitalGainsTax: 0, totalTax: Math.round(totalTax), netGain: Math.round(spread - totalTax), effectiveRate: Math.round(totalTax/spread*100) }
  } else { // ISO
    const amtPreference = spread // AMT adjustment
    const regularTax = heldOver1Year ? spread * (capitalGainsTaxRate / 100) : spread * (ordinaryTaxRate / 100)
    const amtTax = amtPreference * 0.28
    const taxDue = Math.max(regularTax, amtTax)
    return { optionType, spread: Math.round(spread), exerciseCost: Math.round(exerciseCost), ordinaryIncomeTax: 0, amtExposure: Math.round(amtTax), capitalGainsTax: Math.round(heldOver1Year ? spread * (capitalGainsTaxRate/100) : 0), totalTax: Math.round(taxDue), netGain: Math.round(spread - taxDue), heldLongTerm: heldOver1Year, effectiveRate: Math.round(taxDue/spread*100) }
  }
}

export function calculateTBill(faceValue: number, discountRate: number, termDays: number) {
  const purchasePrice = faceValue - (faceValue * discountRate / 100 * termDays / 360)
  const interestEarned = faceValue - purchasePrice
  const bondEquivalentYield = (interestEarned / purchasePrice) * (365 / termDays) * 100
  const annualizedReturn = ((faceValue / purchasePrice) ** (365 / termDays) - 1) * 100
  const taxableInterest = interestEarned // federal only, state/local exempt
  return {
    faceValue, termDays, discountRate,
    purchasePrice: Math.round(purchasePrice * 100) / 100,
    interestEarned: Math.round(interestEarned * 100) / 100,
    bondEquivalentYield: Math.round(bondEquivalentYield * 100) / 100,
    annualizedReturn: Math.round(annualizedReturn * 100) / 100,
    taxAdvantage: 'State and local tax-exempt — especially valuable in high-tax states',
    comparisonRate: `Equivalent taxable yield in 22% bracket: ${Math.round(bondEquivalentYield / (1 - 0.05) * 100) / 100}%`
  }
}

export function calculateW2vs1099(grossIncome: number, businessExpenses: number, filingStatus: 'single' | 'married') {
  const seRate = 0.1530; const seDeduction = grossIncome * seRate * 0.5
  const w2Tax = calculateSimpleFederalTax(grossIncome, filingStatus)
  const fica = grossIncome * 0.0765
  const netIncome1099 = grossIncome - businessExpenses
  const se1099Tax = netIncome1099 * seRate
  const seDed = se1099Tax * 0.5
  const taxable1099 = netIncome1099 - seDed - businessExpenses
  const fedTax1099 = calculateSimpleFederalTax(Math.max(0, netIncome1099 - seDed), filingStatus)
  const total1099Tax = fedTax1099 + se1099Tax
  const totalW2Tax = w2Tax + fica
  const qbiDeduction = Math.min(netIncome1099 * 0.20, (netIncome1099 - seDed) * 0.20)
  const effectiveRate1099 = total1099Tax / grossIncome
  const effectiveRateW2 = totalW2Tax / grossIncome
  return {
    w2: { grossIncome, federalTax: Math.round(w2Tax), ficaTax: Math.round(fica), totalTax: Math.round(totalW2Tax), netTakeHome: Math.round(grossIncome - totalW2Tax), effectiveRate: Math.round(effectiveRateW2 * 100 * 10) / 10 },
    contractor: { grossIncome, businessExpenses, netIncome: Math.round(netIncome1099), seTax: Math.round(se1099Tax), federalTax: Math.round(fedTax1099), totalTax: Math.round(total1099Tax), netTakeHome: Math.round(netIncome1099 - total1099Tax), qbiDeduction: Math.round(qbiDeduction), effectiveRate: Math.round(effectiveRate1099 * 100 * 10) / 10 },
    breakEvenExpenses: Math.round(grossIncome * (seRate - 0.0765)),
    advantageFor: total1099Tax < totalW2Tax ? '1099' : 'W-2'
  }
}

export function calculateWashSale(shares: number, purchasePrice: number, salePrice: number, repurchasePrice: number, daysAfterSale: number) {
  const saleProceeds = shares * salePrice
  const costBasis = shares * purchasePrice
  const realizedLoss = costBasis - saleProceeds
  const isWashSale = daysAfterSale <= 30
  const disallowedLoss = isWashSale ? realizedLoss : 0
  const adjustedBasis = isWashSale ? repurchasePrice + (realizedLoss / shares) : repurchasePrice
  const taxSavingsLost = disallowedLoss * 0.37 // assuming highest bracket
  return {
    saleProceeds: Math.round(saleProceeds), costBasis: Math.round(costBasis), realizedLoss: Math.round(realizedLoss),
    isWashSale, disallowedLoss: Math.round(disallowedLoss), adjustedCostBasis: Math.round(adjustedBasis * shares),
    taxSavingsDeferred: Math.round(taxSavingsLost), washSaleWindow: '30 days before or after sale',
    recommendation: isWashSale ? `Wait ${31 - daysAfterSale} more days to avoid wash sale` : 'Safe — not a wash sale'
  }
}

export function calculateAlimonyTaxImpact(alimonyAmount: number, divorceYear: number, payerIncome: number, recipientIncome: number, payerTaxRate: number, recipientTaxRate: number) {
  // Pre-2019 divorce: deductible for payer, taxable for recipient
  // Post-2018 divorce (TCJA): no deduction for payer, not taxable for recipient
  const isOldLaw = divorceYear < 2019
  const payerDeduction = isOldLaw ? alimonyAmount * (payerTaxRate / 100) : 0
  const recipientTax = isOldLaw ? alimonyAmount * (recipientTaxRate / 100) : 0
  const netTransfer = alimonyAmount - recipientTax
  const payerNetCost = alimonyAmount - payerDeduction
  return {
    annualAlimony: Math.round(alimonyAmount), divorceYear, isOldLaw,
    payerBracket: payerTaxRate, recipientBracket: recipientTaxRate,
    payerDeduction: Math.round(payerDeduction), payerNetCost: Math.round(payerNetCost),
    recipientTaxBurden: Math.round(recipientTax), recipientNetReceived: Math.round(netTransfer),
    taxRule: isOldLaw ? 'Pre-2019: Deductible/Taxable' : 'Post-2018 TCJA: Neither deductible nor taxable',
    note: isOldLaw ? 'Divorce finalized before 2019 — old tax rules apply' : 'TCJA rules apply — no deduction, no income'
  }
}
// ═══════════════════════════════════════════════════════════════════════════
// V10 MERGE — New calculators added from V10 branch (95 new finance tools)
// ═══════════════════════════════════════════════════════════════════════════

export function calculate529RolloverToRoth(rollover529Balance: number, accountAgeYears: number, annualRolloverLimit: number, lifetimeLimit: number, beneficiaryAge: number) {
  const eligible = accountAgeYears >= 15
  const maxAnnualRollover = Math.min(annualRolloverLimit, 7500)
  const yearsToCompleteLifetime = Math.ceil(lifetimeLimit / maxAnnualRollover)
  const totalRolloverPossible = Math.min(rollover529Balance, lifetimeLimit)
  const growth30yr = totalRolloverPossible * Math.pow(1.07, 65 - beneficiaryAge)
  const yearData = Array.from({ length: Math.min(yearsToCompleteLifetime, 10) }, (_, i) => ({
    year: i + 1, rolledOver: Math.min(maxAnnualRollover * (i + 1), lifetimeLimit),
    rothBalance: Math.round(Math.min(maxAnnualRollover * (i + 1), lifetimeLimit) * Math.pow(1.07, i))
  }))
  return {
    eligible, lifetimeLimit, maxAnnualRollover,
    yearsToCompleteRollover: yearsToCompleteLifetime,
    totalRolloverPossible: Math.round(totalRolloverPossible),
    projectedGrowthAt65: Math.round(growth30yr),
    requirement: '529 account must be open 15+ years; rollover subject to annual Roth IRA contribution limits',
    yearData
  }
}

export function calculateAlimonySupport(payorIncome: number, recipientIncome: number, marriageDurationYears: number, state: 'CA'|'NY'|'TX'|'FL'|'other') {
  const incomeDiff = Math.max(0, payorIncome - recipientIncome)
  const caFormula = (payorIncome * 0.40 - recipientIncome * 0.50) / 12
  const nyFormula = (payorIncome * 0.20 - recipientIncome * 0.25) / 12
  const generalFormula = incomeDiff * 0.25 / 12
  const monthly = state === 'CA' ? Math.max(0, caFormula) : state === 'NY' ? Math.max(0, nyFormula) : Math.max(0, generalFormula)
  const durationGuideline = marriageDurationYears < 10 ? marriageDurationYears * 0.5 : marriageDurationYears < 20 ? marriageDurationYears * 0.6 : 99
  const totalEstimate = monthly * 12 * Math.min(durationGuideline, 30)
  const taxNote = 'Post-2018 divorces: alimony is NOT deductible to payor, NOT taxable to recipient (TCJA change)'
  return {
    monthlyAlimony: Math.round(monthly), annualAlimony: Math.round(monthly * 12),
    durationGuidelineYears: Math.round(durationGuideline === 99 ? marriageDurationYears : durationGuideline),
    lifetimeEstimate: Math.round(totalEstimate),
    taxNote, varies: 'Actual awards vary significantly by judge discretion and state-specific factors'
  }
}

export function calculateAnnuityCertainVsLifetime(premium: number, age: number, periodCertainYears: number, lifetimeMonthly: number, periodCertainMonthly: number, discountRate: number) {
  const lifeExpectancy = age < 65 ? 85 : age < 70 ? 84 : age < 75 ? 83 : 82
  const lifeYears = Math.max(0, lifeExpectancy - age)
  const lifetimeTotal = lifetimeMonthly * 12 * lifeYears
  const periodTotal = periodCertainMonthly * 12 * periodCertainYears
  const pvLifetime = lifetimeMonthly * 12 * (1 - Math.pow(1 + discountRate / 100, -lifeYears)) / (discountRate / 100)
  const pvPeriod = periodCertainMonthly * 12 * (1 - Math.pow(1 + discountRate / 100, -periodCertainYears)) / (discountRate / 100)
  const breakEvenAge = age + Math.round(periodTotal / (lifetimeMonthly * 12))
  return {
    lifetimeMonthly, periodCertainMonthly,
    lifetimeTotal: Math.round(lifetimeTotal), periodTotal: Math.round(periodTotal),
    pvLifetime: Math.round(pvLifetime), pvPeriod: Math.round(pvPeriod),
    breakEvenAge, lifeExpectancy,
    recommendation: breakEvenAge < lifeExpectancy ? 'Lifetime annuity likely better if you live to average life expectancy' : 'Period certain offers more value if family health history suggests shorter life',
    survivorNote: 'Period certain guarantees payments to heirs if you die early; lifetime ends at death'
  }
}

export function calculateBackgroundCheckROI(badHireCost: number, screeningCost: number, hiresPerYear: number, badHireRateWithout: number, badHireRateWith: number) {
  const badHiresWithout = hiresPerYear * badHireRateWithout / 100
  const badHiresWith = hiresPerYear * badHireRateWith / 100
  const costWithoutScreening = badHiresWithout * badHireCost
  const costWithScreening = badHiresWith * badHireCost + hiresPerYear * screeningCost
  const netSavings = costWithoutScreening - costWithScreening
  const roi = (netSavings / (hiresPerYear * screeningCost)) * 100
  return {
    badHiresPrevented: Math.round(badHiresWithout - badHiresWith),
    costWithoutScreening: Math.round(costWithoutScreening),
    costWithScreening: Math.round(costWithScreening),
    netSavings: Math.round(netSavings), roi: Math.round(roi),
    avgBadHireCost: 'Bad-hire cost is your input; the calculator does not assume an industry-average cost'
  }
}

export function calculateBridgeLoan(currentHomeValue: number, currentMortgageBalance: number, newHomePrice: number, bridgeLoanRate: number, expectedSaleMonths: number) {
  const currentEquity = currentHomeValue - currentMortgageBalance
  const bridgeLoanAmount = Math.min(currentEquity * 0.80, newHomePrice * 0.20)
  const monthlyInterest = bridgeLoanAmount * bridgeLoanRate / 100 / 12
  const totalInterestCost = monthlyInterest * expectedSaleMonths
  const originationFee = bridgeLoanAmount * 0.015
  const totalBridgeCost = totalInterestCost + originationFee
  const traditionalContingency = 'Without bridge loan: must sell current home before buying, risking losing the new home in competitive market'
  const dualMortgagePayment = currentMortgageBalance * 0.065 / 12 + newHomePrice * 0.8 * 0.07 / 12
  return {
    currentEquity: Math.round(currentEquity), bridgeLoanAmount: Math.round(bridgeLoanAmount),
    monthlyInterest: Math.round(monthlyInterest), totalInterestCost: Math.round(totalInterestCost),
    originationFee: Math.round(originationFee), totalBridgeCost: Math.round(totalBridgeCost),
    expectedSaleMonths, dualMortgagePayment: Math.round(dualMortgagePayment),
    competitiveAdvantage: 'Non-contingent offer often wins in competitive markets even at higher price'
  }
}

export function calculateBusinessStartupCosts(oneTimeCosts: number, monthlyOverhead: number, monthlyRevenue: number, grossMargin: number, loanAmount: number, loanRate: number) {
  const monthlyProfit = monthlyRevenue * grossMargin / 100 - monthlyOverhead
  const loanPayment = loanAmount > 0 ? loanAmount * (loanRate / 100 / 12) / (1 - Math.pow(1 + loanRate / 100 / 12, -60)) : 0
  const breakEvenMonths = monthlyProfit > 0 ? Math.ceil((oneTimeCosts + loanAmount) / monthlyProfit) : Infinity
  const year1Profit = (monthlyProfit - loanPayment) * 12 - oneTimeCosts
  const year2Profit = (monthlyProfit - loanPayment) * 12
  const year3Profit = (monthlyProfit - loanPayment) * 12 * 1.2
  const runway = Math.floor((oneTimeCosts + loanAmount) / Math.max(1, monthlyOverhead + loanPayment))
  return {
    monthlyRevenue, monthlyProfit: Math.round(monthlyProfit),
    loanPayment: Math.round(loanPayment),
    netMonthlyCashFlow: Math.round(monthlyProfit - loanPayment),
    breakEvenMonths: isFinite(breakEvenMonths) ? breakEvenMonths : 'Never at current revenue',
    year1Profit: Math.round(year1Profit), year2Profit: Math.round(year2Profit), year3Profit: Math.round(year3Profit),
    runway, totalStartupInvestment: Math.round(oneTimeCosts + loanAmount),
    roi3yr: Math.round((year1Profit + year2Profit + year3Profit) / (oneTimeCosts + loanAmount) * 100)
  }
}

export function calculateCareerEarningsPotential(currentAge: number, currentSalary: number, retirementAge: number, annualRaiseRate: number, promotionFrequencyYears: number, promotionRaisePercent: number, taxRate: number) {
  let salary = currentSalary
  let totalEarnings = 0, totalAfterTax = 0
  const yearData = []
  for (let i = 0; i < retirementAge - currentAge; i++) {
    const isPromoYear = promotionFrequencyYears > 0 && i > 0 && i % promotionFrequencyYears === 0
    salary *= (1 + annualRaiseRate / 100)
    if (isPromoYear) salary *= (1 + promotionRaisePercent / 100)
    const afterTax = salary * (1 - taxRate / 100)
    totalEarnings += salary
    totalAfterTax += afterTax
    yearData.push({ year: i + 1, age: currentAge + i + 1, salary: Math.round(salary), afterTax: Math.round(afterTax), cumulative: Math.round(totalEarnings) })
  }
  return {
    currentSalary, finalSalary: Math.round(salary),
    totalEarnings: Math.round(totalEarnings), totalAfterTax: Math.round(totalAfterTax),
    totalTaxPaid: Math.round(totalEarnings - totalAfterTax),
    yearsWorking: retirementAge - currentAge,
    avgAnnualEarnings: Math.round(totalEarnings / (retirementAge - currentAge)),
    salaryGrowth: Math.round((salary / currentSalary - 1) * 100),
    yearData
  }
}

export function calculateCollectiblesInvestment(purchasePrice: number, category: 'art'|'wine'|'watches'|'cards'|'cars', holdYears: number, insuranceCost: number, storageCost: number) {
  const appreciationRates: Record<string, number> = { art: 7.5, wine: 9.0, watches: 6.0, cards: 12.0, cars: 8.5 }
  const rate = appreciationRates[category]
  const futureValue = purchasePrice * Math.pow(1 + rate / 100, holdYears)
  const totalCosts = (insuranceCost + storageCost) * holdYears
  const sellingFee = futureValue * 0.15 // auction house fee
  const netProceeds = futureValue - sellingFee
  const totalReturn = netProceeds - purchasePrice - totalCosts
  const roi = totalReturn / (purchasePrice + totalCosts) * 100
  const annualizedReturn = (Math.pow(netProceeds / (purchasePrice + totalCosts), 1 / holdYears) - 1) * 100
  const capitalGainsTax = Math.max(0, futureValue - purchasePrice) * 0.28 // collectibles taxed at 28% max
  return {
    futureValue: Math.round(futureValue), totalCosts: Math.round(totalCosts),
    sellingFee: Math.round(sellingFee), netProceeds: Math.round(netProceeds),
    totalReturn: Math.round(totalReturn), roi: Math.round(roi * 10) / 10,
    annualizedReturn: Math.round(annualizedReturn * 100) / 100,
    capitalGainsTax: Math.round(capitalGainsTax),
    liquidityNote: 'Collectibles are illiquid — selling can take months and authentication adds cost',
    taxRate: '28% maximum capital gains rate on collectibles (vs 20% for stocks)'
  }
}

export function calculateCollegeAidStrategies(parentIncome: number, parentAssets: number, studentIncome: number, studentAssets: number, homeEquity: number, businessValue: number) {
  // EFC = Expected Family Contribution (now SAI - Student Aid Index)
  const assessedParentIncome = Math.max(0, parentIncome - 30000) * 0.22
  const assessedParentAssets = (parentAssets - 10000) * 0.056 // asset protection allowance
  const assessedStudentIncome = Math.max(0, studentIncome - 7600) * 0.50
  const assessedStudentAssets = studentAssets * 0.20
  const sai = Math.round(assessedParentIncome + assessedParentAssets + assessedStudentIncome + assessedStudentAssets)
  const withHomeEquity = sai + homeEquity * 0.056
  const withBusiness = sai + businessValue * 0.056 * 0.10 // rough business inclusion
  const savings = withHomeEquity - sai
  return {
    estimatedSAI: sai, assessedParentIncome: Math.round(assessedParentIncome),
    assessedParentAssets: Math.round(assessedParentAssets),
    assessedStudentAssets: Math.round(assessedStudentAssets),
    homeEquityImpact: Math.round(homeEquity * 0.056),
    strategies: [
      'Maximize retirement contributions (excluded from FAFSA assets)',
      'Pay down home equity before filing FAFSA (primary home excluded)',
      'Shift assets from student to parent (student assets counted at 20% vs 5.64%)',
      'Spend student assets on allowable expenses before FAFSA filing',
      'File FAFSA as early as possible (October 1) for priority aid',
      homeEquity > 50000 ? 'Consider using home equity for college costs to reduce savings balance' : 'Keep liquid savings for emergency fund and college costs'
    ]
  }
}

export function calculateCollegeDebtBurden(loanBalance: number, expectedSalary: number, loanRate: number, repaymentYears: number, filingStatus: 'single'|'married') {
  const mr = loanRate/100/12
  const months = repaymentYears * 12
  const payment = loanBalance * (mr * Math.pow(1+mr,months)) / (Math.pow(1+mr,months)-1)
  const annualPayment = payment * 12
  const paymentToIncome = annualPayment / expectedSalary * 100
  const debtToIncome = loanBalance / expectedSalary
  const totalInterest = payment * months - loanBalance
  const saveCost = loanBalance > 0 ? Math.max(0, expectedSalary * 0.10 - annualPayment) : expectedSalary * 0.10
  const affordable = paymentToIncome <= 10
  const manageableBalance = expectedSalary * 1.0
  const excessDebt = Math.max(0, loanBalance - manageableBalance)
  const forgivenessBenefit = loanBalance > manageableBalance * 1.5 ? (loanBalance - payment*120) : 0
  return {
    monthlyPayment: Math.round(payment*100)/100,
    annualPayment: Math.round(annualPayment),
    paymentToIncome: Math.round(paymentToIncome*10)/10,
    debtToIncome: Math.round(debtToIncome*100)/100,
    totalInterest: Math.round(totalInterest),
    affordable, manageableBalance: Math.round(manageableBalance),
    excessDebt: Math.round(excessDebt),
    forgivenessBenefit: Math.round(Math.max(0, forgivenessBenefit)),
    recommendation: paymentToIncome > 20 ? 'Consider IDR plan — payments capped at 5-10% of discretionary income' :
      paymentToIncome > 10 ? 'Manageable but tight — IDR or refinancing may help' : 'Well within affordable range',
    idRMonthlyEst: Math.round(Math.max(0, expectedSalary - 22000) * 0.05 / 12)
  }
}

export function calculateCollegeSavingsGoal(childAge: number, targetCollegeYear: number, annualCost: number, costInflation: number, currentSavings: number, expectedReturn: number) {
  const yearsToCollege = targetCollegeYear - (new Date().getFullYear())
  const inflatedAnnualCost = annualCost * Math.pow(1 + costInflation / 100, yearsToCollege)
  const total4YrCost = inflatedAnnualCost * 4 * (1 + (Math.pow(1 + costInflation / 100, 4) - 1) / 4)
  const fvCurrentSavings = currentSavings * Math.pow(1 + expectedReturn / 100, yearsToCollege)
  const remainingNeeded = Math.max(0, total4YrCost - fvCurrentSavings)
  const monthlyRate = expectedReturn / 100 / 12
  const monthsToCollege = yearsToCollege * 12
  const requiredMonthly = remainingNeeded > 0 ? remainingNeeded * monthlyRate / (Math.pow(1 + monthlyRate, monthsToCollege) - 1) : 0
  const yearData = Array.from({ length: yearsToCollege + 1 }, (_, i) => ({
    year: i, age: childAge + i,
    balance: Math.round(currentSavings * Math.pow(1 + expectedReturn / 100, i) + requiredMonthly * 12 * ((Math.pow(1 + expectedReturn / 100, i) - 1) / (expectedReturn / 100)))
  }))
  return {
    yearsToCollege, inflatedAnnualCost: Math.round(inflatedAnnualCost),
    total4YrCost: Math.round(total4YrCost), fvCurrentSavings: Math.round(fvCurrentSavings),
    remainingNeeded: Math.round(remainingNeeded),
    requiredMonthly: Math.round(requiredMonthly),
    onTrack: fvCurrentSavings >= total4YrCost, yearData
  }
}

export function calculateCostSegregation(buildingCost: number, landCost: number, propertyType: 'residential'|'commercial', taxRate: number) {
  const depBase = buildingCost
  const standardAnnual = depBase / (propertyType === 'residential' ? 27.5 : 39)
  const fiveYrPct = 0.15, sevenYrPct = 0.10, fifteenYrPct = 0.08
  const accelerated5 = depBase * fiveYrPct
  const accelerated7 = depBase * sevenYrPct
  const accelerated15 = depBase * fifteenYrPct
  const remainingRegular = depBase * (1 - fiveYrPct - sevenYrPct - fifteenYrPct)
  const year1WithBonus = accelerated5 + accelerated7 + accelerated15
  const year1Standard = standardAnnual
  const year1Acceleration = year1WithBonus - year1Standard
  const tax1stYear = year1Acceleration * taxRate / 100
  const studyCost = buildingCost < 1000000 ? 8000 : buildingCost < 5000000 ? 15000 : 25000
  const roi = Math.round(tax1stYear / studyCost)
  return {
    standardAnnualDepreciation: Math.round(standardAnnual),
    fiveYearProperty: Math.round(accelerated5),
    sevenYearProperty: Math.round(accelerated7),
    fifteenYearProperty: Math.round(accelerated15),
    year1AcceleratedDeduction: Math.round(year1WithBonus),
    year1TaxSavings: Math.round(tax1stYear),
    studyCost, roi,
    npvBenefit: Math.round(tax1stYear * 0.85),
    recommendation: roi > 3 ? 'Cost segregation study strongly recommended' : 'Marginal benefit — evaluate for properties over $1M'
  }
}

export function calculateCryptoStakingRewards(stakedAmount: number, apr: number, compoundFrequency: number, months: number, taxRate: number, rewardPrice: number) {
  const periodicRate = apr / 100 / compoundFrequency
  const periods = months / 12 * compoundFrequency
  const finalValue = stakedAmount * Math.pow(1 + periodicRate, periods)
  const totalRewards = finalValue - stakedAmount
  const rewardsInTokens = totalRewards / rewardPrice
  const taxOnRewards = totalRewards * taxRate / 100
  const netRewards = totalRewards - taxOnRewards
  const effectiveAPY = (Math.pow(1 + periodicRate, compoundFrequency) - 1) * 100
  const yearData = Array.from({ length: Math.ceil(months / 12) + 1 }, (_, i) => ({
    year: i,
    value: Math.round(stakedAmount * Math.pow(1 + periodicRate, i * compoundFrequency)),
    rewards: Math.round(stakedAmount * Math.pow(1 + periodicRate, i * compoundFrequency) - stakedAmount)
  }))
  return {
    finalValue: Math.round(finalValue), totalRewards: Math.round(totalRewards),
    rewardsInTokens: Math.round(rewardsInTokens * 100) / 100,
    taxOnRewards: Math.round(taxOnRewards), netRewards: Math.round(netRewards),
    effectiveAPY: Math.round(effectiveAPY * 100) / 100,
    taxNote: 'Staking rewards are taxed as ordinary income when received (not at sale)',
    yearData
  }
}

export function calculateDebtToIncomeOptimizer(monthlyGrossIncome: number, debts: Array<{name: string; payment: number; balance: number; rate: number}>) {
  const totalDebtPayments = debts.reduce((s, d) => s + d.payment, 0)
  const currentDTI = totalDebtPayments / monthlyGrossIncome * 100
  const frontEndDTI = 0 // no housing in this calc
  const mortgageCapacity = Math.max(0, monthlyGrossIncome * 0.28 - totalDebtPayments)
  const fhaDTI = Math.max(0, monthlyGrossIncome * 0.43 - totalDebtPayments)
  // Payoff priority (avalanche)
  const sorted = [...debts].sort((a, b) => b.rate - a.rate)
  const payoffOrder = sorted.map((d, i) => ({
    ...d, priority: i+1,
    monthsToPayoff: Math.round(d.balance / (d.payment - d.balance * d.rate/100/12))
  }))
  const dtiAfterPayoff = (totalDebtPayments - sorted[0]?.payment) / monthlyGrossIncome * 100
  return {
    monthlyGrossIncome, totalDebtPayments: Math.round(totalDebtPayments),
    currentDTI: Math.round(currentDTI * 10) / 10,
    mortgageCapacity: Math.round(mortgageCapacity),
    fhaCapacity: Math.round(fhaDTI),
    goodDTI: currentDTI < 36,
    acceptableDTI: currentDTI < 43,
    payoffOrder,
    dtiAfterTopPayoff: Math.round(dtiAfterPayoff * 10) / 10,
    actionItems: currentDTI > 43 ? ['Pay off highest-rate debt immediately', 'Avoid new debt', 'Consider balance transfer or consolidation'] : currentDTI > 36 ? ['Monitor DTI before applying for mortgage', 'Pay down revolving debt'] : ['DTI is healthy — maintain current payments']
  }
}

export function calculateDisabilityInsuranceNeeds(annualIncome: number, monthlyExpenses: number, existingCoverage: number, employerSTDCoverage: number, age: number) {
  const recommendedCoverage = annualIncome * 0.60 / 12 // 60% income replacement standard
  const gap = Math.max(0, recommendedCoverage - existingCoverage - employerSTDCoverage)
  const monthlyPremiumEst = gap * 12 * (age < 35 ? 0.015 : age < 45 ? 0.02 : 0.028)
  const ltdWaitingPeriod = 90 // typical days
  const ssdiBenefit = Math.min(annualIncome * 0.40, 39000) / 12
  const totalCoverageWithSSDI = existingCoverage + employerSTDCoverage + gap
  const disabilityProbability = age < 35 ? 0.25 : age < 45 ? 0.30 : 0.32 // lifetime probability before 65
  return {
    recommendedMonthlyCoverage: Math.round(recommendedCoverage),
    currentGap: Math.round(gap),
    estimatedAnnualPremium: Math.round(monthlyPremiumEst),
    estimatedMonthlyPremium: Math.round(monthlyPremiumEst / 12),
    ssdiEstimate: Math.round(ssdiBenefit),
    waitingPeriodDays: ltdWaitingPeriod,
    lifetimeDisabilityProbability: Math.round(disabilityProbability * 100),
    note: `${Math.round(disabilityProbability*100)}% of 20-year-olds will experience a disability before retirement (SSA data)`
  }
}

export function calculateDividendGrowthPortfolio(initialInvestment: number, yieldOnCost: number, dividendGrowthRate: number, shareGrowthRate: number, years: number, taxRate: number) {
  let shares = initialInvestment / 100 // normalized $100/share start
  let annualDiv = initialInvestment * yieldOnCost / 100
  let portfolioValue = initialInvestment
  const yearData = []
  for (let i = 0; i <= years; i++) {
    const tax = annualDiv * taxRate / 100 * 0.15 // qualified dividend rate
    const netDiv = annualDiv - tax
    yearData.push({ year: i, annualDividend: Math.round(annualDiv), netDividend: Math.round(netDiv), portfolioValue: Math.round(portfolioValue), yieldOnCost: Math.round(annualDiv / initialInvestment * 10000) / 100 })
    annualDiv *= (1 + dividendGrowthRate / 100)
    portfolioValue *= (1 + shareGrowthRate / 100)
  }
  const finalYOC = yearData[years]?.yieldOnCost || 0
  const totalDividendsReceived = yearData.reduce((s, y) => s + y.annualDividend, 0)
  return {
    initialInvestment, finalPortfolioValue: yearData[years]?.portfolioValue || 0,
    finalAnnualDividend: yearData[years]?.annualDividend || 0,
    finalYieldOnCost: finalYOC, totalDividendsReceived: Math.round(totalDividendsReceived),
    totalReturn: Math.round((yearData[years]?.portfolioValue || 0) + totalDividendsReceived - initialInvestment),
    yearData
  }
}

export function calculateDonorAdvisedFund(contributionAmount: number, appreciatedStockBasis: number, currentMarketValue: number, taxRate: number, annualGrantPercent: number) {
  const useAppreciatedStock = currentMarketValue > 0
  const capitalGainsAvoided = useAppreciatedStock ? (currentMarketValue - appreciatedStockBasis) * 0.20 : 0
  const deductionValue = useAppreciatedStock ? currentMarketValue : contributionAmount
  const taxSavings = deductionValue * taxRate / 100
  const totalTaxBenefit = taxSavings + capitalGainsAvoided
  const fundGrowth10yr = deductionValue * Math.pow(1.06, 10)
  const annualGrantAmount = deductionValue * annualGrantPercent / 100
  const yearsOfGiving = deductionValue / annualGrantAmount
  return {
    deductionValue: Math.round(deductionValue), taxSavings: Math.round(taxSavings),
    capitalGainsAvoided: Math.round(capitalGainsAvoided), totalTaxBenefit: Math.round(totalTaxBenefit),
    netCostOfGiving: Math.round(deductionValue - totalTaxBenefit),
    fundGrowth10yr: Math.round(fundGrowth10yr), annualGrantAmount: Math.round(annualGrantAmount),
    yearsOfGiving: Math.round(yearsOfGiving),
    strategy: useAppreciatedStock ? 'Donating appreciated stock avoids capital gains AND gets full FMV deduction' : 'Consider donating appreciated securities instead of cash for additional tax benefit'
  }
}

export function calculateESOPValue(esopShares: number, currentValuation: number, vestingYears: number, currentYear: number, distributionAge: number, currentAge: number) {
  const vestedPercent = Math.min(100, currentYear / vestingYears * 100)
  const currentVestedValue = esopShares * currentValuation * vestedPercent / 100
  const yearsToFullVest = Math.max(0, vestingYears - currentYear)
  const yearsToDistribution = distributionAge - currentAge
  const projectedGrowth = 0.06
  const futureValue = esopShares * currentValuation * Math.pow(1 + projectedGrowth, yearsToDistribution)
  const taxOnDistribution = futureValue * 0.22 // if lump sum, ordinary income (unless NUA applies)
  const netDistribution = futureValue - taxOnDistribution
  return {
    vestedPercent: Math.round(vestedPercent),
    currentVestedValue: Math.round(currentVestedValue),
    yearsToFullVest, projectedFutureValue: Math.round(futureValue),
    taxOnDistribution: Math.round(taxOnDistribution), netDistribution: Math.round(netDistribution),
    diversificationRisk: 'ESOP concentrates retirement savings in employer stock — diversify upon distribution',
    nuaOpportunity: 'Consider Net Unrealized Appreciation strategy at distribution for tax-efficient diversification'
  }
}

export function calculateElderCareCost(careLevel: 'independent'|'assisted'|'memory'|'skilled', monthlyHours: number, hourlyRate: number, facilityMonthly: number, state: string) {
  const stateMultiplier: Record<string, number> = { CA: 1.25, NY: 1.30, FL: 0.95, TX: 0.90, OH: 0.85 }
  const mult = stateMultiplier[state] || 1.0
  const homeCareMonthly = monthlyHours * hourlyRate * mult
  const facilityCostAdj = facilityMonthly * mult
  const facilityDefaults: Record<string, number> = { independent: 3500, assisted: 5400, memory: 6800, skilled: 9500 }
  const estimatedFacility = (facilityMonthly || facilityDefaults[careLevel]) * mult
  const annualHomeCare = homeCareMonthly * 12
  const annualFacility = estimatedFacility * 12
  const fiveYearHome = annualHomeCare * 5 * 1.04 // inflation
  const fiveYearFacility = annualFacility * 5 * 1.04
  const medicaidSpendDown = 2000 // asset limit
  return {
    homeCareMonthly: Math.round(homeCareMonthly), facilityMonthly: Math.round(estimatedFacility),
    annualHomeCare: Math.round(annualHomeCare), annualFacility: Math.round(annualFacility),
    fiveYearHomeCare: Math.round(fiveYearHome), fiveYearFacility: Math.round(fiveYearFacility),
    medicaidSpendDownLimit: medicaidSpendDown,
    cheaperOption: annualHomeCare < annualFacility ? 'Home Care' : 'Facility Care',
    note: 'Medicaid covers long-term care only after spending down assets to ~$2,000 (varies by state)'
  }
}

export function calculateEquityIndexedAnnuity(premium: number, participationRate: number, capRate: number, floorRate: number, indexReturn: number, years: number) {
  let value = premium
  const yearData = []
  for(let i = 0; i < years; i++) {
    const creditedRate = Math.min(capRate, Math.max(floorRate, indexReturn * participationRate / 100))
    value *= (1 + creditedRate / 100)
    yearData.push({ year: i+1, value: Math.round(value), creditedRate })
  }
  const totalGrowth = value - premium
  const effectiveCagr = (Math.pow(value/premium, 1/years) - 1) * 100
  const alternativeCD = premium * Math.pow(1.05, years)
  const alternativeStocks = premium * Math.pow(1.10, years)
  return {
    finalValue: Math.round(value), totalGrowth: Math.round(totalGrowth),
    effectiveCagr: Math.round(effectiveCagr * 100) / 100,
    alternativeCD: Math.round(alternativeCD),
    alternativeStocks: Math.round(alternativeStocks),
    vsCD: Math.round(value - alternativeCD),
    vsStocks: Math.round(value - alternativeStocks),
    floorProtection: `${floorRate}% minimum — you never lose principal in down years`,
    capCost: `${capRate}% cap — you give up upside beyond this to fund the floor`,
    yearData
  }
}

export function calculateEstateLiquidityNeeds(grossEstate: number, federalEstateTax: number, stateTax: number, debts: number, adminCosts: number, liquidAssets: number) {
  const totalObligations = federalEstateTax + stateTax + debts + adminCosts
  const liquidityGap = Math.max(0, totalObligations - liquidAssets)
  const lifeInsuranceNeeded = liquidityGap
  const forcedSaleRisk = liquidityGap > 0
  const annualPremiumEst = lifeInsuranceNeeded * 0.004 // rough permanent life rate
  const ilit = lifeInsuranceNeeded > 0
  const deferralOption = federalEstateTax > 0 ? 'IRC 6166 allows installment payments of estate tax on closely-held business interests over 14 years' : 'No federal estate tax — no deferral needed'
  return {
    totalObligations: Math.round(totalObligations),
    liquidAssets, liquidityGap: Math.round(liquidityGap),
    forcedSaleRisk, lifeInsuranceNeeded: Math.round(lifeInsuranceNeeded),
    annualPremiumEst: Math.round(annualPremiumEst),
    ilitRecommended: ilit,
    deferralOption,
    strategies: liquidityGap > 0 ? ['ILIT (life insurance outside estate)', 'IRC 6166 installment election', 'Graegin note for deductible interest', 'Installment sale of illiquid assets'] : ['Estate is liquid — no forced sale risk']
  }
}

export function calculateEstatePlanningChecklist(age: number, netWorth: number, hasWill: boolean, hasTrust: boolean, hasPOA: boolean, hasHealthcareDirective: boolean, beneficiaryDesignations: boolean, lifeInsuranceCoverage: number, dependents: number) {
  const score = [hasWill, hasTrust && netWorth > 500000, hasPOA, hasHealthcareDirective, beneficiaryDesignations].filter(Boolean).length
  const maxScore = 5
  const gaps = []
  if (!hasWill) gaps.push({ priority: 'HIGH', item: 'Will — without one, state intestacy laws control asset distribution' })
  if (!hasPOA) gaps.push({ priority: 'HIGH', item: 'Durable Power of Attorney — needed for financial decisions if incapacitated' })
  if (!hasHealthcareDirective) gaps.push({ priority: 'HIGH', item: 'Healthcare Directive/Living Will — medical decisions if unable to communicate' })
  if (!beneficiaryDesignations) gaps.push({ priority: 'HIGH', item: 'Beneficiary designations on IRA/401k/life insurance — these override your will' })
  if (netWorth > 500000 && !hasTrust) gaps.push({ priority: 'MEDIUM', item: 'Revocable Living Trust — avoids probate, maintains privacy' })
  if (dependents > 0 && lifeInsuranceCoverage < netWorth * 0.5) gaps.push({ priority: 'MEDIUM', item: `Life insurance — current coverage may be insufficient for ${dependents} dependent(s)` })
  const readinessPercent = Math.round(score / maxScore * 100)
  return { score, maxScore, readinessPercent, gaps, urgentGaps: gaps.filter(g => g.priority === 'HIGH').length, costEstimate: Math.round(gaps.length * 800), nextStep: gaps.length > 0 ? gaps[0].item : 'Estate plan is complete — review every 3-5 years or after major life events' }
}

export function calculateEstateTaxByState(grossEstate: number, state: string) {
  const stateExemptions: Record<string, number> = { MA: 2000000, OR: 1000000, MN: 3000000, IL: 4000000, NY: 7160000, WA: 2193000, CT: 13610000, ME: 7000000, HI: 5490000, MD: 5000000, VT: 5000000, RI: 1774583, DC: 4529000 }
  const stateRates: Record<string, number> = { MA: 16, OR: 16, MN: 16, IL: 16, NY: 16, WA: 20, CT: 12, ME: 12, HI: 20, MD: 16, VT: 16, RI: 16, DC: 16 }
  const federalExemption = 15000000
  const stateExemption = stateExemptions[state] || Infinity
  const stateRate = stateRates[state] || 0
  const federalTaxable = Math.max(0, grossEstate - federalExemption)
  const stateTaxable = Math.max(0, grossEstate - stateExemption)
  const federalTax = federalTaxable * 0.40
  const stateTax = stateTaxable * stateRate / 100
  const totalTax = federalTax + stateTax
  const hasStateTax = stateExemption < Infinity
  return {
    grossEstate, federalExemption, stateExemption: hasStateTax ? stateExemption : 'No state estate tax',
    federalTaxable: Math.round(federalTaxable), stateTaxable: Math.round(stateTaxable),
    federalTax: Math.round(federalTax), stateTax: Math.round(stateTax),
    totalTax: Math.round(totalTax), effectiveRate: Math.round(totalTax / grossEstate * 1000) / 10,
    netToHeirs: Math.round(grossEstate - totalTax), hasStateTax,
    stateNote: hasStateTax ? `${state} has a separate estate tax with $${stateExemption.toLocaleString()} exemption` : 'This state has no separate estate tax'
  }
}

export function calculateFIREWithPartTime(targetAnnualExpenses: number, partTimeIncome: number, portfolio: number, investReturn: number, inflationRate: number, startAge: number) {
  const netExpenses = Math.max(0, targetAnnualExpenses - partTimeIncome)
  const baristaFIRE = netExpenses / 0.04
  const fullFIRE = targetAnnualExpenses / 0.04
  const reduction = fullFIRE - baristaFIRE
  const reductionPercent = reduction / fullFIRE * 100
  const yearsToBarista = portfolio < baristaFIRE ?
    Math.log((baristaFIRE * investReturn / 100 + netExpenses) / (portfolio * investReturn / 100 + netExpenses)) / Math.log(1 + investReturn / 100) : 0
  const yearsToFull = portfolio < fullFIRE ?
    Math.log((fullFIRE * investReturn / 100 + targetAnnualExpenses) / (portfolio * investReturn / 100 + targetAnnualExpenses)) / Math.log(1 + investReturn / 100) : 0
  const yearsSaved = Math.max(0, yearsToFull - yearsToBarista)
  return {
    baristaFIRENumber: Math.round(baristaFIRE),
    fullFIRENumber: Math.round(fullFIRE),
    portfolioReduction: Math.round(reduction),
    reductionPercent: Math.round(reductionPercent),
    yearsToBarista: Math.round(yearsToBarista * 10) / 10,
    yearsToFullFIRE: Math.round(yearsToFull * 10) / 10,
    yearsSavedByPartTime: Math.round(yearsSaved * 10) / 10,
    baristaRetirementAge: Math.round(startAge + yearsToBarista)
  }
}

export function calculateFamilyBudget(monthlyIncome: number, housing: number, transportation: number, food: number, childcare: number, insurance: number, entertainment: number, savings: number, debt: number) {
  const totalExpenses = housing + transportation + food + childcare + insurance + entertainment + savings + debt
  const surplus = monthlyIncome - totalExpenses
  const savingsRate = savings / monthlyIncome * 100
  const housingRatio = housing / monthlyIncome * 100
  const debtRatio = debt / monthlyIncome * 100
  const needs = housing + transportation + food + insurance + childcare
  const wants = entertainment
  const savingsDebt = savings + debt
  const fiftyThirtyTwenty = {
    needs: Math.round(needs/monthlyIncome*100),
    wants: Math.round(wants/monthlyIncome*100),
    savingsDebt: Math.round(savingsDebt/monthlyIncome*100)
  }
  const emergencyFundGoal = (food + housing + transportation) * 6
  const monthsToEmergencyFund = emergencyFundGoal / Math.max(1, surplus + savings)
  return {
    monthlyIncome, totalExpenses: Math.round(totalExpenses),
    surplus: Math.round(surplus), savingsRate: Math.round(savingsRate*10)/10,
    housingRatio: Math.round(housingRatio*10)/10,
    debtRatio: Math.round(debtRatio*10)/10,
    fiftyThirtyTwenty, emergencyFundGoal: Math.round(emergencyFundGoal),
    monthsToEmergencyFund: Math.round(monthsToEmergencyFund),
    alerts: [
      ...(housingRatio > 30 ? ['⚠️ Housing exceeds 30% — consider downsizing or increasing income'] : []),
      ...(debtRatio > 15 ? ['⚠️ Debt payments exceed 15% of income — focus on payoff'] : []),
      ...(savingsRate < 10 ? ['⚠️ Savings rate below 10% — increase contributions'] : ['✅ Savings rate healthy']),
      ...(surplus < 0 ? ['🚨 Monthly deficit — expenses exceed income'] : [`✅ Monthly surplus: $${Math.round(surplus)}`])
    ]
  }
}

export function calculateFederalContractorTax(contractRevenue: number, contractType: 'w2'|'1099'|'corp2corp', businessExpenses: number, state: string, retirement: number) {
  const stateRates: Record<string, number> = { CA: 0.093, NY: 0.0685, TX: 0, FL: 0, WA: 0, IL: 0.0495, VA: 0.0575, MD: 0.0575 }
  const stateRate = stateRates[state] || 0.05
  if (contractType === 'w2') {
    const fica = Math.min(contractRevenue, 184500) * 0.0765
    const fedTax = contractRevenue * 0.22
    const stateTax = contractRevenue * stateRate
    return { grossRevenue: contractRevenue, netTakeHome: Math.round(contractRevenue - fica - fedTax - stateTax), fica: Math.round(fica), federalTax: Math.round(fedTax), stateTax: Math.round(stateTax), seTax: 0, effectiveRate: Math.round((fica + fedTax + stateTax) / contractRevenue * 100) }
  }
  const netSE = contractRevenue - businessExpenses
  const seEarnings = Math.max(0, netSE * 0.9235)
  const socialSecurityTax = Math.min(seEarnings, 184500) * 0.124
  const medicareTax = seEarnings * 0.029
  const seTax = socialSecurityTax + medicareTax
  const seDeduction = seTax / 2
  const qbi = Math.max(0, netSE - seDeduction) * 0.20
  const fedTaxable = Math.max(0, netSE - seDeduction - qbi - retirement - 16100)
  const fedTax = fedTaxable * 0.22
  const stateTax = netSE * stateRate
  const totalTax = seTax + fedTax + stateTax
  return { grossRevenue: contractRevenue, netSEIncome: Math.round(netSE), seTax: Math.round(seTax), federalTax: Math.round(fedTax), stateTax: Math.round(stateTax), totalTax: Math.round(totalTax), netTakeHome: Math.round(netSE - totalTax), effectiveRate: Math.round(totalTax / contractRevenue * 100), quarterly: Math.round(totalTax / 4) }
}

export function calculateGigEconomyTax(platforms: Array<{name: string; income: number}>, businessExpenses: number, milesDriven: number, homeOfficePercent: number, phonePercent: number, monthlyPhone: number) {
  const totalIncome = platforms.reduce((s, p) => s + p.income, 0)
  const mileageDeduction = milesDriven * 0.76 // IRS business mileage rate effective July 1, 2026; Jan-Jun was $0.725
  const homeOfficeDeduction = homeOfficePercent / 100 * 18000 // est annual rent
  const phoneDeduction = phonePercent / 100 * monthlyPhone * 12
  const totalDeductions = businessExpenses + mileageDeduction + homeOfficeDeduction + phoneDeduction
  const netSEIncome = Math.max(0, totalIncome - totalDeductions)
  const seTax = netSEIncome * 0.9235 * 0.153
  const seDeduction = seTax / 2
  const qbi = (netSEIncome - seDeduction) * 0.20
  const federalTaxable = Math.max(0, netSEIncome - seDeduction - qbi - 16100)
  const federalTax = federalTaxable * 0.22
  const totalTax = seTax + federalTax
  const effectiveRate = totalIncome > 0 ? totalTax / totalIncome * 100 : 0
  const quarterly = totalTax / 4
  return {
    totalIncome: Math.round(totalIncome),
    mileageDeduction: Math.round(mileageDeduction),
    homeOfficeDeduction: Math.round(homeOfficeDeduction),
    phoneDeduction: Math.round(phoneDeduction),
    totalDeductions: Math.round(totalDeductions),
    netSEIncome: Math.round(netSEIncome),
    seTax: Math.round(seTax),
    federalTax: Math.round(federalTax),
    totalTax: Math.round(totalTax),
    effectiveRate: Math.round(effectiveRate * 10) / 10,
    quarterly: Math.round(quarterly),
    netTakeHome: Math.round(totalIncome - totalTax - totalDeductions)
  }
}

export function calculateHSAvs401kPriority(salary: number, employer401kMatch: number, hsaEligible: boolean, currentAge: number, taxRate: number) {
  const matchAmount = salary * Math.min(employer401kMatch, 6) / 100
  const hsaLimit = 4400 // 2026 IRS self-only HSA contribution limit (Rev. Proc. / IRS Notice 2026-5)
  const limit401k = 24500 // 2026 IRS elective-deferral limit (IR-2025-111)
  const iraLimit = 7500 // 2026 IRA contribution limit (IR-2025-111)
  const hsaTaxSavings = hsaLimit * (taxRate + 7.65) / 100
  const k401TaxSavings = matchAmount > 0 ? matchAmount : 0 // free money from match
  const priorityOrder = [
    { step: 1, action: '401k up to employer match', amount: matchAmount, reason: 'Free money — 100% instant return' },
    { step: 2, action: 'Max HSA', amount: hsaLimit, reason: hsaEligible ? 'Triple tax advantage — best account in tax code' : 'Not eligible — must have HDHP' },
    { step: 3, action: `Max 401k to $${limit401k.toLocaleString()}`, amount: limit401k - matchAmount, reason: 'Tax-deferred growth' },
    { step: 4, action: 'Max IRA (Roth if eligible)', amount: iraLimit, reason: 'Additional tax-advantaged space' },
    { step: 5, action: 'Taxable brokerage', amount: 0, reason: 'No limit, full flexibility' }
  ].filter(s => hsaEligible || s.step !== 2)
  const totalTaxAdvantaged = matchAmount + (hsaEligible ? hsaLimit : 0) + (limit401k - matchAmount) + iraLimit
  return {
    employerMatchValue: Math.round(matchAmount), hsaTaxSavings: Math.round(hsaTaxSavings),
    totalTaxAdvantagedSpace: Math.round(totalTaxAdvantaged),
    priorityOrder, hsaEligible,
    keyInsight: 'HSA beats 401k in priority because of the triple tax advantage — deductible, tax-free growth, tax-free withdrawal for medical'
  }
}

export function calculateHealthInsuranceSubsidy(householdIncome: number, householdSize: number, state: string, age: number, tobaccoUser: boolean) {
  const fpl2026: Record<number, number> = { 1: 15060, 2: 20440, 3: 25820, 4: 31200, 5: 36580, 6: 41960, 7: 47340, 8: 52720 }
  const fplAmount = fpl2026[Math.min(householdSize, 8)] || 15060 + (householdSize - 8) * 5380
  const fplPercent = householdIncome / fplAmount * 100
  const medicaidEligible = fplPercent <= 138
  const chipEligible = fplPercent <= 200
  const maxPremiumPercent = fplPercent <= 150 ? 0 : fplPercent <= 200 ? 2.0 : fplPercent <= 250 ? 4.0 : fplPercent <= 300 ? 6.0 : fplPercent <= 400 ? 8.5 : 8.5
  const benchmarkPremium = (300 + age * 3) * (tobaccoUser ? 1.5 : 1) * 12
  const maxSelfPayAnnual = householdIncome * maxPremiumPercent / 100
  const subsidy = Math.max(0, benchmarkPremium - maxSelfPayAnnual)
  const netPremium = Math.max(0, benchmarkPremium - subsidy)
  const costSharingReduction = fplPercent <= 200 && !['VA','WA','UT','AK'].includes(state)
  return {
    fplPercent: Math.round(fplPercent),
    fplAmount, medicaidEligible,
    benchmarkPremiumAnnual: Math.round(benchmarkPremium),
    benchmarkPremiumMonthly: Math.round(benchmarkPremium / 12),
    maxSelfPayAnnual: Math.round(maxSelfPayAnnual),
    annualSubsidy: Math.round(subsidy),
    monthlySubsidy: Math.round(subsidy / 12),
    netAnnualPremium: Math.round(netPremium),
    netMonthlyPremium: Math.round(netPremium / 12),
    costSharingReduction,
    subsidyEligible: subsidy > 0,
    enrollAt: 'healthcare.gov (federal) or your state marketplace',
    openEnrollment: 'Nov 1 – Dec 15 for coverage starting Jan 1'
  }
}

export function calculateHealthSavingsAccountProjection(annualContrib: number, currentBalance: number, investmentReturn: number, annualMedicalExpenses: number, age: number, retirementAge: number, taxRate: number) {
  const years = retirementAge - age
  const yearData = []
  let balance = currentBalance
  for (let i = 0; i <= years; i++) {
    const growth = balance * investmentReturn / 100
    const contribution = i < years ? annualContrib : 0
    const withdrawal = Math.min(annualMedicalExpenses, balance)
    balance = balance + growth + contribution - withdrawal
    yearData.push({ year: i, age: age + i, balance: Math.round(Math.max(0, balance)) })
  }
  const tripleValue = balance / (1 - taxRate / 100)
  const totalContributions = currentBalance + annualContrib * years
  const totalMedical = annualMedicalExpenses * years
  return {
    finalBalance: Math.round(balance),
    tripleValueEquivalent: Math.round(tripleValue),
    totalContributions: Math.round(totalContributions),
    totalMedicalCovered: Math.round(Math.min(totalMedical, totalContributions)),
    yearlyTaxSavings: Math.round(annualContrib * (taxRate + 7.65) / 100),
    lifeTimeTaxSavings: Math.round(annualContrib * (taxRate + 7.65) / 100 * years),
    yearData
  }
}

export function calculateHealthcareRetirementCost(currentAge: number, retirementAge: number, lifeExpectancy: number, healthStatus: 'excellent'|'good'|'fair', hasEmployerRetireeHealth: boolean) {
  const yearsInRetirement = lifeExpectancy - retirementAge
  const baseAnnualCost2026 = hasEmployerRetireeHealth ? 3600 :
    retirementAge < 65 ? 24000 : 6000 // pre/post Medicare
  const preMedicareYears = Math.max(0, Math.min(65, lifeExpectancy) - retirementAge)
  const postMedicareYears = Math.max(0, lifeExpectancy - 65)
  const healthMultiplier = healthStatus === 'excellent' ? 0.8 : healthStatus === 'fair' ? 1.4 : 1.0
  const preMedicareCost = preMedicareYears * 24000 * healthMultiplier
  const postMedicareCost = postMedicareYears * 7000 * healthMultiplier // premiums + OOP
  const ltcProbability = healthStatus === 'excellent' ? 0.52 : 0.65
  const avgLTCCost = 350 * 365 * 2.5 // 2.5 year average LTC need
  const expectedLTCCost = avgLTCCost * ltcProbability
  const totalHealthcareCost = preMedicareCost + postMedicareCost + expectedLTCCost
  const monthlyBudget = totalHealthcareCost / (yearsInRetirement * 12)
  const portionOfSavingsNeeded = totalHealthcareCost / 0.04 * 0.04 // SWR portion
  return {
    preMedicareYears, postMedicareYears,
    preMedicareCost: Math.round(preMedicareCost),
    postMedicareCost: Math.round(postMedicareCost),
    ltcProbability: Math.round(ltcProbability * 100),
    expectedLTCCost: Math.round(expectedLTCCost),
    totalHealthcareCost: Math.round(totalHealthcareCost),
    monthlyBudget: Math.round(monthlyBudget),
    requiredSavings: Math.round(totalHealthcareCost),
    hsaRecommended: Math.round(Math.min(totalHealthcareCost * 0.30, 200000)),
    tip: 'Healthcare is the #1 surprise retirement expense — plan for $300K-$600K per couple'
  }
}

export function calculateHomeEquityVsPersonalLoan(borrowAmount: number, homeEquityRate: number, personalLoanRate: number, termMonths: number, taxRate: number, homeValue: number, mortgageBalance: number) {
  const mr1 = homeEquityRate / 100 / 12
  const mr2 = personalLoanRate / 100 / 12
  const hePayment = borrowAmount * (mr1 * Math.pow(1+mr1, termMonths)) / (Math.pow(1+mr1, termMonths)-1)
  const plPayment = borrowAmount * (mr2 * Math.pow(1+mr2, termMonths)) / (Math.pow(1+mr2, termMonths)-1)
  const heInterest = hePayment * termMonths - borrowAmount
  const plInterest = plPayment * termMonths - borrowAmount
  const heAfterTax = heInterest * (1 - taxRate / 100) // if used for home improvement, deductible
  const heMonthlySavings = plPayment - hePayment
  const cltv = (mortgageBalance + borrowAmount) / homeValue * 100
  return {
    heMonthlyPayment: Math.round(hePayment * 100) / 100,
    plMonthlyPayment: Math.round(plPayment * 100) / 100,
    heTotalInterest: Math.round(heInterest),
    plTotalInterest: Math.round(plInterest),
    interestSavingsHE: Math.round(plInterest - heInterest),
    heAfterTaxInterest: Math.round(heAfterTax),
    monthlySavingsWithHE: Math.round(heMonthlySavings * 100) / 100,
    cltv: Math.round(cltv * 10) / 10,
    riskNote: 'Home equity uses your home as collateral — default risks foreclosure vs credit damage for personal loan',
    betterOption: homeEquityRate < personalLoanRate * 0.7 ? 'Home Equity (significant rate advantage)' : 'Compare risk tolerance — HE is secured debt'
  }
}

export function calculateHouseHackingROI(homePrice: number, downPercent: number, mortgageRate: number, unitRent: number, unitCount: number, ownerOccupyUnits: number) {
  const down = homePrice * downPercent / 100
  const loan = homePrice - down
  const mr = mortgageRate / 100 / 12
  const payment = loan * (mr * Math.pow(1+mr,360)) / (Math.pow(1+mr,360)-1)
  const rentalUnits = unitCount - ownerOccupyUnits
  const monthlyRentalIncome = unitRent * rentalUnits
  const expenses = homePrice * 0.015 / 12 // tax + insurance + maintenance
  const effectiveMortgage = payment - monthlyRentalIncome + expenses
  const traditionalRent = unitRent * 1.2 // what owner would pay in market rent
  const monthlySavings = traditionalRent - effectiveMortgage
  const annualSavings = monthlySavings * 12
  const equity5yr = loan * 0.05 // approx equity buildup
  const appreciation5yr = homePrice * Math.pow(1.035, 5) - homePrice
  const totalReturn5yr = annualSavings * 5 + equity5yr + appreciation5yr
  const roi = totalReturn5yr / down * 100
  return {
    downPayment: Math.round(down), mortgagePayment: Math.round(payment * 100) / 100,
    monthlyRentalIncome: Math.round(monthlyRentalIncome),
    effectiveMortgage: Math.round(effectiveMortgage * 100) / 100,
    monthlySavings: Math.round(monthlySavings),
    annualSavings: Math.round(annualSavings),
    appreciation5yr: Math.round(appreciation5yr),
    totalReturn5yr: Math.round(totalReturn5yr),
    roi5yr: Math.round(roi * 10) / 10,
    fhaEligible: downPercent <= 3.5 && unitCount <= 4,
    strategy: (rentalIncome: number) => rentalIncome > payment ? 'Cash flow positive — tenants pay your mortgage' : 'Reduced housing cost — part of mortgage subsidized by tenants'
  }
}

export function calculateI401kSEPComparison(netSEIncome: number, age: number) {
  const catchUp401k = age >= 60 && age <= 63 ? 11250 : age >= 50 ? 8000 : 0
  const catchUpSimple = age >= 60 && age <= 63 ? 5250 : age >= 50 ? 4000 : 0
  const solo401kEmployee = Math.min(netSEIncome, 24500) + catchUp401k
  const solo401kEmployer = Math.max(0, Math.min(netSEIncome * 0.25, 72000 - Math.min(solo401kEmployee, 24500)))
  const solo401kTotal = Math.min(solo401kEmployee + solo401kEmployer, 72000 + catchUp401k)
  const sepIRA = Math.min(netSEIncome * 0.20, 72000)
  const simplePlan = Math.min(netSEIncome, 17000) + catchUpSimple
  const advantage401k = solo401kTotal - sepIRA
  return {
    netSEIncome, solo401kTotal: Math.round(solo401kTotal),
    solo401kEmployee: Math.round(solo401kEmployee), solo401kEmployer: Math.round(solo401kEmployer),
    sepIRA: Math.round(sepIRA), simplePlan: Math.round(simplePlan),
    advantage401k: Math.round(advantage401k),
    taxSavings401k: Math.round(solo401kTotal * 0.37),
    taxSavingsSEP: Math.round(sepIRA * 0.37),
    recommendation: advantage401k > 5000 ? 'Solo 401k clearly wins — significantly higher contribution limit' : netSEIncome < 50000 ? 'Solo 401k wins at lower income levels' : 'SEP-IRA may be simpler — contribution difference is modest',
    simpleNote: 'SIMPLE IRA: easier admin, requires employer match, available for businesses with employees'
  }
}

export function calculateIRSInstallmentAgreement(taxOwed: number, canPayMonthly: number, includesPenalties: boolean) {
  const penalty = includesPenalties ? taxOwed * 0.025 : 0
  const interest = taxOwed * 0.08 // 2026 IRS rate approx 8% (federal short-term + 3%)
  const setupFee = canPayMonthly > 0 ? (canPayMinutes => canPayMinutes >= taxOwed / 72 ? 31 : 130)(canPayMonthly) : 225
  const totalOwed = taxOwed + penalty + interest
  const monthsToPayoff = Math.ceil(totalOwed / canPayMonthly)
  const totalWithIA = canPayMonthly * monthsToPayoff + setupFee
  const offerInCompromise = taxOwed > 10000 ? Math.max(taxOwed * 0.20, 1500) : 0 // rough OIC estimate
  return {
    taxOwed, penalty: Math.round(penalty), interest: Math.round(interest),
    totalOwed: Math.round(totalOwed), setupFee, monthsToPayoff,
    monthlyPayment: canPayMonthly, totalWithIA: Math.round(totalWithIA),
    extraCostVsPayNow: Math.round(totalWithIA - taxOwed),
    offerInCompromise: Math.round(offerInCompromise),
    threshold72Month: Math.ceil(totalOwed / 72),
    tip: 'Streamlined installment agreements (under $50K, under 72 months) can often be set up online without financial statement'
  }
}

export function calculateIncomeReplacementRatio(preRetirementIncome: number, socialSecurity: number, pension: number, portfolioWithdrawal: number, partTimeIncome: number, filingStatus: 'single'|'married') {
  const totalRetirementIncome = socialSecurity + pension + portfolioWithdrawal + partTimeIncome
  const replacementRatio = totalRetirementIncome / preRetirementIncome * 100
  // Tax on retirement income
  const taxableIncome = Math.max(0, totalRetirementIncome - (filingStatus==='married'?30000:15000))
  const retirementTax = taxableIncome * 0.15 // rough blended rate
  const netRetirementIncome = totalRetirementIncome - retirementTax
  const netPreRetirement = preRetirementIncome * 0.75 // after tax working
  const netReplacementRatio = netRetirementIncome / netPreRetirement * 100
  const gap = Math.max(0, preRetirementIncome * 0.80 - totalRetirementIncome)
  const portfolioNeededForGap = gap / 0.04
  const incomeBreakdown = [
    { source: 'Social Security', amount: socialSecurity, percent: Math.round(socialSecurity/totalRetirementIncome*100) },
    { source: 'Pension', amount: pension, percent: Math.round(pension/totalRetirementIncome*100) },
    { source: 'Portfolio', amount: portfolioWithdrawal, percent: Math.round(portfolioWithdrawal/totalRetirementIncome*100) },
    { source: 'Part-time', amount: partTimeIncome, percent: Math.round(partTimeIncome/totalRetirementIncome*100) },
  ].filter(i => i.amount > 0)
  return {
    totalRetirementIncome: Math.round(totalRetirementIncome),
    replacementRatio: Math.round(replacementRatio * 10) / 10,
    netReplacementRatio: Math.round(netReplacementRatio * 10) / 10,
    retirementTax: Math.round(retirementTax),
    netRetirementIncome: Math.round(netRetirementIncome),
    gap: Math.round(gap),
    portfolioNeededForGap: Math.round(portfolioNeededForGap),
    adequate: replacementRatio >= 70,
    targetRatio: 70,
    incomeBreakdown
  }
}

export function calculateIncomeTaxEstimate(wages: number, selfEmploymentIncome: number, otherIncome: number, deductions: number, credits: number, filingStatus: 'single'|'married'|'hoh', withholding: number) {
  const stdDed = filingStatus === 'married' ? 32200 : filingStatus === 'hoh' ? 24150 : 16100
  const totalIncome = wages + selfEmploymentIncome + otherIncome
  const seTax = selfEmploymentIncome * 0.9235 * 0.153
  const seDeduction = seTax / 2
  const agi = totalIncome - seDeduction
  const totalDed = Math.max(stdDed, deductions)
  const taxable = Math.max(0, agi - totalDed)
  const brackets = filingStatus === 'married'
    ? [[24800,0.10],[100800,0.12],[211400,0.22],[403550,0.24],[512450,0.32],[768700,0.35],[Infinity,0.37]]
    : [[12400,0.10],[50400,0.12],[105700,0.22],[201775,0.24],[256225,0.32],[640600,0.35],[Infinity,0.37]]
  let tax = 0, rem = taxable, prev = 0
  for (const [lim, rate] of brackets) { const s = Math.min(rem, Number(lim)-prev); tax+=s*Number(rate); rem-=s; prev=Number(lim); if(rem<=0) break }
  const totalTax = Math.max(0, tax + seTax - credits)
  const refundOrOwed = withholding - totalTax
  return {
    totalIncome: Math.round(totalIncome), agi: Math.round(agi), taxable: Math.round(taxable),
    incomeTax: Math.round(tax), seTax: Math.round(seTax), totalTax: Math.round(totalTax),
    withholding, refundOrOwed: Math.round(refundOrOwed),
    effectiveRate: Math.round(totalTax / Math.max(1, totalIncome) * 1000) / 10,
    marginalRate: taxable > 256225 ? 32 : taxable > 201775 ? 24 : taxable > 105700 ? 22 : taxable > 50400 ? 12 : 10,
    quarterlyEst: selfEmploymentIncome > 0 ? Math.round(totalTax / 4) : 0
  }
}

export function calculateInsuranceNeedsByLifeStage(age: number, income: number, debts: number, dependents: number, savings: number, stage: 'single'|'newFamily'|'establishedFamily'|'preRetirement'|'retirement') {
  const stageMultipliers: Record<string, {life: number; disability: number; umbrella: number}> = {
    single: {life: 0, disability: 0.6, umbrella: savings > 100000 ? 1 : 0},
    newFamily: {life: 12, disability: 0.6, umbrella: 1},
    establishedFamily: {life: 10, disability: 0.6, umbrella: 1},
    preRetirement: {life: 5, disability: 0.5, umbrella: savings > 500000 ? 1 : 0},
    retirement: {life: 2, disability: 0, umbrella: savings > 1000000 ? 1 : 0}
  }
  const m = stageMultipliers[stage]
  const lifeNeeded = Math.max(0, income * m.life + debts - savings)
  const disabilityMonthly = income * m.disability / 12
  const umbrellaNeeded = m.umbrella ? Math.max(1000000, savings) : 0
  const ltcNeed = age > 50
  const healthGapRisk = dependents > 0 ? 'Ensure dependents are covered on family health plan' : 'Individual coverage adequate'
  return {
    lifeInsuranceNeeded: Math.round(lifeNeeded),
    disabilityMonthly: Math.round(disabilityMonthly),
    umbrellaNeeded: Math.round(umbrellaNeeded),
    ltcInsuranceConsider: ltcNeed,
    priorityOrder: stage === 'newFamily' ? ['Life insurance (priority #1)', 'Disability insurance', 'Umbrella policy', 'Long-term care (after 50)'] : stage === 'retirement' ? ['Long-term care insurance', 'Medicare supplemental', 'Umbrella (if high net worth)'] : ['Disability insurance', 'Life insurance (if dependents)', 'Umbrella (if assets at risk)'],
    totalAnnualPremiumEst: Math.round(lifeNeeded * 0.0005 + disabilityMonthly * 12 * 0.025 + umbrellaNeeded * 0.00015),
    healthGapRisk
  }
}

export function calculateInvestmentFeeDrag(portfolioValue: number, annualContrib: number, grossReturn: number, feeRates: number[], years: number) {
  const scenarios = feeRates.map(fee => {
    const netReturn = grossReturn - fee
    let bal = portfolioValue
    for (let i = 0; i < years; i++) bal = bal * (1 + netReturn / 100) + annualContrib
    return { fee, finalValue: Math.round(bal), label: fee < 0.10 ? 'Index fund' : fee < 0.50 ? 'Low-cost active' : fee < 1.0 ? 'Average active' : 'High-cost active' }
  })
  const best = scenarios[0].finalValue
  const dragVsBest = scenarios.map(s => ({ ...s, drag: Math.round(best - s.finalValue), dragPercent: Math.round((1 - s.finalValue / best) * 100) }))
  const tenYrFee0 = portfolioValue * (1 + (grossReturn - feeRates[0]) / 100) ** 10
  const tenYrFeeHigh = portfolioValue * (1 + (grossReturn - feeRates[feeRates.length - 1]) / 100) ** 10
  return {
    scenarios: dragVsBest,
    bestFinalValue: Math.round(best),
    worstFinalValue: dragVsBest[dragVsBest.length - 1].finalValue,
    totalDrag: Math.round(best - dragVsBest[dragVsBest.length - 1].finalValue),
    recommendation: 'A 0.03% index fund (e.g. VTI, FSKAX) vs 1% active fund costs ' + Math.round((best - dragVsBest[dragVsBest.length - 1].finalValue) / 1000) + 'K over ' + years + ' years',
    yearData: Array.from({ length: years + 1 }, (_, i) => {
      const obj: Record<string, number> = { year: i }
      feeRates.forEach((fee, fi) => {
        let b = portfolioValue
        for (let j = 0; j < i; j++) b = b * (1 + (grossReturn - fee) / 100) + annualContrib
        obj[`fee${fi}`] = Math.round(b)
      })
      return obj
    })
  }
}

export function calculateInvestmentPropertyDepreciation(buildingValue: number, landValue: number, propertyType: 'residential'|'commercial', placedInServiceYear: number, currentYear: number, taxRate: number) {
  const depreciableBasis = buildingValue
  const usefulLife = propertyType === 'residential' ? 27.5 : 39
  const annualDepreciation = depreciableBasis / usefulLife
  const yearsDepreciated = Math.min(currentYear - placedInServiceYear, usefulLife)
  const accumulatedDepreciation = annualDepreciation * yearsDepreciated
  const remainingBasis = depreciableBasis - accumulatedDepreciation
  const annualTaxSavings = annualDepreciation * taxRate / 100
  const totalTaxSavingsToDate = accumulatedDepreciation * taxRate / 100
  const recaptureTaxOnSale = accumulatedDepreciation * 0.25
  const costSegregationBonus = depreciableBasis * 0.25 // typical reclassification to 5/7/15yr property
  const acceleratedYear1 = costSegregationBonus // with bonus depreciation
  return {
    depreciableBasis: Math.round(depreciableBasis), annualDepreciation: Math.round(annualDepreciation),
    accumulatedDepreciation: Math.round(accumulatedDepreciation), remainingBasis: Math.round(remainingBasis),
    annualTaxSavings: Math.round(annualTaxSavings), totalTaxSavingsToDate: Math.round(totalTaxSavingsToDate),
    recaptureTaxOnSale: Math.round(recaptureTaxOnSale),
    costSegregationOpportunity: Math.round(costSegregationBonus),
    usefulLife,
    tip: 'Cost segregation study can accelerate depreciation on 20-30% of property value to 5-15 year schedules'
  }
}

export function calculateInvestmentPropertyLeverage(propertyValue: number, downPercent: number, mortgageRate: number, noi: number, appreciationRate: number, holdYears: number) {
  const down = propertyValue * downPercent / 100
  const loan = propertyValue - down
  const monthlyRate = mortgageRate / 100 / 12
  const debtService = loan * (monthlyRate * Math.pow(1 + monthlyRate, 360)) / (Math.pow(1 + monthlyRate, 360) - 1) * 12
  const cashFlow = noi - debtService
  const cashOnCash = cashFlow / down * 100
  const capRate = noi / propertyValue * 100
  const exitValue = propertyValue * Math.pow(1 + appreciationRate / 100, holdYears)
  const remainingLoan = loan * Math.pow(1 + monthlyRate, holdYears * 12) - (debtService / 12) * ((Math.pow(1 + monthlyRate, holdYears * 12) - 1) / monthlyRate)
  const equity = exitValue - Math.max(0, remainingLoan)
  const totalReturn = cashFlow * holdYears + equity - down
  const leveragedROI = totalReturn / down * 100
  const unleveragedROI = (exitValue - propertyValue + noi * holdYears) / propertyValue * 100
  return {
    downPayment: Math.round(down), annualDebtService: Math.round(debtService),
    annualCashFlow: Math.round(cashFlow), cashOnCash: Math.round(cashOnCash * 100) / 100,
    capRate: Math.round(capRate * 100) / 100,
    exitValue: Math.round(exitValue), equity: Math.round(equity),
    totalReturn: Math.round(totalReturn), leveragedROI: Math.round(leveragedROI * 10) / 10,
    unleveragedROI: Math.round(unleveragedROI * 10) / 10,
    leverageMultiplier: Math.round(leveragedROI / Math.max(0.1, unleveragedROI) * 100) / 100
  }
}

export function calculateK1IncomeTax(ordinaryIncome: number, guaranteedPayments: number, capitalGains: number, selfRentalIncome: number, passiveLoss: number, taxRate: number, filingStatus: 'single'|'married') {
  const totalK1Income = ordinaryIncome + guaranteedPayments + capitalGains + selfRentalIncome
  const netPassive = Math.max(0, ordinaryIncome + selfRentalIncome - passiveLoss)
  const seOnGuaranteed = guaranteedPayments * 0.9235 * 0.153
  const qbiDeduction = Math.max(0, (ordinaryIncome - passiveLoss) * 0.20)
  const federalTaxable = netPassive + guaranteedPayments - qbiDeduction
  const federalTax = federalTaxable * taxRate / 100
  const capitalGainsTax = capitalGains * 0.15
  const totalTax = federalTax + seOnGuaranteed + capitalGainsTax
  const effectiveRate = totalK1Income > 0 ? totalTax / totalK1Income * 100 : 0
  const netIncome = totalK1Income - totalTax
  const passiveLossCarryforward = Math.max(0, passiveLoss - ordinaryIncome - selfRentalIncome)
  return {
    totalK1Income: Math.round(totalK1Income),
    netPassiveIncome: Math.round(netPassive),
    seOnGuaranteed: Math.round(seOnGuaranteed),
    qbiDeduction: Math.round(qbiDeduction),
    federalTax: Math.round(federalTax),
    capitalGainsTax: Math.round(capitalGainsTax),
    totalTax: Math.round(totalTax),
    effectiveRate: Math.round(effectiveRate * 10) / 10,
    netIncome: Math.round(netIncome),
    passiveLossCarryforward: Math.round(passiveLossCarryforward),
    quarterlyEstimate: Math.round(totalTax / 4),
    tip: passiveLossCarryforward > 0 ? `$${passiveLossCarryforward.toLocaleString()} in passive losses carry forward to future years` : 'All passive losses used against current income'
  }
}

export function calculateK1PassiveLoss(passiveLoss: number, passiveIncome: number, agi: number, realEstatePro: boolean) {
  const netPassive = passiveIncome - passiveLoss
  const currentlyDeductible = netPassive >= 0 ? 0 : Math.abs(netPassive)
  const rentalAllowance = !realEstatePro && agi <= 100000 ? Math.min(25000, currentlyDeductible) : !realEstatePro && agi <= 150000 ? Math.min(25000 * (1 - (agi - 100000) / 50000), currentlyDeductible) : realEstatePro ? currentlyDeductible : 0
  const carryForward = Math.max(0, currentlyDeductible - rentalAllowance)
  const taxSavings = rentalAllowance * 0.32
  return {
    passiveLoss, passiveIncome, netPassive: Math.round(netPassive),
    rentalAllowance: Math.round(rentalAllowance),
    carryForward: Math.round(carryForward),
    taxSavings: Math.round(taxSavings),
    realEstateProfessional: realEstatePro,
    note: agi > 150000 && !realEstatePro ? 'Above $150K AGI — passive losses fully suspended unless real estate professional' : 'Up to $25,000 rental loss allowed against ordinary income'
  }
}

export function calculateLeveragedETFDecay(initialInvestment: number, dailyTargetReturn: number, leverage: number, days: number, dailyVolatility: number) {
  let leveragedValue = initialInvestment, unleveragedValue = initialInvestment
  const yearData = []
  for (let i = 0; i <= days; i += 30) {
    const months = i / 30
    const dailyReturn = dailyTargetReturn / 100
    const leveragedDailyReturn = dailyReturn * leverage
    const volatilityDecay = leverage * leverage * dailyVolatility * dailyVolatility / 2 / 100
    const netLeveragedCAGR = Math.pow(1 + leveragedDailyReturn - volatilityDecay, 252) - 1
    const unleveragedCAGR = Math.pow(1 + dailyReturn, 252) - 1
    leveragedValue = initialInvestment * Math.pow(1 + netLeveragedCAGR, months / 12)
    unleveragedValue = initialInvestment * Math.pow(1 + unleveragedCAGR, months / 12)
    yearData.push({ day: i, leveraged: Math.round(leveragedValue), unleveraged: Math.round(unleveragedValue) })
  }
  const decay = (unleveragedValue * leverage - leveragedValue) / (unleveragedValue * leverage) * 100
  return {
    leveragedFinalValue: Math.round(leveragedValue),
    unleveragedFinalValue: Math.round(unleveragedValue),
    expectedLeveraged: Math.round(unleveragedValue * leverage - initialInvestment * (leverage - 1)),
    volatilityDecayPercent: Math.round(decay * 10) / 10,
    recommendation: dailyVolatility > 2 ? 'High volatility decay — leveraged ETFs lose value even in flat markets at this volatility' : 'Moderate decay — suitable for short-term tactical use only',
    maxHoldPeriod: dailyVolatility > 2 ? 'Days to weeks — not long-term holdings' : 'Weeks to months — monitor regularly',
    yearData
  }
}

export function calculateMedicarePrescriptionCosts(brandDrugs: number, genericDrugs: number, planType: 'pdp'|'mapd', incomeLevel: 'standard'|'irmaa1'|'irmaa2'|'irmaa3'|'irmaa4'|'irmaa5', partDPremium: number) {
  const irmaaSurcharge: Record<string, number> = { standard: 0, irmaa1: 14.50, irmaa2: 37.50, irmaa3: 60.40, irmaa4: 83.30, irmaa5: 91.00 }
  const surcharge = irmaaSurcharge[incomeLevel]
  const monthlyPremium = partDPremium + surcharge
  const deductible = 615 // 2026 defined-standard Part D deductible
  const oopMax = 2100 // 2026 Part D annual out-of-pocket threshold
  const yearlyDrugCost = brandDrugs + genericDrugs
  const afterDeductible = Math.max(0, yearlyDrugCost - deductible)
  const copay = Math.min(afterDeductible * 0.25, oopMax - Math.min(deductible, yearlyDrugCost))
  const totalOOP = Math.min(deductible, yearlyDrugCost) + copay
  const totalAnnualCost = monthlyPremium * 12 + totalOOP
  return {
    monthlyPremium: Math.round(monthlyPremium * 100) / 100,
    irmaaSurcharge: surcharge, deductible, yearlyDrugCost,
    oopCopays: Math.round(copay), totalOOP: Math.round(totalOOP),
    annualPremiumCost: Math.round(monthlyPremium * 12),
    totalAnnualCost: Math.round(totalAnnualCost),
    oopMax, catastrophicNote: `2026 defined-standard Part D out-of-pocket threshold: $2,100; covered-drug cost sharing is $0 in the catastrophic phase`
  }
}

export function calculateMegaDonorAdvisedBunching(annualGivingNormal: number, bunchYears: number, standardDeduction: number, taxRate: number, otherItemized: number) {
  const bunchedAmount = annualGivingNormal * bunchYears
  const totalItemizedBunchYear = bunchedAmount + otherItemized
  const itemizeBenefit = Math.max(0, totalItemizedBunchYear - standardDeduction)
  const normalYearsItemized = Math.max(0, (annualGivingNormal + otherItemized) - standardDeduction) * (bunchYears - 1)
  const bunchingBenefit = itemizeBenefit - normalYearsItemized
  const taxSavingsFromBunching = bunchingBenefit * taxRate / 100
  return {
    bunchedAmount: Math.round(bunchedAmount),
    totalItemizedBunchYear: Math.round(totalItemizedBunchYear),
    itemizeBenefit: Math.round(itemizeBenefit),
    bunchingBenefit: Math.round(bunchingBenefit),
    taxSavingsFromBunching: Math.round(taxSavingsFromBunching),
    strategy: `Donate ${bunchYears} years of giving in one year via DAF, itemize that year, take standard deduction other years`,
    worthIt: bunchingBenefit > 0
  }
}

export function calculateMeritRaiseVsJobChange(currentSalary: number, meritRaisePercent: number, jobOfferSalary: number, jobChangeRisk: number, yearsToStay: number) {
  const meritPath = Array.from({ length: yearsToStay }, (_, i) => currentSalary * Math.pow(1 + meritRaisePercent / 100, i + 1))
  const meritFinal = meritPath[meritPath.length - 1]
  const meritTotal = meritPath.reduce((s, v) => s + v, 0)
  const jobChangeFinal = jobOfferSalary * Math.pow(1.03, yearsToStay - 1) // assume 3% raises after switch
  const jobChangePath = Array.from({ length: yearsToStay }, (_, i) => jobOfferSalary * Math.pow(1.03, i))
  const jobChangeTotal = jobChangePath.reduce((s, v) => s + v, 0)
  const riskAdjustedJobChange = jobChangeTotal * (1 - jobChangeRisk / 100)
  const fiveYearDifference = riskAdjustedJobChange - meritTotal
  return {
    meritFinalSalary: Math.round(meritFinal), meritTotalEarnings: Math.round(meritTotal),
    jobChangeFinalSalary: Math.round(jobChangeFinal), jobChangeTotalEarnings: Math.round(jobChangeTotal),
    riskAdjustedJobChange: Math.round(riskAdjustedJobChange),
    difference: Math.round(fiveYearDifference),
    betterOption: fiveYearDifference > 0 ? 'Job Change' : 'Stay (Merit Raises)',
    avgJobChangeSalaryBump: '10-20% typical raise when changing employers vs 3-5% average merit increase'
  }
}

export function calculateMortgageForbearanceImpact(originalBalance: number, monthlyPayment: number, rate: number, forbearanceMonths: number, repaymentOption: 'lumpSum'|'deferral'|'modification') {
  const monthlyRate = rate / 100 / 12
  const interestAccrued = originalBalance * monthlyRate * forbearanceMonths
  const newBalance = originalBalance + (repaymentOption === 'deferral' ? 0 : interestAccrued)
  const missedPayments = monthlyPayment * forbearanceMonths
  const lumpSumNeeded = repaymentOption === 'lumpSum' ? missedPayments + interestAccrued : 0
  const newPayment = repaymentOption === 'modification' ? newBalance * (monthlyRate * Math.pow(1 + monthlyRate, 360)) / (Math.pow(1 + monthlyRate, 360) - 1) : monthlyPayment
  const longTermCost = interestAccrued + (newPayment - monthlyPayment) * 360
  return {
    interestAccrued: Math.round(interestAccrued), newBalance: Math.round(newBalance),
    missedPayments: Math.round(missedPayments), lumpSumNeeded: Math.round(lumpSumNeeded),
    newPayment: Math.round(newPayment * 100) / 100,
    paymentIncrease: Math.round((newPayment - monthlyPayment) * 100) / 100,
    longTermCost: Math.round(longTermCost),
    bestOption: repaymentOption === 'deferral' ? 'Deferral: add missed payments to end of loan — no interest on missed payments (COVID-era standard)' : repaymentOption === 'lumpSum' ? 'Lump sum: most expensive option upfront, no long-term impact' : 'Modification: manageable monthly increase, higher total cost'
  }
}

export function calculateMortgageInsurancePMI(loanAmount: number, homeValue: number, creditScore: number, loanType: 'conventional'|'fha', rate: number) {
  const ltv = loanAmount / homeValue * 100
  const pmiRate = creditScore > 760 ? 0.30 : creditScore > 720 ? 0.50 : creditScore > 680 ? 0.80 : 1.20
  const monthlyPMI = loanType === 'conventional' ? (ltv > 80 ? loanAmount * pmiRate / 100 / 12 : 0) : loanAmount * 0.0055 / 12
  const monthlyMIP_upfront = loanType === 'fha' ? loanAmount * 0.0175 : 0
  const monthlyRate = rate / 100 / 12
  const payment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, 360)) / (Math.pow(1 + monthlyRate, 360) - 1)
  // Months to 80% LTV (conventional PMI removal)
  let bal = loanAmount, months = 0
  while (bal > homeValue * 0.80 && months < 360) { bal = bal * (1 + monthlyRate) - payment; months++ }
  const totalPMIPaid = monthlyPMI * months
  const extraNeededFor20Pct = Math.max(0, homeValue * 0.20 - (homeValue - loanAmount))
  return {
    ltv: Math.round(ltv * 10) / 10, monthlyPMI: Math.round(monthlyPMI * 100) / 100,
    monthlyMIP: Math.round(monthlyPMI * 100) / 100,
    upfrontMIP: Math.round(monthlyMIP_upfront),
    monthsToPMIRemoval: months, totalPMIPaid: Math.round(totalPMIPaid),
    extraDownToAvoidPMI: Math.round(extraNeededFor20Pct),
    costOfLessThan20Down: Math.round(totalPMIPaid),
    fhaMIPNote: loanType === 'fha' ? 'FHA MIP is permanent for most loans — refinancing to conventional removes it once you reach 20% equity' : 'PMI auto-cancels at 78% LTV per Homeowners Protection Act'
  }
}

export function calculateMortgageRelocationCost(currentMortgageRate: number, currentBalance: number, newHomePrice: number, newMortgageRate: number, relocationCosts: number, salaryIncrease: number, costOfLivingDiff: number, years: number) {
  const oldPayment = currentBalance * (currentMortgageRate / 100 / 12 * Math.pow(1 + currentMortgageRate / 100 / 12, 360)) / (Math.pow(1 + currentMortgageRate / 100 / 12, 360) - 1)
  const newLoan = newHomePrice * 0.80
  const newRate = newMortgageRate / 100 / 12
  const newPayment = newLoan * (newRate * Math.pow(1 + newRate, 360)) / (Math.pow(1 + newRate, 360) - 1)
  const paymentDiff = newPayment - oldPayment
  const colAdjSalaryBoost = salaryIncrease * (1 - costOfLivingDiff / 100)
  const netFinancialImpact = (colAdjSalaryBoost - paymentDiff * 12) * years - relocationCosts
  const breakEvenMonths = relocationCosts / Math.max(1, colAdjSalaryBoost / 12 - paymentDiff)
  return {
    oldMonthlyPayment: Math.round(oldPayment),
    newMonthlyPayment: Math.round(newPayment),
    paymentIncrease: Math.round(paymentDiff),
    salaryIncrease,
    colAdjustedBoost: Math.round(colAdjSalaryBoost),
    netFinancialImpact: Math.round(netFinancialImpact),
    breakEvenMonths: Math.round(breakEvenMonths),
    worthRelocating: netFinancialImpact > 0 && breakEvenMonths < years * 12 * 0.5,
    relocationCosts
  }
}

export function calculateMunicipalBondLadder(totalAmount: number, rungs: number, startMaturityYear: number, avgYield: number, taxRate: number, stateRate: number) {
  const amtPerRung = totalAmount / rungs
  const combinedRate = (taxRate + stateRate) / 100
  const tey = avgYield / (1 - combinedRate)
  const ladder = Array.from({ length: rungs }, (_, i) => {
    const matYear = startMaturityYear + i
    const yld = avgYield + i * 0.1 // slight upward slope
    const annualInterest = amtPerRung * yld / 100
    return { rung: i + 1, maturityYear: matYear, yield: Math.round(yld * 100) / 100, amount: Math.round(amtPerRung), annualInterest: Math.round(annualInterest), tey: Math.round(yld / (1 - combinedRate) * 100) / 100 }
  })
  const totalAnnualIncome = ladder.reduce((s, r) => s + r.annualInterest, 0)
  const taxableEquivalentIncome = totalAnnualIncome / (1 - combinedRate)
  return {
    totalAmount, amtPerRung: Math.round(amtPerRung), avgYield, tey: Math.round(tey * 100) / 100,
    totalAnnualIncome: Math.round(totalAnnualIncome),
    taxableEquivalentIncome: Math.round(taxableEquivalentIncome),
    annualTaxSavings: Math.round(taxableEquivalentIncome - totalAnnualIncome),
    ladder
  }
}

export function calculateNannyTax(weeklyHours: number, hourlyRate: number, weeksPerYear: number, state: string) {
  const annualWages = weeklyHours * hourlyRate * weeksPerYear
  const NANNY_TAX_THRESHOLD_2026 = 3000 // IRS Publication 926 / SSA household-employee coverage threshold for 2026
  const fica = annualWages > NANNY_TAX_THRESHOLD_2026 ? annualWages * 0.153 : 0 // both shares if employer pays, else employee 7.65%
  const employerFICA = annualWages > NANNY_TAX_THRESHOLD_2026 ? annualWages * 0.0765 : 0
  const futaWages = Math.min(annualWages, 7000)
  const futa = annualWages >= 1000 ? futaWages * 0.006 : 0
  const stateUIRates: Record<string, number> = { CA: 0.034, NY: 0.041, TX: 0.027, FL: 0.029 }
  const suta = annualWages >= 1000 ? Math.min(annualWages, 7000) * (stateUIRates[state] || 0.03) : 0
  const totalEmployerCost = annualWages + employerFICA + futa + suta
  const w2Required = annualWages >= NANNY_TAX_THRESHOLD_2026
  const quarterlyEstimated = w2Required ? (employerFICA + futa + suta) / 4 : 0
  return {
    annualWages: Math.round(annualWages),
    employerFICA: Math.round(employerFICA), futa: Math.round(futa), suta: Math.round(suta),
    totalEmployerCost: Math.round(totalEmployerCost),
    w2Required, quarterlyEstimated: Math.round(quarterlyEstimated),
    dependentCareCreditEligible: true,
    note: w2Required ? 'You must withhold/pay FICA and issue W-2 — "nanny tax" applies above $3,000/year (2026 IRS threshold)' : 'Below the $3,000 household employee threshold — no FICA employer tax obligations yet'
  }
}

export function calculateNegotiatedSalaryLifetimeImpact(currentSalary: number, negotiatedSalary: number, annualRaiseRate: number, yearsToRetirement: number, retirementMultiplier: number) {
  const diff = negotiatedSalary - currentSalary
  const lifetimeExtra = Array.from({length: yearsToRetirement}, (_, i) =>
    diff * Math.pow(1 + annualRaiseRate / 100, i)
  ).reduce((s, v) => s + v, 0)
  const retirementBenefit = negotiatedSalary * retirementMultiplier - currentSalary * retirementMultiplier
  const socialSecurityBoost = diff * 0.40 * 12 * 20 * 0.32 // rough SS lifetime impact
  const total10yr = Array.from({length: 10}, (_, i) => diff * Math.pow(1 + annualRaiseRate / 100, i)).reduce((s, v) => s + v, 0)
  return {
    immediateRaise: Math.round(diff),
    raisePercent: Math.round(diff / currentSalary * 100 * 10) / 10,
    lifetimeExtraEarnings: Math.round(lifetimeExtra),
    tenYearImpact: Math.round(total10yr),
    retirementBenefit: Math.round(retirementBenefit),
    socialSecurityBoost: Math.round(socialSecurityBoost),
    totalLifetimeValue: Math.round(lifetimeExtra + retirementBenefit),
    hourlyRaiseValue: Math.round(diff / 2080 * 100) / 100,
    perDayValue: Math.round(diff / 260)
  }
}

export function calculateNetOperatingLoss(businessLoss: number, otherIncome: number, filingStatus: 'single'|'married', carrybackYears: number, priorYearTax: number) {
  const currentYearOffset = Math.min(Math.max(0, businessLoss), Math.max(0, otherIncome))
  const nol = Math.max(0, businessLoss - Math.max(0, otherIncome))
  const carryForwardAmount = nol // the 80% rule limits future-year deduction, not the amount carried forward
  const futureYear80PctLimitExample = carryForwardAmount * 0.80
  const refundFromCarryback = carrybackYears > 0 ? priorYearTax * 0.80 : 0 // illustrative farming-loss scenario only
  const taxSavingsCurrentYear = currentYearOffset * (filingStatus === 'married' ? 0.24 : 0.22)
  const futureShielded = futureYear80PctLimitExample
  const futureValue = futureShielded * 0.24 / (1.07 ** 3) // illustrative PV assuming use in 3 years
  return {
    businessLoss, netOperatingLoss: Math.round(nol),
    usedCurrentYear: Math.round(currentYearOffset),
    taxSavingsCurrentYear: Math.round(taxSavingsCurrentYear),
    carryForwardAmount: Math.round(carryForwardAmount),
    carryback80PctRefund: Math.round(refundFromCarryback),
    futureIncomeShielded: Math.round(futureShielded),
    presentValueOfNOL: Math.round(futureValue),
    note: 'NOL carryforward can offset up to 80% of taxable income in future years (TCJA rule). Can carry back 2 years for farming losses.'
  }
}

export function calculateP2PLendingReturns(investAmount: number, avgInterestRate: number, defaultRate: number, platformFee: number, years: number) {
  const grossReturn = avgInterestRate
  const lossFromDefaults = defaultRate * 0.6 // 60% loss given default typically
  const netReturn = grossReturn - lossFromDefaults - platformFee
  const finalValue = investAmount * Math.pow(1 + netReturn / 100, years)
  const totalInterestEarned = finalValue - investAmount
  const taxOnInterest = totalInterestEarned * 0.32 // ordinary income
  const afterTaxValue = finalValue - taxOnInterest
  const diversificationNote = investAmount < 2500 ? 'Below recommended minimum for proper diversification (100+ notes)' : 'Adequate for diversification across many loans'
  return {
    grossReturn, netReturn: Math.round(netReturn * 100) / 100,
    finalValue: Math.round(finalValue), totalInterestEarned: Math.round(totalInterestEarned),
    taxOnInterest: Math.round(taxOnInterest), afterTaxValue: Math.round(afterTaxValue),
    diversificationNote, riskLevel: defaultRate > 8 ? 'High default rate — high risk segment' : 'Moderate risk'
  }
}

export function calculatePassiveIncomePortfolio(targetMonthlyIncome: number, dividendYield: number, rentalYield: number, bondYield: number, allocation: {dividends: number; rental: number; bonds: number; other: number}) {
  const totalAlloc = allocation.dividends + allocation.rental + allocation.bonds + allocation.other
  const blendedYield = (allocation.dividends * dividendYield + allocation.rental * rentalYield + allocation.bonds * bondYield + allocation.other * 4) / Math.max(1, totalAlloc)
  const portfolioNeeded = (targetMonthlyIncome * 12) / (blendedYield / 100)
  const dividendPortfolio = portfolioNeeded * allocation.dividends / Math.max(1, totalAlloc)
  const rentalEquity = portfolioNeeded * allocation.rental / Math.max(1, totalAlloc)
  const bondPortfolio = portfolioNeeded * allocation.bonds / Math.max(1, totalAlloc)
  const taxOnIncome = targetMonthlyIncome * 12 * 0.15
  const netMonthlyIncome = targetMonthlyIncome - taxOnIncome / 12
  const timeToFIRE20pctSavings = portfolioNeeded / (targetMonthlyIncome * 12 * 0.25 * Math.pow(1.07, 10))
  return {
    targetMonthlyIncome, blendedYield: Math.round(blendedYield*100)/100,
    portfolioNeeded: Math.round(portfolioNeeded),
    dividendPortfolio: Math.round(dividendPortfolio),
    rentalEquity: Math.round(rentalEquity),
    bondPortfolio: Math.round(bondPortfolio),
    taxOnIncome: Math.round(taxOnIncome),
    netMonthlyIncome: Math.round(netMonthlyIncome),
    timeToFIREYears: Math.round(timeToFIRE20pctSavings),
    bestDividendStocks: ['SCHD (3.4% yield)', 'VYM (2.8% yield)', 'DGRO (2.3%+growth)'],
    note: 'Passive income in taxable accounts: qualified dividends at 15%, rent at ordinary rates, interest at ordinary rates'
  }
}

export function calculatePrenupAssetProtection(separatePropertyValue: number, futureEarningsValue: number, businessValue: number, yearsMarried: number, state: 'communityProperty'|'equitableDistribution') {
  const withoutPrenup = state === 'communityProperty'
    ? (separatePropertyValue + businessValue) * 0.50 * Math.min(1, yearsMarried / 10)
    : (separatePropertyValue + businessValue) * 0.35 * Math.min(1, yearsMarried / 10)
  const withPrenupProtected = separatePropertyValue + businessValue
  const appreciationDuringMarriage = businessValue * 0.06 * yearsMarried
  const protectedAppreciation = appreciationDuringMarriage * 0.7
  const totalProtection = withPrenupProtected + protectedAppreciation
  return {
    withoutPrenupExposure: Math.round(withoutPrenup),
    withPrenupProtected: Math.round(withPrenupProtected),
    appreciationDuringMarriage: Math.round(appreciationDuringMarriage),
    totalAssetProtection: Math.round(totalProtection),
    drafingCost: 3500,
    roiOnPrenup: Math.round(totalProtection / 3500),
    note: 'Prenups must be fairly negotiated with independent counsel for each party to be enforceable'
  }
}

export function calculateProfitSharingPlan(annualCompensation: number, profitSharingPercent: number, businessProfit: number, numEmployees: number, age: number) {
  const limit2026 = 72000
  const employerContrib = Math.min(annualCompensation * profitSharingPercent / 100, limit2026)
  const totalPoolContrib = Math.min(businessProfit * profitSharingPercent / 100, limit2026 * numEmployees)
  const taxSavings = employerContrib * 0.37
  const growth30 = employerContrib * Math.pow(1.07, Math.max(0, 65 - age))
  const vestingNote = 'Vesting schedules vary — cliff vesting (3yr) or graded (2-6yr) both allowed'
  return {
    employerContrib: Math.round(employerContrib),
    totalPoolContrib: Math.round(totalPoolContrib),
    taxSavings: Math.round(taxSavings),
    netCostToEmployer: Math.round(employerContrib - taxSavings),
    growth30: Math.round(growth30),
    limitUsed: Math.round(employerContrib / limit2026 * 100),
    vestingNote,
    combinedWith401k: `Can combine with 401k — total limit still $${limit2026.toLocaleString()}/year`
  }
}

export function calculateQualifiedSmallBusinessStock(investmentAmount: number, holdYears: number, exitMultiple: number, companyAssetsAtIssuance: number, stockIssuedAfterJuly2025: boolean = false) {
  // OBBBA changed §1202 for qualifying stock issued after July 4, 2025.
  // The UI still uses the legacy regime by default until an acquisition-date selector is added.
  const assetThreshold = stockIssuedAfterJuly2025 ? 75000000 : 50000000
  const requiredYears = stockIssuedAfterJuly2025 ? 3 : 5
  const exclusionPct = stockIssuedAfterJuly2025 ? (holdYears >= 5 ? 1 : holdYears >= 4 ? 0.75 : holdYears >= 3 ? 0.5 : 0) : (holdYears >= 5 ? 1 : 0)
  const qsbsEligible = companyAssetsAtIssuance < assetThreshold && exclusionPct > 0
  const exitValue = investmentAmount * exitMultiple
  const gain = exitValue - investmentAmount
  const exclusionCap = stockIssuedAfterJuly2025 ? Math.max(investmentAmount * 10, 15000000) : Math.max(investmentAmount * 10, 10000000)
  const exclusionLimit = exclusionCap * exclusionPct
  const excludedGain = qsbsEligible ? Math.min(Math.max(0, gain), exclusionLimit) : 0
  const taxableGain = gain - excludedGain
  const taxOnGain = taxableGain * 0.238 // LTCG + NIIT
  const taxSavingsFromQSBS = excludedGain * 0.238
  const netProceeds = exitValue - taxOnGain
  return {
    exitValue: Math.round(exitValue), totalGain: Math.round(gain),
    qsbsEligible, exclusionLimit: Math.round(exclusionLimit),
    excludedGain: Math.round(excludedGain), taxableGain: Math.round(taxableGain),
    taxOnGain: Math.round(taxOnGain), taxSavingsFromQSBS: Math.round(taxSavingsFromQSBS),
    netProceeds: Math.round(netProceeds),
    requirement: 'Must hold 5+ years, C-corp issued stock at original issuance, company assets <$50M at issuance'
  }
}

export function calculateRVAnnualCost(rvPrice: number, loanRate: number, loanTermYears: number, downPercent: number, insuranceAnnual: number, maintenancePercent: number, campingNights: number, fuelMPG: number, avgMilesPerTrip: number) {
  const down = rvPrice * downPercent / 100
  const loan = rvPrice - down
  const mr = loanRate / 100 / 12
  const payment = loan * (mr * Math.pow(1+mr, loanTermYears*12)) / (Math.pow(1+mr, loanTermYears*12)-1)
  const depreciation = rvPrice * 0.15 // year 1 avg
  const fuel = (campingNights * avgMilesPerTrip / fuelMPG) * 3.80
  const maintenance = rvPrice * maintenancePercent / 100
  const storage = 2400
  const campsite = campingNights * 45
  const totalAnnual = payment*12 + insuranceAnnual + maintenance + fuel + storage + campsite
  const costPerNight = totalAnnual / Math.max(1, campingNights)
  const hotelEquivalent = campingNights * 200
  const savings = hotelEquivalent - totalAnnual
  return {
    monthlyPayment: Math.round(payment*100)/100,
    annualLoanCost: Math.round(payment*12),
    fuelCost: Math.round(fuel), maintenanceCost: Math.round(maintenance),
    campSiteCost: Math.round(campsite), storageCost: storage,
    totalAnnual: Math.round(totalAnnual),
    costPerNight: Math.round(costPerNight),
    hotelEquivalent: Math.round(hotelEquivalent),
    savingsVsHotel: Math.round(savings),
    breakEvenNights: Math.round(totalAnnual / 200),
    worthIt: savings > 0 && campingNights >= totalAnnual / 200
  }
}

export function calculateRealEstateAppreciation(purchasePrice: number, purchaseYear: number, currentYear: number, location: 'urban'|'suburban'|'rural', propertyType: 'sfr'|'condo'|'multifamily') {
  const historicalRates: Record<string, Record<string, number>> = {
    urban: { sfr: 5.2, condo: 3.8, multifamily: 4.5 },
    suburban: { sfr: 4.5, condo: 3.2, multifamily: 4.0 },
    rural: { sfr: 3.0, condo: 2.0, multifamily: 2.5 }
  }
  const annualRate = historicalRates[location][propertyType]
  const years = currentYear - purchaseYear
  const currentValue = purchasePrice * Math.pow(1 + annualRate/100, years)
  const totalAppreciation = currentValue - purchasePrice
  const cagr = (Math.pow(currentValue/purchasePrice, 1/Math.max(1,years)) - 1) * 100
  const inflationAdjValue = purchasePrice * Math.pow(1.035, years)
  const realAppreciation = currentValue - inflationAdjValue
  const yearData = Array.from({length: years+1}, (_, i) => ({
    year: purchaseYear + i,
    value: Math.round(purchasePrice * Math.pow(1+annualRate/100, i))
  }))
  return {
    purchasePrice, currentValue: Math.round(currentValue),
    totalAppreciation: Math.round(totalAppreciation),
    appreciationPercent: Math.round(totalAppreciation/purchasePrice*100),
    cagr: Math.round(cagr * 100) / 100,
    annualRate,
    inflationAdjValue: Math.round(inflationAdjValue),
    realAppreciation: Math.round(realAppreciation),
    projectedValue5yr: Math.round(currentValue * Math.pow(1+annualRate/100, 5)),
    projectedValue10yr: Math.round(currentValue * Math.pow(1+annualRate/100, 10)),
    yearData
  }
}

export function calculateRealEstateCrowdfunding(investAmount: number, targetReturn: number, holdYears: number, platformFee: number, dividendYield: number, preferredReturn: number) {
  const netReturn = targetReturn - platformFee
  const annualDividend = investAmount * dividendYield / 100
  const totalDividends = annualDividend * holdYears
  const exitValue = investAmount * Math.pow(1 + (targetReturn - dividendYield) / 100, holdYears)
  const totalReturn = totalDividends + exitValue - investAmount
  const irr = (Math.pow((totalDividends + exitValue) / investAmount, 1 / holdYears) - 1) * 100
  const preferred = investAmount * preferredReturn / 100 * holdYears
  const abovePref = Math.max(0, totalReturn - preferred)
  const taxOnDividends = totalDividends * 0.22
  const taxOnGain = Math.max(0, exitValue - investAmount) * 0.20
  const netProfit = totalReturn - taxOnDividends - taxOnGain
  const yearData = Array.from({ length: holdYears + 1 }, (_, i) => ({
    year: i,
    value: Math.round(investAmount * Math.pow(1 + netReturn / 100, i) + annualDividend * i)
  }))
  return {
    annualDividend: Math.round(annualDividend), totalDividends: Math.round(totalDividends),
    exitValue: Math.round(exitValue), totalReturn: Math.round(totalReturn),
    irr: Math.round(irr * 100) / 100, preferredReturnTotal: Math.round(preferred),
    abovePref: Math.round(abovePref), taxOnDividends: Math.round(taxOnDividends),
    taxOnGain: Math.round(taxOnGain), netProfit: Math.round(netProfit),
    accredited: investAmount >= 5000,
    yearData
  }
}

export function calculateRealEstateOpportunityZone(investmentAmount: number, capitalGain: number, holdYears: number, propertyAppreciationRate: number, deferralYears: number) {
  const eligibleGain = Math.min(capitalGain, investmentAmount)
  const deferredTax = eligibleGain * 0.238
  const taxDeferredUntil2026 = eligibleGain * 0.238 * 0.85 // step-up basis
  const ozPropertyValue = investmentAmount * Math.pow(1 + propertyAppreciationRate / 100, holdYears)
  const exclusionIfHeld10Plus = holdYears >= 10 ? (ozPropertyValue - investmentAmount) * 0.238 : 0
  const netBenefit = deferredTax * 0.10 + exclusionIfHeld10Plus // 10% basis step-up + appreciation exclusion
  const totalReturn = ozPropertyValue - investmentAmount + netBenefit
  return {
    eligibleGain: Math.round(eligibleGain),
    deferredTax: Math.round(deferredTax),
    ozPropertyValue: Math.round(ozPropertyValue),
    appreciationExcluded: holdYears >= 10 ? Math.round(ozPropertyValue - investmentAmount) : 0,
    exclusionTaxSavings: Math.round(exclusionIfHeld10Plus),
    netTaxBenefit: Math.round(netBenefit),
    totalReturn: Math.round(totalReturn),
    holdRequirement: holdYears >= 10 ? '✅ Qualifies for appreciation exclusion (10+ years)' : `Need ${10 - holdYears} more years for full exclusion`,
    deadline: 'QOZ investments must be made within 180 days of capital gain realization'
  }
}

export function calculateRealEstateSyndicationK1(investmentAmount: number, distributionsReceived: number, depreciation: number, gainOnSale: number, holdYears: number, taxRate: number) {
  const passiveIncomeTax = Math.max(0, distributionsReceived - depreciation) * taxRate / 100
  const depreciationBenefit = depreciation * taxRate / 100
  const recaptureTax = Math.min(depreciation, gainOnSale) * 0.25
  const capitalGainsTax = Math.max(0, gainOnSale - depreciation) * 0.20
  const totalTaxOnExit = recaptureTax + capitalGainsTax
  const totalTaxPaid = passiveIncomeTax + totalTaxOnExit
  const totalDistributions = distributionsReceived + gainOnSale
  const netProfit = totalDistributions - investmentAmount - totalTaxPaid
  const afterTaxIRR = (Math.pow((investmentAmount + netProfit) / investmentAmount, 1 / holdYears) - 1) * 100
  return {
    distributionsReceived, depreciation, gainOnSale,
    passiveIncomeTax: Math.round(passiveIncomeTax),
    depreciationBenefit: Math.round(depreciationBenefit),
    recaptureTax: Math.round(recaptureTax), capitalGainsTax: Math.round(capitalGainsTax),
    totalTaxOnExit: Math.round(totalTaxOnExit), totalTaxPaid: Math.round(totalTaxPaid),
    netProfit: Math.round(netProfit),
    afterTaxIRR: Math.round(afterTaxIRR * 100) / 100,
    note: 'Depreciation from syndication shelters passive income — check passive activity rules for your situation'
  }
}

export function calculateRealEstateTaxStrategy(rentalIncome: number, mortgage: number, propertyTax: number, insurance: number, maintenance: number, depreciation: number, taxRate: number, passiveActivity: boolean) {
  const grossIncome = rentalIncome
  const totalExpenses = mortgage * 0.7 + propertyTax + insurance + maintenance + depreciation // only interest portion deductible
  const netIncome = grossIncome - totalExpenses
  const taxSavings = netIncome < 0 && passiveActivity ? Math.abs(netIncome) * taxRate / 100 : 0
  const passiveLossLimit = 25000 // up to $25K for active participation, phases out $100K-$150K AGI
  const usableLoss = Math.min(Math.abs(Math.min(0, netIncome)), passiveLossLimit)
  const actualTaxSavings = usableLoss * taxRate / 100
  const cashFlow = rentalIncome - mortgage - propertyTax - insurance - maintenance
  return {
    grossIncome, totalDeductibleExpenses: Math.round(totalExpenses),
    netTaxableIncome: Math.round(netIncome), cashFlow: Math.round(cashFlow),
    taxLoss: Math.round(Math.min(0, netIncome)), usableLoss: Math.round(usableLoss),
    actualTaxSavings: Math.round(actualTaxSavings),
    depreciationBenefit: Math.round(depreciation * taxRate / 100),
    strategy: netIncome < 0 ? 'Paper loss from depreciation shelters other income (subject to passive activity rules)' : 'Profitable rental — depreciation reduces taxable income'
  }
}

export function calculateRealWageGrowth(startingSalary: number, currentSalary: number, yearsWorked: number, inflationRates: number[]) {
  const avgInflation = inflationRates.length > 0 ? inflationRates.reduce((s,r)=>s+r,0)/inflationRates.length : 3.5
  const nominalGrowth = (currentSalary/startingSalary - 1) * 100
  const nominalCAGR = (Math.pow(currentSalary/startingSalary, 1/Math.max(1,yearsWorked)) - 1) * 100
  const realSalary = currentSalary / Math.pow(1+avgInflation/100, yearsWorked)
  const realGrowth = (realSalary/startingSalary - 1) * 100
  const realCAGR = (Math.pow(realSalary/startingSalary, 1/Math.max(1,yearsWorked)) - 1) * 100
  const purchasingPowerLost = currentSalary - realSalary
  const salaryNeededToMatchReal = startingSalary * Math.pow(1+avgInflation/100, yearsWorked)
  const yearData = Array.from({length: yearsWorked+1}, (_, i) => ({
    year: i, nominal: Math.round(startingSalary * Math.pow(currentSalary/startingSalary, i/Math.max(1,yearsWorked))),
    real: Math.round(startingSalary * Math.pow(realSalary/startingSalary, i/Math.max(1,yearsWorked)))
  }))
  return {
    startingSalary, currentSalary, nominalGrowth: Math.round(nominalGrowth*10)/10,
    nominalCAGR: Math.round(nominalCAGR*100)/100, realSalary: Math.round(realSalary),
    realGrowth: Math.round(realGrowth*10)/10, realCAGR: Math.round(realCAGR*100)/100,
    purchasingPowerLost: Math.round(purchasingPowerLost),
    salaryNeededToMatchReal: Math.round(salaryNeededToMatchReal),
    beatingInflation: realGrowth > 0, yearData
  }
}

export function calculateRebalancingPortfolio(currentAllocation: {stocks: number; bonds: number; cash: number; international: number}, targetAllocation: {stocks: number; bonds: number; cash: number; international: number}, totalValue: number, taxRate: number) {
  const trades: Array<{asset: string; action: string; amount: number; shares: number; taxImplication: number}> = []
  let totalBuys = 0, totalSells = 0, totalTax = 0
  const assets = ['stocks', 'bonds', 'cash', 'international'] as const
  assets.forEach(asset => {
    const currentVal = currentAllocation[asset] / 100 * totalValue
    const targetVal = targetAllocation[asset] / 100 * totalValue
    const diff = targetVal - currentVal
    const avgPrice = 100 // normalized
    const taxImpl = diff < 0 ? Math.abs(diff) * 0.20 * taxRate/100 : 0
    if (Math.abs(diff) > totalValue * 0.01) {
      trades.push({ asset, action: diff > 0 ? 'Buy' : 'Sell', amount: Math.round(Math.abs(diff)), shares: Math.round(Math.abs(diff)/avgPrice), taxImplication: Math.round(taxImpl) })
      if (diff > 0) totalBuys += Math.abs(diff)
      else { totalSells += Math.abs(diff); totalTax += taxImpl }
    }
  })
  const driftScore = assets.reduce((s, a) => s + Math.abs(currentAllocation[a] - targetAllocation[a]), 0)
  return {
    trades, totalBuys: Math.round(totalBuys), totalSells: Math.round(totalSells),
    totalTax: Math.round(totalTax), driftScore: Math.round(driftScore),
    needsRebalancing: driftScore > 5,
    taxEfficientStrategy: 'Rebalance in tax-advantaged accounts first, use new contributions to rebalance taxable accounts',
    annualCostOfDrift: Math.round(totalValue * driftScore / 100 * 0.005)
  }
}

export function calculateRefinanceBreakEven(currentBalance: number, currentRate: number, newRate: number, closingCosts: number, remainingYears: number, cashOut: number) {
  const mr1 = currentRate/100/12, mr2 = newRate/100/12
  const m1 = remainingYears * 12
  const p1 = currentBalance*(mr1*Math.pow(1+mr1,m1))/(Math.pow(1+mr1,m1)-1)
  const newBalance = currentBalance + cashOut
  const p2 = newBalance*(mr2*Math.pow(1+mr2,360))/(Math.pow(1+mr2,360)-1)
  const monthlySavings = p1 - p2
  const breakEvenMonths = closingCosts / Math.max(0.01, monthlySavings)
  const totalInterestOld = p1*m1 - currentBalance
  const totalInterestNew = p2*360 - newBalance
  const netBenefit = totalInterestOld - totalInterestNew - closingCosts
  return {
    currentPayment: Math.round(p1*100)/100,
    newPayment: Math.round(p2*100)/100,
    monthlySavings: Math.round(monthlySavings*100)/100,
    closingCosts, breakEvenMonths: Math.round(breakEvenMonths),
    breakEvenYears: Math.round(breakEvenMonths/12*10)/10,
    totalInterestOld: Math.round(totalInterestOld),
    totalInterestNew: Math.round(totalInterestNew),
    netBenefit: Math.round(netBenefit),
    worthRefinancing: breakEvenMonths < remainingYears*12*0.5 && netBenefit > 0,
    cashOutNote: cashOut > 0 ? `Cash-out of $${cashOut.toLocaleString()} increases loan balance and monthly payment` : 'Rate-and-term refinance only'
  }
}

export function calculateRetirementBucketStrategy(portfolio: number, annualExpenses: number, cashYears: number, bondYears: number, cashReturn: number, bondReturn: number, stockReturn: number) {
  const cashBucket = annualExpenses * cashYears
  const bondBucket = annualExpenses * bondYears
  const stockBucket = Math.max(0, portfolio - cashBucket - bondBucket)
  const cashIncome = cashBucket * cashReturn / 100
  const bondIncome = bondBucket * bondReturn / 100
  const stockGrowth = stockBucket * stockReturn / 100
  const totalIncome = cashIncome + bondIncome
  const refillRate = annualExpenses - totalIncome
  const years30 = stockBucket * Math.pow(1 + stockReturn / 100, 30)
  return {
    cashBucket: Math.round(cashBucket), bondBucket: Math.round(bondBucket),
    stockBucket: Math.round(stockBucket),
    cashPercent: Math.round(cashBucket / portfolio * 100),
    bondPercent: Math.round(bondBucket / portfolio * 100),
    stockPercent: Math.round(stockBucket / portfolio * 100),
    annualIncomFromFixed: Math.round(totalIncome),
    stockGrowthAnnual: Math.round(stockGrowth),
    refillFromStock: Math.round(Math.max(0, refillRate)),
    stockBucket30yr: Math.round(years30),
    strategy: 'Refill cash bucket from bonds annually; refill bonds from stocks in strong market years'
  }
}

export function calculateRetirementHealthcareBridge(retirementAge: number, medicareAge: number, currentPremium: number, cobraMonths: number) {
  const bridgeMonths = (medicareAge - retirementAge) * 12
  const cobraCost = cobraMonths * currentPremium * 2.02 // COBRA = 102% of premium
  const remainingMonths = Math.max(0, bridgeMonths - cobraMonths)
  const acaEstMonthly = retirementAge < 55 ? 600 : retirementAge < 60 ? 800 : 1100
  const acaCost = remainingMonths * acaEstMonthly
  const totalBridgeCost = cobraCost + acaCost
  const hsaOffset = Math.min(totalBridgeCost * 0.40, 50000)
  const netBridgeCost = totalBridgeCost - hsaOffset
  const medicarePartBCost = 202.90 * 12 * Math.max(0, medicareAge === 65 ? 20 : 25)
  return {
    bridgeMonths, cobraCost: Math.round(cobraCost),
    acaCost: Math.round(acaCost), acaEstMonthly,
    totalBridgeCost: Math.round(totalBridgeCost),
    hsaOffset: Math.round(hsaOffset), netBridgeCost: Math.round(netBridgeCost),
    medicarePartBCost: Math.round(medicarePartBCost),
    totalRetirementHealthcare: Math.round(netBridgeCost + medicarePartBCost),
    recommendation: cobraMonths > 18 ? 'COBRA limited to 18 months — plan ACA coverage for remainder' : 'Consider ACA marketplace — subsidy available if income under 400% FPL'
  }
}

export function calculateReverseMortgage(homeValue: number, age: number, existingMortgage: number, interestRate: number, monthlyPayment: 'lumpsum'|'lineOfCredit'|'monthly') {
  const principalLimitFactor = age < 65 ? 0.40 : age < 70 ? 0.45 : age < 75 ? 0.52 : age < 80 ? 0.58 : 0.65
  const principalLimit = homeValue * principalLimitFactor
  const availableProceeds = Math.max(0, principalLimit - existingMortgage)
  const originationFee = Math.min(6000, Math.max(2500, homeValue * 0.02))
  const mip = homeValue * 0.02
  const closingCosts = originationFee + mip + 2500
  const netProceeds = availableProceeds - closingCosts
  const monthlyRate = interestRate / 100 / 12
  const growthRate = monthlyPayment === 'lineOfCredit' ? monthlyRate * 1.5 : monthlyRate
  const tenYearBalance = netProceeds * Math.pow(1 + growthRate, 120)
  const remainingEquity = homeValue * Math.pow(1.03, 10) - tenYearBalance
  return {
    principalLimit: Math.round(principalLimit), availableProceeds: Math.round(availableProceeds),
    closingCosts: Math.round(closingCosts), netProceeds: Math.round(netProceeds),
    monthlyPayout: monthlyPayment === 'monthly' ? Math.round(netProceeds / 240) : 0,
    tenYearBalance: Math.round(tenYearBalance),
    remainingEquity10yr: Math.round(Math.max(0, remainingEquity)),
    nonRecourseProtection: 'You will never owe more than the home is worth at sale',
    heirsImpact: 'Heirs inherit remaining equity or can pay off loan to keep the home'
  }
}

export function calculateRothVsTraditional401k(grossSalary: number, contributionAmount: number, currentTaxRate: number, retirementTaxRate: number, years: number, returnRate: number) {
  const traditionalContrib = contributionAmount
  const rothContrib = contributionAmount * (1 - currentTaxRate / 100)
  const traditionalGrowth = traditionalContrib * Math.pow(1 + returnRate / 100, years)
  const traditionalAfterTax = traditionalGrowth * (1 - retirementTaxRate / 100)
  const rothGrowth = rothContrib * Math.pow(1 + returnRate / 100, years)
  const rothAfterTax = rothGrowth
  const diff = rothAfterTax - traditionalAfterTax
  const traditional401kTaxSavingNow = contributionAmount * currentTaxRate / 100
  const yearData = Array.from({ length: Math.min(years + 1, 41) }, (_, i) => ({
    year: i,
    traditional: Math.round(traditionalContrib * Math.pow(1 + returnRate / 100, i) * (1 - retirementTaxRate / 100)),
    roth: Math.round(rothContrib * Math.pow(1 + returnRate / 100, i))
  }))
  return {
    traditionalGrowth: Math.round(traditionalGrowth),
    traditionalAfterTax: Math.round(traditionalAfterTax),
    rothGrowth: Math.round(rothGrowth),
    rothAfterTax: Math.round(rothAfterTax),
    rothWins: rothAfterTax > traditionalAfterTax,
    difference: Math.round(Math.abs(diff)),
    traditional401kTaxSavingNow: Math.round(traditional401kTaxSavingNow),
    decisionRule: currentTaxRate < retirementTaxRate ? 'Choose Roth — you\'re in a lower bracket now than you\'ll be in retirement' : currentTaxRate > retirementTaxRate ? 'Choose Traditional — save taxes now at higher rate' : 'Either works — rates are equal; Roth adds flexibility',
    yearData
  }
}

export function calculateSBALoanAffordability(loanAmount: number, sbaRate: number, termYears: number, annualRevenue: number, netProfit: number, existingDebt: number) {
  const mr = sbaRate / 100 / 12
  const months = termYears * 12
  const payment = loanAmount * (mr * Math.pow(1+mr, months)) / (Math.pow(1+mr, months)-1)
  const annualPayment = payment * 12
  const totalInterest = payment * months - loanAmount
  const dscr = netProfit / annualPayment
  const debtService = (annualPayment + existingDebt) / annualRevenue * 100
  const sba7aLimit = 5000000
  const sba504Limit = 5000000
  const eligibleProgram = loanAmount <= 5000000 ? 'SBA 7(a) candidate' : 'Outside standard 7(a) maximum'
  return {
    monthlyPayment: Math.round(payment*100)/100, annualPayment: Math.round(annualPayment),
    totalInterest: Math.round(totalInterest), dscr: Math.round(dscr*100)/100,
    debtService: Math.round(debtService*10)/10,
    dscrAdequate: dscr >= 1.25, debtServiceHealthy: debtService < 35,
    eligibleProgram, qualifies: dscr >= 1.25 && annualRevenue > loanAmount * 0.3,
    maxLoan: Math.round(netProfit / (1.25 * mr * 12) * 0.8),
    sbaFee: 0
  }
}

export function calculateShareholderLoan(loanAmount: number, afr: number, shareholderTaxRate: number, corporateTaxRate: number, years: number) {
  const afrInterest = loanAmount * afr / 100
  const imputedInterestIncome = afrInterest
  const taxOnImputed = imputedInterestIncome * shareholderTaxRate / 100
  const corporateDeduction = afrInterest * corporateTaxRate / 100
  const netTaxCost = taxOnImputed - corporateDeduction
  const disguisedDividendRisk = 'IRS may recharacterize excessive loans as dividends if not documented properly'
  const totalInterestPaid = afrInterest * years
  return {
    requiredInterestRate: afr, annualInterest: Math.round(afrInterest),
    taxOnImputedInterest: Math.round(taxOnImputed),
    corporateDeduction: Math.round(corporateDeduction),
    netAnnualTaxCost: Math.round(netTaxCost),
    totalInterestPaid: Math.round(totalInterestPaid),
    vsDistribution: Math.round(loanAmount * shareholderTaxRate / 100),
    disguisedDividendRisk,
    documentation: 'Require promissory note, fixed repayment schedule, and actual repayment to avoid reclassification'
  }
}

export function calculateSideHustleBreakeven(startupCosts: number, monthlyExpenses: number, pricePerUnit: number, costPerUnit: number, hoursPerWeek: number, hourlyOpportunityCost: number) {
  const contributionMargin = pricePerUnit - costPerUnit
  const breakEvenUnitsMonthly = monthlyExpenses / contributionMargin
  const monthsToRecoupStartup = startupCosts / (contributionMargin * breakEvenUnitsMonthly - monthlyExpenses + monthlyExpenses)
  const opportunityCostMonthly = hoursPerWeek * 4.33 * hourlyOpportunityCost
  const trueBreakEvenUnits = (monthlyExpenses + opportunityCostMonthly) / contributionMargin
  const annualOpportunityCost = opportunityCostMonthly * 12
  return {
    contributionMargin: Math.round(contributionMargin * 100) / 100,
    breakEvenUnitsMonthly: Math.round(breakEvenUnitsMonthly),
    monthsToRecoupStartup: Math.round(startupCosts / Math.max(1, contributionMargin * breakEvenUnitsMonthly - monthlyExpenses)),
    opportunityCostMonthly: Math.round(opportunityCostMonthly),
    trueBreakEvenUnits: Math.round(trueBreakEvenUnits),
    annualOpportunityCost: Math.round(annualOpportunityCost),
    insight: trueBreakEvenUnits > breakEvenUnitsMonthly * 1.5 ? 'Your time has significant value — factor opportunity cost into pricing' : 'Opportunity cost is manageable relative to business economics'
  }
}

export function calculateSocialSecurityCOLAImpact(currentBenefit: number, startAge: number, colaRate: number, years: number) {
  const yearData = Array.from({length: years+1}, (_, i) => {
    const nominal = currentBenefit * Math.pow(1 + colaRate/100, i)
    const real = currentBenefit // purchasing power stays same with perfect COLA
    const cumulative = Array.from({length: i+1}, (_, j) => currentBenefit * Math.pow(1+colaRate/100, j) * 12).reduce((s,v)=>s+v, 0)
    return { year: i, age: startAge + i, monthlyBenefit: Math.round(nominal), cumulative: Math.round(cumulative) }
  })
  const totalLifetime = yearData[years].cumulative
  const withoutCOLA = currentBenefit * 12 * years
  const colaValue = totalLifetime - withoutCOLA
  const inflationErosion = currentBenefit * 12 * years - currentBenefit * Math.pow(1-0.035, years) * 12 * years
  return {
    currentBenefit, finalMonthly: Math.round(currentBenefit * Math.pow(1+colaRate/100, years)),
    totalLifetime: Math.round(totalLifetime),
    withoutCOLATotal: Math.round(withoutCOLA),
    colaValue: Math.round(colaValue),
    colaPercent: Math.round(colaValue / withoutCOLA * 100),
    averageCOLA2000to2025: 2.6,
    yearData
  }
}

export function calculateSocialSecurityDisabilityBenefit(avgMonthlyEarnings: number, yearsWorked: number, age: number, disabilityAge: number) {
  const aime = avgMonthlyEarnings
  const bendPoint1 = 1286, bendPoint2 = 7749
  const pia = Math.min(aime, bendPoint1) * 0.90 + Math.min(Math.max(0, aime - bendPoint1), bendPoint2 - bendPoint1) * 0.32 + Math.max(0, aime - bendPoint2) * 0.15
  const workCreditsNeeded = disabilityAge < 24 ? 6 : disabilityAge < 31 ? Math.ceil((disabilityAge - 21) * 2) : 20
  const creditsEarned = yearsWorked * 4
  const eligible = creditsEarned >= workCreditsNeeded
  const monthsWaiting = 5 // mandatory 5-month waiting period
  const firstPayment = disabilityAge + monthsWaiting / 12
  const medicareEligibility = disabilityAge + 2 // Medicare after 24 months of SSDI
  const annualBenefit = pia * 12
  return {
    estimatedMonthlyBenefit: Math.round(pia),
    annualBenefit: Math.round(annualBenefit),
    eligible, creditsEarned, workCreditsNeeded,
    waitingPeriodMonths: monthsWaiting,
    medicareEligibilityAge: Math.round(medicareEligibility * 10) / 10,
    trialWorkPeriod: '9 months of trial work allowed while receiving SSDI without losing benefits',
    note: 'SSDI converts to retirement SS at FRA (67) with same benefit amount'
  }
}

export function calculateSocialSecurityMaximization(worker1PIA: number, worker2PIA: number, worker1Age: number, worker2Age: number, jointLifeExpectancy: number) {
  const FRA = 67
  const strategies = [
    { name: 'Both claim at 62', w1: worker1PIA * 0.70, w2: worker2PIA * 0.70 },
    { name: 'Both claim at FRA', w1: worker1PIA, w2: worker2PIA },
    { name: 'Both claim at 70', w1: worker1PIA * 1.24, w2: worker2PIA * 1.24 },
    { name: 'W1 at 70, W2 at 62', w1: worker1PIA * 1.24, w2: worker2PIA * 0.70 },
    { name: 'W1 at 62, W2 at 70', w1: worker1PIA * 0.70, w2: worker2PIA * 1.24 },
    { name: 'Higher earner at 70, lower at FRA', w1: Math.max(worker1PIA, worker2PIA) * 1.24, w2: Math.min(worker1PIA, worker2PIA) },
  ]
  const scoredStrategies = strategies.map(s => {
    const years = Math.max(0, jointLifeExpectancy - Math.max(worker1Age, worker2Age))
    const combined = (s.w1 + s.w2) * 12 * years
    return { ...s, w1: Math.round(s.w1), w2: Math.round(s.w2), combined: Math.round((s.w1 + s.w2) * 12), lifetimeValue: Math.round(combined) }
  })
  const optimal = scoredStrategies.reduce((b, s) => s.lifetimeValue > b.lifetimeValue ? s : b)
  return { strategies: scoredStrategies, optimal, highEarnerBenefit: Math.round((optimal.lifetimeValue - scoredStrategies[0].lifetimeValue)), survivorBenefit: Math.round(Math.max(scoredStrategies[optimal.name === strategies[2].name ? 2 : 5 > scoredStrategies.length ? 0 : 5]?.w1 || optimal.w1, optimal.w2)) }
}

export function calculateSpinOffTaxBasis(originalShares: number, originalCostBasis: number, spinOffAllocationPercent: number, spinOffSharesReceived: number, spinOffFMV: number, parentFMVAfter: number) {
  const originalFMVTotal = originalShares * (parentFMVAfter + spinOffSharesReceived / originalShares * spinOffFMV)
  const spinOffFMVTotal = spinOffSharesReceived * spinOffFMV
  const parentFMVTotal = originalShares * parentFMVAfter
  const totalFMV = spinOffFMVTotal + parentFMVTotal
  const allocatedToSpinOff = originalCostBasis * spinOffAllocationPercent / 100
  const allocatedToParent = originalCostBasis - allocatedToSpinOff
  const spinOffCostBasisPerShare = allocatedToSpinOff / spinOffSharesReceived
  const parentCostBasisPerShare = allocatedToParent / originalShares
  return {
    originalCostBasis, allocatedToSpinOff: Math.round(allocatedToSpinOff),
    allocatedToParent: Math.round(allocatedToParent),
    spinOffCostBasisPerShare: Math.round(spinOffCostBasisPerShare * 100) / 100,
    parentCostBasisPerShare: Math.round(parentCostBasisPerShare * 100) / 100,
    spinOffFMVTotal: Math.round(spinOffFMVTotal),
    taxNote: 'Spin-offs are generally tax-free under Section 355. Allocate cost basis by FMV ratio at distribution date.',
    irsForm: 'Check company investor relations page for official IRS-approved allocation percentage.'
  }
}

export function calculateStartupEquityValue(equityPercent: number, currentValuation: number, exitValuation: number, dilutionPerRound: number, roundsToExit: number, exitProbability: number) {
  let currentOwnership = equityPercent
  for (let i = 0; i < roundsToExit; i++) currentOwnership *= (1 - dilutionPerRound / 100)
  const exitOwnershipValue = exitValuation * currentOwnership / 100
  const expectedValue = exitOwnershipValue * exitProbability / 100
  const currentValue = currentValuation * equityPercent / 100
  const multiple = exitOwnershipValue / Math.max(1, currentValue)
  const taxAtExit = exitOwnershipValue * 0.238
  const netExitValue = exitOwnershipValue - taxAtExit
  return {
    currentOwnership: Math.round(currentOwnership * 1000) / 1000,
    currentValue: Math.round(currentValue),
    exitOwnershipValue: Math.round(exitOwnershipValue),
    expectedValue: Math.round(expectedValue),
    multiple: Math.round(multiple * 10) / 10,
    netExitValue: Math.round(netExitValue),
    note: `Most startups fail or exit below expectations — ${exitProbability}% probability reflects realistic outcome weighting`
  }
}

export function calculateStockOptionBlackScholes(stockPrice: number, strikePrice: number, timeToExpiry: number, volatility: number, riskFreeRate: number) {
  const T = timeToExpiry / 365, sigma = volatility / 100, r = riskFreeRate / 100
  const d1 = (Math.log(stockPrice / strikePrice) + (r + sigma * sigma / 2) * T) / (sigma * Math.sqrt(T))
  const d2 = d1 - sigma * Math.sqrt(T)
  const N = (x: number) => {
    const a = Math.abs(x), k = 1 / (1 + 0.2316419 * a)
    const n = Math.exp(-a * a / 2) / Math.sqrt(2 * Math.PI)
    const p = 1 - n * ((((1.330274429 * k - 1.821255978) * k + 1.781477937) * k - 0.356563782) * k + 0.319381530) * k
    return x >= 0 ? p : 1 - p
  }
  const callPrice = stockPrice * N(d1) - strikePrice * Math.exp(-r * T) * N(d2)
  const putPrice = callPrice - stockPrice + strikePrice * Math.exp(-r * T)
  const intrinsicCall = Math.max(0, stockPrice - strikePrice)
  const intrinsicPut = Math.max(0, strikePrice - stockPrice)
  return {
    callPrice: Math.round(callPrice * 100) / 100,
    putPrice: Math.round(putPrice * 100) / 100,
    intrinsicValueCall: Math.round(intrinsicCall * 100) / 100,
    intrinsicValuePut: Math.round(intrinsicPut * 100) / 100,
    timeValueCall: Math.round((callPrice - intrinsicCall) * 100) / 100,
    delta: Math.round(N(d1) * 1000) / 1000,
    gamma: Math.round(Math.exp(-d1*d1/2) / (stockPrice * sigma * Math.sqrt(T) * Math.sqrt(2*Math.PI)) * 1000) / 1000,
    theta: Math.round(-(stockPrice * sigma * Math.exp(-d1*d1/2) / (2 * Math.sqrt(T) * Math.sqrt(2*Math.PI)) + r * strikePrice * Math.exp(-r*T) * N(d2)) / 365 * 1000) / 1000,
    impliedMove: Math.round(stockPrice * volatility / 100 * Math.sqrt(T) * 100) / 100
  }
}

export function calculateStockOptionVesting(grantShares: number, strikePrice: number, vestingYears: number, currentFMV: number, projectedGrowthRate: number, taxRate: number, optionType: 'iso'|'nso') {
  const spreadsPerYear = Array.from({length: vestingYears}, (_, i) => {
    const sharesThisYear = grantShares / vestingYears
    const fmvAtVest = currentFMV * Math.pow(1 + projectedGrowthRate/100, i+1)
    const spread = Math.max(0, fmvAtVest - strikePrice) * sharesThisYear
    const taxNSO = optionType === 'nso' ? spread * taxRate/100 : 0
    const amtISO = optionType === 'iso' ? spread : 0
    return {
      year: i+1, shares: sharesThisYear, fmvAtVest: Math.round(fmvAtVest*100)/100,
      spread: Math.round(spread), taxNSO: Math.round(taxNSO), amtISO: Math.round(amtISO),
      netValue: Math.round(spread - taxNSO)
    }
  })
  const totalSpread = spreadsPerYear.reduce((s, y) => s+y.spread, 0)
  const totalTax = spreadsPerYear.reduce((s, y) => s+y.taxNSO, 0)
  const totalAMT = spreadsPerYear.reduce((s, y) => s+y.amtISO, 0)
  const exerciseCost = grantShares * strikePrice
  return {
    grantShares, strikePrice, exerciseCost: Math.round(exerciseCost),
    currentTotalValue: Math.round(grantShares * currentFMV),
    totalSpread: Math.round(totalSpread),
    totalTax: Math.round(totalTax),
    totalAMTPreference: Math.round(totalAMT),
    netGain: Math.round(totalSpread - totalTax - exerciseCost),
    spreadsPerYear,
    strategy: optionType === 'iso' ?
      'Exercise ISOs early and hold 1yr+2yr for LT cap gains — watch AMT' :
      'Exercise NSOs when spread is small to minimize ordinary income tax'
  }
}

export function calculateStockSplitValue(sharesOwned: number, pricePerShare: number, splitRatio: string) {
  const [num, den] = splitRatio.split(':').map(Number)
  const ratio = num / den
  const newShares = sharesOwned * ratio
  const newPrice = pricePerShare / ratio
  const totalValueBefore = sharesOwned * pricePerShare
  const totalValueAfter = newShares * newPrice
  const reverseFlag = ratio < 1
  return {
    sharesBefore: sharesOwned, pricesBefore: pricePerShare,
    sharesAfter: Math.round(newShares * 100) / 100,
    priceAfter: Math.round(newPrice * 100) / 100,
    totalValueBefore: Math.round(totalValueBefore),
    totalValueAfter: Math.round(totalValueAfter),
    valueChange: 0,
    splitType: reverseFlag ? 'Reverse Split — reduces shares, increases price' : 'Forward Split — increases shares, reduces price',
    taxNote: 'Stock splits are NOT taxable events. Adjust your cost basis per share proportionally.',
    costBasisPerShareAfter: Math.round(pricePerShare / ratio * 100) / 100
  }
}

export function calculateTIPSvsBonds(tipsFaceValue: number, tipsRealYield: number, nominalBondYield: number, expectedInflation: number, years: number, taxRate: number) {
  const tipsInflationAdj = tipsFaceValue * Math.pow(1 + expectedInflation / 100, years)
  const tipsInterestAnnual = tipsFaceValue * tipsRealYield / 100
  const totalTIPSInterest = tipsInterestAnnual * years + (tipsInflationAdj - tipsFaceValue)
  const nominalInterest = tipsFaceValue * nominalBondYield / 100 * years
  const tipsTaxable = totalTIPSInterest
  const nominalTaxable = nominalInterest
  const tipsAfterTax = tipsInflationAdj + totalTIPSInterest - tipsTaxable * taxRate / 100
  const nominalAfterTax = tipsFaceValue + nominalInterest - nominalTaxable * taxRate / 100
  const tipsRealReturn = ((tipsAfterTax / tipsFaceValue) - 1) * 100
  const nominalRealReturn = ((nominalAfterTax / tipsFaceValue) / Math.pow(1 + expectedInflation / 100, years) - 1) * 100
  return {
    tipsInflationAdjValue: Math.round(tipsInflationAdj),
    totalTIPSValue: Math.round(tipsAfterTax),
    nominalBondValue: Math.round(nominalAfterTax),
    tipsBetter: tipsAfterTax > nominalAfterTax,
    difference: Math.round(Math.abs(tipsAfterTax - nominalAfterTax)),
    tipsAfterTaxReturn: Math.round(tipsRealReturn * 100) / 100,
    nominalAfterTaxReturn: Math.round(nominalRealReturn * 100) / 100,
    breakEvenInflation: Math.round((nominalBondYield - tipsRealYield) * 100) / 100
  }
}

export function calculateTaxDeferralBenefit(annualContrib: number, taxRate: number, years: number, returnRate: number, accountType: 'traditional'|'roth'|'taxable') {
  const afterTaxContrib = accountType === 'roth' ? annualContrib * (1 - taxRate / 100) : annualContrib
  const preTaxContrib = accountType === 'taxable' ? annualContrib * (1 - taxRate / 100) : annualContrib
  let traditional = 0, roth = 0, taxable = 0
  for (let i = 0; i < years; i++) {
    traditional = (traditional + annualContrib) * (1 + returnRate / 100)
    roth = (roth + annualContrib * (1 - taxRate / 100)) * (1 + returnRate / 100)
    taxable = (taxable + annualContrib * (1 - taxRate / 100)) * (1 + returnRate / 100 * 0.85)
  }
  const traditionalAfterTax = traditional * (1 - taxRate / 100)
  const yearData = Array.from({ length: Math.min(years + 1, 41) }, (_, i) => {
    let t = 0, r = 0, x = 0
    for (let j = 0; j < i; j++) {
      t = (t + annualContrib) * (1 + returnRate / 100)
      r = (r + annualContrib * (1 - taxRate / 100)) * (1 + returnRate / 100)
      x = (x + annualContrib * (1 - taxRate / 100)) * (1 + returnRate / 100 * 0.85)
    }
    return { year: i, traditional: Math.round(t * (1 - taxRate / 100)), roth: Math.round(r), taxable: Math.round(x) }
  })
  return {
    traditionalFinal: Math.round(traditional), traditionalAfterTax: Math.round(traditionalAfterTax),
    rothFinal: Math.round(roth), taxableFinal: Math.round(taxable),
    rothAdvantageVsTaxable: Math.round(roth - taxable),
    traditionalAdvantageVsTaxable: Math.round(traditionalAfterTax - taxable),
    yearData
  }
}

export function calculateTaxEfficientWithdrawal(traditionalIRA: number, rothIRA: number, taxableAccount: number, annualNeed: number, taxRate: number, age: number) {
  const isRMDAge = age >= 73
  const rmd = isRMDAge ? traditionalIRA / 26.5 : 0
  const rmdTax = rmd * taxRate / 100
  const fromRoth = Math.min(rothIRA, Math.max(0, annualNeed - rmd))
  const fromTaxable = Math.min(taxableAccount, Math.max(0, annualNeed - rmd - fromRoth))
  const fromTraditional = Math.max(0, annualNeed - rmd - fromRoth - fromTaxable)
  const totalTax = rmdTax + fromTraditional * taxRate / 100 + fromTaxable * 0.15
  const netIncome = annualNeed - totalTax
  const strategies = [
    isRMDAge ? `RMD: $${Math.round(rmd).toLocaleString()} (required)` : 'No RMD yet',
    'Spend taxable accounts first (step-up in basis at death)',
    'Use Roth for needs above RMD (tax-free)',
    'Delay Traditional IRA withdrawals to minimize bracket exposure',
    'Consider QCDs from IRA after 70½ (reduces RMD, not taxable)'
  ]
  return {
    rmd: Math.round(rmd), rmdTax: Math.round(rmdTax),
    fromTraditional: Math.round(fromTraditional), fromRoth: Math.round(fromRoth),
    fromTaxable: Math.round(fromTaxable), totalTax: Math.round(totalTax),
    netIncome: Math.round(netIncome), effectiveRate: Math.round(totalTax / annualNeed * 100),
    strategies
  }
}

export function calculateTaxExemptBondEquivalent(municipalYield: number, corporateYield: number, treasuryYield: number, federalRate: number, stateRate: number, fica: number) {
  const combinedRate = federalRate + stateRate
  const muniTEY = municipalYield / (1 - combinedRate/100)
  const muniTEYfed = municipalYield / (1 - federalRate/100)
  const corpAfterTax = corporateYield * (1 - combinedRate/100)
  const treasuryAfterTax = treasuryYield * (1 - federalRate/100) // state exempt
  const best = muniTEY >= corporateYield && muniTEY >= treasuryAfterTax ? 'Municipal Bond' : corporateYield >= muniTEY && corporateYield >= treasuryAfterTax ? 'Corporate Bond' : 'US Treasury'
  const muniAdvantage = muniTEY - Math.max(corporateYield, treasuryAfterTax)
  return {
    municipalYield, corporateYield, treasuryYield,
    muniTEY: Math.round(muniTEY*100)/100,
    muniTEYfed: Math.round(muniTEYfed*100)/100,
    corpAfterTax: Math.round(corpAfterTax*100)/100,
    treasuryAfterTax: Math.round(treasuryAfterTax*100)/100,
    best, muniAdvantage: Math.round(muniAdvantage*100)/100,
    combinedRate, muniWorthIt: muniTEY > corporateYield,
    on100k: { muni: Math.round(1000000*municipalYield/100), corp: Math.round(1000000*corpAfterTax/100), treasury: Math.round(1000000*treasuryAfterTax/100) }
  }
}

export function calculateTaxFreeSavingsOptimizer(annualIncome: number, taxRate: number, filingStatus: 'single'|'married', age: number) {
  const catchUp401k = age >= 60 && age <= 63 ? 11250 : age >= 50 ? 8000 : 0
  const k401Limit = 24500 + catchUp401k
  const hsaLimit = 4400 // 2026 self-only HSA limit; family coverage is higher
  const iraLimit = 7500 + (age >= 50 ? 1100 : 0)
  const fsaLimit = 3400
  const dcFsaLimit = 7500
  const totalPreTax = k401Limit + hsaLimit + fsaLimit
  const taxSavingsPreTax = totalPreTax * taxRate / 100
  const ficaSavings = (hsaLimit + fsaLimit) * 0.0765
  const rothContrib = annualIncome > (filingStatus === 'married' ? 236000 : 150000) ? 0 : iraLimit
  const backdoorRoth = annualIncome > (filingStatus === 'married' ? 236000 : 150000) ? iraLimit : 0
  const totalTaxAdvantaged = k401Limit + hsaLimit + fsaLimit + dcFsaLimit + iraLimit
  const totalTaxSavings = taxSavingsPreTax + ficaSavings + rothContrib * taxRate / 100 * 0.5
  const order = [
    { step: 1, account: '401k (to full match)', limit: `Match amount`, benefit: '100% instant return' },
    { step: 2, account: 'HSA (if HDHP eligible)', limit: `$${hsaLimit.toLocaleString()}`, benefit: 'Triple tax — best in tax code' },
    { step: 3, account: '401k (to max)', limit: `$${k401Limit.toLocaleString()}`, benefit: 'Pre-tax growth' },
    { step: 4, account: 'IRA (Roth or Backdoor)', limit: `$${iraLimit.toLocaleString()}`, benefit: 'Tax-free growth' },
    { step: 5, account: 'FSA (medical)', limit: `$${fsaLimit.toLocaleString()}`, benefit: 'Pre-tax + FICA savings' },
    { step: 6, account: 'DC-FSA (childcare)', limit: `$${dcFsaLimit.toLocaleString()}`, benefit: 'Pre-tax childcare' },
  ]
  return {
    k401Limit, hsaLimit, iraLimit, fsaLimit, dcFsaLimit,
    totalPreTax: Math.round(totalPreTax),
    taxSavingsPreTax: Math.round(taxSavingsPreTax),
    ficaSavings: Math.round(ficaSavings),
    totalTaxSavings: Math.round(totalTaxSavings),
    totalTaxAdvantaged, rothEligible: rothContrib > 0,
    backdoorRoth: backdoorRoth > 0,
    order,
    percentOfIncomeSheltered: Math.round(totalTaxAdvantaged / annualIncome * 100)
  }
}

export function calculateTaxLossHarvestingPortfolio(positions: Array<{name: string; gain: number; loss: number; held: number}>, totalGains: number, taxRate: number) {
  const safe = positions || [{name:'Position A', gain:0, loss:15000, held:200},{name:'Position B', gain:25000, loss:0, held:400}]
  const totalLosses = safe.reduce((s, p) => s + Math.max(0, p.loss), 0)
  const netGains = Math.max(0, totalGains - totalLosses)
  const carryForward = Math.max(0, totalLosses - totalGains - 3000)
  const taxSavingsThisYear = Math.min(totalLosses, totalGains + 3000) * taxRate / 100
  const ordinaryDeduction = Math.min(3000, Math.max(0, totalLosses - totalGains)) * taxRate / 100
  return {
    totalLossesAvailable: Math.round(totalLosses),
    totalGains, netGains: Math.round(netGains),
    taxSavingsThisYear: Math.round(taxSavingsThisYear),
    ordinaryIncomeDeduction: Math.round(ordinaryDeduction),
    carryForwardLoss: Math.round(carryForward),
    totalTaxBenefit: Math.round(taxSavingsThisYear + ordinaryDeduction),
    washSaleWarning: 'Do not repurchase same or substantially identical security within 30 days'
  }
}

export function calculateTrustFundGrowth(initialFunding: number, annualContrib: number, beneficiaryAge: number, distributionAge: number, growthRate: number, trusteeAnnualFee: number) {
  const years = distributionAge - beneficiaryAge
  let balance = initialFunding
  const yearData: Array<{ year: number; age: number; balance: number }> = []
  for (let i = 0; i < years; i++) {
    const fee = balance * trusteeAnnualFee / 100
    balance = balance * (1 + growthRate / 100) - fee + annualContrib
    yearData.push({ year: i + 1, age: beneficiaryAge + i + 1, balance: Math.round(balance) })
  }
  const totalContributed = initialFunding + annualContrib * years
  const totalFees = yearData.reduce((s, y, i) => s + (i === 0 ? initialFunding : yearData[i - 1].balance) * trusteeAnnualFee / 100, 0)
  const totalGrowth = balance - totalContributed
  return {
    finalBalance: Math.round(balance), totalContributed: Math.round(totalContributed),
    totalGrowth: Math.round(totalGrowth), totalFeesPaid: Math.round(totalFees),
    distributionAge, yearData
  }
}

export function calculateUmbrellaPolicyValue(netWorth: number, autoLiabilityLimit: number, homeLiabilityLimit: number, umbrellaCoverage: number, umbrellaAnnualCost: number) {
  const assetsAtRisk = Math.max(0, netWorth - Math.max(autoLiabilityLimit, homeLiabilityLimit))
  const recommendedCoverage = Math.max(1000000, Math.ceil(netWorth / 1000000) * 1000000)
  const coverageGap = Math.max(0, recommendedCoverage - umbrellaCoverage - Math.max(autoLiabilityLimit, homeLiabilityLimit))
  const costPerMillion = umbrellaAnnualCost / Math.max(1, umbrellaCoverage / 1000000)
  const avgLawsuitAward = 1200000 // internal scenario assumption; not an industry-average claim
  const protectionValue = Math.min(umbrellaCoverage, avgLawsuitAward) - Math.max(autoLiabilityLimit, homeLiabilityLimit)
  return {
    assetsAtRisk: Math.round(assetsAtRisk), recommendedCoverage: Math.round(recommendedCoverage),
    coverageGap: Math.round(coverageGap), costPerMillion: Math.round(costPerMillion),
    protectionValue: Math.round(Math.max(0, protectionValue)),
    worthIt: assetsAtRisk > 250000,
    note: 'Premiums and required underlying limits vary by insurer, household exposures, location and coverage terms'
  }
}

export function calculateVacationRentalROI(propertyValue: number, annualRentalRevenue: number, occupancyRate: number, platformFeePercent: number, annualExpenses: number, mortgagePayment: number) {
  const effectiveRevenue = annualRentalRevenue * (occupancyRate/100) * (1 - platformFeePercent/100)
  const netOperatingIncome = effectiveRevenue - annualExpenses
  const cashFlow = netOperatingIncome - mortgagePayment * 12
  const capRate = netOperatingIncome / propertyValue * 100
  const down = propertyValue * 0.25
  const cashOnCash = cashFlow / down * 100
  const grossYield = annualRentalRevenue / propertyValue * 100
  const breakEvenOccupancy = (annualExpenses + mortgagePayment*12) / (annualRentalRevenue * (1-platformFeePercent/100)) * 100
  const appreciation10yr = propertyValue * Math.pow(1.04, 10) - propertyValue
  const totalReturn10yr = cashFlow * 10 + appreciation10yr
  return {
    effectiveRevenue: Math.round(effectiveRevenue),
    netOperatingIncome: Math.round(netOperatingIncome),
    cashFlow: Math.round(cashFlow), capRate: Math.round(capRate*100)/100,
    cashOnCash: Math.round(cashOnCash*100)/100,
    grossYield: Math.round(grossYield*100)/100,
    breakEvenOccupancy: Math.round(breakEvenOccupancy*10)/10,
    appreciation10yr: Math.round(appreciation10yr),
    totalReturn10yr: Math.round(totalReturn10yr),
    worthInvesting: capRate > 5 && cashFlow > 0,
    riskNote: 'STR regulations vary by city — verify local laws before purchasing'
  }
}

export function calculateVariableAnnuityFees(investedAmount: number, subaccountReturn: number, mortalityExpense: number, adminFee: number, riderFees: number, surrenderYears: number, years: number) {
  const totalAnnualFee = mortalityExpense + adminFee + riderFees
  const netReturn = subaccountReturn - totalAnnualFee
  const feeImpact = investedAmount * Math.pow(1 + subaccountReturn / 100, years) - investedAmount * Math.pow(1 + netReturn / 100, years)
  const finalValue = investedAmount * Math.pow(1 + netReturn / 100, years)
  const surrenderCharge = years <= surrenderYears ? finalValue * Math.max(0, (surrenderYears - years + 1)) / 100 : 0
  const alternativeETF = investedAmount * Math.pow(1 + (subaccountReturn - 0.10) / 100, years) // ETF with 0.10% fee
  const feeDrag = alternativeETF - finalValue
  return {
    totalAnnualFee, netReturn: Math.round(netReturn * 100) / 100,
    finalValue: Math.round(finalValue), feeImpact: Math.round(feeImpact),
    surrenderCharge: Math.round(surrenderCharge),
    netAfterSurrender: Math.round(finalValue - surrenderCharge),
    alternativeETF: Math.round(alternativeETF), feeDrag: Math.round(feeDrag),
    breakEvenYears: Math.ceil(surrenderYears + 2),
    recommendation: totalAnnualFee > 2 ? 'High fee load — compare carefully against low-cost ETF alternatives' : 'Moderate fees — evaluate specific benefits vs cost'
  }
}

export function calculateWageGarnishment(grossWeeklyPay: number, garnishmentType: 'creditCard'|'studentLoan'|'childSupport'|'taxLevy', state: string) {
  const federalMinWage = 7.25
  const disposableIncome = grossWeeklyPay * 0.78 // after standard deductions
  const thirtyXMinWage = federalMinWage * 30
  const maxGarnishCCJ = Math.min(disposableIncome * 0.25, Math.max(0, disposableIncome - thirtyXMinWage))
  const maxGarnishStudentLoan = disposableIncome * 0.15
  const maxGarnishChildSupport = disposableIncome * 0.50
  const garnishAmounts: Record<string, number> = { creditCard: maxGarnishCCJ, studentLoan: maxGarnishStudentLoan, childSupport: maxGarnishChildSupport, taxLevy: disposableIncome * 0.30 }
  const weeklyGarnish = garnishAmounts[garnishmentType]
  const annualGarnish = weeklyGarnish * 52
  const netWeeklyPay = grossWeeklyPay - weeklyGarnish
  const protectedStates = ['TX','PA','NC','SC'].includes(state) && garnishmentType === 'creditCard'
  return {
    disposableIncome: Math.round(disposableIncome), weeklyGarnish: Math.round(weeklyGarnish),
    annualGarnish: Math.round(annualGarnish), netWeeklyPay: Math.round(netWeeklyPay),
    protectedState: protectedStates,
    note: protectedStates ? `${state} prohibits most wage garnishment for credit card/consumer debt` : 'Federal CCPA limits apply; state law may provide additional protection'
  }
}

export function calculateWeddingBudget(totalBudget: number, guestCount: number, venueType: 'ballroom'|'outdoor'|'restaurant'|'backyard', region: 'northeast'|'south'|'midwest'|'west') {
  const regionMultiplier = {northeast:1.35, west:1.25, south:0.90, midwest:0.85}[region]
  const venueBase = {ballroom:8000, outdoor:5000, restaurant:4000, backyard:1500}[venueType]
  const venue = venueBase * regionMultiplier
  const catering = guestCount * 85 * regionMultiplier
  const photography = 3500 * regionMultiplier
  const flowers = 2800 * regionMultiplier
  const music = 2200 * regionMultiplier
  const attire = 2500
  const rings = 7000
  const misc = totalBudget * 0.10
  const planned = venue + catering + photography + flowers + music + attire + rings + misc
  const surplus = totalBudget - planned
  const perGuest = totalBudget / Math.max(1, guestCount)
  const avgUSWedding2026 = 35000
  return {
    totalBudget, planned: Math.round(planned), surplus: Math.round(surplus),
    venue: Math.round(venue), catering: Math.round(catering),
    photography: Math.round(photography), flowers: Math.round(flowers),
    music: Math.round(music), attire, rings,
    perGuest: Math.round(perGuest), avgUSWedding: avgUSWedding2026,
    vsAverage: Math.round(totalBudget - avgUSWedding2026),
    withinBudget: planned <= totalBudget,
    savingsTip: surplus < 0 ? `Over budget by $${Math.round(Math.abs(surplus))} — reduce guest list or choose simpler venue` : `Under budget by $${Math.round(surplus)} — allocate to honeymoon or emergency fund`
  }
}