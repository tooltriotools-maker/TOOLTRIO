import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'Cron Expression Generator — Build Cron Schedules Visually Free',
  description: 'Build and validate cron expressions visually. Shows next 5 execution times, natural language description, and supports 5-field and 6-field (with seconds) formats.',
  slug: 'cron-expression',
  keywords: ['cron expression generator online free','cron job builder browser','cron schedule visualizer','human readable cron free','cron syntax tester online','cron * * * * * builder'],
})

const faqs = [
  { question: "What do the five fields in a cron expression mean?", answer: `A standard cron expression has five fields: [minute] [hour] [day-of-month] [month] [day-of-week]. Each field accepts: a specific value (5 = 5th minute), a range (1-5 = 1 through 5), a list (1,3,5 = 1st, 3rd, 5th), a step (*/15 = every 15 units), or * (any value). Example: 30 9 * * 1-5 means 'at 9:30 AM, every day, Monday through Friday'. 0 0 1 * * means 'midnight on the 1st of every month'. The order is counterintuitive — minute comes before hour.` },
  { question: "What is the difference between 5-field cron and 6-field cron with seconds?", answer: `Standard Unix cron uses 5 fields (minute, hour, day, month, weekday) — minimum resolution is 1 minute. Some systems add a 6th field for seconds at the beginning: [second] [minute] [hour] [day] [month] [weekday]. Spring Framework's @Scheduled and Quartz Scheduler use the 6-field format. AWS EventBridge and Linux cron use 5-field. If you configure a cron job and it runs at unexpected times or throws a syntax error, check whether the system expects 5 or 6 fields.` },
  { question: "What do @weekly, @daily, and @reboot mean?", answer: `String aliases for common patterns: @reboot runs once at startup, @yearly = 0 0 1 1 * (midnight January 1st), @monthly = 0 0 1 * * (midnight on the 1st), @weekly = 0 0 * * 0 (midnight Sunday), @daily = 0 0 * * * (midnight every day), @hourly = 0 * * * * (top of every hour). Supported in Vixie cron (standard on most Linux systems) but not all cron implementations — check your environment's documentation before relying on them.` },
  { question: "How do I schedule a job to run every 15 minutes?", answer: `Use */15 in the minute field: */15 * * * * runs at :00, :15, :30, and :45 of every hour. For only during business hours: */15 9-17 * * 1-5 (every 15 minutes, hours 9-17, Monday-Friday). The step syntax */n means 'starting from 0, every n units'. You can also start from a different point: 5/15 * * * * starts at :05 then :20, :35, :50. One common mistake: 0,15,30,45 * * * * is equivalent but more explicit and works in systems where step syntax may not be supported.` },
  { question: "Why does cron use the server timezone?", answer: `The cron daemon runs in the server's system timezone. If your server is UTC and you want a job at 9 AM Eastern (UTC-5 in winter), set the cron for 14 * * * *. The problem: daylight saving shifts change the offset seasonally, so a 9 AM Eastern job needs to be hour 13 or 14 depending on time of year. Solutions: (1) Set the entire server to UTC and handle timezone conversion in the application, (2) Use a cron system that supports TZ environment variables per-job, (3) Use a cloud scheduler like AWS EventBridge that accepts timezone-aware cron expressions.` },
  { question: "How do I debug a cron job that is not running?", answer: `Most common reasons: (1) The crontab is not installed — verify with crontab -l. (2) The script does not have execute permission — chmod +x your script. (3) Environment variables are not set — cron runs with a minimal environment, no PATH customization; use absolute paths to commands. (4) Output is being swallowed — redirect stdout and stderr: */5 * * * * /path/to/script.sh >> /var/log/myjob.log 2>&1. (5) The script exits with an error due to missing env vars in the bare cron environment.` },
  { question: "What other infrastructure tools pair with the Cron Generator?", answer: `The chmod Calculator handles execute permissions for cron scripts. The Unix Timestamp Converter helps interpret timestamps in cron job logs. The Diff Checker reviews script changes before cron deployment. The Bandwidth Calculator estimates run time for cron jobs involving file transfers or backups. All are in the Dev Tools section.` },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'Cron Expression Generator — Build Cron Schedules Visually Free',
    description: 'Build and validate cron expressions visually. Shows next 5 execution times, natural language description, and supports 5-field and 6-field (with seconds) formats.',
    slug: 'cron-expression',
    faqs,
  })
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.webApp) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.breadcrumb) }} />
      {jsonLd.faqPage && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.faqPage) }} />
      )}
      <CalculatorClient faqs={faqs} />
    </>
  )
}
