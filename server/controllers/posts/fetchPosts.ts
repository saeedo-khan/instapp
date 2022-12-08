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
                comments: true,
                likes: true,
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
        next(error)
    }
}