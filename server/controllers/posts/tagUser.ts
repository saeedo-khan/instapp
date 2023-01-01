// @ts-nocheck
import { NextFunction, Request, Response } from "express";
import { db } from "../../utils/db";


export const tagUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { x_coordinates, y_coordinates, userId, postId } = req.body;

    const post = await db.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userTaged = await db.post.findFirst({
        where: {
          AND:[
            {
              id: postId,
            },
            {
              taggedFriends: {
                none: {
                  id: userId
                }
              }
            }
          ]
        },
        include: {
          taggedFriends: true,
        }
    });



    if(userTaged) {
      return res.status(404).json({ message: "user tagged"})
    } else {
      await db.postTag.create({
        data: {
          x_coordinates,
          y_coordinates,
          Post: {
            connect: {
              id: postId,
            },
          },
          taggedUsers: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }


    return res.status(200).json({
      type: "success",
      message: "tag successfully",
      data: null,
    });
  } catch (error) {
    return next({ status: 404, message: error});
  }
};
