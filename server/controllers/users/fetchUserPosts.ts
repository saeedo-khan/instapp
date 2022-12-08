import { Request, Response } from "express";
import { db } from "../../utils/db";
import { include } from "./_helper";


export const fetchUserPosts = async (req:Request, res:Response) => {
    try {
        const posts = await db.post.findMany({
            where: {
                authorId: req.params.userId
            },
            include
        })

        return res.status(200).json({
            type: "success",
            message: "Fetch user posts",
            data: {
              posts,
            },
          });
    } catch (error) {
        return res.status(404).json({ error });
    }
}