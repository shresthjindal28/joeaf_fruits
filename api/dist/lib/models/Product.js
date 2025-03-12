"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true, index: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: {
        type: String,
        enum: ['fresh', 'organic', 'exotic', 'berries'],
        required: true,
    },
    variants: [
        {
            weight: { type: Number, required: true },
            unit: { type: String, enum: ['g', 'kg', 'pcs'], required: true },
            price: { type: Number, required: true },
            originalPrice: Number,
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
    discountPercentage: { type: Number, default: 0 },
    stockQuantity: { type: Number, required: true, min: 0 },
}, { timestamps: true });
// Indexes for common queries
productSchema.index({ name: 'text', tags: 'text' });
productSchema.index({ category: 1, origin: 1 });
const Product = (0, mongoose_1.model)('Product', productSchema);
exports.default = Product;
