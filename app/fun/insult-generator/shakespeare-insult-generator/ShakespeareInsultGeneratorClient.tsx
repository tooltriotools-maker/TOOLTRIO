'use client'
import { DevToolLayout } from '@/components/ui/DevToolLayout'
import { SEOContent } from '@/components/ui/SEOContent'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { RefreshCw, Copy, Check } from 'lucide-react'
import { INSULT_GENERATORS } from '@/lib/fun/insult-generators'
import { getMeanings } from '@/lib/fun/shakespeareTranslate'

interface Props { faqs: { question: string; answer: string }[] }

// CHARACTER: 118 items — used ×2 in full mode
const CHARACTER = [
  'artless','bawdy','base-court','bat-fowling','beef-witted','bootless','churlish',
  'clouted','cockered','craven','currish','dankish','dissembling',
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

// PHYSICAL: 277 items — used in both short and full modes
const PHYSICAL = [
  'beslubbering','beetle-headed','boil-brained','clay-brained',
  'crook-pated','dizzy-eyed','doghearted','dread-bolted','earth-vexing','elf-skinned',
  'fat-kidneyed','fen-sucked','flap-mouthed','fly-bitten','folly-fallen','fool-born',
  'full-gorged','goose-witted','guts-griping','half-faced','hasty-witted','hell-hated',
  'hedge-born','horn-mad','idle-headed','ill-breeding','ill-nurtured',
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

// NOUNS: 303 items — used in both short and full modes
const NOUNS = [
  'canker-blossom','foot-licker','malt-worm','moldwarp',
  'hedge-pig','mumble-news','skainsmate','puttock',
  'knave','miscreant','varlot','wag-tail',
  'harpy','haggard','whey-face','vassal','flap-dragon',
  'giglet','horn-beast','joithead','minnow','pumpion','nut-hook',
  'codpiece','apple-john','barnacle','bladder',
  'baggage','boar-pig','bugbear','bum-bailey','clack-dish','coxcomb','death-token','dewberry',
  'flirt-gill','fustilarian','lewdster','lout','maggot',
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
  'dead-nettle','ditch-bred','dock-weed','dog-fish',
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
  'moth','muck-raker','mud-worm','muddle-head','mule-driver','mammet',
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
// ─── Theoretical combination counts ───────────────────────────────
// Short mode: PHYSICAL(277) × NOUNS(303) = 83,931 combinations
// Full mode: CHARACTER(118)² × PHYSICAL(277)² × NOUNS(303) × ENDINGS(50)
//           = 16,185,875,129,400 theoretical combinations
//
// These counts represent possible vocabulary combinations, not a guarantee
// that every combination is linguistically distinct or historically written
// by Shakespeare.

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
        // Short insult: "Thou [PHYSICAL] [NOUN]!" — 83,931 theoretical combinations
        result = `Thou ${rand(PHYSICAL)} ${rand(NOUNS)}!`
      } else {
       // Full insult: CHARACTER×CHARACTER×PHYSICAL×PHYSICAL×NOUN×ENDING
// — 16.19 trillion theoretical combinations
        result = `Thou ${rand(CHARACTER)}, ${rand(CHARACTER)}, ${rand(PHYSICAL)}, ${rand(PHYSICAL)} ${rand(NOUNS)}, ${rand(ENDINGS)}`
      }
    } while (generated.current.has(result))
    generated.current.add(result)
    setInsult(result)
  }

  const copy = () => { navigator.clipboard.writeText(insult); setCopied(true); setTimeout(() => setCopied(false), 1500) }

  const meanings = insult ? getMeanings(insult) : []
  const translateHref = insult ? `/fun/shakespeare-translator?text=${encodeURIComponent(insult)}&dir=toModern` : '/fun/shakespeare-translator'

  return (
    <DevToolLayout
      title="Shakespeare Insult Generator"
      icon="🎭"
      description="Generate gloriously old-fashioned Shakespeare-inspired insults, roasts, and theatrical comebacks."
      category="Fun"
      parentPath="/fun"
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

      {insult && (
        <Link href={translateHref}
          className="block rounded-2xl border-2 border-purple-300 p-5 mb-6 bg-gradient-to-br from-purple-50 to-indigo-50 hover:border-purple-400 hover:-translate-y-0.5 transition-all group">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="font-bold text-gray-900 mb-1">📖 Not sure what that means?</h2>
              <p className="text-sm text-gray-600">
                {meanings.length > 0
                  ? `This line uses ${meanings.length} real Shakespearean word${meanings.length === 1 ? '' : 's'}. Open the Shakespeare English Translator to see the full plain-English meaning.`
                  : 'Open the Shakespeare English Translator to see this insult\u2019s plain-English meaning, word by word.'}
              </p>
            </div>
            <span className="flex-shrink-0 px-4 py-2 rounded-xl bg-purple-700 text-white font-bold text-sm group-hover:bg-purple-800 transition-all whitespace-nowrap">
              Translate it →
            </span>
          </div>
        </Link>
      )}

      {/* Length selector */}
      <div className="mb-4">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 text-center">Insult Length</p>
        <div className="flex rounded-xl overflow-hidden border-2 border-purple-200">
          <button
            onClick={() => { setLength('short'); setInsult('') }}
            className={`flex-1 py-2.5 text-sm font-bold transition-all ${length === 'short' ? 'bg-purple-600 text-white' : 'bg-white text-gray-500 hover:bg-purple-50'}`}
          >
            Short (3 words · 83,931 combinations)
          </button>
          <button
            onClick={() => { setLength('full'); setInsult('') }}
            className={`flex-1 py-2.5 text-sm font-bold transition-all ${length === 'full' ? 'bg-purple-600 text-white' : 'bg-white text-gray-500 hover:bg-purple-50'}`}
          >
           Full (16.19 trillion combinations)
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

        <section className="space-y-5">
          <h2 className="text-xl font-black text-gray-900 mb-3">
            What Is a Shakespeare Insult Generator?
          </h2>

          <p className="text-gray-600 leading-relaxed">
            A Shakespeare insult generator is a playful tool that creates
            dramatic, theatrical insults inspired by Shakespearean and
            Elizabethan-style language. Instead of using modern profanity,
            these insults rely on unusual vocabulary, exaggerated descriptions,
            colorful nouns, and theatrical endings.
          </p>

          <p className="text-gray-600 leading-relaxed">
            This free Shakespeare insult generator lets you create a random
            Shakespeare insult instantly. You can use it as a Shakespearean
            insult generator, Shakespeare roast generator, funny insult
            generator, old English insult generator, Elizabethan insult
            generator, or bard insult generator depending on the style you are
            looking for.
          </p>

          <p className="text-gray-600 leading-relaxed">
            The results are designed for entertainment, creative writing,
            classroom activities, party games, social sharing, and playful
            Shakespeare-themed roast battles. They are not intended to be used
            to genuinely harass, threaten, or hurt another person.
          </p>
        </section>

        <section className="space-y-5">
          <h2 className="text-xl font-black text-gray-900 mb-3">
            Shakespeare Roast Generator: Funny Shakespearean Roasts
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Looking for a Shakespeare roast? This generator creates
            Shakespearean roasts that sound theatrical rather than modern.
            Shakespeare roasts work particularly well because the vocabulary
            feels dramatic, exaggerated, and unexpectedly creative.
          </p>

          <p className="text-gray-600 leading-relaxed">
            A Shakespeare roast can be useful for a friendly Shakespeare roast
            battle, a comedy challenge, a school activity, a fantasy-themed
            party, or a creative writing exercise. The goal is playful wordplay,
            not genuine hostility.
          </p>

          <p className="text-gray-600 leading-relaxed">
            Some searches for “Shakespeare roast” can also refer to completely
            different topics, including Shakespeare roast dinner, Shakespeare
            Sunday roast, Shakespeare hog roast, or a local search such as
            Shakespeare roast Bristol. Those are food, restaurant, or local
            search intents rather than Shakespeare insult-generator intent.
            This page focuses specifically on Shakespearean roasts and insults.
          </p>
        </section>

        <section className="space-y-5">
          <h2 className="text-xl font-black text-gray-900 mb-3">
            Shakespeare Insults and Shakespearean Insults
          </h2>

<section className="space-y-5">
  <h2 className="text-xl font-black text-gray-900">
    What Makes a Shakespearean Insult?
  </h2>

  <p className="text-gray-600 leading-relaxed">
    A Shakespearean-style insult is memorable because it often combines
    unusual vocabulary with exaggeration, vivid imagery, rhythm, and
    theatrical delivery. Instead of relying on a short modern swear word,
    the speaker can describe someone with several unexpected words before
    finishing with a dramatic conclusion.
  </p>

  <p className="text-gray-600 leading-relaxed">
    This generator follows that basic creative idea. It selects words from
    different vocabulary groups and combines them into new expressions. A
    physical descriptor can create the image, a noun supplies the comic
    target, and a dramatic ending can give the sentence a theatrical finish.
  </p>

  <p className="text-gray-600 leading-relaxed">
    The result is intentionally Shakespeare-inspired rather than a claim of
    historical authenticity. If you are researching Shakespeare himself,
    distinguish generated text from quotations appearing in his plays.
  </p>
</section>

<section className="space-y-5">
  <h2 className="text-xl font-black text-gray-900">
    Shakespeare Insult Generator vs. Shakespeare Insult List
  </h2>

  <p className="text-gray-600 leading-relaxed">
    A Shakespeare insult list is a collection of existing examples, while
    an insult generator creates new combinations from a vocabulary system.
    These serve different purposes.
  </p>

  <p className="text-gray-600 leading-relaxed">
    If you need a quotation for literary research, use a reliable edition of
    the relevant Shakespeare play and verify the speaker, act, scene, and
    wording. If you want a fresh Shakespeare-inspired roast for a game,
    writing exercise, or creative challenge, a generator is more useful.
  </p>

  <p className="text-gray-600 leading-relaxed">
    ToolTrio&apos;s page is an interactive generator rather than a Shakespeare
    insults PDF, Shakespeare insult book, or fixed collection of 100
    historical quotations.
  </p>
</section>


          <p className="text-gray-600 leading-relaxed">
            Shakespeare insults are famous for combining strange words with
            vivid descriptions. A Shakespearean insult can sound much more
            elaborate than an ordinary modern insult because it often stacks
            adjectives, unusual nouns, and theatrical phrases together.
          </p>

          <p className="text-gray-600 leading-relaxed">
            People search for Shakespeare insults in many different ways:
            Shakespearean insults, funny Shakespeare insults, Shakespeare
            insult words, Shakespearean insult words, Shakespeare insult
            quotes, Shakespeare insult list, and 100 Shakespeare insults are
            all common ways of describing the same general topic.
          </p>

          <p className="text-gray-600 leading-relaxed">
            This generator is different from a static Shakespeare insult list.
            Instead of displaying only a fixed collection of quotations, it
            constructs new Shakespeare-style combinations from multiple
            vocabulary pools.
          </p>
        </section>

        <section className="bg-purple-50 border border-purple-100 rounded-2xl p-6 space-y-5">
          <h2 className="text-xl font-black text-purple-800">
            How Does the Shakespeare Insult Generator Work?
          </h2>

          <p className="text-gray-700 leading-relaxed">
            The generator uses several vocabulary pools to create different
            combinations. Short mode combines one physical descriptor with one
            noun. Full mode combines two character descriptors, two physical
            descriptors, one noun, and one dramatic ending.
          </p>

          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div className="bg-white rounded-xl p-4 border border-purple-100">
              <p className="font-black text-purple-700 text-lg">
                83,931
              </p>
              <p className="text-gray-700 font-semibold">
                Short-mode combinations
              </p>
              <p className="text-xs text-gray-500 mt-1">
                277 physical descriptors × 303 nouns
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 border border-purple-100">
              <p className="font-black text-purple-700 text-lg">
                16.19 Trillion
              </p>
              <p className="text-gray-700 font-semibold">
                Full-mode combinations
              </p>
              <p className="text-xs text-gray-500 mt-1">
                118² × 277² × 303 × 50
              </p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">
            Because the generator selects combinations randomly and remembers
            previously generated lines during the current browser session,
            clicking Generate Another produces a different result rather than
            immediately repeating the same line.
          </p>
        </section>

        <section className="space-y-5">
          <h2 className="text-xl font-black text-gray-900">
            Shakespearean Insult Generator Online and Free
          </h2>

          <p className="text-gray-600 leading-relaxed">
            This Shakespearean insult generator is available online and is
            free to use. You do not need to download software, create an
            account, or prepare a list of insults before using it. Enter the
            page, choose the insult length, and generate a Shakespeare-style
            insult instantly.
          </p>

          <p className="text-gray-600 leading-relaxed">
            If you specifically searched for a Shakespeare insult generator
            online or a Shakespearean insult generator online, this page is
            designed for exactly that purpose. It works directly in the browser
            and gives you an immediately usable result.
          </p>

          <p className="text-gray-600 leading-relaxed">
            The generator is also useful when you are looking for a
            Shakespearean insult generator free of signup requirements. You can
            generate, copy, translate, and share results without creating an
            account.
          </p>
        </section>

        <section className="space-y-5">
          <h2 className="text-xl font-black text-gray-900">
            Random Shakespeare Insult Generator
          </h2>

          <p className="text-gray-600 leading-relaxed">
            A random Shakespeare insult generator is useful when you do not have
            a particular phrase in mind. Instead of browsing a long Shakespeare
            insult list, simply press the generate button and receive a new
            combination.
          </p>

          <p className="text-gray-600 leading-relaxed">
            Random generation is especially useful for party games, writing
            prompts, improv exercises, classroom activities, character
            development, and friendly Shakespeare roast battles. You can keep
            generating new lines until you find one with the exact theatrical
            style you want.
          </p>
        </section>

        <section className="space-y-5">
          <h2 className="text-xl font-black text-gray-900">
            Shakespeare Insult Words and Shakespearean Insult Words
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Shakespearean insult words often sound unusual because English
            vocabulary has changed significantly since Shakespeare&apos;s time.
            Words such as “knave,” “coxcomb,” “moldwarp,” “jackanapes,” and
            “skainsmate” have a very different effect from modern insults.
          </p>

          <p className="text-gray-600 leading-relaxed">
            If you are studying Shakespearean insult words, the generator can
            help you explore how individual descriptors and nouns combine into
            larger expressions. It can also be paired with the Shakespeare
            English Translator on ToolTrio when you want a plain-English
            explanation of an unfamiliar word or generated line.
          </p>
        </section>

        <section className="space-y-5">
          <h2 className="text-xl font-black text-gray-900">
            Shakespeare Insult Quotes, Lists, Books, PDFs and Worksheets
          </h2>

          <p className="text-gray-600 leading-relaxed">
            People looking for Shakespeare insults may also search for
            Shakespeare insult quotes, Shakespeare insult list, Shakespeare
            insults PDF, Shakespearean insults PDF, Shakespeare insults book,
            Shakespearean insults book, Shakespeare insult generator PDF, or
            Shakespearean insult generator PDF.
          </p>

          <p className="text-gray-600 leading-relaxed">
            This page is an online generator rather than a downloadable book or
            PDF collection. The advantage is that the generator can create new
            combinations instead of requiring you to choose from a fixed
            document.
          </p>

          <p className="text-gray-600 leading-relaxed">
            Teachers and students may also encounter searches such as
            Shakespeare insult generator worksheet or Shakespearean insult
            generator worksheet. The generator can be used as the interactive
            part of a classroom exercise in vocabulary, creative writing,
            dramatic language, or literary analysis.
          </p>

          <p className="text-gray-600 leading-relaxed">
            Similarly, searches for a Shakespeare insult chart, Shakespeare
            insults poster, Shakespeare Insult Kit, or Shakespeare insult mug
            usually refer to printable, educational, or novelty formats. This
            ToolTrio page focuses on generating the language interactively.
          </p>
        </section>

        <section className="space-y-5">
          <h2 className="text-xl font-black text-gray-900">
            Shakespeare Insults in Macbeth and Other Shakespeare Plays
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Shakespeare insults Macbeth is another search variation people use
            when looking for examples of Shakespearean language in a specific
            play. Shakespeare&apos;s plays contain many examples of insults,
            taunts, accusations, mockery, and colorful descriptions.
          </p>

          <p className="text-gray-600 leading-relaxed">
            A generator should not be confused with a quotation database. The
            lines produced here are newly constructed Shakespeare-style
            combinations rather than claims that Shakespeare personally wrote
            every generated sentence.
          </p>

          <p className="text-gray-600 leading-relaxed">
            If you need an exact Shakespeare insult quote from Macbeth or
            another play, consult the original text and verify the quotation,
            speaker, play, act, and scene. Use this generator when your goal is
            playful Shakespeare-inspired language rather than literary
            quotation research.
          </p>
        </section>

        <section className="space-y-5">
          <h2 className="text-xl font-black text-gray-900">
            Shakespeare Insults and Compliments
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Shakespeare insults and compliments represent two sides of
            theatrical language. An insult exaggerates a flaw for comic effect,
            while a compliment exaggerates a positive quality.
          </p>

          <p className="text-gray-600 leading-relaxed">
            If you want to switch from playful insults to positive language,
            try the
            <Link
              href="/fun/compliment-generator"
              className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900"
            >
              {' '}Compliment Generator
            </Link>.
            It is a useful companion when you want dramatic wording without the
            negative tone.
          </p>
        </section>

        <section className="space-y-5">
          <h2 className="text-xl font-black text-gray-900">
            Shakespeare Insult Generator Translation
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Some Shakespearean vocabulary is difficult for modern readers. A
            Shakespeare insult generator translation can therefore be useful
            when you want to understand what an unusual word means in modern
            English.
          </p>

          <p className="text-gray-600 leading-relaxed">
            ToolTrio connects generated insults to its Shakespeare English
            Translator so that you can examine unfamiliar vocabulary and see a
            plain-English interpretation. This makes the generator useful not
            only for entertainment but also for exploring historical vocabulary.
          </p>
        </section>

        <section className="space-y-5">
          <h2 className="text-xl font-black text-gray-900">
            What Are Some Shakespearean Insults?
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Some famous Shakespearean insult vocabulary includes words and
            expressions such as knave, coxcomb, jackanapes, moldwarp,
            fustilarian, scullion, and other colorful terms. The appeal is not
            simply that the words are old; it is that they create vivid mental
            images.
          </p>

          <p className="text-gray-600 leading-relaxed">
            The generator builds on this idea by combining descriptors and nouns
            into playful new expressions. That makes each result feel more like
            a tiny theatrical performance than a conventional modern insult.
          </p>
        </section>

        <section className="space-y-5">
          <h2 className="text-xl font-black text-gray-900">
            What Is Shakespeare Slang?
          </h2>

          <p className="text-gray-600 leading-relaxed">
            “Shakespeare slang” is a broad search phrase that can refer to
            informal vocabulary, insults, expressions, contractions, wordplay,
            or unusual language associated with Shakespeare&apos;s works and the
            period in which he wrote.
          </p>

          <p className="text-gray-600 leading-relaxed">
            Not every unusual word in Shakespeare is slang, and not every word
            used by the generator should be treated as a direct quotation from
            Shakespeare. The most accurate description of this tool is a
            Shakespeare-inspired generator that uses theatrical vocabulary.
          </p>
        </section>

        <section className="space-y-5">
          <h2 className="text-xl font-black text-gray-900">
            What Are Rare Insult Words?
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Rare insult words are unusual terms that most modern speakers do
            not encounter regularly. Shakespearean vocabulary is particularly
            entertaining in this category because words such as moldwarp,
            skainsmate, fustilarian, and jackanapes sound dramatic even when
            their exact historical meaning is unfamiliar.
          </p>

          <p className="text-gray-600 leading-relaxed">
            If your goal is to discover rare insult words, generate several
            results and then use the translation option to investigate unfamiliar
            vocabulary.
          </p>
        </section>

        <section className="bg-amber-50 border border-amber-100 rounded-2xl p-6 space-y-4">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wider">
            🎭 A Note About Shakespeare Roasts
          </p>

          <p className="text-gray-700 leading-relaxed">
            The phrase “Shakespeare roast” can have multiple meanings online.
            It can describe a Shakespeare-themed insult, a roast battle, a
            Shakespeare-related comedy event, or even a food-related search
            such as a Shakespeare roast dinner, Shakespeare Sunday roast, or
            Shakespeare hog roast. A search for Shakespeare roast Bristol can
            also indicate local food or event intent.
          </p>

          <p className="text-gray-700 leading-relaxed">
            This page intentionally focuses on the literary and entertainment
            meaning: Shakespearean roasts and playful insults generated from
            Shakespeare-inspired vocabulary.
          </p>
        </section>

        <section className="space-y-5">
          <h2 className="text-xl font-black text-gray-900">
            How to Use the Shakespeare Insult Generator
          </h2>

          <ol className="space-y-3 text-gray-600 text-sm">
            <li>
              <strong>1. Choose Short or Full mode.</strong> Short mode creates
              a compact three-word insult. Full mode creates a longer,
              theatrical construction.
            </li>
            <li>
              <strong>2. Click Generate Insult.</strong> The generator randomly
              selects words from its vocabulary pools.
            </li>
            <li>
              <strong>3. Generate another result.</strong> Continue generating
              until you find a phrase you like.
            </li>
            <li>
              <strong>4. Copy or share it.</strong> Use the copy control to
              reuse the generated line in a game, writing prompt, or friendly
              conversation.
            </li>
            <li>
              <strong>5. Translate unfamiliar words.</strong> Open the
              Shakespeare English Translator when a generated expression is
              difficult to understand.
            </li>
          </ol>
        </section>

        <section className="space-y-5">
          <h2 className="text-xl font-black text-gray-900">
            Best Uses for Shakespearean Roasts
          </h2>

          <p className="text-gray-600 leading-relaxed">
            A Shakespearean roast works best when everyone involved understands
            that the exchange is playful. Good uses include party games,
            classroom vocabulary exercises, creative writing, character
            development, improv, fantasy events, social posts, and friendly
            Shakespeare roast battles.
          </p>

          <p className="text-gray-600 leading-relaxed">
            Avoid using generated insults to target someone who has not agreed
            to the joke. The theatrical style is intended to make the language
            humorous and imaginative, not to make harassment more effective.
          </p>
        </section>



          <section className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">
            🎉 Fun Fact
          </p>

          <p className="text-gray-700 leading-relaxed text-sm">
            Shakespeare&apos;s works are famous for unusually vivid vocabulary,
            wordplay, insults, compliments, puns, and dramatic expressions.
            That makes Shakespearean language especially fun to explore with a
            generator: even a short combination can sound like dialogue from a
            stage play.
          </p>
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
  <p className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-2">
    🎭 Make It More Shakespearean
  </p>

  <p className="text-gray-700 text-sm leading-relaxed">
    The fun of a Shakespearean roast is in the theatrical delivery. Try
    reading a generated insult slowly, emphasizing the unusual vocabulary,
    and treating it like dialogue from a stage play. For writing exercises,
    use a generated line as a starting point and rewrite it into your own
    character&apos;s voice.
  </p>
</section>

 
        <section className="border-l-4 border-purple-300 pl-5">
  <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">
    📌 Did You Know? Shakespearean Language
  </p>

  <p className="text-gray-600 text-sm leading-relaxed">
   Shakespeare&apos;s plays contain insults, taunts, accusations, mockery,
    compliments, puns, and elaborate wordplay. His language shows how
    memorable a character&apos;s speech can become when unusual vocabulary is
    combined with rhythm, exaggeration, and theatrical delivery.
  </p>
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
          <div className="rounded-3xl border overflow-hidden" style={{ background: 'rgba(255,255,255,0.82)', backdropFilter: 'blur(10px)', borderColor: 'rgba(255,255,255,0.55)', boxShadow: '0 8px 30px rgba(15,23,42,0.05)' }}>
            <div className="px-6 py-4 border-b border-gray-100 bg-purple-50">
              <h2 className="text-lg font-bold text-gray-900">🎭 Every Insult &amp; Roast Generator</h2>
              <p className="text-sm text-gray-500 mt-0.5">Prefer a different era or tone? Here&apos;s the whole library.</p>
            </div>
            <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {INSULT_GENERATORS.filter(g => g.slug !== 'shakespeare-insult-generator').map(g => (
                <Link key={g.slug} href={`/fun/insult-generator/${g.slug}`}
                  className="flex items-center gap-2 p-3 rounded-2xl border group transition-all"
                  style={{ borderColor: 'rgba(216,180,254,0.5)' }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-2px)'; el.style.borderColor = 'rgba(147,51,234,0.3)'; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = ''; el.style.borderColor = 'rgba(216,180,254,0.5)'; }}>
                  <span className="text-lg flex-shrink-0">{g.icon}</span>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-purple-700 leading-tight">{g.name.replace(' Generator', '')}</span>
                </Link>
              ))}
            </div>
          </div>
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
              
              <Link href="/fun/random-fact-generator" className="flex items-center gap-3 p-4 rounded-2xl border group" style={{ borderColor: 'rgba(216,180,254,0.5)', transition: 'all 0.3s cubic-bezier(.4,0,.2,1)' }} onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 8px 20px rgba(147,51,234,0.1)'; el.style.borderColor = 'rgba(147,51,234,0.3)'; }} onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = ''; el.style.boxShadow = ''; el.style.borderColor = 'rgba(216,180,254,0.5)'; }}>
                <span className="text-2xl flex-shrink-0">🎯</span>
                <span className="block"><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-all">Random Fact Generator</p><p className="text-xs text-gray-400 mt-0.5">Surprising facts on demand</p></span>
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 border border-gray-200 rounded-2xl p-6 space-y-4">
  <h2 className="text-xl font-black text-gray-900">
    A Note on Shakespearean Accuracy
  </h2>

  <p className="text-gray-600 leading-relaxed">
    This tool is designed for creative entertainment and vocabulary
    exploration. Generated lines are Shakespeare-inspired combinations, not
    newly discovered quotations from Shakespeare&apos;s plays.
  </p>

  <p className="text-gray-600 leading-relaxed">
    Shakespeare&apos;s actual language should be studied using the original plays,
    reputable editions, scholarly references, and verified quotations.
    Unusual words appearing in this generator should not automatically be
    interpreted as words invented by Shakespeare or as evidence that a
    particular generated sentence appeared in one of his works.
  </p>
</section>

              <SEOContent
          title=""
          category="fun"
          intro={`
# Shakespeare Insult Generator

This free Shakespeare Insult Generator creates playful Shakespearean insults, Shakespeare roasts, Elizabethan-style comebacks, old-English-style insults, and random Shakespeare-inspired phrases.

Choose Short mode for compact insults or Full mode for longer theatrical combinations. The generator uses multiple vocabulary pools to create new combinations instantly.

Use it for entertainment, creative writing, classroom activities, party games, character development, and friendly Shakespeare roast battles.
`}
          howItWorks={`
The generator combines Shakespeare-inspired character descriptors, physical descriptors, nouns, and dramatic endings. Short mode uses 277 physical descriptors and 303 nouns to create 83,931 possible combinations. Full mode combines 118 character descriptors, 277 physical descriptors, 303 nouns, and 50 endings to create 16,185,875,129,400 theoretical combinations.

These are generated combinations rather than claims that Shakespeare personally wrote every resulting sentence.
`}
          tipsSection={`
Use the generator for playful and theatrical situations where everyone understands the joke. If a word is unfamiliar, use the Shakespeare English Translator to explore its modern meaning. For literary research, verify quotations against the original Shakespeare text rather than treating generated lines as historical quotations.
`}
          conclusion={`
Shakespearean insults remain entertaining because unusual vocabulary, exaggeration, rhythm, and theatrical delivery can turn a simple put-down into memorable wordplay. Generate a line, translate unfamiliar words, and enjoy the language as a creative literary game.
`}
          benefits={[
            {
              title: `Free and instant`,
              text: `Generate Shakespeare-inspired insults online without creating an account.`,
            },
            {
              title: `Huge combination space`,
              text: `Multiple vocabulary pools create a very large number of possible combinations.`,
            },
            {
              title: `Learn the vocabulary`,
              text: `Use the translator to explore unfamiliar Shakespearean-style words and expressions.`,
            },
          ]}
          useCases={[
            {
              title: `Creative writing`,
              text: `Use generated lines as prompts for characters, dialogue, comedy, and fictional scenes.`,
            },
            {
              title: `Games and parties`,
              text: `Use playful Shakespearean roasts for friendly challenges and theatrical games.`,
            },
            {
              title: `English and literature`,
              text: `Explore unusual vocabulary, dramatic language, and Shakespeare-inspired wordplay.`,
            },
          ]}
        />
      </div>
    </DevToolLayout>
  )
}
