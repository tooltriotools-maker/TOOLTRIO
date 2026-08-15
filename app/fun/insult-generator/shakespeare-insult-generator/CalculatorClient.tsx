'use client'
import { DevToolLayout } from '@/components/ui/DevToolLayout'
import { SEOContent } from '@/components/ui/SEOContent'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { RefreshCw, Copy, Check } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[] }

// CHARACTER: 100 items — used ×2 in full mode
const CHARACTER = [
  'artless','bawdy','beslubbering','bootless','churlish',
  'clouted','craven','currish','dankish','dissembling',
  'droning','errant','fawning','fobbing','frothy',
  'gleeking','goatish','gorbellied','impertinent','jarring',
  'loggerheaded','lumpish','mammering','mangled','paunchy',
  'pribbling','puking','puny','qualling','rank',
  'reeky','roguish','ruttish','saucy','spleeny',
  'spongy','surly','tottering','unmuzzled','vain',
  'venomed','villainous','warped','wayward','weedy',
  'yeasty','witless','brainless','miserly','cantankerous',
  'blustering','blundering','boastful','brutish','clamorous',
  'cozening','crafty','cringing','debased','decrepit',
  'degenerate','despicable','doltish','dotard','driveling',
  'feeble','festering','filthy','foul','fraudulent',
  'galling','greedy','grumbling','groveling','hapless',
  'hollow','huffing','ignoble','indolent','insolent',
  'irritable','knavish','leering','loathsome','lurking',
  'malicious','mewling','moping','morose','muttering',
  'nefarious','obsequious','odious','paltry','peevish',
  'pestilent','pitiable','plodding','pompous','prattling',
  'presumptuous','querulous','raving','scheming','scurvy',
  'shuffling','simpering','slothful','sniveling','squabbling',
  'treacherous','turbulent','unworthy','vaporous','whining'
]

// PHYSICAL: 200 items — used in both short and full modes
const PHYSICAL = [
  'beef-witted','beetle-headed','boil-brained','clay-brained',
  'crook-pated','dog-hearted','earth-vexing','elf-skinned',
  'fat-kidneyed','fen-sucked','fly-bitten','fool-born',
  'full-gorged','goose-witted','guts-griping','half-faced',
  'hedge-born','horn-mad','idle-headed','ill-breeding',
  'knotty-pated','long-tongued','maggot-pated','milk-livered',
  'motley-minded','muddy-mettled','onion-eyed','pickle-herring',
  'pigeon-livered','plume-plucked','rough-hewn','rump-fed',
  'sheep-biting','spur-galled','swag-bellied','tardy-gaited',
  'threadbare','tickle-brained','toad-spotted','weather-bitten',
  'worm-eaten','crooked-nosed','flea-bitten','foggy-minded',
  'addle-headed','bat-eared','crow-footed','stoop-shouldered',
  'wart-faced','snail-brained',
  // 150 new entries
  'ale-washed','antler-crowned','ash-faced','badger-scented','batter-skulled',
  'beetle-browed','belly-rolling','bilge-breathed','bird-witted','blister-tongued',
  'bloat-bellied','blunder-headed','boggle-eyed','bone-idle','bray-tongued',
  'bristle-chinned','broad-bottomed','bug-eyed','bull-necked','bumble-footed',
  'candle-wasted','carrot-topped','cat-scratched','chap-fallen','cheese-breathed',
  'clod-pated','clot-polling','cobweb-brained','cod-headed','cold-blooded',
  'colt-brained','cork-brained','cow-handed','crab-faced','crank-legged',
  'craven-hearted','crop-eared','cudgel-headed','damp-palmed','dead-eyed',
  'dew-lapped','dim-sighted','dish-faced','dock-tailed','doe-eyed',
  'dog-eared','dolt-brained','donkey-pated','dough-faced','drab-coated',
  'drivel-mouthed','drone-brained','dung-breathed','ear-waxed','egg-headed',
  'elbow-grease','elm-witted','empty-skulled','fat-witted','feather-brained',
  'fig-faced','filth-encrusted','flap-eared','flat-nosed','flea-riddled',
  'flint-hearted','flood-faced','fly-headed','foam-mouthed','fog-brained',
  'frost-bitten','fuddle-headed','fumble-fisted','fungus-faced','gap-toothed',
  'garlic-breathed','giddy-pated','goat-bearded','gourd-headed','gravel-voiced',
  'grime-fingered','grub-faced','gruel-brained','gull-catcher','ham-fisted',
  'hare-brained','hay-headed','hemp-seeded','herring-gutted','hide-bound',
  'hog-faced','hollow-cheeked','hound-eared','hungry-faced','ink-stained',
  'iron-witted','jelly-boned','jolt-headed','jump-brained','kelp-breathed',
  'kiln-dried','knave-headed','knob-eared','lard-brained','leaky-skulled',
  'leather-faced','lily-livered','limpet-brained','linden-witted','lip-cracked',
  'lizard-breathed','log-headed','loose-jointed','lousy-limbed','low-browed',
  'louse-infested','mangy-coated','marble-headed','marsh-fed','meat-headed',
  'melon-headed','mildew-faced','mire-splashed','mold-spotted','mop-headed',
  'moss-grown','moth-eaten','muddle-headed','mule-brained','mushroom-headed',
  'musty-faced','nit-headed','noddle-pated','noodle-brained','oak-headed',
  'oat-eared','offal-breathed','oil-stained','onion-breathed','open-mouthed',
  'oven-baked','owl-faced','ox-brained','oyster-eyed','pale-cheeked',
  'pebble-brained','peg-toothed','pickle-nosed','pig-eared','pigeon-toed',
  'pin-headed','plague-sored','plank-faced','plop-eared','potato-faced',
  'pox-marked','pumpkin-headed','putty-faced','rabbit-toothed','raven-footed',
  'reed-brained','rheum-eyed','rind-faced','rope-brained','rot-breathed',
  'rubble-skulled','rust-caked','sack-faced','scab-riddled','scarecrow-limbed',
  'scurf-headed','seaweed-haired','shag-eared','shallow-brained','sheep-faced',
  'shell-cracked','slime-fingered','slop-faced','slug-paced','smoke-dried',
  'snot-nosed','sodden-witted','soot-faced','sour-breathed','sow-faced',
  'spawn-brained','spittle-faced','splinter-brained','sponge-brained','stale-breathed',
  'stiff-necked','straw-brained','stubble-faced','swine-headed','tangle-haired',
  'tar-fingered','thistle-headed','thorn-legged','tin-eared','toad-faced',
  'tongue-tied','tooth-rotted','tub-faced','turd-breathed','turf-headed',
  'twiggy-armed','under-brained','ungainly-footed','vacant-eyed','vine-rotted',
  'wall-eyed','wart-nosed','watery-eyed','weed-grown','whey-faced',
  'wick-brained','wind-shaken','withered-limbed','worm-tongued','yellow-bellied'
]

// NOUNS: 200 items — used in both short and full modes
const NOUNS = [
  'canker-blossom','foot-licker','malt-worm','moldwarp',
  'hedge-pig','mumble-news','skainsmate','puttock',
  'knave','miscreant','varlot','wag-tail',
  'harpy','whey-face','vassal','flap-dragon',
  'giglet','minnow','pumpion','nut-hook',
  'codpiece','apple-john','barnacle','bladder',
  'boar-pig','clack-dish','coxcomb','dewberry',
  'fustilarian','lewdster','lout','maggot',
  'muck-spout','nightsoil','pignut','rascal',
  'scullion','toad','villain','weasel',
  'worm','jackanapes','mooncalf','addlepate',
  'dunghill','turnip-brain','mudlark','ragamuffin',
  'hedge-creeper','tavern-rat',
  // 150 new entries
  'adder-tongue','ale-knight','apple-squire','artichoke','ass-head',
  'bagpipe','bat-fowler','bed-presser','belly-god','bilge-rat',
  'blatherskite','blind-worm','boar-spear','bog-trotter','bone-ache',
  'bottle-head','braggart','bully-rook','burr','butter-fingers',
  'canker-worm','carpet-monger','carrot-top','cat-burglar','cesspite',
  'chaff-seed','changeling','chap-fallen','clodpoll','clotpole',
  'clownish-fool','cobweb','cock-sparrow','cold-heart','common-scold',
  'cony-catcher','craven','crow-keeper','cur','cutpurse',
  'dead-nettle','death-token','ditch-bred','dock-weed','dog-fish',
  'dotard','dragon-fly','drone','dull-head','dunghill-cock',
  'dung-worm','dust-worm','eel-skin','empty-barrel','fallow-deer',
  'fat-guts','featherweight','fen-rat','fig-seed','filth-monger',
  'fire-brand','fish-monger','fizgig','flapjack','flax-wench',
  'fly-catcher','foam-spitter','fool-fig','fritter','frog-spawn',
  'fumbler','gad-fly','gallows-bird','gape-seed','garlic-eater',
  'giddy-goose','glue-pot','gnat','goat-herder','goose-cap',
  'gormandizer','gourd-seed','grape-worm','graymalkin','grease-trap',
  'grub','gudgeon','gull','gutter-snipe','half-wit',
  'hanger-on','hay-seed','hedge-hog','heel-tap','herring-bone',
  'hobble-de-hoy','hodge-podge','hog-grubber','horn-book','horse-leech',
  'hound','idle-weed','ill-weed','inkle-weaver','jabberer',
  'jack-a-nape','jack-sauce','jam-tart','jaw-breaker','jellyfish',
  'jingle-brains','jump-twit','keel-bully','kitchen-maid','knave-child',
  'lack-brain','lack-linen','lard-lump','lazy-bones','leech',
  'lich-owl','ling-fish','lizard','loadstone','lobcock',
  'log-head','loon','losel','lousy-knave','lump-ish',
  'lurdan','lusk','maggot-pie','maltworm','mandrake',
  'mange-worm','marsh-gas','measle','mildew','minnow-brain',
  'mitten','mongrel','moon-calf','mop-squeezer','mortar-pestle',
  'moth','muck-raker','mud-worm','muddle-head','mule-driver',
  'mumpsimus','nag','nit','noodle','notch-back',
  'oaf','offal-eater','oil-cake','old-crone','onion-seed',
  'ordinary','out-scum','paddock','pale-face','pantaloon',
  'patch','patchery','pedant','penny-pincher','pestilence',
  'pie-crust','pig-nut','pilchard','pill-garlick','pinch-fart',
  'plague-sore','plodder','plonk','podger','poison-tongue',
  'popinjay','pot-sherd','pudding-head','quarrel-monger','quibbler',
  'rack-bone','rag-muffin','ramp','ratsbane','rattle-cap',
  'recreant','rib-roaster','riff-raff','rind-worm','road-hog',
  'roister-doister','ronyon','rot-gut','ruffian','rust-bucket',
  'saddleback','salt-butter','scab','scapegrace','scamp',
  'scandal-monger','scare-crow','scold','scum-bag','seadog',
  'shag-rat','shrew','slubberdegullion','slug','sneak-thief',
  'snot-rag','spigot-sucker','sponger','stone-cutter','strumpet',
  'swine-herd','tallow-catch','talon-gripper','tardy-gaited','tattler',
  'thorn-back','toad-eater','tomb-robber','toper','tripe-visage',
  'truant','tub-thumper','turdling','twittering-fool','under-sneak',
  'vagabond','viper','wag-halter','wart-monger','water-fly',
  'weed-picker','wet-blanket','whiffler','wind-sucker','wood-pigeon'
]

// ENDINGS: 50 items
const ENDINGS = [
  'forsooth!',
  'and be gone!',
  'by my troth!',
  'thou vexest all creation!',
  'the crows laugh at thee!',
  'thy wit hath abandoned thee!',
  'thy shadow is ashamed of thee!',
  'even the goats mock thee!',
  'thou art the jest of every tavern!',
  'thy face frightens daylight!',
  'fortune rejecteth thee!',
  'thy brain is fit only for pudding!',
  'thou hast mastered nonsense!',
  'thy logic limps on a broken crutch!',
  'thou bewilderest simpletons!',
  'thy judgment is forever suspect!',
  'thou art a calamity in human form!',
  'thy destiny is to be ignored!',
  'thy arrogance exceedeth thy abilities!',
  'thou art a cautionary tale!',
  'thy foolishness knoweth no bounds!',
  'all who hear thee sigh in despair!',
  'the dogs refuse thy company!',
  'thy reputation precedeth thee!',
  'thou art as welcome as rain at harvest!',
  'thy company burdeneth the cheerful!',
  'the village fool surpasseth thee!',
  'thou offendest mine eyes!',
  'thy words carry neither weight nor meaning!',
  'away with thee!',
  'thy mother weeps at the sight of thee!',
  'the very stars hide their light from thee!',
  'thou art an offence to the nose!',
  'heaven itself rejecteth thy petition!',
  'thy deeds shame thine ancestors!',
  'thou wouldst confuse a simpleton!',
  'the oxen pity thee!',
  'no honest man claimeth thy company!',
  'thy name is a byword for folly!',
  'thou art the jest of court and country!',
  'neither wit nor worth abideth in thee!',
  'thy tongue doth outrun thy feeble mind!',
  'thou art a disgrace to thy breeches!',
  'the ale-wife refuseth thy custom!',
  'thou art as useful as a leaking bucket!',
  'even fools pity thee from afar!',
  'thy counsel is rejected by all sensible men!',
  'thou art the plague of every honest household!',
  'God made thee as a warning to others!',
  'thou art unfit for any honest employment!'
]

// ─── Combination counts ───────────────────────────────────────────
// Short mode: PHYSICAL(200) × NOUNS(200) = 40,000
// Full mode:  CHARACTER(100)² × PHYSICAL(200)² × NOUNS(200) × ENDINGS(50)
//             = 100×100×200×200×200×50 = 20,000,000,000,000 (20 trillion)

export default function CalculatorClient({ faqs }: Props) {
  const [insult, setInsult] = useState('')
  const [copied, setCopied] = useState(false)
  const [length, setLength] = useState<'short' | 'full'>('short')

  const rand = <T,>(arr: T[]) =>
    arr[Math.floor(Math.random() * arr.length)]

  const generated = useRef(new Set<string>())

  const generate = () => {
    let result = ''
    do {
      if (length === 'short') {
        // 3-word insult: "Thou [PHYSICAL] [NOUN]!" — 40,000 unique combinations
        result = `Thou ${rand(PHYSICAL)} ${rand(NOUNS)}!`
      } else {
        // Full insult: CHARACTER×CHARACTER×PHYSICAL×PHYSICAL×NOUN×ENDING — 20 trillion unique
        result = `Thou ${rand(CHARACTER)}, ${rand(CHARACTER)}, ${rand(PHYSICAL)}, ${rand(PHYSICAL)} ${rand(NOUNS)}, ${rand(ENDINGS)}`
      }
    } while (generated.current.has(result))
    generated.current.add(result)
    setInsult(result)
  }

  const copy = () => { navigator.clipboard.writeText(insult); setCopied(true); setTimeout(() => setCopied(false), 1500) }

  return (
    <DevToolLayout
      title="Shakespeare Insult Generator"
      icon="🎭"
      description="Generate gloriously old-fashioned insults straight from the Bard himself!"
      category="Fun"
      parentPath="/calculators/fun"
      parentLabel="Fun & Entertainment"
    >
      <p className="text-xs text-amber-600 font-semibold mb-6">⚠️ For laughs only - never use to genuinely hurt anyone.</p>

      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border-2 border-purple-200 p-8 text-center mb-6">
        {insult ? (
          <>
            <p className="text-6xl mb-4">😤</p>
            <p className="text-xl leading-relaxed text-gray-800 font-bold italic min-h-16">{insult}</p>
            <button onClick={copy} className="mt-4 flex items-center gap-2 mx-auto px-4 py-2 bg-white border-2 border-purple-200 text-purple-600 font-bold rounded-xl hover:bg-purple-50">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? 'Copied!' : 'Share this insult'}
            </button>
          </>
        ) : (
          <p className="text-gray-400 text-lg py-8">Click the button below to generate thine insult!</p>
        )}
      </div>

      {/* Length selector */}
      <div className="mb-4">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 text-center">Insult Length</p>
        <div className="flex rounded-xl overflow-hidden border-2 border-purple-200">
          <button
            onClick={() => { setLength('short'); setInsult('') }}
            className={`flex-1 py-2.5 text-sm font-bold transition-all ${length === 'short' ? 'bg-purple-600 text-white' : 'bg-white text-gray-500 hover:bg-purple-50'}`}
          >
            Short (3 words · 40K unique)
          </button>
          <button
            onClick={() => { setLength('full'); setInsult('') }}
            className={`flex-1 py-2.5 text-sm font-bold transition-all ${length === 'full' ? 'bg-purple-600 text-white' : 'bg-white text-gray-500 hover:bg-purple-50'}`}
          >
            Full (20 Trillion unique)
          </button>
        </div>
      </div>

      <button onClick={generate} className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-black text-lg rounded-2xl hover:opacity-90 shadow-lg">
        <RefreshCw className="w-5 h-5" /> {insult ? 'Generate Another!' : 'Generate Insult!'}
      </button>

      {/* ─── SEO Content ─── */}
      <div className="mt-12 space-y-10 max-w-2xl mx-auto">

        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-100" />
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3">About This Tool</span>
          <div className="h-px flex-1 bg-gray-100" />
        </div>

        <section>
          <h2 className="text-xl font-black text-gray-900 mb-3">What Does This Shakespeare Insult Generator Do?</h2>
          <p className="text-gray-600 leading-relaxed">This Shakespeare insult generator creates funny Shakespearean insults, Elizabethan roasts, and old English comebacks inspired by the language of William Shakespeare. <Link href="/fun/compliment-generator" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">Compliment Generator</Link> for people who like to cover all emotional registers.</p>
        </section>

        <section className="bg-purple-50 border border-purple-100 rounded-2xl p-6">
          <h2 className="text-xl font-black text-purple-800 mb-3">🔬 How It Works</h2>
          <p className="text-gray-700 leading-relaxed mb-3">The generator combines Shakespearean character traits, physical descriptors, classic Elizabethan nouns, and dramatic closing phrases.</p>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-white rounded-xl p-3 border border-purple-100">
              <p className="font-black text-purple-700 text-lg">40,000</p>
              <p className="text-gray-600 font-semibold">Short insults (3 words)</p>
              <p className="text-xs text-gray-400 mt-1">200 descriptors × 200 nouns</p>
            </div>
            <div className="bg-white rounded-xl p-3 border border-purple-100">
              <p className="font-black text-purple-700 text-lg">20 Trillion</p>
              <p className="text-gray-600 font-semibold">Full insults</p>
              <p className="text-xs text-gray-400 mt-1">100²×200²×200×50 combinations</p>
            </div>
          </div>
        </section>

        <section className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">🎉 Fun Fact</p>
          <p className="text-gray-700 leading-relaxed text-sm">Shakespeare was, statistically, the most creative insulter in English literature. His works contain over 10,000 unique words, many of which he invented, and a significant number of those words were insults. "Nut-hook," "moldwarp," "skainsmate," and "flap-dragon" are all real Shakespearean insults, and all of them are better than most modern alternatives.</p>
        </section>

        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">💡 Tips for the Best Results</h2>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>Delivery is everything with baroque insults. A Shakespearean insult said rapidly in frustration has one-tenth the impact of the same insult delivered slowly with deliberate eye contact. Pace it like a monologue, not an outburst.</span></li>
            <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>The best use of this generator is preparing one good insult before a meeting where you expect someone to be difficult. Having it ready means you can release it at precisely the right moment with full composure.</span></li>
            <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>If you need something on the positive end of the spectrum instead, the <Link href="/fun/compliment-generator" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">Compliment Generator</Link> uses similarly heightened language to say genuinely nice things.</span></li>
          </ul>
        </section>

        <section className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-2">📲 How to Share</p>
          <p className="text-gray-700 text-sm leading-relaxed">Post your best generated insult as your "out of office" message. "Thou puny, motley-minded maggot-pie" communicates unavailability just as clearly as "I am currently on leave" and is considerably more memorable.</p>
        </section>

        <section className="border-l-4 border-purple-300 pl-5">
          <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">📌 Did You Know?</p>
          <p className="text-gray-600 text-sm leading-relaxed">The insult "you blocks, you stones, you worse than senseless things" (Julius Caesar, Act 1) was used by Shakespeare to address a crowd of Roman commoners, making it technically a group insult rated for crowds of two or more. Useful to know.</p>
        </section>

        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Example Shakespearean Insults</h2>
          <p className="text-gray-600 mb-4">Here are some examples generated by the Shakespeare Insult Generator:</p>
          <ul className="space-y-3 text-gray-700 italic">
            <li>• Thou goatish, mangled, fen-sucked, toad-spotted skainsmate, away with thee!</li>
            <li>• Thou loggerheaded, weedy, onion-eyed moldwarp, by my troth!</li>
            <li>• Thou villainous, spleeny, dog-hearted tavern-rat, thou vexest all creation!</li>
            <li>• Thou artless, rank, flea-bitten hedge-pig, the crows laugh at thee!</li>
            <li>• Thou roguish, wayward, crook-pated jackanapes, and be gone!</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">{faqs.map(f => <details key={f.question} className="rounded-2xl border p-4" style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)', borderColor: 'rgba(226,232,240,0.7)', boxShadow: '0 4px 16px rgba(15,23,42,0.04)' }}><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
        </section>

        <section>
          <div className="rounded-3xl border overflow-hidden" style={{ background: 'rgba(255,255,255,0.82)', backdropFilter: 'blur(10px)', borderColor: 'rgba(255,255,255,0.55)', boxShadow: '0 8px 30px rgba(15,23,42,0.05)' }}>
            <div className="px-6 py-4 border-b border-gray-100 bg-purple-50">
              <h2 className="text-lg font-bold text-gray-900">🎉 More Fun Calculators</h2>
              <p className="text-sm text-gray-500 mt-0.5">Try these next -- free and instant</p>
            </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href="/fun/compliment-generator" className="flex items-center gap-3 p-4 rounded-2xl border group" style={{ borderColor: 'rgba(216,180,254,0.5)', transition: 'all 0.3s cubic-bezier(.4,0,.2,1)' }} onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 8px 20px rgba(147,51,234,0.1)'; el.style.borderColor = 'rgba(147,51,234,0.3)'; }} onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = ''; el.style.boxShadow = ''; el.style.borderColor = 'rgba(216,180,254,0.5)'; }}>
                <span className="text-2xl flex-shrink-0">💖</span>
                <span className="block"><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-all">Compliment Generator</p><p className="text-xs text-gray-400 mt-0.5">Generate heartfelt compliments</p></span>
              </Link>
              <Link href="/fun/villain-name" className="flex items-center gap-3 p-4 rounded-2xl border group" style={{ borderColor: 'rgba(216,180,254,0.5)', transition: 'all 0.3s cubic-bezier(.4,0,.2,1)' }} onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 8px 20px rgba(147,51,234,0.1)'; el.style.borderColor = 'rgba(147,51,234,0.3)'; }} onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = ''; el.style.boxShadow = ''; el.style.borderColor = 'rgba(216,180,254,0.5)'; }}>
                <span className="text-2xl flex-shrink-0">😈</span>
                <span className="block"><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-all">Villain Name Generator</p><p className="text-xs text-gray-400 mt-0.5">Your evil alter-ego awaits</p></span>
              </Link>
              <Link href="/fun/uwu-text-generator" className="flex items-center gap-3 p-4 rounded-2xl border group" style={{ borderColor: 'rgba(216,180,254,0.5)', transition: 'all 0.3s cubic-bezier(.4,0,.2,1)' }} onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 8px 20px rgba(147,51,234,0.1)'; el.style.borderColor = 'rgba(147,51,234,0.3)'; }} onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = ''; el.style.boxShadow = ''; el.style.borderColor = 'rgba(216,180,254,0.5)'; }}>
                <span className="text-2xl flex-shrink-0">🐾</span>
                <span className="block"><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-all">UWU Text Generator</p><p className="text-xs text-gray-400 mt-0.5">Kawaii-ify any text</p></span>
              </Link>
              <Link href="/fun/pig-latin-converter" className="flex items-center gap-3 p-4 rounded-2xl border group" style={{ borderColor: 'rgba(216,180,254,0.5)', transition: 'all 0.3s cubic-bezier(.4,0,.2,1)' }} onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 8px 20px rgba(147,51,234,0.1)'; el.style.borderColor = 'rgba(147,51,234,0.3)'; }} onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = ''; el.style.boxShadow = ''; el.style.borderColor = 'rgba(216,180,254,0.5)'; }}>
                <span className="text-2xl flex-shrink-0">🐷</span>
                <span className="block"><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-all">Pig Latin Converter</p><p className="text-xs text-gray-400 mt-0.5">Igpay atinlay, instantly</p></span>
              </Link>
              <Link href="/fun/emoji-translator" className="flex items-center gap-3 p-4 rounded-2xl border group" style={{ borderColor: 'rgba(216,180,254,0.5)', transition: 'all 0.3s cubic-bezier(.4,0,.2,1)' }} onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 8px 20px rgba(147,51,234,0.1)'; el.style.borderColor = 'rgba(147,51,234,0.3)'; }} onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = ''; el.style.boxShadow = ''; el.style.borderColor = 'rgba(216,180,254,0.5)'; }}>
                <span className="text-2xl flex-shrink-0">😂</span>
                <span className="block"><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-all">Emoji Translator</p><p className="text-xs text-gray-400 mt-0.5">Turn any text into emoji</p></span>
              </Link>
              <Link href="/fun/would-you-rather" className="flex items-center gap-3 p-4 rounded-2xl border group" style={{ borderColor: 'rgba(216,180,254,0.5)', transition: 'all 0.3s cubic-bezier(.4,0,.2,1)' }} onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 8px 20px rgba(147,51,234,0.1)'; el.style.borderColor = 'rgba(147,51,234,0.3)'; }} onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = ''; el.style.boxShadow = ''; el.style.borderColor = 'rgba(216,180,254,0.5)'; }}>
                <span className="text-2xl flex-shrink-0">🤔</span>
                <span className="block"><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-all">Would You Rather</p><p className="text-xs text-gray-400 mt-0.5">Impossible dilemmas generator</p></span>
              </Link>
              <Link href="/fun/personality-quiz" className="flex items-center gap-3 p-4 rounded-2xl border group" style={{ borderColor: 'rgba(216,180,254,0.5)', transition: 'all 0.3s cubic-bezier(.4,0,.2,1)' }} onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 8px 20px rgba(147,51,234,0.1)'; el.style.borderColor = 'rgba(147,51,234,0.3)'; }} onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = ''; el.style.boxShadow = ''; el.style.borderColor = 'rgba(216,180,254,0.5)'; }}>
                <span className="text-2xl flex-shrink-0">🧬</span>
                <span className="block"><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-all">Personality Quiz</p><p className="text-xs text-gray-400 mt-0.5">16 personality archetypes</p></span>
              </Link>
              <Link href="/fun/random-fact-generator" className="flex items-center gap-3 p-4 rounded-2xl border group" style={{ borderColor: 'rgba(216,180,254,0.5)', transition: 'all 0.3s cubic-bezier(.4,0,.2,1)' }} onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 8px 20px rgba(147,51,234,0.1)'; el.style.borderColor = 'rgba(147,51,234,0.3)'; }} onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = ''; el.style.boxShadow = ''; el.style.borderColor = 'rgba(216,180,254,0.5)'; }}>
                <span className="text-2xl flex-shrink-0">🎯</span>
                <span className="block"><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-all">Random Fact Generator</p><p className="text-xs text-gray-400 mt-0.5">Surprising facts on demand</p></span>
              </Link>
            </div>
          </div>
        </section>

        <SEOContent
          title=""
          category="fun"
          intro={`
# Shakespeare Insult Generator

This free Shakespeare insult generator creates funny Shakespearean insults, Shakespeare roasts, Elizabethan insults, and old English comebacks inspired by the language of William Shakespeare.

Choose **Short mode** for punchy 3-word insults (40,000 unique combinations) or **Full mode** for maximum dramatic effect with over 20 trillion unique Shakespearean insult combinations — making repeated results practically impossible.

Whether you need a Shakespeare roast for a party, a funny Elizabethan comeback, a classroom activity, a creative writing prompt, or simply want to explore Shakespearean language, this Shakespearean insult generator provides endless entertainment.

`}
          howItWorks={`The generator uses four pools of authentic Elizabethan vocabulary: character adjectives (100 words), physical descriptors (200 words), Shakespearean nouns (200 words), and dramatic endings (50 phrases). Short mode picks one descriptor and one noun for a punchy 3-word insult — 40,000 unique combinations. Full mode stacks two character adjectives, two physical descriptors, a noun, and an ending — over 20 trillion unique combinations.`}
          tipsSection={`These are purely for entertainment and theatrical fun — NOT for actual use against real people. The Shakespearean insult is best deployed in jest with willing participants who appreciate the form. It's the verbal equivalent of a foam sword fight.`}
          conclusion={`Creativity in language — even antagonistic language — is a form of wit. Shakespeare's insults have survived 400 years precisely because they're inventive rather than merely vulgar. Enjoy them in the spirit of linguistic playfulness they represent.`}
          benefits={[
            { title: `Just for fun`, text: `This calculator is designed for entertainment and lighthearted use — enjoy it and share results with friends.` },
            { title: `Quick results`, text: `Get your answer instantly without any signup, account, or personal data required.` },
            { title: `Free to use`, text: `Completely free with no ads, no tracking, and no strings attached.` },
          ]}
          useCases={[
            { title: `Personal entertainment`, text: `Use it for personal curiosity, conversation starters, or just a fun break from your day.` },
            { title: `Social sharing`, text: `Share your results with friends and compare answers — great for group settings and social media.` },
            { title: `Learning and exploration`, text: `Explore the topic in a playful way and discover something new or interesting.` },
          ]}
        />
      </div>
    </DevToolLayout>
  )
}
