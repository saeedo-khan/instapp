// @ts-nocheck
import { Request, Response } from "express";
import { db } from "../../utils/db";
import { hasLikePost, include } from "../users/_helper";
const fetchFriendsPost = async (req:Request, res: Response) => {
    try {
        const currentUser = req.body.userId;
        const posts = await db.post.findMany({
            where: {
                author: {
                    following: {
                        some: {
                            id: currentUser
                        }
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            },
            include
        });

        const postsData = [];

        for await (const post of posts) {
            
            await hasLikePost(currentUser, post.id);

            switch (post.audience) {
                case "FRIENDS":
                    postsData.push(post)
                    break;
                case "PUBLIC":
                    postsData.push(post)
                    break;
                case "SPECIFIC":
                    post.specificAudienceFriends.forEach((u) => {
                        if(u.id === currentUser.id) {
                            postsData.push(post)
                        }
                    });
                    break;
            }
        }

        return res.status(200).json({
            type: "success",
            message: "fetch feed posts",
            data: {
                posts: postsData
            }
        })

    } catch (error) {
        return res.status(404).json({ message: error })
    }
}