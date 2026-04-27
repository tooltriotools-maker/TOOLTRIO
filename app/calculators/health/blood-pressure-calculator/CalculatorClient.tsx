'use client'
import { useState, useMemo } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }


export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug, seoContent}: Props) {

  const [systolic, setSystolic] = useState(120)
  const [diastolic, setDiastolic] = useState(80)

  const result = useMemo(() => {
    let category = '', color = '', advice = '', icon = ''
    if (systolic > 180 || diastolic > 120) {
      category = 'Hypertensive Crisis'; color = 'text-red-700 bg-red-100'; icon = '🚨'
      advice = 'Seek emergency medical care immediately. Call 911 or go to ER.'
    } else if (systolic >= 140 || diastolic >= 90) {
      category = 'Hypertension Stage 2'; color = 'text-red-600 bg-red-50'; icon = '⚠️'
      advice = 'See your doctor as soon as possible. Medication likely needed alongside lifestyle changes.'
    } else if (systolic >= 130 || diastolic >= 80) {
      category = 'Hypertension Stage 1'; color = 'text-orange-600 bg-orange-50'; icon = '⚠️'
      advice = 'Consult your doctor. Lifestyle changes (diet, exercise) can often control Stage 1 without medication.'
    } else if (systolic >= 120 && diastolic < 80) {
      category = 'Elevated Blood Pressure'; color = 'text-yellow-600 bg-yellow-50'; icon = '📊'
      advice = 'Not yet hypertension, but trending high. Adopt DASH diet and increase exercise now.'
    } else if (systolic < 90 || diastolic < 60) {
      category = 'Low Blood Pressure'; color = 'text-blue-600 bg-blue-50'; icon = '📉'
      advice = 'Low BP can cause dizziness. Increase fluid/salt intake (if no kidney issues). See doctor if symptomatic.'
    } else {
      category = 'Normal'; color = 'text-green-600 bg-green-50'; icon = '✅'
      advice = 'Excellent! Maintain healthy lifestyle: exercise, balanced diet, limit sodium, no smoking.'
    }
    const pulse = systolic - diastolic
    const map = Math.round(diastolic + pulse / 3)
    return { category, color, advice, icon, pulse, map }
  }, [systolic, diastolic])

  const bpData = [
    { range: 'Low', sys: 90, dia: 60, color: '#3b82f6' },
    { range: 'Normal', sys: 119, dia: 79, color: '#22c55e' },
    { range: 'Elevated', sys: 129, dia: 79, color: '#eab308' },
    { range: 'Stage 1', sys: 139, dia: 89, color: '#f97316' },
    { range: 'Stage 2', sys: 159, dia: 99, color: '#ef4444' },
    { range: 'Crisis', sys: 180, dia: 120, color: '#7f1d1d' },
    { range: 'Yours', sys: systolic, dia: diastolic, color: '#8b5cf6' },
  ]

  return (
    <CalculatorLayout title="Blood Pressure Calculator" description="Check your BP reading against AHA categories and get health guidance." icon="❤️" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Your Blood Pressure</h2>
          <div className="space-y-5">
            <InputField label="Systolic (top number) mmHg" value={systolic} onChange={setSystolic} min={60} max={220} step={1} suffix="mmHg" />
            <InputField label="Diastolic (bottom number) mmHg" value={diastolic} onChange={setDiastolic} min={40} max={140} step={1} suffix="mmHg" />
          </div>
          <div className={`mt-5 p-4 rounded-xl ${result.color}`}>
            <p className="text-2xl mb-1">{result.icon}</p>
            <p className="text-xl font-black">{result.category}</p>
            <p className="text-sm mt-1">{systolic}/{diastolic} mmHg</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="p-3 bg-gray-50 rounded-xl text-center">
              <p className="text-xs text-gray-500">Pulse Pressure</p>
              <p className="text-xl font-black text-gray-900">{result.pulse}</p>
              <p className="text-xs text-gray-400">mmHg</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl text-center">
              <p className="text-xs text-gray-500">Mean Arterial</p>
              <p className="text-xl font-black text-gray-900">{result.map}</p>
              <p className="text-xs text-gray-400">mmHg</p>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <h3 className="font-bold text-gray-900 mb-3">What This Means</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{result.advice}</p>
          </Card>
          <Card>
            <h3 className="font-bold text-gray-900 mb-4">Blood Pressure Categories</h3>
            <div className="space-y-2">
              {[
                { label: 'Normal', range: 'Less than 120/80', color: 'bg-green-500', width: 'w-1/6' },
                { label: 'Elevated', range: '120-129 / less than 80', color: 'bg-yellow-400', width: 'w-2/6' },
                { label: 'Stage 1 Hypertension', range: '130-139 / 80-89', color: 'bg-orange-400', width: 'w-3/6' },
                { label: 'Stage 2 Hypertension', range: '140+ / 90+', color: 'bg-red-500', width: 'w-4/6' },
                { label: 'Hypertensive Crisis', range: 'Above 180/120', color: 'bg-red-800', width: 'w-5/6' },
              ].map(c => (
                <div key={c.label} className="flex items-center gap-3">
                  <div className={`h-3 rounded-full ${c.color} ${c.width}`} />
                  <div>
                    <span className="text-xs font-bold text-gray-900">{c.label}</span>
                    <span className="text-xs text-gray-500 ml-2">{c.range}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h3 className="font-bold text-gray-900 mb-3">Lifestyle Tips to Improve BP</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { tip: 'DASH Diet', impact: '8-14 mmHg v', icon: '🥗' },
                { tip: 'Exercise 150 min/week', impact: '4-9 mmHg v', icon: '🏃' },
                { tip: 'Reduce sodium', impact: '2-8 mmHg v', icon: '🧂' },
                { tip: 'Limit alcohol', impact: '2-4 mmHg v', icon: '🍷' },
                { tip: 'Lose weight (per kg)', impact: '1 mmHg v', icon: '⚖️' },
                { tip: 'Quit smoking', impact: '5-10 mmHg v', icon: '🚭' },
              ].map(t => (
                <div key={t.tip} className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                  <span>{t.icon}</span>
                  <div>
                    <p className="font-semibold text-gray-800">{t.tip}</p>
                    <p className="text-green-600 font-bold">{t.impact}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {seoContent && (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Blood Pressure Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          A 50-year-old male with blood pressure 135/88 mmHg falls in the <strong>Stage 1 Hypertension</strong> category (AHA 2026 guidelines). Lifestyle changes can reduce systolic BP by 4–11 mmHg within weeks.
        </p>
        <p className="text-sm text-gray-600">
          This Blood Pressure 2026 uses American Heart Association standards to classify your readings and give evidence-based recommendations for improving cardiovascular health.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      )}
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )
}
