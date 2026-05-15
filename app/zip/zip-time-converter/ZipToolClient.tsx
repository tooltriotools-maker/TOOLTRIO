'use client'
import { useState, useEffect } from 'react'

const TZ_LABELS: Record<string,string> = {
  'America/New_York':'Eastern (ET)','America/Chicago':'Central (CT)',
  'America/Denver':'Mountain (MT)','America/Los_Angeles':'Pacific (PT)',
  'America/Phoenix':'Mountain (No DST)','America/Anchorage':'Alaska (AKT)',
  'Pacific/Honolulu':'Hawaii (HT)','America/Indiana/Indianapolis':'Eastern (No DST)',
}

const PRESETS = [
  {zip:'10001',label:'NYC'},
  {zip:'90210',label:'LA'},
  {zip:'60601',label:'Chicago'},
  {zip:'98101',label:'Seattle'},
  {zip:'96813',label:'Honolulu'},
]

export default function ZipToolClient() {
  const [zip1, setZip1] = useState('10001')
  const [zip2, setZip2] = useState('90210')
  const [r1, setR1] = useState<any>(null)
  const [r2, setR2] = useState<any>(null)
  const [now, setNow] = useState(new Date())

  useEffect(() => { const t = setInterval(()=>setNow(new Date()),1000); return()=>clearInterval(t) },[])

  async function loadZip(z: string, setter: (v:any)=>void) {
    if (!/^\d{5}$/.test(z)) return
    const res = await fetch(`/api/zip/lookup?zip=${z}`)
    if (res.ok) { const data = await res.json(); setter(data) }
  }

  useEffect(()=>{ loadZip('10001', setR1); loadZip('90210', setR2) },[])

  function getTime(tz: string) {
    try { return now.toLocaleTimeString('en-US',{timeZone:tz,hour12:true,hour:'2-digit',minute:'2-digit',second:'2-digit'}) }
    catch { return '--:--:--' }
  }
  function getDate(tz: string) {
    try { return now.toLocaleDateString('en-US',{timeZone:tz,weekday:'short',month:'short',day:'numeric'}) }
    catch { return '' }
  }

  const panels = [{zip:zip1,setZip:setZip1,rec:r1,setRec:setR1,label:'ZIP Code 1'},{zip:zip2,setZip:setZip2,rec:r2,setRec:setR2,label:'ZIP Code 2'}]

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="text-xs text-gray-400 self-center">Quick presets:</span>
        {PRESETS.map(p=>(
          <button key={p.zip} onClick={()=>{setZip1(p.zip);loadZip(p.zip,setR1)}}
            className="text-xs px-3 py-1.5 rounded-full border border-green-200 text-green-700 bg-white hover:bg-green-50 font-mono transition-all">
            {p.zip} ({p.label})
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {panels.map((item,i)=>(
          <div key={i}>
            <label className="text-sm font-semibold text-gray-600 block mb-1">{item.label}</label>
            <div className="flex gap-1 mb-3">
              <input value={item.zip} onChange={e=>item.setZip(e.target.value.replace(/\D/g,''))}
                onBlur={()=>loadZip(item.zip,item.setRec)} maxLength={5}
                className="flex-1 border-2 rounded-xl px-3 py-2 font-mono focus:outline-none focus:border-green-500"
                style={{borderColor:'#e2e8f0',background:'rgba(255,255,255,0.9)'}} />
              <button onClick={()=>loadZip(item.zip,item.setRec)}
                className="px-3 py-2 text-white text-sm rounded-xl"
                style={{background:'linear-gradient(135deg,#22c55e,#16a34a)'}}>Go</button>
            </div>
            {item.rec ? (
              <div className="rounded-2xl border p-4 text-center" style={{background:'rgba(240,253,244,0.7)',borderColor:'rgba(187,247,208,0.6)'}}>
                <div className="text-2xl font-black font-mono text-green-700">{getTime(item.rec.timezone)}</div>
                <div className="text-sm text-gray-500">{getDate(item.rec.timezone)}</div>
                <div className="text-xs text-gray-400 mt-1">{item.rec.city}, {item.rec.stateCode}</div>
                <div className="text-xs text-gray-400">{TZ_LABELS[item.rec.timezone]||item.rec.timezone}</div>
              </div>
            ) : (
              <div className="rounded-2xl border p-4 text-center text-gray-300" style={{borderColor:'rgba(226,232,240,0.5)'}}>
                Enter a ZIP to see time
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
