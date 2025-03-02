"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProductToWishlist = exports.deleteProduct = exports.updateProduct = exports.getAllProducts = exports.addNewProduct = void 0;
const Product_1 = __importDefault(require("../lib/models/Product"));
const User_1 = __importDefault(require("../lib/models/User"));
const addNewProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, role } = req.user;
        if (role !== "Admin") {
            return res.status(403).json({ success: false, message: "Unauthorized Access!" });
        }
        const { type, name, variety, price, quantity, description, images } = req.body;
        const product = yield Product_1.default.create({
            type,
            name,
            variety,
            price,
            quantity,
            description,
            images
        });
        return res.status(201).json({ success: true, product });
    }
    catch (error) {
        return res.status(500).json({ message: "Error creating product" });
    }
});
exports.addNewProduct = addNewProduct;
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProducts = yield Product_1.default.find();
        res.status(201).json({ success: true, allProducts });
    }
    catch (error) {
        res.status(500).json({ message: "Error creating product" });
    }
});
exports.getAllProducts = getAllProducts;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, role } = req.user;
        if (role !== "Admin") {
            return res.status(403).json({ success: false, message: "Unauthorized Access!" });
        }
        const product = req.body;
        const updatedProduct = yield Product_1.default.findByIdAndUpdate(product._id, product, { new: true });
        return res.status(200).json({ success: true, product: updatedProduct });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error || "Internal Server Error" });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, role } = req.user;
        if (role !== "Admin") {
            return res.status(403).json({ success: false, message: "Unauthorized Access!" });
        }
        const { id } = req.params;
        const product = yield Product_1.default.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "Product Deleted Successfully" });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error || "Internal Server Error" });
    }
});
exports.deleteProduct = deleteProduct;
const addProductToWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, role } = req.user;
        if (role === "Admin") {
            return res.status(403).json({ success: false, message: "UnNamed Action" });
        }
        const { productId } = req.body;
        const product = yield Product_1.default.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product Not Found" });
        }
        const userUpdate = yield User_1.default.findByIdAndUpdate(userId, { $addToSet: { wishlist: productId } }, { new: true });
        return res.status(200).json({ success: true, message: "Product Added to Wishlist Successfully", user: userUpdate });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
    }
});
exports.addProductToWishlist = addProductToWishlist;
