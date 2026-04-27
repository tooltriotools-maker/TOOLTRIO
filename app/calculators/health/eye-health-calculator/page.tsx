import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData, generateMedicalWebPageSchema } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Eye Health Calculator — Vision Strain, Screen Time & Macular Risk Assessment 2026',
  description: 'Assess your eye health risk from screen time, UV exposure, nutrition gaps, and lifestyle factors. Calculate recommended screen breaks, blue light protection needs, and nutritional support for long-term vision health. Free online eye health calculator 2026. No signup required.',
  slug: 'eye-health-calculator',
  category: 'health',
  region: 'usa',
  keywords: [
    'eye health calculator 2026',
    'free eye health calculator',
    'eye health calculator usa 2026',
    'eye health calculator free 2026',
    'eye health risk calculator',
    'screen time eye strain calculator',
    'macular degeneration risk assessment',
    'eye fatigue calculator',
    '20 20 20 rule eye break timer',
    'vision health score',
    'blue light eye damage risk',
    'eye nutrition calculator',
    'UV exposure eye damage risk',
    'digital eye strain prevention',
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
  {question:'What is the difference between nearsightedness, farsightedness, and astigmatism?',answer:`Nearsightedness (myopia) means you see close objects clearly but distant ones blurry — the eyeball is slightly elongated, focusing images in front of the retina rather than on it. Farsightedness (hyperopia) means distance vision may be clear but near vision is blurry — the eyeball is slightly short, focusing images behind the retina. Astigmatism means the cornea or lens has an irregular curvature (more like a football than a basketball), causing blur at all distances because light focuses at multiple points. These three conditions often coexist — it's common to have myopia with astigmatism. All three are corrected by glasses, contacts, or refractive surgery (LASIK, PRK). They are distinct from age-related focusing difficulty (presbyopia) that affects nearly everyone over 45.`},
  {question:'How does screen time actually damage eyes, and is the damage permanent?',answer:`Screen time does not cause permanent structural damage to eyes in adults with otherwise healthy eyes — the vision problems associated with heavy screen use are functional, not pathological. Digital eye strain (tired, burning, blurry eyes after screen use) results from reduced blink frequency (screens reduce blinking by 40-60%), increased accommodative demand from sustained near focus, and blue light's effect on contrast sensitivity. These symptoms are fully reversible with rest. The concern about permanent damage primarily applies to children: high rates of near work in childhood are robustly associated with myopia development and progression. Population-level myopia rates have increased dramatically with smartphone adoption — in East Asian cities like Seoul, myopia prevalence in children under 16 has reached 80-90%, compared to 20-30% fifty years ago.`},
  {question:'At what age should I start getting eye exams, and how frequently?',answer:`The American Academy of Ophthalmology recommends a comprehensive baseline eye exam at age 40 for adults with no symptoms or risk factors — this establishes your personal baseline for detecting glaucoma and other conditions. Before 40, adults with no problems typically don't require annual exams — every 2-4 years is generally adequate. However, more frequent exams are warranted for people with: diabetes (annually, as diabetic retinopathy is a leading cause of blindness), hypertension, strong family history of glaucoma, African American heritage (higher glaucoma risk), previous eye injury or surgery, or anyone with vision symptoms. Children should have their first comprehensive exam at age 1, again at 3-4, and before starting school.`},
  {question:'What is glaucoma and why is it called the silent thief of sight?',answer:`Glaucoma is the second leading cause of blindness worldwide after cataracts, affecting approximately 3 million Americans. It's called the silent thief because the most common form — open-angle glaucoma — causes gradual peripheral vision loss over years without pain, blurred vision, or any noticeable symptoms until advanced stages. By the time a patient notices vision loss, 40-50% of optic nerve fibers may already be permanently damaged. Elevated intraocular pressure (IOP) is the main treatable risk factor, though some people develop glaucoma with normal IOP (normal-tension glaucoma). Detection requires measuring IOP and examining the optic nerve — which is why routine eye exams matter even without symptoms. The damage is irreversible, making early detection crucial.`},
  {question:'What vitamins and nutrients actually have evidence for eye health?',answer:`The strongest evidence comes from the AREDS (Age-Related Eye Disease Study) trials for age-related macular degeneration (AMD): a specific combination of high-dose antioxidants (vitamin C 500mg, vitamin E 400 IU, beta-carotene or lutein/zeaxanthin, zinc 80mg, copper 2mg) reduced progression to advanced AMD by 25% in people with intermediate AMD. Lutein and zeaxanthin — found in leafy greens, eggs, and corn — are concentrated in the macula and appear protective against both AMD and cataracts. Omega-3 fatty acids have mixed evidence for dry eye disease. Vitamin A deficiency causes night blindness and, in severe cases, corneal scarring — but deficiency is rare in developed countries with adequate nutrition. For people with healthy eyes and no AMD risk factors, there's little evidence that supplements improve eye health beyond a nutritious diet.`},
  {question:'How does diabetes affect eye health specifically?',answer:`Diabetic retinopathy is the leading cause of new blindness in working-age Americans and affects approximately 1 in 3 people with diabetes. Chronically elevated blood glucose damages the tiny blood vessels of the retina, causing them to leak, swell, and in advanced stages to close off — triggering growth of fragile new blood vessels that bleed easily (proliferative retinopathy). Diabetic macular edema — swelling in the central vision area — can cause significant vision loss independent of proliferative disease. The good news: tight blood glucose control (HbA1c under 7%) reduces retinopathy risk by 76% and slows progression. Annual dilated eye exams are standard of care for all diabetics. Advanced retinopathy can be treated with laser photocoagulation, anti-VEGF injections, or vitrectomy if caught before severe vision loss.`},
  {question:'Can I improve my eyesight naturally without glasses or surgery?',answer:`For refractive errors (nearsightedness, farsightedness, astigmatism), there is no evidence that eye exercises, special diets, or natural techniques can improve the underlying optical geometry that causes these conditions. The cornea and lens curvature that determine focus are structural and cannot be meaningfully altered without surgery. Vision therapy — structured eye exercises supervised by an optometrist — is evidence-supported for specific conditions like convergence insufficiency, amblyopia, and some binocular vision disorders, but does not correct refractive errors. Improving nutrition may slow AMD progression (as above). Regular outdoor time in childhood (2+ hours daily) has robust evidence for reducing myopia progression risk. Claims that specific exercises can eliminate the need for glasses are not supported by controlled clinical trials.`},
  {question:'What symptoms indicate a serious eye emergency requiring immediate care?',answer:`Seek emergency eye care immediately for: sudden loss of vision in one or both eyes (can indicate retinal artery occlusion, retinal detachment, or stroke — the 'window' for treatment is hours, not days); sudden appearance of floaters with flashing lights (possible retinal tear or detachment before permanent damage); severe eye pain with nausea and vomiting (potential acute angle-closure glaucoma — can cause permanent vision loss within hours if untreated); eye injury with penetration, chemical splash, or blunt trauma; and sudden double vision or loss of peripheral vision. These are not 'wait until Monday for your regular doctor' situations — they require same-day ophthalmology evaluation. Regular floaters without flashes or vision changes, mild eye redness without pain, and gradual vision changes can be seen in a scheduled appointment.`},
]

const seoContent = {
  title: 'Eye Health Calculator',
  category: 'health' as const,
  intro: `Most eye diseases progress without symptoms until significant damage has already occurred. Age-related macular degeneration, glaucoma, and diabetic retinopathy — the leading causes of vision loss in adults — are all largely asymptomatic in early stages when intervention is most effective. This makes regular eye exams not just a vision correction issue but a genuine health screening, comparable in importance to cholesterol checks for identifying disease before it becomes irreversible.

At the same time, lifestyle factors have significant effects on long-term eye health. UV exposure without protection accelerates cataract formation and increases macular degeneration risk. Smoking is the single most modifiable risk factor for macular degeneration — smokers have 2-4x the risk of non-smokers. High blood pressure and diabetes both cause progressive retinal vascular changes. Digital eye strain affects an estimated 60-90% of people who work at computers.

This calculator assesses your risk across the main categories of eye health concern: UV damage, digital strain, disease risk factors (AMD, glaucoma, diabetic retinopathy), and nutritional gaps — giving you a prioritized view of where to focus attention.

**Long-tail searches answered here:** eye health risk calculator free online usa, how healthy are my eyes calculator free tool, screen time eye strain risk calculator no signup, digital eye strain calculator by screen hours, vision deterioration risk calculator usa free, eye health score calculator based on habits free, dry eye risk from screen use calculator free usa, macular degeneration risk factor calculator free, blue light eye damage risk calculator usa free, glaucoma risk score calculator based on family history, screen time related vision change calculator free, annual eye exam frequency calculator usa free, age related eye health decline calculator free online, contact lens eye health risk calculator free usa, daily eye exercise benefit score calculator free`,
  howItWorks: `Eye health risk assessment incorporates five evidence-based risk domains: UV exposure (cumulative cataracts and macular degeneration risk from lifetime UV-A and UV-B exposure); digital eye strain (accommodation and convergence stress from extended near-focus screen work); nutritional deficiencies (lutein, zeaxanthin, omega-3, zinc, and vitamins C and E directly affect macular pigment density); smoking (2× elevated macular degeneration risk); and genetic risk factors (family history of glaucoma, macular degeneration, or diabetic retinopathy).

Digital eye strain risk is assessed from daily screen time, screen distance, refresh rate, ambient lighting, and break frequency. The 20-20-20 rule compliance and blue light exposure timing (particularly evening) are weighted components.`,
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
  tipsSection: `Schedule comprehensive eye exams at evidence-based intervals: adults 18-39 with no risk factors: every 2 years; 40-64: every 2 years (or annually with risk factors); 65+: annually. Many vision-threatening conditions (glaucoma, macular degeneration, diabetic retinopathy) are asymptomatic until advanced — regular exams are the only way to catch them early when intervention is most effective.

Nutrition for eye health: the AREDS2 formula (vitamin C 500mg, vitamin E 400IU, lutein 10mg, zeaxanthin 2mg, zinc 80mg, copper 2mg) has been proven to reduce progression from intermediate to advanced AMD by 25% — but is only appropriate for people already diagnosed with intermediate AMD, not as prevention.

Protect against UV year-round. Cumulative UV exposure across a lifetime contributes to cataracts and macular degeneration — UV protection is important in winter (snow reflection amplifies UV) and at altitude (UV intensity increases 10% per 1,000m).`,
  scienceSection: `The Age-Related Eye Disease Study (AREDS, 2001) and AREDS2 (2013) are landmark randomized controlled trials demonstrating that specific nutritional supplements significantly reduce AMD progression. The NEI-funded studies enrolled 4,757 (AREDS) and 4,203 (AREDS2) participants and represent the highest level of evidence for nutritional intervention in any major eye disease. Blue light and retinal phototoxicity: the photoreceptor damage threshold is approximately 400× higher than typical screen exposure — current evidence does not support significant direct retinal damage from screen blue light at normal usage levels, though sleep disruption effects are well-established.`,
  conclusion: `The single highest-impact eye health habit that most people skip: comprehensive dilated eye exam every 1-2 years starting at 40, or earlier if you have diabetes, family history of glaucoma, or are highly myopic. A standard vision test at a retail chain does not substitute — it checks refraction only. A dilated exam checks optic nerve health, retinal vessel integrity, peripheral retina, and lens clarity. Early glaucoma is detectable 5-10 years before vision symptoms appear.

UV protection is the second most actionable habit. Wraparound sunglasses with 99-100% UVA/UVB protection, worn whenever outdoors, meaningfully reduce cataract and AMD risk over a lifetime of consistent use.

If you wear contact lenses, follow storage, replacement, and wearing time guidelines precisely — extended contact lens use is the dominant risk factor for serious corneal infections that can cause permanent vision changes.`,
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
        generateWebAppStructuredData({ name: 'Eye Health Calculator', description: 'Assess your eye health risk from screen time, UV exposure, nutrition gaps, and lifestyle factors. Calculate recommended screen breaks, blue light prot', url: 'https://tooltrio.com/calculators/health/eye-health-calculator', category: 'HealthApplication' }),
        generateMedicalWebPageSchema({ name: 'Eye Health Calculator', description: 'Assess your eye health risk from screen time, UV exposure, nutrition gaps, and lifestyle factors. Calculate recommended screen breaks, blue light prot', url: 'https://tooltrio.com/calculators/health/eye-health-calculator' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'Eye Health Calculator', url: '/calculators/health/eye-health-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      seoContent={seoContent}
    />
  )
}
