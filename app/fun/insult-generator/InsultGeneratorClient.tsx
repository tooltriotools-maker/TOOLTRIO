'use client'

import { useEffect, useMemo, useState } from 'react'
import { Copy, Check, RefreshCw, Share2, Sparkles, ShieldCheck } from 'lucide-react'
import type { InsultTool } from './data'

function randomIndex(max: number) {
  if (max <= 1) return 0
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const buffer = new Uint32Array(1)
    crypto.getRandomValues(buffer)
    return buffer[0] % max
  }
  return Math.floor(Math.random() * max)
}

function pick<T>(items: T[]) {
  return items[randomIndex(items.length)]
}

function makeInsult(tool: InsultTool, intensity: 'playful' | 'bold' | 'theatrical') {
  const library = tool.library ?? {
    adjectives: tool.adjectives,
    nouns: tool.nouns,
    endings: tool.endings,
  }
  const a = pick(library.adjectives)
  const n = pick(library.nouns)
  const e = pick(library.endings)

  if (intensity === 'theatrical') return `Thou ${a} ${n}, ${e}!`
  if (intensity === 'bold') return `You ${a} ${n} ${e}.`
  return `You absolute ${a} ${n} — ${e}.`
}

function storageKey(tool: InsultTool) {
  return `tooltrio:insult-history:${tool.slug}`
}

function readHistory(tool: InsultTool): string[] {
  try {
    const raw = window.sessionStorage.getItem(storageKey(tool))
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeHistory(tool: InsultTool, history: string[]) {
  try {
    window.sessionStorage.setItem(storageKey(tool), JSON.stringify(history.slice(-100)))
  } catch {
    // Storage can be unavailable in private browsing or restricted environments.
  }
}

function generateFresh(tool: InsultTool, intensity: 'playful' | 'bold' | 'theatrical') {
  const history = readHistory(tool)
  let candidate = makeInsult(tool, intensity)
  let attempts = 0

  // Avoid recently shown results. With 1M+ combinations this is normally one attempt.
  while (history.includes(candidate) && attempts < 30) {
    candidate = makeInsult(tool, intensity)
    attempts += 1
  }

  writeHistory(tool, [...history, candidate])
  return candidate
}

export function InsultGeneratorClient({ tool }: { tool: InsultTool }) {
  const [intensity, setIntensity] = useState<'playful' | 'bold' | 'theatrical'>('playful')
  const [result, setResult] = useState(() => {
    // Deterministic first render prevents a hydration mismatch. The client refreshes
    // it immediately after mount using the persistent per-tool history.
    const a = tool.library?.adjectives[0] ?? tool.adjectives[0]
    const n = tool.library?.nouns[0] ?? tool.nouns[0]
    const e = tool.library?.endings[0] ?? tool.endings[0]
    return `You absolute ${a} ${n} — ${e}.`
  })
  const [copied, setCopied] = useState(false)

  const library = tool.library ?? {
    adjectives: tool.adjectives,
    nouns: tool.nouns,
    endings: tool.endings,
  }

  const counter = useMemo(
    () => library.adjectives.length * library.nouns.length * library.endings.length,
    [library]
  )

  useEffect(() => {
    setResult(generateFresh(tool, intensity))
    // Only refresh the initial result when the page mounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function generate() {
    setResult(generateFresh(tool, intensity))
    setCopied(false)
  }

  function changeIntensity(mode: 'playful' | 'bold' | 'theatrical') {
    setIntensity(mode)
    setResult(generateFresh(tool, mode))
    setCopied(false)
  }

  async function copyResult() {
    await navigator.clipboard.writeText(result)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  async function shareResult() {
    if (navigator.share) {
      await navigator.share({ title: tool.title, text: result, url: window.location.href })
    } else {
      await copyResult()
    }
  }

  return (
    <section aria-label={`${tool.title} interactive generator`} className="relative overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-2xl shadow-gray-200/60">
      <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-fuchsia-100 blur-3xl" />
      <div className="absolute -left-24 bottom-0 h-48 w-48 rounded-full bg-amber-100 blur-3xl" />

      <div className="relative p-5 sm:p-8 lg:p-10">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-bold text-gray-700">
            <Sparkles className="h-3.5 w-3.5" /> 1M+ combinations · browser-based
          </div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700">
            <ShieldCheck className="h-4 w-4" /> Playful, non-targeted humor
          </div>
        </div>

        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          {(['playful', 'bold', 'theatrical'] as const).map(mode => (
            <button
              key={mode}
              type="button"
              onClick={() => changeIntensity(mode)}
              className={`rounded-2xl border px-4 py-3 text-sm font-bold capitalize transition-all ${
                intensity === mode
                  ? 'border-gray-900 bg-gray-900 text-white shadow-lg'
                  : 'border-gray-200 bg-white text-gray-700 hover:-translate-y-0.5 hover:border-gray-400'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        <div className="min-h-[180px] rounded-[1.5rem] border border-gray-200 bg-gradient-to-br from-gray-50 via-white to-fuchsia-50 p-6 sm:p-8 flex items-center">
          <p className="w-full text-center text-2xl font-black leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
            “{result}”
          </p>
        </div>

        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={generate} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gray-900 px-5 py-3 text-sm font-extrabold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-gray-800">
            <RefreshCw className="h-4 w-4" /> Generate another
          </button>
          <button type="button" onClick={copyResult} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-300 bg-white px-5 py-3 text-sm font-extrabold text-gray-800 transition hover:-translate-y-0.5 hover:border-gray-500">
            {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button type="button" onClick={shareResult} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-300 bg-white px-5 py-3 text-sm font-extrabold text-gray-800 transition hover:-translate-y-0.5 hover:border-gray-500">
            <Share2 className="h-4 w-4" /> Share
          </button>
        </div>

        <div className="mt-6 grid gap-3 text-center sm:grid-cols-3">
          <div className="rounded-2xl bg-gray-50 px-3 py-3">
            <div className="text-lg font-black text-gray-900">{library.adjectives.length.toLocaleString()}</div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500">descriptors</div>
          </div>
          <div className="rounded-2xl bg-gray-50 px-3 py-3">
            <div className="text-lg font-black text-gray-900">{library.nouns.length.toLocaleString()}</div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500">characters</div>
          </div>
          <div className="rounded-2xl bg-gray-50 px-3 py-3">
            <div className="text-lg font-black text-gray-900">{counter.toLocaleString()}+</div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500">combinations</div>
          </div>
        </div>

        <p className="mt-5 text-center text-xs leading-relaxed text-gray-500">
          Every insult style has its own expanded vocabulary library. Recent results are remembered in this browser session, so refreshing the page generates a fresh combination instead of immediately repeating the last one.
        </p>
      </div>
    </section>
  )
}
