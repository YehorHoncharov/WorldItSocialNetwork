import { IUser } from "../../auth/types";


export interface IPostImg {
  post_app_image: {
    id: number;
    filename: string;
    file?: string,
  }

}

export interface PostTag {
  post_app_tag: {
    id: number;
    name: string;
  }
}

export interface IPost {
  id: number;
  title: string;
  topic: string | null;
  content: string;
  links: Link[] | null;
  views: IUser | null;
  likes: IUser | null;
  author_id: number;
  post_app_post_images: IPostImg[] | null;
  post_app_post_tags: PostTag[] | null;
}

export interface Link {
  id: number;
  url: string;
  userPostId: number;
}