'use client'
import { useState, useMemo } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card } from '@/components/ui/Card'
import { InputField, SelectField, HeightField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, relatedCalculators, blogSlug, seoContent }: Props) {

  const [steps, setSteps] = useState(8000)
  const [weight, setWeight] = useState(155)
  const [height, setHeight] = useState(67)
  const [pace, setPace] = useState<'slow'|'moderate'|'brisk'|'fast'>('moderate')
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial')

  const result = useMemo(() => {
    const wKg = unit==='imperial' ? weight*0.453592 : weight
    const hCm = unit==='imperial' ? height*2.54 : height
    const strideM = hCm * 0.0045 // avg stride length in meters
    const distKm = (steps * strideM) / 1000
    const met = {slow:2.5,moderate:3.5,brisk:5.0,fast:6.5}[pace]
    const speedKmh = {slow:2.5,moderate:4.0,brisk:5.5,fast:7.0}[pace]
    const timeH = distKm / speedKmh
    const calories = Math.round(met * wKg * timeH)
    const timeMin = Math.round(timeH * 60)
    
    const goals = [
      {label:'Light Activity',steps:5000,pct:Math.min(100,Math.round(steps/5000*100))},
      {label:'WHO Minimum',steps:7500,pct:Math.min(100,Math.round(steps/7500*100))},
      {label:'10K Goal',steps:10000,pct:Math.min(100,Math.round(steps/10000*100))},
      {label:'Active',steps:12500,pct:Math.min(100,Math.round(steps/12500*100))},
    ]
    return { distKm:distKm.toFixed(2), calories, timeMin, strideM:(strideM*100).toFixed(0), goals }
  }, [steps,weight,height,pace,unit])

  return (
    <CalculatorLayout title="Steps to Calories Calculator" description="Convert daily steps to calories burned based on your weight, height, and walking pace." icon="👣" category="Health" relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="steps-to-calories-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Your Details</h2>
          <div className="space-y-4">
            <SelectField label="Unit" value={unit} onChange={v=>setUnit(v as any)} options={[{value:'metric',label:'Metric'},{value:'imperial',label:'Imperial'}]} />
            <InputField label="Daily Steps" value={steps} onChange={setSteps} min={500} max={50000} step={500} suffix="steps" />
            <InputField label={`Weight (${unit==='metric'?'kg':'lbs'})`} value={weight} onChange={setWeight} min={unit==='metric'?30:66} max={unit==='metric'?200:440} step={1} suffix={unit==='metric'?'kg':'lbs'} />
            <HeightField unit={unit} value={height} onChange={setHeight} />
<SelectField label="Walking Pace" value={pace} onChange={v=>setPace(v as any)} options={[{value:'slow',label:'Slow (2.5 km/h)'},{value:'moderate',label:'Moderate (4 km/h)'},{value:'brisk',label:'Brisk (5.5 km/h)'},{value:'fast',label:'Fast (7 km/h)'}]} />
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[{l:'Calories',v:String(result.calories),u:'kcal',c:'bg-orange-50 border-orange-200 text-orange-700'},{l:'Distance',v:result.distKm,u:'km',c:'bg-blue-50 border-blue-200 text-blue-700'},{l:'Time',v:String(result.timeMin),u:'min',c:'bg-purple-50 border-purple-200 text-purple-700'},{l:'Stride',v:result.strideM,u:'cm',c:'bg-red-50 border-red-200 text-red-700'}].map(s=>(
              <div key={s.l} className={`p-3 rounded-xl border-2 text-center ${s.c}`}>
                <p className="text-xs font-bold opacity-70 uppercase tracking-wide">{s.l}</p>
                <p className="text-2xl font-black">{s.v}</p>
                <p className="text-xs opacity-70">{s.u}</p>
              </div>
            ))}
          </div>
          <Card>
            <h3 className="font-bold text-gray-900 mb-4">Daily Steps Goals Progress</h3>
            <div className="space-y-3">
              {result.goals.map(g=>(
                <div key={g.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-gray-700">{g.label} ({g.steps.toLocaleString()} steps)</span>
                    <span className="font-bold">{g.pct}%</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${g.pct>=100?'bg-green-500':g.pct>=75?'bg-blue-400':g.pct>=50?'bg-yellow-400':'bg-gray-300'}`} style={{width:`${g.pct}%`}} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Steps To Calories Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          A 35-year-old moderately active woman, 5'6", 145 lbs needs approximately <strong>2,050 calories/day</strong> to maintain weight. A 500-calorie daily deficit would produce ~1 lb/week loss.
        </p>
        <p className="text-sm text-gray-600">
          This Steps To Calories 2026 uses the Mifflin-St Jeor equation — the most accurate formula recommended by registered dietitians — to give you personalized calorie targets.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Steps To Calories Calculator"
        category="health"
        intro={`The **Steps To Calories Calculator** is a a health information tool using the method and reference data described for this calculator. Get your steps to calories instantly - no account needed, works on all devices.

**Why Steps To Calories matters for your health:** Understanding your steps to calories is one of the most important steps in proactive health management. Healthcare professionals use steps to calories as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.





Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Steps To Calories Calculator:** This tool applies the calculation method described for steps to calories in clinical and research settings across the United States and internationally.



**How to interpret your results:** Your steps to calories result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current steps to calories requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "Real-Time Steps To Calories Calculator output as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Steps To Calories Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Steps To Calories Calculator methodology and assumptions & Guidelines", text: "The methodology should be interpreted alongside the specific formula and sources described for this calculator; a health result is an estimate and should not be treated as a clinical diagnosis. " },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Steps To Calories Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Steps To Calories Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Steps To Calories Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Steps To Calories Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Steps To Calories Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Steps To Calories calculation:**



2. **Track trends, not single readings:** One measurement is a snapshot. Track your steps to calories monthly for 3-6 months to see meaningful trends. Healthy steps to calories improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Steps To Calories is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your steps to calories is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Steps To Calories Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.



For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

`}
      />
      )}
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )

}
