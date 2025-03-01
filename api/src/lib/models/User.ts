import mongoose, { Document } from "mongoose";

// Define an interface for User
export interface IUser extends Document {
    _id: mongoose.Types.ObjectId,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: number,
    photo: string,
    gender: "Male" | "Female",
    role: "Admin" | "User",
    wishlist: mongoose.Types.ObjectId[],
    cart: mongoose.Types.ObjectId[],
    createdAt: Date,
    updatedAt: Date
};

// Define the User Schema
const UserSchema = new mongoose.Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, default: "" },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    phone: { type: Number, },
    photo: { type: String },
    gender: { type: String, enum: ["Male", "Female"], default: "Male" },
    role: { type: String, enum: ["Admin", "User"], default: "User" },
    wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        }
    ],
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        }
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

// Create and export the User model
const User = mongoose.model<IUser>('User', UserSchema);
export default User;