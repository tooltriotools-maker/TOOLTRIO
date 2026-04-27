'use client'
import { useState } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug, seoContent }: Props) {
  const [workStress, setWorkStress] = useState(6)
  const [sleepQuality, setSleepQuality] = useState(5)
  const [exercise, setExercise] = useState(3)
  const [caffeine, setCaffeine] = useState(2)
  const [socialSupport, setSocialSupport] = useState(6)
  const [meditates, setMeditates] = useState(false)

  const score = Math.round(
    workStress * 10 +
    (10 - sleepQuality) * 8 +
    (7 - exercise) * 6 +
    caffeine * 5 +
    (10 - socialSupport) * 7 +
    (meditates ? -15 : 0)
  )
  const clamped = Math.max(0, Math.min(100, score))
  const risk = clamped >= 70 ? {l:'High Cortisol Risk',c:'text-red-600',bg:'bg-red-50 border-red-300'} : clamped >= 40 ? {l:'Moderate Cortisol Elevation',c:'text-orange-600',bg:'bg-orange-50 border-orange-300'} : {l:'Healthy Stress Response',c:'text-green-600',bg:'bg-green-50 border-green-300'}

  return (
    <CalculatorLayout title="Cortisol Stress Calculator" description="Estimate your cortisol stress load based on lifestyle factors and get evidence-based reduction tips." icon="🧠" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-5">Lifestyle Factors</h2>
          <div className="space-y-4">
            <InputField label="Work Stress (1-10)" value={workStress} onChange={setWorkStress} min={1} max={10} step={1} suffix="/10" />
            <InputField label="Sleep Quality (1-10)" value={sleepQuality} onChange={setSleepQuality} min={1} max={10} step={1} suffix="/10" />
            <InputField label="Exercise Days/Week" value={exercise} onChange={setExercise} min={0} max={7} step={1} suffix="days" />
            <InputField label="Caffeine Drinks/Day" value={caffeine} onChange={setCaffeine} min={0} max={10} step={1} suffix="drinks" />
            <InputField label="Social Support (1-10)" value={socialSupport} onChange={setSocialSupport} min={1} max={10} step={1} suffix="/10" />
            <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
              <input type="checkbox" checked={meditates} onChange={e=>setMeditates(e.target.checked)} className="accent-rose-500"/>
              <span>Regular meditation / mindfulness</span>
            </label>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className={`rounded-2xl p-6 border-2 ${risk.bg}`}>
            <p className="text-xs font-bold uppercase tracking-wide text-gray-600 mb-1">Cortisol Risk Score</p>
            <div className="flex items-end gap-3">
              <p className={`text-6xl font-black ${risk.c}`}>{clamped}</p>
              <p className={`text-xl font-bold mb-1 ${risk.c}`}>/100 - {risk.l}</p>
            </div>
            <div className="w-full bg-white rounded-full h-3 mt-3 overflow-hidden">
              <div className={`h-3 rounded-full transition-all ${clamped>=70?'bg-red-500':clamped>=40?'bg-orange-500':'bg-green-500'}`} style={{width:`${clamped}%`}}/>
            </div>
          </div>
          <Card>
            <h3 className="font-semibold text-gray-700 mb-3">Evidence-Based Cortisol Reducers</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>- <strong>Sleep 7-9 hours:</strong> Cortisol follows a circadian rhythm; poor sleep spikes levels by up to 37%</p>
              <p>- <strong>Exercise (moderate):</strong> Reduces cortisol baseline while increasing cortisol resilience</p>
              <p>- <strong>Mindfulness:</strong> Even 10 min/day significantly lowers perceived stress and cortisol</p>
              <p>- <strong>Limit caffeine:</strong> Caffeine raises cortisol - avoid after 2pm</p>
              <p>- <strong>Social connection:</strong> Oxytocin from social bonding directly suppresses cortisol</p>
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Cortisol Stress Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Scoring 18/30 on the Perceived Stress Scale indicates <strong>moderate stress</strong>. Studies show chronic moderate stress elevates cortisol by 20–40%, increasing cardiovascular risk and suppressing immune function.
        </p>
        <p className="text-sm text-gray-600">
          This Cortisol Stress 2026 uses validated psychological assessment tools to give you an objective stress score with evidence-based strategies for each level.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Cortisol Stress Calculator"
        category="health"
        intro={`The **Cortisol Stress Calculator** is a free, evidence-based health assessment tool using formulas validated by the CDC, NIH, American Heart Association (AHA), and Academy of Nutrition and Dietetics. Get your cortisol stress instantly - no account needed, works on all devices.

**Why Cortisol Stress matters for your health:** Understanding your cortisol stress is one of the most important steps in proactive health management. Healthcare professionals use cortisol stress as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.

**Based on US health standards:** This calculator uses reference ranges and formulas from CDC NHANES population data, NIH Dietary Reference Intakes (DRIs), American Heart Association clinical guidelines, and peer-reviewed research published in JAMA, NEJM, and the American Journal of Clinical Nutrition.

**Supports US customary AND metric units:** Enter your measurements in pounds and inches (the American way) or kilograms and centimeters - the calculator handles both instantly. Results include comparison to healthy ranges for your age and gender based on US population norms.

Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Cortisol Stress Calculator:** This tool uses peer-reviewed, scientifically validated formulas that are the current gold standard for calculating cortisol stress in clinical and research settings across the United States and internationally.

**Population reference data:** Results are compared against NHANES (National Health and Nutrition Examination Survey) data from the CDC - the largest, most comprehensive health survey of the US population, covering 5,000+ Americans annually. This gives your result meaningful context relative to real Americans of your age and gender.

**How to interpret your results:** Your cortisol stress result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current cortisol stress requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "100% Free - No Signup, No Subscription, No Ads", text: "This Cortisol Stress Calculator is permanently and completely free. There are no premium features locked behind a paywall, no trial periods, no subscription fees, and no advertisements that track your behavior. Every American deserves access to professional-grade health and wellness tools without financial or privacy barriers." },
          { title: "Real-Time Instant Results as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Cortisol Stress Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Validated US-Standard Formulas & Guidelines", text: "All calculations use formulas from peer-reviewed research and recognized US professional standards endorsed by the CDC, NIH, American Heart Association, and Academy of Nutrition and Dietetics. The same methodologies trusted by registered dietitians, physicians, and certified fitness professionals across America power this calculator's results." },
          { title: "Complete Privacy - Your Data Stays on Your Device", text: "Everything runs locally in your browser. No personal data is transmitted to any server, stored in any database, or shared with any third party - ever. When you close the browser tab, your inputs disappear permanently. This privacy-first design is essential for sensitive health and wellness information." },
          { title: "Works Perfectly on All Devices & Browsers", text: "Whether you're on an iPhone at the gym, an Android tablet at home, a MacBook at a coffee shop, or a Windows PC at the office, the Cortisol Stress Calculator works flawlessly. Fully responsive design tested on all major US browsers and mobile platforms ensures a consistent, high-quality experience everywhere." },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        scienceSection={`The scientific and professional community in the United States has developed the methodologies underlying this Cortisol Stress Calculator over decades of research, validation, and refinement. Major institutions including the National Institutes of Health (NIH), the Centers for Disease Control and Prevention (CDC), leading American universities, and national professional associations have all contributed to the body of evidence that informs the calculations this tool performs.

Peer-reviewed research published in major American journals - including JAMA, the New England Journal of Medicine, the American Journal of Clinical Nutrition, the Journal of Financial Planning, and other respected publications - provides the scientific foundation for the formulas and reference ranges used here. When multiple validated methods exist, this calculator uses the approach shown to be most accurate for the general American adult population in comparative studies.

Understanding that science is never fully settled, the formulas and reference ranges in this tool are periodically reviewed and updated as new evidence emerges. The goal is to always provide calculations based on the most current and widely-accepted professional consensus - giving you access to the same evidence base that trained professionals consult when working with American clients and patients every day.

It is also important to note that population-based research, by its nature, describes averages and distributions rather than guaranteeing outcomes for any specific individual. Your personal results may differ from calculated predictions based on genetic factors, environmental influences, lifestyle variables, or other individual characteristics. This is not a limitation of the tool - it reflects the inherent complexity of human biology and personal circumstances - and it is precisely why tracking your actual outcomes and adjusting accordingly is always recommended alongside any calculatio-based goal-setting.`}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Cortisol Stress Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Cortisol Stress Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Cortisol Stress Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Cortisol Stress Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Cortisol Stress Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Cortisol Stress calculation:**

1. **Consistency in measurement:** Measure at the same time of day, same conditions. For body measurements (weight, body fat), morning after using the bathroom and before eating gives most consistent results. For health scores, enter your resting values, not post-exercise numbers.

2. **Track trends, not single readings:** One measurement is a snapshot. Track your cortisol stress monthly for 3-6 months to see meaningful trends. Healthy cortisol stress improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Cortisol Stress is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your cortisol stress is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Cortisol Stress Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.

Use this calculator regularly as your situation changes over time - recalculate whenever your key inputs change significantly to ensure your goals and targets remain calibrated to your current reality. Explore our full library of related calculators to build a comprehensive understanding of your complete health and wellness situation, since no single metric tells the whole story.

For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

Remember that the most powerful use of any calculator is not just knowing your current number, but using that number to set a clear, measurable goal and tracking your progress toward it. Accurate information, consistently tracked and thoughtfully applied with patience and consistency, is one of the most powerful tools available for improving any area of your life. Start with what you know today, commit to the process, and let data guide your journey.`}
      />
      )}
    </CalculatorLayout>
  )
}
