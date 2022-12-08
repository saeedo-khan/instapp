import { Request, Response } from "express";
import { db } from "../../utils/db";


export const fetchComments = async (req:Request, res:Response) => {
    try {
        const postId = req.params.id;
        const comments = await db.comment.findMany({
            where: {
                postId
            },
            include: {
                User: {
                    select: { id: true, name: true, profile_pic_url: true }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        return res.status(200).json({
            type: "success",
            message: "fetch post comments",
            data: {
              comments,
            },
          });

    } catch (error) {
        res.status(500).json({error})
    }
}