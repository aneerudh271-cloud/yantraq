export const company = {
  name: 'Y.A.N.T.R.A.Q. Pvt. Ltd.',
  shortName: 'YANTRAQ',
  tagline: 'Yield-Driven Advanced Networked Technology Research Quotient',
  slogan: 'Engineering The Future',
  description: 'Your trusted partner for IT hardware, software development, and digital solutions. From enterprise hardware sales & rental to custom websites, mobile apps, and SEO/AEO/GEO-powered digital marketing — we deliver end-to-end technology solutions for businesses of all sizes.',
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
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.6256!2d77.4573705!3d23.193912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c43e1c84a1fd5%3A0x42d79f825a3c76cb!2sYantraQ!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin',
    googleMapsLink: 'https://www.google.com/maps/place/YantraQ/@23.193912,77.4547956,17z/data=!4m14!1m7!3m6!1s0x397c43e1c84a1fd5:0x42d79f825a3c76cb!2sYantraQ!8m2!3d23.193912!4d77.4573705!16s%2Fg%2F11n54rk3k1!3m5!1s0x397c43e1c84a1fd5:0x42d79f825a3c76cb!8m2!3d23.193912!4d77.4573705!16s%2Fg%2F11n54rk3k1',
  },

  businessHours: {
    days: 'Monday - Saturday',
    time: '10:30 AM - 7:30 PM',
  },

  stats: {
    yearsExperience: '10+',
    happyClients: '500+',
    installations: '10K+',
  },

  about: {
    founded: '2014',
    overview: `Y.A.N.T.R.A.Q. Pvt. Ltd. (Yield-Driven Advanced Networked Technology Research Quotient) was founded with a vision to provide businesses with reliable, affordable, and cutting-edge technology solutions. As a sister company of PushpakO2, we bring a legacy of trust and innovation to every project.

Today, we serve over 500+ businesses across various industries, offering comprehensive solutions spanning IT hardware sales & rental, custom software development, website & mobile app development, and digital marketing powered by SEO, AEO & GEO strategies. Our team of certified professionals ensures that every client receives personalized attention and top-quality service.`,

    mission: 'To empower businesses with reliable, innovative, and cost-effective IT & digital solutions that enhance security, productivity, and growth. We strive to be the go-to partner for IT hardware, custom software, and digital marketing needs, delivering excellence in every project.',

    vision: 'To become the leading IT & digital solutions provider in Central India, known for our commitment to quality, customer satisfaction, and technological innovation. We aim to set industry standards in IT hardware, software development, and digital marketing.',
  },
};

export const getWhatsAppLink = (message?: string) => {
  const defaultMessage = 'Hi! I am interested in your IT & digital solutions.';
  const encodedMessage = encodeURIComponent(message || defaultMessage);
  return `https://wa.me/${company.contact.whatsapp}?text=${encodedMessage}`;
};
