'use client'
import { useState } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { structuredData?: object[]; faqs: any[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, relatedCalculators, blogSlug, seoContent }: Props) {
  const [wakeTime, setWakeTime] = useState(7)
  const [sleepTime, setSleepTime] = useState(23)
  const [mealsPerDay, setMealsPerDay] = useState(3)
  const [fastingProtocol, setFastingProtocol] = useState<'none'|'16:8'|'18:6'|'20:4'>('none')

  const awakeHours = sleepTime > wakeTime ? sleepTime - wakeTime : (24 - wakeTime) + sleepTime
  const fastingHours = fastingProtocol === '16:8' ? 16 : fastingProtocol === '18:6' ? 18 : fastingProtocol === '20:4' ? 20 : 0
  const eatingWindow = fastingProtocol === 'none' ? awakeHours : 24 - fastingHours
  const firstMeal = fastingProtocol !== 'none' ? wakeTime + (fastingHours - (24 - awakeHours)) : wakeTime + 1
  const lastMeal = fastingProtocol !== 'none' ? (wakeTime + (fastingHours - (24 - awakeHours)) + eatingWindow - 1) % 24 : sleepTime - 2

  const fmtTime = (h: number) => {
    const hr = Math.floor(h) % 24
    const min = Math.round((h - Math.floor(h)) * 60)
    return `${String(hr).padStart(2,'0')}:${String(min).padStart(2,'0')}`
  }

  const mealSpacing = eatingWindow / mealsPerDay
  const meals = Array.from({length:mealsPerDay},(_,i)=>firstMeal + mealSpacing * i)

  return (
    <CalculatorLayout title="Meal Timing Calculator" description="Optimise your meal timing for metabolism, energy, and intermittent fasting protocols." icon="🕐" category="Health" relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="meal-timing-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-5">Your Schedule</h2>
          <div className="space-y-4">
            <InputField label="Wake time" value={wakeTime} onChange={setWakeTime} min={4} max={12} step={0.5} suffix="hrs (24h)" />
            <InputField label="Sleep time" value={sleepTime} onChange={setSleepTime} min={18} max={26} step={0.5} suffix="hrs (24h)" />
            <InputField label="Meals per day" value={mealsPerDay} onChange={setMealsPerDay} min={1} max={6} step={1} suffix="meals" />
            <SelectField label="Fasting Protocol" value={fastingProtocol} onChange={v=>setFastingProtocol(v as any)} options={[{value:'none',label:'No fasting'},{value:'16:8',label:'16:8 (most popular)'},{value:'18:6',label:'18:6 (moderate)'},{value:'20:4',label:'20:4 (advanced)'}]} />
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          <Card gradient>
            <div className="text-center py-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Eating Window</p>
              <div className="text-7xl font-black text-rose-500 mb-2">{eatingWindow}<span className="text-3xl">h</span></div>
          <p className="text-gray-500">
  {fmtTime(firstMeal)} → {fmtTime(lastMeal)} - {mealsPerDay} meals
</p>
            </div>
          </Card>
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="First Meal" value={fmtTime(firstMeal)} highlight />
            <ResultCard label="Last Meal" value={fmtTime(lastMeal)} />
            <ResultCard label="Meal Spacing" value={`${mealSpacing.toFixed(1)}h`} />
          </div>
          <Card>
            <h3 className="font-semibold text-gray-700 mb-3">Suggested Meal Times</h3>
            <div className="space-y-2">
              {meals.map((m,i)=>(
                <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl text-sm">
                  <span className="font-bold text-gray-700">Meal {i+1}</span>
                  <span className="font-mono font-black text-rose-600">{fmtTime(m)}</span>
                  <span className="text-gray-500">{i===0?'Break fast':i===mealsPerDay-1?'Last meal':'Mid-day meal'}</span>
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
          Meal Timing Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Meal Timing tool to explore an estimate based on the inputs you provide. Results depend on the assumptions shown and should not be treated as a diagnosis or individualized medical advice. No account is required.
        </p>
        <p className="text-sm text-gray-600">
          The calculator applies the calculation method described in its methodology and lets you explore different input scenarios. The result is an estimate, not a diagnosis.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Meal Timing Calculator"
        category="health"
        intro={`The **Meal Timing Calculator** is a free, health calculator using the method and reference data described for this specific calculator. Get your meal timing instantly - no account needed, works on all devices.

**Why Meal Timing matters for your health:** Understanding your meal timing is one of the most important steps in proactive health management. Healthcare professionals use meal timing as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the method implemented by this calculator.

**Method and population context:** This calculator uses reference ranges and formulas from the specific methodology and sources documented for this calculator.



Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Meal Timing Calculator:** This tool applies the calculation method described for meal timing in clinical and research settings across the United States and internationally.



**How to interpret your results:** Your meal timing result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current meal timing requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "Real-Time Meal Timing Calculator output as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Meal Timing Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Meal Timing Calculator methodology and assumptions & Guidelines", text: "The methodology should be interpreted alongside the specific formula and sources described for this calculator; a health result is an estimate and should not be treated as a clinical diagnosis. " },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: calculator-specific interpretation, limitations, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Meal Timing Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a useful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Meal Timing Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Meal Timing Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Meal Timing Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Meal Timing Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Meal Timing calculation:**



2. **Track trends, not single readings:** One measurement is a snapshot. Track your meal timing monthly for 3-6 months to see meaningful trends. Healthy meal timing improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Meal Timing is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your meal timing is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Meal Timing Calculator represents the best of what free, open-access technology can deliver: transparent health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.



For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

`}
      />
      )}
    </CalculatorLayout>
  )
}
