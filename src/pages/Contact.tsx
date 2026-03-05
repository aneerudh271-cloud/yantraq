import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { ContactForm } from '@/components/common/ContactForm';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Clock, MessageCircle, ExternalLink } from 'lucide-react';
import { company, getWhatsAppLink } from '@/data/company';
import { SEO } from '@/components/common/SEO';
import { pageKeywords } from '@/data/seo-keywords';

const Contact = () => {
  const whatsappLink = getWhatsAppLink();

  return (
    <Layout>
      <SEO
        title="Contact Us"
        description="Contact YantraQ — Bhopal's best IT hardware sales & rental company. Call +91 70003 02682 or visit our Bagsewaniya office. Instant WhatsApp support for laptops, servers, CCTV, networking. Free consultation & same-day delivery."
        keywords={pageKeywords.contact}
        schema={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "mainEntity": {
            "@type": "LocalBusiness",
            "name": "YantraQ",
            "telephone": "+91 70003 02682",
            "email": "connect@yantraq.com",
            "url": "https://yantraq.com/contact",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "1, Adi Parisar, Bagsewaniya, Bagh Swaniya",
              "addressLocality": "Bhopal",
              "addressRegion": "Madhya Pradesh",
              "postalCode": "462026",
              "addressCountry": "IN"
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              "opens": "09:00",
              "closes": "19:00"
            }
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
              Contact Us
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Get in touch with us for any inquiries about our products and services
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="font-display text-2xl font-bold mb-6">Get In Touch</h2>

              <Card>
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <a href={`tel:${company.contact.phone.replace(/\s/g, '')}`} className="text-muted-foreground hover:text-primary">
                      {company.contact.phone}
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a href={`mailto:${company.contact.emails.sales}`} className="text-muted-foreground hover:text-primary">
                      {company.contact.emails.sales}
                    </a>

                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Address</h3>
                      <p className="text-muted-foreground">
                        {company.address.line1}<br />
                        {company.address.line2}<br />
                        {company.address.city}, {company.address.state} {company.address.pincode}
                      </p>
                    </div>
                  </div>
                  <a
                    href={company.address.googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button variant="outline" className="w-full gap-2">
                      <MapPin className="w-4 h-4" />
                      Open in Google Maps
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Business Hours</h3>
                    <p className="text-muted-foreground">
                      {company.businessHours.days}<br />
                      {company.businessHours.time}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="bg-green-600 text-white hover:bg-green-700 transition-colors cursor-pointer">
                  <CardContent className="p-6 flex items-center gap-4">
                    <MessageCircle className="w-8 h-8" />
                    <div>
                      <h3 className="font-semibold">Chat on WhatsApp</h3>
                      <p className="text-green-100 text-sm">Quick response guaranteed</p>
                    </div>
                  </CardContent>
                </Card>
              </a>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card>
                <CardContent className="p-8">
                  <h2 className="font-display text-2xl font-bold mb-2">Send Us a Message</h2>
                  <p className="text-muted-foreground mb-8">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                  <ContactForm />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-96 bg-muted">
        <iframe
          src={company.address.mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Location Map"
        />
      </section>
    </Layout>
  );
};

export default Contact;
