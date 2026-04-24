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
      {/* Hero Section with Background Image */}
      <div 
        style={{
          position: 'relative',
          padding: '8rem 1.5rem',
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundImage: `url(${heroRunnersImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dark Gradient Overlay */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(to bottom, rgba(2, 6, 23, 0.4) 0%, rgba(2, 6, 23, 0.9) 100%)',
          zIndex: 1
        }}></div>

        <div className="text-center animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'rgba(212, 175, 55, 0.2)', color: 'var(--color-accent)', borderRadius: 'var(--radius-full)', fontWeight: 600, marginBottom: '2rem', backdropFilter: 'blur(5px)' }}>
            Official Running Event
          </div>
          
          <h1 className="hero-title text-5xl font-extrabold mb-8" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
            Notarace 2026
          </h1>
          
          <p className="hero-subtitle text-2xl text-muted mb-12" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)', color: '#e2e8f0' }}>
            The premium race experience. Trust the process, run the distance.
          </p>

          <div className="flex justify-center gap-4 md:gap-8 mb-16 flex-wrap">
            <div className="card text-center" style={{ minWidth: '110px', padding: '1.5rem', background: 'rgba(15,23,42,0.8)' }}>
              <div className="text-4xl font-bold text-accent mb-1">{timeLeft.d}</div>
              <div className="text-sm text-muted font-bold tracking-widest uppercase">Days</div>
            </div>
            <div className="card text-center" style={{ minWidth: '110px', padding: '1.5rem', background: 'rgba(15,23,42,0.8)' }}>
              <div className="text-4xl font-bold text-accent mb-1">{timeLeft.h}</div>
              <div className="text-sm text-muted font-bold tracking-widest uppercase">Hours</div>
            </div>
            <div className="card text-center" style={{ minWidth: '110px', padding: '1.5rem', background: 'rgba(15,23,42,0.8)' }}>
              <div className="text-4xl font-bold text-accent mb-1">{timeLeft.m}</div>
              <div className="text-sm text-muted font-bold tracking-widest uppercase">Mins</div>
            </div>
            <div className="card text-center" style={{ minWidth: '110px', padding: '1.5rem', background: 'rgba(15,23,42,0.8)' }}>
              <div className="text-4xl font-bold text-accent mb-1">{timeLeft.s}</div>
              <div className="text-sm text-muted font-bold tracking-widest uppercase">Secs</div>
            </div>
          </div>

          <div className="flex justify-center">
            <a href="https://gotag.me" target="_blank" rel="noreferrer" className="btn btn-outline" style={{ padding: '1.25rem 2.5rem', fontSize: '1.2rem', backdropFilter: 'blur(5px)', background: 'rgba(15,23,42,0.5)' }}>
              <Camera /> Cari Foto
            </a>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '4rem 1.5rem', flex: 1 }}>
        <h2 className="text-5xl font-bold text-center mb-16 text-accent">Race Categories</h2>
        
        <div className="flex gap-8 justify-center animate-fade-in flex-wrap">
          {/* 2.5K */}
          <div className="card flex-col justify-between" style={{ flex: '1 1 320px', maxWidth: '380px' }}>
            <div>
              <h3 className="text-3xl font-bold mb-3">2.5K Fun Walk</h3>
              <p className="text-muted mb-6 text-lg">Start: 06:30 WIB <br/> Kuota: 1000</p>
              <div className="text-4xl font-extrabold text-accent mb-8">Rp 150.000</div>
              <ul className="text-muted mb-8 text-lg" style={{ listStylePosition: 'inside', lineHeight: '2' }}>
                <li>Jersey Premium</li>
                <li>Medali Finisher</li>
                <li>Refreshment</li>
              </ul>
            </div>
            {featureFlags.purchase && (
              <button className="btn btn-primary btn-block" style={{ padding: '1rem', fontSize: '1.1rem' }} onClick={() => handleBuyTicket('2.5K')}>
                Beli Tiket
              </button>
            )}
          </div>

          {/* 5K */}
          <div className="card card-featured flex-col justify-between" style={{ flex: '1 1 320px', maxWidth: '380px', transform: 'scale(1.05)', borderColor: 'var(--color-accent)', boxShadow: '0 0 30px rgba(212, 175, 55, 0.15)', zIndex: 10 }}>
            <div>
              <div className="badge badge-warning mb-4 px-3 py-1 text-sm">Most Popular</div>
              <h3 className="text-3xl font-bold mb-3">5K Road Run</h3>
              <p className="text-muted mb-6 text-lg">Start: 06:00 WIB <br/> Kuota: 2000</p>
              <div className="text-4xl font-extrabold text-accent mb-8">Rp 250.000</div>
              <ul className="text-muted mb-8 text-lg" style={{ listStylePosition: 'inside', lineHeight: '2' }}>
                <li>Jersey Premium</li>
                <li>Medali Finisher</li>
                <li>BIB + Timing Chip</li>
                <li>Refreshment</li>
              </ul>
            </div>
            {featureFlags.purchase && (
              <button className="btn btn-primary btn-block" style={{ padding: '1rem', fontSize: '1.1rem' }} onClick={() => handleBuyTicket('5K')}>
                Beli Tiket
              </button>
            )}
          </div>

          {/* 10K */}
          <div className="card flex-col justify-between" style={{ flex: '1 1 320px', maxWidth: '380px', padding: '3rem 2rem' }}>
            <div>
              <h3 className="text-3xl font-bold mb-3">10K Road Run</h3>
              <p className="text-muted mb-6 text-lg">Start: 05:30 WIB <br/> Kuota: <span className="text-red-400 font-bold">Sisa 50!</span></p>
              <div className="text-4xl font-extrabold text-accent mb-8">Rp 350.000</div>
              <ul className="text-muted mb-8 text-lg" style={{ listStylePosition: 'inside', lineHeight: '2' }}>
                <li>Jersey Premium</li>
                <li>Medali Finisher</li>
                <li>BIB + Timing Chip</li>
                <li>Refreshment</li>
              </ul>
            </div>
            {featureFlags.purchase && (
              <button className="btn btn-primary btn-block" style={{ padding: '1rem', fontSize: '1.1rem' }} onClick={() => handleBuyTicket('10K')}>
                Beli Tiket
              </button>
            )}
          </div>
        </div>
      </div>
      
      <footer style={{ background: 'rgba(15,23,42,1)', padding: '4rem 2rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <h3 className="text-2xl font-bold text-accent mb-4">Notarace 2026</h3>
        <p className="text-muted mb-8">The premium race experience.</p>
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', maxWidth: '400px', margin: '0 auto 2rem' }}></div>
        <p className="text-muted">© 2026 Notarace. All rights reserved.</p>
        <p className="text-sm text-muted mt-2">Contact: support@notarace.com | Instagram: @notarace</p>
      </footer>
    </div>
  );
};
