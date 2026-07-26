#!/usr/bin/env python3
"""Convert PickMyRace / RaceTec CSV (or browser-saved HTML) to RaceResults JSON."""
from __future__ import annotations

import argparse
import csv
import json
import os
import re
import sys
from html.parser import HTMLParser
from typing import Dict, List, Optional, Tuple

# Canonical CSV headers written by HTML extract / expected from RaceTec export
CSV_HEADERS = [
    "Pos",
    "Race No",
    "First Name",
    "Time",
    "Category",
    "Cat Pos",
    "Gender",
    "Gen Pos",
    "Start",
    "CP1",
    "CP2",
    "CP3",
    "Finish",
    "Detail URL",
]


def _norm_key(key: str) -> str:
    return re.sub(r"\s+", " ", key.strip().lower())


def _pick(row: Dict[str, str], *aliases: str) -> str:
    by_norm = {_norm_key(k): v for k, v in row.items()}
    for alias in aliases:
        val = by_norm.get(_norm_key(alias))
        if val is not None and str(val).strip() != "":
            return str(val).strip()
    return ""


def _gender_code(raw: str) -> str:
    g = raw.strip().lower()
    if g in ("m", "male", "pria", "laki-laki", "l"):
        return "M"
    if g in ("f", "female", "wanita", "perempuan", "w"):
        return "F"
    return raw.strip()[:1].upper() if raw.strip() else ""


def _infer_tab(path: str, explicit: Optional[str], row: Optional[Dict[str, str]] = None) -> str:
    if explicit:
        return explicit
    name = os.path.basename(path).lower()
    if "5k" in name or "eid=2" in name or "eid2" in name:
        return "5K"
    if "10k" in name or "eid=1" in name or "eid1" in name:
        return "10K"
    if row:
        bib = _pick(row, "Race No", "RaceNo", "BIB", "Bib")
        if bib.startswith("5-") or bib.startswith("5K"):
            return "5K"
        if bib.startswith("10-") or bib.startswith("10K"):
            return "10K"
    return "ALL"


def _infer_tab_from_html(html: str, path: str, explicit: Optional[str]) -> str:
    if explicit:
        return explicit
    m = re.search(
        r'ltw-activeeventtab[^>]*>\s*([^<]+)',
        html,
        re.I,
    )
    if m:
        return m.group(1).strip()
    m = re.search(r'[?&]EId=(\d+)', html)
    if m:
        return "10K" if m.group(1) == "1" else "5K" if m.group(1) == "2" else f"EId{m.group(1)}"
    return _infer_tab(path, None)


class RaceTecResultsParser(HTMLParser):
    """Parse RaceTec LiveTiming results table from a browser-saved HTML page."""

    def __init__(self) -> None:
        super().__init__()
        self.in_results = False
        self.in_header_row = False
        self.in_data_row = False
        self.in_td = False
        self.skip_cell = False
        self.td_class = ""
        self.td_text: List[str] = []
        self.td_href: Optional[str] = None
        self.header_cells: List[str] = []
        self.current_cells: List[Tuple[str, Optional[str], str]] = []
        self.rows: List[Dict[str, str]] = []
        self.table_depth = 0
        self.results_depth = 0
        self.row_classes = ""

    def handle_starttag(self, tag: str, attrs) -> None:
        attrs_d = dict(attrs)
        if tag == "table":
            self.table_depth += 1
            tid = attrs_d.get("id", "")
            if tid == "ctl00_Content_Main_tblResults":
                self.in_results = True
                self.results_depth = self.table_depth
            return

        if not self.in_results or self.table_depth != self.results_depth:
            return

        if tag == "tr":
            self.row_classes = attrs_d.get("class", "")
            if "accordion-toggle" in self.row_classes:
                self.in_data_row = True
                self.current_cells = []
            elif not self.header_cells and "accordion" not in self.row_classes:
                # first non-detail row inside results = header
                self.in_header_row = True
                self.header_cells = []
            return

        if tag == "td" and (self.in_header_row or self.in_data_row):
            self.in_td = True
            self.td_class = attrs_d.get("class", "")
            self.td_text = []
            self.td_href = None
            # skip mobile-only duplicate First Name column
            classes = self.td_class.lower()
            self.skip_cell = "d-sm-none" in classes
            return

        if tag == "a" and self.in_td and not self.skip_cell:
            href = attrs_d.get("href")
            if href and ("myresults" in href.lower() or "grid-name" in attrs_d.get("class", "")):
                self.td_href = href
            elif href and attrs_d.get("class") == "grid-name":
                self.td_href = href

    def handle_endtag(self, tag: str) -> None:
        if tag == "table":
            if self.in_results and self.table_depth == self.results_depth:
                self.in_results = False
            self.table_depth = max(0, self.table_depth - 1)
            return

        if not self.in_results:
            return

        if tag == "td" and self.in_td:
            self.in_td = False
            if not self.skip_cell:
                text = re.sub(r"\s+", " ", "".join(self.td_text)).strip()
                self.current_cells.append((text, self.td_href, self.td_class))
            self.skip_cell = False
            return

        if tag == "tr":
            if self.in_header_row:
                cells = [re.sub(r"\s+", " ", c[0]).strip() for c in self.current_cells]
                if cells and cells[0] == "":
                    cells = cells[1:]
                self.header_cells = cells
                self.in_header_row = False
                self.current_cells = []
            elif self.in_data_row:
                self._emit_data_row()
                self.in_data_row = False
                self.current_cells = []

    def handle_data(self, data: str) -> None:
        if self.in_td and not self.skip_cell:
            self.td_text.append(data)

    def _emit_data_row(self) -> None:
        cells = self.current_cells
        if not cells:
            return
        # drop expand icon cell (always first)
        if cells:
            cells = cells[1:]

        # Expected after skip mobile name:
        # Pos, Race No, First Name, Time, Category, Cat Pos, Gender, Gen Pos, Start, CP1, CP2, CP3, Finish
        labels = [
            "Pos",
            "Race No",
            "First Name",
            "Time",
            "Category",
            "Cat Pos",
            "Gender",
            "Gen Pos",
            "Start",
            "CP1",
            "CP2",
            "CP3",
            "Finish",
        ]
        row: Dict[str, str] = {h: "" for h in CSV_HEADERS}
        detail = ""
        for i, (text, href, _cls) in enumerate(cells):
            if i < len(labels):
                row[labels[i]] = text
            if href and "myresults" in href.lower():
                detail = href.replace("&amp;", "&")
        row["Detail URL"] = detail
        if row["Pos"] or row["Race No"] or row["First Name"]:
            self.rows.append(row)


def parse_html_file(path: str) -> Tuple[List[Dict[str, str]], str]:
    with open(path, "r", encoding="utf-8", errors="replace") as f:
        html = f.read()
    parser = RaceTecResultsParser()
    parser.feed(html)
    return parser.rows, html


def read_csv_file(path: str) -> List[Dict[str, str]]:
    with open(path, "r", encoding="utf-8-sig", errors="replace", newline="") as f:
        sample = f.read(4096)
        f.seek(0)
        try:
            dialect = csv.Sniffer().sniff(sample, delimiters=",;\t")
        except csv.Error:
            dialect = csv.excel
        reader = csv.DictReader(f, dialect=dialect)
        return [{k: (v or "").strip() for k, v in row.items() if k is not None} for row in reader]


def write_csv(path: str, rows: List[Dict[str, str]]) -> None:
    os.makedirs(os.path.dirname(os.path.abspath(path)) or ".", exist_ok=True)
    with open(path, "w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=CSV_HEADERS, extrasaction="ignore")
        writer.writeheader()
        for row in rows:
            writer.writerow({h: row.get(h, "") for h in CSV_HEADERS})


def _rank_key(participant: Dict[str, str]) -> Tuple[int, int, str]:
    """Finished (real clock time) first, then by overall rank, then BIB."""
    gun = (participant.get("Gun Time") or "").strip().lower()
    net = (participant.get("Net Time") or "").strip().lower()
    has_time = bool(re.match(r"^\d{1,2}:\d{2}:\d{2}$", gun or net))
    raw = participant.get("Overall Rank") or participant.get("#") or ""
    digits = re.sub(r"[^\d]", "", raw)
    try:
        rank = int(digits) if digits else 10**9
    except ValueError:
        rank = 10**9
    # 0 = has finish time, 1 = DNS/DNF/not started
    return (0 if has_time else 1, rank, participant.get("BIB", ""))


def _is_clock_time(val: str) -> bool:
    return bool(re.match(r"^\d{1,2}:\d{2}:\d{2}$", (val or "").strip()))


def row_to_participant(row: Dict[str, str]) -> Dict[str, str]:
    pos = _pick(row, "Pos", "Position", "#", "Overall Rank", "Overall")
    bib = _pick(row, "Race No", "RaceNo", "Race Number", "BIB", "Bib")
    name = _pick(row, "First Name", "Name", "Athlete", "Runner")
    category = _pick(row, "Category", "Cat")
    gun = _pick(row, "Time", "Gun Time", "Gun")
    finish = _pick(row, "Finish", "Net Time", "Net")
    if not finish and _is_clock_time(gun):
        finish = gun
    if not gun and _is_clock_time(finish):
        gun = finish
    start = _pick(row, "Start", "Start Time")
    cp1 = _pick(row, "CP1")
    cp2 = _pick(row, "CP2", "Check Point")
    cp3 = _pick(row, "CP3")
    gender_raw = _pick(row, "Gender", "Sex")
    gender_code = _gender_code(gender_raw)
    if gender_code == "M":
        gender_label = "Male"
    elif gender_code == "F":
        gender_label = "Female"
    else:
        gender_label = gender_raw or ""
    cat_pos = _pick(row, "Cat Pos", "Category Pos", "CatPos")
    gen_pos = _pick(row, "Gen Pos", "Gender Rank", "Gender Pos", "GenPos")
    status = _pick(row, "Status")
    if not status:
        if _is_clock_time(gun) or _is_clock_time(finish):
            status = "Finished"
        elif gun or finish:
            status = gun or finish
        else:
            status = ""
    detail = _pick(row, "Detail URL", "Certificate", "URL", "Link")
    if detail and not detail.startswith("http"):
        detail = ""
    if detail:
        m = re.search(r"uid=([^&#]+)", detail, re.I)
        if m:
            detail = f"https://result.pickmyrace.id/myresults.aspx?uid={m.group(1)}"

    return {
        # RaceTec column names (table-identical)
        "Pos": pos,
        "Race No": bib,
        "First Name": name,
        "Time": gun,
        "Category": category,
        "Cat Pos": cat_pos,
        "Gender": gender_label,
        "Gen Pos": gen_pos,
        "Start": start,
        "CP1": cp1,
        "CP2": cp2,
        "CP3": cp3,
        "Finish": finish,
        # Legacy aliases used by older UI filters
        "#": pos,
        "BIB": bib,
        "Name": name,
        "Gun Time": gun,
        "Net Time": finish,
        "Start Time": start,
        "Check Point": cp2,
        "Status": status,
        "Gender Rank": gen_pos,
        "Overall Rank": pos,
        "Certificate": detail,
    }


def _dedupe_by_bib(rows: List[Dict[str, str]]) -> List[Dict[str, str]]:
    """Keep best (lowest overall rank / finished) row per BIB."""
    best: Dict[str, Dict[str, str]] = {}
    no_bib: List[Dict[str, str]] = []
    for row in rows:
        bib = (row.get("BIB") or "").strip()
        if not bib:
            no_bib.append(row)
            continue
        prev = best.get(bib)
        if prev is None or _rank_key(row) < _rank_key(prev):
            best[bib] = row
    out = list(best.values()) + no_bib
    out.sort(key=_rank_key)
    return out


def load_sources(
    paths: List[str],
    tab_override: Optional[str],
    write_extracted_csv_dir: Optional[str],
) -> List[Tuple[str, List[Dict[str, str]]]]:
    """Return list of (tab, rows)."""
    groups: List[Tuple[str, List[Dict[str, str]]]] = []
    extracted: Dict[str, List[Dict[str, str]]] = {}
    for path in paths:
        ext = os.path.splitext(path)[1].lower()
        if ext in (".html", ".htm"):
            rows, html = parse_html_file(path)
            if tab_override and len(paths) == 1:
                tab = tab_override
            else:
                tab = _infer_tab_from_html(html, path, None)
            print(f"Parsed {len(rows)} rows from {os.path.basename(path)} [{tab}]", file=sys.stderr)
            if write_extracted_csv_dir:
                extracted.setdefault(tab, []).extend(rows)
            groups.append((tab, rows))
        elif ext == ".csv":
            rows = read_csv_file(path)
            tab = _infer_tab(path, tab_override if len(paths) == 1 else None)
            if rows and tab == "ALL":
                tab = _infer_tab(path, None, rows[0])
            groups.append((tab, rows))
        else:
            print(f"Skip unsupported file: {path}", file=sys.stderr)

    if write_extracted_csv_dir and extracted:
        os.makedirs(write_extracted_csv_dir, exist_ok=True)
        for tab, rows in extracted.items():
            # dedupe raw CSV rows by Race No
            seen: Dict[str, Dict[str, str]] = {}
            for row in rows:
                bib = (row.get("Race No") or "").strip()
                if not bib:
                    continue
                pos = row.get("Pos") or ""
                prev = seen.get(bib)
                if prev is None:
                    seen[bib] = row
                else:
                    try:
                        if int(pos or "999999") < int(prev.get("Pos") or "999999"):
                            seen[bib] = row
                    except ValueError:
                        pass
            merged_rows = sorted(
                seen.values(),
                key=lambda r: int(re.sub(r"[^\d]", "", r.get("Pos") or "") or "999999"),
            )
            safe = re.sub(r"[^a-zA-Z0-9_\-]+", "_", tab.lower())
            out_csv = os.path.join(write_extracted_csv_dir, f"notarace-2026-{safe}.csv")
            write_csv(out_csv, merged_rows)
            print(f"Wrote merged CSV {len(merged_rows)} rows → {out_csv}", file=sys.stderr)
    return groups


def build_json(groups: List[Tuple[str, List[Dict[str, str]]]]) -> List[Dict]:
    merged: Dict[str, List[Dict[str, str]]] = {}
    for tab, rows in groups:
        bucket = merged.setdefault(tab, [])
        for row in rows:
            bucket.append(row_to_participant(row))
    for tab in list(merged.keys()):
        before = len(merged[tab])
        merged[tab] = _dedupe_by_bib(merged[tab])
        after = len(merged[tab])
        if before != after:
            print(f"Deduped {tab}: {before} → {after}", file=sys.stderr)
    # stable tab order: 10K, 5K, then others
    order = sorted(merged.keys(), key=lambda t: (0 if t == "10K" else 1 if t == "5K" else 2, t))
    return [{"tab": t, "data": merged[t]} for t in order]


def main() -> None:
    script_dir = os.path.dirname(os.path.abspath(__file__))
    parser = argparse.ArgumentParser(
        description="Convert PickMyRace/RaceTec CSV or saved HTML to RaceResults JSON"
    )
    parser.add_argument(
        "inputs",
        nargs="+",
        help="CSV and/or browser-saved HTML files (10K and 5K exports)",
    )
    parser.add_argument(
        "-o",
        "--output",
        default=os.path.join(script_dir, "notarace-2026.json"),
        help="Output JSON path (default: scrapper/notarace-2026.json)",
    )
    parser.add_argument(
        "--tab",
        default=None,
        help="Force tab name when converting a single file",
    )
    parser.add_argument(
        "--public",
        default=None,
        help="Also write a copy here (e.g. ../public/notarace-2026.json)",
    )
    parser.add_argument(
        "--extract-csv-dir",
        default=None,
        help="When reading HTML, also write CSV extracts into this directory",
    )
    args = parser.parse_args()

    inputs = []
    for p in args.inputs:
        if os.path.isdir(p):
            for name in sorted(os.listdir(p)):
                if name.lower().endswith((".csv", ".html", ".htm")):
                    inputs.append(os.path.join(p, name))
        else:
            inputs.append(p)

    if not inputs:
        print("No input files found.", file=sys.stderr)
        sys.exit(1)

    extract_dir = args.extract_csv_dir
    if extract_dir is None and any(p.lower().endswith((".html", ".htm")) for p in inputs):
        extract_dir = os.path.join(script_dir, "input")

    groups = load_sources(inputs, args.tab, extract_dir)
    total = sum(len(rows) for _, rows in groups)
    if total == 0:
        print("No result rows parsed.", file=sys.stderr)
        sys.exit(1)

    formatted = build_json(groups)
    os.makedirs(os.path.dirname(os.path.abspath(args.output)) or ".", exist_ok=True)
    with open(args.output, "w", encoding="utf-8") as f:
        json.dump(formatted, f, indent=2, ensure_ascii=False)
    print(f"Wrote {total} participants in {len(formatted)} tab(s) → {args.output}", file=sys.stderr)

    public_path = args.public
    if public_path is None:
        public_path = os.path.normpath(os.path.join(script_dir, "..", "public", "notarace-2026.json"))
    if public_path:
        os.makedirs(os.path.dirname(os.path.abspath(public_path)) or ".", exist_ok=True)
        with open(public_path, "w", encoding="utf-8") as f:
            json.dump(formatted, f, indent=2, ensure_ascii=False)
        print(f"Copied → {public_path}", file=sys.stderr)

    for tab, rows in groups:
        print(f"  {tab}: {len(rows)}", file=sys.stderr)


if __name__ == "__main__":
    main()
