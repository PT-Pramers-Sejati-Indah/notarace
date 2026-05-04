/**
 * NOTARACE 2026 - konten situs (termasuk placeholder untuk informasi yang belum final).
 */

export const EVENT_META = {
  name: 'NOTARACE 2026',
  taglinePlaceholder:
    'Tepat di Atas Kertas, Cepat di Atas Lintasan.',
  edition: 'Edisi ke-2',
  story:
    'Acara ini diadakan dalam rangka memperingati Hari Ulang Tahun Ikatan Notaris Indonesia (INI) ke-118.',
  raceDateLabel: '26 Juli 2026',
  raceTimePlaceholder: 'Mulai 05:30 WIB',
  raceStartISO: '2026-07-26T05:30:00+07:00',
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
  /** URL halaman tiket / pendaftaran (mockup, ganti dengan link produksi). */
  ticketRegistrationUrl: 'https://example.com/notarace-2026-daftar',
  racePackPickupSummary: '24–25 Juli 2026',
  racePackPickupDetail:
    'Berlangsung 2 hari di Eastvara BSD City, pukul 09.00–20.00 WIB. Peserta wajib membawa email konfirmasi pendaftaran dan identitas diri (KTP/SIM). Tersedia juga talkshow, notary consultation, Fitness Day Fest (Zumba & Pound Fit), pop-up booth, serta fun games & challenge.',
  parkingPlaceholder: 'Informasi parkir menyusul.',
  assemblyPlaceholder:
    'Titik kumpul & start di Eastvara BSD City. Opening ceremony pukul 05:30 WIB, flag-off 10K pukul 05:55, 5K pukul 06:00, dan Fun Walk 2,5K pukul 06:05 WIB.',
  routePlaceholder: 'Gambar peta rute & unduhan GPX menyusul.',
  ageRulesPlaceholder: 'Ketentuan usia minimum/maksimum per kategori menyusul.',
  registrationDeadlinePlaceholder:
    'Pendaftaran dibuka 3 Mei – 12 Juli 2026 dan resmi ditutup pada 14 Juli 2026.',
  refundPolicyPlaceholder:
    'Kebijakan refund & pembatalan menyusul, akan dipublikasikan bersama channel pendaftaran resmi.',
  footerTagline: 'Tepat di atas kertas, cepat di atas lintasan.',
} as const;

/** Portal resmi PP Ikatan Notaris Indonesia, verifikasi peserta Notaris NOTARACE. */
export const INI_PORTAL_URL = 'https://www.ikatannotarisindonesia.id/beranda' as const;

export const NOTARIS_REGISTRATION_INFO = {
  panelTitle: 'Tentang I.N.I',
  panelSubtitle: 'Pendaftaran peserta Notaris',
  intro:
    'Ikatan Notaris Indonesia (INI) adalah organisasi profesi bagi notaris di seluruh Indonesia. INI berperan menjaga standar profesi, etika, dan kualitas layanan hukum notaris.',
  registrationNote:
    'Pendaftaran sebagai peserta Notaris berbeda dengan peserta umum. Calon peserta Notaris wajib memiliki akun aktif di portal resmi INI agar dapat divalidasi. Tanpa akun yang valid, peserta akan tercatat sebagai peserta umum.',
  /** Ringkas untuk callout di kartu tiket */
  registrationReminder:
    'Wajib akun portal INI aktif untuk validasi peserta Notaris. Tanpa itu, pendaftaran diperlakukan sebagai peserta umum.',
  benefit:
    'Peserta notaris atau ALB yang menyelesaikan lari dan terdaftar pada kategori notary berhak mendapat 6 poin notaris (sesuai ketentuan dan mekanisme di portal INI).',
  ctaLabel: 'Buka portal Ikatan Notaris Indonesia',
} as const;

export const PRICING_NOTARIS_IDR = {
  earlyBird: 450_000,
  normal: 500_000,
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
    racePack: ['Jersey', 'BIB', 'Finisher Medal', 'Refreshment'],
    route: 'Rute 10K Eastvara BSD City. File GPX menyusul.',
    ageRule: 'Minimum usia 17 tahun.',
  },
  {
    category: '5K Run',
    jarak: '5 km',
    cutoff: 'Menyusul',
    typeLabel: 'Run',
    gradient: ['#8B5CF6', '#3B82F6'],
    racePack: ['Jersey', 'BIB', 'Finisher Medal', 'Refreshment'],
    route: 'Rute 5K Eastvara BSD City. File GPX menyusul.',
    ageRule: 'Minimum usia 13 tahun.',
  },
  {
    category: 'Fun Walk',
    jarak: '2,5 km',
    cutoff: 'Menyusul',
    typeLabel: 'Fun Walk',
    gradient: ['#A855F7', '#EC4899'],
    racePack: ['Jersey', 'BIB', 'Finisher Medal', 'Refreshment'],
    route: 'Rute Fun Walk 2,5K Eastvara BSD City.',
    ageRule: 'Terbuka untuk semua usia (anak-anak wajib didampingi).',
  },
];

export const FAQ_PLACEHOLDERS: { q: string; a: string }[] = [
  {
    q: 'Kapan jadwal pendaftaran Notarace 2026?',
    a:
      'Promosi event berlangsung 25 April – 25 Juli 2026. Pendaftaran dibuka 3 Mei – 12 Juli 2026, dan resmi ditutup pada 14 Juli 2026.',
  },
  {
    q: 'Apa saja aktivitas yang bisa dinikmati peserta?',
    a:
      'Selain Race 2,5K, 5K, dan 10K, Notarace menghadirkan INI Cheering, Concert, Talkshow, Workout, Fun Games & Challenge, serta Bazzar di area Eastvara BSD City.',
  },
  {
    q: 'Apa saja yang didapat finisher di garis finis?',
    a:
      'Setiap finisher mendapatkan refreshment (pisang, isotonic, air mineral) dan finisher medal setelah masuk garis finish.',
  },
  {
    q: 'Apa keuntungan ikut sebagai peserta Notaris?',
    a:
      'Peserta notaris atau ALB yang menyelesaikan lari dan terdaftar pada kategori notary akan mendapat 6 poin notaris, sesuai ketentuan dan mekanisme di portal INI.',
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
    title: 'Promosi Notarace',
    date: '25 April – 25 Juli 2026',
    description: 'Periode kampanye dan promosi event Notarace 2026 di kanal resmi @notarace.id.',
    status: 'upcoming' as const,
  },
  {
    title: 'Pendaftaran Peserta',
    date: '3 Mei – 12 Juli 2026',
    description: 'Pendaftaran dibuka untuk semua kategori: 10K, 5K, dan Fun Walk 2,5K.',
    status: 'upcoming' as const,
  },
  {
    title: 'Pendaftaran Ditutup',
    date: '14 Juli 2026',
    description: 'Batas akhir pendaftaran Notarace 2026. Pastikan kamu sudah amankan slot sebelum tanggal ini.',
    status: 'upcoming' as const,
  },
  {
    title: 'Race Pack Collection',
    date: '24–25 Juli 2026',
    description: 'Pengambilan race pack di Eastvara BSD City pukul 09.00–20.00 WIB selama 2 hari, dengan rangkaian Fest & Expo.',
    status: 'upcoming' as const,
  },
  {
    title: 'Race Day',
    date: EVENT_META.raceDateLabel,
    description: 'Hari pelaksanaan Notarace 2026 di Eastvara BSD City: opening, race, awarding, talkshow, dan entertainment.',
    status: 'upcoming' as const,
  },
  {
    title: 'Pelaporan, Sertifikat & Foto Digital',
    date: '27 Juli – 29 Agustus 2026',
    description: 'Periode pelaporan event, distribusi sertifikat digital, dan unduhan foto keseruan peserta.',
    status: 'upcoming' as const,
  },
];
