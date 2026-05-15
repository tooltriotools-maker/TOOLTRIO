import type { Metadata } from 'next'
import { ZipToolLayout } from '@/components/ui/ZipToolLayout'
import ZipToolClient from './ZipToolClient'

export const metadata: Metadata = {
  title: 'ZIP to City | Free USA ZIP Code Tools | TOOLTRIO',
  description: 'Enter any US ZIP code to instantly find the city name and full location details.',
  keywords: ['zip to city', 'zip code', 'usa zip', 'zip lookup', 'zip tool'],
}

const relatedTools = [
  {name:'ZIP Lookup',href:'/zip/zip-code-lookup',icon:'🔍'},
    {name:'ZIP Distance',href:'/zip/zip-code-distance',icon:'📏'},
    {name:'City to ZIP',href:'/zip/city-to-zip',icon:'🏙️'},
    {name:'ZIP to State',href:'/zip/zip-to-state',icon:'🗺️'},
    {name:'ZIP to County',href:'/zip/zip-to-county',icon:'📍'},
    {name:'ZIP to Timezone',href:'/zip/zip-to-timezone',icon:'🕐'}
]

export default function Page() {
  return (
    <ZipToolLayout
      title="ZIP to City"
      description="Enter any US ZIP code to instantly find the city name and full location details."
      icon="🏙️"
      relatedTools={relatedTools}
    >
      <ZipToolClient />
    </ZipToolLayout>
  )
}
