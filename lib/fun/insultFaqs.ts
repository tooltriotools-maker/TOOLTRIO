/**
 * TOOLTRIO — Insult Generator FAQ libraries
 *
 * Theme-specific FAQ content for each insult/roast/comeback generator, kept
 * separate from the shared functional FAQs (free to use, sharing, mobile) that
 * apply the same way to every generator. These answers reference each
 * generator's actual voice, use cases, and how it differs from its closest
 * sibling in the library, so no two generator pages read the same.
 */

export const INSULT_FAQ_EXTRAS: Record<string, { question: string; answer: string }[]> = {
  'medieval-insult-generator': [
    {
      question: 'What time period do these medieval insults come from?',
      answer:
        "The vocabulary draws on the muddy, plague-era texture of the Dark Ages and medieval Europe — think village squares, dung farmers, hedge knights, and moat-adjacent grievances rather than polished royal courts. It's the peasant end of the medieval world, not the throne room.",
    },
    {
      question: 'Is this different from the Shakespeare Insult Generator?',
      answer:
        "Yes — Shakespeare's generator uses authentic Elizabethan vocabulary (a real, documented set of words the Bard actually used). This one leans into medieval peasant life and village grievances instead, with a rougher, dirtier, more agricultural flavor — gong farmers and turnip fields rather than iambic pentameter.",
    },
    {
      question: 'Is it good for a Renaissance Faire or D&D session?',
      answer:
        "Very good for it. The lines work as flavor text for a tavern brawl, a village NPC's grumbling, or trash talk before a joust re-enactment at a Ren Faire. Game masters running low-fantasy medieval campaigns use it to season NPC dialogue on the fly.",
    },
    {
      question: 'Are the insults historically accurate?',
      answer:
        "They're historically inspired rather than historically accurate — real medieval insults existed but were often unprintable. This generator captures the flavor (peasants, plague, livestock, dungeons) with modern comic timing rather than reproducing period slang word-for-word.",
    },
  ],
  'pirate-insult-generator': [
    {
      question: 'Where does the pirate slang come from?',
      answer:
        "It borrows the classic 'Golden Age of Piracy' voice popularized in fiction and film — 'ye', 'matey', 'scurvy', 'landlubber' — rather than historically documented 18th-century sailor speech, which was far more nautical jargon than pirate cliché.",
    },
    {
      question: "What's the difference between this and the Pirate Roast Generator?",
      answer:
        "This one is a straightforward pirate-flavored insult aimed at anyone — landlubbers included. The Pirate Roast Generator is built specifically around crew dynamics: mutiny, captaincy, and roasting a specific deckhand, so it reads more like banter within a ship's crew than an insult at a stranger.",
    },
    {
      question: 'Is this good for a pirate-themed party or Talk Like a Pirate Day?',
      answer:
        "Yes — it's one of the most requested uses. Load up a few lines before September 19th (Talk Like a Pirate Day) or a pirate birthday party, and you'll have salty comebacks ready without having to improvise 'arrr' on the spot.",
    },
    {
      question: 'Can I use this for a pirate-themed D&D campaign?',
      answer:
        'Definitely — game masters running seafaring campaigns use it for tavern NPCs, rival crews, and mutinous first mates. The vocabulary (bilge rats, barnacles, plank-walking) gives instant nautical flavor without you having to write dialogue from scratch.',
    },
  ],
  'victorian-insult-generator': [
    {
      question: 'Why do Victorian insults sound so polite?',
      answer:
        "The Victorians perfected the art of devastating someone while appearing perfectly composed — no raised voices, no vulgarity, just precisely aimed condescension delivered over tea. This generator captures that specific 'polite cruelty' register rather than crude modern insults.",
    },
    {
      question: 'Is this based on real Victorian-era phrases?',
      answer:
        "It's inspired by the formal, elaborate speech patterns of Victorian drawing-room dialogue and etiquette manuals, rather than quoting real historical documents. The goal is the cadence and vocabulary of the era, not a museum-accurate transcript.",
    },
    {
      question: 'Who is this generator best for?',
      answer:
        'People who prefer their insults elegant rather than crude — writers doing period dialogue, fans of costume dramas, or anyone who wants to devastate someone at a dinner party without technically being rude enough to get called out for it.',
    },
    {
      question: 'Can I use this for writing historical fiction?',
      answer:
        "Yes — it's a solid starting point for Victorian-era dialogue between characters of a certain social standing. You'll likely want to adjust for your specific characters' voices, but the cadence and vocabulary give you a period-appropriate base to build from.",
    },
  ],
  'funny-insult-generator': [
    {
      question: "Is this generator meant to actually hurt anyone's feelings?",
      answer:
        "No — it's the softest generator in the library on purpose. Every line goes for silly imagery (a Roomba with opinions, a penguin on roller skates) instead of anything that could genuinely sting, so it's safe for casual, low-stakes banter.",
    },
    {
      question: 'How is this different from the Friendly Insult Generator?',
      answer:
        "This one is about pure goofiness and absurd imagery aimed at anyone. The Friendly Insult Generator specifically frames the target as someone you love — it leans on affection ('you're my favorite disaster') rather than just silliness.",
    },
    {
      question: 'Is this appropriate for kids or classroom use?',
      answer:
        "It's about as harmless as insult humor gets — no crude language, no genuine cruelty, just absurd comparisons. Many teachers use it as a lighthearted icebreaker or creative-writing warm-up, though as with any generator, a quick preview is always sensible.",
    },
    {
      question: 'Can I use this for a comedy sketch or improv warm-up?',
      answer:
        'Yes — the absurd, image-heavy style (comparing someone to a malfunctioning appliance or a confused animal) works well as a quick warm-up prompt for improv groups or sketch writers looking for silly comparisons on demand.',
    },
  ],
  'friendly-insult-generator': [
    {
      question: "Isn't this a contradiction — a 'friendly' insult?",
      answer:
        "Not really — this is the specific genre of insult that only works between people who genuinely like each other. The lines lean on affection ('I love you like family, which explains why you annoy me') so the insult reads as closeness, not hostility.",
    },
    {
      question: 'Who should I actually send these to?',
      answer:
        'Someone who will clearly read it as banter — a close friend, a sibling, a partner with a well-established sense of humor. These lines depend entirely on existing trust; sent to the wrong person, even a friendly one can land wrong.',
    },
    {
      question: 'How is this different from the Best Friend Roast Generator?',
      answer:
        'This one is broader — playful banter for any close relationship. The Best Friend Roast Generator is narrower and more specific, built around the particular chaos of a best-friendship (shared secrets, unreliable hangout planning, mutual bad influence).',
    },
    {
      question: 'Can I use this in a birthday card or toast?',
      answer:
        "Yes — it's a popular use. A line like 'I keep you around purely for the entertainment value' works well in a birthday card or a best-man speech precisely because it's clearly loving rather than cutting.",
    },
  ],
  'fantasy-insult-generator': [
    {
      question: 'What kind of fantasy world is this based on?',
      answer:
        'A generic high-fantasy setting — orcs, elves, dragons, wizards, taverns, and quest logs — closer to Dungeons & Dragons or Tolkien-adjacent fiction than any one specific book or game universe.',
    },
    {
      question: 'Is this good for a tabletop RPG session?',
      answer:
        "Yes, this is one of its most common uses. Dungeon Masters use it for tavern NPC banter, rival adventuring parties, or trash talk before an in-game duel. It's a fast way to add flavor without writing dialogue from scratch mid-session.",
    },
    {
      question: 'How is this different from the Wizard Insult Generator?',
      answer:
        "This one covers the whole fantasy world — orcs, elves, dragons, knights, general adventuring-party banter. The Wizard Insult Generator narrows in specifically on arcane, spellcasting-flavored insults from one grumpy archmage's point of view.",
    },
    {
      question: 'Can I use this for fantasy fiction writing?',
      answer:
        "Yes — it's a useful prompt generator for tavern-brawl dialogue or a villain's dismissive line to a hero. Most writers use it as a starting point and adjust the phrasing to match their specific characters' voices.",
    },
  ],
  'wizard-insult-generator': [
    {
      question: 'What makes this different from the Fantasy Insult Generator?',
      answer:
        'This one is narrower and more specific — it stays inside the world of spellcasting, grimoires, familiars, and arcane mishaps, delivered from the voice of a grumpy archmage. The Fantasy Insult Generator covers the whole world (orcs, knights, dragons) rather than just magic.',
    },
    {
      question: 'Is this good for a D&D wizard or sorcerer character?',
      answer:
        "Very good for it — if you're playing a spellcaster with a dry, superior sense of humor, these lines fit that archetype well. It's also useful for Dungeon Masters voicing an NPC archmage who's grown tired of incompetent apprentices.",
    },
    {
      question: 'Can I use this for Harry Potter-style roleplay or fan content?',
      answer:
        "The vocabulary (spellbooks, familiars, incantations, potions) fits general wizarding-world roleplay reasonably well, though it's an original generator, not tied to any specific book series or its particular terminology.",
    },
    {
      question: 'Why do the insults focus on failed spells and potions?',
      answer:
        "Because that's the most universally recognizable wizard failure — everyone gets the image of a botched incantation or an exploded cauldron, so it lands as a joke without needing extra setup.",
    },
  ],
  'pirate-roast-generator': [
    {
      question: 'How is this different from the regular Pirate Insult Generator?',
      answer:
        "The Pirate Insult Generator is a general-purpose pirate put-down aimed at anyone, landlubbers included. This one is built specifically around ship's-crew dynamics — captaincy, mutiny, navigation failures — so it reads like banter aimed at a specific deckhand rather than a stranger.",
    },
    {
      question: "Is this meant for roasting a specific 'crew' or friend group?",
      answer:
        "Yes — it works especially well if your friend group has an ongoing pirate-crew bit (a 'captain,' a running joke about who'd mutiny first). The lines are written from a crewmate's perspective, not a stranger's.",
    },
    {
      question: 'Can I use this for a themed party game?',
      answer:
        "It works well as a party icebreaker — assign everyone a 'rank' and roast the 'captain' using generated lines. It's also popular for pirate-themed team-building events where a little structured ribbing is part of the fun.",
    },
    {
      question: 'Is this appropriate for a family-friendly pirate event?',
      answer:
        'The tone is playful rather than crude, so it works for most pirate-themed family events, though as with any humor tool, previewing a few lines first is a good idea if young kids are involved.',
    },
  ],
  'cowboy-insult-generator': [
    {
      question: "What's the tone of these cowboy insults?",
      answer:
        "Dusty, drawling, and dry — closer to a classic Western movie standoff than a real historical cowboy's vocabulary. Expect tumbleweeds, poker faces, and horses with more sense than the target, not period-accurate 19th-century ranching slang.",
    },
    {
      question: 'Is this good for a Western-themed party or rodeo event?',
      answer:
        "Yes — it's a popular choice for Western-themed parties, line-dancing nights, and rodeo watch parties. A few generated lines work well as a running bit throughout the event.",
    },
    {
      question: 'Can I use this for writing a Western story or screenplay?',
      answer:
        "It's a reasonable starting point for saloon-scene banter or a standoff exchange, though like all the generators here, you'll likely want to tune the specific phrasing to match your characters' individual voices.",
    },
    {
      question: 'Why do so many of the insults involve animals?',
      answer:
        "Cowboy humor traditionally leans on livestock and wildlife comparisons — it's part of the genre's voice. Comparing someone's aim to a 'blindfolded tumbleweed' or their courage to a 'chihuahua guarding an empty ranch' fits the Western comic tradition.",
    },
  ],
  'royal-insult-generator': [
    {
      question: 'What era of royalty is this based on?',
      answer:
        'A generalized, storybook version of a royal court — throne rooms, scepters, footmen, and banishment by decree — rather than any specific real monarchy or historical period. Think fairy-tale court, not a particular king or queen.',
    },
    {
      question: 'How is this different from the Victorian Insult Generator?',
      answer:
        "The Victorian generator is about polite, drawing-room condescension between ordinary (if genteel) people. This one leans on the specific power dynamics of a royal court — decrees, banishment, bloodlines, and the crown's authority — for a grander, more theatrical put-down.",
    },
    {
      question: 'Is this good for a royal-themed party or Renaissance Faire?',
      answer:
        "Yes — it fits naturally into royal-court roleplay, Renaissance Faire banter, or a 'royal court' themed party where guests are assigned titles. The formal, decree-flavored language does a lot of the comic work on its own.",
    },
    {
      question: 'Can I use this for a fantasy story with a royal court setting?',
      answer:
        "It works well as a base for a haughty noble or monarch's dismissive dialogue toward a lesser character. As always, adjust the specific phrasing to fit your character's individual voice and the formality of your setting.",
    },
  ],
  'villain-insult-generator': [
    {
      question: "What's the tone supposed to be — menacing or funny?",
      answer:
        "Both, deliberately — it's the theatrical, monologuing supervillain register from movies and comics: grandiose, condescending, a little too pleased with itself. It's meant to be delivered with a smirk, not taken as a genuine threat.",
    },
    {
      question: 'Is this good for cosplay or a supervillain costume party?',
      answer:
        "Yes — it's a favorite for exactly that. Load up a few lines to deliver in character at a comic-con, cosplay meetup, or costume party where you're playing the villain for the night.",
    },
    {
      question: 'Can I use this for writing a supervillain character?',
      answer:
        "It works well as a starting point for a monologuing antagonist's dialogue — that specific blend of arrogance and theatrical contempt for the hero. Adjust the phrasing to match your specific villain's motivations and voice.",
    },
    {
      question: 'Is this related to the Robot Insult Generator?',
      answer:
        'Not directly — the Robot generator is a cold, logical AI delivering verdicts in error-code language. This one is a warmer, more theatrical human (or humanoid) villain who enjoys the drama of the insult itself.',
    },
  ],
  'new-age-insult-generator': [
    {
      question: 'Is this making fun of spirituality or wellness culture?',
      answer:
        "It's gently poking fun at the specific aesthetic — crystals, chakras, manifesting, 'the universe sent a sign' — rather than spirituality itself. It's affectionate parody aimed at people who are themselves part of (or fans of) that culture, not a dismissal of the practices.",
    },
    {
      question: 'Who is the intended audience for this generator?',
      answer:
        'People who are into (or amused by) wellness and New Age culture and can laugh at its own tropes — the crystal-and-sage crowd roasting each other, essentially, rather than outsiders mocking believers.',
    },
    {
      question: 'Can I use this in a yoga studio or wellness group chat?',
      answer:
        "It fits well in a group that already has an in-joke sense of humor about its own wellness habits — a yoga studio group chat, a manifesting book club — where everyone's laughing with the aesthetic rather than at someone specific.",
    },
    {
      question: 'How is this different from the Zodiac Insult Generator?',
      answer:
        'This one covers the broader New Age aesthetic — crystals, chakras, auras, manifesting. The Zodiac Insult Generator narrows in specifically on astrology and star-sign-based roasting (Mercury retrograde, birth charts, moon signs).',
    },
  ],
  'zodiac-insult-generator': [
    {
      question: 'Does this generator target specific zodiac signs?',
      answer:
        'No — it generates general astrology-flavored insults (chart readings, Mercury retrograde, moon signs, Saturn returns) rather than sign-specific content. It roasts the concept of blaming your chart for your choices, applicable to anyone.',
    },
    {
      question: 'Is this only funny to people who believe in astrology?',
      answer:
        'It lands best with people who follow astrology (even casually) since the references need some familiarity, but the core joke — blaming cosmic forces for bad decisions — is broadly relatable even to skeptics.',
    },
    {
      question: "Can I use this for a friend's birthday if they're really into astrology?",
      answer:
        "Yes, that's a great use case — a line playing on someone's actual chart quirks (if you know them) lands especially well, though the generator produces general astrology humor rather than reading your friend's specific birth chart.",
    },
    {
      question: 'How is this different from the Zodiac Calculator elsewhere on the site?',
      answer:
        "The Zodiac Calculator determines your actual sign and traits from your birthdate. This generator is unrelated to that calculation — it's pure insult-comedy content using astrology as its theme, not a real astrological reading.",
    },
  ],
  'sci-fi-insult-generator': [
    {
      question: 'What kind of sci-fi universe is this based on?',
      answer:
        "A generalized space-opera setting — spaceships, warp drives, alien crews, probe droids — inspired by the broad genre rather than any single franchise, so it's usable regardless of which specific sci-fi universe you're a fan of.",
    },
    {
      question: 'Is this good for a sci-fi convention or watch party?',
      answer:
        "Yes — it's popular at sci-fi conventions, movie marathon watch parties, and tabletop sessions set in space, where the genre-general vocabulary (warp drives, transmissions, away teams) fits almost any sci-fi setting.",
    },
    {
      question: 'How is this different from the Robot Insult Generator?',
      answer:
        'This one is about the broader space-opera world — aliens, starships, galaxies, away teams. The Robot Insult Generator is narrower, delivered specifically in the cold, logical voice of a single AI running diagnostics on you.',
    },
    {
      question: 'Can I use this for a tabletop sci-fi RPG like Starfinder?',
      answer:
        "Yes — game masters running space-opera tabletop campaigns use it for rival crew banter, hostile alien NPCs, or a snarky ship's AI's commentary on the party's decisions.",
    },
  ],
  'robot-insult-generator': [
    {
      question: 'Why does this generator sound like error messages?',
      answer:
        "That's the whole bit — it's written entirely in the voice of a cold, logical AI running diagnostics on you and reporting the results, complete with error codes, percentages, and system alerts instead of normal insult phrasing.",
    },
    {
      question: 'Is this the same as the Sci-Fi Insult Generator?',
      answer:
        "No — the Sci-Fi generator covers a broad space-opera world (aliens, starships, galaxies). This one is narrower: a single AI's cold, clinical, error-code-flavored takedown of your last decision, closer to a malfunctioning computer than a space adventure.",
    },
    {
      question: 'Is this good for programmers or tech workers?',
      answer:
        "It's a favorite in tech circles specifically because the references (404 errors, infinite loops, outdated firmware, failed diagnostics) land instantly with anyone who works around code — it's insult humor built from a programmer's shared vocabulary.",
    },
    {
      question: 'Can I use this for an AI or robotics-themed project presentation?',
      answer:
        "It works well as comic relief in a robotics club demo or an AI-themed party, where the 'malfunctioning AI judging you' bit fits the theme without needing extra explanation.",
    },
  ],
  'zombie-insult-generator': [
    {
      question: "What's the tone — scary or funny?",
      answer:
        "Funny, not scary — the humor comes from decay and shambling-undead imagery played for laughs (rotten comebacks, brains not worth eating) rather than horror. It's Halloween-party humor, not a horror-movie script.",
    },
    {
      question: 'Is this good for a Halloween party or zombie-themed event?',
      answer:
        "Yes — it's one of the most popular seasonal generators, especially in October. Load up a few lines for a zombie walk, a Halloween costume party, or a horror-movie marathon watch party.",
    },
    {
      question: 'Can I use this for The Walking Dead or zombie fan content?',
      answer:
        "The general shambling-undead vocabulary (brains, cemeteries, decay, groaning) fits broadly with most zombie fiction and fandoms, though it's an original generator not tied to any specific show or franchise.",
    },
    {
      question: 'Why do the insults focus on decay and rotting?',
      answer:
        "Because that's the core, universally recognizable zombie joke — comparing someone's ideas or excuses to something rotten or decomposing is an easy, visual insult that needs no extra setup to land.",
    },
  ],
  'comeback-generator': [
    {
      question: "How is a 'comeback' different from an insult here?",
      answer:
        "A comeback is a reply to something someone else already said — it's reactive, built to be dropped into a conversation as a retort. The other generators produce standalone insults aimed at a target; this one produces a response line for when you need the last word.",
    },
    {
      question: 'Can I actually use these in a real argument?',
      answer:
        'They work best in low-stakes banter — a group chat disagreement, a friendly debate — rather than a genuinely heated argument, where a canned line can come across as dismissive instead of clever. Read the room before deploying one.',
    },
    {
      question: 'How is this different from the Sarcastic Comeback Generator?',
      answer:
        "This one produces confident, straightforward retorts ('That's a bold statement from someone who just lost this conversation'). The Sarcastic Comeback Generator leans specifically into exaggerated, eye-roll-heavy sarcasm ('Oh wow, groundbreaking observation') as its whole voice.",
    },
    {
      question: 'Can I use this for online arguments or comment sections?',
      answer:
        "You can, but proceed carefully — text lacks tone, and a canned comeback can escalate an online disagreement rather than defuse it. These read best delivered in person or among people who already know you're joking.",
    },
  ],
  'sarcastic-comeback-generator': [
    {
      question: 'What makes this different from the regular Comeback Generator?',
      answer:
        "This one is built entirely around exaggerated sarcasm and eye-roll energy — 'Oh wow, what a groundbreaking observation' — rather than a straightforward confident retort. If you want dry sarcasm specifically, this is the one; for a more direct comeback, use the standard Comeback Generator.",
    },
    {
      question: "Will people know I'm being sarcastic through text?",
      answer:
        "Not always — sarcasm famously doesn't always translate over text without tone of voice or delivery. These lines work best in person, on a call, or with people who already know your sense of humor well enough to catch the tone.",
    },
    {
      question: 'Is this good for responding to obviously bad takes online?',
      answer:
        "It's satisfying to generate, but worth using carefully online — sarcasm in comment sections often reads as genuine hostility rather than a joke, and can escalate disagreements rather than deflate them.",
    },
    {
      question: 'Can I use this for a sarcastic personality in creative writing?',
      answer:
        "Yes — it's a useful bank of lines for writing a sarcastic character's dialogue, particularly for quick one-line reactions to something another character just said.",
    },
  ],
}
