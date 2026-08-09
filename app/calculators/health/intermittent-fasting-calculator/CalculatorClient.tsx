'use client'
import { useState, useMemo } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, relatedCalculators, blogSlug, seoContent }: Props) {

  const [protocol, setProtocol] = useState<'16_8'|'18_6'|'20_4'|'omad'|'5_2'>('16_8')
  const [wakeTime, setWakeTime] = useState('07:00')
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial')
  const [weight, setWeight] = useState(165)
  const [tdee, setTdee] = useState(2000)
  const [goal, setGoal] = useState<'lose'|'maintain'>('lose')

  const weightKg = unit === 'imperial' ? weight / 2.20462 : weight

  const result = useMemo(() => {
    const [wh, wm] = wakeTime.split(':').map(Number)
    const wakeMins = wh*60+wm

    const configs: Record<string,{fast:number,eat:number,label:string}> = {
      '16_8':{fast:16,eat:8,label:'16:8'},
      '18_6':{fast:18,eat:6,label:'18:6'},
      '20_4':{fast:20,eat:4,label:'20:4 Warrior'},
      'omad':{fast:23,eat:1,label:'OMAD'},
      '5_2':{fast:0,eat:24,label:'5:2'}
    }
    const cfg = configs[protocol]

    const eatStart = protocol==='5_2' ? wakeTime : (() => {
      const delayH = 1 // 1 hour after wake to start eating
      const startMins = (wakeMins + delayH*60) % 1440
      return `${String(Math.floor(startMins/60)).padStart(2,'0')}:${String(startMins%60).padStart(2,'0')}`
    })()

    const eatEnd = protocol==='5_2' ? '21:00' : (() => {
      const [sh,sm] = eatStart.split(':').map(Number)
      const endMins = (sh*60+sm+cfg.eat*60) % 1440
      return `${String(Math.floor(endMins/60)).padStart(2,'0')}:${String(endMins%60).padStart(2,'0')}`
    })()

    const fastEnd = eatStart
    const fastStart = eatEnd

    const cals = protocol==='5_2'
      ? {normal:tdee, fastDay:500}
      : {target: goal==='lose' ? Math.round(tdee*0.8) : tdee}

    const benefits = [
      {h:12,label:'Fat burning begins',done:cfg.fast>=12},
      {h:14,label:'Insulin drops significantly',done:cfg.fast>=14},
      {h:16,label:'Growth hormone increases',done:cfg.fast>=16},
      {h:18,label:'Ketone production increases',done:cfg.fast>=18},
      {h:24,label:'Autophagy (cell cleanup) peaks',done:cfg.fast>=23},
    ]
    return {cfg, eatStart, eatEnd, fastStart, fastEnd, cals, benefits}
  }, [protocol, wakeTime, weight, tdee, goal])

  return (
    <CalculatorLayout title="Intermittent Fasting Calculator" description="Get your personalised fasting schedule with eating window times, calorie targets, and fasting benefits by hour." icon="⏰" category="Health" relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="intermittent-fasting-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Your Schedule</h2>
          <div className="space-y-4">
            <SelectField label="Fasting Protocol" value={protocol} onChange={v=>setProtocol(v as any)} options={[{value:'16_8',label:'16:8 (Most Popular)'},{value:'18_6',label:'18:6 (Moderate)'},{value:'20_4',label:'20:4 Warrior Diet'},{value:'omad',label:'OMAD (One Meal)'},{value:'5_2',label:'5:2 Method'}]} />
            <div><label className="text-xs font-medium text-gray-600 block mb-1">Wake Up Time</label><input type="time" value={wakeTime} onChange={e=>setWakeTime(e.target.value)} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" /></div>
            <InputField label="Daily TDEE (kcal)" value={tdee} onChange={setTdee} min={1200} max={4000} step={50} suffix="kcal" />
            <SelectField label="Goal" value={goal} onChange={v=>setGoal(v as any)} options={[{value:'lose',label:'Fat Loss (-20% cals)'},{value:'maintain',label:'Maintenance'}]} />
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl border-2 text-center" style={{background:'rgba(240,253,244,0.85)',borderColor:'rgba(134,239,172,0.7)',backdropFilter:'blur(8px)'}}>
              <p className="text-xs font-bold text-green-600 uppercase">Eating Window</p>
              <p className="text-2xl font-black text-green-700 mt-1">{result.eatStart} - {result.eatEnd}</p>
              <p className="text-sm text-green-600">{result.cfg.eat} hours - {protocol==='5_2'?`${result.cals.normal} kcal normal days`:`${(result.cals as any).target} kcal target`}</p>
            </div>
            <div className="p-5 bg-indigo-50 rounded-2xl border-2 border-indigo-200 text-center">
              <p className="text-xs font-bold text-indigo-600 uppercase">Fasting Window</p>
              <p className="text-2xl font-black text-indigo-700 mt-1">{result.fastStart} - {result.fastEnd}</p>
              <p className="text-sm text-indigo-600">{result.cfg.fast} hours fasting</p>
            </div>
          </div>
          <Card>
            <h3 className="font-bold text-gray-900 mb-3">Fasting Benefits by Duration</h3>
            <div className="space-y-2">
              {result.benefits.map((b: any) => (
                <div key={b.h} className={`flex items-center gap-3 p-2.5 rounded-xl ${b.done?'bg-green-50 border border-green-200':'bg-gray-50 border border-gray-100'}`}>
                  <span>{b.done?'✅':'⏳'}</span>
                  <span className={`text-sm font-semibold ${b.done?'text-green-700':'text-gray-500'}`}>{b.h}h: {b.label}</span>
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
          Intermittent Fasting Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          On a 16:8 protocol eating from 12 PM–8 PM: your fasting window is <strong>16 hours</strong> (8 PM to 12 PM). Over 12 weeks, this approach can produce 3–5% body weight reduction even without calorie counting.
        </p>
        <p className="text-sm text-gray-600">
          This Intermittent Fasting 2026 calculates your eating window, fasting window, and projected outcomes based on your chosen IF protocol and daily schedule.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Intermittent Fasting Calculator"
        category="health"
        intro={`The **Intermittent Fasting Calculator** is a free, health calculator using the method and reference data described for this specific calculator. Get your intermittent fasting instantly - no account needed, works on all devices.

**Why Intermittent Fasting matters for your health:** Understanding your intermittent fasting is one of the most important steps in proactive health management. Healthcare professionals use intermittent fasting as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the method implemented by this calculator.

**Method and population context:** This calculator uses reference ranges and formulas from the specific methodology and sources documented for this calculator.



Combine this with [our Calorie Calculator](/calculators/health/calorie-calculator), [our TDEE Calculator](/calculators/health/tdee-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Intermittent Fasting Calculator:** This tool applies the calculation method described for intermittent fasting in clinical and research settings across the United States and internationally.



**How to interpret your results:** Your intermittent fasting result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current intermittent fasting requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "Real-Time Intermittent Fasting Calculator output as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Intermittent Fasting Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Intermittent Fasting Calculator methodology and assumptions & Guidelines", text: "The methodology should be interpreted alongside the specific formula and sources described for this calculator; a health result is an estimate and should not be treated as a clinical diagnosis. " },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: calculator-specific interpretation, limitations, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Intermittent Fasting Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Intermittent Fasting Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Intermittent Fasting Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Intermittent Fasting Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Intermittent Fasting Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Intermittent Fasting calculation:**



2. **Track trends, not single readings:** One measurement is a snapshot. Track your intermittent fasting monthly for 3-6 months to see meaningful trends. Healthy intermittent fasting improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Intermittent Fasting is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your intermittent fasting is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Intermittent Fasting Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.



For a complete health overview, also use [our Calorie Calculator](/calculators/health/calorie-calculator), [our TDEE Calculator](/calculators/health/tdee-calculator), and [our Fasting Window Calculator](/calculators/health/fasting-window-calculator).

`}
      />
      )}
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )

}
