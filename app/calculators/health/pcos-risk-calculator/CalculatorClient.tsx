'use client'
import { useState, useMemo } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: any[] }
export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [cycleLength,setCycleLength]=useState(32), [irregularity,setIrregularity]=useState(2), [acne,setAcne]=useState(2), [hirsutism,setHirsutism]=useState(2), [hairLoss,setHairLoss]=useState(1)
  const [familyHistory,setFamilyHistory]=useState(false), [ovarianCysts,setOvarianCysts]=useState(false)
  const features=useMemo(()=>({
    cycle: cycleLength>35 || irregularity>=3,
    acne: acne>=3,
    hirsutism: hirsutism>=3,
    hairLoss: hairLoss>=3,
    familyHistory,
    ovarianCysts,
  }),[cycleLength,irregularity,acne,hirsutism,hairLoss,familyHistory,ovarianCysts])
  const count=Object.values(features).filter(Boolean).length
  return <CalculatorLayout title="PCOS Feature Review Calculator" description="Organize selected cycle and androgen-related features for an educational PCOS discussion. This is not a diagnostic probability calculator." icon="🌀" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="pcos-risk-calculator">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-1 h-fit"><h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Feature Inputs</h2><div className="space-y-3">
        <InputField label="Average cycle length" value={cycleLength} onChange={setCycleLength} min={15} max={90} step={1} suffix="days"/>
        {[['Cycle irregularity',irregularity,setIrregularity],['Acne severity',acne,setAcne],['Unwanted hair growth / hirsutism',hirsutism,setHirsutism],['Hair thinning / loss',hairLoss,setHairLoss]].map(([label,value,setter]:any)=><div key={label}><p className="text-xs font-medium text-gray-500 mb-1">{label}: <b>{value}</b></p><div className="grid grid-cols-6 gap-1">{[0,1,2,3,4,5].map(n=><button key={n} onClick={()=>setter(n)} className={`py-1.5 rounded text-xs font-bold ${value===n?'bg-rose-500 text-white':'bg-gray-100 text-gray-500'}`}>{n}</button>)}</div></div>)}
        {[['Family history of PCOS',familyHistory,setFamilyHistory],['Polycystic ovaries reported on ultrasound',ovarianCysts,setOvarianCysts]].map(([label,value,setter]:any)=><button key={label} onClick={()=>setter(!value)} className={`w-full text-left p-3 rounded-xl border text-xs font-semibold ${value?'bg-rose-50 border-rose-300 text-rose-700':'bg-gray-50 border-gray-200 text-gray-600'}`}>{value?'✓ ':'○ '}{label}</button>)}
      </div></Card>
      <div className="lg:col-span-2 space-y-4"><div className="grid grid-cols-2 gap-3"><ResultCard label="Features flagged" value={`${count}/6`} highlight/><ResultCard label="Cycle pattern" value={features.cycle?'Irregular pattern':'Not flagged'}/></div>
        <Card><h3 className="font-bold text-gray-900 mb-3">How to interpret this</h3><p className="text-sm text-gray-600 leading-6"><strong>Methodology:</strong> selected feature count. <strong>Limitations:</strong> this is not a diagnostic probability. This page counts selected features that can be relevant when discussing PCOS. It does not calculate a probability, diagnose PCOS, or reproduce the international diagnostic algorithm. A clinician may consider menstrual history, hyperandrogenism, ovarian morphology or AMH in adults, and alternative causes.</p></Card>
        <Card><h3 className="font-bold text-gray-900 mb-3">Safety note</h3><p className="text-sm text-gray-600">PCOS assessment is clinical. If cycles are persistently irregular, symptoms are concerning, or pregnancy is difficult, discuss the pattern with a qualified healthcare professional.</p></Card>
      </div></div>
    <div className="mt-6"><FAQSection faqs={faqs}/></div>
  </CalculatorLayout>
}
