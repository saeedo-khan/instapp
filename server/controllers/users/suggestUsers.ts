// @ts-nocheck
import { NextFunction, Request, Response } from "express";
import { db } from "../../utils/db";


export const suggestUsers = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const userId = req.params.userId;
        const user = await db.user.findUnique({
            where: {id: userId}
        })

        if(!user) {
            return res.json({ status: 404, message:"user not found"})
        }
        else {
            const users = await db.user.findMany({
                take: 4,
                where: {
                    NOT: [
                        {
                            id: userId
                        },
                        {
                            following:{
                                some: {
                                    id: userId
                                }
                            }
                        },
                        {
                            followers: {
                                some: {
                                    id: userId
                                }
                            }
                        }
                    ]
                },
                select: {
                    id: true,
                    name: true,
                    profile_pic_url: true,
                }
            });

            return res.json({
                type: "success",
                message: "suggest users successfully",
                data: users
            })
        }


    } catch (error) {
        return res.status(404).json({ message: error })
    }
};