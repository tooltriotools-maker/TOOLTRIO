import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData, generateMedicalWebPageSchema } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Lean Body Mass Calculator — Fat-Free Mass from Height, Weight & Body Fat % 2026',
  description: 'Calculate your lean body mass (fat-free mass) using the Boer formula, James formula, and Hume formula. Use lean body mass for precise protein intake, TDEE, and anesthetic drug dosing calculations. Free online lean body mass calculator 2026. No signup required.',
  slug: 'lean-body-mass-calculator',
  category: 'health',
  region: 'usa',
  keywords: [
    'lean body mass calculator 2026',
    'free lean body mass calculator',
    'lean body mass calculator usa 2026',
    'lean body mass calculator free 2026',
    'lean body mass calculator',
    'fat free mass calculator',
    'lean body mass formula',
    'boer formula lean body mass',
    'lean mass vs fat mass',
    'how to calculate lean body mass',
    'lean mass from body fat percentage',
    'lean body weight for drug dosing',
    'lean mass and metabolic rate',
    'lean body mass for protein targets',
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
  {question:'What is lean body mass and why is it more important than total weight?',answer:`Lean body mass (LBM) is the total mass of everything in your body except fat — muscles, bones, organs, blood, water, and connective tissue. It's the metabolically active component of your body composition. Total weight on a scale is meaningless without knowing how much is lean tissue and how much is fat. A 180-pound person at 15% body fat has 153 pounds of lean mass and 27 pounds of fat — a very different metabolic and health profile than a 180-pound person at 35% body fat (117 pounds lean, 63 pounds fat). Lean mass drives your resting metabolic rate (muscle burns approximately 6-10 calories per pound per day at rest), influences insulin sensitivity, determines physical strength and function, and correlates strongly with longevity. Losing weight without preserving lean mass (common on crash diets) permanently lowers your metabolism and is associated with weight regain.`},
  {question:'How accurate are lean body mass calculators compared to DEXA scans?',answer:`Lean body mass calculators based on height, weight, and sometimes circumference measurements use population-derived equations (Boer, Siri, James, Hume formulas) that have moderate accuracy at the population level but significant individual error. Mean error is typically 2-5 kg, with standard deviations of 3-6 kg. For a person with truly unusual body composition (very muscular, very lean, or very obese), error can exceed 10 kg. DEXA (dual-energy X-ray absorptiometry) scan is the gold standard for body composition in clinical research, with accuracy of 0.5-1 kg for lean mass. It also provides regional body composition (arm, leg, trunk, android/gynoid) and bone density. Bioelectrical impedance analysis (BIA), used in home scales and fitness devices, has accuracy similar to or slightly better than circumference-based calculators. Hydrostatic weighing and air displacement plethysmography (Bod Pod) are also more accurate than calculators. For tracking trends over time, the same measurement method used consistently is more valuable than seeking the 'most accurate' single method.`},
  {question:'What happens to lean body mass as you age?',answer:`Lean body mass — particularly skeletal muscle — declines approximately 3-8% per decade after age 30, and the rate accelerates after 60. By age 80, adults have lost an average of 30-40% of their peak muscle mass compared to their twenties. This process, called sarcopenia when it reaches clinically significant levels, affects approximately 10-15% of adults over 65 and 30-50% of adults over 80. Beyond the obvious reduction in strength and physical function, sarcopenia reduces metabolic rate, increases fall and fracture risk, impairs glucose metabolism, and is independently associated with all-cause mortality. The good news: muscle loss with aging is not inevitable. Regular resistance training even in the 70s and 80s produces significant muscle mass gains — studies demonstrate 20-40% strength increases and meaningful lean mass gains in adults over 70 from 12-week progressive resistance training programs.`},
  {question:'How do I increase lean body mass without gaining too much fat?',answer:`Building lean mass while minimizing fat gain (lean bulking) requires a modest caloric surplus, adequate protein, and consistent progressive resistance training. The practical evidence: a surplus of 200-300 calories per day above maintenance (rather than larger surpluses) produces primarily lean mass gain in trained individuals. Natural muscle gain rates are approximately 0.5-2 pounds per month in beginners, dropping to 0.25-0.5 pounds per month for intermediate trainees — meaning very small caloric surpluses are sufficient. Protein intake of 0.7-1g per pound of body weight is the most well-supported range. Progressive overload — systematically increasing training stimulus over time — is the irreplaceable driver of muscle protein synthesis. Sleep (7-9 hours) is underrated: growth hormone is released primarily during slow-wave sleep and is essential for muscle protein synthesis. Eating protein (30-40g) within 2 hours of resistance training, particularly post-workout, maximizes muscle protein synthesis.`},
  {question:'Can cardio exercise cause muscle loss?',answer:`Excessive cardio can impair muscle mass gains but doesn't typically cause muscle loss in people maintaining adequate protein and resistance training. The concern is the 'interference effect': concurrent training (heavy cardio combined with heavy resistance training in the same session or very closely timed) can blunt the muscle protein synthesis response to resistance training, likely through AMPK pathway activation from cardio competing with the mTOR pathway activation from lifting. Practical implications: extremely high volumes of endurance training (running 50+ miles per week or triathlon training) combined with aggressive resistance training can limit muscle development. For most people doing 3-5 cardio sessions per week of moderate duration, muscle maintenance is fully achievable with adequate protein. 'Cardio kills gains' is a significant exaggeration for typical recreational exercisers — the primary driver of muscle loss is inadequate protein, insufficient resistance training stimulus, or severe caloric restriction.`},
  {question:'Why does muscle mass matter for preventing type 2 diabetes?',answer:`Skeletal muscle is the largest glucose disposal organ in the body — accounting for approximately 70-80% of insulin-stimulated glucose uptake after a meal. When you eat carbohydrates, the glucose spike triggers insulin release, and muscles absorb most of that glucose for storage as glycogen or for energy use. People with greater lean mass have more 'storage capacity' for glucose and more insulin receptors per unit body mass. Conversely, people who have lost lean mass (through aging, sedentary lifestyle, or crash dieting) have less capacity for glucose disposal, producing higher and more prolonged glucose spikes after meals — the characteristic feature of insulin resistance. A 2014 study in the Journal of Clinical Endocrinology found that each 10% increase in skeletal muscle index was associated with a 12% reduction in diabetes risk. Building and maintaining lean mass through resistance training is one of the most effective long-term strategies for preventing type 2 diabetes.`},
  {question:'How does protein timing affect lean body mass?',answer:`The post-exercise anabolic window — the belief that protein must be consumed within 30 minutes of exercise or gains are lost — is largely a myth as originally framed. Muscle protein synthesis is elevated for 24-48 hours after resistance training, not just 30 minutes. However, protein timing does matter for maximizing lean mass, just over a broader window. More current evidence supports: consuming 30-40 grams of protein per meal (the threshold for maximal stimulation of muscle protein synthesis is approximately 0.4g protein per kg body weight per meal), distributing protein intake roughly evenly across 3-4 meals rather than concentrating it in one or two, and consuming protein within 1-2 hours before or after exercise (particularly important for training in the fasted state or 4+ hours post-last meal). Pre-sleep protein (30-40g of casein or another slow-digesting protein before bed) consistently improves overnight muscle protein synthesis in studies of resistance trainers.`},
  {question:'What is fat-free mass index (FFMI) and how is it used?',answer:`FFMI (Fat-Free Mass Index) is calculated as lean body mass in kg divided by height in meters squared — essentially a BMI but using lean mass instead of total body mass. FFMI accounts for the fact that taller people have more lean mass simply due to scale, just as BMI accounts for height in body weight assessment. In the context of drug testing and natural vs. enhanced (steroid-using) athlete detection, FFMI became notable: a 1995 study found that natural bodybuilders had FFMI values under 25.0 kg/m2, while steroid users easily exceeded 25.0. An FFMI above 25 is considered a marker of exceptional natural development or possible performance-enhancing drug use in the bodybuilding context. For clinical assessment, FFMI is used in obesity assessment to distinguish between people with high total BMI due to muscle versus fat — athletes can have BMI indicating 'obesity' while having high FFMI, indicating entirely appropriate body composition.`},
]

const seoContent = {
  title: 'Lean Body Mass Calculator',
  category: 'health' as const,
  intro: `Lean body mass — everything in your body that isn't fat — is one of the most useful and undertracked metrics in health and fitness. It encompasses muscle, bone, organs, water, and connective tissue. While people obsess over scale weight, lean body mass is actually the component most directly tied to metabolic rate, functional capacity, longevity, and the quality of body composition change during weight loss or gain.

The clinical importance of lean mass has become clearer as research accumulates: each pound of muscle mass burns approximately 6-10 additional calories per day at rest compared to fat. Preserving or increasing lean mass during weight loss maintains metabolic rate, making weight maintenance easier. Sarcopenia — age-related muscle loss — starts in the 30s at a rate of roughly 3-5% per decade without resistance training, and accelerates after 60 with profound effects on functional independence and mortality risk.

Several methods estimate lean body mass: body fat percentage methods (Navy tape, BIA, DEXA, skinfold calipers) derive lean mass by subtracting estimated fat mass from total weight. The Boer formula provides a direct formula-based estimate from height and weight.

This calculator estimates your lean body mass using multiple formulas for comparison and gives context on what it means for your metabolic rate, protein needs, and strength training targets.

**Long-tail searches answered here:** lean body mass calculator free online usa, how to calculate lean muscle mass free tool, lean mass vs fat mass calculator by weight free, total body lean mass calculator no signup usa, skeletal muscle mass calculator free online, fat free body mass calculator by height weight free, lean body mass percentage calculator by gender free, lean mass index calculator vs bmi free usa online, how to increase lean body mass calculator free, lean mass for powerlifters calculator usa free, ffmi fat free mass index calculator free online, lean body mass goal calculator for my height free, lean to fat ratio calculator by measurements usa free, lean body mass changes from resistance training calculator, lean body mass decline with aging calculator free usa`,
  howItWorks: `This calculator uses peer-reviewed, clinically validated formulas to estimate lean body mass from your inputs. Where multiple validated methods exist, the approach with the strongest evidence base for the general adult population is used as the primary result.

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
  conclusion: `Lean body mass is most useful as a tracking metric — particularly during weight loss, where you want to confirm that most loss is coming from fat rather than muscle. If you lose 20 pounds and your lean mass barely changes, you're doing it right. If your lean mass drops significantly alongside fat mass, your protein intake and resistance training stimulus need adjustment.

Protein need scales with lean mass, not total body weight — 0.7-1g of protein per pound of lean body mass is the research-supported target for active adults seeking to preserve or build muscle.

Use [our Body Fat Calculator](/calculators/health/body-fat-calculator) alongside this to track both lean mass and fat mass changes over time, and [our Muscle Gain Calculator](/calculators/health/muscle-gain-calculator) to set realistic targets for increasing your lean mass through resistance training.`,
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
        generateWebAppStructuredData({ name: 'Lean Body Mass Calculator', description: 'Calculate your lean body mass (fat-free mass) using the Boer formula, James formula, and Hume formula. Use lean body mass for precise protein intake, ', url: 'https://tooltrio.com/calculators/health/lean-body-mass-calculator', category: 'HealthApplication' }),
        generateMedicalWebPageSchema({ name: 'Lean Body Mass Calculator', description: 'Calculate your lean body mass (fat-free mass) using the Boer formula, James formula, and Hume formula. Use lean body mass for precise protein intake, ', url: 'https://tooltrio.com/calculators/health/lean-body-mass-calculator' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'Lean Body Mass Calculator', url: '/calculators/health/lean-body-mass-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      seoContent={seoContent}
    />
  )
}
