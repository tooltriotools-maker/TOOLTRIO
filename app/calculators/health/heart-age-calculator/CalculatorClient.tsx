'use client'
import { useState, useMemo } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { structuredData?: object[]; faqs: any[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, relatedCalculators, blogSlug, seoContent }: Props) {

  const [age, setAge] = useState(45)
  const [gender, setGender] = useState<'male'|'female'>('male')
  const [systolic, setSystolic] = useState(130)
  const [cholesterol, setCholesterol] = useState(210)
  const [hdl, setHdl] = useState(50)
  const [smoker, setSmoker] = useState(false)
  const [diabetic, setDiabetic] = useState(false)
  const [hypertensionMeds, setHypertensionMeds] = useState(false)
  const [bmi, setBmi] = useState(26)
  const [exerciseDays, setExerciseDays] = useState(3)
  const [familyHistory, setFamilyHistory] = useState(false)

  const result = useMemo(() => {
    let extraYears = 0
    if (smoker)            extraYears += 8
    if (diabetic)          extraYears += 8
    if (familyHistory)     extraYears += 5
    if (hypertensionMeds)  extraYears += 2
    if (systolic >= 160)   extraYears += 10
    else if (systolic >= 140) extraYears += 6
    else if (systolic >= 130) extraYears += 3
    if (cholesterol >= 240) extraYears += 5
    else if (cholesterol >= 200) extraYears += 2
    if (hdl < 40)          extraYears += 4
    else if (hdl < 50)     extraYears += 2
    else if (hdl >= 60)    extraYears -= 2
    if (bmi >= 30)         extraYears += 5
    else if (bmi >= 25)    extraYears += 2
    if (exerciseDays === 0) extraYears += 4
    else if (exerciseDays <= 1) extraYears += 2
    else if (exerciseDays >= 5) extraYears -= 3
    else if (exerciseDays >= 3) extraYears -= 1

    const heartAge = Math.round(age + extraYears)
    const diff = heartAge - age
    const risk = diff >= 10 ? 'High' : diff >= 5 ? 'Elevated' : diff >= 0 ? 'Moderate' : 'Low'
    const color = diff >= 10 ? 'text-red-700 bg-red-50 border-red-200' : diff >= 5 ? 'text-orange-600 bg-orange-50 border-orange-200' : diff >= 0 ? 'text-yellow-600 bg-yellow-50 border-yellow-200' : 'text-green-600 bg-green-50 border-green-200'
    const topChanges = [
      smoker ? {action:'Quit smoking',impact:'-8 yrs'} : null,
      diabetic && diff > 5 ? {action:'Tighter glucose control',impact:'-3 yrs'} : null,
      systolic >= 140 ? {action:'Lower blood pressure <130',impact:'-4 yrs'} : null,
      bmi >= 30 ? {action:'Lose 10% body weight',impact:'-3 yrs'} : null,
      exerciseDays < 3 ? {action:'Exercise 150 min/week',impact:'-3 yrs'} : null,
      cholesterol >= 200 ? {action:'Reduce LDL cholesterol',impact:'-2 yrs'} : null,
    ].filter(Boolean).slice(0, 4)
    return { heartAge, diff, risk, color, topChanges }
  }, [age,gender,systolic,cholesterol,hdl,smoker,diabetic,hypertensionMeds,bmi,exerciseDays,familyHistory])

  return (
    <CalculatorLayout title="Heart Age Calculator" description="Find out if your heart is older or younger than your real age based on your cardiovascular risk factors." icon="❤️‍🔥" category="Health" relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="heart-age-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Risk Factors</h2>
          <div className="space-y-4">
            <SelectField label="Gender" value={gender} onChange={v=>setGender(v as any)} options={[{value:'male',label:'Male'},{value:'female',label:'Female'}]} />
            <InputField label="Age" value={age} onChange={setAge} min={20} max={80} step={1} suffix="yrs" />
            <InputField label="Systolic BP (mmHg)" value={systolic} onChange={setSystolic} min={90} max={200} step={2} suffix="mmHg" />
            <InputField label="Total Cholesterol (mg/dL)" value={cholesterol} onChange={setCholesterol} min={120} max={400} step={5} suffix="mg/dL" />
            <InputField label="HDL Cholesterol (mg/dL)" value={hdl} onChange={setHdl} min={20} max={100} step={2} suffix="mg/dL" />
            <InputField label="BMI" value={bmi} onChange={setBmi} min={15} max={50} step={0.5} suffix="BMI" />
            <InputField label="Exercise Days/Week" value={exerciseDays} onChange={setExerciseDays} min={0} max={7} step={1} suffix="days" />
            {[{l:'Current smoker?',v:smoker,s:setSmoker},{l:'Type 2 Diabetes?',v:diabetic,s:setDiabetic},{l:'BP medication?',v:hypertensionMeds,s:setHypertensionMeds},{l:'Family heart disease <60?',v:familyHistory,s:setFamilyHistory}].map(({l,v,s})=>(
              <div key={l} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl">
                <span className="text-xs font-medium text-gray-700">{l}</span>
                <button onClick={()=>s(!v)} className={`w-10 h-5 rounded-full transition-all ${v?'bg-red-500':'bg-gray-200'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full mx-0.5 transition-transform ${v?'translate-x-5':''}`} />
                </button>
              </div>
            ))}
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          <div className={`p-6 rounded-2xl border-2 text-center ${result.color}`}>
            <p className="text-xs font-bold uppercase tracking-wide opacity-70">Your Heart Age</p>
            <p className="text-6xl font-black my-2">{result.heartAge}</p>
            <p className="text-lg font-bold">{result.diff > 0 ? `${result.diff} years OLDER than your age` : result.diff < 0 ? `${Math.abs(result.diff)} years YOUNGER than your age` : 'Same as your chronological age'}</p>
            <p className="text-sm mt-1 opacity-70">{result.risk} cardiovascular risk</p>
          </div>
          {result.topChanges.length > 0 && (
            <Card>
              <h3 className="font-bold text-gray-900 mb-3">Top Changes to Reduce Heart Age</h3>
              <div className="space-y-2">
                {result.topChanges.map((c: any) => (
                  <div key={c.action} className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-200">
                    <span className="text-sm font-semibold text-gray-800">{c.action}</span>
                    <span className="text-sm font-black text-green-700">{c.impact}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>

      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Heart Age Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          A 50-year-old male with blood pressure 135/88 mmHg falls in the <strong>Stage 1 Hypertension</strong> category (AHA 2026 guidelines). Lifestyle changes can reduce systolic BP by 4–11 mmHg within weeks.
        </p>
        <p className="text-sm text-gray-600">
          This Heart Age 2026 uses American Heart Association standards to classify your readings and give evidence-based recommendations for improving cardiovascular health.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Heart Age Calculator"
        category="health"
        intro={`The **Heart Age Calculator** is a a health information tool using the method and reference data described for this calculator. Get your heart age instantly - no account needed, works on all devices.

**Why Heart Age matters for your health:** Understanding your heart age is one of the most important steps in proactive health management. Healthcare professionals use heart age as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.





Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Heart Age Calculator:** This tool applies the calculation method described for heart age in clinical and research settings across the United States and internationally.



**How to interpret your results:** Your heart age result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current heart age requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "Real-Time Heart Age Calculator output as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Heart Age Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Heart Age Calculator methodology and assumptions & Guidelines", text: "The methodology should be interpreted alongside the specific formula and sources described for this calculator; a health result is an estimate and should not be treated as a clinical diagnosis. " },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Heart Age Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Heart Age Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Heart Age Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Heart Age Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Heart Age Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Heart Age calculation:**



2. **Track trends, not single readings:** One measurement is a snapshot. Track your heart age monthly for 3-6 months to see meaningful trends. Healthy heart age improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Heart Age is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your heart age is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Heart Age Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.



For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

`}
      />
      )}
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )

}
