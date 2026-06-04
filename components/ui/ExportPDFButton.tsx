'use client'
import { useState } from 'react'
import { exportFullPagePDF, exportResultsOnlyPDF, type ExportCategory } from '@/lib/exportPDF'

type BtnState = 'idle' | 'loading' | 'done'
interface BtnProps { title: string; category?: ExportCategory; compact?: boolean }

// ── Accent colours per category ───────────────────────────────────────────────
const ACCENTS: Record<string, { full: string; results: string; shadow: string }> = {
  Finance: { full: 'linear-gradient(135deg,#16a34a,#059669)', results: 'linear-gradient(135deg,#15803d,#166534)', shadow: 'rgba(22,163,74,.30)' },
  Health:  { full: 'linear-gradient(135deg,#ef4444,#dc2626)', results: 'linear-gradient(135deg,#dc2626,#b91c1c)', shadow: 'rgba(239,68,68,.30)'  },
  Dev:     { full: 'linear-gradient(135deg,#3b82f6,#2563eb)', results: 'linear-gradient(135deg,#2563eb,#1d4ed8)', shadow: 'rgba(59,130,246,.30)'  },
  Fun:     { full: 'linear-gradient(135deg,#8b5cf6,#7c3aed)', results: 'linear-gradient(135deg,#7c3aed,#6d28d9)', shadow: 'rgba(139,92,246,.30)'  },
}

const DONE_BG     = '#10b981'
const DONE_SHADOW = 'rgba(16,185,129,.35)'

// ── Shared button style ───────────────────────────────────────────────────────
function pdfButtonStyle(bg: string, shadow: string): React.CSSProperties {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '10px 18px',
    fontSize: '13px',
    fontWeight: 700,
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    background: bg,
    boxShadow: `0 4px 14px ${shadow}`,
    transition: 'filter .15s, transform .1s',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  }
}

// ── Icons ─────────────────────────────────────────────────────────────────────
const FullIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="12" y1="18" x2="12" y2="12"/>
    <line x1="9" y1="15" x2="15" y2="15"/>
  </svg>
)
const ResultIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="8" y1="13" x2="16" y2="13"/>
    <line x1="8" y1="17" x2="13" y2="17"/>
  </svg>
)
const Spinner = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
    style={{ animation: 'spin .8s linear infinite' }}>
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
  </svg>
)
const Check = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

// ── Full Report Button ────────────────────────────────────────────────────────
export function FullReportButton({ title, category = 'Finance' }: BtnProps) {
  const [state, setState] = useState<BtnState>('idle')
  const cat = ACCENTS[category as string] ?? ACCENTS.Finance

  const bg     = state === 'done' ? DONE_BG     : cat.full
  const shadow = state === 'done' ? DONE_SHADOW : cat.shadow

  const handle = () => {
    if (state !== 'idle') return
    setState('loading')
    setTimeout(() => {
      exportFullPagePDF({ title, category })
      setState('done')
      setTimeout(() => setState('idle'), 2500)
    }, 100)
  }

  return (
    <>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <button
        onClick={handle}
        disabled={state === 'loading'}
        style={pdfButtonStyle(bg, shadow)}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.filter = 'brightness(1.08)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.filter = '' }}
        onMouseDown={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.97)' }}
        onMouseUp={e => { (e.currentTarget as HTMLButtonElement).style.transform = '' }}
        title="Download full report PDF"
      >
        {state === 'loading' ? <Spinner /> : state === 'done' ? <Check /> : <FullIcon />}
        {state === 'loading' ? 'Preparing…' : state === 'done' ? 'Downloaded!' : 'Save Full Report'}
      </button>
    </>
  )
}

// ── Results Only Button ───────────────────────────────────────────────────────
export function ResultsOnlyButton({ title, category = 'Finance' }: BtnProps) {
  const [state, setState] = useState<BtnState>('idle')
  const cat = ACCENTS[category as string] ?? ACCENTS.Finance

  const bg     = state === 'done' ? DONE_BG     : cat.results
  const shadow = state === 'done' ? DONE_SHADOW : cat.shadow

  const handle = () => {
    if (state !== 'idle') return
    setState('loading')
    setTimeout(() => {
      exportResultsOnlyPDF({ title, category })
      setState('done')
      setTimeout(() => setState('idle'), 2500)
    }, 100)
  }

  return (
    <button
      onClick={handle}
      disabled={state === 'loading'}
      style={pdfButtonStyle(bg, shadow)}
      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.filter = 'brightness(1.08)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.filter = '' }}
      onMouseDown={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.97)' }}
      onMouseUp={e => { (e.currentTarget as HTMLButtonElement).style.transform = '' }}
      title="Save results-only PDF — 1 page, just your numbers"
    >
      {state === 'loading' ? <Spinner /> : state === 'done' ? <Check /> : <ResultIcon />}
      {state === 'loading' ? 'Preparing…' : state === 'done' ? 'Saved!' : 'Save Results Only'}
    </button>
  )
}

// ── Combined pair + legacy aliases ────────────────────────────────────────────
interface PairProps { title: string; category?: ExportCategory; compact?: boolean }

export function ExportButtonPair({ title, category = 'Finance' }: PairProps) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
      <FullReportButton  title={title} category={category} />
      <ResultsOnlyButton title={title} category={category} />
    </div>
  )
}

export function ExportPDFButton({ title, category = 'Finance' }: PairProps) {
  return <ExportButtonPair title={title} category={category} />
}

export function ExportPDFBar({ title, category = 'Finance' }: { title: string; category?: ExportCategory }) {
  const bg = category === 'Health' ? 'from-rose-50 to-red-50 border-rose-100'
    : category === 'Dev'  ? 'from-blue-50 to-indigo-50 border-blue-100'
    : category === 'Fun'  ? 'from-purple-50 to-violet-50 border-purple-100'
    : 'from-green-50 to-emerald-50 border-green-100'
  const tc = category === 'Health' ? 'text-rose-700' : category === 'Dev' ? 'text-blue-700' : category === 'Fun' ? 'text-purple-700' : 'text-green-700'
  return (
    <div className={`flex items-center justify-between gap-4 rounded-2xl border bg-gradient-to-r ${bg} px-5 py-3.5 mb-4`}>
      <div>
        <p className={`text-xs font-bold uppercase tracking-wider ${tc}`}>📄 Export as PDF</p>
        <p className="text-sm text-gray-500">Full report or results only (1 page)</p>
      </div>
      <ExportButtonPair title={title} category={category} />
    </div>
  )
}
