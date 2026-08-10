'use client'
import { useState, useMemo } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { structuredData?: object[]; faqs: any[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, relatedCalculators, blogSlug, seoContent }: Props) {

  const [age, setAge] = useState(30)
  const [gender, setGender] = useState<'male'|'female'>('male')
  const [pushups, setPushups] = useState(25)

  const result = useMemo(() => {
    // Fitness rating
    const maleLevels = [
      {min:0, max:17, label:'Needs Work', color:'text-red-600 bg-red-50'},
      {min:17,max:29, label:'Below Average', color:'text-orange-600 bg-orange-50'},
      {min:29,max:39, label:'Average', color:'text-yellow-600 bg-yellow-50'},
      {min:39,max:50, label:'Good', color:'text-green-600 bg-green-50'},
      {min:50,max:999,label:'Excellent', color:'text-blue-600 bg-blue-50'},
    ]
    const femaleLevels = [
      {min:0, max:6,  label:'Needs Work', color:'text-red-600 bg-red-50'},
      {min:6, max:14, label:'Below Average', color:'text-orange-600 bg-orange-50'},
      {min:14,max:24, label:'Average', color:'text-yellow-600 bg-yellow-50'},
      {min:24,max:34, label:'Good', color:'text-green-600 bg-green-50'},
      {min:34,max:999,label:'Excellent', color:'text-blue-600 bg-blue-50'},
    ]
    const levels = gender==='male' ? maleLevels : femaleLevels
    const lvl = levels.find(l=>pushups>=l.min && pushups<l.max) ?? levels[0]
    
    // Army standards (age-adjusted)
    const armyStd = gender==='male'
      ? age<22?42:age<27?40:age<32?36:age<37?31:age<42?26:20
      : age<22?19:age<27?17:age<32?15:age<37?13:age<42?11:10
    
    // 4-week plan
    const wk = pushups
    const plan = [
      {week:1, sets:[Math.round(wk*0.5),Math.round(wk*0.4),Math.round(wk*0.4),Math.round(wk*0.4),Math.round(wk*0.5)], days:'Mon, Wed, Fri'},
      {week:2, sets:[Math.round(wk*0.6),Math.round(wk*0.5),Math.round(wk*0.5),Math.round(wk*0.4),Math.round(wk*0.6)], days:'Mon, Wed, Fri'},
      {week:3, sets:[Math.round(wk*0.7),Math.round(wk*0.6),Math.round(wk*0.5),Math.round(wk*0.5),Math.round(wk*0.7)], days:'Mon, Wed, Fri'},
      {week:4, sets:[Math.round(wk*0.8),Math.round(wk*0.7),Math.round(wk*0.6),Math.round(wk*0.5),'Max'], days:'Mon, Wed, Fri'},
    ]
    const est4week = Math.round(pushups * 1.4)
    return { lvl, armyStd, armyPass:pushups>=armyStd, plan, est4week }
  }, [age,gender,pushups])

  return (
    <CalculatorLayout title="Push-Up Calculator" description="Get your push-up fitness score and a personalised 4-week training plan to hit your goal." icon="💪" category="Health" relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="pushup-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Your Details</h2>
          <div className="space-y-4">
            <SelectField label="Gender" value={gender} onChange={v=>setGender(v as any)} options={[{value:'male',label:'Male'},{value:'female',label:'Female'}]} />
            <InputField label="Age" value={age} onChange={setAge} min={15} max={70} step={1} suffix="yrs" />
            <InputField label="Max Push-Ups (1 set)" value={pushups} onChange={setPushups} min={0} max={200} step={1} suffix="reps" />
          </div>
          <div className={`mt-5 p-4 rounded-xl text-center border-2 ${result.lvl.color}`}>
            <p className="text-xs font-bold uppercase tracking-wide opacity-70">Fitness Rating</p>
            <p className="text-3xl font-black my-1">{result.lvl.label}</p>
            <p className="text-sm">{pushups} push-ups</p>
          </div>
          <div className={`mt-3 p-3 rounded-xl text-center border ${result.armyPass?'bg-green-50 border-green-200 text-green-700':'bg-red-50 border-red-200 text-red-700'}`}>
            <p className="text-xs font-bold">US Army Standard (Age {age})</p>
            <p className="text-lg font-black">{result.armyPass?'✅ PASS':'❌ FAIL'}</p>
            <p className="text-xs">Min required: {result.armyStd} push-ups</p>
          </div>
        </Card>
        <div className="lg:col-span-2">
          <Card>
            <h3 className="font-bold text-gray-900 mb-1">4-Week Training Plan</h3>
            <p className="text-xs text-gray-500 mb-4">Est. max push-ups after 4 weeks: <span className="font-bold text-green-600">{result.est4week}</span></p>
            <div className="space-y-3">
              {result.plan.map(w=>(
                <div key={w.week} className="p-3 rounded-2xl border" style={{background:'rgba(248,250,248,0.7)',borderColor:'rgba(226,232,240,0.5)'}}>
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-bold text-gray-900 text-sm">Week {w.week}</p>
                    <p className="text-xs text-gray-500">{w.days}</p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {w.sets.map((s,i)=>(
                      <div key={i} className="px-3 py-1.5 bg-white rounded-lg border border-gray-200 text-center min-w-[3rem]">
                        <p className="text-xs text-gray-500">Set {i+1}</p>
                        <p className="font-black text-gray-900 text-sm">{s}</p>
                      </div>
                    ))}
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
          Pushup Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Pushup tool to explore an estimate based on the inputs you provide. Results depend on the assumptions shown and should not be treated as a diagnosis or individualized medical advice. No account is required.
        </p>
        <p className="text-sm text-gray-600">
          The calculator applies the calculation method described in its methodology and lets you explore different input scenarios. The result is an estimate, not a diagnosis.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Pushup Calculator"
        category="health"
        intro={`The **Pushup Calculator** is a a health information tool using the method and reference data described for this calculator. Get your pushup instantly - no account needed, works on all devices.

**Why Pushup matters for your health:** Understanding your pushup is one of the most important steps in proactive health management. Healthcare professionals use pushup as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.





Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Pushup Calculator:** This tool applies the calculation method described for pushup in clinical and research settings across the United States and internationally.



**How to interpret your results:** Your pushup result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current pushup requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "Real-Time Pushup Calculator output as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Pushup Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Pushup Calculator methodology and assumptions & Guidelines", text: "The methodology should be interpreted alongside the specific formula and sources described for this calculator; a health result is an estimate and should not be treated as a clinical diagnosis. " },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Pushup Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a useful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Pushup Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Pushup Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Pushup Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Pushup Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Pushup calculation:**



2. **Track trends, not single readings:** One measurement is a snapshot. Track your pushup monthly for 3-6 months to see meaningful trends. Healthy pushup improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Pushup is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your pushup is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Pushup Calculator represents the best of what free, open-access technology can deliver: transparent health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.



For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

`}
      />
      )}
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )

}
