export interface IUser {
  id: string;
  email: string;
  name: string;
  password: string;
  writtenPosts: IPost[];
  token: string | null;
  profile_pic_url: string;
  gender: UserGender;
  taggedInPosts: ITag[];
  biography: string | null;
  followers: IFollower[];
  following: IFollower[];
  likePosts: IPost[];
  postComments: IComment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IPost {
  id: string;
  content: string;
  media: IMedia[];
  audience: UserGender;
  specificAudienceFriends: IUser[];
  taggedFriends: ITag[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  comments: IComment[];
  author: IUser;
  likes: IUser[];
}

export interface IMedia {
  id: string;
  mediaFile: string;
  longitude: number;
  latitude: number;
  position: PostAudienceEnum;
  postId: string;
}

export interface ITag {
  id: string;
  x_coordinates: number;
  y_coordinates: number;
}

export interface IComment {
  id: string;
  content: string;
  createdAt: Date;
}

export interface IFollower {
  id: number;
  followerId: string;
  userId: string;
  createdAt: Date;
}

enum UserGender {
  MALE,
  FEMALE,
}

enum PostAudienceEnum {
  PUBLIC,
  FRIENDS,
  ONLY_ME,
  SPECIFIC,
}
