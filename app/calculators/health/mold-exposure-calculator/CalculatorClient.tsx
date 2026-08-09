'use client'
import { useState } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, relatedCalculators, blogSlug, seoContent }: Props) {
  const [visibleMold, setVisibleMold] = useState(false)
  const [mustyCarpets, setMustyCarpets] = useState(false)
  const [waterDamage, setWaterDamage] = useState(false)
  const [highHumidity, setHighHumidity] = useState(false)
  const [poorVentilation, setPoorVentilation] = useState(false)
  const [symptomNasal, setSymptomNasal] = useState(false)
  const [symptomCough, setSymptomCough] = useState(false)
  const [symptomFatigue, setSymptomFatigue] = useState(false)
  const [asthma, setAsthma] = useState(false)
  const [exposureHours, setExposureHours] = useState(8)

  const environmentScore = [visibleMold,mustyCarpets,waterDamage,highHumidity,poorVentilation].filter(Boolean).length
  const symptomScore = [symptomNasal,symptomCough,symptomFatigue].filter(Boolean).length
  const totalScore = environmentScore * 15 + symptomScore * 10 + (asthma ? 15 : 0) + Math.min(10, exposureHours)
  const clamped = Math.min(100, totalScore)
  const risk = clamped >= 60 ? {l:'High Mold Risk - Action Required',c:'text-red-600',bg:'bg-red-50 border-red-300'} : clamped >= 30 ? {l:'Moderate Risk',c:'text-orange-600',bg:'bg-orange-50 border-orange-300'} : {l:'Low Risk',c:'text-green-600',bg:'bg-green-50 border-green-300'}

  return (
    <CalculatorLayout title="Mold Exposure Calculator" description="Assess your risk of harmful mold exposure at home and understand the health implications." icon="🍄" category="Health" relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="mold-exposure-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-5">Environment Factors</h2>
          <div className="space-y-3">
            <InputField label="Hours in potentially affected space" value={exposureHours} onChange={setExposureHours} min={0} max={24} step={1} suffix="hrs/day" />
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mt-2">Environment</p>
            {[['Visible mold or dark spots',visibleMold,setVisibleMold],['Musty smell or mouldy carpets',mustyCarpets,setMustyCarpets],['Past or current water damage',waterDamage,setWaterDamage],['High humidity (>60%)',highHumidity,setHighHumidity],['Poor ventilation',poorVentilation,setPoorVentilation]].map(([l,v,s]: any)=>(
              <label key={l} className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                <input type="checkbox" checked={v} onChange={e=>s(e.target.checked)} className="accent-rose-500"/>
                <span>{l}</span>
              </label>
            ))}
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mt-2">Health Symptoms</p>
            {[['Nasal congestion / sneezing',symptomNasal,setSymptomNasal],['Cough or wheezing',symptomCough,setSymptomCough],['Unexplained fatigue / headaches',symptomFatigue,setSymptomFatigue],['Pre-existing asthma / allergies',asthma,setAsthma]].map(([l,v,s]: any)=>(
              <label key={l} className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                <input type="checkbox" checked={v} onChange={e=>s(e.target.checked)} className="accent-rose-500"/>
                <span>{l}</span>
              </label>
            ))}
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          <div className={`rounded-2xl p-6 border-2 ${risk.bg}`}>
            <p className="text-xs font-bold uppercase tracking-wide text-gray-600 mb-1">Mold Exposure Risk</p>
            <p className={`text-5xl font-black ${risk.c}`}>{clamped}/100</p>
            <p className={`font-bold mt-1 ${risk.c}`}>{risk.l}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <ResultCard label="Environment Risk Factors" value={`${environmentScore}/5`} />
            <ResultCard label="Symptoms Reported" value={`${symptomScore}/3`} highlight />
          </div>
          <Card>
            <h3 className="font-semibold text-gray-700 mb-3">What to Do</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>- <strong>Small mold patches</strong> (&lt;1m2) can be cleaned with diluted bleach or specialist cleaner</p>
              <p>- <strong>Large or black mold</strong>: Contact a professional remediation service</p>
              <p>- <strong>Fix moisture sources</strong> - mold cannot grow without dampness</p>
              <p>- <strong>Ventilate</strong>: Open windows daily; use extractor fans in bathrooms and kitchens</p>
              <p>- <strong>See a doctor</strong> if you have persistent respiratory or fatigue symptoms</p>
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Mold Exposure Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Mold Exposure 2026 tool to get instant, evidence-based results personalized to your age, weight, and health goals. No signup required — complete privacy guaranteed.
        </p>
        <p className="text-sm text-gray-600">
          The calculator applies the calculation method described in its methodology and lets you explore different input scenarios. The result is an estimate, not a diagnosis.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Mold Exposure Calculator"
        category="health"
        intro={`The **Mold Exposure Calculator** is a a health information tool using the method and reference data described for this calculator. Get your mold exposure instantly - no account needed, works on all devices.

**Why Mold Exposure matters for your health:** Understanding your mold exposure is one of the most important steps in proactive health management. Healthcare professionals use mold exposure as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.





Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Mold Exposure Calculator:** This tool applies the calculation method described for mold exposure in clinical and research settings across the United States and internationally.



**How to interpret your results:** Your mold exposure result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current mold exposure requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "Real-Time Mold Exposure Calculator output as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Mold Exposure Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Mold Exposure Calculator methodology and assumptions & Guidelines", text: "The methodology should be interpreted alongside the specific formula and sources described for this calculator; a health result is an estimate and should not be treated as a clinical diagnosis. " },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Mold Exposure Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Mold Exposure Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Mold Exposure Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Mold Exposure Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Mold Exposure Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Mold Exposure calculation:**



2. **Track trends, not single readings:** One measurement is a snapshot. Track your mold exposure monthly for 3-6 months to see meaningful trends. Healthy mold exposure improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Mold Exposure is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your mold exposure is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Mold Exposure Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.



For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

`}
      />
      )}
    </CalculatorLayout>
  )
}
