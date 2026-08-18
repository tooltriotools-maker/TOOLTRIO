'use client'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { DevToolLayout } from '@/components/ui/DevToolLayout'
import { SEOContent } from '@/components/ui/SEOContent'
import type { InsultGenerator } from '@/lib/fun/insult-generators'
import { generateUnique, estimateCombinations, hasBankLibrary } from '@/lib/fun/insultCombinator'
import { getMeanings } from '@/lib/fun/shakespeareTranslate'

interface Props {
  generator: InsultGenerator
  /** Every other insult generator, for full cross-linking / discovery across the whole library. */
  related: { slug: string; name: string; icon: string }[]
  faqs: { question: string; answer: string }[]
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${Math.round(n / 100_000) / 10}M+`
  if (n >= 1_000) return `${Math.round(n / 100) / 10}K+`
  return `${n}+`
}

export default function InsultGeneratorClient({ generator, related, faqs }: Props) {
  const { slug, name, icon, intro, lines } = generator
  const [line, setLine] = useState('')
  const [generated, setGenerated] = useState(false)
  const seenRef = useRef(new Set<string>())
  const usesBanks = hasBankLibrary(slug)
  const combos = usesBanks ? estimateCombinations(slug) : lines.length
  const combosLabel = formatCount(combos)

  function generate() {
    if (usesBanks) {
      setLine(generateUnique(slug, seenRef.current))
    } else {
      // Fallback for any generator without a bank library yet — cycles the hand-written pool.
      const used = seenRef.current
      if (used.size >= lines.length) used.clear()
      let next = ''
      do { next = lines[Math.floor(Math.random() * lines.length)] } while (used.has(next))
      used.add(next)
      setLine(next)
    }
    setGenerated(true)
  }

  const meanings = line ? getMeanings(line) : []
  const translateHref = line ? `/fun/shakespeare-translator?text=${encodeURIComponent(line)}&dir=toModern` : '/fun/shakespeare-translator'

  function share() {
    const text = `${icon} ${name}\n\n"${line}"\n\nGenerate yours: tooltrio.com/fun/insult-generator/${slug}`
    if (navigator.share) navigator.share({ title: name, text })
    else navigator.clipboard.writeText(text).then(() => alert('Copied to clipboard!'))
  }

  return (
    <DevToolLayout title={name} icon={icon}
      description={generator.cardDescription}
      category="Fun" parentPath="/fun/insult-generator" parentLabel="Insult Generators">

      <div className="text-center mb-6">
        <button onClick={generate}
          className="w-full py-5 text-white font-black text-xl rounded-2xl mb-4 transition-all hover:-translate-y-1"
          style={{ background: 'linear-gradient(135deg,#7c3aed,#4c1d95)', boxShadow: '0 8px 24px rgba(124,58,237,0.35)' }}>
          {icon} {generated ? 'Generate Another' : `Generate a ${name.replace(' Generator', '')}`}
        </button>
        <p className="text-xs text-gray-400">{combosLabel} unique combinations · Never the same line twice in a row</p>
      </div>

      {line && (
        <div className="rounded-3xl border-2 p-8 text-center mb-6" style={{ background: 'linear-gradient(135deg,rgba(237,233,254,0.8),rgba(221,214,254,0.4))', borderColor: 'rgba(167,139,250,0.5)' }}>
          <div className="text-5xl mb-4">{icon}</div>
          <p className="text-xl font-black text-purple-900 leading-relaxed italic mb-4">&ldquo;{line}&rdquo;</p>
          <div className="flex gap-2 justify-center">
            <button onClick={share}
              className="px-4 py-2 text-sm font-bold rounded-xl bg-purple-700 text-white hover:bg-purple-800">
              📤 Share
            </button>
            <button onClick={() => navigator.clipboard.writeText(line).then(() => alert('Copied!'))}
              className="px-4 py-2 text-sm font-bold rounded-xl border-2 border-purple-400 text-purple-700 hover:bg-purple-50">
              📋 Copy
            </button>
          </div>
        </div>
      )}

      {line && (
        <Link href={translateHref}
          className="block rounded-2xl border-2 border-purple-300 p-5 mb-6 bg-gradient-to-br from-purple-50 to-indigo-50 hover:border-purple-400 hover:-translate-y-0.5 transition-all group">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="font-bold text-gray-900 mb-1">📖 Not sure what that means?</h2>
              <p className="text-sm text-gray-600">
                {meanings.length > 0
                  ? `This line uses ${meanings.length} word${meanings.length === 1 ? '' : 's'} from our Shakespearean library. Open the translator to see the full plain-English meaning.`
                  : 'Open the Shakespeare English Translator to see this line\u2019s plain-English meaning, word by word.'}
              </p>
            </div>
            <span className="flex-shrink-0 px-4 py-2 rounded-xl bg-purple-700 text-white font-bold text-sm group-hover:bg-purple-800 transition-all whitespace-nowrap">
              Translate it →
            </span>
          </div>
        </Link>
      )}

      <div className="mt-12 space-y-6 max-w-2xl mx-auto">
        <SEOContent title="" category="fun"
          intro={intro}
          howItWorks={usesBanks
            ? `The ${name} combines themed word banks — descriptors and targets built specifically for this generator's voice — into a rotating set of sentence templates. That combinatorial approach is what gets it to ${combosLabel} unique lines instead of a short fixed list: click generate and it assembles a fresh one on the spot, tracks what you've already seen this session, and never repeats until the pool is exhausted. Want more variety later? The underlying library is just word lists, so it's built to grow.`
            : `Click generate and the tool serves up one of ${lines.length}+ hand-written ${name.toLowerCase()} lines at random. Hit the button again for a fresh one — lines don't repeat until you've seen them all.`}
          tipsSection="These lines work best delivered with confidence and a straight face — timing does most of the work. Screenshot your favorite and send it to whoever earned it."
          conclusion={`Whether you're looking to win a roast battle, spice up a group chat, or just need a laugh, the ${name} has a fresh line ready whenever you are.`}
          benefits={[
            { title: `${combosLabel} unique combinations`, text: usesBanks ? 'Built from themed word banks and sentence templates, so it reads natural and rarely repeats.' : 'Hand-written, not mad-libs — every line reads naturally.' },
            { title: 'No repeats in a session', text: 'The generator tracks what you\u2019ve already seen and skips straight past it.' },
          ]}
          useCases={[
            { title: 'Roast battles', text: 'Load up a few lines before your next friendly roast session.' },
            { title: 'Group chats', text: 'Drop a fresh line into the chat whenever the moment calls for it.' },
          ]} />
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">FAQ</h2>
          <div className="space-y-3">
            {faqs.map(f => (
              <details key={f.question} className="rounded-2xl border p-4">
                <summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary>
                <p className="text-gray-600 text-sm mt-3">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {related.length > 0 && (
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-4">All Insult &amp; Roast Generators</h2>
            <p className="text-sm text-gray-500 mb-4">Every generator in the library — jump to any of them.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {related.map(r => {
                const href = r.slug === 'shakespeare-insult-generator'
                  ? '/fun/shakespeare-insult-generator'
                  : `/fun/insult-generator/${r.slug}`
                return (
                  <Link key={r.slug} href={href}
                    className="flex items-center gap-2 p-3 rounded-2xl border group hover:border-purple-300 hover:-translate-y-0.5 transition-all"
                    style={{ borderColor: 'rgba(216,180,254,0.5)' }}>
                    <span className="text-lg">{r.icon}</span>
                    <span className="text-sm font-semibold text-gray-700 group-hover:text-purple-700">{r.name.replace(' Generator', '')}</span>
                  </Link>
                )
              })}
            </div>
          </section>
        )}
      </div>
    </DevToolLayout>
  )
}
