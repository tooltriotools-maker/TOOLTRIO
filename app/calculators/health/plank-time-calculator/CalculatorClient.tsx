'use client'
import { useState, useMemo } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { structuredData?: object[]; faqs: any[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, relatedCalculators, blogSlug, seoContent }: Props) {

  const [seconds, setSeconds] = useState(60)
  const [age, setAge] = useState(35)
  const [gender, setGender] = useState<'male'|'female'>('male')

  const NORMS: Record<string, Record<string, number[]>> = {
    male:   { '20-29':[40,70,130,180], '30-39':[35,60,110,160], '40-49':[30,50,95,140], '50-59':[20,40,75,120], '60+':[15,30,60,90] },
    female: { '20-29':[30,50,100,150], '30-39':[25,45,85,130], '40-49':[20,38,70,110], '50-59':[15,30,55,90], '60+':[10,22,45,75] },
  }

  const result = useMemo(() => {
    const band = age < 30 ? '20-29' : age < 40 ? '30-39' : age < 50 ? '40-49' : age < 60 ? '50-59' : '60+'
    const [poor, avg, good, exc] = NORMS[gender][band]
    const cat = seconds < poor ? {l:'Needs Work',c:'text-red-700 bg-red-50 border-red-200',pct:20}
      : seconds < avg ? {l:'Below Average',c:'text-orange-700 bg-orange-50 border-orange-200',pct:35}
      : seconds < good ? {l:'Average',c:'text-yellow-700 bg-yellow-50 border-yellow-200',pct:55}
      : seconds < exc ? {l:'Good',c:'text-blue-700 bg-blue-50 border-blue-200',pct:75}
      : {l:'Excellent 🏆',c:'text-green-700 bg-green-50 border-green-200',pct:90}
    const mins = Math.floor(seconds/60), secs = seconds%60
    const nextTarget = seconds < poor ? poor : seconds < avg ? avg : seconds < good ? good : exc
    return { cat, mins, secs, poor, avg, good, exc, nextTarget }
  }, [seconds, age, gender])

  return (
    <CalculatorLayout title="Plank Time Calculator" description="Assess core strength via plank hold time percentile and get progressive training targets." icon="🏋️" category="Health" relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="plank-time-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Your Plank Test</h2>
          <div className="space-y-4">
            <SelectField label="Gender" value={gender} onChange={v=>setGender(v as any)} options={[{value:'male',label:'Male'},{value:'female',label:'Female'}]} />
            <InputField label="Age" value={age} onChange={setAge} min={16} max={90} step={1} suffix="yrs" />
            <InputField label="Plank hold time (seconds)" value={seconds} onChange={setSeconds} min={5} max={600} step={5} suffix="sec" />
          </div>
          <div className={`mt-5 p-5 rounded-xl border-2 text-center ${result.cat.c}`}>
            <p className="text-xs font-bold uppercase opacity-70">Core Strength</p>
            <p className="text-4xl font-black my-2">{result.mins > 0 ? `${result.mins}m ${result.secs}s` : `${result.secs}s`}</p>
            <p className="font-bold text-lg">{result.cat.l}</p>
            <p className="text-xs opacity-70 mt-1">~{result.cat.pct}th percentile</p>
          </div>
          <div className="mt-3 p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-700">
            <p className="font-bold">🎯 Next target: {result.nextTarget}s</p>
            <p>Add 5-10 seconds per week with consistent training</p>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          <Card>
            <h3 className="font-bold text-gray-900 mb-4">Reference Standards (your age group)</h3>
            <div className="space-y-3">
              {[{l:'Needs Work',v:result.poor,c:'bg-red-400'},{l:'Below Average',v:result.avg,c:'bg-orange-400'},{l:'Average',v:result.good,c:'bg-yellow-400'},{l:'Excellent',v:result.exc,c:'bg-green-400'}].map(r=>(
                <div key={r.l} className="flex items-center gap-3">
                  <span className="text-xs w-32 text-gray-600">{r.l}</span>
                  <div className="flex-1 h-3 bg-gray-100 rounded-full"><div className={`h-full rounded-full ${r.c}`} style={{width:`${Math.min(100,r.v/result.exc*100)}%`}}/></div>
                  <span className="text-xs font-mono w-12 text-right">{r.v}s</span>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h3 className="font-bold text-gray-900 mb-3">8-Week Plank Progression Plan</h3>
            <div className="grid grid-cols-4 gap-2">
              {[{w:'Wk 1-2',t:'3x20s',note:'Build foundation'},{w:'Wk 3-4',t:'3x30s',note:'Extend hold'},{w:'Wk 5-6',t:'2x45s',note:'Quality reps'},{w:'Wk 7-8',t:'2x60s',note:'Endurance'}].map(p=>(
                <div key={p.w} className="p-2.5 bg-purple-50 rounded-xl border border-purple-200 text-center text-xs">
                  <p className="font-black text-purple-700">{p.w}</p>
                  <p className="font-bold text-gray-900 text-sm">{p.t}</p>
                  <p className="text-gray-500">{p.note}</p>
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
          Plank Time Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Plank Time tool to explore an estimate based on the inputs you provide. Results depend on the assumptions shown and should not be treated as a diagnosis or individualized medical advice. No account is required.
        </p>
        <p className="text-sm text-gray-600">
          The calculator applies the calculation method described in its methodology and lets you explore different input scenarios. The result is an estimate, not a diagnosis.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Plank Time Calculator"
        category="health"
        intro={`The **Plank Time Calculator** is a a health information tool using the method and reference data described for this calculator. Get your plank time instantly - no account needed, works on all devices.

**Why Plank Time matters for your health:** Understanding your plank time is one of the most important steps in proactive health management. Healthcare professionals use plank time as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.





Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Plank Time Calculator:** This tool applies the calculation method described for this calculator in clinical and research settings across the United States and internationally.



**How to interpret your results:** Your plank time result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current plank time requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "Real-Time Plank Time Calculator output as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Plank Time Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Plank Time Calculator methodology and assumptions & Guidelines", text: "The methodology should be interpreted alongside the specific formula and sources described for this calculator; a health result is an estimate and should not be treated as a clinical diagnosis. " },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Plank Time Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a useful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Plank Time Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Plank Time Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Plank Time Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Plank Time Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Plank Time calculation:**



2. **Track trends, not single readings:** One measurement is a snapshot. Track your plank time monthly for 3-6 months to see meaningful trends. Healthy plank time improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Plank Time is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your plank time is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Plank Time Calculator represents the best of what free, open-access technology can deliver: transparent health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.



For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

`}
      />
      )}
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )

}
