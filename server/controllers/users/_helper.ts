import { db } from "../../utils/db"

export const hasLikePost = async (userId:string, postId: string) => {
    const likes = await db.user.count({
        where: {
            AND: [
                {
                    id: userId,
                },
                {
                    likePosts: {
                        some: {
                            id: postId
                        }
                    }
                }
            ]
        }
    });

    return likes ? true : false;
}

export const include = {
    author: {
        select: {
            id: true,
            name: true,
            profile_pic_url: true,
            email: true,
        },
    },
    media:{
        select: {
            mediaFile: true,
            longitude: true,
            latitude: true,
            position: true,
        }
    },
    taggedFriends: {
        select: {
            x_coordinates: true,
            y_coordinates: true,
        }
    },
    _count: {
        select: {
            likes: true,
        }
    },
    specificAudienceFriends: {
        select: {
            id: true,
            name: true,
            profile_pic_url: true,
        }
    }
}