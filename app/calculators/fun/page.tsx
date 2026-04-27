import type { Metadata } from 'next'
import Link from 'next/link'
import { Smile, ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Fun & Entertainment Calculators – 30 Free Tools for Every Occasion',
  description: 'Zodiac signs, love compatibility, personality quizzes, trivia, name generators, Morse code, emoji translator, procrastination score and 22 more free fun tools. No signup, no ads, instant results.',
  keywords: [
    'fun calculators online free',
    'entertainment tools online',
    'zodiac sign calculator free',
    'love compatibility calculator',
    'personality quiz online free',
    'lucky number calculator',
    'trivia quiz online free',
    'random name generator',
    'superhero name generator',
    'would you rather generator',
    'emoji translator online',
    'morse code translator free',
    'procrastination test online',
    'sleep debt calculator',
    'screen time calculator',
    'how rich am I calculator',
    'age in days calculator',
    'birthday countdown timer',
    'pizza calculator for group',
    'coffee lifetime calculator',
    'pig latin converter',
    'uwu text generator',
    'fortune cookie online',
    'villain name generator',
    'random fact generator',
    'fun tools no signup',
    'free entertainment calculators 2026',
    'funny calculators online',
    'tooltrio.com fun tools',
    'free calculator no signup',
  ],
  alternates: { canonical: 'https://tooltrio.com/calculators/fun' },
  openGraph: {
    title: '30 Free Fun & Entertainment Calculators – Zodiac, Trivia, Name Generators & More',
    description: 'Zodiac signs, love compatibility, personality quizzes, trivia, name generators, Morse code, emoji translator and 23 more free fun tools. Instant results, zero signup.',
    url: 'https://tooltrio.com/calculators/fun',
    type: 'website',
  },
}

const tools = [
  // Personality & Identity
  { name: 'Lucky Number',           desc: 'Your life path & numerology lucky numbers',        href: '/calculators/fun/lucky-number',           icon: '🍀', tag: 'Personality', popular: true  },
  { name: 'Zodiac Calculator',      desc: 'Western + Chinese zodiac, traits & compatibility', href: '/calculators/fun/zodiac-calculator',       icon: '⭐', tag: 'Personality', popular: true  },
  { name: 'Love Compatibility',     desc: 'Name & birthday match — how well do you fit?',     href: '/calculators/fun/love-compatibility',      icon: '💕', tag: 'Personality', popular: true  },
  { name: 'Personality Quiz',       desc: 'Myers-Briggs style type test, 3 minutes flat',     href: '/calculators/fun/personality-quiz',        icon: '🧬', tag: 'Personality', popular: true  },
  { name: 'Procrastination Score',  desc: 'Find your type, your triggers, actual fix tips',   href: '/calculators/fun/procrastination-score',   icon: '⏰', tag: 'Personality', popular: false },

  // Name Generators
  { name: 'Random Name Generator',  desc: 'Baby names, usernames, characters — any origin',  href: '/calculators/fun/random-name-generator',   icon: '🎲', tag: 'Generators',  popular: true  },
  { name: 'Superhero Name',         desc: 'Your hero identity, powers & origin story',        href: '/calculators/fun/superhero-name',          icon: '🦸', tag: 'Generators',  popular: true  },
  { name: 'Villain Name',           desc: 'Your evil alter ego, master plan & nemesis',       href: '/calculators/fun/villain-name',            icon: '😈', tag: 'Generators',  popular: false },
  { name: 'Fantasy Name Generator', desc: 'Elves, dwarves, wizards, dragons — D&D ready',    href: '/calculators/fun/fantasy-name-generator',  icon: '🧙', tag: 'Generators',  popular: false },
  { name: 'Compliment Generator',   desc: 'Specific, genuine compliments — not generic cards',href: '/calculators/fun/compliment-generator',    icon: '💐', tag: 'Generators',  popular: false },
  { name: 'Insult Generator',       desc: 'Shakespearean roasts — dramatic, never cruel',     href: '/calculators/fun/insult-generator',        icon: '🎭', tag: 'Generators',  popular: false },
  { name: 'Fortune Cookie',         desc: 'Virtual fortune cookie with wisdom & lucky numbers',href: '/calculators/fun/fortune-cookie',         icon: '🥠', tag: 'Generators',  popular: true  },
  { name: 'Would You Rather',       desc: 'Impossible dilemmas for parties, dates & groups',  href: '/calculators/fun/would-you-rather',        icon: '🤔', tag: 'Generators',  popular: false },
  { name: 'Random Fact',            desc: 'Verified surprising facts across 8 categories',    href: '/calculators/fun/random-fact-generator',   icon: '🎯', tag: 'Generators',  popular: false },

  // Life Stats
  { name: 'Age in Days',            desc: 'Days, heartbeats, breaths — your life in numbers', href: '/calculators/fun/age-in-days',             icon: '🎂', tag: 'Life Stats',  popular: true  },
  { name: 'Birthday Countdown',     desc: 'Live countdown to your next birthday + day of week',href: '/calculators/fun/birthday-countdown',     icon: '🎉', tag: 'Life Stats',  popular: false },
  { name: 'How Rich Am I?',         desc: 'Your real global wealth percentile — eye-opening', href: '/calculators/fun/how-rich-am-i',           icon: '💰', tag: 'Life Stats',  popular: true  },
  { name: 'Life Expectancy Fun',    desc: 'Lifestyle-based estimate with habit impact sliders',href: '/calculators/fun/life-expectancy-fun',     icon: '🌟', tag: 'Life Stats',  popular: false },
  { name: 'Sleep Debt',             desc: 'Your sleep deficit, recovery time & real effects', href: '/calculators/fun/sleep-debt-calculator',   icon: '😴', tag: 'Life Stats',  popular: false },

  // Habits & Lifestyle
  { name: 'Coffee Calculator',      desc: 'Lifetime cups, caffeine & money spent on coffee',  href: '/calculators/fun/coffee-calculator',       icon: '☕', tag: 'Habits',      popular: true  },
  { name: 'Social Media Addiction', desc: 'Your addiction score, type & platform breakdown',  href: '/calculators/fun/social-media-addiction',  icon: '📱', tag: 'Habits',      popular: false },
  { name: 'Screen Time Stats',      desc: 'Lifetime screen time & what you could do instead', href: '/calculators/fun/screen-time-calculator',  icon: '📺', tag: 'Habits',      popular: false },
  { name: 'Calories in Beer',       desc: 'Beer calories by ABV + how long to burn it off',   href: '/calculators/fun/calories-in-beer',        icon: '🍺', tag: 'Habits',      popular: false },
  { name: 'Pizza Calculator',       desc: 'Exactly how many pizzas to order for any group',   href: '/calculators/fun/pizza-calculator',        icon: '🍕', tag: 'Habits',      popular: true  },
  { name: 'Workout Excuses',        desc: 'Creative, oddly believable reasons to skip the gym',href: '/calculators/fun/workout-excuse-generator',icon: '🏃', tag: 'Habits',     popular: false },

  // Text & Language
  { name: 'Emoji Translator',       desc: 'Convert text to emoji and decode emoji back',      href: '/calculators/fun/emoji-translator',        icon: '😊', tag: 'Language',    popular: true  },
  { name: 'Morse Code',             desc: 'Text ↔ Morse code with audio playback & chart',    href: '/calculators/fun/text-to-morse',           icon: '📡', tag: 'Language',    popular: true  },
  { name: 'Pig Latin',              desc: 'Full paragraph translator with reverse decoding',   href: '/calculators/fun/pig-latin-converter',     icon: '🐷', tag: 'Language',    popular: false },
  { name: 'UWU Text Generator',     desc: 'Kawaii-ify any text with adjustable uwu intensity', href: '/calculators/fun/uwu-text-generator',      icon: '🐾', tag: 'Language',    popular: false },

  // Games
  { name: 'Trivia Quiz',            desc: '10 random questions, 8 categories, timed mode',    href: '/calculators/fun/trivia-quiz',             icon: '🧠', tag: 'Games',       popular: true  },
]

const TAG_CONFIG: Record<string, { color: string; bg: string; border: string; desc: string }> = {
  Personality: { color: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-200', desc: 'Zodiac, personality types, lucky numbers & compatibility' },
  Generators:  { color: 'text-pink-700',   bg: 'bg-pink-50',   border: 'border-pink-200',   desc: 'Names, fortunes, compliments, insults & impossible dilemmas' },
  'Life Stats':{ color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-200', desc: 'Age, wealth, sleep debt & life expectancy in hard numbers' },
  Habits:      { color: 'text-green-700',  bg: 'bg-green-50',  border: 'border-green-200',  desc: 'Coffee, screen time, beer calories & pizza math' },
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
    q: 'Which fun calculator is the most popular?',
    a: 'The Love Compatibility Calculator, Zodiac Sign Calculator, and How Rich Am I? tool consistently attract the most visitors — people share their results on social media which drives a lot of organic traffic. The Personality Quiz and Trivia Quiz also see heavy use from people who challenge friends to beat their scores.',
  },
  {
    q: 'Can I use these tools on my phone?',
    a: 'All 30 tools are fully mobile-responsive and work on iPhone, Android, and tablets without downloading any app. The birthday countdown ticks live on mobile, the Morse code audio plays through your phone speaker, and result cards are designed to screenshot cleanly for Instagram Stories.',
  },
  {
    q: 'Are the results shareable on social media?',
    a: 'Yes — most tools include a share button or are designed with screenshot-friendly result cards. Zodiac results, personality types, procrastination scores, and How Rich Am I percentiles are among the most-shared content from this site. People compare results with friends, which is half the fun.',
  },
  {
    q: 'Are these tools appropriate for kids?',
    a: 'All tools on the Fun & Entertainment page are family-friendly. The Personality Quiz, Trivia Quiz, Superhero Name Generator, Fantasy Name Generator, and Would You Rather are particularly popular with younger users. There is no adult content, violence, or inappropriate material anywhere in the fun category.',
  },
]

export default function FunPage() {
  const grouped = Object.keys(TAG_CONFIG).map(tag => ({
    tag, tools: tools.filter(t => t.tag === tag)
  }))

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-pink-600">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/calculators" className="hover:text-pink-600">Calculators</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Fun &amp; Entertainment</span>
      </nav>

      {/* Hero */}
      <div className="flex flex-wrap items-start gap-4 mb-6">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg flex-shrink-0">
          <Smile className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900">Fun &amp; Entertainment</h1>
          <p className="text-pink-600 font-semibold mt-0.5">30 Free Tools &middot; Zero Seriousness &middot; 100% Fun 🎉</p>
        </div>
      </div>

      {/* Intro — human, not boilerplate */}
      <div className="prose prose-gray max-w-3xl mb-8 text-gray-600 leading-relaxed">
        <p className="text-lg">
          Not everything needs to be a spreadsheet. We built 30 free fun tools for the moments when
          you want to know <strong>how many days old you are</strong>, argue about your
          <strong> zodiac compatibility</strong> with someone, settle who owes the most pizza at a party,
          or finally find out what your Shakespearean villain name would be.
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
          {tools.filter(t => t.popular).map(tool => {
            const cfg = TAG_CONFIG[tool.tag]
            return (
              <Link key={tool.href} href={tool.href}
                className={`group p-4 rounded-2xl bg-white border-2 ${cfg.border} hover:shadow-md transition-all duration-200`}>
                <span className="text-2xl mb-2 block">{tool.icon}</span>
                <p className="font-bold text-gray-900 text-sm group-hover:text-pink-600 transition-colors leading-tight">{tool.name}</p>
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
                  className={`group flex items-start gap-4 p-4 rounded-2xl bg-white border-2 ${cfg.border} hover:shadow-md transition-all duration-200`}>
                  <span className={`w-12 h-12 rounded-xl ${cfg.bg} border ${cfg.border} flex items-center justify-center text-2xl flex-shrink-0 block`}>{tool.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 group-hover:text-pink-600 transition-colors">{tool.name}</p>
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
        <h2 className="text-2xl font-black text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-5">
          {SEO_FAQS.map(({ q, a }) => (
            <div key={q} className="bg-white border-2 border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 mb-2">{q}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cross-category CTA */}
      <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 text-white text-center">
        <p className="text-2xl font-black mb-2">Done playing? Time to get serious. 💼</p>
        <p className="text-pink-100 mb-4 max-w-lg mx-auto">
          We also build tools that actually help with money, health, and development — same no-signup, no-ads approach.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/calculators/finance" className="px-5 py-2.5 bg-white text-pink-600 rounded-xl font-bold text-sm hover:bg-pink-50 transition-colors">
            Finance Calculators →
          </Link>
          <Link href="/calculators/health" className="px-5 py-2.5 bg-pink-400 text-white rounded-xl font-bold text-sm hover:bg-pink-300 transition-colors border border-pink-300">
            Health Calculators →
          </Link>
          <Link href="/calculators/dev" className="px-5 py-2.5 bg-purple-400 text-white rounded-xl font-bold text-sm hover:bg-purple-300 transition-colors border border-purple-300">
            Dev Tools →
          </Link>
        </div>
      </div>
    </div>
  )
}
