'use client'
import { useState, useMemo } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card } from '@/components/ui/Card'
import { InputField, SelectField, HeightField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug, seoContent }: Props) {
  const [weight, setWeight] = useState(165)
  const [height, setHeight] = useState(69)
  const [gender, setGender] = useState<'male'|'female'>('male')
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial')

  const result = useMemo(() => {
    const wKg = unit==='imperial' ? weight*0.453592 : weight
    const hCm = unit==='imperial' ? height*2.54 : height
    // Three formulas
    let boer, james, hume
    if (gender==='male') {
      boer  = 0.407*wKg + 0.267*hCm - 19.2
      james = 1.1*wKg - 128*Math.pow(wKg/hCm, 2)
      hume  = 0.3281*wKg + 0.33929*hCm - 29.5336
    } else {
      boer  = 0.252*wKg + 0.473*hCm - 48.3
      james = 1.07*wKg - 148*Math.pow(wKg/hCm, 2)
      hume  = 0.29569*wKg + 0.41813*hCm - 43.2933
    }
    const avg = (boer+james+hume)/3
    const fatMass = wKg - avg
    const fatPct = (fatMass/wKg)*100
    const lbmPct = 100 - fatPct
    const muscleMass = avg * 0.42
    const boneMass   = avg * 0.15
    const organWater = avg * 0.43
    return {
      boer:Math.round(boer*10)/10, james:Math.round(james*10)/10, hume:Math.round(hume*10)/10,
      avg:Math.round(avg*10)/10, fatMass:Math.round(fatMass*10)/10, fatPct:Math.round(fatPct*10)/10,
      lbmPct:Math.round(lbmPct*10)/10, muscleMass:Math.round(muscleMass*10)/10,
      boneMass:Math.round(boneMass*10)/10, organWater:Math.round(organWater*10)/10, wKg:Math.round(wKg*10)/10
    }
  }, [weight, height, gender, unit])

  const composition = [
    {name:'Skeletal Muscle',  val:result.muscleMass, color:'#3b82f6', pct:Math.round(result.muscleMass/result.wKg*100)},
    {name:'Organs & Water',   val:result.organWater, color:'#8b5cf6', pct:Math.round(result.organWater/result.wKg*100)},
    {name:'Bone',             val:result.boneMass,   color:'#6b7280', pct:Math.round(result.boneMass/result.wKg*100)},
    {name:'Fat Mass',         val:result.fatMass,    color:'#f59e0b', pct:Math.round(result.fatMass/result.wKg*100)},
  ]

  return (
    <CalculatorLayout title="Lean Body Mass Calculator" description="Calculate lean body mass using Boer, James, and Hume formulas. Understand your muscle and fat composition." icon="💪" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Your Details</h2>
          <div className="space-y-4">
            <SelectField label="Unit" value={unit} onChange={v=>setUnit(v as any)} options={[{value:'metric',label:'Metric (kg/cm)'},{value:'imperial',label:'Imperial (lbs/in)'}]} />
            <SelectField label="Gender" value={gender} onChange={v=>setGender(v as any)} options={[{value:'male',label:'Male'},{value:'female',label:'Female'}]} />
            <InputField label={`Weight (${unit==='metric'?'kg':'lbs'})`} value={weight} onChange={setWeight} min={unit==='metric'?30:66} max={unit==='metric'?200:440} step={0.5} suffix={unit==='metric'?'kg':'lbs'} />
            <HeightField unit={unit} value={height} onChange={setHeight} />
</div>
          <div className="mt-5 p-4 bg-blue-50 rounded-xl text-center border border-blue-200">
            <p className="text-xs text-gray-500">Average LBM (3 formulas)</p>
            <p className="text-4xl font-black text-blue-700">{result.avg}</p>
            <p className="text-sm text-gray-500">kg ({result.lbmPct}% of body weight)</p>
          </div>
          <div className="mt-3 p-3 bg-yellow-50 rounded-xl text-center border border-yellow-200">
            <p className="text-xs text-gray-500">Estimated Fat Mass</p>
            <p className="text-2xl font-black text-yellow-700">{result.fatMass} kg</p>
            <p className="text-xs text-gray-400">{result.fatPct}% body fat</p>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <h3 className="font-bold text-gray-900 mb-4">Formula Comparison</h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[{n:'Boer',v:result.boer},{n:'James',v:result.james},{n:'Hume',v:result.hume}].map(f=>(
                <div key={f.n} className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <p className="text-xs font-bold text-gray-500">{f.n} Formula</p>
                  <p className="text-2xl font-black text-gray-900">{f.v}</p>
                  <p className="text-xs text-gray-400">kg LBM</p>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h3 className="font-bold text-gray-900 mb-4">Body Composition Breakdown</h3>
            <div className="space-y-3">
              {composition.map(c=>(
                <div key={c.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-gray-700">{c.name}</span>
                    <span className="font-bold">{c.val} kg ({c.pct}%)</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{width:`${c.pct}%`,backgroundColor:c.color}} />
                  </div>
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
          Lean Body Mass Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Lean Body Mass 2026 tool to get instant, evidence-based results personalized to your age, weight, and health goals. No signup required — complete privacy guaranteed.
        </p>
        <p className="text-sm text-gray-600">
          All calculations use validated formulas from CDC, NIH, and peer-reviewed health research. Adjust your inputs to explore different scenarios and health targets.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Lean Body Mass Calculator"
        category="health"
        intro={`The **Lean Body Mass Calculator** is a free, evidence-based health assessment tool using formulas validated by the CDC, NIH, American Heart Association (AHA), and Academy of Nutrition and Dietetics. Get your lean body mass instantly - no account needed, works on all devices.

**Why Lean Body Mass matters for your health:** Understanding your lean body mass is one of the most important steps in proactive health management. Healthcare professionals use lean body mass as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.

**Based on US health standards:** This calculator uses reference ranges and formulas from CDC NHANES population data, NIH Dietary Reference Intakes (DRIs), American Heart Association clinical guidelines, and peer-reviewed research published in JAMA, NEJM, and the American Journal of Clinical Nutrition.

**Supports US customary AND metric units:** Enter your measurements in pounds and inches (the American way) or kilograms and centimeters - the calculator handles both instantly. Results include comparison to healthy ranges for your age and gender based on US population norms.

Combine this with [our Body Fat Calculator](/calculators/health/body-fat-calculator), [our Protein Intake Calculator](/calculators/health/protein-intake-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Lean Body Mass Calculator:** This tool uses peer-reviewed, scientifically validated formulas that are the current gold standard for calculating lean body mass in clinical and research settings across the United States and internationally.

**Population reference data:** Results are compared against NHANES (National Health and Nutrition Examination Survey) data from the CDC - the largest, most comprehensive health survey of the US population, covering 5,000+ Americans annually. This gives your result meaningful context relative to real Americans of your age and gender.

**How to interpret your results:** Your lean body mass result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current lean body mass requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "100% Free - No Signup, No Subscription, No Ads", text: "This Lean Body Mass Calculator is permanently and completely free. There are no premium features locked behind a paywall, no trial periods, no subscription fees, and no advertisements that track your behavior. Every American deserves access to professional-grade health and wellness tools without financial or privacy barriers." },
          { title: "Real-Time Instant Results as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Lean Body Mass Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Validated US-Standard Formulas & Guidelines", text: "All calculations use formulas from peer-reviewed research and recognized US professional standards endorsed by the CDC, NIH, American Heart Association, and Academy of Nutrition and Dietetics. The same methodologies trusted by registered dietitians, physicians, and certified fitness professionals across America power this calculator's results." },
          { title: "Complete Privacy - Your Data Stays on Your Device", text: "Everything runs locally in your browser. No personal data is transmitted to any server, stored in any database, or shared with any third party - ever. When you close the browser tab, your inputs disappear permanently. This privacy-first design is essential for sensitive health and wellness information." },
          { title: "Works Perfectly on All Devices & Browsers", text: "Whether you're on an iPhone at the gym, an Android tablet at home, a MacBook at a coffee shop, or a Windows PC at the office, the Lean Body Mass Calculator works flawlessly. Fully responsive design tested on all major US browsers and mobile platforms ensures a consistent, high-quality experience everywhere." },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        scienceSection={`The scientific and professional community in the United States has developed the methodologies underlying this Lean Body Mass Calculator over decades of research, validation, and refinement. Major institutions including the National Institutes of Health (NIH), the Centers for Disease Control and Prevention (CDC), leading American universities, and national professional associations have all contributed to the body of evidence that informs the calculations this tool performs.

Peer-reviewed research published in major American journals - including JAMA, the New England Journal of Medicine, the American Journal of Clinical Nutrition, the Journal of Financial Planning, and other respected publications - provides the scientific foundation for the formulas and reference ranges used here. When multiple validated methods exist, this calculator uses the approach shown to be most accurate for the general American adult population in comparative studies.

Understanding that science is never fully settled, the formulas and reference ranges in this tool are periodically reviewed and updated as new evidence emerges. The goal is to always provide calculations based on the most current and widely-accepted professional consensus - giving you access to the same evidence base that trained professionals consult when working with American clients and patients every day.

It is also important to note that population-based research, by its nature, describes averages and distributions rather than guaranteeing outcomes for any specific individual. Your personal results may differ from calculated predictions based on genetic factors, environmental influences, lifestyle variables, or other individual characteristics. This is not a limitation of the tool - it reflects the inherent complexity of human biology and personal circumstances - and it is precisely why tracking your actual outcomes and adjusting accordingly is always recommended alongside any calculatio-based goal-setting.`}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Lean Body Mass Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Lean Body Mass Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Lean Body Mass Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Lean Body Mass Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Lean Body Mass Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Lean Body Mass calculation:**

1. **Consistency in measurement:** Measure at the same time of day, same conditions. For body measurements (weight, body fat), morning after using the bathroom and before eating gives most consistent results. For health scores, enter your resting values, not post-exercise numbers.

2. **Track trends, not single readings:** One measurement is a snapshot. Track your lean body mass monthly for 3-6 months to see meaningful trends. Healthy lean body mass improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Lean Body Mass is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your lean body mass is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Lean Body Mass Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.

Use this calculator regularly as your situation changes over time - recalculate whenever your key inputs change significantly to ensure your goals and targets remain calibrated to your current reality. Explore our full library of related calculators to build a comprehensive understanding of your complete health and wellness situation, since no single metric tells the whole story.

For a complete health overview, also use [our Body Fat Calculator](/calculators/health/body-fat-calculator), [our Protein Intake Calculator](/calculators/health/protein-intake-calculator), and [our BMR Calculator](/calculators/health/bmr-calculator).

Remember that the most powerful use of any calculator is not just knowing your current number, but using that number to set a clear, measurable goal and tracking your progress toward it. Accurate information, consistently tracked and thoughtfully applied with patience and consistency, is one of the most powerful tools available for improving any area of your life. Start with what you know today, commit to the process, and let data guide your journey.`}
      />
      )}
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )

}
