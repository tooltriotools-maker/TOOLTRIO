import type { Metadata } from 'next'
import { ZipToolLayout } from '@/components/ui/ZipToolLayout'
import ZipToolClient from './ZipToolClient'

export const metadata: Metadata = {
  title: 'Multiple Cities in a ZIP | Free USA ZIP Code Tools | TOOLTRIO',
  description: 'Discover all cities and communities served by a single ZIP code. Some ZIP codes cover multiple city names.',
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
    <ZipToolLayout title="Multiple Cities in a ZIP" description="Discover all cities and communities served by a single ZIP code. Some ZIP codes cover multiple city names." icon="🏘️" relatedTools={relatedTools}>
      <ZipToolClient />
    </ZipToolLayout>
  )
}
