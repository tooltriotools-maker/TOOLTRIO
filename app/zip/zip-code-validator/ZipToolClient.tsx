'use client'
import { useState } from 'react'

export default function ZipToolClient() {
  const [zip, setZip] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  async function validate(val: string) {
    setZip(val)
    if (val.length !== 5) { setResult(null); return }
    if (!/^\d{5}$/.test(val)) { setResult({ valid:false, reason:'ZIP codes must contain only digits (0-9)' }); return }
    setLoading(true)
    const res = await fetch(`/api/zip/lookup?zip=${val}`)
    const data = await res.json()
    setLoading(false)
    if (!res.ok) { setResult({ valid:false, reason:`ZIP ${val} not found in USPS database` }); return }
    setResult({ valid:true, rec:data })
  }

  return (
    <div>
      <div className="mb-6">
        <input value={zip} onChange={e=>validate(e.target.value)} placeholder="Type a 5-digit ZIP..." maxLength={5}
          className="w-full border-2 rounded-xl px-4 py-4 text-2xl font-mono text-center focus:outline-none"
          style={{borderColor: result?(result.valid?'#22c55e':'#ef4444'):'#e2e8f0',background:'rgba(255,255,255,0.9)',transition:'border-color 0.2s'}} />
      </div>
      {loading && <div className="text-center text-gray-400 text-sm">Checking...</div>}
      {result && !loading && (
        result.valid ? (
          <div className="rounded-2xl border p-5 bg-green-50 border-green-200">
            <div className="flex items-center gap-2 mb-4"><span className="text-2xl">✅</span><span className="text-xl font-bold text-green-700">Valid ZIP Code</span></div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {([['City',result.rec.city],['State',`${result.rec.state} (${result.rec.stateCode})`],['County',result.rec.county],['Type',result.rec.type]] as [string,string][]).map(([k,v])=>(
                <div key={k} className="rounded-lg bg-white/70 p-2"><div className="text-xs text-gray-400">{k}</div><div className="font-semibold">{v}</div></div>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border p-5 bg-red-50 border-red-200">
            <div className="flex items-center gap-2 mb-2"><span className="text-2xl">❌</span><span className="text-xl font-bold text-red-700">Invalid ZIP Code</span></div>
            <p className="text-red-600 text-sm">{result.reason}</p>
          </div>
        )
      )}
      <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-200">
        <div className="font-semibold text-gray-700 mb-2 text-sm">Validation Rules:</div>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>✓ Exactly 5 digits</li><li>✓ Only numbers (0–9)</li>
          <li>✓ Must be an active USPS delivery area</li><li>✓ 41,000+ valid ZIPs covered</li>
        </ul>
      </div>
    </div>
  )
}
