import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SectionHeader } from '@/components/common/SectionHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { services } from '@/data/services';
import { CheckCircle, ArrowRight, Phone } from 'lucide-react';

const Services = () => {
  return (
    <Layout>
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
          <div className="space-y-16">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid md:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
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
                    {service.features.map((feature, i) => (
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

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                name: 'Basic',
                price: '₹5,000/year',
                features: ['Quarterly maintenance visits', 'Phone support', 'Basic troubleshooting', 'Software updates'],
              },
              {
                name: 'Standard',
                price: '₹12,000/year',
                features: ['Monthly maintenance visits', '24/7 phone support', 'On-site repairs', 'Parts at discount', 'Priority response'],
                popular: true,
              },
              {
                name: 'Premium',
                price: '₹25,000/year',
                features: ['Weekly checkups', '24/7 dedicated support', 'Free parts replacement', 'Same-day response', 'Backup equipment'],
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`h-full ${plan.popular ? 'border-primary shadow-glow' : ''}`}>
                  <CardContent className="p-6">
                    {plan.popular && (
                      <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full mb-4">
                        Most Popular
                      </span>
                    )}
                    <h3 className="font-display text-xl font-bold mb-2">{plan.name}</h3>
                    <p className="font-display text-3xl font-bold text-primary mb-6">{plan.price}</p>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link to="/contact">
                      <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                        Get Quote
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
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
