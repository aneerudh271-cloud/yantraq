import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    category: string;
    description: string;
    fullDescription: string;
    image: string;
    images?: string[];
    features: string[];
    canBuy: boolean;
    canRent: boolean;
    canRepair: boolean;
    price?: string;
    rentPrice?: string;
}

const ProductSchema: Schema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    fullDescription: { type: String, required: true },
    image: { type: String, required: true },
    images: [{ type: String }],
    features: [{ type: String }],
    canBuy: { type: Boolean, default: true },
    canRent: { type: Boolean, default: true },
    canRepair: { type: Boolean, default: true },
    price: { type: String },
    rentPrice: { type: String }
});

export default mongoose.model<IProduct>('Product', ProductSchema);