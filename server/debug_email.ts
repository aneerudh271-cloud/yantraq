
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly load .env from parent directory (since this file is in server/)
// Assuming structure d:\connect-serve-main\server\debug_email.ts -> d:\connect-serve-main\.env
dotenv.config({ path: path.join(__dirname, '../.env') });

console.log("--- Email Debug Script ---");
console.log("Loading .env from:", path.join(__dirname, '../.env'));
console.log("SMTP_HOST:", process.env.SMTP_HOST);
console.log("SMTP_PORT:", process.env.SMTP_PORT);
console.log("SMTP_USER:", process.env.SMTP_USER); // Don't log pass

async function testEmail() {
    // 1. Basic Config
    const config1 = {
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false, // STARTTLS
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
        // Add this to debug
        debug: true,
        logger: true
    };

    console.log("\nAttempting connection with config:", JSON.stringify({ ...config1, auth: '***' }, null, 2));

    const transporter = nodemailer.createTransport(config1);

    try {
        console.log("Verifying connection...");
        await transporter.verify();
        console.log("✅ Verification Successful!");

        console.log("Sending test email...");
        const info = await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: process.env.ADMIN_EMAIL || 'connect@yantraq.com',
            subject: "Debug Test Email",
            text: "This is a test email to verify SMTP settings.",
        });
        console.log("✅ Email sent:", info.messageId);
    } catch (error: any) {
        console.error("❌ Error occurred:", error.message);
        console.error("Full Error:", error);

        // Suggest fixes based on error
        if (error.code === 'EAUTH') {
            console.log("\n💡 TIP: Check your password. If 2FA is on, you function need an App Password.");
            console.log("💡 TIP: Ensure 'Authenticated SMTP' is enabled in admin center.");
        }
    }
}

testEmail();
