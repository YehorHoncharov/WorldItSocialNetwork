import { IPost, IPostImg } from "../../types/post";

export interface PostTag {
  tag: {
    id: number;
    name: string;
  };
}

export interface PostData {
  id: number;
  name: string;
  theme: string | null;
  text: string;
  links: string | null;
  post_app_post_images: IPostImg[];
  post_app_post_tags: PostTag[];
  authorId: number;
  views: number | null;
  likes: number | null;
}

export interface Props {
  modalVisible: boolean;
  changeVisibility: () => void;
  postData: IPost;
}

export interface TagItem {
  label: string;
  value: string;
}

export interface ImageUpdate {
  create?: { url: string }[];
  delete?: string[];
}

