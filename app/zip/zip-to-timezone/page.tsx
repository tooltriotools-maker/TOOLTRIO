import type { Metadata } from 'next'
import { ZipToolLayout } from '@/components/ui/ZipToolLayout'
import ZipToolClient from './ZipToolClient'

export const metadata: Metadata = {
  title: 'ZIP to Timezone — Find the Timezone for Any US ZIP Code 2026 | TOOLTRIO',
  description: 'Find the timezone for any US ZIP code. Get the timezone name, UTC offset, and DST status for any US ZIP. Free ZIP to timezone lookup.',
  keywords: ['zip to timezone', 'zip code timezone', 'find timezone by zip code', 'zip code time zone lookup', 'what timezone is zip code', 'zip code utc offset', 'zip code timezone converter', 'zip code dst', 'local timezone by zip', 'zip code timezone identifier'],
}
const relatedTools = [
  {name:'ZIP Time Converter',href:'/zip/zip-time-converter',icon:'⏱️'},
  {name:'Same Timezone ZIPs',href:'/zip/same-timezone-zips',icon:'🕐'},
  {name:'ZIP to Timezone Map',href:'/zip/zip-to-timezone-map',icon:'🗺️'},
  {name:'ZIP Code Lookup',href:'/zip/zip-code-lookup',icon:'🔍'},
  {name:'ZIP to State',href:'/zip/zip-to-state',icon:'🗺️'},
  {name:'ZIP to City',href:'/zip/zip-to-city',icon:'🏙️'},
  {name:'Area Code by ZIP',href:'/zip/area-code-by-zip',icon:'📱'},
  {name:'ZIP Code Distance',href:'/zip/zip-code-distance',icon:'📏'},
  {name:'State ZIP Codes',href:'/zip/state-zip-codes',icon:'🗺️'},
]
const tips = ["Use the IANA timezone identifier (e.g., 'America/New_York') in code — not the abbreviation (ET).", "Arizona (except Navajo Nation) uses 'America/Phoenix' — no DST shift ever.", 'Indiana, Kentucky, Tennessee, and several other states have ZIP codes in two different timezones.']
const seoContent = {
  heading: 'ZIP to Timezone — Finding the Correct Timezone for Any US ZIP Code',
  body: "Identifying the timezone for a US ZIP code is essential for scheduling, notifications, data logging, and any application that needs to display or process time in the user's local context. Our ZIP to Timezone tool returns the IANA timezone identifier, UTC offset, and current Daylight Saving Time status for any US ZIP code.\n\n**IANA Timezone Identifiers for US ZIP Codes**\n\nThe IANA Time Zone Database (also called the Olson database) is the authoritative, internationally recognized reference for timezone identifiers. For US ZIP codes, the relevant IANA identifiers include: America/New_York (Eastern Time, most of the eastern US), America/Chicago (Central Time), America/Denver (Mountain Time with DST), America/Phoenix (Mountain Standard Time, Arizona no DST), America/Los_Angeles (Pacific Time), America/Anchorage (Alaska Time), and Pacific/Honolulu (Hawaii, no DST).\n\nUsing IANA identifiers rather than abbreviations (ET, CT, MT, PT) is strongly recommended in software because abbreviations are ambiguous — CST means Central Standard Time in the US but China Standard Time globally.\n\n**How ZIP-to-Timezone Mapping Works**\n\nTimezone assignments in the US are determined at the county level by the Department of Transportation, which has statutory authority over US timezones. Each county is assigned to one timezone. Our tool maps ZIP codes to their primary county's timezone assignment, with special handling for the small number of ZIP codes that straddle county timezone boundaries.\n\n**Special Cases: States with Split Timezones**\n\nSeveral US states have counties in different time zones. Indiana has most counties in Eastern Time but some northwestern and southwestern counties in Central Time. Kentucky is mostly Eastern but western Kentucky counties near St. Louis/Nashville are Central. Tennessee is split between Eastern (east) and Central (Memphis area west). Idaho's northern panhandle is Pacific while the rest is Mountain. Kansas, Texas, Florida panhandle, North and South Dakota, Nebraska, and Oregon all have ZIP codes in two different timezones. Our tool handles all these exceptions at the individual ZIP code level.",
  faqs: [
    {q:'How do I get the UTC offset for a ZIP code?',a:'Our tool returns both the IANA timezone identifier and the current UTC offset (including DST adjustment). The offset changes twice a year for most US timezones.'},
    {q:'What IANA timezone identifier should I use for Arizona?',a:"Use 'America/Phoenix' for most of Arizona (no DST). For the Navajo Nation within Arizona, use 'America/Denver' (observes DST)."},
    {q:'Why does my ZIP code show Eastern Time when I expected Central?',a:"State timezone boundaries don't always match intuition. Indiana and parts of Kentucky and Tennessee have ZIP codes in Eastern Time. Our database uses the official DOT county-level assignments."},
    {q:'How do I use the IANA timezone in JavaScript?',a:"Use the Intl.DateTimeFormat API: new Intl.DateTimeFormat('en-US', {timeZone: 'America/Chicago'}).format(date) to format dates in the ZIP code's local timezone."},
    {q:'Does Puerto Rico observe Daylight Saving Time?',a:'No. Puerto Rico observes Atlantic Standard Time (UTC-4) year-round with no DST shift.'},
    {q:'What is the difference between EST and EDT?',a:"EST (Eastern Standard Time) is UTC-5, observed in winter. EDT (Eastern Daylight Time) is UTC-4, observed in summer during DST. The IANA identifier 'America/New_York' covers both automatically based on the date."},
  ],
}
export default function Page() {
  return (
    <ZipToolLayout title={'ZIP to Timezone'} description={'Find the timezone name, UTC offset, and DST status for any US ZIP code.'} icon={'🕐'} relatedTools={relatedTools} tips={tips} seoContent={seoContent}>
      <ZipToolClient />
    </ZipToolLayout>
  )
}
