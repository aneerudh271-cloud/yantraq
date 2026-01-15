import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AMCPlan from './models/AMCPlan.js';
import connectDB from './db.js';

dotenv.config();

const plans = [
    {
        name: 'Basic',
        price: '₹5,000/year',
        features: ['Quarterly maintenance visits', 'Phone support', 'Basic troubleshooting', 'Software updates'],
        popular: false,
        isActive: true
    },
    {
        name: 'Standard',
        price: '₹12,000/year',
        features: ['Monthly maintenance visits', '24/7 phone support', 'On-site repairs', 'Parts at discount', 'Priority response'],
        popular: true,
        isActive: true
    },
    {
        name: 'Premium',
        price: '₹25,000/year',
        features: ['Weekly checkups', '24/7 dedicated support', 'Free parts replacement', 'Same-day response', 'Backup equipment'],
        popular: false,
        isActive: true
    },
];

const seedPlans = async () => {
    try {
        await connectDB();

        await AMCPlan.deleteMany({}); // Optional: clear existing
        await AMCPlan.insertMany(plans);

        console.log('AMC Plans seeded successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding plans:', error);
        process.exit(1);
    }
};

seedPlans();
