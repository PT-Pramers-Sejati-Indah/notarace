# BUAT SANDI!
1. Run `python3 scrape_results.py -o race_result.json` di folder scrapper
2. commit & push
3. merge ke branch main & release!

# Race Results Scraper
Scrapes race results tables from [sixrace.id](https://sixrace.id) result pages and saves them as JSON or CSV.

## Requirements

- Python 3 (uses only the standard library — no packages to install)

## Usage

```bash
python3 scrape_results.py [url] [-f json|csv] [-o output_path]
```

### Arguments

- `url` (optional) — the result page URL to scrape. Defaults to `https://sixrace.id/result/view.php?r=r2512`.
- `-f`, `--format` (optional) — output format, `json` or `csv`. Defaults to `json`.
- `-o`, `--output` (optional) — output file path. If omitted, defaults to `<race_id>.<ext>` inside the `scrapper` folder (e.g. `r2512.json`), based on the `r` (and `c`) query params in the URL.

### Examples

Scrape the default URL to JSON:

```bash
python3 scrape_results.py
```

Scrape a specific race URL:

```bash
python3 scrape_results.py "https://sixrace.id/result/view.php?r=r2512"
```

Save as CSV:

```bash
python3 scrape_results.py -f csv
```

Save to a custom file name:

```bash
python3 scrape_results.py -o race_result.json
```

## Output

- **JSON**: an array of category groups, each with a `tab` name and a `data` array of row objects keyed by table header, e.g.:

  ```json
  [
    {
      "tab": "5K",
      "data": [
        { "Rank": "1", "Name": "...", "Category": "5K", ... }
      ]
    }
  ]
  ```

- **CSV**: a flat table with the original table headers as columns.

---

# PickMyRace / RaceTec (NotaRace 2026)

Cloudflare blocks scripted fetches of `result.pickmyrace.id`. **Do not crawl that host from scripts.** Export in a normal browser, then convert offline.

## 1. Export data (browser)

1. Open https://result.pickmyrace.id/Results.aspx?CId=20572&RId=66 (pass Cloudflare as a normal user).
2. Prefer **Export to CSV** for **10K** (`EId=1`) and **5K** (`EId=2`). If Export is hidden on All Results, try Advanced: `...&EId=1&dt=0&adv=1` (then `EId=2`).
3. Put files in `scrapper/input/`, e.g.:
   - `scrapper/input/notarace-2026-10k.csv`
   - `scrapper/input/notarace-2026-5k.csv`

Fallback if Export never appears: in the browser, save each results page as HTML (10K pages 1–8, then all 5K pages) and pass those `.html` files to the converter instead.

## 2. Convert to JSON

```bash
python convert_pickmyrace_csv.py input/notarace-2026-10k.csv input/notarace-2026-5k.csv
```

Or from saved HTML:

```bash
python convert_pickmyrace_csv.py "path/to/NotaRace 2026.html"
```

Defaults:

- writes `scrapper/notarace-2026.json`
- copies to `public/notarace-2026.json`
- HTML inputs also write extracted CSV under `scrapper/input/`

`RaceResultsPage` loads `./notarace-2026.json`. Set `enableResult` to `true` in `src/pages/RaceResultsPage.tsx` when the JSON has the full field (10K ≈ 362 + full 5K).

### Current dataset

Converted from all browser-saved HTML pages (10K p1–8 + 5K p1–33). Output:

- `public/notarace-2026.json` — **10K: 362** / **5K: 1578** unique BIBs
- `scrapper/input/notarace-2026-10k.csv` + `notarace-2026-5k.csv` merged extracts

`enableResult` is `true` in `RaceResultsPage.tsx`.
