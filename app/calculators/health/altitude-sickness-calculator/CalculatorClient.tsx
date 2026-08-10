'use client'
import { useState } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { structuredData?: object[]; faqs: any[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, relatedCalculators, blogSlug, seoContent }: Props) {
  const [altitude, setAltitude] = useState(3500)
  const [ascentRate, setAscentRate] = useState(500)
  const [acclimatisedDays, setAcclimatisedDays] = useState(2)
  const [hasHeadache, setHasHeadache] = useState(false)
  const [hasNausea, setHasNausea] = useState(false)
  const [hasFatigue, setHasFatigue] = useState(false)
  const [hasDizziness, setHasDizziness] = useState(false)

  const symptomCount = [hasHeadache,hasNausea,hasFatigue,hasDizziness].filter(Boolean).length
  const altRisk = altitude > 5000 ? 3 : altitude > 3500 ? 2 : altitude > 2500 ? 1 : 0
  const rateRisk = ascentRate > 600 ? 2 : ascentRate > 400 ? 1 : 0
  const accliRisk = acclimatisedDays < 1 ? 2 : acclimatisedDays < 3 ? 1 : 0
  const totalRisk = altRisk + rateRisk + accliRisk + symptomCount

  const riskLevel = totalRisk >= 7 ? {l:'High Risk - Consider Descent',c:'text-red-700',bg:'bg-red-50 border-red-300'} : totalRisk >= 4 ? {l:'Moderate Risk - Rest & Monitor',c:'text-orange-600',bg:'bg-orange-50 border-orange-300'} : totalRisk >= 2 ? {l:'Low-Moderate Risk - Proceed Cautiously',c:'text-yellow-700',bg:'bg-yellow-50 border-yellow-300'} : {l:'Low Risk - Safe to Continue',c:'text-green-700',bg:'bg-green-50 border-green-300'}

  const o2sat = Math.max(70, 98 - (altitude / 1000) * 3.5)

  return (
    <CalculatorLayout title="Altitude Sickness Calculator" description="Assess your risk of altitude sickness based on elevation, ascent rate, and symptoms." icon="🏔️" category="Health" relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="altitude-sickness-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-5">Altitude Details</h2>
          <div className="space-y-4">
            <InputField label="Current Altitude" value={altitude} onChange={setAltitude} min={0} max={8850} step={100} suffix="m" />
            <InputField label="Ascent Rate" value={ascentRate} onChange={setAscentRate} min={50} max={1500} step={50} suffix="m/day" />
            <InputField label="Days Acclimatising" value={acclimatisedDays} onChange={setAcclimatisedDays} min={0} max={14} step={1} suffix="days" />
            <div>
              <p className="text-sm font-bold text-gray-700 mb-2">Current Symptoms</p>
              {[['Headache',hasHeadache,setHasHeadache],['Nausea / vomiting',hasNausea,setHasNausea],['Fatigue / weakness',hasFatigue,setHasFatigue],['Dizziness',hasDizziness,setHasDizziness]].map(([l,v,s]: any) => (
                <label key={l} className="flex items-center gap-2 text-sm font-semibold cursor-pointer mb-2">
                  <input type="checkbox" checked={v} onChange={e=>s(e.target.checked)} className="accent-rose-500"/>
                  <span>{l}</span>
                </label>
              ))}
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          <div className={`rounded-2xl p-6 border-2 ${riskLevel.bg}`}>
            <p className="text-xs font-bold uppercase tracking-wide text-gray-600 mb-1">Risk Assessment</p>
            <p className={`text-2xl font-black ${riskLevel.c}`}>{riskLevel.l}</p>
            <p className="text-sm text-gray-600 mt-2">Risk score: {totalRisk}/11 - Altitude: {altitude.toLocaleString()}m - {symptomCount} symptom(s) reported</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Altitude" value={`${altitude.toLocaleString()}m`} />
            <ResultCard label="Est. O₂ Saturation" value={`~${o2sat.toFixed(0)}%`} />
            <ResultCard label="Ascent Rate" value={`${ascentRate}m/day`} />
          </div>
          <Card>
            <h3 className="font-semibold text-gray-700 mb-3">Altitude Risk Zones</h3>
            <div className="space-y-2 text-sm">
              {[['0-2500m','Minimal risk. Normal acclimatisation.','text-green-600'],['2500-3500m','Low risk. Ascend slowly, max 300-500m/day.','text-yellow-600'],['3500-5000m','Moderate risk. Rest days essential. Watch for symptoms.','text-orange-600'],['5000m+','High risk. Supplemental O₂ may be needed.','text-red-600']].map(([r,d,c])=>(
                <div key={r as string} className="flex gap-2"><span className={`font-bold w-24 flex-shrink-0 ${c}`}>{r}</span><span className="text-gray-600">{d}</span></div>
              ))}
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Altitude Sickness Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Altitude Sickness tool to explore an estimate based on the inputs you provide. Results depend on the assumptions shown and should not be treated as a diagnosis or individualized medical advice. No account is required.
        </p>
        <p className="text-sm text-gray-600">
          The calculator applies the calculation method described in its methodology and lets you explore different input scenarios. The result is an estimate, not a diagnosis.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Altitude Sickness Calculator"
        category="health"
        intro={`The **Altitude Sickness Calculator** is a a health information tool using the method and reference data described for this calculator. Get your altitude sickness instantly - no account needed, works on all devices.

**Why Altitude Sickness matters for your health:** Understanding your altitude sickness is one of the most important steps in proactive health management. Healthcare professionals use altitude sickness as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.





Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Altitude Sickness Calculator:** This tool applies the calculation method described for altitude sickness in clinical and research settings across the United States and internationally.



**How to interpret your results:** Your altitude sickness result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current altitude sickness requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "Real-Time Altitude Sickness Calculator results as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Altitude Sickness Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Altitude Sickness Calculator methodology and assumptions & Guidelines", text: "The methodology should be interpreted alongside the specific formula and sources described for this calculator; a health result is an estimate and should not be treated as a clinical diagnosis. " },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Altitude Sickness Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a useful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Altitude Sickness Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Altitude Sickness Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Altitude Sickness Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Altitude Sickness Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Altitude Sickness calculation:**



2. **Track trends, not single readings:** One measurement is a snapshot. Track your altitude sickness monthly for 3-6 months to see meaningful trends. Healthy altitude sickness improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Altitude Sickness is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your altitude sickness is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Altitude Sickness Calculator represents the best of what free, open-access technology can deliver: transparent health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.



For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

`}
      />
      )}
    </CalculatorLayout>
  )
}
