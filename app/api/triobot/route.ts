import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// ─── Knowledge base ───────────────────────────────────────────────────────────
const KB: Record<string, { answer: string; tools: { n: string; p: string; d: string }[] }> = {
  emi: {
    answer: `EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1)\n• P = Principal | r = Monthly rate | n = Tenure months\n\nExample: ₹5,00,000 at 10% for 5 years\n→ EMI ≈ ₹10,624/month | Total Interest: ₹1,37,440`,
    tools: [
      { n: 'EMI Calculator', p: '/calculators/finance/emi-calculator', d: 'Find monthly EMI for any loan — home, car or personal.' },
      { n: 'Home Loan Calculator', p: '/calculators/finance/home-loan-calculator', d: 'Calculate home loan EMI and total interest payable.' },
    ]
  },
  sip: {
    answer: `SIP Maturity = P × [(1+r)ⁿ − 1] ÷ r × (1+r)\n\nExample: ₹5,000/month at 12% for 10 years\n→ Invested: ₹6,00,000 | Maturity: ₹11,61,695 | Gains: ₹5,61,695`,
    tools: [
      { n: 'SIP Calculator', p: '/calculators/finance/sip-calculator', d: 'Calculate returns on monthly SIP investments.' },
      { n: 'Lumpsum Calculator', p: '/calculators/finance/lumpsum-calculator', d: 'Calculate returns on a one-time lumpsum investment.' },
    ]
  },
  compound_interest: {
    answer: `A = P(1 + r/n)^(nt)\n\nExample: ₹1,00,000 at 8% yearly for 10 years → ₹2,15,892\nRule of 72: Double your money in 72 ÷ rate years`,
    tools: [
      { n: 'Compound Interest Calculator', p: '/calculators/finance/compound-interest-calculator', d: 'See how money grows with compound interest over time.' },
      { n: 'Simple Interest Calculator', p: '/calculators/finance/simple-interest-calculator', d: 'Calculate simple interest on principal over any period.' },
    ]
  },
  mortgage: {
    answer: `Monthly Payment = P[r(1+r)ⁿ] ÷ [(1+r)ⁿ−1]\n\nExample: $300,000 at 7% for 30 years\n→ Monthly: $1,996 | Total Interest: $418,560`,
    tools: [
      { n: 'Mortgage Calculator', p: '/calculators/finance/mortgage-calculator', d: 'Calculate US mortgage payment including PITI.' },
      { n: 'Rent vs Buy Calculator', p: '/calculators/finance/rent-vs-buy-calculator', d: 'Should you rent or buy? Compare the financial difference.' },
    ]
  },
  '401k': {
    answer: `A 401k is a US employer-sponsored retirement plan.\n\n• Contributions are pre-tax (reduces taxable income now)\n• Employer match is free money — always contribute at least enough to get the full match\n• 2024 contribution limit: $23,000 ($30,500 if 50+)\n• Money grows tax-deferred until withdrawal`,
    tools: [
      { n: '401k Calculator', p: '/calculators/finance/401k-calculator', d: 'Project your 401k balance at retirement with employer match.' },
      { n: 'Roth IRA Calculator', p: '/calculators/finance/roth-ira-calculator', d: 'Calculate tax-free Roth IRA growth and retirement balance.' },
      { n: 'FIRE Calculator', p: '/calculators/finance/fire-calculator', d: 'Find your FIRE number and years to financial independence.' },
    ]
  },
  roth_ira: {
    answer: `Roth IRA = Tax-free retirement savings.\n\n• Contributions with after-tax money, withdrawals are tax-free\n• 2024 limit: $7,000/year ($8,000 if 50+)\n• Income limit: $161k single / $240k married (2024)\n• No required minimum distributions in your lifetime`,
    tools: [
      { n: 'Roth IRA Calculator', p: '/calculators/finance/roth-ira-calculator', d: 'Calculate tax-free Roth IRA growth and retirement balance.' },
      { n: '401k Calculator', p: '/calculators/finance/401k-calculator', d: 'Project your 401k balance at retirement with employer match.' },
    ]
  },
  retirement: {
    answer: `The 4% Rule: You can withdraw 4% of your portfolio annually in retirement and it should last 30+ years.\n\nRetirement number = Annual expenses × 25\n\nExample: Need $60,000/year → Retirement number = $1,500,000`,
    tools: [
      { n: 'Retirement Calculator', p: '/calculators/finance/retirement-calculator', d: 'How much do you need to retire? Find out in seconds.' },
      { n: 'FIRE Calculator', p: '/calculators/finance/fire-calculator', d: 'Find your FIRE number and years to financial independence.' },
      { n: '401k Calculator', p: '/calculators/finance/401k-calculator', d: 'Project your 401k balance at retirement with employer match.' },
    ]
  },
  bmi: {
    answer: `BMI = weight(kg) ÷ height(m)²\n\n• Below 18.5: Underweight\n• 18.5–24.9: Normal weight ✅\n• 25.0–29.9: Overweight\n• 30.0+: Obese\n\nExample: 70kg, 1.75m → BMI = 22.9 (Normal ✅)`,
    tools: [
      { n: 'BMI Calculator', p: '/calculators/health/bmi-calculator', d: 'Calculate BMI and see if you are in a healthy range.' },
      { n: 'Ideal Weight Calculator', p: '/calculators/health/ideal-weight-calculator', d: 'See your ideal weight range across 4 different formulas.' },
    ]
  },
  bmr: {
    answer: `BMR (Mifflin-St Jeor):\n• Men: 10×kg + 6.25×cm − 5×age + 5\n• Women: 10×kg + 6.25×cm − 5×age − 161\n\nExample (Male, 30y, 75kg, 178cm): BMR ≈ 1,717 cal/day`,
    tools: [
      { n: 'BMR Calculator', p: '/calculators/health/bmr-calculator', d: 'Calculate how many calories your body burns at rest.' },
      { n: 'TDEE Calculator', p: '/calculators/health/tdee-calculator', d: 'Find your total daily calorie burn including activity level.' },
    ]
  },
  tdee: {
    answer: `TDEE = BMR × Activity Multiplier\n\n• Sedentary: BMR × 1.2\n• Light exercise: BMR × 1.375\n• Moderate: BMR × 1.55\n• Very active: BMR × 1.725\n• Athlete: BMR × 1.9\n\nFor weight loss: eat 300–500 cal below TDEE`,
    tools: [
      { n: 'TDEE Calculator', p: '/calculators/health/tdee-calculator', d: 'Find your total daily calorie burn including activity level.' },
      { n: 'Calorie Calculator', p: '/calculators/health/calorie-calculator', d: 'Calculate daily calorie needs for your goal.' },
    ]
  },
  calories: {
    answer: `Daily Calorie Needs:\n• Women: 1,600–2,400 cal/day\n• Men: 2,000–3,000 cal/day\n\nFor weight loss: Eat 500 cal below TDEE = ~1 lb/week loss\nFor muscle gain: Eat 250–500 cal above TDEE`,
    tools: [
      { n: 'Calorie Calculator', p: '/calculators/health/calorie-calculator', d: 'Calculate daily calorie needs for weight loss, gain or maintenance.' },
      { n: 'TDEE Calculator', p: '/calculators/health/tdee-calculator', d: 'Find your total daily calorie burn including activity level.' },
      { n: 'Calorie Deficit Calculator', p: '/calculators/health/calorie-deficit-calculator', d: 'Calculate the calorie deficit to lose weight at your target rate.' },
    ]
  },
  age: {
    answer: `Age = Current date − Date of birth\n\nCalculates exact years, months, days, total days lived, and next birthday countdown.\n\nFun fact: You hit 10,000 days at roughly age 27 years and 4.5 months!`,
    tools: [
      { n: 'Age Calculator', p: '/calculators/health/age-calculator', d: 'Calculate your exact age in years, months and days.' },
      { n: 'Birthday Countdown', p: '/calculators/fun/birthday-countdown', d: 'Count down the exact days until your next birthday.' },
    ]
  },
  tip: {
    answer: `Tip Amount = Bill × Tip% ÷ 100\nPer Person = (Bill + Tip) ÷ Number of people\n\nStandard tip rates: 10% casual | 15% good service | 20% excellent`,
    tools: [
      { n: 'Tip Calculator', p: '/calculators/finance/tip-calculator', d: 'Split restaurant bill and calculate tip per person.' },
    ]
  },
  gst: {
    answer: `GST Amount = Original Price × GST% ÷ 100\nGST Slabs: 0% | 5% | 12% | 18% | 28%\nReverse GST: Base = MRP ÷ (1 + GST%/100)`,
    tools: [
      { n: 'GST Calculator', p: '/calculators/finance/gst-calculator', d: 'Add or remove GST at any slab rate — 5%, 12%, 18%, 28%.' },
    ]
  },
  percentage: {
    answer: `% of X = (Percent × X) ÷ 100\nX is Y% of Z → Z = X × 100 ÷ Y\n% change = (New−Old) ÷ Old × 100`,
    tools: [
      { n: 'ROI Calculator', p: '/calculators/finance/roi-calculator', d: 'Calculate return on investment and annualised ROI.' },
    ]
  },
  about: {
    answer: `ToolTrio is a free finance and health calculator website with 450+ tools:\n\n💰 Finance (150+): Mortgage, 401k, SIP, EMI, FIRE, Crypto, Tax...\n❤️ Health (70+): BMI, Calories, BMR, TDEE, Macros, Pregnancy...\n⚙️ Dev Tools (14+): JSON, Password, Regex, UUID...\n📮 ZIP Tools (8): Lookup, Distance, Timezone, County...\n📈 Commodities (5): Gold, Silver, Crude Oil...\n🎉 Fun (12+): Age in Days, Birthday, Lucky Number...\n\nAll 100% free — no signup needed!`,
    tools: []
  }
}

type ToolEntry = { n: string; p: string; c: string; d: string }

const ALL_TOOLS: ToolEntry[] = [
  { n: 'SIP Calculator', p: '/calculators/finance/sip-calculator', c: 'finance', d: 'Calculate returns on monthly SIP investments.' },
  { n: 'EMI Calculator', p: '/calculators/finance/emi-calculator', c: 'finance', d: 'Find monthly EMI for any loan.' },
  { n: 'Compound Interest', p: '/calculators/finance/compound-interest-calculator', c: 'finance', d: 'See how money grows with compound interest.' },
  { n: 'Simple Interest', p: '/calculators/finance/simple-interest-calculator', c: 'finance', d: 'Calculate simple interest on any principal.' },
  { n: 'Mortgage Calculator', p: '/calculators/finance/mortgage-calculator', c: 'finance', d: 'Calculate US mortgage monthly payment (PITI).' },
  { n: '401k Calculator', p: '/calculators/finance/401k-calculator', c: 'finance', d: 'Project your 401k balance at retirement with employer match.' },
  { n: 'Roth IRA Calculator', p: '/calculators/finance/roth-ira-calculator', c: 'finance', d: 'Calculate tax-free Roth IRA growth and retirement balance.' },
  { n: 'Retirement Calculator', p: '/calculators/finance/retirement-calculator', c: 'finance', d: 'Find how much you need to retire comfortably.' },
  { n: 'FIRE Calculator', p: '/calculators/finance/fire-calculator', c: 'finance', d: 'Find your FIRE number and years to financial independence.' },
  { n: 'Budget Planner', p: '/calculators/finance/budget-planner-calculator', c: 'finance', d: 'Plan monthly budget using the 50/30/20 rule.' },
  { n: 'BMI Calculator', p: '/calculators/health/bmi-calculator', c: 'health', d: 'Calculate BMI and see if you are in a healthy range.' },
  { n: 'BMR Calculator', p: '/calculators/health/bmr-calculator', c: 'health', d: 'Calculate calories burned at rest.' },
  { n: 'TDEE Calculator', p: '/calculators/health/tdee-calculator', c: 'health', d: 'Find total daily calorie burn including activity level.' },
  { n: 'Calorie Calculator', p: '/calculators/health/calorie-calculator', c: 'health', d: 'Calculate daily calorie needs for your goal.' },
  { n: 'Age Calculator', p: '/calculators/health/age-calculator', c: 'health', d: 'Calculate your exact age in years, months and days.' },
  { n: 'Macro Calculator', p: '/calculators/health/macro-calculator', c: 'health', d: 'Calculate daily macros — protein, carbs and fat.' },
  { n: 'Ideal Weight', p: '/calculators/health/ideal-weight-calculator', c: 'health', d: 'See your ideal weight range across 4 formulas.' },
  { n: 'Body Fat Calculator', p: '/calculators/health/body-fat-calculator', c: 'health', d: 'Estimate body fat % using the US Navy method.' },
  { n: 'Tip Calculator', p: '/calculators/finance/tip-calculator', c: 'finance', d: 'Split restaurant bill and calculate tip per person.' },
  { n: 'GST Calculator', p: '/calculators/finance/gst-calculator', c: 'finance', d: 'Add or remove GST at any slab rate.' },
  { n: 'Gold Price Calculator', p: '/commodities/gold-price-calculator', c: 'commodities', d: 'Calculate the value of gold by weight and karat.' },
  { n: 'ZIP Code Lookup', p: '/zip/zip-code-lookup', c: 'zip', d: 'Look up city, state and county for any US ZIP code.' },
  { n: 'ZIP Distance', p: '/zip/zip-code-distance', c: 'zip', d: 'Calculate distance between two US ZIP codes.' },
  { n: 'Debt Payoff Calculator', p: '/calculators/finance/debt-payoff-calculator', c: 'finance', d: 'Pay off debt faster using avalanche or snowball method.' },
  { n: 'Savings Goal Calculator', p: '/calculators/finance/savings-goal-calculator', c: 'finance', d: 'Find how much to save monthly to reach your goal.' },
  { n: 'Auto Loan Calculator', p: '/calculators/finance/auto-loan-calculator', c: 'finance', d: 'Calculate car loan monthly payment.' },
  { n: 'Pregnancy Calculator', p: '/calculators/health/pregnancy-calculator', c: 'health', d: 'Calculate due date and week-by-week pregnancy timeline.' },
  { n: 'Sleep Cycle Calculator', p: '/calculators/health/sleep-cycle-calculator', c: 'health', d: 'Find the best time to wake up based on sleep cycles.' },
  { n: 'Heart Rate Calculator', p: '/calculators/health/heart-rate-calculator', c: 'health', d: 'Calculate your max heart rate and cardio training zones.' },
  { n: 'Running Pace Calculator', p: '/calculators/health/running-pace-calculator', c: 'health', d: 'Calculate running pace, finish time or distance.' },
]

const CAT_EMOJI: Record<string, string> = {
  finance: '💰', health: '❤️', dev: '⚙️', zip: '📮', commodities: '📈', fun: '🎉'
}

const WIDGET_MAP: Record<string, string> = {
  emi: 'emi', sip: 'sip', compound_interest: 'compound', simple_interest: 'simple',
  bmi: 'bmi', bmr: 'bmr', tdee: 'bmr', age: 'age', tip: 'tip', gst: 'gst', percentage: 'percentage'
}

function searchTools(query: string, limit = 5): ToolEntry[] {
  const words = query.toLowerCase().split(/\s+/).filter(w => w.length > 1)
  return ALL_TOOLS.map(t => {
    let score = 0
    const tl = t.n.toLowerCase()
    for (const w of words) {
      if (tl === w) score += 12
      else if (tl.startsWith(w)) score += 8
      else if (tl.includes(w)) score += 6
      if (t.d.toLowerCase().includes(w)) score += 2
    }
    return { t, score }
  }).filter(x => x.score > 0).sort((a, b) => b.score - a.score).slice(0, limit).map(x => x.t)
}

function detect(msg: string): { type: string; key?: string; query?: string } {
  const m = msg.toLowerCase().trim()
  if (/^(hi+|hello|hey|hii|sup|yo|howdy|namaste|good\s*(morning|evening|afternoon|day))[\s!?.]*$/.test(m)) return { type: 'greeting' }
  if (/(what is|about this site|what can you do|how many tools|who are you)/.test(m)) return { type: 'about' }
  const checks: [RegExp, string][] = [
    [/(emi|equated monthly installment|loan.*monthly)/, 'emi'],
    [/(^sip$|sip calculator|systematic invest|sip return)/, 'sip'],
    [/(compound interest|compounding formula)/, 'compound_interest'],
    [/(simple interest|si formula)/, 'simple_interest'],
    [/(mortgage|home loan payment|house.*payment)/, 'mortgage'],
    [/(401k|401 k|four.*one.*k|employer.*retirement)/, '401k'],
    [/(roth ira|roth.*retirement)/, 'roth_ira'],
    [/(retire|retirement plan|when.*retire|nest egg)/, 'retirement'],
    [/(bmi|body mass index|overweight|obesity)/, 'bmi'],
    [/(bmr|basal metabolic rate|resting calorie)/, 'bmr'],
    [/(tdee|total daily energy|maintenance calorie)/, 'tdee'],
    [/(how old|exact age|age.*calculator|date of birth|dob)/, 'age'],
    [/(tip.*restaurant|split.*bill|gratuity.*restaurant)/, 'tip'],
    [/(gst|goods.*services tax)/, 'gst'],
    [/(percent|% of|what.*%)/, 'percentage'],
    [/(calorie|how much.*eat|daily.*calorie)/, 'calories'],
    [/(about|overview|what.*site|all.*tools|categories)/, 'about'],
  ]
  for (const [rx, key] of checks) {
    if (rx.test(m)) return { type: 'knowledge', key }
  }
  return { type: 'search', query: m }
}

function respond(message: string): { reply: string; widget?: string } {
  const intent = detect(message)

  if (intent.type === 'greeting') {
    const g = [
      "Hey there! 👋 I'm TrioBot. Ask me about any calculator — 401k, mortgage, BMI, calories — and I'll explain it and link you directly!",
      "Hi! 😊 Type a calculator name like '401k' or 'BMI' and I'll give you a quick explanation plus a direct link.",
      "Hello! 🤖 I can explain any finance or health calculator and give you the link. What do you need help with?",
    ]
    return { reply: g[Math.floor(Math.random() * g.length)] }
  }

  if (intent.type === 'about') {
    return { reply: KB['about'].answer }
  }

  if (intent.type === 'knowledge' && intent.key) {
    const kb = KB[intent.key]
    if (kb) {
      const widget = WIDGET_MAP[intent.key]
      let reply = kb.answer
      if (widget) {
        reply += '\n\n👇 Try it right here — enter your values below!'
      }
      if (kb.tools.length > 0) {
        reply += '\n\n🔗 Open the full calculator:'
        for (const t of kb.tools) {
          reply += `\n→ [${t.n}](${t.p}) — ${t.d}`
        }
      }
      return { reply, widget }
    }
  }

  // Search fallback — show name + description + link
  const results = searchTools(message)
  if (results.length > 0) {
    let reply = `Here's what I found for **"${message}"**:\n\n`
    reply += results.map(t => `${CAT_EMOJI[t.c] || '🔧'} [${t.n}](${t.p})\n  ${t.d}`).join('\n\n')
    reply += '\n\nClick any tool above to open it!'
    return { reply }
  }

  return {
    reply: `I couldn't find that, but here's what I can help with:\n\n💰 Finance — Mortgage, 401k, SIP, FIRE...\n❤️ Health — BMI, Calories, TDEE, Age...\n📮 ZIP Tools — Lookup, Distance, Timezone...\n📈 Commodities — Gold, Silver, Crude Oil...\n\nTry: *"401k calculator"* or *"what is TDEE"*`
  }
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()
    const last = messages?.[messages.length - 1]
    if (!last || last.role !== 'user') return NextResponse.json({ error: 'No message' }, { status: 400 })
    await new Promise(r => setTimeout(r, 150 + Math.random() * 200))
    const result = respond(last.content)
    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ error: 'Error, please try again.' }, { status: 500 })
  }
}
