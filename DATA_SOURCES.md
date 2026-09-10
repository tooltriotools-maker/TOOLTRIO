# ZIP Data: Sources & Methodology

This project is now a **self-contained ZIP-data system**: all 41,689 ZIP records
live locally in `lib/data/zips/*.json` (+ `lib/data/zips/index.json` and
`public/zip-data/index.json`), and every tool reads from these local files.
Nothing is fetched from a third party at request time.

## What was wrong before

- **County**: every record had `county = "<city name> County"` (e.g. "West
  Hollywood County", "Dodgertown County") — a placeholder, not a real county.
- **Population**: values were a smooth, obviously synthetic descending sequence
  (79000, 78000, 77000, ...), unrelated to actual population.
- **Elevation**: every ZIP in the country had exactly one of two values —
  `100` or `400` — for the entire country.

## What's in it now

| Field | Source | Notes |
|---|---|---|
| County | US Census Bureau ZCTA-to-county relationships, via the free SimpleMaps "US Zip Codes" database | Real county/parish/borough names, with correct suffixes (Parish for LA, Borough/Census Area for AK, independent "city" for VA/MD/MO/NV special cases) |
| Population | 2010 US Census ZCTA population counts, same source | Summed across all ZIPs this comes to ~308.7M, matching the actual 2010 US Census population (308,745,538) |
| Elevation | Modeled from real USGS reference points (see below) | **Not** a per-ZIP survey measurement — see limitation below |
| City, state, lat/lng, timezone, area code | Unchanged from the original project data | Not part of this fix; spot-checked and looked reasonable |

Verification after rebuild: 3,134 distinct county/state combinations generated
(the real US has 3,143 counties and county-equivalents), and total summed
population landed within 0.02% of the actual 2010 Census population — both are
strong signals the source data is authentic, not synthetic.

### Elevation — important limitation

There is no free, bulk-downloadable, per-ZIP-code elevation dataset that could
be pulled into this build. Real per-point elevation (USGS 3DEP / GeoNames DEM)
is normally obtained by querying a live API once per coordinate, and that kind
of bulk querying isn't available from this build environment.

Rather than leave the old flat 100/400 ft values (or invent precise-looking
numbers with no real backing), elevation is estimated with a small,
transparent model:

1. A curated list of ~150 major US cities and their **real, published**
   elevations (`scripts/city_elevations_reference.json`).
2. Each ZIP's elevation is set to the nearest listed city's real elevation if
   it's within ~25 miles, blended down to that state's **real published mean
   elevation** (USGS/NOAA, `scripts/state_elevation_reference.json`) as
   distance increases, and just the state mean beyond ~75 miles.

This means elevation is directionally correct and varies smoothly and
realistically (mountain states read high, coastal/plains ZIPs read low), but a
ZIP far from any of the ~150 reference cities is only as accurate as its
state's mean elevation. **If you need survey-accurate, per-ZIP elevation,
run `scripts/fetch-real-elevation.py`** (see below) from a machine/CI job that
has outbound internet access to a real elevation API.

## Upgrading elevation to true per-ZIP data later

`scripts/fetch-real-elevation.py` is included and ready to run from any
environment with normal internet access (this build sandbox only allows
outbound requests to npm/PyPI/GitHub, so it could not be run here). It:

1. Reads every ZIP's lat/lng from `lib/data/zips/index.json`.
2. Queries the free public **USGS Elevation Point Query Service**
   (`https://epqs.nationalmap.gov/v1/json`) for each coordinate (no API key
   required).
3. Writes the real elevation back into `lib/data/zips/*.json` and
   `lib/data/zips/index.json`, replacing the modeled estimate.

This keeps the architecture you asked for: authoritative data is downloaded
**once**, stored inside the project, and every ZIP tool just reads the local
JSON — the fetch script is a one-time (or periodic) refresh job, not something
that runs per request.

## Files

- `lib/data/zips/<STATE>.json` — full record per ZIP for that state
- `lib/data/zips/index.json` — compact array-format index used by the fast
  lookup path
- `public/zip-data/index.json` — same index, served statically
- `lib/data/zip-population.json` — flat `zip -> population` map
- `scripts/fetch-real-elevation.py` — optional one-time upgrade to true
  per-ZIP elevation (see above)
- `scripts/state_elevation_reference.json` / `scripts/city_elevations_reference.json`
  — the reference data used to model elevation, for transparency/auditing
