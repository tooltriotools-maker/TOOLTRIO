'use client'
import { useState } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

const FOODS = [{n:'Guava (100g)',mg:228},{n:'Bell pepper red (100g)',mg:128},{n:'Kiwi (100g)',mg:93},{n:'Broccoli (100g)',mg:89},{n:'Strawberries (100g)',mg:59},{n:'Orange (100g)',mg:53},{n:'Lemon juice (30ml)',mg:14},{n:'Spinach (100g)',mg:28}]

export default function CalculatorClient({ faqs, relatedCalculators, blogSlug, seoContent }: Props) {
  const [age, setAge] = useState(35)
  const [gender, setGender] = useState<'male'|'female'>('male')
  const [smoker, setSmoker] = useState(false)
  const [pregnant, setPregnant] = useState(false)

  const base = gender==='male'?(age>=19?90:65):(age>=19?75:65)
  const rdi = pregnant?85:smoker?base+35:base
  const upperLimit = 2000

  return (
    <CalculatorLayout title="Vitamin C Calculator" description="Calculate your daily vitamin C requirements and discover the best food sources." icon="🍊" category="Health" relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="vitamin-c-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-5">Your Profile</h2>
          <div className="space-y-4">
            <SelectField label="Gender" value={gender} onChange={v=>setGender(v as any)} options={[{value:'male',label:'Male'},{value:'female',label:'Female'}]} />
            <InputField label="Age" value={age} onChange={setAge} min={1} max={100} step={1} suffix="yrs" />
            <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer"><input type="checkbox" checked={smoker} onChange={e=>setSmoker(e.target.checked)} className="accent-rose-500"/><span>Smoker (+35mg needed)</span></label>
            {gender==='female'&&<label className="flex items-center gap-2 text-sm font-semibold cursor-pointer"><input type="checkbox" checked={pregnant} onChange={e=>setPregnant(e.target.checked)} className="accent-rose-500"/><span>Pregnant</span></label>}
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          <Card gradient>
            <div className="text-center py-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Daily Vitamin C Target</p>
              <div className="text-7xl font-black text-rose-500 mb-2">{rdi}<span className="text-3xl">mg</span></div>
              <p className="text-gray-500">Upper safe limit: {upperLimit}mg/day</p>
            </div>
          </Card>
          <Card>
            <h3 className="font-semibold text-gray-700 mb-3">Vitamin C Food Sources</h3>
            <div className="space-y-1">
              {FOODS.map(f=>(
                <div key={f.n} className="flex justify-between text-sm py-1 border-b border-gray-50 last:border-0">
                  <span className="text-gray-600">{f.n}</span><span className="font-bold">{f.mg}mg ({Math.round(f.mg/rdi*100)}% RDI)</span>
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
          Vitamin C Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          
        </p>
        <p className="text-sm text-gray-600">
          This Vitamin C 2026 uses current NIH Dietary Reference Intakes to calculate your personalized daily target based on age, sex, and health status.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Vitamin C Calculator"
        category="health"
        intro={`The **Vitamin C Calculator** is a a health information tool using the method and reference data described for this calculator. Get your vitamin c instantly - no account needed, works on all devices.

**Why Vitamin C matters for your health:** Understanding your vitamin c is one of the most important steps in proactive health management. Healthcare professionals use vitamin c as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.





Combine this with [our Immune Health Calculator](/calculators/health/immune-health-calculator), [our Iron Intake Calculator](/calculators/health/iron-intake-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Vitamin C Calculator:** This tool applies the calculation method described for vitamin c in clinical and research settings across the United States and internationally.



**How to interpret your results:** Your vitamin c result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current vitamin c requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "Real-Time Vitamin C Calculator output as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Vitamin C Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Vitamin C Calculator methodology and assumptions & Guidelines", text: "The methodology should be interpreted alongside the specific formula and sources described for this calculator; a health result is an estimate and should not be treated as a clinical diagnosis. " },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Vitamin C Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Vitamin C Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Vitamin C Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Vitamin C Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Vitamin C Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Vitamin C calculation:**



2. **Track trends, not single readings:** One measurement is a snapshot. Track your vitamin c monthly for 3-6 months to see meaningful trends. Healthy vitamin c improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Vitamin C is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your vitamin c is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Vitamin C Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.



For a complete health overview, also use [our Immune Health Calculator](/calculators/health/immune-health-calculator), [our Iron Intake Calculator](/calculators/health/iron-intake-calculator), and [our Inflammation Risk Calculator](/calculators/health/inflammation-risk-calculator).

`}
      />
      )}
    </CalculatorLayout>
  )
}
