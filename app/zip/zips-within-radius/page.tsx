import type { Metadata } from 'next'
import { ZipToolLayout } from '@/components/ui/ZipToolLayout'
import ZipToolClient from './ZipToolClient'

export const metadata: Metadata = {
  title: 'ZIPs Within Radius | Free USA ZIP Code Tools | TOOLTRIO',
  description: 'Find all ZIP codes within a specified radius of a given ZIP code. Enter a ZIP and radius in miles.',
  keywords: ['zips within radius', 'zip code', 'usa zip', 'zip lookup', 'zip tool'],
}

const relatedTools = [
  {name:'ZIP Lookup',href:'/zip/zip-code-lookup',icon:'🔍'},
    {name:'ZIP Distance',href:'/zip/zip-code-distance',icon:'📏'},
    {name:'ZIP to City',href:'/zip/zip-to-city',icon:'🏙️'},
    {name:'City to ZIP',href:'/zip/city-to-zip',icon:'🏙️'},
    {name:'ZIP to State',href:'/zip/zip-to-state',icon:'🗺️'},
    {name:'ZIP to County',href:'/zip/zip-to-county',icon:'📍'}
]


const tips = [
  "Use the radius dropdown to adjust the search area from 10 to 200 miles.",
    "Each result shows the distance from your center ZIP and has a Google Maps link.",
    "The database covers 480+ major US ZIP codes.",
]

export default function Page() {
  return (
    <ZipToolLayout
      title="ZIPs Within Radius"
      description="Find all ZIP codes within a specified radius of a given ZIP code. Enter a ZIP and radius in miles."
      icon="🎯"
      relatedTools={relatedTools}
      tips={tips}
    >
      <ZipToolClient />
    </ZipToolLayout>
  )
}
