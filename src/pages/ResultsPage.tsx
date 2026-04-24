import React, { useState, useEffect } from 'react';
import { mockApi, Result } from '../services/mockApi';

export const ResultsPage: React.FC = () => {
  const [published, setPublished] = useState(false);
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<'rank' | 'name'>('rank');
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchResults = async () => {
      const data = await mockApi.getResults();
      setPublished(data.published);
      setResults(data.results);
      setLoading(false);
    };
    fetchResults();
  }, []);

  if (loading) return <div className="page-wrapper flex items-center justify-center">Loading...</div>;

  if (!published) {
    return (
      <div className="page-wrapper flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <h2 className="text-4xl font-bold mb-4 text-accent">Hasil Lomba</h2>
          <p className="text-xl text-muted">Hasil lomba akan segera tersedia</p>
        </div>
      </div>
    );
  }

  // Filtering
  let filtered = results.filter(r => category === 'All' || r.category === category);
  
  let foundResult = null;
  if (search) {
    const exactMatch = filtered.find(r => r.bib_number === search);
    if (exactMatch) {
      foundResult = exactMatch;
      filtered = [exactMatch];
    } else {
      filtered = [];
    }
  }

  // Sorting
  filtered.sort((a, b) => {
    if (sortBy === 'name') return a.participant_name.localeCompare(b.participant_name);
    return a.rank_overall - b.rank_overall;
  });

  // Pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const renderMedal = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return rank;
  };

  return (
    <div className="page-wrapper" style={{ padding: '2rem 0' }}>
      <div className="container">
        <h2 className="text-4xl font-bold mb-8 text-accent text-center">Race Results</h2>

        <div className="card mb-8">
          <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
             <div className="flex gap-2">
               {['All', '2.5K', '5K', '10K'].map(cat => (
                 <button 
                   key={cat} 
                   className={`btn btn-sm ${category === cat ? 'btn-primary' : 'btn-outline'}`}
                   onClick={() => { setCategory(cat); setPage(1); setSearch(''); }}
                 >
                   {cat}
                 </button>
               ))}
             </div>
             
             <div className="flex gap-2 items-center">
               <input 
                 type="text" 
                 placeholder="Search BIB..." 
                 className="form-input" 
                 style={{ width: '200px', margin: 0 }}
                 value={search}
                 onChange={e => setSearch(e.target.value)}
               />
               <select className="form-select" style={{ width: '150px', margin: 0 }} value={sortBy} onChange={e => setSortBy(e.target.value as any)}>
                  <option value="rank">Sort: Rank</option>
                  <option value="name">Sort: Name A-Z</option>
               </select>
             </div>
          </div>

          {search && !foundResult && (
            <div className="text-center p-4 bg-red-900 bg-opacity-20 border border-red-500 rounded text-red-400">
               BIB {search} tidak ditemukan. Pastikan nomor BIB sudah benar.
            </div>
          )}

          {foundResult && (
            <div className="mb-6 p-4 border border-accent rounded bg-accent bg-opacity-10 flex justify-between items-center flex-wrap gap-4" style={{ backgroundColor: 'rgba(212,175,55,0.1)' }}>
              <div>
                <div className="text-accent font-bold">BIB {foundResult.bib_number}</div>
                <div className="text-xl font-bold">{foundResult.participant_name}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted">Rank</div>
                <div className="font-bold text-xl">{foundResult.rank_overall}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted">Chip Time</div>
                <div className="font-bold text-xl font-mono">{foundResult.chip_time}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted">Pace</div>
                <div className="font-bold text-xl font-mono">{foundResult.pace}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted">Category Pos</div>
                <div className="font-bold text-xl">{foundResult.rank_category}</div>
              </div>
            </div>
          )}

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>BIB</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Gun Time</th>
                  <th>Chip Time</th>
                  <th>Pace</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map(r => (
                  <tr key={r.bib_number} className={foundResult?.bib_number === r.bib_number ? 'table-row-highlight' : ''}>
                    <td className="font-bold">{renderMedal(r.rank_overall)}</td>
                    <td className="font-mono text-accent">{r.bib_number}</td>
                    <td className="font-bold">{r.participant_name}</td>
                    <td>{r.category}</td>
                    <td className="font-mono text-muted">{r.gun_time}</td>
                    <td className="font-mono">{r.chip_time}</td>
                    <td className="font-mono">{r.pace}</td>
                    <td>
                      {r.status === 'Finisher' ? <span className="text-green-400">✅ Finisher</span> : <span className="text-red-400">⚠ DNF</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {!search && totalPages > 1 && (
            <div className="pagination">
              <button className="page-item" disabled={page === 1} onClick={() => setPage(1)}>First</button>
              <button className="page-item" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</button>
              <span className="page-item active">{page}</span>
              <button className="page-item" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next</button>
              <button className="page-item" disabled={page === totalPages} onClick={() => setPage(totalPages)}>Last</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
