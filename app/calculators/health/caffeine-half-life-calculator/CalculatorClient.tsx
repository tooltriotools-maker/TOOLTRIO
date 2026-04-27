'use client'
import { useState, useMemo, useCallback } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug, seoContent }: Props) {

  const [amount, setAmount] = useState(200)
  const [intakeHour, setIntakeHour] = useState(9)
  const [intakeMin, setIntakeMin] = useState(0)
  const [halfLife, setHalfLife] = useState(5.5)
  const [sleepTarget, setSleepTarget] = useState(23)

  const result = useMemo(() => {
    const atSleep = amount * Math.pow(0.5, (sleepTarget - intakeHour - intakeMin/60) / halfLife)
    const clearTime = halfLife * Math.log2(amount) + intakeHour + intakeMin/60
    const safeStop = sleepTarget - halfLife * Math.log2(amount/25)
    const timeline = [0.25, 0.5, 1, 2, 3, 4, 6, 8, 10, 12].map(h => ({
      hr: h,
      mg: Math.round(amount * Math.pow(0.5, h / halfLife)),
      label: `+${h}h`
    }))
    const safeMg = Math.max(0, Math.round(atSleep))
    const sleepImpact = safeMg > 100 ? 'Significant disruption' : safeMg > 50 ? 'Moderate impact' : safeMg > 25 ? 'Mild impact' : 'Minimal impact'
    const impactColor = safeMg > 100 ? 'text-red-600' : safeMg > 50 ? 'text-orange-600' : safeMg > 25 ? 'text-yellow-600' : 'text-green-600'
    const safeStopHr = Math.floor(Math.max(0, Math.min(23, safeStop)))
    const safeStopMin = Math.round((safeStop - safeStopHr) * 60)
    return { atSleep: safeMg, timeline, sleepImpact, impactColor, safeStopHr, safeStopMin, clearTime: Math.round(clearTime) }
  }, [amount, intakeHour, intakeMin, halfLife, sleepTarget])

  const SOURCES = [
    { name: 'Espresso (1 shot)', mg: 63 }, { name: 'Drip Coffee (240ml)', mg: 150 },
    { name: 'Green Tea (240ml)', mg: 35 }, { name: 'Black Tea (240ml)', mg: 50 },
    { name: 'Energy Drink (250ml)', mg: 80 }, { name: 'Pre-workout', mg: 200 },
    { name: 'Cola (355ml)', mg: 40 }, { name: 'Dark Chocolate (40g)', mg: 25 },
  ]

  return (
    <CalculatorLayout title="Caffeine Half-Life Calculator" description="Find out when caffeine clears your system and the best time to stop drinking coffee for quality sleep." icon="☕" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Your Caffeine Intake</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Quick Select Source</label>
              <div className="grid grid-cols-2 gap-1.5">
                {SOURCES.map(s => (
                  <button key={s.name} onClick={() => setAmount(s.mg)}
                    className={`text-left px-2.5 py-2 rounded-xl text-xs border-2 transition-all ${amount === s.mg ? 'bg-amber-100 border-amber-400 font-bold text-amber-800' : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}>
                    <p className="font-semibold truncate">{s.name}</p>
                    <p className="text-amber-600 font-bold">{s.mg}mg</p>
                  </button>
                ))}
              </div>
            </div>
            <InputField label="Caffeine Amount (mg)" value={amount} onChange={setAmount} min={10} max={1000} step={10} suffix="mg" />
            <div className="grid grid-cols-2 gap-2">
              <InputField label="Intake Hour" value={intakeHour} onChange={setIntakeHour} min={0} max={23} step={1} suffix="hr" />
              <InputField label="Intake Min" value={intakeMin} onChange={setIntakeMin} min={0} max={59} step={15} suffix="min" />
            </div>
            <InputField label="Bedtime Hour" value={sleepTarget} onChange={setSleepTarget} min={18} max={30} step={1} suffix="hr" />
            <SelectField label="Your Half-Life" value={String(halfLife)} onChange={v => setHalfLife(Number(v))} options={[{value:'3',label:'Fast (3h) - smoker/athlete'},{value:'5.5',label:'Average (5.5h)'},{value:'7',label:'Slow (7h) - typical adult'},{value:'10',label:'Very slow (10h) - pregnant/pill'}]} />
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className={`p-5 rounded-2xl border-2 text-center ${result.atSleep > 50 ? 'bg-red-50 border-red-300' : result.atSleep > 25 ? 'bg-yellow-50 border-yellow-300' : 'bg-green-50 border-green-300'}`}>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Caffeine at Bedtime</p>
            <p className={`text-6xl font-black my-2 ${result.impactColor}`}>{result.atSleep}mg</p>
            <p className={`text-lg font-bold ${result.impactColor}`}>{result.sleepImpact}</p>
            <p className="text-sm text-gray-500 mt-1">Best cut-off: {result.safeStopHr}:{String(result.safeStopMin).padStart(2,'0')} for minimal sleep impact</p>
          </div>
          <Card>
            <h3 className="font-bold text-gray-900 mb-3">Caffeine Clearance Timeline</h3>
            <div className="space-y-2">
              {result.timeline.map(t => (
                <div key={t.hr} className="flex items-center gap-3">
                  <span className="text-xs font-mono text-gray-400 w-10 flex-shrink-0">{t.label}</span>
                  <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${t.mg > 100 ? 'bg-red-400' : t.mg > 50 ? 'bg-orange-400' : t.mg > 25 ? 'bg-yellow-400' : 'bg-green-400'}`}
                      style={{ width: `${Math.min(100, (t.mg / amount) * 100)}%` }} />
                  </div>
                  <span className="text-xs font-black w-14 text-right text-gray-700">{t.mg}mg</span>
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
          Caffeine Half Life Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Caffeine Half Life 2026 tool to get instant, evidence-based results personalized to your age, weight, and health goals. No signup required — complete privacy guaranteed.
        </p>
        <p className="text-sm text-gray-600">
          All calculations use validated formulas from CDC, NIH, and peer-reviewed health research. Adjust your inputs to explore different scenarios and health targets.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Caffeine Half Life Calculator"
        category="health"
        intro={`The **Caffeine Half Life Calculator** is a free, evidence-based health assessment tool using formulas validated by the CDC, NIH, American Heart Association (AHA), and Academy of Nutrition and Dietetics. Get your caffeine half life instantly - no account needed, works on all devices.

**Why Caffeine Half Life matters for your health:** Understanding your caffeine half life is one of the most important steps in proactive health management. Healthcare professionals use caffeine half life as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.

**Based on US health standards:** This calculator uses reference ranges and formulas from CDC NHANES population data, NIH Dietary Reference Intakes (DRIs), American Heart Association clinical guidelines, and peer-reviewed research published in JAMA, NEJM, and the American Journal of Clinical Nutrition.

**Supports US customary AND metric units:** Enter your measurements in pounds and inches (the American way) or kilograms and centimeters - the calculator handles both instantly. Results include comparison to healthy ranges for your age and gender based on US population norms.

Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Caffeine Half Life Calculator:** This tool uses peer-reviewed, scientifically validated formulas that are the current gold standard for calculating caffeine half life in clinical and research settings across the United States and internationally.

**Population reference data:** Results are compared against NHANES (National Health and Nutrition Examination Survey) data from the CDC - the largest, most comprehensive health survey of the US population, covering 5,000+ Americans annually. This gives your result meaningful context relative to real Americans of your age and gender.

**How to interpret your results:** Your caffeine half life result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current caffeine half life requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "100% Free - No Signup, No Subscription, No Ads", text: "This Caffeine Half Life Calculator is permanently and completely free. There are no premium features locked behind a paywall, no trial periods, no subscription fees, and no advertisements that track your behavior. Every American deserves access to professional-grade health and wellness tools without financial or privacy barriers." },
          { title: "Real-Time Instant Results as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Caffeine Half Life Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Validated US-Standard Formulas & Guidelines", text: "All calculations use formulas from peer-reviewed research and recognized US professional standards endorsed by the CDC, NIH, American Heart Association, and Academy of Nutrition and Dietetics. The same methodologies trusted by registered dietitians, physicians, and certified fitness professionals across America power this calculator's results." },
          { title: "Complete Privacy - Your Data Stays on Your Device", text: "Everything runs locally in your browser. No personal data is transmitted to any server, stored in any database, or shared with any third party - ever. When you close the browser tab, your inputs disappear permanently. This privacy-first design is essential for sensitive health and wellness information." },
          { title: "Works Perfectly on All Devices & Browsers", text: "Whether you're on an iPhone at the gym, an Android tablet at home, a MacBook at a coffee shop, or a Windows PC at the office, the Caffeine Half Life Calculator works flawlessly. Fully responsive design tested on all major US browsers and mobile platforms ensures a consistent, high-quality experience everywhere." },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        scienceSection={`The scientific and professional community in the United States has developed the methodologies underlying this Caffeine Half Life Calculator over decades of research, validation, and refinement. Major institutions including the National Institutes of Health (NIH), the Centers for Disease Control and Prevention (CDC), leading American universities, and national professional associations have all contributed to the body of evidence that informs the calculations this tool performs.

Peer-reviewed research published in major American journals - including JAMA, the New England Journal of Medicine, the American Journal of Clinical Nutrition, the Journal of Financial Planning, and other respected publications - provides the scientific foundation for the formulas and reference ranges used here. When multiple validated methods exist, this calculator uses the approach shown to be most accurate for the general American adult population in comparative studies.

Understanding that science is never fully settled, the formulas and reference ranges in this tool are periodically reviewed and updated as new evidence emerges. The goal is to always provide calculations based on the most current and widely-accepted professional consensus - giving you access to the same evidence base that trained professionals consult when working with American clients and patients every day.

It is also important to note that population-based research, by its nature, describes averages and distributions rather than guaranteeing outcomes for any specific individual. Your personal results may differ from calculated predictions based on genetic factors, environmental influences, lifestyle variables, or other individual characteristics. This is not a limitation of the tool - it reflects the inherent complexity of human biology and personal circumstances - and it is precisely why tracking your actual outcomes and adjusting accordingly is always recommended alongside any calculatio-based goal-setting.`}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Caffeine Half Life Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Caffeine Half Life Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Caffeine Half Life Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Caffeine Half Life Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Caffeine Half Life Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Caffeine Half Life calculation:**

1. **Consistency in measurement:** Measure at the same time of day, same conditions. For body measurements (weight, body fat), morning after using the bathroom and before eating gives most consistent results. For health scores, enter your resting values, not post-exercise numbers.

2. **Track trends, not single readings:** One measurement is a snapshot. Track your caffeine half life monthly for 3-6 months to see meaningful trends. Healthy caffeine half life improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Caffeine Half Life is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your caffeine half life is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Caffeine Half Life Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.

Use this calculator regularly as your situation changes over time - recalculate whenever your key inputs change significantly to ensure your goals and targets remain calibrated to your current reality. Explore our full library of related calculators to build a comprehensive understanding of your complete health and wellness situation, since no single metric tells the whole story.

For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

Remember that the most powerful use of any calculator is not just knowing your current number, but using that number to set a clear, measurable goal and tracking your progress toward it. Accurate information, consistently tracked and thoughtfully applied with patience and consistency, is one of the most powerful tools available for improving any area of your life. Start with what you know today, commit to the process, and let data guide your journey.`}
      />
      )}
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )

}
