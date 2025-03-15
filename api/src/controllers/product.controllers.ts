import { Request, Response } from "express";
import User from "../lib/models/User";
import Product from "../lib/models/Product";

export const addNewProduct = async (req: Request, res: Response): Promise<any> => {
    try {
        const { userId, role } = (req as any).user;
        if (role !== "Admin") {
            return res.status(403).json({ success: false, message: "Unauthorized Access!" });
        }

        const { name, slug, description, category, variants, images, tags, origin, nutritionalInfo, stockQuantity } = req.body;

        const product = await Product.create({
            name, slug, description, variants, category, images, tags, origin, nutritionalInfo, stockQuantity
        });

        return res.status(201).json({ success: true, product });
    } catch (error) {
        return res.status(500).json({ message: "Error creating product", error });
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

        const product = req.body;
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

        const { id } = req.params;
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
        )
            .select('wishList')
            .populate({
                path: 'wishList',
                select: 'name description images category variants tags origin nuritioinalInfo stockQuantity',
                model: 'Product'
            });

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
        )
            .select('wishList')
            .populate({
                path: 'wishList',
                select: 'name description images category variants tags origin nuritioinalInfo stockQuantity',
                model: 'Product'
            });

        return res.status(200).json({ success: true, message: "Product From the Wishlist Successfully", list: userUpdatedList });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
    }
};

export const addProductToCart = async (req: Request, res: Response): Promise<any> => {
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
            { $addToSet: { cart: id } },
            { new: true }
        )
            .select('cart')
            .populate({
                path: 'cart',
                select: 'name description images category variants tags origin nuritioinalInfo stockQuantity',
                model: 'Product'
            });

        return res.status(200).json({ success: true, message: "Product Added to Wishlist Successfully", list: userUpdatedList });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
    }
};

export const removeProductToCart = async (req: Request, res: Response): Promise<any> => {
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
            { $pull: { cart: id } },
            { new: true }
        )
            .select('cart')
            .populate({
                path: 'cart',
                select: 'name description images category variants tags origin nuritioinalInfo stockQuantity',
                model: 'Product'
            });

        return res.status(200).json({ success: true, message: "Product From the Wishlist Successfully", list: userUpdatedList });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
    }
};