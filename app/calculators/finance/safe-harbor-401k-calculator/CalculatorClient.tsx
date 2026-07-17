'use client'
import { useState, useMemo } from 'react'
import { calculateSafeHarbor401k } from '@/lib/calculations/finance'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }
export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [annualSalary, setAnnualSalary] = useState(80000)
  const [employeeContrib, setEmployeeContrib] = useState(6)
  const [matchType, setMatchType] = useState<'basic' | 'enhanced' | 'nonelective'>('basic')
  const result = useMemo(() => calculateSafeHarbor401k(annualSalary, employeeContrib, matchType), [annualSalary, employeeContrib, matchType])
  const fmt = (v: number) => '$' + Math.round(v).toLocaleString()
  const matchOptions = [
    { id: 'basic' as const, label: 'Basic Match', desc: '100% of first 3% + 50% of next 2%' },
    { id: 'enhanced' as const, label: 'Enhanced Match', desc: '100% of first 4%' },
    { id: 'nonelective' as const, label: 'Non-Elective 3%', desc: '3% of salary regardless of contribution' },
  ]
  return (
    <CalculatorLayout title="Safe Harbor 401(k) Calculator USA 2026" description="Calculate Safe Harbor 401k employer contributions and employee tax savings for 2026." icon="🛡️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="safe-harbor-401k-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Plan Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Annual Salary</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={annualSalary} onChange={e => setAnnualSalary(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Employee Deferral Rate: {employeeContrib}%</label>
            <input type="range" min={0} max={100} step={1} value={employeeContrib} onChange={e => setEmployeeContrib(Number(e.target.value))} className="w-full accent-green-500" />
            <div className="flex justify-between text-xs text-gray-400"><span>0%</span><span>100%</span></div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-600">Safe Harbor Match Formula</label>
            {matchOptions.map(m => (
              <button key={m.id} onClick={() => setMatchType(m.id)} className={`w-full py-2 px-3 rounded-xl text-xs font-semibold text-left transition-all ${matchType === m.id ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                <span className="font-bold">{m.label}</span><br /><span className="opacity-75">{m.desc}</span>
              </button>
            ))}
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Employee Deferral" value={fmt(result.employeeDeferral)} highlight />
            <ResultCard label="Employer Match" value={fmt(result.employerContrib)} subValue="immediate vest" />
            <ResultCard label="Total Contribution" value={fmt(result.totalContrib)} subValue={result.isWithinLimit ? '✓ within limit' : '⚠ over limit'} />
            <ResultCard label="Your Tax Savings" value={fmt(result.taxSavings)} subValue="est. 24% bracket" />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Contribution Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-sm text-gray-600 flex-1">Employee Deferral</span>
                <div className="bg-gray-100 rounded-lg h-4 flex-1 overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-lg" style={{ width: `${(result.employeeDeferral / result.annualLimit) * 100}%` }} />
                </div>
                <span className="font-bold text-sm w-24 text-right">{fmt(result.employeeDeferral)}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm text-gray-600 flex-1">Employer Match</span>
                <div className="bg-gray-100 rounded-lg h-4 flex-1 overflow-hidden">
                  <div className="h-full bg-green-500 rounded-lg" style={{ width: `${(result.employerContrib / result.annualLimit) * 100}%` }} />
                </div>
                <span className="font-bold text-sm w-24 text-right">{fmt(result.employerContrib)}</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t text-sm flex justify-between">
              <span className="font-bold text-gray-700">Total (2026 limit: {fmt(result.annualLimit)})</span>
              <span className={`font-black ${result.isWithinLimit ? 'text-green-600' : 'text-red-600'}`}>{fmt(result.totalContrib)}</span>
            </div>
          </Card>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-800">
            <p className="font-bold mb-1">✅ Safe Harbor Benefit</p>
            <p>{result.vestingSchedule}. This plan automatically passes ADP/ACP nondiscrimination tests, allowing owners and HCEs to maximize contributions.</p>
          </div>
        </div>
      </div>
      <div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
