import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { company } from '@/data/company';

const Privacy = () => {
  return (
    <Layout>
      <section className="py-16 gradient-dark text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-300">Last updated: January 2024</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="prose prose-lg max-w-none"
          >
            <h2 className="font-display text-2xl font-bold mb-4">1. Information We Collect</h2>
            <p className="text-muted-foreground mb-6">
              We collect information you provide directly to us, such as when you fill out a
              contact form, request a quote, or communicate with us. This may include your name,
              email address, phone number, company name, and any other information you choose to provide.
            </p>

            <h2 className="font-display text-2xl font-bold mb-4">2. How We Use Your Information</h2>
            <p className="text-muted-foreground mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Respond to your inquiries and provide customer service</li>
              <li>Process and fulfill your orders</li>
              <li>Send you technical notices and support messages</li>
              <li>Communicate about products, services, and promotional offers</li>
              <li>Improve our services and develop new features</li>
            </ul>

            <h2 className="font-display text-2xl font-bold mb-4">3. Information Sharing</h2>
            <p className="text-muted-foreground mb-6">
              We do not sell, trade, or otherwise transfer your personal information to third parties
              without your consent, except as necessary to provide our services or as required by law.
            </p>

            <h2 className="font-display text-2xl font-bold mb-4">4. Data Security</h2>
            <p className="text-muted-foreground mb-6">
              We implement appropriate security measures to protect your personal information against
              unauthorized access, alteration, disclosure, or destruction. However, no method of
              transmission over the Internet is 100% secure.
            </p>

            <h2 className="font-display text-2xl font-bold mb-4">5. Cookies</h2>
            <p className="text-muted-foreground mb-6">
              Our website may use cookies to enhance your browsing experience. You can choose to
              disable cookies through your browser settings, but this may affect some functionality
              of our website.
            </p>

            <h2 className="font-display text-2xl font-bold mb-4">6. Your Rights</h2>
            <p className="text-muted-foreground mb-6">
              You have the right to access, correct, or delete your personal information. You may
              also opt out of receiving promotional communications from us at any time by following
              the instructions in those messages.
            </p>

            <h2 className="font-display text-2xl font-bold mb-4">7. Contact Us</h2>
            <p className="text-muted-foreground mb-6">
              If you have any questions about this Privacy Policy, please contact us at:
              <br /><br />
              <strong>Y.A.N.T.R.A.Q. Pvt. Ltd.</strong><br />
              Email: {company.contact.emails.sales}<br />
              Phone: {company.contact.phone}<br />
              Address: {company.address.line1}, {company.address.line2}, {company.address.city}, {company.address.state} {company.address.pincode}
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Privacy;
