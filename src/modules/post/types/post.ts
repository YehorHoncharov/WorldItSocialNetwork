import { IUser } from "../../auth/types";

export interface IPostImg {
  id: number;
  url: string;
  rawUrl?: string;
  userPostId: number;
}

export interface PostTag {
  userPostId: number;
  tagId: number;
  tag: {
    id: number;
    name: string;
  };
}

export interface IPost {
  id: number;
  name: string;
  theme: string | null;
  text: string;
  links: string | null;
  views: number | null;
  likes: number | null;
  authorId: number;
  images: IPostImg[] | null;
  tags: PostTag[] | null;
}
