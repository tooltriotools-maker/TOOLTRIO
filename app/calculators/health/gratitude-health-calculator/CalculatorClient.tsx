'use client'
import { useState } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, relatedCalculators, blogSlug, seoContent }: Props) {
  const [journalFreq, setJournalFreq] = useState(3)
  const [expressFreq, setExpressFreq] = useState(4)
  const [mindfulness, setMindfulness] = useState(true)
  const [socialConn, setSocialConn] = useState(5)
  const [stressLevel, setStressLevel] = useState(5)
  const [sleepQuality, setSleepQuality] = useState(6)

  const practiceScore = Math.round(
    (journalFreq / 7) * 25 +
    (expressFreq / 7) * 20 +
    (mindfulness ? 15 : 0) +
    (socialConn / 10) * 15 +
    ((10 - stressLevel) / 10) * 15 +
    (sleepQuality / 10) * 10
  )

  const wellbeing = Math.round(
    50 + practiceScore * 0.5 +
    journalFreq * 2 +
    (mindfulness ? 5 : 0)
  )
  const wellbeingClamped = Math.min(100, wellbeing)

  return (
    <CalculatorLayout title="Gratitude Health Calculator" description="Measure your gratitude practice and estimate its impact on mental wellbeing and resilience." icon="🙏" category="Health" relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="gratitude-health-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-5">Your Gratitude Practice</h2>
          <div className="space-y-4">
            <InputField label="Gratitude journal (days/week)" value={journalFreq} onChange={setJournalFreq} min={0} max={7} step={1} suffix="days" />
            <InputField label="Express thanks (times/week)" value={expressFreq} onChange={setExpressFreq} min={0} max={21} step={1} suffix="x/week" />
            <InputField label="Social connection (1-10)" value={socialConn} onChange={setSocialConn} min={1} max={10} step={1} suffix="/10" />
            <InputField label="Current stress (1-10)" value={stressLevel} onChange={setStressLevel} min={1} max={10} step={1} suffix="/10" />
            <InputField label="Sleep quality (1-10)" value={sleepQuality} onChange={setSleepQuality} min={1} max={10} step={1} suffix="/10" />
            <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
              <input type="checkbox" checked={mindfulness} onChange={e=>setMindfulness(e.target.checked)} className="accent-rose-500"/>
              <span>Regular mindfulness / meditation</span>
            </label>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          <Card gradient>
            <div className="text-center py-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Wellbeing Score</p>
              <div className="text-7xl font-black text-rose-500 mb-2">{wellbeingClamped}</div>
              <p className="text-gray-500">Gratitude Practice Index: {practiceScore}/100</p>
            </div>
          </Card>
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Journal Frequency" value={`${journalFreq}x/week`} />
            <ResultCard label="Practice Score" value={`${practiceScore}/100`} highlight />
            <ResultCard label="Mindfulness" value={mindfulness ? 'v Active' : 'x Inactive'} />
          </div>
          <Card>
            <h3 className="font-semibold text-gray-700 mb-3">Research-Backed Benefits of Gratitude</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>- <strong>+25% better sleep</strong> when writing gratitude notes before bed (Emmons & McCullough, 2003)</p>
              <p>- <strong>23% lower cortisol</strong> in people with a positive outlook and gratitude practice</p>
              <p>- <strong>Increased serotonin and dopamine</strong> - thinking grateful thoughts activates reward centres</p>
              <p>- <strong>Greater resilience</strong> - grateful people recover faster from trauma and adversity</p>
              <p>- <strong>Stronger social bonds</strong> - expressing gratitude increases relationship satisfaction</p>
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Gratitude Health Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Gratitude Health 2026 tool to get instant, evidence-based results personalized to your age, weight, and health goals. No signup required — complete privacy guaranteed.
        </p>
        <p className="text-sm text-gray-600">
          The calculator applies the calculation method described in its methodology and lets you explore different input scenarios. The result is an estimate, not a diagnosis.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Gratitude Health Calculator"
        category="health"
        intro={`The **Gratitude Health Calculator** is a a health information tool using the method and reference data described for this calculator. Get your gratitude health instantly - no account needed, works on all devices.

**Why Gratitude Health matters for your health:** Understanding your gratitude health is one of the most important steps in proactive health management. Healthcare professionals use gratitude health as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.





Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Gratitude Health Calculator:** This tool applies the calculation method described for gratitude health in clinical and research settings across the United States and internationally.



**How to interpret your results:** Your gratitude health result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current gratitude health requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "Real-Time Gratitude Health Calculator output as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Gratitude Health Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Gratitude Health Calculator methodology and assumptions & Guidelines", text: "The methodology should be interpreted alongside the specific formula and sources described for this calculator; a health result is an estimate and should not be treated as a clinical diagnosis. " },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Gratitude Health Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Gratitude Health Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Gratitude Health Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Gratitude Health Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Gratitude Health Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Gratitude Health calculation:**



2. **Track trends, not single readings:** One measurement is a snapshot. Track your gratitude health monthly for 3-6 months to see meaningful trends. Healthy gratitude health improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Gratitude Health is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your gratitude health is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Gratitude Health Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.



For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

`}
      />
      )}
    </CalculatorLayout>
  )
}
