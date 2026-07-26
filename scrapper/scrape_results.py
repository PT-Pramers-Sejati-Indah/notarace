#!/usr/bin/env python3
import urllib.request
import urllib.parse
from html.parser import HTMLParser
import csv
import json
import argparse
import sys
import re

class SixRaceParser(HTMLParser):
    def __init__(self, base_url):
        super().__init__()
        self.base_url = base_url
        self.in_table = False
        self.in_thead = False
        self.in_tbody = False
        self.in_tr = False
        self.in_th = False
        self.in_td = False
        self.current_href = None
        self.headers = []
        self.current_row = []
        self.rows = []
        self.current_text = []

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        if tag == 'table' and attrs_dict.get('id') == 'example':
            self.in_table = True
        elif self.in_table:
            if tag == 'thead':
                self.in_thead = True
            elif tag == 'tbody':
                self.in_tbody = True
            elif tag == 'tr':
                self.in_tr = True
                self.current_row = []
            elif tag == 'th' and self.in_thead:
                self.in_th = True
                self.current_text = []
            elif tag == 'td' and self.in_tbody:
                self.in_td = True
                self.current_text = []
                self.current_href = None
            elif tag == 'a' and self.in_td:
                self.current_href = attrs_dict.get('href')

    def handle_endtag(self, tag):
        if not self.in_table:
            return
        
        if tag == 'table':
            self.in_table = False
        elif tag == 'thead':
            self.in_thead = False
        elif tag == 'tbody':
            self.in_tbody = False
        elif tag == 'tr':
            if self.in_tbody and self.current_row:
                self.rows.append(self.current_row)
            self.in_tr = False
        elif tag == 'th':
            self.in_th = False
            header_name = " ".join(self.current_text).strip()
            # Clean up header whitespace
            header_name = re.sub(r'\s+', ' ', header_name)
            self.headers.append(header_name)
        elif tag == 'td':
            self.in_td = False
            cell_val = " ".join(self.current_text).strip()
            cell_val = re.sub(r'\s+', ' ', cell_val)
            # If there was a link inside the cell, resolve it
            if self.current_href:
                cell_val = urllib.parse.urljoin(self.base_url, self.current_href)
            self.current_row.append(cell_val)

    def handle_data(self, data):
        if self.in_th or self.in_td:
            self.current_text.append(data)

def main():
    parser = argparse.ArgumentParser(description="Scrape race results from sixrace.id")
    parser.add_argument(
        "url", 
        nargs="?", 
        default="https://sixrace.id/result/view.php?r=r2512",
        help="The URL of the result page to scrape"
    )
    parser.add_argument(
        "-f", "--format", 
        choices=["csv", "json"], 
        default="json",
        help="Output format (csv or json). Default is json."
    )
    parser.add_argument(
        "-o", "--output", 
        help="Output file path. If not provided, defaults to <scrapper_dir>/<race_id>.json."
    )

    args = parser.parse_args()

    import os
    script_dir = os.path.dirname(os.path.abspath(__file__))

    # Resolve default output path if not provided
    if not args.output:
        parsed_url = urllib.parse.urlparse(args.url)
        query_params = urllib.parse.parse_qs(parsed_url.query)
        race_id = query_params.get('r', ['results'])[0]
        cat_param = query_params.get('c', [''])[0].strip()
        
        # Clean names for filename safety
        race_id = re.sub(r'[^a-zA-Z0-9_\-]', '_', race_id)
        if cat_param:
            safe_cat = re.sub(r'[^a-zA-Z0-9_\-]', '_', cat_param.lower())
            safe_cat = re.sub(r'_+', '_', safe_cat).strip('_')
            filename = f"{race_id}_{safe_cat}"
        else:
            filename = race_id
            
        extension = "json" if args.format == "json" else "csv"
        args.output = os.path.join(script_dir, f"{filename}.{extension}")

    print(f"Fetching data from: {args.url}", file=sys.stderr)
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
    
    try:
        req = urllib.request.Request(args.url, headers=headers)
        with urllib.request.urlopen(req) as response:
            raw_data = response.read()
            charset = response.headers.get_content_charset() or 'utf-8'
            try:
                html = raw_data.decode(charset)
            except UnicodeDecodeError:
                # Fallback to cp1252/latin-1 which supports 0x92
                html = raw_data.decode('cp1252', errors='replace')
    except Exception as e:
        print(f"Error fetching URL: {e}", file=sys.stderr)
        sys.exit(1)

    print("Parsing HTML...", file=sys.stderr)
    parser_obj = SixRaceParser(args.url)
    parser_obj.feed(html)

    if not parser_obj.headers:
        print("Warning: No table headers found. The page layout might have changed or ID 'example' was not found.", file=sys.stderr)
    
    print(f"Successfully parsed {len(parser_obj.rows)} rows.", file=sys.stderr)

    # Format output
    if args.format == "csv":
        with open(args.output, 'w', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerow(parser_obj.headers)
            writer.writerows(parser_obj.rows)
        print(f"Saved CSV output to {args.output}", file=sys.stderr)
    elif args.format == "json":
        # Find the index of the "Category" column
        headers = parser_obj.headers
        category_idx = -1
        for idx, h in enumerate(headers):
            if h.lower() == 'category':
                category_idx = idx
                break

        parsed_url = urllib.parse.urlparse(args.url)
        query_params = urllib.parse.parse_qs(parsed_url.query)
        url_category = query_params.get('c', [''])[0].strip()

        # Group records by category
        categories = {}
        for row in parser_obj.rows:
            row_dict = {}
            for i, val in enumerate(row):
                header_name = headers[i] if i < len(headers) else f"column_{i}"
                row_dict[header_name] = val
            
            # Determine tab name
            if category_idx != -1 and category_idx < len(row):
                cat_name = row[category_idx].strip()
            else:
                cat_name = url_category or "All"
            
            if not cat_name:
                cat_name = "All"
                
            if cat_name not in categories:
                categories[cat_name] = []
            categories[cat_name].append(row_dict)
        
        # Structure output in requested format: [{"tab": tab_name, "data": [...]}]
        formatted_data = []
        for cat_name, cat_records in categories.items():
            formatted_data.append({
                "tab": cat_name,
                "data": cat_records
            })
        
        with open(args.output, 'w', encoding='utf-8') as f:
            json.dump(formatted_data, f, indent=2, ensure_ascii=False)
        print(f"Saved JSON output to {args.output}", file=sys.stderr)

if __name__ == "__main__":
    main()
