import { NextRequest, NextResponse } from 'next/server'
import { API_LIMITS } from '@/lib/api/request-limits'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    const street = searchParams.get('street')?.trim()
    const city = searchParams.get('city')?.trim()
    const state = searchParams.get('state')?.trim().toUpperCase()

    if (!street || !city || !state) {
      return NextResponse.json(
        {
          error: 'Street, city and state are required.',
        },
        { status: 400 }
      )
    }

    if (!/^[A-Z]{2}$/.test(state)) {
      return NextResponse.json(
        { error: 'State must be a valid 2-letter US state code.' },
        { status: 400 }
      )
    }

    if (street.length > API_LIMITS.streetLength || city.length > API_LIMITS.cityLength || state.length > API_LIMITS.stateLength) {
      return NextResponse.json(
        { error: 'Address fields are too long.' },
        { status: 400 }
      )
    }

    // Build one-line US address
    const fullAddress = `${street}, ${city}, ${state}`

    const params = new URLSearchParams({
      address: fullAddress,
      benchmark: '4',
      format: 'json',
    })

    const censusUrl =
      `https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?${params.toString()}`

    const response = await fetch(censusUrl, {
      cache: 'no-store',
      signal: AbortSignal.timeout(5000),
    })

    const raw = await response.text()

    if (!response.ok) {
      console.error('Census address lookup failed with status:', response.status)

      return NextResponse.json(
        { error: 'Census address lookup failed.' },
        { status: 502, headers: { 'Cache-Control': 'no-store' } }
      )
    }

    let data: any
    try {
      data = JSON.parse(raw)
    } catch {
      console.error('Census address lookup returned invalid JSON')
      return NextResponse.json(
        { error: 'Census address lookup returned an invalid response.' },
        { status: 502, headers: { 'Cache-Control': 'no-store' } }
      )
    }

    const matches =
      data?.result?.addressMatches ?? []

    if (matches.length === 0) {
      return NextResponse.json(
        {
          error: 'No matching address found.',
          input: fullAddress,
        },
        { status: 404, headers: { 'Cache-Control': 'no-store' } }
      )
    }

    const match = matches[0]

    // Better than extracting ZIP from matchedAddress
    const zip =
      match?.addressComponents?.zip

    if (!zip) {
      return NextResponse.json(
        {
          error: 'Address matched, but no ZIP code was returned.',
          matchedAddress: match?.matchedAddress,
        },
        { status: 404, headers: { 'Cache-Control': 'no-store' } }
      )
    }

    return NextResponse.json({
      success: true,

      input: {
        street,
        city,
        state,
      },

      matchedAddress:
        match.matchedAddress,

      zip,

      coordinates: {
        lat: match.coordinates?.y ?? null,
        lng: match.coordinates?.x ?? null,
      },

      addressComponents:
        match.addressComponents ?? null,
    })

  } catch (error: any) {

    console.error('Address lookup failed:', error instanceof Error ? error.message : 'unknown error')

    return NextResponse.json(
      { error: 'Unable to look up this address right now.' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    )
  }
}