"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define the Product Schema
const ProductSchema = new mongoose_1.default.Schema({
    type: { type: String, required: true },
    name: { type: String, required: true },
    variety: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    images: [
        { type: String }
    ],
    description: { type: String, required: true }
});
// Create and export the Product Model
const Product = mongoose_1.default.model('Product', ProductSchema);
exports.default = Product;
