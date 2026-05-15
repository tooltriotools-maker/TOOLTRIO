import type { Metadata } from 'next'
import { ZipToolLayout } from '@/components/ui/ZipToolLayout'
import ZipToolClient from './ZipToolClient'

export const metadata: Metadata = {
  title: 'ZIP to Timezone Map | Free USA ZIP Code Tools | TOOLTRIO',
  description: 'See which timezone any US ZIP code falls in, with a visual timezone region map for all US timezones.',
}

const relatedTools = [
  {name:'ZIP Lookup',href:'/zip/zip-code-lookup',icon:'🔍'},
    {name:'ZIP Distance',href:'/zip/zip-code-distance',icon:'📏'},
    {name:'ZIP to City',href:'/zip/zip-to-city',icon:'🏙️'},
    {name:'City to ZIP',href:'/zip/city-to-zip',icon:'🏙️'},
    {name:'ZIP to State',href:'/zip/zip-to-state',icon:'🗺️'},
    {name:'ZIPs in Radius',href:'/zip/zips-within-radius',icon:'🎯'}
]

export default function Page() {
  return (
    <ZipToolLayout title="ZIP to Timezone Map" description="See which timezone any US ZIP code falls in, with a visual timezone region map for all US timezones." icon="🗺️" relatedTools={relatedTools}>
      <ZipToolClient />
    </ZipToolLayout>
  )
}
