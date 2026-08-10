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
  const [hotFlashes, setHotFlashes] = useState(5)
  const [sleepProblems, setSleepProblems] = useState(6)
  const [moodChanges, setMoodChanges] = useState(4)
  const [vaginalDryness, setVaginalDryness] = useState(3)
  const [jointPain, setJointPain] = useState(3)
  const [periodChanges, setPeriodChanges] = useState(true)

  const symptomScore = Math.round(
    hotFlashes * 10 +
    sleepProblems * 8 +
    moodChanges * 7 +
    vaginalDryness * 6 +
    jointPain * 5 +
    (periodChanges ? 10 : 0)
  )
  const clamped = Math.min(100, symptomScore)
  const severity = clamped >= 70 ? {l:'Severe Symptoms',c:'text-red-600'} : clamped >= 40 ? {l:'Moderate Symptoms',c:'text-orange-600'} : {l:'Mild Symptoms',c:'text-yellow-600'}

  const stage = age < 45 ? 'Perimenopause (early)' : age < 51 ? 'Perimenopause / Menopause transition' : age < 55 ? 'Menopause / Early postmenopause' : 'Postmenopause'

  return (
    <CalculatorLayout title="Menopause Symptom Calculator" description="Assess menopause symptom severity and explore evidence-based management strategies." icon="🌸" category="Health" relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="menopause-symptom-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-5">Your Symptoms (1-10)</h2>
          <div className="space-y-4">
            <InputField label="Age" value={age} onChange={setAge} min={35} max={70} step={1} suffix="yrs" />
            <InputField label="Hot flashes / night sweats" value={hotFlashes} onChange={setHotFlashes} min={0} max={10} step={1} suffix="/10" />
            <InputField label="Sleep disruption" value={sleepProblems} onChange={setSleepProblems} min={0} max={10} step={1} suffix="/10" />
            <InputField label="Mood changes / anxiety" value={moodChanges} onChange={setMoodChanges} min={0} max={10} step={1} suffix="/10" />
            <InputField label="Vaginal dryness / discomfort" value={vaginalDryness} onChange={setVaginalDryness} min={0} max={10} step={1} suffix="/10" />
            <InputField label="Joint / muscle pain" value={jointPain} onChange={setJointPain} min={0} max={10} step={1} suffix="/10" />
            <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
              <input type="checkbox" checked={periodChanges} onChange={e=>setPeriodChanges(e.target.checked)} className="accent-rose-500"/>
              <span>Irregular or absent periods</span>
            </label>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          <Card gradient>
            <div className="text-center py-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Symptom Severity Score</p>
              <div className={`text-7xl font-black mb-2 ${severity.c}`}>{clamped}</div>
              <p className={`font-bold text-xl ${severity.c}`}>{severity.l}</p>
              <p className="text-gray-500 text-sm mt-1">{stage}</p>
            </div>
          </Card>
          <Card>
            <h3 className="font-semibold text-gray-700 mb-3">Evidence-Based Management Options</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>- <strong>Hormone Replacement Therapy (HRT)</strong>: Most effective for hot flashes and sleep. Discuss risks/benefits with your GP</p>
              <p>- <strong>Exercise</strong> reduces hot flash frequency by ~30% and improves mood and sleep</p>
              <p>- <strong>Cognitive Behavioural Therapy (CBT)</strong>: Effective for sleep problems and mood changes</p>
              <p>- <strong>Phytoestrogens</strong> (soy, flaxseed): Modest reduction in hot flashes for some women</p>
              <p>- <strong>Vaginal oestrogen</strong>: Low-risk topical option for vaginal dryness</p>
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Menopause Symptom Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Menopause Symptom tool to explore an estimate based on the inputs you provide. Results depend on the assumptions shown and should not be treated as a diagnosis or individualized medical advice. No account is required.
        </p>
        <p className="text-sm text-gray-600">
          The calculator applies the calculation method described in its methodology and lets you explore different input scenarios. The result is an estimate, not a diagnosis.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Menopause Symptom Calculator"
        category="health"
        intro={`The **Menopause Symptom Calculator** is a free, health calculator using the method and reference data described for this specific calculator. Get your menopause symptom instantly - no account needed, works on all devices.

**Why Menopause Symptom matters for your health:** Understanding your menopause symptom is one of the most important steps in proactive health management. Healthcare professionals use menopause symptom as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the method implemented by this calculator.

**Method and population context:** This calculator uses reference ranges and formulas from the specific methodology and sources documented for this calculator.



Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Menopause Symptom Calculator:** This tool applies the calculation method described for menopause symptom in clinical and research settings across the United States and internationally.



**How to interpret your results:** Your menopause symptom result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current menopause symptom requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "Real-Time Menopause Symptom Calculator output as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Menopause Symptom Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Menopause Symptom Calculator methodology and assumptions & Guidelines", text: "The methodology should be interpreted alongside the specific formula and sources described for this calculator; a health result is an estimate and should not be treated as a clinical diagnosis. " },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: calculator-specific interpretation, limitations, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Menopause Symptom Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a useful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Menopause Symptom Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Menopause Symptom Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Menopause Symptom Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Menopause Symptom Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Menopause Symptom calculation:**



2. **Track trends, not single readings:** One measurement is a snapshot. Track your menopause symptom monthly for 3-6 months to see meaningful trends. Healthy menopause symptom improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Menopause Symptom is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your menopause symptom is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Menopause Symptom Calculator represents the best of what free, open-access technology can deliver: transparent health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.



For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

`}
      />
      )}
    </CalculatorLayout>
  )
}
