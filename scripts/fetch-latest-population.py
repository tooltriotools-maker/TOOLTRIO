#!/usr/bin/env python3
"""
Optional refresh: pulls the very latest population figures (2020 Census or
current-year ACS 5-Year) for every ZCTA in ONE bulk API call, using a free
Census Bureau API key.

Why this is a separate script: the Census Data API now requires a (free) API
key for every request, and this build sandbox has no way to self-serve one.
Get a key in ~30 seconds, with no approval wait, at:
    https://api.census.gov/data/key_signup.html

Usage:
    pip install requests
    python3 scripts/fetch-latest-population.py YOUR_API_KEY

By default this uses the most recent ACS 5-Year dataset (updated every
December). Pass --decennial to use the 2020 Census counts instead (exact,
but only updated once every ten years and only covers ZCTAs, i.e. it will
leave PO Box/unique ZIPs alone).
"""
import json
import os
import sys

try:
    import requests
except ImportError:
    sys.exit("Run `pip install requests` first.")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ZIPS_DIR = os.path.join(ROOT, "lib", "data", "zips")
INDEX_PATH = os.path.join(ZIPS_DIR, "index.json")
POP_PATH = os.path.join(ROOT, "lib", "data", "zip-population.json")

ACS5_URL = "https://api.census.gov/data/2023/acs/acs5"   # bump the year as new releases come out
DECENNIAL_URL = "https://api.census.gov/data/2020/dec/dhc"


def fetch_all_zcta_population(api_key, decennial=False):
    if decennial:
        params = {"get": "NAME,P1_001N", "for": "zip code tabulation area:*", "key": api_key}
        url = DECENNIAL_URL
        value_col = "P1_001N"
    else:
        params = {"get": "NAME,B01003_001E", "for": "zip code tabulation area:*", "key": api_key}
        url = ACS5_URL
        value_col = "B01003_001E"

    resp = requests.get(url, params=params, timeout=60)
    resp.raise_for_status()
    rows = resp.json()
    header = rows[0]
    zcta_idx = header.index("zip code tabulation area")
    val_idx = header.index(value_col)

    pop = {}
    for row in rows[1:]:
        zcta = row[zcta_idx]
        try:
            pop[zcta] = int(row[val_idx])
        except (TypeError, ValueError):
            continue
    return pop


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    api_key = sys.argv[1]
    decennial = "--decennial" in sys.argv[2:]

    print("Fetching nationwide ZCTA population in one request...")
    pop_by_zcta = fetch_all_zcta_population(api_key, decennial=decennial)
    print(f"Got population for {len(pop_by_zcta)} ZCTAs.")

    index = json.load(open(INDEX_PATH, encoding="utf-8"))
    updated = 0
    for zip_code, entry in index.items():
        if zip_code in pop_by_zcta:
            entry[7] = pop_by_zcta[zip_code]  # population is index 7
            updated += 1
    print(f"Updated {updated} of {len(index)} zip records.")

    json.dump(index, open(INDEX_PATH, "w", encoding="utf-8"), ensure_ascii=False)
    public_index = os.path.join(ROOT, "public", "zip-data", "index.json")
    if os.path.exists(public_index):
        json.dump(index, open(public_index, "w", encoding="utf-8"), ensure_ascii=False)

    population_map = {z: e[7] for z, e in index.items()}
    json.dump(population_map, open(POP_PATH, "w", encoding="utf-8"), ensure_ascii=False)

    by_state = {}
    for zip_code, entry in index.items():
        by_state.setdefault(entry[1], []).append((zip_code, entry))
    for state_code, records in by_state.items():
        path = os.path.join(ZIPS_DIR, f"{state_code}.json")
        if not os.path.exists(path):
            continue
        state_records = json.load(open(path, encoding="utf-8"))
        pop_by_zip = {z: e[7] for z, e in records}
        for r in state_records:
            if r["zip"] in pop_by_zip:
                r["population"] = pop_by_zip[r["zip"]]
        json.dump(state_records, open(path, "w", encoding="utf-8"), ensure_ascii=False)

    print("Done.")


if __name__ == "__main__":
    main()
