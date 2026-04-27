import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData, generateMedicalWebPageSchema } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Marathon Training Calculator — Weekly Mileage, Long Run & Race Pace Plan 2026',
  description: 'Free Marathon Training Calculator 2026 — Calculate your running pace, finish time, and training zones. Real examples for 5K, 10K, half marathon, and marathon distances. Instant results for all fitness levels.',
  slug: 'marathon-training-calculator',
  category: 'health',
  region: 'usa',
  keywords: [
    'marathon training calculator 2026',
    'free marathon training calculator',
    'marathon training calculator usa 2026',
    'marathon training calculator free 2026',
    'marathon training calculator',
    'marathon training plan by goal time',
    'marathon weekly mileage calculator',
    'long run distance by week',
    'marathon training pace calculator',
    'beginner marathon training plan',
    'marathon taper calculator',
    'marathon speed work pace',
    'sub 4 hour marathon training',
    'marathon training schedule',
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
  {question:'How long does it take to train for a first marathon from scratch?',answer:`For someone who can comfortably run 3-5 miles and has a base of regular running, standard first-marathon training plans run 16-20 weeks. For complete beginners, it's more realistic to allow 6-12 months: 3-4 months building a running base to comfortably run 5-6 miles, then 16-20 weeks of marathon-specific training. The minimum base before beginning a marathon plan is generally considered the ability to run 20-25 miles per week for several weeks without injury — trying to build base fitness and marathon-specific fitness simultaneously is a primary cause of overuse injury in first-time marathoners. The Hal Higdon Novice and Jeff Galloway programs are well-designed for true beginners; they cap long runs at 20 miles and gradually build weekly mileage at a rate the body can adapt to.`},
  {question:'What is the 10% rule in marathon training and does it actually work?',answer:`The 10% rule states that you should increase your weekly mileage by no more than 10% from one week to the next. It exists as a practical heuristic for injury prevention — bone stress injuries (stress fractures), tendinopathies, and IT band syndrome most commonly occur when training load increases faster than the body can adapt. The scientific evidence for the precise 10% figure is weak; it was popularized in running literature without rigorous testing. Research suggests the rate-of-change matters more than any specific percentage. The 10% rule tends to be too conservative for very low-mileage runners (going from 10 to 11 miles per week is trivially safe) and potentially still too aggressive for some high-mileage runners. A more sophisticated approach: use the acute-to-chronic workload ratio (ACWR) — keeping the ratio of this week's load to your 4-week average between 0.8 and 1.3 reduces injury risk better than any fixed percentage rule.`},
  {question:'What pace should my long run be and why?',answer:`The long run should be run at conversational pace — 60-90 seconds per mile slower than your goal marathon race pace. This might feel embarrassingly slow, especially early in training. The purpose of the long run is to build aerobic base, teach the body to burn fat as fuel at running pace, practice fueling and hydration logistics, and develop mental resilience — none of these goals require or benefit from higher intensity. Running long runs too fast is one of the most common training mistakes: it requires excessive recovery time, limits the frequency of quality workouts, and significantly increases injury risk. The slow pace also protects collagen remodeling — tendons and ligaments adapt more slowly than cardiovascular fitness, and excessively intense long runs damage connective tissue faster than it can repair.`},
  {question:'How important is nutrition during a marathon and when should I start fueling?',answer:`Proper race-day nutrition prevents the most common marathon collapse: glycogen depletion, colloquially called 'hitting the wall.' The body stores approximately 1,800-2,000 calories of glycogen in muscles and liver — enough to fuel roughly 18-20 miles of marathon-paced running. Beyond this, without supplemental carbohydrates, glucose availability drops and performance collapses. The solution: begin taking carbohydrates (gels, chews, sports drinks) starting at mile 5-7, regardless of whether you feel you need them yet. Waiting until you feel depleted is too late — the stomach is less able to absorb carbohydrates at high effort levels, and glycogen depletion is already in progress. Target 30-60 grams of carbohydrates per hour during the race, with up to 90 grams per hour for faster runners using multiple carbohydrate sources (glucose + fructose together use different intestinal transporters, increasing absorption capacity).`},
  {question:'What causes marathon pace to fall apart in miles 20-26?',answer:`The last 10K of a marathon is where the race truly begins — and where the most common tactical mistakes compound. The two primary causes of late-race collapse: glycogen depletion (the wall) from inadequate fueling or going out too fast in the first half; and excessive early pacing creating lactic acid accumulation and muscle damage that becomes crippling in the final miles. The marathon requires strict negative split or even pacing discipline — runners who go out 5-10% too fast in the first half nearly always pay disproportionately in the second half. Muscle damage from the eccentric loading of running accumulates throughout the race — the quads are particularly vulnerable, which is why quad-specific strength training and downhill running in training can improve late-race performance. Caffeine (3-6 mg/kg body weight taken 60 minutes before the race start) consistently improves late-race performance by reducing perceived effort.`},
  {question:'What is the difference between tempo runs, intervals, and easy runs in marathon training?',answer:`Marathon training uses three primary intensity zones for different physiological purposes. Easy runs (70-80% of training volume): build aerobic base, promote active recovery, develop fat oxidation capacity, and allow tissue adaptation. Easy runs should feel genuinely easy — you can hold a conversation. Tempo runs (15-20% of volume): sustained running at lactate threshold pace (roughly marathon pace plus 10-20 seconds per mile, or the fastest pace sustainable for 20-40 minutes). Tempo runs develop the ability to sustain marathon pace by raising your lactate threshold. Intervals/track work (5-10% of volume): short efforts at 5K-10K pace with recovery between, developing VO2 max and running economy. The critical mistake many recreational marathoners make is running too many miles at a medium-hard 'junk miles' pace — neither easy enough for aerobic base building nor hard enough for meaningful lactate threshold benefit.`},
  {question:'Can I run a marathon with only 3 days of training per week?',answer:`Yes — several well-designed plans exist for 3-day-per-week marathon training, most notably the FIRST (Furman Institute of Running and Scientific Training) program. The FIRST plan includes one tempo run, one interval session, and one long run per week, supplemented by cross-training on non-running days. Research on the FIRST program shows it produces comparable marathon finish times to higher-frequency training for recreational runners, with potentially lower injury rates due to reduced running volume and impact. The trade-offs: you sacrifice the accumulated easy-run aerobic base that higher-mileage runners develop, and each workout carries more individual importance. For injury-prone runners, runners with time constraints, or those combining marathon training with other sports, 3-day plans are legitimately effective — not a compromise program.`},
  {question:'How do I know if I am overtraining during marathon preparation?',answer:`Overtraining syndrome is distinct from normal training fatigue. Normal fatigue appears within days of a hard workout and resolves with 1-2 days of easy running or rest. Overtraining syndrome involves performance decline despite continued training, persistent fatigue not resolved by rest, mood disturbances (irritability, anxiety, depression), sleep disruption, elevated resting heart rate (3-5+ bpm above normal sustained over days), increased injury frequency, suppressed immune function (more colds and infections), and in women, menstrual disruption. The key differentiator: overtraining does not improve with short rest — it requires weeks to months of reduced training to resolve. Heart rate variability (HRV) monitoring using a chest strap or compatible watch provides the most sensitive daily indicator of recovery status. A consistently declining HRV trend signals accumulating fatigue that warrants training reduction before frank overtraining syndrome develops.`},
]

const seoContent = {
  title: 'Marathon Training Calculator',
  category: 'health' as const,
  intro: `Running a marathon is one of the most physiologically demanding endurance events an average person can complete — 26.2 miles that tax aerobic capacity, muscular endurance, fat metabolism, and mental resilience simultaneously. The preparation required spans months and involves progressively building aerobic base, weekly mileage, and long run distance in a way that allows adaptation without overuse injury.

Most first-time marathon attempts fail because of one of three causes: starting with insufficient aerobic base, building mileage too quickly and sustaining a stress injury (the 10% weekly mileage increase rule exists precisely because faster progression exceeds bone and tendon adaptation rates), or going out too fast on race day and hitting the wall at mile 20 when glycogen stores deplete.

The wall is a real physiological event. At marathon effort, your body burns through approximately 2,000-2,500 calories of glycogen over the first 18-22 miles, after which fat becomes the primary fuel — but fat oxidation is slower and requires more oxygen, so pace drops dramatically. Carbohydrate loading in the 2-3 days before the race maximizes glycogen stores, and mid-race fueling (gels or chews every 45-60 minutes) delays glycogen depletion.

This calculator generates your personalized marathon training plan including weekly mileage progression, long run schedule, goal finish time based on current fitness, and race-day pacing strategy.

**Long-tail searches answered here:** marathon training pace calculator free online usa, how long to train for a marathon calculator, marathon finish time predictor free tool, marathon training plan calculator by current fitness, first marathon training time calculator free no signup, marathon prep weekly mileage calculator usa free, marathon pace predictor from half marathon time free, beginner marathon weekly mileage build calculator, marathon training volume calculator by experience level usa, predicted marathon time from 5k or 10k free calculator, marathon race strategy pace split calculator free, boston marathon qualifying time calculator by age free, how many miles per week for marathon training calculator, long run pace vs race pace calculator for marathon free, marathon training fatigue and recovery calculator usa`,
  howItWorks: `This calculator uses peer-reviewed, clinically validated formulas to estimate marathon training from your inputs. Where multiple validated methods exist, the approach with the strongest evidence base for the general adult population is used as the primary result.

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
  conclusion: `Respect the long run. Weeks where you run 20-22 miles in a single session are the most important training stimulus for marathon preparation — they train fat oxidation, build the mental durability for multi-hour effort, and stress your musculoskeletal system in ways that shorter runs don't. Don't skip them, but do recover properly: long run recovery takes 48-72 hours of reduced training.

Your goal finish time should be informed by a recent 10K or half-marathon time, not by what you hope to run. Overestimating your fitness and starting too fast is the single most common cause of a painful, disappointing marathon experience. Add 15-20 seconds per mile to your predicted pace for a conservative first marathon strategy.

Test all race-day nutrition — gels, chews, sports drink — extensively in training. Nothing new on race day is the cardinal rule of marathon nutrition. Use [our Running Pace Calculator](/calculators/health/running-pace-calculator) to set your specific training pace zones.`,
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
        generateWebAppStructuredData({ name: 'Marathon Training Calculator', description: 'Build a personalized marathon training plan based on your goal finish time, current weekly mileage, and available training weeks. Calculates long run ', url: 'https://tooltrio.com/calculators/health/marathon-training-calculator', category: 'HealthApplication' }),
        generateMedicalWebPageSchema({ name: 'Marathon Training Calculator', description: 'Build a personalized marathon training plan based on your goal finish time, current weekly mileage, and available training weeks. Calculates long run ', url: 'https://tooltrio.com/calculators/health/marathon-training-calculator' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'Marathon Training Calculator', url: '/calculators/health/marathon-training-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      seoContent={seoContent}
    />
  )
}
