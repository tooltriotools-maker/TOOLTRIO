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
  title: 'Morse Code Translator Online | ToolTrio',
  description: 'Convert any text to Morse code instantly and decode Morse code back to text. Hear your Morse code played back with audio. Free online Morse code.',
  slug: 'text-to-morse',
  keywords: [
    'morse code translator',
    'text to morse code converter',
    'morse code to text converter',
    'online morse code translator free',
    'morse code encoder decoder',
    'learn morse code online',
    'morse code chart online',
    'morse code generator',
    'tooltrio.com',
  ],
})

const faqs = [
  {
    question: 'Can I hear my message played back as actual Morse code sounds?',
    answer: 'Yes — the translator includes an audio playback feature that generates the actual dit-dah sound patterns for your message. You can adjust the speed (words per minute) from beginner-friendly slow to standard transmission speed. This makes it genuinely useful for learning Morse code, not just for text conversion curiosity.'
  },
  {
    question: 'What is the difference between dots and dashes in Morse code?',
    answer: 'A dot (dit) is a short signal and a dash (dah) is a long signal — exactly three times the length of a dot. Gaps between letters are three dot lengths. Gaps between words are seven dot lengths. These ratios are standardized internationally so Morse code transmissions can be understood globally. The translator shows you the exact dot-dash pattern for every character in your message.'
  },
  {
    question: 'Does the translator include numbers and punctuation?',
    answer: 'Yes — the full International Morse Code standard is implemented, including all 26 letters, digits 0–9, and common punctuation marks (period, comma, question mark, apostrophe, forward slash, dash, parentheses, colon). The on-screen reference chart is always visible for learning, and each character lights up as it is translated or played back.'
  },
  {
    question: 'What does SOS look like in Morse code?',
    answer: '· · · — — — · · · (three dots, three dashes, three dots). SOS was chosen as the international distress signal in 1905 specifically because it is memorable, distinctive, and easily recognizable even in noisy or weak signal conditions. It does not stand for "Save Our Souls" or "Save Our Ship" — those are backronyms invented after the fact. The translator will show you SOS immediately if you type it in.'
  },
  {
    question: 'Who invented Morse code and when?',
    answer: 'Samuel Morse and Alfred Vail developed the first version in the 1830s for use with the electric telegraph. The original American Morse code differed from the International Morse Code standardized later in 1865. This translator uses International Morse Code, which is the global standard today and differs slightly from the original in a few characters.'
  },
  {
    question: 'Can I use this to actually learn to read Morse code by ear?',
    answer: 'It is a solid starting point. The audio playback at adjustable speeds lets you practice listening. Many people learn the most common letters first (E, T, A, I, N, and S represent the majority of most English text), then build from there. For serious learning, using the audio at slow speed repeatedly on short words is more effective than trying to memorize the whole chart at once.'
  },
  {
    question: 'Is Morse code still used today?',
    answer: 'More than most people expect. Licensed amateur radio operators (hams) still use Morse code globally. Maritime law required officers to know Morse until 1999. Some military units retain it. Pilots learn the three-letter Morse identifiers for navigational beacons. And it is genuinely useful in emergency scenarios when voice communication fails but a tapping, blinking, or beeping signal is possible.'
  },
]

export default function Page() {
  const _structuredData = generateFunToolStructuredDataFromSlug('text-to-morse')
  const _faqSchema = generateFAQStructuredData(faqs)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_faqSchema) }} />
      <CalculatorClient faqs={faqs} />
    </>
  )
}
