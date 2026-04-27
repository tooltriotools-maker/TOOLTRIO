import type { Metadata } from 'next'
import { generateFunToolMetadata } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateFunToolMetadata({
  title: 'Trivia Quiz – 10 Random Questions Across 8 Categories',
  description: 'Test your knowledge with 10 random trivia questions spanning science, history, pop culture, sports, geography, and more. Free trivia quiz online, instant scoring, no signup.',
  slug: 'trivia-quiz',
  keywords: [
    'trivia quiz online free',
    'random trivia questions',
    'trivia quiz 2026',
    'general knowledge quiz online',
    'free trivia quiz no signup',
    'trivia questions and answers',
    'online trivia game free',
    'trivia quiz for adults',
    'science trivia quiz',
    'history trivia quiz online',
    'pop culture trivia questions',
    'sports trivia quiz online',
    'geography trivia quiz',
    'hard trivia questions',
    'easy trivia quiz online',
    'pub quiz questions online',
    'trivia night practice',
    'trivia quiz multiple choice',
    'timed trivia quiz',
    'trivia quiz score calculator',
    'random general knowledge questions',
    'trivia challenge online',
    'trivia quiz kids',
    'trivia quiz with answers explained',
    'trivia quiz shareable score',
    'tooltrio.com',
    'free calculator no signup',
    'fun calculator online free'
  ],
})

const faqs = [
  {
    question: 'What categories are covered in the trivia quiz?',
    answer: 'The quiz draws randomly from eight categories: Science & Nature, World History, Geography, Pop Culture & Entertainment, Sports, Literature & Language, Food & Drink, and Technology. Each 10-question round is automatically mixed across categories so you never get all sports questions or all history questions in one sitting — it tests genuine breadth of knowledge.'
  },
  {
    question: 'How difficult are the questions?',
    answer: 'The default mix includes a range — roughly 40% accessible questions that most people know, 40% moderate questions that require some knowledge, and 20% genuinely hard questions that separate the trivia enthusiasts from the casual players. You can filter by difficulty level if you want a gentler warm-up or a punishing expert mode. Question difficulty ratings are based on community scoring data from the thousands of times the quiz has been taken.'
  },
  {
    question: 'Is there a timed mode?',
    answer: 'Yes — an optional countdown timer gives you 20 seconds per question, which adds significant pressure and better simulates pub quiz or game show conditions. Timed mode reveals how differently your brain performs under time pressure vs. when you can deliberate. Most people find they score 10–15% lower in timed mode, which says a lot about how much we rely on the "tip of the tongue" feel-good retrieval time.'
  },
  {
    question: 'Do the questions repeat?',
    answer: 'The question bank contains several hundred questions, and the random selection means most people can play multiple rounds without repetition. Over many sessions you will eventually see repeats, but the random draw means you rarely get the same 10-question set twice. Frequent players report that repetition actually becomes useful — it solidifies answers you got wrong the first time.'
  },
  {
    question: 'Can I use this for a pub quiz or trivia night?',
    answer: 'Yes — many trivia hosts use the generator to create question sets. The answers are explained after each round so participants understand why the correct answer is right, which is the mark of quality pub quiz content (nobody likes an unexplained answer). For a full pub quiz format, run several rounds and mix difficulty levels between rounds.'
  },
  {
    question: 'Does the quiz explain why the correct answer is right?',
    answer: 'Yes — every question includes a brief explanation of the correct answer after you submit. This is the feature that turns a trivia quiz from entertainment into actual learning. Understanding that something is the correct answer without knowing why it is correct means the knowledge rarely sticks. The explanations are kept brief — two to three sentences — so they do not slow the pacing.'
  },
  {
    question: 'Can I challenge friends with my score?',
    answer: 'Yes — your result includes a shareable score card showing how many you got right and which categories you excelled or struggled in. Posting "7/10 — I was robbed on the music question" to a group chat or social media typically generates competitive responses. The share card is designed for WhatsApp and Instagram Stories specifically.'
  },
  {
    question: 'Is the trivia quiz free?',
    answer: 'Completely free, unlimited plays, no account needed. Trivia should not be behind a paywall. Go test your knowledge.'
  },
]

export default function Page() { return <CalculatorClient faqs={faqs} /> }
