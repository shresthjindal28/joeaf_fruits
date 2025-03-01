import mongoose, { Document } from "mongoose";

// Define the interface for Product
export interface IProduct extends Document {
    _id: mongoose.Types.ObjectId,
    type: string;
    name: string;
    variety: string;
    price: number;
    quantity: number
    images: string[];
    description: string;
}

// Define the Product Schema
const ProductSchema = new mongoose.Schema<IProduct>({
    type: { type: String, required: true },
    name: { type: String, required: true },
    variety: { type: String, required: true},
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    images: [
        { type: String }
    ],
    description: { type: String, required: true }
})

// Create and export the Product Model
const Product = mongoose.model<IProduct>('Product', ProductSchema);
export default Product;