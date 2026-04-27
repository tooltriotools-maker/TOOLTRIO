import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData, generateMedicalWebPageSchema } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'HIIT Calculator — Work/Rest Intervals, Calories & Training Zone Timing 2026',
  description: 'Calculate HIIT workout parameters including work-to-rest ratios, total session duration, estimated calorie burn, and heart rate zone targets. Design protocols for fat burning, VO2 max, or anaerobic conditioning goals. Free online hiit calculator 2026. No signup required.',
  slug: 'hiit-calculator',
  category: 'health',
  region: 'usa',
  keywords: [
    'hiit calculator 2026',
    'free hiit calculator',
    'hiit calculator usa 2026',
    'hiit calculator free 2026',
    'hiit workout calculator',
    'hiit interval timing calculator',
    'hiit work rest ratio calculator',
    'calories burned hiit workout',
    'hiit heart rate zones',
    'tabata protocol calculator',
    'hiit for fat loss parameters',
    'hiit training frequency calculator',
    'hiit vo2max improvement',
    'high intensity interval training timing',
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
  {question:'What is HIIT and how does it differ from regular cardio?',answer:'High-Intensity Interval Training (HIIT) alternates between periods of near-maximal effort (85-95% max heart rate) and active recovery or complete rest. Traditional moderate-intensity continuous training (MICT) maintains a constant moderate pace (65-75% max HR) for the full session. HIIT produces comparable or superior cardiovascular adaptations in approximately half the time: a 2019 meta-analysis found 20-30 minutes of HIIT 3 days/week improved VO2max by 3.8 mL/kg/min — similar to 45-60 minutes of MICT. HIIT also produces greater EPOC (post-exercise calorie burn) and improves insulin sensitivity more acutely than equivalent time at moderate intensity.',},
  {question:'What are the best HIIT work-to-rest ratios?',answer:'Common HIIT protocols with their physiological targets: Tabata protocol (8 rounds × 20 sec work/10 sec rest = 4 minutes) — targets anaerobic and aerobic capacity simultaneously, requires genuinely maximal effort to produce intended adaptation; Sprint intervals (10 × 30 sec at 95% effort with 4-min recovery) — aerobic power (VO2max) development; 4×4 interval protocol (4 × 4 minutes at 85-95% max HR with 3-min active recovery) — most evidence-based protocol for cardiovascular adaptations; and density blocks (AMRAP or EMOM formats) — metabolic conditioning and work capacity. Longer rest-to-work ratios (3:1 to 5:1) allow higher work intensity; shorter ratios train lactate tolerance.',},
  {question:'How many days per week should I do HIIT?',answer:'Research supports 2-3 HIIT sessions per week for most adults as the optimal frequency for cardiovascular adaptations while allowing adequate recovery. More than 3 HIIT sessions per week significantly increases injury risk and overtraining syndrome risk, and research shows diminishing returns beyond 3 weekly sessions. The high intensity of HIIT requires 24-48 hours recovery between sessions for the nervous system and musculotendinous structures to recover. On non-HIIT days, lighter aerobic activity (Zone 2 training) complements HIIT without compromising recovery. Athletes training 5-6 days/week typically use HIIT for only 20-25% of training volume.',},
  {question:'Is HIIT safe for beginners?',answer:'HIIT at true maximal intensity is not appropriate for beginners. Modified high-intensity intervals — working at \'vigorous\' rather than \'maximal\' intensity, with generous recovery periods — are appropriate for people with some aerobic base. Anyone beginning a vigorous exercise program should complete a PAR-Q (Physical Activity Readiness Questionnaire) or consult a physician if they have cardiovascular disease risk factors, are over 40, or have been sedentary. For true beginners, 4-6 weeks of baseline aerobic conditioning (walking, light jogging) before adding interval training dramatically reduces injury risk and improves HIIT adaptation. The Couch to 5K program is a validated gradual intensity progression used by millions.',},
  {question:'How many calories does a HIIT workout burn?',answer:'Calorie burn during HIIT is high per minute but sessions are short: a 20-minute HIIT workout typically burns 200-400 kcal during the session (depending on body weight and intensity). EPOC (excess post-exercise oxygen consumption) adds approximately 6-15% more calories in the hours following the session. A 30-minute HIIT session with EPOC might total 300-500 kcal — comparable to a 45-minute moderate run. The metabolic benefits extend beyond calories: HIIT significantly improves insulin sensitivity, which affects substrate utilization throughout the day. Over 12 weeks, HIIT programs consistently produce greater reductions in body fat than equivalent-time moderate cardio.',},
  {question:'What should I eat before and after HIIT?',answer:'Pre-HIIT nutrition: 60-90 minutes before HIIT, a small carbohydrate-rich snack (banana, toast with peanut butter, oatmeal) provides readily available glucose for the high-intensity efforts. Training completely fasted can impair peak performance and increase protein catabolism during the session. Post-HIIT nutrition (within 30-60 minutes): protein plus carbohydrates to support muscle repair and glycogen replenishment. Approximately 20-30g protein and 40-60g carbohydrates is a standard post-HIIT meal. Adequate hydration before, during (especially for hot environments), and after HIIT is essential — even mild dehydration measurably reduces HIIT performance.',},
  {question:'Can HIIT worsen anxiety or stress?',answer:'For some people, HIIT\'s physiological stress response — high cortisol, elevated heart rate, intense breathing, sympathetic activation — can trigger or worsen anxiety, particularly in those with anxiety disorders or trauma history. The intense physical sensations of HIIT (racing heart, shortness of breath, feeling hot) can be misinterpreted as panic attack symptoms in anxious individuals. If HIIT consistently increases rather than reduces anxiety, moderate-intensity aerobic exercise (which has strong anxiety-reducing evidence through endorphin and BDNF release) is a better alternative. For most non-anxious people, HIIT produces post-exercise reductions in anxiety and improved mood lasting several hours.',},
]

const seoContent = {
  title: 'HIIT Calculator',
  category: 'health' as const,
  intro: `High-intensity interval training produces disproportionately large cardiovascular and metabolic adaptations relative to the time invested. A 2019 meta-analysis in the British Journal of Sports Medicine found that HIIT produced comparable improvements in VO2 max to moderate-intensity continuous training in roughly half the weekly time. The physiological explanation involves greater activation of mitochondrial biogenesis pathways, more significant glycogen depletion creating stronger adaptation signals, and the afterburn effect (EPOC) that elevates metabolism for hours after the session ends.

The practical downside of HIIT is that true high-intensity work is demanding enough that most people can only handle 2-3 sessions per week before cumulative fatigue impairs recovery. What most people call HIIT at commercial gyms is often moderate-intensity interval training — effective, but not capturing the full adaptations of true maximal effort intervals.

Interval structure variables — work interval duration, rest interval duration, number of rounds, intensity — dramatically affect which energy systems are stressed and what adaptations are produced. Sprint intervals of 20-30 seconds at maximal effort target the phosphocreatine and glycolytic systems differently than 4-minute intervals at VO2 max effort.

This calculator designs your HIIT protocol based on your training goal (cardio improvement, fat loss, performance, time efficiency), current fitness level, and available equipment — with rest intervals, intensity targets, and total session parameters calibrated to produce the target adaptation.

**Long-tail searches answered here:** hiit workout calculator free online usa, hiit interval timing calculator free tool, how many calories does hiit burn calculator, hiit heart rate zone calculator no signup, best hiit work rest ratio calculator free online, calories burned hiit 20 minutes calculator usa, hiit frequency per week calculator free online, hiit calorie burn vs steady state cardio calculator, beginner hiit protocol calculator free usa online, hiit session design calculator by fitness level free, tabata protocol calorie burn calculator usa free, hiit recovery time between sessions calculator free, hiit for weight loss effectiveness calculator usa free, high intensity intervals calories burned by weight free, how to scale hiit intensity for beginners calculator free`,
  howItWorks: `This calculator uses peer-reviewed, clinically validated formulas to estimate hiit from your inputs. Where multiple validated methods exist, the approach with the strongest evidence base for the general adult population is used as the primary result.

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
  conclusion: `The biggest HIIT mistake is using it as a daily protocol. HIIT requires full recovery between sessions — 48 hours minimum, often 72 for genuinely maximal efforts — and doing it daily produces chronic fatigue without proportional benefit. Two well-designed HIIT sessions per week, combined with 2-3 moderate aerobic sessions and adequate sleep, produces better long-term results than daily half-hearted high-intensity work.

Warm-up matters more in HIIT than in moderate-intensity training. Going from cold to maximal effort increases injury risk significantly. A 10-minute dynamic warm-up that progressively increases intensity toward your first work interval is minimum preparation.

For fat loss specifically, HIIT's afterburn effect is real but often overstated — EPOC from a 30-minute HIIT session adds roughly 50-150 extra calories over the following 24 hours. Meaningful, but nutrition remains the dominant variable in body composition outcomes.`,
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
        generateWebAppStructuredData({ name: 'HIIT Calculator', description: 'Calculate HIIT workout parameters including work-to-rest ratios, total session duration, estimated calorie burn, and heart rate zone targets. Design p', url: 'https://tooltrio.com/calculators/health/hiit-calculator', category: 'HealthApplication' }),
        generateMedicalWebPageSchema({ name: 'HIIT Calculator', description: 'Calculate HIIT workout parameters including work-to-rest ratios, total session duration, estimated calorie burn, and heart rate zone targets. Design p', url: 'https://tooltrio.com/calculators/health/hiit-calculator' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'HIIT Calculator', url: '/calculators/health/hiit-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      seoContent={seoContent}
    />
  )
}
