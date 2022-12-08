import { Request, Response } from "express";
import { db } from "../../utils/db";

export const deleteComment = async (req:Request, res:Response) => {
    try {
    const commentId = req.params.commentId;
    const removeComment = await db.comment.delete({
        where: { id : commentId },
    })
    res.status(200).json({ data: "comment deleted successfully"})
    } catch (error) {
        res.status(404).json({ error})
    }
}