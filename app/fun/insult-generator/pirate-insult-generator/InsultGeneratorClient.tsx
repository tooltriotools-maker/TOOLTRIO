'use client'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { DevToolLayout } from '@/components/ui/DevToolLayout'
import type { InsultGenerator } from '@/lib/fun/insult-generators'
import { generateUnique, estimateCombinations, hasBankLibrary } from '@/lib/fun/insultCombinator'


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

  

      <div className="mt-12 space-y-6 max-w-2xl mx-auto">

<section className="space-y-5">
  <div>
    <p className="text-sm font-bold uppercase tracking-wide text-purple-700 mb-2">
      Pirate Insult Generator
    </p>

    <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight">
  Pirate Insult Generator for Funny, Salty Roasts
</h2>
  </div>

  <p className="text-gray-700 leading-8">
    Looking for a pirate insult that sounds like it came straight from the
    deck of a storm-tossed ship? This pirate insult generator creates playful
    pirate-style roasts using nautical language, exaggerated comparisons,
    treasure-hunting imagery, and the dramatic attitude associated with
    fictional pirates.
  </p>

  <p className="text-gray-700 leading-8">
    Instead of producing the same few “Arrr!” jokes repeatedly, the generator
    combines pirate-themed descriptions and targets into different lines.
    That makes it useful when you need a quick insult for a friendly roast,
    pirate-themed party, game, caption, group chat, or simply a laugh with
    friends.
  </p>
</section>

<section className="space-y-4">
  <h2 className="text-2xl font-black text-gray-900">
    What Makes a Good Pirate Insult?
  </h2>

  <p className="text-gray-700 leading-8">
    Pirate insults work because they exaggerate ordinary flaws using the
    vocabulary and imagery of life at sea. A weak comeback can become much
    funnier when it is compared with a leaking ship, a confused cabin boy,
    a barnacle-covered deck, or a gull fighting over scraps.
  </p>

  <p className="text-gray-700 leading-8">
    The strongest pirate-style insults usually have three ingredients:
    recognizable pirate language, an unexpected comparison, and theatrical
    delivery. Words associated with ships, storms, treasure, anchors, sails,
    decks, ports, and the ocean immediately establish the setting.
  </p>

  <div className="grid gap-3">
    {[
      {
        title: 'Nautical imagery',
        text: 'Ships, sails, anchors, decks, storms, waves, and the open sea create the pirate setting.',
      },
      {
        title: 'Exaggeration',
        text: 'A small flaw becomes a ridiculous pirate-sized problem for comic effect.',
      },
      {
        title: 'Pirate vocabulary',
        text: 'Sea-dog expressions and familiar pirate terminology make the line sound more thematic.',
      },
      {
        title: 'Unexpected comparisons',
        text: 'Comparing someone to a damaged ship, useless treasure, or a confused deckhand gives the insult its punch.',
      },
    ].map(item => (
      <div
        key={item.title}
        className="rounded-2xl border border-purple-100 bg-purple-50/50 p-4"
      >
        <h3 className="font-bold text-gray-900 mb-1">
          {item.title}
        </h3>
        <p className="text-sm text-gray-600 leading-6">
          {item.text}
        </p>
      </div>
    ))}
  </div>
</section>
<section className="space-y-4">
  <h2 className="text-2xl font-black text-gray-900">
    Pirate Words and Nautical Ideas Behind the Insults
  </h2>

  <p className="text-gray-700 leading-8">
    Pirate speech is closely associated with nautical vocabulary. Ships,
    crews, navigation, weather, ports, and treasure all provide material for
    humorous insults. Using these ideas gives a generated line a stronger
    pirate identity than simply adding “matey” or “arr” to a normal sentence.
  </p>

  <div className="overflow-x-auto rounded-2xl border">
    <table className="w-full text-sm">
      <thead className="bg-purple-50">
        <tr>
          <th className="text-left p-3 font-bold">Pirate theme</th>
          <th className="text-left p-3 font-bold">How it creates humor</th>
        </tr>
      </thead>

      <tbody>
        <tr className="border-t">
          <td className="p-3 font-semibold">Ship</td>
          <td className="p-3 text-gray-600">
            A person can be humorously compared with a damaged,
            directionless, or poorly maintained vessel.
          </td>
        </tr>

        <tr className="border-t">
          <td className="p-3 font-semibold">Treasure</td>
          <td className="p-3 text-gray-600">
            Treasure imagery creates funny contrasts between something
            supposedly valuable and something completely useless.
          </td>
        </tr>

        <tr className="border-t">
          <td className="p-3 font-semibold">Storms</td>
          <td className="p-3 text-gray-600">
            Storms provide exaggerated descriptions of chaos, noise,
            confusion, and bad decisions.
          </td>
        </tr>

        <tr className="border-t">
          <td className="p-3 font-semibold">Deck and crew</td>
          <td className="p-3 text-gray-600">
            Crew roles provide material for jokes about competence,
            leadership, and questionable seamanship.
          </td>
        </tr>

        <tr className="border-t">
          <td className="p-3 font-semibold">Sea creatures</td>
          <td className="p-3 text-gray-600">
            Gulls, barnacles, fish, and other sea-life references make
            comparisons visually funny and distinctly nautical.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</section>

<section className="space-y-4">
  <h2 className="text-2xl font-black text-gray-900">
    How to Use the Pirate Insult Generator
  </h2>

  <ol className="space-y-3">
    {[
      'Press the Generate Pirate Insult button.',
      'Read the generated pirate-style roast.',
      'Use Copy to save the line to your clipboard.',
      'Generate another line if you want a different style or comparison.',
      'Use the result for a friendly joke, pirate-themed event, game, caption, or group chat.',
    ].map((step, index) => (
      <li key={step} className="flex gap-3">
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-700 text-white flex items-center justify-center font-bold">
          {index + 1}
        </span>

        <p className="text-gray-700 leading-7 pt-0.5">
          {step}
        </p>
      </li>
    ))}
  </ol>
</section>

<section className="space-y-4">
  <h2 className="text-2xl font-black text-gray-900">
    What Can You Use Pirate Insults For?
  </h2>

  <div className="grid sm:grid-cols-2 gap-4">
    <div className="rounded-2xl border p-5">
      <h3 className="font-bold text-gray-900 mb-2">
        Pirate-themed parties
      </h3>
      <p className="text-sm text-gray-600 leading-6">
        Give guests playful pirate insults for character role-play,
        costume contests, party games, or treasure-hunt challenges.
      </p>
    </div>

    <div className="rounded-2xl border p-5">
      <h3 className="font-bold text-gray-900 mb-2">
        Friendly roast battles
      </h3>
      <p className="text-sm text-gray-600 leading-6">
        Generate exaggerated pirate roasts when you want a themed
        alternative to an ordinary comeback.
      </p>
    </div>

    <div className="rounded-2xl border p-5">
      <h3 className="font-bold text-gray-900 mb-2">
        Gaming and role-playing
      </h3>
      <p className="text-sm text-gray-600 leading-6">
        Pirate-style lines can add personality to pirate characters,
        tabletop adventures, gaming chats, and role-playing sessions.
      </p>
    </div>

    <div className="rounded-2xl border p-5">
      <h3 className="font-bold text-gray-900 mb-2">
        Social posts and captions
      </h3>
      <p className="text-sm text-gray-600 leading-6">
        Use a short pirate roast as a humorous caption or share a favorite
        generated line with friends.
      </p>
    </div>
  </div>
</section>

<section className="rounded-2xl border border-amber-200 bg-amber-50 p-6 space-y-3">
  <h2 className="text-2xl font-black text-gray-900">
    Are These Authentic Historical Pirate Insults?
  </h2>

  <p className="text-gray-700 leading-8">
    No. The insults generated here are modern fictional creations inspired
    by the way pirates are commonly portrayed in books, movies, games, and
    popular culture. They are designed to sound entertaining and nautical,
    not to reproduce documented speech from historical pirates.
  </p>

  <p className="text-gray-700 leading-8">
    Historical piracy covered different regions, languages, time periods,
    and cultures, so there was never one universal “pirate language.”
    Expressions commonly associated with pirates today are often a mixture
    of nautical terminology, fictional characterization, and later popular
    culture.
  </p>
</section>

<section className="space-y-4">
  <h2 className="text-2xl font-black text-gray-900">
    How Are Pirate Insults Created?
  </h2>

  <p className="text-gray-700 leading-8">
    A simple pirate insult can be built by combining a nautical description
    with a humorous target. For example, the structure can be thought of as:
  </p>

  <div className="rounded-2xl bg-gray-900 text-white p-6 text-center">
    <p className="text-lg font-black">
      Pirate-style description + nautical comparison + exaggerated punchline
    </p>
  </div>

  <p className="text-gray-700 leading-8">
    The generator expands on this idea with multiple themed word groups and
    sentence patterns. Because the pieces can be recombined, the tool can
    produce many different lines without requiring every possible insult to
    be manually written as a separate sentence.
  </p>
</section>

<section className="space-y-4">
  <h2 className="text-2xl font-black text-gray-900">
    Examples of Pirate-Style Insults
  </h2>

  <p className="text-gray-700 leading-8">
    Pirate insults are usually more entertaining when they are absurd and
    theatrical rather than genuinely cruel. Here are examples of the style
    this generator aims for:
  </p>

  <div className="space-y-3">
    {[
      'Ye have the navigation skills of a gull caught in a hurricane.',
      'I have seen barnacles with more useful opinions than yours.',
      'Your finest treasure would be a map that leads anywhere but here.',
      'Even a sinking rowboat would question your command.',
      'The sea has swallowed better ideas than that one.',
      'Ye swagger like a captain but steer like a lost deckhand.',
    ].map(example => (
      <div
        key={example}
        className="rounded-2xl border bg-white p-4 text-gray-800 italic"
      >
        “{example}”
      </div>
    ))}
  </div>
</section>

<section className="space-y-4">
  <h2 className="text-2xl font-black text-gray-900">
    Pirate Insults vs. Ordinary Insults
  </h2>

  <p className="text-gray-700 leading-8">
    A normal insult focuses on the person directly. A pirate insult adds a
    fictional setting around the joke. Instead of simply calling someone
    incompetent, a pirate-themed line might compare their abilities with a
    damaged ship, a confused navigator, or a crew member who has lost the
    treasure map.
  </p>

  <p className="text-gray-700 leading-8">
    That extra layer is what makes the generator useful for themed
    entertainment. The goal is not simply to make an insult harsher; it is
    to make the insult sound like it belongs in a pirate adventure.
  </p>
</section>

<section className="space-y-4">
  <h2 className="text-2xl font-black text-gray-900">
    Common Pirate Expressions and What They Mean
  </h2>

  <p className="text-gray-700 leading-8">
    Pirate-themed language often borrows familiar nautical expressions and
    exaggerated character phrases. Understanding the vocabulary makes it
    easier to recognize why a generated insult sounds like a pirate rather
    than an ordinary modern roast.
  </p>

  <div className="grid gap-3">
    {[
      {
        term: 'Matey',
        meaning:
          'A friendly or familiar way of addressing another person in pirate-themed speech.',
      },
      {
        term: 'Sea dog',
        meaning:
          'A traditional nautical expression associated with an experienced sailor.',
      },
      {
        term: 'Deck',
        meaning:
          'The surface or floor of a ship, frequently used in pirate stories and nautical expressions.',
      },
      {
        term: 'Ahoy',
        meaning:
          'A traditional nautical call used to attract attention or greet someone.',
      },
      {
        term: 'Landlubber',
        meaning:
          'A person unfamiliar with the sea or sailing; especially useful when creating a playful pirate-themed insult.',
      },
      {
        term: 'Scallywag',
        meaning:
          'A playful word often associated with a mischievous or troublesome person in pirate-themed entertainment.',
      },
    ].map(item => (
      <div key={item.term} className="rounded-2xl border p-4">
        <h3 className="font-bold text-gray-900">
          {item.term}
        </h3>
        <p className="text-sm text-gray-600 leading-6 mt-1">
          {item.meaning}
        </p>
      </div>
    ))}
  </div>
</section>

<section className="space-y-4">
  <h2 className="text-2xl font-black text-gray-900">
    How to Make Your Own Pirate Insult
  </h2>

  <p className="text-gray-700 leading-8">
    You do not need a large vocabulary to create a convincing pirate-style
    insult. Start with an exaggerated description of the person, connect it
    to something associated with the sea, and finish with a surprising
    comparison.
  </p>

  <p className="text-gray-700 leading-8">
    For example, instead of saying someone is bad at giving directions,
    turn the idea into a nautical comparison: imagine a navigator who could
    lose their way while standing beside the harbor. The humor comes from
    taking an ordinary weakness and placing it inside an exaggerated pirate
    world.
  </p>

  <div className="rounded-2xl border-2 border-purple-200 bg-purple-50 p-5">
    <h3 className="font-bold text-gray-900 mb-3">
      Simple formula
    </h3>

    <p className="font-black text-purple-800">
      [Pirate description] + [nautical comparison] + [unexpected exaggeration]
    </p>
  </div>
</section>

<section className="space-y-4">
  <h2 className="text-2xl font-black text-gray-900">
    Keeping Pirate Insults Funny and Playful
  </h2>

  <p className="text-gray-700 leading-8">
    The best pirate insults are usually absurd rather than genuinely
    offensive. Comparing someone to a confused sailor, a leaky rowboat, or
    a treasure map that leads nowhere creates a recognizable joke without
    needing personal attacks.
  </p>

  <p className="text-gray-700 leading-8">
    If you are using the generator with friends, at a party, or during a
    game, choose lines that match the tone of the group. A theatrical pirate
    roast works best when everyone understands that the goal is humor.
  </p>
</section>

<section className="space-y-4">
  <h2 className="text-2xl font-black text-gray-900">
    Why Are Pirate Insults Funny?
  </h2>

  <p className="text-gray-700 leading-8">
    Pirate insults are funny because they combine an exaggerated character
    voice with unexpected imagery. A normal criticism can become a miniature
    pirate adventure when it involves ships, storms, treasure, gulls,
    barnacles, anchors, and questionable navigation.
  </p>

  <p className="text-gray-700 leading-8">
    The pirate voice also encourages theatrical delivery. Words such as
    “matey,” “landlubber,” and “sea dog” immediately establish a fictional
    setting, while nautical comparisons make the insult feel like part of
    the same world.
  </p>

  <p className="text-gray-700 leading-8">
    That combination makes pirate insults particularly useful for role-play,
    themed parties, games, captions, and friendly roast sessions where an
    ordinary insult would feel too predictable.
  </p>
</section>





    
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
          <p className="text-sm text-gray-500 mb-4">
  Finished sailing the seven seas? Try another themed insult generator,
  roast generator, or comeback tool.
</p>
            <p className="text-sm text-gray-500 mb-4">Every generator in the library — jump to any of them.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {related.map(r => {
                const href = r.slug === 'shakespeare-insult-generator'
                  ? '/fun/insult-generator/shakespeare-insult-generator'
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
