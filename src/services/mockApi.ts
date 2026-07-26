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
};
