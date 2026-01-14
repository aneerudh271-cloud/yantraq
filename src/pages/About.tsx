import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { SectionHeader } from '@/components/common/SectionHeader';
import { Card, CardContent } from '@/components/ui/card';
import { industries } from '@/data/services';
import { Shield, Target, Eye, Users, Award, Clock } from 'lucide-react';

const About = () => {
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
              About SecureNet
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Your trusted partner for IT hardware solutions since 2010
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                Our Story
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                Building Trust Through Technology
              </h2>
              <p className="text-muted-foreground mb-6">
                SecureNet IT Solutions was founded in 2010 with a simple mission: to provide 
                businesses with reliable, affordable, and cutting-edge IT hardware solutions. 
                What started as a small venture has grown into one of the region's most trusted 
                IT service providers.
              </p>
              <p className="text-muted-foreground mb-6">
                Today, we serve over 500+ businesses across various industries, offering 
                comprehensive solutions from CCTV surveillance and biometric systems to 
                enterprise servers and networking infrastructure. Our team of certified 
                professionals ensures that every client receives personalized attention and 
                top-quality service.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted rounded-xl">
                  <p className="font-display text-3xl font-bold text-primary">15+</p>
                  <p className="text-sm text-muted-foreground">Years Experience</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-xl">
                  <p className="font-display text-3xl font-bold text-primary">500+</p>
                  <p className="text-sm text-muted-foreground">Happy Clients</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-xl">
                  <p className="font-display text-3xl font-bold text-primary">10K+</p>
                  <p className="text-sm text-muted-foreground">Installations</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl" />
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600"
                alt="Our Team"
                className="relative rounded-3xl shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-6">
                    <Target className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-4">Our Mission</h3>
                  <p className="text-muted-foreground">
                    To empower businesses with reliable, innovative, and cost-effective IT 
                    solutions that enhance security, productivity, and growth. We strive to 
                    be the go-to partner for all IT hardware needs, delivering excellence 
                    in every project.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-6">
                    <Eye className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-4">Our Vision</h3>
                  <p className="text-muted-foreground">
                    To become the leading IT solutions provider in the region, known for 
                    our commitment to quality, customer satisfaction, and technological 
                    innovation. We aim to set industry standards in IT hardware sales, 
                    service, and rental.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            badge="Our Values"
            title="What Drives Us"
            description="The principles that guide everything we do"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Integrity', desc: 'Honest dealings and transparent pricing in every interaction' },
              { icon: Award, title: 'Quality', desc: 'Only genuine products from authorized dealers with full warranty' },
              { icon: Users, title: 'Customer First', desc: 'Your success is our success — we go the extra mile' },
              { icon: Clock, title: 'Reliability', desc: 'Dependable service and support when you need it most' },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center hover:shadow-glow transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                      <value.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-lg mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 gradient-dark text-white">
        <div className="container mx-auto px-4">
          <SectionHeader
            badge="Industries"
            title="Who We Serve"
            description="Trusted by businesses across various sectors"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="p-6 bg-white/5 rounded-xl text-center hover:bg-white/10 transition-colors"
              >
                <span className="text-4xl block mb-3">{industry.icon}</span>
                <span className="text-sm font-medium">{industry.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
