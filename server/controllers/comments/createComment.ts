import { NextFunction, Request, Response } from "express";
import { db } from "../../utils/db";

export const createComment = async (req:Request, res:Response, next:NextFunction) => {
    try {
    const { content, userId } = req.body;
    const  postId  = req.params.postId;
    const post = await db.post.findUnique({
        where: {id: postId}
    });

    if(!post) {
        return next({ status: 404, message: "post not found" });
    }

    const addComment = await db.comment.create({
        data: {
            content,
            User: {
                connect: {
                    id: userId
                }
            },
            Post: {
                connect: {
                    id: postId
                }
            }
        }
    })

    res.status(200).json({
        type: "success",
        messag: "comment added",
        data: {
            addComment,
        }
    })
    } catch (error) {
        res.status(404)
    }
}