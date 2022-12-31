import { NextFunction, Request, Response } from "express";
import { db } from "../../utils/db";

interface QueryTypes {
    search: string | undefined;
  }

export const findSearchResult = async (req: Request, res: Response, next:NextFunction) => {
    
    const search = req.query.q as string;
    
    try {
        const users = await db.user.findMany({
            where: {
                OR: [
                    {
                        name: { contains: search}
                    },
                    {
                        email: { contains: search }
                    }
                ]
            },
            select: {
                id: true,
                name: true,
                profile_pic_url: true,
            },
            take: 6
        });

        return res.status(200).json({
            type: "success",
            message: "fetch search result",
            data: {
                users
            }
        })
    } catch (error) {
        return next({ status: 404, message: error});
    }
}