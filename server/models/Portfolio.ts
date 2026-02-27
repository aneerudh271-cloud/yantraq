import mongoose, { Document, Schema } from 'mongoose';

export interface IPortfolio extends Document {
    name: string;
    url: string;
    description: string;
    color: string;
    image?: string;
    isActive: boolean;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

const PortfolioSchema: Schema = new Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String, required: true },
    color: { type: String, required: true, default: '200 90% 50%' },
    image: { type: String },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model<IPortfolio>('Portfolio', PortfolioSchema);
