import { Request,Response } from "express"


export const checkAuth = async (req: Request, res:Response) => {
    try {
        res.status(200).json({
            type: "success",
            message: "user is authenticated",
        })
    } catch (error) {
        return res.status(404).json({ message: error })
    }
}
