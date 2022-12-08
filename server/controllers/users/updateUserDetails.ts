import { Request, Response } from "express";
import { db } from "../../utils/db";


export const updateUserDetails = async (req: Request, res:Response) => {
    try {
        const { name, email, gender, biography, id } = req.body;
        await db.user.update({
            where: {
                id
            },
            data: {
                email,
                name,
                gender,
                biography
            }
        });

        return res.status(200).json({
            type: "success",
            message: "User details updated successfully",
            data: null,
          });
    } catch (error) {
        return res.status(400).json(error)
    }
}