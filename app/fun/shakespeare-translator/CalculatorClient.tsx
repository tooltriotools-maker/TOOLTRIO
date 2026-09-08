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
      title="Shakespeare Translator"
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

    {/* ─────────────────────────────────────────────────────────────
    SEO CONTENT
   ───────────────────────────────────────────────────────────── */}

<div className="mt-16 space-y-12 max-w-3xl mx-auto">

  {/* SEO INTRO */}
  <section>
    <div className="flex items-center gap-4 mb-6">
      <div className="h-px flex-1 bg-gray-100" />
      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3">
        Shakespeare English Translator
      </span>
      <div className="h-px flex-1 bg-gray-100" />
    </div>

<h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-5">
  Shakespeare Translator: Convert Modern English to Shakespearean English
</h2>

    <div className="space-y-4 text-gray-600 leading-8">
 <p>
  Looking for a <strong>Shakespeare translator</strong> that can turn
  modern English into Shakespearean English? This free online
  <strong> Shakespearean translator</strong> lets you translate modern
  English into Shakespeare-inspired language and translate Shakespearean
  text back into modern English.
</p>

  <p>
  Use ToolTrio as a <strong>modern English to Shakespeare translator</strong>,
  <strong>Shakespearean to English translator</strong>,
  <strong>Shakespeare translator to English</strong>, or
  <strong>Shakespeare language translator</strong>. You can also use it as
  a <strong>Shakespearean converter</strong> when you want to transform
  everyday English into an Elizabethan-style form.
</p>

      <p>
        Unlike a simple word replacement page, this tool includes a searchable
        Shakespeare glossary and a Word-by-Word Meanings panel. That means you
        can see not only the translated result, but also the modern equivalent
        and plain-English meaning of recognized Shakespearean vocabulary.
      </p>
    </div>
  </section>

  {/* SHAKESPEARE TRANSLATOR PRIMARY INTENT */}
<section>
  <h2 className="text-2xl font-black text-gray-900 mb-5">
    Free Shakespeare Translator Online
  </h2>

  <div className="space-y-4 text-gray-600 leading-8">
    <p>
      This <strong>Shakespeare translator</strong> is a free online tool
      for converting modern English into Shakespearean English and
      translating Shakespearean text back into modern English.
    </p>

    <p>
      If you are looking for a <strong>free Shakespeare translator</strong>,
      you can enter a sentence, phrase, paragraph or individual word and
      choose the translation direction. The tool is designed for quick
      vocabulary conversion, creative writing, studying Shakespeare and
      understanding unfamiliar expressions.
    </p>

    <p>
      The translator also works as a
      <strong> Shakespearean translator</strong> and
      <strong> Shakespearean converter</strong>. Instead of requiring you
      to learn an entire historical dictionary first, it lets you enter
      modern English and inspect Shakespearean equivalents and meanings.
    </p>

    <p>
      For readers, the reverse direction can be used to
      <strong>translate Shakespeare to modern English</strong> or as a
      <strong>Shakespeare translator to English</strong>. This is especially
      useful when reading Shakespeare&apos;s plays, poems and dialogue.
    </p>
  </div>
</section>


  {/* TWO WAY TRANSLATOR */}
  <section>
    <h2 className="text-2xl font-black text-gray-900 mb-5">
      Modern English to Shakespearean and Shakespearean to Modern English
    </h2>

    <div className="space-y-4 text-gray-600 leading-8">
      <p>
        The translator works in two directions. Choose
        <strong> English → Shakespearean </strong>
        when you want to transform a modern sentence into Shakespeare-inspired
        language. Choose
        <strong> Shakespearean → English </strong>
        when you want to understand an unfamiliar phrase or passage.
      </p>

      <p>
        This makes the page useful for both creative writing and reading
        Shakespeare. If you are searching for a
        <strong> Shakespeare translator to English</strong>, you can paste
        Shakespearean vocabulary into the second direction and receive a
        modern-English approximation.
      </p>

      <p>
        You can also use it as a
        <strong> Shakespeare to modern English paragraph translator</strong>
        for a paragraph containing recognizable vocabulary. Because literary
        meaning depends on context, the result should be treated as a reading
        aid rather than a scholarly translation of an entire Shakespeare play.
      </p>
    </div>
  </section>

  {/* CONVERTER */}
<section>
 <h2 className="text-2xl font-black text-gray-900 mb-5">
  Shakespearean Converter: Convert English to Shakespearean English
</h2>

  <div className="space-y-4 text-gray-600 leading-8">
    <p>
      A <strong>Shakespearean converter</strong> transforms modern English
      words and sentences into Shakespeare-inspired vocabulary. It can be
      useful when you want your writing to have an old-fashioned,
      theatrical or Elizabethan tone.
    </p>

    <p>
      Some people also search for a
      <strong> Shakespearean English convertor</strong>. The purpose is the
      same: enter modern wording and convert recognizable vocabulary into
      Shakespearean-style alternatives.
    </p>

    <p>
      Because Shakespearean English is a historical form of Early Modern
      English, not every modern sentence has a perfect one-word replacement.
      The translator therefore focuses on recognizable vocabulary and
      phrases while keeping the original sentence readable.
    </p>
  </div>
</section>

{/* SHAKESPEARE TO MODERN ENGLISH */}
<section>
  <h2 className="text-2xl font-black text-gray-900 mb-5">
    Translate Shakespeare to Modern English
  </h2>

  <div className="space-y-4 text-gray-600 leading-8">
    <p>
      Need to <strong>translate Shakespeare to modern English</strong>?
      Choose the Shakespearean → English direction above and enter the
      Shakespearean text you want to understand.
    </p>

    <p>
      This can be useful when reading Shakespeare plays, poems, speeches
      and dialogue. The translator identifies vocabulary contained in its
      dictionary and provides modern equivalents where available.
    </p>

    <p>
      If you are looking for a
      <strong>Shakespearean translator to modern English</strong>, a
      <strong>Shakespeare translator to English</strong>, or a
      <strong>Shakespeare to modern English paragraph translator</strong>,
      the reverse translation mode is designed for that purpose.
    </p>
  </div>
</section>


  {/* WHAT IS SHAKESPEAREAN ENGLISH */}
  <section className="bg-purple-50 border border-purple-100 rounded-3xl p-6 sm:p-8">

   <h2 className="text-2xl font-black text-purple-900 mb-5">
  What Is Shakespearean English? Shakespeare vs Old English
</h2>

    <div className="space-y-4 text-gray-700 leading-8">
      <p>
  People sometimes search for a
  <strong>Shakespeare old English translator</strong> because Shakespeare&apos;s
  language sounds old-fashioned to modern readers. However, Shakespearean
  English is not technically Old English. Shakespeare wrote in Early Modern
  English, which is much closer to modern English than the language of
  Beowulf.
</p>
      <p>
        Shakespearean English refers broadly to the Early Modern English used
        during the period when William Shakespeare wrote his plays and poems.
        It is sometimes casually called &quot;Old English,&quot; but that description is
        historically incorrect.
      </p>

      <p>
        Shakespeare wrote centuries after the Old English period. Old English
        is the language associated with works such as <em>Beowulf</em> and is
        much more difficult for modern English speakers to understand.
        Shakespearean English is much closer to the language we use today.
      </p>

      <p>
       What makes Shakespeare&apos;s language seem unfamiliar is a combination of
        older vocabulary, grammatical forms, contractions, poetic expressions
        and words whose meanings have changed over time.
      </p>

      <p>
        Common examples include <strong>thou</strong>, <strong>thee</strong>,
        <strong>thy</strong>, <strong>thine</strong>, <strong>art</strong>,
        <strong>hath</strong>, <strong>doth</strong>,
        <strong>wherefore</strong>, <strong>prithee</strong>,
        <strong>hither</strong> and <strong>anon</strong>.
      </p>
    </div>
  </section>


  {/* THOU THEE THY */}
  <section>
    <h2 className="text-2xl font-black text-gray-900 mb-5">
      Thou, Thee, Thy and Thine: Shakespearean English Explained
    </h2>

    <p className="text-gray-600 leading-8 mb-5">
      One reason people search for a <strong>Shakespeare word translator</strong>
      is to understand the old pronouns used in Shakespearean dialogue.
      These words are not simply decorative replacements for &quot;you.&quot;
    </p>

    <div className="overflow-hidden rounded-2xl border border-gray-200">
      <div className="grid grid-cols-3 bg-purple-50 px-4 py-3 text-sm font-bold text-purple-800">
        <span>Word</span>
        <span>Modern Equivalent</span>
        <span>Typical Function</span>
      </div>

      <div className="divide-y divide-gray-100 text-sm">
        <div className="grid grid-cols-3 gap-2 px-4 py-3">
          <strong>Thou</strong>
          <span>you</span>
          <span>subject</span>
        </div>

        <div className="grid grid-cols-3 gap-2 px-4 py-3">
          <strong>Thee</strong>
          <span>you</span>
          <span>object</span>
        </div>

        <div className="grid grid-cols-3 gap-2 px-4 py-3">
          <strong>Thy</strong>
          <span>your</span>
          <span>possessive</span>
        </div>

        <div className="grid grid-cols-3 gap-2 px-4 py-3">
          <strong>Thine</strong>
          <span>yours</span>
          <span>possessive</span>
        </div>
      </div>
    </div>

 <p className="text-gray-600 leading-8 mt-5">
  For example, &quot;Thou art kind&quot; can be understood as &quot;You are kind,&quot;
  while &quot;I give thee this&quot; means approximately &quot;I give you this.&quot;
  Historical usage is more complicated than a one-to-one substitution,
  which is why the glossary should be used together with the translation.
</p>
  </section>


  {/* HOW IT WORKS */}
  <section>
    <h2 className="text-2xl font-black text-gray-900 mb-5">
      How Does the Shakespearean Translator Work?
    </h2>

    <div className="space-y-4 text-gray-600 leading-8">
      <p>
        The translator uses a shared dictionary containing modern vocabulary,
        Shakespearean or Elizabethan-style equivalents, phrases and plain
        English meanings.
      </p>

      <p>
        When you enter text, recognized multi-word phrases are matched before
        individual words. This helps the translator handle phrases as units
        instead of blindly replacing every word separately.
      </p>

      <p>
        Recognized vocabulary is then replaced while words that are not present
        in the dictionary are left readable. This approach is intentionally
        different from a fully generative
        <strong> Shakespearean translator AI</strong> that may invent a
        completely rewritten sentence.
      </p>

      <p>
        The same dictionary powers the Full Word Glossary and the Word-by-Word
        Meanings panel, so you can inspect the vocabulary behind the result.
      </p>
    </div>

    <div className="grid sm:grid-cols-3 gap-3 mt-6">
      <div className="rounded-2xl border border-purple-100 bg-purple-50 p-5">
        <p className="text-2xl font-black text-purple-700">
          {ALL_SHAKESPEARE_ENTRIES.length}+
        </p>
        <p className="text-sm font-semibold text-gray-600">
          Dictionary entries
        </p>
      </div>

      <div className="rounded-2xl border border-purple-100 bg-purple-50 p-5">
        <p className="text-2xl font-black text-purple-700">
          2-way
        </p>
        <p className="text-sm font-semibold text-gray-600">
          Translation directions
        </p>
      </div>

      <div className="rounded-2xl border border-purple-100 bg-purple-50 p-5">
        <p className="text-2xl font-black text-purple-700">
          Free
        </p>
        <p className="text-sm font-semibold text-gray-600">
          Browser-based translator
        </p>
      </div>
    </div>
  </section>


  {/* POPULAR PHRASES */}
  <section>
    <h2 className="text-2xl font-black text-gray-900 mb-5">
      How to Say Modern Words and Phrases in Shakespearean English
    </h2>

    <p className="text-gray-600 leading-8 mb-6">
      Many people use a Shakespearean translator for a single word or short
      phrase rather than an entire paragraph. The examples below demonstrate
      the type of transformation you can create.
    </p>

    <div className="space-y-3">

      <div className="rounded-2xl border p-4 bg-white">
        <p className="font-bold text-gray-900">
          You → Thou / Thee
        </p>
        <p className="text-sm text-gray-600 mt-1">
     The correct historical form depends on the grammatical role of
&quot;you&quot; in the sentence.
        </p>
      </div>

      <div className="rounded-2xl border p-4 bg-white">
        <p className="font-bold text-gray-900">
          Yes → Ay / Aye
        </p>
        <p className="text-sm text-gray-600 mt-1">
          These historical-style forms can create an Elizabethan tone.
        </p>
      </div>

      <div className="rounded-2xl border p-4 bg-white">
        <p className="font-bold text-gray-900">
          I am → I am
        </p>
        <p className="text-sm text-gray-600 mt-1">
          Not every modern expression needs to change. Shakespearean style
          often comes from changing surrounding vocabulary and construction.
        </p>
      </div>

      <div className="rounded-2xl border p-4 bg-white">
        <p className="font-bold text-gray-900">
          Why → Wherefore
        </p>
        <p className="text-sm text-gray-600 mt-1">
          &quot;Wherefore&quot; means &quot;why&quot; or &quot;for what reason,&quot; not &quot;where.&quot;
        </p>
      </div>

    </div>
  </section>

  {/* COMMON SHAKESPEARE WORD SEARCHES */}
<section>
  <h2 className="text-2xl font-black text-gray-900 mb-5">
    Common Shakespearean Words: You, My, Me, Yes and I Am
  </h2>

  <div className="grid sm:grid-cols-2 gap-4">

    <div className="rounded-2xl border p-5">
      <h3 className="font-bold text-gray-900 mb-2">
        You in Shakespearean English
      </h3>
      <p className="text-sm text-gray-600 leading-7">
        Depending on grammar, modern &quot;you&quot; may correspond to
        <strong> thou</strong>, <strong>thee</strong> or another historical
        form. Thou is generally the subject form, while thee is generally
        the object form.
      </p>
    </div>

    <div className="rounded-2xl border p-5">
      <h3 className="font-bold text-gray-900 mb-2">
        Yes in Shakespearean Language
      </h3>
      <p className="text-sm text-gray-600 leading-7">
        Historical-style alternatives to modern &quot;yes&quot; include
        <strong> ay</strong> and <strong>aye</strong>, depending on the
        context and style.
      </p>
    </div>

    <div className="rounded-2xl border p-5">
      <h3 className="font-bold text-gray-900 mb-2">
        I Am in Shakespearean Language
      </h3>
      <p className="text-sm text-gray-600 leading-7">
       &quot;I am&quot; does not necessarily need to be changed. Shakespearean style
        often comes from changing surrounding vocabulary and sentence
        construction.
      </p>
    </div>

    <div className="rounded-2xl border p-5">
      <h3 className="font-bold text-gray-900 mb-2">
        My and Me in Shakespearean English
      </h3>
      <p className="text-sm text-gray-600 leading-7">
        &quot;My&quot; and &quot;me&quot; can already appear in Shakespearean English. Forms such
        as <strong>mine</strong>, <strong>thee</strong> and
        <strong> thou</strong> depend on grammatical context rather than
        being automatic replacements for every sentence.
      </p>
    </div>

  </div>
</section>


  {/* I LOVE YOU */}
  <section className="bg-pink-50 border border-pink-100 rounded-3xl p-6 sm:p-8">
    <h2 className="text-2xl font-black text-pink-900 mb-5">
      How to Say “I Love You” in Shakespearean English
    </h2>

    <p className="text-gray-700 leading-8">
      One of the most popular reasons people search for a
      <strong> Shakespearean translator</strong> is to turn a romantic message
      into something that sounds theatrical and poetic.
    </p>

    <div className="my-5 rounded-2xl bg-white border border-pink-100 p-5">
      <p className="text-xs uppercase font-bold text-pink-600 mb-2">
        Modern English
      </p>
      <p className="text-lg italic">
        I love you.
      </p>

      <p className="text-xs uppercase font-bold text-pink-600 mt-5 mb-2">
        Shakespeare-inspired
      </p>
      <p className="text-lg italic font-semibold">
        I love thee.
      </p>
    </div>

    <p className="text-gray-700 leading-8">
      For a wedding, anniversary or romantic letter, you can begin with your
      original message and then make selected words more poetic. The result
      does not need to replace every modern word; a convincing Shakespearean
      style is often created by combining older vocabulary with expressive
      sentence structure.
    </p>
  </section>


  {/* HAPPY BIRTHDAY */}
  <section>
    <h2 className="text-2xl font-black text-gray-900 mb-5">
      How to Say Happy Birthday in Shakespearean
    </h2>

    <p className="text-gray-600 leading-8">
      If you are looking for <strong>how to say happy birthday in
      Shakespearean</strong>, try a Shakespeare-inspired greeting such as:
    </p>

    <blockquote className="my-5 border-l-4 border-purple-300 bg-purple-50 p-5 rounded-r-2xl italic text-gray-700">
      “A joyous birthday unto thee!”
    </blockquote>

    <p className="text-gray-600 leading-8">
      You can make the greeting longer by adding words such as
      <strong> goodfellow</strong>, <strong>morrow</strong>,
      <strong> joy</strong>, <strong>blessing</strong> and
      <strong> merriment</strong>. Enter the complete birthday message into
      the translator to experiment with different versions.
    </p>
  </section>


  {/* LETTER */}
  <section>
    <h2 className="text-2xl font-black text-gray-900 mb-5">
      How to Write a Letter in Shakespearean English
    </h2>

    <div className="space-y-4 text-gray-600 leading-8">
      <p>
        If you want to know <strong>how to write a letter in
        Shakespearean</strong>, write the message normally first. Focus on the
        meaning rather than trying to imitate Shakespeare immediately.
      </p>

      <p>
        After writing the modern version, use the translator to transform
        recognizable vocabulary. Then use the glossary to refine individual
        words and make the final letter sound natural.
      </p>

      <p>
        This works particularly well for Renaissance fair invitations,
        theatrical performances, historical roleplay, birthday messages,
        romantic letters and creative writing exercises.
      </p>
    </div>
  </section>


  {/* WEDDING VOWS */}
  <section>
    <h2 className="text-2xl font-black text-gray-900 mb-5">
      Shakespearean Wedding Vow Translator
    </h2>

    <p className="text-gray-600 leading-8">
      A <strong>Shakespearean wedding vow translator</strong> can be useful
      when you want wedding vows with an old-fashioned theatrical tone.
      Instead of trying to write archaic English from scratch, write your
      actual promises first.
    </p>

    <div className="grid sm:grid-cols-2 gap-4 mt-6">
      <div className="rounded-2xl border bg-white p-5">
        <p className="font-bold text-gray-900 mb-2">
          Modern
        </p>
        <p className="text-gray-600 italic">
          I promise to love you and stand beside you.
        </p>
      </div>

      <div className="rounded-2xl border bg-purple-50 p-5">
        <p className="font-bold text-purple-800 mb-2">
          Shakespeare-inspired
        </p>
        <p className="text-gray-700 italic">
          I vow to love thee and stand beside thee.
        </p>
      </div>
    </div>

    <p className="text-gray-600 leading-8 mt-5">
      Always review a generated vow manually. A wedding vow should sound
      sincere and natural rather than simply containing as many old words as
      possible.
    </p>
  </section>


  {/* WORD SUBSTITUTION */}
  <section>
    <h2 className="text-2xl font-black text-gray-900 mb-5">
      Shakespeare Word Substitution List and Glossary
    </h2>

    <p className="text-gray-600 leading-8">
      Instead of maintaining a static <strong>Shakespeare word substitution
      list</strong>, ToolTrio provides a searchable Full Word Glossary.
      Search by modern word, Shakespearean word or meaning to find matching
      vocabulary.
    </p>

    <p className="text-gray-600 leading-8 mt-4">
      Some common examples include:
    </p>

    <div className="grid sm:grid-cols-2 gap-3 mt-5">
      <div className="border rounded-xl p-4">
        <strong>you → thou / thee</strong>
      </div>

      <div className="border rounded-xl p-4">
        <strong>your → thy / thine</strong>
      </div>

      <div className="border rounded-xl p-4">
        <strong>why → wherefore</strong>
      </div>

      <div className="border rounded-xl p-4">
        <strong>please → prithee</strong>
      </div>

      <div className="border rounded-xl p-4">
        <strong>here → hither</strong>
      </div>

      <div className="border rounded-xl p-4">
        <strong>soon → anon</strong>
      </div>
    </div>

    <p className="text-gray-600 leading-8 mt-5">
      These substitutions are useful for learning, but context matters.
      Shakespearean vocabulary should not be treated as a universal
      one-to-one dictionary because historical English had grammatical
      distinctions that modern English no longer uses.
    </p>
  </section>


  {/* HOW TO MAKE TEXT SOUND LIKE SHAKESPEARE */}
  <section className="bg-amber-50 border border-amber-100 rounded-3xl p-6 sm:p-8">

    <h2 className="text-2xl font-black text-amber-900 mb-5">
      How to Make Text Sound Like Shakespeare
    </h2>

    <p className="text-gray-700 leading-8 mb-5">
     If your goal is <strong>how to make text sound like Shakespeare</strong>,
don&apos;t simply replace every modern word with an old word.Shakespearean
      style is also about rhythm, dramatic expression, imagery and sentence
      structure.
    </p>

    <ol className="space-y-4 text-gray-700">
      <li>
        <strong>1. Start with a clear modern sentence.</strong>
        <br />
        Decide exactly what you want to say before adding historical vocabulary.
      </li>

      <li>
        <strong>2. Replace useful pronouns.</strong>
        <br />
        Words such as thou, thee, thy and thine can immediately create a
        Shakespeare-inspired tone when used correctly.
      </li>

      <li>
        <strong>3. Add historical verbs.</strong>
        <br />
        Forms such as art, hath and doth can make dialogue sound more
        theatrical.
      </li>

      <li>
        <strong>4. Use dramatic vocabulary carefully.</strong>
        <br />
        Words such as wherefore, prithee, hither and anon can strengthen the
        period-inspired effect.
      </li>

      <li>
        <strong>5. Read the final sentence aloud.</strong>
        <br />
        Shakespeare&apos;s writing is strongly connected to rhythm and performance.
      </li>
    </ol>
  </section>


  {/* ROMEO AND JULIET */}
  <section>
    <h2 className="text-2xl font-black text-gray-900 mb-5">
      Shakespeare Translator for Romeo and Juliet
    </h2>

    <p className="text-gray-600 leading-8">
      Students often search for a <strong>Shakespeare translator Romeo and
      Juliet</strong> because the language in the play can be difficult when
      encountered for the first time.
    </p>

    <p className="text-gray-600 leading-8 mt-4">
      The translator can help with unfamiliar words and short passages from
      the play. For example, when you encounter vocabulary involving love,
      family, conflict or social relationships, you can paste the text into the
      Shakespearean-to-Modern direction and then inspect the meanings panel.
    </p>

    <p className="text-gray-600 leading-8 mt-4">
      For academic work, always compare the result with an annotated edition.
      Literary meaning can depend on metaphor, historical context and the
      surrounding lines.
    </p>
  </section>


  {/* MACBETH */}
  <section>
    <h2 className="text-2xl font-black text-gray-900 mb-5">
      Shakespeare Translator for Macbeth
    </h2>

    <p className="text-gray-600 leading-8">
      The same approach works for students searching for a
      <strong> Shakespeare translator Macbeth</strong>. Macbeth contains
      dramatic vocabulary, unusual expressions and poetic language that may
      initially seem unfamiliar.
    </p>

    <p className="text-gray-600 leading-8 mt-4">
      Paste difficult vocabulary or a short passage into the translator, then
      use the Word-by-Word Meanings panel to identify recognized terms. This
      makes the tool useful as a first step before reading a detailed literary
      explanation.
    </p>
  </section>


  {/* INSULT */}
  <section>
    <h2 className="text-2xl font-black text-gray-900 mb-5">
      Shakespeare Insult Translator and Shakespearean Writing
    </h2>

    <p className="text-gray-600 leading-8">
      If you are looking for a <strong>Shakespeare insult translator</strong>,
      you can enter an ordinary insult and transform recognized vocabulary
      into Shakespeare-inspired wording.
    </p>

    <p className="text-gray-600 leading-8 mt-4">
      For more creative insult generation, visit our
      <Link
        href="/fun/insult-generator/shakespeare-insult-generator"
        className="text-purple-700 font-bold underline underline-offset-2 mx-1"
      >
        Shakespeare Insult Generator
      </Link>
      where you can generate theatrical Elizabethan-style roasts.
    </p>
  </section>


  {/* AI VS DICTIONARY */}
  <section>
    <h2 className="text-2xl font-black text-gray-900 mb-5">
      Shakespearean Translator AI vs Dictionary-Based Translation
    </h2>

    <p className="text-gray-600 leading-8">
      People sometimes search for a <strong>Shakespearean translator AI</strong>
      because they want modern sentences rewritten in the style of Shakespeare.
      There are important differences between generative AI rewriting and a
      dictionary-based translator.
    </p>

    <div className="overflow-hidden rounded-2xl border mt-6">
      <div className="grid grid-cols-3 bg-purple-50 p-3 text-xs font-bold text-purple-800">
        <span>Feature</span>
        <span>This Translator</span>
        <span>Generative AI</span>
      </div>

      <div className="divide-y text-sm">
        <div className="grid grid-cols-3 p-4 gap-2">
          <span>Dictionary matching</span>
          <strong>Yes</strong>
          <span>Not necessarily</span>
        </div>

        <div className="grid grid-cols-3 p-4 gap-2">
          <span>Word meanings</span>
          <strong>Yes</strong>
          <span>Depends</span>
        </div>

        <div className="grid grid-cols-3 p-4 gap-2">
          <span>Predictable substitutions</span>
          <strong>Yes</strong>
          <span>Variable</span>
        </div>

        <div className="grid grid-cols-3 p-4 gap-2">
          <span>Creative rewriting</span>
          <span>Limited</span>
          <strong>Strong</strong>
        </div>
      </div>
    </div>

    <p className="text-gray-600 leading-8 mt-5">
      ToolTrio deliberately focuses on transparent vocabulary transformation.
      You can see the dictionary behind the translation instead of receiving
      an unexplained rewrite.
    </p>
  </section>


  {/* FREE */}
  <section className="bg-green-50 border border-green-100 rounded-3xl p-6 sm:p-8">
    <h2 className="text-2xl font-black text-green-900 mb-5">
      Free Modern English to Shakespearean Translator Online
    </h2>

    <p className="text-gray-700 leading-8">
      If you&apos;re looking for a <strong>free modern English to Shakespearean
      translator online</strong>, ToolTrio is designed to work directly in
      your browser. There is no need to install software just to translate a
      sentence or look up a Shakespearean word.
    </p>

    <p className="text-gray-700 leading-8 mt-4">
      You can switch directions at any time, copy the result, inspect word
      meanings and search the complete glossary.
    </p>
  </section>


  {/* BACKWARDS */}
  <section>
    <h2 className="text-2xl font-black text-gray-900 mb-5">
      What Does “Shakespeare Translator Backwards” Mean?
    </h2>

    <p className="text-gray-600 leading-8">
      The phrase <strong>Shakespeare translator backwards</strong> can mean
      several things. Some users mean translating Shakespearean English back
      into modern English, while others mean reversing the characters of a
      sentence.
    </p>

    <p className="text-gray-600 leading-8 mt-4">
      If you want the first option, choose
      <strong> Shakespearean → English</strong>. That direction converts
      recognized Shakespearean vocabulary into modern equivalents. This is
      different from reversing the letters or words in a sentence.
    </p>
  </section>


  {/* LINGOJAM SEARCH INTENT */}
  <section>
    <h2 className="text-2xl font-black text-gray-900 mb-5">
      Looking for a Lingojam Shakespeare Translator?
    </h2>

    <p className="text-gray-600 leading-8">
      Some users search for a <strong>Lingojam Shakespeare translator</strong>
      when they want a quick way to turn modern wording into Shakespeare-style
      text. ToolTrio provides a similar general use case while adding a
      searchable glossary, word meanings and two-way translation.
    </p>

    <p className="text-gray-600 leading-8 mt-4">
      ToolTrio is an independent tool and is not affiliated with Lingojam.
      If your goal is simply to translate, you can use the translator above
      without leaving the page.
    </p>
  </section>


  {/* BEST */}
  <section>
    <h2 className="text-2xl font-black text-gray-900 mb-5">
      What Is the Best Shakespeare Translator?
    </h2>

    <p className="text-gray-600 leading-8">
      The <strong>best Shakespeare translator</strong> depends on the task.
      Someone studying Romeo and Juliet may need word meanings and context,
      while someone writing a party invitation may simply want a theatrical
      Shakespearean version.
    </p>

    <p className="text-gray-600 leading-8 mt-4">
      ToolTrio focuses on practical translation, transparency and vocabulary
      learning. The translator is paired with a complete searchable glossary,
      which makes it useful when you want to understand why a particular word
      was changed.
    </p>

    <p className="text-gray-600 leading-8 mt-4">
      For that reason, it can serve as a practical
      <strong> Best Shakespearean translator</strong> option for users who want
      a free browser-based tool rather than a literary research database.
    </p>
  </section>


  {/* ACCURACY */}
  <section>
    <h2 className="text-2xl font-black text-gray-900 mb-5">
      How Accurate Is a Shakespearean Translator?
    </h2>

    <p className="text-gray-600 leading-8">
      An <strong>accurate Shakespearean translator</strong> needs to be judged
      carefully because Shakespearean English is not simply modern English
      with a collection of old words inserted into it.
    </p>

    <p className="text-gray-600 leading-8 mt-4">
      This tool is designed as a practical vocabulary translator. It does not
      claim to recreate Shakespeare&apos;s complete grammar, poetry, meter,
      historical context, metaphor or individual authorial voice.
    </p>

    <p className="text-gray-600 leading-8 mt-4">
      For creative writing, entertainment, vocabulary learning and quick
      reading assistance, dictionary-based translation can be useful. For
      academic interpretation, compare the result with the original text and
      an authoritative annotated edition.
    </p>
  </section>


  {/* COMMON USE CASES */}
  <section>
    <h2 className="text-2xl font-black text-gray-900 mb-5">
      What Can You Use a Shakespeare Language Translator For?
    </h2>

    <div className="grid sm:grid-cols-2 gap-4">

      <div className="rounded-2xl border p-5">
        <h3 className="font-black text-gray-900 mb-2">
          📚 Studying Shakespeare
        </h3>
        <p className="text-sm text-gray-600 leading-6">
          Understand unfamiliar vocabulary while reading plays, sonnets and
          Shakespearean dialogue.
        </p>
      </div>

      <div className="rounded-2xl border p-5">
        <h3 className="font-black text-gray-900 mb-2">
          ✍️ Creative Writing
        </h3>
        <p className="text-sm text-gray-600 leading-6">
          Create Shakespeare-inspired dialogue, letters, poems and character
          messages.
        </p>
      </div>

      <div className="rounded-2xl border p-5">
        <h3 className="font-black text-gray-900 mb-2">
          💍 Wedding Vows
        </h3>
        <p className="text-sm text-gray-600 leading-6">
          Turn modern romantic promises into an Elizabethan-inspired style.
        </p>
      </div>

      <div className="rounded-2xl border p-5">
        <h3 className="font-black text-gray-900 mb-2">
          🎂 Birthday Messages
        </h3>
        <p className="text-sm text-gray-600 leading-6">
          Create theatrical birthday greetings for friends and family.
        </p>
      </div>

      <div className="rounded-2xl border p-5">
        <h3 className="font-black text-gray-900 mb-2">
          🎭 Theatre & Roleplay
        </h3>
        <p className="text-sm text-gray-600 leading-6">
          Experiment with period-inspired dialogue for performances and
          Renaissance fairs.
        </p>
      </div>

      <div className="rounded-2xl border p-5">
        <h3 className="font-black text-gray-900 mb-2">
          😂 Jokes & Social Media
        </h3>
        <p className="text-sm text-gray-600 leading-6">
          Turn ordinary messages into dramatic Shakespearean jokes and roasts.
        </p>
      </div>

    </div>
  </section>


  {/* EXAMPLES */}
  <section>
    <h2 className="text-2xl font-black text-gray-900 mb-5">
      Shakespearean Translator Examples
    </h2>

    <div className="space-y-4">

      <div className="rounded-2xl border bg-white p-5">
        <p className="text-xs font-bold uppercase text-gray-400 mb-2">
          Modern English → Shakespearean
        </p>
        <p className="text-gray-700">
          <em>Why are you so foolish?</em>
        </p>
        <p className="text-purple-700 font-semibold mt-2">
          Wherefore art thou so addle-pated?
        </p>
      </div>

      <div className="rounded-2xl border bg-white p-5">
        <p className="text-xs font-bold uppercase text-gray-400 mb-2">
          Modern English → Shakespearean
        </p>
        <p className="text-gray-700">
          <em>Good morning, my friend.</em>
        </p>
        <p className="text-purple-700 font-semibold mt-2">
          Good morrow, mine goodfellow.
        </p>
      </div>

      <div className="rounded-2xl border bg-white p-5">
        <p className="text-xs font-bold uppercase text-gray-400 mb-2">
          Shakespearean → Modern English
        </p>
        <p className="text-gray-700">
          <em>Prithee, come hither.</em>
        </p>
        <p className="text-purple-700 font-semibold mt-2">
          Please, come here.
        </p>
      </div>

      <div className="rounded-2xl border bg-white p-5">
        <p className="text-xs font-bold uppercase text-gray-400 mb-2">
          Shakespearean → Modern English
        </p>
        <p className="text-gray-700">
          <em>Wherefore art thou?</em>
        </p>
        <p className="text-purple-700 font-semibold mt-2">
          Why are you?
        </p>
      </div>

    </div>
  </section>


  {/* GLOSSARY CTA */}
  <section className="bg-indigo-50 border border-indigo-100 rounded-3xl p-6 sm:p-8">
    <h2 className="text-2xl font-black text-indigo-900 mb-4">
      Explore the Full Shakespearean Word Glossary
    </h2>

    <p className="text-gray-700 leading-8 mb-5">
      If you do not need a complete sentence translated, use the
      <strong> Full Word Glossary</strong> above. Search a modern word,
      Shakespearean word or meaning to find the corresponding vocabulary.
    </p>

    <p className="text-gray-700 leading-8">
      The glossary is especially useful for anyone looking for
      <strong> Shakespeare words and meanings</strong>,
      <strong> Shakespearean words meaning</strong>,
      a <strong>Shakespearean dictionary</strong>, or a
      <strong> Shakespeare glossary</strong>.
    </p>
  </section>


  {/* DISCLAIMER */}
  <section>
    <h2 className="text-2xl font-black text-gray-900 mb-5">
      Shakespearean Translation Is an Approximation
    </h2>

    <p className="text-gray-600 leading-8">
      Shakespeare&apos;s language cannot always be translated perfectly by
      replacing individual words. Meaning can depend on grammar, metaphor,
      pronunciation, historical usage, wordplay and the surrounding scene.
    </p>

    <p className="text-gray-600 leading-8 mt-4">
      This tool is therefore intended as a practical
      <strong> Shakespeare text translator</strong> and learning aid. It is
      useful for understanding vocabulary and creating Shakespeare-inspired
      text, but it should not be treated as a definitive scholarly translation
      of Shakespeare&apos;s works.
    </p>
  </section>


  {/* FAQ */}
  <section>
    <h2 className="text-2xl font-black text-gray-900 mb-6">
      Frequently Asked Questions About the Shakespeare Translator
    </h2>

    <div className="space-y-3">
      {faqs.map((f) => (
        <details
          key={f.question}
          className="rounded-2xl border p-5"
          style={{
            background: 'rgba(255,255,255,0.82)',
            backdropFilter: 'blur(8px)',
            borderColor: 'rgba(226,232,240,0.7)',
            boxShadow: '0 4px 16px rgba(15,23,42,0.04)',
          }}
        >
          <summary className="font-semibold text-gray-900 cursor-pointer">
            {f.question}
          </summary>

          <p className="text-gray-600 text-sm mt-3 leading-7">
            {f.answer}
          </p>
        </details>
      ))}
    </div>
  </section>


  {/* FINAL CTA */}
  <section className="text-center py-8">
    <h2 className="text-2xl font-black text-gray-900 mb-4">
      Translate Your English Into Shakespearean English
    </h2>

    <p className="text-gray-600 leading-7 max-w-2xl mx-auto">
      Whether you are studying Romeo and Juliet or Macbeth, writing a
      Shakespearean letter, creating wedding vows, making a birthday message,
      learning Shakespearean words or simply trying to make a text sound like
      the Bard, use the translator above and explore the full glossary to
      understand every word.
    </p>
  </section>

</div>
    </DevToolLayout>
  )
}
