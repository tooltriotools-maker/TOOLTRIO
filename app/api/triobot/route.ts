import { NextRequest, NextResponse } from 'next/server'
import { PUBLIC_TOOL_REGISTRY, TOOL_COUNTS } from '@/lib/catalog'

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
    answer: `A 401k is a US employer-sponsored retirement plan.\n\n• Contributions are pre-tax (reduces taxable income now)\n• Employer match is free money — always contribute at least enough to get the full match\n• Annual contribution limits change by tax year; check the current IRS limit before planning contributions\n• Money grows tax-deferred until withdrawal`,
    tools: [
      { n: '401k Calculator', p: '/calculators/finance/401k-calculator', d: 'Project your 401k balance at retirement with employer match.' },
      { n: 'Roth IRA Calculator', p: '/calculators/finance/roth-ira-calculator', d: 'Calculate tax-free Roth IRA growth and retirement balance.' },
      { n: 'FIRE Calculator', p: '/calculators/finance/fire-calculator', d: 'Find your FIRE number and years to financial independence.' },
    ]
  },
  roth_ira: {
    answer: `Roth IRA = Tax-free retirement savings.\n\n• Contributions with after-tax money, withdrawals are tax-free\n• Annual contribution and income limits change by tax year; check the current IRS limits before planning contributions\n• No required minimum distributions in your lifetime`,
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
    answer: `ToolTrio has public tools across Developer (${TOOL_COUNTS.dev}), Fun (${TOOL_COUNTS.fun}), ZIP (${TOOL_COUNTS.zip}) and Commodities (${TOOL_COUNTS.commodities}).\n\nThe catalog is shared across the site, so counts and searchable tools stay synchronized. All tools are free to use without signup.`,
    tools: []
  }
}

type ToolEntry = { n: string; p: string; c: string; d: string }

// Searchable tool catalog comes from the shared registry. This prevents TrioBot
// from drifting away from GlobalSearch, sitemap and category counts.
const ALL_TOOLS: ToolEntry[] = PUBLIC_TOOL_REGISTRY.map(tool => ({
  n: tool.name,
  p: tool.href,
  c: tool.cat,
  d: `${tool.name} — free online ToolTrio tool.`,
}))

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
      "Hey there! 👋 I'm TrioBot. Ask me about any public ToolTrio tool and I'll explain it and link you directly!",
      "Hi! 😊 Type a public tool name like 'JSON' or 'ZIP' and I'll give you a quick explanation plus a direct link.",
      "Hello! 🤖 I can explain the public ToolTrio tools and give you the link. What do you need help with?",
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
      const publicTools = kb.tools.filter(t => !t.p.startsWith('/calculators/finance/') && !t.p.startsWith('/calculators/health/'))
      if (publicTools.length > 0) {
        reply += '\n\n🔗 Open the public tool:'
        for (const t of publicTools) {
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
    reply: `I couldn't find that, but here's what I can help with:\n\n⚡ Dev Tools — JSON, Regex, Base64, UUID...\n📮 ZIP Tools — Lookup, Distance, Timezone...\n📈 Commodities — Gold, Silver, Crude Oil...\n\nTry: *"JSON formatter"* or *"ZIP code lookup"*`
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
