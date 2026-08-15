'use client'
import { DevToolLayout } from '@/components/ui/DevToolLayout'
import { SEOContent } from '@/components/ui/SEOContent'
import { useState, useMemo } from 'react'

interface Props { faqs: { question: string; answer: string }[] }

// 100 questions across 10 categories for large question bank
const ALL_QUESTIONS = [
  // Avoidance & delay
  { q: "I delay starting tasks even when I know the deadline is approaching.", cat: "avoidance" },
  { q: "I find reasons to do something else when I'm supposed to be working on an important task.", cat: "avoidance" },
  { q: "I wait until the last minute to start projects.", cat: "avoidance" },
  { q: "I tell myself I'll feel more motivated later, but later never comes.", cat: "avoidance" },
  { q: "I avoid opening emails or messages I know will require effort to respond to.", cat: "avoidance" },
  { q: "I put off making phone calls that feel uncomfortable.", cat: "avoidance" },
  { q: "I delay decisions by telling myself I need more information first.", cat: "avoidance" },
  { q: "I postpone starting new projects even when excited about them.", cat: "avoidance" },
  { q: "I defer tasks that require confronting difficult situations.", cat: "avoidance" },
  { q: "I avoid tasks that involve any chance of failure or judgment.", cat: "avoidance" },

  // Task management
  { q: "My to-do list grows faster than I can check things off.", cat: "tasks" },
  { q: "I frequently miss self-imposed deadlines.", cat: "tasks" },
  { q: "I start many tasks but finish few of them.", cat: "tasks" },
  { q: "I have unfinished projects that have been 'almost done' for months.", cat: "tasks" },
  { q: "I prioritize easy tasks over important ones to feel productive.", cat: "tasks" },
  { q: "I do low-priority tasks to avoid high-priority ones.", cat: "tasks" },
  { q: "I reorganize my workspace or files instead of doing the actual work.", cat: "tasks" },
  { q: "I spend time planning how to do a task instead of actually doing it.", cat: "tasks" },
  { q: "I create elaborate systems to manage tasks but rarely follow them.", cat: "tasks" },
  { q: "I frequently feel behind on things that matter to me.", cat: "tasks" },

  // Digital distraction
  { q: "I check social media when I should be working.", cat: "digital" },
  { q: "I find myself watching 'one more video' when I have things to do.", cat: "digital" },
  { q: "I open my phone out of habit rather than purpose during work sessions.", cat: "digital" },
  { q: "News or entertainment sites pull me away from important work.", cat: "digital" },
  { q: "I use my phone as a procrastination tool more than a productivity tool.", cat: "digital" },
  { q: "I check notifications during focused work time.", cat: "digital" },
  { q: "I scroll mindlessly when I'm supposed to be doing something else.", cat: "digital" },
  { q: "Online rabbit holes regularly derail my planned work sessions.", cat: "digital" },
  { q: "I use research as an excuse to browse the internet unproductively.", cat: "digital" },
  { q: "I feel compelled to check my email or messages even when not expecting anything.", cat: "digital" },

  // Perfectionism
  { q: "I delay completing tasks because they're not perfect yet.", cat: "perfectionism" },
  { q: "I redo work that was already good enough.", cat: "perfectionism" },
  { q: "Fear of not doing something perfectly stops me from doing it at all.", cat: "perfectionism" },
  { q: "I spend disproportionate time on minor details.", cat: "perfectionism" },
  { q: "I struggle to call things 'done' and move on.", cat: "perfectionism" },
  { q: "I hold back sharing work because it could always be better.", cat: "perfectionism" },
  { q: "The gap between my standards and my output feels demotivating.", cat: "perfectionism" },
  { q: "I wait for the right moment or conditions to start something.", cat: "perfectionism" },
  { q: "I'd rather not start than risk starting imperfectly.", cat: "perfectionism" },
  { q: "I lose motivation midway through when I realize it won't be perfect.", cat: "perfectionism" },

  // Emotional avoidance
  { q: "I avoid tasks that trigger anxiety, boredom, or frustration.", cat: "emotional" },
  { q: "I procrastinate more on tasks I find emotionally draining.", cat: "emotional" },
  { q: "Bad mood often leads to bad productivity.", cat: "emotional" },
  { q: "I need to feel 'in the mood' to work effectively.", cat: "emotional" },
  { q: "Stress from one area of life spills into my ability to work on tasks.", cat: "emotional" },
  { q: "I comfort myself with pleasurable activities when I should be working.", cat: "emotional" },
  { q: "I feel guilty about procrastinating but can't seem to stop.", cat: "emotional" },
  { q: "Shame about past procrastination makes current tasks harder to start.", cat: "emotional" },
  { q: "I use tiredness or low energy as justification for not working.", cat: "emotional" },
  { q: "Uncertainty about whether my work will be good enough stops me starting.", cat: "emotional" },

  // Time perception
  { q: "I consistently underestimate how long tasks will take.", cat: "time" },
  { q: "I overestimate how much I can accomplish in a day.", cat: "time" },
  { q: "I think 'I still have time' only to find the deadline is tomorrow.", cat: "time" },
  { q: "I lose track of time when doing enjoyable things.", cat: "time" },
  { q: "I'm often surprised by how late it is.", cat: "time" },
  { q: "I schedule more than I can realistically accomplish.", cat: "time" },
  { q: "I believe I work better under pressure (even if evidence suggests otherwise).", cat: "time" },
  { q: "I underestimate travel, preparation, or recovery time for tasks.", cat: "time" },
  { q: "I commit to things too far in the future without accounting for how busy I'll be.", cat: "time" },
  { q: "My sense of time passing is less accurate under stress.", cat: "time" },

  // Motivation & energy
  { q: "I struggle to motivate myself without external deadlines.", cat: "motivation" },
  { q: "I feel more motivated by new projects than completing existing ones.", cat: "motivation" },
  { q: "My energy fluctuates unpredictably, making consistent work difficult.", cat: "motivation" },
  { q: "I find it hard to start work without some kind of external trigger.", cat: "motivation" },
  { q: "I work in intense bursts followed by long periods of low productivity.", cat: "motivation" },
  { q: "The things I most want to do are often the last things I get around to.", cat: "motivation" },
  { q: "I rely on adrenaline from deadlines to get things done.", cat: "motivation" },
  { q: "I often feel unmotivated even about things I genuinely care about.", cat: "motivation" },
  { q: "My productivity depends heavily on how I feel when I wake up.", cat: "motivation" },
  { q: "I find it hard to maintain momentum on long-term projects.", cat: "motivation" },

  // Social & accountability
  { q: "I work better when someone is watching or waiting for me.", cat: "social" },
  { q: "I've let people down because of my procrastination.", cat: "social" },
  { q: "I'm reluctant to share my goals publicly in case I don't follow through.", cat: "social" },
  { q: "I feel more accountable to others' deadlines than my own.", cat: "social" },
  { q: "I respond faster to others' requests than to my own priorities.", cat: "social" },
  { q: "Social activities are easier to engage in than solitary task work.", cat: "social" },
  { q: "I use helping others as a reason to avoid my own important tasks.", cat: "social" },
  { q: "I worry about what others will think if my work isn't good enough.", cat: "social" },
  { q: "I procrastinate less when working alongside other people.", cat: "social" },
  { q: "Fear of disappointing others paradoxically makes me avoid their tasks.", cat: "social" },

  // Environment & setup
  { q: "My workspace is frequently cluttered or disorganized.", cat: "environment" },
  { q: "I use tidying or organizing as a procrastination strategy.", cat: "environment" },
  { q: "I can't work unless conditions feel exactly right.", cat: "environment" },
  { q: "Noise, interruptions, or distractions derail my focus.", cat: "environment" },
  { q: "I spend significant time setting up to work rather than actually working.", cat: "environment" },
  { q: "I don't have a dedicated space for focused work.", cat: "environment" },
  { q: "My environment has many attention-pulling distractions.", cat: "environment" },
  { q: "I work better in certain locations but rarely access them.", cat: "environment" },
  { q: "My phone is visible and accessible during work sessions.", cat: "environment" },
  { q: "I work in the same location for rest and work, making it hard to switch modes.", cat: "environment" },

  // Self-awareness & patterns
  { q: "I know I procrastinate but feel powerless to change it.", cat: "selfaware" },
  { q: "I've procrastinated in the same way for years.", cat: "selfaware" },
  { q: "I recognize my procrastination patterns but don't act on that recognition.", cat: "selfaware" },
  { q: "I have tried productivity systems but never maintained them long-term.", cat: "selfaware" },
  { q: "I'm better at advising others on productivity than following my own advice.", cat: "selfaware" },
  { q: "I know what I should be doing most of the time but don't do it.", cat: "selfaware" },
  { q: "The gap between knowing and doing is a recurring theme in my life.", cat: "selfaware" },
  { q: "I frequently reflect on my procrastination without taking action.", cat: "selfaware" },
  { q: "I've read productivity books without changing my core habits.", cat: "selfaware" },
  { q: "I believe I'll change my procrastination patterns but haven't yet.", cat: "selfaware" },
]

const PROFILES = [
  { range: [0, 20], label: '🟢 Minimal Procrastinator', color: 'text-green-700', bg: 'bg-green-50 border-green-200',
    summary: 'You have excellent time management and self-discipline. Procrastination is not a significant pattern in your life — you tend to start and complete tasks without major resistance.',
    education: 'Your discipline in task completion translates directly into academic and learning success. You are likely someone who reads ahead, completes assignments early, and reviews material before it\'s urgent. This proactive approach compounds over time, creating genuine depth of knowledge rather than surface-level familiarity. The risk, paradoxically, is that your efficiency can sometimes sacrifice depth for coverage — you finish things on schedule but may not linger long enough on the material that most deserves extended thought.',
    relationship: 'Your reliability makes you an excellent partner, friend, and collaborator. People trust your commitments because you follow through on them. The potential blind spot: your efficiency orientation may create impatience with others who process or move at different speeds. Learning to distinguish between productive pace and unnecessarily anxious pace can make your relationships even more effective.',
    work: 'You are the professional that organizations depend on. Projects land on time, commitments are honored, and your reputation for reliability opens doors that remain closed to talented but unreliable colleagues. The career risk for low procrastinators is occasionally moving too fast — shipping before full consideration, deciding before full information, finishing before the work is ready.',
    health: 'Your self-discipline likely extends to health habits: regular exercise, reasonable nutrition, adequate sleep. The health risk is that the same discipline can become rigidity — difficulty resting when rest is genuinely needed, or punishing yourself for normal human inconsistency.',
    money: 'You likely manage finances well — bills paid on time, savings automated, financial goals tracked. The financial upside of minimal procrastination compounds dramatically over a lifetime through the cumulative effect of timely decisions, early investing, and avoided penalty fees.',
    tips: ['Maintain your systems without making them so rigid they become stressful', 'Practice strategic patience — some things benefit from deliberate delay', 'Help others improve their relationship with tasks without imposing your standards']
  },
  { range: [21, 40], label: '🟡 Mild Procrastinator', color: 'text-yellow-700', bg: 'bg-yellow-50 border-yellow-200',
    summary: 'You procrastinate occasionally but generally manage your responsibilities well. Procrastination appears in specific contexts — usually around tasks that trigger discomfort, boredom, or perfectionism.',
    education: 'Your learning is generally effective but shows mild patterns of last-minute completion. You are capable of genuine depth when engaged, but susceptible to surface-level completion when not. The academic areas that most trigger your procrastination are likely those requiring sustained effort without clear immediate feedback — long-form writing, complex research, extended practice.',
    relationship: 'You are mostly reliable in your relationships, with occasional lapses that you recognize and address. You may sometimes avoid difficult conversations or uncomfortable relationship maintenance tasks, but generally return to them before significant damage is done. The procrastination in your relationships tends to be emotional rather than logistical — delaying the vulnerable conversation, deferring the apology.',
    work: 'Your work life has a pattern: strong performance on engaging tasks, inconsistent performance on tedious or uncomfortable ones. Your colleagues and managers likely see you as generally reliable with some inconsistency around specific task types. Identifying which task types trigger your procrastination and addressing those specifically would produce disproportionate professional improvement.',
    health: 'Your health habits are good but not consistent. You likely know what you should be doing and do it most of the time, with periods of lapse that you then need to recover from. The health procrastination tends to appear around appointments, preventive care, and establishing new habits rather than maintaining existing ones.',
    money: 'You handle financial basics well but may delay larger or more complex financial decisions — filing taxes on time but at the last minute, making investment decisions later than optimal, deferring conversations with financial advisers.',
    tips: ['Identify your top 3 procrastination triggers and address those specifically', 'Use implementation intentions: "When X situation occurs, I will do Y action"', 'Practice starting — even 5 minutes of work on a deferred task breaks the avoidance pattern']
  },
  { range: [41, 60], label: '🟠 Moderate Procrastinator', color: 'text-orange-700', bg: 'bg-orange-50 border-orange-200',
    summary: 'Procrastination is a consistent pattern that affects multiple areas of your life. You recognize it clearly and feel its impact regularly. The good news: at this level, targeted interventions produce significant improvements quickly.',
    education: 'Your educational history likely features a pattern of performing below your actual capability due to procrastination rather than ability. You are probably more intelligent and capable than your output has demonstrated, because a consistent portion of your potential has been consumed by avoidance. The most important insight: your procrastination is not about laziness. Research consistently shows that procrastination is about emotional avoidance — tasks trigger feelings that are uncomfortable, and avoidance provides short-term relief at the cost of long-term outcomes.',
    relationship: 'Procrastination at this level begins to affect your relationships more directly. Delayed responses, deferred relationship maintenance, avoided difficult conversations, and missed commitments create friction that accumulates. Partners and friends may experience you as less present or reliable than you actually intend to be. The relational cost of procrastination is often underestimated because it operates below the threshold of obvious failure.',
    work: 'Your professional performance is meaningfully below your capability due to procrastination. Opportunities are missed, relationships are strained by late deliveries, and the chronic low-level stress of incomplete tasks affects both your wellbeing and your work quality. The professional case for addressing your procrastination is strong: even a 30% reduction would likely produce significant career advancement.',
    health: 'At this procrastination level, health-related avoidance becomes a genuine risk factor. Deferred medical appointments, avoided conversations with doctors, inconsistent exercise and nutrition habits, and difficulty establishing new health routines are common. The stress of chronic procrastination is itself a health risk — cortisol elevation from constant background guilt and urgency has measurable physiological effects.',
    money: 'Financial procrastination at this level has real costs: late fees, suboptimal decisions made under time pressure, deferred investment that compounds missed opportunity, and avoided financial conversations that lead to larger problems later. The financial cost of chronic procrastination over a lifetime is substantial and rarely calculated.',
    tips: [
      'Start with the 2-minute rule: if a task takes under 2 minutes, do it immediately',
      'Use "temptation bundling" — pair unpleasant tasks with something enjoyable',
      'Address the emotional component: what feeling is the task triggering that you\'re avoiding?',
      'Time-block your calendar to create external structure',
      'Find an accountability partner for your highest-priority tasks'
    ]
  },
  { range: [61, 80], label: '🔴 Significant Procrastinator', color: 'text-red-700', bg: 'bg-red-50 border-red-200',
    summary: 'Procrastination is a significant and ongoing challenge that regularly impacts your quality of life, professional performance, and relationships. This level of procrastination is unlikely to resolve without deliberate, structured intervention.',
    education: 'Your relationship with structured learning is probably complicated. You may have significant gaps between your ability and your credentials because procrastination interfered with completing what you started. You likely have more knowledge, capability, and intelligence than your formal education history suggests. The most important reframe: this is not a character flaw. Research by Dr. Timothy Pychyl and others has established that procrastination is fundamentally a problem of emotional regulation — the inability to tolerate the negative feelings triggered by certain tasks — not a productivity or time management problem. Treating it as a time management problem (more systems, better planning) without addressing the emotional component produces limited results.',
    relationship: 'At this level, procrastination is creating real and recurring problems in your relationships. Important conversations are deferred past the point where they can be productive. Commitments are regularly missed. The cumulative effect on trust is significant. Partners, friends, and family members may have calibrated their expectations of you downward, which affects the quality of connection available.',
    work: 'Your professional situation likely involves chronic underperformance relative to your actual capability, reputation effects from missed deadlines and deliverables, and possibly significant career consequences already experienced or building. The work stress created by chronic procrastination — the constant background awareness of what isn\'t done — is substantial and affects both performance and wellbeing.',
    health: 'Significant procrastination at this level creates health risks through multiple pathways: chronic stress and its physiological effects, deferred medical care, inconsistent health habits, and potentially sleep disruption from anxiety about unfinished tasks. Taking your physical and mental health seriously is both valuable in itself and a prerequisite for improving other areas.',
    money: 'Financial consequences at this level may be significant and already accumulating: late fees, missed tax deadlines, suboptimal financial decisions made urgently, career income below potential, and compounding missed investment opportunities. Getting financial basics under automated control — automatic bill payment, automatic savings — removes the procrastination vulnerability from your most time-sensitive financial obligations.',
    tips: [
      'Seek professional support — CBT-based coaching specifically for procrastination has strong evidence',
      'Reduce the size of "starts" to the absolute minimum — open the document, nothing more',
      'Address any underlying anxiety, depression, or ADHD that may be driving procrastination',
      'Build environment-based solutions: remove distractions rather than relying on willpower',
      'Practice self-compassion explicitly — shame increases procrastination, not decreases it',
      'Work with the emotional component, not against it'
    ]
  },
  { range: [81, 100], label: '🚨 Severe Procrastinator', color: 'text-red-900', bg: 'bg-red-100 border-red-300',
    summary: 'Procrastination is significantly interfering with your life, goals, and wellbeing. At this level, it is very likely connected to underlying factors — anxiety, depression, ADHD, perfectionism — that deserve direct attention.',
    education: 'Your educational potential has very likely been dramatically underexpressed due to procrastination. The gap between what you are capable of and what you have produced is wide. This is not fate, and it is not permanent — but closing that gap requires addressing the root causes of your procrastination, not just its symptoms. Research on severe procrastinators consistently finds high rates of anxiety disorders, attention difficulties, and perfectionism. These are not weaknesses; they are factors to understand and work with rather than against.',
    relationship: 'At this level, procrastination is causing significant relational damage. Trust is eroded. Commitments are not honored. Patterns of behavior that others have attempted to communicate concern about have continued. The relational consequences are real and compounding. Addressing your procrastination is an act of care for the people in your life, not just yourself.',
    work: 'Your professional life is likely experiencing significant consequences from procrastination: performance issues, relationship difficulties with colleagues, career stagnation or decline, possibly job loss. The professional case for fundamental change is not abstract — it is urgent and concrete.',
    health: 'At this severity level, health consequences are significant and likely already visible: chronic stress, sleep disruption, possible panic or anxiety symptoms, deferred medical care with accumulating consequences. Your mental and physical health needs attention that is not being procrastinated about.',
    money: 'Financial consequences at this level may be severe: significant late fees, tax issues, legal consequences of deferred obligations, career income dramatically below potential. Immediate and practical help from a financial professional is warranted.',
    tips: [
      'Consult a mental health professional — this level of procrastination is almost always connected to treatable underlying conditions',
      'Investigate ADHD evaluation if you haven\'t — it is significantly underdiagnosed and highly associated with this level of procrastination',
      'Practice radical self-compassion — judgment and shame have not been working; try a different approach',
      'Identify one thing, just one, that must change this week, and get support in making that change',
      'Consider a coach, therapist, or accountability program specifically designed for chronic procrastination',
      'Know that people at this level have changed — it requires real effort and often support, but transformation is possible'
    ]
  },
]

// Pick 15 random questions from the pool
function selectQuestions(seed: number = 0) {
  const shuffled = [...ALL_QUESTIONS].sort((a, b) => {
    const ha = Math.sin(a.q.length * (seed + 1)) * 10000
    const hb = Math.sin(b.q.length * (seed + 1)) * 10000
    return (ha - Math.floor(ha)) - (hb - Math.floor(hb))
  })
  return shuffled.slice(0, 15)
}

export default function CalculatorClient({ faqs }: Props) {
  const [sessionSeed, setSessionSeed] = useState(() => Math.floor(Math.random() * 10000))
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [result, setResult] = useState<null | { score: number; profile: typeof PROFILES[0] }>(null)

  const questions = useMemo(() => selectQuestions(sessionSeed), [sessionSeed])

  const LABELS = ['Never', 'Rarely', 'Sometimes', 'Often', 'Always']

  function calculate() {
    if (Object.keys(answers).length < questions.length) {
      alert('Please answer all questions to get your score.')
      return
    }
    const total = (Object.values(answers) as number[]).reduce((s, v) => s + v, 0)
    const score = Math.round((total / (questions.length * 4)) * 100)
    const profile = PROFILES.find(p => score >= p.range[0] && score <= p.range[1]) || PROFILES[2]
    setResult({ score, profile })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function retake() {
    setAnswers({})
    setResult(null)
    setSessionSeed(Math.floor(Math.random() * 10000))
  }

  function share() {
    if (!result) return
    const text = `📊 My Procrastination Score: ${result.score}/100\n${result.profile.label}\n\nTest yours: tooltrio.com/fun/procrastination-score`
    if (navigator.share) navigator.share({ title: 'Procrastination Score', text })
    else navigator.clipboard.writeText(text).then(() => alert('Copied!'))
  }

  return (
    <DevToolLayout title="Procrastination Score Test" icon="⏰"
      description="Measure your procrastination level with 100-question bank — detailed profile with actionable insights"
      category="Fun" parentPath="/fun" parentLabel="Fun & Entertainment">

      {result ? (
        <div className="space-y-4">
          {/* Score hero */}
          <div className={`rounded-3xl border-2 p-6 text-center ${result.profile.bg}`}>
            <div className="text-5xl mb-2">⏰</div>
            <div className={`text-7xl font-black mb-1 ${result.profile.color}`}>{result.score}</div>
            <div className="text-gray-500 text-sm mb-2">out of 100</div>
            <div className={`text-xl font-black mb-3 ${result.profile.color}`}>{result.profile.label}</div>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">{result.profile.summary}</p>
            <div className="flex gap-2 justify-center">
              <button onClick={share} className="px-4 py-2 text-sm font-bold rounded-xl bg-gray-800 text-white hover:bg-gray-900">📤 Share</button>
              <button onClick={retake} className="px-4 py-2 text-sm font-bold rounded-xl border-2 border-gray-300 text-gray-700 hover:bg-gray-50">↺ Retake (New Questions)</button>
            </div>
          </div>

          {/* Detailed sections */}
          {[
            { icon: '📚', title: 'Education & Learning', content: result.profile.education },
            { icon: '❤️', title: 'Relationships', content: result.profile.relationship },
            { icon: '💼', title: 'Work & Career', content: result.profile.work },
            { icon: '🏥', title: 'Health & Wellbeing', content: result.profile.health },
            { icon: '💰', title: 'Money & Finances', content: result.profile.money },
          ].map(s => (
            <div key={s.title} className="rounded-2xl border p-5 bg-white">
              <h2 className="text-lg font-black text-gray-900 mb-3">{s.icon} {s.title}</h2>
              <p className="text-sm text-gray-700 leading-relaxed">{s.content}</p>
            </div>
          ))}

          {/* Tips */}
          <div className="rounded-2xl border p-5 bg-amber-50 border-amber-200">
            <h2 className="text-lg font-black text-amber-800 mb-3">🎯 Your Action Plan</h2>
            <div className="space-y-2">
              {result.profile.tips.map((tip, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5">{i+1}</span>
                  <p className="text-sm text-amber-800 leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="rounded-xl border p-4 bg-blue-50 border-blue-100 mb-6 text-sm text-blue-800">
            <p className="font-bold mb-1">📋 {questions.length} Questions · ~3 minutes</p>
            <p>Drawn from a pool of {ALL_QUESTIONS.length} questions. Click <strong>Retake</strong> after for a fresh set of questions.</p>
          </div>

          <div className="space-y-6">
            {questions.map((q, idx) => (
              <div key={idx} className="rounded-2xl border p-4 bg-white">
                <p className="text-sm font-semibold text-gray-800 mb-3">
                  <span className="text-gray-400 mr-2">{idx + 1}.</span>{q.q}
                </p>
                <div className="grid grid-cols-5 gap-1">
                  {LABELS.map((label, val) => (
                    <button key={val} onClick={() => setAnswers(a => ({...a, [idx]: val}))}
                      className={`py-2 rounded-lg text-xs font-bold transition-all ${answers[idx] === val ? 'bg-orange-500 text-white shadow' : 'bg-gray-50 text-gray-500 hover:bg-orange-50 hover:text-orange-600 border border-gray-200'}`}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3">
            <div className="text-center text-sm text-gray-500">
              {Object.keys(answers).length}/{questions.length} answered
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div className="bg-orange-500 h-2 rounded-full transition-all" style={{width:`${(Object.keys(answers).length/questions.length)*100}%`}} />
            </div>
            <button onClick={calculate}
              className="w-full py-4 text-white font-black text-lg rounded-xl"
              style={{background:'linear-gradient(135deg,#f97316,#ea580c)',boxShadow:'0 4px 16px rgba(249,115,22,0.3)'}}>
              ⏰ Get My Procrastination Score
            </button>
          </div>
        </div>
      )}

      <div className="mt-12 space-y-6 max-w-2xl mx-auto">
        <SEOContent title="" category="fun"
          intro={`This procrastination test draws from a bank of ${ALL_QUESTIONS.length} questions across 10 categories — avoidance, perfectionism, digital distraction, emotional avoidance, time perception, motivation, social factors, environment, task management, and self-awareness. Each retake gives you a new set of 15 questions.`}
          howItWorks="Answer 15 randomly selected questions and get a score from 0-100. The result includes detailed analysis across education, relationships, work, health, and money, plus a concrete action plan tailored to your score range."
          tipsSection="Procrastination is primarily an emotional regulation problem, not a time management problem. The most effective interventions address the feelings that avoidance is trying to manage."
          conclusion="Awareness is the first step. Knowing your procrastination patterns is the prerequisite for changing them."
          benefits={[{title:`${ALL_QUESTIONS.length}-question bank`,text:'Fresh questions every retake across 10 categories.'},{title:'Deep analysis',text:'5 life area breakdowns plus action plan.'}]}
          useCases={[{title:'Self-awareness',text:'Understand your specific procrastination patterns.'},{title:'Tracking',text:'Retake monthly to track improvement.'}]} />
        <section><h2 className="text-xl font-black text-gray-900 mb-4">FAQ</h2>
          <div className="space-y-3">{faqs.map(f => <details key={f.question} className="rounded-2xl border p-4"><summary className="font-semibold cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3">{f.answer}</p></details>)}</div>
        </section>
      </div>
    </DevToolLayout>
  )
}
