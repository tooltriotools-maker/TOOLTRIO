import { CalculatorBatch49DeepDive } from '@/components/ui/CalculatorBatch49DeepDive'
import type { Metadata } from 'next'
import { generateFunToolMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import { generateFunToolStructuredDataFromSlug } from '@/lib/seo/structured-data'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  
  loading: () => (
    <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
  )
})

export const metadata: Metadata = generateFunToolMetadata({
  title: 'Fantasy Name Generator | ToolTrio',
  description: 'Generate unique fantasy names for elves, dwarves, wizards, dragons, orcs, and more. Perfect for D&D, RPGs, novels, and gaming characters. Free, instant.',
  slug: 'fantasy-name-generator',
  keywords: [
    'fantasy name generator',
    'elf name generator',
    'dwarf name generator',
    'wizard name generator',
    'dragon name generator',
    'DnD character name generator',
    'D&D name generator free',
    'RPG character name generator',
    'tooltrio.com',
  ],
})

const faqs = [
  {
    question: 'Which fantasy races does the name generator support?',
    answer: 'The generator covers elves (high elf, wood elf, dark elf), dwarves, wizards, dragons, orcs, halflings, tieflings, dragonborn, and half-elves — covering the most common D&D and RPG races. Each race has its own phonetic ruleset so elf names feel melodic and flowing while dwarf names are short and guttural, as they should be.'
  },
  {
    question: 'Is this good for Dungeons & Dragons character creation?',
    answer: 'That is the most common use case. The generator follows naming conventions from D&D lore closely enough that the results feel authentic to the setting. Players use it during session zero when they need a name fast or want inspiration. Dungeon Masters use it for NPCs on the fly — nothing breaks immersion like naming a mysterious elf merchant "Steve."'
  },
  {
    question: 'Can I use these names for a novel or game I am writing?',
    answer: 'Yes — the names are algorithmically generated and not trademarked. Use them freely in any creative project, commercial or personal. Many indie game developers, fantasy authors, and worldbuilders use generators like this as a starting point and then tweak phonemes to make the name feel more uniquely theirs.'
  },
  {
    question: 'How are the names generated — are they random or rule-based?',
    answer: 'Rule-based with randomness inside those rules. Each race has a set of valid syllable patterns, common prefixes, roots, and suffixes drawn from real naming conventions in fantasy literature and games. The randomness operates within those constraints, which is why results feel authentic rather than like random letter strings.'
  },
  {
    question: 'Can I generate names for a specific gender?',
    answer: 'Yes — the generator lets you filter by masculine, feminine, or neutral/ambiguous names. Fantasy naming conventions differ by race: elven female names often end in softer sounds while male names tend toward longer constructions. The tool respects these patterns when you apply a gender filter.'
  },
  {
    question: 'What if I need a name for an entirely made-up race?',
    answer: 'Try mixing. Generate a dragon name, an elvish name, and blend the phonetics. Or use the "custom" mode to set syllable preferences yourself. Some of the best fictional names come from combining two naming systems that logically would not go together — the result sounds alien and invented in exactly the right way.'
  },
  {
    question: 'Do generated names come with meanings or lore?',
    answer: 'Many do — the generator includes optional meaning tags where relevant (for example, a generated elven name might note it means "silver wind" in the elvish phonetic tradition). These are creative interpretations, not linguistic translations, but they add depth when you are building a character backstory.'
  },
]

export default function Page() {
  const _structuredData = generateFunToolStructuredDataFromSlug('fantasy-name-generator')
  const _faqSchema = generateFAQStructuredData(faqs)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_faqSchema) }} />
      <CalculatorClient faqs={faqs} />
    </>
  )
}
