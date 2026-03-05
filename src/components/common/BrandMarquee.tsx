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

export const BrandMarquee = () => {
    const { data: dbPartners } = useQuery({
        queryKey: ['partners'],
        queryFn: () => api.get('/partners'),
        retry: false,
    });

    const activePartners = dbPartners?.length > 0
        ? dbPartners.filter((p: Partner) => p.isActive)
        : fallbackBrands;

    // Double the brands for seamless looping
    const displayBrands = [...activePartners, ...activePartners, ...activePartners];

    return (
        <div className="py-12 bg-white overflow-hidden">
            <div className="container mx-auto px-4 mb-8 text-center">
                <p className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                    Authorized Partners & Trusted Brands
                </p>
            </div>
            <div className="flex relative items-center">
                <motion.div
                    animate={{
                        x: [0, -2000],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 40, // Slower, smoother scroll
                            ease: "linear",
                        },
                    }}
                    className="flex gap-16 whitespace-nowrap min-w-max items-center"
                >
                    {displayBrands.map((brand, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center w-36 h-20 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
                        >
                            <img
                                src={brand.logo}
                                alt={`${brand.name} Authorized Dealer`}
                                className="max-w-full max-h-full object-contain"
                                loading="lazy"
                                width={144}
                                height={80}
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};
