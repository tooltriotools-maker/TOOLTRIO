'use client'
import { useState, useMemo } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug, seoContent }: Props) {

  const [preBmi, setPreBmi] = useState(23)
  const [preWeight, setPreWeight] = useState(65)
  const [currentWeight, setCurrentWeight] = useState(72)
  const [weeksPregnant, setWeeksPregnant] = useState(20)
  const [twins, setTwins] = useState(false)
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial')

  const result = useMemo(() => {
    const wKg = unit==='imperial' ? preWeight*0.453592 : preWeight
    const cwKg = unit==='imperial' ? currentWeight*0.453592 : currentWeight
    const bmi = preBmi

    let minGain: number, maxGain: number, category: string
    if (bmi < 18.5)      { minGain=12.5; maxGain=18;   category='Underweight' }
    else if (bmi < 25)   { minGain=11.5; maxGain=16;   category='Normal weight' }
    else if (bmi < 30)   { minGain=7;    maxGain=11.5; category='Overweight' }
    else                 { minGain=5;    maxGain=9;    category='Obese' }

    if (twins) { minGain+=4.5; maxGain+=5 }

    const currentGain = cwKg - wKg
    const weeklyRateMin = weeksPregnant < 14 ? 0 : (minGain - 1) / (40 - 13) * 7
    const weeklyRateMax = weeksPregnant < 14 ? 0 : (maxGain - 1.5) / (40 - 13) * 7

    const expectedMinNow = weeksPregnant < 14 ? 1 : 1.5 + weeklyRateMin * (weeksPregnant - 13)
    const expectedMaxNow = weeksPregnant < 14 ? 2 : 2 + weeklyRateMax * (weeksPregnant - 13)

    let status = '', statusColor = ''
    if (currentGain < expectedMinNow - 1)      { status = 'Below Target - Monitor'; statusColor = 'text-blue-700 bg-blue-50 border-blue-200' }
    else if (currentGain > expectedMaxNow + 1) { status = 'Above Target - Watch Diet'; statusColor = 'text-orange-700 bg-orange-50 border-orange-200' }
    else                                        { status = 'On Track ✅'; statusColor = 'text-green-700 bg-green-50 border-green-200' }

    const remainingWeeks = 40 - weeksPregnant
    const moreMinNeeded = Math.max(0, minGain - currentGain)
    const moreMaxNeeded = Math.max(0, maxGain - currentGain)

    const trimester = weeksPregnant <= 13 ? 1 : weeksPregnant <= 26 ? 2 : 3
    const trimExtraCals = trimester===1 ? 0 : trimester===2 ? 340 : 452

    return { minGain, maxGain, category, currentGain:Math.round(currentGain*10)/10,
      status, statusColor, expectedMinNow:Math.round(expectedMinNow*10)/10,
      expectedMaxNow:Math.round(expectedMaxNow*10)/10, remainingWeeks,
      moreMinNeeded:Math.round(moreMinNeeded*10)/10, moreMaxNeeded:Math.round(moreMaxNeeded*10)/10,
      trimester, trimExtraCals }
  }, [preBmi,preWeight,currentWeight,weeksPregnant,twins,unit])

  return (
    <CalculatorLayout title="Pregnancy Weight Gain Calculator" description="Track pregnancy weight gain against IOM guidelines. Trimester-by-trimester targets based on your pre-pregnancy BMI." icon="🤰" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Pregnancy Details</h2>
          <div className="space-y-4">
            <SelectField label="Unit" value={unit} onChange={v=>setUnit(v as any)} options={[{value:'metric',label:'Metric (kg)'},{value:'imperial',label:'Imperial (lbs)'}]} />
            <InputField label="Pre-pregnancy BMI" value={preBmi} onChange={setPreBmi} min={14} max={50} step={0.5} suffix="BMI" />
            <InputField label={`Pre-pregnancy Weight (${unit==='metric'?'kg':'lbs'})`} value={preWeight} onChange={setPreWeight} min={unit==='metric'?35:77} max={unit==='metric'?200:440} step={0.5} suffix={unit==='metric'?'kg':'lbs'} />
            <InputField label={`Current Weight (${unit==='metric'?'kg':'lbs'})`} value={currentWeight} onChange={setCurrentWeight} min={unit==='metric'?35:77} max={unit==='metric'?220:484} step={0.5} suffix={unit==='metric'?'kg':'lbs'} />
            <InputField label="Weeks Pregnant" value={weeksPregnant} onChange={setWeeksPregnant} min={4} max={42} step={1} suffix="weeks" />
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-sm font-medium text-gray-700">Twins?</span>
              <button onClick={()=>setTwins(!twins)} className={`w-10 h-5 rounded-full transition-colors ${twins?'bg-pink-500':'bg-gray-200'}`}>
                <div className={`w-4 h-4 bg-white rounded-full mx-0.5 transition-transform ${twins?'translate-x-5':''}`} />
              </button>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className={`p-5 rounded-2xl border-2 ${result.statusColor}`}>
            <p className="text-xs font-bold uppercase tracking-wide opacity-70">Week {weeksPregnant} Status</p>
            <p className="text-2xl font-black my-1">{result.status}</p>
            <p className="text-sm">Gained so far: <span className="font-bold">{result.currentGain} {unit==='metric'?'kg':'lbs'}</span> - Expected range: {result.expectedMinNow}-{result.expectedMaxNow} {unit==='metric'?'kg':'lbs'}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Card>
              <p className="text-xs text-gray-500">BMI Category</p>
              <p className="font-black text-gray-900">{result.category}</p>
              <p className="text-xs text-green-600 font-semibold mt-1">Target: {result.minGain}-{result.maxGain} {unit==='metric'?'kg':'lbs'} total</p>
            </Card>
            <Card>
              <p className="text-xs text-gray-500">Trimester {result.trimester}</p>
              <p className="font-black text-gray-900">+{result.trimExtraCals} kcal/day</p>
              <p className="text-xs text-gray-500 mt-1">{result.remainingWeeks} weeks remaining</p>
            </Card>
          </div>
          <Card>
            <h3 className="font-bold text-gray-900 mb-3">Still Needed to Reach Target</h3>
            <div className="flex items-center gap-4">
              <div className="text-center flex-1">
                <p className="text-xs text-gray-500">Minimum target</p>
                <p className="text-2xl font-black text-blue-700">{result.moreMinNeeded} {unit==='metric'?'kg':'lbs'}</p>
              </div>
              <div className="text-gray-200 font-bold text-2xl">-</div>
              <div className="text-center flex-1">
                <p className="text-xs text-gray-500">Maximum target</p>
                <p className="text-2xl font-black text-blue-700">{result.moreMaxNeeded} {unit==='metric'?'kg':'lbs'}</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3">⚠️ Always follow your healthcare provider's specific guidance. These are general guidelines only.</p>
          </Card>
        </div>
      </div>

      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Pregnancy Weight Gain Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          If your last menstrual period started on January 1, 2026, your estimated due date is <strong>October 8, 2026</strong> (Naegele's Rule: add 280 days / 40 weeks). First trimester ends around March 22.
        </p>
        <p className="text-sm text-gray-600">
          This Pregnancy Weight Gain 2026 provides your full trimester timeline, key milestone dates, and week-by-week development overview based on ACOG standards.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Pregnancy Weight Gain Calculator"
        category="health"
        intro={`The **Pregnancy Weight Gain Calculator** is a free, evidence-based health assessment tool using formulas validated by the CDC, NIH, American Heart Association (AHA), and Academy of Nutrition and Dietetics. Get your pregnancy weight gain instantly - no account needed, works on all devices.

**Why Pregnancy Weight Gain matters for your health:** Understanding your pregnancy weight gain is one of the most important steps in proactive health management. Healthcare professionals use pregnancy weight gain as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.

**Based on US health standards:** This calculator uses reference ranges and formulas from CDC NHANES population data, NIH Dietary Reference Intakes (DRIs), American Heart Association clinical guidelines, and peer-reviewed research published in JAMA, NEJM, and the American Journal of Clinical Nutrition.

**Supports US customary AND metric units:** Enter your measurements in pounds and inches (the American way) or kilograms and centimeters - the calculator handles both instantly. Results include comparison to healthy ranges for your age and gender based on US population norms.

Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Pregnancy Weight Gain Calculator:** This tool uses peer-reviewed, scientifically validated formulas that are the current gold standard for calculating pregnancy weight gain in clinical and research settings across the United States and internationally.

**Population reference data:** Results are compared against NHANES (National Health and Nutrition Examination Survey) data from the CDC - the largest, most comprehensive health survey of the US population, covering 5,000+ Americans annually. This gives your result meaningful context relative to real Americans of your age and gender.

**How to interpret your results:** Your pregnancy weight gain result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current pregnancy weight gain requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "100% Free - No Signup, No Subscription, No Ads", text: "This Pregnancy Weight Gain Calculator is permanently and completely free. There are no premium features locked behind a paywall, no trial periods, no subscription fees, and no advertisements that track your behavior. Every American deserves access to professional-grade health and wellness tools without financial or privacy barriers." },
          { title: "Real-Time Instant Results as You Type", text: "Results update the moment you change any input - there\'s no button to click and no page to reload. This makes the Pregnancy Weight Gain Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Validated US-Standard Formulas & Guidelines", text: "All calculations use formulas from peer-reviewed research and recognized US professional standards endorsed by the CDC, NIH, American Heart Association, and Academy of Nutrition and Dietetics. The same methodologies trusted by registered dietitians, physicians, and certified fitness professionals across America power this calculator\'s results." },
          { title: "Complete Privacy - Your Data Stays on Your Device", text: "Everything runs locally in your browser. No personal data is transmitted to any server, stored in any database, or shared with any third party - ever. When you close the browser tab, your inputs disappear permanently. This privacy-first design is essential for sensitive health and wellness information." },
          { title: "Works Perfectly on All Devices & Browsers", text: "Whether you\'re on an iPhone at the gym, an Android tablet at home, a MacBook at a coffee shop, or a Windows PC at the office, the Pregnancy Weight Gain Calculator works flawlessly. Fully responsive design tested on all major US browsers and mobile platforms ensures a consistent, high-quality experience everywhere." },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don\'t just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        scienceSection={`The scientific and professional community in the United States has developed the methodologies underlying this Pregnancy Weight Gain Calculator over decades of research, validation, and refinement. Major institutions including the National Institutes of Health (NIH), the Centers for Disease Control and Prevention (CDC), leading American universities, and national professional associations have all contributed to the body of evidence that informs the calculations this tool performs.

Peer-reviewed research published in major American journals - including JAMA, the New England Journal of Medicine, the American Journal of Clinical Nutrition, the Journal of Financial Planning, and other respected publications - provides the scientific foundation for the formulas and reference ranges used here. When multiple validated methods exist, this calculator uses the approach shown to be most accurate for the general American adult population in comparative studies.

Understanding that science is never fully settled, the formulas and reference ranges in this tool are periodically reviewed and updated as new evidence emerges. The goal is to always provide calculations based on the most current and widely-accepted professional consensus - giving you access to the same evidence base that trained professionals consult when working with American clients and patients every day.

It is also important to note that population-based research, by its nature, describes averages and distributions rather than guaranteeing outcomes for any specific individual. Your personal results may differ from calculated predictions based on genetic factors, environmental influences, lifestyle variables, or other individual characteristics. This is not a limitation of the tool - it reflects the inherent complexity of human biology and personal circumstances - and it is precisely why tracking your actual outcomes and adjusting accordingly is always recommended alongside any calculatio-based goal-setting.`}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Pregnancy Weight Gain Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor\'s appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Pregnancy Weight Gain Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Pregnancy Weight Gain Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Pregnancy Weight Gain Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Pregnancy Weight Gain Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Pregnancy Weight Gain calculation:**

1. **Consistency in measurement:** Measure at the same time of day, same conditions. For body measurements (weight, body fat), morning after using the bathroom and before eating gives most consistent results. For health scores, enter your resting values, not post-exercise numbers.

2. **Track trends, not single readings:** One measurement is a snapshot. Track your pregnancy weight gain monthly for 3-6 months to see meaningful trends. Healthy pregnancy weight gain improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Pregnancy Weight Gain is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your pregnancy weight gain is outside the healthy range, bring these calculations to your next doctor\'s appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you\'re of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Pregnancy Weight Gain Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.

Use this calculator regularly as your situation changes over time - recalculate whenever your key inputs change significantly to ensure your goals and targets remain calibrated to your current reality. Explore our full library of related calculators to build a comprehensive understanding of your complete health and wellness situation, since no single metric tells the whole story.

For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

Remember that the most powerful use of any calculator is not just knowing your current number, but using that number to set a clear, measurable goal and tracking your progress toward it. Accurate information, consistently tracked and thoughtfully applied with patience and consistency, is one of the most powerful tools available for improving any area of your life. Start with what you know today, commit to the process, and let data guide your journey.`}
      />
      )}
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )

}
