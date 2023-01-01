// @ts-nocheck
import { NextFunction, Request, Response } from "express";
import { db } from "../../utils/db";


export const addRemoveFollow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const followerId = req.params.followerId;
  const userId = req.body.userId;
  try {
    const followerUser = await db.user.findUnique({
      where: {
        id: followerId,
      },
    });

    const hasFollowed = await db.user.findFirst({
      where: {
        AND: [
          { id: userId },
          {
            following: {
              some: {
                id: followerId,
              },
            },
          },
        ],
      },
    });

    if (followerUser && hasFollowed) {
      await db.user.update({
        where: { id: userId },
        data: {
          following: {
            disconnect: {
              id: followerUser.id,
            },
          },
        },
      });
      return res.json({
        type: "success",
        message: "unfollow user successfully",
        data: null,
      });
    } else {
      await db.user.update({
        where: { id: userId },
        data: {
          following: {
            connect: {
              id: followerUser?.id,
            },
          },
        },
      });
      return res.json({
        type: "success",
        message: "follow user successfully",
        data: null,
      });
    }
  } catch (error) {
    return res.status(404).json({ message: error })
  }
};
