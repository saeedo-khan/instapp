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
    author:     IAuthor
}

export interface IAuthor {
    id: string;
    email: string;
    name: string;
    password: string;
    token: string;
    thumbUrl: string;
    gender: string;
    statusMessage: string;
    isFollower: boolean;
}