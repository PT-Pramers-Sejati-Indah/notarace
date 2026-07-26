/** Build Category / Gender top-N boards from race result rows (finished only). */

export type BoardRunner = {
  pos: number;
  name: string;
  bib: string;
  time: string;
  certificate: string;
  category: string;
  gender: string;
  event: string;
};

export type CategoryBoard = {
  gender: string;
  category: string;
  runners: BoardRunner[];
};

export type GenderBoard = {
  gender: string;
  runners: BoardRunner[];
};

const GENDER_ORDER = ['Male', 'Female'];
const CATEGORY_ORDER = ['MASTER NOTARIS', 'MASTER UMUM', 'NOTARIS', 'UMUM'];

type RowLike = {
  Gender?: string;
  Category?: string;
  'Cat Pos'?: string;
  'Gen Pos'?: string;
  'Gender Rank'?: string;
  'First Name'?: string;
  Name?: string;
  'Race No'?: string;
  BIB?: string;
  Time?: string;
  Finish?: string;
  'Gun Time'?: string;
  'Net Time'?: string;
  Certificate?: string;
  Status?: string;
  _event?: string;
};

function isClock(t: string): boolean {
  return /^\d{1,2}:\d{2}:\d{2}$/.test((t || '').trim());
}

export function isFinishedRow(p: RowLike): boolean {
  const t = p.Finish || p.Time || p['Net Time'] || p['Gun Time'] || '';
  return p.Status === 'Finished' || isClock(t);
}

function posNum(raw: string | undefined): number {
  const n = parseInt(String(raw || '').replace(/\D/g, ''), 10);
  return Number.isFinite(n) && n > 0 ? n : 1e9;
}

function genderLabel(g: string | undefined): string {
  const v = (g || '').trim();
  if (/^f/i.test(v) || /^female$/i.test(v)) return 'Female';
  if (/^m/i.test(v) || /^male$/i.test(v)) return 'Male';
  return v || 'Other';
}

function toRunner(p: RowLike, pos: number, event: string): BoardRunner {
  return {
    pos,
    name: (p['First Name'] || p.Name || '').trim(),
    bib: (p['Race No'] || p.BIB || '').trim(),
    time: (p.Time || p['Gun Time'] || p.Finish || p['Net Time'] || '').trim(),
    certificate: p.Certificate || '',
    category: p.Category || '',
    gender: genderLabel(p.Gender),
    event,
  };
}

function sortKeyCategory(a: string, b: string): number {
  const ia = CATEGORY_ORDER.indexOf(a);
  const ib = CATEGORY_ORDER.indexOf(b);
  if (ia === -1 && ib === -1) return a.localeCompare(b);
  if (ia === -1) return 1;
  if (ib === -1) return -1;
  return ia - ib;
}

function sortKeyGender(a: string, b: string): number {
  const ia = GENDER_ORDER.indexOf(a);
  const ib = GENDER_ORDER.indexOf(b);
  if (ia === -1 && ib === -1) return a.localeCompare(b);
  if (ia === -1) return 1;
  if (ib === -1) return -1;
  return ia - ib;
}

/** Top N per (gender × category) by Cat Pos — matches RaceTec Category Results. */
export function buildCategoryBoards(
  rows: RowLike[],
  topN: number,
  eventLabel: string,
): CategoryBoard[] {
  const finished = rows.filter(isFinishedRow);
  const buckets = new Map<string, RowLike[]>();
  for (const p of finished) {
    const g = genderLabel(p.Gender);
    const c = (p.Category || '').trim() || '—';
    const key = `${g}||${c}`;
    const list = buckets.get(key) || [];
    list.push(p);
    buckets.set(key, list);
  }

  const boards: CategoryBoard[] = [];
  for (const [key, list] of buckets) {
    const [gender, category] = key.split('||');
    const sorted = [...list].sort((a, b) => posNum(a['Cat Pos']) - posNum(b['Cat Pos']));
    const top = sorted.slice(0, topN);
    boards.push({
      gender,
      category,
      runners: top.map((p, i) =>
        toRunner(p, posNum(p['Cat Pos']) < 1e9 ? posNum(p['Cat Pos']) : i + 1, eventLabel),
      ),
    });
  }

  boards.sort((a, b) => sortKeyGender(a.gender, b.gender) || sortKeyCategory(a.category, b.category));
  return boards;
}

/** Top N per gender by Gen Pos — matches RaceTec Gender Results. */
export function buildGenderBoards(
  rows: RowLike[],
  topN: number,
  eventLabel: string,
): GenderBoard[] {
  const finished = rows.filter(isFinishedRow);
  const buckets = new Map<string, RowLike[]>();
  for (const p of finished) {
    const g = genderLabel(p.Gender);
    const list = buckets.get(g) || [];
    list.push(p);
    buckets.set(g, list);
  }

  const boards: GenderBoard[] = [];
  for (const [gender, list] of buckets) {
    const sorted = [...list].sort(
      (a, b) => posNum(a['Gen Pos'] || a['Gender Rank']) - posNum(b['Gen Pos'] || b['Gender Rank']),
    );
    const top = sorted.slice(0, topN);
    boards.push({
      gender,
      runners: top.map((p, i) => {
        const gp = posNum(p['Gen Pos'] || p['Gender Rank']);
        return toRunner(p, gp < 1e9 ? gp : i + 1, eventLabel);
      }),
    });
  }

  boards.sort((a, b) => sortKeyGender(a.gender, b.gender));
  return boards;
}
