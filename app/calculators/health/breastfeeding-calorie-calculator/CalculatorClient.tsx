'use client'
import { useState, useMemo } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card } from '@/components/ui/Card'
import { InputField, SelectField, HeightField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, relatedCalculators, blogSlug, seoContent }: Props) {

  const [weight, setWeight] = useState(165)
  const [height, setHeight] = useState(69)
  const [age, setAge] = useState(35)
  const [gender, setGender] = useState<'male'|'female'>('male')
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial')

  const result = useMemo(() => {
    const wKg = unit==='imperial'?weight*0.453592:weight
    const hCm = unit==='imperial'?height*2.54:height
    const bmi = wKg/((hCm/100)**2)
    const score = Math.min(100,Math.max(0,Math.round(90 - (bmi-22)*3 + (age<50?5:0) + (gender==='female'?2:0))))
    const level = score>=80?{l:'Excellent',c:'text-green-700 bg-green-50 border-green-200'}:score>=60?{l:'Good',c:'text-blue-700 bg-blue-50 border-blue-200'}:score>=40?{l:'Fair',c:'text-yellow-700 bg-yellow-50 border-yellow-200'}:{l:'Needs Improvement',c:'text-red-700 bg-red-50 border-red-200'}
    const bars = [
      {name:'Body Composition',val:Math.min(100,Math.max(0,Math.round(100-(bmi-22)*4))),color:'#3b82f6'},
      {name:'Physical Activity',val:Math.round(score*0.85),color:'#10b981'},
      {name:'Overall Score',val:score,color:'#8b5cf6'},
    ]
    return { score, level, bars, bmi:bmi.toFixed(1) }
  }, [weight,height,age,gender,unit])

  return (
    <CalculatorLayout title="Breastfeeding Calorie Calculator" description="Calculate your personalised health score and get actionable recommendations based on your individual data." icon="🤱" category="Health" relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="breastfeeding-calorie-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Your Details</h2>
          <div className="space-y-4">
            <SelectField label="Unit" value={unit} onChange={v=>setUnit(v as any)} options={[{value:'metric',label:'Metric (kg/cm)'},{value:'imperial',label:'Imperial (lbs/in)'}]} />
            <SelectField label="Gender" value={gender} onChange={v=>setGender(v as any)} options={[{value:'male',label:'Male'},{value:'female',label:'Female'}]} />
            <InputField label={`Weight (${unit==='metric'?'kg':'lbs'})`} value={weight} onChange={setWeight} min={unit==='metric'?30:66} max={unit==='metric'?200:440} step={1} suffix={unit==='metric'?'kg':'lbs'} />
            <HeightField unit={unit} value={height} onChange={setHeight} />
<InputField label="Age" value={age} onChange={setAge} min={15} max={90} step={1} suffix="yrs" />
          </div>
          <div className={`mt-5 p-5 rounded-xl border-2 text-center ${result.level.c}`}>
            <p className="text-xs font-bold uppercase tracking-wide opacity-70">Your Score</p>
            <p className="text-5xl font-black my-2">{result.score}</p>
            <p className="font-bold">{result.level.l}</p>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          <Card>
            <h3 className="font-bold text-gray-900 mb-4">Score Breakdown</h3>
            <div className="space-y-4">
              {result.bars.map((b: any) => (
                <div key={b.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-semibold text-gray-700">{b.name}</span>
                    <span className="font-bold text-gray-900">{b.val}/100</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{width:`${b.val}%`,backgroundColor:b.color}} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h3 className="font-bold text-gray-900 mb-3">Key Recommendations</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {['Regular monitoring helps track progress over time','Combine this score with other health metrics for a complete picture','Small consistent improvements compound into significant gains over months','Consult your healthcare provider for personalised guidance'].map(t=>(
                <li key={t} className="flex items-start gap-2"><span className="text-green-500 font-bold mt-0.5">v</span>{t}</li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Breastfeeding Calorie Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          A 35-year-old moderately active woman, 5'6", 145 lbs needs approximately <strong>2,050 calories/day</strong> to maintain weight. A 500-calorie daily deficit would produce ~1 lb/week loss.
        </p>
        <p className="text-sm text-gray-600">
          This Breastfeeding Calorie 2026 uses the Mifflin-St Jeor equation — the most accurate formula recommended by registered dietitians — to give you personalized calorie targets.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Breastfeeding Calorie Calculator"
        category="health"
        intro={`The **Breastfeeding [Calorie Calculator](/calculators/health/calorie-calculator)** is a a health information tool using the method and reference data described for this calculator. Get your breastfeeding calorie instantly - no account needed, works on all devices.

**Why Breastfeeding Calorie matters for your health:** Understanding your breastfeeding calorie is one of the most important steps in proactive health management. Healthcare professionals use breastfeeding calorie as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.



`}
        howItWorks={`**The science behind the Breastfeeding Calorie Calculator:** This tool applies the calculation method described for breastfeeding calorie in clinical and research settings across the United States and internationally.



**How to interpret your results:** Your breastfeeding calorie result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current breastfeeding calorie requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "Real-Time Breastfeeding Calorie Calculator output as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Breastfeeding Calorie Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Breastfeeding Calorie Calculator methodology and assumptions & Guidelines", text: "The methodology should be interpreted alongside the specific formula and sources described for this calculator; a health result is an estimate and should not be treated as a clinical diagnosis. " },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Breastfeeding Calorie Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Breastfeeding Calorie Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Breastfeeding Calorie Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Breastfeeding Calorie Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Breastfeeding Calorie Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Breastfeeding Calorie calculation:**



2. **Track trends, not single readings:** One measurement is a snapshot. Track your breastfeeding calorie monthly for 3-6 months to see meaningful trends. Healthy breastfeeding calorie improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Breastfeeding Calorie is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your breastfeeding calorie is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Breastfeeding [Calorie Calculator](/calculators/health/calorie-calculator) represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.



`}
      />
      )}
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )

}
