import { Request, Response } from "express";
import { db } from "../../utils/db";


export const deletePost = async (req:Request, res:Response) => {
    const postId = req.params.postId;
    try {
        const post = await db.post.delete({
            where: { id: postId },
            select: {
                authorId: true,
            }
        });

        if (!post) {
            return res.status(404).json({ message: "Post not found"});
        }

        if (post.authorId)
        return res.status(200).json({
            type: "success",
            message: "post was successfully deleted",
            data: null
        })
    } catch (error) {
        return res.status(404).json({ message: error })
    }
    
}
