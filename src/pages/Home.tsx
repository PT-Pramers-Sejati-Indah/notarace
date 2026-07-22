import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Activity, AlertCircle, Camera, Calendar, MapPin, ChevronRight, Clock, ExternalLink, FileDown, FileSignature, Flag, Award, Footprints, Users, Image as ImageIcon, Tag, X } from 'lucide-react';

import {
  EVENT_META,
  INI_PORTAL_URL,
  NOTARIS_ALB_CATEGORY_LABEL,
  NOTARIS_REGISTRATION_INFO,
  CATEGORY_DETAILS_ROWS,
  FAQ_PLACEHOLDERS,
  SPONSOR_TIER_PLACEHOLDERS,
  TIMELINE_EVENTS,
} from '../data/eventInfo';
import { featureFlags } from '../utils/featureFlags';

const formatIdr = (n: number) =>
  `Rp.${n.toLocaleString('id-ID')}`;

type RouteModalState = {
  src: string;
  title: string;
  imageAlt: string;
};

function routeModalCaption(category: string): string {
  if (category === '10K Run') return 'Rute 10K';
  if (category === '5K Run') return 'Rute 5K';
  return 'Rute 2,5K';
}

const contactLabelStyle: React.CSSProperties = {
  fontSize: 'clamp(0.78rem, 2.6vw, 1rem)',
  fontWeight: 800,
  letterSpacing: '0.25em',
  color: 'rgba(255,255,255,0.85)',
  marginBottom: '0.5rem',
  textShadow: '0 1px 6px rgba(0,0,0,0.55)',
};

const contactValueStyle: React.CSSProperties = {
  fontSize: 'clamp(1rem, 3.5vw, 1.25rem)',
  fontWeight: 700,
  color: 'rgba(255,255,255,0.98)',
  margin: 0,
  overflowWrap: 'anywhere',
  textShadow: '0 2px 10px rgba(0,0,0,0.55)',
};

export const Home: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [routeModal, setRouteModal] = useState<RouteModalState | null>(null);

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
    if (!routeModal) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setRouteModal(null);
    };
    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [routeModal]);

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

  const ticketNotarisHref = EVENT_META.ticketRegistrationNotarisUrl.trim();
  const ticketPublicHref = EVENT_META.ticketRegistrationPublicUrl.trim();
  const ticketNotarisReady = /^https?:\/\//i.test(ticketNotarisHref);
  const ticketPublicReady = /^https?:\/\//i.test(ticketPublicHref);

  return (
    <div className="page-wrapper" style={{ padding: 0 }}>
      <a href="#main-content" className="skip-link">
        Lewati ke konten utama
      </a>

      <div className="lp-top-banner" role="status">
        {EVENT_META.topBanner}
      </div>

      <header id="informasi-event" className="lp-hero animate-fade-in" aria-labelledby="hero-heading">
        <picture className="lp-hero__bg-img" aria-hidden="true">
          <source
            type="image/webp"
            srcSet="/hero/notarace-start-640.webp 640w, /hero/notarace-start-1024.webp 1024w"
            sizes="100vw"
          />
          <img
            src="/hero/notarace-start-1024.jpg"
            srcSet="/hero/notarace-start-640.jpg 640w, /hero/notarace-start-1024.jpg 1024w"
            sizes="100vw"
            alt=""
            width={1024}
            height={681}
            fetchPriority="high"
            decoding="async"
            loading="eager"
          />
        </picture>
        <div className="lp-hero__overlay" aria-hidden />

        <div className="lp-hero__inner">
          <div className="lp-hero__grid">
            <div className="lp-hero__copy">
              <h1 id="hero-heading" className="lp-hero__title">
                <img
                  src="/notarace-logo.svg"
                  alt="NOTARACE"
                  className="lp-hero__logo"
                  loading="eager"
                  decoding="async"
                />
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
              <div className="lp-glass-card lp-glass-card--plain">
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
                  <div className="lp-countdown__value">{timeLeft.d}</div>
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

        {/* Story sections - langsung di bawah hero */}
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
                  Notarace hadir sebagai wadah bagi anggota INI dan masyarakat umum untuk meraih hidup yang sehat, didukung fasilitas yang memadai dan berkualitas, dari pejalan santai hingga pelari kompetitif.
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
                  Lebih dari sekadar lari, Notarace menjadi <em>Notary Generation Social Hub</em>: ruang berbagi inspirasi dan informasi antar anggota INI untuk terus bergerak aktif dan menjaga kesehatan bersama.
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
                      alt="EASTVARA BSD: suasana race village"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                    />
                  )}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.3))' }}></div>
                </div>
              </div>
              <div style={{ flex: '1 1 400px' }}>
                <span style={{ color: '#10B981', fontWeight: 800, letterSpacing: '2px', fontSize: '0.9rem', marginBottom: '1rem', display: 'block' }}>EASTVARA BSD</span>
                <h2 style={{ fontSize: '3.5rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '2rem', color: '#111827' }}>
                  EASTVARA<br /><span style={{ color: '#10B981' }}>& GOOD VIBES!</span>
                </h2>
                <p style={{ fontSize: '1.25rem', color: '#4B5563', lineHeight: 1.6 }}>
                  Race village di EASTVARA BSD: 10K, 5K, dan Fun Walk 2,5K untuk Umum (Public), dengan tier{' '}
                  {NOTARIS_ALB_CATEGORY_LABEL} pada ketiga jarak, plus INI Cheering, Concert, Talkshow, Workout, Fun Games &amp; Challenge, hingga Bazzar. Satu hari penuh keseruan untuk Notarunners dan keluarga.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Ikatan Notaris Indonesia: konteks peserta Notaris */}
        <section
          id="tentang-ini"
          className="lp-section lp-ini-section"
          aria-labelledby="ini-section-heading"
        >
          <div className="container lp-ini-section__inner">
            <header className="lp-section-head">
              <span className="lp-section-eyebrow">
                {NOTARIS_REGISTRATION_INFO.panelSubtitle}
              </span>
              <h2 id="ini-section-heading" className="lp-section-title">
                {NOTARIS_REGISTRATION_INFO.panelTitle}
              </h2>
              <p className="lp-section-desc">
                Informasi singkat tentang INI, tautan portal resmi, dan ketentuan
                poin untuk peserta {NOTARIS_ALB_CATEGORY_LABEL} di NOTARACE.
              </p>
            </header>

            <article className="lp-ini-card">
              <figure className="lp-ini-card__media">
                <img
                  src="/ini-logo.svg"
                  alt="Lambang Ikatan Notaris Indonesia"
                  loading="lazy"
                  decoding="async"
                />
              </figure>

              <div className="lp-ini-card__content">
                <p className="lp-ini-lead">
                  {NOTARIS_REGISTRATION_INFO.intro}
                </p>
                <p className="lp-ini-text">
                  {NOTARIS_REGISTRATION_INFO.registrationNote}
                </p>

                <div
                  className="lp-ini-reward"
                  role="note"
                  aria-label={`Reward poin untuk ${NOTARIS_ALB_CATEGORY_LABEL}`}
                >
                  <span className="lp-ini-reward__badge">
                    <Award size={16} strokeWidth={2.5} aria-hidden />
                    6 poin
                  </span>
                  <span className="lp-ini-reward__text">
                    untuk {NOTARIS_ALB_CATEGORY_LABEL} yang menyelesaikan NOTARACE, sesuai ketentuan
                    &amp; mekanisme di portal INI.
                  </span>
                </div>

                <a
                  href={INI_PORTAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline lp-ini-cta"
                >
                  {NOTARIS_REGISTRATION_INFO.ctaLabel}
                  <ExternalLink size={16} strokeWidth={2.25} aria-hidden />
                </a>
              </div>
            </article>
          </div>
        </section>

        {/* Kategori, race pack, harga & pendaftaran (satu section) */}
        <section className="lp-section" aria-labelledby="pendaftaran-heading">
          <div className="container" style={{ flex: 1, maxWidth: '1100px' }}>
            <div id="pendaftaran" className="lp-section-head">
              <span className="lp-section-eyebrow">Tiket &amp; harga</span>
              <h2 id="pendaftaran-heading" className="lp-section-title">
                Harga tiket NOTARACE 2026
              </h2>
            </div>

            <div className="animate-fade-in">
              <div className="lp-reg-card">
                <div className="lp-cats">
                  {CATEGORY_DETAILS_ROWS.map((row) => {
                    const isWalk = row.typeLabel === 'Fun Walk';
                    const TypeIcon = isWalk ? Footprints : Activity;
                    const priceHeadingId = `harga-${row.category.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase()}`;
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
                          <div className="lp-cat__pricing">
                            <p className="lp-cat__field-label lp-cat__field-label--price" id={priceHeadingId}>
                              <Tag size={14} strokeWidth={2.5} aria-hidden />
                              Harga per tiket
                            </p>
                            <table className="lp-cat__price-table" aria-labelledby={priceHeadingId}>
                              <caption className="lp-sr-only">
                                {row.pricing.public
                                  ? `Harga early bird dan normal untuk ${NOTARIS_ALB_CATEGORY_LABEL} serta Umum (Public), ${row.jarak}.`
                                  : `Harga early bird dan normal khusus ${NOTARIS_ALB_CATEGORY_LABEL} untuk ${row.jarak}. Umum (Public) tidak tersedia untuk jarak ini.`}
                              </caption>
                              <thead>
                                <tr>
                                  <th scope="col" className="lp-cat__price-th lp-cat__price-th--seg">
                                    Kategori
                                  </th>
                                  <th scope="col" className="lp-cat__price-th lp-cat__price-th--num">
                                    Early bird
                                  </th>
                                  <th scope="col" className="lp-cat__price-th lp-cat__price-th--num">
                                    Normal
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <th scope="row" className="lp-cat__price-rowhd">
                                    {NOTARIS_ALB_CATEGORY_LABEL}
                                  </th>
                                  <td className="lp-cat__price-amt">{formatIdr(row.pricing.notaris.earlyBird)}</td>
                                  <td className="lp-cat__price-amt">{formatIdr(row.pricing.notaris.normal)}</td>
                                </tr>
                                <tr>
                                  <th scope="row" className="lp-cat__price-rowhd">
                                    Umum (Public)
                                  </th>
                                  {row.pricing.public ? (
                                    <>
                                      <td className="lp-cat__price-amt">{formatIdr(row.pricing.public.earlyBird)}</td>
                                      <td className="lp-cat__price-amt">{formatIdr(row.pricing.public.normal)}</td>
                                    </>
                                  ) : (
                                    <td
                                      colSpan={2}
                                      className="lp-cat__price-amt lp-cat__price-na"
                                      aria-label="Tidak tersedia untuk Umum (Public) pada jarak ini"
                                    >
                                      Tidak tersedia
                                    </td>
                                  )}
                                </tr>
                              </tbody>
                            </table>
                          </div>

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
                              <button
                                type="button"
                                className="lp-route-map-btn"
                                onClick={() =>
                                  setRouteModal({
                                    src: row.routeMapImageSrc,
                                    title: routeModalCaption(row.category),
                                    imageAlt: `Peta rute NOTARACE 2026 ${row.jarak}, EASTVARA BSD`,
                                  })
                                }
                              >
                                <span className="lp-route-map-btn__thumb-wrap" aria-hidden>
                                  <img
                                    src={row.routeMapImageSrc}
                                    alt=""
                                    className="lp-route-map-btn__thumb"
                                    loading="lazy"
                                    decoding="async"
                                  />
                                </span>
                                <span className="lp-route-map-btn__text">
                                  <span className="lp-route-map-btn__label">Lihat peta rute</span>
                                  <span className="lp-route-map-btn__hint">{row.jarak}</span>
                                </span>
                                <ChevronRight className="lp-route-map-btn__chev" size={20} strokeWidth={2.5} aria-hidden />
                              </button>
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

                <div className="lp-ticket-cta-bar">
                  <div className="lp-ticket-cta-bar__actions">
                    <a
                      href={ticketNotarisReady ? ticketNotarisHref : '#'}
                      target={ticketNotarisReady ? '_blank' : undefined}
                      rel={ticketNotarisReady ? 'noopener noreferrer' : undefined}
                      onClick={(e) => {
                        if (!ticketNotarisReady) e.preventDefault();
                      }}
                      aria-disabled={!ticketNotarisReady}
                      className="lp-btn lp-btn--primary lp-reg-card__cta lp-reg-card__cta--split"
                    >
                      <FileSignature size={18} strokeWidth={2.25} aria-hidden />
                      Daftar {NOTARIS_ALB_CATEGORY_LABEL}
                      <ChevronRight size={20} strokeWidth={2.5} aria-hidden />
                    </a>
                    <a
                      href={ticketPublicReady ? ticketPublicHref : '#'}
                      target={ticketPublicReady ? '_blank' : undefined}
                      rel={ticketPublicReady ? 'noopener noreferrer' : undefined}
                      onClick={(e) => {
                        if (!ticketPublicReady) e.preventDefault();
                      }}
                      aria-disabled={!ticketPublicReady}
                      className="lp-btn lp-btn--outline-dark lp-reg-card__cta lp-reg-card__cta--split"
                    >
                      <Users size={18} strokeWidth={2.25} aria-hidden />
                      Daftar Umum (Public)
                      <ChevronRight size={20} strokeWidth={2.5} aria-hidden />
                    </a>
                  </div>
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
                      Khusus peserta {NOTARIS_ALB_CATEGORY_LABEL}, wajib akun INI aktif
                    </h3>
                    <p className="lp-notice__text">
                      {NOTARIS_REGISTRATION_INFO.registrationReminder}{' '}
                      <a href="#tentang-ini" className="lp-notice__inline-link">
                        Baca penjelasan lengkap
                      </a>
                      .
                    </p>
                    <a
                      href={INI_PORTAL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="lp-notice__link"
                    >
                      {NOTARIS_REGISTRATION_INFO.ctaLabel}
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
        <div className="lp-info-strip">
          <div className="container lp-info-strip__inner">

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
                  <strong>Harga tiket (deck NOTA RACE):</strong> lihat tabel di atas untuk Notaris (10K vs 5K/2,5K) dan Public.
                </p>
                <p style={{ margin: '0 0 0.75rem' }}><strong>Batas pendaftaran:</strong> {EVENT_META.registrationDeadlinePlaceholder}</p>
                <p style={{ margin: 0 }}><strong>Refund & pembatalan:</strong> {EVENT_META.refundPolicyPlaceholder}</p>
              </div>
            </div> */}

            <section id="logistik" className="lp-logistik" aria-labelledby="logistik-heading">
              <span className="lp-section-eyebrow">Logistik</span>
              <h2 id="logistik-heading" className="lp-section-title lp-logistik__title">
                Race pack, Surat Kuasa &amp; titik kumpul
              </h2>
              <div className="lp-logistik__grid">
                <article className="lp-logistik-card">
                  <div className="lp-logistik-card__head">
                    <span className="lp-logistik-card__icon-wrap" aria-hidden>
                      <Calendar size={20} strokeWidth={2.25} />
                    </span>
                    <h3 className="lp-logistik-card__title">Pengambilan race pack</h3>
                  </div>
                  <p className="lp-logistik-card__kicker">
                    <strong>{EVENT_META.racePackPickupSummary}</strong>
                  </p>
                  <ul className="lp-logistik-card__list">
                    {EVENT_META.racePackPickupBullets.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </article>
                <article className="lp-logistik-card">
                  <div className="lp-logistik-card__head">
                    <span className="lp-logistik-card__icon-wrap" aria-hidden>
                      <FileSignature size={20} strokeWidth={2.25} />
                    </span>
                    <h3 className="lp-logistik-card__title">Surat Kuasa</h3>
                  </div>
                  <p className="lp-logistik-card__kicker">
                    <strong>{EVENT_META.racePackProxyTitle}</strong>
                  </p>
                  <p className="lp-logistik-card__text">{EVENT_META.racePackProxyLead}</p>
                  <p className="lp-logistik-card__req-label" id="surat-kuasa-syarat">
                    Penerima kuasa wajib membawa:
                  </p>
                  <ul
                    className="lp-logistik-card__list"
                    aria-labelledby="surat-kuasa-syarat"
                  >
                    {EVENT_META.racePackProxyRequirements.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                  <a
                    className="lp-btn lp-btn--outline-dark lp-logistik-card__cta"
                    href={EVENT_META.racePackProxyDownloadHref}
                    download="Surat-Kuasa-NOTARACE-2026.docx"
                  >
                    <FileDown size={18} strokeWidth={2.25} aria-hidden />
                    {EVENT_META.racePackProxyDownloadLabel}
                  </a>
                </article>
                <article className="lp-logistik-card">
                  <div className="lp-logistik-card__head">
                    <span className="lp-logistik-card__icon-wrap" aria-hidden>
                      <Flag size={20} strokeWidth={2.25} />
                    </span>
                    <h3 className="lp-logistik-card__title">Titik kumpul &amp; start</h3>
                  </div>
                  <p className="lp-logistik-card__text">{EVENT_META.assemblyLocationLine}</p>
                  <div className="lp-logistik-schedule">
                    <p className="lp-logistik-schedule__label" id="logistik-jadwal-heading">
                      Jadwal hari-H
                    </p>
                    <table
                      className="lp-logistik-schedule__table"
                      aria-labelledby="logistik-jadwal-heading"
                    >
                      <caption className="lp-sr-only">
                        Opening ceremony dan flag-off per jarak, waktu WIB
                      </caption>
                      <thead>
                        <tr>
                          <th scope="col">Acara</th>
                          <th scope="col">Waktu</th>
                        </tr>
                      </thead>
                      <tbody>
                        {EVENT_META.assemblyScheduleRows.map((row) => (
                          <tr key={row.label}>
                            <th scope="row">{row.label}</th>
                            <td>{row.time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </article>
              </div>
            </section>

          </div>
        </div>

        {/* Sponsors Section - toggle via VITE_FEATURE_SPONSORS */}
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
                title="Peta lokasi NOTARACE 2026, EASTVARA BSD (Eastvara Mall)"
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
        <div id="kontak" style={{ padding: 'clamp(1.5rem, 4vw, 2rem) 1rem clamp(3rem, 8vw, 6rem)' }}>
          <div
            className="container"
            style={{
              maxWidth: '1100px',
              margin: '0 auto',
              minHeight: 'clamp(520px, 78vh, 620px)',
              borderRadius: 'clamp(24px, 5vw, 48px)',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 30px 60px rgba(0,0,0,0.2)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${randomImages[3] || 'https://photos.gotag.me/uploads/medium_SH_5_3604_2ff9d979da.jpg'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: 0,
              }}
              aria-hidden
            ></div>

            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.9) 100%)',
                zIndex: 1,
              }}
              aria-hidden
            ></div>

            <div
              style={{
                position: 'relative',
                zIndex: 2,
                minHeight: 'inherit',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: 'clamp(1.5rem, 6vw, 4rem)',
                textAlign: 'center',
                color: 'white',
                gap: 'clamp(1.5rem, 5vw, 2rem)',
              }}
            >
              <p
                style={{
                  fontSize: 'clamp(1rem, 3.5vw, 1.5rem)',
                  fontWeight: 600,
                  maxWidth: '800px',
                  margin: '0 auto clamp(1.5rem, 6vw, 4rem)',
                  lineHeight: 1.4,
                  textShadow: '0 2px 12px rgba(0,0,0,0.55)',
                }}
              >
                Mau tanya soal race kit, rute lari, atau hal-hal seru lainnya? Tim kami siap bantu!
              </p>

              <div>
                <h3 style={contactLabelStyle}>INSTAGRAM</h3>
                <a
                  href={EVENT_META.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontSize: 'clamp(1.5rem, 6.5vw, 2.25rem)',
                    fontWeight: 900,
                    color: 'white',
                    textDecoration: 'none',
                    overflowWrap: 'anywhere',
                    display: 'inline-block',
                    maxWidth: '100%',
                    textShadow: '0 2px 12px rgba(0,0,0,0.6)',
                  }}
                >
                  {EVENT_META.instagramHandle}
                </a>
              </div>

              {featureFlags.contactTiktokWhatsapp && (
                <>
                  <div>
                    <h3 style={contactLabelStyle}>TIKTOK</h3>
                    <p style={contactValueStyle}>{EVENT_META.tiktokPlaceholder}</p>
                  </div>

                  <div>
                    <h3 style={contactLabelStyle}>WHATSAPP</h3>
                    <p style={contactValueStyle}>{EVENT_META.whatsappPlaceholder}</p>
                  </div>
                </>
              )}

              <div>
                <h3 style={contactLabelStyle}>EMAIL</h3>
                <a
                  href={`mailto:${EVENT_META.emailPlaceholder}`}
                  style={{
                    ...contactValueStyle,
                    color: 'rgba(255,255,255,0.95)',
                    textDecoration: 'underline',
                    textUnderlineOffset: '4px',
                    display: 'inline-block',
                    maxWidth: '100%',
                    overflowWrap: 'anywhere',
                  }}
                >
                  {EVENT_META.emailPlaceholder}
                </a>
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
        <p className="text-sm text-muted mt-2">
          Instagram: {EVENT_META.instagramHandle} •{' '}
          <a href={`mailto:${EVENT_META.emailPlaceholder}`} className="text-muted" style={{ fontWeight: 600, color: 'inherit' }}>
            {EVENT_META.emailPlaceholder}
          </a>
        </p>
      </footer>

      {routeModal && (
        <div
          className="modal-overlay"
          role="presentation"
          onClick={() => setRouteModal(null)}
        >
          <div
            className="modal-content modal-content--route"
            role="dialog"
            aria-modal="true"
            aria-labelledby="route-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="modal-route-caption">
              <span id="route-modal-title" className="modal-route-caption__text">
                {routeModal.title}
              </span>
            </p>
            <figure className="modal-route-figure">
              <img
                src={routeModal.src}
                className="modal-route-img"
                alt={routeModal.imageAlt}
                loading="eager"
                decoding="async"
              />
            </figure>
            <button
              type="button"
              className="modal-close modal-close--on-route"
              onClick={() => setRouteModal(null)}
              aria-label="Tutup peta rute"
            >
              <X size={22} strokeWidth={2.25} aria-hidden />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
