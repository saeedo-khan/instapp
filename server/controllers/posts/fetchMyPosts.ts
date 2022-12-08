import { Request, Response } from "express";
import { db } from "../../utils/db";



export const fetchMyPosts = async (req: Request, res: Response) => {
    try {
        const userId = req.body.userId;
        const posts = await db.post.findMany({
            where : { id: userId },
            orderBy : {
                createdAt: "desc"
            },
        });

        return res.status(200).json({
            type: "success",
            message: "Fetch posts successfully",
            data : {
                posts
            }
        });

    } catch (error) {
        return res.status(400).json({error})
    }
}