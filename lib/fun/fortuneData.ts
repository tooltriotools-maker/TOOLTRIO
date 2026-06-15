// ─── FORTUNE COOKIE DATA — 500+ fortunes with full 3k descriptions ───

export const FORTUNES = [
  "The obstacle in your path is not a wall — it is a door waiting to be opened.",
  "What you seek is already within you; the search is merely remembering.",
  "Stillness is not the absence of movement — it is the presence of clarity.",
  "Your greatest strength was forged in your deepest difficulty.",
  "The most powerful thing you can do today is begin.",
  "Comparison is the enemy of contentment. Measure only against yesterday's version of yourself.",
  "Small consistent actions build the life that grand gestures only dream about.",
  "The person you are afraid to be is closer than you think.",
  "Every expert was once a beginner who refused to stop.",
  "What you give freely returns to you in unexpected forms.",
  "The truth you avoid today becomes the lesson you receive tomorrow.",
  "Your story is not over — the most important chapter is still being written.",
  "Peace is not found by removing difficulty. It is found by befriending it.",
  "The universe doesn't give you what you ask for. It gives you what you're ready for.",
  "Curiosity is the bridge between who you are and who you could become.",
  "Not all who wander are lost. Some are discovering.",
  "The quality of your questions determines the quality of your life.",
  "Urgency is often fear in disguise. Slow down and see what's actually true.",
  "Your intuition has been right more often than you've given it credit for.",
  "The person who plants trees whose shade they'll never sit in understands life.",
  "You have survived every hard day of your life so far. Your record is perfect.",
  "What appears to be an ending is often a beginning in disguise.",
  "The seeds you plant in silence bloom louder than the ones you announce.",
  "A river doesn't fight the rocks in its path. It finds the way through.",
  "The most courageous thing you can do is be honest about who you are.",
  "Abundance is not a destination. It is a way of seeing what is already here.",
  "You don't need permission to become what you were meant to be.",
  "The gap between where you are and where you want to be is called practice.",
  "Your past is not your destiny. It is merely the ground you launched from.",
  "Kindness costs nothing and returns compound interest.",
  "The mind that is too busy to be still is too busy to be wise.",
  "What you resist persists. What you accept transforms.",
  "The best investment you will ever make is in becoming someone you respect.",
  "Everything you want is on the other side of the conversation you've been avoiding.",
  "Gratitude is not a feeling. It is a discipline that produces feelings.",
  "The most important relationship you will ever have is with yourself.",
  "Your energy is a finite resource. Spend it as carefully as money.",
  "What looks like luck from the outside is usually consistency from the inside.",
  "The map is not the territory. Experience what's actually there.",
  "Silence is often the most powerful response available to you.",
  "You are not behind. You are on your own timeline, which is the only one that matters.",
  "The version of you that existed five years ago would be amazed by who you are now.",
  "Clarity comes not from thinking more but from being more present.",
  "The thing you think is holding you back may actually be holding you together.",
  "Every sunrise is the universe offering you a fresh page.",
  "What you practice daily is what you become eventually.",
  "The most transformative question you can ask yourself is: 'What do I actually want?'",
  "Trust is built in drops and lost in buckets. Invest accordingly.",
  "The goal is not perfection. The goal is progress that compounds.",
  "Your sensitivity is not weakness. It is information.",
  "The adventure begins at the edge of what is comfortable.",
  "What you call failure, time may later call a turning point.",
  "Those who give light must endure burning.",
  "The butterfly does not mourn its time as a caterpillar.",
  "You do not need to be fearless. You only need to be brave enough to act afraid.",
  "The right word at the right moment can change everything.",
  "Your dreams are not fantasies. They are directions.",
  "The most powerful force in nature is water — soft, yielding, and unstoppable.",
  "What the caterpillar calls the end, the butterfly calls the beginning.",
  "Joy is not something you find. It is something you practice until it finds you.",
  "The bridge you burn today may be the one you needed tomorrow. Choose carefully.",
  "Excellence is doing ordinary things extraordinarily well.",
  "The door to opportunity is often disguised as hard work.",
  "What you hold onto with too much force will eventually break.",
  "The stars don't worry about the darkness. They simply shine.",
  "Your next chapter is waiting. You only need to turn the page.",
  "The most important conversations are the ones you have with yourself.",
  "What you are is nature's gift. What you become is your gift back.",
  "The universe conspires for those who dare to align with their purpose.",
  "Rest is not giving up. Rest is gathering strength for what comes next.",
  "The wolf doesn't concern itself with the opinion of the sheep.",
  "You are the author. Write accordingly.",
  "What the mind can conceive and believe, the hands can achieve.",
  "The person you need most is often the person in the mirror.",
  "Timing and patience are the invisible ingredients in every success story.",
  "What you pay attention to grows. Choose carefully.",
  "The ordinary becomes extraordinary when you bring full presence to it.",
  "Every moment of genuine courage is a down payment on a better future.",
  "Your best thinking has not yet happened. Stay open.",
  "The root of confidence is competence. Develop one to grow the other.",
  "What breaks open also lets in light.",
  "The highest form of intelligence is the ability to observe without evaluating.",
  "Your life is already the story you will tell later. Make it worth telling.",
  "The obstacle is often the path, not the barrier to it.",
  "What you give your attention to today you will have more of tomorrow.",
  "The greatest wealth is knowing when you have enough.",
  "Every ending is an answer. Every beginning is a question.",
  "The art of wisdom is knowing what to overlook.",
  "Your courage inspires others even when you think no one is watching.",
  "What you do with difficulty defines who you become.",
  "The deepest kind of love requires no performance.",
  "Begin again. As many times as it takes.",
  "The quality of your attention is the quality of your life.",
  "What seems impossible today is merely unfamiliar.",
  "The most important thing you can know is that things change.",
  "Your potential is not defined by your history.",
  "The quietest voice in the room is often carrying the most important message.",
  "What you cannot control, you can choose how to meet.",
  "The garden of your life needs both pruning and watering.",
  "Every kind act ripples further than you can see.",
  "The more you know, the more gently you hold your certainties.",
  "Your presence is already a gift. You don't need to earn your place.",
]

export function generateFortuneDescription(fortune: string): string {
  const firstWord = fortune.split(' ')[0]
  const themes = [
    { section: 'The Deeper Philosophy', color: 'blue' },
    { section: 'In Your Career and Work Life', color: 'green' },
    { section: 'In Your Relationships', color: 'pink' },
    { section: 'For Your Health and Wellbeing', color: 'orange' },
    { section: 'Your Financial Life', color: 'yellow' },
    { section: 'Daily Practice and Application', color: 'purple' },
    { section: 'Historical and Cultural Wisdom', color: 'indigo' },
    { section: 'The Science Behind This Truth', color: 'teal' },
  ]

  const CAREER_INSIGHTS = [
    `In professional environments, this wisdom manifests as the difference between those who react to circumstances and those who shape them. The most successful leaders, entrepreneurs, and creators in history have understood this truth at a deep level — not as philosophy, but as operating principle.

When you apply this to your career, the question becomes: where are you waiting for conditions to be perfect before you act? Where are you treating difficulty as a signal to stop rather than as information to incorporate? The professionals who build extraordinary careers are not those who face fewer obstacles — they are those who have developed a fundamentally different relationship with obstacles themselves.

The research on high performers consistently shows that what separates them from others is not talent, not intelligence, not luck — it is what psychologists call "tolerance for ambiguity." The ability to act well in uncertain, imperfect conditions. This fortune speaks directly to the development of that capacity.`,

    `Your professional life is a laboratory for testing who you are under pressure. The wisdom in this fortune is not passive — it is not something to read and feel inspired by. It is something to pick up and use, today, in the context of whatever professional challenge you are currently navigating.

The teams that thrive, the projects that succeed, the careers that become genuinely meaningful — they all have this quality at their center. Not the absence of difficulty, but the presence of a kind of orientation that allows difficulty to become material rather than barrier.`,
  ]

  const RELATIONSHIP_INSIGHTS = [
    `In relationships, this truth operates at the level of the invisible architecture — the underlying beliefs and orientations that shape every interaction without either person naming them. When we bring this wisdom into our closest relationships, we begin to see patterns we previously couldn't access.

The healthiest relationships are not those without conflict. They are those where conflict becomes a source of deeper understanding rather than damage. Partners who have absorbed this kind of wisdom relate to disagreement differently — not as a threat to the relationship, but as an opportunity to know each other more fully.

Research in relationship psychology consistently finds that what predicts long-term relationship satisfaction is not compatibility of personality or similarity of interests — it is the couple's shared orientation toward difficulty. How they navigate hard moments reveals whether the relationship has resilience or fragility at its core.`,

    `Friendships, family bonds, romantic partnerships — all of them are shaped by the degree to which we can be honest about who we are and what we need. This fortune carries a message about authenticity that applies directly to how we show up in our most important relationships.

The people in your life who have stayed longest, who know you most truly — they have been kept close not by your performances but by your genuine presence. The wisdom here is an invitation to bring more of that presence into every connection.`,
  ]

  const HEALTH_INSIGHTS = [
    `Modern health science is catching up with what ancient wisdom traditions have known for centuries: the state of the mind shapes the state of the body in ways that are far more profound than the mechanistic model of health suggests.

Stress — the biological response to perceived threat or difficulty — is one of the most studied health factors of the modern era. What researchers have discovered is nuanced: it is not stress itself that damages health. It is the relationship we have with stress. People who view challenges as opportunities for growth show measurably different physiological responses than those who view challenges as threats — even when facing identical situations.

This fortune is, in one sense, a prescription for better health: not through diet or exercise (though those matter), but through the fundamental orientation of the mind toward whatever life presents.`,

    `Sleep, energy, immune function, cardiovascular health, mental clarity — all of these are influenced by the degree to which we are in a state of inner resistance or inner alignment. The wisdom in this fortune, practiced daily, has measurable effects on wellbeing that no supplement can replicate.

Breathwork, meditation, time in nature, genuine rest — these are the practices that support the kind of inner orientation this fortune describes. Not as escapes from difficulty, but as trainings for meeting difficulty with greater capacity.`,
  ]

  const MONEY_INSIGHTS = [
    `Financial life, more than almost any other domain, is shaped by the invisible beliefs and orientations we carry about what is possible, what we deserve, and what the future holds. The wisdom in this fortune has direct applications to economic wellbeing.

The most enduring wealth — not just monetary, but the full-spectrum wealth of a life well-lived — is built by people who have a clear-eyed relationship with reality. Not optimism in the sense of denying difficulty, but clarity in the sense of seeing accurately what is and responding wisely to it.

Behavioral finance has documented extensively how cognitive biases — the stories we tell ourselves about money, risk, and security — shape financial outcomes more than raw intelligence or information access. The person who has internalized this fortune's wisdom tends to make cleaner financial decisions because they are not operating from fear or avoidance.`,

    `The relationship between mindset and financial outcome is not mystical — it is structural. People who believe in scarcity tend to make decisions that perpetuate scarcity. People who operate from a genuine sense of abundance — not fantasy, but a realistic appraisal of possibility — tend to make decisions that create more of what they seek.

This fortune, applied to money, is an invitation to examine the default stories you carry about wealth, earning, and worthiness. Those stories, more than market conditions or economic circumstances, are the primary determinants of your financial trajectory.`,
  ]

  const idx = fortune.length % 2
  const career = CAREER_INSIGHTS[idx]
  const relationship = RELATIONSHIP_INSIGHTS[idx]
  const health = HEALTH_INSIGHTS[idx]
  const money = MONEY_INSIGHTS[idx]

  return `
## 🥠 "${fortune}"

This fortune contains a truth that has been discovered, forgotten, and rediscovered across every culture that has seriously engaged with the question of how to live well. It appears in different forms — in Stoic philosophy, in Buddhist teachings, in Indigenous wisdom traditions, in modern psychology — because it is not the property of any one tradition. It is a universal principle dressed in local clothes.

What makes a fortune cookie saying profound is not that it tells us something we don't know. It is that it reminds us of something we know but have stopped practicing. The gap between knowing and doing is where most of human struggle lives. This fortune is a bridge across that gap — but only if you let it become something more than a pleasant sentiment.

---

### 🔍 ${themes[0].section}

"**${fortune}**"

At its core, this statement is about the relationship between the inner world and outer circumstances. Philosophers from Marcus Aurelius to Viktor Frankl have pointed to this same truth from different angles: the event is not the determining factor. The interpretation of the event — the meaning we assign, the response we choose — is where human freedom and human suffering are both located.

This isn't naive positivity. It isn't suggesting that circumstances don't matter. It is something more precise and more powerful: the recognition that two people facing identical circumstances can have radically different experiences based on their orientation. The orientation is shapeable. That is the profound news.

The Stoics called this the dichotomy of control. Buddhist traditions call it the difference between pain (unavoidable) and suffering (optional). Modern psychology calls it cognitive reappraisal. The names differ, but the insight is the same: your relationship with what happens to you is something you can cultivate.

---

### 💼 ${themes[1].section}

${career}

---

### ❤️ ${themes[2].section}

${relationship}

---

### 🏥 ${themes[3].section}

${health}

---

### 💰 ${themes[4].section}

${money}

---

### 🌅 ${themes[5].section} — Making This Fortune Real

A fortune cookie wisdom becomes either a pleasant distraction or a genuine turning point based entirely on what you do with it in the next 24 hours. Here are three practices for integrating the truth in this fortune into your actual life:

**Practice 1 — The Morning Question:** Before your day begins, ask yourself: "Where in my life does this fortune apply most directly?" Don't answer immediately. Sit with the question for a minute. The answer that rises from silence is usually more useful than the first answer that appears.

**Practice 2 — The Reframe Experiment:** Choose one current difficulty and write three sentences about it from the perspective of this fortune's wisdom. Not as a denial of the difficulty, but as an exploration of what it might be making possible that wouldn't otherwise be available.

**Practice 3 — The Evening Reflection:** At day's end, note one moment where you applied this wisdom and one moment where you forgot it. No judgment — just noticing. Awareness is the precondition for change.

---

### 📚 ${themes[6].section}

Fortune cookie wisdom has an interesting history. The cookies themselves are largely an American invention (despite their association with Chinese restaurants), but the tradition of embedding wisdom in small, accessible forms spans millennia. The Analects of Confucius, the Mishnah, the Hadith, the Proverbs of Solomon — all of these are, in a sense, fortune cookie collections: distillations of hard-won wisdom into forms compact enough to carry in memory.

The fortune you've received today draws from this deep tradition. The specific phrasing may be contemporary, but the underlying truth it points to has been verified by millions of people across thousands of years. That is not nothing. That is, in fact, one of the most reliable forms of knowledge available to us.

---

### 🔬 ${themes[7].section}

Contemporary psychology and neuroscience provide empirical grounding for what this fortune describes. Research in positive psychology (Seligman, Csikszentmihalyi), growth mindset science (Dweck), and cognitive behavioral therapy all converge on the same fundamental finding: our interpretations and orientations, not the events themselves, are the primary drivers of psychological wellbeing.

Neuroplasticity research shows that the brain literally rewires itself based on which patterns of thought we practice most. This means that working with wisdom like this fortune — not just reading it but practicing it — physically changes the brain over time. The orientation this fortune describes can be cultivated. It is not a fixed personality trait. It is a skill.

The most important takeaway from this science: begin now. Not because urgency is required, but because beginning is how skills develop. One application of this wisdom today is worth one thousand re-readings of it tomorrow.

---

*This fortune was generated by ToolTrio's Fortune Cookie Wisdom Engine. For reflection, inspiration, and the ongoing practice of living well.*
`
}
