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
    <footer className="bg-tech-navy text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-display font-bold text-lg">{company.shortName}</span>
                <p className="text-xs text-gray-400">IT Solutions</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {company.description.slice(0, 200)}...
            </p>
            <p className="text-xs text-gray-500">
              A Sister Company of <span className="text-primary">{company.sisterCompany}</span>
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Products</h4>
            <ul className="space-y-2">
              {categories.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  {company.address.line1}<br />
                  {company.address.line2}<br />
                  {company.address.city}, {company.address.state}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <a href={`tel:${company.contact.phone}`} className="text-gray-400 hover:text-white text-sm">
                  {company.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <div className="text-sm">
                  <a href={`mailto:${company.contact.emails.sales}`} className="text-gray-400 hover:text-white block">
                    {company.contact.emails.sales}
                  </a>
                  <a href={`mailto:${company.contact.emails.support}`} className="text-gray-400 hover:text-white block">
                    {company.contact.emails.support}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <div className="flex gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
