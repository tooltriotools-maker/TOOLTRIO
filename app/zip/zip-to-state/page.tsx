import type { Metadata } from 'next'
import { ZipToolLayout } from '@/components/ui/ZipToolLayout'
import ZipToolClient from './ZipToolClient'

export const metadata: Metadata = {
  title: 'ZIP to State | Free USA ZIP Code Tools | TOOLTRIO',
  description: 'Find which US state a ZIP code belongs to. Includes state abbreviation and full state name.',
  keywords: ['zip to state', 'zip code', 'usa zip', 'zip lookup', 'zip tool'],
}

const relatedTools = [
  {name:'ZIP Lookup',href:'/zip/zip-code-lookup',icon:'🔍'},
    {name:'ZIP Distance',href:'/zip/zip-code-distance',icon:'📏'},
    {name:'ZIP to City',href:'/zip/zip-to-city',icon:'🏙️'},
    {name:'City to ZIP',href:'/zip/city-to-zip',icon:'🏙️'},
    {name:'ZIP to County',href:'/zip/zip-to-county',icon:'📍'},
    {name:'ZIP to Timezone',href:'/zip/zip-to-timezone',icon:'🕐'}
]

export default function Page() {
  return (
    <ZipToolLayout
      title="ZIP to State"
      description="Find which US state a ZIP code belongs to. Includes state abbreviation and full state name."
      icon="🗺️"
      relatedTools={relatedTools}
    >
      <ZipToolClient />
    </ZipToolLayout>
  )
}
