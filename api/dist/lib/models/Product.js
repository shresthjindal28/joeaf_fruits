"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
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
            discountPercentage: { type: Number, default: 0 }
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
}, { timestamps: true });
// Indexes for common queries
productSchema.index({ name: 'text', tags: 'text' });
productSchema.index({ category: 1, origin: 1 });
const Product = (0, mongoose_1.model)('Product', productSchema);
exports.default = Product;
