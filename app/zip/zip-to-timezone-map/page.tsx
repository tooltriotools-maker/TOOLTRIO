import type { Metadata } from 'next'
import { ZipToolLayout } from '@/components/ui/ZipToolLayout'
import ZipToolClient from './ZipToolClient'

export const metadata: Metadata = {
  title: 'ZIP Code Timezone Map — View US Timezones by ZIP Code 2026 | TOOLTRIO',
  description: 'View an interactive map of US timezones with ZIP code overlay. See which timezone any ZIP code falls in. Free ZIP timezone map tool.',
  keywords: ['zip code timezone map', 'us timezone map by zip', 'zip to timezone map', 'interactive timezone map zip code', 'time zone map usa zip code', 'view timezone by zip', 'zip code on timezone map', 'us time zone zip code visual'],
}
const relatedTools = [
  {name:'ZIP to Timezone',href:'/zip/zip-to-timezone',icon:'🕐'},
  {name:'ZIP Time Converter',href:'/zip/zip-time-converter',icon:'⏱️'},
  {name:'Same Timezone ZIPs',href:'/zip/same-timezone-zips',icon:'🕐'},
  {name:'ZIP Code Map',href:'/zip/zip-code-map',icon:'🗺️'},
  {name:'ZIP Code Lookup',href:'/zip/zip-code-lookup',icon:'🔍'},
  {name:'ZIP to State',href:'/zip/zip-to-state',icon:'🗺️'},
  {name:'ZIP Boundary Info',href:'/zip/zip-boundary-info',icon:'🔲'},
  {name:'State ZIP Codes',href:'/zip/state-zip-codes',icon:'🗺️'},
  {name:'ZIP to City',href:'/zip/zip-to-city',icon:'🏙️'},
]
const tips = ['Click any ZIP area on the map to see its timezone details.', "Florida's panhandle is Central Time — the boundary runs along the Apalachicola River.", 'Indiana has both Eastern and Central Time ZIP codes — always verify by ZIP, not state.']
const seoContent = {
  heading: 'ZIP to Timezone Map — Visualizing US Time Zones by ZIP Code',
  body: "A visual timezone map with ZIP code detail brings clarity to one of the more complex aspects of US geography — the patchwork of time zones that divide states, counties, and even individual communities. Our ZIP to Timezone Map overlays ZIP code boundaries on an interactive US timezone map, letting you see at a glance which timezone any ZIP code falls in and how it relates to surrounding ZIPs.\n\n**What the Timezone Map Shows**\n\nOur interactive map displays timezone boundary lines (the official DOT-defined timezone boundaries across the continental US, Alaska, and Hawaii), timezone shading (each major timezone zone is color-coded for instant visual identification), ZIP code overlay (individual ZIP code boundaries visible at higher zoom levels), and boundary exceptions (special cases like Indiana county exceptions, Arizona's year-round Mountain Standard Time, the Florida panhandle CT boundary, and western Kansas/Nebraska MT zones are clearly marked).\n\n**Why a Map Is Better Than a Table for Timezone Data**\n\nTimezone data is inherently geographic. A table or list of ZIP-to-timezone mappings is useful for database lookups, but it doesn't convey the spatial relationships between timezones — where the boundaries run, how close a ZIP is to a timezone edge, and which neighboring ZIPs might be in a different zone. The map makes these relationships immediately obvious, enabling faster decision-making for logistics, scheduling, and territory planning.\n\n**The Florida Panhandle: A Classic Timezone Edge Case**\n\nOne of the most well-known timezone boundary quirks in the US runs through Florida. The vast majority of Florida observes Eastern Time, but the western panhandle — roughly west of the Apalachicola River — observes Central Time. Counties in the CT zone include Escambia, Santa Rosa, Okaloosa, Walton, and Holmes. This means that Pensacola (CT) is in a different timezone than Tallahassee (ET) despite both being in the same state.\n\n**The Indiana Timezone Patchwork**\n\nIndiana is perhaps the most complex timezone state in the US. Since 2006, all Indiana counties observe DST, but the state is split between Eastern and Central Time: most of Indiana is Eastern, but a cluster of northwestern counties and a cluster of southwestern counties observe Central Time. Our map and ZIP-level data reflect the current post-2006 Indiana timezone assignments correctly.",
  faqs: [
    {q:'Which US states have ZIP codes in two different timezones?',a:'Indiana, Kentucky, Tennessee, Florida (panhandle), Idaho, Kansas, Nebraska, North Dakota, South Dakota, Oregon, and Texas all have ZIP codes split between two timezones.'},
    {q:'Why does Arizona appear differently on the timezone map?',a:'Most of Arizona observes Mountain Standard Time (UTC-7) year-round without shifting for DST, making it effectively on Mountain Time in winter and Pacific Time in summer relative to the rest of the country.'},
    {q:"Can I look up a specific ZIP code's timezone from the map?",a:'Yes — click on any ZIP code area on the map to display its timezone details, UTC offset, and DST observance status.'},
    {q:"How is the timezone boundary between Florida's ET and CT zones defined?",a:'The boundary runs roughly along the Apalachicola River. Counties west of the river are Central Time; counties to the east are Eastern Time.'},
    {q:'Does the map show military timezone zones?',a:'Military ZIP codes (APO/FPO/DPO) do not have geographic US locations and are not shown on the continental map. Their timezone data is available through the ZIP to Timezone tool.'},
    {q:'How often is the timezone boundary data updated?',a:'DOT timezone boundaries are rarely changed. Our data is updated when official boundary changes are published by the Department of Transportation.'},
  ],
}
export default function Page() {
  return (
    <ZipToolLayout title={'ZIP to Timezone Map'} description={'View an interactive map showing US timezones with ZIP code details.'} icon={'🗺️'} relatedTools={relatedTools} tips={tips} seoContent={seoContent}>
      <ZipToolClient />
    </ZipToolLayout>
  )
}
