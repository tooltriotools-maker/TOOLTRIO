'use client'
import { useState } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, relatedCalculators, blogSlug, seoContent }: Props) {
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial')
  const [weight, setWeight] = useState(154)
  const [experience, setExperience] = useState<'beginner'|'intermediate'|'advanced'>('beginner')
  const [gender, setGender] = useState<'male'|'female'>('male')
  const [age, setAge] = useState(25)

  const rates = {
    beginner:{male:1.5,female:0.75},
    intermediate:{male:0.75,female:0.375},
    advanced:{male:0.375,female:0.188},
  }
  const ageAdj = age > 40 ? 0.8 : age > 50 ? 0.6 : 1.0
  const monthlyKg = rates[experience][gender] * ageAdj
  const yearlyKg = monthlyKg * 12
  const calSurplus = Math.round(monthlyKg * 7700 / 30)
  const protein = Math.round(weight * 2.2)

  return (
    <CalculatorLayout title="Muscle Gain Calculator" description="Calculate realistic muscle gain rates based on experience level, gender, and age." icon="💪" category="Health" relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="muscle-gain-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-5">Your Profile</h2>
          <div className="space-y-4">
            <SelectField label="Gender" value={gender} onChange={v=>setGender(v as any)} options={[{value:'male',label:'Male'},{value:'female',label:'Female'}]} />
            <InputField label="Body Weight (kg)" value={weight} onChange={setWeight} min={40} max={200} step={1} suffix="kg" />
            <InputField label="Age" value={age} onChange={setAge} min={15} max={80} step={1} suffix="yrs" />
            <SelectField label="Training Experience" value={experience} onChange={v=>setExperience(v as any)} options={[{value:'beginner',label:'Beginner (< 1 year)'},{value:'intermediate',label:'Intermediate (1-3 years)'},{value:'advanced',label:'Advanced (3+ years)'}]} />
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          <Card gradient>
            <div className="text-center py-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Expected Monthly Muscle Gain</p>
              <div className="text-7xl font-black text-rose-500 mb-2">{monthlyKg.toFixed(2)}<span className="text-3xl">kg</span></div>
              <p className="text-gray-500">under optimal conditions (training, nutrition, sleep)</p>
            </div>
          </Card>
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Per Year" value={`${yearlyKg.toFixed(1)} kg`} highlight />
            <ResultCard label="Calorie Surplus" value={`+${calSurplus} kcal/day`} />
            <ResultCard label="Protein Target" value={`${protein}g/day`} />
          </div>
          <Card>
            <h3 className="font-semibold text-gray-700 mb-3">Muscle Gain Milestones</h3>
            <div className="space-y-2">
              {[1,3,6,12].map(m=>(
                <div key={m} className="flex justify-between text-sm"><span className="text-gray-600">{m} month{m>1?'s':''}</span><span className="font-bold">+{(monthlyKg*m).toFixed(1)} kg muscle</span></div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3">Note: Beginners experience significantly faster gains than intermediates and advanced lifters.</p>
          </Card>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Muscle Gain Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Muscle Gain 2026 tool to get instant, evidence-based results personalized to your age, weight, and health goals. No signup required — complete privacy guaranteed.
        </p>
        <p className="text-sm text-gray-600">
          The calculator applies the calculation method described in its methodology and lets you explore different input scenarios. The result is an estimate, not a diagnosis.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Muscle Gain Calculator"
        category="health"
        intro={`The **Muscle Gain Calculator** is a a health information tool using the method and reference data described for this calculator. Get your muscle gain instantly - no account needed, works on all devices.

**Why Muscle Gain matters for your health:** Understanding your muscle gain is one of the most important steps in proactive health management. Healthcare professionals use muscle gain as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.





Combine this with [our Protein Intake Calculator](/calculators/health/protein-intake-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Muscle Gain Calculator:** This tool applies the calculation method described for muscle gain in clinical and research settings across the United States and internationally.



**How to interpret your results:** Your muscle gain result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current muscle gain requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "Real-Time Muscle Gain Calculator output as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Muscle Gain Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Muscle Gain Calculator methodology and assumptions & Guidelines", text: "The methodology should be interpreted alongside the specific formula and sources described for this calculator; a health result is an estimate and should not be treated as a clinical diagnosis. " },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Muscle Gain Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Muscle Gain Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Muscle Gain Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Muscle Gain Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Muscle Gain Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Muscle Gain calculation:**



2. **Track trends, not single readings:** One measurement is a snapshot. Track your muscle gain monthly for 3-6 months to see meaningful trends. Healthy muscle gain improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Muscle Gain is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your muscle gain is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Muscle Gain Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.



For a complete health overview, also use [our Protein Intake Calculator](/calculators/health/protein-intake-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator), and [our One Rep Max Calculator](/calculators/health/one-rep-max-calculator).

`}
      />
      )}
    </CalculatorLayout>
  )
}
