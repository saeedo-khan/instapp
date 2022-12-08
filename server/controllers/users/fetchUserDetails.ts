import { Request, Response } from "express";
import { db } from "../../utils/db";


export const fetchUserDetails = async (req:Request, res:Response) => {
    try {
        const user = await db.user.findUnique({
            where: {
                name: req.params.name,
            },
            select: {
                id: true,
                name: true,
                profile_pic_url: true,
                gender: true,
                biography: true,
                createdAt: true,
                _count: {
                    select: {
                        followers: true
                    }
                },
                following: {
                    take: 3,
                    select: {
                        id: true,
                    }
                }
            }
        });
        return res.status(200).json({
            type: "success",
            message: "Fetch user Details successfully",
            data : {
                user,
            },
        });
    } catch (error) {
        return res.status(404).json({error});
    }
}