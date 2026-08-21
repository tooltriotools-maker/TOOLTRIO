'use client'
import { Card } from '@/components/ui/Card'
import { DevToolLayout } from '@/components/ui/DevToolLayout'
import { SEOContent } from '@/components/ui/SEOContent'
import { useEffect, useMemo, useState } from 'react'

interface Props { faqs: { question: string; answer: string }[] }

interface DictEntry { e: string; n: string; g: string; k: string[] }
interface EmojiData { entries: DictEntry[]; keywordMap: Record<string, string>; maxPhraseWords: number }
interface SlangData { meanings: Record<string, string>; phrases: Record<string, string> }

const GROUPS = [
  'Smileys & Emotion', 'People & Body', 'Animals & Nature', 'Food & Drink',
  'Travel & Places', 'Activities', 'Objects', 'Symbols', 'Flags',
] as const

const GROUP_ICON: Record<string, string> = {
  'Smileys & Emotion': '😊', 'People & Body': '🧑', 'Animals & Nature': '🐾', 'Food & Drink': '🍔',
  'Travel & Places': '✈️', 'Activities': '⚽', 'Objects': '💡', 'Symbols': '🔣', 'Flags': '🚩',
}

function escapeRegex(s: string) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') }

export default function CalculatorClient({ faqs }: Props) {
  const [data, setData] = useState<EmojiData | null>(null)
  const [slang, setSlang] = useState<SlangData | null>(null)
  const [loadError, setLoadError] = useState('')
  const [input, setInput] = useState('')
  const [mode, setMode] = useState<'text2emoji' | 'emoji2text'>('text2emoji')
  const [slangMode, setSlangMode] = useState(false)
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)
  const [search, setSearch] = useState('')
  const [activeGroup, setActiveGroup] = useState<string>('All')

  useEffect(() => {
    let cancelled = false
    Promise.all([
      fetch('/data/emoji-dictionary.json').then(res => {
        if (!res.ok) throw new Error(`Failed to load emoji dictionary: ${res.status}`)
        return res.json()
      }),
      fetch('/data/emoji-slang.json').then(res => {
        if (!res.ok) throw new Error(`Failed to load emoji slang data: ${res.status}`)
        return res.json()
      }),
    ])
      .then(([dict, slangData]: [EmojiData, SlangData]) => {
        if (cancelled) return
        setData(dict)
        setSlang(slangData)
      })
      .catch(() => { if (!cancelled) setLoadError('Could not load the emoji dictionary. Please refresh.') })
    return () => { cancelled = true }
  }, [])

  // Reverse-match regex: longest emoji strings first so multi-codepoint sequences
  // (flags, ZWJ family/profession combos) are matched whole, not codepoint-by-codepoint.
  const emojiRegex = useMemo(() => {
    if (!data) return null
    const sorted = [...data.entries].sort((a, b) => b.e.length - a.e.length)
    return new RegExp(sorted.map(en => escapeRegex(en.e)).join('|'), 'gu')
  }, [data])

  const emojiToName = useMemo(() => {
    const map: Record<string, string> = {}
    data?.entries.forEach(en => { map[en.e] = en.n })
    return map
  }, [data])

  // Effective word/phrase → emoji map for THIS translation: slang phrases (when
  // the toggle is on) are layered on top so they win over the literal dictionary —
  // "fire" resolves to 🔥 (slang) instead of a literal flame is the same either way,
  // but "no cap" only resolves correctly with slang mode on.
  function effectiveKeywordMap(): { map: Record<string, string>; maxPhraseWords: number } {
    if (!data) return { map: {}, maxPhraseWords: 1 }
    if (!slangMode || !slang) return { map: data.keywordMap, maxPhraseWords: data.maxPhraseWords }
    const merged = { ...data.keywordMap, ...slang.phrases }
    const slangMax = Math.max(...Object.keys(slang.phrases).map(k => k.split(' ').length))
    return { map: merged, maxPhraseWords: Math.max(data.maxPhraseWords, slangMax) }
  }

  function textToEmoji(text: string): string {
    if (!data) return text
    const { map: keywordMap, maxPhraseWords } = effectiveKeywordMap()
    // Alternating word / separator tokens (separators = whitespace + punctuation runs).
    const tokens = text.match(/[A-Za-z']+|[^A-Za-z']+/g) || []
    const wordIdx: number[] = []
    tokens.forEach((t, i) => { if (/^[A-Za-z']+$/.test(t)) wordIdx.push(i) })

    const result = [...tokens]
    let skipUntilWordPos = -1

    for (let wp = 0; wp < wordIdx.length; wp++) {
      if (wp <= skipUntilWordPos) continue
      const startTok = wordIdx[wp]

      let matchedSpan = 0
      let matchedEmoji = ''
      const maxSpan = Math.min(maxPhraseWords, wordIdx.length - wp)

      // Try the longest phrase first (e.g. "no cap" before just "cap").
      for (let span = maxSpan; span >= 1; span--) {
        const endWp = wp + span - 1
        // Words in the phrase must be joined by exactly one plain space — commas,
        // newlines, or double spaces break the phrase.
        let contiguous = true
        for (let j = wp; j < endWp; j++) {
          if (wordIdx[j + 1] !== wordIdx[j] + 2 || tokens[wordIdx[j] + 1] !== ' ') { contiguous = false; break }
        }
        if (!contiguous) continue

        const words: string[] = []
        for (let j = wp; j <= endWp; j++) words.push(tokens[wordIdx[j]].toLowerCase())
        const emoji = keywordMap[words.join(' ')]
        if (emoji) { matchedSpan = span; matchedEmoji = emoji; break }
      }

      if (matchedEmoji) {
        const endWp = wp + matchedSpan - 1
        const endTok = wordIdx[endWp]
        for (let k = startTok; k <= endTok; k++) result[k] = ''
        result[startTok] = matchedEmoji
        skipUntilWordPos = endWp
      }
    }
    return result.join('')
  }

  function emojiToText(text: string): string {
    if (!emojiRegex) return text
    return text.replace(emojiRegex, m => {
      if (slangMode && slang?.meanings[m]) return `[${slang.meanings[m]}]`
      return emojiToName[m] ? `[${emojiToName[m]}]` : m
    })
  }

  function translate() {
    if (!input.trim() || !data) return
    const result = mode === 'text2emoji' ? textToEmoji(input) : emojiToText(input)
    setOutput(result)
  }

  function copy() {
    navigator.clipboard.writeText(output)
    setCopied(true); setTimeout(() => setCopied(false), 1500)
  }

  function share() {
    const text = `${mode === 'text2emoji' ? '📝→😊' : '😊→📝'} Emoji Translator\n\nInput: "${input}"\nOutput: "${output}"\n\nTranslate yours: tooltrio.com/fun/emoji-translator`
    if (navigator.share) navigator.share({ title: 'Emoji Translation', text })
    else navigator.clipboard.writeText(text).then(() => alert('Copied!'))
  }

  const EXAMPLES_T2E = slangMode
    ? ['no cap this slaps', 'she really said periodt', 'ngl this hits different', 'touch grass bro']
    : ['I am happy today', 'I love pizza and coffee', 'The dog is running in the rain', 'Give me a thumbs up']
  const EXAMPLES_E2T = slangMode
    ? ['💀😭🔥', '🚩🚩🚩', '🫡💯', '🗿']
    : ['❤️ 🐕 🏃 🌧️', '😊 ☕ 🍕', '🌟 💪 🚀 ✨', '🇯🇵 🇫🇷 🇧🇷']

  const filteredEntries = useMemo(() => {
    if (!data) return []
    const q = search.trim().toLowerCase()
    return data.entries.filter(en => {
      if (activeGroup !== 'All' && en.g !== activeGroup) return false
      if (!q) return true
      return en.n.includes(q) || en.k.some(k => k.includes(q))
    })
  }, [data, search, activeGroup])

  const slangEntries = useMemo(() => {
    if (!slang) return []
    const q = search.trim().toLowerCase()
    const list = Object.entries(slang.meanings)
    if (!q) return list
    return list.filter(([emoji, meaning]) => meaning.toLowerCase().includes(q) || emoji.includes(q))
  }, [slang, search])

  const totalEmoji = data?.entries.length ?? 0
  const totalKeywords = data ? Object.keys(data.keywordMap).length : 0
  const totalSlang = slang ? Object.keys(slang.meanings).length + Object.keys(slang.phrases).length : 0

  return (
    <DevToolLayout title="Emoji Translator" icon="😊"
      description={`Translate text to emoji or emoji to text — ${totalEmoji || '1,900'}+ official Unicode emoji, plus a Gen Z / Millennial slang mode with ${totalSlang || '125'}+ internet-slang meanings`}
      category="Fun" parentPath="/fun" parentLabel="Fun & Entertainment">

      {/* Mode toggle */}
      <div className="flex rounded-xl overflow-hidden border-2 border-yellow-200 mb-3">
        <button onClick={() => { setMode('text2emoji'); setOutput('') }}
          className={`flex-1 py-2.5 text-sm font-bold transition-all ${mode === 'text2emoji' ? 'bg-yellow-400 text-yellow-900' : 'bg-white text-gray-500 hover:bg-yellow-50'}`}>
          📝 → 😊 Text to Emoji
        </button>
        <button onClick={() => { setMode('emoji2text'); setOutput('') }}
          className={`flex-1 py-2.5 text-sm font-bold transition-all ${mode === 'emoji2text' ? 'bg-yellow-400 text-yellow-900' : 'bg-white text-gray-500 hover:bg-yellow-50'}`}>
          😊 → 📝 Emoji to Text
        </button>
      </div>

      {/* Slang mode toggle */}
      <button onClick={() => { setSlangMode(v => !v); setOutput('') }}
        className={`w-full flex items-center justify-between rounded-xl border-2 px-4 py-2.5 mb-4 transition-all ${slangMode ? 'bg-purple-50 border-purple-300' : 'border-gray-200 hover:border-purple-200'}`}>
        <span className="text-sm font-bold text-gray-700">😎 Gen Z / Millennial Slang Mode</span>
        <span className={`text-xs font-black px-2.5 py-1 rounded-full ${slangMode ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
          {slangMode ? 'ON' : 'OFF'}
        </span>
      </button>
      {slangMode && (
        <p className="text-xs text-gray-500 -mt-2 mb-4">
          Reads slang meanings, not just literal ones — 💀 becomes &quot;I&apos;m dead&quot;, 🚩 becomes a relationship &quot;red flag,&quot; and phrases like &quot;no cap&quot; or &quot;that slaps&quot; translate correctly.
        </p>
      )}

      {loadError && <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 mb-4 text-sm">{loadError}</div>}
      {!data && !loadError && (
        <div className="h-24 rounded-xl bg-gray-50 border border-gray-100 animate-pulse mb-4 flex items-center justify-center text-xs text-gray-400">
          Loading the full emoji dictionary…
        </div>
      )}

      {/* Examples */}
      <div className="mb-3">
        <p className="text-xs text-gray-500 mb-2 font-bold uppercase">Quick Examples</p>
        <div className="flex flex-wrap gap-2">
          {(mode === 'text2emoji' ? EXAMPLES_T2E : EXAMPLES_E2T).map(ex => (
            <button key={ex} onClick={() => setInput(ex)}
              className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:border-yellow-400 hover:bg-yellow-50 transition-all">
              {ex}
            </button>
          ))}
        </div>
      </div>

      <textarea value={input} onChange={e => setInput(e.target.value)}
        placeholder={mode === 'text2emoji' ? 'Type text to convert to emojis...' : 'Paste emojis to convert to text...'}
        rows={4}
        className="w-full border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400 mb-3 text-base resize-none"
        style={{ borderColor: '#e2e8f0' }} />

      <button onClick={translate} disabled={!data}
        className="w-full py-3 text-white font-black rounded-xl mb-4 disabled:opacity-50"
        style={{ background: 'linear-gradient(135deg,#f59e0b,#d97706)', boxShadow: '0 4px 16px rgba(245,158,11,0.3)' }}>
        {mode === 'text2emoji' ? '📝 → 😊 Translate to Emoji' : '😊 → 📝 Translate to Text'}
      </button>

      {output && (
        <div>
          <div className="rounded-2xl border-2 p-5 mb-3" style={{ background: 'linear-gradient(135deg,rgba(254,243,199,0.8),rgba(253,230,138,0.4))', borderColor: 'rgba(251,191,36,0.5)' }}>
            <p className="text-xs font-bold text-gray-500 uppercase mb-2">Result</p>
            <p className="text-xl leading-relaxed text-gray-800">{output}</p>
          </div>
          <div className="flex gap-2 mb-6">
            <button onClick={copy} className="flex-1 py-2 text-sm font-bold rounded-xl border-2 border-yellow-300 text-yellow-700 hover:bg-yellow-50">
              {copied ? '✅ Copied!' : '📋 Copy Result'}
            </button>
            <button onClick={share} className="flex-1 py-2 text-sm font-bold rounded-xl border-2 border-yellow-300 text-yellow-700 hover:bg-yellow-50">📤 Share</button>
          </div>
        </div>
      )}

      {/* Slang reference panel */}
      {slangMode && slang && (
        <div className="rounded-2xl border-2 border-purple-200 p-4 bg-purple-50/40 mb-4">
          <p className="text-xs font-bold text-purple-700 uppercase mb-3">
            😎 Slang Meanings ({Object.keys(slang.meanings).length} emoji, {Object.keys(slang.phrases).length} phrases)
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-56 overflow-y-auto">
            {slangEntries.slice(0, 60).map(([emoji, meaning]) => (
              <div key={emoji} className="flex items-start gap-2 text-xs text-gray-700 p-1">
                <span className="text-base shrink-0">{emoji}</span>
                <span>{meaning}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-purple-400 mt-2">
            Plus phrases like &quot;no cap,&quot; &quot;bet,&quot; &quot;mid,&quot; &quot;rizz,&quot; and &quot;touch grass&quot; in Text → Emoji mode.
          </p>
        </div>
      )}

      {/* Full searchable, categorized dictionary — every official Unicode emoji */}
      <div className="rounded-2xl border p-4 bg-white">
        <p className="text-xs font-bold text-gray-500 uppercase mb-3">
          📚 Full Emoji Dictionary ({totalEmoji || '1,900'}+ emoji across every Unicode category, worldwide)
        </p>

        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search meanings — e.g. love, dog, japan, thumbs up..."
          className="w-full border rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:border-yellow-400" />

        <div className="flex flex-wrap gap-1.5 mb-3">
          {['All', ...GROUPS].map(g => (
            <button key={g} onClick={() => setActiveGroup(g)}
              className={`text-[11px] px-2.5 py-1 rounded-full border font-semibold transition-all ${activeGroup === g ? 'bg-yellow-400 border-yellow-400 text-yellow-900' : 'border-gray-200 text-gray-500 hover:border-yellow-300'}`}>
              {g === 'All' ? '🌐 All' : `${GROUP_ICON[g]} ${g}`}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-64 overflow-y-auto">
          {filteredEntries.slice(0, 150).map(en => (
            <div key={en.e} className="flex items-center gap-2 text-xs text-gray-600 p-1" title={en.k.join(', ')}>
              <span className="text-base">{en.e}</span>
              <span className="truncate">{en.n}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-2">
          {filteredEntries.length === 0 ? 'No matches — try a different search.' :
            `Showing ${Math.min(150, filteredEntries.length)} of ${filteredEntries.length}${search || activeGroup !== 'All' ? ' matching' : ''} emoji`}
        </p>
      </div>

      <div className="mt-12 space-y-6 max-w-2xl mx-auto">
        <SEOContent title="" category="fun"
          intro={`The Emoji Translator converts text to emoji and emoji back to text using the complete official Unicode emoji set — ${totalEmoji || '1,900'}+ emoji spanning smileys, people, animals & nature, food & drink, travel & places, activities, objects, symbols, and every country flag — plus a Gen Z / Millennial slang mode covering ${totalSlang || '125'}+ internet-slang meanings and phrases.`}
          howItWorks="Type a sentence and each recognized word or short phrase is replaced with its matching emoji, longest phrase first. Turn on Slang Mode to translate internet slang like 'no cap,' 'bet,' or 'that slaps' into the right emoji, and to decode emoji using their real internet meaning (💀 = 'I'm dead,' 🚩 = a relationship red flag) instead of the literal Unicode name. Anything not in the dictionary is left as-is."
          tipsSection="Try short, direct phrases — 'I love pizza' works better than a long run-on sentence. With Slang Mode on, common internet phrases like 'no cap,' 'touch grass,' or 'left no crumbs' map to a single accurate emoji instead of translating word by word."
          conclusion="The dictionary is built from the full official Unicode emoji list, not a hand-picked shortlist, and the slang layer is curated from real, current Gen Z and Millennial internet usage — so results stay both comprehensive and culturally accurate."
          benefits={[{ title: `${totalEmoji || '1,900'}+ emoji`, text: 'The complete official Unicode set, not a curated subset — includes every country flag.' }, { title: 'Slang Mode', text: `${totalSlang || '125'}+ Gen Z / Millennial meanings — 💀, 🚩, 💅, 🧢 decoded the way people actually use them.` }, { title: 'Bidirectional', text: 'Text to emoji AND emoji back to text — literal or slang.' }, { title: 'Phrase-aware', text: 'Matches multi-word phrases like "no cap" or "thumbs up" as one emoji, not word by word.' }]}
          useCases={[{ title: 'Social media captions', text: 'Create emoji-rich posts and messages for Instagram, TikTok, or X.' }, { title: 'Decoding texts & DMs', text: 'Paste slang-heavy emoji you received and see what they actually mean.' }, { title: 'Emoji riddles & games', text: 'Translate a movie title or phrase into emoji and challenge friends to guess it.' }]} />
        <section><h2 className="text-xl font-black text-gray-900 mb-4">FAQ</h2>
          <div className="space-y-3">{faqs.map(f => <details key={f.question} className="rounded-2xl border p-4"><summary className="font-semibold cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3">{f.answer}</p></details>)}</div>
        </section>

        <div className="mt-6">
          <Card>
            <h2 className="text-lg font-bold text-gray-900 mb-3">Getting better results</h2>
            <div className="space-y-3 text-sm leading-6 text-gray-600">
              <p>Every word is matched to exactly one canonical emoji, so the same input always produces the same output — useful for reusable captions or comparing phrasings.</p>
              <p>If a word doesn&apos;t translate, try a close synonym, or search the dictionary above to see which words a given emoji actually maps to. For internet slang specifically, make sure Slang Mode is switched on.</p>
            </div>
          </Card>
        </div>
      </div>
    </DevToolLayout>
  )
}
