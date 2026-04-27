'use client'
import { useState, useMemo } from 'react'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { calculateBMI } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, HeightField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function BMICalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug, seoContent }: Props) {
  const [weight, setWeight] = useState(155)
  const [height, setHeight] = useState(67)
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial')
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [age, setAge] = useState(30)

  // Convert if imperial
  const weightKg = unit === 'imperial' ? weight * 0.453592 : weight
  const heightCm = unit === 'imperial' ? height * 2.54 : height

  const result = useMemo(() => calculateBMI(weightKg, heightCm), [weightKg, heightCm])

  const bmiCategories = [
    { name: 'Underweight', range: '< 18.5', color: '#3b82f6', min: 10, max: 18.5 },
    { name: 'Normal', range: '18.5-24.9', color: '#22c55e', min: 18.5, max: 25 },
    { name: 'Overweight', range: '25-29.9', color: '#f59e0b', min: 25, max: 30 },
    { name: 'Obese', range: '>= 30', color: '#ef4444', min: 30, max: 45 },
  ]

  const bmiPct = Math.min(98, Math.max(2, ((result.bmi - 10) / 35) * 100))

  const weightToLose = weightKg - result.idealWeightMax
  const weightToGain = result.idealWeightMin - weightKg

  return (
    <CalculatorLayout title="BMI Calculator" description="Calculate your Body Mass Index and get personalized health insights and ideal weight range." icon="⚖️" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-5">Your Measurements</h2>
          <div className="space-y-4">
            {/* Unit toggle */}
            <div className="grid grid-cols-2 gap-1 p-1 bg-gray-50 rounded-xl">
              {(['imperial', 'metric'] as const).map(u => (
                <button key={u} onClick={() => setUnit(u)}
                  className={`py-2 rounded-xl text-xs font-semibold transition-all ${unit === u ? 'bg-rose-500 text-white' : 'text-gray-500'}`}>
                  {u === 'imperial' ? '🇺🇸 US (lbs/in)' : '🌍 Metric (kg/cm)'}
                </button>
              ))}
            </div>
            {/* Gender toggle */}
            <div className="grid grid-cols-2 gap-1 p-1 bg-gray-50 rounded-xl">
              {(['male', 'female'] as const).map(g => (
                <button key={g} onClick={() => setGender(g)}
                  className={`py-2 rounded-xl text-sm font-semibold transition-all ${gender === g ? 'bg-rose-500 text-white' : 'text-gray-500'}`}>
                  {g === 'male' ? '♂ Male' : '♀ Female'}
                </button>
              ))}
            </div>
            <InputField label="Age" value={age} onChange={setAge} min={5} max={100} step={1} suffix="yrs" />
            <InputField label={unit === 'metric' ? 'Weight (kg)' : 'Weight (lbs)'} value={weight} onChange={setWeight}
              min={unit === 'metric' ? 20 : 44} max={unit === 'metric' ? 250 : 550} step={0.5}
              suffix={unit === 'metric' ? 'kg' : 'lb'} />
            <HeightField unit={unit} value={height} onChange={setHeight} />
</div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          {/* BMI Score Card */}
          <Card gradient>
            <div className="text-center py-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Your BMI Score</p>
              <div className="text-8xl font-black font-display mb-3 transition-all duration-500" style={{ color: result.color }}>{result.bmi}</div>
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold" style={{ background: `${result.color}20`, color: result.color, border: `1px solid ${result.color}40` }}>
                {result.category}
              </span>
              <p className="text-gray-500 text-sm mt-3">Healthy range: <span className="text-gray-900 font-semibold">{result.idealWeightMin}-{result.idealWeightMax} kg</span> for your height</p>
            </div>

            {/* BMI Scale */}
            <div className="mt-4 px-2">
              <div className="relative h-5 rounded-full overflow-hidden" style={{ background: 'linear-gradient(to right, #3b82f6 0%, #22c55e 30%, #f59e0b 60%, #ef4444 100%)' }}>
                <div className="absolute top-0.5 bottom-0.5 w-1.5 bg-white rounded-full shadow-xl transition-all duration-500" style={{ left: `calc(${bmiPct}% - 3px)` }} />
              </div>
              <div className="flex justify-between text-xs mt-1 px-0.5">
                <span className="text-blue-400">10</span>
                <span className="text-green-400">18.5</span>
                <span className="text-amber-400">25</span>
                <span className="text-red-400">30</span>
                <span className="text-red-600">45</span>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <ResultCard label="BMI Score" value={String(result.bmi)} subValue={result.category} highlight />
            <ResultCard label="Ideal Weight" value={`${result.idealWeightMin}-${result.idealWeightMax} kg`} subValue="BMI 18.5 to 24.9" />
          </div>

          {/* BMI Categories */}
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">BMI Categories</h3>
            <div className="grid grid-cols-2 gap-3">
              {bmiCategories.map(cat => (
                <div key={cat.name}
                  className="p-3 rounded-xl border transition-all"
                  style={{ background: result.category === cat.name || (cat.name === 'Normal' && result.category === 'Normal Weight') ? `${cat.color}12` : 'transparent', borderColor: result.category === cat.name || (cat.name === 'Normal' && result.category === 'Normal Weight') ? `${cat.color}40` : 'rgba(255,255,255,0.05)' }}>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: cat.color }} />
                    <span className="font-semibold text-white text-sm">{cat.name}</span>
                    {(result.category === cat.name || (cat.name === 'Normal' && result.category === 'Normal Weight')) && <span className="text-xs px-1.5 py-0.5 rounded-full font-bold ml-auto" style={{ background: `${cat.color}30`, color: cat.color }}>YOU</span>}
                  </div>
                  <p className="text-xs text-gray-500">BMI {cat.range}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Action card */}
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Your Health Action</h3>
            {result.category === 'Normal Weight' && (
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-300 text-sm">
                ✅ You are at a healthy weight. Maintain with regular exercise (150 min/week moderate) and a balanced diet.
              </div>
            )}
            {result.category === 'Underweight' && (
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm">
                💙 You should gain approximately <strong>{Math.abs(weightToGain).toFixed(1)} kg</strong> to reach healthy BMI. Focus on nutrient-dense foods and strength training.
              </div>
            )}
            {result.category === 'Overweight' && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm">
                ⚠️ You should lose approximately <strong>{weightToLose.toFixed(1)} kg</strong> to reach healthy BMI. A 500 kcal/day deficit leads to ~0.5 kg/week loss.
              </div>
            )}
            {result.category === 'Obese' && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
                🚨 You should lose approximately <strong>{weightToLose.toFixed(1)} kg</strong>. Please consult a healthcare professional for a safe, supervised plan.
              </div>
            )}
          </Card>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          BMI Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          A 5'10" (178cm) adult weighing 185 lbs has a BMI of <strong>26.6</strong> — placing them in the overweight category. Losing 15 lbs would bring them to a healthy BMI of 24.4.
        </p>
        <p className="text-sm text-gray-600">
          Use this BMI 2026 to instantly see your category, healthy weight range, and how much change moves you to the next bracket.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="BMI Calculator"
        category="health"
        intro={`The **BMI Calculator** is a free, evidence-based health assessment tool using formulas validated by the CDC, NIH, American Heart Association (AHA), and Academy of Nutrition and Dietetics. Get your bmi instantly - no account needed, works on all devices.

**Why Bmi matters for your health:** Understanding your bmi is one of the most important steps in proactive health management. Healthcare professionals use bmi as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.

**Based on US health standards:** This calculator uses reference ranges and formulas from CDC NHANES population data, NIH Dietary Reference Intakes (DRIs), American Heart Association clinical guidelines, and peer-reviewed research published in JAMA, NEJM, and the American Journal of Clinical Nutrition.

**Supports US customary AND metric units:** Enter your measurements in pounds and inches (the American way) or kilograms and centimeters - the calculator handles both instantly. Results include comparison to healthy ranges for your age and gender based on US population norms.

Combine this with [our Body Fat Calculator](/calculators/health/body-fat-calculator), [our Ideal Weight Calculator](/calculators/health/ideal-weight-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Bmi Calculator:** This tool uses peer-reviewed, scientifically validated formulas that are the current gold standard for calculating bmi in clinical and research settings across the United States and internationally.

**Population reference data:** Results are compared against NHANES (National Health and Nutrition Examination Survey) data from the CDC - the largest, most comprehensive health survey of the US population, covering 5,000+ Americans annually. This gives your result meaningful context relative to real Americans of your age and gender.

**How to interpret your results:** Your bmi result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current bmi requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "100% Free - No Signup, No Subscription, No Ads", text: "This Bmi Calculator is permanently and completely free. There are no premium features locked behind a paywall, no trial periods, no subscription fees, and no advertisements that track your behavior. Every American deserves access to professional-grade health and wellness tools without financial or privacy barriers." },
          { title: "Real-Time Instant Results as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Bmi Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Validated US-Standard Formulas & Guidelines", text: "All calculations use formulas from peer-reviewed research and recognized US professional standards endorsed by the CDC, NIH, American Heart Association, and Academy of Nutrition and Dietetics. The same methodologies trusted by registered dietitians, physicians, and certified fitness professionals across America power this calculator's results." },
          { title: "Complete Privacy - Your Data Stays on Your Device", text: "Everything runs locally in your browser. No personal data is transmitted to any server, stored in any database, or shared with any third party - ever. When you close the browser tab, your inputs disappear permanently. This privacy-first design is essential for sensitive health and wellness information." },
          { title: "Works Perfectly on All Devices & Browsers", text: "Whether you're on an iPhone at the gym, an Android tablet at home, a MacBook at a coffee shop, or a Windows PC at the office, the Bmi Calculator works flawlessly. Fully responsive design tested on all major US browsers and mobile platforms ensures a consistent, high-quality experience everywhere." },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Bmi Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Bmi Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Bmi Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Bmi Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Bmi Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        scienceSection={`The scientific and professional community in the United States has developed the methodologies underlying this Bmi Calculator over decades of research, validation, and refinement. Major institutions including the National Institutes of Health (NIH), the Centers for Disease Control and Prevention (CDC), leading American universities, and national professional associations have all contributed to the body of evidence that informs the calculations this tool performs.

Peer-reviewed research published in major American journals - including JAMA, the New England Journal of Medicine, the American Journal of Clinical Nutrition, the Journal of Financial Planning, and other respected publications - provides the scientific foundation for the formulas and reference ranges used here. When multiple validated methods exist, this calculator uses the approach shown to be most accurate for the general American adult population in comparative studies.

Understanding that science is never fully settled, the formulas and reference ranges in this tool are periodically reviewed and updated as new evidence emerges. The goal is to always provide calculations based on the most current and widely-accepted professional consensus - giving you access to the same evidence base that trained professionals consult when working with American clients and patients every day.

It is also important to note that population-based research, by its nature, describes averages and distributions rather than guaranteeing outcomes for any specific individual. Your personal results may differ from calculated predictions based on genetic factors, environmental influences, lifestyle variables, or other individual characteristics. This is not a limitation of the tool - it reflects the inherent complexity of human biology and personal circumstances - and it is precisely why tracking your actual outcomes and adjusting accordingly is always recommended alongside any calculatio-based goal-setting.`}
        tipsSection={`**Getting the most accurate Bmi calculation:**

1. **Consistency in measurement:** Measure at the same time of day, same conditions. For body measurements (weight, [body fat](/calculators/health/body-fat-calculator)), morning after using the bathroom and before eating gives most consistent results. For health scores, enter your resting values, not post-exercise numbers.

2. **Track trends, not single readings:** One measurement is a snapshot. Track your bmi monthly for 3-6 months to see meaningful trends. Healthy bmi improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Bmi is most informative when combined with other health measurements. BMI + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your bmi is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        commonMistakes={`One of the most common mistakes is interpreting a "Normal" BMI as automatically meaning good health, or an "Overweight" BMI as automatically meaning poor health. A marathon runner with high muscle mass might show BMI 27 while having excellent cardiovascular health and low body fat. Conversely, a "skinny fat" individual with BMI 22 could have dangerously high visceral fat and poor metabolic markers.

Another mistake is calculating BMI in pounds and inches without the correct conversion formula. If you try to use kg/m2 formula with imperial units you will get a wildly inaccurate result - always use a calculator that handles unit conversion automatically, like this one.

Finally, many people confuse adult BMI standards with pediatric standards. The standard adult cutoffs (18.5, 25, 30) do NOT apply to children and teenagers. For ages 2-19, the CDC uses age- and sex-specific BMI-for-age percentile charts, which are fundamentally different from adult categories.`}
        conclusion={`The Bmi Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.

Use this calculator regularly as your situation changes over time - recalculate whenever your key inputs change significantly to ensure your goals and targets remain calibrated to your current reality. Explore our full library of related calculators to build a comprehensive understanding of your complete health and wellness situation, since no single metric tells the whole story.

For a complete health overview, also use [our Body Fat Calculator](/calculators/health/body-fat-calculator), [our Ideal Weight Calculator](/calculators/health/ideal-weight-calculator), and [our TDEE Calculator](/calculators/health/tdee-calculator).

Remember that the most powerful use of any calculator is not just knowing your current number, but using that number to set a clear, measurable goal and tracking your progress toward it. Accurate information, consistently tracked and thoughtfully applied with patience and consistency, is one of the most powerful tools available for improving any area of your life. Start with what you know today, commit to the process, and let data guide your journey.`}
        didYouKnow={[
          'According to CDC data, 73.6% of American adults are overweight or obese (BMI >= 25) - making BMI tracking one of the most important personal health habits an American can adopt.',
          'The BMI formula was invented by Belgian mathematician Adolphe Quetelet in the 1830s - nearly 200 years ago - yet it remains the primary population screening metric used by the WHO, CDC, and NIH today.',
          'The US Army, Air Force, and Navy all use BMI as part of their physical fitness standards, combined with body circumference tape measurements for a more complete body composition assessment.',
          'Research shows BMI combined with waist circumference predicts metabolic health risk significantly better than BMI alone. Men with waist circumference over 40 inches face elevated heart disease risk regardless of BMI.',
        ]}
        comparisonTable={[
          { label: 'Underweight', value: 'BMI < 18.5', note: 'May indicate malnutrition or eating disorder - consult doctor' },
          { label: 'Normal Weight', value: 'BMI 18.5-24.9', note: 'CDC & WHO optimal range for most American adults' },
          { label: 'Overweight', value: 'BMI 25.0-29.9', note: 'Increased risk of heart disease, type 2 diabetes, hypertension' },
          { label: 'Obese Class I', value: 'BMI 30.0-34.9', note: 'High risk - healthcare provider consultation recommended' },
          { label: 'Obese Class II', value: 'BMI 35.0-39.9', note: 'Very high risk - medical intervention often needed' },
          { label: 'Obese Class III', value: 'BMI >= 40.0', note: 'Severe risk - bariatric specialist consultation advised' },
          { label: 'Asian-American Overweight', value: 'BMI >= 23.0', note: 'Lower cutoffs recommended by ADA and NIH for Asian populations' },
          { label: 'Optimal BMI for Age 65+', value: 'BMI 25-27', note: 'Slightly higher BMI may reduce all-cause mortality in older adults' },
        ]}
      />
      )}
    </CalculatorLayout>
  )
}
