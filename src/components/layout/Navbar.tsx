import { useEffect, useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { company } from '@/data/company';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { api } from '@/lib/api';

/* ================= TYPES ================= */
interface NavLink {
  name: string;
  href: string;
}

/* ================= COMPONENT ================= */
export const Navbar: React.FC = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const location = useLocation();

  const { data: fetchedCategories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: () => api.get('/products/categories'),
  });

  const { data: fetchedServices = [] } = useQuery({
    queryKey: ['services'],
    queryFn: () => api.get('/services'),
  });

  const allCategories = useMemo(() => {
    const uniqueCategories = new Map();
    if (Array.isArray(fetchedCategories)) {
      fetchedCategories.forEach((cat: string) => {
        if (!uniqueCategories.has(cat)) {
          const name = cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' ');
          uniqueCategories.set(cat, { id: cat, name, icon: '📦', description: `Explore our range of ${name}` });
        }
      });
    }
    return Array.from(uniqueCategories.values());
  }, [fetchedCategories]);

  const allServices = useMemo(() => {
    const uniqueServices = new Map();
    if (Array.isArray(fetchedServices)) {
      fetchedServices.forEach((s: any) => {
        const id = s.id || s._id;
        if (id && !uniqueServices.has(id)) {
          uniqueServices.set(id, {
             id,
             title: s.title || s.name || 'Service',
             description: s.description || 'Explore our custom service',
             icon: s.icon || '💼'
          });
        }
      });
    }
    return Array.from(uniqueServices.values());
  }, [fetchedServices]);

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
                width={40}
                height={40}
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
            <div className="hidden md:flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {/* Home */}
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/"
                        className={cn(
                          navigationMenuTriggerStyle(),
                          location.pathname === '/' ? 'text-primary bg-primary/10 hover:bg-primary/20 hover:text-primary' : 'bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground'
                        )}
                      >
                        Home
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  {/* Products */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className={cn(
                          "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
                          location.pathname === '/products' && 'text-primary bg-primary/10 hover:bg-primary/20 hover:text-primary'
                        )}>
                      Products
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] max-h-[80vh] overflow-y-auto overflow-x-hidden gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-popover shadow-xl rounded-xl border border-border">
                        <li className="col-span-full">
                           <Link to="/products" className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                             <span className="font-semibold">All Products</span>
                             <span className="text-sm text-primary font-medium">View Store &rarr;</span>
                           </Link>
                        </li>
                        {allCategories.map((category) => (
                          <li key={category.id}>
                            <NavigationMenuLink asChild>
                              <Link
                                to={`/products?category=${category.id}`}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-semibold leading-none flex items-center gap-2">
                                  <span className="text-lg">{category.icon}</span>
                                  {category.name}
                                </div>
                                <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1.5 font-medium">
                                  {category.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Services */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className={cn(
                          "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
                          location.pathname === '/services' && 'text-primary bg-primary/10 hover:bg-primary/20 hover:text-primary'
                        )}>
                      Services
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] max-h-[80vh] overflow-y-auto overflow-x-hidden gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-popover shadow-xl rounded-xl border border-border">
                        <li className="col-span-full">
                           <Link to="/services" className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                             <span className="font-semibold">All Services</span>
                             <span className="text-sm text-primary font-medium">View Details &rarr;</span>
                           </Link>
                        </li>
                        {allServices.map((service) => (
                          <li key={service.id}>
                            <NavigationMenuLink asChild>
                              <Link
                                to={`/services#${service.id}`}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-semibold leading-none flex items-center gap-2">
                                  <span className="text-lg">{service.icon}</span>
                                  {service.title}
                                </div>
                                <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1.5 font-medium">
                                  {service.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* About */}
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/about"
                        className={cn(
                          navigationMenuTriggerStyle(),
                          location.pathname === '/about' ? 'text-primary bg-primary/10 hover:bg-primary/20 hover:text-primary' : 'bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground'
                        )}
                      >
                        About
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  {/* Contact */}
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/contact"
                        className={cn(
                          navigationMenuTriggerStyle(),
                          location.pathname === '/contact' ? 'text-primary bg-primary/10 hover:bg-primary/20 hover:text-primary' : 'bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground'
                        )}
                      >
                        Contact
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                </NavigationMenuList>
              </NavigationMenu>
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
                  aria-label="Close menu"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Links */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                <Link
                  to="/"
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${location.pathname === '/' ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}
                >
                  Home
                </Link>

                 <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="products" className="border-b-0">
                      <AccordionTrigger className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:no-underline ${location.pathname === '/products' ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}>
                        Products
                      </AccordionTrigger>
                      <AccordionContent className="pb-0 pl-4 border-l-2 border-primary/20 ml-6 mt-1 space-y-1">
                         <Link to="/products" className="block px-4 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-muted">
                           ➔ View All Products
                         </Link>
                        {allCategories.map((category) => (
                           <Link
                             key={category.id}
                             to={`/products?category=${category.id}`}
                             className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                           >
                             <span className="text-lg">{category.icon}</span> {category.name}
                           </Link>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="services" className="border-b-0">
                      <AccordionTrigger className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:no-underline ${location.pathname === '/services' ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}>
                        Services
                      </AccordionTrigger>
                      <AccordionContent className="pb-0 pl-4 border-l-2 border-primary/20 ml-6 mt-1 space-y-1">
                         <Link to="/services" className="block px-4 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-muted">
                           ➔ View All Services
                         </Link>
                        {allServices.map((service) => (
                           <Link
                             key={service.id}
                             to={`/services#${service.id}`}
                             className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                           >
                             <span className="text-lg">{service.icon}</span> {service.title}
                           </Link>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                 </Accordion>

                <Link
                  to="/about"
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${location.pathname === '/about' ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}
                >
                  About
                </Link>

                <Link
                  to="/contact"
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${location.pathname === '/contact' ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}
                >
                  Contact
                </Link>
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
