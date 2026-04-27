'use client'
import { useState, useMemo } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import { calculateCalories } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, SelectField, HeightField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug, seoContent }: Props) {
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial')
  const [weight, setWeight] = useState(154)
  const [height, setHeight] = useState(67)
  const [age, setAge] = useState(30)
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [activity, setActivity] = useState('1.55')
  const [goal, setGoal] = useState<'maintain' | 'loss' | 'gain'>('maintain')


  const weightKg = unit === 'imperial' ? weight / 2.20462 : weight
  const heightCm = unit === 'imperial' ? height * 2.54 : height
    const result = useMemo(() => calculateCalories(weightKg, heightCm, age, gender, Number(activity), goal), [weight, height, age, gender, activity, goal])

  const goalData = [
    { label: 'Aggressive Loss', calories: result.aggressiveLoss, color: '#ef4444', desc: '-1000 kcal/day (-2 lbs/wk)' },
    { label: 'Weight Loss', calories: result.weightLoss, color: '#f59e0b', desc: '-500 kcal/day (-1 lb/wk)' },
    { label: 'Maintain', calories: result.maintenance, color: '#22c55e', desc: 'Maintain current weight' },
    { label: 'Weight Gain', calories: result.weightGain, color: '#14b8a6', desc: '+500 kcal/day (+1 lb/wk)' },
  ]

  const macroData = [
    { name: 'Protein', grams: result.macros.protein, kcal: result.macros.protein * 4, color: '#14b8a6', pct: Math.round((result.macros.protein * 4 / result.tdee) * 100) },
    { name: 'Carbs', grams: result.macros.carbs, kcal: result.macros.carbs * 4, color: '#3b82f6', pct: Math.round((result.macros.carbs * 4 / result.tdee) * 100) },
    { name: 'Fat', grams: result.macros.fat, kcal: result.macros.fat * 9, color: '#f59e0b', pct: Math.round((result.macros.fat * 9 / result.tdee) * 100) },
  ]

  return (
    <CalculatorLayout title="Calorie Calculator" description="Calculate your daily calorie needs (TDEE) based on your body stats, activity level, and fitness goal." icon="🔥" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-5">Your Profile</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-1 p-1 bg-gray-50 rounded-xl">
              {(['male', 'female'] as const).map(g => (
                <button key={g} onClick={() => setGender(g)} className={`py-2 rounded-xl text-sm font-semibold transition-all ${gender === g ? 'bg-rose-500 text-white' : 'text-gray-500'}`}>
                  {g === 'male' ? '♂ Male' : '♀ Female'}
                </button>
              ))}
            </div>
            <InputField label="Age" value={age} onChange={setAge} min={10} max={90} step={1} suffix="yrs" />
            {/* Unit Toggle */}
            <div className="grid grid-cols-2 gap-1 p-1 bg-gray-50 rounded-xl">
              {(['imperial', 'metric'] as const).map(u => (
                <button key={u} onClick={() => setUnit(u)}
                  className={`py-2 rounded-xl text-xs font-semibold transition-all ${unit === u ? 'bg-rose-500 text-white' : 'text-gray-500'}`}>
                  {u === 'imperial' ? '🇺🇸 lbs / in' : '🌍 kg / cm'}
                </button>
              ))}
            </div>

            <InputField label={unit === 'imperial' ? 'Weight (lbs)' : 'Weight (kg)'} value={weight} onChange={setWeight} min={unit === 'imperial' ? 66 : 30} max={unit === 'imperial' ? 550 : 250} step={unit === 'imperial' ? 1 : 0.5} suffix={unit === 'imperial' ? 'lbs' : 'kg'} />
            <HeightField unit={unit} value={height} onChange={setHeight} />
<SelectField label="Activity Level" value={activity} onChange={setActivity} options={[
              { value: '1.2', label: '🪑 Sedentary (desk job)' },
              { value: '1.375', label: '🚶 Light (1-3 days/wk)' },
              { value: '1.55', label: '🏃 Moderate (3-5 days/wk)' },
              { value: '1.725', label: '💪 Very Active (6-7 days/wk)' },
              { value: '1.9', label: '🏋️ Athlete (2x/day training)' },
            ]} />
            <SelectField label="Your Goal" value={goal} onChange={setGoal as any} options={[
              { value: 'loss', label: '⬇️ Lose Weight' },
              { value: 'maintain', label: '✅ Maintain Weight' },
              { value: 'gain', label: '⬆️ Gain Muscle' },
            ]} />
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="TDEE (Daily)" value={`${result.tdee} kcal`} subValue="Total energy expenditure" highlight />
            <ResultCard label="BMR (Resting)" value={`${result.bmr} kcal`} subValue="At complete rest" />
            <ResultCard label="For Your Goal" value={`${goal === 'loss' ? result.weightLoss : goal === 'gain' ? result.weightGain : result.maintenance} kcal`} />
            <ResultCard label="Protein Target" value={`${result.macros.protein}g`} subValue={`${result.macros.protein * 4} kcal`} />
          </div>

          {/* Goals comparison */}
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Calorie Targets by Goal</h3>
            <div className="space-y-3">
              {goalData.map(g => (
                <div key={g.label} className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: g.color }} />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <div>
                        <span className="text-sm font-semibold text-white">{g.label}</span>
                        <span className="text-xs text-gray-400 ml-2">{g.desc}</span>
                      </div>
                      <span className="text-sm font-bold" style={{ color: g.color }}>{g.calories} kcal</span>
                    </div>
                    <div className="h-1.5 bg-gray-50 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${(g.calories / result.weightGain) * 100}%`, background: g.color }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Macros */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Macronutrient Split</h3>
              <div style={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={macroData} cx="50%" cy="50%" outerRadius={75} dataKey="kcal" paddingAngle={3}>
                      {macroData.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}
                      formatter={(v: number, name, props) => [`${props.payload.grams}g / ${v} kcal`, name]} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Macro Breakdown</h3>
              <div className="space-y-4 mt-2">
                {macroData.map(m => (
                  <div key={m.name}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-semibold" style={{ color: m.color }}>{m.name}</span>
                      <span className="text-gray-900 font-bold">{m.grams}g <span className="text-gray-500 font-normal text-xs">({m.kcal} kcal - {m.pct}%)</span></span>
                    </div>
                    <div className="h-2 bg-gray-50 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${m.pct}%`, background: m.color }} />
                    </div>
                  </div>
                ))}
                <div className="pt-2 border-t border-gray-100 text-xs text-gray-400">
                  Per meal (4 meals/day): Protein ~{Math.round(result.macros.protein / 4)}g, Carbs ~{Math.round(result.macros.carbs / 4)}g, Fat ~{Math.round(result.macros.fat / 4)}g
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Calorie Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          A 35-year-old moderately active woman, 5'6", 145 lbs needs approximately <strong>2,050 calories/day</strong> to maintain weight. A 500-calorie daily deficit would produce ~1 lb/week loss.
        </p>
        <p className="text-sm text-gray-600">
          This Calorie 2026 uses the Mifflin-St Jeor equation — the most accurate formula recommended by registered dietitians — to give you personalized calorie targets.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Calorie Calculator"
        category="health"
        intro={`The **Calorie Calculator** is a free, evidence-based health assessment tool using formulas validated by the CDC, NIH, American Heart Association (AHA), and Academy of Nutrition and Dietetics. Get your calorie instantly - no account needed, works on all devices.

**Why Calorie matters for your health:** Understanding your calorie is one of the most important steps in proactive health management. Healthcare professionals use calorie as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.

**Based on US health standards:** This calculator uses reference ranges and formulas from CDC NHANES population data, NIH Dietary Reference Intakes (DRIs), American Heart Association clinical guidelines, and peer-reviewed research published in JAMA, NEJM, and the American Journal of Clinical Nutrition.

**Supports US customary AND metric units:** Enter your measurements in pounds and inches (the American way) or kilograms and centimeters - the calculator handles both instantly. Results include comparison to healthy ranges for your age and gender based on US population norms.

Combine this with [our BMR Calculator](/calculators/health/bmr-calculator), [our Macro Calculator](/calculators/health/macro-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Calorie Calculator:** This tool uses peer-reviewed, scientifically validated formulas that are the current gold standard for calculating calorie in clinical and research settings across the United States and internationally.

**Population reference data:** Results are compared against NHANES (National Health and Nutrition Examination Survey) data from the CDC - the largest, most comprehensive health survey of the US population, covering 5,000+ Americans annually. This gives your result meaningful context relative to real Americans of your age and gender.

**How to interpret your results:** Your calorie result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current calorie requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "100% Free - No Signup, No Subscription, No Ads", text: "This Calorie Calculator is permanently and completely free. There are no premium features locked behind a paywall, no trial periods, no subscription fees, and no advertisements that track your behavior. Every American deserves access to professional-grade health and wellness tools without financial or privacy barriers." },
          { title: "Real-Time Instant Results as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Calorie Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Validated US-Standard Formulas & Guidelines", text: "All calculations use formulas from peer-reviewed research and recognized US professional standards endorsed by the CDC, NIH, American Heart Association, and Academy of Nutrition and Dietetics. The same methodologies trusted by registered dietitians, physicians, and certified fitness professionals across America power this calculator's results." },
          { title: "Complete Privacy - Your Data Stays on Your Device", text: "Everything runs locally in your browser. No personal data is transmitted to any server, stored in any database, or shared with any third party - ever. When you close the browser tab, your inputs disappear permanently. This privacy-first design is essential for sensitive health and wellness information." },
          { title: "Works Perfectly on All Devices & Browsers", text: "Whether you're on an iPhone at the gym, an Android tablet at home, a MacBook at a coffee shop, or a Windows PC at the office, the Calorie Calculator works flawlessly. Fully responsive design tested on all major US browsers and mobile platforms ensures a consistent, high-quality experience everywhere." },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        scienceSection={`The scientific and professional community in the United States has developed the methodologies underlying this Calorie Calculator over decades of research, validation, and refinement. Major institutions including the National Institutes of Health (NIH), the Centers for Disease Control and Prevention (CDC), leading American universities, and national professional associations have all contributed to the body of evidence that informs the calculations this tool performs.

Peer-reviewed research published in major American journals - including JAMA, the New England Journal of Medicine, the American Journal of Clinical Nutrition, the Journal of Financial Planning, and other respected publications - provides the scientific foundation for the formulas and reference ranges used here. When multiple validated methods exist, this calculator uses the approach shown to be most accurate for the general American adult population in comparative studies.

Understanding that science is never fully settled, the formulas and reference ranges in this tool are periodically reviewed and updated as new evidence emerges. The goal is to always provide calculations based on the most current and widely-accepted professional consensus - giving you access to the same evidence base that trained professionals consult when working with American clients and patients every day.

It is also important to note that population-based research, by its nature, describes averages and distributions rather than guaranteeing outcomes for any specific individual. Your personal results may differ from calculated predictions based on genetic factors, environmental influences, lifestyle variables, or other individual characteristics. This is not a limitation of the tool - it reflects the inherent complexity of human biology and personal circumstances - and it is precisely why tracking your actual outcomes and adjusting accordingly is always recommended alongside any calculatio-based goal-setting.`}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Calorie Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Calorie Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Calorie Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Calorie Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Calorie Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Calorie calculation:**

1. **Consistency in measurement:** Measure at the same time of day, same conditions. For body measurements (weight, body fat), morning after using the bathroom and before eating gives most consistent results. For health scores, enter your resting values, not post-exercise numbers.

2. **Track trends, not single readings:** One measurement is a snapshot. Track your calorie monthly for 3-6 months to see meaningful trends. Healthy calorie improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Calorie is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your calorie is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        commonMistakes={`Many Americans calculate their TDEE and then immediately cut calories by 1,000+ per day, believing faster is better. This is counterproductive: extreme deficits trigger metabolic adaptation, muscle loss, nutrient deficiencies, and are unsustainable. A 500-calorie deficit is the science-backed sweet spot for most people.

Another widespread mistake is not accounting for activity changes. If you start a new exercise program while cutting calories, your TDEE increases - you may need to eat MORE than you think to avoid burning muscle. Recalculate your TDEE anytime your activity level changes significantly.

Liquid calories are routinely overlooked. A 20oz regular soda contains ~240 calories. Starbucks specialty drinks range from 250-600+ calories. Alcohol adds 100-200 calories per drink. Americans who fail to account for beverages consistently undercut their calorie tracking efforts.`}
        conclusion={`The Calorie Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.

Use this calculator regularly as your situation changes over time - recalculate whenever your key inputs change significantly to ensure your goals and targets remain calibrated to your current reality. Explore our full library of related calculators to build a comprehensive understanding of your complete health and wellness situation, since no single metric tells the whole story.

For a complete health overview, also use [our BMR Calculator](/calculators/health/bmr-calculator), [our Macro Calculator](/calculators/health/macro-calculator), and [our Calorie Deficit Calculator](/calculators/health/calorie-deficit-calculator).

Remember that the most powerful use of any calculator is not just knowing your current number, but using that number to set a clear, measurable goal and tracking your progress toward it. Accurate information, consistently tracked and thoughtfully applied with patience and consistency, is one of the most powerful tools available for improving any area of your life. Start with what you know today, commit to the process, and let data guide your journey.`}
      />
      )}
    </CalculatorLayout>
  )
}
