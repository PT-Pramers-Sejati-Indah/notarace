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
