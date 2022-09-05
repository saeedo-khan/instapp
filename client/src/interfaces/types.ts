export interface IPost {
    id:            number;
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
}
