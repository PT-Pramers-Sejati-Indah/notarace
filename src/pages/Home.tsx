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

  const [randomImages, setRandomImages] = useState<string[]>([]);

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const shuffled = [...data].sort(() => 0.5 - Math.random());
          setRandomImages(shuffled.slice(0, 4).map(item => item.high_image_url));
        }
      })
      .catch(err => console.error('Error loading data.json:', err));
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

          <h1 className="hero-title text-5xl md:text-8xl font-extrabold mb-8 text-white" style={{ color: 'white', textShadow: '0 4px 15px rgba(0,0,0,0.3)', letterSpacing: '4px' }}>
            NOTARACE
          </h1>

          <p className="hero-subtitle text-xl md:text-2xl mb-16 text-white font-medium" style={{ color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            The premium race experience. Trust the process, run the distance.
          </p>

          <div className="flex justify-center gap-6 md:gap-10 mb-16 flex-wrap">
            <div className="text-center" style={{ background: 'white', borderRadius: '24px', padding: '2rem 1.5rem', width: '140px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
              <div className="text-5xl font-extrabold mb-2" style={{ color: '#111827' }}>{String(timeLeft.d).padStart(3, '0')}</div>
              <div className="text-sm font-bold capitalize" style={{ color: '#374151', letterSpacing: '1px' }}>Days</div>
            </div>
            <div className="text-center" style={{ background: 'white', borderRadius: '24px', padding: '2rem 1.5rem', width: '140px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
              <div className="text-5xl font-extrabold mb-2" style={{ color: '#111827' }}>{timeLeft.h}</div>
              <div className="text-sm font-bold capitalize" style={{ color: '#374151', letterSpacing: '1px' }}>Hours</div>
            </div>
            <div className="text-center" style={{ background: 'white', borderRadius: '24px', padding: '2rem 1.5rem', width: '140px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
              <div className="text-5xl font-extrabold mb-2" style={{ color: '#111827' }}>{timeLeft.m}</div>
              <div className="text-sm font-bold capitalize" style={{ color: '#374151', letterSpacing: '1px' }}>Mins</div>
            </div>
            <div className="text-center" style={{ background: 'white', borderRadius: '24px', padding: '2rem 1.5rem', width: '140px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
              <div className="text-5xl font-extrabold mb-2" style={{ color: '#111827' }}>{timeLeft.s}</div>
              <div className="text-sm font-bold capitalize" style={{ color: '#374151', letterSpacing: '1px' }}>Secs</div>
            </div>
          </div>

          <a href="https://gotag.me" target="_blank" rel="noreferrer" className="btn flex items-center justify-center gap-2" style={{ background: 'white', color: '#991B1B', padding: '1rem 3rem', fontSize: '1.25rem', borderRadius: '9999px', fontWeight: 700, textDecoration: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <Camera size={24} /> Cari Foto
          </a>
        </div>
      </div>

      {/* Tickets Section */}
      <div className="container" style={{ padding: '4rem 1.5rem 8rem', flex: 1, maxWidth: '1100px' }}>
        
        <div className="flex flex-col gap-12 justify-center animate-fade-in mt-12">
          
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

      {/* Info Sections */}
      <div style={{ backgroundColor: 'white', padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
          
          {/* Section 1: Semuanya Bisa Ikut */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'row', 
            flexWrap: 'wrap', 
            alignItems: 'center', 
            gap: '4rem', 
            marginBottom: '8rem'
          }}>
            <div style={{ flex: '1 1 400px' }}>
              <div style={{ 
                width: '100%', 
                height: '400px', 
                borderRadius: '24px', 
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                position: 'relative',
                backgroundColor: '#f3f4f6'
              }}>
                {randomImages[0] && (
                  <img 
                    src={randomImages[0]} 
                    alt="Semuanya Bisa Ikut" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.3))' }}></div>
              </div>
            </div>
            <div style={{ flex: '1 1 400px' }}>
              <span style={{ color: '#E8492B', fontWeight: 800, letterSpacing: '2px', fontSize: '0.9rem', marginBottom: '1rem', display: 'block' }}>FOR EVERYONE</span>
              <h2 style={{ fontSize: '3.5rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '2rem', color: '#111827' }}>
                SEMUANYA BISA<br/><span style={{ color: '#E8492B' }}>IKUT!</span>
              </h2>
              <p style={{ fontSize: '1.25rem', color: '#4B5563', lineHeight: 1.6 }}>
                Dari notaris hingga masyarakat umum, dari pejalan santai hingga pelari kompetitif—acara ini terbuka untuk semua orang yang ingin bergerak lebih sehat dan lebih seru!
              </p>
            </div>
          </div>

          {/* Section 2: Mengenal Profesi Notaris */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'row-reverse', 
            flexWrap: 'wrap', 
            alignItems: 'center', 
            gap: '4rem', 
            marginBottom: '8rem'
          }}>
            <div style={{ flex: '1 1 400px' }}>
              <div style={{ 
                width: '100%', 
                height: '400px', 
                borderRadius: '24px', 
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                position: 'relative',
                backgroundColor: '#f3f4f6'
              }}>
                {randomImages[1] && (
                  <img 
                    src={randomImages[1]} 
                    alt="Mengenal Profesi Notaris" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.3))' }}></div>
              </div>
            </div>
            <div style={{ flex: '1 1 400px' }}>
              <span style={{ color: '#8B5CF6', fontWeight: 800, letterSpacing: '2px', fontSize: '0.9rem', marginBottom: '1rem', display: 'block' }}>INSIGHTFUL</span>
              <h2 style={{ fontSize: '3.5rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '2rem', color: '#111827' }}>
                MENGENAL PROFESI<br/><span style={{ color: '#8B5CF6' }}>NOTARIS</span>
              </h2>
              <p style={{ fontSize: '1.25rem', color: '#4B5563', lineHeight: 1.6 }}>
                Bukan sekedar lari, lewat acara ini kami mengajak masyarakat mengenal peran penting notaris dalam ragam aspek hukum lintas generasi.
              </p>
            </div>
          </div>

          {/* Section 3: Sport City & Good Vibes */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'row', 
            flexWrap: 'wrap', 
            alignItems: 'center', 
            gap: '4rem', 
            marginBottom: '4rem'
          }}>
            <div style={{ flex: '1 1 400px' }}>
              <div style={{ 
                width: '100%', 
                height: '400px', 
                borderRadius: '24px', 
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                position: 'relative',
                backgroundColor: '#f3f4f6'
              }}>
                {randomImages[2] && (
                  <img 
                    src={randomImages[2]} 
                    alt="Sport City & Good Vibes" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.3))' }}></div>
              </div>
            </div>
            <div style={{ flex: '1 1 400px' }}>
              <span style={{ color: '#10B981', fontWeight: 800, letterSpacing: '2px', fontSize: '0.9rem', marginBottom: '1rem', display: 'block' }}>BEKASI FUTURE</span>
              <h2 style={{ fontSize: '3.5rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '2rem', color: '#111827' }}>
                SPORT CITY<br/><span style={{ color: '#10B981' }}>& GOOD VIBES!</span>
              </h2>
              <p style={{ fontSize: '1.25rem', color: '#4B5563', lineHeight: 1.6 }}>
                Dengan semangat menjadikan Kota Bekasi sebagai The Future of Sports City, kami menghadirkan event olahraga yang dikemas dengan hiburan seru, termasuk live music di Race Village setelah lari!
              </p>
            </div>
          </div>

        </div>
      </div>


      {/* Location Section */}
      <div style={{ backgroundColor: '#F9FAFB', padding: '6rem 1.5rem' }}>
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="text-center mb-12">
            <span style={{ color: '#E8492B', fontWeight: 800, letterSpacing: '2px', fontSize: '0.9rem', marginBottom: '1rem', display: 'block' }}>VENUE</span>
            <h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#111827', marginBottom: '1.5rem' }}>LOKASI ACARA</h2>
            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto' }}>
              Summarecon Mall Bekasi — Titik kumpul energi dan semangat Notarace 2026.
            </p>
          </div>
          
          <div style={{ 
            width: '100%', 
            height: '500px', 
            borderRadius: '32px', 
            overflow: 'hidden', 
            boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
            backgroundColor: '#e5e7eb',
            position: 'relative'
          }}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2860575070627!2d107.00070489999999!3d-6.225963999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698c71cf814d97%3A0xd22a5d56809f070a!2sSummarecon%20Mall%20Bekasi!5e0!3m2!1sen!2sid!4v1777219738149!5m2!1sen!2sid" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Gmap Notarace Location"
            ></iframe>
          </div>
          
          <div style={{ marginTop: '3rem', textAlign: 'center' }}>
            <a 
              href="https://maps.app.goo.gl/zvWDm4oMiugKg3rb6" 
              target="_blank" 
              rel="noreferrer" 
              className="btn" 
              style={{ 
                display: 'inline-block',
                background: 'white', 
                color: '#E8492B', 
                border: '2px solid #E8492B', 
                padding: '1rem 2.5rem',
                borderRadius: '9999px',
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
            >
              BUKA DI GOOGLE MAPS
            </a>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div style={{ padding: '2rem 1.5rem 6rem' }}>
        <div className="container" style={{ 
          maxWidth: '1100px', 
          margin: '0 auto', 
          height: '600px', 
          borderRadius: '48px', 
          overflow: 'hidden', 
          position: 'relative',
          boxShadow: '0 30px 60px rgba(0,0,0,0.2)'
        }}>
          {/* Background Image */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: `url(${randomImages[3] || 'https://photos.gotag.me/uploads/medium_SH_5_3604_2ff9d979da.jpg'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0
          }}></div>
          
          {/* Dark Gradient Overlay */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
            zIndex: 1
          }}></div>

          <div style={{ 
            position: 'relative', 
            zIndex: 2, 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'flex-end', 
            padding: '4rem',
            textAlign: 'center',
            color: 'white'
          }}>
            <p style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '3rem', maxWidth: '800px', margin: '0 auto 4rem', lineHeight: 1.4 }}>
              Mau tanya soal race kit, rute lari, atau hal-hal seru lainnya? Tim kami siap bantu!
            </p>

            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '4px', color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>EMAIL</h3>
              <a href="mailto:info@notarace.id" style={{ fontSize: '2.5rem', fontWeight: 900, color: 'white', textDecoration: 'none' }}>info@notarace.id</a>
            </div>

            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '4px', color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>INSTAGRAM</h3>
              <a href="https://instagram.com/notarace.id" target="_blank" rel="noreferrer" style={{ fontSize: '2.5rem', fontWeight: 900, color: 'white', textDecoration: 'none' }}>@notarace.id</a>
            </div>
          </div>
        </div>
      </div>
      
      <footer style={{ background: '#F9FAFB', padding: '6rem 2rem', textAlign: 'center', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <h3 className="text-3xl font-black text-accent mb-4" style={{ letterSpacing: '2px' }}>NOTARACE 2026</h3>
        <p className="text-lg text-muted mb-8 font-medium">The premium race experience.</p>
        <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, #E8492B, transparent)', maxWidth: '600px', margin: '0 auto 3rem' }}></div>
        <div className="flex justify-center gap-8 mb-8 flex-wrap">
          <a href="#" style={{ color: '#4B5563', textDecoration: 'none', fontWeight: 600 }}>Home</a>
          <a href="#" style={{ color: '#4B5563', textDecoration: 'none', fontWeight: 600 }}>Registration</a>
          <a href="#" style={{ color: '#4B5563', textDecoration: 'none', fontWeight: 600 }}>Race Info</a>
          <a href="#" style={{ color: '#4B5563', textDecoration: 'none', fontWeight: 600 }}>Contact</a>
        </div>
        <p className="text-muted">© 2026 Notarace. All rights reserved.</p>
        <p className="text-sm text-muted mt-2">Contact: support@notarace.com | Instagram: @notarace</p>
      </footer>
    </div>
  );
};
