import { motion } from 'framer-motion';
import { useRef } from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

interface Executive {
    name: string;
    title: string;
    bio: string;
    image: string;
}

const executives: Executive[] = [
    {
        name: 'Mr. Aditya Shrivastava',
        title: 'President & Co-Founder',
        bio: 'With over 15 years of industry expertise, Aditya drives YantraQ\'s growth through innovative partnerships and ethical governance, ensuring the company remains at the forefront of technological advancements while consistently fostering a strong culture of team excellence and operational sustainability.',
        image: '/addityaPresident.png'
    },
    {
        name: 'Mr. Aneerudh Kumar',
        title: 'Co-Founder & Technology Lead',
        bio: 'As Co-Founder and Technology Lead of PushpakO2, Aneerudh is the principal architect behind core engineering systems. He leads the end-to-end development of advanced aviation and unmanned aerial solutions, masterfully spanning concept design, system architecture, prototyping, rigorous testing, and implementation.',
        image: '/aneerudh.jpeg'
    },
    {
        name: "Mr. Vardan Khurana",
        title: "Executive Sales Director",
        bio: "With 16+ years of experience in industrial sales, Vardan successfully drives business growth across vital sectors like HVAC, defence, and heavy electricals. He specializes in cultivating strategic client relationships, delivering tailored industrial solutions, and spearheading high-impact regional business initiatives.",
        image: "/vardan.jpg"
    },
    {
        name: 'Mr. Sahil Rai',
        title: 'Sales Manager',
        bio: 'Sahil brings extensive experience in B2B sales, spearheading strategic campaigns that have significantly boosted YantraQ\'s market share. He excels in building long-term client relationships, utilizing data-driven insights to tailor cross-industry solutions, and actively mentoring a high-performing, customer-centric sales force.',
        image: '/sahilchief.png'
    },
];

const Leadership = () => {
    const plugin = useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
    );

    return (
        <section className="py-20 bg-muted/30 ">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                        Leadership Team
                    </span>
                    <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                        Meet Our Executive Team
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Driven by visionary leadership and expertise, our executive team guides YantraQ towards innovation and excellence in IT solutions.
                    </p>
                </motion.div>

                <div className="max-w-full mx-auto relative px-4 md:px-12">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                            dragFree: true,
                        }}
                        plugins={[plugin.current]}
                        className="w-full"
                        onMouseEnter={plugin.current.stop}
                        onMouseLeave={plugin.current.reset}
                    >
                        <CarouselContent className="-ml-4 items-stretch">
                            {executives.map((executive, index) => (
                                <CarouselItem
                                    key={index}
                                    className="pl-4 basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4 flex"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="group relative w-full h-full flex flex-col py-2"
                                    >
                                        {/* Glow Effect on Hover */}
                                        <div className="absolute inset-x-0 inset-y-2 bg-gradient-to-b from-primary/50 to-transparent rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500" />

                                        <div className="relative w-full h-full bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 flex flex-col flex-grow">
                                            {/* Top Section with Background Gradient */}
                                            <div className="relative h-24 bg-gradient-to-b from-primary/10 to-transparent flex-shrink-0" />

                                            {/* Profile Image - Overlapping */}
                                            <div className="px-6 -mt-12 flex justify-between items-end mb-4 flex-shrink-0">
                                                <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-4 border-card bg-card shadow-xl group-hover:scale-105 transition-transform duration-500">
                                                    <img
                                                        src={executive.image}
                                                        alt={`${executive.name} - ${executive.title} at YantraQ`}
                                                        className="w-full h-full object-cover"
                                                        loading="lazy"
                                                    />
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="px-6 pb-6 flex flex-col flex-grow">
                                                <div className="mb-4 flex-shrink-0">
                                                    <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                                                        {executive.name}
                                                    </h3>
                                                    <p className="text-sm font-medium text-primary">
                                                        {executive.title}
                                                    </p>
                                                </div>

                                                <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                                                    {executive.bio}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <div className={`hidden md:block ${executives.length <= 4 ? 'xl:hidden' : ''} ${executives.length <= 3 ? 'lg:hidden' : ''} ${executives.length <= 2 ? 'md:hidden' : ''}`}>
                            <CarouselPrevious className="-left-12 opacity-80 hover:opacity-100" />
                            <CarouselNext className="-right-12 opacity-80 hover:opacity-100" />
                        </div>
                    </Carousel>
                </div>
            </div>
        </section>
    );
};

export default Leadership;