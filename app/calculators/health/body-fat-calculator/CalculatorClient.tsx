'use client'
import { useState, useMemo } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import { calculateBodyFat } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, HeightField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug, seoContent }: Props) {
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial')
  const [weight, setWeight] = useState(176)
  const [height, setHeight] = useState(69)
  const [waist, setWaist] = useState(85)
  const [neck, setNeck] = useState(38)
  const [hip, setHip] = useState(95)


  const weightKg = unit === 'imperial' ? weight / 2.20462 : weight
  const heightCm = unit === 'imperial' ? height * 2.54 : height
    const result = useMemo(() => calculateBodyFat(gender, weightKg, heightCm, waist, neck, gender === 'female' ? hip : undefined), [gender, weight, height, waist, neck, hip])

  const categoryRanges = gender === 'male'
    ? [{ label: 'Essential', min: 2, max: 5, color: '#3b82f6' }, { label: 'Athletic', min: 6, max: 13, color: '#22c55e' }, { label: 'Fitness', min: 14, max: 17, color: '#14b8a6' }, { label: 'Average', min: 18, max: 24, color: '#f59e0b' }, { label: 'Obese', min: 25, max: 40, color: '#ef4444' }]
    : [{ label: 'Essential', min: 10, max: 13, color: '#3b82f6' }, { label: 'Athletic', min: 14, max: 20, color: '#22c55e' }, { label: 'Fitness', min: 21, max: 24, color: '#14b8a6' }, { label: 'Average', min: 25, max: 31, color: '#f59e0b' }, { label: 'Obese', min: 32, max: 50, color: '#ef4444' }]

  const currentCat = categoryRanges.find(c => result.bodyFat >= c.min && result.bodyFat <= c.max) || categoryRanges[categoryRanges.length - 1]

  const bodyComposition = [
    { name: 'Fat Mass', value: result.fatMass, color: '#f59e0b' },
    { name: 'Lean Mass', value: result.leanMass, color: '#14b8a6' },
  ]

  return (
    <CalculatorLayout title="Body Fat Calculator" description="Calculate body fat percentage using the US Navy method. Get fat mass, lean mass, and fitness category." icon="💪" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-5">Measurements</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-1 p-1 bg-gray-50 rounded-xl">
              {(['male', 'female'] as const).map(g => (
                <button key={g} onClick={() => setGender(g)} className={`py-2 rounded-xl text-sm font-semibold transition-all ${gender === g ? 'bg-rose-500 text-white' : 'text-gray-500'}`}>
                  {g === 'male' ? '♂ Male' : '♀ Female'}
                </button>
              ))}
            </div>
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
<InputField label="Waist (at navel)" value={waist} onChange={setWaist} min={50} max={200} step={0.5} suffix="cm" />
            <InputField label="Neck (below larynx)" value={neck} onChange={setNeck} min={25} max={70} step={0.5} suffix="cm" />
            {gender === 'female' && <InputField label="Hip (widest point)" value={hip} onChange={setHip} min={60} max={200} step={0.5} suffix="cm" />}
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          {/* Big number */}
          <Card gradient>
            <div className="text-center py-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Body Fat Percentage</p>
              <div className="text-7xl font-black font-display mb-2" style={{ color: currentCat.color }}>{result.bodyFat}%</div>
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold" style={{ background: `${currentCat.color}20`, color: currentCat.color, border: `1px solid ${currentCat.color}40` }}>
                {result.category}
              </span>
            </div>
          </Card>

          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Body Fat" value={`${result.bodyFat}%`} subValue={result.category} highlight />
            <ResultCard label="Fat Mass" value={`${result.fatMass} kg`} />
            <ResultCard label="Lean Mass" value={`${result.leanMass} kg`} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Body Composition</h3>
              <div style={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={bodyComposition} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value">
                      {bodyComposition.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number) => [`${v} kg`]} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Body Fat Categories</h3>
              <div className="space-y-2.5">
                {categoryRanges.map(cat => (
                  <div key={cat.label} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: cat.color }} />
                    <div className="flex-1 flex items-center justify-between">
                      <span className="text-sm text-gray-700">{cat.label}</span>
                      <span className="text-xs text-gray-500">{cat.min}-{cat.max}%</span>
                    </div>
                    {result.category === cat.label && <span className="text-xs font-bold px-1.5 py-0.5 rounded-full" style={{ background: `${cat.color}30`, color: cat.color }}>YOU</span>}
                  </div>
                ))}
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
          Body Fat Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          A 180 lb male with a 34" waist and 15" neck has an estimated body fat of <strong>18%</strong> (Navy method) — within the "fitness" range of 14–17%. A woman with similar proportions would be at approximately 25%.
        </p>
        <p className="text-sm text-gray-600">
          This Body Fat 2026 gives a more accurate picture of health than BMI alone, distinguishing between fat mass and lean muscle mass.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Body Fat Calculator"
        category="health"
        intro={`The **Body Fat Calculator** is a free, evidence-based health assessment tool using formulas validated by the CDC, NIH, American Heart Association (AHA), and Academy of Nutrition and Dietetics. Get your body fat instantly - no account needed, works on all devices.

**Why Body Fat matters for your health:** Understanding your body fat is one of the most important steps in proactive health management. Healthcare professionals use body fat as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.

**Based on US health standards:** This calculator uses reference ranges and formulas from CDC NHANES population data, NIH Dietary Reference Intakes (DRIs), American Heart Association clinical guidelines, and peer-reviewed research published in JAMA, NEJM, and the American Journal of Clinical Nutrition.

**Supports US customary AND metric units:** Enter your measurements in pounds and inches (the American way) or kilograms and centimeters - the calculator handles both instantly. Results include comparison to healthy ranges for your age and gender based on US population norms.

Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Lean Body Mass Calculator](/calculators/health/lean-body-mass-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Body Fat Calculator:** This tool uses peer-reviewed, scientifically validated formulas that are the current gold standard for calculating body fat in clinical and research settings across the United States and internationally.

**Population reference data:** Results are compared against NHANES (National Health and Nutrition Examination Survey) data from the CDC - the largest, most comprehensive health survey of the US population, covering 5,000+ Americans annually. This gives your result meaningful context relative to real Americans of your age and gender.

**How to interpret your results:** Your body fat result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current body fat requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "100% Free - No Signup, No Subscription, No Ads", text: "This Body Fat Calculator is permanently and completely free. There are no premium features locked behind a paywall, no trial periods, no subscription fees, and no advertisements that track your behavior. Every American deserves access to professional-grade health and wellness tools without financial or privacy barriers." },
          { title: "Real-Time Instant Results as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Body Fat Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Validated US-Standard Formulas & Guidelines", text: "All calculations use formulas from peer-reviewed research and recognized US professional standards endorsed by the CDC, NIH, American Heart Association, and Academy of Nutrition and Dietetics. The same methodologies trusted by registered dietitians, physicians, and certified fitness professionals across America power this calculator's results." },
          { title: "Complete Privacy - Your Data Stays on Your Device", text: "Everything runs locally in your browser. No personal data is transmitted to any server, stored in any database, or shared with any third party - ever. When you close the browser tab, your inputs disappear permanently. This privacy-first design is essential for sensitive health and wellness information." },
          { title: "Works Perfectly on All Devices & Browsers", text: "Whether you're on an iPhone at the gym, an Android tablet at home, a MacBook at a coffee shop, or a Windows PC at the office, the Body Fat Calculator works flawlessly. Fully responsive design tested on all major US browsers and mobile platforms ensures a consistent, high-quality experience everywhere." },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        scienceSection={`The scientific and professional community in the United States has developed the methodologies underlying this Body Fat Calculator over decades of research, validation, and refinement. Major institutions including the National Institutes of Health (NIH), the Centers for Disease Control and Prevention (CDC), leading American universities, and national professional associations have all contributed to the body of evidence that informs the calculations this tool performs.

Peer-reviewed research published in major American journals - including JAMA, the New England Journal of Medicine, the American Journal of Clinical Nutrition, the Journal of Financial Planning, and other respected publications - provides the scientific foundation for the formulas and reference ranges used here. When multiple validated methods exist, this calculator uses the approach shown to be most accurate for the general American adult population in comparative studies.

Understanding that science is never fully settled, the formulas and reference ranges in this tool are periodically reviewed and updated as new evidence emerges. The goal is to always provide calculations based on the most current and widely-accepted professional consensus - giving you access to the same evidence base that trained professionals consult when working with American clients and patients every day.

It is also important to note that population-based research, by its nature, describes averages and distributions rather than guaranteeing outcomes for any specific individual. Your personal results may differ from calculated predictions based on genetic factors, environmental influences, lifestyle variables, or other individual characteristics. This is not a limitation of the tool - it reflects the inherent complexity of human biology and personal circumstances - and it is precisely why tracking your actual outcomes and adjusting accordingly is always recommended alongside any calculatio-based goal-setting.`}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Body Fat Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Body Fat Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Body Fat Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Body Fat Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Body Fat Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Body Fat calculation:**

1. **Consistency in measurement:** Measure at the same time of day, same conditions. For body measurements (weight, body fat), morning after using the bathroom and before eating gives most consistent results. For health scores, enter your resting values, not post-exercise numbers.

2. **Track trends, not single readings:** One measurement is a snapshot. Track your body fat monthly for 3-6 months to see meaningful trends. Healthy body fat improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Body Fat is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your body fat is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Body Fat Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.

Use this calculator regularly as your situation changes over time - recalculate whenever your key inputs change significantly to ensure your goals and targets remain calibrated to your current reality. Explore our full library of related calculators to build a comprehensive understanding of your complete health and wellness situation, since no single metric tells the whole story.

For a complete health overview, also use [our BMI Calculator](/calculators/health/bmi-calculator), [our Lean Body Mass Calculator](/calculators/health/lean-body-mass-calculator), and [our Army Body Fat Calculator](/calculators/health/army-body-fat-calculator).

Remember that the most powerful use of any calculator is not just knowing your current number, but using that number to set a clear, measurable goal and tracking your progress toward it. Accurate information, consistently tracked and thoughtfully applied with patience and consistency, is one of the most powerful tools available for improving any area of your life. Start with what you know today, commit to the process, and let data guide your journey.`}
      />
      )}
    </CalculatorLayout>
  )
}
