'use client'
import { useState } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { structuredData?: object[]; faqs: any[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, relatedCalculators, blogSlug, seoContent }: Props) {
  const [targetHrs, setTargetHrs] = useState(4)
  const [targetMins, setTargetMins] = useState(0)
  const [weeksToRace, setWeeksToRace] = useState(16)
  const [currentWeeklyKm, setCurrentWeeklyKm] = useState(30)

  const targetTotalMin = targetHrs * 60 + targetMins
  const targetPacePerKm = targetTotalMin / 42.195
  const targetPaceMin = Math.floor(targetPacePerKm)
  const targetPaceSec = Math.round((targetPacePerKm - targetPaceMin) * 60)

  const longRunKm = Math.min(35, Math.round(currentWeeklyKm * 0.4 + (weeksToRace >= 8 ? 5 : 0)))
  const peakWeeklyKm = Math.round(currentWeeklyKm * 1.3)
  const calPerWeek = Math.round(peakWeeklyKm * 65)

  const PACES = [
    {label:'Easy run', mult: 1.25},
    {label:'Long run', mult: 1.20},
    {label:'Tempo', mult: 1.08},
    {label:'Target race pace', mult: 1.0},
    {label:'Intervals', mult: 0.95},
  ]

  const fmtPace = (mult: number) => {
    const p = targetPacePerKm * mult
    return `${Math.floor(p)}:${String(Math.round((p-Math.floor(p))*60)).padStart(2,'0')}/km`
  }

  return (
    <CalculatorLayout title="Marathon Training Calculator" description="Calculate your marathon training paces, long run distances, and weekly mileage targets." icon="🏃" category="Health" relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="marathon-training-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-5">Your Goal</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <InputField label="Target hrs" value={targetHrs} onChange={setTargetHrs} min={2} max={8} step={1} suffix="hrs" />
              <InputField label="Target mins" value={targetMins} onChange={setTargetMins} min={0} max={59} step={1} suffix="min" />
            </div>
            <InputField label="Weeks to race day" value={weeksToRace} onChange={setWeeksToRace} min={4} max={30} step={1} suffix="weeks" />
            <InputField label="Current weekly km" value={currentWeeklyKm} onChange={setCurrentWeeklyKm} min={10} max={100} step={5} suffix="km" />
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          <Card gradient>
            <div className="text-center py-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Target Race Pace</p>
              <div className="text-6xl font-black text-rose-500 mb-2">{targetPaceMin}:{String(targetPaceSec).padStart(2,'0')}</div>
              <p className="text-gray-500">per km - Goal: {targetHrs}h {targetMins}min</p>
            </div>
          </Card>
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Long Run" value={`${longRunKm}km`} highlight />
            <ResultCard label="Peak Weekly" value={`${peakWeeklyKm}km`} />
            <ResultCard label="Cal/Week" value={`~${calPerWeek}`} />
          </div>
          <Card>
            <h3 className="font-semibold text-gray-700 mb-3">Training Paces</h3>
            <div className="space-y-2">
              {PACES.map(p=>(
                <div key={p.label} className="flex justify-between text-sm py-1 border-b border-gray-50 last:border-0">
                  <span className="text-gray-600">{p.label}</span>
                  <span className="font-bold font-mono">{fmtPace(p.mult)}</span>
                </div>
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
          Marathon Training Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Running a 5K in 28 minutes equals a <strong>9:01/mile pace</strong>. To finish a half marathon in under 2 hours, you need to maintain a 9:09/mile pace. A full marathon in under 4 hours requires 9:09/mile.
        </p>
        <p className="text-sm text-gray-600">
          This Marathon Training 2026 converts between pace, distance, and time — useful for setting race goals, planning training runs, and tracking progress over your season.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Marathon Training Calculator"
        category="health"
        intro={`The **Marathon Training Calculator** is a free, health calculator using the method and reference data described for this specific calculator. Get your marathon training instantly - no account needed, works on all devices.

**Why Marathon Training matters for your health:** Understanding your marathon training is one of the most important steps in proactive health management. Healthcare professionals use marathon training as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the method implemented by this calculator.

**Method and population context:** This calculator uses reference ranges and formulas from the specific methodology and sources documented for this calculator.



Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Marathon Training Calculator:** This tool applies the calculation method described for marathon training in clinical and research settings across the United States and internationally.



**How to interpret your results:** Your marathon training result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current marathon training requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "Real-Time Marathon Training Calculator output as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Marathon Training Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Marathon Training Calculator methodology and assumptions & Guidelines", text: "The methodology should be interpreted alongside the specific formula and sources described for this calculator; a health result is an estimate and should not be treated as a clinical diagnosis. " },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: calculator-specific interpretation, limitations, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Marathon Training Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Marathon Training Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Marathon Training Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Marathon Training Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Marathon Training Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Marathon Training calculation:**



2. **Track trends, not single readings:** One measurement is a snapshot. Track your marathon training monthly for 3-6 months to see meaningful trends. Healthy marathon training improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Marathon Training is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your marathon training is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Marathon Training Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.



For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

`}
      />
      )}
    </CalculatorLayout>
  )
}
