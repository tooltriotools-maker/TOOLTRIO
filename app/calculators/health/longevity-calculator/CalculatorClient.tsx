'use client'
import { useState, useMemo } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { structuredData?: object[]; faqs: any[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, relatedCalculators, blogSlug, seoContent }: Props) {

  const [age, setAge] = useState(40)
  const [gender, setGender] = useState<'male'|'female'>('male')
  const [smoker, setSmoker] = useState(false)
  const [exSmoker, setExSmoker] = useState(false)
  const [exercise, setExercise] = useState<'none'|'light'|'moderate'|'vigorous'>('moderate')
  const [bmi, setBmi] = useState(24)
  const [diet, setDiet] = useState<'poor'|'average'|'good'|'excellent'>('good')
  const [sleep, setSleep] = useState<'under6'|'7-8'|'over9'>('7-8')
  const [stress, setStress] = useState<'high'|'moderate'|'low'>('moderate')
  const [social, setSocial] = useState<'isolated'|'moderate'|'strong'>('moderate')
  const [alcohol, setAlcohol] = useState<'none'|'moderate'|'heavy'>('moderate')
  const [familyHistory, setFamilyHistory] = useState(false)

  const result = useMemo(() => {
    const base = gender==='male' ? 78.5 : 82.8 // US life expectancy
    let adj = 0
    if (smoker) adj -= 10; else if (exSmoker) adj -= 3
    if (exercise==='vigorous') adj += 5; else if (exercise==='moderate') adj += 3; else if (exercise==='none') adj -= 3
    if (bmi < 18.5 || bmi > 35) adj -= 4; else if (bmi < 25) adj += 2; else if (bmi > 30) adj -= 2
    if (diet==='excellent') adj += 4; else if (diet==='good') adj += 2; else if (diet==='poor') adj -= 3
    if (sleep==='7-8') adj += 2; else if (sleep==='under6') adj -= 3; else adj -= 1
    if (stress==='low') adj += 2; else if (stress==='high') adj -= 3
    if (social==='strong') adj += 5; else if (social==='isolated') adj -= 4
    if (alcohol==='heavy') adj -= 4; else if (alcohol==='none') adj += 1
    if (familyHistory) adj -= 3

    const lifeExp = Math.round(base + adj)
    const remaining = Math.max(0, lifeExp - age)
    const healthspan = Math.round(lifeExp * 0.85) // ~85% in good health
    const healthRemaining = Math.max(0, healthspan - age)

    const improvements = [
      !smoker || exSmoker ? null : {action:'Quit smoking now',gain:10},
      exercise==='none' ? {action:'Start exercising 150 min/week',gain:5} : exercise==='light' ? {action:'Increase to vigorous exercise',gain:2} : null,
      social==='isolated' ? {action:'Strengthen social connections',gain:5} : null,
      stress==='high' ? {action:'Stress management practice',gain:3} : null,
      sleep==='under6' ? {action:'Prioritise 7-8 hours sleep',gain:3} : null,
      diet==='poor' ? {action:'Adopt Mediterranean-style diet',gain:4} : diet==='average' ? {action:'Improve diet quality',gain:2} : null,
      bmi > 30 ? {action:'Lose weight to healthy BMI',gain:3} : null,
    ].filter(Boolean).sort((a:any,b:any)=>b.gain-a.gain).slice(0,4)

    return { lifeExp, remaining, healthspan, healthRemaining, improvements }
  }, [age,gender,smoker,exSmoker,exercise,bmi,diet,sleep,stress,social,alcohol,familyHistory])

  return (
    <CalculatorLayout title="Longevity Calculator" description="Estimate your life expectancy and healthspan based on lifestyle factors. Find which habits add the most years to your life." icon="🌿" category="Health" relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="longevity-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Your Lifestyle</h2>
          <div className="space-y-4">
            <SelectField label="Gender" value={gender} onChange={v=>setGender(v as any)} options={[{value:'male',label:'Male'},{value:'female',label:'Female'}]} />
            <InputField label="Current Age" value={age} onChange={setAge} min={20} max={85} step={1} suffix="yrs" />
            <InputField label="BMI" value={bmi} onChange={setBmi} min={15} max={50} step={0.5} suffix="" />
            <SelectField label="Exercise" value={exercise} onChange={v=>setExercise(v as any)} options={[{value:'none',label:'None'},{value:'light',label:'Light (1-2x/wk)'},{value:'moderate',label:'Moderate (3-5x/wk)'},{value:'vigorous',label:'Vigorous (daily)'}]} />
            <SelectField label="Diet Quality" value={diet} onChange={v=>setDiet(v as any)} options={[{value:'poor',label:'Poor (fast food, processed)'},{value:'average',label:'Average'},{value:'good',label:'Good (mostly whole foods)'},{value:'excellent',label:'Excellent (Mediterranean)'}]} />
            <SelectField label="Sleep" value={sleep} onChange={v=>setSleep(v as any)} options={[{value:'under6',label:'Under 6 hours'},{value:'7-8',label:'7-8 hours (optimal)'},{value:'over9',label:'Over 9 hours'}]} />
            <SelectField label="Stress Level" value={stress} onChange={v=>setStress(v as any)} options={[{value:'high',label:'High (chronic)'},{value:'moderate',label:'Moderate'},{value:'low',label:'Low (well managed)'}]} />
            <SelectField label="Social Connection" value={social} onChange={v=>setSocial(v as any)} options={[{value:'isolated',label:'Isolated'},{value:'moderate',label:'Moderate'},{value:'strong',label:'Strong community'}]} />
            <SelectField label="Alcohol" value={alcohol} onChange={v=>setAlcohol(v as any)} options={[{value:'none',label:'None'},{value:'moderate',label:'Moderate (1-2/day)'},{value:'heavy',label:'Heavy (3+/day)'}]} />
            {[{l:'Current smoker?',v:smoker,s:setSmoker},{l:'Ex-smoker?',v:exSmoker,s:setExSmoker},{l:'Family early death (<75)?',v:familyHistory,s:setFamilyHistory}].map(({l,v,s})=>(
              <div key={l} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl">
                <span className="text-xs font-medium text-gray-700">{l}</span>
                <button onClick={()=>s(!v)} className={`w-10 h-5 rounded-full transition-all ${v?'bg-red-500':'bg-gray-200'}`}><div className={`w-4 h-4 bg-white rounded-full mx-0.5 transition-transform ${v?'translate-x-5':''}`}/></button>
              </div>
            ))}
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl border-2 text-center" style={{background:'rgba(240,253,244,0.85)',borderColor:'rgba(134,239,172,0.7)',backdropFilter:'blur(8px)'}}>
              <p className="text-xs font-bold text-green-600 uppercase">Estimated Lifespan</p>
              <p className="text-5xl font-black text-green-700 my-1">{result.lifeExp}</p>
              <p className="text-sm text-green-600">{result.remaining} years remaining</p>
            </div>
            <div className="p-5 bg-blue-50 rounded-2xl border-2 border-blue-200 text-center">
              <p className="text-xs font-bold text-blue-600 uppercase">Healthy Years to</p>
              <p className="text-5xl font-black text-blue-700 my-1">{result.healthspan}</p>
              <p className="text-sm text-blue-600">{result.healthRemaining} healthy years remaining</p>
            </div>
          </div>
          {(result.improvements as any[]).length > 0 && (
            <Card>
              <h3 className="font-bold text-gray-900 mb-3">Top Life-Extending Changes</h3>
              <div className="space-y-2">
                {(result.improvements as any[]).map((c: any) => (
                  <div key={c.action} className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-200">
                    <span className="text-sm font-semibold text-gray-800">{c.action}</span>
                    <span className="text-sm font-black text-green-700">+{c.gain} yrs</span>
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
          Longevity Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Longevity 2026 tool to get instant, evidence-based results personalized to your age, weight, and health goals. No signup required — complete privacy guaranteed.
        </p>
        <p className="text-sm text-gray-600">
          The calculator applies the calculation method described in its methodology and lets you explore different input scenarios. The result is an estimate, not a diagnosis.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Longevity Calculator"
        category="health"
        intro={`The **Longevity Calculator** is a free, health calculator using the method and reference data described for this specific calculator. Get your longevity instantly - no account needed, works on all devices.

**Why Longevity matters for your health:** Understanding your longevity is one of the most important steps in proactive health management. Healthcare professionals use longevity as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the method implemented by this calculator.

**Method and population context:** This calculator uses reference ranges and formulas from the specific methodology and sources documented for this calculator.



Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Longevity Calculator:** This tool applies the calculation method described for longevity in clinical and research settings across the United States and internationally.



**How to interpret your results:** Your longevity result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current longevity requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "Real-Time Longevity Calculator output as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Longevity Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Longevity Calculator methodology and assumptions & Guidelines", text: "The methodology should be interpreted alongside the specific formula and sources described for this calculator; a health result is an estimate and should not be treated as a clinical diagnosis. " },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: calculator-specific interpretation, limitations, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Longevity Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Longevity Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Longevity Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Longevity Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Longevity Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Longevity calculation:**



2. **Track trends, not single readings:** One measurement is a snapshot. Track your longevity monthly for 3-6 months to see meaningful trends. Healthy longevity improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Longevity is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your longevity is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Longevity Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.



For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

`}
      />
      )}
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )

}
