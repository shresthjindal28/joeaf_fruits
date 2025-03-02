import { Request, Response } from "express";
import Product from "../lib/models/Product";
import User from "../lib/models/User";

export const addNewProduct = async (req: Request, res: Response): Promise<any> => {
    try {
        const { userId, role } = (req as any).user;
        if (role !== "Admin") {
            return res.status(403).json({ success: false, message: "Unauthorized Access!" });
        }


        const { type, name, variety, price, quantity, description, images } = req.body;

        const product = await Product.create({
            type,
            name,
            variety,
            price,
            quantity,
            description,
            images
        });
        return res.status(201).json({ success: true, product });
    } catch (error) {
        return res.status(500).json({ message: "Error creating product" });
    }
}

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const allProducts = await Product.find();
        res.status(201).json({ success: true, allProducts });
    } catch (error) {
        res.status(500).json({ message: "Error creating product" });
    }
}

export const updateProduct = async (req: Request, res: Response): Promise<any> => {
    try {
        const { userId, role } = (req as any).user;
        if (role !== "Admin") {
            return res.status(403).json({ success: false, message: "Unauthorized Access!" });
        }

        const product  = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(product._id, product, { new: true });

        return res.status(200).json({ success: true, product: updatedProduct });
    } catch (error) {
        return res.status(500).json({ success: false, message: error || "Internal Server Error" })
    }
}

export const deleteProduct = async (req: Request, res: Response): Promise<any> => {
    try {
        const { userId, role } = (req as any).user;
        if (role !== "Admin") {
            return res.status(403).json({ success: false, message: "Unauthorized Access!" });
        }

        const {id}  = req.params;
        const product = await Product.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "Product Deleted Successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error || "Internal Server Error" })
    }
}

export const addProductToWishlist = async (req: Request, res: Response): Promise<any> => {
    try {
        const { userId, role } = (req as any).user;
        if (role === "Admin") {
            return res.status(403).json({ success: false, message: "UnNamed Action" });
        }

        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product Not Found" });
        }

        const userUpdatedList = await User.findByIdAndUpdate(
            userId, 
            { $addToSet: { wishList: id } }, 
            { new: true }
        ).select('wishList');

        return res.status(200).json({ success: true, message: "Product Added to Wishlist Successfully", list: userUpdatedList });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
    }
};

export const removeProductToWishlist = async (req: Request, res: Response): Promise<any> => {
    try {
        const { userId, role } = (req as any).user;
        if (role === "Admin") {
            return res.status(403).json({ success: false, message: "UnNamed Action" });
        }

        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product Not Found" });
        }

        const userUpdatedList = await User.findByIdAndUpdate(
            userId, 
            { $pull: { wishList: id } }, 
            { new: true }
        ).select('wishList');

        return res.status(200).json({ success: true, message: "Product From the Wishlist Successfully", list: userUpdatedList });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
    }
};