'use client'
import { Card } from '@/components/ui/Card'
import { DevToolLayout } from '@/components/ui/DevToolLayout'
import { SEOContent } from '@/components/ui/SEOContent'
import { useState, useRef } from 'react'

interface Props { faqs: { question: string; answer: string }[] }

const EXCUSES = [
  // Weather
  "It's too hot to exercise — I could literally die.",
  "It's too cold — my muscles would seize up before I left the door.",
  "It's raining, and wet gym clothes are a breeding ground for regret.",
  "There's a chance of clouds and I don't want to risk it.",
  "The sun is at a difficult angle today.",
  "Weather app says 'partly cloudy' and I need clarity to exercise.",
  "It's too perfect outside and I'd feel bad sweating in it.",
  "Humidity is at 47% which is the exact level I find most discouraging.",
  // Body
  "My left elbow made a sound yesterday.",
  "I think I'm coming down with something — better rest to fight it off.",
  "My shoe feels slightly tighter than usual.",
  "I slept on my neck funny and everything is compromised.",
  "I'm still sore from that time I exercised three weeks ago.",
  "My body is clearly telling me to rest today.",
  "My back feels like it's 'thinking about hurting'.",
  "My knee gave me a look this morning that I'm not sure about.",
  "I have a headache — or I'm about to. I can feel the potential.",
  "I think I'm over-trained. Rest days are important for gains.",
  "My left nostril is slightly blocked and cardio would be hard.",
  "My hair looks too good to ruin with sweat.",
  // Scheduling
  "I'll go tomorrow. Tomorrow is my day.",
  "I'm saving my energy for a big workout this weekend.",
  "I need to digest my lunch for 4-6 more hours.",
  "I was going to go but I sat down and the momentum was lost.",
  "The gym is probably crowded right now.",
  "The gym is probably empty and that feels sad.",
  "I'd have to shower after and I just showered.",
  "It's too close to bedtime. Exercise would keep me awake.",
  "It's too soon after waking up. My cortisol needs to settle.",
  "I need to wait until I'm in the 'right mindset'.",
  "The timing doesn't feel right today. Tomorrow the timing will be right.",
  "I need to finish just one more episode first.",
  "I was going to go but something came up... specifically, sitting.",
  // Equipment & logistics
  "I don't have my gym bag packed.",
  "My water bottle is dirty and rehydration is essential.",
  "My headphones aren't charged and I can't exercise without music.",
  "I need new gym shoes before I can start again.",
  "The road to the gym has construction I'm not prepared for emotionally.",
  "My gym is 12 minutes away and that commute feels significant.",
  "My gym towel is in the wash.",
  "I need to find my gym membership card first.",
  "I'd need to buy a new workout outfit to feel motivated.",
  "I don't have a post-workout meal prepared and the anabolic window is real.",
  // Philosophical
  "The ancient Stoics believed rest was equally noble to effort.",
  "Overexercise is a real thing and I'm protecting against it.",
  "Science says the body repairs during rest. I'm being scientific.",
  "Quality over quantity. Today's workout quality would be poor.",
  "The universe is sending me signals and they all say 'couch'.",
  "I read that some elite athletes take more rest days than training days.",
  "There's a fine line between dedication and obsession and I'm being mindful.",
  "My mental health matters too, and today the sofa is my therapy.",
  "I'm going to meditate instead, which is basically yoga but horizontal.",
  "I'm taking a holistic approach to wellness today.",
  "I watched a workout documentary. That counts as passive fitness.",
  "I thought about going to the gym. Visualization is a valid training method.",
  // Food & nutrition
  "I ate too much and exercise would be uncomfortable.",
  "I ate too little and exercise would be dangerous.",
  "My pre-workout would interact with my afternoon coffee in unknown ways.",
  "I need to carb-load first and that process takes approximately 48 hours.",
  "I'm intermittent fasting and my eating window closed.",
  "I haven't had enough protein today so any gains would be hypothetical.",
  "I'm in a caloric deficit and don't want to risk going too low.",
  "I'm in a caloric surplus and need to rest for maximum absorption.",
  // Existential
  "What even is fitness in the grand scope of geological time?",
  "The muscles I'd build today will eventually return to stardust anyway.",
  "Exercise extends life but more life means more days where I might not want to exercise.",
  "I've been thinking about whether effort is really effort if it's chosen.",
  "My resting heart rate already seems fine.",
  "The gym will still be there tomorrow. It's very unlikely to move.",
  "I'm a work in progress. Today is a rest chapter.",
  "If the universe wanted me to run, it wouldn't have invented Uber.",
  "I'm not lazy. I'm conserving cellular ATP for genuinely important moments.",
  "I just reorganized my workout playlist. That's exercise-adjacent.",
  // Social
  "My workout partner cancelled so it wouldn't count the same.",
  "Someone I know goes to that gym and I'd have to make conversation.",
  "I'd have to change in the locker room and I'm not emotionally ready.",
  "The gym has mirrors everywhere and I prefer to live with uncertainty.",
  "I saw someone at the gym once who breathed very loudly and I can't.",
  "I'd have to wait for equipment and patience is a limited resource.",
  "There's a type of person at my gym who gives unsolicited form advice.",
  // Creative
  "Mercury is in retrograde and my tendons respond to that.",
  "My horoscope said to protect my energy today.",
  "I had a dream about the gym and feel like I already went.",
  "A bird flew into my window earlier and I'm taking it as a sign.",
  "I checked the moon phase and it's not optimal for muscle fiber recruitment.",
  "My Fitbit is at 8,000 steps and I'm protecting the symmetry of an even number.",
  "I planted a succulent today. Gardening is technically resistance training.",
  "I walked to the fridge twice. That's already more than yesterday.",
  "I did air squats while my microwave counted down. Full body workout.",
  "I went to the gym in my heart.",
  // Time management
  "I lost track of time researching the optimal workout routine to start next week.",
  "By the time I change and get there, I'd only have 40 minutes. Not worth it.",
  "I'm waiting until I have a full uninterrupted 2 hours of workout time.",
  "I need to research which exercises are best before I do any of them.",
  "I want to start fresh on Monday when everything will be aligned.",
  "January is coming and I'll be properly motivated then.",
  "The evening commute will have made the gym too crowded by now.",
  "I'll go after this work thing wraps up... which may be never.",
  "I set my alarm for 6am but my deeper self knows 6am is a time for sleeping.",
]

const CATEGORIES = ['All', 'Weather', 'Body', 'Scheduling', 'Equipment', 'Philosophical', 'Food', 'Existential', 'Social', 'Creative', 'Time']

export default function CalculatorClient({ faqs }: Props) {
  const [excuse, setExcuse] = useState('')
  const [category, setCategory] = useState('All')
  const usedRef = useRef(new Set<number>())

  const filteredExcuses = category === 'All' ? EXCUSES : EXCUSES.filter((_, i) => {
    const cat = CATEGORIES.find(c => c !== 'All' && EXCUSES.slice(CATEGORIES.indexOf(c) * 10, (CATEGORIES.indexOf(c) + 1) * 10).includes(EXCUSES[i]))
    return cat === category
  })

  function generate() {
    const pool = EXCUSES
    if (usedRef.current.size >= pool.length) usedRef.current.clear()
    let idx: number
    do { idx = Math.floor(Math.random() * pool.length) } while (usedRef.current.has(idx))
    usedRef.current.add(idx)
    setExcuse(pool[idx])
  }

  function share() {
    const text = `🏋️ My workout excuse today:\n\n"${excuse}"\n\nGenerate yours: tooltrio.com/fun/workout-excuse-generator`
    if (navigator.share) navigator.share({ title: 'Workout Excuse', text })
    else navigator.clipboard.writeText(`"${excuse}"`).then(() => alert('Copied!'))
  }

  return (
    <DevToolLayout title="Workout Excuse Generator" icon="🏋️"
      description={`${EXCUSES.length}+ creative workout excuses — for entertainment only, we promise`}
      category="Fun" parentPath="/calculators/fun" parentLabel="Fun & Entertainment">

      <div className="rounded-xl border p-3 bg-amber-50 border-amber-200 text-xs text-amber-800 mb-4">
        😄 For entertainment only. Exercise is genuinely good for you. Please also exercise.
      </div>

      <div className="text-center mb-6">
        <button onClick={generate}
          className="w-full py-5 text-white font-black text-xl rounded-2xl mb-2 transition-all hover:-translate-y-1"
          style={{background:'linear-gradient(135deg,#f97316,#ea580c)',boxShadow:'0 8px 24px rgba(249,115,22,0.35)'}}>
          🏋️ Generate My Excuse
        </button>
        <p className="text-xs text-gray-400">{EXCUSES.length}+ excuses · New one every time</p>
      </div>

      {excuse && (
        <div className="rounded-3xl border-2 p-8 text-center mb-6" style={{background:'linear-gradient(135deg,rgba(255,247,237,0.9),rgba(254,237,213,0.6))',borderColor:'rgba(251,146,60,0.4)'}}>
          <div className="text-5xl mb-4">🏋️</div>
          <p className="text-xl font-black text-orange-900 leading-relaxed italic mb-4">"{excuse}"</p>
          <div className="flex gap-2 justify-center">
            <button onClick={share} className="px-4 py-2 text-sm font-bold rounded-xl bg-orange-500 text-white hover:bg-orange-600">📤 Share Excuse</button>
            <button onClick={() => navigator.clipboard.writeText(`"${excuse}"`).then(() => alert('Copied!'))} className="px-4 py-2 text-sm font-bold rounded-xl border-2 border-orange-300 text-orange-700 hover:bg-orange-50">📋 Copy</button>
            <button onClick={generate} className="px-4 py-2 text-sm font-bold rounded-xl border-2 border-orange-300 text-orange-700 hover:bg-orange-50">↺ New Excuse</button>
          </div>
        </div>
      )}

      {/* Browse all */}
      <div className="rounded-2xl border p-4 bg-white">
        <p className="text-xs font-bold text-gray-500 uppercase mb-3">Browse All {EXCUSES.length} Excuses</p>
        <div className="max-h-64 overflow-y-auto space-y-2">
          {EXCUSES.map((e, i) => (
            <button key={i} onClick={() => setExcuse(e)}
              className="w-full text-left text-sm text-gray-700 p-2 rounded-lg hover:bg-orange-50 transition-all">
              "{e}"
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12 space-y-6 max-w-2xl mx-auto">
        <SEOContent title="" category="fun"
          intro={`${EXCUSES.length}+ creative, absurd, and painfully relatable workout excuses across 10 categories — weather, body complaints, scheduling conflicts, equipment issues, philosophical objections, food timing, existential crises, social anxieties, creative interpretations, and time management failures.`}
          howItWorks="Click generate and receive a randomly selected workout excuse. Share it with friends, use it in good humor, or let it remind you of all the ways the human brain avoids discomfort."
          tipsSection="If you find yourself genuinely using these, here's the actual advice: commit to just 5 minutes. Almost always, once you start, you continue. The barrier is the start, not the workout."
          conclusion="The only workout you regret is the one you didn't do. But this generator understands why you didn't."
          benefits={[{title:`${EXCUSES.length}+ excuses`,text:'Something for every situation and season.'},{title:'10 categories',text:'Philosophical, existential, weather-related, and more.'}]}
          useCases={[{title:'Humor',text:'Share with gym friends for a laugh.'},{title:'Self-awareness',text:'Recognize your own excuse patterns.'}]} />
        <section><h2 className="text-xl font-black text-gray-900 mb-4">FAQ</h2>
          <div className="space-y-3">{faqs.map(f => <details key={f.question} className="rounded-2xl border p-4"><summary className="font-semibold cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3">{f.answer}</p></details>)}</div>
        </section>
      
      <div className="mt-6">
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Using the workout excuse generator result</h2>
          <div className="space-y-3 text-sm leading-6 text-gray-600">
            <p>Interpret the output together with the values entered in the calculator. The result is based on the calculator&apos;s implemented calculation and the values supplied.</p>
            <p>For a useful comparison, change one input at a time while keeping the other assumptions constant. This makes the effect of each input easier to distinguish.</p>
          </div>
        </Card>
      </div>
</div>
    </DevToolLayout>
  )
}
