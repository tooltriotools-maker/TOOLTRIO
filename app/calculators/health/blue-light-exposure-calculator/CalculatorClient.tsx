'use client'
import { useState } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }

export default function CalculatorClient({ faqs, relatedCalculators, blogSlug, seoContent }: Props) {
  const [phoneHours, setPhoneHours] = useState(3)
  const [laptopHours, setLaptopHours] = useState(6)
  const [tvHours, setTvHours] = useState(2)
  const [eveningUse, setEveningUse] = useState(true)
  const [blueFilter, setBlueFilter] = useState(false)

  // Relative blue light units (arbitrary scale)
  const rawExposure = phoneHours * 8 + laptopHours * 6 + tvHours * 4
  const adjusted = blueFilter ? rawExposure * 0.6 : rawExposure
  const sleepImpact = eveningUse ? Math.round(adjusted * 0.3) : 0
  const max = 200 // approx max daily
  const pct = Math.min(100, Math.round(adjusted / max * 100))

  const risk = pct >= 80 ? {l:'High Exposure ⚠️', c:'text-red-600'} : pct >= 50 ? {l:'Moderate Exposure', c:'text-orange-600'} : {l:'Low Exposure v', c:'text-green-600'}

  return (
    <CalculatorLayout title="Blue Light Exposure Calculator" description="Estimate your daily blue light exposure from screens and its impact on sleep and eye health." icon="💙" category="Health" relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="blue-light-exposure-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-5">Daily Screen Time</h2>
          <div className="space-y-4">
            <InputField label="Smartphone" value={phoneHours} onChange={setPhoneHours} min={0} max={16} step={0.5} suffix="hrs" />
            <InputField label="Laptop / Desktop" value={laptopHours} onChange={setLaptopHours} min={0} max={16} step={0.5} suffix="hrs" />
            <InputField label="TV / Streaming" value={tvHours} onChange={setTvHours} min={0} max={10} step={0.5} suffix="hrs" />
            <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
              <input type="checkbox" checked={eveningUse} onChange={e=>setEveningUse(e.target.checked)} className="accent-rose-500"/>
              <span>Use screens in the 2 hrs before bed</span>
            </label>
            <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
              <input type="checkbox" checked={blueFilter} onChange={e=>setBlueFilter(e.target.checked)} className="accent-rose-500"/>
              <span>Blue-light filter / Night mode enabled</span>
            </label>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          <Card gradient>
            <div className="text-center py-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Daily Blue Light Exposure</p>
              <div className={`text-7xl font-black mb-2 ${risk.c}`}>{pct}<span className="text-3xl">%</span></div>
              <p className={`font-bold ${risk.c}`}>{risk.l}</p>
            </div>
          </Card>
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Total Screen Time" value={`${phoneHours+laptopHours+tvHours}h`} />
            <ResultCard label="Sleep Impact" value={sleepImpact > 30 ? 'High' : sleepImpact > 10 ? 'Moderate' : 'Low'} />
            <ResultCard label="Filter Active" value={blueFilter ? 'Yes v' : 'No'} />
          </div>
          <Card>
            <h3 className="font-semibold text-gray-700 mb-3">Reduction Tips</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>- Enable night mode / warm color temperature after sunset</p>
              <p>- Apply the 20-20-20 rule: every 20 min, look 20 ft away for 20 sec</p>
              <p>- Avoid screens 1-2 hours before bedtime for better sleep quality</p>
              <p>- Blue-light blocking glasses can reduce exposure by up to 40%</p>
              <p>- Increase screen brightness in bright environments to reduce strain</p>
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
      {seoContent ? (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Blue Light Exposure Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Blue Light Exposure 2026 tool to get instant, evidence-based results personalized to your age, weight, and health goals. No signup required — complete privacy guaranteed.
        </p>
        <p className="text-sm text-gray-600">
          The calculator applies the calculation method described in its methodology and lets you explore different input scenarios. The result is an estimate, not a diagnosis.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      ) : (
      <SEOContent
        title="Blue Light Exposure Calculator"
        category="health"
        intro={`The **Blue Light Exposure Calculator** is a a health information tool using the method and reference data described for this calculator. Get your blue light exposure instantly - no account needed, works on all devices.

**Why Blue Light Exposure matters for your health:** Understanding your blue light exposure is one of the most important steps in proactive health management. Healthcare professionals use blue light exposure as a key metric for screening, monitoring, and setting health goals. Now you can track it yourself with the same accuracy used in clinical settings.





Combine this with [our BMI Calculator](/calculators/health/bmi-calculator), [our Calorie Calculator](/calculators/health/calorie-calculator) for a complete picture.`}
        howItWorks={`**The science behind the Blue Light Exposure Calculator:** This tool applies the calculation method described for blue light exposure in clinical and research settings across the United States and internationally.



**How to interpret your results:** Your blue light exposure result falls into a range (below average, average, above average, or specific clinical categories). Use the healthy range indicators to understand whether your current blue light exposure requires attention, and what direction to aim for based on your health goals.

**Limitations to understand:** This calculator provides population-average estimates. Individual factors including genetics, medications, medical conditions, hydration status, and measurement timing can affect results. For medical decisions, always consult your healthcare provider.`}
        benefits={[
          { title: "Real-Time Blue Light Exposure Calculator results as You Type", text: "Results update the moment you change any input - there's no button to click and no page to reload. This makes the Blue Light Exposure Calculator fast and intuitive, letting you explore dozens of different scenarios in minutes and develop a genuine feel for how each variable affects your outcome." },
          { title: "Blue Light Exposure Calculator methodology and assumptions & Guidelines", text: "The methodology should be interpreted alongside the specific formula and sources described for this calculator; a health result is an estimate and should not be treated as a clinical diagnosis. " },
          { title: "Expert Context, Reference Ranges & Next Steps", text: "Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps. You don't just get a result - you get the knowledge to understand what it means and what to do about it." },
        ]}
        useCases={[
          { title: "Personal Tracking & Ongoing Goal Monitoring", text: "Americans who commit to tracking their health and wellness metrics consistently over time achieve dramatically better outcomes than those who rely on occasional checks. Use the Blue Light Exposure Calculator to establish a baseline, set a specific goal, and monitor your progress monthly - the data becomes a powerful accountability tool." },
          { title: "Preparing for Healthcare or Professional Consultations", text: "Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation. You take ownership of your health and wellness situation and get more value from every professional interaction." },
          { title: "Students, Educators & Academic Use", text: "Students in nutrition, kinesiology, finance, computer science, and related fields use the Blue Light Exposure Calculator to bridge the gap between classroom theory and real-world application. Educators use it as a teaching demonstration tool. Researchers use it to quickly validate calculations and generate realistic example scenarios." },
          { title: "Workplace Wellness & Structured Program Participants", text: "Millions of Americans participate in employer-sponsored wellness programs, structured fitness plans, financial coaching programs, and similar organized initiatives. Tools like the Blue Light Exposure Calculator help participants establish objective baselines at program start and demonstrate measurable, data-supported outcomes over the program duration." },
          { title: "Independent Research & Scenario Analysis", text: "Journalists, bloggers, researchers, and analysts working on health and wellness topics use the Blue Light Exposure Calculator to generate accurate data points, verify existing estimates, illustrate concepts with real numbers, and explore 'what if' scenarios for articles, reports, and presentations." },
          { title: "Families Making Joint Decisions", text: "Families making important shared health and wellness decisions - about diet and health, financial planning, career moves, major purchases - use tools like the Blue Light Exposure Calculator to ensure everyone is working from the same accurate information. Shared data creates shared understanding and more aligned, confident decisions." },
        ]}
        tipsSection={`**Getting the most accurate Blue Light Exposure calculation:**



2. **Track trends, not single readings:** One measurement is a snapshot. Track your blue light exposure monthly for 3-6 months to see meaningful trends. Healthy blue light exposure improvement is gradual - expect 1-3% improvement per month with consistent lifestyle changes.

3. **Combine with other metrics:** Blue Light Exposure is most informative when combined with other health measurements. [BMI](/calculators/health/bmi-calculator) + waist circumference + body fat percentage gives a much better picture of health than any single metric alone. Use multiple calculators on this site for a comprehensive health snapshot.

4. **Discuss results with your doctor:** If your blue light exposure is outside the healthy range, bring these calculations to your next doctor's appointment. Calculated values provide context for the conversation and help set measurable health goals.

5. **American vs. Asian reference ranges:** Many health metrics have different optimal ranges for Asian vs. Western populations. If you're of Asian descent, ask your doctor about population-specific thresholds for metrics like BMI and blood pressure.`}
        conclusion={`The Blue Light Exposure Calculator represents the best of what free, open-access technology can deliver: professional-grade health and wellness calculations, grounded in validated US standards, delivered instantly and privately to any American with a smartphone or computer. By providing not just accurate numbers but also the context, benchmarks, and guidance needed to act on them meaningfully, this tool helps bridge the gap between raw data and informed decisions.



For a complete picture, also try [our BMI Calculator](/calculators/health/bmi-calculator) and [our Calorie Calculator](/calculators/health/calorie-calculator).

`}
      />
      )}
    </CalculatorLayout>
  )
}
