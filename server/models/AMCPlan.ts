import mongoose, { Document, Schema } from 'mongoose';

export interface IAMCPlan extends Document {
    name: string;
    price: string;
    features: string[];
    popular: boolean;
    isActive: boolean;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

const AMCPlanSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: String,
        required: true,
        trim: true,
    },
    features: {
        type: [String],
        required: true,
    },
    popular: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    order: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

export default mongoose.model<IAMCPlan>('AMCPlan', AMCPlanSchema);
