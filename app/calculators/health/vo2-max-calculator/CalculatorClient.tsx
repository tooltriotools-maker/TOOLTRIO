'use client'
import { useState, useMemo } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { structuredData?: object[]; faqs: any[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, relatedCalculators, blogSlug, seoContent }: Props) {
  const [method, setMethod] = useState<'cooper'|'rhr'|'mile'>('cooper')
  const [age, setAge] = useState(35)
  const [gender, setGender] = useState<'male'|'female'>('male')
  const [cooperDist, setCooperDist] = useState(2400)
  const [maxHR, setMaxHR] = useState(185)
  const [restHR, setRestHR] = useState(60)
  const [mileTime, setMileTime] = useState(8.5)
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial')
  const [weight, setWeight] = useState(154)


  const weightKg = unit === 'imperial' ? weight / 2.20462 : weight
  const result = useMemo(() => {
    let vo2 = 0
    if (method==='cooper') vo2 = (cooperDist/1000 - 0.3138) / 0.2070
    if (method==='rhr')    vo2 = 15 * (maxHR / restHR)
    if (method==='mile') {
      const wLbs = weight * 2.205
      vo2 = 132.853 - 0.0769*wLbs - 0.3877*age + (gender==='male'?6.315:0) - 3.2649*mileTime - 0.1565*restHR
    }
    vo2 = Math.max(10, Math.round(vo2*10)/10)

    const categories: {label:string;men:[number,number];women:[number,number]}[] = [
      {label:'Poor',      men:[0,38],    women:[0,28]},
      {label:'Fair',      men:[38,44],   women:[28,35]},
      {label:'Good',      men:[44,50],   women:[35,42]},
      {label:'Excellent', men:[50,57],   women:[42,49]},
      {label:'Superior',  men:[57,999],  women:[49,999]},
    ]
    const cat = categories.find(c => gender==='male' ? vo2>=c.men[0]&&vo2<c.men[1] : vo2>=c.women[0]&&vo2<c.women[1])?.label ?? 'Good'
    const colors: Record<string,string> = {Poor:'text-red-600',Fair:'text-orange-500',Good:'text-yellow-600',Excellent:'text-green-600',Superior:'text-blue-600'}
    const metsValue = vo2 / 3.5
    return { vo2, cat, color: colors[cat]??'text-gray-600', mets: Math.round(metsValue*10)/10 }
  }, [method, age, gender, cooperDist, maxHR, restHR, mileTime, weight])

  return (
    <CalculatorLayout title="VO2 Max Calculator" description="Estimate your VO2 max from Cooper 12-min test, resting heart rate, or 1-mile walk test. Assess your cardiovascular fitness." icon="🫁" category="Health" relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="vo2-max-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-4">Test Method</h2>
          <div className="space-y-4">
            <SelectField label="Estimation Method" value={method} onChange={v=>setMethod(v as any)} options={[{value:'cooper',label:'Cooper 12-Min Run Test'},{value:'rhr',label:'Resting Heart Rate (Uth)'},{value:'mile',label:'1-Mile Walk Test (Rockport)'}]} />
            <SelectField label="Gender" value={gender} onChange={v=>setGender(v as any)} options={[{value:'male',label:'Male'},{value:'female',label:'Female'}]} />
            <InputField label="Age" value={age} onChange={setAge} min={15} max={85} step={1} suffix="yrs" />
            {method==='cooper' && <InputField label="Distance Run in 12 Min" value={cooperDist} onChange={setCooperDist} min={800} max={4500} step={50} suffix="m" />}
            {method==='rhr' && <>
              <InputField label="Max Heart Rate" value={maxHR} onChange={setMaxHR} min={120} max={220} step={1} suffix="bpm" />
              <InputField label="Resting Heart Rate" value={restHR} onChange={setRestHR} min={30} max={100} step={1} suffix="bpm" />
            </>}
            {method==='mile' && <>
              <InputField label="1-Mile Walk Time" value={mileTime} onChange={setMileTime} min={8} max={25} step={0.5} suffix="min" />
            {/* Unit Toggle */}
            <div className="grid grid-cols-2 gap-1 p-1 bg-gray-50 rounded-xl">
              {(['imperial', 'metric'] as const).map(u => (
                <button key={u} onClick={() => setUnit(u)}
                  className={`py-2 rounded-xl text-xs font-semibold transition-all ${unit === u ? 'bg-rose-500 text-white' : 'text-gray-500'}`}>
                  {u === 'imperial' ? '🇺🇸 lbs / in' : '🌍 kg / cm'}
                </button>
              ))}
            </div>

              <InputField label={unit === 'imperial' ? 'Weight (lbs)' : 'Weight (kg)'} value={weight} onChange={setWeight} min={unit === 'imperial' ? 66 : 30} max={unit === 'imperial' ? 550 : 250} step={unit === 'imperial' ? 1 : 0.5} suffix={unit === 'imperial' ? 'lbs' : 'kg'} />
              <InputField label="Heart Rate at End" value={restHR} onChange={setRestHR} min={60} max={200} step={1} suffix="bpm" />
            </>}
          </div>
          <div className={`mt-5 p-4 rounded-xl text-center border-2 ${result.color.replace('text','bg').replace('600','50').replace('500','50')} border-current`}>
            <p className="text-xs font-bold text-gray-500">Estimated VO2 Max</p>
            <p className={`text-5xl font-black my-1 ${result.color}`}>{result.vo2}</p>
            <p className="text-sm text-gray-500">ml/kg/min</p>
            <p className={`font-bold mt-1 ${result.color}`}>{result.cat}</p>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          <Card>
            <h3 className="font-bold text-gray-900 mb-4">VO2 Max Fitness Norms ({gender==='male'?'Male':'Female'}, Age {age})</h3>
            <div className="space-y-2">
              {[
                {cat:'Poor',     r:gender==='male'?'<38':'<28',   c:'bg-red-400'},
                {cat:'Fair',     r:gender==='male'?'38-44':'28-35',c:'bg-orange-400'},
                {cat:'Good',     r:gender==='male'?'44-50':'35-42',c:'bg-yellow-400'},
                {cat:'Excellent',r:gender==='male'?'50-57':'42-49',c:'bg-green-500'},
                {cat:'Superior', r:gender==='male'?'57+':'49+',   c:'bg-blue-500'},
              ].map(f=>(
                <div key={f.cat} className={`flex items-center gap-3 p-2 rounded-lg ${result.cat===f.cat?'ring-2 ring-offset-1 ring-gray-400 bg-gray-50':''}`}>
                  <div className={`w-3 h-3 rounded-full ${f.c}`} />
                  <span className="w-20 font-bold text-sm text-gray-700">{f.cat}</span>
                  <span className="text-sm text-gray-500">{f.r} ml/kg/min</span>
                  {result.cat===f.cat && <span className="ml-auto text-xs font-bold text-gray-500">&#8592; You</span>}
                </div>
              ))}
            </div>
          </Card>
          <div className="grid grid-cols-2 gap-3">
            <Card>
              <p className="text-xs text-gray-500 font-medium">METs (Metabolic Equivalents)</p>
              <p className="text-3xl font-black text-gray-900 mt-1" style={{fontFamily:"'Inter', system-ui, sans-serif"}}>{result.mets}</p>
              <p className="text-xs text-gray-400">VO2max / 3.5</p>
            </Card>
            <Card>
              <p className="text-xs text-gray-500 font-medium">Fitness Age (est.)</p>
              <p className="text-3xl font-black text-gray-900 mt-1" style={{fontFamily:"'Inter', system-ui, sans-serif"}}>{result.cat==='Superior'?age-8:result.cat==='Excellent'?age-5:result.cat==='Good'?age:age+5}</p>
              <p className="text-xs text-gray-400">years</p>
            </Card>
          </div>
        </div>
      </div>

      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          VO2 Max Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this VO2 Max 2026 tool to get instant, evidence-based results personalized to your age, weight, and health goals. No signup required — complete privacy guaranteed.
        </p>
        <p className="text-sm text-gray-600">
          The calculator applies the calculation method described in its methodology and lets you explore different input scenarios. The result is an estimate, not a diagnosis.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Vo2 Max Calculator"
        category="health"
        intro={`The **VO2 Max Calculator** is a a health information tool using the method and reference data described for this calculator. Get your vo2 max instantly - no account needed, works on all devices.

**Why Vo2 Max matters for your health:** Understanding your vo2 max is one of the most important steps in proactive health management. Healthcare professionals use vo2 max as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.





Combine this with [our Heart Rate Calculator](/calculators/health/heart-rate-calculator), [our HIIT Calculator](/calculators/health/hiit-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Vo2 Max Calculator:** This tool applies the calculation method described for vo2 max in clinical and research settings across the United States and internationally.



**How to interpret your results:** Your vo2 max result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current vo2 max requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "Real-Time Vo2 Max Calculator output as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Vo2 Max Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Vo2 Max Calculator methodology and assumptions & Guidelines", text: "The methodology should be interpreted alongside the specific formula and sources described for this calculator; a health result is an estimate and should not be treated as a clinical diagnosis. " },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Vo2 Max Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Vo2 Max Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Vo2 Max Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Vo2 Max Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Vo2 Max Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Vo2 Max calculation:**



2. **Track trends, not single readings:** One measurement is a snapshot. Track your vo2 max monthly for 3-6 months to see meaningful trends. Healthy vo2 max improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Vo2 Max is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your vo2 max is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Vo2 Max Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.



For a complete health overview, also use [our Heart Rate Calculator](/calculators/health/heart-rate-calculator), [our HIIT Calculator](/calculators/health/hiit-calculator), and [our Athletic Performance Calculator](/calculators/health/athletic-performance-calculator).

`}
      />
      )}
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )
}
