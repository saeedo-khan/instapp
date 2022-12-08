import { NextFunction, Request, Response } from "express";
import { db } from "../../utils/db";

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
  const {
    content,
    email,
    longitude,
    latitude,
    mediaFile,
    position
  } = req.body;
  try {
    const post = await db.post.create({
      data: {
        content,
        author: {
          connect: {
            email,
          },
        },
        media:{
          create:{
            longitude,
            latitude,
            mediaFile,
            position,
          }
        },
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            profile_pic_url: true
          }
        },
        media: {
          select: {
            mediaFile: true,
            latitude: true,
            longitude: true,
          }
        }
      },
    });

  

    res.status(200).json({
      type: "success",
      message: "Post created successfully",
      data: {
        post,
      },
    });
  } catch (error) {
    return next({ status: 404, message: error});
  }
};
