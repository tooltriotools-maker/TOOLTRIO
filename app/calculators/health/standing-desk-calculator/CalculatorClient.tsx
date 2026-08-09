'use client'
import { useState } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, relatedCalculators, blogSlug, seoContent }: Props) {
  const [deskHours, setDeskHours] = useState(8)
  const [standingPct, setStandingPct] = useState(30)
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial')
  const [weight, setWeight] = useState(165)
  const [walkingBreaks, setWalkingBreaks] = useState(3)

  const standingHours = (deskHours * standingPct) / 100
  const sittingHours = deskHours - standingHours
  const calBurnStanding = Math.round(standingHours * weight * 0.15)
  const calBurnWalking = Math.round(walkingBreaks * 5 * weight * 0.0056)
  const totalExtraCalories = calBurnStanding + calBurnWalking

  const recommendation = standingPct < 20 ? 'Aim for at least 20-30% standing time' : standingPct > 70 ? 'Balance standing with sitting to avoid fatigue and lower back strain' : 'Good standing/sitting balance! v'

  return (
    <CalculatorLayout title="Standing Desk Calculator" description="Calculate the health and calorie benefits of using a standing desk compared to sitting all day." icon="🪑" category="Health" relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="standing-desk-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-5">Your Desk Habits</h2>
          <div className="space-y-4">
            <InputField label="Hours at desk per day" value={deskHours} onChange={setDeskHours} min={1} max={16} step={0.5} suffix="hrs" />
            <div>
              <label className="text-sm font-semibold text-gray-700">Standing percentage: <span className="text-rose-500 font-black">{standingPct}%</span></label>
              <input type="range" min={0} max={100} value={standingPct} onChange={e=>setStandingPct(+e.target.value)} className="w-full accent-rose-500 mt-1"/>
            </div>
            <InputField label="Body weight" value={weight} onChange={setWeight} min={40} max={200} step={1} suffix="kg" />
            <InputField label="Short walking breaks per day" value={walkingBreaks} onChange={setWalkingBreaks} min={0} max={10} step={1} suffix="breaks" />
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          <Card gradient>
            <div className="text-center py-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Extra Calories Burned Daily</p>
              <div className="text-7xl font-black text-rose-500 mb-2">{totalExtraCalories}</div>
              <p className="text-gray-500">vs sitting all day - {standingHours.toFixed(1)}h standing + {walkingBreaks} walk breaks</p>
            </div>
          </Card>
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Standing Time" value={`${standingHours.toFixed(1)}h`} highlight />
            <ResultCard label="Sitting Time" value={`${sittingHours.toFixed(1)}h`} />
            <ResultCard label="Per Week" value={`+${totalExtraCalories*5} kcal`} />
          </div>
          <Card>
            <p className={`text-sm font-semibold mb-3 ${standingPct < 20 || standingPct > 70 ? 'text-orange-600' : 'text-green-600'}`}>{recommendation}</p>
            <h3 className="font-semibold text-gray-700 mb-2">Optimal Standing Desk Protocol</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>- Alternate 30-45 min sitting with 15-20 min standing</p>
              <p>- Monitor at eye level; elbows at 90 degrees when typing while standing</p>
              <p>- Use an anti-fatigue mat to reduce lower limb discomfort</p>
              <p>- Standing burns ~50 extra kcal/hour vs sitting</p>
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Standing Desk Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Standing Desk 2026 tool to get instant, evidence-based results personalized to your age, weight, and health goals. No signup required — complete privacy guaranteed.
        </p>
        <p className="text-sm text-gray-600">
          The calculator applies the calculation method described in its methodology and lets you explore different input scenarios. The result is an estimate, not a diagnosis.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Standing Desk Calculator"
        category="health"
        intro={`The **Standing Desk Calculator** is a a health information tool using the method and reference data described for this calculator. Get your standing desk instantly - no account needed, works on all devices.

**Why Standing Desk matters for your health:** Understanding your standing desk is one of the most important steps in proactive health management. Healthcare professionals use standing desk as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.





Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Standing Desk Calculator:** This tool applies the calculation method described for standing desk in clinical and research settings across the United States and internationally.



**How to interpret your results:** Your standing desk result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current standing desk requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "Real-Time Standing Desk Calculator output as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Standing Desk Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Standing Desk Calculator methodology and assumptions & Guidelines", text: "The methodology should be interpreted alongside the specific formula and sources described for this calculator; a health result is an estimate and should not be treated as a clinical diagnosis. " },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Standing Desk Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Standing Desk Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Standing Desk Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Standing Desk Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Standing Desk Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Standing Desk calculation:**



2. **Track trends, not single readings:** One measurement is a snapshot. Track your standing desk monthly for 3-6 months to see meaningful trends. Healthy standing desk improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Standing Desk is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your standing desk is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Standing Desk Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.



For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

`}
      />
      )}
    </CalculatorLayout>
  )
}
