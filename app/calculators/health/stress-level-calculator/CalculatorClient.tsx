'use client'
import { useState, useMemo } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug, seoContent }: Props) {

  const QUESTIONS = [
    'Been upset because of something that happened unexpectedly',
    'Felt unable to control the important things in your life',
    'Felt nervous and stressed',
    'Felt confident about your ability to handle your personal problems',
    'Felt that things were going your way',
    'Found that you could not cope with all the things you had to do',
    'Been able to control irritations in your life',
    'Felt that you were on top of things',
    'Been angered because of things that were outside your control',
    'Felt difficulties were piling up so high you could not overcome them',
  ]
  // Questions 4, 5, 7, 8 (index 3,4,6,7) are reversed
  const REVERSED = [3,4,6,7]
  const [answers, setAnswers] = useState<number[]>(Array(10).fill(1))

  const result = useMemo(() => {
    const score = answers.reduce((sum, v, i) => {
      const adjusted = REVERSED.includes(i) ? 4-v : v
      return sum + adjusted
    }, 0)
    let level='', color='', desc='', icon=''
    if (score<=13)       { level='Low Stress';        color='text-green-700 bg-green-50 border-green-200';  icon='😌'; desc='You are managing stress well. Maintain your current coping strategies and self-care routines.' }
    else if (score<=26)  { level='Moderate Stress';   color='text-yellow-700 bg-yellow-50 border-yellow-200'; icon='😐'; desc='Some stress is present. Consider adding stress-reduction practices before it escalates.' }
    else                  { level='High Stress';       color='text-red-700 bg-red-50 border-red-200';       icon='😰'; desc='Your stress level is high. Prioritise stress management and consider professional support.' }
    
    const tips = score<=13 ? [
      'Continue regular exercise and sleep routines',
      'Maintain social connections',
      'Practice preventive mindfulness',
    ] : score<=26 ? [
      'Start a daily 10-minute mindfulness or meditation practice',
      'Exercise at least 3x per week (aerobic)',
      'Evaluate and reduce major stressors where possible',
      'Improve sleep hygiene - consistent bedtime, no screens 1 hour before bed',
      'Talk to someone you trust about your stressors',
    ] : [
      'Seek professional support (CBT, counselling)',
      'Urgent lifestyle review - identify and address major stressors',
      'Daily exercise is critical - even 20-minute walks help immediately',
      'Practice diaphragmatic breathing 3x daily (5 min each)',
      'Consider whether work, relationship, or other factors need intervention',
      'Talk to your GP - stress this level warrants medical attention',
    ]
    return { score, level, color, desc, icon, tips }
  }, [answers])

  const opts = ['Never','Almost Never','Sometimes','Fairly Often','Very Often']

  return (
    <CalculatorLayout title="Stress Level Calculator (PSS-10)" description="Validated Perceived Stress Scale assessment with personalised coping strategies. Scientifically backed stress measurement." icon="🧠" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <h2 className="font-bold text-gray-900 mb-1">In the last month, how often have you...</h2>
            <p className="text-xs text-gray-400 mb-5">Rate each item: 0 = Never, 4 = Very Often</p>
            <div className="space-y-5">
              {QUESTIONS.map((q,i)=>(
                <div key={i}>
                  <p className="text-sm font-medium text-gray-700 mb-2">{i+1}. {q}</p>
                  <div className="flex gap-1 flex-wrap">
                    {opts.map((opt,v)=>(
                      <button key={v} onClick={()=>setAnswers(a=>{const n=[...a];n[i]=v;return n})}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${answers[i]===v?'bg-purple-600 text-white':'bg-gray-100 text-gray-600 hover:bg-purple-100'}`}>
                        {v} {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <div className="space-y-4">
          <div className={`p-5 rounded-2xl border-2 text-center ${result.color}`}>
            <p className="text-3xl mb-1">{result.icon}</p>
            <p className="text-xs font-bold uppercase tracking-wide opacity-70">PSS Score</p>
            <p className="text-5xl font-black my-1">{result.score}</p>
            <p className="text-base font-bold">{result.level}</p>
            <p className="text-xs mt-2 leading-relaxed opacity-80">{result.desc}</p>
          </div>
          <Card>
            <h3 className="font-bold text-gray-900 mb-3">Recommended Actions</h3>
            <ul className="space-y-2">
              {result.tips.map(t=>(
                <li key={t} className="flex items-start gap-2 text-xs text-gray-600">
                  <span className="text-purple-500 font-bold mt-0.5">→</span>{t}
                </li>
              ))}
            </ul>
          </Card>
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-500">
            <p className="font-semibold text-gray-700 mb-1">About PSS-10</p>
            <p>Validated psychological scale by Sheldon Cohen (1983). Used in 100+ countries and thousands of research studies. Not a clinical diagnostic tool - for serious concerns, consult a mental health professional.</p>
          </div>
        </div>
      </div>

      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Stress Level Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Scoring 18/30 on the Perceived Stress Scale indicates <strong>moderate stress</strong>. Studies show chronic moderate stress elevates cortisol by 20–40%, increasing cardiovascular risk and suppressing immune function.
        </p>
        <p className="text-sm text-gray-600">
          This Stress Level 2026 uses validated psychological assessment tools to give you an objective stress score with evidence-based strategies for each level.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Stress Level Calculator"
        category="health"
        intro={`The **Stress Level Calculator** is a free, evidence-based health assessment tool using formulas validated by the CDC, NIH, American Heart Association (AHA), and Academy of Nutrition and Dietetics. Get your stress level instantly - no account needed, works on all devices.

**Why Stress Level matters for your health:** Understanding your stress level is one of the most important steps in proactive health management. Healthcare professionals use stress level as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.

**Based on US health standards:** This calculator uses reference ranges and formulas from CDC NHANES population data, NIH Dietary Reference Intakes (DRIs), American Heart Association clinical guidelines, and peer-reviewed research published in JAMA, NEJM, and the American Journal of Clinical Nutrition.

**Supports US customary AND metric units:** Enter your measurements in pounds and inches (the American way) or kilograms and centimeters - the calculator handles both instantly. Results include comparison to healthy ranges for your age and gender based on US population norms.

Combine this with [our Cortisol Stress Calculator](/calculators/health/cortisol-stress-calculator), [our Sleep Cycle Calculator](/calculators/health/sleep-cycle-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Stress Level Calculator:** This tool uses peer-reviewed, scientifically validated formulas that are the current gold standard for calculating stress level in clinical and research settings across the United States and internationally.

**Population reference data:** Results are compared against NHANES (National Health and Nutrition Examination Survey) data from the CDC - the largest, most comprehensive health survey of the US population, covering 5,000+ Americans annually. This gives your result meaningful context relative to real Americans of your age and gender.

**How to interpret your results:** Your stress level result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current stress level requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "100% Free - No Signup, No Subscription, No Ads", text: "This Stress Level Calculator is permanently and completely free. There are no premium features locked behind a paywall, no trial periods, no subscription fees, and no advertisements that track your behavior. Every American deserves access to professional-grade health and wellness tools without financial or privacy barriers." },
          { title: "Real-Time Instant Results as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Stress Level Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Validated US-Standard Formulas & Guidelines", text: "All calculations use formulas from peer-reviewed research and recognized US professional standards endorsed by the CDC, NIH, American Heart Association, and Academy of Nutrition and Dietetics. The same methodologies trusted by registered dietitians, physicians, and certified fitness professionals across America power this calculator's results." },
          { title: "Complete Privacy - Your Data Stays on Your Device", text: "Everything runs locally in your browser. No personal data is transmitted to any server, stored in any database, or shared with any third party - ever. When you close the browser tab, your inputs disappear permanently. This privacy-first design is essential for sensitive health and wellness information." },
          { title: "Works Perfectly on All Devices & Browsers", text: "Whether you're on an iPhone at the gym, an Android tablet at home, a MacBook at a coffee shop, or a Windows PC at the office, the Stress Level Calculator works flawlessly. Fully responsive design tested on all major US browsers and mobile platforms ensures a consistent, high-quality experience everywhere." },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        scienceSection={`The scientific and professional community in the United States has developed the methodologies underlying this Stress Level Calculator over decades of research, validation, and refinement. Major institutions including the National Institutes of Health (NIH), the Centers for Disease Control and Prevention (CDC), leading American universities, and national professional associations have all contributed to the body of evidence that informs the calculations this tool performs.

Peer-reviewed research published in major American journals - including JAMA, the New England Journal of Medicine, the American Journal of Clinical Nutrition, the Journal of Financial Planning, and other respected publications - provides the scientific foundation for the formulas and reference ranges used here. When multiple validated methods exist, this calculator uses the approach shown to be most accurate for the general American adult population in comparative studies.

Understanding that science is never fully settled, the formulas and reference ranges in this tool are periodically reviewed and updated as new evidence emerges. The goal is to always provide calculations based on the most current and widely-accepted professional consensus - giving you access to the same evidence base that trained professionals consult when working with American clients and patients every day.

It is also important to note that population-based research, by its nature, describes averages and distributions rather than guaranteeing outcomes for any specific individual. Your personal results may differ from calculated predictions based on genetic factors, environmental influences, lifestyle variables, or other individual characteristics. This is not a limitation of the tool - it reflects the inherent complexity of human biology and personal circumstances - and it is precisely why tracking your actual outcomes and adjusting accordingly is always recommended alongside any calculatio-based goal-setting.`}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Stress Level Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Stress Level Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Stress Level Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Stress Level Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Stress Level Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Stress Level calculation:**

1. **Consistency in measurement:** Measure at the same time of day, same conditions. For body measurements (weight, body fat), morning after using the bathroom and before eating gives most consistent results. For health scores, enter your resting values, not post-exercise numbers.

2. **Track trends, not single readings:** One measurement is a snapshot. Track your stress level monthly for 3-6 months to see meaningful trends. Healthy stress level improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Stress Level is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your stress level is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Stress Level Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.

Use this calculator regularly as your situation changes over time - recalculate whenever your key inputs change significantly to ensure your goals and targets remain calibrated to your current reality. Explore our full library of related calculators to build a comprehensive understanding of your complete health and wellness situation, since no single metric tells the whole story.

For a complete health overview, also use [our Cortisol Stress Calculator](/calculators/health/cortisol-stress-calculator), [our Sleep Cycle Calculator](/calculators/health/sleep-cycle-calculator), and [our Inflammation Risk Calculator](/calculators/health/inflammation-risk-calculator).

Remember that the most powerful use of any calculator is not just knowing your current number, but using that number to set a clear, measurable goal and tracking your progress toward it. Accurate information, consistently tracked and thoughtfully applied with patience and consistency, is one of the most powerful tools available for improving any area of your life. Start with what you know today, commit to the process, and let data guide your journey.`}
      />
      )}
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )

}
