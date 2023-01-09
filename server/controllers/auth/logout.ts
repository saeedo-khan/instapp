import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express"


export const logOut = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res
        .clearCookie('accessToken', {sameSite: 'none'})
        .status(200)
        .json({ message: 'user has been loged out !! 😢'})
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
              console.log(
                "There is a unique constraint violation, a new user cannot be created with this email"
              );
            }
          }
          throw error;
    }
}