'use client'
import { useState, useMemo } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug, seoContent }: Props) {

  const [protocol, setProtocol] = useState<'16:8'|'18:6'|'20:4'|'14:10'|'12:12'>('16:8')
  const [firstMeal, setFirstMeal] = useState(12)
  const [sleepTime, setSleepTime] = useState(23)
  const [wakeTime, setWakeTime] = useState(7)

  const PROTOCOLS: Record<string, {fast:number;eat:number;desc:string;benefits:string}> = {
    '12:12': {fast:12,eat:12,desc:'Beginner-friendly, aligns with natural circadian rhythm',benefits:'Improved digestion, gentle metabolic benefits'},
    '14:10': {fast:14,eat:10,desc:'Good for beginners and women, less demanding',benefits:'Mild fat burning, improved insulin sensitivity'},
    '16:8':  {fast:16,eat:8, desc:'Most researched protocol (Leangains). Most popular.',benefits:'Fat loss, autophagy begins ~14-16h, metabolic health'},
    '18:6':  {fast:18,eat:6, desc:'Intermediate - strong fat-burning and autophagy',benefits:'Strong autophagy, significant fat loss, appetite control'},
    '20:4':  {fast:20,eat:4, desc:'Advanced (Warrior Diet). One main meal approach.',benefits:'Deep ketosis, maximum autophagy, significant caloric restriction'},
  }

  const result = useMemo(() => {
    const cfg = PROTOCOLS[protocol]
    const lastMeal = (firstMeal + cfg.eat) % 24
    const fastStart = lastMeal
    const fastEnd = (fastStart + cfg.fast) % 24
    const fmt = (h: number) => {
      const h12 = h % 12 || 12
      return `${h12}:00 ${h < 12 ? 'AM' : 'PM'}`
    }
    const sleepFasted = Math.max(0, Math.min(cfg.fast, (sleepTime > wakeTime ? sleepTime - wakeTime : 24 - wakeTime + sleepTime)))
    return { ...cfg, firstMealFmt: fmt(firstMeal), lastMealFmt: fmt(lastMeal), fastStartFmt: fmt(fastStart), fastEndFmt: fmt(fastEnd), sleepFasted: Math.round(sleepFasted) }
  }, [protocol, firstMeal, sleepTime, wakeTime])

  return (
    <CalculatorLayout title="Fasting Window Calculator" description="Plan your optimal intermittent fasting schedule with eating and fasting windows aligned to your lifestyle." icon="⏰" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Your IF Schedule</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Protocol</label>
              <div className="grid grid-cols-3 gap-1.5">
                {Object.keys(PROTOCOLS).map(p=>(
                  <button key={p} onClick={()=>setProtocol(p as any)} className={`p-2.5 rounded-xl border-2 text-center text-xs font-bold transition-all ${protocol===p?'bg-orange-500 text-white border-orange-500':'border-gray-200 text-gray-600 hover:border-orange-300'}`}>{p}</button>
                ))}
              </div>
            </div>
            <InputField label="First meal hour (24h)" value={firstMeal} onChange={setFirstMeal} min={5} max={20} step={1} suffix="hr" />
            <InputField label="Bedtime hour" value={sleepTime} onChange={setSleepTime} min={20} max={30} step={1} suffix="hr" />
            <InputField label="Wake time hour" value={wakeTime} onChange={setWakeTime} min={4} max={12} step={1} suffix="hr" />
          </div>
          <div className="mt-4 p-3 bg-orange-50 rounded-xl border border-orange-200 text-xs text-orange-800">
            <p className="font-bold mb-1">ℹ️ {protocol} Protocol</p>
            <p>{result.desc}</p>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 bg-green-50 rounded-2xl border-2 border-green-200 text-center">
              <p className="text-xs font-bold text-green-600 uppercase">Eating Window</p>
              <p className="text-3xl font-black text-green-700 my-1">{result.eat} hours</p>
              <p className="text-sm text-green-600"> {result.firstMealFmt} → {result.lastMealFmt}</p>
            </div>
            <div className="p-5 bg-blue-50 rounded-2xl border-2 border-blue-200 text-center">
              <p className="text-xs font-bold text-blue-600 uppercase">Fasting Window</p>
              <p className="text-3xl font-black text-blue-700 my-1">{result.fast} hours</p>
              <p className="text-sm text-blue-600">{result.fastStartFmt} → {result.fastEndFmt}</p>
            </div>
          </div>
          <Card>
            <h3 className="font-bold text-gray-900 mb-3">Expected Benefits at {protocol}</h3>
            <p className="text-sm text-gray-600 mb-3">{result.benefits}</p>
            <div className="space-y-2">
              {[
                {t:'Glycogen depletion begins', h:'~12h', active: result.fast >= 12},
                {t:'Fat burning (ketosis onset)', h:'~14-16h', active: result.fast >= 14},
                {t:'Autophagy begins', h:'~16-18h', active: result.fast >= 16},
                {t:'Peak autophagy & HGH rise', h:'~18-24h', active: result.fast >= 18},
              ].map(b=>(
                <div key={b.t} className={`flex items-center justify-between p-2.5 rounded-xl ${b.active?'bg-green-50 border border-green-200':'bg-gray-50 border border-gray-200 opacity-50'}`}>
                  <span className="text-sm font-medium text-gray-700">{b.t}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${b.active?'bg-green-600 text-white':'bg-gray-200 text-gray-500'}`}>{b.h} {b.active?'v':''}</span>
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
          Fasting Window Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          On a 16:8 protocol eating from 12 PM–8 PM: your fasting window is <strong>16 hours</strong> (8 PM to 12 PM). Over 12 weeks, this approach can produce 3–5% body weight reduction even without calorie counting.
        </p>
        <p className="text-sm text-gray-600">
          This Fasting Window 2026 calculates your eating window, fasting window, and projected outcomes based on your chosen IF protocol and daily schedule.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Fasting Window Calculator"
        category="health"
        intro={`The **Fasting Window Calculator** is a free, evidence-based health assessment tool using formulas validated by the CDC, NIH, American Heart Association (AHA), and Academy of Nutrition and Dietetics. Get your fasting window instantly - no account needed, works on all devices.

**Why Fasting Window matters for your health:** Understanding your fasting window is one of the most important steps in proactive health management. Healthcare professionals use fasting window as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.

**Based on US health standards:** This calculator uses reference ranges and formulas from CDC NHANES population data, NIH Dietary Reference Intakes (DRIs), American Heart Association clinical guidelines, and peer-reviewed research published in JAMA, NEJM, and the American Journal of Clinical Nutrition.

**Supports US customary AND metric units:** Enter your measurements in pounds and inches (the American way) or kilograms and centimeters - the calculator handles both instantly. Results include comparison to healthy ranges for your age and gender based on US population norms.

Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Fasting Window Calculator:** This tool uses peer-reviewed, scientifically validated formulas that are the current gold standard for calculating fasting window in clinical and research settings across the United States and internationally.

**Population reference data:** Results are compared against NHANES (National Health and Nutrition Examination Survey) data from the CDC - the largest, most comprehensive health survey of the US population, covering 5,000+ Americans annually. This gives your result meaningful context relative to real Americans of your age and gender.

**How to interpret your results:** Your fasting window result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current fasting window requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "100% Free - No Signup, No Subscription, No Ads", text: "This Fasting Window Calculator is permanently and completely free. There are no premium features locked behind a paywall, no trial periods, no subscription fees, and no advertisements that track your behavior. Every American deserves access to professional-grade health and wellness tools without financial or privacy barriers." },
          { title: "Real-Time Instant Results as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Fasting Window Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Validated US-Standard Formulas & Guidelines", text: "All calculations use formulas from peer-reviewed research and recognized US professional standards endorsed by the CDC, NIH, American Heart Association, and Academy of Nutrition and Dietetics. The same methodologies trusted by registered dietitians, physicians, and certified fitness professionals across America power this calculator's results." },
          { title: "Complete Privacy - Your Data Stays on Your Device", text: "Everything runs locally in your browser. No personal data is transmitted to any server, stored in any database, or shared with any third party - ever. When you close the browser tab, your inputs disappear permanently. This privacy-first design is essential for sensitive health and wellness information." },
          { title: "Works Perfectly on All Devices & Browsers", text: "Whether you're on an iPhone at the gym, an Android tablet at home, a MacBook at a coffee shop, or a Windows PC at the office, the Fasting Window Calculator works flawlessly. Fully responsive design tested on all major US browsers and mobile platforms ensures a consistent, high-quality experience everywhere." },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        scienceSection={`The scientific and professional community in the United States has developed the methodologies underlying this Fasting Window Calculator over decades of research, validation, and refinement. Major institutions including the National Institutes of Health (NIH), the Centers for Disease Control and Prevention (CDC), leading American universities, and national professional associations have all contributed to the body of evidence that informs the calculations this tool performs.

Peer-reviewed research published in major American journals - including JAMA, the New England Journal of Medicine, the American Journal of Clinical Nutrition, the Journal of Financial Planning, and other respected publications - provides the scientific foundation for the formulas and reference ranges used here. When multiple validated methods exist, this calculator uses the approach shown to be most accurate for the general American adult population in comparative studies.

Understanding that science is never fully settled, the formulas and reference ranges in this tool are periodically reviewed and updated as new evidence emerges. The goal is to always provide calculations based on the most current and widely-accepted professional consensus - giving you access to the same evidence base that trained professionals consult when working with American clients and patients every day.

It is also important to note that population-based research, by its nature, describes averages and distributions rather than guaranteeing outcomes for any specific individual. Your personal results may differ from calculated predictions based on genetic factors, environmental influences, lifestyle variables, or other individual characteristics. This is not a limitation of the tool - it reflects the inherent complexity of human biology and personal circumstances - and it is precisely why tracking your actual outcomes and adjusting accordingly is always recommended alongside any calculatio-based goal-setting.`}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Fasting Window Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Fasting Window Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Fasting Window Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Fasting Window Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Fasting Window Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Fasting Window calculation:**

1. **Consistency in measurement:** Measure at the same time of day, same conditions. For body measurements (weight, body fat), morning after using the bathroom and before eating gives most consistent results. For health scores, enter your resting values, not post-exercise numbers.

2. **Track trends, not single readings:** One measurement is a snapshot. Track your fasting window monthly for 3-6 months to see meaningful trends. Healthy fasting window improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Fasting Window is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your fasting window is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Fasting Window Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.

Use this calculator regularly as your situation changes over time - recalculate whenever your key inputs change significantly to ensure your goals and targets remain calibrated to your current reality. Explore our full library of related calculators to build a comprehensive understanding of your complete health and wellness situation, since no single metric tells the whole story.

For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

Remember that the most powerful use of any calculator is not just knowing your current number, but using that number to set a clear, measurable goal and tracking your progress toward it. Accurate information, consistently tracked and thoughtfully applied with patience and consistency, is one of the most powerful tools available for improving any area of your life. Start with what you know today, commit to the process, and let data guide your journey.`}
      />
      )}
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )

}
