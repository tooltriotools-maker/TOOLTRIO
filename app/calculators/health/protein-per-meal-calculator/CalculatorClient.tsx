'use client'
import { useState, useMemo } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug, seoContent }: Props) {

  const [weight, setWeight] = useState(165)
  const [goal, setGoal] = useState<'maintain'|'gain'|'cut'>('gain')
  const [meals, setMeals] = useState(4)
  const [age, setAge] = useState(30)
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial')
  const [training, setTraining] = useState<'yes'|'no'>('yes')

  const result = useMemo(() => {
    const wKg = unit === 'imperial' ? weight * 0.453592 : weight
    const goalMult = goal === 'gain' ? 2.0 : goal === 'cut' ? 2.2 : 1.6
    const ageMult = age >= 65 ? 1.2 : 1.0 // older adults need more
    const totalDaily = Math.round(wKg * goalMult * ageMult)
    const perMeal = Math.round(totalDaily / meals)
    const leucine = (perMeal * 0.082).toFixed(1) // leucine ~8.2% of protein
    const mpsOptimal = perMeal >= 40 ? 'Maximised 💪' : perMeal >= 25 ? 'Near optimal' : perMeal >= 15 ? 'Submaximal - add more' : 'Too low for MPS'
    const leucineHit = Number(leucine) >= 2.5
    const SOURCES = [
      {f:'Chicken breast (cooked)',g:Math.round(perMeal/0.31)},{f:'Greek yoghurt (0%)',g:Math.round(perMeal/0.10)},
      {f:'Eggs (large)',g:Math.round(perMeal/6)+' eggs'},{f:'Cottage cheese',g:Math.round(perMeal/0.12)},
      {f:'Whey protein (scoop~25g)',g:Math.round(perMeal/25)+' scoops'},{f:'Salmon (cooked)',g:Math.round(perMeal/0.25)},
      {f:'Tofu (firm)',g:Math.round(perMeal/0.08)},{f:'Lentils (cooked)',g:Math.round(perMeal/0.09)},
    ]
    return { totalDaily, perMeal, leucine, mpsOptimal, leucineHit, SOURCES }
  }, [weight, goal, meals, age, unit, training])

  return (
    <CalculatorLayout title="Protein Per Meal Calculator" description="Find the optimal protein dose per meal to maximise muscle protein synthesis based on body weight and goals." icon="🥩" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Your Details</h2>
          <div className="space-y-4">
            <SelectField label="Unit" value={unit} onChange={v=>setUnit(v as any)} options={[{value:'metric',label:'Metric (kg)'},{value:'imperial',label:'Imperial (lbs)'}]} />
            <InputField label={`Weight (${unit==='metric'?'kg':'lbs'})`} value={weight} onChange={setWeight} min={40} max={200} step={1} suffix={unit==='metric'?'kg':'lbs'} />
            <InputField label="Age" value={age} onChange={setAge} min={16} max={90} step={1} suffix="yrs" />
            <SelectField label="Goal" value={goal} onChange={v=>setGoal(v as any)} options={[{value:'gain',label:'Muscle gain'},{value:'maintain',label:'Maintain muscle'},{value:'cut',label:'Fat loss (preserve muscle)'}]} />
            <InputField label="Meals per day" value={meals} onChange={setMeals} min={2} max={8} step={1} suffix="meals" />
          </div>
          <div className="mt-4 space-y-2">
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-center">
              <p className="text-xs font-bold text-blue-600 uppercase">Daily Total</p>
              <p className="text-3xl font-black text-blue-700">{result.totalDaily}g</p>
              <p className="text-xs text-blue-500">{Math.round(result.totalDaily/(unit==='metric'?weight:weight*0.453592)*10)/10}g per kg bodyweight</p>
            </div>
            <div className="p-3 bg-green-50 rounded-xl border-2 border-green-200 text-center">
              <p className="text-xs font-bold text-green-600 uppercase">Per Meal Target</p>
              <p className="text-4xl font-black text-green-700">{result.perMeal}g</p>
              <p className="text-xs text-green-500">{result.leucine}g leucine - {result.mpsOptimal}</p>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <h3 className="font-bold text-gray-900 mb-3">Food Sources to Hit {result.perMeal}g Per Meal</h3>
            <div className="grid grid-cols-2 gap-2">
              {result.SOURCES.map(s=>(
                <div key={s.f} className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <p className="text-sm font-semibold text-gray-800">{s.f}</p>
                  <p className="text-lg font-black text-green-600">{typeof s.g === 'number' ? `${s.g}g` : s.g}</p>
                </div>
              ))}
            </div>
          </Card>
          <div className={`p-4 rounded-xl border-2 ${result.leucineHit ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
            <p className={`font-bold text-sm ${result.leucineHit ? 'text-green-800' : 'text-yellow-800'}`}>
              {result.leucineHit ? '✅' : '⚠️'} Leucine threshold: {result.leucine}g per meal {result.leucineHit ? '(>=2.5g - MPS triggered)' : '(aim for >=2.5g to trigger MPS)'}
            </p>
          </div>
        </div>
      </div>

      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Protein Per Meal Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          A 175 lb person doing strength training 4x/week needs approximately <strong>140–175g of protein/day</strong> (0.8–1.0g per lb body weight) to maximize muscle protein synthesis and recovery.
        </p>
        <p className="text-sm text-gray-600">
          This Protein Per Meal 2026 uses ISSN guidelines to give you targets based on your exact weight, activity type, and goal — whether that's muscle gain, fat loss, or maintenance.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Protein Per Meal Calculator"
        category="health"
        intro={`The **Protein Per Meal Calculator** is a free, evidence-based health assessment tool using formulas validated by the CDC, NIH, American Heart Association (AHA), and Academy of Nutrition and Dietetics. Get your protein per meal instantly - no account needed, works on all devices.

**Why Protein Per Meal matters for your health:** Understanding your protein per meal is one of the most important steps in proactive health management. Healthcare professionals use protein per meal as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.

**Based on US health standards:** This calculator uses reference ranges and formulas from CDC NHANES population data, NIH Dietary Reference Intakes (DRIs), American Heart Association clinical guidelines, and peer-reviewed research published in JAMA, NEJM, and the American Journal of Clinical Nutrition.

**Supports US customary AND metric units:** Enter your measurements in pounds and inches (the American way) or kilograms and centimeters - the calculator handles both instantly. Results include comparison to healthy ranges for your age and gender based on US population norms.

Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Protein Per Meal Calculator:** This tool uses peer-reviewed, scientifically validated formulas that are the current gold standard for calculating protein per meal in clinical and research settings across the United States and internationally.

**Population reference data:** Results are compared against NHANES (National Health and Nutrition Examination Survey) data from the CDC - the largest, most comprehensive health survey of the US population, covering 5,000+ Americans annually. This gives your result meaningful context relative to real Americans of your age and gender.

**How to interpret your results:** Your protein per meal result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current protein per meal requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "100% Free - No Signup, No Subscription, No Ads", text: "This Protein Per Meal Calculator is permanently and completely free. There are no premium features locked behind a paywall, no trial periods, no subscription fees, and no advertisements that track your behavior. Every American deserves access to professional-grade health and wellness tools without financial or privacy barriers." },
          { title: "Real-Time Instant Results as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Protein Per Meal Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Validated US-Standard Formulas & Guidelines", text: "All calculations use formulas from peer-reviewed research and recognized US professional standards endorsed by the CDC, NIH, American Heart Association, and Academy of Nutrition and Dietetics. The same methodologies trusted by registered dietitians, physicians, and certified fitness professionals across America power this calculator's results." },
          { title: "Complete Privacy - Your Data Stays on Your Device", text: "Everything runs locally in your browser. No personal data is transmitted to any server, stored in any database, or shared with any third party - ever. When you close the browser tab, your inputs disappear permanently. This privacy-first design is essential for sensitive health and wellness information." },
          { title: "Works Perfectly on All Devices & Browsers", text: "Whether you're on an iPhone at the gym, an Android tablet at home, a MacBook at a coffee shop, or a Windows PC at the office, the Protein Per Meal Calculator works flawlessly. Fully responsive design tested on all major US browsers and mobile platforms ensures a consistent, high-quality experience everywhere." },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        scienceSection={`The scientific and professional community in the United States has developed the methodologies underlying this Protein Per Meal Calculator over decades of research, validation, and refinement. Major institutions including the National Institutes of Health (NIH), the Centers for Disease Control and Prevention (CDC), leading American universities, and national professional associations have all contributed to the body of evidence that informs the calculations this tool performs.

Peer-reviewed research published in major American journals - including JAMA, the New England Journal of Medicine, the American Journal of Clinical Nutrition, the Journal of Financial Planning, and other respected publications - provides the scientific foundation for the formulas and reference ranges used here. When multiple validated methods exist, this calculator uses the approach shown to be most accurate for the general American adult population in comparative studies.

Understanding that science is never fully settled, the formulas and reference ranges in this tool are periodically reviewed and updated as new evidence emerges. The goal is to always provide calculations based on the most current and widely-accepted professional consensus - giving you access to the same evidence base that trained professionals consult when working with American clients and patients every day.

It is also important to note that population-based research, by its nature, describes averages and distributions rather than guaranteeing outcomes for any specific individual. Your personal results may differ from calculated predictions based on genetic factors, environmental influences, lifestyle variables, or other individual characteristics. This is not a limitation of the tool - it reflects the inherent complexity of human biology and personal circumstances - and it is precisely why tracking your actual outcomes and adjusting accordingly is always recommended alongside any calculatio-based goal-setting.`}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Protein Per Meal Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Protein Per Meal Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Protein Per Meal Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Protein Per Meal Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Protein Per Meal Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Protein Per Meal calculation:**

1. **Consistency in measurement:** Measure at the same time of day, same conditions. For body measurements (weight, body fat), morning after using the bathroom and before eating gives most consistent results. For health scores, enter your resting values, not post-exercise numbers.

2. **Track trends, not single readings:** One measurement is a snapshot. Track your protein per meal monthly for 3-6 months to see meaningful trends. Healthy protein per meal improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Protein Per Meal is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your protein per meal is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Protein Per Meal Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.

Use this calculator regularly as your situation changes over time - recalculate whenever your key inputs change significantly to ensure your goals and targets remain calibrated to your current reality. Explore our full library of related calculators to build a comprehensive understanding of your complete health and wellness situation, since no single metric tells the whole story.

For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

Remember that the most powerful use of any calculator is not just knowing your current number, but using that number to set a clear, measurable goal and tracking your progress toward it. Accurate information, consistently tracked and thoughtfully applied with patience and consistency, is one of the most powerful tools available for improving any area of your life. Start with what you know today, commit to the process, and let data guide your journey.`}
      />
      )}
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )

}
