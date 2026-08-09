'use client'
import { useState, useMemo } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import { calculateCalories } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, SelectField, HeightField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, relatedCalculators, blogSlug, seoContent }: Props) {
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
    <CalculatorLayout title="Calorie Calculator" description="Calculate your daily calorie needs (TDEE) based on your body stats, activity level, and fitness goal." icon="🔥" category="Health" relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="calorie-calculator">
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

        <div className="lg:col-span-2 space-y-4" data-pdf-results>
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
        intro={`The **Calorie Calculator** is a a health information tool using the method and reference data described for this calculator. Get your calorie instantly - no account needed, works on all devices.

**Why Calorie matters for your health:** Understanding your calorie is one of the most important steps in proactive health management. Healthcare professionals use calorie as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the the same calculation framework described in this guide.





Combine this with [our BMR Calculator](/calculators/health/bmr-calculator), [our Macro Calculator](/calculators/health/macro-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Calorie Calculator:** This tool applies the calculation method described for calorie in clinical and research settings across the United States and internationally.



**How to interpret your results:** Your calorie result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current calorie requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "Real-Time Calorie Calculator output as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Calorie Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Calorie Calculator methodology and assumptions & Guidelines", text: "The methodology should be interpreted alongside the specific formula and sources described for this calculator; a health result is an estimate and should not be treated as a clinical diagnosis. " },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Calorie Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Calorie Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Calorie Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Calorie Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Calorie Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Calorie calculation:**



2. **Track trends, not single readings:** One measurement is a snapshot. Track your calorie monthly for 3-6 months to see meaningful trends. Healthy calorie improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Calorie is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your calorie is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        commonMistakes={`Many Americans calculate their TDEE and then immediately cut calories by 1,000+ per day, believing faster is better. This is counterproductive: extreme deficits trigger metabolic adaptation, muscle loss, nutrient deficiencies, and are unsustainable. A 500-calorie deficit is the science-backed sweet spot for most people.

Another widespread mistake is not accounting for activity changes. If you start a new exercise program while cutting calories, your TDEE increases - you may need to eat MORE than you think to avoid burning muscle. Recalculate your TDEE anytime your activity level changes significantly.

Liquid calories are routinely overlooked. A 20oz regular soda contains ~240 calories. Starbucks specialty drinks range from 250-600+ calories. Alcohol adds 100-200 calories per drink. Americans who fail to account for beverages consistently undercut their calorie tracking efforts.`}
        conclusion={`The Calorie Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.



For a complete health overview, also use [our BMR Calculator](/calculators/health/bmr-calculator), [our Macro Calculator](/calculators/health/macro-calculator), and [our Calorie Deficit Calculator](/calculators/health/calorie-deficit-calculator).

`}
      />
      )}
    </CalculatorLayout>
  )
}
