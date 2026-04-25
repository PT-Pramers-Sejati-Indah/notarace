import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera } from 'lucide-react';
import { featureFlags } from '../utils/featureFlags';
import heroRunnersImg from '../assets/hero-runners.png';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-11-12T05:00:00').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) {
        clearInterval(interval);
      } else {
        setTimeLeft({
          d: Math.floor(distance / (1000 * 60 * 60 * 24)),
          h: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          m: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          s: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleBuyTicket = (category: string) => {
    if (!featureFlags.purchase) return;
    const user = localStorage.getItem('user');
    if (!user) {
      localStorage.setItem('redirectAfterLogin', `/buy/${category}`);
      navigate('/auth');
    } else {
      navigate(`/buy/${category}`);
    }
  };

  return (
    <div className="page-wrapper" style={{ padding: 0 }}>
      {/* Top Banner */}
      <div style={{
        background: 'linear-gradient(90deg, #E8492B, #9C27B0, #38bdf8)',
        padding: '0.5rem',
        textAlign: 'center',
        color: 'white',
        fontWeight: 800,
        letterSpacing: '2px',
        zIndex: 10,
        fontSize: '0.9rem'
      }}>
        13 JULI 2025 • KOTA SUMMARECON BEKASI
      </div>

      {/* Hero Section */}
      <div 
        style={{
          position: 'relative',
          padding: '6rem 1.5rem',
          minHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden'
        }}
      >
        {/* Full Color Background Image */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `url(${heroRunnersImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0
        }}></div>
        
        {/* Vibrant Red to Orange Gradient Overlay */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.85) 0%, rgba(245, 158, 11, 0.85) 100%)',
          zIndex: 1
        }}></div>

        <div className="text-center animate-fade-in flex flex-col items-center" style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          
          <div style={{ display: 'inline-block', padding: '0.5rem 1.5rem', border: '2px solid white', color: 'white', borderRadius: 'var(--radius-full)', fontWeight: 700, marginBottom: '2rem', backdropFilter: 'blur(5px)', letterSpacing: '1px' }}>
            OFFICIAL RUNNING EVENT 2026
          </div>

          <h1 className="hero-title text-5xl md:text-8xl font-extrabold mb-4 text-white" style={{ textShadow: '0 4px 15px rgba(0,0,0,0.3)', letterSpacing: '2px' }}>
            NOTARACE
          </h1>

          <p className="hero-subtitle text-xl md:text-2xl mb-12 text-white font-medium" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            The premium race experience. Trust the process, run the distance.
          </p>

          <div className="flex justify-center gap-4 md:gap-6 mb-12 flex-wrap">
            <div className="text-center" style={{ background: 'white', borderRadius: '16px', padding: '1.5rem 1rem', width: '120px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
              <div className="text-5xl font-extrabold mb-2" style={{ color: '#111827' }}>{String(timeLeft.d).padStart(3, '0')}</div>
              <div className="text-sm font-bold capitalize" style={{ color: '#374151' }}>Days</div>
            </div>
            <div className="text-center" style={{ background: 'white', borderRadius: '16px', padding: '1.5rem 1rem', width: '120px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
              <div className="text-5xl font-extrabold mb-2" style={{ color: '#111827' }}>{timeLeft.h}</div>
              <div className="text-sm font-bold capitalize" style={{ color: '#374151' }}>Hours</div>
            </div>
            <div className="text-center" style={{ background: 'white', borderRadius: '16px', padding: '1.5rem 1rem', width: '120px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
              <div className="text-5xl font-extrabold mb-2" style={{ color: '#111827' }}>{timeLeft.m}</div>
              <div className="text-sm font-bold capitalize" style={{ color: '#374151' }}>Mins</div>
            </div>
            <div className="text-center" style={{ background: 'white', borderRadius: '16px', padding: '1.5rem 1rem', width: '120px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
              <div className="text-5xl font-extrabold mb-2" style={{ color: '#111827' }}>{timeLeft.s}</div>
              <div className="text-sm font-bold capitalize" style={{ color: '#374151' }}>Secs</div>
            </div>
          </div>

          <a href="https://gotag.me" target="_blank" rel="noreferrer" className="btn flex items-center justify-center gap-2" style={{ background: 'white', color: '#991B1B', padding: '1rem 3rem', fontSize: '1.25rem', borderRadius: '9999px', fontWeight: 700, textDecoration: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <Camera size={24} /> Cari Foto
          </a>
        </div>
      </div>

      {/* Tickets Section */}
      <div className="container" style={{ padding: '2rem 1.5rem 6rem', flex: 1, maxWidth: '1000px' }}>
        
        <div className="flex flex-col gap-8 justify-center animate-fade-in mt-8">
          
          {/* 2.5K Ticket */}
          <div style={{ display: 'flex', width: '100%', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', flexWrap: 'wrap', backgroundColor: 'white' }}>
            <div style={{ flex: '1 1 250px', background: 'linear-gradient(135deg, #A855F7, #EC4899)', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <div style={{ position: 'absolute', left: '10px', top: '10px', bottom: '10px', width: '30px', writingMode: 'vertical-rl', transform: 'rotate(180deg)', color: 'rgba(255,255,255,0.3)', fontSize: '2rem', fontWeight: 800, letterSpacing: '4px', textAlign: 'center' }}>
                NOTARACE
              </div>
              <h3 className="text-5xl md:text-6xl font-extrabold text-white text-center ml-8" style={{ textShadow: '3px 3px 0 #E8492B, 6px 6px 0 rgba(0,0,0,0.1)' }}>
                2.5K<br/>WALK
              </h3>
            </div>
            <div style={{ flex: '1 1 200px', background: '#FFF5F1', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div className="mb-4">
                <p className="text-sm font-bold text-accent">Early Bird</p>
                <p className="text-xl font-extrabold text-accent">Rp.195.000/ticket</p>
              </div>
              <div className="mb-4">
                <p className="text-sm font-bold text-accent">Regular</p>
                <p className="text-xl font-extrabold text-accent">Rp.229.000/ticket</p>
              </div>
              <div>
                <p className="text-sm font-bold text-accent">Termasuk Race Pack:</p>
                <p className="text-sm font-bold text-accent">Jersey, medal, sport goodies</p>
              </div>
            </div>
            <div style={{ flex: '1 1 250px', borderLeft: '4px solid #F5A623', borderTop: '4px solid #F5A623', borderBottom: '4px solid #F5A623', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
              <p className="text-sm font-bold text-accent mb-2">Start from</p>
              <p className="text-3xl font-extrabold text-accent mb-6">Rp.195.000<span className="text-lg">/ticket</span></p>
              {featureFlags.purchase && (
                <button onClick={() => handleBuyTicket('2.5K')} className="btn" style={{ background: 'white', color: '#E8492B', border: '2px solid #E8492B', padding: '0.75rem 1.5rem' }}>
                  DAFTAR KLIK DI SINI
                </button>
              )}
            </div>
          </div>

          {/* 5K Ticket */}
          <div style={{ display: 'flex', width: '100%', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', flexWrap: 'wrap', backgroundColor: 'white' }}>
            <div style={{ flex: '1 1 250px', background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <div style={{ position: 'absolute', left: '10px', top: '10px', bottom: '10px', width: '30px', writingMode: 'vertical-rl', transform: 'rotate(180deg)', color: 'rgba(255,255,255,0.3)', fontSize: '2rem', fontWeight: 800, letterSpacing: '4px', textAlign: 'center' }}>
                NOTARACE
              </div>
              <h3 className="text-5xl md:text-6xl font-extrabold text-white text-center ml-8" style={{ textShadow: '3px 3px 0 #1E3A8A, 6px 6px 0 rgba(0,0,0,0.1)' }}>
                5K<br/>RUN
              </h3>
            </div>
            <div style={{ flex: '1 1 200px', background: '#EFF6FF', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div className="mb-4">
                <p className="text-sm font-bold text-blue-600">Early Bird</p>
                <p className="text-xl font-extrabold text-blue-600">Rp.238.000/ticket</p>
              </div>
              <div className="mb-4">
                <p className="text-sm font-bold text-blue-600">Regular</p>
                <p className="text-xl font-extrabold text-blue-600">Rp.279.000/ticket</p>
              </div>
              <div>
                <p className="text-sm font-bold text-blue-600">Termasuk Race Pack:</p>
                <p className="text-sm font-bold text-blue-600">Jersey, medal, BIB, timing chip</p>
              </div>
            </div>
            <div style={{ flex: '1 1 250px', borderLeft: '4px solid #3B82F6', borderTop: '4px solid #3B82F6', borderBottom: '4px solid #3B82F6', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
              <p className="text-sm font-bold text-blue-600 mb-2">Start from</p>
              <p className="text-3xl font-extrabold text-blue-600 mb-6">Rp.238.000<span className="text-lg">/ticket</span></p>
              {featureFlags.purchase && (
                <button onClick={() => handleBuyTicket('5K')} className="btn" style={{ background: 'white', color: '#3B82F6', border: '2px solid #3B82F6', padding: '0.75rem 1.5rem' }}>
                  DAFTAR KLIK DI SINI
                </button>
              )}
            </div>
          </div>

          {/* 10K Ticket */}
          <div style={{ display: 'flex', width: '100%', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', flexWrap: 'wrap', backgroundColor: 'white' }}>
            <div style={{ flex: '1 1 250px', background: 'linear-gradient(135deg, #10B981, #059669)', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <div style={{ position: 'absolute', left: '10px', top: '10px', bottom: '10px', width: '30px', writingMode: 'vertical-rl', transform: 'rotate(180deg)', color: 'rgba(255,255,255,0.3)', fontSize: '2rem', fontWeight: 800, letterSpacing: '4px', textAlign: 'center' }}>
                NOTARACE
              </div>
              <h3 className="text-5xl md:text-6xl font-extrabold text-white text-center ml-8" style={{ textShadow: '3px 3px 0 #064E3B, 6px 6px 0 rgba(0,0,0,0.1)' }}>
                10K<br/>RUN
              </h3>
            </div>
            <div style={{ flex: '1 1 200px', background: '#ECFDF5', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div className="mb-4">
                <p className="text-sm font-bold text-emerald-600">Early Bird</p>
                <p className="text-xl font-extrabold text-emerald-600">Rp.350.000/ticket</p>
              </div>
              <div className="mb-4">
                <p className="text-sm font-bold text-emerald-600">Regular</p>
                <p className="text-xl font-extrabold text-emerald-600">Rp.399.000/ticket</p>
              </div>
              <div>
                <p className="text-sm font-bold text-emerald-600">Termasuk Race Pack:</p>
                <p className="text-sm font-bold text-emerald-600">Jersey, medal, BIB, timing chip</p>
              </div>
            </div>
            <div style={{ flex: '1 1 250px', borderLeft: '4px solid #10B981', borderTop: '4px solid #10B981', borderBottom: '4px solid #10B981', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
              <p className="text-sm font-bold text-emerald-600 mb-2">Start from</p>
              <p className="text-3xl font-extrabold text-emerald-600 mb-6">Rp.350.000<span className="text-lg">/ticket</span></p>
              {featureFlags.purchase && (
                <button onClick={() => handleBuyTicket('10K')} className="btn" style={{ background: 'white', color: '#10B981', border: '2px solid #10B981', padding: '0.75rem 1.5rem' }}>
                  DAFTAR KLIK DI SINI
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
      
      <footer style={{ background: '#F9FAFB', padding: '4rem 2rem', textAlign: 'center', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <h3 className="text-2xl font-bold text-accent mb-4">Notarace 2026</h3>
        <p className="text-muted mb-8">The premium race experience.</p>
        <div style={{ height: '1px', background: 'rgba(0,0,0,0.1)', maxWidth: '400px', margin: '0 auto 2rem' }}></div>
        <p className="text-muted">© 2026 Notarace. All rights reserved.</p>
        <p className="text-sm text-muted mt-2">Contact: support@notarace.com | Instagram: @notarace</p>
      </footer>
    </div>
  );
};
