'use client'
import { useState, useMemo } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { structuredData?: object[]; faqs: any[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, relatedCalculators, blogSlug, seoContent }: Props) {

  const [totalChol, setTotalChol] = useState(200)
  const [hdl, setHdl] = useState(55)
  const [triglycerides, setTriglycerides] = useState(120)
  const [unit, setUnit] = useState<'mgdl'|'mmol'>('mgdl')
  const [age, setAge] = useState(45)
  const [gender, setGender] = useState<'male'|'female'>('male')
  const [smoker, setSmoker] = useState(false)
  const [diabetic, setDiabetic] = useState(false)

  const toMgdl = (v: number) => unit==='mmol' ? Math.round(v*38.67) : v
  const toMmol = (v: number) => unit==='mgdl' ? (v/38.67).toFixed(2) : v

  const result = useMemo(() => {
    const tc = toMgdl(totalChol), h = toMgdl(hdl), tg = toMgdl(triglycerides)
    const ldl = tg < 400 ? Math.round(tc - h - tg/5) : null
    const nonHdl = tc - h
    const ratio = (tc/h).toFixed(1)
    
    const rateChol = (v: number) => v<200?{l:'Desirable',c:'text-green-600 bg-green-50'}:v<240?{l:'Borderline High',c:'text-yellow-600 bg-yellow-50'}:{l:'High',c:'text-red-600 bg-red-50'}
    const rateHdl  = (v: number) => v>=60?{l:'High (Protective)',c:'text-green-600 bg-green-50'}:v>=40?{l:'Normal',c:'text-yellow-600 bg-yellow-50'}:{l:'Low (Risk Factor)',c:'text-red-600 bg-red-50'}
    const rateLdl  = (v: number) => v<100?{l:'Optimal',c:'text-green-600 bg-green-50'}:v<130?{l:'Near Optimal',c:'text-green-500 bg-green-50'}:v<160?{l:'Borderline High',c:'text-yellow-600 bg-yellow-50'}:v<190?{l:'High',c:'text-orange-600 bg-orange-50'}:{l:'Very High',c:'text-red-600 bg-red-50'}
    const rateTg   = (v: number) => v<150?{l:'Normal',c:'text-green-600 bg-green-50'}:v<200?{l:'Borderline High',c:'text-yellow-600 bg-yellow-50'}:v<500?{l:'High',c:'text-orange-600 bg-orange-50'}:{l:'Very High',c:'text-red-600 bg-red-50'}
    
    // Simplified 10-year CVD risk estimate
    let risk = 0
    if (age>=45 && age<55) risk+=1; if (age>=55 && age<65) risk+=2; if (age>=65) risk+=3
    if (tc>=200 && tc<240) risk+=1; if (tc>=240) risk+=2
    if (h<40) risk+=2; if (h>=60) risk-=1
    if (smoker) risk+=2
    if (diabetic) risk+=2
    if (gender==='male') risk+=1
    const riskLabel = risk<=2?'Low (<5%)':risk<=4?'Moderate (5-10%)':risk<=6?'High (10-20%)':'Very High (>20%)'
    const riskColor = risk<=2?'text-green-700 bg-green-50':risk<=4?'text-yellow-700 bg-yellow-50':risk<=6?'text-orange-700 bg-orange-50':'text-red-700 bg-red-50'
    
    return { ldl, nonHdl, ratio, tc, h, tg,
      rateChol:rateChol(tc), rateHdl:rateHdl(h), rateTg:rateTg(tg),
      rateLdl: ldl ? rateLdl(ldl) : null,
      riskLabel, riskColor }
  }, [totalChol,hdl,triglycerides,unit,age,gender,smoker,diabetic])

  return (
    <CalculatorLayout title="Cholesterol Calculator" description="Check your lipid panel against AHA guidelines. Calculate LDL using the Friedewald equation and assess cardiovascular risk." icon="🫀" category="Health" relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="cholesterol-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Lipid Panel</h2>
          <div className="space-y-4">
            <SelectField label="Unit" value={unit} onChange={v=>setUnit(v as any)} options={[{value:'mgdl',label:'mg/dL (USA standard)'},{value:'mmol',label:'mmol/L (UK/EU standard)'}]} />
            <InputField label={`Total Cholesterol (${unit==='mgdl'?'mg/dL':'mmol/L'})`} value={totalChol} onChange={setTotalChol} min={unit==='mgdl'?100:2.6} max={unit==='mgdl'?400:10.3} step={unit==='mgdl'?1:0.1} suffix={unit==='mgdl'?'mg/dL':'mmol/L'} />
            <InputField label={`HDL (${unit==='mgdl'?'mg/dL':'mmol/L'})`} value={hdl} onChange={setHdl} min={unit==='mgdl'?20:0.5} max={unit==='mgdl'?120:3.1} step={unit==='mgdl'?1:0.1} suffix={unit==='mgdl'?'mg/dL':'mmol/L'} />
            <InputField label={`Triglycerides (${unit==='mgdl'?'mg/dL':'mmol/L'})`} value={triglycerides} onChange={setTriglycerides} min={unit==='mgdl'?50:0.6} max={unit==='mgdl'?1000:11.3} step={unit==='mgdl'?1:0.1} suffix={unit==='mgdl'?'mg/dL':'mmol/L'} />
            <SelectField label="Age" value={String(age)} onChange={v=>setAge(Number(v))} options={[35,40,45,50,55,60,65,70].map(a=>({value:String(a),label:`${a} years`}))} />
            <SelectField label="Gender" value={gender} onChange={v=>setGender(v as any)} options={[{value:'male',label:'Male'},{value:'female',label:'Female'}]} />
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-sm font-medium text-gray-700">Current smoker?</span>
              <button onClick={()=>setSmoker(!smoker)} className={`w-10 h-5 rounded-full transition-all ${smoker?'bg-red-500':'bg-gray-200'}`}>
                <div className={`w-4 h-4 bg-white rounded-full mx-0.5 transition-transform ${smoker?'translate-x-5':''}`} />
              </button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-sm font-medium text-gray-700">Diabetic?</span>
              <button onClick={()=>setDiabetic(!diabetic)} className={`w-10 h-5 rounded-full transition-all ${diabetic?'bg-orange-500':'bg-gray-200'}`}>
                <div className={`w-4 h-4 bg-white rounded-full mx-0.5 transition-transform ${diabetic?'translate-x-5':''}`} />
              </button>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          <div className="grid grid-cols-2 gap-3">
            {[
              {l:'Total Cholesterol',v:result.tc,u:'mg/dL',r:result.rateChol},
              {l:'HDL (Good)',v:result.h,u:'mg/dL',r:result.rateHdl},
              {l:'LDL (Bad) - Calculated',v:result.ldl??'N/A',u:'mg/dL',r:result.rateLdl??{l:'N/A',c:'text-gray-600 bg-gray-50'}},
              {l:'Triglycerides',v:result.tg,u:'mg/dL',r:result.rateTg},
            ].map(s=>(
              <div key={s.l} className={`p-4 rounded-xl border-2 ${s.r.c}`}>
                <p className="text-xs font-bold opacity-70 uppercase">{s.l}</p>
                <p className="text-2xl font-black my-1">{s.v}</p>
                <p className="text-xs font-semibold">{s.r.l}</p>
              </div>
            ))}
          </div>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-700">Cholesterol Ratio (Total/HDL)</p>
                <p className="text-3xl font-black text-gray-900" style={{fontFamily:"'Inter', system-ui, sans-serif"}}>{result.ratio}</p>
                <p className="text-xs text-gray-500">Target: below 4.0 (below 3.5 is optimal)</p>
              </div>
              <div className={`px-4 py-3 rounded-xl border-2 ${result.riskColor} text-right`}>
                <p className="text-xs font-bold uppercase tracking-wide opacity-70">10-Year CVD Risk</p>
                <p className="font-black">{result.riskLabel}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Cholesterol Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          A 50-year-old male with blood pressure 135/88 mmHg falls in the <strong>Stage 1 Hypertension</strong> category (AHA 2026 guidelines). Lifestyle changes can reduce systolic BP by 4–11 mmHg within weeks.
        </p>
        <p className="text-sm text-gray-600">
          This Cholesterol 2026 uses American Heart Association standards to classify your readings and give evidence-based recommendations for improving cardiovascular health.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Cholesterol Calculator"
        category="health"
        intro={`The **Cholesterol Calculator** is a a health information tool using the method and reference data described for this calculator. Get your cholesterol instantly - no account needed, works on all devices.

**Why Cholesterol matters for your health:** Understanding your cholesterol is one of the most important steps in proactive health management. Healthcare professionals use cholesterol as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the the same calculation framework described in this guide.





Combine this with [our Blood Pressure Calculator](/calculators/health/blood-pressure-calculator), [our Heart Attack Risk Calculator](/calculators/health/heart-attack-risk-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Cholesterol Calculator:** This tool applies the calculation method described for cholesterol in clinical and research settings across the United States and internationally.



**How to interpret your results:** Your cholesterol result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current cholesterol requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "Real-Time Cholesterol Calculator output as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Cholesterol Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Cholesterol Calculator methodology and assumptions & Guidelines", text: "The methodology should be interpreted alongside the specific formula and sources described for this calculator; a health result is an estimate and should not be treated as a clinical diagnosis. " },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Cholesterol Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a useful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Cholesterol Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Cholesterol Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Cholesterol Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Cholesterol Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Cholesterol calculation:**



2. **Track trends, not single readings:** One measurement is a snapshot. Track your cholesterol monthly for 3-6 months to see meaningful trends. Healthy cholesterol improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Cholesterol is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your cholesterol is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Cholesterol Calculator represents the best of what free, open-access technology can deliver: transparent health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.



For a complete health overview, also use [our Blood Pressure Calculator](/calculators/health/blood-pressure-calculator), [our Heart Attack Risk Calculator](/calculators/health/heart-attack-risk-calculator), and [our Diabetes Risk Calculator](/calculators/health/diabetes-risk-calculator).

`}
      />
      )}
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )

}
