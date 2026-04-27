import type { Metadata } from 'next'
import { generateFunToolMetadata } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateFunToolMetadata({
  title: 'Personality Quiz – Fun Myers-Briggs Style Personality Type Test',
  description: 'Discover your personality type with our fun, fast quiz inspired by Myers-Briggs. Find out if you are an introvert or extrovert, thinker or feeler. Free, no signup, instant results.',
  slug: 'personality-quiz',
  keywords: [
    'personality quiz free online',
    'Myers-Briggs personality test free',
    'MBTI test online free',
    'personality type test',
    'introvert extrovert test',
    'personality quiz no signup',
    'what is my personality type',
    'free personality assessment online',
    'personality type quiz 2026',
    'fun personality quiz',
    'INFJ INFP ENFJ ENFP test',
    'ISTJ ISFJ ESTJ ESFJ test',
    'INTJ INTP ENTJ ENTP test',
    'ISTP ISFP ESTP ESFP test',
    'big five personality test free',
    '16 personalities test free',
    'personality quiz for teens',
    'personality quiz for work',
    'personality type compatibility',
    'what MBTI am I',
    'personality test no email',
    'personality quiz shareable result',
    'personality quiz viral',
    'am I an introvert or extrovert test',
    'personality quiz for friends',
    'tooltrio.com',
    'free calculator no signup',
    'fun calculator online free'
  ],
})

const faqs = [
  {
    question: 'Is this the same as the official Myers-Briggs Type Indicator (MBTI)?',
    answer: 'No — this is an independently designed personality quiz inspired by the four-dimension framework that underlies MBTI (introversion/extroversion, intuition/sensing, thinking/feeling, judging/perceiving). The official MBTI is a trademarked assessment administered by certified practitioners. This quiz is a fun, free alternative that captures the same broad personality dimensions without the $50 price tag.'
  },
  {
    question: 'How accurate is this personality quiz?',
    answer: 'Fun but not clinical. Personality assessments — even the official MBTI — have mixed scientific validity. The research consensus is that the Big Five (OCEAN) model has stronger empirical support than MBTI. That said, many people find personality type frameworks genuinely useful for self-understanding and communication. Take the result as an interesting lens, not a definitive verdict on who you are.'
  },
  {
    question: 'Can my personality type change over time?',
    answer: 'Yes — and that is normal. Research shows that personality traits, particularly conscientiousness and emotional stability, tend to shift meaningfully through major life stages. Many people find they shift on the introvert-extrovert or thinking-feeling dimensions across different seasons of life. Re-taking the quiz every few years can be a useful check-in.'
  },
  {
    question: 'Which personality types are the rarest?',
    answer: 'INFJ is commonly cited as the rarest type, estimated at around 1–2% of the population. INTJ is similarly rare at about 2%. The most common types are ISTJ (around 13%) and ISFJ (around 12–14%). If you get INFJ or INTJ, enjoy feeling rare — though the quiz is designed to make your result feel meaningful regardless of type.'
  },
  {
    question: 'Can I share my result on social media?',
    answer: 'Yes — and personality type results are among the most shareable content online. Posting "I got INFP, what\'s yours?" consistently drives high engagement on Instagram, Twitter, and TikTok. The result card is designed to be screenshot-ready. Many people also tag friends to take the quiz and compare types.'
  },
  {
    question: 'Is this quiz good for team building at work?',
    answer: 'Many teams use it as a low-pressure icebreaker — it is free, fast, and generates interesting conversation about work styles. It is more useful as a conversation prompt than as a management tool. Knowing a colleague is more introverted can explain why they are quieter in group meetings; knowing someone is a "Judger" type explains why they prefer structure and clear deadlines.'
  },
  {
    question: 'How long does the quiz take?',
    answer: 'About 3–5 minutes. It is designed to be fast enough that people actually finish it, with enough substance that the result feels earned rather than arbitrary. Answer based on instinct rather than overthinking each question — your first reaction tends to be most reflective of your natural personality.'
  },
  {
    question: 'Is the quiz free and does it require my email?',
    answer: 'Completely free, no email, no account. Your answers are never stored or shared. We built it this way because asking for an email to access a free personality quiz is exactly the kind of thing a strong-willed INTJ would call "unnecessarily gatekeeping." We agree.'
  },
]

export default function Page() { return <CalculatorClient faqs={faqs} /> }
