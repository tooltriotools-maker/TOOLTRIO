import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData, generateMedicalWebPageSchema } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'TDEE Calculator — Total Daily Energy Expenditure with Activity Multipliers 2026',
  description: 'Free TDEE Calculator 2026 — Calculate your Total Daily Energy Expenditure with activity level adjustments. Instant results for weight loss, maintenance, and muscle gain. Based on Harris-Benedict & Mifflin formulas.',
  slug: 'tdee-calculator',
  category: 'health',
  region: 'usa',
  keywords: [
    'tdee calculator 2026',
    'free tdee calculator',
    'tdee calculator usa 2026',
    'tdee calculator 2026',
    'total daily energy expenditure 2026',
    'maintenance calories calculator 2026',
    'tdee calculator with body fat percentage',
    'how to calculate total daily energy expenditure',
    'maintenance calories by activity level',
    'tdee for weight loss how much below',
    'difference between bmr and tdee',
    'tdee sedentary vs moderately active',
    'katch mcardle tdee calculator',
    'tdee calculator for women 40s',
    'how does tdee change with weight loss',
    'tdee for intermittent fasting',
  ],
})

const relatedCalculators = [
    {"name":"Calorie Calculator","href":"/calculators/health/calorie-calculator","icon":"🍎","desc":"Daily calories by goal with macro split"},
    {"name":"BMR Calculator","href":"/calculators/health/bmr-calculator","icon":"❤️","desc":"Resting metabolic rate only"},
    {"name":"Macro Calculator","href":"/calculators/health/macro-calculator","icon":"🥗","desc":"Protein, carb, fat targets"},
    {"name":"Calorie Deficit Calculator","href":"/calculators/health/calorie-deficit-calculator","icon":"📉","desc":"Safe deficit size for your goal"},
    {"name":"Fat Loss Rate Calculator","href":"/calculators/health/fat-loss-rate-calculator","icon":"🔥","desc":"Weekly fat loss with your deficit"},
    {"name":"Body Fat Calculator","href":"/calculators/health/body-fat-calculator","icon":"💪","desc":"Body fat % for Katch-McArdle TDEE"},
    {"name":"Lean Body Mass Calculator","href":"/calculators/health/lean-body-mass-calculator","icon":"💉","desc":"LBM for more accurate TDEE"},
    {"name":"Protein Intake Calculator","href":"/calculators/health/protein-intake-calculator","icon":"🥩","desc":"Optimal protein by body weight and goal"}
]

const faqs = [
  { question: 'What is TDEE and why does it matter for weight management?', answer: 'TDEE stands for Total Daily Energy Expenditure — the total number of calories your body burns in a 24-hour period including basal metabolic rate (BMR), the thermic effect of food (TEF), and all physical activity (NEAT and exercise). It matters because it is your personal caloric breakeven point. Eating below TDEE causes weight loss; eating above it causes weight gain; eating exactly at TDEE maintains weight. Without knowing your TDEE you are essentially guessing at calorie targets, which research shows leads to systematic errors of 200-500 calories per day in both directions.' },
  { question: 'What is the difference between BMR and TDEE?', answer: 'BMR (Basal Metabolic Rate) is the calories your body burns at complete rest — essentially the energy cost of staying alive while lying still and fasting. It accounts for about 60-75% of TDEE. TDEE adds calories burned through physical activity (exercise and spontaneous movement like fidgeting, called NEAT) and the thermic effect of food (about 10% of calories consumed). For a sedentary person, TDEE is roughly 1.2× BMR. For someone doing intense daily training it could be 1.9× BMR. Most adults\' real TDEE falls somewhere between 1.3-1.6× their BMR.' },
  { question: 'How do I know which activity multiplier to choose?', answer: 'The multipliers represent ranges rather than precise categories. Sedentary (1.2) means little to no structured exercise and a low-movement job. Lightly active (1.375) means 1-3 days of moderate exercise per week or an active job with mostly standing. Moderately active (1.55) means 3-5 days of moderate-to-vigorous exercise. Very active (1.725) means hard training 6-7 days per week. Extremely active (1.9) means a very physical job (construction, military) plus daily training. Most desk workers who exercise 3-4 times per week should choose 1.375-1.55 — research consistently shows people overestimate their activity level.' },
  { question: 'Should I eat at TDEE if I want to maintain weight?', answer: 'Eating at your calculated TDEE is theoretically maintenance — but calculated TDEE is an estimate, typically accurate within 10-15% for most adults. The most reliable approach is to eat at your calculated TDEE for 2-3 weeks while accurately weighing all food and monitoring your weight. If weight is stable, the calculation is accurate for you. If you\'re gaining 0.5 lb/week, your true TDEE is roughly 250 calories below the estimate; if you\'re losing, it\'s above. This calibration step converts a population formula into a personalized measurement.' },
  { question: 'How does TDEE change during a diet?', answer: 'TDEE decreases during a caloric deficit through a process called metabolic adaptation. Three mechanisms drive this: first, BMR decreases simply because you weigh less (less metabolic tissue to maintain); second, the body reduces thyroid hormones and sympathetic nervous system activity to conserve energy; third, NEAT (unconscious movement and fidgeting) drops significantly — research shows this can account for 100-300 fewer calories burned per day within weeks of starting a diet. The combined effect can reduce TDEE by 200-500 calories below what the formula predicts at the new lower weight.' },
  { question: 'What is the Katch-McArdle formula and when should I use it?', answer: 'The Katch-McArdle formula calculates BMR from lean body mass rather than total body weight, making it more accurate for people who know their body fat percentage. Formula: BMR = 370 + (21.6 × lean body mass in kg). Because it uses lean mass directly, it is not confounded by how much body fat you carry — a very lean 170 lb person and an obese 170 lb person will have the same BMR from Mifflin-St Jeor but meaningfully different BMRs from Katch-McArdle. Use it if you have a reliable body fat measurement from a DEXA scan, hydrostatic weighing, or BodPod.' },
  { question: 'Does TDEE change significantly with age?', answer: 'Yes. BMR declines approximately 1-2% per decade after age 20, primarily because muscle mass decreases (sarcopenia begins around age 30) and spontaneous physical activity tends to decrease. By age 70, average BMR is roughly 15-20% lower than at age 20 for the same body weight. Additionally, older adults typically engage in less vigorous physical activity, reducing the activity component of TDEE. This is why maintaining or building muscle mass through resistance training becomes progressively more important with age — it counteracts the metabolic decline associated with aging.' },
  { question: 'What is the best way to accurately measure my actual TDEE?', answer: 'The gold standard is doubly labeled water (DLW) — a method using isotopically labeled water to measure CO2 production as a proxy for energy expenditure over 1-2 weeks. It\'s expensive and only used in research settings. Practically, the best way to estimate true TDEE is to accurately track food intake using a food scale (not measuring cups, which have large measurement errors for dense foods) for 2-3 weeks while monitoring weight. True TDEE = average daily calorie intake when weight is stable. This method is more accurate than any formula because it reflects your individual metabolism, not population averages.' },
]

export default function Page() {
  return (
    <CalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'TDEE Calculator', description: 'Calculate your Total Daily Energy Expenditure (TDEE) using BMR and activity factors. Find your true maintenance calories using Mifflin-St Jeor or Katch-McArdle ', url: 'https://tooltrio.com/calculators/health/tdee-calculator', category: 'HealthApplication' }),
        generateMedicalWebPageSchema({ name: 'TDEE Calculator', description: 'Calculate your Total Daily Energy Expenditure (TDEE) using BMR and activity factors. Find your true maintenance calories using Mifflin-St Jeor or Katch-McArdle ', url: 'https://tooltrio.com/calculators/health/tdee-calculator' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'TDEE Calculator', url: '/calculators/health/tdee-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      seoContent={{
        title: 'TDEE Calculator 2026',
        category: 'health',
        intro: `TDEE is the single most important number in nutrition science for any weight management goal. It represents the exact caloric breakeven point where energy in equals energy out — the threshold above which weight is gained and below which weight is lost. Every diet, every meal plan, every calorie target is ultimately defined by its relationship to this number.

The problem is that TDEE cannot be directly measured without expensive laboratory equipment. Instead, we estimate it using validated formulas that predict resting metabolism from body stats and then multiply by activity factors to account for daily movement. This calculator uses the Mifflin-St Jeor equation — currently the most accurate population-based formula for non-athletic adults — and optionally the Katch-McArdle formula for those who know their body fat percentage.

Understanding your TDEE puts you in control of your weight trajectory in a way that intuitive eating or generic calorie guidelines simply cannot. When you know your specific number, you can create a precise deficit for fat loss, a modest surplus for muscle building, or maintain within a tight range — all with predictable, measurable outcomes rather than hopeful guessing.

Use this calculator alongside [our Calorie Calculator](/calculators/health/calorie-calculator) for goal-specific targets and [our Macro Calculator](/calculators/health/macro-calculator) for a complete nutrition roadmap.

**Long-tail searches answered here:** tdee calculator free online usa 2026, total daily energy expenditure calculator by activity level, maintenance calories calculator free no signup, how many calories do i need per day tdee free, tdee calculator for weight loss and muscle gain usa, total calorie needs calculator by weight height age free, tdee for sedentary office worker calculator free online, tdee calculator for female 5 foot 5 130 pounds free, how does exercise change my tdee calculator usa, tdee vs bmr what is the difference calculator free, tdee calculator with 5 activity levels explained free, how many calories above tdee to bulk calculator free, cutting calories below tdee for fat loss calculator, tdee for someone who works out 6 days a week calculator, maintenance calories at 170 pounds male calculator free`,
        howItWorks: `This calculator first computes your BMR using either the Mifflin-St Jeor equation (standard for most adults) or the Katch-McArdle equation (if you provide body fat percentage). BMR represents 60-75% of TDEE for most people.

The BMR is then multiplied by an activity factor that accounts for calories burned through exercise and non-exercise activity thermogenesis (NEAT) — all the movement you do outside of structured workouts including walking, fidgeting, housework, and occupational activity. The activity multipliers (1.2 to 1.9) are derived from doubly labeled water studies measuring actual energy expenditure in adults at different activity levels.

Finally, the thermic effect of food (approximately 10% of total calorie intake) is already embedded in the activity multipliers, so no separate calculation is needed. The result is your estimated TDEE — your personal caloric maintenance level.`,
        benefits: [
          { title: "Multiple formula options", text: "Choose between Mifflin-St Jeor (best for most adults) and Katch-McArdle (best for those who know their body fat percentage). Getting the right formula for your situation means a more accurate starting point for any diet plan." },
          { title: "Specific activity level breakdown", text: "Five detailed activity categories with clear descriptions help you select the right multiplier — avoiding the common mistake of choosing 'moderately active' when you are actually 'lightly active', which would overestimate TDEE by 150-250 calories per day." },
          { title: "Goal-specific calorie targets", text: "See your maintenance TDEE plus adjusted calorie targets for cutting fat, aggressive cutting, maintenance, and lean bulking — all calculated from your personal TDEE rather than generalized population guidelines." },
          { title: "Macronutrient allocation", text: "At each calorie target, the calculator distributes calories across protein, carbohydrates, and fat using evidence-based ratios optimized for each goal, so you can immediately translate a calorie target into a practical meal composition." },
          { title: "Metabolic adaptation note", text: "The calculator includes important notes about metabolic adaptation — the reduction in TDEE that occurs during sustained caloric restriction — so users understand why recalculation at the new lower weight is needed every 10-15 lbs of weight loss." },
          { title: "Both formula explanations included", text: "Hover tooltips and an expandable explanation section explain exactly how each formula works and why the results might differ from other calculators — building genuine nutritional literacy rather than just delivering a number." },
        ],
        useCases: [
          { title: "Setting up a cutting phase", text: "Before starting a fat loss diet, calculate your current TDEE and set a target 20-25% below it. This creates a meaningful deficit (typically 400-600 calories for average adults) that produces visible fat loss within 2-3 weeks without triggering severe metabolic adaptation or muscle loss." },
          { title: "Planning a lean bulk", text: "After reaching your target body fat through a cut, calculate TDEE at your new weight and eat 200-300 calories above it during a muscle-building phase. This modest surplus supports muscle protein synthesis while minimizing fat regain — the hallmark of an effective lean bulk." },
          { title: "Adjusting for a physical job change", text: "Starting a physically demanding job (construction, healthcare, agriculture) significantly increases TDEE. Recalculate with a higher activity multiplier to avoid unintended weight loss that could impair energy levels and performance in your new role." },
          { title: "Post-competition recovery", text: "Athletes recovering from competition prep (bodybuilding, combat sports) often have severely suppressed TDEE from weeks of aggressive dieting. Recalculating TDEE weekly during reverse dieting helps set appropriate calorie increase increments to restore metabolism without rapid fat regain." },
        ],
        tipsSection: `Choose your activity level conservatively when in doubt. Studies using doubly labeled water consistently find that adults overestimate their activity by 20-40% when self-reporting. A person who does 3-4 gym sessions per week but sits at a desk all day is closer to 'lightly active' (1.375) than 'moderately active' (1.55).

Recalculate TDEE every 10-15 lbs of weight change. As your weight changes, your BMR changes with it. A person who started at 200 lbs and loses 30 lbs to reach 170 lbs has a meaningfully lower BMR at the new weight — continuing to eat at the TDEE calculated for 200 lbs will slow or stop fat loss.

Consider seasonal recalculation. Activity levels change significantly across seasons for many people — more outdoor activity in summer, more sedentary behavior in winter. Adjusting your calorie target seasonally prevents the common pattern of summer leanness followed by winter weight gain.`,
        scienceSection: `TDEE research is built on doubly labeled water (DLW) methodology, developed in the 1980s and now considered the gold standard for measuring free-living energy expenditure. Subjects drink water labeled with stable (non-radioactive) isotopes of hydrogen and oxygen. The differential elimination rate of these isotopes through urine, breath, and sweat provides a highly accurate measure of CO2 production and thus energy expenditure over 7-14 days.

Large-scale DLW studies have established that average TDEE in US adults is approximately 2,500-2,800 kcal/day for men and 1,900-2,200 kcal/day for women — consistent with national dietary intake survey data. Research also quantifies how TDEE varies by age, sex, body composition, and activity level, providing the empirical basis for the activity multipliers used in this and other TDEE calculators.

A critical finding from DLW research is the enormous inter-individual variability in TDEE: two people of identical age, sex, weight, and stated activity level can have TDEE values differing by 500-700 calories. This is why even the most accurate formula can only estimate — personalizing TDEE through actual food tracking and weight monitoring is ultimately the only way to know your true number.`,
        conclusion: `TDEE is the foundation of evidence-based nutrition. Once you know your number — and have calibrated it against your actual weight response over 2-3 weeks of accurate food tracking — you have a powerful, personalized tool that makes every nutrition decision more informed.

Whether your goal is to lose fat steadily, maintain a lean physique year-round, or build muscle efficiently over the coming months, the path forward starts with an accurate TDEE estimate and a consistent tracking habit. Start with this calculation, test it against reality, and refine it until you have your personal metabolic fingerprint.

Complete your nutrition picture with [our Macro Calculator](/calculators/health/macro-calculator), [our Protein Intake Calculator](/calculators/health/protein-intake-calculator), and [our Calorie Deficit Calculator](/calculators/health/calorie-deficit-calculator).`,
        comparisonTable: [
          { label: "Sedentary × 1.20", value: "Desk job, no exercise", note: "Most common category for office workers" },
          { label: "Lightly Active × 1.375", value: "1-3 days/week light exercise", note: "Walks, yoga, 2x/week gym" },
          { label: "Moderately Active × 1.550", value: "3-5 days/week moderate exercise", note: "4x/week gym at moderate intensity" },
          { label: "Very Active × 1.725", value: "Hard exercise 6-7 days/week", note: "Serious athlete, 1-2 daily sessions" },
          { label: "Extremely Active × 1.900", value: "Physical job + daily training", note: "Military, construction with training" },
          { label: "TDEE reduction at −10% body weight", value: "~−15% beyond expected", note: "Metabolic adaptation effect (Leibel et al.)" },
          { label: "NEAT contribution to TDEE", value: "15-30% above BMR", note: "Spontaneous movement — very individual" },
          { label: "Thermic effect of food", value: "~10% of calories consumed", note: "Higher for protein (20-30%) than fat (0-3%)" },
        ],
        didYouKnow: [
          'Non-exercise activity thermogenesis (NEAT) — fidgeting, posture, spontaneous movement — varies by up to 2,000 calories per day between individuals of the same size, which is why some people seem to \'eat anything and stay lean\' while others struggle with the same calorie intake.',
          'Research by Rosenbaum and Leibel found that people who lost 10% of body weight showed metabolic adaptations that persisted for at least 6 years, even after regaining the weight — suggesting the body has a \'set point\' it actively defends.',
          'Elite endurance athletes competing in events like the Tour de France can reach TDEE values of 8,000-10,000 calories per day during peak competition — over 4× the average adult\'s TDEE.',
          'A 2022 meta-analysis in Science found that TDEE plateaus in adults between ages 20-60 before declining after 60, challenging the common belief that metabolism slows continuously from young adulthood.',
        ],
        keyStats: [
          { stat: "1.2–1.9×", source: "Range of activity multipliers from sedentary to extremely active (DLW research)" },
          { stat: "±10-15%", source: "Typical accuracy range of Mifflin-St Jeor formula vs. measured BMR" },
          { stat: "100–300 kcal/day", source: "NEAT reduction during caloric deficit (metabolic adaptation research)" },
          { stat: "500–700 kcal/day", source: "Inter-individual TDEE variability at identical body size and activity" },
        ],
        mistakesDetailed: [

        ],
      }}
    />
  )
}
