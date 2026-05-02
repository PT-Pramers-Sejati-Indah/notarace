import { MOCK_CHECKOUT_BASE_PRICE_IDR } from '../data/eventInfo';

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export type Role = 'guest' | 'participant' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  phone?: string;
  dob?: string;
}

export interface Result {
  bib_number: string;
  participant_name: string;
  category: '2.5K' | '5K' | '10K';
  gun_time: string;
  chip_time: string;
  pace: string;
  rank_overall: number;
  rank_category: number;
  status: 'Finisher' | 'DNF';
}

// ---------------------------------------------------------------------------
// Seeded mock results — realistic across all 3 categories
// ---------------------------------------------------------------------------
const SEED_RESULTS: Result[] = [
  // ── 10K ──────────────────────────────────────────────────────────────────
  { bib_number: '1001', participant_name: 'Andi Prasetyo', category: '10K', gun_time: '0:48:12', chip_time: '0:48:02', pace: '4:49/km', rank_overall: 1,  rank_category: 1,  status: 'Finisher' },
  { bib_number: '1002', participant_name: 'Budi Santoso',  category: '10K', gun_time: '0:50:34', chip_time: '0:50:22', pace: '5:03/km', rank_overall: 2,  rank_category: 2,  status: 'Finisher' },
  { bib_number: '1003', participant_name: 'Citra Dewi',    category: '10K', gun_time: '0:53:11', chip_time: '0:53:00', pace: '5:18/km', rank_overall: 3,  rank_category: 3,  status: 'Finisher' },
  { bib_number: '1004', participant_name: 'Dian Kurniawan',category: '10K', gun_time: '0:55:40', chip_time: '0:55:28', pace: '5:33/km', rank_overall: 5,  rank_category: 4,  status: 'Finisher' },
  { bib_number: '1005', participant_name: 'Eka Putri',     category: '10K', gun_time: '0:57:05', chip_time: '0:56:55', pace: '5:41/km', rank_overall: 6,  rank_category: 5,  status: 'Finisher' },
  { bib_number: '1006', participant_name: 'Fajar Nugroho', category: '10K', gun_time: '1:02:18', chip_time: '1:02:05', pace: '6:13/km', rank_overall: 9,  rank_category: 6,  status: 'Finisher' },
  { bib_number: '1007', participant_name: 'Gita Sari',     category: '10K', gun_time: '1:08:44', chip_time: '1:08:30', pace: '6:51/km', rank_overall: 12, rank_category: 7,  status: 'Finisher' },
  { bib_number: '1008', participant_name: 'Hendra Wijaya', category: '10K', gun_time: '1:15:22', chip_time: '1:15:10', pace: '7:31/km', rank_overall: 15, rank_category: 8,  status: 'Finisher' },
  { bib_number: '1009', participant_name: 'Indah Lestari', category: '10K', gun_time: '1:22:09', chip_time: '1:21:55', pace: '8:12/km', rank_overall: 18, rank_category: 9,  status: 'Finisher' },
  { bib_number: '1010', participant_name: 'Joko Prabowo',  category: '10K', gun_time: '0:00:00', chip_time: '0:00:00', pace: '—',       rank_overall: 999, rank_category: 999, status: 'DNF' },

  // ── 5K ───────────────────────────────────────────────────────────────────
  { bib_number: '2001', participant_name: 'Kartika Ayu',   category: '5K',  gun_time: '0:23:44', chip_time: '0:23:38', pace: '4:44/km', rank_overall: 4,  rank_category: 1,  status: 'Finisher' },
  { bib_number: '2002', participant_name: 'Lukman Hakim',  category: '5K',  gun_time: '0:25:10', chip_time: '0:25:04', pace: '5:01/km', rank_overall: 7,  rank_category: 2,  status: 'Finisher' },
  { bib_number: '2003', participant_name: 'Maya Anggraeni', category: '5K', gun_time: '0:26:55', chip_time: '0:26:48', pace: '5:22/km', rank_overall: 8,  rank_category: 3,  status: 'Finisher' },
  { bib_number: '2004', participant_name: 'Novan Setiadi',  category: '5K', gun_time: '0:28:30', chip_time: '0:28:22', pace: '5:40/km', rank_overall: 10, rank_category: 4,  status: 'Finisher' },
  { bib_number: '2005', participant_name: 'Olivia Rahma',   category: '5K', gun_time: '0:30:12', chip_time: '0:30:05', pace: '6:01/km', rank_overall: 11, rank_category: 5,  status: 'Finisher' },
  { bib_number: '2006', participant_name: 'Panji Wibowo',   category: '5K', gun_time: '0:33:40', chip_time: '0:33:31', pace: '6:42/km', rank_overall: 13, rank_category: 6,  status: 'Finisher' },
  { bib_number: '2007', participant_name: 'Qori Nasution',  category: '5K', gun_time: '0:36:18', chip_time: '0:36:09', pace: '7:14/km', rank_overall: 14, rank_category: 7,  status: 'Finisher' },
  { bib_number: '2008', participant_name: 'Rina Marliana',  category: '5K', gun_time: '0:39:55', chip_time: '0:39:45', pace: '7:57/km', rank_overall: 16, rank_category: 8,  status: 'Finisher' },
  { bib_number: '2009', participant_name: 'Surya Atmaja',   category: '5K', gun_time: '0:44:02', chip_time: '0:43:50', pace: '8:46/km', rank_overall: 19, rank_category: 9,  status: 'Finisher' },
  { bib_number: '2010', participant_name: 'Tari Kusuma',    category: '5K', gun_time: '0:48:30', chip_time: '0:48:20', pace: '9:40/km', rank_overall: 22, rank_category: 10, status: 'Finisher' },

  // ── 2.5K (Fun Walk) ──────────────────────────────────────────────────────
  { bib_number: '3001', participant_name: 'Umar Bakri',     category: '2.5K', gun_time: '0:18:05', chip_time: '0:18:00', pace: '7:12/km', rank_overall: 17, rank_category: 1,  status: 'Finisher' },
  { bib_number: '3002', participant_name: 'Vina Oktavia',   category: '2.5K', gun_time: '0:20:30', chip_time: '0:20:22', pace: '8:09/km', rank_overall: 20, rank_category: 2,  status: 'Finisher' },
  { bib_number: '3003', participant_name: 'Wahyu Pratama',  category: '2.5K', gun_time: '0:21:44', chip_time: '0:21:35', pace: '8:38/km', rank_overall: 21, rank_category: 3,  status: 'Finisher' },
  { bib_number: '3004', participant_name: 'Xena Maulida',   category: '2.5K', gun_time: '0:23:18', chip_time: '0:23:10', pace: '9:16/km', rank_overall: 23, rank_category: 4,  status: 'Finisher' },
  { bib_number: '3005', participant_name: 'Yusuf Hamdani',  category: '2.5K', gun_time: '0:25:02', chip_time: '0:24:55', pace: '9:58/km', rank_overall: 24, rank_category: 5,  status: 'Finisher' },
  { bib_number: '3006', participant_name: 'Zahra Fitria',   category: '2.5K', gun_time: '0:27:30', chip_time: '0:27:20', pace: '10:56/km', rank_overall: 25, rank_category: 6, status: 'Finisher' },
  { bib_number: '3007', participant_name: 'Agus Salim',     category: '2.5K', gun_time: '0:29:11', chip_time: '0:29:00', pace: '11:36/km', rank_overall: 26, rank_category: 7, status: 'Finisher' },
  { bib_number: '3008', participant_name: 'Baiq Nurhaliza', category: '2.5K', gun_time: '0:32:40', chip_time: '0:32:30', pace: '13:00/km', rank_overall: 27, rank_category: 8, status: 'Finisher' },
  { bib_number: '3009', participant_name: 'Cahyo Bintoro',  category: '2.5K', gun_time: '0:35:10', chip_time: '0:35:00', pace: '14:00/km', rank_overall: 28, rank_category: 9, status: 'Finisher' },
  { bib_number: '3010', participant_name: 'Dewi Fortuna',   category: '2.5K', gun_time: '0:40:05', chip_time: '0:39:55', pace: '15:58/km', rank_overall: 29, rank_category: 10, status: 'Finisher' },
];

let mockResults: Result[] = SEED_RESULTS;

export const mockApi = {
  login: async (email: string, _password: string): Promise<User> => {
    await delay(1000);
    if (email === 'admin@notarace.com') {
      return { id: 'admin_1', name: 'Admin', email, role: 'admin' };
    }
    return { id: 'user_' + Math.random().toString(36).substr(2, 9), name: email.split('@')[0], email, role: 'participant' };
  },

  register: async (data: any): Promise<User> => {
    await delay(1200);
    return { id: 'user_' + Math.random().toString(36).substr(2, 9), role: 'participant', ...data };
  },

  submitOrder: async (data: any) => {
    await delay(1000);
    const basePrice = MOCK_CHECKOUT_BASE_PRICE_IDR;
    const ppn = basePrice * 0.11;
    const serviceFee = 5000;
    return {
      orderId: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      amount: basePrice + ppn + serviceFee,
      basePrice,
      ppn,
      serviceFee,
      ...data
    };
  },

  processPayment: async (orderId: string) => {
    await delay(2000);
    return {
      success: true,
      orderId,
      transactionId: 'MAYAR-' + Math.random().toString(36).substr(2, 9).toUpperCase()
    };
  },

  getProfileState: async (_userId: string) => {
    await delay(800);
    const orderStr = localStorage.getItem('currentOrder');
    const paymentStatus = localStorage.getItem('paymentStatus');
    const order = orderStr ? JSON.parse(orderStr) : null;

    if (!order) return { state: 0 };
    if (paymentStatus !== 'success') return { state: 1, order };

    const bibAssigned = localStorage.getItem('bibAssigned') === 'true';
    if (!bibAssigned) return { state: 2, order };

    return { state: 3, order, bib: '10' + Math.floor(Math.random() * 999).toString().padStart(3, '0') };
  },

  publishResults: async (results: Result[]) => {
    await delay(1000);
    mockResults = results;
    localStorage.setItem('resultsPublished', 'true');
    localStorage.setItem('mockResults', JSON.stringify(results));
    return { success: true };
  },

  getResults: async () => {
    await delay(500);
    // If someone has manually published via admin, prefer that data.
    const manuallyPublished = localStorage.getItem('resultsPublished') === 'true';
    if (manuallyPublished) {
      const stored = localStorage.getItem('mockResults');
      return { published: true, results: stored ? JSON.parse(stored) : mockResults };
    }
    // Otherwise always return the seeded data so the Results page works in dev.
    return { published: true, results: mockResults };
  },
};
