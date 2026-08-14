import { CalculatorBatch47DeepDive } from '@/components/ui/CalculatorBatch47DeepDive'
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
  title: 'Villain Name Generator | ToolTrio',
  description: 'Generate your supervillain name, evil powers, sinister origin story, and secret weakness. Dark, dramatic, and delightfully fun. Free villain name.',
  slug: 'villain-name',
  keywords: [
    'villain name generator',
    'supervillain name generator',
    'evil name generator free',
    'what is my villain name',
    'villain name creator online',
    'supervillain identity generator',
    'villain origin story generator',
    'my villain name quiz',
    'tooltrio.com',
  ],
})

const faqs = [
  {
    question: 'How is my villain name generated?',
    answer: 'The generator analyzes the phonetics of your real name and maps the sounds to villain naming conventions — hard stops and sibilants tend toward names like "Vex Mordain" or "Kira Shadowcrest," while longer melodic names lean toward something like "Seraphine the Undying." Personality inputs (your stated motivations, preferred weapon, and chosen domain of evil) shape whether you get a tech-villain, a supernatural one, a political schemer, or a chaos-for-its-own-sake type.'
  },
  {
    question: 'Does the generator include an origin story?',
    answer: 'Yes — every villain needs a compelling origin, and the generator provides one. The backstory format follows the classic villain arc: a formative injustice, the moment of transformation, the acquisition of power, and the defining philosophy. Results range from tragic to darkly comic depending on your inputs. You can regenerate the story while keeping your name, or regenerate everything for a completely different villain persona.'
  },
  {
    question: 'Does my villain have a weakness?',
    answer: 'Every villain does — the best ones have a specific, character-revealing vulnerability that ties back to their origin. The generator assigns a secret weakness that is thematically connected to your backstory. This is useful for writers who want narrative coherence, and entertaining for everyone else because the weakness is often humorously unexpected.'
  },
  {
    question: 'Can I pair my villain result with the superhero name generator?',
    answer: 'That is the intended experience for a lot of users — generate your superhero identity, then generate your villain alter ego, and compare. Siblings and friends often do this together to set up an ongoing dynamic. The two generators are designed so the names feel like they exist in the same stylistic universe, which makes the contrast satisfying.'
  },
  {
    question: 'Is this good for Dungeons & Dragons or tabletop RPGs?',
    answer: 'Very good for it — specifically for Dungeon Masters who need to name antagonists on short notice. The origin story generator gives you a quick NPC backstory skeleton that you can expand during prep. The villain type categories (political manipulator, elemental force, corrupted hero, eldritch horror, criminal mastermind) map well to common D&D antagonist archetypes.'
  },
  {
    question: 'Can I use this for Halloween costume ideas?',
    answer: 'Yes — one of the more popular seasonal uses. Generating a villain identity and building a costume around it is more interesting than a generic vampire or witch. "I am Vexara the Hollow, who drains ambition from the overachieving — I wore black and carried a briefcase covered in hourglasses" is a costume people remember.'
  },
  {
    question: 'Is the content dark or scary?',
    answer: 'Dramatically dark, not genuinely disturbing. The tone is theatrical — the same register as a Saturday morning cartoon villain or a Bond antagonist. There is menace and grandiosity but no graphic violence or genuinely upsetting content. It is appropriate for teenagers and adults who enjoy a bit of dramatic villainy. Young children might find some results slightly intense depending on the personality inputs.'
  },
]

export default function Page() {
  const _structuredData = generateFunToolStructuredDataFromSlug('villain-name')
  const _faqSchema = generateFAQStructuredData(faqs)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_faqSchema) }} />
      <CalculatorClient faqs={faqs} />
    </>
  )
}
