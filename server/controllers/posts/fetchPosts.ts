import { NextFunction, Request, Response } from "express";
import { db } from "../../utils/db";


export const fetchPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const posts = await db.post.findMany({
            include: {
                author: {
                    select: {
                        name: true,
                        email: true,
                        profile_pic_url: true,

                    }
                },
                taggedFriends: true,
                media: true,
                comments: {
                    select: {
                        id: true,
                        content: true,
                        createdAt: true,
                        User: {
                            select:{
                                name: true,
                                profile_pic_url: true,
                            }

                        }
                    }
                },
                likes: true,
            },
            orderBy: {
                createdAt: "desc"
            }
            
        });

        return res.json({
            type: "success",
            message: "posts successfully fetched",
            data: {
                posts
            }
        })
    } catch (error) {
        return res.status(404).json({ message: error })
    }
}