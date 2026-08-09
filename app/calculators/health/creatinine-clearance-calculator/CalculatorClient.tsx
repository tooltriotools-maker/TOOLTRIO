'use client'

import { useMemo, useState } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'

interface Props {
  faqs: any[]
  relatedCalculators?: any[]
  blogSlug?: string
  seoContent?: SEOContentProps
}

export default function CalculatorClient({ faqs, relatedCalculators, blogSlug, seoContent }: Props) {
  const [weight, setWeight] = useState(165)
  const [age, setAge] = useState(35)
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial')
  const [serumCreatinine, setSerumCreatinine] = useState(1.0)

  const result = useMemo(() => {
    const weightKg = unit === 'imperial' ? weight * 0.45359237 : weight
    const creatinine = Math.max(0.01, serumCreatinine)
    const base = ((140 - age) * weightKg) / (72 * creatinine)
    const clearance = gender === 'female' ? base * 0.85 : base
    const rounded = Math.round(clearance * 10) / 10

    const interpretation = rounded < 30
      ? 'Markedly reduced estimate'
      : rounded < 60
        ? 'Reduced estimate'
        : rounded < 90
          ? 'Mildly reduced / context dependent'
          : rounded <= 120
            ? 'Common adult range'
            : 'Above typical adult range'

    return { clearance: rounded, interpretation, weightKg }
  }, [weight, age, gender, unit, serumCreatinine])

  return (
    <CalculatorLayout
      title="Creatinine Clearance Calculator"
      description="Estimate creatinine clearance with the Cockcroft–Gault equation using age, serum creatinine, body weight, and sex."
      icon="🫘"
      category="Health"
      relatedCalculators={relatedCalculators}
      blogSlug={blogSlug}
      slug="creatinine-clearance-calculator"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Cockcroft–Gault Inputs</h2>
          <div className="space-y-4">
            <SelectField
              label="Unit"
              value={unit}
              onChange={v => setUnit(v as 'metric' | 'imperial')}
              options={[{ value: 'metric', label: 'Metric (kg)' }, { value: 'imperial', label: 'Imperial (lbs)' }]}
            />
            <SelectField
              label="Sex used by equation"
              value={gender}
              onChange={v => setGender(v as 'male' | 'female')}
              options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]}
            />
            <InputField label={`Weight (${unit === 'metric' ? 'kg' : 'lbs'})`} value={weight} onChange={setWeight} min={30} max={300} step={1} suffix={unit === 'metric' ? 'kg' : 'lbs'} />
            <InputField label="Age" value={age} onChange={setAge} min={18} max={120} step={1} suffix="years" />
            <InputField label="Serum creatinine" value={serumCreatinine} onChange={setSerumCreatinine} min={0.1} max={20} step={0.1} suffix="mg/dL" />
          </div>
          <div className="mt-5 p-5 rounded-xl border-2 border-blue-200 bg-blue-50 text-center">
            <p className="text-xs font-bold uppercase tracking-wide text-blue-700">Estimated Creatinine Clearance</p>
            <p className="text-4xl font-black my-2 text-blue-900">{result.clearance}</p>
            <p className="font-bold text-blue-800">mL/min</p>
            <p className="text-sm text-blue-700 mt-2">{result.interpretation}</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          <Card>
            <h3 className="font-bold text-gray-900 mb-3">How it is calculated</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Cockcroft–Gault estimates creatinine clearance from age, body weight, serum creatinine, and sex. The female coefficient of 0.85 is applied in the original equation.
            </p>
            <div className="mt-4 rounded-xl bg-gray-50 border border-gray-100 p-4 font-mono text-sm text-gray-700">
              CrCl = ((140 − age) × weight kg) / (72 × serum creatinine) × 0.85 if female
            </div>
          </Card>

          <Card>
            <h3 className="font-bold text-gray-900 mb-3">Important limitations</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• This is an estimate, not a directly measured creatinine clearance.</li>
              <li>• The appropriate weight choice can matter, particularly with obesity or unusual body composition.</li>
              <li>• Drug-dosing decisions should use the equation and clinical guidance appropriate to the specific medication.</li>
              <li>• Discuss unexpected kidney results with a qualified healthcare professional.</li>
            </ul>
          </Card>
        </div>
      </div>

      {seoContent ? <SEOContent {...seoContent} category="health" healthSourceProfile="creatinine-clearance-calculator" /> : (
        <SEOContent
          title="Creatinine Clearance Calculator"
          category="health"
          healthSourceProfile="creatinine-clearance-calculator"
          intro="Estimate creatinine clearance with the Cockcroft–Gault equation. The result is an estimate used in specific clinical contexts and is not a diagnosis of kidney function."
          howItWorks="The Cockcroft–Gault equation uses age, body weight, serum creatinine and sex. The calculation is distinct from eGFR equations and should not be substituted automatically for every clinical purpose."
          benefits={[]}
          useCases={[]}
          scienceSection="The original Cockcroft–Gault equation was developed to estimate creatinine clearance from serum creatinine and patient characteristics. Modern kidney-function assessment also uses eGFR equations, so the appropriate method depends on the clinical question."
          tipsSection="Use a consistent unit system, enter the laboratory serum-creatinine value accurately, and discuss medication-dosing or kidney-function decisions with a healthcare professional."
          conclusion="Use this calculator as an educational estimate of Cockcroft–Gault creatinine clearance, not as a standalone clinical decision tool."
        />
      )}

      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )
}
