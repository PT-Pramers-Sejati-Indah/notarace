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
  /**
   * URL pendaftaran umum (legacy / fallback).
   * @deprecated Prefer ticketRegistrationNotarisUrl & ticketRegistrationPublicUrl.
   */
  ticketRegistrationUrl: 'https://example.com/notarace-2026-daftar-public',
  /** Pendaftaran kategori Notaris (notary) - ganti dengan link produksi. */
  ticketRegistrationNotarisUrl: 'https://example.com/notarace-2026-daftar-notaris',
  /** Pendaftaran kategori umum (Public) - ganti dengan link produksi. */
  ticketRegistrationPublicUrl: 'https://example.com/notarace-2026-daftar-public',
  racePackPickupSummary: '24–25 Juli 2026',
  /** Poin per baris untuk kartu logistik (mudah dibaca). */
  racePackPickupBullets: [
    'Berlangsung 2 hari di Eastvara BSD City, pukul 09.00–20.00 WIB.',
    'Peserta wajib membawa email konfirmasi pendaftaran dan identitas diri (KTP/SIM).',
    'Tersedia juga talkshow, notary consultation, Fitness Day Fest (Zumba & Pound Fit), pop-up booth, serta fun games & challenge.',
  ] as const,
  parkingPlaceholder: 'Informasi parkir menyusul.',
  /** Lokasi titik kumpul & start (kartu logistik). */
  assemblyLocationLine: 'Titik kumpul & start di Eastvara BSD City.',
  /** Baris jadwal hari-H: label singkat + waktu (tampil sebagai tabel). */
  assemblyScheduleRows: [
    { label: 'Opening ceremony', time: '05.30 WIB' },
    { label: 'Flag-off 10K', time: '05.55 WIB' },
    { label: 'Flag-off 5K', time: '06.00 WIB' },
    { label: 'Flag-off Fun Walk 2,5K', time: '06.05 WIB' },
  ] as const,
  routePlaceholder: 'Gambar peta rute & unduhan GPX menyusul.',
  ageRulesPlaceholder:
    'Kategori umum: di bawah 45 tahun. Kategori Master: di atas 45 tahun.',
  registrationDeadlinePlaceholder:
    'Pendaftaran dibuka 3 Mei – 12 Juli 2026 dan resmi ditutup pada 13 Juli 2026.',
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

/**
 * Harga tiket (Notaris vs Umum/Public).
 * Notaris: satu tarif untuk Fun Walk 2,5K, 5K, dan 10K.
 * Umum: 10K berbeda dari 5K; Fun Walk 2,5K mengikuti tarif 5K.
 */
export const TICKET_PRICE_TIERS = {
  notarisAll: { earlyBird: 475_000, normal: 650_000 },
  public10k: { earlyBird: 300_000, normal: 350_000 },
  public5kFun25: { earlyBird: 200_000, normal: 250_000 },
} as const;

export type TicketPricePair = {
  earlyBird: number;
  normal: number;
};

/** Ringkasan baris (FAQ / materi); angka mengacu ke {@link TICKET_PRICE_TIERS}. */
export const TICKET_PRICING_ROWS = [
  { segment: 'Notaris', jarakLabel: '10K, 5K & Fun Walk 2,5K', ...TICKET_PRICE_TIERS.notarisAll },
  { segment: 'Umum (Public)', jarakLabel: '10 km', ...TICKET_PRICE_TIERS.public10k },
  { segment: 'Umum (Public)', jarakLabel: '5 km & Fun Walk 2,5 km', ...TICKET_PRICE_TIERS.public5kFun25 },
] as const;

export type TicketPricingRow = (typeof TICKET_PRICING_ROWS)[number];

/** Referensi demo checkout (Notaris, periode early bird). */
export const PRICING_NOTARIS_IDR = {
  earlyBird: TICKET_PRICE_TIERS.notarisAll.earlyBird,
  normal: TICKET_PRICE_TIERS.notarisAll.normal,
} as const;

/** Dasar perhitungan alur checkout demo (periode early bird). */
export const MOCK_CHECKOUT_BASE_PRICE_IDR = PRICING_NOTARIS_IDR.earlyBird;

export interface CategoryDetailRow {
  category: string;
  jarak: string;
  cutoff: string;
  typeLabel: string;
  gradient: [string, string];
  /** Harga per tiket untuk tier Notaris vs Umum (Public) pada jarak ini. */
  pricing: {
    notaris: TicketPricePair;
    public: TicketPricePair;
  };
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
    pricing: {
      notaris: TICKET_PRICE_TIERS.notarisAll,
      public: TICKET_PRICE_TIERS.public10k,
    },
    racePack: ['Jersey', 'BIB', 'Finisher Medal', 'Refreshment'],
    route: 'Rute 10K Eastvara BSD City. File GPX menyusul.',
    ageRule: 'Kategori umum: di bawah 45 tahun. Kategori Master: di atas 45 tahun.',
  },
  {
    category: '5K Run',
    jarak: '5 km',
    cutoff: 'Menyusul',
    typeLabel: 'Run',
    gradient: ['#8B5CF6', '#3B82F6'],
    pricing: {
      notaris: TICKET_PRICE_TIERS.notarisAll,
      public: TICKET_PRICE_TIERS.public5kFun25,
    },
    racePack: ['Jersey', 'BIB', 'Finisher Medal', 'Refreshment'],
    route: 'Rute 5K Eastvara BSD City. File GPX menyusul.',
    ageRule: 'Kategori umum: di bawah 45 tahun. Kategori Master: di atas 45 tahun.',
  },
  {
    category: 'Fun Walk',
    jarak: '2,5 km',
    cutoff: 'Menyusul',
    typeLabel: 'Fun Walk',
    gradient: ['#A855F7', '#EC4899'],
    pricing: {
      notaris: TICKET_PRICE_TIERS.notarisAll,
      public: TICKET_PRICE_TIERS.public5kFun25,
    },
    racePack: ['Jersey', 'BIB', 'Finisher Medal', 'Refreshment'],
    route: 'Rute Fun Walk 2,5K Eastvara BSD City.',
    ageRule: 'Kategori umum: di bawah 45 tahun. Kategori Master: di atas 45 tahun.',
  },
];

export const FAQ_PLACEHOLDERS: { q: string; a: string }[] = [
  {
    q: 'Kapan jadwal pendaftaran Notarace 2026?',
    a:
      'Pendaftaran dibuka 3 Mei – 12 Juli 2026, dan resmi ditutup pada 13 Juli 2026.',
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
    title: 'Pendaftaran Peserta',
    date: '3 Mei – 12 Juli 2026',
    description: 'Pendaftaran dibuka untuk semua kategori: 10K, 5K, dan Fun Walk 2,5K.',
    status: 'upcoming' as const,
  },
  {
    title: 'Pendaftaran Ditutup',
    date: '13 Juli 2026',
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
