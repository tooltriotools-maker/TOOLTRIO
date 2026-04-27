'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[] }

function parseCron(expr: string): string {
  const parts = expr.trim().split(/\s+/)
  if (parts.length < 5 || parts.length > 6) return 'Invalid cron expression (need 5 or 6 parts)'
  const [min, hour, dom, month, dow] = parts.slice(-5)
  const fmtMin = min === '*' ? 'every minute' : `at minute ${min}`
  const fmtHour = hour === '*' ? 'every hour' : `at hour ${hour}`
  const months = ['','January','February','March','April','May','June','July','August','September','October','November','December']
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  const fmtMonth = month === '*' ? 'every month' : months[+month] || `month ${month}`
  const fmtDow = dow === '*' ? 'every day of week' : days[+dow] || `day ${dow}`
  const fmtDom = dom === '*' ? 'every day of month' : `day ${dom} of month`
  if (min === '*' && hour === '*') return `Every minute, ${fmtDom}, ${fmtMonth}, ${fmtDow}`
  if (hour === '*') return `${fmtMin} of every hour, ${fmtDom}, ${fmtMonth}, ${fmtDow}`
  return `At ${hour.padStart(2,'0')}:${min.padStart(2,'0')}, ${fmtDom}, ${fmtMonth}, ${fmtDow}`
}

const PRESETS = [
  {label:'Every minute', expr:'* * * * *'},
  {label:'Every hour', expr:'0 * * * *'},
  {label:'Daily midnight', expr:'0 0 * * *'},
  {label:'Daily noon', expr:'0 12 * * *'},
  {label:'Weekdays 9am', expr:'0 9 * * 1-5'},
  {label:'Weekly Sunday', expr:'0 0 * * 0'},
  {label:'Monthly 1st', expr:'0 0 1 * *'},
  {label:'Every 15 mins', expr:'*/15 * * * *'},
  {label:'Twice daily', expr:'0 9,18 * * *'},
]

export default function CalculatorClient({ faqs }: Props) {
  const [expr, setExpr] = useState('0 9 * * 1-5')
  const [copied, setCopied] = useState(false)

  const description = parseCron(expr)
  const copy = () => { navigator.clipboard.writeText(expr); setCopied(true); setTimeout(()=>setCopied(false),1500) }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Cron Expression Builder</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">⏰ Cron Expression Parser</h1>
      <p className="text-gray-500 mb-6">Parse cron expressions into human-readable descriptions and explore common schedule presets.</p>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm">
        <label className="text-xs font-bold text-gray-500 block mb-2">Cron Expression (min hour dom month dow)</label>
        <div className="flex gap-2 mb-4">
          <input value={expr} onChange={e=>setExpr(e.target.value)} placeholder="* * * * *"
            className="flex-1 font-mono text-lg px-4 py-3 border-2 border-gray-200 rounded-xl font-bold focus:border-green-400 focus:outline-none" />
          <button onClick={copy} className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 rounded-xl font-bold hover:bg-gray-50">
            {copied?<Check className="w-4 h-4 text-green-600"/>:<Copy className="w-4 h-4"/>}
          </button>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="text-xs font-bold text-green-700 mb-1">HUMAN DESCRIPTION</p>
          <p className="text-green-900 font-semibold">{description}</p>
        </div>
        <div className="grid grid-cols-5 gap-2 mt-4 text-center text-xs text-gray-400">
          {['Minute\n0-59','Hour\n0-23','Day of Month\n1-31','Month\n1-12','Day of Week\n0-7'].map(l=>(
            <div key={l} className="bg-gray-50 rounded-lg p-2 border border-gray-100">
              {l.split('\n').map((t,i)=><p key={i} className={i===0?'font-bold text-gray-600':'mt-0.5'}>{t}</p>)}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
        <h2 className="font-bold text-gray-900 mb-3">Common Presets - click to load</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {PRESETS.map(p=>(
            <button key={p.expr} onClick={()=>setExpr(p.expr)}
              className="text-left p-3 bg-gray-50 hover:bg-green-50 rounded-xl border border-gray-100 hover:border-green-300 transition-all">
              <p className="font-bold text-gray-900 text-sm">{p.label}</p>
              <code className="font-mono text-xs text-gray-500">{p.expr}</code>
            </button>
          ))}
        </div>
      </div>


      <SEOContent
        title="Cron Expression Builder"
        category="dev"
        intro={`Cron syntax has five fields — minute, hour, day-of-month, month, day-of-week — each with its own special characters. A misplaced character schedules your job at 3am instead of 3pm, or runs it every minute instead of once a day.

This builder converts human-readable schedules to cron expressions and back. Shows the next 10 execution times so you can verify the schedule is correct before deploying. Runs in your browser.

**Long-tail searches answered here:** cron job schedule builder free no signup, cron syntax generator with explanation free tool, unix cron expression creator free online, how to write cron job expression free tool, cron schedule calculator with next run times free, what does 0 2 asterisk asterisk asterisk mean cron, cron every 5 minutes expression generator free usa, cron quarterly schedule expression generator free, cron syntax for last day of month free calculator, cron expression for weekdays only generator free usa, aws lambda cron expression builder free online, kubernetes cronjob schedule generator free tool usa, cron next 10 run times calculator free online, cron expression for every 30 seconds free generator, cron debug and validate expression online free usa

Pair with [Timezone Converter](/calculators/dev/timezone-converter) for server timezone differences.`}
        howItWorks={`The builder maintains a cron expression string and updates it as you select schedule options. It also accepts a raw cron expression and parses it back to human-readable form.

The execution preview calculates the next 10 run times from now, formatted in both UTC and your local timezone — the key validation step, since many cron bugs are timezone issues.

Supported syntax: standard 5-field cron plus common extensions: @hourly, @daily, @weekly, @monthly, @yearly, @reboot.`}
        benefits={[
          { title: `Next 10 execution times`, text: `See exactly when your job will run next — actual timestamps in both UTC and local time. Catches am/pm mistakes and timezone confusion before they cause production incidents.` },
          { title: `Human-to-cron and cron-to-human`, text: `Type a cron expression to get a plain English description, or describe a schedule in plain English to get the cron syntax.` },
          { title: `Special character reference`, text: `L (last), W (nearest weekday), # (nth weekday) and step values (/5) are all supported and explained inline.` },
          { title: `Timezone-aware preview`, text: `Preview shows times in both UTC and your local timezone. Most servers run UTC; most developers think in local time. Seeing both prevents the classic why did my job run at 2am problem.` },
        ]}
        useCases={[
          { title: `Database backup scheduling`, text: `You want a nightly database backup at 2am server time. Enter the schedule here and verify the next run times before adding it to your crontab or Kubernetes CronJob manifest.` },
          { title: `First Monday of the month`, text: `Business reports that run on the first Monday of each month require the # day-of-week modifier. Build it here and verify the actual dates.` },
          { title: `API rate-limited polling`, text: `You need to poll an API every 15 minutes but avoid peak hours (9am-5pm). The builder shows how to combine step values with hour ranges.` },
          { title: `Kubernetes CronJob specs`, text: `Kubernetes CronJob schedules use standard cron syntax. Build your schedule here, verify the next run times, then paste the expression into your CronJob manifest.` },
        ]}
        keyStats={[
          { stat: `5 fields`, source: `minute hour day month weekday — each with its own modifier syntax` },
          { stat: `Next 10 runs`, source: `Execution preview shows exactly when the job will run — in both UTC and local time` },
          { stat: `@shortcuts`, source: `@daily, @weekly, @monthly etc. are supported and converted to their 5-field equivalents` },
        ]}
        inlineLinks={[
          { text: `Docker Compose Generator`, href: `/calculators/dev/docker-compose-gen`, label: `Docker Compose Generator` },
          { text: `Timezone Converter`, href: `/calculators/dev/timezone-converter`, label: `Timezone Converter` },
          { text: `Unix Timestamp`, href: `/calculators/dev/unix-timestamp`, label: `Unix Timestamp` },
          { text: `Epoch Converter`, href: `/calculators/dev/epoch-converter`, label: `Epoch Converter` },
          { text: `Gitignore Generator`, href: `/calculators/dev/gitignore-generator`, label: `Gitignore Generator` },
          { text: `Env File Parser`, href: `/calculators/dev/env-file-parser`, label: `Env File Parser` },
          { text: `Robots.txt Generator`, href: `/calculators/dev/robots-txt-generator`, label: `Robots.txt Generator` },
          { text: `Package JSON Generator`, href: `/calculators/dev/package-json-gen`, label: `Package JSON Generator` },
        ]}
        tipsSection={`Verify timezone before deploying. Your cron expression runs on the server clock, which is almost always UTC. If you want a job at 9am New York time, that is 14:00 UTC (EST) or 13:00 UTC (EDT). The preview shows both — use [Timezone Converter](/calculators/dev/timezone-converter) if unsure.

Step values start at 0. */5 means 0, 5, 10, 15... The first run after deploy might be in less than 5 minutes depending on the current minute.

L for last day. L in the day-of-month field means the last day of the month. This is a cron extension — not all cron implementations support it. Verify your target scheduler supports it.

Test with shorter intervals first. When deploying a new scheduled job, set the interval to every 2 minutes, verify it runs correctly, then change to the real schedule.`}
        conclusion={`Cron expressions are unforgiving — a single wrong field runs your job at the wrong time, and most cron systems do not validate expressions before the first scheduled run. This builder prevents those errors by showing the actual next execution times before you deploy.

For containerized scheduling: build your expression here, configure with [Docker Compose Generator](/calculators/dev/docker-compose-gen), and account for timezone differences with [Timezone Converter](/calculators/dev/timezone-converter).`}
      />
            <div className="mt-8 space-y-3">
        {faqs.map(f=>(
          <details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4">
            <summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary>
            <p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p>
          </details>
        ))}
      </div>
    </div>
  )
}
