import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { SEO } from '@/components/common/SEO';
import { pageKeywords } from '@/data/seo-keywords';
import { faqSchema } from '@/components/common/FAQ';
import { getWhatsAppLink } from '@/data/company';

const faqs = [
  {
    category: 'Sales',
    questions: [
      {
        q: 'What IT hardware brands does YantraQ sell in Bhopal?',
        a: 'YantraQ is an authorized dealer for leading IT brands in Bhopal including HP, Dell, Lenovo, Asus, Acer for laptops/desktops; Hikvision, Dahua, CP Plus for CCTV cameras; Cisco, TP-Link, D-Link for networking; Canon, Epson, Brother for printers; eSSL, ZKTeco for biometric devices; and APC, Microtek for UPS systems. All products come with genuine manufacturer warranty.',
      },
      {
        q: 'Do you offer bulk discounts for corporate and government orders?',
        a: 'Yes, YantraQ offers attractive bulk discounts for corporate offices, government organizations, educational institutions, and enterprise clients in Bhopal. We provide customized volume pricing, staged delivery, pre-configured setups, and dedicated account management. Contact our sales team at connect@yantraq.com for customized quotations.',
      },
      {
        q: 'Can I get a product demo before purchasing IT hardware?',
        a: 'Absolutely! YantraQ provides free product demonstrations at our Bhopal showroom (Bagsewaniya) or at your premises. Schedule a demo for CCTV systems, biometric devices, networking equipment, or any IT hardware through our contact page or call +91 70003 02682.',
      },
      {
        q: 'What payment methods does YantraQ accept?',
        a: 'YantraQ accepts all major payment methods: UPI (Google Pay, PhonePe, Paytm), bank transfer (NEFT/RTGS/IMPS), credit/debit cards, cheque payments, cash, and EMI options on select products. Corporate invoicing with credit terms is available for registered businesses. GST invoices are provided for all purchases.',
      },
      {
        q: 'Does YantraQ sell refurbished and second-hand IT hardware?',
        a: 'Yes, YantraQ offers quality-tested refurbished laptops, desktops, servers, and other IT hardware in Bhopal at 30-50% lower prices than new products. All refurbished items undergo thorough testing, data wiping, and certification. We provide a 6-month warranty on all refurbished products, making them ideal for budget-conscious businesses and startups.',
      },
    ],
  },
  {
    category: 'Rental',
    questions: [
      {
        q: 'What is the minimum laptop rental period in Bhopal?',
        a: 'YantraQ offers flexible rental periods: minimum 1 week for short-term needs, with monthly and yearly plans available. For events, exams, and training programs, we offer daily rental options too. Bulk rentals (10+ units) may have more flexible terms. Contact us for custom rental durations.',
      },
      {
        q: 'Is delivery, setup, and pickup included in the rental price?',
        a: 'Yes, delivery, professional installation, configuration, and pickup are included in the rental price within Bhopal city limits. Our technicians set up all equipment, install required software, and provide basic training. Additional charges may apply for locations outside Bhopal city.',
      },
      {
        q: 'What happens if rental equipment is damaged?',
        a: 'Normal wear and tear is covered in all YantraQ rental plans. For damages beyond normal use, repair costs are charged at actual. We recommend opting for our rental insurance add-on (starting ₹200/device/month) for complete coverage including accidental damage, theft protection, and zero-liability replacement.',
      },
      {
        q: 'Can I extend or upgrade my rental during the rental period?',
        a: 'Yes! YantraQ rentals can be extended or upgraded anytime. Contact us before your current period ends to request an extension. You can also upgrade to higher-spec equipment mid-rental — we\'ll swap the devices at your location with zero downtime. Scaling up the number of devices is also possible subject to availability.',
      },
      {
        q: 'What types of equipment can I rent from YantraQ?',
        a: 'YantraQ provides rental services for: Laptops (i3/i5/i7, with or without pre-loaded software), Desktops & Workstations, Servers & Server Racks, Printers & Scanners, Projectors, LED Monitors, Networking Equipment (routers, switches), UPS & Power Backup, and complete IT infrastructure for temporary offices. Bulk rentals for 10 to 500+ devices are our specialty.',
      },
    ],
  },
  {
    category: 'Repair & AMC Services',
    questions: [
      {
        q: 'What types of IT hardware does YantraQ repair in Bhopal?',
        a: 'YantraQ repairs all types of IT hardware in Bhopal: laptops (screen, keyboard, motherboard, battery, hinge), desktops, servers, printers, CCTV cameras, DVR/NVR systems, biometric devices, UPS, networking equipment, and more. We service all major brands and maintain an extensive inventory of genuine spare parts for quick repairs.',
      },
      {
        q: 'What is the typical repair turnaround time at YantraQ?',
        a: 'Most repairs at YantraQ are completed within 24-48 hours. Common repairs like screen replacement, OS reinstallation, or RAM/SSD upgrades are often done same-day. Complex repairs (motherboard, data recovery) may take 3-5 business days. For AMC customers, we provide loaner equipment during extended repairs at no extra cost.',
      },
      {
        q: 'Do you offer on-site repair and technical support in Bhopal?',
        a: 'Yes, YantraQ offers on-site repair and technical support services across Bhopal. Our certified technicians can visit your office, home, or site for diagnosis, repair, and maintenance. On-site support is included for AMC customers. For non-AMC clients, on-site visits are available at a nominal service charge. Response time is typically 4-8 hours.',
      },
      {
        q: 'What is included in YantraQ\'s AMC (Annual Maintenance Contract)?',
        a: 'YantraQ\'s AMC packages include: scheduled preventive maintenance visits (monthly/quarterly), unlimited breakdown support calls, on-site technical support within 4-8 hours, hardware health monitoring, software updates and security patches, antivirus management, network monitoring, backup verification, priority parts replacement at discounted rates, and monthly health reports. Plans start from ₹2,000/device/year. Custom AMC packages are available for large installations.',
      },
    ],
  },
  {
    category: 'CCTV & Security',
    questions: [
      {
        q: 'How much does a complete CCTV installation cost in Bhopal?',
        a: 'CCTV installation costs at YantraQ Bhopal depend on the system: 4-Camera HD system: ₹12,000-15,000, 4-Camera IP system: ₹20,000-25,000, 8-Camera system: ₹25,000-35,000, 16-Camera system: ₹50,000-70,000. Prices include cameras, DVR/NVR, cabling, installation, mobile app setup, and 1-year warranty. Monthly rental plans are also available starting ₹2,000/month.',
      },
      {
        q: 'Which CCTV camera should I choose for my home or business?',
        a: 'For homes and small shops in Bhopal: 2MP HD dome cameras with night vision are cost-effective and sufficient. For offices and warehouses: 4MP IP cameras offer better resolution and remote monitoring. For large areas and parking: PTZ (Pan-Tilt-Zoom) cameras provide maximum coverage. YantraQ offers free site surveys to recommend the best CCTV solution based on your specific needs, layout, and budget.',
      },
    ],
  },
  {
    category: 'Software & Digital Services',
    questions: [
      {
        q: 'Does YantraQ provide website and mobile app development?',
        a: 'Yes, YantraQ is a full-service web and mobile app development company in Bhopal. We build responsive websites, e-commerce platforms, mobile apps (Android & iOS), custom CRM/ERP systems, and web applications using modern technologies like React, Next.js, Node.js, React Native, and Flutter. All projects include SEO optimization, mobile responsiveness, and post-launch support.',
      },
      {
        q: 'What are SEO, AEO, and GEO services and why do I need them?',
        a: 'SEO (Search Engine Optimization) improves your Google rankings. AEO (Answer Engine Optimization) ensures your content appears in AI answer boxes, voice search, and featured snippets. GEO (Generative Engine Optimization) makes your business visible in AI platforms like ChatGPT, Google Gemini, and Microsoft Copilot. Together, they provide 360° digital visibility. YantraQ combines all three for maximum online presence — critical for businesses competing in the digital age in Bhopal.',
      },
    ],
  },
  {
    category: 'General',
    questions: [
      {
        q: 'What are YantraQ\'s business hours?',
        a: 'YantraQ is open Monday to Saturday, 9:00 AM to 7:00 PM. For emergencies and AMC customers, our technical support line is available round the clock. You can also reach us 24/7 on WhatsApp at +91 70003 02682 for quick queries.',
      },
      {
        q: 'Does YantraQ provide installation and training for purchased equipment?',
        a: 'Yes, professional installation and basic training are included free with every purchase from YantraQ. This covers CCTV camera setup, biometric system configuration, network installation, printer setup, and all IT hardware. Advanced training programs are available for corporate clients covering system administration, network management, and security best practices.',
      },
      {
        q: 'What warranty does YantraQ provide on IT hardware?',
        a: 'All new IT hardware from YantraQ comes with manufacturer warranty (typically 1-3 years depending on the product and brand). Refurbished products carry a 6-month warranty from YantraQ. Extended warranty options are available for most products. AMC plans further extend coverage with preventive maintenance and priority support.',
      },
      {
        q: 'Does YantraQ serve areas outside Bhopal?',
        a: 'While YantraQ is based in Bhopal, we serve the entire Bhopal metropolitan area and surrounding regions within a 50km radius including Mandideep, Sehore, Vidisha, and Raisen. For larger projects, we provide services across Madhya Pradesh. Contact us for availability in your specific location.',
      },
    ],
  },
];

// Generate page-specific FAQ schema
const pageFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.flatMap(section =>
    section.questions.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  )
};

const FAQ = () => {
  const whatsappLink = getWhatsAppLink('Hi! I have a question about your services.');

  return (
    <Layout>
      <SEO
        title="FAQ"
        description="Frequently asked questions about YantraQ's IT hardware sales, rental, CCTV installation, laptop repair, AMC services, website development, and digital marketing in Bhopal. Find answers to common queries."
        keywords={pageKeywords.faq}
        schema={pageFaqSchema}
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
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Find answers to common questions about IT hardware sales, rental, repair, CCTV installation, and digital services in Bhopal
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {faqs.map((section, sectionIndex) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: sectionIndex * 0.1 }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl font-bold mb-6">{section.category}</h2>
              <Accordion type="single" collapsible className="space-y-4">
                {section.questions.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`${section.category}-${index}`}
                    className="border rounded-lg px-6"
                  >
                    <AccordionTrigger className="text-left hover:no-underline">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}

          {/* Still have questions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center py-12 bg-muted rounded-2xl"
          >
            <h3 className="font-display text-2xl font-bold mb-4">Still have questions?</h3>
            <p className="text-muted-foreground mb-6">
              Can't find the answer you're looking for? Chat with our team for instant help.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/contact">
                <Button>Contact Us</Button>
              </Link>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact YantraQ directly on WhatsApp"
              >
                <Button variant="outline" className="gap-2" aria-label="Chat on WhatsApp">
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;
