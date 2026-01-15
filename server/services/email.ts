import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Try to load env from root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    tls: {
        ciphers: 'SSLv3'
    }
});

export const sendEmail = async (to: string, subject: string, html: string) => {
    try {
        if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
            console.warn('SMTP credentials missing in .env. Email not sent.');
            return false;
        }

        // Create a simple text version by stripping HTML tags
        const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

        const info = await transporter.sendMail({
            from: `"YantraQ Admin" <${process.env.SMTP_USER}>`,
            to,
            subject,
            html,
            text, // Plain text fallback improves deliverability
        });

        console.log('Message sent: %s', info.messageId);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};
