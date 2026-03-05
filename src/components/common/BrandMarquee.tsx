import { motion } from 'framer-motion';

const brands = [
    { name: 'HP', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg' },
    { name: 'Dell', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Dell_logo_2016.svg' },
    { name: 'Lenovo', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Lenovo_logo_2015.svg' },
    { name: 'Cisco', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg' },
    { name: 'Hikvision', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Hikvision_logo.svg' },
    { name: 'Dahua', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Dahua_Technology_logo.svg' },
    { name: 'CP Plus', logo: 'https://upload.wikimedia.org/wikipedia/en/3/3c/CP_Plus_logo.png' },
    { name: 'Canon', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Canon_logo.svg' },
    { name: 'Epson', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Epson_logo.svg' },
    { name: 'TP-Link', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/TP-Link_logo.svg' },
];

export const BrandMarquee = () => {
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
                        x: [0, -1500],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 30,
                            ease: "linear",
                        },
                    }}
                    className="flex gap-12 whitespace-nowrap min-w-max"
                >
                    {[...brands, ...brands, ...brands].map((brand, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center w-32 h-16 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
                        >
                            <img
                                src={brand.logo}
                                alt={`${brand.name} Authorized Dealer`}
                                className="max-w-full max-h-full object-contain"
                                loading="lazy"
                                width={128}
                                height={64}
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};
