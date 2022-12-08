import { Request, Response } from "express"


export const logOut = async (req: Request, res: Response) => {
    return res
        .clearCookie('accessToken', {sameSite: 'none'})
        .status(200)
        .json({ message: 'user has been loged out !! 😢'})
}