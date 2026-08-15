'use client'
import { DevToolLayout } from '@/components/ui/DevToolLayout'
import { SEOContent } from '@/components/ui/SEOContent'
import { useState, useMemo } from 'react'
import Link from 'next/link'

interface Props { faqs: { question: string; answer: string }[] }

const LIFE_PATH_DATA: Record<number, {
  title: string; symbol: string; color: string; bg: string;
  education: string; relationship: string; career: string; health: string; money: string; personality: string; strengths: string[]; challenges: string[]; famous: string[]
}> = {
  1: {
    title: 'The Pioneer', symbol: '🌟', color: 'text-yellow-700', bg: 'bg-yellow-50 border-yellow-200',
    personality: 'You are a born leader — independent, ambitious, and fiercely original. Life Path 1 people do not follow; they forge paths where none existed. Your sense of self is unusually strong, which is simultaneously your greatest asset and the source of your most persistent challenges. You were designed to start things: businesses, movements, conversations, revolutions.',
    education: 'You are a self-directed learner who thrives when given autonomy. Traditional education that emphasizes conformity frustrates you; you do best when allowed to pursue subjects with genuine depth and individual mastery. Your ideal learning environment is one where you can ask "why" as many times as you need to. You absorb knowledge rapidly when it connects to something you actually care about, and with unusual difficulty when it doesn\'t. Many Life Path 1 people do their most significant learning outside formal institutions — through experience, through mentorship, through the particular education of building something from nothing.',
    relationship: 'In relationships, your independence is the central dynamic. You need a partner who is secure enough not to feel threatened by your drive, and perceptive enough to distinguish between your self-sufficiency and emotional distance — because these are genuinely different things, even though they can look similar from the outside. You love deeply but not submissively. The relationships that work best for you are those built on mutual respect for individuality. You are most attracted to people who have their own direction in life and aren\'t looking for you to provide theirs.',
    career: 'The word "entrepreneurship" was coined to describe you. Whether or not you start a business in the literal sense, you operate with an entrepreneurial mindset — you see possibilities, you take initiative, you prefer to set direction rather than follow it. Careers that give you ownership, autonomy, and visible leadership are where you thrive. The corporate ladder may suit you if it leads somewhere that feels like genuine authority; otherwise, the pull toward building your own thing will be persistent and eventually irresistible.',
    health: 'Your primary health challenge is the relationship between your drive and your physical limits. You are prone to pushing through exhaustion with willpower, treating your body as a vehicle for your ambitions rather than as a partner in them. The health practices that serve you best are those you can commit to with the same intensity you bring to everything else: a training regimen, a dietary discipline, a meditation practice. Not dabbling — mastery. Also important: learning to recognize stress as data rather than an obstacle to push through. Your body will give you accurate information about what is and isn\'t sustainable if you develop the habit of listening to it.',
    money: 'Money is a tool for you, not a goal — and this distinction is important. You are capable of generating significant wealth when your financial energy is directed well, but you are not naturally oriented toward wealth preservation. The risk for Life Path 1 is the tendency to bet everything on a vision, to move too fast in financial decisions, to underestimate the value of patience. Your best financial outcomes come from channeling your pioneering instincts into genuinely new territory while building in deliberate safeguards against the overconfidence that can accompany strong vision.',
    strengths: ['Leadership', 'Originality', 'Courage', 'Self-sufficiency', 'Initiative'],
    challenges: ['Stubbornness', 'Impatience', 'Difficulty receiving help', 'Ego'],
    famous: ['Steve Jobs', 'Martin Luther King Jr.', 'Lady Gaga', 'Nikola Tesla']
  },
  2: {
    title: 'The Diplomat', symbol: '☯️', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200',
    personality: 'You are the soul of partnership — sensitive, perceptive, and gifted with an emotional intelligence that allows you to navigate human dynamics with unusual skill. Life Path 2 people feel things deeply and process the world through relationship. Your power is quiet but profound: you are the one who holds groups together, who senses what is unspoken, who finds the path to agreement when others see only conflict.',
    education: 'You learn best in collaborative, supportive environments where relationships with teachers and classmates matter. The emotional temperature of your learning environment affects your performance more than most people realize. You absorb information through dialogue and discussion; a lecture format is less effective for you than a seminar. Your ideal educational experience involves mentorship rather than instruction — a teacher who sees you personally. You have a particular gift for subjects that require empathy and nuance: psychology, literature, the humanities, conflict resolution, counseling.',
    relationship: 'Love is central to your life in a way that is not incidental but structural. Relationships are not something you have alongside your real life; they are the architecture of your real life. You are a genuinely devoted partner — attentive, sensitive, supportive. The challenge is the flip side of these gifts: a tendency toward codependence, difficulty maintaining independent identity within close relationships, and a sensitivity to conflict that can lead to avoiding necessary confrontations. Your healthiest relationships are those in which your partner actively encourages your separateness.',
    career: 'You excel in roles that require collaboration, mediation, and human sensitivity. Counseling, diplomacy, human resources, team coordination, healthcare, the arts — these are natural environments for your gifts. You are often the invisible glue in organizations: the person whose departure would reveal how much the culture depended on their presence. Career satisfaction for you is tied closely to the quality of your relationships at work; a toxic workplace affects your performance and wellbeing far more than it does for other life path numbers.',
    health: 'Your primary health concern is emotional absorption — taking on the feelings and stress of those around you as though they were your own. This is both a gift (empathy) and a vulnerability (emotional depletion). Practices that help you distinguish between your own emotional states and those you\'ve absorbed from others are valuable: regular solitude, clear energetic boundaries, physical practices that help you feel settled in your own body. You may be prone to stress-related health issues because your nervous system responds to interpersonal friction as a physical threat.',
    money: 'Your relationship with money is complicated by your relational orientation. You are generous to a fault, sometimes to the point of financial self-harm. You are also risk-averse — preferring security over opportunity — which can limit upside but does protect against the worst outcomes. Your best financial path involves both structures that make generosity sustainable (budgeted giving, clear personal financial floors) and partnerships that bring complementary financial strengths.',
    strengths: ['Empathy', 'Diplomacy', 'Cooperation', 'Intuition', 'Patience'],
    challenges: ['Oversensitivity', 'Indecision', 'People-pleasing', 'Fear of conflict'],
    famous: ['Barack Obama', 'Diana Princess of Wales', 'Bill Clinton', 'Jennifer Aniston']
  },
  3: {
    title: 'The Creative', symbol: '🎨', color: 'text-pink-700', bg: 'bg-pink-50 border-pink-200',
    personality: 'You are expression itself — gifted with creativity, communication, and a joy in living that others find irresistible and slightly incomprehensible. Life Path 3 is the number of the artist, the communicator, the entertainer. You experience life in full color while others are processing in black and white. The challenge is to channel this abundance of expression without scattering it.',
    education: 'Your educational experience depends enormously on whether it engaged your creativity. When it did, you were a star; when it didn\'t, you drifted or underperformed relative to your actual intelligence. You learn through making, expressing, and communicating — the act of creating something is also, for you, the act of understanding it. Traditional rote learning is among the least effective approaches for you. Your ideal educational environment is one that tolerates, and ideally celebrates, unconventional approaches to problems.',
    relationship: 'You are charming, expressive, and magnetic — and you know it, which is both charming and occasionally exhausting for your partners. In relationships, you bring enormous energy, playfulness, and a genuine gift for making ordinary moments feel special. The challenge is depth: the Life Path 3 tendency toward the surface, toward the next interesting thing, can undermine the sustained commitment that deep relationships require. Your best partners are those who match your energy and enthusiasm while also providing the grounding that helps you go deep.',
    career: 'You are wasted in any role that doesn\'t allow you to communicate, create, or connect with people. Writing, performing, speaking, designing, teaching, sales, marketing, therapy, coaching — these are your natural habitats. The risk is the opposite of most people\'s career challenge: not lack of talent, but failure to develop the discipline and focus that allows talent to produce lasting work. Many Life Path 3 people are extraordinarily gifted but leave a trail of started-and-abandoned projects. The ones who succeed are those who develop the complementary skills of follow-through and strategic focus.',
    health: 'You are generally vital and energetic, but vulnerable to periods of low mood when your creative expression is blocked or suppressed. Depression in Life Path 3 people often looks like flatness — a loss of the characteristic color and enthusiasm that others recognize as your signature. Keeping creative expression active is not optional self-care for you; it is primary health maintenance. Physical health is best maintained through activities that are also joyful — dance, sport, group fitness, anything that doesn\'t feel like medicine.',
    money: 'Money and the Life Path 3 relationship is typically complicated by your optimism. You are not naturally oriented toward financial prudence — the assumption that things will work out tends to persist even when evidence suggests otherwise. This can work spectacularly well (you attract opportunity through charisma and creative confidence) or spectacularly badly (you ignore warning signs until they become crises). Systems that automate financial discipline — automatic savings, structured investment — are worth more to you than financial education alone.',
    strengths: ['Creativity', 'Communication', 'Optimism', 'Charisma', 'Humor'],
    challenges: ['Scattered focus', 'Superficiality', 'Financial inconsistency', 'Avoiding difficult emotions'],
    famous: ['Elvis Presley', 'David Bowie', 'Celine Dion', 'John Travolta']
  },
  4: {
    title: 'The Builder', symbol: '🏗️', color: 'text-green-700', bg: 'bg-green-50 border-green-200',
    personality: 'You are the architect of reality — systematic, disciplined, and capable of building things that last. Life Path 4 is the number of the builder, the organizer, the one who takes the beautiful idea and makes it real through sustained effort. Where others see a vision, you see the steps. Where others get excited about the beginning, you see all the way to the end — and you\'re not intimidated by the middle.',
    education: 'You are the student that teachers appreciate: methodical, thorough, reliable. You do the reading. You take notes. You prepare. This conscientiousness serves you well in formal education, but it can also make you risk-averse in learning — you prefer mastering what is established over exploring what is uncertain. Your ideal educational experience builds deep competence in a structured domain. You excel in fields with clear standards: engineering, accounting, law, medicine, architecture — any field where there are definitive right answers and the path to them is knowable.',
    relationship: 'In relationships, you are the steady anchor that partners either deeply appreciate or feel constrained by — depending on what they need. You are dependable in a way that is not performative; you follow through because it doesn\'t occur to you not to. You show love through action more than words: the maintained car, the booked reservation, the remembered preference. The challenge is flexibility — your preference for structure and predictability can make you resistant to the spontaneity and change that relationships inevitably require.',
    career: 'You are most effective in roles that require sustained effort toward a defined outcome. Project management, engineering, finance, administration, construction, law — anywhere that rewards the ability to take a complex problem and solve it through organized, systematic effort. You may not be the most charismatic leader in the room, but you are frequently the one who actually delivers. Career satisfaction for you is tied to tangible outcomes: you need to be able to see what your work has built.',
    health: 'Your health risks are primarily stress-related — the accumulation of responsibility and the difficulty of delegating or resting. You can work until you break rather than recognizing the warning signs. Building structured recovery into your schedule — not as a reward for productivity but as a non-negotiable component of your operating system — is the key health practice. Physical exercise is valuable for you partly as stress relief, but the routine quality of it is equally important: the same practice, regularly.',
    money: 'This is your natural domain. Life Path 4 people build wealth the way they build everything else: methodically, patiently, and without drama. You understand compound interest not as a concept but as a philosophy. The risk is not imprudence — it is excessive caution that keeps you in positions below your actual potential. Learning to tolerate calculated risk, to distinguish between recklessness and reasonable opportunity, expands your financial ceiling significantly.',
    strengths: ['Discipline', 'Reliability', 'Thoroughness', 'Practicality', 'Loyalty'],
    challenges: ['Rigidity', 'Workaholism', 'Difficulty with change', 'Emotional suppression'],
    famous: ['Bill Gates', 'Warren Buffett', 'Oprah Winfrey', 'Clint Eastwood']
  },
  5: {
    title: 'The Adventurer', symbol: '🌍', color: 'text-orange-700', bg: 'bg-orange-50 border-orange-200',
    personality: 'You are freedom itself — curious, adaptable, and magnetically drawn to the new, the interesting, and the unexplored. Life Path 5 is the number of adventure, sensory experience, and the refusal to be contained. You process life through direct experience; concepts without embodiment feel hollow to you. The world is your classroom, and you intend to attend all of it.',
    education: 'Formal education was likely a mixed experience — brilliant when the subject caught your interest, disengaged or disruptive when it didn\'t. You learn by doing, by traveling, by talking to people who know things you don\'t yet know. The best education you\'ve received has probably happened outside classrooms. Your ideal learning is experiential and multisensory — travel, practice, apprenticeship, direct conversation with experts. You absorb information rapidly when it connects to real-world application, and with equally rapid disinterest when it doesn\'t.',
    relationship: 'Freedom is the non-negotiable condition of your happiness, and your relationships reflect this. You need partners who are genuinely secure in themselves, because your need for variety and new experience can look like dissatisfaction to someone who interprets it personally. You are most committed when you don\'t feel trapped — paradoxically, partners who give you the most freedom tend to keep you longest. The risk is using the language of freedom to avoid the genuine vulnerability that real intimacy requires.',
    career: 'The traditional career path — decades in one organization, one function — is not designed for you. You thrive in roles that involve variety, travel, interaction with many different people, and the permission to change directions when the current one is fully explored. Sales, journalism, consulting, entrepreneurship, the performing arts, international work — these are your environments. Career longevity comes from finding roles that consistently provide novelty within a broader structure, or from building a portfolio of projects rather than a single career.',
    health: 'You are generally physically energetic and drawn to physical experience, which serves your health well. The risks are excess — the Life Path 5 tendency to indulge sensory experience can extend to overindulgence in substances, food, or sexual experience. Cultivating conscious relationship with sensory pleasure — enjoying it fully rather than escaping into it — is the key health practice. Adventure that includes physical challenge (hiking, travel, physical sport) is health practice in the deepest sense for you.',
    money: 'Your financial pattern tends toward feast and famine, reflecting your cyclical engagement with things. When focused on a financial goal, you can generate income with remarkable speed. When not focused, money tends to flow in and out without accumulation. Systems that capture and hold financial gains during high-income periods — automatic investment, pre-committed savings — are more valuable for you than any amount of financial discipline, because they work without requiring sustained attention.',
    strengths: ['Adaptability', 'Curiosity', 'Courage', 'Charisma', 'Resourcefulness'],
    challenges: ['Restlessness', 'Overindulgence', 'Inconsistency', 'Avoidance of depth'],
    famous: ['Abraham Lincoln', 'Mick Jagger', 'Steven Spielberg', 'Angelina Jolie']
  },
  6: {
    title: 'The Nurturer', symbol: '💚', color: 'text-teal-700', bg: 'bg-teal-50 border-teal-200',
    personality: 'You are love in action — caring, responsible, and deeply committed to the wellbeing of those in your circle. Life Path 6 is the number of the nurturer, the healer, the teacher. You feel a genuine sense of responsibility for the people in your life that is not obligation but calling. The challenge is that this gift, without boundaries, becomes a form of self-erasure.',
    education: 'You are a conscientious, motivated student in subjects that connect to human wellbeing and service. Psychology, education, healthcare, social work, the arts — these draw your natural investment. You are often the student who stays after class, who does the extra reading, who checks whether classmates understand before moving on. The challenge is that you may undervalue subjects that don\'t have an obvious connection to helping people — and the breadth of genuine education can be lost when filtered exclusively through a service lens.',
    relationship: 'Relationships are your deepest area of both gift and challenge. You are a devoted partner and parent — attentive, supportive, willing to sacrifice for those you love. The risk is that this devotion can tip into control (the belief that loving means managing) or into martyrdom (the sacrifice of self in service of others\' wellbeing). The healthiest version of Life Path 6 in relationships has clear boundaries: giving generously from a full cup rather than an empty one.',
    career: 'Teaching, healthcare, counseling, social work, veterinary medicine, parenting as a professional role, community organization, the helping professions broadly — these are natural homes. You are most effective in roles that allow you to see direct impact on specific people. Abstract or impersonal work doesn\'t engage your deepest motivation. The risk is choosing work that drains you because it appears selfless, without recognizing that sustainable service requires personal resources.',
    health: 'Your greatest health challenge is neglecting yourself while caring for others. You are the person who reminds everyone else to drink water and then forgets to drink it yourself. Self-care for Life Path 6 is not indulgence — it is the maintenance of the resource that your generosity depends on. Physical health is best supported by practices that feel genuinely restorative: not punishing exercise but nourishing movement, not restrictive diets but genuinely pleasurable nutrition.',
    money: 'Your relationship with money is colored by your values — you are generous to the point of impracticality, and genuinely uncomfortable with accumulation that feels disproportionate to contribution. This is admirable but can create financial vulnerability. The financial practice that serves you best is making provision for others part of your financial system — not as charity that competes with your own needs, but as a designed component of a healthy financial life that includes both self-provision and generosity.',
    strengths: ['Nurturing', 'Responsibility', 'Harmony-seeking', 'Generosity', 'Artistic sensitivity'],
    challenges: ['Perfectionism', 'Self-sacrifice', 'Over-involvement', 'Difficulty receiving'],
    famous: ['Albert Einstein', 'Michael Jackson', 'John Lennon', 'Eleanor Roosevelt']
  },
  7: {
    title: 'The Seeker', symbol: '🔮', color: 'text-purple-700', bg: 'bg-purple-50 border-purple-200',
    personality: 'You are the eternal questioner — analytical, introspective, and drawn to the depths of things that others skim the surface of. Life Path 7 is the number of the philosopher, the mystic, the scientist of inner and outer reality. You do not accept conventional answers; you investigate. You do not perform connection; you seek genuine meeting of minds and souls.',
    education: 'You are a naturally gifted student when the subject genuinely interests you — which is your standard rather than a performance. When interested, you absorb with unusual depth and make connections that others miss. When uninterested, you are genuinely somewhere else in your head, regardless of physical presence. Your ideal education involves genuine intellectual challenge, permission to ask fundamental questions, and teachers who meet you with equivalent depth. Many Life Path 7 people are essentially autodidacts regardless of formal credentials — the real education happened in solitary reading and contemplation.',
    relationship: 'You are not easy to know, and you know it. The depth you seek requires time and trust that most people don\'t extend before you\'ve given them reasons to — and you don\'t give reasons until trust is established. This paradox creates a loneliness that is both painful and, in some sense, chosen. The relationships that work for you are rare, but when they happen they are among the most genuinely intimate and intellectually alive of any life path. You need a partner who is also a genuine intellectual companion.',
    career: 'Research, academia, philosophy, psychology, spirituality, analysis, technology (especially at the theoretical level), medicine, writing, investigative journalism — these are your domains. You do some of your best thinking alone, which makes roles that require sustained collaboration challenging. The ideal career structure for a Life Path 7 involves significant solitary work time with occasional deep collaboration. You are not suited to high-volume, high-velocity roles that don\'t allow for depth.',
    health: 'The life of the mind, without adequate attention to the body that houses it, is a risk for Life Path 7. You can go long periods engaged with ideas while failing to notice physical signals that something needs attention. Regular physical practice — ideally contemplative as well as active, like yoga, martial arts, or trail running — addresses both the need for movement and the need for the embodied presence that grounds your characteristically airborne consciousness.',
    money: 'You have a complex relationship with money because money, in itself, doesn\'t engage your interest. The Life Path 7 characteristic combination of intelligence and impracticality can produce either significant wealth (when the intellectual gifts are directed toward financially productive problems) or genuine material insecurity (when they are not). The key is recognizing that financial stability is a prerequisite for the intellectual freedom you most deeply value.',
    strengths: ['Analytical depth', 'Intuition', 'Spiritual intelligence', 'Research ability', 'Wisdom'],
    challenges: ['Social isolation', 'Perfectionism', 'Skepticism to a fault', 'Material impracticality'],
    famous: ['Leonardo DiCaprio', 'Elon Musk', 'Bruce Lee', 'Princess Diana']
  },
  8: {
    title: 'The Achiever', symbol: '💎', color: 'text-indigo-700', bg: 'bg-indigo-50 border-indigo-200',
    personality: 'You are power, ambition, and the capacity to materialize vision into reality at scale. Life Path 8 is the number of achievement, authority, and the mastery of the material world. You understand power — how it works, how to acquire it, how to use it — with an intuitive clarity that others spend careers trying to develop. The challenge is using this understanding in service of something genuinely worthy.',
    education: 'You are a purposeful learner — most engaged when you can see the application. Theoretical knowledge without practical utility bores you quickly. You excel in business, law, finance, medicine, engineering — fields where competence translates directly into outcomes. Your leadership qualities emerge early in educational settings: you are often running things before anyone officially appointed you to do so.',
    relationship: 'Your ambition is not separate from your relationships — it is part of what your partners must navigate. The best partners for a Life Path 8 are those who have their own strong sense of identity and purpose; your energy is powerful enough to overshadow someone whose sense of self is less defined. You show love through provision, through protecting those you care about, through making the material world safer and more comfortable for them. The challenge is learning that what your partner may most need is presence and emotional attunement rather than material provision.',
    career: 'Business ownership, executive leadership, finance, law, real estate, politics, organizational management — these are your domains. You are not comfortable being managed by someone less capable than you (and you notice this quickly), so environments that recognize and reward performance with genuine authority are essential. You build significant things, and the career that fits you is one that is ultimately commensurate with your capacity to build.',
    health: 'The Life Path 8 health risk is straightforward: overwork and the belief that the body is something to be pushed rather than partnered with. The irony is that the efficiency orientation that drives your professional success applies here too — maintaining your health returns enormous dividends in sustained performance capacity. The investment in health is not a subtraction from productive time; it is the leverage that multiplies it.',
    money: 'This is your most natural domain. You have an innate understanding of how money works and how to create more of it. The risk is that the pursuit of financial success becomes the goal rather than the tool — and that the accumulation of material success leaves other dimensions of life underdeveloped. The Life Path 8 fully realized is not the person who has the most; it is the person who has translated material mastery into genuine life mastery.',
    strengths: ['Ambition', 'Leadership', 'Business acumen', 'Decisiveness', 'Material mastery'],
    challenges: ['Workaholism', 'Materialism', 'Control', 'Difficulty with vulnerability'],
    famous: ['Nelson Mandela', 'Richard Nixon', 'Pablo Picasso', 'Martha Stewart']
  },
  9: {
    title: 'The Humanitarian', symbol: '🌈', color: 'text-rose-700', bg: 'bg-rose-50 border-rose-200',
    personality: 'You are the completion of the cycle — compassionate, wise, and oriented toward the wellbeing of the collective rather than just the individual. Life Path 9 is the number of the humanitarian, the artist, and the one who has already lived through much of what others are still discovering. You carry a wisdom that feels earned rather than studied, because at some level it is.',
    education: 'You are a broad and genuinely curious learner, interested in the connections between disciplines rather than the depth of any single one. Interdisciplinary studies, the humanities, world history, the arts, philosophy — these speak to your natural inclinations. You learn as much from diverse human experience as from formal instruction. Travel and cultural immersion are education for you in the most fundamental sense.',
    relationship: 'Your relationships are colored by both profound capacity for love and the challenge of completion — the Life Path 9 quality of simultaneously wanting everything to be complete while knowing that nothing truly is. You love deeply, and you sometimes hold on past the point of healthy attachment because endings are genuinely painful for you. The healthiest version of your relational life involves learning to let cycles complete fully, releasing what is finished with grace.',
    career: 'The arts, humanitarian work, nonprofit leadership, counseling, medicine, education, international work, spiritual direction — these are your domains. You are most effective when the work connects to something larger than organizational metrics. The career that truly satisfies you has a cause at its center, not just a function.',
    health: 'The Life Path 9 health challenge is absorbing others\' suffering. Your empathy is so broad that it can extend to people you\'ve never met — you feel the weight of the world in ways that affect your wellbeing. Practices that help you stay present with specific situations rather than the full extent of human suffering serve you well. Completing things, rather than leaving them open — relationships, projects, conversations — reduces the background anxiety that incompletion creates.',
    money: 'You are generous by nature and genuinely oriented toward sharing rather than accumulating. The financial challenge is ensuring that your generosity is sustainable — that you are giving from abundance rather than from what you need yourself. Many Life Path 9 people discover financial stability later than other life paths, because the orientation toward giving precedes the establishment of personal sufficiency.',
    strengths: ['Compassion', 'Wisdom', 'Creativity', 'Idealism', 'Broad vision'],
    challenges: ['Impracticality', 'Emotional overabsorption', 'Completion difficulty', 'Martyrdom'],
    famous: ['Mahatma Gandhi', 'Jim Carrey', 'Mother Teresa', 'Yoko Ono']
  },
}

export default function CalculatorClient({ faqs }: Props) {
  const [name, setName] = useState('')
  const [dob, setDob] = useState('1990-06-15')
  const [generated, setGenerated] = useState(false)

  const calc = useMemo(() => {
    const reduce = (n: number): number => n < 10 ? n : reduce(String(n).split('').reduce((a,d) => a + Number(d), 0))
    const d = new Date(dob)
    if (isNaN(d.getTime())) return null
    const lifePath = reduce((d.getFullYear()) + (d.getMonth() + 1) + d.getDate())
    const letterVal = (c: string) => ((c.toUpperCase().charCodeAt(0) - 64) % 9) || 9
    const letters: string[] = Array.from(name.replace(/[^a-z]/gi, ''))
    const vowels: string[] = Array.from(name.replace(/[^aeiou]/gi, ''))
    const exprNum = name.trim() ? reduce(letters.reduce((s: number, c: string) => s + letterVal(c), 0)) : 0
    const soulNum = name.trim() ? reduce(vowels.reduce((s: number, c: string) => s + letterVal(c), 0) || 1) : 0
    const today = new Date()
    const todayNum = reduce(today.getFullYear() + today.getMonth() + 1 + today.getDate())
    const lucky: number[] = Array.from(new Set<number>([lifePath, (lifePath * 3) % 9 || 9, (lifePath + todayNum) % 9 || 9, (lifePath * 2 + d.getDate()) % 9 || 9])).slice(0, 4)
    return { lifePath, exprNum, soulNum, lucky, data: LIFE_PATH_DATA[lifePath] || LIFE_PATH_DATA[1] }
  }, [name, dob])

  const COLORS = ['bg-yellow-400','bg-pink-500','bg-purple-500','bg-blue-500','bg-green-500','bg-orange-500','bg-red-500','bg-indigo-500','bg-teal-500']
  const d = calc?.data

  return (
    <DevToolLayout title="Lucky Number Calculator" icon="🍀"
      description="Discover your numerology lucky numbers based on your birth date & name"
      category="Fun" parentPath="/fun" parentLabel="Fun & Entertainment">

      <div className="rounded-3xl border p-6 mb-6 space-y-4" style={{background:'rgba(255,255,255,0.82)',backdropFilter:'blur(10px)',borderColor:'rgba(226,232,240,0.7)'}}>
        <div><label className="text-xs font-bold text-gray-500 uppercase block mb-1.5">Your Name</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter your full name..."
            className="w-full border-2 border-gray-200 focus:border-yellow-400 rounded-xl px-4 py-3 text-lg focus:outline-none" /></div>
        <div><label className="text-xs font-bold text-gray-500 uppercase block mb-1.5">Date of Birth</label>
          <input type="date" value={dob} onChange={e => setDob(e.target.value)}
            className="w-full border-2 border-gray-200 focus:border-yellow-400 rounded-xl px-4 py-3 focus:outline-none" /></div>
        <button onClick={() => setGenerated(true)}
          className="w-full py-3 text-white font-black rounded-xl"
          style={{background:'linear-gradient(135deg,#f59e0b,#d97706)',boxShadow:'0 4px 16px rgba(245,158,11,0.3)'}}>
          🍀 Calculate My Lucky Numbers
        </button>
      </div>

      {calc && generated && d && (
        <div className="space-y-4">
          {/* Life Path Hero */}
          <div className={`rounded-2xl border-2 p-6 ${d.bg}`}>
            <div className="text-center mb-4">
              <div className="text-5xl mb-2">{d.symbol}</div>
              <div className={`text-7xl font-black mb-1 ${d.color}`}>{calc.lifePath}</div>
              <div className={`text-xl font-black mb-1 ${d.color}`}>{d.title}</div>
              <div className="text-gray-600 text-sm">Life Path Number</div>
            </div>
            {/* Lucky numbers */}
            <div className="mb-4">
              <p className="font-bold text-gray-700 mb-2 text-sm">✨ Your Lucky Numbers</p>
              <div className="flex gap-3">
                {calc.lucky.map((n, i) => (
                  <span key={i} className={`w-12 h-12 rounded-full ${COLORS[n-1]} text-white text-xl font-black flex items-center justify-center shadow-lg`}>{n}</span>
                ))}
              </div>
            </div>
            {name && (
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/60 p-3 text-center">
                  <div className="text-xs text-gray-500 font-bold uppercase">Expression Number</div>
                  <div className={`text-3xl font-black ${d.color}`}>{calc.exprNum}</div>
                  <div className="text-xs text-gray-400">from your name</div>
                </div>
                <div className="rounded-xl bg-white/60 p-3 text-center">
                  <div className="text-xs text-gray-500 font-bold uppercase">Soul Urge Number</div>
                  <div className={`text-3xl font-black ${d.color}`}>{calc.soulNum}</div>
                  <div className="text-xs text-gray-400">from vowels only</div>
                </div>
              </div>
            )}
          </div>

          {/* Personality */}
          <div className="rounded-2xl border p-5 bg-white">
            <h2 className="text-lg font-black text-gray-900 mb-3">🧠 Your Personality Profile</h2>
            <p className="text-gray-700 leading-relaxed text-sm">{d.personality}</p>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div><p className="text-xs font-bold text-green-600 uppercase mb-2">Strengths</p>
                {d.strengths.map(s => <div key={s} className="text-xs bg-green-50 border border-green-100 rounded-lg px-3 py-1.5 mb-1.5 text-green-700 font-semibold">✓ {s}</div>)}</div>
              <div><p className="text-xs font-bold text-orange-600 uppercase mb-2">Challenges</p>
                {d.challenges.map(s => <div key={s} className="text-xs bg-orange-50 border border-orange-100 rounded-lg px-3 py-1.5 mb-1.5 text-orange-700 font-semibold">→ {s}</div>)}</div>
            </div>
          </div>

          {/* 6 Section Breakdown */}
          {[
            { icon: '📚', title: 'Education & Learning Style', content: d.education },
            { icon: '❤️', title: 'Love & Relationships', content: d.relationship },
            { icon: '💼', title: 'Career & Professional Life', content: d.career },
            { icon: '🏥', title: 'Health & Wellbeing', content: d.health },
            { icon: '💰', title: 'Money & Financial Life', content: d.money },
          ].map(section => (
            <div key={section.title} className="rounded-2xl border p-5 bg-white">
              <h2 className="text-lg font-black text-gray-900 mb-3">{section.icon} {section.title}</h2>
              <p className="text-gray-700 leading-relaxed text-sm">{section.content}</p>
            </div>
          ))}

          {/* Famous people */}
          <div className="rounded-2xl border p-5" style={{background:'rgba(240,253,244,0.7)',borderColor:'rgba(187,247,208,0.6)'}}>
            <h2 className="text-lg font-black text-gray-900 mb-3">⭐ Famous Life Path {calc.lifePath} People</h2>
            <div className="flex flex-wrap gap-2">
              {d.famous.map(f => (
                <span key={f} className="px-3 py-1 bg-white rounded-full text-sm font-semibold text-gray-700 border border-gray-200">{f}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mt-12 space-y-6 max-w-2xl mx-auto">
        <section><h2 className="text-xl font-black text-gray-900 mb-3">About the Lucky Number Calculator</h2>
          <p className="text-gray-600 leading-relaxed">Numerology assigns meaning to numbers derived from your birth date and name — a practice with thousands of years of history across independent cultures. Your Life Path number comes from your birth date; your Expression number from your full name; your Soul Urge from only the vowels.</p>
        </section>
        <section><h2 className="text-xl font-black text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">{faqs.map(f => <details key={f.question} className="rounded-2xl border p-4" style={{background:'rgba(255,255,255,0.8)'}}><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
        </section>
        <SEOContent title="" category="fun"
          intro="Lucky number calculation through numerology reduces your birth date or name to a single digit — a practice spanning millennia across cultures from Pythagoras to Chinese numerology."
          howItWorks="Sum all digits of your birthdate (day + month + year) and reduce to a single digit. Each Life Path number 1–9 carries deep personality, career, relationship, health, and financial insights."
          tipsSection="Use numerology as a reflective tool rather than a predictive one. The most valuable reading comes from seeing where your Life Path, Expression, and Soul Urge numbers agree or conflict."
          conclusion="Lucky numbers tell us as much about our pattern-seeking minds as about any external reality. Enjoy this as both folklore and genuine self-reflection."
          benefits={[{title:'Instant insights',text:'Get your complete numerology profile instantly.'},{title:'Free forever',text:'No signup, no ads, no tracking.'}]}
          useCases={[{title:'Self-reflection',text:'Use your reading to explore your natural tendencies.'},{title:'Sharing',text:'Compare readings with friends and partners.'}]} />
      </div>
    </DevToolLayout>
  )
}
