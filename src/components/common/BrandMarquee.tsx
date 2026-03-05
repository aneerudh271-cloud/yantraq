"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

interface Partner {
    _id: string;
    name: string;
    logo: string;
    isActive: boolean;
}

const fallbackBrands = [
    { name: 'HP', logo: 'https://logo.clearbit.com/hp.com' },
    { name: 'Dell', logo: 'https://logo.clearbit.com/dell.com' },
    { name: 'Lenovo', logo: 'https://logo.clearbit.com/lenovo.com' },
    { name: 'Microsoft', logo: 'https://logo.clearbit.com/microsoft.com' },
    { name: 'Cisco', logo: 'https://logo.clearbit.com/cisco.com' },
    { name: 'Hikvision', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Hikvision_logo.svg' },
    { name: 'Adobe', logo: 'https://logo.clearbit.com/adobe.com' },
    { name: 'Canon', logo: 'https://logo.clearbit.com/canon.com' },
    { name: 'Epson', logo: 'https://logo.clearbit.com/epson.com' },
    { name: 'TP-Link', logo: 'https://logo.clearbit.com/tp-link.com' },
    { name: 'CP Plus', logo: 'https://logo.clearbit.com/cpplusworld.com' },
    { name: 'Tally', logo: 'https://logo.clearbit.com/tallysolutions.com' },
];

const BrandItem = ({ brand }: { brand: any }) => {
    const [imageError, setImageError] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center w-44 px-6 py-4 rounded-2xl bg-white shadow-[0_2px_10px_-3px_rgba(0,0,0,0.07)] border border-slate-100/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 group">
            <div className="h-14 flex items-center justify-center mb-3">
                {imageError ? (
                    <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary font-bold text-xl border border-primary/10">
                        {brand.name ? brand.name.charAt(0).toUpperCase() : '?'}
                    </div>
                ) : (
                    <img
                        src={brand.logo}
                        alt={`${brand.name} Authorized Dealer`}
                        className="max-w-full max-h-full object-contain filter brightness-100"
                        loading="lazy"
                        width={144}
                        height={56}
                        onError={() => setImageError(true)}
                    />
                )}
            </div>
            <span className="text-[11px] font-bold text-slate-500 group-hover:text-primary uppercase tracking-[0.15em] transition-colors">
                {brand.name}
            </span>
        </div>
    );
};

export const BrandMarquee = () => {
    const { data: dbPartners } = useQuery({
        queryKey: ['partners'],
        queryFn: () => api.get('/partners'),
        retry: false,
    });

    const activePartners = dbPartners?.length > 0
        ? dbPartners.filter((p: Partner) => p.isActive)
        : fallbackBrands;

    // Double/Triple the brands for seamless looping
    const displayBrands = [...activePartners, ...activePartners, ...activePartners, ...activePartners];

    return (
        <div className="py-14 bg-slate-50/50 border-y border-slate-100 overflow-hidden relative">
            <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

            <div className="container mx-auto px-4 mb-10 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Official Distribution Partners</span>
                </div>
                <h2 className="text-xl font-display font-bold text-slate-900">
                    Trusted by Global Leaders
                </h2>
            </div>

            <div className="flex relative items-center">
                {/* Gradient Fades for Smooth Edges */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10" />

                <motion.div
                    animate={{
                        x: [0, -2500],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 50,
                            ease: "linear",
                        },
                    }}
                    className="flex gap-8 whitespace-nowrap min-w-max items-center px-4"
                >
                    {displayBrands.map((brand, index) => (
                        <BrandItem key={index} brand={brand} />
                    ))}
                </motion.div>
            </div>
        </div>
    );
};
