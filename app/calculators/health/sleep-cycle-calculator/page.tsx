import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData, generateMedicalWebPageSchema } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Sleep Cycle Calculator — Wake Up Refreshed by Timing Your REM Cycles 2026',
  description: 'Free Sleep Cycle Calculator 2026 — Calculate your ideal sleep schedule and duration based on age and lifestyle. Includes REM cycle timing and wake-up optimization. Evidence-based sleep science. No signup.',
  slug: 'sleep-cycle-calculator',
  category: 'health',
  region: 'usa',
  keywords: [
    'sleep cycle calculator 2026',
    'free sleep cycle calculator',
    'sleep cycle calculator usa 2026',
    'sleep calculator 2026',
    'sleep cycle calculator 2026',
    'ideal sleep time calculator 2026',
    'sleep cycle calculator what time to wake up',
    'best time to wake up based on sleep cycles',
    '90 minute sleep cycle calculator',
    'how many sleep cycles do I need',
    'sleep cycle calculator 7 hours',
    'wake up feeling rested calculator',
    'optimal bedtime calculator',
    'sleep cycle timing alarm',
    'rem sleep calculator',
    'how to use sleep cycles to wake up refreshed',
  ],
})

const relatedCalculators = [
  {name:"Sleep Need Calculator",href:"/calculators/health/sleep-need-calculator",icon:"😴",desc:"How much sleep you actually need by age"},
  {name:"Stress Level Calculator",href:"/calculators/health/stress-level-calculator",icon:"🧠",desc:"Stress affecting your sleep quality"},
  {name:"Caffeine Half-Life Calculator",href:"/calculators/health/caffeine-half-life-calculator",icon:"☕",desc:"When caffeine leaves your system"},
  {name:"Mental Health Score",href:"/calculators/health/mental-health-score-calculator",icon:"💚",desc:"Mental health factors including sleep"},
  {name:"Cortisol Stress Calculator",href:"/calculators/health/cortisol-stress-calculator",icon:"⚡",desc:"Stress hormones and circadian rhythm"},
  {name:"Heart Rate Calculator",href:"/calculators/health/heart-rate-calculator",icon:"❤️",desc:"Resting heart rate and recovery"},
  {name:"Shift Work Health Calculator",href:"/calculators/health/shift-work-health-calculator",icon:"🏭",desc:"Health impact of irregular sleep schedules"},
  {name:"Meditation Benefits Calculator",href:"/calculators/health/meditation-benefits-calculator",icon:"🧘",desc:"Meditation improving sleep quality"},
]

const faqs = [
  {question:'What is a sleep cycle and how long does one last?',answer:'A sleep cycle is a sequential progression through four stages of sleep that repeats approximately every 90 minutes throughout the night. Stage 1 (NREM1) is the light transitional sleep at sleep onset, lasting 1-5 minutes. Stage 2 (NREM2) is a deeper relaxation stage where body temperature drops and heart rate slows, lasting 20-30 minutes. Stage 3 (NREM3) is deep slow-wave sleep critical for physical recovery and memory consolidation, lasting 20-40 minutes (longer in early sleep cycles). Stage 4 (REM) is when most vivid dreaming occurs and emotional memory processing happens, lasting 10-60 minutes (longer in later sleep cycles). A full night of sleep includes 4-6 complete cycles.'},
  {question:'Why do you feel groggy after a full 8 hours but refreshed after 7.5?',answer:'Waking up in the middle of deep sleep (NREM3 slow-wave sleep) causes sleep inertia — the grogginess, disorientation, and cognitive fog that can last 15-60 minutes after waking. This happens because your brain is forced out of a low-arousal brain state before it is ready. If you happen to wake at the end of a complete 90-minute cycle — when you transition through light sleep between cycles — the brain is already in a higher arousal state and waking is much smoother. A 7.5-hour sleep that ends naturally at a cycle boundary (5 cycles × 90 min) can produce better morning alertness than an 8-hour sleep that interrupts deep sleep in the middle of a 6th cycle.'},
  {question:'How many sleep cycles do you need per night?',answer:'Most adults need 4-6 complete sleep cycles for adequate physical recovery and cognitive function. Research consistently links 5 cycles (7.5 hours) or 6 cycles (9 hours) with optimal daytime functioning. The minimum for maintaining health in most adults is 4 cycles (6 hours), though research shows this is insufficient long-term — chronic 6-hour sleep produces accumulating cognitive deficits that subjects themselves often don\'t recognize. The National Sleep Foundation recommends 7-9 hours for adults (18-64) and 7-8 hours for older adults (65+), which translates to approximately 5-6 cycles.'},
  {question:'Does the 90-minute sleep cycle rule apply to everyone?',answer:'The 90-minute average is a population average with meaningful individual variation. Sleep cycle length varies from approximately 70 to 120 minutes between individuals, and even within the same person on different nights. Factors that alter cycle length include age (infants have 50-minute cycles; older adults often have shorter cycles), alcohol consumption (disrupts REM sleep in later cycles, altering cycle timing), sleep deprivation (recovery sleep has more slow-wave sleep earlier and more REM later), and certain medications. The sleep cycle calculator uses 90 minutes as a working average — if you consistently find that 7.5 hours produces poor morning alertness while 8 hours works better, your personal cycle length may be longer than 90 minutes.'},
  {question:'What is sleep debt and can you pay it back?',answer:'Sleep debt is the cumulative deficit between the sleep you need and the sleep you actually get. Sleeping 6 hours when you need 8 creates 2 hours of sleep debt per night. Over a work week this accumulates to 10 hours. Research by Van Dongen et al. showed that sustained 6-hour sleep produced performance deficits equivalent to 24-48 hours of total sleep deprivation after 2 weeks. Partial recovery is possible — one study found a full weekend of catch-up sleep largely reversed performance deficits from a week of sleep restriction — but other research suggests that chronic sleep debt has cumulative health effects (immune function, metabolic markers) that are not fully reversed by short-term recovery sleep.'},
  {question:'How does aging affect sleep cycles?',answer:'Sleep architecture changes substantially with age. Older adults (65+) spend less time in deep NREM3 slow-wave sleep (which declines 50-80% from young adulthood), sleep efficiency decreases (more time in bed needed for same sleep duration), sleep fragmentation increases (more brief awakenings), circadian phase advances (earlier sleep and wake times), and total sleep duration slightly decreases. These changes are normal physiological aging but can be mitigated by regular physical activity, consistent sleep/wake timing, and managing conditions like sleep apnea that become more common with age. The key implication is that older adults may need to allow more time in bed to achieve adequate restorative sleep.'},
  {question:'Does napping interfere with nighttime sleep cycles?',answer:'Nap timing and duration critically determine whether napping helps or hurts nighttime sleep. A 10-20 minute nap (\'power nap\') taken before 3 PM improves alertness and performance without significantly reducing sleep pressure (adenosine buildup) needed for good nighttime sleep. A 90-minute nap taken before 3 PM completes a full cycle including some slow-wave sleep and is restorative without significant nighttime sleep disruption. Napping after 3 PM or napping for 30-60 minutes (which enters deep sleep without completing the cycle, causing sleep inertia and also reducing nighttime sleep drive) are the most problematic patterns. For people with insomnia, any daytime napping is generally counterproductive as it reduces the sleep pressure that drives efficient nighttime sleep onset.'},
  {question:'What environmental factors most affect sleep cycle quality?',answer:'Room temperature is the strongest environmental predictor of sleep quality — the ideal sleeping temperature is 65-68°F (18-20°C), supporting the 1-2°F drop in core body temperature that initiates sleep onset and maintains deep sleep. Light exposure is second: even dim light (8 lux — less than a bedroom nightlight) suppresses melatonin production; blue-wavelength light (from screens, LEDs) is particularly disruptive to circadian timing 1-3 hours before bed. Noise disruption fragments sleep even without full awakening, impairing memory consolidation. Complete darkness (or eye mask) combined with cool temperature and white noise to mask sudden sound changes creates the optimal sleep environment for maximizing cycle quality and depth.'},
]

const seoContent = {
  title: 'Sleep Cycle Calculator',
  category: 'health' as const,
  intro: `The timing of when you wake up matters as much as how many hours you sleep. Have you ever slept 8 hours and felt more groggy than after 7? Have you ever snapped awake before your alarm feeling surprisingly alert? The difference is almost always where in your sleep cycle you woke up.

Your sleep progresses through roughly 90-minute cycles of light sleep, deep sleep, and REM dream sleep. Waking up at the natural end of a cycle — when your brain is in a light transitional state — produces smooth, alert awakening. Waking in the middle of deep slow-wave sleep produces sleep inertia: that thick, disoriented grogginess that can linger for 30-60 minutes.

This calculator finds the optimal wake-up times based on 90-minute cycle intervals plus approximately 15 minutes of sleep onset time. Enter when you need to wake up to find the ideal bedtimes, or enter when you plan to go to sleep to find the best alarm times.

Combine this with [our Sleep Need Calculator](/calculators/health/sleep-need-calculator) to ensure you are getting enough total sleep, not just optimally timed sleep.

**Long-tail searches answered here:** sleep cycle calculator free online usa, best time to wake up calculator by bedtime free, sleep cycle alarm calculator no signup free tool, how many sleep cycles per night calculator usa, rem sleep schedule calculator free online, optimal bedtime calculator by wake time free no account, best time to go to bed for 6 am wake up free, how many sleep cycles in 7 hours of sleep calculator, sleep quality score calculator by cycle completions free, how long is one complete sleep cycle calculator usa, best wake time to avoid sleep inertia calculator free, sleep cycle stages nrem rem timing calculator usa, how to time alarm for sleep cycles calculator free, sleep efficiency calculator by cycle and duration free, light sleep vs deep sleep cycle calculator free usa`,
  howItWorks: `The calculator adds 15 minutes to your sleep onset time (the time it takes the average adult to fall asleep after getting into bed in relaxed conditions) and then calculates backwards or forwards in 90-minute intervals — the average length of one complete sleep cycle.

For bedtime-to-wake-up mode: enter your desired wake time, and the calculator shows ideal bedtimes that allow 4 cycles (6h15m), 5 cycles (7h45m), or 6 cycles (9h15m) of sleep.

For wake-up-from-bedtime mode: enter when you plan to go to sleep, and the calculator shows ideal alarm times at 4, 5, and 6 complete cycles after sleep onset.

Note that individual cycle length varies 70-120 minutes. If the suggested times consistently feel slightly off for you, adjust by adding or subtracting 15 minutes to match your personal cycle length.`,
  benefits: [
    {title:"Wake-up time calculator",text:"Enter your required wake time and instantly see the best times to go to sleep — calculated backwards from your alarm so you plan to wake up naturally between cycles rather than in the middle of deep sleep."},
    {title:"Bedtime calculator",text:"Enter when you plan to go to sleep and see the optimal alarm times at 4, 5, and 6-cycle intervals — helping you pick an alarm that aligns with natural cycle transitions."},
    {title:"Sleep onset adjustment",text:"The 15-minute sleep onset allowance is adjustable — if you know you fall asleep in 5 minutes or take 30 minutes to drift off, adjusting this parameter makes the cycle timing more accurate for your specific situation."},
    {title:"Multiple wake-up window options",text:"The calculator provides 3-4 target wake times at different cycle counts so you can pick the one that best fits your schedule, along with the sleep duration each represents."},
    {title:"Cycle quality indicators",text:"Brief explanation of what happens in each sleep cycle — how the ratio of slow-wave sleep to REM sleep shifts across the night, and why both early cycles (physically restorative) and later cycles (emotionally and cognitively important) are needed for whole-brain recovery."},
    {title:"Age-specific sleep recommendations",text:"The ideal number of cycles is shown relative to the NSF and AAP recommended total sleep hours for your age group — connecting cycle timing to evidence-based sleep duration targets."},
  ],
  useCases: [
    {title:"Fixing morning grogginess",text:"If you consistently wake up groggy despite sleeping 7-8 hours, use the cycle calculator to shift your alarm by 30-45 minutes earlier or later. Many people find that changing alarm time by just one 90-minute interval completely eliminates morning grogginess."},
    {title:"Planning naps effectively",text:"Use the cycle timing principle for naps: either 20 minutes (before entering deep sleep, no grogginess on waking) or 90 minutes (complete one full cycle). Avoid 30-60 minute naps that begin deep sleep without completing the cycle."},
    {title:"Travel and time zone adjustment",text:"When adjusting to a new time zone, calculate sleep cycle timings in the destination time zone and aim to expose yourself to bright morning light at your target wake time to reset your circadian clock. The cycle calculator helps identify the best sleep window in the new time zone."},
    {title:"Recovery sleep after sleep deprivation",text:"After significant sleep deprivation, the body prioritizes slow-wave sleep in the first cycles of recovery sleep. Calculate 6-cycle recovery sleep sessions (9+ hours) during the recovery period, which gives the body time to restore both slow-wave and REM sleep."},
  ],
  tipsSection: `Keep your wake time consistent 7 days per week — including weekends. Variable wake times are one of the most common causes of poor sleep quality because they shift your circadian clock, making it harder to fall asleep at your desired bedtime. A consistent wake time is more important than a consistent bedtime for circadian rhythm stability.

Set your alarm at a calculated cycle time but also set a backup alarm 15 minutes later in case the first doesn't wake you. If you consistently sleep through the first alarm, your calculated cycle time may be slightly off — adjust by 10-15 minutes.

Avoid hitting the snooze button. Snooze-interrupted sleep is fragmented and cannot complete a full sleep stage. The additional 9-minute snooze interval is far too short for a full sleep cycle and only produces groggier half-sleep. Set your alarm for the actual time you need to be awake.`,
  scienceSection: `Sleep architecture was first systematically described following the discovery of REM sleep by Aserinsky and Kleitman in 1953. Polysomnography — measuring brain waves (EEG), eye movements (EOG), and muscle activity (EMG) simultaneously during sleep — allowed detailed characterization of sleep stages and cycle progression.

Slow-wave sleep (NREM3) is characterized by high-amplitude, low-frequency delta waves (0.5-4 Hz) and is the stage during which growth hormone is primarily secreted, synaptic downscaling occurs (thought to be the mechanism of memory consolidation), and immune system recovery is maximized. REM sleep shows brain activity resembling waking EEG and is associated with emotional memory processing, creativity, and procedural memory consolidation.

Research by Walker, Stickgold, and Diekelmann has established that both slow-wave sleep (earlier in the night) and REM sleep (more prevalent in later cycles) serve distinct and complementary cognitive functions — providing the mechanistic basis for why shortening sleep on either end of the night impairs different cognitive domains.`,
  conclusion: `Sleep cycle timing is one of the simplest optimizations you can apply to immediately improve morning alertness and daytime energy without changing total sleep duration. Five minutes of planning using this calculator — choosing a bedtime or alarm time that aligns with your natural cycle boundaries — can make the difference between feeling groggy and alert on the same total sleep.

Beyond timing, total sleep duration is the primary determinant of cognitive and physical restoration. Use the sleep cycle calculator alongside [our Sleep Need Calculator](/calculators/health/sleep-need-calculator) to ensure you are planning for enough total cycles rather than just optimizing timing of insufficient sleep.

For persistent sleep problems — difficulty falling asleep, frequent waking, or non-restorative sleep despite adequate duration — consider tracking sleep with a wearable or app for 2 weeks before speaking with a sleep medicine specialist, as these patterns may indicate sleep apnea, restless leg syndrome, or circadian rhythm disorders that require clinical intervention.`,
  comparisonTable: [
    {label:"Average sleep cycle length",value:"90 minutes",note:"Range is 70-120 min; 90 min is population average"},
    {label:"Stage 1 (NREM1) duration",value:"1-5 min",note:"Light transitional sleep; easily disrupted"},
    {label:"Stage 2 (NREM2) duration",value:"20-30 min",note:"Sleep spindles; memory consolidation begins"},
    {label:"Stage 3 (NREM3) duration",value:"20-40 min",note:"Slow-wave deep sleep; physical recovery; growth hormone release"},
    {label:"REM sleep duration",value:"10-60 min",note:"Longer in later cycles; dream sleep; emotional processing"},
    {label:"Sleep onset allowance",value:"~15 min",note:"Average time to fall asleep; adjust based on personal experience"},
    {label:"Recommended adult sleep",value:"7-9 hours (5-6 cycles)",note:"NSF recommendation for adults 18-64"},
    {label:"Slow-wave sleep decline with age",value:"50-80% reduction",note:"From young adulthood to age 65+ — major aging-related change"},
  ],
  keyStats: [
    {stat:"4-6 cycles",source:"Number of complete sleep cycles needed for adequate adult recovery"},
    {stat:"90 min",source:"Average complete sleep cycle duration (range 70-120 min)"},
    {stat:"50-80%",source:"Decline in slow-wave sleep from young adulthood to age 65+"},
    {stat:"15-60 min",source:"Duration of sleep inertia when woken from deep NREM3 sleep"},
  ],
  mistakesDetailed: [

  ],
  didYouKnow: [
    'The record for longest scientifically documented sleep deprivation without stimulants is 11 days (264 hours), set by Randy Gardner in 1964 under Stanford supervision — resulting in hallucinations, paranoia, and memory gaps, but no permanent damage after recovery sleep.',
    'Alcohol is commonly believed to improve sleep because it accelerates sleep onset — but it actually severely disrupts sleep architecture by suppressing REM sleep in the first half of the night and causing sleep fragmentation and rebound REM in the second half, resulting in poorer overall sleep quality despite falling asleep faster.',
    'REM sleep paralysis — temporary inability to move during REM sleep — is a normal protective mechanism preventing people from acting out their dreams. Sleep paralysis disorder occurs when this mechanism bleeds into waking consciousness, causing the terrifying sensation of being conscious but unable to move.',
  ],
}

export default function Page() {
  return (
    <CalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'Sleep Cycle Calculator', description: 'Calculate the best times to wake up or go to sleep based on 90-minute sleep cycle timing. Avoid waking mid-cycle to feel less groggy. Includes sleep debt tracke', url: 'https://tooltrio.com/calculators/health/sleep-cycle-calculator', category: 'HealthApplication' }),
        generateMedicalWebPageSchema({ name: 'Sleep Cycle Calculator', description: 'Calculate the best times to wake up or go to sleep based on 90-minute sleep cycle timing. Avoid waking mid-cycle to feel less groggy. Includes sleep debt tracke', url: 'https://tooltrio.com/calculators/health/sleep-cycle-calculator' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'Sleep Cycle Calculator', url: '/calculators/health/sleep-cycle-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      seoContent={seoContent}
    />
  )
}
