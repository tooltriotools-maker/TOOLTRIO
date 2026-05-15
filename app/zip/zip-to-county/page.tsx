import type { Metadata } from 'next'
import { ZipToolLayout } from '@/components/ui/ZipToolLayout'
import ZipToolClient from './ZipToolClient'

export const metadata: Metadata = {
  title: 'ZIP to County | Free USA ZIP Code Tools | TOOLTRIO',
  description: 'Find the county name for any US ZIP code. Includes state and city information.',
  keywords: ['zip to county', 'zip code', 'usa zip', 'zip lookup', 'zip tool'],
}

const relatedTools = [
  {name:'ZIP Lookup',href:'/zip/zip-code-lookup',icon:'🔍'},
    {name:'ZIP Distance',href:'/zip/zip-code-distance',icon:'📏'},
    {name:'ZIP to City',href:'/zip/zip-to-city',icon:'🏙️'},
    {name:'City to ZIP',href:'/zip/city-to-zip',icon:'🏙️'},
    {name:'ZIP to State',href:'/zip/zip-to-state',icon:'🗺️'},
    {name:'ZIP to Timezone',href:'/zip/zip-to-timezone',icon:'🕐'}
]

export default function Page() {
  return (
    <ZipToolLayout
      title="ZIP to County"
      description="Find the county name for any US ZIP code. Includes state and city information."
      icon="📍"
      relatedTools={relatedTools}
    >
      <ZipToolClient />
    </ZipToolLayout>
  )
}
