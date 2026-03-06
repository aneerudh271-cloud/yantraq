import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Layout } from '@/components/layout/Layout';
import { SectionHeader } from '@/components/common/SectionHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, ArrowRight, Phone, Loader2 } from 'lucide-react';
import { api } from '@/lib/api';
import { SEO } from '@/components/common/SEO';
import { AMCPlansList } from '@/components/common/AMCPlansList';
import { pageKeywords } from '@/data/seo-keywords';

interface Service {
  _id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  image: string;
}

const Services = () => {
  const { data: services = [], isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: () => api.get('/services'),
  });

  return (
    <Layout>
      <SEO
        title="IT Services & Software Development in Bhopal"
        description="Complete IT services in Bhopal — hardware sales & rental, laptop/server/CCTV repair, AMC plans, website & mobile app development, custom CRM/ERP software, SEO/AEO/GEO digital marketing. Best prices, expert support by YantraQ."
        keywords={pageKeywords.services}
        pageCategory="software"
        ogType="service"
        articleSection="Software Development & IT Services"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "IT Hardware & Software Development Solutions",
          "provider": {
            "@type": "LocalBusiness",
            "name": "YantraQ",
            "url": "https://yantraq.com"
          },
          "areaServed": [
            { "@type": "City", "name": "Bhopal" },
            { "@type": "State", "name": "Madhya Pradesh" },
            { "@type": "Country", "name": "India" }
          ],
          "url": "https://yantraq.com/services",
          "description": "End-to-end IT services including hardware sales, rental, repair, AMC, website development, mobile app development, custom software, and SEO/AEO/GEO digital marketing",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "IT & Software Services",
            "itemListElement": [
              {
                "@type": "OfferCatalog",
                "name": "Hardware Services",
                "itemListElement": [
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "IT Hardware Sales & Procurement", "description": "New and refurbished laptops, desktops, servers, CCTV, printers, biometric devices from HP, Dell, Lenovo, Hikvision" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "IT Hardware Rental", "description": "Flexible daily, weekly, monthly rental of laptops, servers, projectors, printers for businesses and events" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "IT Repair & AMC Services", "description": "Expert laptop repair, desktop repair, printer service, CCTV maintenance with annual maintenance contracts" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "CCTV & Security Installation", "description": "Complete surveillance system design, installation, and maintenance for homes, offices, factories" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Network Infrastructure Setup", "description": "LAN cabling, WiFi installation, server room setup, structured cabling for offices and enterprises" } }
                ]
              },
              {
                "@type": "OfferCatalog",
                "name": "Software & Digital Services",
                "itemListElement": [
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Website Development", "description": "Custom responsive websites, e-commerce platforms, landing pages built with React, Next.js, Node.js" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Mobile App Development", "description": "Android & iOS apps using React Native and Flutter — native performance, cross-platform development" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom Software Development", "description": "CRM, ERP, inventory management, billing, hospital management, school management, lead tracking software" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO Services", "description": "Search Engine Optimization for Google rankings improvement, local SEO for Bhopal businesses" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AEO & GEO Services", "description": "Answer Engine Optimization for AI-powered search and Generative Engine Optimization for ChatGPT/Gemini visibility" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Digital Marketing", "description": "Google Ads, social media marketing, content marketing, video marketing for business growth" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "API & SaaS Development", "description": "RESTful API development, microservices architecture, SaaS application development" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cloud Solutions", "description": "AWS, Azure, Google Cloud deployment, setup, and management for scalable infrastructure" } }
                ]
              }
            ]
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://yantraq.com/" },
              { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://yantraq.com/services" }
            ]
          }
        }}
      />
      {/* Hero */}
      <section className="py-16 gradient-dark text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              IT Services &amp; Software Development in Bhopal
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              From hardware sales &amp; rental to custom website development, mobile apps, CRM/ERP software, and AI-powered SEO — comprehensive IT solutions for Bhopal businesses by YantraQ.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SEO-rich content for software services (visually hidden but crawlable) */}
      <section className="sr-only" aria-hidden="true">
        <h2>Software Development & Digital Services by YantraQ Bhopal</h2>
        <p>
          YantraQ is a full-service software development and digital solutions company in Bhopal, Madhya Pradesh. We build custom websites using React, Next.js, and Node.js for businesses, e-commerce stores, and startups. Our mobile app development team creates high-performance Android and iOS applications using React Native and Flutter. We develop bespoke CRM, ERP, billing software, hospital management systems, school management systems, hotel management systems, lead management tools, and inventory management solutions. Our digital marketing division provides comprehensive SEO (Search Engine Optimization), AEO (Answer Engine Optimization) for AI search engines like ChatGPT and Google Gemini, and GEO (Generative Engine Optimization) to ensure your business is discoverable across all platforms. We also handle Google Ads, social media marketing, content marketing, and local SEO for Bhopal businesses. From API development and SaaS products to cloud deployment on AWS and Azure, YantraQ delivers end-to-end technology solutions.
        </p>
        <h3>Hardware Services in Bhopal</h3>
        <p>
          Our IT hardware services include laptop and desktop sales, rental, and repair; server room setup and maintenance; CCTV surveillance system design and installation; biometric attendance system configuration; networking and WiFi installation; printer repair and AMC; and complete IT infrastructure setup for offices, schools, hospitals, factories, and government organizations across Bhopal and Madhya Pradesh.
        </p>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="space-y-16">
              {services.map((service: Service, index: number) => (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''
                    }`}
                >
                  <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                    <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-muted">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                    <span className="text-5xl mb-4 block">{service.icon}</span>
                    <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                      {service.title}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      {service.description}
                    </p>
                    <ul className="space-y-3 mb-6">
                      {(service.features || []).map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/contact" aria-label={`Get started with ${service.title}`}>
                      <Button className="gap-2">
                        Get Started <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* AMC Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <SectionHeader
            badge="AMC Plans"
            title="Annual Maintenance Contracts"
            description="Ensure uninterrupted operation with our comprehensive AMC plans"
          />

          <AMCPlansList />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            We understand every business is unique. Contact us for a tailored IT solution that fits your specific needs.
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary" className="gap-2">
              <Phone className="w-5 h-5" />
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
