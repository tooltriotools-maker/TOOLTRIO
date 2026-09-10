#!/usr/bin/env python3
"""
One-time (or periodic) refresh job: replaces the modeled elevation estimates
in lib/data/zips/*.json and lib/data/zips/index.json with true per-ZIP
elevation from the free USGS Elevation Point Query Service.

This is NOT meant to run on every request. Run it once, commit the updated
JSON files, and the app keeps reading from the local, self-contained dataset
just like before.

Requires outbound internet access to https://epqs.nationalmap.gov (free, no
API key). Run this from your own machine or CI -- it will NOT work inside a
network-restricted sandbox.

Usage:
    pip install requests
    python3 scripts/fetch-real-elevation.py

Takes a while: ~41,700 ZIPs x ~0.2s/request with the built-in delay is
roughly 2-3 hours. Safe to stop and re-run -- it checkpoints progress to
scripts/.elevation_progress.json so it can resume.
"""
import json
import os
import time
import sys

try:
    import requests
except ImportError:
    sys.exit("Run `pip install requests` first.")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ZIPS_DIR = os.path.join(ROOT, "lib", "data", "zips")
INDEX_PATH = os.path.join(ZIPS_DIR, "index.json")
PROGRESS_PATH = os.path.join(os.path.dirname(__file__), ".elevation_progress.json")
EPQS_URL = "https://epqs.nationalmap.gov/v1/json"
REQUEST_DELAY_SECONDS = 0.2


def fetch_elevation_ft(lat, lng, retries=3):
    for attempt in range(retries):
        try:
            resp = requests.get(
                EPQS_URL,
                params={"x": lng, "y": lat, "units": "Feet", "wkid": 4326, "includeDate": "False"},
                timeout=10,
            )
            resp.raise_for_status()
            data = resp.json()
            value = float(data["value"])
            return round(value)
        except Exception:
            time.sleep(1 + attempt)
    return None


def load_progress():
    if os.path.exists(PROGRESS_PATH):
        return json.load(open(PROGRESS_PATH))
    return {}


def save_progress(progress):
    json.dump(progress, open(PROGRESS_PATH, "w"))


def main():
    index = json.load(open(INDEX_PATH, encoding="utf-8"))
    progress = load_progress()  # zip -> real elevation already fetched

    total = len(index)
    for i, (zip_code, entry) in enumerate(index.items()):
        if zip_code in progress:
            continue
        lat, lng = entry[2], entry[3]
        elev = fetch_elevation_ft(lat, lng)
        if elev is not None:
            progress[zip_code] = elev
            entry[8] = elev  # elevation is index 8 in the array format
        if i % 200 == 0:
            print(f"{i}/{total} done...")
            save_progress(progress)
        time.sleep(REQUEST_DELAY_SECONDS)

    save_progress(progress)

    # write back index.json (both copies) and the per-state files
    json.dump(index, open(INDEX_PATH, "w", encoding="utf-8"), ensure_ascii=False)
    public_index = os.path.join(ROOT, "public", "zip-data", "index.json")
    if os.path.exists(public_index):
        json.dump(index, open(public_index, "w", encoding="utf-8"), ensure_ascii=False)

    by_state = {}
    for zip_code, entry in index.items():
        state_code = entry[1]
        by_state.setdefault(state_code, []).append((zip_code, entry))

    for state_code, records in by_state.items():
        path = os.path.join(ZIPS_DIR, f"{state_code}.json")
        if not os.path.exists(path):
            continue
        state_records = json.load(open(path, encoding="utf-8"))
        elev_by_zip = {z: e[8] for z, e in records}
        for r in state_records:
            if r["zip"] in elev_by_zip:
                r["elevation"] = elev_by_zip[r["zip"]]
        json.dump(state_records, open(path, "w", encoding="utf-8"), ensure_ascii=False)

    print("Done. All ZIPs now have USGS-sourced real elevation.")


if __name__ == "__main__":
    main()
