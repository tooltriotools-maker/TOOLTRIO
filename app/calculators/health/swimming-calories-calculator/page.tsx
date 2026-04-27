import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData, generateMedicalWebPageSchema } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Swimming Calories Calculator — Stroke, Distance, Speed & Body Weight 2026',
  description: 'Free Swimming Calories Calculator 2026 — Find your daily calorie needs using the Mifflin-St Jeor equation. TDEE, weight loss, and muscle gain targets. Real examples for men and women of all ages. No signup.',
  slug: 'swimming-calories-calculator',
  category: 'health',
  region: 'usa',
  keywords: [
    'swimming calories calculator 2026',
    'free swimming calories calculator',
    'swimming calories calculator usa 2026',
    'calorie calculator 2026',
    'daily calorie calculator 2026',
    'calorie needs calculator usa 2026',
    'swimming calorie calculator',
    'calories burned swimming by stroke',
    'swimming 30 minutes calorie burn',
    'freestyle vs breaststroke calories',
    'competitive swimming calorie burn',
    'swimming for weight loss calculator',
    'lap swimming calorie calculator',
    'calories swimming 1 hour',
    'aqua aerobics calorie burn',
    'swimming compared to running calories',
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
  {question:'How many calories does swimming burn compared to running?',answer:`Swimming and running burn comparable calories when matched for effort level and duration, but the comparison is complicated by several factors. At moderate intensity: swimming burns approximately 400-700 calories per hour depending on stroke and body weight; running burns 400-700 calories per hour at a moderate pace for the same body weights. The reason swimming seems to burn fewer calories to some people: water's thermal conductivity is 25x that of air, causing swimmers to cool rapidly and reducing the post-exercise metabolic elevation (EPOC) seen after running. Additionally, swimming is weight-supported and has no eccentric loading, producing less muscle damage and therefore less metabolic recovery cost. However, for the same perceived effort, calorie burns are quite comparable. Freestyle (front crawl) burns the most calories per unit time among common strokes; breaststroke is least efficient calorie-for-effort.`},
  {question:'Which swimming stroke burns the most calories?',answer:`Butterfly stroke burns the most calories of any swim stroke — approximately 450-700 calories per hour depending on body weight — but it is extremely demanding and most swimmers cannot maintain it continuously. For practical swimmers, freestyle (front crawl) is the best calorie-burning stroke that can be sustained: approximately 400-600 calories per hour. Backstroke burns slightly less than freestyle (approximately 350-500/hour). Breaststroke is the least efficient for calorie burning at approximately 300-500 calories per hour, partly because it involves more coasting between strokes. The stroke that burns the most calories for a specific individual is the one they swim at the highest sustainable intensity — an efficient butterfly swimmer burns fewer calories than an inefficient but high-effort breaststroker.`},
  {question:'Does swimming help with weight loss?',answer:`Swimming can absolutely support weight loss as part of a caloric deficit program, though it has some limitations compared to land exercise. The caloric expenditure is meaningful — 30 minutes of moderate freestyle burns 200-350 calories depending on body weight. However, multiple studies have found that recreational swimmers don't lose as much weight as matched groups doing equivalent land exercise. The primary reason is appetite stimulation: cold water immersion triggers appetite increases that may cause swimmers to consume more post-swim than they burned. Additionally, the buoyancy of water means the body doesn't have to work against gravity as much, slightly reducing energy expenditure compared to running. Strategies to maximize swimming for weight loss: swim in warm water (reduces appetite effect), eat a defined post-swim meal rather than eating ad libitum, and combine swimming with land-based activity.`},
  {question:'What muscles does swimming work most?',answer:`Swimming engages nearly every major muscle group, making it an exceptional full-body workout. In freestyle, the primary movers are: latissimus dorsi (the large back muscles doing most of the pulling), pectorals (catch and early pull phase), triceps (push phase), deltoids (arm recovery), and core muscles throughout the stroke. The kick provides additional work for glutes, quadriceps, hamstrings, hip flexors, and tibialis anterior. Backstroke heavily involves the trapezius and rhomboids. Breaststroke provides the most significant lower body workout — the frog kick activates inner thigh adductors, glutes, hamstrings, and hip flexors in ways other strokes do not. Because swimming provides resistance through water (approximately 12x the resistance of air) and requires full-body coordination, it builds muscular endurance broadly while not typically building the same maximum muscle size as resistance training.`},
  {question:'Can swimming replace resistance training for muscle building?',answer:`Swimming builds muscular endurance and lean body mass but is generally not as effective as resistance training for maximum muscle hypertrophy. The reasons: resistance training allows systematic progressive overload (adding weight in measurable increments), which is the primary driver of muscle growth. Swimming's resistance is water — which doesn't change based on your strength level. Elite competitive swimmers do develop impressive physiques, particularly in the upper body, but this reflects very high training volumes rather than the inherent hypertrophic stimulus of swimming. For general fitness, swimming is an excellent complement to resistance training, providing cardiovascular conditioning, flexibility (the range of motion required especially in backstroke and butterfly), and full-body muscular endurance. For maximum muscle building, resistance training remains the superior modality. The combination of both provides more complete fitness than either alone.`},
  {question:'How does swimming affect joint health compared to running?',answer:`Swimming is often recommended as a joint-friendly alternative to running because water supports approximately 90% of body weight in waist-deep water and essentially all of it when floating. The near-zero impact environment means swimming produces no joint stress from ground reaction forces that load knees, hips, and ankles in running. This makes swimming ideal for: people with arthritis (particularly hip and knee osteoarthritis), those recovering from lower extremity injuries, pregnant women in later trimesters, obese individuals where land exercise causes joint pain, and older adults with reduced skeletal loading capacity. The tradeoff: swimming provides minimal bone density stimulus because mechanical bone loading is what drives bone remodeling. Running is excellent for bone density; swimming is neutral. People who only swim as their form of exercise should add weight-bearing activity (walking, resistance training) to maintain bone density.`},
  {question:'What is the best way to improve swimming speed?',answer:`Improving swimming speed requires work on three components: technique efficiency, stroke power, and endurance. Technique has the highest leverage for recreational swimmers — most non-competitive swimmers have significant mechanical inefficiencies (particularly body rotation, hand entry, and kick technique) that waste energy and slow speed independent of fitness. A few sessions with a qualified swim coach identifying specific form flaws is often the single most impactful improvement. Interval training is the most time-efficient speed development method: short intense efforts (4x25m or 8x50m at maximum effort with generous rest) develop neuromuscular speed patterns. Lactate threshold swimming (sustained moderate-high effort for 400-800m) improves the ability to sustain higher speeds. Kick-specific work improves propulsion from the lower body, which recreational swimmers often underutilize. Hip and shoulder flexibility exercises out of the water improve stroke range of motion and efficiency.`},
  {question:'Should I eat before swimming and what should I avoid?',answer:`Pre-swim nutrition affects both performance and comfort in the water. General guideline: eat a moderate meal 2-3 hours before swimming, or a small carbohydrate snack 30-60 minutes before. The specific concern with swimming and eating is GI distress — the prone position and breathing pattern of swimming can cause nausea and cramping if the stomach is full. High-fat and high-fiber foods take longer to digest and are more likely to cause discomfort during swimming than simple carbohydrates. Good pre-swim choices: banana, toast with nut butter 2 hours prior, rice cakes, or a light smoothie 90 minutes before. Avoid: large meals within 1-2 hours, high-fiber foods, and carbonated beverages immediately before swimming. For competitive event preparation, professional swimmers eat substantial carbohydrate-rich meals 2-4 hours before races to ensure glycogen stores are full without GI interference.`},
]

const seoContent = {
  title: 'Swimming Calories Calculator',
  category: 'health' as const,
  intro: `Swimming is one of the most complete full-body workouts available — it simultaneously challenges cardiovascular fitness, muscular endurance, flexibility, and coordination across almost every major muscle group. Yet its calorie burn is frequently either overestimated (by people who feel exhausted after swimming) or underestimated (because the cool water suppresses the perceived exertion that makes effort obvious on land).

The calorie math for swimming is more variable than for running or cycling because swim efficiency varies dramatically between swimmers. Technique — which determines drag resistance through the water and the energy cost of forward propulsion — is the dominant variable in swimming calorie expenditure at any given distance.

Stroke choice also matters significantly. Butterfly and breaststroke are the most demanding strokes calorie-per-minute. Freestyle (front crawl) at comfortable effort is more efficient but at maximum effort produces very high calorie burn. Backstroke is generally the least calorie-intensive.

This calculator estimates calorie expenditure based on your weight, swim distance or duration, stroke type, estimated pace, and skill level — with adjustments that account for the drag-reducing effect of better swimming efficiency at higher skill levels.

**Long-tail searches answered here:** swimming calorie burn calculator free online usa, calories burned swimming calculator by stroke and speed, how many calories do i burn swimming 30 minutes free, swimming vs running calorie burn calculator no signup, lap swimming calorie calculator by weight and distance usa, calories burned freestyle swimming calculator free, backstroke vs breaststroke vs butterfly calorie burn calculator, open water swimming calorie burn calculator usa free, swimming calories per lap calculator by pool length free, how pool temperature affects swim calorie burn calculator, swimming calorie burn compared to walking calculator usa, water aerobics vs lap swimming calorie burn calculator, swim duration needed to burn 500 calories calculator free usa, competitive vs recreational swimming calorie comparison, triathlon swim portion calorie estimator free usa`,
  howItWorks: `This calculator uses peer-reviewed, clinically validated formulas to estimate swimming calories from your inputs. Where multiple validated methods exist, the approach with the strongest evidence base for the general adult population is used as the primary result.

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
  conclusion: `For people using swimming for weight management, the post-swim hunger response deserves attention. Many swimmers report greater post-exercise hunger than after land-based workouts of similar duration — possibly due to the cool water preventing the body temperature elevation that suppresses appetite after land exercise.

Swimming is particularly valuable for people with joint conditions — arthritis, hip replacements, chronic knee or ankle issues — that make land-based cardio difficult. The near-weightlessness of buoyancy allows cardiovascular training at heart rate intensities that would be impossible or painful on land.

To improve swimming calorie burn and efficiency simultaneously, technique coaching produces larger gains than simply swimming more laps at current form. Use [our TDEE Calculator](/calculators/health/tdee-calculator) to incorporate swimming into your overall daily energy expenditure calculation.`,
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
        generateWebAppStructuredData({ name: 'Swimming Calories Calculator', description: 'Calculate calories burned swimming based on stroke type (freestyle, backstroke, breaststroke, butterfly), distance, duration, intensity, and body weig', url: 'https://tooltrio.com/calculators/health/swimming-calories-calculator', category: 'HealthApplication' }),
        generateMedicalWebPageSchema({ name: 'Swimming Calories Calculator', description: 'Calculate calories burned swimming based on stroke type (freestyle, backstroke, breaststroke, butterfly), distance, duration, intensity, and body weig', url: 'https://tooltrio.com/calculators/health/swimming-calories-calculator' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'Swimming Calories Calculator', url: '/calculators/health/swimming-calories-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      seoContent={seoContent}
    />
  )
}
