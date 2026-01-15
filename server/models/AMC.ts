import mongoose, { Document, Schema } from 'mongoose';

export interface IAMC extends Document {
    name: string;
    contactPerson: string;
    email: string;
    phone: string;
    serviceType: string;
    startDate: Date;
    endDate: Date;
    status: 'active' | 'expired' | 'pending';
    amount?: number;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

const AMCSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    contactPerson: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    serviceType: {
        type: String,
        required: true,
        trim: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'expired', 'pending'],
        default: 'active',
    },
    amount: {
        type: Number,
    },
    notes: {
        type: String,
    },
}, {
    timestamps: true,
});

export default mongoose.model<IAMC>('AMC', AMCSchema);
