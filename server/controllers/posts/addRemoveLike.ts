import { Request, Response } from "express";
import { db } from "../../utils/db";

export const addRemoveLike = async (req: Request, res: Response) => {
    try {
        const postId = req.params.postId;
        const userId = req.body.userId;

        // check post exist 
        const post = await db.post.findUnique({
            where: {
                id: postId,
            }
        });
        
        if(!post){
            return res.status(404).json({message: "Post not found"});
        }

        // is already likes
        const hasLike = await db.post.findFirst({
            where:{
                AND: [
                    {id: postId},
                    {
                        likes: {
                            some: {
                                id: userId
                            }
                        }
                    }
                ]
            },
            select: {
                id: true
            },
        });
        

        // if liked remove like
        if (hasLike) {
            await db.post.update({
                where: {id: postId},
                data: {
                    likes: {
                        disconnect: {
                            id: userId
                        }
                    }
                }
            });

            return res.status(200).json({
                type: 'success',
                message: "You've removed like from post",
                data: {
                    isLiked: false
                },
            });
        }else {
            await db.post.update({
                where: {
                    id: postId,
                },
                data: {
                    likes: {
                        connect: {
                            id: userId
                        }
                    }
                }
            });

            return res.status(200).json({
                type: 'success',
                message: "You've liked the post",
                data: {
                    isLiked: true
                },
            });
        }
    } catch (error) {
        res.status(404).json(error)
    }
}