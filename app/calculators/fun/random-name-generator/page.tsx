import type { Metadata } from 'next'
import { generateFunToolMetadata } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateFunToolMetadata({
  title: 'Random Name Generator – Baby Names, Usernames & Nicknames',
  description: 'Generate random names for babies, characters, usernames, pets, or businesses. Filter by origin, gender, style, and popularity. Free random name generator online.',
  slug: 'random-name-generator',
  keywords: [
    'random name generator',
    'baby name generator free',
    'random first name generator',
    'random last name generator',
    'random full name generator',
    'username generator',
    'nickname generator online free',
    'character name generator',
    'business name generator',
    'pet name generator',
    'random name picker',
    'random name generator by origin',
    'random American name generator',
    'random English name generator',
    'random Spanish name generator',
    'random Japanese name generator',
    'random name generator no signup',
    'best random name generator 2026',
    'random name generator for writing',
    'fake name generator',
    'random name for social media',
    'username ideas generator',
    'random name generator for games',
    'unique name generator online',
    'unusual name generator',
    'tooltrio.com',
    'free calculator no signup',
    'fun calculator online free'
  ],
})

const faqs = [
  {
    question: 'What can I use the random name generator for?',
    answer: 'The most common uses: naming fictional characters in novels, games, or screenplays; generating placeholder names for mockups and UI design; finding username ideas for social media or gaming; brainstorming baby names; naming pets, businesses, or projects; and populating test databases with realistic-looking names. It is more versatile than it looks at first glance.'
  },
  {
    question: 'Can I filter names by cultural origin or nationality?',
    answer: 'Yes — the generator has filters for dozens of origins including English/American, Spanish, French, Italian, German, Japanese, Korean, Arabic, Scandinavian, Irish, Indian, and more. Each origin set draws from actual naming conventions and frequencies in those cultures, so the results feel authentic rather than like stereotypes.'
  },
  {
    question: 'Does it generate realistic full names (first + last)?',
    answer: 'Yes — the generator matches first and last names by cultural origin by default, so you get coherent combinations rather than mismatched pairings like "Zhang O\'Brien." You can also mix origins deliberately if you want names for characters from multicultural backgrounds, which is a common need for fiction writers.'
  },
  {
    question: 'Can I generate random usernames?',
    answer: 'Yes — the username mode generates combinations of words, numbers, and style options (underscore separators, camelCase, all lowercase) suitable for social media, gaming, or online profiles. You can set character length limits and choose whether to include numbers. The results avoid the most overused username patterns to give you something more distinctive.'
  },
  {
    question: 'How are baby names selected — are they trendy, classic, or unusual?',
    answer: 'The generator offers a style filter: trending (top 100 names from the past 5 years), classic (names with sustained popularity over decades), vintage (popular 50–100 years ago, now cycling back), and unusual (beautiful but rare names outside the top 1000). Classic and vintage tend to be the most popular filters for parents who want something recognizable but not ubiquitous.'
  },
  {
    question: 'Can I generate a large batch of names at once?',
    answer: 'Yes — you can generate up to 50 names in a single batch. This is especially useful for writers who need to name an entire cast of characters, UX designers who need to populate realistic test user data, or anyone running a naming brainstorm. Copy the full list with one click.'
  },
  {
    question: 'Does the generator show name meanings?',
    answer: 'Yes — clicking any name expands its origin, meaning, historical usage, and notable people who share the name. Useful for parents and writers who want the name to carry a particular meaning, and fascinating to browse even without a specific purpose. The meaning of your own name is worth looking up.'
  },
  {
    question: 'Is this free without an account?',
    answer: 'Completely free, no account needed, no limit on generations. No data is stored. Generate as many names as you need for any purpose.'
  },
]

export default function Page() { return <CalculatorClient faqs={faqs} /> }
