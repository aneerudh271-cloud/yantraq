import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Layout } from '@/components/layout/Layout';
import { SectionHeader } from '@/components/common/SectionHeader';
import { ProductCard } from '@/components/common/ProductCard';
import { TestimonialsCarousel } from '@/components/common/TestimonialsCarousel';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { categories as staticCategories } from '@/data/products';
import { industries } from '@/data/services';
import { company, getWhatsAppLink } from '@/data/company';
import {
  ShoppingCart, Clock, Wrench, Phone, Shield, Award,
  HeadphonesIcon, Zap, ArrowRight, CheckCircle, MessageCircle, Loader2
} from 'lucide-react';
import { api } from '@/lib/api';
import { SEO } from '@/components/common/SEO';
import Leadership from '@/components/common/Leadership';
import FAQ, { faqSchema } from '@/components/common/FAQ';

const Index = () => {
  const whatsappLink = getWhatsAppLink();

  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: () => api.get('/products'),
  });

  const { data: services = [] } = useQuery({
    queryKey: ['services'],
    queryFn: () => api.get('/services'),
  });

  const { data: testimonials = [] } = useQuery({
    queryKey: ['testimonials'],
    queryFn: () => api.get('/testimonials'),
  });

  const { data: fetchedCategories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: () => api.get('/products/categories'),
  });

  const allCategories = useMemo(() => {
    const uniqueCategories = new Map();

    // Add static categories first to preserve icons and nice names
    staticCategories.forEach(c => {
      uniqueCategories.set(c.id, { id: c.id, name: c.name, icon: c.icon });
    });

    // Add fetched categories if not present
    if (Array.isArray(fetchedCategories)) {
      fetchedCategories.forEach((cat: string) => {
        if (!uniqueCategories.has(cat)) {
          // Capitalize first letter for display name if it's a simple string ID
          const name = cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' ');
          // Provide a default icon for new categories
          uniqueCategories.set(cat, { id: cat, name: name, icon: '📦' });
        }
      });
    }

    return Array.from(uniqueCategories.values());
  }, [fetchedCategories]);

  const products = data?.products || [];
  const featuredProducts = products.slice(0, 6);
  const featuredTestimonials = testimonials.slice(0, 3);
  const featuredServices = services.slice(0, 4);

  return (
    <Layout>
      <SEO
        title="Home"
        description="YantraQ (yantraq.com) is Bhopal's #1 trusted IT hardware sales and rental company. Buy or rent laptops, servers, desktops, networking equipment for businesses, startups & enterprises. Best prices, fast delivery, expert support in Bhopal, Madhya Pradesh."
        keywords="yantraq, yantra q, yantraq.com, yantraq bhopal, IT hardware sales bhopal, IT hardware rental bhopal, laptop rental bhopal, server rental bhopal, computer hardware shop bhopal, best IT hardware company bhopal, IT products near me, IT equipment rental near me, affordable IT hardware bhopal, enterprise IT solutions bhopal"
        schema={faqSchema}
      />
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center gradient-dark overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/30 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="text-white">
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur rounded-full text-sm font-medium mb-6">
                🔒 Bhopal's Leading IT Hardware Provider
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Best IT Hardware{' '}
                <span className="text-gradient">Sales & Rental</span>{' '}
                Company in Bhopal
              </h1>
              <p className="text-lg text-gray-300 mb-8 max-w-xl">
                <strong>YantraQ</strong> (yantraq.com) is Bhopal's most trusted IT hardware sales and rental company,
                offering enterprise-grade laptops, servers, desktops, and networking equipment with flexible
                rental solutions and complete IT infrastructure support for businesses, startups, and enterprises
                across Madhya Pradesh.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <Link to="/products"><Button size="lg" className="gradient-primary gap-2"><ShoppingCart className="w-5 h-5" />Buy Products</Button></Link>
                <Link to="/products?action=rent"><Button size="lg" variant="outline" className="border-white/30 text-white bg-white/10 gap-2"><Clock className="w-5 h-5" />Rent Equipment</Button></Link>
                <Link to="/services"><Button size="lg" variant="outline" className="border-white/30 text-white bg-white/10 gap-2"><Wrench className="w-5 h-5" />Repair Service</Button></Link>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-success" /><span>Genuine Products</span></div>
                <div className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-success" /><span>Expert Support</span></div>
                <div className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-success" /><span>Best Prices</span></div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl" />
                <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600" alt="IT Hardware Solutions" className="relative rounded-3xl shadow-2xl animate-float" loading="lazy" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WhatsApp Banner */}
      <section className="bg-green-600 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-white"><MessageCircle className="w-6 h-6" /><span className="font-medium">Need quick assistance? Chat with us on WhatsApp!</span></div>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer"><Button variant="secondary" className="gap-2"><MessageCircle className="w-5 h-5" />Chat Now</Button></a>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader badge="Our Products" title="Browse by Category" description="Explore our wide range of IT hardware and security solutions" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {allCategories.map((category, index) => (
              <motion.div key={category.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.05 }}>
                <Link to={`/products?category=${category.id}`}>
                  <Card className="group hover:shadow-glow transition-all duration-300 h-full">
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-3">{category.icon}</div>
                      <h3 className="font-display font-semibold text-sm mb-1 group-hover:text-primary transition-colors">{category.name}</h3>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <SectionHeader badge="Featured" title="Popular Products" description="Top-selling IT hardware and security equipment" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product: any, index: number) => (
              <ProductCard key={product._id} product={{ ...product, id: product._id }} index={index} />
            ))}
          </div>
          <div className="text-center mt-10"><Link to="/products"><Button size="lg" variant="outline" className="gap-2">View All Products<ArrowRight className="w-5 h-5" /></Button></Link></div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader badge="Our Services" title="What We Offer" description="Complete IT solutions from sales to support" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredServices.map((service: any, index: number) => (
              <motion.div key={service._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <Card className="h-full hover:shadow-glow transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h3 className="font-display font-semibold text-lg mb-2">{service.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
                    <Link to="/services" className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">Learn More <ArrowRight className="w-4 h-4" /></Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <Leadership />

      {/* Testimonials */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <SectionHeader badge="Testimonials" title="What Our Clients Say" description="Trusted by 500+ businesses across industries" />
          <TestimonialsCarousel testimonials={testimonials.map((t: any) => ({ ...t, id: t._id }))} />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 gradient-dark text-white">
        <div className="container mx-auto px-4">
          <SectionHeader badge="Why Choose Us" title="Your Trusted IT Partner" description={`${company.stats.yearsExperience} years of excellence in IT hardware solutions`} />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: 'Genuine Products', desc: 'Authorized dealer for top brands with full warranty' },
              { icon: Award, title: 'Expert Team', desc: 'Certified technicians with years of experience' },
              { icon: HeadphonesIcon, title: '24/7 Support', desc: 'Round-the-clock technical assistance' },
              { icon: Zap, title: 'Fast Delivery', desc: 'Same-day delivery and installation services' },
            ].map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-primary flex items-center justify-center"><item.icon className="w-8 h-8" /></div>
                <h3 className="font-display font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader badge="Industries" title="Industries We Serve" description="Trusted by businesses across various sectors" />
          <div className="flex flex-wrap justify-center gap-4">
            {industries.map((industry, index) => (
              <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: index * 0.05 }} className="px-6 py-3 bg-card rounded-full border border-border flex items-center gap-2 hover:shadow-md transition-shadow">
                <span className="text-2xl">{industry.icon}</span>
                <span className="font-medium text-sm">{industry.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">Contact us today for a free consultation. Our team is ready to help you find the perfect IT solutions.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact"><Button size="lg" variant="secondary" className="gap-2"><Phone className="w-5 h-5" />Get Free Quote</Button></Link>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer"><Button size="lg" variant="outline" className="border-white/30 text-white bg-white/10 gap-2"><MessageCircle className="w-5 h-5" />WhatsApp Us</Button></a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
