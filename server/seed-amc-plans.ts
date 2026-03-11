import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AMCPlan from './models/AMCPlan.js';
import connectDB from './db.js';

dotenv.config();

const plans = [
    {
        name: 'Basic Plan',
        price: '₹2,000/yr',
        features: [
            '2 Preventive Maintenance Visits per year',
            'Telephone & Remote Desktop Support',
            'Standard Response Time (24-48 hrs)',
            'Basic Hardware Health Check',
            'Anti-virus Updates & Scans',
            'OS Optimization & Cleanup',
        ],
        popular: false,
        isActive: true
    },
    {
        name: 'Standard Plan',
        price: '₹4,500/yr',
        features: [
            '4 Preventive Maintenance Visits per year',
            'Priority Telephone & Remote Support',
            'Fast Response Time (12-24 hrs)',
            'Comprehensive Hardware Diagnostics',
            'Network & Wi-Fi Troubleshooting',
            'Data Backup Configuration',
            'Printer & Peripheral Support',
            'Discounted Spare Parts',
        ],
        popular: true,
        isActive: true
    },
    {
        name: 'Premium Plan',
        price: '₹8,000/yr',
        features: [
            '12 Preventive Maintenance Visits (Monthly)',
            '24/7 Priority Support Line',
            'Rapid Response Time (4-8 hrs)',
            'Dedicated Account Manager',
            'Free Minor Spare Parts Replacement',
            'Standby Equipment during Repairs',
            'Complete Network Security Audit',
            'Disaster Recovery Planning',
            'Quarterly IT Strategy Review',
        ],
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
