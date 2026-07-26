import React, { useEffect, useMemo, useState } from 'react';
import {
  Search,
  ExternalLink,
  Loader2,
  Clock,
  RefreshCw,
  FileBadge,
  RotateCcw,
  ChevronDown,
} from 'lucide-react';

const DATA_URL = './notarace-2026.json';
const CERT_BASE = 'https://result.pickmyrace.id/myresults.aspx';

interface Participant {
  Pos: string;
  'Race No': string;
  'First Name': string;
  Time: string;
  Category: string;
  'Cat Pos': string;
  Gender: string;
  'Gen Pos': string;
  Start: string;
  CP1: string;
  CP2: string;
  CP3: string;
  Finish: string;
  // legacy
  '#': string;
  BIB: string;
  Name: string;
  'Gun Time': string;
  'Net Time': string;
  'Start Time': string;
  'Check Point': string;
  Status: string;
  'Gender Rank': string;
  'Overall Rank': string;
  Certificate: string;
  _event?: string;
}

interface CategoryData {
  tab: string;
  data: Participant[];
}

type SortKey =
  | 'rank'
  | 'bib'
  | 'name'
  | 'time'
  | 'category'
  | 'gender'
  | 'start'
  | 'cp1'
  | 'cp2'
  | 'cp3'
  | 'finish';

type StatusFilter = 'ALL' | 'Finished' | 'Other';

type SortableCol = {
  key: SortKey | null;
  label: string;
  className?: string;
};

const COLUMNS: SortableCol[] = [
  { key: 'rank', label: 'Pos' },
  { key: null, label: 'Race No' },
  { key: null, label: 'First Name', className: 'rr-col-name' },
  { key: 'time', label: 'Time' },
  { key: 'category', label: 'Category' },
  { key: null, label: 'Cat Pos' },
  { key: 'gender', label: 'Gender' },
  { key: null, label: 'Gen Pos' },
  { key: 'start', label: 'Start' },
  { key: 'cp1', label: 'CP1' },
  { key: 'cp2', label: 'CP2' },
  { key: 'cp3', label: 'CP3' },
  { key: 'finish', label: 'Finish' },
];

function extractUid(raw: string): string | null {
  if (!raw) return null;
  const m = raw.match(/uid=([^&#]+)/i);
  return m ? decodeURIComponent(m[1]) : null;
}

function eCertificateUrl(p: Participant): string | null {
  const uid = extractUid(p.Certificate);
  if (!uid) return null;
  // Certificate lives on athlete detail page
  return `${CERT_BASE}?uid=${encodeURIComponent(uid)}`;
}

function detailUrl(p: Participant): string | null {
  return eCertificateUrl(p);
}

function isFinished(p: Participant): boolean {
  const t = p.Finish || p.Time || p['Net Time'] || p['Gun Time'] || '';
  return p.Status === 'Finished' || /^\d{1,2}:\d{2}:\d{2}$/.test(t);
}

function parseRank(p: Participant): number {
  const raw = p.Pos || p['Overall Rank'] || p['#'] || '';
  const n = parseInt(raw.replace(/\D/g, ''), 10);
  return Number.isFinite(n) && n > 0 ? n : 1e9;
}

function parseTimeToSeconds(t: string): number {
  if (!/^\d{1,2}:\d{2}:\d{2}$/.test(t || '')) return 1e12;
  const [h, m, s] = t.split(':').map(Number);
  return h * 3600 + m * 60 + s;
}

function genderCode(g: string): string {
  const v = (g || '').trim().toUpperCase();
  if (v === 'M' || v.startsWith('MALE')) return 'M';
  if (v === 'F' || v.startsWith('FEMALE')) return 'F';
  return v;
}

function cell(p: Participant, label: string): string {
  switch (label) {
    case 'Pos':
      return p.Pos || p['#'] || '—';
    case 'Race No':
      return p['Race No'] || p.BIB || '—';
    case 'First Name':
      return p['First Name'] || p.Name || '—';
    case 'Time':
      return p.Time || p['Gun Time'] || '—';
    case 'Category':
      return p.Category || '—';
    case 'Cat Pos':
      return p['Cat Pos'] || '—';
    case 'Gender':
      return p.Gender || '—';
    case 'Gen Pos':
      return p['Gen Pos'] || p['Gender Rank'] || '—';
    case 'Start':
      return p.Start || p['Start Time'] || '—';
    case 'CP1':
      return p.CP1 || '—';
    case 'CP2':
      return p.CP2 || p['Check Point'] || '—';
    case 'CP3':
      return p.CP3 || '—';
    case 'Finish':
      return p.Finish || p['Net Time'] || '—';
    default:
      return '—';
  }
}

export const RaceResultsPage: React.FC = () => {
  const [data, setData] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedTab, setSelectedTab] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [genderFilter, setGenderFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('Finished');
  const [sortBy, setSortBy] = useState<SortKey>('rank');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const enableResult = true;

  useEffect(() => {
    const loadResults = async () => {
      try {
        setLoading(true);
        const response = await fetch(DATA_URL);
        if (!response.ok) throw new Error(`Gagal memuat data: ${response.statusText}`);
        const json: CategoryData[] = await response.json();
        setData(json);
        setSelectedTab('ALL');
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Gagal memuat hasil lomba.';
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    loadResults();
  }, []);

  const eventTabs = useMemo(() => data.map(c => c.tab), [data]);

  const participants = useMemo(() => {
    if (selectedTab === 'ALL') return data.flatMap(c => c.data.map(p => ({ ...p, _event: c.tab })));
    const group = data.find(c => c.tab === selectedTab);
    return (group?.data || []).map(p => ({ ...p, _event: selectedTab }));
  }, [data, selectedTab]);

  const categoryOptions = useMemo(() => {
    const set = new Set<string>();
    participants.forEach(p => {
      if (p.Category) set.add(p.Category);
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [participants]);

  const filteredParticipants = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    let list = participants.filter(p => {
      const name = (p['First Name'] || p.Name || '').toLowerCase();
      const bib = (p['Race No'] || p.BIB || '').toLowerCase();
      const matchesSearch = !q || name.includes(q) || bib.includes(q);
      const matchesGender =
        genderFilter === 'ALL' || genderCode(p.Gender) === genderFilter.toUpperCase();
      const matchesCategory = categoryFilter === 'ALL' || p.Category === categoryFilter;
      const finished = isFinished(p);
      const matchesStatus =
        statusFilter === 'ALL' ||
        (statusFilter === 'Finished' && finished) ||
        (statusFilter === 'Other' && !finished);
      return matchesSearch && matchesGender && matchesCategory && matchesStatus;
    });

    const dir = sortDir === 'asc' ? 1 : -1;
    list = [...list].sort((a, b) => {
      let cmp = 0;
      switch (sortBy) {
        case 'bib':
          cmp = (a['Race No'] || a.BIB).localeCompare(b['Race No'] || b.BIB, undefined, { numeric: true });
          break;
        case 'name':
          cmp = (a['First Name'] || a.Name).localeCompare(b['First Name'] || b.Name);
          break;
        case 'time':
          cmp = parseTimeToSeconds(a.Time || a['Gun Time']) - parseTimeToSeconds(b.Time || b['Gun Time']);
          break;
        case 'category':
          cmp = a.Category.localeCompare(b.Category) || parseRank(a) - parseRank(b);
          break;
        case 'gender':
          cmp = a.Gender.localeCompare(b.Gender) || parseRank(a) - parseRank(b);
          break;
        case 'start':
          cmp = parseTimeToSeconds(a.Start) - parseTimeToSeconds(b.Start);
          break;
        case 'cp1':
          cmp = parseTimeToSeconds(a.CP1) - parseTimeToSeconds(b.CP1);
          break;
        case 'cp2':
          cmp = parseTimeToSeconds(a.CP2) - parseTimeToSeconds(b.CP2);
          break;
        case 'cp3':
          cmp = parseTimeToSeconds(a.CP3) - parseTimeToSeconds(b.CP3);
          break;
        case 'finish':
          cmp = parseTimeToSeconds(a.Finish || a['Net Time']) - parseTimeToSeconds(b.Finish || b['Net Time']);
          break;
        case 'rank':
        default:
          cmp = parseRank(a) - parseRank(b);
      }
      return cmp * dir;
    });

    return list;
  }, [participants, searchQuery, genderFilter, categoryFilter, statusFilter, sortBy, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filteredParticipants.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedParticipants = filteredParticipants.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTab, searchQuery, genderFilter, categoryFilter, statusFilter, sortBy, sortDir]);

  useEffect(() => {
    setCategoryFilter('ALL');
  }, [selectedTab]);

  const resetFilters = () => {
    setSearchQuery('');
    setGenderFilter('ALL');
    setCategoryFilter('ALL');
    setStatusFilter('Finished');
    setSortBy('rank');
    setSortDir('asc');
    setSelectedTab('ALL');
  };

  const onHeaderSort = (key: SortKey | null) => {
    if (!key) return;
    if (sortBy === key) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(key);
      setSortDir('asc');
    }
  };

  if (!enableResult) {
    return (
      <div className="page-wrapper rr-page rr-page--empty">
        <div className="rr-empty">
          <Clock size={40} className="rr-empty__icon" aria-hidden />
          <h2 className="rr-empty__title">Hasil Lomba Masih Diproses</h2>
          <p className="rr-empty__text">
            Data hasil pertandingan sedang diverifikasi panitia. Cek kembali sebentar lagi.
          </p>
          <button type="button" className="lp-btn lp-btn--primary" onClick={() => window.location.reload()}>
            <RefreshCw size={18} aria-hidden />
            Cek Lagi
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="page-wrapper rr-page rr-page--empty">
        <div className="rr-empty" role="status" aria-live="polite">
          <Loader2 className="rr-spin" size={40} aria-hidden />
          <p className="rr-empty__text">Memuat hasil lomba...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-wrapper rr-page rr-page--empty">
        <div className="rr-empty">
          <h2 className="rr-empty__title">Gagal memuat</h2>
          <p className="rr-empty__text">{error}</p>
          <button type="button" className="lp-btn lp-btn--primary" onClick={() => window.location.reload()}>
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper rr-page">
      <div className="container rr-container">
        <header className="rr-header">
          <h1 className="rr-header__title">Hasil Lomba</h1>
          <p className="rr-header__lede">
            Cari nama atau BIB, filter kategori/gender, dan unduh e-sertifikat.
          </p>
        </header>

        <div className="rr-tabs" role="tablist" aria-label="Event">
          <button
            type="button"
            role="tab"
            aria-selected={selectedTab === 'ALL'}
            className={`rr-tab ${selectedTab === 'ALL' ? 'rr-tab--active' : ''}`}
            onClick={() => setSelectedTab('ALL')}
          >
            Semua
          </button>
          {eventTabs.map(tab => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={selectedTab === tab}
              className={`rr-tab ${selectedTab === tab ? 'rr-tab--active' : ''}`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="rr-toolbar" role="search">
          <label className="rr-field rr-field--grow">
            <span className="rr-field__label">Filter</span>
            <span className="rr-search">
              <Search size={18} aria-hidden className="rr-search__icon" />
              <input
                type="search"
                className="rr-input"
                placeholder="Nama atau Race No"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                autoComplete="off"
              />
            </span>
          </label>

          <label className="rr-field">
            <span className="rr-field__label">Gender</span>
            <select
              className="rr-select"
              value={genderFilter}
              onChange={e => setGenderFilter(e.target.value)}
            >
              <option value="ALL">All genders</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </label>

          <label className="rr-field">
            <span className="rr-field__label">Category</span>
            <select
              className="rr-select"
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
            >
              <option value="ALL">All categories</option>
              {categoryOptions.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </label>

          <label className="rr-field">
            <span className="rr-field__label">Status</span>
            <select
              className="rr-select"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value as StatusFilter)}
            >
              <option value="Finished">Finished</option>
              <option value="ALL">All status</option>
              <option value="Other">DNS / Other</option>
            </select>
          </label>

          <button type="button" className="rr-reset" onClick={resetFilters}>
            <RotateCcw size={16} aria-hidden />
            Reset
          </button>
        </div>

        <div className="rr-meta">
          <h2 className="rr-meta__title">
            {selectedTab === 'ALL' ? 'Semua Event' : selectedTab}
            {categoryFilter !== 'ALL' ? ` · ${categoryFilter}` : ''}
          </h2>
          <p className="rr-meta__count">
            Menampilkan <strong>{filteredParticipants.length}</strong> dari {participants.length} peserta
          </p>
        </div>

        <p className="rr-table-hint">Geser ke samping untuk lihat semua kolom</p>
        <div className="rr-table-wrap" tabIndex={0} role="region" aria-label="Tabel hasil lomba, bisa digeser horizontal">
          <table className="rr-table">
            <thead>
              <tr>
                {COLUMNS.map(col => {
                  const sortable = col.key != null;
                  const active = col.key != null && sortBy === col.key;
                  return (
                    <th
                      key={col.label}
                      scope="col"
                      className={`${col.className || ''} ${sortable ? 'rr-th--sortable' : ''}`}
                    >
                      {sortable ? (
                        <button
                          type="button"
                          className={`rr-th-btn ${active ? 'rr-th-btn--active' : ''}`}
                          onClick={() => onHeaderSort(col.key)}
                          aria-label={`Sort by ${col.label}`}
                        >
                          <span>{col.label}</span>
                          <ChevronDown
                            size={12}
                            aria-hidden
                            className={`rr-th-caret ${active && sortDir === 'desc' ? 'rr-th-caret--up' : ''}`}
                          />
                        </button>
                      ) : (
                        <span className="rr-th-static">{col.label}</span>
                      )}
                    </th>
                  );
                })}
                <th scope="col" className="rr-th-action">
                  <span className="rr-th-static">E-Cert</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedParticipants.length > 0 ? (
                paginatedParticipants.map((p, idx) => {
                  const cert = eCertificateUrl(p);
                  const detail = detailUrl(p);
                  const name = cell(p, 'First Name');
                  return (
                    <tr key={`${p['Race No'] || p.BIB}-${idx}`}>
                      <td className="rr-td-center rr-strong">{cell(p, 'Pos')}</td>
                      <td className="rr-td-center rr-bib">{cell(p, 'Race No')}</td>
                      <td className="rr-col-name">
                        {detail ? (
                          <a
                            className="rr-name-link"
                            href={detail}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {name}
                          </a>
                        ) : (
                          <span className="rr-name">{name}</span>
                        )}
                      </td>
                      <td className="rr-td-center rr-mono">{cell(p, 'Time')}</td>
                      <td>
                        <span className="rr-chip">{cell(p, 'Category')}</span>
                      </td>
                      <td className="rr-td-center rr-mono">{cell(p, 'Cat Pos')}</td>
                      <td className="rr-td-center">
                        <span className={`rr-gender rr-gender--${genderCode(p.Gender) === 'F' ? 'f' : 'm'}`}>
                          {cell(p, 'Gender')}
                        </span>
                      </td>
                      <td className="rr-td-center rr-mono">{cell(p, 'Gen Pos')}</td>
                      <td className="rr-td-center rr-mono rr-muted">{cell(p, 'Start')}</td>
                      <td className="rr-td-center rr-mono rr-muted">{cell(p, 'CP1')}</td>
                      <td className="rr-td-center rr-mono rr-muted">{cell(p, 'CP2')}</td>
                      <td className="rr-td-center rr-mono rr-muted">{cell(p, 'CP3')}</td>
                      <td className="rr-td-center rr-mono rr-strong">{cell(p, 'Finish')}</td>
                      <td className="rr-td-center">
                        {cert && isFinished(p) ? (
                          <a
                            href={cert}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rr-cert"
                            aria-label={`E-sertifikat ${name}`}
                          >
                            <FileBadge size={14} aria-hidden />
                            E-Cert
                            <ExternalLink size={11} aria-hidden />
                          </a>
                        ) : (
                          <span className="rr-muted">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={COLUMNS.length + 1} className="rr-empty-row">
                    Tidak ada hasil yang cocok. Ubah filter atau reset.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <nav className="rr-pager" aria-label="Halaman hasil">
            <button type="button" className="rr-pager__btn" disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>
              First
            </button>
            <button
              type="button"
              className="rr-pager__btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            >
              Prev
            </button>
            <span className="rr-pager__status" aria-current="page">
              {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              className="rr-pager__btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            >
              Next
            </button>
            <button
              type="button"
              className="rr-pager__btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(totalPages)}
            >
              Last
            </button>
          </nav>
        )}
      </div>
    </div>
  );
};
