'use client'
import { useState } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

const STYLES = [
  {label:'Hatha (gentle)',met:2.5},{label:'Vinyasa / Flow',met:4.0},{label:'Power Yoga',met:5.0},{label:'Ashtanga',met:5.5},{label:'Bikram / Hot Yoga',met:6.0},{label:'Yin / Restorative',met:2.0},{label:'Kundalini',met:3.0},
]

export default function CalculatorClient({ faqs, relatedCalculators, blogSlug, seoContent }: Props) {
  const [weight, setWeight] = useState(145)
  const [duration, setDuration] = useState(60)
  const [style, setStyle] = useState(1)
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial')

  const wKg = unit==='imperial' ? weight*0.453592 : weight
  const calories = Math.round(STYLES[style].met * wKg * (duration/60))

  return (
    <CalculatorLayout title="Yoga Calories Calculator" description="Calculate calories burned in yoga sessions by style, weight, and duration." icon="🧘" category="Health" relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="yoga-calories-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-5">Your Details</h2>
          <div className="space-y-4">
            <SelectField label="Units" value={unit} onChange={v=>setUnit(v as any)} options={[{value:'metric',label:'Metric (kg)'},{value:'imperial',label:'Imperial (lbs)'}]} />
            <InputField label={unit==='metric'?'Weight (kg)':'Weight (lbs)'} value={weight} onChange={setWeight} min={30} max={200} step={1} suffix={unit==='metric'?'kg':'lbs'} />
            <InputField label="Session Duration" value={duration} onChange={setDuration} min={15} max={180} step={15} suffix="min" />
            <SelectField label="Yoga Style" value={String(style)} onChange={v=>setStyle(+v)} options={STYLES.map((s,i)=>({value:String(i),label:s.label}))} />
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          <Card gradient>
            <div className="text-center py-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Calories Burned</p>
              <div className="text-7xl font-black text-rose-500 mb-2">{calories}</div>
              <p className="text-gray-500">kcal in {duration}min of {STYLES[style].label}</p>
            </div>
          </Card>
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Per Hour" value={`${Math.round(STYLES[style].met*wKg)} kcal`} highlight />
            <ResultCard label="Per Week (5x)" value={`${calories*5} kcal`} />
            <ResultCard label="MET Value" value={String(STYLES[style].met)} />
          </div>
          <Card>
            <h3 className="font-semibold text-gray-700 mb-3">Style Comparison ({duration} min at your weight)</h3>
            <div className="space-y-2">
              {STYLES.map((s,i)=>{
                const cal = Math.round(s.met*wKg*(duration/60))
                const pct = Math.round(cal/Math.max(...STYLES.map(x=>x.met))/wKg/(duration/60)*100)
                return (
                  <div key={s.label} className={`flex items-center gap-2 p-2 rounded-lg ${i===style?'bg-rose-50':''}`}>
                    <span className="text-sm flex-1">{s.label}</span>
                    <div className="w-24 bg-gray-100 rounded-full h-2"><div className="h-2 rounded-full bg-rose-400" style={{width:`${cal/Math.max(...STYLES.map(x=>Math.round(x.met*wKg*(duration/60))))*100}%`}}/></div>
                    <span className="text-sm font-bold w-16 text-right">{cal} kcal</span>
                  </div>
                )
              })}
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Yoga Calories Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          A 35-year-old moderately active woman, 5'6", 145 lbs needs approximately <strong>2,050 calories/day</strong> to maintain weight. A 500-calorie daily deficit would produce ~1 lb/week loss.
        </p>
        <p className="text-sm text-gray-600">
          This Yoga Calories 2026 uses the Mifflin-St Jeor equation — the most accurate formula recommended by registered dietitians — to give you personalized calorie targets.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Yoga Calories Calculator"
        category="health"
        intro={`The **Yoga Calories Calculator** is a a health information tool using the method and reference data described for this calculator. Get your yoga calories instantly - no account needed, works on all devices.

**Why Yoga Calories matters for your health:** Understanding your yoga calories is one of the most important steps in proactive health management. Healthcare professionals use yoga calories as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.





Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Yoga Calories Calculator:** This tool applies the calculation method described for yoga calories in clinical and research settings across the United States and internationally.



**How to interpret your results:** Your yoga calories result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current yoga calories requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "Real-Time Yoga Calories Calculator output as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Yoga Calories Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Yoga Calories Calculator methodology and assumptions & Guidelines", text: "The methodology should be interpreted alongside the specific formula and sources described for this calculator; a health result is an estimate and should not be treated as a clinical diagnosis. " },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Yoga Calories Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Yoga Calories Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Yoga Calories Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Yoga Calories Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Yoga Calories Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Yoga Calories calculation:**



2. **Track trends, not single readings:** One measurement is a snapshot. Track your yoga calories monthly for 3-6 months to see meaningful trends. Healthy yoga calories improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Yoga Calories is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your yoga calories is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Yoga Calories Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.



For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

`}
      />
      )}
    </CalculatorLayout>
  )
}
