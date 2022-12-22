import { NextFunction, Request, Response } from "express"


export const logOut = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res
        .clearCookie('accessToken', {sameSite: 'none'})
        .status(200)
        .json({ message: 'user has been loged out !! 😢'})
    } catch (error) {
        return res.status(404).json({ message: error })
    }
}