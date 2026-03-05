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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          {/* Brand & Social */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src="/logo.jpg" alt="YantraQ Logo" className="w-8 h-auto object-contain bg-white rounded p-0.5" />
              <span className="font-display font-bold text-lg">{company.shortName}</span>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-xs font-medium">
              {company.slogan}
            </p>
            <p className="text-gray-500 text-xs mt-1 leading-tight max-w-xs">
              {company.tagline}
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Start a Chat
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-200">Navigation</h4>
            <div className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <Link key={link.name} to={link.href} className="text-gray-400 hover:text-primary transition-colors w-fit">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-200">Contact Us</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>{company.address.line1}, {company.address.line2}, {company.address.city}, {company.address.state} {company.address.pincode}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href={`tel:${company.contact.phone.replace(/\s/g, '')}`} className="hover:text-white transition-colors">{company.contact.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href={`mailto:${company.contact.emails.sales}`} className="hover:text-white transition-colors">{company.contact.emails.sales}</a>
              </li>
            </ul>
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
            <Link to="/sitemap" className="hover:text-gray-300 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
