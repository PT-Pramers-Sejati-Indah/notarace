/**
 * NOTARACE 2026 — konten situs (termasuk placeholder untuk informasi yang belum final).
 */

export const EVENT_META = {
  name: 'NOTARACE 2026',
  taglinePlaceholder:
    'Tagline resmi akan diumumkan — pantau @notarace.id untuk info terbaru.',
  edition: 'Edisi ke-2',
  story:
    'Acara ini diadakan dalam rangka memperingati Hari Ulang Tahun Ikatan Notaris Indonesia (INI) ke-118.',
  raceDateLabel: '26 Juli 2026',
  raceTimePlaceholder: 'Waktu pelaksanaan menyusul',
  raceStartISO: '2026-07-26T06:00:00+07:00',
  venueShort: 'Eastvara — BSD City',
  venueAddress:
    'Jl. BSD Boulevard Utara, Cijantra, Pagedangan, Kabupaten Tangerang, Banten 15345',
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Eastvara+BSD+Boulevard+Utara',
  googleMapsEmbedUrl:
    'https://maps.google.com/maps?q=Eastvara+BSD+Boulevard+Utara+BSD+City&t=&z=15&ie=UTF8&iwloc=&output=embed',
  topBanner: '26 JULI 2026 • EASTVARA BSD CITY',
  instagramUrl: 'https://instagram.com/notarace.id',
  instagramHandle: '@notarace.id',
  tiktokPlaceholder: 'TikTok — akun resmi menyusul',
  emailPlaceholder: 'Email panitia — menyusul',
  whatsappPlaceholder: 'WhatsApp panitia — menyusul',
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
    'Kebijakan refund & pembatalan menyusul — akan dipublikasikan bersama channel pendaftaran resmi.',
  latePricePlaceholder: 'Harga periode late registration menyusul.',
  footerTagline: 'Meriahkan HUT INI ke-118 — edisi kedua.',
} as const;

export const PRICING_NOTARIS_IDR = {
  earlyBird: 475_000,
  normal: 650_000,
  late: null as number | null,
} as const;

/** Dasar perhitungan alur checkout demo (periode early bird). */
export const MOCK_CHECKOUT_BASE_PRICE_IDR = PRICING_NOTARIS_IDR.earlyBird;

export const RACE_PACK_ITEMS: readonly string[] = ['Jersey', 'Medali'];

export type RaceCategoryKey = '2.5K' | '5K' | '10K';

export interface RaceCategoryCard {
  key: RaceCategoryKey;
  headline: string;
  subline: string;
  gradient: [string, string];
  shadowColor: string;
  middleBg: string;
  accentHex: string;
  borderHex: string;
}

export const RACE_CATEGORY_CARDS: RaceCategoryCard[] = [
  {
    key: '2.5K',
    headline: '2,5K',
    subline: 'FUN WALK',
    gradient: ['#A855F7', '#EC4899'],
    shadowColor: '#E8492B',
    middleBg: '#FFF5F1',
    accentHex: '#E8492B',
    borderHex: '#F5A623',
  },
  {
    key: '5K',
    headline: '5K',
    subline: 'RUN',
    gradient: ['#8B5CF6', '#3B82F6'],
    shadowColor: '#1E3A8A',
    middleBg: '#EFF6FF',
    accentHex: '#2563EB',
    borderHex: '#3B82F6',
  },
  {
    key: '10K',
    headline: '10K',
    subline: 'RUN',
    gradient: ['#10B981', '#059669'],
    shadowColor: '#064E3B',
    middleBg: '#ECFDF5',
    accentHex: '#059669',
    borderHex: '#10B981',
  },
];

export const CATEGORY_DETAILS_ROWS: { category: string; jarak: string; cutoff: string }[] = [
  { category: '10K Run', jarak: '10 km', cutoff: 'Menyusul' },
  { category: '5K Run', jarak: '5 km', cutoff: 'Menyusul' },
  { category: 'Fun Walk', jarak: '2,5 km', cutoff: 'Menyusul' },
];

export const FAQ_PLACEHOLDERS: { q: string; a: string }[] = [
  {
    q: 'Kapan FAQ lengkap tersedia?',
    a: 'Daftar pertanyaan umum akan dipublikasikan bersama tagline resmi dan link pendaftaran.',
  },
  {
    q: 'Kapan batas pendaftaran?',
    a:
      'Batas waktu pendaftaran menyusul — akan diumumkan di kanal resmi @notarace.id.',
  },
  {
    q: 'Bagaimana kebijakan refund dan pembatalan?',
    a:
      'Kebijakan refund & pembatalan menyusul — akan dipublikasikan bersama channel pendaftaran resmi.',
  },
];

export const SPONSOR_TIER_PLACEHOLDERS: { tier: string; note: string }[] = [
  { tier: 'Title Sponsor', note: 'Logo & nama — menyusul' },
  { tier: 'Official Partner', note: 'Logo & nama — menyusul' },
  { tier: 'Supporting Partner', note: 'Logo & nama — menyusul' },
];
