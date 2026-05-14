/**
 * NOTARACE 2026 - konten situs (selaras dengan checklist konten resmi / Notarace Web Checklist.xlsx).
 */

/** Tautan Google Maps venue (sumber: checklist). */
const GOOGLE_MAPS_EVENT_URL =
  'https://www.google.com/maps/place/Eastvara+Mall,+Jl.+BSD+Boulevard+Utara,+Cijantra,+Kec.+Pagedangan,+Kabupaten+Tangerang,+Banten+15345/@-6.2956222,106.6173419,11554m/data=!3m1!1e3!4m6!3m5!1s0x2e69fcb9ede8d89d:0x2333525b3811c631!8m2!3d-6.2948187!4d106.6106415!16s%2Fg%2F11y3lkf1ty?authuser=0&entry=ttu&g_ep=EgoyMDI2MDQyNy4wIKXMDSoASAFQAw%3D%3D';

/** Materi peta rute (PNG/GPX/deck) — sumber: checklist. */
export const ROUTE_OFFICIAL_DECK_URL = 'https://canva.link/z9kt6pkv4x4z1am' as const;

export const EVENT_META = {
  name: 'NOTARACE 2026',
  taglinePlaceholder: 'Legal Precision, Racing Passion.',
  /** Tagline kedua (checklist). */
  taglineSecondary: 'Tepat di Atas Kertas, Cepat di Atas Lintasan.',
  edition: 'Edisi ke-2',
  story:
    'Legal Precision mengajarkan kita bahwa setiap langkah harus terukur, setiap nafas harus diatur, dan setiap aturan harus dipatuhi. Namun, Racing Passion adalah yang menggerakkan kaki kita saat otot mulai lelah. Di Notarace ini, kita membuktikan bahwa Notaris bukan hanya teliti di balik meja, tapi juga tangguh di atas lintasan. Mari kita berlari dengan presisi, dan finis dengan gairah!',
  raceDateLabel: '26 Juli 2026',
  /** Rentang waktu acara (checklist: 05.00 - 12.00). */
  raceTimePlaceholder: '05.00 – 12.00 WIB',
  /** Awal jendela hari-H untuk hitung mundur (sesuai waktu mulai checklist). */
  raceStartISO: '2026-07-26T05:00:00+07:00',
  venueShort: 'EASTVARA BSD',
  venueAddress:
    'Eastvara Mall, Jl. BSD Boulevard Utara, Cijantra, Pagedangan, Kabupaten Tangerang, Banten 15345',
  googleMapsUrl: GOOGLE_MAPS_EVENT_URL,
  googleMapsEmbedUrl:
    'https://maps.google.com/maps?q=-6.2948187,106.6106415&z=16&ie=UTF8&iwloc=&output=embed',
  topBanner: '26 JULI 2026 • EASTVARA BSD',
  instagramUrl: 'https://instagram.com/notarace.id',
  /** Checklist: notarace.id */
  instagramHandle: 'notarace.id',
  tiktokPlaceholder: 'TikTok (akun resmi menyusul)',
  emailPlaceholder: 'informasi@notarace.id',
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
    'Berlangsung 2 hari di EASTVARA BSD, pukul 09.00–20.00 WIB.',
    'Peserta wajib membawa email konfirmasi pendaftaran dan identitas diri (KTP/SIM).',
    'Tersedia juga talkshow, notary consultation, Fitness Day Fest (Zumba & Pound Fit), pop-up booth, serta fun games & challenge.',
  ] as const,
  parkingPlaceholder: 'Informasi parkir menyusul.',
  /** Lokasi titik kumpul & start (kartu logistik). */
  assemblyLocationLine: 'Titik kumpul & start di EASTVARA BSD.',
  /** Baris jadwal hari-H: label singkat + waktu (tampil sebagai tabel). */
  assemblyScheduleRows: [
    { label: 'Opening ceremony', time: '05.30 WIB' },
    { label: 'Flag-off 10K', time: '05.55 WIB' },
    { label: 'Flag-off 5K', time: '06.00 WIB' },
    { label: 'Flag-off Fun Walk 2,5K', time: '06.05 WIB' },
  ] as const,
  routePlaceholder: `Materi peta rute (PNG/GPX/deck): ${ROUTE_OFFICIAL_DECK_URL}`,
  ageRulesPlaceholder:
    'Notaris: 2,5K/5K/10K; Umum: 5K/10K; Master: di atas 45 tahun.',
  registrationDeadlinePlaceholder:
    'Pendaftaran 3 Mei – 12 Juli 2026. Batas waktu pendaftaran: 12 Juli 2026.',
  refundPolicyPlaceholder:
    'Kebijakan refund & pembatalan menyusul, akan dipublikasikan bersama channel pendaftaran resmi.',
  footerTagline: 'Legal Precision, Racing Passion. • Tepat di Atas Kertas, Cepat di Atas Lintasan.',
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
 * Umum: hanya 10K dan 5K (Fun Walk 2,5K tidak dijual untuk Umum).
 */
export const TICKET_PRICE_TIERS = {
  notarisAll: { earlyBird: 475_000, normal: 650_000 },
  public10k: { earlyBird: 300_000, normal: 350_000 },
  /** Hanya untuk jarak 5K (Umum); tidak berlaku untuk Fun Walk 2,5K. */
  public5k: { earlyBird: 200_000, normal: 250_000 },
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
] as const;

export type TicketPricingRow = (typeof TICKET_PRICING_ROWS)[number];

/** Referensi demo checkout (Notaris & ALB, periode early bird). */
export const PRICING_NOTARIS_IDR = {
  earlyBird: TICKET_PRICE_TIERS.notarisAll.earlyBird,
  normal: TICKET_PRICE_TIERS.notarisAll.normal,
} as const;

/** Dasar perhitungan alur checkout demo (periode early bird). */
export const MOCK_CHECKOUT_BASE_PRICE_IDR = PRICING_NOTARIS_IDR.earlyBird;

/** Isi race pack (sumber: checklist). */
const RACE_PACK_ITEMS = ['Medali', 'Jersey', 'tas'] as const;

/** Ketentuan kategori jarak & master (sumber: checklist). */
const KETENTUAN_KATEGORI_LOMBA =
  'Notaris: 2,5K/5K/10K; Umum: 5K/10K; Master: di atas 45 tahun.' as const;

export interface CategoryDetailRow {
  category: string;
  jarak: string;
  cutoff: string;
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
    cutoff: 'Menyusul',
    typeLabel: 'Run',
    gradient: ['#10B981', '#059669'],
    pricing: {
      notaris: TICKET_PRICE_TIERS.notarisAll,
      public: TICKET_PRICE_TIERS.public10k,
    },
    racePack: [...RACE_PACK_ITEMS],
    route: `Rute 10K, EASTVARA BSD. Materi peta/gambar: ${ROUTE_OFFICIAL_DECK_URL}`,
    routeMapImageSrc: '/routes/route-10k.webp',
    ageRule: KETENTUAN_KATEGORI_LOMBA,
  },
  {
    category: '5K Run',
    jarak: '5 km',
    cutoff: 'Menyusul',
    typeLabel: 'Run',
    gradient: ['#8B5CF6', '#3B82F6'],
    pricing: {
      notaris: TICKET_PRICE_TIERS.notarisAll,
      public: TICKET_PRICE_TIERS.public5k,
    },
    racePack: [...RACE_PACK_ITEMS],
    route: `Rute 5K, EASTVARA BSD. Materi peta/gambar: ${ROUTE_OFFICIAL_DECK_URL}`,
    routeMapImageSrc: '/routes/route-5k.webp',
    ageRule: KETENTUAN_KATEGORI_LOMBA,
  },
  {
    category: 'Fun Walk',
    jarak: '2,5 km',
    cutoff: 'Menyusul',
    typeLabel: 'Fun Walk',
    gradient: ['#A855F7', '#EC4899'],
    pricing: {
      notaris: TICKET_PRICE_TIERS.notarisAll,
      public: null,
    },
    racePack: [...RACE_PACK_ITEMS],
    route: `Rute Fun Walk 2,5K, EASTVARA BSD. Materi peta/gambar: ${ROUTE_OFFICIAL_DECK_URL}`,
    routeMapImageSrc: '/routes/route-2-5k.webp',
    ageRule: KETENTUAN_KATEGORI_LOMBA,
  },
];

export const FAQ_PLACEHOLDERS: { q: string; a: string }[] = [
  {
    q: 'FAQ',
    a: 'on progress.',
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
    description: `Pendaftaran 10K dan 5K untuk Umum (Public); Fun Walk 2,5K hanya untuk ${NOTARIS_ALB_CATEGORY_LABEL}.`,
    status: 'upcoming' as const,
  },
  {
    title: 'Pendaftaran Ditutup',
    date: '12 Juli 2026',
    description: 'Batas waktu pendaftaran NOTARACE 2026 (12 Juli 2026). Pastikan slot dan pembayaran kamu sudah beres sebelum tanggal ini.',
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
