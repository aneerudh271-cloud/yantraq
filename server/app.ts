import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import connectDB from './db.js';
import Lead from './models/Lead.js';
import multer from 'multer';
import { put } from '@vercel/blob';

console.log("----------------------------------------");
console.log("LOADING APP.TS - SANITIZATION DISABLED");
console.log("----------------------------------------");

import Service from './models/Service.js';
import Testimonial from './models/Testimonial.js';
import Product from './models/Product.js';
import { sendEmail } from './services/email.js';
import PageView from './models/PageView.js';
import authRoutes from './routes/authRoutes.js';
import { protect, admin } from './middleware/authMiddleware.js';

dotenv.config();

const app = express();
const upload = multer();

// connectDB is async, but we call it here. 
// For serverless, it's better to await it inside handlers, 
// but mongoose buffers commands, so this usually works for simple apps.
connectDB();

// Security Middleware
// Security Middleware
app.use(helmet());
// app.use(mongoSanitize()); // Disabled: Incompatible with Express 5
// app.use(hpp());           // Disabled: Incompatible with Express 5

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);

// Database Connection Middleware
// Ensures DB is connected before handling any request (crucial for serverless with bufferCommands: false)
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error('Database connection failed:', error);
        res.status(500).json({ message: 'Database connection failed' });
    }
});

// File Upload Route (Vercel Blob)
app.post('/api/upload', protect, admin, upload.single('file'), async (req: any, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        console.log('Uploading file:', req.file.originalname);

        // Check for token
        const token = process.env.BLOB_READ_WRITE_TOKEN;
        if (!token || !token.startsWith('vercel_blob_rw_')) {
            console.warn('Invalid BLOB_READ_WRITE_TOKEN:', token);
            return res.status(500).json({
                message: 'Invalid Vercel Blob token. Token must start with "vercel_blob_rw_". Check .env file.'
            });
        }

        const blob = await put(req.file.originalname, req.file.buffer, {
            access: 'public',
            token: token
        });

        console.log('File uploaded to:', blob.url);
        res.json({ url: blob.url });
    } catch (error: any) {
        console.error('Upload Error:', error);
        res.status(500).json({ message: 'Upload failed: ' + error.message });
    }
});

// CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));

app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('API is running successfully');
});

// Auth Routes
app.use('/api/auth', authRoutes);

// Leads
app.get('/api/leads', protect, admin, async (req: any, res) => {
    try {
        const leads = await Lead.find().sort({ createdAt: -1 });
        res.json(leads);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/leads', async (req, res) => {
    try {
        const lead = new Lead(req.body);
        const savedLead = await lead.save();

        // Send Email Notification
        try {
            const emailSubject = `New Lead: ${savedLead.name}`;
            const emailBody = `
                <h3>New Enquiry Received</h3>
                <p><strong>Name:</strong> ${savedLead.name}</p>
                <p><strong>Email:</strong> ${savedLead.email}</p>
                <p><strong>Phone:</strong> ${savedLead.phone}</p>
                <p><strong>Service/Product:</strong> ${savedLead.productService}</p>
                <p><strong>Type:</strong> ${savedLead.enquiryType}</p>
                <p><strong>Message:</strong> ${savedLead.message}</p>
            `;
            // Optional: Use environment variable for admin email if preferred
            await sendEmail(process.env.ADMIN_EMAIL || 'connect@yantraq.com', emailSubject, emailBody);
        } catch (emailError) {
            console.error('Failed to send email:', emailError);
        }

        res.status(201).json(savedLead);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

app.put('/api/leads/:id', protect, admin, async (req: any, res) => {
    try {
        const updatedLead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedLead);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/api/leads/:id', protect, admin, async (req: any, res) => {
    try {
        await Lead.findByIdAndDelete(req.params.id);
        res.json({ message: 'Lead deleted' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Services
app.get('/api/services', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/services', protect, admin, async (req: any, res) => {
    try {
        const service = new Service(req.body);
        const savedService = await service.save();
        res.status(201).json(savedService);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

app.put('/api/services/:id', protect, admin, async (req: any, res) => {
    try {
        const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedService);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/api/services/:id', protect, admin, async (req: any, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.json({ message: 'Service deleted' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Testimonials
app.get('/api/testimonials', async (req, res) => {
    try {
        const testimonials = await Testimonial.find({ isActive: true }).sort({ createdAt: -1 });
        res.json(testimonials);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/testimonials/all', async (req, res) => {
    try {
        const testimonials = await Testimonial.find().sort({ createdAt: -1 });
        res.json(testimonials);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/testimonials', protect, admin, async (req: any, res) => {
    try {
        const testimonial = new Testimonial(req.body);
        const savedTestimonial = await testimonial.save();
        res.status(201).json(savedTestimonial);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

app.put('/api/testimonials/:id', protect, admin, async (req: any, res) => {
    try {
        const updatedTestimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTestimonial);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/api/testimonials/:id', protect, admin, async (req: any, res) => {
    try {
        await Testimonial.findByIdAndDelete(req.params.id);
        res.json({ message: 'Testimonial deleted' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/products/:category', async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.category });
        res.json(products);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/product/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/products', protect, admin, async (req: any, res) => {
    try {
        const product = new Product(req.body);
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

app.put('/api/products/:id', protect, admin, async (req: any, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProduct);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/api/products/:id', protect, admin, async (req: any, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Analytics endpoint
app.post('/api/analytics/track', async (req, res) => {
    try {
        await PageView.create(req.body);
        res.status(201).json({ message: 'Tracked' });
    } catch (error: any) {
        console.error('Tracking error:', error);
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/analytics', protect, admin, async (req: any, res) => {
    try {
        const totalLeads = await Lead.countDocuments();
        const newLeads = await Lead.countDocuments({ status: 'new' });
        const inProgressLeads = await Lead.countDocuments({ status: 'in-progress' });
        const closedLeads = await Lead.countDocuments({ status: 'closed' });

        // Page Views
        const totalViews = await PageView.countDocuments();
        const topPages = await PageView.aggregate([
            { $group: { _id: '$path', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]);

        const enquiryTypes = await Lead.aggregate([
            { $group: { _id: '$enquiryType', count: { $sum: 1 } } }
        ]);

        res.json({
            total: totalLeads,
            new: newLeads,
            inProgress: inProgressLeads,
            closed: closedLeads,
            byType: enquiryTypes.reduce((acc, type) => {
                acc[type._id] = type.count;
                return acc;
            }, {}),
            pageViews: {
                total: totalViews,
                topPages: topPages.map(p => ({ path: p._id, count: p.count }))
            }
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default app;
