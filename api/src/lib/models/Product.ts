import { Document, Schema, model } from 'mongoose';

interface ProductVariant {
    size: 'small' | 'medium' | 'large' | 'jumbo';
    singlePieceWeight: number; 
    weightUnit: 'g' | 'kg'; 
    pricingUnit: 'per piece' | 'per kg' | 'per dozen';  
    price: number;
    originalPrice?: number;
    discountPercentage?: number;
}


export interface ProductDocument extends Document {
    name: string;
    slug: string;
    description: string;
    category: 'mango' | 'premium mango';
    variants: ProductVariant[];
    images: string[];
    tags: string[];
    origin: 'indian' | 'imported';
    nutritionalInfo: {
        calories: number;
        vitamins: string[];
    };
    isFeatured: boolean;
    stockQuantity: number;
    createdAt: Date;
    updatedAt: Date;
}

const productSchema = new Schema<ProductDocument>(
    {
        name: { type: String, required: true, index: true },
        slug: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        category: {
            type: String,
            enum: ['mango', 'premium mango'],
            required: true,
            default: 'mango'
        },
        variants: [
            {
                size: { type: String, enum: ['small', 'medium', 'large', 'jumbo'], required: true },
                singlePieceWeight: { type: Number, required: true },
                weightUnit: { type: String, enum: ['g', 'kg'], required: true },
                pricingUnit: { type: String, enum: ['per piece', 'per kg', 'per dozen'], required: true },
                price: { type: Number, required: true },
                originalPrice: Number,
                discountPercentage: { type: Number, default: 0}
            },
        ],
        images: [
            { type: String, required: true }
        ],
        tags: [{ type: String, index: true }],
        origin: {
            type: String,
            enum: ['indian', 'imported'],
            required: true,
        },
        nutritionalInfo: {
            calories: Number,
            vitamins: [String],
        },
        isFeatured: { type: Boolean, default: false },
        stockQuantity: { type: Number, required: true, min: 0 },
    },
    { timestamps: true }
);

// Indexes for common queries
productSchema.index({ name: 'text', tags: 'text' });
productSchema.index({ category: 1, origin: 1 });

const Product = model<ProductDocument>('Product', productSchema);
export default Product;