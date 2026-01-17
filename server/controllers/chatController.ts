import { Request, Response } from 'express';
import { GoogleGenerativeAI, Content } from '@google/generative-ai';
import Product from '../models/Product.js';
import Service from '../models/Service.js';
import Testimonial from '../models/Testimonial.js';
import { company } from '../../src/data/company.js';

interface Message {
    role: 'user' | 'model';
    text: string;
}

export const chatWithAI = async (req: Request, res: Response) => {
    try {
        const { message, history }: { message: string; history: Message[] } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const apiKey = process.env.VITE_GEMINI_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: 'Gemini API key not configured' });
        }

        // Fetch dynamic data
        const products = await Product.find({}).select('name category description features canBuy canRent canRepair price rentPrice');
        const services = await Service.find({}).select('title description features');
        const testimonials = await Testimonial.find({ isActive: true }).select('name designation industry message rating');

        // Build knowledge base
        const knowledgeBase = {
            company: {
                name: company.name,
                description: company.description,
                contact: company.contact,
                address: company.address,
                businessHours: company.businessHours,
                about: company.about,
            },
            products: products.map(p => ({
                name: p.name,
                category: p.category,
                description: p.description,
                features: p.features,
                canBuy: p.canBuy,
                canRent: p.canRent,
                canRepair: p.canRepair,
                price: p.price,
                rentPrice: p.rentPrice,
            })),
            services: services.map(s => ({
                title: s.title,
                description: s.description,
                features: s.features,
            })),
            testimonials: testimonials.map(t => ({
                name: t.name,
                designation: t.designation,
                industry: t.industry,
                message: t.message,
                rating: t.rating,
            })),
        };

        // System instruction
        const systemInstruction = `You are a helpful sales and support assistant for ${company.name}, a company specializing in IT hardware sales, rentals, and AMC services.

Company Information:
- Name: ${company.name}
- Description: ${company.description}
- Location: ${company.address.city}, ${company.address.state}, India
- Contact: ${company.contact.phone}, ${company.contact.emails.sales}
- Business Hours: ${company.businessHours.days} ${company.businessHours.time}

Available Products:
${knowledgeBase.products.map(p => `- ${p.name} (${p.category}): ${p.description}. Features: ${p.features.join(', ')}. ${p.canBuy ? `Buy: ${p.price || 'Contact for price'}` : ''} ${p.canRent ? `Rent: ${p.rentPrice || 'Contact for price'}` : ''} ${p.canRepair ? 'Repair available.' : ''}`).join('\n')}

Available Services:
${knowledgeBase.services.map(s => `- ${s.title}: ${s.description}. Features: ${s.features.join(', ')}`).join('\n')}

Customer Testimonials:
${knowledgeBase.testimonials.map(t => `- ${t.name} (${t.designation}, ${t.industry}): "${t.message}" (Rating: ${t.rating}/5)`).join('\n')}

Instructions:
- Be friendly, professional, and helpful.
- Provide accurate information based on the above data.
- For pricing not specified, suggest contacting the company.
- Encourage inquiries about products and services.
- Keep responses concise but informative.
- If asked about something not in the knowledge base, politely say you don't have that information.`;

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash',
            systemInstruction,
        });

        // Prepare history
        const chatHistory: Content[] = history.map(m => ({
            role: m.role,
            parts: [{ text: m.text }],
        }));

        const chat = model.startChat({
            history: chatHistory,
        });

        const result = await chat.sendMessage(message);
        const response = result.response.text();

        res.json({ response });
    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};