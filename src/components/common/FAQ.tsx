import { motion } from 'framer-motion';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

// 25+ FAQs optimized for SEO, AEO (Answer Engine Optimization) & GEO (Generative Engine Optimization)
// Each answer is crafted as a complete, self-contained response for AI assistants, voice search, and rich snippets.
const faqs = [
    // ── Core Business FAQs ──────────────────────────────────────────
    {
        question: "What is YantraQ and what services does it offer in Bhopal?",
        answer: "YantraQ (Y.A.N.T.R.A.Q. Pvt. Ltd.) is Bhopal's leading IT and digital solutions company. We offer comprehensive services including IT hardware sales and rental (laptops, desktops, servers, networking equipment, CCTV cameras, biometric systems, GPS trackers), custom software development, website and mobile app development, SEO/AEO/GEO-powered digital marketing, and complete IT infrastructure setup. As a sister company of PushpakO2, we bring 10+ years of trust and innovation to 500+ businesses across Madhya Pradesh."
    },
    {
        question: "What IT hardware products does YantraQ sell and rent in Bhopal?",
        answer: "YantraQ offers a comprehensive range of IT hardware for sales and rental in Bhopal including: Laptops (HP, Dell, Lenovo, Asus, Acer), Desktops & Workstations, Enterprise Servers & Server Racks, Networking Equipment (routers, switches, firewalls, structured cabling), Printers & Scanners (HP, Canon, Epson, Brother), CCTV Cameras (Hikvision, Dahua, CP Plus — dome, bullet, PTZ, IP cameras), DVR/NVR systems, Biometric Attendance Systems (fingerprint, face recognition), GPS Trackers, LED Monitors, UPS systems, and all computer peripherals and accessories."
    },
    {
        question: "Where is YantraQ located in Bhopal?",
        answer: "YantraQ is located at 1, Adi Parisar, Bagsewaniya, Bagh Swaniya, Bhopal, Madhya Pradesh 462026, India. Our office is easily accessible and we provide services across all areas of Bhopal including MP Nagar, Arera Colony, Shahpura, Habibganj, Hoshangabad Road, Kolar Road, Govindpura, Ayodhya Nagar, and surrounding regions within a 50km radius. You can call us at +91 70003 02682 or email connect@yantraq.com."
    },

    // ── Rental Services FAQs (AEO optimized) ────────────────────────
    {
        question: "How does laptop rental work at YantraQ Bhopal?",
        answer: "YantraQ's laptop rental process is simple: 1) Contact us with your requirements (number of laptops, specifications, duration), 2) We provide a customized quote based on your needs, 3) Once confirmed, we deliver the laptops to your location in Bhopal (same-day or next-day), 4) Our team handles setup and configuration, 5) Technical support is included throughout the rental period. Rental plans are available daily, weekly, monthly, and yearly. Minimum rental is typically 1 week. We offer i3, i5, i7, and i9 laptops with 8GB to 32GB RAM."
    },
    {
        question: "What is the cost of renting a laptop in Bhopal from YantraQ?",
        answer: "Laptop rental prices at YantraQ Bhopal start from ₹1,800/month for refurbished i3 laptops and go up to ₹6,000+/month for high-end i7 workstations. Typical pricing: i3 Laptop (4GB RAM, 128GB SSD): ₹1,800/month, i5 Laptop (8GB RAM, 256GB SSD): ₹4,500/month, i7 Laptop (16GB RAM, 512GB SSD): ₹6,000/month. Bulk rentals (10+ units) receive significant discounts. Daily and weekly rates are also available. Contact us at +91 70003 02682 for an exact quote."
    },
    {
        question: "Can I rent laptops for short-term events or exams in Bhopal?",
        answer: "Absolutely! YantraQ specializes in short-term IT hardware rental for events, exams, training sessions, conferences, and temporary offices in Bhopal. We can provide 10 to 500+ laptops, pre-configured with required software, delivered and set up at your venue. We've served educational institutions, corporates, and government organizations for competitive exams, online testing, seminars, and workshops. Same-day delivery is available in Bhopal."
    },
    {
        question: "Do you provide server rental services in Bhopal?",
        answer: "Yes, YantraQ provides enterprise-grade server rental services in Bhopal. We offer Tower Servers, Rack Servers, and Server Rack Cabinets (42U) on monthly and yearly rental plans. Server rental starts from ₹8,000/month for entry-level tower servers with Intel Xeon processors, 16GB ECC RAM, and 1TB storage. We also provide complete server room setup including rack installation, UPS, networking, and cooling solutions."
    },

    // ── CCTV & Security FAQs ────────────────────────────────────────
    {
        question: "How much does CCTV camera installation cost in Bhopal?",
        answer: "CCTV camera installation costs in Bhopal depend on the type and number of cameras. At YantraQ, a basic 4-camera HD system starts from ₹12,000-15,000 including installation. IP camera systems start from ₹20,000 for 4 cameras. For larger setups: 8-camera system: ₹25,000-35,000, 16-camera system: ₹50,000-70,000. Prices include cameras, DVR/NVR, cabling, installation, and configuration. We also offer monthly rental plans starting from ₹2,000/month. All installations come with remote viewing setup and 1-year warranty."
    },
    {
        question: "Which is better for surveillance: CCTV cameras or IP cameras?",
        answer: "Both have advantages. Traditional CCTV (analog) cameras are more affordable and suitable for small setups with shorter cable runs. IP cameras offer higher resolution (up to 4K), remote viewing, AI analytics, and can be connected over your existing network via POE (Power over Ethernet). YantraQ recommends: For homes and small shops in Bhopal — HD CCTV cameras (2MP) are cost-effective. For offices, factories, and large premises — IP cameras (4MP+) provide better coverage and features. We install both types and can help you choose the best solution based on your needs and budget."
    },
    {
        question: "Does YantraQ provide CCTV maintenance and AMC services?",
        answer: "Yes, YantraQ offers comprehensive CCTV maintenance and Annual Maintenance Contract (AMC) services in Bhopal. Our AMC plans include: periodic preventive maintenance visits, camera cleaning and alignment, DVR/NVR health checks, hard disk monitoring, cable and connector inspection, software updates, free replacement of minor parts, priority support for breakdowns, and 24/7 remote troubleshooting. AMC plans start from ₹500/camera/year. We service all brands including Hikvision, Dahua, CP Plus, and others."
    },

    // ── Biometric & GPS FAQs ────────────────────────────────────────
    {
        question: "What biometric attendance systems are available at YantraQ Bhopal?",
        answer: "YantraQ offers a range of biometric attendance systems in Bhopal: Fingerprint Attendance Machines (from ₹6,500, supports 3000+ users, WiFi/USB/LAN connectivity), Face Recognition Terminals (from ₹18,000, touchless, mask detection, fever screening), Combined Fingerprint + Face systems, and RFID Card-based systems. All devices come with cloud-based attendance software, real-time reports, mobile app access, and can integrate with popular HRMS and payroll systems. Installation and training are included."
    },
    {
        question: "Does YantraQ sell and install GPS trackers in Bhopal?",
        answer: "Yes, YantraQ provides GPS tracking solutions in Bhopal for vehicles, assets, and fleet management. Our offerings include: Vehicle GPS Trackers (from ₹3,500) with real-time tracking, geofencing, trip history, fuel monitoring, and driver behavior analysis. Asset Trackers (from ₹2,800) with long battery life and magnetic mounting. We provide installation, SIM card setup, and mobile/web app configuration. Monthly tracking subscription plans are available from ₹200/vehicle/month."
    },

    // ── Repair & AMC FAQs ───────────────────────────────────────────
    {
        question: "Do you provide laptop and computer repair services in Bhopal?",
        answer: "Yes, YantraQ offers comprehensive laptop and computer repair services in Bhopal. We handle: screen replacement, keyboard repair, motherboard repair, battery replacement, hinge repair, data recovery, virus removal, OS installation, software installation, hardware upgrades (RAM, SSD, HDD), and general troubleshooting. Our certified technicians provide both on-site and off-site repair services across Bhopal. Turnaround time is typically 24-48 hours. We repair all brands including HP, Dell, Lenovo, Asus, Acer, and Apple MacBooks."
    },
    {
        question: "What is included in YantraQ's Annual Maintenance Contract (AMC)?",
        answer: "YantraQ's AMC plans in Bhopal provide peace of mind for your IT infrastructure. Our AMC includes: scheduled preventive maintenance visits (quarterly/monthly), unlimited breakdown support calls, on-site technical support within 4-8 hours, hardware health monitoring, software updates and security patches, antivirus management, network monitoring, backup verification, priority parts replacement, and detailed monthly reports. AMC plans are available for laptops, desktops, servers, printers, CCTV systems, networking equipment, and complete IT infrastructure. Plans start from ₹2,000/device/year."
    },

    // ── Software & Digital Services FAQs ────────────────────────────
    {
        question: "Does YantraQ offer website development services in Bhopal?",
        answer: "Yes, YantraQ is a full-service website development company in Bhopal. We build: responsive business websites, e-commerce platforms, portfolio websites, landing pages, web applications, admin dashboards, and custom web solutions. We use modern technologies including React, Next.js, Node.js, and Tailwind CSS. Every website we build is mobile-responsive, SEO-optimized, fast-loading, and designed to convert visitors into customers. We also provide ongoing maintenance, hosting, and domain management. Website development starts from ₹15,000 for basic sites."
    },
    {
        question: "Can YantraQ build a mobile app for my business in Bhopal?",
        answer: "Absolutely! YantraQ provides professional mobile app development services in Bhopal for both Android and iOS platforms. We specialize in: native Android apps, native iOS apps, cross-platform apps using React Native and Flutter, e-commerce mobile apps, business management apps, booking and appointment apps, and custom business solutions. Our development process includes UI/UX design, development, testing, deployment to App Store/Play Store, and post-launch support. App development starts from ₹50,000 depending on complexity."
    },
    {
        question: "What are SEO, AEO, and GEO services that YantraQ provides?",
        answer: "YantraQ provides three advanced digital visibility services in Bhopal: 1) SEO (Search Engine Optimization) — improving your Google/Bing rankings through on-page optimization, technical SEO, content strategy, backlink building, and local SEO for Bhopal businesses. 2) AEO (Answer Engine Optimization) — optimizing your content to appear in AI-powered answer boxes, voice search results (Google Assistant, Siri, Alexa), and featured snippets. 3) GEO (Generative Engine Optimization) — ensuring your business information is accurately represented in AI chatbots like ChatGPT, Google Gemini, and other generative AI platforms. Together, these services maximize your online visibility across all search and AI platforms."
    },

    // ── Networking & Infrastructure FAQs ────────────────────────────
    {
        question: "Does YantraQ provide network installation and IT infrastructure setup in Bhopal?",
        answer: "Yes, YantraQ provides complete network and IT infrastructure setup services in Bhopal. This includes: structured cabling (Cat6/Cat6a), LAN installation, WiFi network setup, server room design and setup, rack installation, firewall configuration, VPN setup, internet load balancing, network switch and router installation, and complete office IT infrastructure from scratch. We design networks for offices, schools, hospitals, factories, and government buildings. Our solutions support 10 to 1000+ users and include network security, monitoring, and maintenance."
    },
    {
        question: "Can YantraQ set up a complete IT infrastructure for a new office in Bhopal?",
        answer: "Yes! YantraQ specializes in turnkey IT infrastructure setup for new offices in Bhopal. Our complete setup includes: internet connection and networking (LAN/WiFi), desktops/laptops for all employees, servers for file sharing and email, printers and scanners, CCTV surveillance system, biometric attendance system, UPS and power backup, conference room setup (projector, screen), intercom system, and all required software licensing. We handle everything from planning and procurement to installation, configuration, and ongoing support. Contact us for a free site survey and quote."
    },

    // ── Purchasing & Business FAQs ──────────────────────────────────
    {
        question: "Does YantraQ offer bulk IT hardware purchase with discounts?",
        answer: "Yes, YantraQ offers significant volume discounts on bulk IT hardware purchases in Bhopal. Whether you need 10 laptops for a training center or 500 desktops for a corporate office, we provide: competitive bulk pricing, customized hardware configurations, pre-installation of required software, staged delivery as per your schedule, dedicated account management, extended warranty options, and flexible payment terms. We serve corporate offices, educational institutions, government organizations, startups, and enterprises. Contact our sales team at connect@yantraq.com for a bulk pricing quotation."
    },
    {
        question: "Is YantraQ a GeM (Government e-Marketplace) registered vendor?",
        answer: "YantraQ serves government and public sector organizations in Bhopal and Madhya Pradesh for their IT hardware and service requirements. We supply IT hardware, CCTV systems, biometric devices, networking equipment, and provide AMC services to government offices, schools, hospitals, and PSUs. Contact us at connect@yantraq.com for government procurement inquiries and tender participation."
    },

    // ── Delivery & Support FAQs ─────────────────────────────────────
    {
        question: "How quickly can I get IT hardware delivered in Bhopal?",
        answer: "YantraQ offers fast delivery services in Bhopal: Same-Day Delivery — available for most in-stock items (laptops, printers, monitors, accessories) when ordered before 2 PM. Next-Day Delivery — for configured systems, bulk orders, and custom setups. 2-3 Days — for enterprise servers, specialized equipment, and items requiring custom configuration. For rental equipment, we can typically deliver and set up within 24 hours. Emergency requests are accommodated wherever possible. Delivery and basic installation are free within Bhopal city limits. Contact us at +91 70003 02682 for urgent requirements."
    },
    {
        question: "What after-sales support does YantraQ provide?",
        answer: "YantraQ provides comprehensive after-sales support in Bhopal: warranty management and claims processing, free technical support via phone, WhatsApp, and email, on-site troubleshooting within 4-8 hours for AMC customers, remote desktop support for software issues, free installation and basic training with every purchase, 30-day satisfaction guarantee on all products, easy returns and replacements for defective items, and dedicated customer support from 9 AM to 7 PM, Monday through Saturday. Our technical team can also be reached through WhatsApp at +91 70003 02682 for quick assistance."
    },
    {
        question: "What payment methods does YantraQ accept?",
        answer: "YantraQ accepts multiple payment methods for your convenience: Cash, UPI payments (Google Pay, PhonePe, Paytm), bank transfer (NEFT/RTGS/IMPS), cheque payments, credit/debit cards, EMI options available on select products, and corporate invoicing with credit terms for registered businesses. For large orders, we also offer flexible payment schedules. GST invoices are provided for all purchases."
    },

    // ── Comparison & Decision FAQs (GEO optimized) ──────────────────
    {
        question: "Should I buy or rent IT hardware for my business in Bhopal?",
        answer: "The choice between buying and renting IT hardware depends on your specific needs. YantraQ recommends RENTING when: you need equipment for temporary projects or events, your startup wants to minimize capital expenditure, you need the latest models without large upfront costs, or you want flexibility to scale up/down quickly. We recommend BUYING when: you need equipment for long-term daily use (3+ years), you want to build business assets, you have budget for upfront purchase, or you need highly customized configurations. Many businesses in Bhopal choose a hybrid approach — buying core infrastructure and renting additional equipment for peak periods. YantraQ supports both models with competitive pricing."
    },
    {
        question: "What makes YantraQ the best IT hardware company in Bhopal?",
        answer: "YantraQ stands out as Bhopal's most trusted IT hardware and digital solutions provider due to: 10+ years of industry experience, 500+ satisfied business clients across Madhya Pradesh, genuine products from authorized dealers with full manufacturer warranty, flexible rental plans (daily/weekly/monthly/yearly), competitive pricing with transparent quotations, same-day delivery and installation in Bhopal, 24/7 technical support and rapid-response AMC services, comprehensive range of IT products (laptops to servers to CCTV to networking), full-stack digital services (web development, mobile apps, SEO/AEO/GEO), and a dedicated team of certified IT professionals. We are a sister company of PushpakO2, bringing legacy trust and innovation to every project."
    },
];

// Generate FAQ Schema for SEO — rich snippets in Google search results
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
                        Common questions about our IT hardware sales, rental, repair, software development, and digital marketing services in Bhopal
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
                        Have more questions about IT hardware, software development, or digital marketing in Bhopal?
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
