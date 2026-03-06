import { useMemo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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
  HeadphonesIcon, Zap, ArrowRight, CheckCircle, MessageCircle, Loader2,
  Code, Globe, Smartphone, ExternalLink
} from 'lucide-react';
import { api } from '@/lib/api';
import { SEO } from '@/components/common/SEO';
import Leadership from '@/components/common/Leadership';
import FAQ, { faqSchema } from '@/components/common/FAQ';
import { pageKeywords } from '@/data/seo-keywords';
import { BrandMarquee } from '@/components/common/BrandMarquee';

const Index = () => {
  const whatsappLink = getWhatsAppLink();

  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: () => api.get('/products'),
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

  return (
    <Layout>
      <SEO
        title="Bhopal's Best IT Hardware & Software Solutions"
        description="YantraQ — Bhopal's #1 IT & Digital Solutions company. We provide expert IT hardware sales & rental, custom software development, ERP/CRM solutions, website & mobile app development, and AI-driven SEO services. Enterprise laptops, servers, and bespoke tech for Bhopal, MP."
        keywords={pageKeywords.home}
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
                🚀 Bhopal's Leading IT & Digital Solutions Company
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                IT Hardware, {' '}
                <span className="text-gradient">Software Development</span>{' '}
                & Digital Solutions
              </h1>
              <p className="text-lg text-gray-300 mb-8 max-w-xl">
                <strong>YantraQ</strong> is Bhopal's most trusted IT & digital solutions company.
                From enterprise-grade hardware sales & rental to custom website development, mobile apps,
                and digital marketing — we deliver end-to-end technology solutions powered by
                <strong> SEO, AEO & GEO</strong> strategies for businesses, startups, and enterprises across Madhya Pradesh.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <Link to="/products"><Button size="lg" className="gradient-primary gap-2"><ShoppingCart className="w-5 h-5" />IT Hardware</Button></Link>
                <Link to="/services"><Button size="lg" variant="outline" className="border-white/30 text-white bg-white/10 gap-2"><Code className="w-5 h-5" />Software Dev</Button></Link>
                <Link to="/services"><Button size="lg" variant="outline" className="border-white/30 text-white bg-white/10 gap-2"><Globe className="w-5 h-5" />Web & SEO</Button></Link>
                <Link to="/services"><Button size="lg" variant="outline" className="border-white/30 text-white bg-white/10 gap-2"><Smartphone className="w-5 h-5" />Mobile Apps</Button></Link>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-success" /><span>Genuine Hardware</span></div>
                <div className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-success" /><span>Custom Software</span></div>
                <div className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-success" /><span>SEO · AEO · GEO</span></div>
                <div className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-success" /><span>Expert Support</span></div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl" />
                {/* <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=600" alt="Bhopal Best IT Hardware & Software Solutions" width="600" height="400" className="relative rounded-3xl shadow-2xl animate-float" fetchPriority="high" /> */}
                <img src="/fire-alarm.png" alt="Bhopal Best IT Hardware & Software Solutions" width="600" height="400" className="relative rounded-3xl shadow-2xl animate-float" fetchPriority="high" />

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
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp for quick assistance"><Button variant="secondary" className="gap-2"><MessageCircle className="w-5 h-5" />Chat Now</Button></a>
          </div>
        </div>
      </section>

      {/* Brand Marquee */}
      <BrandMarquee />

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

      {/* Software Development Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader badge="Our Services" title="Software & Digital Solutions" description="End-to-end software development, web & mobile apps, and digital marketing to grow your business" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Globe className="w-8 h-8" />,
                title: 'Website Development',
                description: 'Custom, responsive, and high-performance websites built with modern technologies. From business websites to e-commerce platforms — designed to convert visitors into customers.',
                color: 'from-blue-500 to-cyan-500',
              },
              {
                icon: <Smartphone className="w-8 h-8" />,
                title: 'Mobile App Development',
                description: 'Native and cross-platform mobile applications for Android & iOS. Feature-rich, user-friendly apps tailored to your business needs with seamless performance.',
                color: 'from-purple-500 to-pink-500',
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'SEO · AEO · GEO',
                description: 'Boost your online visibility with Search Engine Optimization, Answer Engine Optimization, and Generative Engine Optimization strategies that drive organic traffic and leads.',
                color: 'from-orange-500 to-red-500',
              },
              {
                icon: <Code className="w-8 h-8" />,
                title: 'Custom Digital Solutions',
                description: 'Bespoke software solutions including CRM, ERP, automation tools, and API integrations. We build scalable systems that streamline your operations and accelerate growth.',
                color: 'from-emerald-500 to-teal-500',
              },
            ].map((service, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <Card className="group h-full hover:shadow-glow transition-all duration-300 overflow-hidden">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {service.icon}
                    </div>
                    <h3 className="font-display font-semibold text-lg mb-2">{service.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 flex-1">{service.description}</p>
                    <Link to="/services" className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all" aria-label={`Learn more about ${service.title} services`}>
                      Learn More <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/services">
              <Button size="lg" variant="outline" className="gap-2">View All Services <ArrowRight className="w-5 h-5" /></Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Portfolio / Software Works */}
      <PortfolioSection />

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
      {/* <section className="py-20">
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
      </section> */}

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
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Us for a free consultation"><Button size="lg" variant="outline" className="border-white/30 text-white bg-white/10 gap-2"><MessageCircle className="w-5 h-5" />WhatsApp Us</Button></a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

// Static fallback portfolio data
const staticPortfolio = [
  { _id: '1', name: 'Pushpako2', url: 'https://pushpako2.com', description: 'Aerospace & Aviation — Drone systems and smart aerial solutions', color: '187 85% 53%' },
  { _id: '2', name: 'YantraQ', url: 'https://yantraq.com', description: 'Hardware & IoT — Smart devices, robotics kits, and electronics', color: '200 90% 50%' },
  { _id: '3', name: 'AgniqTech', url: 'https://agniqtech.com', description: 'Software & Digital — Enterprise apps, CRM, and web platforms', color: '160 70% 45%' },
  { _id: '4', name: 'SarvatraLabs', url: 'https://sarvatralabs.com', description: 'Research & Innovation — R&D lab for next-gen technology solutions', color: '270 60% 55%' },
  { _id: '5', name: 'Erohan Foundation', url: 'https://erohanfoundation.org', description: 'Social Impact — Education, sustainability, and community development', color: '35 85% 55%' },
  { _id: '6', name: 'Royal Wedding Sanctuary', url: 'https://royal-wedding-sanctuary.vercel.app/', description: 'Luxury Wedding Venue — Royal destination weddings, premium event planning, and grand celebration experiences', color: '330 75% 60%' },
];

const PortfolioSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const { data: apiPortfolio = [] } = useQuery({
    queryKey: ['portfolio'],
    queryFn: () => api.get('/portfolio'),
  });

  const portfolio = apiPortfolio.length > 0 ? apiPortfolio : staticPortfolio;

  return (
    <section className="py-20 bg-muted/50" ref={ref}>
      <div className="container mx-auto px-4">
        <SectionHeader
          badge="Our Work"
          title="Software We've Built"
          description="Real-world digital products and platforms crafted by our team"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {portfolio.map((p: any, i: number) => (
            <motion.a
              key={p._id || p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className="group relative rounded-2xl border border-border bg-card p-6 flex flex-col justify-between cursor-pointer hover:shadow-glow transition-all duration-300"
              aria-label={`Visit project website: ${p.name}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `hsl(${p.color} / 0.12)` }}
                  >
                    <Globe
                      className="w-5 h-5 transition-colors duration-300"
                      style={{ color: `hsl(${p.color})` }}
                    />
                  </div>
                  <ExternalLink
                    className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors duration-300">
                  {p.name}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {p.description}
                </p>
              </div>
              <span
                className="text-xs font-mono tracking-wide opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                style={{ color: `hsl(${p.color})` }}
              >
                {p.url.replace('https://', '')} →
              </span>
            </motion.a>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/services">
            <Button size="lg" variant="outline" className="gap-2">View All Projects <ArrowRight className="w-5 h-5" /></Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Index;
