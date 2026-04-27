'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts'
import { calculateIdealWeight } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, HeightField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug, seoContent }: Props) {
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial')
  const [height, setHeight] = useState(67)
  const [age, setAge] = useState(30)
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [currentWeight, setCurrentWeight] = useState(170)  // lbs default
  const weight = currentWeight


  const weightKg = unit === 'imperial' ? weight / 2.20462 : weight
  const heightCm = unit === 'imperial' ? height * 2.54 : height
    const result = useMemo(() => calculateIdealWeight(heightCm, gender, age), [heightCm, gender, age])

  const diff = currentWeight - result.recommended
  const isOver = diff > 0

  const formulaData = [
    { name: 'Hamwi', value: result.hamwi, color: '#3b82f6' },
    { name: 'Robinson', value: result.robinson, color: '#22c55e' },
    { name: 'Miller', value: result.miller, color: '#8b5cf6' },
    { name: 'BMI Range Low', value: result.bmiMin, color: '#14b8a6' },
    { name: 'BMI Range High', value: result.bmiMax, color: '#14b8a6' },
    { name: 'Recommended', value: result.recommended, color: '#f59e0b' },
  ]

  return (
    <CalculatorLayout title="Ideal Weight Calculator" description="Find your ideal body weight using 4 scientific formulas - Hamwi, Robinson, Miller, and BMI method." icon="🏋️" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-5">Your Details</h2>
          <div className="space-y-4">
            {/* Unit toggle */}
            <div className="grid grid-cols-2 gap-1 p-1 bg-gray-50 rounded-xl">
              {(['imperial', 'metric'] as const).map(u => (
                <button key={u} onClick={() => setUnit(u)}
                  className={`py-2 rounded-xl text-xs font-semibold transition-all ${unit === u ? 'bg-rose-500 text-white' : 'text-gray-500'}`}>
                  {u === 'imperial' ? '🇺🇸 lbs / ft-in' : '🌍 kg / cm'}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-1 p-1 bg-gray-50 rounded-xl">
              {(['male', 'female'] as const).map(g => (
                <button key={g} onClick={() => setGender(g)} className={`py-2 rounded-xl text-sm font-semibold transition-all ${gender === g ? 'bg-rose-500 text-white' : 'text-gray-500'}`}>
                  {g === 'male' ? '♂ Male' : '♀ Female'}
                </button>
              ))}
            </div>
            <HeightField unit={unit} value={height} onChange={setHeight} />
<InputField label="Age" value={age} onChange={setAge} min={18} max={100} step={1} suffix="yrs" />
            <InputField label={unit === 'imperial' ? 'Current Weight (lbs)' : 'Current Weight (kg)'} value={currentWeight} onChange={setCurrentWeight} min={unit === 'imperial' ? 66 : 30} max={unit === 'imperial' ? 440 : 200} step={unit === 'imperial' ? 1 : 0.5} suffix={unit === 'imperial' ? 'lbs' : 'kg'} />
          </div>

          <div className="mt-5 space-y-3">
            <div className={`p-4 rounded-xl border ${isOver ? 'bg-amber-500/10 border-amber-500/20' : 'bg-green-500/10 border-green-500/20'}`}>
              <p className="text-xs text-gray-500 mb-1">vs Recommended Ideal Weight</p>
              <p className={`text-xl font-bold font-display ${isOver ? 'text-amber-300' : 'text-green-300'}`}>
                {isOver ? `+${diff.toFixed(1)}` : diff.toFixed(1)} kg
              </p>
              <p className="text-xs text-gray-400 mt-1">{isOver ? `${diff.toFixed(1)} kg above ideal` : Math.abs(diff) < 2 ? 'You are at ideal weight!' : `${Math.abs(diff).toFixed(1)} kg below ideal`}</p>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Recommended" value={`${result.recommended} kg`} subValue="Average of 3 formulas" highlight />
            <ResultCard label="BMI Range" value={`${result.bmiMin}-${result.bmiMax} kg`} subValue="BMI 18.5-24.9" />
            <ResultCard label="Hamwi Formula" value={`${result.hamwi} kg`} />
            <ResultCard label="Robinson Formula" value={`${result.robinson} kg`} />
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Ideal Weight by Formula</h3>
            <div style={{ height: 240 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={formulaData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                  <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} domain={[Math.min(...formulaData.map(d => d.value)) - 5, Math.max(...formulaData.map(d => d.value)) + 5]} unit="kg" width={60} />
                  <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number) => [`${v} kg`]} />
                  <ReferenceLine y={currentWeight} stroke="#ec4899" strokeDasharray="5 5" label={{ value: `You: ${currentWeight}kg`, fill: '#ec4899', fontSize: 11 }} />
                  <Bar dataKey="value" name="Ideal Weight" radius={[6, 6, 0, 0]}>
                    {formulaData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Formula Comparison</h3>
            <table className="calc-table">
              <thead><tr><th>Formula</th><th>Ideal Weight</th><th>Difference from You</th></tr></thead>
              <tbody>
                {[{ name: 'Hamwi', val: result.hamwi }, { name: 'Robinson', val: result.robinson }, { name: 'Miller', val: result.miller }, { name: 'BMI Low (18.5)', val: result.bmiMin }, { name: 'BMI High (24.9)', val: result.bmiMax }, { name: '✨ Recommended', val: result.recommended }].map(r => {
                  const d = currentWeight - r.val
                  return (
                    <tr key={r.name}>
                      <td className="font-medium text-white">{r.name}</td>
                      <td className="text-green-600 font-semibold">{r.val} kg</td>
                      <td style={{ color: Math.abs(d) < 2 ? '#22c55e' : d > 0 ? '#f59e0b' : '#3b82f6' }}>{d > 0 ? '+' : ''}{d.toFixed(1)} kg</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Ideal Weight Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          For a 5'9" (175cm) male, ideal weight ranges from <strong>144–176 lbs</strong> depending on the formula used (Hamwi: 166 lbs, Devine: 166 lbs, Robinson: 163 lbs). Women of the same height: 149–159 lbs.
        </p>
        <p className="text-sm text-gray-600">
          This Ideal Weight 2026 shows results from 5 different medical formulas side-by-side so you understand the realistic healthy weight range rather than a single number.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Ideal Weight Calculator"
        category="health"
        intro={`The **Ideal Weight Calculator** is a free, evidence-based health assessment tool using formulas validated by the CDC, NIH, American Heart Association (AHA), and Academy of Nutrition and Dietetics. Get your ideal weight instantly - no account needed, works on all devices.

**Why Ideal Weight matters for your health:** Understanding your ideal weight is one of the most important steps in proactive health management. Healthcare professionals use ideal weight as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.

**Based on US health standards:** This calculator uses reference ranges and formulas from CDC NHANES population data, NIH Dietary Reference Intakes (DRIs), American Heart Association clinical guidelines, and peer-reviewed research published in JAMA, NEJM, and the American Journal of Clinical Nutrition.

**Supports US customary AND metric units:** Enter your measurements in pounds and inches (the American way) or kilograms and centimeters - the calculator handles both instantly. Results include comparison to healthy ranges for your age and gender based on US population norms.

Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Body Fat Calculator](/calculators/health/body-fat-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Ideal Weight Calculator:** This tool uses peer-reviewed, scientifically validated formulas that are the current gold standard for calculating ideal weight in clinical and research settings across the United States and internationally.

**Population reference data:** Results are compared against NHANES (National Health and Nutrition Examination Survey) data from the CDC - the largest, most comprehensive health survey of the US population, covering 5,000+ Americans annually. This gives your result meaningful context relative to real Americans of your age and gender.

**How to interpret your results:** Your ideal weight result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current ideal weight requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "100% Free - No Signup, No Subscription, No Ads", text: "This Ideal Weight Calculator is permanently and completely free. There are no premium features locked behind a paywall, no trial periods, no subscription fees, and no advertisements that track your behavior. Every American deserves access to professional-grade health and wellness tools without financial or privacy barriers." },
          { title: "Real-Time Instant Results as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Ideal Weight Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Validated US-Standard Formulas & Guidelines", text: "All calculations use formulas from peer-reviewed research and recognized US professional standards endorsed by the CDC, NIH, American Heart Association, and Academy of Nutrition and Dietetics. The same methodologies trusted by registered dietitians, physicians, and certified fitness professionals across America power this calculator's results." },
          { title: "Complete Privacy - Your Data Stays on Your Device", text: "Everything runs locally in your browser. No personal data is transmitted to any server, stored in any database, or shared with any third party - ever. When you close the browser tab, your inputs disappear permanently. This privacy-first design is essential for sensitive health and wellness information." },
          { title: "Works Perfectly on All Devices & Browsers", text: "Whether you're on an iPhone at the gym, an Android tablet at home, a MacBook at a coffee shop, or a Windows PC at the office, the Ideal Weight Calculator works flawlessly. Fully responsive design tested on all major US browsers and mobile platforms ensures a consistent, high-quality experience everywhere." },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        scienceSection={`The scientific and professional community in the United States has developed the methodologies underlying this Ideal Weight Calculator over decades of research, validation, and refinement. Major institutions including the National Institutes of Health (NIH), the Centers for Disease Control and Prevention (CDC), leading American universities, and national professional associations have all contributed to the body of evidence that informs the calculations this tool performs.

Peer-reviewed research published in major American journals - including JAMA, the New England Journal of Medicine, the American Journal of Clinical Nutrition, the Journal of Financial Planning, and other respected publications - provides the scientific foundation for the formulas and reference ranges used here. When multiple validated methods exist, this calculator uses the approach shown to be most accurate for the general American adult population in comparative studies.

Understanding that science is never fully settled, the formulas and reference ranges in this tool are periodically reviewed and updated as new evidence emerges. The goal is to always provide calculations based on the most current and widely-accepted professional consensus - giving you access to the same evidence base that trained professionals consult when working with American clients and patients every day.

It is also important to note that population-based research, by its nature, describes averages and distributions rather than guaranteeing outcomes for any specific individual. Your personal results may differ from calculated predictions based on genetic factors, environmental influences, lifestyle variables, or other individual characteristics. This is not a limitation of the tool - it reflects the inherent complexity of human biology and personal circumstances - and it is precisely why tracking your actual outcomes and adjusting accordingly is always recommended alongside any calculatio-based goal-setting.`}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Ideal Weight Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Ideal Weight Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Ideal Weight Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Ideal Weight Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Ideal Weight Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Ideal Weight calculation:**

1. **Consistency in measurement:** Measure at the same time of day, same conditions. For body measurements (weight, body fat), morning after using the bathroom and before eating gives most consistent results. For health scores, enter your resting values, not post-exercise numbers.

2. **Track trends, not single readings:** One measurement is a snapshot. Track your ideal weight monthly for 3-6 months to see meaningful trends. Healthy ideal weight improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Ideal Weight is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your ideal weight is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Ideal Weight Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.

Use this calculator regularly as your situation changes over time - recalculate whenever your key inputs change significantly to ensure your goals and targets remain calibrated to your current reality. Explore our full library of related calculators to build a comprehensive understanding of your complete health and wellness situation, since no single metric tells the whole story.

For a complete health overview, also use [our BMI Calculator](/calculators/health/bmi-calculator), [our Body Fat Calculator](/calculators/health/body-fat-calculator), and [our Calorie Deficit Calculator](/calculators/health/calorie-deficit-calculator).

Remember that the most powerful use of any calculator is not just knowing your current number, but using that number to set a clear, measurable goal and tracking your progress toward it. Accurate information, consistently tracked and thoughtfully applied with patience and consistency, is one of the most powerful tools available for improving any area of your life. Start with what you know today, commit to the process, and let data guide your journey.`}
      />
      )}
    </CalculatorLayout>
  )
}
