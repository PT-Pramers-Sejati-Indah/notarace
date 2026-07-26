import fs from 'fs';
import path from 'path';

function parseRunners(chunk) {
  const runners = [];
  const rr =
    /position-badge[^>]*>\s*(\d+)\s*<\/span>[\s\S]*?class="runner-name"[^>]*>\s*([^<(]+?)\s*\(([^)]+)\)[\s\S]*?class="time-display">\s*([\d:]+)\s*<\/span>/gi;
  let rm;
  while ((rm = rr.exec(chunk)) && runners.length < 20) {
    runners.push({
      pos: Number(rm[1]),
      name: rm[2].replace(/\s+/g, ' ').trim(),
      bib: rm[3].trim(),
      time: rm[4].trim(),
    });
  }
  return runners;
}

function parseHtml(html) {
  const parts = html.split(/<h6 class="category-title">/);
  if (parts.length > 1) {
    const cats = [];
    for (let i = 1; i < parts.length; i++) {
      const titleMatch = parts[i].match(/^([^<]+)<\/h6>/);
      const category = titleMatch ? titleMatch[1].trim() : '?';
      // stop at next category or gender column end - use generous chunk
      const next = parts[i].indexOf('<h6 class="category-title">');
      const chunk = next === -1 ? parts[i] : parts[i].slice(0, next);
      cats.push({ category, runners: parseRunners(chunk) });
    }
    return { type: 'category', cats };
  }

  // Gender page: split by Male/Female h5 headers
  const genderParts = html.split(/<h5>\s*(Male|Female)\s*<\/h5>/i);
  // [pre, 'Male', maleHtml, 'Female', femaleHtml, ...]
  const boards = [];
  for (let i = 1; i < genderParts.length; i += 2) {
    const gender = genderParts[i];
    const chunk = genderParts[i + 1] || '';
    boards.push({ gender, runners: parseRunners(chunk) });
  }
  return { type: 'gender', boards };
}

function isFinished(p) {
  const t = p.Finish || p.Time || p['Net Time'] || p['Gun Time'] || '';
  return p.Status === 'Finished' || /^\d{1,2}:\d{2}:\d{2}$/.test(t);
}

function posNum(raw) {
  const n = parseInt(String(raw || '').replace(/\D/g, ''), 10);
  return Number.isFinite(n) && n > 0 ? n : 1e9;
}

function genderLabel(g) {
  const v = (g || '').trim();
  if (/^f/i.test(v)) return 'Female';
  if (/^m/i.test(v)) return 'Male';
  return v || 'Other';
}

function buildCategory(rows, topN) {
  const finished = rows.filter(isFinished);
  const buckets = new Map();
  for (const p of finished) {
    const g = genderLabel(p.Gender);
    const c = (p.Category || '').trim() || '—';
    const key = `${g}||${c}`;
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key).push(p);
  }
  const order = ['MASTER NOTARIS', 'MASTER UMUM', 'NOTARIS', 'UMUM'];
  const out = [];
  for (const [key, list] of buckets) {
    const [gender, category] = key.split('||');
    const sorted = [...list]
      .sort((a, b) => posNum(a['Cat Pos']) - posNum(b['Cat Pos']))
      .slice(0, topN);
    out.push({
      gender,
      category,
      runners: sorted.map(p => ({
        pos: posNum(p['Cat Pos']),
        name: (p['First Name'] || p.Name || '').trim(),
        bib: (p['Race No'] || p.BIB || '').trim(),
        time: (p.Time || '').trim(),
      })),
    });
  }
  const male = out
    .filter(b => b.gender === 'Male')
    .sort((a, b) => order.indexOf(a.category) - order.indexOf(b.category));
  const female = out
    .filter(b => b.gender === 'Female')
    .sort((a, b) => order.indexOf(a.category) - order.indexOf(b.category));
  return [...male, ...female];
}

function buildGender(rows, topN) {
  const finished = rows.filter(isFinished);
  const buckets = new Map();
  for (const p of finished) {
    const g = genderLabel(p.Gender);
    if (!buckets.has(g)) buckets.set(g, []);
    buckets.get(g).push(p);
  }
  const out = [];
  for (const [gender, list] of buckets) {
    const sorted = [...list]
      .sort(
        (a, b) =>
          posNum(a['Gen Pos'] || a['Gender Rank']) -
          posNum(b['Gen Pos'] || b['Gender Rank']),
      )
      .slice(0, topN);
    out.push({
      gender,
      runners: sorted.map(p => ({
        pos: posNum(p['Gen Pos'] || p['Gender Rank']),
        name: (p['First Name'] || p.Name || '').trim(),
        bib: (p['Race No'] || p.BIB || '').trim(),
        time: (p.Time || '').trim(),
      })),
    });
  }
  return ['Male', 'Female'].map(g => out.find(b => b.gender === g)).filter(Boolean);
}

function cmpRunner(hr, jr) {
  return (
    hr.pos === jr.pos &&
    hr.name.toUpperCase() === jr.name.toUpperCase() &&
    hr.bib === jr.bib &&
    hr.time === jr.time
  );
}

const data = JSON.parse(fs.readFileSync('public/notarace-2026.json', 'utf8'));

const files = [
  { file: 'C:/Users/ibung/Downloads/category result 10k.html', event: '10K', mode: 'category' },
  { file: 'C:/Users/ibung/Downloads/category result 5k.html', event: '5K', mode: 'category' },
  { file: 'C:/Users/ibung/Downloads/gender result 10k.html', event: '10K', mode: 'gender' },
  { file: 'C:/Users/ibung/Downloads/gender result 5k.html', event: '5K', mode: 'gender' },
];

let totalFail = 0;

for (const f of files) {
  const html = fs.readFileSync(f.file, 'utf8');
  const parsed = parseHtml(html);
  const rows = (data.find(d => d.tab === f.event) || { data: [] }).data;
  console.log(`\n==== ${path.basename(f.file)} ====`);

  if (f.mode === 'category') {
    const boards = buildCategory(rows, 5);
    const htmlCats = parsed.cats || [];
    console.log(`HTML cats=${htmlCats.length} JSON boards=${boards.length}`);
    let mismatches = 0;
    for (let i = 0; i < htmlCats.length; i++) {
      const h = htmlCats[i];
      const j = boards[i];
      if (!j) {
        console.log('MISSING JSON for', h.category);
        mismatches++;
        continue;
      }
      if (h.category !== j.category) {
        console.log('CAT NAME', h.category, 'vs', j.category, j.gender);
        mismatches++;
      }
      if (!h.runners.length) {
        console.log('WARN empty HTML parse', h.category);
        mismatches++;
        continue;
      }
      const n = Math.min(h.runners.length, j.runners.length, 5);
      if (h.runners.length < 5 || j.runners.length < 5) {
        console.log(
          'COUNT',
          j.gender,
          j.category,
          `html=${h.runners.length}`,
          `json=${j.runners.length}`,
        );
      }
      for (let k = 0; k < n; k++) {
        if (!cmpRunner(h.runners[k], j.runners[k])) {
          mismatches++;
          console.log('MISMATCH', j.gender, j.category, k + 1, {
            html: h.runners[k],
            json: j.runners[k],
          });
        }
      }
    }
    console.log(mismatches ? `FAIL mismatches=${mismatches}` : 'PASS top5 category');
    totalFail += mismatches;
  } else {
    const boards = buildGender(rows, 5);
    const htmlBoards = parsed.boards || [];
    console.log(
      'HTML',
      htmlBoards.map(b => `${b.gender}:${b.runners.length}`),
      'JSON',
      boards.map(b => `${b.gender}:${b.runners.length}`),
    );
    let mismatches = 0;
    if (!htmlBoards.length) {
      console.log('FAIL empty HTML parse');
      mismatches++;
    }
    for (let i = 0; i < htmlBoards.length; i++) {
      const h = htmlBoards[i];
      const j = boards.find(b => b.gender === h.gender) || boards[i];
      if (!j) {
        mismatches++;
        continue;
      }
      const n = Math.min(h.runners.length, j.runners.length, 5);
      for (let k = 0; k < n; k++) {
        if (!cmpRunner(h.runners[k], j.runners[k])) {
          mismatches++;
          console.log('MISMATCH', j.gender, k + 1, {
            html: h.runners[k],
            json: j.runners[k],
          });
        }
      }
    }
    console.log(mismatches ? `FAIL mismatches=${mismatches}` : 'PASS top5 gender');
    totalFail += mismatches;
  }
}

console.log(`\nTOTAL FAIL: ${totalFail}`);
process.exit(totalFail ? 1 : 0);
