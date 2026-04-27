import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData, generateMedicalWebPageSchema } from '@/lib/seo/metadata'
import PaceCalculatorClient from './PaceCalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Running Pace Calculator — Min/Mile, Min/Km & Race Time Predictor 2026',
  description: 'Free Pace Calculator 2026 — Calculate your running pace, finish time, and training zones. Real examples for 5K, 10K, half marathon, and marathon distances. Instant results for all fitness levels.',
  slug: 'pace-calculator',
  category: 'health',
  region: 'usa',
  keywords: [
    'pace calculator 2026',
    'free pace calculator',
    'pace calculator usa 2026',
    'pace calculator free 2026',
    'running pace calculator min per mile',
    'how to calculate running pace',
    '5k pace calculator finish time',
    'marathon pace by goal time',
    'pace per kilometer converter',
    'sub 2 hour half marathon pace',
    'treadmill speed to pace converter',
    'easy run pace calculator',
    'race time predictor',
    'negative split calculator',
  ],
})

const relatedCalculators = [
  {name:"Marathon Training Calculator",href:"/calculators/health/marathon-training-calculator",icon:"🏃",desc:"Full marathon training plan"},
  {name:"Heart Rate Calculator",href:"/calculators/health/heart-rate-calculator",icon:"❤️",desc:"Training HR zones"},
  {name:"VO2 Max Calculator",href:"/calculators/health/vo2-max-calculator",icon:"🫁",desc:"Aerobic capacity and pace"},
  {name:"Sprint Calculator",href:"/calculators/health/sprint-calculator",icon:"🏁",desc:"Sprint speed"},
  {name:"HIIT Calculator",href:"/calculators/health/hiit-calculator",icon:"⚡",desc:"Interval pacing"},
  {name:"Steps Calculator",href:"/calculators/health/steps-calculator",icon:"👣",desc:"Steps from distance"},
  {name:"Calorie Calculator",href:"/calculators/health/calorie-calculator",icon:"🔥",desc:"Calories burned running"},
  {name:"Hydration Calculator",href:"/calculators/health/hydration-calculator",icon:"💧",desc:"Running hydration"}
]

const faqs = [
  {question:'How do I calculate running pace from distance and time?',answer:'Pace equals time divided by distance. For pace per mile: divide total minutes by total miles. A 5K (3.107 miles) in 25 minutes equals 25 ÷ 3.107 = 8:03 per mile. For pace per kilometer: 25 minutes ÷ 5 km = exactly 5:00 per kilometer. Convert finish time to decimal minutes first, then divide by distance in your target unit.',},
  {question:'What is a good pace for a beginner runner?',answer:'Beginners should run at conversational pace — able to speak full sentences without gasping. This typically falls between 11:00-14:00 per mile (6:50-8:45/km) for most new runners. The most common beginner error is starting too fast, causing premature fatigue. After 4-8 weeks of consistent easy running, natural cardiovascular improvements allow the same effort to produce faster paces.',},
  {question:'What pace do I need to run a sub-2 hour half marathon?',answer:'Sub-2-hour half marathon (13.1 miles / 21.1 km) requires an average faster than 9:09 per mile or 5:41 per kilometer. Training target: comfortably complete long runs of 10+ miles at 9:30-10:00 per mile, with at least some training runs at target pace. Most runners slightly slow in the second half so aim for even splits rather than a fast first mile.',},
  {question:'How do I convert treadmill mph to running pace?',answer:'Treadmill speed in mph to pace per mile: divide 60 by speed. At 6.0 mph: 60 ÷ 6 = 10:00/mile. At 7.5 mph: 8:00/mile. At 10.0 mph: 6:00/mile. For km pace: convert mph to km/h (multiply by 1.609), then divide 60 by km/h speed.',},
  {question:'What training paces should I use for different workout types?',answer:'Easy/recovery runs: 1-2 min/mile slower than 5K race pace. Long runs: 90 sec to 2 min slower than 5K pace. Tempo runs: 25-30 sec/mile slower than 5K pace. Interval runs (VO2 max): at 5K race pace or slightly faster. These zones target different physiological adaptations — easy runs build aerobic base, tempo builds lactate threshold, intervals build VO2max.',},
  {question:'What is a negative split in racing?',answer:'A negative split means running the second half of a race faster than the first half. Elite runners typically negative-split because starting conservatively preserves glycogen for final miles, heat and dehydration are better managed with controlled early pacing, and passing competitors in the final stretch is psychologically powerful. Most recreational runners positive-split (start too fast, slow down). For a 1:50 half marathon target, an optimal split might be 56:00 first half and 54:00 second half.',},
  {question:'How does elevation affect running pace?',answer:'Uphill running slows pace by approximately 30 seconds per mile for every 1% grade increase. A 3% grade adds roughly 90 seconds per mile. Downhill running improves pace on 1-3% grades by 10-20 sec/mile, but steeper descents require braking effort and cause muscle damage. Grade-adjusted pace (GAP) normalizes hilly courses to flat-ground equivalent effort for accurate training comparison.',},
  {question:'How do I convert between pace per mile and pace per kilometer?',answer:'Pace per mile to pace per km: multiply by 0.6214. Pace per km to pace per mile: multiply by 1.6093. For example, 8:00 per mile = 8 × 0.6214 = 4:58 per kilometer. A 5:00/km pace = 5 × 1.6093 = 8:03 per mile. This calculator handles all conversions automatically.',},
]

const seoContent = {
  title: 'Running Pace Calculator',
  category: 'health' as const,
  intro: `Pace is the universal language of running — it translates effort into a number that connects your training to your race goals. This calculator handles every pace conversion you need: minutes per mile, minutes per kilometer, mph, km/h, and projected finish times for every major race distance from 5K to marathon.

The tool works in both directions. Enter a finish time and distance to find your average pace, or enter a target pace to calculate predicted finish times. It also shows training zone paces based on your current fitness — the easy, long run, tempo, and interval paces that form the foundation of structured training.

For runners following a training plan, understanding exactly what speed to run during each workout type is essential for targeting the right physiological adaptation. This calculator translates race-pace guidelines from your plan into treadmill speeds and GPS watch targets.

Combine with [our Marathon Training Calculator](/calculators/health/marathon-training-calculator) and [our Heart Rate Calculator](/calculators/health/heart-rate-calculator) for complete training guidance.

**Long-tail searches answered here:** running pace calculator free online usa, how fast am i running pace per mile calculator free, finish time calculator by pace and distance free, minute per mile to speed converter calculator, race pace calculator no signup free online usa, walking pace calculator free tool 2026, 5k race pace strategy calculator free online usa, how to calculate average pace from run data free, negative split running pace calculator usa free, pace calculator for half marathon training free, comfortable conversational pace calculator by fitness level, pace adjustment for heat and hills calculator free usa, pace per kilometer to per mile converter free, run walk intervals pace adjustment calculator free usa, 10k target finish pace per mile calculator free online`,
  howItWorks: `Pace is calculated as: total time (in minutes) ÷ distance. For distance in miles: minutes ÷ miles = min/mile. For kilometers: minutes ÷ km = min/km. Speed conversions use: pace (min/mile) = 60 ÷ speed (mph).

Race time predictions for other distances use the Riegel formula: T2 = T1 × (D2/D1)^1.06. The exponent 1.06 captures the physiological fact that runners slow down as distance increases due to glycogen depletion, cardiovascular fatigue, and muscle damage accumulation.

Training zone paces are calculated relative to 5K race pace: easy runs at +1:30-2:00/mile, long runs at +1:00-1:30/mile, tempo at +25-30 sec/mile, intervals at 5K pace or faster.`,
  benefits: [
        {title:"All pace conversions in one place",text:"Min/mile, min/km, mph, km/h, and finish times for all major race distances — calculate any from any input without switching tools.",},
        {title:"Multi-distance race prediction",text:"Predict 5K, 10K, half marathon, and marathon finish times simultaneously from a single data point using the Riegel performance formula.",},
        {title:"Training zone calculator",text:"Converts race pace into 5 training zones with clear descriptions of the physiological adaptation each zone targets.",},
        {title:"Treadmill speed converter",text:"Instantly converts between treadmill mph/kph display and the min/mile or min/km format used in most training plans.",},
        {title:"Negative split planner",text:"Calculate ideal first and second half pace splits for any race distance and goal finish time.",},
        {title:"Grade-adjusted pace",text:"Calculates equivalent flat-ground pace from hilly run data for accurate comparison against flat-course workouts.",},
  ],
  useCases: [
        {title:"Race goal planning",text:"Enter your goal finish time and distance to find required average pace, then compare against recent training paces to assess goal feasibility.",},
        {title:"Training calibration",text:"Translate training plan pace guidelines into treadmill speeds or GPS watch targets for precise workout execution.",},
        {title:"Post-race analysis",text:"Enter finish time and distance from any past race to find exact pace and compare improvement across races over time.",},
        {title:"Workout type targeting",text:"Use zone calculations to set the correct pace for each day's workout — not just 'hard' or 'easy' but precisely how hard.",},
  ],
  tipsSection: `Set your GPS watch to display pace rather than speed during training runs. Training plans specify effort in pace terms, making pace display far more immediately usable than mph or km/h.

During race day, control your first mile rigorously — going out 15-20 seconds per mile too fast in mile 1 can cost you 2-3 minutes in the final miles. Most GPS watches have pacing alerts you can set to warn you if you exceed your target pace.

Use easy pace (1.5-2 minutes slower than 5K pace) for most of your weekly mileage. Research consistently shows that 80% of training at genuinely easy pace with 20% at moderate-to-hard intensity produces better results than running everything at moderate intensity.`,
  scienceSection: `The Riegel endurance performance formula was published in Runner's World in 1977 based on analysis of world record performances across distances from 100m to 100 miles. The critical discovery was that the relationship between time and distance follows a power law with exponent 1.06 — meaning pace slows predictably and consistently as distance increases. This formula has been validated against decades of real-world racing data and remains the most widely used race time prediction model in running.

MET values for running (used in calorie burn calculations) are drawn from the Ainsworth et al. Compendium of Physical Activities (2011), ranging from 6.0 METs for jogging under 6 mph to 23.0 METs for sprinting at over 14 mph.`,
  conclusion: `Whether you are a new runner trying to understand what a comfortable training pace means in race terms, or an experienced competitor planning a specific finish time goal, this pace calculator is the tool that bridges training and racing.

For a complete performance picture, combine it with [our Marathon Training Calculator](/calculators/health/marathon-training-calculator), [our VO2 Max Calculator](/calculators/health/vo2-max-calculator), and [our Heart Rate Calculator](/calculators/health/heart-rate-calculator).`,
  comparisonTable: [
        {label:"Easy run",value:"~2:00/mile slower than 5K pace",note:"Aerobic base building — 80% of training volume",},
        {label:"Long run",value:"~1:30/mile slower than 5K pace",note:"Endurance — 20-30% of weekly distance",},
        {label:"Tempo",value:"~25-30 sec/mile slower than 5K",note:"Lactate threshold development",},
        {label:"Interval",value:"At 5K race pace",note:"VO2max development",},
        {label:"Sprint/stride",value:"5K pace or faster",note:"Neuromuscular power and running economy",},
  ],
  didYouKnow: [
        'The men\'s marathon world record pace set by Eliud Kipchoge in 2023 is approximately 4:38 per mile (2:53/km) — a pace most recreational runners cannot sustain even for a single quarter mile.',
        'Research shows that the fastest marathon finishers are typically those who run the most even splits — the difference between their first and second half times is often under 1 minute in a 2:30 race.',
  ],
  keyStats: [
        {stat:"4:38/mile",source:"Men's marathon world record average pace (Kipchoge, 2023)",},
        {stat:"9:09/mile",source:"Required pace for sub-2-hour half marathon",},
        {stat:"1.06",source:"Riegel formula exponent — rate at which pace slows with distance",},
  ],
  mistakesDetailed: [],
}

export default function Page() {
  return (
    <PaceCalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'Running Pace Calculator', description: 'Calculate running pace per mile or kilometer from any distance and finish time. Predict race times for 5K, 10K, half marathon, and marathon. Convert b', url: 'https://tooltrio.com/calculators/health/pace-calculator', category: 'HealthApplication' }),
        generateMedicalWebPageSchema({ name: 'Running Pace Calculator', description: 'Calculate running pace per mile or kilometer from any distance and finish time. Predict race times for 5K, 10K, half marathon, and marathon. Convert b', url: 'https://tooltrio.com/calculators/health/pace-calculator' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'Running Pace Calculator', url: '/calculators/health/pace-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      seoContent={seoContent}
    />
  )
}
