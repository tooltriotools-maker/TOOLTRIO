import type { Metadata } from 'next'
import { generateFunToolMetadata } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateFunToolMetadata({
  title: 'Zodiac Sign Calculator – Your Sign, Traits & Compatibility',
  description: 'Find your Western and Chinese zodiac sign from your birthday. Get your personality traits, best compatibility matches, and lucky elements. Free zodiac calculator, no signup.',
  slug: 'zodiac-calculator',
  keywords: [
    'zodiac sign calculator',
    'what is my zodiac sign',
    'zodiac calculator by birthday',
    'western zodiac sign calculator',
    'Chinese zodiac calculator',
    'zodiac sign finder',
    'zodiac compatibility calculator',
    'zodiac personality traits',
    'zodiac sign dates chart',
    'what zodiac am I',
    'zodiac sign meaning',
    'zodiac sign by birth date free',
    'horoscope sign calculator',
    'sun sign calculator',
    'rising sign calculator',
    'moon sign calculator',
    'Chinese zodiac year calculator',
    'zodiac animal calculator',
    'zodiac element calculator',
    'zodiac lucky numbers',
    'aries taurus gemini cancer calculator',
    'leo virgo libra scorpio calculator',
    'sagittarius capricorn aquarius pisces calculator',
    'zodiac calculator no signup',
    'best zodiac calculator 2026',
    'zodiac sign compatibility test',
    'tooltrio.com',
    'free calculator no signup',
    'fun calculator online free'
  ],
})

const faqs = [
  {
    question: 'How are zodiac sign date ranges determined?',
    answer: 'Western zodiac signs are based on where the Sun appeared to be in the sky relative to the 12 constellations of the ecliptic on your birth date. The calendar dates (Aries: March 21–April 19, Taurus: April 20–May 20, and so on) represent when the Sun transits each constellation. The boundaries shift very slightly year to year, which is why people born on cusp dates — the 19th–22nd of any month — should enter their exact birth date rather than going by a generic chart.'
  },
  {
    question: 'What is the difference between my Sun sign, Moon sign, and Rising sign?',
    answer: 'Your Sun sign (what people mean by "your zodiac sign") is determined by your birth date and represents your core identity and conscious self. Your Moon sign is determined by where the Moon was at your birth time and represents your emotional inner life — often feeling more accurate to how you behave in private. Your Rising (Ascendant) sign depends on your exact birth time and location and represents how others perceive you at first meeting. Many people find their Moon or Rising sign more descriptive than their Sun sign.'
  },
  {
    question: 'How does the Chinese zodiac work differently?',
    answer: 'The Chinese zodiac assigns an animal to each year in a 12-year cycle rather than to calendar months. The current cycle: Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, Pig. Your Chinese zodiac animal is fixed by your birth year (with the cycle starting on Chinese New Year in late January or early February — important if you were born in January or early February). The calculator handles this edge case automatically.'
  },
  {
    question: 'Which zodiac signs are most compatible?',
    answer: 'Traditional Western astrology groups signs by element — Fire (Aries, Leo, Sagittarius), Earth (Taurus, Virgo, Capricorn), Air (Gemini, Libra, Aquarius), Water (Cancer, Scorpio, Pisces). Signs within the same element are considered naturally compatible. So-called "opposite" signs (six apart on the zodiac wheel, like Aries–Libra or Taurus–Scorpio) are often described as powerfully attracted but challenging — strong chemistry with fundamental tension. The calculator shows your top compatibility matches with brief explanations.'
  },
  {
    question: 'Is astrology scientifically valid?',
    answer: 'No — there is no scientific evidence that birth date correlates with personality traits, life outcomes, or relationship compatibility. Multiple rigorous studies have tested astrological predictions and found results consistent with chance. That said, many people find zodiac archetypes useful as a reflective framework — similar to how personality type systems can prompt useful self-examination even without scientific validation. Use it as a lens for curiosity, not a rulebook for decisions.'
  },
  {
    question: 'Why do some people feel like their zodiac description does not fit them?',
    answer: 'Several reasons: the Sun sign is only one component of a full birth chart, which includes Moon sign, Rising sign, and planetary placements that significantly shape personality. Additionally, the descriptions are necessarily broad enough to apply to one-twelfth of humanity — confirmation bias does a lot of work in making them feel personally accurate. People who feel their sign does not fit often find their Moon or Rising sign more resonant.'
  },
  {
    question: 'What are zodiac "cusps" and does the calculator handle them?',
    answer: 'Cusp dates are when the Sun transitions between signs — typically around the 19th–23rd of each month. If you were born on one of these dates, your exact birth year matters because the Sun\'s transition point shifts slightly each year. The calculator uses the actual astronomical transition date for each year rather than fixed calendar dates, so cusp-born users get an accurate result instead of a generic "you might be either sign" non-answer.'
  },
  {
    question: 'Is this calculator free?',
    answer: 'Completely free, no account needed. Discover your sign, your compatibility, your Chinese animal, and your elemental traits in under a minute. The stars do not charge admission and neither do we.'
  },
]

export default function Page() { return <CalculatorClient faqs={faqs} /> }
