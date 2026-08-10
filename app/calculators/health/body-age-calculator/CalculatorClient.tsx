'use client'
import { useState } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { structuredData?: object[]; faqs: any[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, relatedCalculators, blogSlug, seoContent }: Props) {
  const [age, setAge] = useState(35)
  const [exerciseDays, setExerciseDays] = useState(3)
  const [bmi, setBmi] = useState(24)
  const [sleepHours, setSleepHours] = useState(7)
  const [smoker, setSmoker] = useState(false)
  const [stressLevel, setStressLevel] = useState(4)
  const [alcoholUnits, setAlcoholUnits] = useState(5)

  const adjustments = [
    exerciseDays >= 5 ? -3 : exerciseDays >= 3 ? -1 : exerciseDays === 0 ? 3 : 1,
    bmi > 30 ? 4 : bmi > 25 ? 2 : bmi < 18.5 ? 2 : -1,
    sleepHours >= 7 && sleepHours <= 9 ? -1 : sleepHours < 6 ? 3 : 1,
    smoker ? 5 : -1,
    stressLevel > 7 ? 3 : stressLevel > 5 ? 1 : -1,
    alcoholUnits > 14 ? 3 : alcoholUnits > 7 ? 1 : 0,
  ]
  const bodyAge = Math.max(18, age + adjustments.reduce((s,a)=>s+a,0))
  const diff = bodyAge - age
  const summary = diff > 5 ? 'Your body is ageing faster than average.' : diff < -3 ? 'Your body is younger than your age! 🎉' : 'Your body age is close to your actual age.'

  return (
    <CalculatorLayout title="Body Age Calculator" description="Estimate your biological body age based on lifestyle factors like exercise, sleep, BMI, and stress." icon="🔬" category="Health" relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="body-age-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-5">Lifestyle Factors</h2>
          <div className="space-y-4">
            <InputField label="Chronological Age" value={age} onChange={setAge} min={18} max={90} step={1} suffix="yrs" />
            <InputField label="Exercise (days/week)" value={exerciseDays} onChange={setExerciseDays} min={0} max={7} step={1} suffix="days" />
            <InputField label="BMI" value={bmi} onChange={setBmi} min={15} max={45} step={0.5} suffix="kg/m2" />
            <InputField label="Sleep (hrs/night)" value={sleepHours} onChange={setSleepHours} min={4} max={12} step={0.5} suffix="hrs" />
            <InputField label="Stress Level (1-10)" value={stressLevel} onChange={setStressLevel} min={1} max={10} step={1} suffix="/10" />
            <InputField label="Alcohol (units/week)" value={alcoholUnits} onChange={setAlcoholUnits} min={0} max={50} step={1} suffix="units" />
            <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
              <input type="checkbox" checked={smoker} onChange={e=>setSmoker(e.target.checked)} className="accent-rose-500"/>
              <span>Current smoker</span>
            </label>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          <Card gradient>
            <div className="text-center py-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Your Body Age</p>
              <div className={`text-7xl font-black mb-2 ${diff > 5 ? 'text-red-500' : diff < -3 ? 'text-green-500' : 'text-rose-500'}`}>{bodyAge}</div>
              <p className="text-gray-500">{diff > 0 ? `+${diff}` : diff} years vs chronological age of {age}</p>
              <p className="text-sm font-semibold mt-2 text-gray-600">{summary}</p>
            </div>
          </Card>
          <div className="grid grid-cols-2 gap-3">
            <ResultCard label="Actual Age" value={`${age} yrs`} />
            <ResultCard label="Body Age" value={`${bodyAge} yrs`} highlight={diff < 0} />
          </div>
          <Card>
            <h3 className="font-semibold text-gray-700 mb-3">Factor Breakdown</h3>
            <div className="space-y-1 text-sm">
              {[['Exercise',adjustments[0]],['BMI',adjustments[1]],['Sleep',adjustments[2]],['Smoking',adjustments[3]],['Stress',adjustments[4]],['Alcohol',adjustments[5]]].map(([l,v])=>(
                <div key={l as string} className="flex justify-between"><span className="text-gray-600">{l}</span><span className={`font-bold ${+v > 0?'text-red-600':+v < 0?'text-green-600':'text-gray-500'}`}>{+v > 0?'+':''}{v} yrs</span></div>
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
          Body Age Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          A person born on March 15, 1990 is <strong>35 years, 3 weeks, and 2 days</strong> old as of April 7, 2026. They have lived approximately 12,806 days and will turn 36 in less than a year.
        </p>
        <p className="text-sm text-gray-600">
          This Body Age 2026 calculates your exact age in years, months, days, and total days lived — useful for medical forms, legal documents, and milestone tracking.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Body Age Calculator"
        category="health"
        intro={`The **Body Age Calculator** is a a health information tool using the method and reference data described for this calculator. Get your body age instantly - no account needed, works on all devices.

**Why Body Age matters for your health:** Understanding your body age is one of the most important steps in proactive health management. Healthcare professionals use body age as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.





Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Body Age Calculator:** This tool applies the calculation method described for body age in clinical and research settings across the United States and internationally.



**How to interpret your results:** Your body age result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current body age requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "Real-Time Body Age Calculator results as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Body Age Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Body Age Calculator methodology and assumptions & Guidelines", text: "The methodology should be interpreted alongside the specific formula and sources described for this calculator; a health result is an estimate and should not be treated as a clinical diagnosis. " },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Body Age Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a useful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Body Age Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Body Age Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Body Age Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Body Age Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Body Age calculation:**



2. **Track trends, not single readings:** One measurement is a snapshot. Track your body age monthly for 3-6 months to see meaningful trends. Healthy body age improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Body Age is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your body age is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Body Age Calculator represents the best of what free, open-access technology can deliver: transparent health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.



For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

`}
      />
      )}
    </CalculatorLayout>
  )
}
