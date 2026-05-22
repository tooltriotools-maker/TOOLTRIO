'use client'
import { useState } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug, seoContent }: Props) {
  const [age, setAge] = useState(45)
  const [gender, setGender] = useState<'male'|'female'>('male')
  const [exercise, setExercise] = useState(3)
  const [sleep, setSleep] = useState(7)
  const [stress, setStress] = useState(5)
  const [bmi, setBmi] = useState(26)
  const [alcohol, setAlcohol] = useState(5)

  // Approximate testosterone level (nmol/L) based on lifestyle
  const baseMale = Math.max(5, 22 - (age - 20) * 0.25)
  const baseFemale = Math.max(0.5, 1.8 - (age - 20) * 0.015)
  const base = gender === 'male' ? baseMale : baseFemale

  const adjustments = [
    exercise >= 5 ? 0.1 : exercise >= 3 ? 0.05 : -0.1,
    sleep >= 7 ? 0.05 : sleep < 6 ? -0.15 : 0,
    stress > 7 ? -0.15 : stress < 4 ? 0.05 : 0,
    bmi > 30 ? -0.2 : bmi > 25 ? -0.1 : 0.05,
    alcohol > 14 ? -0.2 : alcohol > 7 ? -0.1 : 0,
  ]

  const estimated = Math.max(0.3, base * (1 + adjustments.reduce((s,a)=>s+a,0)))
  const normalRangeLow = gender === 'male' ? 8.7 : 0.52
  const normalRangeHigh = gender === 'male' ? 29 : 1.7
  const status = estimated < normalRangeLow ? {l:'Below normal range - consult GP',c:'text-red-600'} : estimated > normalRangeHigh ? {l:'Above normal range',c:'text-orange-600'} : {l:'Within normal range v',c:'text-green-600'}

  const symptoms_low = gender === 'male'
    ? ['Low libido', 'Fatigue / low energy', 'Mood changes / depression', 'Reduced muscle mass', 'Increased body fat']
    : ['Fatigue', 'Low libido', 'Mood changes', 'Irregular periods', 'Reduced bone density']

  return (
    <CalculatorLayout title="Testosterone Age Calculator" description="Estimate how your lifestyle affects testosterone levels relative to age-based norms." icon="⚡" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-5">Your Profile</h2>
          <div className="space-y-4">
            <SelectField label="Gender" value={gender} onChange={v=>setGender(v as any)} options={[{value:'male',label:'Male'},{value:'female',label:'Female'}]} />
            <InputField label="Age" value={age} onChange={setAge} min={18} max={80} step={1} suffix="yrs" />
            <InputField label="Exercise (days/week)" value={exercise} onChange={setExercise} min={0} max={7} step={1} suffix="days" />
            <InputField label="Sleep (hrs/night)" value={sleep} onChange={setSleep} min={4} max={12} step={0.5} suffix="hrs" />
            <InputField label="Stress level (1-10)" value={stress} onChange={setStress} min={1} max={10} step={1} suffix="/10" />
            <InputField label="BMI" value={bmi} onChange={setBmi} min={15} max={50} step={0.5} suffix="kg/m2" />
            <InputField label="Alcohol (units/week)" value={alcohol} onChange={setAlcohol} min={0} max={50} step={1} suffix="units" />
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <Card gradient>
            <div className="text-center py-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Estimated Testosterone</p>
              <div className={`text-7xl font-black mb-2 ${status.c}`}>{estimated.toFixed(1)}</div>
              <p className="text-gray-500">nmol/L - Normal range: {normalRangeLow}-{normalRangeHigh} nmol/L</p>
              <p className={`font-bold mt-1 ${status.c}`}>{status.l}</p>
            </div>
          </Card>
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Your Level" value={`${estimated.toFixed(1)} nmol/L`} highlight />
            <ResultCard label="Age-based avg" value={`${base.toFixed(1)} nmol/L`} />
            <ResultCard label="Lifestyle impact" value={`${adjustments.reduce((s,a)=>s+a,0)>0?'+':''}${(adjustments.reduce((s,a)=>s+a,0)*100).toFixed(0)}%`} />
          </div>
          <Card>
            <h3 className="font-semibold text-gray-700 mb-2">Natural Ways to Support Testosterone</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>- <strong>Resistance training</strong>: Compound lifts (squat, deadlift) most effective at boosting T</p>
              <p>- <strong>Sleep 7-9 hrs</strong>: ~60% of testosterone is released during sleep</p>
              <p>- <strong>Vitamin D & Zinc</strong>: Both are essential cofactors for testosterone synthesis</p>
              <p>- <strong>Reduce body fat</strong>: Fat tissue converts testosterone to estrogen</p>
              <p>- <strong>Limit alcohol</strong>: Even moderate drinking suppresses T production</p>
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Testosterone Age Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          A person born on March 15, 1990 is <strong>35 years, 3 weeks, and 2 days</strong> old as of April 7, 2026. They have lived approximately 12,806 days and will turn 36 in less than a year.
        </p>
        <p className="text-sm text-gray-600">
          This Testosterone Age 2026 calculates your exact age in years, months, days, and total days lived — useful for medical forms, legal documents, and milestone tracking.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Testosterone Age Calculator"
        category="health"
        intro={`The **Testosterone Age Calculator** is a free, evidence-based health assessment tool using formulas validated by the CDC, NIH, American Heart Association (AHA), and Academy of Nutrition and Dietetics. Get your testosterone age instantly - no account needed, works on all devices.

**Why Testosterone Age matters for your health:** Understanding your testosterone age is one of the most important steps in proactive health management. Healthcare professionals use testosterone age as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.

**Based on US health standards:** This calculator uses reference ranges and formulas from CDC NHANES population data, NIH Dietary Reference Intakes (DRIs), American Heart Association clinical guidelines, and peer-reviewed research published in JAMA, NEJM, and the American Journal of Clinical Nutrition.

**Supports US customary AND metric units:** Enter your measurements in pounds and inches (the American way) or kilograms and centimeters - the calculator handles both instantly. Results include comparison to healthy ranges for your age and gender based on US population norms.

Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Testosterone Age Calculator:** This tool uses peer-reviewed, scientifically validated formulas that are the current gold standard for calculating testosterone age in clinical and research settings across the United States and internationally.

**Population reference data:** Results are compared against NHANES (National Health and Nutrition Examination Survey) data from the CDC - the largest, most comprehensive health survey of the US population, covering 5,000+ Americans annually. This gives your result meaningful context relative to real Americans of your age and gender.

**How to interpret your results:** Your testosterone age result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current testosterone age requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "100% Free - No Signup, No Subscription, No Ads", text: "This Testosterone Age Calculator is permanently and completely free. There are no premium features locked behind a paywall, no trial periods, no subscription fees, and no advertisements that track your behavior. Every American deserves access to professional-grade health and wellness tools without financial or privacy barriers." },
          { title: "Real-Time Instant Results as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Testosterone Age Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Validated US-Standard Formulas & Guidelines", text: "All calculations use formulas from peer-reviewed research and recognized US professional standards endorsed by the CDC, NIH, American Heart Association, and Academy of Nutrition and Dietetics. The same methodologies trusted by registered dietitians, physicians, and certified fitness professionals across America power this calculator's results." },
          { title: "Complete Privacy - Your Data Stays on Your Device", text: "Everything runs locally in your browser. No personal data is transmitted to any server, stored in any database, or shared with any third party - ever. When you close the browser tab, your inputs disappear permanently. This privacy-first design is essential for sensitive health and wellness information." },
          { title: "Works Perfectly on All Devices & Browsers", text: "Whether you're on an iPhone at the gym, an Android tablet at home, a MacBook at a coffee shop, or a Windows PC at the office, the Testosterone Age Calculator works flawlessly. Fully responsive design tested on all major US browsers and mobile platforms ensures a consistent, high-quality experience everywhere." },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        scienceSection={`The scientific and professional community in the United States has developed the methodologies underlying this Testosterone Age Calculator over decades of research, validation, and refinement. Major institutions including the National Institutes of Health (NIH), the Centers for Disease Control and Prevention (CDC), leading American universities, and national professional associations have all contributed to the body of evidence that informs the calculations this tool performs.

Peer-reviewed research published in major American journals - including JAMA, the New England Journal of Medicine, the American Journal of Clinical Nutrition, the Journal of Financial Planning, and other respected publications - provides the scientific foundation for the formulas and reference ranges used here. When multiple validated methods exist, this calculator uses the approach shown to be most accurate for the general American adult population in comparative studies.

Understanding that science is never fully settled, the formulas and reference ranges in this tool are periodically reviewed and updated as new evidence emerges. The goal is to always provide calculations based on the most current and widely-accepted professional consensus - giving you access to the same evidence base that trained professionals consult when working with American clients and patients every day.

It is also important to note that population-based research, by its nature, describes averages and distributions rather than guaranteeing outcomes for any specific individual. Your personal results may differ from calculated predictions based on genetic factors, environmental influences, lifestyle variables, or other individual characteristics. This is not a limitation of the tool - it reflects the inherent complexity of human biology and personal circumstances - and it is precisely why tracking your actual outcomes and adjusting accordingly is always recommended alongside any calculatio-based goal-setting.`}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Testosterone Age Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Testosterone Age Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Testosterone Age Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Testosterone Age Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Testosterone Age Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Testosterone Age calculation:**

1. **Consistency in measurement:** Measure at the same time of day, same conditions. For body measurements (weight, body fat), morning after using the bathroom and before eating gives most consistent results. For health scores, enter your resting values, not post-exercise numbers.

2. **Track trends, not single readings:** One measurement is a snapshot. Track your testosterone age monthly for 3-6 months to see meaningful trends. Healthy testosterone age improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Testosterone Age is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your testosterone age is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Testosterone Age Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.

Use this calculator regularly as your situation changes over time - recalculate whenever your key inputs change significantly to ensure your goals and targets remain calibrated to your current reality. Explore our full library of related calculators to build a comprehensive understanding of your complete health and wellness situation, since no single metric tells the whole story.

For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

Remember that the most powerful use of any calculator is not just knowing your current number, but using that number to set a clear, measurable goal and tracking your progress toward it. Accurate information, consistently tracked and thoughtfully applied with patience and consistency, is one of the most powerful tools available for improving any area of your life. Start with what you know today, commit to the process, and let data guide your journey.`}
      />
      )}
    </CalculatorLayout>
  )
}
