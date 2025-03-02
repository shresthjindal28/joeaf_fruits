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

        const {firstName, lastName, email, phone, photo, gender, dateOfBirth} = req.body;
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
            {new: true }
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
        const {userId} = (req as any).user;
        const wishList = await User.findById(userId).select('wishList');

        return res.status(200).json({ success: true, list: wishList});
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message || "Server Error" });
    }
}
