import type { Metadata } from 'next'
import { generateFunToolMetadata } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
  )
})

export const metadata: Metadata = generateFunToolMetadata({
  title: 'Procrastination Score Calculator | ToolTrio',
  description: 'Find out your procrastination score with our fun quiz. Discover your procrastinator type, triggers, and get practical tips to actually fix it. Free.',
  slug: 'procrastination-score',
  keywords: [
    'procrastination score calculator',
    'am I a procrastinator quiz',
    'procrastination test online free',
    'how bad is my procrastination',
    'procrastination quiz 2026',
    'procrastinator type test',
    'procrastination assessment free',
    'do I procrastinate too much quiz',
    'tooltrio.com',
  ],
})

const faqs = [
  {
    question: 'What types of procrastinators does the quiz identify?',
    answer: 'Research by psychologist Dr. Linda Sapadin identifies six procrastinator types: the Perfectionist (delays until conditions are ideal), the Dreamer (big ideas, avoids details), the Worrier (fears failure so avoids starting), the Defier (resists others\' deadlines), the Crisis-Maker (thrives on last-minute pressure), and the Overdoer (says yes to too much). The quiz identifies your dominant type and explains what drives it.'
  },
  {
    question: 'Is procrastination actually a time management problem?',
    answer: 'Increasingly, research says no — it is an emotion regulation problem. Procrastination happens when the discomfort of starting a task (anxiety, boredom, self-doubt, frustration) is avoided in favor of something that feels better right now. This is why productivity tips alone rarely fix it. The quiz helps you identify which emotion is driving your specific pattern, which is the first step to actually addressing it.'
  },
  {
    question: 'How is the procrastination score calculated?',
    answer: 'The quiz weights questions across four dimensions: frequency of delay, the impact of that delay on your goals, the emotional response when avoiding tasks, and your self-awareness about the pattern. High scores on frequency with low self-awareness produce the highest overall procrastination scores. The result also breaks down which dimension is your biggest contributor.'
  },
  {
    question: 'Does a high score mean I am lazy?',
    answer: 'No — and this is an important distinction. Chronic procrastination is correlated with anxiety, perfectionism, low self-compassion, and executive function challenges (including ADHD), not laziness. Many highly motivated, ambitious people are severe procrastinators precisely because they care so much about the outcome that starting feels terrifying. The quiz addresses this directly in the results.'
  },
  {
    question: 'What practical advice does the quiz give?',
    answer: 'The results are type-specific — the advice for a Perfectionist ("good enough is often good enough; ship it") is different from advice for a Crisis-Maker ("artificially create earlier deadlines and tell people about them") or a Worrier ("break the task into the smallest possible first step so starting feels safe"). Generic "just do it" advice fails because it does not address the underlying driver.'
  },
  {
    question: 'Is this different from a clinical ADHD or anxiety assessment?',
    answer: 'Yes — this is a fun self-awareness tool, not a diagnostic instrument. If you suspect your procrastination is significantly impacting your work, relationships, or mental health, a conversation with a psychologist or psychiatrist is genuinely worthwhile. Executive function coaching and CBT have strong evidence bases for treating severe procrastination patterns.'
  },
  {
    question: 'Can I share my procrastination score?',
    answer: 'Yes — and procrastination quiz results are extremely shareable because the type descriptions tend to feel uncomfortably accurate. "I got 91% and my type is The Perfectionist — please roast me" is a familiar social media format that gets strong engagement. The results card is designed to be screenshot-friendly.'
  },
  {
    question: 'Is the quiz free?',
    answer: 'Free and instant, no account needed. It takes about 3 minutes. You could start it now — or you could come back to it later. (We see you, procrastinator.)'
  },
]

export default function Page() {
  const _faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f: any) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_faqSchema) }} />
      <CalculatorClient faqs={faqs} />
    </>
  )
}
