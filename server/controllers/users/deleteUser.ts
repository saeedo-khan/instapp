import { Request, Response } from "express";
import { db } from "../../utils/db";


export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId
        
        await db.user.delete({
            where: {
                id: userId,
            }
        });

        res
        .clearCookie('accessToken', {sameSite: 'none'})
        
        return res.status(200).json({
            type: "success",
            message: "Account deleted successfully",
            data: null,
          });
    } catch (error) {
        return res.status(404).json({ message: error })
    }
}