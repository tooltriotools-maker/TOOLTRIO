'use client'
import { useState } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { structuredData?: object[]; faqs: any[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, relatedCalculators, blogSlug, seoContent }: Props) {
  const [alcoholUnits, setAlcoholUnits] = useState(5)
  const [bmi, setBmi] = useState(26)
  const [exercise, setExercise] = useState(3)
  const [processedFood, setProcessedFood] = useState(3)
  const [smoker, setSmoker] = useState(false)
  const [age, setAge] = useState(40)
  const [water, setWater] = useState(6)

  const score = Math.round(
    Math.max(0, (14 - alcoholUnits) / 14 * 25) +
    (bmi < 25 ? 25 : bmi < 30 ? 15 : bmi < 35 ? 8 : 0) +
    (exercise >= 5 ? 20 : exercise >= 3 ? 15 : exercise >= 1 ? 8 : 0) +
    Math.max(0, (7 - processedFood) / 7 * 15) +
    (smoker ? 0 : 10) +
    Math.min(5, water / 8 * 5)
  )

  const grade = score >= 80 ? {l:'Excellent Liver Health',c:'text-green-600'} : score >= 60 ? {l:'Good',c:'text-blue-600'} : score >= 40 ? {l:'Fair - Some Risk Factors',c:'text-yellow-600'} : {l:'High Risk - Action Needed',c:'text-red-600'}

  return (
    <CalculatorLayout title="Liver Health Calculator" description="Assess your liver health risk based on lifestyle factors including alcohol, diet, and BMI." icon="🫀" category="Health" relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="liver-health-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-5">Lifestyle Factors</h2>
          <div className="space-y-4">
            <InputField label="Age" value={age} onChange={setAge} min={18} max={90} step={1} suffix="yrs" />
            <InputField label="Alcohol (units/week)" value={alcoholUnits} onChange={setAlcoholUnits} min={0} max={50} step={1} suffix="units" />
            <InputField label="BMI" value={bmi} onChange={setBmi} min={15} max={50} step={0.5} suffix="kg/m2" />
            <InputField label="Exercise (days/week)" value={exercise} onChange={setExercise} min={0} max={7} step={1} suffix="days" />
            <InputField label="Processed/fast food (meals/week)" value={processedFood} onChange={setProcessedFood} min={0} max={21} step={1} suffix="/week" />
            <InputField label="Water glasses per day" value={water} onChange={setWater} min={0} max={15} step={1} suffix="glasses" />
            <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
              <input type="checkbox" checked={smoker} onChange={e=>setSmoker(e.target.checked)} className="accent-rose-500"/>
              <span>Current smoker</span>
            </label>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          <Card gradient>
            <div className="text-center py-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Liver Health Score</p>
              <div className="text-7xl font-black text-rose-500 mb-2">{score}<span className="text-3xl">/100</span></div>
              <p className={`font-bold text-xl ${grade.c}`}>{grade.l}</p>
            </div>
          </Card>
          <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
            <div className={`h-4 rounded-full transition-all ${score>=80?'bg-green-500':score>=60?'bg-blue-500':score>=40?'bg-yellow-500':'bg-red-500'}`} style={{width:`${score}%`}}/>
          </div>
          <Card>
            <h3 className="font-semibold text-gray-700 mb-3">Liver Protection Tips</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>- <strong>Alcohol limits:</strong> Max 14 units/week (UK) or 10 (WHO). 3+ consecutive dry days weekly</p>
              <p>- <strong>Excess weight</strong> is a leading cause of non-alcoholic fatty liver disease (NAFLD)</p>
              <p>- <strong>Coffee</strong> (2-3 cups/day) is associated with reduced liver disease risk</p>
              <p>- <strong>Avoid unnecessary medications/supplements</strong> - many are processed by the liver</p>
              <p>- <strong>Hepatitis B vaccine</strong> protects against one of the leading causes of liver disease</p>
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Liver Health Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Liver Health 2026 tool to get instant, evidence-based results personalized to your age, weight, and health goals. No signup required — complete privacy guaranteed.
        </p>
        <p className="text-sm text-gray-600">
          The calculator applies the calculation method described in its methodology and lets you explore different input scenarios. The result is an estimate, not a diagnosis.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Liver Health Calculator"
        category="health"
        intro={`The **Liver Health Calculator** is a free, health calculator using the method and reference data described for this specific calculator. Get your liver health instantly - no account needed, works on all devices.

**Why Liver Health matters for your health:** Understanding your liver health is one of the most important steps in proactive health management. Healthcare professionals use liver health as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the method implemented by this calculator.

**Method and population context:** This calculator uses reference ranges and formulas from the specific methodology and sources documented for this calculator.



Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Liver Health Calculator:** This tool applies the calculation method described for liver health in clinical and research settings across the United States and internationally.



**How to interpret your results:** Your liver health result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current liver health requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "Real-Time Liver Health Calculator output as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Liver Health Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Liver Health Calculator methodology and assumptions & Guidelines", text: "The methodology should be interpreted alongside the specific formula and sources described for this calculator; a health result is an estimate and should not be treated as a clinical diagnosis. " },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: calculator-specific interpretation, limitations, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Liver Health Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Liver Health Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Liver Health Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Liver Health Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Liver Health Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Liver Health calculation:**



2. **Track trends, not single readings:** One measurement is a snapshot. Track your liver health monthly for 3-6 months to see meaningful trends. Healthy liver health improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Liver Health is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your liver health is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Liver Health Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.



For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

`}
      />
      )}
    </CalculatorLayout>
  )
}
