// Mock data for frontend-only mode

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalDebt: number;
  status: 'active' | 'inactive' | 'overdue';
  createdAt: string;
}

export interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOwed: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface DashboardStats {
  totalClients: number;
  totalVendors: number;
  totalDebt: number;
  totalOwed: number;
  overdueClients: number;
  recentTransactions: number;
  clientDebts: {
    total: number;
    active: number;
    overdue: number;
  };
  vendorDebts: {
    total: number;
    active: number;
    overdue: number;
  };
  summary: {
    totalClients: number;
    totalVendors: number;
    totalDebt: number;
    totalOwed: number;
    totalReceivable: number;
    totalPayable: number;
    netPosition: number;
  };
}

// Mock data
export const mockClients: Client[] = [
  {
    id: '1',
    name: 'أحمد محمد علي',
    email: 'ahmed.mohammed@example.com',
    phone: '+964770123456',
    totalDebt: 15000,
    status: 'active',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'فاطمة علي حسن',
    email: 'fatima.ali@example.com',
    phone: '+964771234567',
    totalDebt: 8500,
    status: 'overdue',
    createdAt: '2024-01-20T14:30:00Z',
  },
  {
    id: '3',
    name: 'محمد السعيد أحمد',
    email: 'mohammed.saeed@example.com',
    phone: '+964772345678',
    totalDebt: 12000,
    status: 'active',
    createdAt: '2024-02-01T09:15:00Z',
  },
  {
    id: '4',
    name: 'زينب حسام الدين',
    email: 'zainab.hussam@example.com',
    phone: '+964773456789',
    totalDebt: 22500,
    status: 'active',
    createdAt: '2024-02-05T11:20:00Z',
  },
  {
    id: '5',
    name: 'عمر خالد محمود',
    email: 'omar.khalid@example.com',
    phone: '+964774567890',
    totalDebt: 5750,
    status: 'overdue',
    createdAt: '2024-02-10T16:45:00Z',
  },
  {
    id: '6',
    name: 'سارة عبد الله',
    email: 'sara.abdullah@example.com',
    phone: '+964775678901',
    totalDebt: 18900,
    status: 'active',
    createdAt: '2024-02-15T08:30:00Z',
  },
  {
    id: '7',
    name: 'حسن علي رضا',
    email: 'hassan.ali@example.com',
    phone: '+964776789012',
    totalDebt: 31200,
    status: 'active',
    createdAt: '2024-02-20T13:15:00Z',
  },
  {
    id: '8',
    name: 'مريم أحمد صالح',
    email: 'mariam.ahmed@example.com',
    phone: '+964777890123',
    totalDebt: 9800,
    status: 'overdue',
    createdAt: '2024-02-25T10:00:00Z',
  },
  {
    id: '9',
    name: 'يوسف محمد كريم',
    email: 'youssef.mohammed@example.com',
    phone: '+964778901234',
    totalDebt: 14600,
    status: 'active',
    createdAt: '2024-03-01T14:20:00Z',
  },
  {
    id: '10',
    name: 'نور الهدى عباس',
    email: 'noor.huda@example.com',
    phone: '+964779012345',
    totalDebt: 27300,
    status: 'active',
    createdAt: '2024-03-05T09:45:00Z',
  },
];

export const mockVendors: Vendor[] = [
  {
    id: '1',
    name: 'شركة التوريدات المتقدمة',
    email: 'info@advanced-supplies.com',
    phone: '+964750123456',
    totalOwed: 25000,
    status: 'active',
    createdAt: '2024-01-10T08:00:00Z',
  },
  {
    id: '2',
    name: 'مؤسسة الخدمات التجارية',
    email: 'contact@business-services.com',
    phone: '+964751234567',
    totalOwed: 18500,
    status: 'active',
    createdAt: '2024-01-25T11:45:00Z',
  },
  {
    id: '3',
    name: 'شركة الإمدادات الذكية',
    email: 'sales@smart-supplies.com',
    phone: '+964752345678',
    totalOwed: 32800,
    status: 'active',
    createdAt: '2024-02-01T12:30:00Z',
  },
  {
    id: '4',
    name: 'مجموعة التقنيات الحديثة',
    email: 'info@modern-tech.com',
    phone: '+964753456789',
    totalOwed: 15600,
    status: 'active',
    createdAt: '2024-02-08T09:15:00Z',
  },
  {
    id: '5',
    name: 'شركة المواد الأولية',
    email: 'orders@raw-materials.com',
    phone: '+964754567890',
    totalOwed: 41200,
    status: 'active',
    createdAt: '2024-02-12T15:45:00Z',
  },
  {
    id: '6',
    name: 'مؤسسة الحلول المتكاملة',
    email: 'contact@integrated-solutions.com',
    phone: '+964755678901',
    totalOwed: 28900,
    status: 'active',
    createdAt: '2024-02-18T11:20:00Z',
  },
  {
    id: '7',
    name: 'شركة الأجهزة المتخصصة',
    email: 'info@specialized-equipment.com',
    phone: '+964756789012',
    totalOwed: 19750,
    status: 'active',
    createdAt: '2024-02-22T14:00:00Z',
  },
  {
    id: '8',
    name: 'مجموعة الخدمات اللوجستية',
    email: 'logistics@supply-chain.com',
    phone: '+964757890123',
    totalOwed: 36400,
    status: 'active',
    createdAt: '2024-02-28T10:30:00Z',
  },
  {
    id: '9',
    name: 'شركة التجهيزات الصناعية',
    email: 'sales@industrial-equipment.com',
    phone: '+964758901234',
    totalOwed: 23100,
    status: 'active',
    createdAt: '2024-03-03T16:15:00Z',
  },
  {
    id: '10',
    name: 'مؤسسة الابتكار التقني',
    email: 'innovation@tech-solutions.com',
    phone: '+964759012345',
    totalOwed: 44800,
    status: 'active',
    createdAt: '2024-03-08T13:45:00Z',
  },
];

export const mockDashboardStats: DashboardStats = {
  totalClients: mockClients.length,
  totalVendors: mockVendors.length,
  totalDebt: mockClients.reduce((sum, client) => sum + client.totalDebt, 0),
  totalOwed: mockVendors.reduce((sum, vendor) => sum + vendor.totalOwed, 0),
  overdueClients: mockClients.filter(client => client.status === 'overdue').length,
  recentTransactions: 12,
  clientDebts: {
    total: mockClients.reduce((sum, client) => sum + client.totalDebt, 0),
    active: mockClients.filter(client => client.status === 'active').length,
    overdue: mockClients.filter(client => client.status === 'overdue').length,
  },
  vendorDebts: {
    total: mockVendors.reduce((sum, vendor) => sum + vendor.totalOwed, 0),
    active: mockVendors.filter(vendor => vendor.status === 'active').length,
    overdue: 0, // No overdue vendors in current mock data
  },
  summary: {
    totalClients: mockClients.length,
    totalVendors: mockVendors.length,
    totalDebt: mockClients.reduce((sum, client) => sum + client.totalDebt, 0),
    totalOwed: mockVendors.reduce((sum, vendor) => sum + vendor.totalOwed, 0),
    totalReceivable: mockClients.reduce((sum, client) => sum + client.totalDebt, 0), // Money we should receive from clients
    totalPayable: mockVendors.reduce((sum, vendor) => sum + vendor.totalOwed, 0), // Money we owe to vendors
    netPosition: mockClients.reduce((sum, client) => sum + client.totalDebt, 0) - mockVendors.reduce((sum, vendor) => sum + vendor.totalOwed, 0), // Net financial position
  },
};

// Mock API functions
export const mockAPI = {
  getDashboard: () => Promise.resolve(mockDashboardStats),
  getClients: () => Promise.resolve(mockClients),
  getVendors: () => Promise.resolve(mockVendors),
  
  // Simulate API delay
  delay: (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms)),
};