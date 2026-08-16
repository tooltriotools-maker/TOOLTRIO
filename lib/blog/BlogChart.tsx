import React from 'react'

type BlogChartSpec = {
  type: 'bar' | 'line'
  title: string
  description?: string
  labels: string[]
  values: number[]
  source?: string
}

export function BlogChart({ spec }: { spec: BlogChartSpec }) {
  const max = Math.max(...spec.values, 1)
  const width = 760
  const height = 300
  const left = 48
  const bottom = 58
  const top = 30
  const plotW = width - left - 24
  const plotH = height - top - bottom
  const step = plotW / Math.max(spec.values.length, 1)
  const points = spec.values.map((v, i) => ({ x: left + step * i + step / 2, y: top + plotH - (v / max) * plotH, v, label: spec.labels[i] ?? '' }))

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <figcaption className="mb-4">
        <div className="text-base font-black text-slate-950">{spec.title}</div>
        {spec.description && <div className="mt-1 text-sm leading-relaxed text-slate-600">{spec.description}</div>}
      </figcaption>
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={spec.title} className="min-w-[620px] w-full h-auto">
          {[0.25,0.5,0.75,1].map((ratio) => { const y=top+plotH-(ratio*plotH); return <line key={ratio} x1={left} x2={width-24} y1={y} y2={y} stroke="#e2e8f0" strokeWidth="1" /> })}
          {spec.type === 'bar' ? points.map((p,i) => { const barW=Math.min(74,step*0.58); const y=p.y; return <g key={i}><rect x={p.x-barW/2} y={y} width={barW} height={top+plotH-y} rx="8" fill="#10b981" opacity="0.9"/><text x={p.x} y={height-28} textAnchor="middle" fontSize="11" fill="#475569">{p.label}</text><text x={p.x} y={Math.max(16,y-7)} textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">{Number.isInteger(p.v)?p.v:p.v.toFixed(2)}</text></g> }) : <polyline points={points.map(p=>`${p.x},${p.y}`).join(' ')} fill="none" stroke="#059669" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>}
          {spec.type === 'line' && points.map((p,i)=><g key={i}><circle cx={p.x} cy={p.y} r="5" fill="#059669"/><text x={p.x} y={height-28} textAnchor="middle" fontSize="11" fill="#475569">{p.label}</text><text x={p.x} y={Math.max(16,p.y-9)} textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">{Number.isInteger(p.v)?p.v:p.v.toFixed(2)}</text></g>)}
        </svg>
      </div>
      {spec.source && <div className="mt-3 border-t border-slate-100 pt-3 text-xs text-slate-500">Source / note: {spec.source}</div>}
    </figure>
  )
}
