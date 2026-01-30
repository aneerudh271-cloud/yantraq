import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { company } from '@/data/company';

/* ================= TYPES ================= */
interface NavLink {
  name: string;
  href: string;
}

/* ================= DATA ================= */
const navLinks: NavLink[] = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

/* ================= COMPONENT ================= */
export const Navbar: React.FC = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const location = useLocation();

  /* Close mobile menu on route change */
  useEffect((): void => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <motion.img
                src="/logo.jpg"
                alt="YantraQ Logo"
                className="w-10 h-auto object-contain"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              />
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg leading-tight">
                  {company.shortName}
                </span>
                <span className="text-xs text-muted-foreground">
                  {company.slogan}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link: NavLink) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === link.href
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            {user?.role === 'admin' && (
              <div className="hidden md:flex items-center gap-3">
                <Link to="/admin">
                  <Button variant="ghost" size="sm">
                    Dashboard
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setIsOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-muted"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* ================= MOBILE DRAWER ================= */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90]"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              className="fixed top-0 right-0 h-full w-3/4 max-w-sm bg-background border-l border-border shadow-2xl z-[100] flex flex-col"
            >
              {/* Header */}
              <div className="p-4 flex items-center justify-between border-b">
                <span className="font-semibold">Menu</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Links */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {navLinks.map((link: NavLink) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${location.pathname === link.href
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-muted'
                      }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {user?.role === 'admin' && (
                <div className="p-4 border-t">
                  <Link to="/admin">
                    <Button variant="outline" className="w-full">
                      Dashboard
                    </Button>
                  </Link>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
