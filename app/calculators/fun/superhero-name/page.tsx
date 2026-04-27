import type { Metadata } from 'next'
import { generateFunToolMetadata } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateFunToolMetadata({
  title: 'Superhero Name Generator – Your Superhero Identity & Powers',
  description: 'Discover your superhero name, powers, backstory, and nemesis based on your name and personality. Free online superhero name generator — instant results, no signup.',
  slug: 'superhero-name',
  keywords: [
    'superhero name generator',
    'what is my superhero name',
    'superhero name generator free online',
    'random superhero name generator',
    'superhero name and power generator',
    'superhero identity generator',
    'superhero name by personality',
    'superhero name creator',
    'superhero name from real name',
    'cool superhero name generator',
    'superhero origin story generator',
    'what superpower would I have quiz',
    'superhero name for kids',
    'superhero name for kids party',
    'superhero costume name generator',
    'comic book hero name generator',
    'Marvel style name generator',
    'DC style superhero name generator',
    'superhero name generator 2026',
    'superhero name no signup',
    'custom superhero identity generator',
    'superhero name share social media',
    'superhero alter ego generator',
    'superhero name viral tool',
    'best superhero name generator',
    'tooltrio.com',
    'free calculator no signup',
    'fun calculator online free'
  ],
})

const faqs = [
  {
    question: 'How does the superhero name generator come up with my name?',
    answer: 'The generator analyzes the phonetic structure of your real name, then runs it through a pattern system that maps sounds to superhero name conventions — hard consonants tend toward names like "Ironclad" and "Vortex," while softer phonetics produce names like "Aurora" or "Phantom." It also factors in a few short personality questions to influence whether you get a technology-based hero, a magic-based one, a nature-based one, or a cosmic-powered identity.'
  },
  {
    question: 'Does the generator include a superpower and backstory?',
    answer: 'Yes — each result includes your superhero name, primary superpower, a secondary ability, a brief origin story paragraph, your hero alias\'s defining personality trait, and a nemesis name. The backstory is algorithmically generated and intentionally dramatic. You can regenerate the story while keeping your name, or regenerate everything for a completely fresh identity.'
  },
  {
    question: 'Can I use my superhero name and story for a creative project?',
    answer: 'Absolutely — everything generated is yours to use. Writers use it for character inspiration when they are stuck. Kids use it for superhero costumes and birthday party themes. Game players use it for character builds in RPGs and MMOs. If the generated name is close but not perfect, treat it as a jumping-off point and tweak from there.'
  },
  {
    question: 'Why do two people with similar names get different superhero identities?',
    answer: 'The personality questions create branching paths — even identical names will diverge if the personality inputs differ. And within each path there is randomness in the ability and backstory selection. This means siblings with different personalities get genuinely different heroes, which is actually more interesting from a storytelling perspective.'
  },
  {
    question: 'Is this appropriate for children\'s birthday parties?',
    answer: 'It is one of the most popular uses. Parents run each kid\'s name through the generator, print the result on a card, and hand them out as personalised party favors. The generator is entirely family-friendly with no dark or violent content. Superhero birthday party themes practically run themselves when every kid has a custom identity with a name and power.'
  },
  {
    question: 'Can I generate a villain name for my nemesis?',
    answer: 'The superhero result includes an auto-generated nemesis with a villain name, but for a full villain identity, there is a dedicated villain name generator on the site that goes deeper. Pairing your superhero result with your villain result from that tool makes for a fun complete narrative.'
  },
  {
    question: 'How many possible superhero identities can it generate?',
    answer: 'The combination space across names, powers, backstory elements, and personality branches produces thousands of distinct outcomes. It is rare to get the same result twice unless two people have the same name and answer all personality questions identically. Most users generate 3–5 versions before settling on the one that feels right.'
  },
  {
    question: 'Is this free?',
    answer: 'Completely free, no account needed. Generate as many superhero identities as you want. Your data is never stored. Even superheroes deserve privacy.'
  },
]

export default function Page() { return <CalculatorClient faqs={faqs} /> }
