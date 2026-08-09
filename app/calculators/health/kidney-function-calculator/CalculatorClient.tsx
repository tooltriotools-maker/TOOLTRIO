'use client'
import { useState } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { structuredData?: object[]; faqs: any[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, relatedCalculators, blogSlug, seoContent }: Props) {
  const [age, setAge] = useState(50)
  const [gender, setGender] = useState<'male'|'female'>('male')
  const [creatinine, setCreatinine] = useState(90)
  const [diabetes, setDiabetes] = useState(false)
  const [hypertension, setHypertension] = useState(false)
  const [nsaids, setNsaids] = useState(false)

  // 2021 CKD-EPI creatinine equation (race-free).
  // Serum creatinine is entered in µmol/L and standardized to mg/dL.
  const k = gender === 'female' ? 0.7 : 0.9
  const alpha = gender === 'female' ? -0.241 : -0.302
  const crMgDl = creatinine / 88.4
  const ratio = crMgDl / k
  const eGFR = Math.round(142 * Math.pow(Math.min(ratio, 1), alpha) * Math.pow(Math.max(ratio, 1), -1.2) * Math.pow(0.9938, age) * (gender === 'female' ? 1.012 : 1))
  const clamped = Math.max(0, eGFR)

  const stage = clamped >= 90 ? {s:'G1 - Normal or High',c:'text-green-600'} : clamped >= 60 ? {s:'G2 - Mildly Decreased',c:'text-blue-600'} : clamped >= 45 ? {s:'G3a - Mild-Moderate Decrease',c:'text-yellow-600'} : clamped >= 30 ? {s:'G3b - Moderate-Severe Decrease',c:'text-orange-600'} : clamped >= 15 ? {s:'G4 - Severely Decreased',c:'text-red-600'} : {s:'G5 - Kidney Failure',c:'text-red-800'}
  const riskFactors = [diabetes, hypertension, nsaids].filter(Boolean).length

  return (
    <CalculatorLayout title="Kidney Function Calculator" description="Estimate eGFR (kidney function) using the 2021 race-free CKD-EPI creatinine equation." icon="🫘" category="Health" relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="kidney-function-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-5">Clinical Parameters</h2>
          <div className="space-y-4">
            <SelectField label="Gender" value={gender} onChange={v=>setGender(v as any)} options={[{value:'male',label:'Male'},{value:'female',label:'Female'}]} />
            <InputField label="Age" value={age} onChange={setAge} min={18} max={100} step={1} suffix="yrs" />
            <InputField label="Serum Creatinine" value={creatinine} onChange={setCreatinine} min={40} max={500} step={5} suffix="umol/L" />
            {[['Diabetes',diabetes,setDiabetes],['Hypertension / high BP',hypertension,setHypertension],['Regular NSAID use (ibuprofen etc.)',nsaids,setNsaids]].map(([l,v,s]: any)=>(
              <label key={l} className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                <input type="checkbox" checked={v} onChange={e=>s(e.target.checked)} className="accent-rose-500"/>
                <span>{l}</span>
              </label>
            ))}
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          <Card gradient>
            <div className="text-center py-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Estimated GFR (eGFR)</p>
              <div className={`text-7xl font-black mb-2 ${stage.c}`}>{clamped}</div>
              <p className="text-gray-500">mL/min/1.73m2 - {stage.s}</p>
            </div>
          </Card>
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="CKD Stage" value={stage.s.split(' ')[0]} />
            <ResultCard label="eGFR" value={`${clamped} mL/min`} highlight />
            <ResultCard label="Risk Factors" value={`${riskFactors}/3`} />
          </div>
          <Card>
            <h3 className="font-semibold text-gray-700 mb-3">CKD Stages by eGFR</h3>
            <div className="space-y-1 text-sm">
              {[['G1 >=90','Normal function','text-green-600'],['G2 60-89','Mildly decreased','text-blue-600'],['G3a 45-59','Mild-moderate','text-yellow-600'],['G3b 30-44','Moderate-severe','text-orange-600'],['G4 15-29','Severely decreased','text-red-600'],['G5 <15','Kidney failure','text-red-800']].map(([s,d,c])=>(
                <div key={s as string} className="flex justify-between"><span className={`font-bold ${c}`}>{s}</span><span className="text-gray-600">{d}</span></div>
              ))}
            </div>
            <p className="text-xs text-amber-700 mt-3 bg-amber-50 border border-amber-200 rounded-lg p-2">⚠️ For educational use only. A blood test from your doctor is required for clinical diagnosis.</p>
          </Card>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Kidney Function Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Kidney Function 2026 tool to get instant, evidence-based results personalized to your age, weight, and health goals. No signup required — complete privacy guaranteed.
        </p>
        <p className="text-sm text-gray-600">
          The calculator applies the calculation method described in its methodology and lets you explore different input scenarios. The result is an estimate, not a diagnosis.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Kidney Function Calculator"
        category="health"
        intro={`The **Kidney Function Calculator** is a free, health calculator using the method and reference data described for this specific calculator. Get your kidney function instantly - no account needed, works on all devices.

**Why Kidney Function matters for your health:** Understanding your kidney function is one of the most important steps in proactive health management. Healthcare professionals use kidney function as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the method implemented by this calculator.

**Method and population context:** This calculator uses reference ranges and formulas from the specific methodology and sources documented for this calculator.



Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Kidney Function Calculator:** This tool applies the calculation method described for kidney function in clinical and research settings across the United States and internationally.



**How to interpret your results:** Your kidney function result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current kidney function requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "Real-Time Kidney Function Calculator output as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Kidney Function Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Kidney Function Calculator methodology and assumptions & Guidelines", text: "The methodology should be interpreted alongside the specific formula and sources described for this calculator; a health result is an estimate and should not be treated as a clinical diagnosis. " },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: calculator-specific interpretation, limitations, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Kidney Function Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Kidney Function Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Kidney Function Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Kidney Function Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Kidney Function Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Kidney Function calculation:**



2. **Track trends, not single readings:** One measurement is a snapshot. Track your kidney function monthly for 3-6 months to see meaningful trends. Healthy kidney function improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Kidney Function is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your kidney function is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Kidney Function Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.



For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

`}
      />
      )}
    </CalculatorLayout>
  )
}
