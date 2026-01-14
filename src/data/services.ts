export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  image: string;
}

export const services: Service[] = [
  {
    id: 'new-sales',
    title: 'New Product Sales',
    description: 'Get the latest IT hardware and security equipment from top brands with warranty and after-sales support.',
    icon: '🛒',
    features: [
      'Genuine products from authorized dealers',
      'Manufacturer warranty included',
      'Professional installation available',
      'Technical support and training',
      'Competitive pricing',
    ],
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600',
  },
  {
    id: 'refurbished',
    title: 'Refurbished Products',
    description: 'Quality refurbished IT equipment at budget-friendly prices, fully tested and certified.',
    icon: '♻️',
    features: [
      'Thoroughly tested and certified',
      '6-month warranty on all items',
      'Up to 50% savings vs new',
      'Environmentally responsible',
      'Same-day availability',
    ],
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600',
  },
  {
    id: 'repair',
    title: 'Repair & AMC Services',
    description: 'Expert repair services and Annual Maintenance Contracts to keep your equipment running smoothly.',
    icon: '🔧',
    features: [
      'Certified technicians',
      'Quick turnaround time',
      'Genuine spare parts',
      'On-site and off-site support',
      'Preventive maintenance',
    ],
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600',
  },
  {
    id: 'rental',
    title: 'Rental Services',
    description: 'Flexible rental options for short-term projects, events, or businesses that need scalability.',
    icon: '📋',
    features: [
      'Daily, weekly, monthly plans',
      'Latest equipment available',
      'Technical support included',
      'Easy upgrade options',
      'No heavy upfront investment',
    ],
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600',
  },
];

export const industries = [
  { name: 'Corporate Offices', icon: '🏢' },
  { name: 'Educational Institutions', icon: '🏫' },
  { name: 'Healthcare Facilities', icon: '🏥' },
  { name: 'Retail & Showrooms', icon: '🏪' },
  { name: 'Manufacturing Plants', icon: '🏭' },
  { name: 'Government Offices', icon: '🏛️' },
  { name: 'Banks & Finance', icon: '🏦' },
  { name: 'Hospitality', icon: '🏨' },
];
