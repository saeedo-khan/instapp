import { Request, Response } from "express";
import { db } from "../../utils/db";

export const uploadProfilePic = async (req: Request, res: Response) => {
    try {
        const { currentUser, profileImage } = req.body;

        await db.user.update({
            where: {
                id: currentUser,
            },
            data: {
                profile_pic_url: profileImage
            },
            select: {
                id: true
            }
        });

        res.status(200).json({
            type: 'success',
            message: 'Profile updated successfully',
            data: null,
        });
    } catch (error) {
        return res.status(400).json(error)
    }
}