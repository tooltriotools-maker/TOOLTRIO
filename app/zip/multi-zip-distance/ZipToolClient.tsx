'use client'
import { useState } from 'react'

export default function ZipToolClient() {
  const [zips, setZips] = useState(['', ''])
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function addZip() { if (zips.length < 5) setZips([...zips, '']) }
  function removeZip(i: number) { setZips(zips.filter((_,j) => j !== i)) }
  function updateZip(i: number, val: string) { const a=[...zips]; a[i]=val; setZips(a) }

  async function calculate() {
    const valid = zips.filter(z => /^\d{5}$/.test(z.trim()))
    if (valid.length < 2) { setError('Enter at least 2 valid ZIP codes'); return }
    setLoading(true); setError('')
    const pairs: any[] = []
    for (let i = 0; i < valid.length; i++) {
      for (let j = i+1; j < valid.length; j++) {
        const res = await fetch(`/api/zip/distance?from=${valid[i]}&to=${valid[j]}`)
        const data = await res.json()
        if (res.ok) pairs.push(data)
      }
    }
    setLoading(false); setResults(pairs)
  }

  return (
    <div>
      <div className="space-y-2 mb-4">
        {zips.map((z,i) => (
          <div key={i} className="flex gap-2 items-center">
            <span className="text-sm text-gray-500 w-6">{i+1}.</span>
            <input value={z} onChange={e=>updateZip(i,e.target.value.replace(/\D/g,''))} placeholder={`ZIP code ${i+1}`} maxLength={5}
              className="flex-1 border-2 rounded-xl px-4 py-2.5 font-mono focus:outline-none focus:border-green-500"
              style={{borderColor:'#e2e8f0',background:'rgba(255,255,255,0.9)'}} />
            {zips.length > 2 && <button onClick={()=>removeZip(i)} className="text-red-400 hover:text-red-600 px-2">✕</button>}
          </div>
        ))}
      </div>
      <div className="flex gap-2 mb-6">
        {zips.length < 5 && (
          <button onClick={addZip} className="px-4 py-2.5 rounded-xl border-2 border-dashed border-green-300 text-green-600 text-sm hover:bg-green-50">
            + Add ZIP
          </button>
        )}
        <button onClick={calculate} disabled={loading}
          className="flex-1 py-2.5 text-white font-bold rounded-xl disabled:opacity-60"
          style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',boxShadow:'0 4px 16px rgba(34,197,94,0.3)'}}>
          {loading ? 'Calculating...' : 'Calculate All Distances'}
        </button>
      </div>
      {error&&<div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 mb-4 text-sm">{error}</div>}
      {results.length > 0 && (
        <div className="space-y-2">
          {results.map((r,i) => (
            <div key={i} className="rounded-xl border p-3 flex items-center justify-between"
              style={{background:'rgba(255,255,255,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <div className="text-sm">
                <span className="font-bold text-gray-800">{r.r1.zip} ({r.r1.city}, {r.r1.stateCode})</span>
                <span className="text-gray-400 mx-2">→</span>
                <span className="font-bold text-gray-800">{r.r2.zip} ({r.r2.city}, {r.r2.stateCode})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-black text-green-600">{r.miles.toFixed(1)} mi</span>
                <a href={`https://www.google.com/maps/dir/${r.r1.lat},${r.r1.lng}/${r.r2.lat},${r.r2.lng}`}
                  target="_blank" rel="noopener noreferrer" className="text-blue-500 px-2 py-1 rounded-lg hover:bg-blue-50 text-sm">🗺️</a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
