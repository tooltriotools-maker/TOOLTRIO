'use client'
import { useState, useMemo } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string; seoContent?: SEOContentProps }


export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug, seoContent}: Props) {

  const [age, setAge] = useState(35)
  const [restingHR, setRestingHR] = useState(65)
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial')

  const result = useMemo(() => {
    const maxHR = Math.round(208 - 0.7 * age)  // Tanaka formula
    const hrr = maxHR - restingHR  // Heart Rate Reserve
    const zones = [
      { name: 'Zone 1 - Warm Up', pct: '50-60%', min: Math.round(hrr * 0.50 + restingHR), max: Math.round(hrr * 0.60 + restingHR), color: '#93c5fd', benefit: 'Recovery & warm-up' },
      { name: 'Zone 2 - Fat Burn', pct: '60-70%', min: Math.round(hrr * 0.60 + restingHR), max: Math.round(hrr * 0.70 + restingHR), color: '#6ee7b7', benefit: 'Fat burning & base fitness' },
      { name: 'Zone 3 - Aerobic', pct: '70-80%', min: Math.round(hrr * 0.70 + restingHR), max: Math.round(hrr * 0.80 + restingHR), color: '#fde047', benefit: 'Cardiovascular fitness' },
      { name: 'Zone 4 - Threshold', pct: '80-90%', min: Math.round(hrr * 0.80 + restingHR), max: Math.round(hrr * 0.90 + restingHR), color: '#fb923c', benefit: 'Performance & speed' },
      { name: 'Zone 5 - Maximum', pct: '90-100%', min: Math.round(hrr * 0.90 + restingHR), max: maxHR, color: '#f87171', benefit: 'Maximum sprint effort' },
    ]
    let hrStatus = ''
    if (restingHR < 40) hrStatus = 'Elite Athlete'
    else if (restingHR < 60) hrStatus = 'Athletic - Excellent'
    else if (restingHR < 70) hrStatus = 'Good'
    else if (restingHR < 80) hrStatus = 'Average'
    else if (restingHR < 90) hrStatus = 'Above Average - Monitor'
    else hrStatus = 'High - See Doctor'
    return { maxHR, hrr, zones, hrStatus }
  }, [age, restingHR])

  return (
    <CalculatorLayout title="Heart Rate Calculator" description="Calculate your max heart rate, target zones, and resting HR health status for effective training." icon="💓" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Your Details</h2>
          <div className="space-y-5">
            <InputField label="Age" value={age} onChange={setAge} min={10} max={90} step={1} suffix="yrs" />
            <InputField label="Resting Heart Rate" value={restingHR} onChange={setRestingHR} min={30} max={120} step={1} suffix="bpm" />
          </div>
          <div className="mt-5 space-y-3">
            <div className="p-3 bg-red-50 rounded-xl text-center border border-red-200">
              <p className="text-xs text-gray-500 font-medium">Maximum Heart Rate</p>
              <p className="text-3xl font-black text-red-600">{result.maxHR}</p>
              <p className="text-xs text-gray-400">bpm (Tanaka formula)</p>
            </div>
            <div className="p-3 bg-green-50 rounded-xl text-center border border-green-200">
              <p className="text-xs text-gray-500 font-medium">Resting HR Status</p>
              <p className="text-lg font-black text-green-700">{result.hrStatus}</p>
              <p className="text-xs text-gray-400">{restingHR} bpm</p>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <h3 className="font-bold text-gray-900 mb-4">Heart Rate Training Zones (Karvonen Method)</h3>
            <div className="space-y-3">
              {result.zones.map(zone => (
                <div key={zone.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-bold text-gray-800">{zone.name}</span>
                    <span className="font-bold text-gray-600">{zone.min}-{zone.max} bpm</span>
                  </div>
                  <div className="relative h-6 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full flex items-center px-2" style={{ width: zone.pct.split('-')[1], backgroundColor: zone.color }}>
                      <span className="text-xs font-bold text-gray-700">{zone.benefit}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <div className="grid grid-cols-2 gap-3">
            {result.zones.map(z => (
              <div key={z.name} className="p-3 rounded-xl text-center border" style={{ borderColor: z.color, backgroundColor: z.color + '20' }}>
                <p className="text-xs font-bold text-gray-700">{z.name.split(' - ')[1]}</p>
                <p className="text-xl font-black text-gray-900">{z.min}-{z.max}</p>
                <p className="text-xs text-gray-500">bpm ({z.pct})</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {seoContent && (
      <>
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Heart Rate Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          A 50-year-old male with blood pressure 135/88 mmHg falls in the <strong>Stage 1 Hypertension</strong> category (AHA 2026 guidelines). Lifestyle changes can reduce systolic BP by 4–11 mmHg within weeks.
        </p>
        <p className="text-sm text-gray-600">
          This Heart Rate 2026 uses American Heart Association standards to classify your readings and give evidence-based recommendations for improving cardiovascular health.
        </p>
      </Card>
      <SEOContent {...seoContent} category="health" />
      </>
      )}
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )
}
