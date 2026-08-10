import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  
  loading: () => (
    <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
  )
})

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Infant Weight-for-Age Percentile Calculator 2026 | ToolTrio',
  description: 'Estimate infant weight-for-age percentile for 0–24 completed months using WHO Child Growth Standards. Use the result as a reference for growth tracking, not as a diagnosis.',
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
  healthSourceProfile: 'infant-weight-percentile-calculator',
  title: 'Infant Weight & Height Percentile Calculator',
  category: 'health' as const,
  intro: `Watching a baby grow is one of the most anxiety-inducing experiences of new parenthood, and much of that anxiety centers on a single question: is my baby growing normally? The answer almost never lives in a single weight measurement — it lives in the trajectory of measurements over time, plotted against age-appropriate growth standards. A baby at the 10th percentile who is consistently tracking along that curve is growing normally. A baby who was at the 50th percentile and is now at the 20th over three visits warrants attention.

The WHO Multicentre Growth Reference Study, published in 2006, established growth standards based on healthy breastfed infants in optimal conditions across six countries — representing how children grow when they're growing well. The CDC 2000 growth charts, by contrast, are references based on how American children actually grew in sample surveys. For infants under 2 years, the WHO standards are now preferred clinically.

This calculator plots your baby's weight, length, and head circumference against both WHO and CDC standards for their exact age in days, giving you a percentile ranking and a visualization of where they fall on the growth curve. Head circumference is often overlooked but is tracked at every well-child visit because it reflects brain growth.

A single measurement tells you where a baby is. The visit-to-visit trajectory tells you whether they're growing on their curve.

`,
  howItWorks: `This calculator uses the method documented for this specific calculator to estimate infant weight percentile from your inputs. Where multiple validated methods exist, the approach with the strongest evidence base for the general adult population is used as the primary result.



`,
  benefits: [
  ],
  conclusion: `If your baby's measurements fall outside the 3rd-97th percentile range, or if there's been a significant crossing of percentile lines between visits, these are findings to discuss with your pediatrician — not panic over, but discuss. Growth faltering has many causes, most of them addressable.

Breastfed babies typically follow a different growth curve than formula-fed babies: they grow faster in the first few months, then more slowly from 3-12 months. This is normal and healthy. Comparing a breastfed baby to formula-fed norms can create unnecessary concern — the WHO charts better represent breastfed infant growth norms.

Track measurements consistently at every well-child appointment, and bring this data to your pediatrician to contextualize alongside your baby's developmental milestones, feeding patterns, and overall health picture.`,
  comparisonTable: [],
  didYouKnow: [],
  keyStats: [],
  mistakesDetailed: [],
}

export default function Page() {
  
  const _faqSchema = generateFAQStructuredData(faqs)
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_faqSchema) }} />
      <CalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'Infant Weight & Height Percentile Calculator', description: 'Calculate baby weight, height, and head circumference percentile using WHO and CDC growth charts. Track development from birth to 24 months.', url: 'https://tooltrio.com/calculators/health/infant-weight-percentile-calculator', category: 'HealthApplication' }),      ]}
      relatedCalculators={relatedCalculators}
      seoContent={seoContent}
    />
    </>
  )
}
