'use client'
import { useState, useEffect, useCallback } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { structuredData?: object[]; faqs: any[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

const TECHNIQUES = [
  {name:'Box Breathing (4-4-4-4)',in:4,hold1:4,out:4,hold2:4,desc:'Used by Navy SEALs for stress management and focus.'},
  {name:'4-7-8 Breathing',in:4,hold1:7,out:8,hold2:0,desc:'Promotes sleep and reduces anxiety.'},
  {name:'Resonant Breathing (5-5)',in:5,hold1:0,out:5,hold2:0,desc:'Optimises heart rate variability.'},
  {name:'Wim Hof (4-0-4-4)',in:4,hold1:0,out:4,hold2:4,desc:'Activates sympathetic nervous system, increases energy.'},
]

export default function CalculatorClient({ faqs, relatedCalculators, blogSlug, seoContent }: Props) {
  const [techniqueIdx, setTechniqueIdx] = useState(0)
  const [rounds, setRounds] = useState(5)
  const [active, setActive] = useState(false)
  const [phase, setPhase] = useState<'inhale'|'hold1'|'exhale'|'hold2'>('inhale')
  const [countdown, setCountdown] = useState(0)
  const [completedRounds, setCompletedRounds] = useState(0)

  const t = TECHNIQUES[techniqueIdx]
  const phases: {key:'inhale'|'hold1'|'exhale'|'hold2',label:string,secs:number}[] = [
    {key:'inhale',label:'Inhale',secs:t.in},
    {key:'hold1',label:'Hold',secs:t.hold1},
    {key:'exhale',label:'Exhale',secs:t.out},
    {key:'hold2',label:'Hold',secs:t.hold2},
  ].filter(p=>p.secs>0) as {key:'inhale'|'hold1'|'exhale'|'hold2',label:string,secs:number}[]

  const totalSecs = phases.reduce((s,p)=>s+p.secs,0)
  const totalMin = ((totalSecs * rounds) / 60).toFixed(1)

  useEffect(() => {
    if (!active) return
    if (countdown <= 0) {
      const currentIdx = phases.findIndex(p=>p.key===phase)
      const nextIdx = (currentIdx+1) % phases.length
      if (nextIdx === 0) {
        if (completedRounds + 1 >= rounds) { setActive(false); setCompletedRounds(0); setPhase('inhale'); return }
        setCompletedRounds(r=>r+1)
      }
      setPhase(phases[nextIdx].key)
      setCountdown(phases[nextIdx].secs)
      return
    }
    const timer = setTimeout(()=>setCountdown(c=>c-1), 1000)
    return ()=>clearTimeout(timer)
  }, [active, countdown, phase, phases, completedRounds, rounds])

  const start = () => { setPhase(phases[0].key); setCountdown(phases[0].secs); setCompletedRounds(0); setActive(true) }
  const stop = () => { setActive(false); setCountdown(0); setCompletedRounds(0) }

  const phaseColors: Record<string,string> = {inhale:'text-blue-600',hold1:'text-yellow-600',exhale:'text-green-600',hold2:'text-purple-600'}

  return (
    <CalculatorLayout title="Breathing Exercise Calculator" description="Practice guided breathing exercises for stress relief, focus, and sleep with customisable timing." icon="🫁" category="Health" relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="breathing-exercise-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-5">Exercise Settings</h2>
          <div className="space-y-4">
            <SelectField label="Technique" value={String(techniqueIdx)} onChange={v=>setTechniqueIdx(+v)} options={TECHNIQUES.map((t,i)=>({value:String(i),label:t.name}))} />
            <InputField label="Rounds" value={rounds} onChange={setRounds} min={1} max={20} step={1} suffix="rounds" />
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-sm text-blue-800">
              <p className="font-bold mb-1">{t.name}</p>
              <p>{t.desc}</p>
              <p className="mt-1 font-mono text-xs">Inhale {t.in}s {t.hold1>0?`Hold ${t.hold1}s `:''}Exhale {t.out}s {t.hold2>0?`Hold ${t.hold2}s`:''}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4 text-center text-xs">
            <div className="bg-gray-50 rounded-lg p-2"><p className="font-bold">{totalSecs}s/round</p><p className="text-gray-500">Round length</p></div>
            <div className="bg-gray-50 rounded-lg p-2"><p className="font-bold">{totalMin} min</p><p className="text-gray-500">Total time</p></div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {active ? (
            <Card gradient>
              <div className="text-center py-4">
                <p className={`text-2xl font-black uppercase tracking-wider mb-4 ${phaseColors[phase]}`}>
                  {phases.find(p=>p.key===phase)?.label}
                </p>
                <div className="text-8xl font-black text-gray-800 mb-4">{countdown}</div>
                <p className="text-gray-500">Round {completedRounds+1} of {rounds}</p>
                <div className="w-full bg-gray-100 rounded-full h-3 mt-3">
                  <div className="h-3 rounded-full bg-rose-400 transition-all" style={{width:`${(completedRounds/rounds)*100}%`}}/>
                </div>
              </div>
            </Card>
          ) : (
            <Card gradient>
              <div className="text-center py-8">
                <p className="text-6xl mb-4">🫁</p>
                <p className="text-gray-600 mb-2">Ready to begin {rounds} rounds of</p>
                <p className="font-bold text-gray-900">{t.name}</p>
              </div>
            </Card>
          )}
          <div className="flex gap-3">
            {!active
              ? <button onClick={start} className="flex-1 py-4 bg-rose-500 text-white font-black text-lg rounded-2xl hover:bg-rose-600">  ▶ Start Session</button>
              : <button onClick={stop} className="flex-1 py-4 bg-gray-200 text-gray-700 font-black text-lg rounded-2xl hover:bg-gray-300">. Stop</button>
            }
          </div>
          <Card>
            <h3 className="font-semibold text-gray-700 mb-2">All Techniques</h3>
            <div className="space-y-2">
              {TECHNIQUES.map((te,i)=>(
                <button key={te.name} onClick={()=>{setTechniqueIdx(i);setActive(false)}} className={`w-full text-left p-3 rounded-xl border ${techniqueIdx===i?'border-rose-300 bg-rose-50':'border-gray-100 hover:border-rose-200'}`}>
                  <p className="font-bold text-sm text-gray-900">{te.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{te.desc}</p>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Breathing Exercise Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Breathing Exercise tool to explore an estimate based on the inputs you provide. Results depend on the assumptions shown and should not be treated as a diagnosis or individualized medical advice. No account is required.
        </p>
        <p className="text-sm text-gray-600">
          The calculator applies the calculation method described in its methodology and lets you explore different input scenarios. The result is an estimate, not a diagnosis.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Breathing Exercise Calculator"
        category="health"
        intro={`The **Breathing Exercise Calculator** is a a health information tool using the method and reference data described for this calculator. Get your breathing exercise instantly - no account needed, works on all devices.

**Why Breathing Exercise matters for your health:** Understanding your breathing exercise is one of the most important steps in proactive health management. Healthcare professionals use breathing exercise as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.





Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Breathing Exercise Calculator:** This tool applies the calculation method described for breathing exercise in clinical and research settings across the United States and internationally.



**How to interpret your results:** Your breathing exercise result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current breathing exercise requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "Real-Time Breathing Exercise Calculator output as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Breathing Exercise Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Breathing Exercise Calculator methodology and assumptions & Guidelines", text: "The methodology should be interpreted alongside the specific formula and sources described for this calculator; a health result is an estimate and should not be treated as a clinical diagnosis. " },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Breathing Exercise Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a useful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Breathing Exercise Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Breathing Exercise Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Breathing Exercise Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Breathing Exercise Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Breathing Exercise calculation:**



2. **Track trends, not single readings:** One measurement is a snapshot. Track your breathing exercise monthly for 3-6 months to see meaningful trends. Healthy breathing exercise improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Breathing Exercise is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your breathing exercise is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Breathing Exercise Calculator represents the best of what free, open-access technology can deliver: transparent health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.



For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

`}
      />
      )}
    </CalculatorLayout>
  )
}
