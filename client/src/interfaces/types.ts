export interface IPost {
    id:            string;
    caption:       null | string;
    images:        string[];
    published:     boolean;
    createdAt:     Date;
    updatedAt:     Date;
    authorId:      string;
    favouriteById: null;
    postTagId:     null;
    PostTag:       null;
    comments:      any[];
    author:     IAuthor;
    likes:      ILikes[]
}

export interface IAuthor {
    id: string;
    email: string;
    name: string;
    password: string;
    token: string;
    thumbUrl: string;
    gender: Gender | null;
    statusMessage: string;
    isFollower: Boolean;
    followers: IFollowers[]
    following: IFollowing[]
}

export interface ILikes {
    id: number;
    postId: string;
    userId: string;
    isLiked: boolean;
}

export interface IFollowers {
    id: number;
    followerId: string;
    isFollower: boolean;
    userId: string;
}

export interface IFollowing {
    id: number;
    followerId: string;
    isFollower: boolean;
    userId: string;
}

export enum Gender {
    MALE = 'male',
    FEMALE = 'female'
}