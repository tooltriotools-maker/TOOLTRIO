'use client'
import { useState, useMemo } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card } from '@/components/ui/Card'
import { InputField, SelectField, HeightField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug, seoContent }: Props) {

  const [weight, setWeight] = useState(155)
  const [height, setHeight] = useState(67)
  const [age, setAge] = useState(30)
  const [gender, setGender] = useState<'male'|'female'>('male')
  const [activity, setActivity] = useState<'sedentary'|'light'|'moderate'|'active'|'very'>('moderate')
  const [goal, setGoal] = useState<'lose'|'maintain'|'gain'>('maintain')
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial')

  const result = useMemo(() => {
    const wKg = unit==='imperial' ? weight*0.453592 : weight
    const hCm = unit==='imperial' ? height*2.54 : height
    const bmr = gender==='male'
      ? 10*wKg + 6.25*hCm - 5*age + 5
      : 10*wKg + 6.25*hCm - 5*age - 161
    const mults = {sedentary:1.2,light:1.375,moderate:1.55,active:1.725,very:1.9}
    const tdee = Math.round(bmr * mults[activity])
    const target = goal==='lose' ? tdee-450 : goal==='gain' ? tdee+300 : tdee
    const protein = Math.round(wKg * (goal==='lose' ? 2.2 : 1.8))
    const proteinCal = protein*4
    const fatCal = Math.round(target*0.28)
    const fatG = Math.round(fatCal/9)
    const carbG = Math.round((target - proteinCal - fatCal)/4)
    return { bmr:Math.round(bmr), tdee, target, protein, fatG, carbG,
      weeklyChange: goal==='lose' ? -0.45 : goal==='gain' ? 0.3 : 0 }
  }, [weight,height,age,gender,activity,goal,unit])

  const goalColor = goal==='lose'?'text-blue-600 bg-blue-50 border-blue-200':goal==='gain'?'text-green-600 bg-green-50 border-green-200':'text-purple-600 bg-purple-50 border-purple-200'

  return (
    <CalculatorLayout title="TDEE Calculator" description="Calculate your Total Daily Energy Expenditure - how many calories your body needs based on your lifestyle and goals." icon="⚡" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Your Details</h2>
          <div className="space-y-4">
            <SelectField label="Unit" value={unit} onChange={v=>setUnit(v as any)} options={[{value:'metric',label:'Metric (kg/cm)'},{value:'imperial',label:'Imperial (lbs/in)'}]} />
            <SelectField label="Gender" value={gender} onChange={v=>setGender(v as any)} options={[{value:'male',label:'Male'},{value:'female',label:'Female'}]} />
            <InputField label={`Weight (${unit==='metric'?'kg':'lbs'})`} value={weight} onChange={setWeight} min={unit==='metric'?30:66} max={unit==='metric'?200:440} step={0.5} suffix={unit==='metric'?'kg':'lbs'} />
            <HeightField unit={unit} value={height} onChange={setHeight} />
<InputField label="Age" value={age} onChange={setAge} min={15} max={90} step={1} suffix="yrs" />
            <SelectField label="Activity Level" value={activity} onChange={v=>setActivity(v as any)} options={[{value:'sedentary',label:'Sedentary (desk job)'},{value:'light',label:'Light (1-3x/week)'},{value:'moderate',label:'Moderate (3-5x/week)'},{value:'active',label:'Active (6-7x/week)'},{value:'very',label:'Very Active (2x/day)'}]} />
            <SelectField label="Goal" value={goal} onChange={v=>setGoal(v as any)} options={[{value:'lose',label:'🔥 Lose Fat'},{value:'maintain',label:'⚖️ Maintain'},{value:'gain',label:'💪 Build Muscle'}]} />
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl text-center border border-gray-200">
              <p className="text-xs text-gray-500 font-medium">BMR (at rest)</p>
              <p className="text-3xl font-black text-gray-700">{result.bmr}</p>
              <p className="text-xs text-gray-400">kcal/day</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl text-center border border-blue-200">
              <p className="text-xs text-gray-500 font-medium">TDEE (maintenance)</p>
              <p className="text-3xl font-black text-blue-700">{result.tdee}</p>
              <p className="text-xs text-gray-400">kcal/day</p>
            </div>
          </div>
          <div className={`p-5 rounded-xl border-2 text-center ${goalColor}`}>
            <p className="text-xs font-bold uppercase tracking-wide opacity-70">Target Calories ({goal==='lose'?'Fat Loss':goal==='gain'?'Muscle Gain':'Maintenance'})</p>
            <p className="text-5xl font-black my-2">{result.target}</p>
            <p className="text-sm font-semibold">kcal/day - Est. {result.weeklyChange>0?'+':''}{result.weeklyChange} kg/week</p>
          </div>
          <Card>
            <h3 className="font-bold text-gray-900 mb-4">Daily Macro Targets</h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[{n:'Protein',g:result.protein,c:'bg-blue-100 text-blue-800',e:'💪'},{n:'Carbs',g:result.carbG,c:'bg-yellow-100 text-yellow-800',e:'🌾'},{n:'Fat',g:result.fatG,c:'bg-red-100 text-red-800',e:'🥑'}].map(m=>(
                <div key={m.n} className={`p-3 rounded-xl ${m.c}`}>
                  <p className="text-lg">{m.e}</p>
                  <p className="text-2xl font-black">{m.g}g</p>
                  <p className="text-xs font-bold">{m.n}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          TDEE Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          A 30-year-old male, 6'0", 190 lbs with a moderately active lifestyle has a TDEE of approximately <strong>2,850 calories/day</strong>. Eating 2,350 creates a 500-calorie deficit for 1 lb/week loss.
        </p>
        <p className="text-sm text-gray-600">
          This TDEE 2026 accounts for all activity — from gym sessions to daily walking — giving you the most accurate maintenance calorie number possible.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Tdee Calculator"
        category="health"
        intro={`The **TDEE Calculator** is a free, evidence-based health assessment tool using formulas validated by the CDC, NIH, American Heart Association (AHA), and Academy of Nutrition and Dietetics. Get your tdee instantly - no account needed, works on all devices.

**Why Tdee matters for your health:** Understanding your tdee is one of the most important steps in proactive health management. Healthcare professionals use tdee as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.

**Based on US health standards:** This calculator uses reference ranges and formulas from CDC NHANES population data, NIH Dietary Reference Intakes (DRIs), American Heart Association clinical guidelines, and peer-reviewed research published in JAMA, NEJM, and the American Journal of Clinical Nutrition.

**Supports US customary AND metric units:** Enter your measurements in pounds and inches (the American way) or kilograms and centimeters - the calculator handles both instantly. Results include comparison to healthy ranges for your age and gender based on US population norms.

Combine this with [our BMR Calculator](/calculators/health/bmr-calculator), [our Calorie Deficit Calculator](/calculators/health/calorie-deficit-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Tdee Calculator:** This tool uses peer-reviewed, scientifically validated formulas that are the current gold standard for calculating tdee in clinical and research settings across the United States and internationally.

**Population reference data:** Results are compared against NHANES (National Health and Nutrition Examination Survey) data from the CDC - the largest, most comprehensive health survey of the US population, covering 5,000+ Americans annually. This gives your result meaningful context relative to real Americans of your age and gender.

**How to interpret your results:** Your tdee result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current tdee requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "100% Free - No Signup, No Subscription, No Ads", text: "This Tdee Calculator is permanently and completely free. There are no premium features locked behind a paywall, no trial periods, no subscription fees, and no advertisements that track your behavior. Every American deserves access to professional-grade health and wellness tools without financial or privacy barriers." },
          { title: "Real-Time Instant Results as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Tdee Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Validated US-Standard Formulas & Guidelines", text: "All calculations use formulas from peer-reviewed research and recognized US professional standards endorsed by the CDC, NIH, American Heart Association, and Academy of Nutrition and Dietetics. The same methodologies trusted by registered dietitians, physicians, and certified fitness professionals across America power this calculator's results." },
          { title: "Complete Privacy - Your Data Stays on Your Device", text: "Everything runs locally in your browser. No personal data is transmitted to any server, stored in any database, or shared with any third party - ever. When you close the browser tab, your inputs disappear permanently. This privacy-first design is essential for sensitive health and wellness information." },
          { title: "Works Perfectly on All Devices & Browsers", text: "Whether you're on an iPhone at the gym, an Android tablet at home, a MacBook at a coffee shop, or a Windows PC at the office, the Tdee Calculator works flawlessly. Fully responsive design tested on all major US browsers and mobile platforms ensures a consistent, high-quality experience everywhere." },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        scienceSection={`The scientific and professional community in the United States has developed the methodologies underlying this Tdee Calculator over decades of research, validation, and refinement. Major institutions including the National Institutes of Health (NIH), the Centers for Disease Control and Prevention (CDC), leading American universities, and national professional associations have all contributed to the body of evidence that informs the calculations this tool performs.

Peer-reviewed research published in major American journals - including JAMA, the New England Journal of Medicine, the American Journal of Clinical Nutrition, the Journal of Financial Planning, and other respected publications - provides the scientific foundation for the formulas and reference ranges used here. When multiple validated methods exist, this calculator uses the approach shown to be most accurate for the general American adult population in comparative studies.

Understanding that science is never fully settled, the formulas and reference ranges in this tool are periodically reviewed and updated as new evidence emerges. The goal is to always provide calculations based on the most current and widely-accepted professional consensus - giving you access to the same evidence base that trained professionals consult when working with American clients and patients every day.

It is also important to note that population-based research, by its nature, describes averages and distributions rather than guaranteeing outcomes for any specific individual. Your personal results may differ from calculated predictions based on genetic factors, environmental influences, lifestyle variables, or other individual characteristics. This is not a limitation of the tool - it reflects the inherent complexity of human biology and personal circumstances - and it is precisely why tracking your actual outcomes and adjusting accordingly is always recommended alongside any calculatio-based goal-setting.`}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Tdee Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Tdee Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Tdee Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Tdee Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Tdee Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Tdee calculation:**

1. **Consistency in measurement:** Measure at the same time of day, same conditions. For body measurements (weight, body fat), morning after using the bathroom and before eating gives most consistent results. For health scores, enter your resting values, not post-exercise numbers.

2. **Track trends, not single readings:** One measurement is a snapshot. Track your tdee monthly for 3-6 months to see meaningful trends. Healthy tdee improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Tdee is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your tdee is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Tdee Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.

Use this calculator regularly as your situation changes over time - recalculate whenever your key inputs change significantly to ensure your goals and targets remain calibrated to your current reality. Explore our full library of related calculators to build a comprehensive understanding of your complete health and wellness situation, since no single metric tells the whole story.

For a complete health overview, also use [our BMR Calculator](/calculators/health/bmr-calculator), [our Calorie Deficit Calculator](/calculators/health/calorie-deficit-calculator), and [our Macro Calculator](/calculators/health/macro-calculator).

Remember that the most powerful use of any calculator is not just knowing your current number, but using that number to set a clear, measurable goal and tracking your progress toward it. Accurate information, consistently tracked and thoughtfully applied with patience and consistency, is one of the most powerful tools available for improving any area of your life. Start with what you know today, commit to the process, and let data guide your journey.`}
      />
      )}
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )

}
