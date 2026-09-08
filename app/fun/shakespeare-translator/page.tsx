import type { Metadata } from 'next'
import {
  generateFunToolMetadata,
  generateFAQStructuredData,
} from '@/lib/seo/metadata'
import { generateFunToolStructuredDataFromSlug } from '@/lib/seo/structured-data'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  loading: () => (
    <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
  ),
})

/*
|--------------------------------------------------------------------------
| Shakespeare Translator SEO Metadata
|--------------------------------------------------------------------------
*/

export const metadata: Metadata = {
  ...generateFunToolMetadata({
 title:
  'Shakespeare Translator — Free Modern English to Shakespearean English | ToolTrio',

description:
  'Free Shakespeare translator and Shakespearean translator. Convert modern English to Shakespearean English, translate Shakespeare to modern English, explore Elizabethan English words, meanings, examples and a full Shakespeare glossary online.',
    slug: 'shakespeare-translator',

 keywords: [
  // PRIMARY HIGH-VOLUME KEYWORDS
  'shakespeare translator',
  'shakespearean translator',
  'shakespearean to English translator',
  'modern english to shakespeare translator',
  'shakespeare translator to English',
  'Shakespeare translator to English',
  'shakespearean translator to english',
  'shakespearean translator to modern english',
  'Translate Shakespeare to modern English',

  // TRANSLATOR / CONVERTER INTENT
  'shakespearean converter',
  'shakespearean English',
  'shakespearean English convertor',
  'shakespearean translator free',
  'free Shakespeare translator',
  'free Shakespearean translator',
  'free modern english to shakespearean translator online',
  'Shakespeare text translator',
  'Shakespeare language translator',
  'Shakespeare writing translator',
  'Shakespeare word translator',
 
 
  'shakespearean translator ai',
  'accurate shakespearean translator',
  'Best Shakespeare translator',
  'Best Shakespearean translator',

  // ELIZABETHAN / HISTORICAL LANGUAGE
  'elizabethan english translator',
  'translate modern english to shakespearean',
  'translate english to old shakespeare language',
  'how to translate english into shakespearean',
  'how to say modern words in shakespearean',
  'translate shakespearean text to plain english',
  'Shakespeare old English translator',

  // LONG-TAIL TRANSLATION
  'shakespeare to modern english paragraph translator',
  'shakespearean translator to modern english',
  'Shakespeare translator backwards',
  'Shakespeare translator Romeo and juliet',
  'Shakespeare translator Macbeth',

  // PHRASE / QUESTION INTENT
  'how to say happy birthday in shakespearean',
  'how to say i love you in shakespearean',
  'how to write a letter in shakespearean',
  'shakespearean wedding vow translator',
  'how to make text sound like shakespeare',
  'shakespeare word substitution list',

  // COMPETITOR / ALTERNATIVE SEARCH INTENT
  'lingojam shakespeare translator',

  // SPECIFIC WORD SEARCHES
  'You in Shakespearean English',
  'yes in Shakespearean language',
  'i am in Shakespearean language',
]
  }),

  /*
  |--------------------------------------------------------------------------
  | Canonical
  |--------------------------------------------------------------------------
  */

  alternates: {
    canonical: '/fun/shakespeare-translator',
  },

  /*
  |--------------------------------------------------------------------------
  | Robots
  |--------------------------------------------------------------------------
  */

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  /*
  |--------------------------------------------------------------------------
  | Open Graph
  |--------------------------------------------------------------------------
  */

  openGraph: {
    title:
      'Shakespeare Translator — Modern English to Shakespearean English',
    description:
      'Translate modern English into Shakespearean English or turn Shakespearean text into modern English with a free translator and searchable Shakespeare glossary.',
    type: 'website',
    url: '/fun/shakespeare-translator',
    siteName: 'ToolTrio',
  },

  /*
  |--------------------------------------------------------------------------
  | Twitter
  |--------------------------------------------------------------------------
  */

  twitter: {
    card: 'summary_large_image',
    title:
      'Shakespeare Translator — Modern English to Shakespearean English',
    description:
      'Free Shakespearean translator for modern English, Shakespearean English, Elizabethan vocabulary, word meanings and translation examples.',
  },
}

/*
|--------------------------------------------------------------------------
| FAQ
|--------------------------------------------------------------------------
*/

const faqs = [
  {
    question: 'What is a Shakespeare translator?',
    answer:
      'A Shakespeare translator converts modern English into Shakespeare-inspired language or converts Shakespearean English into a modern-English approximation. ToolTrio supports both directions and includes a searchable glossary with word meanings.',
  },

  {
    question: 'Is this a free Shakespeare translator?',
    answer:
      'Yes. ToolTrio provides a free Shakespeare translator that works in the browser. You can translate modern English to Shakespearean English, translate Shakespearean text to modern English, and search the Shakespeare glossary.',
  },

  {
    question: 'Can I use this as a Shakespearean translator?',
    answer:
      'Yes. The tool works as a Shakespearean translator in both directions. Choose Modern English to Shakespearean English to transform modern wording, or Shakespearean to Modern English to understand historical-style vocabulary.',
  },

  {
    question: 'Can I translate Shakespeare to modern English?',
    answer:
      'Yes. Select Shakespearean to Modern English and enter the text. Recognized Shakespearean vocabulary is converted into modern equivalents. For literary passages, the result should be treated as a reading aid rather than a scholarly translation.',
  },

  {
    question: 'Is this a modern English to Shakespeare translator?',
    answer:
      'Yes. Enter your modern English sentence and choose English to Shakespearean. The translator replaces recognized words and phrases with Shakespeare-inspired or Elizabethan-style equivalents.',
  },

  {
    question: 'Is Shakespearean English the same as Old English?',
    answer:
      'No. Shakespeare wrote in Early Modern English, not Old English. Old English is the much earlier language associated with works such as Beowulf. Shakespearean English is considerably closer to modern English.',
  },

  {
    question: 'How do you say "you" in Shakespearean English?',
    answer:
      'Depending on grammatical context, modern "you" may correspond to thou, thee, ye or another historical form. Thou is generally a subject form, while thee is generally an object form.',
  },

  {
    question: 'How do you say "I love you" in Shakespearean English?',
    answer:
      'A simple Shakespeare-inspired version is "I love thee." For a more poetic result, you can expand the message and use the translator and glossary to experiment with Shakespeare-inspired vocabulary.',
  },

  {
    question: 'How do you say "my" and "me" in Shakespearean English?',
    answer:
      'The words "my" and "me" can already appear in Shakespearean English. Depending on grammatical context, possessive forms such as "mine" or pronouns such as "thee" may be appropriate.',
  },

  {
    question: 'How do you say happy birthday in Shakespearean?',
    answer:
      'A Shakespeare-inspired birthday greeting could be "A joyous birthday unto thee!" You can enter a complete birthday message into the translator and refine the result using the glossary.',
  },

  {
    question: 'How do I make text sound like Shakespeare?',
    answer:
      'Start with a clear modern sentence, then introduce Shakespeare-inspired vocabulary such as thou, thee, thy, thine, art, hath, doth, wherefore, prithee, hither and anon. Rhythm and sentence structure also contribute to the style.',
  },

  {
    question: 'How do I write a letter in Shakespearean English?',
    answer:
      'Write the letter in modern English first, then translate important vocabulary and refine the result using the Shakespeare glossary. This works well for creative letters, invitations, roleplay and theatrical writing.',
  },

  {
    question: 'Can I use this as a Shakespearean wedding vow translator?',
    answer:
      'Yes. Write your wedding promises in modern English and translate them into Shakespeare-inspired wording. Always review the final version manually so that the vows remain sincere and natural.',
  },

  {
    question: 'Does the translator work for Romeo and Juliet and Macbeth?',
    answer:
      'Yes. You can use the translator as a vocabulary aid while reading Romeo and Juliet, Macbeth and other Shakespeare works. For difficult literary passages, compare the result with an annotated edition.',
  },

  {
    question: 'Is this an accurate Shakespearean translator?',
    answer:
      'It is a practical dictionary-based translator rather than a scholarly reconstruction of Shakespearean grammar, meter, metaphor and historical context. It is useful for vocabulary, creative writing, entertainment and reading assistance.',
  },
]

export default function Page() {
  const structuredData =
    generateFunToolStructuredDataFromSlug('shakespeare-translator')

  const faqSchema = generateFAQStructuredData(faqs)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <Suspense
        fallback={
          <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
        }
      >
        <CalculatorClient faqs={faqs} />
      </Suspense>
    </>
  )
}