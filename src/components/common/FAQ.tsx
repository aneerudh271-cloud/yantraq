import { motion } from 'framer-motion';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

// FAQs optimized for SEO and "near me" queries
const faqs = [
    {
        question: "What IT hardware products does YantraQ sell and rent in Bhopal?",
        answer: "YantraQ offers comprehensive IT hardware sales and rental services in Bhopal including laptops, desktops, servers, workstations, networking equipment (routers, switches, firewalls), printers, scanners, CCTV cameras, biometric systems, and complete IT infrastructure solutions for businesses and enterprises."
    },
    {
        question: "Do you provide IT hardware rental services in Bhopal?",
        answer: "Yes! YantraQ is Bhopal's leading IT hardware rental company. We offer short-term and long-term rental solutions for laptops, servers, desktops, workstations, and networking devices. Perfect for temporary projects, events, training programs, or startups needing flexible IT solutions without large upfront investments."
    },
    {
        question: "What areas does YantraQ serve in Madhya Pradesh?",
        answer: "YantraQ primarily serves Bhopal and surrounding areas within a 50km radius. We provide IT hardware sales, rental, and support services across Madhya Pradesh including delivery, installation, and on-site support for businesses, educational institutions, government offices, and enterprises."
    },
    {
        question: "How quickly can I get IT hardware delivered in Bhopal?",
        answer: "YantraQ offers same-day delivery and installation services in Bhopal for most IT hardware products. For rentals, we can set up your equipment within 24-48 hours. Contact us at +91 70003 02682 or connect@yantraq.com for urgent requirements."
    },
    {
        question: "What makes YantraQ the best IT hardware company in Bhopal?",
        answer: "YantraQ stands out as Bhopal's most trusted IT hardware provider due to our: 10+ years of experience, enterprise-grade genuine products, flexible rental plans, affordable pricing, 24/7 technical support, same-day delivery, expert installation services, and comprehensive AMC packages. We serve 500+ businesses across Madhya Pradesh."
    },
    {
        question: "Does YantraQ offer bulk IT hardware for offices and companies?",
        answer: "Absolutely! YantraQ specializes in bulk IT hardware supply for corporate offices, startups, educational institutions, and government organizations in Bhopal. We offer customized packages, volume discounts, complete IT infrastructure setup, and dedicated account management for enterprise clients."
    },
    {
        question: "Can I rent IT equipment for short-term projects in Bhopal?",
        answer: "Yes, YantraQ provides flexible IT hardware rental solutions for short-term needs including events, training programs, conferences, temporary offices, and project-based requirements. Rental periods range from daily to monthly to yearly based on your business needs."
    },
    {
        question: "Do you provide IT hardware repair and AMC services?",
        answer: "YantraQ offers comprehensive IT hardware repair and maintenance services including Annual Maintenance Contracts (AMC) for all types of IT equipment. Our certified technicians provide on-site support, troubleshooting, preventive maintenance, and emergency repairs across Bhopal and nearby regions."
    }
];

// Generate FAQ Schema for SEO
export const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
        }
    }))
};

const FAQ = () => {
    return (
        <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                        <HelpCircle className="w-4 h-4 inline mr-2" />
                        Frequently Asked Questions
                    </span>
                    <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                        Everything You Need to Know About YantraQ
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Common questions about our IT hardware sales and rental services in Bhopal
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="max-w-3xl mx-auto"
                >
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className="text-left">
                                    <span className="font-semibold">{faq.question}</span>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <p className="text-muted-foreground mb-4">
                        Have more questions about IT hardware rental or sales in Bhopal?
                    </p>
                    <a
                        href="tel:+917000302682"
                        className="text-primary font-medium hover:underline"
                    >
                        Call us at +91 70003 02682
                    </a>
                    {" or "}
                    <a
                        href="mailto:connect@yantraq.com"
                        className="text-primary font-medium hover:underline"
                    >
                        email connect@yantraq.com
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default FAQ;
