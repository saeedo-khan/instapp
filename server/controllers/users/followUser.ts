import { Request, Response } from "express";
import { db } from "../../utils/db";


export const followUser = async (req: Request, res: Response) => {
    const followerId = req.params.followerId;
    const userId = req.body.userId;
    const user = await db.user.findUnique({
        where: { id: userId },
    });

    if(!user){
        return res.status(404).json({message: "user not found"});
    }

    const hasFollowed = await db.user.findFirst({
        where: {
            AND:[
                {id: userId},
                {
                    following: {
                        some: {
                            id: followerId
                        }
                    }
                }
            ]
        },
        select: {
            id: true
        }
    });


}