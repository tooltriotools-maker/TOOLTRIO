'use client'
import { useState, useMemo } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { structuredData?: object[]; faqs: any[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, relatedCalculators, blogSlug, seoContent }: Props) {

  const [age, setAge] = useState(40)
  const [bmi, setBmi] = useState(26)
  const [waist, setWaist] = useState(85)
  const [gender, setGender] = useState<'male'|'female'>('male')
  const [family, setFamily] = useState<'none'|'grandparent'|'parent_sibling'>('none')
  const [activity, setActivity] = useState<'active'|'moderate'|'inactive'>('moderate')
  const [bp, setBp] = useState(false)
  const [gestational, setGestational] = useState(false)

  const result = useMemo(() => {
    let score = 0
    // Age
    if (age>=35 && age<45) score+=1; else if (age>=45 && age<55) score+=2; else if (age>=55) score+=3
    // BMI
    if (bmi>=25 && bmi<30) score+=1; else if (bmi>=30) score+=3
    // Waist (cm)
    const waistLimit = gender==='male' ? [94,102] : [80,88]
    if (waist>=waistLimit[0] && waist<waistLimit[1]) score+=3; else if (waist>=waistLimit[1]) score+=4
    // Activity
    if (activity==='moderate') score+=1; else if (activity==='inactive') score+=2
    // Family
    if (family==='grandparent') score+=3; else if (family==='parent_sibling') score+=5
    // BP
    if (bp) score+=2
    // Gestational diabetes
    if (gestational) score+=3

    let risk='', color='', advice='', pct=''
    if (score<7)       { risk='Low Risk';          color='text-green-700 bg-green-50 border-green-200';  pct='<1% 10-yr';  advice='Low risk. Maintain healthy weight, stay active, eat well. Recheck in 3 years.' }
    else if (score<12) { risk='Slightly Elevated';  color='text-yellow-700 bg-yellow-50 border-yellow-200'; pct='~4% 10-yr';  advice='Consider annual HbA1c check. Small lifestyle improvements recommended.' }
    else if (score<15) { risk='Moderate Risk';      color='text-orange-700 bg-orange-50 border-orange-200'; pct='~17% 10-yr'; advice='See your doctor for HbA1c/fasting glucose test. Lifestyle changes now can prevent T2D.' }
    else if (score<20) { risk='High Risk';          color='text-red-700 bg-red-50 border-red-200';      pct='~33% 10-yr'; advice='Get tested for prediabetes now. Join a diabetes prevention program. Weight loss is most effective intervention.' }
    else               { risk='Very High Risk';     color='text-red-800 bg-red-100 border-red-300';     pct='>50% 10-yr'; advice='See your doctor urgently for full diabetes screening. Immediate lifestyle changes essential.' }

    const tips = ['Lose 5-7% of body weight if overweight','Exercise 150+ minutes/week (brisk walking counts)','Replace refined carbs with whole grains','Increase vegetable intake to 5+ servings/day','Limit sugary drinks (including juice)','Get adequate sleep (7-9 hours)']
    return { score, risk, color, advice, pct, tips }
  }, [age,bmi,waist,gender,family,activity,bp,gestational])

  return (
    <CalculatorLayout title="Type 2 Diabetes Risk Calculator" description="Assess your risk of developing Type 2 diabetes using evidence-based FINDRISC scoring. Get personalised prevention tips." icon="🩺" category="Health" relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="diabetes-risk-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Risk Factors</h2>
          <div className="space-y-4">
            <SelectField label="Gender" value={gender} onChange={v=>setGender(v as any)} options={[{value:'male',label:'Male'},{value:'female',label:'Female'}]} />
            <InputField label="Age" value={age} onChange={setAge} min={18} max={90} step={1} suffix="yrs" />
            <InputField label="BMI" value={bmi} onChange={setBmi} min={15} max={55} step={0.5} suffix="kg/m2" />
            <InputField label="Waist Circumference (cm)" value={waist} onChange={setWaist} min={50} max={160} step={1} suffix="cm" />
            <SelectField label="Physical Activity" value={activity} onChange={v=>setActivity(v as any)} options={[{value:'active',label:'Active (3+ sessions/week)'},{value:'moderate',label:'Moderate (1-2 sessions/week)'},{value:'inactive',label:'Inactive (rarely exercise)'}]} />
            <SelectField label="Family History" value={family} onChange={v=>setFamily(v as any)} options={[{value:'none',label:'No family history'},{value:'grandparent',label:'Grandparent had T2D'},{value:'parent_sibling',label:'Parent or sibling has T2D'}]} />
            {[{label:'High blood pressure?',val:bp,set:setBp},{label:'Gestational diabetes? (women)',val:gestational,set:setGestational}].map(({label,val,set})=>(
              <div key={label} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-sm font-medium text-gray-700">{label}</span>
                <button onClick={()=>set(!val)} className={`w-10 h-5 rounded-full transition-all ${val?'bg-red-500':'bg-gray-200'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full mx-0.5 transition-transform ${val?'translate-x-5':''}`} />
                </button>
              </div>
            ))}
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          <div className={`p-6 rounded-2xl border-2 text-center ${result.color}`}>
            <p className="text-xs font-bold uppercase tracking-wide opacity-70">FINDRISC Score: {result.score}/26</p>
            <p className="text-3xl font-black my-2">{result.risk}</p>
            <p className="font-semibold text-sm">{result.pct} chance of developing T2D</p>
            <p className="text-sm mt-3 leading-relaxed opacity-80">{result.advice}</p>
          </div>
          <Card>
            <h3 className="font-bold text-gray-900 mb-3">Prevention Tips</h3>
            <ul className="space-y-2">
              {result.tips.map(t=>(
                <li key={t} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-green-500 font-bold mt-0.5">v</span>{t}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Diabetes Risk Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          A 45-year-old with BMI 27, family history of diabetes, and sedentary lifestyle has a <strong>15–20% 10-year risk</strong> of developing Type 2 diabetes. Losing 7% of body weight reduces this risk by 58% (DPP study).
        </p>
        <p className="text-sm text-gray-600">
          This Diabetes Risk 2026 uses the ADA FINDRISC screening tool to assess your personal risk level and provide evidence-based prevention strategies.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Diabetes Risk Calculator"
        category="health"
        intro={`The **Diabetes Risk Calculator** is a a health information tool using the method and reference data described for this calculator. Get your diabetes risk instantly - no account needed, works on all devices.

**Why Diabetes Risk matters for your health:** Understanding your diabetes risk is one of the most important steps in proactive health management. Healthcare professionals use diabetes risk as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the the same calculation framework described in this guide.





Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Blood Pressure Calculator](/calculators/health/blood-pressure-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Diabetes Risk Calculator:** This tool applies the calculation method described for diabetes risk in clinical and research settings across the United States and internationally.



**How to interpret your results:** Your diabetes risk result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current diabetes risk requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "Real-Time Diabetes Risk Calculator output as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Diabetes Risk Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Diabetes Risk Calculator methodology and assumptions & Guidelines", text: "The methodology should be interpreted alongside the specific formula and sources described for this calculator; a health result is an estimate and should not be treated as a clinical diagnosis. " },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Diabetes Risk Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Diabetes Risk Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Diabetes Risk Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Diabetes Risk Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Diabetes Risk Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Diabetes Risk calculation:**



2. **Track trends, not single readings:** One measurement is a snapshot. Track your diabetes risk monthly for 3-6 months to see meaningful trends. Healthy diabetes risk improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Diabetes Risk is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your diabetes risk is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Diabetes Risk Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.



For a complete health overview, also use [our BMI Calculator](/calculators/health/bmi-calculator), [our Blood Pressure Calculator](/calculators/health/blood-pressure-calculator), and [our Cholesterol Calculator](/calculators/health/cholesterol-calculator).

`}
      />
      )}
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )

}
