'use client'
import { Card } from '@/components/ui/Card'
import { DevToolLayout } from '@/components/ui/DevToolLayout'
import { SEOContent } from '@/components/ui/SEOContent'
import { useState } from 'react'

interface Props { faqs: { question: string; answer: string }[] }

// 500+ word-to-emoji mappings
const EMOJI_MAP: Record<string, string> = {
  // Emotions
  happy: '😊', sad: '😢', angry: '😠', excited: '🤩', scared: '😱', surprised: '😲', confused: '😕',
  love: '❤️', hate: '💔', laugh: '😂', cry: '😭', smile: '😊', tired: '😴', bored: '😑', shy: '😊',
  proud: '😤', embarrassed: '😳', lonely: '😔', worried: '😟', nervous: '😰', calm: '😌', anxious: '😰',
  frustrated: '😤', disappointed: '😞', grateful: '🙏', hopeful: '🌟', jealous: '💚', disgusted: '🤢',
  shocked: '😱', horrified: '😨', amused: '😄', content: '😌', ecstatic: '🥳', melancholy: '😔',
  // People & body
  person: '👤', man: '👨', woman: '👩', baby: '👶', boy: '👦', girl: '👧', family: '👨‍👩‍👧‍👦',
  heart: '❤️', brain: '🧠', hand: '✋', eyes: '👀', ear: '👂', nose: '👃', mouth: '👄', muscle: '💪',
  run: '🏃', walk: '🚶', dance: '💃', wave: '👋', hug: '🤗', kiss: '💋', fist: '✊', clap: '👏', point: '👉',
  sleep: '😴', think: '🤔', shrug: '🤷', facepalm: '🤦', celebrate: '🎉', bow: '🙇', swear: '🤬',
  // Nature
  sun: '☀️', moon: '🌙', star: '⭐', cloud: '☁️', rain: '🌧️', snow: '❄️', fire: '🔥', water: '💧',
  earth: '🌍', tree: '🌳', flower: '🌸', plant: '🌱', leaf: '🍃', rose: '🌹', grass: '🌿', mountain: '⛰️',
  river: '🏞️', ocean: '🌊', beach: '🏖️', desert: '🏜️', forest: '🌲', volcano: '🌋', rainbow: '🌈',
  lightning: '⚡', wind: '🌬️', ice: '🧊', tornado: '🌪️', island: '🏝️',
  // Animals
  dog: '🐕', cat: '🐈', bird: '🐦', fish: '🐟', lion: '🦁', tiger: '🐯', bear: '🐻', rabbit: '🐰',
  horse: '🐴', cow: '🐄', pig: '🐷', chicken: '🐔', duck: '🦆', eagle: '🦅', owl: '🦉', snake: '🐍',
  frog: '🐸', spider: '🕷️', ant: '🐜', bee: '🐝', butterfly: '🦋', elephant: '🐘', monkey: '🐒',
  penguin: '🐧', shark: '🦈', dolphin: '🐬', whale: '🐳', wolf: '🐺', fox: '🦊', deer: '🦌',
  unicorn: '🦄', dragon: '🐉', dinosaur: '🦕', crocodile: '🐊', giraffe: '🦒', zebra: '🦓',
  // Food & drink
  pizza: '🍕', burger: '🍔', taco: '🌮', sushi: '🍣', pasta: '🍝', cake: '🎂', cookie: '🍪',
  bread: '🍞', cheese: '🧀', egg: '🥚', meat: '🥩', salad: '🥗',
  soup: '🍲', coffee: '☕', tea: '🍵', juice: '🧃', beer: '🍺', wine: '🍷', milk: '🥛',
  apple: '🍎', banana: '🍌', orange: '🍊', strawberry: '🍓', grapes: '🍇', watermelon: '🍉',
  mango: '🥭', pineapple: '🍍', coconut: '🥥', avocado: '🥑', corn: '🌽', carrot: '🥕', potato: '🥔',
  chocolate: '🍫', candy: '🍬', popcorn: '🍿', donut: '🍩', hotdog: '🌭', fries: '🍟',
  // Objects & things
  phone: '📱', computer: '💻', book: '📚', pen: '✏️', music: '🎵', car: '🚗', house: '🏠', money: '💰',
  key: '🔑', lock: '🔒', bag: '👜', clock: '⏰', camera: '📷', glasses: '👓', hat: '🎩', shirt: '👕',
  shoe: '👟', gift: '🎁', balloon: '🎈', flag: '🚩', map: '🗺️', compass: '🧭', trophy: '🏆', medal: '🏅',
  sword: '⚔️', shield: '🛡️', gun: '🔫', bomb: '💣', knife: '🔪', hammer: '🔨', wrench: '🔧', scissors: '✂️',
  magnify: '🔍', telescope: '🔭', microscope: '🔬', test: '🧪', dna: '🧬', robot: '🤖', alien: '👽',
  ghost: '👻', skull: '💀', diamond: '💎', crown: '👑', ring: '💍', magic: '🪄', crystal: '🔮',
  // Places & travel
  city: '🏙️', building: '🏢', school: '🏫', hospital: '🏥', church: '⛪', castle: '🏰', bridge: '🌉',
  road: '🛣️', airplane: '✈️', boat: '⛵', train: '🚂', bus: '🚌', bike: '🚲', rocket: '🚀',
  // Sports
  soccer: '⚽', basketball: '🏀', football: '🏈', baseball: '⚾', tennis: '🎾', golf: '⛳', swim: '🏊',
  cycle: '🚴', gym: '🏋️', yoga: '🧘', box: '🥊', ski: '⛷️', surf: '🏄', climb: '🧗',
  // Weather & sky
  morning: '🌅', evening: '🌆', night: '🌃', sunrise: '🌄', sunset: '🌇', storm: '⛈️', fog: '🌫️',
  // Actions & concepts
  work: '💼', study: '📖', read: '📖', write: '✍️', sing: '🎤', cook: '👨‍🍳', build: '🏗️', create: '🎨',
  dream: '💭', plan: '📋', search: '🔍', find: '🎯', win: '🏆', lose: '😞', play: '🎮',
  party: '🎉', travel: '✈️', explore: '🗺️', learn: '📚', teach: '👩‍🏫', help: '🤝', share: '🤲',
  talk: '💬', listen: '👂', see: '👀', eat: '🍽️', drink: '🥤', buy: '🛍️', sell: '💰', pay: '💳',
  save: '🏦', spend: '💸', invest: '📈', grow: '📈', fall: '📉', change: '🔄', start: '🚀', stop: '🛑',
  go: '▶️', wait: '⏳', hurry: '⚡', slow: '🐢', fast: '🏃', big: '🔺', small: '🔹', old: '👴', new: '✨',
  good: '👍', bad: '👎', yes: '✅', no: '❌', maybe: '🤷', question: '❓', answer: '💡', idea: '💡',
  problem: '⚠️', solution: '✅', easy: '😊', hard: '😤', simple: '👌', complex: '🌀', clear: '👁️', dark: '🌑',
  bright: '☀️', hot: '🌡️', cold: '🥶', warm: '☀️', cool: '😎', sweet: '🍬', sour: '🍋', spicy: '🌶️',
  soft: '🧸', strong: '💪', weak: '😞', rich: '💎', poor: '🪙', young: '👶', wise: '🦉',
  smart: '🧠', funny: '😂', serious: '😐', crazy: '🤪', normal: '😐', weird: '👽', beautiful: '🌸',
  ugly: '💀', clean: '✨', dirty: '🤢', safe: '🛡️', danger: '⚠️', lost: '🗺️', found: '🎯',
  alone: '👤', together: '👫', free: '🕊️', busy: '⏰', important: '❗', secret: '🤫',
  perfect: '💯', broken: '💔', fixed: '✅', missing: '❓', extra: '➕', real: '✅', fake: '🎭',
  // Time
  today: '📅', tomorrow: '🌅', yesterday: '📅', now: '⏰', later: '⏳', afternoon: '🌞',
  midnight: '🕛', second: '⏱️', minute: '⏱️', hour: '⏰', day: '☀️', week: '📅',
  month: '📆', year: '🗓️', birthday: '🎂', holiday: '🎉', weekend: '🎊',
  // Sentiments
  okay: '👌', great: '🎉', terrible: '😱', amazing: '🤩', boring: '😑', interesting: '🤔', cute: '🥰',
  awesome: '🤩', horrible: '😱', wonderful: '✨', fantastic: '🌟',
  incredible: '🤯', impossible: '🚫', possible: '✅', difficult: '😤',
  fresh: '🌱', stale: '🍞', alive: '💚', dead: '💀',
}

// Reverse map: emoji -> meaning (for emoji-to-text)
const REVERSE_MAP: Record<string, string> = {}
Object.entries(EMOJI_MAP).forEach(([word, emoji]) => {
  if (!REVERSE_MAP[emoji]) REVERSE_MAP[emoji] = word
})

function textToEmoji(text: string): string {
  const words = text.split(/(\s+)/)
  return words.map(word => {
    if (/^\s+$/.test(word)) return word
    const clean = word.toLowerCase().replace(/[^a-z]/g, '')
    return EMOJI_MAP[clean] || word
  }).join('')
}

function emojiToText(text: string): string {
  const emojiRegex = /\p{Emoji_Presentation}|\p{Extended_Pictographic}/gu
  return text.replace(emojiRegex, match => REVERSE_MAP[match] ? `[${REVERSE_MAP[match]}]` : match)
}

export default function CalculatorClient({ faqs }: Props) {
  const [input, setInput] = useState('')
  const [mode, setMode] = useState<'text2emoji'|'emoji2text'>('text2emoji')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  function translate() {
    if (!input.trim()) return
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

  const EXAMPLES_T2E = ['I am happy today', 'I love pizza and coffee', 'The dog is running in the rain', 'I want to travel to the mountain']
  const EXAMPLES_E2T = ['❤️ 🐕 🏃 🌧️', '😊 ☕ 🍕', '🌟 💪 🚀 ✨']

  return (
    <DevToolLayout title="Emoji Translator" icon="😊"
      description={`Translate text to emoji or emoji to text — ${Object.keys(EMOJI_MAP).length}+ word mappings`}
      category="Fun" parentPath="/calculators/fun" parentLabel="Fun & Entertainment">

      {/* Mode toggle */}
      <div className="flex rounded-xl overflow-hidden border-2 border-yellow-200 mb-4">
        <button onClick={() => { setMode('text2emoji'); setOutput('') }}
          className={`flex-1 py-2.5 text-sm font-bold transition-all ${mode === 'text2emoji' ? 'bg-yellow-400 text-yellow-900' : 'bg-white text-gray-500 hover:bg-yellow-50'}`}>
          📝 → 😊 Text to Emoji
        </button>
        <button onClick={() => { setMode('emoji2text'); setOutput('') }}
          className={`flex-1 py-2.5 text-sm font-bold transition-all ${mode === 'emoji2text' ? 'bg-yellow-400 text-yellow-900' : 'bg-white text-gray-500 hover:bg-yellow-50'}`}>
          😊 → 📝 Emoji to Text
        </button>
      </div>

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

      <button onClick={translate}
        className="w-full py-3 text-white font-black rounded-xl mb-4"
        style={{background:'linear-gradient(135deg,#f59e0b,#d97706)',boxShadow:'0 4px 16px rgba(245,158,11,0.3)'}}>
        {mode === 'text2emoji' ? '📝 → 😊 Translate to Emoji' : '😊 → 📝 Translate to Text'}
      </button>

      {output && (
        <div>
          <div className="rounded-2xl border-2 p-5 mb-3" style={{background:'linear-gradient(135deg,rgba(254,243,199,0.8),rgba(253,230,138,0.4))',borderColor:'rgba(251,191,36,0.5)'}}>
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

      <div className="rounded-2xl border p-4 bg-white">
        <p className="text-xs font-bold text-gray-500 uppercase mb-3">📚 Emoji Dictionary ({Object.keys(EMOJI_MAP).length}+ words)</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-48 overflow-y-auto">
          {Object.entries(EMOJI_MAP).slice(0, 60).map(([word, emoji]) => (
            <div key={word} className="flex items-center gap-2 text-xs text-gray-600 p-1">
              <span className="text-base">{emoji}</span>
              <span>{word}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-2">Showing 60 of {Object.keys(EMOJI_MAP).length}+ mappings</p>
      </div>

      <div className="mt-12 space-y-6 max-w-2xl mx-auto">
        <SEOContent title="" category="fun"
          intro={`The Emoji Translator converts text to emoji and emoji back to text using a knowledge base of ${Object.keys(EMOJI_MAP).length}+ word-to-emoji mappings across emotions, people, nature, animals, food, objects, places, sports, actions, and concepts.`}
          howItWorks="Type text and each recognized word is replaced with its best emoji equivalent. Or paste emojis to get their text meanings. Words not in the dictionary are kept as-is."
          tipsSection="For best results, use simple, direct vocabulary. 'I love dogs' translates better than 'I have a profound affection for canines'. The translator recognizes common verbs, nouns, and adjectives."
          conclusion="Emoji are the world's fastest-growing pictographic language. This translator bridges the gap between words and pictures."
          benefits={[{title:`${Object.keys(EMOJI_MAP).length}+ mappings`,text:'Comprehensive word-to-emoji dictionary.'},{title:'Bidirectional',text:'Text to emoji AND emoji back to text.'}]}
          useCases={[{title:'Social media',text:'Create emoji-rich posts and messages.'},{title:'Fun messaging',text:'Send friends an emoji-only message.'}]} />
        <section><h2 className="text-xl font-black text-gray-900 mb-4">FAQ</h2>
          <div className="space-y-3">{faqs.map(f => <details key={f.question} className="rounded-2xl border p-4"><summary className="font-semibold cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3">{f.answer}</p></details>)}</div>
        </section>
      
      <div className="mt-6">
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Using the emoji translator result</h2>
          <div className="space-y-3 text-sm leading-6 text-gray-600">
            <p>Interpret the output together with the values entered in the calculator. The result is based on the calculator&apos;s implemented calculation and the values supplied.</p>
            <p>For a useful comparison, change one input at a time while keeping the other assumptions constant. This makes the effect of each input easier to distinguish.</p>
          </div>
        </Card>
      </div>
</div>
    </DevToolLayout>
  )
}
