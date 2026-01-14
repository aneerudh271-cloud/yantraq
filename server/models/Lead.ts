import mongoose, { Document, Schema } from 'mongoose';

export interface ILead extends Document {
    name: string;
    email: string;
    phone: string;
    productService: string;
    enquiryType: 'buy' | 'rent' | 'repair' | 'amc' | 'other';
    message: string;
    status: 'new' | 'in-progress' | 'closed';
    createdAt: Date;
}

const LeadSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    productService: { type: String, required: true },
    enquiryType: {
        type: String,
        enum: ['buy', 'rent', 'repair', 'amc', 'other'],
        required: true
    },
    message: { type: String, required: true },
    status: {
        type: String,
        enum: ['new', 'in-progress', 'closed'],
        default: 'new'
    },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<ILead>('Lead', LeadSchema);