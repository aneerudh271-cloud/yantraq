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

    },
    phone: '+91 70003 02682',
    whatsapp: '917000302682',
  },

  address: {
    line1: '1, Adi Parisar',
    line2: 'Bagsewaniya, Bagh Swaniya',
    city: 'Bhopal',
    state: 'Madhya Pradesh',
    pincode: '462026',
    country: 'India',
    full: '1,1, Adi Parisar, Bagsewaniya, Bagh Swaniya, Bhopal, Madhya Pradesh 462026',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3665.967882260124!2d77.4646543!3d23.2351984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c4270da6d2673%3A0x8909890538058284!2sBagsewaniya%2C%20Bhopal%2C%20Madhya%20Pradesh%20462026!5e0!3m2!1sen!2sin!4v1705234567890!5m2!1sen!2sin',
    googleMapsLink: 'https://www.google.com/maps/place/Pushpako2/@23.1987744,77.4619296,17z/data=!3m1!4b1!4m6!3m5!1s0x87de1398d45f4f7d:0x562aeff123c01dd4!8m2!3d23.1987744!4d77.4619296!16s%2Fg%2F11mz04vqbh?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D',
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
