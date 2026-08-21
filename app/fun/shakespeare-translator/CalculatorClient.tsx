'use client'
import { DevToolLayout } from '@/components/ui/DevToolLayout'
import { SEOContent } from '@/components/ui/SEOContent'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Copy, Check } from 'lucide-react'
import { translate, getMeanings, type Direction } from '@/lib/fun/shakespeareTranslate'
import { ALL_SHAKESPEARE_ENTRIES, CATEGORY_LABELS, getAllCategories, type WordCategory } from '@/lib/fun/shakespeareDictionary'
import { INSULT_GENERATORS } from '@/lib/fun/insult-generators'

interface Props { faqs: { question: string; answer: string }[] }

const EXAMPLES: Record<Direction, string[]> = {
  toShakespeare: [
    'Why are you so foolish?',
    'I love you and I always will.',
    'Get out, you stupid coward!',
    'Good morning, my friend.',
  ],
  toModern: [
    'Wherefore art thou so beef-witted?',
    'Thou art a foul, villainous knave.',
    'Prithee, come hither, goodfellow.',
    "Good morrow — how now, sirrah?",
  ],
}

export default function CalculatorClient({ faqs }: Props) {
  const searchParams = useSearchParams()
  const [tab, setTab] = useState<'translator' | 'glossary'>('translator')
  // Default: Shakespearean → Modern English, so a first-time visitor (often
  // arriving from an insult generator) sees "translate this old English"
  // rather than the reverse.
  const [direction, setDirection] = useState<Direction>('toModern')
  const [input, setInput] = useState("Good morrow — how now, sirrah?")
  const [copied, setCopied] = useState(false)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<WordCategory | 'all'>('all')

  // Prefill from links like /fun/shakespeare-translator?text=...&dir=toModern
  // (used by every insult generator's "Translate this" button).
  useEffect(() => {
    const text = searchParams.get('text')
    const dir = searchParams.get('dir')
    if (text) setInput(text)
    if (dir === 'toShakespeare' || dir === 'toModern') setDirection(dir)
  }, [searchParams])

  const output = useMemo(() => translate(input, direction), [input, direction])
  const meanings = useMemo(() => getMeanings(input + ' ' + output), [input, output])

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500) }

  const categories = getAllCategories()
  const filteredEntries = ALL_SHAKESPEARE_ENTRIES.filter(e => {
    const matchesCategory = activeCategory === 'all' || e.category === activeCategory
    const q = search.trim().toLowerCase()
    const matchesSearch = !q || e.modern.includes(q) || e.shakespearean.includes(q) || e.meaning.toLowerCase().includes(q)
    return matchesCategory && matchesSearch
  })

  return (
    <DevToolLayout
      title="Shakespeare English Translator"
      icon="🪶"
      description="Translate any sentence between modern English and Shakespearean / Elizabethan English — with a full glossary of every word's meaning."
      category="Fun"
      parentPath="/fun"
      parentLabel="Fun & Entertainment"
    >
      {/* Tabs */}
      <div className="flex rounded-xl overflow-hidden border-2 border-purple-200 mb-6">
        <button onClick={() => setTab('translator')}
          className={`flex-1 py-2.5 text-sm font-bold transition-all ${tab === 'translator' ? 'bg-purple-600 text-white' : 'bg-white text-gray-500 hover:bg-purple-50'}`}>
          🔁 Translator
        </button>
        <button onClick={() => setTab('glossary')}
          className={`flex-1 py-2.5 text-sm font-bold transition-all ${tab === 'glossary' ? 'bg-purple-600 text-white' : 'bg-white text-gray-500 hover:bg-purple-50'}`}>
          📖 Full Word Glossary ({ALL_SHAKESPEARE_ENTRIES.length})
        </button>
      </div>

      {tab === 'translator' ? (
        <>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 text-center">Translation Direction — tap to switch</p>
          <div className="flex rounded-xl overflow-hidden border-2 border-purple-200 mb-6">
            <button
              onClick={() => setDirection('toShakespeare')}
              className={`flex-1 py-3 text-sm font-bold transition-all ${direction === 'toShakespeare' ? 'bg-purple-600 text-white' : 'bg-white text-gray-500 hover:bg-purple-50'}`}
            >
              English → Shakespearean
            </button>
            <button
              onClick={() => setDirection('toModern')}
              className={`flex-1 py-3 text-sm font-bold transition-all ${direction === 'toModern' ? 'bg-purple-600 text-white' : 'bg-white text-gray-500 hover:bg-purple-50'}`}
            >
              Shakespearean → English
            </button>
          </div>

          <div className="rounded-2xl border p-6 mb-4 shadow-sm" style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)', borderColor: 'rgba(226,232,240,0.8)', boxShadow: '0 4px 16px rgba(15,23,42,0.05)' }}>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">
              {direction === 'toShakespeare' ? 'Modern English Input' : 'Shakespearean English Input'}
            </label>
            <textarea value={input} onChange={e => setInput(e.target.value)} rows={4}
              className="w-full text-sm p-4 border-2 border-gray-200 focus:border-purple-400 rounded-xl focus:outline-none resize-none" />
            <div className="flex flex-wrap gap-2 mt-3">
              {EXAMPLES[direction].map(ex => (
                <button key={ex} onClick={() => setInput(ex)} className="px-3 py-1 text-xs font-semibold bg-gray-100 hover:bg-purple-50 hover:text-purple-700 rounded-lg border border-gray-200">{ex}</button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-2xl p-6 mb-2">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold text-purple-700 uppercase tracking-wide">
                {direction === 'toShakespeare' ? 'Shakespearean Output' : 'Modern English Output'}
              </label>
              <button onClick={copy} className="flex items-center gap-1 text-xs font-bold text-purple-600">
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <p className="text-lg font-semibold text-gray-800 leading-relaxed italic">{output || '—'}</p>
          </div>

          <div className="text-center mb-6">
            <button
              onClick={() => { setDirection(d => d === 'toShakespeare' ? 'toModern' : 'toShakespeare'); setInput(output || input) }}
              className="text-xs font-bold text-purple-500 hover:text-purple-700 underline underline-offset-2"
            >
              ⇄ Use this result as the new input &amp; switch direction
            </button>
          </div>

          {meanings.length > 0 && (
            <div className="rounded-2xl border p-5 mb-6" style={{ background: 'rgba(255,255,255,0.82)', backdropFilter: 'blur(8px)', borderColor: 'rgba(226,232,240,0.7)' }}>
              <h2 className="font-bold text-gray-900 mb-3">📚 Word-by-Word Meanings</h2>
              <p className="text-xs text-gray-500 mb-4">Every dictionary word or phrase used in this translation, with its plain-English meaning — dynamically pulled from our full Shakespearean word library.</p>
              <div className="space-y-2">
                {meanings.map(m => (
                  <div key={m.shakespearean + m.modern} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 border-b border-gray-100 pb-2 last:border-0">
                    <div className="flex items-center gap-2 flex-shrink-0 min-w-[180px]">
                      <span className="font-bold text-purple-700 text-sm capitalize">{m.shakespearean}</span>
                      {m.modern && <span className="text-gray-300 text-xs">↔</span>}
                      {m.modern && <span className="font-semibold text-gray-600 text-sm capitalize">{m.modern}</span>}
                    </div>
                    <span className="text-sm text-gray-600">{m.meaning}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="rounded-2xl border p-5 mb-4" style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)', borderColor: 'rgba(226,232,240,0.8)' }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search any word or meaning…"
              className="w-full text-sm p-3 border-2 border-gray-200 focus:border-purple-400 rounded-xl focus:outline-none mb-3" />
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setActiveCategory('all')}
                className={`px-3 py-1 text-xs font-bold rounded-lg border-2 ${activeCategory === 'all' ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-500 border-gray-200 hover:border-purple-300'}`}>
                All ({ALL_SHAKESPEARE_ENTRIES.length})
              </button>
              {categories.map(cat => {
                const count = ALL_SHAKESPEARE_ENTRIES.filter(e => e.category === cat).length
                if (!count) return null
                return (
                  <button key={cat} onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1 text-xs font-bold rounded-lg border-2 ${activeCategory === cat ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-500 border-gray-200 hover:border-purple-300'}`}>
                    {CATEGORY_LABELS[cat]} ({count})
                  </button>
                )
              })}
            </div>
          </div>

          <div className="rounded-2xl border overflow-hidden mb-6" style={{ background: 'rgba(255,255,255,0.82)', borderColor: 'rgba(226,232,240,0.7)' }}>
            <div className="grid grid-cols-[1fr_1fr_2fr] gap-2 px-4 py-2 bg-purple-50 border-b border-purple-100 text-[11px] font-bold text-purple-700 uppercase tracking-wide">
              <span>Modern</span><span>Shakespearean</span><span>Meaning</span>
            </div>
            <div className="max-h-[560px] overflow-y-auto divide-y divide-gray-100">
              {filteredEntries.length === 0 ? (
                <p className="text-sm text-gray-400 p-6 text-center">No words match your search.</p>
              ) : filteredEntries.map((e, i) => (
                <div key={e.shakespearean + e.modern + i} className="grid grid-cols-[1fr_1fr_2fr] gap-2 px-4 py-3 text-sm hover:bg-purple-50/50">
                  <span className="font-semibold text-gray-700 capitalize">{e.modern}</span>
                  <span className="font-bold text-purple-700 capitalize">{e.shakespearean}</span>
                  <span className="text-gray-500 text-xs leading-relaxed">{e.meaning}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ─── SEO Content ─── */}
      <div className="mt-12 space-y-10 max-w-2xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-100" />
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3">About This Tool</span>
          <div className="h-px flex-1 bg-gray-100" />
        </div>

        <section>
          <h2 className="text-xl font-black text-gray-900 mb-3">What Does This Shakespeare Translator Do?</h2>
          <p className="text-gray-600 leading-relaxed">This tool translates full sentences between modern English and Shakespearean / Elizabethan English in both directions, using a fully dynamic word-and-phrase dictionary — not a fixed script. Type a sentence, and every recognized word or phrase is swapped for its period-appropriate equivalent while everything else is left untouched, so the output stays readable. Pair it with the <Link href="/fun/shakespeare-insult-generator" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">Shakespeare Insult Generator</Link> for a full night of Elizabethan wordplay.</p>
        </section>

        <section className="bg-purple-50 border border-purple-100 rounded-2xl p-6">
          <h2 className="text-xl font-black text-purple-800 mb-3">🔬 How It Works</h2>
          <p className="text-gray-700 leading-relaxed mb-3">Every word in the library is stored as a linked pair — a modern word, its Shakespearean equivalent, and a plain-English meaning — so the same dictionary drives translation in both directions and also powers the meanings panel underneath your result. Longer phrases (like &ldquo;wherefore art thou&rdquo;) are matched first, then individual words, so idioms translate as a unit instead of word-by-word nonsense.</p>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-white rounded-xl p-3 border border-purple-100">
              <p className="font-black text-purple-700 text-lg">{ALL_SHAKESPEARE_ENTRIES.length}+</p>
              <p className="text-gray-600 font-semibold">Words &amp; phrases in the library</p>
            </div>
            <div className="bg-white rounded-xl p-3 border border-purple-100">
              <p className="font-black text-purple-700 text-lg">2-way</p>
              <p className="text-gray-600 font-semibold">Modern ↔ Shakespearean, live</p>
            </div>
          </div>
        </section>

        <section className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">🎉 Fun Fact</p>
          <p className="text-gray-700 leading-relaxed text-sm">Shakespeare is credited with introducing hundreds of words and phrases into English that are still used today, including &ldquo;eyeball,&rdquo; &ldquo;bedroom,&rdquo; and the idiom &ldquo;green-eyed monster&rdquo; for jealousy. Meanwhile, some of his most common words — &ldquo;thou,&rdquo; &ldquo;hath,&rdquo; &ldquo;wherefore&rdquo; — have almost entirely fallen out of everyday use, which is exactly why a translator like this one is useful.</p>
        </section>

        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">💡 Tips for the Best Results</h2>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>Keep sentences simple and direct — the dictionary matches whole words and common phrases, so plain, short sentences translate more cleanly than heavily idiomatic modern slang.</span></li>
            <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>Check the Word-by-Word Meanings panel after translating — it explains exactly why each word changed, which makes this genuinely useful for studying Shakespeare&apos;s plays, not just for jokes.</span></li>
            <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>Browse the Full Word Glossary tab any time — it&apos;s the complete dictionary behind the translator, searchable and filterable by category.</span></li>
          </ul>
        </section>

        <section className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-2">📲 How to Share</p>
          <p className="text-gray-700 text-sm leading-relaxed">Translate your next group chat message into Shakespearean before sending it. &ldquo;Wherefore art thou late again&rdquo; lands very differently than &ldquo;why are you late again.&rdquo;</p>
        </section>

        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Example Translations</h2>
          <ul className="space-y-3 text-gray-700">
            <li>• <span className="font-semibold">Modern:</span> <span className="italic">Why are you so foolish?</span> → <span className="font-semibold text-purple-700">Shakespearean:</span> <span className="italic">Wherefore art thou so addle-pated?</span></li>
            <li>• <span className="font-semibold">Modern:</span> <span className="italic">Good morning, my friend.</span> → <span className="font-semibold text-purple-700">Shakespearean:</span> <span className="italic">Good morrow, mine goodfellow.</span></li>
            <li>• <span className="font-semibold">Shakespearean:</span> <span className="italic">Prithee, come hither.</span> → <span className="font-semibold text-purple-700">Modern:</span> <span className="italic">Please, come here.</span></li>
          </ul>
        </section>

        <section>
          <div className="rounded-3xl border overflow-hidden" style={{ background: 'rgba(255,255,255,0.82)', backdropFilter: 'blur(10px)', borderColor: 'rgba(255,255,255,0.55)', boxShadow: '0 8px 30px rgba(15,23,42,0.05)' }}>
            <div className="px-6 py-4 border-b border-gray-100 bg-purple-50">
              <h2 className="text-lg font-bold text-gray-900">🎭 Every Insult &amp; Roast Generator</h2>
              <p className="text-sm text-gray-500 mt-0.5">Every generator below uses this same word library for its meanings panel.</p>
            </div>
            <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {INSULT_GENERATORS.map(g => {
                const href = g.slug === 'shakespeare-insult-generator' ? '/fun/shakespeare-insult-generator' : `/fun/insult-generator/${g.slug}`
                return (
                  <Link key={g.slug} href={href}
                    className="flex items-center gap-2 p-3 rounded-2xl border group transition-all"
                    style={{ borderColor: 'rgba(216,180,254,0.5)' }}>
                    <span className="text-lg flex-shrink-0">{g.icon}</span>
                    <span className="text-sm font-semibold text-gray-700 group-hover:text-purple-700 leading-tight">{g.name.replace(' Generator', '')}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">{faqs.map(f => <details key={f.question} className="rounded-2xl border p-4" style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)', borderColor: 'rgba(226,232,240,0.7)', boxShadow: '0 4px 16px rgba(15,23,42,0.04)' }}><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
        </section>

        <SEOContent
          title=""
          category="fun"
          intro="This Shakespeare English translator converts full sentences between modern English and Elizabethan English using a growing, fully dynamic dictionary of words, grammar forms, and phrases — every entry carries a plain-English meaning, not just a swapped word."
          howItWorks="Type or paste a sentence, choose a direction, and the translator matches phrases first, then individual words, against the dictionary — swapping each match while preserving capitalization and leaving unmatched words untouched."
          tipsSection="Use the Word-by-Word Meanings panel to understand exactly why a word changed — it's built from the same library as the Full Word Glossary tab, so nothing is a black box."
          conclusion="Whether you're studying a Shakespeare play, writing a Renaissance fair script, or just want to talk like the Bard for a laugh, this translator and its glossary make the language approachable."
          benefits={[
            { title: 'Fully dynamic dictionary', text: 'Every word pair is looked up live, in both directions, from one shared library.' },
            { title: 'Meanings included', text: 'Every translated word comes with a plain-English explanation, not just a swap.' },
          ]}
          useCases={[
            { title: 'Studying Shakespeare', text: 'Decode unfamiliar words from plays and sonnets instantly.' },
            { title: 'Creative writing & roleplay', text: 'Write dialogue, party invitations, or Renaissance fair scripts in period voice.' },
          ]}
        />
      </div>
    </DevToolLayout>
  )
}
