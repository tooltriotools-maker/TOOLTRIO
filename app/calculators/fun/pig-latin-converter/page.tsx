import type { Metadata } from 'next'
import { generateFunToolMetadata } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateFunToolMetadata({
  title: 'Pig Latin Translator – Convert Any Text to Pig Latin Online',
  description: 'Instantly translate English text into Pig Latin. Works with sentences, paragraphs, names, or entire messages. Free online Pig Latin converter, no login required.',
  slug: 'pig-latin-converter',
  keywords: [
    'pig latin translator',
    'pig latin converter online free',
    'english to pig latin',
    'translate to pig latin',
    'pig latin generator',
    'pig latin text converter',
    'how to speak pig latin',
    'pig latin rules converter',
    'pig latin name converter',
    'pig latin sentence translator',
    'online pig latin tool',
    'pig latin decoder',
    'pig latin to english translator',
    'pig latin for kids',
    'learn pig latin online',
    'pig latin converter no signup',
    'pig latin translator 2026',
    'what is pig latin',
    'pig latin examples online',
    'pig latin game online',
    'paragraph to pig latin converter',
    'pig latin name generator',
    'pig latin chat converter',
    'secret language converter online',
    'silly language converter free',
    'tooltrio.com',
    'free calculator no signup',
    'fun calculator online free'
  ],
})

const faqs = [
  {
    question: 'What are the actual rules of Pig Latin?',
    answer: 'The classic rules: (1) If a word begins with a consonant or consonant cluster, move those consonants to the end and add "ay." So "string" becomes "ingstray." (2) If a word begins with a vowel, simply add "way" or "yay" to the end. So "apple" becomes "appleway." (3) Capitalization and punctuation are preserved so sentences remain readable. The converter handles all edge cases including consonant clusters, "qu" clusters, and hyphenated words.'
  },
  {
    question: 'Can this translate entire paragraphs, not just words?',
    answer: 'Yes — paste in anything from a single word to several paragraphs. The converter processes each word individually while preserving spacing, punctuation, and sentence structure. You can translate an entire email, a speech, or a secret message for a friend. The longer the text, the more entertainingly unreadable the result.'
  },
  {
    question: 'Is there a way to translate from Pig Latin back to English?',
    answer: 'Yes — the converter works in both directions. The reverse translation is slightly trickier since some Pig Latin forms are ambiguous, but for standard conversions it works reliably. Useful if someone sends you something in Pig Latin and you do not want to puzzle it out manually.'
  },
  {
    question: 'What is the history of Pig Latin?',
    answer: 'Pig Latin is an American English language game that dates back to at least the early 1900s. It was widely used by children as a playground "secret language" through the 20th century. References appear in Mark Twain\'s writing, and it was popular enough that Upton Sinclair used "Igpay Atinlay" as a reference in his journalism. It is not related to Latin in any linguistic sense — the name is just part of the playfulness.'
  },
  {
    question: 'Can I use this to teach kids phonics?',
    answer: 'Actually yes — Pig Latin is legitimately useful for early literacy because it requires children to identify the initial consonant sounds in words (phonemes) before they can apply the transformation rules. Many elementary school teachers use Pig Latin games as a phonological awareness exercise. The converter can generate examples quickly for classroom use.'
  },
  {
    question: 'Does it handle names and proper nouns correctly?',
    answer: 'Yes — proper nouns are capitalized as expected in the output. "Harry Potter" becomes "Arryhay Otterpay" with the capital letters preserved. This is one of the details most quick translators get wrong, particularly for names that start with vowels or unusual consonant clusters.'
  },
  {
    question: 'Is this free and ad-free?',
    answer: 'Free, no account needed, and no ads on the converter tool itself. Translate as much as you want. Your input text is not stored or transmitted anywhere — it processes locally in your browser.'
  },
  {
    question: 'Why do different Pig Latin translators give different results for the same word?',
    answer: 'There are a few regional variations in the rules. The treatment of "qu" clusters (does "queen" become "queenway" or "eenquay"?), words starting with "y" (vowel or consonant?), and the choice of "ay" vs "way" vs "yay" for vowel-initial words all vary by tradition. Our converter follows the most widely taught American English rules, which align with most dictionaries and educational resources.'
  },
]

export default function Page() { return <CalculatorClient faqs={faqs} /> }
