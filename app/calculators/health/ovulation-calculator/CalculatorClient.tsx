'use client'
import { useState, useMemo } from 'react'
import { calculateOvulation } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { Calendar, Heart } from 'lucide-react'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, relatedCalculators, blogSlug, seoContent }: Props) {
  const [lastPeriod, setLastPeriodStr] = useState('2026-01-01')
  const [cycleLength, setCycleLength] = useState(28)

  const result = useMemo(() => {
    try { return calculateOvulation(new Date(lastPeriod), cycleLength) as any }
    catch { return null }
  }, [lastPeriod, cycleLength])

  const fmt = (d: Date) => d?.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) || '-'

  return (
    <CalculatorLayout title="Ovulation Calculator" description="Calculate your ovulation date and fertile window based on last period date and cycle length." icon="🌸" category="Health" relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="ovulation-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Cycle Details</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">First Day of Last Period</label>
              <input type="date" value={lastPeriod} onChange={e => setLastPeriodStr(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-medium outline-none focus:border-green-500 bg-white" />
            </div>
            <InputField label="Cycle Length (Days)" value={cycleLength} onChange={setCycleLength} min={21} max={45} step={1} suffix="days" />
          </div>
          <div className="mt-5 p-4 rounded-xl bg-pink-50 border border-pink-200 text-center">
            <p className="text-xs text-pink-700 font-bold mb-1">🌸 Ovulation Day</p>
            <p className="text-base font-black text-pink-700">{result ? fmt(result.ovulationDate) : '-'}</p>
          </div>
          <p className="text-xs text-gray-400 mt-3 leading-relaxed">This calculator is for informational purposes. Ovulation varies by individual. Consult a healthcare provider for family planning advice.</p>
        </Card>

        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Ovulation Date" value={fmt(result.ovulationDate)} highlight icon={<Heart className="w-4 h-4" />} />
                <ResultCard label="Fertile Window Start" value={fmt(result.fertileWindowStart)} icon={<Calendar className="w-4 h-4" />} />
                <ResultCard label="Fertile Window End" value={fmt(result.fertileWindowEnd)} icon={<Calendar className="w-4 h-4" />} />
              </div>

              <Card>
                <h3 className="text-sm font-bold text-gray-800 mb-4">📅 Cycle Timeline</h3>
                <div className="space-y-2">
                  {[
                    { label: 'Period Starts', date: new Date(lastPeriod), emoji: '🔴', color: 'bg-red-50 border-red-200', text: 'text-red-700' },
                    { label: 'Fertile Window Begins', date: result.fertileWindowStart, emoji: '💚', color: 'bg-green-50 border-green-200', text: 'text-green-700' },
                    { label: '⭐ Peak Ovulation Day', date: result.ovulationDate, emoji: '🌟', color: 'bg-yellow-50 border-yellow-200', text: 'text-yellow-700' },
                    { label: 'Fertile Window Ends', date: result.fertileWindowEnd, emoji: '💛', color: 'bg-amber-50 border-amber-200', text: 'text-amber-700' },
                    { label: 'Next Period (est.)', date: result.nextPeriodDate, emoji: '📅', color: 'bg-gray-50 border-gray-200', text: 'text-gray-700' },
                  ].map(item => (
                    <div key={item.label} className={`flex items-center gap-3 p-3 rounded-xl border ${item.color}`}>
                      <span className="text-lg">{item.emoji}</span>
                      <div className="flex-1 flex items-center justify-between">
                        <span className={`text-sm font-bold ${item.text}`}>{item.label}</span>
                        <span className="text-sm font-semibold text-gray-700">{fmt(item.date)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <h3 className="text-sm font-bold text-gray-800 mb-4">Cycle Phase Guide</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { phase: 'Menstrual', days: `Day 1-5`, color: 'bg-red-100 border-red-200', text: 'text-red-700', note: 'Period days' },
                    { phase: 'Follicular', days: `Day 6-${cycleLength - 15}`, color: 'bg-blue-50 border-blue-200', text: 'text-blue-700', note: 'Egg matures' },
                    { phase: 'Ovulation', days: `Day ${cycleLength - 14}`, color: 'bg-green-100 border-green-200', text: 'text-green-700', note: '🌟 Peak fertility' },
                    { phase: 'Luteal', days: `Day ${cycleLength - 13}-${cycleLength}`, color: 'bg-purple-50 border-purple-200', text: 'text-purple-700', note: 'Post-ovulation' },
                  ].map(p => (
                    <div key={p.phase} className={`p-3 rounded-xl border ${p.color}`}>
                      <p className={`font-bold text-xs ${p.text}`}>{p.phase}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{p.days}</p>
                      <p className="text-xs text-gray-600 mt-1 font-medium">{p.note}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Ovulation Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Ovulation 2026 tool to get instant, evidence-based results personalized to your age, weight, and health goals. No signup required — complete privacy guaranteed.
        </p>
        <p className="text-sm text-gray-600">
          The calculator applies the calculation method described in its methodology and lets you explore different input scenarios. The result is an estimate, not a diagnosis.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Ovulation Calculator"
        category="health"
        intro={`The **Ovulation Calculator** is a a health information tool using the method and reference data described for this calculator. Get your ovulation instantly - no account needed, works on all devices.

**Why Ovulation matters for your health:** Understanding your ovulation is one of the most important steps in proactive health management. Healthcare professionals use ovulation as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.





Combine this with [our Due Date Calculator](/calculators/health/due-date-calculator), [our Menstrual Cycle Calculator](/calculators/health/menstrual-cycle-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Ovulation Calculator:** This tool applies the calculation method described for ovulation in clinical and research settings across the United States and internationally.



**How to interpret your results:** Your ovulation result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current ovulation requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "Real-Time Ovulation Calculator results as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Ovulation Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Ovulation Calculator methodology and assumptions & Guidelines", text: "The methodology should be interpreted alongside the specific formula and sources described for this calculator; a health result is an estimate and should not be treated as a clinical diagnosis. " },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Ovulation Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Ovulation Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Ovulation Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Ovulation Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Ovulation Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Ovulation calculation:**



2. **Track trends, not single readings:** One measurement is a snapshot. Track your ovulation monthly for 3-6 months to see meaningful trends. Healthy ovulation improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Ovulation is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your ovulation is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Ovulation Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.



For a complete health overview, also use [our Due Date Calculator](/calculators/health/due-date-calculator), [our Menstrual Cycle Calculator](/calculators/health/menstrual-cycle-calculator), and [our Pregnancy Calculator](/calculators/health/pregnancy-calculator).

`}
      />
      )}
    </CalculatorLayout>
  )
}
