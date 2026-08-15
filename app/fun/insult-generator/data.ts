export type InsultTool = {
  slug: string
  title: string
  shortDescription: string
  icon: string
  accent: string
  audience: string
  style: string
  keywords: string[]
  adjectives: string[]
  nouns: string[]
  endings: string[]
  useCases: string[]
  /** Large per-tool phrase library. Base vocabulary is expanded deterministically at runtime. */
  library?: { adjectives: string[]; nouns: string[]; endings: string[] }
}

const ADJECTIVE_FRAMES = [
  'absurdly', 'astonishingly', 'comically', 'delightfully', 'dramatically', 'impressively',
  'magnificently', 'mildly', 'spectacularly', 'wonderfully', 'heroically', 'unreasonably',
  'professionally', 'alarmingly', 'remarkably', 'gloriously', 'ridiculously', 'suspiciously',
  'legendary', 'painfully', 'wildly', 'strangely', 'aggressively', 'ceremonially',
  'unnecessarily', 'magnificently', 'questionably', 'triumphantly', 'catastrophically', 'deliciously',
]

const NOUN_FRAMES = [
  'champion', 'ambassador', 'specialist', 'architect', 'oracle', 'captain', 'professor', 'wizard',
  'menace', 'connoisseur', 'enthusiast', 'consultant', 'strategist', 'legend', 'maverick', 'expert',
  'hero', 'villain', 'genius', 'gremlin', 'mastermind', 'sidekick', 'commander', 'scholar',
  'professional', 'champion of nonsense', 'guardian of confusion', 'director of poor decisions',
  'minister of mayhem', 'collector of questionable ideas',
]

const ENDING_FRAMES = [
  'who treats common sense like an optional subscription',
  'whose confidence has clearly outrun the available evidence',
  'who could turn a two-minute task into a historical expedition',
  'whose master plan appears to have been written on a napkin during lunch',
  'who brings the dramatic energy of a trailer for a movie nobody commissioned',
  'whose logic deserves its own customer-support department',
  'who somehow makes an ordinary Tuesday feel like a season finale',
  'whose greatest achievement is making everyone ask what just happened',
  'who could lose an argument with a clearly labeled instruction manual',
  'whose strategic process begins with confidence and ends with snacks',
  'who makes overthinking look like an Olympic event',
  'whose timing is so mysterious that clocks have stopped asking questions',
  'who has turned improvisation into a full-time management philosophy',
  'whose plans require three maps, two snacks, and one miracle',
  'who could make a shortcut require a committee meeting',
  'whose dramatic entrance is always followed by an even more dramatic explanation',
  'who somehow makes nonsense sound like a carefully researched thesis',
  'whose personal brand is apparently organized confusion',
  'who would confidently press the button labeled do not press',
  'whose greatest rival is the instruction manual',
]

function uniqueExpanded(base: string[], frames: string[], target: number, join: (base: string, frame: string, index: number) => string) {
  const out = [...new Set(base)]
  let i = 0
  while (out.length < target) {
    const b = base[i % base.length]
    const f = frames[Math.floor(i / base.length) % frames.length]
    const value = join(b, f, i)
    if (!out.includes(value)) out.push(value)
    i += 1
  }
  return out
}

function buildToolLibrary(tool: Omit<InsultTool, 'library'>) {
  // 101 × 101 × 101 = 1,030,301 possible combinations per tool.
  // Every page starts from its own vocabulary, so styles remain distinct.
  const adjectives = uniqueExpanded(tool.adjectives, ADJECTIVE_FRAMES, 101,
    (b, f) => `${f} ${b}`)
  const nouns = uniqueExpanded(tool.nouns, NOUN_FRAMES, 101,
    (b, f) => `${b} ${f}`)
  const endings = uniqueExpanded(tool.endings, ENDING_FRAMES, 101,
    (b, f) => `${b}; ${f}`)
  return { adjectives, nouns, endings }
}

export const INSULT_TOOLS: InsultTool[] = [
  {
    slug: 'medieval-insult-generator',
    title: 'Medieval Insult Generator',
    shortDescription: 'Summon playful tavern-ready insults with medieval words, titles, and dramatic old-world flair.',
    icon: '🏰', accent: 'amber', audience: 'history fans, roleplayers, writers, and friends who enjoy theatrical banter',
    style: 'medieval tavern banter',
    keywords: ['medieval insult generator','medieval insults','old fashioned insult generator','medieval roast generator'],
    adjectives: ['mud-brained','goose-hearted','turnip-witted','mead-soaked','moss-backed','loutish','dusty-minded','witless','crooked','blustering'],
    nouns: ['knave','scullion','turnip-head','tavern rat','court fool','mangy squire','dunghill knight','goose-herd','mudlark','village oaf'],
    endings: ['who lost an argument with a goat','whose finest armor is a dented bucket','fit only to polish the castle floor','whose wisdom fled before breakfast','who would lose a duel with a broom'],
    useCases: ['tabletop role-playing sessions','medieval-themed parties','creative writing','friendly group-chat jokes'],
  },
  {
    slug: 'pirate-insult-generator',
    title: 'Pirate Insult Generator',
    shortDescription: 'Generate salty, silly pirate insults packed with deckhand swagger, sea slang, and treasure-hunt attitude.',
    icon: '🏴‍☠️', accent: 'sky', audience: 'pirate fans, party hosts, gamers, and anyone who likes ridiculous sea-dog banter',
    style: 'cartoon pirate banter',
    keywords: ['pirate insult generator','pirate insults','pirate roast generator','funny pirate insults'],
    adjectives: ['barnacle-brained','bilge-breathed','sea-soaked','scurvy','salt-stained','deck-swabbing','rum-wobbled','stormy-headed','parrot-brained','shipwrecked'],
    nouns: ['landlubber','bilge rat','deck swabber','cabin fool','barnacle','mangy buccaneer','soggy seadog','portside nuisance','reef goblin','one-legged fool'],
    endings: ['who could lose a treasure map on a treasure chest','whose compass points exclusively toward nonsense','fit only to swab a deck made of jelly','who makes a parrot look well-read','whose greatest voyage is to the snack cupboard'],
    useCases: ['pirate parties','costume events','games and streams','playful messages to friends'],
  },
  {
    slug: 'victorian-insult-generator',
    title: 'Victorian Insult Generator',
    shortDescription: 'Create polished, wonderfully overdramatic Victorian put-downs with drawing-room elegance.',
    icon: '🎩', accent: 'violet', audience: 'period-drama fans, writers, theater groups, and lovers of formal wit',
    style: 'Victorian drawing-room wit',
    keywords: ['victorian insult generator','victorian insults','19th century insult generator','polite insult generator'],
    adjectives: ['astonishingly vapid','spectacularly tiresome','uncommonly fussy','hopelessly pompous','remarkably vacant','painfully smug','absurdly theatrical','dreadfully tedious'],
    nouns: ['social nuisance','drawing-room bore','walking inconvenience','provincial curiosity','amateur philosopher','second-rate dandy','melancholy bore','parlor peacock'],
    endings: ['whose conversation requires a recovery period','who mistakes confidence for competence','whose grand entrance is rarely followed by a useful sentence','whose manners have clearly resigned','who could make tea feel argumentative'],
    useCases: ['period-style fiction','theater rehearsals','writing exercises','sophisticated friendly banter'],
  },
  {
    slug: 'roast-generator',
    title: 'Roast Generator',
    shortDescription: 'Make quick, playful roasts for friends with absurd comparisons instead of genuinely hurtful attacks.',
    icon: '🔥', accent: 'rose', audience: 'friends, party hosts, comedians, and creators looking for lighthearted roast lines',
    style: 'modern playful roast',
    keywords: ['roast generator','funny roast generator','friend roast generator','random roast'],
    adjectives: ['spectacularly chaotic','aggressively ordinary','professionally confused','mildly legendary','comically dramatic','deeply unserious','impressively unprepared'],
    nouns: ['human loading screen','walking plot twist','budget superhero','confused tutorial','side-quest champion','Wi-Fi dead zone','unfinished group project'],
    endings: ['and somehow still proud of it','with the confidence of someone who skipped the instructions','who turns simple tasks into trilogies','whose greatest skill is making an entrance five minutes late','who could overthink a yes-or-no question'],
    useCases: ['birthday games','roast battles','group chats','friendly party banter'],
  },
  {
    slug: 'savage-insult-generator',
    title: 'Savage Insult Generator',
    shortDescription: 'Generate sharper but still playful one-liners built around clever exaggeration and absurdity.',
    icon: '⚡', accent: 'red', audience: 'comedy fans and friends who understand the difference between a joke and a personal attack',
    style: 'sharp comedic banter',
    keywords: ['savage insult generator','savage roasts','sharp roast generator','brutal funny insults'],
    adjectives: ['spectacularly clueless','alarmingly confident','chronically dramatic','heroically misguided','unreasonably loud','impressively chaotic','confidently incorrect'],
    nouns: ['human pop-up ad','broken compass','walking plot hole','low-battery warning','expired tutorial','professional overthinker','confusion ambassador'],
    endings: ['and somehow that is your strongest feature','who makes common sense request a vacation','whose confidence deserves its own weather system','who could turn a shortcut into an expedition','whose logic needs a customer-support ticket'],
    useCases: ['comedy writing','friendly roast games','group-chat jokes','improv prompts'],
  },
  {
    slug: 'funny-insult-generator',
    title: 'Funny Insult Generator',
    shortDescription: 'Get silly, family-friendly insults that sound more ridiculous than mean.',
    icon: '😂', accent: 'yellow', audience: 'families, students, party groups, and anyone who wants goofy humor',
    style: 'goofy family-friendly humor',
    keywords: ['funny insult generator','funny insults','clean insult generator','silly insult generator'],
    adjectives: ['goofily confused','spectacularly wobbly','ridiculously dramatic','adorably chaotic','mildly bewildered','comically overcooked','wonderfully nonsensical'],
    nouns: ['walking pancake','confused potato','soggy noodle','sleepy goose','dramatic sandwich','lost sock','overexcited toaster'],
    endings: ['and that is honestly impressive','who could confuse a door with a complicated puzzle','whose master plan appears to involve snacks','who brings cartoon energy to every meeting','whose brain is currently buffering'],
    useCases: ['family games','school-friendly jokes','party prompts','lighthearted messages'],
  },
  {
    slug: 'friendly-insult-generator',
    title: 'Friendly Insult Generator',
    shortDescription: 'Generate affectionate teasing lines designed for close friends, siblings, and people who know your humor.',
    icon: '🤝', accent: 'emerald', audience: 'close friends, siblings, couples, and groups with a playful sense of humor',
    style: 'affectionate teasing',
    keywords: ['friendly insult generator','friendly roasts','playful insult generator','clean roast generator'],
    adjectives: ['lovably chaotic','spectacularly distracted','adorably stubborn','professionally snack-focused','wonderfully unpredictable','heroically late'],
    nouns: ['favorite menace','human snooze button','walking group-chat notification','snack strategist','professional procrastinator','chaos consultant'],
    endings: ['but we would still invite you back','and somehow we would miss it if you stopped','whose nonsense has become part of the furniture','who is far too lovable for a serious complaint','and that is why you are our favorite problem'],
    useCases: ['best-friend messages','birthday cards','sibling banter','inside jokes'],
  },
  {
    slug: 'fantasy-insult-generator',
    title: 'Fantasy Insult Generator',
    shortDescription: 'Create fantasy-world insults worthy of taverns, quests, guild halls, and rival adventuring parties.',
    icon: '🐉', accent: 'fuchsia', audience: 'D&D players, fantasy writers, RPG groups, and worldbuilders',
    style: 'fantasy tavern banter',
    keywords: ['fantasy insult generator','fantasy insults','dnd insult generator','fantasy roast generator'],
    adjectives: ['dragon-bothering','goblin-minded','spell-scrambled','quest-lost','moon-cursed','wand-wobbling','rune-forgotten'],
    nouns: ['failed adventurer','discount wizard','goblin scribe','cursed turnip knight','wandering bard','muddy paladin','tavern oracle'],
    endings: ['whose map has never met the correct road','who would roll a natural one on tying a boot','whose heroic destiny is apparently a snack break','who would challenge a dragon and apologize immediately','whose spellbook is mostly grocery lists'],
    useCases: ['D&D sessions','fantasy fiction','RPG streams','guild-chat jokes'],
  },
  {
    slug: 'wizard-insult-generator',
    title: 'Wizard Insult Generator',
    shortDescription: 'Conjure magical insults with arcane vocabulary, spellbook jokes, and ridiculous wizard energy.',
    icon: '🧙', accent: 'indigo', audience: 'wizard fans, fantasy gamers, writers, and magical roleplayers',
    style: 'arcane wizard banter',
    keywords: ['wizard insult generator','wizard insults','magic insult generator','mage roast generator'],
    adjectives: ['spell-scrambled','wand-wobbled','rune-rusty','mana-starved','scroll-chewed','cauldron-headed','arcane-minded'],
    nouns: ['apprentice','discount archmage','spellbook goblin','wand juggler','cauldron nuisance','failed conjurer','library menace'],
    endings: ['whose strongest spell is misplaced paperwork','who could enchant a sandwich and still lose it','whose familiar has requested a new employer','who studies ancient runes but cannot read a menu','whose magical aura resembles a weak desk lamp'],
    useCases: ['RPG campaigns','fantasy writing','costume parties','wizard-themed games'],
  },
  {
    slug: 'pirate-roast-generator',
    title: 'Pirate Roast Generator',
    shortDescription: 'Combine pirate swagger and modern roast comedy for ridiculous sea-themed burn lines.',
    icon: '⚓', accent: 'cyan', audience: 'party groups, pirate fans, gamers, and comedy creators',
    style: 'pirate-themed roast comedy',
    keywords: ['pirate roast generator','pirate roast','pirate burn generator','funny pirate roast'],
    adjectives: ['barnacle-brained','rum-wobbled','deck-confused','storm-soaked','treasure-blind','parrot-approved','anchor-headed'],
    nouns: ['captain of bad decisions','bilge philosopher','discount buccaneer','lost deckhand','treasure-challenged pirate','portside clown'],
    endings: ['who could bury treasure and forget where the beach is','whose ship has more direction than its captain','who would surrender to a mildly stern seagull','whose greatest booty is a bag of chips','who makes a compass question its career'],
    useCases: ['pirate parties','roast games','streaming content','group chats'],
  },
  {
    slug: 'cowboy-insult-generator',
    title: 'Cowboy Insult Generator',
    shortDescription: 'Generate western-style jabs with dusty trails, saloons, horses, and frontier swagger.',
    icon: '🤠', accent: 'orange', audience: 'western fans, country-themed parties, writers, and playful friends',
    style: 'old-west cowboy banter',
    keywords: ['cowboy insult generator','cowboy insults','western insult generator','cowboy roast generator'],
    adjectives: ['dusty-headed','cactus-hearted','trail-worn','spur-scratched','saloon-confused','horse-brained','lonesome'],
    nouns: ['two-bit outlaw','saloon nuisance','cactus philosopher','trail fool','bargain-bandit','dusty drifter','barnyard outlaw'],
    endings: ['who could miss a barn while standing inside it','whose horse has better judgment','who rides into town only to forget why','whose fastest draw is reaching for excuses','who could get lost on a straight trail'],
    useCases: ['western parties','cowboy roleplay','creative writing','friendly roast games'],
  },
  {
    slug: 'royal-insult-generator',
    title: 'Royal Insult Generator',
    shortDescription: 'Deliver regal, courtly put-downs fit for a fictional palace, complete with pomp and ceremony.',
    icon: '👑', accent: 'purple', audience: 'history fans, fantasy writers, theater groups, and playful royal roleplayers',
    style: 'fictional royal court wit',
    keywords: ['royal insult generator','royal insults','regal insult generator','king insult generator'],
    adjectives: ['spectacularly pompous','courtly and clueless','majestically tedious','nobly misguided','ceremoniously foolish','grandly confused'],
    nouns: ['courtly nuisance','palace peacock','royal bore','ducal disaster','ceremonial fool','budget monarch','overdressed advisor'],
    endings: ['whose crown would improve greatly by becoming a hat','whose royal decree could not organize a picnic','who mistakes ceremony for competence','whose court has petitioned for quieter meetings','who would lose a throne in a game of musical chairs'],
    useCases: ['fantasy court scenes','theater games','creative writing','royal-themed parties'],
  },
  {
    slug: 'schoolyard-insult-generator',
    title: 'Schoolyard Insult Generator',
    shortDescription: 'Create clean, goofy playground-style jokes with exaggerated nicknames and harmless silliness.',
    icon: '🎒', accent: 'lime', audience: 'students, teachers, families, and anyone who wants clean schoolyard humor',
    style: 'clean playground humor',
    keywords: ['schoolyard insult generator','clean school insults','school roast generator','kid friendly insult generator'],
    adjectives: ['goofily confused','extra wobbly','super dramatic','mildly bonkers','ridiculously sleepy','wildly distracted'],
    nouns: ['walking lunchbox','human homework reminder','confused pencil','soggy sandwich','lost eraser','backpack tornado','sleepy textbook'],
    endings: ['who would need a hall pass to find the cafeteria','whose locker probably needs directions','who makes recess look like a strategic operation','whose homework has entered witness protection','who could lose a pencil while holding it'],
    useCases: ['school-safe games','classroom icebreakers','family jokes','friend banter'],
  },
  {
    slug: 'office-roast-generator',
    title: 'Office Roast Generator',
    shortDescription: 'Generate workplace-safe roasts about meetings, emails, calendars, and office chaos without targeting personal traits.',
    icon: '💼', accent: 'blue', audience: 'coworkers, team events, office parties, and workplace comedy writers',
    style: 'workplace-safe office humor',
    keywords: ['office roast generator','work roast generator','coworker roast generator','office insults'],
    adjectives: ['meeting-powered','calendar-challenged','email-heavy','deadline-dodging','spreadsheet-dramatic','professionally distracted'],
    nouns: ['human status meeting','walking calendar invite','spreadsheet sorcerer','email avalanche','deadline magician','conference-room legend','professional tab hoarder'],
    endings: ['who schedules meetings to discuss the meeting that should have been an email','whose inbox has its own weather system','who treats a two-line task like a quarterly initiative','whose calendar needs a project manager','who can turn a coffee break into a strategic workshop'],
    useCases: ['team socials','office parties','icebreakers','workplace comedy'],
  },
  {
    slug: 'best-friend-roast-generator',
    title: 'Best Friend Roast Generator',
    shortDescription: 'Generate affectionate best-friend roasts that tease habits and chaos while keeping the friendship intact.',
    icon: '🫶', accent: 'pink', audience: 'best friends, birthday groups, roommates, and long-running inside jokes',
    style: 'affectionate best-friend roast',
    keywords: ['best friend roast generator','best friend insults','friend roast generator','birthday roast generator'],
    adjectives: ['lovably chaotic','legendary late','snack-powered','dramatically indecisive','chronically distracted','ridiculously confident'],
    nouns: ['favorite menace','human group chat','walking inside joke','snack consultant','professional overthinker','chaos teammate'],
    endings: ['and somehow I would still choose you for the next adventure','whose nonsense has become a friendship tradition','who can turn a five-minute plan into a three-hour story','whose greatest superpower is surviving your own decisions','and honestly the friendship would be boring without it'],
    useCases: ['birthday roasts','best-friend messages','sleepovers','friendship anniversaries'],
  },
  {
    slug: 'comeback-generator',
    title: 'Comeback Generator',
    shortDescription: 'Get quick, clever comeback ideas for playful situations when you need a witty response on the spot.',
    icon: '💬', accent: 'teal', audience: 'comedy fans, writers, friends, and anyone practicing quick verbal wit',
    style: 'clever playful comeback',
    keywords: ['comeback generator','comeback ideas','funny comeback generator','witty comeback generator'],
    adjectives: ['unexpectedly confident','beautifully dramatic','calmly chaotic','delightfully sarcastic','suspiciously prepared','impressively quick'],
    nouns: ['walking plot twist','professional overthinker','conversation speed bump','human notification','comedy side quest','debate gremlin'],
    endings: ['and I admire the confidence even if the argument needs work','but let us both pretend that sounded better in your head','which is a bold strategy for a Tuesday','and somehow you still made that my problem','so I am going to give that attempt a polite round of applause'],
    useCases: ['friendly banter','improv practice','writing dialogue','party games'],
  },
  {
    slug: 'sarcastic-comeback-generator',
    title: 'Sarcastic Comeback Generator',
    shortDescription: 'Generate dry, witty replies with playful sarcasm for friends who appreciate a little verbal theater.',
    icon: '😏', accent: 'slate', audience: 'sarcasm fans, comedy writers, friends, and improv performers',
    style: 'dry sarcastic banter',
    keywords: ['sarcastic comeback generator','sarcastic comebacks','dry humor comeback','witty sarcastic replies'],
    adjectives: ['remarkably confident','deeply committed','impressively dramatic','wonderfully unnecessary','surprisingly ambitious','truly unforgettable'],
    nouns: ['conversation experiment','walking plot twist','premium overreaction','human footnote','unexpected debate','limited-edition nuisance'],
    endings: ['because apparently peace was not exciting enough','and I am sure the committee will discuss it at length','which is certainly one way to spend a perfectly good afternoon','but please continue; this is becoming educational','and I appreciate your commitment to the bit'],
    useCases: ['friendly texting','comedy writing','improv practice','playful group chats'],
  },
  {
    slug: 'villain-insult-generator',
    title: 'Villain Insult Generator',
    shortDescription: 'Craft theatrical villain-to-hero insults with comic-book drama, grand plans, and ridiculous menace.',
    icon: '🦹', accent: 'zinc', audience: 'comic fans, writers, RPG players, and anyone who loves over-the-top villain dialogue',
    style: 'comic-book villain banter',
    keywords: ['villain insult generator','villain insults','evil insult generator','supervillain roast generator'],
    adjectives: ['pathetically heroic','dramatically misguided','heroically inconvenient','spectacularly predictable','comically doomed','alarmingly optimistic'],
    nouns: ['cape-challenged hero','sidekick substitute','budget champion','walking plot device','underfunded vigilante','discount detective'],
    endings: ['whose greatest power is arriving after the important part','who would foil my plan by accidentally helping me','whose secret identity is probably just poor planning','who brings hope to situations that clearly need snacks','whose heroic speech needs an intermission'],
    useCases: ['comic writing','superhero roleplay','RPG campaigns','improv scenes'],
  },
]



/** Existing Shakespeare generator; original client/library remains intact. */
export const SHAKESPEARE_INSULT_TOOL = {
  slug: 'shakespeare-insult-generator',
  title: 'Shakespeare Insult Generator',
  shortDescription: 'Use the existing Shakespearean generator for dramatic Elizabethan insults, old-English roasts, and theatrical comebacks.',
  icon: '🎭',
  accent: 'purple',
  href: '/fun/insult-generator/shakespeare-insult-generator',
} as const

export const INSULT_COLLECTION_TOOLS = [
  ...INSULT_TOOLS,
  SHAKESPEARE_INSULT_TOOL,
]

export const INSULT_TOOLS_WITH_LIBRARY = INSULT_TOOLS.map(tool => ({
  ...tool,
  library: buildToolLibrary(tool),
}))
