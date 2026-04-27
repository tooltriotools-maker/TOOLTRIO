import type { Metadata } from 'next'
import { generateFunToolMetadata } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateFunToolMetadata({
  title: 'UWU Text Generator – Make Your Text Cute & Kawaii Online',
  description: 'Convert any text into adorable UWU speak with kawaii faces, cute substitutions, and anime-style speech patterns. Free UWU text generator, instant results, no login.',
  slug: 'uwu-text-generator',
  keywords: [
    'uwu text generator',
    'uwu speak converter',
    'text to uwu translator',
    'uwu text converter free',
    'kawaii text generator',
    'cute text generator online',
    'uwu text maker',
    'how to write in uwu',
    'uwu language converter',
    'owo text generator',
    'anime speech converter',
    'uwu generator no signup',
    'uwu text copy paste',
    'uwu translator online free',
    'uwu speak generator 2026',
    'uwu text for discord',
    'uwu text for Twitter',
    'uwu text for captions',
    'what is uwu speak',
    'uwu converter meme',
    'cute speech pattern generator',
    'uwu text generator viral',
    'text to kawaii converter',
    'uwuify text online',
    'uwu text generator share',
    'tooltrio.com',
    'free calculator no signup',
    'fun calculator online free'
  ],
})

const faqs = [
  {
    question: 'What is UWU speak and where did it come from?',
    answer: 'UWU (sometimes written OwO or uwu) is an internet speech style that emerged from anime fandom communities in the early 2010s, particularly on platforms like Tumblr, DeviantArt, and later Twitter and Discord. The "uwu" emoticon itself represents a cute, happy face. The speech pattern replaces certain letters and sounds to create a babyish, soft quality — "r" and "l" become "w," words get elongated with extra vowels, and kaomoji faces (^-^, :3, :P) appear throughout. It is simultaneously earnest, ironic, and deeply silly.'
  },
  {
    question: 'What text substitutions does the UWU converter make?',
    answer: 'The classic transformations: "r" and "l" become "w" (so "really" becomes "weawwy"), "th" becomes "d" ("the" becomes "de"), words ending in "-tion" become "-shun," random stammers are inserted ("h-hewwo"), exclamation marks get doubled or tripled, and kawaii emoticons (^-^, OwO, UwU, :3, >w<) are sprinkled throughout. Intensity can be adjusted from light UWU to full unhinged kawaii mode.'
  },
  {
    question: 'Is there a way to control how intense the UWU effect is?',
    answer: 'Yes — the generator has an intensity slider from 1 (subtle cute-ification, barely noticeable) to 5 (maximum chaos, full anime protagonist mode). Most people prefer 2–3 for something that is recognizably UWU without being completely unreadable. Setting it to 5 and converting a business email is a fun way to waste 30 seconds of your afternoon.'
  },
  {
    question: 'Can I convert this back from UWU to normal text?',
    answer: 'The reverse conversion is approximate — because UWU substitutions are many-to-one (multiple normal words can produce the same UWU output), perfect reconstruction is not always possible. However, the decoder does a reasonable job on standard UWU text and is useful for figuring out what an extremely uwu-fied message is actually saying.'
  },
  {
    question: 'What platforms is UWU text best suited for?',
    answer: 'Discord is the heartland — UWU speak is deeply embedded in server culture, particularly gaming and anime communities. Twitter and TikTok use it as an ironic register for expressing embarrassment or affection. Instagram captions using it tend to perform well in Gen Z-oriented content. It is also popular in group chats where a certain absurdist humor is established. Converting a serious statement into UWU for comedic effect is an evergreen joke format.'
  },
  {
    question: 'Does it add kawaii faces and anime-style stuttering?',
    answer: 'Yes — both are included and can be toggled independently. The face insertion adds kaomoji at random intervals. The stutter effect adds light repetition on initial consonants ("h-hewwo," "I d-don\'t know") which mimics anime speech patterns from characters expressing nervousness or cuteness. Both effects together at medium intensity produce the most recognizable UWU output.'
  },
  {
    question: 'Is this appropriate for kids?',
    answer: 'Yes — UWU speak is entirely innocent in origin and content. The generator produces no profanity or inappropriate content. Kids find it hilarious to run their name or a sentence through the converter and read the result. It is also a surprisingly good vehicle for explaining to older relatives why the internet is the way it is.'
  },
  {
    question: 'Is this free?',
    answer: 'Fwee and no account needed! (Yes, even the FAQ is slightly uwu. We could not resist.)'
  },
]

export default function Page() { return <CalculatorClient faqs={faqs} /> }
