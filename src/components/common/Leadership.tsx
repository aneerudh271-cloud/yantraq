import { motion } from 'framer-motion';

interface Executive {
    name: string;
    title: string;
    bio: string;
    image: string;
}

const executives: Executive[] = [
    {
        name: 'Mr. Aditya Shrivastava',
        title: 'President',
        bio: 'With over 15 years in the industry, Aditya has driven YantraQ\'s growth through innovative partnerships and a commitment to ethical governance, ensuring the company remains at the forefront of technological advancements while fostering a culture of excellence and sustainability.',
        image: '/addityaPresident.png'
    },
    {
        name: 'Mr. Sahil Rai',
        title: 'Chief of Sales',
        bio: 'Sahil brings a wealth of experience in B2B sales and relationship management, having spearheaded campaigns that boosted YantraQ\'s market share by 40% in the past two years. He excels in building long-term client relationships, leveraging data-driven insights to tailor solutions that meet diverse industry needs, and mentoring a high-performing sales force to exceed targets while promoting a customer-centric approach.',
        image: '/sahilchief.png'
    }
];

const Leadership = () => {
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
                        Leadership Team
                    </span>
                    <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                        Meet Our Executive Team
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Driven by visionary leadership and expertise, our executive team guides YantraQ towards innovation and excellence in IT solutions.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {executives.map((executive, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative h-full"
                        >
                            {/* Glow Effect on Hover */}
                            <div className="absolute -inset-0.5 bg-gradient-to-b from-primary/50 to-transparent rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500" />

                            <div className="relative h-full bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 flex flex-col">
                                {/* Top Section with Background Gradient */}
                                <div className="relative h-24 bg-gradient-to-b from-primary/10 to-transparent" />

                                {/* Profile Image - Overlapping */}
                                <div className="px-6 -mt-12 flex justify-between items-end mb-4">
                                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-4 border-card shadow-xl group-hover:scale-105 transition-transform duration-500">
                                        <img
                                            src={executive.image}
                                            alt={`${executive.name} - ${executive.title} at YantraQ`}
                                            width={96}
                                            height={96}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="px-6 pb-6 flex flex-col flex-grow">
                                    <div className="mb-4">
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
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Leadership;