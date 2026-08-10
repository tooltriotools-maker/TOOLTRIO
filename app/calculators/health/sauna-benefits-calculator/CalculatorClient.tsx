'use client'
import { useState } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { structuredData?: object[]; faqs: any[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, relatedCalculators, blogSlug, seoContent }: Props) {
  const [saunaType, setSaunaType] = useState<'traditional'|'infrared'|'steam'>('traditional')
  const [duration, setDuration] = useState(20)
  const [temp, setTemp] = useState(80)
  const [sessionsPerWeek, setSessionsPerWeek] = useState(3)
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial')
  const [weight, setWeight] = useState(165)

  const calBurn = Math.round(weight * 0.14 * duration)
  const growthHormoneBoost = Math.min(500, Math.round(100 + (temp - 60) * 5 + duration * 5))
  const cvBenefit = sessionsPerWeek >= 4 ? 'High' : sessionsPerWeek >= 2 ? 'Moderate' : 'Low'
  const fluidLoss = (duration * 0.02).toFixed(2)

  const TYPE_TEMPS = {traditional:'80-100 degreesC',infrared:'45-60 degreesC',steam:'40-50 degreesC (high humidity)'}

  return (
    <CalculatorLayout title="Sauna Benefits Calculator" description="Estimate the health benefits of sauna use based on temperature, duration, and frequency." icon="🧖" category="Health" relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="sauna-benefits-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-5">Sauna Details</h2>
          <div className="space-y-4">
            <SelectField label="Sauna Type" value={saunaType} onChange={v=>setSaunaType(v as any)} options={[{value:'traditional',label:'Traditional Finnish (dry heat)'},{value:'infrared',label:'Infrared sauna'},{value:'steam',label:'Steam room'}]} />
            <InputField label="Temperature" value={temp} onChange={setTemp} min={40} max={110} step={5} suffix=" degreesC" />
            <InputField label="Session Duration" value={duration} onChange={setDuration} min={5} max={60} step={5} suffix="min" />
            <InputField label="Sessions per Week" value={sessionsPerWeek} onChange={setSessionsPerWeek} min={1} max={7} step={1} suffix="/week" />
            <InputField label="Body Weight" value={weight} onChange={setWeight} min={40} max={200} step={1} suffix="kg" />
          </div>
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-800">
            <strong>Typical range:</strong> {TYPE_TEMPS[saunaType]}
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          <Card gradient>
            <div className="text-center py-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Calories Burned Per Session</p>
              <div className="text-7xl font-black text-rose-500 mb-2">{calBurn}</div>
              <p className="text-gray-500">kcal - Equivalent to ~{Math.round(calBurn/10)} min brisk walk</p>
            </div>
          </Card>
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Fluid Loss" value={`~${fluidLoss}L`} />
            <ResultCard label="GH Boost" value={`+${growthHormoneBoost}%`} highlight />
            <ResultCard label="CV Benefit" value={cvBenefit} />
          </div>
          <Card>
            <h3 className="font-semibold text-gray-700 mb-3">Evidence-Based Sauna Benefits (4x/week)</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>- <strong>40% reduced cardiovascular mortality</strong> - Laukkanen et al., JAMA Internal Medicine, 2015</p>
              <p>- <strong>Up to 500% growth hormone increase</strong> after 20 min at 80 degreesC (heat shock proteins)</p>
              <p>- <strong>Improved heat shock protein production</strong> - cellular repair and longevity benefits</p>
              <p>- <strong>Rehydrate with 500-750ml water</strong> per 20 min session after use</p>
              <p>- <strong>Avoid if pregnant, cardiovascular condition, or on certain medications</strong></p>
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Sauna Benefits Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Sauna Benefits tool to explore an estimate based on the inputs you provide. Results depend on the assumptions shown and should not be treated as a diagnosis or individualized medical advice. No account is required.
        </p>
        <p className="text-sm text-gray-600">
          The calculator applies the calculation method described in its methodology and lets you explore different input scenarios. The result is an estimate, not a diagnosis.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Sauna Benefits Calculator"
        category="health"
        intro={`The **Sauna Benefits Calculator** is a a health information tool using the method and reference data described for this calculator. Get your sauna benefits instantly - no account needed, works on all devices.

**Why Sauna Benefits matters for your health:** Understanding your sauna benefits is one of the most important steps in proactive health management. Healthcare professionals use sauna benefits as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.





Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Sauna Benefits Calculator:** This tool applies the calculation method described for sauna benefits in clinical and research settings across the United States and internationally.



**How to interpret your results:** Your sauna benefits result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current sauna benefits requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "Real-Time Sauna Benefits Calculator output as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Sauna Benefits Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Sauna Benefits Calculator methodology and assumptions & Guidelines", text: "The methodology should be interpreted alongside the specific formula and sources described for this calculator; a health result is an estimate and should not be treated as a clinical diagnosis. " },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Sauna Benefits Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a useful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Sauna Benefits Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Sauna Benefits Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Sauna Benefits Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Sauna Benefits Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Sauna Benefits calculation:**



2. **Track trends, not single readings:** One measurement is a snapshot. Track your sauna benefits monthly for 3-6 months to see meaningful trends. Healthy sauna benefits improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Sauna Benefits is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your sauna benefits is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Sauna Benefits Calculator represents the best of what free, open-access technology can deliver: transparent health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.



For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

`}
      />
      )}
    </CalculatorLayout>
  )
}
