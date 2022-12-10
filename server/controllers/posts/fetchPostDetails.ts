import { NextFunction, Request, Response } from "express";
import { db } from "../../utils/db";


export const fetchPostDetails = async (req: Request, res:Response, next:NextFunction) => {
    try {

        const post = await db.post.findMany({
            where: {
                id: req.params.userId
            },
            include: {
                author: {
                    select: {
                        name: true,
                        email: true,
                        profile_pic_url: true
                    }
                },
                specificAudienceFriends:{
                    select:{
                        id: true,
                        profile_pic_url: true,
                        name: true
                    },
                },
                comments: {
                    select: {
                        content: true,
                        User: {
                            select: {
                                id: true,
                                name: true,
                                profile_pic_url: true,
                            }
                        }
                    }
                },
                _count: {
                    select: {
                        likes: true,
                        taggedFriends: true,
                        comments: true,
                    },
                },
                taggedFriends: {
                    take: 3,
                    select: {
                        taggedUsers: {
                            select: {
                                id: true,
                                name: true,
                                profile_pic_url: true,
                            }
                        }
                    }
                }
            }
        });
        return res.json({
            type: "success",
            message: "fetch post details",
            data: {
                post
            }
        })

    } catch (error) {
        next(error);
    }
}