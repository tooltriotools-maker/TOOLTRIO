'use client'
import { useState } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

const FOODS = [{n:'Oysters (100g)',mg:78},{n:'Beef (100g)',mg:6.3},{n:'Hemp seeds (30g)',mg:3.0},{n:'Pumpkin seeds (30g)',mg:2.2},{n:'Chickpeas (100g cooked)',mg:1.5},{n:'Cashews (30g)',mg:1.6},{n:'Cheddar cheese (30g)',mg:1.1},{n:'Oats (100g dry)',mg:3.6}]

export default function CalculatorClient({ faqs, relatedCalculators, blogSlug, seoContent }: Props) {
  const [age, setAge] = useState(35)
  const [gender, setGender] = useState<'male'|'female'>('male')
  const [pregnant, setPregnant] = useState(false)
  const [veg, setVeg] = useState(false)

  const base = pregnant?11:gender==='male'?(age>=19?11:9):(age>=19?8:9)
  const rdi = veg ? Math.round(base * 1.5) : base

  return (
    <CalculatorLayout title="Zinc Calculator" description="Calculate your daily zinc requirements based on age, gender, and dietary choices." icon="⚗️" category="Health" relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="zinc-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-5">Your Profile</h2>
          <div className="space-y-4">
            <SelectField label="Gender" value={gender} onChange={v=>setGender(v as any)} options={[{value:'male',label:'Male'},{value:'female',label:'Female'}]} />
            <InputField label="Age" value={age} onChange={setAge} min={1} max={100} step={1} suffix="yrs" />
            <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer"><input type="checkbox" checked={veg} onChange={e=>setVeg(e.target.checked)} className="accent-rose-500"/><span>Vegetarian / Vegan (+50% needed)</span></label>
            {gender==='female'&&<label className="flex items-center gap-2 text-sm font-semibold cursor-pointer"><input type="checkbox" checked={pregnant} onChange={e=>setPregnant(e.target.checked)} className="accent-rose-500"/><span>Pregnant</span></label>}
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          <Card gradient>
            <div className="text-center py-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Daily Zinc Target</p>
              <div className="text-7xl font-black text-rose-500 mb-2">{rdi}<span className="text-3xl">mg</span></div>
              <p className="text-gray-500">Upper safe limit: 40mg/day</p>
            </div>
          </Card>
          <Card>
            <h3 className="font-semibold text-gray-700 mb-3">Best Zinc Food Sources</h3>
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
          Zinc Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          An adult woman aged 19–50 needs <strong>8 mg of zinc/day</strong>. Pregnant women need 11 mg/day. Adult men need 11 mg/day. Deficiency affects 15% of US women.
        </p>
        <p className="text-sm text-gray-600">
          This Zinc 2026 uses current NIH Dietary Reference Intakes to calculate your personalized daily target based on age, sex, and health status.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Zinc Calculator"
        category="health"
        intro={`The **ZINC Calculator** is a a health information tool using the method and reference data described for this calculator. Get your zinc instantly - no account needed, works on all devices.

**Why Zinc matters for your health:** Understanding your zinc is one of the most important steps in proactive health management. Healthcare professionals use zinc as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.





Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Zinc Calculator:** This tool applies the calculation method described for zinc in clinical and research settings across the United States and internationally.



**How to interpret your results:** Your zinc result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current zinc requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "Real-Time Zinc Calculator output as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Zinc Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Zinc Calculator methodology and assumptions & Guidelines", text: "The methodology should be interpreted alongside the specific formula and sources described for this calculator; a health result is an estimate and should not be treated as a clinical diagnosis. " },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Zinc Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Zinc Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Zinc Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Zinc Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Zinc Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Zinc calculation:**



2. **Track trends, not single readings:** One measurement is a snapshot. Track your zinc monthly for 3-6 months to see meaningful trends. Healthy zinc improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Zinc is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your zinc is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Zinc Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.



For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

`}
      />
      )}
    </CalculatorLayout>
  )
}
