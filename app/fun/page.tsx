import type { Metadata } from 'next'
import Link from 'next/link'
import { generateCollectionStructuredData } from '@/lib/seo/structured-data'
import { generateFAQStructuredData } from '@/lib/seo/metadata'

// Inline SVG icons — no external package needed in server components
function Calculator({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="10" y2="10"/><line x1="8" y1="14" x2="10" y2="14"/><line x1="8" y1="18" x2="10" y2="18"/><line x1="14" y1="10" x2="16" y2="10"/><line x1="14" y1="14" x2="16" y2="14"/><line x1="14" y1="18" x2="16" y2="18"/></svg> }
function ChevronRight({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><polyline points="9 18 15 12 9 6"/></svg> }
function Smile({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><circle cx="12" cy="12" r="10"/><path d="M8 13s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg> }


export const metadata: Metadata = {
  title: '42 Free Fun Calculators & Entertainment Tools 2026 | ToolTrio',
  description: '42 free fun tools including Insult Generator, Shakespeare Insult Generator, zodiac, trivia, name generators and more.',
  keywords: [
    'fun calculators online free',
    'entertainment tools online',
    'zodiac sign calculator free',
    'love compatibility calculator',
    'lucky number calculator',
    'trivia quiz online free',
    'random name generator',
    'insult generator',
    'shakespeare insult generator',
  ],
  alternates: { canonical: 'https://tooltrio.com/fun' },
  openGraph: {
    title: '42 Free Fun Tools – Insult Generators, Zodiac & Trivia | ToolTrio',
    description: 'Insult Generator, Shakespeare Insult Generator, zodiac, trivia, name generators and more. Instant results.',
    url: 'https://tooltrio.com/fun',
    type: 'website',
    images: [{ url: 'https://tooltrio.com/og-image.png', width: 1200, height: 630, alt: 'ToolTrio' }],
  },
}

const tools = [
  // Personality & Identity
  { name: 'Lucky Number',           desc: 'Your life path & numerology lucky numbers',        href: '/fun/lucky-number',           icon: '🍀', tag: 'Personality', popular: false  },
  { name: 'Zodiac Calculator',      desc: 'Western + Chinese zodiac, traits & compatibility', href: '/fun/zodiac-calculator',       icon: '⭐', tag: 'Personality', popular: false  },
  { name: 'Love Compatibility',     desc: 'Name & birthday match — how well do you fit?',     href: '/fun/love-compatibility',      icon: '💕', tag: 'Personality', popular: false  },

  // Name Generators
  { name: 'Random Name Generator',  desc: 'Baby names, usernames, characters — any origin',  href: '/fun/random-name-generator',   icon: '🎲', tag: 'Generators',  popular: false  },
  { name: 'Superhero Name',         desc: 'Your hero identity, powers & origin story',        href: '/fun/superhero-name',          icon: '🦸', tag: 'Generators',  popular: false  },
  { name: 'Villain Name',           desc: 'Your evil alter ego, master plan & nemesis',       href: '/fun/villain-name',            icon: '😈', tag: 'Generators',  popular: false },
  { name: 'Fantasy Name Generator', desc: 'Elves, dwarves, wizards, dragons — D&D ready',    href: '/fun/fantasy-name-generator',  icon: '🧙', tag: 'Generators',  popular: false },
  { name: 'Compliment Generator',   desc: 'Specific, genuine compliments — not generic cards',href: '/fun/compliment-generator',    icon: '💐', tag: 'Generators',  popular: false },
  { name: 'Insult Generator',       desc: '19 generators — Shakespeare, pirate, medieval & more', href: '/fun/insult-generator', icon: '🔥', tag: 'Generators',  popular: true  },
  { name: 'Fortune Cookie',         desc: 'Virtual fortune cookie with wisdom & lucky numbers',href: '/fun/fortune-cookie',         icon: '🥠', tag: 'Generators',  popular: false  },
  { name: 'Would You Rather',       desc: 'Impossible dilemmas for parties, dates & groups',  href: '/fun/would-you-rather',        icon: '🤔', tag: 'Generators',  popular: false },
  { name: 'Random Fact',            desc: 'Verified surprising facts across 8 categories',    href: '/fun/random-fact-generator',   icon: '🎯', tag: 'Generators',  popular: false },

  // Life Stats
  { name: 'Age in Days',            desc: 'Days, heartbeats, breaths — your life in numbers', href: '/fun/age-in-days',             icon: '🎂', tag: 'Life Stats',  popular: false  },
  { name: 'Birthday Countdown',     desc: 'Live countdown to your next birthday + day of week',href: '/fun/birthday-countdown',     icon: '🎉', tag: 'Life Stats',  popular: false },

  // Habits & Lifestyle
  { name: 'Coffee Calculator',      desc: 'Lifetime cups, caffeine & money spent on coffee',  href: '/fun/coffee-calculator',       icon: '☕', tag: 'Habits',      popular: false  },
  { name: 'Pizza Calculator',       desc: 'Exactly how many pizzas to order for any group',   href: '/fun/pizza-calculator',        icon: '🍕', tag: 'Habits',      popular: false  },
  { name: 'Workout Excuses',        desc: 'Creative, oddly believable reasons to skip the gym',href: '/fun/workout-excuse-generator',icon: '🏃', tag: 'Habits',     popular: false },

  // Text & Language
  { name: 'Emoji Translator',       desc: 'Convert text to emoji and decode emoji back',      href: '/fun/emoji-translator',        icon: '😊', tag: 'Language',    popular: false  },
  { name: 'Morse Code',             desc: 'Text ↔ Morse code with audio playback & chart',    href: '/fun/text-to-morse',           icon: '📡', tag: 'Language',    popular: false  },
  { name: 'Pig Latin',              desc: 'Full paragraph translator with reverse decoding',   href: '/fun/pig-latin-converter',     icon: '🐷', tag: 'Language',    popular: false },
  { name: 'Shakespeare Translator', desc: 'Modern English ↔ Shakespearean, with a full meanings glossary', href: '/fun/shakespeare-translator', icon: '🪶', tag: 'Language', popular: true },
  { name: 'UWU Text Generator',     desc: 'Kawaii-ify any text with adjustable uwu intensity', href: '/fun/uwu-text-generator',      icon: '🐾', tag: 'Language',    popular: false },

  // Games
  { name: 'Trivia Quiz',            desc: '10 random questions, 8 categories, timed mode',    href: '/fun/trivia-quiz',             icon: '🧠', tag: 'Games',       popular: false  },
]

const TAG_CONFIG: Record<string, { color: string; bg: string; border: string; desc: string }> = {
  Personality: { color: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-200', desc: 'Zodiac, lucky numbers & compatibility' },
  Generators:  { color: 'text-pink-700',   bg: 'bg-pink-50',   border: 'border-pink-200',   desc: 'Names, fortunes, compliments, insults & impossible dilemmas' },
  'Life Stats':{ color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-200', desc: 'Age, birthdays & life in hard numbers' },
  Habits:      { color: 'text-green-700',  bg: 'bg-green-50',  border: 'border-green-200',  desc: 'Coffee, pizza math & everyday habits' },
  Language:    { color: 'text-blue-700',   bg: 'bg-blue-50',   border: 'border-blue-200',   desc: 'Emoji, Morse code, Pig Latin & UWU transformers' },
  Games:       { color: 'text-red-700',    bg: 'bg-red-50',    border: 'border-red-200',    desc: 'Trivia, quizzes & interactive brain-teasers' },
}

const SEO_FAQS = [
  {
    q: 'Are all these fun calculators actually free?',
    a: 'Yes — every tool on this page is completely free with no account, no email, and no subscription required. We do not put fun behind a paywall. Open any tool and start using it immediately.',
  },
  {
    q: 'Do these tools store my personal data?',
    a: 'No. Every calculator on this site runs entirely in your browser. Nothing you type — your name, birthday, income, or any other input — is ever sent to a server, stored in a database, or shared with anyone. Close the tab and your data is gone.',
  },
  {
    q: 'Which fun tools are featured as most popular?',
    a: 'The featured Most Popular section highlights the Insult Generator and Shakespeare Insult Generator. They are designed for quick results, easy sharing, and playful group conversations.',
  },
  {
    q: 'What can I do with the Insult Generator and Shakespeare Insult Generator?',
    a: 'Use the Insult Generator to explore themed roasts and comebacks, and the Shakespeare Insult Generator to create dramatic Elizabethan-style put-downs. Both are free and run in your browser.',
  },
  {
    q: 'Can I use these tools on my phone?',
    a: 'All 42 tools are fully mobile-responsive and work on iPhone, Android, and tablets without downloading any app. The birthday countdown ticks live on mobile, the Morse code audio plays through your phone speaker, and result cards are designed to screenshot cleanly for Instagram Stories.',
  },
  {
    q: 'Are the results shareable on social media?',
    a: 'Yes — most tools include a share button or are designed with screenshot-friendly result cards. Zodiac results, trivia scores, and insult-generator results are among the most-shared content from this site. People compare results with friends, which is half the fun.',
  },
  {
    q: 'Are these tools appropriate for kids?',
    a: 'The Fun & Entertainment collection is designed for light, playful use. For insult tools, preview a generated line before sharing it and keep the humor appropriate to the audience. Trivia Quiz, Superhero Name Generator, Fantasy Name Generator, and Would You Rather are particularly popular for casual group use. There is no adult content, violence, or inappropriate material anywhere in the fun category.',
  },
]

export default function FunPage() {
  const grouped = Object.keys(TAG_CONFIG).map(tag => ({
    tag, tools: tools.filter(t => t.tag === tag)
  }))
  const faqStructuredData = generateFAQStructuredData(SEO_FAQS.map(({ q, a }) => ({ question: q, answer: a })))
  const structuredData = generateCollectionStructuredData({
    name: '42 Free Fun Calculators & Entertainment Tools',
    description: 'Free fun calculators, generators, quizzes and entertainment tools from ToolTrio.',
    url: 'https://tooltrio.com/fun',
    categoryName: 'Fun & Entertainment',
    categoryUrl: 'https://tooltrio.com/fun',
    items: tools.map(tool => ({ name: tool.name, url: `https://tooltrio.com${tool.href}` })),
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-pink-600">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Fun & Entertainment</span>
      </nav>

      {/* Hero */}
      <div className="flex flex-wrap items-start gap-4 mb-6">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg flex-shrink-0">
          <Smile className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900" style={{fontFamily:"'Inter', system-ui, sans-serif"}}>Fun & Entertainment <span className="text-green-600">| ToolTrio</span></h1>
          <p className="text-pink-600 font-semibold mt-0.5">42 Free Tools &middot; Zero Seriousness &middot; 100% Fun 🎉</p>
        </div>
      </div>

      {/* Intro — human, not boilerplate */}
      <div className="prose prose-gray max-w-3xl mb-8 text-gray-600 leading-relaxed">
        <p className="text-lg">
          Not everything needs to be a spreadsheet. We built 42 free fun tools for the moments when
          you want to know <strong>how many days old you are</strong>, argue about your
          <strong> zodiac compatibility</strong> with someone, settle who owes the most pizza at a party,
          or settle the group chat with a fresh insult. The two standout tools are the
          <strong>Insult Generator</strong> and <strong>Shakespeare Insult Generator</strong> — quick, shareable tools built for a little friendly chaos.
        </p>
        <p className="mt-3">
          Every tool runs entirely in your browser — <strong>no account, no email, nothing stored</strong>.
          Results are designed to be shared, debated, and occasionally humbling.
        </p>
      </div>

      {/* Popular row */}
      <section className="mb-10" aria-label="Most popular fun tools">
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
          <span className="text-pink-500">⭐</span> Most Popular
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {[
            tools.find(t => t.href === '/fun/insult-generator')!,
            { name: 'Shakespeare Insult Generator', desc: 'Elizabethan-style put-downs with a huge library of unique lines', href: '/fun/shakespeare-insult-generator', icon: '🎭', tag: 'Generators' as const, popular: false },
            tools.find(t => t.href === '/fun/shakespeare-translator')!,
          ].map(tool => {
            const cfg = TAG_CONFIG[tool.tag]
            return (
              <Link key={tool.href} href={tool.href}
                className={`group p-4 rounded-2xl bg-white border-2 ${cfg.border} hover:shadow-md transition-all`}>
                <span className="text-2xl mb-2 block">{tool.icon}</span>
                <p className="font-bold text-gray-900 text-sm group-hover:text-pink-600 transition-all leading-tight">{tool.name}</p>
                <p className="text-xs text-gray-400 mt-1 leading-snug line-clamp-2">{tool.desc}</p>
              </Link>
            )
          })}
        </div>
      </section>

      {/* By category */}
      {grouped.map(({ tag, tools: catTools }) => {
        const cfg = TAG_CONFIG[tag]
        const iconMap: Record<string, string> = {
          Personality: '🧬', Generators: '✨', 'Life Stats': '📊', Habits: '🔄', Language: '💬', Games: '🎮'
        }
        return (
          <section key={tag} className="mb-10" aria-label={`${tag} tools`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl ${cfg.bg} border ${cfg.border} flex items-center justify-center text-xl`}>
                {iconMap[tag]}
              </div>
              <div>
                <h2 className="text-xl font-black text-gray-900">{tag}</h2>
                <p className="text-sm text-gray-500">{cfg.desc}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {catTools.map(tool => (
                <Link key={tool.href} href={tool.href}
                  className={`group flex items-start gap-4 p-4 rounded-2xl bg-white border-2 ${cfg.border} hover:shadow-md transition-all`}>
                  <span className={`w-12 h-12 rounded-xl ${cfg.bg} border ${cfg.border} flex items-center justify-center text-2xl flex-shrink-0 block`}>{tool.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 group-hover:text-pink-600 transition-all">{tool.name}</p>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{tool.desc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-pink-400 flex-shrink-0 mt-1" />
                </Link>
              ))}
            </div>
          </section>
        )
      })}

      {/* SEO FAQ section */}
      <section className="mt-10 mb-8" aria-label="Frequently asked questions">
        <h2 className="text-2xl font-black text-gray-900 mb-6" style={{fontFamily:"'Inter', system-ui, sans-serif"}}>Frequently Asked Questions</h2>
        <div className="space-y-5">
          {SEO_FAQS.map(({ q, a }) => (
            <div key={q} className="bg-white border-2 border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 mb-2">{q}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>
</div>
    </>
  )
}
