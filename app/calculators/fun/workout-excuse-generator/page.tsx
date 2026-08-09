import type { Metadata } from 'next'
import { generateFunToolMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  
  loading: () => (
    <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
  )
})

export const metadata: Metadata = generateFunToolMetadata({
  title: 'Workout Excuse Generator | ToolTrio',
  description: 'Generate hilariously creative excuses to skip your workout. From mildly plausible to completely unhinged. Because sometimes the couch wins. Free, instant.',
  slug: 'workout-excuse-generator',
  keywords: [
    'workout excuse generator',
    'excuse to skip gym generator',
    'funny excuses to skip workout',
    'gym excuse generator',
    'creative workout excuses',
    'skip leg day excuse generator',
    'funny gym excuses online',
    'best workout excuses',
    'tooltrio.com',
  ],
})

const faqs = [
  {
    question: 'What kinds of excuses does the generator produce?',
    answer: 'The generator has three tiers. Plausible excuses sound like something your doctor might actually accept — "my left knee has been making a sound that I can only describe as suspicious." Semi-plausible excuses require a charitable audience — "I read that rest days are scientifically necessary and today is technically a day." Completely unhinged excuses are pure absurdist art — "I can\'t go to the gym because a pigeon made significant eye contact with me this morning and I need to process what it meant." You can set which tier you want.'
  },
  {
    question: 'Can I generate an excuse convincing enough to actually use?',
    answer: 'Tier one excuses are designed to pass basic scrutiny from a workout partner, personal trainer, or fitness-oriented friend. They reference real phenomena (overtraining syndrome, sleep debt, muscle protein synthesis windows) just plausibly enough to deflect. We take no responsibility for what happens if you actually use them. The disclaimer is that rest days are genuinely important and sometimes skipping the gym is the correct decision — the generator is just for the times it is not.'
  },
  {
    question: 'Can I personalize the excuse for a specific person?',
    answer: 'Yes — select your audience (workout buddy, personal trainer, partner, gym group chat, or general social media) and the excuse is calibrated to that target. The trainer excuse leans on scientific-sounding recovery justification. The partner excuse adds emotional texture. The social media version is designed to be funny and shareable rather than persuasive.'
  },
  {
    question: 'Is this actually motivating in a reverse psychology way?',
    answer: 'Surprisingly often, yes. Reading a list of absurd excuses makes people aware of the real excuses they use, which creates enough self-awareness to sometimes override the avoidance. If your real-life excuse is not as funny as the generated ones, it can be harder to take it seriously. Several people have reported going to the gym specifically because the generator made their actual excuse feel embarrassingly weak by comparison.'
  },
  {
    question: 'What is the most popular excuse category?',
    answer: '"My body is still processing yesterday\'s workout" consistently rates as the most-used because it sounds scientific and is technically impossible to disprove. Second place goes to weather-based excuses (the generator has an entire weather excuse module) and third is the broad category of obscure superstitions ("the last time I worked out on a Wednesday with this air pressure, things went poorly").'
  },
  {
    question: 'Can kids use this?',
    answer: 'Yes — all content is family-friendly. The generator is particularly popular with kids using it to generate reasons to skip PE, which is probably not the use case we should be encouraging but is objectively funny. The excuses are creative and humorous without any inappropriate content.'
  },
  {
    question: 'Should I actually skip my workout?',
    answer: 'That is between you and your conscience. Genuine rest days are important — overtraining is real and strategic recovery is part of any serious fitness program. But if you are generating excuses because motivation is low rather than because your body needs rest, the gym will probably make you feel better than the couch does. We say this while running a tool that helps you avoid the gym. The contradiction is intentional and relatable.'
  },
]

export default function Page() {
  const _faqSchema = generateFAQStructuredData(faqs)
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_faqSchema) }} />
      <CalculatorClient faqs={faqs} />
    </>
  )
}
