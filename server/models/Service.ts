import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
    title: string;
    description: string;
    icon: string;
    features: string[];
    image: string;
    order: number;
}

const ServiceSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    features: [{ type: String }],
    image: { type: String, required: true },
    order: { type: Number, default: 0 }
});

export default mongoose.model<IService>('Service', ServiceSchema);