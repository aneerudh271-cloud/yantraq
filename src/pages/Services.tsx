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
        title="IT Services"
        description="Complete IT services in Bhopal — hardware sales & rental, laptop/server/CCTV repair, AMC plans, website & mobile app development, SEO/AEO/GEO digital marketing, network installation. Best prices, expert support by YantraQ."
        keywords={pageKeywords.services}
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "IT Hardware & Digital Solutions",
          "provider": {
            "@type": "LocalBusiness",
            "name": "YantraQ",
            "url": "https://yantraq.com"
          },
          "areaServed": { "@type": "City", "name": "Bhopal" },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "IT Services",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "IT Hardware Sales & Rental" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "IT Repair & AMC Services" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Website & App Development" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO, AEO & GEO Marketing" } }
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
              Our Services
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Comprehensive IT solutions from sales to support — we've got you covered
            </p>
          </motion.div>
        </div>
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
                    <Link to="/contact">
                      <Button className="gap-2">
                        Get Started <ArrowRight className="w-4 h-4" />
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
