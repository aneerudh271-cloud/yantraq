import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { FileText, Monitor, Box, Wrench, Shield, MessageCircle, Info } from 'lucide-react';
import { SEO } from '@/components/common/SEO';

const sitemapData = [
    {
        category: 'Main Pages',
        icon: <Monitor className="w-5 h-5" />,
        links: [
            { name: 'Home', href: '/' },
            { name: 'About Us', href: '/about' },
            { name: 'Contact Us', href: '/contact' },
            { name: 'Frequently Asked Questions', href: '/faq' },
        ]
    },
    {
        category: 'Products',
        icon: <Box className="w-5 h-5" />,
        links: [
            { name: 'All Products', href: '/products' },
            { name: 'CCTV Systems', href: '/products?category=cctv' },
            { name: 'Biometric Access', href: '/products?category=biometric' },
            { name: 'Laptops & Desktops', href: '/products?category=laptop-desktop' },
            { name: 'IT Servers', href: '/products?category=servers' },
            { name: 'Networking Equipment', href: '/products?category=network' },
            { name: 'Printers & Scanners', href: '/products?category=printers' },
            { name: 'LED Monitors', href: '/products?category=led-monitors' },
            { name: 'GPS Tracking', href: '/products?category=gps' },
        ]
    },
    {
        category: 'Services',
        icon: <Wrench className="w-5 h-5" />,
        links: [
            { name: 'All Services', href: '/services' },
            { name: 'IT Hardware Rentals', href: '/products?action=rent' },
            { name: 'IT Hardware Procurement', href: '/products?action=buy' },
            { name: 'IT Repair Services', href: '/products?action=repair' },
        ]
    },
    {
        category: 'Legal',
        icon: <Shield className="w-5 h-5" />,
        links: [
            { name: 'Privacy Policy', href: '/privacy' },
            { name: 'Terms & Conditions', href: '/terms' },
        ]
    }
];

const Sitemap = () => {
    return (
        <Layout>
            <SEO
                title="Sitemap"
                description="Navigate YantraQ's complete digital footprint. Find links to all our IT hardware products, services, contact information, and business policies in Bhopal."
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
                            Website Sitemap
                        </h1>
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                            A comprehensive directory of YantraQ's pages, products, and services
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Sitemap Content */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid md:grid-cols-2 gap-12">
                        {sitemapData.map((section, index) => (
                            <motion.div
                                key={section.category}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-card p-8 rounded-2xl shadow-sm border"
                            >
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                                    <div className="p-3 bg-primary/10 text-primary rounded-xl">
                                        {section.icon}
                                    </div>
                                    <h2 className="text-2xl font-bold font-display">{section.category}</h2>
                                </div>

                                <ul className="space-y-4">
                                    {section.links.map((link) => (
                                        <li key={link.name} className="flex items-center gap-2 group">
                                            <div className="w-2 h-2 rounded-full bg-muted-foreground/30 group-hover:bg-primary transition-colors" />
                                            <Link
                                                to={link.href}
                                                className="text-muted-foreground hover:text-primary transition-colors"
                                            >
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16 text-center p-8 bg-muted rounded-2xl"
                    >
                        <Info className="w-8 h-8 text-primary mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">Looking for something specific?</h3>
                        <p className="text-muted-foreground mb-6">
                            Our team is ready to help you find the exact IT solution you need.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link to="/contact">
                                <button className="px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors">
                                    Contact Support
                                </button>
                            </Link>
                            <Link to="/products">
                                <button className="px-6 py-2.5 border border-primary text-primary font-medium rounded-lg hover:bg-primary/5 transition-colors">
                                    Search Products
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
};

export default Sitemap;
