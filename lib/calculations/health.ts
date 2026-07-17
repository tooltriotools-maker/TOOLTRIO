// ============================================================
// HEALTH CALCULATION LIBRARY
// ============================================================

/** BMI Calculator */
export function calculateBMI(weightKg: number, heightCm: number) {
  const heightM = heightCm / 100
  const bmi = weightKg / (heightM * heightM)
  let category = '', color = ''
  if (bmi < 18.5) { category = 'Underweight'; color = '#3b82f6' }
  else if (bmi < 25) { category = 'Normal Weight'; color = '#22c55e' }
  else if (bmi < 30) { category = 'Overweight'; color = '#f59e0b' }
  else { category = 'Obese'; color = '#ef4444' }
  const idealWeightMin = 18.5 * heightM * heightM
  const idealWeightMax = 24.9 * heightM * heightM
  return { bmi: parseFloat(bmi.toFixed(1)), category, color, idealWeightMin: parseFloat(idealWeightMin.toFixed(1)), idealWeightMax: parseFloat(idealWeightMax.toFixed(1)) }
}

/** BMR Calculator (Mifflin-St Jeor) */
export function calculateBMR(weightKg: number, heightCm: number, age: number, gender: 'male' | 'female') {
  const bmr = gender === 'male'
    ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
    : 10 * weightKg + 6.25 * heightCm - 5 * age - 161
  return {
    bmr: Math.round(bmr),
    sedentary: Math.round(bmr * 1.2),
    lightlyActive: Math.round(bmr * 1.375),
    moderatelyActive: Math.round(bmr * 1.55),
    veryActive: Math.round(bmr * 1.725),
    extraActive: Math.round(bmr * 1.9),
  }
}

/** Calorie Calculator */
export function calculateCalories(weightKg: number, heightCm: number, age: number, gender: 'male' | 'female', activityLevel: number, goal: 'loss' | 'maintain' | 'gain') {
  const bmrData = calculateBMR(weightKg, heightCm, age, gender)
  const tdee = bmrData.bmr * activityLevel
  return {
    bmr: bmrData.bmr,
    tdee: Math.round(tdee),
    weightLoss: Math.round(tdee - 500),
    aggressiveLoss: Math.round(tdee - 1000),
    weightGain: Math.round(tdee + 500),
    maintenance: Math.round(tdee),
    macros: {
      protein: Math.round(weightKg * 2.2),
      carbs: Math.round((tdee * 0.45) / 4),
      fat: Math.round((tdee * 0.30) / 9),
    }
  }
}

/** Body Fat Calculator (US Navy Method) */
export function calculateBodyFat(gender: 'male' | 'female', weightKg: number, heightCm: number, waistCm: number, neckCm: number, hipCm?: number) {
  let bodyFat = 0
  if (gender === 'male') {
    bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waistCm - neckCm) + 0.15456 * Math.log10(heightCm)) - 450
  } else if (hipCm) {
    bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waistCm + hipCm - neckCm) + 0.22100 * Math.log10(heightCm)) - 450
  }
  bodyFat = Math.max(3, Math.min(50, bodyFat))
  const fatMass = weightKg * bodyFat / 100
  const leanMass = weightKg - fatMass
  let category = ''
  if (gender === 'male') {
    if (bodyFat < 6) category = 'Essential Fat'
    else if (bodyFat < 14) category = 'Athletic'
    else if (bodyFat < 18) category = 'Fitness'
    else if (bodyFat < 25) category = 'Average'
    else category = 'Obese'
  } else {
    if (bodyFat < 14) category = 'Essential Fat'
    else if (bodyFat < 21) category = 'Athletic'
    else if (bodyFat < 25) category = 'Fitness'
    else if (bodyFat < 32) category = 'Average'
    else category = 'Obese'
  }
  return { bodyFat: parseFloat(bodyFat.toFixed(1)), fatMass: parseFloat(fatMass.toFixed(1)), leanMass: parseFloat(leanMass.toFixed(1)), category }
}

/** Ideal Weight Calculator */
export function calculateIdealWeight(heightCm: number, gender: 'male' | 'female', age: number) {
  const heightIn = heightCm / 2.54
  const basePound = gender === 'male' ? 106 : 100
  const hamwiKg = (basePound + 6 * (heightIn - 60)) * 0.453592
  const robinsonKg = gender === 'male' ? 52 + 1.9 * (heightIn - 60) : 49 + 1.7 * (heightIn - 60)
  const millerKg = gender === 'male' ? 56.2 + 1.41 * (heightIn - 60) : 53.1 + 1.36 * (heightIn - 60)
  const bmiMin = 18.5 * Math.pow(heightCm / 100, 2)
  const bmiMax = 24.9 * Math.pow(heightCm / 100, 2)
  return {
    hamwi: parseFloat(hamwiKg.toFixed(1)),
    robinson: parseFloat(robinsonKg.toFixed(1)),
    miller: parseFloat(millerKg.toFixed(1)),
    bmiMin: parseFloat(bmiMin.toFixed(1)),
    bmiMax: parseFloat(bmiMax.toFixed(1)),
    recommended: parseFloat(((hamwiKg + robinsonKg + millerKg) / 3).toFixed(1)),
  }
}

/** Water Intake Calculator */
export function calculateWaterIntake(weightKg: number, activityMinutes: number, climate: 'temperate' | 'hot' | 'cold') {
  const baseIntakeMl = weightKg * 35
  const activityExtra = activityMinutes * 5
  const climateMultiplier = climate === 'hot' ? 1.2 : climate === 'cold' ? 0.9 : 1
  const totalMl = (baseIntakeMl + activityExtra) * climateMultiplier
  const glasses = totalMl / 240
  return { totalMl: Math.round(totalMl), totalLiters: parseFloat((totalMl / 1000).toFixed(1)), glasses: parseFloat(glasses.toFixed(1)), baseIntakeMl: Math.round(baseIntakeMl), activityExtra: Math.round(activityExtra) }
}

/** Protein Intake Calculator */
export function calculateProteinIntake(weightKg: number, activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'athlete', goal: 'maintain' | 'build' | 'lose') {
  const multipliers: Record<string, number> = { sedentary: 0.8, light: 1.0, moderate: 1.2, active: 1.4, athlete: 1.7 }
  const goalMultipliers: Record<string, number> = { maintain: 1, build: 1.3, lose: 1.2 }
  const baseProtein = weightKg * multipliers[activityLevel] * goalMultipliers[goal]
  return {
    minimum: Math.round(weightKg * 0.8),
    recommended: Math.round(baseProtein),
    maximum: Math.round(weightKg * 2.2),
    perMeal: Math.round(baseProtein / 4),
    caloriesFromProtein: Math.round(baseProtein * 4),
  }
}

/** Pregnancy Due Date Calculator */
export function calculatePregnancyDueDate(lmpDate: Date) {
  const dueDate = new Date(lmpDate)
  dueDate.setDate(dueDate.getDate() + 280)
  const today = new Date()
  const gestationalAgeDays = Math.max(0, Math.floor((today.getTime() - lmpDate.getTime()) / (1000 * 60 * 60 * 24)))
  const gestationalWeeks = Math.floor(gestationalAgeDays / 7)
  const gestationalDays = gestationalAgeDays % 7
  const trimester = gestationalWeeks < 13 ? 1 : gestationalWeeks < 27 ? 2 : 3
  const daysLeft = Math.max(0, Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)))
  return { dueDate, gestationalWeeks, gestationalDays, trimester, daysLeft }
}

/** Ovulation Calculator */
export function calculateOvulation(lastPeriodDate: Date, cycleLength: number) {
  const ovulationDay = cycleLength - 14
  const ovulationDate = new Date(lastPeriodDate)
  ovulationDate.setDate(ovulationDate.getDate() + ovulationDay)
  const fertileStart = new Date(ovulationDate)
  fertileStart.setDate(fertileStart.getDate() - 5)
  const fertileEnd = new Date(ovulationDate)
  fertileEnd.setDate(fertileEnd.getDate() + 1)
  const nextPeriod = new Date(lastPeriodDate)
  nextPeriod.setDate(nextPeriod.getDate() + cycleLength)
  return { ovulationDate, fertileStart, fertileEnd, nextPeriod }
}

/** Sleep Cycle Calculator */
export function calculateSleepCycle(bedtime: string, wakeGoal: 'wake' | 'bed') {
  const [h, m] = bedtime.split(':').map(Number)
  const fallAsleepMinutes = 14
  const cycleMinutes = 90
  const results = []
  for (let cycles = 4; cycles <= 6; cycles++) {
    const totalMinutes = cycles * cycleMinutes + (wakeGoal === 'wake' ? fallAsleepMinutes : 0)
    const targetH = h + Math.floor((m + (wakeGoal === 'wake' ? totalMinutes : -totalMinutes)) / 60)
    const targetM = (m + (wakeGoal === 'wake' ? totalMinutes : -totalMinutes)) % 60
    const adjustedH = ((targetH % 24) + 24) % 24
    const adjustedM = ((targetM % 60) + 60) % 60
    results.push({
      cycles,
      hours: (cycles * cycleMinutes) / 60,
      time: `${String(adjustedH).padStart(2, '0')}:${String(adjustedM).padStart(2, '0')}`,
      quality: cycles === 5 ? 'Optimal' : cycles === 6 ? 'Excellent' : 'Good'
    })
  }
  return { results, recommendation: results[1] }
}

// ═══════════════════════════════════════════════════════════════════════════
// V7 MERGE — New calculators added from V7 branch (49 new health tools)
// (calculateTestosteroneAge from V7 omitted — unused dead code, not imported
// by any V7 calculator page.)
// ═══════════════════════════════════════════════════════════════════════════

export function calculateAnkleBrachialIndex(ankleSystolic: number, armSystolic: number) {
  const abi = ankleSystolic / armSystolic
  let category: string, risk: string, color: string
  if (abi < 0.40) { category = 'Critical PAD'; risk = 'Critical — severe limb ischemia possible'; color = '#dc2626' }
  else if (abi < 0.70) { category = 'Moderate PAD'; risk = 'High — claudication likely, specialist required'; color = '#ef4444' }
  else if (abi < 0.90) { category = 'Mild PAD'; risk = 'Moderate — peripheral artery disease suspected'; color = '#f97316' }
  else if (abi <= 1.30) { category = 'Normal'; risk = 'Low — normal arterial blood flow'; color = '#22c55e' }
  else { category = 'Non-compressible'; risk = 'Calcified arteries — further testing needed'; color = '#8b5cf6' }
  const cardiovascularRisk = abi < 0.9 ? 'Elevated 5-year CV event risk (ABI < 0.9 = 3-5× higher mortality)' : 'Standard cardiovascular risk'
  return { abi: Math.round(abi * 100) / 100, category, risk, color, cardiovascularRisk, ankleSystolic, armSystolic, walkingImpact: abi < 0.7 ? 'Likely limited walking due to claudication' : abi < 0.9 ? 'May notice leg fatigue or mild cramping' : 'Walking unaffected' }
}

export function calculateAthleteHeartRate(age: number, restingHR: number, intensity: number, method: 'karvonen' | 'hrr' | 'basic') {
  const maxHR = 220 - age
  const hrReserve = maxHR - restingHR
  const karvonen = Math.round(restingHR + (hrReserve * intensity / 100))
  const hrrTarget = Math.round(maxHR * intensity / 100)
  const zones = [
    { name: 'Zone 1 — Recovery', min: Math.round(restingHR + hrReserve * 0.50), max: Math.round(restingHR + hrReserve * 0.60), pct: '50–60%', benefit: 'Active recovery, fat oxidation' },
    { name: 'Zone 2 — Aerobic Base', min: Math.round(restingHR + hrReserve * 0.60), max: Math.round(restingHR + hrReserve * 0.70), pct: '60–70%', benefit: 'Aerobic capacity, mitochondria' },
    { name: 'Zone 3 — Tempo', min: Math.round(restingHR + hrReserve * 0.70), max: Math.round(restingHR + hrReserve * 0.80), pct: '70–80%', benefit: 'Lactate threshold improvement' },
    { name: 'Zone 4 — Threshold', min: Math.round(restingHR + hrReserve * 0.80), max: Math.round(restingHR + hrReserve * 0.90), pct: '80–90%', benefit: 'VO2max, speed endurance' },
    { name: 'Zone 5 — VO2max', min: Math.round(restingHR + hrReserve * 0.90), max: maxHR, pct: '90–100%', benefit: 'Maximal aerobic power' },
  ]
  const target = method === 'karvonen' ? karvonen : method === 'hrr' ? hrrTarget : Math.round(maxHR * intensity / 100)
  const currentZone = zones.find(z => target >= z.min && target <= z.max) || zones[0]
  return { maxHR, restingHR, hrReserve, target, zones, currentZone, karvonenTarget: karvonen, hrrTarget, intensity, method }
}

export function calculateBoneDensityRisk(age: number, gender: 'male' | 'female', bmi: number, smokingYears: number, alcoholDrinksPerWeek: number, familyHistory: boolean, corticosteroidUse: boolean, calciumIntake: number) {
  let score = 0
  if (age > 65) score += 3; else if (age > 50) score += 2; else if (age > 35) score += 1
  if (gender === 'female') score += 2
  if (bmi < 18.5) score += 2; else if (bmi < 21) score += 1
  if (smokingYears > 10) score += 2; else if (smokingYears > 0) score += 1
  if (alcoholDrinksPerWeek > 14) score += 2; else if (alcoholDrinksPerWeek > 7) score += 1
  if (familyHistory) score += 2
  if (corticosteroidUse) score += 2
  if (calciumIntake < 700) score += 2; else if (calciumIntake < 1000) score += 1
  const maxScore = 16
  const riskPct = Math.round((score / maxScore) * 100)
  let riskCategory: string, recommendation: string
  if (riskPct >= 70) { riskCategory = 'High'; recommendation = 'DEXA scan strongly recommended. Discuss bone-strengthening medication with physician.' }
  else if (riskPct >= 40) { riskCategory = 'Moderate'; recommendation = 'Consider DEXA scan. Optimize calcium (1200mg/day), vitamin D (2000 IU/day), and weight-bearing exercise.' }
  else { riskCategory = 'Low'; recommendation = 'Maintain calcium-rich diet, regular weight-bearing exercise, and limit alcohol/smoking.' }
  return { score, maxScore, riskPct, riskCategory, recommendation, calciumTarget: gender === 'female' && age > 50 ? 1200 : 1000, vitaminDTarget: 2000, topFactors: [familyHistory ? 'Family history of osteoporosis' : '', corticosteroidUse ? 'Corticosteroid use' : '', bmi < 18.5 ? 'Underweight BMI' : '', age > 65 ? 'Age > 65' : ''].filter(Boolean) }
}

export function calculateBoneMineralDensityScore(tScore: number, zScore: number, age: number, gender: 'male' | 'female', site: 'spine' | 'hip' | 'forearm') {
  let diagnosis: string, color: string, fracRisk10yr: number
  if (tScore >= -1.0) { diagnosis = 'Normal bone density'; color = '#22c55e'; fracRisk10yr = age < 50 ? 2 : 5 }
  else if (tScore >= -2.5) { diagnosis = 'Osteopenia (low bone mass)'; color = '#f59e0b'; fracRisk10yr = age < 60 ? 8 : 15 }
  else { diagnosis = 'Osteoporosis'; color = '#ef4444'; fracRisk10yr = age < 60 ? 18 : 30 }
  const ageExpected = tScore >= -1 ? 'Expected for age' : zScore < -2 ? 'Below expected for age — secondary cause likely' : 'Low but age-related'
  const treatmentThreshold = tScore <= -2.5 || (tScore <= -2.0 && fracRisk10yr >= 20)
  return { tScore, zScore, diagnosis, color, fracRisk10yr, ageExpected, treatmentThreshold, site, supplementation: tScore < -1 ? 'Calcium 1200mg + Vitamin D 2000IU daily' : 'Calcium 1000mg + Vitamin D 1000IU daily', exerciseRx: 'Weight-bearing exercise 30 min/day + resistance training 2×/week', fallPrevention: tScore < -2.5 }
}

export function calculateCaloricNeedsMifflin(weightKg: number, heightCm: number, age: number, gender: 'male' | 'female', activityMultiplier: number, goal: 'loss' | 'maintain' | 'gain', lossRate: number = 1) {
  const bmr = gender === 'male' ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5 : 10 * weightKg + 6.25 * heightCm - 5 * age - 161
  const tdee = Math.round(bmr * activityMultiplier)
  const lossAdjust = goal === 'loss' ? -(lossRate * 500) : goal === 'gain' ? 300 : 0
  const targetCalories = Math.round(tdee + lossAdjust)
  const proteinG = Math.round(weightKg * (goal === 'loss' ? 2.2 : 1.8))
  const fatG = Math.round(targetCalories * 0.25 / 9)
  const carbG = Math.round((targetCalories - proteinG * 4 - fatG * 9) / 4)
  const weeksToGoal = goal === 'loss' ? Math.round(10 / lossRate) : goal === 'gain' ? Math.round(10 / 0.5) : 0
  return { bmr: Math.round(bmr), tdee, targetCalories, deficit: tdee - targetCalories, macros: { protein: proteinG, fat: fatG, carbs: carbG }, lbsPerWeek: lossRate, weeksToGoal10lbs: weeksToGoal, minCalories: Math.round(bmr * 1.0) }
}

export function calculateCardiacOutputEstimate(heartRate: number, strokeVolumeMl: number, systolicBP: number, diastolicBP: number, age: number, gender: 'male' | 'female') {
  const cardiacOutput = (heartRate * strokeVolumeMl) / 1000 // L/min
  const cardiacIndex = gender === 'male' ? cardiacOutput / 1.9 : cardiacOutput / 1.7 // L/min/m²
  const mapBP = Math.round(diastolicBP + (systolicBP - diastolicBP) / 3)
  const svr = Math.round((mapBP / cardiacOutput) * 80) // dyn·s/cm⁵
  const heartWorkload = Math.round(systolicBP * heartRate / 100) // Rate-Pressure Product ÷ 100
  const normalCO = gender === 'male' ? [4.0, 8.0] : [3.5, 7.0]
  const status = cardiacOutput < normalCO[0] ? 'Low cardiac output' : cardiacOutput > normalCO[1] ? 'High cardiac output' : 'Normal cardiac output'
  const ageAdjSV = gender === 'male' ? 70 - (age - 30) * 0.3 : 60 - (age - 30) * 0.25
  return {
    cardiacOutput: Math.round(cardiacOutput * 10) / 10, cardiacIndex: Math.round(cardiacIndex * 10) / 10,
    mapBP, svr, heartWorkload, status,
    normalRange: `${normalCO[0]}–${normalCO[1]} L/min`, ageAdjStrokeVolume: Math.round(ageAdjSV),
    oxygenDelivery: Math.round(cardiacOutput * 200), // mL O2/min estimate
    color: status === 'Normal cardiac output' ? '#22c55e' : '#f97316'
  }
}

export function calculateChronicKidneyDiseaseProgression(eGFR: number, eGFRChange: number, proteinuria: number, systolicBP: number, diabetic: boolean, smokingStatus: boolean) {
  // eGFRChange = mL/min/1.73m² per year (negative = declining)
  const yearsToDialysis = eGFRChange < 0 ? Math.round(Math.max(0, (eGFR - 15) / Math.abs(eGFRChange))) : 999
  const kidneyRiskScore = Math.round(
    (eGFR < 30 ? 30 : eGFR < 45 ? 20 : eGFR < 60 ? 10 : 0) +
    (proteinuria > 300 ? 25 : proteinuria > 30 ? 15 : 0) +
    (systolicBP > 140 ? 15 : systolicBP > 130 ? 8 : 0) +
    (diabetic ? 15 : 0) + (smokingStatus ? 10 : 0) + (eGFRChange < -5 ? 20 : eGFRChange < -2 ? 10 : 0)
  )
  const riskCategory = kidneyRiskScore >= 60 ? 'Very High' : kidneyRiskScore >= 40 ? 'High' : kidneyRiskScore >= 20 ? 'Moderate' : 'Low'
  const color = kidneyRiskScore >= 60 ? '#dc2626' : kidneyRiskScore >= 40 ? '#ef4444' : kidneyRiskScore >= 20 ? '#f97316' : '#22c55e'
  const bpTarget = proteinuria > 30 || diabetic ? '< 130/80 mmHg' : '< 140/90 mmHg'
  return {
    eGFR, eGFRChange, kidneyRiskScore, riskCategory, color, yearsToDialysis: yearsToDialysis === 999 ? 'Stable/not declining' : `~${yearsToDialysis} years`,
    proteinuriaRisk: proteinuria > 300 ? 'Overt proteinuria — high progression risk' : proteinuria > 30 ? 'Microalbuminuria — moderate risk' : 'Normal',
    bpTarget, keyInterventions: ['ACE inhibitor or ARB if proteinuria present', 'BP control to target', 'Avoid NSAIDs and nephrotoxins', 'Dietary protein 0.8g/kg/day', 'Control diabetes if present', 'Smoking cessation']
  }
}

export function calculateCognitiveLoadScore(taskComplexity: number, workingMemoryDemand: number, timePresure: number, interruptions: number, multitaskingLevel: number, noiseLevel: number, hoursWithoutBreak: number) {
  const intrinsic = taskComplexity * 2 + workingMemoryDemand * 1.5
  const extraneous = noiseLevel * 1.2 + interruptions * 1.8 + multitaskingLevel * 2
  const germane = Math.max(0, 10 - taskComplexity) * 0.5 // learning load
  const timeLoad = Math.min(hoursWithoutBreak * 1.5, 15)
  const timePressureLoad = timePresure * 1.5
  const totalLoad = Math.round(Math.min(100, intrinsic + extraneous + germane + timeLoad + timePressureLoad))
  let status: string, color: string
  if (totalLoad >= 80) { status = 'Cognitive overload — errors likely'; color = '#dc2626' }
  else if (totalLoad >= 60) { status = 'High load — performance degrading'; color = '#ef4444' }
  else if (totalLoad >= 40) { status = 'Moderate load — manageable'; color = '#f59e0b' }
  else if (totalLoad >= 20) { status = 'Optimal challenge zone'; color = '#22c55e' }
  else { status = 'Under-stimulated — boredom risk'; color = '#84cc16' }
  const errorRisk = totalLoad >= 80 ? 'High error probability — take a break now' : totalLoad >= 60 ? 'Moderate error risk — limit critical decisions' : 'Low error risk'
  return { totalLoad, intrinsicLoad: Math.round(intrinsic), extraneousLoad: Math.round(extraneous), status, color, errorRisk, breakRecommendation: hoursWithoutBreak >= 1.5 ? 'Take a 5-minute break NOW — cognitive performance declining' : `Next break in ${Math.round(Math.max(0, 1.5 - hoursWithoutBreak) * 60)} minutes`, peakPerformanceWindow: totalLoad >= 30 && totalLoad <= 55 ? 'You are in the optimal performance zone' : 'Adjust load for peak performance' }
}

export function calculateDehydrationStatus(bodyWeightKg: number, fluidLostLiters: number, exerciseDurationMin: number, tempCelsius: number, sweatRateHigh: boolean) {
  const sweatRateLH = sweatRateHigh ? 1.5 : tempCelsius > 30 ? 1.2 : tempCelsius > 20 ? 0.8 : 0.6
  const exerciseFluidLoss = (exerciseDurationMin / 60) * sweatRateLH
  const totalFluidLoss = fluidLostLiters + exerciseFluidLoss
  const deficitPct = (totalFluidLoss / bodyWeightKg) * 100
  let status: string, color: string, symptoms: string[]
  if (deficitPct < 1) { status = 'Well hydrated'; color = '#22c55e'; symptoms = ['None'] }
  else if (deficitPct < 2) { status = 'Mild dehydration'; color = '#84cc16'; symptoms = ['Thirst', 'Slight headache'] }
  else if (deficitPct < 4) { status = 'Moderate dehydration'; color = '#f59e0b'; symptoms = ['Headache', 'Fatigue', '~10% performance drop'] }
  else if (deficitPct < 6) { status = 'Significant dehydration'; color = '#f97316'; symptoms = ['Dizziness', '~20-30% performance drop', 'Impaired cognition'] }
  else { status = 'Severe dehydration — medical risk'; color = '#ef4444'; symptoms = ['Rapid HR', 'Confusion', 'Medical attention needed'] }
  const rehydrationTarget = Math.round(totalFluidLoss * 1.5 * 1000) // ml (150% to account for urine losses)
  const rehydrationTime = Math.round(totalFluidLoss * 1.5 / 0.5) // minutes at 500ml/hour
  return { deficitPct: Math.round(deficitPct * 10) / 10, totalFluidLossL: Math.round(totalFluidLoss * 10) / 10, status, color, symptoms, rehydrationTargetMl: rehydrationTarget, rehydrationTimeMin: rehydrationTime, electrolyteNeeded: deficitPct > 2 || exerciseDurationMin > 60, sportsDrinkTip: exerciseDurationMin > 90 ? 'Use electrolyte drink — plain water insufficient for prolonged exercise' : 'Water is adequate for this duration' }
}

export function calculateDietQualityScore(vegetables: number, fruits: number, wholegrains: number, legumes: number, nuts: number, fish: number, processedMeat: number, redMeat: number, addedSugar: number, ultraProcessed: number, alcohol: number, dairy: number) {
  let score = 0
  // Positive components (max 70)
  score += Math.min(vegetables * 8, 15)     // ≥2 servings = full points
  score += Math.min(fruits * 8, 10)
  score += Math.min(wholegrains * 5, 10)
  score += Math.min(legumes * 7, 8)
  score += Math.min(nuts * 6, 7)
  score += Math.min(fish * 5, 10)
  score += Math.min(dairy * 3, 5)
  // Negative components
  score -= Math.min(processedMeat * 5, 15)
  score -= Math.min(redMeat * 2, 8)
  score -= Math.min(addedSugar * 3, 12)
  score -= Math.min(ultraProcessed * 4, 20)
  score -= Math.min(Math.max(0, alcohol - 1) * 3, 10)
  const dietScore = Math.round(Math.max(0, Math.min(100, score + 40)))
  let category: string, color: string
  if (dietScore >= 80) { category = 'Excellent diet quality'; color = '#22c55e' }
  else if (dietScore >= 65) { category = 'Good diet quality'; color = '#84cc16' }
  else if (dietScore >= 50) { category = 'Fair — room to improve'; color = '#eab308' }
  else if (dietScore >= 35) { category = 'Poor diet quality'; color = '#f97316' }
  else { category = 'Very poor — major risk'; color = '#ef4444' }
  const topImprovement = ultraProcessed > 3 ? 'Reduce ultra-processed foods' : vegetables < 2 ? 'Eat 2+ vegetable servings daily' : addedSugar > 2 ? 'Cut added sugar' : processedMeat > 1 ? 'Reduce processed meat' : 'Add more legumes/nuts'
  return { dietScore, category, color, topImprovement, mediterraneanSimilarity: Math.round((dietScore / 100) * 100), cancerRiskReduction: dietScore >= 70 ? '~30% lower diet-related cancer risk' : dietScore >= 50 ? '~15% lower risk' : 'Elevated diet-related cancer risk' }
}

export function calculateDietaryInflammatoryIndex(redMeatServings: number, processedMeatServings: number, sugarDrinksPerDay: number, vegetableServings: number, fruitServings: number, fishServings: number, wholeGrainServings: number, alcoholDrinksPerWeek: number, turmericUse: boolean, omega3Supplement: boolean) {
  let dii = 0
  dii += redMeatServings * 0.3
  dii += processedMeatServings * 0.5
  dii += sugarDrinksPerDay * 0.4
  dii -= vegetableServings * 0.3
  dii -= fruitServings * 0.2
  dii -= fishServings * 0.4
  dii -= wholeGrainServings * 0.25
  dii += Math.max(0, alcoholDrinksPerWeek - 7) * 0.1
  if (turmericUse) dii -= 0.8
  if (omega3Supplement) dii -= 0.5
  const score = Math.round(dii * 10) / 10
  let category: string, color: string
  if (score >= 2) { category = 'Pro-inflammatory'; color = '#dc2626' }
  else if (score >= 0.5) { category = 'Mildly inflammatory'; color = '#f97316' }
  else if (score >= -0.5) { category = 'Neutral'; color = '#eab308' }
  else if (score >= -2) { category = 'Anti-inflammatory'; color = '#22c55e' }
  else { category = 'Strongly anti-inflammatory'; color = '#10b981' }
  return { score, category, color, topImprovement: processedMeatServings > 1 ? 'Reduce processed meat' : sugarDrinksPerDay > 1 ? 'Cut sugary drinks' : vegetableServings < 4 ? 'Add more vegetables' : 'Add turmeric/omega-3', crpEstimate: score > 1 ? 'Likely elevated CRP (>2 mg/L)' : score > 0 ? 'Borderline CRP' : 'CRP likely in healthy range', diseaseRisk: score > 1.5 ? 'Higher risk for T2D, CVD, certain cancers' : 'Reduced chronic disease risk' }
}

export function calculateEMFExposureScore(wifiHoursPerDay: number, phoneCallHoursPerDay: number, distanceFromRouter: number, sleepsNearPhone: boolean, useWiredEarphones: boolean, smartMeterDistance: number, microwaveUsePerDay: number) {
  // Educational tool based on published RF exposure limits and distance-based reduction
  const phoneScore = (phoneCallHoursPerDay > 2 ? 3 : phoneCallHoursPerDay > 1 ? 2 : 1) * (useWiredEarphones ? 0.3 : 1)
  const wifiScore = (wifiHoursPerDay * 0.5) * (distanceFromRouter < 1 ? 2 : distanceFromRouter < 3 ? 1 : 0.5)
  const sleepScore = sleepsNearPhone ? 3 : 0
  const meterScore = smartMeterDistance < 1 ? 2 : smartMeterDistance < 3 ? 1 : 0
  const micScore = microwaveUsePerDay * 0.3
  const total = Math.min(100, Math.round((phoneScore + wifiScore + sleepScore + meterScore + micScore) * 5))
  const reduceTips = ['Keep phone 12+ inches from body during calls (use speakerphone or wired earbuds)', 'Move phone/router 6+ feet from sleeping area', 'Prefer wired ethernet over Wi-Fi when stationary', sleepsNearPhone ? 'Move phone to another room at night — reduces exposure ~90%' : '', distanceFromRouter < 1 ? 'Move router 6+ feet away — EMF drops with square of distance' : ''].filter(Boolean)
  return { exposureScore: total, status: total >= 70 ? 'High relative exposure' : total >= 40 ? 'Moderate exposure' : 'Low exposure', color: total >= 70 ? '#f97316' : total >= 40 ? '#eab308' : '#22c55e', note: 'Current evidence does not confirm health harm at typical consumer RF levels. This tool reflects relative exposure based on WHO and ICNIRP guidelines.', reduceTips, biggestSource: phoneCallHoursPerDay > 1 && !useWiredEarphones ? 'Mobile phone calls (direct tissue contact)' : sleepsNearPhone ? 'Phone near sleeping area (8hrs exposure)' : 'Wi-Fi router proximity' }
}

export function calculateErectileDysfunctionRisk(age: number, bmi: number, smokingYears: number, diabetic: boolean, hypertension: boolean, cardiovascularDisease: boolean, physicalActivityMinPerWeek: number, alcoholDrinksPerWeek: number, depressionAnxiety: boolean) {
  let score = 0
  if (age >= 70) score += 4; else if (age >= 60) score += 3; else if (age >= 50) score += 2; else if (age >= 40) score += 1
  if (bmi >= 35) score += 3; else if (bmi >= 30) score += 2; else if (bmi >= 27) score += 1
  if (smokingYears > 20) score += 3; else if (smokingYears > 5) score += 2; else if (smokingYears > 0) score += 1
  if (diabetic) score += 3
  if (hypertension) score += 2
  if (cardiovascularDisease) score += 3
  if (physicalActivityMinPerWeek < 75) score += 2; else if (physicalActivityMinPerWeek < 150) score += 1
  if (alcoholDrinksPerWeek > 21) score += 2; else if (alcoholDrinksPerWeek > 14) score += 1
  if (depressionAnxiety) score += 2
  const maxScore = 23
  const riskPct = Math.round((score / maxScore) * 100)
  let riskLevel: string, note: string
  if (riskPct >= 65) { riskLevel = 'High'; note = 'Multiple major risk factors — consult a urologist or primary care physician' }
  else if (riskPct >= 35) { riskLevel = 'Moderate'; note = 'Modifiable risk factors present — lifestyle changes can significantly reduce risk' }
  else { riskLevel = 'Low'; note = 'Few major risk factors — maintain healthy lifestyle to preserve function' }
  return { score, maxScore, riskPct, riskLevel, mostModifiable: diabetic ? 'Blood sugar control' : bmi >= 30 ? 'Weight loss' : smokingYears > 0 ? 'Smoking cessation' : physicalActivityMinPerWeek < 150 ? 'Increase exercise' : 'Alcohol moderation', note, physicalActivityTarget: 150 }
}

export function calculateExerciseAddictionRisk(workoutsPerWeek: number, restDayGuilt: number, missedSessionAnxiety: number, exerciseOverInjury: boolean, socialSacrifice: number, identityTiedToExercise: number, exerciseForControl: number, unableToReduce: boolean) {
  const eaiScore = restDayGuilt + missedSessionAnxiety + socialSacrifice + identityTiedToExercise + exerciseForControl + (exerciseOverInjury ? 5 : 0) + (unableToReduce ? 5 : 0) + Math.min(workoutsPerWeek > 7 ? 5 : workoutsPerWeek > 6 ? 3 : 1, 5)
  const maxScore = 40
  const riskPct = Math.round((eaiScore / maxScore) * 100)
  let category: string, color: string
  if (riskPct >= 70) { category = 'High addiction risk — recommend professional support'; color = '#ef4444' }
  else if (riskPct >= 45) { category = 'Moderate risk — concerning patterns'; color = '#f97316' }
  else if (riskPct >= 25) { category = 'Low-moderate — monitor'; color = '#eab308' }
  else { category = 'Healthy relationship with exercise'; color = '#22c55e' }
  const distinguisher = exerciseOverInjury || unableToReduce ? 'Primary exercise addiction markers present' : socialSacrifice >= 4 ? 'Significant social impact noted' : 'Behaviours within manageable range'
  return { eaiScore, maxScore, riskPct, category, color, distinguisher, recommendations: riskPct >= 45 ? ['Speak with a sports psychologist or therapist', 'Explore identity outside athletic performance', 'Practice scheduled rest days as part of training', 'Address underlying anxiety or control needs'] : ['Maintain your current balanced approach', 'Ensure at least 1-2 full rest days per week', 'Keep exercise in perspective with other life values'] }
}

export function calculateFoodSensitivityLoad(glutenScore: number, dairyScore: number, eggsScore: number, soyScore: number, nutsScore: number, symptoms: string[], eliminatedFoods: string[], reactionSeverity: number) {
  const totalLoad = glutenScore + dairyScore + eggsScore + soyScore + nutsScore
  const avgLoad = totalLoad / 5
  const elimCount = eliminatedFoods.length
  const symptomBurden = symptoms.length * reactionSeverity
  const overallBurden = Math.round(Math.min(100, avgLoad * 10 + symptomBurden * 2))
  let category: string, color: string
  if (overallBurden >= 70) { category = 'High sensitivity burden — consider food elimination trial'; color = '#ef4444' }
  else if (overallBurden >= 45) { category = 'Moderate — track and identify triggers'; color = '#f97316' }
  else if (overallBurden >= 20) { category = 'Mild sensitivity patterns'; color = '#eab308' }
  else { category = 'Low sensitivity burden'; color = '#22c55e' }
  const topSensitivity = [{ food: 'Gluten', score: glutenScore }, { food: 'Dairy', score: dairyScore }, { food: 'Eggs', score: eggsScore }, { food: 'Soy', score: soyScore }, { food: 'Nuts', score: nutsScore }].sort((a, b) => b.score - a.score)[0]
  return { overallBurden, category, color, topSensitivity: topSensitivity.food, symptomCount: symptoms.length, eliminatedFoods: elimCount, testing: overallBurden >= 45 ? 'Consider IgG food sensitivity panel or supervised elimination diet' : 'Keep a food-symptom diary for 2-4 weeks first', nutritionRisk: elimCount >= 3 ? 'Multiple eliminations — consult dietitian to prevent nutritional gaps' : 'Nutritional risk low' }
}

export function calculateFrailtyIndex(age: number, unintendedWeightLoss: boolean, exhaustion: number, walkSpeedSlow: boolean, weakGripStrength: boolean, lowPhysicalActivity: boolean) {
  const deficits = [unintendedWeightLoss, exhaustion >= 3, walkSpeedSlow, weakGripStrength, lowPhysicalActivity]
  const count = deficits.filter(Boolean).length
  let category: string, color: string, risk: string
  if (count === 0) { category = 'Robust / Non-frail'; color = '#22c55e'; risk = 'Minimal frailty risk' }
  else if (count === 1 || count === 2) { category = 'Pre-frail'; color = '#f59e0b'; risk = 'Elevated risk — intervention can reverse pre-frailty' }
  else { category = 'Frail'; color = '#ef4444'; risk = 'Frailty syndrome present — medical evaluation recommended' }
  const fallRiskMultiplier = count >= 3 ? 3 : count >= 1 ? 1.8 : 1
  const hospitalizationRisk = count >= 3 ? 'High (3-4× population rate)' : count >= 1 ? 'Moderate (1.5-2×)' : 'Low'
  return { criteriaCount: count, totalCriteria: 5, category, color, risk, fallRiskMultiplier, hospitalizationRisk, interventions: ['Progressive resistance training 2-3×/week', 'Protein intake ≥1.2 g/kg/day', 'Balance and gait training', 'Vitamin D supplementation (if deficient)', 'Social engagement and cognitive stimulation'] }
}

export function calculateGeneticHeightPotential(fatherHeightCm: number, motherHeightCm: number, currentHeightCm: number, currentAgeYears: number, gender: 'male' | 'female', nutritionAdequate: boolean, chronicIllness: boolean) {
  const midParentalMale = (fatherHeightCm + motherHeightCm + 13) / 2
  const midParentalFemale = (fatherHeightCm + motherHeightCm - 13) / 2
  const targetHeight = gender === 'male' ? midParentalMale : midParentalFemale
  const range = { min: Math.round(targetHeight - 8.5), max: Math.round(targetHeight + 8.5) }
  const growthComplete = (gender === 'male' && currentAgeYears >= 18) || (gender === 'female' && currentAgeYears >= 16)
  const remainingGrowth = growthComplete ? 0 : Math.max(0, Math.round(targetHeight - currentHeightCm))
  const modifiers = [!nutritionAdequate ? '⚠️ Poor nutrition may reduce growth potential by 2-5 cm' : '', chronicIllness ? '⚠️ Chronic illness can impair growth velocity' : ''].filter(Boolean)
  const heightPercentileEst = Math.min(99, Math.max(1, Math.round(50 + (currentHeightCm - (gender === 'male' ? 175 : 162)) * 3)))
  return { targetHeight: Math.round(targetHeight), rangeMin: range.min, rangeMax: range.max, currentHeightCm, remainingGrowthCm: remainingGrowth, growthComplete, heightPercentileEst, modifiers, note: 'Mid-parental height calculation (Tanner method) — genetic potential only. Environment (nutrition, sleep, illness) accounts for ~20% of height variation.' }
}

export function calculateGlomerularFiltrationRate(creatinine: number, age: number, gender: 'male' | 'female', raceBlack: boolean, unit: 'mg/dL' | 'μmol/L' = 'mg/dL') {
  const cr = unit === 'μmol/L' ? creatinine / 88.4 : creatinine
  const kappa = gender === 'female' ? 0.7 : 0.9
  const alpha = gender === 'female' ? -0.241 : -0.302
  const sexFactor = gender === 'female' ? 1.012 : 1
  const raceFactor = raceBlack ? 1.159 : 1
  const crKappa = cr / kappa
  const egfr = 142 * Math.pow(Math.min(crKappa, 1), alpha) * Math.pow(Math.max(crKappa, 1), -1.200) * Math.pow(0.9938, age) * sexFactor * raceFactor
  const egfrRounded = Math.round(egfr)
  let stage: string, color: string, desc: string
  if (egfrRounded >= 90) { stage = 'G1 — Normal'; color = '#22c55e'; desc = 'Normal kidney function' }
  else if (egfrRounded >= 60) { stage = 'G2 — Mildly decreased'; color = '#84cc16'; desc = 'Mild reduction — monitor annually' }
  else if (egfrRounded >= 45) { stage = 'G3a — Mild-moderate'; color = '#eab308'; desc = 'Moderate CKD — refer to nephrologist if progressing' }
  else if (egfrRounded >= 30) { stage = 'G3b — Moderate-severe'; color = '#f97316'; desc = 'Significant CKD — nephrologist recommended' }
  else if (egfrRounded >= 15) { stage = 'G4 — Severe'; color = '#ef4444'; desc = 'Prepare for renal replacement therapy' }
  else { stage = 'G5 — Kidney Failure'; color = '#dc2626'; desc = 'Dialysis or transplant planning required' }
  return { egfr: egfrRounded, stage, color, desc, creatinine: Math.round(cr * 100) / 100, unit: 'mL/min/1.73m²', proteinRestriction: egfrRounded < 30 ? '0.6-0.8 g/kg/day' : 'No restriction', fluidTarget: egfrRounded < 30 ? 'Restrict per nephrologist guidance' : '2-2.5L/day' }
}

export function calculateHandGripStrengthAge(measuredGrip: number, age: number, gender: 'male' | 'female', unit: 'kg' | 'lbs' = 'lbs') {
  const gripKg = unit === 'lbs' ? measuredGrip / 2.205 : measuredGrip
  const norms: Record<string, Record<string, [number, number]>> = {
    male: { '20-29': [54.0, 7.0], '30-39': [52.0, 7.5], '40-49': [49.5, 7.8], '50-59': [46.0, 8.5], '60-69': [39.0, 9.0], '70+': [32.5, 9.5] },
    female: { '20-29': [34.0, 5.5], '30-39': [32.5, 5.8], '40-49': [30.5, 6.0], '50-59': [27.5, 6.5], '60-69': [23.5, 7.0], '70+': [20.0, 7.5] }
  }
  const ageKey = age < 30 ? '20-29' : age < 40 ? '30-39' : age < 50 ? '40-49' : age < 60 ? '50-59' : age < 70 ? '60-69' : '70+'
  const [mean, sd] = norms[gender][ageKey]
  const zScore = (gripKg - mean) / sd
  const percentile = Math.min(99, Math.max(1, Math.round(50 + zScore * 34)))
  let category: string, color: string
  if (zScore >= 1) { category = 'Above Average'; color = '#22c55e' }
  else if (zScore >= -0.5) { category = 'Average'; color = '#84cc16' }
  else if (zScore >= -1.5) { category = 'Below Average'; color = '#f59e0b' }
  else { category = 'Low — Sarcopenia risk'; color = '#ef4444' }
  const mortalityNote = gripKg < (gender === 'male' ? 26 : 16) ? '⚠️ Below clinical low threshold — associated with 2× higher mortality risk' : 'Above clinical low threshold for mortality risk'
  return { gripKg: Math.round(gripKg * 10) / 10, gripLbs: Math.round(gripKg * 2.205 * 10) / 10, percentile, category, color, meanForAge: mean, zScore: Math.round(zScore * 10) / 10, mortalityNote, targetKg: mean, ageGroup: ageKey }
}

export function calculateHeartRateVariability(averageRMSSD: number, age: number, gender: 'male' | 'female', restingHR: number, trainingLoad: string) {
  const ageFactor = Math.max(0.5, 1 - (age - 25) * 0.008)
  const expectedRMSSD = gender === 'male' ? 42 * ageFactor : 38 * ageFactor
  const hrScore = Math.round((averageRMSSD / expectedRMSSD) * 100)
  const autonomicBalance = averageRMSSD > 50 ? 'Good vagal tone — parasympathetic dominant' : averageRMSSD > 30 ? 'Moderate — balanced ANS' : 'Low — sympathetic dominant / high stress'
  const recoveryStatus = trainingLoad === 'high' && averageRMSSD < expectedRMSSD * 0.8 ? 'Under-recovered — consider rest day' : trainingLoad === 'high' && averageRMSSD >= expectedRMSSD ? 'Well adapted to training load' : averageRMSSD < 20 ? 'Poor recovery — high physiological stress' : 'Adequate recovery'
  let readinessScore: number, readinessColor: string
  if (hrScore >= 110) { readinessScore = 95; readinessColor = '#22c55e' }
  else if (hrScore >= 90) { readinessScore = 80; readinessColor = '#84cc16' }
  else if (hrScore >= 70) { readinessScore = 60; readinessColor = '#eab308' }
  else if (hrScore >= 50) { readinessScore = 40; readinessColor = '#f97316' }
  else { readinessScore = 20; readinessColor = '#ef4444' }
  return { averageRMSSD, expectedRMSSD: Math.round(expectedRMSSD), hrScore, readinessScore, readinessColor, autonomicBalance, recoveryStatus, restingHR, interpretation: hrScore >= 90 ? 'Excellent HRV for your age' : hrScore >= 70 ? 'Good — moderate fitness' : 'Low HRV — prioritize recovery, sleep, and stress reduction', stressIndicator: averageRMSSD < 20 ? 'High physiological stress detected' : 'Stress within manageable range' }
}

export function calculateHydrationForExercise(bodyWeightKg: number, exerciseDurationMin: number, intensityLevel: number, temperatureCelsius: number, altitudeFt: number, exerciseType: 'cardio' | 'strength' | 'outdoor') {
  const baseSweatRate = 0.5 + (intensityLevel / 10) * 1.5 // L/hr base
  const heatFactor = temperatureCelsius > 30 ? 1.4 : temperatureCelsius > 20 ? 1.15 : 1.0
  const altitudeFactor = altitudeFt > 8000 ? 1.2 : 1.0
  const typeFactor = exerciseType === 'outdoor' ? 1.1 : exerciseType === 'cardio' ? 1.0 : 0.7
  const sweatRateLH = Math.round(baseSweatRate * heatFactor * altitudeFactor * typeFactor * 10) / 10
  const totalFluidNeedL = Math.round(sweatRateLH * (exerciseDurationMin / 60) * 10) / 10
  const preDrinkMl = 400
  const duringDrinkMl = Math.round((totalFluidNeedL * 1000 - preDrinkMl) * 0.7) // 70% during, 30% after
  const afterDrinkMl = Math.round(totalFluidNeedL * 1000 * 0.3 * 1.5) // 150% post
  const electrolytesNeeded = exerciseDurationMin > 60 || temperatureCelsius > 28
  const sodiumMg = electrolytesNeeded ? Math.round(sweatRateLH * exerciseDurationMin / 60 * 900) : 0 // ~900mg/L sweat
  return { sweatRateLH, totalFluidNeedL, preDrinkMl, duringDrinkMl, afterDrinkMl, electrolytesNeeded, sodiumMg, drinkInterval: `Every ${Math.round(15 / sweatRateLH)} minutes`, perBottle: `${Math.round(duringDrinkMl / (exerciseDurationMin / 15))} mL per 15 min`, color: totalFluidNeedL > 2 ? '#f97316' : totalFluidNeedL > 1 ? '#eab308' : '#22c55e' }
}

export function calculateImmuneStrengthScore(sleepHours: number, stressLevel: number, exerciseMinPerWeek: number, fruitVegServings: number, alcoholPerWeek: number, smokingStatus: boolean, bmi: number, age: number, chronicConditions: number, supplementsScore: number) {
  let score = 50
  score += sleepHours >= 8 ? 10 : sleepHours >= 7 ? 5 : sleepHours < 6 ? -15 : 0
  score -= stressLevel * 2
  score += Math.min(exerciseMinPerWeek / 30, 10)
  score += Math.min(fruitVegServings * 3, 12)
  score -= Math.min(alcoholPerWeek * 1.5, 12)
  score -= smokingStatus ? 15 : 0
  score += bmi >= 18.5 && bmi <= 24.9 ? 8 : bmi > 30 ? -10 : 0
  score -= Math.min(chronAge(age), 10)
  score -= chronicConditions * 5
  score += Math.min(supplementsScore, 8)
  const immuneScore = Math.min(100, Math.max(0, Math.round(score)))
  let status: string, color: string
  if (immuneScore >= 80) { status = 'Strong immune function'; color = '#22c55e' }
  else if (immuneScore >= 60) { status = 'Good — minor vulnerabilities'; color = '#84cc16' }
  else if (immuneScore >= 40) { status = 'Moderate — several weak points'; color = '#eab308' }
  else if (immuneScore >= 20) { status = 'Low — high infection susceptibility'; color = '#f97316' }
  else { status = 'Very poor immune resilience'; color = '#ef4444' }
  const topImpact = sleepHours < 7 ? 'Sleep deprivation (single biggest immune suppressor)' : smokingStatus ? 'Smoking — damages mucosal immune barriers' : stressLevel > 6 ? 'Chronic stress — elevates immunosuppressive cortisol' : bmi > 30 ? 'Obesity — impairs T-cell and NK-cell function' : fruitVegServings < 3 ? 'Low fruit/vegetable intake'  : 'Maintain your current immune-supportive habits'
  return { immuneScore, status, color, topImpact, sickDaysEstimate: immuneScore >= 70 ? '1-2 colds/year (average)' : immuneScore >= 50 ? '3-4 infections/year' : '5+ infections/year', vaccinationNote: 'Vaccination remains the most effective immune defence — this score assesses lifestyle immune support only' }
}

export function calculateJointMobilityScore(shoulderAbduction: number, hipFlexion: number, ankleDorsiflexion: number, neckRotation: number, thoracicRotation: number, wristExtension: number, age: number) {
  const norms = { shoulder: 180, hip: 120, ankle: 20, neck: 80, thoracic: 45, wrist: 70 }
  const scores = {
    shoulder: Math.round((shoulderAbduction / norms.shoulder) * 100),
    hip: Math.round((hipFlexion / norms.hip) * 100),
    ankle: Math.round((ankleDorsiflexion / norms.ankle) * 100),
    neck: Math.round((neckRotation / norms.neck) * 100),
    thoracic: Math.round((thoracicRotation / norms.thoracic) * 100),
    wrist: Math.round((wristExtension / norms.wrist) * 100),
  }
  const avgScore = Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / 6)
  const ageAdj = age > 60 ? avgScore + 10 : age > 45 ? avgScore + 5 : avgScore
  const tightestJoint = Object.entries(scores).sort(([, a], [, b]) => a - b)[0]
  let category: string, color: string
  if (ageAdj >= 90) { category = 'Excellent mobility'; color = '#22c55e' }
  else if (ageAdj >= 75) { category = 'Good mobility'; color = '#84cc16' }
  else if (ageAdj >= 60) { category = 'Moderate — targeted stretching recommended'; color = '#eab308' }
  else { category = 'Poor mobility — physiotherapy may help'; color = '#ef4444' }
  return { scores, avgScore, ageAdjustedScore: ageAdj, category, color, tightestJoint: tightestJoint[0], tightestScore: tightestJoint[1], injuryRisk: avgScore < 60 ? 'Elevated injury risk due to restricted range of motion' : 'Injury risk within normal range', stretchPriority: `Focus on ${tightestJoint[0]} mobility — 3×30s daily stretch` }
}

export function calculateLongevityRiskIndex(age: number, gender: 'male' | 'female', bmi: number, systolicBP: number, smokingYears: number, exerciseHrsPerWeek: number, sleepHoursNightly: number, vegetableServings: number, alcoholPerWeek: number, familyHistoryEarlyDeath: boolean, chronicDiseases: number, stressLevel: number, socialConnection: number) {
  const baseLE = gender === 'male' ? 76 : 81
  let leAdjust = 0
  leAdjust += bmi >= 18.5 && bmi <= 24.9 ? 2 : bmi > 35 ? -5 : bmi > 30 ? -2 : -1
  leAdjust += systolicBP < 120 ? 2 : systolicBP < 130 ? 0 : systolicBP < 140 ? -1 : systolicBP < 160 ? -3 : -5
  leAdjust -= smokingYears > 30 ? 10 : smokingYears > 20 ? 7 : smokingYears > 10 ? 4 : smokingYears > 0 ? 2 : 0
  leAdjust += Math.min(exerciseHrsPerWeek * 0.5, 4)
  leAdjust += sleepHoursNightly >= 7 && sleepHoursNightly <= 9 ? 2 : sleepHoursNightly < 6 ? -2 : 0
  leAdjust += Math.min(vegetableServings * 0.3, 2)
  leAdjust -= alcoholPerWeek > 21 ? 3 : alcoholPerWeek > 14 ? 1 : 0
  leAdjust -= familyHistoryEarlyDeath ? 2 : 0
  leAdjust -= chronicDiseases * 1.5
  leAdjust -= stressLevel > 7 ? 2 : stressLevel > 5 ? 1 : 0
  leAdjust += socialConnection >= 7 ? 2 : socialConnection < 4 ? -2 : 0
  const projectedLE = Math.round(baseLE + leAdjust)
  const yearsRemaining = Math.max(0, projectedLE - age)
  const healthyYears = Math.round(yearsRemaining * (bmi < 30 && chronicDiseases < 2 ? 0.85 : 0.70))
  const longevityScore = Math.min(100, Math.max(0, Math.round(((projectedLE - 55) / 45) * 100)))
  return { projectedLE, yearsRemaining, healthyYears, longevityScore, baseLE, leAdjust: Math.round(leAdjust), topGains: [smokingYears > 0 ? 'Quit smoking (+4-10 yrs)' : '', exerciseHrsPerWeek < 3 ? 'Exercise 3+ hrs/week (+2-4 yrs)' : '', systolicBP > 130 ? 'Control blood pressure (+1-3 yrs)' : '', bmi > 30 ? 'Achieve healthy BMI (+1-3 yrs)' : '', sleepHoursNightly < 7 ? 'Get 7-9 hours sleep (+1-2 yrs)' : ''].filter(Boolean).slice(0, 3), color: projectedLE >= 85 ? '#22c55e' : projectedLE >= 75 ? '#84cc16' : projectedLE >= 65 ? '#eab308' : '#ef4444' }
}

export function calculateLungCapacity(age: number, gender: 'male' | 'female', heightCm: number, measuredFVC: number, measuredFEV1: number, smokingPackYears: number) {
  const predictedFVC = gender === 'male' ? -4.342 + 0.0533 * heightCm - 0.027 * age : -2.852 + 0.04 * heightCm - 0.025 * age
  const predictedFEV1 = gender === 'male' ? -3.259 + 0.042 * heightCm - 0.032 * age : -1.932 + 0.030 * heightCm - 0.025 * age
  const fvcPct = Math.round((measuredFVC / predictedFVC) * 100)
  const fev1Pct = Math.round((measuredFEV1 / predictedFEV1) * 100)
  const fev1FvcRatio = Math.round((measuredFEV1 / measuredFVC) * 100)
  let pattern: string, severity: string, color: string
  if (fev1FvcRatio < 70 && fev1Pct < 80) {
    pattern = 'Obstructive pattern (COPD/Asthma possible)'
    severity = fev1Pct >= 70 ? 'Mild' : fev1Pct >= 50 ? 'Moderate' : 'Severe'
    color = '#ef4444'
  } else if (fvcPct < 80 && fev1FvcRatio >= 70) {
    pattern = 'Restrictive pattern'
    severity = fvcPct >= 70 ? 'Mild' : 'Moderate'
    color = '#f97316'
  } else {
    pattern = 'Normal spirometry pattern'
    severity = 'Normal'
    color = '#22c55e'
  }
  const copd_risk = smokingPackYears > 20 && age > 40 ? 'High COPD risk — spirometry recommended' : smokingPackYears > 10 ? 'Moderate smoking history' : 'Low smoking-related risk'
  return { predictedFVC: Math.round(predictedFVC * 100) / 100, measuredFVC, fvcPct, predictedFEV1: Math.round(predictedFEV1 * 100) / 100, measuredFEV1, fev1Pct, fev1FvcRatio, pattern, severity, color, copd_risk, packYears: smokingPackYears }
}

export function calculateMenstrualHealthScore(cycleLength: number, periodLength: number, painLevel: number, flowHeaviness: number, irregularity: number, pmsSymptoms: number, moodChanges: number, energyDrop: number) {
  let score = 100
  score -= cycleLength < 21 ? 15 : cycleLength > 35 ? 10 : 0
  score -= periodLength < 2 ? 10 : periodLength > 7 ? 10 : 0
  score -= painLevel * 5
  score -= flowHeaviness > 7 ? 15 : flowHeaviness > 5 ? 8 : 0
  score -= irregularity * 8
  score -= pmsSymptoms * 4
  score -= moodChanges * 3
  score -= energyDrop * 2
  const healthScore = Math.max(0, Math.round(score))
  let category: string, color: string
  if (healthScore >= 80) { category = 'Healthy cycle'; color = '#22c55e' }
  else if (healthScore >= 60) { category = 'Minor irregularities'; color = '#84cc16' }
  else if (healthScore >= 40) { category = 'Moderate concerns'; color = '#eab308' }
  else if (healthScore >= 20) { category = 'Significant issues — see gynaecologist'; color = '#ef4444' }
  else { category = 'Severe dysfunction — urgent review needed'; color = '#dc2626' }
  const redFlags = [painLevel >= 8 ? '⚠️ Severe pain may indicate endometriosis' : '', flowHeaviness > 8 ? '⚠️ Heavy bleeding — risk of anaemia' : '', cycleLength < 21 || cycleLength > 35 ? '⚠️ Irregular cycle length' : '', irregularity >= 3 ? '⚠️ Unpredictable cycles — evaluate for PCOS/thyroid' : ''].filter(Boolean)
  return { healthScore, category, color, cycleLength, periodLength, redFlags, ironRisk: flowHeaviness > 7 ? 'Check ferritin level — heavy flow raises anaemia risk' : 'Iron level likely normal', investigations: healthScore < 50 ? ['Pelvic ultrasound', 'Full blood count (FBC)', 'Thyroid panel', 'FSH/LH/oestradiol'] : [] }
}

export function calculateMentalFatigueScore(hoursOfWork: number, sleepHoursLast7Days: number, stressLevel: number, screenTimeHours: number, exerciseMinPerWeek: number, socialInteractionHours: number, mindfulnessMins: number) {
  const sleepAvg = sleepHoursLast7Days / 7
  let score = 0
  score += Math.max(0, hoursOfWork - 8) * 1.5
  score += Math.max(0, 7 - sleepAvg) * 3
  score += stressLevel * 2
  score += Math.max(0, screenTimeHours - 6) * 0.8
  score -= Math.min(exerciseMinPerWeek / 30, 5)
  score -= Math.min(socialInteractionHours, 3) * 0.5
  score -= Math.min(mindfulnessMins / 10, 3)
  const fatigue = Math.max(0, Math.min(100, Math.round(score * 3)))
  let level: string, color: string
  if (fatigue >= 80) { level = 'Severe mental fatigue'; color = '#dc2626' }
  else if (fatigue >= 60) { level = 'High fatigue — burnout risk'; color = '#ef4444' }
  else if (fatigue >= 40) { level = 'Moderate fatigue'; color = '#f97316' }
  else if (fatigue >= 20) { level = 'Low-moderate fatigue'; color = '#eab308' }
  else { level = 'Well-rested'; color = '#22c55e' }
  const topDrains = [hoursOfWork > 10 ? 'Overwork (>10 hrs/day)' : '', sleepAvg < 7 ? `Sleep deficit (${sleepAvg.toFixed(1)} hrs avg)` : '', stressLevel > 6 ? 'High stress level' : '', screenTimeHours > 8 ? 'Excessive screen time' : ''].filter(Boolean)
  return { fatigue, level, color, sleepAvg: Math.round(sleepAvg * 10) / 10, topDrains, recoveryTips: ['Sleep 7-9 hours consistently', 'Take 5-min breaks every 90 minutes', 'Limit screen time 2 hours before bed', 'Exercise ≥150 min/week', 'Practice 10-min daily mindfulness'] }
}

export function calculateMetabolicAge(bmi: number, restingHR: number, fitnessLevel: number, age: number, gender: 'male' | 'female', waistCm: number, heightCm: number) {
  const whr = waistCm / heightCm
  let metabolicAge = age
  const avgBMI = gender === 'male' ? 27.5 : 27.0
  metabolicAge += (bmi - avgBMI) * 0.8
  metabolicAge += (restingHR - 65) * 0.15
  metabolicAge -= (fitnessLevel - 5) * 1.2
  metabolicAge += (whr - 0.50) * 30
  const mAge = Math.round(Math.max(18, Math.min(90, metabolicAge)))
  const diff = mAge - age
  let assessment: string, color: string
  if (diff <= -5) { assessment = 'Excellent — metabolic age well below chronological'; color = '#22c55e' }
  else if (diff <= 0) { assessment = 'Good — metabolic age at or below chronological'; color = '#84cc16' }
  else if (diff <= 5) { assessment = 'Average — slight metabolic aging'; color = '#eab308' }
  else if (diff <= 10) { assessment = 'Below average — lifestyle improvements recommended'; color = '#f97316' }
  else { assessment = 'Poor — metabolic age significantly elevated'; color = '#ef4444' }
  return { metabolicAge: mAge, chronologicalAge: age, difference: diff, assessment, color, whr: Math.round(whr * 100) / 100, improvementAreas: [bmi > 25 ? 'Reduce BMI through diet and exercise' : '', restingHR > 70 ? 'Lower resting HR with cardio training' : '', fitnessLevel < 6 ? 'Improve fitness level with regular training' : '', whr > 0.50 ? 'Reduce waist circumference' : ''].filter(Boolean) }
}

export function calculateMigraineRisk(headachesPerMonth: number, age: number, gender: 'female' | 'male', familyHistory: boolean, caffeineMgPerDay: number, sleepHours: number, stressLevel: number, screenTimeHours: number, hormoneChanges: boolean) {
  let score = 0
  score += Math.min(headachesPerMonth * 2, 10)
  if (age >= 25 && age <= 55) score += 2
  if (gender === 'female') score += 3
  if (familyHistory) score += 3
  if (caffeineMgPerDay > 400) score += 2; else if (caffeineMgPerDay > 200) score += 1
  if (sleepHours < 6) score += 2; else if (sleepHours < 7) score += 1
  score += Math.min(stressLevel, 5)
  if (screenTimeHours > 8) score += 1
  if (hormoneChanges) score += 2
  const maxScore = 31
  const riskPct = Math.round((score / maxScore) * 100)
  let riskCategory: string, color: string
  if (riskPct >= 70) { riskCategory = 'High migraine burden'; color = '#dc2626' }
  else if (riskPct >= 40) { riskCategory = 'Moderate'; color = '#f97316' }
  else { riskCategory = 'Low-moderate'; color = '#22c55e' }
  const triggers = [caffeineMgPerDay > 400 ? 'High caffeine intake' : '', sleepHours < 7 ? 'Sleep deprivation' : '', stressLevel > 6 ? 'High stress' : '', screenTimeHours > 8 ? 'Extended screen time' : '', hormoneChanges ? 'Hormonal fluctuations' : ''].filter(Boolean)
  return { score, maxScore, riskPct, riskCategory, color, headachesPerMonth, triggers, preventionStrategies: ['Consistent sleep schedule (7-9 hrs)', 'Limit caffeine to < 200mg/day', 'Identify and avoid personal triggers', 'Consider magnesium supplementation (400mg/day)', 'Stress management (biofeedback, CBT)', 'Consider preventive medication if ≥4 migraines/month'] }
}

export function calculateMuscleRecoveryTime(muscleGroup: string, setsCompleted: number, repRange: '1-5' | '6-12' | '12+', trainingAge: 'beginner' | 'intermediate' | 'advanced', ageYears: number, sleepHoursLastNight: number, proteinGrams: number, bodyweightKg: number) {
  const baseRecovery: Record<string, number> = { chest: 48, back: 56, legs: 72, shoulders: 40, arms: 36, core: 24, glutes: 60, calves: 36 }
  let hours = baseRecovery[muscleGroup.toLowerCase()] || 48
  const intensityMod = repRange === '1-5' ? 1.3 : repRange === '6-12' ? 1.0 : 0.8
  const volumeMod = setsCompleted > 20 ? 1.4 : setsCompleted > 15 ? 1.2 : setsCompleted > 10 ? 1.0 : 0.85
  const ageMod = ageYears > 50 ? 1.3 : ageYears > 40 ? 1.15 : ageYears > 30 ? 1.05 : 1.0
  const sleepMod = sleepHoursLastNight < 6 ? 1.4 : sleepHoursLastNight < 7 ? 1.2 : 1.0
  const proteinAdequate = proteinGrams >= bodyweightKg * 1.6
  const proteinMod = proteinAdequate ? 0.9 : 1.15
  const expMod = trainingAge === 'beginner' ? 1.2 : trainingAge === 'advanced' ? 0.85 : 1.0
  const totalHours = Math.round(hours * intensityMod * volumeMod * ageMod * sleepMod * proteinMod * expMod)
  const readyDate = new Date(Date.now() + totalHours * 3600000)
  return {
    recoveryHours: totalHours, recoveryDays: Math.round(totalHours / 24 * 10) / 10, muscleGroup,
    readyDateTime: readyDate.toLocaleString(), factors: { intensity: repRange, volume: setsCompleted, age: ageYears, sleep: sleepHoursLastNight, protein: proteinAdequate ? 'Adequate' : 'Insufficient' },
    tipsToSpeedRecovery: [!proteinAdequate ? `Increase protein to ${Math.round(bodyweightKg * 1.6)}g/day` : '', sleepHoursLastNight < 7 ? 'Get 7-9 hours of sleep' : '', 'Active recovery: light walking or swimming', 'Consider contrast therapy (heat/ice)'].filter(Boolean)
  }
}

export function calculateNightShiftHealthImpact(yearsOnNightShift: number, shiftsPerWeek: number, sleepHoursAfterShift: number, caffeineConsumption: number, exerciseFrequency: number, mealTiming: 'regular' | 'irregular', lightExposure: 'managed' | 'unmanaged') {
  let riskScore = 0
  riskScore += Math.min(yearsOnNightShift * 2, 20)
  riskScore += shiftsPerWeek >= 5 ? 15 : shiftsPerWeek >= 3 ? 8 : 3
  riskScore += sleepHoursAfterShift < 6 ? 15 : sleepHoursAfterShift < 7 ? 8 : 0
  riskScore += caffeineConsumption > 400 ? 10 : caffeineConsumption > 200 ? 5 : 0
  riskScore -= Math.min(exerciseFrequency * 2, 8)
  riskScore += mealTiming === 'irregular' ? 10 : 0
  riskScore += lightExposure === 'unmanaged' ? 10 : 0
  const healthRisk = Math.min(100, Math.max(0, riskScore))
  const t2dRisk = yearsOnNightShift > 5 ? `~${Math.round(25 + yearsOnNightShift)}% higher T2D risk` : 'Moderate'
  const cvRisk = yearsOnNightShift > 10 ? '~40% higher CVD risk vs day workers' : yearsOnNightShift > 5 ? '~25% higher risk' : 'Low at this duration'
  const cancerRisk = yearsOnNightShift > 10 ? 'IARC classifies prolonged night work as Group 2A carcinogen' : 'Low to moderate at this duration'
  return { healthRisk, t2dRisk, cvRisk, cancerRisk, color: healthRisk >= 60 ? '#ef4444' : healthRisk >= 40 ? '#f97316' : '#eab308', circadianDisruption: yearsOnNightShift > 5 ? 'Significant circadian misalignment' : 'Moderate disruption', mitigationStrategies: ['Wear blue-light blocking glasses on commute home', 'Blackout curtains and white noise for daytime sleep', 'Eat meals aligned with waking hours (not 3am)', 'Exercise at consistent times (not just before sleep)', 'Melatonin 0.5mg before daytime sleep can help circadian anchoring'] }
}

export function calculateNutritionalDeficiencyRisk(fruitVegServings: number, redMeatServings: number, dairyServings: number, sunExposureHours: number, seafoodServings: number, wholegrainServings: number, legumesServings: number, supplementUse: boolean, restrictedDiet: 'vegan' | 'vegetarian' | 'pescatarian' | 'none', age: number, gender: 'male' | 'female') {
  const deficiencies: { nutrient: string; risk: string; color: string }[] = []
  if (restrictedDiet === 'vegan' || (seafoodServings < 1 && (restrictedDiet === 'vegetarian'))) deficiencies.push({ nutrient: 'Vitamin B12', risk: 'High risk — found only in animal products', color: '#ef4444' })
  if (sunExposureHours < 0.5 && dairyServings < 2) deficiencies.push({ nutrient: 'Vitamin D', risk: 'High risk — limited sun and dairy intake', color: '#ef4444' })
  if ((restrictedDiet === 'vegan' || restrictedDiet === 'vegetarian') && redMeatServings < 1) deficiencies.push({ nutrient: 'Iron', risk: 'Moderate — plant iron (non-heme) is poorly absorbed', color: '#f97316' })
  if (dairyServings < 1 && fruitVegServings < 5) deficiencies.push({ nutrient: 'Calcium', risk: 'Moderate — low dairy and vegetable intake', color: '#f97316' })
  if (seafoodServings < 2) deficiencies.push({ nutrient: 'Omega-3 (EPA/DHA)', risk: 'Common — most people need more fatty fish', color: '#eab308' })
  if (fruitVegServings < 3) deficiencies.push({ nutrient: 'Magnesium', risk: 'Moderate — low plant food intake', color: '#f97316' })
  if (wholegrainServings < 3) deficiencies.push({ nutrient: 'Zinc', risk: 'Mild — low whole grain and meat intake', color: '#eab308' })
  const overallRisk = deficiencies.filter(d => d.color === '#ef4444').length > 0 ? 'High' : deficiencies.filter(d => d.color === '#f97316').length > 1 ? 'Moderate' : 'Low'
  return { deficiencies, overallRisk, restrictedDiet, recommendBloodwork: deficiencies.length >= 2 || restrictedDiet === 'vegan', keyRecommendations: [restrictedDiet === 'vegan' ? 'B12 supplement 1000mcg/day is essential' : '', sunExposureHours < 0.5 ? 'Vitamin D supplement 2000 IU/day' : '', fruitVegServings < 5 ? 'Aim for 5+ servings of fruit/veg daily' : ''].filter(Boolean) }
}

export function calculateObesityComorbidityRisk(bmi: number, waistCm: number, gender: 'male' | 'female', age: number, systolicBP: number, fastingGlucose: number, triglycerides: number, hdlCholesterol: number) {
  const metSynComponents = [
    waistCm > (gender === 'male' ? 102 : 88),
    triglycerides > 150,
    hdlCholesterol < (gender === 'male' ? 40 : 50),
    systolicBP > 130,
    fastingGlucose > 100,
  ]
  const metSynCount = metSynComponents.filter(Boolean).length
  const hasMetSyn = metSynCount >= 3
  const t2dRisk = fastingGlucose > 126 ? 'Probable diabetes — confirm HbA1c' : fastingGlucose > 100 ? `Pre-diabetes — ${Math.round(((fastingGlucose - 100) / 25) * 30 + 10)}% 5-yr T2D risk` : 'Normal'
  const bmiCategory = bmi >= 40 ? 'Class III Obesity' : bmi >= 35 ? 'Class II Obesity' : bmi >= 30 ? 'Class I Obesity' : bmi >= 25 ? 'Overweight' : 'Normal'
  const nafldRisk = bmi >= 30 && (fastingGlucose > 100 || triglycerides > 150) ? 'High NAFLD risk — liver ultrasound recommended' : bmi >= 28 ? 'Moderate NAFLD risk' : 'Low'
  const apneaRisk = bmi >= 30 && (gender === 'male' || age > 50) ? 'High sleep apnoea risk — consider sleep study' : bmi >= 28 ? 'Moderate risk' : 'Low'
  const overallRisk = hasMetSyn || bmi >= 35 ? 'Very High' : metSynCount >= 2 || bmi >= 30 ? 'High' : bmi >= 25 ? 'Moderate' : 'Low'
  const color = overallRisk === 'Very High' ? '#dc2626' : overallRisk === 'High' ? '#ef4444' : overallRisk === 'Moderate' ? '#f97316' : '#22c55e'
  return { bmiCategory, metSynComponents: metSynCount, hasMetSyn, t2dRisk, nafldRisk, apneaRisk, overallRisk, color, weightLossTarget: bmi >= 30 ? `${Math.round((bmi - 27) * ((gender === 'male' ? 1.8 : 1.7) * 1.73 ** 2))}kg loss (to BMI 27) reduces most comorbidity risk` : 'Weight within manageable range', metformConsider: fastingGlucose > 110 && bmi >= 30 ? 'Consider discussing metformin with physician for T2D prevention' : '' }
}

export function calculateOralHealthRisk(brushingFreq: number, flossingFreq: number, sugarConsumption: number, smoker: boolean, alcoholPerWeek: number, lastDentalVisitMonths: number, dryMouth: boolean, nightGrinding: boolean, acidicDietScore: number) {
  let riskScore = 0
  riskScore += brushingFreq < 2 ? 15 : 0
  riskScore += flossingFreq < 3 ? 10 : 0
  riskScore += sugarConsumption * 3
  riskScore += smoker ? 20 : 0
  riskScore += alcoholPerWeek > 14 ? 8 : 0
  riskScore += lastDentalVisitMonths > 24 ? 15 : lastDentalVisitMonths > 12 ? 8 : 0
  riskScore += dryMouth ? 12 : 0
  riskScore += nightGrinding ? 10 : 0
  riskScore += acidicDietScore * 2
  const oralRisk = Math.min(100, Math.max(0, riskScore))
  let category: string, color: string
  if (oralRisk >= 70) { category = 'High risk — dental appointment urgent'; color = '#ef4444' }
  else if (oralRisk >= 45) { category = 'Moderate risk — review habits'; color = '#f97316' }
  else if (oralRisk >= 20) { category = 'Low-moderate risk'; color = '#eab308' }
  else { category = 'Good oral health practices'; color = '#22c55e' }
  const systemicLinks = [oralRisk >= 50 ? 'Poor oral health linked to 2× higher CVD risk (inflammation pathway)' : '', smoker ? 'Smoking raises oral cancer risk 6× — screen annually' : '', dryMouth ? 'Dry mouth dramatically increases cavity risk — saliva is protective' : ''].filter(Boolean)
  return { oralRisk, category, color, systemicLinks, cancerRisk: smoker || alcoholPerWeek > 14 ? 'Elevated oral cancer risk — HPV + smoking/alcohol = high risk' : 'Standard risk', grindingTip: nightGrinding ? 'Ask dentist about occlusal splint/night guard — prevents enamel damage' : '' }
}

export function calculatePCOSRiskScore(cycleLengthDays: number, cycleIrregularity: number, acneScore: number, hirsutismScore: number, bmi: number, fastingInsulin: number, familyHistory: boolean, hairLossScore: number, ovarianCysts: boolean) {
  // Rotterdam criteria-based risk assessment (not diagnosis)
  let riskScore = 0
  riskScore += cycleLengthDays > 35 || cycleIrregularity >= 3 ? 20 : cycleIrregularity >= 2 ? 12 : 0
  riskScore += acneScore * 3
  riskScore += hirsutismScore * 4
  riskScore += bmi >= 30 ? 10 : bmi >= 25 ? 5 : 0
  riskScore += fastingInsulin > 15 ? 15 : fastingInsulin > 10 ? 8 : 0
  riskScore += familyHistory ? 10 : 0
  riskScore += hairLossScore * 3
  riskScore += ovarianCysts ? 15 : 0
  const riskPct = Math.min(100, Math.max(0, riskScore))
  let category: string, color: string
  if (riskPct >= 60) { category = 'High PCOS likelihood — see gynaecologist/endocrinologist'; color = '#ef4444' }
  else if (riskPct >= 35) { category = 'Moderate risk — evaluation recommended'; color = '#f97316' }
  else if (riskPct >= 15) { category = 'Low-moderate — monitor cycle patterns'; color = '#eab308' }
  else { category = 'Low PCOS risk indicators'; color = '#22c55e' }
  return { riskPct, category, color, roterdamCriteriaNote: 'PCOS diagnosis requires 2 of 3 Rotterdam criteria: irregular ovulation, hyperandrogenism, polycystic ovaries on ultrasound', investigations: riskPct >= 35 ? ['Pelvic ultrasound', 'Total testosterone + SHBG + DHEAS', 'Fasting insulin + HOMA-IR', 'Thyroid TSH (rule out thyroid cause)', 'Prolactin (rule out hyperprolactinaemia)'] : [], insulinResistance: fastingInsulin > 10 ? 'Insulin resistance likely — consider low-GI diet and inositol' : 'Insulin sensitivity likely normal', fertilityNote: riskPct >= 40 ? 'PCOS is the leading cause of anovulatory infertility — discuss with specialist if TTC' : '' }
}

export function calculatePainScoreAnalysis(currentPain: number, painFrequency: 'constant' | 'daily' | 'weekly' | 'occasional', sleepDisruption: number, activityLimitation: number, painDuration: string, useOfMedication: boolean, qualityOfLife: number) {
  const freqScore = { constant: 4, daily: 3, weekly: 2, occasional: 1 }[painFrequency]
  const composite = Math.round((currentPain * 0.35 + freqScore * 0.15 + sleepDisruption * 0.20 + activityLimitation * 0.20 + (10 - qualityOfLife) * 0.10) * 10) / 10
  let category: string, color: string, guidance: string
  if (composite >= 8) { category = 'Severe chronic pain'; color = '#dc2626'; guidance = 'Pain specialist or multidisciplinary pain clinic strongly recommended' }
  else if (composite >= 6) { category = 'Moderate-severe'; color = '#ef4444'; guidance = 'Discuss multimodal pain management with your physician' }
  else if (composite >= 4) { category = 'Moderate'; color = '#f97316'; guidance = 'Physical therapy, cognitive behavioral therapy, and lifestyle changes may help' }
  else if (composite >= 2) { category = 'Mild-moderate'; color = '#eab308'; guidance = 'Over-the-counter options, exercise, and sleep optimization' }
  else { category = 'Mild'; color = '#22c55e'; guidance = 'Monitor; lifestyle measures often sufficient' }
  const redFlags = [currentPain >= 9 ? 'Severe pain (9-10/10)' : '', sleepDisruption >= 8 ? 'Pain severely disrupts sleep' : '', activityLimitation >= 8 ? 'Near-complete activity limitation' : ''].filter(Boolean)
  return { composite, currentPain, category, color, guidance, redFlags, painIndex: `${composite}/10`, chronicFlag: painDuration === 'chronic' || painFrequency === 'constant', medicationNote: useOfMedication ? 'Medication use documented — discuss adequacy with prescriber' : 'No current medication' }
}

export function calculatePostureAssessment(headForward: number, shoulderRounding: number, hipTilt: 'anterior' | 'neutral' | 'posterior', kneesIn: boolean, flatFeet: boolean, hoursSeatedPerDay: number, yearsOfficeWork: number) {
  let score = 0
  score += headForward * 2
  score += shoulderRounding * 1.5
  score += hipTilt !== 'neutral' ? 2 : 0
  score += kneesIn ? 2 : 0
  score += flatFeet ? 1 : 0
  score += Math.max(0, hoursSeatedPerDay - 6) * 0.5
  score += Math.min(yearsOfficeWork * 0.3, 5)
  const postureScore = Math.min(100, Math.round(score * 5))
  let category: string, color: string
  if (postureScore >= 70) { category = 'Poor posture — high injury risk'; color = '#dc2626' }
  else if (postureScore >= 45) { category = 'Moderate postural issues'; color = '#f97316' }
  else if (postureScore >= 20) { category = 'Mild deviations'; color = '#eab308' }
  else { category = 'Good posture'; color = '#22c55e' }
  const issues = [headForward > 2 ? `Head forward posture (${headForward} cm)` : '', shoulderRounding > 2 ? 'Rounded shoulders' : '', hipTilt !== 'neutral' ? `${hipTilt} pelvic tilt` : '', kneesIn ? 'Knee valgus (knees caving in)' : '', flatFeet ? 'Flat feet / overpronation' : ''].filter(Boolean)
  return { postureScore, category, color, issues, correctives: ['Face pulls 3×15 daily for rounded shoulders', 'Chin tucks 3×10 for forward head', 'Hip flexor stretching 3×30s daily', 'Glute activation before training', 'Ergonomic workstation setup', 'Stand/walk every 30-45 minutes'], paintRisk: postureScore > 60 ? 'High risk of neck/back/shoulder pain' : 'Moderate to low pain risk' }
}

export function calculateProteinSynthesisOptimizer(bodyWeightKg: number, leanMassKg: number, trainingFrequency: number, trainingIntensity: number, age: number, proteinGrams: number, mealsPerDay: number, postWorkoutProtein: number, sleepHours: number) {
  const perMealProtein = Math.round(proteinGrams / mealsPerDay)
  const mpsStimulatingThreshold = age > 65 ? 40 : 30 // grams per meal to maximally stimulate MPS
  const mpsEfficiency = perMealProtein >= mpsStimulatingThreshold ? 100 : Math.round((perMealProtein / mpsStimulatingThreshold) * 100)
  const dailyTarget = Math.round(leanMassKg * (trainingIntensity > 7 ? 2.2 : trainingIntensity > 5 ? 1.8 : 1.6))
  const deficitOrSurplus = proteinGrams - dailyTarget
  const leucineThreshold = 2.5 // grams per meal
  const estimatedLeucinePerMeal = Math.round(perMealProtein * 0.09 * 10) / 10 // ~9% leucine in typical protein
  const synthScore = Math.min(100, Math.round(mpsEfficiency * 0.4 + (proteinGrams / dailyTarget) * 40 + (sleepHours >= 7 ? 15 : 8) + (postWorkoutProtein >= 25 ? 15 : postWorkoutProtein >= 15 ? 8 : 0) + (trainingFrequency >= 3 ? 5 : 2)))
  return { dailyProteinTarget: dailyTarget, currentIntake: proteinGrams, deficitOrSurplus: Math.round(deficitOrSurplus), perMealProtein, mpsStimulatingThreshold, mpsEfficiency, estimatedLeucinePerMeal, synthScore, leucineAdequate: estimatedLeucinePerMeal >= leucineThreshold, recommendations: [deficitOrSurplus < -20 ? `Increase protein by ${Math.abs(Math.round(deficitOrSurplus))}g/day` : '', perMealProtein < mpsStimulatingThreshold ? `Aim for ${mpsStimulatingThreshold}g per meal (currently ${perMealProtein}g)` : '', postWorkoutProtein < 25 ? 'Consume 25-40g protein within 1 hour post-workout' : '', sleepHours < 7 ? 'Improve sleep — MPS peaks during slow-wave sleep' : ''].filter(Boolean), color: synthScore >= 80 ? '#22c55e' : synthScore >= 60 ? '#84cc16' : synthScore >= 40 ? '#eab308' : '#ef4444' }
}

export function calculateRespiratoryRate(breathsPerMinute: number, age: number, afterExercise: boolean, altitudeFt: number) {
  const normalRanges = { infant: [30, 60], child: [18, 30], teen: [12, 20], adult: [12, 20], elderly: [12, 28] }
  const ageGroup = age < 1 ? 'infant' : age < 12 ? 'child' : age < 18 ? 'teen' : age < 65 ? 'adult' : 'elderly'
  const [low, high] = normalRanges[ageGroup]
  let status: string, color: string
  if (afterExercise) { status = 'Post-exercise elevation — normal'; color = '#84cc16' }
  else if (breathsPerMinute < low) { status = 'Bradypnea — below normal range'; color = '#f97316' }
  else if (breathsPerMinute <= high) { status = 'Normal respiratory rate'; color = '#22c55e' }
  else if (breathsPerMinute <= high + 8) { status = 'Mild tachypnea — slightly elevated'; color = '#f59e0b' }
  else { status = 'Tachypnea — significantly elevated'; color = '#ef4444' }
  const altitudeEffect = altitudeFt > 8000 ? `+${Math.round((altitudeFt - 8000) / 1000)} breaths/min compensation at altitude` : 'No significant altitude effect'
  const minuteVentilation = Math.round(breathsPerMinute * 0.5)
  const oxygen_ml = Math.round(breathsPerMinute * 500 * 0.21)
  return { breathsPerMinute, normalRange: `${low}-${high} breaths/min`, status, color, ageGroup, minuteVentilation: `${minuteVentilation} L/min`, oxygenPerMinute: `${Math.round(oxygen_ml / 1000 * 10) / 10} L O₂/min`, altitudeEffect, redFlagThreshold: ageGroup === 'adult' ? 25 : high + 8 }
}

export function calculateSaunaHealthScore(sessionsPerWeek: number, durationMinutes: number, temperatureCelsius: number, typeOfSauna: 'dry' | 'steam' | 'infrared', yearsOfUse: number, cardiovascularRisk: boolean, bloodPressure: 'normal' | 'high' | 'very-high', postSaunaHydration: boolean) {
  let benefitScore = 0
  benefitScore += sessionsPerWeek >= 4 ? 25 : sessionsPerWeek >= 2 ? 15 : sessionsPerWeek >= 1 ? 8 : 0
  benefitScore += durationMinutes >= 20 ? 20 : durationMinutes >= 15 ? 12 : 8
  benefitScore += temperatureCelsius >= 90 ? 15 : temperatureCelsius >= 80 ? 10 : 5
  benefitScore += typeOfSauna === 'dry' ? 10 : typeOfSauna === 'steam' ? 8 : 5
  benefitScore += Math.min(yearsOfUse * 2, 10)
  benefitScore += postSaunaHydration ? 10 : 0
  const benefitTotal = Math.min(100, benefitScore)
  const riskFlags = [cardiovascularRisk && temperatureCelsius > 90 ? '⚠️ CVD risk — limit temperature, exit if dizzy' : '', bloodPressure === 'very-high' ? '⚠️ Very high BP — consult physician before sauna use' : '', !postSaunaHydration ? '⚠️ Rehydrate: 500mL water for each 10 min session' : ''].filter(Boolean)
  const cvBenefit = sessionsPerWeek >= 4 ? 'Regular sauna use (4×/week) associated with 50% lower CVD mortality (Kuopio Heart Study)' : sessionsPerWeek >= 2 ? '2-3×/week associated with 22% lower CVD mortality' : 'Occasional use — limited CVD benefit data'
  return { benefitScore: benefitTotal, cvBenefit, riskFlags, hspActivation: temperatureCelsius >= 80 ? 'Heat shock protein activation: cellular repair/longevity pathway stimulated' : 'Temperature too low for optimal HSP response', growthHormoneBoost: durationMinutes >= 20 ? 'GH increases 2-5× with 20+ minute sessions' : 'Extend to 20 minutes for GH response', safetyTip: bloodPressure === 'normal' && !cardiovascularRisk ? 'Safe for regular use — stay hydrated' : 'Consult physician; use conservatively', color: benefitTotal >= 70 ? '#22c55e' : benefitTotal >= 45 ? '#84cc16' : '#eab308' }
}

export function calculateSkinAgingRisk(uvExposureHours: number, sunscreenUse: 'never' | 'sometimes' | 'always', smokingYears: number, sugarGramsPerDay: number, sleepHours: number, waterLitersPerDay: number, stressLevel: number, age: number, skinCareRoutine: 'none' | 'basic' | 'advanced') {
  let score = 0
  const uvExp = uvExposureHours * (sunscreenUse === 'never' ? 2 : sunscreenUse === 'sometimes' ? 1.3 : 0.5)
  score += Math.min(uvExp * 1.5, 15)
  score += smokingYears * 0.5
  score += Math.max(0, sugarGramsPerDay - 25) * 0.08
  score += Math.max(0, 8 - sleepHours) * 1.5
  score += Math.max(0, 2 - waterLitersPerDay) * 2
  score += stressLevel * 0.5
  if (skinCareRoutine === 'basic') score -= 3
  if (skinCareRoutine === 'advanced') score -= 6
  const skinAgingScore = Math.min(100, Math.max(0, Math.round(score)))
  const biologicalSkinAge = Math.round(age + (skinAgingScore - 30) * 0.3)
  let category: string, color: string
  if (skinAgingScore >= 70) { category = 'Accelerated aging'; color = '#dc2626' }
  else if (skinAgingScore >= 45) { category = 'Moderate aging factors'; color = '#f97316' }
  else if (skinAgingScore >= 20) { category = 'Mild aging factors'; color = '#eab308' }
  else { category = 'Minimal aging factors'; color = '#22c55e' }
  const topFactors = [uvExposureHours > 2 && sunscreenUse !== 'always' ? 'UV damage (top skin ager — 80% of aging)' : '', smokingYears > 0 ? 'Smoking — reduces collagen 40%' : '', sugarGramsPerDay > 50 ? 'Glycation from high sugar' : '', sleepHours < 7 ? 'Sleep deprivation' : ''].filter(Boolean)
  return { skinAgingScore, biologicalSkinAge, chronologicalAge: age, category, color, topFactors, essentialRoutine: ['SPF 30-50 daily (non-negotiable)', 'Retinol or retinoid at night', 'Vitamin C serum in morning', 'Hyaluronic acid for hydration', 'Gentle cleanser — no harsh scrubs'] }
}

export function calculateSleepDebtAccumulation(targetSleepHours: number, actualSleepHoursPerDay: number[], performanceImpact: boolean = true) {
  const days = actualSleepHoursPerDay.length
  let cumulativeDebt = 0
  const dailyData: { day: number; debt: number; deficit: number }[] = []
  actualSleepHoursPerDay.forEach((sleep, i) => {
    const deficit = Math.max(0, targetSleepHours - sleep)
    const recovery = sleep > targetSleepHours ? Math.min(cumulativeDebt, (sleep - targetSleepHours) * 0.5) : 0
    cumulativeDebt = Math.max(0, cumulativeDebt + deficit - recovery)
    dailyData.push({ day: i + 1, debt: Math.round(cumulativeDebt * 10) / 10, deficit: Math.round(deficit * 10) / 10 })
  })
  const avgSleep = actualSleepHoursPerDay.reduce((a, b) => a + b, 0) / days
  const cognitiveImpairment = cumulativeDebt > 14 ? 'Equivalent to 24-hour sleep deprivation — significant impairment' : cumulativeDebt > 7 ? 'Moderate cognitive deficit — like 1-2 drinks of alcohol' : cumulativeDebt > 3 ? 'Mild impairment — reaction time and focus affected' : 'Minimal impairment'
  const daysToRecover = Math.ceil(cumulativeDebt / 1.5)
  return { cumulativeDebt: Math.round(cumulativeDebt * 10) / 10, avgSleep: Math.round(avgSleep * 10) / 10, targetSleepHours, dailyData, cognitiveImpairment, daysToRecover, metabolicRisk: cumulativeDebt > 10 ? 'Elevated cortisol and insulin resistance risk' : 'Within manageable range', performanceDecrement: performanceImpact ? `~${Math.min(Math.round(cumulativeDebt * 3), 30)}% performance reduction estimated` : '' }
}

export function calculateSpO2Risk(spO2Pct: number, altitude: number, age: number, hasLungDisease: boolean, symptoms: string[]) {
  let status: string, color: string, action: string
  const altAdj = Math.max(0, altitude / 3000)
  const adjSpO2 = spO2Pct + altAdj
  if (adjSpO2 >= 98) { status = 'Optimal'; color = '#22c55e'; action = 'No action needed' }
  else if (adjSpO2 >= 95) { status = 'Normal'; color = '#84cc16'; action = 'Monitor if symptomatic' }
  else if (adjSpO2 >= 92) { status = 'Borderline low'; color = '#eab308'; action = 'Rest, deep breathing; seek care if declining' }
  else if (adjSpO2 >= 88) { status = 'Low — hypoxemia'; color = '#f97316'; action = 'Seek medical attention promptly' }
  else { status = 'Critical — severe hypoxemia'; color = '#dc2626'; action = '🚨 Emergency care immediately' }
  const concerns = [...symptoms, hasLungDisease ? 'Underlying lung disease' : '', altitude > 8000 ? `High altitude (${altitude} ft)` : ''].filter(Boolean)
  return { spO2Pct, status, color, action, altitudeAdjustedSpO2: Math.round(adjSpO2 * 10) / 10, concerns, normalRange: hasLungDisease ? '92-96%' : '95-100%', supplementalO2Threshold: hasLungDisease ? 88 : 90, emergencyThreshold: 88 }
}

export function calculateTimingNutritionWindow(wakeUpTime: number, exerciseTime: number, bedTime: number, mainGoal: 'fat-loss' | 'muscle-gain' | 'performance' | 'longevity', intermittentFasting: boolean, fastingWindowHours: number) {
  const eatingWindowStart = intermittentFasting ? (wakeUpTime + (24 - fastingWindowHours)) % 24 : wakeUpTime + 1
  const eatingWindowEnd = intermittentFasting ? (eatingWindowStart + (24 - fastingWindowHours)) % 24 : bedTime - 1
  const preWorkoutWindow = (exerciseTime - 1.5 + 24) % 24
  const postWorkoutWindow = (exerciseTime + 0.5 + 24) % 24
  const lastMealTime = Math.min(bedTime - 2, eatingWindowEnd)
  const circadianOptimal = exerciseTime >= 10 && exerciseTime <= 14 ? 'Exercise timing is circadian-optimal (cortisol peak window)' : exerciseTime >= 16 && exerciseTime <= 19 ? 'Exercise in afternoon: near-peak body temperature — good for performance' : 'Consider shifting exercise to 10am-2pm or 4-7pm for circadian alignment'
  const fmt = (h: number) => { const hh = Math.floor(h % 24); return `${hh % 12 || 12}:00 ${hh >= 12 ? 'PM' : 'AM'}` }
  return {
    eatingWindow: `${fmt(eatingWindowStart)} – ${fmt(eatingWindowEnd)}`,
    preWorkoutMeal: fmt(preWorkoutWindow),
    postWorkoutMeal: fmt(postWorkoutWindow),
    lastMeal: fmt(lastMealTime),
    circadianNote: circadianOptimal,
    goalSpecificTip: mainGoal === 'fat-loss' ? 'Skip pre-workout carbs for fasted morning cardio — maximises fat oxidation' : mainGoal === 'muscle-gain' ? 'Pre-workout carbs + protein 90 min before; 25-40g protein within 1hr post-workout' : mainGoal === 'performance' ? 'Carb load 3-4 hrs pre-performance; caffeine 60 min before' : 'Early eating window (finish by 7pm) associated with longevity in observational data',
    fastingBenefits: intermittentFasting ? fastingWindowHours >= 16 ? 'Autophagy activation likely (16+ hours fasting)' : 'Metabolic benefit from eating window restriction' : 'No fasting — circadian eating window still beneficial',
    melatoninWindow: `Avoid eating after ${fmt(bedTime - 2)} — late meals impair melatonin release`
  }
}

export function calculateVisualAcuityRisk(currentVision: string, screenHoursPerDay: number, outdoorHoursPerDay: number, age: number, familyHistoryGlaucoma: boolean, diabetic: boolean, lastEyeExamMonths: number, rubbingEyes: boolean, contactLensHygiene: 'good' | 'poor' | 'none') {
  let riskScore = 0
  riskScore += screenHoursPerDay > 10 ? 15 : screenHoursPerDay > 6 ? 8 : 0
  riskScore += outdoorHoursPerDay < 1 ? 10 : outdoorHoursPerDay < 2 ? 5 : 0
  riskScore += age > 60 ? 15 : age > 45 ? 8 : 0
  riskScore += familyHistoryGlaucoma ? 15 : 0
  riskScore += diabetic ? 20 : 0
  riskScore += lastEyeExamMonths > 24 ? 12 : lastEyeExamMonths > 12 ? 6 : 0
  riskScore += rubbingEyes ? 8 : 0
  riskScore += contactLensHygiene === 'poor' ? 15 : contactLensHygiene === 'none' ? 0 : 0
  const visionRisk = Math.min(100, Math.max(0, riskScore))
  const myopiaRisk = screenHoursPerDay > 6 && outdoorHoursPerDay < 2 && age < 30 ? 'High myopia progression risk — 2 hrs/day outdoors is protective' : 'Moderate myopia risk'
  const glaucomaRisk = familyHistoryGlaucoma ? 'Family history = 10× higher glaucoma risk — annual IOP check essential' : age > 60 ? 'Age-related glaucoma risk — screen every 2 years' : 'Standard risk'
  const diabeticRetinopathy = diabetic ? 'Annual dilated fundus exam required — diabetic retinopathy can be asymptomatic until late stage' : 'Not applicable'
  return { visionRisk, glaucomaRisk, myopiaRisk, diabeticRetinopathy, color: visionRisk >= 60 ? '#ef4444' : visionRisk >= 35 ? '#f97316' : '#22c55e', examFrequency: diabetic || age > 60 || familyHistoryGlaucoma ? 'Annual comprehensive eye exam' : lastEyeExamMonths > 24 ? 'Eye exam overdue — book now' : 'Every 1-2 years', contactLensWarning: contactLensHygiene === 'poor' ? '⚠️ Poor lens hygiene: leading cause of preventable blindness — clean daily, never sleep in lenses' : '', digitalEyeStrain: screenHoursPerDay > 6 ? '20-20-20 rule: every 20 min, look 20 feet away for 20 seconds' : 'Screen use within manageable range' }
}

export function calculateVitaminDStatus(sunExposureMinsPerDay: number, skinTone: 'light' | 'medium' | 'dark', latitude: number, season: 'winter' | 'spring' | 'summer' | 'fall', age: number, bmi: number, supplementIU: number, dietVitDMcg: number) {
  const skinFactor = skinTone === 'light' ? 1.0 : skinTone === 'medium' ? 0.6 : 0.3
  const seasonFactor = season === 'summer' ? 1.0 : season === 'spring' || season === 'fall' ? 0.6 : 0.1
  const latitudeFactor = latitude > 50 ? 0.3 : latitude > 35 ? 0.7 : 1.0
  const ageFactor = age > 70 ? 0.7 : age > 50 ? 0.85 : 1.0
  const bmiFactor = bmi > 30 ? 0.7 : bmi > 25 ? 0.85 : 1.0
  const sunSynthesisIU = sunExposureMinsPerDay * skinFactor * seasonFactor * latitudeFactor * 40
  const dietIU = dietVitDMcg * 40
  const totalIU = sunSynthesisIU + supplementIU + dietIU
  const estimatedLevel = Math.round(totalIU / 50)
  let status: string, color: string
  if (estimatedLevel >= 50) { status = 'Optimal (50-80 ng/mL)'; color = '#22c55e' }
  else if (estimatedLevel >= 30) { status = 'Sufficient (30-50 ng/mL)'; color = '#84cc16' }
  else if (estimatedLevel >= 20) { status = 'Insufficient (20-30 ng/mL)'; color = '#eab308' }
  else if (estimatedLevel >= 10) { status = 'Deficient (10-20 ng/mL)'; color = '#f97316' }
  else { status = 'Severely deficient (<10 ng/mL)'; color = '#dc2626' }
  const recommendedSupplementIU = estimatedLevel < 30 ? 4000 : estimatedLevel < 50 ? 2000 : 1000
  return { estimatedLevelNgML: estimatedLevel, status, color, sunSynthesisIU: Math.round(sunSynthesisIU), supplementIU, totalDailyIU: Math.round(totalIU), recommendedSupplementIU, deficient: estimatedLevel < 30, seasonalRisk: season === 'winter' && latitude > 40 ? 'High deficiency risk — winter at northern latitude' : 'Manageable risk', bloodTestRecommended: estimatedLevel < 25 || age > 60 }
}

export function calculateWaistHipRatio(waistCm: number, hipCm: number, gender: 'male' | 'female', age: number) {
  const ratio = Math.round((waistCm / hipCm) * 100) / 100
  const whoThresholds = gender === 'male' ? { low: 0.85, high: 0.90 } : { low: 0.80, high: 0.85 }
  let riskCategory: string, color: string, cvRisk: string
  if (ratio <= whoThresholds.low - 0.05) { riskCategory = 'Low risk — gynoid / pear shape'; color = '#22c55e'; cvRisk = 'Below average cardiovascular risk' }
  else if (ratio <= whoThresholds.low) { riskCategory = 'Low-moderate risk'; color = '#84cc16'; cvRisk = 'Average cardiovascular risk' }
  else if (ratio <= whoThresholds.high) { riskCategory = 'Moderate risk — android / apple shape'; color = '#f59e0b'; cvRisk = 'Moderately elevated CV risk' }
  else { riskCategory = 'High risk — central obesity'; color = '#ef4444'; cvRisk = 'Significantly elevated T2D, CVD, stroke risk' }
  const idealWaist = gender === 'male' ? hipCm * 0.85 : hipCm * 0.80
  const waistToLose = Math.max(0, Math.round(waistCm - idealWaist))
  const bmiEquivalent = waistCm > (gender === 'male' ? 102 : 88) ? 'Equivalent to obese BMI for cardiometabolic risk' : 'Below abdominal obesity threshold'
  return { ratio, riskCategory, color, cvRisk, waistCm, hipCm, idealWaistCm: Math.round(idealWaist), waistToLoseCm: waistToLose, bmiEquivalent, metabolicSyndromeIndicator: (gender === 'male' && waistCm > 102) || (gender === 'female' && waistCm > 88), diabetesRisk: ratio > (gender === 'male' ? 0.95 : 0.85) ? 'High T2D risk — consult physician' : 'Standard risk' }
}

export function calculateWorkoutVolumeLoad(sets: number, reps: number, weightKg: number, exercisesCount: number, frequency: number, trainingGoal: 'strength' | 'hypertrophy' | 'endurance') {
  const totalReps = sets * reps * exercisesCount
  const volumeLoad = Math.round(sets * reps * weightKg * exercisesCount)
  const weeklyVolume = volumeLoad * frequency
  const targetVolumePerMuscle = trainingGoal === 'strength' ? { sets: '10-15', repsPerSet: '1-5', rest: '3-5 min' } : trainingGoal === 'hypertrophy' ? { sets: '15-25', repsPerSet: '6-12', rest: '60-90 sec' } : { sets: '20-30', repsPerSet: '12-20+', rest: '30-60 sec' }
  const tonnage = Math.round(weeklyVolume / 1000 * 10) / 10
  const mevSets = trainingGoal === 'strength' ? 10 : trainingGoal === 'hypertrophy' ? 15 : 20
  const mrvSets = trainingGoal === 'strength' ? 18 : trainingGoal === 'hypertrophy' ? 25 : 35
  const totalWeeklySets = sets * exercisesCount * frequency
  let volumeStatus: string, color: string
  if (totalWeeklySets < mevSets) { volumeStatus = 'Below MEV — not enough to stimulate growth'; color = '#f97316' }
  else if (totalWeeklySets <= mrvSets) { volumeStatus = 'Optimal volume range'; color = '#22c55e' }
  else { volumeStatus = 'Above MRV — recovery may be compromised'; color = '#ef4444' }
  return { volumeLoad, weeklyVolume, tonnage, totalReps, totalWeeklySets, volumeStatus, color, targetVolumePerMuscle, mev: mevSets, mrv: mrvSets, calsBurned: Math.round(volumeLoad * 0.12), progressionTip: totalWeeklySets < mevSets ? 'Add 1-2 sets per muscle group per week' : totalWeeklySets > mrvSets ? 'Reduce volume or add a deload week' : 'Maintain current volume and add weight progressively' }
}

export function calculateWoundHealingEstimate(woundSize: number, woundDepth: 'superficial' | 'partial' | 'full', location: 'face' | 'scalp' | 'torso' | 'extremity', age: number, diabetic: boolean, bmi: number, smokingStatus: boolean, nutritionStatus: 'good' | 'moderate' | 'poor', immunocompromised: boolean) {
  const baseHealDays: Record<string, number> = { face: 7, scalp: 10, torso: 14, extremity: 14 }
  const depthFactor = woundDepth === 'superficial' ? 1 : woundDepth === 'partial' ? 2 : 3.5
  let base = baseHealDays[location] * depthFactor * (woundSize / 5 + 0.5)
  base *= age > 65 ? 1.4 : age > 50 ? 1.2 : 1.0
  base *= diabetic ? 1.6 : 1.0
  base *= bmi > 35 ? 1.3 : bmi > 30 ? 1.15 : 1.0
  base *= smokingStatus ? 1.25 : 1.0
  base *= nutritionStatus === 'poor' ? 1.4 : nutritionStatus === 'moderate' ? 1.15 : 1.0
  base *= immunocompromised ? 1.5 : 1.0
  const estimatedDays = Math.round(base)
  const infectionRisk = (diabetic ? 3 : 1) * (immunocompromised ? 2 : 1) * (bmi > 35 ? 1.5 : 1) > 3 ? 'High' : (diabetic || immunocompromised) ? 'Moderate' : 'Low'
  const complications = [diabetic ? 'Diabetic wound healing significantly impaired — monitor daily' : '', smokingStatus ? 'Smoking reduces tissue perfusion — slows healing 25%' : '', immunocompromised ? 'Immune suppression: prophylactic antibiotics may be appropriate' : '', nutritionStatus === 'poor' ? 'Poor nutrition: increase protein and vitamin C immediately' : ''].filter(Boolean)
  return { estimatedDays, infectionRisk, complications, color: estimatedDays <= 14 ? '#22c55e' : estimatedDays <= 30 ? '#eab308' : estimatedDays <= 60 ? '#f97316' : '#ef4444', nutritionTip: 'Vitamin C 500mg/day + protein 1.5-2g/kg/day significantly accelerates wound healing', professionalCare: infectionRisk === 'High' || woundDepth === 'full' ? 'Professional wound care strongly recommended' : 'Home care likely sufficient with proper technique', phases: ['Days 1-4: Inflammation — normal redness/swelling', `Days 5-${Math.round(estimatedDays * 0.5)}: Proliferation — granulation tissue`, `Days ${Math.round(estimatedDays * 0.5)}-${estimatedDays}: Remodelling — scar maturation`] }
}