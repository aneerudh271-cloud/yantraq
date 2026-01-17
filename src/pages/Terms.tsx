import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { company } from '@/data/company';

const Terms = () => {
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
              Terms & Conditions
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
            <h2 className="font-display text-2xl font-bold mb-4">1. Agreement to Terms</h2>
            <p className="text-muted-foreground mb-6">
              By accessing or using our services, you agree to be bound by these Terms and Conditions.
              If you disagree with any part of these terms, you may not access our services.
            </p>

            <h2 className="font-display text-2xl font-bold mb-4">2. Products and Services</h2>
            <p className="text-muted-foreground mb-6">
              We offer IT hardware sales, rental, and repair services. All products are subject to
              availability. We reserve the right to modify or discontinue any product or service
              without prior notice.
            </p>

            <h2 className="font-display text-2xl font-bold mb-4">3. Pricing and Payment</h2>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>All prices are in Indian Rupees and exclusive of applicable taxes unless stated otherwise</li>
              <li>Prices are subject to change without notice</li>
              <li>Payment terms will be specified in individual quotations</li>
              <li>Late payments may incur additional charges</li>
            </ul>

            <h2 className="font-display text-2xl font-bold mb-4">4. Warranty</h2>
            <p className="text-muted-foreground mb-6">
              New products carry manufacturer's warranty as specified. Refurbished products carry
              a 6-month warranty from Y.A.N.T.R.A.Q. Pvt. Ltd. (YantraQ). Warranty does not cover damage due to
              misuse, accidents, or unauthorized modifications.
            </p>

            <h2 className="font-display text-2xl font-bold mb-4">5. Rental Terms</h2>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Rental equipment remains the property of Y.A.N.T.R.A.Q. Pvt. Ltd. (YantraQ)</li>
              <li>Customer is responsible for the equipment during the rental period</li>
              <li>Equipment must be returned in good working condition</li>
              <li>Damage or loss will be charged to the customer</li>
              <li>Security deposit may be required</li>
            </ul>

            <h2 className="font-display text-2xl font-bold mb-4">6. Repair Services</h2>
            <p className="text-muted-foreground mb-6">
              Repair estimates are provided free of charge. Actual repair costs may vary based on
              findings during repair. We use genuine spare parts wherever possible. Repair work
              carries a 30-day warranty.
            </p>

            <h2 className="font-display text-2xl font-bold mb-4">7. Limitation of Liability</h2>
            <p className="text-muted-foreground mb-6">
              Y.A.N.T.R.A.Q. Pvt. Ltd. (YantraQ) shall not be liable for any indirect, incidental, special,
              or consequential damages arising from the use of our products or services.
            </p>

            <h2 className="font-display text-2xl font-bold mb-4">8. Governing Law</h2>
            <p className="text-muted-foreground mb-6">
              These Terms shall be governed by and construed in accordance with the laws of India.
              Any disputes shall be subject to the exclusive jurisdiction of the courts in Bhopal,
              Madhya Pradesh.
            </p>

            <h2 className="font-display text-2xl font-bold mb-4">9. Contact Information</h2>
            <p className="text-muted-foreground mb-6">
              For any questions regarding these Terms & Conditions, please contact us at:
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

export default Terms;
