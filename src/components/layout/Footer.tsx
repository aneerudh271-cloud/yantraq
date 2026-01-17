import { Link } from 'react-router-dom';
import { Shield, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { company, getWhatsAppLink } from '@/data/company';

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Services', href: '/services' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'FAQ', href: '/faq' },
];

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms & Conditions', href: '/terms' },
];

const categories = [
  { name: 'CCTV Systems', href: '/products?category=cctv' },
  { name: 'GPS Tracking', href: '/products?category=gps' },
  { name: 'Biometric', href: '/products?category=biometric' },
  { name: 'Laptops & Desktops', href: '/products?category=laptop-desktop' },
  { name: 'Network Equipment', href: '/products?category=network' },
];

export const Footer = () => {
  const whatsappLink = getWhatsAppLink();

  return (
    <footer className="bg-tech-navy text-white text-sm py-12">
      <div className="container mx-auto px-4">
        {/* Brand Section - Full Width */}
        <div className="mb-8 pb-8 border-b border-gray-800">
          <div className="flex items-center gap-2 mb-4">
            <img src="/logo.jpg" alt="YantraQ Logo" className="w-10 h-auto object-contain bg-white rounded p-0.5" />
            <span className="font-display font-bold text-xl">{company.shortName}</span>
          </div>
          <p className="text-gray-400 leading-relaxed max-w-2xl mb-4">
            {company.tagline}
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Start a Chat on WhatsApp
          </a>
        </div>

        {/* Navigation & Contact - Flex Layout */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">

          {/* Navigation - 1/4 width on desktop */}
          <div className="md:w-1/4">
            <h4 className="font-semibold mb-4 text-gray-200">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <Link key={link.name} to={link.href} className="text-gray-400 hover:text-primary transition-colors w-fit">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact - 3/4 width on desktop */}
          <div className="md:w-3/4">
            <h4 className="font-semibold mb-4 text-gray-200">Contact Us</h4>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0 text-primary" />
                <div>
                  <p className="text-gray-400 font-medium mb-1">Our Office</p>
                  <p className="text-gray-400 leading-relaxed">
                    {company.address.line1}, {company.address.line2},<br />
                    {company.address.city}, {company.address.state} {company.address.pincode}
                  </p>
                </div>
              </div>

              {/* Phone & Email */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 flex-shrink-0 text-primary" />
                  <div>
                    <p className="text-gray-400 font-medium mb-1">Call Us</p>
                    <a href={`tel:${company.contact.phone.replace(/\s/g, '')}`} className="text-gray-400 hover:text-white transition-colors">
                      {company.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 flex-shrink-0 text-primary" />
                  <div>
                    <p className="text-gray-400 font-medium mb-1">Email Us</p>
                    <a href={`mailto:${company.contact.emails.sales}`} className="text-gray-400 hover:text-white transition-colors">
                      {company.contact.emails.sales}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
          <div className="flex gap-4">
            {legalLinks.map((link) => (
              <Link key={link.name} to={link.href} className="hover:text-gray-300 transition-colors">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
