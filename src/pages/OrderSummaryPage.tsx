import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockApi } from '../services/mockApi';

export const OrderSummaryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    phone: '', emergencyContact: '', tshirtSize: 'M'
  });

  useEffect(() => {
    const u = localStorage.getItem('user');
    if (!u) {
      navigate('/auth');
    } else {
      const parsed = JSON.parse(u);
      setUser(parsed);
      setFormData(prev => ({ ...prev, phone: parsed.phone || '' }));
    }
  }, [navigate]);

  if (!user || !category) return null;

  const basePrice = category === '2.5K' ? 150000 : category === '5K' ? 250000 : 350000;
  const ppn = basePrice * 0.11;
  const serviceFee = 5000;
  const total = basePrice + ppn + serviceFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const orderData = {
        userId: user.id,
        fullName: user.name,
        email: user.email,
        category,
        ...formData
      };
      const order = await mockApi.submitOrder(orderData);
      localStorage.setItem('currentOrder', JSON.stringify(order));
      navigate('/payment');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper" style={{ padding: '2rem 0' }}>
      <div className="container">
        <h2 className="text-3xl font-bold mb-6 text-center">Order Summary</h2>
        <div className="flex gap-8 flex-wrap justify-center">
          
          <div className="card flex-1" style={{ minWidth: '300px', maxWidth: '500px' }}>
            <h3 className="text-xl font-bold mb-4 border-b pb-2" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>Participant Details</h3>
            <form onSubmit={handleSubmit} id="order-form">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input className="form-input" value={user.name} disabled style={{ opacity: 0.7 }} />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input required className="form-input" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Emergency Contact</label>
                <input required className="form-input" value={formData.emergencyContact} onChange={e => setFormData({...formData, emergencyContact: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">T-Shirt Size</label>
                <select className="form-select" value={formData.tshirtSize} onChange={e => setFormData({...formData, tshirtSize: e.target.value})}>
                  <option value="S">S</option><option value="M">M</option><option value="L">L</option><option value="XL">XL</option>
                </select>
              </div>
            </form>
          </div>

          <div className="card flex-1" style={{ minWidth: '300px', maxWidth: '400px', height: 'fit-content' }}>
            <h3 className="text-xl font-bold mb-4 border-b pb-2" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>Payment Summary</h3>
            <div className="flex justify-between mb-2">
              <span className="text-muted">Category</span>
              <span className="font-bold">{category}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-muted">Base Price</span>
              <span>Rp {basePrice.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-muted">PPN (11%)</span>
              <span>Rp {ppn.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between mb-6 border-b pb-4" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <span className="text-muted">Service Fee (Mayar.id)</span>
              <span>Rp {serviceFee.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between mb-8 text-xl">
              <span className="font-bold">Total</span>
              <span className="font-bold text-accent">Rp {total.toLocaleString('id-ID')}</span>
            </div>
            <button form="order-form" type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Processing...' : 'Lanjutkan ke Pembayaran'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
