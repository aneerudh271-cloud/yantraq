import mongoose, { Document, Schema } from 'mongoose';

export interface ITestimonial extends Document {
    name: string;
    designation: string;
    industry: string;
    message: string;
    rating: number;
    isActive: boolean;
    createdAt: Date;
}

const TestimonialSchema: Schema = new Schema({
    name: { type: String, required: true },
    designation: { type: String, required: true },
    industry: { type: String, required: true },
    message: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);