import { Request, Response } from "express";
import User from "../lib/models/User";


export const getUserInfo = async (req: Request, res: Response): Promise<any> => {
    try {
        const { userId } = (req as any).user;
        const user = await User.findById(userId).select('firstName lastName email phone photo gender role');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, user });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const updateUserInfo = async (req: Request, res: Response): Promise<any> => {
    try {
        const { userId, role } = (req as any).user;
        const userid = req.params.id;

        const { firstName, lastName, email, phone, photo, gender, dateOfBirth } = req.body;
        if (userId != userid) {
            return res.status(403).json({ message: 'Unauthorized Access!' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userid,
            {
                firstName,
                lastName,
                email,
                phone,
                photo,
                gender
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        const userDetails = await User.findById(userid).select("-password");
        return res.status(200).json({ success: true, user: userDetails, message: 'User updated' });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message || "Server Error" });
    }
}

export const getUserWishList = async (req: Request, res: Response): Promise<any> => {
    try {
        const { userId } = (req as any).user;
        const user = await User.findById(userId)
            .select('wishList')
            .populate({
                path: 'wishList',
                select: 'name description images category variants tags origin nuritioinalInfo discountPercentage',
                model: 'Product'
            });

        res.json({
            success: true,
            wishlist: user?.wishList ? user.wishList : []
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const getUserCartList = async (req: Request, res: Response): Promise<any> => {
    try {
        const { userId } = (req as any).user;
        const user = await User.findById(userId)
            .select('cart')
            .populate({
                path: 'cart',
                select: 'name description images category variants tags origin nuritioinalInfo discountPercentage',
                model: 'Product'
            });

        res.json({
            success: true,
            cartlist: user?.cart ? user.cart : []
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};