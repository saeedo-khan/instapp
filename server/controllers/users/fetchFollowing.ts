import { Request, Response } from "express";
import { db } from "../../utils/db";


export const fetchFollowings = async (req: Request, res: Response) => {
    try {
        const user = await db.user.findUnique({
            where: {
                id: req.params.userId
            },
            select: {
                following: {
                    select: {
                        id: true,
                        
                    }
                }
            }
        });
        return res.status(200).json({
            type: "success",
            message: "Fetch user following",
            data: {
              users: user?.following
            },
          });
    } catch (error) {
        return res.status(404).json({ message: error })
    }
};



