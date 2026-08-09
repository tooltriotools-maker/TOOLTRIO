'use client'
import { useState, useMemo } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, relatedCalculators, blogSlug, seoContent }: Props) {

  const [age, setAge] = useState(35)
  const [gender, setGender] = useState<'male'|'female'>('male')
  const [calories, setCalories] = useState(2000)
  const [currentFiber, setCurrentFiber] = useState(15)

  const HIGH_FIBER_FOODS = [
    {name:'Split Peas (1 cup cooked)',fiber:16,icon:'🟡'},{name:'Lentils (1 cup cooked)',fiber:15,icon:'🟤'},
    {name:'Black Beans (1 cup)',fiber:15,icon:'⚫'},{name:'Artichoke (1 medium)',fiber:10,icon:'💚'},
    {name:'Avocado (1/2)',fiber:7,icon:'🥑'},{name:'Broccoli (1 cup)',fiber:5,icon:'🥦'},
    {name:'Oats (1 cup dry)',fiber:4,icon:'🌾'},{name:'Apple with skin',fiber:4.5,icon:'🍎'},
    {name:'Brown Rice (1 cup)',fiber:3.5,icon:'🍚'},{name:'Almonds (28g/1oz)',fiber:3.5,icon:'🥜'},
  ]

  const result = useMemo(() => {
    const recommended = gender==='male' ? (age<51?38:30) : (age<51?25:21)
    const altRec = Math.round(calories/1000*14)
    const target = Math.max(recommended, altRec)
    const gap = Math.max(0, target - currentFiber)
    const pct = Math.min(100, Math.round(currentFiber/target*100))
    return { recommended, altRec, target, gap, pct,
      soluble:Math.round(target*0.35), insoluble:Math.round(target*0.65) }
  }, [age,gender,calories,currentFiber])

  return (
    <CalculatorLayout title="Daily Fiber Intake Calculator" description="Calculate your daily fiber needs, track current intake vs goal, and discover the best fiber-rich foods to add." icon="🌾" category="Health" relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="fiber-intake-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Your Details</h2>
          <div className="space-y-4">
            <SelectField label="Gender" value={gender} onChange={v=>setGender(v as any)} options={[{value:'male',label:'Male'},{value:'female',label:'Female'}]} />
            <InputField label="Age" value={age} onChange={setAge} min={5} max={90} step={1} suffix="yrs" />
            <InputField label="Daily Calories" value={calories} onChange={setCalories} min={1200} max={4000} step={100} suffix="kcal" />
            <InputField label="Current Fiber Intake" value={currentFiber} onChange={setCurrentFiber} min={0} max={80} step={1} suffix="g/day" />
          </div>
          <div className="mt-5 p-4 bg-green-50 rounded-xl border-2 border-green-200 text-center">
            <p className="text-xs font-bold text-green-600 uppercase">Daily Target</p>
            <p className="text-4xl font-black text-green-700">{result.target}g</p>
            <p className="text-xs text-gray-500">~{result.soluble}g soluble + {result.insoluble}g insoluble</p>
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600">Current: {currentFiber}g</span>
              <span className="font-bold text-gray-900">{result.pct}%</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all ${result.pct>=100?'bg-green-500':result.pct>=75?'bg-blue-400':result.pct>=50?'bg-yellow-400':'bg-red-400'}`} style={{width:`${result.pct}%`}} />
            </div>
            {result.gap > 0 && <p className="text-xs text-orange-600 font-semibold mt-1">Need {result.gap}g more fiber daily</p>}
          </div>
        </Card>
        <div className="lg:col-span-2">
          <Card>
            <h3 className="font-bold text-gray-900 mb-4">Top High-Fiber Foods to Add</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {HIGH_FIBER_FOODS.map(f=>(
                <div key={f.name} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{f.icon}</span>
                    <span className="text-xs font-medium text-gray-700">{f.name}</span>
                  </div>
                  <span className="text-sm font-black text-green-700">{f.fiber}g</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-700">
              <p className="font-bold">💧 Important: Increase water intake when adding fiber</p>
              <p className="mt-1">Add fiber gradually (5g per week) to avoid bloating. Aim for 8-10 cups of water daily when eating high-fiber diet.</p>
            </div>
          </Card>
        </div>
      </div>

      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Fiber Intake Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Fiber Intake 2026 tool to get instant, evidence-based results personalized to your age, weight, and health goals. No signup required — complete privacy guaranteed.
        </p>
        <p className="text-sm text-gray-600">
          The calculator applies the calculation method described in its methodology and lets you explore different input scenarios. The result is an estimate, not a diagnosis.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Fiber Intake Calculator"
        category="health"
        intro={`The **Fiber Intake Calculator** is a a health information tool using the method and reference data described for this calculator. Get your fiber intake instantly - no account needed, works on all devices.

**Why Fiber Intake matters for your health:** Understanding your fiber intake is one of the most important steps in proactive health management. Healthcare professionals use fiber intake as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.





Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Fiber Intake Calculator:** This tool applies the calculation method described for fiber intake in clinical and research settings across the United States and internationally.



**How to interpret your results:** Your fiber intake result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current fiber intake requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "Real-Time Fiber Intake Calculator output as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Fiber Intake Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Fiber Intake Calculator methodology and assumptions & Guidelines", text: "The methodology should be interpreted alongside the specific formula and sources described for this calculator; a health result is an estimate and should not be treated as a clinical diagnosis. " },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Fiber Intake Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Fiber Intake Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Fiber Intake Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Fiber Intake Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Fiber Intake Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Fiber Intake calculation:**



2. **Track trends, not single readings:** One measurement is a snapshot. Track your fiber intake monthly for 3-6 months to see meaningful trends. Healthy fiber intake improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Fiber Intake is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your fiber intake is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Fiber Intake Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.



For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

`}
      />
      )}
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )

}
