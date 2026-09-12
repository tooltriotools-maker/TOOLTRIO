# ZIP Data: Sources & Methodology

This project is a **self-contained ZIP-data system**: all 41,689 ZIP records
live locally in `lib/data/zips/*.json` (+ `lib/data/zips/index.json` and
`public/zip-data/index.json`), and every tool reads from these local files.
Nothing is fetched from a third party at request time.

## Population — two corrections made

**First pass mistake**: an earlier version of this rebuild used a GitHub
mirror that turned out to hold **2000-Census-era** population figures
mislabeled as current (ZIP 10001 showed 21,102 — the actual 2000 Census
count). That was caught and replaced with an ACS 5-Year estimate.

**Second pass, more current**: that ACS estimate (23,332 for 10001) was
itself an older vintage (roughly the 2013–2017 5-year window). It's now
replaced with a bulk ZCTA population dataset built from **2020-Census-vintage
geography combined with recent ACS estimates** (upstream generation date
2024-03-29). ZIP 10001 now shows **27,004**, and the nationwide total across
all ZIPs sums to **331.0M**, matching the actual 2020 Census resident
population (331.4M) to within 0.1%.

This is now the most current, verifiably-accurate bulk dataset obtainable
without a personal Census API key. It's still not the exact 2024 ACS 5-year
figure (~30,511 for 10001, per your own research) or the raw 2020 Census
ZCTA count (32,612) — those require querying the Census Bureau's API
directly, which (as of 2025) requires a free personal API key for every
request. This sandboxed build environment has no way to self-serve one, and
every no-key alternative tested (Census Reporter's API, data.census.gov)
either blocks automated fetches or serves the same kind of older cached data.

**To get the exact latest numbers, run `scripts/fetch-latest-population.py`**
(instructions below) — getting a free key takes about 30 seconds, and one API
call updates every ZCTA in the country in a single request.

## County & elevation

| Field | Source | Notes |
|---|---|---|
| County | US Census Bureau ZCTA-to-county relationships, via the free SimpleMaps "US Zip Codes" database | Real county/parish/borough names, with correct suffixes (Parish for LA, Borough/Census Area for AK, independent "city" for VA/MD/MO/NV special cases) |
| Elevation | Modeled from real USGS reference points (see below) | **Not** a per-ZIP survey measurement — see limitation below |
| City, state, lat/lng, timezone, area code | Unchanged from the original project data | Not part of this fix; spot-checked and looked reasonable |

Verification after rebuild: 3,134 distinct county/state combinations were
generated (the real US has 3,143 counties and county-equivalents) — a strong
signal the county data is accurate, not synthetic.

### Elevation — important limitation

There is no free, bulk-downloadable, per-ZIP-code elevation dataset that
could be pulled into this build. Real per-point elevation (USGS 3DEP /
GeoNames DEM) is normally obtained by querying a live API once per
coordinate, and that kind of bulk querying isn't available from this build
environment.

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
realistically (mountain states read high, coastal/plains ZIPs read low), but
a ZIP far from any of the ~150 reference cities is only as accurate as its
state's mean elevation.

## Upgrading to true, live-sourced data later

Two scripts are included, both meant to be run **once** (or occasionally) from
a machine with normal internet access — this build sandbox only allows
outbound requests to npm/PyPI/GitHub, so neither could be run here:

### `scripts/fetch-latest-population.py` (population)
1. Get a free Census API key (instant, no approval wait):
   https://api.census.gov/data/key_signup.html
2. Run: `pip install requests && python3 scripts/fetch-latest-population.py YOUR_KEY`
3. One API call fetches the current ACS 5-Year population for every ZCTA in
   the country at once, and the script writes it back into the local JSON
   files. Pass `--decennial` to use exact 2020 Census counts instead.

### `scripts/fetch-real-elevation.py` (elevation)
1. Run: `pip install requests && python3 scripts/fetch-real-elevation.py`
2. Queries the free USGS Elevation Point Query Service once per ZIP
   (no key needed, ~2-3 hours for all 41,689 ZIPs, resumable if interrupted).

Both keep the architecture you asked for: authoritative data is downloaded
**once**, stored inside the project, and every ZIP tool just reads the local
JSON — these scripts are one-time refresh jobs, not something that runs per
request.

## Files

- `lib/data/zips/<STATE>.json` — full record per ZIP for that state
- `lib/data/zips/index.json` — compact array-format index used by the fast
  lookup path
- `public/zip-data/index.json` — same index, served statically
- `lib/data/zip-population.json` — flat `zip -> population` map
- `scripts/fetch-latest-population.py` — one-time upgrade to the exact
  current Census/ACS population (needs a free API key, see above)
- `scripts/fetch-real-elevation.py` — one-time upgrade to true per-ZIP
  USGS elevation (no key needed)
- `scripts/state_elevation_reference.json` / `scripts/city_elevations_reference.json`
  — the reference data used to model elevation, for transparency/auditing
