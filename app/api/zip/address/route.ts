import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    const street = searchParams.get('street')?.trim()
    const city = searchParams.get('city')?.trim()
    const state = searchParams.get('state')?.trim()

    if (!street || !city || !state) {
      return NextResponse.json(
        {
          error: 'Street, city and state are required.',
        },
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

    console.log('CENSUS URL:', censusUrl)

    const response = await fetch(censusUrl, {
      cache: 'no-store',
    })

    console.log('CENSUS STATUS:', response.status)

    // Read text first so we can see Census errors
    const raw = await response.text()

    if (!response.ok) {
      console.error('CENSUS ERROR RESPONSE:', raw)

      return NextResponse.json(
        {
          error: 'Census address lookup failed.',
          status: response.status,
          details: raw.substring(0, 500),
        },
        { status: 502 }
      )
    }

    const data = JSON.parse(raw)

    const matches =
      data?.result?.addressMatches ?? []

    if (matches.length === 0) {
      return NextResponse.json(
        {
          error: 'No matching address found.',
          input: fullAddress,
        },
        { status: 404 }
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
        { status: 404 }
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

    console.error(
      'ADDRESS LOOKUP ERROR:',
      error
    )

    return NextResponse.json(
      {
        error:
          'Unable to look up this address right now.',

        details:
          error?.message || String(error),
      },
      { status: 500 }
    )
  }
}