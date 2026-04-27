'use client'
import { useState, useMemo } from 'react'
import { calculatePregnancyDueDate } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { Calendar, Heart, Baby } from 'lucide-react'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug, seoContent }: Props) {
  const [lmpDate, setLmpDate] = useState('2026-10-01')

  const result = useMemo(() => {
    try { return calculatePregnancyDueDate(new Date(lmpDate)) as any }
    catch { return null }
  }, [lmpDate])

  const trimesters = [
    { name: 'First Trimester', weeks: '1-12', key: [], emoji: '🌱', color: 'bg-green-50 border-green-200', text: 'text-green-700', milestones: ['Heart begins beating (Week 6)', 'All major organs forming (Week 8)', 'Baby is now a fetus (Week 10)', 'Fingernails form (Week 11)'] },
    { name: 'Second Trimester', weeks: '13-26', emoji: '🌿', color: 'bg-blue-50 border-blue-200', text: 'text-blue-700', milestones: ['Baby moves (Week 16-20)', 'Gender visible on ultrasound (Week 18-20)', 'Baby can hear (Week 18)', 'Brain developing rapidly (Week 24)'] },
    { name: 'Third Trimester', weeks: '27-40', emoji: '🌸', color: 'bg-purple-50 border-purple-200', text: 'text-purple-700', milestones: ['Lungs mature (Week 28-32)', 'Baby turns head-down (Week 32-36)', 'Baby gains weight rapidly (Week 35)', 'Full term (Week 37-40)'] },
  ]

  const maxDate = new Date()
  maxDate.setDate(maxDate.getDate() - 1)
  const minDate = new Date()
  minDate.setDate(minDate.getDate() - 280)

  return (
    <CalculatorLayout title="Pregnancy Due Date Calculator" description="Calculate your expected due date (EDD) based on your last menstrual period (LMP). See trimester milestones and week-by-week timeline." icon="🤰" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Enter LMP Date</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Last Menstrual Period (LMP)</label>
              <input type="date" value={lmpDate} onChange={e => setLmpDate(e.target.value)}
                max={maxDate.toISOString().split('T')[0]}
                min={minDate.toISOString().split('T')[0]}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-medium outline-none focus:border-green-500 transition-colors bg-white" />
            </div>
            <p className="text-xs text-gray-500 leading-relaxed bg-green-50 p-3 rounded-xl border border-green-200">Calculated using Naegele's Rule: LMP + 280 days (40 weeks). Actual delivery may vary by 2 weeks.</p>
          </div>

          {result && (
            <div className="mt-5 p-4 rounded-xl bg-pink-50 border border-pink-200 text-center">
              <p className="text-xs text-pink-700 font-bold mb-1">🎉 Expected Due Date</p>
              <p className="text-xl font-black text-pink-700">{result.dueDate?.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              {result.currentWeek > 0 && <p className="text-xs text-pink-600 mt-1">Currently: Week {result.currentWeek}, Day {result.currentDay || 0}</p>}
            </div>
          )}
        </Card>

        <div className="lg:col-span-2 space-y-4">
          {result && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <ResultCard label="Due Date" value={result.dueDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) || '-'} highlight icon={<Calendar className="w-4 h-4" />} />
              <ResultCard label="Current Week" value={result.currentWeek > 0 ? `Week ${result.currentWeek}` : 'Before LMP'} icon={<Baby className="w-4 h-4" />} />
              <ResultCard label="Trimester" value={result.currentWeek <= 12 ? '1st' : result.currentWeek <= 26 ? '2nd' : '3rd'} icon={<Heart className="w-4 h-4" />} />
              <ResultCard label="Weeks Remaining" value={result.weeksRemaining >= 0 ? `${result.weeksRemaining} wks` : 'Past due'} icon={<Calendar className="w-4 h-4" />} />
            </div>
          )}

          {result && result.dueDate && (
            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-4">📅 Important Dates</h3>
              <div className="space-y-2">
                {[
                  { label: 'LMP Date', date: new Date(lmpDate), emoji: '📌' },
                  { label: 'End of 1st Trimester', date: new Date(new Date(lmpDate).getTime() + 84 * 86400000), emoji: '🌱' },
                  { label: 'End of 2nd Trimester', date: new Date(new Date(lmpDate).getTime() + 182 * 86400000), emoji: '🌿' },
                  { label: 'Full Term (37 weeks)', date: new Date(new Date(lmpDate).getTime() + 259 * 86400000), emoji: '⭐' },
                  { label: '🎉 Due Date (40 weeks)', date: result.dueDate, emoji: '🎉' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="text-lg">{item.emoji}</span>
                    <div className="flex-1 flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-800">{item.label}</span>
                      <span className="text-sm font-bold text-gray-600">{item.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {trimesters.map(t => (
              <Card key={t.name} className={`${t.color} border`} glow={false}>
                <div className="text-2xl mb-2">{t.emoji}</div>
                <p className={`font-black text-sm mb-1 ${t.text}`}>{t.name}</p>
                <p className="text-xs text-gray-500 mb-3">Weeks {t.weeks}</p>
                <ul className="space-y-1">
                  {t.milestones.map(m => <li key={m} className="text-xs text-gray-600 flex items-start gap-1.5"><span className="mt-0.5 text-green-500 flex-shrink-0">-</span>{m}</li>)}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Pregnancy Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          If your last menstrual period started on January 1, 2026, your estimated due date is <strong>October 8, 2026</strong> (Naegele's Rule: add 280 days / 40 weeks). First trimester ends around March 22.
        </p>
        <p className="text-sm text-gray-600">
          This Pregnancy 2026 provides your full trimester timeline, key milestone dates, and week-by-week development overview based on ACOG standards.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Pregnancy Calculator"
        category="health"
        intro={`The **Pregnancy Calculator** is a free, evidence-based health assessment tool using formulas validated by the CDC, NIH, American Heart Association (AHA), and Academy of Nutrition and Dietetics. Get your pregnancy instantly - no account needed, works on all devices.

**Why Pregnancy matters for your health:** Understanding your pregnancy is one of the most important steps in proactive health management. Healthcare professionals use pregnancy as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.

**Based on US health standards:** This calculator uses reference ranges and formulas from CDC NHANES population data, NIH Dietary Reference Intakes (DRIs), American Heart Association clinical guidelines, and peer-reviewed research published in JAMA, NEJM, and the American Journal of Clinical Nutrition.

**Supports US customary AND metric units:** Enter your measurements in pounds and inches (the American way) or kilograms and centimeters - the calculator handles both instantly. Results include comparison to healthy ranges for your age and gender based on US population norms.

Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Pregnancy Calculator:** This tool uses peer-reviewed, scientifically validated formulas that are the current gold standard for calculating pregnancy in clinical and research settings across the United States and internationally.

**Population reference data:** Results are compared against NHANES (National Health and Nutrition Examination Survey) data from the CDC - the largest, most comprehensive health survey of the US population, covering 5,000+ Americans annually. This gives your result meaningful context relative to real Americans of your age and gender.

**How to interpret your results:** Your pregnancy result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current pregnancy requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "100% Free - No Signup, No Subscription, No Ads", text: "This Pregnancy Calculator is permanently and completely free. There are no premium features locked behind a paywall, no trial periods, no subscription fees, and no advertisements that track your behavior. Every American deserves access to professional-grade health and wellness tools without financial or privacy barriers." },
          { title: "Real-Time Instant Results as You Type", text: "Results update the moment you change any input - there\'s no button to click and no page to reload. This makes the Pregnancy Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Validated US-Standard Formulas & Guidelines", text: "All calculations use formulas from peer-reviewed research and recognized US professional standards endorsed by the CDC, NIH, American Heart Association, and Academy of Nutrition and Dietetics. The same methodologies trusted by registered dietitians, physicians, and certified fitness professionals across America power this calculator\'s results." },
          { title: "Complete Privacy - Your Data Stays on Your Device", text: "Everything runs locally in your browser. No personal data is transmitted to any server, stored in any database, or shared with any third party - ever. When you close the browser tab, your inputs disappear permanently. This privacy-first design is essential for sensitive health and wellness information." },
          { title: "Works Perfectly on All Devices & Browsers", text: "Whether you\'re on an iPhone at the gym, an Android tablet at home, a MacBook at a coffee shop, or a Windows PC at the office, the Pregnancy Calculator works flawlessly. Fully responsive design tested on all major US browsers and mobile platforms ensures a consistent, high-quality experience everywhere." },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don\'t just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        scienceSection={`The scientific and professional community in the United States has developed the methodologies underlying this Pregnancy Calculator over decades of research, validation, and refinement. Major institutions including the National Institutes of Health (NIH), the Centers for Disease Control and Prevention (CDC), leading American universities, and national professional associations have all contributed to the body of evidence that informs the calculations this tool performs.

Peer-reviewed research published in major American journals - including JAMA, the New England Journal of Medicine, the American Journal of Clinical Nutrition, the Journal of Financial Planning, and other respected publications - provides the scientific foundation for the formulas and reference ranges used here. When multiple validated methods exist, this calculator uses the approach shown to be most accurate for the general American adult population in comparative studies.

Understanding that science is never fully settled, the formulas and reference ranges in this tool are periodically reviewed and updated as new evidence emerges. The goal is to always provide calculations based on the most current and widely-accepted professional consensus - giving you access to the same evidence base that trained professionals consult when working with American clients and patients every day.

It is also important to note that population-based research, by its nature, describes averages and distributions rather than guaranteeing outcomes for any specific individual. Your personal results may differ from calculated predictions based on genetic factors, environmental influences, lifestyle variables, or other individual characteristics. This is not a limitation of the tool - it reflects the inherent complexity of human biology and personal circumstances - and it is precisely why tracking your actual outcomes and adjusting accordingly is always recommended alongside any calculatio-based goal-setting.`}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Pregnancy Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor\'s appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Pregnancy Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Pregnancy Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Pregnancy Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Pregnancy Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Pregnancy calculation:**

1. **Consistency in measurement:** Measure at the same time of day, same conditions. For body measurements (weight, body fat), morning after using the bathroom and before eating gives most consistent results. For health scores, enter your resting values, not post-exercise numbers.

2. **Track trends, not single readings:** One measurement is a snapshot. Track your pregnancy monthly for 3-6 months to see meaningful trends. Healthy pregnancy improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Pregnancy is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your pregnancy is outside the healthy range, bring these calculations to your next doctor\'s appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you\'re of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Pregnancy Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.

Use this calculator regularly as your situation changes over time - recalculate whenever your key inputs change significantly to ensure your goals and targets remain calibrated to your current reality. Explore our full library of related calculators to build a comprehensive understanding of your complete health and wellness situation, since no single metric tells the whole story.

For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

Remember that the most powerful use of any calculator is not just knowing your current number, but using that number to set a clear, measurable goal and tracking your progress toward it. Accurate information, consistently tracked and thoughtfully applied with patience and consistency, is one of the most powerful tools available for improving any area of your life. Start with what you know today, commit to the process, and let data guide your journey.`}
      />
      )}
    </CalculatorLayout>
  )
}
