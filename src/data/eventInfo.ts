/**
 * NOTARACE 2026 - konten situs (termasuk placeholder untuk informasi yang belum final).
 */

export const EVENT_META = {
  name: 'NOTARACE 2026',
  taglinePlaceholder:
    'Legal Precision, Racing Passion',
  edition: 'Edisi ke-2',
  story:
    'Acara ini diadakan dalam rangka memperingati Hari Ulang Tahun Ikatan Notaris Indonesia (INI) ke-118.',
  raceDateLabel: '26 Juli 2026 (26/07/2026)',
  /** Rentang acara hari-H; hitung mundur memakai raceStartISO (awal jendela 05.00 WIB). */
  raceTimePlaceholder: '05.00 – 12.00 WIB',
  raceStartISO: '2026-07-26T05:00:00+07:00',
  venueShort: 'EASTVARA BSD',
  venueAddress:
    'Eastvara Mall, Jl. BSD Boulevard Utara, Cijantra, Pagedangan, Kabupaten Tangerang, Banten 15345',
  /** Titik Eastvara Mall (BSD); sama dengan pusat embed peta. */
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=-6.294075%2C106.609685',
  googleMapsEmbedUrl:
    'https://maps.google.com/maps?q=-6.294075%2C106.609685&hl=id&z=17&ie=UTF8&iwloc=&output=embed',
  topBanner: '26 JULI 2026 • EASTVARA BSD',
  instagramUrl: 'https://instagram.com/notarace.id',
  instagramHandle: '@notarace.id',
  tiktokPlaceholder: 'TikTok (akun resmi menyusul)',
  emailPlaceholder: 'informasi@notarace.id',
  whatsappPlaceholder: 'WhatsApp panitia (menyusul)',
  /**
   * URL pendaftaran umum (legacy / fallback).
   * @deprecated Prefer ticketRegistrationNotarisUrl & ticketRegistrationPublicUrl.
   */
  ticketRegistrationUrl: 'https://dtiketin.com/events/notarace-2026',
  /** Pendaftaran kategori Notaris & ALB (dtiketin). */
  ticketRegistrationNotarisUrl: 'https://dtiketin.com/events/notarace-run-2026',
  /** Pendaftaran kategori Umum (Public) (dtiketin). */
  ticketRegistrationPublicUrl: 'https://dtiketin.com/events/notarace-2026',
  racePackPickupSummary: '24–25 Juli 2026',
  /** Poin per baris untuk kartu logistik (mudah dibaca). */
  racePackPickupBullets: [
    'Berlangsung 2 hari di EASTVARA BSD, pukul 09.00–20.00 WIB.',
    'Peserta wajib membawa email konfirmasi pendaftaran dan identitas diri (KTP/SIM).',
    'Tersedia juga talkshow, notary consultation, Fitness Day Fest (Zumba & Pound Fit), pop-up booth, serta fun games & challenge.',
  ] as const,
  parkingPlaceholder: 'Informasi parkir menyusul.',
  /** Lokasi titik kumpul & start (kartu logistik). */
  assemblyLocationLine: 'Titik kumpul & start di EASTVARA BSD (Eastvara Mall).',
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
    'Pendaftaran dibuka 3 Mei – 12 Juli 2026; batas akhir (hari terakhir) 12 Juli 2026.',
  refundPolicyPlaceholder:
    'Kebijakan refund & pembatalan menyusul, akan dipublikasikan bersama channel pendaftaran resmi.',
  footerTagline: 'Legal Precision, Racing Passion',
} as const;

/** Portal resmi PP Ikatan Notaris Indonesia, verifikasi peserta Notaris & ALB NOTARACE. */
export const INI_PORTAL_URL = 'https://www.ikatannotarisindonesia.id/beranda' as const;

/** Label kategori tiket / peserta INI: satu tier harga untuk Notaris dan ALB. */
export const NOTARIS_ALB_CATEGORY_LABEL = 'Notaris dan ALB' as const;

export const NOTARIS_REGISTRATION_INFO = {
  panelTitle: 'Tentang I.N.I',
  panelSubtitle: `Pendaftaran peserta ${NOTARIS_ALB_CATEGORY_LABEL}`,
  intro:
    'Ikatan Notaris Indonesia (INI) adalah organisasi profesi bagi notaris di seluruh Indonesia. INI berperan menjaga standar profesi, etika, dan kualitas layanan hukum notaris.',
  registrationNote:
    `Pendaftaran sebagai peserta ${NOTARIS_ALB_CATEGORY_LABEL} berbeda dengan peserta umum. Calon peserta wajib memiliki akun aktif di portal resmi INI agar dapat divalidasi. Tanpa akun yang valid, peserta akan tercatat sebagai peserta umum.`,
  /** Ringkas untuk callout di kartu tiket */
  registrationReminder:
    `Wajib akun portal INI aktif untuk validasi peserta ${NOTARIS_ALB_CATEGORY_LABEL}.`,
  benefit:
    `Peserta ${NOTARIS_ALB_CATEGORY_LABEL} yang menyelesaikan lari dan terdaftar pada kategori yang sesuai berhak mendapat 6 poin notaris (sesuai ketentuan dan mekanisme di portal INI).`,
  ctaLabel: 'Buka portal Ikatan Notaris Indonesia',
} as const;

/**
 * Harga tiket (Notaris & ALB vs Umum/Public).
 * Notaris dan ALB: satu tarif untuk Fun Walk 2,5K, 5K, dan 10K.
 * Umum: 10K, 5K, dan Fun Walk 2,5K (5K & Fun Walk berbagi tarif pendek yang sama).
 */
export const TICKET_PRICE_TIERS = {
  notarisAll: { earlyBird: 475_000, normal: 650_000 },
  public10k: { earlyBird: 300_000, normal: 350_000 },
  /** Umum (Public): 5K. */
  public5k: { earlyBird: 200_000, normal: 250_000 },
  /** Umum (Public): Fun Walk 2,5K. */
  public25k: { earlyBird: 200_000, normal: 250_000 },
} as const;

export type TicketPricePair = {
  earlyBird: number;
  normal: number;
};

/** Ringkasan baris (FAQ / materi); angka mengacu ke {@link TICKET_PRICE_TIERS}. */
export const TICKET_PRICING_ROWS = [
  { segment: NOTARIS_ALB_CATEGORY_LABEL, jarakLabel: '10K, 5K & Fun Walk 2,5K', ...TICKET_PRICE_TIERS.notarisAll },
  { segment: 'Umum (Public)', jarakLabel: '10 km', ...TICKET_PRICE_TIERS.public10k },
  { segment: 'Umum (Public)', jarakLabel: '5 km', ...TICKET_PRICE_TIERS.public5k },
  { segment: 'Umum (Public)', jarakLabel: 'Fun Walk 2,5 km', ...TICKET_PRICE_TIERS.public25k },
] as const;

export type TicketPricingRow = (typeof TICKET_PRICING_ROWS)[number];

/** Referensi demo checkout (Notaris & ALB, periode early bird). */
export const PRICING_NOTARIS_IDR = {
  earlyBird: TICKET_PRICE_TIERS.notarisAll.earlyBird,
  normal: TICKET_PRICE_TIERS.notarisAll.normal,
} as const;

/** Dasar perhitungan alur checkout demo (periode early bird). */
export const MOCK_CHECKOUT_BASE_PRICE_IDR = PRICING_NOTARIS_IDR.earlyBird;

export interface CategoryDetailRow {
  category: string;
  jarak: string;
  typeLabel: string;
  gradient: [string, string];
  /** Harga per tiket untuk tier Notaris & ALB vs Umum (Public) pada jarak ini. `public: null` jika Umum tidak dibuka untuk jarak tersebut. */
  pricing: {
    notaris: TicketPricePair;
    public: TicketPricePair | null;
  };
  racePack: string[];
  route: string;
  /** Peta rute (WebP ringan di `public/routes/`; SVG sumber dijalankan ulang lewat `npm run optimize:routes`). */
  routeMapImageSrc: string;
  ageRule: string;
}

export const CATEGORY_DETAILS_ROWS: CategoryDetailRow[] = [
  {
    category: '10K Run',
    jarak: '10 km',
    typeLabel: 'Run',
    gradient: ['#10B981', '#059669'],
    pricing: {
      notaris: TICKET_PRICE_TIERS.notarisAll,
      public: TICKET_PRICE_TIERS.public10k,
    },
    racePack: ['Jersey', 'BIB', 'Finisher Medal', 'Refreshment'],
    route: 'Rute 10K EASTVARA BSD. File GPX menyusul.',
    routeMapImageSrc: '/routes/route-10k.webp',
    ageRule: 'Kategori umum: di bawah 45 tahun. Kategori Master: di atas 45 tahun.',
  },
  {
    category: '5K Run',
    jarak: '5 km',
    typeLabel: 'Run',
    gradient: ['#8B5CF6', '#3B82F6'],
    pricing: {
      notaris: TICKET_PRICE_TIERS.notarisAll,
      public: TICKET_PRICE_TIERS.public5k,
    },
    racePack: ['Jersey', 'BIB', 'Finisher Medal', 'Refreshment'],
    route: 'Rute 5K EASTVARA BSD. File GPX menyusul.',
    routeMapImageSrc: '/routes/route-5k.webp',
    ageRule: 'Kategori umum: di bawah 45 tahun. Kategori Master: di atas 45 tahun.',
  },
  {
    category: 'Fun Walk',
    jarak: '2,5 km',
    typeLabel: 'Fun Walk',
    gradient: ['#A855F7', '#EC4899'],
    pricing: {
      notaris: TICKET_PRICE_TIERS.notarisAll,
      public: TICKET_PRICE_TIERS.public25k,
    },
    racePack: ['Jersey', 'BIB', 'Finisher Medal', 'Refreshment'],
    route: 'Rute Fun Walk 2,5K EASTVARA BSD.',
    routeMapImageSrc: '/routes/route-2-5k.webp',
    ageRule: 'Kategori umum: di bawah 45 tahun. Kategori Master: di atas 45 tahun.',
  },
];

export const FAQ_PLACEHOLDERS: { q: string; a: string }[] = [
  {
    q: 'Kapan jadwal pendaftaran Notarace 2026?',
    a:
      'Pendaftaran dibuka 3 Mei – 12 Juli 2026; batas akhir (hari terakhir) 12 Juli 2026.',
  },
  {
    q: 'Apa saja aktivitas yang bisa dinikmati peserta?',
    a:
      `Notarace menghadirkan 10K, 5K, dan Fun Walk 2,5K untuk Umum (Public), serta tier ${NOTARIS_ALB_CATEGORY_LABEL} pada ketiga jarak, plus INI Cheering, Concert, Talkshow, Workout, Fun Games & Challenge, serta Bazzar di area EASTVARA BSD.`,
  },
  {
    q: 'Apa saja yang didapat finisher di garis finis?',
    a:
      'Setiap finisher mendapatkan refreshment (pisang, isotonic, air mineral) dan finisher medal setelah masuk garis finish.',
  },
  {
    q: `Apa keuntungan ikut sebagai peserta ${NOTARIS_ALB_CATEGORY_LABEL}?`,
    a:
      `Peserta ${NOTARIS_ALB_CATEGORY_LABEL} yang menyelesaikan NOTARACE dan terdaftar pada kategori yang sesuai berhak mendapat 6 poin notaris, sesuai ketentuan dan mekanisme di portal INI.`,
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
    description: `Pendaftaran 10K, 5K, dan Fun Walk 2,5K untuk Umum (Public); tier ${NOTARIS_ALB_CATEGORY_LABEL} tersedia untuk ketiga jarak.`,
    status: 'upcoming' as const,
  },
  {
    title: 'Pendaftaran Ditutup',
    date: '12 Juli 2026',
    description:
      'Batas akhir pendaftaran Notarace 2026 (12 Juli 2026). Pastikan kamu sudah amankan slot pada atau sebelum tanggal ini.',
    status: 'upcoming' as const,
  },
  {
    title: 'Race Pack Collection',
    date: '24–25 Juli 2026',
    description: 'Pengambilan race pack di EASTVARA BSD pukul 09.00–20.00 WIB selama 2 hari, dengan rangkaian Fest & Expo.',
    status: 'upcoming' as const,
  },
  {
    title: 'Race Day',
    date: EVENT_META.raceDateLabel,
    description: 'Hari pelaksanaan Notarace 2026 di EASTVARA BSD: opening, race, awarding, talkshow, dan entertainment.',
    status: 'upcoming' as const,
  },
  {
    title: 'Pelaporan, Sertifikat & Foto Digital',
    date: '27 Juli – 29 Agustus 2026',
    description: 'Periode pelaporan event, distribusi sertifikat digital, dan unduhan foto keseruan peserta.',
    status: 'upcoming' as const,
  },
];
