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
  images: IPostImg[];
  tags: PostTag[];
  authorId: number;
  views: number | null;
  likes: number | null;
}

export interface Props {
  modalVisible: boolean;
  changeVisibility: () => void;
  postData: IPost | null;
}

export interface TagItem {
  label: string;
  value: string;
}

export interface ImageUpdate {
  create?: { url: string }[];
  delete?: string[];
}

export interface UpdateData {
  name?: string | undefined;
  theme?: string | undefined;
  text: string | undefined;
  links?: string | undefined;
  tags?: string[] | undefined;
  images?: {
    create?: { url: string }[];
    delete?: { id: number }[];
  };
};
