'use client'
import { useState, useEffect } from 'react'
import { ZipQuickFill } from '@/components/ui/ZipQuickFill'

const TZ_LABELS: Record<string,string> = {
  'America/New_York':'Eastern (ET)','America/Chicago':'Central (CT)',
  'America/Denver':'Mountain (MT)','America/Los_Angeles':'Pacific (PT)',
  'America/Phoenix':'Mountain (No DST)','America/Anchorage':'Alaska (AKT)',
  'Pacific/Honolulu':'Hawaii (HT)','America/Indiana/Indianapolis':'Eastern (No DST)',
}

export default function ZipToolClient() {
  const [zip, setZip] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [now, setNow] = useState(new Date())

  useEffect(() => { const t = setInterval(()=>setNow(new Date()),1000); return()=>clearInterval(t) },[])

  async function lookup(z?: string) {
    const val=(z||zip).trim(); if(z) setZip(z)
    if(!/^\d{5}$/.test(val)){setError('Enter a valid 5-digit ZIP');setResult(null);return}
    setLoading(true);setError('')
    const res=await fetch(`/api/zip/lookup?zip=${val}`)
    const data=await res.json(); setLoading(false)
    if(!res.ok){setError(data.error);setResult(null);return}
    setResult(data)
  }

  function getLocalTime(tz: string) {
    try { return now.toLocaleTimeString('en-US',{timeZone:tz,hour12:true,hour:'2-digit',minute:'2-digit',second:'2-digit'}) }
    catch { return '--' }
  }

  return (
    <div>
      <ZipQuickFill onSelect={z=>lookup(z)} />
      <div className="flex gap-2 mb-6">
        <input value={zip} onChange={e=>setZip(e.target.value.replace(/\D/g,''))} onKeyDown={e=>e.key==='Enter'&&lookup()}
          placeholder="Enter ZIP (e.g. 98101)" maxLength={5}
          className="flex-1 border-2 rounded-xl px-4 py-3 text-lg font-mono focus:outline-none focus:border-green-500"
          style={{borderColor:'#e2e8f0',background:'rgba(255,255,255,0.9)'}} />
        <button onClick={()=>lookup()} disabled={loading} className="px-6 py-3 text-white font-bold rounded-xl disabled:opacity-60"
          style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',boxShadow:'0 4px 16px rgba(34,197,94,0.3)'}}>
          {loading?'...':'Find TZ'}
        </button>
      </div>
      {error&&<div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 mb-4">{error}</div>}
      {result&&(
        <div className="rounded-2xl border p-6 text-center" style={{background:'rgba(240,253,244,0.7)',borderColor:'rgba(187,247,208,0.6)'}}>
          <div className="text-3xl font-black text-green-600 mb-1">{TZ_LABELS[result.timezone]||result.timezone}</div>
          <div className="text-sm text-gray-500 mb-3">{result.timezone}</div>
          <div className="text-4xl font-mono font-bold text-gray-800 mb-3">{getLocalTime(result.timezone)}</div>
          <div className="text-gray-500">Current local time in {result.city}, {result.stateCode}</div>
        </div>
      )}
    </div>
  )
}
