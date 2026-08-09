'use client'
import { useState } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

const FORMULAS = [
  {name:'Epley',calc:(w:number,r:number)=>w*(1+r/30)},
  {name:'Brzycki',calc:(w:number,r:number)=>w*(36/(37-r))},
  {name:'Lombardi',calc:(w:number,r:number)=>w*Math.pow(r,0.1)},
  {name:'Mayhew',calc:(w:number,r:number)=>100*w/(52.2+41.9*Math.exp(-0.055*r))},
]

export default function CalculatorClient({ faqs, relatedCalculators, blogSlug, seoContent }: Props) {
  const [weight, setWeight] = useState(100)
  const [reps, setReps] = useState(5)
  const [bodyWeight, setBodyWeight] = useState(80)
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial')

  const orm = Math.round(FORMULAS[0].calc(weight, reps))
  const bwRatio = (orm / bodyWeight).toFixed(2)
  const standard = orm/bodyWeight > 2 ? 'Elite' : orm/bodyWeight > 1.75 ? 'Advanced' : orm/bodyWeight > 1.5 ? 'Intermediate' : orm/bodyWeight > 1 ? 'Beginner' : 'Novice'

  return (
    <CalculatorLayout title="Squat Calculator" description="Calculate your squat one-rep max and strength standards using proven formulas." icon="🏋️" category="Health" relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="squat-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-5">Your Lift</h2>
          <div className="space-y-4">
            <SelectField label="Unit" value={unit} onChange={v=>setUnit(v as any)} options={[{value:'kg',label:'Kilograms (kg)'},{value:'lbs',label:'Pounds (lbs)'}]} />
            <InputField label={`Weight Lifted (${unit})`} value={weight} onChange={setWeight} min={20} max={500} step={2.5} suffix={unit} />
            <InputField label="Reps Performed" value={reps} onChange={setReps} min={1} max={20} step={1} suffix="reps" />
            <InputField label={`Body Weight (${unit})`} value={bodyWeight} onChange={setBodyWeight} min={40} max={200} step={1} suffix={unit} />
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          <Card gradient>
            <div className="text-center py-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Estimated 1-Rep Max</p>
              <div className="text-7xl font-black text-rose-500 mb-2">{orm}<span className="text-3xl">{unit}</span></div>
              <p className="text-gray-500">{bwRatio}x body weight - <strong>{standard}</strong></p>
            </div>
          </Card>
          <div className="grid grid-cols-2 gap-3">
            {[['90%',0.9],['80%',0.8],['70%',0.7],['60%',0.6]].map(([l,p])=>(
              <ResultCard key={l as string} label={`${l} 1RM (${l} sets)`} value={`${Math.round(orm*(p as number))}${unit}`} />
            ))}
          </div>
          <Card>
            <h3 className="font-semibold text-gray-700 mb-3">Formula Comparison</h3>
            {FORMULAS.map(f=>(
              <div key={f.name} className="flex justify-between text-sm py-1 border-b border-gray-50 last:border-0">
                <span className="text-gray-600">{f.name}</span>
                <span className="font-bold">{Math.round(f.calc(weight,reps))} {unit}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Squat Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Squat 2026 tool to get instant, evidence-based results personalized to your age, weight, and health goals. No signup required — complete privacy guaranteed.
        </p>
        <p className="text-sm text-gray-600">
          The calculator applies the calculation method described in its methodology and lets you explore different input scenarios. The result is an estimate, not a diagnosis.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Squat Calculator"
        category="health"
        intro={`The **Squat Calculator** is a a health information tool using the method and reference data described for this calculator. Get your squat instantly - no account needed, works on all devices.

**Why Squat matters for your health:** Understanding your squat is one of the most important steps in proactive health management. Healthcare professionals use squat as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.





Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Squat Calculator:** This tool applies the calculation method described for squat in clinical and research settings across the United States and internationally.



**How to interpret your results:** Your squat result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current squat requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "Real-Time Squat Calculator output as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Squat Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Squat Calculator methodology and assumptions & Guidelines", text: "The methodology should be interpreted alongside the specific formula and sources described for this calculator; a health result is an estimate and should not be treated as a clinical diagnosis. " },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Squat Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Squat Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Squat Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Squat Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Squat Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Squat calculation:**



2. **Track trends, not single readings:** One measurement is a snapshot. Track your squat monthly for 3-6 months to see meaningful trends. Healthy squat improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Squat is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your squat is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Squat Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.



For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

`}
      />
      )}
    </CalculatorLayout>
  )
}
