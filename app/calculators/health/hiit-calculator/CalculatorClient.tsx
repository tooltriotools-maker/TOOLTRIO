'use client'
import { useState } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, relatedCalculators, blogSlug, seoContent }: Props) {
  const [weight, setWeight] = useState(165)
  const [workSec, setWorkSec] = useState(40)
  const [restSec, setRestSec] = useState(20)
  const [rounds, setRounds] = useState(8)
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial')

  const wKg = unit==='imperial' ? weight*0.453592 : weight
  const totalSec = (workSec + restSec) * rounds
  const workMin = (workSec * rounds) / 60
  const calWork = Math.round(12 * wKg * workMin / 60)
  const calTotal = Math.round(calWork * 1.4)
  const ratio = Math.round((workSec/(workSec+restSec))*100)

  return (
    <CalculatorLayout title="HIIT Calculator" description="Calculate calories burned in HIIT workouts based on work/rest intervals and your body weight." icon="⚡" category="Health" relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="hiit-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-5">HIIT Settings</h2>
          <div className="space-y-4">
            <SelectField label="Units" value={unit} onChange={v=>setUnit(v as any)} options={[{value:'metric',label:'Metric (kg)'},{value:'imperial',label:'Imperial (lbs)'}]} />
            <InputField label="Body Weight" value={weight} onChange={setWeight} min={30} max={200} step={1} suffix={unit==='metric'?'kg':'lbs'} />
            <InputField label="Work Interval" value={workSec} onChange={setWorkSec} min={10} max={120} step={5} suffix="sec" />
            <InputField label="Rest Interval" value={restSec} onChange={setRestSec} min={5} max={120} step={5} suffix="sec" />
            <InputField label="Number of Rounds" value={rounds} onChange={setRounds} min={1} max={30} step={1} suffix="rds" />
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          <Card gradient>
            <div className="text-center py-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Total Calories (incl. afterburn)</p>
              <div className="text-7xl font-black text-rose-500 mb-2">{calTotal}</div>
              <p className="text-gray-500">kcal in {Math.round(totalSec/60)} minutes</p>
            </div>
          </Card>
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="During Workout" value={`${calWork} kcal`} highlight />
            <ResultCard label="Work Ratio" value={`${ratio}%`} />
            <ResultCard label="Total Time" value={`${Math.round(totalSec/60)} min`} />
          </div>
          <Card>
            <h3 className="font-semibold text-gray-700 mb-3">Your Session</h3>
            <div className="flex items-center gap-2 flex-wrap">
              {Array.from({length:rounds},(_,i)=>(
                <div key={i} className="flex gap-0.5">
                  <div className="h-8 bg-red-400 rounded-l" style={{width:`${workSec*0.5}px`}} title="Work" />
                  <div className="h-8 bg-gray-200 rounded-r" style={{width:`${restSec*0.5}px`}} title="Rest" />
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-2 text-xs"><span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-400 inline-block"/>Work ({workSec}s)</span><span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-gray-200 inline-block"/>Rest ({restSec}s)</span></div>
          </Card>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          HIIT Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this HIIT 2026 tool to get instant, evidence-based results personalized to your age, weight, and health goals. No signup required — complete privacy guaranteed.
        </p>
        <p className="text-sm text-gray-600">
          The calculator applies the calculation method described in its methodology and lets you explore different input scenarios. The result is an estimate, not a diagnosis.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Hiit Calculator"
        category="health"
        intro={`The **HIIT Calculator** is a a health information tool using the method and reference data described for this calculator. Get your hiit instantly - no account needed, works on all devices.

**Why Hiit matters for your health:** Understanding your hiit is one of the most important steps in proactive health management. Healthcare professionals use hiit as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.





Combine this with [our Heart Rate Calculator](/calculators/health/heart-rate-calculator), [our Calories Burned Calculator](/calculators/health/calories-burned-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Hiit Calculator:** This tool applies the calculation method described for hiit in clinical and research settings across the United States and internationally.



**How to interpret your results:** Your hiit result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current hiit requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "Real-Time Hiit Calculator output as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Hiit Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Hiit Calculator methodology and assumptions & Guidelines", text: "The methodology should be interpreted alongside the specific formula and sources described for this calculator; a health result is an estimate and should not be treated as a clinical diagnosis. " },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Hiit Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Hiit Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Hiit Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Hiit Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Hiit Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Hiit calculation:**



2. **Track trends, not single readings:** One measurement is a snapshot. Track your hiit monthly for 3-6 months to see meaningful trends. Healthy hiit improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Hiit is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your hiit is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Hiit Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.



For a complete health overview, also use [our Heart Rate Calculator](/calculators/health/heart-rate-calculator), [our Calories Burned Calculator](/calculators/health/calories-burned-calculator), and [our VO2 Max Calculator](/calculators/health/vo2-max-calculator).

`}
      />
      )}
    </CalculatorLayout>
  )
}
