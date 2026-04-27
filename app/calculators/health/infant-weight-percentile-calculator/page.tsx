import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData, generateMedicalWebPageSchema } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Infant Weight & Height Percentile Calculator — WHO Growth Charts (0-24 months) 2026',
  description: 'Free Infant Weight Percentile Calculator 2026. Calculate your baby\'s weight, height, and head circumference percentile using WHO and CDC growth charts. Track development from birth to 24 months.\', height, and head circumference percentiles using WHO growth charts for ages 0-24 months. Understand what percentile means for growth and identify patterns that warrant medical attention.',
  slug: 'infant-weight-percentile-calculator',
  category: 'health',
  region: 'usa',
  keywords: [
    'infant weight percentile calculator 2026',
    'free infant weight percentile calculator',
    'infant weight percentile calculator usa 2026',
    'weight calculator 2026',
    'healthy weight calculator 2026',
    'weight loss calculator 2026',
    'infant weight percentile calculator',
    'baby weight chart calculator',
    'who growth chart calculator',
    'baby percentile by age',
    'newborn weight percentile',
    'infant growth chart calculator',
    'baby height percentile 0 to 24 months',
    'child growth tracking',
    'is my baby growing normally',
    'baby weight for age percentile',
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
  {question:'What does it mean if my baby is in the 10th percentile for weight?',answer:`Being in the 10th percentile means your baby weighs more than 10% of babies the same age and sex, and less than 90%. Importantly, there is no 'ideal' percentile — babies at the 5th and 95th percentiles can be equally healthy. What matters far more than the percentile itself is the trend: a baby consistently growing along their own curve (even a low one) is healthy. A baby dropping from the 60th to the 20th percentile over several months warrants investigation. Pediatricians are concerned when weight-for-length percentile falls below the 2nd-3rd percentile, when there is significant crossing of percentile lines downward, or when weight gain has stalled completely. Genetics plays a major role — a baby born to two small parents will naturally track lower percentiles than the population average.`},
  {question:'What is the difference between CDC and WHO growth charts?',answer:`The WHO growth charts (released 2006) describe how healthy breastfed babies in optimal conditions grow worldwide. They are prescriptive — they show how babies should grow. The CDC charts (2000) are descriptive — they show how US babies grew in a specific sample that included mostly formula-fed infants. For children under 2, the American Academy of Pediatrics recommends the WHO charts because breastfed infants are the biological norm and the WHO charts reflect optimal growth more accurately. The practical difference: breastfed babies often track lower on CDC charts in the first 3-6 months, creating false concern. After age 2, the CDC charts are generally recommended for US children.`},
  {question:'How much should a newborn lose weight after birth and when should they regain it?',answer:`Most newborns lose 5-7% of birth weight in the first 3-5 days of life due to fluid loss and meconium passage. A loss of up to 10% is considered within normal range; above 10% warrants evaluation of feeding adequacy. Formula-fed babies typically regain birth weight by day 10-14. Breastfed babies may take up to 2 weeks to regain birth weight as milk supply establishes. After the initial recovery, expected weight gain is approximately 20-35 grams (0.7-1.2 oz) per day for the first 3 months. Any consistent failure to gain weight or continued weight loss after day 5-7 warrants prompt evaluation of feeding technique, milk supply, and the baby's ability to transfer milk effectively.`},
  {question:'What causes a baby to be born small (SGA) or large (LGA)?',answer:`Small for gestational age (SGA, below the 10th percentile at birth) results from: placental insufficiency (the most common cause, reducing nutrient and oxygen delivery to the fetus), maternal conditions including preeclampsia, chronic hypertension, diabetes, smoking, alcohol or substance use, severe malnutrition, and infections (particularly TORCH infections — toxoplasmosis, rubella, CMV, herpes). Constitutional small size from genetics is also common and benign. Large for gestational age (LGA, above the 90th percentile) is most commonly caused by gestational diabetes or pre-existing diabetes — excess maternal glucose crosses the placenta and stimulates fetal insulin production, which acts as a growth hormone. Genetic factors and post-dates pregnancy also contribute to LGA.`},
  {question:'When should I be concerned about my baby\'s weight and call the pediatrician?',answer:`Call your pediatrician promptly if: your newborn loses more than 10% of birth weight; your baby hasn't regained birth weight by 2 weeks of age; your baby's weight gain has stopped completely for more than 2 weeks; your baby drops across two major percentile lines on the growth chart over 2-3 visits; your breastfed baby has fewer than 6-8 wet diapers per day after day 4; your baby seems excessively sleepy and difficult to wake for feeds; your baby appears jaundiced, pale, or lethargic. Weight concerns in infancy are almost always better addressed early — feeding problems, tongue ties, low milk supply, and medical conditions causing poor growth are all more easily resolved when caught in the first weeks of life.`},
  {question:'How are growth percentiles calculated?',answer:`Growth percentile charts are constructed from large population surveys measuring thousands of infants at various ages. The data is fitted to statistical distributions (typically LMS — lambda, mu, sigma — method), which describes the weight distribution at each age as a smooth curve. The 50th percentile is the median weight — half of infants weigh more and half weigh less. The lines on growth charts represent standard deviations from the mean: the 2nd percentile corresponds to roughly -2 standard deviations. When a child is measured, their weight-for-age is compared to this reference population. CDC charts use data from NHANES surveys of US children; WHO charts use data from children in optimal conditions in six countries across multiple continents.`},
  {question:'Does birth weight predict adult health outcomes?',answer:`Birth weight is associated with several long-term health outcomes, though the relationships are complex. Low birth weight (under 2,500g) is associated with higher adult risk of cardiovascular disease, type 2 diabetes, hypertension, and chronic kidney disease — the Barker hypothesis (developmental origins of adult disease) proposes that fetal nutrient restriction causes permanent metabolic adaptations that become disadvantageous in nutritionally abundant environments. Very high birth weight (above 4,500g) is associated with higher adult obesity risk and, for those born to diabetic mothers, higher diabetes risk. However, these associations are statistical and don't determine individual outcomes — the vast majority of low-birthweight infants grow up to be healthy adults. Postnatal nutrition, environment, and lifestyle factors substantially modify these initial trajectories.`},
  {question:'Should I be concerned if my baby follows a different growth curve than my doctor expected?',answer:`Normal growth for individual infants can look quite different from textbook curves. Genetic potential, feeding method, and constitution all create legitimate individual variation. Breastfed infants often grow faster than formula-fed babies in the first 3 months, then more slowly from 6-12 months — this normal divergence from the CDC curve (developed mostly with formula-fed data) has caused unnecessary supplementation anxiety for many breastfeeding families. Premature infants should have growth plotted on corrected age charts until age 2-3 years. Infants of different ethnic backgrounds have genuine variation in growth patterns. The most important question is always: is this baby crossing centiles downward? A baby who consistently follows any curve — even the 3rd percentile — over multiple visits is almost certainly growing appropriately for their genetic potential.`},
]

const seoContent = {
  title: 'Infant Weight & Height Percentile Calculator',
  category: 'health' as const,
  intro: `Watching a baby grow is one of the most anxiety-inducing experiences of new parenthood, and much of that anxiety centers on a single question: is my baby growing normally? The answer almost never lives in a single weight measurement — it lives in the trajectory of measurements over time, plotted against age-appropriate growth standards. A baby at the 10th percentile who is consistently tracking along that curve is growing normally. A baby who was at the 50th percentile and is now at the 20th over three visits warrants attention.

The WHO Multicentre Growth Reference Study, published in 2006, established growth standards based on healthy breastfed infants in optimal conditions across six countries — representing how children grow when they're growing well. The CDC 2000 growth charts, by contrast, are references based on how American children actually grew in sample surveys. For infants under 2 years, the WHO standards are now preferred clinically.

This calculator plots your baby's weight, length, and head circumference against both WHO and CDC standards for their exact age in days, giving you a percentile ranking and a visualization of where they fall on the growth curve. Head circumference is often overlooked but is tracked at every well-child visit because it reflects brain growth.

A single measurement tells you where a baby is. The visit-to-visit trajectory tells you whether they're growing on their curve.

**Long-tail searches answered here:** infant weight percentile calculator free online usa, baby weight percentile calculator by age free tool, is my baby a healthy weight cdc growth chart calculator, newborn weight percentile calculator no account, 6 month baby weight percentile calculator free usa, child growth percentile calculator cdc free online, who growth chart vs cdc chart comparison calculator free, newborn birth weight percentile calculator usa free, how much should my 3 month old weigh calculator, breastfed vs formula fed baby weight curve calculator, low birth weight percentile risk calculator usa free, preemie adjusted age weight percentile calculator free, infant weight for length percentile calculator usa, 9 month baby growth percentile assessment calculator free, baby weight gain per week tracker calculator usa free`,
  howItWorks: `This calculator uses peer-reviewed, clinically validated formulas to estimate infant weight percentile from your inputs. Where multiple validated methods exist, the approach with the strongest evidence base for the general adult population is used as the primary result.

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
  conclusion: `If your baby's measurements fall outside the 3rd-97th percentile range, or if there's been a significant crossing of percentile lines between visits, these are findings to discuss with your pediatrician — not panic over, but discuss. Growth faltering has many causes, most of them addressable.

Breastfed babies typically follow a different growth curve than formula-fed babies: they grow faster in the first few months, then more slowly from 3-12 months. This is normal and healthy. Comparing a breastfed baby to formula-fed norms can create unnecessary concern — the WHO charts better represent breastfed infant growth norms.

Track measurements consistently at every well-child appointment, and bring this data to your pediatrician to contextualize alongside your baby's developmental milestones, feeding patterns, and overall health picture.`,
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
        generateWebAppStructuredData({ name: 'Infant Weight & Height Percentile Calculator', description: 'Calculate baby weight, height, and head circumference percentile using WHO and CDC growth charts. Track development from birth to 24 months.', url: 'https://tooltrio.com/calculators/health/infant-weight-percentile-calculator', category: 'HealthApplication' }),
        generateMedicalWebPageSchema({ name: 'Infant Weight & Height Percentile Calculator', description: 'Calculate baby weight, height, and head circumference percentile using WHO and CDC growth charts. Track development from birth to 24 months.', url: 'https://tooltrio.com/calculators/health/infant-weight-percentile-calculator' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'Infant Weight & Height Percentile Calculator', url: '/calculators/health/infant-weight-percentile-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      seoContent={seoContent}
    />
  )
}
