export interface UserType {
  id: number;
  name: string;
  lastName: string;
  profileUrl: string;
}

export interface CommentType {
  id: number;
  postId: number;
  userId: number;
  comment: string;
  createdAt: string;
  User: UserType;
}

export interface PostType {
  id: number;
  userId: number;
  description: string;
  createdAt: string;
  Comment: CommentType[];
  User: UserType;
}

export interface PostUserType {
  id: number;
  userId: number;
  description: string;
  createdAt: string;
  Comment: CommentType[];
  User: UserType;
}

export interface MyPostType {
  description: string;
}

export interface FollowType {
  followerId: number;
}
