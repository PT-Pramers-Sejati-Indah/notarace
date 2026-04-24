import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, Building, CheckCircle } from 'lucide-react';
import { mockApi } from '../services/mockApi';

export const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState<any>(null);
  const [status, setStatus] = useState<'pending' | 'processing' | 'success'>('pending');
  const [timeLeft] = useState('23:59');

  useEffect(() => {
    const savedOrder = localStorage.getItem('currentOrder');
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
      localStorage.setItem('paymentStatus', 'pending');
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handlePayment = async () => {
    setStatus('processing');
    try {
      await mockApi.processPayment(order.orderId);
      localStorage.setItem('paymentStatus', 'success');
      setStatus('success');
    } catch (e) {
      console.error(e);
      setStatus('pending');
    }
  };

  if (!order) return null;

  if (status === 'success') {
    return (
      <div className="page-wrapper" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div className="card text-center animate-fade-in" style={{ maxWidth: '500px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', color: '#10B981', marginBottom: '1rem' }}>
            <CheckCircle size={64} />
          </div>
          <h2 className="text-3xl font-bold mb-2">Payment Confirmation</h2>
          <p className="text-muted mb-6">
            In-UI notification: Email konfirmasi telah dikirim ke <strong>{order.email}</strong>
          </p>
          <div style={{ background: 'rgba(15,23,42,0.8)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem', textAlign: 'left' }}>
            <div className="flex justify-between mb-2">
              <span className="text-muted">Order ID:</span>
              <span className="font-bold">{order.orderId}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-muted">Name:</span>
              <span className="font-bold">{order.fullName}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-muted">Category:</span>
              <span className="font-bold">{order.category}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-muted">Race Date & Location:</span>
              <span className="font-bold text-right">Nov 12, 2026<br/>GBK, Jakarta</span>
            </div>
            <div className="p-4 border border-dashed border-accent text-center rounded text-accent bg-opacity-10" style={{ backgroundColor: 'rgba(212,175,55,0.05)' }}>
              Ambil race kit & BIB kamu di GBK mulai 10 Nov 2026
            </div>
            <div className="mt-4 text-center">
               <button className="btn btn-outline btn-block mb-2 text-sm" onClick={() => alert('Download prototype')}>Unduh E-Tiket</button>
            </div>
          </div>
          <button className="btn btn-primary btn-block" onClick={() => navigate('/profile')}>
            Lihat Profil Saya
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper" style={{ padding: '2rem 0', background: '#f8fafc', color: '#0f172a' }}>
      <div className="container" style={{ maxWidth: '500px' }}>
        <div className="card" style={{ background: 'white', border: '1px solid #e2e8f0', color: '#0f172a' }}>
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-blue-600">Mayar.id Mockup</h2>
            <p className="text-sm text-gray-500">Selesaikan pembayaran dalam {timeLeft}</p>
          </div>

          <div className="border-b pb-4 mb-4" style={{ borderColor: '#e2e8f0' }}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-500">Merchant</span>
              <span className="font-bold">Notarace 2026</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-500">Order ID</span>
              <span>{order.orderId}</span>
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="text-sm text-gray-500 mb-1">Total Pembayaran</div>
            <div className="text-3xl font-bold text-blue-600">Rp {order.amount.toLocaleString('id-ID')}</div>
          </div>

          <div className="space-y-3 mb-8">
            <div className="p-3 border rounded bg-gray-50 flex items-center gap-3 cursor-pointer hover:bg-gray-100" style={{ borderColor: '#e2e8f0' }}>
              <QrCode className="text-blue-600" /> <span className="font-medium">QRIS</span>
            </div>
            <div className="p-3 border rounded bg-gray-50 flex items-center gap-3 cursor-pointer hover:bg-gray-100" style={{ borderColor: '#e2e8f0' }}>
              <Building className="text-blue-600" /> <span className="font-medium">Virtual Account</span>
            </div>
          </div>

          <button 
            className="btn btn-block" 
            style={{ background: '#2563eb', color: 'white', borderRadius: '8px' }}
            onClick={handlePayment} 
            disabled={status === 'processing'}
          >
            {status === 'processing' ? 'Processing...' : 'Konfirmasi Pembayaran'}
          </button>
        </div>
      </div>
    </div>
  );
};
