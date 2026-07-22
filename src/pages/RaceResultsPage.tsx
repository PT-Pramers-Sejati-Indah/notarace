import React, { useState, useEffect } from 'react';
import { Search, ExternalLink, Loader2 } from 'lucide-react';

// Configure dataset URL (local public path for now, easily replaceable by remote storage URL)
const DATA_URL = './r2512.json';

interface Participant {
  '#': string;
  Category: string;
  BIB: string;
  Name: string;
  Gender: string;
  'Gun Time': string;
  'Net Time': string;
  'Start Time': string;
  'Check Point': string;
  Status: string;
  'Gender Rank': string;
  'Overall Rank': string;
  Certificate: string;
}

interface CategoryData {
  tab: string;
  data: Participant[];
}

export const RaceResultsPage: React.FC = () => {
  const [data, setData] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filter and Search states
  const [selectedTab, setSelectedTab] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [genderFilter, setGenderFilter] = useState<string>('ALL');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const loadResults = async () => {
      try {
        setLoading(true);
        const response = await fetch(DATA_URL);
        if (!response.ok) {
          throw new Error(`Failed to load data: ${response.statusText}`);
        }
        const json: CategoryData[] = await response.json();
        setData(json);
        setSelectedTab('ALL');
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Gagal memuat hasil lomba.');
      } finally {
        setLoading(false);
      }
    };
    loadResults();
  }, []);

  // Find the currently selected category object or combine all for 'ALL'
  const participants = selectedTab === 'ALL'
    ? data.flatMap(c => c.data)
    : (data.find(c => c.tab === selectedTab)?.data || []);

  // Filter participants
  const filteredParticipants = participants.filter(p => {
    const matchesSearch = 
      p.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.BIB.includes(searchQuery);
    
    const matchesGender = 
      genderFilter === 'ALL' || 
      p.Gender.toUpperCase() === genderFilter.toUpperCase();

    return matchesSearch && matchesGender;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredParticipants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedParticipants = filteredParticipants.slice(startIndex, startIndex + itemsPerPage);

  // Reset pagination when filter/search/tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTab, searchQuery, genderFilter]);

  const renderMedal = (rankStr: string) => {
    const rank = parseInt(rankStr, 10);
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return rankStr;
  };

  if (loading) {
    return (
      <div className="page-wrapper flex items-center justify-center" style={{ minHeight: '60vh' }}>
        <div className="text-center">
          <Loader2 className="animate-spin text-accent mb-4 mx-auto" size={48} />
          <p className="text-xl text-muted font-medium">Memuat hasil lomba...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-wrapper flex items-center justify-center" style={{ minHeight: '60vh' }}>
        <div className="card text-center max-w-md mx-auto p-8 border border-red-500 bg-red-950 bg-opacity-20">
          <p className="text-red-400 font-bold mb-4">Error</p>
          <p className="text-muted mb-6">{error}</p>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>Coba Lagi</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper" style={{ padding: '2rem 0' }}>
      <div className="container">
        <header className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-extrabold mb-2 text-accent">Race Results</h1>
          <p className="text-muted max-w-xl mx-auto">
            Hasil resmi event NOTARACE 2026. Gunakan pencarian di bawah untuk mencari nama atau nomor BIB Anda.
          </p>
        </header>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          <button
            onClick={() => setSelectedTab('ALL')}
            className={`btn btn-sm ${selectedTab === 'ALL' ? 'btn-primary' : 'btn-outline'}`}
            style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}
          >
            ALL
          </button>
          {data.map(cat => (
            <button
              key={cat.tab}
              onClick={() => setSelectedTab(cat.tab)}
              className={`btn btn-sm ${selectedTab === cat.tab ? 'btn-primary' : 'btn-outline'}`}
              style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}
            >
              {cat.tab}
            </button>
          ))}
        </div>

        {/* Filters and Search Bar */}
        <div className="card mb-8">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex gap-2 items-center flex-wrap w-full md:w-auto">
              <div className="relative flex-1 md:flex-initial">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" size={18} />
                <input
                  type="text"
                  placeholder="Cari Nama atau BIB..."
                  className="form-input"
                  style={{ paddingLeft: '2.5rem', width: '100%', minWidth: '260px', margin: 0 }}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <span className="text-sm text-muted">Gender:</span>
              <select
                className="form-select"
                style={{ width: '120px', margin: 0 }}
                value={genderFilter}
                onChange={e => setGenderFilter(e.target.value)}
              >
                <option value="ALL">Semua</option>
                <option value="M">Laki-laki</option>
                <option value="F">Perempuan</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Table */}
        <div className="card">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
            <h3 className="text-xl font-bold text-accent">{selectedTab} Results</h3>
            <span className="text-sm text-muted">
              Menampilkan {filteredParticipants.length} dari {participants.length} pelari
            </span>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>BIB</th>
                  <th>Nama</th>
                  <th>Gender</th>
                  <th>Gun Time</th>
                  <th>Net Time</th>
                  <th>Check Point</th>
                  <th>Sertifikat</th>
                </tr>
              </thead>
              <tbody>
                {paginatedParticipants.length > 0 ? (
                  paginatedParticipants.map((p, idx) => (
                    <tr key={`${p.BIB}-${idx}`} className="hover:bg-white hover:bg-opacity-5">
                      <td className="font-bold">{renderMedal(p['#'] || p['Overall Rank'])}</td>
                      <td className="font-mono text-accent">{p.BIB}</td>
                      <td className="font-bold">{p.Name}</td>
                      <td>
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                          p.Gender === 'M' ? 'bg-blue-500 bg-opacity-20 text-blue-300' : 'bg-pink-500 bg-opacity-20 text-pink-300'
                        }`}>
                          {p.Gender === 'M' ? 'Male' : 'Female'}
                        </span>
                      </td>
                      <td className="font-mono text-muted">{p['Gun Time']}</td>
                      <td className="font-mono font-bold">{p['Net Time']}</td>
                      <td className="font-mono text-muted">{p['Check Point'] || '-'}</td>
                      <td>
                        {p.Certificate ? (
                          <a
                            href={p.Certificate}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline btn-sm flex items-center gap-1 py-1 px-3 text-xs"
                            style={{ display: 'inline-flex', minHeight: 'auto', height: '28px' }}
                          >
                            <ExternalLink size={12} />
                            E-Cert
                          </a>
                        ) : (
                          <span className="text-xs text-muted">-</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center py-8 text-muted">
                      Tidak ada hasil yang cocok dengan kriteria pencarian.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pagination mt-6">
              <button 
                className="page-item" 
                disabled={currentPage === 1} 
                onClick={() => setCurrentPage(1)}
              >
                First
              </button>
              <button 
                className="page-item" 
                disabled={currentPage === 1} 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              >
                Prev
              </button>
              <span className="page-item active">{currentPage} / {totalPages}</span>
              <button 
                className="page-item" 
                disabled={currentPage === totalPages} 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              >
                Next
              </button>
              <button 
                className="page-item" 
                disabled={currentPage === totalPages} 
                onClick={() => setCurrentPage(totalPages)}
              >
                Last
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
