export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  productService: string;
  enquiryType: 'buy' | 'rent' | 'repair' | 'amc' | 'other';
  message: string;
  status: 'new' | 'in-progress' | 'closed';
  createdAt: string;
}

export const leads: Lead[] = [
  {
    id: 'lead-1',
    name: 'Vikram Singh',
    email: 'vikram@techcorp.com',
    phone: '+91 98765 11111',
    productService: '8-Channel NVR System',
    enquiryType: 'buy',
    message: 'We need 4 NVR systems for our new office building.',
    status: 'new',
    createdAt: '2024-12-10T10:30:00',
  },
  {
    id: 'lead-2',
    name: 'Sunita Menon',
    email: 'sunita@eduschool.org',
    phone: '+91 98765 22222',
    productService: 'Fingerprint Attendance System',
    enquiryType: 'buy',
    message: 'Looking for biometric systems for 500+ students and staff.',
    status: 'in-progress',
    createdAt: '2024-12-08T14:15:00',
  },
  {
    id: 'lead-3',
    name: 'Rahul Kapoor',
    email: 'rahul@startupinc.io',
    phone: '+91 98765 33333',
    productService: 'Business Laptop i5',
    enquiryType: 'rent',
    message: 'Need 20 laptops for our team for 6 months.',
    status: 'new',
    createdAt: '2024-12-12T09:45:00',
  },
  {
    id: 'lead-4',
    name: 'Meera Joshi',
    email: 'meera@manufacturing.co',
    phone: '+91 98765 44444',
    productService: 'Vehicle GPS Tracker',
    enquiryType: 'buy',
    message: 'Fleet tracking for 15 delivery vehicles.',
    status: 'closed',
    createdAt: '2024-12-01T11:20:00',
  },
  {
    id: 'lead-5',
    name: 'Arjun Nair',
    email: 'arjun@hospital.care',
    phone: '+91 98765 55555',
    productService: 'Tower Server Entry',
    enquiryType: 'repair',
    message: 'Server not booting, need urgent repair.',
    status: 'in-progress',
    createdAt: '2024-12-11T16:00:00',
  },
];

export const getLeadsByStatus = (status: Lead['status']) => {
  return leads.filter(l => l.status === status);
};

export const getLeadStats = () => {
  return {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    inProgress: leads.filter(l => l.status === 'in-progress').length,
    closed: leads.filter(l => l.status === 'closed').length,
    byType: {
      buy: leads.filter(l => l.enquiryType === 'buy').length,
      rent: leads.filter(l => l.enquiryType === 'rent').length,
      repair: leads.filter(l => l.enquiryType === 'repair').length,
      amc: leads.filter(l => l.enquiryType === 'amc').length,
      other: leads.filter(l => l.enquiryType === 'other').length,
    },
  };
};
