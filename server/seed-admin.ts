import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import connectDB from './db.js';

dotenv.config();

const seedAdmin = async () => {
    try {
        await connectDB();

        const adminEmail = 'kuldeepmaurya4296@gmail.com';
        const adminPassword = '123456';

        // Check if admin already exists
        const userExists = await User.findOne({ email: adminEmail });

        if (userExists) {
            console.log('Admin user already exists');
            process.exit(0);
        }

        const user = await User.create({
            email: adminEmail,
            password: adminPassword,
            role: 'admin',
        });

        console.log(`Admin user created: ${user.email}`);
        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
