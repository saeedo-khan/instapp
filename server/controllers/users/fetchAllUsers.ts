// @ts-nocheck
import { Request, Response } from "express";
import { db } from "../../utils/db";


export const fetchAllUsers = async (req:Request, res:Response) => {
    try {
        const users = await db.user.findMany({
            select: {
                followers: true,
                following: true,
                writtenPosts: true,
                likePosts: true,
            }
        })

        return res.status(200).json({
            type: "success",
            message: "Fetch user posts",
            data: {
              users,
            },
          });
    } catch (error) {
        return res.status(404).json({ message: error })
    }
}

