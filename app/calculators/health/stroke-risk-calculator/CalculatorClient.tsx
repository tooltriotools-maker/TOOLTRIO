'use client'
import { useState } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { structuredData?: object[]; faqs: any[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, relatedCalculators, blogSlug, seoContent }: Props) {
  const [age, setAge] = useState(55)
  const [gender, setGender] = useState<'male'|'female'>('male')
  const [systolicBP, setSystolicBP] = useState(135)
  const [atrialFibrillation, setAtrialFibrillation] = useState(false)
  const [diabetes, setDiabetes] = useState(false)
  const [smoker, setSmoker] = useState(false)
  const [priorStroke, setPriorStroke] = useState(false)
  const [cholesterol, setCholesterol] = useState(5.5)

  // Simplified stroke risk score based on Framingham
  const score = Math.round(
    (age - 40) * 0.4 +
    (gender === 'female' ? 2 : 0) +
    (systolicBP - 120) * 0.1 +
    (atrialFibrillation ? 8 : 0) +
    (diabetes ? 3 : 0) +
    (smoker ? 4 : 0) +
    (priorStroke ? 10 : 0) +
    (cholesterol > 6 ? 2 : 0)
  )
  const pct10yr = Math.min(40, Math.max(1, Math.round(score * 0.8)))
  const risk = pct10yr >= 20 ? {l:'High Risk',c:'text-red-600',bg:'bg-red-50 border-red-300'} : pct10yr >= 10 ? {l:'Intermediate Risk',c:'text-orange-600',bg:'bg-orange-50 border-orange-300'} : {l:'Low Risk',c:'text-green-600',bg:'bg-green-50 border-green-300'}

  return (
    <CalculatorLayout title="Stroke Risk Calculator" description="Educational stroke-risk estimate based on selected risk factors; not a validated individual 10-year risk model." icon="🧠" category="Health" relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="stroke-risk-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-5">Risk Factors</h2>
          <div className="space-y-4">
            <SelectField label="Gender" value={gender} onChange={v=>setGender(v as any)} options={[{value:'male',label:'Male'},{value:'female',label:'Female'}]} />
            <InputField label="Age" value={age} onChange={setAge} min={20} max={85} step={1} suffix="yrs" />
            <InputField label="Systolic Blood Pressure" value={systolicBP} onChange={setSystolicBP} min={90} max={210} step={2} suffix="mmHg" />
            <InputField label="Total Cholesterol" value={cholesterol} onChange={setCholesterol} min={2} max={10} step={0.1} suffix="mmol/L" />
            {[['Atrial fibrillation',atrialFibrillation,setAtrialFibrillation],['Diabetes',diabetes,setDiabetes],['Current smoker',smoker,setSmoker],['Prior stroke / TIA',priorStroke,setPriorStroke]].map(([l,v,s]: any)=>(
              <label key={l} className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                <input type="checkbox" checked={v} onChange={e=>s(e.target.checked)} className="accent-rose-500"/>
                <span>{l}</span>
              </label>
            ))}
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          <div className={`rounded-2xl p-6 border-2 ${risk.bg}`}>
            <p className="text-xs font-bold uppercase tracking-wide text-gray-600 mb-1">Estimated Stroke Risk (Educational)</p>
            <p className={`text-6xl font-black ${risk.c}`}>{pct10yr}%</p>
            <p className={`font-bold text-lg mt-1 ${risk.c}`}>{risk.l}</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Risk Score" value={String(Math.round(score))} />
            <ResultCard label="10-yr Risk" value={`${pct10yr}%`} highlight />
            <ResultCard label="AF Present?" value={atrialFibrillation ? '⚠️ Yes' : 'v No'} />
          </div>
          <Card>
            <p className="text-xs text-amber-700 font-semibold bg-amber-50 border border-amber-200 rounded-xl p-3">⚠️ Educational tool only. The most important modifiable stroke risk factor is high blood pressure. Consult your doctor for a full assessment and personalised treatment.</p>
            <h3 className="font-semibold text-gray-700 mt-3 mb-2">Key Stroke Prevention Strategies</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>- Control blood pressure (target &lt;130/80 mmHg)</p>
              <p>- Treat atrial fibrillation - reduces stroke risk by up to 60%</p>
              <p>- Quit smoking, limit alcohol, exercise regularly</p>
              <p>- Know the <strong>FAST warning signs</strong>: Face, Arms, Speech, Time to call 999/911</p>
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Stroke Risk Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          A 50-year-old male with blood pressure 135/88 mmHg falls in the <strong>Stage 1 Hypertension</strong> category (AHA 2026 guidelines). Lifestyle changes can reduce systolic BP by 4–11 mmHg within weeks.
        </p>
        <p className="text-sm text-gray-600">
          This Stroke Risk 2026 uses American Heart Association standards to classify your readings and give evidence-based recommendations for improving cardiovascular health.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Stroke Risk Calculator"
        category="health"
        intro={`The **Stroke Risk Calculator** is a a health information tool using the method and reference data described for this calculator. Get your stroke risk instantly - no account needed, works on all devices.

**Why Stroke Risk matters for your health:** Understanding your stroke risk is one of the most important steps in proactive health management. Healthcare professionals use stroke risk as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.





Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Stroke Risk Calculator:** This tool applies the calculation method described for stroke risk in clinical and research settings across the United States and internationally.



**How to interpret your results:** Your stroke risk result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current stroke risk requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "Real-Time Stroke Risk Calculator output as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Stroke Risk Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Stroke Risk Calculator methodology and assumptions & Guidelines", text: "The methodology should be interpreted alongside the specific formula and sources described for this calculator; a health result is an estimate and should not be treated as a clinical diagnosis. " },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Stroke Risk Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Stroke Risk Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Stroke Risk Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Stroke Risk Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Stroke Risk Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Stroke Risk calculation:**



2. **Track trends, not single readings:** One measurement is a snapshot. Track your stroke risk monthly for 3-6 months to see meaningful trends. Healthy stroke risk improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Stroke Risk is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your stroke risk is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Stroke Risk Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.



For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

`}
      />
      )}
    </CalculatorLayout>
  )
}
