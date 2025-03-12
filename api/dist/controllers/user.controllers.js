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
exports.getUserCartList = exports.getUserWishList = exports.updateUserInfo = exports.getUserInfo = void 0;
const User_1 = __importDefault(require("../lib/models/User"));
const getUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.user;
        const user = yield User_1.default.findById(userId).select('firstName lastName email phone photo gender role');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, user });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});
exports.getUserInfo = getUserInfo;
const updateUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, role } = req.user;
        const userid = req.params.id;
        const { firstName, lastName, email, phone, photo, gender, dateOfBirth } = req.body;
        if (userId != userid) {
            return res.status(403).json({ message: 'Unauthorized Access!' });
        }
        const updatedUser = yield User_1.default.findByIdAndUpdate(userid, {
            firstName,
            lastName,
            email,
            phone,
            photo,
            gender
        }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        const userDetails = yield User_1.default.findById(userid).select("-password");
        return res.status(200).json({ success: true, user: userDetails, message: 'User updated' });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message || "Server Error" });
    }
});
exports.updateUserInfo = updateUserInfo;
const getUserWishList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.user;
        const user = yield User_1.default.findById(userId)
            .select('wishList')
            .populate({
            path: 'wishList',
            select: 'name description images category variants tags origin nuritioinalInfo discountPercentage',
            model: 'Product'
        });
        res.json({
            success: true,
            wishlist: (user === null || user === void 0 ? void 0 : user.wishList) ? user.wishList : []
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});
exports.getUserWishList = getUserWishList;
const getUserCartList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.user;
        const user = yield User_1.default.findById(userId)
            .select('cart')
            .populate({
            path: 'cart',
            select: 'name description images category variants tags origin nuritioinalInfo discountPercentage',
            model: 'Product'
        });
        res.json({
            success: true,
            cartlist: (user === null || user === void 0 ? void 0 : user.cart) ? user.cart : []
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});
exports.getUserCartList = getUserCartList;
