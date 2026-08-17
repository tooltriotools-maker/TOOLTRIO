/**
 * TOOLTRIO — Shakespearean English Dictionary
 *
 * Single source of truth for:
 *  - /fun/shakespeare-translator (modern <-> Shakespearean sentence translation)
 *  - the plain-English "what does this mean" glossary shown on every
 *    insult/roast generator in /fun/insult-generator/* and
 *    /fun/shakespeare-insult-generator
 *
 * Every entry is a full round-trip pair: a modern word, its Shakespearean /
 * Elizabethan equivalent, and a plain-English meaning. Nothing here is a
 * fragment — each entry stands on its own so both the translator and the
 * insult generators' glossaries can look words up from either direction.
 */

export type WordCategory =
  | 'pronoun'
  | 'grammar'
  | 'greeting'
  | 'common-word'
  | 'verb'
  | 'adjective'
  | 'noun'
  | 'exclamation'
  | 'insult-adjective'
  | 'insult-noun'
  | 'phrase'

export interface ShakespeareWord {
  /** Modern English word or short phrase, lowercase */
  modern: string
  /** Shakespearean / Elizabethan equivalent, lowercase */
  shakespearean: string
  /** Plain-English meaning / usage note */
  meaning: string
  category: WordCategory
}

// ─── Phrases (matched before single-word tokens; longest-match-first) ─────
export const SHAKESPEARE_PHRASES: ShakespeareWord[] = [
  { modern: 'why are you', shakespearean: 'wherefore art thou', meaning: '"Wherefore" means "why," not "where" — Juliet is asking why Romeo is a Montague, not where he is.', category: 'phrase' },
  { modern: 'what is your name', shakespearean: 'what is thy name', meaning: 'A direct request for someone\u2019s identity.', category: 'phrase' },
  { modern: 'how are you', shakespearean: 'how now', meaning: 'A common Elizabethan greeting used to ask how someone is doing.', category: 'phrase' },
  { modern: 'good morning', shakespearean: 'good morrow', meaning: 'The standard Elizabethan morning greeting.', category: 'phrase' },
  { modern: 'good evening', shakespearean: 'good even', meaning: 'The standard Elizabethan evening greeting.', category: 'phrase' },
  { modern: 'goodbye', shakespearean: 'fare thee well', meaning: 'A parting wish for someone\u2019s wellbeing — literally "may things go well for you."', category: 'phrase' },
  { modern: 'i love you', shakespearean: 'i do love thee', meaning: 'A direct declaration of love, intensified with "do" for emphasis.', category: 'phrase' },
  { modern: 'get out', shakespearean: 'get thee gone', meaning: 'A forceful command to leave.', category: 'phrase' },
  { modern: 'come here', shakespearean: 'come hither', meaning: '"Hither" means "to this place."', category: 'phrase' },
  { modern: 'i do not know', shakespearean: 'i know not', meaning: 'Elizabethan word order places "not" directly after the verb.', category: 'phrase' },
  { modern: 'i do not care', shakespearean: 'i care not', meaning: 'A dismissive statement of indifference.', category: 'phrase' },
  { modern: 'of course', shakespearean: 'in good sooth', meaning: '"Sooth" means truth, so this means "in truth" or "certainly."', category: 'phrase' },
  { modern: 'to be honest', shakespearean: 'in troth', meaning: '"Troth" is an old word for truth or good faith.', category: 'phrase' },
  { modern: 'right now', shakespearean: 'even now', meaning: 'Used to mean "at this very moment."', category: 'phrase' },
  { modern: 'a long time ago', shakespearean: 'long since', meaning: 'Refers to something that happened far in the past.', category: 'phrase' },
  { modern: 'once upon a time', shakespearean: 'in times past', meaning: 'A storytelling opener referring to an earlier era.', category: 'phrase' },
  { modern: 'shut up', shakespearean: 'hold thy tongue', meaning: 'A command to stop talking.', category: 'phrase' },
  { modern: 'be quiet', shakespearean: 'peace', meaning: 'Used as a one-word command for silence, not just the absence of war.', category: 'phrase' },
  { modern: 'i beg your pardon', shakespearean: 'i cry thee mercy', meaning: 'A formal apology or request for forgiveness.', category: 'phrase' },
  { modern: 'thank you', shakespearean: 'i thank thee', meaning: 'A direct expression of gratitude.', category: 'phrase' },
  { modern: 'you are welcome', shakespearean: 'thou art welcome', meaning: 'A polite response to thanks.', category: 'phrase' },
  { modern: 'i am sorry', shakespearean: 'i am grieved', meaning: 'An expression of regret or sorrow.', category: 'phrase' },
  { modern: 'what do you want', shakespearean: 'what wouldst thou', meaning: 'A question asking what someone desires.', category: 'phrase' },
  { modern: 'i do not understand', shakespearean: 'i comprehend thee not', meaning: 'A statement of confusion about what was said.', category: 'phrase' },
  { modern: 'listen to me', shakespearean: 'hark thee', meaning: '"Hark" is an old command meaning "listen."', category: 'phrase' },
]

// ─── Single-word entries ───────────────────────────────────────────────
export const SHAKESPEARE_WORDS: ShakespeareWord[] = [
  // Pronouns & possessives
  { modern: 'you', shakespearean: 'thou', meaning: 'The informal singular "you," used with familiars, inferiors, or in intimate/insulting address.', category: 'pronoun' },
  { modern: 'you', shakespearean: 'ye', meaning: 'The plural or formal-subject form of "you."', category: 'pronoun' },
  { modern: 'your', shakespearean: 'thy', meaning: 'The informal possessive "your," used before a consonant sound.', category: 'grammar' },
  { modern: 'your', shakespearean: 'thine', meaning: 'The informal possessive "your," used before a vowel sound or on its own (like "mine").', category: 'grammar' },
  { modern: 'yours', shakespearean: 'thine', meaning: 'The possessive pronoun meaning "belonging to you."', category: 'pronoun' },
  { modern: 'my', shakespearean: 'mine', meaning: 'Possessive "my," used before a vowel sound.', category: 'grammar' },
  { modern: 'yourself', shakespearean: 'thyself', meaning: 'The reflexive form of "you."', category: 'pronoun' },
  { modern: 'him', shakespearean: 'him', meaning: 'Object pronoun for a male — unchanged from modern English.', category: 'pronoun' },
  { modern: 'them', shakespearean: 'them', meaning: 'Object pronoun for a group — unchanged from modern English.', category: 'pronoun' },

  // Grammar / verb forms
  { modern: 'are', shakespearean: 'art', meaning: 'The second-person singular form of "to be" (used with "thou").', category: 'grammar' },
  { modern: 'is', shakespearean: 'is', meaning: 'Third-person singular of "to be" — unchanged.', category: 'grammar' },
  { modern: 'have', shakespearean: 'hast', meaning: 'The second-person singular form of "to have" (used with "thou").', category: 'grammar' },
  { modern: 'has', shakespearean: 'hath', meaning: 'The third-person singular form of "to have."', category: 'grammar' },
  { modern: 'do', shakespearean: 'dost', meaning: 'The second-person singular form of "to do" (used with "thou").', category: 'grammar' },
  { modern: 'does', shakespearean: 'doth', meaning: 'The third-person singular form of "to do."', category: 'grammar' },
  { modern: 'will', shakespearean: 'shalt', meaning: 'The second-person singular future-tense auxiliary (used with "thou").', category: 'grammar' },
  { modern: 'go', shakespearean: 'wend', meaning: 'An old word meaning "to go" or "to travel."', category: 'verb' },
  { modern: 'went', shakespearean: 'went', meaning: 'Past tense of "to go" — unchanged (the modern word actually comes from this one).', category: 'verb' },
  { modern: 'not', shakespearean: 'not', meaning: 'Negation word — unchanged, though word order around it differs ("I know not").', category: 'grammar' },

  // Function words
  { modern: 'yes', shakespearean: 'aye', meaning: 'An affirmative — "yes."', category: 'common-word' },
  { modern: 'yes', shakespearean: 'yea', meaning: 'An older affirmative, also meaning "yes."', category: 'common-word' },
  { modern: 'no', shakespearean: 'nay', meaning: 'A negative — "no."', category: 'common-word' },
  { modern: 'nothing', shakespearean: 'naught', meaning: 'Means "nothing" or "zero."', category: 'common-word' },
  { modern: 'anything', shakespearean: 'aught', meaning: 'Means "anything" or "at all."', category: 'common-word' },
  { modern: 'before', shakespearean: 'ere', meaning: 'A shorter, older word for "before."', category: 'common-word' },
  { modern: 'quickly', shakespearean: 'anon', meaning: 'Means "soon" or "right away."', category: 'common-word' },
  { modern: 'soon', shakespearean: 'anon', meaning: 'Means "soon" — famously the reply of a busy Elizabethan tavern servant.', category: 'common-word' },
  { modern: 'always', shakespearean: 'ever', meaning: 'Used to mean "always" or "at all times."', category: 'common-word' },
  { modern: 'never', shakespearean: "ne'er", meaning: 'A contraction of "never."', category: 'common-word' },
  { modern: 'often', shakespearean: 'oft', meaning: 'A shortened form of "often."', category: 'common-word' },
  { modern: 'here', shakespearean: 'hither', meaning: 'Means "to this place" (motion toward here).', category: 'common-word' },
  { modern: 'there', shakespearean: 'thither', meaning: 'Means "to that place" (motion toward there).', category: 'common-word' },
  { modern: 'from-here', shakespearean: 'hence', meaning: 'Means "from this place" or "as a result."', category: 'common-word' },
  { modern: 'from-there', shakespearean: 'whence', meaning: 'Means "from that place" or "from where."', category: 'common-word' },
  { modern: 'over-there', shakespearean: 'yonder', meaning: 'Refers to a place visible but at a distance.', category: 'common-word' },
  { modern: 'between', shakespearean: 'betwixt', meaning: 'An older form of "between."', category: 'common-word' },
  { modern: 'perhaps', shakespearean: 'mayhap', meaning: 'Means "perhaps" or "maybe."', category: 'common-word' },
  { modern: 'truly', shakespearean: 'verily', meaning: 'Used to emphasize that a statement is true.', category: 'common-word' },
  { modern: 'until', shakespearean: 'till', meaning: 'Means "up to the point that" — still common today.', category: 'common-word' },
  { modern: 'listen', shakespearean: 'hark', meaning: 'A command meaning "pay attention" or "listen."', category: 'common-word' },
  { modern: 'sir', shakespearean: 'sirrah', meaning: 'A form of address to a male social inferior, often condescending.', category: 'common-word' },
  { modern: 'friend', shakespearean: 'goodfellow', meaning: 'A friendly, informal term for a companion.', category: 'common-word' },
  { modern: 'stranger', shakespearean: 'stranger', meaning: 'Someone unknown — unchanged from modern English.', category: 'common-word' },
  { modern: 'please', shakespearean: 'prithee', meaning: 'A contraction of "I pray thee," used to politely request something.', category: 'common-word' },

  // Common verbs
  { modern: 'know', shakespearean: 'ken', meaning: 'An old word meaning "to know" or "to recognize."', category: 'verb' },
  { modern: 'think', shakespearean: 'ween', meaning: 'Means "to think" or "to suppose."', category: 'verb' },
  { modern: 'believe', shakespearean: 'trow', meaning: 'Means "to believe" or "to trust."', category: 'verb' },
  { modern: 'understand', shakespearean: 'comprehend', meaning: 'Means "to grasp the meaning of."', category: 'verb' },
  { modern: 'stay', shakespearean: 'tarry', meaning: 'Means "to linger" or "to remain."', category: 'verb' },
  { modern: 'leave', shakespearean: 'depart', meaning: 'Means "to go away from."', category: 'verb' },
  { modern: 'sleep', shakespearean: 'slumber', meaning: 'A poetic word for sleeping.', category: 'verb' },
  { modern: 'wake', shakespearean: 'wake', meaning: 'To stop sleeping — unchanged from modern English.', category: 'verb' },
  { modern: 'ask', shakespearean: 'beseech', meaning: 'Means "to ask urgently" or "to beg."', category: 'verb' },
  { modern: 'weep', shakespearean: 'weep', meaning: 'To cry — unchanged from modern English, still used poetically today.', category: 'verb' },
  { modern: 'kill', shakespearean: 'slay', meaning: 'A dramatic word for killing.', category: 'verb' },
  { modern: 'die', shakespearean: 'perish', meaning: 'A formal word meaning "to die."', category: 'verb' },
  { modern: 'marry', shakespearean: 'wed', meaning: 'To join in marriage.', category: 'verb' },
  { modern: 'steal', shakespearean: 'purloin', meaning: 'A formal word meaning "to steal."', category: 'verb' },
  { modern: 'fight', shakespearean: 'contend', meaning: 'Means "to struggle" or "to fight against."', category: 'verb' },
  { modern: 'flatter', shakespearean: 'flatter', meaning: 'To praise insincerely — unchanged from modern English.', category: 'verb' },
  { modern: 'run', shakespearean: 'flee', meaning: 'Means "to run away," especially from danger.', category: 'verb' },
  { modern: 'look', shakespearean: 'behold', meaning: 'A dramatic command meaning "look" or "see."', category: 'verb' },

  // Descriptive adjectives
  { modern: 'beautiful', shakespearean: 'fair', meaning: 'Meant "beautiful" or "attractive" in Elizabethan English.', category: 'adjective' },
  { modern: 'ugly', shakespearean: 'ill-favored', meaning: 'Means "unattractive" or "unpleasant to look at."', category: 'adjective' },
  { modern: 'foolish', shakespearean: 'addle-pated', meaning: 'Means "confused" or "muddle-headed" — a foolish person.', category: 'adjective' },
  { modern: 'wise', shakespearean: 'sagacious', meaning: 'Means "showing good judgment" or "wise."', category: 'adjective' },
  { modern: 'brave', shakespearean: 'valiant', meaning: 'Means "courageous," especially in battle.', category: 'adjective' },
  { modern: 'cowardly', shakespearean: 'craven', meaning: 'Means "lacking courage" — a coward.', category: 'adjective' },
  { modern: 'honest', shakespearean: 'honest', meaning: 'Truthful and sincere — unchanged, one of Shakespeare\u2019s favorite words.', category: 'adjective' },
  { modern: 'dishonest', shakespearean: 'dissembling', meaning: 'Means "concealing true feelings or intentions" — deceptive.', category: 'adjective' },
  { modern: 'kind', shakespearean: 'gentle', meaning: 'Meant "kind" or "well-mannered," not just "soft."', category: 'adjective' },
  { modern: 'cruel', shakespearean: 'churlish', meaning: 'Means "rude" or "mean-spirited."', category: 'adjective' },
  { modern: 'strange', shakespearean: 'passing strange', meaning: '"Passing" here means "exceedingly" — so, extremely strange.', category: 'adjective' },
  { modern: 'crazy', shakespearean: 'mad', meaning: 'Meant "insane" or "extremely emotional," not just "angry."', category: 'adjective' },
  { modern: 'drunk', shakespearean: 'in his cups', meaning: 'An idiom meaning intoxicated with drink.', category: 'adjective' },
  { modern: 'poor', shakespearean: 'poor', meaning: 'Lacking wealth or fortune — unchanged, though often used to mean "unfortunate."', category: 'adjective' },
  { modern: 'happy', shakespearean: 'merry', meaning: 'Meant "cheerful" or "happy," as in "Merry Christmas."', category: 'adjective' },
  { modern: 'sad', shakespearean: 'melancholy', meaning: 'Means "deeply sad" or "gloomy."', category: 'adjective' },
  { modern: 'angry', shakespearean: 'wroth', meaning: 'An old word meaning "angry" or "wrathful."', category: 'adjective' },
  { modern: 'tired', shakespearean: 'weary', meaning: 'Means "exhausted" — still used today.', category: 'adjective' },
  { modern: 'sick', shakespearean: 'ill', meaning: 'Means "unwell" — still common today.', category: 'adjective' },
  { modern: 'strong', shakespearean: 'stalwart', meaning: 'Means "strong and reliable," especially loyal.', category: 'adjective' },
  { modern: 'weak', shakespearean: 'feeble', meaning: 'Means "physically weak" or "lacking strength."', category: 'adjective' },
  { modern: 'quick', shakespearean: 'swift', meaning: 'Means "fast-moving."', category: 'adjective' },
  { modern: 'good', shakespearean: 'good', meaning: 'Unchanged — but often intensified as "passing good" (exceedingly good).', category: 'adjective' },
  { modern: 'bad', shakespearean: 'ill', meaning: 'Meant "bad" or "wicked," not just "unwell."', category: 'adjective' },
  { modern: 'great', shakespearean: 'wondrous', meaning: 'Means "amazing" or "remarkable."', category: 'adjective' },
  { modern: 'terrible', shakespearean: 'dreadful', meaning: 'Means "causing great fear or dread."', category: 'adjective' },
  { modern: 'lucky', shakespearean: 'fortunate', meaning: 'Means "favored by fortune."', category: 'adjective' },
  { modern: 'jealous', shakespearean: 'green-eyed', meaning: 'Shakespeare coined this phrase ("the green-eyed monster") to describe jealousy.', category: 'adjective' },

  // Nouns
  { modern: 'man', shakespearean: 'man', meaning: 'An adult male — unchanged from modern English.', category: 'noun' },
  { modern: 'woman', shakespearean: 'wench', meaning: 'A young woman, often used casually (and sometimes disrespectfully).', category: 'noun' },
  { modern: 'child', shakespearean: 'babe', meaning: 'A young child or infant.', category: 'noun' },
  { modern: 'servant', shakespearean: 'varlet', meaning: 'Originally meant "servant" or "attendant," later became an insult ("rogue").', category: 'noun' },
  { modern: 'enemy', shakespearean: 'foe', meaning: 'A shorter, poetic word for "enemy."', category: 'noun' },
  { modern: 'house', shakespearean: 'dwelling', meaning: 'A place where someone lives.', category: 'noun' },
  { modern: 'heart', shakespearean: 'heart', meaning: 'Unchanged — the seat of emotion in Elizabethan writing as in modern.', category: 'noun' },
  { modern: 'soul', shakespearean: 'soul', meaning: 'Unchanged — the spiritual essence of a person.', category: 'noun' },
  { modern: 'death', shakespearean: "death's-bed", meaning: 'Refers to the moment or place of dying.', category: 'noun' },
  { modern: 'night', shakespearean: 'e\u2019en', meaning: 'A poetic contraction sometimes used for "evening."', category: 'noun' },
  { modern: 'day', shakespearean: 'morrow', meaning: 'Often used to mean "the next day" or simply "day."', category: 'noun' },
  { modern: 'morning', shakespearean: 'morn', meaning: 'A shortened, poetic form of "morning."', category: 'noun' },
  { modern: 'evening', shakespearean: 'eve', meaning: 'A shortened form of "evening."', category: 'noun' },
  { modern: 'world', shakespearean: 'world', meaning: 'Unchanged — famously "all the world\u2019s a stage."', category: 'noun' },
  { modern: 'devil', shakespearean: 'fiend', meaning: 'A wicked, demonic being.', category: 'noun' },
  { modern: 'ghost', shakespearean: 'spirit', meaning: 'The apparition of a dead person.', category: 'noun' },
  { modern: 'wife', shakespearean: 'wife', meaning: 'Unchanged from modern English.', category: 'noun' },
  { modern: 'husband', shakespearean: 'husband', meaning: 'Unchanged from modern English.', category: 'noun' },
  { modern: 'master', shakespearean: 'liege', meaning: 'A lord to whom loyalty and service are owed.', category: 'noun' },
  { modern: 'fool', shakespearean: 'jester', meaning: 'A professional comic entertainer, often at court.', category: 'noun' },
  { modern: 'idiot', shakespearean: 'dolt', meaning: 'An insult meaning a stupid or slow-witted person.', category: 'noun' },

  // Exclamations
  { modern: 'oh no', shakespearean: 'alack', meaning: 'An exclamation expressing regret or dismay.', category: 'exclamation' },
  { modern: 'wow', shakespearean: 'zounds', meaning: 'A minced oath (short for "God\u2019s wounds") expressing surprise or anger.', category: 'exclamation' },
  { modern: 'darn it', shakespearean: 'fie', meaning: 'An exclamation of disgust or disapproval.', category: 'exclamation' },
  { modern: 'of course', shakespearean: 'forsooth', meaning: 'Literally "in truth" — used to affirm a statement, often sarcastically today.', category: 'exclamation' },
  { modern: 'indeed', shakespearean: 'indeed', meaning: 'Unchanged — used for emphasis or agreement.', category: 'exclamation' },
  { modern: 'darn', shakespearean: 'egad', meaning: 'A mild oath (from "oh, God") expressing surprise.', category: 'exclamation' },
  { modern: 'goodness', shakespearean: 'gadzooks', meaning: 'A minced oath (from "God\u2019s hooks") expressing shock.', category: 'exclamation' },
  { modern: 'alas', shakespearean: 'alas', meaning: 'Unchanged — an exclamation of grief or pity.', category: 'exclamation' },
  { modern: 'my goodness', shakespearean: "od's bodkins", meaning: 'A mild oath (from "God\u2019s little body") expressing surprise.', category: 'exclamation' },

  // ─── Insult vocabulary (mirrors the Shakespeare Insult Generator libraries) ───
  { modern: 'stupid', shakespearean: 'beef-witted', meaning: 'Means "having the wit of a cow" — extremely dull-minded.', category: 'insult-adjective' },
  { modern: 'rude', shakespearean: 'churlish', meaning: 'Means "rude" or "ill-mannered," like a boorish peasant.', category: 'insult-adjective' },
  { modern: 'sneaky', shakespearean: 'currish', meaning: 'Means "behaving like a mean, snapping dog."', category: 'insult-adjective' },
  { modern: 'boring', shakespearean: 'droning', meaning: 'Means "speaking in a dull, monotonous tone."', category: 'insult-adjective' },
  { modern: 'unpredictable', shakespearean: 'errant', meaning: 'Means "wandering" or "straying from what\u2019s expected" — used to mean thoroughly, e.g. "an errant fool."', category: 'insult-adjective' },
  { modern: 'sycophantic', shakespearean: 'fawning', meaning: 'Means "excessively flattering to win favor."', category: 'insult-adjective' },
  { modern: 'clumsy', shakespearean: 'fobbing', meaning: 'Means "cheating" or "deceiving through trickery."', category: 'insult-adjective' },
  { modern: 'shallow', shakespearean: 'frothy', meaning: 'Means "empty and insubstantial," like foam.', category: 'insult-adjective' },
  { modern: 'lecherous', shakespearean: 'goatish', meaning: 'Means "lustful," comparing someone to a goat.', category: 'insult-adjective' },
  { modern: 'fat', shakespearean: 'gorbellied', meaning: 'Means "having a large, protruding belly."', category: 'insult-adjective' },
  { modern: 'dim-witted', shakespearean: 'loggerheaded', meaning: 'Means "having a block of wood for a head" — very stupid.', category: 'insult-adjective' },
  { modern: 'clumsy', shakespearean: 'lumpish', meaning: 'Means "heavy, dull, and sluggish."', category: 'insult-adjective' },
  { modern: 'hesitant', shakespearean: 'mammering', meaning: 'Means "stammering" or "hesitating indecisively."', category: 'insult-adjective' },
  { modern: 'flabby', shakespearean: 'paunchy', meaning: 'Means "having a protruding stomach."', category: 'insult-adjective' },
  { modern: 'whiny', shakespearean: 'pribbling', meaning: 'Means "talking nonsense" or "prattling pointlessly."', category: 'insult-adjective' },
  { modern: 'foul', shakespearean: 'rank', meaning: 'Means "having a strong, unpleasant smell" or being generally offensive.', category: 'insult-adjective' },
  { modern: 'smelly', shakespearean: 'reeky', meaning: 'Means "smelling bad" — from "reek."', category: 'insult-adjective' },
  { modern: 'dishonest', shakespearean: 'roguish', meaning: 'Means "behaving like a scoundrel."', category: 'insult-adjective' },
  { modern: 'sassy', shakespearean: 'saucy', meaning: 'Means "impertinent" or "cheekily bold."', category: 'insult-adjective' },
  { modern: 'shaky', shakespearean: 'tottering', meaning: 'Means "unsteady," about to fall over.', category: 'insult-adjective' },
  { modern: 'evil', shakespearean: 'villainous', meaning: 'Means "wicked" or "morally corrupt."', category: 'insult-adjective' },
  { modern: 'contrary', shakespearean: 'wayward', meaning: 'Means "stubbornly disobedient" or "unpredictable."', category: 'insult-adjective' },
  { modern: 'scrawny', shakespearean: 'weedy', meaning: 'Means "thin and weak," like a spindly weed.', category: 'insult-adjective' },
  { modern: 'brainless', shakespearean: 'witless', meaning: 'Means "lacking intelligence or wit."', category: 'insult-adjective' },
  { modern: 'greedy', shakespearean: 'miserly', meaning: 'Means "stingy" or "hoarding wealth."', category: 'insult-adjective' },
  { modern: 'loud', shakespearean: 'clamorous', meaning: 'Means "making a loud, confused noise."', category: 'insult-adjective' },
  { modern: 'cheating', shakespearean: 'cozening', meaning: 'Means "swindling" or "deceiving for gain."', category: 'insult-adjective' },
  { modern: 'crafty', shakespearean: 'crafty', meaning: 'Unchanged — means "cunning" or "deceptively clever."', category: 'insult-adjective' },
  { modern: 'weak', shakespearean: 'feeble', meaning: 'Means "lacking strength" — physically or in character.', category: 'insult-adjective' },
  { modern: 'disgusting', shakespearean: 'foul', meaning: 'Means "offensive" or "repulsive."', category: 'insult-adjective' },
  { modern: 'wicked', shakespearean: 'nefarious', meaning: 'Means "extremely wicked or villainous."', category: 'insult-adjective' },
  { modern: 'complaining', shakespearean: 'querulous', meaning: 'Means "habitually complaining in a whiny way."', category: 'insult-adjective' },
  { modern: 'traitorous', shakespearean: 'treacherous', meaning: 'Means "guilty of betrayal."', category: 'insult-adjective' },
  { modern: 'worthless', shakespearean: 'unworthy', meaning: 'Means "not deserving of respect."', category: 'insult-adjective' },
  { modern: 'pompous', shakespearean: 'pompous', meaning: 'Unchanged — means "self-important" or "arrogant."', category: 'insult-adjective' },

  // Insult nouns
  { modern: 'crook', shakespearean: 'knave', meaning: 'A dishonest, deceitful man — one of Shakespeare\u2019s go-to insults.', category: 'insult-noun' },
  { modern: 'villain', shakespearean: 'miscreant', meaning: 'A person who behaves wickedly or criminally.', category: 'insult-noun' },
  { modern: 'scoundrel', shakespearean: 'varlet', meaning: 'A dishonorable, unprincipled person.', category: 'insult-noun' },
  { modern: 'rat', shakespearean: 'rascal', meaning: 'A mischievous or dishonest person.', category: 'insult-noun' },
  { modern: 'thug', shakespearean: 'ruffian', meaning: 'A violent, lawless person.', category: 'insult-noun' },
  { modern: 'thief', shakespearean: 'cutpurse', meaning: 'Literally someone who cuts purse-strings to steal — a pickpocket.', category: 'insult-noun' },
  { modern: 'coward', shakespearean: 'craven', meaning: 'A person who lacks courage.', category: 'insult-noun' },
  { modern: 'fool', shakespearean: 'jackanapes', meaning: 'An impertinent, cheeky, foolish person (originally, a tame monkey).', category: 'insult-noun' },
  { modern: 'grump', shakespearean: 'malcontent', meaning: 'A chronically dissatisfied, complaining person.', category: 'insult-noun' },
  { modern: 'bully', shakespearean: 'bully-rook', meaning: 'A blustering, swaggering troublemaker.', category: 'insult-noun' },
  { modern: 'gossip', shakespearean: 'tattler', meaning: 'A person who spreads rumors or gossip.', category: 'insult-noun' },
  { modern: 'nobody', shakespearean: 'losel', meaning: 'A worthless, good-for-nothing person.', category: 'insult-noun' },
  { modern: 'brute', shakespearean: 'lout', meaning: 'A rough, uncultured, aggressive person.', category: 'insult-noun' },
  { modern: 'weasel', shakespearean: 'weasel', meaning: 'Unchanged — a sly, untrustworthy person.', category: 'insult-noun' },
  { modern: 'parasite', shakespearean: 'leech', meaning: 'A person who exploits or drains others.', category: 'insult-noun' },
  { modern: 'drunkard', shakespearean: 'malt-worm', meaning: 'A person who habitually drinks too much ale.', category: 'insult-noun' },
  { modern: 'blabbermouth', shakespearean: 'jabberer', meaning: 'A person who talks constantly and pointlessly.', category: 'insult-noun' },
  { modern: 'simpleton', shakespearean: 'mooncalf', meaning: 'A foolish, dim-witted person (originally a term for a deformed birth).', category: 'insult-noun' },
  { modern: 'pest', shakespearean: 'canker-blossom', meaning: 'Literally a diseased flower — a corrupting, irritating presence.', category: 'insult-noun' },
  { modern: 'freeloader', shakespearean: 'hanger-on', meaning: 'A person who attaches themselves to others for personal gain.', category: 'insult-noun' },

  // Extra vocabulary pulled directly from the Shakespeare Insult Generator's
  // own CHARACTER / PHYSICAL / NOUNS libraries, so the meanings panel on that
  // tool resolves as many generated words as possible.
  { modern: 'incompetent', shakespearean: 'beslubbering', meaning: 'Means "smearing with slobber" — used to describe someone gross and incompetent.', category: 'insult-adjective' },
  { modern: 'thick-headed', shakespearean: 'clay-brained', meaning: 'Means "having a brain made of dull, heavy clay" — very stupid.', category: 'insult-adjective' },
  { modern: 'ridiculous', shakespearean: 'onion-eyed', meaning: 'Means "prone to crying easily," as if peeling onions — overly sentimental.', category: 'insult-adjective' },
  { modern: 'lice-ridden', shakespearean: 'flea-bitten', meaning: 'Means "covered in flea bites" — filthy or pitiful.', category: 'insult-adjective' },
  { modern: 'stubborn', shakespearean: 'horn-mad', meaning: 'Means "enraged like a bull" — furiously stubborn.', category: 'insult-adjective' },
  { modern: 'slow', shakespearean: 'tardy-gaited', meaning: 'Means "slow-moving" — literally, walking late.', category: 'insult-adjective' },
  { modern: 'moldy', shakespearean: 'toad-spotted', meaning: 'Means "covered in blemishes," like the spots on a toad.', category: 'insult-adjective' },
  { modern: 'cheap', shakespearean: 'threadbare', meaning: 'Means "worn thin" — shabby and poor-quality.', category: 'insult-adjective' },
  { modern: 'irritating', shakespearean: 'tickle-brained', meaning: 'Means "easily excited or confused" — scatterbrained.', category: 'insult-adjective' },
  { modern: 'skinny', shakespearean: 'rough-hewn', meaning: 'Means "crudely shaped," as if carved without skill.', category: 'insult-adjective' },
  { modern: 'mangled', shakespearean: 'crook-pated', meaning: 'Means "having a crooked, twisted head" — mentally warped.', category: 'insult-adjective' },
  { modern: 'confused', shakespearean: 'dizzy-eyed', meaning: 'Means "having a dazed, unfocused look."', category: 'insult-adjective' },
  { modern: 'greasy', shakespearean: 'full-gorged', meaning: 'Means "stuffed full," like an overfed animal.', category: 'insult-adjective' },
  { modern: 'twitchy', shakespearean: 'guts-griping', meaning: 'Means "causing stomach cramps" — someone unpleasant to be around.', category: 'insult-adjective' },
  { modern: 'washed-up', shakespearean: 'weather-bitten', meaning: 'Means "worn down by exposure to the elements" — haggard.', category: 'insult-adjective' },
  { modern: 'diseased', shakespearean: 'worm-eaten', meaning: 'Means "riddled with worms," like rotten wood — decayed and worthless.', category: 'insult-adjective' },
  { modern: 'quarrelsome', shakespearean: 'jarring', meaning: 'Means "discordant" or "clashing" — someone who causes friction.', category: 'insult-adjective' },
  { modern: 'crooked', shakespearean: 'warped', meaning: 'Means "bent out of shape," literally or morally.', category: 'insult-adjective' },
  { modern: 'yellowish', shakespearean: 'yeasty', meaning: 'Means "frothy and insubstantial," like risen dough — all talk, no substance.', category: 'insult-adjective' },
  { modern: 'shabby', shakespearean: 'gorbellied', meaning: 'Means "big-bellied" — bloated and out of shape.', category: 'insult-adjective' },
  { modern: 'moldwarp', shakespearean: 'moldwarp', meaning: 'An old word for "mole" (the animal) — used as an insult for a blind, grubbing person.', category: 'insult-noun' },
  { modern: 'pig', shakespearean: 'hedge-pig', meaning: 'An old term for a hedgehog — used as a mild insult for someone prickly or unpleasant.', category: 'insult-noun' },
  { modern: 'buzzard', shakespearean: 'puttock', meaning: 'An old name for a kite or buzzard — a scavenging bird, used to insult a greedy person.', category: 'insult-noun' },
  { modern: 'trickster', shakespearean: 'skainsmate', meaning: 'A disreputable companion, often one involved in petty crime.', category: 'insult-noun' },
  { modern: 'harpy', shakespearean: 'harpy', meaning: 'A mythical vicious, predatory creature — used to describe a nagging, cruel person.', category: 'insult-noun' },
  { modern: 'clown', shakespearean: 'wag-tail', meaning: 'A flirtatious or flighty person, often used dismissively.', category: 'insult-noun' },
  { modern: 'lowlife', shakespearean: 'flap-dragon', meaning: 'Originally a game involving snatching raisins from burning brandy — used to mean someone reckless and worthless.', category: 'insult-noun' },
  { modern: 'brat', shakespearean: 'giglet', meaning: 'A giddy, silly, or promiscuous young person.', category: 'insult-noun' },
  { modern: 'oddball', shakespearean: 'joithead', meaning: 'A dialectal insult meaning a foolish, clumsy person.', category: 'insult-noun' },
  { modern: 'nitwit', shakespearean: 'nut-hook', meaning: 'Literally a pole used to hook down nuts — used to insult a petty thief or lowlife.', category: 'insult-noun' },
  { modern: 'clod', shakespearean: 'clotpole', meaning: 'Means "blockhead" — literally a lump-shaped head.', category: 'insult-noun' },
  { modern: 'oaf', shakespearean: 'lobcock', meaning: 'A clumsy, dull-witted lout.', category: 'insult-noun' },
  { modern: 'lackey', shakespearean: 'foot-licker', meaning: 'A servile flatterer — someone who grovels for favor.', category: 'insult-noun' },
  { modern: 'blockhead', shakespearean: 'addlepate', meaning: 'A muddled, confused thinker.', category: 'insult-noun' },
  { modern: 'creep', shakespearean: 'mudlark', meaning: 'Someone who scavenges in filth — used to describe a lowlife.', category: 'insult-noun' },
]

export const ALL_SHAKESPEARE_ENTRIES: ShakespeareWord[] = [...SHAKESPEARE_PHRASES, ...SHAKESPEARE_WORDS]

export function getAllCategories(): WordCategory[] {
  return [
    'pronoun', 'grammar', 'greeting', 'common-word', 'verb', 'adjective', 'noun',
    'exclamation', 'insult-adjective', 'insult-noun', 'phrase',
  ]
}

export const CATEGORY_LABELS: Record<WordCategory, string> = {
  pronoun: 'Pronouns',
  grammar: 'Grammar & Verb Forms',
  greeting: 'Greetings',
  'common-word': 'Common Words',
  verb: 'Verbs',
  adjective: 'Adjectives',
  noun: 'Nouns',
  exclamation: 'Exclamations',
  'insult-adjective': 'Insult Descriptors',
  'insult-noun': 'Insult Nouns',
  phrase: 'Phrases',
}
