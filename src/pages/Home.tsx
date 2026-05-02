import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Activity, AlertCircle, Camera, Calendar, MapPin, ChevronRight, Clock, ExternalLink, Flag, Award, Footprints, Users, Image as ImageIcon } from 'lucide-react';

import {
  EVENT_META,
  INI_PORTAL_URL,
  NOTARIS_REGISTRATION_INFO,
  PRICING_NOTARIS_IDR,
  CATEGORY_DETAILS_ROWS,
  FAQ_PLACEHOLDERS,
  SPONSOR_TIER_PLACEHOLDERS,
  TIMELINE_EVENTS,
} from '../data/eventInfo';
import { featureFlags } from '../utils/featureFlags';

const formatIdr = (n: number) =>
  `Rp.${n.toLocaleString('id-ID')}`;

export const Home: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const targetDate = new Date(EVENT_META.raceStartISO).getTime();
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
    fetch('https://raw.githubusercontent.com/PT-Pramers-Sejati-Indah/notarace/refs/heads/main/public/data.json')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const shuffled = [...data].sort(() => 0.5 - Math.random());
          setRandomImages(shuffled.slice(0, 10).map(item => item.high_image_url));
        }
      })
      .catch(err => console.error('Error loading data.json:', err));
  }, []);

  const scrollToSection = (id: string) => () => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const ticketHref = EVENT_META.ticketRegistrationUrl.trim();
  const ticketLinkReady = /^https?:\/\//i.test(ticketHref);

  return (
    <div className="page-wrapper" style={{ padding: 0 }}>
      <a href="#main-content" className="skip-link">
        Lewati ke konten utama
      </a>

      <div className="lp-top-banner" role="status">
        {EVENT_META.topBanner}
      </div>

      <header id="informasi-event" className="lp-hero animate-fade-in" aria-labelledby="hero-heading">
        <div
          className="lp-hero__bg-img"
          style={{ backgroundImage: `url('https://photos.gotag.me/uploads/SH_5_0181_f9e23f7500.jpg')` }}
          aria-hidden
        />
        <div className="lp-hero__overlay" aria-hidden />

        <div className="lp-hero__inner">
          <div className="lp-hero__grid">
            <div className="lp-hero__copy">
              <p className="lp-eyebrow lp-eyebrow--on-dark">Informasi event</p>
              <h1 id="hero-heading" className="lp-hero__title">
                NOTARACE <span className="lp-hero__year">2026</span>
              </h1>
              <p className="lp-hero__lead">{EVENT_META.taglinePlaceholder}</p>
              <p className="lp-hero__meta">{EVENT_META.story} • {EVENT_META.edition}</p>
              <div className="lp-hero__actions">
                <button
                  type="button"
                  className="lp-btn lp-btn--primary"
                  onClick={scrollToSection('pendaftaran')}
                >
                  Daftar sekarang
                  <ChevronRight size={20} strokeWidth={2.5} aria-hidden />
                </button>
                <Link to="/photos" className="lp-btn lp-btn--ghost">
                  <Camera size={22} strokeWidth={2} aria-hidden />
                  Keseruan tahun 2025!
                </Link>
              </div>
            </div>

            <div className="lp-hero__aside">
              <div className="lp-glass-card">
                <div className="lp-glass-card__row">
                  <Calendar size={22} aria-hidden />
                  <div>
                    <strong style={{ display: 'block', color: '#fff', marginBottom: '0.2rem' }}>Tanggal & waktu</strong>
                    {EVENT_META.raceDateLabel}
                    <span style={{ opacity: 0.85 }}> • {EVENT_META.raceTimePlaceholder}</span>
                  </div>
                </div>
                <div className="lp-glass-card__row">
                  <MapPin size={22} aria-hidden />
                  <div>
                    <span className="lp-glass-card__accent">{EVENT_META.venueShort}</span>
                    <div style={{ marginTop: '0.35rem', fontSize: '0.88rem', opacity: 0.9 }}>
                      {EVENT_META.venueAddress}
                    </div>
                  </div>
                </div>
                <a
                  href={EVENT_META.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="lp-glass-card__maps"
                >
                  Buka di Google Maps
                </a>
              </div>

              <div className="lp-countdown" aria-live="polite" aria-label="Hitung mundur menuju race day">
                <div className="lp-countdown__cell">
                  <div className="lp-countdown__value">{String(timeLeft.d).padStart(3, '0')}</div>
                  <div className="lp-countdown__label">Hari</div>
                </div>
                <div className="lp-countdown__cell">
                  <div className="lp-countdown__value">{String(timeLeft.h).padStart(2, '0')}</div>
                  <div className="lp-countdown__label">Jam</div>
                </div>
                <div className="lp-countdown__cell">
                  <div className="lp-countdown__value">{String(timeLeft.m).padStart(2, '0')}</div>
                  <div className="lp-countdown__label">Menit</div>
                </div>
                <div className="lp-countdown__cell">
                  <div className="lp-countdown__value">{String(timeLeft.s).padStart(2, '0')}</div>
                  <div className="lp-countdown__label">Detik</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main id="main-content">

        {/* Story sections — langsung di bawah hero */}
        <div style={{ backgroundColor: 'white', padding: 'clamp(3rem, 8vw, 5rem) 0' }}>
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
                      loading="lazy"
                    />
                  )}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.3))' }}></div>
                </div>
              </div>
              <div style={{ flex: '1 1 400px' }}>
                <span style={{ color: '#E8492B', fontWeight: 800, letterSpacing: '2px', fontSize: '0.9rem', marginBottom: '1rem', display: 'block' }}>FOR EVERYONE</span>
                <h2 style={{ fontSize: '3.5rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '2rem', color: '#111827' }}>
                  SEMUANYA BISA<br /><span style={{ color: '#E8492B' }}>IKUT!</span>
                </h2>
                <p style={{ fontSize: '1.25rem', color: '#4B5563', lineHeight: 1.6 }}>
                  Dari notaris hingga masyarakat umum, dari pejalan santai hingga pelari kompetitif, acara ini terbuka untuk semua orang yang ingin bergerak lebih sehat dan lebih seru!
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
                      loading="lazy"
                    />
                  )}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.3))' }}></div>
                </div>
              </div>
              <div style={{ flex: '1 1 400px' }}>
                <span style={{ color: '#8B5CF6', fontWeight: 800, letterSpacing: '2px', fontSize: '0.9rem', marginBottom: '1rem', display: 'block' }}>INSIGHTFUL</span>
                <h2 style={{ fontSize: '3.5rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '2rem', color: '#111827' }}>
                  MENGENAL PROFESI<br /><span style={{ color: '#8B5CF6' }}>NOTARIS</span>
                </h2>
                <p style={{ fontSize: '1.25rem', color: '#4B5563', lineHeight: 1.6 }}>
                  Bukan sekedar lari, lewat acara ini kami mengajak masyarakat mengenal peran penting notaris dalam ragam aspek hukum lintas generasi.
                </p>
              </div>
            </div>

            {/* Section 3: Eastvara & Good Vibes */}
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '4rem',
              marginBottom: 0
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
                      alt="Eastvara BSD City: suasana race village"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                    />
                  )}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.3))' }}></div>
                </div>
              </div>
              <div style={{ flex: '1 1 400px' }}>
                <span style={{ color: '#10B981', fontWeight: 800, letterSpacing: '2px', fontSize: '0.9rem', marginBottom: '1rem', display: 'block' }}>BSD CITY</span>
                <h2 style={{ fontSize: '3.5rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '2rem', color: '#111827' }}>
                  EASTVARA<br /><span style={{ color: '#10B981' }}>& GOOD VIBES!</span>
                </h2>
                <p style={{ fontSize: '1.25rem', color: '#4B5563', lineHeight: 1.6 }}>
                  Race village di Eastvara, BSD City: suasana komunitas lari, musik, dan aktivitas keluarga setelah finis (detail rundown menyusul).
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Kategori, race pack, harga & pendaftaran (satu section) */}
        <section className="lp-section" aria-labelledby="pendaftaran-heading">
          <div className="container" style={{ flex: 1, maxWidth: '1100px' }}>
            <div id="pendaftaran" className="lp-section-head">
              <span className="lp-section-eyebrow">Kategori & pendaftaran Notaris</span>
              <h2 id="pendaftaran-heading" className="lp-section-title">
                Race pack, detail kategori & tiket
              </h2>
              <p className="lp-section-desc">
                Race pack, rute, cut-off, dan ketentuan usia per jarak tercantum pada kartu di bawah.
              </p>
            </div>

            <div className="animate-fade-in">
              <div className="lp-reg-card">
                <div className="lp-pricing">
                  <p className="lp-pricing__caption">
                    Harga tiket sama untuk 10K, 5K, 2,5K
                  </p>
                  <div className="lp-pricing__grid">
                    <div className="lp-price lp-price--featured">
                      <span className="lp-price__savings">
                        Hemat {formatIdr(PRICING_NOTARIS_IDR.normal - PRICING_NOTARIS_IDR.earlyBird)}
                      </span>
                      <div className="lp-price__tag">Early bird</div>
                      <div className="lp-price__amount">
                        {formatIdr(PRICING_NOTARIS_IDR.earlyBird)}
                        <span className="lp-price__amount-suffix">/tiket</span>
                      </div>
                    </div>
                    <div className="lp-price lp-price--normal">
                      <div className="lp-price__tag">Normal</div>
                      <div className="lp-price__amount">
                        {formatIdr(PRICING_NOTARIS_IDR.normal)}
                        <span className="lp-price__amount-suffix">/tiket</span>
                      </div>
                    </div>
                  </div>
                  <div className="lp-pricing__cta">
                    <a
                      href={ticketLinkReady ? ticketHref : '#'}
                      target={ticketLinkReady ? '_blank' : undefined}
                      rel={ticketLinkReady ? 'noopener noreferrer' : undefined}
                      onClick={(e) => {
                        if (!ticketLinkReady) e.preventDefault();
                      }}
                      aria-disabled={!ticketLinkReady}
                      className="lp-btn lp-btn--primary lp-reg-card__cta"
                    >
                      Daftar sekarang
                      <ChevronRight size={20} strokeWidth={2.5} aria-hidden />
                    </a>
                  </div>
                </div>

                <div className="lp-cats">
                  {CATEGORY_DETAILS_ROWS.map((row) => {
                    const cutoffPending = row.cutoff.trim().toLowerCase() === 'menyusul';
                    const isWalk = row.typeLabel === 'Fun Walk';
                    const TypeIcon = isWalk ? Footprints : Activity;
                    return (
                      <article
                        key={row.category}
                        className="lp-cat"
                        aria-label={`${row.typeLabel} ${row.jarak}`}
                      >
                        <div
                          className="lp-cat__accent"
                          style={{ background: `linear-gradient(160deg, ${row.gradient[0]}, ${row.gradient[1]})` }}
                        >
                          <div className="lp-cat__icon">
                            <TypeIcon size={22} strokeWidth={2.25} color="#fff" aria-hidden />
                          </div>
                          <div className="lp-cat__heading">
                            <span className="lp-cat__type">{row.typeLabel}</span>
                            <span className="lp-cat__distance">{row.jarak}</span>
                          </div>
                        </div>

                        <div className="lp-cat__body">
                          <span className="lp-cat__cutoff" data-pending={cutoffPending}>
                            <Clock size={12} strokeWidth={2.5} aria-hidden />
                            Cut-off: {row.cutoff}
                          </span>
                          <div className="lp-cat__divider" />
                          <div className="lp-cat__grid">
                            <div>
                              <div className="lp-cat__field-label lp-cat__field-label--racepack">
                                <Award strokeWidth={2.5} aria-hidden />
                                Race pack
                              </div>
                              <div className="lp-cat__chips">
                                {row.racePack.map((item) => (
                                  <span key={item} className="lp-cat__chip">{item}</span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <div className="lp-cat__field-label lp-cat__field-label--route">
                                <MapPin strokeWidth={2.5} aria-hidden />
                                Rute
                              </div>
                              <p className="lp-cat__field-text">{row.route}</p>
                            </div>
                            <div>
                              <div className="lp-cat__field-label lp-cat__field-label--age">
                                <Users strokeWidth={2.5} aria-hidden />
                                Ketentuan usia
                              </div>
                              <p className="lp-cat__field-text">{row.ageRule}</p>
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>

                <aside
                  className="lp-notice"
                  role="note"
                  aria-labelledby="ini-notice-heading"
                >
                  <div className="lp-notice__icon" aria-hidden>
                    <AlertCircle size={20} strokeWidth={2.25} />
                  </div>
                  <div className="lp-notice__body">
                    <h3 id="ini-notice-heading" className="lp-notice__title">
                      Khusus peserta Notaris, wajib akun INI aktif
                    </h3>
                    <p className="lp-notice__text">
                      {NOTARIS_REGISTRATION_INFO.registrationNote}
                    </p>
                    <a
                      href={INI_PORTAL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="lp-notice__link"
                    >
                      Buka portal Ikatan Notaris Indonesia
                      <ExternalLink size={14} strokeWidth={2.5} aria-hidden />
                    </a>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section id="timeline" className="timeline-section" aria-labelledby="timeline-heading">
          <div className="container">
            <div className="lp-section-head">
              <span className="lp-section-eyebrow">Alur perjalanan</span>
              <h2 id="timeline-heading" className="lp-section-title">
                Timeline Acara
              </h2>
              <p className="lp-section-desc">
                Pantau setiap tahapan penting dari persiapan hingga hari pembagian momen keseruanmu.
              </p>
            </div>

            <div className="timeline-container">
              <div className="timeline-line"></div>
              {TIMELINE_EVENTS.map((event, index) => {
                const Icon = [Clock, Clock, Flag, Award, ImageIcon][index % 5] || Clock;
                return (
                  <div key={index} className="timeline-item animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <div className="timeline-badge">
                        <Icon size={14} strokeWidth={3} />
                        {event.date}
                      </div>
                      <h3 className="timeline-title">{event.title}</h3>
                      <p className="timeline-description">{event.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Ringkasan informasi resmi */}
        <div style={{ background: '#F3F4F6', padding: '4rem 1.5rem', borderTop: '1px solid #e5e7eb' }}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>

            {/* <div id="ketentuan-pendaftaran" style={{ marginBottom: '3.5rem' }}>
              <span style={{ color: '#E8492B', fontWeight: 800, letterSpacing: '2px', fontSize: '0.9rem', display: 'block', marginBottom: '1rem' }}>PENDAFTARAN</span>
              <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#111827', marginBottom: '1rem' }}>Link, periode harga & kebijakan</h2>
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '14px', lineHeight: 1.6, color: '#374151' }}>
                <p style={{ margin: '0 0 0.75rem' }}>
                  <strong>Link tiket / pendaftaran:</strong>{' '}
                  <a
                    href={EVENT_META.ticketRegistrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#E8492B', fontWeight: 700, wordBreak: 'break-all' }}
                  >
                    {EVENT_META.ticketRegistrationUrl}
                  </a>
                </p>
                <p style={{ margin: '0 0 0.75rem' }}>
                  <strong>Harga Notaris (sama untuk 10K, 5K, Fun Walk 2,5K):</strong> early bird {formatIdr(PRICING_NOTARIS_IDR.earlyBird)}
                  {' '}• normal {formatIdr(PRICING_NOTARIS_IDR.normal)}
                </p>
                <p style={{ margin: '0 0 0.75rem' }}><strong>Batas pendaftaran:</strong> {EVENT_META.registrationDeadlinePlaceholder}</p>
                <p style={{ margin: 0 }}><strong>Refund & pembatalan:</strong> {EVENT_META.refundPolicyPlaceholder}</p>
              </div>
            </div> */}

            <div id="logistik" style={{ marginBottom: '3.5rem' }}>
              <span style={{ color: '#E8492B', fontWeight: 800, letterSpacing: '2px', fontSize: '0.9rem', display: 'block', marginBottom: '1rem' }}>LOGISTIK</span>
              <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#111827', marginBottom: '1rem' }}>Race pack, parkir & start</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                <div style={{ background: 'white', padding: '1.25rem', borderRadius: '14px' }}>
                  <h3 style={{ fontWeight: 800, marginBottom: '0.35rem' }}>Pengambilan race pack</h3>
                  <p style={{ color: '#4B5563', margin: 0 }}><strong>{EVENT_META.racePackPickupSummary}</strong>: {EVENT_META.racePackPickupDetail}</p>
                </div>
                <div style={{ background: 'white', padding: '1.25rem', borderRadius: '14px' }}>
                  <h3 style={{ fontWeight: 800, marginBottom: '0.35rem' }}>Parkir</h3>
                  <p style={{ color: '#4B5563', margin: 0 }}>{EVENT_META.parkingPlaceholder}</p>
                </div>
                <div style={{ background: 'white', padding: '1.25rem', borderRadius: '14px' }}>
                  <h3 style={{ fontWeight: 800, marginBottom: '0.35rem' }}>Titik kumpul & start</h3>
                  <p style={{ color: '#4B5563', margin: 0 }}>{EVENT_META.assemblyPlaceholder}</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Sponsors Section — toggle via VITE_FEATURE_SPONSORS */}
        {featureFlags.sponsors && (
          <div style={{ padding: '6rem 1.5rem', backgroundColor: 'white' }}>
            <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <div id="sponsor" className="text-center mb-16">
                <span style={{ color: '#E8492B', fontWeight: 800, letterSpacing: '2px', fontSize: '0.9rem', marginBottom: '1rem', display: 'block' }}>PARTNERSHIP</span>
                <h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#111827', marginBottom: '1.5rem' }}>SPONSOR & MITRA</h2>
                <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto' }}>
                  Logo sponsor dan nama tier akan ditampilkan di sini setelah finalisasi partnership.
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1.5rem',
              }}>
                {SPONSOR_TIER_PLACEHOLDERS.map((s) => (
                  <div
                    key={s.tier}
                    style={{
                      background: '#F9FAFB',
                      padding: '2rem 1.5rem',
                      borderRadius: '24px',
                      textAlign: 'center',
                      border: '2px dashed #E5E7EB',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
                    }}
                  >
                    <p style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '2px', color: '#E8492B', marginBottom: '0.75rem' }}>{s.tier}</p>
                    <div style={{ width: '120px', height: '120px', margin: '0 auto 1rem', borderRadius: '16px', background: '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF', fontWeight: 700, fontSize: '0.75rem' }}>
                      LOGO
                    </div>
                    <p style={{ color: '#6B7280', margin: 0, fontSize: '1rem' }}>{s.note}</p>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
                <p style={{ color: '#6B7280', marginBottom: '0.75rem' }}>Organisasi profesi</p>
                <a href="https://www.ikatannotarisindonesia.id/beranda" target="_blank" rel="noreferrer" style={{ fontWeight: 800, color: '#111827' }}>
                  Ikatan Notaris Indonesia (INI)
                </a>
              </div>
            </div>
          </div>
        )}


        {/* Location Section */}
        <div style={{ backgroundColor: '#F9FAFB', padding: '6rem 1.5rem' }}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div className="text-center mb-12">
              <span style={{ color: '#E8492B', fontWeight: 800, letterSpacing: '2px', fontSize: '0.9rem', marginBottom: '1rem', display: 'block' }}>VENUE</span>
              <h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#111827', marginBottom: '1.5rem' }}>LOKASI ACARA</h2>
              <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '720px', margin: '0 auto' }}>
                {EVENT_META.venueShort}: {EVENT_META.venueAddress}
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
                src={EVENT_META.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta lokasi NOTARACE 2026, Eastvara BSD"
              ></iframe>
            </div>

            <div style={{ marginTop: '3rem', textAlign: 'center' }}>
              <a
                href={EVENT_META.googleMapsUrl}
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

        {/* FAQ Section */}
        <div id="faq" style={{ background: '#F3F4F6', padding: '4rem 1.5rem' }}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <span style={{ color: '#E8492B', fontWeight: 800, letterSpacing: '2px', fontSize: '0.9rem', display: 'block', marginBottom: '1rem' }}>FAQ</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#111827', marginBottom: '1.25rem' }}>Pertanyaan umum</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {FAQ_PLACEHOLDERS.map((item) => (
                <details key={item.q} style={{ background: 'white', borderRadius: '12px', padding: '1rem 1.25rem', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                  <summary style={{ fontWeight: 800, cursor: 'pointer', color: '#111827' }}>{item.q}</summary>
                  <p style={{ margin: '0.75rem 0 0', color: '#4B5563', lineHeight: 1.55 }}>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div id="kontak" style={{ padding: '2rem 1.5rem 6rem' }}>
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

              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '4px', color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>INSTAGRAM</h3>
                <a href={EVENT_META.instagramUrl} target="_blank" rel="noreferrer" style={{ fontSize: '2.25rem', fontWeight: 900, color: 'white', textDecoration: 'none' }}>{EVENT_META.instagramHandle}</a>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '4px', color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>TIKTOK</h3>
                <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'rgba(255,255,255,0.95)', margin: 0 }}>{EVENT_META.tiktokPlaceholder}</p>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '4px', color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>WHATSAPP</h3>
                <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'rgba(255,255,255,0.95)', margin: 0 }}>{EVENT_META.whatsappPlaceholder}</p>
              </div>

              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '4px', color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>EMAIL</h3>
                <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'rgba(255,255,255,0.95)', margin: 0 }}>{EVENT_META.emailPlaceholder}</p>
              </div>
            </div>
          </div>
        </div>

      </main>

      <footer style={{ background: '#F9FAFB', padding: '6rem 2rem', textAlign: 'center', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <h3 className="text-3xl font-black text-accent mb-4" style={{ letterSpacing: '2px' }}>{EVENT_META.name}</h3>
        <p className="text-lg text-muted mb-8 font-medium">{EVENT_META.footerTagline}</p>
        <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, #E8492B, transparent)', maxWidth: '600px', margin: '0 auto 3rem' }}></div>
        <div className="flex justify-center gap-8 mb-8 flex-wrap">
          <Link to="/" style={{ color: '#4B5563', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
          <button type="button" onClick={scrollToSection('pendaftaran')} style={{ background: 'none', border: 'none', color: '#4B5563', fontWeight: 600, cursor: 'pointer', fontSize: 'inherit', fontFamily: 'inherit' }}>Pendaftaran</button>
          <button type="button" onClick={scrollToSection('pendaftaran')} style={{ background: 'none', border: 'none', color: '#4B5563', fontWeight: 600, cursor: 'pointer', fontSize: 'inherit', fontFamily: 'inherit' }}>Detail lomba</button>
          <button type="button" onClick={scrollToSection('faq')} style={{ background: 'none', border: 'none', color: '#4B5563', fontWeight: 600, cursor: 'pointer', fontSize: 'inherit', fontFamily: 'inherit' }}>FAQ</button>
          <button type="button" onClick={scrollToSection('kontak')} style={{ background: 'none', border: 'none', color: '#4B5563', fontWeight: 600, cursor: 'pointer', fontSize: 'inherit', fontFamily: 'inherit' }}>Kontak</button>
        </div>
        <p className="text-muted">© 2026 Notarace. All rights reserved.</p>
        <p className="text-sm text-muted mt-2">Instagram: {EVENT_META.instagramHandle} • {EVENT_META.emailPlaceholder}</p>
      </footer>
    </div>
  );
};
