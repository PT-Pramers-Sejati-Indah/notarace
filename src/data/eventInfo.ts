/**
 * NOTARACE 2026 — konten situs (termasuk placeholder untuk informasi yang belum final).
 */

export const EVENT_META = {
  name: 'NOTARACE 2026',
  taglinePlaceholder:
    'Tagline resmi akan diumumkan. Pantau @notarace.id untuk info terbaru.',
  edition: 'Edisi ke-2',
  story:
    'Acara ini diadakan dalam rangka memperingati Hari Ulang Tahun Ikatan Notaris Indonesia (INI) ke-118.',
  raceDateLabel: '26 Juli 2026',
  raceTimePlaceholder: 'Waktu pelaksanaan menyusul',
  raceStartISO: '2026-07-26T05:00:00+07:00',
  venueShort: 'Eastvara, BSD City',
  venueAddress:
    'Jl. BSD Boulevard Utara, Cijantra, Pagedangan, Kabupaten Tangerang, Banten 15345',
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Eastvara+BSD+Boulevard+Utara',
  googleMapsEmbedUrl:
    'https://maps.google.com/maps?q=Eastvara+BSD+Boulevard+Utara+BSD+City&t=&z=15&ie=UTF8&iwloc=&output=embed',
  topBanner: '26 JULI 2026 • EASTVARA BSD CITY',
  instagramUrl: 'https://instagram.com/notarace.id',
  instagramHandle: '@notarace.id',
  tiktokPlaceholder: 'TikTok (akun resmi menyusul)',
  emailPlaceholder: 'Email panitia (menyusul)',
  whatsappPlaceholder: 'WhatsApp panitia (menyusul)',
  /** URL halaman tiket / pendaftaran (mockup — ganti dengan link produksi). */
  ticketRegistrationUrl: 'https://example.com/notarace-2026-daftar',
  racePackPickupSummary: '24–25 Juli 2026',
  racePackPickupDetail:
    'Lokasi, jam operasional, dan prosedur pengambilan race pack menyusul.',
  parkingPlaceholder: 'Informasi parkir menyusul.',
  assemblyPlaceholder: 'Titik kumpul & titik start menyusul.',
  routePlaceholder: 'Gambar peta rute & unduhan GPX menyusul.',
  ageRulesPlaceholder: 'Ketentuan usia minimum/maksimum per kategori menyusul.',
  registrationDeadlinePlaceholder: 'Batas waktu pendaftaran menyusul.',
  refundPolicyPlaceholder:
    'Kebijakan refund & pembatalan menyusul, akan dipublikasikan bersama channel pendaftaran resmi.',
  footerTagline: 'Meriahkan HUT INI ke-118, edisi kedua.',
} as const;

/** Portal resmi PP Ikatan Notaris Indonesia — verifikasi peserta Notaris NOTARACE. */
export const INI_PORTAL_URL = 'https://www.ikatannotarisindonesia.id/beranda' as const;

export const NOTARIS_REGISTRATION_INFO = {
  panelTitle: 'Tentang I.N.I',
  panelSubtitle: 'Pendaftaran peserta Notaris',
  intro:
    'Ikatan Notaris Indonesia adalah organisasi profesi bagi notaris di seluruh Indonesia. INI berperan menjaga standar profesi, etika, dan kualitas layanan hukum notaris.',
  registrationNote:
    'Pendaftaran sebagai peserta Notaris berbeda dengan peserta umum. Calon peserta Notaris wajib memiliki akun aktif di portal resmi INI agar dapat divalidasi. Tanpa akun yang valid, peserta akan tercatat sebagai peserta umum.',
  benefit:
    'Keunggulan mendaftar sebagai Notaris: Anda berhak mendapat 6 poin sertifikat yang dapat diunduh setelah ketentuan acara terpenuhi.',
  ctaLabel: 'Buka portal ikatannotarisindonesia.id',
} as const;

export const PRICING_NOTARIS_IDR = {
  earlyBird: 475_000,
  normal: 650_000,
} as const;

/** Dasar perhitungan alur checkout demo (periode early bird). */
export const MOCK_CHECKOUT_BASE_PRICE_IDR = PRICING_NOTARIS_IDR.earlyBird;

export interface CategoryDetailRow {
  category: string;
  jarak: string;
  cutoff: string;
  typeLabel: string;
  gradient: [string, string];
  racePack: string[];
  route: string;
  ageRule: string;
}

export const CATEGORY_DETAILS_ROWS: CategoryDetailRow[] = [
  {
    category: '10K Run',
    jarak: '10 km',
    cutoff: 'Menyusul',
    typeLabel: 'Run',
    gradient: ['#10B981', '#059669'],
    racePack: ['Jersey', 'Medali', 'BIB'],
    route: 'Rute 10K menyusul, akan tersedia sebagai file GPX.',
    ageRule: 'Minimum usia 17 tahun.',
  },
  {
    category: '5K Run',
    jarak: '5 km',
    cutoff: 'Menyusul',
    typeLabel: 'Run',
    gradient: ['#8B5CF6', '#3B82F6'],
    racePack: ['Jersey', 'Medali', 'BIB'],
    route: 'Rute 5K menyusul, akan tersedia sebagai file GPX.',
    ageRule: 'Minimum usia 13 tahun.',
  },
  {
    category: 'Fun Walk',
    jarak: '2,5 km',
    cutoff: 'Menyusul',
    typeLabel: 'Fun Walk',
    gradient: ['#A855F7', '#EC4899'],
    racePack: ['Jersey', 'Medali', 'BIB'],
    route: 'Rute Fun Walk 2,5K menyusul.',
    ageRule: 'Terbuka untuk semua usia (anak-anak wajib didampingi).',
  },
];

export const FAQ_PLACEHOLDERS: { q: string; a: string }[] = [
  {
    q: 'Kapan FAQ lengkap tersedia?',
    a: 'Daftar pertanyaan umum akan dipublikasikan bersama tagline resmi dan link pendaftaran.',
  },
  {
    q: 'Kapan batas pendaftaran?',
    a:
      'Batas waktu pendaftaran menyusul, akan diumumkan di kanal resmi @notarace.id.',
  },
  {
    q: 'Bagaimana kebijakan refund dan pembatalan?',
    a:
      'Kebijakan refund & pembatalan menyusul, akan dipublikasikan bersama channel pendaftaran resmi.',
  },
];

export const SPONSOR_TIER_PLACEHOLDERS: { tier: string; note: string }[] = [
  { tier: 'Title Sponsor', note: 'Logo & nama (menyusul)' },
  { tier: 'Official Partner', note: 'Logo & nama (menyusul)' },
  { tier: 'Supporting Partner', note: 'Logo & nama (menyusul)' },
];

export const TIMELINE_EVENTS = [
  {
    title: 'Pendaftaran Early Bird',
    date: 'Mei 2026',
    description: 'Dapatkan harga spesial dengan mendaftar lebih awal. Kuota terbatas!',
    status: 'upcoming' as const,
  },
  {
    title: 'Pendaftaran Umum',
    date: 'Juni 2026',
    description: 'Pendaftaran reguler dibuka untuk semua kategori (10K, 5K, dan Fun Walk).',
    status: 'upcoming' as const,
  },
  {
    "title": "Pengambilan race pack",
    date: '24–25 Juli 2026',
    description: 'Lokasi, jam operasional, dan prosedur pengambilan race pack menyusul.',
    status: 'upcoming' as const,
  },
  {
    title: 'Hari Lomba & Pengumuman Pemenang',
    date: EVENT_META.raceDateLabel,
    description: 'Race day di Eastvara BSD City. Pengumuman pemenang dilakukan setelah race selesai.',
    status: 'upcoming' as const,
  },
  {
    title: 'Pembagian Sertifikat Digital',
    date: 'Tanggal Menyusul',
    description: 'Sertifikat dapat diunduh melalui website resmi dengan memasukkan nomor bib.',
    status: 'upcoming' as const,
  },
  {
    title: 'Pembagian Foto Digital',
    date: 'Tanggal Menyusul',
    description: 'Cari dan unduh foto keseruanmu saat lari menggunakan fitur pengenal wajah.',
    status: 'upcoming' as const,
  },
];
