import type { Metadata } from 'next'
import { generateFunToolMetadata } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateFunToolMetadata({
  title: 'Social Media Addiction Score – Am I Addicted to Social Media?',
  description: 'Find out your social media addiction score with our quiz. Discover your addiction type, the platforms driving it, and practical steps to take back control. Free, instant.',
  slug: 'social-media-addiction',
  keywords: [
    'social media addiction test',
    'am I addicted to social media quiz',
    'social media addiction score',
    'social media addiction calculator',
    'phone addiction quiz free',
    'Instagram addiction test',
    'TikTok addiction quiz',
    'social media usage calculator',
    'doomscrolling addiction test',
    'social media detox quiz',
    'how addicted to social media am I',
    'social media addiction self test',
    'social media dependence quiz',
    'social media addiction signs quiz',
    'social media vs real life calculator',
    'social media addiction no signup',
    'social media addiction 2026',
    'compulsive phone checking quiz',
    'FOMO calculator social media',
    'social media addiction share result',
    'social media health check quiz',
    'smartphone addiction quiz',
    'social media mental health quiz',
    'how to know if you are addicted to social media',
    'Bergen social media addiction scale',
    'tooltrio.com',
    'free calculator no signup',
    'fun calculator online free'
  ],
})

const faqs = [
  {
    question: 'How is the social media addiction score calculated?',
    answer: 'The quiz is inspired by the Bergen Social Media Addiction Scale — a validated six-question instrument used in academic research, adapted here into a more detailed and conversational format. It assesses six dimensions: salience (thinking about social media when not using it), mood modification (using it to feel better), tolerance (needing more time for the same effect), withdrawal (feeling bad when unable to use it), conflict (it affecting relationships or work), and relapse (returning to heavy use after trying to cut back).'
  },
  {
    question: 'What score counts as a genuine addiction?',
    answer: 'Clinical criteria for behavioral addiction require the pattern to cause meaningful impairment in daily functioning — not just heavy use. Many people score high on frequency but low on impairment, which puts them in "heavy user" rather than "addicted" territory. The quiz distinguishes between these categories. Genuine addiction-level patterns affect sleep, relationships, work performance, and cause distress when access is interrupted.'
  },
  {
    question: 'Is TikTok more addictive than Instagram or Twitter?',
    answer: 'The research suggests yes — TikTok\'s algorithm is widely considered the most effective at maximizing engagement through continuous, personalized short-form video. The variable reward pattern (you never know if the next video will be great or boring) mirrors the slot machine effect that drives compulsive behavior. The quiz asks about platform-specific behaviors so you can see which apps are driving your score most.'
  },
  {
    question: 'What is doomscrolling and does this quiz address it?',
    answer: 'Doomscrolling — compulsively consuming negative news or distressing content online — is a specific pattern the quiz covers directly. It tends to be driven by a different mechanism than entertainment-based social media use: anxiety and a desire to feel informed rather than boredom or FOMO. If doomscrolling is your primary pattern, the recommendations in your results are tailored differently than for someone primarily driven by social comparison on Instagram.'
  },
  {
    question: 'What practical steps does the quiz recommend?',
    answer: 'Results include personalized recommendations based on your specific score and driver pattern. Common suggestions: moving apps off your home screen (reduces habitual checking by up to 40% in studies), turning off all social media notifications, setting a specific daily time window for checking rather than checking reactively, grayscale mode on your phone (reduces dopamine response to colorful UI), and a structured 30-day reduction plan. None of them require willpower alone — they are environmental design changes.'
  },
  {
    question: 'Does social media addiction cause depression or does depression cause social media use?',
    answer: 'Research suggests the relationship runs both ways — a bidirectional causal relationship. Heavy passive social media consumption (scrolling without engaging) is associated with increased depressive symptoms, particularly among adolescents. Depression also drives increased social media use as a coping mechanism. The association between social comparison on Instagram and lower self-esteem is one of the more robust findings in recent psychology research.'
  },
  {
    question: 'Can I use this quiz with my kids or teenagers?',
    answer: 'Yes — the quiz is appropriate for teenagers and is actually most relevant for that age group, where addiction patterns tend to develop. The teen results set includes age-specific context about how social media platforms are designed to target developing brains, which tends to be more effective than parental lectures about "putting the phone down."'
  },
  {
    question: 'Is this quiz free and private?',
    answer: 'Free, no account, no email. Your responses are not stored or sent anywhere. We built a social media addiction quiz and then deliberately made it not share your data — the meta-irony felt important.'
  },
]

export default function Page() { return <CalculatorClient faqs={faqs} /> }
