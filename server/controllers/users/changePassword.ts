import { Request, Response } from "express";
import { db } from "../../utils/db";
import { checkPassword, hashPassword } from "../../utils/password.util";


export const changePassword = async (req: Request, res: Response) => {
    try {
        const { currentPassword, newPassword, currentUser } = req.body;
        const user = await db.user.findUnique({
            where: {
                id: currentUser,
            },
            select: {
                password: true,
            }
        });

        const matchPassword = checkPassword(currentPassword, newPassword);

        if (!matchPassword) {
            return res.status(401).json({ message: "current password is incorrect"})
        }

        const hashPwd = await hashPassword(newPassword);

        await db.user.update({
            where: {
                id: currentUser,
            },
            data: {
                password: hashPwd
            }
        });

        return res.status(200).json({
            type: "success",
            message: "Password updated successfully",
            data: null,
          });

    } catch (error) {
        return res.status(400).json(error)
    }
}