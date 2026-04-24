import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockApi, Result } from '../services/mockApi';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'peserta' | 'event'>('peserta');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const u = localStorage.getItem('user');
    if (!u) {
      navigate('/auth');
      return;
    }
    const parsed = JSON.parse(u);
    if (parsed.role !== 'admin') {
      navigate('/');
    }
  }, [navigate]);

  const handlePublishResults = async () => {
    setLoading(true);
    // Mocking a CSV parse by just generating dummy results
    const dummyResults: Result[] = [];
    for (let i = 1; i <= 50; i++) {
       dummyResults.push({
         bib_number: '10' + i.toString().padStart(3, '0'),
         participant_name: `Runner ${i}`,
         category: i % 2 === 0 ? '5K' : '10K',
         gun_time: '00:50:00',
         chip_time: '00:49:30',
         pace: '04:57 /km',
         rank_overall: i,
         rank_category: Math.ceil(i/2),
         status: 'Finisher'
       });
    }
    
    // Also mark bib as assigned for the current mocked user to demonstrate Profile State 3
    localStorage.setItem('bibAssigned', 'true');

    await mockApi.publishResults(dummyResults);
    setLoading(false);
    alert('Results published and BIBs assigned successfully!');
  };

  return (
    <div className="page-wrapper" style={{ padding: '2rem 0' }}>
      <div className="container">
        <h2 className="text-3xl font-bold mb-8 text-accent">Admin Dashboard</h2>

        <div className="flex gap-4 mb-8 border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <button 
            className={`pb-2 px-4 ${activeTab === 'peserta' ? 'text-accent border-b-2 border-accent font-bold' : 'text-muted'}`}
            style={{ background: 'none', borderTop: 'none', borderLeft: 'none', borderRight: 'none', cursor: 'pointer' }}
            onClick={() => setActiveTab('peserta')}
          >
            Peserta
          </button>
          <button 
            className={`pb-2 px-4 ${activeTab === 'event' ? 'text-accent border-b-2 border-accent font-bold' : 'text-muted'}`}
            style={{ background: 'none', borderTop: 'none', borderLeft: 'none', borderRight: 'none', cursor: 'pointer' }}
            onClick={() => setActiveTab('event')}
          >
            Event
          </button>
        </div>

        {activeTab === 'peserta' && (
          <div className="card">
            <h3 className="text-2xl font-bold mb-4">Participant Management</h3>
            <p className="text-muted mb-6">Manage registered participants, view payment statuses, and assign BIBs manually.</p>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Category</th>
                    <th>Payment</th>
                    <th>BIB</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>John Doe</td>
                    <td>john@example.com</td>
                    <td>10K</td>
                    <td><span className="badge badge-success">Lunas</span></td>
                    <td>10001</td>
                  </tr>
                  <tr>
                    <td>Jane Smith</td>
                    <td>jane@example.com</td>
                    <td>5K</td>
                    <td><span className="badge badge-danger">Belum Bayar</span></td>
                    <td>-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'event' && (
          <div className="card">
            <h3 className="text-2xl font-bold mb-4">Event Management</h3>
            <div className="flex-col gap-6">
               <div className="p-4 border rounded" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                  <h4 className="font-bold mb-2">Upload Race Results (CSV)</h4>
                  <p className="text-sm text-muted mb-4">Upload the timing chip results to publish them to the public Results page.</p>
                  <button className="btn btn-outline mb-2" onClick={() => alert('CSV Upload prototype')}>
                    Select CSV File
                  </button>
                  <div className="mt-4">
                     <button className="btn btn-primary" onClick={handlePublishResults} disabled={loading}>
                       {loading ? 'Publishing...' : 'Publish Results'}
                     </button>
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
