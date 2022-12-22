import { Request, Response } from "express";
import { db } from "../../utils/db";
import { include } from "./_helper";


export const fetchUserPosts = async (req:Request, res:Response) => {
    try {

        const user = await db.user.findUnique({
            where: { name: req.params.name}
        })

        const posts = await db.post.findMany({
            where: {
                authorId: user?.id
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
        return res.status(404).json({ message: error })
    }
}