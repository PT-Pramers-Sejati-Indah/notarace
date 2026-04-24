import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockApi } from '../services/mockApi';
import { Camera, QrCode } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [profileState, setProfileState] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const u = localStorage.getItem('user');
    if (!u) {
      navigate('/auth');
      return;
    }
    const parsed = JSON.parse(u);
    setUser(parsed);
    
    const fetchState = async () => {
      const stateData = await mockApi.getProfileState(parsed.id);
      setProfileState(stateData);
      setLoading(false);
    };
    fetchState();
  }, [navigate]);

  if (loading || !user || !profileState) return <div className="page-wrapper flex items-center justify-center">Loading...</div>;

  const { state, order, bib } = profileState;
  const resultsPublished = localStorage.getItem('resultsPublished') === 'true';

  let resultData = null;
  if (resultsPublished && bib) {
    const results = JSON.parse(localStorage.getItem('mockResults') || '[]');
    resultData = results.find((r: any) => r.bib_number === bib);
  }

  return (
    <div className="page-wrapper" style={{ padding: '2rem 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h2 className="text-3xl font-bold mb-6 text-accent">Profil Saya</h2>
        
        <div className="card mb-6">
          <div className="flex justify-between items-center mb-4 border-b pb-4" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <div>
              <h3 className="text-2xl font-bold">{user.name}</h3>
              <p className="text-muted">{user.email} | {user.phone}</p>
            </div>
            {state > 0 && order && (
               <div className="text-right">
                 <div className="text-xl font-bold text-accent">{order.category}</div>
                 {state === 1 && <span className="badge badge-danger mt-1">Belum Bayar</span>}
                 {state >= 2 && <span className="badge badge-success mt-1">Lunas</span>}
               </div>
            )}
          </div>

          {state === 0 && (
            <div className="text-center py-8">
              <p className="text-muted mb-4">Kamu belum mendaftar di race manapun.</p>
              <button className="btn btn-primary" onClick={() => navigate('/')}>Lihat Event</button>
            </div>
          )}

          {state === 1 && (
            <div className="text-center py-4 bg-danger bg-opacity-10 rounded p-4 border border-danger">
              <p className="mb-4 text-white">Selesaikan pembayaran untuk mengamankan slot kamu.</p>
              <button className="btn btn-danger" onClick={() => navigate('/payment')}>Selesaikan Pembayaran</button>
            </div>
          )}

          {state === 2 && (
            <div className="py-4">
               <div className="p-4 bg-gray-800 rounded border border-gray-700 text-center mb-6" style={{ background: 'rgba(15,23,42,0.8)', borderColor: 'rgba(255,255,255,0.1)' }}>
                  <h4 className="font-bold text-accent mb-2">BIB belum diambil</h4>
                  <p className="text-sm text-muted">Ambil race kit di GBK mulai 10 Nov 2026</p>
               </div>
               <div className="flex flex-col items-center border border-dashed rounded p-6" style={{ borderColor: 'var(--color-accent)' }}>
                 <QrCode size={120} className="mb-4 text-accent" />
                 <button className="btn btn-outline btn-sm">Unduh E-Tiket</button>
               </div>
            </div>
          )}

          {state === 3 && (
            <div className="py-4">
               <div className="text-center mb-8 border-b pb-8" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                  <p className="text-muted text-sm uppercase tracking-widest mb-2">Nomor BIB Kamu</p>
                  <div className="font-mono text-6xl font-extrabold text-accent bg-black inline-block px-8 py-4 rounded border-2 border-accent">
                    {bib}
                  </div>
               </div>
               
               {resultsPublished && resultData ? (
                 <div className="bg-primary-light rounded p-6 mt-6 border border-accent">
                    <h4 className="font-bold text-xl mb-4 text-accent text-center">Race Result</h4>
                    <div className="flex justify-between flex-wrap gap-4 text-center">
                      <div className="flex-1">
                        <div className="text-muted text-sm">Rank</div>
                        <div className="text-2xl font-bold">{resultData.rank_overall}</div>
                      </div>
                      <div className="flex-1">
                        <div className="text-muted text-sm">Chip Time</div>
                        <div className="text-2xl font-bold">{resultData.chip_time}</div>
                      </div>
                      <div className="flex-1">
                        <div className="text-muted text-sm">Pace</div>
                        <div className="text-2xl font-bold">{resultData.pace}</div>
                      </div>
                      <div className="flex-1">
                        <div className="text-muted text-sm">Category Pos</div>
                        <div className="text-2xl font-bold">{resultData.rank_category}</div>
                      </div>
                    </div>
                    <div className="text-center mt-6">
                      <a href={`https://gotag.me/search?bib=${bib}`} target="_blank" rel="noreferrer" className="btn btn-primary">
                         <Camera /> Cari Foto Saya
                      </a>
                    </div>
                 </div>
               ) : (
                 <div className="text-center text-muted">
                    <p>Hasil race belum dipublikasi.</p>
                 </div>
               )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
