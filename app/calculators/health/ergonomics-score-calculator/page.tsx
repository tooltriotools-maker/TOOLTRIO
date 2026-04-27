import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData, generateMedicalWebPageSchema } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Ergonomics Score Calculator — Office Workstation Assessment & Injury Risk 2026',
  description: 'Assess your workstation ergonomics for neck, back, shoulder, wrist, and eye strain risk. Score your desk setup, chair height, monitor position, keyboard placement, and lighting against evidence-based ergonomics guidelines. Free online ergonomics score calculator 2026. No signup required.',
  slug: 'ergonomics-score-calculator',
  category: 'health',
  region: 'usa',
  keywords: [
    'ergonomics score calculator 2026',
    'free ergonomics score calculator',
    'ergonomics score calculator usa 2026',
    'ergonomics score calculator free 2026',
    'ergonomics risk assessment calculator',
    'office workstation ergonomics score',
    'desk setup ergonomics checker',
    'ergonomic risk factors calculator',
    'home office ergonomics assessment',
    'neck back pain workstation calculator',
    'repetitive strain injury risk score',
    'monitor height ergonomics calculator',
    'ergonomic checklist score',
    'work from home ergonomics',
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
  {question:'What is the most common ergonomic injury for desk workers and how does it develop?',answer:`Musculoskeletal disorders — particularly lower back pain, neck pain, and repetitive strain injuries of the wrists and forearms — account for roughly 33% of all worker injury and illness cases in the US. The most common mechanism isn't a single traumatic event but cumulative microtrauma: sustained awkward postures (forward head posture, rounded shoulders) load joints and soft tissues repeatedly until compensatory mechanisms fail. Forward head posture of just 2 inches increases effective head weight on the cervical spine from 12 pounds to 32 pounds — the equivalent of adding 20 pounds to your neck eight hours per day. Text neck and computer neck are genuine clinical presentations with measurable cervical disc changes visible on imaging in younger workers.`},
  {question:'How high should my monitor be positioned?',answer:`The top of your monitor should be at or slightly below eye level, positioned 20-28 inches from your face (an arm's length away is a useful approximation). When you look at the center of the screen, your gaze should be directed slightly downward (10-20 degrees below horizontal). This reduces upper trapezius activation compared to screens at eye level or above. For dual monitors, position them symmetrically if used equally, or place the primary monitor directly in front of you and the secondary slightly to the side if used infrequently. Laptop screens are problematic because the keyboard forces a 90-degree wrist and elbow position when the screen is at the correct height — an external keyboard and mouse or a laptop stand is almost always warranted for regular laptop users.`},
  {question:'What is the 20-20-20 rule and does it actually work for eye strain?',answer:`The 20-20-20 rule — every 20 minutes, look at something 20 feet away for 20 seconds — was developed to reduce digital eye strain (also called computer vision syndrome). It works by allowing the ciliary muscles in your eyes to relax from the sustained near-focus required for screen work. These muscles must actively contract to focus on close objects and fatigue over sustained use, causing blurry vision, eye discomfort, and headaches. Scientific evidence for the specific 20-20-20 parameters is limited — the rule is more a practical guideline than a clinically validated prescription. The underlying principle is sound: frequent brief breaks from near focus reduce accommodative fatigue and blink rate recovery (screens reduce blink frequency by 66%, causing dry eye symptoms).`},
  {question:'Does standing more at a standing desk actually improve health outcomes?',answer:`Standing desks improve some health markers but the evidence is more nuanced than popular promotion suggests. A 2018 Cochrane Review found that sit-stand desks reduce sitting time by about 30-100 minutes per workday and are associated with improved lower back pain at 3-4 month follow-up. They do not significantly increase energy expenditure (standing burns only about 8-10 more calories per hour than sitting), so they don't contribute meaningfully to weight management. Prolonged standing has its own problems — varicose veins, lower limb edema, and lower back discomfort in some users. The research most consistently supports frequent postural change — alternating between sitting and standing every 30-60 minutes — rather than eliminating sitting entirely.`},
  {question:'How do I know if my chair is adjusted correctly?',answer:`A properly adjusted ergonomic chair produces this body position: feet flat on the floor (or supported footrest), knees at approximately 90 degrees or slightly more open than 90 degrees, thighs roughly horizontal, lower back supported by the lumbar support at the curve of your spine (not the mid-back), elbows at desk height when shoulders are relaxed, and a small gap (two to three fingers width) between the front edge of the seat and the back of your knees. Seat pan depth matters — too deep compresses the back of the knees and encourages slouching. Armrests should allow shoulder relaxation, not shoulder elevation. Many 'ergonomic' chairs are adjusted incorrectly by their users, eliminating most of the benefit.`},
  {question:'What are the best micro-breaks for desk workers and how often should they happen?',answer:`Research on break frequency consistently shows that short, frequent breaks are more effective than longer, infrequent ones. A 2011 study found that micro-breaks (1-2 minutes) every 20-30 minutes maintained performance better than 15-minute breaks every 2 hours. Effective break activities include: standing and walking briefly (activates postural muscles and increases circulation), neck and shoulder stretches targeting upper trapezius and levator scapulae, wrist and forearm stretches for those with keyboard-intensive work, eye focus changes (20-20-20), and brief breathing exercises for stress regulation. Standing for water refills, walking to colleagues rather than messaging them, and walking during phone calls are low-effort ways to naturally integrate movement breaks.`},
  {question:'What typing position causes carpal tunnel syndrome?',answer:`Carpal tunnel syndrome (CTS) results from compression of the median nerve in the carpal tunnel at the wrist. Risk factors in keyboard work: sustained wrist extension (hands bent upward toward the ceiling), sustained wrist flexion (hands bent downward), pinching or gripping computer mice, and sustained static postures. The 'neutral wrist' position — keeping the wrist in line with the forearm, neither flexed nor extended — minimizes carpal tunnel pressure. Wrist rests used while actively typing (rather than only during breaks) actually increase carpal tunnel pressure; they're intended for use during pauses. Keyboards with negative tilt (sloping away from you) encourage neutral wrist positions better than positive-tilt keyboards. Split keyboards can reduce ulnar deviation, another CTS risk factor.`},
  {question:'Can I set up an ergonomic workstation at home without buying expensive equipment?',answer:`Yes — many ergonomic improvements require no equipment purchases. Stack books under your monitor to reach the correct height. Use a rolled towel as a lumbar support if your chair lacks one. A laptop stand made from boxes combined with an external keyboard (often under $20) dramatically improves laptop ergonomics. Position your keyboard so your elbows are at approximately desk height — if your desk is too high, raise your chair and use a footrest (a box works). If your screen is too far right or left, reposition the desk or your chair. A phone book under your feet serves as a footrest. The most valuable ergonomic investment is typically a chair with proper lumbar support and adjustable seat height — this item is difficult to improvise effectively.`},
]

const seoContent = {
  title: 'Ergonomics Score Calculator',
  category: 'health' as const,
  intro: `Musculoskeletal disorders from poor ergonomics are the leading cause of workplace injury in the United States — responsible for more than 30% of all lost-workday injuries and illnesses according to the Bureau of Labor Statistics. The cumulative damage builds over months and years as small postural compromises and repetitive movements create chronic loading patterns in the spine, shoulders, wrists, and hips that exceed the body's capacity to recover.

The specific problems vary by work type: desk workers develop upper cross syndrome (forward head posture, rounded shoulders, tight hip flexors from extended sitting) and repetitive neck flexion from looking down at phones and low monitors. Standing workers and laborers face different patterns — lumbar disc loading from awkward lifting mechanics, plantar fasciitis from prolonged standing on hard surfaces, shoulder impingement from overhead work.

Ergonomics science uses standardized assessment tools — RULA (Rapid Upper Limb Assessment) and REBA (Rapid Entire Body Assessment) — to quantify injury risk from specific work postures and tasks. This calculator applies those principles to your self-reported work setup and habits, scoring your ergonomic risk across workstation setup, posture habits, repetitive movement patterns, and break frequency to give you a prioritized list of improvements.

**Long-tail searches answered here:** ergonomics risk score calculator free online usa, how ergonomic is my workstation calculator, work injury risk from poor posture calculator free, desk ergonomics assessment calculator no signup, home office ergonomics score calculator usa free, rsi risk calculator from computer use free tool, repetitive strain injury risk score calculator free usa, monitor height ergonomic setup calculator free online, wrist pain risk from typing ergonomics calculator free, chair height desk height ergonomic ratio calculator, daily computer use injury risk calculator usa free, ergonomic keyboard mouse benefit score calculator, back pain risk from poor workstation setup calculator, neck strain from screen position calculator usa free, ergonomics improvement priority list calculator free`,
  howItWorks: `Ergonomic risk is assessed using the OSHA-adapted Rapid Office Strain Assessment (ROSA) and RULA (Rapid Upper Limb Assessment) frameworks. Each workstation element is scored from 1 (low risk) to 5 (high risk): chair height, seat depth, and armrests; monitor height, distance, and horizontal position; keyboard and mouse height and angle; telephone position; and work duration/break frequency. Individual element scores are combined using validated weighting matrices into grand total risk scores.

Posture-related musculoskeletal disorder (MSD) risk is highest when neutral joint positions are violated for extended periods. Research shows a direct dose-response between hours of non-neutral posture and MSD risk — particularly for neck flexion >20°, shoulder elevation >30°, and wrist deviation >15°.`,
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
  tipsSection: `The monitor top should be at or just below eye level when sitting straight — not the center of the monitor. Most people position monitors too low (causing prolonged neck flexion) or, less commonly, too high. If bifocals are worn, the monitor may need to be lower to avoid tilting the head backward.

Rest your eyes every 20-20-20: every 20 minutes, look at something 20 feet away for 20 seconds. This accommodative reflex exercise reduces eye strain from prolonged near-focus work without requiring a break from productivity.

Sit-stand alternation is more effective than either sustained sitting or sustained standing — research recommends alternating every 30-60 minutes. Standing for 20 minutes, sitting for 40 minutes, and repeating this pattern throughout the workday has been shown to reduce lower back discomfort compared to prolonged sitting.`,
  scienceSection: `The landmark OSHA ergonomics standard (29 CFR 1910.900), published in 2000 and quickly repealed in 2001 through Congressional action, was estimated to prevent 460,000 musculoskeletal injuries per year if implemented. This legislative history reflects the economic controversy around ergonomics standards despite strong epidemiological evidence that prolonged non-neutral postures cause musculoskeletal disorders. BLS estimates that MSDs account for 30% of all worker compensation claims — demonstrating the substantial economic and health burden from workstation ergonomic risk.`,
  conclusion: `The most impactful ergonomic interventions are almost always free: monitor height adjustment (top of screen at eye level or slightly below), chair height (feet flat, thighs parallel to floor), keyboard and mouse positioning (wrists neutral, elbows at ~90 degrees), and regular breaks with movement. Equipment — standing desks, ergonomic chairs, vertical mice — helps, but it doesn't replace correct setup and movement habits.

The 20-20-20 rule applies beyond eyes: every 20 minutes, take 20 seconds to change your posture, stand briefly, or do a micro-movement. This prevents the progressive muscle fatigue and joint loading that occurs when any single posture is held continuously for hours.

If you're experiencing persistent pain, numbness, or tingling despite addressing your ergonomic setup, an in-person ergonomic assessment by an occupational therapist is worth the investment.`,
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
        generateWebAppStructuredData({ name: 'Ergonomics Score Calculator', description: 'Assess your workstation ergonomics for neck, back, shoulder, wrist, and eye strain risk. Score your desk setup, chair height, monitor position, keyboa', url: 'https://tooltrio.com/calculators/health/ergonomics-score-calculator', category: 'HealthApplication' }),
        generateMedicalWebPageSchema({ name: 'Ergonomics Score Calculator', description: 'Assess your workstation ergonomics for neck, back, shoulder, wrist, and eye strain risk. Score your desk setup, chair height, monitor position, keyboa', url: 'https://tooltrio.com/calculators/health/ergonomics-score-calculator' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'Ergonomics Score Calculator', url: '/calculators/health/ergonomics-score-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      seoContent={seoContent}
    />
  )
}
