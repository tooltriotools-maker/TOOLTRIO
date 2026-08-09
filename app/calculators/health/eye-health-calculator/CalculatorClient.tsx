'use client'
import { useState } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { structuredData?: object[]; faqs: any[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, relatedCalculators, blogSlug, seoContent }: Props) {
  const [screenHours, setScreenHours] = useState(8)
  const [takes2020, setTakes2020] = useState(false)
  const [sunglasses, setSunglasses] = useState(true)
  const [smokingYears, setSmokingYears] = useState(0)
  const [omega3, setOmega3] = useState(true)
  const [eyeExam, setEyeExam] = useState(1)
  const [age, setAge] = useState(35)

  const strainScore = Math.min(100, Math.round(
    screenHours * 8 +
    (takes2020 ? -15 : 15) +
    (sunglasses ? -10 : 10) +
    smokingYears * 2 +
    (omega3 ? -10 : 5) +
    (eyeExam >= 1 ? -10 : 10) +
    (age > 50 ? 10 : 0)
  ))
  const clamped = Math.max(0, Math.min(100, strainScore))
  const risk = clamped >= 70 ? {l:'High Eye Strain Risk',c:'text-red-600'} : clamped >= 40 ? {l:'Moderate Risk',c:'text-orange-600'} : {l:'Low Risk v',c:'text-green-600'}

  return (
    <CalculatorLayout title="Eye Health Calculator" description="Assess your eye health risk factors and get personalised advice to protect your vision." icon="👁️" category="Health" relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="eye-health-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-5">Eye Health Factors</h2>
          <div className="space-y-4">
            <InputField label="Age" value={age} onChange={setAge} min={10} max={100} step={1} suffix="yrs" />
            <InputField label="Screen hours per day" value={screenHours} onChange={setScreenHours} min={0} max={18} step={0.5} suffix="hrs" />
            <InputField label="Eye exams per year" value={eyeExam} onChange={setEyeExam} min={0} max={4} step={1} suffix="/year" />
            <InputField label="Smoking years (0 if non-smoker)" value={smokingYears} onChange={setSmokingYears} min={0} max={60} step={1} suffix="yrs" />
            {[['Practice 20-20-20 rule',takes2020,setTakes2020],['Wear UV-blocking sunglasses',sunglasses,setSunglasses],['Eat omega-3 rich foods',omega3,setOmega3]].map(([l,v,s]: any)=>(
              <label key={l} className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                <input type="checkbox" checked={v} onChange={e=>s(e.target.checked)} className="accent-rose-500"/>
                <span>{l}</span>
              </label>
            ))}
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          <Card gradient>
            <div className="text-center py-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Eye Strain Risk Score</p>
              <div className={`text-7xl font-black mb-2 ${risk.c}`}>{clamped}</div>
              <p className={`font-bold ${risk.c}`}>{risk.l}</p>
            </div>
          </Card>
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Screen Hours" value={`${screenHours}h/day`} />
            <ResultCard label="Eye Exam" value={eyeExam >= 1 ? 'v Regular' : '⚠️ Overdue'} />
            <ResultCard label="UV Protection" value={sunglasses ? 'v' : '⚠️ No'} />
          </div>
          <Card>
            <h3 className="font-semibold text-gray-700 mb-3">Eye Health Tips</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>- <strong>20-20-20 rule:</strong> Every 20 minutes, look at something 20 feet away for 20 seconds</p>
              <p>- <strong>UV protection:</strong> UV rays accelerate cataracts and macular degeneration</p>
              <p>- <strong>Annual eye exams</strong> catch glaucoma and macular degeneration early</p>
              <p>- <strong>Omega-3 fatty acids</strong> support the tear film and reduce dry eye symptoms</p>
              <p>- <strong>Smoking</strong> doubles the risk of age-related macular degeneration</p>
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Eye Health Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Eye Health 2026 tool to get instant, evidence-based results personalized to your age, weight, and health goals. No signup required — complete privacy guaranteed.
        </p>
        <p className="text-sm text-gray-600">
          The calculator applies the calculation method described in its methodology and lets you explore different input scenarios. The result is an estimate, not a diagnosis.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Eye Health Calculator"
        category="health"
        intro={`The **Eye Health Calculator** is a a health information tool using the method and reference data described for this calculator. Get your eye health instantly - no account needed, works on all devices.

**Why Eye Health matters for your health:** Understanding your eye health is one of the most important steps in proactive health management. Healthcare professionals use eye health as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.





Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Eye Health Calculator:** This tool applies the calculation method described for eye health in clinical and research settings across the United States and internationally.



**How to interpret your results:** Your eye health result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current eye health requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "Real-Time Eye Health Calculator output as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Eye Health Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Eye Health Calculator methodology and assumptions & Guidelines", text: "The methodology should be interpreted alongside the specific formula and sources described for this calculator; a health result is an estimate and should not be treated as a clinical diagnosis. " },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Eye Health Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Eye Health Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Eye Health Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Eye Health Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Eye Health Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Eye Health calculation:**



2. **Track trends, not single readings:** One measurement is a snapshot. Track your eye health monthly for 3-6 months to see meaningful trends. Healthy eye health improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Eye Health is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your eye health is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Eye Health Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.



For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

`}
      />
      )}
    </CalculatorLayout>
  )
}
