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
  category: "2.5K" | "5K" | "10K";
  gun_time: string;
  chip_time: string;
  pace: string;
  rank_overall: number;
  rank_category: number;
  status: "Finisher" | "DNF";
}

let mockResults: Result[] = [];
// let resultsPublished = false;

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
    const basePrice = data.category === '2.5K' ? 150000 : data.category === '5K' ? 250000 : 350000;
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
    // Try to find if user has a pending or completed order in localStorage for mocking
    const orderStr = localStorage.getItem('currentOrder');
    const paymentStatus = localStorage.getItem('paymentStatus');
    const order = orderStr ? JSON.parse(orderStr) : null;
    
    if (!order) return { state: 0 }; // Not registered for race yet
    if (paymentStatus !== 'success') return { state: 1, order }; // Registered, unpaid
    
    // Paid. Let's mock BIB assignment based on whether results are published or an admin flag is set
    // For MVP, we'll assign a BIB automatically if results are published or randomly mock it
    const bibAssigned = localStorage.getItem('bibAssigned') === 'true';
    if (!bibAssigned) return { state: 2, order }; // Paid, no BIB
    
    return { state: 3, order, bib: '10' + Math.floor(Math.random() * 999).toString().padStart(3, '0') }; 
  },
  
  publishResults: async (results: Result[]) => {
    await delay(1000);
    mockResults = results;
    // resultsPublished = true;
    localStorage.setItem('resultsPublished', 'true');
    localStorage.setItem('mockResults', JSON.stringify(results));
    return { success: true };
  },

  getResults: async () => {
    await delay(500);
    const pub = localStorage.getItem('resultsPublished') === 'true';
    if (!pub) return { published: false, results: [] };
    const res = localStorage.getItem('mockResults');
    return { published: true, results: res ? JSON.parse(res) : mockResults };
  }
};
