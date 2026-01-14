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

const faqs = [
  {
    category: 'Sales',
    questions: [
      {
        q: 'What brands do you offer?',
        a: 'We are authorized dealers for leading brands including Hikvision, Dahua, CP Plus, Dell, HP, Lenovo, Cisco, and many more. All products come with manufacturer warranty.',
      },
      {
        q: 'Do you offer bulk discounts?',
        a: 'Yes, we offer attractive discounts for bulk orders and corporate clients. Contact our sales team for customized quotes based on your requirements.',
      },
      {
        q: 'Can I get a demo before purchasing?',
        a: 'Absolutely! We offer free product demonstrations at our showroom or at your premises. Schedule a demo through our contact page.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major payment methods including bank transfer, credit/debit cards, UPI, and cheques. EMI options are also available for select products.',
      },
    ],
  },
  {
    category: 'Rental',
    questions: [
      {
        q: 'What is the minimum rental period?',
        a: 'Our minimum rental period is 1 month for most equipment. For events and short-term needs, we offer daily and weekly rental options as well.',
      },
      {
        q: 'Is delivery and setup included in rental?',
        a: 'Yes, delivery, installation, and pickup are included in the rental price within city limits. Additional charges may apply for distant locations.',
      },
      {
        q: 'What happens if equipment is damaged during rental?',
        a: 'Normal wear and tear is covered. For damages beyond normal use, repair costs will be charged. We recommend opting for our rental insurance for full coverage.',
      },
      {
        q: 'Can I extend my rental period?',
        a: 'Yes, rentals can be extended subject to availability. Simply contact us before your rental period ends to request an extension.',
      },
    ],
  },
  {
    category: 'Repair & Service',
    questions: [
      {
        q: 'Do you repair all brands?',
        a: 'Yes, our certified technicians can repair equipment from all major brands. We maintain an extensive inventory of spare parts for quick repairs.',
      },
      {
        q: 'What is your typical repair turnaround time?',
        a: 'Most repairs are completed within 24-48 hours. Complex repairs may take 3-5 business days. We provide loaner equipment for extended repairs.',
      },
      {
        q: 'Do you offer on-site repair services?',
        a: 'Yes, we offer on-site repair services for an additional fee. Our technicians can visit your location for diagnosis and repair.',
      },
      {
        q: 'What does your AMC include?',
        a: 'Our Annual Maintenance Contracts include regular preventive maintenance, priority support, discounted repairs, and depending on the plan, free parts replacement.',
      },
    ],
  },
  {
    category: 'General',
    questions: [
      {
        q: 'What are your business hours?',
        a: 'We are open Monday to Saturday, 9:00 AM to 7:00 PM. For emergencies, our support line is available 24/7 for AMC customers.',
      },
      {
        q: 'Do you provide installation services?',
        a: 'Yes, professional installation is available for all products. Our trained technicians ensure proper setup and provide basic training.',
      },
      {
        q: 'What warranty do you offer?',
        a: 'All new products come with manufacturer warranty (typically 1-3 years). Refurbished products come with 6 months warranty from us.',
      },
      {
        q: 'Do you offer training for the equipment?',
        a: 'Yes, basic training is included with every purchase. Advanced training programs are available for corporate clients.',
      },
    ],
  },
];

const FAQ = () => {
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
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Find answers to common questions about our products and services
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
              Can't find the answer you're looking for? Please chat with our friendly team.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/contact">
                <Button>Contact Us</Button>
              </Link>
              <a
                href="https://wa.me/919876543210?text=Hi!%20I%20have%20a%20question."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="gap-2">
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
