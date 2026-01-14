export const company = {
  name: 'Y.A.N.T.R.A.Q. Pvt. Ltd.',
  shortName: 'YANTRAQ',
  tagline: 'Yield-Driven Advanced Networked Technology Research Quotient',
  description: 'Your trusted partner for enterprise IT hardware sales, services, and rental solutions. From CCTV surveillance and biometric systems to servers and networking infrastructure — we deliver comprehensive IT solutions for businesses of all sizes.',
  sisterCompany: 'PushpakO2',
  domain: 'https://yantraq.com',
  
  contact: {
    emails: {
      sales: 'connect@yantraq.com',
      support: 'reply@yantraq.com',
    },
    phone: '+91 98765 43210',
    whatsapp: '919876543210',
  },
  
  address: {
    line1: '2nd Floor, 1, Aadi Parishar',
    line2: 'Bagsewaniya, Sant Ashram Nagar',
    line3: 'BHEL Sangam Colony, Phase-2',
    city: 'Bhopal',
    state: 'Madhya Pradesh',
    country: 'India',
    full: '2nd Floor, 1, Aadi Parishar, Bagsewaniya, Sant Ashram Nagar, BHEL Sangam Colony, Phase-2, Bhopal, Madhya Pradesh, India',
  },
  
  businessHours: {
    days: 'Monday - Saturday',
    time: '9:00 AM - 7:00 PM',
  },
  
  stats: {
    yearsExperience: '10+',
    happyClients: '500+',
    installations: '10K+',
  },
  
  about: {
    founded: '2014',
    overview: `Y.A.N.T.R.A.Q. Pvt. Ltd. (Yield-Driven Advanced Networked Technology Research Quotient) was founded with a vision to provide businesses with reliable, affordable, and cutting-edge IT hardware solutions. As a sister company of PushpakO2, we bring a legacy of trust and innovation to every project.

Today, we serve over 500+ businesses across various industries, offering comprehensive solutions from CCTV surveillance and biometric systems to enterprise servers and networking infrastructure. Our team of certified professionals ensures that every client receives personalized attention and top-quality service.`,
    
    mission: 'To empower businesses with reliable, innovative, and cost-effective IT solutions that enhance security, productivity, and growth. We strive to be the go-to partner for all IT hardware needs, delivering excellence in every project.',
    
    vision: 'To become the leading IT solutions provider in Central India, known for our commitment to quality, customer satisfaction, and technological innovation. We aim to set industry standards in IT hardware sales, service, and rental.',
  },
};

export const getWhatsAppLink = (message?: string) => {
  const defaultMessage = 'Hi! I am interested in your IT services.';
  const encodedMessage = encodeURIComponent(message || defaultMessage);
  return `https://wa.me/${company.contact.whatsapp}?text=${encodedMessage}`;
};
