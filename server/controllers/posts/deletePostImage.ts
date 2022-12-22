import { NextFunction, Request, Response } from "express";
import { deleteImage } from "../../utils/deleteCloudinaryImage";


export const deletePostFile = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const imageId = req.params.imageId;
        const deleteImageResponse = await deleteImage(imageId)

        res.send({ ...deleteImageResponse})
    } catch (error) {
        return res.status(404).json({ message: error })
    }
}