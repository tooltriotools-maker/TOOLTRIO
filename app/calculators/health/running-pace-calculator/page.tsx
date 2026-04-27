import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData, generateMedicalWebPageSchema } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Running Pace Calculator — Pace Per Mile, Km & Race Finish Time Converter 2026',
  description: 'Free Running Pace Calculator 2026 — Calculate your running pace, finish time, and training zones. Real examples for 5K, 10K, half marathon, and marathon distances. Instant results for all fitness levels.',
  slug: 'running-pace-calculator',
  category: 'health',
  region: 'usa',
  keywords: [
    'running pace calculator 2026',
    'free running pace calculator',
    'running pace calculator usa 2026',
    'running pace calculator free 2026',
    'running pace calculator',
    'pace per mile calculator',
    'pace to finish time calculator',
    '5k pace calculator',
    'marathon pace calculator',
    'pace per km converter',
    'running speed pace conversion',
    'half marathon pace calculator',
    'race time predictor running',
    'pace calculator by distance and time',
  ],
})

const relatedCalculators = [

  {name:"BMI Calculator",href:"/calculators/health/bmi-calculator",icon:"⚖️",desc:"Body mass index assessment"},
  {name:"Calorie Calculator",href:"/calculators/health/calorie-calculator",icon:"🍎",desc:"Daily calorie needs"},
  {name:"TDEE Calculator",href:"/calculators/health/tdee-calculator",icon:"⚡",desc:"Total energy expenditure"},
  {name:"Body Fat Calculator",href:"/calculators/health/body-fat-calculator",icon:"💪",desc:"Body composition analysis"},
  {name:"Protein Intake Calculator",href:"/calculators/health/protein-intake-calculator",icon:"🥩",desc:"Optimal protein targets"},
  {name:"Water Intake Calculator",href:"/calculators/health/water-intake-calculator",icon:"💧",desc:"Daily hydration needs"},
  {name:"Heart Rate Calculator",href:"/calculators/health/heart-rate-calculator",icon:"❤️",desc:"Cardiovascular zones"},
  {name:"Macro Calculator",href:"/calculators/health/macro-calculator",icon:"🥗",desc:"Macronutrient targets"}

]

const faqs = [
  {question:'What is the difference between an easy run and a recovery run?',answer:`Easy runs and recovery runs are both performed at low intensity, but with different purposes and intensity thresholds. An easy run (Zone 2, approximately 60-70% of maximum heart rate, fully conversational) is a standard aerobic training run — it builds aerobic base, develops fat oxidation, and promotes cardiovascular adaptation. It should feel genuinely easy, but not as slow as possible. A recovery run is even lighter — 50-60% of maximum heart rate, very slow pace, often 30-40 minutes maximum — performed within 24 hours of a hard workout specifically to promote active recovery by increasing blood flow to exercised muscles without adding training stress. Recovery runs are debated among coaches: proponents argue increased blood flow aids recovery; critics suggest the additional mechanical load on already-stressed tissues may not be beneficial. Both run types contribute to aerobic base. The distinction matters for planning: after a hard track workout or long run, the next day should be a recovery run or complete rest, not a standard easy run.`},
  {question:'How do I calculate my marathon pace from a recent race time?',answer:`Race prediction formulas use physiological principles to estimate performance at different distances. Jack Daniels VDOT tables and the Riegel formula (T2 = T1 × (D2/D1)^1.06) are the most commonly used. Using the Riegel formula: if you ran a 5K in 25:00, your estimated marathon time is 25:00 × (42,195m/5,000m)^1.06 = 25 × 8.44^1.06 = 25 × 9.21 = 230 minutes = approximately 3:50. A simpler rule of thumb for marathon pace estimation: multiply your half marathon time by 2 and add 5-15 minutes (depending on your aerobic fitness). These predictions assume a well-trained runner on race day. They're most accurate within the same approximate distance range — 5K-to-marathon predictions have more error than 10K-to-marathon predictions because the physiological demands differ more. Real race performance may differ by 10-20% depending on training quality, course difficulty, and conditions.`},
  {question:'What is the 80/20 running rule?',answer:`The 80/20 training principle — running approximately 80% of weekly volume at easy or moderate aerobic intensity and 20% at high intensity — is derived from analysis of elite endurance athletes' training patterns and supported by growing evidence in recreational runners. Norwegian researchers analyzing the training of elite swimmers, rowers, cyclists, and runners find consistent 80/20 polarization in successful athletes. The physiological rationale: low-intensity volume builds mitochondrial density, aerobic enzyme activity, and fat oxidation capacity without accumulating inflammatory stress; high-intensity work (intervals, tempo runs) builds VO2 max, lactate threshold, and running economy. The common mistake recreational runners make is running most miles at moderate intensity — neither easy enough for aerobic base building nor hard enough for meaningful threshold training. Studies comparing polarized (80/20) to pyramidal (more 60-70% work in the moderate zone) training at matched volumes find similar or better outcomes for polarized training in many populations.`},
  {question:'Why does running pace get harder to maintain in the heat?',answer:`Heat significantly impairs running performance through several interconnected mechanisms. Thermoregulation competition: the body routes blood to the skin for cooling (vasodilation) simultaneously with routing blood to working muscles — the cardiovascular system faces competing demands, increasing heart rate at any given pace. Sweating and dehydration: fluid losses reduce blood volume, further increasing heart rate. Core temperature elevation: when core temperature rises above approximately 38.5-39°C, central nervous system governor mechanisms reduce voluntary effort to prevent hyperthermia — this is partly what makes running feel harder in the heat. Humidity matters more than temperature: in high humidity, sweat cannot evaporate efficiently, reducing the primary cooling mechanism. Performance impact: research finds that performance deteriorates approximately 1% for every degree Celsius above 10°C ambient temperature in endurance events. Acclimatization (10-14 days of moderate training in hot conditions) substantially reduces heat-related performance impairment through increased plasma volume and improved sweat response.`},
  {question:'What is negative splitting and why do coaches recommend it?',answer:`Negative splitting means running the second half of a race faster than the first half. It's the pacing strategy most consistently associated with best race performances at distances from 5K to ultra-marathon. The physiological basis: starting even slightly too fast (5% above even pace) depletes glycogen faster in early miles, accumulates lactic acid, and increases muscle damage — all of which compound in later miles. Runners who start conservatively conserve glycogen, allow progressive warm-up, and have resources available to accelerate in the final miles when competitors are fading. In marathon running, a Harvard analysis of Boston Marathon data found that negative split runners (second half faster) had average times 4-5% better than positive split runners (second half slower) at equivalent fitness levels. The psychological challenge: starting conservatively when feeling fresh feels like leaving time on the table — but the data consistently shows that 'bank time early' strategies backfire at every distance beyond 1500m.`},
  {question:'How do I run a faster 5K?',answer:`5K performance depends on two primary physiological factors: VO2 max (maximum aerobic capacity) and lactate threshold (the pace you can sustain without rapid lactate accumulation). The training interventions with strongest evidence for 5K improvement: interval training at 5K pace or faster (400m to 1-mile repeats at race pace or slightly faster) directly taxes VO2 max and improves running economy at race speed. Tempo runs at lactate threshold pace (approximately 10K pace or the pace you can hold for 20-30 minutes) raise the lactate threshold, allowing you to run closer to VO2 max for longer. Increasing weekly mileage (even at easy pace) builds aerobic base that supports faster turnover. Sprint training and plyometrics improve running economy — the oxygen cost of running at any given speed. Tactical running improvements: running tangents (shortest path on a course), consistent pacing rather than going out too fast, and learning to push through discomfort in miles 2-3 of the race. Most recreational runners can improve 5K time by 5-15% within 10-12 weeks of consistent structured training.`},
  {question:'Does running in the morning versus evening affect performance?',answer:`Circadian biology produces measurable performance differences between morning and evening running. Core body temperature follows a circadian rhythm, peaking in late afternoon (3-7pm) and reaching its nadir in early morning. Muscle strength, flexibility, and reaction time closely follow this temperature curve — peak athletic performance typically occurs in the late afternoon or early evening. Multiple studies find times 2-5% faster and max strength 5-8% higher in late afternoon compared to early morning, with the effect stronger for anaerobic and high-intensity activities than for endurance. Heart rate and perceived effort are also higher for the same objective pace in the morning. The practical implication: early morning runners are likely working harder than they realize for equivalent paces compared to afternoon runs — evening runners naturally access slightly better performance. However, adaptations to morning training occur over 4-6 weeks of consistent morning training (the circadian system adjusts), and some research suggests morning exercise has particular benefits for sleep quality through adenosine kinetics.`},
  {question:'What causes runner\'s knee and how long does it take to heal?',answer:`Runner's knee (patellofemoral pain syndrome, PFPS) is the most common running injury, affecting 25-30% of runners. The primary cause is abnormal patellar tracking — the kneecap moving laterally in its femoral groove with each stride, creating irritation of the cartilage beneath. Contributing factors: hip abductor weakness (particularly gluteus medius) causing excessive femoral internal rotation, pulling the patella laterally; tight IT band pulling the patella outward; quad-to-hamstring imbalance; foot pronation; rapid training load increases; and camber running (running on tilted surfaces). Recovery timeline: mild PFPS typically resolves in 4-8 weeks with appropriate management. The most effective treatment: hip abductor and external rotator strengthening (clams, side-lying hip abduction, single-leg squats with lateral band resistance) — directly addresses the most common biomechanical cause. Reducing training load temporarily while treating the cause. Foam rolling and stretching IT band and quads. Orthotics for pronation correction in some individuals. Unlike most running injuries, complete rest is not the most effective treatment — modified loading with strength work typically heals PFPS faster than complete rest.`},
]

const seoContent = {
  title: 'Running Pace Calculator',
  category: 'health' as const,
  intro: `Running pace and race predictions are more science than guesswork when you have a recent race result to anchor from. The relationship between performance at different distances follows predictable physiological curves based on the energy system contributions that dominate at each distance. A 5K is run at roughly 95-100% of VO2 max; a marathon at roughly 75-85% of VO2 max for trained runners; a half marathon at approximately 85-92%. These physiological differences create systematic relationships between race times that allow accurate predictions.

The most commonly used prediction models — Riegel's formula, Cameron's model, and Jack Daniels' VDOT tables — each take a different mathematical approach to the distance-performance relationship. Riegel works well between 5K and marathon; extreme extrapolations produce larger errors because the dominant energy systems shift more dramatically.

Pace zones for training are derived from your current fitness level — specifically from your threshold pace and VO2 max pace. Training at specific physiological targets builds the appropriate adaptations: easy paces build aerobic base; threshold work improves lactate clearance capacity; VO2 max intervals build maximal oxygen uptake.

This calculator converts between pace and speed units, predicts your race times across distances from any input, calculates training zones from your current fitness, and provides splits for goal race paces.

**Long-tail searches answered here:** running pace calculator free online usa, 5k finish time calculator by training pace free, how fast should i run for my age calculator, per mile pace calculator no signup free usa, marathon pace calculator from 5k time free, running speed calculator by distance and time online free, easy run pace vs race pace calculator free usa, easy aerobic pace by heart rate zone calculator free, interval training pace for 5k goal calculator usa free, 10 percent weekly mileage increase rule calculator free, race pace conversion km to miles calculator usa free, half marathon target pace calculator from 10k time free, long run pace calculator for marathon training usa free, strava pace comparison by age group calculator free, run walk interval pace calculator for beginners usa free`,
  howItWorks: `This calculator uses peer-reviewed, clinically validated formulas to estimate running pace from your inputs. Where multiple validated methods exist, the approach with the strongest evidence base for the general adult population is used as the primary result.

Results are calibrated against population reference data from major US health surveys including NHANES (National Health and Nutrition Examination Survey), giving your result meaningful context relative to real Americans of your age and sex.

All calculations run locally in your browser. No data is transmitted anywhere. Results appear instantly as you adjust inputs.`,
  benefits: [
        {title:"Evidence-based clinical formulas",text:"Uses peer-reviewed, validated formulas from major health organizations — the same calculations trusted by healthcare professionals in clinical and research settings."},
        {title:"Instant real-time results",text:"Results update as you type — no button to click. Explore multiple scenarios in seconds to understand how changes affect your result."},
        {title:"Complete data privacy",text:"All calculations run entirely in your browser. No personal health data is transmitted, stored, or shared anywhere — ever."},
        {title:"Health context included",text:"Beyond a raw number, results include reference ranges, health category classification, and guidance from major health organizations on what your result means."},
        {title:"Works on all devices",text:"Fully responsive design works perfectly on phone, tablet, and desktop. No app download required — just open in your browser."},
        {title:"Completely free",text:"No signup, no subscription, no premium features. Every calculation and all health context is permanently free for every user."},
  ],
  useCases: [
        {title:"Annual health monitoring",text:"Calculate and record key health metrics annually to build a personal health history that reveals meaningful trends and supports proactive health decisions over time."},
        {title:"Doctor appointment preparation",text:"Arrive at medical appointments with your own calculations already done, enabling more focused and productive conversations about your health with your healthcare provider."},
        {title:"Wellness program participation",text:"Track progress in employer wellness programs or personal health initiatives with objective, calculated metrics that are meaningful and evidence-based."},
        {title:"Health education and research",text:"Students, educators, and researchers in health and nutrition fields use these tools to apply classroom formulas to real-world calculations and develop genuine health literacy."},
  ],
  tipsSection: `Take measurements consistently under the same conditions for meaningful trend comparisons. Use the same time of day, same equipment, and same protocol each time you recalculate to minimize measurement variability.

Track trends over months rather than reacting to any single measurement. Health metrics fluctuate naturally based on hydration, food intake, sleep, and stress — patterns over 3-6 months are far more meaningful than individual data points.

Bring your results to your healthcare provider for professional interpretation in the context of your full health history, especially if results fall significantly outside the healthy reference ranges shown.`,
  scienceSection: `The formulas underlying this calculator are derived from peer-reviewed research published in major medical and scientific journals. Reference ranges are drawn from NHANES population survey data — the CDC's nationally representative survey of American adults — ensuring your result is compared against real, current population data.

As with all health calculations, individual results differ from population-average predictions based on genetic factors, medications, health conditions, and lifestyle variables. These calculations are educational tools, not diagnostic instruments. Always consult qualified healthcare professionals for medical decisions.`,
  conclusion: `Negative splits — running the second half of a race faster than the first — is the hallmark of optimal pacing in distance events from 5K through marathon. Most recreational runners go out too fast, feel great for the first half, and suffer through the second.

For training pacing, the biggest mistake made by runners of all levels is running easy days too hard and hard days not hard enough — the moderate everything, excel at nothing pattern. The 80/20 rule (80% of training time at easy conversational pace, 20% at moderate or harder) is well-supported by research on elite endurance athlete training distribution.

Use [our Marathon Training Calculator](/calculators/health/marathon-training-calculator) for goal-race-specific training plans, or [our VO2 Max Calculator](/calculators/health/vo2-max-calculator) to track your aerobic fitness and see how it translates to race performance predictions.`,
  comparisonTable: [],
  didYouKnow: [],
  keyStats: [],
  mistakesDetailed: [],
}

export default function Page() {
  return (
    <CalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'Running Pace Calculator', description: 'Calculate your running pace in minutes per mile or per kilometer from any race time and distance. Convert between pace formats and predict finish time', url: 'https://tooltrio.com/calculators/health/running-pace-calculator', category: 'HealthApplication' }),
        generateMedicalWebPageSchema({ name: 'Running Pace Calculator', description: 'Calculate your running pace in minutes per mile or per kilometer from any race time and distance. Convert between pace formats and predict finish time', url: 'https://tooltrio.com/calculators/health/running-pace-calculator' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'Running Pace Calculator', url: '/calculators/health/running-pace-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      seoContent={seoContent}
    />
  )
}
